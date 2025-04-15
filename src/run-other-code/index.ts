import { spawn } from 'node:child_process';
import { _p } from '../print';
import { isFunction } from 'a-type-of-js';
import { RunOtherCodeOption, runOtherCodeResult } from './types';
import { organizeText } from './organizeText';
import { waiting } from './waiting';
import { parse } from './parse';

/**
 *
 * 运行其他简单的命令
 *
 * 此处使用的 'child_process' 的 exec 创建一个子线程
 *
 *
 *   ```ts
 *   import { runOtherCode } from  "a-node-tools";
 *
 *
 *   runOtherCode({
 *           code:"ls",
 *           cwd : "../",
 *           hideWaiting: true,
 *           waitingMessage: 'please wait a moment',
 *           printLog: true,
 *   }).then((resolve)=>{
 *       console.log(resolve);
 *   });
 *
 *   ```
 *
 * 或者
 *
 * ```ts
 *  const result = await runOtherCoder('ls');
 *
 *  // 打印  `true` 后者 `false`
 *  console.log(result.success);
 *
 *  //如果发生执行错误，则此处将有一个值。
 *  console.log(result.error);
 *
 *  // 如果 result.success === true，则会出现你自己的代码的实际返回值
 *  console.log(result.data);
 *
 * ```
 *
 * @param options  { code:string , cwd: string, callback:()=> void}
 *
 * @returns  返回一个 Promise
 *    - 返回值包含执行的信息。
 *    - 如果是串行执行，那么结果的话可能就是一个奇特的大字符串
 *    - 执行结果 🀄️ 的 code 是执行状态值
 *          - 为 0 时
 */
export function runOtherCode(
  options: RunOtherCodeOption,
): Promise<runOtherCodeResult> {
  /** 解析后的参数  */
  const runOptions = parse(options);

  const result: runOtherCodeResult = {
    success: true,
    data: '',
    error: '',
    status: 1,
  };

  const { cmd, callBack, hideWaiting, waitingMessage, printLog, cwd } =
    runOptions;
  /** 打印请稍等。。。 */
  const waitingDestroyed = waiting(hideWaiting, waitingMessage);

  try {
    return new Promise(resolve => {
      /** 子命令  */
      const childProcess = spawn(cmd[0], cmd.slice(1), {
        cwd,
        shell: true,
      });
      /// 标准输出流
      childProcess.stdout.on(
        'data',
        value => (result.data += organizeText(value, printLog)),
      );
      /// 标准输出流输出错误
      childProcess.stderr.on(
        'data',
        value => (result.error += organizeText(value, printLog)),
      );
      // 子进程创建失败并不会抛出 error 触发 try.catch ，相反会在这里打印消息
      childProcess.on('error', value => {
        result.success = false;
        result.status = result.data !== '' ? 2 : 3;
        result.error += organizeText(value, printLog);
      });
      /// 子进程关闭事件
      childProcess.on('close', () => {
        setTimeout(() => {
          if (callBack && isFunction(callBack)) {
            Reflect.apply(callBack, null, []);
          }
          waitingDestroyed(); // 移除定时器
          resolve(result);
        });
      });
    });
  } catch (error) {
    const errorStr: string = error.toString();
    if (process.env.A_NODE_TOOLS_DEV === 'true') {
      console.error(errorStr);
    }
    _p('❌ ❌ 子线程执行失败 ❌ ❌ ❌'.concat(errorStr));
    return new Promise(resolve => {
      waitingDestroyed();
      result.error = errorStr;
      result.success = false;
      result.status = 0;
      resolve(result);
    });
  }
}
