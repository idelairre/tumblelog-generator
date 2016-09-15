var path = require('path');
var CircularDependencyPlugin = require('circular-dependency-plugin');

'use strict';

module.exports = {
  basePath: '../',
  autoWatch: false,
  singleRun: true,
  colors: true,
  frameworks: ['jasmine'],
  browsers: ['Chrome'],
  plugins: ['karma-htmlfile-reporter', 'karma-jasmine', 'karma-chrome-launcher', 'karma-phantomjs-launcher', 'karma-sourcemap-loader', 'karma-webpack'],
  files: ['node_modules/babel-polyfill/dist/polyfill.js', './test/index.spec.js'],
  exclude: ['./test/**/tumblr.spec.js'],
  preprocessors: {
    './test/index.spec.js': ['webpack', 'sourcemap']
  },
  webpack: {
    target: 'node',
    devtool: 'inline-source-map',
    plugins: [
      new CircularDependencyPlugin({
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
      fs: 'empty'
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
  captureTimeout: 60000, // it was already there
  browserDisconnectTimeout : 10000,
  browserDisconnectTolerance : 1,
  browserNoActivityTimeout : 60000,//by default 10000
}
