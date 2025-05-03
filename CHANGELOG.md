# 更新日志

## v3.1.0 （5 🈷️ 3 日 2025 年）

- ✨ 添加了 `typewrite` 打字机效果，但是由于打字机比较古老，所以是异步。调用时，需根据情况保证答应字符的位置的准确性

## v3.0.1 （5 🈷️ 2 日 2025 年）

- 细化 `getNpmPkgInfo` 返回值，可以以 `result.status` 判断请求的真实情况

## v3.0.0 （5 🈷️ 1 日 2025 年）

在尽可能保证兼容的情况下发现 `getNpmPkgInfo` 返回值应当包含详尽的信息

### 🐛 修复已知问题

- 修复了使用 `getNpmPkeInfo` 时的请求超时问题（顺便添加可第三参数用于指定默认的超时设置，默认 5000）
- 修复了 `cursorMoveTop` 和 `cursorMoveDown` 在传入第二参数后没有移动光标位置的问题

## v2.2.2 （4 🈷️ 29 日 2025 年）

- 优化代码逻辑（本来想着 `_p` 可支持多参数打印，后来想想算了。毕竟，目前就我一个人用）

## v2.2.1 （4 🈷️ 27 日 2025 年）

- 修复了 `runOtherCode` 子进程返回值捕捉问题，现在以返回值的 'success' 为子进程执行判断依据

## v2.2.0 （4 🈷️ 24 日 2025 年）

- `cursorCleanAfter` 可通过参数设定是否移动到最左端，然后在清理光标后内容

## v2.1.0 （4 🈷️ 22 日 2025 年）

### 🐛 bug 修复

- 修复不知道哪个版本将 `cursorCleanAfter` 的 `0J` 改成了 `1J`，从清理光标后变成了清理光标前

### ✨ 新增

- 添加了 `cursorLineAfterClear` 清理光标所在行光标位置后的内容
- 添加了 `cursorLineBeforeClear` 清理光标所在行光标位置前的内容
- 添加了 `cursorLineClear` 清理光标所在行的所有内容

## v2.0.3 （4 🈷️ 21 日 2025 年）

- 修复 🐛，在更改 `cursor` 位置时，计算逻辑验证不严谨导致故障

## v2.0.2 （4 🈷️ 21 日 2025 年）

- 修复 🐛 升级 v2 时，调整 `cursor` 的逻辑导致 `cursorCleanAfter` 故障

## v2.0.1 （4 🈷️ 21 日 2025 年）

- 修复引入新的 `@qqi/dev-log` 却没有在打包时排除，导致打包文件变大

## v2.0.0 （4 🈷️ 19 日 2025 年）

- 测试版本转正
- 导入了 `@qqi/dev-log` 在使用 `a_node_tools_dev=xxx` 启动时，开始部分方法的执行 📔

## 2.0.0-next.1 (4 月 16 日 2025 年)

- 维护了文档

## 1.1.1-beta.0 (4 月 13 日 2025 年)

### 新增 ✨

- 使用 `getNpmPkgInfo` 和 `testNpmPackageExist` 函数时，现可传入第二参数，用于指定 `npm` 源

## 1.1.0 (4 月 12 日 2025 年)

### 新增 ✨

- 添加了 `PackageJson` 类型，用于读取 `package.json` 文件的类型

## 1.0.1 (4 月 9 日 2025 年)

- 更新了文档 📄

## 1.0.0 (4 月 6 日 2025 年)

- 替换了 `getNpmPkgInfo` 和 `testNpmPackageExist` 的请求地址，返回值的结构发生了变化，可能不兼容上一版本
- 优化了 `runOtherCode` 方法，现在可以正确地运行其他代码并返回结果

## 0.1.3 (4 月 4 日 2025 年)

- 修复了 `runOtherCode` 的 🀄️ 仅注册 process.exit 触发事件而没有正确移除导致的 `(node:23349) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 41 exit listeners added to [process]. MaxListeners is 40. Use emitter.setMaxListeners() to increase limit
(Use \`node --trace-warnings ...\` to show where the warning was created)` 🙅

