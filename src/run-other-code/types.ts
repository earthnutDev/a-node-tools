/**
 *
 * 执行其他代码的参数类型
 */
export type RunOtherCodeParam =
  | {
      /**
       *
       * 将要执行的代码
       *
       */
      code: string;
      /**
       *
       * 执行代码的目录
       *
       */
      cwd?: string | undefined;
      /**
       *
       * 是否隐藏等待
       *
       */
      hideWaiting?: boolean;
      /**
       *
       * 等待的提示文本，默认为 ""
       *
       */
      waitingMessage?: string;
      /**
       *
       * 是否主动打印日志信息
       *
       */
      printLog?: boolean;
      /**
       *
       * 回调函数
       *
       */
      callBack?: () => undefined;
    }
  | string;
