import { WaitingTipsResult } from './../waiting/waiting-tips-class';
import { DataStore } from './types';

/** 全局状态数据 */
export const runOtherCodeGlobalData: {
  /**
   * ## 全局使用的 `waiting`
   * 在没有显式设定执行的 `waiting` 时，则使用该值作为默认的等待程序
   *
   * **不建议使用该配置项，除非你知道自己在做什么**
   */
  waiting?: WaitingTipsResult;
} = {
  waiting: undefined,
};

/**  创建数据  */
export function createData(): DataStore {
  return {
    result: {
      success: false,
      data: '',
      error: '',
      status: 1,
      isSIGINT: false,
      runCode: '',
      runCwd: '',
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
        canCtrlDExit: false,
        canCtrlCExit: false,
        async beforeDestroyed(): Promise<void> {
          return undefined;
        },
      },
    },
  };
}
