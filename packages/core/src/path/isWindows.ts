import { isBrowser, isNode } from 'a-js-tools';

/**
 *
 * 是否是 [windows](https://nodejs.org/docs/latest/api/path.html) 系统
 *
 *
 *
 */
export const isWindows: boolean =
  (isNode() && process.platform === 'win32') ||
  (isBrowser() && window.navigator.userAgent.includes('Windows'));
