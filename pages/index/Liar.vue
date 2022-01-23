<template>
</template>

<script>
	/**
	 * //用于兼容 xiaochengxu/shopapp 项目的默认页面，没有具体的功能
	 */
	export default {
		data() {
			return {
			    
			};
		},
		onLoad(options) {
			
			console.log('aaaaaaaaaaaaaa');
			
			
			
			//通过  redirectTo 跳转，模板页面应该添加一个返回首页的链接，不然在APP中会出现跳不回去的情况
			uni.reLaunch({
				url: '/pages/index/index',
				fail: (res) => {
					console.log(res);
				},
				success: (res) => {
					console.log(res);
				}
			})
			
		},
		onShow: () => {
			console.log('index/Liar onShow !');
			
			
		}
	}
</script>

<style>
</style>
