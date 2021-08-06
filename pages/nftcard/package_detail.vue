<template>
	<view class="global_background">
		<!-- 封面  模糊背景 -->
		<view class="" style="height: 550rpx;">
			
				<image class="package_background" :src="current_package_detail.cover_img_url" ></image>
			<!-- <view class="">
				<image class="package_image" :src="current_package_detail.cover_img_url" ></image>
			</view> -->
			<!-- icon喜欢图标-----喜欢人数------ -->
			<view class="like_number" >
				<image v-if="current_package_detail.is_like == 0"  @tap="set_like(1)" src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/like.jpg"
					mode="widthFix" style="width: 70rpx; margin-top: 10rpx;margin-left: 5rpx; " ></image>
				<image v-if="current_package_detail.is_like == 1" @tap="set_like(0)"  src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/already_like.jpg" 
					mode="widthFix" style="width: 76rpx; margin-top: 7rpx; margin-left: 3rpx;"  ></image>
				<!-- <view style="font-weight: 100; font-size: 10rpx;"> {{current_package_detail.like_count}}</view> -->
			</view>
			
			
			<view class="package_ps">
				<image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/ps.jpg"
					mode="widthFix" style="width: 70rpx;margin-top: 5rpx;margin-left: 5rpx;"></image>
			</view>
		</view>
		
		<!-- 卡包详情 -->
		<view class="package_information">
			
			<view class="label_like_number" >
				
			
				
				
				<!-- 标签 -->
				<view class="package_label">
					<view class="package_lable_list" v-for="(item,index) in current_package_detail.tag_list">{{item}}</view>
				</view>
			</view>
			
			
			<!-- 卡包名字---简介 -->
			<view class="package_title">{{current_package_detail.title}}</view>
			<view class="package_detail_brief">
				{{current_package_detail.brief}}
			</view>
			
		
			<!-- 开始时间~~~结束时间 -->
			<view class="begin_end_time" >
				{{current_package_detail.time_begin}}~{{current_package_detail.time_end}}
			</view>		
		</view>
	
	
		<!-- 发行商图片及简介 12324-->
		<view class="publish_information" @tap="go_to_supplier_detail()">
			<image class="publish_icon" :src="current_package_detail.supplier_icon" 
				mode="widthFix" style="width: 150rpx;height:150rpx ;"></image>
			<view class="package_card_publish">
				
				<!-- icon关注图标 -->
				<view class="" style="float: right; margin-right: 20rpx;">
					<image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/follow.png" 
						mode="widthFix" style="width: 120rpx;"></image>
				</view>
				
				
				<!-- 发行商名字----详情 -->
				<view class="publish_name">{{current_package_detail.supplier_name}}</view>
				<view class="publish_brief" style="font-weight: 300; font-size: 10rpx;">{{current_package_detail.supplier_brief}}</view>
					
			</view>
				
		</view>
			
		
	
	
		<!-- 筛选框 -->
	<scroll-view scroll-x="true">
		<view class="scroll_button">
			<view class="scroll_items">
				<button size="mini">全部</button>
			</view>	
			<view class="scroll_items">
				<button size="mini">典藏卡</button>
			</view>
			<view class="scroll_items">
				<button size="mini">珍藏卡</button>
			</view>	
			<view class="scroll_items">
				<button size="mini">已有</button>
			</view>		
			<view class="scroll_items">
				<button size="mini">未有</button>
			</view>
		</view>
		
						
	</scroll-view>
		
							
		<!-- 卡包中的卡牌 --> 
		<view class="card_list_background">
			<view class="my_package_detail_card_list">
				<view class="card_list"
					v-for="(current_card_item,index) in current_card_list"
					@tap="go_to_card_detail(current_card_item.packageid, current_card_item.cardid)">
				<view class="">
					<image class="package_card_img" :src="current_card_item.cover_img_url"></image>
					
					
					<!-- icon喜欢图标和喜欢人数-----------已有卡牌/已发售卡牌 -->
					<view class="already_sold_card_icon_like">
						<view class="card_like_num" >
							<image class="card_img" src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/package_example/collect.png" mode="widthFix" style="width: 25rpx;"></image>
							{{current_card_item.favorite_counter}}
						</view>
						<view class="sold_card">
							（{{current_card_item.userid_card_publish_count}}/{{current_card_item.cardid_card_publish_count}}）
						</view>
						
					</view>
					
									
						<!-- 卡牌名称-----卡牌简介 -->
					<view class="package_card_name_brief">
						<view class="package_card_name" >{{current_card_item.card_name}}</view>
								<!-- <view style=" font-weight: 100; font-size: 10rpx;">发行商：{{current_card_item.supplier_name}}</view> -->
							
						<view class="package_card_description" >
							{{current_card_item.description}}{{current_card_item.brief}}
								
						</view>
					</view>
					
					
				</view>
					
					
				</view>	 
			</view>
					
		</view>
		
		
		<!-- 系列卡包 -->
		<view class="" style="margin: 20rpx;">
			<view style="font-weight: 100;font-size: 10rpx;float: right;color: red;margin-top: 5rpx;" 
			@tap="go_to_package_list()">>>更多卡包>></view>
			<view class="" style="font-weight: bold;">系列卡包</view>
		</view>
		<scroll-view scroll-x="true">
			<view class="series_package" style="display: flex;">
				<view class="" style="margin-left: 20rpx;margin-bottom: 30rpx;" v-for="(current_card_item,index) in current_card_list"
						@tap="go_to_card_detail(current_card_item.packageid, current_card_item.cardid)">
					<image :src="current_card_item.cover_img_url" mode=""
						style="width: 340rpx;border-radius: 10rpx;overflow: hidden;"></image>
					<view style="font-weight: bold;margin-left: 5rpx;">{{current_card_item.card_name}}</view>
				</view>	
			</view>
					
		</scroll-view>
			
		
		
		
		
		
		<!-- 富媒体文本展示卡牌详情 -->
		<view class="description001">
			<view class="content">
				<!-- #ifdef MP-ALIPAY -->
				<rich-text :nodes="card_description"></rich-text>
				<!-- #endif -->
				<!-- #ifndef MP-ALIPAY -->
				<rich-text :nodes="card_description|formatRichText"></rich-text>
				<!-- #endif -->
			
			
			</view>
			
		</view>
			
	
	</view>
