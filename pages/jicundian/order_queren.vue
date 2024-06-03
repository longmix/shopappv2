<template>
	
	<view style="background-color: rgb(239, 239, 239,0.7);">
		<view style="background-color: #ffffff;height: 80rpx;padding: 20rpx;">
			<view style="font-size: 35rpx;font-weight: bold;">人民广场/历史博物馆</view>
			<view style="font-size: 25rpx;">寄存时间：07:00 ~ 20:00</view>
		</view>
		
		<view style="padding: 20rpx;justify-content: center;height: 1280rpx">
			   
			  <view class="order_queren" style="background-color: #ffffff;height: 240rpx;padding: 10rpx 0 10rpx 20rpx;border-radius: 10rpx;">
			   	<view style="font-weight: bold;margin-bottom: 20rpx;">寄存价格</view>
			   	<view style="font-size: 26rpx;margin-bottom: 10rpx;">大件(行李箱):首小时3元，以后每小时2.5元</view>
			   	<view style="font-size: 26rpx;margin-bottom: 10rpx;">小件(背包):首小时3元，以后每小时2元</view>
			   	<view style="font-size: 26rpx;margin-bottom: 10rpx;">最晚取件时间为商家的营业时间，本店营业至20:00</view>
			   	<view style="font-size: 26rpx;margin-bottom: 10rpx;">隔夜件:每天收费20元</view>
			   </view>
			   <!--寄存物品的信息-->
			   
			  <!-- <view style="background-color: #ffffff;height: 500rpx;border-radius: 10rpx;margin-top: 20rpx;">
				  <u-cell-group :border="false">
						<u-cell  title="大件物品" :border="false"></u-cell>
						<u-cell  title="小件物品" value="x21"></u-cell>
						<u-cell  title="寄存类型"></u-cell>
						<u-cell  title="开始时间" value="x21"></u-cell>
				  	</u-cell-group>
			  </view> -->
			   
			 <view class="order_queren_msg" style="background-color: #ffffff;height: 500rpx;padding: 10rpx 0 10rpx 20rpx;border-radius: 10rpx;margin-top: 20rpx;">
			  <view style="font-weight: bold;margin-bottom: 20rpx;">订单信息</view>
			  <view class="jicnu_order"><view class="order_type">订单编号</view>：123456789</view>
			  <view class="jicnu_order"><view class="order_type">大件物品</view>：1件</view>
			  <view class="jicnu_order"><view class="order_type">小件物品</view>：0件</view>
			  <view class="jicnu_order"><view class="order_type">寄存类型</view>：当天件</view>
			  <view class="jicnu_order"><view class="order_type">开始时间</view>：2024-05-27 11:30</view>
			  <view class="jicnu_order"><view class="order_type">结束时间</view>：2024-05-27 11:30</view>
			  
			  </view>
			  <view>
			  			<view style="width: 50%;display: flex;border: 1rpx solid #ffffff;background-color: #cccccc;height: 60rpx;border-radius: 20rpx;justify-content: center;padding-top: 10rpx;">取消订单</view>
						<view style="width: 50%;border: 1rpx solid #ffffff;height: 60rpx;border-radius: 20rpx;justify-content: center;padding-top: 10rpx;"><u-button>开始计费</u-button></view>
			  </view>
		</view>
		
	</view>
	
     
</template>

<script>
    
    export default {
       
    }
</script>

<style>
   .jicnu_order{
	   font-size: 30rpx;
	   margin-bottom: 10rpx;
   }
   .order_type{
	   float: left;
	   color: #ff4e4e;
	   font-weight: bold;
   }
</style>