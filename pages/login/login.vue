<template>
	<view class="loginBg" :style="{height:screenHeight + 'px'}" style="padding-bottom: 70upx;">
		<div class="h30"></div>
		<div class="flex-center ">
			<div @click="goHome()" class="flex-center">
				<image v-if="wxa_login_hide_shop_logo != 1" :src="shop_info.icon"  style="width: 150upx;"  mode="widthFix"  class="wh-60"></image>
				<view v-if="wxa_login_show_shop_name && wxa_login_show_shop_name==1" style="margin: 30upx;">{{shop_info.name}}</view>
				<view v-if="wxa_login_show_memo_text && wxa_login_show_memo_text==1" style='text-align:left;margin:50rpx 30rpx;color:#666; font-size:32rpx;display:block;' >
					<text>{{memo_text_content}}</text>
				</view>
			</div>
			
			
		</div>
		<form class="loginBox"  id="login-form" @submit="formSubmit" :report-submit="true">
			
			<view class="flexIcon" :style="{border:'1px solid ' + wxa_shop_nav_bg_color}">
				<view class="flexIcon-icon iconfont icon-phone_light flexIcon-icon-current"></view>
				<input type="text" class="flexIcon-text" placeholder-class="cl-white" name="telephone" @input="phoneInput" placeholder-style="color: #999;" placeholder="请输入手机号码" />
			</view>
				  
			<view class="flexIcon" :style="{border:'1px solid ' + wxa_shop_nav_bg_color}">
			  <view class="flexIcon-icon iconfont icon-moban flexIcon-icon-current"></view>
				<image @click="click_check" :src="img_checkcode_url" mode="widthFix" class="img_checkcode"></image>
				<input type="text" class="flexIcon-text" placeholder-class="cl-white" name="telephone" @input="imgInput" placeholder-style="color: #999;" placeholder="请输入答案" />
			</view>
			<view class="flexIcon" :style="{border:'1px solid ' + wxa_shop_nav_bg_color}">
				<view class="flexIcon-icon iconfont icon-password flexIcon-icon-current"></view>
				<button type="primary"  @click="send_btn" :disabled="disabled" :style="{background:wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color}" class="send_btn">{{second}}</button>
				<input type="text" class="flexIcon-text"  name="password"  placeholder-class="cl-white" @input="telInput" placeholder-style="color: #999;"  placeholder="请输入手机验证码" />
			</view>
			<div></div>
			<button type="primary"  formType="submit" open-type="getUserInfo" class="btn-row-submit" :style="{background:wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color}" style="width: 84%;background: #2E85D8;" @click="btn_user_login">登陆</button>
			<div class="flex mgb-20">
				<navigator class="cl-black pointer flex-1" url="/pages/login/login_by_password">账号密码登录</navigator>
			</div>
			
			<view class="home-p" @tap="goHome()">
				<image src="../../static/img/shouye.svg"></image>
				<view>
					首页
				</view>
			</view>
			
			<!-- #ifdef MP-WEIXIN -->
			<div class="otherBox mgb-20">
				<div class="otherBox-line"></div>
				<div class="otherBox-text">一键登录</div>
			</div>
			<div class="flex flex-center2">
				<!-- <button open-type="getUserInfo" @getuserinfo="wxLogin" class="btn-round bg-success icon-weixin"></button> -->
				<button open-type="getPhoneNumber" plain="true" class="btn-round bg-success icon-weixin" @getphonenumber="btn_wxa_one_click_login"></button>
			</div>
			<!-- #endif -->
			
			
			<!-- <view class="btn" @tap="doLogin">登 录</view>
			<view class="res">
				<view @tap="toPage('register')">用户注册</view>
				<view @tap="toPage('resetpasswd')">忘记密码</view>
			</view> -->
		<!-- </view> -->
		<!-- 第三方登录 -->
		<!-- <view class="oauth" v-if="isShowOauth">
			<view class="text">— 快速登录 —</view>
			<view class="list">
				<view @tap="oauthLogin('weixin')" v-if="showProvider.weixin" class="icon weixin"></view>
				<view @tap="oauthLogin('qq')" v-if="showProvider.qq" class="icon qq"></view>
				<view @tap="oauthLogin('sinaweibo')" v-if="showProvider.sinaweibo" class="icon sinaweibo"></view> -->
				<!-- <view @tap="oauthLogin('xiaomi')" v-if="showProvider.xiaomi" class="icon xiaomi"></view> -->
		<!-- 	</view>
		</view> -->
		</form>
	</view>
