/**
 *
 * 是否是 [windows](https://nodejs.org/docs/latest/api/path.html) 系统
 *
 *
 *
 */
export const isWindows: boolean =
  (globalThis.process && globalThis.process.platform == 'win32') || !1;
