import { parseName } from './parseName';
import { getNpmPkgInfo } from './getNpmPkgInfo';
import { npmRegistry } from './types';
/**
 * 测试 npm  包是否存在
 *
 * 包存在则返回 true，不知存在则返回 false （刷的太快有意外，注意）
 */
export async function testNpmPackageExist(
  pkgName: string,
  registry: npmRegistry = '淘宝',
): Promise<boolean | number | null> {
  pkgName = parseName(pkgName);
  if (!pkgName) {
    return null;
  }
  try {
    const result = await getNpmPkgInfo(pkgName, registry);
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (process.env.A_NODE_TOOLS_DEV === 'true') {
      console.log(error);
    }
    return null;
  }
}
