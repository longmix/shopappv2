<template>
	<view>
		<!--pages/user/dingdan.wxml-->
<view class="swiper-tab">
  <view class="swiper-tab-list" :class="currentTab==0 ? 'on' : ''" data-current="0" data-otype="0"  @tap="swichNav">全部</view>
  <view class="swiper-tab-list" :class="currentTab==1 ? 'on' : ''" data-current="1" data-otype="1" @tap="swichNav">待付款</view>
  <view class="swiper-tab-list" :class="currentTab==2 ? 'on' : ''" data-current="2" data-otype="2" @tap="swichNav">待发货</view> 
  <view class="swiper-tab-list" :class="currentTab==3 ? 'on' : ''" data-current="3" data-otype="6" @tap="swichNav">待收货</view>
  <view class="swiper-tab-list" :class="currentTab==4 ? 'on' : ''" data-current="4" data-otype="7" @tap="swichNav">已完成</view>
  <!--
  <view class="swiper-tab-list {{currentTab==4 ? 'on' : ''}}" data-current="4" bindtap="swichNav">退款/售后</view>
  -->
</view>
<view class="c_t60"></view>
<view>
<swiper  :current="currentTab" class="swiper-box" :style="{height:Height+'px'}" duration="300" @change="bindChange">

  <!-- 全部 -->
  <swiper-item >
    <view class="search_no" v-if="!orderList.length">
        <view style="text-align: center;margin-top: 100upx;">
        	<image style="width: 150upx;" mode="widthFix" src="../../../static/img/search_no.png"></image>
        	<text style="display: block;color: #8a8a8a;">没有可用订单/(ㄒoㄒ)/~~</text>
        </view>
    </view>
    <view class="shop df bordermax" v-for="(item,index) in orderList" :key="index" style='display: block;'>
        <navigator :url="'../order/detail?orderId='+item.orderid" class="borderb font_14 orderno">订单编号：{{item.orderno}}<view style="float:right;color: #666;font-size: 26rpx;">{{item.status_str}}</view></navigator> 
        <navigator :open-type="wxa_order_info_page_no_link_to_product == 1 ? '' : 'navigate'" :url="'../product/detail?productid='+product_item.productid"  class="df_1 borb" style='display:flex;' v-for="(product_item,index2) in item.orderProduct" :key="index2" v-for-item="product_item">
            <image class="sh_slt" :src="product_item.picture"></image>             
            <view class="sp_text">
                <view class="sp_tit ovh1">{{product_item.name}}</view>
                <view class="sp_neb">¥{{product_item.price}}×{{product_item.amount}}</view>
                <view class="sp_jg">¥：{{product_item.price2}}</view>   
            </view>
        </navigator>
        <view class="borderb bordert font_14">
          <view>共计{{item.total_num}}商品<view class='fl_r'></view></view>
          <view>商品金额：<view class='fl_r'>￥{{item.price}}</view></view>
          <view>快递费：<view class='fl_r'>￥{{item.price3}}</view></view>
          <view>订单金额：<view class='fl_r'>￥{{item.all_price}}</view></view>
          <view>余额支付：<view class='fl_r'>￥{{item.yue_price}}</view></view>
          <view>赠款支付：<view class='fl_r'>￥{{item.coupon_price}}</view></view>        
          <view>实际支付：<view class='fl_r'>￥{{item.pay_price}}</view></view>
          <!-- <view>支付方式：<view class='fl_r'>{{item.payment_name}}</view></view> -->
        </view>
        <view v-if="from_o2o==1 && item.order_option.o2o_room_tuan_yuding">预订日期：{{item.order_option.o2o_room_tuan_yuding}}</view>
        <view v-if="item.buyer_memo != ''">备注：{{item.buyer_memo}}</view>
        <view  class="btn_b">
          <navigator :url="'../order/detail?orderId='+item.orderid" class="font_12 btn_min fl_r mr_5">订单详情</navigator>
        </view> 
  </view>
  </swiper-item>

  <!-- 待付款 -->
  <swiper-item > 
    <view class="search_no" v-if="!orderList0.length">
        <view style="text-align: center;margin-top: 100upx;">
        	<image style="width: 150upx;" mode="widthFix" src="../../../static/img/search_no.png"></image>
        	<text style="display: block;color: #8a8a8a;">没有可用订单/(ㄒoㄒ)/~~</text>
        </view>
    </view>

    <view class="shop df bordermax" v-for="(item,index) in orderList0" :key="index" style='display: block;'>
        <navigator :url="'../order/detail?orderId='+item.orderid" class="borderb font_14">订单编号：{{item.orderno}}</navigator>
        <navigator :open-type="wxa_order_info_page_no_link_to_product == 1 ? '' : 'navigate'" :url="'../product/detail?productid='+product_item.productid" class="df_1 borb" style='display:flex;' v-for="(product_item,index) in item.orderProduct" v-for-item="product_item" :key="index">    
            <image class="sh_slt" :src="product_item.picture"></image>         
            <view class="sp_text">
                <view class="sp_tit ovh1">{{product_item.name}}</view>
                <view class="sp_neb">¥{{product_item.price}}×{{product_item.amount}}</view>
                <view class="sp_jg">¥：{{product_item.price2}}</view>
            </view>
        </navigator>
        <view class="borderb bordert font_14">
           <view>共计{{item.total_num}}商品<view class='fl_r'></view></view>
          <view>商品金额：<view class='fl_r'>￥{{item.price}}</view></view>
          <view>快递费：<view class='fl_r'>￥{{item.price3}}</view></view>
          <view>订单金额：<view class='fl_r'>￥{{item.all_price}}</view></view>
          <view>余额支付：<view class='fl_r'>￥{{item.yue_price}}</view></view>
          <view>赠款支付：<view class='fl_r'>￥{{item.coupon_price}}</view></view>        
          <view>实际支付：<view class='fl_r'>￥{{item.pay_price}}</view></view>
          <!-- <view>支付方式：<view class='fl_r'>{{item.payment_name}}</view></view> -->
        </view>
        <view v-if="from_o2o==1 && item.order_option.o2o_room_tuan_yuding">预订日期：{{item.order_option.o2o_room_tuan_yuding}}</view>
        <view v-if="item.buyer_memo != ''">备注：{{item.buyer_memo}}</view>
        <view class="btn_b">
          <navigator :url="'../order/zhifu?orderId='+item.orderid&'balance_zengsong_dikou='+item.coupon_price&'balance_dikou='+item.yue_price" class="font_12 fl_r mr_5 btn_min">支付订单</navigator>
          <view class="font_12 fl_r mr_5 btn_min" @tap="removeOrder" :data-order-id="item.orderid">取消订单</view>
        </view> 
