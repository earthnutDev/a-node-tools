import { getRandomInt } from 'a-js-tools';
import { csi } from 'color-pen';
import {
  cursorAfterClear,
  cursorHide,
  cursorMoveLeft,
  cursorShow,
} from '../cursor';
import { _p } from '../print';

/**
 *
 * 等待
 *
 */
export function waiting(hideWaiting: boolean, waitingMessage: string) {
  let count = 0;
  let timeStamp: undefined | NodeJS.Timeout = undefined;

  /**  销毁等待信息  */
  function destroyed() {
    if (timeStamp) {
      clearInterval(this.count);
    }
    cursorMoveLeft(Infinity); /// 移动到最左边
    cursorAfterClear(); /// 🧹光标后的内容，避免出现打印残留
    /// 返回之前将光标展示出来
    cursorShow();
    process.removeListener('exit', cursorShow);
    cursorShow();
  }

  if (!hideWaiting) {
    return destroyed;
  }

  /** 随机出一个待渲染列队 */
  const pList: string[] = [
    ['.', '..', '...', '....', '...', '..'],
    ['···', '⋱', '⋮', '⋰'],
    ['⤯', '⤰', '⤮', '⤩', '⤪', '⤧', '⤨'],
  ][getRandomInt(2)];
  /** 随机出的等待标志符数组的长度 */
  const pLength: number = pList.length;
  /// 隐藏光标
  cursorHide();
  // 放置一个在进程结束时展示光标，即便在测试发现异步操作会阻塞该事件的触发
  process.on('exit', cursorShow);
  /// 心跳打印 '请稍等'
  timeStamp = setInterval(() => {
    // 🧹光标后内容
    cursorAfterClear();
    // 打印文本
    _p(
      `\n${waitingMessage}${'.'.repeat(++count % pLength)}${csi}20D${csi}1A`,
      false,
    );
  }, 100);
  return destroyed;
}
