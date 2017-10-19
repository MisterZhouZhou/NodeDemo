window.onload = function(){
	(function(){
		var blog = {
			/*公共变量*/
			toTop : document.getElementsByClassName("toTop")[0],
			/*初始化*/
			init : function(){
				this.wechat();
				this.winScroll();
				this.goTop();
			},
			/*微信扫描二维码显示或隐藏*/
			wechat : function(){
				var oSpan = document.getElementsByClassName("feeds")[0].getElementsByTagName("span")[0];
				var oImg = document.getElementsByClassName("feeds")[0].getElementsByTagName("img")[0];
				//鼠标滑进，显示二维码
				oSpan.onmouseover = function(){
					oImg.style.display = "block";
				};
				//鼠标滑出，隐藏二维码
				oSpan.onmouseout = function(){
					oImg.style.display = "none";
				};
			},
			/*屏幕滚动*/
			winScroll : function(){
				var oAdvert = document.getElementsByClassName("advert")[0];
				var	oAd = document.getElementsByClassName("ad")[0];
				//浏览器滑动过程中执行
				window.onscroll = function(){
					//广告跳转
					if(window.pageYOffset>oAdvert.offsetHeight){
						oAd.className = "ad on";
					}else{
						oAd.className = "ad";
					}
					//返回顶部按钮显示或隐藏
					if(window.pageYOffset>120){
						blog.toTop.style.display = "block";
					}else{
						blog.toTop.style.display = "none";
					}
				}
			},
			/*点击返回顶部*/
			goTop : function(){
				blog.toTop.onclick = function(){
					document.body.scrollTop = document.documentElement.scrollTop = 0;
				}
			}
		}
		blog.init();
		//console提示
		console.log("欢迎广大WEB前端开发爱好者来一起交流技术（个人QQ：1047832475）");
		console.log("联系注明来自博客console");
	})();
	
}