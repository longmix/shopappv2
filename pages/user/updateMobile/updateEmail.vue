<template>
	<view class="container">

		<view class="section1" style="border: 0; background-color: #ffffff;" v-if="current_email">
			当前Email：{{current_email}}
		</view>

		<view class="section1">
			<input type="text" placeholder="请输入新Email" v-model="email_address" auto-focus />
		</view>
		<view class="section3">

			<image @tap="click_check" :src="img_checkcode_url"></image>
			<input type="number" placeholder="请输入答案" v-model="img" auto-focus />

		</view>
		<view class="section2">
			<input type="number" placeholder="收到的验证码" v-model="verifycode_email" auto-focus />
			<button type="primary" :disabled="disabled" @tap="send_btn" class="send_btn"
				:style="{background:wxa_shop_nav_bg_color, color:wxa_shop_nav_font_color}">{{second}}</button>
		</view>

		<button type="primary" @tap="check_button" class="weui-btn"
			:style="{background:wxa_shop_nav_bg_color, color:wxa_shop_nav_font_color}">设置Email地址</button>

	</view>


</template>

<script>
	function countdown(that) {
		var timer001 = that.timer001;
		if (timer001 == 0) {
			//倒计时结束,恢复按钮可点击状态,同时内容设置为为 发送邮件

			that.second = '发送验证码';
			that.timer001 = 60;
			that.disabled = false
			that.js_code = '';
			that.shop_icon = '';

			return;
		}

		var time = setTimeout(function() {
			that.second = '重新发送(' + timer001 + ')';
			that.timer001 = timer001 - 1;
			countdown(that);
		}, 1000)
	}
	export default {
		data() {
			return {
				second: '发送验证码',
				disabled: false,
				timer001: 60,
				email_address: '', //手机号
				img: '', //图片验证码
				verifycode_email: '', //手机验证码
				img_checkcode_url: '',
				wxa_shop_nav_bg_color: '',
				wxa_shop_nav_font_color: '',

				//2023.2.5.
				current_email: null,
			};
		},
		onLoad(options) {
			var that = this

			uni.setNavigationBarTitle({
				title: '更换Email地址'
			});

			if (options.current) {
				this.current_email = options.current;
			}


			this.userAcountInfo = this.abotapi.get_user_account_info();
			this.email_address = this.userAcountInfo.email_address || '';

			this.abotapi.set_option_list_str(this, function(that001, option_list) {

				//that.abotapi.getColor();

				console.log('option_list', option_list);

				that001.wxa_shop_nav_bg_color = option_list.wxa_shop_nav_bg_color;
				that001.wxa_shop_nav_font_color = option_list.wxa_shop_nav_font_color;
			});

			// 页面初始化 options为页面跳转所带来的参数
			uni.request({
				url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopApp&a=get_tokenstr',
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				method: "POST",
				success: function(res) {
					//console.log(res.data);
					that.abotapi.globalData.tokenstr = res.data.tokenstr;

					that.img_checkcode_url = that.abotapi.globalData.yanyubao_server_url +
						'/?g=Yanyubao&m=ShopApp&a=getverifycodeimg' + '&tokenstr=' + res.data.tokenstr;


				}
			})


		},
		methods: {

			click_check: function(e) {
				var that = this

				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopApp&a=get_tokenstr',
					success: function(res) {
						// console.log(res.data);

						that.abotapi.globalData.tokenstr = res.data.tokenstr;

						that.img_checkcode_url = that.abotapi.globalData.yanyubao_server_url +
							'/?g=Yanyubao&m=ShopApp&a=getverifycodeimg' + '&tokenstr=' + res.data.tokenstr


					}
				});

			},



			check_button: function() {
				var that = this
				var userInfo = that.abotapi.get_user_info();

				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopApp&a=set_user_email',
					data: {
						sellerid: that.abotapi.get_sellerid(),
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						new_email_address: this.email_address,
						verifycode_email: this.verifycode_email,
					},
					success: function(request_res) {
						//console.log('更新缓存的用户信息');
			
						uni.showModal({
							title: '提示',
							content: request_res.data.msg,
							showCancel: false,
							success: function(res) {
								
								if (request_res.data.code == 1) {
									that.userAcountInfo.email = that.email_address;
									
									that.abotapi.set_user_account_info(that.userAcountInfo);
									
									uni.redirectTo({
										url: '/pages/user/setting/setting'
									})
									return;
								}

							}
						})

					}
				});

			},

			send_btn: function(e) {
				var that = this
				var userInfo = that.abotapi.get_user_info();

				console.log(1111);
				//检查Email地址是否正确
				if (!this.email_address) {
					uni.showToast({
						title: '请输入Email地址！',
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
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopApp&a=send_email_change_new',
					data: {
						sellerid: that.abotapi.get_sellerid(),
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						email_address: that.email_address,
						verifycode: that.img,
						tokenstr: that.abotapi.globalData.tokenstr
					},					
					success: function(request_data) {

						console.log(request_data.data)

						if (request_data.data.code == 1) {
							//console.log(1111);

							//将按钮设置为不可点击状态,同时显示倒计时
							//this.data.second = 60;
							//disabled="{{disabled}}"
							countdown(that);
							//that = !that;
							that.disabled = true;
							//=====end======

							uni.showModal({
								title: '提示',
								content: request_data.data.msg,
								showCancel: false
							});

						} else {
							uni.showToast({
								title: request_data.data.msg,
								icon: 'fail',
								duration: 5000
							});

							that.abotapi.globalData.tokenstr = request_data.data.tokenstr;
							that.img_checkcode_url = that.abotapi.globalData.yanyubao_server_url +
								'/?g=Yanyubao&m=ShopApp&a=getverifycodeimg' + '&tokenstr=' + request_data
								.data.tokenstr

						}
					}
				})
			},

		}
	}
