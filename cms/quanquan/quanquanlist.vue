<template>
	<view>
	<!--cms/discover/discover.wxml-->
		<!--滚动图片start-->
		<view v-if="!is_my_video_collection">
		  <swiperBanner v-if="banner_swiper_list"
		  	:imgUrls="banner_swiper_list" 
		  	@goto_url="toAdDetails"></swiperBanner>
		</view>
	
		<!-- 筛选 -->
		<view class="section">
		  <picker class="a-1 a-2" @change="bindPickerChangeMonth"  :range="monthArr">
			<view class="picker">
			  月份<image class='xiala' src="../../static/img/xiala.png"></image>
			</view>
		  </picker>
		  <picker class="a-1" @change="bindPickerChangeCata"  :range="cataArr">
			<view class="picker">
			  分类<image class='xiala' src="../../static/img/xiala.png"></image>
			</view>
		  </picker>
		</view>
		<view class="a-3">{{page_info}}</view>
	
	<!-- 视频 -->
	
		<view class='b-1' style="">
		
		  <view class="c-1" :data-videoid='item.videoid' @click='tovideo_details' v-for="(item,index) in videoList" :key='index' >
			<text class="e-1">{{item.cata}}</text>
			<image class='video-img' mode="widthFix" :src="item.img_url"></image>
			<view class='c-2'>{{item.title}}</view>
			<view class="d-1">
			  <view style="font-size: 22rpx;">{{item.number}}人观看</view>
			  <image class="time" src="http://yanyubao.tseo.cn/Tpl/static/images/VIP.png"></image>
			  <view class='c-3'>{{item.month}}</view>
			  <view class="d-1-type" :style="{backgroundColor:wxa_shop_nav_bg_color}">{{item.video_type_text}}</view>
			</view>
		  </view>
		
		</view>
	
		<view class="bottom-line" v-if="isShowBottomLine">
			<view class='bottom-line-a'></view>
			<view>我也是有底线的</view>
			<view class='bottom-line-a'></view>
		</view>
		
		
		<!-- 跳转回首页 -->
		<view class='icon-jump' @click='toPageIndex' 
			:style="{background: wxa_shop_nav_bg_color}">
			<image src="../../static/img/shouye.svg"></image>
			<view :style="{color:wxa_shop_nav_font_color}">首页</view>
		</view>
		
	</view>
</template>

