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
			<view class="flexIcon" :style="{border:'1px solid ' + wxa_shop_nav_bg_color}">
				<view class="flexIcon-icon iconfont icon-phone_light flexIcon-icon-current"></view>
				<input type="text" class="flexIcon-text" placeholder-style="color: #999;" name="telephone" @input="accountInput" placeholder="请输入账号" />
			</view>
	  
	  
			<view class="flexIcon" :style="{border:'1px solid ' + wxa_shop_nav_bg_color}">
				<view class="flexIcon-icon iconfont icon-password flexIcon-icon-current"></view>
				<input type="text" password class="flexIcon-text"  name="password"  placeholder-style="color: #999;" @input="passInput"  placeholder="请输入密码" />
			</view>
	  
	  
			<view class="flexIcon" :style="{border:'1px solid ' + wxa_shop_nav_bg_color}">
			<view class="flexIcon-icon iconfont icon-moban flexIcon-icon-current"></view>
				<image @click="click_check" :src="img_checkcode_url"  class="img_checkcode" mode="widthFix"></image>
				<input type="text" class="flexIcon-text" placeholder-style="color: #999;" name="telephone" @input="imgInput" placeholder="请输入答案" />
			</view>
	  
			<div></div>
			
			<!-- #ifdef MP-WEIXIN -->
				<!--<button type="primary" class="btn-row-submit" 
					:style="{background:wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color}" 
					
					open-type="getUserInfo"  @getuserinfo="btnWxaGetUserinfo"
					
					style="margin-left: 8%;"
					formType="submit" >登陆</button>-->
				<button type="primary" class="btn-row-submit"
					:style="{background:wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color}" 
					@tap="btnWxaLogin"
					style="margin-left: 8%;"
					formType="submit" >登陆</button>
				
					
			<!-- #endif -->
			
			<!-- #ifdef MP-ALIPAY -->
				<!-- 	type="default"	scope="phoneNumber"	 open-type="getAuthorize" @getAuthorize="onGetAlipayAuthorize"	 -->
				<button type="primary"	@click="onGetAlipayAuthCode"			
					class="btn-row-submit"
					:style="{background:wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color}" 
					style="width: 84%;background: #2E85D8;margin: auto;">登陆/注册</button>
			<!-- #endif -->
			
			<!-- #ifndef MP-WEIXIN || MP-ALIPAY -->
				<button type="primary" class="btn-row-submit"
					:style="{background:wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color}" 
					
					@click="btn_user_login"
					
					style="margin-left: 8%;"
					formType="submit" >登陆</button>
			<!-- #endif -->	
				
			<div class="flex mgb-20">
				<navigator class="cl-black pointer flex-1" open-type="redirect" url="/pages/login/login">忘记密码？手机验证码登录</navigator>
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
				password: '',
				account: '',
				
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
			
			this.click_check();
			
			this.abotapi.set_option_list_str(this, this.callback_set_option_list_str);
			
			//this.abotapi.get_shop_info_from_server(this.callback_func_for_shop_info);
			
			// #ifdef MP-WEIXIN
			this.login_after_get_userinfo = 1;
			// #endif
			
			
			
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
			
			accountInput:function(e){
				//console.log('Phone=',e)
				this.account = e.detail.value;
			},		
			imgInput: function (e) {
				//console.log('img=' + e.detail.value)
				this.img = e.detail.value;
			},

			passInput: function (e) {
				//console.log('tel=' + e.detail.value)
				this.password = e.detail.value;
			},
			
			click_check: function (e) {
			
			    var that = this
			
			
			    that.abotapi.abotRequest({
			      url: this.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopApp&a=get_tokenstr',
			      success: function (res) {
			        // console.log(res.data);
			
			        that.tokenstr = res.data.tokenstr;		
			        //console.log(res.data.tokenstr);			
					that.img_checkcode_url = that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=getverifycodeimg' + '&tokenstr=' + that.tokenstr
			        // that.setData({
			        //   img_checkcode_url: 
			        // });
			      }
			    });
			
			},

			__user_login_request_before:function(){
				var that = this;
				
				console.log('btn_user_login btn_user_login btn_user_login btn_user_login');
				
				if (!that.account) {
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
				if (!that.password) {
					uni.showToast({
						title: '请输入密码！',
						icon: 'fail',
						duration: 2000
					})
					return false;
				}
				
				
				return true;
			},
			
			btn_user_login: function () {
			    
				
				
				var that = this;
				//console.log(code+'hehe');
				
				if(that.login_after_get_userinfo == 1){
					return;
				}
				
				if(!that.__user_login_request_before()){
					return;
				}
				
				
				
				var login_url = that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopApp&a=login_by_password';
				var post_data = { 
						account: that.account,
						password: that.password,
						tokenstr: that.tokenstr,
						verifycode: that.img,
						sellerid: this.abotapi.globalData.default_sellerid,
						parentid: that.abotapi.get_current_parentid(),
				    };
				
				//#ifdef MP-WEIXIN
					//ShopAppWxa 里面增加了对 jscode的处理逻辑
					login_url = that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=login_by_password';
					
					
					
				//#endif
				
				//#ifdef MP-ALIPAY
					login_url = that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppMpAlipay&a=login_by_password';
					
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
					data: post_data,
					success: function (request_res) {
						console.log('login_by_password=====>>>>>', request_res);
						
						var data = request_res.data;
						
						//var res = JSON.parse(data);
						//console.log(res);
						
						if(!data){
							uni.showModal({
								title: '登录失败',
								content: '登录失败！',
								showCancel: false,
							})
							
							return;
						}

						
						if (request_res.data.code != 1){
							
							that.tokenstr = request_res.data.tokenstr;
							that.abotapi.globalData.tokenstr = request_res.data.tokenstr;
							
							
							uni.showModal({
								title: '登录失败',
								content: data.msg,
								showCancel: false,
							})
							
							return;
						}
						
							
						if(that.current_userinfo){
							that.abotapi.globalData.userInfo = that.current_userinfo;
						}
						else{
							that.abotapi.globalData.userInfo = that.abotapi.get_user_info();
						}
						
						console.log('that.abotapi.globalData.userInfo=====>>>>', that.abotapi.globalData.userInfo);
						
						//that.abotapi.globalData.userInfo = that.abotapi.get_user_info();
						
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
						
						var post_data = {
							   sellerid: that.abotapi.globalData.default_sellerid,
							   checkstr: request_res.data.checkstr,
							   userid: request_res.data.userid,
							   parentid: that.abotapi.get_current_parentid(),
							 };
							 
						// #ifdef MP-WEIXIN
							post_data.xiaochengxu_appid = that.abotapi.globalData.xiaochengxu_appid,
							post_data.xiaochengxu_openid = that.abotapi.get_current_openid('userid_openid_' + request_res.data.userid);
						// #endif
						
						
						that.abotapi.abotRequest({
							 url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopApp&a=get_user_info',
							 data: post_data,
							 success: function (res) {
								console.log('login_by_password=====>>>>>get_user_info===>>>>', res);
								 
								var	data = res.data;
								 
								if(data.code != 1){
									return;
								}
								
								
								that.abotapi.set_user_account_info(data.data);
								
								//========显示登录成功的提示================	 
								
								//=======检查登录成功之后的跳转=======
								var login_last_url = uni.getStorageSync('login_last_url');
								
								if (login_last_url) {
									var var_list = uni.getStorageSync('login_var_list');
									var ret_page = uni.getStorageSync('login_ret_page');
									
									
									
									uni.removeStorageSync('login_last_url');
									uni.removeStorageSync('login_var_list');
									uni.removeStorageSync('login_ret_page');
									
									//===========End================
								}									
								else{
									login_last_url = '/pages/index/index';
								}
								
								uni.showModal({
									title: '提示',
									content: request_res.data.msg,
									showCancel: false,
									success: function (res) {
										//console.log("回调结果"+res.code);
										if (res.confirm) {		 
											that.abotapi.call_h5browser_or_other_goto_url(login_last_url, var_list, ret_page);
										}
									}
								});
							}
						})
			 
						
						
					}
				});
			    
			},
			btnWxaLogin:function(e){
				var that = this;
				
				// #ifdef MP-WEIXIN
				that.login_after_get_userinfo = 0;
				that.btn_user_login();
				// #endif
			},
			//获取用户的头像和昵称信息
			//2021.9.19. 这个方法已经不再使用了，微信使用 getUserProfile替代了
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
					  
						that.abotapi.abotRequest({
							url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=wxa_get_userinfo',
							method: "POST",
							dataType: 'json',
							data: {
								js_code: res.code,
								xiaochengxu_appid: that.abotapi.globalData.xiaochengxu_appid,
								iv: e.detail.iv,
								encryptedData: e.detail.encryptedData,
								sellerid: that.abotapi.globalData.default_sellerid,
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
								that.login_after_get_userinfo = 0;
								that.btn_user_login();
								// #endif
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
				
				// #endif
			},			
			  
			goHome:function(){
				var that = this;
				
				this.abotapi.call_h5browser_or_other_goto_url('/pages/index/index');
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
	margin-top: 30rpx;
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

.btn-row-submit {
	height:100rpx;
	line-height: 100rpx;
}

</style>
