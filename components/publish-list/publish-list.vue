<template>
	<view>123</view>
</template>

<script>
	export default {
		name: 'shop-list',	
		props: {
			xianmaishangList:'',
		},
		onLoad() {
			var that = this;
	
		},
		methods:{
			toShangDetail:function(e){
				this.$emit('toShangDetail',e);
			}
		}
		
	}
</script>

<style>
	
</style>