</template>

<script>
	// var abotapi = require("../../common/abotapi.js");
	// var app = getApp();
	// var userInfo = abotapi.get_user_info();
	// var userAcountInfo = abotapi.get_user_account_info();
	
	
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
				pageLoad:false, 
				pageData:{},
				notephone:"请输入手机号码",
				notepwd:"请输入密码",
				isWeixin:false,
				img_checkcode_url:'',
				second: '发送短信',
				mobile: "",
				disabled: false,
				timer001: 60,
				js_code: '',
				tokenstr :'',
				formId:'',
				wxa_shop_nav_bg_color: '',
				wxa_shop_nav_font_color: '',
				shop_info: '',				
				screenHeight:'',
				wxa_login_hide_shop_logo:'',
				wxa_login_show_shop_name:'',
				wxa_login_show_memo_text:'',
				memo_text_content:'',
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
			
			this.abotapi.set_option_list_str(null, this.abotapi.getColor());
			
			this.abotapi.set_option_list_str(this, this.callback_set_option_list_str);
			
			this.abotapi.get_shop_info_from_server(this.callback_func_for_shop_info);
			this.click_check();
			
			
		},
		methods:{
			
			callback_set_option_list_str:function(that,cb_params){
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
				
	
			},
			
			callback_func_for_shop_info:function(shop_info){
							console.log('shop_info',shop_info);
				if(!shop_info){
					return;
				}
				this.shop_info = shop_info;
			},
			
			phoneInput:function(e){
				//console.log('Phone=',e)
				this.mobile = e.detail.value;
			},		
			imgInput: function (e) {
				//console.log('img=' + e.detail.value)
				this.img = e.detail.value;
			},

			telInput: function (e) {
				//console.log('tel=' + e.detail.value)
				this.tel = e.detail.value;
			},
			
			click_check: function (e) {
			
			    var that = this
			    uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_tokenstr',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method: "POST",
					success: function (res) {
						// console.log(res.data);
						that.tokenstr = res.data.tokenstr;		
						//console.log(res.data.tokenstr);			
						that.img_checkcode_url = that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=getverifycodeimg' + '&tokenstr=' + that.tokenstr
					}
				});
			},
			
			
			send_btn:function(){
				var that = this				  
				console.log(1111);
				  
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=sendsms',
					data: {
						mobile: that.mobile,
						verifycode: that.img,
						sellerid: this.abotapi.globalData.default_sellerid,
						//verifycode_sms: that.second,
						tokenstr: that.tokenstr
					},
				    header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method: "POST",
					success: function (request_data) {
						console.log(request_data.data)
						if (request_data.data.code == 1) {
							//将按钮设置为不可点击状态,同时显示倒计时
							countdown(that);
				  
							that.disabled = true
							//=====end======
					  
							uni.showModal({
								title: '提示',
								content: request_data.data.msg,
								showCancel: false,
							})
					
						}else {
				            uni.showModal({
								title: '提示',
								content: request_data.data.msg,
								showCancel: false,
				            })
				  
				            that.tokenstr = request_data.data.tokenstr;
							
							that.img_checkcode_url =  that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=Xiaochengxu&a=getverifycodeimg' + '&tokenstr=' + that.tokenstr
			
						}
					}
				})
			},
			
			//手机验证码登录
			btn_user_login: function () {
			    console.log('getUserInfo button click, and get following msg');
			    // console.log(userinfo);
				var that = this;
			    if (!this.mobile) {
					uni.showToast({
						title: '请输入手机号码！',
						icon: 'fail',
						duration: 2000
					})
					return;
			    }
			    if (!this.img) {
					uni.showToast({
						title: '请输入图片验证码！',
						icon: 'fail',
						duration: 2000
					})
					return; 
			    }
			    if (!this.tel) {
					uni.showToast({
						title: '请输入手机验证码！',
						icon: 'fail',
						duration: 2000
					})
					return;
			    }
				
				that.abotapi.abotRequest({
				    url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=login',
				    header: {
						"Content-Type": "application/x-www-form-urlencoded"
				    },
				    method: "POST",
				    data: { 
						mobile: that.mobile,
						verifycode_sms: that.tel,
						sellerid: this.abotapi.globalData.default_sellerid,
				    },
				    success: function (request_res) {
						console.log(4444444444444444444);
						
						
						console.log(request_res);
						var data = request_res.data;
						//var res = JSON.parse(data);
						//console.log(res);
						console.log(request_res.data);
						if (request_res.data && (request_res.data.code == 1)){
							console.log("update_mobile : check_button : ");
							console.log('登录成功返回userid:' + request_res.data.userid);
				        
				       
							that.abotapi.globalData.userInfo.user_openid = request_res.data.openid;
							that.abotapi.globalData.userInfo.userid = request_res.data.userid;          
							that.abotapi.globalData.userInfo.checkstr = request_res.data.checkstr;
							  
							//保存openid
							if(request_res.data.openid){
								that.abotapi.set_current_openid(request_res.data.openid);
							}
							else{
								that.abotapi.set_current_openid('userid_openid_' + request_res.data.userid);
							}
							
							
							
							console.log('更新缓存的用户信息:');
							console.log(that.abotapi.globalData.userInfo);
							  
							that.abotapi.set_user_info(that.abotapi.globalData.userInfo);
							
							that.abotapi.abotRequest({
							     url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopApp&a=get_user_info',
							     data: {
							       sellerid: that.abotapi.globalData.default_sellerid,
							       checkstr: request_res.data.checkstr,
							       userid: request_res.data.userid,
							     },
							     header: {
							       "Content-Type": "application/x-www-form-urlencoded"
							     },
							     method: "POST",
							     success: function (res) {
							       console.log('ddd', res);
							       // console.log('ddd', res.data.code);
									
									var	data = res.data;						      
									 
									 if(data.code == 1){
										 
										 that.abotapi.set_user_account_info(data.data)
										 
									 }
	
							     }
							   })
							  
				 
				        
							uni.showModal({
								title: '提示',
								content: request_res.data.msg,
								showCancel: false,
								success: function (res) {
									//console.log("回调结果"+res.code);
									if (res.confirm) {		 
									//=======检查登录成功之后的跳转=======
										var last_url = uni.getStorageSync('last_url');
				 
										console.log('last_url-----', last_url)
				 console.log(15545789)
										var page_type = uni.getStorageSync('page_type');
										if (last_url) {
											if (page_type && (page_type == 'switchTab')) {
				 console.log('last_url12456-----', last_url)
												uni.switchTab({
													url: last_url,
												})
												
											} else {
												console.log('last_url-----457', last_url)
												uni.redirectTo({
													url: last_url,
												})
											}
				 
											uni.removeStorageSync('last_url');
											uni.removeStorageSync('page_type');
				 
											return;
										}
									//===========End================
				              
										uni.switchTab({
											url: '/pages/index/index'
										})
									}
								}
							});
						} else {
							console.log(request_res);
							uni.showToast({
								title: '登录失败',
								icon: 'fail',
								duration: 2000
							});
						}
				      
						console.log("延誉宝服务器解析jscode并返回以下内容：");
						console.log(request_res);
						// app.globalData.user_openid = request_res.data.openid;
						// this.abotapi.globalData.tokenstr = request_res.data.tokenstr;
				    }
				});
				
			},
			 
				
				
			btn_wxa_one_click_login:function(e){
				var that = this;
				console.log(e.detail.errMsg)
				console.log(e.detail.iv)
				console.log(e.detail.encryptedData)
					  
				console.log('uni.login <<<==== btn_wxa_one_click_login');
					  
				uni.login({
					success: function (res) {
						console.log("btn_wxa_one_click_login 获取到的jscode是:" + res.code);
					  
						//如果拒绝授权， e.detail.errMsg
						//console.log(e.detail.errMsg);return;
					  
						that.abotapi.abotRequest({
							url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=wxa_one_click_login',
							method: "POST",
							dataType: 'json',
							data: {
								js_code: res.code,
								xiaochengxu_appid: that.abotapi.globalData.xiaochengxu_appid,
								iv: e.detail.iv,
								encryptedData: e.detail.encryptedData,
								sellerid: that.abotapi.globalData.default_sellerid,
								parentid: 0,
							},
							success: function (res) {
								console.log(res);
			  
								if (res.data && (res.data.code == 1)) {
									//更新checkstr和uwid，
									that.abotapi.globalData.userInfo.userid = res.data.userid;
									//this.abotapi.globalData.userInfo.checkstr = res.data.checkstr;
				  
									console.log('一键登录成功，userid:' + res.data.userid);
									console.log('一键登录成功，userid:' + res.data.openid);
				  
									that.abotapi.globalData.userInfo.user_openid = res.data.openid;
									that.abotapi.globalData.userInfo.userid = res.data.userid;
									that.abotapi.globalData.userInfo.checkstr = res.data.checkstr;
									that.abotapi.globalData.userInfo.is_get_userinfo = res.data.is_get_userinfo;
				  
									//保存openid
									that.abotapi.set_current_openid(res.data.openid);
					  
									console.log(that.abotapi.globalData.userInfo);
					  
									that.abotapi.set_user_info(that.abotapi.globalData.userInfo);
									
									that.abotapi.abotRequest({
									     url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopApp&a=get_user_info',
									     data: {
									       sellerid: that.abotapi.globalData.default_sellerid,
									       checkstr: res.data.checkstr,
									       userid: res.data.userid,
									     },
									     header: {
									       "Content-Type": "application/x-www-form-urlencoded"
									     },
									     method: "POST",
									     success: function (res) {
									       console.log('ddd', res);
									       // console.log('ddd', res.data.code);
											
											var	data = res.data;						      
											 
											 if(data.code == 1){
												 
												 that.abotapi.set_user_account_info(data.data)
												 
											 }
										
									     }
									   })
									
									// that.getUserInfo();
									
									uni.showToast({
										title: res.data.msg,
										icon: 'success',
										duration: 2000
									})
				  
									//=======检查登录成功之后的跳转=======
									var last_url = uni.getStorageSync('last_url');
				 
									console.log('last_url-----', last_url)
				 
									var page_type = uni.getStorageSync('page_type');
									if (last_url) {
										if (page_type && (page_type == 'switchTab')) {
				 
											uni.switchTab({
												url: last_url,
											})
										} else {
											uni.redirectTo({
												url: last_url,
											})
										}
				 
										uni.removeStorageSync('last_url');
										uni.removeStorageSync('page_type');
				 
										return;
									}
									//===========End================
			
									uni.switchTab({
										url: '/pages/index/index'
									})
			
								}else {
									//一键登录返回错误代码
									uni.showModal({
										title: '提示',
										content: res.data.msg,
										showCancel:false,
										success(res) {
											if (res.confirm) {
												console.log('用户点击确定')
											}
										}
									})		  
								}
							}
						});
					  
					},
					fail: function (login_res) {
						console.log('login.js  uni.login失败。');
					}
				});
			},	
				
			//获取用户信息
			getUserInfo: function () {
				var userInfo = this.abotapi.get_user_info();
				var that = this;
				if(userInfo && userInfo.userid){
					this.abotapi.abotRequest({
						url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_user_info',
						data: {
							sellerid: this.abotapi.globalData.default_sellerid,
							checkstr: userInfo.checkstr,
							userid: userInfo.userid,
							appid: this.abotapi.globalData.xiaochengxu_appid,
						},
						
						method: "POST",
						success: function (res) {
							console.log('get_user_info====', res);
							uni.setStorageSync('userDelite',res.data.data)
					    }
					})
						
				}
					
			},
			
			goHome:function(){
				var that=this;
				uni.switchTab({
					url:'/pages/index/index'
				});
				
				// abotapi.goHome();
			},
			tel:function(){
				if(this.notephone=='请输入手机号码'){
					this.notephone="";
				}else if(this.notephone==''){
					this.notephone='请输入手机号码'
				}
			},
			pass:function(){
				console.log(this.notepwd);
				if(this.notepwd=='请输入密码'){
					this.notepwd="";
				}else if(this.notepwd==''){
					this.notepwd='请输入密码'
				}
			},
			
			
			formSubmit:function(e){
				var that=this;
				
				// that.btn_user_login();
			}
		}
	}
