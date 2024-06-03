<template>
	<view>
	<!--pages/scan_qrcode/scan_change_mobile.wxml-->
	<view class='box'>
	 <view>短视频+定位 二维码编号：{{orderno}}</view>
	</view>
	 <view style='text-align:center;margin:50rpx auto;color:#666; font-size:30rpx;display:none;'>{{shop_list.name}}</view>
	<form @submit="formSubmit" report-submit="true">
	<view class="section1">
	<input type="number" @input="phoneInput" disabled='disabled' :value="'原手机号：'+ oldmobile" name="mobile" confirm-type="next" />
	 
	</view>
	<view class="section1">
	  <input type="number" @input="phoneInput"  placeholder="请输入新手机号" :value="mobile" name="mobile" confirm-type="next" />
	 
	</view>
	<view class="section3">
	  
	  <image @tap="click_check" :src="img_checkcode_url"></image>
	  <input type="number" placeholder="请输入算术题答案"  @input="imgInput" confirm-type="next" />
	 
	</view>
	<view class="section2">
	  <input type="number" name="verifycode_sms"  placeholder="请输入手机验证码"  @input="telInput" confirm-type="next"  />
	  <button type="primary" :disabled="disabled" @tap="send_btn" class="send_btn">{{second}}</button>
	</view>
	<view>
	<button type="primary" @tap="btn_user_login"  formType="submit" class="check_btn" >更换手机号</button>
	</view>
	</form>
	
	<view class='box' style="height: 420rpx;margin-top: 100rpx;font-size:35rpx;text-align: left;line-height: 40rpx;margin-bottom: 120rpx;">
	 <view>首先，您需要绑定短视频+定位 二维码编号，然后，您可以选择2种通知方式，1：短信通知，是收费的  2：微信通知，永久免费，需要您关注微信公众号：关爱老人智能定位短视频+定位 二维码编号，然后按照提示回复验证码，就可以了。</view>
	</view>
	<button type="primary" @tap="btn_goto_user_center"  formType="submit" class="check_btn" >绑定微信通知</button>
	
	

</view>
</template>

<script>
export default {
	data(){
		return{
			second: '发送短信',
			mobile: "",
			disabled: false,
			timer001: 60,
			js_code: '',
			tokenstr: '',
			orderno:'',
		};
	},
	onLoad(options) {
		var that = this;
	
		that.abotapi.set_option_list_str(null, that.abotapi.getColor());

		if (options.orderno) {
		var oldmobile = options.mobile
		var reg = /(\d{3})\d{4}(\d{4})/;
		var oldmobile = oldmobile.replace(reg, "$1****$2")
		
			that.orderno = options.orderno;
			that.oldmobile = oldmobile;
			
		}
	
		that.abotapi.get_shop_info_from_server(function (shop_info_list) {
			
			that.shop_list = shop_info_list;
			
		});
	
		// 页面初始化 options为页面跳转所带来的参数
		that.abotapi.abotRequest({
			url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_tokenstr',
			method: "POST",
			success: function (res) {
			
				that.tokenstr = res.data.tokenstr;
				that.img_checkcode_url = app.globalData.http_server + '?g=Yanyubao&m=ShopAppWxa&a=getverifycodeimg' + '&tokenstr=' + that.data.tokenstr
				
			}
		})
	
		uni.getStorage({
			key: 'userListInfo',
			success: function (res) {
				if (res.data) {
					console.log(res.data[2].content);
					
					that.mobile = res.data[2].content;

				}

			}
		})
	},
	onShow() {
		
	},
	methods:{
		btn_user_login: function (userinfo) {
			var that = this
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
				url: that.abotapi.globalData.yanyubao_server_url  + '/openapi/Jianghanyinhua/change_mobile_num',
				method: "POST",
				data: {
					openid: that.abotapi.get_current_openid(),
					appid: that.abotapi.globalData.xiaochengxu_appid,   
					mobile: that.mobile,
					sms_code: that.tel,
					orderno: that.orderno,
					sellerid: that.abotapi.globalData.default_sellerid,
				},
				success: function (res) {
					console.log('res', res)
					uni.showModal({
						title: '提示',
						content: res.data.msg,
						showCancel: false,
						success: function (res2) {
							uni.switchTab({
								url: '/pages/index/index',
							})
						}
					})
				}
			});
		},
		click_check: function (e) {
			
			var that = this

			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_tokenstr',
				method: "POST",
				success: function (res) {
					
					that.tokenstr = res.data.tokenstr;
					that.img_checkcode_url = that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=getverifycodeimg' + '&tokenstr=' + that.tokenstr
				
				}
			});
	
		},
		phoneInput: function (e) {
			console.log('Phone=' + e.detail.value)
			this.mobile = e.detail.value;
		},
		imgInput: function (e) {
			console.log('img=' + e.detail.value)
			this.img = e.detail.value;
		},
		telInput: function (e) {
			console.log('tel=' + e.detail.value)
			this.tel = e.detail.value;
		},
		formSubmit: function (event) {
			
		},
		send_btn: function (e) {
			var that = this
	
			//检查手机号码是否正确
			if (!that.mobile) {
				uni.showToast({
					title: '请输入手机号码！',
					icon: 'fail',
					duration: 2000
				})
				return;
			}
	
			if (!that.img) {
				uni.showToast({
					title: '请输入图片验证码！',
					icon: 'fail',
					duration: 2000
				})
				return;
			}
	
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/Jianghanyinhua/send_verify_code_sms',
				data: {
					mobile: that.mobile,
					verifycode: that.img,
					tokenstr: that.tokenstr
				},
				method: "POST",
				success: function (request_data) {
					console.log(request_data.data)
					if (request_data.data.code == 1) {
						//将按钮设置为不可点击状态,同时显示倒计时
						that.countdown(that);
	
						that.disabled= true
						//=====end======
	
						uni.showModal({
							title: '提示',
							content: request_data.data.msg,
							showCancel: false,
						})
	
					} else {
						uni.showModal({
							title: '提示',
							content: request_data.data.msg,
							showCancel: false,
						})
	
						that.tokenstr = request_data.data.tokenstr;
	
						that.img_checkcode_url = that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=Xiaochengxu&a=getverifycodeimg' + '&tokenstr=' + that.data.tokenstr
						
					}
				}
			})
		},
		btn_goto_user_center:function(){
			uni.switchTab({
				url: '/pages/tabbar/user',
			})
		},
		countdown:function(that) {
			var timer001 = that.timer001;
			if (timer001 == 0) {
				//倒计时结束,恢复按钮可点击状态,同时内容设置为为 发送短信
				that.second = '发送短信',
				that.timer001 =  60,
				that.disabled =  false,
				that.js_code =  '',
				that.shop_icon = ''
				
				return;
			}
		
			var time = setTimeout(function () {
				that.second= '重新发送(' + timer001 + ')',
				that.timer001= timer001 - 1,
				console.log('aaaaaaaaaaaaa', timer001);
				that.countdown(that);
			}
				, 1000)
		}
	}
}
</script>

