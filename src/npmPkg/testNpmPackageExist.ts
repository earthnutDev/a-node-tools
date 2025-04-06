import { parseName } from './parseName';
import { getNpmPkgInfo } from './getNpmPkgInfo';
/**
 * 测试 npm  包是否存在
 *
 * 包存在则返回 true，不知存在则返回 false （刷的太快有意外，注意）
 */
export async function testNpmPackageExist(
  pkgName: string,
): Promise<boolean | number | null> {
  pkgName = parseName(pkgName);
  if (!pkgName) {
    return null;
  }
  const result = await getNpmPkgInfo(pkgName);
  if (result) {
    return true;
  } else {
    return false;
  }
}
