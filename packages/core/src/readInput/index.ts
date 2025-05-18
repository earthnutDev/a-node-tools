import { readInputCore } from './core';
import { ReadInputParam, ReadInputResult } from './types';

/**
 *
 *
 * ## 监听用户输入
 *
 * 请注意，在 `v4` 版本之后，与 `runOtherCode` 一致，不再直接退出程序，而是将后续交互留给用户自己处理
 *
 * @param _callback 回调函数，必须，可接收两个参数，分别用户按键及键原始值
 * @returns   Promise<unknown>
 * @example
 *
 * ```ts
 * import { isFalse } from 'a-type-of-js';
 * import { readInput , _p } from 'a-node-tools';
 *
 * /// 注册事件，并在回调中处理逻辑，在回调返回值为 true 时，结束当前的监听输入
 * /// 当遭遇到意外的结束符号，一般是 `Ctrl` + `C` 时，v4 版本不再直接终端程序，而是返回 Promise<false>
 * const result = await readInput((keyValue, key) => {
 *   _p(keyValue, key);
 *
 *   if (key.name === 'return') {
 *     _p('执行完毕');
 *     return true;
 *   }
 *
 *   return false;
 * });
 *
 *
 * if (isFalse(result)) {
 *   _p('程序意外终端。。。');
 * } else {
 *   _p('吧啦吧啦吧啦吧');
 * }
 *
 * ```
 *
 * 回调的类型为：
 *
 * ```ts
 * type ReadInputParam = (keyValue: string | undefined, key: undefined | {
 *     name: string | string;
 *     ctrl: boolean;
 *     meta: boolean;
 *     shift: boolean;
 *     sequence: string;
 * }) => boolean
 *
 * ```
 *
 */
export const readInput = (_callback: ReadInputParam) =>
  readInputCore(_callback);

export type { ReadInputParam, ReadInputResult };
