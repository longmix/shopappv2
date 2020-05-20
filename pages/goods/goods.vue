<template>
	<view>
		<view class="status" :style="{ opacity: afterHeaderOpacity }"></view>
		<view class="header">
			<!-- 头部-默认显示 -->
			<view class="before" :style="{ opacity: 1 - afterHeaderOpacity, zIndex: beforeHeaderzIndex }">
				<view class="back"><view class="icon xiangqian" @tap="back" v-if="showBack"></view></view> 
				<view class="middle"></view>
				<view class="icon-btn">
					<view class="icon tongzhi" @tap="toMsg"></view>
					<view class="icon cart" @tap="toCart"></view>
				</view>
			</view>
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
				<view class="back" ><view class="icon xiangqian" @tap="back" v-if="showBack"></view></view>
				<view class="middle">
					<view v-for="(anchor,index) in anchorlist" :class="[selectAnchor==index ?'on':'']" :key="index" @tap="toAnchor(index)">{{anchor.name}}</view>
				</view>
				<view class="icon-btn">
					<view class="icon tongzhi" @tap="toMsg"></view>      <!-- 下版本-> toMsg -->
					<view class="icon cart" @tap="toCart"></view>
				</view>
			</view>
		</view>
		<!-- 底部菜单 -->
			<view class="warm" v-if="goods_detail.inventory == 0">
				该商品已经售罄！！！
			</view>
		<view class="footer">
			<view class="icons">
				<view class="box" @tap="share">
					<view class="icon fenxiang"></view>
					<view class="text">分享</view>
				</view>
				<view class="box" @tap="toChat">
					<view class="icon kefu"></view>		<!-- 下版本改为   -->
					<view class="text">客服</view>
				</view>
				<view class="box" @tap="keep">
					<view class="icon" :class="[isKeep?'shoucangsel':'shoucang']"></view>
					<view class="text">{{isKeep?'已':''}}收藏</view>
				</view>
			</view>
			<view class="btn">
				<view :class="[goods_detail.inventory == 0? 'joinCart-null':'joinCart']" data-type="addcart" data-status="2" @tap="goods_detail.inventory == 0?'':setModalStatus($event)">加入购物车</view>
				<view :class="[goods_detail.inventory == 0? 'buy-null':'buy']" data-status="1" @tap="goods_detail.inventory == 0? '':setModalStatus($event)">立即购买</view>
			</view>
		</view>
		<!-- share弹窗 -->
		<view class="share" :class="shareClass" @touchmove.stop.prevent="discard" @tap="hideShare">
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="h1">分享</view>
				<view class="list">
					<!-- <view class="box">
						<image src="../../static/img/share/uni.png"></image>
						<view class="title">
							微信好友
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/pyq.png"></image>
						<view class="title">
							朋友圈
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/wb.png"></image>
						<view class="title">
							新浪微博
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/qq.png"></image>
						<view class="title">
							QQ
						</view>
					</view> -->
					
				</view>
				<view class="btn" @tap="hideShare">
					取消
				</view>
			</view>
			
		</view>
		<!-- 服务-模态层弹窗 -->
		<view class="popup service" :class="serviceClass" @touchmove.stop.prevent="discard" @tap="hideService">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer2" @tap.stop="discard">
				<view class="content">
					<view class="row" v-for="(item,index) in goodsData.service" :key="index">
						<view class="title">{{item.name}}</view>
						<view class="description">{{item.description}}</view>
					</view>
				</view>
				<view class="btn"><view class="button" @tap="hideService">完成</view></view>
			</view>
		</view>
		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="discard" @tap="hideSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer2" @tap.stop="discard">
				<view class="content">
	
					
					<view class="text_center">
					      <image class="drawer_image" :src="goods_detail.picture"></image>
					      <view class="mingcheng">
					        <view>{{goods_detail.name}}</view>
					        <view style="font-size:29rpx;color:red">¥ {{goods_detail.price}}</view>
					        <view style="font-size:26rpx;color:#ccc">库存：{{goods_detail.inventory}}</view>
					      </view>
					 </view>
					 <view v-if="isExistSpec" class="guige">
					 	<!-- <view class="title">选择规格：</view> -->
					 	<!-- <view class="sp">
					 		<view v-for="(item,index) in goodsData" :class="[index==selectSpec?'on':'']" @tap="setSelectSpec(index)" :key="index">{{item}}</view>
					 	</view> -->
					 	<!-- <view class="length" v-if="selectSpec!=null">
					 		<view class="text">数量</view>
					 		<view class="number">
					 			<view class="sub" @tap.stop="sub">
					 				<view class="icon jian"></view>
					 			</view>
					 			<view class="input" @tap.stop="discard">
					 				<input type="number" v-model="goodsData.number" />
					 			</view>
					 			<view class="add"  @tap.stop="add">
					 				<view class="icon jia"></view>
					 			</view>
					 		</view>
					 	</view> -->
					 	
					 	<!-- 规格开始 -->
					 	<view class="specs" v-if="attr_list">商品选项</view>
					 	<view class="specs-a" style='display:flex;'>
					 		<view :class="[option_list_arr[0] == item ? 'specs-e' : 'specs-d']" v-for="(item, index) in attr_key_arr"  :data-spec1="item" @click='changeSpec1($event)'>
					 			{{item}}
					 		</view>
					 	</view>
					 	<view class="specs-a" style="display:flex;" v-if="attr_list_arr[spec1] != null">
					 		<view :class="[option_list_arr[1] == item2 ? 'specs-e' : 'specs-d']" v-for="(item2, index) in attr_list_arr[spec1]" :data-spec2="item2"  @click="changeSpec2($event)">
					 		  {{item2}}
					 		</view>
					 	</view>
					 	<!-- 规格结束 -->
					 </view>
					<view class="text">数量</view>
					<view class="number">
					  	<view class="sub" >
					  		<view class="icon jian" data-alpha-beta="0" @click="changeNum($event)"></view>
					  	</view>
					  	<view class="input" @tap.stop="discard">
					  		<input type="number" v-model="amount" />
					  	</view>
					  	<view class="add" >
					  		<view class="icon jia" data-alpha-beta="1" @click="changeNum($event)"></view>
					  	</view>
					</view>
					
					
				</view>
				<view class="btn"><view class="button" :data-status="status" @tap="addShopCart($event)">{{buys}}</view></view>
			</view>
			
			
		</view>
		
		
		
		
		<!-- 商品主图轮播 -->
		<view class="swiper-box">
			<swiper circular="true" autoplay="true" @change="swiperChange">
				<swiper-item v-for="picture_item in picture_list" :key="picture_item.id">
					<image :src="picture_item.picture"></image>

				</swiper-item>
			</swiper>

			<view class="indicator">{{currentSwiper+1}}/{{picture_length}}</view>

		</view>
		<!-- 标题 价格 -->
		<view class="info-box goods-info">
			<view class="price">￥{{goods_detail.price}}</view>
			<view class="title">
				{{goods_detail.name}}
			</view>
		</view>
		<!-- 服务-规格选择 -->
		<view class="info-box spec">
			<view class="row" @tap="showService">
				<view class="text">服务</view>
				<view class="content"><view class="serviceitem">{{goods_detail.brief}}</view></view>
				<view class="arrow"><view class="icon xiangyou"></view></view>
			</view>
			<view class="row" @tap="showSpec(false)" v-if="isExistSpec">
				<view class="text">选择规格</view>
				<view class="content">
					
					<view class="sp">
						<view>{{spec1}} {{spec2}}</view>
					</view>
				</view>
				<view class="arrow"><view class="icon xiangyou"></view></view>
			</view>
		</view>
		<!-- 评价 -->
		<!-- <view class="info-box comments" id="comments">
			<view class="row">
				<view class="text">商品评价({{goodsData.comment.number}})</view>
				<view class="arrow" @tap="toRatings">
					<view class="show" @tap="showComments(goodsData.id)">
						查看全部
						<view class="icon xiangyou"></view>
					</view>
				</view>
			</view>
			<view class="comment" @tap="toRatings">
				<view class="user-info">
					<view class="face"><image :src="goodsData.comment.userface"></image></view>
					<view class="username">{{goodsData.comment.username}}</view>
				</view>
				<view class="content">
					{{goodsData.comment.content}}
				</view>
			</view>
		</view> -->
		<!-- 详情 -->
		
		<view class="re-commend">
			<view class="re-h">推荐商品</view>
			   <view class="re-goods" v-for="(item,index) in recommend_product_list" :key="index" @tap="block_tanchuang(item)">
				   <image :src="item.picture"></image>
				   <view class="re-txt">{{item.name}}</view>
				   <view class="re-price">¥{{item.price}}</view>
			   </view>
			   
			   <!-- <view class="re-goods">
			   				   <image src="../../static/img/goods.jpg"></image>
			   				   <view class="re-txt">纯银一路鹿有你玫瑰彩金锁骨项链女生日礼物小众设计感ins冷淡风</view>
			   				   <view class="re-price">$184</view>
			   </view>
			   
			   <view class="re-goods">
			   				   <image src="../../static/img/goods.jpg"></image>
			   				   <view class="re-txt">纯银一路鹿有你玫瑰彩金锁骨项链女生日礼物小众设计感ins冷淡风</view>
			   				   <view class="re-price">$184</view>
			   </view> -->
			   
			   
		</view>
		
		<view class="re-commend">
			<view class="re-h">热门商品</view>
			   <view class="re-goods" v-for="(item,index) in recommend_product_list" :key="index">
				   <image :src="item.picture"></image>
				   <view class="re-txt">{{item.name}}</view>
				   <view class="re-price">¥{{item.price}}</view>
			   </view>
	    </view>
		
		
		<view class="description">
			<view class="title">———— 商品详情 ————</view>
			<view class="content">
				<rich-text :nodes="describe|formatRichText"></rich-text>
			</view>
			
		</view>
	</view>
