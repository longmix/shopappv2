<template>
	<view class="search df">
	    <input class="df_1" placeholder="请输入你有搜索的内容" confirm-type="search" auto-focus focus="{{focus}}" value="{{searchValue}}" bindinput="searchValueInput" bindconfirm="doSearch"/>
	    <button bindtap="doSearch"><image class="searchcion" src="/images/search.png"></image></button>
	</view>
	<view class="cont" wx:if="{{hotKeyShow}}">
	    <text class="font_14">热门搜索</text>
	    <view class="w100">
	        <button wx:for="{{hotKeyList}}" bindtap="doKeySearch" data-key="{{item}}">{{item}}</button>
	    </view>
	    <text class="font_14">历史搜索</text>
	    <view class="w100">
	        <button wx:for="{{historyKeyList}}" bindtap="doKeySearch" data-key="{{item}}">{{item}}</button>
	    </view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				current: 0,
				shopList: [],
				ptype:'',
				title:'延誉',
				page:1,
				catId:0,
				brandId: 0,
				focus: true,
				hotKeyShow: true,
				historyKeyShow: true,
				searchValue: '',
				historyKeyList: [],
				hotKeyList: [],
				is_more: true
			};
		},
		onPageScroll(e) {
			
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			
		},
		onLoad() {
			var historyKeyList = uni.getStorageSync('historyKeyList_cache');
			this.historyKeyList = historyKeyList ? historyKeyList : [],
			
			console.log('56565', that.data.historyKeyList);
			
			this.get_shop_option();
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
		
		
		
		methods: {
			//获取配置
			get_shop_option:function(shop_info){
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/XianmaiShangData/get_shang_list',
					method: 'post',
					data: {
						sellerid:that.abotapi.globalData.default_sellerid,
						str: shangid_str
					},
					success: function (res) {
						
					}
				})
					
				
			},
			
			//获取商家
			get_shang_list:function(){
				
				var that = this;
				
				var shang_list = that.shang_list;
				if(that.sx_shang_list.length != 0){
					
					var shang_list = that.sx_shang_list;
				}
				
				
				var page = this.page;
				var shang_num = this.shang_num;
				
				var star = (page - 1) * shang_num;
				var end = page * shang_num;
				
				var threeArr = shang_list.slice(star, end); //返回特定的数组
				
				
				var shangid_str = '';
				for(var i = 0;i <  threeArr.length;i++){
					shangid_str = shangid_str + threeArr[i]['xianmai_shangid'] + '|';
				}
				
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/XianmaiShangData/get_shang_list',
					method: 'post',
					data: {
						sellerid:that.abotapi.globalData.default_sellerid,
						str: shangid_str
					},
					success: function (res) {
						
						
						if (res.data.code != 1) {
							
						  //显示错误信息
						  uni.showToast({
							  title: '失败',
							  duration: 2000,
							  image:'../../static/img/close.png'
						  });
						  return;
						}
						if(res.data.xianmai_shang_list.length < shang_num){
							that.is_xiala = 1;
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
					url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=get_flash_ad_list',
					method: 'post',
					data: {
						sellerid:that.abotapi.globalData.default_sellerid,
						'type': 4
					},
					success: function (res) {
						
						that.productLists = res.data.data;
					}
				})
			},
			
			//全部美食
			shuaxin:function(){
				this.is_xiala = 0;
				var shang_list = uni.getStorageSync("shop_location_list");
				
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
					
					this.shaixuan_name = '筛选';
					
					var cata_names = cata_list[index];
					
					this.fenlei_name = cata_names;
					var xz_cataid = h_cata_lsit[cata_names]; // 选择的分类id
					
					//筛选全部商家的分类id为xz_cataid;
					var xz_shang_list = [];
					for(var i in shang_list){
						if(shang_list[i]['cataid'] == xz_cataid){
							xz_shang_list.push(shang_list[i]);
						}
					}
					this.sx_shang_list = xz_shang_list;
				}else if(searchtype == 'spec'){
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
			toShang_detail(e) {
				
				var shangid = e.currentTarget.dataset.shangid;
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetail?shangid='+shangid
				});
			}, 
			
			//商户头条
			yingxiao:function(){
				var that = this;
				uni.request({
					url : this.abotapi.globalData.weiduke_server_url + '/?g=Home&m=Yanyubao&a=yingxiao',
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
					url:this.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=get_shop_icon_index',
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
					
				var imgwidth = e.detail.width,
				imgheight = e.detail.height,
				  
				//宽高比  
				ratio = imgwidth / imgheight;
			   
				//计算的高度值  
				var viewHeight = this.windowHeight / ratio;
				var imgheight = viewHeight;
				var imgheights = this.imgheights;
				
				//把每一张图片的对应的高度记录到数组里  
				imgheights[e.target.dataset.id] = uni.upx2px(imgheight);
				
				this.imgheights = imgheights
			   
			  },
			
			
			//首页导航图标、轮播图、平面广告跳转
			toAdDetails:function(url){
				var var_list = Object();
				
				this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
				
			},
			
		}
	};
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
	  font-weight: 700;
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
	    right:20rpx;
	    top:13rpx;
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
	    line-height: 20px;
	    margin: 3% 2% 0 0;
	    display: inline-table;
	    padding:5px 10px;
	    font-size: 12px;
	}
	.cont{
	     width: 94%;
	     padding: 3%;     
	}
</style>
