<template>
	<view>
		<view style="text-align:center;margin-top:20rpx;" v-if="pictureList.length == 0">
			<image src="" mode="widthFix"></image>
		</view>
		
		<view style='margin-top:50rpx;'></view>
		<view v-if="type == 0">
			<view v-if="pictureList.length > 1">
				<view class="tupian" v-for="(item, index) in pictureList" :key="index">
					<image :src="item" mode="widthFix" @click="bigImg" :data-index="index"></image>
				</view>
			</view>
			<view style='padding:40rpx 5% 0 5%;'>
				<image style='width:100%' mode="widthFix" @click="bigImg" :data-index="0" :src="pictureList[0]"></image>
			</view>
		  
		</view>
		
		<view class="a-1" v-if="type == 1">
			<view class="a-2" v-for="(item02, index02) in pictureList" :key="index02" :data-productid="item02.productid" @click="get_picture_album_list">
				<image :src="item02.img"></image>
				<view>{{item02.name}}</view>
			</view>
		</view>
		
		<view class="bottom-line" v-if="isShowBottomLine">
		    <view class='bottom-line-a'></view>
		    <view>我也是有底线的</view>
		    <view class='bottom-line-a'></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				page: 1,
				isShowBottomLine: 0,
				pictureList:[],
				type:'',
			}
		},
		methods: {
			
			/**
			* 生命周期函数--监听页面加载
			*/
			onLoad: function (options) {
			    console.log('options======', options)
				
				var that = this;
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
						that.type = that.type;
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
				console.log('111111111111111111');
			    var that = this;
			    var productid = e.currentTarget.dataset.productid
			    uni.navigateTo({
					url: '/cms/library/library_list?productid=' + productid,
					})
			},
			
			//点击图片弹出放大
			bigImg:function(e){
			    var index = e.currentTarget.dataset.index
			    uni.previewImage({
					current: this.pictureList[index], // 当前显示图片的http链接
					urls: this.pictureList // 需要预览的图片http链接列表
				})
			},
			/**
			* 生命周期函数--监听页面初次渲染完成
			 */
			onReady: function () {
			
			},
			
			/**
			 * 生命周期函数--监听页面显示
			*/
			onShow: function () {
			    console.log('000000000000');
			},
			
			/**
			* 生命周期函数--监听页面隐藏
			*/
			onHide: function () {
			
			},
			
			/**
			* 生命周期函数--监听页面卸载
			*/
			onUnload: function () {
			
			},
			
			/**
			* 页面相关事件处理函数--监听用户下拉动作
			*/
			onPullDownRefresh: function () {
			
			},
			  
			/**
			* 页面上拉触底事件的处理函数
			*/
			onReachBottom: function () {
			    var that = this;
			    this.abotapi.abotRequest({
			        url: that.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/ProductAlbumData/get_product_album_list',
			        method: 'post',
			        data: {
						sellerid: that.abotapi.get_sellerid(),
						page: that.page,
						productid: this.productid
			        },
			        header: {
						'Content-Type': 'application/x-www-form-urlencoded'
			        },
			    success: function (res) {
			  
			        var data = res.data.data
			        if (res.data.code == 1) {
						if(data.data){
								
							that.pictureList = that.pictureList.concat(data.data);
							that.type = that.type;
							that.page = that.page + 1;
								
						}
						else{
							that.isShowBottomLine = 1;
							uni.showToast({
								title: '到底了!',
								icon: 'none',
								duration: 2000,
						})
			        }
			            
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
			/**
			* 用户点击右上角分享
			*/
			onShareAppMessage: function () {
				
			}
		}
	}
</script>

<style>
/* cms/library/library_list.wxss */
.tupian{
  width:44%;
  float:left;
  margin-left:3%;
}
.tupian image{
  width:100%;
  height:131px;
  border:1px solid rgb(105, 102, 102);
  border-radius:8px;
  float:left;
  margin:5px 6px;
}

.a-1{
  display: flex;
  flex-wrap:wrap;
}

.a-2{
  width: 30%;
  margin-left: 2.5%;
  font-size:28rpx;
  text-align:center;
}

.a-2 image{
  width:160rpx;
  height:164rpx;
}

.bottom-line{
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:28rpx;
  color:#aaa;
  clear:both;
}

.bottom-line-a{
  border:1px solid #eee;
  width:30%;
}
</style>
