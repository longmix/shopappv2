<template>
	<view>
		<!-- 状态栏 -->
		<view class="status" :style="{position:headerPosition}"></view>
        <view class="header" :style="{position:headerPosition}">
			<view class="addr"><view class="icon location"></view>{{city}}</view>
			<view class="input-box">
				<input placeholder="默认关键字" placeholder-style="color:#c0c0c0;" @tap="toSearch()"/>
				<view class="icon search"></view>
			</view>
			<view class="icon-btn">
				<view class="icon tongzhi" @tap="toMsg"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<view class="category-list">
			<!-- 左侧分类导航 -->
			<scroll-view  scroll-y="true" class="left" >
                <view class="row" v-for="(item,index) in categoryList" :key="item.cataid" @click="tapType(item.cataid)" > <!-- :class="[index==showCategoryIndex?'on':'']" @tap="showCategory(index)"  -->
					<view class="text">
						<view class="block"></view>
						{{item.name}}
					</view>
				</view>
				
            </scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view  scroll-y="true" class="right" >
			    <view class="category" v-for="(item2,index) in cataList" :key="item2.cataid" @click="toCategory(item2.cataid)"> <!--  v-show="index==showCategoryIndex" -->
					<view class="banner" >
						<image :src="item2.icon"></image>
					</view>
					<view class="list">
						<view class="box">
							<!-- <image :src="item.icon"></image> -->
							<view class="text">{{item2.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	//高德SDK
	import amap from '@/common/SDK/amap-wx.js';
	// var app = getApp();
	// var abotapi = require("../../../common/abotapi.js");
	export default {
		data() {
			return {
				showCategoryIndex:0,
				headerPosition:"fixed",
				city:"北京",
				//分类列表
				categoryList:'',
				cataList:'',
				// typeTree:{},
				currType:0,
				"types":[],
				typeTree:[]
			}
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		onLoad() {
			
			this.abotapi.set_option_list_str(null, this.abotapi.getColor());
			
			this.amapPlugin = new amap.AMapWX({  
				//高德地图KEY，随时失效，请务必替换为自己的KEY，参考：http://ask.dcloud.net.cn/article/35070
				key: '7c235a9ac4e25e482614c6b8eac6fd8e'  
			});
			//定位地址
			this.amapPlugin.getRegeo({  
				success: (data) => {
					this.city = data[0].regeocodeData.addressComponent.city.replace(/市/g,'');//把"市"去掉
				}  
			});
			var that = this;
			uni.request({
				url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=product_cata_level2',
				method:'post',
				data: {
				 // 'cataid': 'fXiNUPaWV',
				  sellerid: this.abotapi.globalData.default_sellerid
				},
				header: {
					'Content-Type':  'application/x-www-form-urlencoded'
				},
				success: function (res) {
					if(res.data.code == 1) { 
						// var that = this;
						that.categoryList = res.data.data;
						console.log("categoryList",that.categoryList);
						// var typeTree = that.categoryList[0].sub_cata;
						var Goods_cataid = that.categoryList[0].cataid;
                        that.currType = Goods_cataid;
						console.log("that.currType",that.currType);
						
						that.get_cataList();
						
						
						
					} else {
						uni.showToast({
							title:res.data.err,
							duration:2000,
						});
					}    
				},
				error:function(e){
					uni.showToast({
						title:'网络异常！',
						duration:2000,
					});
				},
	
			});
			
			// that.tapType();
			
			
			
		},
		methods: {
			callback_function:function(that, cb_params){
				console.log('cb_params====',cb_params)
			},
			
			//消息列表
			toMsg(){
				uni.navigateTo({
					url:'../../msg/msg'
				})
			},
			
			get_cataList:function(){
				var that = this;
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=product_cata_supplier',
					method:'post',
					data: {
					  sellerid: this.abotapi.globalData.default_sellerid,
					  cataid: that.currType
					  },
					header: {
						'Content-Type':  'application/x-www-form-urlencoded'
					},
					success: function (res) {
						// var code = res.data.code;
						console.log(res.data);
						if(res.data.code==1) { 
							that.cataList = res.data.data;
							console.log("cataList",that.cataList);
							console.log(res.data);
							
						} else {
							uni.showToast({
								title:res.data.err,
								duration:2000,
							});
						}
					},
					error:function(e){
						uni.showToast({
							title:'网络异常！',
							duration:2000,
						});
					}
				});
			},
			
			
			//分类切换显示
			showCategory(index){
				this.showCategoryIndex = index;
			},
			toCategory(e){
				console.log('e',e);
				// uni.setStorageSync('catName',e.name);
				uni.navigateTo({
					url: '/pages/goods/goods-list/goods-list?cataid='+e
				});
			},
			//搜索跳转
			toSearch(){
				uni.showToast({title: "建议跳转到新页面做搜索功能"});
			},
			
			tapType: function (e){
				console.log('e',e);
				var that = this;
				that.currType = e;
				console.log(that.currType);
				
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=product_cata_supplier',
					method:'post',
					data: {
					  sellerid: this.abotapi.globalData.default_sellerid,
					  cataid:that.currType
					  },
					header: {
						'Content-Type':  'application/x-www-form-urlencoded'
					},
					success: function (res) {
						// var code = res.data.code;
						console.log(res.data);
						if(res.data.code==1) { 
							that.cataList = res.data.data;
							console.log("cataList",that.cataList);
							console.log(res.data);
							
						} else {
							uni.showToast({
								title:res.data.err,
								duration:2000,
							});
						}
					},
					error:function(e){
						uni.showToast({
							title:'网络异常！',
							duration:2000,
						});
					}
				});
			},
			// 加载品牌、二级类目数据
			// getTypeTree (currType) {
			// 	const me = this, _data = me.data;
			// 	if(!_data.typeTree[currType]){
			// 		request({
			// 			url: ApiList.goodsTypeTree,
			// 			data: {typeId: +currType},
			// 			success: function (res) {
			// 				_data.typeTree[currType] = res.data.data;
			// 				me.setData({
			// 					typeTree: _data.typeTree
			// 				});
			// 			}
			// 		});
			// 	}
			// }
		}
	}
