<template>
	<view>
		

		<view class="container">
			<form @submit="formSubmit" @reset="formReset">
				<view class="content">
					<view class="row">
						<view class="nominal">
							收件人
						</view>
						<view class="input">
							<input placeholder="请输入收件人姓名" type="text" name="name" :value="address_detail.name" />
						</view>
					</view>
					<view class="row">
						<view class="nominal">
							电话号码
						</view>
						<view class="input">
							<input placeholder="请输入收件人电话号码" type="text" name="phone" :value="address_detail.mobile" />
						</view>
					</view>
					<view class="row">
						<view class="nominal">
							选择省份
						</view>
						<view class="input">
							<picker @change="bindPickerChangeshengArr" :value="shengIndex" mode="selector" :range="shengArr" >
								<view class="picker">
								 {{shengArr[shengIndex]}} 
									
								</view>
							</picker>
						</view>
					</view>
					<view class="row">
						<view class="nominal">
							选择城市
						</view>
						<view class="input">
							<picker @change="bindPickerChangeshiArr" :value="shiIndex" mode="selector" :range="shiArr">
								<view class="picker">
									{{shiArr[shiIndex]}}
									
								</view>
							</picker>
						</view>
					</view>
					<view class="row">
						<view class="nominal">
							选择地区
						</view>
						<view class="input">
							<picker @change="bindPickerChangequArr" :value="quIndex" mode="selector" :range="quArr" >
								<view class="picker">
									{{quArr[quIndex]}}
								
								</view>
							</picker>
						</view>
					</view>
					<view class="row">
						<view class="nominal">
							详细地址
						</view>
						<view class="input">
							<textarea :value="address" auto-height="true" name="address" placeholder="输入详细地址"></textarea>
						</view>
					</view>
					<view class="row">
						<view class="nominal">
							设置默认地址
						</view>
						<view class="input switch">
						
								<switch color="#f06c7a" :checked="isDefault" name="is_default" @change="isDefaultChange" />
						</view>
					</view>
					<view class="row" v-if="editType=='edit'" @tap="delAddress(address_detail.addressid)">
						<view class="del">
							删除收货地址
						</view><br>
							
					</view>						
					<view class="row" v-if="editType=='edit'" >
						<button class="baocun"  form-type="submit">
							保存地址
						</button>
					
					</view>
					
					
				</view>
					
			</form>
		</view>

	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				shengArr: [],//省级数组
				shengId: [],//省级id数组
				shiArr: ['请选择'],//城市数组
				shiId: [],//城市id数组
				quArr: ['请选择'],//区数组
				quId:[],//区id数组
				shengIndex:0,
				shiIndex: 0,
				quIndex: 0,
				mid: 0,
				sheng:0,
				city:0,
				area:0,
				code:0,
				cartId:0,
				diqu:'',
				shi:'',
				shiArr2:'',
				action: 'add',
				name:'',
				address_detail:'',
				
				
				addressid:'',
				user_address:'',
				editType: 'edit',
				// id: '',
				// name: '',
				mobile: '',
				// city:'',
				address:'',
				isDefault: false,
				cityPickerValue: [0, 0, 1],
				themeColor: '#007AFF',
			};
		},
		onLoad:function(options) {
			var that = this;
			var userInfo = this.abotapi.get_user_info();
			this.abotapi.set_option_list_str(null, this.abotapi.getColor());
			//获取传递过来的参数
			console.log('options',options);
			this.addressid = options.addressId;
			this.cartId = options.cartId;
			this.action = options.action;
			  

			// var that = this;
			var userInfo = this.abotapi.get_user_info();
			if ((!userInfo) || (!userInfo.userid)) {
			      uni.redirectTo({
			        url: '/pages/login/login',
			      })
			      return;
			};
			
			uni.request({
				url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=address_save',
				data: {
					action:'get',
					checkstr: userInfo.checkstr,
			        userid:userInfo.userid,
			        sellerid: this.abotapi.get_sellerid(),
					addressid: this.addressid
				},
				method: 'POST', 
				header: {
					'Content-Type':  'application/x-www-form-urlencoded'
				},
			    success: function (res) {
					console.log(res);
					if(res.data.code == 1){
						
						that.address_detail = res.data.data;
						//省
						that.province = that.address_detail.province - 1;
						console.log('that.province',that.province);
						//市
						that.city = that.address_detail.city;
						// that.city = ++that.city;
						console.log('that.city',that.city);
						//区
						that.district = that.address_detail.district;
						that.district = ++that.district;
						
						that.shengIndex = that.province;
						that.shiIndex = that.city;
						that.quIndex = that.district;
						that.shixb = that.city;
						that.quxb = that.district;
						//拿到地址对应id
						that.province = that.address_detail.province,
						that.city = that.address_detail.city,
						that.district = that.address_detail.district,
						that.area = that.address_detail.district,
						that.address = that.address_detail.address,
						that.sheng = that.address_detail.province
						
						console.log('that.province==>>',that.province);
						console.log('that.shengIndex==>>',that.shengIndex);
						console.log('that.shiIndex==>>',that.shiIndex);
						console.log('that.quIndex==>>',that.quIndex);
						console.log('that.shixb==>>',that.shixb);
						console.log('that.quxb==>>',that.quxb);

						//获取市级城市
						uni.request({
							url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=region_get',
							data: {
								region_id: that.province
							},
							method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
							header: {// 设置请求的 header
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							success: function (res) {
								// success
								var code = res.data.code;
								var city = res.data.data;
								console.log('res',res);
								console.log('city111111111111',city);
								if (code == 1) {
									var shiIndex = 0;
									that.shiArr.push('请选择');
									that.shiId.push('0');
									
									console.log('that.shixb==', that.shixb)
									
									for (var i = 0; i < city.length; i++) {
										that.shiArr.push(city[i].region_name);
						                that.shiId.push(city[i].region_id);
						                
						                if(city[i].region_id == that.shixb){
											shiIndex = i;
						                }
									}
									that.shiIndex = shiIndex + 1;
									that.shiArr2 = city;
									var shArr = that.shiArr
									var shId = that.shiId
									console.log('that.shiIndex',that.shiIndex);
									console.log(shId);
									console.log(shArr);
									console.log('that.shiArr',that.shiArr);
									console.log('that.shiId',that.shiId);
								}
							},
							fail: function () {
								// fail
								uni.showToast({
									title: '网络异常！',
									duration: 2000
								});
							},
						})
						
					
						//获取区地址
						uni.request({
							url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=region_get',
							data: {
								region_id: that.city
							},
							method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
							header: {// 设置请求的 header
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							success: function (res) {
								console.log('qures',res);
								var code = res.data.code;
								var city = res.data.data;
								console.log('city',city);
								if (res.data.code == 1) {
									var quIndex = 0;
									that.quArr.push('请选择');
									that.quId.push('0');
									for (var i = 0; i < city.length; i++) {
										that.quArr.push(city[i].region_name);
										that.quId.push(city[i].region_id);
										if (city[i].region_id == that.quxb) {
											quIndex = i;
										}
									}
									
									that.quIndex = quIndex;
									that.quArr1 = city;
									console.log('that.quIndex',that.quIndex);
									console.log('that.quArr',that.quArr);
									console.log('that.quId',that.quId);
								}
							},
							fail: function () {
								// fail
								uni.showToast({
									title: '网络异常！',
									duration: 2000
								});
							},
						})
					}
				}
			})
			
			//获取省级城市
			uni.request({
				url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=region_get',
				data: {
					region_id: 1
				},
				method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
				header: {// 设置请求的 header
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: function (res) {
					// success
					var code = res.data.code;
					var city = res.data.data;
					if (code == 1) {
						
						that.shengArr.push('请选择');
						that.shengId.push('0');
						for (var i = 0; i < city.length; i++) {
							that.shengArr.push(city[i].region_name);
							that.shengId.push(city[i].region_id);
						}
						// that.shengArr = shengArr;
						// that.shengId = shengId;
						
						console.log('this.shengArr',that.shengArr);
						console.log('this.shengId',that.shengId);
						// var shArr = that.shengArr
						// var shId = that.shengId
					}
				},
				fail: function () {
					// fail
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
				},
			})
			// this.cartId = e.cartId;
			this.action = options.action;
			if(this.action == 'edit'){
				that.region_id = this.province;
				that.bindPickerChangeshiArr();
				that.bindPickerChangequArr();
			};
		},
		
		
		methods: {
			bindPickerChangeshengArr: function (e) {
			    console.log(e);
				this.shengIndex = e.detail.value;
				this.shiArr = [];
				this.shiId = [];
			    var that = this;
			    var region_Id = ++e.detail.value;
			    console.log('123?',region_Id);
			    uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=region_get',
					data: {
						region_id: region_Id,
					},
					method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
					header: {// 设置请求的 header
						'Content-Type':  'application/x-www-form-urlencoded'
					},
					success: function (res) {
						console.log('shires',res);
						var city = res.data.data;
						if(res.data.code==1){
							var hArr = [];
							var hId = [];
							hArr.push('请选择');
							hId.push('0');
							for (var i = 0; i < city.length; i++) {
								hArr.push(city[i].region_name);
								hId.push(city[i].region_id);
							}
							that.province = region_Id;
							that.shi = res.data.data;
							that.shiArr = hArr;
							that.shiId = hId;
							
							console.log('shiArr',that.shiArr);
							console.log('shi',that.shi);
							console.log('shiId',that.shiId);
						}
					},
					fail: function () {
						// fail
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					},
			
			    })
			},
			
			bindPickerChangeshiArr: function (e) {
				console.log('e',e);
				this.shiIndex = e.detail.value;
				this.quArr = [];
				this.quiId = [];
			    var that = this;
			    var city_id = this.shiIndex;
			    console.log(city_id);
			    //var city_name = that.data.shi;
			    if (Array.isArray(that.shi)) {
					var city_name = that.shi;
					console.log(11111);
			    } else {
					console.log(22222);
					var city_name = that.shiArr2;
			    }
			    console.log('city_name',city_name);
			    var region_id = city_name[--city_id].region_id;
			    console.log('5214',region_id);
			    uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=region_get',
					data: {
						region_id: region_id,
					},
					method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
					header: {// 设置请求的 header
						'Content-Type':  'application/x-www-form-urlencoded'
					},
					success: function (res) {
						var code = res.data.code;
						var area = res.data.data;
						if(code==1){
							var qArr = [];
							var qId = [];
							qArr.push('请选择');
							qId.push('0');
							for (var i = 0; i < area.length; i++) {
								qArr.push(area[i].region_name)
								qId.push(area[i].region_id)
							}
							that.area = res.data.data;
							that.city = region_id;
							that.quArr = qArr;
							that.quiId = qId;
							console.log('this.area',that.area);
							console.log('this.city',that.city);
							console.log('this.quArr',that.quArr);
							console.log('this.quiId',that.quiId);
						}
					},
					fail: function () {
						// fail
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					}
				})
			},
			
			bindPickerChangequArr: function (e) {
				this.quIndex = e.detail.value;
				var that = this;
				var qu_id = this.quIndex;
				console.log('111',qu_id);
				console.log(that.area)
				if (Array.isArray(that.area)){
					console.log('?????');
					var qu_name = that.area;
				}else{
					console.log('!!!!!');
					var qu_name = that.quArr1;
				}
				console.log(qu_name)
				var region_id = qu_name[--qu_id].region_id;
				console.log('123456',region_id);
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=region_get',
					data: {
						region_id: region_id
					},
					method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
					header: {// 设置请求的 header
						'Content-Type':  'application/x-www-form-urlencoded'
					},
					success: function (res) {
						console.log('qures----->>>>>',res);
						that.area = region_id;
					},
					fail: function () {
						// fail
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					}
				})
			},	
			
			
			formSubmit: function(e) {
				var that = this;
				console.log('form发生了submit事件，携带数据为：',e)
				var formdata = e.detail.value
				that.form_list = formdata
				console.log('form_list：',that.form_list);
				console.log('2form_list：',that.province);
				console.log('1form_list：',that.city);
				console.log('form_list：',that.area);
				
				if(!formdata.name){
					uni.showToast({
						title:'请填写收件人'
					})
					return;
				}
				if(!formdata.phone){
					uni.showToast({
						title:'请填写电话号码'
					})
					return;
				}
				
				if(!that.province || !that.city ||!that.area){
					uni.showToast({
						title:'请选择省市区'
					})
					return;
				}
				
				that.save();
			},
			onCancel(e) {
				console.log(e)
			},
			
			
			del(e) {
				console.log('del-e==>>',e);
				
				// uni.showModal({
				// 	title: '删除提示',
				// 	content: '你将删除这个收货地址',
				// 	success: (res) => {
				// 		if (res.confirm) {
				// 			uni.setStorage({
				// 				key: 'delAddress',
				// 				data: {
				// 					id: this.id
				// 				},
				// 				success() {
				// 					uni.navigateBack();
				// 				}
				// 			})
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// });

			},
		
		delAddress: function (e) {
		    var that = this;
		    console.log(e)
		    // var addrId = e.currentTarget.dataset.id;
		    var userInfo = this.abotapi.get_user_info();
		    uni.showModal({
		      title: '提示',
		      content: '你确认移除吗',
		      success: function(res) {
		        res.confirm && uni.request({
		          url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=address_save',
		          data: {
		            action: 'del',
		            addressid: e.addressid,
		            userid: userInfo.userid,
		            checkstr: userInfo.checkstr,
		            sellerid: that.abotapi.globalData.default_sellerid,
		          },
		          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
		          header: {// 设置请求的 header
		            'Content-Type':  'application/x-www-form-urlencoded'
		          },
		          
		          success: function (res) {
		            // success
		            var code = res.data.code;
		            if(code==1){
						uni.navigateTo({
							url:"/pages/user/address/address"
						})
		            }else{
		              uni.showToast({
		                title: res.data.msg,
		                duration: 2000
		              });
		            }
		          },
		          fail: function () {
		            // fail
		            uni.showToast({
		              title: '网络异常！',
		              duration: 2000
		            });
		          }
		        });
		      }
		    });
		
		  },
		
		
		
		
		
		
		
		
		
		
		save:function(){
			var that = this;
			var userInfo = this.abotapi.get_user_info();
			if(!that.action){
				that.action = 'add';
			}
			uni.request({
				url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=address_save',
				header: {  
			            "Content-Type": "application/x-www-form-urlencoded"  
			          }, 
				method: "POST",  
				data: {
					action:that.action,
					checkstr:userInfo.checkstr,
					userid:userInfo.userid,
					sellerid: this.abotapi.globalData.default_sellerid,
					name: that.form_list.name,
					mobile: that.form_list.phone,
					province: that.province,
					city: that.city,
					district: that.area,
					address: that.form_list.address,
					is_default: that.form_list.is_default,
					addressid: this.addressid
				},    
				success:function(res){
					console.log('success=====>>>>>>',res);
					if(res.data.code == 1){
						uni.showToast({
							title: res.data.msg,
							icon: 'success',
							duration: 2000
						});
						
						setTimeout(function() {
							uni.navigateBack({
							    delta: 1
							});
						}, 2000);
					}
				},			
			});
		},
		// onBackPress() {
		// 	if (this.$refs.mpvueCityPicker.showPicker) {
		// 		this.$refs.mpvueCityPicker.pickerCancel();
		// 		return true;
		// 	}
		// },
		// onUnload() {
		// 	if (this.$refs.mpvueCityPicker.showPicker) {
		// 		this.$refs.mpvueCityPicker.pickerCancel()
		// 	}
		// }
	}
}
</script>


