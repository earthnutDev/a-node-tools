import { createInterface } from 'node:readline';
import { _p } from './print';
import { t } from 'color-pen';

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
 * 清理光标之后的显示
 *
 *
 */
const cursorAfterClear = () => __p('0J');
/**
 *
 * 获取光标的位置
 *
 */
const cursorGetPosition = () => {
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
 * 光标位置向上移动
 *
 * @param numberOfUpwardMoves
 */
const cursorMoveUp = (numberOfUpwardMoves: number = 1) => {
  numberOfUpwardMoves =
    isFinite(numberOfUpwardMoves) && numberOfUpwardMoves > 0
      ? Math.round(numberOfUpwardMoves)
      : 1;
  return __p(`${numberOfUpwardMoves}A`);
};
/**
 * 光标位置向下移动
 *
 *
 *
 * @param numberOfMovesDown
 *
 *
 */
const cursorMoveDown = (numberOfMovesDown: number = 1) =>
  __p(`${numberOfMovesDown}B`);
/**
 *
 * 光标位置向左移动
 *
 * @param numberOfLeftShifts   光标左移的数量
 */
const cursorMoveLeft = (numberOfLeftShifts: number = 1) =>
  __p(`${numberOfLeftShifts}D`);
/**
 *
 *
 *  光标向右移动
 *
 * @param numberOfRightShifts  类型，光标右移的数量
 *
 *
 */
const cursorMoveRight = (numberOfRightShifts: number = 1) =>
  __p(`${numberOfRightShifts}C`);

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
