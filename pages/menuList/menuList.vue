<template>
	<view class="container">
	 <view class="header" @tap="toPageIndex">
	
	  <view class="header-item1">
	    <view class="header-item2">
	        <image class="header-logo" :src="shoplist.icon_image"></image>
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
	
	<view class="good_box" :hidden="hide_good_box"  :style="{left: bus_x + 'px',top:bus_y + 'px'}"> </view>
	
	<view>dddd {{!showCartDetail}} 5555</view>
	
	<!--遮罩层-->
	<view class="shade2" :hidden="!showCartDetail" @tap='showCartDetailf' catchtouchmove="true">
	</view>
	<view class="shade" :hidden="!showCartDetail" >
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
	              <view class="add-add"  :data-productid="item.productid" :data-idx='idx' @tap="tapReduceCart">-</view>
	              <view class="info-num">{{item.count}}</view>
	              <view class="add-de"  :data-idx='idx' @tap="cartAddCart">+</view>
	            </view>
	
	           </view>
	         
	        </view>
	      </view>
	    </view>
	  </view>
	</scroll-view>
	</view>
	
	<!-- <view class="wx-popup" :hidden="!is_show_choose_specs" catchtouchmove="true">
	  <view class='popup-container'>
	    <view class="wx-popup-title-specs">
	      <image src="../../static/img/delete_red.png" class="wx-popup-close" @tap='closeChooseSpecs'></image>
	    </view>
	    
	
	    <view class="wx-popup-subtitle-specs">{{product.name}}</view>
	
	    <view class="wx-popup-con">
	        
	      <view class="wx-shouhuo-con" v-for="(item, idx) in spec_list">
	        <view class="wx-specs-type">{{item[0]}}： </view>
	        <view class="wx-input-con-specs">
	          <view v-for="(item2, idx2) in item[1]" :class="[currentSpecsIdx[idx] == idx2? 'select-specs' : '']"  @tap="doChooseSpecs" :data-idx="idx" :data-idx2="idx2">{{item2}}</view>
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
	      <text class="specs-btn-ok" @tap="tapAddCart"  :data-idx1="product_index1" :data-idx2="product_index2" :data-productid="product.productid" :data-price="product.price" :data-name="product.name">+ 加入购物车</text>
	    </view>
	  </view>
	</view> -->
	
	
	
	
	<!--购物车-->
	<view class="cart">
	  <view class="data">
	    <view class="icon">
	      <view class="icon-img" @tap="showCartDetailf">
	        <image src="../../static/img/car.png"></image>
	      </view>
	      <view class="cart-count" :style="{opacity: cart_count != 0 ? '' : '0'}">{{cart_count}}</view>
	      <view class="count">需要支付 ￥{{total}}</view>
	    </view>
	    <!-- <view class="total">购物车数量：{{cart.count}}</view> -->
	  </view>
	  <form bindtap="submit">
	    <button class="yellow"  formType="submit" >去结算</button>
	  </form>
	 </view>
	
	</view>
</template>

<script>


