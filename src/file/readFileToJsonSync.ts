import { dog } from './../dog';
import { readFileSync, statSync } from 'node:fs';

/**
 *  同步 读取 json 文件并返回为 JSON
 *
 * @param fileDir   文件地址
 * @returns 返回的是一个 `JSON` 格式的数据
 */
export function readFileToJsonSync<T extends object = object>(
  fileDir: string,
): T | null {
  /**  文件不存在或是  */
  if (
    !/.json^/.test(fileDir) &&
    !statSync(fileDir, { throwIfNoEntry: false })
  ) {
    return null;
  }

  try {
    const fileContent = readFileSync(fileDir, { encoding: 'utf-8' });

    return JSON.parse(fileContent || 'null');
  } catch (error) {
    dog.error(error);
    return null;
  }
}
