<template>
	<view>
		<!-- 状态栏 -->
		<view  class="status" :style="{ position: headerPosition,top:statusTop,opacity: afterHeaderOpacity}"></view>
		<!-- 商家搜索 -->
		<view class="top-input-con">

			<view  class="scroll-txt" :style="'border:2rpx solid '+ wxa_shop_nav_bg_color + ';'">   
				<input type="text" v-model="search_text" placeholder="搜索附近商家" confirm-type="search" style="background: #e6e6e6;" @confirm="search()"/>
				<icon type="search" size="15" style="margin: 0px 10rpx 0 0;position:absolute;right:30rpx;" @tap="search()"></icon>
				<!-- <text class="scroll-ads">搜索附近商家</text> -->
			</view>
		</view>
		
		<!-- 轮播图 -->
		<view class="swiper">
			<view class="swiper-box">
				<swiper circular="true" autoplay="true"  :style="{height:imgheights[current] + 'px'} ">
					<swiper-item v-for="(swiper,index) in productLists" :key="swiper.id" @click="toAdDetails(swiper.url)"><!-- @click="toAdDetails(swiper.url)" -->
						<image @load="imageLoad($event)"  :data-id='index' :src="swiper.image" mode="widthFix"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<!-- -附近商家 -->
		
		<view class="label-line">
		  <view class='label-line-a'></view>
		  <view> ※ 附近商家 ※ </view>
		  <view class='label-line-a'></view>
		</view>
		
		<view  class="top-input-con" style="margin-top: 0rpx;" id="affix"> 
		
			<!-- 全部美食按钮 -->
			<view class="ab" @click="shuaxin()" style="width:25%;float:left;">
				<text>附近商家</text>
				<!-- <image class='local-img' src="../../static/img/xiala.png"></image> -->
			</view>
			
			<!-- 分类按钮 -->
			<picker class="ab" style="width:25%;" @change="bindPickerChangeFloor($event)"  :range="cata_list" data-searchType="cataName">
				<view  style="display: flex;justify-content: center;align-items: center;">
					<view class="picker">
						<text>{{fenlei_name}}</text>
					</view>
					<image class='local-img' src="../../static/img/xiala.png"></image> 
				</view>
			</picker>
			
			<!-- 智能排序按钮 -->
			<view class="ab" @click="bindPickerChangeFloor($event)" data-searchType="star_level" style='width: 25%;'>
				<text>智能排序</text>
				<!-- <image class='local-img' src="../../static/img/xiala.png"></image> --> 
			</view>

			<!-- 筛选按钮 -->
			<picker class="ab" style="width:25%;" @change="bindPickerChangeFloor($event)"  :range="spec_list" data-searchType="spec">
				<view style="display: flex;justify-content: center;align-items: center;">
					<view class="picker" style="float:left;" >
						<text>{{shaixuan_name}}</text>
					</view>
					<image class='local-img' src="../../static/img/xiala.png"></image> 
				</view>
			</picker>
		</view>
		<!-- 筛选按钮结束 -->
		
		<!-- 实体商家列表 -->
		<shopList :xianmaishangList="xianmaishang_list" 
			@toShangDetail="toShangDetail"
			@toShangList="toShangList"
			:show_zhuanti_title = 0></shopList>

		
		<!-- <view @click="jiazai()">点击加载更多...</view> -->
		<view :style="{display:show_bottom_tips}" style="text-align: center;color: #a2a2a2;margin-bottom: 40rpx;">已经到底了~</view>
	</view>
	<!-- 实体商家结束 -->
	
</template>



