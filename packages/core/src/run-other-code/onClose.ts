import { isFunction } from 'a-type-of-js';
import { dog } from '../utils/dog';
import { RunOtherCodeResult, DataStore } from './types';
import { WaitingTipsResult } from '../waiting';

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
  waitingObj: WaitingTipsResult,
) {
  const { env, result } = dataStore;

  const { callBack } = env;
  {
    // 子进程使用 Ctrl + V 后默认使用的关必为此处。而不是
    dog('进行正常关闭', code);
    setTimeout(async () => {
      if (callBack && isFunction(callBack)) {
        Reflect.apply(callBack, null, []);
      }
      await waitingObj.destroyed(); // 移除定时器

      if (code !== 0 && signal !== 'SIGINT' && signal !== 'SIGTERM') {
        result.success = false;
        result.status = 3;
      } else if (signal === 'SIGINT' || signal === 'SIGTERM') {
        result.success = false;
        result.status = 4;
        result.isSIGINT = true;
      }
      resolve(result);
    });
  }
}
