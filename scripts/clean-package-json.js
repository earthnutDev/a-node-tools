// 因为先执行的 `npm run b` 进行 rollup 打包，所以 `dist` 一定存在
import { pathJoin, readFileToJsonSync } from '../dist/mjs/index.mjs';
import { writeFileSync } from 'node:fs';

const packageJson = readFileToJsonSync('./package.json');

delete packageJson.scripts;
delete packageJson.devDependencies;
delete packageJson['lint-staged'];

// eslint-disable-next-line no-undef
const distPath = pathJoin(process.cwd(), './dist/package.json');

writeFileSync(distPath, JSON.stringify(packageJson, null, 2));
