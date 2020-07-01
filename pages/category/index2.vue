<template>
	<view class="section">
		<!-- 状态栏 -->
		<view v-if="showHeader" class="status" :style="{ position: headerPosition,top:statusTop,opacity: afterHeaderOpacity}"></view>

		<!-- 商品搜索 -->
		<view v-if="1" class="scroll-txt" @tap="goto_search" data-value="">
			<icon type="search" size="14" style="margin: 0px 10rpx 0 0"></icon>
			<text class="scroll-ads">搜索</text>
		</view>


		<!-- 左侧类型 -->
		<scroll-view scroll-y="true" class="left">
			<view v-for="(item,idx) in types" :key="idx" :data-idx='idx' @tap="tapType" :class="[idx == currType ? 'active' : '']"
			 style="font-size:33rpx；">
				{{item.name}}
			</view>
		</scroll-view>

		<!-- 右侧数据 -->
		<scroll-view scroll-y="true" class="right">
			<view>
				<image :src="typeTree_icon" mode="widthFix" style="max-width:95%;" v-if="typeTree_icon"></image>
			</view>

			<view class="typeTree">
				<block v-if="wxa_product_super_list_style == 0">
					<view class="brand" v-for="(data,index) in typeTree" :key="index">
						<navigator :url="'../product/detail?productid=' + data.productid" wx:key="typeId" class="item">
							<image :src="data.picture"></image>
							<text>{{data.name}}</text>
						</navigator>
						<view class="addcart-con">
							<text>￥ {{data.price}}</text>
							<image @tap.prevent="addCart" src="../../static/img/car.png" :data-productid="data.productid"></image>
						</view>
					</view>
				</block>
				<block v-if="wxa_product_super_list_style == 1">
					<view class="logo_info navigator" v-for="(item,index) in typeTree" :key="index" open-type='navigateTo'>

						<navigator style="" :url="'../product/detail?productid=' + item.productid" open-type='navigateTo'>
							<view class="logo_pic" style="margin-top:18rpx;">
								<image :src="item.picture" style="width:100%;" mode="widthFix"></image>
							</view>

							<view class="product_item_right_one_line_one">
								<view class="right_one_line_one_title" style='text-align: left;'>
									<text class="wenzi">{{item.name}}</text>
								</view>
								<view class="brief">
									<view>
										￥{{item.price}}
									</view>
								</view>
								<view class='yueduliang'>
									<text class="rexiao" style="color:red;font-size:30rpx;padding-left:20rpx;">{{item.product_take_score}}</text>
								</view>
							</view>

							<view style="float:right;margin-top: 8rpx;">
								<image style="padding:0 10px;width:36rpx;height:36rpx;" @tap.prevent="addCart" src="../../static/img/car.png"
								 :data-productid="item.productid"></image>
							</view>
						</navigator>

					</view>
					<view style="clear:both"></view>
				</block>
			</view>
		</scroll-view>
		<view class="good_box" :hidden="hide_good_box" :style="{left: bus_x + 'px',top:bus_y + 'px'}"> </view>
	</view>
