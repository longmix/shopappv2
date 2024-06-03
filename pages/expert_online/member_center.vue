<template>
	<view>
		<view style="background-color: #7b4d12;width: 100%;">
			<view style="float: right;background-color: #ffffff;border-radius: 20rpx;margin: 50rpx;padding: 20rpx 10rpx;">成为会员</view>
			<view style="display: flex;">
				<image :src="fenxiao_info.headimgurl" mode="" style="width: 150rpx;height: 150rpx;border-radius: 50%;margin: 20rpx;"></image>
				<view style="margin-top: 30rpx;">
					<view style="color: #ffffff;">昵称</view>
					<view style="background-color: #dcced0;border-radius: 20rpx;text-align: center;">VIP</view>
					<view style="color: #dc851f;">暂未开通VIP</view>
				</view>
				
			</view>
		</view>
		<view style="background-color: #d9d7d8;width: 96%;margin: 2%;border-radius: 10rpx;padding-bottom: 50rpx;">
			<view style="color: #7b4d12;margin: 20rpx;">会员服务</view>
		
			<scroll-view scroll-x="true">
				<view style="display: flex;">
					<view style="background-color: #ffffff;width: 200rpx;text-align: center;margin: 20rpx;border-radius: 10rpx;padding: 30rpx;">
						<view style="color: #7b4d12;font-weight: bolder;width: 200rpx;">30天</view>
						<view style="color: #7b4d12;">30.0元</view>
						<view style="color: #999999;">1.0元/天</view>
					</view>
					<view style="background-color: #ffffff;width: 200rpx;text-align: center;margin: 20rpx;border-radius: 10rpx;padding: 30rpx;">
						<view style="color: #7b4d12;font-weight: bolder;width: 200rpx;">90天</view>
						<view style="color: #7b4d12;">50.0元</view>
						<view style="color: #999999;">0.6元/天</view>
					</view>
					<view style="background-color: #ffffff;width: 200rpx;text-align: center;margin: 20rpx;border-radius: 10rpx;padding: 30rpx;">
						<view style="color: #7b4d12;font-weight: bolder;width: 200rpx;">365天</view>
						<view style="color: #7b4d12;">100.0元</view>
						<view style="color: #999999;">0.3元/天</view>
					</view>
					
					<view style="background-color: #ffffff;width: 200rpx;text-align: center;margin: 20rpx;border-radius: 10rpx;padding: 30rpx;">
						<view style="color: #7b4d12;font-weight: bolder;width: 200rpx;">30天</view>
						<view style="color: #7b4d12;">30.0元</view>
						<view style="color: #999999;">1.0元/天</view>
					</view>
					<view style="background-color: #ffffff;width:200rpx;text-align: center;margin: 20rpx;border-radius: 10rpx;padding: 30rpx;">
						<view style="color: #7b4d12;font-weight: bolder;width: 200rpx;">30天</view>
						<view style="color: #7b4d12;">30.0元</view>
						<view style="color: #999999;">1.0元/天</view>
					</view>
				</view>
					
					
			</scroll-view>
			 
			
			
			
			
			<!-- 
			
			<view style="display: flex;">
				<view style="background-color: #ffffff;width: 30%;text-align: center;margin: 20rpx;border-radius: 10rpx;padding: 30rpx;">
					<view style="color: #7b4d12;font-weight: bolder;">30天</view>
					<view style="color: #7b4d12;">30.0元</view>
					<view style="color: #999999;">1.0元/天</view>
				</view>
				<view style="background-color: #ffffff;width: 30%;text-align: center;margin: 20rpx;border-radius: 10rpx;padding: 30rpx;">
					<view style="color: #7b4d12;font-weight: bolder;">90天</view>
					<view style="color: #7b4d12;">50.0元</view>
					<view style="color: #999999;">0.6元/天</view>
				</view>
				<view style="background-color: #ffffff;width: 30%;text-align: center;margin: 20rpx;border-radius: 10rpx;padding: 30rpx;">
					<view style="color: #7b4d12;font-weight: bolder;">365天</view>
					<view style="color: #7b4d12;">100.0元</view>
					<view style="color: #999999;">0.3元/天</view>
				</view>
			</view> -->
			<view style="color: #999999;margin: 20rpx;">支付即视为同意{{'《'}}会员购买协议{{'》'}}</view>
			<view style="color: #7b4d12;font-weight: bolder;margin: 20rpx;" >会员特权</view>
			<view style="display: flex;margin: 20rpx;">
				<view style="background-color: #333333;border-radius: 50%;text-align: center;">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/zhuanjiazaixian_icon/zhuanshi.png" mode="widthFix" style="width: 60rpx;padding: 20rpx;margin-top: 5rpx;"></image>
				</view>
				<view style="margin-left: 20rpx;margin-top: 10rpx;">
					<view style="font-weight: bolder;">尊贵标识</view>
					<view style="color: #999999;">帅气!点亮VIP</view>
				</view>
			</view>
			<view style="display: flex;margin: 20rpx;">
				<view style="background-color: #333333;border-radius: 50%;text-align: center;">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/zhuanjiazaixian_icon/xihuan.png" mode="widthFix" style="width: 60rpx;padding: 20rpx;margin-top: 5rpx;"></image>
				</view>
				<view style="margin-left: 20rpx;margin-top: 10rpx;">
					<view style="font-weight: bolder;">喜欢我的人</view>
					<view style="color: #999999;">有1人喜欢我</view>
				</view>
			</view>
			<view style="display: flex;margin: 20rpx;">
				<view style="background-color: #333333;border-radius: 50%;text-align: center;">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/zhuanjiazaixian_icon/fangke.png" mode="widthFix" style="width: 60rpx;padding: 20rpx;margin-top: 5rpx;"></image>
				</view>
				<view style="margin-left: 20rpx;margin-top: 10rpx;">
					<view style="font-weight: bolder;">最近访客</view>
					<view style="color: #999999;">一个足迹就能找到她</view>
				</view>
			</view>
			<view style="display: flex;margin: 20rpx;">
				<view style="background-color: #333333;border-radius: 50%;text-align: center;">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/zhuanjiazaixian_icon/liwu.png" mode="widthFix" style="width: 60rpx;padding: 20rpx;margin-top: 5rpx;"></image>
				</view>
				<view style="margin-left: 20rpx;margin-top: 10rpx;">
					<view style="font-weight: bolder;">专属礼物</view>
					<view style="color: #999999;">太炫酷了！我超喜欢~</view>
				</view>
			</view>
			<view style="display: flex;margin: 20rpx;">
				<view style="background-color: #333333;border-radius: 50%;text-align: center;">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/zhuanjiazaixian_icon/xinxi.png" mode="widthFix" style="width: 60rpx;padding: 20rpx;margin-top: 5rpx;"></image>
				</view>
				<view style="margin-left: 20rpx;margin-top: 10rpx;">
					<view style="font-weight: bolder;">消息回执</view>
					<view style="color: #999999;">消息已读！看到了~</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
