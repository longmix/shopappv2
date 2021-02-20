<template>
	<view>
		<block v-if="video_url">
			<video @tap='start_and_stop_other_videos()' :src="video_url"  :poster='video_cover_url' :controls="true" :autoplay="video_autoplay" :bindloadedmetadata="videometa" :style="{width:videometa_width_height[0]+'upx', height:videometa_width_height[1] + 'rpx'}">
			</video>
		</block>
		
		
		<block v-if="content_type == 'cms'">
		<view class='wenzhang_detail'>
			
			
			
			
			
<!-- #ifdef MP-ALIPAY -->			
			<rich-text :nodes="index_rich_html_content"></rich-text>
<!-- #endif -->				
<!-- #ifndef MP-ALIPAY -->
			
			<!-- 富媒体组件 2021.1.18. -->
			<!-- rich-text  和 v-html 都有各自的优缺点 -->
			<u-parse v-if="index_rich_html_content" 
				:content="index_rich_html_content" 
				@preview="preview" 
				@navigate="index_rich_html_click" />
<!-- #endif -->
			
		</view>
		</block>
		
		<block v-if="content_type == 'pic'">
		<view>
			<image :src="content_pic_image" :data-url="content_pic_url" mode="widthFix" style="width:100%" @tap="content_pic_click"></image>
		</view>
		</block>
		
		<view class="list" v-if="wxa_show_latest_product_in_welcome_page == 1">
		    <block v-for="item in shopList" :key="item">
		        <view class="ban">
		            <navigator :url="'../product/detail?productid=' + item.productid" class="cover flex-wrp">
		                <image class="banner" :src="item.picture" mode="widthFix"></image>
		          <view class="act-item ellipsis">
		              <text class="type">{{item.name}}</text>
		            </view>
		              <view class="act-item ellipsis" >
		                <text class="kkk">{{item.seller_name}}</text>
		            </view> 
		            <view class="act-item ellipsis" >
		                <text style="color:red">¥ {{item.price}}</text>
		            </view>
		              <view class="act-item ellipsis" >
		                <text style="color:#999999;font-size:25rpx">已有{{item.sale_volume}}人购买</text>
		            </view>
		            </navigator>
		        </view> 
		        
		    </block>
		
		</view>
		<view style="padding-bottom:120rpx;"></view>
		<view class="zdy_btn_box" 
			v-if="welcome_page_btn_count > 0"
			:style="{background:welcome_page_bottom_bg_color,color:welcome_page_bottom_font_color,borderTop:'1rpx solid '+ welcome_page_bottom_font_color}">
		    <view :class="[welcome_page_btn_count > 2 ? 'btn_up_and_dow' : 'btn_left_and_right']" 
				v-for="(item,index) in welcome_page_bottom_icon_list" 
				:key="index" 
				@click="btn_to_page" 
				:data-url="item.url">
		        <image :style="{width:welcome_page_bottom_icon_size + 'rpx',height:welcome_page_bottom_icon_size + 'rpx'}" :src="item.src" style="width:40rpx;height:40rpx;"></image> 
		        <view :style="{fontSize:welcome_page_bottom_font_size + 'rpx'}">{{item.name}}</view>
		    </view>
		</view>
		
	</view>
</template>

<script>

var ttt = 0;
//高德SDK 
// import bmap from '../../common/SDK/bmap-uni.js';
// import io from '../../common/weapp.socket.io.js'; 
// import locationapi from '../../common/locationapi.js'; 

//import abotapi001 from '../../../common/abotapi.js';

import uParse from '@/components/gaoyia-parse/parse.vue'

// #ifdef MP-ALIPAY
	import parseHtml from "../../common/html-parser.js"
// #endif


