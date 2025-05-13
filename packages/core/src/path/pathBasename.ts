import { posix, win32 } from 'node:path';
import { isWindows } from './isWindows';

/**
 *
 *
 *  文件名
 *
 *  @param filename  文件名
 *  @returns  不带后缀的文件名
 *
 */
export function pathBasename(filename: string) {
  const conversionPath = isWindows
    ? filename.replace(/\//g, '\\')
    : filename.replace(/\\/g, '/');

  return (isWindows ? win32 : posix).basename(conversionPath);
}
