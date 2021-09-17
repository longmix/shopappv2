<template>
	<view>
		<view class="head" style="margin-top: 40rpx;">
			<image src="../../static/img/addricon.png" style="width:40upx;height: 40upx;margin-left:20rpx ;"></image>
			<view style="margin-left: 20upx ;">
			  <view style="color: #808080;display:inline-block;">当前位置：</view>
			</view>
			
		      <!-- <view calss="right">切换区县<img style="width: 35rpx; height: 33rpx;"
			   src="https://yanyubao.tseo.cn/Tpl/static/images/down.png" alt=""></view> -->
		</view>
		<view class="head">

			<view style="margin-left: 20upx ;">
			  {{address_info_current}}
			</view>
		     
		</view>
		
		<view class="head" style="margin-top: 40rpx;">
			<image src="../../static/img/VIP.png" style="width:40upx;height: 40upx;margin-left:20rpx ;"></image>
			<view style="margin-left: 20upx ;">
			  <view style="color: #808080;display:inline-block;">城市列表：</view>
			</view>
			
		      <!-- <view calss="right">切换区县<img style="width: 35rpx; height: 33rpx;"
			   src="https://yanyubao.tseo.cn/Tpl/static/images/down.png" alt=""></view> -->
		</view>
		<view class="middle">
			<!-- <view class="hui">定位/最近访问</view>
			 -->	
			<!-- <view class="a"><img style="width: 35rpx;height: 30rpx;" src="https://yanyubao.tseo.cn/Tpl/static/imagesweizhi.png" alt="">
				上海
			</view> -->
			<!-- <view class="hui">热门城市</view> -->
			<view class="city_box">
				<view class="kuai" v-for="(item,index) in address_list" :key="item.value" @tap="go_home(item.value)">{{item.value}}</view>
			</view>

		</view>
		
	</view>
</template>

<script>
	
	import locationapi from '../../common/locationapi.js'; 
	
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
			locationapi.get_location_remove();
			//var address_info =  uni.getStorageSync('address_info');
			var that = this;
			
			
			
			this.abotapi.set_option_list_str(null, this.abotapi.getColor());
			
			this.get_address_city(); //获取城市列表
			
			locationapi.get_location(that, function(that,locationData){
				
				console.log('获取城市列表页面locationData',locationData);
				
				//获取缓存中的当前城市的名称
				if(locationData.addressComponent){
					that.address_info_current = locationData.addressComponent.city;
					if(locationData.addressComponent.district){
						that.address_info_current += locationData.addressComponent.district;
					}
					if(locationData.addressComponent.street){
						that.address_info_current += locationData.addressComponent.street;
					}
					if(locationData.addressComponent.streetNum){
						that.address_info_current += locationData.addressComponent.streetNum;
					}
					if(locationData.addressComponent.poiName){
						that.address_info_current += locationData.addressComponent.poiName;
						that.address_info_current += '附近';
					}
					else{
						that.address_info_current += '附近';
					}
					
					//that.address_info_current += that.address_info_current;
					//that.address_info_current += that.address_info_current;
				}
				
				
			});
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
					url:'../index/index'
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
	line-height: 60upx;
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
	background: #fff;
	margin: 10rpx 1.5%;
	text-align: center;
	padding: 10rpx 20rpx;
	border-radius: 10rpx;
	border: 1rpx solid #a2a2a2;
	height: 35rpx;
	line-height: 35rpx;
	font-size: 32rpx;

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
