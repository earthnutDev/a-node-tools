import { createInterface } from 'node:readline';
import { _p } from './print';
import { t } from 'color-pen';
import { isNumber } from 'a-type-of-js';

/** 一个转义码  */
const { stdout, stdin } = process;

/*** 打印转义的内容  */
const __p = (r: string | number) => _p(`${t}${r}`, false);

/**
 *
 * 隐藏光标消失
 *
 *
 */
const cursorHide = () => __p('?25l');
/**
 *
 * 展示光标出现
 *
 *
 */
const cursorShow = () => __p('?25h');

/**
 *
 *
 * 🧹 光标之后的显示
 *
 *
 */
const cursorAfterClear = () => __p('1J');
/**
 *
 * 获取光标的位置
 *
 */
const cursorGetPosition = async () => {
  const rl = createInterface({
    input: stdin,
    output: stdout,
  });
  return new Promise((resolve, reject) => {
    __p('6n');
    const dataCall = (data: { toString: () => string }) => {
      // eslint-disable-next-line no-control-regex
      const match = data.toString().match(/^\x1b\[(\d+);(\d+)R$/i);
      if (match) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, row, col] = match;
        stdin.removeListener('data', dataCall);
        rl.close();
        resolve([row, col]);
      }
      reject([0, 0]);
    };
    stdin.on('data', dataCall);
  });
};
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
 * @returns void 返回 void
 *
 */
const cursorMoveUp = (len: number = 1) => {
  return __p(`${computerLen(len, 'vertical')}A`);
};
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
 * @returns void 返回 void
 *
 *
 */
function cursorMoveDown(len: number = 1) {
  __p(`${computerLen(len, 'vertical')}B`);
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
 * @returns number 整理后的数值
 *
 */
function computerLen(
  len: number,
  direction: 'horizontal' | 'vertical' = 'horizontal',
): number {
  len = Number(len);
  // 非数值
  if (
    !isNumber(len) ||
    isNaN(len) ||
    len < 1 ||
    Number.isInteger(len) === false
  ) {
    len = 1;
  }

  /**  最大值  */
  const maxLength =
    direction === 'horizontal' ? process.stdout.columns : process.stdout.rows;

  if (Infinity === len || len > maxLength) {
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
};
