<template>
	<!-- 订单begin -->
	<view  class="jicundian_order">
		<!--寄存点-->
		<view class="jicundian_order_mian">
			<view style="background-color: #ffffff;height: 80rpx;padding: 20rpx;">
					<view style="font-size: 35rpx;font-weight: bold;">人民广场/历史博物馆</view>
					<view style="font-size: 25rpx;">寄存时间：07:00 ~ 20:00</view>
				</view>
				
				
				<view style="padding: 20rpx;justify-content: center;">
					<!-- 计费标准 -->
			<view style="background-color: #ffffff;height: 200rpx;padding: 10rpx 0 10rpx 20rpx;border-radius: 10rpx;">
				<view style="font-weight: bold;margin-bottom: 20rpx;">寄存价格</view>
				<view style="font-size: 26rpx;">大件(行李箱):首小时3元，以后每小时2.5元</view>
				<view style="font-size: 26rpx;">小件(背包):首小时3元，以后每小时2元</view>
				<view style="font-size: 26rpx;">最晚取件时间为商家的营业时间，本店营业至20:00</view>
				<view style="font-size: 26rpx;">隔夜件:每天收费20元</view>
			</view>
			
			<!-- 选择大小件数量 -->
			<view class="order_number" >
			    
				<view style="margin-bottom: 40rpx;">
					<view style="display: flex;padding: 10rpx;">
						<view style="margin: 10rpx 0 0 20rpx;font-weight: bold;font-size: 35rpx;">大件</view>
						
						<view class="counter-container">
							
							<view class="count_button">
								<u-button @click="decrement_big" size="	normal" type="default" >-</u-button>
							</view>
							
							<view class="count_value">{{ count_big }} <view style="margin-left: 20rpx;">件</view></view>
							
							<view class="count_button">
								<u-button @click="increment_big" size="	normal" type="default" >+</u-button>
							</view>
								
						</view>
						
					</view>
					<view style="margin: 10rpx 0 0 20rpx;">
						<view style="font-size: 25rpx;">大件包含:旅行箱(28寸以下)、编织袋、婴儿车等</view>
						<view style="font-size: 20rpx;color: #7e7e7e;">最大边长大于45cm，且三边尺寸之和不超过158cm</view>
					</view>
				</view>
				
				<!--小件数量 -->
				
					<view style="display: flex;padding: 10rpx;">
						<view style="margin: 10rpx 0 0 20rpx;font-weight: bold;font-size: 35rpx;">小件</view>
						
						<view class="counter-container">
							
							<view class="count_button">
								<u-button @click="decrement_min" size="	normal" type="default" >-</u-button>
							</view>
							
							<view class="count_value">{{ count_min }} <view style="margin-left: 20rpx;">件</view></view>
							
							<view class="count_button">
								<u-button @click="increment_min" size="	normal" type="default" >+</u-button>
							</view>
								
						</view>
						
					</view>
					<view style="margin: 10rpx 0 0 20rpx;">
						<view style="font-size: 25rpx;">小件包含:双肩包、手提包、购物袋、塑料袋等</view>
						<view style="font-size: 20rpx;color: #7e7e7e;">最大边长小于45cm</view>
					</view>
					
			</view>
			<!-- 选择寄件的类型 -->
			<view class="order_type">
				<view style="float: left;font-size: 30rpx;font-weight: bold;">寄存类型</view>
				
					<view style="width: 350rpx;margin-left: 380rpx;">
						<radio-group @change="radioGroupChange" >
						  <label style="font-size: 25rpx;">
						    <radio :value="0" style="transform:scale(0.7);"/> 当天件
						  </label>
						  <label style="font-size: 25rpx;">
						    <radio :value="1" style="transform:scale(0.7);"/> 隔夜件
						  </label>
						</radio-group>
					</view>
					
				</view>
				
			</view>
		</view>
	
	<!--拍照下单-->
	<!-- <abot-tab-bar :list="tabbar_list" :current_index="0" style="position:fixed;bottom:0;width:100%;left:0;right:0;top:90%;"
		@tabChange="tabChange">拍照下单</abot-tab-bar> -->
	<view class="jicundian_order_footer">
		 <view @click="">拍照下单</view>
	 </view>
	 
	</view>
	
	
</template>

<script>
	import abotTabBar from '@/components/abot-tabbar.vue';
	export default {
		components:{
			abotTabBar
		},
	  data() {
	    return {
	      count_big: 0, // 初始数量
		  count_min: 0,
		  selectedValue: '',
		  tabbar_list: jicundian_order_from.tabbar_list,
	    };
	  },
	  methods: {
	    decrement_big() {
	      if (this.count_big > 0) { // 确保数量不小于1
	        this.count_big--;
	      }
	    },
	    increment_big() {
	      this.count_big++; // 数量增加
	    },
		decrement_min() {
		  if (this.count_min > 0) { // 确保数量不小于1
		    this.count_min--;
		  }
		},
		increment_min() {
		  this.count_min++; // 数量增加
		},
		radioGroupChange(e) {
		     console.log('选中的值:', e.detail.value);
		     this.selectedValue = e.detail.value;
		   },
	  },
	   
	};
</script>

<style>
	.jicundian_order{

		  justify-content: center;
		  background-color: rgb(241, 241, 241,0.7);
	}
	
	.order_number{
		background-color: #ffffff;
		margin-top: 30rpx;
		border-radius: 10rpx;
		height: 350rpx;
	}
	.order_type{
		background-color: #ffffff;
		margin-top: 30rpx;
		height: 50rpx;
		padding: 20rpx;
		border-radius: 10rpx;
	}
	
	.counter-container {
	 width: 200rpx;
	 display: flex;
	 margin-top: 10rpx;
	 margin-left: 350rpx;
	 border: 1rpx #dddddd solid;
	 height: 40rpx;
	 border-radius: 40rpx;
	}
	.count_value {
	  width: 150rpx;
	  font-size: 28rpx;
	  font-weight: bold;
	  display: flex;
	  justify-content: center;
	  border: 1rpx solid #e8e8e8;
	}
	.count_button{
		width: 40rpx;
		height: 40rpx;
		margin-top: -20rpx;
		color: #d60000;
	}
	.jicundian_order_footer{
		text-align: center;
		height: 50rpx;
		
	}
</style>