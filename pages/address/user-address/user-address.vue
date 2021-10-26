<template>
	<view>
		<!-- 	<view class="content">
			<view class="list">
				<view class="row" v-for="(item,index) in address" :key="index" @tap="setDefault($event)" :data-id="item.addressid">
					<view class="left">
						<view class="head">
							{{row.head}}
						</view>
					</view>
					<view class="center">
						<view class="name-tel">
							<view class="name">{{item.name}}</view>
							<view class="tel">{{item.mobile}}</view>
							<view class="default" v-if="item.is_default == 1">
								{{item.default}}
							</view>
						</view>
						<view class="address">
							{{item.province_name}} {{item.district_name}} {{item.address}}
						</view>
					</view>
					<view class="right">
						<view class="icon bianji" @tap.stop="edit(item.addressid)">
							
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="add">
			<view class="btn" @tap="add">
				<view class="icon tianjia"></view>新增地址
			</view>
		</view>
		
		
		
		 -->





		<!--地址管理-->
		<radio-group class="radio-group">
			<view class="address" v-for="(item,index) in address" :key="index">
				<view class="address-icon" @tap="setDefault($event)" :data-id="item.addressid">
					<radio :checked="item.is_default==1?true:false" :value="index" />
				</view>

				<view class="address-detail">
					<view :data-id="item.addressid">
						<view class="address-name-phone">
							<view class="address-name">{{item.name}}</view>
							<view class="address-phone">{{item.mobile}}</view>
						</view>
						<view class="address-info">{{item.province_name}}{{item.city_name}}{{item.district_name}}{{item.address}}</view>
					</view>
					<view class="address-edit">
						<view>
							<icon type="icon" size="26" />
							<text :hidden_address="item.is_default==0?false:true"></text>
						</view>
						<view style="overflow: hidden; display: flex;align-items: center;">
							<view style="margin-right: 120rpx;color: #868686;font-size: 35rpx;">
								<text :hidden="item.is_default==0?false:true" @tap="setDefault" :data-id="item.addressid">设置默认</text>
							</view>
							<view class="address_add" :data-id="item.addressid" @tap="saveAddress($event)">
								<image style="width: 40rpx;" mode="widthFix" src="../../../static/img/address.png"></image>
								<text style="color: #868686;font-size: 35rpx;">编辑</text>
							</view>
							<view class="address_add" :data-id="item.addressid" @tap="delAddress($event)">
								<image style="width: 40rpx;" mode="widthFix" src="../../../static/img/edit.png"></image>
								<text style="color: #868686;font-size: 35rpx;">删除</text>
							</view>




							<!-- <view class="delect">
					<view  :data-id="item.addressid" @tap="saveAddress($event)">
						<image style="width: 40rpx;" mode="widthFix" src="../../../static/img/address.png"></image>
						<text style="letter-spacing:5upx;">编辑</text>
					</view>
					<view :data-id="item.addressid" @tap="delAddress($event)">
						<image style="width: 40rpx;" mode="widthFix" src="../../../static/img/edit.png"></image>
						<text style="letter-spacing: 5upx;font-size: 25px;">删除</text>
					</view>
				</view> -->


						</view>
					</view>
				</view>
			</view>
		</radio-group>
		<view @click="add()">
			<view class="add-address">
				<view class="btn_max" :style="{backgroundColor:wxa_shop_nav_bg_color}">新增地址</view>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view @click="wxaddress()">
			<view class="add-address">
				<view class="btn_weixin">使用微信地址</view>
			</view>
		</view>
		<!-- #endif -->










	</view>
