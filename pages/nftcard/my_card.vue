<template>
	
	
	<view class="content">
	    <waterfallsFlow :list="list">
			<!--  #ifdef  MP-WEIXIN -->
			<!-- 微信小程序自定义内容 -->
			<!-- <view v-for="(item, index) of list" :key="index" slot="slot{{index}}">
				<view class="cnt">
				<view class="title">{{ item.title }}</view>
					<view class="text">{{ item.text }}</view>
				</view>
			</view> -->
			<!--  #endif -->
				
			<!-- #ifndef  MP-WEIXIN -->
			<!-- app、h5 自定义内容 -->
			<template v-slot:default="item">
				<view class="cnt">
					<view class="title">{{ item.title }}</view>
					<view class="text">{{ item.text }}</view>
				</view>
			</template>
	    </waterfallsFlow>
	    <!-- #endif -->
	</view>
	
	
	
</template>



<script>
import util from '../../common/util.js';

import waterfallsFlow from "@/components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	
export default {
	components: { waterfallsFlow },
	data() {
		return {
			current_card_list:null,
			current_packageid:0,
			list: [
			        {
			          id: 1,
			          image_url:
			            "http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/package_example/2.jpg",
			          title: "卡牌名称",
			          text:
			            "2021-02-09",
			        },
			        {
			          id: 2,
			          image_url:
			            "http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/package_example/3.jpg",
			          title: "卡牌名称",
			          text:
			            "2021-02-09",
			        },
			        {
			          id: 3,
			          image_url:
			            "http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/package_example/Fenglin _volcano_01.jpg",
			          title: "卡牌名称",
			          text:
			            "2021-02-09",
			        },
			        {
			          id: 5,
			          image_url:
			            "http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/package_example/tupian.jpg",
			          title: "卡牌名称",
			          text:
			            "2021-02-09",
			        },
			        {
			          id: 6,
			          image_url:
			            "http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/package_example/7.jpg",
			          title: "卡牌名称",
			          text:
			            "2021-02-09",
			        },
			      ],
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
			title : '我收藏的卡牌'
		});
		
		this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
		
		
		//获取收藏的
		
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
						title:'卡包列表没有数据',
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
	onReachBottom: function () {
		
		this.get_product_list();
		
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
		
		
	}
	
}
	
	
</script>

<style>
	
	
	.my_card_title_size{
		padding-left: 22rpx;
		font-size: 32rpx;
		width: 44%;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.my_card_font_size{
		padding-left: 22rpx;
		font-size: 26rpx;
		padding-top: 10rpx;
		color: #7d7d7d;
	}
</style>
<style>
page {
  background-color: #eee;
}
</style>
<style lang="scss" scoped>
.content {
  padding: 10px;
  .cnt {
    padding: 10px;
    .title {
      font-size: 16px;
    }
    .text {
      font-size: 14px;
      margin-top: 5px;
    }
  }
}
</style>
 