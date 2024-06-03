<template>

	<!--pages/login/login.wxml-->
	<view class="page" style='width:100%;overflow-x:hidden;background:#fff;' :style="{height:windowHeight+'px'}">
		<view class='box'>
			<image :src="wxa_shop_operation_logo_url" mode="widthFix"></image>
		</view>
		
		<view class="box">
			<image class="shouquan-a" mode="widthFix" src="https://yanyubao.tseo.cn/Tpl/static/images/double_arrow_top.png"></image>
		</view>
		
		
		<!-- #ifdef MP-WEIXIN -->
		
		<button class="box" style="margin: 10rpx auto;
    background: #ffffff;
    box-shadow: none;" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
		  <image class="avatar" :src="avatarUrl" mode="widthFix"></image>
		</button> 
		<view style="text-align: center;">点击上方头像获取</view>
		
		<form @submit="btn_save_get_userinfo" @reset="formReset">
			
		<input type="nickname" style="text-align: center;height: 60rpx;line-height: 60rpx;border: solid 1rpx #333333;width: 50%;margin: 20rpx auto;font-size: 40rpx;" placeholder="请输入昵称" name="nickname001" />

		<!--
		<view class='shouquan-con'>
			<view class='open-con'>
				<open-data type="userAvatarUrl" class="userinfo-avatar"></open-data>
				<open-data type="userNickName" class="userinfo-userNickName"></open-data>
			</view>

			<image class="shouquan-a" mode="widthFix" src="https://yanyubao.tseo.cn/Tpl/static/images/double_arrow_right.png"></image>
			<image class="shouquan-b" src="https://yanyubao.tseo.cn/Tpl/static/images/wxa.png"></image>
		</view>
		-->

		<!-- <button open-type="getUserInfo" plain="true"
			@getuserinfo="btn_one_click_get_userinfo" 
			class="check_btn2" 
			style="background-color:#07C160; color:#ffffff;border:1rpx solid #fff;">授权获取头像和昵称</button> -->
		
			
		<button plain="true"
			form-type="submit"
			class="weui-btn" 
			:style="{background:wxa_shop_nav_bg_color, border:wxa_shop_nav_bg_color, color:wxa_shop_nav_font_color}">保存头像和昵称</button>
			
		</form>
		<!-- #endif -->
		
		<!-- #ifdef MP-TOUTIAO -->
		
		<button plain="true"
			@tap="btn_one_click_get_douyin_userinfo" 
			class="check_btn2" 
			style="background-color:#07C160; color:#ffffff;border:1rpx solid #fff;">授权获取抖音头像和昵称</button>
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
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				
				
				windowHeight: '',
				
				current_js_code : '', 
				
				//2022.12.3.
				avatarUrl: 'https://yanyubao.tseo.cn/Tpl/static/images/touxiang-132.jpg',
				nickname001: '',				
				
				
				
			};
		},
		onLoad: function(options) {
			this.abotapi.set_option_list_str(this, function(that, option_list){
				that.abotapi.getColor();
				
				that.wxa_shop_operation_logo_url = option_list.wxa_shop_operation_logo_url;
				
				that.wxa_shop_nav_bg_color = option_list.wxa_shop_nav_bg_color;
				that.wxa_shop_nav_font_color = option_list.wxa_shop_nav_font_color;
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
			// #ifdef MP-WEIXIN
			
			uni.login({
				success: (res) => {
					console.log("btn_one_click_login 获取到的jscode是:" + res.code);
			
					that.current_js_code = res.code;
					
					
			
				},
				fail: function(login_res) {
					console.log('一键获取用户头像和昵称失败。');
				}
			
			});
			
			// #endif

		},
		onShow: function() {
		
		},
		
		methods: {
			
			onChooseAvatar:function(e){
				var that = this;
				
				console.log('onChooseAvatar ===>>>', e);
				console.log('onChooseAvatar ===>>>', e.detail.avatarUrl);
				
				that.avatarUrl = e.detail.avatarUrl;
				
				
				var userInfo = that.abotapi.get_user_info();
				
				
				uni.showLoading({
					title: '加载中'
				});
				
				var post_url = that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=upload_image_file';
				
				console.log('准备上传头像：' + post_url);
				
				uni.uploadFile({
					url: post_url,
					filePath: that.avatarUrl,
					name: 'file',
					formData: {
						sellerid: that.abotapi.globalData.default_sellerid,
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
					},
					// 请求头一定要加，否则 iOS 图片上传会失败
					header: {
						//'Content-Type': 'application/x-www-form-urlencoded',
						'Content-Type': 'multipart/form-data'
					},
					success: uploadFileRes => {
						// 注意：这里返回的uploadFileRes.data 为JSON 需要自己去转换
						
						console.log('上传头像文件返回：', uploadFileRes);
						
						console.log('上传头像文件返回的data的内容：', uploadFileRes.data);
						// {"code":"1","msg":"\u5934\u50cf\u8bbe\u7f6e\u6210\u529f","img_url":"http:\/\/saas.tseo.cn\/staticsvc\/uploads\/2023\/01\/10\/23a544df23d9331ac604dbb9987c5fa34239.jpg"}
						
						let ret_data = JSON.parse(uploadFileRes.data);
						
						console.log('json解码后的data的内容：', ret_data);
						
						if (ret_data.code == 1) {
							that.avatarUrl = ret_data.img_url;
						}
						
						console.log('最新的头像网址：' + that.avatarUrl);
						
					},
					fail: (error) => {
						uni.showToast({
							title: error,
							duration: 2000
						});
					},
					complete: () => {
						uni.hideLoading();
					}
				});

				
			},
			
			formReset:function(){
				
			},
			
			//2022.12.3 保存头像和昵称
			btn_save_get_userinfo:function(e){
				//console.log('btn_save_get_userinfo===>>>nickname001===>>>', this.nickname001);
				
				var that = this;
				
				if(!that.avatarUrl 
					|| (that.avatarUrl == 'https://yanyubao.tseo.cn/Tpl/static/images/touxiang-132.jpg')){
						uni.showModal({
							title:'提示',
							content:'请选择头像',
							showCancel:false
						});
						
						return;
				}
				
				var formdata = e.detail.value;
				
				var nickname = formdata.nickname001;
				
				if(!nickname){
					uni.showModal({
						title:'提示',
						content:'请填写昵称',
						showCancel:false
					});
					
					return;
				}
				
				
				
				console.log('btn_save_get_userinfo===>>>e===>>>', e);
				console.log('btn_save_get_userinfo===>>>formdata===>>>', formdata);
				console.log('btn_save_get_userinfo===>>>nickname001===>>>', nickname);
				
				var post_data = {
						sellerid: that.abotapi.get_sellerid(),
						parentid: that.abotapi.get_current_parentid(),						
				};
				
				//如果用户登录，则带上登录信息
				var userInfo = that.abotapi.get_user_info();
				if(!userInfo){
					uni.showModal({
						title:'提示',
						content:'请登录后再操作',
						showCancel:false
					});
					
					return;
				}
				
				post_data.userid = userInfo.userid;
				post_data.checkstr = userInfo.checkstr;
				
				//2022.12.4. 针对新接口权限
				post_data.nickname = nickname;
				
				//2023.1.10. 这里的  avatarUrl 的网址形式为 http://tmp/wirn1fkjn0se9213bcbdf00fca3d478b8cac88e1d358.jpeg 需要处理的
				post_data.headimgurl = this.avatarUrl;
				
				post_data.openid = that.abotapi.get_current_openid();
				
				//2023.1.10. 补充参数
				post_data.appid = that.abotapi.globalData.xiaochengxu_appid;
				post_data.xiaochengxu_appid = that.abotapi.globalData.xiaochengxu_appid;
				
				
				////////////////
				that.__send_user_info_to_server(post_data);
				
				
			},
			//2023.9.14. 获取抖音的头像和昵称
			//https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/api/open-interface/user-information/tt-get-user-profile
			btn_one_click_get_douyin_userinfo: function(e) {
				var that = this;
				
				console.log('btn_one_click_get_douyin_userinfo ===>>>', e)
				
				//console.log(e.detail.errMsg)
				//console.log(e.detail.iv)
				//console.log(e.detail.encryptedData)
				
				uni.getUserProfile({
					desc:'获取头像昵称以展示个性化内容', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (response) => {
						console.log('tt.getUserProfile（抖音的） 返回===>>>', response);
						
																
						that.abotapi.globalData.userInfo = that.abotapi.get_user_info();
										
						console.log('已经保存的用户信息：', that.abotapi.globalData.userInfo);
						
						//==将抖音的头像和昵称保存进去 ==
						//本地保存，不向服务器上传递
						var douyin_nickname_and_avatar = {}
						douyin_nickname_and_avatar.nickname = response.userInfo.nickName;
						douyin_nickname_and_avatar.avatar = response.userInfo.avatarUrl;
						
						uni.setStorageSync("douyin_nickname_and_avatar",  JSON.stringify(douyin_nickname_and_avatar));						
						//=========== End ============
										
						that.abotapi.globalData.userInfo.is_get_userinfo = 1;
						that.abotapi.set_user_info(that.abotapi.globalData.userInfo);										
										
						uni.showToast({
							title: '授权头像昵称成功',
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
					},
				})
				
			},
			
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
						console.log('uni.getUserProfile（可能是抖音的） 返回===>>>', response);
						
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
						
						////////////////
						that.__send_user_info_to_server(post_data);
						
						
						
					},
					fail: (response) => {
						console.log('wx.getUserProfile fail ===>>>', response);
					},
					complete: (response) => {
						console.log('wx.getUserProfile complete ===>>>', response);
					}
				});  //  end of  wx.getUserProfile
				
				
				
				
			},
			//2022.12.3. 将获取到的头像和昵称发送到服务器保存
			__send_user_info_to_server:function(post_data){
				var that = this;
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=wxa_get_userinfo',
					data: post_data,
					success: function(res) {
						console.log('一键获取头像和昵称完成',  res);
				
						if (res.data && (res.data.code == 1)) {
							
							//保存openid
							that.abotapi.set_current_openid(res.data.openid);
				
							that.abotapi.globalData.userInfo = that.abotapi.get_user_info();
				
							console.log('已经保存的用户信息：', that.abotapi.globalData.userInfo);
				
							that.abotapi.globalData.userInfo.is_get_userinfo = 1;
							that.abotapi.set_user_info(that.abotapi.globalData.userInfo);
				
				
							uni.showToast({
								title: '授权头像昵称成功',
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
				
				
				
				
			}
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
		line-height: 96rpx;
		background-color: #fff;
		margin: 40rpx auto 0;
		border-bottom: 1rpx solid #ECECEC;
		border: 1rpx solid #17A8E2;
		border-radius: 42rpx;

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
		border: 1rpx solid #17A8E2;
		border-radius: 42rpx;
	}

	.section2 input {
		width: 50%;
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
		border: 1rpx solid #17A8E2;
		border-radius: 42rpx;
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
		margin: 6rpx 40rpx;
		float: left;
	}

	.check_btn2 {
		margin: 60rpx auto;
		width: 80%;
		height: 80rpx;
		background-color: #07C160;
		line-height: 80rpx;
		color: #FFF;
		border: 1rpx solid #fff;
	}

	.userinfo-avatar {
		display: block;
		width: 126rpx;
		height: 126rpx;
		border-radius: 50%;
		border: 1rpx solid #fff;
		box-shadow: 6rpx 6rpx 10px rgba(0, 0, 0, 0.2);
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
