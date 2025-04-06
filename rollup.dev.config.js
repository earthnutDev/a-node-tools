import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';

const temporaryArr = ['node:', 'a-', 'color-pen'];

/** 生成  npm 文件的打包配置文件 */
export default {
  input: './eg/index.ts',
  output: [
    {
      format: 'es',
      entryFileNames: '[name].mjs',
      preserveModules: false,
      sourcemap: false,
      exports: 'named',
      dir: '.eg/',
    },
  ],
  // 配置需要排除的包
  external: id => new RegExp('^'.concat(temporaryArr.join('|^'))).test(id),
  plugins: [
    resolve(),
    commonjs(),
    // 可打包 json 内容
    json(),
    typescript({}),
    // 去除无用代码
    cleanup(),
  ],
};
