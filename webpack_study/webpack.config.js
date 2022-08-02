const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')  // 样式抽离插件
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')

const smp = new SpeedMeasurePlugin()
console.log('process.env.NODE_ENV=', process.env.NODE_ENV) // 打印环境变量

const config = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'js/[name][chunkhash:6].js',
		path: path.join(__dirname, 'dist')  // 输出文件目录
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.[s]?css$/,
				use: [
					'vue-style-loader',
					// MiniCssExtractPlugin.loader, // 添加 loader
					'css-loader', 
					'postcss-loader', 
					// 'sass-loader'
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
				// webpack5 新增资源模块(asset module)，允许使用资源文件（字体，图标等）而无需配置额外的 loader。
				test: /\.(jpe?g|png|gif)$/i,
				type: 'asset',
				generator: {
					// 输出文件位置以及文件名
          // [ext] 自带 "." 这个与 url-loader 配置不同
					filename: 'img/[name][hash:8][ext]'
				},
				parser: {
					dataUrlCondition: {
						maxSize: 15 * 1024  //超过15kb不转 base64
					}
				}
			},
			{
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset',
        generator: {
          // 输出文件位置以及文件名
          filename: "[name][hash:8][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 超过100kb不转 base64
          }
        }
      },
			
			{
				test: /\.js$/,
				exclude: file => (
					/node_modules/.test(file) &&
					!/\.vue\.js/.test(file)
				),
				loader: 'babel-loader'
			},
			{
				test: /\.vue/,
				use: [
					'vue-loader'
				]
			},
			// {
			// 	test: /\.js$/i,
			// 	exclude: /node_modules/,
			// 	use: [
			// 		{
			// 			loader: 'babel-loader',
			// 			options: {
			// 				presets: ['@babel/preset-env']
			// 			}
			// 		}
			// 	]
			// },
		]
	},
	resolve: {
    extensions: ['.js','.ts', 'tsx'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash:8].css'
		}),
		new htmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html'
		}),
		new VueLoaderPlugin(),
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