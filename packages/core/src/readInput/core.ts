import { getRandomString, isNode } from 'a-js-tools';
import { dataStore } from './dataStore';
import { ReadInputListItem, ReadInputParam, ReadInputResult } from './types';
import { createInterface } from 'node:readline';
import { dog } from '../dog';

const { stdin, stdout } = process;

/**  核心逻辑  */
export async function readInputCore(
  _callback: ReadInputParam,
  // option: null = null,
): Promise<ReadInputResult> {
  if (!isNode()) {
    throw new RangeError('当前环境不支持 readInput');
  }

  /** 获取唯一的 key， 用于向数据仓储中添加本次调用的 key  */
  const uniKey = Symbol(getRandomString(3));

  return new Promise(resolve => {
    /**  注册事件
     *
     * 并在注册时指定当前是否开始或者是结束
     *
     * 将 process.stdout.keypress  事件放到回调中执行,然后再合适的时候再注销掉该事件
     *
     */
    dataStore.on(
      uniKey,
      _callback,
      (item: ReadInputListItem) => {
        /**
         *   初始化 rl
         *
         *   这里 output 只能设置为 stdout ，否则无法触发 stdin 的 keypress 事件
         *
         */
        const rl = createInterface({ input: stdin, output: stdout });
        const { result } = item;
        item.rl = rl;

        rl.on('SIGINT', () => {
          dog.error('意外来得太快就像龙卷风（遭到 SIGINT 符号退出输入等待）', {
            ...item,
            rl: null,
          });

          result.isSIGINT = true;
          result.success = false;

          resolve(result);
          dataStore.remove();
        });
        rl.on('close', () => {
          dog('移除所有的监听，防止内存泄露');
          rl.removeAllListeners(); // 移除所有的监听
        });
      },
      resolve,
    );
  });
}
