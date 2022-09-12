<template>
	<view>
		<view style="display: flex;padding: 30rpx;" :style="{background:wxa_shop_nav_bg_color}">
			<view style="color: #ffffff;font-size: 32rpx;">收益汇总</view>
			<view class="profit_amount_money">￥{{current_daili_fenrun_list.userItem_balance_leiji_yongjin}}</view>
		</view>
		
		<view v-for="(current_jiangli_mulu_item, index) in current_fenxiao_jiangli_mulu"  :key="index">
			<view class="fenxiao_list_information">
				<view>
					<view class="fenxiao_fenrun_name">{{current_jiangli_mulu_item.name}}</view>
					<view class="fenxiao_fenrun_shuoming">{{current_jiangli_mulu_item.shuoming}}</view>
				</view>
				<view style="margin-top: 20rpx;">
					<view class="fenxiao_fenrun_jiesuan" @tap="go_to_profit_center(current_jiangli_mulu_item.action,current_jiangli_mulu_item.tiaozhuan_index)">
						<view>已结算￥{{current_jiangli_mulu_item.yijiesuan_jiangli}}元</view>
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/right_black.png" class="fenxiao_fenrun_image"></image>
					</view>
					<view class="fenxiao_fenrun_weijiesuan" v-if="current_jiangli_mulu_item.weijiesuan_jiangli == 0.00">
						<view>未结算</view>
						<view>￥{{current_jiangli_mulu_item.weijiesuan_jiangli}}元</view>
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/right_black.png" class="fenxiao_fenrun_image"></image>
					</view>
					<view class="fenxiao_fenrun_weijiesuan" v-if="current_jiangli_mulu_item.weijiesuan_jiangli != 0.00">
						<view>奖金待结算中</view>
					</view>
				</view>
				
			</view>
		</view>
	
	</view>
</template>


<script>
export default {	
	data() {
		return {
			
			wxa_shop_nav_bg_color: '#ea5504',
			
			current_daili_fenrun_list:null,
			current_fenxiao_jiangli_mulu:null
		}
	},
	onLoad() {
		var that = this;
		
		uni.setNavigationBarTitle({
			title:'收益汇总'
		})
		
		that.current_daili_fenrun_list = {};
		that.current_daili_fenrun_list.userItem_balance_leiji_yongjin = 0.00;
		
		
		that.get_fenxiao_myteam_list();
		this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
	},
	onShow() {
		
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
		 
		that.get_fenxiao_myteam_list();
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
			
		},
		
		get_fenxiao_myteam_list:function(){
			
			var that = this;
			
			var userInfo = that.abotapi.get_user_info();
			
			var last_url = '/pages/fenxiao/fenxiao_center';
			
			if (!userInfo || !userInfo.userid) {
				that.abotapi.goto_user_login(last_url);
			
				return;
			}
			that.userInfo = userInfo;
						
			var post_data = {
				sellerid:that.abotapi.globalData.default_sellerid,
				userid:userInfo.userid,
				checkstr: userInfo.checkstr,
			};
			
			
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/FenxiaoData/get_fenxiao_profit_summay_list',
				method: 'post',
				data: post_data,
				success: function (res) {
				
				that.current_daili_fenrun_list = res.data.data;
				
				
				that.current_fenxiao_jiangli_mulu = that.current_daili_fenrun_list.fenxiao_jiangli_mulu;
				
				},
					fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
					},
			});
				
			
			},
			go_to_profit_center:function(current_action,currentTab){
				
				console.log('1478523gfhfghfhg69',current_action)
				console.log('1478asdasdasdsdas52369',currentTab)
				uni.navigateTo({
					url: '/pages/fenxiao/profit_center?action=' + current_action + '&currentTab=' + currentTab,
				})
				
				
			},
			
		},
	}
</script>
<style>
	page {
	  background-color: #F0F3F6;
		padding-bottom: 20rpx;
	}
	.profit_amount_money{
		color: #ffffff;
		font-size: 24rpx;
		line-height: 48rpx;
		margin-left: 20rpx;
	}
	.fenxiao_fenrun_name{
		font-size: 28rpx;
		font-weight: bold;
	}
	.fenxiao_fenrun_shuoming{
		 font-size: 22rpx;
		 margin-top: 20rpx;
	}
	.fenxiao_list_information{
		display: flex;
		background-color: #ffffff;
		margin: 20rpx;
		justify-content: space-between;
		padding: 30rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}
	.fenxiao_fenrun_jiesuan{
		font-size: 22rpx;
		display: flex;
		line-height: 22rpx;
	}
	.fenxiao_fenrun_weijiesuan{
		font-size: 22rpx;
		margin-top: 10rpx;
		display: flex;
		line-height: 22rpx;
		justify-content: space-between;
	}
	.fenxiao_fenrun_image{
		width: 22rpx;
		height: 22rpx;
	}
	
</style>