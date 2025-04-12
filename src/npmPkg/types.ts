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
