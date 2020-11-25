<template>
	<view>
		<view class="search df">
			<input class="df_1" placeholder="请输入你要搜索的内容" :value="searchValue" confirm-type="search" :style="'border:2rpx solid' + wxa_shop_nav_bg_color +';'" @input="searchValueInput($event)" :focus="focus"  @confirm="doSearch($event)"/><!--  -->
			<button @tap="doSearch"><image class="searchcion" src="../../static/img/search.png" style="width: 35rpx;height:35rpx;"></image></button>
		</view>
		<view class="cont" v-if="hotKeyShow">
			<text class="font_14">热门搜索</text>
			<view class="w100">
				<button v-for="(itema,index) in hotKeyList" @tap="doKeySearch" :key="index" :data-key="itema">{{itema}}</button>
			</view>
			<text class="font_14">历史搜索</text>
			<view class="w100">
				<button v-for="(item2,index) in historyKeyList" @tap="doKeySearch" :key="index" :data-key="item2">{{item2}}</button>
			</view>
		</view>
	 
		<view class="list">
	
			<block v-if="wxa_product_list_style == 1">
				<view class="">
	    
					<navigator  class="logo_info navigator" :url="'/pages/product/detail?productid='+item.productid" v-for="(item,index) in shopList" :key="index"  :data-productid="item.productid" style="margin:10px;">
						<view class="logo_pic" style="margin-top:18rpx;">
							<image :src="item.picture" style="width:180rpx;height:180rpx;"></image>
						</view>
		
						<view style="width:70%;float:right;height:220rpx;padding-top: 30rpx;">
							<view class="titles wenzi" style="text-align: left;font-weight:400;font-size:18px;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">{{item.name}}</view>
							<view class="brief">
								<view style="color:gray;font-size:26rpx;">
									<!-- {{item.seller_name}} -->
								</view>
					
								<view v-if="item.price2 > 0" style="color:red;">¥ {{item.price}} {{item.product_take_score}}</view>
							</view>
							<view class='yueduliang'>
								<text class="rexiao" style="color:gray;font-size:30rpx;">已有{{item.sale_volume}}人购买</text>
							</view>
						</view>
						<view style="clear:both"></view>
					</navigator>
	      
				</view>
			</block>
	
	
	
			<block  v-if="wxa_product_list_style != 1" v-for="(items,index) in shopList" :key="index"  :data-productid="items.productid">
				<view class="ban">
					<navigator :url="'/pages/product/detail?productid='+items.productid" class="cover flex-wrp">
						<image class="banner" :src="items.picture" mode="widthFix"></image>
						<view class="act-item ellipsis">
							<text class="type">{{items.name}}</text>
						</view>
						<view class="act-item ellipsis">
							<!-- <text class="kkk">{{items.seller_name}}</text> -->
						</view>
						<view class="act-item ellipsis" >
							<text style="color:red">¥ {{items.price}} {{items.product_take_score}}</text>
						</view>
						<view class="act-item ellipsis" >
							<text style="color:#999999;font-size:25rpx">已有{{items.sale_volume}}人购买</text>
						</view>
					</navigator>
				</view> 
				<view class="commodity_screen" @tap="hideModal" v-if="showModalStatus">fsaffffff</view>
				<view :animation="animationData" class="commodity_attr_box" v-if="showModalStatus"></view> 
			</block>
			<view class="clear mt10" @tap="searchProductData" v-if="is_more">点击查看更多</view>    
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				current: 0,
				shopList: [],
				ptype:'',
				title:'延誉',
				page:1,
				catId:0,
				brandId: 0,
				focus: false,
				hotKeyShow: true,
				historyKeyShow: true,
				searchValue: '',
				historyKeyList: [],
				hotKeyList: [],
				is_more: true,
				content:'',
				showModalStatus:false,
				wxa_product_list_style:'',
				wxa_shop_nav_bg_color:'',
			}
		},
		
		
		onLoad: function (options) {
			var that = this;
			console.log('11',options);
			
			this.abotapi.set_option_list_str(that, function(that002, option_list){
				that.abotapi.getColor();
				
				if (option_list.wxa_product_list_style) {
					that.wxa_product_list_style = option_list.wxa_product_list_style
				}
				if (option_list.wxa_shop_nav_bg_color) {
				
					that.wxa_shop_nav_bg_color = option_list.wxa_shop_nav_bg_color;
					that.wxa_shop_nav_font_color = option_list.wxa_shop_nav_font_color;
				
				}
				
			});
			
			var objectId = options.title;
			//更改头部标题
			// uni.setNavigationBarTitle({
			// 	title: objectId,
		 //    });
		
		    //页面初始化 options为页面跳转所带来的参数
		    var cataid = options.cataid;
		    console.log('cataid',cataid);
			that.cataid = cataid
		    if (cataid){
		        that.hotKeyShow = false
		        that.historyKeyShow = false
				//ajax请求数据
				that.searchProductData();
		    }else{
		        that.is_more = false
		    }
		 
			console.log('nnnnnn', that.cataid)
		   
		
			var historyKeyList = uni.getStorageSync('historyKeyList_cache');
		
			that.historyKeyList = historyKeyList ? historyKeyList : []
		
			console.log('56565', that.historyKeyList)
		
			uni.request({
				url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppH5&a=get_shop_option',
				method: 'post',
				data: {
					sellerid: this.abotapi.get_sellerid(),
					keyword: that.searchValue,
					sort: 1,
					page: that.page,
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: function (res) {
					console.log('sssss', res)
					var hotKeyList = res.data.hot_keywords
					that.hotKeyList = hotKeyList
				},
				fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
				},
			});
		
		},
		onReady: function () {
			// 页面渲染完成
		},
		onShow: function () {
			//var option_list_str = uni.getStorageSync("option_list_str");
		
		    //console.log("获取商城选项数据：" + option_list_str + '333333333');
		},
		onHide: function () {
			// 页面隐藏
		},
		onUnload: function () {
			// 页面关闭
		},
		
		methods: {
			callback_func_for_shop_info:function(shop_info){
				var shop_name = shop_info.shop_name;
				
				uni.setNavigationBarTitle({
					title:shop_name
				})
				
			},
			
			
			//获取用户输入的搜索值
			searchValueInput: function (e) {
				console.log('e',e);
				var that = this;
			    var value = e.detail.value;
				that.searchValue = value,
				that.page = 1
			    if (!value && this.shopList.length == 0) {
					that.hotKeyShow = true;
			        that.historyKeyShow = true;
			    }
			},
			doSearch: function (e) {
				console.log('e1',e);
				var that = this;
			    var searchKey = that.searchValue;
			
			    var historyKeyList = that.historyKeyList;
			    this.remove(searchKey);
			    historyKeyList.unshift(searchKey);
			    uni.setStorageSync('historyKeyList_cache', historyKeyList)
			    console.log('dddddd', searchKey);
			
			    if (!searchKey) {
					that.focus = true;
			        that.hotKeyShow = true;
			        that.historyKeyShow = true;
					return;
			    };
			
				that.hotKeyShow = false;
				that.historyKeyShow = false;
				that.shopList.length = 0;
				that.searchProductData();
			},
			
			searchProductData: function () {
			
			    var that = this;
			    console.log('66666666666', that.cataid)
			    uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=product_list',
					method: 'post',
					data: {
						sellerid: this.abotapi.get_sellerid(),
						keyword: that.searchValue ? that.searchValue : '',
						sort: 1,
						page: that.page,
						cataid: that.cataid ? that.cataid : ''
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
						that.shopList = that.shopList.concat(data)
						that.page = that.page + 1
						that.is_more = true
					},
					fail: function (e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					},
			    });
			},
			
			
			
			showModal: function () {
			    // 显示遮罩层
			    var animation = uni.createAnimation({
					duration: 200,
					timingFunction: "linear",
					delay: 0
			    })
			    this.animation = animation
			    animation.translateY(300).step()
				this.animationData = animation.export();
				this.showModalStatus = true
			    setTimeout(function () {
					animation.translateY(0).step()
			        animationData: animation.export()
				}.bind(this), 200)
			},
			
			hideModal: function () {
				// 隐藏遮罩层
				var animation = uni.createAnimation({
					duration: 200,
					timingFunction: "linear",
					delay: 0
				})
				this.animation = animation
				animation.translateY(300).step()
				this.animationData = animation.export()
				setTimeout(function () {
					animation.translateY(0).step()
					this.animationData = animation.export()
					this.showModalStatus = false
				}.bind(this), 200)
			},
			
			//删除指定元素
			remove: function (e) {
				var index = this.historyKeyList.indexOf(e);
			    if (index > -1) {
					this.historyKeyList.splice(index, 1);
				}
			},
			
			
			doKeySearch: function (e) {
				var that = this;
			    var key = e.currentTarget.dataset.key;
			
			    // var historyKeyList = that.historyKeyList;
			    this.remove(key);
			    that.historyKeyList.unshift(key);
			    uni.setStorageSync('historyKeyList_cache', that.historyKeyList)
			
				that.searchValue = key;
				that.hotKeyShow = false;
				that.historyKeyShow = false;
			    that.doSearch();
			},
			
			
			
			//详情页跳转
			lookdetail: function (e) {
				var that = this;
				console.log(e)
			    var lookid = e.currentTarget.dataset.procuctid;
			    console.log(lookid);
			    uni.navigateTo({
					url: "../index/detail?id=" + lookid.id
				})
			},
			
			
			switchSlider: function (e) {
				this.current = e.target.dataset.index
			},
			
			
			changeSlider: function (e) {
				this.current = e.detail.current
			},
			
			//点击加载更多
			// getMore:function(e){
			//   var that = this;
			//   var page = that.data.page;
			//   uni.request({
			//       url: this.abotapi.globalData.http_server + '?g=Yanyubao&m=ShopAppWxa&a=product_list',
			//       method:'post',
			//       data: {
			//         page: page,
			//         cataid:that.data.cataid,
			//         sellerid: this.abotapi.get_sellerid()
			//       },
			//       header: {
			//         'Content-Type':  'application/x-www-form-urlencoded'
			//       },
			//       success: function (res) {  
			//         var prolist = res.data.product_list;
			//         if(prolist==''){
			//           uni.showToast({
			//             title: '没有更多数据！',
			//             duration: 2000
			//           });
			//           return false;
			//         }
			//         //that.initProductData(data);
			//         that.setData({
			//           page: page+1,
			//           shopList:that.data.shopList.concat(prolist)
			//         });
			//         //endInitData
			//       },
			//       fail:function(e){
			//         uni.showToast({
			//           title: '网络异常！',
			//           duration: 2000
			//         });
			//       } 
			//     })
			// },
			
		},
		
	}
	
	
	

	
	  

