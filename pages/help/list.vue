
<!-- <import src="../../mars/templates/component.wxml" /> -->
		
<template>
	<view>
		<swiperBanner v-if="banner_swiper_list"
			:imgUrls="banner_swiper_list" 
			:border_radius="0"
			:swiper_width_percent_value="100"
			@goto_url="toAdDetails"></swiperBanner>
			
		<view class="weui-panel weui-panel_access">
			<view class="weui-panel__bd">
				<block v-for="(item, artlist_for) in articlelist" :key="artlist_for">
					<view class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active"
							@tap="showDetail" :data-id="item.id"
							:data-url="item.url">
						<view class="weui-media-box__hd weui-media-box__hd_in-appmsg">
							<image class="weui-media-box__thumb" :src="item.pic" mode="widthFix" style="width:75%;margin:15rpx;"/>
						</view>
						
						
						<view class="weui-media-box__bd weui-media-box__bd_in-appmsg">
							<view class="weui-media-box__title">{{item.title}}</view>
							<view class="weui-media-box__desc">{{item.text}}</view>
						</view>
					</view>
				</block>
				
			</view>
			<view class="weui-panel__ft" style="display:none;">
				<view class="weui-cell weui-cell_access weui-cell_link">
					<view class="weui-cell__bd">查看更多</view>
					<view class="weui-cell__ft weui-cell__ft_in-access"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import publish_list_api from '../../common/publish_list_api.js';
	
	import swiperBanner from '../../components/swiper-banner.vue';
	
	export default {
		components:{
			swiperBanner,
		},
		data() {
			return {
				sellerid:'',
				articlelist: [],
				loading: true,
				
				banner_swiper_list:[],

				
				//===相关的 publish_list_api 组件相关的==
				is_get_article_list:1,
				cms_token:'',
				current_page:1,
				current_page_size:50,
				cms_cataid:0,
				//========== End ==============
				
			}
		},
		onShow: function () {
			
		},
		// 生命周期函数--监听页面初次渲染完成
		onReady: function () {
			
		},
		// 生命周期函数--监听页面显示
		// 生命周期函数--监听页面隐藏
		onHide: function () {
			
		},
		// 生命周期函数--监听页面卸载
		onUnload: function () {
			
		},
		// 生命周期函数--监听页面加载
		onLoad: function (options) {
			console.log('options==>>',options);
			
			
			var that = this
			
			that.sellerid = options.sellerid;
			
			if ((typeof (that.sellerid) == 'undefined') || (!that.sellerid) ){
				that.sellerid = this.abotapi.globalData.default_sellerid;
			}
			
			
			//this.initArticleList(that.sellerid);
			
			this.abotapi.set_option_list_str(this, this.initArticleList_new);
			
			
			
			//APP/小程序首页滚动广告
			this.abotapi.abotRequest({
				url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_flash_ad_list',
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
			})
			
			
			
			
		},
		onShareAppMessage: function () {
		},
		onShareTimeline: function () {
			
		},
		onAddToFavorites: function () {
			//this.onShareTimeline();
		},
		methods: {
			initArticleList: function () {
				
				var that = this
			   
				
			   //=====更新商户头条=================
			    var url = this.abotapi.globalData.weiduke_server_url + '?g=Home&m=Yanyubao&a=yingxiao';//+ app.globalData.sellerid;
			    var data = {
					id:'seller',
					action:'list',
					sellerid: that.sellerid,
					currentpage:1
			    };
			    
			    var cbError = function (res) {
				
			    };
			    this.abotapi.httpPost(url, data, this.articleBack, cbError);
			    //========End====================
				
			},
			initArticleList_new: function (that002, option_list) {
				console.log('initArticleList_new initArticleList_new', option_list);
				
				if(!option_list || !option_list.weiduke_token_to_toutiao || !option_list.weiduke_classid_to_toutiao){
					console.log('缺少 weiduke_token_to_toutiao 或 weiduke_classid_to_toutiao');
					return;
				}
				
				
				that002.cms_token = option_list.weiduke_token_to_toutiao;
				that002.cataid = option_list.weiduke_classid_to_toutiao; 
				
				publish_list_api.get_publish_list(that002, function(that003, res_data){
					
					
					if(!res_data.index_list){
						console.log('res_data=====>>>>', res_data);
						
						return;
					}
					
					
					//为显示加载动画添加3秒延时
					setTimeout(function () {
						that003.articlelist = res_data.index_list;
					}, 500)
					
					
					
					
				});
				
			},
			articleBack: function (res) {
				console.log(res);
				var that = this;
				if (res.data.code == '1') {
					//为显示加载动画添加3秒延时
					setTimeout(function () {
						that.articlelist = res.data.data;
					}, 500)
				}
				else{
			    //没有获取数据
			  
				}
			},
			showDetail:function(e){
				console.log('e',e);
				var that = this;
				console.log('点击商户头条进入该详情'+e.currentTarget.dataset.id);
				
				var id = e.currentTarget.dataset.id;
				uni.setStorageSync('browser_cache_id', id);
				
				if(e.currentTarget.dataset.url && (e.currentTarget.dataset.url.length > 0)){
					//可以跳转到http网址或者其他小程序内部链接
					this.abotapi.call_h5browser_or_other_goto_url(e.currentTarget.dataset.url);
					
					return;
				}
				
			  
				uni.navigateTo({
					url: '/pages/help/detail?id=' + id + '&sellerid=' + that.sellerid
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
			
			
			
		}
	}
	
</script>

<style>
	
	
	
	
.weui-panel {
  background-color: #FFFFFF;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
}
.weui-panel:first-child {
  margin-top: 0;
}
.weui-panel:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1rpx solid #E5E5E5;
  color: #E5E5E5;
}
.weui-panel:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1rpx solid #E5E5E5;
  color: #E5E5E5;
}
.weui-panel__hd {
  padding: 14px 15px 10px;
  color: #999999;
  font-size: 13px;
  position: relative;
}
.weui-panel__hd:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1rpx solid #E5E5E5;
  color: #E5E5E5;
  left: 15px;
}

