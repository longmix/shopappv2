<template>
	<view>
		<!--cms/discover/discover.wxml-->

		<!--滚动图片start-->
		<view class="swiper" v-if="!is_my_discover_collection && !is_my_discover && !is_my_discover_like && isShowBanner">
			<view class="swiper-box">
				<swiper circular="true" autoplay="true" @change="swiperChange" :style="{height:imgheights[current] + 'px'} ">
					<swiper-item v-for="(swiper,index) in imgUrls" :key="index" @click="toAdDetails(imgUrls[index].url)">
						<image class="img_swiper" @load="imageLoad($event)" :style="{height:imgheights[current] + 'px'}" style="width:100%;"
						 :data-id='index' :src="swiper.image" mode="widthFix"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!--滚动图片end-->

		<view v-if="!is_my_discover_collection && !is_my_discover && !is_my_discover_like" class='c-1'>
			<image src="../../static/img/search.png"></image>
			<input placeholder='搜索' @confirm='searchFaquan' v-model="sousuo_text" :style="'border:2rpx solid' + wxa_shop_nav_bg_color +';'"> </input>
		</view>

		

		<!-- 标签start -->


		<view class="tab-con" v-if="faquan_tag_status == 1">
			<view class="item.select == true ? 'select-tab' : ''" @tap="selectTab" v-for='(item,index) in hot_tag' :key="index"
			 :data-index="index">{{item.name}}</view>

		</view>
		<view style="clear:both;"></view>

		<!-- 标签end -->

		<!-- 总共收藏数 或 发布  -->
		<view class='col-con' v-if="is_my_discover_collection || is_my_discover || is_my_discover_like" style="height: 280upx;line-height: 80upx;"
		 :style="{'background-color': wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color=='#000000' ? '#333' : wxa_shop_nav_font_color}">

			<view>{{nav_title}}</view>
			<!-- <view style="color:#E0B351;margin-left:20rpx;font-weight:normal;"></view> -->
			<view class="icon-number" :style="{backgroundColor:wxa_shop_nav_bg_color}">
				<!-- 头像 -->
				<view class="left">
					<label v-if="user_account_info">
						<image :src="user_account_info.headimgurl"></image>
					</label>
					<label v-else>
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/touxiang-white.png"></image>
					</label>
				</view>
				
				<!-- 昵称,个性签名 -->
				<view class="right">
					<view class="username" :style="{color:wxa_shop_nav_font_color=='#000000' ? '#333' : wxa_shop_nav_font_color}">
						<label style="margin-top: 0.5;" v-if="user_account_info">{{user_account_info.nickname}}</label>
						<label v-else @click="toLogin">请先登录</label>
					</view>
				</view>
				
			</view>
			<view class="publist_list_num">
				<view style="margin-left: 250rpx; font-size: 40rpx;" @click="my_publish_and_collect" data-type="my_publish">{{publish_list.count_my_publish}}
					<span style="font-weight: 100; opacity: 0.8;font-size: 24rpx;margin-left: 10rpx;">发布</span>
				</view>
				<view style="margin-left: 100rpx; font-size: 40rpx;"  @click="my_publish_and_collect" data-type="my_like">{{publish_list.count_like}}
					<span style=" font-weight: 100; opacity: 0.8;font-size: 24rpx;margin-left: 10rpx;">点赞</span>
				</view>
				<view style="margin-left: 100rpx; font-size: 40rpx;"  @click="my_publish_and_collect" data-type="my_collection">{{publish_list.count_collect}}
					<span style="font-weight: 100; opacity: 0.8;font-size: 24rpx;margin-left: 10rpx;">收藏</span>
				</view>
				
			</view>
		</view>
       
	    <!-- 我收藏、发布的按钮 -->
	    <view class='publish_box' v-if="faquan_button_status==1"  >
	    	<view class="nav_icon_btn" @click="my_publish_and_collect" data-type="recently_update" 
				:style="{border:is_recently_show == 1 ? '1px solid '+wxa_shop_nav_bg_color : '1px solid #ccc'}">
	    		<image style="width: 40rpx;height: 40rpx;margin-right: 10rpx;" src="https://yanyubao.tseo.cn/Tpl/static/images/shijian.png"></image>
	    		<view>最近更新</view>
	    	</view>
			
			<view class='nav_icon_btn' @click="my_publish_and_collect" data-type="my_publish"
				:style="{border:is_my_fabu_show == 1 ? '1px solid '+wxa_shop_nav_bg_color : '1px solid #ccc'}">
	    		<image style="width: 40rpx;height: 40rpx;margin-right: 10rpx;" src="https://yanyubao.tseo.cn/Tpl/static/images/edit.png"></image>
	    		<view>我的发布</view>
	    	</view>			
			
	    </view>
		
		<view class='publish_box' v-if="faquan_button_status==1"  style="margin-top: -5px;">
			<view class="nav_icon_btn" @click="my_publish_and_collect" data-type="my_like"
				:style="{border:is_my_discover_like == 1 ? '1px solid '+wxa_shop_nav_bg_color : '1px solid #ccc'}">
				<image style="width: 40rpx;height: 40rpx;margin-right: 10rpx;" src="https://yanyubao.tseo.cn/Tpl/static/images/dianzan2.png"></image>
				<view>我点的赞</view>
			</view>
			<view class="nav_icon_btn" @click="my_publish_and_collect" data-type="my_collection"
				:style="{border:is_collection_show == 1 ? '1px solid '+wxa_shop_nav_bg_color : '1px solid #ccc'}">
				<image style="width: 40rpx;height: 40rpx;margin-right: 10rpx;" src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_star2.png"></image>
				<view>我的收藏</view>
			</view>
			
		</view>

		<!-- <import src="../../wxParse/wxParse.wxml"/> 
	    <view class="wxParse"> 
	        <scroll-view  scroll-y='true'>
	           <template is="wxParse" :data='wxParseData:content.nodes'/>
	        </scroll-view>
	    </view> -->


		<!-- 
			:faquanList="faquanList" 
			:is_my_discover="is_my_discover"
			:is_my_discover_like = "is_my_discover_like"
			:is_my_discover_collection="is_my_discover_collection" 
			:faquan_tag_status="faquan_tag_status" 
			:disabled="disabled"
			@fanquaDianzan="fanquaDianzan"
			@bigImg="bigImg" 
			@videometa="videometa" 
			@change_faquan_status="change_faquan_status"
			@oneClickSave="oneClickSave" 
			@fanquanCollect="fanquanCollect"
			@copyText="copyText" 
	-->
		<!-- 发圈列表 start-->
		<discoverList 
			:faquanList="faquanList" 
			:is_my_discover="is_my_discover" 
			:is_my_discover_collection="is_my_discover_collection" 
			:is_my_discover_like="is_my_discover_like"
			:faquan_tag_status="faquan_tag_status" 
			:disabled="disabled" 
			:videometa_width_height_list="videometa_width_height_list"
			:current_playing_videoid = "current_video_id_playing"
			@fanquaDianzan="fanquaDianzan"
			@fanquaJubao="fanquaJubao"
			@bigImg="bigImg"
			@start_and_stop_other_videos="start_and_stop_other_videos"
			@videometa_handle888="videometa_handle" 
			@change_faquan_status="change_faquan_status"
			@oneClickSave="oneClickSave" 
			@fanquanCollect="fanquanCollect" 
			@copyText="copyText" 
			@click_share_btn="click_share_btn"
			@img_or_video_download="img_or_video_download">
		</discoverList>
		<!-- End of 004  -->


		<!-- 发圈列表 end-->


		<view class="bottom-line" v-if="isShowBottomLine">
			<view class='bottom-line-a'></view>
			<view>我也是有底线的~</view>
			<view class='bottom-line-a'></view>
		</view>

		<view class='cancel-search' v-if="is_search" @tap='cancelSearch'>
			<view>取消</view>
			<view>搜索</view>
		</view>		
		<view class="publish-idea" style='' v-if="faquan_button_status==1">
			<image :src="faquan_add_img_url" @tap="publishIdea"></image>
		</view>	
		<!-- <cover-view></cover-view> -->
	</view>