<style lang="scss">

	.save{
		view{
			display: flex;
		}
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;
		.btn{
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.4);
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			background-color: #f06c7a;
			color: #fff;
			justify-content: center;
			align-items: center;
			.icon{
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}
			font-size: 30upx;
		}
	}
	.content{
		display: flex;
		flex-wrap: wrap;
		view{
			display: flex;
		}
		.row{
			width: 94%;
			
			margin: 0 3%;
			border-top: solid 1upx #eee;
			.nominal{
				width: 30%;
				height: 120upx;
				font-weight: 200;
				font-size: 30upx;
				align-items: center;
			}
			.input{
				width: 70%;
				padding: 20upx 0;
				align-items: center;
				font-size: 30upx;
				&.switch{
					justify-content: flex-end;
				}
				.textarea{
					margin: 20upx 0;
					min-height: 120upx;
				}
			}
			.del{
				width: 100%;
				height: 100upx;
				justify-content: center;
				align-items: center;
				font-size: 36upx;
				color:#FFFFFF;
				background-color:#e53f42;
				border-bottom: solid 1upx #eee;
				margin-top: 20upx;
				border-radius:30upx;
			}
		}
	}
	
</style>


<style>
	uni-page {
	  background: #efeff4;
	}
	 
	/* pages/address/address.wxss */
	
	.container {
	  font-size: 14px;
	  background-color: white;
	  padding:10% 0;
	}
	
	.section {
	  height: 100rpx;
	  border-bottom: 1px lightgrey solid;
	  display: flex;
	  align-items: center;
	  margin: 0 30rpx;
	}
	
	.btn-area {
	  display: flex;
	  justify-content: center;
	}
	
	uni-button {
	 width: 100%;
	 height: 100upx;
	 justify-content: center;
	 align-items: center;
	 font-size: 36upx;
	 color:#FFFFFF;
	 background-color:#0d7dfc;
	 border-bottom: solid 1upx #eee;
	 margin-top: 20upx;	
	 border-radius:30upx;
	 border: none;
	}
	
	.picker {
	  width: 600rpx;
	  height: 100%;
	}
	.ww{
	  width: 250px;
	}
	
	

</style>