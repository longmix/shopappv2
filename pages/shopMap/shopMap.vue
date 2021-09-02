<template>
	<view>
		<view class="map_container" :style="{height:mapHeight+'rpx'}"> 
		  <!-- <map class="map" id="map" longitude="121.159498" latitude="31.24321" scale="14" show-location="true" markers="{{markers}}" bindmarkertap="makertap"></map>  -->
		  <map class="map" id="map" :longitude="qqmap_longitude" :latitude="qqmap_latitude" scale="14" show-location="true" :markers="markers" bindmarkertap="map_tap"></map> 
		</view> 
		
		<view class="btm">
			<view class="adderss" style="font-weight: bold;">{{shopInfo.name}}</view>
			<view class="adderss">{{shopInfo.address}}</view>
			<view class="phone_number" @tap="call_seller">{{shopInfo.telephone}}</view>
			<view v-if="from_page == 1 || from_page == 2" 
				 :style="{background: btn_bg_color,color:frontColor}"
				@tap="seeRoute" class="seeroute">到这去</view>
			<view v-else-if="from_page == 3" 
				:style="{background: btn_bg_color,color:frontColor}" 
				@tap="seeRoute" class="seeroute">打卡</view>
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
				
				//来自哪个功能模块， 1 商家详情页面 2 会员卡页面 3 打开签到页面
				from_page:1,  
				
				rgcData: {},
				detail:[],
				
				
				shopInfo: {},	//存放所有传过来的参数
				
				options_citizenid:'',//受助人userid
				btn_bg_color:'',
				frontColor:'',
				
				mapWidth:750,
				mapHeight:0,
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
			console.log('this.options',options);
			
			if(options.citizenid){
				//受助人citizenid
				
				this.options_citizenid = options.citizenid;
			}
			
			this.abotapi.set_option_list_str(this, this.call_back_set_option);
			
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
			
			if(options.from_page){
				this.from_page = options.from_page;
			}
			
			console.log('this.from_page',  this.from_page);
			
			
			
			var system_info = uni.getSystemInfoSync();
			
			console.log('getSystemInfo==>>>system_info==>>>', system_info)
			console.log('getSystemInfo==>>>system_info==>>>', system_info.windowWidth)

			
			//宽高比
			var ratio = system_info.windowWidth / system_info.windowHeight;
			
			this.mapWidth = 750;
			
			//计算的高度值
			this.mapHeight = (this.mapWidth * 0.92)/ ratio;
			
			
			
			
		},
		methods: {
			map_tap:function(e){
				
			},
			
			call_back_set_option:function(that, cb_params){
				
				console.log('cb_params==>',cb_params);
				
				var that = this;
				
				console.log('that.abotapi.globalData.navigationBarBackgroundColor_fixed==>>', that.abotapi.globalData.navigationBarBackgroundColor_fixed);
				
				
				if(that.abotapi.globalData.navigationBarBackgroundColor_fixed == 1){
					
					console.log('that.abotapi.globalData.navigationBar_bg_color==>>', that.abotapi.globalData.navigationBar_bg_color)
					
					uni.setNavigationBarColor({
						backgroundColor:that.abotapi.globalData.navigationBar_bg_color,
						frontColor:that.abotapi.globalData.navigationBar_font_color,
					})
					that.frontColor = that.abotapi.globalData.navigationBar_font_color;
					that.btn_bg_color = that.abotapi.globalData.navigationBar_bg_color;
					
				}
				else{
					uni.setNavigationBarColor({
						backgroundColor:cb_params.wxa_shop_nav_bg_color,
						frontColor:cb_params.wxa_shop_nav_font_color,
					})
					console.log('cb_params==>',cb_params.wxa_shop_nav_font_color);
					that.frontColor = cb_params.wxa_shop_nav_font_color;
					that.btn_bg_color = cb_params.wxa_shop_nav_bg_color;
				}
			},
			
			seeRoute:function(e){
				  
				if((this.from_page == 1) || (this.from_page == 2)  ){
					//进图导航功能
					var latitude = parseFloat(this.markers[0].latitude);
					var longitude = parseFloat(this.markers[0].longitude);
					
					var location_data = {
					  latitude,
					  longitude,
					  scale: 18
					};
					
					if(this.shopInfo.name){
						location_data.name = this.shopInfo.name;
					}
					if(this.shopInfo.address){
						location_data.address = this.shopInfo.address;
					}
					
					uni.openLocation(location_data)
					
				}
				else if(this.from_page == 3){
					//进去打卡签到功能
					
					//打卡的目标GPS
					var latitude = this.bmap_latitude;
					var longitude = this.bmap_longitude;
					
					
					locationapi.get_location_remove();
					
					locationapi.get_location(this, function(that001, locationData){
						//ajax请求，保存签到数据
						var userInfo = that001.abotapi.get_user_info();
						
						var lbs02 = {
							latitude:latitude,
							longitude:longitude,
							citizenid:that001.options_citizenid,
						};
						var lbs_json = encodeURIComponent(JSON.stringify(lbs02))
						
						
						//checkin_latitude  checkin_longitude 受助者的坐标地址
						
						var post_data = {
							sellerid:that001.abotapi.globalData.default_sellerid,
							userid:userInfo.userid,
							checkstr: userInfo.checkstr,
							latitude:locationData.latitude,
							longitude:locationData.longitude,
							city:locationData.addressComponent.city,
							address:locationData.address,
							lbs02:lbs_json,
						}
						
						//签退的时候  目前没有用到这里  判断是签到签退在服务器端判断了
						if(0){
							post_data.tongji_key = 'checkout';
						}else if(1){
							post_data.tongji_key = 'checkin';
						}
						
						
						
						
						that001.abotapi.abotRequest({
							url: that001.abotapi.globalData.yanyubao_server_url + 'openapi/LbsCheckinData/set_data_tongji',
							method: 'post',
							data: post_data,
							success: function (res) {
								console.log(res);
								if(res.data.code == 1){
									uni.showModal({
										title:'打卡成功',
										content:res.data.msg,
										showCancel:false,
										success: (res) => {
											uni.switchTab({
												url:"/pages/checkin/checkin"
											})
										}
									})
									
								}
								else{
									uni.showToast({
										title:res.data.msg
									})
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
	    /*height: 500px; */
	    width: 100%; 
	} 
	
	.map { 
	    height: 100%; 
	    width: 100%; 
	}
	
	.btm{
		position: fixed;
		width: 100%;
		bottom: 0;
		height: 300rpx;
		left: 0;
		z-index: 101;
		background-color: #ffffff;
		padding: 20rpx;
	}
	
	.phone_number{
	  color: #0f0f0f;
	  font-size: 30rpx;
	  margin-bottom: 10rpx;
	}
	.adderss{
	  color: #5d5d5d;
	  font-size: 26rpx;
	  margin-bottom: 20rpx;
	}
	.seeroute{
	  text-align: center;
	  font-size: 36rpx;
	  color: #333;
	  line-height:80rpx;
	  width: 92%;
	  background: #FFD700;
	  border-radius: 15rpx;
	}
	
	
</style>
