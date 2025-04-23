import { getNpmPkgInfo } from './getNpmPkgInfo';
import { npmPkgInfoType } from './types';
import * as https from 'node:https';
import { jest } from '@jest/globals';
import { parseName } from './parseName';

jest.mock('node:https', () => ({
  get: jest.fn(),
}));

jest.mock('./parseName', () => ({
  parseName: jest.fn((pkgName: string) => pkgName),
}));

const mockedHttpsGet = https.get as jest.MockedFunction<typeof https.get>;
const mockedParseName = parseName as jest.MockedFunction<typeof parseName>;

describe('getNpmPkgInfo', () => {
  it('Test Valid Package Name - should return package info for lodash', async () => {
    // Mock parseName to return the valid package name
    mockedParseName.mockReturnValue('lodash');

    // Create mock package data that matches npmPkgInfoType
    const mockPackageData: npmPkgInfoType = {
      _id: 'lodash',
      _rev: '1234',
      name: 'lodash',
      'dist-tags': {
        latest: '4.17.21',
      },
      versions: {
        '4.17.21': {
          name: 'lodash',
          version: '4.17.21',
          description: 'Lodash modular utilities',
        },
      },
      time: {
        create: '2012-04-07T18:59:54.532Z',
        modified: '2021-02-19T21:45:45.478Z',
      },
      description: 'Lodash modular utilities',
      users: {},
    };

    // Mock the HTTP response
    const mockResponse = {
      statusCode: 200,
      on: jest.fn((event: string, callback: (data?: any) => void) => {
        if (event === 'data') {
          callback(JSON.stringify(mockPackageData));
        }
        if (event === 'end') {
          callback();
        }
      }),
    };

    const mockRequest = {
      on: jest.fn(),
      end: jest.fn(),
    };

    // Setup https.get mock implementation
    mockedHttpsGet.mockImplementationOnce((options, callback) => {
      expect(options.path).toBe('/lodash');
      callback(mockResponse as any);
      return mockRequest as any;
    });

    // Execute the function
    const result = await getNpmPkgInfo('lodash', '官方');

    // Verify the results
    expect(result).not.toBeNull();
    expect(result).toEqual({
      ...mockPackageData,
      version: '4.17.21', // version should be set to latest tag
    });

    // Verify the HTTP request was made correctly
    expect(mockedHttpsGet).toHaveBeenCalledWith(
      expect.objectContaining({
        hostname: 'registry.npmjs.org',
        path: '/lodash',
        headers: {
          'sec-fetch-dest': 'empty',
          'X-Spiferacl': '1',
        },
      }),
      expect.any(Function),
    );

    // Verify parseName was called
    expect(mockedParseName).toHaveBeenCalledWith('lodash');
  });
});

describe('getNpmPkgInfoTest', () => {
  it('应正确处理作用域的包名称', async () => {
    // Mock parseName to return the scoped package name
    mockedParseName.mockReturnValue('@types/node');

    // Mock response data for @types/node package
    const mockData: Partial<npmPkgInfoType> = {
      _id: '@types/node',
      name: '@types/node',
      'dist-tags': {
        latest: '20.10.4',
      },
      versions: {
        '20.10.4': {
          name: '@types/node',
          version: '20.10.4',
          description: 'TypeScript definitions for Node.js',
        },
      },
    };

    // Mock response object
    const mockResponse = {
      statusCode: 200,
      on: jest.fn((event: string, callback: (data?: any) => void) => {
        if (event === 'data') {
          callback(JSON.stringify(mockData));
        }
        if (event === 'end') {
          callback();
        }
      }),
    };

    // Mock request object
    const mockRequest = {
      on: jest.fn(),
      end: jest.fn(),
    };

    // Setup https.get mock implementation
    mockedHttpsGet.mockImplementationOnce((options, callback) => {
      // Verify the request path includes the encoded scoped package name
      expect(options.path).toBe('/@types/node');
      callback(mockResponse as any);
      return mockRequest as any;
    });

    // Execute the function
    const result = await getNpmPkgInfo('@types/node', '官方');

    // Verify the results
    expect(result).toEqual({
      ...mockData,
      version: '20.10.4', // Should include the latest version
    });

    // Verify the https.get was called with correct parameters
    expect(mockedHttpsGet).toHaveBeenCalledWith(
      expect.objectContaining({
        hostname: 'registry.npmjs.org',
        path: '/@types/node',
        headers: {
          'sec-fetch-dest': 'empty',
          'X-Spiferacl': '1',
        },
      }),
      expect.any(Function),
    );
  });
});

describe('getNpmPkgInfo', () => {
  it('should return null when package does not exist', async () => {
    // Mock parseName to return the package name
    mockedParseName.mockReturnValue('non-existent-package-12345');

    // Mock the response for non-existent package (404 status)
    const mockResponse = {
      statusCode: 404,
      on: jest.fn((event: string, callback: () => void) => {
        if (event === 'data') {
          callback();
        }
        if (event === 'end') {
          callback();
        }
      }),
    };

    // Mock the request object
    const mockRequest = {
      on: jest.fn(),
      end: jest.fn(),
    };

    // Mock https.get implementation
    mockedHttpsGet.mockImplementation((options, callback) => {
      callback(mockResponse as any);
      return mockRequest as any;
    });

    // Execute the function with non-existent package name
    const result = await getNpmPkgInfo('non-existent-package-12345', '官方');

    // Assert the result is null
    expect(result).toBeNull();

    // Verify the request was made with correct path
    expect(mockedHttpsGet).toHaveBeenCalledWith(
      expect.objectContaining({
        path: '/non-existent-package-12345',
        hostname: 'registry.npmjs.org',
      }),
      expect.any(Function),
    );
  });
});
