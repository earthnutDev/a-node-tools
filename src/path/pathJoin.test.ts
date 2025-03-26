import { pathJoin } from './pathJoin'; // 假设文件名为 pathJoin.ts
import { join, normalize } from 'path';

describe('pathJoin', () => {
  it('should return an empty string when no arguments are provided', () => {
    expect(pathJoin()).toBe(normalize(''));
  });

  it('should return the same path when a single path is provided', () => {
    expect(pathJoin('singlePath')).toBe(normalize('singlePath'));
  });

  it('should join multiple paths correctly', () => {
    expect(pathJoin('path1', 'path2', 'path3')).toBe(
      normalize(join('path1', 'path2', 'path3')),
    );
  });

  it('should handle paths with "." and ".." correctly', () => {
    expect(pathJoin('path1', '.', 'path2', '..', 'path3')).toBe(
      normalize(join('path1', '.', 'path2', '..', 'path3')),
    );
  });

  it('should handle different OS paths correctly', () => {
    expect(pathJoin('path1', 'path2', 'path3')).toBe(
      normalize(join('path1', 'path2', 'path3')),
    );
  });
});