</script>

<style lang="scss">
	@import url("../static/css/user.css");


	/* pages/update_mobile/update_mobile.wxss */
	page {
		background-color: #F0F0F0;
	}
	
	.from-list {
		width: 100%;

	}

	.section1 {
		width: 90%;
		height: 96rpx;
		line-height: 96rpx;
		background-color: #fff;
		margin: 40rpx auto 0;
		border-bottom: 2rpx solid #ECECEC;
		border: 2rpx solid #17A8E2;
		border-radius: 42rpx;
		overflow: hidden;

	}

	.section1 input {
		width: 80%;
		height: 80rpx;
		padding: 6rpx 40rpx;
	}

	.section2 {
		width: 90%;
		height: 96rpx;
		background-color: #fff;
		margin: 40rpx auto 0;
		position: relative;
		border: 2rpx solid #17A8E2;
		border-radius: 42rpx;
		overflow: hidden;
	}

	.section2 input {
		width: 71%;
		height: 80rpx;
		padding: 6rpx 40rpx;
		margin: 0 0 0;

	}

	.send_btn {
		width: 240rpx;
		height: 80rpx;
		line-height: 80rpx;
		position: absolute;
		top: 8rpx;
		left: 60%;
		font-size: 28rpx;
	}

	.section3 {
		width: 90%;
		height: 96rpx;
		background-color: #fff;
		margin: 40rpx auto 0;
		position: relative;
		border: 2rpx solid #17A8E2;
		border-radius: 42rpx;
		overflow: hidden;
	}

	.section3 image {
		width: 25%;
		height: 68rpx;
		line-height: 60rpx;
		padding-top: 13rpx;
		margin-left: -73rpx;
		float: right;
		margin-top: 5rpx;
		margin-right: 20rpx;

	}

	.section3 input {
		width: 60%;
		height: 80rpx;
		margin: 6rpx 30rpx;
		float: left;
	}
</style>
