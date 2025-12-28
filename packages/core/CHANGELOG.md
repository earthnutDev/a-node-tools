# 更新日志

## v4.3.0 (2025-12-29)

- 依赖维护

## v4.2.20 (2025-8-12)

- 添加了 `detectShell` 检测当前的 shell 执行 shell 环境

## v4.2.19 (2025-7-28)

- 添加了检测当前的启动命令的包管理器方法 `detectPackageManager`

## v4.2.18 (2025-7-27)

- 更新文档

## v4.2.17 (2025-7-27)

- 更新文档

## v4.2.17-test.0 (2025-7-24)

- 么事

## v4.2.16 (2025-7-19)

- 么事

## v4.2.15 (2025-7-15)

### 🐛 修复

修复致命问题，该问题导致 `runOtherCode` 正常退出时 `isSIGINT` 值被设置为 `true`

## v4.2.14 (2025-7-15)

### 🐛 修复

修复上一个版本中，将函数转变为类时值错误导致 `waitingTips` 的超时提示直接显示

## v4.2.13 (2025-7-14)

### ✨ 添加

- 使用 `waitingTips` 时可通过参数设定是否可以通过 `Ctrl` + `C` 或是 `Ctrl` + `D` 直接退出。但是默认值为 `false`，且双击 `ESC` 键退出不可配置（反人类设计之恶心别人取悦自己）。
- 作为使用 `waitingTips` 作为辅助等待的工具，`runOtherCode` 也将会支持配置使用 `Ctrl` + `C` 或是 `Ctrl` + `D` 直接退出。

### 🐛 修复

- 使用 `runOtherCode` 时使用意外退出键（ `Ctrl` + `C` 、 `Ctrl` + `D` 、 `Esc` + `Esc`） 时，都被认为是 `SIGINT` 意外退出信号，返回值的 `isSIGINT` 值都将获得 `true`，返回状态为 4。

### 🚀 优化

- 现在使用 `runOtherCode` 的时候，使用 `waiting` 作为参数的属性时，可传入另一个 “实例化” 的 `waitingTips` 作为参数，这样就可以单独使用或配置该执行的等待提示

```ts
import { waitingTips, runOtherCode, _p } from 'a-node-tools';

// 单独使用 `waitingTips` 时，默认时运行
const waiting = waitingTips();

const result = await runOtherCode({
  code: 'npm run build',
  printLog: true,
  waiting,
});

if (result.isSIGINT) {
  _p('用户主动要求退出');
}
```

## v4.2.12 (2025-6-21)

- 调整了 `runOtherCode` 的 `shell` 值不同时的执行代码的注入方式，避免了使用时当 `shell` 值为 `true` （目前缺省值就是 true ） 时出现的

## v4.2.11 (2025-6-21)

- 调整了 `runOtherCode` 的 `cwd` 的解析方式，使用绝对路径时，不再向前追加当前执行目录，而当传入的执行目录不可用时，将使用默认的当前执行的目录

## v4.2.10 (2025-6-21)

- 么事，更着玩

## v4.2.9 (2025-6-17)

- 优化了 `runOtherCode` 在双击 `Esc` 时能够正确退出，但是在 'windows' 上未做测试

## v4.2.8 (2025-6-16)

- 么事，更着玩

## v4.2.7 (2025-6-15)

- `waitingTips` 在自身清理时可使用 `beforeDestroyed` 执行清理（需要来自于 `runOtherCode`）
- `runOtherCode` 现可执行清理

## v4.2.6 (2025-6-10)

- 么事，更着玩

## v4.2.5 (2025-6-4)

更改了 `runOtherCode` 的默认打印行为，由原来的默认打印更新为默认不打印。影响较大，但暂时不涉及非本开发者包依赖，此次更改不涉及大版本更新，仅以修订号进行更新

## v4.2.4 (2025-6-3)

- 修复 `readInput` 的监听事件（该事件是测试时随手写上的，忘了注释或删除），导致在多次调用该函数后，导致的多次监听的警告

