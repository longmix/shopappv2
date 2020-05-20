<template>
	<view>
		<!-- 状态栏 -->
		<view v-if="showHeader" class="status" :style="{ position: headerPosition,top:statusTop,opacity: afterHeaderOpacity}"></view>
		<!-- 顶部导航栏 -->
		<view v-if="showHeader" class="header" :style="{ position: headerPosition,top:headerTop,opacity: afterHeaderOpacity }">
			<!-- 定位城市 -->
			<navigator url="../locationList/locationList" class="addr" :style="{fontSize:current_citynameWidth+'px'}">
				<view class="icon location"></view>
				<view style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap; ">{{current_cityname}}</view>
			</navigator>
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
				<view class="icon yuyin-home" style="display: none;"></view>
				<view class="icon tongzhi" @tap="toMsg"></view>  <!-- 下版本换为:toMsg -->
			</view>
		</view>
		<!-- 占位 -->
		<view v-if="showHeader" class="place"></view>
		<!-- 轮播图 -->
		<view class="swiper">
			<view class="swiper-box">
				<swiper circular="true" autoplay="true" @change="swiperChange" :style="{height:imgheights[current] + 'px'} ">
					<swiper-item v-for="(swiper,index) in flash_ad_list" :key="swiper.id" @click="toAdDetails(swiper.url)">
						<image @load="imageLoad($event)"  :data-id='index' :src="swiper.image" mode="widthFix"></image>
					</swiper-item>
				</swiper>
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
		<view v-for="(tab,index) in flash_img_list" :key="index" @click="toAdDetails(tab.url)">
			<view class="banner" >
				<image :src="tab.image" style="width: 100%;vertical-align: middle;" mode="widthFix"></image>
			</view>
		</view>
		<!-- 活动区 -->
		<!-- <view class="promotion">
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
		</view> -->
		
		<!-- 实体商家列表 -->
		<view v-if="twoArr" style='background-color: #f4f4f4;padding-top: 20upx;'>
			<block v-for="item in twoArr" :key="item.message" style="background-color: #ffffff;">
				
				<view class="shang_box" @click="toShang_detail($event)" :data-shangid="item.xianmai_shangid">
					<view style="width:200upx;height:200upx;margin-left: 20upx;">
						
						<image style="width:200upx;height:200upx;" :src="item.icon_image"></image>
					</view>
					<view style="width:100%;margin-left: 20upx;">
						<view> 
							<view style="font-size: 30upx;color:#333;">{{item.name}}</view>
							<view style="display: flex; align-items:center;justify-content:space-between;">
								<view style="display: flex;">
									<image v-for="items in item.star_level" :key="items.message" style="width: 40upx;height: 40upx;" src="../../static/img/VIP.png"></image>
									
								</view>
								<view style="margin-right: 30rpx;font-size: 24upx;">
									{{item.dis}}
								</view>
							</view>
							<view style="font-size: 24upx;color:#666;">{{item.city_name}}|{{item.cata_name}}</view>
							<!-- <view v-if="item.spec != ''" style="display: flex;align-items: center;flex-wrap: wrap;">
								<view v-for="(items,index) in item.spec" :key="index" style="padding:4px 10upx;margin:10upx 10upx 0upx 0upx;border-radius:6upx;background: #ff8000 linear-gradient(to right, rgba(255,255,255,0), rgba(2555,255,255,.5));font-size: 24upx;color:#fff;">{{items}}</view>
								
							</view> -->
							<view v-if="item.spec != ''" style="display: flex;flex-wrap:wrap;">
								<view v-for="items in item.spec" :key="items" class="youhui-biaoqian">{{items}}</view>
								
								
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 实体商家结束 -->
		
		<!-- 商品列表 -->
		<view class="goods-list" style="margin-top: 40upx;">
			<!-- <view class="title">
				<image src="/static/img/hua.png"></image>
				猜你喜欢
				<image src="/static/img/hua.png"></image>
			</view> -->
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
		
		<!-- 客服按钮 -->
		<view class="u-tap-btn" v-if="wxa_show_kefu_button==1">
			<block v-if="wxa_kefu_button_type==1">
				<button class="u-go-home2" @tap="call_seller" :style="{backgroundColor:wxa_kefu_bg_color}">
					<image :src="wxa_kefu_button_icon" mode="widthFix"></image>
				</button>
			</block>
			<block v-if="wxa_kefu_button_type==2">
				<button class="u-go-home2" @tap="toAdDetails(wxa_kefu_form_url)" :style="{backgroundColor:wxa_kefu_bg_color}">
					<image :src="wxa_kefu_button_icon" mode="widthFix"></image>
				</button>
			</block>
			<block v-if="wxa_kefu_button_type==3">
				<button class="u-go-home2" openType="contact" :style="{backgroundColor:wxa_kefu_bg_color}">
					<image :src="wxa_kefu_button_icon" mode="widthFix"></image>
				</button>
			</block>
		</view>
		
	</view>