<script>
	import swiperBanner from '../../components/swiper-banner.vue';
	
	export default { 
		components:{
			swiperBanner,
		},
		data() {
			return {
				is_my_video_collection:'',
				page: 1,
				month: '',
				cata: '',

				videoList:[],
				
				banner_swiper_list:[],

				isShowBottomLine:0,
				page_info:'精彩瞬间',
				cataArr:[], 
				monthArr:[],
				
				wxa_shop_nav_bg_color:'red',
				wxa_shop_nav_font_color:'white'
			};
		},
		onLoad(options) {
			console.log('quanquanlist onLoad');
			
			
			if(options.cata){
				this.cata = options.cata;
			}
			else{
				var cata001 = uni.getStorageSync('current_quanquan_cata');
				
				//2021.10.23. 不再使用这种机制
				cata001 = null;
				
				if(cata001){
					this.cata = cata001;
				}
			}
			
			
			    
			
			this.abotapi.set_shop_option_data(this, function(that002, cb_params){
				if (cb_params.option_list.wxa_shop_nav_bg_color) {
				    that002.wxa_shop_nav_bg_color = cb_params.option_list.wxa_shop_nav_bg_color;
					
					that002.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
				}
			});
			
			
			var that = this;
			
			//APP/小程序首页滚动广告
			this.abotapi.abotRequest({
				url: this.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=get_flash_ad_list',
				method: 'post',
				data: {
					sellerid: this.abotapi.globalData.default_sellerid,
					'type': 4,
				},
				success: function (res) {
					var banner = res.data.data;
					console.log('res',res);
					console.log('banner',banner);
						
					//that.initProductData(data);
					that.banner_swiper_list = banner;
					//endInitData
				},
				fail: function (e) {
					uni.showToast({
					  title: '网络异常！',
					  duration: 2000
					});
				},
			});
			
			var post_data = {};
			
			post_data.sellerid = this.abotapi.globalData.default_sellerid;
			
			if(this.cata){
			  //post_data.cata = this.data.cata;
			}
			
			this.abotapi.abotRequest({
				url: this.abotapi.globalData.yanyubao_server_url + '/openapi/VideoListRemarkData/get_cata_month_list',
				method: 'post',
				data: post_data,
				success: function (res) {
					
					var data = res.data.data;
					
					if(data.page_title){
						uni.setNavigationBarTitle({
							title: data.page_title
						})
					}

					if(data.page_info){
						that.page_info = data.page_info;
					}

					var cataArr = [];
					var monthArr = [];
					cataArr.push('全部');
					monthArr.push('全部');

					if(!data.cata){
						console.log('error!!! data.cata');
						return;
					}

					if (!data.month) {
						console.log('error!!! data.month');
						return;
					}

					for (var i = 0; i < data.cata.length; i++) {
						cataArr.push(data.cata[i]);       
					}

					for (var i = 0; i < data.month.length; i++) {
						monthArr.push(data.month[i]);
					}

					that.cataArr = cataArr;
					that.monthArr = monthArr;
				},
				fail: function (e) {
				  uni.showToast({
				    title: '网络异常！',
				    duration: 2000
				  });
				},
				
			})
			
			this.getVideoList();
			
		},
		onShow(){
			
			/*this.page = 1;
			var cata001 = uni.getStorageSync('current_quanquan_cata');
			if(cata001){
				this.cata = cata001;
				this.getVideoList();
			}*/
		},
		onReady(){
			
		},
		onPageScroll(e) {
			
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			console.log('onReachBottom onReachBottom onReachBottom');
			  
			var that = this
			this.abotapi.abotRequest({
			  url: this.abotapi.globalData.yanyubao_server_url + '/openapi/VideoListRemarkData/get_video_list',
			  method: 'post',
			  data: {
				sellerid: this.abotapi.globalData.default_sellerid,
				page: that.page,
				month: that.month,
				cata: that.cata,
			  },
			 
			  success: function (res) {
				var videoList = res.data.data;
		
				console.log('videoList===', videoList)
		
				if (res.data.code == 1) {
				  
				  that.videoList = that.videoList.concat(videoList);
				  that.page = that.page + 1;
				  
				} else {
					
					that.isShowBottomLine = 1;
				  
					uni.showToast({
						title: '到底了!',
						icon: 'none',
						duration: 2000,
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
		/**
	   * 用户点击右上角分享
	   */
		onShareAppMessage: function (res) {
			console.log('onShareAppMessage=========',res)
			console.log('onShareAppMessage')

			var userInfo = this.abotapi.get_user_info();
			var faquanid = res.target.dataset.id;

			var faquanList = this.faquanList;

			console.log(faquanList);

			var current_faquan = null;

			var share_path = 'pages/discover/discover?faquanid='+faquanid + 'userid=' + userInfo.userid;
			var share_title = this.current_page_title;
			var share_img = this.shop_info.icon;
	
			for (var ii = 0; ii < faquanList.length; ii++){
			  var tt = faquanList[ii];
			  if(tt.faquanid == faquanid){
				current_faquan = tt;
				break;
			  }
			}

			console.log('current_faquan===>>>>', current_faquan);

			if(current_faquan){
				share_title = current_faquan.text;

				if(current_faquan.type == 0){
					//图片
					if (current_faquan.img_or_video_list && current_faquan.img_or_video_list[0]) {
						share_img = current_faquan.img_or_video_list[0].url;
					}
				}
				else if(current_faquan.type == 1){
					//视频
					if(current_faquan.img_or_video_list && current_faquan.img_or_video_list[0]){
						share_img = current_faquan.img_or_video_list[0].video_img;
					}
				}
			}
			
			return {
				title: share_title,
				path: share_path,
				imageUrl: share_img,
				success: function (res) {
					// 分享成功
				},
				fail: function (res) {
					// 分享失败
				}
			}
		},
		onShareTimeline: function () {
			
		},
		onAddToFavorites: function () {
			//this.onShareTimeline();
		},

		/**
		* 页面相关事件处理函数--监听用户下拉动作
		*/
		onPullDownRefresh: function () {
			
			
			console.log('下拉刷新==')
			
			// #ifndef MP-ALIPAY
			uni.showToast({
				title: '数据更新中……',
				icon:'loading',
			});
			// #endif
			
			// #ifdef MP-ALIPAY
			uni.showToast({
				title: '数据更新中……',
				//icon:'loading', 	//支付宝不支持icon为 loading
				//duration:2000
			});
			// #endif
			
			this.onLoad();
			this.onShow();
			
			
			this.getVideoList();
			
			console.log('下拉刷新==============')
			
			// app.set_option_list_str(this, this.getShopOptionAndRefresh);
			//停止当前页面的下拉刷新
			setTimeout(function() {
				console.log('timeout===>>>stopPullDownRefresh===>>>hideToast');
				
				uni.stopPullDownRefresh();
				
				uni.hideToast();
				//uni.hideLoading();
				
			}, 2000);
			
		},
	  
	
		
		methods: {
			
			// 加载视频库列表
			getVideoList:function(e){
				var that = this
				
				this.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + '/openapi/VideoListRemarkData/get_video_list',
					method: 'post',
					data: {
						sellerid: this.abotapi.globalData.default_sellerid,
						page: 1,
						month: that.month,
						cata: that.cata
					},
				  
					success: function (res) {
						var videoList = res.data.data;
						uni.removeStorageSync('current_quanquan_cata');
						console.log('videoList===', videoList)

						if (res.data.code == 1){
							that.videoList = videoList;
							that.page = that.page + 1;
						}else{
							that.videoList = [];
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
			  
			  
			// 月份改变函数
			bindPickerChangeMonth:function(e){

				console.log('month===',e);
				var value = e.detail.value  
				this.cata = '';
				this.month = value == 0 ? '' : this.monthArr[value];
				this.page = 1;
				this.getVideoList();
				
			},

			// 分类改变函数
			bindPickerChangeCata: function (e) {
				console.log('cata===', e);
				var value = e.detail.value
				this.month = '';
				this.cata = value==0 ? '' : this.cataArr[value];
				this.page = 1;
				this.getVideoList();
			},
			
			tovideo_details: function (e) {
				console.log('0000',e)
			   
				uni.navigateTo({
					url: '/cms/quanquan/quanquan_details?videoid=' + e.currentTarget.dataset.videoid,
				})
			},
			
			//轮播图、平面广告跳转
			toAdDetails:function(url){
				
				// var home_url = '/pages/index/index';
				// this.abotapi.goto_user_login(home_url, 'switchTab');
				
				var var_list = Object();
				
				console.log('toAdDetails- to url ====>>>>>>', url);
				
				this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
				
			},
			
			toPageIndex: function(e) {
				
				this.abotapi.call_h5browser_or_other_goto_url('/pages/index/index');
				
			},
		},
		
				
					
					
	};
</script>

<style lang="scss">
/* cms/discover/discover.wxss */
/* cms/quanquan/quanquanlist.wxss */

.section{
  display: flex;
  border:1px solid #eee;
  padding:16rpx;
}

.a-1{
  width:50%;
  text-align:center;
  font-size:28rpx;
  color: #666;
}

.a-2{
  border:1px solid #fff;
  border-right-color:#eee;
}

.a-3{
  font-size:30rpx;
  font-weight:bold;
  text-align: left;
padding: 16rpx 16px 0 16px;
margin-top: 20rpx;

}


.c-1{

  background-color:#fff;
  border-radius:7px;
  margin-top: 20rpx;
  width:48.5%;
}
.video-img{
  width: 100%;
  border-radius:6px;
}

.c-2{
  font-size: 28rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
}

.c-3{
  font-size: 20rpx;
  color: #444;
  padding:10rpx 0 14rpx 16rpx;
}

.b-1{
  padding-top:0rpx;
  padding:0rpx 3% 30rpx 3%;
  display:flex;
  justify-content:space-between;
  flex-wrap:wrap;
}

.time{
  width: 20rpx;
  height: 20rpx;
}

.d-1{
  display: flex;
  font-size:20rpx;
  align-items:center;
  justify-content:space-between;
  color:#8a8a8a;
}
.d-1-type {
	font-size: 20rpx;
	background-color: red;
	color: #fff;
	padding: 2px;
	border-radius: 3px;
}

.e-1{
  background:#6798E9;
  color:#fff;
  font-size:22rpx;
  padding:8rpx;
  border-radius:7rpx;
  position:relative;
  left:10rpx;
  top:50rpx;
}
.bottom-line{
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:28rpx;
  color:#aaa;
}

.bottom-line-a{
  border:1px solid #eee;
  width:30%;
}
.xiala{
  width:26rpx;
  height:26rpx;
  margin-left: 10rpx;
}


	.icon-jump {
		width: 120rpx;
		height: 120rpx;
		position: fixed;
		right: 40rpx;
		bottom: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100px;
		background: #00FF00;
		flex-direction: column;
		font-size: 28rpx;
	}

	.icon-jump image {
		width: 60rpx;
		height: 60rpx;
	}
	



	
</style>
