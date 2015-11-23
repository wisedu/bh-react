var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var entry = {};
<<<<<<< HEAD
entry["bh"] = ["./samples/form.jsx"];
//entry["bh"] = ["./index.js"];
=======
entry["button"] = ["./samples/button.jsx"];
>>>>>>> lgh

module.exports = {
  entry: entry,

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].js'
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query:{
        "compact": false,
        "presets": ["react", "es2015", "stage-0", "stage-1", "stage-2", "stage-3"]
      }
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract(
          'style-loader',"css-loader!less-loader"
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
