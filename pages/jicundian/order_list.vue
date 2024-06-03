<template>
	
	<view style="background-color: rgba(245,245,245,0.7);height: 1200rpx;">
		
		<view>全部订单</view>
		<!--订单列表-->
		<view style="background-color: #ffffff;">
			
			<view></view>
			
			<u-cell-group>
				<u-cell
					title="人民广场/历史博物馆"
					value="查看详情"
					label="2003-12-11 12:30"
					url="/pages/jicundian/order_queren"
				></u-cell>
			</u-cell-group>
			<u-cell-group>
				<u-cell
					title="人民广场/历史博物馆"
					value="查看详情"
					label="2003-12-11 12:30"
					url="/pages/jicundian/order_queren"
				></u-cell>
			</u-cell-group>
			<u-cell-group>
		
				<u-cell
					title="人民广场/历史博物馆"
					value="查看详情"
					label="2003-12-11 12:30"
					url="/pages/jicundian/order_queren"
				></u-cell>
			</u-cell-group>
		</view>
		
		<abot-tab-bar :list="tabbar_list" :current_index="0" style="position:fixed;bottom:0;width:100%;left:0;right:0;"
			@tabChange="tabChange"></abot-tab-bar>
	
	</view>
</template>

<script>
	
	import jicundian_data from './jicundian_data.js';
	import abotTabBar from '@/components/abot-tabbar.vue';
	
	export default {
		components:{
			abotTabBar
		},
		data() {
			return {
				tabbar_list: jicundian_data.tabbar_list,
				
			}
		},
		onLoad: function (options) {
		},
		onShow:function(){
			
		},
		methods: {
			
			tabChange(index) {
				
				var tabbar_item = this.tabbar_list[index];
				
				if(!tabbar_item){
					return;
				}
				
				var new_url = tabbar_item.new_url;
				
				console.log('准备通过tabbar跳转到==>>', new_url);
				
				this.abotapi.call_h5browser_or_other_goto_url(new_url);
				
			},
		},
		
	}
	
	
	
	
	
</script>

<style>
</style>