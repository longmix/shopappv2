<template>
	<view>
		<view>当前主播不在线</view>
		<view style="background-color: #ffffff;width: 80%;">
			<view>推荐相亲房间</view>
		</view>
	</view>
</template>

<script>
export default{
	data() {
		return {
			fenxiao_info:'',
		}
	},

onLoad() {
		var that = this;
		
		uni.setNavigationBarTitle({
			title:'主播'
		})
			
		that.get_current_userinfo();
		
		
		this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
	},
	onShow() {
		
	},
	onReady(){
		
	},
	onPageScroll(e) {
		
	},
	//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh() {
		console.log('下拉刷新==')
		 
		// #ifndef MP-ALIPAY
		uni.showToast({
			title: '数据更新中……',
			icon:'loading',
		});
		// #endif
		 
		// #ifdef MP-ALIPAY
		uni.showToast({
			title: '数据更新中……',
			//icon:'loading', 	//支付宝不支持icon为 loading
			//duration:2000
		});
		// #endif
		this.current_page = 1;
		this.get_fenxiao_myteam_list();
		 
		console.log('下拉刷新==============')
		 
		//停止当前页面的下拉刷新
		setTimeout(function() {
			console.log('timeout===>>>stopPullDownRefresh===>>>hideToast');
			
			uni.stopPullDownRefresh();
			
			uni.hideToast();
			//uni.hideLoading();
			
		}, 2000);
		   
	},
	

}
</script>

<style>
	page{
		background-color: #383260 ;
	}
</style>