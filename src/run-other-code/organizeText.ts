import { cursorAfterClear } from 'src/cursor';
import { isWindows } from 'src/path';
import { _p } from 'src/print';

/**
 *
 * 整理数据
 *
 */
export function organizeText(value: unknown, printLog: boolean): string {
  let data: string = value.toString().trim();

  /// 尾部换行符
  if (!/\n$/.test(data)) {
    data = data.concat(isWindows ? '\r\n' : '\n');
  }
  data = data.replace(/\n+/g, '\n');
  // 🧹光标后内容
  cursorAfterClear();
  // 打印文本
  if (printLog) {
    _p(data, !data.endsWith('\n'));
  }
  return data;
}