.weui-media-box {
  padding: 0px;
  position: relative;
}
.weui-media-box:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1rpx solid #E5E5E5;
  color: #E5E5E5;
  left: 15px;
}
.weui-media-box:first-child:before {
  display: none;
}
.weui-media-box__title {
  font-weight: 400;
  font-size: 17px;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  word-wrap: break-word;
  word-break: break-all;
}
.weui-media-box__desc {
  color: #999999;
  font-size: 13px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.weui-media-box__info {
  margin-top: 15px;
  padding-bottom: 5px;
  font-size: 13px;
  color: #CECECE;
  line-height: 1em;
  list-style: none;
  overflow: hidden;
}
.weui-media-box__info__meta {
  float: left;
  padding-right: 1em;
}
.weui-media-box__info__meta_extra {
  padding-left: 1em;
  border-left: 1px solid #CECECE;
}
.weui-media-box__title_in-text {
  margin-bottom: 8px;
}
.weui-media-box_appmsg {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
          align-items: center;
}
.weui-media-box__thumb {
  width: 100%;
  height: 100%;
  vertical-align: top;
}
.weui-media-box__hd_in-appmsg {
  margin-right: .8em;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.weui-media-box__bd_in-appmsg {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
          flex: 1;
  min-width: 0;
}
.weui-media-box_small-appmsg {
  padding: 0;
}
.weui-cells_in-small-appmsg {
  margin-top: 0;
}
.weui-cells_in-small-appmsg:before {
  display: none;
}
.weui-cell {
  padding: 10px 15px;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
          align-items: center;
}
.weui-cell:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1rpx solid #D9D9D9;
  color: #D9D9D9;
  left: 15px;
}
.weui-cell:first-child:before {
  display: none;
}
.weui-cell_active {
  background-color: #ECECEC;
}
.weui-cell_primary {
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
          align-items: flex-start;
}
.weui-cell__bd {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
          flex: 1;
}
.weui-cell__ft {
  text-align: right;
  color: #999999;
}
.weui-cell_access {
  color: inherit;
}
.weui-cell__ft_in-access {
  padding-right: 13px;
  position: relative;
}
.weui-cell__ft_in-access:after {
  content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #C8C8CD;
  border-style: solid;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  position: relative;
  top: -2px;
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 2px;
}
.weui-cell_link {
  color: #586C94;
  font-size: 14px;
}
.weui-cell_link:active {
  background-color: #ECECEC;
}
.weui-cell_link:first-child:before {
  display: block;
}


</style>
