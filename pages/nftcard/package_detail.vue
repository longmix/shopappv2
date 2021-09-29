<template>
	<view class="global_background">
		
		<!-- 封面  模糊背景 -->
		<view class="" 
			:style="{width: card_bg_img_width+'rpx', height: card_bg_img_height+'rpx'}">
			
				<image class="package_background" 
					 @load="imageLoad"
					:src="current_package_detail.cover_img_url_3x2"
					:style="{width: card_bg_img_width+'rpx', height: card_bg_img_height+'rpx'}"></image>
			
			
			<!-- icon喜欢图标--------- -->
			<view class="like_number" >
				<image v-if="current_package_detail.is_like == 0" 
					@tap="set_like(1)" src="https://yanyubao.tseo.cn/Tpl/static/nft_card/xin02.png"
					mode="widthFix" style="width: 50rpx;height: 50rpx; margin-top: 15rpx;margin-left: 12rpx;" >
				</image>
				<image v-if="current_package_detail.is_like == 1" @tap="set_like(0)" 
					src="https://yanyubao.tseo.cn/Tpl/static/nft_card/xin.png" mode="widthFix" 
					style="width: 60rpx;height:60rpx;margin-top: 11rpx;margin-left: 8rpx;"  >
				</image>
				<!-- <view style="font-weight: 100; font-size: 10rpx;"> {{current_package_detail.like_count}}</view> -->
			</view>
			
			
			
			<view class="package_ps" @tap="package_showPosterModal()">
				<!-- 截图按钮 -->
				<image src="https://yanyubao.tseo.cn/Tpl/static/nft_card/ps.png"
					mode="widthFix" style="width: 45rpx;height:45rpx;margin-top: 17rpx;margin-left: 18rpx;"></image>
			</view>
			
			<view class="show_modal_mask" v-if="showPosterModal" @tap="showPosterModal=false" @touchmove.stop.prevent = "doNothing"></view>
			<view class="show_modal_pop" v-if="showPosterModal">
				<image :src="current_nftcard_poster.img_url" mode="widthFix" style="width:600rpx;" ></image>
			
			<!--#ifndef MP-WEIXIN  -->
					<button class="purple_btn btn_box" @click="saveImgToLocal" style="color: #FFFFFF;" :style="{background:wxa_shop_nav_bg_color}">
						保存到相册
					</button>
				<!-- #endif -->
				
				<!-- #ifdef MP-WEIXIN -->
				<button v-if="openSettingBtnHidden" class="purple_btn btn_box" @click="saveEwm" style="color: #FFFFFF;" :style="{background:wxa_shop_nav_bg_color}">
					保存到相册
				</button>
				
				<button v-else class="purple_btn btn_box" hover-class="none" style="color: #FFFFFF;" open-type="openSetting" @opensetting='handleSetting'  >保存到相册</button>
				<!-- #endif -->	 
			</view>
			 
		
		</view>
		
		<!-- 卡包详情 -->
		<view class="package_information">
			<view class="">
				<view style="float: right;display: flex;">
					<image src="https://yanyubao.tseo.cn/Tpl/static/nft_card/xin.png" mode="widthFix" 
						style="width: 40rpx;height: 40rpx;margin-top: 10rpx;"></image>
					<view class="package_information_like_count"  >{{current_package_detail.like_count}}</view>
				
				</view>
				<!-- 卡包名字---简介 -->
				<view class="package_title">{{current_package_detail.title}}</view>
				
			</view>
			
			<view class="package_detail_brief">
				{{current_package_detail.brief}}
			</view>
			
		
			<!-- 开始时间~~~结束时间 -->
			<view class="package_begin_end" >
				<view class="begin_end_time" style="display: flex;width: ;">
					<view style="font-size: 20rpx;">有效期：</view>
					<view style="font-size: 20rpx;font-weight: 200;">{{current_package_detail.time_begin_str}}~{{current_package_detail.time_end_str}}</view>
				</view>	
				<!-- 卡包状态  发行===下架  -->
				<view v-if="is_package_time_expire ==false" 
					class="package_state" style="background-color: #30c478;">
					<image src="https://yanyubao.tseo.cn/Tpl/static/nft_card/circle.png" mode="widthFix" 
						style="width: 25rpx;height: 25rpx;margin-right: 10rpx;margin-top: 10rpx;margin-left: 10rpx;"></image>
					<view style="font-size: 25rpx;">{{current_package_detail.status_str}}</view>
				</view>
				<view v-else style="background-color:red;" >
					<image src="https://yanyubao.tseo.cn/Tpl/static/nft_card/down.png" mode="widthFix" 
						style="width: 28rpx;height: 28rpx;margin-top: 10rpx;margin-left: 10rpx;"></image>
					<view style="font-size: 25rpx;margin-left: 10rpx;">已下架</view>
				</view>
				
				<!-- 分享 -->
				<view>
					<!-- #ifdef MP -->
					
					<button class="box share-btn" open-type="share" style="background-color:#ffffff;outline: none;border: none;width: 100rpx;">
						<view class="package_share">
							<image src="https://yanyubao.tseo.cn/Tpl/static/nft_card/share.png" mode="widthFix" 
								style="width: 43rpx;height: 43rpx;margin-bottom: 5rpx;margin-right: 20rpx;"></image>
						</view>
					</button>
					<!-- <button style="padding-left: 0;padding-right: 0;" open-type="share">分享</button> -->
					<!-- #endif -->
					
					<!-- #ifdef APP-PLUS -->
					
					<button class="box share-btn" @click="is_show">
						
						<view class="package_share">
							<image src="https://yanyubao.tseo.cn/Tpl/static/nft_card/share.png" mode="widthFix" 
								style="width: 45rpx;height: 45rpx;margin-top: 8rpx;margin-left: 7rpx;"></image>
						</view>
						
						<!-- <view class="icon fenxiang"></view>
						<view class="text">分享</view> -->
						<!-- <button class="text" open-type="share">分享</button> -->
					</button>
					<!-- <button style="padding-left: 0;padding-right: 0;" open-type="share">分享</button> -->
					<!-- #endif -->
					
					
					<!-- #ifdef H5 -->
					<view class="box" @tap="share_shang_detail">
						<view class="package_share">
							<image src="https://yanyubao.tseo.cn/Tpl/static/nft_card/share.png" mode="widthFix" 
								style="width: 45rpx;height: 45rpx;margin-top: 8rpx;margin-left: 7rpx;"></image>
						</view>
					</view>
					<!-- #endif -->
				</view>
				
				 
			</view>
			
			
		
			<!-- 进度条 -->
		 	<view class="uni-padding-wrap uni-common-mt">
			 	<view class="progress-box">
					<view style="display: flex;">
						<view style="font-weight: 100;">收集进度：</view>
							<view class="">
								（{{current_package_detail.packageid_card_user_buy_count}}/{{current_package_detail.packageid_card_count}}）
							</view>
						<!-- 	<button class="" v-if="!userInfo" style="height: 40rpx;line-height: 40rpx;width: 200rpx;font-size: 25rpx;margin-left: 0rpx;">
								点击查看
							</button> -->
						</view>
					<progress :percent="current_package_detail.sale_percent" activeColor="#30C478" stroke-width="4" 
						show-info="" backgroundColor="red" font-size="15"></progress>
				</view>
			</view>
			
			
			
			<!-- 标签属性 -->
			<view class="package_detail_lable_attribute" >
				<view class="package_detail_lable">标签</view>
				
				<view class="package_label" style="margin-top: 10rpx;">
					<view class="package_detail_lable_list" 
						v-for="(item, index) in current_package_detail.tag_list" 
						:key="index"
						style="font-size: 20rpx;">
						<view style="margin-left: 5rpx;margin-right: 5rpx;">{{item}}</view>
					</view>
				</view>
			</view>
			
		</view>
		
		
		<!-- 发行商图片及简介 以及关注信息-->
		<view class="publish_information">
			
			<!-- icon关注图标 -->
			<view class="publish_icon_follow" :style="{border: wxa_shop_nav_bg_color+ ' 2rpx solid'}" 
				v-if="current_package_detail.is_fans ==0" 
				@tap="set_fans(1)">
				<image  src="https://yanyubao.tseo.cn/Tpl/static/nft_card/follow01.png" 
					mode="widthFix" style="width: 60rpx; height: 33rpx;margin-top: 8rpx; "></image>
				<view style="color: #30c478;margin-left:10rpx; margin-top: 5rpx; font-size: 30rpx;">关注</view>
			</view>
			<view class="publish_icon_follow01" :style="{background:wxa_shop_nav_bg_color}" 
				v-if="current_package_detail.is_fans ==1" 
				@tap="set_fans(0)">
				<image src="https://yanyubao.tseo.cn/Tpl/static/nft_card/follow02.png" 
					mode="widthFix" style="width: 50rpx;height: 30rpx;margin-top:8rpx ;"></image>
				<view style="color: #FFFFFF;margin-left:0rpx; margin-top: 5rpx; font-size: 30rpx;">已关注</view>
			</view>
		
			
			<!-- 发行商图片及简介 12324-->
			<view class="" style="display: flex;" @tap="goto_supplier_detail()">
				<view class="">
					<image class="" :src="current_package_detail.supplier_item.icon_image"
						mode="" style="width: 120rpx;height: 120rpx;border-radius: 50%;margin: 15rpx;"></image>
				</view>
				
				<view class="package_card_publish">
					
					<!-- 发行商名字----详情 -->
					<view class="publish_name">{{current_package_detail.supplier_item.name}}</view>
					<view class="publish_brief">{{current_package_detail.supplier_item.brief}}</view>
						
						
				</view>
					
			</view>
				
			
		</view>
		
	
	
		<!-- 筛选框 -->
		<view class="">
			<view class="list_box">
				<view v-for="(item, tag_item_index) in package_tag_item_list" 
					:key="tag_item_index" 
					@tap="package_tag_item_click(tag_item_index)" 
					:class="[item.selected?'tag_item_selected':'tag_item_unselected']">
						{{item.selected?item.title:item.title}}
						
				</view>
			</view>

		</view>



							
		<!-- 卡包中的卡牌 --> 
		<view class="card_list_background">
			<view class="my_package_detail_card_list">
				<view class="card_list"
						v-for="(current_card_item, index) in current_card_list"
						:key="index"
						@tap="go_to_card_detail(current_card_item.packageid, current_card_item.cardid)">
						
					<view class="" style="width: 340rpx;height: 615rpx;">
						 
					<!--是否购买  加灰透明 加水印 -->
					 <view class="package_detail_kabao">
						<image v-if="current_card_item.is_buyed == 0"
							class="package_card_watermark"
							src="https://yanyubao.tseo.cn/Tpl/static/nft_card/watermark01.png"
							mode="widthFix" >
						</image>
						<image v-if="current_card_item.is_buyed == 0"
							class="package_card_img"
							:src="current_card_item.cover_img_url_2x3_stand"
							style="opacity:0.7 ;">
						</image>
						<image v-if="current_card_item.is_buyed == 1"
							class="package_card_img"
							:src="current_card_item.cover_img_url_2x3_stand" mode="">
						</image>
						
					</view>
					
					
						<!-- icon喜欢图标和喜欢人数-----------已有卡牌/已发售卡牌 -->
						<view class="already_sold_card_icon_like">
							<view class="card_like_num" >
								<image class="card_img" src="https://yanyubao.tseo.cn/Tpl/static/nft_card/collect.png" 
									mode="widthFix" style="width: 25rpx;height: 25rpx;"></image>
								{{current_card_item.favorite_counter}}
							</view>
							<!-- <view class="sold_card">
								（{{current_card_item.buy_counter}}/{{current_card_item.publish_counter}}）
							</view> -->
						</view>
							
									
						<!-- 卡牌名称-----卡牌简介 -->
						<view class="package_card_name_brief">
							<view class="package_card_name" >{{current_card_item.card_name}}</view>
								<!-- <view style=" font-weight: 100; font-size: 10rpx;">发行商：{{current_card_item.supplier_name}}</view> -->
							
							<view class="package_card_description" >
								{{current_card_item.brief}}	
							</view>
						</view>
					</view>
				</view>	 
			</view>
					
		</view>
		
		<view class="package_recommend" >
			<!-- 推荐的卡包 -->
			
				<view class="package_recommend1" >
					<view class="package_recommend2" :style="{borderBottom: wxa_shop_nav_bg_color+' 2rpx solid'}" >
						<image src="https://yanyubao.tseo.cn/Tpl/static/nft_card/suoshukabaotubiao.png" 
							mode="widthFix" 
							style="width: 40rpx;height: 40rpx;margin: 10rpx 10rpx 10rpx 20rpx;"></image>
						<view class="" style="font-weight: bold;color: #30C478;">推荐卡包</view>
					</view>
					
				</view>
		
			
			<scroll-view scroll-x="true">
				<view class="" style="display: flex;margin-left: 20rpx;margin-right: 20rpx;">
					<view class="" style="margin-bottom: 30rpx;" 
							v-for="(current_package_item, index) in current_package_list"
							:key="index"
							@tap="goto_package_detail(current_package_item.packageid)">
						<image class="package_list_recommend" :src="current_package_item.cover_img_url_stand" mode=""></image>
						<view class="series_package" style="font-weight: bold;margin-left: 5rpx;width: 200rpx;word-wrap: break-word;">{{current_package_item.title}}</view>
					</view>	
				</view>
						
			</scroll-view>
				
		</view>
		
		
		
		
		
		
		<!-- 富媒体文本展示卡牌详情 -->
		<view class="" style="background-color: #FFFFFF;margin-top: 30rpx;">
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
		
		<!-- 卡包兑换优惠券 -->
		<view class="" v-if="show_package_to_coupon_btn == 1">
			<button type="default" 
				style="width:100%;position:fixed;bottom:0;"
				:style="{backgroundColor: wxa_shop_nav_bg_color, color: wxa_shop_nav_font_color}"
				@tap="showModal_exchange_btn = true">
				兑换优惠券
			 </button>
		</view>
		
		<!-- 点击兑换按钮的弹层 Begin -->
		<view class="show_modal_mask" v-if="showModal_exchange_btn" @tap="showModal_exchange_btn=false"></view>
		<view class="show_modal_pop" v-if="showModal_exchange_btn"
			 style="width: 650rpx;background-color: #FFFFFF; overflow-y: auto;" >
			<view v-for="(current_coupon_item, index) in current_coupon_list" 
				:key="index"  
				@tap="coupon_exchange(current_coupon_item.couponid)"
				style="display: flex;margin: 20rpx; padding: 20rpx; border-radius: 5rpx;"
				:style="{border:'solid '+ wxa_shop_nav_bg_color + ' 1rpx'}" >

				<view class="" style="">
					<image :src="current_coupon_item.icon" mode="widthFix" style="width: 100rpx;"></image>
				</view>
				<view class="">
					<view class="publish_brief" style="-webkit-line-clamp:1; margin-left: 10rpx;font-size: 28rpx;">
						{{current_coupon_item.name}}
					</view>
					<view class="" style="margin-left: 10rpx; color:#D50F25;">
						￥{{current_coupon_item.price}}
					</view>
					<view class="publish_brief" style="-webkit-line-clamp:2; margin-left: 10rpx;font-size: 24rpx;color: #3c3c3c;">
						{{current_coupon_item.desc}}
					</view>
				</view>
					
			</view>
		</view>
		<!-- 点击兑换按钮的弹层 End -->
	
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
			current_nftcard_poster:null,
			current_package_detail:null,
			current_supplier_detail:null,
			
			current_package_list:null,
			
			current_card_list:null,
			
			current_supplier_fans_add:null,
			
			current_packageid:0,
	
			current_cardid:0, 
			current_nft_supplierid:0,
		
			showPosterModal: false,
			
			card_description:'',  //卡包的富媒体描述
			
			package_tag_item_list:[
				{tag_id:1, selected:true, title:'全部卡牌'},
				{tag_id:2, selected:false, title:'典藏卡'},
				{tag_id:3, selected:false, title:'珍藏卡'},
				{tag_id:4, selected:false, title:'已有'},
				{tag_id:5, selected:false, title:'未有'},
			],
			package_tag_item_selected_seq_list:[],
			
			//卡包是否已经过期
			is_package_time_expire: false,
		
		
		
			wxa_shop_nav_bg_color: '#30C478',
			wxa_shop_nav_font_color:'#ffffff',
			
			openSettingBtnHidden:true,
			
			card_bg_img_width:'750',
			card_bg_img_height:'',
			

			//2021.9.17. 卡包兑换优惠券
			//实现显示兑换按钮
			show_package_to_coupon_btn : 0,
			current_coupon_list:null,
			
			
			showModal_exchange_btn:false,
			
		};
	},
	onLoad: function (options) {
		
		console.log('当前时间：' + util.formatTime( new Date() ) + ' ' + util.formatTime2( new Date() ) + ':01' );
		
		console.log('newDate====>>>>>>', util.get_time_stamp() );
		
		
		console.log('pages/nftcard/package_detail ====>>>>', options);
		
		var that = this;
		
		
		//========== 如果是通过带参二维码进来的 =========
		if(options.scene && (options.scene.indexOf('nft_pd_') != -1) ){
			options.packageid = options.scene.replace('nft_pd_', '');
			
			console.log('通过小程序码扫描进入，卡包ID====>>>>>'+options.packageid);
		}
		//================== End =====================
		
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
		
		console.log('that.current_packageid ===>> ', that.current_packageid);
		
		if(!that.current_packageid){
			uni.showModal({
				title:'错误',
				content:'缺少卡包ID',
				showCancel:false
			});
			
			return;
		}
		
		
		
		
		that.current_package_detail = {'title':''};
		that.current_package_detail.cover_img_url = 'https://yanyubao.tseo.cn/Tpl/static/nft_card/default_package_cover.png';
		that.current_package_detail.description = '';
		that.current_package_detail.title ='';			//卡包名称
		that.current_package_detail.brief = '';			//卡包简介
		that.current_package_detail.time_begin_str = 0;	//有效期
		that.current_package_detail.time_end_str = 0;
		that.current_package_detail.supplier_name = '';
		that.current_package_detail.packageid_card_user_buy_count = 0;	//收集进度
		that.current_package_detail.packageid_card_count = 0;
		that.current_package_detail.status_str = '';	//发行   下架
		that.current_package_detail.sale_percent = 0;
		that.current_package_detail.tag_list = '';
		that.current_package_detail.supplier_item = {};
		that.current_package_detail.is_like = 0;
		that.current_nftcard_poster = {};
		
		
		//当前卡包所属的supplierid
		/*if(options.nft_supplierid){
			that.current_nft_supplierid = options.nft_supplierid;
		}
		else{
			that.current_nft_supplierid = that.abotapi.globalData.default_sellerid;
		}*/

		that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);
			

		console.log('导航栏背景颜色：' + that.abotapi.globalData.navigationBar_bg_color);
		
		//获取卡包详情
		that.__get_package_detail();
		
		
		//获取卡牌列表
		that.__nft_get_card_list();
		
		
	
	
		
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
		
		
		//获取卡包详情
		that.__get_package_detail();
		
		
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	/*  onReachBottom: function () {
		
		//this.get_product_list();
		
	}, */
	
	onShareAppMessage: function () {
		var that = this;
		
		var share_title = that.current_package_detail.title;
		
		if(that.abotapi.get_user_info()){
			if(that.abotapi.get_user_account_info()){
				var account_info = that.abotapi.get_user_account_info();
				console.log('昵称======>', account_info);
				
				share_title = account_info.nickname + '向您分享了卡包' + share_title;
			}
		}
		
		
		if (share_title.length > 22) {
			share_title = share_title.substr(0, 20) + '...';
		}
		
		var share_path = '/pages/nftcard/package_detail?sellerid=' +that.abotapi.globalData.default_sellerid;
		share_path += '&packageid='+that.current_packageid;
		
		//如果登录了，则带上分享者的userid
		var userInfo = this.abotapi.get_user_info();
		if (userInfo && userInfo.userid) {
			share_path += '&userid=' + userInfo.userid;
		}
	
		
		var share_img = that.current_package_detail.cover_img_url_stand;
		
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
	
	// 朋友圈
	onShareTimeline: function () {
		return this.share_return();
	},
	
	onAddToFavorites: function () {
		return this.share_return();
	},
	methods: {
		share_return: function() {
			var that = this;
			
			var share_title = that.current_package_detail.title;
			if (share_title.length > 22) {
				share_title = share_title.substr(0, 20) + '...';
			}
			
			var share_path = '/pages/nftcard/package_detail?sellerid=' +that.abotapi.globalData.default_sellerid;
			share_path += '&packageid='+that.current_packageid;
			
			//如果登录了，则带上分享者的userid
			var userInfo = this.abotapi.get_user_info();
			if (userInfo && userInfo.userid) {
				share_path += '&userid=' + userInfo.userid;
			}
			
			var share_img = that.current_package_detail.cover_img_url_stand;
			
			
			return {
				title: share_title,
				query: share_path,
				imageUrl: share_img,
			}
			
			
		},
		
		__get_package_detail:function(){
			var that = this;
			
			//获取卡包详情
			var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					packageid:that.current_packageid,
					//nft_supplierid : that.current_nft_supplierid,
					
				};
			var userInfo = that.abotapi.get_user_info();
			if (userInfo) {
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
							title:'卡包详情没数据',
							duration: 2000,
						});
						
						return;
					}
			
					that.current_package_detail = res.data.data;
					
					console.log('current_package_detail ===>>> ', that.current_package_detail);
					
					//计算已经售出的备份比
					that.current_package_detail.sale_percent = 0;
					if(that.current_package_detail.packageid_card_count == 0){
						that.current_package_detail.sale_percent = 100;
					}
					else{
						console.log('fenmu===========>',that.current_package_detail.packageid_card_count);
						console.log('fenzi===========>',that.current_package_detail.packageid_card_user_buy_count);
						console.log('===========>',that.current_package_detail.sale_percent);
						
						
						
						that.current_package_detail.sale_percent =
							parseInt(that.current_package_detail.packageid_card_user_buy_count/that.current_package_detail.packageid_card_count*100);
					}
					
					
					//检查卡包是否已经过期
					if(that.current_package_detail.time_end < util.get_time_stamp()){
						that.is_package_time_expire = true;
					}
					
					
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
					
					
					//获取相关卡包列表				
					that.__nft_get_relate_package_list();
					
					//查询当前卡包是否可兑换
					that.__nft_check_package_vs_coupon();
					
					
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
			});
			
			
			
			
		},
		
		// 2021.08.09获取卡牌封面的真实宽度
		imageLoad: function (e) {
			var that = this;
			
			//图片的宽度和高度
		    var imgwidth = e.detail.width;
		    var imgheight = e.detail.height;
			
		    //宽高比  
		    var ratio = imgwidth / imgheight;
			
			console.log('imageLoad id===>>> ' +'图片实际大小：');
		    console.log(imgwidth, imgheight)
			
		    //计算的高度值  
			that.card_bg_img_width = 750;
			that.card_bg_img_height = that.card_bg_img_width / ratio;
			
			
		   
		},
		
		//微信小程序保存到相册
		handleSetting(e){
			
			var that = this;
			
			if(!e.detail.authSetting['scope.writePhotosAlbum']){
				that.openSettingBtnHidden = false;
			}else{
				that.openSettingBtnHidden = true;
			}
		},
		saveEwm:function(e){
			var that = this;
			//获取相册授权
			uni.getSetting({
				success(res){
					if(!res.authSetting['scope.writePhotosAlbum']){
						uni.authorize({
							scope:'scope.writePhotosAlbum',
							success(){
								that.saveImgToLocal();
							},
							fail(){
								that.openSettingBtnHidden=false
							}
						})
					}else{
						that.saveImgToLocal();
					}
				}
			})
		},
		saveImgToLocal:function(e){
			var that = this;
			
			uni.showModal({
				title:'提示',
				content:'确认保存到相册',
				success:function(res){
					if(res.confirm){
						uni.downloadFile({
							url:that.current_nftcard_poster.img_url,
							success:function(res) {
								if(res.statusCode === 200){
									
									uni.saveImageToPhotosAlbum({
										filePath:res.tempFilePath,
										success:function(){
											uni.showToast({
												title:"保存成功",
												duration: 2000,
											});
										},
										fail:function(){
											uni.showToast({
												title:"保存失败",
												duration: 2000,
											});
										}
									});
								}	
							}	
						})
					}else if (res.cancel){
						
					}
				}
			});
		},
		
		
		
	
