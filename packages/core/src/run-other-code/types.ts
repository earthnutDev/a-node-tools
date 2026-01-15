import {
  RunOtherCodeWaiting,
  waitingTipsParams,
  WaitingTipsResult,
} from '../waiting';

/**  必要的参数  */
export type RequiredParameter = {
  /** 将要执行的代码字符串   */
  code: string;
};

/**  非必要的参数  */
export type OptionalParameter = {
  /** 执行代码的目录   */
  cwd: string | undefined;
  /**  是否主动打印原输出信息  */
  printLog: boolean;
  /**
   *
   * 使用使用 shell 执行代码
   *
   * 缺省值为 true ，使用时请注意校验用户输入，防止命令恶意注入
   *
   */
  shell: boolean;
  /**  携带交互，该命令等级权限较高，将覆盖 printLog 和 waiting 的参数效果  */
  // interact: boolean;
  /**  回调函数  */
  callBack: () => undefined;
};

/**
 *
 * 执行代码选项
 *
 */
export type RunOtherCodeOptions = {
  [x in keyof RequiredParameter]: RequiredParameter[x];
} & {
  [x in keyof OptionalParameter]?: OptionalParameter[x];
} & {
  /**
   * ###  是否展示等待
   *
   *  前缀的时间间隔仅可在为对象实参时才可指定，缺省值为 20
   *
   * - 当值为布尔值时，将使用默认的等待文本 `请等待`，值将控制是否展示 `请等待`
   * - 当值为字符串时，将默认展示该字符串
   * - 当值为数值时，将默认展示 `请等待` ，使用指定的前缀符号
   * - 当值为对象时：
   *     - show 可选属性，是否展示文本。缺省值为 false
   *     - info 可选属性，展示的具体文本。缺省值为 ""
   *     - interval 前缀的两个间隔
   *     - prefix 可选属性，展示跳动前缀类型。缺省将随机展示
   *          - 0 一个旋转的前缀 ['···', '⋱', '⋮', '⋰', '···', '⋱', '⋮', '⋰']
   *          - 1 一个时针旋转的前缀  ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖','🕗','🕘', '🕙','🕚','🕛']
   *          - 2 一个分针旋转前缀 ['🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧']
   *          - 3  前缀 ['👈','👆','👉','👇','🤘','🤟','🫳','🫴','👊']
   *          - 4  前缀 ['🌞','🌕','🌖','🌗' ,'🌜','🌘','🌑','🌒','🌓','🌛','🌔','🌔','🌔','🌝']
   */
  waiting?: waitingTipsParams | WaitingTipsResult;
};

/**
 *
 * 执行其他代码的参数类型
 *
 * - 可为字符串类型，该数据将作为执行数据使用
 * - 为  `RunOtherCodeOptions` 类型，以对象的形式，详细的操控
 *
 */
export type RunOtherCodeOption = RunOtherCodeOptions | string;

/**  执行返回值  */
export type RunOtherCodeResult = {
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
   * - 4 遭遇到双 esc 键等退出键退出
   */
  status: 0 | 1 | 2 | 3 | 4;
  /**  是否是 SIGINT 信号退出  */
  isSIGINT: boolean;
  /**  执行时的标准流输出  */
  data: string;
  /** 执行代码 */
  runCode: string;
  /** 执行工作目录 */
  runCwd: string;
};

/**  每次执行的数据  */
export type DataStore = {
  env: {
    [x in keyof RequiredParameter]: RequiredParameter[x];
  } & {
    [x in keyof OptionalParameter]: OptionalParameter[x];
  } & {
    // 执行代码
    cmd: string[];
    // 内部使用的等待参数
    waiting: RunOtherCodeWaiting | WaitingTipsResult;
  };

  /**  执行的结果  */
  result: RunOtherCodeResult;
};
