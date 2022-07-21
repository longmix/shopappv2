<template>
	<view>
		<view style="height: 400rpx;" :style="{background:wxa_shop_nav_bg_color}">
			<view class="dailiren_xinxi" >
				<image  :src="fenxiao_info.headimgurl" class="daili_image" ></image>	
				<view>
					<view style="display: flex;">
						<view class="daili_text">{{fenxiao_info.nickname}}</view>
						<view class="daili_text">{{user_info.account}}</view>
					</view>
					<view class="daili_shenfen">{{fenxiao_info.level_name}}</view>
				</view>
			</view>
			<view class="amount_money" >
				<view style="width: 50%;">
					<view style="font-size: 20rpx;">已结算</view>
					<view>￥{{current_daili_fenrun_list.userItem_balance_leiji_yongjin}}</view>
				</view>
				<view style="width: 50%;">
					<view style="font-size: 20rpx;">未结算</view>
					<view>￥0.00</view>
				</view>
			</view>
		</view>
		
		<view style="width: 100%;height:20rpx;background-color: #f2f2f2;"></view>
		
		
		
		<view style="display: flex;margin: 20rpx;justify-content: space-between;">
			<view v-if="my_xia_grade_level == 13" style="width: 100%;text-align:center;font-size: 26rpx;">您已成为最高等级！</view>
			<view v-if="my_xia_grade_level.supplier_sequence < 3">
				<view style="font-size: 20rpx;color: #999999;">下一等级</view>
				<view  style="font-size: 26rpx;">{{my_xia_grade_level.level_name}}</view>
				
			</view>
			
			<view v-if="my_xia_grade_level.supplier_sequence >= 3" style="display: flex;justify-content: space-between;width: 100%;">
				<view style="font-size: 20rpx;color: #999999;">下一等级</view>
				<view  style="font-size: 26rpx;">{{my_xia_grade_level.level_name}}</view>
				
			</view>
		
			<view v-if="my_xia_grade_level.supplier_sequence < 3" style="text-align: center;line-height: 60rpx;font-size: 26rpx;">购买会员升级礼包</view>
			<view v-if="my_xia_grade_level.supplier_sequence < 3" class="liji_qianwang" style="margin-top: 10rpx;height: 36rpx;"
			:style="{background:wxa_shop_nav_bg_color,border: wxa_shop_nav_bg_color+ ' 2rpx solid'}" @tap="go_to_shop_detail">立即前往</view>
		</view>
		<view style="width: 100%;height:20rpx;background-color: #f2f2f2;"></view>
		
		<view class="important_matters" style="font-weight: bold;font-size: 24rpx;">重要事项</view>
		<view class="important_matters">
			<view class="liji_qianwang important_liji_qianwang" 
			:style="{background:wxa_shop_nav_bg_color,border: wxa_shop_nav_bg_color+ ' 2rpx solid'}">立即前往</view>
			<view style="font-size: 26rpx;">签订电子合同</view>
		</view>
		<view class="important_matters">
			<view class="liji_qianwang important_liji_qianwang" v-if="user_info.my_zizhi_list != ''"
				style="padding-left: 24rpx;padding-right: 24rpx;"  
				:style="{background:wxa_shop_nav_bg_color,border: wxa_shop_nav_bg_color+ ' 2rpx solid'}">已完成</view>
			<view class="liji_qianwang important_liji_qianwang" v-if="user_info.my_zizhi_list == ''"
			 :style="{background:wxa_shop_nav_bg_color,border: wxa_shop_nav_bg_color+ ' 2rpx solid'}" 
			 @tap="go_to_gongsi_zizhi">立即前往</view>
			<view style="font-size: 26rpx;">绑定公司资质</view>
		</view>
		<view class="important_matters" v-if="">
			<view v-if="!fenxiao_info.alipay_account && !fenxiao_info.bank_account" 
			 class="liji_qianwang important_liji_qianwang"
			 :style="{background:wxa_shop_nav_bg_color,border: wxa_shop_nav_bg_color+ ' 2rpx solid'}" 
			 @tap="go_to_tixian()">立即前往</view>
			<view v-if="fenxiao_info.alipay_account || fenxiao_info.bank_account" 
			 class="liji_qianwang important_liji_qianwang" 
			 style="padding-left: 24rpx;padding-right: 24rpx;"
			 :style="{background:wxa_shop_nav_bg_color,border: wxa_shop_nav_bg_color+ ' 2rpx solid'}">已完成</view>
			<view style="font-size: 26rpx;">开通提现账户</view>
		</view>
		
		<view style="width: 100%;height:20rpx;background-color: #f2f2f2;"></view>
		
		<view  style="display: flex;flex-wrap: wrap;width: 96%;padding: 2%;margin-top: 30rpx;">
			<view class="daohang_pic_text" @tap="go_to_invitation_agent">
				<view class="daohang_image" >
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/yaoqing_daili.png" class="image_daixia"></image>
				</view>
				<view class="daohang_text">邀请代理</view>
			</view>
			
			<view class="daohang_pic_text"  @tap="toOrderList()">
				<view class="daohang_image" >
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/my_order.png" class="image_daixia"></image>
				</view>
				<view class="daohang_text">我的订单</view>
			</view>
			
			<view class="daohang_pic_text" @tap="go_to_myteam">
				<view class="daohang_image" >
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/myteam.png" class="image_daixia"></image>
				</view>
				<view class="daohang_text">我的团队</view>
			</view>
			
			<view class="daohang_pic_text"  @tap="go_to_profit_summary">
				<view class="daohang_image" >
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/shouyi_huizong.png" class="image_daixia"></image>
				</view>
				<view class="daohang_text">收益汇总</view>
			</view>
			
			<view class="daohang_pic_text" @tap="go_to_profit_center">
					<view class="daohang_image" >
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/shouyi_center.png" class="image_daixia"></image>
					</view>
					<view class="daohang_text">收益中心</view>
			</view>
			
				
			<view class="daohang_pic_text" @tap="to_union_order_list">
				<view class="daohang_image" >
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/lianmeng_order.png" class="image_daixia"></image>
				</view>
				<view class="daohang_text">联盟订单</view>
			</view>
			

			<view class="daohang_pic_text" @tap="go_to_gongsi_zizhi">
					<view class="daohang_image" >
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/company_zizhi.png" class="image_daixia"></image>
					</view>
					<view class="daohang_text">公司资质</view>
			</view>
			

			<view class="daohang_pic_text" @tap="go_to_tixian">
					<view class="daohang_image" >
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/Withdrawal_zhanghu.png" class="image_daixia"></image>
					</view>
					<view class="daohang_text">提现账户</view>
			</view>
				
			
			<view class="daohang_pic_text">
					<view class="daohang_image" >
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/contract.png" class="image_daixia"></image>
					</view>
					<view class="daohang_text">我的合同</view>
			</view>
			
			
			<view class="daohang_pic_text"  @tap="toMsg">
					<view class="daohang_image" >
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/notice_xiaoxi.png" class="image_daixia"></image>
					</view>
					<view class="daohang_text">消息通知</view>
			</view>
			

			<view class="daohang_pic_text"  @tap="go_to_customer">
				<view class="daohang_image" >
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/mybuyer.png" class="image_daixia"></image>
				</view>
				<view class="daohang_text">我的顾客</view>
			</view>
			
			<view class="daohang_pic_text" v-if="wxa_kefu_button_type==1"  @tap="go_to_phone">
				<view class="daohang_image" >
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/kefu.png" class="image_daixia"></image>
				</view>
				<view class="daohang_text">我的客服</view>
			</view>
			<view class="daohang_pic_text" v-if="wxa_kefu_button_type==2"  @tap="toAdDetails(wxa_kefu_form_url)">
				<view class="daohang_image" >
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/kefu.png" class="image_daixia"></image>
				</view>
				<view class="daohang_text">我的客服</view>
			</view>
			<view class="daohang_pic_text" v-if="wxa_kefu_button_type==3" style="position: relative;">
				<button open-type="contact" style="opacity:0;position: absolute;width: 100%;height: 100%;">
				</button>
				<view class="daohang_image" >
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/kefu.png" class="image_daixia"></image>
				</view>
				<view class="daohang_text" style="">我的客服</view>
			</view>
			
			
			<view class="daohang_pic_text" @tap="go_to_my_integral">
					<view class="daohang_image" >
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/integral.png" class="image_daixia"></image>
					</view>
					<view class="daohang_text">积分</view>
			</view>
			
			<view class="daohang_pic_text" >
					<view class="daohang_image" >
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/train_01.png" class="image_daixia"></image>
					</view>
					<view class="daohang_text">SCP学院</view>
			</view>
			
			
		</view>	
	</view>
