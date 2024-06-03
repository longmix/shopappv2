<template>
	<view class="content" style="padding-bottom:50rpx;">
		<view class="content-top">
			<view class="content-top-neirong">
				<view class="content-top-xuanxiang">
					<view class="content-top-yangshi" @click="to_client">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/kehu03.png" style="width: 100rpx; height: 100rpx;"></image>
						<view class="content-top-wenzi-yangshi">录入客户</view>
					</view>
					<view class="content-top-yangshi" @click="to_staff">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/kehu01.png" style="width: 100rpx; height: 100rpx;"></image>
						<view class="content-top-wenzi-yangshi">录入员工</view>
					</view>
					<view class="content-top-yangshi" @tap="to_controller">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/kehu02.png" style="width: 100rpx; height: 100rpx;"></image>
						<view class="content-top-wenzi-yangshi">添加管理员</view>
					</view>
				</view>	
			</view>
		</view>
		<view class="content-zhongshang">
			<view class="content-zhongshang-neirong">
				<view style="text-align: center;">
					<view style="font-weight: bold;">客户</view>
					<view style="margin-top: -50rpx;font-weight: bold;">{{citizen_counter}}人</view>
				</view>
				<view style="text-align: center;">
					<view style="font-weight: bold;">员工</view>
					<view style="margin-top: -50rpx;font-weight: bold;">{{worker_counter}}人</view>
				</view>
				<view style="text-align: center;">
					<view style="font-weight: bold;">督导员</view>
					<view style="margin-top: -50rpx;font-weight: bold;">{{supervisor_counter}}人</view>
				</view>
				<view style="text-align: center;">
					<view style="font-weight: bold;">今日考勤</view>
					<view style="margin-top: -50rpx;font-weight: bold;">{{today_checkin_counter}}</view>
				</view>
			</view>
		</view>
		<view class="content-kong"></view>
		
		<view style="margin-top: 5rpx;">	
			<view class="content-middle-title">
				<!-- <view class="content_title_lankuang"></view> -->
				<view class="content-title-wenzi" style="border-left: 10rpx solid #0C0CFF;padding-left: 20rpx;margin-left: 10rpx;">人员管理</view>
			</view>
			<view class="content_classify">
				<view style="width: 28%; text-align: center; margin-top: 30rpx;" @tap="kehuguanli">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/客户管理.png" style="width: 90rpx;height: 90rpx;"></image>
					<view class="content_classify-wenzi">客户管理</view>
				</view>
				<view class="content-middle-yangshi" @tap="yuangongguanli">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/员工管理.png" style="width: 90rpx;height: 90rpx;"></image>
					<view class="content_classify-wenzi">员工管理</view>
				</view>
				<view class="content-middle-yangshi" @tap="guanlianguanxi">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/伙伴关系1.png" style="width: 90rpx;height: 90rpx;"></image>
					<view class="content_classify-wenzi">关联关系</view>
				</view>
			</view>
		</view>
		<view class="content-middle">
			<view class="content-middle-title">
				<view class="content-title-wenzi" style="border-left: 10rpx solid #0C0CFF;padding-left: 20rpx;margin-left: 10rpx;">数据管理</view>
			</view>
			<view class="content_classify">
				<view style="width: 28%; text-align: center; margin-top: 30rpx;" @tap="kaoqinjilu">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/考勤记录.png" style="width: 90rpx;height: 90rpx;"></image>
					<view class="content_classify-wenzi">考勤记录</view>
				</view>
				<view class="content-middle-yangshi" @tap="dudaofankui">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/督导反馈.png" style="width: 90rpx;height: 90rpx;"></image>
					<view class="content_classify-wenzi">督导反馈</view>
				</view>
				<view class="content-middle-yangshi" @tap="guyongbaomu">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/保姆.png" style="width: 90rpx;height: 90rpx;"></image>
					<view class="content_classify-wenzi">雇佣保姆</view>
				</view>
			</view>
		</view>
		<view class="content-middle">
			<view class="content-middle-title">
				<view class="content-title-wenzi" style="border-left: 10rpx solid #0C0CFF;padding-left: 20rpx;margin-left: 10rpx;">报表管理</view>
			</view>
			<view class="content_classify">
				<view style="width: 28%; text-align: center; margin-top: 30rpx;" @tap="fuwutongji">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/15-统计表.png" style="width: 90rpx;height: 90rpx;"></image>
					<view class="content_classify-wenzi">服务内容统计</view>
				</view>
			</view>
		</view>
		<view class="content-middle">
			<view class="content-middle-title">
				<view class="content-title-wenzi" style="border-left: 10rpx solid #0C0CFF;padding-left: 20rpx;margin-left: 10rpx;">权限管理</view>
			</view>
			<view class="content_classify">
				<view style="width: 28%; text-align: center; margin-top: 30rpx;" @tap="fenzu_list">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/分组表.png" style="width: 90rpx;height: 90rpx;"></image>
					<view class="content_classify-wenzi">分组列表</view>
				</view>
				<view style="width: 28%; text-align: center; margin-top: 30rpx;" @tap="houtairenyuan_list">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/系统管理员管理.png" style="width: 90rpx;height: 90rpx;"></image>
					<view class="content_classify-wenzi">后台人员列表</view>
				</view>
				<view style="width: 28%; text-align: center; margin-top: 30rpx;" @tap="lijibaoming">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/培训报名.png" style="width: 90rpx;height: 90rpx;"></image>
					<view class="content_classify-wenzi">立即报名</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import jiazhengApi from './common/abotapiJiazhenggongsi.js';
	
	
	export default {
		
		data() {
			return {
				//商城的Logo、导航栏背景颜色和文字颜色
				wxa_shop_operation_logo_url:'',
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				
				is_ok:'已经到底了~',
				modal_message:false,
				// search_text:'', //搜索用的文字
				
				current_adminuserid:0,
				
				citizen_counter:0, 
				worker_counter:0, 
				supervisor_counter:0, 
				today_checkin_counter:0, 
				
			}
			
		},
		onLoad(options) {
			var that = this;
			
			uni.setNavigationBarTitle({
				title: that.page_title,
			});
			
			//var userInfo = that.abotapi.get_user_info();
			//console.log('check_user8888_login ==>> userInfo ===>>> ', userInfo);

			jiazhengApi.check_user_login();
			jiazhengApi.get_current_adminuserid(options, that);
			
			console.log('current_adminuserid ===>>> ', that.current_adminuserid);
			
			that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);
		},
		//上拉加载 触底操作
		onReachBottom() {
			if(this.current_page != 2){
				uni.showLoading({
					title:'正在加载中~',
				});
				
				setTimeout(function () {
					uni.hideLoading();
				}, 1500);
				
				//分页page加1
				this.current_page++;
				
				//分页
				// this.__load_course_list_from_server(this.current_cata_name);
			};
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		
			console.log('onPullDownRefresh onPullDownRefresh onPullDownRefresh');
		
			uni.showToast({
				title: '数据更新中……',
				//icon:'loading'
			});
			
			
			setTimeout(function() {
				uni.stopPullDownRefresh();
			
				uni.hideToast();
			
			}, 1000);
	
		},
		methods:{
			//这是每个vue文件都必须执行的回调函数，用于渲染头部导航栏背景色和文字颜色
			callback_function_shop_option_data: function(that, cb_params) {
				
				console.log('callback_function_shop_option_data===>>>', cb_params);
			
				uni.showLoading({
					title: '正在加载中'
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 1000);
				
				//商城的Logo、导航栏背景颜色和文字颜色
				that.wxa_shop_operation_logo_url = cb_params.option_list.wxa_shop_operation_logo_url;
				that.wxa_shop_nav_bg_color = cb_params.option_list.wxa_shop_nav_bg_color;
				that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
			
				//加载所有分类的课程列表
				// that.current_cata_name = '';
				// that.current_cata_list = null;
				// that.current_page = 1;
				// that.__load_course_list_from_server(that.current_cata_name);
				
				var userInfo = that.abotapi.get_user_info();
											
				// that.userInfo = userInfo;
				var post_end_point = '/openapi/JiazhenggongsiData/get_basic_data';
				var post_data = {
					sellerid: that.abotapi.get_sellerid(),
					checkstr: userInfo.checkstr,
					userid: userInfo.userid,
					adminuserid: that.current_adminuserid,
				};
				
				

				jiazhengApi.requestServer(post_end_point, post_data, function(res){
					console.log('/openapi/JiazhenggongsiData/get_basic_data===>>>', res);
					
					that.citizen_counter = res.data.data.citizen_counter;
					that.worker_counter = res.data.data.worker_counter;
					that.supervisor_counter = res.data.data.supervisor_counter;
					that.today_checkin_counter = res.data.data.today_checkin_counter;
					
				});	
			},
			
			callback_request_jiazheng_success:function(res){
				//这里还会返回界面上需要的参数，包括客户、员工的数量等
			},
			
			kehuguanli:function(){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/citizen_list');
			},
			yuangongguanli:function(){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/worker_list');
			},
			guanlianguanxi:function(){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/relevance_list');
			},
			kaoqinjilu:function(){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/checkin_list');
			},
			dudaofankui:function(){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/result_list');
			},
			guyongbaomu:function(){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/service_list');
			},
			fuwutongji:function(){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/tongji_list');
			},
			fenzu_list:function(){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/group_list');
			},
			houtairenyuan_list:function(){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/admin_list');
			},
			lijibaoming:function(){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/worker_edit');
			},
			
			//跳转到录入客户
			to_client:function(){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/citizen_edit');
			},
			
			//跳转到录入员工
			to_staff:function(){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/worker_edit');
			},
			
			//跳转到录入管理员
			to_controller:function(){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/admin_edit');
			},
		}
	}	
