/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName a-node-tools
 *  @FileName cursor.ts
 *  @CreateDate  周二  04/22/2025
 *  @Description [ANSI 转义码](https://MrMudBean.github.io/%E6%97%A5%E5%BF%97/ANSI%20%E8%BD%AC%E4%B9%89%E7%A0%81/#%E9%87%8D%E7%BD%AE%E7%BB%88%E7%AB%AF)
 *
 ****************************************************************************/

import { _p } from './print';
import { csi, esc } from '@color-pen/static';
import { isFalse, isNumber, isPlainObject, isUndefined } from 'a-type-of-js';
// import { dog } from './dog';
import { isNode } from 'a-js-tools';

/** 打印转义的内容  */
function __p(r: string | number, _csi: boolean = true) {
  _p(`${_csi ? csi : esc}${r}`, false);
}
/**  隐藏光标消失  */
function cursorHide() {
  __p('?25l');
}
/**   展示光标出现 */
function cursorShow() {
  __p('?25h');
}

/**  🧹 光标之后的显示 */
function cursorAfterClear(cursorReset: boolean = false) {
  // 移动光标到最左侧
  if (cursorReset) {
    cursorMoveLeft(Infinity);
  }
  __p('0J');
}
/**  清理光标所在行光标之后的显示  */
function cursorLineAfterClear() {
  __p('0K');
}
/**  清理光标所在行光标之前的内容  */
function cursorLineBeforeClear() {
  __p('1K');
}
/**
 * ## 清除光标所在行
 *
 * @param [resetCursor=false]  是否重置光标的位置，缺省值为 false
 *
 */
function cursorLineClear(resetCursor: boolean = false) {
  if (resetCursor) {
    cursorMoveLeft(Infinity);
  }
  __p('2K');
}
/**  获取光标的位置  */
function cursorGetPosition() {
  __p('6n');
}

/**  保存光标的位置  */
function cursorPositionSave() {
  __p(7, false);
}

/**  恢复光标的位置复原  */
function cursorPositionUndo() {
  __p(8, false);
}
/**  设置光标的位置  */
function cursorMoveTo(options?: { column?: number; row: number }) {
  const originOption = {
    column: 0,
    row: 0,
  };
  if (isUndefined(options)) {
    options = {
      ...originOption,
    };
  }
  if (isFalse(isPlainObject(options))) {
    throw new TypeError('options 类型与期盼不符');
  }

  let { row, column } = {
    ...originOption,
    ...options,
  };

  row = computerLen(row, 'horizontal');
  column = computerLen(column);

  __p(`${row};${column}H`);
}

/**
 *
 * ## 光标位置向 ⬆️ 移动
 *
 * 当值为无穷大时，默认移动到最 ⬆️，但是可能会显示大片 🈳 白
 * @param len 光标向 ⬆️ 移动的行数
 *   - 默认为 1
 *   - 必须大于 1
 *   - 必须是整数
 *   - 非数值则尝试转化为数值
 *   - 无穷大则会移动到最 ⬆️
 * @param [resetCursor=false] 是否重置光标位置到最左侧，缺省值为不移动
 * @returns void 返回 void
 *
 */
function cursorMoveUp(len: number = 1, resetCursor: boolean = false) {
  __p(`${computerLen(len, 'vertical')}A`);
  if (resetCursor) {
    cursorMoveLeft(Infinity);
  }
}
/**
 * ## 光标位置向 ⬇️ 移动
 *
 * 当值为无穷大时，默认移动到最 ⬇️，但是可能会显示大片 🈳 白
 * @param len 光标向 ⬇️ 移动的行数
 *   - 默认为 1
 *   - 必须大于 1
 *   - 必须是整数
 *   - 非数值则尝试转化为数值
 *   - 无穷大则会移动到最 ⬇️
 * @param [resetCursor=false] 是否重置光标位置到最左侧，缺省值为不移动
 * @returns void 返回 void
 *
 *
 */
function cursorMoveDown(len: number = 1, resetCursor: boolean = false) {
  __p(`${computerLen(len, 'vertical')}B`);
  if (resetCursor) {
    cursorMoveLeft(Infinity);
  }
}
/**
 *
 * ## 光标位置向 ⬅️ 移动
 *
 * 当值为无穷大时，默认移动到最 ⬅️ 侧
 * @param len   光标 ⬅️ 移的数量
 *   - 默认为 1
 *   - 必须大于 1
 *   - 必须是整数
 *   - 非数值则尝试转化为数值
 *   - 无穷大则会移动到最 ⬅️ 侧
 * @returns void 返回 void
 *
 */
function cursorMoveLeft(len: number = 1) {
  __p(`${computerLen(len)}D`);
}
/**
 *
 * ## 光标向 ➡️ 移动
 *
 * 当值为无穷大时，默认移动到最 ➡️ 侧
 * @param len   光标 ➡️ 移的数量
 *   - 默认为 1
 *   - 必须大于 1
 *   - 必须是整数
 *   - 非数值则尝试转化为数值
 *   - 无穷大则会移动到最  ➡️ 侧
 * @returns void 返回 void
 */
function cursorMoveRight(len: number = 1) {
  __p(`${computerLen(len)}C`);
}

/**
 *
 * 计算光标移动的长度
 *
 * @param len  数值
 * @param [direction='horizontal'] 计算的方向值，默认为横向终端的宽（列数）
 * @returns number 整理后的数值
 *
 */
function computerLen(
  len: number,
  direction: 'horizontal' | 'vertical' = 'horizontal',
): number {
  // dog('计算光标移动的长度', '方向为：', direction);
  // dog('数值化前的值:', len);
  len = Number(len);
  // dog('数值化后的值:', len);
  // 非数值
  if (
    !isNumber(len) ||
    isNaN(len) ||
    len < 1 ||
    (Number.isInteger(len) === false && len !== Infinity)
  ) {
    // dog.warn('由于 len =', len, '不符合要求，转化为 1');
    len = 1;
  }

  /**  最大值  */
  const maxLength = isNode()
    ? direction === 'horizontal'
      ? process.stdout.columns
      : process.stdout.rows
    : 80;

  if (Infinity === len || len > maxLength) {
    // dog.warn('由于 len 的值超大而转化为超大值');
    len = maxLength;
  }
  return len;
}

export {
  __p,
  cursorAfterClear,
  cursorHide,
  cursorShow,
  cursorGetPosition,
  cursorMoveUp,
  cursorMoveDown,
  cursorMoveLeft,
  cursorMoveRight,
  cursorLineAfterClear,
  cursorLineBeforeClear,
  cursorLineClear,
  cursorPositionSave,
  cursorPositionUndo,
  cursorMoveTo,
};