</template>
<script>
	import util from '@/common/util.js';

	export default {
		data() {
			return {
				// types: null,
				//typeTree: {}, // 数据缓存
				currType: 0,
				// 当前类型
				"types": [],
				typeTree: [],
				hide_good_box: true,
				bus_x: '',
				bus_y: '',
				typeTree_icon: '',
				wxa_product_super_list_style: '',
				wxa_order_super_cata_parentid: '',
				showHeader: true,
				headerPosition: 'fixed',
				headerTop: null,
				statusTop: null,
				afterHeaderOpacity: 1, //不透明度
			}
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}

			this.headerTop = e.scrollTop >= 0 ? null : 0;
			this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
		},
		onLoad: function() {

			var that = this;
			this.abotapi.set_option_list_str(this, this.call_back_set_option);
			this.abotapi.get_shop_info_from_server(function(shop_info_list) {
				uni.setNavigationBarTitle({
					title: shop_info_list.shop_name
				})
			});

			uni.getSystemInfo({
				success(res) {
					var ww = res.windowWidth;
					var hh = res.windowHeight;
					that.abotapi.globalData.ww = ww;
					that.abotapi.globalData.hh = hh;
				}
			})

			this.busPos = {};
			this.busPos['x'] = 234.375; //购物车的位置
			this.busPos['y'] = that.abotapi.globalData.hh - 32;

			// #ifdef APP-PLUS
			this.nVueTitle = uni.getSubNVueById('homeTitleNvue');
			this.nVueTitle.onMessage(res => {
				let type = res.data.type;
				if (type == 'focus') {
					this.toSearch();
				}
			});
			this.showHeader = false;
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif
		},
		onPullDownRefresh: function() {
			console.log('下拉刷新==============')

			var _self = this;

			//_self.onLoad();
			
			

			this.abotapi.set_option_list_str(this, this.call_back_set_option);

			//停止当前页面的下拉刷新
			uni.stopPullDownRefresh();
		},
		methods: {
			call_back_set_option: function(that, cb_params) {
				var that = this;
				that.abotapi.getColor()
				var option_list = cb_params;
				console.log('option_list===', option_list)
				if (!option_list) {
					return;
				}


				that.wxa_product_super_list_style = option_list.wxa_product_super_list_style ? option_list.wxa_product_super_list_style :
					0;
				that.wxa_order_super_cata_parentid = option_list.wxa_order_super_cata_parentid ? option_list.wxa_order_super_cata_parentid :
					0;

				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=product_cata_tree_chart',
					method: 'post',
					data: {
						sellerid: that.abotapi.get_sellerid(),
						cataid: that.wxa_order_super_cata_parentid,
						show_type: 'supercata'
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						var data = res.data;
						if (data.code == 1) {
							var list = res.data.data;

							that.types = data.data.sub_cata_list;
							that.typeTree = data.data.sub_cata_list[0].product_list;
							that.typeTree_icon = data.data.sub_cata_list[0].icon;
							that.currType = 0;
						}

						console.log('lllllllllll', res)

					},
					error: function(e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000,
						});
					},

				});


			},


			tapType: function(e) {
				var that = this;
				var currType = e.currentTarget.dataset.idx;
				console.log(currType);
				that.currType = currType;
				that.typeTree = that.types[currType].product_list ? that.types[currType].product_list : [];
				that.typeTree_icon = that.types[currType].icon;

			},

			// 加载品牌、二级类目数据
			getTypeTree(currType) {
				const me = this,
					_data = me.data;
				if (!_data.typeTree[currType]) {
					request({
						url: ApiList.goodsTypeTree,
						data: {
							typeId: +currType
						},
						success: function(res) {
							_data.typeTree[currType] = res.data.data;
							me.setData({
								typeTree: _data.typeTree,
								typeTree_icon: null,
							});
						}
					});
				}
			},


			addCart: function(e) {
				var that = this;
				var userInfo = that.abotapi.get_user_info();
				if (!userInfo) {
					var last_url = 'switchTab /pages/category/index2';
					that.abotapi.goto_user_login(last_url);
					return;
				}

				var productid = e.currentTarget.dataset.productid;

				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopApp&a=cart_add',
					method: 'post',
					data: {
						amount: 1,
						checkstr: userInfo.checkstr,
						productid: productid,
						sellerid: that.abotapi.get_sellerid(),
						userid: userInfo.userid,
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						uni.showToast({
							title: '添加成功',
						});

						that.abotapi.abotRequest({
							url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=cart_list',
							method: 'post',
							data: {
								userid: userInfo.userid,
								checkstr: userInfo.checkstr,
								page: 1,
								sellerid: that.abotapi.get_sellerid()
							},
							header: {
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							success: function(res) {
								//--init data
								var carts = res.data.data;
								var total_amount = 0;
								if (res.data.code == 1) {
									for (var i = 0; i < carts.length; i++) {
										total_amount += carts[i].amount
									}
									
									/*
									uni.setTabBarBadge({
										index: 2,
										text: total_amount.toString()
									})*/

								} else if (res.data.code == 2) {

								}

								//endInitData
							},
						});

						that.touchOnGoods(that, e);
					},
					fail: function(e) {
						uni.showToast({
							title: '添加失败',
						});
					},
				});
			},

			//调用的方法
			touchOnGoods: function(that, e) {
				if (!this.hide_good_box) return;
				that.finger = {};
				var topPoint = {};
				that.finger['x'] = e.touches["0"].clientX; //点击的位置
				that.finger['y'] = e.touches["0"].clientY;

				if (that.finger['y'] < that.busPos['y']) {
					topPoint['y'] = that.finger['y'] - 150;
				} else {
					topPoint['y'] = that.busPos['y'] - 150;
				}
				topPoint['x'] = Math.abs(that.finger['x'] - that.busPos['x']) / 2;

				if (that.finger['x'] > that.busPos['x']) {
					topPoint['x'] = (that.finger['x'] - that.busPos['x']) / 2 + that.busPos['x'];
				} else { //
					topPoint['x'] = (that.busPos['x'] - that.finger['x']) / 2 + that.finger['x'];
				}
				that.linePos = util.bezier([that.busPos, topPoint, that.finger], 20);
				console.log('bezier_points', that.linePos)
				that.startAnimation(that, e);
			},

			startAnimation: function(that, e) {
				var index = 0,
					bezier_points = that.linePos['bezier_points'];
				that.hide_good_box = false;
				that.bus_x = that.finger['x'];
				that.bus_y = that.finger['y'];

				var len = bezier_points.length;
				index = len
				var i = index - 1;
				that.timer = setInterval(function() {

					if (i > -1) {
						that.bus_x = bezier_points[i]['x'];
						that.bus_y = bezier_points[i]['y'];
						i--;
					}

					if (i < 1) {
						clearInterval(that.timer);
						that.hide_good_box = true;
					}
				}, 15);
			},

			goto_search: function(view) {
				//搜索跳转
				uni.navigateTo({
					url: '/pages/search/search'
				})

			}
		},

	}
