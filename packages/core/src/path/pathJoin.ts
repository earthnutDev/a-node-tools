import { join, normalize } from 'node:path';

/**
 * ## 地址串联
 * @param _path - 地址
 * @returns - 地址串联后经 path.normalize 处理后的地址
 * @example
 * ```ts
 *  import { pathJoin } from 'a-node-tools';
 *
 *  pathJoin('a','b','c'); // a/b/c
 *  pathJoin('a/','b/','c/'); // a/b/c/
 *  pathJoin('a/','b/','c/','d/'); // a/b/c/d/
 *  pathJoin('a/','b/','c/','d/','e/'); // a/b/c/d/e/
 * ```
 */
export function pathJoin(..._path: string[]) {
  return normalize(join(..._path));
}
