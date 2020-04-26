<template>
	<view class="container">
	 <view class="header" @tap="toPageIndex">
	
	  <view class="header-item1">
	    <view class="header-item2">
	        <image class="header-logo" :src="shoplist.image_list[0]"></image>
	        <text class="header-name">
	          <text style="display:block;color:#fff;">{{shoplist.name}}</text>    
	        </text>
	    </view>
	    <image class="return-index" src="../../static/img/shouye.svg"></image>
	  </view>
	
	 </view>
	 <view class="body">
	  <scroll-view class="body-col" scroll-y="true" :style="{height:menuHeight + 'px'}">
	    <view class="body-section" :class="[selectOrder==m1.id?'active':'']" v-for="(m1, index) in menu_list"  :data-cate="'z' + m1.id" :data-selectorder="m1.id" @tap="clickMenu">
	     <view>{{m1.package}}</view>
	    </view>
	  </scroll-view>
	  <scroll-view scroll-y="true" class="body-block" @scroll="onGoodsScroll" :style="{height:menuHeight + 'px'}" :scroll-into-view="toView"  scroll-with-animation="true">
	     <view class="body-content"  v-for="(m1,idx1) in menu_list">
	      <view class="title" :id="'z' + m1.id">{{m1.package}}</view>
	        <view class="content-item" v-for="(m2, idx2) in m1.menu">
	          <image :src="m2.img"  class="content-item-img"></image>
	          <view class="item-txt">
	            <!-- <text bindtap="shopdetail" class="item-txt-name">{{m2.name}}</text> -->
	            <text class="item-txt-name">{{m2.name}}</text>
	            <view class="txt-message">
	              <view>{{m2.brief}}</view>              
	              <!-- <view><i class='like'></i>({{m2.like > 0 ? m2.like : 0}})</view>           -->
	            </view>
	            <view class="txt-price">¥ <text>{{m2.price}}</text></view>
	          </view>
	            <!-- 飞入图标 -->
	          
	        <view v-if="m2.spec_list.length"  class="chooseSpecs" @tap="chooseSpecs" :data-idx1="idx1" :data-idx2="idx2" :data-productid="m2.productid" :data-price="m2.price" :data-name="m2.name" :data-pic="m2.img" :style="{background:basic_set.o2o_set_cart_bg_color}">
	              选规格   
	          </view>
	
	          <view v-else class="addCart" @tap="tapAddCart" :data-goodsId="m2.productid" :data-idx1="idx1" :data-idx2="idx2" :data-productid="m2.productid" :data-price="m2.price" :data-name="m2.name" :data-pic="m2.img">
							+
	            <!-- <image src="../../images/s.png"></image> -->
						</view> 
	        </view>
	    </view>
	  </scroll-view>
	 </view>
	
	<view class="good_box" :hidden="hide_good_box"  :style="{left: bus_x + 'px';top:bus_y + 'px'}"> </view>
	
	<!--遮罩层-->
	<view class="shade2" :hidden="!showCartDetail" @tap='showCartDetailf' catchtouchmove="true">
	</view>
	<view class="shade" hidden="!showCartDetail" >
	<scroll-view class="cart-detail" :animation="animationData" :hidden="!showCartDetail" scroll-y="true">
	  <view class="mark" @tap="hiddenCartDetailf"></view>
	   
	  <view class="list">
	  <view class="list-a">购物车</view>
	    <view class="list-item" >
	      <view class="local-item" v-for="(item,idx) in cartlist">
	        <view class="item-img"><image :src="item.img" style="opacity:1;"></image></view>
	        <view class="item-info">
	          <view class="item-name-con">
	            <view class="info-name">{{item.name}}</view>
	            <view>{{item.spec_list}}</view>
	          </view>
	          
	          <view class="info-price">单价：￥{{item.price}}</view>
	           <view class="info-num">
	
	           <text style="width: 219%;">支付金额：￥{{item.price_total}}</text>
	            <view class="info-add">
	              <view class="add-add" :data-price="" :data-name="" :data-productid="item.productid" :data-idx='idx' @tap="tapReduceCart">-</view>
	              <view class="info-num">{{item.count}}</view>
	              <view class="add-de" :data-price="" :data-productid="" :data-name="" :data-idx='idx' @tap="cartAddCart">+</view>
	            </view>
	
	           </view>
	         
	        </view>
	      </view>
	    </view>
	  </view>
	</scroll-view>
	</view>
	
	<view class="wx-popup" :hidden="!is_show_choose_specs" catchtouchmove="true">
	  <view class='popup-container'>
	    <view class="wx-popup-title-specs">
	      <image src="../../static/img/delete_red.png" class="wx-popup-close" @tap='closeChooseSpecs'></image>
	    </view>
	    
	
	    <view class="wx-popup-subtitle-specs">{{product.name}}</view>
	
	    <view class="wx-popup-con">
	        
	      <view class="wx-shouhuo-con" wx:for="{{spec_list}}" wx:for-index="idx" wx:for-item="item">
	        <view class="wx-specs-type">{{item[0]}}： </view>
	        <view class="wx-input-con-specs">
	          <view wx:for="{{item[1]}}" class="{{currentSpecsIdx[idx] == idx2? 'select-specs' : ''}}" wx:for-item="item2" wx:for-index="idx2" bindtap="doChooseSpecs" data-idx="{{idx}}" data-idx2="{{idx2}}">{{item2}}</view>
	        </view>  
	      </view>   
	    </view>
	    <view class="wx-input-con wx-input-tips-specs">
	          <view>已选规格：</view>
	          <view>{{product.name}} ({{select_specs}})</view>       
	    </view>
	    <view class="wx-popup-btn-specs">
	      <view class="wx-specs-total">
	        <view class="wx-specs-zongjia">总价</view>
	        <view class="wx-specs-total-price"><text>￥</text><text style="font-size:36rpx;">{{product.price}}</text></view>
	      </view>
	      <text class="specs-btn-ok" bindtap="tapAddCart"  data-idx1="{{product_index1}}" data-idx2="{{product_index2}}" data-productid="{{product.productid}}" data-price="{{product.price}}" data-name="{{product.name}}">+ 加入购物车</text>
	    </view>
	  </view>
	</view>
	
	
	
	
	<!--购物车-->
	 <view class="cart">
	  <view class="data">
	    <view class="icon">
	      <view class="icon-img" bindtap="showCartDetailf">
	        <image src="../../images/car.png"></image>
	      </view>
	      <view class="cart-count" style="opacity:{{cart_count != 0 ? '' : '0'}};">{{cart_count}}</view>
	      <view class="count">需要支付 ￥{{total}}</view>
	    </view>
	    <!-- <view class="total">购物车数量：{{cart.count}}</view> -->
	  </view>
	  <form bindtap="submit">
	    <button class="yellow {{cart.count?'':'disabled'}}" formType="submit" >去结算</button>
	  </form>
	 </view>
	
	</view>
