import { spawn } from 'node:child_process';
import { isNull, isTrue } from 'a-type-of-js';
import { isWindows } from '../path';
import { dog } from '../utils/dog';
import { waitingTips, WaitingTipsResult } from '../waiting';
import { parse as parseWaiting } from '../waiting/parse';
import { createData } from './dataStore';
import { closeCn } from './onClose';
import { errorCn } from './onError';
import { spawnCn } from './onSpawn';
import { stderrDataCn } from './onStderrData';
import { stdoutDataCn } from './onStdoutData';
import { parse } from './parse';
import { DataStore, RunOtherCodeOption, RunOtherCodeResult } from './types';

/**
 *  执行其他命令
 * @param options
 */
export function runOtherCodeCore(
  options: RunOtherCodeOption,
): Promise<RunOtherCodeResult> {
  // process.env.NODE_NO_WARNINGS = '1';
  /**  每一次函数执行的单独数据 (你就是我的唯一，不能被玷污的数据) */
  const dataStore: DataStore = createData();

  const { env, result } = dataStore;

  dog('runOtherCode 方法 开始执行 ');

  /** 解析后的参数  */
  parse(options, dataStore);

  dog('执行参数', dataStore);

  const { cmd, waiting, cwd, shell, code } = env;
  /** 打印请稍等。。。 */
  const [waitingObj, isRunWaiting] = (() => {
    if (waiting instanceof WaitingTipsResult) {
      return [waiting, waiting.state === 'run'];
    }
    /**  解析当前等待的参数  */
    const waitingParam = parseWaiting(waiting);
    return [waitingTips(waitingParam), waitingParam.show];
  })();

  // 给执行结果
  result.runCode = code;
  result.runCwd = cwd || process.cwd();

  try {
    return new Promise(resolve => {
      /** 子命令  */
      const childProcess = isTrue(shell)
        ? spawn(code, [], {
            cwd,
            shell,
          })
        : spawn(cmd[0], cmd.slice(1), {
            cwd,
            shell,
          });
      /// 若原参数为启动等待则启动等待
      if (isRunWaiting)
        waitingObj.run({
          /**
           *  在执行等待退出时退出该执行
           * @param exitProactively
           */
          beforeDestroyed: exitProactively => {
            /// 非主动触发退出
            if (!exitProactively) return;
            // 该条打印导致多个应用打印该值
            // waitingObj.log('执行退出');
            dog('执行退出前');
            // SIGINT 优雅退出好像并没有终止进程
            if (isWindows) {
              try {
                if (!childProcess.killed) childProcess.kill(-1);
              } catch (error) {
                dog.error(
                  '使用 child.kill(child.pid, -1 ) 关闭子进程失败',
                  error,
                );
                spawn(
                  'taskkill',
                  ['/pid', childProcess.pid?.toString() || '', '/T', '/F'],
                  {
                    stdio: 'pipe', //
                  },
                );
              }

              dog('终结在 windows 下的子进程');
            } else {
              // childProcess.kill('SIGINT');
              childProcess.kill('SIGTERM');
              // childProcess.kill('SIGKILL');
              dog('终结在非 windows 下的子进程');
            }
            dataStore.result.isSIGINT = true;
          },
        });
      /// 启动事件
      childProcess.on('spawn', () => spawnCn(dataStore));
      /// 标准输出流
      childProcess.stdout.on('data', value =>
        stdoutDataCn(value, dataStore, waitingObj),
      );
      /// 退出事件
      childProcess.on('exit', (code, signal) => {
        dog('子进程已退出了，退出码为 <', code, '>');
        if (!isNull(signal)) {
          dog.error('子进程被其他信号中断执行，执行的退出信号为：', signal);
        }
      });
      /// 标准输出流输出错误
      childProcess.stderr.on('data', value =>
        stderrDataCn(value, dataStore, waitingObj),
      );
      // 子进程创建失败并不会抛出 error 触发 try.catch ，相反会在这里打印消息
      // 当子进程无法创建或者无法被杀死时触发
      childProcess.on('error', err => errorCn(err, dataStore, waitingObj));
      /// 子进程关闭事件
      childProcess.on('close', (code, signal) =>
        closeCn(code ?? 0, signal ?? '', resolve, dataStore, waitingObj),
      );
    });
    // 执行出错时走这里
  } catch (error: any) {
    const errorStr: string = error.toString();
    dog.error(
      '创建（但是确是非 node 无法创建子进程，而是更上游的 node 创建的错误）子进程出错',
      error,
    );

    return new Promise(resolve => {
      (async () => {
        await waitingObj.destroyed();
      })();
      result.error = errorStr;
      result.success = false;
      result.status = 0;
      resolve(result);
    });
  }
}
