<template>
	<view>
		<vie class="search"></vie>
		
		<view class="head"><span>当前：上海全城</span>
			<span class="qiehuan">切换城市
				<img style="width: 50upx;height: 50upx;"src="../../static/img/category/down.png" alt="">
			</span>
		</view>
		
		
		<view class="gps">
			<a>
				<img  style="width: 50upx;height: 40upx; margin-top:0upx;" src="../../static/img/category/weizhi.png" alt="">
				<a>上海</a>
			</a>
			
			<a class="qiehuan">定位/最近访问</a>
		</view>
		
		<view class="hot">
			<span class="hui">热门城市</span>
			<table width="350upx" height="200upx" border="1">
				<tr>
					<td>苏州</td>
					<td>北京</td>
					<td>合肥</td>
				</tr>
				<tr>
					<td>杭州</td>
					<td>嘉兴</td>
					<td>深圳</td>
				</tr>
				<tr>
					<td>南京</td>
					<td>无锡</td>
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
		width: 100%;
		height: 50upx;
	}
	.qiehuan{
		float: right;
		color: #a0a0a0;
	}
	.gps{
		width: 100%;
		height: 50upx;
		border: 3rpx solid #000000 ;
		float: left;
	}
	.hot{
		width:90%;
		height: 400rpx;
	}
	.hui{
		color:#a0a0a0;
	}
</style>
