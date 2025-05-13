export interface DefaultT {
  [x: string]: unknown;
}

/**
 *
 * 从 npm registry 获取包信息中的 versions 属性的值
 *
 * 亦可作为 package.json 文件读取的返回值类型，并使用 T 做类型扩展
 *
 */
export type PackageJson<T extends DefaultT = DefaultT> = T & {
  /**  包名  */
  name: string;
  /**  版本号  */
  version: string;
  /**  描述  */
  description: string;
  /**  作者信息  */
  author?: {
    name: string;
    email: string;
    url: string;
  };
  /**  维护者信息  */
  maintainers?: {
    name?: string;
    email?: string;
    url?: string;
  }[];
  /**     */
  repository?: {
    type: string;
    url: string;
  };
  /**  许可证  */
  license?: string;
  /**  问题  */
  bugs?: {
    url: string;
  };
  /**  主页  */
  homepage?: string;
  /**  关键字  */
  keywords?: string[];
  /**  入口文件  */
  main?: string;
  /**  types 文件  */
  typings?: string;
  /**  依赖  */
  _npmUser?: {
    name?: string;
    email?: string;
    url?: string;
  };
  /**  安装依赖时，是否自动安装  */
  _resolved?: string;
  /**  是否有 shrinkwrap  */
  _hasShrinkwrap?: boolean;
  /**  是否是组织  */
  _npmOrg?: boolean;
  /**  npm 版本  */
  _npmVersion?: string;
  /**  node 版本  */
  _nodeVersion?: string;
  /**  依赖版本  */
  _id?: string;
  /**  安装依赖时，是否自动安装  */
  _shasum?: string;
  /**  依赖版本  */
  _from?: string;
  /**  依赖版本  */
  _npmOperationalInternal?: {
    host?: string;
    tmp?: string;
  };
  /**  脚本勾子  */
  scripts?: {
    [key: string]: string;
  };
  /**  开发依赖  */
  devDependencies?: {
    [key: string]: string;
  };
  /**  强依赖  */
  peerDependencies?: {
    [key: string]: string;
  };
  /**  使用依赖  */
  dependencies?: {
    [key: string]: string;
  };
};

/**
 *
 * 从 npm registry 获取的包信息
 *
 */
export type npmPkgInfoType<T extends DefaultT = DefaultT> = {
  /**  包名  */
  _id: string;
  /**  版本号  */
  _rev: string;
  /**  包名  */
  name: string;
  /**  tag 版本信息  */
  'dist-tags': {
    [key: string]: string;
  };
  /**
   *
   * 版本信息
   *
   * 该数据并不存在于接口返回，而是在 ‘dist-tag’ 中获取了 `latest` 值
   */
  version: string;
  /**  发布过过的版本信息  */
  versions: {
    [key: string]: PackageJson<T>;
  };
  /**  发布时间  */
  time: {
    create: string;
    modified: string;
    [x: string]: string;
  };
  /**  LICENSE  */
  license?: string;
  /**
   *
   *  主页
   *
   *  `npx docs xxx` 时打开的网页
   *
   */
  homepage?: string;
  /**  发布  */
  repository?: {
    type: string;
    url: string;
    directory?: string;
  };
  /**  描述  */
  description: string;
  /**  作者  */
  contributors?: {
    name: string;
    email?: string;
    githubUsername?: string;
    url: string;
  }[];
  /**  维护者  */
  maintainers?: {
    name: string;
    email?: string;
    githubUsername?: string;
    url?: string;
  }[];
  /**  readme 内容  */
  readme?: string;
  /** 默认展示 readme 文件名  */
  readmeFilename?: string;
  /**  npm 用户信息  */
  _npmUser?: {
    name?: string;
    email?: string;
    url?: string;
  };
  /**  协作者  */
  users: { [x: string]: string };
  [x: string]: unknown;
};

export type npmRegistry = '官方' | '淘宝' | '腾讯' | '中科大' | 'yarn';

/**  获取 npm 包信息  */
export type getPkgInfoResult<T extends DefaultT = DefaultT> = {
  /**
   *
   *   获取到的包信息并通过 JSON.parse 转化为 npmPkgInfoType 对象
   *
   *
   * 其值为 null 并不意味着请求一定出错，有可能是 npm 中没有该名包或转化为对象时失败
   *
   */
  data: npmPkgInfoType<T> | null;
  /**
   *
   *  错误信息
   *
   *
   * 在
   *
   * - 请求出错
   * - 解析返回值为 JSON 时出错
   *
   * 时将有值
   *
   */
  error: Error | null;
  /**
   *
   *  请求是否成功（与获取包最后没有关系）
   *
   * 当值为 true 时，表示请求成功，然而仅当
   */
  success: boolean;
  /**
   *
   * ### 结果状态
   *
   * 该值作为请求的最终结果值
   *
   * - success： 请求成功且正确转化为 JSON （此时 success 为 true）
   * - parseJsonError： 请求成功但是转化为 JSON 时出错 （此时 success 为 true）
   * - notFound： 请求成功但是 npm 中没有该包名（此时该 success 为 true）
   * - otherCode： 请求成功，但是 npm  返回值为未知 （此时该 success 为 true）
   * - timeout： 请求超时（此时该 success 为 false）
   * - error: 请求出错（此时该 success 为 false）
   *
   */
  status:
    | 'timeout'
    | 'success'
    | 'error'
    | 'parseJsonError'
    | 'otherCode'
    | 'notFound';
  /**  其他消息  */
  message?: string;
};
