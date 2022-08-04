const path = require("path");
// const webpack = require("webpack");
const { merge } = require("webpack-merge"); //这里引入merge
const base = require("./webpack.base.js"); //这里引入公共代码

module.exports = merge(base, {
  //注意这里的写法
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
				test: /\.[s]?css$/,
				use: [
					'style-loader',
					// MiniCssExtractPlugin.loader, // 添加 loader
          'cache-loader',
					'css-loader', 
					'postcss-loader', 
					// 'sass-loader'
				]
			},
    ],
  },
  devServer: {
		static: {
			directory: path.resolve(__dirname, 'public')
		}, // 静态文件目录
		compress: true, // 是否启动压缩gzip
		port: 8080,
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
	},
  // plugins: [new webpack.HotModuleReplacementPlugin()],
});
