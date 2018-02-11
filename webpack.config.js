const path = require('path')
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader",
          options: {
            loaders: {
              css:  ExtractTextPlugin.extract({
                use: 'css-loader'
              }),
              sass: ExtractTextPlugin.extract({
                use: ["css-loader", "sass-loader"]
              })
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "postcss-loader"]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "postcss-loader", "sass-loader"]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            name: 'images/[name].[hash:8].[etx]'  //加hash值防止缓存
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:8].[etx]'  //将字体放入fonts文件夹下
          }
        }]
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        include: [path.resolve(__dirname, 'src')]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: "css/style.css"
    }),
    new HtmlWebpackPlugin({
      filename: 'index1.html',  // 生成的html文件名称
      template: 'index.html'
    })
  ]
}
