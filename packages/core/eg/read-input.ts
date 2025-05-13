import { dev } from '@qqi/dev-log';
import { readInput } from '../index';

await dev('测试用户输入', async it => {
  await it('简单测试', async () => {
    readInput((keyValue, key) => {
      console.log(keyValue, key);
      if (key.name === 'return') {
        console.log('执行完毕');
        return true;
      }
      return false;
    });
    const result = await readInput((keyValue, key) => {
      console.log(keyValue, key);
      if (key.name === 'return') {
        console.log('执行完毕');
        return true;
      }
      return false;
    });
    console.log(result);
  });
});
