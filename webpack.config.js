var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var entry =  {
    // "tree": ['./src/tree/examples/tree.js'],
    // "tree-async": ['./src/tree/examples/tree-async.js'],
    // "treeDemo01": ['./samples/treeDemo01.js']
    //"bh":["./samples/form.jsx"]
    "grid": ["./samples/grid/scripts/main.js"]
};

var output = {
    path: './dist',
    filename: '[name].js'
};

module.exports = {
    entry : entry,
    output : output,

  resolve: {
    extensions: ['', '.js', '.jsx']
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
