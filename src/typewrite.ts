import { isString } from 'a-type-of-js';
import { _p } from './print';

/**
 *
 * 打字机效果打印文本
 *
 */
export async function typewrite(str: string, delay: number = 10) {
  if (!isString(str)) {
    throw new TypeError('str 需是一个字符串');
  }
  if (!isFinite(delay) || delay < 0 || delay > 10000) {
    throw new RangeError('delay 需是一个 0 到 10000 之间（不包括两端）的数值');
  }
  const strLen = str.length;

  if (strLen === 0) {
    _p();
    return;
  }
  _p(str[0], false);

  return await new Promise(resolve =>
    setTimeout(async () => {
      resolve(await typewrite(str.slice(1), delay));
    }, delay),
  );
}
