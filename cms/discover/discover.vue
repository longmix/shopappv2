<template>
	<view>
	<!--cms/discover/discover.wxml-->
	<!--滚动图片start-->
	 <view v-if="!is_my_discover_collection && !is_my_discover && isShowBanner">
	  <swiper @change="bindchange" indicator-dots="true" autoplay="true" interval="5000" duration="500" style="height:imgheights[current]+'upx';">
	    <block v-for="(item,index) in imgUrls" :key="index">
	      <swiper-item>
	        <image :src="item.image"  :data-id="index"  mode="widthFix" class="slide-image" @load="imageLoad($event)" @tap="toProductDetail" :data-url="item.url"/>
	      </swiper-item>
	    </block>
	  </swiper>
	</view>
	<!--滚动图片end-->
	
	<view v-if="!is_my_discover_collection && !is_my_discover" class='c-1'>
	  <image src="../../static/img/search.png"></image>
	  <input placeholder='搜索' @confirm='searchFaquan'> </input>
	</view>
	
	<!-- 标签start -->
	
	
	  <view class="tab-con" v-if="faquan_tag_status == 1">
	    <view class="item.select == true ? 'select-tab' : ''" @tap="selectTab"  v-for='(item,index) in hot_tag'  :key="index" :data-index="index">{{item.name}}</view>
	  
	  </view>
	  <view style="clear:both;"></view>
	
	
	
	
	<!-- 标签end -->
	 
	<!-- 总共收藏数 或 发布  -->
	<view class='col-con' v-if="is_my_discover_collection || is_my_discover"  style="height: 100upx;line-height: 100upx;" :style="{'background-color': wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color=='#000000' ? '#333' : wxa_shop_nav_font_color}">
	  <view >{{nav_title}}</view> <view style="color:#E0B351;margin-left:20rpx;font-weight:normal;"></view>
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
	:faquan_tag_status="faquan_tag_status" 
	:disabled="disabled"
	@fanquaDianzan="fanquaDianzan"
	@bigImg="bigImg"
	@videometa="videometa"
	@change_faquan_status="change_faquan_status"
	@oneClickSave="oneClickSave" 
	@fanquanCollect="fanquanCollect"
	@copyText="copyText"
	>
	</discoverList>
	<!-- End of 004  -->
	
	
	<!-- 发圈列表 end-->
	
	
	<view class="bottom-line" v-if="isShowBottomLine">
	    <view class='bottom-line-a'></view>
	    <view>我也是有底线的</view>
	     <view class='bottom-line-a'></view>
	</view>
	
	<view class='cancel-search' v-if="is_search" @tap='cancelSearch'>
	  <view>取消</view>
	  <view>搜索</view>
	</view>
	<view class="publish-idea" style=''  v-if="faquan_button_status==1">
	  <image :src="faquan_add_img_url" @tap="publishIdea"></image>
	</view>
	</view>
</template>

