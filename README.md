# a node tools

[![version](<https://img.shields.io/npm/v/a-node-tools.svg?logo=npm&logoColor=rgb(0,0,0)&label=版本号&labelColor=rgb(73,73,228)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/a-node-tools) [![Coverage Status](<https://img.shields.io/coverallsCoverage/github/earthnutDev/a-node-tools?logo=coveralls&label=coveralls&labelColor=rgb(12, 244, 39)&color=rgb(0,0,0)>)](https://coveralls.io/github/earthnutDev/a-node-tools?branch=main) [![codecov](<https://img.shields.io/codecov/c/github/earthnutDev/a-node-tools/main?logo=codecov&label=codecov&labelColor=rgb(7, 245, 245)&color=rgb(0,0,0)>)](https://codecov.io/gh/earthnutDev/a-node-tools) [![issues 提交](<https://img.shields.io/badge/issues-提交-rgb(255,0,63)?logo=github>)](https://github.com/earthnutDev/a-node-tools/issues)

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

## `npmPkg` 模块

- `npmPkgInfoType` `getNpmPkgInfo` 返回的类型之一
- `getNpmPkgInfo` 获取 npm 包信息
- `testNpmPackageExist` 测试包是否可下载存在

现可通过第二参数指定 npm registry 源

可接受参数

```ts

```

各源 [![测试情况](https://raw.githubusercontent.com/earthnutDev/a-node-tools/HEAD/media/测试源情况.png)](https://github.com/earthnutDev/a-node-tools/HEAD/media/测试源情况.png)

## path 模块

- `pathJoin` 文件地址拼接
- `pathBasename` 给出文件路径获取文件名，不带文件类型后缀
- `initializeFile` 初始化路径 `__filename` 和 `__dirname` ，因为这两个仅能在 `cjs` 文件下使用，使用这里做了初始化，兼容
- `getCallerFilename` 获取调用函数的文件路径
- `isWindows` 当前是否为 windows 环境，用于在使用 `path` 时分隔符不同产生的差异
- `getDirectoryBy` 根据目标的文件或文件名来找到存在该目标的父级目录

### cursor 部分

你可以使用 cursor 进行对光标位置进行操控：

|          方法           |         示意         |                       参数                       |
| :---------------------: | :------------------: | :----------------------------------------------: |
|          `_p`           | 在 node 环境下的打印 | `r` 打印的文本; `lineFeed` 是否换行，缺省为 true |
|      `cursorHide`       |       光标隐藏       |                        --                        |
|      `cursorShow`       |       光标展示       |                        --                        |
|  `cursorPositionSave`   |     储存光标位置     |                        --                        |
| `cursorPositionRestore` |     恢复光标位置     |                        --                        |
|     `cursorMoveUp`      |       光标上移       |       `numberOfUpwardMoves` 偏移量，缺省 1       |
|    `cursorMoveDown`     |       光标下移       |        `numberOfMovesDown` 偏移量，缺省 1        |
|    `cursorMoveLeft`     |       光标左移       |       `numberOfLeftShifts` 偏移量，缺省 1        |
|    `cursorMoveRight`    |       光标右移       |       `numberOfRightShifts` 偏移量，缺省 1       |
|   `cursorAfterClear`    |     光标后内容🧹     |                        --                        |

### readInput 部分

等待用户输入的一个函数。因为要等待，所以是异步的，使用的时候应当使用 `await`

例：

```js
import { readInput } from "a-node-tools";

const callBackFunction = (keyValue: string | undefined, key:any)
=> {
    if(key.name && key.name == 'return')
        return true;
    else return  console.log(`换一个键试试，这个键（${keyValue}）不执行退出`);
};
```

## 文档地址

参看 [https://earthnut.dev/a-node-tools/](https://earthnut.dev/a-node-tools/)
