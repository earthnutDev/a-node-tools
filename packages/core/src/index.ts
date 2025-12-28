export { isTTY, detectShell } from './isTTY';

export {
  isWindows,
  pathJoin,
  pathBasename,
  pathDirname,
  getCallerFileInfo,
  getCallerFilename,
  initializeFile,
  getDirectoryBy,
} from './path';

export { readInput } from './readInput';

export type { ReadInputParam, ReadInputKey } from './readInput';

export { runOtherCode } from './run-other-code';
export type {
  RunOtherCodeOption as RunOtherCodeParam,
  RunOtherCodeOption,
  RunOtherCodeOptions,
  RunOtherCodeResult,
} from './run-other-code';

export type { RunOtherCodeWaiting, waitingTipsParams } from './waiting';

export {
  waitingTipsPrefixStore,
  waitingTips,
  WaitingTipsResult,
} from './waiting';

export { getNpmPkgInfo, testNpmPackageExist } from './npmPkg';

export type {
  npmPkgInfoType,
  PackageJson,
  getPkgInfoResult,
  npmRegistry,
} from './npmPkg';

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
} from './cursor.js';

export {
  terminalPageOn,
  terminalPageUp,
  terminalScrollScreen,
  terminalScrollBetween,
} from './terminal';

export {
  readFileToJson,
  readFileToJsonSync,
  fileExist,
  writeJsonFile,
  isEmptyDir,
} from './file';

export { _p, colorLine, colorLine as colorDividingLine } from './print';

import { default as file } from './file';

export { file };

export { typewrite } from './typewrite';

export { detectPackageManager } from './detect-package-manager';
