var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var entry = {};
//entry["bh"] = ["./samples/form.jsx"];
entry["alertModal"] = ["./samples/alertModal.jsx"];
entry["treeDemo01"] = ["./src/tree/examples/demo01.js"];
//entry["icon"] = ["./samples/icon.jsx"];

module.exports = {
  entry : entry,
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