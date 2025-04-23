import { _p, getNpmPkgInfo, testNpmPackageExist } from '../index';
import test from 'node:test';
import assert from 'node:assert';
import { npmRegistry } from 'src/npmPkg/types';
const list: npmRegistry[] = ['官方', '淘宝', '腾讯', '中科大', 'yarn'];

list.forEach(async e => {
  test.skip('测试 npm 包信息获取', async t => {
    _p('');
    await t.test('测试本包（a-node-tools）是否存在', async () => {
      const startTime = Date.now();
      const res = await testNpmPackageExist('a-node-tools', e);

      _p(`测试本包（a-node-tools）是否存在 (${e}) ${Date.now() - startTime}`);

      assert.equal(res, true);
    });
    await t.test('测试存在的 npm 的 jja 包', async () => {
      const startTime = Date.now();
      const pkgInfo = await getNpmPkgInfo('jja', e);

      _p(`测试存在的 npm 的 jja 包 (${e})  ${Date.now() - startTime}`);
      assert.equal(pkgInfo.name, 'jja');
    });

    await t.test('测试不存在的 npm 包 aii', async () => {
      const startTime = Date.now();
      const pkgInfo = await getNpmPkgInfo('aii', e);

      _p(`测试不存在的 npm 包 aii (${e})  ${Date.now() - startTime}`);
      assert.equal(pkgInfo, null);
    });
  });
});
