import { dev } from '@qqi/dev';
import { colorLine } from '../src/print';

await dev('测试彩色线条', () => {
  colorLine('hello');
  colorLine('红色文本', '#f36');
  colorLine('彩色文本', true);
});
