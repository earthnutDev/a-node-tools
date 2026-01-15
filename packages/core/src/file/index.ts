import type {
  GetPackageJsonOption,
  PackageJsonReturn,
} from './getPackageJsonContent';
import { getPackageJson, getPackageJsonSync } from './getPackageJsonContent';
import { isEmptyDir } from './isEmpty';
import { isExist } from './isExist';
import { readFileToJson, readFileToJsonSync } from './readFileToJson';
import {
  writeJsonFile,
  writeJsonFileAsync,
  writeJsonFileSync,
} from './writeJsonFile';

export {
  isExist as fileExist,
  getPackageJson,
  getPackageJsonSync,
  isEmptyDir,
  readFileToJson,
  readFileToJsonSync,
  writeJsonFile,
  writeJsonFileAsync,
  writeJsonFileSync,
};

export default {
  getPackageJson,
  writeJsonFileAsync,
  getPackageJsonSync,
  readFileToJson,
  readFileToJsonSync,
  isExist,
  isEmptyDir,
  writeJsonFile,
  writeJsonFileSync,
};

export type { PackageJsonReturn, GetPackageJsonOption };
