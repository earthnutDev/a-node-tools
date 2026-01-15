import { bgBrightMagentaPen } from 'color-pen';
import { dog } from '../utils/dog';
import { WaitingTipsResult } from '../waiting';
import { organizeText } from './organizeText';
import { DataStore } from './types';

/**
 *
 * 标准输出流触发的事件
 *
 * @param value
 * @param dataStore
 * @param waitingObj
 */
export function stdoutDataCn(
  value: string,
  dataStore: DataStore,
  waitingObj: WaitingTipsResult,
) {
  const { env, result } = dataStore;
  const str = organizeText(value, env.printLog, waitingObj);
  dog(bgBrightMagentaPen`stdout on data`, str);
  result.data += str;
}
