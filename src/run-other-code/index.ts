import { spawn } from 'node:child_process';
import { getRandomInt } from 'a-js-tools';
import { cursorAfterClear, cursorHide, cursorShow } from '../cursor';
import { _p } from '../print';
import { isFunction, isString } from 'a-type-of-js';
import { t } from 'color-pen';
import { RunOtherCodeParam } from './types';
import { isWindows, pathJoin } from '../path';

/**
 *
 * 运行其他命令
 *
 * 此处使用的 'child_process' 的 exec 创建一个子线程
 *
 *
 *   ```ts
 *   import { runOtherCode } from  "ismi-node-tools";
 *
 *
 *   runOtherCode({
 *           code:"ls",
 *           cwd : "../",
 *           hideWaiting: true,
 *           waitingMessage: 'please wait a moment',
 *           printLog: true,
 *   }).then((resolve)=>{
 *       console.log(resolve);
 *   });
 *
 *   ```
 *
 * 或者
 *
 * ```ts
 *  const result = await runOtherCoder('ls');
 *
 *  // 打印  `true` 后者 `false`
 *  console.log(result.success);
 *
 *  //如果发生执行错误，则此处将有一个值。
 *  console.log(result.error);
 *
 *  // 如果 result.success === true，则会出现你自己的代码的实际返回值
 *  console.log(result.data);
 *
 * ```
 *
 * @param param  { code:string , cwd: string, callback:()=> void}
 *
 * @returns   返回一个 Promise
 *
 *  返回值包含执行的信息。
 *
 *  如果是串行执行，那么结果的话可能就是一个奇特的大字符串
 */
export function runOtherCode(param: RunOtherCodeParam): Promise<{
  error: undefined | string | unknown;
  success?: boolean;
  data?: undefined | string;
}> {
  /** 一个简单的轮询  */
  const aSettingRollup = {
    count: 0,
    timeStamp: setTimeout(() => 1),
  };

  /// 倘若传入的实参是一个字符串，则默认仅传入
  if (isString(param)) {
    param = { code: param };
  }

  /// 混合值，将实参进行整理
  const template = Object.assign(
    {
      cwd: '',
      hideWaiting: false,
      waitingMessage: '',
      printLog: true,
    },
    param,
  );
  const { code, callBack, hideWaiting, waitingMessage, printLog } = template;
  let { cwd } = template;
  /** 打印请稍等。。。 */
  if (!hideWaiting) {
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
    aSettingRollup.timeStamp = setInterval(() => {
      // 🧹光标后内容
      cursorAfterClear();
      // 打印文本
      _p(
        `\n${waitingMessage}${'.'.repeat(++aSettingRollup.count % pLength)}${t}20D${t}1A`,
        false,
      );
    }, 100);
  }
  /// 整理工作路径
  cwd = pathJoin(process.cwd(), cwd);
  /** 解析命令 */
  const commandLine = code
    .replace(/\s{2,}/, ' ')
    .trim()
    .split(' ');

  try {
    return new Promise(resolve => {
      let stdoutData = '',
        stderrData = '',
        success = true;
      /** 子命令  */
      const childProcess = spawn(commandLine[0], commandLine.slice(1), {
        cwd,
        shell: true,
      });
      /// 标准输出流
      childProcess.stdout.on('data', data => {
        let _data: string = data.toString();
        /// 尾部换行符
        if (!/\n$/.test(_data)) {
          _data = _data.concat(isWindows ? '\r\n' : '\n');
        }

        if (!/^\s*$/.test(_data)) {
          // 🧹光标后内容
          cursorAfterClear();
          // 打印文本
          if (printLog) {
            _p(_data, !_data.endsWith('\n'));
          }
          stdoutData += _data;
        }
      });
      /// 标准输出流输出错误
      childProcess.stderr.on('data', error => {
        let _data = error.toString();
        /// 尾部换行符
        if (!/\n$/.test(_data)) {
          _data = _data.concat(isWindows ? '\r\n' : '\n');
        }
        // 🧹光标后内容
        cursorAfterClear();
        // 打印文本
        if (printLog) {
          _p(_data, !_data.endsWith('\n'));
        }
        stderrData += _data;
      });
      /// 出现错误
      childProcess.on('error', error => {
        success = !1;
        let _data = error.toString();
        /// 尾部换行符
        if (!/\n$/.test(_data)) {
          _data = _data.concat(isWindows ? '\r\n' : '\n');
        }
        // 🧹光标后内容
        cursorAfterClear();
        // 打印文本
        if (printLog) {
          _p(_data, !_data.endsWith('\n'));
        }
      });
      /// 子进程关闭事件
      childProcess.on('close', () => {
        setTimeout(() => {
          if (callBack && isFunction(callBack)) {
            Reflect.apply(callBack, null, []);
          }
          /// 🧹定时器
          clearInterval(aSettingRollup.timeStamp);
          /// 🧹光标后的内容，避免出现打印残留
          cursorAfterClear();
          /// 返回之前将光标展示出来
          cursorShow();
          process.removeListener('exit', cursorShow);
          resolve({ success, data: stdoutData, error: stderrData });
        }, 100);
      });
    });
  } catch (error) {
    if (process.env.A_NODE_TOOLS_DEV === 'true') {
      console.error(error);
    }
    clearInterval(aSettingRollup.timeStamp);
    //  🧹光标后的剩余屏幕部分
    cursorAfterClear();
    _p('❌ ❌ 子线程执行失败 ❌ ❌ ❌'.concat((error as string).toString()));
    return new Promise(resolve => {
      /// 在返回值之前展示光标
      cursorShow();
      process.removeListener('exit', cursorShow);
      resolve({ error, data: undefined, success: false });
    });
  }
}
