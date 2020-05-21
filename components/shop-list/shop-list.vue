<template>
	<view style='background-color: #f4f4f4;padding-top: 10upx;'>
	<block v-for="item in xianmaishang_list" :key="item" style='background-color: #ffffff;'>
	<view @click="toShang_detail($event)" :data-shangid="item.xianmai_shangid" style="display: flex;padding: 10upx;margin: 10upx;border-radius: 10upx;background: #fff;">
		<view style="width:200upx;height:200upx;margin-left: 20upx;">
			<image style="width:200upx;height:200upx;" :src="item.icon_image"></image>
		</view>
		<view style="width:100%;margin-left: 20upx;">
			<view>
				<view style="font-size: 30upx;color:#333;">{{item.name}}</view>
				<view style="display: flex; align-items:center;justify-content:space-between;">
					<view style="display: flex;">
						<image v-for="items in item.star_level" :key="items" style="width: 40upx;height: 40upx;" src="../../static/img/VIP.png"></image>
						
					</view>
					<view style="margin-right: 30rpx;font-size: 24upx;">
						{{item.dis}}
					</view>
				</view>
				<view style="font-size: 24upx;color:#666;">{{item.city_name}}|{{item.cata_name}}</view>
				<view v-if="item.spec != ''" style="display: flex;flex-wrap:wrap;">
					<view v-for="items in item.spec" :key="items" class="youhui-biaoqian">{{items}}</view>
					
					
				</view>
				
				<view v-if="item.youhui_detail" style="font-size: 24rpx;">
					<view class="youhui">优惠</view>
					<text>{{item.youhui_detail}}</text>
				</view>
				
				<view class="a">进入店铺</view>
				<!-- <view style="display: flex;align-items: center;flex-wrap: wrap;">
					<view style="padding:4px 10upx;margin:10upx 10upx 0upx 0upx;border-radius:6upx;background: #ff8000 linear-gradient(to right, rgba(255,255,255,0), rgba(2555,255,255,.5));font-size: 24upx;color:#fff;">可排队</view>
					<view style="padding:4px 10upx;margin:10upx 10upx 0upx 0upx;border-radius:6upx;background: #ff8000 linear-gradient(to right, rgba(255,255,255,0), rgba(2555,255,255,.5));font-size: 24upx;color:#fff;">可排队</view>
					<view style="padding:4px 10upx;margin:10upx 10upx 0upx 0upx;border-radius:6upx;background: #ff8000 linear-gradient(to right, rgba(255,255,255,0), rgba(2555,255,255,.5));font-size: 24upx;color:#fff;">可排队</view>
					<view style="padding:4px 10upx;margin:10upx 10upx 0upx 0upx;border-radius:6upx;background: #ff8000 linear-gradient(to right, rgba(255,255,255,0), rgba(2555,255,255,.5));font-size: 24upx;color:#fff;">可排队</view>
					
				</view> -->
			</view>
		</view>
	</view>
	</block>
	</view>
</template>

<script>
	export default {
		name: 'shop-list',
		prop() {
			return {
				xianmaishang_list:'',
			};
		}
	}
</script>

<style>

</style>
