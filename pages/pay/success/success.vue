<template>
	<view>
		<view class="icon">
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/success.png"></image>
		</view>
		<view class="tis">
			订单支付完成
		</view>
		<view class="pay-amount" style="display:none;">
			支付金额:{{amount}}元
		</view>
		
		<view class="order_list">
			<view v-for="(order_item, index) in order_list" 
				v-bind:key="order_item.orderid"
				class="order_item">
				<view class="order_item_cell" style="width:50%;">{{order_item.orderno}}</view>
				<view class="order_item_cell" style="width:20%;font-weight: bold;">{{order_item.order_price}}</view>
				<view class="order_item_cell" style="width:25%;">{{order_item.status_str}}</view>
			</view>
		</view>
		
		
		
		<view class="back">
			<view class="btn" @tap="gotoUser">个人中心</view>
			<view class="btn" @tap="gotoHome">返回首页</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				amount:0,
				order_list:null,
			};
		},
		onLoad(options) {
			//this.amount = parseFloat(e.amount).toFixed(2);
			//this.abotapi.set_option_list_str(null, this.abotapi.getColor());
			
			uni.setNavigationBarTitle({
				title: '支付完成'
			});
			
			//多个orderid用半角逗号分开
			this.orderid = options.orderid;
			
			this.__load_order_buy_result();
			
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
			
		},
		methods: {
			gotoUser() {
				
				this.abotapi.call_h5browser_or_other_goto_url('/pages/tabbar/user');
				
			},
			gotoHome() {
				
				this.abotapi.call_h5browser_or_other_goto_url('/pages/index/index');
				
			},
			
			__load_order_buy_result: function() {
				var that = this;
				
				var post_data = {orderid: that.orderid,						
						sellerid: that.abotapi.get_sellerid(),};
				
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_buy_result',
					method: 'post',
					data: post_data,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						console.log("order_buy_result===>>>", res);
			
						var code = res.data.code;
						
						that.order_list = res.data.order_list;
						
						uni.showToast({
							title: res.data.msg,
							duration: 2000
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
			
		},
	}
</script>

<style lang="scss">
	view{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
.icon{
	width: 100%;
	margin-top: 100rpx;
	image{
		width: 200rpx;
		height: 200rpx;
	}
}
.tis{
	width: 100%;
	margin-top: 20rpx;
	font-size: 48rpx;
}
.pay-amount{
	width: 100%;
	margin-top: 10rpx;
	font-size: 32rpx;
}
.back{
	position: absolute;
	width: 100%;
	bottom: 80rpx;
	.btn{
		padding: 0 50rpx;
		height: 70rpx;
		border: solid 2rpx #f06c7a;
		color: #f06c7a;
		align-items: center;
		border-radius: 10rpx;
		font-size: 34rpx;
		margin:10rpx;
	}
}

.order_list {
	margin-top: 40rpx;
	display:block;
	width: 100%;
}
.order_item {
	margin:20rpx;
	display:block;
	height:70rpx;
	line-height: 70rpx;
	width: 100%;
}
.order_item_cell {
	float:left;
	text-align: left;
	display:block;
	font-size:25rpx;
}
</style>
