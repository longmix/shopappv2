<template>
	
	<view style='background-color: #f4f4f4;padding-top: 10upx;padding-bottom: 5upx;'>
		<view v-if="show_zhuanti_title == 1 && hidden_product_list_tishi ==''" class="zhuanti_title">※ 附近商家 
			<view class="zhuanti_title_more" @click="toShangList($event)">查看更多&gt;&gt;</view>
		</view>
		<view v-if="show_zhuanti_title == 1 && hidden_product_list_tishi !=''" class="zhuanti_title">{{hidden_product_list_tishi}}
			<view class="zhuanti_title_more" @click="toShangList($event)">查看更多&gt;&gt;</view>
		</view>
	<block v-for="(item, index) in xianmaishangList" :key="index" style='background-color: #ffffff;'>
	<view @click="toShangDetail($event)" 
		:data-shangid="item.xianmai_shangid" 
		style="display: flex;padding: 10upx;margin: 10upx;border-radius: 10upx;background: #fff;">
		<view style="width:200upx;height:200upx;margin-left: 20upx;">
			<image style="width:200upx;height:200upx;" :src="item.icon_image"></image>
		</view>
		<view style="width:100%;margin-left: 20upx;">
			<view>
				<view style="font-size: 30upx;color:#333;">{{item.name}}</view>
				<view style="display: flex; align-items:center;justify-content:space-between;">
					<view style="display: flex;">
						<block v-if="item.star_level.length <= 5">
							<image v-for="(items,indexs) in item.star_level" 
								:key="indexs" 
								style="width: 40upx;height: 40upx;" 
								src="http://yanyubao.tseo.cn/Tpl/static/images/VIP.png">
							</image>
						</block>
					</view>
					<view style="margin-right: 30rpx;font-size: 24upx;">
						{{item.dis}}
					</view>
				</view>
				<view style="font-size: 24upx;color:#666;">{{item.city_name}}|{{item.cata_name}}</view>
				<view v-if="item.spec != ''" style="display: flex;flex-wrap:wrap;">
					<view v-for="items in item.spec" :key="items" class="youhui-biaoqian">{{items}}</view>
					
					
				</view>
				
				<view v-if="item.youhui_detail" style="font-size: 24rpx;display: flex;">
					<view class="youhui" style="font-size: 24rpx;">优惠</view>
					<view style="font-size: 22rpx;">{{item.youhui_detail}}</view>
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
		props: {
			xianmaishangList:'',
			show_zhuanti_title: 0,
			hidden_product_list_tishi:'',
		},
		onLoad() {
			var that = this;
	
		},
		methods:{
			toShangDetail:function(e){
				this.$emit('toShangDetail', e);
			},
			toShangList:function(e){
				this.$emit('toShangList', e);
			}
		}
		
	}
</script>

<style>
	.a{
		font-size:15px;
		color:#8eaf60;
		border:1px solid #8eaf60;
		width:30%;
		text-align:center;
		border-radius:13px;
		margin-left:145px;
		float:right;
	}
	.youhui-biaoqian {
		font-size: 24upx;
		margin-bottom: 10upx;
		border: 1px solid #666;
		text-align: center;
		color: #555;
		border-radius: 6rpx;
		padding: 2px 5px;
		margin-right: 10rpx;
	}
	.youhui{
		width: 100rpx;
		background: red linear-gradient(to right, rgba(255,255,255,0), rgba(2555,255,255,.5));
		display: inline-block;
		text-align: center;
		color: #fff;
		border-radius: 6rpx;
		margin-right: 10rpx;
		height: 37rpx;
	}
	
	.zhuanti_title {
		font-size:26rpx;
		text-align: left;
		color:#a2a2a2;
		padding: 30rpx auto;
		margin: 15px auto 0;
		display: block;
		height: 40rpx;
		width: 90%;
	}
	
	.zhuanti_title_more {
		display:block;
		float:right;
		font-size:26rpx;
	}
	

</style>
