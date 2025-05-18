import { isTTY } from '../isTTY';
import { pressCallFn } from './pressCallFn';

const { stdin } = process;
/**
 * 移除监听项
 */
export function stdRemoveListener() {
  stdin.removeListener('keypress', pressCallFn);
  process.removeListener('beforeExit', stdRemoveListener);
  if (isTTY) {
    stdin.setRawMode(false);
  }
  stdin.pause();
}
