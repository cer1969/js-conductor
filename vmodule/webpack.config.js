const webpack = require('webpack');

module.exports = {
    entry: './src/cx.ts',
    target: "web",
    //target: "node", // for Node.js excluyendo node import
    output: {
        path: './out',
        filename: 'cx.min.js',
        library: 'cx',
        //libraryTarget: "var" // Browser
        //libraryTarget: "commonjs2" // Node.js
        libraryTarget: "umd" // Browser and Node.js
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]
}