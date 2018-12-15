/* eslint-env node */
'use strict';

const path = require('path');
const RuntimeBin = require('lambda-bin');
const targetPath = path.resolve(__dirname, path.join('bin', 'git'));
const minPack = require('./git.json');

exports.prepareGit = (options) => {
  options = options || {};

  var targetDirectory = options.targetDirectory || '/tmp/git';
  var updateEnv = (options.updateEnv !== undefined) ? options.updateEnv : true;

  var GIT_TEMPLATE_DIR = path.join(targetDirectory, 'usr/share/git-core/templates');
  var GIT_EXEC_PATH = path.join(targetDirectory, 'usr/libexec/git-core');
  var LD_LIBRARY_PATH = path.join(targetDirectory, 'usr/lib64');
  var binPath = path.join(targetDirectory, 'usr/bin');

  var lambdaBinRuntime = new RuntimeBin({
    useSymlinks: true,
    targetPath,
    minPack,
  });
  return lambdaBinRuntime.applyMinPack(targetDirectory).then(() => {
    if (updateEnv) {
      process.env.PATH = process.env.PATH + ':' + binPath;
      process.env.GIT_TEMPLATE_DIR = GIT_TEMPLATE_DIR;
      process.env.GIT_EXEC_PATH = GIT_EXEC_PATH;
      process.env.LD_LIBRARY_PATH = process.env.LD_LIBRARY_PATH
        ? process.env.LD_LIBRARY_PATH + ':' + LD_LIBRARY_PATH
        : LD_LIBRARY_PATH;
    } else {
      return {
        binPath: binPath,
        env: {
          GIT_TEMPLATE_DIR: GIT_TEMPLATE_DIR,
          GIT_EXEC_PATH: GIT_EXEC_PATH,
          LD_LIBRARY_PATH: LD_LIBRARY_PATH
        }
      };
    }
  });
};
