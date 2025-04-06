import { getNpmPkgInfo, testNpmPackageExist } from '../index';
import test from 'node:test';
import assert from 'node:assert';

test('测试 npm 包是否存在', async () => {
  const res = await testNpmPackageExist('@types/node');

  assert.equal(res, true);
});

test.skip('测试 npm 包正确的包', async () => {
  const pkgInfo = await getNpmPkgInfo('pjj');

  assert.equal(pkgInfo.name, 'pjj');
});

test('测试 npm 包否存在', async () => {
  const pkgInfo = await getNpmPkgInfo('aii');

  assert.equal(pkgInfo, null);
});
