import { fileURLToPath } from 'node:url';
import { isWindows } from './isWindows';
import { getCallerFilename } from './getCallerFileInfo';
import { dirname } from 'node:path';

/**
 *
 * 初始化 `__filename` 和 `__dirname`
 *
 * @returns   [__filename,__dirname]
 */
export function initializeFile(): [string, string] {
  /** 文件地址  */
  let a: string;
  /** 文件躲在目录地址  */
  try {
    new Function('import("")');
    a = fileURLToPath(import.meta.url);
  } catch (error) {
    if (process.env.A_NODE_TOOLS_DEV === 'true') {
      console.error(error);
    }
    a = __filename;
  }
  if (isWindows) a = a.replace(/\\/gm, '/');
  a = getCallerFilename(a);
  const b: string = dirname(a);
  return [a, b];
}
