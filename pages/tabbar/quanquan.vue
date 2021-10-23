<template>
	<view></view>
</template>

<script>
	export default {
		data() {
			return {
			    
			};
		},
		onLoad(options) {
			
			console.log('aaaaaaaaaaaaaa');
			
			
			
			/*
			if(options.cata){
				//跳转到 cms/quanquan/quanquanlist  在tab栏 参数写缓存

				wx.setStorageSync('current_quanquan_cata', options.cata);
				wx.switchTab({
					url: '/cms/quanquan/quanquanlist',
				})
		
			}*/
		},
		onShow: () => {
			console.log('tabbar/quanquan onShow !');
			
			//通过  redirectTo 跳转，模板页面应该添加一个返回首页的链接，不然在APP中会出现跳不回去的情况
			uni.redirectTo({
				url: '/cms/quanquan/quanquanlist',
				fail: (res) => {
					console.log(res);
				},
				success: (res) => {
					console.log(res);
				}
			})
			
		}
	}
	
</script>

<style>
</style>
