<template>
	<view class="content">
		
		<!-- 交友 -->
		
		<view  class="content-danshen" v-if="iconid == 10016">
			<view style="width: 100%;text-align: center;">
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/yuangong04.jpeg" style="width: 200rpx;height: 200rpx;border-radius: 50%;margin: 20rpx;"></image>
				<view style="background-color: #12b2fc;border-radius: 20rpx;padding: 20rpx;width: 300rpx;color: #ffffff;margin: 0 auto;">视频相亲中</view>
				<view style="font-weight: bolder;font-size:36rpx;margin-top: 10rpx;">李李</view>
				<view style="display: flex;margin-left: 145rpx;">
					<view style="background-color: #12b2fc;padding: 0rpx 20rpx;border-radius: 20rpx;margin: 20rpx;color: #ffffff;font-size: 22rpx;height: 40rpx;line-height: 40rpx;">26</view>
					<view style="background-color: #fc9439;padding: 0rpx 20rpx;border-radius: 20rpx;color: #ffffff;margin: 20rpx;font-size: 22rpx;height: 40rpx;line-height: 40rpx;">头像已认证</view>
					<view style="background-color: #12b2fc;padding: 0rpx 20rpx;border-radius: 20rpx;margin: 20rpx;color: #ffffff;font-size: 22rpx;height: 40rpx;line-height: 40rpx;">伊对红娘</view>
				</view>
				
			</view>
			<view style="margin-left:50rpx;">cpdd，你是唯一</view>
			<view style="background-color: #ffffff;width: 90%;margin: 0 auto;padding: 20rpx;margin-top: 20rpx;">
				<view style="display: flex; flex-flow: row; justify-content: flex-start;flex-wrap: wrap;">
					<view class="biaoqian">商丘</view>
					<view class="biaoqian">美食</view>
					<view class="biaoqian">旅行</view>
					<view class="biaoqian">音乐</view>
					<view class="biaoqian">各种宅</view>
					<view class="biaoqian">喜欢简单</view>
					<view class="biaoqian">拖延症</view>
					<view class="biaoqian">萝莉控</view>
					<view class="biaoqian">温柔善良</view>
					
				</view>
			</view>
		
			<view style="margin: 50rpx;color: #999999;">相亲ID：298716254</view>
			<view style="margin: 50rpx;color: #999999;">IP属地：上海</view>
			<view style="margin: 50rpx;">收费标准：十只玫瑰花半小时</view>
			<view style="background-color: #12b2fc ;font-size: 50rpx;padding: 10rpx 40rpx;border-radius: 20rpx;width: 80%;text-align:center;color:#ffffff;margin: 0 auto;">发起视频聊天</view>
		</view>
		
		
		<!-- 医疗 -->
		
		<view  class="content-danshen" v-if="iconid == 10018">
			<view style="width: 100%;text-align: center;">
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/bigbeimei.jpg" style="width: 200rpx;height: 200rpx;border-radius: 50%;margin: 20rpx;"></image>
				<view style="background-color: #12b2fc;border-radius: 20rpx;padding: 20rpx;width: 300rpx;color: #ffffff;margin: 0 auto;">视频问诊中</view>
				<view style="font-weight: bolder;font-size:36rpx;margin-top: 10rpx;">李医生</view>
				<view style="display: flex;margin-left: 145rpx;">
					<view style="background-color: #12b2fc;padding: 0rpx 20rpx;border-radius: 20rpx;margin: 20rpx;color: #ffffff;font-size: 22rpx;height: 40rpx;line-height: 40rpx;">26</view>
					<view style="background-color: #fc9439;padding: 0rpx 20rpx;border-radius: 20rpx;color: #ffffff;margin: 20rpx;font-size: 22rpx;height: 40rpx;line-height: 40rpx;">头像已认证</view>
					<view style="background-color: #12b2fc;padding: 0rpx 20rpx;border-radius: 20rpx;margin: 20rpx;color: #ffffff;font-size: 22rpx;height: 40rpx;line-height: 40rpx;">伊对问诊</view>
				</view>
				
			</view>
			<view style="margin-left:50rpx;">为人正直，医术高明！</view>
			<view style="background-color: #ffffff;width: 90%;margin: 0 auto;padding: 20rpx;margin-top: 20rpx;">
				<view style="display: flex; flex-flow: row; justify-content: flex-start;flex-wrap: wrap;">
					<view class="biaoqian">脏和胸部外科</view>
					<view class="biaoqian">泌尿外科</view>
					<view class="biaoqian">神经外科</view>
					<view class="biaoqian">手外科</view>
					<view class="biaoqian">创伤性脑疾病</view>
					<view class="biaoqian">肛肠外科</view>
					<view class="biaoqian">肝胆外科</view>
					<view class="biaoqian">脑外科</view>
					<view class="biaoqian">烧伤外科</view>
				</view>
			</view>
		
			<view style="margin: 50rpx;color: #999999;">医生ID：298716254</view>
			<view style="margin: 50rpx;color: #999999;">IP属地：上海</view>
			<view style="margin: 50rpx;">收费标准：十只玫瑰花半小时</view>
			<view style="background-color: #12b2fc ;font-size: 50rpx;padding: 10rpx 40rpx;border-radius: 20rpx;width: 80%;text-align:center;color:#ffffff;margin: 0 auto;">发起视频聊天</view>
		</view>
		
		
		<!-- 律师 -->
		
		<view  class="content-danshen" v-if="iconid == 10017">
			<view style="width: 100%;text-align: center;">
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/ciqi05.jpg" style="width: 200rpx;height: 200rpx;border-radius: 50%;margin: 20rpx;"></image>
				<view style="background-color: #12b2fc;border-radius: 20rpx;padding: 20rpx;width: 300rpx;color: #ffffff;margin: 0 auto;">视频咨询中</view>
				<view style="font-weight: bolder;font-size:36rpx;margin-top: 10rpx;">张律师</view>
				<view style="display: flex;margin-left: 145rpx;">
					<view style="background-color: #12b2fc;padding: 0rpx 20rpx;border-radius: 20rpx;margin: 20rpx;color: #ffffff;font-size: 22rpx;height: 40rpx;line-height: 40rpx;">26</view>
					<view style="background-color: #fc9439;padding: 0rpx 20rpx;border-radius: 20rpx;color: #ffffff;margin: 20rpx;font-size: 22rpx;height: 40rpx;line-height: 40rpx;">头像已认证</view>
					<view style="background-color: #12b2fc;padding: 0rpx 20rpx;border-radius: 20rpx;margin: 20rpx;color: #ffffff;font-size: 22rpx;height: 40rpx;line-height: 40rpx;">伊对律师</view>
				</view>
				
			</view>
			<view style="margin-left:50rpx;">工欲善其事,必先利其器。</view>
			<view style="background-color: #ffffff;width: 90%;margin: 0 auto;padding: 20rpx;margin-top: 20rpx;">
				<view style="display: flex; flex-flow: row; justify-content: flex-start;flex-wrap: wrap;">
					<view class="biaoqian">离婚纠纷</view>
					<view class="biaoqian">法定继承纠纷</view>
					<view class="biaoqian">买卖合同纠纷</view>
					<view class="biaoqian">金融借款合同纠纷</view>
					<view class="biaoqian">所有权纠纷</view>
					<view class="biaoqian">人格权纠纷</view>
					
				</view>
			</view>
		
			<view style="margin: 50rpx;color: #999999;">律师ID：298716254</view>
			<view style="margin: 50rpx;color: #999999;">IP属地：上海</view>
			<view style="margin: 50rpx;">收费标准：十只玫瑰花半小时</view>
			<view style="background-color: #12b2fc ;font-size: 50rpx;padding: 10rpx 40rpx;border-radius: 20rpx;width: 80%;text-align:center;color:#ffffff;margin: 0 auto;">发起视频聊天</view>
		</view>
		
	</view>
