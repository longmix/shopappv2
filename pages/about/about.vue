<template>
	<view>
		
	
	<view class="logo_box">
	  <view class="box_img">
		<view class="logo_img">
		  <image :src="shop_info_from_server.icon"></image>
		</view>
		<view class="code_num2" v-if="shop_info_from_server.shop_name">{{shop_info_from_server.shop_name}}</view>
		<view class="code_num" v-if="version_number">版本号：{{version_number}}</view>
	  </view>
	</view>
	<view class="list">
	  <view class="list_li" v-if="shop_info_from_server.telephone">
		<view class="li_title">客服电话</view>
		<view class="li_info" bindtap="callTel">{{shop_info_from_server.telephone}}</view>
	  </view>
	  <view class="list_li" v-if="kefu_qq">
		<view class="li_title">客服</view>
		<view class="li_info">{{kefu_qq}}</view>
	  </view>
	  <view class="list_li" v-if="kefu_website">
		<view class="li_title">官方网站</view>
		<view class="li_info">{{kefu_website}}</view>
	  </view>
	   <view class="list_li" v-if="kefu_gongzhonghao">
		<view class="li_title">微信公众号</view>
		<view class="li_info">{{kefu_gongzhonghao}}</view>
	  </view>
	  <!--
	  <view class="list_li" bindtap="openChat">
		<view class="li_title">意见反馈</view>
		<view class="li_info">

			<view class="jiantou"><image src="../../images/icon-arrowdown.png"></image>
			</view> 
		</view>
	  </view>
	  -->
	  <!-- <view class="list_li" bindtap="useHelp">
		<view class="li_title">使用帮助</view>
		<view class="li_info">
		   <view class="jiantou"><image src="../../images/icon-arrowdown.png"></image></view> 
		</view>
	  </view>
	  <view class="list_li" bindtap="shenMing">
		<view class="li_title">隐私声明</view>
		<view class="li_info">
			<view class="jiantou"><image src="../../images/icon-arrowdown.png"></image></view>    
		</view>    
	  </view> -->
	  <view class="list_li" @tap="clearStorage">
		<view class="li_title">清空缓存</view>
		<view class="li_info">
			<view class="jiantou"><image src="../../static/img/x_right.png"></image></view>    
		</view>    
	  </view>

	</view>

	<view class="logo_box">
	  <view class="box_img">
		<view style="width: 50%;float:left;text-align:center;">
		  <button class="xg_button" style="width:90%;" @tap="call_seller" type="primary">联系客服</button>
		</view>
		<view style="width: 50%;float:left;text-align:center;">
		  <button :data-url="jubao_link_url" @tap="mytiaozhuan" class="xg_button" style="width:90%;background-color: #eee;color:#222;"  type="primary">问题反馈</button>
		</view>
	  </view>
	</view>
	</view>
