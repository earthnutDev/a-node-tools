import {
  cursorAfterClear,
  cursorHide,
  cursorLineClear,
  cursorMoveLeft,
  cursorShow,
} from '../cursor';
import { _p } from '../print';
import { isFalse, isUndefined } from 'a-type-of-js';
import { RunOtherCodeWaiting } from './types';

/**
 *
 * 等待
 *
 */
export function waitingCn(waiting: RunOtherCodeWaiting) {
  let timeStamp: undefined | NodeJS.Timeout = undefined;

  /**  销毁等待信息  */
  function destroyed() {
    if (!isUndefined(timeStamp)) {
      clearInterval(timeStamp);
    }
    cursorMoveLeft(Infinity); /// 移动到最左边
    cursorAfterClear(); /// 🧹光标后的内容，避免出现打印残留
    /// 返回之前将光标展示出来
    process.removeListener('exit', exitCall); // 禁止多监听未移除导致程序报错
    process.removeListener('SIGINT', sigintCall); // 移除监听
    cursorShow();
  }
  if (isFalse(waiting.show)) return destroyed;

  const pStore = [
    ['.', '..', '...', '....', '...', '..'],
    ['···', '⋱', '⋮', '⋰', '···', '⋱', '⋮', '⋰'],
    ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛'],
    ['🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧'],
    ['👈', '👆', '👉', '👇', '🤘', '🤟', '🫳', '🫴', '👊'],
    [
      '🌞',
      '🌕',
      '🌖',
      '🌗',
      '🌜',
      '🌘',
      '🌑',
      '🌒',
      '🌓',
      '🌛',
      '🌔',
      '🌔',
      '🌔',
      '🌝',
    ],
  ];

  /** 随机出一个待渲染列队 */
  const pList: string[] =
    pStore[Math.min(pStore.length - 1, Math.max(waiting.suffix, 0))];
  /** 随机出的等待标志符数组的长度 */
  const pLength: number = pList.length;
  let count = 0;
  /// 隐藏光标
  cursorHide();
  // 放置一个在进程结束时展示光标，即便在测试发现异步操作会阻塞该事件的触发
  process.on('exit', exitCall);
  process.on('SIGINT', sigintCall);
  /// 心跳打印 '请稍等'
  timeStamp = setInterval(() => {
    // 🧹光标后内容
    cursorLineClear();
    // 打印文本
    _p(`${waiting.info}${pList[++count % pLength]}`, false);
    cursorMoveLeft(Infinity); // 防止别的打印列占用较少导致
  }, waiting.interval);
  return destroyed;
}

/**
 * 退出之前
 */
function exitCall() {
  cursorShow();
}

/**
 * 接收到 SIGINT 信号
 */
function sigintCall() {
  cursorShow();
}
