var webpack = require('webpack');

module.exports = {
  entry : {
    tree : ['./src/tree/examples/tree.js']
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
          presets : ['es2015','react']
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