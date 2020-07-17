<!-- <template>
	<view>
		<view class="block">
			<view class="content">
				<view class="orderinfo">
					<view class="row">
						<view class="nominal">订单名称:</view><view class="text">{{orderName}}</view>
					</view>
					<view class="row">
						<view class="nominal">订单金额:</view><view class="text">{{amount}}元</view>
					</view>
				</view>
			</view>
		</view>
		<view class="block">
			<view class="title">
				选择支付方式
			</view>
			<view class="content">
				<view class="pay-list">
					<view class="row" @tap="paytype='alipay'">
							<view class="left">
								<image src="/static/img/alipay.png"></image>
							</view>
							<view class="center">
								支付宝支付
							</view>
							<view class="right">
								<radio :checked="paytype=='alipay'" color="#f06c7a" />
							</view>
					</view>
					<view class="row" @tap="paytype='wxpay'">
							<view class="left">
								<image src="/static/img/wxpay.png"></image>
							</view>
							<view class="center">
								微信支付
							</view>
							<view class="right">
								<radio :checked="paytype=='wxpay'" color="#f06c7a" />
							</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pay">
			<view class="btn" @tap="doDeposit">立即支付</view>
			<view class="tis">
				点击立即支付，即代表您同意<view class="terms">
					《条款协议》
				</view>
			</view>
		</view>
	</view>
</template>

 -->


