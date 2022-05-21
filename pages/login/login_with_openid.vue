<template>
	<view class="loginBg" :style="{height:screenHeight + 'px'}" style="padding-bottom: 70upx;">
		<div class="h30"></div>
		<div class="flex-center ">
			<div @click="goHome()" class="flex-center">
				<image v-if="wxa_login_hide_shop_logo != 1" :src="wxa_shop_operation_logo_url"  
					style="width: 150upx;height: 150upx;border-radius: 50%;"  mode="widthFix"></image>
				<view v-if="wxa_login_show_shop_name && wxa_login_show_shop_name==1" class="">{{wxa_shop_new_name}}</view>
				<view v-if="wxa_login_show_memo_text && wxa_login_show_memo_text==1" style='text-align:left;margin:50rpx 30rpx;color:#666; font-size:32rpx;display:block;' >
					<text>{{memo_text_content}}</text>
				</view>
			</div>
		</div>
		<form class="loginBox"  id="login-form" @submit="formSubmit" :report-submit="true">
			
			
			<!-- #ifdef MP-WEIXIN -->
				<!-- :style="{background:wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color}"  -->
				<button type="primary" class="btn-row-submit" 
					
					
					open-type="getUserInfo"  @getuserinfo="btnWxaGetUserinfo"
					
					style="margin-left: 8%;"
					formType="submit" >微信授权</button>
			<!-- #endif -->
			
			<!-- #ifdef MP-ALIPAY -->
				<!-- 	type="default"	scope="phoneNumber"	 open-type="getAuthorize" @getAuthorize="onGetAlipayAuthorize"	 -->
				<!--  :style="{background:wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color}"   -->
				<button type="primary"	@click="onGetAlipayAuthCode"			
					class="btn-row-submit"
					
					style="width: 84%;background: #2E85D8;margin: auto;">支付宝授权</button>
			<!-- #endif -->
			
			<div class="flex mgb-20">
				<navigator class="cl-black pointer flex-1" open-type="redirect" url="/pages/login/login">手机验证码登录自动注册</navigator>
			</div>
			<view class="home-p" :style="{background:wxa_shop_nav_bg_color}" @tap="goHome()">
				<image src="../../static/img/shouye.svg"></image>
				<view>
					首页
				</view>
			</view>
		</form>
	</view>
	
</template>

