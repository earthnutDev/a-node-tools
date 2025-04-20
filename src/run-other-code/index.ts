import { spawn } from 'node:child_process';
import { isFunction } from 'a-type-of-js';
import { RunOtherCodeOption, runOtherCodeResult } from './types';
import { organizeText } from './organizeText';
import { waiting } from './waiting';
import { parse } from './parse';
import { dog } from 'src/dog';

/**
 *
 * ## 运行其他简单的命令
 * @param options  { code:string , cwd: string, callback:()=> void}
 *
 * @returns  返回一个 Promise
 *    - 返回值包含执行的信息。
 *    - 如果是串行执行，那么结果的话可能就是一个奇特的大字符串
 *    - 执行结果 🀄️ 的 code 是执行状态值
 *          - 为 0 时
 *
 * 此处使用的 'child_process' 的 exec 创建一个子线程
 *
 * @example
 *
 * ```ts
 * import { runOtherCode , _sp} from  "a-node-tools";
 *
 * runOtherCode({
 *    code:"ls", // 执行命令
 *    cwd : "../", // 执行的工作目录
 *    hideWaiting: true, // 是否隐藏等待，默认不显示等待 ⌛️ 提示文本
 *    waitingMessage: 'please wait a moment', // // 等待信息，默认为 “请稍等”
 *    shell: true, //  是否使用 shell 执行，默认值为 true
 *    printLog: true, // 是否打印原始 stdout 输出，默认值为 true
 * }).then((resolve)=>{
 *     _p(resolve);
 * });
 *
 *   ```
 *
 * 或者
 *
 * ```ts
 * import { runOtherCode, _p }  form 'a-node-tools';
 *
 * const result = await runOtherCoder('ls');
 *
 * // 打印  `true` 后者 `false`
 * _p(result.success);
 *
 *  //如果发生执行错误，则此处将有一个值。
 *  _p(result.error);
 *
 *  // 如果 result.success === true，则会出现你自己的代码的实际返回值
 *  _p(result.data);
 *
 * ```
 *
 */
export function runOtherCode(
  options: RunOtherCodeOption,
): Promise<runOtherCodeResult> {
  dog('runOtherCode 方法 开始执行 ');

  /** 解析后的参数  */
  const runOptions = parse(options);

  dog('执行参数', runOptions);

  const result: runOtherCodeResult = {
    success: true,
    data: '',
    error: '',
    status: 1,
  };

  const { cmd, callBack, hideWaiting, waitingMessage, printLog, cwd, shell } =
    runOptions;
  /** 打印请稍等。。。 */
  const waitingDestroyed = waiting(hideWaiting, waitingMessage);

  try {
    return new Promise(resolve => {
      /** 子命令  */
      const childProcess = spawn(cmd[0], cmd.slice(1), {
        cwd,
        shell,
      });
      /// 标准输出流
      childProcess.stdout.on('data', value => {
        const str = organizeText(value, printLog);
        dog('stdout on data', str);
        result.data += str;
      });
      /// 标准输出流输出错误
      childProcess.stderr.on('data', value => {
        const str = organizeText(value, printLog);
        dog('stderr on data', str);
        result.error += str;
      });
      // 子进程创建失败并不会抛出 error 触发 try.catch ，相反会在这里打印消息
      childProcess.on('error', value => {
        dog('error', value);
        const str = organizeText(value, printLog);
        dog.error('error', str);
        result.success = false;
        result.status = result.data !== '' ? 2 : 3;
        result.error += str;
      });
      /// 子进程关闭事件
      childProcess.on('close', () => {
        dog('进行正常关闭');
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
    dog.error('创建子进程出错', error);

    return new Promise(resolve => {
      waitingDestroyed();
      result.error = errorStr;
      result.success = false;
      result.status = 0;
      resolve(result);
    });
  }
}
