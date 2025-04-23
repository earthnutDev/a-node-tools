import { csi } from 'color-pen';
import test from 'node:test';
import { _p } from 'src/print';
import { runOtherCode } from 'src/run-other-code';

test('测试与 run other code 相关的逻辑', async it => {
  await it.test('简单执行 ls ', async () => {
    const result = await runOtherCode('ls');
    _p(result);
  });

  await it.test('测试输出光标位置', async () => {
    await runOtherCode(`echo "${csi}6n"`);
  });
});
