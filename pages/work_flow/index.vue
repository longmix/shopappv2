<!-- 首页 -->
<template>
	<view>
		<view class=""
			style="height: 80rpx;width: 710rpx;background-color: #e4751b;color: #ffffff;border-radius: 20rpx 20rpx 0rpx 0rpx;margin: 0 auto;margin-top: 20rpx;padding-left: 40rpx;display: flex;align-content: center;">
			<view class="">
				<p style="left: 40rpx;margin-top: 20rpx;color: #ffffff;">今日</p>
			</view>
		</view>
		<view class=""
			style="height: 200rpx;width: 750rpx;background-color: #ff821e;color: #ffffff;border-radius: 0rpx 0rpx 20rpx 20rpx;margin: 0 auto;padding-top: 40rpx;">
			<u-grid :col="3">
				<u-grid-item @click="goto_work_flow()">
					<view class="u-font-26">接单个数</view>
					<p class="" style="font-size: 75rpx;margin-top: 20rpx;">{{work_flow_option.counter_today_user_flow_status_1}}</p>
				</u-grid-item>
				<u-grid-item @click="goto_work_flow()">
					<view class="u-font-26">完工个数</view>
					<p class="" style="font-size: 75rpx;margin-top: 20rpx;">{{work_flow_option.counter_today_user_flow_status_3}}</p>
				</u-grid-item>
				<u-grid-item>
					<view class="u-font-26">完工金额</view>
					<p class="" style="font-size: 75rpx;margin-top: 20rpx;">{{work_flow_option.amount_today_user_flow_status_3}}</p>
				</u-grid-item>
			</u-grid>
		</view>
		<!-- <view class=""
			style="height: 180rpx;width: 750rpx;background-color: #ffffff;border-radius: 40rpx;margin: 0 auto;margin-top: 20rpx;">
			<u-grid :col="4">
				<u-grid-item @click="goto_work_flow()">
					<u-badge count="9" :offset="[20, 20]"></u-badge>
					<u-icon name="photo" :size="46"></u-icon>
					<view class="grid-text">工单</view>
				</u-grid-item>
				<u-grid-item>
					<image src="/static/image/icon/hot5.png" class="badge-icon"></image>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">工单设置</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="hourglass" :size="46"></u-icon>
					<view class="grid-text">客户</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="hourglass" :size="46"></u-icon>
					<view class="grid-text">商品</view>
				</u-grid-item>
			</u-grid>
		</view> -->
		
		
		<!-- 我接单的，车务，user -->
		<view v-if="is_user_role == 1 || is_user_role == 2">
			<p style="margin-top: 34rpx;margin-left: 20rpx;font-size: 35rpx;font-weight: bold;">{{work_flow_option.user_display_name}}</p >
			<view class="" style="display: flex; padding-top: 30rpx;padding-bottom: 30rpx;">
				<view class="box" @click="goto_work_flow(0, is_user_role)">
					<view class="box_num">{{work_flow_option.counter_user_flow_status_0}}</view>
					<view class="box_text">新工单</view>
				</view>
				
				<view class="box" @click="goto_work_flow(1, is_user_role)">
					<view class="box_num">{{work_flow_option.counter_user_flow_status_1}}</view>
					<view class="box_text">受理中</view>
				</view>
				
				<view class="box" @click="goto_work_flow(2, is_user_role)">
					<view class="box_num">{{work_flow_option.counter_user_flow_status_2}}</view>
					<view class="box_text">待回复</view>
				</view>
				
				<view class="box" @click="goto_work_flow(3, is_user_role)">
					<view class="box_num">{{work_flow_option.counter_user_flow_status_3}}</view>
					<view class="box_text">已完成</view>
				</view>
			</view>
		</view>
		<!-- 我接单的======end -->
		
		
		
		<!-- 我提交的，供应商，member -->
		<view>
			<p style="margin-top: 34rpx;margin-left: 20rpx;font-size: 35rpx;font-weight: bold;">{{work_flow_option.member_display_name}}</p >
			<view class="" style="display: flex; padding-top: 30rpx;padding-bottom: 30rpx;">
					<view class="box" @click="goto_work_flow(0, 0)">
						<view class="box_num">{{work_flow_option.counter_member_flow_status_0}}</view>
						<view class="box_text">新工单</view>
					</view>
					
					<view class="box" @click="goto_work_flow(1, 0)">
						<view class="box_num">{{work_flow_option.counter_member_flow_status_1}}</view>
						<view class="box_text">受理中</view>
					</view>
					
					<view class="box" @click="goto_work_flow(2, 0)">
						<view class="box_num">{{work_flow_option.counter_member_flow_status_2}}</view>
						<view class="box_text">待回复</view>
					</view>
					
					<view class="box" @click="goto_work_flow(3, 0)">
						<view class="box_num">{{work_flow_option.counter_member_flow_status_3}}</view>
						<view class="box_text">完成</view>
					</view>
				</view>
		</view>
		<!-- 我提交的====end -->
		
		
		<view>
			<u-popup :show="show_flow_type" @close="close_win_choose_model" @open="open_win_choose_model" mode="bottom" :round="10" :safeAreaInsetBottom="true">
				<text style="font-weight: bold;margin: 20rpx;">选择工单类型</text>
				<view v-for="(item,index) in work_flow_form" :key="index">
					<u-cell-group>
						<u-cell :title="item.ticket_model_name" @click="goto_flow_form(item.ticket_model_number)"></u-cell>
					</u-cell-group>

				</view>
			</u-popup>
			<!-- <u-button @click="show_flow_type = true">打开</u-button> -->
			<view class="home_page"
				style="bottom: 10%;float: right;background-color: #e4751b;border-radius: 50%;padding: 20rpx;"
				@click="show_flow_type = true">
				<!-- <u-icon name="plus" :size="28" color="#ffffff" style="font-size: 80rpx;"></u-icon> -->
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiahao02.png"></image>
				<view class="nav_right_icon" :style="{color:wxa_shop_nav_font_color}">创建</view>
			</view>
		</view>
		
		
		<view>
		   
		  </view>
		  

		<abot-tab-bar   v-if="is_user_role == 1  || is_user_role == 2"  :list="tabbar_list1" :current_index="0" style="position:fixed;bottom:0;width:100%;left:0;right:0;"
			@tabChange="tabChange"></abot-tab-bar>
		<abot-tab-bar v-if="is_user_role == 0" :list="tabbar_list2" :current_index="0" style="position:fixed;bottom:0;width:100%;left:0;right:0;"
			@tabChange="tabChange"></abot-tab-bar>
	</view>
