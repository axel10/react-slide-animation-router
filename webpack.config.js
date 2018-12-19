/*
* @ author wanliyunyan
*/

const devOpts = require('./build/webpack.dev')

const webpackConfig = {
  development: devOpts,
};

function buildConfig(env) {
  return webpackConfig[env]({ env });
}

// 获取运行环境
const env = process.argv.slice(-1)[0];
module.exports = buildConfig(env);
