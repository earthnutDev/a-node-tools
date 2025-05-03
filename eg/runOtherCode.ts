import { csi } from 'color-pen';

import { _p } from '../index';
import { runOtherCode } from '../index';
import { dev } from '@qqi/dev-log';

dev.skip('测试与 run other code 相关的逻辑', async it => {
  await it('简单执行 ls ', async () => {
    const result = await runOtherCode('ls');
    _p(result);
  });

  await it('测试输出光标位置', async () => {
    await runOtherCode(`echo "${csi}6n"`);
  });
});
