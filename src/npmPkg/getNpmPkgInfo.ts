import { testNpmPackageExist } from './testNpmPackageExist';
import { npmPkgInfoType } from './types';
import https from 'node:https';

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
