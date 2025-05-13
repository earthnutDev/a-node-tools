import { dev } from '@qqi/dev-log';
import { readFileToJson } from '../index';

dev.skip('测试异步读取 JSON 文件', async () => {
  const a = await readFileToJson('package.json');

  console.log(a);
});
