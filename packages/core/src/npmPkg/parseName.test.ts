import { parseName } from './parseName';

// 使用Jest框架编写测试
describe('parseName', () => {
  // 测试当pkgName为空字符串时
  it('should return null when pkgName is an empty string', () => {
    expect(parseName('', false)).toBeNull();
  });

  // 测试当pkgName不是字符串时
  it('should return null when pkgName is not a string', () => {
    expect(parseName(123, false)).toBeNull();
    expect(parseName(null, false)).toBeNull();
    expect(parseName(undefined, false)).toBeNull();
  });

  // 测试当pkgName不包含@时
  it('should return the same pkgName when it does not contain "@"', () => {
    expect(parseName('lodash', false)).toBe('lodash');
  });

  // 测试当pkgName格式不正确时
  it.skip('当 pkgName 格式不正确时，应返回 null', () => {
    expect(parseName('@scope', false)).toBeNull();
    expect(parseName('@scope//package', false)).toBeNull();
    expect(parseName('scope@package', false)).toBeNull();
  });

  // 测试边界情况
  it('应正确处理边缘情况', () => {
    expect(parseName('@/scope/package', true)).toBe('@scope/package'); // 前导斜杠
    expect(parseName('@scope//version', false)).toBe('@scope/version'); // 双斜杠
    expect(parseName('@scope/v', false)).toBe('@scope/v'); // v 后面的尾部斜杠
    expect(parseName('@scope/v/', false)).toBe('@scope/v'); // v 后面的尾部斜杠和斜杠
  });

  // 测试当pkgName包含多个@时
  it('should return null when pkgName contains multiple "@"', () => {
    expect(parseName('user@scope@package', false)).toBeNull();
  });

  // 测试当pkgName以@开头但后面没有内容时
  it('当 pkgName 以 “@” 开头但之后没有内容时，应返回 null', () => {
    expect(parseName('@', false)).toBeNull();
  });
});
