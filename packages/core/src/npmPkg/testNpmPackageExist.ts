import { isUndefined } from 'a-type-of-js';
import { dog } from '../utils/dog';
import { getNpmPkgInfo } from './getNpmPkgInfo';
import { parseName } from './parseName';
import { npmRegistry } from './types';
/**
 * 测试 npm  包是否存在
 *
 * 包存在则返回 true，不知存在则返回 false （刷的太快有意外，注意）
 *
 * @param pkgName - npm 包名
 * @param [registry='淘宝']  - 源。缺省值：'淘宝'
 */
export async function testNpmPackageExist(
  pkgName: string,
  registry: npmRegistry = '淘宝',
): Promise<boolean | number | null> {
  const _pkgName = parseName(pkgName);
  if (!_pkgName) {
    return null;
  }
  try {
    const result = await getNpmPkgInfo(_pkgName, registry);
    dog('测试包是否存在', result);
    if (!isUndefined(result.data) || result.status === 'parseJsonError') {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    dog.error(error);

    return null;
  }
}
