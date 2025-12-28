import { bgBrightMagentaPen } from 'color-pen';
import { dog } from '../utils/dog';
import { organizeText } from './organizeText';
import { DataStore } from './types';
import { WaitingTipsResult } from '../waiting';

/**
 *
 * 标准错误输出流
 *
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
