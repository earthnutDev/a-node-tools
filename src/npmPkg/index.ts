import https from 'node:https';
import { npmPkgInfoType } from './types';

/**
 *
 * 获取给定 npm 包的内容的信息
 *
 * @param pkgName 包的名字
 *
 * @returns 返回是一个对象
 */
export async function getNpmPkgInfo(
  pkgName: string,
): Promise<Record<string, never> | npmPkgInfoType> {
  return new Promise(resolve => {
    (async () => {
      let result: string = '';
      const npmPackageIsExit = await testNpmPackageExist(pkgName);
      if (npmPackageIsExit == 404 || !npmPackageIsExit) return resolve({});
      const req = https.get(
        `https://www.npmjs.com/package/${pkgName || 'ismi-node-tools'}`,
        {
          headers: {
            'sec-fetch-dest': 'empty',
            // "X-Requested-With": "XMLHttpRequest",
            // "Sec-Fetch-Mode": "cors",
            // "Sec-Fetch-Site": "same-origin",
            // Accept: "*/*",
            // Referer: `https://www.npmjs.com/package/${pkgName}`,
            'X-Spiferack': 1,
          },
        },
        response => {
          response.on('data', data => (result += data.toString()));
          /// 请求结束后
          response.on('end', () => {
            if (response.statusCode == 200) {
              const pkgInfo: npmPkgInfoType = JSON.parse(result);
              const info = pkgInfo.packageVersion;
              pkgInfo.name = info.name;
              pkgInfo.version = info.version;
              resolve(pkgInfo || {});
            } else {
              resolve({});
            }
          });
        },
      );
      req.on('error', () => resolve({}));
      req.end();
    })();
  });
}
/**
 * 测试 npm  包是否存在
 *
 * 包存在则返回 true，不知存在则返回 false （刷的太快有意外，注意）
 */
export async function testNpmPackageExist(
  pkgName: string,
): Promise<boolean | number | null> {
  if (!pkgName) {
    return null;
  }
  if (pkgName.includes('@')) {
    const pkgNameArray = pkgName.split('@');
    const arrLength = pkgNameArray.length;
    if (pkgNameArray[0] === '') {
      if (3 === arrLength) {
        pkgName = `@${pkgNameArray[1]}/v/${pkgNameArray[2]}`;
      } else if (2 === arrLength) {
        pkgName = `@${pkgNameArray[1]}`;
      } else {
        return null;
      }
    } else {
      if (2 === arrLength) {
        pkgName = `@${pkgNameArray[0]}/v/${pkgNameArray[1]}`;
      } else {
        return null;
      }
    }
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
