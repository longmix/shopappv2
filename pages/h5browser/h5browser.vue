<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	// var app = getApp();
	export default {
		data() {
			return {
				url: null,
				title: "",
				ret_page:'',
				share_title:'',
				share_image:'',
				share_path_extra_option:''
			}
		},
		
		onLoad: function (options) {
			this.abotapi.set_option_list_str(null, this.abotapi.getColor());
			
			//console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
			
			/*
			uni.setNavigationBarColor({
				backgroundColor:"#269ad7"
			})*/
			
		
			if(options.ret_page){
				ret_page = options.ret_page
			}
		
			var self = this;
		
			//console.log(decodeURIComponent(options.scene));
			console.log('options====1111',options);
		
			if (options.scene != null) {
				var url_value = decodeURIComponent(options.scene);
		
				console.log(url_value);
		
		        var url_data = url_value.split('@');
		        console.log(url_data);
		        console.log(url_data[1]);
		
		        if (url_data.length < 2) {
					//跳转到首页
					uni.switchTab({
						url: '/pages/index/index'
					})
		        }
		
		        var url = 'https://www.abot.cn';
		        if (url_data[1] == 'weiduke_home') {
					url = 'https://cms.weiduke.com/index.php/Wap/Index/index/token/' + url_data[0] + '.shtml';
					//'/pages/tabBar/user/https://yanyubao.tseo.cn/User/agent_income.html?oneclicklogin=%oneclicklogin%'
		
					
		
					if (url.indexOf('*') != -1) {
						url = url.replace("*", "?");
					}
						url = url
						console.log('888888888====',url);
				}
		        else if (url_data[1] == 'shortu') {
					var short_code = url_data[0];
		
					uni.showLoading({
						title: '数据加载中……',
					});
		
					var url = this.abotapi.globalData.yanyubao_server_url + '/openapi/ShortUrl/get_url';
					var data = {
						sellerid: this.abotapi.get_sellerid(),
						code: short_code,
					};
					var cbSuccess = function (res) {
					uni.hideLoading();
		
		            if (res.data.code == 1) {
							url = res.data.longurl
							console.log('dizhizaina',url);
		            }
		            else {
						uni.showModal({
							title: '错误',
							content: '网址不存在',
							success(res) {
								uni.navigateBack({
									delta: 2
								})
							}
						})
					}
				};
				var cbError = function (res) {
					uni.hideLoading();
				};
					this.abotapi.httpPost(url, data, cbSuccess, cbError);
		
					return;
		        }
		        
			}
			else if (options.url != null) {
		
				var extra_option_str = '';
				
				console.log('111111111111111111111======>>>>'+options.url);
				
				// #ifdef MP-WEIXIN
				options.url = decodeURIComponent(options.url);
				
				console.log('微信小程序中做特殊判断，多加一次转换后的参数：', options);
				
				// #endif
				
				
				//判断特殊的url网址格式：
				//2021.12.19. http://127.0.0.1/yanyubao_server/index.php?g=Supplier&m=ShopWxaMgr&a=index&setting_type=shopappv2
				//定义了一组视频号相关的网址，例如
				// wxa_api openChannelsLive [视频号 id]
				if ((options.url.indexOf('http://') == 0)
					||(options.url.indexOf('https://') == 0)
					||(options.url.indexOf('/hybrid/html/') == 0)){
					//不需要拦截	
				}
				else{
					//如果不是网址，则拦截
					console.log('h5browser：这不是http开头或者hybrid的网址，所以跳转：' + options.url);
					
					this.abotapi.call_h5browser_or_other_goto_url(options.url);
					return;
				}
				
				
		
		
		        //判断分享转发的特殊参数，即带了分享转发的文字和图片
		        Object.keys(options).forEach(function (key) {
		
					//console.log(key, obj[key]);
					if (key != 'url'){
						extra_option_str += key+'='+options[key]+'&';
					}
		        });
		
		        if(extra_option_str.length > 2){
					extra_option_str = extra_option_str.substr(0, extra_option_str.length - 1);
		
					this.share_path_extra_option = extra_option_str
		        }
		
		        if(options.share_title){
					
					this.share_title = decodeURIComponent(options.share_title);
				
		        }
		
		        if (options.share_image) {
				
					this.share_image = decodeURIComponent(options.share_image);
			
		        }
				
				
				
				console.log('111111111111111111111======>>>>'+options.url);
								
				this.url = decodeURIComponent(options.url)
				
				console.log('111111111 decodeURIComponent======>>>>' + this.url);
				
				
				
				
				
		        
		    }
			else {	
				this.url = 'https://www.abot.cn'
			}
		
		},
		onNavigationBarButtonTap:function(e){
			console.log('onNavigationBarButtonTap=====>>>>', e);
			
			console.log(e.text);//提交
			console.log(e.fontSize);//16px
			
			if(e.text == '首页'){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/index/index');
			}
		},
		onShareAppMessage: function (options) {
		  console.log(options);
		  
			var self = this;
			var url1 = options.webViewUrl;
			/*
			if (url.indexOf("?") != -1) {
				url = url.replace("?", "*");
			}
			*/
		   
			console.log(options.webViewUrl);
	
		  //设置分享转发的内容
		  var share_title = this.data.current_shop_list.name;
	
		  var share_image = this.data.current_shop_list.icon;
	
		  var share_path = 'pages/h5browser/h5browser?url=' + encodeURIComponent(url1);
	
		  if (this.share_title) {
			share_title = this.share_title;
		  }
		  if (this.share_image) {
			share_image = this.share_image;
		  }
	
		  if(this.share_path_extra_option){
			share_path += '&' + this.share_path_extra_option;
		  }
	
		  console.log("share_path==", share_path)
	
	
		  var share_data = { 
			title: share_title,
			path: share_path,
	
			success: function (res) {
			  // 转发成功
			  
			},
			fail: function (res) {
			  // 转发失败
			}
		  }
	
		  if(share_image){
			share_data.imageUrl = share_image
		  }
	
	
		  return share_data;
	
	
			
		},
		onShareTimeline: function () {
		  var that = this;
	
		  //设置分享转发的内容
		  var share_title = this.data.current_shop_list.name;
		  var share_image = this.data.current_shop_list.icon;
	
		  if (this.data.share_title) {
			share_title = this.data.share_title;
		  }
		  if (this.data.share_image) {
			share_image = this.data.share_image;
		  }
	
	
		  return {
			title: share_title,
			query: that.data.current_params_str, 
			imageUrl: share_image
		  }
		},
		onAddToFavorites: function () {
		  return this.onShareTimeline();
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