</template>

<script>
	// var app = getApp();
	// var abotapi = require("../../common/abotapi.js");
	var productid;
export default {
	data() {
		return {
			//控制渐变标题栏的参数
			beforeHeaderzIndex: 11,//层级
			afterHeaderzIndex: 10,//层级
			beforeHeaderOpacity: 1,//不透明度
			afterHeaderOpacity: 0,//不透明度
			//是否显示返回按钮
			// #ifndef MP
			showBack:true,
			// #endif
			//轮播主图数据
			picture_list:'',
			goods_detail:'',
			//轮播图下标
			currentSwiper: 0,
			anchorlist:[],//导航条锚点
			selectAnchor:0,//选中锚点
			serviceClass: '',//服务弹窗css类，控制开关动画
			specClass: '',//规格弹窗css类，控制开关动画
			shareClass:'',//分享弹窗css类，控制开关动画
			// 商品信息
			goodsData:{
				id:1,
				name:"商品标题商品标题商品标题",
				price:"127.00",
				number:1,
				service:[
					{name:"正品保证",description:"此商品官方保证为正品"},
					{name:"极速退款",description:"此商品享受退货极速退款服务"},
					{name:"7天退换",description:"此商品享受7天无理由退换服务"}
				],
				spec:["XS","S","M","L","XL","XXL"],
				comment:{
					number:102,
					userface:'',
					username:'大黑哥',
					content:'很不错，之前买了很多次了，很好看，能放很久，和图片色差不大，值得购买！'
				}
			},
			selectSpec:null,//选中规格
			isExistSpec: false, //有无规格
			isKeep:false,//收藏
			//商品描述html
			describe:'',
			descriptionStr:'<div style="text-align:center;"><img width="100%" src="https://ae01.alicdn.com/kf/HTB1t0fUl_Zmx1VjSZFGq6yx2XXa5.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB1LzkjThTpK1RjSZFKq6y2wXXaT.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB18dkiTbvpK1RjSZPiq6zmwXXa8.jpg"/></div>',
			option_list_arr: [],
			spec1: '',
			spec2: '',
			attr_list_arr: [],
			attr_key_arr: [],
			attr_list: [],
			picture_length: 0,
			amount: 1,
			buys:'立即购买',
			status:'',
			action_type: '',
			current_spec: '',
			options_str:'',
			telephone:'',
			shop_userid: '',
			shop_name: '',
			recommend_product_list:[],
			hot_product_list:null,

		};
	},
	onLoad(option) {
		this.abotapi.set_option_list_str(null, this.abotapi.getColor());
		
		this.abotapi.get_shop_info_from_server(this.callback_func_for_shop_info);
		console.log('44444444444',option);
		var that = this;
		
		var options_str = '';
		
		//如果当前访问者没有登录或者注册，那么分析转发过来的链接是否带有推荐者信息
		if(option.userid){
			var userInfo = that.abotapi.get_user_info();
	
			if ((!userInfo) || (!userInfo.userid)) {
				that.abotapi.set_current_parentid(options.userid);
			}
		}
	
		
		if (option.productid) {
			that.productid = option.productid;
		
			options_str += 'productid=' + option.productid + '&';
		}
		    
		
		if (option.price_type){
			that.price_type = option.price_type;
		
			options_str += 'price_type=' + option.price_type+'&';
		}
		    
		options_str = options_str.substr(0, options_str.length -1);
	
		console.log('options_str', options_str);
	
		that.options_str = options_str ;
		
		
		
		this.get_yanyubao_goods_recommend()
		
		
		uni.request({
			
		    url: this.abotapi.globalData.yanyubao_server_url +  '?g=Yanyubao&m=ShopAppWxa&a=product_detail',
		    method: 'POST',
		    data: {
				productid:this.productid
		    },
			
		    header: {
				'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    success: function (res) {
				console.log('5555588558===', res);
				
				if(res.data.code == 1){
					that.goods_detail = res.data.data;
					console.log('that.goods_detail',that.goods_detail);
					that.describe = that.goods_detail.describe;

					that.picture_list = that.goods_detail.picture_list;
					that.picture_length = that.goods_detail.picture_list ? that.goods_detail.picture_list.length : 0;
					
					
					 var attr_list = that.goods_detail.attr_list
					 
					if(attr_list){
						that.isExistSpec = true;
					}
					
					  console.log('attr_list', attr_list);
					  
					  if(that.goods_detail.option_name){
						var option_list_arr = that.goods_detail.option_name.split(' ');
			
					   
					   that.option_list_arr = option_list_arr;
					   that.spec1 = option_list_arr[0];
					   that.spec2 = option_list_arr[1];
			
					  }
					  
					  console.log('option_list_arr', option_list_arr)
			
					  if(attr_list){
						var attr_key_arr = []
						var attr_list_arr = {}                  
						for(var i = 0; i<attr_list.length; i++){
						  var arr = attr_list[i].option_name.split(' ');         
						  if (attr_key_arr.indexOf(arr[0]) == -1) {
							attr_key_arr.push(arr[0]);                        
						  }              
						}
			
						console.log('第一行：', attr_key_arr);
			
						for (var j=0; j < attr_key_arr.length; j++){
						  var attr_arr = []
						  for (var i = 0; i < attr_list.length; i++) {
							var arr = attr_list[i].option_name.split(' ');
			
							if ((attr_key_arr[j] == arr[0]) && arr[1]){
							  attr_arr.push(arr[1])
							}
						  }
						  attr_list_arr[attr_key_arr[j]] = attr_arr
						}
			
						console.log('最终的商品属性列表：', attr_list_arr);            
			
			
						that.attr_list_arr = attr_list_arr;
						that.attr_key_arr = attr_key_arr;
						that.attr_list = attr_list;
								
			
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
		
		// #ifdef MP
		//小程序隐藏返回按钮
		this.showBack = false;
		// #endif
		//option为object类型，会序列化上个页面传递的参数
		console.log(option.cid); //打印出上个页面传递的参数。
		
		
		
		//获取客服电话
		
		
		
		
	},
	onReady(){
		this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
	},
	onPageScroll(e) {
		//锚点切换
		this.selectAnchor = e.scrollTop>=this.anchorlist[2].top?2:e.scrollTop>=this.anchorlist[1].top?1:0;
		//导航栏渐变
		let tmpY = 375;
		e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
		this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
		this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
		//切换层级
		this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
		this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	// onReachBottom() {
	// 	uni.showToast({ title: '触发上拉加载' });
	// },
	
	methods: {
		
		changeSpec1:function(e){
		    var that = this
		    var spec1 = e.currentTarget.dataset.spec1;
		    var option_list_arr = that.option_list_arr;
		    option_list_arr[0] = spec1;
		
		    console.log('aaaaaaaaaaaaaaaaaaa', spec1, option_list_arr)
		    console.log('aaaaaaaaaaaaaaaaaaa', option_list_arr[0])
		
			that.spec1 = spec1;
			that.option_list_arr = option_list_arr;
		
		
		    if (option_list_arr.length == 1){
		      this.current_spec = spec1;
		      this.changeSpec2(null);
		    }
		
		  },
		
		  changeSpec2:function(e){
		    var that = this
		
		    var spec2 = that.current_spec;
		    var spec_str = spec2;
		
		    if(e){
		      spec2 = e.currentTarget.dataset.spec2;
		    }
		
		    var attr_list = that.attr_list;
		    var option_list_arr = that.option_list_arr;
		
		    if (!spec_str){
		      spec_str = that.spec1 + ' ' + spec2
		
		      option_list_arr[1] = spec2
		    }
		
		
			this.spec2 = spec2;
			this.option_list_arr = option_list_arr;
			

		    
		    for (var i = 0; i < attr_list.length; i++){
		      if (spec_str == attr_list[i].option_name){
		        var productid = attr_list[i].productid
		      }
		    }
		
		    uni.request({
		      url: this.abotapi.globalData.yanyubao_server_url +  '?g=Yanyubao&m=ShopAppWxa&a=product_detail',
		      method: 'post',
		      data: {
		        productid: productid,
		      },
		      header: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		      },
		      success: function (res) {
		        var code = res.data.code;
		        if (code == 1) {
				  
				  that.goods_detail = res.data.data;
				  console.log('that.goods_detail',that.goods_detail);
				  that.describe = that.goods_detail.describe;

				  that.picture_list = that.goods_detail.picture_list;
				  that.picture_length = that.goods_detail.picture_list ? that.goods_detail.picture_list.length : 0;		   

		        } else {
		          uni.showToast({
		            title: res.data.msg,
		            icon: 'none'
		          })
		        }
		
		      },
		      fail:function(res){
		        uni.showToast({
		          title: '网络异常',
		          duration: 2000
		        })
		
		      },
		    })	    
		},
		
		callback_func_for_shop_info:function(shop_info){
			
			this.shop_userid = shop_info.userid;
			this.shop_name = shop_info.shop_name;
			
		},
		
		//点击商户头条进入列表
		touTiaoList: function (e) {
		    // console.log('点击商户头条进入列表');
		    uni.navigateTo({
				url: '/pages/home/help/help?sellerid=' + this.abotapi.globalData.default_sellerid
		    })
		},
		
		//轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
		},
		//消息列表
		toMsg(){
			uni.navigateTo({
				url:'../msg/msg'
			})
		},
		// 客服
		toChat(){
			
					
			uni.navigateTo({
				url: "/pages/msg/chat/chat?type=0&userid="  + this.shop_userid + '&name=' + this.shop_name,
			})
				
							
			// var shop_list = uni.getStorageSync("shop_info_from_server_str_" + this.abotapi.globalData.default_sellerid);
			// this.telephone = shop_list.telephone
			// uni.makePhoneCall({
			// 	phoneNumber: this.telephone,
			// })			
			
		},
		// 分享
		share(){
			uni.showToast({title: '请点击右上角分享'});
			return;
			this.shareClass = 'show';
		},
		hideShare(){
			this.shareClass = 'hide';
			setTimeout(() => {
				this.shareClass = 'none';
			}, 150);
		},
		toCart:function(){
			
			if(this.abotapi.globalData.is_shop_cart_in_tabbar == 1){
				uni.switchTab({
					url:'/pages/cart/cart'
				})
			}else{
				uni.navigateTo({
					url:'/pages/cart/cart'
				})
			}
			
			
		},
		//收藏
		keep(){
			this.isKeep = this.isKeep?false:true;
		},
		
		//立即购买
		// buy(){
		// 	if(this.selectSpec==null){
		// 		return this.showSpec(()=>{
		// 			this.toConfirmation();
		// 		});
		// 	}
		// 	this.toConfirmation();
		// },
		
		
		setModalStatus: function (e) {
			this.showSpec();
		    var that = this;
		    var action_type = '';
		    if(e.currentTarget.dataset.type){
				action_type = e.currentTarget.dataset.type;
		    }
		
		    if (e.currentTarget.dataset.status == 1) {
				this.buys = '立即购买';
				this.status = '1';
				this.action_type = action_type;
				
		    }else {
				this.buys = '加入购物车';
				this.status = '2';
				this.action_type = action_type;
		    }
		},
		
		
		
		addShopCart:function(e){ //添加到购物车
		
			
		    var that = this;
			var userInfo = this.abotapi.get_user_info();
			if(!userInfo || !userInfo.userid){
				
				var last_url = '/pages/goods/goods?' + that.options_str;;
				this.abotapi.goto_user_login(last_url,'normal');
				return;
			}
			
		
			// if (e.currentTarget.dataset.status == 1) {
			// 	this.addShopCart = true;
		 //      }
		
		
		    if (e.currentTarget.dataset.status == 1){
		
		      var new_url = '/pages/order/confirmation?amount=' + that.amount + "&productid=" + that.goods_detail.productid + "&action=direct_buy";
		
		      uni.navigateTo({
		        url: new_url,
		      })
		
		    }
		    else if (e.currentTarget.dataset.status == 2){
		      //加入购物车
		      uni.request({
		        url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopApp&a=cart_add',
		        method: 'post',		        
		        data: {
		          amount: that.amount, 
		          checkstr: userInfo.checkstr,
		          productid: that.goods_detail.productid,
		          sellerid: this.abotapi.get_sellerid(),
		          userid: userInfo.userid,
		        },
		        header: {
		          'Content-Type': 'application/x-www-form-urlencoded'
		        },
		        success: function (res) {
		          uni.showToast({
		            title: '添加成功',
					success:()=>{
						that.hideSpec();
					}
		          });
				  
		        },
		        fail: function (e) {
		          uni.showToast({
		            title: '添加失败',
		          });
		        },
		      });
		    }           
		},
		
		
		
		
		//商品评论
		toRatings(){
			uni.navigateTo({
				url:'ratings/ratings'
			})
		},
		//跳转确认订单页面
		toConfirmation(){
			let tmpList=[];
			let goods = {id:this.goodsData.id,img:'../../static/img/goods/p1.jpg',name:this.goodsData.name,spec:'规格:'+this.goodsData.spec[this.selectSpec],price:this.goodsData.price,number:this.goodsData.number};
			tmpList.push(goods);
			uni.setStorage({
				key:'buylist',
				data:tmpList,
				success: () => {
					uni.navigateTo({
						url:'/pages/order/confirmation'
					})
				}
			})
		},
		//跳转评论列表
		showComments(goodsid){
			
		},
		//选择规格
		setSelectSpec(index){
			this.selectSpec = index;
		},

		//修改数量		
		changeNum:function  (e) {
			console.log("数量发生变化_e",e);
		    var that = this;
		    if (e.target.dataset.alphaBeta == 0) {
		        if (that.amount <= 1) {
		            that.amount = 1
		        }else{
					that.amount = parseInt(that.amount) - 1;		   
		        };
		    }else{
				that.amount = parseInt(that.amount) + 1;
		    };
		},
		//跳转锚点
		toAnchor(index){
			this.selectAnchor = index;
			uni.pageScrollTo({scrollTop: this.anchorlist[index].top,duration: 200});
		},
		//计算锚点高度
		calcAnchor(){
			this.anchorlist=[
				{name:'主图',top:0},
				{name:'评价',top:0},
				{name:'详情',top:0}
			]
			let commentsView = uni.createSelectorQuery().select("#comments");
			commentsView.boundingClientRect((data) => {
				
				let statusbarHeight = 0;
				
				//APP内还要计算状态栏高度
				// #ifdef APP-PLUS
					statusbarHeight = plus.navigator.getStatusbarHeight()
				// #endif
				
				let headerHeight = uni.upx2px(100);
				
				if(data){
					this.anchorlist[1].top = data.top - headerHeight - statusbarHeight;
					this.anchorlist[2].top = data.bottom - headerHeight - statusbarHeight;
				}
				
			}).exec();
		},
		//返回上一页
		back() {
			uni.navigateBack();
		},
		//服务弹窗
		showService() {
			console.log('show');
			this.serviceClass = 'show';
		},
		//关闭服务弹窗
		hideService() {
			this.serviceClass = 'hide';
			setTimeout(() => {
				this.serviceClass = 'none';
			}, 200);
		},
		//规格弹窗
		showSpec(fun) {
			console.log('show');
			this.specClass = 'show';
			this.specCallback = fun;
		},
		specCallback(){
			return;
		},
		//关闭规格弹窗
		hideSpec() {
			this.specClass = 'hide';
			//回调

			this.selectSpec&&this.specCallback&&this.specCallback();
			this.specCallback = false;
			setTimeout(() => {
				this.specClass = 'none';
			}, 200);
		},
		discard() {
			
		},
		
		//调用接口
		get_yanyubao_goods_recommend:function(list_type='recommend'){
			console.log('goods=====>>');
			
			var that=this;
			
			var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					//is_recommend:1,
					page_num:6
				};
			
			if(list_type == 'recommend'){
				post_data.is_recommend = 1;
			}
			else if(list_type == 'hot'){
				post_data.is_hot = 1;
			}
			
			
			this.abotapi.abotRequest({
				url:'http://yanyubao.tseo.cn/Yanyubao/ShopApp/product_list',
				method:'post',
				data:post_data,
				success(res){
					console.log('11111111===',res)
					
					if(res.data.code == 1){
						
						if(list_type == 'recommend'){
							var recommend_product_list = res.data.product_list;
							
							that.recommend_product_list = recommend_product_list;
							console.log('11111111===',recommend_product_list)
						}
						else if(list_type == 'hot'){
							var hot_product_list = res.data.product_list;
							
							that.hot_product_list = hot_product_list;
							console.log('11111111===',hot_product_list)
						}
						
						
					}
					
				},
				
				fail:function(e){
					uni.showToast({
					title:'网络异常！',
					duration:2000
					});
				},
             
				
				
			});
			
			
		},
		
		block_tanchuang:function(item){
			console.log('item',item);
		
			uni.navigateTo({
				
			    url: 'goods?productid=' + item.productid  //这是跳转到的页面路径，？id=1这些都是传递的数据，可以直接在test页面接受
			});
		}
	},
	
	filters: {
		/**
		 * 处理富文本里的图片宽度自适应
		 * 1.去掉img标签里的style、width、height属性
		 * 2.img标签添加style属性：max-width:100%;height:auto
		 * 3.修改所有style里的width属性为max-width:100%
		 * 4.去掉<br/>标签
		 * @param html
		 * @returns {void|string|*}
		 */
		formatRichText (html) { //控制小程序中图片大小
			let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
				match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
				match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
				match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
				return match;
			});
			newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
				match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
				return match;
			});
			//newContent = newContent.replace(/<br[^>]*\/>/gi, '');
			
			newContent = newContent.replace(/<p[^>]*>/gi, '<p style="margin:20px;">');
			
			newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;vertical-align: middle;"');
			
			return newContent;
		}	
	}
};
</script>

