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
				<table width="450upx">
					<tr>
					<td>苏州</td>
					<td>杭州</td>
					<td>南京</td>
					</tr>
					<tr>
					<td>北京</td>
					<td>嘉兴</td>
					<td>无锡</td>
					</tr>
					<tr>
					<td>合肥</td>
					<td>深圳</td>
					<td>广州</td>
					</tr>
				</table>
				
				<view class="hui">出境热门城市</view>
					<table width="450upx">
						<tr>
						<td>香港</td>
						<td>泰国</td>
						<td>巴厘岛</td>
						</tr>
						<tr>
						<td>东京</td>
						<td>伦敦</td>
						<td>慕尼黑</td>
						</tr>
						<tr>
						<td>纽约</td>
						<td>台湾</td>
						<td>多伦多</td>
						</tr>
					</table>
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
.middle{
	margin:15rpx 30rpx;
}
.a{
	margin: 15rpx 30rpx;
}
.hui{
	color: #C0C0C0;
}
.middle table{
	margin-top: 15rpx;
	line-height: 50rpx;
}
</style>
