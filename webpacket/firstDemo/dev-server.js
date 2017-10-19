var WebpackDevServer=require('webpack-dev-server'); 
var webpack=require('webpack'); 
var config=require('./webpack.config'); 
var path=require('path'); 
var compiler=webpack(config); 
var server=new WebpackDevServer(compiler,{//创建服务器实例 
hot:true,//HMR配置 
filename:config.output.filename, 
publicPath:config.output.publicPath,//必填 
stats:{ 
colors:true 
} 
}); 
server.listen(8080,'localhost',function(){});