</template>

<script>
	
import util from '../../common/util.js';

// #ifdef MP-ALIPAY
import parseHtml from "../../common/html-parser.js"
// #endif
	
	
export default {
	data() {
		return {
			current_params_str:'',	//网址参数
			
			current_package_detail:null,
			current_card_list:null,
			current_packageid:0,
			current_cardid:0, 
			current_userid:0,
			
			current_supplier_detail:null,
			
			card_description:'',  //卡包的富媒体描述
		};
	},
	onLoad: function (options) {
		
		console.log('当前时间：' + util.formatTime( new Date() ) + ' ' + util.formatTime2( new Date() ) + ':01' );
		
		console.log('pages/tabBar/index/index====>>>>', options);
		
		var that = this;
		
		uni.setNavigationBarTitle({
			title : that.abotapi.globalData.default_shopname
		});
		
		uni.setNavigationBarTitle({
			title : '卡包详情',
		});
		
		this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
		
		
		//=== 参数拼接 ====
		this.current_params_str = '';
		
		for(var key in options){
		  this.current_params_str += key+'='+options[key]+'&';
		}			
		if(this.current_params_str != ''){
			this.current_params_str = this.current_params_str.substr(0, this.current_params_str.length-1);
		}
		//======== End ============
		
		
		that.current_packageid = options.packageid;
		
		console.log('that.current_packageid ===》》 ', that.current_packageid);
		
		if(!that.current_packageid){
			uni.showModal({
				title:'',
				content:',',
				showCancel:false
			});
			
			return;
		}
		
		
		that.current_package_detail = {'title':''};
		that.current_package_detail.cover_img_url = 'http://192.168.0.205/yanyubao_server/uploads/2021/08/03/610895dcc87bc.jpg';
		that.current_package_detail.description = '';
		that.current_package_detail.cover_img_url = 'http://192.168.0.205/yanyubao_server/uploads/2021/08/03/610895dcc87bc.jpg';
		that.current_package_detail.cover_img_url = 'http://192.168.0.205/yanyubao_server/uploads/2021/08/03/610895dcc87bc.jpg';
		
		
		
		//获取卡包详情
		var post_data = {
				sellerid:that.abotapi.globalData.default_sellerid,
				packageid:that.current_packageid,
			};
			
		var userInfo = that.abotapi.get_user_info();	
		if(userInfo){
			post_data.userid = userInfo.userid;
			post_data.checkstr = userInfo.checkstr;
		}
		
		console.log('=========>>>>>>>>>>>');
		console.log(post_data);
	
		that.abotapi.abotRequest({
			url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_package_detail',
			method: 'post',
		    data: post_data,
		    success: function (res) {
			
				if(res.data.code != 1){
					uni.showToast({
						title:'卡包详情没有数据',
						duration: 2000,
					});
					
					return;
				}
				
				that.current_package_detail = res.data.data;
				
				console.log('current_package_detail ===>>> ', that.current_package_detail);
				
				
				//处理商品详情
				that.card_description = that.current_package_detail.description;
				
				
				// #ifdef MP-ALIPAY		
				
					const filter = that.$options.filters["formatRichText"];
					that.card_description = filter(that.card_description);
				
					//console.log('that.card_description====>>>>', that.card_description);
				
					let data001 = that.card_description;
					let newArr = [];
					let arr = parseHtml(data001);
					arr.forEach((item, index) => {
						newArr.push(item);
					});
				
					//console.log('arr arr arr====>>>>', arr);
					//console.log('newArr newArr newArr====>>>>', newArr);
				
					that.card_description = newArr;
				
				// #endif	
				
				
		    },
		    fail: function (e) {
				uni.showToast({
					title: '网络异常！',
					duration: 2000
				});
		    },
		});
		
		
		
		
		
		
		//获取卡牌列表
		
		that.abotapi.abotRequest({
		    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_card_list',
		    method: 'post',
		    data: {
				sellerid:that.abotapi.globalData.default_sellerid,
				packageid:that.current_packageid,
			
		    },
		    success: function (res) {
				
				if(res.data.code != 1){
					uni.showToast({
						title:'卡包详情没有数据',
						duration: 2000,
					});
					
					return;
				}
				
				that.current_card_list = res.data.data;
				
				console.log('current_card_list ===>>> ', that.current_card_list);
				
				
		    },
		    fail: function (e) {
				uni.showToast({
					title: '网络异常！',
					duration: 2000
				});
		    },
		});
		
	
	
	
		//获取发行商详情
		
		that.abotapi.abotRequest({
		    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/supplier_detail',
		    method: 'post',
		    data: {
				sellerid:that.abotapi.globalData.default_sellerid,
				packageid:that.current_packageid,
		
			
		    },
		    success: function (res) {
				
				if(res.data.code != 1){
					uni.showToast({
						title:'发行商没有数据',
						duration: 2000,
					});
					
					return;
				}
				
				that.current_supplier_detail = res.data.data;
				
				console.log('current_supplier_detail ===>>> ', that.current_supplier_detail);
				
				
		    },
		    fail: function (e) {
				uni.showToast({
					title: '网络异常！',
					duration: 2000
				});
		    },
		});
		
			
			
			
			
	
	
	
	
		
		
		
	},
	onShow:function(){
		console.log('call onShow function (/pages/index/index)');
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
		
		console.log('onPullDownRefresh=====>>>>>');
		
		// #ifndef MP-ALIPAY
		uni.showToast({
			title: '数据更新中……',
			icon:'loading',
		});
		// #endif
		
		// #ifdef MP-ALIPAY
		uni.showToast({
			title: '数据更新中……',
			//icon:'loading', 	//支付宝不支持icon为 loading
			//duration:2000
		});
		// #endif
		
		
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	/*  onReachBottom: function () {
		
		//this.get_product_list();
		
	}, */
	
	onShareAppMessage: function () {
		var that = this;
		
		var option_list = this.abotapi.globalData.option_list;
		
		var share_title = option_list.wxa_share_title;
		if (share_title.length > 22) {
			share_title = share_title.substr(0, 20) + '...';
		}
		
		var share_path = '/pages/index/index?sellerid=' + this.abotapi.get_sellerid();
		
		var userInfo = this.abotapi.get_user_info();
		
		if (userInfo && userInfo.userid) {
			share_path += '&userid=' + userInfo.userid;
		}
		
		var share_img = option_list.wxa_share_img;
		if(!share_img){
			share_img = option_list.wxa_shop_operation_logo_url;
		}
		
		return {
			title: share_title,
			path: share_path,
			imageUrl: share_img,
			success: function(res) {
				// 分享成功
			},
			fail: function(res) {
				// 分享失败
			}
		}
	},
	
	onShareTimeline: function () {
		return this.share_return();
	},
	onAddToFavorites: function () {
		return this.share_return();
	},
	methods: {
		share_return: function() {
			var that = this;
			
			
		
		
		
		},
		
		
		
		
		callback_function_shop_option_data:function(that, cb_params){
			
			console.log('当前调试开关22：' + this.system_debug_flag);
			console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);
			
			if(!cb_params){
				return;
			}
			console.log('cb_params====', cb_params);
		},
		
		
		go_to_card_detail:function(packageid, cardid){
			console.log('packageid===>>>' + packageid);
			console.log('cardid===>>>' + cardid);
			
			uni.navigateTo({
				url: '/pages/nftcard/card_detail?packageid='+packageid+'&cardid='+cardid,
			})
		},
		 
		 
		 go_to_package_list:function(packageid, cardid){
			 console.log('packageid===>>>' + packageid);
			 console.log('cardid===>>>' + cardid);
			 
			 uni.navigateTo({
			 	url: '/pages/nftcard/package_list?packageid='+packageid+'&cardid='+cardid,
			 })
		 },
		 
		
		 
		 
		 
		 
		 
		 go_to_supplier_detail:function(shangid){
		 	
		 	console.log('shangid===>>>' + shangid);
		 	
		 	uni.navigateTo({
		 		url: '/pages/shopDetail/shopDetail?shangid='+shangid,
		 	})
		 },
		  
		
		
		
		set_like:function(value001){
			var that = this;
			
			//======= 判断用户是否登录 ============
			var last_url = '/pages/nftcard/package_detail?'+ that.current_params_str;
			
			var userInfo = that.abotapi.get_user_info();
			if (!userInfo) {
				that.abotapi.goto_user_login(last_url);
			
				return;
			}
			//============= End ================
		
			
			
			//请求服务器接口、喜欢或取消喜欢卡包
			var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					packageid:that.current_package_detail.packageid,					
				};
				
			var userInfo = that.abotapi.get_user_info();	
			if(userInfo){
				post_data.userid = userInfo.userid;
				post_data.checkstr = userInfo.checkstr;
			}

			
			//添加喜欢XXXXXXXXXXXXXXXXXX
			that.abotapi.abotRequest({
			    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/package_like_add',
			    method: 'post',
			    data: post_data,
			    success: function (res) {
					
					if(res.data.code != 1){
						uni.showToast({
							title:'收藏失败',
							duration: 2000,
						});
						
						return;
					}
					
					that.current_userid = res.data.data;
					
					console.log('current_userid  ===>>> ', that.current_userid);
					
					
					
					
					
					//请求成功之后，修改本地的数据
					that.current_package_detail.is_like = value001;
					
					
					
					
					
					
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
			});
			
			
			
				
			
			
			
			
		},
		
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
		formatRichText(html) { //控制小程序中图片大小
	
			let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
				match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
				match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
				match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
				return match;
			});
			newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
				match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
				return match;
			});
			//newContent = newContent.replace(/<br[^>]*\/>/gi, '');
	
			newContent = newContent.replace(/<p[^>]*>/gi, '<p style="margin:10px;">');
	
			newContent = newContent.replace(/\<img/gi,
				'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;vertical-align: middle;"');
	
			newContent = newContent.replace(/<h1[^>]*>/gi, '<h1 class="wxParse-h1">');
			newContent = newContent.replace(/<h2[^>]*>/gi, '<h2 class="wxParse-h2">');
	
			return newContent;
		}
	}
	
}
	
	
</script>

