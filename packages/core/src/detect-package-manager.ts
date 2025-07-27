import { isFalse } from 'a-type-of-js';
import { getDirectoryBy } from './path';

/**
 *  ## 检测当前的启动执行
 *
 * 能检测出的包管理器数据为：
 *
 * - npm 原始默认的包管理器
 * - yarn 嗯
 * - pnpm 啊
 *
 * 如果不使用参数值，默认检测当前执行命令的工作目录及祖级目录下是否存在包管理器；若没有，则以启动的方式为准。
 *
 *
 * @param [onlyEnv=false]  是否仅通过启动的命令判断当前的 npm 包管理器
 * @returns 返回当前的包管理器的类型，若没有检测出正确的包管理器，则返回 "npm"
 */
export function detectPackageManager(
  onlyEnv: boolean = false,
): 'npm' | 'pnpm' | 'yarn' {
  if (isFalse(onlyEnv)) {
    const _ = (test: string) => Boolean(getDirectoryBy(test, 'file'));

    /**  判断是否存在 pnpm 的锁文件  */
    if (_('pnpm-lock.yaml')) return 'pnpm';
    /**  判断是否有 yarn 的锁文件  */ else if (_('yarn.lock')) return 'yarn';
    /**  判断是否有 npm 的锁文件  */ else if (_('package-lock.json'))
      return 'npm';
  }

  const userAgent = process.env.npm_config_user_agent || '';
  if (userAgent.includes('pnpm')) return 'pnpm';
  if (userAgent.includes('yarn')) return 'yarn';
  if (userAgent.includes('npm')) return 'npm';

  // 2. 检测环境变量
  if (process.env.PNPM_HOME) return 'pnpm';
  if (process.env.YARN_IGNORE_PATH) return 'yarn';

  return 'npm';
}
