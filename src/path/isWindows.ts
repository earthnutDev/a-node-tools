/**
 *
 * Determines whether it is a Windows environment
 *
 *  https://nodejs.org/docs/latest/api/path.html
 *
 */
export const isWindows: boolean =
  (process && process.platform == 'win32') || !1;
