<template>
	<view class="content">
		<view class="tanchuang-model">
			<view class="tanchuang-yinying"></view>
		</view>
		<view class="home_page" style="bottom: 15%;" @click="toAdd" :style="{background: wxa_shop_nav_bg_color}">
		    <image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/录入.png"></image>
			<view :style="{color:wxa_shop_nav_font_color}">录入</view>
		</view>
		<view class="content-top" >
			<view class="input-box"> <!-- 点击搜索  @click="toSearch()" -->
				<input
				placeholder="搜索姓名、地址、手机号或身份证" 
				placeholder-style="color:#c0c0c0;" 
				@input="input_search"
				style="background: #F0F3F6; margin: 0 auto;width: 80%;"
				:value="current_search"
				/>
				<view class="icon search"  @tap="search_key"></view>
			</view>
		</view>
		
			<view v-for="(item , index) in citizen_list_list" :key="index">
				<view class="content-list">
					<view class="content-list-hangyi">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/客户.png" class="content-list-img" @tap="toCitizen_detail(item.citizenid)"></image>
						<text class="content-list-name " @tap="toCitizen00_detail(item.citizenid)">{{item.citizen_name}}</text>
						<text class="content-list-sex" v-if="item.sex == 1">男</text>
						<text class="content-list-sex" v-if="item.sex == 2">女</text>
						<!-- 更多选项 -->
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/更多.png" 
							class="content-list-more" 
							@tap="show_more_option(item.citizenid, item.name)"></image>
					</view>
					<view class="content-list-hanger">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/手机3.png" class="content-list-img"></image>
						<text class="content-list-phone">手机号:&nbsp;&nbsp;{{item.mobile}}</text>
					</view>
					<view class="content-list-hangsan">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/列表页地址.png" class="content-list-img"></image>
						<text class="content-list-phone">地址:&nbsp;&nbsp;{{item.address}}</text>
					</view>
					<view class="content-list-hangsi">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/身份证.png" class="content-list-shenfen"></image>
						<text class="content-list-phone">身份证号:&nbsp;&nbsp;{{item.identity_card}}</text>
					</view>
					<view class="content-list-bottom">
						<text class="content-list-zhengzhuang">{{item.recipient_type}}</text>
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
							<text style="margin-left: 10rpx;color: #7F7F7F;">{{name}}</text>
							<view class="modal-fengexian"></view>
						</view>
						<view class="modal-dier">
							<view class="modal-edit" @tap="modal_edit_edit">
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/修改.png" class="modal-img2"><text>修改</text></image>
							</view>
							<view class="modal-edit" style="margin-left: 60rpx; " @tap="modal_del_del">
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/删除.png" class="modal-img2"><text>删除</text></image>
							</view>
						</view>
						<view class="modal-disan"  @tap="toCitizen01_detail(citizenid)">
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
	import { current_chat_gui } from '../../common/abotapi.js';
