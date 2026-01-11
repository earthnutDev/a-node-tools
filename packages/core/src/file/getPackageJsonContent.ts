/**
 * @packageDocumentation
 * @module  file
 * @file getfile_content.ts
 * @description 获取 packages.json 文件
 * @author MrMudBean <Mr.MudBean@outlook.com>
 * @license MIT
 * @copyright  2026 ©️ MrMudBean
 * @since 2026-01-11 11:11
 * @lastModified 2026-01-11
 */

import { isNumber, isString, isUndefined } from 'a-type-of-js';
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
};

/** 使用参数 */
type GetPackageJsonOption =
  | undefined
  | string
  | number
  | {
      /** 使用层级，默认为 1 ，超过 20 直接返回 null */
      depth?: number;
      /**
       * ## 在使用的时候，传入查询文件路径的指定基
       * 因为在开发 vscode extension 时，需要传入查询的相对基，否则使用默认 `path.resolve()` 获取的相对基的地址为 '/' 而无法获取到真正的的文件路径地址。当然，在大多数时候，大概是以执行的路径 `process.cwd()` 值为准
       */
      path?: string;
    };

export type { DefaultT, PackageJson, PackageJsonReturn, GetPackageJsonOption };

/**
 * ## 根据深度查找 `package.json` 文件内容
 * 根据编码习惯，`depth` 值大概率不会超过 3 ， 但是为了特殊情况，将其定为**最高 20**，超过 20 时直接返回 `null`
 * @param depth 有三种使用方式：
 *              - 为类型数值时，表示向上第几层 `package.json` （非文件层级），默认值为 1
 *              - 为类型字符串时为指定基查询路径，默认查找层级为 1
 *              - 为对象时，可指定 `depth` 或
 * @returns 返回的 `package.json` 文件内容。未找到时返回 `null`
 */
export function getPackageJsonSync<T extends DefaultT>(
  depth: GetPackageJsonOption = 1,
): PackageJsonReturn<T> | null {
  const _ = parseParams(depth);

  const _depth = _.depth; // 取整
  let currentDepth = 1;
  if (currentDepth > _depth || _depth > 20) {
    dog('不满足条件退出了查找', currentDepth, _depth);
    return null;
  }
  let filePath = ''; // 文件路径
  const fileName = 'package.json';
  let file_content: undefined | PackageJson<T>;
  let parent_path: string | undefined = _.path;
  do {
    dog('当前执行的路径', parent_path);
    parent_path = getDirectoryBy(fileName, 'file', parent_path);
    if (isUndefined(parent_path)) {
      dog('未获取 package.json 的路径');
      break;
    }
    filePath = pathJoin(parent_path, fileName);
    if (currentDepth === _depth) {
      try {
        file_content = readFileToJsonSync(filePath);
      } catch (error) {
        dog.error('获取 package.json 文件报错', error);
        return null;
      }
      dog('已获取到文件内容');
      break;
    }
    currentDepth++;
    parent_path = pathJoin(parent_path, '..');
  } while (currentDepth <= _depth);

  dog('经过了 while 循环', currentDepth, _depth, file_content);

  return file_content === undefined
    ? null
    : {
        content: file_content,
        depth: _depth,
        path: filePath,
      };
}

/**
 * ## 异步获取 package.json 文件
 * 根据编码习惯，`depth` 值大概率不会超过 3 ， 但是为了特殊情况，将其定为**最高 20**，超过 20 直接返回 `null`
 * @param depth 获取的层级（非文件层级），默认值为 1
 * @returns 异步获取到 `package.json` 文件内容，未找到时返回 `null`
 */
export async function getPackageJson<T extends DefaultT>(
  depth: GetPackageJsonOption = 1,
): Promise<PackageJsonReturn<T> | null> {
  const _ = parseParams(depth);
  const _depth = _.depth; // 取整
  let currentDepth = 1;
  if (currentDepth > _depth || _depth > 20) {
    dog('不满足条件退出了查找', currentDepth, _depth);
    return null;
  }
  let filePath = ''; // 文件路径
  const fileName = 'package.json';
  let file_content: undefined | PackageJson<T>; // 文件内容
  let parent_path: string | undefined = _.path; // 父目录
  do {
    dog('当前执行的路径', parent_path);
    parent_path = getDirectoryBy(fileName, 'file', parent_path);
    if (isUndefined(parent_path)) {
      dog('未获取 package.json 的路径');
      break;
    }
    filePath = pathJoin(parent_path, fileName);
    if (currentDepth === _depth) {
      try {
        file_content = await readFileToJson(filePath);
      } catch (error) {
        dog.error('获取 package.json 文件报错', error);
        return null;
      }
      dog('已获取到文件内容');
      break;
    }
    currentDepth++;
    parent_path = pathJoin(parent_path, '..');
  } while (currentDepth <= _depth);

  dog('经过了 while 循环', currentDepth, _depth, file_content);

  return file_content === undefined
    ? null
    : {
        content: file_content,
        depth: _depth,
        path: filePath,
      };
}

/**
 *
 * @param params 将要解析的参数
 * @returns 解析后的参数
 */
function parseParams(params: GetPackageJsonOption): {
  path: string | undefined;
  depth: number;
} {
  const _depth = 1;
  const _path = undefined;
  if (isUndefined(params)) {
    return {
      depth: _depth,
      path: _path,
    };
  }
  // 解析数值
  const parseNumber = (num: number | undefined) => {
    if (isNumber(num)) {
      num = Math.floor(num);
      return num < 1 || num > 20 ? 1 : num;
    } else {
      return 1;
    }
  };
  if (isNumber(params)) {
    return {
      depth: parseNumber(params),
      path: undefined,
    };
  }
  if (isString(params)) {
    return {
      depth: 1,
      path: params,
    };
  }
  return {
    depth: parseNumber(params.depth) || 1,
    path: params.path || undefined,
  };
}
