<template>
	<view class="">
		<view class=""	v-if="current_course_list != null">
			<view class="course_List">
				<view class="course_details"
				v-for="(item,index) in current_course_list"
				:key="index">
					<image	class="miage_img"	:src="item.img_url"></image>
					<view	class="letterpress">
						<view class="letterpress_theme">{{item.title}}</view>
						<view class="letterpress_theme">{{item.brief}}</view>
						
						<view class="letterpress_title">{{item.describe}}</view>
						
						<view	v-if="item.is_lead == 0">
							<view class="letterpress_title" style="float: right;color: red;">未学习</view>
						</view>
						<view	v-else>
							<view class="letterpress_title">已学习</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	<!-- <view v-if="current_course_list != null">
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
		</view> -->
</template>

<script>
	export default {
		data() {
			return {
				current_course_list:null,
			}
		},
		onLoad(option) {
			console.log('courseid',option.courseid)
			this.abotapi.set_shop_option_data(this,
				this.callback_function_shop_option_data
			)
			this.__load_course_list_from_server(option.courseid)
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
			
			
			},
			//从服务器获取
			__load_course_list_from_server:function(courseid){
				console.log(courseid);
				
				var that = this;
				
				var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					courseid:courseid,
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
					'/openapi/VideoListRemarkData/view_coures',
					method:'post',
					data:post_data,
						success: function(res) {
							that.current_course_list = res.data.data;
							console.log('res.data==>>>>',res.data)
						}
				})
			},
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
