import { parseName } from './parseName';
import { DefaultT, npmPkgInfoType } from './types';
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
): Promise<npmPkgInfoType | null> {
  return new Promise(resolve => {
    (() => {
      let result: string = '';
      const parsedName = parseName(pkgName) || 'a-node-tools';
      /**  请求的网址  */
      const path = `/${parsedName}`;

      const options = {
        hostname: 'registry.npmjs.org',
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
