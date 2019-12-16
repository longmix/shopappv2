
module.exports = {
	//apiHost:"http://skyshop.skymvc.com/",
	apiHost:"https://www.fd175.com/",
	appRoot:"https://www.fd175.com/uniapp/h5/", 
    json_add:function(a,b){
 
        if(a==undefined || a.length==0) return b;
		if(b==undefined || b.length==0) return a;
		
		var s_a=JSON.stringify(a);
		var s_b=JSON.stringify(b);
		var c=s_a.substring(0,s_a.length-1)+","+s_b.substring(1);
		return JSON.parse(c);
	},
	goBack:function(){
		console.log(Router);
		this.$router.go(-1);
	},
	getCookie:function(name){
		// #ifdef H5
		var strcookie = document.cookie;
		var arrcookie = strcookie.split("; ");
		for (var i = 0; i < arrcookie.length; i++) {
			var arr = arrcookie[i].split("=");
			if (arr[0] == name) {
				return arr[1];
			}
		}
		return "";
		// #endif
		
	},
	getAuthCode:function(){
		 
		var authcode=uni.getStorageSync("authcode");
		if(!authcode){
			authcode=this.getCookie("authcode");
		}
		return authcode;
	},
	setAuthCode:function($authcode){
		uni.setStorageSync("authcode",$authcode);
	},
	getAuthCodeLong:function(){
		var authcode=uni.getStorageSync("authcodeLong");
		if(!authcode){
			authcode=this.getCookie("authcodeLong");
		}
		return authcode;
	},
	setAuthCodeLong:function($authcode){
		uni.setStorageSync("authcodeLong",$authcode);
	},
	setOpenid:function(openid){
		uni.setStorageSync("openid",openid)
	},
	getOpenid:function(openid){
		uni.getStorageSync("openid")
	},
	getLoginCode:function(){
		return uni.getStorageSync("loginCode");
	},
	setLoginCode:function(code){
		uni.setStorageSync("loginCode",code)
	},
	getS2cScid:function(){
		return uni.getStorageSync("s2c_scid");
	},
	setS2cScid:function(v){
		uni.setStorageSync("s2c_scid",v);
	},
	fromapp:function(){
		//var $paltform= uni.platform();
		return "uniapp";
	},
	isWeixin:function(){
		// #ifdef H5
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        }
		// #endif
		return false;
	},
	get:function(ops){
		var ops=ops;
		if(ops.data==undefined){
			ops.data={
				authcode:this.getAuthCode(),
				fromapp:this.fromapp(),
				ajax:1
			};
		}else{
			ops.data.authcode=this.getAuthCode();
			ops.data.fromapp=this.fromapp();
			ops.data.ajax=1;
		}
		
		uni.request({
			url:ops.url,
			method:"GET",
			data:ops.data,
			success:function(rs){
				
				if(rs.data.error==1000){
					uni.navigateTo({
						url:"../../pages/login/index"
					})
				}else{
					ops.success(rs.data);
				}
			}
		})
	},
	post:function(ops){
		var callback=callback;
		var ops=ops;
		if(ops.url.indexOf("?") >= 0){
			ops.url+="&ajax=1&authcode="+this.getAuthCode()+"&fromapp="+this.fromapp();
		}else{
			ops.url+="?ajax=1&authcode="+this.getAuthCode()+"&fromapp="+this.fromapp();
		}
		
		uni.request({
			url:ops.url,
			data:ops.data,
			method:"POST",
			header:{
				"content-type":"application/x-www-form-urlencoded"
			},
			success:function(rs){
				if(rs.data.error==1000){
					uni.navigateTo({
						url:"../../pages/login/index"
					})
				}else{
					ops.success(rs.data);
				}
			}	
		})
	},
	goHome:function(){
		uni.redirectTo({
			url:"../index/index"
		})
		/*
		uni.switchTab({
			url:"../index/index",
		})
		*/
	},
	goCart:function(){
		uni.switchTab({
			url:"../cart/index",
		})
	},
	goUser:function(){
		uni.switchTab({
			url:"../user/index",
		})
	},
	goProduct:function(){
		uni.switchTab({
			url:"../product/index",
		})
	},
	goFenlei:function(){
		uni.switchTab({
			url:"../fenlei/index",
		})
	},
	goLogin:function(){
		uni.navigateTo({
			url:"../../pages/login/index"
		})
	},
	goH5WeiXin:function(backurl){
		// #ifdef H5
		var url=document.location.href.split('#')[0]+"#"+backurl;
		window.location=this.apiHost+'/index.php?m=open_weixin&a=Geturl&backurl='+encodeURIComponent(url);
		// #endif
		
	},
	html:function(html){
		if(html==''|| html==null) return '';
		html=html.replace(' style="','  xstyle="');
		html=html.replace(/<img /g,'<img style="max-width:100%;height:auto;"');
		html=html.replace(/&hellip;/g,'');
		html=html.replace(' class="brush:html;toolbar:false"'," ");
		html=html.replace(/<pre /g,'<pre style="border:1px solid #eee;padding:10px;max-height:300px;overflow:auto;" ');
		
		html=html.replace(/<pre /g,"<div ");
		html=html.replace("</pre>","</div>");
		html=html.replace(/\n/g,"<br />");
		html=html.replace(/<iframe /,'<div style="display:none" ');
		html=html.replace(/<\/iframe>/,'</div>');
		html=html.replace("<section ","<div ");
		html=html.replace("</section>","</div>");
		 
		//console.log(html);
		return html;
	},
	set_bd_basic_option : function (apps, that, callback_function) {
		
		console.log('ssssssss',apps)
		
							   
	     uni.request({
	       url: apps.globalData.yanyubao_server_url + '/openapi/BDResourceData/get_option_list',
	       method: 'post',
	       data: {
			   sellerid : apps.globalData.default_sellerid,
	           type_name: 'bd_resource_setting'
	       },
	       header: {
	         'Content-Type': 'application/x-www-form-urlencoded'
	       },
	       success: function (res) {
			 
			
	         var bd_basic_option = res.data.data;
			 console.log('shezhi_yanyubao', bd_basic_option);	
	         
			 apps.globalData.bd_basic_option = bd_basic_option;
				
				
	         //保存到本地
	         var bd_basic_option_str = JSON.stringify(bd_basic_option);
				
	         //缓存返回数据
	         uni.setStorageSync("bd_basic_option_str", bd_basic_option_str);
	         var currentTime = (new Date()).getTime();//获取当前时间
	         uni.setStorageSync("bd_basic_option_str_time", currentTime);
				
	         console.log('保存bd沃克设置选项：' + bd_basic_option_str);
				
	         //刷新界面
	         typeof callback_function == "function" && callback_function(that, bd_basic_option);
			 return true;
				
	       },
	       fail: function (e) {
	         uni.showToast({
	           title: '网络异常！',
	           duration: 2000
	         });
	       },
	     });
	   },
	set_current_openid: function (openid) {
	   if (!openid) {
	     return;
	   }
				   
	   console.log("设置openid：" + openid);
				   
	   //缓存返回数据
	   uni.setStorageSync("current_openid", openid);
	 },
	 get_current_openid: function () {
	   var openid = uni.getStorageSync("current_openid");
	   console.log("获取openid：" + openid);
				   
	   if (!openid) {
	     openid = null;
	   }
				   
	   return openid;
	 },
	set_user_info: function (user_info) {
	   console.log("准备保存用户数据：");
	   console.log(user_info);
				   
	   var user_info_str = JSON.stringify(user_info);
				   
	   //缓存返回数据
	   uni.setStorageSync("wxa_user_info", user_info_str);
				   
	   //console.log('111111111111111111');
	   //console.log(uni.getStorageSync("wxa_user_info"));
	 },
	get_user_info: function () {
	   //缓存返回数据
	   var user_info_str = uni.getStorageSync("wxa_user_info");
				   
	   console.log("获取小程序用户数据：" + user_info_str + '333333333');
				   
	   if (!user_info_str) {
	     return null;
	   }
				   
	   return JSON.parse(user_info_str);
	 },
	del_user_info: function () {
	   //缓存返回数据
	   uni.removeStorageSync("wxa_user_info");
				   
	 },
	 
	   /**
	    * page_type normal/switchTab
	    */
	goto_user_login: function (last_url, page_type){
		var userInfo = this.get_user_info();
		console.log('goto_user_login:');
		console.log(userInfo);
 
		if ((!userInfo) || (!userInfo.userid)) {
		console.log('goto_user_login:222222222222');
 
		uni.showToast({
			title: '请先登录',
			icon: 'none',
			duration: 1000,
			success: function () {
	 
			if (last_url) {
				uni.setStorageSync('last_url', last_url);
				uni.setStorageSync('page_type', page_type);
			}
	 
			uni.redirectTo({
				 url: '/pages/login/index',
			})
	 
			uni.hideToast();
			}
		})
	   return;
	 }; 
   },
	
}
