import { isEmptyDir } from './isEmpty';
import { isExist } from './isExist';
import { readFileToJson } from './readFileToJson';
import { readFileToJsonSync } from './readFileToJsonSync';
import { writeJsonFile } from './writeJsonFile';

export {
  readFileToJson,
  readFileToJsonSync,
  isExist as fileExist,
  isEmptyDir,
  writeJsonFile,
};

export default {
  readFileToJson,
  readFileToJsonSync,
  isExist,
  isEmptyDir,
  writeJsonFile,
};
