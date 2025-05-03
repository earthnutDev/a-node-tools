import { dev } from '@qqi/dev-log';
import { typewrite } from 'src/typewrite';

dev('测试 typewrite', async it => {
  await it('测试 1', async () => {
    await typewrite('你好');
  });

  await it('测试 慢输出', async () => {
    await typewrite('你好，我是 earthnut.dev', 300);
  });

  await it('测试带表情的输出', async () => {
    await typewrite('你好 🌍，我☹️是⬆️eart🕛hn🫂ut😍1✅.dev', 100);
  });
});
