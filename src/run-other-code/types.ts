/**
 *
 * 执行代码选项
 *
 */
export interface RunOtherCodeOptions {
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
   * 使用使用 shell 执行代码
   *
   * 缺省值为 true ，使用时请注意校验用户输入，防止命令恶意注入
   *
   */
  shell?: boolean;
  /**
   *
   * 回调函数
   *
   */
  callBack?: () => undefined;
}

/**
 *
 * 执行其他代码的参数类型
 */
export type RunOtherCodeOption = RunOtherCodeOptions | string;

/**
 *
 * 执行返回值
 *
 */
export type runOtherCodeResult = {
  /**
   * 执行 🀄️ 运行错误的信息
   */
  error: string;
  /**
   *
   *  ### 执行是否成功
   *
   *
   * 执行不成功包括
   *
   * - 未执行执行 （code 值将为 0）
   *      - 执行命令错误或不存在
   *      - 内存不足
   *      - 没有执行权限
   * - 执行 🀄️ 出现错误 （code 值将为 3）
   */
  success: boolean;
  /**
   *
   * ## 运行结束值
   *
   * - 0 未执行
   * - 1 执行完成，且没有 error 信息
   * - 2 执行完成，但是 error 信息不为空
   * - 3 执行未完成，执行中错误
   */
  status: 0 | 1 | 2 | 3;
  /**
   *
   * 执行
   *
   * message
   *
   */
  data: string;
};
