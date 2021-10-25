import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

// import css from 'rollup-plugin-css-only'

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'cjs'
  },
  external: ['react', 'react-dom'],
  plugins: [
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    typescript({
    }),
    postcss({
      extensions: [ '.css' ],
      // plugins: [autoprefixer()],
      // sourceMap: true,
      // extract: true,
      // minimize: true
    }),
    terser() // minifies generated bundles
  //  css({ output: 'bundle.css' })]
  ]
}