</script>
<style lang="scss">
	.section {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
		padding-bottom: 200rpx;
	}

	.left {
		position: absolute;
		left: 0;
		top: 100rpx;
		height: 100%;
		width: 180rpx;
		background: #F6F6F6;
		text-align: center;
		font-size: 28rpx;
		/*  #ifdef  APP-PLUS  */
		top: 130rpx; //覆盖样式
		/*  #endif  */
	}

	.left::before {
		content: "";
		position: absolute;
		background: #dcdcdc;
		right: 0;
		top: 0;
		height: 100%;
	}

	.left view.active {
		background: #FFF;
		position: relative;
		z-index: 2;
	}

	.left view {
		display: block;
		height: 120rpx;
		line-height: 120rpx;
		border-bottom: 0px solid #dcdcdc;
	}

	.right {
		margin-left: 180rpx;
		height: 100%;
		overflow: hidden;
		width: auto;
		background: #fff;
	}

	.right text {
		font-size: 30rpx
	}

	.typeTree {
		padding-top: 20rpx;
		width: 100%
	}

	.typeTree .item {
		text-align: center;
		display: inline-block;
		vertical-align: top;
	}

	.typeTree .brand,
	.typeTree .category {
		flex-wrap: wrap;
		overflow: hidden;
		display: inline-block;
		width: 45%;
		margin-left: 3%;
		margin-bottom: 28rpx;
	}

	.typeTree .title {
		padding: 20rpx 0;
		display: block;
		color: #333;
	}

	.typeTree image {
		width: 200rpx;
		margin: 0 auto;
	}

	.brand image {
		height: 200rpx;
	}

	.typeTree .category image {
		height: 810rpx;
	}

	.typeTree .category {
		padding-bottom: 20rpx;
	}

	.item text {
		padding-bottom: 10rpx;
		display: block;
		height: 100rpx;
		text-overflow: hidden;
		overflow: hidden;
		font-size: 28rpx;
		text-align: left;
		margin: 20rpx auto;
		color: #2a2a2a;
	}

	.addcart-con {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.addcart-con text {
		font-size: 28rpx;
		color: #f00;
	}

	.addcart-con image {
		width: 36rpx;
		height: 36rpx;
	}

	.logo_info {
		margin-left: 18rpx;
		justify-content: center;
		align-items: center;
		margin-top: 4rpx;
		border-radius: 18rpx;
		box-shadow: #EDEDED 2rpx 2rpx 15rpx 5rpx;
		padding: 0rpx 18rpx 0rpx 20rpx;
		background: #fff;
		margin-bottom: 16rpx;
		float: left;
		width: 95%;
	}

	.logo_pic {
		width: 40%;
		float: left;
		overflow: hidden;
		display: flex;
		height: 200rpx;
		justify-content: center;
		align-items: Center;

	}

	.brief {
		font-size: 30rpx;
		color: red;
		display: flex;
	}

	.good_box {
		width: 30rpx;
		height: 30rpx;
		position: fixed;
		border-radius: 50%;
		overflow: hidden;
		left: 50%;
		top: 50%;
		z-index: 99;
		background: #b02c41;
	}

	.product_item_right_one_line_one {
		float: left;
		height: 200rpx;
		padding: 30rpx 10rpx;
		width: 55%;
		display: block;

	}

	.right_one_line_one_title {
		text-align: left;
		height: 80rpx;
		overflow: hidden;
		margin-bottom: 10rpx;
	}

	/* 搜索相关 */
	.scroll-txt {
		text-align: center;
		margin: 10rpx 20rpx;
		border: 20rpx red;
		padding: 12rpx 0 12rpx 0;
		color: #333;
		background: #e6e6e6;
		justify-content: center;
		display: flex;
		align-items: center;
		border-radius: 60rpx;
		height: 50rpx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height); //覆盖样式
		/*  #endif  */
	}

	.scroll-ads {
		text-align: center;
		font-size: 28rpx;
	}

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
	}
</style>