//import abotapi001 from '../../../common/abotapi.js';
import util from '@/common/util.js';


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
			shopId: '',
			is_waimai: 1,
			shoplist: '',
			menu_list: '',
			selectOrder: '',
			cartlist: {},
			toView: '',
			menuHeight: '',
			bus_x: '',
			bus_y: '',
			finger:{},
			busPos:{},
			animationData:'',
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
	onLoad(options) {
		
		// const oMeta = document.createElement('meta');
		// oMeta.name = "referrer";
		// oMeta.content = "no-referrer"
		// document.getElementsByTagName('head')[0].appendChild(oMeta);
		
		// console.log('document888',document);
		var userInfo;
    // 1232 1231 133 191
	
		var shopId = 133;
		
		// var shopId = options.xianmai_shangid;
		// var is_waimai = options.is_waimai;
		
		var is_waimai = 0;
	
		console.log('ppppppppppppppppppppp', is_waimai);
		console.log('ppppppppppppppppppppp', options);
		
		this.is_waimai = is_waimai;


		// var shop = server.selectedShopDetail(shopId);

		console.log('565656', shopId)
		var that = this;

		that.shopId = shopId;
		

		  // 获取商家详情
		  var post_data = {
			sellerid: this.abotapi.get_sellerid(),
			xianmai_shangid: shopId,
		  }
		console.log('787878', shopId)
		  if (userInfo) {
			post_data.userid = userInfo.userid
		  }
		this.abotapi.abotRequest({	
			url: this.abotapi.globalData.yanyubao_server_url + 'openapi/XianmaiShangData/get_shang_detail',
			// url: 'https://yanyubao.tseo.cn/hahading/index.php/openapi/ProductData/get_product_list_all_data',
			data: post_data,
			header: {
			  "Content-Type": "application/x-www-form-urlencoded"
			},
			method: "POST",
			success: function (res) {
			  var data = res.data.data;    
				 
				 that.shoplist = data
				 console.log('that.shoplist',that.shoplist)

			  uni.setStorage({
				key: 'shoplist',
				data: that.shoplist,
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
		this.abotapi.abotRequest({
		  url: this.abotapi.globalData.o2owaimai_server_url + 'openapi/ProductData/get_product_list_all_data',
		  data: {
			xianmai_shangid: that.shopId,
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
			  
			  uni.showModal({
				title: '提示',
				content: '暂时没有商品，请等待...',
				success(res) {
				  if (res.confirm) {
					// uni.navigateTo({
					//   url: '/pages/shops/shop_detail' + '?id=' + shopId,
					// })
					uni.navigateBack({
					  delta: 1
					})
				  } else if (res.cancel) {
					uni.navigateBack({
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
			that.menu_list = menu_list;
			that.selectOrder = selectOrder;

		  },
		  fail: function (e) {

		  },
		})
		console.log('ffffifififififif', is_waimai);
		if (is_waimai == 1){
		  var cart_list = uni.getStorageSync('waimai_list_' + this.shopId);
		  console.log('fffeeeeefififif', cart_list);
		}else{
		  var cart_list = uni.getStorageSync('cart_list_' + this.shopId);
		  console.log('ffffifififififif', cart_list);
		}
	   
	   
		that.cartlist = cart_list

		that.sum();
		



		//加载静态订单数据
		var res = uni.getStorageSync('orderList');
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
		  console.log(this.cart.count, this.cart.total);
		  console.log("shop---end");
		  if (!server.isEmptyObject(res.cartList)) {
			  this.cartList = res.cartList;
			  this.localList = server.filterEmptyObject(res.cartList);
		  }
		}

		//防止未定义数组的形式
		if (typeof this.cartList[this.shopId] == 'undefined' || server.isEmptyObject(this.cartList[this.shopId])) {
		  var cartList = this.cartList;
		  cartList[this.shopId] = [];		  
		  this.cartList = cartList
		}
		console.log(this.localList, this.cartList)




		var that = this;
		uni.getSystemInfo({// 获取页面的有关信息
		  success: function (res) {
			uni.setStorageSync('systemInfo', res)
			var ww = res.windowWidth;
			var hh = res.windowHeight;

			that.ww = res.windowWidth;
			that.hh = res.windowHeight;
			
			that.menuHeight = hh - 130.63;

			
		  }
		});


		
		this.busPos = {};
		this.busPos['x'] = 27.185;//购物车的位置
		this.busPos['y'] = this.hh - 32;


	},
	
	
	
	
	methods: {
		
		/**
		   * 点击商品展示滚动
		   */
		  clickMenu: function (e) {
		    var that = this;
		    var cate = e.currentTarget.dataset.cate;
		    var selectOrder = e.currentTarget.dataset.selectorder
		
			that.is_menu_list_scroll = true;
			that.toView = cate;
			that.selectOrder = selectOrder;
			that.clickleft = 1;
			
		  },
		
		  /**
		   * 商品展示滚动
		   */
		  onGoodsScroll: function (e) {
		    var scare = e.detail.scrollWidth / 250,
		      scrollTop = e.detail.scrollTop,
		      h = 0,
		      selectOrder,
		      len = this.menu_list.length;
		
		    this.menu_list.forEach(function (classify, i) {
		      var _h = 37.5 + classify.menu.length * 94 ;
		      //console.log("srcollTop:" + scrollTop);
		      //console.log(h - 100 / scare);
		       console.log('classify==', classify);
		      // console.log('i====',i)
		      if (scrollTop >= h) {
		        selectOrder = classify.id;
		      }
		      h += _h;
		    });
		
		    if (this.clickleft == 1) {
			  
			  this.clickleft = 0;
		      
		    } else {
		      
			  this.selectOrder = selectOrder
			
		    }
		
		    // this.setData({
		    //   selectOrder: selectOrder
		    // });
		  },
		  showCartDetailf: function (e) {
			var that = this;
			this.is_show_choose_specs = false;
		    		   
		    console.log(this.showCartDetail);
		    // this.setData({
		   
		    //   showCartDetail: true
		    // })
		    if (!this.showCartDetail) {
		      var animation = uni.createAnimation({
		        duration: 200,
		        timingFunction: "linear",
		        delay: 0
		      })
		      animation.translateY(300).step()
			  
			  this.animationData = animation.export();
			  this.showCartDetail = true;
			  
		     
		      setTimeout(function () {
				  
		        animation.translateY(0).step()			
				this.animationData = animation.export();
		    
		      }.bind(this), 200)
		    } else {
		      var animation = uni.createAnimation({
		        duration: 200,
		        timingFunction: "linear",
		        delay: 0
		      })
		      animation.translateY(200).step()
			  
			  this.animationData = animation.export();
		  
		      setTimeout(function () {
		        animation.translateY(0).step()
				
				this.showCartDetail = false;
		       
		      }.bind(this), 200)
		    }
		   
		     userInfo = that.abotapi.get_user_info();
		    //调用点击购物车接口 
		
		    console.log('that.data.cartlist', that.cartlist)
		
		
		  },
		  hiddenCartDetailf: function () {
			  
			  this.showCartDetail = false;
		
		    console.log(this.showCartDetail);
		  },
		
		
		
		  //点击加入购物车
		  tapAddCart: function (e) {
		
		    // var last_url = '/pages/shops/shop_detail';
		    // app.goto_user_login(last_url, 'normal');
		    console.log('menu_list===00000', this.menu_list)
		
		    this.touchOnGoods(this, e);
		    var that = this;
		    var menu = that.menu_list;
		    var productid = e.currentTarget.dataset.productid;
		    var shopId = that.shopId;
		    var idx1 = e.currentTarget.dataset.idx1;
		    var idx2 = e.currentTarget.dataset.idx2;
		    var is_waimai = that.is_waimai;
		    console.log('gggggfffffssss', is_waimai);
		    // 获取购物车的缓存数组（没有数据，则赋予一个空数组）  
		    if (is_waimai == 1) {
		      var cart_list = uni.getStorageSync('waimai_list_' + shopId) || [];
		      console.log("waimai_list_,{}", cart_list);
		    }else{
		      var cart_list = uni.getStorageSync('cart_list_' + shopId) || [];
		      console.log("cart_list,{}", cart_list);
		    }
		    
		    
		    if (cart_list.length > 0) {
		      // 遍历购物车数组  
		      for (var j in cart_list) {
		        // 判断购物车内的item的id，和事件传递过来的id，是否相等  
		        if (cart_list[j].productid == productid) {
		          // 相等的话，给count+1（即再次添加入购物车，数量+1）
		         
		            cart_list[j].count = cart_list[j].count + 1;
		               
		          // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  
		         
				 console.log('55555', that.cartlist)
				 
				  try {
		            if(is_waimai == 1){
		              uni.setStorageSync('waimai_list_' + shopId, cart_list)
		            }else{
		              uni.setStorageSync('cart_list_' + shopId, cart_list)
		            }
		            
		          } catch (e) {
		            console.log(e)
		          }
		          //关闭窗口
		          uni.showToast({
		            title: '加入购物车成功！',
		            icon: 'success',
		            duration: 2000
		          });
				  
				  console.log('0000000')
				  that.cartlist = cart_list;
		         console.log('1111111')
		          that.sum();
		          // this.closeDialog();
		          // 返回（在if内使用return，跳出循环节约运算，节约性能） 
		          return;
		        }
		      }
		      // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组
		
		      if (that.is_show_choose_specs) {
		        menu[idx1].menu[idx2].spec_list = that.select_specs;
		      }
		      menu[idx1].menu[idx2].count = 1; 
		      cart_list.push(menu[idx1].menu[idx2]);
		    } else {
		
		      if (that.is_show_choose_specs) {
		        menu[idx1].menu[idx2].spec_list = that.select_specs;
		      }
		
		      menu[idx1].menu[idx2].count = 1;
		      cart_list.push(menu[idx1].menu[idx2]);
		    }
		    // 最后，把购物车数据，存放入缓存  
		    try {
		      // cosole.log('is_waimai____', is_waimai);
		      if (is_waimai == 1){
		        uni.setStorageSync('waimai_list_' + shopId, cart_list) 
		      }else{
		        uni.setStorageSync('cart_list_' + shopId, cart_list) 
		      }
		          
		      // 返回（在if内使用return，跳出循环节约运算，节约性能） 
		      //关闭窗口
		      uni.showToast({
		        title: '加入购物车成功！',
		        icon: 'success',
		        duration: 2000
		      });
		
		
		console.log('3333333')
				that.cartlist = cart_list
		console.log('4444444')      
		      that.sum();
		      console.log('ssssssssssssssss',that.cartlist)
		      // this.closeDialog();
		      return;
		    } catch (e) {
		      console.log(e)
		    }
		
		    console.log('menu_list===111111', that.menu_list)
		
		
		  
		  },
		
		
		
		  sum: function (e) {
			  
		    if(this.is_waimai == 1){
		      var cart_list = uni.getStorageSync('waimai_list_' + this.shopId);
		      console.log('waimai_list_====>>>>', cart_list);
		    }else{
		      var cart_list = uni.getStorageSync('cart_list_' + this.shopId);
		      console.log('cart_list_====>>>>', cart_list);
		    }
		    
		    
		    if(cart_list || cart_list != null){
		      var total = 0;
		      var cart_count = 0;
		      for (var i = 0; i < cart_list.length; i++) {
		        total += cart_list[i].count * cart_list[i].price;
		        
		        cart_list[i].price_total = util.sprintf("%6.2f", cart_list[i].count * cart_list[i].price);
		
		        //购物车总数  
		        cart_count += cart_list[i].count;  
		      }
		      if (this.is_waimai == 1) {
		        uni.setStorageSync('waimai_list_' + this.shopId, cart_list);
		      }else{
		        uni.setStorageSync('cart_list_' + this.shopId, cart_list);
		      }
		      
			  console.log('cart_count==',cart_count)
			  
			  this.cartlist = cart_list
			  this.cart_count = cart_count
			  this.total = total.toFixed(2)
		
		    console.log('this.cart_count==',this.cart_count)
		    } 
		  },
		
		
		// 增加数量
		  cartAddCart: function (e) {
		    // var last_url = '/pages/menu/menu-list';
		    // app.goto_user_login(last_url, 'normal');
		    var that = this;
		
		    var idx = e.currentTarget.dataset.idx;
		    var count = this.cartlist[idx].count;
		    // 商品总数量+1  
		    this.cartlist[idx].count++;
		
		    // 将数值与状态写回  
			this.cartlist = this.cartlist
		   
		    if(this.is_waimai == 1){
		      uni.setStorageSync('waimai_list' + this.shopId, this.cartlist);
		    } else if (this.is_waimai == 0){
		      uni.setStorageSync('cart_list_' + this.shopId, this.cartlist);
		    }
		    
		
		    this.sum(); 
		    this.touchOnGoods(this, e);
		  },
		
		  //减少数量
		  tapReduceCart: function (e) {
		    var idx = e.currentTarget.dataset.idx;
		    var count = this.cartlist[idx].count;
		    // 商品总数量-1
		    if (count > 1) {
		      this.cartlist[idx].count--;
		      console.log('1111111111',this.cartlist);
		    }else{
		      this.cartlist.splice(idx, 1);
		      if (this.cartlist.length > 0) {
				  this.cartlist = this.cartlist
		        
		        if(this.is_waimai == 1){
		          uni.setStorageSync('waimai_list_' + this.shopId, this.cartlist);
		        } else if (this.is_waimai == 0){
		          uni.setStorageSync('cart_list_' + this.shopId, this.cartlist);
		        }
		        
		      } else {
		        
				this.cartlist = this.cartlist
		        if (this.is_waimai == 1) {
		          uni.setStorageSync('waimai_list_' + this.shopId, []);
		        } else if (this.is_waimai == 0) {
		          uni.setStorageSync('cart_list_' + this.shopId, []);
		        }
		       
		      }
		      console.log('2222222222', this.cartlist);
		      this.sum();
		      return;
		    }
		    // 将数值与状态写回  
			this.cartlist = this.cartlist
		    if(this.is_waimai == 1){
		      console.log('3333333333', this.cartlist);
		      uni.setStorageSync('waimai_list_' + this.shopId, this.cartlist);
		    }else{
		      console.log('444444444444', this.cartlist);
		      uni.setStorageSync('cart_list_' + this.shopId, this.cartlist);
		    }
		    
		    this.sum();
		  },
		  
		
		  /* 删除item */
		  // delGoods: function (e) {
		  //   this.data.carts.splice(e.target.id.substring(3), 1);
		  //   // 更新data数据对象  
		  //   if (this.data.carts.length > 0) {
		  //     this.setData({
		  //       carts: this.data.carts
		  //     })
		  //     uni.setStorageSync('cart', this.data.carts);
		  //     this.priceCount();
		  //   } else {
		  //     this.setData({
		  //       cart: this.data.carts,
		  //       iscart: false,
		  //       hidden: true,
		  //     })
		  //     uni.setStorageSync('cart', []);
		  //   }
		
		
		
		
		
		
		  //调用的方法
		  touchOnGoods: function(that, e) {
			  console.log('touchOnGoods==',e);
		    if (!this.hide_good_box) return;
		    that.finger = {}; var topPoint = {};
		    that.finger['x'] = e.touches["0"].clientX;//点击的位置
		    that.finger['y'] = e.touches["0"].clientY;
		
		console.log('that.finger==',that.finger['y']);
		
		    if(that.finger['y'] < that.busPos['y']) {
		      topPoint['y'] = that.finger['y'] - 150;
		    } else {
		      topPoint['y'] = that.busPos['y'] - 150;
		    }
		      topPoint['x'] = Math.abs(that.finger['x'] - that.busPos['x']) / 2;
		
		    if (that.finger['x'] > that.busPos['x']) {
		      topPoint['x'] = (that.finger['x'] - that.busPos['x']) / 2 + that.busPos['x'];
		    } else {//
		      topPoint['x'] = (that.busPos['x'] - that.finger['x']) / 2 + that.finger['x'];
		    }
		    that.linePos = util.bezier([that.busPos, topPoint, that.finger], 20);
		    console.log('bezier_points', that.linePos)
		    that.startAnimation(that, e);
		},
		
		startAnimation:function (that, e) {
		  var index = 0,
		    bezier_points = that.linePos['bezier_points'];
			
			that.hide_good_box = false;
			that.bus_x = that.finger['x'];
			that.bus_y = that.finger['y'];
		  
		  var len = bezier_points.length;
		  index = len
		  var i = index -1;
		  that.timer = setInterval(function () {
		
		      if(i > -1){
				  
				  that.bus_x = bezier_points[i]['x']
				  that.bus_y = bezier_points[i]['y']
		        
		        i--;
		      }
		      
		      if (i < 1) {
		        clearInterval(that.timer);
				
				that.hide_good_box = true;
		      
		      }
		  }, 15);
		},
		
		
		 
		
		
		  
		  
		
		
		
		
		  //保存购物车的东西
		  saveCart: function (count, total) {
		    console.log(typeof total, total);
		    if (isNaN(total))
		      total = 0;
		    console.log(typeof total, total);
		    total = Math.round(parseFloat(total));
		    this.setData({
		      cart: {
		        count: count,
		        total: total
		      }
		    });
		    uni.setStorage({
		      key: 'orderList',
		      data: {
		        cartList: this.cartList,
		        count: this.cart.count,
		        total: this.cart.total
		      }
		    });
		  },
		  submit: function (e) {
		    console.log('waimai======>',this.is_waimai);
		    var last_url = '/pages/menu/menu-list?xianmai_shangid=' + this.shopId + '&is_waimai=' + this.is_waimai;
		    
		    app.goto_user_login(last_url, 'normal');
		    
		    if ((!userInfo) || (!userInfo.userid)) {
		      return;
		    }
		
		    if(this.cartlist.length == 0){
		      uni.showModal({
		        title: '提示',
		        content: '购物车空空如也~',
		        showCancel: false,
		        success(res) {
		
		        }
		      })
		      return;
		    }
		    
		
		    var total = this.total
		    uni.navigateTo({
		      url: '/pages/order/pay?shopId=' + this.shopId + '&total=' + this.total + '&cart_count=' + this.cart_count + '&is_waimai=' + this.is_waimai
		    })
		  },
		
		  shopdetail: function (e) {
		    uni.navigateTo({
		      url: '/pages/menu/menu-detail',
		    })
		  },
		  
		  toPageIndex:function(e){
		    uni.navigateTo({
		      url: '/pages/shops/shop_detail?id=' + this.shopId,
		    })
		  },
		
		
		  //显示选择规格弹窗
		  chooseSpecs: function (e) {
		    var that = this;
		    var index1 = e.currentTarget.dataset.idx1;
		    var index2 = e.currentTarget.dataset.idx2;
		
		    var spec_list = this.menu_list[index1].menu[index2].spec_list;
		
		
		    console.log('sssss', this.menu_list)
		
		    var currentSpecsIdx = [];
		
		    for(var i=0; i<spec_list.length; i++){
		      currentSpecsIdx[i] = 0;
		    }
		
		
		    console.log('spec_list=====', spec_list)
		    // spec_list.forEach(function (sku_item, i) {
		    //   spec_list[i].img = that.data.menu_list[index1].menu[index2].img
		    // });
		
		
			this.product_index1 = index1,
			this.product_index2 = index2,
			this.spec_list = spec_list,
			this.product = this.menu_list[index1].menu[index2],
			this.is_show_choose_specs = true,
			this.currentSpecsIdx = currentSpecsIdx
		
		  
		
		    this.getSelectSpecs();
		
		  },
		
		  //选择规格
		  doChooseSpecs: function (e) {
		    var index = e.currentTarget.dataset.idx;
		    var index2 = e.currentTarget.dataset.idx2;
		
		    
		    var key = 'currentSpecsIdx[' + index + ']';
			
			// this.setData({
			//   [key]: index2, 
			// })
			
			this.currentSpecsIdx[index] = index2;
		
			
		    
		    this.getSelectSpecs();
		    console.log('e========', e)
		
		    console.log('currentSpecsIdx', key)
		    console.log('currentSpecsIdx', this.currentSpecsIdx);
		    
		   
		
		  },
		
		  getSelectSpecs:function(){
		    
		    var currentSpecsIdx = this.currentSpecsIdx
		    var select_specs = '';
		
		
		    for(var key in currentSpecsIdx){
		
		      select_specs += this.spec_list[key][1][currentSpecsIdx[key]] + " "
		    }
		
		
		    select_specs.substr(0, select_specs.length - 1);
		      
		    console.log('select_specs===', select_specs)
		
			this.select_specs = select_specs
		
		  },
		
		
		  //关闭选择规格
		  closeChooseSpecs: function (e) {
			  
			this.is_show_choose_specs = false
		   
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
