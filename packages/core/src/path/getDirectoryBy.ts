import { dog } from './../dog';
import { fileExist } from '../file/';
import { pathDirname } from './pathDirname';
import { pathJoin } from './pathJoin';
import { resolve } from 'node:path';
import { isZero } from 'a-type-of-js';

/** 根据给定的文件或文件夹名称找到父级目录
 *
 * @param target  目标文件或文件夹
 * @param [type='file']  当前设定目标的类型：文件 `file` 或是文件夹 `directory`。缺省值为 ‘file’
 * @param [originalPath='']  查找的原始路径，缺省值为当前的运行的目录
 * @returns 在捕获到目标后会返回目标，否则则返回 undefined
 * @example
 * ```ts
 * import { getDirectoryBy, _p } from 'a-node-tools';
 *
 * const result = getDirectoryBy('package.json');
 *
 * // 倘若 package.json 文件为兄弟目录
 *
 * _p(result); // process.cwd();
 *
 * // 倘若当前文件链并不会存在 package.json 则
 *
 * _p(result); // undefined
 *
 * ```
 */
export function getDirectoryBy(
  target: string,
  type: 'file' | 'directory' = 'file',
  ...originalPath: string[]
): string | undefined {
  // 当前工作目录，转化为绝对路径
  let cwd: string = resolve(...originalPath);
  /**  判断当前工作目录是否存在  */
  const cwdIsExist = fileExist(cwd);
  dog('当前工作目录', cwd);
  // 倘若 cwd 不存在（只要针对于传入参数的情况）
  if (!cwdIsExist) {
    dog('🎯 工作目录不存在');
    return '';
  }
  // 当前指定的目录（可能为非目录）为文件，则取父级目录
  if (cwdIsExist.isFile()) cwd = pathDirname(cwd);
  //  是否是非目录
  else if (!cwdIsExist.isDirectory()) return undefined;
  /**  执行次数，原则上无限，这里给出限制为 20   */
  let times = 20;
  const searchDir = () => {
    // 目标文件
    const fileTest = fileExist(pathJoin(cwd, target));
    // 判断文件
    if (
      // 判定有值且类型与指定相同
      fileTest &&
      ((type == 'file' && fileTest.isFile()) ||
        (type == 'directory' && fileTest.isDirectory()))
    )
      return cwd;

    if (isZero(times)) return undefined;
    times--; // 可迭代次数减一
    dog('♻️ 查找中...', cwd);
    /**  新的  */
    const nextCwd = pathJoin(cwd, '..');
    // 未找到
    if (nextCwd === cwd) return undefined;
    cwd = nextCwd;
    return searchDir();
  };

  return searchDir();
}
