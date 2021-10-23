<template>
	<view style="background:#EFEFF4;border-top: 1px solid #EFEFF4;">
		<view class="fabu_button" :style="{background:wxa_shop_nav_bg_color}" @tap="toPublish_index('fabu')" v-if="publish_hiddend_btn_for_write != 1">
			发布
		</view>
		<view class="wode_button" :style="{background:wxa_shop_nav_bg_color}" @tap="toPublish_index('wode')" v-if="publish_hiddend_btn_for_write != 1">
			我的
		</view>
		<view class="shoucang_button" :style="{background:wxa_shop_nav_bg_color}" @tap="toPublish_index('shoucang')">
			收藏
		</view>
		<view class="sou">
			
			<input style="background: #DFDFDF;" type="text" placeholder="请输入搜索条件" v-model="search_text"/>
			<image @tap="search_article_list()" src="../../static/img/search.png"></image>
		</view>
		
		<view class="nav-icon-con">
				<view style="" v-for="(item,index) in publish_img_cata_list " 
					:key="item.classid" 
					:data-cataid="item.classid" 
					:data-url="item.url" 
					data-from="icon" 
					@click="get_publish_cata_list">
					<image class="nav-icon-list" :src="item.icon"></image>
					<view style="font-size: 24upx;">{{item.name}}</view>
				</view>
		</view>
		
		<!-- 文字导航 -->
		<view style="display: flex;background-color: #FFFFFF;">
			<view :data-cataid="0" @click="get_publish_cata_list" data-from="text" 
			:data-index="-1"
			:class="tap_index < 0 ? 'quanbu_color' : 'quanbu'"
			
			>
				<view>全部</view>
			</view>
			<scroll-view scroll-x="true" enable-flex="true" class="kcrzxybd" style="height:60upx;display: flex;white-space: nowrap;width:83%">
				
					<view v-for="(item,index) in publish_img_cata_list " 
						:key="item.classid" 
						v-if="!item.url" 
						:class="tap_index == index ? 'changes_color':'scroll-view'" 
						:data-cataid="item.classid"
						:data-index="index"
						data-from="text"
						@click="get_publish_cata_list">{{item.name}}</view>
					
			</scroll-view>
		</view>
		
		<publishList :index_list="index_list" @goForum="goForum" @previewImage="previewImage"
			:show_zhuanti_title = "0"
		></publishList>
	</view>
</template>

