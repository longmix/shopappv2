<template>
	<view>
		<view style="text-align: center;margin-top: 20rpx;">
			<image src="http://yanyubao_teso,cn/Tpl/static/images/zanwu,png" mode="widthFix"></image>
		</view>
		<view style="margin-top: 50rpx;"></view>
		<view>
			<view>
				<view>
					<image src=""></image>
				</view>
			</view>
			<view style="padding: 40rpx 5% 0 5%;">
				<image src="" style="width: 100%;"></image>
			</view>
		</view>
		<view class="a-1">
			<view class="a-2">
				<image src=""></image>
				<view></view>
			</view>
		</view>
		
		<view class="bottom-line">
			<view class="bottom-line-a"></view>
			<view>我也是有底线的</view>
			<view class="bottom-line-a"></view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
				page:1,
				isShowBottomLine:0,
				pictureList:[],
				
			}
		},
		
		methods:{
			
			/**
			 * 生命周期函数---监听页面加载
			*/
			
			onLoad: function (options) {
				 console.log('options======', options)
				if(options && options.productid){
								
					that.productid = options.productid;
					}
						
					//uni.set_option_list_str(null, app.getColor());
						
					var that = this;
					this.abotapi.abotRequest({
						url: that.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/ProductAlbumData/get_product_album_list',
						method: 'post',
						data: {
							sellerid: that.abotapi.get_sellerid(),
							page: 1,
							productid: this.productid
							},
							header: {
							    'Content-Type': 'application/x-www-form-urlencoded'
							    },
							success: function (res) {
						        var data = res.data.data
						        if (res.data.code == 1) {
									that.pictureList = data.data;
									that.type = data.type;
									that.page = that.page + 1;
						        }
								else{
									uni.showToast({
										title: '暂无图片',
										icon: 'none'
									})
								}
							},
						    fail: function (e) {
						        uni.showToast({
									title: '网络异常！',
									 duration: 2000
							});
						},
				 })
			},
			
			get_product_album_list:function(e){
				var that = this;
				var productid = e.currentTarget.dataset.productid;
				uni.navigateTo({
					url:'/cms/library/library_list?productid=' + productid,
				})
			},
			
			bigImg:function(e){
				var index = e.currentTarget.dataset.index;
				uni.previewImage({
					current:this.data.pictureList[index],//当图片的http链接
					urls:this.data.pictureList // 需要预览的图片http预览列表
				})
			}
		}
	}
</script>

<style>
	.tupian{
		width: 44%;
		float: left;
		margin-left: 3%; 	
	}
	
	.tupian_image{
		width: 100%;
		height: 262rpx;
		border: 12rpx solid rgb(105, 102, 102);
		border-radius: 16rpx;
		float: left;
		margin: 10rpx 12rpx;
	}
	.a-1{
		display: flex;
		flex-wrap: wrap;
	}
	.a-2{
		width: 30%;
		margin-left: 2.5%;
		font-size: 56rpx;
		text-align: center;
		
	}
	.a-2 image{
		width: 320rpx;
		height: 328rpx;
	}
	.bottom-line{
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 56rpx;
		color: #AAAAAA;
		clear: both;
	}
	.bottom-line-a{
		border: 2rpx solid #EEEEEE;
		width: 30%;
	}
	
</style>