import { default as file } from './file';

export { detectShell, isTTY } from './isTTY';

export {
  getCallerFileInfo,
  getCallerFilename,
  getDirectoryBy,
  initializeFile,
  isWindows,
  pathBasename,
  pathDirname,
  pathJoin,
} from './path';

export { readInput } from './readInput';

export type { ReadInputKey, ReadInputParam } from './readInput';

export { runOtherCode } from './run-other-code';
export type {
  RunOtherCodeOption,
  RunOtherCodeOptions,
  RunOtherCodeOption as RunOtherCodeParam,
  RunOtherCodeResult,
} from './run-other-code';

export type { RunOtherCodeWaiting, waitingTipsParams } from './waiting';

export {
  waitingTips,
  waitingTipsPrefixStore,
  WaitingTipsResult,
} from './waiting';

export { getNpmPkgInfo, testNpmPackageExist } from './npmPkg';

export type {
  getPkgInfoResult,
  npmPkgInfoType,
  npmRegistry,
  PackageJson,
} from './npmPkg';

export {
  __p,
  cursorAfterClear,
  cursorGetPosition,
  cursorHide,
  cursorLineAfterClear,
  cursorLineBeforeClear,
  cursorLineClear,
  cursorMoveDown,
  cursorMoveLeft,
  cursorMoveRight,
  cursorMoveTo,
  cursorMoveUp,
  cursorPositionSave,
  cursorPositionUndo,
  cursorShow,
} from './cursor.js';

export {
  terminalPageOn,
  terminalPageUp,
  terminalScrollBetween,
  terminalScrollScreen,
} from './terminal';

export {
  fileExist,
  getPackageJson,
  getPackageJsonSync,
  isEmptyDir,
  readFileToJson,
  readFileToJsonSync,
  writeJsonFile,
  writeJsonFileAsync,
  writeJsonFileSync,
} from './file';

export type { GetPackageJsonOption, PackageJsonReturn } from './file';

export { _p, colorLine as colorDividingLine, colorLine } from './print';

export { typewrite } from './typewrite';

export { detectPackageManager, isWorkSpace } from './detect-package-manager';

export { file };
