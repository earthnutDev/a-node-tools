import { DataStore } from './types';

/**  创建数据  */
export function createData(): DataStore {
  return {
    result: {
      success: false,
      data: '',
      error: '',
      status: 1,
      isSIGINT: false,
    },
    env: {
      cmd: [],
      code: '',
      cwd: '',
      printLog: false,
      shell: true,
      callBack: () => {},
      waiting: {
        show: false,
        info: '',
        prefix: 0,
        interval: 10,
        beforeDestroyed(): Promise<void> {
          return undefined;
        },
      },
    },
  };
}
