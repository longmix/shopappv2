<template>
	<view class="global_background">	
	
	<!-- 搜索框 -->
	

		<view class="package_search">
			
			<input :placeholder="search_placeholder_text" class="search_package" :value="searchValue"
				confirm-type="search"
				@input="searchValueInput($event)"
				@confirm="package_list_search()" />
				
			<button @tap="package_list_search()" style="width: 90rpx; height: 65rpx;line-height: 80rpx;">
				<image src="https://yanyubao.tseo.cn/Tpl/static/nft_card/search01.png" mode="widthFix" style="width: 45rpx;height:45rpx;"></image>
			</button>
		</view>
	
				<!-- 排序 -->
		<!-- <view class="drop_down_menu">
			<picker @change="bindPickerChange" :value="index" :range="array">
				<view class="picker" >
					<view style="margin-left: 5rpx;">{{array[index]}}</view>
					<image src="https://yanyubao.tseo.cn/Tpl/static/nft_card/drop_down.png"
						mode="widthFix" style="width: 25rpx;margin-left: 6rpx; margin-top: 15rpx;"></image>
				</view>
			</picker>
		</view> -->
				

			<view v-if="current_package_list ==''" style="text-align : center;">
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/empty_favorite.png" mode="widthFix" style="width: 400rpx;"></image>
				<view>空空如也</view>
			</view>
					
					
				
				<!-- 卡包列表及详情 -->
				
		<view class="my_package_list_style"	>
			<view class="my_package_list">
				<view class="my_package_item" 
					v-for="(current_package_item, index) in current_package_list"
					:key="index"
					 @tap="goto_package_detail(current_package_item.packageid)" 
						:style="{background:current_package_item.theme_color}">
					
					
					

					
					
					<!-- 标签 -->

					<view class="package_detail_label" style="position: relative;">
						<image class="package_list_mark" src="https://yanyubao.tseo.cn/Tpl/static/nft_card/mark01.png" mode="widthFix" ></image>
					 	<view class="package_list_mark_num">
							<view style="color: #cdcdcd;font-weight: bold; font-size: 35rpx;">{{current_package_item.card_count_mianfei}}</view>
							<view style="color: #FFFFFF;">/</view>
							<view style="color: yellow;font-weight: bold; font-size: 35rpx;">{{current_package_item.card_count_fufei}}</view>
						</view>
						 
						<image class="package_list_loop" :src="current_package_item.cover_img_url_3x2_stand" mode=" aspectFill" ></image>
						<view class="package_label" >
							<view class="package_lable_list" v-for="(item,index) in current_package_item.tag_of_editor" :key="index">{{item}}</view>
						</view>
					</view>
				
					
					
					<view class="" style="{'background-color': current_package_item.theme_color}"><!-- {{current_package_item.cover_img_url}} -->
						
						<!-- 卡包标签--------icon喜欢图标----------喜欢人数 -->
						<view class="package_icon_like_num" :style="{color:current_package_item.theme_font_color}">
							<view class="package_like_icon" >
								<!-- <image  src="https://yanyubao.tseo.cn/Tpl/static/nft_card/package_example/like.png" mode="widthFix" style="width: 30rpx;float: left;"></image>	 -->
								<image  src="https://yanyubao.tseo.cn/Tpl/static/nft_card/xin.png" mode="widthFix" style="width: 30rpx;"></image>
								{{current_package_item.like_count}}
							</view>
							
						</view>
						
						
						<view class="" :style="{color:current_package_item.theme_font_color}">
							<!-- 卡包名称---------卡包简介 -->
							<view class="package_name">{{current_package_item.title}}</view>
							
							<view class="package_brief" style="margin-left: 20rpx;">{{current_package_item.brief}}</view>
							<view class="package_rare_total_time">
								<!-- <view class="package_rare_total" >
									<view class="card_quantity">典藏卡{{current_package_item.card_count_mianfei}}张</view>
									<view class="card_quantity">|</view>
									<view class="card_quantity">珍藏卡{{current_package_item.card_count_fufei}}张</view>
								</view> -->
								<view class="begin_end_time" style="display: flex;">
									<view style="font-size: 20rpx;">有效期：</view>
									{{current_package_item.time_begin_str}}~{{current_package_item.time_end_str}}
								</view>
							</view>
						</view>
						
						
						
					</view>
				
				</view>	
			</view>
			
		</view>	
	</view>
</template>

<script>
	
import util from '../../common/util.js';
	
