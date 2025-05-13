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
        suffix: 0,
        interval: 10,
      },
    },
  };
}