/**
 * @param {Object} tag_item_index
 * 			package_tag_item_list:[
				{tag_id:1, selected:true, title:'全部卡牌'},
				{tag_id:2, selected:false, title:'典藏卡'},  免费
				{tag_id:3, selected:false, title:'珍藏卡'},  收费
				{tag_id:4, selected:false, title:'已有'},
				{tag_id:5, selected:false, title:'未有'},
			],
 */	
		package_tag_item_click(tag_item_index){
			
			var filter_price_type = -1;   // 1 免费  2  收费
			var filter_userid_type = -1;  // 1 已有  2  未有
			
			
			var click_tag_id = -1;
			click_tag_id = this.package_tag_item_list[tag_item_index].tag_id;
			
			//1，控制界面变化
			if(this.package_tag_item_list[tag_item_index].selected == true ){
				
				this.package_tag_item_list[tag_item_index].selected = false;
				
				/*
				for (var i=0; i< this.package_tag_item_selected_seq_list.length; i++){
					if(this.package_tag_item_selected_seq_list[i] == click_tag_id){
						this.package_tag_item_selected_seq_list.splice(i, 1);
					}
					
				}*/
			}
			else{
				
				this.package_tag_item_list[tag_item_index].selected = true;
				
				//this.package_tag_item_selected_seq_list.push(this.package_tag_item_list[tag_item_index].tag_id);
				
				//如果选择的  全部
				if(click_tag_id == 1){
					
					for (var i=0; i< this.package_tag_item_list.length; i++){
						if(this.package_tag_item_list[i].selected && (this.package_tag_item_list[i].tag_id != 1)){
							this.package_tag_item_list[i].selected = false;
						}
						
					}
				}
				else{
					for (var i=0; i< this.package_tag_item_list.length; i++){
						if(this.package_tag_item_list[i].selected && (this.package_tag_item_list[i].tag_id == 1)){
							this.package_tag_item_list[i].selected = false;
						}
						
					}
				}
				
				
			}
			
			
			//2，计算那些被选中了
			var tag_id001 = this.package_tag_item_list[0].selected;
			var tag_id002 = this.package_tag_item_list[1].selected;
			var tag_id003 = this.package_tag_item_list[2].selected;
			var tag_id004 = this.package_tag_item_list[3].selected;
			var tag_id005 = this.package_tag_item_list[4].selected;
			
			if(tag_id001){
				
			}
			else{
				if(tag_id002 && tag_id003){
					
				}
			
				else if(tag_id002){
					//免费的卡牌
					filter_price_type = 1;
					
				
					
					
				}
				else if(tag_id003){
					//收费的卡牌
					filter_price_type = 2;
					
	
				}
				
				if(tag_id004 && tag_id005){
					
				}
				else if(tag_id004){
					//已有的卡牌
					filter_userid_type = 1;
				}
				else if(tag_id005){
					//还没有的卡牌
					filter_userid_type = 2;
				}
				
			}
			
			//获取卡牌的列表
			this.__nft_get_card_list(filter_price_type, filter_userid_type);
			
			
		},
		
		
		
		
		
		
		
		
		
		callback_function_shop_option_data:function(that, cb_params){
			
			console.log('当前调试开关22：' + this.system_debug_flag);
			console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);
			
			if(!cb_params){
				return;
			}
			
			
			console.log('cb_params====', cb_params);
			
			that.wxa_shop_nav_bg_color  = cb_params.option_list.wxa_shop_nav_bg_color;
			that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
			
		},
		
		
		go_to_card_detail:function(packageid, cardid){
			console.log('packageid===>>>' + packageid);
			console.log('cardid===>>>' + cardid);
			
			uni.navigateTo({
				url: '/pages/nftcard/card_detail?packageid='+packageid+'&cardid='+cardid,
			})
		},
		
		goto_package_detail:function(packageid){
			uni.navigateTo({
				url:'/pages/nftcard/package_detail?packageid='+packageid,
			})
		},
		 
		 
		//  go_to_package_list:function(packageid, cardid){
		// 	 console.log('packageid===>>>' + packageid);
		// 	 console.log('cardid===>>>' + cardid);
			 
		// 	 uni.navigateTo({
		// 	 	url: '/pages/nftcard/package_list?packageid='+packageid+'&cardid='+cardid,
		// 	 })
		//  },
		
		
		//h5点击分享触发
		share_shang_detail: function() {
			console.log('==================>>>h5');
			uni.showModal({
				title: '请点击浏览器菜单中的分享按钮',
				showCancel: false,
			})
		
			return;
		},
		
		//app  分享点击
		click_wxa_share: function() {
			abotsharejs.click_wxa_share(this.share_href, this.share_titles, this.share_summary, this.share_imageUrl);
		},
		 
		
		 
		goto_supplier_detail:function(){
			var shangid = this.current_package_detail.sellerid;
			 
		 	console.log('跳转到发行商详情:' + shangid);
		
		 	uni.navigateTo({
		 		url: '/pages/nftcard/shopDetail?shangid='+this.current_package_detail.sellerid,
				success: (res) => {
					console.log(res);
				},
				fail: (res) => {
					console.log(res);
				},
				complete: (res) => {
					console.log(res);
				}
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

			
			//添加喜欢   请求喜欢接口
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
						
				
					}
					
					console.log('package_like_add  ===>>> ', res.data.data);
					
					
					
					
					
					//请求成功之后，修改本地的数据
					that.current_package_detail.is_like = value001;
					
					if (value001 == 1) {
						that.current_package_detail.like_count++;
					} else {
						that.current_package_detail.like_count--;
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
			
		
		package_showPosterModal:function(){
			var that = this;
			
			//======= 判断用户是否登录 ============
			/*
			var last_url = '/pages/nftcard/package_detail?'+ that.current_params_str;
			
			var userInfo = that.abotapi.get_user_info();
			if (!userInfo) {
				that.abotapi.goto_user_login(last_url);
			
				return;
			}*/
			//============= End ================
			
				
			var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					packageid:that.current_packageid,
					data_type:'package',		
				};
			
			
			var userInfo = that.abotapi.get_user_info();
			if(userInfo){
				post_data.userid = userInfo.userid;
				post_data.checkstr = userInfo.checkstr;
			}
				
				
			
			that.abotapi.abotRequest({
			    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_nftcard_poster',
			    method: 'post',
			    data:post_data,
			    success: function (res) {
					
					if(res.data.code != 1){
						uni.showToast({
							title:'没数据',
							duration: 2000,
						});
						
						return;
					}
			
					
					that.showPosterModal = !that.showPosterModal;
					
			
			
					that.current_nftcard_poster = res.data;
					
					console.log('current_nftcard_poster ===>>> ', that.current_nftcard_poster);
				
				
				
							
					
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
			});
			
		},
		
				
		set_fans:function(value002){
			var that = this;
			
			//======= 判断用户是否登录 ============
			var last_url = '/pages/nftcard/package_detail?'+ that.current_params_str;
			
			var userInfo = that.abotapi.get_user_info();
			if (!userInfo) {
				that.abotapi.goto_user_login(last_url);
			
				return;
			}
			//============= End ================
		
			
			
		
			
			//请求服务器接口、关注 已关注
			var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					
					nft_supplierid:that.current_package_detail.sellerid,
				};
				
			var userInfo = that.abotapi.get_user_info();	
			if(userInfo){
				post_data.userid = userInfo.userid;
				post_data.checkstr = userInfo.checkstr;
			}

			
			//添加关注   请求粉丝接口 
			that.abotapi.abotRequest({
			    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/supplier_fans_add',
			    method: 'post',
			    data: post_data,
			    success: function (res) {
					
					if(res.data.code != 1){
						uni.showToast({
							title:'关注失败',
							duration: 2000,
						});
						
						return;
					}
					
					that.current_supplierid = res.data.data;
					
					console.log('current_supplierid  ===>>> ', that.current_supplierid);
					
					
					
					
					
					//请求成功之后，修改本地的数据
					that.current_package_detail.is_fans = value002;
					
					
					
					
					
					
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
			});
			
		
			
			
			
		},
		
		__nft_get_card_list:function(filter_price_type=-1, filter_userid_type=-1){
			var that = this;
			
			
				//======= 判断用户是否登录 ============
					//  var last_url = '/pages/nftcard/card_detail?' + that.current_params_str;
					
					//  var userInfo = that.abotapi.get_user_info();
					//  if (!userInfo) {
					// 	that.abotapi.goto_user_login(last_url);
					
					//  	return;
					//  }
				//============= End ================
		

			
			var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					packageid:that.current_packageid,
					page: 1,
					page_size:20,
			};
			
			
			    var userInfo = that.abotapi.get_user_info();
			    if (userInfo) {
			    	post_data.userid = userInfo.userid;
			    	post_data.checkstr = userInfo.checkstr;
			   }
			
			
			
			
			if(filter_price_type != -1){
				//典藏卡
				post_data.filter_price_type = filter_price_type;
			}
			
			if(filter_userid_type != -1){
				//典藏卡
				post_data.filter_userid_type = filter_userid_type;
			}
			
			
			
			that.abotapi.abotRequest({
			    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_card_list',
			    method: 'post',
			    data: post_data,
			    success: function (res) {
					
					if(res.data.code != 1){
						uni.showToast({
							title:res.data.msg,
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
			
			
			
			
			
		},
		
		__nft_get_relate_package_list:function(){
			var that = this;
		
			// 获取推荐卡包但不获取自己
			that.abotapi.abotRequest({
			    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_package_list',
			    method: 'post',
			    data: {
					sellerid:that.abotapi.globalData.default_sellerid,
					//nft_supplierid:0,
					//except_supplierid:that.current_package_detail.sellerid,
					except_packageid: that.current_packageid,
			    },
			    success: function (res) {
					
					if(res.data.code != 1){
						uni.showToast({
							title:'卡包列表没数据',
							duration: 2000,
						});
						
						return;
					}
			
					that.current_package_list = res.data.data;
					
					console.log('current_package_list ===>>> ', that.current_package_list);
					
					
					
					
					
					
					
					
							
					
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
			});
			
			
			
			
		},
		
		__nft_check_package_vs_coupon:function(){
			var that = this;
			
			var userInfo = that.abotapi.get_user_info();
			
			if (!userInfo) {
				return;
				
			}
		
		
			//获取单张卡牌的购买记录列表
			var post_data = {
				sellerid:that.abotapi.globalData.default_sellerid,
				packageid:that.current_package_detail.packageid,
				
			};
			
			
			post_data.userid = userInfo.userid;
			post_data.checkstr = userInfo.checkstr;
			
		
		
			// 获取推荐卡包但不获取自己
			that.abotapi.abotRequest({
			    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/nftcard_package_vs_coupon_list',
			    method: 'post',
			    data: post_data,
			    success: function (res) {
					
					if(res.data.code != 1){
						
						
						return;
					}
				
			
					
					
					that.current_coupon_list = res.data.data;
					
					if(that.current_coupon_list.length >= 1){
						that.show_package_to_coupon_btn = 1;
					}
					
					console.log('current_coupon_list ===>>> ', that.current_coupon_list);
					
					
					for(var i=0; i<that.current_coupon_list.length; i++){
					
						
						that.current_coupon_list[i].price = parseInt(that.current_coupon_list[i].price/100);
						
						that.current_coupon_list[i].couponid = that.current_coupon_list[i].couponid
						
					}
					
					console.log('current_coupon_list finnally===>>> ', that.current_coupon_list);
					
				
							
					
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
			});
			
			
			
			
		},
		
		//nftcard_package_to_coupon_add
		coupon_exchange:function(couponid){
			var that = this;
			
			
			var userInfo = that.abotapi.get_user_info();
			
			if (!userInfo) {
				return;
				
			}
		
		
			var post_data = {
				sellerid:that.abotapi.get_sellerid(),
				packageid:that.current_package_detail.packageid,
				couponid: couponid,
			};

			post_data.userid = userInfo.userid;
			post_data.checkstr = userInfo.checkstr;

			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/nftcard_package_to_coupon_add',
				method: 'post',
				data: post_data,
				success: function (res) {
					
					uni.showModal({
						title:'提示',
						content:res.data.msg,
						showCancel:false,
						success: (res002) => {
							if(res.data.code == 1){
								
								uni.navigateTo({
									url:'/pages/nftcard/package_to_coupon_log'
								})
								
								return;
							}
												
						}
					})
					
					
					
							
					
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
	@import "./static/css/nftcard.css";
	
	
	
	button:after{ 
	  display:none;
	 }
	
	
	
	.package_background{
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
		margin:20rpx 10rpx;
		padding: 0 20rpx;
		border-radius: 20rpx;
		overflow: hidden;
		width:690rpx;
	}
	.package_information_like_count{
		margin-top: 10rpx;
		margin-right: 20rpx;
		font-size: 35rpx;
	}
	.label_like_number{
		width: 100%;
		height: 50rpx;
		margin-top: 20rpx;
		margin-bottom: 10rpx;
	}
	.like_number{
		position:absolute;
		width: 75rpx; 
		height: 75rpx;
		background: rgb(0, 0, 0,0.7);
		border-radius: 50%;
		overflow: hidden;
		top:30rpx;
		left:650rpx;
	}
	.package_ps{
		position: absolute;
		width: 80rpx; 
		height: 80rpx; 
		background: rgb(0, 0, 0,0.7);
		border-radius: 50%;
		overflow: hidden;
		top:130rpx;
		left:650rpx;
	}
	
	.package_title{
		width: 80%; 
		margin-bottom: 20rpx;
		margin-top: 10rpx;
		font-weight: bold;
		font-size: 40rpx; 
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		
	}
 	.package_detail_brief{
		
		width: 90%;
		margin-bottom: 10rpx;
		font-size: 25rpx;
		font-weight: 400;
		word-wrap: break-word;
		
	} 
	.package_begin_end{
		display: flex;
		width: 710rpx;
		height: 60rpx;
		line-height: 60rpx;
	}
	.package_state{
		display: flex;
		width:140rpx; 
		border-radius:10rpx;
		margin-right: 10rpx;
		text-align: center; 
		color: #FFFFFF;
		height: 45rpx;
		
		line-height: 45rpx;
		
		margin-top: 12rpx;
	}
	.package_share{
		
		margin-right: 20rpx;
		width: 60rpx; 
		height: 60rpx; 
		
	}
/* 	.package_detail_lable_attribute{
		background-color: #ffffff;
		width: 730rpx;
		height: 120rpx;
		margin-left: 10rpx;
		border-radius: 20rpx;
		overflow: hidden;
		margin-bottom: 30rpx;
	} */
	.package_detail_lable{
		
		margin-top: 5rpx;
		height: 40rpx;

	}
	.package_detail_lable_list{
		
		border: #15c5ce solid 2rpx;
		color: #15c5ce;
		margin: 10rpx 20rpx 10rpx 0rpx;
		
		border-radius: 6rpx;
		overflow: hidden;
		font-size: 20rpx;
		
		
	} 

	.publish_information{	
		height: 190rpx;
		background-color: #FFFFFF;
		margin: 30rpx 10rpx 20rpx 10rpx;
		
		border-radius: 20rpx;
		overflow: hidden;
	}
	
	.package_card_publish{
		width: 100%;
		margin-top: 25rpx;
		margin-left:40rpx;
		margin-right:40rpx;
	}
	.publish_brief{
		font-weight: 300; 
		font-size: 25rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		text-align: justify;
		overflow: hidden;
	}
	.publish_icon_follow{
		width: 150rpx;
		height: 50rpx;
		display: flex;
		float: right; 
		margin-top: 50rpx;
		margin-right: 20rpx;
		background-color:#ffffff; 
		border-radius: 10rpx;
		overflow: hidden;
		/* border: #30c478 2rpx solid; */
	}
	.publish_icon_follow01{
		width: 150rpx;
		height: 50rpx;
		display: flex;
		float: right; 
		margin-top: 50rpx;
		margin-right: 20rpx;
		/* background-color:#30c478; */
		border-radius: 10rpx;
		overflow: hidden;
	}
	.publish_name{
		margin-bottom: 15rpx;
		width: 60%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: bold;
	}
/* 	.scroll_button{
		display: flex;
		white-space: nowrap;
		justify-content: space-between;
		margin:20rpx 0;
	
	} */

/* 	.checked_button{
		background: #30c478;
		color: #FFFFFF;
		} */
	.card_list_background{
		display: flex;
		flex-direction: column;
		align-items: center;
		
	}
	.my_package_detail_card_list{
	
		margin-top: -20rpx;
		width: 730rpx;
	}
	.card_list{
		float: left;
 		background-color: #FFFFFF; 
		width: 340rpx;
		margin:10rpx 10rpx 15rpx 15rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}
	.package_detail_kabao{
		background-color: #000000;
		width:340rpx;
		height: 510rpx;
	
	}
	.package_card_watermark{
		width: 120rpx;
		position: absolute;
		margin-top: 200rpx;
		margin-left: 110rpx; 
		z-index: 1;
	}
	.package_card_img{
		
		width: 340rpx; 
		height: 510rpx;

	}
	.already_sold_card_icon_like{
		margin-top: -5rpx;
		width: 100%;
	}
	.card_like_num{
		font-weight:100;
		font-size: 20rpx; 
		float: right;
		margin-right: 10rpx;
		margin-top:20rpx;
	
	}
	.card_img{
		
		background-color: #FFFFFF; 
	}
/* 	.sold_card{
		font-weight: 100;
		font-size: 20rpx;
		margin-left: 10rpx;
	} */
	.package_card_name_brief{
		width: 340rpx;
		margin-left: 10rpx;
	}
	.package_card_name{
		width: 82%;
		font-weight: bold;
		font-size: 30rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		
	}
	.package_card_description{
		width: 90%;
		font-weight: 300; 
		font-size: 20rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		
	}
	.package_recommend{
		background-color: #FFFFFF;
		width: 710rpx;

		border-radius: 10rpx;
		margin: 20rpx ;
	}
	.package_recommend1{
		display: flex;
		height: 60rpx; 
		line-height: 60rpx;
		margin-bottom: 10rpx;
		
	}
	.package_recommend2{
		display: flex;
	}
	.package_list_recommend{
		width: 200rpx;
		height: 200rpx; 
		border-radius: 10rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}
	
	 .list_box {  
			display: flex;
			justify-content: space-between;
			margin: 10rpx 20rpx 40rpx 20rpx;
					
	    }
	
	    /* 已选择 */
	    .tag_item_selected {
			
			margin-top: 10rpx;
			height: 57rpx;
			line-height: 57rpx;
			text-align: center;
			
			width: 134rpx;
			margin-left:5rpx ;
	        background: #30c478;
	        color: #FFFFFF;
	        border-radius: 10rpx;
	        font-size: 30rpx;
	    }
	
	    /* 未选择 */
	    .tag_item_unselected {
			margin-top: 10rpx;
			height: 57rpx;
			line-height: 57rpx;
			text-align: center;
			width: 134rpx;
			
/* 	        border: 1px solid #30c478; */
	        background: #FFFFFF;
	        margin-left:5rpx ;
	        border-radius: 10rpx;
	        font-size: 30rpx;
	    }
		.series_package{
			word-break: break-word;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp:2;
			-webkit-box-orient:vertical;
				
		
		}
</style>
