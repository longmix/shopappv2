<template>
	<view>
		<view style="display: flex;padding: 30rpx;" :style="{background:wxa_shop_nav_bg_color}">
			<view style="color: #ffffff;font-size: 32rpx;">收益汇总</view>
			<view style="color: #ffffff;font-size: 24rpx;line-height: 40rpx;margin-left: 20rpx;">￥1234.12</view>
		</view>
		<view style="display: flex;background-color: #ffffff;margin: 20rpx;justify-content: space-between;padding: 30rpx;border-radius: 10rpx;overflow: hidden;">
			<view>
				<view style="font-size: 28rpx;">订单销售</view>
				<view style="font-size: 20rpx;margin-top: 20rpx;">引导顾客产生消费</view>
			</view>
			<view style="margin-top: 8rpx;">
				<view style="font-size: 20rpx;">已结算￥1234.12元></view>
				<view style="font-size: 20rpx;margin-top: 10rpx;">未结算￥1234.12元></view>
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
		
		uni.setNavigationBarTitle({
			title:'收益汇总'
		})
			
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
			
		},
	}
</script>
<style>
	page {
	  background-color: #F0F3F6;
	}
</style>