</view>
  </swiper-item>
  <!-- 待发货 -->
  <swiper-item>
    <view class="search_no" v-if="!orderList1.length">
       <view style="text-align: center;margin-top: 100upx;">
       	<image style="width: 150upx;" mode="widthFix" src="../../../static/img/search_no.png"></image>
       	<text style="display: block;color: #8a8a8a;">没有可用订单/(ㄒoㄒ)/~~</text>
       </view>
    </view>
    <view class="shop df bordermax" v-for="(item,index) in orderList1" :key="index" style='display: block;'>
        <navigator :url="'../order/detail?orderId='+item.orderid" class="borderb font_14">订单编号：{{item.orderno}}</navigator> 
        <navigator :open-type="wxa_order_info_page_no_link_to_product == 1 ? '' : 'navigate'" :url="'../product/detail?productid='+product_item.productid" class="df_1 borb" style='display:flex;' v-for="(product_item,index) in item.orderProduct" v-for-item="product_item" :key="index">
            <image class="sh_slt" :src="product_item.picture"></image>             
            <view class="sp_text">
                <view class="sp_tit ovh1">{{product_item.name}}</view>
                <view class="sp_neb">¥{{product_item.price}}×{{product_item.amount}}</view>
                <view class="sp_jg">¥：{{product_item.price2}}</view>   
            </view>
        </navigator>
        <view class="borderb bordert font_14">
          <view>共计{{item.total_num}}商品<view class='fl_r'></view></view>
          <view>商品金额：<view class='fl_r'>￥{{item.price}}</view></view>
          <view>快递费：<view class='fl_r'>￥{{item.price3}}</view></view>
          <view>订单金额：<view class='fl_r'>￥{{item.all_price}}</view></view>
          <view>余额支付：<view class='fl_r'>￥{{item.yue_price}}</view></view>
          <view>赠款支付：<view class='fl_r'>￥{{item.coupon_price}}</view></view>        
          <view>实际支付：<view class='fl_r'>￥{{item.pay_price}}</view></view>
          <!-- <view>支付方式：<view class='fl_r'>{{item.payment_name}}</view></view> -->
        </view>
        <view v-if="from_o2o==1 && item.order_option.o2o_room_tuan_yuding">预订日期：{{item.order_option.o2o_room_tuan_yuding}}</view>
        <view v-if="item.buyer_memo != ''">备注：{{item.buyer_memo}}</view>
        <view  class="btn_b">
          <navigator class="font_12 btn_min fl_r" @tap="refundOrder" v-if="wxa_order_hide_daishouhuo_refund == 0" :data-order-id="item.orderid">申请退款</navigator>
          <navigator :url="'../order/detail?orderId='+item.orderid" class="font_12 btn_min fl_r mr_5">订单详情</navigator>
        </view> 
  </view>
  </swiper-item>
  <!-- 待收货 -->
  <swiper-item>
        <view class="search_no" v-if="!orderList2.length">
            <view style="text-align: center;margin-top: 100upx;">
            	<image style="width: 150upx;" mode="widthFix" src="../../../static/img/search_no.png"></image>
            	<text style="display: block;color: #8a8a8a;">没有可用订单/(ㄒoㄒ)/~~</text>
            </view>
        </view>
      <view class="shop df bordermax" v-for="(item,index) in orderList2" :key="index" style='display: block;'>
        <navigator :url="'../order/detail?orderId='+item.orderid" class="borderb font_14">订单编号：{{item.orderno}}</navigator>      
        <navigator :open-type="wxa_order_info_page_no_link_to_product == 1 ? '' : 'navigate'" :url="'../product/detail?productid='+product_item.productid" class="df_1 borb" style='display:flex;' v-for="(product_item,index) in item.orderProduct" :for-item="product_item" :key="index"> 
            <image class="sh_slt" :src="product_item.picture"></image>           
            <view class="sp_text">
                <view class="sp_tit ovh1">{{product_item.name}}</view>
                <view class="sp_neb">¥{{product_item.price}}×{{product_item.amount}} </view>
                <view class="sp_jg">¥：{{product_item.price2}}</view>
                
            </view>
        </navigator>
        <view class="borderb bordert font_14">
          <view>共计{{item.total_num}}商品<view class='fl_r'></view></view>
          <view>商品金额：<view class='fl_r'>￥{{item.price}}</view></view>
          <view>快递费：<view class='fl_r'>￥{{item.price3}}</view></view>
          <view>订单金额：<view class='fl_r'>￥{{item.all_price}}</view></view>
          <view>余额支付：<view class='fl_r'>￥{{item.yue_price}}</view></view>
          <view>赠款支付：<view class='fl_r'>￥{{item.coupon_price}}</view></view>        
          <view>实际支付：<view class='fl_r'>￥{{item.pay_price}}</view></view>
          <!-- <view>支付方式：<view class='fl_r'>{{item.payment_name}}</view></view> -->
        </view>
        <view v-if="from_o2o==1 && item.order_option.o2o_room_tuan_yuding">预订日期：{{item.order_option.o2o_room_tuan_yuding}}</view>
        <view v-if="item.buyer_memo != ''">备注：{{item.buyer_memo}}</view>
        <view  class="btn_b">
          <navigator v-if="wxa_order_hide_daishouhuo_refund_after == 0" class="font_12 btn_min fl_r" :url="'tuihuo?orderId='+item.orderid">申请退款</navigator>
          <view class="font_12 btn_min fl_r mr_5" @tap="recOrder" :data-order-id="item.orderid">确认收货</view>
          <navigator :url="'../order/detail?orderId='+item.orderid" class="font_12 btn_min fl_r mr_5">订单详情</navigator>
        </view>
  </view>
  </swiper-item>
  <!-- 已完成-->
  <swiper-item>
    <view class="search_no" v-if="!orderList3.length">
        <!-- <view class="font_14"><image class="scimg" mode="widthFix" style="width: 100%;" src=""></image></view>
        <text></text> -->
		<view style="text-align: center;margin-top: 100upx;">
			<image style="width: 150upx;" mode="widthFix" src="../../../static/img/search_no.png"></image>
			<text style="display: block;color: #8a8a8a;">没有可用订单/(ㄒoㄒ)/~~</text>
		</view> 
    </view>
    <view class="shop df bordermax" v-for="(item,index) in orderList3" :key="index" style='display: block;'>        
        <navigator :url="'../order/detail?orderId='+item.orderid" class="borderb font_14">订单编号：{{item.orderno}}</navigator>
        <navigator :open-type="wxa_order_info_page_no_link_to_product == 1 ? '' : 'navigate'" :url="'../product/detail?productid='+product_item.productid" class="df_1 borb" style='display:flex;' v-for="(product_item,index) in item.orderProduct" v-for-item="product_item" :key="index">
            <image class="sh_slt" :src="product_item.picture"></image>            
            <view class="sp_text">
                <view class="sp_tit ovh1">{{product_item.name}}</view>
                <view class="sp_neb">¥{{product_item.price}}×{{product_item.amount}}</view>
                <view class="sp_jg">¥：{{product_item.price2}}</view>  
            </view>
        </navigator>
        <view class="borderb bordert font_14">
           <view>共计{{item.total_num}}商品<view class='fl_r'></view></view>
          <view>商品金额：<view class='fl_r'>￥{{item.price}}</view></view>
          <view>快递费：<view class='fl_r'>￥{{item.price3}}</view></view>
          <view>订单金额：<view class='fl_r'>￥{{item.all_price}}</view></view>
          <view>余额支付：<view class='fl_r'>￥{{item.yue_price}}</view></view>
          <view>赠款支付：<view class='fl_r'>￥{{item.coupon_price}}</view></view>        
          <view>实际支付：<view class='fl_r'>￥{{item.pay_price}}</view></view>
          <!-- <view>支付方式：<view class='fl_r'>{{item.payment_name}}</view></view> -->
        </view>
        <view v-if="from_o2o==1 && item.order_option.o2o_room_tuan_yuding">预订日期：{{item.order_option.o2o_room_tuan_yuding}}</view>
        <view v-if="item.buyer_memo != ''">备注：{{item.buyer_memo}}</view>
        <view  class="btn_b">
          <navigator :url="'../order/detail?orderId='+item.orderid&'balance_zengsong_dikou='+item.coupon_price&'balance_dikou='+item.yue_price" class="font_12 btn_min fl_r mr_5">订单详情</navigator>
        </view>
  </view>
  </swiper-item>

  <!-- 退款/售后
  <swiper-item>
    <view class="search_no" v-if="{{!orderList4.length}}">
        <view class="font_14"><image class="scimg" src="../../../static/img/search_no.png"></image></view>
        <text>没有可用订单/(ㄒoㄒ)/~~</text>
    </view>

    <view class="shop df" v-for="{{orderList4}}">
        <image class="sh_slt" src="{{item.photo_x}}"></image>
        <view class="df_1">            
            <view class="sp_text">
                <navigator url="../index/detail?productId={{item.pid}}" hover-class="changestyle">
                    <view class="sp_tit ovh1">{{item.name}}</view>
                </navigator>
                <view class="sp_neb">单价：¥ {{item.price_yh}} 数量：×{{item.product_num}} 产品：×{{item.pro_count}}</view>
                <view class="sp_jg">¥：{{item.price}}</view>
                <view class="font_12 red fl_r">{{item.desc}}</view>
                <navigator url="../order/detail?orderId={{item.id}}" class="font_12 red fl_r mr_5">订单详情</navigator>
            </view>
        </view>
    </view>
  </swiper-item>
   -->
