<template>
	<view>
		<view style="background-color: #ffffff;width: 86%;margin: 3%;padding: 4%;">
			<view style="float: right;margin: 20rpx;">
				-1.00
			</view>
			<view style="display: flex;">
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/zhuanjiazaixian_icon/rose.png" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
				<view>
					<view style="font-size: 26rpx;
					margin: 20rpx;">10支玫瑰</view>
					<view style="color: #999999;margin-left: 20rpx;font-size: 24rpx;">送新人大礼包</view>
				</view>
			</view>
		</view>
		<view style="background-color: #ffffff;width: 86%;margin: 3%;padding: 4%;">
			<view style="float: right;margin: 20rpx;">
				-108.00
			</view>
			<view style="display: flex;">
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/zhuanjiazaixian_icon/rose.png" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
				<view>
					<view style="font-size: 26rpx;
					margin: 20rpx;">1080支玫瑰</view>
					<view style="color: #999999;margin-left: 20rpx;font-size: 24rpx;">送新人大礼包</view>
				</view>
			</view>
		</view>
		
		<view style="background-color: #ffffff;width: 86%;margin: 3%;padding: 4%;">
			<view style="float: right;margin: 20rpx;">
				-6.00
			</view>
			<view style="display: flex;">
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/zhuanjiazaixian_icon/rose.png" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
				<view>
					<view style="font-size: 26rpx;
					margin: 20rpx;">60支玫瑰</view>
					<view style="color: #999999;margin-left: 20rpx;font-size: 24rpx;">送新人大礼包</view>
				</view>
			</view>
		</view>
		<view style="background-color: #ffffff;width: 86%;margin: 3%;padding: 4%;">
			<view style="float: right;margin: 20rpx;">
				-30.00
			</view>
			<view style="display: flex;">
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/zhuanjiazaixian_icon/rose.png" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
				<view>
					<view style="font-size: 26rpx;
					margin: 20rpx;">300支玫瑰</view>
					<view style="color: #999999;margin-left: 20rpx;font-size: 24rpx;">送新人大礼包</view>
				</view>
			</view>
		</view>
		<view style="background-color: #ffffff;width: 86%;margin: 3%;padding: 4%;">
			<view style="float: right;margin: 20rpx;">
				-108.00
			</view>
			<view style="display: flex;">
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/zhuanjiazaixian_icon/rose.png" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
				<view>
					<view style="font-size: 26rpx;
					margin: 20rpx;">1080支玫瑰</view>
					<view style="color: #999999;margin-left: 20rpx;font-size: 24rpx;">送新人大礼包</view>
				</view>
			</view>
		</view>
		<view style="background-color: #ffffff;width: 86%;margin: 3%;padding: 4%;">
			<view style="float: right;margin: 20rpx;">
				-288.00
			</view>
			<view style="display: flex;">
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/zhuanjiazaixian_icon/rose.png" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
				<view>
					<view style="font-size: 26rpx;
					margin: 20rpx;">2880支玫瑰</view>
					<view style="color: #999999;margin-left: 20rpx;font-size: 24rpx;">送新人大礼包</view>
				</view>
			</view>
		</view>
		<view style="background-color: #ffffff;width: 86%;margin: 3%;padding: 4%;">
			<view style="float: right;margin: 20rpx;">
				-500.00
			</view>
			<view style="display: flex;">
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/zhuanjiazaixian_icon/rose.png" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
				<view>
					<view style="font-size: 26rpx;
					margin: 20rpx;">5000支玫瑰</view>
					<view style="color: #999999;margin-left: 20rpx;font-size: 24rpx;">送新人大礼包</view>
				</view>
			</view>
		</view>
		<view style="background-color: #ffffff;width: 86%;margin: 3%;padding: 4%;">
			<view style="float: right;margin: 20rpx;">
				-1000.00
			</view>
			<view style="display: flex;">
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/zhuanjiazaixian_icon/rose.png" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
				<view>
					<view style="font-size: 26rpx;
					margin: 20rpx;">10000支玫瑰</view>
					<view style="color: #999999;margin-left: 20rpx;font-size: 24rpx;">送新人大礼包</view>
				</view>
			</view>
		</view>
	</view>
</template>
<!--  -->
<style>
	page{
		background-color: #F0F3F6;
	}
	
</style>

<script>
		import swiperBanner from '../../components/swiper-banner.vue';
export default {	
	components:{
		
		swiperBanner
	},
	data() {
		return {
			
		}
	},
	onLoad() {
		var that = this;
		uni.setNavigationBarTitle({
			title:'消费记录'
		})
	
	
		that.get_current_userinfo();
		
		that.get_fenxiao_total_amount();
		
		this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
		
	},
	onShow() {
		this.get_gundong_img();
	},
	onReady(){
		
	},
	onPageScroll(e) {
		
	},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		   console.log('下拉刷新==')
		   
		   // #ifndef MP-ALIPAY
		   uni.showToast({
		   	title: '数据更新中……',
		   	icon:'loading',
		   });
		   // #endif
		   
		   // #ifdef MP-ALIPAY
		   uni.showToast({
		   	title: '数据更新中……',
		   	//icon:'loading', 	//支付宝不支持icon为 loading
		   	//duration:2000
		   });
		   // #endif
			 this.current_page = 1;
		   this.get_current_userinfo();
		   
		   console.log('下拉刷新==============')
		   
		   //停止当前页面的下拉刷新
		   setTimeout(function() {
		   	console.log('timeout===>>>stopPullDownRefresh===>>>hideToast');
		   	
		   	uni.stopPullDownRefresh();
		   	
		   	uni.hideToast();
		   	//uni.hideLoading();
		   	
		   }, 2000);
		   
		},
		
		methods: {
		
			callback_function_shop_option_data:function(that, cb_params){
				
				console.log('当前调试开关22：' + this.system_debug_flag);
				console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);
				
				if(!cb_params){
					return;
				}
				
				
				console.log('cb_params====', cb_params);
				
				that.wxa_shop_nav_bg_color  = cb_params.option_list.wxa_shop_nav_bg_color;
				that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
				
				
				
				if (cb_params.option_list.wxa_kefu_mobile_num) {
				  
				    that.wxa_kefu_mobile_num = cb_params.option_list.wxa_kefu_mobile_num
				  
				}
				if (cb_params.option_list.wxa_kefu_button_type) {
				  
				   that.wxa_kefu_button_type = cb_params.option_list.wxa_kefu_button_type
				  
				}
				if (cb_params.option_list.wxa_kefu_form_url) {
				  
				    that.wxa_kefu_form_url = cb_params.option_list.wxa_kefu_form_url
				  
				}
				
				
			},
			
		},
	}
</script>

