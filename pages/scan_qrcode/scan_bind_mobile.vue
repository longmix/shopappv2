<template>
	<view>
	<!--pages/scan_qrcode/scan_bind_mobile.wxml-->
	<view class='box'>
	 <view>产品码编号：{{orderno}}</view>
	</view>
	 <view style='text-align:center;margin:50rpx auto;color:#666; font-size:30rpx;display:none;'>{{shop_list.name}}</view>
	<form bindsubmit="formSubmit" report-submit="true">
	<view class="section1">
	  <input type="number" @input="phoneInput"  placeholder="请输入要绑定的手机号码" :value="mobile" name="mobile" confirm-type="next" />
	 
	</view>
	<view class="section3">
	  
	  <image @tap="click_check" :src="img_checkcode_url"></image>
	  <input type="number" placeholder="请输入算术题答案"  @input="imgInput" confirm-type="next" />
	 
	</view>
	<view class="section2">
	  <input type="number" name="verifycode_sms"  placeholder="请输入手机验证码"  @input="telInput" confirm-type="next"  />
	  <button type="primary" :disabled="send_btn_disabled" @tap="send_btn" class="send_btn">{{send_btn_second}}</button>
	</view>
	<view>
	<button type="primary" @tap="btn_user_login"  formType="submit" class="check_btn" >绑定手机号</button>
	</view>
	</form>
</view>
</template>

<script>
export default {
	data(){
		return{
			orderno:'',
			
			
			send_btn_second: '发送短信',
			
			mobile: "",  //手机号码
			img:'',   //图片验证码
			tel:'',   //短信验证码
			
			send_btn_disabled: false,
			timer001: 60,
			js_code: '',
			tokenstr: '',
			img_checkcode_url:''
		};
	},
	onLoad(options) {
		var that = this;
		
		if (options.orderno) {
			that.orderno = options.orderno;
			
			
		}

	
			
		// 页面初始化 options为页面跳转所带来的参数
		that.abotapi.abotRequest({
			url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_tokenstr',
			method: "POST",
			success: function (res) {
				
				that.tokenstr = res.tokenstr;

				that.img_checkcode_url = that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=getverifycodeimg' + '&tokenstr=' + that.tokenstr;
			
			}
		})

		uni.getStorage({
			key: 'userListInfo',
			success: function (res) {
				if (res.data) {
					
					that.mobile = res.data[2].content;

				}

			}
		})
	},
	onShow() {
		
	},
	methods:{
		
		countdown:function() {
		  var that = this;
			
		  var timer001 = that.timer001;
		  
		  if (timer001 == 0) {
		    //倒计时结束,恢复按钮可点击状态,同时内容设置为为 发送短信
			that.send_btn_second = '发送短信';
			that.timer001 = 60;
			that.send_btn_disabled = false;
			
		    return;
		  }
		
		  var time = setTimeout(function () {
			  that.send_btn_second = '重新发送(' + timer001 + ')';
			  
			  that.timer001 = that.timer001 - 1;
			  
			  that.countdown();
		  }
		    , 1000)
		},
		btn_user_login: function () {
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
				url: that.abotapi.globalData.yanyubao_server_url +  '/openapi/Jianghanyinhua/change_mobile_num',
				method: "POST",
				data: {
					openid: that.abotapi.get_current_openid(),
					appid: that.abotapi.globalData.xiaochengxu_appid,   
					mobile: that.mobile,
					sms_code: that.tel,
					orderno: that.orderno,
					sellerid: that.abotapi.get_sellerid()
				},
				success: function (res) {
					console.log('1212121212156',res.data.msg);
					console.log('change_mobile_num res', res);
					
	
					uni.showModal({
						title: '提示',
						content: res.data.msg,
						showCancel: false,
						success: function (res2) {
							
							if(res.data.code == 0){
								return;
							}
				 
							uni.switchTab({
								url: '/pages/index/index',
							})
						},
						
					})
					
				},
				
			});
		},
		click_check: function (e) {
			var that = this;

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
	
	
			console.log('aaaaaaaaaaaaaaaaaaa');
			console.log(event.detail.formId);
			
			var that = this;
			
			//that.setData({
			//	formId: event.detail.formId
			//});
	
	
		},
		send_btn: function (e) {
			var that = this
	
			//console.log(1111);
			
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
					
					console.log('send_verify_code_sms ===>>> ' + request_data.data)
					
					if (request_data.data.code == 1) {
						//将按钮设置为不可点击状态,同时显示倒计时
						that.countdown();
	
						that.send_btn_disabled = true
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
	
						that.img_checkcode_url = that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=Xiaochengxu&a=getverifycodeimg' + '&tokenstr=' + that.tokenstr;
						
					}
				}
			})
		},

	}
}
</script>

<style>
	/* pages/scan_qrcode/scan_bind_mobile.wxss */
	page{
	    background-color:#F0F0F0;
	    font-size:28rpx;
	}
	
	.box {
	  width:100%;
	  text-align: center;
	  font-size: 35rpx;
	}
	.box view{
	  height:85rpx;
	  line-height:85rpx;
	  background-color:#fff;
	  padding:13px;
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
	    width:300rpx;
	    height:80rpx;
	    line-height:80rpx;
	    position:absolute;
	    top:8rpx;
	    left:56%;
	    font-size:40rpx;
		z-index: 999;
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
	    font-size: 40rpx;
	    color:#FFF;
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