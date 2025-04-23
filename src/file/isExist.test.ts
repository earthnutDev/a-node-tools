import { isExist } from './isExist';
import { mkdtempSync, writeFileSync, rmdirSync, mkdirSync } from 'node:fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { Stats } from 'fs';

describe('isExist', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'test-'));
  });

  afterEach(() => {
    rmdirSync(tempDir, { recursive: true });
  });

  it('should return Stats object when file exists', () => {
    const filePath = join(tempDir, 'test.txt');
    writeFileSync(filePath, 'test content');
    const result = isExist(filePath);
    expect(result).toBeInstanceOf(Stats);
  });

  it('should return undefined when file does not exist', () => {
    const nonExistentFilePath = join(tempDir, 'non-existent.txt');
    const result = isExist(nonExistentFilePath);
    expect(result).toBeUndefined();
  });

  it('should return Stats object when directory exists', () => {
    const dirPath = join(tempDir, 'testDir');
    mkdirSync(dirPath);
    const result = isExist(dirPath);
    expect(result).toBeInstanceOf(Stats);
  });

  it('should return undefined when directory does not exist', () => {
    const nonExistentDirPath = join(tempDir, 'non-existentDir');
    const result = isExist(nonExistentDirPath);
    expect(result).toBeUndefined();
  });
});
