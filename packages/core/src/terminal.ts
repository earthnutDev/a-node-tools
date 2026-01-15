import { isFalse, isUndefined } from 'a-type-of-js';
import { __p } from './cursor';
/**
 *  终端页面翻动
 * @param num
 * @param direction
 */
const terminalPage = (num: number = 1, direction: 'up' | 'on' = 'on') => {
  if (isFalse(isFinite(num))) {
    num = 1;
  }
  __p(`${num}${direction === 'on' ? 'T' : 'S'}`);
};

/**
 * 终端整页向上滚动
 * @param num
 */
function terminalPageUp(num: number = 1) {
  terminalPage(num, 'up');
}

/**
 * 终端整页下翻
 * @param num
 */
function terminalPageOn(num: number = 1) {
  terminalPage(num);
}

/**  全屏滚动  */
function terminalScrollScreen() {
  __p('r');
}

/**
 *
 *   设定可滚动范围
 * @param start 开始的行，若仅使用该参数，则表示为结束行
 *
 * @param end
 */
function terminalScrollBetween(start?: number, end?: number) {
  if (isUndefined(start) && isUndefined(end)) {
    return terminalScrollScreen();
  } else if (
    isUndefined(end) &&
    !isUndefined(start) &&
    Number.isInteger(start) &&
    start > 2
  ) {
    return __p(`0;${start}r`);
  } else if (
    !isUndefined(start) &&
    Number.isInteger(start) &&
    start >= 0 &&
    !isUndefined(end) &&
    Number.isInteger(end) &&
    end >= 0
  ) {
    if (start > end) {
      [start, end] = [end, start];
    }
    return __p(`${start};${end}r`);
  } else {
    throw new TypeError('参数的类型不符');
  }
}

export {
  terminalPageUp,
  terminalPageOn,
  terminalScrollScreen,
  terminalScrollBetween,
};
