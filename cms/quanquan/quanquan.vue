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
			if(options.cata){
				//跳转到 cms/quanquan/quanquanlist  在tab栏 参数写缓存

				wx.setStorageSync('current_quanquan_cata', options.cata);
				wx.switchTab({
					url: '/cms/quanquan/quanquanlist',
				})
		
			}
		}
	}
	
</script>

<style>
</style>
