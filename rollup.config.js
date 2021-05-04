import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: 'src/index.ts',
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      postcss({
        extensions: ['.css'],
      }),
      typescript({
        typescript: require('typescript'),
      }),
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' },
      {
        file: 'docs/src/reactComponentLib/index.js',
        format: 'es',
        banner: '/* eslint-disable */',
      },
    ],
  },
];