<style>
	@import "/static/css/nftcard.css";
	
	
	
	
	
	.package_background{
		position: absolute;
		width: 100%;
		height: 550rpx;
	}
	
	
/* 	.package_image{
		position: absolute;
		left: 20rpx;
		top: 10rpx;
		transform:translate(30%,10%);
		width: 450rpx;
		height: 450rpx;
		border-radius: 20rpx;
		border: #F0F0F0 solid 2rpx;
		box-shadow: 0rpx 0rpx 20rpx #F0F0F0;
		background-color: #FFFFFF; 
	}*/
	.package_information{
		background-color: #FFFFFF;
		margin:10rpx;
		padding: 0 20rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.label_like_number{
		width: 100%;
		height: 50rpx;
		margin-top: 20rpx;
		margin-bottom: 10rpx;
	}
	.like_number{
		float: right;
		position:relative;
		margin-right: 60rpx;
		margin-top: 80rpx; 
		width: 80rpx; 
		height: 80rpx; 
		background-color: #c2bdbd;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.package_ps{
		float: right;
		position: relative;
		margin-right:-80rpx;
		margin-top: 250rpx;
		width: 80rpx; 
		height: 80rpx; 
		background-color: #c2bdbd;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.package_title{
		 width: 90%; 
		 font-weight: bold;
		 font-size: 40rpx; 
		 white-space: nowrap;
		 overflow: hidden;
		 text-overflow: ellipsis;
		
		 
	}
	.package_detail_brief{
		width: 90%;
		margin-top: 5rpx;
		font-weight: 300; 
		font-size: 10rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.publish_information{
		background-color: #FFFFFF;
		margin: 10rpx ;
	
		display: flex;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.publish_icon{
		border-radius: 50%;
		overflow: hidden;
	
	}
	.package_card_publish{
		width: 100%;
		margin-top: 25rpx;
		margin-left:40rpx;
		
		
	}
	.publish_name{
		margin-bottom: 5rpx;
		width: 60%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.scroll_button{
		display: flex;
		white-space: nowrap;
		justify-content: space-between;
	
	}
	.scroll_items{
		padding: 30rpx 30rpx;
		margin-left: 20rpx;
	}

	.card_list_background{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.my_package_detail_card_list{
		
		background-color: #e2e4e4;
		width: 730rpx;
	
	}
	.card_list{
		display: flex;
		float: left;
		background-color: #FFFFFF;
		width: 350rpx;
		margin:5rpx 8rpx 10rpx 6rpx;
		border-radius: 10rpx;
		overflow: hidden;
		
	}
	.package_card_img{
		border-radius: 10rpx;
		overflow: hidden;
		width: 335rpx; 
		height: 510rpx;
		margin: 8rpx;
		border: #a7c1c3 solid 2rpx;			
	}
	.already_sold_card_icon_like{
		width: 100%;
	}
	.card_like_num{
		font-weight:100;
		font-size: 20rpx; 
		float: right;
		margin-right: 10rpx;
	
	}
	.card_img{
	/* 	border: #e2e4e4 solid 2rpx;
		box-shadow: 0rpx 0rpx 20rpx #F0F0F0;
		background-color: #FFFFFF; */
	}
	.sold_card{
		font-weight: 100;
		font-size: 20rpx;
		margin-left: 10rpx;
	}
	.package_card_name_brief{
		margin-left: 10rpx;
	}
	.package_card_name{
		width: 90%;
		font-weight: bold;
		font-size: 40rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		
	}
	.package_card_description{
		width: 90%;
		font-weight: 300; 
		font-size: 10rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
