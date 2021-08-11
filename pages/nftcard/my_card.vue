<template>
	<view>
		<view class="card_list">
			<view class="card_item">
				<image class="my_card_border" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/nft_card_detail.jpeg" mode="widthFix"></image>
			</view>
			<view class="card_item">
				<image class="my_card_border" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/package_example/2.jpg" mode="widthFix"></image>
			</view>
			<view class="card_item">
				<image class="my_card_border" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/package_example/Fenglin _volcano_03.jpg" mode="widthFix"></image>
			</view>
			<view class="card_item">
				<image class="my_card_border" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/package_example/3.jpg" mode="widthFix"></image>
			</view>
			<!-- <view>
				<view class="my_card_title_size">卡牌名称卡牌名称卡牌名称</view>
				<view class="my_card_font_size">有效时间</view>
			</view> -->
		</view>
		
	</view>
</template>



<script>
	
import util from '../../common/util.js';
	
export default {
	data() {
		return {
			
		};
	},
	onLoad: function (options) {
		
		console.log('当前时间：' + util.formatTime( new Date() ) + ' ' + util.formatTime2( new Date() ) + ':01' );
		
		console.log('pages/tabBar/index/index====>>>>', options);
		
		var that = this;
		
		uni.setNavigationBarTitle({
			title : that.abotapi.globalData.default_shopname
		});
		
		uni.setNavigationBarTitle({
			title : '我收藏的卡牌'
		});
		
		this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
		
		
		
		
		
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
		
		
	}
	
}
	
	
</script>

<style>
	.card_list{
		display: inline-block;
		vertical-align: top;
		width: 100%;
		float: left;
		margin-top: 0rpx;
	}
	.card_item{
		display: inline-block;
		vertical-align: top;
		width: 45%;
		float: left;
		margin: 2%;
	}
	
	.my_card_border{
		width: 100%;
		float: left;
	}
	
	.favorite_cards_images_height{
		
	}
	
	
	.my_card_title_size{
		padding-left: 22rpx;
		font-size: 32rpx;
		width: 44%;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.my_card_font_size{
		padding-left: 22rpx;
		font-size: 26rpx;
		padding-top: 10rpx;
		color: #7d7d7d;
	}
</style>

 