export default {
	components:{
		uParse
	},
	data() {
		return {
			get_default_imgid:false,
			content_type:'cms',
			video_autoplay:false,
			current_title : '',
			content_pic_image:'',
			content_pic_url:'',
			video_cover_url:'',
			video_url:'',
			wxa_show_latest_product_in_welcome_page:'',
			is_more:'',
			
			index_rich_html_content:'<h1></h1>',
			
			shopList:[],
			page:1,
			
			//底部导航按钮
			welcome_page_bottom_font_color:'#fff',
			welcome_page_bottom_bg_color:'#000',
			welcome_page_bottom_icon_list:[],
			welcome_page_btn_count:0,
			
			//按钮的数量控制字体和图片的大小
			welcome_page_bottom_font_size:'30',
			welcome_page_bottom_icon_size:'40',
			
			current_params_str:'',
			wxa_share_img:''
		};
	},
	onPageScroll: function (e) {
		
	},
	//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh: function () {
		
	},
	
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom: function () {
		
	},
	onLoad: function (options) {
		
		console.log('welcome welcome welcome ====>>123', options);
		
		//=====分析参数=====
		if(options){
		  var arr = Object.keys(options);
		  var options_len = arr.length;
				
		  if (options_len > 0){
			var params_str = '';
				
			for(var key in options){
			  params_str += key+'='+options[key]+'&';
			}
			params_str = params_str.substr(0, params_str.length - 1);
				
			this.current_params_str = params_str;
		  }
		}
		//===== End ======
		
		this.abotapi.set_option_list_str(this, this.__handle_option_list);
		
		if (options.scene != null) {
			
			//1、指定渠道
			var url_value = decodeURIComponent(options.scene);

			console.log(url_value);

			var url_data = url_value.split('@');
			console.log(url_data);

			if (url_data.length < 3) {
				//跳转到首页
				uni.switchTab({
					url: '../index/index'
				})
				return;
			}

			var imgid = url_data[0];
			var parentid = url_data[1];
			var platform = url_data[2];

			this.abotapi.set_current_parentid(parentid);

			if(platform == 'cms'){
				this.__get_img_from_weiduke(imgid, this);
			}
			else if(platform == 'pic'){
				this.__get_pic_from_yanyubao(imgid, this);
				this.setData({content_type:'pic'});
			}
		}
		else if(options.data_url){
		  //2、 指定网址
		  var parentid = options.parentid;
		  if(parentid){
			this.abotapi.set_current_parentid(parentid);
		  }
	
		  this.__get_img_from_data_url(decodeURIComponent(options.data_url), this);
	
		}
		else{
			
			console.log('options===============>>>>>', options);
			
		  //3、其他方式：直接传参
		  var imgid = options.imgid;
		  var parentid = options.parentid;
		  var platform = options.platform;
			
		  if(parentid){
			this.abotapi.set_current_parentid(parentid);
		  }
			
		  if(!platform){
			platform = 'cms';
		  }
			
		  if(platform == 'cms'){
			if(!imgid){
			  this.get_default_imgid = true;
			}
			
			this.__get_img_from_weiduke(imgid, this);
		  }
		  else if(platform == 'pic'){
			this.__get_pic_from_yanyubao(imgid, this);
			this.content_type = 'pic';
		  }
		}
		
		
	},
	onShow:function(){
		
	},
	onShareAppMessage: function () {
		console.log('app.globalData.shop_name : ' + app.globalData.shop_name);
		
		var last_url = '/pages/welcome_page/welcome_page';
		if(that.current_params_str.length > 5){
			last_url = '/pages/welcome_page/welcome_page?'+that.current_params_str;
		}
		
		
		return {
		  title: '' + this.data.current_title,
		  path: last_url,
		  success: function (res) {
			// 分享成功
		  },
		  fail: function (res) {
			// 分享失败
		  }
		}
		
	},
	onShareTimeline: function () {
		var last_url = '';
		if(that.current_params_str.length > 5){
			last_url = ''+that.current_params_str;
		}
		
		var share_img = that.wxa_share_img;
		
		return {
		    title: '' + this.data.current_title,
		    query: last_url,
		    imageUrl:share_img,
		}
		
	},
	onAddToFavorites: function () {
		this.onShareTimeline();
	},
	
	
	methods: {
		__handle_option_list:function(that, option_list){
		    that.abotapi.getColor();
			
			console.log('1222dsfsd23456',option_list);
			
			//获取自定义页面导航图标
			if(option_list && option_list.welcome_page_bottom_icon_list){
				console.log('122223456',option_list.welcome_page_bottom_icon_style);
				//设置底部导航的颜色风格
				
				if(option_list.welcome_page_bottom_icon_style && (option_list.welcome_page_bottom_icon_style == 1)){
				  //底色变成文字的颜色，文字变成底色
					that.welcome_page_bottom_bg_color = option_list.wxa_shop_nav_font_color;
					that.welcome_page_bottom_font_color = option_list.wxa_shop_nav_bg_color;
				}
				else{
					that.welcome_page_bottom_bg_color = option_list.wxa_shop_nav_bg_color;
					that.welcome_page_bottom_font_color = option_list.wxa_shop_nav_font_color;
				}
					
				that.welcome_page_bottom_icon_list = option_list.welcome_page_bottom_icon_list;
				that.welcome_page_btn_count = option_list.welcome_page_bottom_icon_list.length;
				
				
				if(option_list.welcome_page_bottom_icon_list.length == 1){
					that.welcome_page_bottom_font_size = '60';
					that.welcome_page_bottom_icon_size = '70';
				}
				else if(option_list.welcome_page_bottom_icon_list.length == 2){
					that.welcome_page_bottom_font_size = '45';
					that.welcome_page_bottom_icon_size = '52';
				}
				if(option_list.welcome_page_bottom_icon_list.length == 3){
					that.welcome_page_bottom_font_size = '35';
					that.welcome_page_bottom_icon_size = '40';
				}
				
			}
			
			if (option_list.wxa_share_img) {
				//分享转发图片
			  
			    that.wxa_share_img = option_list.wxa_share_img;
			}
			
		    if(this.get_default_imgid && option_list && option_list.wxa_default_imgid_in_welcome_page){
		      this.__get_img_from_weiduke(option_list.wxa_default_imgid_in_welcome_page, this);
		    }
		
		
		    if(!option_list || !option_list.wxa_show_latest_product_in_welcome_page){
		      return;
		    }
		
		    //获取最新的商品信息
		    var wxa_show_latest_product_in_welcome_page = option_list.wxa_show_latest_product_in_welcome_page;
		
		    that.wxa_show_latest_product_in_welcome_page = wxa_show_latest_product_in_welcome_page;
		
		    if(wxa_show_latest_product_in_welcome_page == 1){
		      console.log('66666666666', that.data.cataid)
		      uni.request({
		        url: this.abotapi.globalData.http_server + '?g=Yanyubao&m=ShopAppWxa&a=product_list',
		        method: 'post',
		        data: {
		          sellerid: this.abotapi.get_sellerid(),
		          keyword: that.data.searchValue ? that.data.searchValue : '',
		          sort: 1,
		          page: that.data.page,
		          cataid: that.data.cataid ? that.data.cataid : ''
		        },
		        header: {
		          'Content-Type': 'application/x-www-form-urlencoded'
		        },
		        success: function (res) {
		          var data = res.data.product_list;
		          if (data == '') {
		            uni.showToast({
		              title: '没有更多数据！',
		              duration: 2000
		            });
		            that.is_more = false;
		            return false;
		          }
				  that.shopList = data;
				  that.page = 1;
				  that.is_more = true;
				  
		          
		        },
		        fail: function (e) {
		          uni.showToast({
		            title: '网络异常！',
		            duration: 2000
		          });
		        },
		      });
		
		    }
		
		  },
		
		  __get_img_from_weiduke: function (imgid, that){
		
		    uni.showLoading({
		      title: '数据加载中……',
		    });
		
		    var url = this.abotapi.globalData.weiduke_server_url + 'index.php/openapi/ArticleImgApi/article_detail.shtml';
		    var data = {
		      token: this.abotapi.get_current_weiduke_token(),
		      id: imgid,
		      openid: this.abotapi.get_current_openid()
		    };
		
		
		    var cbSuccess = function (res) {
		      uni.hideLoading();
		
		      if (res.data.code == 1) {
		        //var wz_keyword = res.data.data.keyword;
		        
		
		        uni.setNavigationBarTitle({
		          title: res.data.data.title
		        })
		        that.current_title = res.data.data.title;
		          
				that.index_rich_html_content = res.data.data.info;
		        
		        //WxParse.wxParse('content', 'html', res.data.data.info, that, 15);
				
// #ifdef MP-ALIPAY		
						console.log('that.index_rich_html_content====>>>>', that.index_rich_html_content);
						
						const filter = that.$options.filters["formatRichText"];
						that.index_rich_html_content = filter(that.index_rich_html_content);
						
						console.log('that.index_rich_html_content====>>>>', that.index_rich_html_content);
						
						let data001 = that.index_rich_html_content;
						let newArr = [];
						let arr = parseHtml(data001);
						arr.forEach((item, index)=>{
							newArr.push(item);
						});
						
						//console.log('arr arr arr====>>>>', arr);
						//console.log('newArr newArr newArr====>>>>', newArr);
						
						that.index_rich_html_content = newArr;
// #endif				
							
				
				
		
		        if (res.data.data.video_url) {
		          that.video_url = res.data.data.video_url;
				  that.video_cover_url = res.data.data.video_cover_url;
				  
		
		          if (res.video_autoplay) {
		            that.video_autoplay = true;
		          }
		        }
		      }
		    };
		    var cbError = function (res) {
		      uni.hideLoading();
		
		    };
		    this.abotapi.httpPost(url, data, cbSuccess, cbError);
		      //========End====================
		  },
		
		  __get_pic_from_yanyubao:function(imgid, that){
		    uni.showLoading({
		      title: '数据加载中……',
		    });
		
		    var url = this.abotapi.globalData.http_server + 'index.php/openapi/SupplierData/get_swiper_pic_url';
		    var data = {
		      sellerid: this.abotapi.get_sellerid(),
		      swiperid:imgid
		    };
		
		    var userInfo = this.abotapi.get_user_info();
		    if(userInfo){
		      data.userid = userInfo.userid;
		      data.checkstr = userInfo.checkstr;
		    }
		
		    var cbSuccess = function (res) {
		      uni.hideLoading();
		
		      if (res.data.code == 1) {
		        
				that.content_pic_image = res.data.data.image;
				that.content_pic_url = res.data.data.url;
				
		        if (res.data.data.video_url) {
				  that.video_url = res.data.data.video_url;
				  that.video_cover_url = res.data.data.video_cover_url;
		          
		
		          if (res.video_autoplay) {
					  that.video_autoplay = true;
		            
		          }
		        }
		
		      }
		    };
		    var cbError = function (res) {
		      uni.hideLoading();
		
		    };
		    this.abotapi.httpPost(url, data, cbSuccess, cbError);
		
		
		
		
		
		  },
		  __get_img_from_data_url: function (data_url, that){
		
		    uni.showLoading({
		      title: '数据加载中……',
		    });
		
		    var data = {
		      openid: this.abotapi.get_current_openid()
		    };
		
		
		
		    var cbSuccess = function (res) {
		      uni.hideLoading();
		
		      if (res.data.code == 1) {
		        //var wz_keyword = res.data.data.keyword;
		       
		
		        uni.setNavigationBarTitle({
		          title: res.data.data.title
		        })
		        that.current_title = res.data.data.title;
		
				that.index_rich_html_content = res.data.data.info;
				
// #ifdef MP-ALIPAY		
						
						const filter = that.$options.filters["formatRichText"];
						that.index_rich_html_content = filter(that.index_rich_html_content);
						
						let data001 = that.index_rich_html_content;
						let newArr = [];
						let arr = parseHtml(data001);
						arr.forEach((item, index)=>{
							newArr.push(item);
						});
						
						//console.log('arr arr arr====>>>>', arr);
						//console.log('newArr newArr newArr====>>>>', newArr);
						
						that.index_rich_html_content = newArr;

// #endif				
				
		
		        if(res.data.data.video_url){
					that.video_url = res.data.data.video_url;
					that.video_cover_url = res.data.data.video_cover_url;
					
		          if(res.video_autoplay){
					  that.video_autoplay = true;
		          }
		        }
		      }
		    };
		    var cbError = function (res) {
		      uni.hideLoading();
		
		    };
		    this.abotapi.httpPost(data_url, data, cbSuccess, cbError);
		      //========End====================
		  },
		
		  //点击图片的跳转事件
		  content_pic_click:function(e){
		    var url = e.currentTarget.dataset.url;
		
		    console.log('welcome page 准备跳转至：'+url);
		
		    var var_list = Object();
		
		    this.abotapi.call_h5browser_or_other_goto_url(url, var_list, 'pages_index');
		
		
		
		  },
		
		
		
		  
		
		
		//详情页跳转
		lookdetail: function (e) {
		    console.log(e)
		    var lookid = e.currentTarget.dataset.procuctid;
		    console.log(lookid);
		    uni.navigateTo({
		      url: "../index/detail?id=" + lookid.id
		    })
		},
		  
		imageLoad: function (e) {//获取图片真实宽度  
				
		    var imgwidth = e.detail.width,
		      imgheight = e.detail.height,
		      //宽高比  
		      ratio = imgwidth / imgheight;
		    console.log(imgwidth, imgheight)
		    //计算的高度值  
		    var viewHeight = this.windowHeight / ratio;
		    var imgheight = viewHeight;
		    var imgheights = this.imgheights;
		    //把每一张图片的对应的高度记录到数组里  
		    imgheights[e.target.dataset.id] = uni.upx2px(imgheight);
	
		    console.log(imgheights);
		
	
		     this.imgheights = imgheights
		   
		  },
		 //自定义页面底部导航跳转
		  btn_to_page:function(e){
		    console.log(e);
		    var url = e.currentTarget.dataset.url;
		    this.abotapi.call_h5browser_or_other_goto_url(url);
		},
		
		//播放点击视频并停止播放其他视频
		start_and_stop_other_videos: function (e) {
			console.log('start_and_stop_other_videos=====>>>>', e);
			var video_id = e.currentTarget.dataset.id;
		},
		
		videometa:function(e){
		    console.log('videometa======>>>>>', e);
		
		    var imgwidth = e.detail.width;
		    var imgheight = e.detail.height;
		
		
		    //宽高比  
		    var ratio = imgwidth / imgheight;
		
		    console.log(imgwidth, imgheight)
		
		    var current_view_width = 750;
		
		    current_view_width = current_view_width ;
		
		    //计算的高度值  
		    var current_view_height = current_view_width / ratio;
		
		
		    //赋值给前端
		    var videometa_width_height = [current_view_width, current_view_height];
		
		    console.log('videometa_width_height====>>>>', videometa_width_height);
		
		    this.setData({
		      videometa_width_height: videometa_width_height
		    });
		
		},
		//2021.2.17. 富媒体 链接点击事件
		index_rich_html_click:function(new_url){
			
			console.log('index_rich_html_click====>>>>>', new_url);
			
			this.abotapi.call_h5browser_or_other_goto_url(new_url);
			
			
		},
		
		
		
		
		
		

		
	},
	
	filters: {
		/**
		 * 处理富文本里的图片宽度自适应
		 * 1.去掉img标签里的style、width、height属性
		 * 2.img标签添加style属性：max-width:100%;height:auto
		 * 3.修改所有style里的width属性为max-width:100%
		 * 4.去掉<br/>标签
		 * @param html
		 * @returns {void|string|*}
		 */
		formatRichText (html) { //控制小程序中图片大小
		
			//console.log('html====>>>>', html);
		
			let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
				match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
				match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
				match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
				return match;
			});
			newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
				match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
				return match;
			});
			//newContent = newContent.replace(/<br[^>]*\/>/gi, '');
			
			newContent = newContent.replace(/<p[^>]*>/gi, '<p style="margin:40upx;">');
			
			newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10upx auto;vertical-align: middle;"');
			
			newContent = newContent.replace(/<h1[^>]*>/gi, '<h1 class="wxParse-h1">');
			newContent = newContent.replace(/<h2[^>]*>/gi, '<h2 class="wxParse-h2">');
			
			return newContent;
		}	
	}
};
</script>

<style>
	/* 底部导航 */
	.zdy_btn_box{
	  position: fixed;
	  left:0;
	  bottom:0;
	  width:100%;
	  background:#ffffff;
	  z-index:10;
	  height:120rpx;
	  display:flex;
	  font-size:30rpx;
	}
	
	.btn_left_and_right{
	  display: flex;
	  height: 120rpx;
	  justify-content: center;
	  align-items: center;
	  width: 100%;
	  font-size:30rpx;
	}
	
	.btn_left_and_right image{
	  margin-right:15rpx;
	}
	
	.btn_up_and_dow{
	  display: flex;
	  height: 120rpx;
	  width: 100%;
	  flex-direction:column;
	  justify-content: center;
	  align-items: center;
	}
	
	
</style>
