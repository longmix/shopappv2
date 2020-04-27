<template>
	<view>
		<view>
		  <image @load="imageLoad($event)"  :data-id='index'  mode="widthFix" style="width: 100%;" src="../../static/img/1.jpg"></image>
		</view>
		
		<view class="shang_detail_box1">
			<!-- 头像昵称 -->
			<view class="head_and_name">
				<image style="margin-right:10upx;width: 70upx;height:70upx;border-radius: 50%;" src="../../static/img/alipay.png" mode=""></image>
				<text>涮我吧</text>
			</view>
			<!-- 头像昵称结束 -->
			
			<!-- 星级 -->
			<view style="display: flex;justify-content: center;align-items: center;">
				<text>星级</text>
				<image style="width: 50upx;height: 50upx;" src="../../static/img/VIP.png" mode=""></image>
				<image style="width: 50upx;height: 50upx;" src="../../static/img/VIP.png" mode=""></image>
				<image style="width: 50upx;height: 50upx;" src="../../static/img/VIP.png" mode=""></image>
				<image style="width: 50upx;height: 50upx;" src="../../static/img/VIP.png" mode=""></image>
				<image style="width: 50upx;height: 50upx;" src="../../static/img/VIP.png" mode=""></image>
			</view>
			<!-- 星级结束 -->
			
			<!-- 标签 -->
			<view style="display:flex;flex-wrap: wrap;" >
			    <view class="biaoqian">
				宝宝椅
			    </view>
				<view class="biaoqian">
				宝宝椅
				</view>
				<view class="biaoqian">
				宝宝椅
				</view>
				<view class="biaoqian">
				宝宝椅
				</view>
				<view class="biaoqian">
				宝宝椅
				</view>
				<view class="biaoqian">
				宝宝椅
				</view>
				<view class="biaoqian">
				宝宝椅
			    </view>
				<view class="biaoqian">
				宝宝椅
				</view>
				<view class="biaoqian">
				宝宝椅
			    </view>
				<view class="biaoqian">
				宝宝椅
				</view>
				
			  </view>
			  <!-- 标签结束-->
			  
			  <!-- 服务-->
			  <view style="width: 100%;display: flex;justify-content: center;align-items: center;margin-top: 20upx;">
				  <view style="width:60%;background-color: #FFFFFF;height: 10upx;"></view>
				  <view class="fuwu">
					 点餐 外卖 排队 预约
				  </view>
				  <view style="width:60%;background-color: #FFFFFF;height: 10upx;"></view>
			  </view>
			  <!-- 服务结束-->
			  
			  <!-- 营业时间 地址 -->
			  <view class="shijian_dizhi">
				  <!-- 营业时间-->
				  <view style="display: flex;justify-content: space-between;align-items: center;padding: 20upx;">
					  
					  <view style="color:#333;font-size: 28upx;display: flex;align-items: center;">
						  <image style="width: 30upx;height: 30upx;" src="../../static/img/share/pyq.png"></image>
						  营业时间|8:00--22:00
					  </view>
					  <image style="width: 30upx;height: 30upx;" src="../../static/img/user/point.png"></image>
						
					 
				  </view>
				  <!-- 地址-->
				  <view style="display: flex;justify-content: space-between;align-items: center;padding: 20upx;">
					  <view style="color:#333;font-size: 28upx;display: flex;align-items: center;">
						  <image style="width: 30upx;height: 30upx;" src="../../static/img/user/point.png"></image>
						  <view style="width: 80%;">上海欧阳路196号法兰桥园区1号楼B102(靠近四达路和吉祥路之间)</view>
					  </view>
					  <view>
						  <image style="width: 30upx;height: 30upx;" src="../../static/img/x_right.png"></image>
					  </view>
					  
					  
				  </view>
			  </view>
			  <!-- 营业时间 地址结束 -->
			  
			  
			  
		</view>
		<!-- 功能按钮-->
		
		<view>
			<!-- 按钮1 -->
			<view class="paidui-con">
				<image class="icon-a" src="../../static/img/category/2.png"></image>
				<view class="paidui-a">
					<view class="icon-title">

						<text class='paidui-c'>排队取号</text>
					</view>
				<text class='paidui-d'>等待时间仅供参考</text>
				</view>
				<view class="yuding-a">
					<view style="font-size:25rpx;">提前排队就餐快</view>
					<view style="background:#F19E49;">立即排队</view>
				</view>
				<view class="paidui-b">餐厅当前暂停取号</view>
			</view>
			<!-- 按钮1   end -->
			
			<!-- 按钮2 -->
			<view class="paidui-con">
				<image class="icon-a" src="../../static/img/category/2.png"></image>
				<view class="paidui-a">
					<view class="icon-title">
			
						<text class='paidui-c'>排队取号</text>
					</view>
				<text class='paidui-d'>等待时间仅供参考</text>
				</view>
				<view class="yuding-a">
					<view style="font-size:25rpx;">提前排队就餐快</view>
					<view style="background:#F19E49;">立即排队</view>
				</view>
				<view class="paidui-b">餐厅当前暂停取号</view>
			</view>
			<!-- 按钮2  end -->
			
			<!-- 按钮3 -->
			<view class="paidui-con">
				<image class="icon-a" src="../../static/img/category/2.png"></image>
				<view class="paidui-a">
					<view class="icon-title">
			
						<text class='paidui-c'>排队取号</text>
					</view>
				<text class='paidui-d'>等待时间仅供参考</text>
				</view>
				<view class="yuding-a">
					<view style="font-size:25rpx;">提前排队就餐快</view>
					<view style="background:#F19E49;">立即排队</view>
				</view>
				<view class="paidui-b">餐厅当前暂停取号</view>
			</view>
			<!-- 按钮3  end -->
			
			
			<!-- 按钮4 -->
			<view class="paidui-con">
				<image class="icon-a" src="../../static/img/category/2.png"></image>
				<view class="paidui-a">
					<view class="icon-title">
			
						<text class='paidui-c'>排队取号</text>
					</view>
				<text class='paidui-d'>等待时间仅供参考</text>
				</view>
				<view class="yuding-a">
					<view style="font-size:25rpx;">提前排队就餐快</view>
					<view style="background:#F19E49;">立即排队</view>
				</view>
				<view class="paidui-b">餐厅当前暂停取号</view>
			</view>
			<!-- 按钮4  end -->
		</view>
		
		<!-- 功能按钮结束-->
		
		<!-- 优惠 -->
		<view style="border-bottom:6px solid #eee;">
			<view class="icon-title2">
			  <image src="../../static/img/category/8.png"></image>
			  <view class='biaoti'>优惠活动</view>
			</view>
		
		
			<view style="text-align: center;color:#ccc;font-size:16px;">暂无优惠</view>
			<view style="padding-bottom: 21px;color: red;width: 94%;margin-left: 13px;" >
			  <text style="width:20px;"></text>
			</view>
		
		
			<view style="text-align: left;padding-left:8px;color:#666;font-size:16px;text-align:center;padding:6rpx;font-weight:bold;">sdfsdfsd</view>
			<view style="padding-top:5px;padding-bottom: 24rpx;color: #666;width: 94%;margin: 0 auto;font-size:14px;text-indent: 54rpx;">
			<text>dsfsd</text>
			</view>
		
		</view>
		<!--商家简介-->
		<view style="border-bottom:6px solid #eee;">
		<view class="icon-title2">
		  <image src="../../static/img/category/8.png"></image>
		  <view class='biaoti'>商家简介</view>
		</view>
		
		<view style="text-align: center;color:#ccc;font-size:16px;">暂无简介</view>
		<view style="padding-bottom: 21px;color: red;width: 94%;margin-left: 13px;" >
		  <text style="width:20px;"></text>
		</view>
		
		
		<view style="padding-top:5px;padding-bottom: 24rpx;color: #666;width: 94%;margin: 0 auto;font-size:14px;text-indent: 54rpx;">
		  <text>sdfsdfsdf</text>
		</view>
		
		</view>
	</view>
