<template>
	<view class="content">
		<!-- 全部及典藏珍藏卡牌按钮 -->
		<view class="tabs">
		    <block v-for="(tab,index) in tabBars" :key="tab.id">
				<view class="uni-tab-item" 
					:class="{'uni-tab-item-title-active' :tabIndex==index}" 
					@tap="tabtap(index)">
					<view class="uni-tab-item-title" 
						:class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</view>
				</view>
		    </block>
		</view>
		
		<view v-if="(is_http_data_loaded == 1) && (current_card_list.length == 0)" style="text-align : center;">
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/empty_favorite.png" mode="widthFix" style="width: 300rpx;height: 300rpx;"></image>
			<view>空空如也 ~~</view>
		</view>
		
	    <waterfallsFlow 
			v-else
			:list="current_card_list" 
			@wapper-lick="go_to_card_detail">
			<!--  #ifdef  MP-WEIXIN -->
			<!-- 微信小程序自定义内容 -->
			<view v-for="(item, index) of current_card_list" :key="index" slot="slot{{index}}">
				<view class="cnt">
					<view class="title">{{ item.title }}</view>
					<view class="text">{{ item.text }}</view>
				</view>
			</view>
			<!--  #endif -->
				
			<!-- #ifndef  MP-WEIXIN -->
			<!-- app、h5 自定义内容 --> 
			<template v-slot:default="item">
				<view class="cnt">
					<view class="title">{{ item.title }}</view>
					<view class="text">{{ item.text }}</view>
				</view>
			</template>
			<!-- #endif -->
	    </waterfallsFlow>
		
		
		
		
	</view>
	
	
	
</template>



<script>
import util from '../../common/util.js';

