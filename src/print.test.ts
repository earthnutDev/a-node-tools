import { _p } from './print';
import { stdout } from 'process';

describe('_p', () => {
  let mockWrite: jest.SpyInstance;

  beforeEach(() => {
    mockWrite = jest.spyOn(stdout, 'write').mockImplementation();
  });

  afterEach(() => {
    mockWrite.mockRestore();
  });

  it('should output a string without newline', () => {
    _p('test', false);
    expect(mockWrite).toHaveBeenCalledWith('test');
  });

  it('should output a string with newline', () => {
    _p('test', true);
    expect(mockWrite).toHaveBeenCalledWith('test\n');
  });

  it('should output a number', () => {
    _p(123);
    expect(mockWrite).toHaveBeenCalledWith('123\n');
  });

  it('should output a bigint', () => {
    _p(BigInt(123));
    expect(mockWrite).toHaveBeenCalledWith('123n\n');
  });

  it('should output a boolean', () => {
    _p(true);
    expect(mockWrite).toHaveBeenCalledWith('true\n');
  });

  it('should output ""', () => {
    _p(undefined);
    expect(mockWrite).toHaveBeenCalledWith('\n');
  });

  it('should output a function as a string', () => {
    const fn = () => {};
    _p(fn);
    expect(mockWrite).toHaveBeenCalledWith(`${fn}\n`);
  });

  it('should output null', () => {
    _p(null);
    expect(mockWrite).toHaveBeenCalledWith('null\n');
  });

  it('should output an object as JSON', () => {
    _p({ key: 'value' });
    expect(mockWrite).toHaveBeenCalledWith('{\n  "key": "value"\n}\n');
  });

  it('should output an array as JSON', () => {
    _p([1, 2, 3]);
    expect(mockWrite).toHaveBeenCalledWith('[\n  1,\n  2,\n  3\n]\n');
  });

  it('should handle undefined values in objects', () => {
    _p({ key: undefined });
    expect(mockWrite).toHaveBeenCalledWith(`{
  "key": "undefined"\n}\n`);
  });

  it('should handle functions in objects', () => {
    const fn = () => {};
    _p({ key: fn });
    expect(mockWrite).toHaveBeenCalledWith(`{
  "key": "${fn}"\n}\n`);
  });
});
