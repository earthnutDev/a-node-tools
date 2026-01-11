/**
 * @packageDocumentation
 * @module  file
 * @file getPackageJsonContent.ts
 * @description 获取 packages.json 文件
 * @author MrMudBean <Mr.MudBean@outlook.com>
 * @license MIT
 * @copyright  2026 ©️ MrMudBean
 * @since 2026-01-11 11:11
 * @lastModified 2026-01-11 11:56
 */

import { isUndefined } from 'a-type-of-js';
import type { PackageJson } from '../npmPkg';
import type { DefaultT } from '../npmPkg/types';
import { getDirectoryBy, pathJoin } from '../path';
import { dog } from '../utils/dog';
import { readFileToJson } from './readFileToJson';
import { readFileToJsonSync } from './readFileToJsonSync';

type PackageJsonReturn<T extends DefaultT> = {
  /** package.json 文件内容 */
  content: PackageJson<T>;
  /** 层级 */
  depth: number;
  /** 文件路径 */
  path: string;
} | null;

export type { DefaultT, PackageJson, PackageJsonReturn };

/**
 * ## 根据深度查找 `package.json` 文件内容
 * 根据编码习惯，`depth` 值大概率不会超过 3 ， 但是为了特殊情况，将其定为**最高 20**
 * @param depth 向上第几层 `package.json` （非文件层级）
 * @returns 返回的 `package.json` 文件内容。未找到时返回 `null`
 */
export function getPackageJsonSync<T extends DefaultT>(
  depth: number = 1,
): PackageJsonReturn<T> {
  const _depth = Math.floor(depth) || 1; // 取整
  let currentDepth = 1;
  if (currentDepth > _depth || _depth > 20) return null;
  let filePath = ''; // 文件路径
  const fileName = 'package.json';
  let packageJsonContent: undefined | PackageJson<T>;
  do {
    const packageJsonParentPath = getDirectoryBy(fileName, 'file');
    if (isUndefined(packageJsonContent)) {
      break;
    }
    filePath = pathJoin(packageJsonParentPath, fileName);
    if (currentDepth === _depth) {
      try {
        packageJsonContent = readFileToJsonSync(filePath);
      } catch (error) {
        dog.error('获取 package.json 文件报错', error);
        return null;
      }
      break;
    }
    currentDepth++;
  } while (currentDepth > _depth);

  return packageJsonContent === undefined
    ? null
    : {
        content: packageJsonContent,
        depth: _depth,
        path: filePath,
      };
}

/**
 * ## 异步获取 package.json 文件
 * 根据编码习惯，`depth` 值大概率不会超过 3 ， 但是为了特殊情况，将其定为**最高 20**
 * @param depth 获取的层级（非文件层级）
 * @returns 异步获取到 `package.json` 文件内容，未找到时返回 `null`
 */
export async function getPackageJson<T extends DefaultT>(
  depth: number = 1,
): Promise<PackageJsonReturn<T>> {
  const _depth = Math.floor(depth) || 1; // 取整
  let currentDepth = 1;
  if (currentDepth > _depth || _depth > 20) return null;
  let filePath = ''; // 文件路径
  const fileName = 'package.json';
  let packageJsonContent: undefined | PackageJson<T>;
  do {
    const packageJsonParentPath = getDirectoryBy(fileName, 'file');
    if (isUndefined(packageJsonContent)) {
      break;
    }
    filePath = pathJoin(packageJsonParentPath, fileName);
    if (currentDepth === _depth) {
      try {
        packageJsonContent = await readFileToJson(filePath);
      } catch (error) {
        dog.error('获取 package.json 文件报错', error);
        return null;
      }
      break;
    }
    currentDepth++;
  } while (currentDepth > _depth);

  return packageJsonContent === undefined
    ? null
    : {
        content: packageJsonContent,
        depth: _depth,
        path: filePath,
      };
}
