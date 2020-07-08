<template>
	<view style="background: #ccc;height: 100%;"><!-- 历史记录 -->
		<view style="display: flex;align-items: center;background: #ffffff;margin: 10rpx;
		padding: 10rpx 20rpx;color: #333;border-radius: 20rpx;">
			<view style="width:200rpx;height:200rpx;">
				<image src="../../static/img/share/wx.png" style="width:200rpx;height:200rpx;"></image>
			</view>
			<view style="display: flex;width: 100%;justify-content: space-between;align-items: center;margin-left: 20rpx;"><!-- 右侧数据 -->
				<view>
					<view>2020/07/08 12:00:00</view>
					<view>梁gg</view>
					<view>liang15948187241</view>
				</view>
				<view>
					<view>查看</view>
					<view>删除</view>
				</view>
			</view>
		</view>
		<!-- 结束 -->
		
	</view>
</template>

<script>
	export default {
			
			data() {
				return {
					
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
					    if (res.data.code == 1) {
					      that.balance = res.data.data.balance;
					      that.balance_zengsong = res.data.data.balance_zengsong;
					    } 	
					  }
					});
				},
			}
		
	}
</script>

<style>
</style>
