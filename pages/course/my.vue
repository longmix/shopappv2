<template>
	<view>
		<view class="online_courses">
			学生中心
		</view>
		
		<!-- 个人信息 -->
		<view class=""	style="display: flex;margin-left: 20rpx;">
			<view class="top-pic">
				<img :src="current_course_list.headimgurl" alt="" />
			</view>
			<view class="top-text">
				<view	class="letterpress_theme"	style="font-size: 40rpx;color: #000000;">{{current_course_list.nickname}}</view>
				<view	class="letterpress_theme"	style="font-size: 30rpx;color:#7f7f7f" @click="goto_jifen()">我的积分:{{current_course_list.integral}}</view>
				<view class=""	style="display: flex;margin-top: 20rpx;">
					<view	class="letterpress_title">总课程:{{current_course_list.no_course_count}}节课</view>
					<view	class="letterpress_title" style="margin-left: 80rpx;">已学习:{{current_course_list.learn_course_count}}节课</view>
				</view>
				
			</view>
		</view>
		<!-- 展示课程列表 -->
		<view v-if="current_course_list != null">
			<view class="course_List" >
				<view class="course_details"  
				v-for="(item,index) in current_course_list.course_list" 
				:key="index" 
				@click="goto_xuexi_lilu(item.courseid)">
					<image class="miage_img" :src="item.icon"></image>
					<view class="letterpress">
						
						<view class="letterpress_theme">{{item.brief}}</view>
						
						<view class="letterpress_title">编号:{{item.orderno}}</view>
						
						<view class="letterpress_title">{{item.buy_time}}</view>
						
						<view class=""	style="display: flex;margin-top: 40rpx;">
							<view class="letterpress_title">总课时:{{item.count_course}}节课</view>
							<view	class="letterpress_title" style="margin-left: 80rpx;">已学习:{{item.view_count_course}}节课</view>
						</view>
						
						
					</view>
				</view>
			</view>
			<view class="load">
				{{ is_ok }}
			</view>
		</view>
		
		
		<!-- 如果不存在记录 -->
		<view v-else style="text-align: center;">
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/empty_order.png" 
				mode="widthFix"
				style="width: 300rpx;"></image>
				
			<view class="loading_tips" style="font-size: 30rpx;">
				{{ ret_msg }}
			</view>
		</view>
		
		<view class="home_page" style="bottom: 10%;" @click="toPageIndex" :style="{background: wxa_shop_nav_bg_color}">
            <image src="https://yanyubao.tseo.cn/Tpl/static/images/shouye01.png"></image>
			<view class="nav_right_icon" :style="{color:wxa_shop_nav_font_color}">首页</view>
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
				
				current_course_list:null,//课程数据
				ret_msg:'空空如也，没有课程~',
				is_ok:'已经到底了~',
			}
		},
		onLoad() {
			var that = this;
			
			that.__load_course_list_from_server();
			that.call_h5browser_or_other_goto_url();

			setTimeout(function () {
			}, 1000);
				uni.startPullDownRefresh();
				
			that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);
		},
		
		//下拉刷新
		onPullDownRefresh() {
			
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
			

			},
			
			//跳转链接传参
			goto_course_detail:function(courseid){
				var new_url = '/pages/course/detail?courseid='+courseid;
				
				this.abotapi.call_h5browser_or_other_goto_url(new_url);
			},
			
			toPageIndex:function(){
				var shouye_url = '/pages/course/index';
				this.abotapi.call_h5browser_or_other_goto_url(shouye_url);
			},
			
			//从服务器获取课程列表
			__load_course_list_from_server:function(item){
				console.log(item);
				
				var that = this;
				
				var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					appid:that.abotapi.globalData.xiaochengxu_appid,
				};
				
				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if (userInfo && userInfo.userid) {
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				};
				console.log('that.abotapi.get_user_info=====>>>',userInfo);
				console.log('post_data.checkstr=====>>>',post_data);
				
				that.abotapi.abotRequest({
					url:that.abotapi.globalData.yanyubao_server_url + 
					'/openapi/VideoListRemarkData/online_course_my_list',
					method:'post',
					data:post_data,
						success: function(res) {
							if(res.data.code == 1){
							    that.current_course_list = res.data.data;
									
								if(!that.current_course_list){
									that.current_course_list = [];
								}
						}
					}
				})
			},
			goto_jifen(){
				uni.navigateTo({
					url:"/pages/user/logscore"
				})
			},
			goto_xuexi_lilu(courseid){
				uni.navigateTo({
					url:"/pages/course/xuexi_jilu?courseid="+courseid
				})
			}
		}
	}
</script>

<style>
	@import './static/css/course_common.css';
	.online_courses{
		width: 100%;
		font-size: 40rpx;
		font-weight: 1000;
		text-align: center;
		border-bottom: 2rpx solid #AAAAAA;
		padding-top: 25rpx;
		padding-bottom: 25rpx;
	}
	.course_details{
		margin: 20rpx;
		display: flex;
	}
	.load{
		color:#958f8a;
		font-size: 14rpx;
		text-align: center;
		margin-top: 50rpx;
		padding-bottom: 50rpx;
	}
	.letterpress{
		margin-left: 30rpx; 
		width: 55%;
	}
	.letterpress_theme{
		color: #555555;
		font-weight: 800; 
		font-size: 30rpx;
		overflow: hidden; 
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 10rpx;
	}
	.letterpress_title{
		color: #7f7f7f;
		 overflow: hidden; 
		 text-overflow: ellipsis;
		 white-space: nowrap;
		 font-size: 26rpx;
		 margin-top: 10rpx;
	}
	.miage_img{
		width: 380rpx;
		height: 170rpx;
	}
	.top-pic{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 27rpx;
		border-radius: 50%;
		overflow: hidden;
		height: 160rpx;
		width: 160rpx;
		margin: 20rpx;
		
	}
	.top-pic image{
			width: 81rpx;
			height: 81rpx;
	}
	.top-text{
		margin-left: 40rpx;
		margin-top: 20rpx;
	}
	.text-top{
		font-size: 26rpx;
		margin-top: 12rpx;
	}
	
</style>