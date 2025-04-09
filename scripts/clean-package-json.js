// 因为先执行的 `npm run b` 进行 rollup 打包，所以 `dist` 一定存在
import {
  pathJoin,
  readFileToJsonSync,
  getDirectoryBy,
  writeJsonFile,
} from '../dist/mjs/index.mjs';

const packageJson = readFileToJsonSync('./package.json');

const deleteKeys = ['scripts', 'devDependencies', 'lint-staged', 'private'];

deleteKeys.forEach(key => {
  delete packageJson[key];
});

const distPath = getDirectoryBy('dist', 'directory');

const distPackagePath = pathJoin(distPath, './dist/package.json');

writeJsonFile(distPackagePath, packageJson);
