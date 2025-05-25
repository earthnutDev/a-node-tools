import { cursorShow } from '../cursor';

/**
 * 接收到 SIGINT 信号
 */
export function sigintCall() {
  cursorShow();
}
