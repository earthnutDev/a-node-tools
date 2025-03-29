import https from 'https';
import { parseName } from './parseName';
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
  return new Promise(resolve => {
    const req = https.get(
      `https://www.npmjs.com/package/${pkgName}`,
      response => (
        response.on('data', () => 0),
        response.on('end', () => resolve(response.statusCode == 200))
      ),
    );
    req.on('error', () => resolve(404));
    req.end();
  });
}