export default {	
	data() {
		return {
			fenxiao_info:'',
		}
	},
	onLoad() {
		var that = this;
		
		uni.setNavigationBarTitle({
			title:'会员中心'
		})
			
		that.get_current_userinfo();
		
		that.get_fenxiao_myteam_list();
		
		this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
	},
	onShow() {
		
	},
	onReady(){
		
	},
	onPageScroll(e) {
		
	},
	//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh() {
		console.log('下拉刷新==')
		 
		// #ifndef MP-ALIPAY
		uni.showToast({
			title: '数据更新中……',
			icon:'loading',
		});
		// #endif
		 
		// #ifdef MP-ALIPAY
		uni.showToast({
			title: '数据更新中……',
			//icon:'loading', 	//支付宝不支持icon为 loading
			//duration:2000
		});
		// #endif
		this.current_page = 1;
		this.get_fenxiao_myteam_list();
		 
		console.log('下拉刷新==============')
		 
		//停止当前页面的下拉刷新
		setTimeout(function() {
			console.log('timeout===>>>stopPullDownRefresh===>>>hideToast');
			
			uni.stopPullDownRefresh();
			
			uni.hideToast();
			//uni.hideLoading();
			
		}, 2000);
		   
	},
	
	
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom: function () {
		
		this.current_page ++;
		
		this.get_fenxiao_myteam_list();
	}, 
	
	
		
	methods: {
		
		callback_function_shop_option_data:function(that, cb_params){
			
			console.log('当前调试开关22：' + this.system_debug_flag);
			console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);
			
			if(!cb_params){
				return;
			}
			
			
			console.log('cb_params====', cb_params);
			
			that.wxa_shop_nav_bg_color  = cb_params.option_list.wxa_shop_nav_bg_color;
			that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
			
		},
		
		get_current_userinfo: function() {
			var that = this;
			
			var userInfo = that.abotapi.get_user_info();
			
			var last_url = '/pages/fenxiao/fenxiao_center';
			
			if (!userInfo || !userInfo.userid) {
				that.abotapi.goto_user_login(last_url);
			
				return;
			}
			that.userInfo = userInfo;
		
			console.log('get_current_userinfo--userInfo==', userInfo);
			
			var post_data = {
					sellerid: that.abotapi.globalData.default_sellerid,
					checkstr: userInfo.checkstr,
					userid: userInfo.userid,
					page: that.current_page,
					page_size: 10,
			};
			
			// #ifdef MP-WEIXIN
				post_data.xiaochengxu_appid = that.abotapi.globalData.xiaochengxu_appid,
				post_data.xiaochengxu_openid = that.abotapi.get_current_openid('userid_openid_' + userInfo.userid);
			// #endif
			
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/FenxiaoData/get_fenxiao_center_myteam_list',
				data: post_data,
				success: function(res) {
				
					if (res.data.code == -1) {
						//登录超时
						that.abotapi.del_user_info();
						
						var last_url = '/pages/tabbar/user';
						that.abotapi.goto_user_login(last_url, 'normal');
						
					} 
					else {
						/* 
						
						if(res.data.data.fenxiao_info.supplier_sequence == '-1'){
							uni.showModal({
								title:'错误',
								content:'请购买代理身份',
								showCancel:false
							});
							
							uni.navigateTo({
								url: '/pages/tabbar/user',
							})
							
						}
						
						 */
						
						var data = res.data;
						
						//渲染前端界面
						that.user_info = data.data;
						
						that.my_xia_grade_level = that.user_info.my_xia_grade_level;
						
						that.fenxiao_info = that.user_info.fenxiao_info;
						
						
						console.log('fenxiao_userinfo==>>', that.fenxiao_info);
					
						
					}
				},
				fail: function (e) {
				uni.showToast({
					title: '网络异常！',
					duration: 2000
				});
				},
			})
			
			
		},
		get_fenxiao_myteam_list:function(){
			
			var that = this;
			
			var userInfo = that.abotapi.get_user_info();
			
			if (!userInfo || !userInfo.userid) {
				return;
			}
			
			var post_data = {
				sellerid:that.abotapi.globalData.default_sellerid,
				userid:userInfo.userid,
				page: that.current_page,
				page_size: 10,
			};
			
		// #ifdef MP-WEIXIN
			post_data.xiaochengxu_appid = that.abotapi.globalData.xiaochengxu_appid,
			post_data.xiaochengxu_openid = that.abotapi.get_current_openid('userid_openid_' + userInfo.userid);
		// #endif
			
			
			that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/FenxiaoData/get_fenxiao_center_myteam_list',
					method: 'post',
					data: post_data,
					success: function (res) {
					
					if(res.data.code != 1){
						uni.showToast({
							title:'你还没有团队',
							duration: 2000,
						});
						
						return;
					}
					that.current_myteam = res.data.data;
					that.current_myteam_list = res.data.data.xiaji_fenxiao_count;
					console.log('current_myteam_list ===>>> ', that.current_myteam_list);
					
							
					
					},
					fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
					},
			});
				
			
			},
			
		},
	}
</script>

<style>
	page {
	  background-color: #f0f3f6;
	}
	.daili_image{
		border-radius: 50%;
		width: 100rpx;
		height: 100rpx;
	
		margin: 10rpx;
	}
	.daili_text{
		color: #ffffff;
		font-size: 26rpx;
		margin: 10rpx;
	}
	.font_color_unify{
		font-size: 22rpx;
		color: #797979;
	}
	.myteam_list_information{
		display: flex;

		background-color: #ffffff;
	}
	.pic_juzhong{
		width: 10%;
		display: flex;
		justify-content: center;
		margin-top: 30rpx;
	}
	.huiyuan_dengji{
		font-size: 20rpx;
		margin-left: 20rpx;
		background-color: #FBB03B;
		border-radius: 30rpx;
		overflow: hidden;
		color: #ffffff;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}
</style>