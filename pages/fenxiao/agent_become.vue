<template>
	<view>
		<view class="myinvitation_information">
			
				<image src="" style="border: 1rpx solid #000000;width: 40rpx;height: 40rpx;"></image>
				<view style="font-size: 26rpx;font-weight: bold;margin-left: 30rpx;">名称</view>
				<view style="font-size: 26rpx;">邀请您成为</view>
				<view style="font-size: 26rpx;">xxx</view>
				<view style="font-size: 26rpx;">的代理!</view>
			 
		</view>
		<view style="" v-for="">
			<view class="agent_shop_information">
				<view style="width: 160rpx;height: 160rpx;">
					<image src="" style="width: 100%;height: 100%;border: 1rpx solid #000000;"></image>
				</view>
				
				<view style="width: 100%;padding: 20rpx;">
					<view class="font_shop_daili_name">会员礼包（含蔓越莓24盒+微泡羊奶256盒）</view>
					<view style="position: relative;">
						<view class="jine_daili" style="color: #CC0000;font-size: 24rpx;font-weight: bold;">￥6000.00</view>
						<view class="liji_goumai" style="color: #ffffff;background-color: #FF3535;border-radius: 50rpx;overflow: hidden;font-size: 20rpx;padding:10rpx 20rpx ;">立即购买</view>
					</view>
					
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
export default {	
	data() {
		return {
			
			wxa_shop_nav_bg_color: '#ea5504',
		}
	},
	onLoad() {
		var that = this;
	
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
		 
		this.onLoad();
		this.onShow();
		 
		console.log('下拉刷新==============')
		 
		//停止当前页面的下拉刷新
		setTimeout(function() {
			console.log('timeout===>>>stopPullDownRefresh===>>>hideToast');
			
			uni.stopPullDownRefresh();
			
			uni.hideToast();
			//uni.hideLoading();
			
		}, 2000);
		   
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
		
		
		get_fenxiao_myteam_list:function(){
			
			var that = this;
			
			var userInfo = that.abotapi.get_user_info();
			
			var last_url = '/pages/tabbar/user';
			
			if (!userInfo) {
				that.abotapi.goto_user_login(last_url);
			
				return;
			}
			var post_data = {
				sellerid:that.abotapi.globalData.default_sellerid,
				userid:userInfo.userid,
				page: that.current_page,
				
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
	page{
		background-color: #F2F2F2;
	}
	.myinvitation_information{
		background-color: #ffffff;
		margin: 20rpx;
		display: flex;
		padding: 30rpx;
		line-height: 40rpx;
		border-radius: 12rpx;
		overflow: hidden;
	}
	.agent_shop_information{
		background-color: #ffffff;
		margin: 20rpx;
		border-radius: 12rpx;
		overflow: hidden;
		display: flex;
		padding: 20rpx;
	}
	.font_shop_daili_name{
		font-size: 24rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.jine_daili{
		color: #CC0000;
		font-size: 12px;
		font-weight: bold;
		position: absolute;
		top: 40rpx;
	}
	.liji_goumai{
		color: #ffffff;
		background-color: #FF3535;
		border-radius: 25px;
		overflow: hidden;
		font-size: 10px;
		padding: 3px 10px;
		position: absolute;
		right: 20rpx;
		top: 40rpx;
	}
</style>