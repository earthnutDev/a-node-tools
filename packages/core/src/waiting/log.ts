import { isString } from 'a-type-of-js';
import { _p } from '../print';

/**
 *  打印消息
 * @param arr
 */
export function log(arr: unknown[]) {
  const lastEle = arr[arr.length - 1];
  if (isString(lastEle) && !lastEle.endsWith('\n')) arr.push('\n');
  arr.forEach(e => _p(e, false));
}
