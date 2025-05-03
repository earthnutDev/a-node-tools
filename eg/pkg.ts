import { _p, getNpmPkgInfo, testNpmPackageExist } from '../index';
import assert from 'node:assert';
import { npmRegistry } from '../src/npmPkg/types';
import { isUndefined } from 'a-type-of-js';
import { dev } from '@qqi/dev-log';
const list: npmRegistry[] = ['官方', '淘宝', '腾讯', '中科大', 'yarn'];

list.forEach(async e => {
  dev.skip('测试 npm 包信息获取', async t => {
    _p('');
    await t('测试本包（a-node-tools）是否存在', async () => {
      const startTime = Date.now();
      const res = await testNpmPackageExist('a-node-tools', e);

      _p(`测试本包（a-node-tools）是否存在 (${e}) ${Date.now() - startTime}`);

      assert.equal(res, true);
    });
    await t('测试存在的 npm 的 jja 包', async () => {
      const startTime = Date.now();
      const result = await getNpmPkgInfo('jja', e);

      _p(`测试存在的 npm 的 jja 包 (${e})  ${Date.now() - startTime}`);

      if (isUndefined(result.data)) {
        return;
      }

      assert.equal(result.data.name, 'jja');
    });

    await t('测试不存在的 npm 包 aii', async () => {
      const startTime = Date.now();
      const pkgInfo = await getNpmPkgInfo('aii', e);

      _p(`测试不存在的 npm 包 aii (${e})  ${Date.now() - startTime}`);
      assert.equal(pkgInfo, null);
    });
  });
});
