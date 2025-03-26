import { posix, win32 } from 'node:path';
import { isWindows } from './isWindows';

/**
 *
 *
 *  file name
 *
 *  @param filename  file name
 *  @returns  file name
 *
 */
export function pathBasename(filename: string) {
  const conversionPath = isWindows
    ? filename.replace(/\//g, '\\')
    : filename.replace(/\\/g, '/');

  return (isWindows ? win32 : posix).basename(conversionPath);
}
