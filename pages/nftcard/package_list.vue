<template>
	<view class="global_background">	
	
				<!-- 排序 -->
		<view class="drop_down_menu">
			<picker @change="bindPickerChange" :value="index" :range="array">
				<view class="picker" style="background-color: #FFFFFF;width: 150rpx;">
					{{array[index]}}
					<image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/drop_down.png"
					mode="widthFix" style="width: 30rpx; left: 0rpx; top: 6rpx;"></image>
				</view>
			</picker>
		</view>
				
				
				
				<!-- 卡包列表及详情 -->
				
		<view class="my_package_list_style"	>
			<view class="my_package_list">
				<view class="my_package_item"
					v-for="(current_package_item, index) in current_package_list"
					 @tap="goto_package_detail(current_package_item.packageid)" >
					<view class="">
						<image class="package_list_loop" :src="current_package_item.cover_img_url" mode=" aspectFill" ></image>
					</view>
					<view class="package_describe"><!-- {{current_package_item.cover_img_url}} -->
						<view class="" style="font-weight: 100; font-size: 30rpx; width: 150rpx; float: right;margin-right:50rpx;">
							<!-- <image  src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/like.png" mode="widthFix" style="width: 30rpx;float: left;"></image>	 -->
							<image  src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/already_like.png" mode="aspectFill" style="width: 30rpx;height:30rpx;"></image>
							{{current_package_item.like_count}}人喜欢
						</view>
						<view class="package_label">
							<view class="package_lable_list" v-for="(item,index) in current_package_item.tag_list">{{item}}</view>
						</view>
						
						<view class="package_name">{{current_package_item.title}}</view>
					
						<view class="package_brief">{{current_package_item.brief}}{{current_package_item.packageid}}</view>
						
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
			p:2,
			
			index:0,
			array:['智能排序','热度排序','时间排序']
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
			title : '卡包列表',
		});
		
		that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);
	
		
		
		//获取卡包列表
		
		that.abotapi.abotRequest({
		    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_package_list',
		    method: 'post',
		    data: {
				sellerid:that.abotapi.globalData.default_sellerid,
				p: 2,
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
		
		
		bindPickerChange(e){
			console.log(e)
		}
		
		
		
		
	}
	
}
	
	
</script>


<style>
	.global_background{
		background-color:#eceeef;

	}
	.drop_down_menu{
		
		padding: 60rpx 0rpx 10rpx 50rpx;		
		
	}
	.picker{
		border-radius: 10rpx;
		overflow: hidden;
		font-weight: 100;
		font-size: 30rpx;
	}
	.package_drop_down_icon{
	background-color: #FFFFFF;
	border-radius: 20rpx;
	overflow: hidden;
	padding-left: 20rpx;
	}

	.my_package_list_style{
	
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	}
	.my_package_list{
	width: 700rpx;
	background-color: #e1e3e4;
	margin-top: 30rpx;
	}
	.my_package_item{

		background-color: #FFFFFF;
		width: 700rpx;
		margin-bottom: 30rpx;
		border-radius: 30rpx;
		overflow: hidden;
		
	} 
	.package_list_loop{
		width: 100%;
		height: 420rpx;
		
	}
	 .package_describe{
		width: 100%;
		margin-top: 20rpx;
		margin-left: 30rpx;
		
	}
		
	.package_label{
		
		display: flex;
	}
	.package_lable_list{
		background-color: #f3f5f6;
		color: #15c5ce;
		margin: 5rpx;
		
		width: 150rpx;
		border-radius: 20rpx;
		overflow: hidden;
		font-size: 10rpx;
		text-align: center;
	}
	.package_name{
		font-weight: bold;
		margin-bottom: 20rpx;
		font-size: 40rpx;
		height: 50rpx;
		white-space: nowrap;
		overflow: hidden;
		
	}
	.package_brief{
		 font-weight: 300; 
		 font-size: 10rpx;
		 margin-bottom: 20rpx;
	}
	/*
	.package_updatetime{
	background-color: ;
	font-weight: 300;
	font-size: 10rpx; 
	color:red;
	position: relative;
	top: 20rpx;
	}
	.collect_num{
		position:relative;
		float: right;
		bottom: -40rpx;
	} */
</style>
