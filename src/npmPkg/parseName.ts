import { isString } from 'a-type-of-js';

/**
 *
 * 解析名称
 *
 */
export function parseName(pkgName: string): string | null {
  // 非法的参数进行过滤
  if (!pkgName || !isString(pkgName)) {
    return null;
  }
  if (pkgName.includes('@')) {
    const pkgNameArray = pkgName
      .replace(/\/+/g, '/') // 去除重复多余的 '/'
      .replace(/@+/g, '@') // 去除重复多余的 '@'
      .replace(/\/$/, '') //  去除尾随的 '/'
      .split('@')
      .map(item => item.trim().replace(/^\/*/, ''));

    const arrLength = pkgNameArray.length;

    // 当前包名格式为 @xxx 形式
    if (pkgNameArray[0] === '') {
      // 当前包名格式为 @xxx/xxx@xxx 形式 形式
      if (3 === arrLength) {
        // 测试是否存在
        return `@${pkgNameArray[1]}/v/${pkgNameArray[2]}`;
      } else if (2 === arrLength && '' !== pkgNameArray[1]) {
        return `@${pkgNameArray[1]}`;
      } else {
        return null;
      }
    } else {
      // 当前包名格式正确非 @xxx 形式
      if (2 === arrLength) {
        return `@${pkgNameArray[1]}`;
      }
      return null;
    }
  }
  return pkgName;
}
