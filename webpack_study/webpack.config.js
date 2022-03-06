const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')  // 样式抽离插件

console.log('process.env.NODE_ENV=', process.env.NODE_ENV) // 打印环境变量

const config = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'dist')  // 输出文件目录
	},
	module: {
		rules: [
			{
				test: /\.[s]?css$/,
				use: [
					// 'style-loader',
					MiniCssExtractPlugin.loader, // 添加 loader
					'css-loader', 
					'postcss-loader', 
					'sass-loader'
				]
			},
			// {
      //   test: /\.(jpe?g|png|gif)$/i,
      //   use:[
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         name: '[name][hash:8].[ext]'
      //       }
      //     }
      //   ]
      // }
			{
				test: /\.(jpe?g|png|gif)$/i,
				type: 'asset',
				generator: {
					filename: '[name][hash:8][ext]'
				},
				parser: {
					dataUrlCondition: {
						maxSize: 20 * 1024  //超过50kb不转 base64
					}
				}
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[hash:8].css'
		}),
		new htmlWebpackPlugin({
			template: './src/index.html'
		}),
		new CleanWebpackPlugin(),
		
	],
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'public')
		}, // 静态文件目录
		compress: true, // 是否启动压缩gzip
		port: 8080
	}
}
module.exports = (env, argv) => {
	console.log('argv.mode=',argv.mode) // 打印 mode(模式) 值
  // 这里可以通过不同的模式修改 config 配置
	return config
}