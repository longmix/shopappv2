<template>
	<view style="background:#EFEFF4;">
		<view class="sou" >
			
			<input  type="text" placeholder="请输入搜索条件" v-model="search_text"/>
			<image @tap="search_article_list()" src="../../static/img/search.png"></image>
		</view>
		
		<view v-for="(item,index) in index_list" :key="item.id" style="background: #fff;margin-bottom: 30upx;border-radius: 20upx;">
			<view class="title_box">
				 <!-- 头像和昵称和发布时间 -->
				<view class="head_img">
					<image :src="item.user_detail.headimgurl"></image>
				</view>
				<view>
					<b>
						<view class="nickname">
							<!-- 昵称 -->
							{{item.user_detail.nickname}}
						</view>
					</b>
					<view class="cata_name">
						<!-- 分类名称 -->
						<view style="font-size: 25upx;line-height: 40upx;">{{item.classname}}</view>
					</view>
				</view>
			</view>
			
			<view class="content" @tap="goForum(item.id)">
				<!-- 内容 -->
				{{item.info}}
			</view>
			<view class="content_img_box">
				<!-- 图片，有就显示没有就不显示 -->
				<view class="content_img" v-for="picture_item in item.picture_list" :key="picture_item">
					<image :src="picture_item" @tap="previewImage(index)"></image>
				</view>
				
			</view>
			
			<view style="margin-left:20upx; border: 10upx solid #FFFFFF;">
				<!-- 底部的点赞量和浏览量 -->
				<view style="font-size: 24upx;color: #333;">
					<!-- 发布时间 -->
					{{item.updatetime}}
				</view>
				<view style="position:absolute;left: 60upx;border-width: 15rpx;border-style: solid;border-color: transparent transparent #f2f2f2 #f2f2f2;transform: rotate(135deg);"></view>
				<view style="display: flex;background-color: #f2f2f2;align-items: center;margin-top: 14upx;">
					<view style="width: 60%;display: flex;align-items: center;padding: 5upx 10upx;">
						<!-- 点赞和浏览 -->
						<view style="display: flex;align-items: center;margin-right: 20upx;">
							<image src="../../static/img/help/comment.png" style="width: 40rpx;height:40rpx;"></image>
							<view style="color: #333;font-size: 22upx;">{{item.click}}人浏览</view>
						</view>
						<view style="display: flex;align-items: center;">
							<image src="../../static/img/help/dianzan_grey.png" style="width: 40rpx;height:40rpx;"></image>
							<view style="color: #333;font-size: 22upx;">{{item.click}}人点赞</view>
						</view>
					</view>
					<view style="color:#2cb2f0;width: 40%;text-align: right;">
						<!-- 查看详情 -->
						<view style="font-size: 24rpx;margin-right: 30upx;" @tap="goForum(item.id)">查看详情>></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
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
				hotKeyShow: true,
				historyKeyShow: true,
				searchValue: '',
				historyKeyList: [],
				hotKeyList: [],
				is_more: true,
				weiduke_resou:'',
				index_list:[],
				dianzan_num:0,
				dianzan_num2:0,
				num01:'',
				click:'',
				cms_token:'',
				cms_cataid:0,
				cms_cataname:'内容列表',
				current_page:1,
				list_title:'文章列表',
				current_page_size:4,
				is_get_article_list:true,//控制触底请求分页的文章列表接口 
				search_text:'',//搜索的文案
			}
		},
		
		
		onLoad:function(options){
			console.log('options',options);
			var that = this;
			if(options.cataid){
				this.cms_cataid = options.cataid;
			}
			
			
			uni.setNavigationBarTitle({
				title:this.list_title
			})
			
			
			
			that.abotapi.set_shop_option_data(that, that.callback_function);
			
			
			
			//从服务器端获取相关后台设置
			// app.set_option_list_str(null, app.getColor());
			// this.bd_basic_option_str = JSON.parse( uni.getStorageSync('bd_basic_option_str'));
			// console.log("bd_basic_option_str111",this.bd_basic_option_str);
			
			//获取服务器返回的热搜词
			// if (this.bd_basic_option_str.weiduke_resou) {
			    
			// 	that.weiduke_resou = this.bd_basic_option_str.weiduke_resou
			// 	console.log('weiduke_resou',that.weiduke_resou);
			// 	that.hotKeyList = that.weiduke_resou.split(' ');
			//     console.log('resou',that.hotKeyList);
			// }
			
			//获取用户搜索记录
			// var historyKeyList = uni.getStorageSync('historyKeyList_cache');	
			// that.historyKeyList = historyKeyList ? historyKeyList : []
			// console.log('56565', that.historyKeyList)
			
			uni.getSystemInfo({
				//获取手机信息
				success:res => {
					//获取手机各种参数
					console.log("手机参数",res);
					//设置父元素(overall)高度  swiper不会自适应高度 需要设置固定高度
					this.width_overall = res.windowWidth;
					console.log("width_overall ====",this.width_overall);
					that.num01 = this.width_overall*0.4;
					console.log("num01",that.num01);
				}
			});
		},
		onShow:function(){
			
		},
		onPullDownRefresh:function(){
			this.current_page = 1;
			this.get_publish_list();
			
			
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
			
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom: function () {
			var that = this;
			
			
			var page_num = that.current_page;
			
			that.current_page ++;
			
			this.get_publish_list();
			
			
			
		},
		
		methods: {
			callback_function:function(that, shop_option_data){
				that.abotapi.getColor();
				
				this.cms_token = shop_option_data.option_list.cms_token;
				
				console.log('当前的CMS Token =====>>>>',  this.cms_token);
				
				this.get_publish_list();
				
			},
			
			//跳转文章详情
			goForum: function(id) {
				console.log(12456);
				uni.navigateTo({
					url: "../home/help_detail/help_detail?id=" + id + '&form_page=publish_list' 
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

			//获取帖子列表
			get_publish_list: function (action='') {
				if(!this.is_get_article_list){
					uni.showToast({
						title: '暂无相关文章',
						duration: 2000
					});
					return;
				}
				if(!this.cms_token){
					console.log('get_publish_list 没有 CMS Token');
					return;
				}
				
				
				var that = this;
				
				var post_data = {
						token:that.cms_token,
						sellerid: this.abotapi.globalData.default_sellerid,
						action: 'newlist',
						page:that.current_page,
						page_size:that.current_page_size,
					};
					
				if(that.cms_cataid){
					post_data['cataid'] = that.cms_cataid;
				}
				
				if(action){
					console.log(this.search_text);
					post_data['action'] = action;
					post_data['search'] = that.search_text;
				}
				
				//搜索的情况
				//if(){}
				
				this.abotapi.abotRequest({
					url: that.abotapi.globalData.weiduke_server_url + 'openapi/ArticleImgApi/article_list',
					method: 'post',
					data: post_data,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function (res) {
						console.log("res",res);
						console.log('is_get_article_list',that.is_get_article_list);
						
						
						if(res.data.code == 1){
							if(res.data.data.length > that.current_page_size){
								that.is_get_article_list = false;
							}
							for(var i in res.data.data){
								that.index_list.push(res.data.data[i]);
							}
							
							
							if(res.data.list_title){
								that.list_title = res.data.list_title;
								
								uni.setNavigationBarTitle({
									title:that.list_title
								})
							}
							
							
							
						}else{
							that.is_get_article_list = false;
							uni.showToast({
								title: '暂无相关文章',
								duration: 2000
							});
							return;
						}
					},
					fail: function (e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					},
				});
			},
			
			//搜索
			search_article_list:function(){
				this.index_list = [];
				this.current_page = 1;
				this.get_publish_list('search')
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
				console.log('e',e);
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
		margin-top: 20upx;
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
	
</style>