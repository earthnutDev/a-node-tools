import { isEmpty } from './isEmpty';
import { readdirSync, Dirent } from 'fs';
import { isExist } from './isExist'; // Assume this is the import path for isExist

jest.mock('fs');
jest.mock('./isExist', () => ({
  isExist: jest.fn(),
}));

describe.skip('isEmpty', () => {
  test('Directory Exists and is Empty', () => {
    (isExist as jest.Mock).mockReturnValue({ isDirectory: () => true });
    (readdirSync as jest.Mock).mockReturnValue([]);

    expect(isEmpty('someDir')).toBe(1);
  });

  test('Directory Exists and is Not Empty', () => {
    (isExist as jest.Mock).mockReturnValue({ isDirectory: () => true });
    (readdirSync as jest.Mock).mockReturnValue([new Dirent()]);

    expect(isEmpty('someDir')).toBe(0);
  });

  test("Directory Doesn't Exist", () => {
    (isExist as jest.Mock).mockReturnValue(null);

    expect(isEmpty('someDir')).toBe(-1);
  });

  test('Error Occurs', () => {
    (isExist as jest.Mock).mockReturnValue({ isDirectory: () => true });
    (readdirSync as jest.Mock).mockImplementation(() => {
      throw new Error('Some error');
    });

    expect(isEmpty('someDir')).toBe(-1);
  });
});
