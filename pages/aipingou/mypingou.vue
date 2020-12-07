<template>
	<view>
		
		<view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
			
			//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
			onReachBottom() {
				
				if(this.is_xiala == 0){
					this.jiazai();
				}else{
					/*uni.showToast({
						title:'已经到底了~'
					})*/
					this.show_bottom_tips = 'block';
				}
				
			},
			
			
			
			
			
			
		}
	}
</script>

<style>

</style>
