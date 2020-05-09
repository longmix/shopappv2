<template>
	<view>
		<view class="head">
			  <view style="margin-left:20rpx ;">当前:上海全城</view>
		      <view calss="right">切换区县<img style="width: 35rpx; height: 33rpx;"
			   src="../../static/img/category/down.png" alt=""></view>
		</view>
		
		<view class="middle">
			<view class="hui">定位/最近访问</view>
				
				<view class="a"><img style="width: 35rpx;height: 30rpx;" 
				src="../../static/img/category/weizhi.png" alt="">上海</view>
			<view class="hui">热门城市</view>
			<view style="overflow: auto;text-align: center;">
				<view class=kuai>苏州</view>
				<view class=kuai>杭州</view>
				<view class=kuai>南京</view>
				<view class=kuai>北京</view>
				<view class=kuai>嘉兴</view>
				<view class=kuai>无锡</view>
				<view class=kuai>合肥</view>
				<view class=kuai>深圳</view>
				<view class=kuai>广州</view>
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
		methods: {
			
		}
	}
	
</script>

<style>
 .head{
	display: inline-flex;
	outline-width:50rpx; 
	display: flex;
	justify-content: space-between;
}
.right{
	float:left;
	flex-wrap: nowrap;
}
.kuai{
	float: left;
	width: 25%;
	margin: 10upx;
	background: #f7f7f7;
	border-radius: 10rpx;
}

.middle{
	margin:15rpx 30rpx;
}
.a{
	margin: 15rpx 30rpx;
}
.hui{
	color: #666;
}
.middle table{
	margin-top: 15rpx;
	line-height: 50rpx;
}
</style>