export default {
	data() {
		return {
			current_package_list : null,
			
			index:0,
			//array:['智能排序','按热度排序','按到期时间排序','按卡牌数量排序','按销售状态',],
			array:['智能排序','按热度排序','按到期时间排序',],
			
			current_nft_supplierid:0,
			
			//搜索的关键词
			searchValue02:'',
			//输入在搜索框中，还没有点击搜索按钮时候的词
			searchValue:'',
			search_placeholder_text:'输入搜索词',
			
			//System编辑设置的标签
			tag_of_editor:'',
			
			
			centent_show:true,
			current_page:1
		}
	},

	onLoad: function (options) {

		
		console.log('当前时间：' + util.formatTime( new Date() ) + ' ' + util.formatTime2( new Date() ) + ':01' );
		
		console.log('pages/tabBar/index/index====>>>>', options);
		
		var that = this;
		
		/*
		uni.setNavigationBarTitle({
			title : that.abotapi.globalData.default_shopname
		});*/
		
		var title_str = '卡包列表';
		
		if(options.tag_of_editor){
			title_str += ' - ' + options.tag_of_editor; 
			
			that.tag_of_editor = options.tag_of_editor;
		}
		else if(options.searchValue){
			that.searchValue02 = options.searchValue;
			
			title_str += ' - ' + options.searchValue;
		}
		
		uni.setNavigationBarTitle({
			title : title_str,
		});
		
		//当前卡包所属的supplierid
		if(options.nft_supplierid){
			that.current_nft_supplierid = options.nft_supplierid;
		}
		else{
			//that.current_nft_supplierid = that.abotapi.globalData.default_sellerid;
		}
		
	
		that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);
	
		
		that.__nft_get_package_list();
		
		
		
	},
	onShow:function(){
		console.log('call onShow function (/pages/index/index)');
	},
	onPageScroll: function (e) {
		//兼容iOS端下拉时顶部漂移
		this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
		this.headerTop = e.scrollTop>=0?null:0;
		this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
		
		
		
	},
	
	//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh: function () {
		var that = this;
		
		console.log('onPullDownRefresh=====>>>>>');
		
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
		
		this.current_page = 1;
		this.current_package_list = [];
		this.__nft_get_package_list();
		
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom: function () {
		
		this.current_page ++;
		
		this.__nft_get_package_list();
	}, 
	
	onShareAppMessage: function () {
		var that = this;
		
		var option_list = this.abotapi.globalData.option_list;
		
		var share_title = option_list.wxa_share_title;
		if (share_title.length > 22) {
			share_title = share_title.substr(0, 20) + '...';
		}
		
		var share_path = '/pages/index/index?sellerid=' + this.abotapi.get_sellerid();
		
		var userInfo = this.abotapi.get_user_info();
		
		if (userInfo && userInfo.userid) {
			share_path += '&userid=' + userInfo.userid;
		}
		
		var share_img = option_list.wxa_share_img;
		if(!share_img){
			share_img = option_list.wxa_shop_operation_logo_url;
		}
		
		return {
			title: share_title,
			path: share_path,
			imageUrl: share_img,
			success: function(res) {
				// 分享成功
			},
			fail: function(res) {
				// 分享失败
			}
		}
	},
	
	onShareTimeline: function () {
		return this.share_return();
	},
	onAddToFavorites: function () {
		return this.share_return();
	},
	methods: {
		share_return: function() {
			var that = this;
		},
		
		callback_function_shop_option_data:function(that, cb_params){
			
			console.log('当前调试开关22：' + this.system_debug_flag);
			console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);
			
			if(!cb_params){
				return;
			}
			console.log('cb_params====', cb_params);
		},
		
		bindPickerChange(e){
			console.log(e)
		},
		
		
		
		goto_package_detail:function(packageid){
			console.log('packageid===>>>' + packageid);
			
			uni.navigateTo({
				url: '/pages/nftcard/package_detail?packageid='+packageid,
			})
		},
		 
		
		//获取用户输入的搜索值
		searchValueInput: function (e) {
			console.log('e',e);
			var that = this;
		    var value = e.detail.value;
			that.searchValue = value,
			that.page = 1
			if (!value
			 
			 && that.current_package_list.length == 0) {
				that.centent_show = false;
			}
		},
		
		
		
		__nft_get_package_list:function(){
			//获取卡包列表
			var that = this;
			
			var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					nft_supplierid : that.current_nft_supplierid,
					page: that.current_page,
					page_size: 10,
			    };
			
			if(that.tag_of_editor){
				post_data.tag_of_editor = that.tag_of_editor;
			}
			else if(that.searchValue02){
				post_data.action = 'search';
				post_data.keywords = that.searchValue02;
			}
			
			
			that.abotapi.abotRequest({
			    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_package_list',
			    method: 'post',
			    data: post_data,
			    success: function (res) {
					
					if(res.data.code != 1){
						uni.showToast({
							title:'卡包列表没有数据',
							duration: 2000,
						});
						
						return;
					}
			
					if(!that.current_package_list){
						that.current_package_list = [];
					}
						
					for(var i=0; i<res.data.data.length;i++ ){
						that.current_package_list.push(res.data.data[i]);
					}
					
					console.log('current_package_list ===>>> ', that.current_package_list);
					
					if(res.data.search_placeholder_text){
						that.search_placeholder_text = res.data.search_placeholder_text;
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
		
		package_list_search:function(e){
			var that = this;
			
			this.current_page = 1;
			this.current_package_list = [];
			
			that.searchValue02 = that.searchValue;
			
			//修改标题
			var title_str = '卡包列表';			
			if(that.searchValue02){				
				title_str += ' - ' + that.searchValue02;
			}			
			uni.setNavigationBarTitle({
				title : title_str,
			});
			
			this.__nft_get_package_list();
			
		}
		
		
		
		
	}
	
}
	
	
</script>


<style>
	
	@import "./static/css/nftcard.css";
	
	.package_search{
		display: flex;
		position:relative;
		top: 10px;
		margin-bottom: 50rpx;
		margin-left: 50rpx;
		width: 660rpx;
		
		background-color: #FFFFFF;
		border-radius: 30rpx;
		overflow: hidden;
	}
	.search_package{
		width: 620rpx;
		height: 60rpx;
		margin-top: 3rpx;
		margin-left: 20rpx;
		font-weight: 100;
	}
	.drop_down_menu{
		margin: 30rpx 10rpx 10rpx 40rpx;
	}
	.picker{
		display: flex;
		width: 160rpx; 
		height: 50rpx;
		
		border-radius: 15rpx;
		overflow: hidden;
		font-size: 30rpx;
		line-height: 50rpx;
		background-color: #FFFFFF;
		border: 1px solid #30c478;
		color: #30c478;
	}
	
	.package_drop_down_icon{
	background-color: #FFFFFF;
	border-radius: 20rpx;
	overflow: hidden;
	padding-left: 20rpx;
	box-shadow: 10rpx 4rpx 10rpx #000000;
	}

	.my_package_list_style{
		
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.my_package_list{
		position: relative;
		width: 700rpx;
	
		margin-top: 30rpx;
	}
	.my_package_item{
		background-color: #FFFFFF;
		width: 700rpx;
		margin-bottom: 30rpx;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 4rpx 5rpx 20rpx #8a8a8a;
		
	} 
		
	.package_detail_label{
		position: relative;
	
	}
	.package_list_mark{
		width: 170rpx;
		top: 0rpx;
		right: 0rpx;
		position: absolute;
		z-index: 1;
		opacity: 0.6;
	}
	.package_list_mark_num{
		display: flex;
		position:absolute;
		right: 10rpx;
		top: 14rpx;
		z-index: 2;
	}
	.package_list_loop{
		position: relative;
		width: 100%;
		height: 420rpx;
	
	}
	.package_label{
		position: absolute; 
		z-index: 2; 
		left: 20rpx; 
		top: 30rpx;
	}
	 .package_icon_like_num{
		
		margin: 20rpx 10rpx 10rpx 10rpx;
	} 
	.package_like_icon{
		font-weight: 100;
		font-size: 30rpx; 
		float: right;
		margin-right:10rpx;
	
	}
	.package_name{
		
		font-weight: bold;
		margin: -10rpx  20rpx 15rpx 20rpx;
		font-size: 40rpx;
		width: 75%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.package_rare_total_time{
		margin-left: 20rpx;
		margin-bottom: 20rpx;
	}
	.package_rare_total{
		float: right;
		display: flex;
		margin-right: 10rpx;
		
	
	}
	.card_quantity{
		font-weight: 100;
		font-size: 20rpx;
		margin: 0rpx 10rpx;
	}
	
		
	
	/*
	.package_updatetime{
	background-color: ;
	font-weight: 300;
	font-size: 10rpx; 
	color:red;
	position: relative;
	top: 20rpx;
	}
	.collect_num{
		position:relative;
		float: right;
		bottom: -40rpx;
	} */
</style>
