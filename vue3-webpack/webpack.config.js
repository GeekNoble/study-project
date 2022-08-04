const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
					MiniCssExtractPlugin.loader,
					// 'style-loader',
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
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		}),
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
	]
}