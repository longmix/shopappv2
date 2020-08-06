<template>
	<view>
		<!--滚动图片start-->
			<view v-if="!is_my_video_collection">
			  <swiper @change="bindchange" indicator-dots="true" autoplay="true" interval="5000" duration="500" :style="{height:imgheights[current] + 'rpx'}">
				<block v-for="(item,index) in imgUrls" :key="index">
				  <swiper-item>
					<image :src="item.image"  :data-id='index' mode="widthFix"  class="slide-image" @load='imageLoad'  @click="toAdDetails" :data-url="item.url"/>
				  </swiper-item>
				</block>
			  </swiper>
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
				  <view>{{item.number}}人观看</view>
				  <image class="time" src="../../static/img/VIP.png"></image>
				  <view class='c-3'>{{item.month}}</view>
				  <view>{{item.video_type_text}}</view>
				</view>
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
				is_my_video_collection:'',
				page: 1,
				month: '',
				cata: '',
				imgheights:[],
				videoList:[],
				current:0,
				imgUrls:[],
				isShowBottomLine:0,
				page_info:'精彩瞬间',
				cataArr:[], 
				monthArr:[],
			};
		},
		onLoad(options) {
			var that = this;
			
			this.abotapi.abotRequest({
				url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_flash_ad_list',
				method: 'post',
				data: {
					sellerid: this.abotapi.globalData.default_sellerid,
					'type': 4,
				},
				success: function (res) {
					var banner = res.data.data;
					console.log('res++++》',res);
					console.log('banner====？',banner);
						
					//that.initProductData(data);
					that.imgUrls = banner;
					//endInitData
				},
				fail: function (e) {
					uni.showToast({
					  title: '网络异常！',
					  duration: 2000
					});
				},
			})
			
			var post_data = {};
			
			post_data.sellerid = this.abotapi.globalData.default_sellerid;
			
			
			this.abotapi.abotRequest({
				url: this.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/VideoListRemarkData/get_cata_month_list',
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
			this.page = 1;
			var cata001 = uni.getStorageSync('current_quanquan_cata');
			if(cata001){
				this.cata = cata001;
				this.getVideoList();
			}
		},
		onReady(){
			
		},
		onPageScroll(e) {
			
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			console.log('onReachBottom onReachBottom onReachBottom');
			var userInfo = this.abotapi.get_user_info();
			var that = this
			this.abotapi.abotRequest({
			  url: this.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/VideoListRemarkData/get_video_collect_list',
			  method: 'post',
			  data: {
				sellerid: this.abotapi.globalData.default_sellerid,
				page: that.page,
				month: that.month,
				cata: that.cata,
				userid: userInfo.userid,
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
	
			var faquanid = res.target.dataset.id;
	
			var faquanList = this.faquanList;
	
			console.log(faquanList);
	
			var current_faquan = null;
	
			var share_path = 'pages/discover/discover?faquanid='+faquanid;
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
			this.getVideoList();
			console.log('下拉刷新==')
			this.onLoad();
			this.onShow();
			console.log('下拉刷新==============')
			// app.set_option_list_str(this, this.getShopOptionAndRefresh);
			//停止当前页面的下拉刷新
			uni.stopPullDownRefresh();
		},
	  
	
		
		methods: {
			
			// 加载视频库列表
			getVideoList:function(e){
				var that = this
				var userInfo = this.abotapi.get_user_info();
				
				this.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/VideoListRemarkData/get_video_collect_list',
					method: 'post',
					data: {
						sellerid: this.abotapi.globalData.default_sellerid,
						page: 1,
						month: that.month,
						cata: that.cata,
						userid: userInfo.userid,
					},
				  
					success: function (res) {
						var videoList = res.data.data;
						
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
				this.month = value == 0 ? '' : this.monthArr[value];
				this.page = 1;
				this.getVideoList();
				
			},
	
			// 分类改变函数
			bindPickerChangeCata: function (e) {
				console.log('cata===', e);
				var value = e.detail.value
				this.cata = value==0 ? '' : this.cataArr[value];
				this.page = 1;
				this.getVideoList();
			},
			
			
			imageLoad: function (e) {//获取图片真实宽度  
			    var imgwidth = e.detail.width,
			      imgheight = e.detail.height,
			      //宽高比  
			      ratio = imgwidth / imgheight;
			    console.log(imgwidth, imgheight)
			    //计算的高度值  
			    var viewHeight = 750 / ratio;
			    var imgheight = viewHeight;
			    var imgheights = this.imgheights;
			    //把每一张图片的对应的高度记录到数组里  
			    imgheights[e.target.dataset.id] = imgheight;
			
			    console.log(imgheights);
				this.imgheights = imgheights;
			    this.current = e.target.dataset.id;
			},
			  
			bindchange: function (e) {
				// console.log(e.detail.current)
				this.current = e.detail.current;
			},
			  
			tovideo_details: function (e) {
				console.log('0000',e)
			   
				uni.navigateTo({
					url: '/cms/quanquan/quanquan_details?videoid=' + e.currentTarget.dataset.videoid,
				})
			},
			
			//轮播图、平面广告跳转
			toAdDetails:function(e){
				
				// var home_url = '/pages/index/index';
				// this.abotapi.goto_user_login(home_url, 'switchTab');
				
				var that = this;
				var var_list = Object();
				var url = e.currentTarget.dataset.url;
				console.log('toAdDetails- to url ====>>>>>>', url);
				
				this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
				
			},
		},
		
				
					
					
	};
</script>

<style>
	.slide-image {
	  width: 100%;
	  /*height: 150px;*/
	}
	
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
</style>
