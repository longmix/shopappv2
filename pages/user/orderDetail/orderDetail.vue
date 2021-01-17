<template>
	<view>
		
	
	 <view class="abb" :style="{background:wxa_shop_nav_bg_color}">
	        <view class="tctb" :style="{color:wxa_shop_nav_font_color}">订单编号：{{orderData.orderno}}</view>
	</view>
	<view class="w100">
			
	    <navigator v-if="waimai_order_type != 1" 
			:open-type="wxa_order_info_page_no_link_to_product == 1 ? '' : 'navigate'" 
			:url="'../../product/detail?productid=' + item.productid"  
			class="p_all bg_white df item" 
			v-for="(item,index) in orderList" :key="index">
	
				<view class="cp_photo">			
					<image :src="item.picture?item.picture:item.img"></image>
				</view>
				<view class="df_1">	
					<view class="font_14 mt5 ovh1">
			           {{item.name}}
			        </view>
				<text class="gm_ovh_1h pt10" >数量：{{item.amount?item.amount:item.count}} 单价：¥{{item.price}}</text>
				<text class="gm_ovh_1h pt10" style="font-weight:bold;color: #333;">¥{{item.price2?item.price2:item.price}}</text>
				</view>
	    </navigator>
		<view v-if="waimai_order_type == 1" class="p_all bg_white df item" v-for="(item,index) in orderList" :key="index">
			
				<view class="cp_photo">			
					<image :src="item.picture?item.picture:item.img"></image>
				</view>
				<view class="df_1">	
					<view class="font_14 mt5 ovh1">
			           {{item.name}}
			        </view>
				<text class="gm_ovh_1h pt10" >数量：{{item.amount?item.amount:item.count}} 单价：¥{{item.price}}</text>
				<text class="gm_ovh_1h pt10" style="font-weight:bold;color: #333;">¥{{item.price2?item.price2:item.price}}</text>
				</view>
		</view>
	
			<view class="p_all bg_white mt10 font_14" v-if="orderData.realname">
				<view class="df" v-if="orderData.order_option && orderData.order_option.xianmai_order_type == 1">
					<view class="df_1 c6">
					<view class="l_h20" style="font-weight: bold;color: #333;">{{orderData.realname}}   <text>{{orderData.mobile}}</text> </view>
					<view class="l_h20 mt5" style="font-size: 25rpx;">地址：<text v-if="!wxa_order_hide_sanji_address">{{orderData.address01}}</text>{{orderData.address02}}</view>
					</view>
				</view>
			</view>
			<view style="overflow: hidden;margin-right: 3%;">
				<view class="font_12 btn_min fl_r mr_5 mg_l" @tap="refundOrder" 
				v-if="wxa_order_hide_daishouhuo_refund == 0 && orderData.status_str=='待发货'" 
				:data-order-id="orderData.orderid">
				申请退款
				</view>
				
				<navigator v-if="orderData.status_str=='待付款'" 
					:url="'../../pay/payment/payment?orderId=' + orderData.orderid + '&balance_zengsong_dikou=' + orderData.coupon_price + '&balance_dikou=' + orderData.yue_price" 
					class="font_12 fl_r mr_5 btn_min mg_l">立即支付</navigator>
					
				<view v-if="orderData.status_str=='待付款'"
					@tap="cancelOrder" :data-order-id="orderData.orderid"
					class="font_12 fl_r mr_5 btn_min mg_l"
					style="background-color: #999;">取消订单</view>
				
				
				<view class="font_12 btn_min fl_r mr_5 mg_l" @tap="refundOrder" v-if="wxa_order_hide_daishouhuo_refund_after == 0 && orderData.status_str=='待收货'" :data-order-id="orderData.orderid">申请退款</view>
				<view v-if="orderData.status_str=='待收货'" @click="recOrder" :data-orderid="orderData.orderid" class="font_12 fl_r mr_5 btn_min mg_l">确认收货</view>
				<view v-if="orderData.status_str=='待收货' && xianmai_shang_order_remark == ''" class="font_12 fl_r mr_5 btn_min mg_l" @click="pingjia" :data-orderid='orderData.orderid' :data-xianmaishangid='orderData.order_option.hahading_order_xianmai_shangid'>立即评价</view>
				<view v-if="orderData.status_str=='待收货' && xianmai_shang_order_remark" class="font_12 fl_r mr_5 btn_min mg_l" @click="go_to_page" :data-faquanid='xianmai_shang_order_remark'>查看评价</view>
				
				<view v-if="orderData.status_str=='订单已完成'" 
					class="font_12 fl_r mr_5 btn_min mg_l" 
					style="background-color: #E3170D;"
					@click="cancelOrder" :data-order-id='orderData.orderid' 
					:data-action-type='1'>删除订单</view>
				<view v-if="orderData.status_str=='订单已完成' && xianmai_shang_order_remark == ''" 
					class="font_12 fl_r mr_5 btn_min mg_l" 
					@click="pingjia" 
					:data-orderid='orderData.orderid' 
					:data-xianmaishangid='orderData.order_option.hahading_order_xianmai_shangid'>立即评价</view>
				<view v-if="xianmai_shang_order_remark" class="font_12 fl_r mr_5 btn_min mg_l" @click="go_to_page" :data-faquanid='xianmai_shang_order_remark'>查看评价</view>
			</view>
			<view class="p_all bg_white mt10 c6 l_h20  font_14">
				<view v-if="orderData.order_option">
					<view>订单类型<view class='fl_r'>商家订单</view></view>
				</view>
				
				<view v-if="order_xianmai_shangdata.name">
					<view>商家名称<view class='fl_r'>{{order_xianmai_shangdata.name}}</view></view>
				</view>
				
				<view v-if="orderData.order_option.xianmai_order_peisong_type && orderData.order_option.xianmai_order_peisong_type == 'snatch_order'">					<view>配送状态<view class='fl_r'>{{orderData.order_option.xianmai_order_peisong_status_str}}</view></view>				</view>
				
				<view class="bordert">
					<view>订单状态<view class='fl_r'>{{orderData.status_str}}</view></view>
				</view>
				
				<view class="mt10">
					订单时间<view class='fl_r'>{{orderData.createtime}}</view>
				</view>  
	
				<view class="mt10" v-if="orderData.buyer_memo">
					留言备注：<view class='fl_r' style="font-size:24rpx; color:#666;">{{orderData.buyer_memo?orderData.buyer_memo:''}}</view>
				</view> 
	
	      
	
	
	      <view class="bordert font_14">
	          <view>商品数量<view class='fl_r'>x {{orderData.total_num}}</view></view>
	          <view>商品金额<view class='fl_r'>￥{{orderData.price}}</view></view>
	          
	      </view>
	
	      <view class="bordert font_14">
	          <view>快递费<view class='fl_r'>￥{{orderData.price3}}</view></view>
			  <view v-if="orderData.delivery_company">物流公司<view class='fl_r'>{{orderData.delivery_company}}</view></view>
			  <view v-if="orderData.delivery_no">
				  物流编号
				  <view class="fuzhi" @click="Clipboard_text(orderData.delivery_no)" style="">复制</view>
				  <view class='fl_r'>{{orderData.delivery_no}}</view>
				  
		      </view>
	      </view>
	      <view class="bordert font_14">
	          <view>订单金额<view class='fl_r'>￥{{orderData.order_total_price}}</view></view>
			  
			  <view v-if="orderData.user_coupon_dikou">优惠券抵扣<view class='fl_r'>￥{{orderData.user_coupon_dikou}}</view></view>
			  
	          <view>余额支付<view class='fl_r'>￥{{orderData.yue_price}}</view></view>
	          <view>赠款支付<view class='fl_r'>￥{{orderData.coupon_price}}</view></view>   
	      </view>
	
	      <view class="borderb bordert font_14">
	          <view v-if='orderData.pay_price'>实际支付<view class='fl_r'>￥{{orderData.pay_price}}</view></view>
	          <view>支付方式<view class='fl_r'>{{orderData.payment_name}}</view></view>
	        </view>
			  </view>
	
	
	
	        
	
		<view class="p_all mt10">
			<view class="btnGreen">
				        <!-- <button type="warn" size="{{warnSize}}" loading="{{loading}}" plain="{{plain}}"
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
				wxa_order_hide_daishouhuo_refund_after:'',
				wxa_order_hide_daishouhuo_refund:'',
				orderno:'',
				waimai_order_type:0,
				order_xianmai_shangdata:'', //商家信息
				
				
				xianmai_shang_order_remark:'',//订单是否评价过
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
			
			
			that.abotapi.set_option_list_str(this, this.callback_set_option);
			
			this.orderId = options.orderId
			this.balance_zengsong_dikou = options.balance_zengsong_dikou
			this.balance_dikou = options.balance_dikou
			
		
			this.loadProductDetail();
		}, 
		onShow: function () {
			var that = this;
			var userInfo = that.abotapi.get_user_info();
			// var userAcountInfo = this.abotapi.get_user_account_info();
			// this.loadOrderList();
		},
		
		methods:{
			  callback_set_option: function (that, option_list){
			    console.log('getShopOptionAndRefresh+++++:::', option_list)
			
			   
			    if (!option_list) {
			      return;
			    }
			
				if(option_list.wxa_order_hide_daishouhuo_refund){
					this.wxa_order_hide_daishouhuo_refund = option_list.wxa_order_hide_daishouhuo_refund;
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
			        url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_xiangqing',
			        data: {
			          orderid: that.orderId,
			          userid: userInfo.userid,
			          checkstr: userInfo.checkstr,
			          sellerid: that.abotapi.get_sellerid()
			        },
			        success: function (res) {
			          var code = res.data.code;
					  var orderData = res.data.orderinfo;
			          if (code == 1) {
						  
						if(orderData.order_option && (orderData.order_option.order_xianmai_shangdata)){
							that.order_xianmai_shangdata = JSON.parse(orderData.order_option.order_xianmai_shangdata); //商家信息
						}
						  
						  
						if(orderData.order_option && (orderData.order_option.xianmai_order_type)){
							var order_product_list = JSON.parse(orderData.order_option.hahading_order_product_list);
							console.log('order_product_list',order_product_list);
							that.orderData = orderData;
							that.orderList = order_product_list;
							that.waimai_order_type = 1;
						}else{
							that.orderData = orderData;
							that.orderList = orderData.orderProduct;
						}
						 
						if(orderData.order_option && (orderData.order_option.xianmai_shang_order_remark)){
							that.xianmai_shang_order_remark = orderData.order_option.xianmai_shang_order_remark;
						}
			           
						
			          
			            console.log(that.orderList);
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
				
				//评价完成 之后点击完成按钮跳转发圈页面
				go_to_page:function(e){
					console.log(e);
					var faquanid = e.currentTarget.dataset.faquanid;
					
					uni.navigateTo({
						url: '/cms/discover/discover?faquanid=' + faquanid +'&xianmai_shangid=' + this.orderData.order_option.hahading_order_xianmai_shangid,
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
				
				
				//申请退款
				refundOrder: function (e) {
					var that = this;
					var orderId = e.currentTarget.dataset.orderId;
					uni.showModal({
						title: '提示',
						content: '你确定要申请退款吗？',
						success: function (res) {
							
							var userInfo = that.abotapi.get_user_info();
							res.confirm && uni.request({
								url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_tuikuan_direct',
								method: 'post',
								data: {
									orderid: orderId,
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
					var orderId = e.currentTarget.dataset.orderId;
					
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
								url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_cancel',
								method: 'post',
								data: {									
									sellerid: that.abotapi.get_sellerid(),
									checkstr: userInfo.checkstr,
									userid: userInfo.userid,
									orderid: orderId,
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
				
		}
		
	}
	
	
	
	
</script>


<style>
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
		background: #1AAD19;
		color: #fff;
		padding: 0 18rpx;
		border-radius: 5px;
		font-size: 24rpx;
	}
	.mg_l{
		margin-left:10rpx;
	}
</style>