import { isPromise, isTrue, isUndefined } from 'a-type-of-js';
import { log } from './log';
import { parse } from './parse';
import { RunOtherCodeWaiting, waitingTipsParams } from './types';
import { readInput } from '../readInput';
import {
  cursorAfterClear,
  cursorHide,
  cursorMoveLeft,
  cursorMoveUp,
  cursorPositionSave,
  cursorPositionUndo,
  cursorShow,
} from '../cursor';
import { exitCall } from './exitCall';
import { sigintCall } from './sigintCall';
import { suffixList } from './suffixList';
import { waitingTipsPrefixStore } from './waitingTipsPrefixStore';
import {
  cutoffStringWithChar,
  cyanPen,
  magentaPen,
  strInOneLineOnTerminal,
  strInTerminalLength,
} from 'color-pen';
import { _p } from '../print';
import { esc } from '@color-pen/static';

/**  等待的返回结果  */
export class WaitingTipsResult {
  /**  执行参数  */
  #parsingParameters: RunOtherCodeWaiting;
  /**  时间戳  */
  #timeStamp: undefined | NodeJS.Timeout = undefined;
  /**  给定的读写使用键  */
  #readInputKey: symbol = Symbol('waiting-tips');
  /**  打印列表  */
  #logList: unknown[][] = [];

  /**  原始打印  */
  #originLog = (...args: unknown[]) => log(args);

  /**  当前的状态  */
  state: 'run' | 'destroyed' = 'destroyed';
  /**  启动时间  */
  #runTime: number = 0;

  /** 超时时间   */
  #timeout: number = 0;
  /**  销毁等待信息  */
  async destroyed() {
    if (this.state === 'destroyed') return;
    this.state = 'destroyed';
    this.#runTime = 0;

    if (!isUndefined(this.#timeStamp)) {
      clearInterval(this.#timeStamp);
    }
    readInput.remove(this.#readInputKey); // 移除当前的等待输入
    cursorMoveLeft(Infinity); /// 移动到最左边
    cursorAfterClear(); /// 🧹光标后的内容，避免出现打印残留
    /// 返回之前将光标展示出来
    process.removeListener('exit', exitCall); // 禁止多监听未移除导致程序报错
    process.removeListener('SIGINT', sigintCall); // 移除监听
    cursorShow(); // 恢复光标
    this.#logList.forEach(e => this.#originLog(...e));
    this.#logList.length = 0; /// 释放未完成的打印
    this.log = this.#originLog; // 恢复原有的 log 打印
    if (!isPromise(this.#parsingParameters.beforeDestroyed)) {
      this.#parsingParameters.beforeDestroyed();
    } else {
      await this.#parsingParameters.beforeDestroyed();
    }
  }

  /**  在等待中插入打印消息  */
  log: (...args: unknown[]) => void = this.#originLog;
  /**
   * ## 执行暂停的等待
   *
   *
   * - show 可选属性，是否展示文本。缺省值为 true
   * - info 可选属性，展示的具体文本。缺省值为 ""
   * - interval 前缀的两个时间间隔
   * - beforeDestroyed 临销毁前执行
   * - prefix 可选属性，展示跳动前缀类型。缺省将随机展示（可通过全局的 `waitingTipsPrefixStore` 数组替换为自己想要展示的前缀）
   *   - 0 旋转的省略号前缀 ['···', '⋱', '⋮', '⋰', '···', '⋱', '⋮', '⋰']
   *   - 1 时针旋转的前缀  ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖','🕗','🕘', '🕙','🕚','🕛']
   *   - 2 分针旋转前缀 ['🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧']
   *   - 3 前缀 ['👈','👆','👉','👇','🤘','🤟','🫳','🫴','👊']
   *   - 4 前缀 ['🌞','🌕','🌖','🌗' ,'🌜','🌘','🌑','🌒','🌓','🌛','🌔','🌔','🌔','🌝']
   */
  run(runParams?: waitingTipsParams) {
    if (this.state === 'run') {
      // 尚在运行，执行上一次的清理
      this.destroyed();
    }

    this.state = 'run';
    this.#runTime = Date.now();

    // 保证参数是新的
    this.#parsingParameters = isUndefined(runParams)
      ? this.#parsingParameters
      : parse(runParams, this.#parsingParameters);
    /**  解析参数  */
    const {
      prefix: prefixIndex,
      info,
      interval,
      canCtrlCExit,
      canCtrlDExit,
    } = this.#parsingParameters;

    // 重写 log
    this.log = (...args: unknown[]) => this.#logList.push(args);
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
    this.#timeStamp = setInterval(() => {
      // 🧹光标后内容
      cursorAfterClear(true);
      this.#logList.forEach(e => log(e));
      this.#logList.length = 0;
      _p('\n'.repeat(2));
      cursorMoveUp(3);
      cursorPositionSave();
      // 保证头部发挥稳定
      const managePrefix = cutoffStringWithChar(
        prefix[++count % prefixLen],
        maxLenPrefix,
      );
      if (Date.now() - this.#runTime < this.#timeout) {
        // 打印文本
        _p(
          strInOneLineOnTerminal(
            `${managePrefix} ${info.replace(/\n/, '\\n')}${suffixList[Math.floor(count / 10) % suffixLen]}`,
          ),
          false,
        );
      } else {
        _p(
          strInOneLineOnTerminal(
            `${managePrefix} ${info} ${magentaPen`当前已执行 ${Math.ceil((Date.now() - this.#runTime) / 1000)} 秒`}
             \n\r${cyanPen`可使用双击 esc 键退出（确保执行完成，若执行仍在期望时间内，请忽略）`}`,
          ),
          false,
        );
      }
      cursorPositionUndo();
    }, interval);
    readInput((keyValue, key) => {
      if (
        // 使用 ESC 键双击触发退出
        (key?.meta && key?.sequence === esc.repeat(2)) ||
        (isTrue(key?.ctrl) &&
          /// 使用（前提是允许使用）Ctrl + c 、 Ctrl + d 终结等待
          ((canCtrlCExit && key?.name === 'c') ||
            (canCtrlDExit && key?.name === 'd')))
      ) {
        this.destroyed();
        return true;
      }
      return false;
    }, this.#readInputKey);
  }

  /**  运行超时提醒（当配置值小于 600 时会按秒为单位，当值大于 600 会按毫秒计算）  */
  set timeout(time: number) {
    this.#runTime = Date.now();
    this.#timeout =
      !isFinite(time) || time < 0 ? 40000 : time < 600 ? time * 1000 : time;
  }

  /**  运行超时提醒（当配置值小于 600 时会按秒为单位，当值大于 600 会按毫秒计算）  */
  get timeout() {
    return this.#timeout;
  }

  /**  构建  */
  constructor(params?: waitingTipsParams) {
    this.#parsingParameters = parse(params);
    // 初始话时允许使用等待
    if (isTrue(this.#parsingParameters.show)) {
      this.run();
    }
  }
}
