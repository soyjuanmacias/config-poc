const path = require('path');

const resolve = (aPath) => path.resolve(process.cwd(), aPath);
const isProd = () => process.env.NODE_ENV === 'production';
const envFiles = {
  prod: 'config/env/.env',
  dev: 'config/env/.env.dev',
};
module.exports = {
  resolve,
  isProd,
  envFiles,
};
