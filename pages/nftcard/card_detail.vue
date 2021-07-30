<template>
	<view>
<!--

购买卡片的跳转路径：  
/pages/order/pay?productid=12345&total=12.34&extraData=abcdefg

参数说明：
productid 对应的商品名称，由服务器返回，在卡牌详情中
total 总价格，由服务器返回，在卡牌详情中
extraData 扩展数据，由服务器返回，在卡牌详情中

		
-->		
		<view style="height: 550rpx;">
			<!-- 背景模糊图片 -->
			<image :src="current_card_detail.cover_img_url" class="card_detail_border"></image>
			<!-- 卡牌封面 -->
			<view>
				<image :src="current_card_detail.cover_img_url" class="card_detail_image"></image>
			</view>
			<!-- 有多少人喜欢 及 有多少张重复卡牌 -->
			<view class="card_detail_xihuan">
				<image src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/aixin.png" class="card_detail_aixin"></image>
				10 人喜欢<br>
				<view>我有 2 张</view>
			</view>
		</view>
		<!-- 所属卡包信息 -->
		<view class="card_detail_xinxi">
			<h4 class="card_detail_h4">{{current_card_detail.card_name}}</h4>
			<view>发行时间：{{current_card_detail.createtime}}</view>
			<view>{{current_card_detail.description}}</view>
			<view style="padding-top: 20rpx;padding-bottom: 10rpx;">
				<h4 class="card_detail_h4">所属卡包</h4>
				<image :src="current_card_detail.cover_img_url" class="card_detail_kabaotoxiang"></image>
				<view class="card_detail_kabaoxinxi">
					<view><text class="card_detail_weight">卡包名称：</text>{{}}</view>
					<view><text class="card_detail_weight">发行商：</text>{{current_card_detail.supplier_name}}</view>
					<view><text class="card_detail_weight">库存：</text>|<text class="card_detail_weight">发行：</text></view>
				</view>
				
			</view>
			
			
		</view>
			<view style="padding-left: 15rpx;">
				<!-- 其他卡牌 -->
				<h4 class="card_detail_h4">其他卡牌</h4>
				
				<view v-for="">
					<view class="card_detail_background">
						<view class="card_detail_kapai_imgwidth">
							<image :src="current_card_detail.cover_img_url" class="card_detail_kapai_border"></image>
						</view>
						<view style="line-height: 40rpx;">{{current_card_detail.card_name}}</view>
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
	<!-- <view v-else>数据获取失败</view> -->

</template>

<script>
import util from '../../common/util.js';

export default {
	data() {
		return {
			current_card_detail:null,
			current_cardid:0,
			current_packageid:0
		};
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

		that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);

		that.current_cardid = options.cardid;
		
		console.log('that.current_cardid ===》》 ', that.current_cardid);
		
		if(!that.current_cardid){
			uni.showModal({
				title:'没有cardid',
				content:',',
				showCancel:false
			});
			
			return;
		}
		
		//获取卡牌详情
		
		that.abotapi.abotRequest({
		    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_card_detail',
		    method: 'post',
		    data: {
				sellerid:that.abotapi.globalData.default_sellerid,
		
				cardid:that.current_cardid,
				
		    },
		    success: function (res) {
				
				if(res.data.code != 1){
					uni.showToast({
						title:'卡牌列表没有数据',
						duration: 2000,
					});
					
					return;
				}
				
				that.current_card_detail = res.data.data;
				
				console.log('current_card_detail ===>>> ', that.current_card_detail);
					
				
		    },
		    fail: function (e) {
				uni.showToast({
					title: '网络异常！',
					duration: 2000
				});
		    },
		});
		
		



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
	*{
		font-size: 25rpx;
	}
	.card_detail_weight{
		font-weight: 600;
		padding-left: 20rpx;
	}
	.card_detail_border {
		width:100%;
		height: 550rpx;
		filter: blur(15rpx);
	}
	.card_detail_h4{
		font-size: 30rpx;
		line-height: 60rpx;
	}
	.card_detail_image {
		align-items: center;
		position: absolute;
		left: 80rpx;
		top: 90rpx;
		height: 450rpx;
		border-radius: 20rpx;
	}
	.card_detail_an{
		width: 55rpx;
		height: 55rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	.card_detail_kabaotoxiang{
		float: left;
		width: 170rpx;
		height: 130rpx;
		min-height: 140rpx;
		border-radius: 20rpx;
		margin-right: 15rpx;
	}
	.card_detail_xihuan{
		float: right;
		padding: 20rpx 30rpx;
		text-align: right;
		line-height: 50rpx;
	}
	.card_detail_kabaoxinxi{
		padding-left: 20rpx;
		line-height: 47rpx;
	}
	.card_detail_aixin{
		width: 35rpx;
		height: 35rpx;
	}
	.card_detail_xinxi{
		padding: 15rpx;
		line-height: 40rpx;
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
		left: -140rpx;
	}
	.card_detail_background{
		width: 320rpx;
		background-color: #F7F7F7;
		margin: 10rpx;
		padding: 10rpx;
		border-radius: 15rpx;
	}
</style>
