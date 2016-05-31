const webpack = require('webpack');

module.exports = {
    entry: './src/cx.ts',
    output: {
        path: './out',
        filename: 'cx.min.js',
        libraryTarget: "commonjs2"
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