<script>
	import locationapi from '../../common/locationapi.js'; 
	import shopList from '../../components/shop-list/shop-list.vue';
	
	export default {
		components:{
			shopList
		},
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
				productLists:[],
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
				//获取商家
				page:1,
				shang_num:10,
				xianmaishang_list:[],
				shang_list:[],
				imgUrls:[],
				spec_list:[],
				cata_list:[],
				coordinate:'',
				all_cata_list:'',
				all_spec_list:'',
				is_xiala:0,
				fenlei_name:'分类',
				shaixuan_name:'筛选',
				sx_shang_list:[],
				//客服相关
				wxa_show_kefu_button:'',
				wxa_kefu_button_type:'',
				wxa_kefu_button_icon:'',
				wxa_kefu_mobile_num:'',
				wxa_kefu_form_url:'',
				wxa_kefu_bg_color:'',
				search_text:'', //搜索用的文字
				search_shang_list:[], //搜索查询商家
				
				show_bottom_tips:'none', // 隐藏 已经到底了~ 的提示
				
				wxa_shop_nav_bg_color:'',
				
				
				shangid_str:'',
				
			};
		},
		
		onLoad(options) {
			var that = this;
			console.log('shopList / options', options);
			
			uni.getSystemInfo({
			    success: function (res) {
					console.log('getSystemInfo==',res)
					that.windowWidth = res.windowWidth;
					that.windowHeight = res.windowHeight;
					
			    }
			});
			
			//如果不是挂接在Tabbar，则可以读取以下参数
			if(options.fenlei_name){
				this.fenlei_name = options.fenlei_name;				
				var xz_cataid = h_cata_lsit[options.fenlei_name]; // 选择的分类id
				
				//筛选全部商家的分类id为xz_cataid;
				var xz_shang_list = [];
				
				var shang_list = this.shang_list;
				
				for(var i in shang_list){
					if(shang_list[i]['cataid'] == xz_cataid){
						xz_shang_list.push(shang_list[i]);
					}
				}
				this.sx_shang_list = xz_shang_list;
				
				console.log('777888sss',xz_shang_list);
			}
			
			if(options.cataid){
				uni.setStorageSync('current_shang_cataid', options.cataid);
			}
			
			this.abotapi.set_option_list_str(this, function(that, option_list){
				console.log('option_list=====>>>>', option_list);

				//that.abotapi.getColor();wxa_shop_nav_bg_color
				
				that.wxa_shop_nav_bg_color = option_list.wxa_shop_nav_bg_color;

			});
			
			// var shang_list = uni.getStorageSync("shop_location_list");
			
			// this.shang_list = shang_list;
			
			// this.get_shang_list();
			
			
			
			
			// var coordinate = locationapi.get_location(this,this.get_shang_list);
			
			// console.log('coordinate1',coordinate);
			
			// this.coordinate = coordinate;
			//清除搜索的缓存
			that.search_shang_list = [];
			uni.removeStorageSync('search_shang_all_jingwei');
			
			locationapi.get_location(that, that.cx_paixu_shang_list);
			
		},
		onShow() {
			//获取经纬度
			// var coordinate = uni.getStorageSync("coordinate");
			// console.log('coordinate155',coordinate);
			// if(coordinate.length != 0){
			// 	this.get_shang_list();
			// }
			
			// this.coordinate = coordinate;
			
			
			this.get_cata_tag();
			this.get_gundong_img();
			//this.shuaxin();
			console.log('imgheights2222',this.imgheights);
			console.log('imgheights2222',this.current);
			
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
			
			console.log('onPullDownRefresh=====>>>>>');
			
			
			uni.showToast({
				title: '数据更新中……',
				//icon:'loading'
			});
			
			setTimeout(function() {
				uni.stopPullDownRefresh();
				uni.hideToast();
			}, 1000);
			 
			
			locationapi.get_location_remove();
			uni.removeStorageSync('shop_location_list');
			
			that.abotapi.get_xianmaishang_setting_list_remove();
			
			that.xianmaishang_list = [];
			that.page = 1;
			that.sx_shang_list = [];
			locationapi.get_location(that, that.cx_paixu_shang_list);
			
			
			
			
			
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			
			if(this.is_xiala == 0){
				this.jiazai();
			}else{
				/*uni.showToast({
					title:'已经到底了~'
				})*/
				this.show_bottom_tips = 'block';
			}
			
		},
		
		methods: {
			
			callback_func_for_shop_info:function(shop_info){
				var shop_name = shop_info.shop_name;
				
				uni.setNavigationBarTitle({
					title:shop_name
				})
				
			},
			
			//获取商家
			get_shang_list:function(){
				
				var that = this;
				
				console.log('7777778888',this.search_shang_list);
				
				var shang_list = null;
				
				if(that.search_shang_list.length != 0){
					shang_list = that.search_shang_list;
				}else{
					shang_list = that.shang_list;
				}
				
				
				
				if(that.sx_shang_list.length != 0){
					
					shang_list = that.sx_shang_list;
				}
				
				
				
				console.log(that.sx_shang_list.length);
				console.log('77777788883333', that.sx_shang_list);
				
				var page = this.page;
				var shang_num = this.shang_num;
				
				var star = (page - 1) * shang_num;
				var end = page * shang_num;
				
				console.log('star',star);
				console.log('end',end);
				
				var threeArr = shang_list.slice(star, end); //返回特定的数组
				
				console.log('888888888888',threeArr);
				console.log(threeArr);
				
				var shangid_str = '';
				
				for(var i = 0;i <  threeArr.length;i++){
					shangid_str = shangid_str + threeArr[i]['xianmai_shangid'] + '|';
				}
				
				var post_url = that.abotapi.globalData.yanyubao_server_url + '/openapi/XianmaiShangData/get_shang_list';
				
				//2021.8.5. 如果读取supplier的列表
				if(that.abotapi.globalData.xianmai_shang_list_switch_to_supplier_list == 1){
					post_url = that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/supplier_list';
				}
				
				that.abotapi.abotRequest({
				    url: post_url,
				    method: 'post',
				    data: {
						sellerid:that.abotapi.globalData.default_sellerid,
						str:shangid_str,
				    },
				    success: function (res) {
						
						
						if (res.data.code != 1) {
							
						  //显示错误信息
						  uni.showToast({
						      title: '暂无数据',
						      duration: 2000,
							  image:'../../static/img/close.png'
						  });
						  return;
						}
						
						if(res.data.xianmai_shang_list.length < shang_num){
							that.is_xiala = 1;
							/*uni.showToast({
								title:'已经到底了~'
							})*/
							
							that.show_bottom_tips = 'block';
							
						}
						var id = 0;
						
						for (var shangid in res.data['xianmai_shang_list']) {
						  
							
						  var xianmai_shangid = res.data['xianmai_shang_list'][shangid]['xianmai_shangid'];
								
						  var disItem = null;
						  var shop_location_list = that.shang_list;
						  for (var iii = 0; iii < shop_location_list.length; iii++) {
							if (shop_location_list[iii]['xianmai_shangid'] == xianmai_shangid) {
							  disItem = shop_location_list[iii];
							  break;
							}
						  }
						 
								
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
								
						
						for(var i = 0 ; i< res.data['xianmai_shang_list'].length;i++){
							that.xianmaishang_list.push(res.data['xianmai_shang_list'][i]);
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
			
			//重新排序（重新获取经纬度）
			cx_paixu_shang_list:function(that, locationData){
				
				console.log('重新排序开始============>>>>>>',locationData);
				var that = this;
				
				var coordinate = [];
				coordinate['latitude'] = locationData.latitude;
				coordinate['longitude'] = locationData.longitude;
				//经纬度  点方法获取
				that.coordinate = coordinate; //经纬度
				
				that.set_paixu_shanglist();
				
			},
			
			//给商家排序
			set_paixu_shanglist:function(){
				
				var that = this;
				var arr = uni.getStorageSync('all_shang_jingwei_list'); //获取商家经纬度
				var search_shang_all_jingwei = uni.getStorageSync("search_shang_all_jingwei");  //获取搜索之后的缓存
				
				
				console.log('商家、经纬度、举例列表：', arr);
				
				var shop_location_list = null;
				
				if(search_shang_all_jingwei){
					console.log('进入搜索缓存排序');
					
					shop_location_list = that.jisuan_juli(search_shang_all_jingwei);
					
				}else{
					shop_location_list = that.jisuan_juli(arr);
				}
				
				
				
				//console.log('shop_location_list',shop_location_list);
							
				
				
				//开始排序
				var paixu_shanglist = shop_location_list.sort(compare);
				
				//console.log('paixu_shanglist',paixu_shanglist);
				
				function compare(obj1, obj2) {
				  var val1 = obj1.dis; 
				  var val2 = obj2.dis;
				  
				  return val1 - val2;
				  /*
				  if (val1 < val2) {
					return -1;
				  } else if (val1 > val2) {
					return 1;
				  } else {
					return 0;
				  }*/
				}
				
				console.log('进入搜索缓存排序计算完毕', paixu_shanglist);
				
				if(search_shang_all_jingwei){
					
					uni.setStorageSync("search_shop_location_list", paixu_shanglist);
					that.search_shang_list = paixu_shanglist;
					
				}
				else{
					uni.setStorageSync("shop_location_list", paixu_shanglist);
					that.shang_list = uni.getStorageSync("shop_location_list");
				}
				
				
				
				console.log('that.shang_list===>',that.shang_list);
				
				
				//==== 2020.8.28. 如果是跳转过来的时候带了cataid参数，则先过滤 ====
				if(uni.getStorageSync('current_shang_cataid')){
					var cataid = uni.getStorageSync('current_shang_cataid');
					
					
					uni.removeStorage({
						key:'current_shang_cataid'
					});
					
					var shang_list = this.shang_list;
					
					//var cata_list = this.cata_list; // 分类列表 （渲染的数据）
					
					var xz_cataid = cataid; // 选择的分类id
					
					console.log('xz_cataid',xz_cataid);
					
					//筛选全部商家的分类id为xz_cataid;
					var xz_shang_list = [];
					for(var i in shang_list){
						if(shang_list[i]['cataid'] == xz_cataid){
							xz_shang_list.push(shang_list[i]);
						}
					}
					
					console.log('xz_shang_list',xz_shang_list);
					
					if(xz_shang_list.length == 0){
						var that = this;
						uni.showModal({
							title:'没有对应商家',
							showCancel:false,
							success:function(){
								that.shuaxin();
							},
							fail:function(){
								that.shuaxin();
							},
						})
						this.sx_shang_list = [];
					}else{
						this.sx_shang_list = xz_shang_list;
					}
					
					
				}
				//====================== End ===============
				
				
				
				
				that.get_shang_list();
				
			},
			//计算距离
			jisuan_juli:function(arr){
				console.log('计算距离开始');
				
				var dis = 0
				var shop_location_list = [];
				var that = this;
				
				for (var index in arr) {
					if (!isNaN(index)) {
					  
						dis = that.abotapi.getDistance(that.coordinate['latitude'], that.coordinate['longitude'], arr[index]['latitude'], arr[index]['longitude']);
						
						
						
						//dis = Math.ceil(dis)
						if(!isNaN(dis)){
							arr[index]['dis'] = dis.toFixed(2);
							var dis_str = '';
							if (dis < 1000) {
							  dis_str = dis.toFixed(1) + '米'
							}
												
							else {
							  dis_str = (dis / 1000).toFixed(1) + '公里'
							}
							
							arr[index]['dis_str'] = dis_str;
							
							shop_location_list.push(arr[index])
						}
						
					}
				}
				
				return shop_location_list;
			},
			//加载更多
			jiazai:function(){
				var page = this.page;
				this.page = page+1;
				this.get_shang_list();
			},
			
			//获取滚动图片接口
			get_gundong_img:function(){
				var that = this;
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_flash_ad_list',
					method: 'post',
					data: {
						sellerid:that.abotapi.globalData.default_sellerid,
						'type': 4
					},
					success: function (res) {
						console.log('ppppppp===>>',res);
						that.productLists = res.data.data;
					}
				})
			},
			
			//全部美食
			shuaxin:function(){
				//清除搜索的缓存
				this.search_shang_list = [];
				uni.removeStorageSync('search_shang_all_jingwei');
				this.search_text = '';
				//===end====
				
				this.is_xiala = 0;
				var shang_list = uni.getStorageSync("shop_location_list");
				console.log('shang_list==>',shang_list);
				this.shang_list = shang_list;
				
				this.page = 1;
				this.xianmaishang_list = [];
				this.sx_shang_list = [];
				this.fenlei_name = '分类';
				this.shaixuan_name = '筛选';
				this.get_shang_list();
			},
			
			//筛选功能
			bindPickerChangeFloor:function(e){
				//清除搜索的缓存
				this.search_shang_list = [];
				uni.removeStorageSync('search_shang_all_jingwei');
				this.search_text = '';
				
				//缓存中的商家列表
				this.is_xiala = 0;
				var shang_list = uni.getStorageSync("shop_location_list");
				//this.shang_list = shang_list;
				
				console.log('shang_list11',shang_list);
				//var shang_list = this.shang_list;
				
				
				
				//var that = this;
				
				//延誉宝返回的分列和特色列表,读缓存
				var h_cata_lsit = uni.getStorageSync("cata_list");
				var h_spec_list = uni.getStorageSync("spec_list");
				
				console.log('h_cata_lsit11',h_cata_lsit);
				console.log('h_spec_list11',h_spec_list);
				//点击带的参数，区分是分类筛选还是智能筛选或者是特色筛选
				var searchtype = e.currentTarget.dataset.searchtype;
				
				var cata_list = this.cata_list; // 分类列表 （渲染的数据）
				var spec_list = this.spec_list; // 特色列表
				var index = e.target.value;//选择了 cata_list 的key
				console.log('searchtype',searchtype);
				if(searchtype == 'star_level'){
					this.fenlei_name = '分类';
					this.shaixuan_name = '筛选';
					function compare(obj1, obj2) {
					  var val1 = obj1.star_level;
					  var val2 = obj2.star_level;
					  if (val1 < val2) {
						return -1;
					  } else if (val1 > val2) {
						return 1;
					  } else {
						return 0;
					  }
					}
					
					
					
					var paixu_sha = shang_list.sort(compare);
					this.sx_shang_list = paixu_sha.reverse();
					
					
					
				}else if(searchtype == 'cataName'){
					console.log('进入筛选');
					this.shaixuan_name = '筛选';
					
					var cata_names = cata_list[index];
					console.log('cata_names',cata_names);
					this.fenlei_name = cata_names;
					var xz_cataid = h_cata_lsit[cata_names]; // 选择的分类id
					console.log('xz_cataid',xz_cataid);
					//筛选全部商家的分类id为xz_cataid;
					var xz_shang_list = [];
					for(var i in shang_list){
						if(shang_list[i]['cataid'] == xz_cataid){
							xz_shang_list.push(shang_list[i]);
						}
					}
					console.log('xz_shang_list',xz_shang_list);
					if(xz_shang_list.length == 0){
						var that = this;
						uni.showModal({
							title:'没有对应商家',
							showCancel:false,
							success:function(){
								that.shuaxin();
							},
							fail:function(){
								that.shuaxin();
							},
						})
						this.sx_shang_list = [];
					}else{
						this.sx_shang_list = xz_shang_list;
					}
					
				}else if(searchtype == 'spec'){
					console.log('进入分类');
					this.fenlei_name = '分类';
					
					var spec_names = spec_list[index];
					
				
					
					this.shaixuan_name = spec_names;
					var xz_shang_list = [];
					for(var i in shang_list){
						if(shang_list[i]['spec'].indexOf(spec_names) != -1){
							xz_shang_list.push(shang_list[i]);
						}
					}
					this.sx_shang_list = xz_shang_list;
				}
				console.log('xz_shang_list',xz_shang_list);
				this.xianmaishang_list = [];
				this.page = 1;
				this.get_shang_list(); //获取商家的详细信息
				
			},
			
			
			//去重
			unique:function(arr){
				
				var hash = [];
				for(var i = 0; i < arr.length; i++) {
					if(hash.indexOf(arr[i]) == -1) {
						hash.push(arr[i]);
					}
				}
				return hash;
		
			},
			
			//获取全部的分类和标签
			get_cata_tag:function(){
				//请求全部美食二级分类
				var that = this;
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/XianmaiShangData/get_all_cata2',
					data: {
						sellerid:that.abotapi.globalData.default_sellerid,
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method: "POST",
					success: function (res) {
						
						that.cata_list = res.data.data;

					}
				})
				//请求筛选 特色标签
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/XianmaiShangData/get_all_spec',
					data: {
						sellerid:that.abotapi.globalData.default_sellerid,
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method: "POST",
					success: function (res) {
					
					if (res.data.code != 1) {
					//显示错误信息
					return;
					}
					
					var spec_list = that.unique(res.data.data);
					
					that.spec_list = spec_list;
					

					}
				})
			},
			
			
			//实体商家跳转
			toShangDetail(e) {
				console.log('toshangdetail',e)
				var shangid = e.currentTarget.dataset.shangid;
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetail?shangid='+shangid
				});
			},
			toShangList(){
				uni.switchTab({
					url: '/pages/shopList/shopList',
				})
			},
			
			//搜索
			search: function (view) {
				
				var that = this;
				that.xianmaishang_list = [];
				that.page = 1;
				that.sx_shang_list = [];
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/XianmaiShangData/get_shang_all_jingwei',
					method: 'post',
					data: {
						sellerid:that.abotapi.globalData.default_sellerid,
						searchType: 'search',
						keywords: this.search_text,
					},
					success: function (res) {
						uni.setStorageSync("search_shang_all_jingwei", res.data.data);
						console.log('resres',res.data.data);
						locationapi.get_location(that, that.cx_paixu_shang_list);
					}
				})
				    
				console.log('search_text',this.search_text);
				
				// var welfareId = view.currentTarget.dataset.value;
				// var url = "/pages/listdetail/listdetail?name=" + welfareId;
				// uni.navigateTo({
				// 	url: url
				// });
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
						
						that.abotapi.set_current_weiduke_token(res.data.token);
						if(res.data.code == 1){
								that.articlelist = res.data.data;
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
							
						}
					},
					fail:function(res){
						
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
						
						var data = res.data;
						
						if(data.code == 1){
							that.index_icon_list = data.data;
						}
					
					}
				});
			},
			
			//商品跳转
			toGoods(e) {
				
				var productid = e.productid;
				uni.navigateTo({
					url: '/pages/product/detail?productid='+productid
				});
			},
			
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			},
			
			
			imageLoad: function (e) {//获取图片真实宽度  
				var that = this;
				var imgwidth = e.detail.width,
				  imgheight = e.detail.height,
				  //宽高比  
				  ratio = imgwidth / imgheight;
				console.log(imgwidth, imgheight)
				//计算的高度值  
				var viewHeight = (this.windowWidth * 2 * 0.92)/ ratio;
				var imgheight = viewHeight;
				var imgheights = this.imgheights;
				//把每一张图片的对应的高度记录到数组里  
				imgheights[e.target.dataset.id] = uni.upx2px(imgheight);
					
				console.log('id===>>>'+e.target.dataset.id+", imgheights====>>>", imgheights);
						
				console.log('imgheightsimgheightsimgheights',imgheights);
				
				var heights = [];
				for(var i = 0; i < imgheights.length;i++){
					heights[i] = imgheights[i]
				}
				
				 that.imgheights = heights;
			   
			  },
			
			
			//首页导航图标、轮播图、平面广告跳转
			toAdDetails:function(url){
				// var var_list = Object();
				
				// this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
				
				
				var that = this;
				var var_list = Object();
				console.log('toAdDetails- to url ====>>>>>>', url);
				
				this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
			},
			
		}
	};
</script>

<style lang="scss">
	
	
	.top-input-con {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 20rpx;
		background: #fff;
		z-index: 2;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.scroll-txt {
		text-align: center;
		margin: 10rpx 0rpx;
		border: 20rpx red;
		padding: 12rpx 0 12rpx 0;
		color: #333;
		background: #e6e6e6;
		justify-content: center;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		height: 50rpx;
		width: 100%;

	}
	.label-line {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		color: #aaa;
		margin-bottom: 17rpx;
		margin-top: 27rpx;

	}
	.label-line-a {
		border: 1px solid #eee;
		width: 30%;

	}
	
	.top-input-con {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 20rpx;
		background: #fff;
		z-index: 2;

	}
	.ab {
		text-align: center;
		font-size: 32rpx;
		padding: 15upx 0;
		border: 1px solid #ddd;
		border-radius: 20px;
		color: #666;

	}
.local-img {
	width: 24rpx;
	height: 24rpx;
	margin-left: 11rpx;
	padding-top: 1rpx;

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
.status {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	background-color: #fff;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height:var(--status-bar-height); //覆盖样式
	/*  #endif  */
}
</style>
