<template>
	<view>
		<view class="head">
			<image src="../../static/img/addricon.png" style="width:40upx;height: 40upx;margin-left:20rpx ;"></image>
			<view>
			  当前位置:{{address_info_current}}
			</view>
		      <!-- <view calss="right">切换区县<img style="width: 35rpx; height: 33rpx;"
			   src="../../static/img/category/down.png" alt=""></view> -->
		</view>
		
		<view class="middle">
			<!-- <view class="hui">定位/最近访问</view>
			 -->	
			<!-- <view class="a"><img style="width: 35rpx;height: 30rpx;" src="../../static/img/category/weizhi.png" alt="">
				上海
			</view> -->
			<!-- <view class="hui">热门城市</view> -->
			<view class="city_box">
				<view class="kuai" v-for="(item,index) in address_list" :key="item" @tap="go_home(item.value)">{{item.value}}</view>
			</view>

		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address_info_current:'',
				address_list:'',
			};
		},
		onPageScroll: function (e) {
			
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh: function () {
			
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom: function () {
			
		},
		onLoad: function (options) {
			
			var address_info =  uni.getStorageSync('address_info');
			this.address_info_current = address_info.city; //获取缓存中的当前城市的名称
			
			
			this.get_address_city(); //获取城市列表
		},
		methods: {
			get_address_city:function(){
				//获取当前城市function
				var that = this;
				this.abotapi.abotRequest({
				  url: this.abotapi.globalData.yanyubao_server_url + 'openapi/XianmaiShangData/get_address_city',
				  method: 'post',
				  data: {
					sellerid: this.abotapi.globalData.default_sellerid,
				  },
				  header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				  },
				  success: function (res) {
					if (res.data.code == 1) {
						that.address_list = res.data.data;	
						console.log('res.data.data',res.data.data);
					}
				
				
				  },
				  fail: function (e) {
					wx.showToast({
					  title: '网络异常！',
					  duration: 2000
					});
				  },
				})
				
			},
			
			go_home:function(e){
				console.log(e);
				uni.setStorageSync('city_name',e);
				uni.switchTab({
					url:'../home/home'
				});
			}
		}
	}
	
</script>

<style>
 .head{
	display: inline-flex;
	outline-width:50upx; 
	display: flex;
	align-items: center;
	line-height: 120upx;
	font-size: 32upx;
}
.right{
	float:left;
	flex-wrap: nowrap;
}

.city_box{
	display: flex;
	align-items: center;
	
	flex-wrap: wrap;
}
.kuai{

	float: left;
	border-radius: 10rpx;
	width: 21%;
	background: #fff;
	margin: 10upx 1.5%;
	text-align: center;
	padding: 10px 0px;
	border-radius: 10px;
	border: 1px solid #eee;

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

</style>