import jiazhengApi from './common/abotapiJiazhenggongsi.js';
	
	export default {
		data() {
			return {
				//商城的Logo、导航栏背景颜色和文字颜色
				wxa_shop_operation_logo_url:'',
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				is_ok:'已经到底了~',
				
				current_page:1, //分页
				modal_message:false,

				current_citizen_name:'',
				current_citizenid:0,
				citizen_list_list:[],
				recipient_type:'',
				
				search_text:'', //搜索用的文字
				current_search:'',
				name:'',

			}
			
		},
		onLoad: function(options){
			var that = this;
			
			uni.setNavigationBarTitle({
				title: that.page_title,
			});
			//console.log('122229090909090909090909',options);
			
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
				this._citizen_list(this.current_cata_name);
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
			this.citizen_list_list = [];
			this.abotapi.set_shop_option_data(this,
				this.callback_function_shop_option_data
			);
			
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
		
				that._citizen_list();
			 },
			input_search:function(e){
				 console.log('12345',e.detail.value)
				 this.current_search = e.detail.value;
			 },
			 //获取用户搜索的关键字
			search_key:function(){
				var that = this;
				var userInfo = that.abotapi.get_user_info();
				if(!userInfo || !userInfo.userid || !userInfo.checkstr){
					that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
				}
				
				
				var post_end_point = '/openapi/JiazhenggongsiData/citizen_list';
				var post_data = {
					sellerid: that.abotapi.get_sellerid(),
					key:that.current_search,
					checkstr: userInfo.checkstr,
					userid: userInfo.userid,
					adminuserid: that.current_adminuserid,
					
					
				};
				jiazhengApi.requestServer(post_end_point, post_data, function(res){
					
					that.citizen_list_list = res.data.citizen_list;
					
					
				});
				
			},
			show_more_option:function(citizenid, citizen_name){
				 var that = this;
				 
				 that.current_citizen_name = citizen_name;
				 that.current_citizenid = citizenid;
				 
				 
				 if(that.current_citizenid){
				 	var that = this;
					var userInfo = that.abotapi.get_user_info();
					if(!userInfo || !userInfo.userid || !userInfo.checkstr){
						that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
					}
					
				 	var post_end_point = '/openapi/JiazhenggongsiData/citizen_detail';
				 	var post_data = {
				 		sellerid: that.abotapi.get_sellerid(),
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
						adminuserid: that.current_adminuserid,	
				 	};
				 	
				 	post_data.citizenid = that.current_citizenid;
				 	
				 	jiazhengApi.requestServer(post_end_point, post_data, function(res){
				 		console.log('/openapi/JiazhenggongsiData/worker_detail===>>>', res);
				 		
				 		that.name = res.data.detail.name;
				 	});
				 
				 }
				 
				 that.modal_message = !that.modal_message;
				 
				 
			 },
			 
			 callback_request_jiazheng_success:function(res){
			 	//这里还会返回界面上需要的参数，包括客户、员工的数量等
			 },
			 modal_edit_edit:function(){
				 var new_url = '/pages/jiazhenggongsi/citizen_edit';
				 if(this.current_citizenid){
					 new_url += '?citizenid='+this.current_citizenid;
				 }
				 this.abotapi.call_h5browser_or_other_goto_url(new_url);
			 },
			modal_del_del:function(){
				var that = this;
				// var formdata = e.detail.value;
				
				var userInfo = that.abotapi.get_user_info();
				if(!userInfo || !userInfo.userid || !userInfo.checkstr){
					that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
				}
				
				
				that.modal_message = !that.modal_message;
				console.log('1111111111111',)
				var post_end_point = '/openapi/JiazhenggongsiData/citizen_delete';
				var post_data = {
					sellerid: that.abotapi.get_sellerid(),
					checkstr: userInfo.checkstr,
					userid: userInfo.userid,
					adminuserid: that.current_adminuserid,
				};
				
				//如果是删除记录
				if(that.current_citizenid){
					post_data.citizenid = that.current_citizenid;
				}
				
				
				jiazhengApi.requestServer(post_end_point, post_data, function(res){
					
					console.log('/openapi/JiazhenggongsiData/citizen_detail===>>>', res);
					uni.showModal({
						title:'提示',
						content:'删除成功',
						showCancel:false,
						success:function(res001){
							console.log('sifjsiofdngjdngv',res001)
							if(res.data && (res.data.code == 1)){
								console.log('ndsvjk11111111111');
								
								that.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/citizen_list');
				
							}
							else{
								return;
								//提交失败，不跳转
							}
							
							
						},
						fail:function(){
							uni.showToast({
								title:'提示',
								content:'删除失败,请检查网络设置！'
							})
						},
					});
						
				});
			},
			toAdd:function(){
			 	this.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/citizen_edit');
			 },
			toSearch() {
			 	uni.navigateTo({
			 		url:'/pages/jiazhenggongsi/toSearch'				
			 	})
			},
			//点击头像后跳转到相应的员工详情界面	
			toCitizen00_detail:function(citizenid){
				var new_url = '/pages/jiazhenggongsi/citizen_detail?citizenid='+citizenid;
							 
				
				console.log('4444444444===========>>>>',new_url)
				this.abotapi.call_h5browser_or_other_goto_url(new_url);
			},
			//点击下方显示查看员工详情界面跳转到详情界面
			toCitizen01_detail:function(citizenid){		
				var new_url = '/pages/jiazhenggongsi/citizen_detail';
				if(this.current_citizenid){
					new_url += '?citizenid='+this.current_citizenid;
				}
				this.abotapi.call_h5browser_or_other_goto_url(new_url);
			},


			 //请求客户列表
			 _citizen_list: function() {				 
				var that = this;
				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if(!userInfo || !userInfo.userid || !userInfo.checkstr){
					that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
				}
				
				
			 	var post_end_point = '/openapi/JiazhenggongsiData/citizen_list';
			 	var post_data = {
			 		sellerid: that.abotapi.get_sellerid(),
					page:that.current_page,
					checkstr: userInfo.checkstr,
					userid: userInfo.userid,
					adminuserid: that.current_adminuserid,
			 	};
			 	
			 	//判断是否有实体商家对应的身份的userid
			 	if(that.urrent_adminuserid > 0){
			 		post_data.adminuserid = that.current_adminuserid;
			 	}
			 	
			 	
			 	
			 	
				post_data.citizenid = that.current_citizenid;
			 	jiazhengApi.requestServer(post_end_point, post_data, function(res){
			 		console.log('/openapi/JiazhenggongsiData/citizen_list===>>>', res);
					

					
					if(!that.citizen_list_list){
						that.citizen_list_list = [];
					}
					
					for(var i=0;i<res.data.citizen_list.length;i++){
						console.log('asdasda==sssss=>>>',res.data.citizen_list[i])
						
						that.citizen_list_list.push(res.data.citizen_list[i]);
						
					};
					
					
					console.log('asdasda===>>>',that.citizen_list_list)
			 	});
			 
			 },
			 
			
			
		},
		
	}
</script>

<style lang="scss">
	@import './static/css/jiazhenggongsi_list.css';
</style>