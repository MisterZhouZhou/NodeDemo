var path=require('path');// 导入路径包 
module.exports={ 
	entry:[//入口文件 
		'./index.js',  
	], 
	output:{ 
		path:path.resolve(__dirname,'dist'),// 指定打包之后的文件夹 
		filename: '[name].js' // 可以打包为多个文件 
	},
	module:{ // 样式加载器
		loaders: [{
			test: /\.css$/,
			loaders: ['style-loader', 'css-loader']
		}]
	}
}