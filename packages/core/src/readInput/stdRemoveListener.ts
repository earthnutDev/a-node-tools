import { isTTY } from '../isTTY';
import { endCn } from './end';
import { pressCallFn } from './pressCallFn';

const { stdin } = process;
/**
 * 移除监听项
 */
export function stdRemoveListener() {
  stdin.removeListener('keypress', pressCallFn);
  process.removeListener('beforeExit', stdRemoveListener);
  process.stdin.removeListener('end', endCn);
  if (isTTY) {
    stdin.setRawMode(false);
  }
  stdin.pause();
}
