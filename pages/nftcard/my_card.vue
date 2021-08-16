<template>
	<view class="content">
		<!-- 全部及典藏珍藏卡牌按钮 -->
		<view class="tabs">
		    <block v-for="(tab,index) in tabBars" :key="tab.id">
				<view class="uni-tab-item" :class="{'uni-tab-item-title-active' :tabIndex==index}" @tap="tabtap(index)">
					<view class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</view>
				</view>
		    </block>
		</view>
		
		
		
	    <waterfallsFlow :list="current_card_list">
			<!--  #ifdef  MP-WEIXIN -->
			<!-- 微信小程序自定义内容 -->
			<view v-for="(item, index) of list" :key="index" slot="slot{{index}}">
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

import waterfallsFlow from "@/components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	
export default {
	components: { waterfallsFlow },
	data() {
		return {
			current_card_list:null,
			current_packageid:0,
			
			action_data_type:'my_favorite_list',
			
			
			tabIndex:0,
			    tabBars:[
					{ name:"全部卡牌",id:"quanbu"},
			        { name:"典藏卡",id:"diancang"},
			        { name:"珍藏卡",id:"zhencang"},
			    ]
		};
	},
	/**
	 * @param {Object} options
	 * 
	 * 跳转的路径、
	 * /pages/nftcard/my_card   默认打开  我收藏的卡牌
	 * 我收藏的卡牌  /pages/nftcard/my_card?action_data_type=my_favorite_list
	 * 我购买的卡牌  /pages/nftcard/my_card?action_data_type=my_buy_card_list
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
			that.action_data_type = options.action_data_type;
		}
		
		if(that.action_data_type == 'my_favorite_list'){
			uni.setNavigationBarTitle({
				title : '我收藏的卡牌'
			});
		}
		else if(that.action_data_type == 'my_buy_card_list'){
			uni.setNavigationBarTitle({
				title : '我购买的卡牌'
			});
			
		}
		
		this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
		
		that.current_packageid = options.packageid;
		
		console.log('that.current_packageid ===》》 ', that.current_packageid);
		
		//判断用户是否登录
		
		var userInfo = that.abotapi.get_user_info();
		if ((!userInfo) || (!userInfo.userid)) {
			that.abotapi.call_h5browser_or_other_goto_url('/pages/login/login');
			return;
		}
		
		//获取收藏的卡牌列表
		
		that.abotapi.abotRequest({
		    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_card_list',
		    method: 'post',
		    data: {
				sellerid:that.abotapi.globalData.default_sellerid,
				checkstr:userInfo.checkstr,
				userid:userInfo.userid,
				action: that.action_data_type,
		    },
		    success: function (res) {
				
				if((res.data.code != 1) || (!res.data.data) ){
					uni.showToast({
						title:'',
						duration: 2000,
					});
					
					return;
				}
				
				
				
				var card_list = res.data.data;
				
				that.current_card_list = [];
				
				for(var i=0; i<card_list.length; i++){
					var card_item = card_list[i];
					
					console.log(card_item);
					//转换为对象数组
					var new_card_item = {};
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
		
		
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom: function () {
		
		this.get_product_list();
		
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
		
		
		// go_to_my_detail:function(packageid,cardid){
		// 	console.log('packageid===>>>' + packageid);
		// 	console.log('cardid===>>>' + cardid);
			
		// 	uni.navigateTo({
		// 		url: '/pages/nftcard/card_detail?packageid='+packageid+'&cardid='+cardid,
		// 	})
		// },
		
		
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
		/* border-bottom: #30C478 2rpx solid; */
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
			white-space: nowrap;
		}
  }
}


</style>
 