<style lang="scss">
page {
	background-color: #f8f8f8;
}
@keyframes showPopup {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes hidePopup {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-100%);
		}
	}
	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0);
		}
	}

.icon {
	font-size: 26upx;
}
.status {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height: var(--status-bar-height); //覆盖样式
	/*  #endif  */
	background-color: #f1f1f1;
	transition: opacity 0.05s linear;
}
.header {
	width: 100%;

	height: 100upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */
	.before,
	.after {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
		/*  #endif  */
		transition: opacity 0.05s linear;
		.back {
			width: 125upx;
			height: 60upx;
			flex-shrink: 0;
			.icon {
				margin-left: -10%;
				width: 60upx;
				height: 60upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 42upx;
			}
		}
		.middle {
			width: 100%;
		}
		.icon-btn {
			width: 125upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			.icon {
				&:first-child{
					margin-right: 5upx;
				}
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 42upx;
			}
		}
	}
	.before {
		.back {
			.icon {
				color: #fff;
				background-color: rgba(0, 0, 0, 0.2);
				border-radius: 100%;
			}
		}
		.icon-btn {
			.icon {
				color: #fff;
				background-color: rgba(0, 0, 0, 0.2);
				border-radius: 100%;
				
			}
		}
	}
	.after {
		background-color: #f1f1f1;
		.back {
			.icon {
				color: #666;
			}
		}
		.icon-btn {
			.icon {
				color: #666;
			}
		}
		.middle {
			font-size: 32upx;
			height: 90upx;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 7%;
			view {
				width: (100%/3);
				padding: 0 3%;
				margin: 0 3%;
				display: flex;
				justify-content: center;
				align-items: center;
				&.on {
					margin-bottom: -4upx;
					color: #f47952;
					border-bottom: solid 4upx #f47952;
				}
			}
		}
	}
}
.swiper-box {
	position: relative;
	width: 100%;
	height: 100vw;
	swiper {
		width: 100%;
		height: 100vw;
		swiper-item {
			image {
				width: 100%;
				height: 100vw;
			}
		}
	}
	.indicator{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 25upx;
		height: 40upx;
		border-radius: 40upx;
		font-size: 22upx;
		position: absolute;
		bottom: 20upx;
		right: 20upx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.2);
	}
}
.info-box {
	width: 92%;
	padding: 20upx 4%;
	background-color: #fff;
	margin-bottom: 20upx;
}

