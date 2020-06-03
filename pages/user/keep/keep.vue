<template>
	<view>
		<view class="tabr" :style="{top:headerTop}">
			<view :class="{on:typeClass=='goods'}" @tap="switchType('goods')">商品({{collection_products.length}})</view>
			<view :class="{on:typeClass=='shop'}"  @tap="switchType('shop')">店铺({{shopList.length}})</view>
			<view class="border" :class="typeClass"></view>
		</view>
		<view class="place" ></view>
		<view class="list">
			<!-- 商品列表 -->
			<view class="sub-list goods" :class="subState">
				<view class="tis" v-if="collection_products.length==0">没有数据~</view>
				<view class="row" v-for="(row,index) in collection_products" :key="index" >
					<!-- 删除按钮 -->
					<view class="menu" @tap.stop="deleteCollectionProducts(row.favoriteid,collection_products)">
						<view class="icon shanchu"></view>
					</view>
					<!-- content -->
					<view class="carrier" :class="[typeClass=='goods'?theIndex==index?'open':oldIndex==index?'close':'':'']" @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
						<view class="goods-info" @tap="toProduct(row)">
							<view class="img">
								<image :src="row.productInfo.picture"></image>
							</view>
							<view class="info">
								<view class="title">{{row.productInfo.name}}</view>
								<view class="price-number">
									<view class="keep-num">
										<!-- 905人收藏 -->
									</view>
									<view class="price">￥{{row.productInfo.price}}</view>
									
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 店铺列表 -->
			<view class="sub-list shop" :class="subState">
				<view class="tis" v-if="shopList.length==0">没有数据~</view>
				<view class="row" v-for="(row,index) in shopList" :key="index" >
					<!-- 删除按钮 -->
					<view class="menu" @tap.stop="deleteFavorite(row.xianmai_shangid,shopList)">
						<view class="icon shanchu"></view>
					</view>
					<!-- content -->
					<view class="carrier" @tap="toShangDetail(row)" :class="[typeClass=='shop'?theIndex==index?'open':oldIndex==index?'close':'':'']" @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
						<view class="left">
							<image :src="row.img_list[0].picture"></image>
						</view>
						<view class="right">
							<view class="name">
								{{row.name}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>

	export default {
		data() {
			return {
				shopList:[],
				collection_products:[],
				headerTop:0,
				//控制滑动效果
				typeClass:'goods',
				subState:'',
				theIndex:null,
				oldIndex:null,
				isStop:false
			}
		},
		onPageScroll(e){
			
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		onLoad() {
			//兼容H5下排序栏位置
			// #ifdef H5
				//定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
				let Timer = setInterval(()=>{
					let uniHead = document.getElementsByTagName('uni-page-head');
					if(uniHead.length>0){
						this.headerTop = uniHead[0].offsetHeight+'px';
						clearInterval(Timer);//清除定时器
					}
				},1);
			// #endif
			
			this.abotapi.set_option_list_str(this, this.callback_func_set_option_list_str);
			
			
			
		},
		methods: {
			
			callback_func_set_option_list_str:function(that,cb_params){
				that.abotapi.getColor();
				if(!cb_params){
					return;
				}				
				
				this.getCollectionProducts();
				this.getMyFavorite();		
				
			},
			
			getgoods(){
				console.log('getgoods===');
			},
			
			// 获取商品收藏
			getCollectionProducts(){
				var userInfo = this.abotapi.get_user_info();
				this.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=collection_products',
					method: 'post',
					data: {
						userid : userInfo.userid,
						sellerid : this.abotapi.globalData.default_sellerid,
						checkstr : userInfo.checkstr,	
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {					
						if(res.data.code == 1){
							
							this.collection_products = res.data.data;
						
						}else{
							
							this.collection_products = [];
							
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
			
			// 获取店铺收藏
			getMyFavorite(){
				var userInfo = this.abotapi.get_user_info();
				this.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + 'openapi/XianmaiShangData/my_favorite',
					method: 'post',
					data: {
						userid : userInfo.userid,
						sellerid : this.abotapi.globalData.default_sellerid,
						action : 'list',
						checkstr : userInfo.checkstr,	
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						
						if(res.data.code == 1){
							
							this.shopList = res.data.data;
						
						} else {
							this.shopList = [];
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
			
			
			switchType(type){
				if(this.typeClass==type){
					return ;
				}
				
				type=='goods' ? this.getCollectionProducts() : this.getMyFavorite();
				
				uni.pageScrollTo({
					scrollTop:0,
					duration:0
				})
				this.typeClass = type;
				this.subState = this.typeClass==''?'':'show'+type;
				setTimeout(()=>{
					this.oldIndex = null;
					this.theIndex = null;
					this.subState = this.typeClass=='goods'?'':this.subState;
				},200)
			},
			//控制左滑删除效果-begin
			touchStart(index,event){
				//多点触控不触发
				if(event.touches.length>1){
					this.isStop = true;
					return ;
				}
				this.oldIndex = this.theIndex;
				this.theIndex = null;
				//初始坐标
				this.initXY = [event.touches[0].pageX,event.touches[0].pageY];
			},
			touchMove(index,event){
				//多点触控不触发
				if(event.touches.length>1){
					this.isStop = true;
					return ;
				}
				let moveX = event.touches[0].pageX - this.initXY[0];
				let moveY = event.touches[0].pageY - this.initXY[1];
				
				if(this.isStop||Math.abs(moveX)<5){
					return ;
				}
				if (Math.abs(moveY) > Math.abs(moveX)){
					// 竖向滑动-不触发左滑效果
					this.isStop = true;
					return;
				}
				
				if(moveX<0){
					this.theIndex = index;
					this.isStop = true;
				}else if(moveX>0){
					if(this.theIndex!=null&&this.oldIndex==this.theIndex){
						this.oldIndex = index;
						this.theIndex = null;
						this.isStop = true;
						setTimeout(()=>{
							this.oldIndex = null;
						},150)
					}
				}
			},
			
			touchEnd(index,$event){
				//解除禁止触发状态
				this.isStop = false;
			},
			
			//删除商品收藏
			deleteCollectionProducts(favoriteid,List){
				var userInfo = this.abotapi.get_user_info();			
				var favoriteidArr = [];
				favoriteidArr.push(favoriteid);
				
				this.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=del_collect_product',
					method: 'post',
					data: {
						userid : userInfo.userid,
						sellerid : this.abotapi.globalData.default_sellerid,
						checkstr : userInfo.checkstr,	
						favoriteid: encodeURIComponent(JSON.stringify(favoriteidArr))
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {	
						
						console.log('deleteCollectionProducts',res)
						
						if(res.data.code == 1){
							uni.showToast({
								title: res.data.msg,
							})
							this.getCollectionProducts();
						
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
			
			deleteFavorite(xianmai_shangid,List){
				var userInfo = this.abotapi.get_user_info();
				this.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + 'openapi/XianmaiShangData/my_favorite',
					method: 'post',
					data: {
						userid: userInfo.userid,
						sellerid: this.abotapi.globalData.default_sellerid,
						action: 'del',
						checkstr: userInfo.checkstr,
						xianmaishangid: xianmai_shangid,
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						console.log('that.index_list', res);
				
						if (res.data.code == 1) {
							uni.showToast({
								title: res.data.msg,
							})
							this.getMyFavorite();
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
			
			toProduct(productItem){
				var productid = productItem.productid;
				uni.navigateTo({
					url: '/pages/product/detail?productid='+productid
				});
			},
			
			//实体商家跳转
			toShangDetail(shopItem) {
				var shangid = shopItem.xianmai_shangid;
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetail?shangid='+shangid
				});
			},
			
			discard() {
				//丢弃
			}
			
			
		}
	}
</script>
<style lang="scss">
	view{
		display: flex;
		flex-wrap: wrap;
		
	}
	page{position: relative;background-color: #f5f5f5;}

	.hidden{
		display: none !important;
	}
	.place{
		width: 100%;
		height: 95upx;
	}
	.tabr{
		background-color: #fff;
		width: 94%;
		height: 95upx;
		padding: 0 3%;
		border-bottom: solid 1upx #dedede;
		position: fixed;
		top: 0;
		z-index: 10;
		view{
			width: 50%;
			height: 90upx;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
			color: #999;
		}
		.on{
			color: #f06c7a;
		}
		.border{
			height: 4upx;
			background-color: #f06c7a;
			transition: all .3s ease-out;
			&.shop{
				transform: translate3d(100%,0,0);
			}
		}
		
	}
	.list{
		width: 100%;
		display: block;
		position: relative;
	}
	@keyframes showGoods {
		0% {transform: translateX(-100%);}100% {transform: translateX(0);}
	}
	@keyframes showShop {
		0% {transform: translateX(0);}100% {transform: translateX(-100%);}
	}
	.sub-list{
		&.shop{
			position: absolute;
			top: 0;
			left:100%;
			display: none;
		}
		&.showgoods{
			display: flex;
			animation: showGoods 0.20s linear both;
		}
		&.showshop{
			display: flex;
			animation: showShop 0.20s linear both;
		}
		width: 100%;
		padding: 20upx 0 120upx 0;
		.tis{
			width: 100%;
			height: 60upx;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
		}
		&.shop{
			.row{
				height: 20vw;
				.left{
					width: 20vw;
					height: 20vw;
					padding-left: 20upx;
					align-items: center;
					image{
						width: 18vw;
						height: 18vw;
						border-radius: 100%;
					}
				}
				.right{
					height: 20vw;
					align-items: center;
					font-size: 32upx;
				}
			}
		}
		.row{
			width: 100%;
			height: 30vw; 
			align-items: center;
			position: relative;
			overflow: hidden;
			border-bottom: solid 1upx #dedede;
			.menu{
				.icon{
					color: #fff;
					font-size:50upx;
				}
				position: absolute;
				width: 28%;
				height: 100%;
				right: 0;
				justify-content: center;
				align-items: center;
				background-color: red;
				color: #fff;
				z-index: 2;
			}
			
			.carrier{
				@keyframes showMenu {
					0% {transform: translateX(0);}100% {transform: translateX(-28%);}
				}
				@keyframes closeMenu {
					0% {transform: translateX(-28%);}100% {transform: translateX(0);}
				}
				&.open{
					animation: showMenu 0.25s linear both;
				}
				&.close{
					animation: closeMenu 0.15s linear both;
				}
				background-color: #fff;

				position: absolute;
				width: 100%;
				padding: 0 0;
				height: 100%;
				z-index: 3;
				flex-wrap: nowrap;
				.goods-info{
					width: calc(100% - 40upx);
					padding: 20upx;
					flex-wrap: nowrap;
					.img{
						width: calc(30vw - 40upx);
						height: calc(30vw - 40upx);
						border-radius: 10upx;
						overflow: hidden;
						flex-shrink: 0;
						margin-right: 20upx;
						image{
							width: calc(30vw - 40upx);
							height: calc(30vw - 40upx);
						}
					}
					.info{
						width: 100%;
						height: calc(30vw - 40upx);
						overflow: hidden;
						flex-wrap: wrap;
						align-content: space-between;
						position: relative;
						.title{
							width: 100%;
							font-size: 28upx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
						
						.price-number{
							width: 100%;
							justify-content: space-between;
							align-items: baseline;
							
							.keep-num{
								font-size: 26upx;
								color: #999;
							}
							.price{
								font-size: 30upx;
								color: #f06c7a;
							}
						}
					}
				}
			}

		}
	}
	
</style>
