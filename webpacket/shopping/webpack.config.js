var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: {
  	admin: './admin/index.js',
  	consumer: './consumer/index.js',
  },
  output: {
  	path: path.join(__dirname,'dist'),
  	publicPath: '/dist/',
  	filename: '[name].bundle.js'
  }
};

/*

	plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ],
  // 压缩打包，会使编译变慢
*/