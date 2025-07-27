export { isTTY } from './src/isTTY';

export {
  isWindows,
  pathJoin,
  pathBasename,
  pathDirname,
  getCallerFileInfo,
  getCallerFilename,
  initializeFile,
  getDirectoryBy,
} from './src/path/';

export { readInput } from './src/readInput/';

export type { ReadInputParam, ReadInputKey } from './src/readInput';

export { runOtherCode } from './src/run-other-code';
export type {
  RunOtherCodeOption as RunOtherCodeParam,
  RunOtherCodeOption,
  RunOtherCodeOptions,
  RunOtherCodeResult,
} from './src/run-other-code';

export type { RunOtherCodeWaiting, waitingTipsParams } from './src/waiting';

export {
  waitingTipsPrefixStore,
  waitingTips,
  WaitingTipsResult,
} from './src/waiting';

export { getNpmPkgInfo, testNpmPackageExist } from './src/npmPkg';

export type {
  npmPkgInfoType,
  PackageJson,
  getPkgInfoResult,
  npmRegistry,
} from './src/npmPkg';

export {
  __p,
  cursorAfterClear,
  cursorHide,
  cursorShow,
  cursorGetPosition,
  cursorMoveUp,
  cursorMoveDown,
  cursorMoveLeft,
  cursorMoveRight,
  cursorLineAfterClear,
  cursorLineBeforeClear,
  cursorLineClear,
  cursorPositionSave,
  cursorPositionUndo,
  cursorMoveTo,
} from './src/cursor.js';

export {
  terminalPageOn,
  terminalPageUp,
  terminalScrollScreen,
  terminalScrollBetween,
} from './src/terminal';

export {
  readFileToJson,
  readFileToJsonSync,
  fileExist,
  writeJsonFile,
  isEmptyDir,
} from './src/file/';

export { _p, colorLine, colorLine as colorDividingLine } from './src/print';

import { default as file } from './src/file/';

export { file };

export { dog as ANodeToolsDevLog } from './src/dog';

export { typewrite } from './src/typewrite';

export { detectPackageManager } from './src/detect-package-manager';
