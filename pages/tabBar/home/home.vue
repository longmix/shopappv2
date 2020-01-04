<template>
	<view>
		<!-- 状态栏 -->
		<view v-if="showHeader" class="status" :style="{ position: headerPosition,top:statusTop,opacity: afterHeaderOpacity}"></view>
		<!-- 顶部导航栏 -->
		<view v-if="showHeader" class="header" :style="{ position: headerPosition,top:headerTop,opacity: afterHeaderOpacity }">
			<!-- 定位城市 -->
			<view class="addr" :style="{fontSize:current_citynameWidth+'px'}">
				<view class="icon location"></view>
				<view>{{current_cityname}}</view>
			</view>
			<!-- 搜索框 -->
			<view class="input-box">
				<input
					placeholder="默认关键字"
					placeholder-style="color:#c0c0c0;"
					@tap="toSearch()"
				/>
				<view class="icon search"></view>
			</view>
			<!-- 右侧图标按钮 -->
			<view class="icon-btn">
				<view class="icon yuyin-home"></view>
				<view class="icon tongzhi" @tap="toMsg"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view v-if="showHeader" class="place"></view>
		<!-- 轮播图 -->
		<view class="swiper">
			<view class="swiper-box">
				<swiper circular="true" autoplay="true" @change="swiperChange">
					<swiper-item v-for="swiper in productLists" :key="swiper.id" @click="toAdDetails(swiper.url)">
						<image  :src="swiper.image" mode="widthFix"></image>
					</swiper-item>
				</swiper>
				<view class="indicator">
					<view class="dots" v-for="(swiper, index) in swiperList" :class="[currentSwiper >= index ? 'on' : '']" :key="index"></view>
				</view>
			</view>
		</view>
		<!--商户头条start-->
		    <view v-if="wxa_show_toutiao == 1">
			   <view class="toutiao">
					<view class="toutiao_left" @tap="touTiaoList" v-if="!wxa_shop_toutiao_icon">
						<image :src="wxa_shop_toutiao_icon"></image>
					</view>
					<view class="toutiao_left" @tap="touTiaoList" v-if="wxa_shop_toutiao_icon">
						<image :src="wxa_shop_toutiao_icon"></image>
					</view>
					<swiper class="toutiao_right" vertical="true" autoplay="true" circular="true" interval="2000" v-if="!wxa_shop_toutiao_flash_line||wxa_shop_toutiao_flash_line!=2">
						<swiper-item v-for="(item,index) in articlelist" :key="index">
							<view class="toutiao_right" @tap="touTiaoList(item.id)" >
								<text>{{item.title}}</text>
							</view>
						</swiper-item>
					</swiper>
				
					<swiper class="toutiao_right2" vertical="true" autoplay="true" circular="true" interval="2000" v-if="wxa_shop_toutiao_flash_line==2">
						<swiper-item v-for="(item2,index2) in articlelist2" :key="index2" @tap="touTiaoList(item2.id)">
							<view>•  {{item2[0].title}}</view>
							<view>•  {{item2[1].title}}</view>
						</swiper-item>
					</swiper>
			   </view>
		   </view>
		   <!--商户头条end-->
		
		<!-- 首页导航图标列表 -->
		<view class="category-list">
			<view class="category" :style="wxa_show_icon_index_count== 4? 'width:25%':'width:20%'" v-for="(item, index) in index_icon_list"	:key="index" @click="toAdDetails(item.url)"> <!--  -->
				<view >
					<view class="img"><image :src="item.src"></image></view>
					<view class="text">{{ item.name }}</view>
				</view>
			</view>
		</view>
		<!-- 广告图 -->
		<view v-for="(tab,index) in pictures" :key="index" @click="toAdDetails(tab.url)">
			<view class="banner" >
				<image :src="tab.image" style="width: 100%;vertical-align: middle;" mode="widthFix"></image>
			</view>
		</view>
		<!-- 活动区 -->
		<view class="promotion">
			<view class="text">优惠专区</view>
			<view class="list">
				<view class="column" v-for="(row, index) in Promotion" @tap="toPromotion(row)" :key="index">
					<view class="top">
						<view class="title">{{ row.title }}</view>
						<view class="countdown" v-if="row.countdown">
							<view>{{ row.countdown.h }}</view>
							:
							<view>{{ row.countdown.m }}</view>
							:
							<view>{{ row.countdown.s }}</view>
						</view>
					</view>
					<view class="left">
						<view class="ad">{{ row.ad }}</view>
						<view class="into">点击进入</view>
					</view>
					<view class="right"><image :src="row.img"></image></view>
				</view>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="title">
				<image src="/static/img/hua.png"></image>
				猜你喜欢
				<image src="/static/img/hua.png"></image>
			</view>
			<view class="product-list">
				<view class="product" v-for="(product,index) in productList" :key="index" @click="toGoods(product)">
					<image mode="widthFix" :src="product.picture"></image>
					<view class="name">{{ product.name }}</view>
					<view class="info">
						<view class="price">{{ product.price }}</view>
						<view class="slogan">{{ product.slogan }}</view>
					</view>
				</view>
			</view>
			<view class="loading-text"><label v-if="!productList">{{ loadingText }}</label></view>
		</view>
	</view>
