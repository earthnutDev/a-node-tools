import { createInterface } from 'node:readline';
import { _p } from './print';
import { t } from 'color-pen';

/** 一个转义码  */
const { stdout, stdin } = process;

/*** 打印转义的内容  */
const __p = (r: string | number) => _p(`${t}${r}`, false);

/** Cursor is hidden at the terminal
 *
 * 光标在终端进行隐藏
 */
const cursorHide = () => __p('?25l');
/** Cursor display
 *
 * 光标进行显示
 */
const cursorShow = () => __p('?25h');

/**
 *
 * 清理光标之后的内容
 */
const cursorAfterClear = () => __p('0J');
/** get cursor position
 *
 * 获取光标的位置 */
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
/** set cursor position
 *
 * 设置光标位置
 */
// const cursorSetPosition = (cursorPosition: number[]) => __p(`${cursorPosition.join(';')}H`);
/** Move cursor position up
 *
 * 光标位置向上移动
 *
 * @param numberOfUpwardMoves   type, number of cursor moves up
 */
const cursorMoveUp = (numberOfUpwardMoves: number = 1) =>
  __p(`${numberOfUpwardMoves}A`);
/**   Move cursor position down
 *
 *
 *
 * @param numberOfMovesDown      number of cursor moves down
 *
 *
 */
const cursorMoveDown = (numberOfMovesDown: number = 1) =>
  __p(`${numberOfMovesDown}B`);
/** Move cursor position left
 *
 * 光标位置向左移动
 *
 * @param numberOfLeftShifts  {@link Number} Number of left shifts
 *
 *        numberOfLeftShifts {@link Number}  光标左移的数量
 */
const cursorMoveLeft = (numberOfLeftShifts: number = 1) =>
  __p(`${numberOfLeftShifts}D`);
/** Number of right shifts
 *
 *
 *  光标向右移动
 * @param numberOfRightShifts  {@link Number} of right shifts
 *
 *       numberOfRightShifts  {@link Number} 类型，光标右移的数量
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
