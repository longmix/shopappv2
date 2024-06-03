<template>
	<view class="community-list">
		<radio-group class="radio-group">
			<view class="community-item">
				<view class="community-detail">
					<view class="community-title">海秦时代大厦 <view class="community-moren">默认</view></view>
					<view class="community-bianji">编辑</view>
				</view>
				<view class="community-dianhua">
					<view class="community-dianhua-detail">电话：13658974589</view>
				</view>
				<view class="community-bottom" style="margin-top: 30rpx;">
					<view class="community-icon">
						<radio style="transform:scale(0.7)" />
						<view class="community-sheweimoren">默认地址</view>
					</view>
					<view class="community-lajitong">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/community_service/垃圾桶.png" style="width: 40rpx; height: 40rpx;"></image>
					</view>
				</view>
			</view>
			<view class="community-item">
				<view class="community-detail">
					<view class="community-title">通河一村</view>
					<view class="community-bianji">编辑</view>
				</view>
				<view class="community-dianhua">
					<view class="community-dianhua-detail">电话：13658974589</view>
				</view>
				<view class="community-bottom" style="margin-top: 30rpx;">
					<view class="community-icon">
						<radio style="transform:scale(0.7)" />
						<view class="community-sheweimoren">默认地址</view>
					</view>
					<view class="community-lajitong">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/community_service/垃圾桶.png" style="width: 40rpx; height: 40rpx;"></image>
					</view>
				</view>
			</view>
			<view class="community-item">
				<view class="community-detail">
					<view class="community-title">田林六村</view>
					<view class="community-bianji">编辑</view>
				</view>
				<view class="community-dianhua">
					<view class="community-dianhua-detail">电话：13658974589</view>
				</view>
				<view class="community-bottom" style="margin-top: 30rpx;">
					<view class="community-icon">
						<radio style="transform:scale(0.7)" />
						<view class="community-sheweimoren">默认地址</view>
					</view>
					<view class="community-lajitong">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/community_service/垃圾桶.png" style="width: 40rpx; height: 40rpx;"></image>
					</view>
				</view>
			</view>
			<view class="community-item">
				<view class="community-detail">
					<view class="community-title">新家苑十二街坊</view>
					<view class="community-bianji">编辑</view>
				</view>
				<view class="community-dianhua">
					<view class="community-dianhua-detail">电话：13658974589</view>
				</view>
				<view class="community-bottom"  style="margin-top: 30rpx;">
					<view class="community-icon">
						<radio style="transform:scale(0.7)" />
						<view class="community-sheweimoren">默认地址</view>
					</view>
					<view class="community-lajitong">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/community_service/垃圾桶.png" style="width: 40rpx; height: 40rpx;"></image>
					</view>
				</view>
			</view>
		</radio-group>
		<view class="community-xinzeng">
			<view class="community-xinzengshequ">
				+新增社区
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				
			}
		}
	}	
</script>

<style>
	.community-list{
		background-color: #F4F4F4;
		padding: 20rpx;
	}
	.community-item{
		border: 2rpx solid #ffffff;
		background-color: #fff;
		padding: 20rpx;
		margin-top: 20rpx;
	}
	.community-moren{
		height: 36rpx;
		border: 2rpx solid #85c9e6;
		border-radius: 20upx;
		font-size: 16rpx;
		color: #85c9e6;
		text-align: center;
		margin-left: 20rpx;
		padding: 0 10rpx;
	}
	.community-title{
		flex-flow: row;
		justify-content: flex-start;
		display: flex;
	}
	 .community-bottom, .community-detail{
		flex-flow: row;
		justify-content: flex-start;
		display: flex;
		justify-content: space-between;
		
	}
	.community-bianji{
		background-color: #F1649D;
		padding: 8rpx 14rpx;
		border-radius: 22upx;
		font-size: 16rpx;
		color: #fff;
	}
	.community-dianhua{
		margin-top: 10rpx;
	}
	.community-dianhua-detail{
		font-size: 26rpx;
	}
	.community-icon{
		flex-flow: row;
/* 		justify-content: flex-start; */
		display: flex;
	}
	.community-sheweimoren{
		font-size: 26rpx;
		margin-top: 8rpx;
	}
	.community-xinzengshequ{
		border: 2rpx solid #ffffff;
		background-color: #fff;
		padding: 40rpx;
		margin-top: 10rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: #8f8f8f;
		text-align: center;
	}
	
</style>