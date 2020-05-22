<template style="padding: 0upx;margin: 0upx;">
	<view >
		<view :style="[{'background-image':'url('+ item.card_data.card_bg_img +')' }]" class="c">
			<view class="a">
				<image :src = "item.card_data.card_logo" style="width: 100upx;height: 100upx;"></image>
				<view style="">
					<view>{{item.card_data.card_name}}</view>
					<view>{{item.card_data.card_desc}}</view>
				</view>
			</view>
			<view style="text-align: right;padding-right: 57px;color: #000000;margin-top:165upx;padding-right: 170upx;">
				<b>F1212121111</b>
			</view>
		</view>
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				item:'',
			}
		},
		onLoad(option){
			
		
		
			
			this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
			
			
		},
	//调用接口
	methods:{
		
		callback_function_shop_option_data:function(that, option_data){
			console.log('option_data========',option_data)
			that.item = option_data;
		}
       	
	},
	}
</script>

<style>
	.a{
		display: flex;
		align-items: center;
		color:#007AFF;
		margin-left: 20upx;
		margin-top: 50upx;
	}
	.c{
		margin-left: 5%;
		width: 90%;
		height: 400upx;
		border-top:1px solid #fff;
		background-size: 100% 100%;
		border-radius: 25upx;
	}
</style>


<!-- <template>
	<view>
		<view class="myecard">
			<view class="card-n">
				<image src="../../static/img/alipay.png"></image>
				<view class="vip">
					延誉宝VIP
				</view>
			</view>
			
			<view class="number">
				<b>12346548465465416316</b>
			</view>
			
			
		</view>
		
		<view>
			<image src="../../static/img/alipay.png"></image>
			<view>123456</view>
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
			
		}
	}
</script>

<style>
	.myecard{
		width: 90%;
		height: 400upx;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		background-image: url(../../static/img/card.png);
		background-repeat:no-repeat;
		border-radius: 30upx;
		margin:auto;
	}
      image{
		width: 100upx;
		height: 100upx;
		border-radius: inherit;
		display: inline-block;
		margin-left:10upx;
		position: relative;
	}
	.card-n{
		margin-top: 100upx;
		display: inline-block;
	}
    .vip{
		color:#FFFFFF;
		font-size: 30upx;
		display: inline-block;
		position: absolute;
	}
    .number{
		color: #000000;
		display: inline-block;
		margin-left: 200upx;
	}
</style>
 -->