<script>
	
	
	function countdown(that) {
		var timer001 = that.timer001;
		if (timer001 == 0) {
			//倒计时结束,恢复按钮可点击状态,同时内容设置为为 发送短信
		
			that.second = '发送短信';
			that.timer001 = 60;
			that.disabled = false
			that.js_code = '';
			that.shop_icon = '';
			return;
		}
	
		var time = setTimeout(function () {
			that.second = '重新发送(' + timer001 + ')';
			that.timer001 =  timer001 - 1;

			countdown(that);
		} , 1000)
	} 
	 
	 
	export default {

		data:function(){
			return {
				
				js_code: '',
				tokenstr :'',
				
				
				wxa_shop_nav_bg_color: '',
				wxa_shop_nav_font_color: '',
				
				//shop_info: '',
				wxa_shop_operation_logo_url:'',
				wxa_shop_new_name:'',
				
				screenHeight:'',
				wxa_login_hide_shop_logo:'',
				wxa_login_show_shop_name:'',
				wxa_login_show_memo_text:'',
				memo_text_content:'',
				
				login_after_get_userinfo:0,
				current_userinfo:null,
				
				//微信和支付宝小程序的 jscode 和 authcode 信息
				login_data_from_wxa_or_alipay:null
			}
		},
		onLoad:function(){
			var that = this;
			uni.getSystemInfo({
			    success: function (res) {
					console.log('getSystemInfo==',res)
					that.screenHeight = res.screenHeight;			
			    }
			});
			
			var userInfo = this.abotapi.get_user_info();
			this.abotapi.set_option_list_str(null, this.abotapi.getColor());
			
			if(userInfo && userInfo.userid){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/index/index');
			}
			
			this.abotapi.set_option_list_str(this, this.callback_set_option_list_str);
			
			//this.abotapi.get_shop_info_from_server(this.callback_func_for_shop_info);
			
			
			
			
		},
		methods:{
			callback_set_option_list_str:function(that, cb_params){
				
				that.abotapi.getColor();
				
				if(!cb_params){
					return;
				}
				
				if(cb_params.wxa_shop_nav_bg_color){
					that.wxa_shop_nav_bg_color = cb_params.wxa_shop_nav_bg_color
				}
				
				if(cb_params.wxa_shop_nav_font_color){
					that.wxa_shop_nav_font_color = cb_params.wxa_shop_nav_font_color
				}
				
				if(cb_params.wxa_login_hide_shop_logo){
					that.wxa_login_hide_shop_logo = cb_params.wxa_login_hide_shop_logo
				}
				
				if(cb_params.wxa_login_show_shop_name){
					that.wxa_login_show_shop_name = cb_params.wxa_login_show_shop_name
				}
				
				if(cb_params.wxa_login_show_memo_text){
					that.wxa_login_show_memo_text = cb_params.wxa_login_show_memo_text
				}
				
				if(cb_params.wxa_login_memo_text){
					that.memo_text_content = cb_params.wxa_login_memo_text
				}
				
				that.wxa_shop_operation_logo_url = cb_params.wxa_shop_operation_logo_url;
				that.wxa_shop_new_name = cb_params.wxa_shop_new_name;
				
			},
			
			callback_func_for_shop_info:function(shop_info){
							console.log('shop_info',shop_info);
				if(!shop_info){
					return;
				}
				//this.shop_info = shop_info;
			},
			

			btn_user_login: function () {
			    
				
				
				var that = this;
				//console.log(code+'hehe');
				
				
				
				var login_url = '';
				
				var post_data = {
						sellerid: this.abotapi.globalData.default_sellerid,
						//parentid: that.abotapi.get_current_parentid(),
				    };
					
				if(that.abotapi.get_current_parentid()){
					post_data.parentid = that.abotapi.get_current_parentid();
				}
					
				if(that.login_data_from_wxa_or_alipay){
					
					//post_data.auth_code = that.login_data_from_wxa_or_alipay.auth_code;
					//post_data.alipay_appid = that.login_data_from_wxa_or_alipay.alipay_appid;
					for(var key in that.login_data_from_wxa_or_alipay){
						post_data[key] = that.login_data_from_wxa_or_alipay[key];
					}
					
					
					
				}
				
				console.log('微信或支付宝小程序登录，准备提交的数据：', post_data);
				
				//#ifdef MP-WEIXIN
					//ShopAppWxa 里面增加了对 jscode的处理逻辑
					login_url = that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=wxa_get_userinfo';
					
					
					
				//#endif
				
				//#ifdef MP-ALIPAY
					login_url = that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppMpAlipay&a=get_alipay_user_id';
					
					
				//#endif
				
				
				
				that.abotapi.abotRequest({
					url: login_url,
					method: "POST",
					dataType: 'json',
					data: post_data,
					success: function (res) {
						console.log(res);
							  
						if (res.data && (res.data.code == 1)) {
							
							// #ifdef MP-ALIPAY
							console.log('支付宝一键授权成功，user_id:' + res.data.alipay_user_id);
							
							uni.setStorage({
								key:'current_alipay_user_id',
								data : res.data.alipay_user_id
							});
							
							that.abotapi.globalData.current_alipay_user_id = res.data.alipay_user_id;
							
							// #endif
							
							
							
							// #ifdef MP-WEIXIN
							
							console.log('微信一键授权成功，openid:' + res.data.openid);
							
							//保存openid
							that.abotapi.set_current_openid(res.data.openid);
							
							
							that.abotapi.globalData.userInfo = that.abotapi.get_user_info();
							if(!that.abotapi.globalData.userInfo){
								that.abotapi.globalData.userInfo = {};
							}
							
							that.abotapi.globalData.userInfo.is_get_userinfo = 1;	//标志已经获取了头像和昵称
							that.abotapi.globalData.userInfo.user_openid = res.data.openid;
							
							that.current_userinfo = that.abotapi.globalData.userInfo;
									  
							that.abotapi.set_user_info(that.abotapi.globalData.userInfo);
							
							// #endif
				  
							uni.showToast({
								title: res.data.msg,
								icon: 'success',
								duration: 500
							})
							
							var login_last_url = uni.getStorageSync('login_last_url');
							
							if (login_last_url) {
								uni.removeStorageSync('login_last_url');
							}
							else{
								login_last_url = '/pages/index/index';
							}
							
							that.abotapi.call_h5browser_or_other_goto_url(login_last_url);
							
							
						}
						else{
							uni.showToast({
								title: '授权失败：'+res.data.msg,
								icon: 'success',
								duration: 500
							})
						}
						
						
					},
					fail: function (e) {
						uni.showToast({
							title: '网络连接错误~',
							duration: 2000
						});
					},
					
				});
				
				
			    
			},
			//获取用户的头像和昵称信息
			btnWxaGetUserinfo:function(e){
				var that = this;
				
				console.log(e.detail.errMsg)
				console.log(e.detail.iv)
				console.log(e.detail.encryptedData)
					  
				console.log('uni.login <<<==== btnWxaGetUserinfo');
				
				// #ifdef MP-WEIXIN
					  
				uni.login({
					success: function (res) {
						console.log("btnWxaGetUserinfo 获取到的jscode是:" + res.code);
											  
						//如果拒绝授权， e.detail.errMsg
						//console.log(e.detail.errMsg);return;
						
						
						that.login_data_from_wxa_or_alipay = {};
						that.login_data_from_wxa_or_alipay.platform = 'weixin';
						that.login_data_from_wxa_or_alipay.js_code = res.code;
						
						that.login_data_from_wxa_or_alipay.iv = e.detail.iv;
						that.login_data_from_wxa_or_alipay.encryptedData = e.detail.encryptedData;
						
						that.login_data_from_wxa_or_alipay.xiaochengxu_appid = that.abotapi.globalData.xiaochengxu_appid;
						that.login_data_from_wxa_or_alipay.alipay_user_pid = that.abotapi.globalData.alipay_user_pid;
						that.login_data_from_wxa_or_alipay.sellerid = that.abotapi.globalData.default_sellerid;
											  
						// 认证成功
						// 调用自己的服务端接口，让服务端进行后端的授权认证，并且利用session，需要解决跨域问题
						// 该url是您自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
						
						that.btn_user_login();
						
						
						
						
						
						
						
					  
						
					  
					},
					fail: function (login_res) {
						console.log('login.js  uni.login失败。');
					}
				});
				
				// #endif
			},			
			  
			goHome:function(){
				var that = this;
				
				this.abotapi.call_h5browser_or_other_goto_url('/pages/index/index');
			},
						
			formSubmit:function(e){
				var that=this;
				console.log('aaaaaaaaaaaaaaaaaaa');
				    console.log(e.detail.formId);
				    var that = this;
					that.formId = e.detail.formId				
				 
			},
			
			//获取支付宝的用户ID
			onGetAlipayAuthCode:function(e){
				
				var that = this;
				
				console.log("onGetAlipayAuthCode支付宝小程序中点击了登陆按钮 ===>>>" + e);
				//console.log(that.abotapi.globalData.alipay_third_appid);
				//return;
				
				my.getAuthCode({
					scopes: ['auth_base'],
					 // 主动授权：auth_user，静默授权：auth_base或者其它scope。如需同时获取用户多项授权，可在 scopes 中传入多个 scope 值。
					success: (res) => {
			
						if (!res.authCode) {
							return;
						}
						
						
						console.log("onGetAlipayAuthCode 获取到的authCode是:" + res.authCode);
						
						that.login_data_from_wxa_or_alipay = {};
						that.login_data_from_wxa_or_alipay.platform = 'alipay';
						that.login_data_from_wxa_or_alipay.auth_code = res.authCode;
						
						that.login_data_from_wxa_or_alipay.alipay_third_appid = that.abotapi.globalData.alipay_third_appid;
						that.login_data_from_wxa_or_alipay.alipay_user_pid = that.abotapi.globalData.alipay_user_pid;
						that.login_data_from_wxa_or_alipay.alipay_mini_prog_appid = that.abotapi.globalData.alipay_mini_prog_appid;
											  
						// 认证成功
						// 调用自己的服务端接口，让服务端进行后端的授权认证，并且利用session，需要解决跨域问题
						// 该url是您自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
						
						that.btn_user_login();
						
						
						
						
						
					},
				});
				
				
			},
			

		}
	}
