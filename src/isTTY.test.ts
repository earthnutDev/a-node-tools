import { isTTY } from './isTTY';

describe('isTTY', () => {
  it('should return false when process is undefined', () => {
    const originalProcess = global.process;
    global.process = undefined;
    expect(isTTY()).toBe(false);
    global.process = originalProcess;
  });

  it('should return false when process.stdout is undefined', () => {
    const originalProcess = global.process;
    global.process = { stdout: undefined };
    expect(isTTY()).toBe(false);
    global.process = originalProcess;
  });

  it('should return true when process.stdout.isTTY is true', () => {
    const originalProcess = global.process;
    global.process = { stdout: { isTTY: true } };
    expect(isTTY()).toBe(true);
    global.process = originalProcess;
  });

  it('should return false when process.stdout.isTTY is false', () => {
    const originalProcess = global.process;
    global.process = { stdout: { isTTY: false } };
    expect(isTTY()).toBe(false);
    global.process = originalProcess;
  });
});
