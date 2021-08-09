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
		<view class="main_body">
			<view :style="{width: card_bg_img_width+'rpx', height: card_bg_img_height+'rpx'}">
				<!-- 背景模糊图片 -->
				<image :src="current_card_detail.cover_img_url"  @load="imageLoad" 
					class="card_detail_border"
					:style="{width: card_bg_img_width+'rpx', height: card_bg_img_height+'rpx'}" ></image>
				<!-- 卡牌封面 -->
				<view :style="{textAlign: 'center', paddingTop: (card_bg_img_height*0.25)+'rpx'}">
					<image :src="current_card_detail.cover_img_url" 
						class="card_detail_image"
						:style="{width: (card_bg_img_width*0.8)+'rpx', height: (card_bg_img_height*0.8)+'rpx'}"></image>
						
				</view>
				<!-- 2021.08.09收藏 -->
				<view style="width: 73rpx;height: 73rpx;padding-right: 6rpx; background-color: #FFFFFF;border-radius: 50%;background: rgb(0, 0, 0,0.7);position: absolute;"
					:style="{top:(card_bg_img_height*0.28)+'rpx', right:(card_bg_img_width*0.13)+'rpx'}">
					<image class="card_detail_schang" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/xingxing.png" 
						v-if="current_card_detail.is_favorite == 1" @tap="set_favorite(0)"></image>
						
					<image class="card_detail_schang" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/xingxing01.png"
					v-if="current_card_detail.is_favorite == 0" @tap="set_favorite(1)"></image>
				</view>
				
				
				
				
				
				<!-- 2021.08.06相机 -->
				<!-- <view style="position: absolute;right: 8%; top: 12%;background-color: #FFFFFF; border-radius: 50%;
		background: rgb(0, 0, 0,0.7);">
					<image class="card_detail_schang" src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/photograph.png"></image>
				</view> -->
				
			</view>
			
			
			
			
			
			<!-- 卡牌信息 -->
			<view class="card_detail_xinxi">
				<h4 class="card_detail_title" style="padding-top: 70rpx;padding-bottom: 15rpx;width: 93%;">{{current_card_detail.card_name}}
				</h4>
				<view style="color: #868686;">
					<!-- 发行时间 -->
					<text id="card_detail_mystr">{{current_card_detail.createtime}}</text>
					<!-- 有多少人收藏 -->
					<view style="float: right;">
						<view>
							<image class="card_detail_xing"
								src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_star2.png">
								{{current_card_detail.favorite_counter}}
							</image>
						</view>
					</view>
					<view>总共{{current_card_detail.faxing_counter}} 还剩{{current_card_detail.kucun_counter}} </view>
					
					<!-- <view style="color: #868686;">{{current_card_detail.brief}}</view> -->
				</view>
				<!-- 所属卡包信息-->
				<h4 class="card_detail_h4" style="padding: 15rpx 0rpx;">所属卡包</h4>
				<view style="display: flex;">
					<view>
						<image :src="current_package_detail.cover_img_url"
							@tap="go_to_card_package(current_package_detail.packageid)"
							class="card_detail_kabaotoxiang"></image>
					</view>

					<view class="card_detail_kabaoxinxi" @tap="go_to_card_package(current_package_detail.packageid)">
						<view class="card_packages_title">{{current_card_detail.package_title}}
						</view>
						<view style="color: #868686;font-size: 22rpx;">
							{{current_card_detail.supplier_name}}
						</view>


					</view>

				</view>



			</view>
			<!-- 其他卡牌 -->
			<view style="height: 590rpx;">
				<h4 class="card_detail_h4" style="padding-left: 20rpx;">同系列卡牌</h4>

				<scroll-view scroll-x="true">
					<view class="slide_cards">
						<view v-for="(current_card_list_item,index) in current_card_list"
							@tap="go_to_card_detail(current_card_list_item.packageid, current_card_list_item.cardid)">
							<view class="slide_cards_pic">
								<view class="card_detail_background">
									<view class="card_detail_title" style="width: 190rpx; ">
										<image :src="current_card_list_item.cover_img_url" mode="aspectFill"
											class="card_detail_img_border"></image>
										<view class="card_detail_kapai_title">{{current_card_list_item.card_name}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>

			</view>

			<!-- 富媒体文本展示卡牌详情 -->
			<view class="description001">
				<view class="content">
					<!-- #ifdef MP-ALIPAY -->
					<rich-text :nodes="card_description"></rich-text>
					<!-- #endif -->
					<!-- #ifndef MP-ALIPAY -->
					<rich-text :nodes="card_description|formatRichText"></rich-text>
					<!-- #endif -->


				</view>

			</view>
		</view>


		<!-- 悬浮 -->
		<view class="card_detail_footer">
			<view class="card_detail_liebiao">
				<!-- 分享 -->
				<image class="card_detail_an"
					src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/fenxiang_1.png"></image>
			</view>
			<view class="card_detail_liebiao">
				<image class="card_detail_an"
				src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/xiangqing.png"></image>
			</view>
			
			<view v-if="current_card_detail.is_buyed == 1">
				<view class="card_detail_liebiao">
					<!-- 2021.08.06赠予 -->
					<image class="card_detail_an"
						src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/basesalessendSet.png"></image>
				</view>
				<view class="card_detail_liebiao">
					<!-- 2021.08.06丢弃 -->
					<image class="card_detail_an"
						src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/tubiao19_fuzhi.png"></image>
				</view>
			</view>
			<view class="card_detail_liebiao">
				<!-- 2021.08.09 列表按钮 -->
				<image class="card_detail_an"
					src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/liebiao.png"></image>
			</view>
			<!-- 2021.08.06购买 -->
			<view class="card_detail_goumai1" v-if="current_card_detail.is_buyed == 0" @tap="test_goto_buy">
				<image class="card_detail_an" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/goumai.png"
				></image>
			</view>
			<!-- 2021.08.06卡牌持有的数量 -->
			<view class="card_detail_goumai2" v-if="current_card_detail.is_buyed == 1">
				<image class="card_detail_items" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/乘.png"
				></image>
				<view style="font-size: 35rpx;padding-top: 20rpx;padding-right: 5rpx;">
					{{current_card_detail.have_counter}}
				</view>
			</view>
		</view>

		

	</view>


</template>

<script>
	import util from '../../common/util.js';

	// #ifdef MP-ALIPAY
	import parseHtml from "../../common/html-parser.js"
	// #endif

	export default {
		data() {
			return {
				current_params_str: '', //网址参数

				current_card_detail: null,
				current_package_detail: null,
				current_cardid: 0,
				current_packageid: 0,
				current_userid: 0,

				card_description: '',
				
				//屏幕的宽度和高度
				windowHeight: 0,
				windowWidth: 0,
				
				card_bg_img_width:'750',
				card_bg_img_height:'100',
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
			
			//========== 获取屏幕的宽度和高度 =====
			/*var system_info = uni.getSystemInfoSync();
			
			console.log('getSystemInfo==>>>system_info==>>>', system_info)
			console.log('getSystemInfo==>>>system_info==>>>', system_info.windowWidth)
			that.windowWidth = system_info.windowWidth;
			that.windowHeight = system_info.windowHeight;*/
			//========== End =============
			

			that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);


			//=== 参数拼接 ====
			this.current_params_str = '';

			for (var key in options) {
				this.current_params_str += key + '=' + options[key] + '&';
			}
			if (this.current_params_str != '') {
				this.current_params_str = this.current_params_str.substr(0, this.current_params_str.length - 1);
			}
			//======== End ============



			that.current_cardid = options.cardid;
			that.current_packageid = options.packageid;
			// that.data.current_card_detail.createTime = that.data.current_card_detail.createtime.substring(0,10);

			console.log('that.current_cardid ===》》 ', that.current_cardid);

			if (!that.current_cardid) {
				uni.showModal({
					title: '没有cardid',
					content: ',',
					showCancel: false
				});

				return;
			}

			// 页面加载默认界面
			that.current_card_detail = {
				'title': ''
			};
			that.current_card_detail.cover_img_url =
				'http://192.168.0.205/yanyubao_server/uploads/2021/08/03/610895dcc87bc.jpg';
			that.current_card_detail.description = '';
			that.current_card_detail.cover_img_url =
				'http://192.168.0.205/yanyubao_server/uploads/2021/08/03/610895dcc87bc.jpg';
			that.current_card_detail.cover_img_url =
				'http://192.168.0.205/yanyubao_server/uploads/2021/08/03/610895dcc87bc.jpg';


			//获取卡牌详情		
			var post_data = {
				sellerid: that.abotapi.globalData.default_sellerid,
				packageid: that.current_packageid,
				cardid: that.current_cardid,

			};

			var userInfo = that.abotapi.get_user_info();
			if (userInfo) {
				post_data.userid = userInfo.userid;
				post_data.checkstr = userInfo.checkstr;
			}

			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_card_detail',
				method: 'post',
				data: post_data,
				success: function(res) {

					if (res.data.code != 1) {
						uni.showToast({
							title: '卡牌列表没有数据',
							duration: 2000,
						});

						return;
					}

					that.current_card_detail = res.data.data;

					console.log('current_card_detail ===>>> ', that.current_card_detail);


					//处理商品详情
					that.card_description = that.current_card_detail.description;


					// #ifdef MP-ALIPAY		

					const filter = that.$options.filters["formatRichText"];
					that.card_description = filter(that.card_description);

					//console.log('that.card_description====>>>>', that.card_description);

					let data001 = that.card_description;
					let newArr = [];
					let arr = parseHtml(data001);
					arr.forEach((item, index) => {
						newArr.push(item);
					});

					//console.log('arr arr arr====>>>>', arr);
					//console.log('newArr newArr newArr====>>>>', newArr);

					that.card_description = newArr;

					// #endif	






				},
				fail: function(e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
				},
			});


			//获取卡包详情
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_package_detail',

				method: 'post',
				data: {
					sellerid: that.abotapi.globalData.default_sellerid,
					packageid: that.current_packageid,
				},
				success: function(res) {

					if (res.data.code != 1) {
						uni.showToast({
							title: '卡包详情没有数据',
							duration: 2000,
						});

						return;
					}

					that.current_package_detail = res.data.data;

					console.log('current_package_detail ===>>> ', that.current_package_detail);


				},
				fail: function(e) {
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
					sellerid: that.abotapi.globalData.default_sellerid,
					packageid: that.current_packageid,
					cardid: that.current_cardid,
				},
				success: function(res) {

					if (res.data.code != 1) {
						uni.showToast({
							title: '卡包详情没有数据',
							duration: 2000,
						});

						return;
					}

					that.current_card_list = res.data.data;

					console.log('current_card_list ===>>> ', that.current_card_list);


				},
				fail: function(e) {
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

			set_favorite: function(value001) {
				var that = this;


				//======= 判断用户是否登录 ============
				var last_url = '/pages/nftcard/card_detail?' + that.current_params_str;

				var userInfo = that.abotapi.get_user_info();
				if (!userInfo) {
					that.abotapi.goto_user_login(last_url);

					return;
				}
				//============= End ================



				//请求服务器接口、收藏卡牌
				var post_data = {
					sellerid: that.abotapi.globalData.default_sellerid,
					packageid: that.current_packageid,
					cardid: that.current_card_detail.cardid,

				};

				var userInfo = that.abotapi.get_user_info();
				if (userInfo) {
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				}


				//添加收藏
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url +
						'/openapi/NftCardData/card_favorite_add',
					method: 'post',
					data: post_data,
					success: function(res) {

						if (res.data.code != 1) {
							uni.showToast({
								title: '操作失败',
								duration: 2000,
							});

							return;
						}

						uni.showToast({
							title: res.data.msg,
							duration: 2000,
						});

						//请求成功之后，修改本地的数据
						that.current_card_detail.is_favorite = value001;

						if (value001 == 1) {
							that.current_card_detail.favorite_counter++;
						} else {
							that.current_card_detail.favorite_counter--;
						}



					},
					fail: function(e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					},
				});



			},




			// set_buyed:function(value002){
			// 	var that = this;

			// 	//请求服务器接口、
			// 	var cardid = that.current_card_detail.cardid;

			// 	//请求成功之后，修改本地的数据
			// 	that.current_card_detail.is_buyed = value002;

			// },




			test_goto_buy: function() {
				var that = this;

				console.log('tgggggggggggggggggg_buy');

				var productid = that.current_card_detail.productid;
				var price = that.current_card_detail.price;
				var extraData = that.current_card_detail.extraData;

				var new_url = '/pages/order/pay?productid=' + productid + '&total=' + price + '&extraData=' +
				extraData;

				uni.navigateTo({
					url: new_url
				})


			},

			go_to_card_package: function(packageid) {
				console.log('packageid===>>>' + packageid);

				uni.navigateTo({
					url: '/pages/nftcard/package_detail?packageid=' + packageid,
				})
			},

			go_to_card_detail: function(packageid, cardid) {
				console.log('packageid===>>>' + packageid);
				console.log('cardid===>>>' + cardid);

				uni.navigateTo({
					url: '/pages/nftcard/card_detail?packageid=' + packageid + '&cardid=' + cardid,
				})
			},
			
			
			
			// 2021.08.09获取卡牌封面的真实宽度
			imageLoad: function (e) {
				var that = this;
				
				//图片的宽度和高度
			    var imgwidth = e.detail.width;
			    var imgheight = e.detail.height;
				
			    //宽高比  
			    var ratio = imgwidth / imgheight;
				
				console.log('imageLoad id===>>> '+e.target.dataset.id +'图片实际大小：');
			    console.log(imgwidth, imgheight)
				
				that.windowWidth = 750;
				
				console.log('窗体的宽度：' + that.windowWidth);
				
			    //计算的高度值  
				that.card_bg_img_width = that.windowWidth;
				that.card_bg_img_height = that.card_bg_img_width / ratio;
				
				
			   
			  },
			
			
			
			


		},
		filters: {
			/**
			 * 处理富文本里的图片宽度自适应
			 * 1.去掉img标签里的style、width、height属性
			 * 2.img标签添加style属性：max-width:100%;height:auto
			 * 3.修改所有style里的width属性为max-width:100%
			 * 4.去掉<br/>标签
			 * @param html
			 * @returns {void|string|*}
			 */
			formatRichText(html) { //控制小程序中图片大小

				let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi,
						'max-width:100%;');
					return match;
				});
				//newContent = newContent.replace(/<br[^>]*\/>/gi, '');

				newContent = newContent.replace(/<p[^>]*>/gi, '<p style="margin:10px;">');

				newContent = newContent.replace(/\<img/gi,
					'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;vertical-align: middle;"'
					);

				newContent = newContent.replace(/<h1[^>]*>/gi, '<h1 class="wxParse-h1">');
				newContent = newContent.replace(/<h2[^>]*>/gi, '<h2 class="wxParse-h2">');

				return newContent;
			}
		}



	}
