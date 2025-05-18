import { runOtherCodeCore } from './core';
import {
  RunOtherCodeOption,
  RunOtherCodeOptions,
  RunOtherCodeResult,
  RunOtherCodeWaiting,
} from './types';

/**
 *
 * ## 运行其他简单的命令
 * @param options  { code:string , cwd: string, callback:()=> void}
 * @returns  返回一个 Promise
 *    - 返回值包含执行的信息。
 *    - 如果是串行执行，那么结果的话可能就是一个奇特的大字符串
 *    - 执行结果 🀄️ 的 code 是执行状态值
 *          - 0 未执行
 *          - 1 执行完成，且没有 error 信息
 *          - 2 执行完成，但是 error 信息不为空
 *          - 3 执行未完成，执行中错误
 *          - 4 遭遇到 `Ctrl` + `C` 退出
 *
 * 此处使用的 'child_process' 的 exec 创建一个子线程
 * @example
 *
 * ```ts
 * import { runOtherCode , _sp} from  "a-node-tools";
 *
 * runOtherCode({
 *    code:"ls", // 执行命令
 *    cwd : "../", // 执行的工作目录
 *    // 该值可为：布尔值、字符串、数值，对象
 *    waiting: {
 *       show: true,
 *       info: "马上就好",
 *       suffix: 2，
 *       interval: 20,
 *    },
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
 *  //如果发生执行错误，则此处可能将有一个值。
 *  _p(result.error);
 *
 *  // 如果 result.success === true，则会出现你自己的代码的实际返回值
 *  _p(result.data);
 *
 *  // 如果程序是由于 SIGINT （常见的场景为 `Ctrl` + `C`）中断
 *  _p(result.isSIGINT); // true
 *
 * ```
 *
 */
export const runOtherCode = (options: RunOtherCodeOption) =>
  runOtherCodeCore(options);

export type {
  RunOtherCodeOption as RunOtherCodeParam,
  RunOtherCodeOption,
  RunOtherCodeOptions,
  RunOtherCodeResult,
  RunOtherCodeWaiting,
};
