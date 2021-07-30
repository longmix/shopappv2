<template>
	<view class="global_background">
		<!-- 封面  模糊背景 -->
		<view class="">
			<view class="package_background">
				<image class="" :src="current_package_detail.cover_img_url" mode="scaleToFill" style="width: 100%; height: 500rpx;"></image>
			</view>
			<view class="prospect">
				<image class="" :src="current_package_detail.cover_img_url" mode="widthFix" style="width:400rpx;"></image>
			</view>
		</view>
		
		<!-- 卡包详情 -->
		<view class="package_information">
			<view style="font-weight: bold;">名称：{{current_package_detail.title}}</view>
			<view>
				<text style="font-weight: bold;">详情：</text>{{current_package_detail.description}}
			</view>
			<view>
				<text style="font-weight: bold;">有效期：</text>
				{{current_package_detail.createtime}}
			</view>	
		</view>
		
		<!-- 发行商图片及简介 -->
		<view class="publish_information">
				<image class="publish_icon" :src="current_package_detail.cover_img_url" mode="widthFix" style="width: 250rpx;"></image>
				<view class="package_card_publish">
					<view>
						<text style="font-weight: bold;">发行商：</text>
						{{current_package_detail.supplier_name}}
					</view>
				
					<view><text style="font-weight: bold;">描述：</text></view>
					
				</view>
				
			</view>
			
		
	
	
		<!-- 筛选框 -->
		<view class="">
			<view class="screen_card">
				<view style="color: red;">全部</view>
				<view >普通卡</view>
				<view >珍藏卡</view>
				<view >已有</view>
				<view >未有</view>
			</view>
			<!-- <view class="">
				<image class="card_icon" src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/mark.png" mode="widthFix" style="width: 30rpx;"></image>
				<view class="num">5</view>
			</view> -->
		</view>
							
				<!-- 卡包中的卡牌 --> 
			<view class="my_package_detail_card_list">
				<view class="card_list"
				v-for="(current_card_item,index) in current_card_list">
				<view>
					<image :src="current_card_item.cover_img_url" mode="aspectFill" style="width: 355rpx; height: 260rpx;"></image>
				</view>
					<view class="package_detail_card_information">
						<view style="font-weight: bold;">卡牌名称：{{current_card_item.card_name}}</view>
						<view>发行商：{{current_card_item.supplier_name}}</view>
						<view >发行期：{{current_card_item.createtime}}</view>
					</view>
					
				</view>	 
			</view>
		
			<view clas="">
				<view class="more_card" >>>更多卡牌>></view>
				<view class="series_card">系列卡牌</view>
			</view>
			<!-- 系列卡牌——左右滑动 -->
			<scroll-view scroll-x="true">
				<view class="slide_cards">
					<view class="" v-for="(current_card_slid_item,index) in current_card_list">
						<view class="slide_cards_pic">
							<image :src="current_card_slid_item.cover_img_url" mode="aspectFill" style="width: 355rpx;"></image>
							<view>{{current_card_slid_item.card_name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
	
	</view>
</template>

<script>
	
import util from '../../common/util.js';
	
export default {
	data() {
		return {
			current_package_detail:null,
			current_packageid:0,
			current_card_list:null,
			current_cardid:0,
		
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
		
		
		
		that.current_packageid = options.packageid;
		
		console.log('that.current_packageid ===》》 ', that.current_packageid);
		
		if(!that.current_packageid){
			uni.showModal({
				title:'',
				content:',',
				showCancel:false
			});
			
			return;
		}
		
		
		
		//获取卡包列表
		
		that.abotapi.abotRequest({
		  url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_package_detail',
			
			
		    method: 'post',
		    data: {
				sellerid:that.abotapi.globalData.default_sellerid,
				packageid:that.current_packageid,
	
		    },
		    success: function (res) {
				
				if(res.data.code != 1){
					uni.showToast({
						title:'卡包详情没有数据',
						duration: 2000,
					});
					
					return;
				}
				
				that.current_package_detail = res.data.data;
				
				console.log('current_package_detail ===>>> ', that.current_package_detail);
				
				
		    },
		    fail: function (e) {
				uni.showToast({
					title: '网络异常！',
					duration: 2000
				});
		    },
		});
		
		
		
		
		
		
		//获取卡包列表
		
		that.abotapi.abotRequest({
		    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_card_list',
			
		    method: 'post',
		    data: {
				sellerid:that.abotapi.globalData.default_sellerid,
				packageid:that.current_packageid,
			
		    },
		    success: function (res) {
				
				if(res.data.code != 1){
					uni.showToast({
						title:'卡包详情没有数据',
						duration: 2000,
					});
					
					return;
				}
				
				that.current_card_list = res.data.data;
				
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
	.global_background{
		background-color: #f4f4f4;
	}
	.package_background{
		margin-top: 5rpx;
		filter: blur(20rpx);
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width:100%;
		height: 450rpx;
	}
	.prospect{
		position: absolute;
		top: -20rpx;
		left: -20rpx;
		transform:translate(50%,50%);
	}
	.package_information{
		background-color: #FFFFFF;
		margin:80rpx 20rpx 20rpx 10rpx;
		padding: 0 10rpx;
		
	}
	.publish_information{
		background-color: #FFFFFF;
		margin: 10rpx 20rpx 5rpx 10rpx ;
		padding: 10rpx;
		display: flex;
		
	}
	.publish_icon{
		border-radius: 50rpx;
		overflow: hidden;
	}
	.package_card_publish{
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
	.screen_card{
		font-weight:bolder;
		font-size: large;
		justify-content: space-between;
		display: flex;
		margin: 5rpx 0rpx;
		padding:5rpx 30rpx;
	}
	
	.my_package_detail_card_list{
		background-color: #FFFFFF;
		margin:10rpx 20rpx 5rpx 10rpx;  
		padding-left: 5rpx;
		
	}
	.card_list{
		display: flex;
		margin: 5rpx;
		padding:5rpx;
	}
	.package_detail_card_information{
		margin-top: 30rpx;
		padding-top: 20rpx;
		margin-left: 20rpx;
		
	}
	.more_card{
		float: right;
		font-size: smaller;
		margin: 10rpx; 
		color: red;
	}
	.series_card{
		margin-left: 20rpx;
		font-weight: bold; 
		font-size: larger;
	}
	.slide_cards{
		display: flex;
		margin-left: 20rpx;
	}
	.slide_cards_pic{
		margin:5rpx;
		padding: 5rpx;
	}
</style>
