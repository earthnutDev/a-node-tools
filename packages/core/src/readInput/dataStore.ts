import { DataStore, ReadInputListItem, ReadInputParam } from './types';
import { isEmptyArray, isFalse } from 'a-type-of-js';
import { dog } from '../dog';
import { stdRemoveListener } from './stdRemoveListener';
import { pressCallFn } from './pressCallFn';
import { emitKeypressEvents } from 'node:readline';
import { isTTY } from '../isTTY';

const { stdin } = process;
/**
 * 创建一个共享的数据中心，用于储存当前的输入的需要
 *
 *
 *
 * 由于在使用的时候，因没有及时处理 process.stdout 的监听事件
 *
 * 导致多次监听同事件而触发
 *
 * ```sh
 *  MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
 *   11 beforeExit listeners added to [process].
 *   Use emitter.setMaxListeners() to increase limit
 * (Use `node --trace-warnings ...` to show where the warning was created)
 * ```
 *
 *
 */
export const dataStore: DataStore = {
  list: [],
  listened: false,
  on(this: DataStore, key: symbol, callback: ReadInputParam, resolve) {
    if (isFalse(this.listened)) {
      this.listened = true;
      emitKeypressEvents(process.stdin); //
      if (isTTY()) {
        process.stdin.setRawMode(true); // 启用原始模式
      }
      process.stdin.resume(); // 恢复流
      stdin.on('keypress', pressCallFn); // 我才是大哥
      process.on('beforeExit', stdRemoveListener);
      process.stdin.on('end', () => {});
    }
    const list = this.list;

    const item: ReadInputListItem = {
      key,
      callback,
      resolve,
    };
    if (isEmptyArray(list)) {
      dog('当前执行的栈中没有数据', item);
    }

    list.push(key); // 推送到栈中
    this[key] = item; // 添加到项

    return item;
  },
  /**
   * 是否可以🧹 readline
   */
  remove(this: DataStore): boolean {
    const list = this.list;
    /** 上一个执行的项   */
    const previousItem = list.shift();
    delete this[previousItem]; // 移除该项
    dog('执行完毕一项，还有：', list);
    // 告诉程序未结束请不要处理 readline
    if (list.length > 0) {
      return false;
    }
    this.listened = false; // 设定初始化数据
    // 当前执行栈中没有待执行的项，移除在 process 上的监听
    stdRemoveListener();
    dog('监听已移除');
    return true;
  },
};
