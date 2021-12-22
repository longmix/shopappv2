<template>
	<view>
		
	
	 <view class="abb" :style="{background:wxa_shop_nav_bg_color}">
	        <view class="tctb" :style="{color:wxa_shop_nav_font_color}">订单编号：{{orderData.orderno}}</view>
	</view>
	
	<view class="show_modal_mask" v-if="show_zitidian_tihuoma_qrcode == true" @tap="show_zitidian_tihuoma_qrcode = false"></view>
	<view class="show_modal_pop" v-if="show_zitidian_tihuoma_qrcode == true">
		<view style="background-color: #FFFFFF;width: 500rpx;height: 500rpx;">
			<image :src="zitidian_tihuoma_qrcode" mode="widthFix" style="width: 400rpx;margin-left: 50rpx;margin-top: 50rpx;"></image>
		</view>
	</view>
	
	
	
	<view class="w100">
			
		<!-- 普通商品订单的商品列表 -->
	    <navigator v-if="waimai_order_type != 1" 
			:open-type="wxa_order_info_page_no_link_to_product == 1 ? '' : 'navigate'" 
			
			class="p_all bg_white df item" 
			v-for="(item,index) in current_order_product_list" :key="index">
				<view style="display: flex;width: 550rpx;" @tap="commodity_detail(item.productid)">
					<view class="cp_photo">
						<image :src="item.picture?item.picture:item.img"></image>
					</view>
					
					
					
					<view class="df_1">	
						<view class="font_14 mt5 ovh1">
					       {{item.name}}
					    </view>
						<view class="gm_ovh_1h pt10" style="font-size:20rpx;color: #666;">
							单价 ¥{{item.price}} x 数量 {{item.amount?item.amount:item.count}}</view>
						<view class="gm_ovh_1h pt10" style="font-weight:bold;color: #333;">
							{{item.price2?item.price2:item.price}}
						</view>
					</view>
					<view v-if=""></view>
				</view>
				<view v-if="(orderData.status_str=='订单已完成')&& (is_shop_admin != 1) && (item.is_pingjia == 0)"
					class="font_12 fl_r mr_5 btn_min mg_l" style="position: absolute;right: 20rpx;margin-top: 20rpx;"
					@click="pingjia" 
					:data-productid='item.productInfo.productid'
					:data-orderid='orderData.orderid'>立即评价</view>
					
				<view v-if="(xianmai_shang_order_remark) && (is_shop_admin != 1) && (item.is_pingjia == 1)"
					class="font_12 fl_r mr_5 btn_min mg_l" style="position: absolute;right: 20rpx;margin-top: 20rpx;"
					@click="go_to_page" 
					:data-faquanid='xianmai_shang_order_remark'
					:data-productid='item.productInfo.productid'>查看评价</view>
	    </navigator>
		
		<!-- 外卖订单的商品列表 -->
		<view v-if="waimai_order_type == 1" 
			class="p_all bg_white df item" 
			v-for="(item,index) in current_order_product_list" :key="index">
			
				<view class="cp_photo">			
					<image :src="item.picture?item.picture:item.img"></image>
				</view>
				<view class="df_1">	
					<view class="font_14 mt5 ovh1">
			           {{item.name}}
			        </view>
					<view class="gm_ovh_1h pt10" style="font-size:20rpx;color: #666;">
						单价：¥{{item.price}} x 数量：{{item.amount?item.amount:item.count}}</view>
					<view class="gm_ovh_1h pt10" style="font-weight:bold;color: #333;">
						{{item.price_total?item.price_total:item.price}}</view>
				</view>
		</view>
		
		
		<!-- 收货地址 -->
			<view class="p_all bg_white mt10 font_14" v-if="zitidian_order.zitidian_name">
				<view class="df">
					<view class="df_1 c6">
						<view>
							<view class="l_h20" style="font-weight: bold;color: #333;">提货码：<text style="margin-left: 10rpx;font-size: 40rpx;">{{zitidian_order.tihuoma}}</text></view>
							
						</view>
						<view>
							<view class="l_h20" style="font-weight: bold;color: #333;">提货点:</view><br/>
							<image src="https://yanyubao.tseo.cn/Tpl/static/images/qrcode.png" 
								mode="widthFix" 
								style="width: 50rpx;height:50rpx;margin-top: -4rpx;margin-right: 20rpx;float: right;" 
								@tap="show_zitidian_tihuoma_qrcode = true"></image>			
							<view class="l_h20" style="font-weight: bold;color: #333;">{{zitidian_order.zitidian_name}} </view>
						</view>
						<view>
							<image class="image_mobile_new" 
								src="https://yanyubao.tseo.cn/Tpl/static/images/location_map_new.png" 
								mode="widthFix" 
								@tap="baidu_map_jump_btn"></image>			
							<view class="l_h20 mt5" style="font-size: 25rpx;" 
								@tap="baidu_map_jump_btn">{{zitidian_order.zitidian_address}}</view>
						</view>
						<view style="margin-top: 10rpx;">
							<image class="image_mobile_new" 
								src="https://yanyubao.tseo.cn/Tpl/static/images/location_mobile_new.png" 
								mode="widthFix" 
								@tap="call_mobile_new" ></image>
							<view class="l_h20">自提点电话：<text>{{zitidian_order.zitidian_phone}}</text></view>
							
						</view>
					</view>
				</view>
			</view>
			
			<view class="p_all bg_white mt10 font_14" v-if="orderData.realname && zitidian_order.zitidian_name == ''">
				<view class="df">
					<view class="df_1 c6">
					<view class="l_h20" style="font-weight: bold;color: #333;">{{orderData.realname}}    <text style="margin-left: 10rpx;">{{orderData.mobile}}</text> </view>
					<view class="l_h20 mt5" style="font-size: 25rpx;">地址：<text v-if="!wxa_order_hide_sanji_address">{{orderData.address01}}</text>{{orderData.address02}}</view>
					</view>
				</view>
			</view>
			
			
			
			
			<view class="borderb bordert font_14" v-if="is_shop_admin == 1">
				<view v-if="orderData.status == '1' || orderData.status == '2' ">
				<view class="manage_express" style="font-weight: bold;">管理员选项</view>
				
				
				<view class="unit-wrapper">
					<view class="" style="display: flex;">
						<view class="manage_express">物流公司</view>
						<input-autocomplete 
						 class="unit-item__input"
						 :value="input_autocomplete_Obj.sname" 
						 v-model="input_autocomplete_Obj.sname" 
						 placeholder="请填写物流公司"
						 highlightColor="#FF0000"
						 :stringList="autocompleteStringList" 
						 v-on:selectItem="input_autocomplete_selectItemS"></input-autocomplete>
					</view>
				</view>
				
				
				<view class="manage_express" style="display: flex;">快递单号
					<input type="text" class="express_input" 
					  placeholder="请填写快递单号"
					  :value="scan_kuaidi"
					  @input="get_courier_number"
					  style="padding-right: 70rpx;width: 330rpx;"/>
					  
					  <view class="erweima" @tap="toMyQR">
					  	<view class="icon scan_qr"></view>
					  </view>
					  
					</view>
					<view @tap="deliver_goods()" class="button_fahuo" >发货</view>
					
				</view>
				<view v-if="orderData.status == '0' || orderData.status == '3' || orderData.status == '4' || orderData.status == '5' ">
				<view class="manage_express" style="margin-bottom: 0;">管理员选项</view>
				<view class="order_item_desc_name" style="margin-left: 20rpx;">快递公司
					<view class="order_item_desc_value" style="margin-right: 20rpx;" v-if="orderData.delivery_company != null">{{orderData.delivery_company}}</view>
				</view>
				<view class="order_item_desc_name" style="margin-left: 20rpx;">快递单号
					<view class="order_item_desc_value" style="margin-right: 20rpx;" v-if="orderData.delivery_no != null">
					<view class="fuzhi" @click="Clipboard_text(orderData.delivery_no)" style="">复制</view>
					{{orderData.delivery_no}}</view>
				</view>
				</view>
			</view>
			
			<view class="show_modal_mask" v-if="show_agree_refund_model == true" @tap="show_agree_refund_model = false"></view>
			<view class="show_modal_pop" v-if="show_agree_refund_model == true">
				<view style="width: 600rpx;background-color: #FFFFFF;padding-bottom: 20rpx;">
					<view class="" style="text-align: center;">退款说明</view>
					<view style="margin-left: 10rpx;">退款理由
						<textarea
							placeholder-style="color:#A9A9A9"
							maxlength="70"
							placeholder="退款理由" 
							style="border: 1rpx solid #999999;width: 500rpx;margin: 20rpx 50rpx;"
							@input="tuikuan_reason"/>
					</view>
					<view style="margin-left: 10rpx;">退货物流信息
						<textarea
							placeholder-style="color:#A9A9A9"
							maxlength="70"
							placeholder="快递信息" 
							style="border: 1rpx solid #999999;width: 500rpx;margin: 20rpx 50rpx;"
							@input="express_information"/>
					</view>
					<button style="margin: 20rpx;" type="primary" @tap="queren_return_goods">确认退货</button>
				</view>
			</view>
			
			
			
		<!-- 功能按钮 -->
		
			<view style="overflow: hidden;margin-right: 3%;">
				<view class="font_12 btn_min fl_r mr_5 mg_l" @tap="refundOrder" 
					v-if="(wxa_order_hide_daishouhuo_refund != 1) && (orderData.status == 1) && (is_shop_admin != 1)" 
					:data-orderid="orderData.orderid">
					申请退款
				</view>
				
				<navigator v-if="orderData.status_str=='待付款'" 
					:url="'../../pay/payment/payment?orderid=' + orderData.orderid + '&balance_zengsong_dikou=' + orderData.coupon_price + '&balance_dikou=' + orderData.yue_price" 
					class="font_12 fl_r mr_5 btn_min mg_l">立即支付</navigator>
					
				<view v-if="orderData.status_str=='待付款'"
					@tap="cancelOrder" :data-orderid="orderData.orderid"
					class="font_12 fl_r mr_5 btn_min mg_l"
					style="background-color: #999;">取消订单</view>
				
				
				<view class="font_12 btn_min fl_r mr_5 mg_l" @tap="refundOrder" 
					v-if="(is_shop_admin != 1) && (wxa_order_hide_daishouhuo_refund_after != 1) && ((orderData.status == 2) || (orderData.status == 3)  || (orderData.status == 4)) " 
					:data-orderid="orderData.orderid">申请退款</view>
				<view v-if="(orderData.status_str=='已发货待收货' ) && (is_shop_admin != 1) " 
					@click="recOrder" 
					:data-orderid="orderData.orderid" 
					class="font_12 fl_r mr_5 btn_min mg_l">确认收货</view>
				
				<view v-if="orderData.status_str=='待收货' && xianmai_shang_order_remark == ''" 
					class="font_12 fl_r mr_5 btn_min mg_l" 
					@click="pingjia" 
					:data-orderid='orderData.orderid' 
					:data-xianmaishangid='orderData.order_option.hahading_order_xianmai_shangid'
					>立即评价</view>
				<view v-if="orderData.status_str=='待收货' && xianmai_shang_order_remark" 
					class="font_12 fl_r mr_5 btn_min mg_l" 
					@click="go_to_page" 
					:data-faquanid='xianmai_shang_order_remark'>查看评价</view>
				
				
				<view v-if="(orderData.status_str=='订单已完成')" 
					class="font_12 fl_r mr_5 btn_min mg_l" 
					style="background-color: #E3170D;"
					@click="cancelOrder" :data-orderid='orderData.orderid' 
					:data-action-type='1'>删除订单</view>
				<view v-if="(orderData.status_str=='订单已完成') && (xianmai_shang_order_remark == '') && (is_shop_admin != 1) && (waimai_order_type == 1)" 
					class="font_12 fl_r mr_5 btn_min mg_l" 
					@click="pingjia" 
					:data-orderid='orderData.orderid' 
					:data-xianmaishangid='orderData.order_option.hahading_order_xianmai_shangid'>立即评价</view>
				<view v-if="(xianmai_shang_order_remark) && (is_shop_admin != 1) && (waimai_order_type == 1)" 
					class="font_12 fl_r mr_5 btn_min mg_l" 
					@click="go_to_page" 
					:data-faquanid='xianmai_shang_order_remark'>查看评价</view>
					
					
					<view v-if="(orderData.status_str=='已申请退款') 
						&& (orderData.tuikuan_list) && (orderData.tuikuan_list[0].statusname == '同意退货')"
						@tap="agree_refund_order" :data-orderid="orderData.orderid"
						class="font_12 fl_r mr_5 btn_min mg_l"
						style="background-color: #999;">退换货处理</view>
			</view>
			
			
		<!-- 商家订单 -->	
			
			<view class="p_all bg_white mt10 c6 l_h20  font_14">
				<view v-if="waimai_order_type == 1">
					<view class="order_item_desc_name">订单类型<view class="order_item_desc_value">商家订单</view></view>
				</view>
				
				<view v-if="order_xianmai_shangdata.name">
					<view class="order_item_desc_name">商家名称<view class="order_item_desc_value">{{order_xianmai_shangdata.name}}</view></view>
				</view>
				
				<view v-if="orderData && orderData.order_option 
					&& orderData.order_option.xianmai_order_peisong_type 
					&& (orderData.order_option.xianmai_order_peisong_type == 'snatch_order')">					<view class="order_item_desc_name">配送状态
						<view class="order_item_desc_value">
							{{orderData.order_option.xianmai_order_peisong_status_str}}
						</view>
					</view>
					
					<view class="order_item_desc_name"
						v-if="(orderData.order_option.xianmai_order_peisong_status == 1) 
							|| (orderData.order_option.xianmai_order_peisong_status == 2) 
							|| (orderData.order_option.xianmai_order_peisong_status == 6)">
						<view class="order_item_desc_value">
							<navigator :url="'/pages/shopMap/shopMap?address=' + orderData.order_option.xianmai_order_peisongyuan_location.address + 
							'&latitude=' + orderData.order_option.xianmai_order_peisongyuan_location.latitude + 
							'&longitude=' + orderData.order_option.xianmai_order_peisongyuan_location.longitude + 
							'&name=' + orderData.order_option.xianmai_order_peisongyuan_location.snatch_name +
							 '&telephone=' + orderData.order_option.xianmai_order_peisongyuan_location.mobile">
								点击查看骑手位置
							</navigator>
						</view>
					</view>				</view>
				
				<view v-if="orderData && orderData.order_option &&orderData.order_option.xianmai_order_peisong_status == 3">
					<view class="order_item_desc_name" style="height: 50rpx;" @tap="queren_shouhuo()"> 
						<view class="order_item_desc_value" 
							style="margin-top: 35rpx;border-radius: 10rpx;background-color: #1AAD19;padding: 8rpx;color: #fff;">
								确认收货
						</view>
					</view>
					<view style="font-size: 26rpx;">{{orderData.order_option.xianmai_order_peisong_003}}自动收货</view>
				</view>
				
				
		<!-- 普通订单状态 -->		
				
				<view class="bordert">
					
				</view>
				<view>
					<view class="order_item_desc_name">订单编号
						<view class="fuzhi" @click="Clipboard_text(orderData.orderno)" style="">复制</view>
						<view class="order_item_desc_value">{{orderData.orderno}}</view>
					</view>
				</view>
				 
				<view>
					<view class="order_item_desc_name">订单状态<view class="order_item_desc_value">{{orderData.status_str}}</view></view>
				</view>
				
				<view>
					<view class="order_item_desc_name">
						订单时间<view class="order_item_desc_value">{{orderData.createtime}}</view>
					</view>  
				</view>
				
	
				<view v-if="orderData.buyer_memo">
					<view class="order_item_desc_name">
						留言备注：
						<view class="order_item_desc_value" style="font-size:24rpx; color:#666;">{{orderData.buyer_memo?orderData.buyer_memo:''}}</view>
					</view>
				</view> 
	
		<!-- 商品和物流 -->
	
	
	      <view class="bordert font_14">
	          <view class="order_item_desc_name">商品数量<view class="order_item_desc_value">x {{orderData.total_num}}</view></view>
	          <view class="order_item_desc_name">商品金额<view class="order_item_desc_value">￥{{orderData.price}}</view></view>
	          
	      </view>
	
	      <view class="bordert font_14">
	          <view class="order_item_desc_name">快递费<view class="order_item_desc_value">￥{{orderData.price3}}</view></view>
			  <view v-if="orderData.delivery_company">物流公司<view class="order_item_desc_value">{{orderData.delivery_company}}</view></view>
			  <view v-if="orderData.delivery_no">
				  物流编号
				  <view class="fuzhi" @click="Clipboard_text(orderData.delivery_no)" style="">复制</view>
				  <view class="order_item_desc_value">{{orderData.delivery_no}}</view>
				  
		      </view>
	      </view>
	    
		<!-- 订单金额 -->
		
		  <view class="bordert font_14">
	          <view class="order_item_desc_name">订单金额<view class="order_item_desc_value">￥{{orderData.order_total_price}}</view></view>
			  
			  <view v-if="orderData.user_coupon_dikou">优惠券抵扣<view class="order_item_desc_value">￥{{orderData.user_coupon_dikou}}</view></view>
			  
	          <view class="order_item_desc_name">余额支付<view class="order_item_desc_value">￥{{orderData.yue_price}}</view></view>
	          <view class="order_item_desc_name">赠款支付<view class="order_item_desc_value">￥{{orderData.coupon_price}}</view></view>   
	      </view>
	
	      <view class="borderb bordert font_14">
	          <view v-if='orderData.pay_price' class="order_item_desc_name">实际支付<view class="order_item_desc_value">￥{{orderData.pay_price}}</view></view>
	          <view class="order_item_desc_name">支付方式<view class="order_item_desc_value">{{orderData.payment_name}}</view></view>
	        </view>
			  </view>
	
	
	
	        
	
		<view class="p_all mt10">
			<view class="btnGreen">
				        <!-- <button type="warn" class="button_warn" size="{{warnSize}}" loading="{{loading}}" plain="{{plain}}"
	        :disabled="disabled" @tap="warn"> 确认 </button> -->
	        		<!--<contact-button type="default-light" session-from="orderNo_{{orderData.OrderNo}}">
			        客服
			        </contact-button>-->
			</view>
		</view>
	</view>
	</view>
