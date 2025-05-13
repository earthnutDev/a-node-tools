import { dog } from './../dog';
import { statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

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
