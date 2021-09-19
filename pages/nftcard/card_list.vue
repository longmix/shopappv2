<template>
	<view class="card_background">
		<!-- 智能排序 -->
		<picker @change="bindPickerChange" :value="index" :range="array" style="padding: 20rpx;">
			<view class="card_list_picker">
				{{array[index]}}
				<image src="https://yanyubao.tseo.cn/Tpl/static/nft_card/drop_down.png"
					mode="widthFix" style="width: 30rpx;">
				</image>
			</view>
		</picker>
		<view style="display: flex;flex-wrap: wrap;">
			<view v-for="(current_card_item, index) in current_card_list" 
				:key="index"
				@tap="go_to_detail(current_card_item.packageid, current_card_item.cardid)">
				<view style="padding: 15rpx;">
					<view class="card_list_background_color">
						<!-- 卡牌 -->
						<view class="card_detail_kapai_borderwidth">
							<image :src="current_card_item.cover_img_url" 
								class="card_detail_kapai_imgwidth">
							</image>
						</view>
						<!-- 卡牌名称 -->
						<view class="card_list_title" style="width: 260rpx;">
							{{current_card_item.card_name}}
						</view>
						<!-- 收藏人数 -->
						<view class="card_list_right">
							<image src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_star2.png" 
								class="card_list_images">
							</image>
							{{current_card_item.favorite_counter}}
						</view>
						
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
			array:['智能排序','按时间排序','按热度排序'],
			index:0,
			current_card_list:null,
			current_packageid:0
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
			title : '卡牌列表'
		});
		
		that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);
		
		
		that.current_packageid = options.packageid;
		
		console.log('that.current_packageid ===》》 ', that.current_packageid);
		
		if(!that.current_packageid){
			uni.showModal({
				title:'没有packageid',
				content:',',
				showCancel:false
			});
			
			return;
		}
		
		that.__nft_get_card_list();
		//获取卡牌列表
		
		
		
		
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
		this.__nft_get_card_list();
		
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom: function () {
		
		this.__nft_get_card_list();
		
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
		
		__nft_get_card_list:function(){
			that.abotapi.abotRequest({
			    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_card_list',
			    method: 'post',
			    data: {
					sellerid:that.abotapi.globalData.default_sellerid,
					page:1,
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
				
				
				//下拉框
				bindPickerChange :function (e) {		//改变的事件名
					//console.log('picker发送选择改变，携带值为', e.target.value)   //用于输出改变索引值
					this.index = e.target.value			//将数组改变索引赋给定义的index变量
					this.jg=this.array[this.index]		//将array【改变索引】的值赋给定义的jg变量
					console.log(this.jg)		//输出获取的值
				},
				
				
			});
			
		},
		
		
		go_to_detail:function(packageid, cardid){
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
	.card_background{
		margin: 0rpx;
		padding: 0rpx;
	}
	.card_list_picker{
		width: 175rpx;
		padding: 10rpx;
		padding-left: 20rpx; 
		background-color: #FFFFFF;
		border-radius: 30rpx;
		border: 1rpx solid #dedede;
	}
	.card_list_picker_image{
		padding-top: 5rpx;
		padding-left: 5rpx;
	}
	.card_list_background_color{
		background: #FFFFFF;
		width: 280rpx;
		height: 480rpx;
		border-radius: 25rpx;
		padding: 25rpx;
		border: #d5d5c9 3rpx solid;
	}
	.card_detail_kapai_borderwidth{
		width: 280rpx;
		height: 400rpx;
		overflow: hidden;
		border-radius: 25rpx;
	}
	.card_detail_kapai_imgwidth{
		width: 550rpx;
		height: 400rpx;
		right: 50%;
	}
	.card_list_title{
		font-size: 30rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-left: 15rpx;
	}
	.card_list_right{
		text-align: right;
		padding-right: 15rpx;
		font-size: 25rpx;
		color: #8F8F8F;
		line-height: 45rpx;
	}
	.card_list_images{
		width: 25rpx;
		height: 25rpx;
		padding-top: 15rpx;
	}
</style>

 