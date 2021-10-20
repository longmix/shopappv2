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
							<input placeholder="请输入收件人电话号码" type="number" name="phone" maxlength="11" :value="address_detail.mobile" />
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
						
								<switch color="#f06c7a"  data-name="moren" @change="isDefaultChange" />
						</view>
					</view>
					<view class="row" v-if="action=='edit'" @tap="delAddress(address_detail.addressid)">
						<view class="del">
							删除收货地址
						</view><br>
							
					</view>						
					<view class="row">
						<button class="baocun" form-type="submit"
							:style="{backgroundColor:wxa_shop_nav_bg_color}">
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
				shengArr: ['请选择'],//省级数组
				shengId: [0],//省级id数组
				shiArr: ['请选择'],//城市数组
				shiId: [0],//城市id数组
				quArr: ['请选择'],//区数组
				quId:[0],//区id数组
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
				region_id:'',
				
				
				addressId:'',
				user_address:'',
				editType: 'edit',
				// id: '',
				// name: '',
				mobile: '',
				// city:'',
				address:'',
				moren: '',
				cityPickerValue: [0, 0, 1],
				//themeColor: '#007AFF',
				
				wxa_shop_nav_bg_color:'#07c160', 
			};
		},
		onLoad:function(options) {
			
			console.log('16494165465sssss',options);
			
			var that = this;
			
			console.log('44444',options)
			var userInfo = this.abotapi.get_user_info();
			
			this.abotapi.set_option_list_str(that, function(that002, option_list){
				that.wxa_shop_nav_bg_color  = option_list.wxa_shop_nav_bg_color;
				
			});
			
			//获取传递过来的参数
			
			this.addressid = options.addressId;
			console.log('9999999999',this.addressid);
			
			this.cartId = options.cartId;
			this.action = options.action;
			  

			
			//======= 判断用户是否登录 ============
			var last_url = '/pages/address/address';
			
			var userInfo = that.abotapi.get_user_info();
			if (!userInfo) {
				that.abotapi.goto_user_login(last_url);
			
				return;
			}
			//============= End ================
			
			
			if(this.addressid){
				this.__get_address_item();
			}
			else{
				this.__get_china_data_list();
			}
			

			
			
			
			
			
			
			
			
			
			
			// this.cartId = e.cartId;
			this.action = options.action;
			if(this.action == 'edit'){
				that.region_id = this.province;
				// that.bindPickerChangeshiArr();
				// that.bindPickerChangequArr();
			};
		},
		
		
		methods: {
			__get_china_data_list:function(code02=0, data_type='province'){
				var that = this;
				
				var data_url = 'https://yanyubao.tseo.cn/openapi/ChinaListData/index';
				
				if(code02){
					data_url += '?code02='+code02;
				}
				
				//获取省级城市
				that.abotapi.abotRequest({
					url:  data_url,
					method: 'GET',
					success: function (res) {
						// success
						console.log('ChinaListData====>>>>', res);
	
						var city = res.data.data;
						if (res.data.code != 1) {
							return;
						}
						
						var data_arr = that.shengArr;
						var data_id = that.shengId;
						
						if(data_type == 'city'){
							that.shiArr = ['请选择'];
							that.shiId = [0];
							
							data_arr = that.shiArr;
							data_id = that.shiId;
						}
						else if(data_type == 'district'){
							that.quArr = ['请选择'];
							that.quId = [0];
							
							data_arr = that.quArr;
							data_id = that.quId;
						}
						
						//data_arr = ['请选择'];
						//data_id = [0];
							
						for (var i = 0; i < res.data.data.length; i++) {
							data_arr.push(res.data.data[i].chinese);
							data_id.push(res.data.data[i].code01);
						}
						
						console.log('this.shengArr', data_arr);
						console.log('this.shengId', data_id);
						
						
						
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
			__get_address_item:function(){
				var that = this;
				
				if(!that.addressid){
					return;
				}
				
				var userInfo = this.abotapi.get_user_info();
				if ((!userInfo) || (!userInfo.userid)) {
				      uni.redirectTo({
				        url: '/pages/login/login',
				      })
				      return;
				};
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=address_save',
					data: {
						action:'get',
						checkstr: userInfo.checkstr,
				        userid:userInfo.userid,
				        sellerid: that.abotapi.get_sellerid(),
						addressid: that.addressid
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
				
							
						}
					}
				});
				
				
				
				
			},
			bindPickerChangeshengArr: function (e) {
			    console.log('bindPickerChangeshengArr===>>>', e);
				
				this.shengIndex = e.detail.value;
				
				//console.log('this.addressId====',this.addressId)
				
				var code02 = this.shengId[this.shengIndex];
				console.log('code02===>>>', code02);
				
				
				this.__get_china_data_list(code02,'city');
				
			},
			
			bindPickerChangeshiArr: function (e) {
				console.log('bindPickerChangeshiArr==>>',e);
				
				this.shiIndex = e.detail.value;
				
				var code02 = this.shiId[this.shiIndex];
				
				this.__get_china_data_list(code02, 'district');
				
			    
			},
			
			bindPickerChangequArr: function (e) {
			
				
				this.quIndex = e.detail.value;
				
				var code02 = this.quId[this.quIndex];
				
				this.__get_china_data_list();
			},	
			
			
			formSubmit: function(e) {
				
				console.log('this.addressId====formSubmit>>',this.addressId)
				console.log('asdsdsd66666',e)
				var that = this;
				console.log('form发生了submit事件，携带数据为：',e)
				var formdata = e.detail.value;
				
				var rephone =/^[1][3,4,5,7,8][0-9]{9}$/; 
				
				console.log('form发生了formdata事件，携带数据为：',formdata)
				
				that.form_list = formdata;
				
				
				
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
				// if(!formdata.phone){
				// 	uni.showToast({
				// 		title:'请填写电话号码'
				// 	})
				// 	return;
				// }
				console.log('=========>',formdata.phone);
				 console.log(rephone.test(formdata.phone));
				if(!rephone.test(formdata.phone)) {
					uni.showToast({
						title:'请写填正确的电话号码'
					})
					return;
				  	}
				// function checkMobile(formdata.phone){
				// 	return RegExp(/^1[34578]\d{9}$/).test(formdata.phone);
				// }
				
				
				
				if(!that.shengArr || !that.shiArr ||!that.quArr){
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
			console.log('this.addressId123====>>',this.addressId)
			if(!that.action){
				that.action = 'add';
			}
			console.log('121323125555',that.area)
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
					addressid: this.addressid,
					moren:this.moren
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
		
		isDefaultChange:function(e){
			var name = e.target.dataset.name;
			console.log('aaaaa5555555',name);	
			
			if(name = 'moren'){
				var moren = e.detail.value;
			}
			if(moren == true){
				this.moren =1;
			console.log('closeLikeeeeeeeeeeeee',this.moren);	
			}
			else{
				this.moren =0;
				console.log('closeLikeeeeeeeeeeeee',this.moren);
			}
			
		}
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
	
	.baocun{
	 width: 100%;
	 height: 100upx;
	 justify-content: center;
	 align-items: center;
	 font-size: 36upx;
	 color:#FFFFFF;
	 background-color:#07c160;
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