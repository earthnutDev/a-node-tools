/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default () => {
  return {
    preset: 'ts-jest',
    verbose: true,
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          isolatedModules: true,
          tsconfig: 'tsconfig.json',
        },
      ],
    },
    testMatch: ['**/*.test.(js|ts|tsx|jsx)'],
    fakeTimers: {
      enableGlobally: true,
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{ts,js,tsx,jsx}',
      '!**/*.test.ts',
      '!**/node_modules/**',
      '!index.ts',
      '!**/{types,type}.ts',
      '!**/{types,type}.d.ts',
      '!coverage/**',
    ],
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/', 'test', '.*.d.ts'],
    coverageReporters: ['text', 'lcov', 'html', 'text-summary'],
    coverageDirectory: 'coverage',
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 85,
        lines: 90,
        statements: 90,
      },
    },
  };
};
