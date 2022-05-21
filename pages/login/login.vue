<template>
	<view class="loginBg" :style="{height:screenHeight + 'px'}" style="padding-bottom: 70upx;">
		<div class="h30"></div>
		<div class="flex-center ">
			<div @click="goHome()" class="flex-center">
				<image v-if="wxa_login_hide_shop_logo != 1" :src="wxa_shop_operation_logo_url"  
					style="width: 150upx;height: 150upx;border-radius: 50%;"  mode="widthFix"></image>
				<view v-if="wxa_login_show_shop_name && wxa_login_show_shop_name==1" style="margin: 30upx;">{{wxa_shop_new_name}}</view>
				<view v-if="wxa_login_show_memo_text && wxa_login_show_memo_text==1" style='text-align:left;margin:50rpx 30rpx;color:#666; font-size:32rpx;display:block;' >
					<text>{{memo_text_content}}</text>
				</view>
			</div>
			
			
		</div>
		<form class="loginBox"  id="login-form" @submit="formSubmit" :report-submit="true">
			<view v-if="wxa_login_only_weixin != 1">
				<view class="flexIcon" :style="{border:'1px solid ' + wxa_shop_nav_bg_color}">
					<view class="flexIcon-icon iconfont icon-phone_light flexIcon-icon-current"></view>
					<input type="text" name="telephone" 
						class="flexIcon-text" 
						@input="phoneInput" 
						placeholder-class="cl-white" 
						placeholder-style="color: #999;" 
						placeholder="请输入手机号码" />
				</view>
					  
				<view class="flexIcon" :style="{border:'1px solid ' + wxa_shop_nav_bg_color}">
				  <view class="flexIcon-icon iconfont icon-moban flexIcon-icon-current"></view>
					<image @click="click_check" :src="img_checkcode_url" mode="widthFix" class="img_checkcode"></image>
					<input type="text" name="telephone"
						class="flexIcon-text" style="width: 60%;" 
						@input="imgInput" 
						placeholder-class="cl-white" 
						placeholder-style="color: #999;" 
						placeholder="请输入答案" />
				</view>
				<view class="flexIcon" :style="{border:'1px solid ' + wxa_shop_nav_bg_color}" style="overflow: hidden;">
					<view class="flexIcon-icon iconfont icon-password flexIcon-icon-current"></view>
					<button type="primary"  @click="send_btn" 
						:disabled="disabled" 
						:style="{background:wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color}" 
						style="height: 60rpx;line-height: 60rpx;" 
						class="send_btn">{{second}}</button>
					<input type="text"  name="password"  
						class="flexIcon-text"  style="width: 60%;"
						@input="telInput" 
						placeholder-class="cl-white" 
						placeholder-style="color: #999;"  
						placeholder="请输入手机验证码" />
				</view>
				<div></div>
				
				
				<!-- #ifdef MP-WEIXIN -->
					<!-- <button type="primary"  formType="submit" 
						
						class="btn-row-submit"
						:style="{background:wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color}" 
						style="width: 84%;background: #228B22;margin: auto;">登陆/注册</button>
						
						@tap="btnWxaLogin"
						
						-->
					<button type="primary"  formType="submit"
						open-type="getUserInfo" @getuserinfo="btnWxaLoginBind"						
						class="btn-row-submit"
						:style="{background:wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color}" 
						style="width: 84%;background: #228B22;margin: auto;">登陆/注册</button>
				<!-- #endif -->
				
				<!-- #ifdef MP-ALIPAY -->
					<!-- 	type="default"	scope="phoneNumber"	 open-type="getAuthorize" @getAuthorize="onGetAlipayAuthorize"	 -->
					<button type="primary"	@click="onGetAlipayAuthCode"			
						class="btn-row-submit"
						:style="{background:wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color}" 
						style="width: 84%;background: #2E85D8;margin: auto;">登陆/注册</button>
				<!-- #endif -->
				
				<!-- #ifndef MP-WEIXIN || MP-ALIPAY -->	
					<button type="primary"  formType="submit"
						
						@click="btn_user_login"
						
						class="btn-row-submit"
						:style="{background:wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color}" 
						style="width: 84%;background: #2E85D8;margin: auto;">登陆/注册</button>
				<!-- #endif -->	
				
				
					
				<div class="flex mgb-20">
					<div class="cl-black pointer flex-1" 
						style="color: #a2a2a2;font-size: 26rpx;">手机号码首次登录自动注册</div>
				</div>
				<div class="flex mgb-20">
					<navigator class="cl-black pointer flex-1" 
						open-type="navigate" 
						url="/pages/login/login_by_password">手机不在身边？账号密码登录</navigator>
				</div>
			</view>
			<view class="home-p" :style="{background:wxa_shop_nav_bg_color}" @tap="goHome()">
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
				<button open-type="getPhoneNumber" plain="true" 
					class="btn-round bg-success icon weixin-icon" 
					@getphonenumber="btn_wxa_one_click_login"></button>
			</div>
			<!-- #endif -->
			
			<!-- #ifdef MP-BAIDU -->
			<div class="otherBox mgb-20">
				<div class="otherBox-line"></div>
				<div class="otherBox-text">-- 快捷登录 --</div>
			</div>
			<div class="flex flex-center" style="margin-bottom: 200rpx;">				
				<button open-type="getPhoneNumber"
					@getphonenumber="btn_baidu_one_click_login"
					type="primary"
					class="btn-row-submit"
					style="width: 84%;background: #2E85D8;">百度账号快速登录</button>
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
				wxa_login_only_weixin: 0,
				
				//微信和支付宝小程序的 jscode 和 authcode 信息
				login_data_from_wxa_or_alipay:null,
				
				//2021.9.19. 将  获取 js code的过程提前
				current_weixin_js_code:null,
				//2021.12.6. 如果是来自微信的登陆，则同时获取openid
				btnWxaLogin_obj:null,
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
			
			this.abotapi.set_option_list_str(this, this.callback_set_option_list_str);
			
			this.abotapi.get_shop_info_from_server(this.callback_func_for_shop_info);
			
			//刷新验证码图片
			this.click_check();
			
			// #ifdef MP-WEIXIN
			
				this.login_after_get_userinfo = 1;
				
				console.log('uni.login <<<==== btn_wxa_one_click_login');
					  
				uni.login({
					success: function (res) {
						console.log("btn_wxa_one_click_login 获取到的jscode是:" + res.code);
					  
						//如果拒绝授权， e.detail.errMsg
						//console.log(e.detail.errMsg);return;
					  
						that.current_weixin_js_code = res.code;
					  
					},
					fail: function (login_res) {
						console.log('login.js  uni.login失败。');
					}
				});
			
			
			// #endif
			
			
			
			
			
		},
		methods:{
			
			callback_set_option_list_str:function(that,cb_params){
				console.log('cb_params==>',cb_params);
				that.abotapi.getColor();
				
				
				if(!cb_params){
					return;
				}
				
				// #ifdef MP-WEIXIN
				//只有在微信的环境下，才检查此项
				if(cb_params.wxa_login_only_weixin){
					that.wxa_login_only_weixin = cb_params.wxa_login_only_weixin
				}
				// #endif
				
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
			    that.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=get_tokenstr',
					success: function (res) {
						// console.log(res.data);
						that.tokenstr = res.data.tokenstr;		
						//console.log(res.data.tokenstr);			
						that.img_checkcode_url = that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=getverifycodeimg' + '&tokenstr=' + that.tokenstr
					}
				});
			},
			
			
			send_btn:function(){
				var that = this				  
				console.log(1111);
				  
				that.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=sendsms',
					data: {
						mobile: that.mobile,
						verifycode: that.img,
						sellerid: this.abotapi.globalData.default_sellerid,
						//verifycode_sms: that.second,
						tokenstr: that.tokenstr
					},
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
							
							that.img_checkcode_url =  that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=Xiaochengxu&a=getverifycodeimg' + '&tokenstr=' + that.tokenstr
			
						}
					}
				})
			},
			
			__user_login_request_before:function(){
				var that = this;
				
				if (!that.mobile) {
					uni.showToast({
						title: '请输入手机号码！',
						icon: 'fail',
						duration: 2000
					})
					return false;
				}
				
				if (!that.img) {
					uni.showToast({
						title: '请输入图片验证码！',
						icon: 'fail',
						duration: 2000
					})
					return false; 
				}
				
				if (!that.tel) {
					uni.showToast({
						title: '请输入手机验证码！',
						icon: 'fail',
						duration: 2000
					})
					return false;
				}
				
				return true;
			},
			
			//手机验证码登录
			btn_user_login: function (e) {
			    //console.log('getUserInfo button click, and get following msg', e);
			    // console.log(userinfo);
				
				var that = this;
				
				if(!that.__user_login_request_before()){
					return;
				}
				
			   
				
				if(that.login_after_get_userinfo == 1){
					return;
				}
				
				var login_url = that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopApp&a=login';
				var post_data = { 
						mobile: that.mobile,
						verifycode_sms: that.tel,
						sellerid: that.abotapi.globalData.default_sellerid,
						parentid: that.abotapi.get_current_parentid(),
				    };
				
				//#ifdef MP-WEIXIN
					//ShopAppWxa 里面增加了对 jscode的处理逻辑
					login_url = that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=login';
					
					if(that.btnWxaLogin_obj){
						post_data.iv = that.btnWxaLogin_obj.iv;
						post_data.encryptedData = that.btnWxaLogin_obj.encryptedData;
						
						post_data.js_code = that.current_weixin_js_code;
						
						post_data.xiaochengxu_appid = that.abotapi.globalData.xiaochengxu_appid;
						post_data.appid = that.abotapi.globalData.xiaochengxu_appid;
					}
					
					
				//#endif
				
				//#ifdef MP-ALIPAY
					login_url = that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppMpAlipay&a=login';
					
					if(that.login_data_from_wxa_or_alipay){
						
						//post_data.auth_code = that.login_data_from_wxa_or_alipay.auth_code;
						//post_data.alipay_appid = that.login_data_from_wxa_or_alipay.alipay_appid;
						for(var key in that.login_data_from_wxa_or_alipay){
							post_data[key] = that.login_data_from_wxa_or_alipay[key];
						}
						
						console.log('支付宝小程序登录，准备提交的数据：', post_data);
						
					}
				//#endif
				
				that.abotapi.abotRequest({
				    url: login_url,
				    header: {
						"Content-Type": "application/x-www-form-urlencoded"
				    },
				    method: "POST",
				    data: post_data,
				    success: function (request_res) {
						console.log('网址===>>>>'+login_url+' ===>>> ', request_res);
						
						//return;
						
						var data = request_res.data;
						//var res = JSON.parse(data);
						//console.log(res);
						//console.log(request_res.data);
						
						if (request_res.data && (request_res.data.code == 1)){
							console.log("update_mobile : check_button : ");
							console.log('登录成功 返回userid:' + request_res.data.userid);
							
							if(that.current_userinfo){
								that.abotapi.globalData.userInfo = that.current_userinfo;
							}
							else{
								that.abotapi.globalData.userInfo = that.abotapi.get_user_info();
							}
							
							console.log('that.abotapi.globalData.userInfo=====>>>>', that.abotapi.globalData.userInfo);
							
							if(!that.abotapi.globalData.userInfo){
								that.abotapi.globalData.userInfo = {};
							}
				        
							//#ifdef MP-WEIXIN
							//保存openid
							if(request_res.data.openid){
								that.abotapi.globalData.userInfo.user_openid = request_res.data.openid;
								that.abotapi.set_current_openid(request_res.data.openid);
							}
							
							if(!that.abotapi.globalData.userInfo.user_openid && !request_res.data.openid){
								that.abotapi.set_current_openid('userid_openid_' + request_res.data.userid);
							}
							//#endif
							
							//2021.6.20.
							// #ifdef MP-ALIPAY
							console.log('支付宝一键授权成功，user_id:' + request_res.data.alipay_user_id);
							
							uni.setStorage({
								key:'current_alipay_user_id',
								data : request_res.data.alipay_user_id
							});
							
							that.abotapi.globalData.current_alipay_user_id = request_res.data.alipay_user_id;
							
							// #endif
							
							
							that.abotapi.globalData.userInfo.userid = request_res.data.userid;          
							that.abotapi.globalData.userInfo.checkstr = request_res.data.checkstr;
							  
							
							console.log('更新缓存的用户信息:');
							console.log(that.abotapi.globalData.userInfo);
							  
							that.abotapi.set_user_info(that.abotapi.globalData.userInfo);
							
							
							that.getUserInfoFromYanyubao(request_res.data.msg);
							

							  
				 
				        
							
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
				// #ifdef MP-WEIXIN
				
					var that = this;
					
					console.log(e.detail.errMsg)
					console.log(e.detail.iv)
					console.log(e.detail.encryptedData)
						  
					if(!that.current_weixin_js_code){
						uni.showModal({
							title:'提示',
							content:'微信一键登录异常，是否重启小程序？',
							success: (res) => {
								if(res.confirm){
									uni.reLaunch({
										url:'/pages/index/index'
									})
								}
							}
						})
						return;
					}
					
					
					that.abotapi.abotRequest({
						url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=wxa_one_click_login',
						method: "POST",
						dataType: 'json',
						data: {
							js_code: that.current_weixin_js_code,
							xiaochengxu_appid: that.abotapi.globalData.xiaochengxu_appid,
							iv: e.detail.iv,
							encryptedData: e.detail.encryptedData,
							sellerid: that.abotapi.globalData.default_sellerid,
							parentid: that.abotapi.get_current_parentid(),
						},
						success: function (res) {
							console.log(res);
								  
							if (res.data && (res.data.code == 1)) {
								//更新checkstr和uwid，
								
								that.abotapi.globalData.userInfo = that.abotapi.get_user_info();
								if(!that.abotapi.globalData.userInfo){
									that.abotapi.globalData.userInfo = {};
								}
								
								that.abotapi.globalData.userInfo.userid = res.data.userid;
								//this.abotapi.globalData.userInfo.checkstr = res.data.checkstr;
									  
								console.log('一键登录成功，userid:' + res.data.userid);
								console.log('一键登录成功，openid:' + res.data.openid);
									  
								that.abotapi.globalData.userInfo.user_openid = res.data.openid;
								that.abotapi.globalData.userInfo.userid = res.data.userid;
								that.abotapi.globalData.userInfo.checkstr = res.data.checkstr;
								that.abotapi.globalData.userInfo.is_get_userinfo = res.data.is_get_userinfo;
									  
								//保存openid
								that.abotapi.set_current_openid(res.data.openid);
										  
								console.log(that.abotapi.globalData.userInfo);
										  
								that.abotapi.set_user_info(that.abotapi.globalData.userInfo);
									
								that.getUserInfoFromYanyubao(res.data.msg);
								// that.getUserInfo();
								
								/*uni.showToast({
									title: res.data.msg,
									icon: 'success',
									duration: 2000
								})*/
									  
								
								
								
							}
							else {
								//一键登录返回错误代码
								uni.showModal({
									title: '提示',
									content: res.data.msg,
									showCancel:false,
									success(res) {
										if (res.confirm) {
											console.log('用户点击确定');
											
											
											//重新获取js_code
											uni.login({
												success: function (res) {
													console.log("btn_wxa_one_click_login 获取到的jscode是:" + res.code);
												  
													//如果拒绝授权， e.detail.errMsg
													//console.log(e.detail.errMsg);return;
												  
													that.current_weixin_js_code = res.code;
												  
												},
												fail: function (login_res) {
													console.log('login.js  uni.login失败。');
												}
											});
											
											
											
										}
									}
								})		  
							}
						}
					});
					
					
					
				// #endif
				
				
			},
			//获取用户的头像和昵称信息
			btnWxaLoginBind:function(e){
				var that = this;
				
				
				that.btnWxaLogin_obj = {};
				that.btnWxaLogin_obj.iv = e.detail.iv;
				that.btnWxaLogin_obj.encryptedData = e.detail.encryptedData;
				
				
				that.login_after_get_userinfo = 0;
				that.btn_user_login();
				
				
			},			
			//2021.9.19. 这个方法已经不再使用了，微信使用 getUserProfile替代了
			btnWxaGetUserinfo:function(e){
				var that = this;
				
				//console.log(e.detail.errMsg)
				//console.log(e.detail.iv)
				//console.log(e.detail.encryptedData)
					  
				console.log('uni.login <<<==== btnWxaGetUserinfo');
					  
				uni.login({
					success: function (res) {
						console.log("btnWxaGetUserinfo 获取到的jscode是:" + res.code);
					  
						//如果拒绝授权， e.detail.errMsg
						//console.log(e.detail.errMsg);return;
					  
						that.abotapi.abotRequest({
							url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=wxa_get_userinfo',
							method: "POST",
							dataType: 'json',
							data: {
								js_code: res.code,
								xiaochengxu_appid: that.abotapi.globalData.xiaochengxu_appid,
								
								sellerid: that.abotapi.get_sellerid(),
								parentid: that.abotapi.get_current_parentid(),
							},
							success: function (res) {
								console.log(res);
			  
								if (res.data && (res.data.code == 1)) {
									
									console.log('一键登录成功，openid:' + res.data.openid);
									
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
						  
									uni.showToast({
										title: res.data.msg,
										icon: 'success',
										duration: 500
									})
									
			
								}
								
								
								// #ifdef MP-WEIXIN
								
								// #endif
								
								that.login_after_get_userinfo = 0;
								that.btn_user_login();
								
							},
							fail: function (e) {
								uni.showToast({
									title: '网络连接错误~',
									duration: 2000
								});
							},
						});
					  
					},
					fail: function (login_res) {
						console.log('login.js  uni.login失败。');
					}
				});
			},
			
			
			goHome:function(){
				
				
				this.abotapi.call_h5browser_or_other_goto_url('/pages/index/index');
				
				/*
				var that=this;
				uni.switchTab({
					url:'/pages/index/index'
				});
				*/
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
			},
			//获取支付宝的用户ID
			onGetAlipayAuthCode:function(e){
				
				var that = this;
				
				console.log("onGetAlipayAuthCode支付宝小程序中点击了登陆按钮 ===>>>" + e);
				//console.log(that.abotapi.globalData.alipay_third_appid);
				//return;
				
				
				
				if(!that.__user_login_request_before()){
					return;
				}				
				
				
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
						
						that.login_after_get_userinfo = 0;
						that.btn_user_login();
						
						
						
						
						
					},
				});
				
				
			},
			//支付宝的集成登录
			onGetAlipayAuthorize:function(e){
				
				console.log('onGetAlip11111111');
				
				
				
				
				
				my.getOpenUserInfo({
					success: function(res) {
						console.log('alipay getOpenUserInfo success, res: ', res.response);
						//_this.processUserInfo(JSON.parse(res.response).response);
					},
					fail: function(err) {
						console.log('alipay getOpenUserInfo fail, error: ', err);
					}
				});
				
				my.getPhoneNumber({
				    success: (res) => {
				        let encryptedData = res.response;
						
				        console.log(encryptedData);
						
				        my.request({
				            url: '服务端接收地址',
				            data: encryptedData,
				        });
				    },
				    fail: (res) => {
				        console.log(res);
				        console.log('getPhoneNumber_fail');
				    },
				});
				
				
				
				
			},
			
			//2022.3.18. 百度一键登录，从wordpress项目的login.vue文件中移植过来的
			/*
			detail
			:
			encryptedData
			:
			"rkbCbHbCwRGZvJhtmUcPtlQNyq4X8X0l/+oTKUa8BHVcc5lmXGbdK1nnssfSLoT26JWh7T5GRcOuFPKYY7rd3WR9WYT4lQrl1FjziibJ+Mk="
			errMsg
			:
			"getPhoneNumber:ok"
			iv
			:
			"07bcfd5f66103efba3790Q=="*/
			btn_baidu_one_click_login:function(e){
				var that = this;
				
				console.log('百度一键登录 <<<==== btn_baidu_one_click_login  ====>>> 手机号码授权登录：', e);
				
				console.log(e.detail.errMsg)
				console.log(e.detail.iv)
				console.log(e.detail.encryptedData)
				
				if(e.detail.errMsg != 'getPhoneNumber:ok'){
					uni.showModal({
						title:'失败',
						content:'获取手机号码失败',
						showCancel:false
					});
					
					return;
				}
					  
				swan.getLoginCode({
					success: function (res) {
						console.log("btn_baidu_one_click_login 获取到的getLoginCode ==>> jscode是:", res);
					  
						//如果拒绝授权， e.detail.errMsg
						//console.log(e.detail.errMsg);return;
					  
						that.abotapi.abotRequest({
							url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppBaiduSmartApp&a=wxa_one_click_login',
							method: "POST",
							dataType: 'json',
							data: {
								js_code: res.code,
								baidu_smartapp_appid: that.abotapi.globalData.baidu_smartapp_appid,
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
									
									that.getUserInfoFromYanyubao(res.data.msg);
									
									
			
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
			getUserInfoFromYanyubao: function (msg_text) {
				var that = this;
				
				var userInfo = that.abotapi.get_user_info();
				
				if (!userInfo || !userInfo.userid) {
					return;
				}
				
				var post_data = {
				       sellerid: that.abotapi.globalData.default_sellerid,
				       checkstr: userInfo.checkstr,
				       userid: userInfo.userid,
					   parentid: that.abotapi.get_current_parentid(),
				}
				
				
				// #ifdef MP-WEIXIN
					post_data.xiaochengxu_appid = that.abotapi.globalData.xiaochengxu_appid,
					post_data.xiaochengxu_openid = that.abotapi.get_current_openid('userid_openid_' + userInfo.userid);
				// #endif
				
				
				that.abotapi.abotRequest({
				     url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopApp&a=get_user_info',
				     data: post_data,
				     success: function (res) {
						console.log('g=Yanyubao&m=ShopApp&a=get_user_info===>>> getUserInfoFromYanyubao ===>>>', res);
						
						if(res.data.code == 1){ 
							 that.abotapi.set_user_account_info(res.data.data);
						}
						
						
						//========显示登录成功的提示================
															
						uni.showModal({
							title: '提示',
							content: msg_text,
							showCancel: false,
							success: function (res003) {
								//console.log("回调结果"+res.code);
								if (res003.confirm) {		 
									
									
								}
								
								
								//=======检查登录成功之后的跳转=======
								
								var login_last_url = uni.getStorageSync('login_last_url');
								
								if (login_last_url) {
									var var_list = uni.getStorageSync('login_var_list');
									var ret_page = uni.getStorageSync('login_ret_page');
																
									uni.removeStorageSync('login_last_url');
									uni.removeStorageSync('login_var_list');
									uni.removeStorageSync('login_ret_page');
									
									that.abotapi.call_h5browser_or_other_goto_url(login_last_url, var_list, ret_page);
									
									
								}
								else{
									that.abotapi.call_h5browser_or_other_goto_url('/pages/index/index');
								}
								
								
							},  // end of  success
						}); // end of uni.showModal
					
					
					 
				   },
				});   // end of  that.abotapi.abotRequest
				
				
			},  // end of  function getUserInfoFromYanyubao
			
			
		}
	}
</script>

<style>
.send_btn{
	float: right;
	margin-top: -8upx;
	font-size: 24upx;
	padding: 0 40upx;
	/* margin-right: 8upx; */
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
	/* margin-right: 16upx; */
	height: 56upx;
}
	
	
.otherBox {
	position: relative;
	height: 79.2upx;
}

.otherBox-line {
	width: 100%;
	height: 2.2upx;
	/*background-color: #d0d0d0;
	position: absolute;
	*/
	top: 39.6upx;
	
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
	left: 50%;
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
	margin-bottom: 30rpx!important;
}
.flex-center{
	text-align: center;
	margin: 60rpx auto;
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

.cl-black{
	margin-top: 30rpx;
	text-align: right;
	font-size: 30rpx;
	width: 86%;
	margin-left: 7%;
	color:#555555;
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

.btn-row-submit {
	height:100rpx;
	line-height: 100rpx;
}

</style>
