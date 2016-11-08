// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack'
// eslint-disable-next-line import/no-extraneous-dependencies
import validate from 'webpack-validator'
// eslint-disable-next-line import/no-extraneous-dependencies
import ExtractTextPlugin from 'extract-text-webpack-plugin'
// eslint-disable-next-line import/no-extraneous-dependencies
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'
import postCSSConfig from './postcss.config'

const config = validate(merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  entry: [
    'babel-polyfill',
    './app/index'
  ],

  output: {
    publicPath: '../dist/'
  },

  module: {
    loaders: [
      {
        test: /\.global\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader',
          'postcss-loader',
        )
      },

      {
        test: /^((?!\.global).)*\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
        )
      }
    ]
  },
  postcss: postCSSConfig,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      // Note: Webpack seems to have trouble with certain node depedencies.
      // Disabling gently seems to do the trick.
      // see https://github.com/visionmedia/superagent/wiki/SuperAgent-for-Webpack
      // and https://github.com/felixge/node-formidable/issues/337#issuecomment-153408479
      'global.GENTLY': false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],

  target: 'electron-renderer'
}))

export default config
