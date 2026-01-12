import { isFalse } from 'a-type-of-js';
import { getDirectoryBy, pathJoin } from './path';
import { fileExist, getPackageJsonSync } from './file/index';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';

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

/**
 * # 是否是工作区
 * @param packageManager 包方式
 * @returns 当前是在工作区下（非子包中），则返回 `true` ，否则则返回 `false`
 */
export function isWorkSpace(packageManager: 'npm' | 'pnpm' | 'yarn') {
  const packageJsonResponse = getPackageJsonSync<{
    private: boolean;
    workspaces: string[];
  }>(); // 当前使用的配置文件
  if (packageJsonResponse === null) {
    return false;
  }

  const { content, path } = packageJsonResponse;
  const parentPath = dirname(path);

  if (packageManager === 'pnpm') {
    const workSpaceFilePath = pathJoin(parentPath, 'pnpm-workspace.yaml');
    const workSpaceFileExist = fileExist(workSpaceFilePath);
    if (!workSpaceFileExist) {
      return false; // 当前非工作区
    }
    const workSpaceContent = readFileSync(workSpaceFilePath, {
      encoding: 'utf-8',
    }); // 工作区配置文件
    // 当前有 workspace 的嫌疑
    if (workSpaceContent.split('\n').some(e => e.startsWith('packages:'))) {
      return true;
    }
  }

  // 在以 yarn/npm 为包管理器的环境中，即便是配置文件中的 workspaces 为空数组，也识别为工作区
  if (content.workspaces) {
    if (packageManager === 'yarn') {
      const workSpaceFilePath = pathJoin(parentPath, '.yarnrc.yml');
      const workSpaceFileExist = fileExist(workSpaceFilePath);
      if (workSpaceFileExist) {
        return true;
      }
    }
    if (packageManager === 'npm') {
      return true;
    }
  }

  return false;
}
