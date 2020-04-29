<!-- <template>
	<view>
		收货地址
		<view class="addr" @tap="selectAddress">
			<view class="icon">
				<image src="../../static/img/addricon.png" mode=""></image>
			</view>
			<view class="right">
				<view class="tel-name">
					<view class="name">
						{{address.name}}
					</view>
					<view class="tel">
						{{address.mobile}}
					</view>
				</view>
				<view class="addres">
					{{address.city_name}}{{address.district_name}}{{address.address}}
					{{address.address.detailed}}
				</view>
			</view>
		</view>
		购买商品列表
		<view class="buy-list">
			<view class="row" v-for="(row,index) in buylist" :key="index">
				<view class="goods-info">
					<view class="img">
						<image :src="row.picture"></image>
					</view>
					<view class="info">
						<view class="title">{{row.name}}</view>
						<view class="spec">选择{{row.spec}} 数量:{{row.amount}}</view>
						<view class="price-number">
							<view class="price">￥{{row.price*row.amount}}</view>
							<view class="number">
								
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		提示-备注
		<view class="order">
			<view class="row">
				<view class="left">
					积分 :
				</view>
				<view class="right">
					已扣除{{int}}积分抵扣{{deduction|toFixed}}元
				</view>
			</view>
			<view class="row">
				<view class="left">
					备注 :
				</view>
				<view class="right">
					<input placeholder="选填,备注内容" v-model="note" />
				</view>
			</view>
		</view>
		明细
		<view class="detail">
			<view class="row">
				<view class="nominal">
					商品金额
				</view>
				<view class="content">
					￥{{goodsPrice|toFixed}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					运费
				</view>
				<view class="content">
					￥+{{freight|toFixed}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					积分抵扣
				</view>
				<view class="content">
					￥-{{deduction|toFixed}}
				</view>
			</view>
		</view>
		<view class="blck">
			
		</view>
		<view class="footer">
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{sumPrice|toFixed}}</view></view>
				<view class="btn" @tap="toPay">提交订单</view>
			</view>
		</view>
	</view>
</template>




 -->

<template>
	<view>
		<view v-if="wxa_order_queren_hide_address != 1" style="border-bottom:1px dashed #e5e5e5;">
		    <view class="p_all bg_white mt10 font_14" v-if="addemt==0">
				<view @click="goAddress()">
					<view class="df">
						<view class="df_1 c6" style="padding: 5upx 20upx;">
							<view style='display:flex;'>
								<view class="l_h20" style="font-size:40upx;margin-right:56upx;">{{order_address_detail.name}}</view>
								<view class="l_h20 " style="font-size:40upx;">{{order_address_detail.mobile}}</view>
							</view>
							<view class="l_h20 mt5" style="font-size:22upx;margin-top:22upx;">
								{{order_address_detail.province_name}}{{order_address_detail.city_name}}{{order_address_detail.district_name}}{{order_address_detail.address}}
							</view>
						</view>
						<image class="x_right mt15" src="../../static/img/x_right.png"></image>			
					</view>
				</view>
			</view>
			<view class="p_all bg_white mt10 font_14" v-else>
				<view @click="goAddress()">
					<view class="df">
						<view class="df_1 c6">添加收货地址</view>
		
						<image class="x_right mt15" src="../../static/img/x_right.png"></image>			
					</view>
				</view>
			</view>
		</view>
		
		<view class="p_all bg_white df item"  v-for="(item,key) in productData" :key="key">
			<view class="photo_name">
				<view class="cp_photo">			
					<image mode='widthFix' :src="item.picture"></image>
				</view>
				<view class="df_1">	
					<view class="font_14 mt5">
						{{item.name}} {{item.option_name}}
		            </view>	
				</view>
			</view>
			  
			<view>
				<view class="danji_shulian">
					<text class="gm_ovh_1h pt10">单价</text>
					<text class="gm_ovh_1h pt10">¥{{item.price}}</text>
				</view>
				
				<view class="danji_shulian">
					<text class="gm_ovh_1h pt10">数量</text>	
					<text class="gm_ovh_1h pt10">{{item.amount}}</text>	
				</view> 
		              
				<view class="danji_shulian" v-if="item.product_take_score">
					<text class="gm_ovh_1h pt10">积分变动</text>	
					<text class="gm_ovh_1h pt10">{{item.product_take_score}}</text>	
				</view>     
		                    
			</view>
		        
		</view>
		<view class="w100">
			
			<view class="a-dikou" :hidden="wxa_order_hide_balance_zengsong==1">
				<view class="b-dikou">
					<view>赠款抵扣</view>
					<view class="c-dikou">剩余 ￥ {{balance_zengsong}}</view>
				</view>  
				<switch class='d-dikou'  :checked="isSwitch1" @change="switch1Change"  data-type="1"/>
			</view>
		
		
			<view class="a-dikou" :hidden="wxa_order_hide_balance==1">
				<view class="b-dikou">
					<view>余额抵扣</view>
					<view class="c-dikou">剩余 ￥ {{balance}}</view>
				</view>  
				<switch class='d-dikou' :checked="isSwitch2" @change="switch1Change" data-type="2" />
			</view>
		
			<view class='p_all' style="padding-bottom:0;">
				<view class="heji_con">
					<text class="gm_ovh_1h pt10">合计</text>
					<text class="gm_ovh_1h pt10">¥ {{all_price}}</text>
				</view>
				<view class="heji_con">
					<text class="gm_ovh_1h pt10">运费</text>	
					<text class="gm_ovh_1h pt10">¥ {{traffic_price}}</text>	
				</view> 
				<view class="heji_con">
					<text class="gm_ovh_1h red pt10">实付</text>	
					<text class="gm_ovh_1h red pt10">¥ {{pay_price}}</text>	
				</view> 
			</view>
			
		    <text style="font-size:28upx;padding-left:3%;">备注</text>
			<view class="p_all bg_white mt10 font_14">
				<textarea class="min_60" auto-height name="remark" placeholder="如有备注请填写" @input="remarkInput" :value="remark" rows="3"/> 
			</view>	
		
			<view class="p_all mt10">
				<view class="btnGreen">
					<button class="xx_pay_submit" type="default" id="xxPay" :disabled="btnDisabled" style="width: 90%;" formType="submit" @tap="createOrder">提交订单</button>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	
	var util = require('../../common/util.js');
	export default {
		data() {
			return {
				buylist:[],		//订单列表
				goodsPrice:0.0,	//商品合计价格
				sumPrice:0.0,	//用户付款价格
				freight:12.00,	//运费
				note:'',		//备注
				int:1200,		//抵扣积分
				deduction:0,	//抵扣价格
				recinfo:'',
				address:'',
				
				
				
				itemData:{},
				userId:0,
				paytype:'weixin',//0线下1微信
				remark:'',
				productid:[],
				addrId:0,//收货地址//测试--
				btnDisabled:false,
				productData:[],
				orderProduct:[],
				total:0,
				vprice:0,
				vid:0,
				addemt:1,
				vou:[],
				orderId:{},
				amount:'',
				cartId:'321',
				balance_zengsong_dikou: 0,
				balance_dikou: 0,
				wxa_order_queren_hide_address:0,
				wxa_order_hide_coupon:'',
				wxa_order_hide_balance_zengsong:'',
				wxa_order_hide_balance:'',
				action:'',
				ucid:'',
				isSwitch1:false,
				isSwitch2:false,
				balance_zengsong:'',
				balance:'',
				all_price:'',
				traffic_price:'',
				pay_price:'',
				util:'',
				// recinfo:{id:1,name:"大黑哥",head:"大",tel:"18816881688",address:{region:{"label":"广东省-深圳市-福田区","value":[18,2,1],"cityCode":"440304"},detailed:'深南大道1111号无名摩登大厦6楼A2'},isDefault:true}
				order_address_detail: {},
				is_waimai: '',
				shopId: ''
			};
		},
		
		onLoad(options) {
			var that = this;
			console.log('order/pay 参数：', options);
			
			
			
			// #ifdef H5
				options.productid = encodeURIComponent(options.productid);
			// #endif
			uni.showLoading({
				title: '加载中...',
			})
			
			
			 console.log('options============', options)
			    var is_waimai = options.is_waimai;
				
				
				this.is_waimai = is_waimai
						
			    
			    var that = this;
			    if (options.shopId) {
					
					this.shopId = options.shopId
			    }
			
			
			
			
			if (options.ucid) {
				that.ucid = options.ucid
			}
			
			if (options.productid) {
				uni.setStorageSync("cache_options", JSON.stringify(options));
			} else {
				options = JSON.parse(uni.getStorageSync("cache_options"));
			}
			
			var last_url = '';
			
			var arr = Object.keys(options);
			var options_len = arr.length;
			
			console.log("arr",arr);
			console.log("options_len",options_len);
			
			if (options_len > 0){
				var params_str = '';
			
				for(var key in options){
					params_str += key+'='+options[key]+'&';
				}
				params_str = params_str.substr(0, params_str.length - 1);
			
				last_url = '/pages/order/confirmation?'+params_str;
				console.log("last_url",last_url);
				console.log("params_str",params_str);
			}
			console.log("productid",that.productid);
			if (!last_url && options.productid) {
				last_url = '/pages/goods/goods?productid=' + options.productid;
				that.last_url = last_url
			}
			
			if(last_url){
				that.last_url = last_url
				that.abotapi.goto_user_login(last_url, 'normal');
			}
			
			if (options.price_type){
				that.price_type = options.price_type
			}
			
			that.productid = options.productid;
			that.amount = options.amount;
			that.action = options.action;
			
			if (options.paysuccess_url){
				uni.setStorageSync('paysuccess_url', decodeURIComponent(options.paysuccess_url));
				console.log('uni.getStorageSync paysuccess_url==>>>', uni.getStorageSync('paysuccess_url'));
			}
			console.log("options==>>",options);
			
			this.abotapi.set_option_list_str(this, this.loadProductDetail);
			this.abotapi.set_option_list_str(this, this.callback_function);
		},
		onShow() {
			//页面显示时，加载订单信息
			uni.getStorage({
				key:'buylist',
				success: (ret) => {
					this.buylist = ret.data;
					this.goodsPrice=0;
					//合计
					let len = this.buylist.length;
					for(let i=0;i<len;i++){
						this.goodsPrice = this.goodsPrice + (this.buylist[i].amount*this.buylist[i].price);
					}
					this.deduction = this.int/100;
					this.sumPrice = this.goodsPrice-this.deduction+this.freight;
				}
			});
			uni.getStorage({
				key:'selectAddress',
				success: (e) => {
					this.recinfo = e.data;
					console.log('this.recinfo',this.recinfo);
					uni.removeStorage({
						key:'selectAddress'
					})
				}
			})

		},
		onHide() {
			
		},
		// onBackPress() {
		// 	//页面后退时候，清除订单信息
		// 	this.clearOrder();
		// },
		filters: {
			toFixed:function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		methods: {
			
			
			callback_function:function(that, cb_params){
				
				if(!cb_params){
					return;
				}
				
				console.log('cb_params====', cb_params);
				
				
				//====1、更新界面的颜色
				this.abotapi.getColor();
				
				//====2、其他的设置选项：商品列表风格、头条图标等等
				if (cb_params.wxa_product_list_style) {
				    
				      this.wxa_product_list_style = cb_params.wxa_product_list_style
				    
				}
				
				if (cb_params.wxa_show_kucun_in_list) {
				  
				    this.wxa_show_kucun_in_list = cb_params.wxa_show_kucun_in_list
				  
				}
				
					
				if (cb_params.wxa_hidden_product_list) {
				  
				    this.wxa_hidden_product_list = cb_params.wxa_hidden_product_list
				  
				}
						
				if (cb_params.wxa_kefu_button_type) {
				  
				   this.wxa_kefu_button_type = cb_params.wxa_kefu_button_type
				  
				}
						
				if (cb_params.wxa_kefu_button_icon) {
				  
				   this.wxa_kefu_button_icon = cb_params.wxa_kefu_button_icon
				  
				}
						
				if (cb_params.wxa_kefu_mobile_num) {
				  
				    this.wxa_kefu_mobile_num = cb_params.wxa_kefu_mobile_num
				  
				}
						
				if (cb_params.wxa_kefu_form_url) {
				  
				    this.wxa_kefu_form_url = cb_params.wxa_kefu_form_url
				  
				}
						
				
				if (cb_params.wxa_order_hide_coupon) {
				  
				    this.wxa_order_hide_coupon = cb_params.wxa_order_hide_coupon
				  
				}
				
				if (cb_params.wxa_order_hide_balance_zengsong) {
				  
				    this.wxa_order_hide_balance_zengsong = cb_params.wxa_order_hide_balance_zengsong
				  
				}
				
				if (cb_params.wxa_order_hide_balance) {
				  
				    this.wxa_order_hide_balance = cb_params.wxa_order_hide_balance
				  
				}
				
				if (!cb_params.wxa_order_queren_hide_address){
					cb_params.wxa_order_queren_hide_address = 0;
				}
				that.wxa_order_queren_hide_address = cb_params.wxa_order_queren_hide_address
			
			},
			
			
			
			loadProductDetail:function(){
				console.log(123123);
				var that = this;
			    var userInfo = that.abotapi.get_user_info();
				
				if (that.action == "direct_buy") {
							
					var data_params = {
						productid: that.productid,
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						action: that.action,
						amount: that.amount,
						sellerid: that.abotapi.get_sellerid(),
					};
							
							
					if (that.ucid){
						data_params.ucid = that.ucid
					}
							
				  
					uni.request({
						url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_queren',
						method: 'post',
						data: data_params,
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: function (res) {
							console.log("ORDER_QUEREN_res",res);
							setTimeout(function () {
								uni.hideLoading()
							}, 2000)
							var code = res.data.code;
							if(code == 2) {
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 2000,
								});
							}else if (code == 1) {
								
								var order_address_detail = res.data.address;
							
								console.log(order_address_detail);
							
								if (!order_address_detail) {
									that.addemt = 1
									console.log('that.addemt = 1');
								}else {
									that.order_address_detail = order_address_detail;
									that.addemt = 0
									console.log('that.addemt = 0');
								}
							
				        
								that.all_price = res.data.all_price;
								that.pay_price = res.data.pay_price;
								that.pay_price_origin = res.data.pay_price;
				              
							
								that.order_address_detail = order_address_detail;
								that.productData = res.data.orderlist;
								console.log("that.productData==>>>",that.productData);
								that.traffic_price = res.data.traffic_price;
								that.all_product_take_score = res.data.all_product_take_score;
								that.balance = res.data.balance;
								that.balance_zengsong = res.data.balance_zengsong;
							
								if (res.data.user_coupon_item){
									that.user_coupon_item = res.data.user_coupon_item
								}
							} else {
								uni.showModal({
									title: '提示',
									content: res.data.msg,
									showCancel: 'false'
								})            
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
				} else {
					
					
							var data_params = {
								// productid: that.productId,
								productid: that.productid,
								userid: userInfo.userid,
								checkstr: userInfo.checkstr,
								sellerid: that.abotapi.get_sellerid(),
							}
							
							console.log("data_params",data_params);
							if(that.ucid){
								data_params.ucid = that.ucid
							}
					
							uni.request({
								url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_queren',
								method: 'post',
								data: data_params,
								header: {
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								success: function (res) {
									console.log("order_queren_res",res);
									setTimeout(function () {
										uni.hideLoading()
									}, 2000)
									var code = res.data.code;
									// console.log(res.data);
					
									if (code == 1) {
										var order_address_detail=res.data.address;
									
										if (!order_address_detail){
											that.addemt = 1
											console.log('that.addemt2 = 1');
										}else { 
											that.order_address_detail = order_address_detail;
											that.addemt = 0
											console.log('that.addemt2 = 0');
										}
					
										that.all_price = res.data.all_price;
										that.pay_price = res.data.pay_price;
										that.pay_price_origin = res.data.pay_price;
					
					
										that.order_address_detail = order_address_detail;
					
										that.productData = res.data.orderlist;
					
										that.traffic_price = res.data.traffic_price;
										that.all_product_take_score = res.data.all_product_take_score;
										that.balance = res.data.balance;
										that.balance_zengsong = res.data.balance_zengsong;
					
										if (res.data.user_coupon_item) {
											that.user_coupon_item = res.data.user_coupon_item
										}
									} else {
										uni.showModal({
											title: '提示',
											content: res.data.msg,
											showCancel: 'false'
										}) 
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
				
				
				
		
			},
			
			logout: function () {
			    this.abotapi.del_user_info();
			
			    var sellerid = this.abotapi.get_sellerid();
			    if (typeof (sellerid) != 'undefined') {
					if (sellerid.length > 15) {
						uni.clearStorageSync();
						console.log('清空完成，sellerid：' + this.abotapi.get_sellerid());
					}
			    }
			
				uni.clearStorageSync();
			
				this.abotapi.goto_user_login(this.data.last_url, 'normal');
			},
			  
			
			remarkInput:function(e){
				that.remark = e.detail.value
			},
			
			
			//获取用户地址
			get_address_list:function(){
				var that = this;
				var userInfo = this.abotapi.get_user_info();
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=address_list',
					data: {
						checkstr: userInfo.checkstr,
				        userid:userInfo.userid,
				        sellerid: this.abotapi.get_sellerid()
					},
					method: 'POST', 
					header: {
						'Content-Type':  'application/x-www-form-urlencoded'
					},
				      
					success: function (res) {
						console.log('res',res);
						if(res.data.code == 1){
							that.address = res.data.addressList[0];
							// if(that.address[index].is_default == 1){
							// 	that.address = that.address[index];
							// }
						}
					}
				})
			},
			
			
			//微信支付
			createProductOrderByWX:function(e){
				this.paytype = 'weixin'
				this.createProductOrder();
			},
			
			  //线下支付
			createProductOrderByXX:function(e){
				this.paytype = 'cash'
			    uni.showToast({
					title: "线下支付开通中，敬请期待!",
					duration: 3000
				});
			    return false;
			    this.createProductOrder();
			},
			
			
			createOrder:function(){
				this.btnDisabled = true
			    var that = this;
			    
			    if (that.wxa_order_queren_hide_address != 1){
					if (!that.order_address_detail || (!that.order_address_detail.addressid)){
						uni.showModal({
							title: '提示',
							content: '请填写收货地址',
							showCancel:false,
							success(res) {
								that.btnDisabled = false
							}
						})
			
						return;
					}
			    }
			
			
			    var userInfo = that.abotapi.get_user_info();
			
			
			    console.log(that.pay_price);
			    console.log(that.all_price);
			
			
			    var data_orderAdd = {
			
					buyer_memo: that.remark,
					all_price: that.all_price,
					userid: userInfo.userid,
					checkstr: userInfo.checkstr,
					traffic_price: that.traffic_price,
					pay_price: that.pay_price,
					sellerid: that.abotapi.get_sellerid(),
					payment: 3
			    };
				
				
			    if (that.all_price == 'undefined'){
					uni.showModal({
						title: '提示',
						content: '参数错误，请重新下单！',
						showCancel: 'false'
					})
					return;
				}
			
			    if (that.all_product_take_score){
					data_orderAdd.all_product_take_score = that.all_product_take_score
			    }
			
			    if(that.ucid){
					data_orderAdd.ucid = that.user_coupon_item.ucid;
					data_orderAdd.coupon_price = that.user_coupon_item.price;
			    }
			
			    
			    uni.request({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_add',
					method: 'post',
					data: data_orderAdd,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function (res) {
						console.log("res======",res);
						//--init data        
						var data = res.data;
						if (data.code == 1) {
						//创建订单成功
							that.paytype = 'weixin';
							that.orderid = res.data.orderid;
							that.orderno = res.data.orderno;

							uni.redirectTo({
								url: '/pages/pay/payment/payment?orderId=' + that.orderid + '&balance_zengsong_dikou=' + that.balance_zengsong_dikou + '&balance_dikou=' + that.balance_dikou + '&traffic_price=' + that.traffic_price,
							})
						}else if (data.code == 2) {
			
							uni.showModal({
								title: '提示',
								content: res.data.msg,
								success(res) {
									if (res.confirm) {
										console.log('用户点击确定')
									} else if (res.cancel) {
										console.log('用户点击取消')
									}
								}
							})
							that.btnDisabled = false
			
			          
						} else {
							uni.showToast({
								title: "下单失败!",
								duration: 2500
							});
							that.btnDisabled = false
						}
					},
					fail: function (e) {
						uni.showToast({
							title: '网络异常！err:createProductOrder',
							duration: 2000
						});
						that.btnDisabled = false
					}
			    });
			},
			
			
			//调起微信支付
			wxpay_after_option_key_value: function (e) {
			    var that=this;
			    var userInfo = this.abotapi.get_user_info();
			    uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_buy',
					data: {
						orderid: that.orderid,
						payment_type: 3,
						trade_type: 'JSAPI_WXA',
						appid: this.abotapi.globalData.xiaochengxu_appid,
						openid: userInfo.user_openid,
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						client: 'wxa',
						sellerid: this.abotapi.get_sellerid(),    
						yue_amount: that.balance_dikou,
						zengkuan_amount: that.balance_zengsong_dikou,
					},
					method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}, // 设置请求的 header
					success: function (res) {
						console.log('order_buy order_buy order_buy', res);
			
						if (res.data.code == 1) {
			
							if(res.data.str == 'yue'){
								uni.showToast({
									title: "支付成功!",
									duration: 2000,
								});
			
								setTimeout(function () {
									uni.navigateTo({
										url: '../user/dingdan?currentTab=2&otype=2',
									});
								}, 2500);
								return;
							}
							if (res.data.wxpay_params.errcode == 1) {
								
								uni.showModal({
									title: '提示',
									content: '启动微信钱包失败！',
								})
								that.btnDisabled = false
								return;
							}
			
							var payment_parameter_str = res.data.wxpay_params.parameters;
					   
							var payment_parameter = JSON.parse(payment_parameter_str);
			          
							uni.requestPayment({
								appId: payment_parameter.appId,
								timeStamp: payment_parameter.timeStamp,
								nonceStr: payment_parameter.nonceStr,
								package: payment_parameter.package,
								signType: payment_parameter.signType,
								paySign: payment_parameter.paySign,
				
								success: function (res) {
									uni.showToast({
										title: "支付成功!",
										duration: 2000,
									});
				
									setTimeout(function () {
										uni.navigateTo({
											url: '../user/dingdan?currentTab=2&otype=2',
										});
									}, 2500);
				
								},
								fail: function (res) {
									uni.showToast({
										title: '支付失败',
										duration: 3000
									})
									that.btnDisabled = false
								}
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 2000
							});
							that.btnDisabled = false
						}
					},
					fail: function () {
						// fail
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
			          that.btnDisabled = false
					}
			    })
			},
			
			  
			//钱包抵扣
			switch1Change: function (e) {
				console.log('eeeeee',e);
			
				if (type == null && value == null) {
					var type = e.currentTarget.dataset.type;
					var value = e.detail.value;
					var that = this;
				}
			
			    var pay_price = that.pay_price;
			    var pay_price_origin = that.pay_price_origin;   
			    var balance_zengsong = that.balance_zengsong;
			    var balance = that.balance;
			    var balance_zengsong_dikou = that.balance_zengsong_dikou;
			    var balance_dikou = that.balance_dikou;
			
			
			
			    if (type == 1) {
					if (value) {
						if (parseFloat(balance_zengsong) < parseFloat(pay_price_origin)) {
			
							if (that.balance_dikou) {
			
								that.switch1Change(null, 2, false, that)
								pay_price = that.pay_price;
								balance_zengsong = that.balance_zengsong;
								balance = that.balance;
								balance_zengsong_dikou = that.balance_zengsong_dikou;
								balance_dikou = that.balance_dikou;
						
			
								that.balance_zengsong = util.sprintf("%6.2f", 0);
								that.pay_price = util.sprintf("%6.2f", parseFloat(pay_price) - parseFloat(balance_zengsong));
								that.balance_zengsong_dikou = util.sprintf("%6.2f", parseFloat(balance_zengsong));
								that.isSwitch2 = false;
							} else {
								that.balance_zengsong = util.sprintf("%6.2f", 0);
								that.pay_price = util.sprintf("%6.2f", parseFloat(pay_price) - parseFloat(balance_zengsong));
								that.balance_zengsong_dikou = util.sprintf("%6.2f", parseFloat(balance_zengsong));
							}
			
			
			
						} else {
			
							if (that.balance_dikou) {
			
								that.switch1Change(null, 2, false, that)
								pay_price = that.pay_price;
								balance_zengsong = that.balance_zengsong;
								balance = that.balance;
								balance_zengsong_dikou = that.balance_zengsong_dikou;
								balance_dikou = that.balance_dikou;
							}
			
								that.balance_zengsong = util.sprintf("%6.2f", parseFloat(balance_zengsong) - parseFloat(pay_price));
								that.pay_price = util.sprintf("%6.2f", 0);
								that.balance_zengsong_dikou = util.sprintf("%6.2f", parseFloat(pay_price));
								that.isSwitch2 = false;
						
						}
					} else {
			
						that.balance_zengsong = util.sprintf("%6.2f", parseFloat(balance_zengsong) + parseFloat(balance_zengsong_dikou));
						that.pay_price = util.sprintf("%6.2f", parseFloat(pay_price) + parseFloat(balance_zengsong_dikou));
						that.balance_dikou = util.sprintf("%6.2f", 0);
						that.balance_zengsong_dikou = util.sprintf("%6.2f", 0);
					}
			
			    } else if (type == 2) {
					if (value) {
						if (parseFloat(balance) < parseFloat(pay_price_origin)) {
			     
							if (that.balance_zengsong_dikou) {
			
								that.switch1Change(null, 1, false, that)
								pay_price = that.pay_price;
								balance_zengsong = that.balance_zengsong;
								balance = that.balance;
								balance_zengsong_dikou = that.balance_zengsong_dikou;
								balance_dikou = that.balance_dikou;
						
			
								that.balance = util.sprintf("%6.2f", 0);
								that.pay_price = util.sprintf("%6.2f", parseFloat(pay_price) - parseFloat(balance));
								that.balance_dikou = util.sprintf("%6.2f", parseFloat(balance));
								that.isSwitch1 = false;
							} else {
								that.balance = util.sprintf("%6.2f", 0);
								that.pay_price = util.sprintf("%6.2f", parseFloat(pay_price) - parseFloat(balance));
								that.balance_dikou = util.sprintf("%6.2f", parseFloat(balance));
							}
			
			
						} else {
			
							if (that.balance_zengsong_dikou) {
			
								that.switch1Change(null, 1, false, that)
								pay_price = that.pay_price;
								balance_zengsong = that.balance_zengsong;
								balance = that.balance;
								balance_zengsong_dikou = that.balance_zengsong_dikou;
								balance_dikou = that.balance_dikou;
							}
							that.balance = util.sprintf("%6.2f", parseFloat(balance) - parseFloat(pay_price));
							that.pay_price = util.sprintf("%6.2f", 0);
							that.balance_dikou = util.sprintf("%6.2f", parseFloat(pay_price));
							that.isSwitch1 = false;
			
						}
					} else {
			
						that.balance = util.sprintf("%6.2f", parseFloat(balance) + parseFloat(balance_dikou));
						that.pay_price = util.sprintf("%6.2f", parseFloat(pay_price) + parseFloat(balance_dikou));
						that.balance_zengsong_dikou = util.sprintf("%6.2f", 0);
						that.balance_dikou = util.sprintf("%6.2f", 0);
					}
			
			    }
			},
			
			//添加order_option
			order_add_new_option_by_key_value:function(e){
				var that = this;
			    
			    api.abotRequest({
					url: app.globalData.http_server + '?g=Yanyubao&m=ShopAppWxa&a=order_add_new_option_by_key_value',
					data: {
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						sellerid: that.abotapi.get_sellerid(),
						orderid: that.orderid,
						order_option_key_and_value_str: that.order_option_key_and_value_str
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method: "POST",
					success: function (res) {
			        
					},
					fail: function (res) {
			        
					}
			    })
			
			    
			},
			
			
			
			
			
			
			//跳转收货地址
			goAddress:function(){
				var that= this;
				uni.navigateTo({
					url:'/pages/address/user-address/user-address?cartId=321&amount='+that.amount+'&productid='+that.productid+'&action_pay='+that.action
				})
			},
			// clearOrder(){
			// 	uni.removeStorage({
			// 		key: 'buylist',
			// 		success: (res)=>{
			// 			this.buylist = [];
			// 			console.log('remove buylist success');
			// 		}
			// 	});
			// },
			// toPay(){
			// 	//商品列表
			// 	let paymentOrder = [];
			// 	let goodsid=[];
			// 	let len = this.buylist.length;
			// 	for(let i=0;i<len;i++){
			// 		paymentOrder.push(this.buylist[i]);
			// 		goodsid.push(this.buylist[i].productid);
			// 	}
			// 	if(paymentOrder.length==0){
			// 		uni.showToast({title:'订单信息有误，请重新购买',icon:'none'});
			// 		return ;
			// 	}
			// 	//本地模拟订单提交UI效果
			// 	uni.showLoading({
			// 		title:'正在提交订单...'
			// 	})
			// 	setTimeout(()=>{
			// 		uni.setStorage({
			// 			key:'paymentOrder',
			// 			data:paymentOrder,
			// 			success: () => {
			// 				uni.hideLoading();
			// 				uni.redirectTo({
			// 					url:"/pages/pay/payment/payment?amount="+this.sumPrice
			// 				})
			// 			}
			// 		})
			// 	},1000)
				
			// },
			// //选择收货地址
			// selectAddress(){
			// 	uni.navigateTo({
			// 		url:'/pages/user/address/address?type=select'
			// 	})
			// },
		}
	}
</script>

<style lang="scss">
	.item .cp_photo{ 
	    width: 60px; 
	    height: 60px;
	    overflow: hidden; 
	    border-radius: 3px; 
	    margin-right: 10px;
	}
	.item .cp_photo image{ 
	    width: 60px; 
	    height: 60px;
	}
	
	.item {
	  display: flex;
	  flex-direction: column;
	}
	.gm_ovh_2h{
	    line-height:25px; 
	    height: 50px; 
	    margin:0; 
	    overflow:hidden;  
	    text-overflow:ellipsis; 
	    display:-webkit-box; 
	    -webkit-line-clamp:2;  
	    -webkit-box-orient:vertical; 
	    font-size: 16px;
	}
	.gm_ovh_1h{
	    line-height:25px; 
	    height: 25px; 
	    margin:0; 
	    overflow:hidden;  
	    text-overflow:ellipsis; 
	    display:-webkit-box; 
	    -webkit-line-clamp:2;  
	    -webkit-box-orient:vertical; 
	    font-size: 28upx;
	} 
	.h10_hui{
	    height: 10px;
	    width: 100%;
	    background: #eee;
	}
	
	.min_60{
	    min-height: 60px;
	    width: 100%;
	    border: 1px solid #e5e5e5;
	}
	
	.w100{ width: 100%}
	
	.iconWarn{
	   vertical-align:top;padding-right:2px;
	}
	
	.iconClear{
	  float:right;
	  padding-top: 5px;
	  padding-left: 10px;
	  padding-right:10px;
	  margin-top:-36px;
	  height: 28px;
	}
	
	.inputStyle{
	  height: 36px;
	  line-height: 36px;
	  padding-left: 2px;
	  width:80%;
	}
	
	.tips{
	  margin-bottom:10px;
	}
	.x_right{
	    width:16px;
	    height: 18px;
	    display:inline-block; 
	    vertical-align: middle;
	    float: right; 
	}
	.zhifu{
	    background: #fff;
	    margin-bottom: 1px;
	    padding: 4%;
	    width: 92%;
	    font-size: 14px;
	    color: #666;
	}
	.font_20{
	    font-size: 20px;
	    font-weight: bold;
	}
	.xx_pay_submit{
	  margin-top: 10px;
	  color: #fff !important;
	  background-color: #1AAD19 !important;
	
	}
	.gms_view{  
	    width: 100%;
	    display: inline-block;
	    text-align: right;
	}
	.gms_view navigator{
	    border: 1px solid #ddd;
	    width: 22px;
	    height: 22px;
	    border-radius: 50%;
	    color: #666;
	    font-size: 12px;
	    text-align: center;
	    line-height: 22px;
	    float: right;
	    font-weight: bold;
	    
	}
	.gms_view input{
	    background: #fff;
	    border: 1px solid #ddd;
	    border-radius: 2px;
	    font-size: 12px;
	    width: 30px;
	    margin: 0 5px;
	    text-align: center;
	    color: #999;
	    float: right;
	}
	.che{
	    border-radius:50% ;
	    width: 20px;
	    height: 20px;
	}
	.hui{
	    margin-left: 28upx;
	    font-size: 30upx;
	    
	}
	.xuan{
	    padding: 10upx 0;
	    font-size: 30upx;
	}
	
	.photo_name{
	    display: flex;
	}
	
	.danji_shulian{
	  display:flex;
	  justify-content:space-between;
	  border-bottom: 1upx solid #e5e5e5;
	  padding:0 20upx;
	}
	
	.heji_con{
	  display:flex;
	  justify-content:space-between;
	  padding: 0 20upx;
	}
	
	.a-dikou{
	  display:flex;
	  padding:0 0 3%;
	  font-size:28upx;
	  justify-content:space-between;
	  border-bottom:1px solid #e5e5e5;
	  margin-bottom:20upx;
	  width:94%;
	  margin-left:3%;
	}
	
	.b-dikou{
	  display: flex;
	}
	
	.c-dikou{
	  margin-left:40upx;
	}
	.d-dikou{
	  zoom: .7
	}
	
	.c2-dikou{
	  display:flex;
	  align-items:flex-end;
	}
	
	.d-coupon{
	  display:flex;
	  align-items:flex-end;
	}
</style>