</swiper>
 <view class="weui-loadmore" :hidden="isHideLoadMore" v-if="isHideLoadMore==false">
    <view class="weui-loading"></view>
    <view class="weui-loadmore__tips">正在加载</view>
  </view>
    <view v-else>
		<view style='text-align:center;font-size:15px;color:#666;margin-bottom:30px;'>没有更多数据了</view>
	</view>
</view>
	</view>
</template>


<script>
	// pages/user/dingdan.js
	//index.js  
	//获取应用实例  
	var next_page = 1;
	export default {
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
				orderList:[],
				orderList0:[],
				orderList1:[],
				orderList2:[],
				orderList3:[],
				orderList4:[],
				
				
				wxa_order_hide_daishouhuo_refund_after:'',
				
			}
		},
		
		
		
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function () {
		  uni.switchTab({      
		    url: '/pages/user/user',
		  })
		},
		onLoad: function(options) {
			console.log('options',options);
			this.abotapi.set_option_list_str(this, this.callback_set_option);
			
			var from_o2o = uni.getStorageSync('from_o2o');
			
			if (from_o2o){
				this.from_o2o = from_o2o
			}
			
		  
			this.initSystemInfo();
			this.currentTab = parseInt(options.tbIndex),
			this.isStatus = options.otype
			console.log('this.isStatus',this.isStatus);
			if (options.tbIndex) {
				this.loadOrderList();
			}  
		}, 
		onShow: function () {
			var userInfo = this.abotapi.get_user_info();
			// this.loadOrderList();
		},
		
		methods:{
			callback_set_option: function (that, cb_params) {
				console.log('getShopOptionAndRefresh+++++:::' + cb_params)
				
				//从本地读取
				var option_list_str = uni.getStorageSync("option_list_str");
				if (!option_list_str) {
					return null;
				}
				
				var option_list = JSON.parse(option_list_str);
				
				if (!option_list) {
					return;
				}
				this.abotapi.getColor();
				this.wxa_order_hide_daishouhuo_refund = option_list.wxa_order_hide_daishouhuo_refund;
			    this.wxa_order_hide_daishouhuo_refund_after = option_list.wxa_order_hide_daishouhuo_refund_after;
			    this.wxa_order_info_page_no_link_to_product = option_list.wxa_order_info_page_no_link_to_product;
				
				console.log('wxa_order_hide_daishouhuo_refund_after==', this.wxa_order_hide_daishouhuo_refund_after)
			},
			
			
			getOrderStatus:function(){
				return this.currentTab == 0 ? 1 : this.currentTab == 2 ?2 :this.currentTab == 3 ? 3:0;
			},
			
			
			//取消订单
			removeOrder:function(e){
			    var that = this;
			    var orderId = e.currentTarget.dataset.orderId;
				var userInfo = that.abotapi.get_user_info();
			    uni.showModal({
					title: '提示',
					content: '你确定要取消订单吗？',
					success: function(res) {
						res.confirm && uni.request({
							url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=orderdel',
							method:'post',
							data: {
								orderid: orderId,
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
								if(code == 1){
									uni.showToast({
										title: '操作成功！',
										duration: 2000
									});
									that.loadOrderList();
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
			
			
			//确认收货
			recOrder:function(e){
			    var that = this;
			    var orderId = e.currentTarget.dataset.orderId;
				uni.showModal({
					title: '提示',
					content: '你确定已收到宝贝吗？',
					success: function(res) {
						res.confirm && uni.request({
							url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_finish',
							method:'post',
							data: {
								orderid: orderId,
								sellerid: this.abotapi.get_sellerid(),
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
									that.loadOrderList();
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
			
			
			
			//申请退款
			refundOrder: function (e) {
				var that = this;
				var orderId = e.currentTarget.dataset.orderId;
				uni.showModal({
					title: '提示',
					content: '你确定要申请退款吗？',
					success: function (res) {
						res.confirm && uni.request({
							url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_tuikuan_direct',
							method: 'post',
							data: {
								orderid: orderId,
								sellerid: this.abotapi.get_sellerid(),
								checkstr: userInfo.checkstr,
								userid: userInfo.userid
							},
							header: {
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							success: function (res) {
								//--init data
								var code = res.data.code;
								if (code == 1) {
									uni.showToast({
										title: res.data.msg,
										duration: 2000
									});
									that.loadOrderList();
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
			
			
			//点击加载更多
			onReachBottom: function () {
				var userInfo = this.abotapi.get_user_info();
				console.log('加载更多')
				var that = this;
				var page = that.page;
				// next_page++;
				uni.showToast({ 
					title: '加载中',
					icon: 'loading',
					duration: 500
				}) 
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_index',
					method: 'post',
					data: {
						order_sort: that.isStatus,
						sellerid: this.abotapi.get_sellerid(),
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
						page: page + 1
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function (res) {
			
						console.log('11111111');
						var list = res.data.orderList;
						/*
						var order_list = [];
						if (list || list != null) {
							for (var i = 0; i < list.length; i++) {
								//var pro_list = list[i].orderProduct;
								//console.log(pro_list);
								order_list.push(list[i].orderProduct);
							}
						}
						*/
						console.log('that.orderList0===>>>',that.orderList0);
						if (list == null) {
							console.log('2222222');
							that.isHideLoadMore = true
							return false;
						}else{
							switch (that.currentTab) {
								case 0:
									console.log('3333333');
									setTimeout(() => {
										that.orderList = that.orderList.concat(list)
										that.page = page + 1
									}, 100)
									break;
								case 1:
									setTimeout(() => {
										that.orderList0 = that.orderList0.concat(list)
										that.page = page + 1
									}, 100)
									break;
								case 2:
									setTimeout(() => {
										that.orderList1 = that.orderList1.concat(list);
										that.page = page + 1;
									}, 100)
									break;
								case 3:
									setTimeout(() => {
										that.orderList2 = that.orderList2.concat(list);
										that.page = page + 1;
									}, 100)
									break;
								case 4:
									setTimeout(() => {
										that.orderList3 = that.orderList3.concat(list);
										that.page = page + 1;
									}, 100)
									break;
							}
							if (list && list != null && list.length > 5) {
								var winHeight = that.winHeight;
								console.log(that.page)
								var Height = winHeight * (winHeight / 370) * (that.page+1);
								console.log(Height);
								that.Height = Height*3
							} else  {
								that.Height = that.winHeight + 370;
								that.isHideLoadMore = true;
							} 
						}
					},
					//that.initProductData(data);
					fail: function (e) {
						console.log("22222");
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					}
				})
			},
			
			
			loadOrderList: function(){
				console.log('sdfsdfsdfasadf')
				var that = this;
				var userInfo = this.abotapi.get_user_info();
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_index',
					method:'post',
					data: {
						order_sort: that.isStatus,
						page:	1,
						sellerid: this.abotapi.get_sellerid(),
						checkstr: userInfo.checkstr,
						userid: userInfo.userid
					},
					header: {
						'Content-Type':  'application/x-www-form-urlencoded'
					},
					success: function (res) {
						//--init data        
						console.log('list_res',res);
						var code = res.data.code;
						var list = res.data.orderList;
						/*
						var order_list = [];
						if (list||list!=null){
							for(var i = 0;i < list.length;i++){
								//var pro_list = list[i].orderProduct;
								//console.log(pro_list);
								order_list.push(list[i].orderProduct);
							}
						}
						*/
						var Height = that.winHeight;
						console.log('that.currentTab====', that.currentTab)
						console.log('listlist',list);
						switch(that.currentTab){
							case 0:
								console.log('ddddddd')
								that.isHideLoadMore = false;
								that.orderList = list;
								that.Height = Height;
								that.page = 1;
								break;
							case 1:
								that.isHideLoadMore = false;
								that.orderList0 = list;
								that.Height = Height;
								that.page = 1;
								break;
							case 2:
								that.isHideLoadMore = false;
								that.orderList1 = list;
								that.Height = Height;
								that.page = 1;
								break;  
							case 3:
								that.isHideLoadMore = false;
								that.orderList2 = list;
								that.Height = Height;
								that.page = 1;
								break;
							case 4:
								that.isHideLoadMore = false;
								that.orderList3 = list;
								that.Height = Height;
								that.page = 1;
								break;
						}
				
						console.log('orderlistorderlist', that.orderList);
						if (list && list != null && list.length>5){
							var winHeight = that.winHeight
							var Height = winHeight*2*that.page;
							that.Height = Height
						} else {
				
							that.Height = that.winHeight+370;
							that.isHideLoadMore = false;
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
			},
			
			
			loadReturnOrderList:function(){
			    var that = this;
			    uni.request({
					url: this.abotapi.d.ceshiUrl + '/Api/Order/order_refund',
					method:'post',
					data: {
						uid:this.abotapi.d.userId,
						page:that.refundpage,
					},
					header: {
						'Content-Type':  'application/x-www-form-urlencoded'
					},
					success: function (res) {
						//--init data        
						var data = res.data.ord;
						var status = res.data.status;
						if(status==1){
							that.orderList4 = that.orderList4.concat(data)
						}else{
							uni.showToast({
								title: res.data.err,
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
			},
			
			
			initSystemInfo:function(){
				var that = this;  
				uni.getSystemInfo( {
					success: function( res ) {  
						console.log('地地道道的多大的',res)
						that.winWidth = res.windowWidth;  
						that.winHeight = res.windowHeight;  
					}    
				});
			},
			
			
			bindChange: function(e) {  
				var that = this; 
				var currentTab = e.detail.current
				var isStatus = "";
				
				switch (currentTab){
					case 1: isStatus = 1;
						break;
					case 2: isStatus = 2;
						break;
					case 3: isStatus = 6;
						break;
					case 4: isStatus = 7;
						break;
				}
				that.page = 1;
				that.currentTab = currentTab;
				that.isStatus = isStatus;
				that.loadOrderList();
				
			},
				
				
			swichNav: function(e) {
				
				var that = this;
				if( that.currentTab == e.target.dataset.current ) {  
					return false;
				} else {
					var current = e.target.dataset.current;
					that.currentTab = parseInt(current);
					that.isStatus = e.target.dataset.otype;
					that.page = 1;
			    // that.loadOrderList();
				};
			},
			
			
			
			payOrderByWechat: function (e) {
				var order_id = e.currentTarget.dataset.orderId;
				var order_sn = e.currentTarget.dataset.ordersn;
				if(!order_sn){
					uni.showToast({
						title: "订单异常!",
						duration: 2000,
					});
					return false;
				}
				uni.request({
					url: this.abotapi.d.ceshiUrl + '/Api/Wxpay/wxpay',
					data: {
						order_id: order_id,
						order_sn: order_sn,
						uid: this.abotapi.d.userId,
					},
					method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}, // 设置请求的 header
					success: function (res) {
						if (res.data.status == 1) {
							var order = res.data.arr;
							uni.requestPayment({
								timeStamp: order.timeStamp,
								nonceStr: order.nonceStr,
								package: order.package,
								signType: 'MD5',
								paySign: order.paySign,
								success: function (res) {
									uni.showToast({
										title: "支付成功!",
										duration: 2000,
									});
									setTimeout(function () {
										uni.navigateTo({
											url: '../user/dingdan?currentTab=1&otype=deliver',
										});
									}, 3000);
								},
								fail: function (res) {
									uni.showToast({
										title: res,
										duration: 3000
									})
								}
							})
						} else {
							uni.showToast({
								title: res.data.err,
								duration: 2000
							});
						}
					},
					fail: function (e) {
						// fail
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					}
				})
			},
			
		}
		
	}
	
	  
	  // returnProduct:function(){
	  // },

	
	  // bindTransition:function(e){
	  //   console.log('e1==',e)
	  // },
	
	  
	  /**
	   * 微信支付订单
	   */
	  // payOrderByWechat: function(event){
	  //   var orderId = event.currentTarget.dataset.orderId;
	  //   this.prePayWechatOrder(orderId);
	  //   var successCallback = function(response){
	  //     console.log(response);
	  //   }
	  //   common.doWechatPay("prepayId", successCallback);
	  // },
	

	

	
	
	  
	  /**
	   * 调用服务器微信统一下单接口创建一笔微信预订单
	   */
	//   prePayWechatOrder: function(orderId){
	//     var uri = "/ztb/userZBT/GetWxOrder";
	//     var method = "post";
	//     var dataMap = {
	//       SessionId: this.abotapi.globalData.userInfo.sessionId,
	//       OrderNo: orderId
	//     }
	//     console.log(dataMap);
	//     var successCallback = function (response) {
	//       console.log(response);
	//     };
	//     common.sentHttpRequestToServer(uri, dataMap, method, successCallback);
	//   }
	// }
	
	
</script>


<style>
	/* pages/user/dingdan.wxss */
	.weui-loading {
	  margin: 0 5px;
	  width: 20px;
	  height: 20px;
	  display: inline-block;
	  vertical-align: middle;
	  -webkit-animation: weuiLoading 1s steps(12, end) infinite;
	  animation: weuiLoading 1s steps(12, end) infinite;
	  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
	  background-size: 100%;
	}
	.weui-loadmore {
	  width: 65%;
	  margin: 1.5em auto;
	  line-height: 1.6em;
	  font-size: 28rpx;
	  text-align: center;
	}
	.weui-loadmore__tips {
	  display: inline-block;
	  vertical-align: middle;
	}
	.swiper-tab{  
	    width: 100%;  
	    border-bottom: 1px solid #eee;  
	    text-align: center;  
	    line-height: 80rpx;
	    background: #fff;  
	    position: fixed;
	    top: 0;  
	    z-index: 999;
	    }  
	.swiper-tab-list{  
	  font-size: 12px;  
	  display: inline-block;  
	  width: 20%;  
	  color: #666;  
	  }  
	.on{ 
	  color: #dd2727;  
	  border-bottom: 5rpx solid #dd2727;
	  }  
	  
	.swiper-box{ 
	  display: block; 
	  height: 100%; 
	  width: 100%; 
	  overflow: hidden; 
	  }  
	.mt10 {
	  margin: 0 auto;
	  text-align: center;
	  height: 70rpx;
	  width: 450rpx;
	  line-height: 70rpx;
	  border-radius: 10rpx;
	  border: 1px solid #999;
	  font-size: 30rpx;
	  margin-top: 30rpx;
	}
	.clearbutton{
	    background: #fff; 
	    display: inline-block;
	    margin:3% 3% 2% 3%; 
	    color: #dd2727;
	    font-size: 28rpx;
	    width: 94%;
	}
	.shop{
	    background: #fff;
	    padding: 4%;
	    margin-bottom: 10px;
	}
	.shop checkbox{ 
	    margin-top: 27px;
	    }
	.sh_slt{
	    width: 150rpx;
	    height:150rpx;
	    overflow: hidden;
	    border-radius: 5px;
	    /*margin-right: 4%;*/
	    float: left;
	}
	.sp_text{
	    line-height: 20px;
	    width: 75%;
	    text-align: left;
	    margin:3px 0 0 10px;
	    }
	.sp_tit{
	    width: 100%;
	    overflow: hidden;
	    font-size: 28rpx;
	}
	.sp_neb{
	    width: 100%;
	    overflow: hidden;
	    font-size: 12px;
	    color: #999;
	}
	.sp_jg{
	    width: 100%;
	    overflow: hidden;
	    font-size: 28rpx;
	    color: #fc0628;
	}
	.dle{
	    color: #999;
	    font-size: 12px;
	    float: right;
	}
	.dle image{
	    width: 18px;
	    height: 18px;
	    vertical-align: sub;
	}
	.jk_bottom{
	    position: fixed;
	    bottom: 0;
	    background: #fff;
	    width: 100%; 
	    display: inline-flex;
	    border-bottom: 1px solid #eee; 
	    font-size: 28rpx;
	    color: #999;       
	}
	.jk_bottom checkbox{
	    margin: 4% 0 4% 4%;    
	}
	.jk_bottom .heji{
	    margin-top: 5.5%;
	    width: 30%; 
	    text-align: right;   
	}
	.jk_bottom .all{
	    margin-top: 5.5%;
	    padding-left: 2%;  
	}
	.jk_bottom .js_button{
	    background: #dd2727;
	    float: right;
	    color: #fff;
	    font-size: 16px;
	    text-align: center;
	    width: 40%;
	    position: absolute;
	    right: 0;
	    line-height: 50px;
	}
	.c_t60{
	    clear: both;
	    height: 1px;
	    padding-top: 48px;
	}
	.blue{
	  color: #42b1ff;
	}
	.mr_5{
	    margin-right: 5px;
	}
	
	.ddt{
	  height: 28rpx;
	  width: 28rpx;
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
	.bordermax{
	  border-bottom: 8px solid #f2f2f2;
	  padding-bottom: 20px;
	}
	.btn_min{
	  background-color: #1AAD19;
	  border-radius: 5px;
	  padding-left: 28rpx;
	  padding-right: 28rpx;
	  line-height: 2.3;
	  color: #FFFFFF;
	}
	.btn_b{
	  height: 12px;
	  padding-bottom: 5px;
	}
	.borb{
	  margin-bottom: 10rpx;
	}
	
	.orderno{
	  font-size: 30rpx;
	}
</style>