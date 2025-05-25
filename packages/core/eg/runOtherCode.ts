import { csi } from '@color-pen/static';

import { _p } from '../index';
import { runOtherCode } from '../index';
import { dev } from '@qqi/dev-log';
import { waitingTips } from '../src/waiting';
import { sleep } from 'a-js-tools';

await dev('测试与 run other code 相关的逻辑', async it => {
  await it.skip('简单执行 ls ', async () => {
    const result = await runOtherCode('ls');
    _p(result);
  });

  await it.skip('测试输出光标位置', async () => {
    await runOtherCode(`echo "${csi}6n"`);
  });

  await it.skip('测试等待', async () => {
    const result = await runOtherCode({
      code: `sleep 3 && echo "h" && sleep 1 && echo "hello" && sleep 2 && echo "11"`,
      printLog: true,
      waiting: {
        prefix: 2,
        // interval: 100,
        info: '65465464646489798798797897979879879879789789798798798798798797979src/readInput/dataStore.ts -> src/readInput/stdRemoveListener.ts -> src/readInput/pressCallFn.ts -> src/readInput/dataStore.ts98',
      },
    });
    console.log(result);
  });

  await it('测试单独的 awaiting', async () => {
    const result = waitingTips({
      // interval: 100,
      prefix: 1,
    });
    result.log('开始执行:', new Date().toLocaleString());
    await sleep(1000);
    result.log('在 1 秒后打印:（带换行符版）\n', new Date().toLocaleString());
    result.log('在 1 秒后打印:', new Date().toLocaleString());
    result.log('在 1 秒后打印:（带换行符版）\n', new Date().toLocaleString());
    result.log('在 1 秒后打印:', new Date().toLocaleString());
    result.log('在 1 秒后打印:', new Date().toLocaleString());
    await sleep(2000);
    result.log('应再等待 2 秒:', new Date().toLocaleString());
    result.destroyed(); // 等等等
    await sleep(2000);
    result.log('方法已注销:', new Date().toLocaleString());
    await sleep(2000);
    result.log('销毁后等待 2 秒:', new Date().toLocaleString());
    result.run();
    result.log('重新激活 2 秒:', new Date().toLocaleString());
    await sleep(2000);
    result.destroyed();
  });
});