</script>

<style>
.cl-white{
	color: #FFFFFF;
}
.wh-60{
	width: 140upx;
}

.flex-center{
	text-align: center;
	margin: 60upx auto;
}
.btn-row-submit{
	width: 84%;
}
	
.send_btn{
	float: right;
	margin-top: -16upx;
	font-size: 30upx;
	padding: 0 40upx;
	margin-right: 8upx;
}

.flexIcon-icon-current{
	float:left;
}	
.img_checkcode{
	width: 25%;
	float: right;
	margin-top: -12upx;
	margin-right: 16upx;
	height: 72upx;
}
	
	
	.otherBox {
	position: relative;
	height: 79.2upx;
}

.otherBox-line {
	width: 100%;
	height: 2.2upx;
	background-color: #d0d0d0;
	top: 39.6upx;
	position: absolute;
}

.otherBox-text {
	background-color: #50a8db;
	text-align: center;
	padding: 0upx 22upx;
	line-height: 79.2upx;
	position: absolute;
	width: 264upx;
	left: 50%;
	margin-left: -132upx;
	color: #fff;

}

.flexIcon {
	flex-direction: row;
	background-color: #FFFFFF;
	margin-bottom: 44upx;
	border-radius: 44upx;
	padding: 22upx 22upx;
	align-items: center;
	width: 80%;
	margin-left: 7%;
}

.flexIcon-icon {
	margin-right: 13.2upx;
	font-size: 39.6upx;
	color: #fff;
}

.flexIcon-text {
	border: 0;
	flex: 1;
	background:inherit;
	outline: 0;
	font-size: 35.2upx;
	width: 65%;
}
 
.loginBox {
	/* position: absolute;
	top: 50%;
	left: 22upx;
	right: 22upx;
	margin-top: -330upx;
	padding: 33upx 22upx;
	border-radius: 44upx; */
}

.loginBg {
	background: #EEEEEE;
	background-color: ;
	position: absolute;
	top: 0upx;
	bottom: 0upx;
	left: 0upx;
	right: 0upx;
}

.cl-black{
	margin-top: 60rpx;
	text-align: right;
	font-size: 30rpx;
	width: 86%;
	margin-left: 7%;
	color:#555555;
}
.home-p{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	background: #f00;
	width: 130upx;
	height: 130upx;
	position: fixed;
	z-index: 100;
	right: 60upx;
	color: #fff;
	font-size: 28rpx;
	border-radius: 50%;
	bottom: 120upx;
}

.home-p image{
		width: 50%;
		height: 50%;
	}


</style>