</template>
<script>
	export default {
		data() {
			return {
				isSelect: false,
				address: [],
				row: '',
				productid: '',
				amount: '',
				action: '',
				action_pay: '',
				
				wxa_shop_nav_bg_color:'#000000',
				
				
				isRadioGroupRefresh:true,
			};
		},
		onShow() {
			var that = this;
			that.get_address_list();
			// uni.getStorage({
			// 	key:'saveAddress',
			// 	success: (e) => {
			// 		let len = this.addressList.length;
			// 		if(e.data.hasOwnProperty('id')){
			// 			for(let i=0;i<len;i++){
			// 				if(this.addressList[i].id==e.data.id){
			// 					this.addressList.splice(i,1,e.data);
			// 					break;
			// 				}
			// 			}
			// 		}else{
			// 			let lastid = this.addressList[len-1];
			// 			lastid++;
			// 			e.data.id = lastid;
			// 			this.addressList.push(e.data);
			// 		}
			// 		uni.removeStorage({
			// 			key:'saveAddress'
			// 		})
			// 	}
			// })
		},
		onLoad(options) {
			console.log('user-address----options==', options)
				//获取头部颜色
			this.abotapi.set_option_list_str(this, function(that001, option_list){
				that001.abotapi.getColor();
				
				that001.wxa_shop_nav_bg_color = option_list.wxa_shop_nav_bg_color
				console.log('backgcoyrdnd',option_list);
			}
			);

			var userInfo = this.abotapi.get_user_info();
			if ((!userInfo) || (!userInfo.userid)) {
				uni.redirectTo({
					url: '/pages/login/login',
				})
				return;
			};
			var that = this;
			// 页面初始化 options为页面跳转所带来的参数
			var cartId = options.cartId;
			var buynum = options.buynum;

			console.log(options);
			console.log(654987)

			if (options.cartId) {
				is_from_order_page: true
			}

			var userInfo = this.abotapi.get_user_info();
			console.log(userInfo);
			console.log(333333)


			if (options.productid) {
				that.productid = options.productid;
			}

			if (options.amount) {
				that.amount = options.amount;
			}

			if (options.action) {
				that.action = options.action;
			}

			if (options.action_pay) {
				that.action_pay = options.action_pay;
			}

			uni.showLoading({
				title: '加载中...',
			})
			uni.request({
				url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=address_list',
				data: {
					checkstr: userInfo.checkstr,
					userid: userInfo.userid,
					sellerid: this.abotapi.get_sellerid()
				},
				method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
				header: { // 设置请求的 header
					'Content-Type': 'application/x-www-form-urlencoded'
				},

				success: function(res) {
					uni.hideLoading();
					// success
					var code = res.data.code

					var address = [];

					if (code == 1) {
						var address = res.data.addressList;
					}

					that.address = address
					console.log('aaadddddd====>>>', that.address);
					
					if (cartId) {
						that.cartId = cartId
					}

					if (buynum) {
						that.buynum = buynum
					}


				},
				fail: function() {
					// fail
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
				},
			})
		},
		methods: {
			
			reload_radio_group() {
				this.isRadioGroupRefresh = false
				this.$nextTick(() => {
					this.isRadioGroupRefresh = true
				})
			},

			get_address_list: function() {
				var that = this;
				var userInfo = this.abotapi.get_user_info();
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=address_list',
					data: {
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
						sellerid: this.abotapi.get_sellerid()
					},
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},

					success: function(res) {
						console.log('res', res);
						if (res.data.code == 1) {
							that.address = res.data.addressList;
							console.log('res==', that.address);
							uni.getStorage({
								key: 'delAddress',
								success: (e) => {
									let len = that.address.length;
									if (e.data.hasOwnProperty('id')) {
										for (let i = 0; i < len; i++) {
											if (that.address[i].id == e.data.id) {
												that.address.splice(i, 1);
												break;
											}
										}
									}
									uni.removeStorage({
										key: 'delAddress'
									})
								}
							})
						}
					}
				})
			},


			//新增地址
			add() {

				var url = '/pages/address/address?cartId=' + this.cartId + '&action=add&amount=' + this.amount + '&productid=' +
					this.productid + '&action_pay=' + this.action_pay

				uni.navigateTo({
					url: url
				})
			},

			//调用微信地址
			wxaddress() {
				var that = this;
				var userInfo = that.abotapi.get_user_info();
				console.log('hushuyi', userInfo);
				uni.chooseAddress({

					success(res) {

						console.log('aaaaasss', res);
						var provinceName = res.provinceName;
						var cityName = res.cityName;
						var countyName = res.countyName;
						var Name = res.userName;
						var telNumber = res.telNumber;
						var detailInfo = res.detailInfo;
						console.log('aaaaas====ss', countyName);
						that.abotapi.abotRequest({
							url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_city_coding',
							data: {
								userid: userInfo.userid,
								checkstr: userInfo.checkstr,
								sellerid: that.abotapi.get_sellerid(),
								provinceName: provinceName,
								cityName: cityName,
								countyName: countyName,
								Name: Name
							},
							success: function(res) {
								console.log('aaaaaname55555555555', res);
								var province = res.data.data.provinceCode;
								var city = res.data.data.cityCode;
								var county = res.data.data.countyCode;

								that.abotapi.abotRequest({
									url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=address_save',
									data: {
										action: 'add',
										checkstr: userInfo.checkstr,
										userid: userInfo.userid,
										sellerid: that.abotapi.get_sellerid(),
										name: Name,
										mobile: telNumber,
										area_province: provinceName,
										area_city: cityName,
										area_district: countyName,
										address: detailInfo,
									},
									success: function() {
										uni.showToast({
											title: '添加成功！',
										});
										that.DataonLoad();
									},
									
									fail: function() {

									}

								});

							},
							fail: function() {
								// fail
								uni.showToast({
									title: '网络异常！',
									duration: 2000
								});
							}
						});
					},
					fail: function() {
						console.log(456789);
					},
					complete: function() {
						console.log(741822);
					}

				})
			},




			//编辑所选地址
			saveAddress: function(e) {
				var that = this;
				var addressId = e.currentTarget.dataset.id;
				console.log('that.addressId==', addressId)
				uni.redirectTo({
					url: '/pages/address/address?action=edit&addressId=' + addressId + '&amount=' + that.amount + '&productid=' +
						that.productid + '&action_pay=' + that.action_pay,
				});
			},

			//设置默认地址
			setDefault: function(e) {
				var that = this;

				var addrId = e.currentTarget.dataset.id;
				var userInfo = that.abotapi.get_user_info();
				uni.request({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=address_save',
					data: {
						action: 'edit',
						addressid: addrId,
						moren: 1,
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						sellerid: that.abotapi.get_sellerid()
					},
					method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
					header: { // 设置请求的 header
						'Content-Type': 'application/x-www-form-urlencoded'
					},

					success: function(res) {
						// success
						var code = res.data.code;
						var cartId = that.cartId;
						var amount = that.amount;
						var productid = that.productid;
						var action_pay = that.action_pay;
						
						
						
						

						console.log('productid=================11', productid)
						console.log('amount=================11', amount)
						console.log('action_pay=================11', action_pay)
						if (cartId == 321) {
							if (code == 1) {
								if (action_pay == 'direct_buy') {
									uni.redirectTo({
										//url: '../../order/pay?productid=' + productid + "&buynum=" + buynum,
										url: '/pages/order/pay?amount=' + that.amount + "&productid=" + that.productid +
											"&action=direct_buy&continue_to_pay=1",
									});
									//    return false;
								} else {
									uni.redirectTo({
										url: '/pages/order/pay?amount=' + that.amount + "&productid=" + that.productid + '&continue_to_pay=1',
									});
								}
								uni.showToast({
									title: '操作成功！',
									duration: 2000
								});
								that.DataonLoad();
							} else {
								uni.showToast({
									title: res.data.msg,
									duration: 2000
								});
							}
						} else {
							
							uni.showModal({
								title: '提示',
								content: '设置默认成功！',
								
							})
						
							that.DataonLoad();
						}

					},
					fail: function() {
						// fail
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					}
				})
			},

			DataonLoad: function() {
				var that = this;
				var userInfo = this.abotapi.get_user_info();
				// 页面初始化 options为页面跳转所带来的参数
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=address_list',
					data: {
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						sellerid: this.abotapi.get_sellerid()
					},
					method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
					header: { // 设置请求的 header
						'Content-Type': 'application/x-www-form-urlencoded'
					},

					success: function(res) {
						// success
						var address = res.data.addressList;
						if (!address) {
							address = []
						}

						that.address = address

						console.log('4444444444444====>>>',that.address)
					},
					fail: function() {
						// fail
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					}
				})

			},

			//删除地址	
			delAddress: function(e) {
				var that = this;
				console.log(e)
				var addrId = e.currentTarget.dataset.id;
				var userInfo = that.abotapi.get_user_info();
				uni.showModal({
					title: '提示',
					content: '你确认移除吗',
					success: function(res) {
						res.confirm && uni.request({
							url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=address_save',
							data: {
								action: 'del',
								addressid: addrId,
								userid: userInfo.userid,
								checkstr: userInfo.checkstr,
								sellerid: that.abotapi.get_sellerid()
							},
							method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
							header: { // 设置请求的 header
								'Content-Type': 'application/x-www-form-urlencoded'
							},

							success: function(res) {
								// success
								var code = res.data.code;
								if (code == 1) {
									that.DataonLoad();
								} else {
									uni.showToast({
										title: res.data.msg,
										duration: 2000
									});
								}
							},
							fail: function() {
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

		}
	}
</script>

<style lang="scss">
	/*地址管理*/

	page {
		background-color: #efeff4;
		font-size: 10pt;
		-webkit-user-select: none;
		user-select: none;
		width: 100%;
		overflow-x: hidden;
	}

	.address {
		display: flex;
		flex-wrap: wrap;
		background-color: #fff;
		margin-top: 1px;
		padding: 30rpx;
		margin: 30rpx 0;
	}

	.address-icon {
		width: 100rpx;
	}

	.address-detail {
		width: 590rpx;
	}

	.address-name-phone {
		margin-bottom: 20rpx;
		font-size: 11pt;
		font-weight: 900;
		display: flex;
	}

	.address-name {
		margin-right: 20rpx;
		font-size: 35rpx;
	}

	.address-phone {
		font-size: 35rpx;
	}

	.address-info {
		margin-bottom: 30rpx;
	}

	.address-edit {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		border-top: 1px #efeff4 solid;
		padding-top: 30rpx;
	}

	.add-address {
		display: flex;
		align-items: center;
		margin-top: 20px;
		padding: 18rpx;
		background-color: #efeff4;
		font-size: 11pt;
		font-weight: 900;
	}

	.btn_max {
		border-radius: 5px;
		line-height: 2.55;
		color: #FFFFFF;
		font-size: 36rpx;
		text-align: center;
		width: 100%;
	}

	.btn_weixin {
		background-color: #1AAD19;
		border-radius: 5px;
		line-height: 2.55;
		color: #FFFFFF;
		font-size: 36rpx;
		text-align: center;
		width: 100%;
	}

	.address_add {
		display: flex;
		margin-left: 20px;
		align-items: center;
	}
</style>
