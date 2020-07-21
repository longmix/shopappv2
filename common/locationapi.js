
import bmap from './SDK/bmap-wx.js';
import abotapi from './abotapi.js';


module.exports = {
	
	//获取经纬度（国测局坐标）
	get_location: function (that, callback_function='') {
	
		var that002 = this; 
		
		console.log('123456789 get_location');
		
		let locationData = uni.getStorageSync('locationData');
		console.log('获取缓存坐标',locationData);
		
		if(locationData){
			console.log('get_location in cache =====>>>>', locationData);
			console.log('进入3');
			typeof callback_function == "function" && callback_function(that, locationData);
			return;
		}else{
			console.log('进入没有缓存开始');

			var regeocoding_success = function (data) {
				console.log('regeocoding_success locationapi===', data);
							
				
				// uni.showModal({
				//     title: '提示000',
				//     content: JSON.stringify(data),
				//     success: function (res) {
				       
				//     }
				// });
				
							
				
				console.log('location---longitude===',data.wxMarkerData[0].longitude)
				console.log('location---latitude===',data.wxMarkerData[0].latitude)
				
				let locationData = data.wxMarkerData[0];
				
				let pointArr = [locationData.longitude, locationData.latitude];
				
				
				let translate = that002.gcj2bd(locationData.latitude,locationData.longitude);
				
				locationData.latitude = translate[0];
				locationData.longitude = translate[1];
				
				locationData.addressComponent = data.originalData.result.addressComponent;
							
				
				//缓存位置信息					
				uni.setStorageSync('locationData', locationData)
				console.log('进入1');
				typeof callback_function == "function" && callback_function(that, locationData);
				return;		
			};
			
			
			// 失败返回默认位置信息
			var regeocoding_fail = function(res){
				console.log('uni.getLocation fail locationapi====>>>>', res);
				
				// uni.showModal({
				//     title: '提示111',
				//     content: JSON.stringify(res),
				//     success: function (res) {
				       
				//     }
				// });
				

				let locationData = [];
			
				locationData['latitude'] = 31.293216;
				locationData['longitude'] = 121.662945;
				
				console.log('set virtual coordinate ====>>>>>', locationData);
				console.log('进入2');
				typeof callback_function == "function" && callback_function(that, locationData);				
				return;
				
			};
			var regeocoding_complete = function(res){
				console.log('uni.getLocation complete locationapi ====>>>>', res);
			};
			
			/* 获取定位地理位置 */
			// 新建bmap对象
			var baidu_map_ak = '';
			
			
			// #ifdef H5
				console.log('进入，没有缓存，H5开始');
				baidu_map_ak = that.abotapi.globalData.option_list.baidu_map_ak_h5;
				
				var geolocation = new BMap.Geolocation();
				
				geolocation.getCurrentPosition(
					function (r) {
						//alert('status:' + this.getStatus());//alert('aaaa');//return;
						
				        if (this.getStatus() != BMAP_STATUS_SUCCESS) {
							alert('geolocation.getCurrentPosition success===>>>>但是状态不对====>>>>'+JSON.stringify(this.getStatus()));
							
							return;
						}
						
						var mk = new BMap.Marker(r.point);
						            
						
						
						var locationData = {};
						locationData.latitude = r.point.lat;  
						locationData.longitude = r.point.lng;
						
						//
						
						var pt = new BMap.Point(locationData.longitude, locationData.latitude);  
						var geoc = new BMap.Geocoder(); 
						geoc.getLocation(pt, function (rs) {
							locationData.addressComponent = rs.addressComponents;
							 
							 //缓存位置信息			getStorageSync
							 uni.setStorageSync('locationData', locationData)
							 
							 console.log('进入 H5 获取经纬度完成=====>>>>>>', locationData);
							 
							 typeof callback_function == "function" && callback_function(that, locationData);
						
						});
						
						
					},
					function(r){    
						
					    	alert('geolocation.getCurrentPosition failure===>>>>'+JSON.stringify(r));
														
					},
					{
					            // 指示浏览器获取高精度的位置，默认为false
					            enableHighAcuracy: false,
					            // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
					            timeout: 2000,
					            // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
					            maximumAge: 0
					},
				);
				
				
				
				
			// #endif
			
			// #ifdef APP-PLUS-AAA
				baidu_map_ak = that.abotapi.globalData.option_list.baidu_map_ak_app;
			// #endif
			
			// #ifdef MP-WEIXIN
				console.log('进入没有缓存微信开始');
				
				baidu_map_ak = that.abotapi.globalData.option_list.baidu_map_ak_wxa;
				
				console.log('结束1',baidu_map_ak);
				
				var BMap_obj = new bmap.BMapWX({
					ak: baidu_map_ak
				});
				
				console.log('实例化百度地图');
					
				BMap_obj.regeocoding({
					fail: regeocoding_fail,
					success: regeocoding_success,
					complete: regeocoding_complete
				});
				console.log('结束');
			// #endif
			
			// #ifdef APP-PLUS
				console.log('进入没有缓存app开始');
				// baidu_map_ak = that.abotapi.globalData.option_list.baidu_map_ak_wxa;
				// console.log('结束2',baidu_map_ak);
				
				uni.getLocation({
				    type: 'wgs84',
					geocode:true,
				    success: function (res) {
						//let translate = that002.gcj2bd(res.latitude,res.longitude); //坐标转换
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
						//console.log('当前位置的经度：' + translate);
						console.log('当前位置的经度：' + JSON.stringify(res.address));
						
						var locationData = {};
						locationData.latitude = res.latitude;
						locationData.longitude = res.longitude;
						
						locationData.addressComponent = res.address;
									
						
						//缓存位置信息			getStorageSync		
						uni.setStorageSync('locationData', locationData)
						
						console.log('进入1');
						
						typeof callback_function == "function" && callback_function(that, locationData);
						
						return;		
						
				    },
					fail:function (res) {
						console.log('getLocation获取地址失败');
					},
					complete:function(){
						console.log('getLocation失败成功都进入');
					}
				});
				
				
				
				// var BMap_obj = new bmap.BMapWX({
				// 	ak: baidu_map_ak
				// });
				// console.log('实例化百度地图');
					
				// BMap_obj.regeocoding({
				// 	fail: regeocoding_fail,
				// 	success: regeocoding_success,
				// 	complete: regeocoding_complete
				// });
				console.log('结束');
			// #endif
			
			// #ifdef MP-BAIDU
				console.log('百度智能小程序中获取坐标');
				
				baidu_map_ak = that.abotapi.globalData.option_list.baidu_map_ak_wxa;
				
				console.log('结束1',baidu_map_ak);
				
				var BMap_obj = new bmap.BMapWX({
					ak: baidu_map_ak
				});
				
				console.log('实例化百度地图完成', BMap_obj);
					
				BMap_obj.regeocoding({
					fail: regeocoding_fail,
					success: regeocoding_success,
					complete: regeocoding_complete
				});
				console.log('结束');
			// #endif
			
			
			

		}
	},
	
	get_location_remove:function(){
		uni.removeStorageSync("locationData");
	},
	
	pi: 3.14159265358979324,
	a: 6378245.0,
	ee: 0.00669342162296594323,
	x_pi: 3.14159265358979324*3000.0/180.0,
	 
	 
	//世界大地坐标转为百度坐标
	wgs2bd:function (lat,lon) {
	    var wgs2gcjR = this.wgs2gcj(lat, lon);
	    var gcj2bdR = this.gcj2bd(wgs2gcjR[0], wgs2gcjR[1]);
	    return gcj2bdR;
	},
	 
	gcj2bd:function (lat,lon) {
	    var x = lon, y = lat;
	    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
	    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
	    var bd_lon = z * Math.cos(theta) + 0.0065;
	    var bd_lat = z * Math.sin(theta) + 0.006;
	    var result = [];
	    result.push(bd_lat);
	    result.push(bd_lon);
	    return result;
	},
	 
	bd2gcj:function (lat,lon) {
	    var x = lon - 0.0065, y = lat - 0.006;
	    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
	    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
	    var gg_lon = z * Math.cos(theta);
	    var gg_lat = z * Math.sin(theta);
	    var result = [];
	    result.push(gg_lat);
	    result.push(gg_lon);
	    return result;
	},
	 
	wgs2gcj:function (lat,lon) {
	    var dLat = this.transformLat(lon - 105.0, lat - 35.0);
	    var dLon = this.transformLon(lon - 105.0, lat - 35.0);
	    var radLat = lat / 180.0 * this.pi;
	    var magic = Math.sin(radLat);
	    magic = 1 - this.ee * magic * magic;
	    var sqrtMagic = Math.sqrt(magic);
	    dLat = (dLat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtMagic) * this.pi);
	    dLon = (dLon * 180.0) / (this.a / sqrtMagic * Math.cos(radLat) * this.pi);
	    var mgLat = lat + dLat;
	    var mgLon = lon + dLon;
	    var result = [];
	    result.push(mgLat);
	    result.push(mgLon);
	    return result;
	},
	 
	transformLat:function (lat,lon) {
	    var ret = -100.0 + 2.0 * lat + 3.0 * lon + 0.2 * lon * lon + 0.1 * lat * lon + 0.2 * Math.sqrt(Math.abs(lat));
	    ret += (20.0 * Math.sin(6.0 * lat * this.pi) + 20.0 * Math.sin(2.0 * lat * this.pi)) * 2.0 / 3.0;
	    ret += (20.0 * Math.sin(lon * this.pi) + 40.0 * Math.sin(lon / 3.0 * this.pi)) * 2.0 / 3.0;
	    ret += (160.0 * Math.sin(lon / 12.0 * this.pi) + 320 * Math.sin(lon * this.pi  / 30.0)) * 2.0 / 3.0;
	    return ret;
	},
	 
	transformLon:function (lat,lon) {
	    var ret = 300.0 + lat + 2.0 * lon + 0.1 * lat * lat + 0.1 * lat * lon + 0.1 * Math.sqrt(Math.abs(lat));
	    ret += (20.0 * Math.sin(6.0 * lat * this.pi) + 20.0 * Math.sin(2.0 * lat * this.pi)) * 2.0 / 3.0;
	    ret += (20.0 * Math.sin(lat * this.pi) + 40.0 * Math.sin(lat / 3.0 * this.pi)) * 2.0 / 3.0;
	    ret += (150.0 * Math.sin(lat / 12.0 * this.pi) + 300.0 * Math.sin(lat / 30.0 * this.pi)) * 2.0 / 3.0;
	    return ret;
	},
	
	
	
}
