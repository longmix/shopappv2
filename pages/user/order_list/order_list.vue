<template>
	<view>
		<!--pages/user/dingdan.wxml-->
		
		<view class="swiper-tab">
			<view class="input-box"
			 :style="'border:2rpx solid '+ wxa_shop_nav_bg_color + ';'"
			 >
				<input placeholder="请输入订单号" placeholder-style="color:#c0c0c0;" style="background: #f5f5f5;margin-left: 5rpx;" v-model="order_list_filter_keywords"/>
				<view class="icon search" @tap="loadOrderList()"></view>
			</view>
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

		<swiper class="swiper-box" 
				:style="{height:order_list_swiper_height + 'px' }" 
				:current="currentTab"
				duration="300" @change="bindChange">
			
				<!-- 全部 -->
				<swiper-item>
					<view class="search_no" v-if="!orderList.length">
						<view style="text-align: center;margin-top: 100upx;">
							<image style="width: 150upx;" mode="widthFix" src="../../../static/img/search_no.png"></image>
							<text style="display: block;color: #8a8a8a;">没有可用订单/(ㄒoㄒ)/~~</text>
						</view>
					</view>
					<view class="shop df bordermax" v-for="(item,index) in orderList" :key="index" style='display: block;'>
						<view @tap="goto_order_detail(item.orderid)" class="borderb font_14 orderno">
							订单编号：{{item.orderno}}
							<view style="float:right;color: #666;font-size: 26rpx;">{{item.status_str}}</view>
						</view> 
					
						<block v-if="item.order_option.hahading_order_product_list_length > 0">
							<view class="df_1 borb" style='display:flex;'>
								<image class="sh_slt" :src="item.order_option.hahading_order_product_list[0].img"></image>  
								<view class="sp_text">
									<view class="sp_tit ovh1" v-if="item.order_option.order_xianmai_shangdata">{{item.order_option.order_xianmai_shangdata.name}}</view>
									<view class="sp_neb">共计{{item.order_option.hahading_order_product_list.length}}商品</view>
									<view class="sp_jg">￥{{item.all_price}}</view>
									
								</view>
							</view>
							<view class="borderb bordert font_14">
								
								<view>订单金额：<view class='fl_r'>￥{{item.all_price}}</view></view>
								<view>订单类型：<view class='fl_r'>商家订单</view></view>
								<view>下单时间：<view class='fl_r'>{{item.createtime}}</view></view>
								
								<!-- <view>支付方式：<view class='fl_r'>{{item.payment_name}}</view></view> -->
							</view>
							
						</block>
						
						<block v-else>
							<navigator :open-type="wxa_order_info_page_no_link_to_product == 1 ? '' : 'navigate'" 
								:url="'../../product/detail?productid='+product_item.productid"  
								class="df_1 borb" style='display:flex;' 
								v-for="(product_item,index2) in item.orderProduct" 
								:key="index2">
								<image class="sh_slt" :src="product_item.picture"></image>             
								<view class="sp_text">
									<view class="sp_tit ovh1">{{product_item.name}}</view>
									<view class="sp_neb">¥{{product_item.price}}×{{product_item.amount}}</view>
									<view class="sp_jg">¥{{product_item.price2}}</view>   
								</view>
							</navigator>
							<view class="borderb bordert font_14">
								<view class="font_12">共计{{item.total_num}}商品<view class='fl_r'></view></view>
								<view style="clear: both;"><view class="font_12">商品金额：</view><view class='fl_r'>￥{{item.price}}</view></view>
								<view style="clear: both;"><view class="font_12">快递费：</view><view class='fl_r'>￥{{item.price3}}</view></view>
								<view style="clear: both;"><view class="font_12">订单金额：</view><view class='fl_r'>￥{{item.all_price}}</view></view>
								<view style="clear: both;"><view class="font_12">余额支付：</view><view class='fl_r'>￥{{item.yue_price}}</view></view>
								<view style="clear: both;"><view class="font_12">赠款支付：</view><view class='fl_r'>￥{{item.coupon_price}}</view></view>        
								<view style="clear: both;"><view class="font_12">实际支付：</view><view class='fl_r'>￥{{item.pay_price}}</view></view>
								<!-- <view>支付方式：<view class='fl_r'>{{item.payment_name}}</view></view> -->
							</view>
							
						</block>
						<view class="sp_neb" v-if="item.buyer_memo != ''">备注：<view class='fl_r'>{{item.buyer_memo}}</view></view>
						
						<view class="borderb bordert font_14" v-if="is_shop_admin == 1">
							<view class="font_12"><b>管理员选项</b><view class='fl_r'></view></view>
							<view style="clear: both;"><view class="font_12">商城名称：</view><view class='fl_r'>{{item.seller_name}}</view></view>
							<view style="clear: both;"><view class="font_12">收货人：</view><view class='fl_r'>{{item.realname}}</view></view>
							<view style="clear: both;"><view class="font_12">联系方式：</view><view class='fl_r'>{{item.mobile}}</view></view>
							<view style="clear: both;"><view class="font_12">操作说明：</view><view class='fl_r'>进入订单详情处理订单</view></view>
							
						</view>
						
						<view  class="btn_b">
							<view @tap="goto_order_detail(item.orderid)"
								class="btn_min fl_r mr_5" style="color: #fff;">订单详情</view>
						</view> 
					</view>
				</swiper-item>

				<!-- 待付款 -->
				<swiper-item>
					<view class="search_no" v-if="!orderList0.length">
						<view style="text-align: center;margin-top: 100upx;">
							<image style="width: 150upx;" mode="widthFix" src="../../../static/img/search_no.png"></image>
							<text style="display: block;color: #8a8a8a;">没有可用订单/(ㄒoㄒ)/~~</text>
						</view>
					</view>
					<view class="shop df bordermax" v-for="(item,index) in orderList0" :key="index" style='display: block;'>
						<view class="borderb font_14">订单编号：
							<view class="fuzhi" @click="Clipboard_text(item.orderno)" style="">复制</view>	
							{{item.orderno}}
						</view> 
						
						<block v-if="item.order_option.hahading_order_product_list_length > 0">
							<view class="df_1 borb" style='display:flex;'>
								<image class="sh_slt" :src="item.order_option.hahading_order_product_list[0].img"></image>  
								<view class="sp_text">
									<view class="sp_tit ovh1" v-if="item.order_option.order_xianmai_shangdata">{{item.order_option.order_xianmai_shangdata.name}}</view>
									<view class="sp_neb">共计{{item.order_option.hahading_order_product_list.length}}商品</view>
									<view class="sp_jg">￥{{item.all_price}}</view>
									
								</view>
							</view>
							<view class="borderb bordert font_14">
								
								<view>订单金额：<view class='fl_r'>￥{{item.all_price}}</view></view>
								<view>订单类型：<view class='fl_r'>商家订单</view></view>
								<view>下单时间：<view class='fl_r'>{{item.createtime}}</view></view>
								
								<!-- <view>支付方式：<view class='fl_r'>{{item.payment_name}}</view></view> -->
							</view>
						</block>
						<block v-else>
							
							<navigator :open-type="wxa_order_info_page_no_link_to_product == 1 ? '' : 'navigate'" :url="'../../product/detail?productid='+product_item.productid" class="df_1 borb" style='display:flex;' v-for="(product_item,index) in item.orderProduct"  :key="index">
								<image class="sh_slt" :src="product_item.picture"></image>             
								<view class="sp_text">
									<view class="sp_tit ovh1">{{product_item.name}}</view>
									<view class="sp_neb">¥{{product_item.price}}×{{product_item.amount}}</view>
									<view class="sp_jg">¥：{{product_item.price2}}</view>   
								</view>
							</navigator>
							<view class="borderb bordert font_14" >
								<view>共计{{item.total_num}}商品<view class='fl_r'></view></view>
								<view>商品金额：<view class='fl_r'>￥{{item.price}}</view></view>
								<view>快递费：<view class='fl_r'>￥{{item.price3}}</view></view>
								<view>订单金额：<view class='fl_r'>￥{{item.all_price}}</view></view>
								<view>余额支付：<view class='fl_r'>￥{{item.yue_price}}</view></view>
								<view>赠款支付：<view class='fl_r'>￥{{item.coupon_price}}</view></view>        
								<view>实际支付：<view class='fl_r'>￥{{item.pay_price}}</view></view>
								<!-- <view>支付方式：<view class='fl_r'>{{item.payment_name}}</view></view> -->
							</view>
						
						</block>
						<view class="sp_neb" v-if="item.buyer_memo != ''">备注：<view class='fl_r'>{{item.buyer_memo}}</view></view>
						
						<view  class="btn_b">
							<view @tap="goto_order_detail(item.orderid)" 
								class="btn_min fl_r mr_5" style="color: #fff;">订单详情</view>
						</view> 
						
						<!-- <view  class="btn_b">
							<navigator :url="'/pages/pay/payment/payment?orderid='+item.orderid+'&balance_zengsong_dikou='+item.coupon_price+'&balance_dikou='+item.yue_price" class="font_12 fl_r mr_5 btn_min">支付订单</navigator>
							<view class="font_12 fl_r mr_5 btn_min" @tap="removeOrder" :data-orderid="item.orderid">取消订单</view>
						</view> -->
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
						<view class="borderb font_14">订单编号：
							<view class="fuzhi" @click="Clipboard_text(item.orderno)" style="">复制</view>	
							{{item.orderno}}
						</view> 
						
						
						
						<block v-if="item.order_option.hahading_order_product_list_length > 0">
							<view class="df_1 borb" style='display:flex;'>
								<image class="sh_slt" :src="item.order_option.hahading_order_product_list[0].img"></image>  
								<view class="sp_text">
									<view class="sp_tit ovh1" v-if="item.order_option.order_xianmai_shangdata">{{item.order_option.order_xianmai_shangdata.name}}</view>
									<view class="sp_neb">共计{{item.order_option.hahading_order_product_list.length}}商品</view>
									<view class="sp_jg">￥{{item.all_price}}</view>
									
								</view>
							</view>
							<view class="borderb bordert font_14">
								
								<view>订单金额：<view class='fl_r'>￥{{item.all_price}}</view></view>
								<view>订单类型：<view class='fl_r'>商家订单</view></view>
								<view>下单时间：<view class='fl_r'>{{item.createtime}}</view></view>
								
								<!-- <view>支付方式：<view class='fl_r'>{{item.payment_name}}</view></view> -->
							</view>
						</block>
						<block v-else>
							
							<navigator :open-type="wxa_order_info_page_no_link_to_product == 1 ? '' : 'navigate'" :url="'../../product/detail?productid='+product_item.productid" class="df_1 borb" style='display:flex;' v-for="(product_item,index) in item.orderProduct"  :key="index">
								<image class="sh_slt" :src="product_item.picture"></image>             
								<view class="sp_text">
									<view class="sp_tit ovh1">{{product_item.name}}</view>
									<view class="sp_neb">¥{{product_item.price}}×{{product_item.amount}}</view>
									<view class="sp_jg">¥：{{product_item.price2}}</view>   
								</view>
							</navigator>
							<view class="borderb bordert font_14" >
								<view>共计{{item.total_num}}商品<view class='fl_r'></view></view>
								<view>商品金额：<view class='fl_r'>￥{{item.price}}</view></view>
								<view>快递费：<view class='fl_r'>￥{{item.price3}}</view></view>
								<view>订单金额：<view class='fl_r'>￥{{item.all_price}}</view></view>
								<view>余额支付：<view class='fl_r'>￥{{item.yue_price}}</view></view>
								<view>赠款支付：<view class='fl_r'>￥{{item.coupon_price}}</view></view>        
								<view>实际支付：<view class='fl_r'>￥{{item.pay_price}}</view></view>
								<!-- <view>支付方式：<view class='fl_r'>{{item.payment_name}}</view></view> -->
							</view>
						
						</block>
						<view class="sp_neb" v-if="item.buyer_memo != ''">备注：<view class='fl_r'>{{item.buyer_memo}}</view></view>
						
						
						<view class="borderb bordert font_14" v-if="is_shop_admin == 1">
							<view class="font_12"><b>管理员选项</b><view class='fl_r'></view></view>
							<view style="clear: both;"><view class="font_12">商城名称：</view><view class='fl_r'>{{item.seller_name}}</view></view>
							<view style="clear: both;"><view class="font_12">收货人：</view><view class='fl_r'>{{item.realname}}</view></view>
							<view style="clear: both;"><view class="font_12">联系方式：</view><view class='fl_r'>{{item.mobile}}</view></view>
							<view style="clear: both;"><view class="font_12">操作说明：</view><view class='fl_r'>进入订单详情处理订单</view></view>
							
						</view>
						
						
						<view  class="btn_b">
							<view @tap="goto_order_detail(item.orderid)"
								class="btn_min fl_r mr_5" style="color: #fff;">订单详情</view>
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
						<view class="borderb font_14">订单编号：
							<view class="fuzhi" @click="Clipboard_text(item.orderno)" style="">复制</view>	
							{{item.orderno}}
						</view> 
						<block v-if="item.order_option.hahading_order_product_list_length > 0">
							<view class="df_1 borb" style='display:flex;'>
								<image class="sh_slt" :src="item.order_option.hahading_order_product_list[0].img"></image>  
								<view class="sp_text">
									<view class="sp_tit ovh1" v-if="item.order_option.order_xianmai_shangdata">{{item.order_option.order_xianmai_shangdata.name}}</view>
									<view class="sp_neb">共计{{item.order_option.hahading_order_product_list.length}}商品</view>
									<view class="sp_jg">￥{{item.all_price}}</view>
									
								</view>
							</view>
							<view class="borderb bordert font_14">
								
								<view>订单金额：<view class='fl_r'>￥{{item.all_price}}</view></view>
								<view>订单类型：<view class='fl_r'>商家订单</view></view>
								<view>下单时间：<view class='fl_r'>{{item.createtime}}</view></view>
								
								<!-- <view>支付方式：<view class='fl_r'>{{item.payment_name}}</view></view> -->
							</view>
						</block>
						<block v-else>
							<navigator :open-type="wxa_order_info_page_no_link_to_product == 1 ? '' : 'navigate'" :url="'../../product/detail?productid='+product_item.productid" class="df_1 borb" style='display:flex;' v-for="(product_item,index) in item.orderProduct"  :key="index"> 
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
						</block>
						<view class="sp_neb" v-if="item.buyer_memo != ''">备注：<view class='fl_r'>{{item.buyer_memo}}</view></view>
						<!-- <view  class="btn_b">
							<navigator v-if="wxa_order_hide_daishouhuo_refund_after == 0" class="font_12 btn_min fl_r" 
								:url="'tuihuo?orderid='+item.orderid">申请退款</navigator>
							<view class="font_12 btn_min fl_r mr_5" @tap="recOrder" :data-orderid="item.orderid">确认收货</view>
							<view @tap="goto_order_detail(item.orderid)" class="font_12 btn_min fl_r mr_5">订单详情</navigator>
							<view v-if="item.status=='3'" class="font_12 btn_min fl_r mr_5" @click="pingjia" :data-orderid='item.orderid' :data-xianmaishangid='item.order_option.hahading_order_xianmai_shangid'>立即评价</view>
							
						</view> -->
						
						<view  class="btn_b">
							<view @tap="goto_order_detail(item.orderid)"
								class="btn_min fl_r mr_5" style="color: #fff;">订单详情</view>
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
							<text style="display: block;color: #8a8a8a;">没有订单/(ㄒoㄒ)/~~</text>
						</view> 
					</view>
					<view class="shop df bordermax" v-for="(item,index) in orderList3" :key="index" style='display: block;'>        
						<view class="borderb font_14">订单编号：
							<view class="fuzhi" @click="Clipboard_text(item.orderno)" style="">复制</view>	
							{{item.orderno}}
						</view> 
						<block v-if="item.order_option.hahading_order_product_list_length > 0">
							<view class="df_1 borb" style='display:flex;'>
								<image class="sh_slt" :src="item.order_option.hahading_order_product_list[0].img"></image>  
								<view class="sp_text">
									<view class="sp_tit ovh1" v-if="item.order_option.order_xianmai_shangdata">{{item.order_option.order_xianmai_shangdata.name}}</view>
									<view class="sp_neb">共计{{item.order_option.hahading_order_product_list.length}}商品</view>
									<view class="sp_jg">￥{{item.all_price}}</view>
									
								</view>
							</view>
							<view class="borderb bordert font_14">
								
								<view>订单金额：<view class='fl_r'>￥{{item.all_price}}</view></view>
								<view>订单类型：<view class='fl_r'>商家订单</view></view>
								<view>下单时间：<view class='fl_r'>{{item.createtime}}</view></view>
								
								<!-- <view>支付方式：<view class='fl_r'>{{item.payment_name}}</view></view> -->
							</view>
							
						</block>
						<block v-else>
							<navigator :open-type="wxa_order_info_page_no_link_to_product == 1 ? '' : 'navigate'" :url="'../../product/detail?productid='+product_item.productid" 
								class="df_1 borb" style='display:flex;' 
								v-for="(product_item,index) in item.orderProduct" 
								:key="index">
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
						</block>
						<view  class="sp_neb" v-if="item.buyer_memo != ''">备注：<view class='fl_r'>{{item.buyer_memo}}</view></view>
						
						<view  class="btn_b">
							<view @tap="goto_order_detail(item.orderid)"
								class="btn_min fl_r mr_5" style="color: #fff;">订单详情</view>
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
							</view>
							<view class="sp_neb">单价：¥ {{item.price_yh}} 数量：×{{item.product_num}} 产品：×{{item.pro_count}}</view>
							<view class="sp_jg">¥：{{item.price}}</view>
							<view class="font_12 red fl_r">{{item.desc}}</view>
							<navigator url="../orderDetail/orderDetail?orderid={{item.id}}" class="font_12 red fl_r mr_5">订单详情</view>
						</view>
					</view>
				</view>
			  </swiper-item>
			   -->
		</swiper>
			
		<view> 
			<view class="weui-loadmore" :hidden="isHideLoadMore" v-if="isHideLoadMore==false">
				<view class="weui-loading"></view>
				<view class="weui-loadmore__tips">正在加载</view>
			</view>
			<view v-else>
				<!-- #ifndef MP-ALIPAY -->
				<view style='text-align:center;font-size:15px;color:#666;margin-bottom:30px;'>没有更多数据了</view>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>


