<template>
	<view class="content">
		<view v-if="is_worker_role != 1"
			class="home_page" style="bottom: 15%;" :style="{background: wxa_shop_nav_bg_color}">
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/录入.png"></image>
			<view :style="{color:wxa_shop_nav_font_color}">录入</view> <!--  @click="toPagemy" -->
		</view>
		
		<!-- <view class="content-top">
			<view class="input-box"> --> <!-- 点击搜索  @click="toSearch()" -->
				<!-- <input placeholder="搜索姓名、地址、手机号或身份证" placeholder-style="color:#c0c0c0;" disabled="true" style="background: #F0F3F6; margin: 0 auto;width: 80%;"/>
				<view class="icon search"></view>
			</view>
		</view> -->
		<view  v-for="(item , index) in checkin_list_list" :key="index">
			<view class="content-list">
				<view class="content-list-hangyi" style="display: flex; justify-content: space-around; align-items: center;">
					
					<view style="display: flex;flex-direction: column;align-items: center;width: 280rpx; text-align: left;">
						<view class="font01">{{item.worker_name}}</view>
						
					</view>
					
					
					<view style="display: flex; align-items: center; width: 150rpx;">
						<view style="width: 100rpx; border-top-style: ridge;"></view>
						<view class="jiantou"> </view>
					</view>
					
					<view style="display: flex;flex-direction: column;align-items:center;width: 280rpx; text-align: right;">
						<view class="font01">{{item.citizen_name}}</view>
						
					</view>
					
					
					<!-- <image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/更多.png" class="content-list-more" @tap="modal_message = !modal_message"></image> -->
				</view>
				<view class="content-list-neirong" style=" display: flex; justify-content: space-around;">
					<view class="font02">员工 </view>
					<view style="width: 209rpx;"> </view>
					<view class="font02">客户 </view>
				</view>
				
				<view class="content-list-neirong">
					<view style="display: flex; align-items: center;">
						<view class="font02">签到时间：&nbsp;&nbsp;</view>
						<view class="font03">{{item.checkin_time}}</view>
					</view>
				</view>
				<view class="content-list-neirong">
					<view style="display: flex; align-items: center;">
						<view class="font02">签到时长：&nbsp;&nbsp;</view>
						<view class="font03">{{item.total_time}}</view>
					</view>
				</view>
				<view class="content-list-neirong">
					<view style="display: flex; align-items: center;">
						<view class="font02">签到误差：&nbsp;&nbsp;</view>
						<view class="font03">10m</view>
					</view>
				</view>
				<view class="content-list-neirong">
					<view style="display: flex; align-items: center;">
						<view class="font02">签到地址：&nbsp;&nbsp;</view>
						<view class="font03">{{item.check_address}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="loading">
			{{ is_ok }}
		</view>
		
		
		<view class="modal" v-if="modal_message">
			<!-- 背景部分，100%满屏 -->
			<view id="open-modal" class="modal-window">
				<!-- 弹框主题 -->
				<view>
					<view class="modal-zhuti">
						<view class="modal-diyi"  @tap="modal_message = false">
							<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/客户管理.png" class="modal-img"></image>
							<text style="margin-left: 10rpx;color: #7F7F7F;">客户列表</text>
							<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/向右1.png" style="float: right;height: 50rpx;width: 50rpx;"></image>
							<view class="modal-fengexian"></view>
						</view>
						<view class="modal-dier">
							<view class="modal-edit">  <!-- @tap="modal_edit_edit" -->
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/修改.png" class="modal-img2"><text>修改</text></image>
							</view>
							<view class="modal-edit" style="margin-left: 40rpx;">
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/删除.png" class="modal-img2"><text>删除</text></image>
							</view>
						</view>
						<view class="modal-disan">
							<text>查看详细信息</text>
							<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/向右1.png" style="float: right;height: 50rpx;width: 50rpx;margin-top: 15rpx"></image>
						</view>
						<view class="modal-disi"  @tap="modal_message = false">
							<view style="color: #F0F3F6;font-size: 36rpx;">取&nbsp;&nbsp;&nbsp;&nbsp;消</view>
						</view>
						
					</view>
			
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	/**
	 * 这个界面是给某个家政公司的管理员查看公司员工的签到情况的，
	 * 员工查看自己的签到情况，也在这个界面，带参数 adminuserid=1234，如果等于-1，则清空
	 * 页面： /pages/checkin/checkin 是之前给care421定制的临时功能，未来扩展为读取延誉宝后台的签到记录列表，而不是家政公司的。
	 */
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
				citizen_name:'',
				worker_name:'',
				checkin_time:'',
				total_time:'',
				distance:'',
				checkin_list_list:[],
				
				current_page:1, //分页
				
				current_adminuserid:0,	//这里只是声明，在函数中 jiazhengApi.get_current_adminuserid 赋值
				
				is_worker_role:0,	//是否为员工的角色打开这个界面？
			}
			
		},
		onLoad:function(options) {
			var that = this;
			
			uni.setNavigationBarTitle({
				title: that.page_title,
			});
			
			jiazhengApi.check_user_login();
			
			//2023.11.2.如果带有参数 adminuserid
			if(options.adminuserid == -1){
				uni.removeStorageSync('jiazhenggongsi_adminuserid');
				
				jiazhengApi.get_current_adminuserid(options, that);
			}
			else if(options.adminuserid){
				uni.setStorageSync('jiazhenggongsi_adminuserid', options.adminuserid);
				
				that.current_adminuserid = options.adminuserid;
				that.is_worker_role = 1;
			}
			else{
				//如果没有指定adminuserid，则是管理员，所以需要验证身份
				jiazhengApi.get_current_adminuserid(options, that);
			}
			
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
				this._checkin_list(this.current_cata_name);
			};
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		
			console.log('onPullDownRefresh onPullDownRefresh onPullDownRefresh');
		
			uni.showToast({
				title: '数据更新中……',
				//icon:'loading'
			});
			
			this.current_page = 1;
			setTimeout(function() {
				uni.stopPullDownRefresh();
			
				uni.hideToast();
			
			}, 1000);
			
			this.checkin_list_list = [];
			
			this.abotapi.set_shop_option_data(this,
				this.callback_function_shop_option_data
			);
		},
	
	methods: {
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
			
			
			that._checkin_list();	
		
			//加载所有分类的课程列表
			// that.current_cata_name = '';
			// that.current_cata_list = null;
			// that.current_page = 1;
			// that.__load_course_list_from_server(that.current_cata_name);
			
			
		},
		callback_request_jiazheng_success:function(res){
				//这里还会返回界面上需要的参数，包括客户、员工的数量等
		},
			
		
		//请求客户列表
		_checkin_list:function(){
			var that = this;
			
			//判断是否登录
			var userInfo = that.abotapi.get_user_info();
			if(!userInfo || !userInfo.userid || !userInfo.checkstr){
				that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
			}
			
			
			var post_end_point = '/openapi/JiazhenggongsiData/checkin_list';
			var post_data = {
				sellerid: that.abotapi.get_sellerid(),
				page:that.current_page,
				checkstr: userInfo.checkstr,
				userid: userInfo.userid,
				adminuserid: that.current_adminuserid,
			};
			
			//判断是否有实体商家对应的身份的userid
			//if(that._current_adminuserid > 0){
			//	post_data.adminuserid = that._current_adminuserid;
			//}
			if(that.is_worker_role == 1){
				post_data.is_worker_role = 1;
			}
			
			
			jiazhengApi.requestServer(post_end_point, post_data, function(res){
				
				console.log('/openapi/JiazhenggongsiData/checkin_list===>>>', res);
				
				// that.worker_mobile = res.data.relevance_list.worker_mobile;
				// that.citizen_mobile = res.data.relevance_list.citizen_mobile;
				// that.end_time = res.data.relevance_list.end_time;
				// that.start_time = res.data.relevance_list.start_time;
				// that.relevance_list_list = res.data.relevance_list;
				if(!that.checkin_list_list){
					that.checkin_list_list = [];
				}
				
				for(var i=0;i<res.data.checkin_list.length;i++){
					console.log('asdasda==sssss=>>>',res.data.checkin_list[i])
					
					that.checkin_list_list.push(res.data.checkin_list[i]);
				};
				
				console.log('asdasda===>>>',that.checkin_list_list)
				
			});
		},
		
		
		modal_edit_edit:function(){
			// this.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/');
		},
	},
	}
</script>

<style>
	@import './static/css/jiazhenggongsi_list.css';
	
	.jiantou{
		width: 0;  
		height: 0;  
		border-top: 14rpx solid transparent;  
		border-bottom: 14rpx solid transparent;  
		border-left: 14rpx solid #000;  
		transform: rotate(0deg);
	}
	.font01{
		font-size: 35rpx;
		font-weight: 400;
		color: #333333;
	}
	.font02{
		font-size: 24rpx;
		color: #666666;
	}
	.font03{
		font-size: 28rpx;
		color: #2a2a2a;
	}
</style>