</script>

<style>
	.card_detail_xing {
		width: 25rpx;
		height: 25rpx;
		/* padding-right: 8rpx; */
	}

	.main_body {
		width: 100%;
		margin-bottom: 200rpx;
		padding-bottom: 200rpx;
	}

	.card_detail_border {
		position:absolute;
		width: 100%;
		filter: blur(15rpx);
	}

	.card_detail_h4 {
		font-size: 30rpx;
		line-height: 60rpx;
		color: #515151;
	}

	.card_detail_image {
		justify-content: center;
		border-radius: 20rpx;
		border: #ffffff solid 1rpx;
		box-shadow: 0rpx 0rpx 20rpx #8a8a8a;
		background-color: #FFFFFF;
	}
/* 收藏按钮 */
	.card_detail_schang {
		width: 56rpx;
		height: 50rpx;
		margin: 13rpx;
	}
	.card_detail_fenxiang {
		width: 50rpx;
		height: 50rpx;
	}
	.card_detail_liebiao {
		background-color: #FFFFFF;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin: 20rpx;
	}

	.card_detail_an {
		width: 40rpx;
		height: 40rpx;
		padding-top: 20rpx;
		padding-left: 20rpx;
	}
	.card_detail_items {
		width: 40rpx;
		height: 40rpx;
		padding-top: 20rpx;
	}
	.card_detail_goumai1{
		width: 80rpx;
		height: 80rpx;
		font-size: 27rpx;
		background: #ff0004;
		border-radius: 100%;
		margin-bottom: 100rpx;
		margin: 20rpx;
	}
	.card_detail_goumai2{
		width: 80rpx;
		height: 80rpx;
		background: #FFFFFF;
		border-radius: 100%;
		color: #000000;
		display: flex;
		margin: 20rpx;
	}
	.card_detail_kabaotoxiang {
		display: flex;
		width: 170rpx;
		height: 130rpx;
		min-height: 140rpx;
		border-radius: 20rpx;
		margin-right: 15rpx;
	}

	.card_detail_kabaoxinxi {
		line-height: 47rpx;
	}


	.card_detail_xinxi {
		padding: 15rpx 20rpx;
		line-height: 55rpx;
	}

	.card_detail_title {
		text-align: center;
		font-size: 37rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.card_packages_title {
		width: 480rpx;
		font-size: 32rpx;
		color: #464646;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.slide_cards {
		display: flex;
	}

	.card_detail_background {
		background: #FFFFFF;
		width: 190rpx;
		height: 340rpx;
		border-radius: 25rpx;
		padding: 15rpx;
		border: #d5d5c9 3rpx solid;
	}

	.slide_cards_pic {
		padding-left: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}

	.card_detail_img_border {
		width: 190rpx;
		height: 295rpx;
		border-radius: 20rpx;
	}

	.card_detail_kapai_title {
		width: 195rpx;
		font-size: 30rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.card_detail_footer {
		position: fixed;
		bottom: 0rpx;
		right: 0rpx;
	}
</style>
