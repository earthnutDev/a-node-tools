import { dog } from './../dog';
import { fileExist } from '../file/isEmpty';
import { pathDirname } from './pathDirname';
import { pathJoin } from './pathJoin';

/** 根据给定的文件或文件夹名称找到父级目录
 *
 * @param target  目标文件或文件夹
 * @param type 当前设定目标的类型：文件 `file` 或是文件夹 `directory`
 * @param [originalPath='']  查找的原始路径
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
  originalPath: string = '',
): string | undefined {
  // 当前工作目录
  let cwd: string = originalPath || process.cwd();
  /**  判断当前工作目录是否存在  */
  const cwdIsExist = fileExist(cwd);
  dog('当前工作目录', cwd);
  // 倘若 cwd 不存在（只要针对于传入参数的情况）
  if (!cwdIsExist) {
    dog('🎯 工作目录不存在');
    return '';
  }
  if (cwdIsExist.isFile()) {
    cwd = pathDirname(cwd);
  } else if (!cwdIsExist.isDirectory()) {
    return '';
  }
  do {
    // 目标文件
    const fileTest = fileExist(pathJoin(cwd, target));
    // 判断文件
    if (
      fileTest &&
      ((type == 'file' && fileTest.isFile()) ||
        (type == 'directory' && fileTest.isDirectory()))
    ) {
      return cwd;
    }
    dog('♻️ 查找中...', cwd);
    cwd = pathJoin(cwd, '..');
  } while (cwd !== pathJoin(cwd, '..'));
  return '';
}
