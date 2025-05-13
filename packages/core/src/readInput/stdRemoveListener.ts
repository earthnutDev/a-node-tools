import { dataStore } from './dataStore';
import { pressCallFn } from './pressCallFn';

const { stdin } = process;
/**
 * 移除监听项
 */
export function stdRemoveListener() {
  const currentItem = dataStore[dataStore.list[0]];
  if (currentItem && currentItem.rl && currentItem.rl.close) {
    const { rl } = currentItem;
    rl.close(); // 关闭监听
  }
  stdin.removeListener('keypress', pressCallFn);
  process.removeListener('beforeExit', stdRemoveListener);
}
