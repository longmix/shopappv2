<template>
	<view>
		<view style="height: 550rpx;">
			<view class="card_detail_border"></view>
			<view style="width: 1000rpx;text-align: center;">
				<image style="text-align: center;" class="card_detail_image" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/nft_card_detail.jpeg"></image>
			</view>
			
			<view class="card_detail_xihuan">
				<image class="card_detail_aixin" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/aixin.png"></image>
				<text> 1 人喜欢</text><br>
				<view>我有 2 张</view>
			</view>
		</view>
		<view style="padding: 10rpx;">
			<h4 style="font-size: 34rpx; line-height: 60rpx;">所属卡包</h4>
			<image class="card_detail_kabaotoxiang" 
			src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/nft_card_detail.jpeg"></image>
			<view class="card_detail_kabaoxinxi">
				<view>卡包名称：</view>
				<view>发行商：</view>
				<view>库存：|发行：</view>
			</view>
			
			<view style="float: right;"></view>
			
		</view>
			<view style="padding-left: 15rpx;">
				<h4 style="font-size: 34rpx;">卡牌描述</h4>
				<view></view>
				<h4 style="font-size: 34rpx;">其他卡牌</h4>
				<view style="height: 500rpx;">
					<view class="card_detail_kapai_imgwidth">
						<image class="card_detail_kapai_border" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/nft_card_detail.jpeg"></image>
					</view>
					<view>
						卡牌名称
					</view>
				</view>
			</view>
		<view style="text-align: right;padding: 20rpx;">
			<radio type="radio" value="" checked="checked" style="float: left;">已拥有</radio>
			<image class="card_detail_an" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/收 藏.png"></image>
			<image class="card_detail_an" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/赠予.png"></image>
			<image class="card_detail_an" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/丢弃 .png"></image>
			<image class="card_detail_an" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/分 享.png"></image>
			<!-- <button name="button" type="button" value="购买" style="background: #007AFF;color: #FFFFFF;">购买</button> -->
		</view>
		<view>
			
		</view>
	</view>

</template>

<script>
	import util from '../../common/util.js';

	export default {
		data() {
			return {};
		},
		onLoad: function(options) {

			console.log('当前时间：' + util.formatTime(new Date()) + ' ' + util.formatTime2(new Date()) + ':01');

			console.log('pages/tabBar/index/index====>>>>', options);

			var that = this;

			uni.setNavigationBarTitle({
				title: that.abotapi.globalData.default_shopname
			});

			uni.setNavigationBarTitle({
				title: '卡牌详情'
			});

			this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);





		},
		onShow: function() {
			console.log('call onShow function (/pages/index/index)');
		},
		onPageScroll: function(e) {
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
			this.headerTop = e.scrollTop >= 0 ? null : 0;
			this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';



		},

		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh: function() {
			var that = this;

			console.log('onPullDownRefresh=====>>>>>');

			// #ifndef MP-ALIPAY
			uni.showToast({
				title: '数据更新中……',
				icon: 'loading',
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
		onReachBottom: function() {

			this.get_product_list();

		},

		onShareAppMessage: function() {
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
			if (!share_img) {
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

		onShareTimeline: function() {
			return this.share_return();
		},
		onAddToFavorites: function() {
			return this.share_return();
		},
		methods: {
			share_return: function() {
				var that = this;
			},

			callback_function_shop_option_data: function(that, cb_params) {

				console.log('当前调试开关22：' + this.system_debug_flag);
				console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);

				if (!cb_params) {
					return;
				}

				console.log('cb_params====', cb_params);
			}

		}
		
		
	}
</script>

<style>
	.card_detail_border {
		background: url(http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/nft_card_detail.jpeg) no-repeat;
		background-size: 100rpx;
		height: 550rpx;
		background-position: center;
		background-size: cover;
		filter: blur(12rpx);
	}
	.card_detail_image {
		align-items: center;
		position: absolute;
		left: 60rpx;
		top: 90rpx;
		height: 450rpx;
	}
	.card_detail_an{
		width: 55rpx;
		height: 55rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	.card_detail_kabaotoxiang{
		float: left;
		width: 200rpx;
		height: 120rpx;
		min-height: 130rpx;
		border-radius: 20rpx;
	}
	.card_detail_xihuan{
		float: right;
		padding: 20rpx 30rpx;
		text-align: right;
		line-height: 50rpx;
	}
	.card_detail_kabaoxinxi{
		padding-left: 20rpx;
		line-height: 48rpx;
	}
	.card_detail_aixin{
		width: 35rpx;
		height: 35rpx;
	}
	.card_detail_kapai_imgwidth{
		width: 300rpx;
		height: 450rpx;
		overflow: hidden;
		margin: 10rpx;
		border-radius: 15rpx;
	}
	.card_detail_kapai_border{
		width:600rpx;
		height: 450rpx;
		position: relative;
		left: -180rpx;
	}
</style>
