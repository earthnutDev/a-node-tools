/**  等待  */

export type RunOtherCodeWaiting = {
  show: boolean;
  info: string;
  suffix: number;
};
/**
 *
 * 执行代码选项
 *
 */
export interface RunOtherCodeOptions {
  /** 将要执行的代码字符串   */
  code: string;
  /** 执行代码的目录   */
  cwd?: string | undefined;
  /**
   *
   * 是否隐藏等待
   *
   * @deprecated 该属性将在下一版本 (v4+) 中移除，请使用 `waiting` 代替
   */
  hideWaiting?: boolean;
  /**
   *   是否展示等待 (在过度版本中，优先级将高于 hideWaiting、waitingMessage )
   *
   * - 当值为布尔值时，将使用默认的等待文本 `请等待`，值将控制是否展示 `请等待`
   * - 当值为字符串时，将默认展示该字符串
   * - 当值为数值时，将默认展示 `请等待` ，使用指定的尾缀符号
   * - 当值为对象时：
   *     - show 可选属性，是否展示文本。缺省值为 false
   *     - info 可选属性，展示的具体文本。缺省值为 ""
   *     - suffix 可选属性，展示跳动尾缀类型。缺省将随机展示
   *          - 0 一个消长的尾缀 ['.', '..', '...', '....', '...', '..']
   *          - 1 一个旋转的尾缀 ['···', '⋱', '⋮', '⋰', '···', '⋱', '⋮', '⋰']
   *          - 2 一个旋转的尾缀  ['⤯', '⤰', '⤮', '⤩', '⤪', '⤧', '⤨']
   *          - 3 一个不会主动展示的尾缀 ['🙃','😂','😄','😡','😏','🫥','🥳']
   *          - 4 一个不会主动展示的尾缀 ['👈','👆','👉','👇','🤘','🤟','🫳','🫴','👊']
   */
  waiting?:
    | boolean
    | string
    | number
    | {
        [x in keyof RunOtherCodeWaiting]?: RunOtherCodeWaiting[x];
      };
  /**
   * 等待的提示文本，默认为 "请等待"
   * @deprecated 该属性将在下一版本 (v4+) 中移除，请使用 `waiting`
   */
  waitingMessage?: string;
  /**  是否主动打印原输出信息  */
  printLog?: boolean;
  /**
   *
   * 使用使用 shell 执行代码
   *
   * 缺省值为 true ，使用时请注意校验用户输入，防止命令恶意注入
   *
   */
  shell?: boolean;
  /**  回调函数  */
  callBack?: () => undefined;
}

/**
 *
 * 执行其他代码的参数类型
 *
 */
export type RunOtherCodeOption = RunOtherCodeOptions | string;

/**  执行返回值  */
export type runOtherCodeResult = {
  /** 执行 🀄️ 运行错误的信息   */
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
  /**  执行时的标准流输出  */
  data: string;
};
