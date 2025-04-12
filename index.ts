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
} from './src/path/index';

export { readInput } from './src/readInput/readInput';

export { runOtherCode } from './src/run-other-code';

export type { RunOtherCodeParam } from './src/run-other-code/types';

export { getNpmPkgInfo, testNpmPackageExist } from './src/npmPkg';

export type { npmPkgInfoType, PackageJson } from './src/npmPkg';

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
} from './src/cursor.js';

export {
  readFileToJson,
  readFileToJsonSync,
  fileExist,
  writeJsonFile,
  dirEmpty,
} from './src/file';

export { _p } from './src/print';

import { default as file } from './src/file';
export { file };
