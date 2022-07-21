<template>
	<view style="padding-bottom: 30rpx;">
		<view :style="{background:wxa_shop_nav_bg_color}">
			<view class="dailiren_xinxi" style="text-align: center;padding: 40rpx;">
				<image src="https://yanyubao.tseo.cn/uploads/bottom_icon/list-8.png" class="daili_image" ></image>	
				
					<view class="daili_text">直属顾客数</view>
					<view class="daili_text">{{current_myteam.xiaji_count}}</view>
				
			</view>
			
		</view>
		<view v-if="current_myteam_list == ''" style="text-align: center;color: #999999;font-weight: bold;">
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/zanwu_shuju.png" style="width: 400rpx;height: 400rpx;"></image>
			<view>暂无顾客</view>
			
		</view>
		<view v-for="(current_myteam_item, index) in current_myteam_list"  :key="index">
			<view class="current_myteam_list_imformation">
				<view class="pic_juzhong" >
					<image :src="current_myteam_item.headimgurl" class="" style="width: 50rpx;height: 50rpx;"></image>
				</view>
				<view style="width: 90%;line-height: 40rpx;margin-top: 25rpx;">
					<view style="font-size: 26rpx;">{{current_myteam_item.nickname}}</view>	
					<view style="display: flex;">
						<view class="font_color_unify">会员账号：{{current_myteam_item.account}}</view>
						<view class="font_color_unify">手机号码：{{current_myteam_item.mobile}}</view>
					</view>
					<view style="display: flex;">
						<view class="font_color_unify">普通订单：{{current_myteam_item.order_putong_list}}</view>
						<view class="font_color_unify" >消费金额：{{current_myteam_item.order_putong_num}}</view>
					</view>	
					<view style="display: flex;">
						<view class="font_color_unify">代理订单：{{current_myteam_item.order_data_tongji_count_xiaxia_num}}</view>
						<view class="font_color_unify" >消费金额：{{current_myteam_item.xiaji_daili_order_jine_num}}</view>
					</view>	
					<view style="display: flex;">
						<view class="font_color_unify">月代理订单：{{current_myteam_item.order_data_tongji_count_xiaxia_num_month}}</view>
						<view class="font_color_unify" >消费金额：{{current_myteam_item.xiaji_daili_order_jine_num_month}}</view>
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
			current_myteam: null,
			current_myteam_list : null,
			current_page:1	,
			wxa_shop_nav_bg_color: '#ea5504',
		}
	},
	onLoad() {
		var that = this;
		
		uni.setNavigationBarTitle({
			title:'我的顾客'
		})
			
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
		   this.current_page = 1;
		   this.get_fenxiao_myteam_list();
		   
		   console.log('下拉刷新==============')
		   
		   //停止当前页面的下拉刷新
		   setTimeout(function() {
		   	console.log('timeout===>>>stopPullDownRefresh===>>>hideToast');
		   	
		   	uni.stopPullDownRefresh();
		   	
		   	uni.hideToast();
		   	//uni.hideLoading();
		   	
		   }, 2000);
		   
		},
		
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom: function () {
			
			this.current_page ++;
			
			this.get_fenxiao_myteam_list();
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
					
					if (!userInfo || !userInfo.userid) {
						return;
					}
					
					var post_data = {
						sellerid:that.abotapi.globalData.default_sellerid,
						userid:userInfo.userid,
						page: that.current_page,
						page_size: 10,
					};
				// #ifdef MP-WEIXIN
					post_data.xiaochengxu_appid = that.abotapi.globalData.xiaochengxu_appid,
					post_data.xiaochengxu_openid = that.abotapi.get_current_openid('userid_openid_' + userInfo.userid);
				// #endif
					
					that.abotapi.abotRequest({
							url: that.abotapi.globalData.yanyubao_server_url + '/openapi/FenxiaoData/get_fenxiao_center_myteam_list',
							method: 'post',
							data: post_data,
							success: function (res) {
							
							if(res.data.code != 1){
								uni.showToast({
									title:'你还没有团队',
									duration: 2000,
								});
								
								return;
							}
							that.current_myteam = res.data.data;
							that.current_myteam_list = res.data.data.xiaji_fenxiao_count;
							console.log('current_myteam_list ===>>> ', that.current_myteam_list);
							
									
							
							},
							fail: function (e) {
							uni.showToast({
								title: '网络异常！',
								duration: 2000
							});
							},
					});
						
					
					},
					
				
		},
	}
</script>

<style>
	page {
	  background-color: #F2F2F2;
	}
	.daili_image{
		border-radius: 50%;
		width: 100rpx;
		height: 100rpx;
	
		margin: 10rpx;
	}
	.daili_text{
		color: #ffffff;
		margin: 10rpx;
		font-size: 26rpx;
	}
	.current_myteam_list_imformation{
		display: flex;
		
		margin: 20rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		overflow: hidden;
	}
	.pic_juzhong{
		width: 10%;
		display: flex;
		justify-content: center;
		margin-top: 20rpx;
	}
	.font_color_unify{
		font-size: 22rpx;
		width: 50%;
		color: #797979;
	}
</style>