</template>


<script>
	import inputAutocomplete from '@/components/input-autocomplete/input-autocomplete.vue';
	// pages/user/dingdan.js
	//index.js  
	//获取应用实例  
	
	// import app from '@/common/common.js';
		
		
	
		
	var apps = getApp();
	// var userInfo = this.abotapi.get_user_info();
	// var userAcountInfo = this.abotapi.get_user_account_info();
	
	
	var next_page = 1;
	export default {
		components: {
		        inputAutocomplete
		},
		data() {
			return {
				isHideLoadMore:false,
				winWidth: 0,  
				winHeight: 0,  
				Height:'',
				// tab切换  
				currentTab: 0,  
				isStatus:1,//0全部,1待付款，2待发货，6待收货 7已完成
				page:1,
				refundpage:0,
				current_order_product_list:[],
			
				orderData:{
					orderno:'',
					realname:'',
					mobile:'',
					status_str:'',
					createtime:'',
					buyer_memo:'', 
					total_num:'',
					price:'',
					price3:'',
					delivery_company:'',
					delivery_company:'', 
					delivery_no:'',
					order_total_price:'',
					yue_price:'',
					coupon_price:'',
					pay_price:'',
					payment_name:'',
				},
				wxa_shop_nav_bg_color:'',
				
				//两个退款按钮
				wxa_order_hide_daishouhuo_refund_after:0,
				wxa_order_hide_daishouhuo_refund:0,
				
				orderno:'',
				waimai_order_type:0,
				order_xianmai_shangdata:'', //商家信息
				
				
				xianmai_shang_order_remark:'',//订单是否评价过
				
				current_orderid:0,
				
				//2021.8.18. 管理员订单
				is_shop_admin:0,
	
	
	
				//2021.10.29发货
				courier_number_value:'',
				express_company_value:'',
				express_company_list:'',
				
			
			
				scan_kuaidi:'',
				
				input_autocomplete_Obj: {
					sname: '',
					dname: '动态',
				},
				autocompleteStringList: ['EMS','京东快递','顺丰速运','申通快递','中通快递','圆通快递','韵达快递'],
				/* express_company:[
					'EMS','京东快递','顺丰速运','申通快递','中通快递','圆通快递','韵达快递'
				],
				 */
				
				current_option:null,
				
				
				
				zitidian_order:{
					latitude:'',
					longitude:'',
					tihuoma:'',
					zitidian_address:'',
					zitidian_name:'',
					zitidian_telephone:'',
				},
				zitidian_tihuoma_qrcode:'',
				show_zitidian_tihuoma_qrcode:false,
				
				
				orderProduct_productinfo_productid:0,
				
				show_agree_refund_model:false,
				tuikuan_reason_list:'',
				express_information_list:'',
				tuikuanid:0,
			}
		},
		
		
		
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function () {
		  uni.switchTab({      
		    url: '/pages/userInfo/userInfo',
		  })
		},
		onLoad: function(options) {
			var that = this;
			
			that.current_option = options;
			
			
			var userInfo = that.abotapi.get_user_info();
			if(!userInfo || !userInfo.userid){
				uni.showModal({
					title:'错误提示',
					content:'请登陆后再操作',
					showCancel:false,
					success: (res) => {
						that.abotapi.call_h5browser_or_other_goto_url('/pages/index/index');
					}
				})
				return;
			}
			
			
			that.abotapi.set_option_list_str(this, this.callback_set_option);
			
			this.current_orderid = options.orderid;
			this.balance_zengsong_dikou = options.balance_zengsong_dikou;
			this.balance_dikou = options.balance_dikou;
			
		
			if(options.is_shop_admin == 1){
				this.is_shop_admin = 1;
			}
			
			
			this.loadProductDetail();
		}, 
		onShow: function () {
			var that = this;
			var userInfo = that.abotapi.get_user_info();
			// var userAcountInfo = this.abotapi.get_user_account_info();
			// this.loadOrderList();
		},
		
		methods:{
			input_autocomplete_selectItemS(data) {
				console.log('收到数据了:', data);
			},
			printLog(){
				console.log(this.input_autocomplete_Obj);
			},
			
			baidu_map_jump_btn:function(){
				
				var that = this;
				console.log('123456555',that.zitidian_order.latitude)
				console.log('123456555',that.zitidian_order.longitude )
				console.log('123456555',that.zitidian_order.zitidian_address)
				console.log('123456555',that.zitidian_order.zitidian_name)
				console.log('123456555',that.zitidian_order.zitidian_telephone)
				uni.navigateTo({
					url:'../../shopMap/shopMap?latitude=' + that.zitidian_order.latitude
					 + '&longitude=' + that.zitidian_order.longitude 
					 + '&address=' + that.zitidian_order.zitidian_address
					 + '&name=' + that.zitidian_order.zitidian_name
					 + '&telephone=' + that.zitidian_order.zitidian_telephone
				})
			},
			
			
			callback_set_option: function (that, option_list){
			    console.log('getShopOptionAndRefresh+++++:::', option_list)
			
			   
			    if (!option_list) {
			      return;
			    }
			
				if(option_list.wxa_order_hide_daishouhuo_refund){
					this.wxa_order_hide_daishouhuo_refund = option_list.wxa_order_hide_daishouhuo_refund;
				}
				if(option_list.wxa_order_hide_daishouhuo_refund_after){
					this.wxa_order_hide_daishouhuo_refund_after = option_list.wxa_order_hide_daishouhuo_refund_after;
				}
				
			    if (option_list.wxa_shop_nav_bg_color) {
					that.wxa_shop_nav_bg_color = option_list.wxa_shop_nav_bg_color;
			    }
			
			    if (option_list.wxa_shop_nav_font_color) {
					that.wxa_shop_nav_font_color = option_list.wxa_shop_nav_font_color;
			    }
			
					that.wxa_order_hide_sanji_address = option_list.wxa_order_hide_sanji_address;
					that.wxa_order_info_page_no_link_to_product = option_list.wxa_order_info_page_no_link_to_product;
			
			  },
			  loadProductDetail:function(){
				  var that = this;
			      var app = getApp();
			      // pages/order/detail.js
			      var userInfo = that.abotapi.get_user_info();
			  
			      var that = this;
				  
			      console.log('userid', userInfo.userid);
			      console.log('userstr', userInfo.checkstr);
				  
			      that.abotapi.abotRequest({
			        url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=order_xiangqing',
			        data: {
			          orderid: that.current_orderid,
			          userid: userInfo.userid,
			          checkstr: userInfo.checkstr,
			          sellerid: that.abotapi.get_sellerid(),
					  is_shop_admin : that.is_shop_admin
			        },
			        success: function (res) {
			          var code = res.data.code;
					  var orderData = res.data.orderinfo;
					  
			          if (code == 1) {
						  
						if(orderData.order_option && (orderData.order_option.order_xianmai_shangdata)){
							that.order_xianmai_shangdata = JSON.parse(orderData.order_option.order_xianmai_shangdata); //商家信息
						}
						console.log('888888888888888888888====>>>',orderData)
						console.log('888888888888888888888====>>>',that.order_xianmai_shangdata) 
						if(orderData.order_option && (orderData.order_option.xianmai_order_type)){
							var order_product_list = JSON.parse(orderData.order_option.hahading_order_product_list);
							
							console.log('hahading_order_product_list ===>>> order_product_list===>>>>>',order_product_list);
							
							that.orderData = orderData;
							that.current_order_product_list = order_product_list;
							that.waimai_order_type = 1;
							
						}else{
							that.orderData = orderData;
							that.current_order_product_list = orderData.orderProduct;
						}
						 
						if(orderData.order_option && (orderData.order_option.xianmai_shang_order_remark)){
							that.xianmai_shang_order_remark = orderData.order_option.xianmai_shang_order_remark;
						}
						
						
						if(orderData.orderProduct && (orderData.orderProduct[0].productInfo)){
							that.orderProduct_productinfo_productid = orderData.orderProduct[0].productInfo;
						}
						
						console.log('current_order_product_list ====>>>>>', that.current_order_product_list);
						
							
						if(orderData.order_option &&(orderData.order_option.zitidian_order)){
							that.zitidian_order = JSON.parse(orderData.order_option.zitidian_order);
							that.zitidian_tihuoma_qrcode = orderData.order_option.zitidian_tihuoma_qrcode;
						}
						
						if((orderData.tuikuan_list) && (orderData.tuikuan_list[0].tuikuanid)){
							that.tuikuanid = orderData.tuikuan_list[0].tuikuanid;
						}
						
						
						console.log('zitidian_order',that.zitidian_order)
						} else {
						uni.showToast({
							title: res.data.msg,
							duration: 2000
						});
						}
					},
					fail: function () {
						// fail
					  wx.showToast({
						title: '网络异常！',
						duration: 2000
					  });
					}
				  });
			    },
				
				
				get_courier_number:function(e){
					
					this.courier_number_value = e.detail.value;
					console.log('courier_number_value======>',this.courier_number_value)
				},
			
				deliver_goods:function(){
					var that = this;
					
					var userInfo = this.abotapi.get_user_info();
					if ((!userInfo) || (!userInfo.userid)) {
						uni.redirectTo({
							url: '/pages/login/login',
						})
						return;
					};
					
					var post_data = {
						sellerid: that.abotapi.globalData.default_sellerid,
						userid: userInfo.userid,
						checkstr : userInfo.checkstr,
						status : that.orderData.status,
						delivery_company : that.input_autocomplete_Obj.sname,
						delivery_no : that.courier_number_value,
						orderid: that.current_orderid,
					};
					
					
					
					that.abotapi.abotRequest({
						url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=order_admin_fahuo',
						data: post_data,
						success: function (res) {
							
							if(res.data.code != 1){
								return;
							}
							uni.showModal({
								title: '提示',
								content: '发货成功！',
								
							});
							
							that.loadProductDetail();
							
						},
						fail: function (e) {
							uni.showToast({
								title: '网络异常！',
								duration: 2000
							});
						},
					});
					
					
					
				},
				
				toMyQR() {
				
					var that = this;
				
					var userInfo = this.abotapi.get_user_info();
					if ((!userInfo) || (!userInfo.userid)) {
						uni.redirectTo({
							url: '/pages/login/login',
						})
						return;
					};
				
					uni.scanCode({
						success: function(res) {
							console.log('res1111111111111111111111111111111111===>>>>>>>>', res);
							console.log('条码类型：' + res.scanType);
							console.log('条码内容：' + res.result);
							
							if(res.scanType == 'QR_CODE'){
								return;
							}
							
							var result = res.result;
							that.scan_kuaidi = result;
							that.courier_number_value = that.scan_kuaidi;
							
							console.log('5555555555555555555555',that.scan_kuaidi)
						}
					});
				
				
				},
				
				
				//评价完成 之后点击完成按钮跳转发圈页面
				go_to_page:function(e){
					console.log('ccccccccccccccccccccccccccc',e);
					var faquanid = e.currentTarget.dataset.faquanid;
					
					uni.navigateTo({
						url: '/cms/discover/discover?faquanid=' + faquanid +'&xianmai_shangid=' + this.orderData.order_option.hahading_order_xianmai_shangid,
						
					})
					if(this.waimai_order_type == 0){
						uni.navigateTo({
							url: '/cms/discover/discover?faquanid=' + faquanid + '&productid=' + this.orderProduct_productinfo_productid.productid,
							
						})
					}
					
					
					//#ifdef MP-WEIXIN
					uni.switchTab({
						url: '/cms/discover/discover',
					})
					//#endif
					
				},
				
				
				//退换货弹窗信息
				agree_refund_order:function(){
					var that = this;
					that.show_agree_refund_model = true;
				},
				//退款理由
				tuikuan_reason:function(e){
					var that = this;
					that.tuikuan_reason_list = e.detail.value;
				},
				//快递信息
				express_information:function(e){
					var that = this;
					that.express_information_list = e.detail.value;
				},
				//退货信息确认
				queren_return_goods:function(){
					var that = this;
					var userInfo = that.abotapi.get_user_info();
					var post_data = {
						tuikuanid: that.tuikuanid,
						memo01: that.tuikuan_reason_list,
						memo03: that.express_information_list,
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
					};
					
					that.abotapi.abotRequest({
					    url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=order_tuikuan_add_info',
					 
					    data: post_data,
					    success: function (res) {
							if(res.data.code == 1){
								uni.showToast({
									title:'退款成功！',
									duration: 2000,
								});
								that.show_agree_refund_model = false;
								
							}
					
					    },
					    fail: function (e) {
							uni.showToast({
								title: '网络异常！',
								duration: 2000
							});
					    },
					});
					
					
					
					
				},
				
				
				//复制剪切板
				Clipboard_text:function(text){
					
					uni.setClipboardData({
					    data: text,
					    success: function () {
					        uni.showToast({
					        	title:'复制成功',
					        })
					    },
						fail:function(){
							uni.showToast({
								title:'复制失败',
							})
						}
					});
				},
				commodity_detail:function(productid){
					uni.navigateTo({
						url:'../../product/detail?productid=' + productid,
					})
				},
				//立即评价
				
				pingjia:function(e){
					var that = this;
					console.log('eeeeeeeeeeeee',e);
					var orderid = e.currentTarget.dataset.orderid;
					var xianmaishangid = e.currentTarget.dataset.xianmaishangid;
					var productid = e.currentTarget.dataset.productid;
					uni.showActionSheet({
					    itemList: ['照片', '视频'],
					    success(res) {
					        console.log(res.tapIndex)
					        if ((res.tapIndex == 0)) {
								var new_url = '../../../cms/publish/publish?publishtype=image&orderid=' + orderid + '&xianmai_shangid=' + xianmaishangid;
								
								if(that.waimai_order_type == 0){
									var new_url = '../../../cms/publish/publish?publishtype=image&orderid=' + orderid + '&productid=' + productid;
								}
								
								console.log('跳转商品评价',new_url)
								uni.navigateTo({
									url: new_url
								})
							  
							  
					        } else {
								var new_url = '../../../cms/publish/publish?publishtype=video&orderid=' + orderid + '&xianmai_shangid=' + xianmaishangid;
								if(productid){
									new_url += '&productid=' + productid;
								}
								console.log('跳转商品评价',new_url)
								uni.navigateTo({
									url: new_url
								})
					        }
					    },
					    fail(res) {
							console.log(res.errMsg)
						}
					})
					
				},
				
				
				//申请退款
				refundOrder: function (e) {
					var that = this;
					var orderid = e.currentTarget.dataset.orderid;
					uni.showModal({
						title: '提示',
						content: '你确定要申请退款吗？',
						success: function (res) {
							
							var userInfo = that.abotapi.get_user_info();
							res.confirm && uni.request({
								url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=order_tuikuan_direct',
								method: 'post',
								data: {
									orderid: orderid,
									sellerid: that.abotapi.get_sellerid(),
									checkstr: userInfo.checkstr,
									userid: userInfo.userid
								},
								header: {
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								success: function (res) {
									//--init data
									console.log('reszz',res);
									var code = res.data.code;
									if (code == 1) {
										uni.showModal({
											title:'提示',
											content:res.data.msg,
											showCancel:false,
											success() {
												uni.redirectTo({
													url:'/pages/user/order_list/order_list'
												})
											}
										})
										
										
										
									} 
									else {
										uni.showModal({
											title: '提示',
											content: res.data.msg,
											showCancel: false,
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
				  //确认收货
				recOrder:function(e){
					
				    var that = this;
				    var orderid = e.currentTarget.dataset.orderid;
					var userInfo = that.abotapi.get_user_info();
				    uni.showModal({
				      title: '提示',
				      content: '你确定已收到宝贝吗？',
				      success: function(res) {
				        res.confirm && that.abotapi.abotRequest({
				          url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=order_finish',
				          method:'post',
				          data: {
				            orderid: orderid,
				            sellerid: that.abotapi.get_sellerid(),
				            checkstr: userInfo.checkstr,
				            userid: userInfo.userid
				          },
				          header: {
				            'Content-Type':  'application/x-www-form-urlencoded'
				          },
				          success: function (res) {
				            //--init data
				            var code = res.data.code;
				            if (code == 1){
								
				              uni.showToast({
				                title: '操作成功！',
				                duration: 2000
				              });
							  
				              that.loadProductDetail();
							  
				            }else{
				              uni.showToast({
				                title: res.data.msg,
				                duration: 2000
				              });
				            }
				          },
				          fail: function () {
				            // fail
				            wx.showToast({
				              title: '网络异常！',
				              duration: 2000
				            });
				          }
				        });
				
				      }
				    });
				},
				//申请退款
				cancelOrder: function (e) {
					var that = this;
					var orderid = e.currentTarget.dataset.orderid;
					
					var action_type = 0;
					if(e.currentTarget.dataset.actionType){
						action_type = 1;
					}
					
					
					uni.showModal({
						title: '提示',
						content: '你确定要取消此订单吗？',
						success: function (res) {
							
							var userInfo = that.abotapi.get_user_info();
							
							res.confirm && uni.request({
								url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=order_cancel',
								method: 'post',
								data: {									
									sellerid: that.abotapi.get_sellerid(),
									checkstr: userInfo.checkstr,
									userid: userInfo.userid,
									orderid: orderid,
									action_type:action_type
								},
								header: {
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								success: function (res) {
									//--init data
									console.log('reszz',res);
									var code = res.data.code;
									if (code == 1) {
										uni.showModal({
											title:'提示',
											content:res.data.msg,
											showCancel:false,
											success() {
												uni.redirectTo({
													url:'/pages/user/order_list/order_list'
												})
											}
										})
										
										
									} else {
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
				
				call_mobile_new:function(){
					var that = this;
					
					that.abotapi.call_h5browser_or_other_goto_url('tel:'+that.zitidian_order.zitidian_phone);
				},
				//确认收货
				queren_shouhuo:function(){
					
					
					
					var that = this;
					
					var userInfo = that.abotapi.get_user_info();
					
					that.abotapi.abotRequest({
					  url: that.abotapi.globalData.yanyubao_server_url + '/openapi/SnatchOrdersysData/buyer_set_status_as_finish',
					  data: {
					    checkstr: userInfo.checkstr,
					    sellerid: that.abotapi.get_sellerid(),
						yanyubao_orderid: that.current_orderid,
						userid:userInfo.userid,
					  },
					  success: function (res) {
						if(res.data.code == 1){
							uni.showModal({
								title:'提示',
								content:res.data.msg,
								showCancel:false,
								success() {
									uni.redirectTo({
										url:'/pages/user/order_list/order_list'
									})
								}
							})
						}else{
							uni.showToast({
								title: res.data.msg,
								duration: 2000
							});
						}

					  },
					  fail: function () {}
					});
					
				}
				
		}
		
	}
	
	
	
	
</script>


<style>
	/*浮动*/
	.order_item_desc_name {
		font-size:28rpx;
		height: 30px;
		line-height: 30px;
	}
	
	.order_item_desc_value {
		float: right;
		font-size:28rpx;
		font-weight: 600;
	}
	
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
	.mt10{
	  margin-top: 10rpx;
	  color:#333;
	}
	.btn_min{
	  background-color: #1AAD19;
	  border-radius: 5px;
	  padding-left: 28rpx;
	  padding-right: 28rpx;
	  line-height: 2.3;
	  color: #FFFFFF;
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
	    font-size: 25rpx;
	    color: #666;
	} 
	.h10_hui{
	    height: 10px;
	    width: 100%;
	    background: #eee;
	}
	
	.min_60{
	    min-height: 60px;
	}
	
	.w100{ 
	  width: 100%;
	  color:#333;
	  font-size:28rpx;
	}
	
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
	
	.red{
	    color: red;
	}
	
	.sl{
	  font-size: 12px;
	  color: #999;
	}
	.abb{
	    display: flex;
	    flex-direction: row;
	    align-items: center;
	    background-color: #fff;
	    overflow: hidden;
	    height: 146rpx;
	    border-bottom: 3px solid #EFEFEF;
	}
	.tctb {
	  margin-left:30rpx;
	  font-size:32rpx;
	  color:#fff;
	  border-radius:62rpx;
	  text-align:center;
	  height:57rpx;
	}
	
	.borderb{
	  border-bottom: 1px solid #f1f1f1;
	  margin-bottom: 5px;
	  padding-bottom: 7px;
	}
	.bordert{
	  border-top: 1px solid #f1f1f1;
	  margin-top: 5px;
	  padding-top: 5px;
	  display:block;
	  width:100%;
	}
	.fuzhi{
		float: right;
		margin-left: 24rpx;
		border: 1rpx solid #999999;
		padding: 0 18rpx;
		border-radius: 5px;
		font-size: 24rpx;
		height: 40rpx;
		line-height: 40rpx;
		margin-top: 5rpx;
	}
	.mg_l{
		margin-left:10rpx;
	}
	.show_kuaidi{
		
		text-align: center;
		border-bottom:1px solid #D9D9D9 ;
		margin-bottom: 20rpx;
		height: 60rpx;
		line-height: 60rpx;
		
	}
	.kuaidi_list{
		width: 55%;
		background-color: #FFFFFF;
		z-index: 999;
		margin-left: 230rpx;
	}
	.express_input{
		border: solid 1px #000000;
		margin-left: 100rpx;
		padding-left: 10rpx;
		height: 65rpx;
		line-height: 65rpx;
		width: 400rpx;
	}
	.manage_express{
		margin-bottom: 20rpx;
		font-size: 24rpx;
		margin-left: 20rpx;
		line-height: 65rpx;
	}
	.button_fahuo{
		background-color: #1AAD19;
		color: #FFFFFF;
		width: 600rpx;
		margin-left: 70rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 50rpx;
		text-align: center;
	}
	
	/* input-autocomplete的CSS  Begin */

	.unit-item {
		display: flex;
		justify-content: flex-end;
		padding-right: 30upx;
		padding-left: 30upx;
		margin-bottom: 30upx;
	}
	.unit-item__label {
		padding-top: 2px;
		text-align: right;
		font-size: 28upx;
		margin: 8upx 0 4upx 16upx;
		min-width: 188upx;
		width: 240upx;
	}
	.unit-item__input {
		text-align: left;
		width: 100%;
		font-size: 28upx;
		margin: 4upx 16upx 0 4upx;
		border: 2upx solid #eaeaea;
	}
	/* input-autocomplete的CSS  End */
	
	.unit-item__input{
		width: 53%;
		font-size: 28rpx;
		border: solid 1px #000000;
		margin-left: 100rpx;
		height: 65rpx;
		line-height: 65rpx;
		margin-bottom: 20rpx;
		padding-left: 10rpx;
	}
	.scan_qr{
		margin-left: -60rpx;
		font-size: 50rpx;
		margin-top: 2rpx;
	}
	.show_modal_mask{
		background-color: #000;
		opacity: 0.7;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 998;
	}
	.show_modal_pop{
		position: fixed;
		z-index: 998;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.image_mobile_new{
		width: 40rpx;
		float: right;
		margin-right: 24rpx;
	}
	
</style>