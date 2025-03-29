/**
 *
 * 是否是 [windows](https://nodejs.org/docs/latest/api/path.html) 系统
 *
 *
 *
 */
export const isWindows: boolean =
  (process && process.platform == 'win32') || !1;
