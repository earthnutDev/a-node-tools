/** 导出这个子项的类型声明 */
export type ReadInputListItem = {
  /**  唯一键  */
  key: symbol;
  /**  用户的参数  */
  callback: ReadInputParam;
  /**  向用户发送结果数据  */
  resolve: (x: ReadInputResult) => void;
  /**  发送的结果数据  */
  result: ReadInputResult;
};

export type DataStore = {
  /**  按序执行列表  */
  list: symbol[];
  /**  事件是否已执行监听  */
  listened: boolean;
  /**  注册动作
   *  添加二点监听项
   *
   * 通过判断当前 callList 的长度知晓当前是否正在执行
   *
   * 长度为 0 则触发回调开始执行
   */
  on(
    /**  唯一 key  */
    key: symbol,
    /**  用户回调  */
    callback: ReadInputParam,
    /**  Promise 的 resolve   */
    resolve: (value: ReadInputResult) => void,
  ): ReadInputListItem;
  /**  移除当前执行的动作  */
  remove(): void;
} & {
  /**  无序的数据  */
  [x: symbol]: ReadInputListItem;
};

/**  读取用户输入的返回值 （ Promise 的范性） */
export type ReadInputResult = {
  /**  是否是 SIGINT 信号退出的  */
  isSIGINT: boolean;

  /**  退出信号名称  */
  signalName: 'SIGINT' | '';
  /**  执行是否成功（目前来说与 isSIGINT 值相反）  */
  success: boolean;
};

/**  用户回调  */
export type ReadInputParam = (
  /**  在 mac 上使用  `ESC`、`Delete` 键会返回 undefined */
  keyValue: string | undefined,
  /**  返回的键值详细信息  */
  key:
    | undefined
    | {
        /**
         * 按键名称
         *
         * 在 mac 上特殊字符返回的 name 为 undefined ，如：“`” 、数字上上键、符号键
         *
         * */
        name: string | string;
        /**  是否按下了 `Ctrl` 键  */
        ctrl: boolean;
        /**  是否按下了 `Meta` 键  */
        meta: boolean;
        /**  是否按下了 `shift` 键  */
        shift: boolean;
        /** 按键的原始字符和转义序列  */
        sequence: string;
      },
) => boolean;

/**  使用配置参数  */
export type ReadInputOptions = {
  /**
   *
   *  是否忽略可捕获退出信号
   *
   * - `Ctrl + C` 将触发可捕获的 `SIGINT`
   * - `Ctrl + D` 将触发可捕获的 `SIGCONT`
   * - `Ctrl + \` 将触发可捕获的 `SIGQUIT`
   * - `Ctrl + ` ``
   *
   */
  ignoreExitSignal: boolean;
};
