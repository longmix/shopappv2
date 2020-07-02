<template>
	<view>
		<view v-if="showHeader" class="status" :style="{position:headerPosition,top:statusTop}"></view>
		<view v-if="showHeader" class="header" :style="{position:headerPosition,top:headerTop}">
			<view class="title">购物车</view>
		</view>
		<!-- 占位 -->
		<view v-if="showHeader" class="place"></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="tis" v-if="cart_list.length == 0 ">购物车是空的哦~</view>
			<view class="row" v-else v-for="(item,index) in cart_list" :key="index">
				<!-- 删除按钮 -->
				<view class="menu" @tap.stop="deleteGoods(index)">
					<view class="icon shanchu"></view>
				</view>
				<!-- 商品 -->
				<view class="carrier" :class="[theIndex==index?'open':oldIndex==index?'close':'']" @touchstart="touchStart(index,$event)"
				 @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
					<!-- checkbox -->
					<view class="checkbox-box" @tap="selected(index)">
						<view class="checkbox_lis">
							<view :class="item.selected?'on':''"></view>
						</view>
					</view>
					<!-- 商品信息 -->
					<view class="goods-info" @tap="toGoods(item.productid)">
						<view class="img">
							<image :src="item.picture"></image>
						</view>
						<view class="info">
							<view class="title">{{item.name}}</view>
							<!-- <view class="spec">{{item.spec}}</view> -->
							<view class="price-number">
								<view class="price">￥{{item.price}}</view>
								<view class="number">
									<view class="sub" @tap.stop="sub(index)">
										<view class="icon jian"></view>
									</view>
									<view class="input" @tap.stop="discard">
										<input type="number" v-model="item.amount" @input="sum()" />
									</view>
									<view class="add" @tap.stop="add(index)">
										<view class="icon jia"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 脚部菜单 -->
		<view class="footer" :style="{bottom:footerbottom}">
			<view class="checkbox-box" @tap="allSelect">
				<view class="checkbox">
					<view :class="[isAllselected?'on':'']"></view>
				</view>
				<view class="text">全选</view>
			</view>
			<!-- <view class="delBtn" @tap="deleteList" v-if="selectedList.length>0">删除</view> -->
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{sumPrice}}</view>
				</view>
				<view class="btn" @tap="toConfirmation(selectedList)">结算({{selectedList.length}})</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sumPrice: '0.00',
				headerPosition: "fixed",
				headerTop: null,
				statusTop: null,
				showHeader: true,
				selectedList: [],
				carts: '',
				productid: '',
				footerbottom: '',
				isAllselected: false,
				cart_list: '',
				is_numOK: false,

				//控制滑动效果
				theIndex: null,
				oldIndex: null,
				isStop: false
			}
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
			this.headerTop = e.scrollTop >= 0 ? null : 0;
			this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {
			var that = this;
			this.abotapi.set_option_list_str(null, this.abotapi.getColor());
			that.get_shop_list();

			//兼容H5下结算条位置
			// #ifdef H5
			this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight + 'px';
			// #endif
			// #ifdef APP-PLUS
			this.showHeader = false;
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif
		},
		onShow() {
			var that = this

			setTimeout(function() {
				that.get_shop_list();
			}, 1)
		},
		methods: {
			//获取购物车商品列表
			get_shop_list: function() {
				var that = this;
				var userInfo = this.abotapi.get_user_info();
				if ((!userInfo) || (!userInfo.userid)) {
					uni.redirectTo({
						url: '/pages/login/login',
					})
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});
					return;
				}
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=cart_list',
					method: 'post',
					data: {
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						page: 1,
						sellerid: this.abotapi.get_sellerid()
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						console.log('res', res);
						if (res.data.code == 1) {
							that.cart_list = res.data.data;
						}
						console.log('res', that.cart_list);
						//endInitData
					},
				});
			},


			//加入商品 参数 goods:商品数据
			joinGoods(goods) {
				/*
				 * 这里只是展示一种添加逻辑，模板并没有做从其他页面加入商品到购物车的具体动作，
				 * 在实际应用上，前端并不会直接插入记录到goodsList这一个动作，一般是更新列表和本地列表缓存。
				 * 一般商城购物车的增删改动作是由后端来完成的,
				 * 后端记录后返回前端更新前端缓存
				 */
				let len = this.cart_list.length;
				let isFind = false; //是否找到ID一样的商品
				for (let i = 0; i < len; i++) {
					let row = this.cart_list[i];
					if (row.productid == goods.productid) { //找到商品一样的商品
						this.cart_list[i].amount++; //数量自增
						isFind = true; //找到一样的商品
						break; //跳出循环
					}
				}
				if (!isFind) {
					//没有找到一样的商品，新增一行到购物车商品列表头部
					this.cart_list[i].unshift(goods);
				}
			},
			//控制左滑删除效果-begin
			touchStart(index, event) {
				//多点触控不触发
				if (event.touches.length > 1) {
					this.isStop = true;
					return;
				}
				this.oldIndex = this.theIndex;
				this.theIndex = null;
				//初始坐标
				this.initXY = [event.touches[0].pageX, event.touches[0].pageY];
			},
			touchMove(index, event) {
				//多点触控不触发
				if (event.touches.length > 1) {
					this.isStop = true;
					return;
				}
				let moveX = event.touches[0].pageX - this.initXY[0];
				let moveY = event.touches[0].pageY - this.initXY[1];

				if (this.isStop || Math.abs(moveX) < 5) {
					return;
				}
				if (Math.abs(moveY) > Math.abs(moveX)) {
					// 竖向滑动-不触发左滑效果
					this.isStop = true;
					return;
				}

				if (moveX < 0) {
					this.theIndex = index;
					this.isStop = true;
				} else if (moveX > 0) {
					if (this.theIndex != null && this.oldIndex == this.theIndex) {
						this.oldIndex = index;
						this.theIndex = null;
						this.isStop = true;
						setTimeout(() => {
							this.oldIndex = null;
						}, 150)
					}
				}
			},
			touchEnd(index, $event) {
				//结束禁止触发效果
				this.isStop = false;
			},
			//控制左滑删除效果-end


			//商品跳转
			toGoods(e) {
				// uni.showToast({title: '商品'+e});
				uni.navigateTo({
					url: '/pages/product/detail?productid=' + e
				});
			},
			//跳转确认订单页面
			toConfirmation(e) {

				var toastStr = '';
				// 遍历取出已勾选的cid
				for (var i = 0; i < this.cart_list.length; i++) {
					if (this.cart_list[i].selected) {
						toastStr += this.cart_list[i].productid + ','
					}
				};
				console.log("1111111", toastStr);
				console.log("2222222222");
				var product_list = toastStr.substring(0, toastStr.length - 1);

				var proId = product_list.split(",")
				console.log(product_list);
				console.log(proId);
				if (toastStr.length == 0) {
					uni.showToast({
						title: '请选择要结算的商品！',
						duration: 2000
					});
					return false;
				}

				console.log('encodeURIComponent(JSON.stringify(proId))==', encodeURIComponent(JSON.stringify(proId)));

				//存回data
				uni.navigateTo({
					url: '/pages/order/pay?productid=' + encodeURIComponent(JSON.stringify(proId)),
				})
			},
			//删除商品
			deleteGoods(e) {
				console.log('e', e);
				var that = this;
				var index = parseInt(e);
				var num = that.cart_list[index].amount;
				this.productid = that.cart_list[index].productid;
				uni.showModal({
					title: '提示',
					content: '你确认移除吗',
					success: function(res) {
						console.log('res999', res);
						that.del(index);
					},
					fail: function() {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					}
				});

				this.oldIndex = null;
				this.theIndex = null;
			},


			del: function(index) {
				var that = this;
				var userInfo = this.abotapi.get_user_info();
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=cart_del',
					method: 'post',
					data: {
						productid: this.productid,
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						sellerid: this.abotapi.get_sellerid()
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						console.log('res', res);

						if (res.data.code == 1) {
							// 购物车数据
							that.cart_list.splice(index, 1)
							uni.showToast({
								title: res.data.msg,
								icon: 'success',
								duration: 2000
							});
							that.sum();
						} else {
							uni.showToast({
								title: '操作失败！',
								duration: 2000
							});
						}
					},
				});
			},
			// 全选删除商品
			deleteList() {


				var that = this;
				var index = parseInt(e.currentTarget.dataset.index);
				var num = that.data.carts[index].amount;
				var productid = e.currentTarget.dataset.cartid;
				uni.showModal({
					title: '提示',
					content: '你确认移除吗',
					success: function(res) {
						res.confirm && wx.request({
							url: app.globalData.http_server + '?g=Yanyubao&m=ShopAppWxa&a=cart_del',
							method: 'post',
							data: {
								productid: productid,
								userid: userInfo.userid,
								checkstr: userInfo.checkstr,
								sellerid: app.get_sellerid()
							},
							header: {
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							success: function(res) {
								//--init data
								var data = res.data;
								if (data.code == 1) {
									//that.data.productData.length =0;
									// that.loadProductData();

									// 购物车数据
									var carts = that.data.carts;
									carts.splice(index, 1);
									that.sum();
								} else {
									uni.showToast({
										title: '操作失败！',
										duration: 2000
									});
								}
							},
						});
					},
					fail: function() {
						// fail
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					}
				});



				// let len = this.selectedList.length;
				// while (this.selectedList.length>0)
				// {
				// 	this.deleteGoods(this.selectedList[0]);
				// }
				// this.selectedList = [];
				// this.isAllselected = this.selectedList.length == this.cart_list.length && this.cart_list.length>0;
				// this.sum();
			},
			// 选中商品
			selected(index) {
				console.log('index', index);
				this.cart_list[index].selected = this.cart_list[index].selected ? false : true;
				let i = this.selectedList.indexOf(this.cart_list[index].productid);
				i > -1 ? this.selectedList.splice(i, 1) : this.selectedList.push(this.cart_list[index].productid);
				this.isAllselected = this.selectedList.length == this.cart_list.length;

				console.log("this.selectedList", this.selectedList);

				this.sum();
			},
			//全选
			allSelect() {
				let len = this.cart_list.length;
				let arr = [];
				for (let i = 0; i < len; i++) {
					this.cart_list[i].selected = this.isAllselected ? false : true;
					arr.push(this.cart_list[i].productid);
				}
				this.selectedList = this.isAllselected ? [] : arr;
				this.isAllselected = this.isAllselected || this.cart_list.length == 0 ? false : true;
				console.log('this.isAllselected', this.isAllselected);
				console.log('this.selectedList', this.selectedList);
				this.sum();
			},
			// 减少数量
			sub(e) {
				var userInfo = this.abotapi.get_user_info();
				console.log('e===>>>', e);
				var that = this;
				var index = parseInt(e);
				var num = that.cart_list[index].amount;
				// 如果只有1件了，就不允许再减了
				if (num < 1 || num == 1) {
					this.is_numOK = true;
					uni.showToast({
						title: '已是最小数！',
						duration: 2000
					});
					return;
				} else {
					num--;
				}
				console.log(num);
				var productid = that.cart_list[index].productid;
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=cart_num_change',
					method: 'post',
					data: {
						productid: productid,
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						action: 'dec',
						amount: num,
						sellerid: this.abotapi.get_sellerid()
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {

						console.log('res', res);
						if (res.data.code == 1) {
							that.cart_list[index].amount = num;
							that.sum();
						} else {
							uni.showToast({
								title: '操作失败！',
								duration: 2000
							});
						}
					},
					fail: function() {
						// fail
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					}
				});
			},
			// 增加数量
			add(e) {

				var userInfo = this.abotapi.get_user_info();
				console.log('e===>>>', e);
				var that = this;
				var index = parseInt(e);
				var num = that.cart_list[index].amount;
				// 只有大于一件的时候，才能添加
				if (num > 1 || num == 1) {
					num++;
				}
				console.log(num);
				var productid = that.cart_list[index].productid;
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=cart_num_change',
					method: 'post',
					data: {
						productid: productid,
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						action: 'inc',
						amount: num,
						sellerid: this.abotapi.get_sellerid()
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {

						console.log('res', res);
						if (res.data.code == 1) {
							that.cart_list[index].amount = num;
							that.sum();
						}
					},
					fail: function() {
						// fail
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					}
				});

			},
			// 合计
			sum() {
				var that = this;
				if (that.cart_list || that.cart_list != null) {
					// 计算总金额
					this.sumPrice = 0;
					for (var i = 0; i < that.cart_list.length; i++) {
						if (that.cart_list[i].selected) {
							this.sumPrice = this.sumPrice + (this.cart_list[i].amount * this.cart_list[i].price);
						}
					}
					this.sumPrice = this.sumPrice.toFixed(2);
				}
			}


		}
	}
