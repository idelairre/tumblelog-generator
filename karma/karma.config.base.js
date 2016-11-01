var path = require('path');
var CircularDependencyPlugin = require('circular-dependency-plugin');

'use strict';

module.exports = {
  basePath: '../',
  autoWatch: false,
  singleRun: true,
  colors: true,
  frameworks: ['jasmine'],
  browsers: ['Chrome', 'Firefox', 'PhantomJS'],
  plugins: [
    'karma-htmlfile-reporter',
    'karma-jasmine',
    'karma-chrome-launcher',
    'karma-firefox-launcher',
    'karma-phantomjs-launcher',
    'karma-sourcemap-loader',
    'karma-webpack'
  ],
  files: [
    'node_modules/babel-polyfill/dist/polyfill.js',
    './test/index.js'
  ],
  exclude: ['./test/tumblr.spec.js'],
  preprocessors: {
    './test/**/*.js': ['webpack', 'sourcemap']
  },
  webpack: {
    devtool: 'inline-source-map',
    plugins: [
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: true
      })
    ],
    module: {
      preLoaders: [{
        test: /\.json$/,
        loader: 'json-loader'
      }],
      loaders: [{
        test: /\.js$/,
        loader: 'babel?cacheDirectory',
        exclude: /node_modules/
      }]
    },
    modulesDirectories: ['node_modules'],
    resolve: {
      root: path.resolve(__dirname),
      extensions: ['', '.webpack.js', '.web.js', '.js']
    },
    resolveLoader: {
      root: path.resolve('node_modules')
    },
    node: {
      fs: 'empty',
      path: 'empty'
    }
  },
  webpackMiddleware: {
    stats: {
      chunks: false,
      errors: true,
      colors: true,
      modules: false,
      noInfo: true,
      warnings: false
    }
  },
  captureTimeout: 60000,
  browserDisconnectTimeout : 10000,
  browserDisconnectTolerance : 1,
  browserNoActivityTimeout : 60000
}
