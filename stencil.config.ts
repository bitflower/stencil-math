import { Config } from '@stencil/core';

const { name, distDirs } = require('./package.json');

export const config: Config = {
  namespace: name,
  buildEs5: false,
  taskQueue: 'async',
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  devServer: {
    reloadStrategy: 'hmr',
    openBrowser: false,
  },
  outputTargets: [
    // creates /dist dir
    {
      type: 'dist',
      dir: distDirs.stencil,
      // esmLoaderPath: '../loader',
    },
    // one file in es6
    {
      type: 'dist-custom-elements-bundle',
      dir: distDirs.stencil,
    },
    // creates readme.md for components
    {
      type: 'docs-readme',
      dir: distDirs.stencil,
    },
    // create components(.d.ts|json) into dist
    {
      type: 'docs-json',
      file: `${distDirs.stencil}/components.json`,
    },
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      copy: [{ src: 'serve.json' }],
    },
  ],
};
