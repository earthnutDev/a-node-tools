/** Parameter types for `runOtherCode`
 *
 * 执行其他代码的参数类型
 */
export type RunOtherCodeParam =
  | {
      /** The code to be executed
       *
       * 将要执行的代码
       */
      code: string;
      /** Directory for executing code
       *
       * 执行代码的目录
       */
      cwd?: string | undefined;
      /** Whether to hide waiting
       *
       * 是否隐藏等待
       */
      hideWaiting?: boolean;
      /** The waiting prompt text defaults to ""
       *
       * 等待的提示文本，默认为 ""
       */
      waitingMessage?: string;
      /** Whether to proactively print date information
       *
       * 是否主动打印日志信息
       */
      printLog?: boolean;
      /** Callback function
       *
       * 回调函数
       */
      callBack?: () => undefined;
    }
  | string;