</template>

<script>
	import discoverList from '../../components/discover-list/discover-list.vue';
	export default {
		components: {
			discoverList
		},
		data() {
			return {
				page: 1,
				faquanList: [],
				publish_list:{count_my_publish:0, count_like:0, count_collect:0},  //帖子的发布，点赞，收藏数量
				isShowBottomLine: 0,

				imgheights: [],
				current: 0,
				startself: 0,
				selectTabArr: [],
				current_self_in_tabbar: 1, //当前这个page挂接在底部导航中，用switchTab跳转
				faquan_add_img_url: 'https://yanyubao.tseo.cn/Tpl/static/images/discover_publish_add.png',
				videometa_width_height_list: [], //记录视频的高度
				current_view_width: 480, //当前屏幕的宽度
				current_page_title: '发圈.发现.随拍',
				shop_info: '',
				current_faquanid: 0,
				faquan_one_click_to_save_show: 'none',
				faquan_tag_status: 0,
				
				//当前列表类型：  最近更新，我的发布， 我的点赞 我的收藏
				current_list_type : 'recently_update',
				
				is_my_discover: 0,				//获取 我的发布的列表
				is_my_discover_collection: 0,	//获取 我的收藏的列表
				is_my_discover_like:0,			//获取 我的点赞的列表
				
				
				//按钮显示（控制当前按钮哪个被选中）
				is_my_fabu_show: 0,			//我的发布 被选中	
				is_like_show: 0,		//我的点赞 被选中
				is_collection_show: 0,	//我的收藏 被选中
				is_recently_show: 1,	//最近更新 被选中

				faquan_button_status: 0,
				selectTabStr: '',
				faquan_add_publish_to: 0,

				faquan_content_type_image: 0,
				faquan_content_type_video: 0,
				imgUrls: [],
				hot_tag: '',
				is_search: '',
				idx: '',
				img_or_video_list: '',
				item2: '',
				tag: '',
				idx2: '',
				index3:'',
				disabled: false,
				sousuo_text: '',
				isShowBanner: false,

				

				//订单跳转查看订单评价    商家id  请求接口用
				xianmai_shangid: '',
				
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				
				//用户的头像和昵称等信息
				user_account_info:null,
				nav_title:'',
				type:0,
				current_video_id_playing:0
			};
		},
		onLoad(options) {

			console.log('ddddddddd',options);
			this.abotapi.set_option_list_str(this, this.callback_set_option_list_str);
			this.callback_func_for_shop_info;

			console.log('discover options====>>>>', options);
			var that = this;
			
			
				var box_info = uni.getSystemInfoSync();
				
				console.log('getSystemInfo==>>>system_info==>>>', box_info)
				console.log('getSystemInfo==>>>system_info==>>>', box_info.windowWidth)
				that.windowWidth = box_info.windowWidth;
				that.windowHeight = box_info.windowHeight;
				
			
			
			


			if (options) {
				if (options.faquanid) {
					that.current_faquanid = options.faquanid,
						that.is_search = true;
				} 
				else if (options.display_type) {
					if (options.display_type == 'my') {
						
						that.current_list_type = 'my_publish';

						that.is_my_discover = 1;
						that.nav_title = '发现.我发布的';
						that.current_page_title = '发现.我发布的';

					} 
					else if (options.display_type == 'collect') {
						that.current_list_type = 'my_collect';

						that.is_my_discover_collection = 1;
						that.nav_title = '发现.我收藏的';
						that.current_page_title = '发现.我收藏的';

					}
					else if (options.display_type == 'like') {
						that.current_list_type = 'my_like';
					
						that.is_my_discover_like = 1;
						that.nav_title = '发现.我点赞的';
						that.current_page_title = '发现.我点赞的';
					
					}
					


				}


				//订单跳转查看订单评价
				if (options.xianmai_shangid) {
					this.xianmai_shangid = options.xianmai_shangid;
					this.is_search = false;
					this.is_my_discover = 1;
					this.is_my_fabu_show = 0;
					this.is_like_show = 0;
					this.is_collection_show = 0;
					this.is_recently_show = 0;
				}

			}




			var userInfo = this.abotapi.get_user_info();
			console.log('userInfo========2', userInfo)

			var that = this;

			uni.getSystemInfo({
				success(res) {
					that.current_view_width = res.windowWidth;
				}
			})

			this.abotapi.getFaquanSetting(that, this.callback_flash_ad_list);

			this.abotapi.set_option_list_str(that, function(that02, option_list) {
				that02.abotapi.getColor();

				if (option_list.wxa_shop_nav_bg_color) {

					that.wxa_shop_nav_bg_color = option_list.wxa_shop_nav_bg_color;
					that.wxa_shop_nav_font_color = option_list.wxa_shop_nav_font_color;

				}
			});

			this.abotapi.get_shop_info_from_server(function(shop_info) {
				console.log('product/detail/index get_shop_info_from_server 回调：');
				console.log(shop_info);


				that.shop_info = shop_info;


			})











		},
		onShow() {
			//this.__getFaquanList();
			
			var e = Object();
			e.currentTarget = Object();
			e.currentTarget.dataset = Object();
			e.currentTarget.dataset.type = this.current_list_type;
			
			this.my_publish_and_collect(e);
			
		},
		onHide(){
			console.log('discover.vue被隐藏');
			
			//当页面被隐藏了，比如Tab切换，自动停止播放视频
			this.current_video_id_playing = 0;
		},
		
		onReady() {

		},
		onPageScroll(e) {

		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			console.log('ddddddd')

			this.__getFaquanList();

		},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function(res) {
			console.log('onShareAppMessage=========', res)
			console.log('onShareAppMessage')

			var faquanid = res.target.dataset.id;

			var faquanList = this.data.faquanList;

			console.log(faquanList);

			var current_faquan = null;

			var share_path = 'pages/discover/discover?faquanid=' + faquanid;
			var share_title = this.data.current_page_title;
			var share_img = this.data.shop_info.icon;

			for (var ii = 0; ii < faquanList.length; ii++) {
				var tt = faquanList[ii];
				if (tt.faquanid == faquanid) {
					current_faquan = tt;
					break;
				}
			}

			console.log('current_faquan===>>>>', current_faquan);

			if (current_faquan) {
				share_title = current_faquan.text;

				if (current_faquan.type == 0) {
					//图片
					if (current_faquan.img_or_video_list && current_faquan.img_or_video_list[0]) {
						share_img = current_faquan.img_or_video_list[0].url;
					}
				} else if (current_faquan.type == 1) {
					//视频
					if (current_faquan.img_or_video_list && current_faquan.img_or_video_list[0]) {
						share_img = current_faquan.img_or_video_list[0].video_img;
					}
				}
			}



			return {
				title: share_title,
				path: share_path,
				imageUrl: share_img,
				iiiifaquan:'',
				success: function(res) {
					// 分享成功
				},
				fail: function(res) {
					// 分享失败
				}
			}



		},
		onShareTimeline: function() {

		},
		onAddToFavorites: function() {
			//this.onShareTimeline();
		},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			var that = this;
			this.page = 1;
			this.isShowBottomLine = 0;
			this.faquanList = [];


			uni.removeStorageSync("cms_faquan_setting");
			
			this.abotapi.getFaquanSetting(this, this.callback_flash_ad_list);

			this.__getFaquanList();

			console.log('下拉刷新==============')
			//停止当前页面的下拉刷新

			uni.stopPullDownRefresh();
		},



		methods: {
			imageLoad: function(e) { //获取图片真实宽度

				var imgwidth = e.detail.width;
				var imgheight = e.detail.height;
				//宽高比  
				var ratio = imgwidth / imgheight;

				console.log('imageLoad id===>>> ' + e.target.dataset.id + '实际大小：');
				console.log(imgwidth, imgheight)

				//计算的高度值  
				imgheight = (this.windowWidth * 0.92) / ratio;

				console.log('imageLoad id===>>> ' + e.target.dataset.id + '显示大小：');
				console.log(this.windowWidth * 0.92, imgheight)


				var img_heights = this.imgheights;


				//把每一张图片的对应的高度记录到数组里   
				//imgheights[e.target.dataset.id] = uni.upx2px(imgheight);
				img_heights[e.target.dataset.id] = imgheight;

				console.log('imageLoad id===>>> ' + e.target.dataset.id + ", imgheights====>>>", img_heights);
				console.log("imgheights:" + typeof(img_heights))
				this.imgheights = img_heights;
				this.current = e.target.dataset.id;

			},

			//轮播图指示器
			swiperChange(event) {
				console.log('swiperChange====>>>>>>', event);
				this.current = event.detail.current;
			},
			ddddd: function() {
				console.log(11111111);
				this.imgheights = [163];
			},

			//首页导航图标、轮播图、平面广告跳转
			toAdDetails: function(url) {

				// var home_url = '/pages/index/index';
				// this.abotapi.goto_user_login(home_url, 'switchTab');

				var that = this;
				var var_list = Object();
				console.log('toAdDetails- to url ====>>>>>>', url);

				this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');

			},

			videometa_handle: function(e) {
				console.log('videometa_handle======>>>>>', e);
				
				return;
				
				//一次只能播放一个视频
				/* 该方法只适用于H5，因为uniapp的浏览器框架中没有 document 这个对象，也就没有getElementsByTagName这个方法
				var videos = document.getElementsByTagName('video'); 
				 for (var i = videos.length - 1; i >= 0; i--) {
				             (function(){
				                 var p = i;
				                 videos[p].addEventListener('play',function(){
				                     pauseAll(p);
				                 })
				             })()
				         }
				         function pauseAll(index){
				             for (var j = videos.length - 1; j >= 0; j--) {
				                 if (j!=index) videos[j].pause();
				             }
				         }
						 
				*/
			   
				var current_id = e.target.dataset.id;
				
				
				
				var current_index = e.target.dataset.index;

				var imgwidth = e.detail.width;
				var imgheight = e.detail.height;


				//宽高比  
				var ratio = imgwidth / imgheight;

				console.log(imgwidth, imgheight)

				//var current_view_width = this.data.current_view_width;

				// rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。
				// 如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。
				var current_view_width = 750;

				current_view_width = current_view_width * 0.9;

				//计算的高度值  
				var current_view_height = current_view_width / ratio;


				//赋值给前端
				var videometa_width_height_list = this.videometa_width_height_list;
				videometa_width_height_list[current_index] = [current_view_width, current_view_height];

				console.log('videometa_width_height_list====>>>>', videometa_width_height_list);

				this.videometa_width_height_list = videometa_width_height_list;

			},
			

			bigImg: function(e) {
				console.log('bigimage----',e);
				var index = e.currentTarget.dataset.index;
				var index2 = e.currentTarget.dataset.index2;
				var img_or_video_list = this.faquanList[index].img_or_video_list; //点击的那一组图片列表

				var imgList = [];

				for (var i = 0; i < img_or_video_list.length; i++) {
					imgList.push(img_or_video_list[i].url);
				}
				uni.previewImage({
					current: imgList[index2],
					urls: imgList,
				})

				console.log(img_or_video_list);
			},
			change_faquan_status: function(e) {
				console.log('change_faquan_status====>>>', e);

				var faquanid = e.currentTarget.dataset.faquanid;
				var status = e.currentTarget.dataset.status;

				var userInfo = this.abotapi.get_user_info();
				if (!userInfo) {
					return;
				}

				var that = this;
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + 'openapi/FaquanData/change_faquan_status',
					data: {
						appid: that.abotapi.globalData.xiaochengxu_appid,
						sellerid: that.abotapi.get_sellerid(),

						userid: userInfo.userid,
						checkstr: userInfo.checkstr,

						faquanid: faquanid,
						status: status
					},
					success: function(res) {
						if (res.data.code == 1) {
							uni.showModal({
								title: '操作成功',
								content: res.data.msg,
								showCancel: false,
								success() {
									that.page = 1;

									that.faquanList = [];

									that.__getFaquanList();
								}
							})
						} else {
							uni.showModal({
								title: '操作失败',
								content: res.data.msg,
								showCancel: false
							})
						}

					},
					fail: function(e) {
						wx.showToast({
							title: '网络异常！',
							duration: 2000
						});
					},
				});
					
				
			},
			
			
  
			copyText: function() {

			},

			callback_flash_ad_list: function(that, cms_faquan_setting) {
				console.log('cms_faquan_setting=========>', cms_faquan_setting);
				if (!cms_faquan_setting) {
					return;
				}



				if (cms_faquan_setting.faquan_add_publish_to) {

					that.faquan_add_publish_to = cms_faquan_setting.faquan_add_publish_to;

				}

				if (cms_faquan_setting.faquan_content_type_image) {

					that.faquan_content_type_image = cms_faquan_setting.faquan_content_type_image;

				}

				if (cms_faquan_setting.faquan_content_type_video) {

					that.faquan_content_type_video = cms_faquan_setting.faquan_content_type_video;

				}



				if (cms_faquan_setting.faquan_tag_status) {

					that.faquan_tag_status = cms_faquan_setting.faquan_tag_status;

				}

				if (cms_faquan_setting.faquan_add_img_url) {

					that.faquan_add_img_url = cms_faquan_setting.faquan_add_img_url;

				} else {

					that.faquan_add_img_url = 'https://yanyubao.tseo.cn/Tpl/static/images/discover_publish_add.png'

				}



				//设置默认标题    
				if (that.is_my_discover && cms_faquan_setting.faquan_my_title) {

					that.nav_title = cms_faquan_setting.faquan_my_title;
					that.current_page_title = cms_faquan_setting.faquan_my_title;

				} 
				else if (that.is_my_discover_collection && cms_faquan_setting.faquan_collect_title) {

					that.nav_title = cms_faquan_setting.faquan_collect_title;
					that.current_page_title = cms_faquan_setting.faquan_collect_title;

				} 
				else if (that.is_my_discover_like && cms_faquan_setting.faquan_like_title) {

					that.nav_title = cms_faquan_setting.faquan_like_title;
					that.current_page_title = cms_faquan_setting.faquan_like_title;

				} 
				
				else {
					if (cms_faquan_setting.faquan_list_title) {
						that.current_page_title = cms_faquan_setting.faquan_list_title;
					}
				}



				uni.setNavigationBarTitle({
					title: that.current_page_title
				})



				if (cms_faquan_setting.faquan_one_click_to_save && (cms_faquan_setting.faquan_one_click_to_save == 1)) {

					that.faquan_one_click_to_save_show = 'block';
				}





				//这个页面是否在tabBar中
				if (cms_faquan_setting.page_not_in_tabbar && (cms_faquan_setting.page_not_in_tabbar == 1)) {

					that.current_self_in_tabbar = 0

				}



				console.log('66666666666666666', cms_faquan_setting)


				console.log('cms_faquan_setting', cms_faquan_setting)

				if (cms_faquan_setting.faquan_button_status) {

					that.faquan_button_status = cms_faquan_setting.faquan_button_status;

				}
				
				
				
				
				var type = cms_faquan_setting.faquan_flash_ad_type;
				
				
				that.isShowBanner = type != 888 ? true : false;
				console.log('66666666666666666q', that.isShowBanner)
				if (type != 888) {
					uni.request({
						url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_flash_ad_list',
						method: 'post',
						data: {
							sellerid: this.abotapi.get_sellerid(),
							type: type
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: function(res) {
							var banner = res.data.data;
							console.log(res);
							console.log(banner);
				
							//that.initProductData(data);
				
							that.imgUrls = banner;
				
							console.log('that.imgUrls', that.imgUrls);
				
							//endInitData
						},
						fail: function(e) {
							uni.showToast({
								title: '网络异常！',
								duration: 2000
							});
						},
					})
				}
				
				
				


			},


			bindchange: function(e) {
				var that = this;
				console.log('1111111111dddddddd', e.detail.current)
				that.current = e.detail.current
			},
			//跳转发圈
			publishIdea: function(e) {
				uni.showActionSheet({
					itemList: ['照片', '视频'],
					success(res) {
						console.log(res.tapIndex)
						if ((res.tapIndex == 0)) {
							uni.navigateTo({
								url: '/cms/publish/publish?publishtype=image',
							})
						} else {
							uni.navigateTo({
								url: '/cms/publish/publish?publishtype=video',
							})
						}
					},
					fail(res) {
						console.log(res.errMsg)
					}
				})
			},

			//选择标签
			selectTab: function(e) {
				var that = this;
				var index = e.target.dataset.index;

				var hot_tag = that.hot_tag;

				hot_tag[index]['select'] = !hot_tag[index]['select'];

				var selectTabArr = that.data.selectTabArr;

				if (hot_tag[index]['select']) {
					selectTabArr.push(hot_tag[index].name)
				} else {

					for (var i = 0; i < selectTabArr.length; i++) {
						if (selectTabArr[i] == hot_tag[index].name) {
							selectTabArr.splice(i, 1);
							break;
						}
					}
				}



				var selectTabStr = selectTabArr.join(',')

				console.log('selectTabStr', selectTabStr)


				that.hot_tag = hot_tag,
					that.selectTabStr = selectTabStr;


				this.__getFaquanList();

			},


			//搜索发圈
			searchFaquan: function(e) {
				console.log('e====', e)
				var sousuo_text = this.sousuo_text;

				var that = this;

				var keyword = sousuo_text;

				that.page = 1;
				that.keyword = keyword;
				that.is_search = true;
				that.faquanList = [];

				that.__getFaquanList();
			},

			//取消搜索
			cancelSearch: function(e) {
				var that = this;
				that.keyword = '',
				that.is_search = false;
				that.current_faquanid = 0;
				that.page = 1;
				that.faquanList = [];
				that.is_my_discover_collection = false;
				that.is_my_discover = false;
				that.is_my_discover_like = false;

				console.log('开始取消搜索');
				this.__getFaquanList();
			},



			__getFaquanList: function() {
				
				

				var that = this;
				
				var current_faquanid = this.current_faquanid;

				var userInfo = this.abotapi.get_user_info();

				//帖子列表
				var post_url = this.abotapi.globalData.yanyubao_server_url + 'openapi/FaquanData/get_faquan_list';

				if (this.is_my_discover) {
					//我的发布
					post_url = this.abotapi.globalData.yanyubao_server_url + 'openapi/FaquanData/get_faquan_list_by_userid';
					
					if (!userInfo) {
						var last_url = '/pages/user/user';
						that.abotapi.goto_user_login(last_url, 'normal');
						return;
					}
					else{
						that.user_account_info = that.abotapi.get_user_account_info();
					}
					
				} 
				else if (this.is_my_discover_collection) {
					//我的收藏
					post_url = this.abotapi.globalData.yanyubao_server_url + 'openapi/FaquanData/get_faquan_collect_list';
					
					if (!userInfo) {
						var last_url = '/pages/user/user';
						that.abotapi.goto_user_login(last_url, 'normal');
						return;
					}
					else{
						that.user_account_info = that.abotapi.get_user_account_info();
					}
				}
				else if (this.is_my_discover_like) {
					//我的点赞
					post_url = this.abotapi.globalData.yanyubao_server_url + 'openapi/FaquanData/get_faquan_like_list';
					
					if (!userInfo) {
						
						var last_url = '/pages/user/user';
						that.abotapi.goto_user_login(last_url, 'normal');
						return;
					}
					else{
						that.user_account_info = that.abotapi.get_user_account_info();
					}
				}



				var post_data = {
					appid: this.abotapi.globalData.xiaochengxu_appid,
					sellerid: this.abotapi.get_sellerid(),
					page: that.page,
					faquanid: current_faquanid,
					keyword: that.keyword ? that.keyword : '',
					tag: that.selectTabStr
				};

				if (userInfo) {
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				}

				if (this.xianmai_shangid) {
					post_data.extend_id = this.xianmai_shangid;
					post_data.faquan_type = 1;
				}

				this.abotapi.abotRequest({
					url: post_url,
					method: 'post',
					data: post_data,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						var faquanList = res.data.data;
						that.publish_list = res.data;
						
						if(faquanList == undefined){
							return;
						}
						
						console.log('8888====11>>', that.publish_list);
						console.log('__getFaquanList===>>>>faquanList====>>>', faquanList);

						if (res.data.code == 1) {
							
							that.faquanList = that.faquanList.concat(faquanList);
							that.page = that.page + 1;

							//====== 初始化视频的大小
							console.log('准备初始化视频大小');

							for (var ii = 0; ii < that.faquanList.length; ii++) {
								if (that.faquanList[ii]['type'] == 1) {
									for (var jj = 0; jj < that.faquanList[ii]['img_or_video_list'].length; jj++) {
										var imgwidth = that.faquanList[ii]['img_or_video_list'][jj]['width'];
										var imgheight = that.faquanList[ii]['img_or_video_list'][jj]['height'];


										//宽高比
										var ratio = imgwidth / imgheight;

										console.log(imgwidth, imgheight)

										//var current_view_width = this.data.current_view_width;

										// rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。
										// 如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。
										var current_view_width = 750;

										current_view_width = current_view_width * 0.9 ;

										//计算的高度值  
										var current_view_height = current_view_width / ratio;


										//读取已经设置的宽高列表
										var videometa_width_height_list = that.videometa_width_height_list;
										var current_index = videometa_width_height_list.length;

										console.log('准备初始化视频大小 current_index ===>>>', current_index);

										videometa_width_height_list[current_index] = [current_view_width, current_view_height];

										//console.log('videometa_width_height_list====>>>>', videometa_width_height_list);

										that.videometa_width_height_list = videometa_width_height_list;

									}

								}

							}

							//====== End ================

						} else {

							that.isShowBottomLine = 1;

							/*uni.showToast({
							  title: '到底了!',
							  icon: 'none',
							  duration: 2000,
							})*/



						}
						
					},
					fail: function(e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					},
				})


			},


			//发圈收藏
			fanquanCollect: function(e) {
				console.log('e=======', e)
				var that = this;
				var faquanid = e.target.dataset.faquanid;
				var index = e.target.dataset.index;

				console.log('================fanquanCollect=====>>>>index====>>>>>', index);

				var userInfo = this.abotapi.get_user_info();

				console.log('userInfo==', userInfo);

				if (!userInfo) {
					uni.showModal({
						title: '提示',
						content: '请先登陆后再点赞',
						success: function(res) {
							if (res.confirm) {

								if (this.data.current_self_in_tabbar == 1) {
									that.abotapi.goto_user_login('switchTab /cms/discover/discover');
								} else {
									that.abotapi.goto_user_login('/cms/discover/discover');
								}
							}
							return;
						},
					})

					return;
				}

				that.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + 'openapi/FaquanData/faquan_collect',
					data: {
						sellerid: this.abotapi.get_sellerid(),
						userid: userInfo ? userInfo.userid : '',
						faquanid: faquanid,
					},
					success: function(res) {

						if (res.data.code == 1) {
							console.log('=====================>>>>index====>>>>>', index);
							if (that.faquanList[index].has_collect == '0') {
								that.faquanList[index].has_collect = "1"
									++that.faquanList[index].collect_num;
								uni.showToast({
									title: '收藏成功！',
									duration: 2000
								});
							} else {
								that.faquanList[index].has_collect = "0"
									--that.faquanList[index].collect_num;
								uni.showToast({
									title: '取消收藏成功！',
									duration: 2000
								});
							}


							that.faquanList = that.faquanList;


						}

					},
					fail: function(e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					},
				})
			},

			//点击收藏、发布、点赞按钮
			my_publish_and_collect: function(e) {

				console.log('eeeee', e);
				
				if (e.currentTarget.dataset.type == 'my_publish') {
					//我的发布
					this.page = 1;
					this.faquanList = [];
					
					this.is_my_discover = 1;
					this.is_my_discover_collection = 0;
					this.is_my_discover_like = 0;

					this.is_my_fabu_show = 1;
					this.is_like_show = 0;
					this.is_recently_show = 0;
					this.is_collection_show = 0;

					
				}
				else if (e.currentTarget.dataset.type == 'my_like') {
					//我的点赞
					this.page = 1;
					this.faquanList = [];
					
					this.is_my_discover = 0;
					this.is_my_discover_collection = 0;
					this.is_my_discover_like = 1;
					
					this.is_like_show = 1;
					this.is_collection_show = 0;
					this.is_my_fabu_show = 0;		
					this.is_recently_show = 0;
					
				}
				else if (e.currentTarget.dataset.type == 'my_collection') {
					//我的收藏
					this.page = 1;
					this.faquanList = [];
					
					this.is_my_discover = 0;
					this.is_my_discover_collection = 1;
					this.is_my_discover_like = 0;

					this.is_like_show = 0;
					this.is_collection_show = 1;
					this.is_my_fabu_show = 0;
					this.is_recently_show = 0;
					
					
				} else if (e.currentTarget.dataset.type == 'recently_update') {
					//最近更新
					this.page = 1;
					this.faquanList = [];
					
					this.is_my_discover = 0;
					this.is_my_discover_collection = 0;
					this.is_my_discover_like = 0;

					this.is_like_show = 0;
					this.is_collection_show = 0;
					this.is_my_fabu_show = 0;
					this.is_recently_show = 1;

					

					
				}
				
				
				//修改标题 为  最近更新  或其他
				/*uni.setNavigationBarTitle({
					title: this.current_page_title
				})*/
				
				this.abotapi.getFaquanSetting(this, this.callback_flash_ad_list);
				
				this.__getFaquanList();
				
				//e.detail.width  my_publish">my_collection  e.currentTarget.dataset.type;
			},

			//发圈点赞
			fanquaDianzan: function(e) {
				console.log('e=======', e)
				var that = this;
				var faquanid = e.target.dataset.faquanid;
				var index = e.target.dataset.index;

				var userInfo = this.abotapi.get_user_info();

				console.log('============>>>>>', userInfo);

				if (!userInfo) {
					uni.showModal({
						title: '提示',
						content: '请先登陆后再点赞',
						success: function(res) {
							if (res.confirm) {

								if (this.data.current_self_in_tabbar == 1) {
									that.abotapi.goto_user_login('switchTab /cms/discover/discover');
								} else {
									that.abotapi.goto_user_login('/cms/discover/discover');
								}


							}

							return;

						},


					})

					return;
				}

				that.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + 'openapi/FaquanData/faquan_like',
					method: 'post',
					data: {
						sellerid: this.abotapi.get_sellerid(),
						userid: userInfo ? userInfo.userid : '',
						faquanid: faquanid,
						checkstr:userInfo.checkstr,
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						if (res.data.code == 1) {

							if (that.faquanList[index].has_like == '0') {

								that.faquanList[index].has_like = "1";
								++that.faquanList[index].like_num;

							} else {

								that.faquanList[index].has_like = "0";
								--that.faquanList[index].like_num;

							}


							that.faquanList = that.faquanList;


						}

					},
					fail: function(e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					},
				});
			},
			//发圈举报
			fanquaJubao:function(e){
				console.log('e=======', e)
				var that = this;
				var faquanid = e.target.dataset.faquanid;
				var index = e.target.dataset.index;
				
				var userInfo = this.abotapi.get_user_info();
				
				that.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + 'openapi/FaquanData/faquan_jubao',
					method: 'post',
					data: {
						sellerid: this.abotapi.get_sellerid(),
						userid: userInfo ? userInfo.userid : '',
						faquanid: faquanid,
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						
						var msg = '您的举报请求我们已经收到，并将尽快处理！';
						if(res.data.msg){
							msg = res.data.msg;
						}
						
						uni.showModal({
							title:'感谢反馈',
							content:msg,
							showCancel:false
						})
				
					},
					fail: function(e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					},
				});
			},

			//一键保存
			oneClickSave: function(e) {
				console.log('准备下载====>>>>', e);
				var that = this;
				var index = e.target.dataset.index;
				var type = e.target.dataset.type;
				var img_or_video_list = this.faquanList[index].img_or_video_list;


				that.disabled = true;


				uni.showLoading({
					title: '正在下载……',
				})


				this.img_or_video_download(type, img_or_video_list);


			},

			img_or_video_download: function(type, img_or_video_list, i = 0) {

				var that = this;
				var file_url = this.abotapi.globalData.http_server + 'openapi/FaquanData/download_file?url=' + encodeURIComponent(
					img_or_video_list[i].url);
				console.log('file_url', file_url);
				console.log('img_or_video_list', img_or_video_list);
				uni.downloadFile({
					url: file_url, //仅为示例，并非真实的资源
					success(res) {

						// 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容       
						if (res.statusCode === 200) {
							if (type == 0) {
								uni.showLoading({
									title: '下载第' + (i + 1) + '张图片',
								})

								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function(res2) {
										++i;
										if (i == img_or_video_list.length) {
											uni.hideLoading();
											uni.showToast({
												title: '下载完成',
											})

											that.disabled = false;

										} else if (i < img_or_video_list.length) {
											that.img_or_video_download(type, img_or_video_list, i);
										}
									},
									fail(res) {
										uni.hideLoading();
										uni.showToast({
											title: '下载失败',
										})

										that.disabled = false;

									}

								})
							} else {
								uni.showLoading({
									title: '正在下载视频',
								})
								uni.saveVideoToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function(res2) {
										++i;

										if (i == img_or_video_list.length) {
											uni.hideLoading();
											uni.showToast({
												title: '下载完成',
											})

											that.disabled = false;

										} else if (i < img_or_video_list.length) {
											that.img_or_video_download(type, img_or_video_list, i);
										}
									},
									fail(res) {
										uni.hideLoading();
										uni.showToast({
											title: '下载失败',
										})

										that.disabled = false;

									}
								})
							}

						}
					}
				})
			},


			//分享
			click_share_btn: function(e) {
				console.log('clickBtn===>>>', e)

				this.onShareAppMessage(e);
			},


			//跳转到商品详情
			toProductDetail: function(e) {
				var url = e.target.dataset.url;
				var that = this;
				var var_list = Object();

				this.abotapi.call_h5browser_or_other_goto_url(url);

			},
			
			getRandomColor: function () {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			},
			/**
			 * @param {Object} e
			 * 
			 * 控制当个页面只播放一个视频
			 * 参考 https://blog.csdn.net/qq_42690547/article/details/103505890
			 */
			start_and_stop_other_videos:function(e){
				console.log('start_and_stop_other_videos=========>>>>>', e);
				//console.log('start_and_stop_other_videos=========>>>>>', e.currentTarget.dataset.id);
				
				
				
				if(this.current_video_id_playing){
					console.log('start_and_stop_other_videos======有上次播放的视频，ID为===>>>>>', this.current_video_id_playing);
					
					
					var videoContextPrev = uni.createVideoContext('myvid_'+this.current_video_id_playing);
					
					videoContextPrev.stop();
					
					/* 通过 createSelectorQuery select获取元素，没有走通
					const query = uni.createSelectorQuery().in(this);
					query.select('#'+this.current_video_id_playing).boundingClientRect(data => {
					  console.log("得到布局位置信息" + JSON.stringify(data));
					  //console.log("节点离页面顶部的距离为" + data.top);
					}).exec();
					
					
					
					let theNode = uni.createSelectorQuery().select('#'+this.current_video_id_playing);
					//console.log('createSelectorQuery theNode ===>>> ', theNode);					
					theNode.context(function(context){
						console.log('createSelectorQuery select ===>>> ', context);
						
						context.stop();
					}).exec();*/
					
				}
				
				var videoContext = uni.createVideoContext('myvid_'+ e );
				videoContext.play();
				
				/* 测试发送弹幕
				videoContext.sendDanmu({
					text: "啊啊啊啊啊啊",
					color: this.getRandomColor()
				});
				*/
			   
				//this.current_video_id_playing = e.currentTarget.dataset.id;
				this.current_video_id_playing = e;
				
				
				
				
				//马上要播放的视频
			// 	var current_video_id = e.current.dataset....index;
				
			// 	//如果视频ID与之前正在播放的不同，那么暂停之前的
				
				
			// 	console.log('faquanlist_num',this.faquanList);
			// 	var faquanlist = this.faquanList;
				
			// 	if(faquanlist.length > 0){
			// 		for(var i; i<faquanlist.length; i++){
			// 			if(current_id !=faquanlist.img_or_video_list.imgid ){
			// 				faquanlist.img_or_video_list[i].pause();
			// 			}
			// 		}
					
			// 	}
				
				
			// 	this.current_video_id_playing = current_video_id;
				
				
				
				
				
			}


		},




	};
