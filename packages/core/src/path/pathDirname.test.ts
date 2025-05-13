import { pathDirname } from './pathDirname'; // 假设文件名为 pathDirname.ts

describe('pathDirname', () => {
  it('should return the directory name of a normal path', () => {
    expect(pathDirname('/a/b/c')).toBe('/a/b');
  });

  it('should return the root path when given the root path', () => {
    expect(pathDirname('/')).toBe('/');
  });

  it('should return the current directory when given an empty path', () => {
    expect(pathDirname('')).toBe('.');
  });

  it('should return the directory name of a file path', () => {
    expect(pathDirname('/a/b/c.txt')).toBe('/a/b');
  });

  it('should return the directory name of a relative path', () => {
    expect(pathDirname('a/b/c')).toBe('a/b');
  });

  it('should return the root path when given a single directory', () => {
    expect(pathDirname('/a')).toBe('/');
  });

  it('should return the directory name when the path ends with a slash', () => {
    expect(pathDirname('/a/b/c/')).toBe('/a/b');
  });
});
