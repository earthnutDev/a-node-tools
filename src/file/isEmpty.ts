import { dog } from './../dog';
import { readdirSync } from 'node:fs';
import { isExist } from './isExist';

/**
 * 判断文件夹是否为空
 *
 *
 * @returns [-1 , 0 , 1] 返回值为简单的 `-1`、`0`、`1`
 *      - `-1` 当前给出的目录名在当前目录下不是目录或是打开失败时返回该值
 *      - `0`   当前给出的目录名为目录，但是该目录为非空目录
 *      - `1` 当前目录为空
 *
 * @example
 *
 * ```ts
 * import { isEmpty } from 'a-node-tools';
 *
 * isEmpty('src/index.ts'); // -1
 * ```
 */
export function isEmpty(dirname: string): -1 | 0 | 1 {
  try {
    const fileInfo = isExist(dirname);
    if (fileInfo && fileInfo.isDirectory()) {
      return readdirSync(dirname, { withFileTypes: true }).length == 0 ? 1 : 0;
    }
  } catch (error) {
    dog.error('is ', error);
    return -1;
  }
  return -1;
}