</script>

<style lang="scss">
	.content-middle-title{
		// flex-flow: row;
		// justify-content: flex-start;
		// display: flex;
		margin-top: 20rpx;
	}
	.content-title-wenzi{
		height: 50rpx;
		line-height: 50rpx;
		color: #555555;
		font-weight: bold;
	}
	.content-top{
		height:300rpx;
		width: 100%;
		background-color: #2d96ff;
		
	}
	.content-top-neirong{
		width: 100%;
		margin:0 auto;
	}
	.content-top-xuanxiang{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-top: 50rpx;
	}
	.content-zhongshang{
		height:100rpx;
		margin-top: -20rpx;
		background-color: #fff;
		border-radius: 30rpx;
	}
	.content-zhongshang-neirong{
		width: 90%;
		margin: 0 auto;
		line-height:100rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		
		
	}
	.content-kong{
		margin-top: 40rpx;
		height: 40rpx;
		background-color: #f1f1f1;
	}
	.content_classify{
		width: 90%;
		margin: 0 auto;
		margin-top: 20rpx;
		flex-flow: row;
		justify-content: flex-start;
		display: flex;
	}
	.content-top-yangshi{
		width: 33%;
		text-align: center;
	}
	.content-middle-yangshi{
		width: 28%;
		text-align: center;
		margin-left: 20rpx;
		margin-top: 30rpx;
	}
	.content-middle{
		margin-top: 40rpx;
	}
	.content_classify-wenzi{
		margin-top: 20rpx;
		color: #555555;
	}
	.content-top-wenzi-yangshi{
		color: #ffffff;
		font-size: 32rpx;
		font-weight:500;
		margin-top: 10rpx;
	}
	
	
</style>