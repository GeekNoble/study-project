const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const PurgecssPlugin = require('purgecss-webpack-plugin') // 去除多余CSS
const glob = require('glob'); // 文件匹配模式

console.log('process.env.NODE_ENV=', process.env.NODE_ENV) // 打印环境变量

const config = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'js/[name][chunkhash:6].js',
		path: path.join(__dirname, 'dist')  // 输出文件目录
	},
	// devtool: 'source-map',
	module: {
		// noParse: /jquery|lodash/,  // 不需要解析依赖的第三方大型类库等，可以通过这个字段进行配置，以提高构建速度
		rules: [
			
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
    },
		// modules: [path.join(__dirname, 'src'), 'node_modules'],  // 告诉 webpack 优先 src 目录下查找需要解析的文件，会大大节省查找时间
  },

	// 通过配置 cache 缓存生成的 webpack 模块和 chunk，来改善构建速度。 webpack4 为hard-source-webpack-plugin
	cache: {
    type: 'filesystem',
		allowCollectingMemory: true,
  },

	// 这样可以以import方式引入jqery等外部依赖，需要在html引入js链接,节省打包构建
	externals: {
    // jquery: 'jQuery',
		vue: 'Vue'
  },


	plugins: [
		new htmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html'
		}),
		new VueLoaderPlugin(),
			// new PurgecssPlugin({
			// 	paths: glob.sync(`${path.resolve('src')}/**/*`, {nodir: true})
			// }),
	],
	
}
module.exports = config