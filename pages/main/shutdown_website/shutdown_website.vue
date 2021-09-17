<template>
	<view>
		<view style="text-align: center;margin-top: 40%;">
			<image style="width: 300rpx;" src="../../static/img/help/comment.png"  mode="widthFix"></image>
			<text style="display: block;margin: 50rpx; color: #666;">{{shutdown_website_tips}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wxa_shop_new_name:'',
				copyright_text:'',
				shutdown_website_tips:''
			}
		},
		//下拉刷新
		onPullDownRefresh: function () {
			var that = this;
			
			this.abotapi.set_shop_option_data_remove();
			
			that.abotapi.set_option_list_str(that, that.callback_function);
			
			setTimeout(function () {
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1500);
			
			
		},
		
		
		onLoad:function() {
			
			this.abotapi.set_option_list_str(this, this.callback_function);
		},
		
		methods: {
			//获取网站基础信息配置项
			callback_function:function(that, cb_params){
				
				if(!cb_params){
					return;
				}
				
				console.log('cb_params====', cb_params);
				
				if(cb_params.shutdown_website_status != 1){
					uni.switchTab({
						url:'/pages/index/index'
					});
					
					return;
				}
				
				
				
				
				//网站名称
				if (cb_params.wxa_shop_new_name) {
				  
				    this.wxa_shop_new_name = cb_params.wxa_shop_new_name
				  
				}
				
				//网站版权
				if (cb_params.copyright_text) {
					
					this.copyright_text = cb_params.copyright_text
					
				}
				
				//网站状态
				if (cb_params.shutdown_website_status) {
					
					this.shutdown_website_status = cb_params.shutdown_website_status
					
				}
				
				//网站关闭提示
				if (cb_params.shutdown_website_tips) {
					
					this.shutdown_website_tips = cb_params.shutdown_website_tips
					
				}
				
				
				uni.setNavigationBarTitle({
					title:this.wxa_shop_new_name
				})
				
			},
			
		}
	}
</script>

<style>

</style>
