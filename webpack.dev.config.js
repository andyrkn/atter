const path = require('path');
var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
	entry: {
		bundle: './main.ts'
	},
	devtool: 'inline-source-map',
	mode: 'development',
	target: 'node',
	node: {
		__dirname: false,
		__filename: false,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(html|css|png|jpg|gif)$/,
				exclude: /node_modules/,
				use: 'raw-loader'
			}
		]
	},
	resolve: {
		plugins: [
			new TsConfigPathsPlugin()
		],
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new LiveReloadPlugin()
	],
	node: {
		fs: "empty"
	}
};
