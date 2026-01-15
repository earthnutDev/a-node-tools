import { readFileSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dog } from '../utils/dog';

/**
 *  读取 json 文件返回为 JSON 格式
 * @param fileDir  {@link String}  文件目录
 * @returns 返回是一个 {@link  Promise}
 */
export function readFileToJson<T extends object = object>(
  fileDir: string,
): Promise<T | null> {
  return new Promise((resolve, reject) => {
    if (
      !/.json^/.test(fileDir) &&
      !statSync(fileDir, { throwIfNoEntry: false })
    ) {
      reject(null);
    }
    readFile(fileDir, { encoding: 'utf-8' })
      .then(res => {
        try {
          resolve(JSON.parse(res));
        } catch (error) {
          dog.error(error);
          reject(null);
        }
      })
      .catch(() => reject(null));
  });
}

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
