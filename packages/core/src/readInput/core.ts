import { getRandomString, isNode } from 'a-js-tools';
import { dataStore } from './dataStore';
import { ReadInputParam } from './types';

/**  核心逻辑  */
export async function readInputCore(
  _callback: ReadInputParam,
): Promise<boolean> {
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
    dataStore.on(uniKey, _callback, resolve);
  });
}