<template>
	<view>
		<view class='view1'>
			<view class='vw'><text>支付信息</text></view>
			<view class='vw1'>
				<text>订单编号：</text>
				<view class='view2'>{{orderData.orderno}}</view>
			</view>
			<view class='vw1'>
				<text>商品金额：</text>
				<view class='view2'>{{orderData.price}}</view>
			</view>
			<view class='vw1'>
				<text>快递费：</text>
				<view class='view2'>{{orderData.price3}}</view>
			</view>
			<view class='vw1'>
				<text>订单合计：</text>
				<view class='view2'>{{orderData.order_total_price}}</view>
			</view>
			<view class='vw1'>
				<text>余额支付：</text>
				<view class='view2'>-{{balance_dikou}}</view>
			</view>
			<view class='vw1'>
				<text>赠款支付：</text>
				<view class='view2'>-{{balance_zengsong_dikou}}</view>
			</view>
			<view class='vw1'>
				<text>应付金额：</text>
				<view class='view2'>{{pay_price}}</view>
			</view>
		</view>


		<view :style="pay_price != 0.00?'':'display:none'">

			<view ng-if="pay_type">
				<view style="width: 94%;height:35px;line-height:35px;font-size: 14px;color:#666;margin:30px auto 0 auto; ">支付方式</view>

				<view style="width: 100%;border-bottom: 1px solid #e6e6e6;border-top: 1px solid #e6e6e6;">
					<view class="payment_box">
						<radio-group class="radio-group" @change="radioChange">
							<view class="zhifu_li" v-if="show_weixin_pay==1">
								<image src="../../../static/img/kefu.png" class="tubiao_zhifu"></image>
								<view class="zhifu_name">微信支付</view>

								<radio value='wx_pay' checked='true' style='margin-left:90%;margin-top:7px;'></radio>
							</view>

							<view class="zhifu_li" v-if="show_zhuanzhang_pay==1">
								<image src="../../../static/img/payment_zhuanzhang.png" class="tubiao_zhifu"></image>
								<view class="zhifu_name">转账支付</view>
								<radio value='zz_pay' style='margin-left:90%;margin-top:7px;'></radio>
							</view>

						</radio-group>

					</view>


					<view class="zhifu_li" :key="index" :data-index='index' @tap='zhuangzhangPay($event)' v-for="(item,index) in pay_list"
					 :style='key==index?"background-color:#e6e6e6":""+zz_pay?"display:none":"display:block"'>
						<view class="zhifu_name" :key="index" :data-index='index' @tap='zhuangzhangPay($event)'>{{item.pay_name}}</view>
					</view>
					<view :style="payView?'display:none':'display:block'+';font-size:15px;margin-bottom:100px;'">
						<view :style="zz_pay?'display:none':'display:block'">
							<view v-if="payList.pay_type==0">
								<view class="section">
									<label class='section_view'>收款人：</label>
									<view class='section_view2'>{{payList.username}}</view>
								</view>
								<view class="section">
									<label class='section_view'>收款银行：</label>
									<view class='section_view2'>{{payList.bank_name}}</view>
								</view>
								<view class="section">
									<label class='section_view'>收款账号：</label>
									<view class='section_view2'>{{payList.card_num}}</view>
								</view>
							</view>

							<view style='text-align:center' v-else>
								<image style='width:250px;' mode='widthFix' :src='payList.card_num'></image>
							</view>

							<view>
								<view style='margin-top: 20rpx;color: gray;'>转账后请填写以下信息，以便于与财务对账</view>
								<form @submit="formSubmit">
									<view class="section">
										<label class='section_view' style="line-height:50rpx">汇款人：</label>
										<input type="text" name="name" placeholder="请填写汇款人" :value="adds.name" />
									</view>
									<view class="section">
										<label class='section_view' style="line-height:50rpx">汇款方式：</label>
										<input type="text" name="huikuan_pingtai" placeholder="如工行转账、建设银行等" :value="adds.huikuan_pingtai" />
									</view>
									<view class="section">
										<label class='section_view'>汇款日期：</label>
										<!--<view class='section_view2'>{{time}}</view>-->

										<picker mode="date" :value="date" start="2018-09-01" end="2030-06-01" @change="bindDateChange">
											<input placeholder="请输入日期" @input="dateInput" :value="date" />
										</picker>
									</view>

									<view class="section">
										<label class='section_view'>汇款时间：</label>
										<!--<view class='section_view2'>{{time}}</view>-->

										<picker mode="time" @value="time" start="00:01" end="23:59" @change="bindTimeChange">
											<input placeholder="请输入时间" @input="timeInput" :value="time" />
										</picker>
									</view>
									<view class="section">
										<view class='section_view'>汇款金额：</view>
										<view class='section_view2'>{{pay_price}}</view>
									</view>
									<view class="pay_submit">
										<button class="pay_submit" type="default" id="Pay" formType="submit" :data-price="pay_price" @tap="createProductOrderByZZ()">确认支付</button>
									</view>
								</form>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="pay_submit" v-if="zz_pay">
			<button type="default" id="Pay" formType="submit" 
				:style="{backgroundColor:btn_bg_color+' !important'}"
				:data-price="pay_price" @tap="zz_pay?createProductOrderByWX():createProductOrderByZZ()">确认支付</button>
		</view>
		<view class="pay_submit" v-if="pay_price == 0.00">
			<button type="default" id="Pay" formType="submit" 
				:style="{backgroundColor:btn_bg_color+' !important'}"
				:data-price="pay_price" @tap="createProductOrderByZZ()">确认支付</button>
		</view>


		<!--
			<view class="p_all">
				<view class="btnGreen">
					<button class="wx_pay_submit" type="primary" id="wxPay" disabled="{{btnDisabled}}" formType="submit" @tap="createProductOrderByWX">微信支付</button>
					<button class="xx_pay_submit" type="default" id="xxPay" disabled="{{btnDisabled}}" formType="submit" @tap="createProductOrderByXX">线下支付</button>
		  	</view>
			</view>
		  -->

	</view>
</template>





