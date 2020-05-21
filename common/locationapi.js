
import bmap from './SDK/bmap-wx.js';
import abotapi from './abotapi.js';
module.exports = {
	
	//获取经纬度（国测局坐标）
	get_location: function (that, call_back_get_shang_list='') {
	
		var that002 = this; 
		
		console.log('123456789 get_location');
		
		var coordinate = uni.getStorageSync('coordinate_array');
		// if(coordinate){
		// 	console.log('get_location in cache =====>>>>', coordinate);
			
		// 	typeof call_back_get_shang_list == "function" && call_back_get_shang_list(that, coordinate);
		// 	return;
		// }else{
		
			var coordinate = [];
			var regeocoding_success = function (data) {
				console.log('00000111', data);
				
				console.log('location---longitude===',data.wxMarkerData[0].longitude)
				console.log('location---latitude===',data.wxMarkerData[0].latitude)
				
				let wxMarkerData = data.wxMarkerData;
							
				console.log('address',this.address);
				
				//调用显示商家的接口
				
				
				uni.setStorageSync('address_info', this.cityInfo)
				
				uni.setStorageSync("coordinate_array", coordinate);			
				// console.log('with', that.data.imageWidth)			
			};
			
			
			
			var regeocoding_fail = function(res){
				console.log('uni.getLocation fail ====>>>>', res);
				
				var coordinate = [];
				coordinate['latitude'] = 31.293216;
				coordinate['longitude'] = 121.662945;
				
				console.log('set virtual coordinate ====>>>>>', coordinate);
				
				typeof call_back_get_shang_list == "function" && call_back_get_shang_list(that, coordinate);
				
				return;
				
			};
			var regeocoding_complete = function(res){
				console.log('uni.getLocation complete ====>>>>', res);
			};
			
			/* 获取定位地理位置 */
			// 新建bmap对象
			// #ifdef H5
				var baidu_map_ak = abotapi.globalData.option_list.baidu_map_ak_h5;
			// #endif
			// #ifdef APP-PLUS
				var baidu_map_ak = abotapi.globalData.option_list.baidu_map_ak_app;
			// #endif
			// #ifdef MP-WEIXIN
				var baidu_map_ak = abotapi.globalData.option_list.baidu_map_ak_wxa;
			// #endif
			
			
			var BMap_obj = new bmap.BMapWX({
				ak: baidu_map_ak
			});
			
			
			BMap_obj.regeocoding({
				fail: regeocoding_fail,
				success: regeocoding_success,
				complete: regeocoding_complete
			});
		
		// }
		
	  //   uni.getLocation({			
	  //       type: 'gcj02',  // 国测局坐标
			// //type: 'wgs84',   // GPS坐标 
	  //       success: function (res) {
			// 	console.log('res123456',res);
				
			// 	//var res2 = that002.qqMapToBMap(res.longitude,res.latitude);		
			// 	//coordinate['longitude'] = res2[0];
			// 	//coordinate['latitude'] = res2[1];
				
			// 	coordinate['longitude'] = res.longitude;
			// 	coordinate['latitude'] = res.latitude;
				
			// 	uni.setStorageSync("coordinate_array", coordinate);
				
			// 	typeof call_back_get_shang_list == "function" && call_back_get_shang_list(that, coordinate);
				
			// 	return;
				
	  //       },
			// fail:function(res){
			// 	console.log('uni.getLocation fail ====>>>>', res);
				
			// 	var coordinate = [];
			// 	coordinate['latitude'] = 31.293216;
			// 	coordinate['longitude'] = 121.662945;
				
			// 	console.log('set virtual coordinate ====>>>>>', coordinate);
				
			// 	typeof call_back_get_shang_list == "function" && call_back_get_shang_list(that, coordinate);
				
			// 	return;
				
			// },
			// complete:function(res){
			// 	console.log('uni.getLocation complete ====>>>>', res);
			// }
			
	  //   });
		
		typeof call_back_get_shang_list == "function" && call_back_get_shang_list(that, data);
		
		return;	
	},
	
	
	
	
	
	
	
}
