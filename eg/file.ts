import { readFileToJson } from 'src/file';
import test from 'node:test';

test('测试异步读取 JSON 文件', async () => {
  const a = await readFileToJson('package.json');

  console.log(a);
});
