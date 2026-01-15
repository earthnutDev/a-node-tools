import { bgBrightMagentaPen } from 'color-pen';
import { dog } from '../utils/dog';
import { WaitingTipsResult } from '../waiting';
import { organizeText } from './organizeText';
import { DataStore } from './types';

/**
 *
 * 标准错误输出流
 *
 * @param value
 * @param dataStore
 * @param waitingObj
 */
export function stderrDataCn(
  value: string,
  dataStore: DataStore,
  waitingObj: WaitingTipsResult,
) {
  const { env, result } = dataStore;
  const str = organizeText(value, env.printLog, waitingObj);
  dog(bgBrightMagentaPen`stderr on data`, str);
  result.error += str;
}