</script>

<style lang="scss">
	/* cms/discover/discover.wxss */
	.slide-image {
		width: 100%;
		height: 350rpx;
		display: block;
	}

	.scroll-view_H {
		white-space: nowrap;
		height: 350rpx;
	}

	.scroll-view-item-img {
		width: 100%;
		height: 100%;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 350rpx;
	}



	.list-address,
	.list-time {
		min-height: 20px;
		line-height: 20px;
		height: 20px;
		justify-content: space-around;
	}

	.list-address {
		color: #999;
		display: flex;
		height: 60rpx;
		margin-top: 20rpx;
	}

	.list-time {
		color: #999;
		margin-top: 5px;
	}

	.section-title {
		padding: 5px;
		font-size: 14px;
		border-left: 5px solid #ffa404;
	}

	.list-icon {
		float: left;
		margin-top: 2px;
		width: 15px;
		height: 15px;
	}

	.list-icon-text {
		margin-left: 20px;
	}



	.list-botton {
		margin-top: 6rpx;
		height: 18rpx;
		line-height: 40rpx;
		text-align: right;
	}

	.list-bottom-icon {
		width: 20px;
		height: 20px;
	}







	.c-1 {
		padding: 16rpx 5%;
		margin-bottom: 36rpx;
	}

	.c-1 input {
		border-radius: 10rpx;
		border: 2rpx solid #ccc;
		font-size: 28rpx;
		height: 70rpx;
		padding: 6rpx 10rpx 0rpx 60rpx;
	}

	.c-1 image {
		position: relative;
		width: 30rpx;
		height: 30rpx;
		left: 18rpx;
		top: 65rpx;
	}

	.cancel-search {
		position: fixed;
		width: 80rpx;
		font-size: 22rpx;
		left: 650rpx;
		bottom: 34rpx;
		background: #6798E9;
		color: #fff;
		border-radius: 100px;
		height: 80rpx;
		line-height: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.publish-idea {
		position: fixed;
		font-size: 22rpx;
		left: 650rpx;
		bottom: 130rpx;
		color: #fff;
		border-radius: 100px;
		line-height: 40rpx;
		display: flex;
		z-index: 3;
		flex-direction: column;
		align-items: center;
		z-index: 999;
	}

	.publish-idea image {
		width: 100rpx;
		height: 100rpx;
		z-index: 999;
	}

	.cancel-search view {
		height: 40rpx
	}


	.col-con {
		height: 30vw;
		border-bottom: 2rpx solid #eee;
		padding: 18rpx 0 18rpx 20rpx;
		font-weight: bold;
		color: #eee;
		background-color: #3D9140;
	}

	.bottom-line {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		color: #666;
		height: 150rpx;
	}

	.bottom-line-a {
		border: 2rpx solid #eee;
		width: 15%;
	}


	.download-con {
		height: 60rpx;
		line-height: 60rpx;
		color: #333;
		font-size: 28rpx;
	}

	.pb-time {
		color: #666;
		font-size: 26rpx;
		margin-top: 10rpx;
	}

	.tab-info {
		margin-top: 30rpx;
	}

	.tab-con {
		width: 90%;
		margin-left: 5%;
	}

	.tab-con view {
		float: left;
		height: 100vw;
		border: 2rpx solid#1E90FF;
		color: #1E90FF;
		margin-right: 20rpx;
		border-radius: 4px;
		font-size: 30rpx;
		padding: 10rpx 20rpx;
	}

	.tab-con-each {
		width: 90%;
		margin-left: 0%;
	}

	.tab-con-each view {
		float: left;
		border: 2rpx solid#1E90FF;
		color: #1E90FF;
		margin-left: 20rpx;
		border-radius: 4px;
		font-size: 26rpx;
		padding: 6rpx 16rpx;
	}

	.select-tab {
		color: #fff !important;
		background: #1E90FF;
	}

	.nav_icon_btn {
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #ccc;
		padding: 10px;
		margin: 2%;
		border-radius: 10rpx;
		border: 1px solid #ccc;
	}
	
	.my_publish888888 {
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		margin: 2%;
		border-radius: 10rpx;
		border: 1px solid #ccc;
	}

	.publish_box {
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 28rpx;
		color: #333;
		margin-top: 5rpx;
	}

	

	.swiper {
		width: 100%;
		margin-top: 10upx;
		display: flex;
		justify-content: center;

		.swiper-box {
			width: 92%;
			// height: 30.7vw;
			overflow: hidden;
			border-radius: 15upx;
			box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
			//兼容ios，微信小程序
			position: relative;
			z-index: 1;

			swiper {
				width: 100%;

				// height: 30.7vw;
				swiper-item {
					image {
						width: 100%;
						height: auto;
					}
				}
			}

			.indicator {
				position: absolute;
				bottom: 20upx;
				left: 20upx;
				background-color: rgba(255, 255, 255, 0.4);
				width: 150upx;
				height: 5upx;
				border-radius: 3upx;
				overflow: hidden;
				display: flex;

				.dots {
					width: 0upx;
					background-color: rgba(255, 255, 255, 1);
					transition: all 0.3s ease-out;

					&.on {
						width: (100%/3);
					}
				}
			}
		}
	}

	.icon-number {
		width: 100%;
		display: flex;
		margin-bottom: 22px;

	.left {
			width: 15vw;
			height: 15vw;
			flex-shrink: 0;
			margin-right: 20upx;
			border-radius: 100%;

			image {
				width: 15vw;
				height: 15vw;
				border-radius: 100%;
			}

		}

	.right {
			width: 100%;
			.username {
				font-size: 32upx;
				color: #FFFFFF;
			}

		}
	}
	.publist_list_num{
		display: flex;
		margin-top: -20rpx;
	}
	
	
</style>
