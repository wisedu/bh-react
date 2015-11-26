var webpack = require('webpack');

module.exports = {
  entry : {
    "tree" : ['./src/tree/examples/tree.js'],
    "tree-async" : ['./src/tree/examples/tree-async.js'],
    "demo01" : ['./src/tree/examples/demo01.js']
  },
  output : {
    //path: './dist/',
    filename: '[name].js'
  },
  module : {
    loaders : [
      {
        test : [/\.js$/, /\.jsx$/],
        loader : ['babel-loader'],
        exclude : /node-modules/,
        query : {
          presets : ['react','es2015']
        }
      },
      {
        test : /\.css$/,
        loaders : ['style', 'css']
      },
      {
        test : /\.less$/,
        loaders : ['style', 'css', 'less-loader']
      },
      {
        test : /\.scss$/,
        loaders : ['style', 'css', 'sass-loader']
      }
    ]
  },
  devtool : 'source-map'
};