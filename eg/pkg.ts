import { _p, getNpmPkgInfo, testNpmPackageExist } from '../index';
import test from 'node:test';
import assert from 'node:assert';

test('测试本包（a-node-tools）是否存在', async () => {
  const startTime = Date.now();
  const res = await testNpmPackageExist('a-node-tools', '官方');

  _p(`测试本包（a-node-tools）是否存在${Date.now() - startTime}`);

  assert.equal(res, true);
});

test('测试本包（a-node-tools）是否存在（淘宝源）', async () => {
  const startTime = Date.now();
  const res = await testNpmPackageExist('a-node-tools');

  _p(`测试本包（a-node-tools）是否存在（淘宝源）${Date.now() - startTime}`);

  assert.equal(res, true);
});

test('测试本包（a-node-tools）是否存在（腾讯源）', async () => {
  const startTime = Date.now();
  const res = await testNpmPackageExist('a-node-tools', '腾讯');

  _p(`测试本包（a-node-tools）是否存在（腾讯源）${Date.now() - startTime}`);

  assert.equal(res, true);
});

test('测试本包（a-node-tools）是否存在（中科大源）', async () => {
  const startTime = Date.now();
  const res = await testNpmPackageExist('a-node-tools', '中科大');

  _p(`测试本包（a-node-tools）是否存在（中科大源）${Date.now() - startTime}`);

  assert.equal(res, true);
});
test('测试本包（a-node-tools）是否存在（yarn 源）', async () => {
  const startTime = Date.now();
  const res = await testNpmPackageExist('a-node-tools', 'yarn');

  _p(`测试本包（a-node-tools）是否存在（yarn 源）${Date.now() - startTime}`);

  assert.equal(res, true);
});

test('测试存在的 npm 的 jja 包', async () => {
  const startTime = Date.now();
  const pkgInfo = await getNpmPkgInfo('jja', '官方');

  _p(`测试存在的 npm 的 jja 包${Date.now() - startTime}`);
  assert.equal(pkgInfo.name, 'jja');
});
test('测试存在的 npm 的 jja 包（淘宝源）', async () => {
  const startTime = Date.now();
  const pkgInfo = await getNpmPkgInfo('jja');

  _p(`测试存在的 npm 的 jja 包（淘宝源）${Date.now() - startTime}`);
  assert.equal(pkgInfo.name, 'jja');
});
test('测试存在的 npm 的 jja 包（腾讯源）', async () => {
  const startTime = Date.now();
  const pkgInfo = await getNpmPkgInfo('jja', '腾讯');

  _p(`测试存在的 npm 的 jja 包（腾讯源）${Date.now() - startTime}`);
  assert.equal(pkgInfo.name, 'jja');
});
test('测试存在的 npm 的 jja 包（中科大源）', async () => {
  const startTime = Date.now();
  const pkgInfo = await getNpmPkgInfo('jja', '中科大');

  _p(`测试存在的 npm 的 jja 包（中科大源）${Date.now() - startTime}`);
  assert.equal(pkgInfo.name, 'jja');
});
test('测试存在的 npm 的 jja 包（yarn 源）', async () => {
  const startTime = Date.now();
  const pkgInfo = await getNpmPkgInfo('jja', 'yarn');

  _p(`测试存在的 npm 的 jja 包（yarn 源）${Date.now() - startTime}`);
  assert.equal(pkgInfo.name, 'jja');
});

test('测试不存在的 npm 包 aii', async () => {
  const startTime = Date.now();
  const pkgInfo = await getNpmPkgInfo('aii', '官方');

  _p(`测试不存在的 npm 包 aii${Date.now() - startTime}`);
  assert.equal(pkgInfo, null);
});

test('测试不存在的 npm 包 aii（淘宝源）', async () => {
  const startTime = Date.now();
  const pkgInfo = await getNpmPkgInfo('aii');

  _p(`测试不存在的 npm 包 aii（淘宝源）${Date.now() - startTime}`);
  assert.equal(pkgInfo, null);
});
test('测试不存在的 npm 包 aii（腾讯源）', async () => {
  const startTime = Date.now();
  const pkgInfo = await getNpmPkgInfo('aii', '腾讯');

  _p(`测试不存在的 npm 包 aii（腾讯源）${Date.now() - startTime}`);
  assert.equal(pkgInfo, null);
});
test('测试不存在的 npm 包 aii（中科大源）', async () => {
  const startTime = Date.now();
  const pkgInfo = await getNpmPkgInfo('aii', '中科大');

  _p(`测试不存在的 npm 包 aii（中科大源）${Date.now() - startTime}`);
  assert.equal(pkgInfo, null);
});
test('测试不存在的 npm 包 aii（yarn 源）', async () => {
  const startTime = Date.now();
  const pkgInfo = await getNpmPkgInfo('aii', 'yarn');

  _p(`测试不存在的 npm 包 aii（yarn 源）${Date.now() - startTime}`);
  assert.equal(pkgInfo, null);
});
