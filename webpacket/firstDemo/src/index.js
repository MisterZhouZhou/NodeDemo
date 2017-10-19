var app = document.getElementById('app');
app.innerHTML = "hi";

if(module.hot){
	//启用热重载 
	module.hot.accept();
}