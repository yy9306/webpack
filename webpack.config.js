const path = require('path')
const extractTextPlugin = require("extract-text-webpack-plugin");
const htmlPlugin= require('html-webpack-plugin');

const website ={
    publicPath:"http://192.168.101.233:1717/"
}
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: website.publicPath
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
        use: extractTextPlugin.extract({
          use: "css-loader"
        })
      },
      {
          test: /\.(htm|html)$/i,
           use:[ 'html-withimg-loader']
      },
      {
        test: /\.(png|gif|jpg|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 200,
            outputPath:'images/',
          }
        }]
      }
    ]
  },
  plugins: [
     new extractTextPlugin("css/index.css"),
     new htmlPlugin({
          minify:{
              removeAttributeQuotes: false
          },
          hash:true,
          template:'./src/index.html'

      })
  ],
  devServer:{
      //设置基本目录结构
      contentBase: path.resolve(__dirname,'dist'),
      //服务器的IP地址，可以使用IP也可以使用localhost
      host:'192.168.101.233',
      //服务端压缩是否开启
      compress:true,
      //配置服务端口号
      port:1717
  }
}
