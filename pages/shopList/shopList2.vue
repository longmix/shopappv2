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

				uni.setStorageSync('current_shang_cataid', options.cataid);
				
				this.abotapi.call_h5browser_or_other_goto_url('/pages/shopList/shopList');
		
			}
			else{
				this.abotapi.call_h5browser_or_other_goto_url('/pages/shopList/shopList');
			}
		}
	}
	
</script>

<style>
</style>
