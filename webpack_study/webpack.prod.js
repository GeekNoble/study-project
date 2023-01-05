const { merge } = require("webpack-merge");
const path = require("path");
const base = require("./webpack.base.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // css压缩
const TerserPlugin = require("terser-webpack-plugin"); // js压缩

const webpack = require('webpack');

module.exports = merge(base, {
  mode: "production",
  // devtool: "none",
  output: {
    filename: "js/[name][chunkhash:6].js", // 输出文件名
    path: path.join(__dirname, "dist"), // 输出文件目录
    pathinfo: false,
    // publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.[s]?css$/,
        use: [
          // 'vue-style-loader',
          MiniCssExtractPlugin.loader, // 添加 loader
          "cache-loader",
          "css-loader",
          "postcss-loader",
          // 'sass-loader'
        ],
      },
      {
        test: /\.js$/i,
        // include: resolve('src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader', // 开启多进程打包
            options: {
              worker: 3,
            }
          },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 启用缓存
            },
          },
        ],
      },
    ],
  },
  optimization: {
    // moduleIds: 'deterministic',   // 保证 vendor hash 不发生变化
    // runtimeChunk: "single",
    minimize: true,
    minimizer: [
      // 添加 css 压缩配置
      new OptimizeCssAssetsPlugin({}),
      new TerserPlugin({
        extractComments: false //不将注释提取到单独的文件中, 即 LICENSE.txt
      }),
    ],
    splitChunks: {
      cacheGroups: {
        // 配置提取模块的方案
        default: false,

        // 将所有入口css文件合成一个chunk，优先级需比element,antdesign高，否则element,antdesign会打包出单独的css
        // styles: {
        //   name: "styles",
        //   test: /\.(s?css|less|sass)$/,
        //   chunks: "all",
        //   enforce: true,
        //   priority: 2,
        // },
        // common: {
        //   name: "chunk-common",
        //   chunks: "initial",
        //   minChunks: 1,
        //   // maxSize: 200000,
        //   priority: 10,
        //   // test: function(module, chunk) {
        //   //   return module.resource && module.resource.includes('vue')
        //   //   // console.log(module.resource)
        //   // },
        //   test: /[\\/]node_modules[\\/]_?vue(.*)/,
        //   enforce: true,
        //   reuseExistingChunk: true,
        // },
        // 提取elementui
        element: {
          chunks: 'all',
          name: `element-ui`,
          test: /[\\/]element-plus[\\/]/,
          priority: 3,
        },
        // 提取ant-desgin
        antDesign: {
          chunks: 'all',
          name: 'ant-desgin',
          test: /[\\/]ant-design-vue[\\/]/,
          priority: 3
        },
        photoPreview: {
          chunks: 'all',
          name: 'photo-preview',
          test: /[\\/]vue3-photo-preview[\\/]/,
          priority: 3
        }
        // vue: {
        //   chunks: 'all',
        //   name: 'vue',
        //   test: /[\\/]vue[\\/]/,
        //   priority: 3
        // },
        // vendors: {
        //   name: "chunk-vendors",
        //   test: /[\\/]node_modules[\\/]/,
        //   chunks: "all",
        //   priority: 2,
          
        //   enforce: true,
        //   reuseExistingChunk: true,
        // },
        // ... 根据不同项目再细化拆分内容
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].css",
    }),

    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
    new CleanWebpackPlugin(), //删除dist目录下的文件
    // new BundleAnalyzerPlugin({ analyzerPort: 8090 }),
  ],
});
