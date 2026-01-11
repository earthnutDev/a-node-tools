import { dev } from '@qqi/dev';
import {
  getPackageJson,
  getPackageJsonSync,
  readFileToJson,
} from '../src/index';

dev('测试文件相关的方法', async test => {
  test.skip('测试异步读取 JSON 文件', async () => {
    const a = await readFileToJson('package.json');
    console.log(a);
  });

  test.skip('测试同步获取 package 文件', () => {
    const jsonContent = getPackageJsonSync(5);

    console.log(jsonContent);
  });
  test('测试异步获取 package 文件', async () => {
    const jsonContent = await getPackageJson(4);

    console.log(jsonContent);
  });
});
