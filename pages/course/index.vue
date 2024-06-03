<template>
	<view>
		
		<view  v-if="is_there_list_data == 1"
			style="width: 100%; padding-bottom: 40rpx; background-color: #f0f3f6;">
		
			<view class="online_courses">
				{{page_title}}
			</view>
			<view style="padding-left:20rpx ;padding-right: 30rpx;background-color:#ffffff ;">
				<view  class="crumbs_nav_style">
				
					<view @tap="load_all_course_list" :class="current_class == -1?'cur':''" 
					style="border: 2rpx solid #F1F3F5;width: 30%;text-align: center;padding: 8rpx 0;
					background-color: #F1F3F5;border-radius: 10rpx;margin-top: 25rpx;font-size: 24rpx;">全部</view>
					
					<view 	:class="current_class == index?'cur':''" v-for="(item,index) in current_cata_list" 
					:key="index" @tap="load_selected_course_list(item, index)" 
					style="border: 2rpx solid #F1F3F5; width: 30%; text-align: center;
					padding: 10rpx 0;background-color: #F1F3F5;border-radius: 8rpx;margin-top: 25rpx;font-size: 24rpx;"
					>{{item}}</view>
				</view>
			</view>
			
			
			
			<!-- 展示课程列表 -->
			<view class="course_List" v-if="current_course_list != null">
				<view class="course_details"  v-for="(item,index) in current_course_list" :key="index" 
					@tap="goto_course_detail(item.courseid)">
					
					<image :src="item.icon"></image>
					
					<view class="letterpress">
						<view class="letterpress_theme">{{item.name}}</view>
						<view class="letterpress_title">{{item.brief}}</view>
						<view class="zaiyihang_style">
							<view style="color: red; float: left;font-size: 24rpx;">￥{{item.price01}}</view>
							<view class="letterpress_text">{{item.buyer_counter}}人学习</view>
						</view>
					</view>
					
				</view>
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
		
		<view class="home_page" style="bottom: 10%;" @click="toPagemy" :style="{background: wxa_shop_nav_bg_color}">
		    <image src="https://yanyubao.tseo.cn/Tpl/static/images/touxiang-white.png"></image>
			<view class="nav_right_icon" :style="{color:wxa_shop_nav_font_color}">我的</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			
			return{
				//商城的Logo、导航栏背景颜色和文字颜色
				wxa_shop_operation_logo_url:'',
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				
				//是否有列表数据
				is_there_list_data:0,
				
				current_page:1, //分页
				current_course_list: null,  //课程数据
				current_cata_list:'', //课程分类
				
				is_ok:'已经到底了~',
				
				ret_msg:'空空如也，没有课程~',
				
				current_cata_name:'',
				current_class:-1,
				
				page_title:'在线课程',
			}
		},
		onLoad() {
			var that = this;
			
			uni.setNavigationBarTitle({ 
				title: that.page_title,
			});
			
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
				this.__load_course_list_from_server(this.current_cata_name);
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
			
				//加载所有分类的课程列表
				that.current_cata_name = '';
				that.current_cata_list = null;
				that.current_page = 1;
				that.__load_course_list_from_server(that.current_cata_name);
			},
			
			//跳转链接传参
			goto_course_detail:function(courseid){
				var new_url = '/pages/course/detail?courseid='+courseid;
				
				this.abotapi.call_h5browser_or_other_goto_url(new_url);
			},
			
			//获取指定分类的课程列表
			load_selected_course_list:function(item, index){
				console.log('load_selected_course_list===>>>', item);
				
				this.current_page = 1;
				this.current_class = index;
				this.current_course_list = null;
				this.__load_course_list_from_server(item);
			},
			
			//获取所有的课程列表
			load_all_course_list:function(){
				var that = this;
				this.current_course_list = [];
				this.current_class = -1;
				
				this.current_cata_name = '';
				
				that.__load_course_list_from_server(this.current_cata_name);
				
				that.current_page = 1;
			},
			
			//跳转到我的
			toPagemy:function(){
				var my_url = '/pages/course/my';
				this.abotapi.call_h5browser_or_other_goto_url(my_url);
			},
			
			//从服务器获取课程列表
			__load_course_list_from_server:function(selected_cata_name){
				console.log('selected_cata_name===>>>', selected_cata_name);
				
				var that = this;
				
				var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					appid:that.abotapi.globalData.xiaochengxu_appid,
					page:that.current_page,
					
				};
				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if (userInfo && userInfo.userid) {
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				}

				if(selected_cata_name != ''){
					post_data.cataname = selected_cata_name
				};
				
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/VideoListRemarkData/online_course_get_setting',
					method:'post',
					data:post_data,
					success: function(res) {
						if(res.data.code != 1){
							
							that.is_there_list_data = 0;
							
							that.ret_msg = res.data.msg;
							return;
						}
								
						console.log('online_curse_get_setting===>>>', res.data)
						
						if(!that.current_course_list){
							that.current_course_list = [];
						}
						
						that.is_there_list_data = 1;
						
						for(var i=0;i<res.data.data.course_list.length;i++){
							that.current_course_list.push(res.data.data.course_list[i]);
						};
						
						//课程分类
						that.current_cata_list = res.data.data.cata_list;
						
						//设置页面标题
						that.page_title = res.data.data.name;

						uni.setNavigationBarTitle({
							title: that.page_title,
						});
						
						
					}
				})
			}
	    },
	}
</script>

<style>
	@import './static/css/course_common.css';
	.cur{
		color: blue;
	}
	.online_courses{
		width: 100%;
		font-size: 40rpx;
		font-weight: 1000;
		text-align: center;
		border-bottom: 1rpx solid #AAAAAA;
		padding-top: 25rpx;
		padding-bottom: 25rpx;
		background-color: #ffffff;
	}
	.crumbs_nav_style{
		margin-top: 10rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		width: 100%;
		border-top: 3rpx solid #F0F3F6;
		border-bottom: 2rpx solid #F0F3F6;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		
		justify-content: space-between;
		
	}
	.crumbs_all{
		margin-top: 10rpx;
		line-height: 70rpx;
	}
	.crumbs_model{
		
		margin-left: 20rpx;
		margin-right: 10rpx;
		width: 30%;
		border: 1rpx solid #F0F3F6;
		
	}
	.crumbs_text{
		margin-left: 30rpx;
	}
	.course_List{
		background-color: #ffffff;
		margin-top: 20rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
	}
	.course_details{
		margin: 20rpx;
		display: flex;
	}
	image{
		width: 380rpx;
		height: 170rpx;
	}
	.letterpress{
		margin-left: 30rpx; 
		width: 55%;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #7f7f7f;
	}
	.letterpress_theme{
		color: #313131;
		font-weight: bolder; 
		font-size: 30rpx; 
		overflow: hidden; 
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 10rpx;
	}
	.letterpress_title{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		color: #7f7f7f;
		overflow: hidden; 
		-webkit-line-clamp: 2;
		margin-bottom: 10rpx;
		font-size: 24rpx;
		
	}
	.loading{
		color:#958f8a;
		font-size: 28rpx;
		text-align: center;
		margin-top: 50rpx;
		padding-bottom: 50rpx;
	}
	.letterpress_text{
		color: #958f8a;
		float: right;
		font-size: 24rpx;
	}
	
	.zaiyihang_style{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	
	}
</style>