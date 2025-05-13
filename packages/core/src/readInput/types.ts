import { Interface } from 'node:readline';

/** 导出这个子项的类型声明 */
export type ReadInputListItem = {
  key: symbol;
  rl: Interface;
  action: ReadInputAction;
  callback: ReadInputParam;
  resolve: (x: unknown) => void;
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
    /**  执行的动作  */
    action: ReadInputAction,
    /**  Promise 的 resolve   */
    resolve: (value: unknown) => void,
  ): ReadInputListItem;
  /**  移除当前执行的动作  */
  remove(): void;
} & {
  /**  无序的数据  */
  [x: symbol]: ReadInputListItem;
};

/**  主要逻辑执行  */
export type ReadInputAction = (rl: ReadInputListItem) => void;

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
