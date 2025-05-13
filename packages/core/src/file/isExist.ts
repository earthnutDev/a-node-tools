import { Stats, statSync } from 'node:fs';

/**
 *  检验文件或文件接是否存在
 *
 * @param  fileDir  {@link String} 类型，为文件的路径（相对路径或绝对路径）
 * @returns Stats    Stats 或是 undefined
 */
export function isExist(fileDir: string): Stats | undefined {
  return statSync(fileDir, { throwIfNoEntry: false });
}
