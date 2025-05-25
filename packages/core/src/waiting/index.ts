import {
  cursorAfterClear,
  cursorHide,
  cursorMoveLeft,
  cursorPositionSave,
  cursorPositionUndo,
  cursorShow,
} from '../cursor';
import { _p } from '../print';
import { isFalse, isUndefined } from 'a-type-of-js';
import {
  RunOtherCodeWaiting,
  waitingTipsParams,
  waitingTipsResult,
} from './types';
import { parse } from './parse';
import { exitCall } from './exitCall';
import { sigintCall } from './sigintCall';
import { log } from './log';
import { waitingTipsPrefixStore } from './waitingTipsPrefixStore';
import { suffixList } from './suffixList';
import { cutoffStringWithChar, strInTerminalLength } from 'color-pen';

export type { RunOtherCodeWaiting, waitingTipsResult, waitingTipsParams };

export { waitingTipsPrefixStore };

/**
 *
 * ## 等待
 *
 *     - show 可选属性，是否展示文本。缺省值为 true
 *     - info 可选属性，展示的具体文本。缺省值为 ""
 *     - interval 前缀的两个时间间隔
 *     - prefix 可选属性，展示跳动前缀类型。缺省将随机展示（可通过全局的 `waitingTipsPrefixStore` 数组替换为自己想要展示的前缀）
 *          - 0 旋转的省略号前缀 ['···', '⋱', '⋮', '⋰', '···', '⋱', '⋮', '⋰']
 *          - 1 时针旋转的前缀  ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖','🕗','🕘', '🕙','🕚','🕛']
 *          - 2 分针旋转前缀 ['🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧']
 *          - 3 前缀 ['👈','👆','👉','👇','🤘','🤟','🫳','🫴','👊']
 *          - 4 前缀 ['🌞','🌕','🌖','🌗' ,'🌜','🌘','🌑','🌒','🌓','🌛','🌔','🌔','🌔','🌝']
 */
export function waitingTips(params?: waitingTipsParams): waitingTipsResult {
  const { show, prefix: prefixIndex, info, interval } = parse(params);
  let timeStamp: undefined | NodeJS.Timeout = undefined;
  /**  打印列表  */
  const logList: unknown[][] = [];
  /**  原始打印  */
  const originLog = (...args: unknown[]) => log(args);

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
    cursorShow(); // 恢复光标
    logList.forEach(e => originLog(...e));
    logList.length = 0; /// 释放未完成的打印
    result.log = originLog; // 恢复原有的 log 打印
  }

  /**  执行  */
  function run() {
    // 重写
    result.log = (...args: unknown[]) => logList.push(args);
    /**  尾缀的长度  */
    const suffixLen = suffixList.length;
    /** 随机出一个待渲染列队 */
    const prefix: string[] =
      waitingTipsPrefixStore[
        Math.min(waitingTipsPrefixStore.length - 1, Math.max(prefixIndex, 0))
      ];
    /** 随机出的等待标志符数组的长度 */
    const prefixLen: number = prefix.length;
    /**  找出最长的前缀  */
    const maxLenPrefix = prefix.reduce(
      (v, e) => Math.max(v, strInTerminalLength(e)),
      0,
    );

    let count = 0;
    /// 隐藏光标
    cursorHide();
    // 放置一个在进程结束时展示光标，即便在测试发现异步操作会阻塞该事件的触发
    process.on('exit', exitCall);
    process.on('SIGINT', sigintCall);
    /// 心跳打印 '请稍等'
    timeStamp = setInterval(() => {
      // 🧹光标后内容
      cursorAfterClear(true);
      logList.forEach(e => log(e));
      logList.length = 0;
      cursorPositionSave();
      // 保证头部发挥稳定
      const managePrefix = cutoffStringWithChar(
        prefix[++count % prefixLen],
        maxLenPrefix,
      );
      // 打印文本
      _p(
        `${managePrefix}${info}${suffixList[Math.floor(count / 10) % suffixLen]}`,
        false,
      );
      cursorPositionUndo();
    }, interval);
  }

  const result: waitingTipsResult = {
    destroyed,
    log: originLog,
    run,
  };

  if (isFalse(show)) return result;

  result.run();
  return result;
}
