import { isNull } from 'a-type-of-js';
import { dog } from './../dog';
/**
 *
 *  子进程允许退出时触发
 *
 *
 * 因为此时标注输出流（stdio 流）还尚未关闭，所以不能作为子进程的最终结果
 */
export function exitCn(code: number | null, signal: NodeJS.Signals | null) {
  dog('子进程已退出了，退出码为 <', code, '>');

  if (!isNull(signal)) {
    dog.error('子进程被其他信号中断执行，执行的退出信号为：', signal);
  }
}
