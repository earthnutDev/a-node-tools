global.console.error = jest.fn();

process.env.NODE_ENV = 'test';

beforeEach(() => {
  jest.resetAllMocks();
});
