const webpack = require('webpack');

module.exports = {
	entry: './src/cx.ts',
	target: "web",  // node: para excluir node_modules
	output: {
		path: './out',
		filename: 'cx.min.js',
		library: 'cx',
		libraryTarget: "umd"  // umd: Browser and Node; var: Browser; commonjs2: Node
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