</template>

<script>
export default {	
	data() {
		return {
			user_info:'',
			fenxiao_info:'',
			my_xia_grade_level:'',
			wxa_shop_nav_bg_color: '#ea5504',
			wxa_kefu_mobile_num:'',
			wxa_kefu_button_type:'',
			wxa_kefu_form_url:'',
			current_page:1,
			current_daili_fenrun_list:null
		}
	},
	onLoad() {
		var that = this;
		uni.setNavigationBarTitle({
			title:'代理中心'
		})
	
		that.user_info = {};
		that.current_daili_fenrun_list = {};
		that.user_info.supplier_balance_log_yeji_jine_num = 0;
		that.user_info.user_dengji_xiaoshou_renwu = 0;
		that.user_info.userItem_balance_leiji_yongjin = 0.00;
		that.current_daili_fenrun_list.userItem_balance_leiji_yongjin = 0.00;
	
	
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
			
			get_fenxiao_total_amount:function(){
				
				var that = this;
				
				var userInfo = that.abotapi.get_user_info();
				
						
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
					
					},
						fail: function (e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
						},
				});
					
				
			},

			
			//邀请代理
			go_to_invitation_agent:function() {
				
				uni.navigateTo({
					url: '/pages/user/myQR/myQR',
				})
				
			},
			go_to_shop_detail:function(){
				uni.navigateTo({
					url: '/pages/product/goods-list/goods-list?cataid=11006&cataname=最新代理',
				})
			},
			//我的订单
			toOrderList:function() {
				uni.navigateTo({
					url: '/pages/user/order_list/order_list?currentTab=0&otype=0',
				})
			
			},
			//我的团队
			go_to_myteam:function(){
				uni.navigateTo({
					url: '/pages/fenxiao/myteam',
				})
				
			},
			//收益汇总
			go_to_profit_summary:function(){
				uni.navigateTo({
					url: '/pages/fenxiao/profit_summary',
				})
				
			},
			//收益中心
			go_to_profit_center:function(){
				uni.navigateTo({
					url: '/pages/fenxiao/profit_center',
				})
				
			},
			//联盟订单
			to_union_order_list:function() {
				uni.navigateTo({
					url: '/pages/fenxiao/fenxiao_order_list',
				})
				
				
			},
			
			//公司资质
			go_to_gongsi_zizhi:function() {
				
				var last_url = '/pages/fenxiao/fenxiao_center';
							
				var userInfo = this.abotapi.get_user_info();
				if (!userInfo) {
					this.abotapi.goto_user_login(last_url);
			
					return;
				}

				var that = this;
							
				var var_list = Object();
				var url = 'https://yanyubao.tseo.cn/Home/XianmaiShang/zizhi_list/ensellerid/' + this.abotapi.globalData.default_sellerid + '.html'
				that.abotapi.call_h5browser_or_other_goto_url(url, var_list);
			},
			
			//提现账户
			go_to_tixian:function(){
				
				var url = 'https://sls.ddkshop.com/Home/User/income_typelist.html?ensellerid=%ensellerid%&oneclicklogin=%oneclicklogin%';
				
				var var_list = Object();
				
				this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
				
				
				
			},
			//消息列表
			toMsg:function() {
				
				uni.navigateTo({
					url: '/pages/msg/msg',
				})
				
			},
			
		
			//我的顾客
			go_to_customer:function(){
				
				uni.navigateTo({
					url: '/pages/fenxiao/mybuyer',
				})
				
			},
			
			//客服
			go_to_phone(){
				uni.makePhoneCall({
					phoneNumber: this.wxa_kefu_mobile_num,
				})
			},
			toAdDetails:function(url){
				
				if(!url){
					console.log('url为空，不跳转！');
					return;
				}
				
				// var home_url = '/pages/index/index';
				// this.abotapi.goto_user_login(home_url, 'switchTab');
				
				var that = this;
				var var_list = Object();
				
				this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
				
			},
			go_to_my_integral:function () {
				uni.navigateTo({
					url: '/pages/user/logscore',
				})
				
			}
			
		},
	}
