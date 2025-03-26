import { isWindows } from './isWindows';

/**
 *
 * Get the information of the calling file
 *
 *
 *  @param fileName  Pass in the file path that calls the function (this path needs to be obtained with `initializeFile`
 *
 * @returns The calling file information
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
 * Get the address of the calling file, this method has some limitations, please use it with caution
 *
 * It is recommended to use it with `initializeFile`
 *
 *
 * @param fileName Please call the function when passing __filename
 * @returns The calling file address name string
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
