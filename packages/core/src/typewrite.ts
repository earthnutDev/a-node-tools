import { isString, isNaN } from 'a-type-of-js';
import { _p } from './print';
import { dog } from './dog';
import { boldPen, pen } from 'color-pen';

/**
 *
 * 打字机效果打印文本
 *
 * 异步的需要 await  或者 then
 *
 * @param str 要打印的字符串
 * @param [delay=10]  每两个字符之间时间延迟
 *
 * @example
 *
 * ```ts
 * import { redPen } from 'color-pen';
 * import { typewrite } form 'a-node-tools';
 *
 *
 * await typewrite(`五十六个星座五十六${redPen`支花`}五十六族兄弟姐妹是一家`)
 *
 * ```
 *
 *
 */
export async function typewrite(str: string, delay: number = 10) {
  if (!isString(str)) {
    throw new TypeError('str 需是一个字符串');
  }
  if (!isFinite(delay) || delay < 0 || delay > 10000) {
    throw new RangeError('delay 需是一个 0 到 10000 之间（不包括两端）的数值');
  }
  const strArr = Array.from(str);

  const strLen = strArr.length;

  if (strLen === 0) {
    _p();
    return;
  }
  for (const char of strArr) {
    await new Promise(resolve => setTimeout(resolve, delay));

    dog(`当前字符 ${boldPen(char)} 长度为：`, char.length);
    dog(
      `当前字符 ${pen.reversed(char)} 在 charCodeAt`,
      char.charCodeAt(0),
      char.charCodeAt(1),
      char.charCodeAt(2),
    );

    if (char.length === 1 && isNaN(char.charCodeAt(1))) {
      _p(char, false);
    } else if (
      str.length === 2 &&
      str.charCodeAt(0) >= 0xd800 &&
      str.charCodeAt(0) <= 0xdbff && // 高代理
      str.charCodeAt(1) >= 0xdc00 &&
      str.charCodeAt(1) <= 0xdfff // 低代理
    ) {
      _p(char, false);
      _p(' ', false);
    } else if (str.length === 2 && str.charCodeAt(1) === 0xfe0f) {
      _p(char, false);
      _p('  ', false);
    } else {
      _p(char, false);
      _p(' ', false);
    }
  }

  _p();
}
