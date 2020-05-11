<template>
	<view class="loginBg">
		<div class="h30"></div>
		<div class="flex-center ">
			<div @click="goHome()" class="flex-center">
				<image src="../../static/img/log.png"  style="width: 150upx;"  mode="widthFix"  class="wh-60"></image>
			</div>
		</div>
		<form class="loginBox"  id="login-form" @submit="formSubmit" :report-submit="true">
			<view class="flexIcon">
				<view class="flexIcon-icon iconfont icon-phone_light flexIcon-icon-current"></view>
				<input type="text" class="flexIcon-text" placeholder-class="cl-white" name="telephone" @input="accountInput" placeholder="请输入账号" />
			</view>
	  
	  
			<view class="flexIcon">
				<view class="flexIcon-icon iconfont icon-password flexIcon-icon-current"></view>
				<input type="password" class="flexIcon-text"  name="password"  placeholder-class="cl-white" @input="passInput"  placeholder="请输入密码" />
			</view>
	  
	  
			<view class="flexIcon">
			<view class="flexIcon-icon iconfont icon-moban flexIcon-icon-current"></view>
				<image @click="click_check" :src="img_checkcode_url"  class="img_checkcode" mode="widthFix" style="width: 30%;"></image>
				<input type="text" class="flexIcon-text" placeholder-class="cl-white" name="telephone" @input="imgInput" placeholder="请输入答案" />
			</view>
	  
			<div></div>
			<button type="primary"  formType="submit" open-type="getUserInfo" class="btn-row-submit" @click="btn_user_login">登陆</button>
			<div class="flex mgb-20">
				<navigator class="cl-black pointer flex-1" style="margin-top: 30upx;text-align: right;font-size: 34upx;" url="/pages/login/login">手机验证码登录</navigator>
			</div>
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
				account: ''
			}
		},
		onLoad:function(){
		
			var userInfo = this.abotapi.get_user_info();
			this.abotapi.set_option_list_str(null, this.abotapi.getColor());
			if(userInfo && userInfo.userid){
				uni.switchTab({
					url: '/pages/home/home'
				})
			}
			this.click_check();
			
			
		},
		methods:{
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
			
			
			    uni.request({
			      url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopApp&a=get_tokenstr',
			      header: {
			        "Content-Type": "application/x-www-form-urlencoded"
			      },
			      method: "POST",
			      success: function (res) {
			        // console.log(res.data);
			
			        that.tokenstr = res.data.tokenstr;		
			        //console.log(res.data.tokenstr);			
					that.img_checkcode_url = that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=getverifycodeimg' + '&tokenstr=' + that.tokenstr
			        // that.setData({
			        //   img_checkcode_url: 
			        // });
			      }
			    });
			
			  },

			
			
			btn_user_login: function (userinfo) {
			    console.log('getUserInfo button click, and get following msg');
			    console.log(userinfo);
			    if (!this.account) {
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
			    if (!this.password) {
					uni.showToast({
						title: '请输入密码！',
						icon: 'fail',
						duration: 2000
					})
					return;
			    }
				
				var that = this;
				//console.log(code+'hehe');
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopApp&a=login_by_password',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method: "POST",
					data: { 
						account: that.account,
						password: that.password,
						tokenstr: that.tokenstr,
						verifycode: that.img,
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
							
							that.abotapi.globalData.userInfo.userid = request_res.data.userid;          
							that.abotapi.globalData.userInfo.checkstr = request_res.data.checkstr;
							  
				      
					
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
					 
										var page_type = uni.getStorageSync('page_type');
										if (last_url) {
											if (page_type && (page_type == 'switchTab')) {
					 
												uni.switchTab({
													url: last_url,
												})
											}else {
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
											url: '../home/home'
										})
									}
								}
							});
						}else {
							console.log(request_res);
							uni.showToast({
								title: '登录失败',
								icon: 'fail',
								duration: 2000
							});
						}
				    
						console.log("延誉宝服务器解析jscode并返回以下内容：");
						console.log(request_res);
						// this.abotapi.globalData.user_openid = request_res.data.openid;
						that.abotapi.globalData.tokenstr = request_res.data.tokenstr;
					}
				});
			    
			},
			  
			goHome:function(){
				var that=this;
				that.abotapi.goHome();
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
				 
			}

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
	margin-top: 60upx;
}
.btn-row-submit{
	width: 100%;
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
	background-color: #2e85d8;
	margin-bottom: 44upx;
	border-radius: 44upx;
	padding: 22upx 22upx;
	align-items: center;
}

.flexIcon-icon {
	margin-right: 13.2upx;
	font-size: 39.6upx;
	color: #fff;
}

.flexIcon-text {
	color: #fff;
	border: 0;
	flex: 1;
	background:inherit;
	outline: 0;
	font-size: 35.2upx;
}
 
.loginBox {
	position: absolute;
	top: 50%;
	left: 22upx;
	right: 22upx;
	margin-top: -330upx;
	padding: 33upx 22upx;

	border-radius: 44upx;
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



</style>