</script>
<style lang="scss">
	page {
		position: relative;
		background-color: #fff;
	}

	.checkbox-box {
		display: flex;
		align-items: center;

		.checkbox {
			width: 35upx;
			height: 35upx;
			border-radius: 100%;
			border: solid 2upx #f06c7a;
			display: flex;
			justify-content: center;
			align-items: center;

			.on {
				width: 25upx;
				height: 25upx;
				border-radius: 100%;
				background-color: #f06c7a;
			}
		}

		.text {
			font-size: 28upx;
			margin-left: 10upx;
		}
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

	.header {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);

		/*  #endif  */
		.title {
			font-size: 36upx;
		}

	}

	.place {

		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}

	.goods-list {
		width: 100%;
		padding: 20upx 0 120upx 0;

		.tis {
			width: 100%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
		}

		.row {
			width: calc(92%);
			height: calc(22vw + 40upx);
			margin: 20upx auto;

			border-radius: 15upx;
			box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: center;
			position: relative;
			overflow: hidden;
			z-index: 4;
			border: 0;

			.menu {
				.icon {
					color: #fff;
					// font-size: 25upx;
				}

				position: absolute;
				width: 30%;
				height: 100%;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: red;
				color: #fff;
				z-index: 2;
			}

			.carrier {
				@keyframes showMenu {
					0% {
						transform: translateX(0);
					}

					100% {
						transform: translateX(-30%);
					}
				}

				@keyframes closeMenu {
					0% {
						transform: translateX(-30%);
					}

					100% {
						transform: translateX(0);
					}
				}

				&.open {
					animation: showMenu 0.25s linear both;
				}

				&.close {
					animation: closeMenu 0.15s linear both;
				}

				background-color: #fff;

				.checkbox-box {
					padding-left: 20upx;
					flex-shrink: 0;
					height: 22vw;
					margin-right: 20upx;
				}

				position: absolute;
				width: 100%;
				padding: 0 0;
				height: 100%;
				z-index: 3;
				display: flex;
				align-items: center;

				.goods-info {
					width: 100%;
					display: flex;
					padding-right: 20upx;

					.img {
						width: 22vw;
						height: 22vw;
						border-radius: 10upx;
						overflow: hidden;
						flex-shrink: 0;
						margin-right: 10upx;

						image {
							width: 22vw;
							height: 22vw;
						}
					}

					.info {
						width: 100%;
						height: 22vw;
						overflow: hidden;
						display: flex;
						flex-wrap: wrap;
						position: relative;

						.title {
							width: 100%;
							font-size: 28upx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							// text-align: justify;
							overflow: hidden;
						}

						.spec {
							font-size: 20upx;
							background-color: #f3f3f3;
							color: #a7a7a7;
							height: 30upx;
							display: flex;
							align-items: center;
							padding: 0 10upx;
							border-radius: 15upx;
							margin-bottom: 20vw;
						}

						.price-number {
							position: absolute;
							width: 100%;
							bottom: 0upx;
							display: flex;
							justify-content: space-between;
							align-items: flex-end;
							font-size: 28upx;
							height: 60upx;

							.price {}

							.number {
								display: flex;
								justify-content: center;
								align-items: flex-end;

								.input {
									width: 60upx;
									height: 60upx;
									margin: 0 10upx;
									background-color: #f3f3f3;

									input {
										width: 60upx;
										height: 60upx;
										display: flex;
										justify-content: center;
										align-items: center;
										text-align: center;
										font-size: 26upx;
									}
								}

								.sub,
								.add {
									width: 45upx;
									height: 45upx;
									background-color: #f3f3f3;
									border-radius: 5upx;

									.icon {
										font-size: 22upx;
										width: 45upx;
										height: 45upx;
										display: flex;
										justify-content: center;
										align-items: center;

									}
								}
							}
						}
					}
				}
			}
		}
	}

	.footer {
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;

		.delBtn {
			border: solid 1upx #f06c7a;
			color: #f06c7a;
			padding: 0 30upx;
			height: 50upx;
			border-radius: 30upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.settlement {
			width: 60%;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.sum {
				width: 56%;
				font-size: 28upx;
				margin-right: 10upx;
				display: flex;
				justify-content: flex-end;
				
				.money {
					font-weight: 600;
					
				}
			}

			.btn {
				padding: 0 30upx;
				height: 50upx;
				background-color: #f06c7a;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;

				border-radius: 30upx;
			}
		}
	}
</style>

