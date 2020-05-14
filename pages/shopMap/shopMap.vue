<template>
	<view>
		<view class="map_container"> 
		  <!-- <map class="map" id="map" longitude="121.159498" latitude="31.24321" scale="14" show-location="true" markers="{{markers}}" bindmarkertap="makertap"></map>  -->
		  <map class="map" id="map" :longitude="longitude" :latitude="latitude" scale="14" show-location="true" :markers="markers" bindmarkertap="makertap"></map> 
		</view> 
		
		<view class="btm">
			<view class="name">{{shopInfo.name}}</view>
			<view class="adderss">{{shopInfo.address}}</view>
			<view class="adderss" @tap="call_seller">{{shopInfo.telephone}}</view>
			<view @tap="seeRoute" class="seeroute">到这去</view>
		</view>
		
	</view>
</template>

<script>
	// 引用百度地图微信小程序JSAPI模块 
	var bmap = require('../../common/SDK/bmap-wx.js');
	var wxMarkerData = [];
	
	
	export default {
		data() {
			return {
				markers: [],
				latitude: '',
				longitude: '',
				rgcData: {},
				detail:[],
				shopInfo: {}
			}
		},
		onLoad(options){
			var that = this;	
			this.abotapi.set_option_list_str(that,that.abotapi.getColor());
			var markers = [];		
			var res = that.abotapi.bMapToQQMap(options.longitude,options.latitude);
			options.longitude = res[0];
			options.latitude = res[1];
			
			markers.push(options);
						
			that.markers = markers;
			that.shopInfo = options;
			that.latitude = options.latitude
			that.longitude = options.longitude		
		},
		methods: {
			  seeRoute:function(e){
			    var latitude = parseFloat(this.markers[0].latitude)
			    var longitude = parseFloat(this.markers[0].longitude)
			    uni.openLocation({
			      latitude,
			      longitude,
			      scale: 18
			    })
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
	    height: 300px; 
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
