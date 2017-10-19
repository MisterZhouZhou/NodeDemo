var path=require('path');// 导入路径包 
var webpack=require('webpack'); 
module.exports={ 
entry:[//入口文件 
	'./src/index.js', 
	'webpack/hot/dev-server',//调用热重载 hot 
	'webpack-dev-server/client?http://localhost:8080'//添加webpack-dev-server客户端 
], 
plugins:[ 
  new webpack.HotModuleReplacementPlugin()//全局开启热代码替换 
], 
output:{ 
	path:path.join(__dirname,'dist'),// 指定打包之后的文件夹 
	publicPath:'/dist/',// 指定资源文件引用的目录 
	filename:'bundle.js'// 指定打包为一个文件 bundle.js 
} 
}