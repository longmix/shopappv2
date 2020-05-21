


module.exports = {
	
	//获取经纬度（国测局坐标）
	get_location: function (that, call_back_get_shang_list='') {
	
		var that002 = this; 
		
		console.log('123456789 get_location');
		
		var coordinate = uni.getStorageSync('coordinate_array');
		if(coordinate){
			console.log('get_location in cache =====>>>>', coordinate);
			
			typeof call_back_get_shang_list == "function" && call_back_get_shang_list(that, coordinate);
			return;
		}
		
	    uni.getLocation({			
	        type: 'gcj02',  // 国测局坐标
			//type: 'wgs84',   // GPS坐标 
	        success: function (res) {
				console.log('res123456',res);
				
				//var res2 = that002.qqMapToBMap(res.longitude,res.latitude);		
				//coordinate['longitude'] = res2[0];
				//coordinate['latitude'] = res2[1];
				
				coordinate['longitude'] = res.longitude;
				coordinate['latitude'] = res.latitude;
				
				uni.setStorageSync("coordinate_array", coordinate);
				
				typeof call_back_get_shang_list == "function" && call_back_get_shang_list(that, coordinate);
				
				return;
				
	        },
			fail:function(res){
				console.log('uni.getLocation fail ====>>>>', res);
				
				var coordinate = [];
				coordinate['latitude'] = 31.293216;
				coordinate['longitude'] = 121.662945;
				
				console.log('set virtual coordinate ====>>>>>', coordinate);
				
				typeof call_back_get_shang_list == "function" && call_back_get_shang_list(that, coordinate);
				
				return;
				
			},
			complete:function(res){
				console.log('uni.getLocation complete ====>>>>', res);
			}
			
	    });
		
		return;
	},
	
}