<script>
	import discoverList from '../../components/discover-list/discover-list.vue';
	export default {
		components:{
			discoverList
		},
		data() {
			return {
				page: 1,
				faquanList: [],
				isShowBottomLine: 0,
				display_type:'my',
				imgheights: [],
				current: 0,
				startself:0,
				selectTabArr: [],
				current_self_in_tabbar:1,  //当前这个page挂接在底部导航中，用switchTab跳转
				faquan_add_img_url:'http://yanyubao.tseo.cn/Tpl/static/images/discover_publish_add.png',
				videometa_width_height_list:[],  //记录视频的高度
				current_view_width : 480,  //当前屏幕的宽度
				current_page_title:'发圈.发现.随拍',
				shop_info:'',
				current_faquanid :0,
				faquan_one_click_to_save_show:'none',
				faquan_tag_status:0,
				is_my_discover: 0,
				is_my_discover_collection: 0,
			
				faquan_button_status: 0,
				selectTabStr:'',
				faquan_add_publish_to:0,
			
				faquan_content_type_image: 0,
				faquan_content_type_video : 0,
				imgUrls:[],
				hot_tag:'',
				is_search:'',
			    idx:'',
				img_or_video_list:'',
				item2:'',
	            tag:'',
				idx2:''
			};
		},
		onLoad(options) {
			
			console.log('ddddddddd',options);
			this.abotapi.set_option_list_str(this, this.callback_set_option_list_str);
			this.callback_func_for_shop_info;
			
			
			
			
			
			console.log('discover options====>>>>', options);
			
			if(options){
			  if (options.faquanid){
				  that.current_faquanid = options.faquanid,
				  that.is_search = true;
			  }
			  else if (options.display_type){
				if (options.display_type == 'my'){
					
					that.is_my_discover = 1;
					that.nav_title = '发现.我发布的';
					that.current_page_title = '发现.我发布的';
					
				}
				else if (options.display_type == 'collect') {

					that.is_my_discover_collection = 1;
					that.nav_title = '发现.我收藏的';
					that.current_page_title = '发现.我收藏的';

				}
				
		
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
		
			this.abotapi.set_option_list_str(that, function (that02, option_list) {
			  that02.abotapi.getColor();
		
			  if (option_list.wxa_shop_nav_bg_color) {

				  that.wxa_shop_nav_bg_color = option_list.wxa_shop_nav_bg_color;
				  that.wxa_shop_nav_font_color = option_list.wxa_shop_nav_font_color;

			  }
		
			});
		
			this.abotapi.get_shop_info_from_server(function (shop_info) {
			  console.log('product/detail/index get_shop_info_from_server 回调：');
			  console.log(shop_info);
		

				that.shop_info = shop_info;

		
			})
			
			
			
			
			
			
			
			
			
			
			
		},
		onShow(){
			
		
		
			this.__getFaquanList();
		},
		onReady(){
			
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
	  onShareAppMessage: function (res) {
		console.log('onShareAppMessage=========',res)
		console.log('onShareAppMessage')
	
		var faquanid = res.target.dataset.id;
	
		var faquanList = this.data.faquanList;
	
		console.log(faquanList);
	
		var current_faquan = null;
	
		var share_path = 'pages/discover/discover?faquanid='+faquanid;
		var share_title = this.data.current_page_title;
		var share_img = this.data.shop_info.icon;
	
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
	
	  /**
	  * 页面相关事件处理函数--监听用户下拉动作
	  */
	  onPullDownRefresh: function () {
		
		  that.page = 1;
		  that.isShowBottomLine = 0;
		  that.faquanList = [];

	
		this.abotapi.delFaquanSetting();
		this.abotapi.getFaquanSetting(this, this.callback_flash_ad_list);
	
		this.__getFaquanList();
	
		console.log('下拉刷新==============')
		//停止当前页面的下拉刷新
	
		uni.stopPullDownRefresh();
	 },
	  
	
		
	methods: {
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
		  
		},
		
		videometa:function(e){
		    console.log('videometa======>>>>>', e);
		
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
		
		    current_view_width = current_view_width*0.9*0.9;
		
		    //计算的高度值  
		    var current_view_height = current_view_width / ratio;
		
		
		    //赋值给前端
		    var videometa_width_height_list = this.videometa_width_height_list;
		    videometa_width_height_list[current_index] = [current_view_width, current_view_height];
		
		    console.log('videometa_width_height_list====>>>>', videometa_width_height_list);
		
		    this.videometa_width_height_list = videometa_width_height_list;
		    
		},
			
			
		callback_flash_ad_list: function (that, cms_faquan_setting){
			    if (!cms_faquan_setting){
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
			
			    if (cms_faquan_setting.faquan_add_img_url){
			    
			        that.faquan_add_img_url = cms_faquan_setting.faquan_add_img_url;
			 
			    }
			    else{
			    
			        that.faquan_add_img_url =  'http://yanyubao.tseo.cn/Tpl/static/images/discover_publish_add.png'
			
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
			    else{
			      if (cms_faquan_setting.faquan_list_title) {
			       that.current_page_title = cms_faquan_setting.faquan_list_title;
			      }
			    }
			
			 
			
			    uni.setNavigationBarTitle({
			      title: that.current_page_title
			    })
			
			
			
			    if (cms_faquan_setting.faquan_one_click_to_save && (cms_faquan_setting.faquan_one_click_to_save == 1)) {
			
			    that.faquan_one_click_to_save_show =  'block';
			    }
			
			
			  
			
			
			    //这个页面是否在tabBar中
			    if (cms_faquan_setting.page_not_in_tabbar && (cms_faquan_setting.page_not_in_tabbar == 1)){
			      
			        that.current_self_in_tabbar = 0
			 
			    }
				
			
				
				console.log('66666666666666666',cms_faquan_setting)
			
			    var type = cms_faquan_setting.faquan_flash_ad_type;
			
			   
			      that.isShowBanner = type!=888 ?  true : false ;
			  
			    if(type != 888){
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
			        success: function (res) {
			          var banner = res.data.data;
			          console.log(res);
			          console.log(banner);
			
			          //that.initProductData(data);
			          
			            that.imgUrls = banner;
						
						console.log('that.imgUrls',that.imgUrls);
			      
			          //endInitData
			        },
			        fail: function (e) {
			          uni.showToast({
			            title: '网络异常！',
			            duration: 2000
			          });
			        },
			      })
			    }
			
			    console.log('cms_faquan_setting', cms_faquan_setting)
			
			    if (cms_faquan_setting.faquan_button_status){
			      
			        that.faquan_button_status = cms_faquan_setting.faquan_button_status;
		
			    }
			    
			
			  },
			
			  
			  bindchange: function (e) {
								var that = this;
			    // console.log(e.detail.current)
			  				that.current = e.detail.current
			  },
			  //跳转发圈
			  publishIdea:function(e){
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
			   selectTab:function(e){
			     var that = this;
			     var index = e.target.dataset.index;
			  		  
			     var hot_tag = that.hot_tag;
			  		  
			     hot_tag[index]['select'] = !hot_tag[index]['select']; 
			  		  
			     var selectTabArr = that.data.selectTabArr;
			  		  
			     if (hot_tag[index]['select']){
			       selectTabArr.push(hot_tag[index].name)
			     }else{
			  		  
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
			  searchFaquan: function (e) {
			    console.log('e====',e)
			
			    var that = this;
			
			    var keyword = e.detail.value;
			    
			      that.page = 1;
			      that.keyword = keyword;
			      that.is_search = true;

			
			    that.__getFaquanList();
			  },
			
			  //取消搜索
			  cancelSearch:function(e){
			  
			      that.keyword = '',
			      that.is_search = false;
			      that.current_faquanid = 0;
			      that.page = 1;
			    
			
			    this.__getFaquanList();
			  },
			
			
			
			  __getFaquanList:function(){
				  
			    var that = this;
			
			    var current_faquanid = this.current_faquanid;
			
			    var userInfo = this.abotapi.get_user_info();
			
			    var post_url = this.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/FaquanData/get_faquan_list';
			
			    if(this.is_my_discover){
			      post_url = this.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/FaquanData/get_faquan_list_by_userid';
			    }
			    else if(this.is_my_discover_collection){
			      post_url = this.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/FaquanData/get_faquan_collect_list';
			    }
				
			
			
			    var post_data = {
			      appid: this.abotapi.globalData.xiaochengxu_appid,
			      sellerid: this.abotapi.get_sellerid(),
			      page: that.page,
			      faquanid: current_faquanid,
			      keyword: that.keyword ? that.keyword : '',
			      tag: that.selectTabStr
			    };
				
			    if (userInfo){
			      post_data.userid = userInfo.userid;
			      post_data.checkstr = userInfo.checkstr;
			    }
			
			    
				
			    this.abotapi.abotRequest({
			      url: post_url,
			      method: 'post',
			      data: post_data,
			      header: {
			        'Content-Type': 'application/x-www-form-urlencoded'
			      },
			      success: function (res) {
			        var faquanList = res.data.data;
			
			        console.log('__getFaquanList===>>>>faquanList====>>>', faquanList)
			
			        if (res.data.code == 1) {
			   
			            that.faquanList = that.faquanList.concat(faquanList);
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
			
			
			  //发圈收藏
			  fanquanCollect:function(e){
			    console.log('e=======',e)
			    var that = this;
			    var faquanid = e.target.dataset.faquanid;
			    var index = e.target.dataset.index;
				
				console.log('================fanquanCollect=====>>>>index====>>>>>', index);
			
			    var userInfo = this.abotapi.get_user_info();
			
			    console.log('userInfo==',userInfo);
				
				if (!userInfo) {
				  uni.showModal({
				    title: '提示',
					content:'请先登陆后再点赞',
				    success: function (res) {
						if(res.confirm){
							
							if (this.data.current_self_in_tabbar == 1) {
								that.abotapi.goto_user_login('switchTab /cms/discover/discover');
							}
							else{
								that.abotapi.goto_user_login('/cms/discover/discover');
							}
						}						
						return;						
				    },
				  })
				  
				  return;
				}
			
			    that.abotapi.abotRequest({
			      url: this.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/FaquanData/faquan_collect',
			      data: {
			        sellerid: this.abotapi.get_sellerid(),
			        userid: userInfo ? userInfo.userid : '',
			        faquanid: faquanid,
			      },
			      success: function (res) {
			
			        if(res.data.code == 1){
						console.log('=====================>>>>index====>>>>>', index);
			
			          if (that.faquanList[index].has_collect == '0'){
			            that.faquanList[index].has_collect = "1"
			            uni.showToast({
			              title: '收藏成功！',
			              duration: 2000
			            });
			          }else{
			            that.faquanList[index].has_collect = "0"
			            uni.showToast({
			              title: '取消收藏成功！',
			              duration: 2000
			            });
			          }
			          
			    
			            that.faquanList = that.faquanList;
	
			           
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
			
			
			  //发圈点赞
			  fanquaDianzan: function (e) {
			    console.log('e=======', e)
			    var that = this;
			    var faquanid = e.target.dataset.faquanid;
			    var index = e.target.dataset.index;
			
			    var userInfo = this.abotapi.get_user_info();
				
				console.log('============>>>>>', userInfo);
			
			    if (!userInfo) {
			      uni.showModal({
			        title: '提示',
					content:'请先登陆后再点赞',
			        success: function (res) {
						if(res.confirm){
							
							if (this.data.current_self_in_tabbar == 1) {
								that.abotapi.goto_user_login('switchTab /cms/discover/discover');
							}
							else{
								that.abotapi.goto_user_login('/cms/discover/discover');
							}
							
							
						}
						
						return;
						
			        },
					
					
			      })
			
			      return;
			    }
			
			    that.abotapi.abotRequest({
			      url: this.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/FaquanData/faquan_like',
			      method: 'post',
			      data: {
			        sellerid: this.abotapi.get_sellerid(),
			        userid: userInfo ? userInfo.userid : '',
			        faquanid: faquanid,
			      },
			      header: {
			        'Content-Type': 'application/x-www-form-urlencoded'
			      },
			      success: function (res) {
			        if (res.data.code == 1) {
			
			          if (that.faquanList[idx].has_like == '0') {
			
			            that.faquanList[idx].has_like = "1";
			            ++that.faquanList[idx].like_num;
			          
			          } else {
			
			            that.faquanList[idx].has_like = "0";
			            --that.faquanList[idx].like_num;
			           
			          }
			
			         
			            that.faquanList = that.faquanList;
			      
			
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
			
			//一键保存
			  oneClickSave:function(e){
			    console.log('准备下载====>>>>', e);
			
			    var index = e.target.dataset.index;
			    var type = e.target.dataset.type;
			    var img_or_video_list = this.data.faquanList[index].img_or_video_list;
			
			
			      that.disabled = true;
			
			
			    uni.showLoading({
			      title: '正在下载……',
			    })
			
			    if(type == 0 ){
			      this.img_or_video_download(type, img_or_video_list);
			    }
			    
			  },
			
			  img_or_video_download: function (type, img_or_video_list, i=0){
			    var that = this;   
			    var file_url = this.abotapi.globalData.http_server + 'openapi/FaquanData/download_file?url=' + encodeURIComponent(img_or_video_list[i].url);
			  
			    uni.downloadFile({
			      url: file_url, //仅为示例，并非真实的资源
			      success(res) {
			        
			        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容       
			          if (res.statusCode === 200) {
			            if(type == 0){
			              uni.showLoading({
			                title: '下载第' + (i + 1) + '张图片',
			              })
			
			              uni.saveImageToPhotosAlbum({
			                filePath: res.tempFilePath,
			                success: function (res2) {
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
			            }else{
			              uni.showLoading({
			                title: '正在下载视频',
			              })
			              uni.saveVideoToPhotosAlbum({
			                filePath: res.tempFilePath,
			                success: function (res2) {
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
			  clickBtn:function(e){
			    console.log('clickBtn===>>>', e)
			
			    this.onShareAppMessage(e);
			  },
			
			
			
			
			
			 },
		
				//跳转到商品详情
				toProductDetail:function(e){
					var url = e.target.dataset.url;
					var that = this;
					var var_list = Object();
					
					this.abotapi.call_h5browser_or_other_goto_url(url);
					
				}
					
					
			};
</script>

<style>
/* cms/discover/discover.wxss */
.slide-image{
  width:100%;
  height:350rpx;
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
  height:20px;
 justify-content:space-around;
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







.c-1{
  padding: 16rpx 5%;
  margin-bottom: 36rpx;
}
.c-1 input{
  border-radius:100rpx;
  border:2rpx solid #ccc;
  font-size:28rpx;
  height: 70rpx;
  padding:6rpx 10rpx 0rpx 60rpx;
}

.c-1 image{
  position: relative;
  width:30rpx;
  height:30rpx;
  left:18rpx;
  top:65rpx;
}
.cancel-search{
  position:fixed;
  width:80rpx;
  font-size:22rpx;
  left:650rpx;
  bottom:34rpx;
  background:#6798E9;
  color:#fff;
  border-radius:100px;
  height:80rpx;
  line-height:40rpx;
  display:flex;
  flex-direction: column;
  align-items: center;
}

.publish-idea{
  position:fixed;
  font-size:22rpx;
  left:650rpx;
  bottom:130rpx;
  color:#fff;
  border-radius:100px;
  line-height:40rpx;
  display:flex;
  flex-direction: column;
  align-items: center;
}

.publish-idea image{
  width: 100rpx;
  height: 100rpx;
}

.cancel-search view{
  height: 40rpx
}








.col-con{
  display:flex;
  font-size:32rpx;
  border-bottom:2rpx solid #eee;
  padding:18rpx 0 18rpx 20rpx;
  font-weight:bold;
}

.bottom-line{
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:28rpx;
  color:#666;
  height: 150rpx;
}

.bottom-line-a{
  border:2rpx solid #eee;
  width:15%;
}

.download-img{
  width:28rpx;
  height:28rpx;
  margin-right:10rpx;
}



.download-con{
  height: 60rpx;
  line-height: 60rpx;
  color: #333;
  font-size:28rpx;
}

.pb-time{
  color: #666;
  font-size: 26rpx;
  margin-top:10rpx;
}

.tab-info{
  margin-top: 30rpx;
}

.tab-con{
  width: 90%;
  margin-left: 5%;
}

.tab-con view{
  float: left;
  border: 2rpx solid#1E90FF;
  color: 	#1E90FF;
  margin-right: 20rpx;
  border-radius: 4px;
  font-size: 30rpx;
  padding: 10rpx 20rpx;
}

.tab-con-each{
  width: 90%;
  margin-left: 0%;
}

.tab-con-each view{
  float: left;
  border: 2rpx solid#1E90FF;
  color: #1E90FF;
  margin-left: 20rpx;
  border-radius: 4px;
  font-size: 26rpx;
  padding: 6rpx 16rpx;
}

.select-tab{
  color:#fff !important;
  background: #1E90FF;
}
</style>
