import { isString } from 'a-type-of-js';
import { RunOtherCodeOption, RunOtherCodeOptions } from './types';
import { pathJoin } from 'src/path';

/**
 *
 * 解析参数
 *
 */
export function parse(options: RunOtherCodeOption): RunOtherCodeOptions & {
  /**  命令组  */
  cmd: string[];
} {
  /// 倘若传入的实参是一个字符串，则默认仅传入
  if (isString(options)) {
    options = { code: options };
  }

  const cwd = pathJoin(process.cwd(), options.cwd || '');

  const cmd = options.code
    .replace(/\s{2,}/g, ' ')
    .trim()
    .split(' ');

  /// 混合值，将实参进行整理
  return {
    shell: true,
    hideWaiting: false,
    waitingMessage: '',
    printLog: true,
    ...options,
    cmd,
    cwd,
  };
}