```text
 MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 end listeners added to [ReadStream]. MaxListeners is 10. Use emitter.setMaxListeners() to increase limit
```

## v4.2.3 (2025-6-2)

- 添加了一个可有可无的 `colorLine` 用户绘制一条彩色的分割线
- `waitingTips` 现在在统一实例后续调用 `run` 时，总是期待公用已有的配置项

## v4.2.2 （6 🈷️ 1 日 2025 年）

- 将 `waitingTips` 的等待时间从默认的 20s 提高到 40s，也可以通过给 `timeout` 重新赋值调整该值（每次调整将初始化运行开始时间）
- 运行中的 `waitingTips` 现可通过 `run` 直接重新赋值，而不是先调用 `destroyed` 终止上一个运行状态。多次调用 `destroyed` 没有副作用。

## v4.2.1 （5 🈷️ 26 日 2025 年）

- 为 `readInput` 添加 `remove` 的方法，可手动从外部移除已添加到等待输入列表的终端输入监听
- 为 `waitingTips` 添加了双击 `ESC` 键退出的功能，防止在部分时候未调用 `destroyed` 导致的进程无法退出

## v4.2.0 （5 🈷️ 24 日 2025 年）

- 将 `runOtherCode` 中的等待提示拿出来做了一个单独的功能 `waitingTips`

## v4.1.2 （5 🈷️ 19 日 2025 年）

- 优化 `readInput` 类型，且不再提供返回值（使用 `emitKeypressEvents` 使得使用 `Ctrl + c` 和 `Ctrl + d` 不再退出输入状态，该返回值已没有太大意义）

## v4.1.1 （5 🈷️ 18 日 2025 年）

好像是没什么毛病，大不了再版之

## v4.1.1-beta.0 （5 🈷️ 18 日 2025 年）

更改了 `readInput` 的监听输入的方式，自己先在 [a-command](https://www.npmjs.com/package/a-command) 测试一下

## v4.1.0 （5 🈷️ 14 日 2025 年）

### 新增可用 ✨

- `cursorPositionSave` 光标位置保存
- `cursorPositionUndo` 恢复最后一次（可能受自行使用 `\e7` 的影响 ）使用 `cursorPositionSave` 保存的光标的位置
- `cursorMoveTo` 光标位置移动到目标（可用）位置
- `terminalPageUp` 终端整页向上滚动
- `terminalPageOn` 终端整页下翻
- `terminalScrollScreen` 全屏滚动
- `terminalScrollBetween` 设定终端可滚动范围

## v4.0.1 （5 🈷️ 14 日 2025 年）

- 添加了两个 `runOtherCode` 等待时的前缀样式。
- `runOtherCode` 返回值添加了 `isSIGINT` 属性，用于判读是否由 `SIGINT` 信号触发的中断
- `readInput` 调整了返回格式，为了向后更好的兼容，将返回的异步布尔值改为了异步的对象

## v4.0.0 （5 🈷️ 13 日 2025 年）

又是 `runOtherCode` 的问题，但这次称不上是问题，而是 `runOtherCode` 明明只是一个方法，凭什么要在接受 `Ctrl` + `C` 触发 `SIGINT` 信号时执行退出程序而不是退出当前的执行，这就很不合理。现在在新一个版本中，接收到中止信号不再退出成功，而是通过 `process.on("SIGINT")` 捕捉到该动作，然后交于调用方（用户）自己决定该如何处理 `Ctrl` + `C`。

但，这就将导致原版本的不兼容。。。。

### 💥💥 重大更新

该更新肯能造成版本的不兼容。

1. `runOtherCode` 在 `Ctrl` + `C` 后仅结束当前的子进程，不关闭主进程
2. `readInput` 在 `Ctrl` + `C` 后仅退出出入模式，不再直接关闭进程，需自行根据返回值 `Promise<boolean>` 判断