</template>

<script>
export default{
	data() {
		return {
			fenxiao_info:'',
			
			current_iconid:0,
			iconid:0,
		}
	},
	onLoad:function(options)  {
		var that = this;
		
		uni.setNavigationBarTitle({
			title:'个人详情'
		})
		
		if(options.iconid){
			this.current_iconid = options.iconid;
		}
			
		console.log('55555=====>>>',options)
			
		if(options == 10016){
			iconid == 10016;
			// uni.setNavigationBarTitle({
			// 	title:'主播列表' 
			// })
		}
		if(options == 10017){
			iconid == 10017;
			// uni.setNavigationBarTitle({
			// 	title:'律师列表' 
			// })
		}
		if(options == 10018){
			iconid == 10018;
			// uni.setNavigationBarTitle({
			// 	title:'医生列表' 
			// })
		}	
			
		that.get_current_userinfo();
		that.get_shop_icon_index();
		this.iconid = options.iconid;
		
		
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
		
		
		get_shop_icon_index:function(){
			var that = this;
			
			//判断是否登录
			var userInfo = that.abotapi.get_user_info();
			if(!userInfo || !userInfo.userid || !userInfo.checkstr){
				that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
			}
			
			var post_end_point = '/?g=Yanyubao&m=ShopAppWxa&a=get_shop_icon_index';
			var post_data = {
				sellerid: that.abotapi.globalData.default_sellerid,
			};
			
			that.abotapi.abotRequest(post_end_point, post_data, function(res){
				console.log('/?g=Yanyubao&m=ShopAppWxa&a=get_shop_icon_index===>>>', res);
				
				
				
			})
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
	}
}
</script>

<style>
	page {
	  background-color: #f0f3f6;
	}
	.biaoqian{
		border-radius: 20upx;
		color: #999999;
		border: #999999 1rpx solid;
		margin: 10rpx;
		padding: 6rpx;
	}
</style>