import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';
import { external } from '@qqi/rollup-external';

export default {
  input: './index.ts',
  output: [
    {
      format: 'es',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      sourcemap: false,
      exports: 'named',
      dir: 'dist/mjs',
    },
    {
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
      sourcemap: false,
      exports: 'named',
      dir: 'dist/cjs',
    },
  ],
  // 配置需要排除的包
  external: external({
    ignore: [
      'node:readline',
      'node:child_process',
      'node:url',
      'node:path',
      'node:https',
      'node:fs',
    ],
  }),
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: './tsconfig.rollup.json',
      exclude: ['node_modules', 'test'],
    }),
    // 去除无用代码
    cleanup(),
    copy({
      targets: [
        { src: 'README.md', dest: 'dist' },
        { src: 'LICENSE', dest: 'dist' },
      ],
    }),
  ],
};