.goods-info {
	.price {
		font-size: 46upx;
		font-weight: 600;
		color: #f47925;
	}
	.title {
		font-size: 30upx;
	}
}
.spec {
	.row {
		width: 100%;
		display: flex;
		align-items: center;
		margin: 0 0 30upx 0;
		.text {
			font-size: 24upx;
			color: #a2a2a2;
			margin-right: 20upx;
		}
		.content {
			font-size: 24upx;
			display: flex;
			flex-wrap: wrap;
			color: #a2a2a2;
			.serviceitem{
				margin-right: 10upx;
			}
			.sp {
				width: 100%;
				display: flex;
				view {
					background-color: #f6f6f6;
					padding: 5upx 10upx;
					color: #999;
					margin-right: 10upx;
					font-size: 20upx;
					border-radius: 5upx;
					&.on{
						border: solid 1upx #f47952;
						padding: 4upx 8upx;
					}
				}
			}
			
		}
		
		.arrow {
			position: absolute;
			right: 4%;
			.icon {
				color: #ccc;
			}
		}
	}
}
.comments {
	.row {
		width: 100%;
		height: 40upx;
		display: flex;
		align-items: center;
		margin: 0 0 30upx 0;
		.text {
			font-size: 30upx;
		}
		.arrow {
			font-size: 28upx;
			position: absolute;
			right: 4%;
			color: #17e6a1;
			.show {
				display: flex;
				align-items: center;
				.icon {
					color: #17e6a1;
				}
			}
		}
	}
	.comment {
		width: 100%;
		.user-info {
			width: 100%;
			height: 40upx;
			display: flex;
			align-items: center;
			.face {
				width: 40upx;
				height: 40upx;
				margin-right: 8upx;
				image {
					width: 40upx;
					height: 40upx;
					border-radius: 100%;
				}
			}
			.username {
				font-size: 24upx;
				color: #999;
			}
		}
		.content {
			margin-top: 10upx;
			font-size: 26upx;
		}
	}
}
.description {
	.title {
		width: 100%;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26upx;
		color: #999;
		position: relative;
	}
}
.footer {
	position: fixed;
	bottom: 0upx;
	width: 92%;
	padding: 0 4%;
	height: 99upx;
	border-top: solid 1upx #eee;
	background-color: #fff;
	z-index: 2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.icons {
		display: flex;
		height: 80upx;
		margin-left: -4%;
		.box {
			width: 80upx;
			height: 80upx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			.icon {
				font-size: 40upx;
				color: #828282;
			}
			.text {
				display: flex;
				justify-content: center;
				width: 100%;
				font-size: 22upx;
				color: #666;
			}
		}
	}
	.btn {
		height: 80upx;
		border-radius: 40upx;
		overflow: hidden;
		display: flex;
		margin-right: -2%;
		.joinCart,
		.buy {
			height: 80upx;
			padding: 0 40upx;
			color: #fff;
			display: flex;
			align-items: center;
			font-size: 28upx;
			background-color: #f06c7a;
		}
		.joinCart {
			background-color: #f0b46c;
		}
		.joinCart-null{
			background-color: #808080;
			height: 80upx;
			padding: 0 40upx;
			color: #fff;
			display: flex;
			align-items: center;
			font-size: 28upx;
		}
		.buy-null {
			height: 80upx;
			padding: 0 40upx;
			color: #fff;
			display: flex;
			align-items: center;
			font-size: 28upx;
			background-color: #808080;
			opacity: 0.4;
		}
	}
}
.popup {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 20;
	display: none;
	.mask{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 21;
		background-color: rgba(0, 0, 0, 0.6);
	}
	.layer {
		position: fixed;
		z-index: 22;
		bottom: -40%;
		width: 92%;
		padding: 0 4%;
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
		.content {
			width: 100%;
			padding: 20upx 0;
			
		}
		.btn {
			width: 100%;
			height: 100upx;
			.button {
				width: 100%;
				height: 80upx;
				border-radius: 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #f47952;
				font-size: 28upx;
			}
		}
	}
	.layer2 {
		position: fixed;
		z-index: 22;
		bottom: 0;
		width: 92%;
		padding: 0 4%;
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
		.content {
			width: 100%;
			padding: 20upx 0;
			.text{
				float: left;
				font-size: 36upx;
			}
			.guige{
				border-bottom: 1px solid #bfbfbf;
				padding-bottom: 10px;
				margin-bottom: 10upx;
			}
		}
		.btn {
			width: 100%;
			height: 100upx;
			.button {
				width: 100%;
				height: 80upx;
				border-radius: 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #f47952;
				font-size: 28upx;
			}
		}
	}
	
	&.show {
		display: block;
		.mask{
			animation: showPopup 0.2s linear both;
		}
		.layer {
			animation: showLayer 0.2s linear both;
		}
	}
	&.hide {
		display: block;
		.mask{
			animation: hidePopup 0.2s linear both;
		}
		
		.layer {
			animation: hideLayer 0.2s linear both;
		}
	}
	&.none {
		display: none;
	}
	&.service {
		.row {
			margin: 30upx 0;
			.title {
				font-size: 30upx;
				margin: 10upx 0;
			}
			.description {
				font-size: 28upx;
				color: #999;
			}
		}
	}
	&.spec {
		.title {
			font-size: 30upx;
			margin: 30upx 0;
		}
		.sp {
			display: flex;
			view {
				font-size: 28upx;
				padding: 5upx 20upx;
				border-radius: 8upx;
				margin: 0 30upx 20upx 0;
				background-color: #f6f6f6;
				&.on {
					padding: 3upx 18upx;
					border: solid 1upx #f47925;
				}
			}
		}
		.length{
			margin-top: 30upx;
			border-top: solid 1upx #aaa;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 20upx;
			.text{
				font-size: 30upx;
			}	
		}
	.number{
		float:right;
		display: flex;
		justify-content: center;
		align-items: center;
		.input{
			width: 80upx;
			height: 60upx;
			margin: 0 10upx;
			background-color: #f3f3f3;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			input{
				width: 80upx;
				height: 60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				font-size: 26upx;
			}
		}
		
		.sub ,.add{
			width: 60upx;
			height: 60upx;
			background-color: #f3f3f3;
			border-radius: 5upx;
			.icon{
				font-size: 30upx;
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				
			}
		}
	}
	}
}
.share{
	display: none;
	&.show {
		display: block;
		.mask{
			animation: showPopup 0.15s linear both;
		}
		.layer {
			animation: showLayer 0.15s linear both;
		}
	}
	&.hide {
		display: block;
		.mask{
			animation: hidePopup 0.15s linear both;
		}
		
		.layer {
			animation: hideLayer 0.15s linear both;
		}
	}
	&.none {
		display: none;
	}
	.mask{
		background-color: rgba(0,0,0,.5);
		position: fixed;
		width: 100%;
		height: 100%;
		top:0;
		z-index: 11;
	}
	.layer{
		width: 92%;
		position: fixed;
		z-index: 12;
		padding: 0 4%;
		top: 100%;
		background-color: rgba(255,255,255,0.9);
		.list{
			width: 100%;
			display: flex;
			padding:10upx 0 30upx 0;
			.box{
				width: 25%;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				image{
					width: 13.8vw;
					height: 13.8vw;
				}
				.title{
					margin-top: 10upx;
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 26upx;
				}
			}
		}
		.btn{
			width: 100%;
			height: 100upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			border-top: solid 1upx #666666;
		}
		.h1{
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 34upx;
		}
		.rich-text .img{
			max-width:100%;
		}
		
	}
}


