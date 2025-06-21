import { dev } from '@qqi/dev';
import { getDirectoryBy } from '../src/path';
import { _p } from '../src/print';
import { redPen } from 'color-pen';

await dev.skip('测试文件路径', it => {
  it('测试错误的标记查找文件应返回 undefined', () => {
    const result = getDirectoryBy('package.json', 'directory');
    _p('查找结果', false);
    _p(redPen(`${result}`));
  });
  it('测试查找执行目录的 package.json 文件', () => {
    const result = getDirectoryBy('package.json');
    _p('查找结果', false);
    _p(redPen(`${result}`));
  });
  it('测试查找  dist 目录的 package.json 文件', () => {
    const result = getDirectoryBy('package.json', 'file', 'dist');
    _p('查找结果', false);
    _p(redPen(`${result}`));
  });
});
