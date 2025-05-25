import { bgBrightMagentaPen } from 'color-pen';
import { organizeText } from './organizeText';
import { DataStore } from './types';
import { dog } from '../dog';
import { waitingTipsResult } from '../waiting';

/**  当触发错误时  */
export function errorCn(
  err: Error,
  dataStore: DataStore,
  waitingObj: waitingTipsResult,
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
