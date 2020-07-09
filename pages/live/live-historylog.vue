<template>
	<view style="background: #ccc;height: 100%;"><!-- 历史记录 -->
		<view v-for="(item,key) in video_live_log_list" :key="key" class="log_list_box">
			<view style="width:200rpx;height:200rpx;">
				<image style="width:200rpx;height:200rpx;" :src="item.coverImg"></image>
			</view>
			<view class="log_text_box"><!-- 右侧数据 -->
				<view>
					<view>{{item.startTime}}</view>
					<view>{{item.anchorName}}</view>
					<view>{{item.anchorWechat}}</view>
				</view>
				<!-- <view>
					<view>查看</view>
					<view>删除</view>
				</view> -->
			</view>
		</view>
		<!-- 结束 -->
		
		<!-- 说明 -->
		<view style="text-align: center;color: #333;background: #ffffff;">
			<image style="width: 50%;" :src="video_live_log.qrcode"></image>
			<view>{{video_live_log.qrcode_msg}}</view>
			<view>{{video_live_log.zhubo_msg}}</view>
		</view>
		
	</view>
</template>

<script>
	export default {
			
			data() {
				return {
					video_live_log_list:[],
					video_live_log:[],
				};
			},
			
			onLoad: function (options) {
				
				this.get_video_live_log();
				
			},
			onShow:function(){
				
			},
			onPageScroll: function (e) {},
			//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
			onPullDownRefresh: function () {},
			
			//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
			onReachBottom: function () {},
			onShareAppMessage: function () {},
			
			methods: {
				get_video_live_log:function(){
					
					var that = this;
					
					var userInfo = this.abotapi.get_user_info();
					
					this.abotapi.abotRequest({
					  url: this.abotapi.globalData.yanyubao_server_url + '/openapi/VideoLiveData/get_video_live_list_log',
					  data: {
					    sellerid: this.abotapi.get_sellerid(),
					    checkstr: userInfo.checkstr,
					    userid: userInfo.userid
					  },
					  success: function (res) {	
						console.log('res===>',res);
						
						var video_live_log_list = res.data.data;
						console.log('video_live_log_list===>',video_live_log_list);
						that.video_live_log_list = video_live_log_list;
						that.video_live_log = res.data;
					  }
					});
				},
			}
		
	}
</script>

<style>
	.log_list_box{
		display: flex;
		align-items: center;
		background: #ffffff;
		margin: 10rpx 0rpx;
		padding: 10rpx 20rpx;
		color: #333;
	}
	.log_text_box{
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		margin-left: 20rpx;
	}
</style>