<script>
	

	// pages/user/dingdan.js
	//index.js  
	//获取应用实例  
	
	// import app from '@/common/common.js';
		
		
	
		
	var apps = getApp();
	// var userInfo = this.abotapi.get_user_info();
	// var userAcountInfo = this.abotapi.get_user_account_info();
	
	
	var next_page = 1;
	export default {
		
		data() {
			return {
				
				isHideLoadMore:false,
				winWidth: 0,  
				winHeight: 0,  
				order_list_swiper_height:667,
				// tab切换  
				currentTab: 1,  
				isStatus:0,//0全部,1待付款，2待发货，6待收货 7已完成
				page:1,
				refundpage:0,
				orderList:[],
				orderList0:[],
				orderList1:[],
				orderList2:[],
				orderList3:[],
				orderList4:[],
				
				wxa_order_hide_daishouhuo_refund:'',
				wxa_order_hide_daishouhuo_refund_after:'',
				wxa_shop_nav_bg_color:'',
				order_list_filter_keywords:'',
				
				//2021.8.18. 管理员订单
				is_shop_admin:0
			}
		},
		
		
		
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function () {
			
		  this.abotapi.call_h5browser_or_other_goto_url('/pages/tabbar/user');
		  
		},
		onLoad: function(options) {
			console.log('user/order_list/order_list===>>>>options===>>>', options);
			
			var that = this;
			
			var userInfo =  that.abotapi.get_user_info();
			
			if(!userInfo || !userInfo.userid){
				var last_url = '/pages/user/order_list/order_list?currentTab=' + options.currentTab + '&type=' + options.otype;
				that.abotapi.goto_user_login(last_url, 'normal');
				return;
			}
			
			that.abotapi.set_option_list_str(this, this.callback_set_option);
			//that.abotapi.set_option_list_str(this, this.abotapi.getColor());
			
		  
			
			
			if(options.currentTab){
				this.currentTab = parseInt(options.currentTab);
			}
			
			
			if(options.otype){
				this.isStatus = options.otype
			}			
			console.log('this.isStatus', this.isStatus);
			
			if(options.is_shop_admin == 1){
				this.is_shop_admin = 1;
			}
			
			
			this.initSystemInfo();
			
			
			
			//加载订单列表
			this.loadOrderList();
			
			
			
			
			
		}, 
		onShow: function () {
			var that = this;
			var userInfo = that.abotapi.get_user_info();
			// var userAcountInfo = this.abotapi.get_user_account_info();
			// this.loadOrderList();
		},
		
		
		//重写返回按钮的处理事件
		/*
		// #ifndef MP-ALIPAY 
		onBackPress:function(event){
			console.log('触发返回事件：', event);
			
			this.abotapi.call_h5browser_or_other_goto_url('/pages/tabbar/user');
		},
		// #endif
		*/
	   
	   
		//点击加载更多
		onReachBottom: function () {
			var that = this;
			var userInfo = that.abotapi.get_user_info();
			console.log('加载更多')
			var that = this;
			var page = that.page;
			
			// next_page++;
			
			uni.showLoading({
				title:'加载中'
			}) 
			
			
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_index',
				method: 'post',
				data: {
					order_sort: that.isStatus,
					sellerid: that.abotapi.get_sellerid(),
					checkstr: userInfo.checkstr,
					userid: userInfo.userid,
					page: page + 1
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: function (res) {
					
					uni.hideLoading();
		
					console.log('11111111');
					var list = res.data.orderList;
					
					
					
					if(list){
									
						for (var i = 0; i < list.length; i++) {
						  
						  if (list[i].order_option && ('hahading_order_product_list' in list[i].order_option) && list[i].order_option.hahading_order_product_list) {
							console.log(i, list[i].order_option.hahading_order_product_list)
							list[i].order_option.hahading_order_product_list = JSON.parse(list[i].order_option.hahading_order_product_list)
							
							if(list[i].order_option.order_xianmai_shangdata){
								list[i].order_option.order_xianmai_shangdata = JSON.parse(list[i].order_option.order_xianmai_shangdata)
							}
							
							list[i].order_option.hahading_order_product_list_length = list[i].order_option.hahading_order_product_list.length;
							
						  }else{
							  
							console.log('ddd88', list[i]);
							
							if(!list[i].order_option){
								list[i].order_option = {};	
							}
							
							list[i].order_option.hahading_order_product_list_length = 0;
							
						  }
						}
				
				
						for (var i=0; i<list.length; i++){
						  if (list[i].order_option && ('hahading_order_xianmai_shangdata' in list[i].order_option) && list[i].order_option.hahading_order_xianmai_shangdata){
							list[i].order_option.hahading_order_xianmai_shangdata = JSON.parse(list[i].order_option.hahading_order_xianmai_shangdata)
						  }
						}
					}
					
					
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
							
							console.log('888888888=====',that.page);
							
							var Height = winHeight * (winHeight / 370) * (that.page+1);
							
							console.log('height====>>>>',Height);
							
							that.order_list_swiper_height = Height*3
							
							console.log('888888888=====',that.order_list_swiper_height);
						} 
						else  {
							that.order_list_swiper_height = that.winHeight + 370;
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
		
		
		methods:{
			callback_set_option: function (that, cb_params) {
				console.log('wxa_order_hide_daishouhuo_refund',cb_params)
				
				that.wxa_shop_nav_bg_color = cb_params.wxa_shop_nav_bg_color;
				
				var option_list = cb_params;
				
				
				if (!option_list) {
					return;
				}
				// that.abotapi.getColor();
				this.wxa_order_hide_daishouhuo_refund = option_list.wxa_order_hide_daishouhuo_refund;
			    this.wxa_order_hide_daishouhuo_refund_after = option_list.wxa_order_hide_daishouhuo_refund_after;
			    this.wxa_order_info_page_no_link_to_product = option_list.wxa_order_info_page_no_link_to_product;
				
				console.log('wxa_order_hide_daishouhuo_refund_after==', this.wxa_order_hide_daishouhuo_refund_after)
			},
			
			goto_order_detail:function(orderid){
				var new_url = '/pages/user/orderDetail/orderDetail?orderid=' + orderid;
				
				if(this.is_shop_admin){
					new_url += '&is_shop_admin=1';
				}
				
				uni.navigateTo({
					url:new_url,
				})
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
			
			
			
			
			getOrderStatus:function(){
				return this.currentTab == 0 ? 1 : this.currentTab == 2 ?2 :this.currentTab == 3 ? 3:0;
			},
			
			//立即评价
			pingjia:function(e){
				console.log('eeeeeeeeeeeee',e);
				var orderid = e.currentTarget.dataset.orderid;
				var xianmaishangid = e.currentTarget.dataset.xianmaishangid;
				
				uni.showActionSheet({
				      itemList: ['照片', '视频'],
				      success(res) {
				        console.log(res.tapIndex)
				        if ((res.tapIndex == 0)) {
				          uni.navigateTo({
				            url: '../../../cms/publish/publish?publishtype=image&orderid=' + orderid + '&xianmai_shangid=' + xianmaishangid,
				          })
				        } else {
				          uni.navigateTo({
				            url: '../../../cms/publish/publish?publishtype=video&orderid=' + orderid + '&xianmai_shangid=' + xianmaishangid,
				          })
				        }
				      },
				      fail(res) {
				        console.log(res.errMsg)
				      }
				    })
				
			},
			
			//取消订单
			removeOrder:function(e){
			    var that = this;
			    var orderid = e.currentTarget.dataset.orderid;
				var userInfo = that.abotapi.get_user_info();
			    uni.showModal({
					title: '提示',
					content: '你确定要取消订单吗？',
					success: function(res) {
						res.confirm && uni.request({
							url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=orderdel',
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
			    var orderid = e.currentTarget.dataset.orderid;
				var userInfo = this.abotapi.get_user_info();
				uni.showModal({
					title: '提示',
					content: '你确定已收到宝贝吗？',
					success: function(res) {
						res.confirm && uni.request({
							url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_finish',
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
				var orderid = e.currentTarget.dataset.orderid;
				uni.showModal({
					title: '提示',
					content: '你确定要申请退款吗？',
					success: function (res) {
						
						var userInfo = that.abotapi.get_user_info();
						res.confirm && uni.request({
							url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_tuikuan_direct',
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
			
			
			
			
			loadOrderList: function(){
				console.log('loadOrderList!!!!!!!')
				
				var that = this;
				var userInfo = that.abotapi.get_user_info();
				var post_data = {
					order_sort: that.isStatus,
					page:	1,
					sellerid: that.abotapi.get_sellerid(),
					checkstr: userInfo.checkstr,
					userid: userInfo.userid
				}
				
				console.log('888888888',this.order_list_filter_keywords);
				
				if(this.order_list_filter_keywords){
					post_data.order_list_filter_keywords = this.order_list_filter_keywords;
				}
				
				//2021.8.18. 如果是管理员的订单
				if(this.is_shop_admin){
					post_data.is_shop_admin = 1;
				}
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_index',
					method:'post',
					data: post_data,
					header: {
						'Content-Type':  'application/x-www-form-urlencoded'
					},
					success: function (res) {
						//--init data        
						//console.log('list_res',res);
						
						var code = res.data.code;
						
						if(code != 1){
							uni.showToast({
								title:res.data.msg
							})
							return;
						}
						
						
						var list = res.data.orderList;
						
						if(!list){
							list = [];
						}
						
						
						
					   if(list){
				
						for (var i = 0; i < list.length; i++) {
						  
						  if (list[i].order_option && ('hahading_order_product_list' in list[i].order_option) && list[i].order_option.hahading_order_product_list) {
							console.log(i, list[i].order_option.hahading_order_product_list)
							list[i].order_option.hahading_order_product_list = JSON.parse(list[i].order_option.hahading_order_product_list)
							//console.log('gggggggggg', list[i].order_option.order_xianmai_shangdata)
							if(list[i].order_option.order_xianmai_shangdata){
								list[i].order_option.order_xianmai_shangdata = JSON.parse(list[i].order_option.order_xianmai_shangdata)
							}
							
							list[i].order_option.hahading_order_product_list_length = list[i].order_option.hahading_order_product_list.length;
						  }else{
							console.log('ddd88', list[i]);
							if(!list[i].order_option){
								list[i].order_option = {};	
							}
							list[i].order_option.hahading_order_product_list_length = 0;  
						  }
						}
				
				
						for (var i=0; i<list.length; i++){
						  if (list[i].order_option && ('hahading_order_xianmai_shangdata' in list[i].order_option) && list[i].order_option.hahading_order_xianmai_shangdata){
							list[i].order_option.hahading_order_xianmai_shangdata = JSON.parse(list[i].order_option.hahading_order_xianmai_shangdata)
						  }
						}
						
						
					   }
						
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
						
						console.log('窗体高度：', Height);
						console.log('that.currentTab====', that.currentTab);
						//console.log('listlist',list);
						
						switch(that.currentTab){
							case 0:
								console.log('ddddddd');
								
								that.isHideLoadMore = false;
								that.orderList = list;
								that.order_list_swiper_height = Height;
								that.page = 1;
								
								break;
							case 1:
								that.isHideLoadMore = false;
								that.orderList0 = list;
								that.order_list_swiper_height = Height;
								that.page = 1;
								break;
							case 2:
								that.isHideLoadMore = false;
								that.orderList1 = list;
								that.order_list_swiper_height = Height;
								that.page = 1;
								break;  
							case 3:
								that.isHideLoadMore = false;
								that.orderList2 = list;
								that.order_list_swiper_height = Height;
								that.page = 1;
								break;
							case 4:
								that.isHideLoadMore = false;
								that.orderList3 = list;
								that.order_list_swiper_height = Height;
								that.page = 1;
								break;
						}
						
						
						//if (list && list != null && list.length>5){
						if (list && list != null){
							var winHeight = that.winHeight;
							
							var Height = winHeight * 2 * that.page;
							
							that.order_list_swiper_height = Height;
							
							that.isHideLoadMore = true;
							
							console.log('orderlistorderlist的高度：', that.order_list_swiper_height);
							
						} else {
				
							that.order_list_swiper_height = that.winHeight+370;
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
					url: that.abotapi.d.ceshiUrl + '/Api/Order/order_refund',
					method:'post',
					data: {
						uid:that.abotapi.d.userId,
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
						console.log('getSystemInfo====>>>', res)
						that.winWidth = res.windowWidth;  
						that.winHeight = res.windowHeight;
						
						that.order_list_swiper_height = that.winHeight;
						
					}    
				});
			},
			
			
			bindChange: function(e) {  
				var that = this; 
				var currentTab = e.detail.current;
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
	  //   var orderid = event.currentTarget.dataset.orderid;
	  //   this.prePayWechatOrder(orderid);
	  //   var successCallback = function(response){
	  //     console.log(response);
	  //   }
	  //   common.doWechatPay("prepayId", successCallback);
	  // },
	

	

	
	
	  
	  /**
	   * 调用服务器微信统一下单接口创建一笔微信预订单
	   */
	//   prePayWechatOrder: function(orderid){
	//     var uri = "/ztb/userZBT/GetWxOrder";
	//     var method = "post";
	//     var dataMap = {
	//       SessionId: that.abotapi.globalData.userInfo.sessionId,
	//       OrderNo: orderid
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
		 /* #ifdef H5 */
	    /* top: 88upx; */
		/* #endif */
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
	    font-size: 24rpx;
	    color: #666;
		padding: 10rpx 0 20rpx 0;
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
	    padding-top: 75px;
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
	  /* height: 12px; */
	  padding-bottom: 5px;
	  overflow: hidden;
	}
	.borb{
	  margin-bottom: 10rpx;
	}
	
	.orderno{
	  font-size: 30rpx;
	}
	.fl_r { 
		float: right;
		font-size: 28rpx;
	}
	
	.font_12 {
		font-size: 24rpx;
		color: #666;
		float:left;
	}
	
	.font_14 view{
		height: 48upx;
	}
	.xianmaishang_order_detail{
		margin-bottom: 30rpx;
	}
	swiper-item{
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		overflow-y: scroll;
	}
	.input-box{
		width: 95%;
		margin: 0 auto;
		height: 60upx;
		background-color: #f5f5f5;
		border-radius: 10upx;
		position: relative;
		display: flex;
		align-items: center;
		margin-top: 5px;
		}
	.input-box .icon{
		display: flex;
		align-items: center;
		position: absolute;
		top:0;
		right: 0;
		width: 60upx;
		height: 60upx;
		font-size: 34upx;
		color: #c0c0c0;
		}
	.input-box input{
		padding-left: 28upx;
		height: 28upx;
		font-size: 28upx;
		text-align: left;
		}
	.fuzhi{
		float: right;
		margin-left: 24rpx;
		border: 1rpx solid #999999;
		padding: 0 18rpx;
		border-radius: 5px;
		font-size: 24rpx;
		line-height: 45rpx;
		margin-top: -10rpx;
	}
	
	</style>