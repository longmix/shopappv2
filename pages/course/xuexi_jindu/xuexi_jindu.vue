<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(courseid) {
			console.log('courseid',courseid)
			this.abotapi.set_shop_option_data(this,
				this.callback_function_shop_option_data
			)
			this.__load_course_list_from_server(courseid)
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
							console.log(res.data)
						}
				})
			},
		}
	}
</script>

<style>

</style>