</script>
<style lang="scss">

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);//覆盖样式
		/*  #endif  */
		
	}

	.header{
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
		
		.addr{
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;
			.icon{
				height: 60upx; 
				margin-right: 5upx;
				display: flex;
				align-items: center;
				font-size: 42upx;
				color: #ffc50a;
			}
		}
		.input-box{
			width: 100%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;
			.icon{
				display: flex;
				align-items: center;
				position: absolute;
				top:0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}
			input{
				padding-left: 28upx;
				height: 28upx;
				font-size: 28upx;
			}
		}
		.icon-btn{
			width: 60upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			.icon{
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42upx;
			}
		}
	}
	.place{
		
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.category-list{
		width: 100%;
		background-color: #fff;
		display: flex;
		.left,.right{
			position: absolute;
			
			top: 100upx;
			/*  #ifdef  APP-PLUS  */
			top: calc(100upx + var(--status-bar-height));
			/*  #endif  */
			bottom: 0upx;
		}
		.left{
			width: 24%;
			left: 0upx;
			background-color: #f2f2f2;
			.row{
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;
				.text{
					width: 100%;
					position: relative;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					color: #3c3c3c;
					.block{
						position: absolute;
						width: 0upx;
						left: 0;
					}
				}
				&.on{
					height: 100upx;
					background-color: #fff;
					.text{
						font-size: 30upx;
						font-weight: 600;
						color: #2d2d2d;
						.block{
							width: 10upx;
							height: 80%;
							top: 10%;
							background-color: #f06c7a;
						}
					}
				}
			}
		}
		.right{
		   width: 76%;
			left: 24%;
			.category{
				width: 42%;
				padding: 20upx 3%;
				float: left;
				.banner{
					width: 100%;
					height: 24.262vw;
					border-radius: 10upx;
					overflow: hidden;
					box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.3);
					image{
						width: 100%;
						height: 24.262vw;
					}
				}
				.list{
					margin-top: 40upx;
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					margin-left: 26upx;
					.box{
						width: calc(71.44vw / 3);
						margin-bottom: 30upx;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-wrap: wrap;
						image{
							width: 60%;
							height: calc(71.44vw / 3 * 0.6);
						}
						.text{
							margin-top: 5upx;
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 26upx;
						}
					}
				}
			}
		}
	}

</style>
