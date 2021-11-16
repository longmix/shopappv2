<template>
	<view>
		<!--cms/library/library.wxml-->
		<view class='c-1'>
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/search.png"></image>
			<input placeholder='搜索'> </input>
		</view>
		<view>
		    <scroll-view scroll-x="true" class="tab-h1" scroll-left="scrollLeft">
				<block v-for="(item, index) in types" :key="index">
					<view class="tab-item1 currentTab==item.cataid?'active':''"  :data-cataid="item.cataid" @click="swichNav">{{item.name}}</view>
				</block>   
		    </scroll-view>
			
		    <scroll-view class="a-1" scroll-x="true" scroll-left="scrollLeft">
		        <block v-for="(item01, index1) in typeTree" :key="index1">
					<view class="tab-item currentTab2==item.cataid?'active2':''" :data-cataid="item01.cataid" @click="swichNav2">{{item01.name}}</view>
				</block>         
		    </scroll-view>
			<scroll-view scroll-y class="a-1" scroll-left="scrollLeft" bindscrolltolower="lower" style="height: windowHeight-150px;">
				<block v-for="(item02, index2) in productList" :key="index2">
					<view class="a-2" @click="toLibraryList" :data-productid="item02.productid">
						<image :src="item02.picture"></image>
						<view class="a-3" :data-cataid="item02.cataid">{{item02.name}}</view>
					</view>
				</block>
				
			</scroll-view>
		    
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				toView: 'red',
				scrollTop: 100,
				productList: [],
				types:[],
				typeTree:'',
				page:1,
				searchValue:'',
				currentTab2:0,
				currentTab:'',
			}
		},
		methods: {
			/**
			* 生命周期函数--监听页面加载
			*/
			onLoad: function (options) {
				var that = this;
				
			    uni.getSystemInfo({
			        success(res) {
						console.log(res.model)
			            console.log(res.pixelRatio)
			            console.log(res.windowWidth)
			            console.log(res.windowHeight)
			            console.log(res.language)
			            console.log(res.version)
			            console.log(res.platform)
			            that.windowHeight = res.windowHeight;
						 
			           }
			    })
				  
				//uni.set_option_list_str(null, app.getColor());
				  
				this.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=product_cata_level2',
					method: 'post',
					data: {
						// 'cataid': 'fXiNUPaWV',
						sellerid: that.abotapi.get_sellerid()
					},
					header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
					success: function (res) {
						//--init data 
						var code = res.data.code;
						
						if (code == 1) {
							
							var list = res.data.data;
							
							if(!list){
								return;
							}
							
							that.types = list;
							that.typeTree = list[0].sub_cata;
							that.currType = list[0].cataid;
						
							//首次进入显示商品列表
							that.abotapi.abotRequest({
								url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=product_list',
								method: 'post',
								data: {
									sellerid: that.abotapi.get_sellerid(),
									keyword: that.searchValue ? that.searchValue : '',
									sort: 1,
									page: 1,
									cataid: that.typeTree[0].cataid ? that.typeTree[0].cataid : ''
								},
								header: {
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								success: function (res) {
									var data = res.data.product_list;
									if (data == '') {
										uni.showToast({
											title: '没有更多数据！',
											duration: 2000
										});
									
										that.is_more = false;
											return false;
									}
								  
									that.currentTab2 = that.typeTree[0].cataid;
									that.productList = data;
									that.page = that.page + 1;
									that.is_more = true;
								},
								
								fail: function (e) {
									uni.showToast({
										title: '网络异常！',
										duration: 2000
									});
								},
							}); 
						} 
						else {
							uni.showToast({
								title: res.data.err,
								duration: 2000,
							});
						}
						
						
								
					},
					error: function (e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000,
						});
					},
								
				 });
			},
			/**
			* 生命周期函数--监听页面初次渲染完成
			*/
			onReady: function () {
				
			},
			/**
			* 生命周期函数--监听页面显示
			*/
			onShow: function () {
					  
			},
				  
			/**
			* 生命周期函数--监听页面隐藏
			*/
			onHide: function () {
				  
			},
				  
			/**
			* 生命周期函数--监听页面卸载
			*/
			onUnload: function () {
				  
			},
				  
			/**
			* 页面相关事件处理函数--监听用户下拉动作
			*/
			onPullDownRefresh: function () {
				  
			},
			/**
			* 页面上拉触底事件的处理函数
			*/
			onReachBottom: function () {
					
			},
			// 滚动切换标签样式
			switchTab: function (e) {
				
					console.log('ewewew===', e); 
					var that = this;

					that.currentTab = e.detail.current;
				
				that.checkCor();
			},
					  
			// 点击一级分类
			swichNav: function (e) {
				console.log('一级分类',e)
				var that = this;
				var cataid = e.target.dataset.cataid;
				
				console.log('catid===', cataid, this.currentTab);
				
				if (this.currentTab == cataid) { 
					console.log('111111111111111111111111');
					return false; 
				}
				else {
					that.abotapi.abotRequest({
						url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=product_cata_supplier',
						method: 'post',
						data: {
							sellerid: that.abotapi.get_sellerid(),
							cataid: cataid
							},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: function (res) {
							var code = res.data.code;
							console.log(res.data);
							if (code == 1) {
								var cataList = res.data.data;
								console.log(res.data);
								
								that.typeTree = cataList;
								that.currentTab = cataid;
					
					
								that.swichNav2('', cataList[0].cataid);
							}
							else {
								uni.showToast({
									title: res.data.err,
									duration: 2000,
								});
							}
						},
						error: function (e) {
							uni.showToast({
								title: '网络异常！',
								duration: 2000,
							});
						}
					});
				}
			},
					
			// 点击二级分类
			swichNav2: function (e, cataid2='') {
				console.log('ee==', e, cataid2)
				var that = this;
					
				if (!cataid2){
					var cataid2 = e.target.dataset.cataid;
				}
					
				if (this.currentTab2 == cataid2) { 
					return false; 
				}
				else {
					that.abotapi.abotRequest({
						url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=product_list',
						method: 'post',
						data: {
							sellerid: that.abotapi.get_sellerid(),
							keyword: that.searchValue ? that.searchValue : '',
							sort: 1,
							page: 1,
							cataid: cataid2
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
					success: function (res) {
						var data = res.data.product_list;
						if (data == '') {
							that.currentTab2 = cataid2;
							that.productList = data;
							that.is_more = false;
							  
							return false;
						}
						  
						that.currentTab2 = cataid2;
						that.productList = data;
						that.is_more = true;
						  
						},
					fail: function (e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
							});
						},
					});
				}
			},
			
			
			
				
			//判断当前滚动超过一屏时，设置tab标题滚动条。
			checkCor: function () {
				if (this.currentTab > 4) {
					this.setData({
						scrollLeft: 300
					})
				} 
				else {
					this.setData({
						scrollLeft: 0
					})
				}
			},
			//滑动到底部
			lower:function(e){
				var that = this;
				that.abotapi.abotRequest({
					url: app.globalData.http_server + '/?g=Yanyubao&m=ShopAppWxa&a=product_list',
					method: 'post',
					data: {
						sellerid: app.get_sellerid(),
						// keyword: that.data.searchValue ? that.data.searchValue : '',
						sort: 1,
						page: that.page,
						// cataid: cataid2
						cataid: that.typeTree[0].cataid ? that.typeTree[0].cataid : ''
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function (res) {
						var data = res.data.product_list;
						if (data == '') {
							uni.showToast({
								title: '没有更多数据！',
								duration: 2000
							});
						that.is_more = false;
						return false;
						}
						
						that.productList = that.data.productList.concat(data);
						that.page = that.page + 1;
						that.is_more = true;
					},
					fail: function (e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					},
				});
			},
				
			//跳转列表页
			toLibraryList:function(e){
				var productid = e.currentTarget.dataset.productid
				uni.navigateTo({
					url: '/cms/library/library_list?productid=' + productid,
					})
				}
			}
		}
