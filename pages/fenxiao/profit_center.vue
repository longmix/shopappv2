<template>
	<view>
		<view style="display: flex;padding: 30rpx;justify-content: space-between;" :style="{background:wxa_shop_nav_bg_color}">
			<view style="display: flex;">
				<view style="color: #ffffff;font-size: 32rpx;">已结算</view>
				
			</view>
			
			<view style="color: #ffffff;font-size: 24rpx;">待结算></view>
		</view>
		<view>
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
				<view id="demo1" class="scroll-view-item_H" style="color: #EA5504;">全部</view>
				<view id="demo2" class="scroll-view-item_H">订单销售</view>
				<view id="demo3" class="scroll-view-item_H">福利计划</view>
				<view id="demo3" class="scroll-view-item_H">服务补助金</view>
				<view id="demo3" class="scroll-view-item_H">进货折扣</view>
				<view id="demo3" class="scroll-view-item_H">门店辅导奖</view>
				<view id="demo3" class="scroll-view-item_H" style="width: 300rpx;">产品销售分润 (省级)</view>
				<view id="demo3" class="scroll-view-item_H" style="width: 300rpx;">产品销售分润 (一星)</view>
				<view id="demo3" class="scroll-view-item_H" style="width: 300rpx;">产品销售分润 (二星)</view>
				<view id="demo3" class="scroll-view-item_H" style="width: 300rpx;">产品销售分润 (三星)</view>
				<view id="demo3" class="scroll-view-item_H" style="width: 300rpx;">产品销售分润 (四星)</view>
				<view id="demo3" class="scroll-view-item_H" style="width: 300rpx;">产品销售分润 (五星)</view>
				<view id="demo3" class="scroll-view-item_H" style="width: 300rpx;">产品销售分润 (合伙人)</view>
			</scroll-view>
		</view>
		<view style="background-color: #ffffff;margin: 20rpx;">
			<view style="display: flex;justify-content: space-between;border-bottom: solid 2rpx #F0F3F6;border-radius: 12rpx;overflow: hidden;font-size: 20rpx;padding: 30rpx 20rpx;">
				<view>
					<view style="display: flex;">
						<view>订单销售</view>
						<view>(ECADR1345678555)</view>
					</view>
					<view style="padding-top: 10rpx;">结算时间：2022-6-14 12:12:12</view>
				</view>
				<view style="line-height: 66rpx;">+1234.12</view>
			</view>
			<view style="display: flex;justify-content: space-between;border-bottom: solid 2rpx #F0F3F6;border-radius: 12rpx;overflow: hidden;font-size: 20rpx;padding: 30rpx 20rpx;">
				<view>
					<view style="display: flex;">
						<view>福利计划</view>
						<view>(ECADR1345678555)</view>
					</view>
					<view style="padding-top: 10rpx;">结算时间：2022-6-14 12:12:12</view>
				</view>
				<view style="line-height: 66rpx;">+1234.12</view>
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
			title:'收益中心'
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
	page{
		background-color: #F0F3F6;
	}
	.scroll-view_H{
		white-space: nowrap;
		width: 100%;
		background-color: #ffffff;
	}
	.scroll-view-item_H {
			display: inline-block;
			width: 200rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 24rpx;
		}
</style>