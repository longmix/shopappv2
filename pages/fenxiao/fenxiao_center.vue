<template>
	<view>
		<view style="background-color: #EA5504;height: 400rpx;">
			<view class="dailiren_xinxi" >
				<image src="../../hybrid/html/ecardh5/images/power4.png" class="daili_image" ></image>	
				<view>
					<view style="display: flex;">
						<view class="daili_text">名称</view>
						<view class="daili_text">账号</view>
					</view>
					<view class="daili_text">代理商</view>
				</view>
			</view>
			<view class="amount_money" >
				<view style="width: 50%;">
					<view>已结算</view>
					<view>金额</view>
				</view>
				<view style="width: 50%;">
					<view>未结算</view>
					<view>金额</view>
				</view>
			</view>
		</view>
		
		<view style="width: 100%;height:20rpx;background-color: #f2f2f2;"></view>
		<view style="display: flex;">
			<view>
				<view style="font-size: 20rpx;color: #999999;">下一等级</view>
				<view>加盟商</view>
			</view>
			<view style="width: 70%;text-align: center;">购买会员升级礼包</view>
			<view class="liji_qianwang" >立即前往</view>
		</view>
		<view style="width: 100%;height:20rpx;background-color: #f2f2f2;"></view>
		
		<view  style="display: flex;flex-wrap: wrap;width: 96%;padding: 2%;">
			<view class="daohang_pic_text">
				<view class="daohang_image" >
					<image src="https://yanyubao.tseo.cn/uploads/bottom_icon/list-8.png" style="width: 70rpx;height: 70rpx;"></image>
				</view>
				<view class="daohang_text">邀请代理</view>
			</view>
			
			<view class="daohang_pic_text">
				<view class="daohang_image" >
					<image src="https://yanyubao.tseo.cn/uploads/bottom_icon/list-8.png" style="width: 70rpx;height: 70rpx;"></image>
				</view>
				<view class="daohang_text">我的团队</view>
			</view>
			
			<view class="daohang_pic_text">
				<view class="daohang_image" >
					<image src="https://yanyubao.tseo.cn/uploads/bottom_icon/list-8.png" style="width: 70rpx;height: 70rpx;"></image>
				</view>
				<view class="daohang_text">我的顾客</view>
			</view>
			
			<view class="daohang_pic_text">
				<view class="daohang_image" >
					<image src="https://yanyubao.tseo.cn/uploads/bottom_icon/list-8.png" style="width: 70rpx;height: 70rpx;"></image>
				</view>
				<view class="daohang_text">收益汇总</view>
			</view>
		
			<view class="daohang_pic_text">
				<view class="daohang_image" >
					<image src="https://yanyubao.tseo.cn/uploads/bottom_icon/list-8.png" style="width: 70rpx;height: 70rpx;"></image>
				</view>
				<view class="daohang_text">联盟团队</view>
			</view>
			
			<view class="daohang_pic_text">
				<view class="daohang_image" >
					<image src="https://yanyubao.tseo.cn/uploads/bottom_icon/list-8.png" style="width: 70rpx;height: 70rpx;"></image>
				</view>
				<view class="daohang_text">我的订单</view>
			</view>
			
			<view class="daohang_pic_text">
				<view class="daohang_image" >
					<image src="https://yanyubao.tseo.cn/uploads/bottom_icon/list-8.png" style="width: 70rpx;height: 70rpx;"></image>
				</view>
				<view class="daohang_text">联盟订单</view>
			</view>
			
			<view class="daohang_pic_text">
				<view class="daohang_image" >
					<image src="https://yanyubao.tseo.cn/uploads/bottom_icon/list-8.png" style="width: 70rpx;height: 70rpx;"></image>
				</view>
				<view class="daohang_text">收益统计</view>
			</view>
		</view>
		
	</view>
</template>

<script>
export default {	
	data() {
		return {
				
		}
	},
	onLoad() {
		
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
			
		},
	}
</script>

<style>
	.dailiren_xinxi{
		display: flex;
		align-items: center;
		
		height: 200rpx;
	}
	.daili_image{
		border-radius: 50%;
		width: 100rpx;
		height: 100rpx;
		border: 1rpx solid #999999;
		margin: 10rpx;
	}
	.daili_text{
		color: #ffffff;
		font-size: 24rpx;
		margin: 10rpx;
	}
	.amount_money{
		width: 90%;
		height:150rpx;
		margin-left: 5%;
		border-radius: 12rpx;
		background-color: #ffffff;
		display: flex;
		text-align: center;
		align-items: center;
	}
	.liji_qianwang{
		border: 0.5px solid #EA5504;
		border-radius: 5px;
		background: #ea5504;
		height: 35rpx;
		font-size: 25rpx;
		color: #ffffff;
		padding-left: 10rpx;
		padding-right: 10rpx;
		margin-top: 15rpx;
	}
	.daohang_pic_text{
		width: 25%;
		margin-bottom: 30rpx;
	}
	.daohang_image{
		display: flex;
		justify-content: center;
		margin-bottom: 10rpx;
	}
	.daohang_text{
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 26rpx;
		color: #3d3d3d;
	}
</style>