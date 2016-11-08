// for babel-plugin-webpack-loaders
// eslint-disable-next-line import/no-extraneous-dependencies
require('babel-register')
const devConfigs = require('./webpack.config.development')
// eslint-disable-next-line import/no-extraneous-dependencies
const validate = require('webpack-validator')

module.exports = validate({
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: devConfigs.module.loaders.slice(1)  // remove babel-loader
  }
})