<script>
	// export default {
	// 	data() {
	// 		return {
	// 			amount:0,
	// 			orderName:'',
	// 			paytype:'alipay',//支付类型
	// 			orderData:''
	// 		};
	// 	},
	// 	onLoad(e) {
	// 		console.log("e",e);
	// 		return;
	// 		this.amount = parseFloat(e.amount).toFixed(2);
	// 		this.abotapi.set_option_list_str(null, this.abotapi.getColor());
	// 		uni.getStorage({
	// 			key:'paymentOrder',
	// 			success: (e) => {
	// 				if(e.data.length>1){
	// 					this.orderName = '多商品合并支付'
	// 				}else{
	// 					this.orderName = e.data[0].name;
	// 				}
	// 				uni.removeStorage({
	// 					key:'paymentOrder'
	// 				})
	// 			}
	// 		})
	// 	},
	// 	methods:{
	// 		doDeposit(){
	// 			//模板模拟支付，实际应用请调起微信/支付宝
	// 			uni.showLoading({
	// 				title:'支付中...'
	// 			});
	// 			setTimeout(()=>{
	// 				uni.hideLoading();
	// 				uni.showToast({
	// 					title:'支付成功'
	// 				});
	// 				setTimeout(()=>{
	// 					uni.redirectTo({
	// 						url:'../../pay/success/success?amount='+this.amount
	// 					});
	// 				},300);
	// 			},700)
	// 		}
	// 	}
	// }
</script>


