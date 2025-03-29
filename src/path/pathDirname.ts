import { dirname } from 'node:path';

/**
 *
 * 获取文件的目录名称
 *
 * @param path  文件路径
 * @returns  文件目录
 * @example
 *
 * ```ts
 *  import { pathDirname } from 'a-node-tools';
 *
 *
 *
 * ```
 *
 */
export function pathDirname(path: string) {
  return dirname(path);
}
