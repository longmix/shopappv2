<template>
	<view>
		<view class="content"   v-if="is_there_list_data == 1">
			<form @submit="formsubmit">
				<view class="content-top">
					<view class="content-meibu">
						<view class="crumbs_nav_style">
							<view class="nav_list_title" @tap="load_all_life_list" :class="current_life == -1?'cur':''">全部</view>
							<view class="nav_list_title"
								:class="current_life == index?'cur':''"   
								v-for="(item,index)  in current_life_list" :key="index" 
								@tap="load_selected_life_list(item, index)">
								<text class="crumbs_model">{{item}}</text>
								
							</view>
						</view>
						<view class="crumbs_nav_xuanxiang">
							<view class="nav_list_middle">
								<view class="picker">
									<picker style="margin-left: 10rpx;" name="sex" mode="selector"  @change="bind_sex_Change" :value="sex_index" :range="sex_array" >
										<view>{{sex_array[sex_index]}} </view>
									</picker>	
								</view>
								<view class="xiajiantou" style="margin-top: 20rpx;margin-left: 20rpx;"></view>
							</view>
							<view class="nav_list_middle">
								<view class="picker">
									<picker style="margin-left: 10rpx;" name="working_hours" mode="selector"  @change="bind_working_hours_Change" :value="working_hours_index" :range="working_hours_array" >
										<view>{{working_hours_array[working_hours_index]}} </view>
									</picker>
								</view>
								<view class="xiajiantou" style="margin-top: 20rpx;margin-left: 20rpx;"></view>
							</view>
							<view class="nav_list_middle">
								<view class="picker">
									<picker style="margin-left: 10rpx;" name="marital_status" mode="selector"  @change="bind_marital_status_Change" :value="marital_status_index" :range="marital_status_array" >
										<view>{{marital_status_array[marital_status_index]}} </view>
									</picker>
								</view>
								<view class="xiajiantou" style="margin-top: 20rpx;margin-left: 10rpx;"></view>
							</view>
						</view>
						
					</view>
				</view>
			</form>
			<view class="content-list">
				<view v-for="(item , index) in service_list_list" :key="index">
					<view class="content-list-item" @tap="toService_detail(item.citizenid, item.admin_userid)">
						<view style="width: 30%; float: left; margin-top: 20rpx;">
							<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/yuangong04.jpeg" style="width: 200rpx;height: 200rpx;margin-top: 20rpx;margin-left: 20rpx;"></image>
						</view>
						<view style="width: 60%; float: right;padding-right: 20rpx;">
							<view class="content-list-wenzi" style="margin-top: 20rpx;">{{item.name}}</view>
							<view class="content-list-wenzi" style="font-size: 20rpx;color: #9a9a9a;" v-if="item.domicile != null">{{item.company}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.domicile}}</view>
							<view class="content-list-wenzi" style="font-size: 20rpx;color: #9a9a9a;" v-else >{{item.company}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp</view>
							<view class="content-list-wenzi">
								<view style="font-size: 24rpx;color: #515151;" v-if="item.sex == 1">工作时长{{item.working_hours}}年|男</view>
								<!-- {{item.age}}岁| -->
								<view style="font-size: 24rpx;color: #515151;" v-if="item.sex == 2">工作时长{{item.working_hours}}年|女</view>
							</view>
							<view class="content-list-nengli">	
								<view class="content-item-nengli" v-if="item.culture_status != null">{{item.culture_status}}</view>
																
								<view class="content-item-nengli">{{item.education}}学历</view>
								
								<!-- <view class="content-item-nengli" v-if="item.political_status == '0'">- -</view> -->
								<view class="content-item-nengli" v-if="item.political_status == '1'">群众</view>
								<view class="content-item-nengli" v-if="item.political_status == '2'">共青团员</view>
								<view class="content-item-nengli" v-if="item.political_status == '3'">共产党员</view>
								<view class="content-item-nengli" v-if="item.political_status == '4'">学生</view>
								
								<view class="content-item-nengli" v-if="item.special_line != null">{{item.special_line}}</view>
							</view>	
						</view>	
						
						
					</view>
				
									
							
				</view>
				<view class="content-item-bottom"></view>
			</view>
			<view class="loading">
				{{ is_ok }}
			</view>
		</view>
		<!-- 如果不存在记录 -->
		<view v-else style="text-align: center;">
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/empty_order.png" 
				mode="widthFix"
				style="margin: 100rpx auto 20rpx;"></image>
				
			<view class="loading" style="font-size: 30rpx;">
				{{ ret_msg }}
			</view>
		</view>
		
	</view>	
</template>

<script>
	//import { current_chat_gui } from '../../common/abotapi.js';
	import { post } from '../../common/abotapi.js';
import jiazhengApi from './common/abotapiJiazhenggongsi.js';
	
	
	export default{
		data(){
			return{
				//商城的Logo、导航栏背景颜色和文字颜色
				wxa_shop_operation_logo_url:'',
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				curTabID: 1,
				curTabID1:1,
				page_title:'保姆员工列表',
				// current_xianmai_shangid:0,
				
				// culture_status:'',
				
				current_citizenid:0,
				current_page:1, //分页
				is_ok:'已经到底了~',
				ret_msg:'空空如也，没有保姆~',
				
				
				
				sex_array: ['性别','男', '女'],
				//性别序号
				sex_index:0,
				
				working_hours_array:['工龄','1年','2年','3年','4年','5年','6年','7年','8年','9年','10年'],
				//工时序号
				working_hours_index:0,
				
				marital_status_array:['婚姻','已婚','未婚','初婚有配偶'],
				//婚否序号
				marital_status_index:0,
				
				
				
				sex:'',
				working_hours:'',
				marital_status:'',
				
				formdata:[],
				current_life:-1,
				index: 0,
				current_life_name:'',   //保姆名称
				current_life_list:'',  //保姆分类
				service_list_list:[],   //保姆数据
				is_there_list_data:0,
				
				current_adminuserid:0,
				
			}
		},
		
		onLoad: function(options){
			console.log('aaaaaa',options)
			
			var that = this;
			
			// that.current_xianmai_shangid = options.xianmai_shangid;
			
			uni.setNavigationBarTitle({
				title: that.page_title,
			});
			
			
			if(options.adminuserid){
				that.current_adminuserid = options.adminuserid	
			}
			
			
			console.log('2222222222222222222222',options.adminuserid)
			// adminuserid:that.current_adminuserid,
		
			
			
			//jiazhengApi.check_user_login();  //不需要检测用户是否登陆
			
			//jiazhengApi.get_current_adminuserid(options, that);
			
			that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);
			this.__load_life_list_from_server();
	
			
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
				this._service_list();
				this.__load_life_list_from_server();
				
				
			};
			
		},
		
		
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		
			console.log('onPullDownRefresh onPullDownRefresh onPullDownRefresh');
		
			uni.showToast({
				title: '数据更新中……',
				icon:'loading'
			});
			
			
			setTimeout(function() {
				uni.stopPullDownRefresh();
			
				uni.hideToast();
			
			}, 1000);
				
			
			this.abotapi.set_shop_option_data(this,
				this.callback_function_shop_option_data
			);
			this.__load_life_list_from_server();

			
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
				
				
				//加载所有分类的列表
				that.current_life_name = '';
				that.current_life_list = null;
				that.current_page = 1;
				that._service_list(that.current_life_name);
				
			},
			//获取指定分类的列表
			load_selected_life_list:function(item, index){
				console.log('load_selected_life_list===>>>', item);
				this.current_page = 1;
				this.current_life = index;
				this.service_list_list = null;
				this._service_list(item);
			},
			//获取所有的列表
			load_all_life_list:function(){
				var that = this;
				this.service_list_list = [];
				this.current_life = -1;
				this.sex_index = 0;
				this.working_hours_index = 0;
				this.marital_status_index = 0;
				this.current_life_name = '';
				that._service_list(this.current_life_name);
				that.current_page = 1;
			},
			

			bind_sex_Change: function(e) {
			    console.log('bindPickerChange发送选择改变，携带值为', e.detail.value)
				
			    this.sex_index = e.detail.value;
				
				this.current_page = 1;
				
				
				this.service_list_list = null;
				
				this._service_list();
				
			},
			bind_working_hours_Change: function(e) {
				console.log('bindPickerChange发送选择改变，携带值为', e.detail.value)
				this.working_hours_index = e.detail.value
				
				this.current_page = 1;
				
				
				this.service_list_list = null;
				this._service_list();
				
			},
			bind_marital_status_Change: function(e) {
				console.log('bindPickerChange发送选择改变，携带值为', e.detail.value)
				this.marital_status_index = e.detail.value
				
				this.current_page = 1;
				this.service_list_list = null;
				this._service_list();
				

			},
			
			
			
			
			
			//从服务器获得列表
			__load_life_list_from_server:function(){
				
				var that = this;
				var post_end_point = '/openapi/JiazhengPublicData/wxa_api_worker_label';
				var post_data = {
					sellerid: that.abotapi.get_sellerid(),
					page:that.current_page,
		
					
				};
				
				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if (userInfo && userInfo.userid) {
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				}
				
				

				jiazhengApi.requestServer(post_end_point, post_data, function(res){
					console.log('/openapi/JiazhengPublicData/wxa_api_worker_label===>>>', res);
					
					that.current_life_list = res.data.detail;
					
				});
				
				
			},
			
			
			
			//从服务器获取保姆列表
			_service_list:function(selected_life_name){              
				var that = this;
				
				//判断是否登录   
				var userInfo = that.abotapi.get_user_info();
				
				var post_end_point = '/openapi/JiazhengPublicData/wxa_api_worker_list';
				var post_data = {
					sellerid: that.abotapi.get_sellerid(),
					page:that.current_page,
				};
				if(userInfo && userInfo.userid && userInfo.checkstr){
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				}
				
				
				
				if(that.current_adminuserid){
					post_data.adminuserid = that.current_adminuserid;
				}else{
					post_data.adminuserid = 0;
				}

				
				if(selected_life_name == '群众'){
					post_data.political_status = 1
				}else if(selected_life_name == '共青团员'){
					post_data.political_status = 2
				}else if(selected_life_name == '中共党员'){
					post_data.political_status = 3
				};
				
				
				if(that.sex_index > 0){
					post_data.sex = that.sex_index;
				}
				
				if(that.working_hours_index == 1){
					post_data.working_hours = '1'
				}if(that.working_hours_index == 2){
					post_data.working_hours = '2'
				}if(that.working_hours_index == 3){
					post_data.working_hours = '3'
				}if(that.working_hours_index == 4){
					post_data.working_hours = '4'
				}if(that.working_hours_index == 5){
					post_data.working_hours = '5'
				}if(that.working_hours_index == 6){
					post_data.working_hours = '6'
				}if(that.working_hours_index == 7){
					post_data.working_hours = '7'
				}if(that.working_hours_index == 8){
					post_data.working_hours = '8'
				}if(that.working_hours_index == 9){
					post_data.working_hours = '9'
				}if(that.working_hours_index == 10){
					post_data.working_hours = '10'
				}
				
					
				if(that.marital_status_index == 1){
					post_data.marital_status = '已婚'
				}else if(that.marital_status_index == 2){
					post_data.marital_status = '未婚'
				}else if(that.marital_status_index == 3){
					post_data.marital_status = '初婚有配偶'
				}
				
				
				
				
				
				jiazhengApi.requestServer(post_end_point, post_data, function(res){
					console.log('/openapi/JiazhengPublicData/wxa_api_worker_list===>>>', res);
					
					if(res.data.code != 1){
						
						that.is_there_list_data = 0;
						
						that.ret_msg = res.data.msg;
						return;
					}						
					console.log('online_life_get_setting===>>>', res.data)
					
					if(!that.service_list_list){
						that.service_list_list = [];
					}
					
					
					that.is_there_list_data = 1;
					
					;

					for(var i=0;i<res.data.worker_list.length;i++){
						that.service_list_list.push(res.data.worker_list[i]);
					};
					
					
					console.log('asdasda===>>>',that.service_list_list)
					
				});

			},

			toService_detail:function(citizenid, admin_userid){
				var that = this;
				
				var new_url = '/pages/jiazhenggongsi/service_detail?citizenid='+ citizenid + '&adminuserid=' + admin_userid;  
				
				console.log('4444444444===========>>>>', new_url)
				
				this.abotapi.call_h5browser_or_other_goto_url(new_url);
			}
		}
	}
