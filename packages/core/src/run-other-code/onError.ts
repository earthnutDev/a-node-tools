import { bgBrightMagentaPen } from 'color-pen';
import { dog } from '../utils/dog';
import { WaitingTipsResult } from '../waiting';
import { organizeText } from './organizeText';
import { DataStore } from './types';

/**
 *  当触发错误时
 * @param err
 * @param dataStore
 * @param waitingObj
 */
export function errorCn(
  err: Error,
  dataStore: DataStore,
  waitingObj: WaitingTipsResult,
) {
  const { env, result } = dataStore;
  {
    const str = organizeText(err, env.printLog, waitingObj);
    dog(bgBrightMagentaPen`error`, str);
    dog.error('error', str);
    result.success = false;
    result.status = result.data !== '' ? 2 : 3;
    result.error += str;
  }
}