//import waterfallsFlow from "@/components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
import waterfallsFlow from "./components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	
export default {
	components: { waterfallsFlow },
	data() {
		return {
			current_card_list:[],
			
			action_data_type:'my_favorite_list',
			
			tabIndex:0,
			tabBars:[
				{ name:"全部卡牌",id:"quanbu"},
				//先隐藏以下两个按钮的功能，下个版本再考虑增加
				//{ name:"典藏卡",id:"diancang"},
				//{ name:"珍藏卡",id:"zhencang"},
			],
			current_page : 1,
			
			//是否网络数据传输完成
			is_http_data_loaded:0,
		};
	},
	/**
	 * @param {Object} options
	 * 
	 * 跳转的路径、
	 * /pages/nftcard/my_card   默认打开  我收藏的卡牌
	 * 我收藏的卡牌  /pages/nftcard/my_card?action_data_type=my_favorite_list
	 * 我购买的卡牌  /pages/nftcard/my_card?action_data_type=my_card_buy_list
	 * 
	 * 
	 */
	onLoad: function (options) {
		
		console.log('当前时间：' + util.formatTime( new Date() ) + ' ' + util.formatTime2( new Date() ) + ':01' );
		
		console.log('pages/tabBar/index/index====>>>>', options);
		
		var that = this;
		
		uni.setNavigationBarTitle({
			title : that.abotapi.globalData.default_shopname
		});
		
		if(options.action_data_type){
			that.action_data_type = options.action_data_type.trim();
		}
		
		if(that.action_data_type == 'my_favorite_list'){
			uni.setNavigationBarTitle({
				title : '我的收藏'
			});
		}
		else if(that.action_data_type == 'my_card_buy_list'){
			uni.setNavigationBarTitle({
				title : '我的卡牌'
			});
			
		}
		else{
			that.action_data_type = 'my_favorite_list';
			uni.setNavigationBarTitle({
				title : '我收藏的卡牌（临）'
			});
		}
		
		this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
		
		that.current_packageid = options.packageid;
		
		console.log('that.current_packageid ===》》 ', that.current_packageid);
		
		uni.showLoading({
			title: '数据加载中...',
		})
		
		setTimeout(function() {
			uni.hideLoading();
		}, 2000);
		
		this.__get_card_list();
		
		
		
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
		
		
		uni.showLoading({
			title: '数据加载中...',
		})
		
		setTimeout(function() {
			console.log('timeout===>>>stopPullDownRefresh===>>>hideToast');
			
			uni.stopPullDownRefresh();
			uni.hideLoading();
			
		}, 2000);
		
		console.log('onPullDownRefresh=====>>>>>');
		
		this.current_page = 1;
		this.current_card_list = [];
		this.__get_card_list();
		
		
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom: function () {
		this.current_page ++;
		this.__get_card_list();
		
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
		
		tabtap(index){
			this.tabIndex=index;
			
			uni.showToast({
				title: ' ',
				duration: 2000,
			});
						
			return;
		},
		
		
		go_to_card_detail: function(cardItem) {
			console.log('go_to_card_detail002===>>>', cardItem);
			
			var packageid = cardItem.packageid;
			var cardid = cardItem.cardid;
			
			
			console.log('packageid===>>>' + packageid);
			console.log('cardid===>>>' + cardid);
		
			uni.navigateTo({
				url: '/pages/nftcard/card_detail?packageid=' + packageid + '&cardid=' + cardid,
			})
		},
		
		__get_card_list:function(){
			var that = this;
						
			//======= 判断用户是否登录 ============
			var last_url = '/pages/nftcard/my_card';
			
			var userInfo = that.abotapi.get_user_info();
			if (!userInfo) {
				that.abotapi.goto_user_login(last_url);
			
				return;
			}
			//============= End ================
			
			
			//获取收藏的卡牌列表
			
			
			that.abotapi.abotRequest({
			    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_card_list',
			    method: 'post',
			    data: {
					sellerid:that.abotapi.globalData.default_sellerid,
					//packageid:that.current_packageid,
					checkstr:userInfo.checkstr,
					userid:userInfo.userid,
					action: that.action_data_type,
					page: that.current_page,
			    },
			    success: function (res) {
					
					that.is_http_data_loaded = 1;
					
					if((res.data.code != 1) || (!res.data.data) ){
						uni.showToast({
							title:'暂无数据',
							duration: 2000,
						});
						
						return;
					}
					
					var card_list = res.data.data;
					
					if(!that.current_card_list){
						that.current_card_list = [];
					}
					
					if(card_list && (card_list.length == 0) ){
						uni.showToast({
							title:'到底了~',
							duration: 2000,
						});
						
						return;
					}
					
					
					for(var i=0; i<card_list.length; i++){
						var card_item = card_list[i];
						
						console.log(card_item);
						//转换为对象数组
						var new_card_item = {};
						new_card_item.packageid = card_item.packageid;
						new_card_item.cardid = card_item.cardid;
						new_card_item.id = card_item.cardid;
						new_card_item.image_url = card_item.cover_img_url_2x3;
						new_card_item.title = card_item.card_name;
						new_card_item.text = card_item.brief;
						
						that.current_card_list.push(new_card_item);
					}
					
					console.log('current_card_list ===>>> ', that.current_card_list);
						
					
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
				
			});
			
			
		},
		
		
		
	}
	
}
	
	
</script>


<style>
	.tabs {
		margin-top: 20rpx;
		margin-bottom: 40rpx;
	}
	
	.uni-tab-item {
	    display: inline-block;
		margin-right: 20rpx;
	}
	
	.uni-tab-item-title {
	    color: #555;
	    font-size: 30rpx;
	    line-height: 55rpx;
		background-color: #FFFFFF;
		border-radius: 15rpx;
	    padding-left: 20rpx;
	    padding-right: 20rpx;
	}
	
	.uni-tab-item-title-active {
	    color: #FFFFFF;
		background-color: #30C478;
		border-radius: 15rpx;
	}
	
	
	
	
	
	
	
	
	
	
	
	
page {
  background-color: #eee;
}
</style>
<style lang="scss" scoped>
.content {
	padding: 10px;
	.cnt {
		padding: 10px;
		background-color: #FFFFFF;
		.title {
			font-size: 16px;
			font-weight: bold;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.text {
			font-size: 12px;
			margin-top: 5px;
			color: #7a7a7a;
			overflow: hidden;
			text-overflow: ellipsis;
			display:-webkit-box;
			-webkit-line-clamp:3;
			-webkit-box-orient:vertical;
		}
  }
}


</style>
 