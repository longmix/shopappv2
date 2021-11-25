<template>

	<!--pages/login/login.wxml-->
	<view class="page" style='width:100%;overflow-x:hidden;background:#fff;' :style="{height:windowHeight+'px'}">
		<view class='box'>
			<image :src="wxa_shop_operation_logo_url" mode="widthFix"></image>
		</view>



		<view class='shouquan-con'>
			<view class='open-con'>
				<open-data type="userAvatarUrl" class="userinfo-avatar"></open-data>
				<open-data type="userNickName" class="userinfo-userNickName"></open-data>
			</view>

			<image class="shouquan-a" mode="widthFix" src="https://yanyubao.tseo.cn/Tpl/static/images/double_arrow_right.png"></image>
			<image class="shouquan-b" src="https://yanyubao.tseo.cn/Tpl/static/images/wxa.png"></image>
		</view>

		<!-- #ifdef MP-WEIXIN -->
		<!-- <button open-type="getUserInfo" plain="true" 
			@getuserinfo="btn_one_click_get_userinfo" 
			class="check_btn2" 
			style="background-color:#07C160; color:#ffffff;border:1px solid #fff;">授权获取头像和昵称</button> -->
		<button plain="true"
			@tap="btn_one_click_get_userinfo" 
			class="check_btn2" 
			style="background-color:#07C160; color:#ffffff;border:1px solid #fff;">授权获取头像和昵称</button>
		<!-- #endif -->
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				second: '发送短信',
				mobile: "",
				disabled: false,
				timer001: 60,
				js_code: '',
				tokenstr: '',
				show_mobile_login: 0,
				
				//shop_list: '',
				wxa_shop_operation_logo_url:'',
				
				
				windowHeight: '',
				
				current_js_code : '', 
			};
		},
		onLoad: function(options) {
			this.abotapi.set_option_list_str(this, function(that, option_list){
				that.abotapi.getColor();
				
				that.wxa_shop_operation_logo_url = option_list.wxa_shop_operation_logo_url;
			});

			var that = this;

			this.abotapi.get_shop_info_from_server(function(shop_info_list) {

				//that.shop_list = shop_info_list;

			});



			uni.getSystemInfo({
				success(res) {

					that.windowHeight = res.windowHeight;

				}
			})

			console.log('options', options)

			if (options.retpage) {
				//that.retpage = '/pages/h5browser/h5browser?url=' + options.retpage;
				that.retpage = options.retpage;
			}
			else{
				that.retpage =  uni.getStorageSync('get_userinfo_last_url');
				uni.removeStorageSync('get_userinfo_last_url');
			}
			
			
			//获取jscode，以备用
			uni.login({
				success: (res) => {
					console.log("btn_one_click_login 获取到的jscode是:" + res.code);
			
					that.current_js_code = res.code;
					
					
			
				},
				fail: function(login_res) {
					console.log('一键获取用户头像和昵称失败。');
				}
			
			});
			

		},
		onShow: function() {
		
		},
		methods: {
			btn_one_click_get_userinfo: function(e) {
				var that = this;
				
				console.log('btn_one_click_get_userinfo ===>>>', e)
				
				//console.log(e.detail.errMsg)
				//console.log(e.detail.iv)
				//console.log(e.detail.encryptedData)

				console.log('one_click_get_userinfo', e);
				console.log('wx.login <<<==== btn_one_click_login');

				
				//2021.9.19. wx.getUserProfile 必须在点击事件中直接调用，不能封装在 wx.login 等异步函数中
				
				
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				uni.getUserProfile({
					desc:'获取头像昵称以展示个性化内容', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (response) => {
						console.log('wx.getUserProfile 返回===>>>', response);
						
						var post_data = {
								sellerid: that.abotapi.get_sellerid(),
								parentid: that.abotapi.get_current_parentid(),
								js_code: that.current_js_code,
								xiaochengxu_appid: that.abotapi.globalData.xiaochengxu_appid,
								iv: response.iv,
								encryptedData: response.encryptedData,
						};
						
						if(response.rawData){
							post_data.rawData = response.rawData;
						}
						
						//如果用户登录，则带上登录信息
						var userInfo = that.abotapi.get_user_info();
						if(userInfo){
							post_data.userid = userInfo.userid;
							post_data.checkstr = userInfo.checkstr;
						}
						
						
						
						that.abotapi.abotRequest({
							url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=wxa_get_userinfo',
							data: post_data,
							success: function(res) {
								console.log('一键获取头像和昵称完成',  res);
						
								if (res.data && (res.data.code == 1)) {
						
									that.abotapi.globalData.userInfo = that.abotapi.get_user_info();
						
									console.log('已经保存的用户信息：', that.abotapi.globalData.userInfo);
						
									that.abotapi.globalData.userInfo.is_get_userinfo = 1;
									that.abotapi.set_user_info(that.abotapi.globalData.userInfo);
						
						
									uni.showToast({
										title: '授权成功',
										icon: 'success',
										duration: 1000,
										success:function(){
											
										}
									})
									
									//如果打开这个页面时候指定了返回的URL
									if (that.retpage) {										
										that.abotapi.call_h5browser_or_other_goto_url(that.retpage);
										return;
									}
									
									uni.reLaunch({
										url: "/pages/index/index"
									});
						
									return;
						
						
								} else {
									//一键登录返回错误代码
									uni.showModal({
										title: '提示',
										content: res.data.msg,
										showCancel: false,
										success(res) {
											if (res.confirm) {
												console.log('用户点击确定')
											}
										}
									})
						
								}
							}
						});   //  end of  that.abotapi.abotRequest({
						
						
						
						
						
					},
					fail: (response) => {
						console.log('wx.getUserProfile fail ===>>>', response);
					},
					complete: (response) => {
						console.log('wx.getUserProfile complete ===>>>', response);
					}
				});  //  end of  wx.getUserProfile
				
				
				
				
			},
		}

	}