<script>
	import publishList from '../../components/publish-list/publish-list.vue';
	import publish_list_api from '../../common/publish_list_api.js';
	export default {
		components:{
			publishList
		},
		data() {
			return {
				bd_basic_option_str:'',
				current: 0,
				shopList: [],
				ptype:'',
				title:'延誉',
				page:1,
				catId:0,
				brandId: 0,
				focus: false,
				publish_img_cata_list:[],
				hotKeyShow: true,
				historyKeyShow: true,
				searchValue: '',
				historyKeyList: [],
				hotKeyList: [],
				is_more: true,
				weiduke_resou:'',
				index_list:'',
				dianzan_num:0,
				publish_hiddend_btn_for_write:0,//发帖按钮，同时会隐藏 help_detail.vue中的留言评论功能
				dianzan_num2:0,
				num01:'',
				click:'',
				
				cms_token:'',
				
				my_collect:'', //判断是不是收藏的
				cms_cataid:0,
				cms_cataname:'内容列表',
				current_page:1,
				list_title:'文章列表',
				current_page_size:4,
				is_get_article_list:true,//控制触底请求分页的文章列表接口 
				search_text:'',//搜索的文案
				wxa_shop_nav_bg_color:'#f44444',
				tap_index:'-1', //改变文字导航颜色
			}
		},
		
		
		onLoad:function(options){
			console.log('publish_list ===>>> options ===>>>', options);
			
			var that = this;
			
			if(options.cataid){
				this.cms_cataid = options.cataid;
			}
			
			if(options.token){
				this.cms_token = options.token;
			}
			
			//==== 2020.9.7. 如果是跳转过来的时候带了cataid参数，则先过滤 ====
			if(uni.getStorageSync('current_publish_list_cataid')){
				this.cms_cataid = uni.getStorageSync('current_publish_list_cataid');				
				
				uni.removeStorage({
					key:'current_publish_list_cataid'
				});				
			}
			//====================== End ===============
			
			//==== 2020.9.7. 如果是跳转过来的时候带了search 参数，则先过滤 ====
			if(uni.getStorageSync('current_publish_list_search')){
				this.search_text = uni.getStorageSync('current_publish_list_search');				
				
				uni.removeStorage({
					key:'current_publish_list_search'
				});				
			}
			//====================== End ===============
			
			
			
			uni.getSystemInfo({
				//获取手机信息
				success:res => {
					//获取手机各种参数
					
					//设置父元素(overall)高度  swiper不会自适应高度 需要设置固定高度
					this.width_overall = res.windowWidth;
					
					that.num01 = this.width_overall*0.4;
					
				}
			});
			
			that.abotapi.set_shop_option_data(that, that.callback_function);
		},
		
		onShow:function(){
			var that = this;
			
			that.abotapi.set_shop_option_data(that, function(that002, shop_option_data){
				
				console.log('aaaaaaa====  onShow',shop_option_data);
				
				if(shop_option_data.option_list.publish_hiddend_btn_for_write){
					that002.publish_hiddend_btn_for_write = shop_option_data.option_list.publish_hiddend_btn_for_write; //是否显示发帖按钮
				}
				
			});
		},
		
		onPullDownRefresh:function(){
			console.log(123465);
			this.current_page = 1;
			this.is_get_article_list = true;
			this.index_list = []; 
			
			
			publish_list_api.get_publish_list(this,this.get_api_publish_list);
			
			
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
			
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom: function () {
			var that = this;
			
			
			var page_num = that.current_page;
			
			that.current_page ++;
			
			publish_list_api.get_publish_list(that,that.get_api_publish_list);
			
			
			
		},
		onShareAppMessage: function () {
		},
		onShareTimeline: function () {
			
		},
		onAddToFavorites: function () {
			//this.onShareTimeline();
		},
		methods: {
			get_api_publish_list:function(that, publishData){
				console.log('get_api_publish_list publishData===>>>>',publishData);
				
				if(publishData.title){
					
					uni.showToast({
						title: publishData.title,
						duration: 2000
					});
					
					uni.setNavigationBarTitle({
						title:publishData.list_title
					})
				}
				else{
					uni.setNavigationBarTitle({
						title:that.abotapi.globalData.default_shopname
					})
				}
				
				
				
				
				if(!that.index_list){
					that.index_list = [];
				}
				
				for(var i in publishData.index_list){
					that.index_list.push(publishData.index_list[i]);
				}
			},
			callback_function:function(that, shop_option_data){
				
				console.log('aaaaaaa====',shop_option_data);
				//that.abotapi.getColor();
				
				if(!that.cms_token){
					that.cms_token = shop_option_data.option_list.cms_token;
				}
				
				
				if(shop_option_data.option_list.wxa_shop_nav_bg_color){
					that.wxa_shop_nav_bg_color = shop_option_data.option_list.wxa_shop_nav_bg_color; //头部导航的颜色
				}
								
				
				that.publish_img_cata_list = shop_option_data.option_list.publish_img_cata_list;
				
				if(that.search_text){
					this.index_list = [];
					this.current_page = 1;
					this.is_get_article_list = true;
					publish_list_api.get_publish_list(this,this.get_api_publish_list,'search')
				}
				else{
					publish_list_api.get_publish_list(that,that.get_api_publish_list);
				}
			
				
			},
			
			//跳转文章详情
			goForum: function(id) {
				
				uni.navigateTo({
					url: "/pages/help/detail?id=" + id + '&form_page=publish_list' 
				})
			},
			
			previewImage:function(index) {
				
				var index_list = this.index_list;
				
				var index_item = index_list[index];
				
				var img_list = index_item['picture_list'];
				
				
				//预览图片
				uni.previewImage({
					urls: img_list,
					success: function(data) {
						console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
					fail: function(err) {
						console.log(err.errMsg);
					}
				});
			},
			//发布按钮跳转
			toPublish_index:function(page){
				console.log('page====>>',page);
				if(page == 'fabu'){
					console.log('page====>>fabu');
					if(this.abotapi.globalData.is_publish_index_in_tabbar == 1){
						uni.switchTab({
							url:'./publish_index'
						})
					}else{
						uni.navigateTo({
							url:'./publish_index'
						})
					}
				}else if(page == 'wode'){
					console.log('page====>>wode');
					uni.navigateTo({
						url:'./my_publish?action=my_publish'
					})
				}else if(page == 'shoucang'){
					console.log('page====>>shoucang');
					uni.navigateTo({
						url:'./my_publish?action=my_collect'
					})
				}
				
				
			},
			
			//点击导航传递cataid获取帖子
			get_publish_cata_list:function(e){
				var that = this;
				console.log('eeeeeee',e);
				that.tap_index = e.currentTarget.dataset.index;
				
				
				if(e.currentTarget.dataset.cataid && e.currentTarget.dataset.cataid != 0){
					this.cms_cataid = e.currentTarget.dataset.cataid;
				}else{
					this.cms_cataid = '';
				}
				
				var click_from = e.currentTarget.dataset.from;
				
				if(click_from == 'text'){
					//从文字点击，局部刷新
					this.index_list = [];
					this.current_page = 1;
					this.is_get_article_list = true;
					publish_list_api.get_publish_list(that,that.get_api_publish_list);
				}
				else if(click_from == 'icon'){
					//从图标点击
					var new_url = e.currentTarget.dataset.url;
					if(new_url){
						this.abotapi.call_h5browser_or_other_goto_url(new_url);
					}
					else{
						uni.navigateTo({
							url:'/pages/publish/publish_home?cataid=' + this.cms_cataid
						})
					}
					
					
					
				}
				
				
				
			},
			
			//搜索
			search_article_list:function(){
				this.index_list = [];
				this.current_page = 1;
				this.is_get_article_list = true;
				publish_list_api.get_publish_list(this,this.get_api_publish_list,'search')
			},
			
			//读取搜索记录缓存
			doKeySearch: function (e) {
				var that = this;
			    var key = e.currentTarget.dataset.key;
			
			    // var historyKeyList = that.historyKeyList;
			    this.remove(key);
			    that.historyKeyList.unshift(key);
			    uni.setStorageSync('historyKeyList_cache', that.historyKeyList)
			
				that.searchValue = key;
				that.hotKeyShow = false;
				that.historyKeyShow = false;
			    that.doSearch();
			},
			
			//获取用户输入的搜索值
			searchValueInput: function (e) {
				
				var that = this;
			    var value = e.detail.value;
				that.searchValue = value,
				that.page = 1
			    if (!value && this.shopList.length == 0) {
					that.hotKeyShow = true;
			        that.historyKeyShow = true;
					that.is_searchData = false;
			    }
			},
			
			
			
			
			//删除指定元素
			remove: function (e) {
				var index = this.historyKeyList.indexOf(e);
			    if (index > -1) {
					this.historyKeyList.splice(index, 1);
				}
			},
			
			
		}
	}
</script>

<style>
	.title_box{
		display: -webkit-flex;
		display: flex;
		align-items: center;
	}
	.head_img{
		margin: 20upx;
	}
	.head_img image{
		width: 100upx;
		height: 100upx;
		border-radius:5upx;
	}
	.nickname{
		color:#333;
		font-weight:blod;
	}
	.cata_name{
		margin-top: 10upx;
		background-color: #18dba6;
		color: #fff;
		border-radius:6upx;
		padding: 2rpx 6rpx;
		text-align: center;
	}
	.content{
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		margin: 0 20upx;
	}
	.content_img_box{
		display: flex;
		flex-wrap:wrap;
	}
	.content_img{
		width: 19%;
		height: 160rpx;
		
		margin-right: 1%;
		
		margin: 10upx 20upx;
	}
	.content_img image{
		width: 100%;
		height: 160rpx;
		border-radius: 10rpx;
		
	}
	.kuang{
		position: absolute;
		content: "";
		border-width: 20rpx;
		border-style: solid;
		border-color: transparent transparent #f2f2f2 #f2f2f2;
		transform: rotate(135deg);
		left: 35px;
		top: -10px;

	}
	/*搜索框*/
	.sou{
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #DFDFDF;
		width: 96%;
		border-radius: 50upx;
		margin-left: 2%;
		margin-top: 30upx;
		margin-bottom: 20upx;
		height: 70upx;
		color: #AAAAAA;
		z-index: 99999;
	}
	.sou image{
	    margin-right: 20upx;
		width: 40upx;
		height:40upx;
	}
	.sou input{
	   margin-left: 20upx;
	}
	.nav-icon-con{
		margin-top: 30upx;
		margin-bottom: 15upx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		font-size: 28upx;
		background-color: #FFFFFF;
		padding:inherit;
		padding: 20upx;
	}
	.nav-icon-con > view{
		width: 20%;
		margin-top: 3%;
		text-align: center;
	
	}
	.nav-icon-list{		
		width: 70upx;
		height: 70upx;
	}
	.nav-icon-a{
		text-align: center;
	}
	.nav-icon-a view{
		/* margin-top: 20upx; */
		text-align: center;
		font-size: 28upx;
	}
	.fabu_button{
		position: fixed;
		bottom: 300rpx;
		right: 16rpx;
		border-radius: 54%;
		padding: 10rpx;
		height: 60rpx;
		width: 60rpx;
		font-size: 28rpx;
		color: #fff;
		text-align: center;
		line-height: 60rpx;

	}
	.wode_button{
		position: fixed;
		bottom: 200rpx;
		right: 16rpx;
		border-radius: 54%;
		padding: 10rpx;
		height: 60rpx;
		width: 60rpx;
		font-size: 28rpx;
		color: #fff;
		text-align: center;
		line-height: 60rpx;
	
	}
	.shoucang_button{
		position: fixed;
		bottom: 100rpx;
		right: 16rpx;
		border-radius: 54%;
		padding: 10rpx;
		height: 60rpx;
		width: 60rpx;
		font-size: 28rpx;
		color: #fff;
		text-align: center;
		line-height: 60rpx;
	
	}
	.scroll-view{
		color: #999;
		font-size: 30upx;
		text-align: center;
		min-width: 25%;
		max-width:25%;
		max-height:60upx;
		min-height:60upx;
		line-height: 60upx;
	}
	.changes_color{
		color:#0055ff;
		font-size: 30upx;
		text-align: center;
		min-width: 25%;
		max-width:25%;
		max-height:60upx;
		min-height:60upx;
		line-height: 60upx;
	}
	.quanbu{
		color: #999;
		font-size: 30upx;
		text-align: center;
		width: 15%;
		height:60upx;
		line-height: 60upx;
	}
	.quanbu_color{
		color: #0055ff;
		font-size: 30upx;
		text-align: center;
		width: 15%;
		height:60upx;
		line-height: 60upx;
	}
</style>