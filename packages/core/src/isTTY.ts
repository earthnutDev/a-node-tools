import { isNode } from 'a-js-tools';
import { dog } from './dog';
import { execSync } from 'node:child_process';

/**
 *
 *  当前是否是终端
 *
 */
export const isTTY = () =>
  (isNode() && process && process.stdout && process.stdout.isTTY) || !1;

/**
 * tty 类型
 *
 * @returns  返回当前终端的类型
 *
 * - null 非终端环境
 * - unknown 未知类型
 * - cmd
 * - powershell
 * - bash
 * - zsh
 * - fish
 * - sh
 *
 *
 */
export function detectShell():
  | 'cmd'
  | 'powershell'
  | 'bash'
  | 'zsh'
  | 'fish'
  | 'sh'
  | null
  | 'unknown' {
  // 非终端环境
  if (!isTTY()) return null;

  /** 根据启动执行的地址判定是否为 cmd  */
  const isCmd = process.env.ComSpec === `C:\\Windows\\System32\\cmd.exe`;
  /**  根据特定的环境变量判定是否为 powerShell  */
  const isPowerShell = !!process.env.PSModulePath;

  if (isCmd) return 'cmd';
  if (isPowerShell) return 'powershell';
  try {
    execSync('powershell -NoProfile -Command "$PSVersionTable"', {
      stdio: 'ignore',
    });
    return 'powershell';
  } catch (err) {
    dog('判定是否为 powershell 出错', err);
  }
  try {
    execSync('ver', { stdio: 'ignore' });
    return 'cmd';
  } catch (error) {
    dog('判定是否为 cmd 时出错', error);
  }

  const shellPath = process.env.SHELL ?? process.env.shell;
  if (shellPath && (shellPath.includes('bash') || shellPath.includes('zsh')))
    return shellPath.includes('bash') ? 'bash' : 'zsh';
  try {
    execSync('bash --version', { stdio: 'ignore' });
    return 'bash';
  } catch (error) {
    dog('判定是否为 bash 、zsh 时出错', error);
  }

  try {
    execSync('zsh --version', { stdio: 'ignore' });
    return 'zsh';
  } catch (error) {
    dog('判定为 zsh 时出错', error);
  }

  try {
    execSync('fish -v', { stdio: 'ignore' });
    return 'fish';
  } catch (error) {
    dog('判定为 fish 时错误', error);
  }

  try {
    execSync('sh --version', { stdio: 'ignore' });
    return 'sh';
  } catch (error) {
    dog('判定为 sh 时出错', error);
  }

  return 'unknown';
}
