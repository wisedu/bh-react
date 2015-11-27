module.exports = {
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
            },
            {
                test : /\.scss$/,
                loaders : ['style', 'css', 'sass']
            }
        ]
    },
    devtool : 'source-map'
};