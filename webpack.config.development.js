/* eslint-disable max-len */
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack'
// eslint-disable-next-line import/no-extraneous-dependencies
import validate from 'webpack-validator'
// eslint-disable-next-line import/no-extraneous-dependencies
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'
import postCSSConfig from './postcss.config'

const port = process.env.PORT || 3000

export default validate(merge(baseConfig, {
  debug: true,

  devtool: 'cheap-module-eval-source-map',

  entry: [
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    'babel-polyfill',
    './app/index'
  ],

  output: {
    publicPath: `http://localhost:${port}/dist/`
  },

  module: {
    loaders: [
      {
        test: /\.global\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
          'postcss-loader',
        ]
      },

      {
        test: /^((?!\.global).)*\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
        ]
      }
    ]
  },
  postcss: postCSSConfig,

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      // Note: Webpack seems to have trouble with certain node depedencies.
      // Disabling gently seems to do the trick.
      // see https://github.com/visionmedia/superagent/wiki/SuperAgent-for-Webpack
      // and https://github.com/felixge/node-formidable/issues/337#issuecomment-153408479
      'global.GENTLY': false
    })
  ],

  target: 'electron-renderer'
}))
