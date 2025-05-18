import { csi } from '@color-pen/static';

import { _p } from '../index';
import { runOtherCode } from '../index';
import { dev } from '@qqi/dev-log';

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
        suffix: 3,
        interval: 20,
      },
    });
    console.log(result);
  });
});
