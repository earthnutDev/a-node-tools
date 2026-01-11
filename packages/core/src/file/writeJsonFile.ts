import { writeFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { dog } from '../utils/dog';

/**
 *  将一个 JSON 数据写入空白文件
 */
export function writeJsonFileSync(pathName: string, data: object): boolean {
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

/**
 * ## 同步写入 JSON 内容到文件
 * 由于历史原因，该文件才是同步的
 *
 * @deprecated 请使用 `writeJsonFileSync` 代替该方法，该方法可能将在未来版本移除
 */
export const writeJsonFile = writeJsonFileSync;
/**
 * ## 将一个 JSON 数据写入空白文件
 * 由于历史原因， `writeJsonFile` 是同步的，而 `writeJsonFileAsync` 是异步的
 */
export async function writeJsonFileAsync(
  pathName: string,
  data: object,
): Promise<boolean> {
  try {
    await writeFile(pathName, JSON.stringify(data, null, 2), {
      encoding: 'utf-8',
      flag: 'w',
    });
    return true;
  } catch (error) {
    dog.error(error);
    return false;
  }
}