</script>

<style>
	page{
		background-color: #F0F3F6;
	}
	.input-box {
		width: 98%;
		height: 80rpx;
		background-color:#fff;
		border-radius: 10upx;
		position: relative;
		display:flex;
		align-items: center;
		/* margin: 0 auto; */
		border: 2rpx solid #ababab;
		}
	.input-box .icon {
		position: absolute;
		top: 20%;
		right: 2%;
		width: 40rpx;
		height: 40rpx;
		font-size: 34rpx;
	
	}
	.input-box input {
		padding-left: 28rpx;
		height: 28rpx;
		font-size: 32rpx;
	}
	.content-list{
		margin-top: 10rpx;
		padding: 40rpx;
	}
	.content-list-item{
		width: 100%;
		height: 300rpx;
		margin-top: 20rpx;
		background-color: #fff;
		border-radius: 20upx;
	}
	.content-list-wenzi{
		margin-top: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.content-list-nengli{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		/* justify-content: space-between; */
	}
	.content-item-nengli{
		color:#474747;
		font-size: 24rpx;
		margin-right: 10rpx;
		margin-top: 10rpx;
		padding: 4rpx;
		border-radius: 10upx;
		border: 2rpx solid #797979;
	}
	.content-top{
		width: 100%;
		height: 150rpx;
		background-color: #2d96ff;
		border-bottom-right-radius: 40upx;
		border-bottom-left-radius: 40upx;
		padding-top: 30rpx;
		/* margin-bottom: 50rpx; */
	}
	.content-meibu{
		width: 90%;
		/* height:400rpx; */
		background-color: #F0F3F6;
		margin:  auto;
		/* border-radius: 20upx; */
		padding-bottom: 40rpx;
	}
	.nav_list_title{
		width: 25%;
		height: 60rpx;
		padding-top: 25rpx;
		color: #ffffff;
		text-align: center;
	}
	.cur{
		width: 25%;
		height: 60rpx;
		background-color: #F0F3F6;
		text-align: center;
		/* padding-top: 25rpx; */
		color: #393939;
	}
	.loading{
		color:#958f8a;
		font-size: 28rpx;
		text-align: center;
		margin-top: 50rpx;
		padding-bottom: 50rpx;
	}
	.crumbs_nav_style{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content:space-around;
		background-color: #4fadff;
		height: 80rpx;
		/* border-top-left-radius: 20upx;
		border-top-right-radius: 20upx; */
		
	}
	.crumbs_nav_xuanxiang{
		width: 90%;
		height: 50rpx;
		line-height: 50rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content:space-around;
		border-radius: 10upx;
		background-color: #4fadff;
		margin: 20rpx auto;	
		/* margin-bottom: 80rpx; */
	}
	.nav_list_middle{
		width: 30%;
		border: 2rpx solid #f0f0f0;
		border-radius: 10upx;
		text-align: center;
		background-color: #f0f0f0;
		margin-top: 5rpx;
		height: 40rpx;
		color: #484848;
		display: flex;
		flex-wrap: wrap;
		
	}
	
	
	.cur01{
		width: 25%;
		height: 40rpx;
		background-color: #F0F3F6;
		border-radius: 10upx;
		text-align: center;
		color: #393939;
		margin-top: 10rpx;
	}
	.cur02{
		width: 25%;
		height: 40rpx;
		background-color: #F0F3F6;
		border-radius: 10upx;
		text-align: center;
		color: #393939;
	}
	.cur03{
		width: 25%;
		height: 40rpx;
		background-color: #F0F3F6;
		border-radius: 10upx;
		text-align: center;
		color: #393939;
	}
	.content-xuanze{
		text-align: center;
	}
	.content-top-bottom{
		width: 90%;
		height: auto;
		margin:auto;
		margin-top: 20rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.ico_down{
	    margin-top: 16rpx;
		margin-left: 20rpx;
	    width:0;
	    height:0;
	    border:6px solid transparent ;
	    border-top-color:#B0B0B0;
	
	}
	.hengxian{
		border-top: 1rpx solid #adadad;
		width: 90%;
		margin: 0 auto;
	}
	button{
		width: 80%;
		height: 80rpx;
		line-height: 80rpx;
		margin-top: 20rpx;
		border-radius: 30upx;
		background-color: #2d96ff;
		color: #f5f5f5;
		font-weight: bold;
	}
	.modal-zhuti{
		position: fixed;
		top: 70%;
		bottom: 0;
		right: 0;
		left: 0;
		border-top-left-radius: 30upx;
		border-top-right-radius: 30upx;
		background-color:#fdfdfd;
		z-index: 9999;
		padding: 30rpx;
	}
	.modal-window{
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background-color:rgba(0,0,0,0.4);
		z-index: 9999;
	}
	.modal-disi{
		width:90%;
		height: 100rpx;
		background-color: #2d96ff;
		text-align: center;
		line-height: 100rpx;
		border-radius: 50upx;
		position: fixed;
		bottom: 20rpx;
		
	}
	.xiajiantou{
		border-top: 10rpx solid #797979;
		border-left: 10rpx solid transparent;
		border-right: 10rpx solid transparent;
		width: 0;
		height: 0;;
	}


</style>