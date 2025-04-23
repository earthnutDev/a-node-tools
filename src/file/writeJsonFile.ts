import { writeFileSync } from 'node:fs';
import { _p } from '../print';

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
    if (process.env.A_NODE_TOOLS_DEV === 'true') {
      _p(error);
    }
    return false;
  }
}
