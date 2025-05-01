import { dog } from './../dog';
import { writeFileSync } from 'node:fs';

/**
 *  将一个 JSON 数据写入空白文件
 *
 *
 */
export function writeJsonFile(pathName: string, data: object): boolean {
  try {
    writeFileSync(pathName, JSON.stringify(data, null, 2), {
      encoding: 'utf-8',
      flag: 'w',
    });
    return true;
  } catch (error) {
    dog.error(error);
    return false;
  }
}
