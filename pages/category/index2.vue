<template>
	<view class="section">
		<!-- 状态栏 -->
		<view v-if="showHeader" class="status" :style="{ position: headerPosition,top:statusTop,opacity: afterHeaderOpacity}"></view>

		<!-- 商品搜索 -->
		<view class="product_sousuo">
			<view class="icon-btn" @click="back_return" 
				v-if="wxa_product_super_list_in_bottom == 0">
				<view class="icon xiangqian before"></view>
			</view>
			<view v-if="1" class="scroll-txt" @tap="goto_search" data-value="">
				<icon type="search" size="14" style="margin: 0px 10rpx 0 0"></icon>
				<text class="scroll-ads">搜索</text>
			</view>
			<view class="icon zhuye before" @click="toindex"></view>
		</view>
		


		<!-- 左侧类型 -->
		<scroll-view scroll-y="true" class="left" :style="{top: app_top + 'rpx'}">
			<view v-for="(item,idx) in types" :key="idx" :data-idx='idx' @tap="tapType" :class="[idx == currType ? 'active' : '']"
			 style="font-size:33rpx；">
				{{item.name}}
			</view>
		</scroll-view>

		<!-- 右侧数据 -->
		<scroll-view scroll-y="true" class="right" @scrolltolower="scroll_view_event">
			<view>
				<image :src="typeTree_icon" mode="widthFix" style="max-width:95%;" v-if="typeTree_icon"></image>
			</view>

			<view class="typeTree">
				<block v-if="wxa_product_super_list_style == 0">
					<view class="brand" v-for="(data,index) in typeTree" :key="index">
						<navigator :url="'../product/detail?productid=' + data.productid" wx:key="typeId" class="product_name_item">
							<image :src="data.picture"></image>
							<view class="product_name">{{data.name}}</view>
						</navigator>
						<view class="addcart-con">
							<text>￥ {{data.price}}</text>
							<image @tap.prevent="addCart" src="../../static/img/car.png" :data-productid="data.productid"></image>
						</view>
					</view>
				</block>
				<block v-if="wxa_product_super_list_style == 1">
					<view class="logo_info navigator" v-for="(item,index) in typeTree" :key="index" open-type='navigate'>

						<navigator style="" :url="'/pages/product/detail?productid=' + item.productid" open-type='navigate'>
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
								
								<view style="float:right;margin-top: -8rpx;">
									<image style="margin-right: 10rpx;width:36rpx;height:36rpx;" src="../../static/img/car.png"
									 :data-productid="item.productid"></image>
								</view>
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
				
				typeTree: [],					//界面上渲染的商品列表
				current_type_tree_data:null,	//当前实际商品列表
				current_type_tree_data_show_page_num:0,	//显示第几页的商品
				current_type_tree_data_show_page_size:10,
				
				hide_good_box: true,
				bus_x: '',
				bus_y: '',
				typeTree_icon: '',
				
				wxa_product_super_list_style: 0,
				wxa_order_super_cata_parentid: 0,
				//2021.1.20. 是否固定在底部导航中
				wxa_product_super_list_in_bottom:0,
				
				showHeader: true,
				headerPosition: 'fixed',
				headerTop: null,
				statusTop: null,
				app_top:'',
				afterHeaderOpacity: 1, //不透明度
				//是否显示返回按钮
				// #ifndef MP
				showBack:true,
				// #endif
			}
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

			uni.getSystemInfo({
			    success: function (res) {
					
			        this.app_top = parseInt(res.statusBarHeight) + 100;
					
			    }
			});
			// #ifdef APP-PLUS
			
			
			
			//this.app_top = 200;
			
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
			
			// #ifdef MP
			//小程序隐藏返回按钮
			this.showBack = false;
			// #endif
		},
		onPullDownRefresh: function() {
			console.log('下拉刷新==============')

			var _self = this;

			//_self.onLoad();
			
			//将缓存的过期时间延长至一个小时之前，以便刷新数据
			var currentTime = (new Date()).getTime();//获取当前时间
			currentTime = 3600 * 1000 - 60*1000;
			uni.setStorageSync("product_cata_tree_chart_time", currentTime);




			this.abotapi.set_option_list_str(this, this.call_back_set_option);

			//停止当前页面的下拉刷新
			uni.stopPullDownRefresh();
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
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			
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

				//商品显示风格， 0： 一行两个  1： 一行一个
				if(option_list.wxa_product_super_list_style && (option_list.wxa_product_super_list_style == 1)){
					that.wxa_product_super_list_style = option_list.wxa_product_super_list_style;
				}
				
				//商品的父分类ID
				if(option_list.wxa_order_super_cata_parentid){
					that.wxa_order_super_cata_parentid = option_list.wxa_order_super_cata_parentid;
				}
					
				//这个页面是否在底部导航栏中
				if(option_list.wxa_product_super_list_in_bottom && (option_list.wxa_product_super_list_in_bottom == 1)){
					that.wxa_product_super_list_in_bottom = option_list.wxa_product_super_list_in_bottom;
				}
				
				
				var currentTime = (new Date()).getTime();//获取当前时间
				if (uni.getStorageSync('product_cata_tree_chart_' + that.abotapi.globalData.default_sellerid) 
					&& (currentTime - uni.getStorageSync("product_cata_tree_chart_time")) < 3600 * 1000) {
				  
					var sub_cata_list = JSON.parse(uni.getStorageSync('product_cata_tree_chart_' + that.abotapi.globalData.default_sellerid));
					
					that.types = sub_cata_list;
					that.currType = 0;
					
					that.__tapType001();
					
					return;
						
				}
				
				
				uni.showToast({
					title: '数据加载中……',
					//icon:'loading'
				});

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
						
						
						uni.hideToast();
						

						if (res.data.code == 1) {
							
							//做数据缓存
							uni.setStorageSync("product_cata_tree_chart_" + that.abotapi.globalData.default_sellerid, 
										JSON.stringify(res.data.data.sub_cata_list));
							var currentTime = (new Date()).getTime();//获取当前时间
							uni.setStorageSync("product_cata_tree_chart_time", currentTime);
							

							that.types = res.data.data.sub_cata_list;
							that.currType = 0;
							
							that.__tapType001();
							
							
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
				
				
				that.__tapType001();
				
				

			},
			
			__tapType001:function(){
				
				var that = this;
				
				var currType = that.currType;
				
				//分类商品列表上方的图标
				that.typeTree_icon = that.types[currType].icon;
				
				that.current_type_tree_data = that.types[currType].product_list ? that.types[currType].product_list : [];
				
				that.current_type_tree_data_show_page_num = 0;
				
				//如果小于0个，直接显示
				if(that.current_type_tree_data && that.current_type_tree_data.length <= that.current_type_tree_data_show_page_size){
					that.typeTree = that.current_type_tree_data;
				}
				//如果大于10个，触底刷新加载更多
				else if(that.current_type_tree_data && that.current_type_tree_data.length > that.current_type_tree_data_show_page_size){
					that.typeTree = that.current_type_tree_data.slice(0, that.current_type_tree_data_show_page_size);
				}
				
			},
			
			
			//右侧滚动控件触底的事件
			scroll_view_event:function(e){
				console.log('scroll_view_event====>>>>', e);
				
				var that = this;
				
				console.log('aaaaaaaaaaaaaaaa onReachBottom ===>>>'+that.current_type_tree_data_show_page_num);
				
				that.current_type_tree_data_show_page_num ++;
				
				var start = that.current_type_tree_data_show_page_num*that.current_type_tree_data_show_page_size;
				var end = (that.current_type_tree_data_show_page_num + 1)*that.current_type_tree_data_show_page_size;
				
				if(start >= that.current_type_tree_data.length){
					console.log('本分类已经全部显示');
					return;
				}
				
				if(end > that.current_type_tree_data.length){
					end = that.current_type_tree_data.length;
				}
				
				var new_list = that.current_type_tree_data.slice(start, end);
				console.log('追加商品队列', new_list);
				
				that.typeTree = that.typeTree.concat( new_list );
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
			//返回上一页
			back_return() {
				uni.navigateBack();
			},
			//跳转到首页
			toindex:function(){
				console.log('toCart 向首页跳转');
				
				this.abotapi.call_h5browser_or_other_goto_url('/pages/index/index');
				
			},
			addCart: function(e) {
				console.log('请求');
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
		top: 180rpx; //覆盖样式
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

	.product_name_item text {
		padding-bottom: 10rpx;
		display: block;
		height: 80rpx;
		line-height: 40rpx;
		text-overflow: hidden;
		overflow: hidden;
		font-size: 28rpx;
		text-align: left;
		margin: 20rpx auto;
		color: #2a2a2a;
	}
	
	.product_name {
		margin: 10rpx 4%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		text-align: justify;
		overflow: hidden;
		font-size: 28rpx;
		height: 80rpx;
		line-height: 40rpx;
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
		width: 89%;
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
		padding: 30rpx 10rpx 10rpx;
		width: 55%;
		display: block;

	}

	.right_one_line_one_title {
		text-align: left;
		overflow: hidden;
		margin-bottom: 10rpx;
		text-overflow: ellipsis;
		
		display: -webkit-box;
		-webkit-line-clamp: 2;  
		-webkit-box-orient: vertical;
	}

	/* 搜索相关 */
	.scroll-txt {
		width: 80%;
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
		//margin-top: var(--status-bar-height); //覆盖样式
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
	.icon-btn{
		width: 60rpx;
		height: 60rpx;
		-webkit-flex-shrink: 0;
		flex-shrink: 0;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		margin-left: 10rpx;
	}
	.before{
		color: #fff;
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 100%;
		margin-right: 5rpx;
		width: 60rpx;
		height: 60rpx;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-size: 42rpx;
	}
	.product_sousuo{
		display: flex;
		height: 100rpx;
		align-items: center;
		/*  #ifdef  APP-PLUS  */
		margin-top:var(--status-bar-height); //覆盖样式
		/*  #endif  */
		
	}
</style>
