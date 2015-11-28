
var entry =  {
    "tree": ['./src/tree/examples/tree.js'],
    "tree-async": ['./src/tree/examples/tree-async.js'],
    "treeDemo01": ['./samples/treeDemo01.js']
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
    module : {
        loaders : [
            {
                test : [/\.js$/, /\.jsx$/],
                loader : ['babel'],
                exclude : /node-modules/,
                query : {
                    presets : ['react','es2015', "stage-0"]
                }
            },
            {
                test : /\.css$/,
                loaders : ['style', 'css']
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test : /\.scss$/,
                loaders : ['style', 'css', 'sass']
            }
        ]
    },
    devtool : 'source-map'
};