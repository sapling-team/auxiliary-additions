var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var env = process.env.NODE_ENV;
var filename = '';
var filePath = __dirname.replace('/configs','');
var plugins = [];
if (env === 'dev'){
  filename = 'auxiliary.js'
  plugins.length = 0;
};
if (env === 'product') {
  filename = 'auxiliary.min.js'
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress:{
      warnings:false
    }
  }));
};
var config = {
  entry:'./src/index.js',
  output:{
    path:path.resolve(filePath + '/build'),
    filename:filename,
    library: 'Auxiliary',
    libraryTarget: 'umd'
  },
  devtool:'source-map',
  module:{
    loaders:[
      {
        test:/\.js$/,
        loader:'eslint-loader',
        exclude:/(node_modules)/
      }
    ]
  },
  plugins:plugins
};
module.exports = config;