</script>

<style>
.send_btn{
	float: right;
	margin-top: -8upx;
	font-size: 24upx;
	padding: 0 40upx;
	margin-right: 8upx;
	color:#007aff;	
	background-color:#fff;
}

.flexIcon-icon-current{
	float:left;
}	
.img_checkcode{
	width: 25%;
	float: right;
	margin-top: -4upx;
	margin-right: 16upx;
	height: 56upx;
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

/* .otherBox-text {
	background-color: #50a8db;
	text-align: center;
	padding: 0upx 22upx;
	line-height: 79.2upx;
	position: absolute;
	width: 264upx;
	left: 50%;
	margin-left: -132upx;
	color: #fff;
} */

.otherBox-text {
	text-align: center;
	padding: 0rpx 22rpx;
	line-height: 79.2rpx;
	position: absolute;
	width: 264rpx;
	left: 50%;
	margin-left: -132rpx;
	color: #444;
	font-size: 34rpx;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
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
	background:  #EEEEEE/*linear-gradient( #29cee8,#619ad6)*/;
	background-color: ;
	position: absolute;
	top: 0upx;
	bottom: 0upx;
	left: 0upx;
	right: 0upx;
}

.mgb-20 {
	margin-bottom: 48rpx!important;
}
.flex-center{
	text-align: center;
	margin-top: 60upx;
}
.flex-center2 {
	text-align: center;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
}

.btn-round {
	width: 144upx;
	height: 144upx;
	background-color: #f60;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	color: #fff;
	font-family: iconfont;
}
.btn-round:before {
	font-size: 57.6upx;
}
.bg-success {
	background-color: #28a745!important;
	color: #fff!important;
	border: #fff!important;
}

.home-p{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	background: #f00;
	width: 120upx;
	height: 120upx;
	position: fixed;
	z-index: 100;
	right: 60upx;
	color: #fff;
	font-size: 24upx;
	border-radius: 50%;
	bottom: 120upx;
}

.home-p image{
		width: 60%;
		height: 60%;
	}

.cl-black{
	margin-top: 15px;
	text-align: right;
	font-size: 17px;
	width: 86%;
	margin-left: 7%;
}

input::input-placeholder{
	color: #999999;
}

input::-ms-input-placeholder{
	color: #999999;
}

input::-webkit-input-placeholder{
	color: #999999;
}

input::-moz-placeholder{
	color: #999999;
}



</style>
