<template>
	<view class="">
		<view class="" style="width: 750rpx;height: 20rpx;"></view>
		

		<view v-if="current_coupon_log == null" style="text-align : center;">
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/empty_favorite.png" mode="widthFix" style="width: 300rpx;"></image>
			<view style="padding-bottom: 50rpx;color: #666666;">空空如也 ~~</view>
		</view>
		
		
		
		<!-- 兑换的卡包记录 -->
		<view class="" >
			<view v-for="(current_coupon_log_list,index) in current_coupon_log"
			 :key="index" class="my_package_like_list"
			  @tap="goto_coupon_item()">
				
				<view class="" style="display: flex;">
					<!--卡包的图片 -->
					<view>
						<image :src="current_coupon_log_list.package_item.cover_img_url_stand" mode="widthFix" style="width:200rpx;border-radius: 10rpx;"></image>
					</view>
					<!-- 卡包及优惠券信息 -->		
					<view style="margin-top: 10rpx;margin-left: 20rpx;width: 490rpx;" >
						<view class="my_package_name" style="font-size: 35rpx;">{{current_coupon_log_list.package_item.title}}</view>
						
						<view class="my_package_name" style="color: #ecb36c;font-size: 30rpx;margin-top: 25rpx;">{{current_coupon_log_list.coupon_item.name}}</view>
						<view class="my_package_name" style="color: #666666;font-size: 25rpx;margin-top: 25rpx;">兑换时间：{{current_coupon_log_list.createtime}}</view>
						
						
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
			userid:0,
			current_coupon_log:null,
			
		}
	},
	
	onLoad: function (options) {
	
		
		console.log('当前时间：' + util.formatTime( new Date() ) + ' ' + util.formatTime2( new Date() ) + ':01' );
		
		console.log('pages/tabBar/index/index====>>>>', options);
		
		var that = this;
		
		uni.setNavigationBarTitle({
			title : that.abotapi.globalData.default_shopname
		});
		
		uni.setNavigationBarTitle({
			title : '卡包兑换记录',
		});
		
		
	
		//获取列表
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
	
		
		
		goto_package_detail:function(packageid){
			console.log('packageid===>>>' + packageid);
			
			uni.navigateTo({
				url: '/pages/nftcard/package_detail?packageid='+packageid,
			})
		},
		
		
		__nft_get_package_list:function(){
			var that=this;
			
			
			var userInfo = that.abotapi.get_user_info();
			
			if (!userInfo) {
				return 0;
				
			}
			
			var post_data = {
				sellerid: that.abotapi.get_sellerid(),
				userid: userInfo.userid,
				checkstr: userInfo.checkstr,
				
			};
			
			//获取卡包列表
			
			that.abotapi.abotRequest({
			    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/nftcard_package_to_coupon_log',
			    method: 'post',
			    data: post_data,
			    success: function (res) {
					
					if(res.data.code != 1){
						uni.showToast({
							title:'优惠券没数据',
							duration: 2000,
						});
						
						return;
					}
			
					that.current_coupon_log = res.data.data;
				
					console.log('package_to_coupon_log_list 55555555555555555===>>> ', that.current_coupon_log.coupon_item);
					
					
							
					
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
			});
			
			
			
		},
			
			
		goto_coupon_item:function(){
			var new_url = 'https://yanyubao.tseo.cn/Home/User/ticket_index/platform/shopappv2.html?ensellerid=%ensellerid%&oneclicklogin=%oneclicklogin%';
			this.abotapi.call_h5browser_or_other_goto_url(new_url)
		}	
			
		
		
		
		
	}	
}
</script>

<style>
	@import "./static/css/nftcard.css";
	

	.my_package_like_list{
		margin: 20rpx;
		background-color: #F5F5F5;
		border-radius: 10rpx;
	}

	.my_package_name{
		width: 95%;
		
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	

	.uni-tab-item {
	    display: inline-block;
		margin-right: 20rpx;
	}
	

	
</style>
