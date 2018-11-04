const path = require('path');
var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
var LiveReloadPlugin = require('webpack-livereload-plugin');

const webpackConfig = {
	entry: {
		bundle: './main.ts'
	},
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


function buildConfig(env) {
    if (env === 'dev' || env === 'prod') {
        const customOptions = require(`./webpack.${env}.config`);
        webpackConfig.mode = customOptions.mode;
        webpackConfig.devtool = customOptions.devtool;
        return webpackConfig;
    } else {
        console.log('Wong webpack parameter build. Accepted environments: `dev` or `prod`.');
    }
}


module.exports = buildConfig;