<template>
	<view>
		<view v-if="index_list.length == 0" style='text-align: center;color: #999;font-size: 32upx;margin-top: 100upx;'>暂无数据</view>
		<publishList 
		:index_list="index_list" 
		@goForum="goForum" 
		:action="my_publish"
		@article_delete="article_delete"		
		:show_zhuanti_title = 0
		></publishList>
	</view>
	
</template>

<script>
	import publishList from '../../components/publish-list/publish-list.vue';
	import publish_list_api from '../../common/publish_list_api.js';
	const isNullOrUndefined = obj=>obj===null || obj === undefined  || obj === '';
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
				my_publish:'', //判断是不是我的
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
				
				uni.setNavigationBarTitle({
					title:'我的收藏'
				})
				
			}
			if(options.action == 'my_publish'){
				this.my_publish = options.action;
				var last_url = '/pages/publish/publish_list?action=my_publish';
				if(this.abotapi.globalData.is_publish_index_in_tabbar == 1){
					this.abotapi.goto_user_login(last_url, 'switchTab');
				}else{
					this.abotapi.goto_user_login(last_url, 'normal');
				}
				uni.setNavigationBarTitle({
					title:'我的发布'
				})
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
			
				this.publish_img_cata_list = shop_option_data.option_list.publish_img_cata_list;
				console.log('aaaaaaa====',this.publish_img_cata_list);
			
				
			},
			
			//跳转文章详情
			goForum: function(id) {
				
				uni.navigateTo({
					url: "/pages/help/detail?id=" + id + '&form_page=publish_list' 
				})
			},
			
			//跳转文章详情
			article_delete: function(imgid,index) {
				
				var that = this;
				var userInfo = that.abotapi.get_user_info();
				
				if (!userInfo || !userInfo.userid) {
					uni.showToast({
						title: '请先登录',
						icon: 'none',
						duration: 1000,
					});
				
					//var last_url = '/cms/publish/publish?publishtype=' + that.publishtype;
					
					var last_url = '/pages/publish/my_publish?action=my_publish';
					
					that.abotapi.goto_user_login(last_url, 'normal');
					return;
				}
				
				if(!this.cms_token){
					uni.showToast({
						title: '错误',
						icon: 'none',
						duration: 1000,
					});
					return;
				}
				
				if(!imgid){
					uni.showToast({
						title: '缺少参数',
						icon: 'none',
						duration: 1000,
					});
					return;
				}
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.weiduke_server_url + 'openapi/ArticleImgApi/article_delete',
					method: 'post',
					data: {
						sellerid: that.abotapi.get_sellerid(),
						userid:userInfo.userid,
						checkstr:userInfo.checkstr,
						imgid:imgid,
						token:that.cms_token,
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						console.log('res===>del_article',res);
						uni.showToast({
							title:res.data.msg
						})
						
						if(res.data.code == 1){
							this.index_list.splice(index,1);
						}
					}
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
				
				
				if(this.my_collect == 'my_collect'){
					
					var action = 'my_collect';
				}
				
				if(this.my_publish == 'my_publish'){
					
					var action = 'my_article';
				}
				console.log('action==========>',action);
				//搜索的情况
				publish_list_api.get_publish_list(that,that.get_api_publish_list,action);		
				
				
			},
			
			get_api_publish_list:function(that,data){
				console.log('datasdf',data);
				if(!isNullOrUndefined(data.msg)){
					//没有收藏的情况
					uni.showToast({
						title: data.msg,
						duration: 2000
					});
				}
				
				//接口返回code 等于 1
				
				for(var i in data.index_list){
					that.index_list.push(data.index_list[i]);
				}
				
				if(!isNullOrUndefined(data.title)){
					that.list_title = data.title;
					uni.setNavigationBarTitle({
						title:that.list_title
					})
				}
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
