/* eslint-env node */
'use strict';

const path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, 'index.js')
  ],
  output: {
    path: path.join(__dirname, 'nodejs', 'node_modules', 'lambda-layer-git'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  target: 'node',
};
