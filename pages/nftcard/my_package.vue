<template>
	<view class="global_background">
		<view class="" style="width: 750rpx;height: 20rpx;"></view>
		
		
		<view class="tabs">
		    <block v-for="(tab,index) in tabBars" :key="tab.id">
				<view class="uni-tab-item" :class="{'uni-tab-item-title-active' :tabIndex==index}" @tap="tabtap(index)">
					<view class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</view>
				</view>
		    </block>
		</view>
		
		<!-- 全部筛选   有效   无效-->
		<!-- <view style="display: flex;margin: 20rpx 0rpx;">
			<view class="my_package_screen" style="background-color: #30c478;color: #FFFFFF;">全部卡包</view>
			<view class="my_package_screen" >正在发售</view>
			<view class="my_package_screen" >过期卡包</view>
		</view> -->
		
		
		<view v-if="current_package_list ==''" style="text-align : center;">
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/empty_favorite.png" mode="widthFix" style="width: 300rpx;"></image>
			<view style="padding-bottom: 50rpx;color: #666666;">空空如也 ~~</view>
		</view>
		
		
		
		<!-- 喜欢的卡包列表 -->
		<view class="" >
			<view v-for="(current_package_list_item,index) in current_package_list"
				:key="index" class="my_package_like_list"
				@tap="goto_package_detail(current_package_list_item.packageid)">
				
				<!--卡包的图片 -->
				<view><image :src="current_package_list_item.cover_img_url_3x2_stand" mode="widthFix" style="width:345rpx;border-radius: 20rpx;"></image></view>
				
				<!-- 卡包详情 -->
				<view class="my_package_detail" >
					<view class="my_package_name" >{{current_package_list_item.title}}</view>
					
					<!-- 发行商icon图标  名字 -->
				<!-- 	<view style="margin-top: 10rpx; width: 350rpx;display: flex;">
						<image :src="current_package_list_item.supplier_icon" mode=""
							style="width: 35rpx;height: 35rpx;top: 5rpx;"></image>
						<view style="margin-left: 15rpx;">{{current_package_list_item.supplier_name}}</view>
					</view> -->
					
					<!-- 进度条 -->
					<view class="uni-padding-wrap uni-common-mt">
					 	<view class="progress-box">
						<view class="" style="display: flex;">
							<view style="font-size: 20rpx;margin-top: 5rpx;font-weight: 100;">收集进度：</view>
							<view class="" style="font-size: 25rpx;">({{current_package_list_item.packageid_card_user_buy_count}}/{{current_package_list_item.packageid_card_count}})</view>
						</view>
							<progress :percent="current_package_list_item.sale_percent" activeColor="#30C478" stroke-width="3" 
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
			tabIndex:0,
			tabBars:[
				{ name:"全部卡牌",id:"quanbu"},
				// { name:"正在发售",id:"diancang"},
				// { name:"已过期",id:"zhencang"},
			],
			
			current_page : 1
			
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
		
		
		
		//======= 判断用户是否登录 ============
		var last_url = '/pages/nftcard/my_package';
		
		var userInfo = that.abotapi.get_user_info();
		if (!userInfo) {
			that.abotapi.goto_user_login(last_url);
		
			return;
		}
		//============= End ================
		
		
		
		
	
		//获取卡牌列表
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
		
		this.current_page = 1;
		this.current_package_list = [];
		this.__nft_get_package_list();
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom: function () {
		this.current_page ++;
		
		this.__nft_get_package_list();
		
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
			
			
			
		},
		
		
		
		goto_package_detail:function(packageid){
			console.log('packageid===>>>' + packageid);
			
			uni.navigateTo({
				url: '/pages/nftcard/package_detail?packageid='+packageid,
			})
		},
		
		
		__nft_get_package_list:function(){
			var that=this;
			//获取卡包列表
			
			var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					// action02:'expire_list',
					action: 'my_like_list',
					page: that.current_page,
			};
			
			
			    var userInfo = that.abotapi.get_user_info();
			    if (userInfo) {
			    	post_data.userid = userInfo.userid;
			    	post_data.checkstr = userInfo.checkstr;
			   }
			
			
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_package_list',
				method: 'post',
				data: post_data,
				success: function (res) {
					
					if(res.data.code != 1){
						uni.showToast({
							title:'卡包列表没有数据',
							duration: 2000,
						});
						
						return;
					}
					
					if(!that.current_package_list){
						that.current_package_list = [];
					}
						
					for(var i=0; i<res.data.data.length;i++ ){
						that.current_package_list.push(res.data.data[i]);
					}
					
					//that.current_package_list = res.data.data;
					
					console.log('current_package_list ===>>> ', that.current_package_list);
					
					for(var i=0; i<that.current_package_list.length; i++){					
						
						//计算已经售出的备份比
						that.current_package_list[i].sale_percent = 0;
						if(that.current_package_list[i].packageid_card_count == 0){
							that.current_package_list[i].sale_percent = 100;
						}
						else{
							
							that.current_package_list[i].sale_percent =
								parseInt(that.current_package_list[i].packageid_card_user_buy_count/that.current_package_list[i].packageid_card_count*100);
						}
					}
					
					
					
					
					
							
					
				},
				fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
				},
			});
		
		
			},
		
		
		
		
		
	}	
}
</script>

<style>
	@import "./static/css/nftcard.css";
	
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
	.tabs {
		margin-top: 20rpx;
		margin-bottom: 40rpx;
		margin-left: 20rpx;
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
	}
	
	
	
	
</style>
