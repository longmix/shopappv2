<template>
	<view class="global_background">
		<view class="" style="width: 750rpx;height: 20rpx;"></view>
		<!-- 全部筛选   有效   无效-->
		<view style="display: flex;margin: 20rpx 0rpx;">
			<view class="my_package_screen" style="background-color: #30c478;color: #FFFFFF;">全部卡包</view>
			<view class="my_package_screen" >正在发售</view>
			<view class="my_package_screen" >过期卡包</view>
		</view>
		
		<!-- 喜欢的卡包列表 -->
		<view class="" >
			<view class="my_package_like_list" v-for="(current_package_list_item,index) in current_package_list"
				@tap="goto_package_detail(current_package_list_item.packageid)">
				
				<!--卡包的图片 -->
				<view><image :src="current_package_list_item.cover_img_url" mode="" style="width:345rpx;height:100%;border-radius: 20rpx;"></image></view>
				
				<!-- 卡包详情 -->
				<view class="my_package_detail" >
					<view class="my_package_name" >{{current_package_list_item.title}}</view>
					
					<!-- 发行商icon图标  名字 -->
					<view style="margin-top: 10rpx; width: 350rpx;display: flex;">
						<image :src="current_package_list_item.supplier_icon" mode=""
							style="width: 35rpx;height: 35rpx;top: 5rpx;"></image>
						<view style="margin-left: 15rpx;">{{current_package_list_item.supplier_name}}</view>
					</view>
					
					<!-- 进度条 -->
					<view class="uni-padding-wrap uni-common-mt">
					 	<view class="progress-box">
							<progress percent="50" activeColor="#30C478" stroke-width="3" 
								show-info="" backgroundColor="red" font-size="15"></progress>
						</view>
					</view>
					
					<!-- 喜欢卡包的简介  发行时间 -->
					<view class="" style="margin-top: 10rpx;">
						<view class="my_package_brief" >{{current_package_list_item.brief}}</view>
						<view style="font-size: 25rpx;font-weight: 100;">{{current_package_list_item.time_begin_str}}</view>
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
		
		
		//判断用户是否登录
		
		var userInfo = that.abotapi.get_user_info();
		if ((!userInfo) || (!userInfo.userid)) {
			that.abotapi.call_h5browser_or_other_goto_url('/pages/login/login');
			return;
		}
		
		
		
	
	
		//获取卡包列表
		
		that.abotapi.abotRequest({
			url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_package_list',
			method: 'post',
			data: {
				sellerid:that.abotapi.globalData.default_sellerid,
				
				
				checkstr:userInfo.checkstr,
				userid:userInfo.userid,
				action: 'my_like_list',
				
				
				
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
		},
		
		
		goto_package_detail:function(packageid){
			console.log('packageid===>>>' + packageid);
			
			uni.navigateTo({
				url: '/pages/nftcard/package_detail?packageid='+packageid,
			})
		},
		
		
		
		
		
		
		
		
		
		
	}	
}
</script>

<style>
	@import "/static/css/nftcard.css";
	
	.my_package_screen{
		background-color: #FFFFFF;
		margin: 10rpx 20rpx;
		width: 150rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 15rpx;
		overflow: hidden;
		text-align: center;
	}
	
	.my_package_like_list{
		
		display: flex;
		width: 720rpx;
		height: 230rpx;
		margin: 20rpx 15rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.my_package_detail{
		margin-top: 5rpx;
		margin-left: 30rpx;
		width:345rpx;
	}
	.my_package_name{
		width: 80%;
		font-weight: bold;
		font-size: 40rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.my_package_brief{
		width: 80%;
		font-weight: 100;
		font-size: 25rpx;
		margin-top: 10rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
