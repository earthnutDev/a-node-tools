import { dirname } from 'node:path';

/**
 *
 * Get the directory name of the file
 *
 * @param path  file path
 * @returns  directory name
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
