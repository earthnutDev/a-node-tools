import { isWindows } from './isWindows';
import { pathBasename } from './pathBasename';

describe('pathBasename', () => {
  if (isWindows) {
    //   Windows-style path
    // windows 操作系统
    it('should return the basename of a Windows-style path when isWindows is true', () => {
      const filename = 'C:\\Users\\User\\Documents\\file.txt';
      expect(pathBasename(filename)).toBe('file.txt');
    });

    it('should return the basename of a mixed-style path when isWindows is true', () => {
      const filename = 'C:/Users/User/Documents/file.txt';
      expect(pathBasename(filename)).toBe('file.txt');
    });
  } else {
    //   POSIX-style path
    // 非 windows 操作系统

    it('should return the basename of a POSIX-style path when isWindows is false', () => {
      const filename = '/Users/User/Documents/file.txt';
      expect(pathBasename(filename)).toBe('file.txt');
    });

    it('should return the basename of a mixed-style path when isWindows is false', () => {
      const filename = 'C:\\Users\\User\\Documents\\file.txt';
      expect(pathBasename(filename)).toBe('file.txt');
    });
  }
});
