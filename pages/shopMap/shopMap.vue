<template>
	<view>
		<view class="map_container"> 
		  <!-- <map class="map" id="map" longitude="121.159498" latitude="31.24321" scale="14" show-location="true" markers="{{markers}}" bindmarkertap="makertap"></map>  -->
		  <map class="map" id="map" :longitude="qqmap_longitude" :latitude="qqmap_latitude" scale="14" show-location="true" :markers="markers" bindmarkertap="map_tap"></map> 
		</view> 
		
		<view class="btm">
			<view class="name">{{shopInfo.name}}</view>
			<view class="adderss">{{shopInfo.address}}</view>
			<view class="adderss" @tap="call_seller">{{shopInfo.telephone}}</view>
			<view v-if="from_page == 1 || from_page == 2" @tap="seeRoute" class="seeroute">到这去</view>
			<view v-else-if="from_page == 3" @tap="seeRoute" class="seeroute">打卡</view>
		</view>
		
	</view>
</template>

<script>
	// 引用百度地图微信小程序JSAPI模块 
	var bmap = require('../../common/SDK/bmap-wx.js');
	var wxMarkerData = [];
	
	var locationapi = require('../../common/locationapi.js');
	
	
	export default {
		data() {
			return {
				markers: [],
				
				//腾讯地图的坐标点
				qqmap_latitude: '',
				qqmap_longitude: '',
				
				//百度地图的坐标点
				bmap_latitude: '',
				bmap_longitude: '',
				
				
				from_page:1,
				
				rgcData: {},
				detail:[],
				shopInfo: {}
			}
		},
		/**
		 * 
		 * @param {Object} options
		 * 
		 * 参数：
		 * longitude 百度地图的经度
		 * latitude 百度地图的纬度
		 * 
		 * from_page 选填，来自哪个功能模块， 1 商家详情页面 2 会员卡页面 3 打开签到页面
		 * 
		 * address 必填，详细地址
		 * name  商户名称
		 * telephone  商户电话
		 * 
		 * 
		 * 
		 */
		onLoad(options){
			//var that = this;
			
			this.abotapi.set_option_list_str(this, this.abotapi.getColor());
			
			//记录百度地图的坐标点
			this.bmap_latitude = options.latitude;
			this.bmap_longitude = options.longitude;
			console.log('this.bmap_latitude',this.bmap_latitude);
			
			var markers = [];		
			var res = this.abotapi.bMapToQQMap(this.bmap_longitude, this.bmap_latitude);
			
			this.qqmap_latitude = res[1];
			this.qqmap_longitude = res[0];
			
			markers.push({
							'id':0,
			                'latitude': this.qqmap_latitude,
			                'longitude': this.qqmap_longitude,
							
			            });
			//markers.push({'longitude':this.qqmap_longitude, 'latitude':this.qqmap_latitude});
			//markers.push({'id':1, longitude':that.qqmap_longitude, 'latitude':that.qqmap_latitude});
					
			this.markers = markers;
			this.shopInfo = options;
			
			
			this.from_page = options.from_page;
			console.log('this.from_page',this.from_page);
		},
		methods: {
			map_tap:function(e){
				
			},
			seeRoute:function(e){
				  
				if((this.from_page == 1) || (this.from_page == 2)  ){
					//进图导航功能
					var latitude = parseFloat(this.markers[0].latitude);
					var longitude = parseFloat(this.markers[0].longitude);
					
					uni.openLocation({
					  latitude,
					  longitude,
					  scale: 18
					})
					
				}
				else if(this.from_page == 3){
					//进去打卡签到功能
					
					//打卡的目标GPS
					var latitude = this.bmap_latitude;
					var longitude = this.bmap_longitude;
					
					locationapi.get_location(this, function(that001, locationData){
						//ajax请求，保存签到数据
						var userInfo = that001.abotapi.get_user_info();
						
						var lbs02 = {
							latitude:latitude,
							longitude:longitude,
							userid:123456,
						};
						var lbs_json = encodeURIComponent(JSON.stringify(lbs02))
						
						
						//checkin_latitude  checkin_longitude 受助者的坐标地址
						
						var post_data = {
							sellerid:that001.abotapi.globalData.default_sellerid,
							userid:123456,
							latitude:locationData.latitude,
							longitude:locationData.longitude,
							city:locationData.addressComponent.city,
							address:locationData.address,
							lbs02:lbs_json,
						}
						
						//签退的时候
						if(0){
							post_data.tongji_key = 'checkout';
						}else if(1){
							post_data.tongji_key = 'checkin';
						}
						
						
						
						
						that001.abotapi.abotRequest({
							url: 'http://192.168.0.205/yanyubao_server/index.php/openapi/LbsCheckinData/set_data_tongji',
							method: 'post',
							data: post_data,
							success: function (res) {
								console.log(res);
								if(res.data.code == 1){
									uni.showToast({
										title:res.data.msg
									})
									// setTimeout(function () {
									// 	console.log(132);
									//   uni.navigateTo({
									//   	url:'/pages/checkin/checkin'
									//   })
									 
									// }, 2000)
									
									setTimeout(function(){
										console.log(1);
										uni.switchTab({
											url:"/pages/checkin/checkin"
										})
									},1000)
									
								}
							} 
						})
						
						console.log('=>',locationData);
					})
					
					
				}
			    
				
			},
			call_seller: function () {			      
			      uni.makePhoneCall({
			  		phoneNumber: this.shopInfo.telephone,
			      })
			},
		}
		
	};
	
	
	
</script>

<style>
	.map_container{ 
	    height: 500px; 
	    width: 100%; 
	} 
	
	.map { 
	    height: 100%; 
	    width: 100%; 
	}
	.name{
	  margin-left: 4%;
	  color: #0f0f0f;
	  font-size: 16px;
	  margin-bottom: 10rpx;
	}
	.adderss{
	  margin-left: 4%;
	  color: #5d5d5d;
	  font-size: 14px;
	  margin-bottom: 20rpx;
	}
	.seeroute{
	  text-align: center;
	  font-size: 18px;
	  color: #333;
	  line-height:80rpx;
	  width: 92%;
	  margin-left: 4%;
	  background: #FFD700;
	  border-radius: 15rpx;
	}
	.btm{
		position: fixed;
		width: 100%;
		bottom: 60upx;
	}
</style>
