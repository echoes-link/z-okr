const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
/**
 *
 * 先安装对应的types包： `npm i @types/webpack -D`
 *
 @type {import('webpack').Configuration}
 */

module.exports = {
  mode: 'development',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  devServer: {
    hot: true,
    port: 9000,
    compress: true,
    open: true
  },
  // loader
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // loader从下往上依次执行
      {
        test: /\.(css|scss)$/,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          'sass-loader'
        ]
      },
      // 图片
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        loader: 'file-loader'
      },
      // 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'z-okr',
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ]
}