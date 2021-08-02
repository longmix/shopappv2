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
			<view style="font-weight: bold; font-size: 40rpx; white-space: nowrap;">{{current_package_detail.title}}</view>
			<view style="font-weight: 300; font-size: 10rpx;">
				详情：{{current_package_detail.description}}
			</view>
		
			<view class="" style="float: right;font-weight: 100; font-size: 30rpx;">
				<image src="http://192.168.0.86/yanyubao_server/Tpl/static/nft_card/package_example/like.png" mode="widthFix" style="width: 30rpx;" 
					v-if="current_package_detail.is_like == 1" @tap="set_like(0)"></image>
				<image src="http://192.168.0.86/yanyubao_server/Tpl/static/nft_card/package_example/already_like.png" mode="widthFix" style="width: 30rpx;" 
					v-if="current_package_detail.is_like == 0" @tap="set_like(1)"></image>
				11人喜欢
			</view>
			<view style="font-weight: 300; font-size: 10rpx; color: red;">
				有效期：{{current_package_detail.createtime}}
			</view>
				
		</view>
		
		<!-- 发行商图片及简介 12324-->
		<view class="publish_information">
				<image class="publish_icon" :src="current_package_detail.cover_img_url" mode="widthFix" style="width: 200rpx;"></image>
				<view class="package_card_publish">
					<view>
						<text style="font-weight: bold;">发行商：</text>
						{{current_package_detail.supplier_name}}
					</view>
				
					<view style="font-weight: 300; font-size: 10rpx;">简介：</view>
					<view class="" style="float: right;">
						<image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/follow.png" mode="widthFix" style="width: 120rpx;"></image>
					</view>
				</view>
				
			</view>
			
		
	
	
		<!-- 筛选框 -->
	<scroll-view scroll-x="true">
		<view class="scroll_button">
			<view class="scroll_items">
				<button size="mini">全部</button>
			</view>	
			<view class="scroll_items">
				<button size="mini">普通卡</button>
			</view>
			<view class="scroll_items">
				<button size="mini">珍藏卡</button>
			</view>	
			<view class="scroll_items">
				<button size="mini">已有</button>
			</view>		
			<view class="scroll_items">
				<button size="mini">未有</button>
			</view>
		</view>
		
						
	</scroll-view>
		
			<!-- <view class="">
				<image class="card_icon" src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/mark.png" mode="widthFix" style="width: 30rpx;"></image>
				<view class="num">5</view>
			</view> -->

							
				<!-- 卡包中的卡牌 --> 
				<view class="card_list_background">
					<view class="my_package_detail_card_list">
						<view class="card_list"
						v-for="(current_card_item,index) in current_card_list" @tap="go_to_card_detail(current_card_item.packageid, current_card_item.cardid)">
						<view class="">
							<image :src="current_card_item.cover_img_url" mode="aspectFill" style="width: 355rpx; height: 260rpx;"></image>
							
								<!-- <view class="package_detail_card_information"> -->
							<view style="font-weight: bold;font-size: 40rpx;">{{current_card_item.card_name}}</view>
									<!-- <view style=" font-weight: 100; font-size: 10rpx;">发行商：{{current_card_item.supplier_name}}</view> -->
								
							<view class="" style=" font-weight: 300; font-size: 10rpx;">
								{{current_card_item.description}}
									
							</view>
							<view class="" style="font-weight: 300; font-size: 10rpx; float: right;">
								<image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/collect.png" mode="widthFix" style="width: 30rpx;"></image>
								收藏人数
							</view>
							<view style="font-weight: 300; font-size: 10rpx;">{{current_card_item.createtime}}</view>
						
						</view>
							
							
						</view>	 
					</view>
							
				</view>
			
			
			<!-- 系列卡牌——左右滑动 -->
		<!-- 	<scroll-view scroll-x="true">
				<view class="slide_cards">
					<view class="" v-for="(current_card_slid_item,index) in current_card_list">
						<view class="slide_cards_pic">
							<image :src="current_card_slid_item.cover_img_url" mode="aspectFill" style="width: 355rpx;"></image>
							<view>{{current_card_slid_item.card_name}}</view>
						</view>
					</view>
				</view>
			</scroll-view> -->
	
	</view>
</template>

<script>
	
import util from '../../common/util.js';
	
export default {
	data() {
		return {
			current_package_detail:null,
			current_card_list:null,
			current_packageid:0,
			current_cardid:0,
			current_userid:0,
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
		
		var post_data = {
				sellerid:that.abotapi.globalData.default_sellerid,
				packageid:that.current_packageid,
				cardid:that.current_cardid,
				
		    };
			
		var userInfo = that.abotapi.get_user_info();	
		if(userInfo){
			post_data.userid = userInfo.userid;
			post_data.checkstr = userInfo.checkstr;
		}
		
		
		
		
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
		
		
		
		
		
		
		//获取卡牌列表
		
		
		
		
		
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
		
	
	
	
	
	
	
	
	
	//添加喜欢
	that.abotapi.abotRequest({
	    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/add_package_like',
		
	    method: 'post',
	    data: {
			sellerid:that.abotapi.globalData.default_sellerid,
			packageid:that.current_packageid,
			
			userid:that.current_userid,
	    },
	    success: function (res) {
			
			if(res.data.code != 1){
				uni.showToast({
					title:'收藏失败',
					duration: 2000,
				});
				
				return;
			}
			
			that.current_userid = res.data.data;
			
			console.log('current_userid  ===>>> ', that.current_userid);
			
			
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
		
		
		set_like:function(value001){
			var that = this;
			
			//请求服务器接口、
			var packageid = that.current_package_detail.packageid;
			
			//请求成功之后，修改本地的数据
			that.current_package_detail.is_like = value001;
			
		},
		
		
		callback_function_shop_option_data:function(that, cb_params){
			
			console.log('当前调试开关22：' + this.system_debug_flag);
			console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);
			
			if(!cb_params){
				return;
			}
			console.log('cb_params====', cb_params);
		},
		
		
		go_to_card_detail:function(packageid, cardid){
			console.log('packageid===>>>' + packageid);
			console.log('cardid===>>>' + cardid);
			
			uni.navigateTo({
				url: '/pages/nftcard/card_detail?packageid='+packageid+'&cardid='+cardid,
			})
		}
		
		
		
		
		
	}
	
}
	
	
</script>

<style>
	.global_background{
		background-color:#eceeef;
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
		transform:translate(50%,20%);
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
		border-radius: 50%;
		overflow: hidden;
	}
	.package_card_publish{
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
	.scroll_button{
		display: flex;
		white-space: nowrap;
		justify-content: space-between;
	
	}
	.scroll_items{
		padding: 30rpx 30rpx;
		margin-left: 20rpx;
	}

	.card_list_background{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.my_package_detail_card_list{
		
		background-color: #e2e4e4;
		width: 730rpx;
	
	}
	.card_list{
		display: flex;
		float: left;
		background-color: #FFFFFF;
		width: 350rpx;
		margin:5rpx 8rpx 10rpx 6rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

/* 	.package_detail_card_information{
		width: 100%;
		margin-left: 20rpx;
		white-space: nowrap;
		overflow: hidden;
	} */
	
/* 	.series_card{
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
	} */
</style>
