import { isFunction } from 'a-type-of-js';
import { dog } from '../dog';
import { RunOtherCodeResult, DataStore } from './types';

/**
 *
 * 当执行关闭的时候
 *
 */
export function closeCn(
  code: number,
  signal: string,
  resolve: (
    value: RunOtherCodeResult | PromiseLike<RunOtherCodeResult>,
  ) => void,
  dataStore: DataStore,
  waitingDestroyed: () => void,
) {
  const { env, result } = dataStore;

  const { callBack } = env;
  {
    // 子进程使用 Ctrl + V 后默认使用的关必为此处。而不是
    dog('进行正常关闭', code);
    setTimeout(() => {
      if (callBack && isFunction(callBack)) {
        Reflect.apply(callBack, null, []);
      }
      waitingDestroyed(); // 移除定时器
      if (code !== 0 && signal !== 'SIGINT') {
        result.success = false;
        result.status = 3;
      } else if (signal === 'SIGINT') {
        result.success = false;
        result.status = 4;
        result.isSIGINT = true;
      }
      resolve(result);
    });
  }
}