</template>

<script>


//import abotapi001 from '../../../common/abotapi.js';

export default {
	data() {
		return {
			cartList: [],
			localList: [],
			showCartDetail: false,
			defaultImg: 'http://global.zuzuche.com/assets/images/common/zzc-logo.png',
			hide_good_box: true,
			cart_count: 0,
			total: 0,
			is_show_choose_specs: false, 
			currentSpecsIdx: [],
			select_specs: '',
			is_waimai:'',
		};
	},
	onPageScroll(e) {
		//兼容iOS端下拉时顶部漂移
		this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
		this.headerTop = e.scrollTop>=0?null:0;
		this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
		
		
		
	},
	//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh() {
		var that = this;
		
		
		that.get_flash_ad_list();
		that.get_flash_img_list();
		that.initArticleList();
		that.get_shop_icon_index();
		
		that.get_product_list();
		
		
		
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom() {
		var that = this;
		var page_num = that.page_num;
		that.page_num ++;
		
		if(this.is_OK){
			uni.showToast({
				title: '暂无数据',
				duration: 2000
			});
			return;
		}
		uni.request({
		    url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=product_list',
		    method: 'post',
		    data: {
				sellerid:this.abotapi.globalData.default_sellerid,
				sort: 1,
				page: that.page_num,
				page_size:that.page_size,
		    },
		    header: {
				'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    success: function (res) {
				console.log('bbafff===', res);
				
				if(res.data.code == 1){
					that.is_OK = false;
					that.productList = that.productList.concat(res.data.product_list);
					console.log('超过一页',that.productList)
					uni.stopPullDownRefresh();//得到数据后停止下拉刷新
				}else if(res.data.code == 0){
					that.is_OK = true;
					uni.showToast({
						title: '暂无数据',
						duration: 2000
					});
					return;
				}
		    },
		    fail: function (e) {
				uni.showToast({
					title: '暂无数据！',
					duration: 2000
				});
		    },
		});
	},
	onLoad() {
    
		var shopId = options.xianmai_shangid;
		var is_waimai = options.is_waimai;
		console.log('ppppppppppppppppppppp', is_waimai);
		console.log('ppppppppppppppppppppp', options);
		
		this.setData({
		  is_waimai: is_waimai,
		})
		console.log('this.is_waimai',11111111111111);
		

		console.log('this.is_waimai',this.data.is_waimai);

		// var shop = server.selectedShopDetail(shopId);
		var desk_no = '';

		if (options.scene){
		  var arr = options.scene.split('__');
		  console.log(112233);
		  console.log(arr);
		  if(arr.length >= 2){
			shopId = arr[0];
			desk_no = arr[1];

			//将桌号缓存到本地
			wx.setStorage({
			  key: 'current_desk_no',
			  data: desk_no,
			});
		  }
		}





		console.log('565656', shopId)
		var that = this;

		that.setData({
		  shopId: shopId,
		})

		  // 获取商家详情
		  var post_data = {
			sellerid: app.get_sellerid(),
			xianmai_shangid: shopId,
		  }
		console.log('787878', shopId)
		  if (userInfo) {
			post_data.userid = userInfo.userid
		  }
		  api.abotRequest({
			url: app.globalData.http_server + '/openapi/XianmaiShangData/get_shang_detail',
			data: post_data,
			header: {
			  "Content-Type": "application/x-www-form-urlencoded"
			},
			method: "POST",
			success: function (res) {
			  var data = res.data.data;       
			  that.setData({
				shoplist: data,
				
			  });

			  wx.setStorage({
				key: 'shoplist',
				data: that.data.shoplist,
				success: function (res) {
				  console.log('异步保存成功')
				}
			  })

			},
			fail: function (e) {

			},
		  })
		

		



		
		

	   // http://192.168.0.205/hahading/server/index.php/openapi/ProductData/get_product_list_all_data
		//获取商家点餐分类信息
		api.abotRequest({
		  url: app.globalData.http_hahading_server + 'openapi/ProductData/get_product_list_all_data',
		  data: {
			xianmai_shangid: that.data.shopId,
			is_waimai: is_waimai,
		  },
		  header: {
			"Content-Type": "application/x-www-form-urlencoded"
		  },
		  method: "POST",
		  success: function (res) {

			console.log('fffsssssfeefefsf', res.data.menu);

			
			var data = res.data.data;
	   
			if (data.menu == '') {
			  
			  wx.showModal({
				title: '提示',
				content: '暂时没有商品，请等待...',
				success(res) {
				  if (res.confirm) {
					// wx.navigateTo({
					//   url: '/pages/shops/shop_detail' + '?id=' + shopId,
					// })
					wx.navigateBack({
					  delta: 1
					})
				  } else if (res.cancel) {
					wx.navigateBack({
					  delta: 1
					})
				  }
				}
			  })
			  return;
			}

			var menu_list = data.menu;
			for(var i=0; i<menu_list.length; i++){          
			  for (var j = 0; j < menu_list[i]['menu'].length; j++){       
				for(var m=0;m<menu_list[i]['menu'][j].spec_list.length; m++){
				  menu_list[i]['menu'][j].spec_list[m] = menu_list[i]['menu'][j].spec_list[m].split(':');
				  menu_list[i]['menu'][j].spec_list[m][1] = menu_list[i]['menu'][j].spec_list[m][1].split('|');
				}
			  }
			}

			console.log('menu_list===', menu_list)



			var selectOrder = data.menu[0].id
			  that.setData({
				menu_list: menu_list,
				selectOrder: selectOrder
			  });

		  },
		  fail: function (e) {

		  },
		})
		console.log('ffffifififififif', is_waimai);
		if (is_waimai == 1){
		  var cart_list = wx.getStorageSync('waimai_list_' + this.data.shopId);
		  console.log('fffeeeeefififif', cart_list);
		}else{
		  var cart_list = wx.getStorageSync('cart_list_' + this.data.shopId);
		  console.log('ffffifififififif', cart_list);
		}
	   
		that.setData({
		  cartlist: cart_list
		})

		that.sum();

		// var userInfo = app.get_user_info();
		// if ((!userInfo) || (!userInfo.userid)) {   
		//       that.setData({
		//         cart: {
		//           count: 0 ,
		//           total: 0,
		//         }
		//       });
		// }else{
	   
		// };



		



		//加载静态订单数据
		var res = wx.getStorageSync('orderList');
		if (res) {
		  if (res.count < 0) res.count = 0;
		  this.setData({
			cart: {
			  count: res.count == null ? 0 : res.count,
			  total: res.total
			}
		  });
		  console.log("shop---Loading");
		  console.log(res.count, res.total, res.cartList);
		  console.log(this.data.cart.count, this.data.cart.total);
		  console.log("shop---end");
		  if (!server.isEmptyObject(res.cartList)) {
			this.setData({
			  cartList: res.cartList,
			  localList: server.filterEmptyObject(res.cartList)
			});
		  }
		}

		//防止未定义数组的形式
		if (typeof this.data.cartList[this.data.shopId] == 'undefined' || server.isEmptyObject(this.data.cartList[this.data.shopId])) {
		  var cartList = this.data.cartList;
		  cartList[this.data.shopId] = [];
		  this.setData({
			cartList: cartList
		  })
		}
		console.log(this.data.localList, this.data.cartList)




		var that = this;
		wx.getSystemInfo({// 获取页面的有关信息
		  success: function (res) {
			wx.setStorageSync('systemInfo', res)
			var ww = res.windowWidth;
			var hh = res.windowHeight;

			that.setData({
			  ww : ww,
			  hh : hh,
			  menuHeight: hh - 130.63
			})
			
		  }
		});


		
		this.busPos = {};
		this.busPos['x'] = 27.185;//购物车的位置
		this.busPos['y'] = this.data.hh - 32;


	},
	
	
	
	
	methods: {
		
		callback_function:function(that, cb_params){
			
			if(!cb_params){
				return;
			}
			
			console.log('cb_params====', cb_params);
			
			
			//====1、更新界面的颜色
			this.abotapi.getColor();
			
			//====2、其他的设置选项：商品列表风格、头条图标等等
			if (cb_params.wxa_product_list_style) {
			    
			      this.wxa_product_list_style = cb_params.wxa_product_list_style
			    
			  }
			if (cb_params.wxa_shop_toutiao_icon) {
			  
			    this.wxa_shop_toutiao_icon = cb_params.wxa_shop_toutiao_icon
			  
			}
			if (cb_params.wxa_show_kucun_in_list) {
			  
			    this.wxa_show_kucun_in_list = cb_params.wxa_show_kucun_in_list
			  
			}
			if (cb_params.wxa_show_icon_index_count){
			  
			    this.wxa_show_icon_index_count = cb_params.wxa_show_icon_index_count
			  
			}
			if (cb_params.wxa_show_index_icon) {
			  
			   this.wxa_show_index_icon = cb_params.wxa_show_index_icon
			  
			}
			if (cb_params.wxa_show_index_swiper) {
			  
			    this.wxa_show_index_swiper = cb_params.wxa_show_index_swiper
			  
			}
			if (cb_params.wxa_show_pic_pinpu) {
			  
			    this.wxa_show_pic_pinpu = cb_params.wxa_show_pic_pinpu
			  
			}
			if (cb_params.wxa_show_search_input) {
			  
			    this.wxa_show_search_input = cb_params.wxa_show_search_input
			  
			}
			if (cb_params.wxa_show_toutiao) {
			  
			    this.wxa_show_toutiao = cb_params.wxa_show_toutiao
			  
			}
			if (cb_params.wxa_show_video_player) {
			  
			   this.wxa_show_video_player = cb_params.wxa_show_video_player
			
			}
			if (cb_params.wxa_video_player_url) {
			  
			    this.wxa_video_player_url = cb_params.wxa_video_player_url
			  
			}
			if (cb_params.wxa_video_screen_url) {
			  
			    this.wxa_video_screen_url = cb_params.wxa_video_screen_url
			  
			}
			if (cb_params.wxa_shop_toutiao_flash_line) {
			  
			    this.wxa_shop_toutiao_flash_line = cb_params.wxa_shop_toutiao_flash_line
			  
			}
					
			if (cb_params.wxa_hidden_product_list) {
			  
			    this.wxa_hidden_product_list = cb_params.wxa_hidden_product_list
			  
			}
					
			if (cb_params.wxa_kefu_button_type) {
			  
			   this.wxa_kefu_button_type = cb_params.wxa_kefu_button_type
			  
			}
					
			if (cb_params.wxa_kefu_button_icon) {
			  
			   this.wxa_kefu_button_icon = cb_params.wxa_kefu_button_icon
			  
			}
					
			if (cb_params.wxa_kefu_mobile_num) {
			  
			    this.wxa_kefu_mobile_num = cb_params.wxa_kefu_mobile_num
			  
			}
					
			if (cb_params.wxa_kefu_form_url) {
			  
			    this.wxa_kefu_form_url = cb_params.wxa_kefu_form_url
			  
			}
					
			if (cb_params.wxa_show_kefu_button) {
			  
			    this.wxa_show_kefu_button = cb_params.wxa_show_kefu_button
			  
			}
					
			if (cb_params.wxa_kefu_bg_color) {
			  
			    this.wxa_kefu_bg_color = cb_params.wxa_kefu_bg_color
			  
			}
			
			//====3、获取经纬度坐标，显示当前城市			
			console.log("百度地图AK：" + cb_params.baidu_map_ak_wxa);
				
			/* 获取定位地理位置 */
			// 新建bmap对象
				
			var BMap_obj = new bmap.BMapWX({
				ak: cb_params.baidu_map_ak_wxa
			});
			
			var that002 = this;
			
			var regeocoding_fail = function (data) {
				console.log('333333', data);
				console.log('44444', that.ak);
			};
			
			
			
			var regeocoding_success = function (data) {
				console.log('00000', data);
				
				this.wxMarkerData = data.wxMarkerData;
				this.markers = this.wxMarkerData;
				this.latitude = this.wxMarkerData[0].latitude;
				this.longitude = this.wxMarkerData[0].longitude;
				this.address = this.wxMarkerData[0].address;
				console.log('address',this.address);
				
				
				that002.current_cityname = data.originalData.result.addressComponent.city
				console.log('this.current_cityname',that002.current_cityname);
				
				that002.current_citynameLength = that002.current_cityname.length;
				console.log('this.current_citynameLength',that002.current_citynameLength);
				
				
				
				if(that002.current_citynameLength == 2){
					that002.current_citynameWidth = uni.upx2px(28);
				}
				else if(that002.current_citynameLength == 3){
					that002.current_citynameWidth = uni.upx2px(24);
				}
				else if(that002.current_citynameLength == 4){
					that002.current_citynameWidth = uni.upx2px(20);
				}
				
				this.cityInfo = data.originalData.result.addressComponent,
				
				// console.log('with', that.data.imageWidth)
				
			
				uni.setStorage({
					key:'current_cityname',
					data:that002.current_cityname,
					success:function(){}
				})
				
				
				uni.setStorage({
					key:'current_latitude',
					data:this.wxMarkerData[0].latitude,
					success:function(){}
				})
				
				
				uni.setStorage({
					key:'current_longitude',
					data:this.wxMarkerData[0].longitude,
					success:function(){}
				})
				
				uni.setStorage({
					key:'markers',
					data:this.wxMarkerData,
					success:function(){}
				})
				
				
			    // getCurrentPages()[getCurrentPages().length - 1].onLoad()
			}
				
			BMap_obj.regeocoding({
				fail: regeocoding_fail,
				success: regeocoding_success
			});
			
			
			
		},
		
		callback_func_for_shop_info:function(shop_info){
			var shop_name = shop_info.shop_name;
			
			uni.setNavigationBarTitle({
				title:shop_name
			})
			
		},
		
		
		//猜你喜欢
		get_product_list:function(){
			var that = this;
			this.abotapi.abotRequest({
			    url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=product_list',
			    method: 'post',
			    data: {
					sellerid:this.abotapi.globalData.default_sellerid,
					sort: 1,
					page: that.page,
					page_size:that.page_size,
			    },
			    success: function (res) {
					console.log('bbafff===', res);
					
					if(res.data.code == 1){
						that.is_OK = false;
						that.productList = res.data.product_list;
						if(that.page == 1){
							console.log('第一页')
							that.productList = res.data.product_list;
							console.log('第一页index',that.productList)
						}
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
		
		//顶部轮播图片请求
		get_flash_ad_list:function(){
			var that = this;
			uni.request({						
			    url: this.abotapi.globalData.yanyubao_server_url +  '?g=Yanyubao&m=ShopAppWxa&a=get_flash_ad_list',
			    method: 'post',
			    data: {
					sellerid:this.abotapi.globalData.default_sellerid,
					type:4
			    },
			    header: {
					'Content-Type': 'application/x-www-form-urlencoded'
			    },
			    success: function (res) {
					console.log('uuufff===', res);
					var productlist = res.data.data;
					console.log('uuifff===', productlist);
					that.productLists = productlist
				  
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
			});
		},
		
		
		//平铺广告请求
		get_flash_img_list:function(){
			var that = this;
			uni.request({									
			    url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_flash_img_list',
			    method: 'post',
			    data: {
					sellerid:this.abotapi.globalData.default_sellerid,
					type:5
			    },
			    header: {
					'Content-Type': 'application/x-www-form-urlencoded'
			    },
			    success: function (res) {
					console.log('wbafff===', res);
					that.pictures = res.data.data;
					console.log('pictures',that.pictures);
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
				},
			});
		},
		
		
		initArticleList: function () {
		
		    var that = this
		
		    //=====更新商户头条=================
		    var url = this.abotapi.globalData.weiduke_server_url + '?g=Home&m=Yanyubao&a=yingxiao';//+ app.globalData.sellerid;
		    var data = {
				id: 'seller',
				action: 'list',
				sellerid: this.abotapi.get_sellerid(),
				currentpage: 1
		    };
		
		    var cbError = function (res) {
		
		    };
		    this.abotapi.httpPost(url, data, this.yingxiao, cbError);
		    //========End====================
		
		},
		  
		  
		articleBack: function (res) {
		    console.log(res);
		
		    var that = this
		    if (res.data.code == '1') {
				this.abotapi.set_current_weiduke_token(res.data.token);
		      
		      //为显示加载动画添加3秒延时
				setTimeout(function () {
		       
					that.articlelist = res.data.data
					console.log('that.articlelist',that.articlelist);
					// loading = !this.data.loading
		        
				}, 500)
		
				if (that.wxa_shop_toutiao_flash_line == 2) {
					var data = res.data.data;
					var articlelist2 = [];
					for (var i = 0, length = data.length -1; i < (length / 2); i++) {
						var arr = [data[0], data[1]];
						articlelist2.push(arr);
						data.shift()
						data.shift()
					}
		        
					that.articlelist2 =  articlelist2 
					console.log('that.articlelist2',that.articlelist2);
				}
			}
		},
		
		
		//商户头条
		yingxiao:function(){
			var that = this;
			uni.request({
				url : this.abotapi.globalData.weiduke_server_url + '?g=Home&m=Yanyubao&a=yingxiao',
				method:'POST',
				data: {
					id: 'seller',
					action: 'list',
					sellerid:this.abotapi.globalData.default_sellerid,
					currentpage: 1
				},
				header:{'Content-Type': 'application/x-www-form-urlencoded'},
				success:function(res){
					console.log('res1',res);
					that.abotapi.set_current_weiduke_token(res.data.token);
					if(res.data.code == 1){
							that.articlelist = res.data.data;
						console.log('articlelist',that.articlelist);
					}
					
					
					if (that.wxa_shop_toutiao_flash_line == 2) {
						var data = res.data.data;
						var articlelist2 = [];
						for (var i = 0, length = data.length -1; i < (length / 2); i++) {
							var arr = [data[0], data[1]];
							articlelist2.push(arr);
							data.shift()
							data.shift()
						}
					
						that.articlelist2 =  articlelist2;
						console.log('that.articlelist2',that.articlelist2);
					}
				},
				fail:function(res){
					console.log('res2',res);
				},
			});
			
		},
		
		//首页分类图标
		get_shop_icon_index:function(){
			var that = this;
			uni.request({
				url:this.abotapi.globalData.yanyubao_server_url+'?g=Yanyubao&m=ShopAppWxa&a=get_shop_icon_index',
				method:'POST',
				header:{'Content-Type': 'application/x-www-form-urlencoded'},
				data:{
					sellerid:this.abotapi.globalData.default_sellerid,
				},
				success(res) {
					// console.log('87878787',res);
					var data = res.data;
					console.log("data===",data);
					if(data.code == 1){
						that.index_icon_list = data.data;
					}
				
				}
			});
		},
		
		//点击商户头条进入列表
		touTiaoList: function (e) {
		    console.log('点击商户头条进入列表');
		    uni.navigateTo({
				url: '/pages/tabBar/home/help/help?sellerid=' + this.abotapi.globalData.default_sellerid
		    })
		},
		
		//加载Promotion 并设定倒计时,,实际应用中应该是ajax加载此数据。
		loadPromotion() {
			let cutTime = new Date();
			let yy = cutTime.getFullYear(),
				mm = cutTime.getMonth() + 1,
				dd = cutTime.getDate();
			let tmpcountdown = yy + '/' + mm + '/' + dd + ' 23:59:59';
			let tmpPromotion = [
				{
					title: '整点秒杀',
					ad: '整天秒杀专区',
					img: '/static/img/s1.jpg',
					countdown: false
				},
				{
					title: '限时抢购',
					ad: '每天23点上线',
					img: '/static/img/s2.jpg',
					countdown: tmpcountdown
				} //countdown为目标时间，程序会获取当前时间倒数
			];
			//检查倒计时
			for (let i = 0; i < tmpPromotion.length; i++) {
				let row = tmpPromotion[i];
				if (row.countdown) {
					let h = '00',
						m = '00',
						s = '00';
					let currentTime = new Date();
					let cutoffTime = new Date(tmpcountdown);
					if (!(currentTime >= cutoffTime)) {
						let countTime = parseInt(
							(cutoffTime.getTime() - currentTime.getTime()) / 1000
						);
						h = parseInt(countTime / 3600);
						m = parseInt((countTime % 3600) / 60);
						s = countTime % 60;
						h = h < 10 ? '0' + h : h;
						m = m < 10 ? '0' + m : m;
						s = s < 10 ? '0' + s : s;
					}
					tmpPromotion[i].countdown = { h: h, m: m, s: s };
				}
			}
			this.Promotion = tmpPromotion;
		},
		//定时器
		Timer() {
			setInterval(() => {
				if (this.Promotion.length > 0) {
					for (let i = 0; i < this.Promotion.length; i++) {
						let row = this.Promotion[i];
						if (row.countdown) {
							if (
								!(
									row.countdown.h == 0 &&
									row.countdown.m == 0 &&
									row.countdown.s == 0
								)
							) {
								if (row.countdown.s > 0) {
									row.countdown.s--;
									row.countdown.s =
										row.countdown.s < 10
											? '0' + row.countdown.s
											: row.countdown.s;
								} else if (row.countdown.m > 0) {
									row.countdown.m--;
									row.countdown.m =
										row.countdown.m < 10
											? '0' + row.countdown.m
											: row.countdown.m;
									row.countdown.s = 59;
								} else if (row.countdown.h > 0) {
									row.countdown.h--;
									row.countdown.h =
										row.countdown.h < 10
											? '0' + row.countdown.h
											: row.countdown.h;
									row.countdown.m = 59;
									row.countdown.s = 59;
								}
								this.Promotion[i].countdown = row.countdown;
							}
						}
					}
				}
			}, 1000);
		},
		//消息列表
		toMsg(){
			uni.navigateTo({
				url:'../../msg/msg'
			})
		},
		//搜索跳转
		toSearch() {
			uni.navigateTo({
				url:'/pages/search/search'				
			})
		},
		
		//推荐商品跳转
		toPromotion(e) {
			console.log('toPromotion-e',e);
			
			// uni.showToast({ title: e.title, icon: 'none' });
		},
		//商品跳转
		toGoods(e) {
			console.log('rrxfff===',e);
			var productid = e.productid;
			uni.navigateTo({
				url: '/pages/goods/goods?productid='+productid
			});
		},
		//轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
		},
		
		
		imageLoad: function (e) {//获取图片真实宽度  
				
		    var imgwidth = e.detail.width,
		      imgheight = e.detail.height,
		      //宽高比  
		      ratio = imgwidth / imgheight;
		    console.log(imgwidth, imgheight)
		    //计算的高度值  
		    var viewHeight = this.windowHeight / ratio;
		    var imgheight = viewHeight;
		    var imgheights = this.imgheights;
		    //把每一张图片的对应的高度记录到数组里  
		    imgheights[e.target.dataset.id] = uni.upx2px(imgheight);
	
		    console.log(imgheights);
		
	
		     this.imgheights = imgheights
		   
		  },
		
		
		//首页导航图标、轮播图、平面广告跳转
		toAdDetails:function(url){
			var var_list = Object();
			console.log('toAdDetails- to url ====>>>>>>', url);
			this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
			
		},
		
		//客服相关
		//拨打客服电话
		call_seller: function () {
		    console.log('wxa_kefu_mobile_num', this.wxa_kefu_mobile_num)
		    uni.makePhoneCall({
				phoneNumber: this.wxa_kefu_mobile_num,
		    })
		},
		
	}
};
</script>
<style lang="scss">
.container{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: inherit;
}

.header{
  margin: 0; 
  border-radius: 8px;
  background:#92929e linear-gradient(to right, rgba(255,255,255,0), rgba(2555,255,255,.5));
}
.header-item1{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20rpx;
  height: 120rpx;
  justify-content: space-between;
}

.header-item2{
  height: 96rpx;
  line-height: 96rpx;
}

.header-logo{
  width: 100rpx;
  height: 100rpx;
  border-radius: 100px;
  float:left;
}

.header-name{
  padding-left: 0.5rem; 
  font-size: 30rpx;
  display: flex;
  flex-direction: column;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.return-index{
  width: 60rpx;
  margin-right: 20rpx;
}

.yellow{
  background-color: #F5D071;
  color: #333333;
  font-weight: bold;
  font-size:32rpx;
}
.header-text{
  
}

/*菜的css*/
.body{
  width: 100%;
  height:100%;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
}
.body-block{
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  height: 22.5rem;
  width: 80%;
}
.title{
  width: 100%;
  height: 2rem;
  background-color: #fff;
  height: 80rpx;
  line-height: 80rpx;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 28rpx;
  color: #333333;
  margin-left: 20rpx;
  font-size: 28rpx;
}
.body-col{
 width: 20%;
 height: 22rem;
 
}
.body-section{
  /* height: 60rpx;
  line-height: 60rpx; */
  padding: 30rpx 0;
  background-color: #FFF;
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 26rpx;
  color: #666666;
  border-left: 2px solid #eee;
  background: #eee;
  /* text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden; */
}

.body-section view{
  overflow: hidden;
      
  text-overflow: ellipsis;
    
  display: -webkit-box;
    
  -webkit-line-clamp: 2; 
    
  -webkit-box-orient: vertical;
}

.body-col .body-section.active{
  border-left: 2px solid #f00;
  background: #fff;
}

.body-content{
  width: 100%;
}
.content-item{
  display: flex;
  flex-direction: row;
  padding: 20rpx;
}
.content-item-img{
  height: 160rpx;
  width: 160rpx;
  border-radius: 4px;
}
.item-txt{
  font-size: 0.8rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  flex-direction: column;
  margin-left: 20rpx;
}
.item-txt-name{
  font-weight: 700;
  font-size: 32rpx;
  color: #333;
}
.txt-message{
  font-size: 0.7rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  flex-direction: row;
  margin-top: 20rpx;
  color: #999;
}
.txt-message :nth-child(1){
  margin-right: 10rpx;
}
.txt-message view{
   width: 296rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
}

.txt-message .like{
	background-image: url(http://xs01.meituan.net/waimai_web/img/sprite/icons_559f3531_1.png);
	display: inline-block;
	width: 15px;
	height: 15px;
	background-position: -416px -63px;
}
.txt-price{
  color: #E85B4D;
  margin-top: 20rpx;
  font-size: 28rpx;
}
.txt-price text{
  font-size: 36rpx;
}

.addCart{
width:40rpx;
height:40rpx;
margin-top:3rem;
position:absolute;
right:1rem;
background:#feb70f;
border-radius:50%;
text-align:center;
line-height:34rpx;
color:#333;
font-size:24px;
box-shadow: 0px 0px 15px #feb70f inset;
}
/* .addCart image{
 pointer-events: none;
 padding: 0.5rem;
	width: 24rpx;
	height: 24rpx;
} */

/*购物车*/
.cart{
  position: fixed;
  bottom: 0rem;
  height: 3.5rem;
  width: 90%;
  display: flex;
  flex-direction: row;
  background-color:#333;
  padding: 0 5%;
  background:#333 linear-gradient(to bottom, rgba(51,51,51,0), rgba(2555,255,255,.5));
  z-index: 2;
}
.cart-count{
  margin-left:-20rpx;
  margin-top:-16px;
  background:#EB4E27;
  border-radius:202px;
  height:35rpx;
  width:35rpx;
  font-size:22rpx;
  text-align:center;
  line-height:37rpx;
  color:#fff;
}
.data{
  line-height: 1;
  width: 70%;
  border-top-left-radius:100px;
  border-bottom-left-radius:100px;
  background-color:#333333;
  background:#333 linear-gradient(to bottom, rgba(51,51,51,0), rgba(2555,255,255,.5));
}
.icon{
  height: 2rem;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.icon-img{
  height: 2rem;
  width: 2rem;
   background-color: #feb70f;
  margin-top: -0.5rem;
  border-radius: 50%;
}
.icon-img image{
  height: 1.5rem;
  width: 1.5rem;
  padding: 0.25rem;
}
.count{
  padding-left: 1rem;
  font-size: 28rpx;
  margin-top:14rpx;
  color: #fff;
}

.total{
  height: 1rem;
}
.cart form{
    width: 20%;
    height: 90rpx;
    line-height: 90rpx;
    margin-top:14rpx;
    width:25%;
    margin-left: 20rpx;
}
.cart form button{
}
/*购物车遮罩层*/
.cart-detail{
  position: absolute;
  bottom:110rpx;
  left: 0;
  width: 100%;
  height: 15rem;
  background: #fff;

  /* width:100%;
  height:103%;
  top:0;
  background:rgba(0,0,0,0.5);
  overflow:hidden;
  /* z-index:1; */
  /* position:absolute; */ 

}
.list{
  width:100%;
  height: 35rem;
  /* position:absolute;
  bottom:2rem;
  left:0;
  width:100%;
  height:15rem;
  background:#fff;
  z-index:1; */
}
.list-a{
  width:100%;
  font-size:33rpx;
  height:27px;
  text-align:center;
  background-color:#F7CE65;
  line-height:27px;

}



.list-item{
  width: 100%;
  height: 35rem;
}
.local-item{
  width:100%;
  height:5rem;
  display:flex;
  flex-direction:row;
  background-color:#eee;
  padding:0.1rem;
  margin-bottom:1rem;
  border-radius:12px;

}
.item-img image{
  height:3.5rem;
  width:3.5rem;
  margin-top:10px;
}
.item-info{
  width: 80%;
  display: flex;
  flex-direction: column;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1.5rem;
  margin-left:25px;
  margin-top:7px;
  color:#555;
}
.info-name{
  font-size: 1rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.item-name-con{
  display: flex;
  align-items: flex-end;
  margin-bottom: 22rpx;
}

.item-name-con :nth-child(2){
  font-size: 24rpx;
  margin-left: 40rpx;
  color: #666;
}

.info-price{
  font-size: 0.7rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin-bottom:6rpx;
}
.info-num{
  font-size: 0.8rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
}
.info-add{
  display: flex;
  flex-direction: row;
  width: 100%;
 
}
.add-add{
  background-color: yellow;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin: 0 0.4rem;
  font-size: 0.8rem;
  text-align: center;
}
.add-de{
  background-color: yellow;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  font-size: 0.8rem;
  margin: 0 0.4rem;
  text-align: center;
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

/* 遮罩层阴影 */
.shade{   
  width: 100%;
  bottom: 0;
  position: fixed;
  /* z-index: 2; */
  }   

.shade2{
  width: 100%;
  height: 100%;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  overflow: hidden;
  position: fixed;
  /* z-index: 2; */
}
.chooseSpecs{
width: 100rpx;
height: 40rpx;
margin-top: 3rem;
position: absolute;
right: 1rem;
background: #feb70f;
border-radius: 100px;
text-align: center;
line-height: 40rpx;
color: #333;
font-size: 24rpx;
}


.wx-popup {
  position:fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background:rgba(0, 0, 0, .5);
  z-index:2;
}
.popup-container {
  position: absolute;
  left: 50%;
  top: 50%;
 
  width: 80%;
  max-width: 600rpx;
  border: 2rpx solid #ccc;
  border-radius: 10rpx;
  box-sizing: bordre-box;
  transform: translate(-50%, -50%); 
  overflow: hidden;
  background: #fff;
}
.wx-popup-title {
  padding: 20rpx;
  text-align: center;
  font-size: 28rpx;
  border-bottom: 2rpx solid red;
}

.wx-popup-subtitle{
  font-size:28rpx;
  color:#6798E9;
  margin-top:26rpx;
  text-align:left;
  padding:0 5%;
}
.wx-popup-con {
  text-align: center;
  font-size:28rpx;
  margin-top:20rpx;
  width: 90%;
  margin-left: 5%;
  margin-bottom: 34rpx;
}
.wx-popup-btn {
  display: flex;
  justify-content: space-around;
  margin-bottom: 40rpx;
}
.wx-popup-btn text {
  display:flex;
  align-items:center;
  justify-content:center;
  width:33%;
  height:70rpx;
  border-radius:88rpx;
  background:#6798E9;
  color:#fff;
  font-size:28rpx;
}

.wx-popup-close{
  width:50rpx;
  height:50rpx;
  float:right;
  margin-top:-10rpx;
}
.wx-time-con{
  display:flex;
  align-items:center;
  width:90%;
  margin-left:5%;
  flex-wrap:wrap;
}
.wx-input-con{
  display:flex;
  align-items:center;
  padding: 10rpx 0px;
}

.wx-input-tips{
  font-size: 22rpx;
  color: #ff8000;
}
.wx-input-con input{
  margin-left:20rpx;
  text-align:left;
}

.wx-popup-title-specs {
  padding: 20rpx;
  text-align: center;
  font-size: 28rpx;
}

.wx-popup-subtitle-specs{
  font-size: 32rpx;
  color: #000;
  margin-top: 10rpx;
  text-align: left;
  padding: 0 5%;
  font-weight: bold;
}

.wx-input-con-specs{
  display:flex;
  align-items:center;
  padding: 10rpx 0px;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.wx-input-con-specs view{
  width: 24%;
  border: 1px solid #eee;
  padding: 10rpx;
  font-size: 24rpx;
  border-radius: 4px;
  color:#333;
  margin-bottom: 20rpx;
  margin-right: 4%;
}
.wx-specs-type{
  text-align: left;
  color: #666;
  font-size: 26rpx;
  margin-bottom: 4rpx;
}
.wx-input-tips-specs{
  background: #eee;
  padding: 16rpx 5%;
  font-size: 22rpx;
}

.wx-input-tips-specs :nth-child(1){
  color:#666;
}
.wx-input-tips-specs :nth-child(2){
  color:#333;
}
.wx-popup-btn-specs{
  display: flex;
  padding: 10rpx 5%;
  margin-bottom: 30rpx;
  justify-content: space-between;
  align-items: flex-end;
}

.wx-specs-total{
  display: flex;
  width: 50%;
  justify-content: flex-start;
  align-items: flex-end;
}


.wx-specs-zongjia{
   width: 100rpx;
  font-size: 28rpx
}

.wx-specs-total-price{
  display: flex;
  width: 100%;
  align-items: flex-end;
}
.wx-specs-total-price text{
  color:#E85B4D;
  width: auto;
  font-size: 28rpx;
}

.specs-btn-ok{
  background: #F6C657;
  padding: 10rpx 20rpx;
  border-radius: 30px;
}

.select-specs{
  border:1px solid #F8D786 !important;
  background: #FEFBF2;
  color: #F3B33E !important;
  font-size: 28rpx;
}
</style>
