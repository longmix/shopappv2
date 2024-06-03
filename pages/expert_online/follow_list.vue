<template>
	
	<view>
		<view style="background-color: #ffffff;width: 90%;display: flex;justify-content: space-between;
    flex-wrap: wrap;text-align: center;margin: 3%;padding: 2%;">
			<view @tap="change_my_follow">
				<view>1</view>
				<view>我关注</view>
			</view>
			<view @tap="change_my_friend">
				<view>0</view>
				<view>好友</view>
			</view>
			<view @tap="change_friend_follow_my">
				<view>0</view>
				<view>关注我</view>
			</view>
		</view>
		<view style="background-color: #ffffff;width: 94%;margin: 3%;"  v-if="!my_follow_list_change">
			<view class="yijing_follow" >已关注</view>
			<view style="display: flex;padding: 20rpx;">
				<image :src="fenxiao_info.headimgurl" style="width: 120rpx;height: 120rpx;border-radius: 50%;"></image>
				<view style="margin-left: 20rpx;">
					<view>二门有</view>
					<view style="display: flex;">
						<view style="background-color: pink;border-radius: 20rpx;color: #ffffff;font-size: 24rpx;padding-left: 10rpx;
    padding-right: 10rpx;">26</view>
						<view style="background-color: skyblue;margin-left: 10rpx;font-size: 24rpx;">上海市</view>
					</view>
					<view style="font-size: 24rpx;color: #999999;">个性签名</view>
				</view>
				
			</view>
		</view>
		
		<view v-if="my_friend_change">
			<view style="width: 100%;text-align: center;">
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/zhuanjiazaixian_icon/friend.png" style="width: 400rpx;height: 400rpx;"></image>
				<view>互相关注可成为好友</view>
			</view>
			
		</view>
		
		
	</view>
</template>

<style>
		
	page{
		background-color: #F0F3F6;
	}
		
	.yijing_follow{
		float: right;
		background-color: #999999;
		margin: 10px;
		border-radius: 20rpx;
		padding: 4rpx;
		font-size: 26rpx;
	}
	

</style>

<script>
export default {	
	data() {
		return {
			user_info:'',
			fenxiao_info:'',
			current_page:1,
			
			my_follow_list_change:false,
			my_friend_change:false,
		}
	},
	onLoad() {
		var that = this;
		uni.setNavigationBarTitle({
			title:'关注列表'
		})
	
		that.get_current_userinfo();
		
		that.get_fenxiao_total_amount();
		
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
			change_my_follow:function(){
				this.my_follow_list_change = true;
			},
			change_my_friend:function(){
				this.my_friend_change = true;
				this.my_follow_list_change = false;
			},
			get_current_userinfo: function() {
				var that = this;
				
				var userInfo = that.abotapi.get_user_info();
				
				var last_url = '/pages/fenxiao/fenxiao_center';
				
				if (!userInfo || !userInfo.userid) {
					that.abotapi.goto_user_login(last_url);
				
					return;
				}
				that.userInfo = userInfo;
			
				console.log('get_current_userinfo--userInfo==', userInfo);
				
				var post_data = {
						sellerid: that.abotapi.globalData.default_sellerid,
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
						page: that.current_page,
						page_size: 10,
				};
				
				// #ifdef MP-WEIXIN
					post_data.xiaochengxu_appid = that.abotapi.globalData.xiaochengxu_appid,
					post_data.xiaochengxu_openid = that.abotapi.get_current_openid('userid_openid_' + userInfo.userid);
				// #endif
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/FenxiaoData/get_fenxiao_center_myteam_list',
					data: post_data,
					success: function(res) {
					
						if (res.data.code == -1) {
							//登录超时
							that.abotapi.del_user_info();
							
							var last_url = '/pages/tabbar/user';
							that.abotapi.goto_user_login(last_url, 'normal');
							
						} 
						else {
							/* 
							
							if(res.data.data.fenxiao_info.supplier_sequence == '-1'){
								uni.showModal({
									title:'错误',
									content:'请购买代理身份',
									showCancel:false
								});
								
								uni.navigateTo({
									url: '/pages/tabbar/user',
								})
								
							}
							
							 */
							
							var data = res.data;
							
							//渲染前端界面
							that.user_info = data.data;
							
							that.my_xia_grade_level = that.user_info.my_xia_grade_level;
							
							that.fenxiao_info = that.user_info.fenxiao_info;
							
							
							console.log('fenxiao_userinfo==>>', that.fenxiao_info);
						
							
						}
					},
					fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
					},
				})
				
				
			},
				
		
			
		},
	}
</script>

