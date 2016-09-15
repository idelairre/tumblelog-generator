'use strict';

var path = require('path');
var libraryName = require('../package.json').name;
var outputFile = libraryName + '.js';
var CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: './lib',
    filename: outputFile,
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js']
  },
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
    root: path.resolve('./src'),
    extensions: ['', '.webpack.js', '.web.js', '.js']
  },
  resolveLoader: {
    root: path.resolve('node_modules')
  },
  node: {
    fs: 'empty'
  }
};