</template>

<script>

var ttt = 0;
//高德SDK
import bmap from '../../../common/SDK/bmap-wx.js';
export default {
	data() {
		return {
			ak: "",	//填写申请到的ak，从shop_option中获取 baidu_map_ak_wxa这个属性
			markers: [],
			longitude: '', 	//经度
			latitude: '',	//纬度
			address: '',		//地址
			cityInfo: {},		//城市信息
			wxMarkerData:'',
			articlelist:'',
			articlelist2:'',
			wxa_show_toutiao:'',
			wxa_shop_toutiao_flash_line:'',
			addListener:'',
			wxa_show_icon_index_count:'',
			current_cityname:'',
			current_citynameLength:'',
			current_citynameWidth:'',
			wxa_shop_toutiao_icon:'',
			
			
			showHeader:true,
			afterHeaderOpacity: 1,//不透明度
			headerPosition: 'fixed',
			headerTop:null,
			statusTop:null,
			nVueTitle:null,
			productLists:'',
			pictures:'',
			yingxiao_list:'',
			page_num:1,
			page_size:5,
			is_OK:false,
			cb_params:'',
			city: '北京',
			currentSwiper: 0,
			// 轮播图片
			
			swiperList: [
				{ id: 1, src: 'url1', img: '/static/img/1.jpg' },
				{ id: 2, src: 'url2', img: '/static/img/2.jpg' },
				{ id: 3, src: 'url3', img: '/static/img/3.jpg' }
			],
			index_icon_list:'',
			Promotion: [],
			//猜你喜欢列表
		
			productList:'',
			loadingText: '正在加载...'
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
		var that = this;
		 
		this.abotapi.set_option_list_str(this, this.callback_function);
		this.abotapi.get_shop_info_from_server(this.callback_func_for_shop_info);
		
		uni.getLocation({
		    type: 'wgs84',
		    success: function (res) {
		        console.log('当前位置的经度：' + res.longitude);
		        console.log('当前位置的纬度：' + res.latitude);
		    }
		});
		
		that.get_flash_ad_list();	
		that.get_flash_img_list();
		that.initArticleList();
		that.get_shop_icon_index();
		
		that.get_product_list();	
		
		// #ifdef APP-PLUS
		this.nVueTitle = uni.getSubNVueById('homeTitleNvue');
		this.nVueTitle.onMessage(res => {
			let type = res.data.type;
			if(type=='focus'){
				this.toSearch();
			}
		});
		this.showHeader = false;
		this.statusHeight = plus.navigator.getStatusbarHeight();
		// #endif
		
		//开启定时器
		this.Timer();
		//加载活动专区
		this.loadPromotion();
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
			uni.request({
			    url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=product_list',
			    method: 'post',
			    data: {
					sellerid:this.abotapi.globalData.default_sellerid,
					sort: 1,
					page: that.page,
					page_size:that.page_size,
			    },
			    header: {
					'Content-Type': 'application/x-www-form-urlencoded'
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
		
		
		//首页导航图标、轮播图、平面广告跳转
		toAdDetails:function(url){
			var var_list = Object();
			console.log('toAdDetails- to url ====>>>>>>', url);
			this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
			
		}
	}
};
</script>
<style lang="scss">
page{position: relative;background-color: #fff;}

.pullDown-effects{
	position: fixed;
	//top: calc(100upx - 36vw);
	top: 0;
	z-index: 9;
	width: 100%;
	height: 36vw;
	/*  #ifdef  APP-PLUS  */
	padding-top: var(--status-bar-height);
	/*  #endif  */
	image{
		width: 100%;
		height: 36vw;
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

	.addr {
		width: 120upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		// font-size: 28upx;
		.icon {
			height: 60upx;
			margin-right: 5upx;
			display: flex;
			align-items: center;
			font-size: 42upx;
			color: #ffc50a;
		}
	}
	.input-box {
		width: 100%;
		height: 60upx;
		background-color: #f5f5f5;
		border-radius: 30upx;
		position: relative;
		display: flex;
		align-items: center;
		.icon {
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			right: 0;
			width: 60upx;
			height: 60upx;
			font-size: 34upx;
			color: #c0c0c0;
		}
		input {
			padding-left: 28upx;
			height: 28upx;
			font-size: 28upx;
		}
	}
	.icon-btn {
		width: 120upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;
		.icon {
			width: 60upx;
			height: 60upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 42upx;
		}
	}
}
.place {
	background-color: #ffffff;
	height: 100upx;
	/*  #ifdef  APP-PLUS  */
	margin-top: var(--status-bar-height);
	/*  #endif  */
}
.swiper {
	width: 100%;
	margin-top: 10upx;
	display: flex;
	
	justify-content: center;
	.swiper-box {
		width: 92%;
		// height: 30.7vw;

		overflow: hidden;
		border-radius: 15upx;
		box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
		//兼容ios，微信小程序
		position: relative;
		z-index: 1;
		swiper {
			width: 100%;
			// height: 30.7vw;
			swiper-item {
				image {
					width: 100%;
				}
			}
		}
		.indicator {
			position: absolute;
			bottom: 20upx;
			left: 20upx;
			background-color: rgba(255, 255, 255, 0.4);
			width: 150upx;
			height: 5upx;
			border-radius: 3upx;
			overflow: hidden;
			display: flex;
			.dots {
				width: 0upx;
				background-color: rgba(255, 255, 255, 1);
				transition: all 0.3s ease-out;
				&.on {
					width: (100%/3);
				}
			}
		}
	}
}

.category-list {
	width: 100%;
	margin: 0 4%;
	padding: 0 0 30upx 0;
	border-bottom: solid 2upx #f6f6f6;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.category {
		width: 25%;
		margin-top: 50upx;
		display: flex;
		flex-wrap: wrap;
		.img {
			width: 100%;
			display: flex;
			justify-content: center;
			image {
				width: 9vw;
				height: 9vw;
			}
		}
		.text {
			margin-top: 16upx;
			width: 100%;
			display: flex;
			justify-content: center;
			font-size: 24upx;
			color: #3c3c3c;
		}
	}
}
.banner_with_shadow {
	width: 92%;
	margin: 40upx 4%;
	image {
		border-radius: '';
		box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.3);
	}
}

.banner {
	width: 100%;
	margin: 0;
	image {
		border-radius: '';
	}
}

.toutiao{
  width:100%;
  height:50px;
  margin:10px auto;
  background-color: #fff;
  clear: both;
}

.toutiao_left{
  width:15%;
  height:50px;
  float:left;
}

.toutiao_left image{
  width:80%;
  height:100%;
  float:left;
}

.toutiao_right{
  width:85%;
  height:50px;
  float:left;
  font-size:16px;
  line-height:50px;
  color:#666666;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.toutiao_right2{
  width:85%;
  height:50px;
  float:left;
  font-size:13px;
  line-height:50rpx;
  color:black;
  overflow: hidden;
  letter-spacing: 3rpx;
  text-overflow: ellipsis;
}




.promotion {
	width: 92%;
	margin: 50upx 4% 20upx;
	.text {
		width: 100%;
		height: 60upx;
		font-size: 34upx;
		font-weight: 600;
		margin-top: -10upx;
	}
	.list {
		width: 100%;
		display: flex;
		justify-content: space-between;
		.column {
			width: 43%;
			padding: 15upx 3%;
			background-color: #ebf9f9;
			border-radius: 10upx;
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.top {
				width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;
				margin-bottom: 5upx;
				.title {
					font-size: 30upx;
				}
				.countdown {
					margin-left: 20upx;
					display: flex;
					height: 40upx;
					display: flex;
					align-items: center;
					font-size: 20upx;
					view {
						height: 30upx;
						background-color: #f06c7a;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #fff;
						border-radius: 4upx;
						margin: 0 4upx;
						padding: 0 2upx;
					}
				}
			}
			.left {
				width: 50%;
				height: 18.86vw;
				display: flex;
				flex-wrap: wrap;
				align-content: space-between;
				.ad {
					margin-top: 5upx;
					width: 100%;
					font-size: 22upx;
					color: #acb0b0;
				}
				.into {
					width: 100%;
					font-size: 24upx;
					color: #aaa;
					margin-bottom: 5upx;
				}
			}
			.right {
				width: 18.86vw;
				height: 18.86vw;
				image {
					width: 18.86vw;
					height: 18.86vw;
				}
			}
		}
	}
}
.goods-list {
	// background-color: #f4f4f4;
	.title {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		color: #f47825;
		font-size: 30upx;
		margin-top: 10upx;
		image {
			width: 30upx;
			height: 30upx;
		}
	}
	.loading-text {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60upx;
		color: #979797;
		font-size: 24upx;
	}
	.product-list {
		width: 92%;
		padding: 0 4% 3vw 4%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.product {
			width: 48%;
			border-radius: 20upx;
			background-color: #fff;
			margin: 0 0 15upx 0;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);
			image {
				width: 100%;
				border-radius: 20upx 20upx 0 0;
			}
			.name {
				width: 92%;
				padding: 10upx 4%;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				text-align: justify;
				overflow: hidden;
				font-size: 30upx;
			}
			.info {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				width: 92%;
				padding: 10upx 4% 10upx 4%;

				.price {
					color: #e65339;
					font-size: 30upx;
					font-weight: 600;
				}
				.slogan {
					color: #807c87;
					font-size: 24upx;
				}
			}
		}
	}
}
</style>