</template>

<script>
	
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
				
				index_icon_list:'',
				Promotion: [],
				//猜你喜欢列表
			
				productList:'',
				loadingText: '正在加载...',
				imgheights: [],
				current: 0,
				windowHeight: 0,
				
				//客服相关
				wxa_show_kefu_button:'',
				wxa_kefu_button_type:'',
				wxa_kefu_button_icon:'',
				wxa_kefu_mobile_num:'',
				wxa_kefu_form_url:'',
				wxa_kefu_bg_color:''
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
			
			uni.getSystemInfo({
			    success: function (res) {
					
					that.windowHeight = res.windowHeight;
					
			    }
			});
			 
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

<style>
	.shang_detail_box1{
		background-color: #E0E0E0;
		margin: 5upx;
		border-radius: 20upx;
		overflow-y:auto;
	}
	.head_and_name{
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgb(211, 211, 216);
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		padding: 20upx;
		font-size: 40upx;
	}
	.biaoqian{
		margin-right:1%;
		background-color: #6EB8F2;
		color: #fff;
		border-radius: 4px;
		text-align: center;
		width: 19%;
		height: 20px;
		line-height: 20px;
		font-size: 19rpx;
		margin-top: 10upx;
	}
	.shijian_dizhi{
		width: 90%;
		margin-left: 5%;
		margin-bottom: 20upx;
		background-color: #FFFFFF;
		margin-bottom: 50upx;
		margin-top: 20upx;
		border-radius: 10upx;
	}
	.fuwu{
		background-color: rgb(187, 149, 187);
		color: #fff;
		border-radius: 4px;
		padding: 0upx 10upx;
		height: 17px;
		margin: auto;
		line-height: 17px;
		font-size: 9px;
		width: 40%;
		text-align: center;
	}
	
	
	/* pages/shops/shop_detail.wxss */
	.slide-image {
	  width: 100%;
	  /*height: 150px;*/
	}
	.label-line{
	  display:flex;
	  justify-content:center;
	  align-items:center;
	  font-size:28rpx;
	  color:#aaa;
	  margin-bottom:27rpx;
	  
	}
	
	.label-line-a{
	  border:1.5px solid #fff;
	  width:60%;
	}
	
	.star-a{
	  width:22rpx;
	  height:22rpx;
	
	}
	.shop-info-image-shouye{
	  vertical-align:middle;
	  width:70rpx;
	  height:70rpx;
	  border-radius:50%;
	  margin-right: 20rpx;
	}
	.shop-info-con{
	  background: #E0E0E0;
	  text-align: center;
	  border-bottom:17rpx solid #E0E0E0;
	  border-radius:20px;
	  margin-bottom: 10rpx;
	  }
	
	.shop-info-title{
	  background:rgb(211, 211, 216);
	  /*border-radius:10px;*/
	  border-top-left-radius:10px;
	  border-top-right-radius:10px;
	}
	
	.shop-info-a{
	  margin-top:6px;
	  padding:2% 10%;
	  display:flex;
	
	}
	.shop-info-b{
	  width: 40rpx;
	  height: 40rpx;
	   
	}
	
	.shop-info-b-con{
	  width:90%;
	  margin-left:5%;
	  background:#fff;
	  margin-bottom:30rpx;
	}
	
	.shop-info-c{
	  display:flex;
	  justify-content:space-between;
	  align-items:center;
	  padding:20rpx 20rpx;
	  font-size:26rpx;
	  color:#666;
	}
	.shop-info-c view{
	  display: flex;
	  align-items: center;
	  width:85%;
	}
	
	.shop-info-c text{
	  width:100%;
	  text-align:left;
	  margin-left:20rpx;
	}
	
	.shop-info-d{
	  border-right:1px solid #ccc;
	}
	
	.paidui-con{
	  border-bottom:4rpx solid #eee;
	  padding:20rpx 0;
	}
	.paidui-a{
	  display: flex;
	  justify-content: space-between;
	  padding: 0 3%;
	  margin-bottom: 24rpx;
	  width: 78%;
	}
	
	
	.paidui-a image{
	  width: 30rpx;
	  height: 30rpx;
	}
	.paidui-b{
	  text-align: center;
	  font-size: 30rpx;
	  color: #666;
	}
	.paidui-c{
	  font-size: 30rpx;
	  font-weight: bold;
	  color: #333;
	}
	.paidui-d{
	  font-size: 25rpx;
	  color: #999;
	}
	.yuding-a{
	  display:flex;
	  justify-content:space-between;
	  padding:0 3%;
	}
	.yuding-a :first-child{
	  font-size: 28rpx;
	  color: #666;
	}
	.yuding-a :nth-child(2){
	  background:#6EB8F2;
	  font-size:30rpx;
	  color:#fff;
	  padding:10rpx 30rpx;
	  border-radius:6rpx;
	}
	
	.b{
	  font-size:26rpx;
	  color:#555;
	  line-height:30px;
	  margin-left:auto;
	}
	.local-img{
	  width:172px;
	  height:108px;
	  border-radius:5px;
	  box-shadow:0px 2px 5px #333333;
	  margin:0 10rpx;
	}
	
	
	.tab-h1{
	    height: 236rpx;
	    width: 100%;
	    box-sizing: border-box;
	    overflow: hidden;
	    line-height: 80rpx;
	    background: #fff; 
	    font-size: 16px;
	    white-space: nowrap;
	}
	
	.tab-item1{
	  display:inline-block;
	  position: relative;
	  /* border:1px solid #999; */
	}
	
	.ab{
	  font-size:22rpx;
	  padding:2% 5%;
	  border:1px solid #ddd;
	  border-radius:20px;
	  color:#666;
	  width:42%;
	  text-align:center;
	
	}
	.local-img2{
	  width: 24rpx;
	  height: 24rpx;
	  margin-left:11rpx;
	  padding-top:1rpx;
	
	}
	
	.top-input-con{
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  padding:10rpx 20rpx;
	  background: #fff;
	  z-index:2;
	}
	
	
	/* 评论样式 */
	.userwords {
	    background-color: white;
	    padding: 20rpx;
	    font-size: 26rpx;
	    display: flex;
	    border-bottom: 1rpx solid #eee;
	    padding-bottom: 100rpx;
	}
	
	.userwords:last-child {
	    padding-bottom: 90rpx;
	}
	
	.userwords_img {
	    width: 100rpx;
	    height: 100rpx;
	    border-radius: 50%;
	}
	
	.userwords_rit {
	    width: 590rpx;
	    margin-left: 20rpx;
	}
	
	.userwords_content {
	    margin-top: 20rpx;
	    color: #666;
	}
	
	.userwords_color {
	    color: #4395f5;
	}
	
	.userwords_color2 {
	    color: #999;
	}
	
	.fixed{position: sticky; top: 0; }
	
	.biaoti{
	  font-size:17px;
	  color:#6EB8F2;
	  padding-left:8px;
	}
	
	.list-box {
	  margin-top: 10px;
	  padding:0 5%; 
	  font-size:32rpx;
	  border-bottom:20rpx solid #eee;
	  padding-bottom:20rpx;
	}
	
	.list-item {
	  position: relative;
	  padding: 10px 0;
	  width:90%;
	  margin-left:12%;
	}
	
	.list-item::last {
	  border: none;
	}
	
	.list-avatar {
	  float: left;
	  width: 30px;
	  height: 30px;
	  border-radius: 50%;
	  margin-right: 10px;
	}
	
	.list-name {
	  height: 40rpx;
	  line-height: 40rpx;
	  font-size: 28rpx;
	  color: #6798E9;
	  font-weight: bold;
	  overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
	}
	
	.list-des {
	  margin-top: 10px;
	  line-height: 1.5;
	  color: #444;
	  font-size: 28rpx;
	}
	
	.list-image {
	  margin-top: 10px;
	  margin-right: 5px;
	  width:190rpx;
	  height: 190rpx;
	}
	
	.list-address,
	.list-time {
	  min-height: 20px;
	  line-height: 20px;
	  height:20px;
	 justify-content:space-around;
	}
	
	.list-address {
	  color: #999;
	   display: flex;
	}
	
	.list-time {
	  color: #999;
	  margin-top: 5px;
	}
	
	.section-title {
	  padding: 5px;
	  font-size: 14px;
	  border-left: 5px solid #ffa404;
	}
	
	.list-icon {
	  float: left;
	  margin-top: 2px;
	  width: 15px;
	  height: 15px;
	}
	
	.list-icon-text {
	  margin-left: 20px;
	}
	
	.list-type {
	  position: absolute;
	  right: 0;
	  top: 10px;
	  color: #bfbfbf;
	  display: flex;
	  font-size:34rpx;
	  align-items:center;
	}
	
	.list-type-money {
	  background: #ffa404;
	  color: #fff;
	}
	
	.list-botton {
	  margin-top: 6rpx;
	  height: 18rpx;
	  line-height: 40rpx;
	  text-align: right;
	}
	
	.list-bottom-icon {
	  width: 20px;
	  height: 20px;
	}
	
	.list-zan{
	  width: 34rpx;
	  height: 34rpx;
	  margin-left: 20rpx
	}
	
	.list-zan-a{
	  display: flex;
	  align-items:center;
	}
	
	.list-con{
	    border-bottom: 1px solid #eee;
	}
	
	.pb-time{
	  color: #666;
	  font-size: 26rpx;
	  margin-top:10rpx;
	}
	.video-play{
	  position: absolute;
	  z-index: 3;
	  width: 50rpx;
	  height: 50rpx;
	  right: 10rpx;
	  top: 0rpx;
	  border-radius: 0 5px 0 0;
	}
	.icon-title{
	  display: flex;
	  align-items: center;
	}
	
	.icon-title2{
	  display: flex;
	  align-items: center;
	  border-bottom: 1px solid #eee;
	  padding: 14rpx 26rpx;
	}
	
	.icon-title2 image{
	  width:40rpx;
	  height:40rpx;
	}
	
	.icon-a{
	  width: 100rpx;
	  height: 100rpx;
	  float: left;
	  margin-left: 10rpx;
	}

</style>
