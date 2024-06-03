<!-- 添加新的工单类型(这个功能在pc端后台，小程序界面可能用不到了) -->
<template>
	<view>
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<!-- 基本信息===begin -->
		<view class=""	v-if="current == 0">
			
		</view>
		<!-- 基本信息===end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '基本信息'
				}, {
					name: '报单'
				}, {
					name: '派单'
				}, {
					name: '接单'
				}, {
					name: '完工'
				}],
				current: 0,
			}
		},
		methods: {
			change(index) {
				this.current = index.index;
				console.log("this.current=========",this.current);
			},
		}
	}
</script>

<style>

</style>
