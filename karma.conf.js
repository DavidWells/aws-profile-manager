var webpack = require('webpack');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'node_modules/babel-core/browser-polyfill.js',
      './js/**/__tests__/*.js'
    ],
    exclude: [
      'node_modules/**.*.js',
    ],
    preprocessors: {
      './js/**/*.js': ['webpack'],
      './test/**/*.js': ['webpack']
    },

    webpack: {
      resolve: {
        extensions: ['', '.js', '.jsx']
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          }
        ]
      },
      plugins: []
    },

    webpackMiddleware: {
      quiet: true,
      noInfo: true
    },

    reporters: ['notify', 'mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    //browsers: ['PhantomJS', 'Chrome'],
    browsers: ['Chrome'],
    singleRun: false,

    mochaReporter: {
      output: 'autowatch'
    },

    plugins: [
      'karma-mocha',
      'karma-webpack',
      'karma-babel-preprocessor',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-mocha-reporter',
      'karma-notify-reporter'
    ]
  });
};
