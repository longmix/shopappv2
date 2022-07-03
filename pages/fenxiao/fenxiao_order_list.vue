<template>
	<view>
		<view :style="{background:wxa_shop_nav_bg_color}">
			<view class="dailiren_xinxi" >
				<image  :src="fenxiao_info.headimgurl" class="daili_image" ></image>	
				<view>
					<view style="display: flex;">
						<view class="daili_text">{{fenxiao_info.nickname}}</view>
						<view class="daili_text">{{user_info.account}}</view>
					</view>
					<view class="daili_shenfen" >{{fenxiao_info.level_name}}</view>
				</view>
			</view>
		</view>
		
		<view v-if="current_subordinate_order_list == null" style="text-align: center;color: #999999;font-weight: bold;">
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/zanwu_shuju.png" style="width: 400rpx;height: 400rpx;"></image>
			<view>暂无联盟订单</view>
			
		</view>
		<view>
			<view v-for="(current_subordinate_item, index) in current_subordinate_order_list" :key="index">
				<view style="background-color: #ffffff;margin: 20rpx;border-radius: 10rpx;overflow: hidden;">
					<view class="user_xiahuaxian">
						<view style="margin: 10rpx;height: 60rpx;">
							<image :src="current_subordinate_item.subordinate_order_user_imformation.headimgurl" style="width: 60rpx;height: 60rpx;"></image>
						</view>
						<view style="margin-top: 10rpx;">
							<view style="font-size: 24rpx;color: #333333;">{{current_subordinate_item.subordinate_order_user_imformation.nickname}}</view>
							<view style="font-size: 20rpx;color:#797979 ;">会员账号：{{current_subordinate_item.subordinate_order_user_imformation.mobile}}</view>
						</view>
					</view>
					<view style="margin: 20rpx 10rpx;">
						<view class="equally_font_size_color">订单编号：{{current_subordinate_item.orderno}}</view>
						<view class="equally_font_size_color" style="display: flex;">
							<view>下单时间：</view>
							<view style="color: #AAAAAA;">{{current_subordinate_item.createtime}}</view>
						</view>
						<view style="display: flex;">
							<view style="margin: 20rpx 20rpx 20rpx 0rpx;">
								<view class="equally_font_size_color">付款金额</view>
								<view style="display: flex;">
									<view class="equally_font_size_color" style="margin-top: 6rpx;">￥</view>
									<view style="font-size: 32rpx;color: #333333;font-weight: bold;">{{current_subordinate_item.price}}</view>
								</view>
							</view>
							<view style="margin: 20rpx;">
								<view class="equally_font_size_color">我的分润</view>
								<view style="display: flex;">
									<view class="equally_font_size_color" style="margin-top: 6rpx;">￥</view>
									<view style="font-size: 32rpx;color: #333333;font-weight: bold;">{{current_subordinate_item.fenrun_ret}}</view>
								</view>
								
							</view>
						</view>
						<view class="equally_font_size_color" style="padding-bottom: 10rpx;display: flex;">
							<view>分润说明：</view>
							<view style="color: #797979;">第{{current_subordinate_item.level}}级推广，提成</view>
						</view>
						
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
				user_info: '',
				fenxiao_info:'',
				current_subordinate_order_list : null,
				current_page:1	,
				wxa_shop_nav_bg_color: '#ea5504',
			}
		},
		onLoad() {
			var that = this;
			
			uni.setNavigationBarTitle({
				title:'联盟订单'
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
			 
			 this.onLoad();
			 this.onShow();
			 
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
					
					if (!userInfo || !userInfo.userid) {
						return;
					}
					
					var post_data = {
						sellerid:that.abotapi.globalData.default_sellerid,
						userid:userInfo.userid,
						page: that.current_page,
						
					};
				// #ifdef MP-WEIXIN
					post_data.xiaochengxu_appid = that.abotapi.globalData.xiaochengxu_appid,
					post_data.xiaochengxu_openid = that.abotapi.get_current_openid('userid_openid_' + userInfo.userid);
				// #endif
					
					
					that.abotapi.abotRequest({
							url: that.abotapi.globalData.yanyubao_server_url + '/openapi/FenxiaoData/get_Fenxiao_center_myteam_list',
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
							that.user_info = res.data.data;
							that.fenxiao_info = that.user_info.fenxiao_info;
						
						
							that.current_subordinate_order_list = res.data.data.order_list;
							/* 
							for(var i=0; i< that.current_subordinate_order_list.length; i++){
								if(that.current_subordinate_order_list[i].price){
									that.current_subordinate_order_list[i].price = (that.current_subordinate_order_list[i].price/100).toFixed(2);
									
								}
							}
							
							console.log('that.current_subordinate_order_list.price  ===>>> ',that.current_subordinate_order_list.price ); */
							console.log('current_subordinate_order_list ===>>> ', that.current_subordinate_order_list);
							
									
							
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
	.dailiren_xinxi{
		display: flex;
		align-items: center;
		
		height: 200rpx;
	}
	.daili_image{
		border-radius: 50%;
		width: 100rpx;
		height: 100rpx;
		border: 1rpx solid #999999;
		margin: 10rpx;
	}
	.daili_text{
		color: #ffffff;
		font-size: 20rpx;
		margin: 10rpx;
	}
	.daili_shenfen{
		color: #FBB03B;
		background-color: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;
		width: fit-content;
		font-size: 20rpx;
		padding: 4rpx 20rpx;
	}
	.equally_font_size_color{
		font-size: 26rpx;
		color: #333333;
	}
	.user_xiahuaxian{
		 border-bottom: #D7D7D7 1rpx solid;
		 display: flex;
	}
</style>