</script>

<style>
	page {
	  height: 100%;
	  background: white
	}
	
	.list-tab {
	  height: 106rpx;
	  box-sizing: border-box;
	  padding: 5px 10px;
	}
	.logo_pic{
	width:26%;
	float:left;
	overflow:hidden;
	display:flex;
	height:200rpx;
	justify-content:center;
	align-items:Center;
	}
	.list-tab ul {
	  display: flex;
	  height: 72rpx;
	  border: 1px solid #b6aaec;
	  border-radius: 12rpx;
	}
	
	.list-tab li {
	  flex: 1;
	  display: flex;
	  font-size: 14px;
	  justify-content: center;
	  align-items: center;
	  color: #b6aaec;
	}
	
	.list-tab .active {
	  background: #b6aaec;
	  color: #fff;
	}
	
	/*list-box*/
	
	.list-view {
	  border-top: 1px solid #ccc;
	}
	
	.list-box {
	  display: flex;
	  padding: 5px 10px;
	  border-bottom: 1px solid #aaa;
	}
	
	.list-images image {
	  width: 170rpx;
	  height: 170rpx;
	}
	
	.list-text {
	  font-size: 14px;
	  color: #666;
	  flex: 1;
	  background-size: 60rpx;
	}
	
	.list-text .name {
	  display: block;
	  height: 80rpx;
	  padding: 5px;
	}
	
	.list-text .txt {
	  padding: 5px;
	  color: #aaa;
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  justify-content: space-between;
	}
	
	.list-text .price {
	  font-size: 18px;
	  color: red;
	}
	
	.swiper-box {
	  height: 100%;
	}
	
	.scroll-box {
	  height: 100%;
	}
	
	.addcart {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	
	.addcart image {
	  width: 80rpx;
	  height: 80rpx;
	}
	.list{
	  background: #fff;
	  width: 100%;
	}
	.ban{
	  width: 46%;
	  padding: 10rpx ;
	  border: 2rpx solid #ccc;
	  display: inline-block;
	  margin-left:6rpx 
	}
	.ban image{
	  width: 100%;
	}
	.type{
	  font-size:30rpx;
	  font-weight: 400;
	  margin-left: 10rpx;
	}
	 .kkk{
	    font-size:26rpx;
	  /*font-weight: 700;*/
	  margin-left: 10rpx;
	  color: gray;
	}
	
	
	
	.commodity_screen {
	 width: 100%;
	 height: 100%;
	 position: fixed;
	 top: 0;
	 left: 0;
	 background: #000;
	 opacity: 0.2;
	 overflow: hidden;
	 z-index: 1000;
	 color: #fff;
	}
	.commodity_attr_box {
	 width: 100%;
	 overflow: hidden;
	 position: fixed;
	 bottom: 0;
	 left: 0;
	 z-index: 2000;
	 background: #fff;
	 padding-top: 20rpx;
	}
	.mt10{
	  margin: 0 auto;
	  text-align: center;
	  height: 70rpx;
	  width: 450rpx;
	  line-height: 70rpx;
	  border-radius:10rpx; 
	  border: 1px solid #999;
	  font-size: 30rpx;
	  margin-top: 30rpx;
	}
	.search{
	    padding: 1% 1%;
	    padding-right:80rpx;
	}
	.searchcion{
	    width: 24px;
	    height: 24px;
	    text-align: center
	}
	.search input{
	    width: 90%;
	    border-radius: 30rpx;
	    background: #fff;
	    border: none;
	    font-size: 25rpx;
	    padding:1% 2.5%;
	    }
	.search button{
	    line-height:30px;
	    background: none;
	    text-align: center;
	    border: none;
	    padding: 3px;
	    position:absolute;
	    right:27rpx;
	    top:4rpx;
	}
	.search button::after{
	    content: none;
	}
	.w100{ 
	    width: 100%;
	    padding-bottom: 10px;
	}
	.w100 button{
	    text-align: center;
		height: 40rpx;
	    line-height: 40rpx;
	    margin: 3% 2% 0 0;
	    display: inline-table;
	    padding:10rpx 20rpx;
	    font-size: 24rpx;
	}
	.cont{
	     width: 94%;
	     padding: 3%;     
	}
</style>
