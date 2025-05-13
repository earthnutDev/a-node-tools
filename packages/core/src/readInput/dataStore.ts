import {
  DataStore,
  ReadInputAction,
  ReadInputListItem,
  ReadInputParam,
} from './types';
import { isEmptyArray, isFalse } from 'a-type-of-js';
import { dog } from '../dog';
import { stdRemoveListener } from './stdRemoveListener';
import { pressCallFn } from './pressCallFn';

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
  on(
    this: DataStore,
    key: symbol,
    callback: ReadInputParam,
    action: ReadInputAction,
    resolve,
  ) {
    if (isFalse(this.listened)) {
      this.listened = true;
      stdin.on('keypress', pressCallFn);
      process.on('beforeExit', stdRemoveListener);
    }
    const list = this.list;

    const item: ReadInputListItem = {
      key,
      rl: null,
      action,
      callback,
      resolve,
      result: {
        isSIGINT: false,
        success: true,
      },
    };
    if (isEmptyArray(list)) {
      dog('当前执行的栈中没有数据', item);
      Reflect.apply(action, item, [item]); // 当前没有执行的项执行当前项
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
    if (this[previousItem].rl.close) this[previousItem].rl.close(); // 关闭该项
    delete this[previousItem]; // 移除该项
    dog('执行完毕一项，还有：', list);
    // 告诉程序未结束请不要处理 readline
    if (list.length > 0) {
      const currentItem = this[list[0]];
      Reflect.apply(currentItem.action, currentItem, [currentItem]);
      return false;
    }
    this.listened = false; // 设定初始化数据
    // 当前执行栈中没有待执行的项，移除在 process 上的监听
    stdRemoveListener();
    return true;
  },
};
