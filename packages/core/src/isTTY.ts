import { isNode } from 'a-js-tools';

/**
 *
 *  当前是否是终端
 *
 */
export const isTTY = () =>
  (isNode() && process && process.stdout && process.stdout.isTTY) || !1;
