<template>
	<view>
		<view class="head">
			  <view>当前:上海全城</view>
		      <view calss="right">切换区县</view>
		</view>
		
		<view class="middle">
			<view class="hui">定位/最近访问</view>
			<view class="a">上海</view>
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
	background: #ddd; 
	display: flex;
	justify-content: space-between;
}
.right{
	float:left;
	flex-wrap: nowrap;
}
.middle{
	width: 90%;
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
