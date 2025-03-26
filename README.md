# a node tools

A purely functional tool that includes

[![version](<https://img.shields.io/npm/v/a-node-tools.svg?logo=npm&logoColor=rgb(0,0,0)&label=version&labelColor=rgb(73,73,228)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/a-node-tools) [![NPM Last Update](<https://img.shields.io/npm/last-update/a-node-tools?logo=npm&labelColor=rgb(255,36,63)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/a-node-tools) [![📦 size](<https://img.shields.io/bundlephobia/minzip/a-node-tools.svg?logo=npm&labelColor=rgb(201,158,140)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/a-node-tools) [![downloads](<https://img.shields.io/npm/dm/a-node-tools.svg?logo=npm&logoColor=rgb(0,0,0)&labelColor=rgb(194,112,210)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/a-node-tools) [![downloads](<https://img.shields.io/npm/dt/a-node-tools.svg?logo=npm&labelColor=rgb(107,187,124)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/a-node-tools)

[![last commit](<https://img.shields.io/github/last-commit/earthnutDev/a-node-tools.svg?logo=github&logoColor=rgb(0,0,0)&labelColor=rgb(255,165,0)&color=rgb(0,0,0)>)](https://github.com/earthnutDev/a-node-tools) [![GitHub commit activity](<https://img.shields.io/github/commit-activity/y/earthnutDev/a-node-tools.svg?logo=github&labelColor=rgb(128,0,128)&color=rgb(0,0,0)>)](https://github.com/earthnutDev/a-node-tools) [![Coverage Status](<https://img.shields.io/coverallsCoverage/github/earthnutDev/a-node-tools?logo=coveralls&label=coveralls&labelColor=rgb(12, 244, 39)&color=rgb(0,0,0)>)](https://coveralls.io/github/earthnutDev/a-node-tools?branch=main) [![codecov](<https://img.shields.io/codecov/c/github/earthnutDev/a-node-tools/main?logo=codecov&label=codecov&labelColor=rgb(7, 245, 245)&color=rgb(0,0,0)>)](https://codecov.io/gh/earthnutDev/a-node-tools)

---

[![🇨🇳 中文](<https://img.shields.io/badge/🇨🇳-中_%20_文-rgb(0,0,0)>)](https://github.com/earthnutDev/a-node-tools/blob/main/README-zh.md) ![🌍 English](<https://img.shields.io/badge/🌍-English-rgb(0,0,0)?style=social>) [![👀 change log](<https://img.shields.io/badge/👀-change_%20_log-rgb(0,125,206)?logo=github>)](https://github.com/earthnutDev/a-node-tools/blob/main/CHANGELOG-en.md) [![submit 🙋‍♂️ issue](<https://img.shields.io/badge/☣️-submit_%20_issue-rgb(255,0,63)?logo=github>)](https://github.com/earthnutDev/a-node-tools/issues)

---

## use

### `file`

- `readFileToJson` read `.json` file and return JSON or `null`
- `readFileToJsonSync` synchronous read `.json` file and return `JSON` or `null`
- `fileExist` Does the file exist
- `dirEmpty` Does the director is empty
- `writeJsonFile` 把 `json` Write data to a blank file

### `runOtherCode` section

- `runOtherCode` Run other code
- `RunOtherCodeParam` Declaration of parameter types for running other code

### `npmPkg` section

- `npmPkgInfoType` type of `getNpmPkgInfo` returns
- `getNpmPkgInfo` get npm package info
- `testNpmPackageExist` test a npm package is exist

### `path` section

- `pathJoin` File address concatenation
- `pathBasename` Provide file path to obtain file name, without file type suffix
- `initializeFile` Initialize the paths `__filename` and `__dirname` , as they can only be used in the `cjs` file. They are initialized here and are compatible
- `getCallerFilename` Get the file that calls the function
- `isWindows` Is it currently in a Windows environment, used to address the differences caused by different time separators when using 'path'
- - `getDirectoryBy` Find the parent directory of the target based on its file or file name

#### cursor section

You can use cursor to manipulate the cursor position:

|         Method          |          Schematic          |                      Parameters                       |
| :---------------------: | :-------------------------: | :---------------------------------------------------: |
|          `_p`           | on `node` environment print | `r` print string; `lineFeed` line feed,default `true` |
|      `cursorHide`       |         cursor hide         |                          --                           |
|      `cursorShow`       |         cursor show         |                          --                           |
|  `cursorPositionSave`   |    Store cursor position    |                          --                           |
| `cursorPositionRestore` |  Restores cursor position   |                          --                           |
|     `cursorMoveUp`      |          cursor Up          |      `numberOfUpwardMoves` offset, default to 1       |
|    `cursorMoveDown`     |         cursor Down         |       `numberOfMovesDown` offset, default to 1        |
|    `cursorMoveLeft`     |         cursor Left         |       `numberOfLeftShifts` offset, default to 1       |
|    `cursorMoveRight`    |        cursor Right         |      `numberOfRightShifts` offset, default to 1       |
|   `cursorAfterClear`    |   clear all after cursor    |                          --                           |

### readInput section

## A function waiting for user input. Because it needs to wait, it is asynchronous, and when using it, `wait` should be used

```js
import { readInput } from "a-node-tools";

const callBackFunction = (keyValue: string | undefined, key: any) => {
  if (key.name && key.name == "return") return true;
  else
    return console.log(
      `Try a different key, this key (${keyValue}) do not execute exit`
    );
};
```
