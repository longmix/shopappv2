<template>
	<view>
		<view>
		  <image @load="imageLoad($event)"  :data-id='index'  mode="widthFix" style="width: 100%;" :src="shoplist.icon_image"></image>
		</view>
		
		<view class="shang_detail_box1">
			<!-- 头像昵称 -->
			<view class="head_and_name">
				<image style="margin-right:10upx;width: 70upx;height:70upx;border-radius: 50%;" :src="shoplist.icon_image" mode=""></image>
				<text>{{shoplist.name}}</text>
			</view>
			<!-- 头像昵称结束 -->
			
			<!-- 星级 -->
			<view style="display: flex;justify-content: center;align-items: center;">
				<text>星级</text>
				<image v-for="item in shoplist.star_level" :key="item" style="width: 50upx;height: 50upx;" src="../../static/img/VIP.png" mode=""></image>
				
			</view>
			<!-- 星级结束 -->
			
			<!-- 标签 -->
			<view style="display:flex;flex-wrap: wrap;" >
			    <view v-for="item in shoplist.spec" :key="item" class="biaoqian">
				{{item}}
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
						  营业时间|{{shoplist.yingyeshijian}}
					  </view>
					  <image style="width: 30upx;height: 30upx;" src="../../static/img/user/point.png"></image>
						
					 
				  </view>
				  <!-- 地址-->
				  <view style="display: flex;justify-content: space-between;align-items: center;padding: 20upx;">
					  <view style="color:#333;font-size: 28upx;display: flex;align-items: center;">
						  <image style="width: 30upx;height: 30upx;" src="../../static/img/user/point.png"></image>
						  <view style="width: 100%;">{{shoplist.address}}</view>
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
		
		<block v-if="shoplist.youhui_title == ''">
			<view style="text-align: center;color:#ccc;font-size:16px;">暂无优惠</view>
			<view style="padding-bottom: 21px;color: red;width: 94%;margin-left: 13px;" >
			  <text style="width:20px;"></text>
			</view>
		</block>
		
		<block v-if="shoplist.youhui_title != ''">
			<view style="text-align: left;padding-left:8px;color:#666;font-size:16px;text-align:center;padding:6rpx;font-weight:bold;">{{shoplist.youhui_title}}</view>
			<view style="padding-top:5px;padding-bottom: 24rpx;color: #666;width: 94%;margin: 0 auto;font-size:14px;text-indent: 54rpx;">
				<text>{{shoplist.youhui_detail}}</text>
			</view>
		</block>
		</view>
		<!--商家简介-->
		<view style="border-bottom:6px solid #eee;">
		<view class="icon-title2">
		  <image src="../../static/img/category/8.png"></image>
		  <view class='biaoti'>商家简介</view>
		</view>
		<block v-if="shoplist.brief == ''">
			<view style="text-align: center;color:#ccc;font-size:16px;">暂无简介</view>
			<view style="padding-bottom: 21px;color: red;width: 94%;margin-left: 13px;" >
			  <text style="width:20px;"></text>
			</view>
		</block>
		
		<block v-if="shoplist.brief != ''">
		<view style="padding-top:5px;padding-bottom: 24rpx;color: #666;width: 94%;margin: 0 auto;font-size:14px;text-indent: 54rpx;">
		  <text>{{shoplist.brief}}</text>
		</view>
		</block>
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
				shoplist: '',
				shang_faquan_list: '',
				spec: '',
				
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
		onLoad(e) {
			console.log('eeeeeee',e);
			this.get_shang_detail(e);
			
		},
		
		
		
		
		methods: {
			
			
			//商品跳转
			toGoods(e) {
				console.log('rrxfff===',e);
				var productid = e.productid;
				uni.navigateTo({
					url: '/pages/goods/goods?productid='+productid
				});
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
			  
			//获取商家详情
			get_shang_detail:function(options){
				console.log('options===', options)
				
				    var that = this;
				
				    var xianmai_shangid 
				    
				    if (options.shangid){
				      xianmai_shangid = options.shangid;
				    }
				   
				
				    if (options.scene) {
				      xianmai_shangid = options.scene
				    }
				
				    
				    
				    this.xianmai_shangid = xianmai_shangid;
				    
				    
				    
				// 获取商家详情
				var post_data = {
				      sellerid: this.abotapi.globalData.default_sellerid,
				      xianmai_shangid: this.xianmai_shangid,
				      }
				
				    
				    this.abotapi.abotRequest({
				      url:this.abotapi.globalData.yanyubao_server_url+'openapi/XianmaiShangData/get_shang_detail',
				      data: post_data,
				      header: {
				        "Content-Type": "application/x-www-form-urlencoded"
				      },
				      method: "POST",
				      success: function (res) {
				        console.log('xiangqing', res);
				        var data=res.data.data;
				
				        var spec = data.spec;
				        if (spec){
				          data.spec = spec.split(" ");
				        }else{
				          var spec = '';
				        }
				        
				
				        console.log('pppppppppppppppp', data);
				        
						that.shoplist = data;
						that.shang_faquan_list = data.shang_faquan_list;
						that.spec = spec;
				        
				
				        
				        // var latitude_longitude = {
				        //   latitude : data.latitude,
				        //   longitude : data.longitude,
				        // };
				        
				        // wx.setStorageSync("longitude_" + data.xianmai_shangid + "_latitude", latitude_longitude);
				        var shang_detail = {
				          latitude: data.latitude,
				          longitude: data.longitude,
				          name: data.name,
				        };
				
				        wx.setStorageSync("shang_" + data.xianmai_shangid + "_detail", shang_detail);
				
				        wx.setStorage({
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
			}
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
