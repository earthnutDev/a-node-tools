import { dev } from '@qqi/dev';
import { redPen } from 'color-pen';
import { getDirectoryBy, pathJoin } from '../src/path';
import { _p } from '../src/print';

await dev('测试文件路径', it => {
  it.skip('测试错误的标记查找文件应返回 undefined', () => {
    const result = getDirectoryBy('package.json', 'directory');
    _p('查找结果', false);
    _p(redPen(`${result}`));
  });

  it.skip('测试查找执行目录的 package.json 文件', () => {
    const result = getDirectoryBy('package.json');
    _p('查找结果', false);
    _p(redPen(`${result}`));
  });

  it.skip('测试查找  dist 目录的 package.json 文件', () => {
    const result = getDirectoryBy('package.json', 'file', 'dist');
    _p('查找结果', false);
    _p(redPen(`${result}`));
  });
  it('测试 pathJoin 没有', t => {
    t('测试没有参数时返回值', () => {
      _p(`pathJoin() = ${pathJoin()}`);
    });
  });
});
