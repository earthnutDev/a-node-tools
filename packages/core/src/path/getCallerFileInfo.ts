import { isWindows } from './isWindows';

/**
 *
 * 获取调用文件信息，此方法存在一些限制，请谨慎使用
 *
 *
 * @param fileName 通过调用文件信息，返回调用者的文件路径
 * @returns 调用文件的信息
 *     - name 文件名
 *     - line 行号
 *     - row  列数
 *     - originArr 调用栈信息
 *
 */
export function getCallerFileInfo(fileName: string): {
  name: string;
  line: number;
  row: number;
  originArr: string[];
} {
  /** 结果行 */
  const regexp = new RegExp(fileName);
  let errorInfo: Error;
  try {
    // 抛出异常好通过这里捕捉调用栈信息
    throw new Error();
  } catch (error: unknown) {
    errorInfo = error as Error;
  }
  const lines: string[] = (
    errorInfo.stack?.replace(/\\/gm, '/').split('\n') as string[]
  ).reverse();
  /** 查找结果 */
  const resultIndex: number = lines.findIndex(
    (currentEle: string, currentIndex: number, arr: string[]) =>
      !regexp.test(currentEle) && regexp.test(arr[currentIndex + 1]),
  );
  /** 如果没找到 */
  if (resultIndex == -1) return { name: '', line: 0, row: 0, originArr: lines };

  let result = lines[resultIndex];

  // 去除结果行中的 （） 外部分
  if (/\(.*\)/.test(result)) {
    result = result.replace(/^.*\((.*)\).*/, '$1');
  }
  /** 在 windows 环境去除 file：/// 前缀 */
  if (/file:\/*/.test(result)) {
    result = result.replace(/^.*file:\/*(.*)/, '$1');
  }
  // 非 windows 桌面添加 /
  if (!isWindows && !result.startsWith('/')) {
    result = '/' + result;
  }
  return {
    name: result.replace(/^(.*):\d+:\d+$/, '$1'),
    line: Number(result.replace(/^.*:(\d+):\d+$/, '$')),
    row: Number(result.replace(/^.*:\d+:(\d+)$/, '$1')),
    originArr: lines,
  };
}

/**
 *
 * 获取调用文件的文本信息
 *
 * 需要搭配使用 `initializeFile`
 *
 *
 * @param fileName 请使用 __filename
 * @returns 调用者信息
 * @example
 *
 *  ```ts
 *  const [__filename,__dirname]  = initializeFile;
 *  const dir = getCallerFilename(__dirname);
 *
 * ```
 *
 *
 */
export function getCallerFilename(fileName: string) {
  return getCallerFileInfo(fileName).name;
}