## 0.1.2 (3 月 31 日 2025 年)

- 修复了 `runOtherCode` 的日志打印的小 bug

## 0.1.1 (3 月 29 日 2025 年)

- en

## 0.1.0 (3 月 26 日 2025 年)

- 移除了 `color`、`t` 模块
- 优化了 `testNpmPackageExist` 方法，现在可以正确地判断 npm 包的特定版本是否存在

## 0.0.6 (3 月 2 日 2025 年)

- 修复了 `runOtherCode` 方法的错误，现在可以正确地运行其他代码并返回结果

## 0.0.5 (8 月 27 日 2024 年)

- 维护了 `runOtherCode` 的执行，添加参数属性 `printLog`，用于指示是否打印日志信息
- 维护了 `runOtherCode` 的等待提示，现会展示为一个随机跳动提示符

## 0.0.3 (7 月 22 日 2024 年)

- 添加 `dirEmpty` 判断当前文件夹是否为空

## 0.0.2 (7 月 12 日 2024 年)

- [多次调用显示提示](#多次调用显示提示)
- 现在 -p 可打印多种数据而不限于打印字符串

### 多次调用显示提示

```sh
 MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
  11 beforeExit listeners added to [process].
  Use emitter.setMaxListeners() to increase limit
(Use `node --trace-warnings ...` to show where the warning was created)
```

通过使用 `node --trace-warnings` 命令查看出最后报错位置为在 `readInput` 中产生的,现已修复

## 0.0.0 (7 月 12 日 2024 年)

- 热衷于换名字

## 0.0.14 (7 月 10 日 2024 年)

- 大部分时候打印文本需求还是以换行为主，所以，追加第二参数，缺省为 `true` ，即默认换行

## 0.0.13 (7 月 10 日 2024 年)

- 将 `getNpmPkgInfo` 的返回值类型具象化
- 道出了 `npmPkgInfoType` 类型声明

## 0.0.12 (6 月 21 日 2024 年)

- 在 `runOtherCode` 时展示 '请稍等' 时隐藏光标
- 导出 `_p` ，封装 `precess.stdout.write`

## 0.0.10 (6 月 21 日 2024 年)

- 添加 `eslint` 规范代码

## 0.0.8 (6 月 21 日 2024 年)

- 使用 `runOtherCode` 结束🧹 “等待中”

## 0.0.7 (6 月 20 日 2024 年)

- 添加使用 `runOtherCode` “等待中”

## 0.0.7 (6 月 16 日 2024 年)

- 修复 `runOtherCode` 时候打印空行的问题

## 0.0.6 (6 月 14 日 2024 年)

- 将子进程的创建由 `exec` 更改为 `spawn`，这样可以拥有更好的日志输出体验

## 0.0.5 (6 月 11 日 2024 年)

- 修改了 `getNpmPkgInfo` 方法，之前从 npm 抓取的包信息是缓存的，现在是实时的，比较新

## 0.0.3 (6 月 11 日 2024 年)

- 导出遗忘的 `pathDirname`
- 添加 `getDirectoryBy`

## 0.0.2 (6 月 11 日 2024 年)

- 给 `readInput` 添加了持续调用，在同一事件 loop 中，如果非线性事件，避免了同时监听问题
- 维护了导出文件

## 0.0.0 (6 月 4 日 2024 年)

- 整理并迁移了项目

## 0.0.15 （5 月 31 日 2024 年）

- 整理了 `runOtherCode` 的参数

## 0.0.12 （5 月 30 日 2024 年）

- 添加 `isWindows` 判断是否为 windows 环境
- 再次测试在 windows 上的行为

## 0.0.7 （5 月 14 日 2024 年）

- 添加 path 模块
- file 模块添加 `getCallerFilename` 方法以获取调用函数所在的文件

## 0.0.6 （5 月 11 日 2024 年）

- 添加了 jest 测试

## 0.0.1 （4 月 28 日 2024 年）

- 维护了 `readFileToJson` 和 `readFileToJsonSync` 两个读取 JSON 文件的方法，在读取文件前调用 `statSync` 判断文件是否存在
