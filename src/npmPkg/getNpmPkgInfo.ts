import { isUndefined } from 'a-type-of-js';
import { dog } from './../dog';
import { parseName } from './parseName';
import { DefaultT, npmPkgInfoType, npmRegistry } from './types';
import https from 'node:https';

/**
 *
 * ## 获取给定 npm 包的内容的信息
 *
 * @param pkgName 包的名字
 * @param [registry='淘宝'] npm 源，默认是淘宝源。可选值： 淘宝、官方、腾讯、中科大、yarn、华为
 * @returns 返回是一个对象
 *
 * @example
 *
 * ```ts
 * import { getNpmPkgInfo ,_p } from 'a-node-tools';
 *
 * const pkgInlineInfo: npmPkgInfoType | null  = await getNpmPkgInfo('a-node-tools');
 *
 * if (isNull(pkgInlineInfo)) {
 *    throw new Error('获取包信息失败');
 * }
 *
 * _p(pkgInlineInfo.name); // 'a-node-tools';
 *
 * ```
 */
export async function getNpmPkgInfo<T extends DefaultT = DefaultT>(
  pkgName: string,
  registry: npmRegistry = '淘宝',
): Promise<npmPkgInfoType | null> {
  const registryList: Record<npmRegistry, string> = {
    淘宝: 'registry.npmmirror.com',
    官方: 'registry.npmjs.org',
    腾讯: 'mirrors.tencent.com',
    中科大: 'npmreg.proxy.ustclug.org',
    yarn: 'registry.yarnpkg.com',
  };
  const hostname: string = registryList[registry] || registryList['淘宝'];

  dog('get npm pkg info 开始执行');

  return new Promise(resolve => {
    (() => {
      let result: string = '';
      const parsedName = parseName(pkgName) || 'a-node-tools';
      dog('解析后的 pkg 名称', parsedName);
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
      dog('请求参数', options);
      const req = https.get(options, response => {
        response.on('data', data => {
          if (!isUndefined(data)) result += data.toString();
        });
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
            dog.error('转化错误', error);
            resolve(null);
          }
        });
      });

      req.on('error', error => {
        dog.error('请求错误', error);
        resolve(null);
      });

      req.on('timeout', () => {
        dog.error('请求超时');

        req.destroy();
        resolve(null);
      });

      req.end();
      dog('结束方法');
    })();
  });
}
