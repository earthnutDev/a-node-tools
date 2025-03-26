// /Users/lm/code/npm/a-node-tools/src/cursor.test.ts
import { _p } from './print';
import {
  cursorAfterClear,
  cursorHide,
  cursorMoveUp,
  cursorShow,
} from './cursor';
import { stdout } from 'node:process';
import { t } from 'color-pen';

// 使用 Jest 的 mock 功能来模拟 stdout.write 方法
jest.mock('node:process', () => ({
  ...jest.requireActual('node:process'),
  stdout: {
    write: jest.fn(),
  },
}));

describe('about cursor', () => {
  describe('_p function', () => {
    // 在每个测试用例之后重置模拟函数的调用记录
    afterEach(() => {
      jest.clearAllMocks();
    });

    // 测试字符串输入
    it('should handle string input with lineFeed true', () => {
      _p('test');
      expect(stdout.write).toHaveBeenCalledWith('test\n');
    });

    it('should handle string input with lineFeed false', () => {
      _p('test', false);
      expect(stdout.write).toHaveBeenCalledWith('test');
    });

    // 测试数字输入
    it('should handle number input with lineFeed true', () => {
      _p(123);
      expect(stdout.write).toHaveBeenCalledWith('123\n');
    });

    // 测试 BigInt 输入
    it('should handle BigInt input with lineFeed true', () => {
      _p(123n);
      expect(stdout.write).toHaveBeenCalledWith('123n\n');
    });

    // 测试对象输入
    it('should handle object input with lineFeed true', () => {
      _p({ key: 'value' });
      expect(stdout.write).toHaveBeenCalledWith('{\n  "key": "value"\n}\n');
    });

    // 测试函数输入
    it('should handle function input with lineFeed true', () => {
      const func = () => {};
      _p(func);
      expect(stdout.write).toHaveBeenCalledWith(`${func.toString()}\n`);
    });

    // 测试 undefined 输入
    it('should handle undefined input with lineFeed true', () => {
      _p(undefined);
      expect(stdout.write).toHaveBeenCalledWith('\n');
    });
  });

  describe('cursorHide function', () => {
    // 在每个测试用例之后重置模拟函数的调用记录
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should not call stdout.write directly', () => {
      // 调用 cursorHide 函数
      cursorHide();
      // 验证 stdout.write 没有被直接调用
      expect(stdout.write).toHaveBeenCalled();
    });
  });

  describe('cursorShow function', () => {
    // 在每个测试用例之后重置模拟函数的调用记录
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should not call stdout.write directly', () => {
      // 调用 cursorShow 函数
      cursorShow();
      // 验证 stdout.write 没有被直接调用
      expect(stdout.write).toHaveBeenCalled();
    });
  });

  describe('cursorAfterClear function', () => {
    // 在每个测试用例之后重置模拟函数的调用记录
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return the correct cursor position string', () => {
      const result = cursorAfterClear();
      expect(result).toBe(undefined);
    });

    it('should not call stdout.write directly', () => {
      // 调用 cursorAfterClear 函数
      cursorAfterClear();
      // 验证 stdout.write 没有被直接调用
      expect(stdout.write).toHaveBeenCalled();
    });
  });

  describe('cursorMoveUp function', () => {
    // 在每个测试用例之后重置模拟函数的调用记录
    afterEach(() => {
      jest.clearAllMocks();
    });

    // 测试默认参数情况
    it('should move cursor up by default number of moves (1)', () => {
      cursorMoveUp();
      expect(stdout.write).toHaveBeenCalledWith(t.concat('1A'));
    });

    // 测试正整数参数
    it('should move cursor up by specified number of moves (positive integer)', () => {
      cursorMoveUp(3);
      expect(stdout.write).toHaveBeenCalledWith(t.concat('3A'));
    });

    // 测试浮点数参数，应该被四舍五入
    it('should move cursor up by rounded number of moves (float)', () => {
      cursorMoveUp(2.7);
      expect(stdout.write).toHaveBeenCalledWith(t.concat('3A'));
    });

    // 测试非数字参数，应该使用默认值
    it('should move cursor up by default number of moves (non-number)', () => {
      cursorMoveUp('a');
      expect(stdout.write).toHaveBeenCalledWith(t.concat('1A'));
    });

    // 测试负数参数，应该使用默认值
    it('should move cursor up by default number of moves (negative number)', () => {
      cursorMoveUp(-1);
      expect(stdout.write).toHaveBeenCalledWith(t.concat('1A'));
    });

    // 测试非有限数参数，应该使用默认值
    it('should move cursor up by default number of moves (non-finite number)', () => {
      cursorMoveUp(NaN);
      expect(stdout.write).toHaveBeenCalledWith(t.concat('1A'));
    });

    // 测试 BigInt 参数，应该被转换为字符串并附加 'n'
    it.skip('should move cursor up by specified number of moves (BigInt)', () => {
      cursorMoveUp(5n);
      expect(stdout.write).toHaveBeenCalledWith('5A');
    });
  });
});