.specs{
	  padding-left: 5%;
	  font-size:28rpx;
	}
	
	.specs-a{
	  padding:2% 5% 0 5%;
	  
	  margin-top:20rpx;
	}
	
	.specs-b{
	  font-size:28rpx;
	  border-top:2px solid rgb(204, 204, 204);
	  padding-top:14rpx;
	
	}
	
	.specs-c{
	  display: flex;
	  padding:3% 5% 0 5%;
	  flex-wrap:wrap;
	}
	.specs-c view{
	  font-size:28rpx;
	  padding:4rpx 10rpx;
	  margin-left: 10rpx;
	  border-radius: 8rpx;
	}
	
	.specs-d{
	  border:1px solid #e5e5e5;
	  color:#444;
	  margin-right: 20rpx;
	  font-size:28rpx;
	  padding:6rpx 14rpx;
	  border-radius:5px;
	}
	
	.specs-e{
	  border:1px solid #dd2727;
	  background-color:#dd2727; 
	  color:#fff;
	  margin-right: 20rpx;
	  font-size:28rpx;
	  padding:6rpx 14rpx;
	  border-radius:5px;
	}

.text_center{
 width: 100%;
 margin: 20px 0px;
}
.mingcheng{
width: 60%;
display: inline-block;
font-size:35rpx;
line-height: 50rpx;
margin-left: 40rpx;
}
.drawer_image {
  width: 28%;
  height: 200rpx;
}
.re-commend	{
	background-color: white;
	overflow: hidden;
}
.re-h{
	margin:20upx ;
}
.re-goods{
	float: left;
	width: 33%;
}
.re-goods image{
	width: 200upx;
	height:200upx;
	margin-left: 30upx;
	border-radius: 20upx;
}
.re-txt{
	font-size: 25upx;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	width: 200upx;
	margin-left:35upx ;
}
.re-price{
	font-size: 35upx;
	text-align: center;
	color: #f47925;
}
.warm{
	background-color: #AAAAAA;
	color: #FFFFFF;
	text-align: center;
	position:absolute;
	z-index:99;
	position: fixed;
	bottom: 95upx;
	width: 100%;
	font-size: 35upx;
	
}
</style>