</template>
<script>
// import app from '../../common/common.js';
	var apps = getApp();
	
	// var userInfo = that.abotapi.get_user_info();
	// var userAcountInfo = that.abotapi.get_user_account_info();
	
	export default {
		data() {
			return {
				telephone: '021-31128716',
				button_bg_color:'#179b16',
				button_font_color:'rgba(255,255,255, 0.6)',
				shop_info_from_server: '',
				kefu_qq:'',
				kefu_website: '',
				kefu_gongzhonghao: '',
				version_number: '',
				jubao_link_url: '',
				about_title: '',
			}
		},
		onLoad(options){
			var that = this;
			var userInfo = that.abotapi.get_user_info();
			// userAcountInfo = that.abotapi.get_user_account_info();
			this.abotapi.set_option_list_str(that,that.abotapi.getColor());
			
			if(options.about){
				uni.setNavigationBarTitle({
					title: options.about
				})
				that.about_title = options.about;
			}
			
			uni.getSystemInfo({
			    success: function (res) {
					console.log('res==',res)
			        console.log('res.model',res.model);
			        console.log('res.pixelRatio',res.pixelRatio);
			        console.log('res.windowWidth',res.windowWidth);
			        console.log('res.windowHeight',res.windowHeight);
			        console.log('res.language',res.language);
			        console.log('res.version',res.version);
			        console.log('res.platform',res.platform);
					that.windowHeight = res.windowHeight;
					that.windowTop = res.windowTop;
			    }
			});
			
			that.kefu_qq = that.abotapi.globalData.kefu_qq;
			that.kefu_website = that.abotapi.globalData.kefu_website;
			that.kefu_gongzhonghao = that.abotapi.globalData.kefu_gongzhonghao;
			that.version_number = that.abotapi.globalData.version_number;
			
			
			that.abotapi.get_shop_info_from_server(that.callback_func_for_shop_info)
				
			that.jubao_link_url = that.abotapi.jump_to_fankui_url();
			
			
			
			
		},
		methods: {
			clearStorage:function(){		
				this.abotapi.clearStorage();
			},
			  
			  
			  
			  mytiaozhuan: function (e) {
					that = this;
			  	
			  		var url = e.currentTarget.dataset.url;
			  		console.log('user mytiaozhuan准备跳转：' + url);
			  	
			  		var last_url = 'switchTab /pages/chat/chat?retpage=' + encodeURIComponent(url);
			  		that.abotapi.goto_user_login(last_url);
			  		
			  	
			  		var that = this;
			  	
			  	
			  		var var_list = Object();
			  		if (that.productid) {
			  		  var_list.productid = that.productid;
			  		}
			  	
			  	
			  		if (url.indexOf("%oneclicklogin%") != -1) {
			  	
			  		  userInfo = that.abotapi.get_user_info();
			  	
			  
			  	
			  		  console.log('userInfo====', userInfo)
			  	
			  		  if (!userInfo) {
			  			// var last_url = 'switchTab /pages/index/index';
			  			that.abotapi.goto_user_login();
			  	
			  			return;	
			  		  }
			  
			  	
			  		  uni.request({
			  			url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=one_click_login_str',
			  			method: 'post',
			  			data: {
			  			  sellerid: that.abotapi.globalData.default_sellerid,
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
			  	
			  				console.log('ddddd+++++', oneclicklogin);
			  	
			  				
			  				that.oneclicklogin = oneclicklogin
			  				
			  				url = url.replace('%oneclicklogin%', that.oneclicklogin);
			  	
			  				if (url.indexOf("%ensellerid%") != -1) {
			  				  url = url.replace('%ensellerid%', that.abotapi.get_sellerid());
			  				}
			  	
			  				if (url.indexOf("%wxa_openid%") != -1) {
			  				  url = url.replace('%wxa_openid%', that.abotapi.get_current_openid());
			  				}
			  	
			  				that.abotapi.call_h5browser_or_other_goto_url(url, var_list);
			  	
			  				return;
			  	
			  			  } else {
			  				uni.showToast({
			  				  title: '非法操作.',
			  				  duration: 2000
			  				});
			  			  }
			  			},
			  			error: function (e) {
			  			  uni.showToast({
			  				title: '网络异常！',
			  				duration: 2000
			  			  });
			  			}
			  		  });
			  	
			  		  return;
			  	
			  		};
			  	console.log('url===》',url);
			  		that.abotapi.call_h5browser_or_other_goto_url(url, var_list, 'user_index');		
			  	
			  },
			  
			  callback_func_for_shop_info:function(shop_info){
				if(!shop_info){
					return;
				}
				
				this.shop_info_from_server = shop_info;
				
			  	this.shop_userid = shop_info.userid;
			  	this.shop_name = shop_info.shop_name;
			  	
			  },
			  
			  //拨打客服电话
			    call_seller: function () {
			      
				  // #ifdef MP-WEIXIN
						var userInfo = this.abotapi.get_user_info();
						if(!userInfo || !userInfo.userid){				
							var last_url = '/pages/about/about?about=' + this.about_title;
							this.abotapi.goto_user_login(last_url,'normal');
							return;
						}				
						uni.navigateTo({
							url: "/pages/msg/chat/chat?type=0&userid="  + this.shop_userid + '&name=' + this.shop_name,
						})	
				  // #endif
				  
				  // #ifdef APP-PLUS
						uni.makePhoneCall({
						  phoneNumber: this.shop_info_from_server.telephone,
						})
				  // #endif
			      
			    },
		},
		
		
		
		
		
		
	}
</script>

<style>
	
	.logo_box{
	    width: 98%;
	    height: 200px;
	    margin: 0 auto;
	   
	}
	.box_img{
	    height: 160px;
	    margin:0 auto;
	    padding-top: 30px;
	    
	}
	.logo_img{
	    width: 80px;
	    height: 80px;
	    margin: 0 auto;
	     border-radius:10px; 
	}
	.logo_img image{
	    width: 100%;
	    height: 100%;
	    border-radius:10px; 
	}
	.code_num{
	    width: 100%;
	    height: 60px;
	    line-height: 60px;
	    text-align: center;
	    font-size: 14px;
	    color: #666;
	}
	.code_num2{
	    width: 100%;
	    height: 30px;
	    line-height: 40px;
	    text-align: center;
	    font-size: 20px;
	    color: #666;
	}
	.list{
	   width: 98%;
	    margin: 0 auto;
	}
	.list_li{
	    width: 100%;
	    height: 90rpx;
	    border-bottom: 1px solid #ddd;
	}
	.li_title{
	    width: 50%;
	    height: 90rpx;
	     line-height: 90rpx;
	     font-size: 32rpx;
	     text-indent: 16rpx;
	     float: left;
	     color: #999;
	}
	.li_info{
	    width: 50%;
	    height: 35px;
	     line-height: 35px;
	     font-size: 16px;
	     float: right;
	     color: #999;
	     box-sizing: border-box;
	     text-align: right;
	     padding-right:8px; 
	}
	.jiantou{
	    width: 20px;
	    height: 20px;
	    margin-top: 6px;
	    float: right;
	}
	
	.jiantou image{
	  width: 100%;
	  height: 100%;
	}
	
</style>