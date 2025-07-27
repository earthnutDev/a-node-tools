# a node tools

[![version](<https://img.shields.io/npm/v/a-node-tools.svg?logo=npm&logoColor=rgb(0,0,0)&label=版本号&labelColor=rgb(73,73,228)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/a-node-tools) [![issues 提交](<https://img.shields.io/badge/issues-提交-rgb(255,0,63)?logo=github>)](https://github.com/earthnutDev/a-node-tools/issues)

一个纯函数的工具，包含了

## file 模块

- `readFileToJson` 读取 `.json` 文件并返回 JSON 或空对象 `null`
- `readFileToJsonSync` 同步读取 `.json` 文件并返回 `JSON` 或空对象 `null`
- `fileExist` 文件是否存在
- `dirEmpty` 目录是否为空
- `writeJsonFile` 把 `json` 数据写入空白文件

## runOtherCode 模块

- `runOtherCode` 运行其他代码
- `RunOtherCodeParam` 运行其他代码的参数类型声明
- `waitingTips` 一个用于等待的简单终端提示
- `waitingTipsPrefixStore` 用于自定义 `waitingTips` 的等待的前缀 emoji

### `runOtherCode`

- 简单执行其他的命令,**_请注意，请不要将用户输入当作 `code` 值传入方法，执行有风险，且调且珍惜_**
- 在使用时，如果需要读入输入操作，这时候直接使用 `runOtherCode` 显得有些笨拙（因为原则上没有读取的操作）
- 默认 `Ctrl` + `C` 、 `Ctrl` + `D` 是不会退出 `runOtherCode` ，但是可在 `wait`

```ts
import { runOtherCode } from 'a-node-tools';

const result = await runOtherCode({
  code: 'ls',
  printLog: true,
});
```

## `npmPkg` 模块

- `getPkgInfoResult` 方法 `getNpmPkgInfo` 的返回值类型
- `getNpmPkgInfo` 获取 npm 包信息
- `testNpmPackageExist` 测试包是否可下载存在

现可通过第二参数指定 npm registry 源

可接受参数

```ts
type npmRegistry = '官方' | '淘宝' | '腾讯' | '中科大' | 'yarn';
```

各源的测试情况

[![测试情况](https://raw.githubusercontent.com/earthnutDev/a-node-tools/v4/media/测试源情况.png)](https://github.com/earthnutDev/a-node-tools/blob/v4/media/测试源情况.png)

由上图可见，使用 `淘宝` 源时，延迟相对较低。而有些国内源都没有 `npm` 原源（但是各源有各源的用途，譬如，如果是在腾讯云服务器部署的服务，当然是使用腾讯的 npm 源比较快啦，举衣反山）延迟低。

## path 模块

- `pathJoin` 文件地址拼接
- `pathBasename` 给出文件路径获取文件名，不带文件类型后缀
- `initializeFile` 初始化路径 `__filename` 和 `__dirname` ，因为这两个仅能在 `cjs` 文件下使用，使用这里做了初始化，兼容
- `getCallerFilename` 获取调用函数的文件路径
- `isWindows` 当前是否为 windows 环境，用于在使用 `path` 时分隔符不同产生的差异
- `getDirectoryBy` 根据目标的文件或文件名来找到存在该目标的父级目录

### cursor 部分

你可以使用 cursor 进行对光标位置进行操控：

|          方法           |              示意              |                       参数                       |
| :---------------------: | :----------------------------: | :----------------------------------------------: |
|          `_p`           |      在 node 环境下的打印      | `r` 打印的文本; `lineFeed` 是否换行，缺省为 true |
|      `cursorHide`       |            光标隐藏            |                        --                        |
|      `cursorShow`       |            光标展示            |                        --                        |
|  `cursorPositionSave`   |          储存光标位置          |                        --                        |
| `cursorPositionRestore` |          恢复光标位置          |                        --                        |
|     `cursorMoveUp`      |            光标上移            |       `numberOfUpwardMoves` 偏移量，缺省 1       |
|    `cursorMoveDown`     |            光标下移            |        `numberOfMovesDown` 偏移量，缺省 1        |
|    `cursorMoveLeft`     |            光标左移            |       `numberOfLeftShifts` 偏移量，缺省 1        |
|    `cursorMoveRight`    |            光标右移            |       `numberOfRightShifts` 偏移量，缺省 1       |
|   `cursorAfterClear`    |          光标后内容🧹          |                        --                        |
| `cursorLineAfterClear`  | 清理光标所在行光标位置后的内容 |                                                  |
| `cursorLineBeforeClear` | 清理光标所在行光标位置前的内容 |                                                  |
|    `cursorLineClear`    |    清理光标所在行的所有内容    |                                                  |

## terminal 部分

- `terminalPageUp` 终端整页向上滚动
- `terminalPageOn` 终端整页下翻
- `terminalScrollScreen` 全屏滚动
- `terminalScrollBetween` 设定终端可滚动范围

### readInput 部分

等待用户输入的一个函数。因为要等待，所以是异步的，使用的时候应当使用 `await`

例：

```js
import { isTrue } from 'a-type-of-js';
import { readInput , _p} from "a-node-tools";

// 不建议使用异步函数，因为我想不到使用场景，所以移除了相关的判断
const callBackFunction = (keyValue: string | undefined, key:any)
=> {
    /// 自定义当遇到某一个钟意的键则可以返回，这里只是示例，没有说必须要 `enter` 键才可以
    if(key.name && key.name == 'return') {
        return true;
    }
    else {
      // 如果返回的是非 `true` 则不会触发异步事件的 resolve 事件
      return _p(`换一个键试试，这个键（${keyValue}）不允许退出`);
    }
};

async function main() {
    const result = await readInput(callBackFunction)
    // 从 `v4` 版本开始，`Ctrl` + `C` 不再强制退出，而是交予您处理

    if (isTrue(result.isSIGINT)) {
      _p('老逼登你要干么？你以为按一个 `Ctrl` + `C` 就能退出去了？');
      _p('try again 啊！');
      _p('有本事拔电线呀！');
     await  main();
    }
}

await main();
```

## 其他部分

### \_p

一个简单的 process.stdout.write 的封装，用于在 node 环境向终端输入内容

```ts
import { _p } from 'a-node-tools';

_p('hello'); // hello

_p('hello', false); // hello （打印完不换行，光标依旧在 o 后面）
```

### colorLine

一条彩色的分割线：

```ts
import { colorLine } from 'a-node-tools';

colorLine(); // 打印一个彩色分割线
colorLine('就是玩'); // 打印一个彩色分割线，中间是文本： “就是玩”
colorLine('就是玩', true); // 打印一个彩色分割线，中间是彩色文本： “就是玩”
colorLine('就是玩', '#f21'); // 打印一个彩色分割线，中间是红色文本： “就是玩”
```

### typewrite

一个简单的打字机效果，用于在终端输入内容

```ts
import { typewrite } from 'a-node-tolls';

await typewrite(
  '伟大的中华人民共和国万岁！\n伟大的中国共产党万岁！\n伟大的中国人民解放军万岁！\n全国各族人民大团结万岁！\n伟大的中国人民万岁！',
);
```

## 使用日志

在引用该包的包内使用该包内的方法时，可以使用启动参数 `a_node_tools_dev=xxx` 来启用部分方法的日志。

`xxx` 可用的值为：

- `"all"`
- `"error"`
- `"warn"`
- `"info"`
- `"true"`
- `"false"`

在使用 `a_node_tools_dev` 参数值为上面的值时，将会覆盖原配置的参数值，甚至是在代码中配置值也将被覆盖。

代码内下面的值配置 `ANodeToolsDevLog.type` 该值将会原配置值，是运行时配置

### npm 源参考

推荐使用 [nry 切换 npm 源](https://www.npmjs.com/package/nry)

- [阿里源](https://developer.aliyun.com/mirror/)
- [腾讯源](https://mirrors.tencent.com/)
- [中科大源](https://mirrors.ustc.edu.cn/)

以下源不支持 npm

- [清华大学源](https://mirrors.tuna.tsinghua.edu.cn/)
- [网易源](https://mirrors.163.com)

## 文档地址

参看 [https://earthnut.dev/npm/a-node-tools/](https://earthnut.dev/npm/a-node-tools/)
