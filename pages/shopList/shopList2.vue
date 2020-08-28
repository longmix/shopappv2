<template>
	<view></view>
</template>

<script>
	export default {
		data() {
			return {
			    faquan_one_click_to_save:0,
				videoid:'',
				video_data:[],
				video_remark_list:[],
				file_one_click_download:0,
			};
		},
		onLoad(options) {
			if(options.cataid){
				//当 pages/shopList/shopList  在tab栏 参数写缓存，然后跳转

				wx.setStorageSync('current_shang_cataid', options.cataid);
				wx.switchTab({
					url: '/pages/shopList/shopList',
				})
		
			}
			else{
				wx.switchTab({
					url: '/pages/shopList/shopList',
				})
			}
		}
	}
	
</script>

<style>
</style>
