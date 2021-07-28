<template>
	<view>
		<!-- 封面 -->
		<view class="infor">
			<!-- <image class="" src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/1.png"></image> -->
			
			<view class="cover">
				<view class="">
					<image  src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/1.png" mode="widthFix" style="width:300rpx;taxt-align:center;"></image>
					<view>发行商：{{}}</view>
					<view>详情：{{}}</view>
					<view>有效期:</view>
				</view>
			</view>
			
		</view>
			<view>发行商：{{}}</view>
			<view>详情：{{}}</view>
			<view>有效期:</view>
	
	
		<!-- 筛选 -->
		<view class="card_button">
				<button type="warn" size="mini" v-for="item in screen">{{item.message}}</button>
				<image class="card_icon" src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/mark.png" mode="widthFix" style="width: 30rpx;"></image>
				<view class="num">5</view>
				<!-- <button type="warn" size="mini">普通卡</button>
				<button type="warn" size="mini">珍藏卡</button>
				<button type="warn" size="mini">已有</button>
				<button type="warn" size="mini">未有</button> -->
		</view>
		<view class="card">
			<view class="card_detail">
					<view><image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/2.jpg" mode="scaleToFill" style="width: 355rpx; height: 260rpx;"></image></view>
					<view style="float: right;">发行日期</view>
					<view>名称</view>
					<view>发行商：{{}}</view>
			</view>
			<view class="card_detail">
					<view><image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/3.jpg" mode="aspectFill" style="width: 355rpx; height: 260rpx;"></image></view>
					<view style="float: right;">发行日期</view>
					<view>名称</view>
					<view>发行商：{{}}</view>
			</view>
		</view>
		<view class="card">
			<view class="card_detail">
					<view><image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/4.jpg" mode="widthFix" style="width: 355rpx;"></image></view>
					<view style="float: right;">发行日期</view>
					<view>名称</view>
					<view>发行商：{{}}</view>
			</view>
			<view class="card_detail">
					<view><image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/5.jpg" mode="widthFix" style="width: 355rpx;"></image></view>
					<view style="float: right;">发行日期</view>
					<view>名称</view>
					<view>发行商：{{}}</view>
			</view>
		</view>	
		<view class="card">
			<view class="card_detail">
					<view><image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/6.jpg" mode="aspectFill" style="width: 355rpx; height: 260rpx;"></image></view>
					<view style="float: right;">发行日期</view>
					<view>名称</view>
					<view>发行商：{{}}</view>
			</view>
			<view class="card_detail">
					<view><image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/7.jpg" mode="aspectFill" style="width: 355rpx; height: 260rpx;"></image></view>
					<view style="float: right;">发行日期</view>
					<view>名称</view>
					<view>发行商：{{}}</view>
			</view>
		</view>
		<view class="card">
			<view class="card_detail">
					<view><image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/8.jpg" mode="aspectFill" style="width: 355rpx; height: 260rpx;"></image></view>
					<view style="float: right;">发行日期</view>
					<view>名称</view>
					<view>发行商：{{}}</view>
			</view>
			<view class="card_detail">
					<view><image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/9.jpg" mode="aspectFill" style="width: 355rpx; height: 260rpx;"></image></view>
					<view style="float: right;">发行日期</view>
					<view>名称</view>
					<view>发行商：{{}}</view>
			</view>
		</view>
		<view class="">
			<view clas="series_card">
				<view style="float: right; font-size: smaller; margin: 10rpx; color: red;">>>更多卡牌>></view>
				<view style="font-weight: bold; font-size: larger;">系列卡牌</view>
			</view>
			<!-- 系列卡牌——左右滑动 -->
			<scroll-view scroll-x="true">
				<view class="slide_cards">
					<view class="slide_cards_pic">
						<image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/slide_card_01.jpg" style="width: 355rpx;"></image>
						<view>名称</view>
					</view>
					<view class="slide_cards_pic">
						<image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/slide_card_02.jpg" style="width: 355rpx;"></image>
						<view>名称</view>
					</view>
					<view class="slide_cards_pic">
						<image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/slide_card_03.jpg" style="width: 355rpx;"></image>
						<view>名称</view>
					</view>
					<view class="slide_cards_pic">
						<image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/slide_card_04.jpg" style="width: 355rpx;"></image>
						<view>名称</view>
					</view>
					<view class="slide_cards_pic">
						<image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/slide_card_05.jpg" style="width: 355rpx;"></image>
						<view>名称</view>
					</view>	
				</view>
			</scroll-view>
		</view>	
	</view>
</template>

<script>
	
import util from '../../common/util.js';
	
export default {
	data() {
		return {
			screen:[
				{message:"全部卡牌"},
				{message:"珍藏卡"},
				{message:"普通卡"},
				{message:"已有"},
				{message:"未有"}
			]
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
			title : '卡包详情',
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
	/*  onReachBottom: function () {
		
		//this.get_product_list();
		
	}, */
	
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
	.infor{
		
		filter: blur(15rpx);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width:100%;
		height: 450rpx;
	}
	.cover{
		
	}
	.cover_data{
		
	}
	.card_button{
		position: relative;
		display: flex;
		flexd:1;
		margin-top: 200rpx;
		margin-bottom: 20rpx;
	}
	.card_icon{
		position: absolute;
		
		top: -15rpx;
		right: 0rpx;
	}
	.num{
		position: absolute;
		
		top: -17rpx;
		right: 5rpx;
	}
	.card{
		display: flex;
	}
	.card_detail{
		margin: 10rpx;
	}
	.slide_cards{
		display: flex;
	}
	.slide_cards_pic{
		margin-right: 10rpx;
	}
</style>
