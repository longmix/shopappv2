<template>
	<view>
		<view class='view1'>
			<view class="sub_title"><text>支付信息</text></view>
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
			<view class='vw1' v-if="user_coupon_dikou > 0">
				<text>优惠券抵扣：</text>
				<view class='view2'>-{{user_coupon_dikou}}</view>
			</view>
			<view class='vw1'>
				<text>余额支付：</text>
				<view class='view2' v-if="balance_dikou != 0">-{{balance_dikou}}</view>
				<view class='view2' v-if="balance_dikou == 0">0</view>
			</view>
			<view class='vw1'>
				<text>赠款支付：</text>
				<view class='view2' v-if="balance_zengsong_dikou != 0">-{{balance_zengsong_dikou}}</view>
				<view class='view2' v-if="balance_zengsong_dikou == 0">0</view>
			</view>
			<view class='vw1' style="font-weight: bold;">
				<text>应付金额：</text>
				<view class='view2'>{{pay_price}}</view>
			</view>
		</view>


		<view class="my_pay_type" :style="pay_price != 0.00?'':'display:none'">

			<view class="sub_title">支付方式</view>

			<view style="width: 100%;border-bottom: 2rpx solid #e6e6e6;">
				<view class="payment_box">
					<radio-group class="radio-group" @change="radioChange">
						<view class="zhifu_li" v-if="show_weixin_pay==1">
							<image src="https://yanyubao.tseo.cn/Tpl/static/images/kefu.png" class="tubiao_zhifu"></image>
							<view class="zhifu_name">微信支付</view>

							<radio value='wx_pay' checked='true' style='margin-left:90%;margin-top:7px;'></radio>
						</view>
						
						<view class="zhifu_li" v-if="show_ali_pay==1">
							<image src="https://yanyubao.tseo.cn/Tpl/static/images/alipay.png" class="tubiao_zhifu"></image>
							<view class="zhifu_name">支付宝支付</view>
						
							<radio value='ali_pay' style='margin-left:90%;margin-top:7px;'></radio>
						</view>

						<view class="zhifu_li" v-if="show_zhuanzhang_pay==1">
							<image src="https://yanyubao.tseo.cn/Tpl/static/images/payment_zhuanzhang.png" class="tubiao_zhifu"></image>
							<view class="zhifu_name">转账支付</view>
							<radio value='zz_pay' style='margin-left:90%;margin-top:7px;'></radio>
						</view>

					</radio-group>

				</view>


				<view class="zhifu_li" :key="index" :data-index='index' @tap='zhuangzhangPay($event)' v-for="(item,index) in zhuanzhang_pay_list"
				 :style='key==index?"background-color:#e6e6e6":""+is_online_pay?"display:none":"display:block"'>
					<view class="zhifu_name" :key="index" :data-index='index' @tap='zhuangzhangPay($event)' style="font-weight: bold;">{{item.pay_name}}</view>
				</view>
				<view :style="payView?'display:none':'display:block'+';font-size:15px;margin-bottom:100px;'">
					<view :style="is_online_pay?'display:none':'display:block'">
						<view v-if="zhuanzhang_pay_item.pay_type==0">
							<view class="section">
								<label class='section_view'>收款人：</label>
								<view class='section_view2'>{{zhuanzhang_pay_item.username}}</view>
							</view>
							<view class="section">
								<label class='section_view'>收款银行：</label>
								<view class='section_view2'>{{zhuanzhang_pay_item.bank_name}}</view>
							</view>
							<view class="section">
								<label class='section_view'>收款账号：</label>
								<view class='section_view2'>{{zhuanzhang_pay_item.card_num}}</view>
							</view>
						</view>

						<view style='text-align:center' v-else>
							<image style='width:250px;' mode='widthFix' :src='zhuanzhang_pay_item.card_num'></image>
						</view>

						<view>
							<view style='margin-top: 20rpx;color: gray;padding: 20rpx 30rpx;'>转账后请填写以下信息，以便于与财务对账</view>
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
									<button type="default" id="Pay" formType="submit" :data-price="pay_price" @tap="createProductOrderByZZ()">确认支付</button>
								</view>
							</form>
						</view>
					</view>
				</view>
			</view>
			
		</view>

		<view class="pay_submit" v-if="is_online_pay">
			<!-- :style="{backgroundColor:btn_bg_color+' !important'}" -->
			<button type="default" id="Pay" formType="submit" 
				:style="{background: btn_bg_color,color:frontColor}"
				:data-price="pay_price" @tap="is_online_pay?createProductOrderByWX():createProductOrderByZZ()">确认支付</button>
		</view>
		<view class="pay_submit" v-if="pay_price == 0.00">
			<!-- :style="{backgroundColor:btn_bg_color+' !important'}" -->
			<button type="default" id="Pay" formType="submit" 
				:style="{background: btn_bg_color,color:frontColor}"
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
	var util = require('../../../common/util.js');
	export default {
		data() {
			return {
				//打开i页面时候带进来的参数
				current_options:{},
				
				date: '2016-09-01',
				
				is_online_pay: true,	//是否是在线支付（微信 活着 支付宝，而不是 转账支付）
				payView: true,
				
				current_payment_type:'',
				
				
				pageBackgroundColor: '',
				orderData: '',
				orderno: '',
				balance_dikou: '',
				balance_zengsong_dikou: '',
				pay_price: '',
				
				show_weixin_pay: 0,
				show_ali_pay: 0,
				show_zhuanzhang_pay: 0,
				
				//可用的转账支付的方式列表，例如 银行账号、收款二维码等
				zhuanzhang_pay_list: '',
				zhuanzhang_pay_item: '',
				
				adds: '',
				name: '',
				time: '',
				orderid: '',
				key: '',
				
				btn_bg_color: '#1AAD19',
				frontColor:'#ffffff',
				
				//2020.12.14.
				user_coupon_dikou:0,	//优惠券抵扣的金额
				
				//2021.6.7.  //特殊判断：是否为支付宝的门店商家付款
				//2021.6.8. 因为 /pages/pay/payment/payment在订单详情中也会被调用，所以不能再追加多余的参数了
				//is_mp_alipay_xianmai:0,
			}
		},
		onShow: function() {

		},
		onLoad: function(options) {
			console.log('options', options)
			
			var that = this;
			
			that.current_options = options;
			
			
			
			
			//检查参数
			var arr = Object.keys(options);
			
			var options_len = arr.length;
			var params_str = '';
			
			if (options_len > 0){
				for(var key in options){
					params_str += key+'='+options[key]+'&';
				}
				params_str = params_str.substr(0, params_str.length - 1);
			
			}
			
			//检查用户是否登录
			/*
			var userInfo = this.abotapi.get_user_info();
			
			if(!userInfo || !userInfo.userid){
				var last_url = 'pages/pay/payment/payment';
				
				last_url = last_url+'?'+params_str;
				
				that.abotapi.goto_user_login(last_url, 'normal');
				return;
			}*/
			
			//检查是否跳转到小程序支付
			
			//2021.1.20. 如果需要跳转到微信小程序中区支付
			// #ifdef APP-PLUS
			if(that.abotapi.globalData.order_buy_payment_to_mp_weixin == 1){
				
				
				//跳转到小程序中的网址
				var wxa_path = 'pages/pay/payment/payment';
				
				//读取所有的参数
				if (options_len > 0){
					wxa_path = wxa_path+'?'+params_str;
				}
				
				console.log('即将跳转到微信小程序中去支付===>>>>'+ that.abotapi.globalData.xiaochengxu_account);
				
				plus.share.getServices(
					function(res){ 
						var sweixin = null;  
						for(var i=0;i<res.length;i++){  
							var t = res[i];  
							if(t.id == 'weixin'){  
								sweixin = t;
								
								uni.showModal({
									title:'提示',
									content:'即将跳转到微信中支付',
									showCancel:false,
									success(res) {
										//唤醒微信小程序  type 可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0。 
										sweixin.launchMiniProgram({
											id: that.abotapi.globalData.xiaochengxu_account,
											path:wxa_path,
											type: 0,
											webUrl:'https://www.abot.cn'
										});
										
										uni.navigateBack({
											delta:1
										})
									}
								});
								
								return;
							}  
						}
						
						if(!sweixin){
							uni.showModal({
								title:'没有找到微信',
								content:'唤起微信支付失败',
								success(res) {
									if(res.confirm){
									}
								}
							});
							
						}  
					},
					function(res){  
						console.log(JSON.stringify(res));
						
						uni.showToast({
							title:'没有检测到微信'
						})
					}
				);
				
				
				return;
			}
			// #endif
			//========= End ===============
			
			
			//if(options.is_mp_alipay_xianmai){
			//	this.is_mp_alipay_xianmai = options.is_mp_alipay_xianmai;
			//}
			
			
			this.abotapi.set_option_list_str(this, (that, option_list)=>{
				
				//====1、更新界面的颜色
				if(that.abotapi.globalData.navigationBarBackgroundColor_fixed == 1){
					
					console.log('that.abotapi.globalData.navigationBar_bg_color==>>', that.abotapi.globalData.navigationBar_bg_color)
					
					/*uni.setNavigationBarColor({
						backgroundColor:that.abotapi.globalData.navigationBar_bg_color,
						frontColor:that.abotapi.globalData.navigationBar_font_color,
					})*/
					
					that.frontColor = that.abotapi.globalData.navigationBar_font_color;
					that.btn_bg_color = that.abotapi.globalData.navigationBar_bg_color;
					
				}
				else{
					/*uni.setNavigationBarColor({
						backgroundColor:cb_params.wxa_shop_nav_bg_color,
						frontColor:cb_params.wxa_shop_nav_font_color,
					})*/
					
					console.log('cb_params==>',cb_params.wxa_shop_nav_font_color);
					
					that.frontColor = cb_params.wxa_shop_nav_font_color;
					that.btn_bg_color = cb_params.wxa_shop_nav_bg_color;
				}
				
				
				
			});
			
			var date = util.formatTime(new Date());
			var time = util.formatTime2(new Date());
			// 再通过setData更改Page()里面的data，动态更新页面的数据
			that.date = date
			that.time = time
			
			showView: (options.showView == "true" ? true : false)
			
			that.orderid = options.orderid;
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
			
			if(options.user_coupon_dikou){
				that.user_coupon_dikou = options.user_coupon_dikou;
				
				console.log('that.user_coupon_dikou====>>>>>', that.user_coupon_dikou);
			}
			
			//是否是充值订单
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
				data: {
					sellerid: that.abotapi.get_sellerid(),
					appid: that.abotapi.globalData.xiaochengxu_appid
				},
				success: function(res) {
					console.log("res111", res);
					var code = res.data.code;
					if (code == 1) {
						var type_list = res.data.data;


						var show_weixin_pay = 0;
						var show_ali_pay = 0;
						var show_zhuanzhang_pay = 0;
						
						for (var i = 0; i < type_list.length; i++) {
							if (type_list[i].payment_type == 3) {
								show_weixin_pay = 1;
							}
							else if (type_list[i].payment_type == 2) {
								show_ali_pay = 1;
							}
							else if (type_list[i].payment_type == 6) {
								show_zhuanzhang_pay = 1;
							}
						}
						
						// #ifdef MP-WEIXIN
							show_ali_pay = 0;
						// #endif
						
						// #ifdef MP-ALIPAY
							show_weixin_pay = 0;
							show_ali_pay = 1;
						// #endif

						that.type_list = type_list;
						
						that.show_weixin_pay = show_weixin_pay;
						that.show_ali_pay = show_ali_pay;
						that.show_zhuanzhang_pay = show_zhuanzhang_pay;
						
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
			//切换支付方式
			radioChange: function(e) {
				
				console.log('radioChange change-->e', e);
				
				// wx_pay	微信支付
				// ali_pay	支付宝支付
				// zz_pay	转账支付
				
				var that = this;
				
				that.current_payment_type = e.detail.value;
				
				if (that.current_payment_type == 'zz_pay') {
					//如果是 转账支付   ，那么肯定不是 微信 或者  支付宝 的在线支付方式
					that.is_online_pay = false
				} 
				else {
					that.is_online_pay = true;
					that.payView = true;
				}
				
				
				console.log('ppppp 切换支付方式：',that.current_payment_type);
				
				
				console.log('that.zhuanzhang_pay_list ====>>>>> ', that.zhuanzhang_pay_list);
				
				
				if ((that.current_payment_type == 'zz_pay') && (that.zhuanzhang_pay_list == '') ) {
				//if ((pay_list == '') ) {
					that.abotapi.abotRequest({
						url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=offlinepay_get',
						method: 'post',
						data: {
							sellerid: that.abotapi.get_sellerid()
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: function(res) {

							var code = res.data.code;
							console.log('888888==',code);
							if (code == 1) {
								that.zhuanzhang_pay_list = res.data.data;
								console.log('get  zhuanzhang_pay_list from server ===>>>>', that.zhuanzhang_pay_list);
							} 
							else {
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
				
				var post_data = {orderid: that.orderid,						
						sellerid: that.abotapi.get_sellerid(),};
				
				if(userInfo){
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				}
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopApp&a=order_xiangqing',
					method: 'post',
					data: post_data,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						console.log("1122334", res);

						var code = res.data.code;
						if (code == 1) {
							that.orderData = res.data.orderinfo;

							that.pay_price = parseFloat(that.orderData.order_total_price);
							
							// 1、优惠券已经绑定了（如果有优惠券），所以优先扣优惠券的
							if(that.user_coupon_dikou > 0){
								that.pay_price = that.pay_price - that.user_coupon_dikou;
							}

							// 2、优先使用赠款抵扣
							if (that.balance_zengsong_dikou < that.pay_price) {
								that.pay_price = that.pay_price - that.balance_zengsong_dikou;
							} else {
								that.pay_price = 0
							}

							// 3、其次使用余额抵扣
							if (that.balance_dikou < that.pay_price) {
								that.pay_price = that.pay_price - that.balance_dikou;
							} else {
								that.pay_price = 0
							}


							that.pay_price = util.sprintf("%6.2f", that.pay_price);

							if (that.pay_price == 0.00) {
								that.is_online_pay = false
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
				
				var current_zz_pay_list = that.zhuanzhang_pay_list;
				that.zhuanzhang_pay_item = current_zz_pay_list[key];
				
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
				

				var data_params = {
					orderid: that.orderid,
					payment_type: 6,
					
					sellerid: that.abotapi.get_sellerid(),
					money: that.pay_price,
					user_coupon_dikou:that.user_coupon_dikou,
					yue_amount: that.balance_dikou,
					zengkuan_amount: that.balance_zengsong_dikou,
					
					// offlinepayid: that.zhuanzhang_pay_item.offlinepayid,
					
					time: that.date + ' ' + that.time,
					
					// huikuan_pingtai: that.adds.huikuan_pingtai,
					// name: that.adds.name,
					body: "商城支付订单",
					subject: "商城支付订单",
				}
				
				//如果用户登录
				var userInfo = that.abotapi.get_user_info();
				if(userInfo){
					data_params.userid = userInfo.userid;
					data_params.checkstr = userInfo.checkstr;
				}


				if (that.pay_price != 0.00) {
					data_params.offlinepayid = that.zhuanzhang_pay_item.offlinepayid;
					
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
							uni.showModal({
								title:'支付失败',
								showCancel:false,
								content:"支付失败："+res.data.msg,
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
				
				
				//如果没有选择，提示选择支付方式
				if(!that.current_payment_type){
					uni.showToast({
						title:'请选择支付方式',
						duration:2000
					});
					
					return;
				}
				
				
				
				
				var payment_provider = 'wxpay';
				
				var post_data = {
						// productid: that.productid,
						orderid: that.orderid,
						payment_type: 3,						//支付类型，将来作为函数参数传入。3代表微信支付   2 代表支付宝支付
						
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
				
				var userInfo = that.abotapi.get_user_info();
				
				if(userInfo){
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				}
				
				if(that.current_payment_type == 'ali_pay'){
					//payment_provider = 'alipay';
					post_data.payment_type = 2;
				}
				
				
				// #ifdef APP-PLUS
					post_data.trade_type = 'APP';
					
					if(that.abotapi.globalData.weixin_open_platform_appid){
						post_data.appid = that.abotapi.globalData.weixin_open_platform_appid;
					}
					
					if(post_data.payment_type == 3){
						payment_provider = 'wxpay';
					}
					else if(post_data.payment_type == 2){
						payment_provider = 'alipay';
					}
				// #endif
				
				// #ifdef MP-WEIXIN
					post_data.trade_type = 'JSAPI_WXA';
					post_data.appid = that.abotapi.globalData.xiaochengxu_appid;
					post_data.openid = that.abotapi.get_current_openid();
					post_data.client = 'wxa';
					
					payment_provider = 'wxpay';
				// #endif
				
				//如果在支付宝小程序中
				// #ifdef MP-ALIPAY
					payment_provider = 'alipay';
					
					post_data.trade_type = 'MP_ALIPAY';
					
					post_data.alipay_mini_prog_appid = that.abotapi.globalData.alipay_mini_prog_appid;
					post_data.alipay_third_appid = that.abotapi.globalData.alipay_third_appid;
					post_data.alipay_user_pid = that.abotapi.globalData.alipay_user_pid;
					
					if(!that.abotapi.globalData.current_alipay_user_id){
						that.abotapi.globalData.current_alipay_user_id = uni.getStorageSync('current_alipay_user_id');
					}
					if(!that.abotapi.globalData.current_alipay_user_id){
						uni.showModal({
							title:'错误',
							content:'请先完成支付宝授权后再支付',
							showCancel:false,
							success:function(rrr){
								
							}
						});
						
						return;
					}
					
					post_data.alipay_buyer_user_pid = that.abotapi.globalData.current_alipay_user_id;
					
					//post_data.is_mp_alipay_xianmai = 1;
					
					//门店ID，用于支付宝付款时候统计哪个门店
					post_data.xianmai_shangid = 0;
					//二维码ID，用于标记是否为扫码点餐，以及扫了哪个二维码，用于统计每个二维码被扫码的次数
					post_data.alipay_qrcode_id = 0;
					
					//post_data.openid = that.abotapi.get_current_openid();
					post_data.client = 'alipay_wxa';
					
				// #endif
				
				
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_buy',
					data: post_data,
					method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}, // 设置请求的 header
					success: function(res) {
						console.log('order_buy order_buy order_buy====>>>>>>>', res);

						if (res.data.code != 1) {
							uni.showModal({
								title:'支付失败',
								showCancel:false,
								content:"发起支付申请失败："+res.data.msg,
							});

							return;
						}

						if (res.data.str && (res.data.str == 'yue')) {
							//使用余额或者其他优惠，总之不需要再支付了
							uni.showModal({
								title:'提示',
								content:'订单不需要支付，已经自动确认',
								showCancel:false,
								success:function(rrr){
									that.__goto_pay_success_url();
								}
							});
							

							return;
						}

						//用于支付的参数
						var payment_parameter = null;

						//通过微信支付
						if (post_data.payment_type == 3)  {
							if(!res.data.wxpay_params){
								uni.showModal({
									title:'支付失败',
									showCancel:false,
									content:"没有微信支付的参数",
								});
								
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
									showCancel:false,
								})
							
							
								return;
							}
							
							
							payment_parameter = JSON.parse(payment_parameter_str);
							
							console.log('准备调用 uni.requestPayment====>>>>>payment_parameter===>>>', payment_parameter);
							
							
						}
						else  if (post_data.payment_type == 2){
							//支付宝支付
							//  https://uniapp.dcloud.io/api/plugins/payment?id=orderinfo
							// 支付宝小程序的 orderInfo(支付宝的规范为 tradeNO) 为 String 类型，表示支付宝交易号。
							if(post_data.trade_type == 'MP_ALIPAY'){
								payment_parameter = res.data.tradeNO;
							}
							else{
								payment_parameter = res.data.str;
							}
							
						}
						

						
						
						var uni_pay_params = {
							provider: payment_provider,
							
							success: function(res) {
								uni.showModal({
									title:'提示',
									content:'支付完成，即将跳转确认',
									showCancel:false,
									success:function(rrr){
										that.__goto_pay_success_url();
									}
								});

							},
							fail: function(res) {
								console.log('uni.requestPayment====>>>>>fail====>>>>', res);
								
								var msg001 = '支付失败';
								if(res && res.errMsg){
									if(res.errMsg.indexOf('canceled') > 0){
										msg001 = '支付已经取消';
									}
									else{
										msg001 += '，';
										msg001 += res.errMsg;
									}
								}
								
								uni.showModal({
									title: '提示',
									content: msg001,
									showCancel:false,
								})
								
							}
						};
						
						//手机APP
						// #ifdef APP-PLUS
						if (post_data.payment_type == 3){
							//微信支付
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
						}
						else if (post_data.payment_type == 2){
							//支付宝支付
							uni_pay_params.orderInfo = payment_parameter;
						}
						
						// #endif
						
						//微信小程序
						// #ifdef MP-WEIXIN
							uni_pay_params.timeStamp = payment_parameter.timeStamp;
							uni_pay_params.nonceStr = payment_parameter.nonceStr;
							uni_pay_params.package = payment_parameter.package;
							uni_pay_params.signType = payment_parameter.signType;
							uni_pay_params.paySign = payment_parameter.paySign;
						// #endif
						
						//支付宝小程序
						// #ifdef MP-ALIPAY
							uni_pay_params.orderInfo = payment_parameter;
						// #endif
						
						//appId: payment_parameter.appId,
						
						console.log('开始调用 uni.requestPayment====>>>>>支付方式===>>>', post_data.payment_type);
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
				var that = this;
				
				var paysuccess_url = uni.getStorageSync('paysuccess_url');
												
				console.log('paysuccess_url===', paysuccess_url)
				
				if (paysuccess_url && (typeof(paysuccess_url) == 'string') ){
					uni.removeStorageSync('paysuccess_url');
					
					paysuccess_url = paysuccess_url.replace('%orderid%', this.orderid);												
					
					this.abotapi.call_h5browser_or_other_goto_url(paysuccess_url);
					
					return;
				}
				
				console.log('11111111');
												
				if (this.recharge == 1) {
					console.log('2222222');
					
					
				} 
				else {
					console.log('333333333333');
					
					/*uni.navigateTo({
						//url: '../user/dingdan?currentTab=0&otype=',
						url: '/pages/user/order_list/order_list?currentTab=0&otype=',
					});*/
				}
				
				that.abotapi.call_h5browser_or_other_goto_url('/pages/pay/success/success?orderid='+that.orderid);
				
			}
		}


	}
</script>





<style lang="scss">
	.section {
		font-size: 30rpx;
		display: flex;
		padding: 20rpx 30rpx;
		border-bottom: 2rpx solid #e6e6e6;
	}

	.section_view {
		width: 160rpx;
	}
	
	.my_pay_type {
		margin-bottom:20rpx;
	}
	
	.sub_title {
		width: 94%;
		height:70rpx;
		line-height:70rpx;
		font-size: 28rpx;
		font-weight: bold;
		color:#555555;
		margin:60rpx auto 0 auto;
		border-bottom: 2rpx solid #aaaaaa;
	}

	.pay_submit{
		margin-top:50rpx;
	}
	.pay_submit button {
		display: block;
		/*position: fixed;*/
		background-color: #1AAD19;
		z-index: 100;
		text-align: center;
		width: 90%;
		margin:0 auto;
		font-size: 32rpx;
		border-top: 2rpx solid #eee;
		line-height: 100rpx;
		font-weight: 700;
		color: #fff;
	}

	.view1 {
		font-size: 28rpx;
		margin-top: 100rpx;
		color: #666;
	}

	.vw {
		font-size: 34rpx;
		margin-left: 40rpx;
		color: black;
	}

	.vw1 {
		width: 96%;
		height: 80rpx;
		border-bottom: 2rpx solid #e6e6e6;
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

	.wx_pay_submit {
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
		border-bottom: 2rpx solid #e6e6e6;
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
