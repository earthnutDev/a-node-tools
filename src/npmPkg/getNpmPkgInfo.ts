import { parseName } from './parseName';
import { DefaultT, npmPkgInfoType, npmRegistry } from './types';
import https from 'node:https';

/**
 *
 * 获取给定 npm 包的内容的信息
 *
 * @param pkgName 包的名字
 *
 * @returns 返回是一个对象
 */
export async function getNpmPkgInfo<T extends DefaultT = DefaultT>(
  pkgName: string,
  registry: npmRegistry = '淘宝',
): Promise<npmPkgInfoType | null> {
  const registryList = {
    淘宝: 'registry.npmjs.org',
    官方: 'registry.npmjs.org',
    腾讯: 'mirrors.tencent.com',
    中科大: 'npmreg.proxy.ustclug.org',
    yarn: 'registry.yarnpkg.com',
  };
  const hostname: string = registryList[registry] || registryList['淘宝'];

  return new Promise(resolve => {
    (() => {
      let result: string = '';
      const parsedName = parseName(pkgName) || 'a-node-tools';

      /**  请求的网址  */
      const path = (registry === '腾讯' ? '/npm' : '').concat(`/${parsedName}`);

      const options = {
        hostname,
        path,
        headers: {
          'sec-fetch-dest': 'empty',
          'X-Spiferacl': '1',
        },
      };

      const req = https.get(options, response => {
        response.on('data', data => (result += data.toString()));
        /// 请求结束后
        response.on('end', () => {
          try {
            if (response.statusCode == 200) {
              const pkgInfo: npmPkgInfoType<T> = JSON.parse(result);

              pkgInfo.version = pkgInfo['dist-tags'].latest;
              resolve(pkgInfo || null);
            }
            // 404 返回值为 { error: 'Not found' }
            else {
              resolve(null);
            }
          } catch (error) {
            if (process.env.A_NODE_TOOLS_DEV === 'true') {
              console.error(error);
            }
            resolve(null);
          }
        });
      });

      req.on('error', () => resolve(null));
      req.end();
    })();
  });
}
