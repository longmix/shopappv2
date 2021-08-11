<template>
	<view class="global_background">
		<view class="">
			<view class="" v-for="(current_package_list_item,index) in current_package_list">
				<view><image :src="current_package_list_item.cover_img_url" mode="widthFix" style="width: 350rpx;"></image></view>
				<view>{{current_package_list_item.title}}</view>
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
			title : '喜欢的卡包',
		});
		
	
	
	//获取卡包列表
	
	that.abotapi.abotRequest({
	    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_package_list',
	    method: 'post',
	    data: {
			sellerid:that.abotapi.globalData.default_sellerid,
			userid:that.current_userid,
			
	    },
	    success: function (res) {
			
			if(res.data.code != 1){
				uni.showToast({
					title:'卡包列表没有数据',
					duration: 2000,
				});
				
				return;
			}
			
			that.current_package_list = res.data.data;
			
			console.log('current_package_list ===>>> ', that.current_package_list);
			
			
			
			
			
			
			
			
					
			
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
		}
	}	
}
</script>

<style>
	@import "/static/css/nftcard.css";
	
	
</style>
