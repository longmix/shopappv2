<template>
	<view>
		<!--cms/discover/discover.wxml-->
		
		<!--宣传图片start-->
		<view class="swiper">
			<image class="tupian" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1603365312,3218205429&fm=26&gp=0.jpg"></image>
			
		</view>
		<!--宣传图片end-->
		
		<!--宣传文案-->
		<view class="wenan">
			 <view class="content">《故乡》是现代文学家鲁迅于1921年创作的一篇短篇小说。
			 小说以“我”回故乡的活动为线索，按照“回故乡”——“在故乡”——“离故乡”的情节安排
			 ，依据“我”的所见所闻</view>
		</view>
		<!--宣传文案end-->
		
		<!--爱拼购活动-->
		<view class="aipingou">
			<image class="aipingouimage" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1730713693,2130926401&fm=26&gp=0.jpg"></image>
		</view>
		<view class="biaoti">活动名称(商品名称)</view>
		<view class="activity">
			<button class="qupingou1">去拼购</button>
			<button class="qupingou2">我的拼购</button>
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
.swiper {
		width: 100%;
		height: 300rpx;
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		
	   }
.tupian{
	       width: 90%;
		   height:300rpx;
		   border-radius: 20rpx;
	   }
.wenan{
	width: 100%;
	margin-top: 30upx;
	display: flex;
	justify-content: center;
	}
	.content{
		
		width: 90%;
	}

.aipingou{
	width: 100%;
	height: 300rpx;
	margin-top: 20upx;
	text-align: center;
	justify-content: center;
}
.aipingouimage{
	width: 80%;
	height: 300rpx;
	border-radius: 10rpx;
	
}
.biaoti{
	width: 100%;
	text-align: center;
	margin-top: 10rpx;
}
.activity{
	width: 100%;
	margin-top: 30upx;
	display: flex;
}
.qupingou1{
	margin-left: 150rpx;
	font-size: 22rpx;
	background-color: #145b7d;
}
.qupingou2{
	margin-right: 150rpx;
	font-size: 22rpx;
	background-color:#145b7d;
}
</style>