</template>

<script>
	import abotTabBar from '@/components/abot-tabbar.vue'
	import work_flow_api from './common/work_flow_api.js'
	
	
	export default {
		components: {
			abotTabBar
		},
		data() {
			return {
				wxa_shop_nav_bg_color: '',
				wxa_shop_nav_font_color:'',
				work_flow_form: [],
				show_flow_type: false,
				tabbar_list1: work_flow_api.tabbar_list1,
				tabbar_list2: work_flow_api.tabbar_list2,
				
				
				is_user_role:0,//当前的menber账号是否有user权限
				
				work_flow_option:{
					counter_user_flow_status_0:0,
					counter_user_flow_status_1:0,
					counter_user_flow_status_2:0,
					counter_user_flow_status_3:0,
					counter_member_flow_status_0:0,
					counter_member_flow_status_1:0,
					counter_member_flow_status_2:0,
					counter_member_flow_status_3:0,
				},
				
				//测试uCharts
				cWidth: 750,
				cHeight: 500
			}
		},
		
		onLoad(options) {
		

			var that = this;

			// var systemInfo;

			// uni.getSystemInfo({
			// 	success: function(res) {
			// 		console.log(res)
			// 		systemInfo = JSON.stringify({
			// 			benchmarkLevel: res.benchmarkLevel,
			// 			language: res.language,
			// 			safeArea: res.safeArea,
			// 			screenHeight: res.screenHeight,
			// 			windowHeight: res.windowHeight,
			// 			version: res.version,
			// 			system: res.system,
			// 			pixelRatio: res.pixelRatio,
			// 			windowWidth: res.windowWidth,
			// 			model: res.model,
			// 			screenWidth: res.screenWidth,
			// 			brand: res.brand,
			// 			platform: res.platform,
			// 			SDKVersion: res.SDKVersion,
			// 		})
			// 		uni.setStorageSync(
			// 			"set_key",
			// 			systemInfo
			// 		)
			// 	}
			// });
			
			console.log('work_flow_api.work_flow_server ===>>> ', work_flow_api.work_flow_server);
			console.log('work_flow_api.tabbar_list1 ===>>> ', work_flow_api.tabbar_list1);
			console.log('work_flow_api.tabbar_list2 ===>>> ', work_flow_api.tabbar_list2);
			//检查用户是否登陆
			if( !work_flow_api.is_yanyubao_user_login() ){
				return;
			}
			
			this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
			
			
			
			
			/**
			 * 测试验证两个POST的集成登录接口函数
			work_flow_api.abotRequest({
				url: work_flow_api.work_flow_server + '/?g=API&m=Index&a=login_from_yanyubao',
				data: {
					userid:'106',
					checkstr:'54abe80321943663718dcc4d4b4374d9',
					key_md5:'37096f27f7072203e1e47bef8e378566',
					mobile_number:'13112341234'
				},
				method: "POST",
				success: function(http_res) {
					console.log('工单列表--->>>', http_res)
					
					
					work_flow_api.abotRequest({
						url: work_flow_api.work_flow_server + '/?g=API&m=Index&a=get_app_token',
						data: {
							userid:'106',
							checkstr:'54abe80321943663718dcc4d4b4374d9',
							systemInfo:'systemInfosystemInfosystemInfosystemInfosystemInfo'
						},
						method: "POST",
						success: function(http_res) {
							console.log('工单列表--->>>', http_res)
							console.log('work_flow_form--->>>', http_res.data.data.token)
					
						}
					});
			
				}
			})*/
			
			
			// this.getServerData();

			


		},
		onShow() {
			this.get_index_page_data();
		},
		onPullDownRefresh() {
			
			// setTimeout(function () {
			// 	console.log('start pulldown');
			// }, 1000);
			
			console.log('开始下拉onPullDownRefresh刷新');
			
			
			this.get_index_page_data();

			console.log('refresh');
			setTimeout(()=>{
				uni.showToast({
					icon:'success',
					title: '刷新完成',
					
				});
				uni.stopPullDownRefresh();
			}, 2000);
		},
		onShareAppMessage: function () {
			console.log('==================>>>onShareAppMessage');
			
			return this.share_return(true);
			
		},
		
		onShareTimeline: function () {
			console.log('==================>>>onShareTimeline');
			
			return this.share_return();
		},
		onAddToFavorites: function () {
			console.log('==================>>>onAddToFavorites');
			
			return this.share_return();
		},
		methods: {
			share_return: function(is_share_app=false) {
				var that = this;
				
				var option_list = this.abotapi.globalData.option_list;
				// console.log('option_list==================>>>onAddToFavorites',option_list);
				
				
				//分享的小程序标题
				var share_title = option_list.wxa_share_title;
				
				if (share_title.length > 22) {
					share_title = share_title.substr(0, 20) + '...';
				}
				
				//不需要参数
				var share_path = '' ;
				
				
				//分享的小程序图片
				var share_img = option_list.wxa_share_img;
						
				if(is_share_app){
					return {
						title: share_title,
						path: 'pages/work_flow/index',
						imageUrl: share_img,
					}
					
				}
				
				return {
					title: share_title,
					query: share_path,
					imageUrl: share_img,
				}
			},
			callback_function_shop_option_data:function(that, cb_params){
				
				console.log('当前调试开关22：' + this.system_debug_flag);
				console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);
				
				if(!cb_params){
					return;
				}
				
				console.log('cb_params====', cb_params);
				
				//var userInfo = that.abotapi.get_user_info();
				
				
				//====1、更新界面的颜色
				//that.abotapi.getColor();
				
				
				if(!cb_params.option_list){
					return;
				}
				
				if(cb_params.option_list.shutdown_website_status == 1){
					//跳转到网站关闭的提示页面
					console.log("跳转到网站关闭的提示页面");
					
					uni.reLaunch({
						url:'/pages/main/shutdown_website/shutdown_website'
					})
					
					return;
				}
				
				that.wxa_shop_nav_bg_color = cb_params.option_list.wxa_shop_nav_bg_color;
				that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
			},
			
			get_index_page_data(){
				var that = this;
				
				work_flow_api.check_user_login((app_token)=>{
					if(!app_token){
						console.log('获取用户的登录token失败');
						return;
					}
					
					var user_token = app_token.token;
					
					//判断当前member是否有user权限
					that.is_user_role = app_token.is_user_role;
					
					//请求工单各个流程的工单统计数量
					var post_url = work_flow_api.work_flow_server + '/?g=API&m=Index&a=get_work_flow_option';
					var post_data = {
						token: user_token,
						is_user_role: that.is_user_role,
					};
					
					work_flow_api.abotRequest({
						url:  post_url,
						data: post_data,
						method: "POST",
						success: function(http_res) {
							
							console.log('工单列表--->>>', http_res)
							
							if(http_res && http_res.data){
								that.work_flow_option = http_res.data.data;
								
								console.log('work_flow_option--->>>', that.work_flow_option);
							}
							
						}
					});
					
					
					//请求工单模型列表
					//请求工单模型列表
					//var get_url = work_flow_api.work_flow_server + '/?g=API&m=Index&a=index&id=3';
					var get_url = work_flow_api.work_flow_server + '/?g=API&m=Index&a=index';
					get_url += '&token=' + user_token;
					
					work_flow_api.abotRequest({
						url:  get_url,
						method: "GET",
						success: function(http_res) {
							console.log('工单列表--->>>', http_res)
							
							if(http_res && http_res.data && http_res.data.data){
								that.work_flow_form = http_res.data.data.ticket
								console.log('work_flow_form--->>>', that.work_flow_form)
							}
							
					
						}
					});
					
					
					
				});
				
			},			
			open_win_choose_model() {
				// console.log('open_win_choose_model');
			},
			close_win_choose_model() {
				this.show_flow_type = false
				// console.log('close_win_choose_model');
			},
			goto_flow_form(ticket_model_number) {
				console.log('aaaaaaaaaaaaaaaaaaaa');
				
				uni.navigateTo({
					url: "/pages/work_flow/flow_form?ticket_model_number=" + ticket_model_number + "&flow_status=0" 
				})
			},
			
			tabChange(index) {
				console.log('tabChange===>>>', index);
				console.log('this===>>>', this);
				if(this.is_user_role == 1 || this.is_user_role == 2){
					var tabbar_item = this.tabbar_list1[index];
				}else{
					var tabbar_item = this.tabbar_list2[index];
				}
				
				if(!tabbar_item){
					console.log('没有index索引');
					return;
				}
				
				var new_url = tabbar_item.new_url;
				
				console.log('准备通过tabbar跳转到==>>', new_url);
				
				this.abotapi.call_h5browser_or_other_goto_url(new_url);
			},
			
			goto_work_flow(ticket_status, is_user_role){
				
				console.log("ticket_status ===>>>>> " + ticket_status)
				console.log("is_user_role ===>>>>> " + is_user_role)
				
				var goto_work_flow_url = "/pages/work_flow/work_flow";
				
				goto_work_flow_url += "?ticket_status=" + ticket_status + '&is_user_role=' + is_user_role;
				
				this.abotapi.call_h5browser_or_other_goto_url(goto_work_flow_url);
				
			},
			
			
			
		

		}
	}
</script>

<style>
	@import './static/css/work_flow.css';

	.box {
		width: 150rpx;
		height: 120rpx;
		background-color: #ffffff;
		margin-left: 30rpx;
		border-radius: 10rpx;
		display: grid;
		align-content: center;
	}

	.box_num {
		font-size: 50rpx;
		margin: 0 auto;
	}

	.box_text {
		font-size: 26rpx;
		color: #999999;
		margin: 0 auto;
	}
</style>

<style scoped lang="scss">
	.badge-icon {
		position: absolute;
		top: 14rpx;
		right: 40rpx;
		width: 30rpx;
		height: 30rpx;
	}

	.grid-text {
		margin-top: 4rpx;
	}
</style>