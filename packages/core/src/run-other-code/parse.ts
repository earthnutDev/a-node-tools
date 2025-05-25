import { isFalse, isString } from 'a-type-of-js';
import { DataStore, RunOtherCodeOption } from './types';
import { pathJoin } from '../path';
import { isNode } from 'a-js-tools';

/**
 *
 * 解析参数
 *
 */
export function parse(options: RunOtherCodeOption, dataStore: DataStore) {
  if (isFalse(isNode())) {
    throw new RangeError('当前环境不支持 node 环境');
  }

  const { env } = dataStore;
  /// 倘若传入的实参是一个字符串，则默认仅传入
  if (isString(options)) {
    env.code = options; // 这个值其实已经没有储存的必要了
    /**  将单独为命令转化为对象参数  */
    options = {
      code: options,
      waiting: false,
    };
  }

  /**  工作目录  */
  const cwd = pathJoin(process.cwd(), options.cwd || '');

  /**  执行命令  */
  const cmd = options.code
    .replace(/\s{2,}/g, ' ')
    .trim()
    .split(' ');

  Object.assign(dataStore.env, {
    shell: true,
    hideWaiting: true,
    waitingMessage: '请稍等',
    printLog: true,
    ...options,
    cmd,
    cwd,
  });
}
