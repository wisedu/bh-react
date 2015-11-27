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
        loader : ['babel'],
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
        test : /\.scss$/,
        loaders : ['style', 'css', 'sass']
      }
    ]
  },
  devtool : 'source-map'
};