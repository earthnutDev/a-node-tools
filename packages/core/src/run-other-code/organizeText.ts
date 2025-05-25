import { cursorAfterClear } from '../cursor';
import { isWindows } from '../path';
import { waitingTipsResult } from '../waiting';

/**
 *
 * 整理数据
 *
 */
export function organizeText(
  value: unknown,
  printLog: boolean,
  waitingObj: waitingTipsResult,
): string {
  let data: string = value.toString().trim();

  /// 尾部换行符
  if (!/\n$/.test(data)) {
    data = data.concat(isWindows ? '\r\n' : '\n');
  }
  data = data.replace(/\n+/g, '\n');
  // 🧹光标后内容
  cursorAfterClear(); // 防止妖魔鬼怪不离开
  // 打印文本
  if (printLog) {
    waitingObj.log(data);
  }
  return data;
}
