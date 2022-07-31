const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, './src/main.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].js'
	},
	module: {
		rules: [
			{
				test: /\.[s]?css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.vue/,
				use: [
					'vue-loader'
				]
			}
		]
	},

	devServer: {
		// contentBase: path.resolve(__dirname, './dist'),
		// static: {
		// 	directory: path.resolve(__dirname, 'public')
		// },
		static: './dist',
		port: 8080,
		// publicPath: '/'
	},

	plugins: [
		new htmlWebpackPlugin({
			template: path.resolve(__dirname, './index.html'),
			filename: 'index.html',
			title: 'vue'
		}),
		new VueLoaderPlugin(),
		new CleanWebpackPlugin()
	]
}