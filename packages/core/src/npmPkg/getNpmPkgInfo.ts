import { isUndefined } from 'a-type-of-js';
import { dog } from './../dog';
import { parseName } from './parseName';
import {
  DefaultT,
  getPkgInfoResult,
  npmPkgInfoType,
  npmRegistry,
} from './types';
import https from 'node:https';

/**
 *
 * ## 获取给定 npm 包的内容的信息
 *
 * @param pkgName 包的名字
 * @param [registry='官方'] npm 源，默认是官方源。可选值： 淘宝、官方、腾讯、中科大、yarn、华为
 * @param [timeout=5000]  超时设置
 * @returns 返回是一个对象
 *
 * @example
 *
 * ```ts
 * import { getNpmPkgInfo , _p } from 'a-node-tools';
 *
 * const result: getPkgInfoResult = await getNpmPkgInfo('a-node-tools');
 *
 * if (isNull(result.data)) {
 *    _p(`获取包数据失败的原因`， );
 *    throw new Error('获取包信息失败');
 * }
 *
 * _p(result.data.name); // 'a-node-tools';
 *
 * ```
 */
export async function getNpmPkgInfo<T extends DefaultT = DefaultT>(
  pkgName: string,
  registry: npmRegistry = '官方',
  timeout = 5000,
): Promise<getPkgInfoResult<T>> {
  const registryList: Record<npmRegistry, string> = {
    淘宝: 'registry.npmmirror.com',
    官方: 'registry.npmjs.org',
    腾讯: 'mirrors.tencent.com',
    中科大: 'npmreg.proxy.ustclug.org',
    yarn: 'registry.yarnpkg.com',
  };
  const hostname: string = registryList[registry] || registryList['官方'];

  dog('get npm pkg info 开始执行');

  return new Promise(resolve => {
    (() => {
      let resultStr: string = '';
      const parsedName = parseName(pkgName) || 'a-node-tools';
      dog('解析后的 pkg 名称', parsedName);
      /**  请求的网址  */
      const path = (registry === '腾讯' ? '/npm' : '').concat(`/${parsedName}`);

      const options = {
        hostname,
        path,
        port: 443,
        method: 'GET',
        timeout,
        headers: {
          'sec-fetch-dest': 'empty',
          'X-Spiferacl': '1',
        },
      };
      dog('请求参数', options);
      const req = https.get(options, response => {
        response.on('data', data => {
          if (!isUndefined(data)) resultStr += data.toString();
        });
        /// 请求结束后
        response.on('end', () => {
          if (response.statusCode == 200) {
            try {
              const pkgInfo: npmPkgInfoType<T> = JSON.parse(resultStr);
              pkgInfo.version = pkgInfo['dist-tags'].latest;
              resolve({
                data: pkgInfo,
                success: true,
                status: 'success',
                error: null,
              });
            } catch (error) {
              dog.error('转化错误', error);
              resolve({
                data: null,
                success: true,
                status: 'parseJsonError',
                error: error,
                message: resultStr,
              });
            }
          }
          // 404 返回值为 { error: 'Not found' }
          else if (response.statusCode == 404) {
            resolve({
              data: null,
              success: true,
              status: 'notFound',
              error: null,
              message: 'npm 中没有该包',
            });
          } else {
            resolve({
              data: null,
              success: true,
              status: 'otherCode',
              error: null,
              message: `请求的返回请求码： ${response.statusCode}`,
            });
          }
        });
      });

      req.on('error', error => {
        dog.error('请求错误', error);
        resolve({
          data: null,
          success: false,
          status: 'error',
          error,
        });
      });

      req.on('timeout', () => {
        dog.error('请求超时');
        req.destroy();
        resolve({
          data: null,
          success: false,
          status: 'timeout',
          error: null,
        });
      });

      req.end();
      dog('结束方法');
    })();
  });
}
