<template>
	<view class="content">
		<view class="home_page" style="bottom: 15%;" @click="toAdd" :style="{background: wxa_shop_nav_bg_color}">
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/录入.png"></image>
			<view :style="{color:wxa_shop_nav_font_color}">添加</view>
		</view>
		<view class="top-tip">
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/laba.png" class="top-tip-img" style="vertical-align: middle;margin-left: 10rpx;"></image>
			<text style="color:#fa6806; margin-left: 10rpx;display: inline;">专管人员分组不可删除</text>
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/错误提示_填充.png" class="top-tip-img" style="float: right;margin-right: 10rpx;margin-top: 15rpx;" ></image>
			
		</view>
		<view  v-for="(item , index) in group_list_list" :key="index">
			<view class="content-list">
				<view class="content-list-hangyi">
					<text>分组名称:&nbsp;&nbsp;{{item.group_name}}</text>
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/更多.png" class="content-list-more"
					  @tap="show_more_option(item.groupid)"></image>
				</view>
				<view class="content-list-neirong">
					<text>分组人数:&nbsp;&nbsp;{{item.group_number}}</text>
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
						<view class="modal-diyi">
							<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/客户管理.png" class="modal-img"></image>
							<text style="margin-left: 10rpx;color: #7F7F7F;">分组列表 </text>
							
							<view class="modal-fengexian"></view>
						</view>
						<view class="modal-dier">
							<view class="modal-edit">     <!-- @tap="toGrouppower" -->
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/权限.png" class="modal-img2"></image>
								<view style="width:150rpx;margin-left: -30rpx;">权限管理</view>
							</view>
							<!-- <view class="modal-edit" style="margin-left: 60rpx;" @tap="modal_del_del">
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/删除.png" class="modal-img2" ><text>删除</text></image>
							</view> -->
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
				
				
				current_group_name:'',
				group_number:'',
				group_list_list:[],
				
				current_groupid:0,
				
				current_page:1, //分页
				group_name:'',
				
			}
			
		},
		onLoad:function(options) {
			var that = this;
			
			uni.setNavigationBarTitle({
				title: that.page_title,
			});
			
			
			jiazhengApi.check_user_login();
			jiazhengApi.get_current_adminuserid(options, that);
			
			
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
				this._group_list(this.current_cata_name);
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
			this.group_list_list = [];
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
		
			//加载所有分类的课程列表
			// that.current_cata_name = '';
			// that.current_cata_list = null;
			// that.current_page = 1;
			// that.__load_course_list_from_server(that.current_cata_name);
			
			
			
			that._group_list();	
			},
			
			show_more_option:function(groupid){
				console.log('222222222222222222222222=======>',groupid)
				var that = this;
				that.current_groupid = groupid;
				// if(that.current_groupid){
				// 	var that = this;
				// 	var post_end_point = '/openapi/JiazhenggongsiData/group_list';
				// 	var post_data = {
				// 		sellerid: that.abotapi.get_sellerid()
				// 	};
					
				// 	post_data.groupid = that.current_groupid;
				// 	jiazhengApi.requestServer(post_end_point, post_data, function(res){
				// 		console.log('/openapi/JiazhenggongsiData/group_list===>>>', res);
						
				// 		that.group_name = res.data.group_list.group_name;
				// 	});
				// }
				that.modal_message = !that.modal_message;
			},
			callback_request_jiazheng_success:function(res){
				//这里还会返回界面上需要的参数，包括客户、员工的数量等
			},
			
			
			//请求分组列表
			_group_list: function() {				 
				var that = this;
				
				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if(!userInfo || !userInfo.userid || !userInfo.checkstr){
					that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
				}
				
				var post_end_point = '/openapi/JiazhenggongsiData/group_list';
				var post_data = {
					sellerid: that.abotapi.get_sellerid(),
					page:that.current_page,
					checkstr: userInfo.checkstr,
					userid: userInfo.userid,
					adminuserid: that.current_adminuserid,
				};
				
				//判断是否有实体商家对应的身份的userid
				if(that._current_adminuserid > 0){
					post_data.adminuserid = that._current_adminuserid;
				}
				
				//分页
							
				post_data.groupid = that.current_groupid;
				
				jiazhengApi.requestServer(post_end_point, post_data, function(res){
					console.log('/openapi/JiazhenggongsiData/group_list===>>>', res);
					
					if(!that.group_list_list){
						that.group_list_list = [];
					}
					
					for(var i=0;i<res.data.group_list.length;i++){
						console.log('asdasda==sssss=>>>',res.data.group_list[i])
						
						that.group_list_list.push(res.data.group_list[i]);
					};
					
					console.log('asdasda===>>>',that.group_list_list)
					
				});
						
			
			},
		// modal_edit_edit:function(){
		// 	var new_url = '/pages/jiazhenggongsi/group_edit';
		// 	if(this.current_groupid){ 
		// 		new_url += '?groupid='+this.current_groupid;
		// 	}
		// 	this.abotapi.call_h5browser_or_other_goto_url(new_url);
		// },
			
			
		toAdd:function(){
			var new_url = '/pages/jiazhenggongsi/group_edit';
			if(this.current_groupid){ 
				new_url += '?groupid='+this.current_groupid;
			}
			this.abotapi.call_h5browser_or_other_goto_url(new_url);
		},
		// toGrouppower:function(){
		// 	var new_url = '/pages/jiazhenggongsi/grouppower_list';
		// 	if(this.current_groupid){ 
		// 		new_url += '?groupid='+this.current_groupid;
		// 	}
		// 	this.abotapi.call_h5browser_or_other_goto_url(new_url);
		// }
		},
	}
</script>

<style>
	@import './static/css/jiazhenggongsi_list.css';
</style>