<style>
	/* pages/scan_qrcode/scan_change_mobile.wxss */
	page{
	    background-color:#F0F0F0;
	    font-size:28rpx;
	}
	
	.box {
	  width:100%;
	  text-align: center;
	  font-size: 40rpx;
	}
	.box view{
	  height:85rpx;
	  line-height:85rpx;
	  background-color:#fff;
	  padding:13px;
	  text-align: initial;
	}
	
	.from-list{
	    width:100%;
	   
	}
	
	.section1{
	    width:100%;
	    height:100rpx;
	    background-color:#fff;
	    margin:28rpx auto 0;
	    border-bottom: 1px solid #ECECEC;
	    font-size: 40rpx;
	}
	.section1 input{
	    width:80%;
	    height:100rpx;
	    padding-left:40rpx;
	}
	.section2{
	    width:100%;
	    height:100rpx;
	    background-color:#fff;
	    margin:28rpx 0 0;
	    position:relative;
	    font-size: 40rpx;
	}
	.section2 input{
	    width:70%;
	    height:100rpx;
	    padding-left:40rpx;
	    margin:0 0 0;
	}
	.send_btn{
	    width:240rpx;
	    height:80rpx;
	    line-height:80rpx;
	    position:absolute;
	    top:8rpx;
	    left:60%;
	    font-size: 40rpx;
	}
	.section3{
	    width:100%;
	    height:100rpx;
	    background-color:#fff;
	    margin:28rpx 0 0;
	    position:relative;
	    font-size: 40rpx;
	}
	.section3 image{
	    width:26%;
	    height:80rpx;
	    line-height:60rpx;
	    padding-top:8rpx;
	    margin-left:40rpx;
	    float:left;
	}
	.section3 input{
	    width:65%;
	    height:100rpx;
	    margin-left:20rpx;
	    float:left;
	}
	
	.check_btn{
	    margin:20rpx auto;
	    width:85%;
	    height:100rpx;
	    background-color:orange;
	    line-height:100rpx;
	    color:#FFF;
	    font-size: 40rpx;
	}
	.check_btn2{
	    margin:50px auto;
	    width:80%;
	    height:40px;
	    background-color:orange;
	    line-height:40px;
	    color:#FFF;
	}

</style>