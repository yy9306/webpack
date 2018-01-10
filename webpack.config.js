const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module:{
    rules: [
      {
        // 用 babel-loader 转换 JavaScript和jsx 文件
        test: /\.(jsx|js)$/,
        // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
        use: ['babel-loader?cacheDirectory'],
        // 表示只对src目录下的文件起作用
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        // minimize告诉css开启压缩
        use: ['style-loader', 'css-loader?minimize']
      }
    ]
  }
}
