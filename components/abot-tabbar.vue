<template>
	<view class="weui-tabbar" :class="extClass">
		<!-- 选中的时候往weui-tabbar__item加class:weui-bar__item_on -->
		<view  @click="tabChange(index)" v-for="(item, index) in list" :key="index" class="weui-tabbar__item" :class="{'weui-bar__item_on':index === current_index}">
			<view style="position: relative;display:inline-block;"><image :src="current_index === index ? item.selectedIconPath : item.iconPath" class="weui-tabbar__icon"></image></view>
			<view class="weui-tabbar__label">{{ item.text }}</view>
		</view>
	</view>
</template>

<script>
/**
 * 使用方法
 * 
 * 【测试  http://localhost:8080/h5/abotds/#/pages/help/detail?id=8066 】
 * 
 * 
import abotTabBar from '@/components/abot-tabbar.vue'

components:{
	abotTabBar
},
data() {
	return {
		tabbar_list: [{
			 "text": "未录入",
			 "iconPath": '../../static/enter.png' ,
			 "selectedIconPath": '../../static/enter-select.png'
		   },
		   {
			 "text": "作业互评",
			 "iconPath": '../../static/correct.png',
			 "selectedIconPath":'../../static/correct-select.png'
			 },
			 {
			   "text": "成绩分析",
			   "iconPath": '../../static/analyse.png',
			   "selectedIconPath": '../../static/analyse-select.png'
			 }],
	}
},
methods: {
	tabChange(index) {
		console.log(index)
	}
}

在 template 中使用组件

<abot-tab-bar :list="tabbar_list" style="position:fixed;bottom:0;width:100%;left:0;right:0;" @tabChange="tabChange"></abot-tab-bar>
 */	
export default {
	props: {
		list: {
			type: Array,
			default: function() {
				return []
			}
		},
		current_index:{ type: Number, default: 0 }
	},
	data() {
		return {
			extClass: '',
			//current: 0
		};
	},
	methods: {
		tabChange(index) {
			console.log('this.current_index ===>>> ' + this.current_index);
			console.log('this.new index ===>>> ' + index);
			
			if (index === this.current_index) {
				return;
			}
			
			//因为current_index是prop，所以不应该修改其值
			//this.current_index = index;
			
			this.$emit('tabChange', index)
		}
	}
};
</script>

<style lang="scss"  >
.weui-tabbar {
	display: flex;
	position: relative;
	z-index: 500;
	background-color: #ffffff;
}
.weui-tabbar:before {
	content: ' ';
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	height: 1rpx;
	border-top: 1rpx solid rgba(0, 0, 0, 0.1);
	color: rgba(0, 0, 0, 0.1);
}
.weui-tabbar__item {
	display: block;
	flex: 1;
	padding: 8px 0 4px;
	padding-bottom: calc(8px + constant(safe-area-inset-bottom));
	padding-bottom: calc(8px + env(safe-area-inset-bottom));
	font-size: 0;
	color: rgba(0, 0, 0, 0.5);
	text-align: center;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.weui-tabbar__item:first-child {
	padding-left: constant(safe-area-inset-left);
	padding-left: env(safe-area-inset-left);
}
.weui-tabbar__item:last-child {
	padding-right: constant(safe-area-inset-right);
	padding-right: env(safe-area-inset-right);
}
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i,
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
	color: #1296db;
}
.weui-tabbar__icon {
	display: inline-block;
	width: 56rpx;
	height: 56rpx;
	margin-bottom: 4rpx;
}
i.weui-tabbar__icon,
.weui-tabbar__icon > i {
	font-size: 40rpx;
	color: rgba(0, 0, 0, 0.5);
}
.weui-tabbar__icon image {
	width: 100%;
	height: 100%;
}
.weui-tabbar__label {
	color: #bfbfbf;
	font-size: 24rpx;
	line-height: 1.4;
}
</style>
