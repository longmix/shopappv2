

const abotRequest = (params) => {
  uni.request({
    url: params.url,
    method: params.method || 'POST',
    data: params.data || {},
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    success(res) {
      console.log('HTTP Request to ' + params.url);
      console.log('with data ', params.data);
      console.log('get result', res);

      if (params.success) {
        params.success(res);
      }
    },
    fail(res) {
      if (params.fail) {
        params.fail(res);
      }
    },
    complete(res) {
      if (params.complete) {
        params.complete(res);
      }
    },
  });
};

module.exports = {
	abotRequest,
	
	globalData:{
		weiduke_server_url: 'https://cms.weiduke.com/',
		yanyubao_server_url: 'https://yanyubao.tseo.cn/',
		o2owaimai_server_url: 'https://app.tseo.cn/o2owaimai/index.php/',
		socket_server: 'https://socketio.tseo.cn',
		
		// o2owaimai_server_url: 'https://yanyubao.tseo.cn/hahading/index.php/',
		
		
		// xiaochengxu_appid: 'wx60a801e5fb7f9378',
		xiaochengxu_appid: 'wx00d1e2843c3b3f77',
		
		
		// default_sellerid : 'fyJSPaVja',
		// default_sellerid : 'pQNNmSkaq',	
		
		// default_sellerid: 'fSNQPajka',
		
		//哈哈订
		// default_sellerid: 'fimmUPUPV',
		// default_copyright_text:'哈哈订信息科技 版权所有',
		
		//腾羽生物
		default_sellerid: 'fSNQPajka',
		default_copyright_text:'腾羽生物科技 版权所有',
		
		//其他配置选项
		//首页显示附近商家的数量，如果为0则不显示
		default_shang_list_count_in_front_page:10,
		navigationBarBackgroundColor_fixed:1,
		
		
		
		is_shop_cart_in_tabbar: 0,
		
		baidu_map_ak: 'OTsGerqQhowGSFOWG8c6p86R',
		userInfo: {},
	},
	

	current_chat_gui:"",
	current_chat_page:"", 		
	current_chat_handle: "",
	
	
		
	socketMsgHandle: function (current_chat_gui, current_chat_page, msg) {
	   //缓存返回数据
	   console.log('current_chat_gui',current_chat_gui)
		  console.log('current_chat_page',current_chat_page)
		  if(current_chat_gui ){		  
			  if(current_chat_page=='/pages/msg/msg'){
				  
				  current_chat_gui.getLastMsg();
				  
			  }	 else if (current_chat_page=='/pages/msg/chat/chat'){
				  
				  current_chat_gui.getNewMsg(msg);
				  
			  } else if (current_chat_page=='/pages/friendInfo/friendList'){
					
				  if(msg.chat_type == 2 || msg.chat_type == 6){
					  
					  current_chat_gui.getFriendList(msg);
				  }				  
				  
			  }
				  
		  }	
		  
	 },
	 
	 
	/**
	* 坐标转换，百度地图坐标转换成腾讯地图坐标
	* lng 腾讯经度（pointy）
	* lat 腾讯纬度（pointx）
	* 经度>纬度
	*/
	bMapToQQMap:function (lng, lat) {
	
	    if (lng == null || lng == '' || lat == null || lat == '')
	        return [lng, lat];
	
	    var x_pi = 3.14159265358979324;
	    var x = parseFloat(lng) - 0.0065;
	    var y = parseFloat(lat) - 0.006;
	    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
	    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
	    var lng = (z * Math.cos(theta)).toFixed(7);
	    var lat = (z * Math.sin(theta)).toFixed(7);
	
	    return [lng, lat];
	
	},
	
	/**
	* 坐标转换，腾讯地图转换成百度地图坐标
	* lng 腾讯经度（pointy）
	* lat 腾讯纬度（pointx）
	* 经度>纬度
	*/
	
	qqMapToBMap:function(lng, lat) {
	
	    if (lng == null || lng == '' || lat == null || lat == '')
	        return [lng, lat];
	
	    var x_pi = 3.14159265358979324;
	    var x = parseFloat(lng);
	    var y = parseFloat(lat);
	    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
	    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
	    var lng = (z * Math.cos(theta) + 0.0065).toFixed(5);
	    var lat = (z * Math.sin(theta) + 0.006).toFixed(5);
	    return [lng, lat];
	
	},

	set_current_weiduke_token: function (weiduke_token) {
	    if (!weiduke_token) {
			return;
	    }
	
	    console.log("设置weiduke_token：" + weiduke_token);
	
	    //缓存返回数据
	    uni.setStorageSync("current_weiduke_token", weiduke_token);
	},

	get_current_weiduke_token: function () {
	    var weiduke_token = uni.getStorageSync("current_weiduke_token");
	    console.log("获取weiduke_token：" + weiduke_token);
	
	    if (!weiduke_token) {
			weiduke_token = null;
	    }
	
	    return weiduke_token;
	},	
	//获取经纬度（国测局坐标）
	get_location: function (that, call_back_get_shang_list='') {

		var that002 = this; 
		
		console.log('123456789 get_location');
		
		var coordinate = uni.getStorageSync('coordinate_array');
		if(coordinate){
			console.log('get_location in cache =====>>>>', coordinate);
			
			typeof call_back_get_shang_list == "function" && call_back_get_shang_list(that, coordinate);
			return;
		}
		
	    uni.getLocation({			
	        type: 'gcj02',  // 国测局坐标
			//type: 'wgs84',   // GPS坐标 
	        success: function (res) {
				console.log('res123456',res);
				
				//var res2 = that002.qqMapToBMap(res.longitude,res.latitude);		
				//coordinate['longitude'] = res2[0];
				//coordinate['latitude'] = res2[1];
				
				coordinate['longitude'] = res.longitude;
				coordinate['latitude'] = res.latitude;
				
				uni.setStorageSync("coordinate_array", coordinate);
				
				typeof call_back_get_shang_list == "function" && call_back_get_shang_list(that, coordinate);
				
				return;
				
	        },
			fail:function(res){
				console.log('uni.getLocation fail ====>>>>', res);
				
				var coordinate = [];
				coordinate['latitude'] = 31.293216;
				coordinate['longitude'] = 121.662945;
				
				console.log('set virtual coordinate ====>>>>>', coordinate);
				
				typeof call_back_get_shang_list == "function" && call_back_get_shang_list(that, coordinate);
				
				return;
				
			},
			complete:function(res){
				console.log('uni.getLocation complete ====>>>>', res);
			}
			
	    });
		
		return;
	},
	
	toRad: function (d) {
	    return d * Math.PI / 180;
	},
	 
	getDisance: function (lat1, lng1, lat2, lng2) {
		
		var dis = 0;
		var radLat1 = this.toRad(lat1);
		var radLat2 = this.toRad(lat2);
		var deltaLat = radLat1 - radLat2;
		var deltaLng = this.toRad(lng1) - this.toRad(lng2);
		
		var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) *
		Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2),
		2)));
		return dis * 6378137;
	},
	
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
	
	
	
	
	
	onLaunch02: function () {   
	    var that = this;
	    //调用API从本地缓存中获取数据
	    var logs = uni.getStorageSync('logs') || []
	    logs.unshift(Date.now())
	    uni.setStorageSync('logs', logs);    
	    
	
	    uni.getSystemInfo({
			success(res) {
				console.log(res.model)
				console.log(res.pixelRatio)
				console.log(res.windowWidth)
				console.log(res.windowHeight)
				console.log(res.language)
				console.log(res.version)
				console.log(res.platform)
				uni.setStorageSync('systemInfo', res)
				var ww = res.windowWidth;
				var hh = res.windowHeight;
				that.globalData.ww = ww;
				that.globalData.hh = hh;
			}
	    })
	
	    console.log('ttttttttttttt3');
	   
	    let extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {}
	
	    this.globalData.xiaochengxu_appid = extConfig.xiaochengxu_appid;
		
		console.log('ttttt444',extConfig)
	
	    //强制设置当前的appid
	    
	    // const accountInfo = uni.getAccountInfoSync();
	    
	    // if (accountInfo && accountInfo.miniProgram && accountInfo.miniProgram.appId) {
	    //   this.globalData.xiaochengxu_appid = accountInfo.miniProgram.appId;
	    // }
	    
	    console.log('当前小程序为：' + this.globalData.xiaochengxu_appid);
	
	
	    this.globalData.force_sellerid = 0;
	
	    if (extConfig.force_sellerid_flag == 1) {
			this.globalData.force_sellerid = 1;
			this.globalData.default_sellerid = extConfig.force_sellerid_value;
	    }
	
	    if (extConfig.shop_name){
			console.log("444444", extConfig.shop_name)
			this.globalData.shop_name = extConfig.shop_name;
	
	      uni.setNavigationBarTitle({
				title: this.globalData.shop_name
	      })
	
	    }
	    if (extConfig.version_number) {
			this.globalData.version_number = extConfig.version_number;
	    }
	
	    // if (extConfig.navigationBarBackgroundColor_fixed) {
			this.globalData.navigationBarBackgroundColor_fixed = extConfig.navigationBarBackgroundColor_fixed;
	    // }
	
	    if (extConfig.kefu_telephone) {
			this.globalData.kefu_telephone = extConfig.kefu_telephone;
	    }
	    if (extConfig.kefu_qq) {
			this.globalData.kefu_qq = extConfig.kefu_qq;
	    }
	    if (extConfig.kefu_qq) {
			this.globalData.kefu_qq = extConfig.kefu_qq;
	    }
	    if (extConfig.kefu_website) {
			this.globalData.kefu_website = extConfig.kefu_website;
	    }
	    if (extConfig.kefu_gongzhonghao) {
			this.globalData.kefu_gongzhonghao = extConfig.kefu_gongzhonghao;
	    }
	
	    if (extConfig.is_ziliaoku_app) {
			this.globalData.is_ziliaoku_app = extConfig.is_ziliaoku_app;
	    }
	    if (extConfig.is_o2o_app) {
			this.globalData.is_o2o_app = extConfig.is_o2o_app;
	    }
	
	    //从服务器上获取信息
	    //this.get_shop_info_from_server(null);
	
	    //请求服务器，并根据服务器返回，做不同的页面显示
	    //this.set_option_list_str(this, null);
	
	
	
	},
	get_xianmaishang_setting_list: function (callback_function) {
		var that = this;
		console.log('111111111111111 get_xianmaishang_setting_list')
	
	    var xianmaishang_setting_list = uni.getStorageSync("get_xianmaishang_setting_list_str_" + this.globalData.default_sellerid);
		var user_console_setting = uni.getStorageSync("user_console_setting_str_" + this.globalData.default_sellerid);
	
	    if (xianmaishang_setting_list) {
	      
			//刷新界面
			typeof callback_function == "function" && callback_function(user_console_setting,xianmaishang_setting_list);
			return;
	    }
	
	    uni.request({
			url: that.globalData.yanyubao_server_url + 'openapi/XianmaiShangData/get_setting_list',
			method: 'post',
			data: {
				sellerid: that.globalData.default_sellerid
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: function (res) {
				
				console.log('sssssss',res);
				if (res.data.code == 1) {
					var xianmaishang_setting_list = res.data.data;
					var user_console_setting = res.data.user_console_setting;
	
					uni.setStorageSync('get_xianmaishang_setting_list_str_' + that.globalData.default_sellerid, xianmaishang_setting_list);
					uni.setStorageSync('user_console_setting_str_' + that.globalData.default_sellerid, user_console_setting);
	
	
	
					if (callback_function) {
						typeof callback_function == "function" && callback_function(user_console_setting,xianmaishang_setting_list);
					}
		// 			uni.setStorage({
		// 				key: 'get_xianmaishang_setting_list_str_' + that.globalData.default_sellerid,
		// 				data: xianmaishang_setting_list,
		// 				success: function (res) {
		// 					console.log('异步保存成功');
		
		// 					if (callback_function) {
		// 						typeof callback_function == "function" && callback_function(xianmaishang_setting_list);
		// 					}
		// 				}
		// 			})
	          
				}
			},
			fail: function (e) {
				uni.showToast({
					title: '网络异常！',
					duration: 2000
				});
			},
	    });
	},
	
	get_shop_info_from_server: function (callback_function) {
		var that = this;
		console.log('111111111111111 get_shop_info_from_server')
	
	    var shop_list = uni.getStorageSync("shop_info_from_server_str_" + this.globalData.default_sellerid);
	
	    if (shop_list) {
	      
			//刷新界面
			typeof callback_function == "function" && callback_function(shop_list);
			return;
	    }
	
	    uni.request({
			url: that.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_shop_info',
			method: 'post',
			data: {
				sellerid: that.globalData.default_sellerid
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: function (res) {
				if (res.data.code == 1) {
					var shop_list = res.data.data;
					that.globalData.shop_name = shop_list.shop_name;
	
					uni.setStorage({
						key: 'shop_info_from_server_str_' + that.globalData.default_sellerid,
						data: shop_list,
						success: function (res) {
							console.log('异步保存成功');
		
							if (callback_function) {
								typeof callback_function == "function" && callback_function(shop_list);
							}	
						}
					})
	          
				}
			},
			fail: function (e) {
				uni.showToast({
					title: '网络异常！',
					duration: 2000
				});
			},
	    });
	},
	
	
	
	
	set_option_list_str : function (that, callback_function) {
		
		var currentTime = (new Date()).getTime();//获取当前时间
				
		if (uni.getStorageSync("option_list_str") && (currentTime - uni.getStorageSync("option_list_str_time")) < 3600 * 1000) {
		  
			var option_list = JSON.parse(uni.getStorageSync("option_list_str"))
				
			this.globalData.option_list = option_list;
			console.log(' this.globalData.option_list===========', this.globalData.option_list)
			//刷新界面
			typeof callback_function == "function" && callback_function(that, option_list);
				
		} else {
				
				
			var that002 = this;
				
			uni.request({
				url: this.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_shop_option',
				method: 'post',
				data: {
					sellerid: this.globalData.default_sellerid
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: function (res) {
					var option_list = res.data.option_list;
				
					that002.globalData.option_list = option_list;
				
				
					//保存到本地
					var option_list_str = JSON.stringify(option_list);
				
					//缓存返回数据
					uni.setStorageSync("option_list_str", option_list_str);
					var currentTime = (new Date()).getTime();//获取当前时间
					uni.setStorageSync("option_list_str_time", currentTime);
				
					console.log('保存商城选项：' + option_list_str);
				
					//刷新界面
					typeof callback_function == "function" && callback_function(that, option_list);
				
				},
				fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
				},
			});
		}
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
	 
	set_user_account_info: function (user_account_info) {
		console.log("准备保存用户账号数据：");
		console.log(user_account_info);
				   
		var user_account_info_str = JSON.stringify(user_account_info);
				   
		//缓存返回数据
		uni.setStorageSync("user_account_info", user_account_info_str);
				   
	}, 
	

	get_user_account_info: function () {
	   //缓存返回数据
	   var user_account_info_str = uni.getStorageSync("user_account_info");
				   
	   console.log("获取用户账号数据：" + user_account_info_str + '333333333');
				   
	   if (!user_account_info_str) {
	     return null;
	   }
				   
	   return JSON.parse(user_account_info_str);
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
			
					uni.navigateTo({
						 url: '/pages/login/login',
					})
			
					uni.hideToast();
				}
			})
			return;
		}; 
	},
	
	
	getUserInfo: function (cb) {
	    var that = this
	    if (this.globalData.userInfo) {
			typeof cb == "function" && cb(this.globalData.userInfo)
	    } else {
			//读取缓存中的userid checkstr openid
			that.globalData.userInfo = that.get_user_info();
			console.log('当前登录信息：');
			console.log(that.globalData.userInfo);
	
			typeof cb == "function" && cb(that.globalData.userInfo);
	
	    }
	},
	
	
	
	
	check_user_login: function () {
		var user_info_str = uni.getStorageSync("wxa_user_info");
	    console.log("获取小程序用户数据：" + user_info_str);
	    if (user_info_str) {
			var user_info = JSON.parse(user_info_str);
			if (user_info) {
				if (user_info.userid > 0) {
					return;
				}
			}
	    }
		
		    //如果userid等于0,则提示绑定手机号
		    console.log("需要用户登录");
		    uni.navigateTo({
		      url: '/pages/login/login'
		    });
		
		    return true;
	},
	
	
	set_current_parentid: function(parentid){
	    if(!parentid){
			return;
	    }
	
	    console.log("设置parentid：" + parentid);
	
	    //缓存返回数据
		uni.setStorageSync("current_parentid", parentid);
	},
	
	
	
	get_current_parentid: function(){
	    var parentid = uni.getStorageSync("current_parentid");
	    console.log("获取parentid：" + parentid);
	
		if(!parentid){
			parentid = 0;
	    }
	
	    return parentid;
	},
	
	set_sellerid: function (sellerid) {
	    console.log("设置sellerid：" + sellerid);
	
	    //缓存返回数据
	    uni.setStorageSync("current_sellerid", sellerid);
	},
	
	get_sellerid: function () {
	    if (this.globalData.force_sellerid == 1){
			return this.globalData.default_sellerid
	    }
	    //缓存返回数据
	    var sellerid = uni.getStorageSync("current_sellerid");
	
	    console.log("获取sellerid：" + sellerid);
	
	    if ((sellerid == null) || (sellerid.length == 0)) {
			var that = this
			sellerid = that.globalData.default_sellerid;
			console.log("0000000000000000000获取sellerid不成功，使用默认sellerid：" + that.globalData.default_sellerid + ' ==>>  ' + sellerid);
	    }
	
	    return sellerid;
	},
	
	
	
	
	
	getColor:function(){
		//从本地读取
	    var option_list_str = uni.getStorageSync("option_list_str");
	
	    console.log("获取商城选项数据====：" + option_list_str + '333333333');
	
	    if (!option_list_str) {
			//return null;
	
			uni.showToast({
				title: '数据更新中……',
				icon:'loading'
			});
	
			//this.set_option_list_str(this, this.getColor);
	
			return;
	    }
	    
	    
	    var option_list =  JSON.parse(option_list_str);
	
	    this.globalData.option_list = option_list;
	
	    console.log('oplist-----', option_list.wxa_shop_nav_bg_color);
	
	    //console.log('111111111111111111111111111111::' + this.globalData.navigationBarBackgroundColor_fixed);
	
	    if (this.globalData.navigationBarBackgroundColor_fixed != 1){
	
			if (option_list && option_list.wxa_shop_nav_font_color && option_list.wxa_shop_nav_bg_color) {
				uni.setNavigationBarColor({
					frontColor: option_list.wxa_shop_nav_font_color,
					backgroundColor: option_list.wxa_shop_nav_bg_color,
	
					// animation: {
					//   duration: 40,
					//   timingFunc: 'easeIn'
					// }
				});
			}
	    }
	
	    
	    return option_list.wxa_shop_nav_bg_color;
	    /*uni.setTabBarStyle({
	      color: '#858585',
	      selectedColor: option_list.wxa_shop_nav_font_color,
	      backgroundColor: '#ffffff',
	      borderStyle: 'white'
	    })*/
	  
	},
	
	
	
	getFaquanSetting: function (that, callback_function) {
		var currentTime = (new Date()).getTime();//获取当前时间
	
		if (uni.getStorageSync("cms_faquan_setting") && (currentTime - uni.getStorageSync("cms_faquan_setting_time")) < 3600 * 1000) {
	
			var cms_faquan_setting = JSON.parse(uni.getStorageSync("cms_faquan_setting"))
	
			//this.globalData.cms_faquan_setting = cms_faquan_setting;
			console.log(' this.globalData.option_list===========', this.globalData.cms_faquan_setting)
			//刷新界面
			typeof callback_function == "function" && callback_function(that, cms_faquan_setting);
	
			return;
	    } 
	
	    var that002 = this;
	
	    uni.request({
			url: this.globalData.yanyubao_server_url + 'openapi/FaquanData/get_faquan_setting',
			method: 'post',
			data: {
				sellerid: this.globalData.default_sellerid
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: function (res) {
				var cms_faquan_setting = res.data.data;
				//保存到本地
				var cms_faquan_setting_str = JSON.stringify(cms_faquan_setting);
		
				//缓存返回数据
				uni.setStorageSync("cms_faquan_setting", cms_faquan_setting_str);
				var currentTime = (new Date()).getTime();//获取当前时间
				uni.setStorageSync("cms_faquan_setting_time", currentTime);
		
				console.log('保存乖乖兽选项：' + cms_faquan_setting_str);
		
				//刷新界面
				typeof callback_function == "function" && callback_function(that, cms_faquan_setting);
		
			},
			fail: function (e) {
				uni.showToast({
					title: '网络异常！',
					duration: 2000
				});
			},
	    });
	
	},

	
	
	
	set_o2o_basic_data_option_str: function (that, callback_function) {
	
	    var currentTime = (new Date()).getTime();//获取当前时间
	
	    console.log('uni.getStorageSync("o2o_basic_data_option_str")', uni.getStorageSync("o2o_basic_data_option_str"),'88888')
	    if (uni.getStorageSync("o2o_basic_data_option_str") && (currentTime - uni.getStorageSync("o2o_basic_data_option_str_time")) < 3600 * 1000) {
	
			var o2o_basic_data_option = JSON.parse(uni.getStorageSync("o2o_basic_data_option_str"))
	
			this.globalData.o2o_basic_data_option = o2o_basic_data_option;
			console.log(' this.globalData.o2o_basic_data_option===========', this.globalData.o2o_basic_data_option)
			//刷新界面
			typeof callback_function == "function" && callback_function(that, o2o_basic_data_option);
	
	    } else {
			var that002 = this;
	
			uni.request({
				url: this.globalData.yanyubao_server_url + '/openapi/O2OAddressData/get_basic_data_option',
				method: 'post',
				data: {
					sellerid: this.globalData.default_sellerid
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: function (res) {
					var o2o_basic_data_option = res.data;
		
					that002.globalData.o2o_basic_data_option = o2o_basic_data_option;
		
		
					//保存到本地
					var o2o_basic_data_option_str = JSON.stringify(o2o_basic_data_option);
		
					//缓存返回数据
					uni.setStorageSync("o2o_basic_data_option_str", o2o_basic_data_option_str);
					var currentTime = (new Date()).getTime();//获取当前时间
					uni.setStorageSync("o2o_basic_data_option_str_time", currentTime);
		
					console.log('保存商城选项：' + o2o_basic_data_option_str);
		
					//刷新界面
					typeof callback_function == "function" && callback_function(that, o2o_basic_data_option);
		
				},
				fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
				},
			});
		}
	},
	
	
	httpPost: function (url, data, cbSuccess, cbError) {
	    console.log('准备请求网址：：：：' + url);
		console.log(data);
	
	    //发起网络请求
	    uni.request({
			url: url,
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: "POST",
			data: data,
			success: function (request_res) {
				console.log('请求成功，返回内容如下：：：：');
				console.log(request_res);
	
				typeof cbSuccess == "function" && cbSuccess(request_res);
			},
			fail: function (request_res) {
				console.log('请求失败，返回内容如下：：：：');
				console.log(request_res);
				typeof cbError == "function" && cbError(request_res);
			},
			complete: function () {
				console.log('请求完成' + url);
			}
	    })
	
	},
	
	
	
	
	
			//调用H5browser打开网页
    call_h5browser_or_other_goto_url: function (url, var_list=null, ret_page='') {
		console.log('call_h5browser_or_other_goto_url : url && var_list :'+url);
		console.log(var_list);
   
		if (url.indexOf("%ensellerid%") != -1) {
			url = url.replace('%ensellerid%', this.get_sellerid());
		}
   
		if (url.indexOf("%wxa_appid%") != -1) {
			url = url.replace('%wxa_appid%', this.globalData.xiaochengxu_appid);
		}
   
		if (url.indexOf("%wxa_openid%") != -1) {
			url = url.replace('%wxa_openid%', this.get_current_openid());
		}
		
		if(url.indexOf("%oneclicklogin%") != -1){
			var userInfo = this.get_user_info();
			if(!userInfo){
				
				this.goto_user_login('/pages/tabBar/home/home', 'switchTab');
				
				return;
			}
			
			console.log('call_h5browser_or_other_goto_url ===>>>获取oneclicklogin 的值 ');
			
			var that = this;
			
			uni.request({
				url: this.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=one_click_login_str',
				method: 'post',
				data: {
				  sellerid: this.get_sellerid(),
				  checkstr: userInfo.checkstr,
				  userid: userInfo.userid
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},		
				success: function (res) {
				  //--init data        
				  var code = res.data.code;
				  if (code == 1) {
					var oneclicklogin = res.data.oneclicklogin;
					
					url = url.replace('%oneclicklogin%', oneclicklogin);
		
					that.call_h5browser_or_other_goto_url(url, var_list, ret_page);
				  }
				},
				fail: function (res) {
		
				}
			 });
		
			 return;
		}
			
   
		//判断各种跳转条件
		if (url.indexOf('switchTab') == 0) {
			console.log('qqqe12345678906541321121212');
			var arr = url.split(" ");
			if (arr.length >= 2) {
				var new_url = arr[1];
				uni.switchTab({
					url: new_url,
				})
			}
		}
		else if (url.indexOf('navigateTo') == 0) {
			
			var arr = url.split(" ");
			if (arr.length >= 2) {
				var new_url = arr[1];
				uni.navigateTo({
					url: new_url
				})
			}
		}
		else if (url == '/pages/index/index' || url == '/pages/category/index' || url == '/pages/cart/cart' || url == '/pages/user/user') {
			
			uni.switchTab({
				url: url,
			})
		} else if (url == '/pages/help_detail/help_detail') {
			console.log('qqqe123456789011212122313321321');
			var browser_cache_id = uni.getStorageSync('browser_cache_id');
			if (browser_cache_id) {
				uni.navigateTo({
					url: url + '?id=' + browser_cache_id,
				})
			} else {
				uni.showToast({
					title: '无浏览记录',
				})
			}
		}
		else if (url == 'duorenpintuan') {
			
			var url1 = 'https://yanyubao.tseo.cn/Home/DuorenPintuan/pintuan_list/ensellerid/' + this.get_sellerid() + '.html?click_type=Wxa';
			uni.navigateTo({
				url: '/pages/h5browser/h5browser?url=' + encodeURIComponent(url1) + '&ret_page=' + ret_page,
			})
		} else if (url == 'fenxiangkanjia') {
			
			var productid = 0;
			if (var_list && var_list.productid) {
   
				var url1 = 'https://yanyubao.tseo.cn/Home/ShareKanjia/share_list/productid/' + var_list.productid + '.html?click_type=Wxa';
				uni.navigateTo({
					url: '/pages/h5browser/h5browser?url=' + encodeURIComponent(url1) + '&ret_page=' + ret_page,
				})
   
			}
   
		} else if ((url.indexOf('http://') == 0)||(url.indexOf('https://') == 0)) {
			
			if (url.indexOf('#redirectTo') != -1){
				//如果指定了跳转方式为 #redirectTo
				url = url.replace(/#redirectTo/, '');
				uni.redirectTo({
				  url: '/pages/h5browser/h5browser?url=' + encodeURIComponent(url) + '&ret_page=' + ret_page,
				})
			}
			else{
				uni.navigateTo({
					url: '/pages/h5browser/h5browser?url=' + encodeURIComponent(url) + '&ret_page=' + ret_page,
				})
			}
		}
		else if (url.indexOf('miniprogram') == 0) {
			
			var arr = url.split(" ");
			if (arr.length >= 3) {
				var appid = arr[2];
				var pagepath = arr[3];
				var extraData = null;
				
				if (arr[4]) {
					extraData = arr[4];
				}
	   
				var extraData_obj = null;
				if (extraData) {
					extraData_obj = JSON.parse(extraData);
				}
	   
				//console.log('1111111111111', extraData)
	   
				uni.navigateToMiniProgram({
					appId: appid,
					envVersion: 'release',
					path: pagepath,
					extraData: extraData_obj,
					success(res) {
						// 打开成功
					},
					fail: function (res) {
						uni.showModal({
							title: '跳转小程序失败',
							content: res.errMsg,
							showCancel: false
						})
	   
						console.log('跳转小程序失败：', res);
					}
				})
			}
		}
		else {
			console.log('qqqe12345678901121212');
			uni.navigateTo({
				url: url
			})
		}
   
	},
	
}
