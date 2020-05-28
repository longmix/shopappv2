<template>
	<view>
		<view v-if="index_list.length == 0" style='text-align: center;color: #999;font-size: 32upx;margin-top: 100upx;'>暂无数据</view>
		<publishList :index_list="index_list" @goForum="goForum"></publishList>
	</view>
	
</template>

<script>
	import publishList from '../../components/publish-list/publish-list.vue';
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
				my_collect:'', //判断是不是收藏的
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
			if(options.action == 'my_collect'){
				this.my_collect = options.action;
				var last_url = '/pages/publish/publish_list?action=my_collect';
				if(this.abotapi.globalData.is_publish_index_in_tabbar == 1){
					this.abotapi.goto_user_login(last_url, 'switchTab');
				}else{
					this.abotapi.goto_user_login(last_url, 'normal');
				}
				
			}
			if(options.action == 'my_publish'){
				this.my_publish = options.action;
				var last_url = '/pages/publish/publish_list?action=my_publish';
				if(this.abotapi.globalData.is_publish_index_in_tabbar == 1){
					this.abotapi.goto_user_login(last_url, 'switchTab');
				}else{
					this.abotapi.goto_user_login(last_url, 'normal');
				}
			}
			
			var that = this;
			if(options.cataid){
				this.cms_cataid = options.cataid;
			}
			
			
			// uni.setNavigationBarTitle({
			// 	title:this.list_title
			// })
			
			
			
			that.abotapi.set_shop_option_data(that, that.callback_function);
			
			uni.getSystemInfo({
				//获取手机信息
				success:res => {
					//获取手机各种参数
					
					//设置父元素(overall)高度  swiper不会自适应高度 需要设置固定高度
					this.width_overall = res.windowWidth;
					
					that.num01 = this.width_overall*0.4;
					
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
				
				this.get_publish_list();
				
				//取帖子分类列表
			
				this.publish_img_cata_list = shop_option_data.publish_img_cata_list;
				console.log('aaaaaaa====',this.publish_img_cata_list);
			
				
			},
			
			//跳转文章详情
			goForum: function(id) {
				
				uni.navigateTo({
					url: "/pages/help_detail/help_detail?id=" + id + '&form_page=publish_list' 
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
			toPublish_index:function(){
				uni.switchTab({
					url:'./publish_index'
				})
				console.log(this.abotapi.globalData.is_publish_index_in_tabbar);
				// if(this.abotapi.globalData.is_publish_index_in_tabbar == 1){
				// 	uni.switchTab({
				// 		url:'./publish_index'
				// 	});
				// }else{
				// 	uni.navigateTo({
				// 		url:'./publish_index'
				// 	})
				// }
				
			},
			//获取帖子列表
			get_publish_list: function (action='') {
				if(!this.is_get_article_list){
					uni.showToast({
						title: '暂无更多文章',
						duration: 2000
					});
					return;
				}
				if(!this.cms_token){
					console.log('get_publish_list 没有 CMS Token');
					return;
				}
				
				
				var that = this;
				
				// var post_data = {
				// 		token:that.cms_token,
				// 		sellerid: this.abotapi.globalData.default_sellerid,
				// 		action: 'newlist',
				// 		page:that.current_page,
				// 		page_size:that.current_page_size,
				// 	};
					
				// if(that.cms_cataid){
				// 	post_data['cataid'] = that.cms_cataid;
				// }
				
				// if(action){
					
				// 	post_data['action'] = action;
				// 	post_data['search'] = that.search_text;
				// }
				
				
				if(this.my_collect == 'my_collect'){
					var openid = this.abotapi.get_current_openid();
					var userInfo = this.abotapi.get_user_info();
					var post_data = {
							token:that.cms_token,
							sellerid: this.abotapi.globalData.default_sellerid,
							userid:userInfo.userid,
							action: 'my_collect',
							openid:openid,
							page:that.current_page,
							page_size:that.current_page_size,
						};
				}
				
				if(this.my_collect == 'my_publish'){
					var openid = this.abotapi.get_current_openid();
					var userInfo = this.abotapi.get_user_info();
					var post_data = {
							token:that.cms_token,
							sellerid: this.abotapi.globalData.default_sellerid,
							userid:userInfo.userid,
							action: 'my_collect',
							openid:openid,
							page:that.current_page,
							page_size:that.current_page_size,
						};
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
							console.log('else',that.index_list);
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
</style>
