import { esc } from '@color-pen/static';
import { dev } from '@qqi/dev';
import { cyanPen, magentaPen } from 'color-pen';
import { readInput } from '../src/index';

dev.skip('测试用户输入', async it => {
  await it('简单测试', async it => {
    readInput((keyValue, key) => {
      console.log(
        it.description,
        magentaPen(keyValue),
        cyanPen(JSON.stringify(key, null, 2)),
      );
      if (
        key?.name === 'return' ||
        (key?.name === 'escape' && key.sequence === esc)
      ) {
        console.log('执行完毕');
        return true;
      }
      return false;
    });
  });
  await it('测试可跳过退出信号的', async it => {
    const result = await readInput((keyValue, key) => {
      console.log(
        it.description,
        magentaPen(keyValue),
        cyanPen(JSON.stringify(key, null, 2)),
      );
      // console.log(it.description, '<', keyValue, '> <', key, '>');
      if (key?.name === 'return') {
        console.log('执行完毕');
        return true;
      }
      return false;
    });
    console.log(result);
    // console.log(process._getActiveHandles());
    // console.log(process._getActiveRequests());
  });
});

dev.skip(`多次测试第  次`, async () => {
  for (let i = 0; i < 12; i++) {
    await readInput((a, b) => {
      console.log('====================================');
      console.log('第' + i + '次执行');
      console.log('====================================');
      if (b?.name === 'return') {
        return true;
      }
      return false;
    });
  }
});
