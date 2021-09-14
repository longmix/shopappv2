<template>
</template>

<script>
	export default {
		data:function(){
			return {
				
			}
		},
		onLoad:function(){
			var that = this;
			
			/**
			 * 原来的 /pagse/user/user已经转移到  pages/tabbar/user
			 */
			
			that.abotapi.call_h5browser_or_other_goto_url('/pages/tabbar/user');
		},
	}
</script>

<style>
</style>
