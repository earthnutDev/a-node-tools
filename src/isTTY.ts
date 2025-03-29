/**
 *
 *  当前是否是终端
 *
 */
export const isTTY = () =>
  (process && process.stdout && process.stdout.isTTY) || !1;
