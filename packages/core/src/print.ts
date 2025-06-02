import {
  isBoolean,
  isBusinessEmptyString,
  isFunction,
  isTrue,
  typeOf,
} from 'a-type-of-js';
import { dog } from './dog';
import { isNode } from 'a-js-tools';
import {
  colorPen,
  colorText,
  cutoffStringWithChar,
  randomPen,
  strInTerminalLength,
} from 'color-pen';

/** 打印文本内容\
 * 因为某些原因，默认打印完成后进行换行\
 * 若想打印在同一行，可设定第二参数为 false
 * @param [r='']           {@link String}   打印的文本信息
 * @param [lineFeed=true]  {@link Boolean}  是否答应换行符号
 */
export function _p(r: unknown = '', lineFeed: boolean = true): void {
  let resultStr = '';
  const _type = typeOf(r);

  if (!isBoolean(lineFeed)) {
    dog.error('');
    throw new TypeError('lineFeed 的类型必须是 boolean ');
  }
  if (_type === 'bigint') {
    const bigintStr = r.toString().concat('n');
    resultStr = lineFeed ? `${bigintStr}\n` : `${bigintStr}`;
  } else if (
    ['string', 'number', 'boolean', 'function', 'null'].includes(_type)
  ) {
    resultStr = lineFeed ? `${r}\n` : `${r}`;
    // 当为非 null 的基础类型数据
  } else {
    const jsonStr = JSON.stringify(
      r,
      (key: string, value: unknown) => {
        if (isFunction(value)) {
          return `${value}`;
        } else if (value == undefined) {
          return 'undefined';
        }
        return value;
      },
      2,
    );
    resultStr = lineFeed ? `${jsonStr}\n` : `${jsonStr}`;
    // 当为其他类型的数据使用  `JSON.stringify()` 进行转化
  }
  if (isNode()) {
    process.stdout.write(resultStr);
  } else {
    /// 俄是合法的 console 用户
    console.log(...colorText(resultStr.replace(/\n$/, '')));
  }
}

/**
 * # 绘制一条彩色的分割线
 *
 * 请注意：并不保证中间的文本总是可以被<span style="color:#ff0;">完全渲染</span>，当其渲染长度长于终端的宽，可能被截断
 * @param str 中间需要放置的提示文本
 * @param color 中间文本的色彩
 * @example
 * ```ts
 * import { colorLine } from 'a-node-tools';
 *
 * colorLine(); // 彩色分割线
 * colorLine('就是玩'); // 彩色分割，中间有文本 “就是玩”
 * colorLine('就是玩', true); // 彩色分割线，中间有彩色文本 “就是玩”
 * colorLine('就是玩', '#f23'); // 彩色分割线，中间有红色文本 “就是玩”
 * ```
 *
 *
 */
export function colorLine(str?: string, color?: string | true): void {
  str = str?.toString ? str : '';
  str = str.toString();

  /**  当前可用宽度  */
  const screenWith = process.stdout.columns;
  const line = [...'-'.repeat(screenWith)].map(e => randomPen(e)).join('');
  if (!isBusinessEmptyString(str)) {
    if (color)
      str = isTrue(color)
        ? [...str].map(e => randomPen(e)).join('')
        : colorPen(color)(str);
    str = cutoffStringWithChar(str, screenWith - 4).trim();
    /**  str 在终端的长度  */
    const strLen = strInTerminalLength(str);
    /**  安全宽度  */
    const safeWidth = Math.floor((screenWith - strLen) / 2);
    str = cutoffStringWithChar(str + line, screenWith - safeWidth);
    str = cutoffStringWithChar(line + str, -screenWith);
  } else {
    str = line;
  }

  _p();
  _p(str);
}
