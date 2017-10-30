/**
 * Created by zhouwei on 2017/10/19.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
      admin: './admin/index.js',
      consumer: './consumer/index.js'
  },
  output: {
      path: path.join(__dirname,'dist'),
      publicPath: '/dist/',   // 内存中的目录位置
      filename: '[name].bundle.js'
  },
    module: {
      loaders: [
        { test: /images/, loader: 'file-loader'},
        { test: /icons/, loader: 'url-loader'},
        { test: /\.scss$/, loaders: ['style-loader','css-loader','sass-loader']},
        { test: /\.css$/, loaders: ['style-loader','css-loader']}
      ]
    },
    plugins: [

    ],
};

