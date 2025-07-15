import { bgBrightMagentaPen } from 'color-pen';
import { dog } from '../dog';
import { organizeText } from './organizeText';
import { DataStore } from './types';
import { WaitingTipsResult } from '../waiting';

/**
 *
 * 标准输出流触发的事件
 *
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
