/** 当前是否为终端环境   */
/**
 *
 * Whether it is a terminal environment
 *
 * @requires if you are running in a terminal environment, return true, otherwise return false
 *
 */
export const isTTY = () =>
  (process && process.stdout && process.stdout.isTTY) || !1;