<script>
	var util = require('../../../common/util.js');
	export default {
		data() {
			return {
				date: '2016-09-01',
				zz_pay: true,
				payView: true,
				pageBackgroundColor: '',
				orderData: '',
				orderno: '',
				balance_dikou: '',
				balance_zengsong_dikou: '',
				pay_price: '',
				show_weixin_pay: '',
				show_zhuanzhang_pay: '',
				pay_list: '',
				payList: '',
				pay_type: '',
				adds: '',
				name: '',
				time: '',
				orderId: '',
				key: '',
				
				btn_bg_color: '#1AAD19'
			}
		},
		onShow: function() {

		},
		onLoad: function(options) {
			console.log('options', options)
			
			var that = this;
			
			this.abotapi.set_option_list_str(this, (_self, option_list)=>{
				that.btn_bg_color = _self.abotapi.getColor();
				
			});
			
			var date = util.formatTime(new Date());
			var time = util.formatTime2(new Date());
			// 再通过setData更改Page()里面的data，动态更新页面的数据
			that.date = date
			that.time = time
			showView: (options.showView == "true" ? true : false)
			that.orderId = options.orderId;
			that.traffic_price = options.traffic_price ? options.traffic_price : 0;
			if (options.balance_zengsong_dikou) {
				that.balance_zengsong_dikou = options.balance_zengsong_dikou
			} else {
				that.balance_zengsong_dikou = util.sprintf("%6.2f", 0);
			}

			if (options.balance_dikou) {

				that.balance_dikou = options.balance_dikou;
			} else {
				that.balance_dikou = util.sprintf("%6.2f", 0);
			}

			if (options.recharge) {
				that.recharge = options.recharge;
			}

			var huikuan_info = uni.getStorageSync('huikuan_info');
			if (huikuan_info) {
				that.adds = huikuan_info
			}
			that.loadOrderDetail();
			
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=payment_type_list',
				method: 'post',
				data: {
					sellerid: that.abotapi.get_sellerid(),
					appid: that.abotapi.globalData.xiaochengxu_appid
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: function(res) {
					console.log("res111", res);
					var code = res.data.code;
					if (code == 1) {
						var type_list = res.data.data;


						var show_weixin_pay = 0;
						var show_zhuanzhang_pay = 0;
						for (var i = 0; i < type_list.length; i++) {
							if (type_list[i].payment_type == 3) {
								show_weixin_pay = 1;
							}

							if (type_list[i].payment_type == 6) {
								show_zhuanzhang_pay = 1;
							}
						}

						that.type_list = type_list
						that.show_weixin_pay = show_weixin_pay;
						that.show_zhuanzhang_pay = show_zhuanzhang_pay
						console.log("that.show_zhuanzhang_pay", that.show_zhuanzhang_pay);
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
		},
		methods: {
			radioChange: function(e) {
				console.log('change-->e', e);
				var that = this;
				var pay = e.detail.value;
				if (pay == 'zz_pay') {
					that.zz_pay = false
				} else {
					that.zz_pay = true;
					that.payView = true
				}
				var userInfo = that.abotapi.get_user_info();
				var pay_list = that.pay_list
				console.log('pay_list1', pay_list);
				if (pay_list == '') {
					that.abotapi.abotRequest({
						url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=offlinepay_get',
						method: 'post',
						data: {
							userid: userInfo.userid,
							checkstr: userInfo.checkstr,
							sellerid: that.abotapi.get_sellerid()
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: function(res) {

							var code = res.data.code;
							if (code == 1) {
								var pay_list = res.data.data;
								console.log('pay_list', pay_list);
								that.pay_list = pay_list;
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
			},
			loadOrderDetail: function() {
				var that = this;
				var userInfo = that.abotapi.get_user_info();
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_xiangqing',
					method: 'post',
					data: {
						orderid: that.orderId,
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						sellerid: that.abotapi.get_sellerid()
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						console.log("1122334", res);

						var code = res.data.code;
						if (code == 1) {
							that.orderData = res.data.orderinfo;

							that.pay_price = parseFloat(that.orderData.order_total_price);


							if (that.balance_zengsong_dikou < that.pay_price) {
								that.pay_price = that.pay_price - that.balance_zengsong_dikou;
							} else {
								that.pay_price = 0
							}


							if (that.balance_dikou < that.pay_price) {
								that.pay_price = that.pay_price - that.balance_dikou;
							} else {
								that.pay_price = 0
							}


							that.pay_price = util.sprintf("%6.2f", that.pay_price);

							if (that.pay_price == 0.00) {
								that.zz_pay = false
							}

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
			},


			//微信支付
			createProductOrderByWX: function(e) {
				this.paytype = 'weixin'
				this.call_weixin_pay();
			},
			bindDateChange: function(e) {
				var that = this;
				that.date = e.detail.value;
				console.log(e);
				that.date = e.detail.value
			},
			bindTimeChange: function(e) {
				var that = this;
				that.time = e.detail.value;
				console.log(e);
				that.time = e.detail.value
			},
			formSubmit: function(e) {
				var that = this;
				var adds = e.detail.value;

				uni.setStorageSync('huikuan_info', adds)
				that.adds = adds

			},
			dateInput: function() {
				var that = this;
				var date = e.detail.value;
				console.log(e);
				that.date = date
			},
			timeInput: function() {
				var that = this;
				var time = e.detail.value;
				console.log(e);
				that.time = time
			},
			zhuangzhangPay: function(e) {
				var that = this;
				var key = e.target.dataset.index;
				console.log(key);
				if (key == null) {
					return;
				};
				var pay_list = that.pay_list;
				that.payList = pay_list[key];
				that.payView = false;
				that.key = e.target.dataset.index
			},
			//线下支付
			createProductOrderByZZ: function(e) {
				this.paytype = 'zhuanzhang'
				this.zzpay();
			},
			zzpay: function() {
				var that = this;
				var userInfo = that.abotapi.get_user_info();

				var data_params = {
					orderid: that.orderId,
					payment_type: 6,
					userid: userInfo.userid,
					checkstr: userInfo.checkstr,
					sellerid: that.abotapi.get_sellerid(),
					money: that.pay_price,
					yue_amount: that.balance_dikou,
					zengkuan_amount: that.balance_zengsong_dikou,
					// offlinepayid: that.payList.offlinepayid,
					time: that.date + ' ' + that.time,
					// huikuan_pingtai: that.adds.huikuan_pingtai,
					// name: that.adds.name,
					body: "商城支付订单",
					subject: "商城支付订单",
				}


				if (that.pay_price != 0.00) {
					data_params.offlinepayid = that.payList.offlinepayid;
					data_params.huikuan_pingtai = that.adds.huikuan_pingtai;
					data_params.name = that.adds.name;
				}

				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_buy',
					data: data_params,
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}, // 设置请求的 header
					success: function(res) {
						if (res.data.code == 1) {

							uni.showModal({
								title: '提示',
								content: res.data.msg,
								showCancel: false,
								success(res001) {									
									that.__goto_pay_success_url();						
									
								}
							})

						} else {
							uni.showToast({
								title: "支付失败",
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
				})
			},
			call_weixin_pay: function(e) {
				//console.log('eeee',e)

				var that = this;
				
				var userInfo = that.abotapi.get_user_info();
				
				var payment_provider = 'wxpay';
				
				
				var post_data = {
						// productid: that.productid,
						orderid: that.orderId,
						payment_type: 3,						//支付类型，将来作为函数参数传入。3代表微信支付   2 代表支付宝支付
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						sellerid: that.abotapi.get_sellerid()
						/*
						appid:
						mch_id:
						nonce_str:
						noncestr:
						partnerid:
						prepay_id:
						sign:
						sub_mch_id:
						*/
				};
				
				// #ifdef APP-PLUS
				post_data.appid = that.abotapi.globalData.weixin_open_platform_appid;
				
				if(post_data.payment_type == 3){
					payment_provider = 'wxpay';
				}
				// #endif
				
				// #ifdef MP-WEIXIN
				post_data.trade_type = 'JSAPI_WXA';
				post_data.appid = that.abotapi.globalData.xiaochengxu_appid;
				post_data.openid = that.abotapi.get_current_openid();
				post_data.client = 'wxa';
				
				payment_provider = 'wxpay';
				// #endif
				
				
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_buy',
					data: post_data,
					method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}, // 设置请求的 header
					success: function(res) {
						console.log('order_buy order_buy order_buy', res);

						if (res.data.code != 1) {
							uni.showModal({
								title: '提示',
								content: '发起支付申请失败:'+res.data.msg,
							})

							return;
						}

						if (res.data.str && (res.data.str == 'yue')) {
							//使用余额或者其他优惠，总之不需要再支付了
							that.__goto_pay_success_url();

							return;
						}


						//通过微信支付
						if (!res.data.wxpay_params) {
							uni.showModal({
								title: '提示',
								content: '没有微信支付的参数',
							})

							return;
						}

						var payment_parameter_str = res.data.wxpay_params.parameters;


						if (res.data.wxpay_params && res.data.wxpay_params.errcode == 1) {
							// uni.showToast({
							//   title: "网络错误!",
							//   duration: 2000,
							//   icon: 'none',
							// });

							uni.showModal({
								title: '提示',
								content: '启动微信钱包失败！',
							})


							return;
						}


						var payment_parameter = JSON.parse(payment_parameter_str);
						
						console.log('准备调用 uni.requestPayment====>>>>>payment_parameter===>>>', payment_parameter);
						
						
						var uni_pay_params = {
							provider: payment_provider,
							
							success: function(res) {
								uni.showModal({
									title:'提示',
									content:'支付成功',
									showCancel:false,
									success:function(rrr){
										that.__goto_pay_success_url();
									}
								});

							},
							fail: function(res) {
								console.log('uni.requestPayment====>>>>>fail====>>>>', res);
								
								uni.showToast({
									title: '支付失败',
									duration: 3000
								})
							}
						};
						
						// #ifdef APP-PLUS
							uni_pay_params.timeStamp = payment_parameter.timestamp;
							uni_pay_params.nonceStr = payment_parameter.noncestr;
							uni_pay_params.package = payment_parameter.package;
							uni_pay_params.signType = payment_parameter.signType;
							uni_pay_params.paySign = payment_parameter.sign;
							
							uni_pay_params.orderInfo = JSON.stringify({
											appid: payment_parameter.appid,  
											noncestr: payment_parameter.noncestr,  
											package: payment_parameter.package,  
											partnerid: payment_parameter.partnerid,  
											prepayid: payment_parameter.prepayid,  
											timestamp: payment_parameter.timestamp,  
											sign: payment_parameter.sign,  
										});
						// #endif
						
						// #ifdef MP-WEIXIN
							uni_pay_params.timeStamp = payment_parameter.timeStamp;
							uni_pay_params.nonceStr = payment_parameter.nonceStr;
							uni_pay_params.package = payment_parameter.package;
							uni_pay_params.signType = payment_parameter.signType;
							uni_pay_params.paySign = payment_parameter.paySign;
						// #endif
						
						//appId: payment_parameter.appId,
						
						console.log('开始调用 uni.requestPayment====>>>>>uni_pay_params===>>>', uni_pay_params);
						
						uni.requestPayment(uni_pay_params);
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
			__goto_pay_success_url:function(){
				
				var paysuccess_url = uni.getStorageSync('paysuccess_url');
												
				console.log('paysuccess_url===', paysuccess_url)
				
				if (paysuccess_url && (typeof(paysuccess_url) == 'string') ){
					paysuccess_url = paysuccess_url.replace('%orderid%', this.orderId);
												
					this.abotapi.call_h5browser_or_other_goto_url(paysuccess_url);
					uni.removeStorageSync('paysuccess_url');
												
					return;
				}
				
				console.log('11111111');
												
				if (this.recharge == 1) {
					console.log('2222222');
					
					this.abotapi.call_h5browser_or_other_goto_url('/pages/user/user');
				} 
				else {
					console.log('333333333333');
					
					uni.navigateTo({
						//url: '../user/dingdan?currentTab=0&otype=',
						url: '/pages/user/order_list/order_list?currentTab=0&otype=',
					});
				}
				
			}
		}


	}
</script>





<style lang="scss">
	.section {
		font-size: 30rpx;
		display: flex;
		padding: 20rpx 30rpx;
		border-bottom: 1px solid #e6e6e6;
	}

	.section_view {
		width: 160rpx;
	}

	.pay_submit button {
		display: block;
		position: fixed;
		bottom: 20rpx;
		left: 0;
		background-color: #1AAD19;
		z-index: 100;
		text-align: center;
		width: 100%;
		font-size: 16px;
		border-top: 1px solid #eee;
		line-height: 50px;
		font-weight: 700;
		color: #fff;
	}

	.view1 {
		font-family: "微软雅黑";
		font-size: 28rpx;
		margin-top: 100rpx;
		color: #666;
	}

	.vw {
		font-family: "微软雅黑";
		font-size: 34rpx;
		margin-left: 40rpx;
		color: black;
	}

	.vw1 {
		width: 96%;
		height: 80rpx;
		border-bottom: 1px solid #e6e6e6;
		margin: 0 auto;
	}

	.vw1 text {
		line-height: 80rpx;
		margin-left: 30rpx;
	}

	.view2 {
		line-height: 80rpx;
		color: red;
		margin-right: 30rpx;
		text-align: right;
		float: right;
	}

	wx_pay_submit {
		margin-top: 100rpx;
	}

	.xx_pay_submit {
		margin-top: 30rpx;
	}

	.p_all {
		width: 80%;
		margin: 0 auto;
	}



	.payment_box {
		width: 94%;
		margin: 0 auto;
	}

	.zhifu_li {
		width: 100%;
		height: 80rpx;
		background: #fff;
		background-color: #fff;
		position: relative;
		border-bottom: 1px solid #e6e6e6;
	}

	.tubiao_zhifu {
		width: 50rpx;
		height: 50rpx;
		display: block;
		border-radius: 50%;
		overflow: hidden;
		position: absolute;
		top: 18rpx;
	}

	.zhifu_name {
		font-size: 30rpx;
		color: #222;
		position: absolute;
		top: 20rpx;
		left: 80rpx;
	}
</style>
