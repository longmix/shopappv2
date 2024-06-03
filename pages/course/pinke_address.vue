<template>
	<view>
		<view class="address_list">
			<view	class="address_title">市民中心广场</view>
			<view class="address_luxian" style="margin-top: 20rpx;font-size: 28rpx;!important">
				<span class="address_detail">位置：</span>
				<span class="address_detail">上海市长宁区协和路787弄</span>
			</view>
			<view>
				<span class="address_detail">交通：</span>
				<span class="address_detail">地铁2号线淞虹路地铁站，公交714号长华路</span>
			</view>
			<view class="button_row">
				<view class="button_weizhi" style="background-color:#02A7F0" >导航</view>
				<view class="button_weizhi"  style="background-color:#F8B7A1">预订</view>
			</view>
		</view>
		<view class="address_list">
			<view class="address_title">信息枢纽大厦</view>
			<view class="address_luxian" style="margin-top: 20rpx;font-size: 28rpx;!important">
				<span class="address_detail">位置：</span>
				<span class="address_detail">上海市长宁区协和路787弄</span>
			</view>
			<view>
				<span class="address_detail">交通：</span>
				<span class="address_detail">地铁2号线淞虹路地铁站，公交714号长华路</span>
			</view>
			<view class="button_row">
				<view class="button_weizhi" style="background-color:#02A7F0" >导航</view>
				<view class="button_weizhi"  style="background-color:#F8B7A1">预订</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return{
				
			}
			
		}

	}	
</script>

<style>
	.address_list{
		margin: 20rpx;
		border-bottom: 1rpx solid #eaeaea;
		padding:20rpx;
	}
	.button_row{
		display: flex;
		flex-wrap: row;
		justify-content: right;
		margin-top: 30rpx;
	}
	.button_weizhi{
		width: 128rpx;
		height: 60rpx;
		line-height: 60rpx;
		float: right;
		border: 1rpx solid #eaeaea;
		text-align: center;
		border-radius: 10rpx;
		color: #fff;
		font-size: 30rpx;
		margin-left: 60rpx;
	}
	.address_luxian{
		
	}
	.address_detail{
		color: #555555; 
		font-size: 30rpx;
	}
	.address_title{
		color: #333333;
		font-size: 30rpx;
	}

	
</style>