</script>

<style>
	/* pages/update_mobile/update_mobile.wxss */
	page {
		background-color: #F0F0F0;
		font-size: 28rpx;
	}

	.box {
		width: 100%;
		text-align: center;
		margin: 60rpx auto;
	}

	.box image {
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
	}

	.from-list {
		width: 100%;

	}

	.section1 {
		width: 90%;
		height: 96rpx;
		line-height: 48px;
		background-color: #fff;
		margin: 40rpx auto 0;
		border-bottom: 1px solid #ECECEC;
		border: 1px solid #17A8E2;
		border-radius: 21px;

	}

	.section1 input {
		width: 80%;
		height: 80rpx;
		padding: 3px 20px;
	}

	.section2 {
		width: 90%;
		height: 96rpx;
		background-color: #fff;
		margin: 40rpx auto 0;
		position: relative;
		border: 1px solid #17A8E2;
		border-radius: 21px;
	}

	.section2 input {
		width: 50%;
		height: 80rpx;
		padding: 3px 20px;
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
		border: 1px solid #17A8E2;
		border-radius: 21px;
	}

	.section3 image {
		width: 30%;
		height: 68rpx;
		line-height: 60rpx;
		padding-top: 13rpx;
		margin-left: -9rpx;


	}

	.section3 input {
		width: 55%;
		height: 80rpx;
		margin: 3px 20px;
		float: left;
	}

	.check_btn2 {
		margin: 50px auto;
		width: 80%;
		height: 40px;
		background-color: #07C160;
		line-height: 40px;
		color: #FFF;
		border: 1px solid #fff;
	}

	.userinfo-avatar {
		display: block;
		width: 126rpx;
		height: 126rpx;
		border-radius: 50%;
		border: 1px solid #fff;
		box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
		overflow: hidden;

	}

	.userinfo-userNickName {
		color: #666;
		text-align: center;
	}

	.shouquan-con {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 17%;
		margin-top: 100rpx;
	}

	.open-con {
		display: flex;
		flex-direction: column;
		align-content: center;
	}

	.shouquan-a {
		width: 60rpx;
		height:60rpx;
	}

	.shouquan-b {
		width: 126rpx;
		height: 126rpx;

	}
</style>
