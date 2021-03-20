const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  publicPath: './',
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin(),
      new CleanWebpackPlugin()
    ],
    module: {
    },
    // externals: {
    //   vue: 'Vue',
    //   'vue-router': 'VueRouter',
    //   vuex: 'Vuex',
    //   'ant-design-vue': 'antd',
    //   moment: 'moment'
    // },
    //   optimization: {
    //     splitChunks: {
    //       chunks: 'all',
    //       minSize: 30000,
    //       minChunks: 1,
    //       maxAsyncRequests: 5,
    //       maxInitialRequests: 3,
    //       automaticNameDelimiter: '~',
    //       name: true,
    //       cacheGroups: {
    //         vendors: {
    //           test: /[\\/]node_modules[\\/]/,
    //           priority: -10
    //         },
    //         default: {
    //           minChunks: 2,
    //           priority: -20,
    //           reuseExistingChunk: true
    //         }
    //       }
    //     },
    //     minimize: true,
    //     // minimizer: [
    //     //   new TerserPlugin({
    //     //     parallel: true
    //     //   })
    //     // ]
    //   }
    // }
  }
}