</script>

<style>
	.dailiren_xinxi{
		display: flex;
		align-items: center;
		font-size: 26rpx;
		height: 200rpx;
	}
	.daili_image{
		border-radius: 50%;
		width: 100rpx;
		height: 100rpx;

		margin: 10rpx;
	}
	.daili_text{
		color: #ffffff;
		font-size: 26rpx;
		margin: 10rpx;
	}
	.amount_money{
		width: 96%;
		height:150rpx;
		margin-left: 2%;
		border-radius: 12rpx;
		background-color: #ffffff;
		display: flex;
		text-align: center;
		align-items: center;
	}
	.important_matters{
		border-bottom: 1rpx solid #f2f2f2;
		padding: 20rpx;
	}
	.liji_qianwang{
		border: 0.5px solid #EA5504;
		border-radius: 5px;
		background: #ea5504;
		font-size: 26rpx;
		color: #ffffff;
		padding-left: 10rpx;
		padding-right: 10rpx;
		
	}
	.important_liji_qianwang{
		float: right;
		margin-top: -4rpx;
	}
	.daohang_pic_text{
		width: 33%;
		margin-bottom: 30rpx;
	}
	.daohang_image{
		display: flex;
		justify-content: center;
		margin-bottom: 10rpx;
	}
	.daohang_text{
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 26rpx;
		color: #3d3d3d;
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
	.image_daixia{
		width: 40rpx;
		height: 40rpx;
	}
</style>