<template>
	<view class="goods-list">
		<view class="product-list">
			
				
				<view class="product"  v-for="(item,indexs) in productsList" :key="indexs" @click="toGoods(item)">
					
					<image class="shouqing" v-if="item.inventory == 0" src="https://yanyubao.tseo.cn/Tpl/static/images/shouqing.png" ></image>
					<image mode="widthFix" :src="item.picture"></image>
					<view class="name">{{item.name}}</view>
					<view class="kucun-sale" v-if="showKucunSale==1">
						<view style="font-size: 13px;">销量：{{item.sale_volume}}</view>
						<view view style="font-size: 13px;">库存：{{item.inventory}}</view>
					</view>
					<view class="info">
						<view class="price">￥{{item.price}}</view>
						<!-- <view class="slogan">{{item.seller_name}}</view> -->
					</view>
				</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		name: "product-list",
		props: {
			productsList: '',
			cataid: '',
			loadingText:"",
			showKucunSale: '',
		},
		methods:{
			toGoods:function(productItem){
				this.$emit('toGoods',productItem);
			}
		}
	}
</script>

<style lang="scss">
.goods-list{
		.kucun-sale{
			display: flex;
			font-size: 26upx;
			margin: 10upx;
			margin-top: 16rpx;
			color: #f00;
		}
		
		.kucun-sale :nth-child(1){
			margin-left: 10upx;
			color:#FF6A6A;
		}
		.kucun-sale :nth-child(2){
			margin-left: 30upx;
			color:#999;
		}
		
		.product-list{
			width: 92%;
			padding: 0 4% 3vw 4%; 
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.product{
				width: 48%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;
				box-shadow: 0upx 5upx 25upx rgba(0,0,0,0.1);
				image{
					width: 100%;
					border-radius: 20upx 20upx 0 0;
					position: relative;
				}
				.shouqing{
					width: 335upx;
					height: 335upx;
					position: absolute;
					opacity: 0.8;
					margin: 0 40upx 15upx 0;
					background-color: #808080;
					z-index: 2;
				}
				.name{
					width: 92%;
					margin: 10rpx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 28rpx;
					height: 80rpx;
					line-height: 40rpx;
				}
				.info{
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;
					
					.price{
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}
					.slogan{
						color: #807c87;
						font-size: 24upx;
					}
				}
			}
			
		}
	}
</style>
