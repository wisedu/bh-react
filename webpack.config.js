var path = require("path");
//module.exports = {
//  entry: './src/entry.js', //演示单入口文件
//  output: {
//    path: path.join(__dirname, 'out'),  //打包输出的路径
//    filename: 'bundle.js',			  //打包后的名字
//    publicPath: "./out/"				//html引用路径，在这里是本地地址。
//  }
//};

module.exports = {
  entry: path.join(__dirname, './list.js'),
  output: {
    path: path.join(__dirname, 'out'),
    publicPath: "./out/",
    filename: '[name].js'
  },
  // 新添加的module属性
  module: {
    loaders: [
      {test: /\.jsx?$/, loader: "babel", query:{ "presets": ["es2015","react"] }},
      {test: /\.css$/, loader: "style!css"},
      {test: /\.(jpg|png)$/, loader: "url?limit=8192"},
      {test: /\.scss$/, loader: "style!css!sass"}
    ]
  }//,
  //devtool: 'source-map'
};
