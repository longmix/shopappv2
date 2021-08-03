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
			
		</view>
		<!-- 所属卡包信息 -->
		<view class="card_detail_xinxi">
			<h4 class="card_detail_title" style="padding: 15rpx 0rpx;width: 95%;">{{current_card_detail.card_name}}</h4>
			<view style="color: #868686;">
				<!-- 发行时间 -->
				<text>{{current_card_detail.createtime}}</text>
				<!-- 有多少人收藏 -->
				<view class="card_detail_xihuan">
					<view>{{current_card_detail.favorite_counter}} 人收藏</view>
					<view>我有 {{current_card_detail.have_counter}} 张</view>
				</view>
			</view>
			<!-- 卡牌详情 -->
			<view style="color: #868686;">{{current_card_detail.description}}</view>
			<h4 class="card_detail_h4" style="padding: 15rpx 0rpx;">所属卡包</h4>
			<view style="display: flex;">
				<view>
					<image :src="current_card_detail.cover_img_url"
					@tap="go_to_card_list(current_card_detail.packageid, current_card_detail.cardid)" 
					class="card_detail_kabaotoxiang"></image>
				</view>
				
				<view class="card_detail_kabaoxinxi" 
				@tap="go_to_card_list(current_card_detail.packageid, current_card_detail.cardid)">
					<view class="card_packages_title" style="width: 550rpx;">{{current_card_detail.package_title}}</view>
					<view style="color: #868686;font-size: 35rpx;">
						<text>{{current_card_detail.supplier_name}}</text>
					</view>
					
					<view style="color: #868686;">库存 {{current_card_detail.kucun_counter}}&nbsp;&nbsp;发行 {{current_card_detail.faxing_counter}}</view>
				</view>
				
			</view>
			
			
			
		</view>
			<view>
				<!-- 其他卡牌 -->
				<h4 class="card_detail_h4" style="padding-left: 20rpx;">其他卡牌</h4>
				
				<scroll-view scroll-x="true">
					<view class="slide_cards">
						<view v-for="(current_card_list_item,index) in current_card_list"
						@tap="go_to_card_detail(current_card_list_item.packageid, current_card_list_item.cardid)">
							<view class="slide_cards_pic">
								<view class="card_detail_background">
									<view class="card_detail_title" style="width: 225rpx; ">
										<image :src="current_card_list_item.cover_img_url" mode="aspectFill" class="card_detail_img_border"></image>
										<view class="card_detail_kapai_title">{{current_card_list_item.card_name}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				
			</view>
			<!-- 按钮 -->
			<radio v-if="current_card_detail.is_buyed == 0" disabled="disabled" checked="checked" class="card_detail_radio">已拥有</radio>
			<radio v-else disabled="disabled" class="card_detail_radio">未拥有</radio>
			<view style="float: right; padding: 20rpx;display: flex;">
				<!-- <view @tap="test_goto_buy">购买测试</view> -->
				<button v-if="current_card_detail.is_buyed == 1" type="button" value="购买" style="background: #007AFF;color: #FFFFFF;width: 40%;">购买</button>
				<!-- 收藏 -->
				<image class="card_detail_an" src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_star.png"
				v-if="current_card_detail.is_favorite == 0" @tap="set_favorite(1)"></image>
				<image class="card_detail_an" src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_star2.png" 
				v-if="current_card_detail.is_favorite == 1" @tap="set_favorite(0)"></image>
				<!-- 赠予 -->
				<image class="card_detail_an" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/赠予.png"
				v-if="current_card_detail.is_buyed == 0"></image>
				<!-- 丢弃 -->
				<image class="card_detail_an" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/丢弃 .png"
				v-if="current_card_detail.is_buyed == 0"></image>
				<!-- 分享 -->
				<image class="card_detail_an" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/分 享.png"></image>
			</view>
		</view>
			
			

	</view>
	<!-- <view v-else>数据获取失败</view> -->

</template>

<script>
import util from '../../common/util.js';

export default {
	data() {
		return {
			current_params_str:'',	//网址参数
			
			current_card_detail:null,
			current_package_detail:null,
			current_cardid:0,
			current_packageid:0,
			current_userid:0,
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
			title: '卡牌详情',
		});

		that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);
		
		
		//=== 参数拼接 ====
		this.current_params_str = null;
		
		for(var key in options){
		  this.current_params_str += key+'='+options[key]+'&';
		}			
		if(this.current_params_str){
			this.current_params_str = this.current_params_str.substr(0, this.current_params_str.length-1);
		}
		//======== End ============
		
		

		that.current_cardid = options.cardid;
		that.current_packageid = options.packageid;
		// that.data.current_card_detail.createTime = that.data.current_card_detail.createtime.substring(0,10);
		
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
		    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_card_detail',
		    method: 'post',
		    data: post_data,
			
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
		
		
		
		//获取卡牌列表
		that.abotapi.abotRequest({
		    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_card_list',
			
		    method: 'post',
		    data: {
				sellerid:that.abotapi.globalData.default_sellerid,
				packageid:that.current_packageid,
				cardid:that.current_cardid,
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

			//this.get_product_list();

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
					uni.showToast({
						title: '分享成功！',
						duration: 2000
					});
				},
				fail: function(res) {
					// 分享失败
					uni.showToast({
						title: '分享失败！',
						duration: 2000
					});
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
			},
			
			set_favorite:function(value001){
				var that = this;
				
				
				//======= 判断用户是否登录 ============
				var last_url = '/pages/nftcard/card_detail?'+ that.current_params_str;
				
				var userInfo = that.abotapi.get_user_info();
				if (!userInfo) {
					that.abotapi.goto_user_login(last_url);
				
					return;
				}
				//============= End ================
				
				
				
				
				
				//请求服务器接口、
				var cardid = that.current_card_detail.cardid;
				
				
				
				
				
				//添加收藏
				that.abotapi.abotRequest({
				    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/card_favorite',
					
				    method: 'post',
				    data: {
						sellerid:that.abotapi.globalData.default_sellerid,
						cardid:that.current_cardid,
						userid:that.current_userid,
				    },
				    success: function (res) {
						
						if(res.data.code != 1){
							uni.showToast({
								title:' ',
								duration: 2000,
							});
							
							return;
						}
						else{
							uni.showToast({
								title:'加载成功',
								duration: 2000,
							});
							
							return;
						}
						
						that.current_userid = res.data.data;
						
						console.log('current_userid  ===>>> ', that.current_userid);
						
						
						
						
						
							
							//请求成功之后，修改本地的数据
							that.current_card_detail.is_favorite = value001;
							
						},
						
				    
				    fail: function (e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
				    },
				});
				
				
				
			},	
				
				
				
				
			set_buyed:function(value002){
				var that = this;
				
				//请求服务器接口、
				var cardid = that.current_card_detail.cardid;
				
				//请求成功之后，修改本地的数据
				that.current_card_detail.is_buyed = value002;
				
			},
			
			test_goto_buy:function(){
				var that = this;
				
				console.log('tgggggggggggggggggg_buy');
				
				var productid = that.current_card_detail.productid;
				var price = that.current_card_detail.price;
				var extraData = that.current_card_detail.extraData;
				
				var new_url = '/pages/order/pay?productid='+ productid + '&total='+ price +'&extraData='+extraData;
				
				uni.navigateTo({
					url:new_url
				})
				
				
			},
			
			go_to_card_list:function(packageid, cardid){
				console.log('packageid===>>>' + packageid);
				console.log('cardid===>>>' + cardid);
				
				uni.navigateTo({
					url: '/pages/nftcard/card_list?packageid='+packageid+'&cardid='+cardid,
				})
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
	*{
		font-size: 30rpx;
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
		left: 7%;
		top: 5%;
		height: 450rpx;
		border-radius: 20rpx;
		border: #F0F0F0 solid 1rpx;
		box-shadow: 0rpx 0rpx 20rpx #F0F0F0;
		background-color: #FFFFFF;
	}
	.card_detail_an{
		width: 55rpx;
		height: 55rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	.card_detail_kabaotoxiang{
		display: flex;
		width: 170rpx;
		height: 130rpx;
		min-height: 140rpx;
		border-radius: 20rpx;
		margin-right: 15rpx;
	}
	.card_detail_kabaoxinxi{
		line-height: 47rpx;
	}
	.card_detail_xihuan{
		float: right;
		text-align: right;
	}
	.card_detail_xinxi{
		padding: 15rpx 20rpx;
		line-height: 55rpx;
	}
	.card_detail_title{
		font-size: 37rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.card_packages_title{
		font-size: 30rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.slide_cards{
		display: flex;
	}
	.card_detail_background{
		background: #FFFFFF;
		width: 195rpx;
		height: 350rpx;
		border-radius: 25rpx;
		padding: 15rpx;
		border: #d5d5c9 3rpx solid;
	}
	.slide_cards_pic{
		padding-left: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}
	.card_detail_img_border{
		width: 195rpx;
		height: 305rpx;
		border-radius: 20rpx;
	}
	.card_detail_kapai_title{
		width: 195rpx;
		font-size: 30rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.card_detail_radio{
		float: left;
		padding-left: 20rpx;
	}
</style>
