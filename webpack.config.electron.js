// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack'
// import path from 'path'
// eslint-disable-next-line import/no-extraneous-dependencies
import validate from 'webpack-validator'
// eslint-disable-next-line import/no-extraneous-dependencies
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'

/*
Todo: figure out why imports in ./desktop/main aren't resolving
*/
export default validate(merge(baseConfig, {
  devtool: 'source-map',

  entry: ['babel-polyfill', './desktop/main.development'],

  output: {
    path: __dirname,
    filename: './desktop/main.js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }
    ),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        // Note: Webpack seems to have trouble with certain node depedencies.
        // Disabling gently seems to do the trick.
        // see https://github.com/visionmedia/superagent/wiki/SuperAgent-for-Webpack
        // and https://github.com/felixge/node-formidable/issues/337#issuecomment-153408479
        'global.GENTLY': false
      }
    })
  ],

  target: 'electron-main',

  node: {
    __dirname: false,
    __filename: false
  },
  // anything we want to ship in app modules
  externals: [
    'font-awesome',
    'source-map-support',
    'serverless'
  ]
}))
