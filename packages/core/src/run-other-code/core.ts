import { spawn } from 'node:child_process';
import { DataStore, RunOtherCodeOption, RunOtherCodeResult } from './types';
import { waitingTips } from '../waiting';
import { parse } from './parse';
import { dog } from '../dog';
import { createData } from './dataStore';
import { stdoutDataCn } from './onStdoutData';
import { exitCn } from './onExit';
import { spawnCn } from './onSpawn';
import { stderrDataCn } from './onStderrData';
import { errorCn } from './onError';
import { closeCn } from './onClose';
import { parse as parseWaiting } from '../waiting/parse';

/**  执行其他命令  */
export function runOtherCodeCore(
  options: RunOtherCodeOption,
): Promise<RunOtherCodeResult> {
  /**  每一次函数执行的单独数据 (你就是我的唯一，不能被玷污的数据) */
  const dataStore: DataStore = createData();

  const { env, result } = dataStore;

  dog('runOtherCode 方法 开始执行 ');

  /** 解析后的参数  */
  parse(options, dataStore);

  dog('执行参数', dataStore);

  const { cmd, waiting, cwd, shell } = env;
  /**  解析当前等待的参数  */
  const waitingParam = parseWaiting(waiting);
  /**  保留是否执行等待  */
  const isRunWaiting = waitingParam.show;
  waitingParam.show = false; // 先暂停执行等待
  /** 打印请稍等。。。 */
  const waitingObj = waitingTips(waitingParam);

  try {
    return new Promise(resolve => {
      /** 子命令  */
      const childProcess = spawn(cmd[0], cmd.slice(1), {
        cwd,
        shell,
      });
      /// 若原参数为启动等待则启动等待
      if (isRunWaiting)
        waitingObj.run({
          /**  在执行等待退出时退出该执行  */
          beforeDestroyed: () => {
            waitingObj.log('执行退出');
            childProcess.kill('SIGKILL');
          },
        });
      /// 启动事件
      childProcess.on('spawn', () => spawnCn(dataStore));
      /// 标准输出流
      childProcess.stdout.on('data', value =>
        stdoutDataCn(value, dataStore, waitingObj),
      );
      /// 退出事件
      childProcess.on('exit', (code, signal) => exitCn(code, signal));
      /// 标准输出流输出错误
      childProcess.stderr.on('data', value =>
        stderrDataCn(value, dataStore, waitingObj),
      );
      // 子进程创建失败并不会抛出 error 触发 try.catch ，相反会在这里打印消息
      // 当子进程无法创建或者无法被杀死时触发
      childProcess.on('error', err => errorCn(err, dataStore, waitingObj));
      /// 子进程关闭事件
      childProcess.on(
        'close',
        (code: number | null, signal: NodeJS.Signals | null) =>
          closeCn(code, signal, resolve, dataStore, waitingObj),
      );
    });
  } catch (error) {
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