</template>

<script>

var ttt = 0;
//高德SDK
import bmap from '../../common/SDK/bmap-wx.js';
import io from '../../common/weapp.socket.io.js'; 

//import abotapi001 from '../../../common/abotapi.js';

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
			is_shangjia:1,
			
			showHeader:true,
			afterHeaderOpacity: 1,//不透明度
			headerPosition: 'fixed',
			headerTop:null,
			statusTop:null,
			nVueTitle:null,
			
			currentSwiper: 0,
			// 轮播图片
			
			flash_ad_list:null,
			flash_img_list:null,
			index_icon_list:null,
			
			yingxiao_list:'',
			page_num:1,
			page_size:5,
			is_OK:false,
			cb_params:'',
			city: '北京',
			
			coordinate:'',
			
			Promotion: [],
			//猜你喜欢列表
			twoArr:'',
			page:'',
			productList:'',
			loadingText: '正在加载...',
			imgheights: [],
			current: 0,
			windowHeight: 0,
			sugData:'',
			
			//客服相关
			wxa_show_kefu_button:'',
			wxa_kefu_button_type:'',
			wxa_kefu_button_icon:'',
			wxa_kefu_mobile_num:'',
			wxa_kefu_form_url:'',
			wxa_kefu_bg_color:'',
			supplierid: ''
		};
	},
	onPageScroll: function (e) {
		//兼容iOS端下拉时顶部漂移
		this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
		this.headerTop = e.scrollTop>=0?null:0;
		this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
		
		
		
	},
	//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh: function () {
		var that = this;
		
		uni.removeStorageSync("coordinate_array");
		uni.removeStorageSync("cata_list");
		uni.removeStorageSync("spec_list");
		uni.removeStorageSync('all_shang_jingwei_list');
		
		that.abotapi.get_shop_info_from_server_remove();
		that.abotapi.set_shop_option_data_remove();
		that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);
		that.abotapi.get_shop_info_from_server(that.callback_func_for_shop_info);
		
		
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
	onReachBottom: function () {
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
	onLoad: function (options) {
		this.bindKeyInput();
		console.log('pages/tabBar/index/index====>>>>', options);
		
		
		var that = this;
		
		uni.getSystemInfo({
		    success: function (res) {
				
				that.windowHeight = res.windowHeight;
				
		    }
		});
		
		//=====判断sellerid和parentid Begin=====
		var sellerid = null;
		
		console.log('sellerid 01：' + sellerid);
	
		if (options && options.parentid) {
		  this.abotapi.set_current_parentid(options.parentid);
		}
		else if (options && options.scene) {
		  var parentid_value = decodeURIComponent(options.scene);
	
		  console.log('来自小程序码的推荐者ID：' + parentid_value);
		  if (parentid_value && (parentid_value.indexOf('parentid_') != -1)) {
			parentid_value = parentid_value.replace('parentid_', '');
	
			this.abotapi.set_current_parentid(parentid_value);
		  }
		  else {
			console.log('推荐者ID：' + parentid_value + '不是 parentid_开头的，默认为sellerid的值');
	
			sellerid = options.scene;
	
			console.log('sellerid 0101：' + sellerid);
	
		  }
	
		}
	
		if (options || options != null) {
		  if (!sellerid) {
			sellerid = options.sellerid;
			console.log('sellerid 02：' + sellerid);
		  }
	
		  if (!sellerid) {
			var sellerid_scene = decodeURIComponent(options.scene);
			if (sellerid_scene && sellerid_scene.indexOf('sellerid_') != -1) {
			  sellerid = sellerid_scene.replace('sellerid_', '');
			}
	
			console.log('sellerid 03：' + sellerid);
	
		  }
		}
		if (!sellerid) {
		  sellerid = this.abotapi.get_sellerid();
		  console.log('sellerid 04：' + sellerid);
		}
	
		console.log('sellerid 05：' + sellerid);
	
		if (!sellerid) {
		  console.log('!!!!!!缺少商户ID，使用默认的' + this.abotapi.globalData.default_sellerid);
		  sellerid = this.abotapi.globalData.default_sellerid;
	
		}
	
		if (this.abotapi.globalData.force_sellerid == 1) {
		  sellerid = this.abotapi.globalData.default_sellerid;
		}
	
		console.log('sellerid 06：' + sellerid);
	
		this.abotapi.globalData.default_sellerid = sellerid
		this.abotapi.set_sellerid(sellerid);
		//========  End =======
			
			
		
		this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
		this.abotapi.get_shop_info_from_server(this.callback_func_for_shop_info);
		
		
		//this.abotapi.get_location(this, this.call_back_get_shang_list);

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
	onShow:function(){
		
		var city_name = uni.getStorageSync('city_name');
		if(city_name){
			this.current_cityname = city_name;
		}
	},
	
	
	
	methods: {
		bindKeyInput: function() {
			
		        var that = this; 
		        // 新建百度地图对象 
		        var BMap = new bmap.BMapWX({ 
		            ak: 'OTsGerqQhowGSFOWG8c6p86R' 
		        }); 
				
		        var fail = function(data) { 
		            console.log(data) 
		        }; 
		        var success = function(data) { 
		            var sugData = ''; 
		            for(var i = 0; i < data.result.length; i++) { 
		                sugData = sugData + data.result[i].name + '\n'; 
		            } 
					console.log('sugData',sugData);
		           
		            this.sugData = sugData ;
		            
		        } 
				BMap.geocoding({
									 address: "北京市海淀区上地十街10号", 
									 fail: fail, 
									 success: success, 
									 iconPath: '../../img/marker_red.png', 
									 iconTapPath: '../../img/marker_red.png' 
				});
				
		       // 发起suggestion检索请求 
		        BMap.suggestion({ 
		            query: '内外联大厦881号', 
		            region: '上海', 
		            city_limit: true, 
		            fail: fail, 
		            success: success 
		        });
				 
				 
		    },

		callback_function_shop_option_data:function(that, cb_params){
			
			if(!cb_params){
				return;
			}
			
			console.log('cb_params====', cb_params);
			
			//var userInfo = that.abotapi.get_user_info();
			
			
			
			//====1、更新界面的颜色
			that.abotapi.getColor();
			
			
			if(!cb_params.option_list){
				return;
			}
			
			//====2、其他的设置选项：商品列表风格、头条图标等等
			if (cb_params.option_list.wxa_product_list_style) {
			    
			      that.wxa_product_list_style = cb_params.option_list.wxa_product_list_style
			    
			  }
			if (cb_params.option_list.wxa_shop_toutiao_icon) {
			  
			    that.wxa_shop_toutiao_icon = cb_params.option_list.wxa_shop_toutiao_icon
			  
			}
			if (cb_params.option_list.wxa_show_kucun_in_list) {
			  
			    that.wxa_show_kucun_in_list = cb_params.option_list.wxa_show_kucun_in_list
			  
			}
			if (cb_params.option_list.wxa_show_icon_index_count){
			  
			    that.wxa_show_icon_index_count = cb_params.option_list.wxa_show_icon_index_count
			  
			}
			if (cb_params.option_list.wxa_show_index_icon) {
			  
			   that.wxa_show_index_icon = cb_params.option_list.wxa_show_index_icon
			  
			}
			if (cb_params.option_list.wxa_show_index_swiper) {
			  
			    that.wxa_show_index_swiper = cb_params.option_list.wxa_show_index_swiper
			  
			}
			if (cb_params.option_list.wxa_show_pic_pinpu) {
			  
			    that.wxa_show_pic_pinpu = cb_params.option_list.wxa_show_pic_pinpu
			  
			}
			if (cb_params.option_list.wxa_show_search_input) {
			  
			    that.wxa_show_search_input = cb_params.option_list.wxa_show_search_input
			  
			}
			if (cb_params.option_list.wxa_show_toutiao) {
			  
			    that.wxa_show_toutiao = cb_params.option_list.wxa_show_toutiao
			  
			}
			if (cb_params.option_list.wxa_show_video_player) {
			  
			   that.wxa_show_video_player = cb_params.option_list.wxa_show_video_player
			
			}
			if (cb_params.option_list.wxa_video_player_url) {
			  
			    that.wxa_video_player_url = cb_params.option_list.wxa_video_player_url
			  
			}
			if (cb_params.option_list.wxa_video_screen_url) {
			  
			    that.wxa_video_screen_url = cb_params.option_list.wxa_video_screen_url
			  
			}
			if (cb_params.option_list.wxa_shop_toutiao_flash_line) {
			  
			    that.wxa_shop_toutiao_flash_line = cb_params.option_list.wxa_shop_toutiao_flash_line
			  
			}
					
			if (cb_params.option_list.wxa_hidden_product_list) {
			  
			    that.wxa_hidden_product_list = cb_params.option_list.wxa_hidden_product_list
			  
			}
					
			if (cb_params.option_list.wxa_kefu_button_type) {
			  
			   that.wxa_kefu_button_type = cb_params.option_list.wxa_kefu_button_type
			  
			}
					
			if (cb_params.option_list.wxa_kefu_button_icon) {
			  
			   that.wxa_kefu_button_icon = cb_params.option_list.wxa_kefu_button_icon
			  
			}
					
			if (cb_params.option_list.wxa_kefu_mobile_num) {
			  
			    that.wxa_kefu_mobile_num = cb_params.option_list.wxa_kefu_mobile_num
			  
			}
					
			if (cb_params.option_list.wxa_kefu_form_url) {
			  
			    that.wxa_kefu_form_url = cb_params.option_list.wxa_kefu_form_url
			  
			}
					
			if (cb_params.option_list.wxa_show_kefu_button) {
			  
			    that.wxa_show_kefu_button = cb_params.option_list.wxa_show_kefu_button
			  
			}
					
			if (cb_params.option_list.wxa_kefu_bg_color) {
			    that.wxa_kefu_bg_color = cb_params.option_list.wxa_kefu_bg_color
			}
			
			//更多选项（ShopAppV2）
			that.copyright_text = cb_params.option_list.copyright_text;
			that.wxa_share_title = cb_params.option_list.wxa_share_title;
			that.wxa_share_img = cb_params.option_list.wxa_share_img;
			
			that.roll_picture = cb_params.option_list.roll_picture;
			if(cb_params.option_list.roll_picture == -1){
				that.roll_picture_list = cb_params.option_list.roll_picture_list;
			}
			
			that.pingpu_picture = cb_params.option_list.pingpu_picture;
			if(cb_params.option_list.pingpu_picture == -1){
				that.pingpu_picture_list = cb_params.option_list.pingpu_picture_list;
			}
			
			that.navigation_icon = cb_params.option_list.navigation_icon;
			if(cb_params.option_list.navigation_icon == -1){
				that.navigation_icon_list = cb_params.option_list.navigation_icon_list;
			}
			
			if (cb_params.option_list.default_shang_list_count_in_front_page) {
			  
			    that.abotapi.globalData.default_shang_list_count_in_front_page = cb_params.option_list.default_shang_list_count_in_front_page
			  
			}
			
			
			//====3、获取经纬度坐标，显示当前城市			
			console.log("百度地图AK：" + cb_params.option_list.baidu_map_ak_wxa);
				
			/* 获取定位地理位置 */
			// 新建bmap对象
			// #ifdef H5
				var baidu_map_ak = cb_params.option_list.baidu_map_ak_h5;
			// #endif
			// #ifdef APP-PLUS
				var baidu_map_ak = cb_params.option_list.baidu_map_ak_app;
			// #endif
			// #ifdef MP-WEIXIN
				var baidu_map_ak = cb_params.option_list.baidu_map_ak_wxa;
			// #endif
			
			var BMap_obj = new bmap.BMapWX({
				ak: baidu_map_ak
			});
			
			that.baidu_map_ak = baidu_map_ak;
			
			var that002 = this;
			
			var regeocoding_fail = function (data) {
				console.log('regeocoding_fail333333', data);
				console.log('regeocoding_fail44444', that002.baidu_map_ak);
				
				//调用显示商家的接口
				var coordinate = [];
				coordinate['latitude'] = 31.293216;
				coordinate['longitude'] = 121.662945;
				
				console.log('set virtual coordinate ====>>>>>', coordinate);
				
				that002.call_back_get_shang_list(that002, coordinate);
				
			};
			
			
			
			var regeocoding_success = function (data) {
				console.log('00000111', data);
				
				this.wxMarkerData = data.wxMarkerData;
				this.markers = this.wxMarkerData;
				this.latitude = this.wxMarkerData[0].latitude;
				this.longitude = this.wxMarkerData[0].longitude;
				this.address = this.wxMarkerData[0].address;
				
				console.log('address',this.address);
				
				//调用显示商家的接口
				var coordinate = [];
				coordinate['latitude'] = this.latitude;
				coordinate['longitude'] = this.longitude;
				
				that002.call_back_get_shang_list(that002, coordinate);
				
				
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
				uni.setStorageSync('address_info', this.cityInfo)
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
		
		/* 获取前十条商家 */
		call_back_get_shang_list:function(that, coordinate){
			//获取全部商家 的金纬度
			//coordinate = JSON.stringify(coordinate);
			console.log('coordinatecoordinate===========>>>>', coordinate);
			
			
			
			
			that.coordinate = coordinate;
						
			var arr = uni.getStorageSync('all_shang_jingwei_list');
			if(arr){
				that.set_paixu_shanglist();
			}
			else{
				this.abotapi.abotRequest({
				    url: this.abotapi.globalData.yanyubao_server_url + 'openapi/XianmaiShangData/get_shang_all_jingwei',
				    method: 'post',
				    data: {
						sellerid:this.abotapi.globalData.default_sellerid,
				    },
				    success: function (res) {
						console.log('get_shang_all_jingwei====>>>>>', res);
						
						if (res.data.code != 1) {
						    //显示错误信息						
							return;
						}
						
						uni.setStorageSync("cata_list", res.data.all_cata_list);
						uni.setStorageSync("spec_list", res.data.all_spec_list);
						uni.setStorageSync('all_shang_jingwei_list', res.data.data);
						
						//调用排序算法
						that.set_paixu_shanglist();
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
		//给商家排序
		set_paixu_shanglist:function(){
			var that = this;
			
			
			var arr = uni.getStorageSync('all_shang_jingwei_list');
			
			var shop_location_list = that.jisuan_juli(arr);
			
			console.log('shop_location_list',shop_location_list);
						
			function compare(obj1, obj2) {
			  var val1 = obj1.dis; 
			  var val2 = obj2.dis;
			  if (val1 < val2) {
				return -1;
			  } else if (val1 > val2) {
				return 1;
			  } else {
				return 0;
			  }
			}
			
			
			
			var paixu_shanglist = shop_location_list.sort(compare);
			
			uni.setStorageSync("shop_location_list", paixu_shanglist);
			
			//console.log('要魂村的',);
			var shangid_str = '';//获取商家前十个的商家id
			for(var i = 0; i < 10;i++){
				if(!paixu_shanglist[i]){
					console.log("没有了");
					break;
				}
				shangid_str += paixu_shanglist[i]['xianmai_shangid']+'|';
			}
			//排序
			
			
			//用商家id字符串请求获取商家列表
			that.abotapi.abotRequest({
			    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/XianmaiShangData/get_shang_list',
			    method: 'post',
			    data: {
					sellerid:that.abotapi.globalData.default_sellerid,
					str: shangid_str,
					coordinate_json: JSON.stringify(that.coordinate)
			    },
			    success: function (res) {
					//console.log('get_shang_list===', res.data.xianmai_shang_list);
					
					if (res.data.code != 1) {
					  //显示错误信息
					  return;
					}
							
					var id = 0;
					
					for (var shangid in res.data['xianmai_shang_list']) {
					  //console.log('111111111111111111111111111', res.data['xianmai_shang_list'][shangid]['xianmai_shangid']);
							
					  var xianmai_shangid = res.data['xianmai_shang_list'][shangid]['xianmai_shangid'];
							
					  var disItem = null;
					  for (var iii = 0; iii < shop_location_list.length; iii++) {
						if (shop_location_list[iii]['xianmai_shangid'] == xianmai_shangid) {
						  disItem = shop_location_list[iii];
						  break;
						}
					  }
					  //console.log(disItem);
							
					  res.data['xianmai_shang_list'][shangid].dis = disItem.dis_str;
							
							
					  var imgs = [];
					  if (res.data['xianmai_shang_list'][shangid]['image_list']) {
						for (var j = 0; j < res.data['xianmai_shang_list'][shangid]['image_list'].length; j++) {
						  imgs.push(res.data['xianmai_shang_list'][shangid]['image_list'][j].url)
						}
					  }
					  res.data['xianmai_shang_list'][shangid].imgs = imgs;
					  res.data['xianmai_shang_list'][shangid].address = res.data['xianmai_shang_list'][shangid].address  //.substr(0, 10)
							
							
					}
							
					//console.log('iiiiiiiiiiiiiiiii', res.data['xianmai_shang_list']);
					
					that.twoArr = res.data['xianmai_shang_list'];
					
					
					
							
					
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
			});
			
		},
		
		//计算距离
		jisuan_juli:function(arr){
			console.log('计算距离123',arr);
			
			var dis = 0
			var shop_location_list = [];
			var that = this;
			
			
			
			for (var index in arr) {
				if (!isNaN(index)) {
				  
					dis = that.abotapi.getDisance(that.coordinate['latitude'], that.coordinate['longitude'], arr[index]['latitude'], arr[index]['longitude']);
					
					arr[index]['dis'] = dis;
				
					dis = Math.ceil(dis)
				
					var dis_str = '';
					if (dis < 1000) {
					  dis_str = dis + '米'
					}
				
					else {
					  dis_str = (dis / 1000).toFixed(1) + '公里'
					}
				
					arr[index]['dis_str'] = dis_str;
					
					shop_location_list.push(arr[index])
				}
			}
			return shop_location_list;
		},
		
		callback_func_for_shop_info:function(shop_info){
			var userInfo = this.abotapi.get_user_info();
			var shop_name = shop_info.shop_name;
			
			this.supplierid = shop_info.supplierid;
			
			uni.setNavigationBarTitle({
				title:shop_name
			})
			
			if(userInfo && userInfo.userid){
				console.log('88888====')
				this.linkSocket();
			}
			
		},
		
		// 建立socket连接
		linkSocket: function(){
			 var that = this;
			var userInfo = that.abotapi.get_user_info();
			const socket_io = io(that.abotapi.globalData.socket_server, {path: '/socketio/'})
		   
			// socket连接后以uid登录
			
			var uid = 'chat_app_userid_' + that.supplierid + '_' + userInfo.userid;
						
						
			console.log('chat_app_userid_=============',uid);
			
						
			socket_io.on('connect', function(){
				
				console.log('socket_io====6666',  socket_io.connected);
				console.log('socket_io====7777',  socket_io);
				socket_io.emit('login', uid);
				console.log(111);
				console.log('注册成功，uid=>'+uid);
				console.log(111);
			});
			
		
			
			socket_io.on('new_msg', function(msg){
				
				console.log('msg===main000',msg)
				
				//console.log("收到消息："+msg.replace(/&quot;/g,'"'));							
				msg = msg.replace(/&quot;/g,'"');
				msg = JSON.parse(msg);
				msg = JSON.parse(decodeURIComponent(msg));
				//发的消息只在当前房间显示
				console.log('msg===main',msg)
				if(msg){
					
					// var current_chat_gui = app.globalData.current_chat_gui
					
					// console.log('current_chat_gui===',current_chat_gui)
					
					// if(current_chat_gui){
					// 	current_chat_gui.getNewMsg(msg);
					// }		
									
					that.abotapi.socketMsgHandle(that.abotapi.current_chat_gui, that.abotapi.current_chat_page,msg);
									
					// that.getLastMsg();
																			
					
				}
		  
				
			});
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
			
			if(that.roll_picture == -1){
				that.flash_ad_list = that.roll_picture_list;
				return;
			}
			
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
					that.flash_ad_list = res.data.data;
				  
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
			
			if(that.pingpu_picture == -1){
				that.flash_img_list = that.pingpu_picture_list;
				return;
			}
			
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
					that.flash_img_list = res.data.data;
					
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
			
			if(that.navigation_icon == -1){
				that.index_icon_list = that.navigation_icon_list;
				
				return;
			}
			
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
				url: '/pages/home/help/help?sellerid=' + this.abotapi.globalData.default_sellerid
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
				url:'../msg/msg'
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
		//实体商家跳转
		toShang_detail(e) {
			console.log('rrxfff===',e.currentTarget.dataset.shangid);
			var shangid = e.currentTarget.dataset.shangid;
			uni.navigateTo({
				url: '/pages/shopDetail/shopDetail?shangid='+shangid
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
			
			var home_url = '/pages/home/home';
			this.abotapi.goto_user_login(home_url, 'switchTab');
			
			var that = this;
			var var_list = Object();
			console.log('toAdDetails- to url ====>>>>>>', url);
			if (url.indexOf("%ensellerid%") != -1) {
			  url = url.replace('%ensellerid%', app.get_sellerid());
			}
						
						
			if ((url.indexOf("%oneclicklogin%") != -1) || (url.indexOf("%oneclicklogin_hahading%") != -1)
			  || (url.indexOf("%refresh_token%") != -1)) {
						
			  var userInfo = that.abotapi.get_user_info();     
						
			  var request_url = that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=one_click_login_str';
						
			  if (url.indexOf("%oneclicklogin_hahading%") != -1){
				request_url = that.abotapi.globalData.yanyubao_server_url + 'openapi/UserData/one_click_login_str';
			  }
						
			  if (url.indexOf("%refresh_token%") != -1) {
				  console.log('123',456);
				request_url = that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=generate_refresh_token_value_for_other_system';
			  }
			  console.log('request_url', request_url);
			  console.log('url', url);
			  wx.request({
				url: request_url,
				method: 'post',
				
				data: {
				  sellerid: that.abotapi.globalData.default_sellerid,
				  checkstr: userInfo.checkstr,
				  userid: userInfo.userid
				},
				
				header: {
				  'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: function (res) {
				  //--init data   
				  console.log('dddddddddddddd',res);     
				  var code = res.data.code;
				
				  if (code == 1) {
					var oneclicklogin = res.data.oneclicklogin;
						
					url = url.replace('%oneclicklogin%', res.data.oneclicklogin);
					url = url.replace('%oneclicklogin_hahading%', res.data.oneclicklogin);
						
					if (res.data.refresh_token) {
					  url = url.replace('%refresh_token%', res.data.refresh_token);
					}
					console.log('url1111',url);
					that.abotapi.call_h5browser_or_other_goto_url(url, var_list);
						
					return;
						
				  } else {
					wx.showToast({
					  title: '非法操作.',
					  duration: 2000
					});
				  }
				},
				error: function (e) {
				  wx.showToast({
					title: '网络异常！',
					duration: 2000
				  });
				}
			  });
						
			  return;
						
			};
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
page{position: relative;background-color: #fff;}
.icon.location:before {
    content: '\E611';
}
.shang_box{
	display: flex;
	padding: 10upx;
	margin: 10upx;
	border-radius: 10upx;
	background: #fff;
	border: 1upx solid #fff;
}
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
		width: 150upx;
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
		// width: 120upx;
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
	width: 96%;
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
  width:60%;
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
				margin: 10upx 4%;
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
.youhui-biaoqian {
		font-size: 24upx;
		margin-bottom: 10upx;
		border: 1px solid #666;
		text-align: center;
		color: #555;
		border-radius: 6rpx;
		padding: 2px 5px;
		margin-right: 10rpx;
	}
</style>
