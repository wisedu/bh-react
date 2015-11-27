var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var entry = {};
//entry["bh"] = ["./samples/form.jsx"];
entry["dialog"] = ["./src/dialog/example/dialog.jsx"];
//entry["treeDemo01"] = ["./src/tree/examples/demo01.js"];
//entry["icon"] = ["./samples/icon.jsx"];

module.exports = {
  entry: entry,

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    //path: path.join(process.cwd(), 'dist'),
    filename: '[name].js'
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query:{
        "compact": false,
        "presets": ["react", "es2015", "stage-0"]
      }
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
          'style-loader',"css-loader!sass-loader"
      )
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
          'style-loader', 'css-loader'
      )
    }]
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  devtool: 'source-map'
};