</script>

<style>
/* cms/library/library.wxss */
.c-1{
  padding: 16rpx 5%;
  margin-bottom: 36rpx;
}
.c-1 input{
  border-radius:100rpx;
  border:1px solid #ccc;
  font-size:28rpx;
  height: 70rpx;
  padding:6rpx 10rpx 0rpx 60rpx;
}

.c-1 image{
  position: relative;
  width:30rpx;
  height:30rpx;
  left:18rpx;
  top:70rpx;
}


.tab-item1{
  margin:0 25rpx;
  display:inline-block;
  font-size:31rpx;
  color:#5AB1AB;
}
.tab-item{margin:0 25rpx;display: inline-block;font-size: 28rpx;}
/* .tab-item.active{color: #4675F9;position: relative;}
.tab-item.active:after{ content: "";display: block;height: 8rpx;width: 52rpx;background: #4675F9;position: absolute; bottom: 0;left: 5rpx;border-radius: 16rpx;} */
.item-ans{ width: 100%;display: flex; flex-grow: row no-wrap;justify-content: space-between; padding: 30rpx;box-sizing: border-box; height: 180rpx;align-items: center;border-bottom: 1px solid #F2F2F2;}
.avatar{width: 100rpx;height: 100rpx;position: relative;padding-right: 30rpx;}
.avatar .img{width: 100%;height: 100%;}
.avatar .doyen{width: 40rpx;height: 40rpx;position: absolute;bottom: -2px;right: 20rpx;}
.expertInfo{font-size: 12px;flex-grow: 2;color: #B0B0B0;line-height: 1.5em;}
.expertInfo .name{font-size: 16px;color:#000;margin-bottom: 6px;}
.askBtn{ width: 120rpx;height: 60rpx;line-height: 60rpx;text-align: center;font-size: 14px; border-radius: 60rpx;border: 1px solid #4675F9; color:#4675F9;}
.tab-content{margin-top: 80rpx;}
.scoll-h{height: 100%;}

.tab-h1{
    height: 84rpx;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    line-height: 80rpx;
    background: #fff; 
    font-size: 16px;
    white-space: nowrap;
}


.tab-h2{
    height: 80rpx;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    line-height: 80rpx;
    background: #eee; 
    font-size: 16px;
    white-space: nowrap;
}



.a-2{
  float:left;
  width:30%;
  text-align:center;
  margin-left:2.5%;
  font-size:22rpx;
  margin-top:50rpx;
  height:250rpx;
}

.a-2 image{
  width:140rpx;
  height:140rpx;
}

.a-3{
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}

.active{
  font-size:28rpx;
  color:#4675F9;
  border-bottom-color:#4675F9;
  border-bottom-style:1px solid;
  border-bottom-width:0px;
  border:1px solid;
  border-top:0px;
  border-left:0px;
  border-right:0px;
}

.active2{
  font-size:28rpx;
  color:#4675F9;
}
</style>
