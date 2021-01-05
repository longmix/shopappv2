<template>
	<view>
		<!-- 状态栏 -->
		<view v-if="showHeader" class="mystatusbar" :style="{ position: headerPosition,top:statusTop,opacity: afterHeaderOpacitys}"></view>
		<view class="header">
			<!-- 头部-默认显示 -->
			<view class="before" :style="{ opacity: 1 - afterHeaderOpacity, zIndex: beforeHeaderzIndex }">
				<view class="back"><view class="icon xiangqian" @tap="back_return" v-if="showBack"></view></view> 
				<view class="middle"></view>
				<view class="icon-btn">
					<!-- <view class="icon tongzhi" @tap="toMsg"></view> -->
					<view class="icon zhuye" @tap="toindex"></view>
				</view>
			</view>
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
				<view class="back" ><view class="icon xiangqian" @tap="back_return" v-if="showBack"></view></view>
				
				<!--
				<view class="middle">
					<view v-for="(anchor,index) in anchorlist" :class="[selectAnchor==index ?'on':'']" :key="index" @tap="toAnchor(index)">{{anchor.name}}</view>
				</view>
				-->
				<view class="middle"></view>
				<view class="icon-btn">
					<!-- <view class="icon tongzhi" @tap="toMsg"></view> -->      <!-- 下版本-> toMsg -->
					<view class="icon zhuye" @tap="toindex"></view>
				</view>
			</view>
		</view>
		<view class="welcome_image">
			<view v-if="current_shang_detail.mendian_image">
				<image @load="imageLoad($event)" :data-id='index' mode="widthFix" style="width: 100%;" :src="current_shang_detail.mendian_image"></image>
			</view>
		</view>

		<view class="shang_detail_box1">
			<!-- 头像昵称 -->
			<view style="margin-top: 25upx;" class="head_and_name">
				<image style="margin-right:10upx;width: 70upx;height:70upx;border-radius: 50%;" :src="current_shang_detail.icon_image" mode=""></image>
				<text>{{current_shang_detail.name}}</text>
			</view>
			<!-- 头像昵称结束 -->

			<!-- 星级 -->
			<view style="display: flex;justify-content: center;align-items: center;">
				<text>星级</text>
				<image v-for="item in current_shang_detail.star_level" :key="item" style="width: 50upx;height: 50upx;" src="../../static/img/VIP.png"
				 mode=""></image>

			</view>
			<!-- 星级结束 -->

			<!-- 标签 -->
			<view style="display:flex;flex-wrap: wrap;justify-content: center;">
				<view v-for="item in current_shang_detail.spec" :key="item" class="biaoqian">
					{{item}}
				</view>


			</view>
			<!-- 标签结束-->

			<!-- 服务-->
			<view style="width: 100%;display: flex;justify-content: center;align-items: center;padding:0upx;">
				<view style="width:60%;background-color: #FFFFFF;height: 10upx;"></view>
				<view class="fuwu">
					<!-- {{current_shang_detail.name}} -->
				</view>
				<view style="width:60%;background-color: #FFFFFF;height: 10upx;"></view>
			</view>
			<!-- 服务结束-->

			<!-- 营业时间 地址 -->
			<view class="shijian_dizhi">
				<!-- 营业时间-->
				<view style="display: flex;justify-content: space-between;align-items: center;padding: 30upx 20upx;">

					<view style="color:#333;font-size: 28upx;display: flex;align-items: center;">
						<image style="width: 30upx;height: 30upx;" src="https://yanyubao.tseo.cn/Tpl/static/images/time.png"></image>
						<span style="margin-left: 25upx;">营业时间 | {{current_shang_detail.yingyeshijian}}</span>
					</view>
					<image style="width: 30upx;height: 30upx; display:none;" src="https://yanyubao.tseo.cn/Tpl/static/images/time.png"></image>


				</view>
				<!-- 地址-->
				<navigator :url="'/pages/shopMap/shopMap?address=' + current_shang_detail.address + '&latitude=' + current_shang_detail.latitude + '&longitude=' + current_shang_detail.longitude + '&name=' + current_shang_detail.name + '&telephone=' + current_shang_detail.telephone"
				 class="shang_detail_address">
					<view style="color:#333;font-size: 28upx;display: flex;align-items: center;">
						<image style="width:40upx;height:40upx;" src="https://yanyubao.tseo.cn/Tpl/static/images/weizhi.png"></image>
						<view style="width: 100%;">
							<span style="margin-left: 25upx;">{{current_shang_detail.address}}</span>
						</view>
					</view>
					<view>
						<image style="width: 30upx;height: 30upx;" src="../../static/img/x_right.png"></image>
					</view>


				</navigator>
			</view>
			<!-- 营业时间 地址结束 -->

		</view>
		<!-- 功能按钮-->
		
			<view v-if="vip_card_list">
				<view style="text-align: center;">会员卡列表</view>
				<view class="vip_card_list" v-for="(item,index) in vip_card_list" :key='index'>
				<view style="width: 75%;display: flex;">
					<img :src="item.card_touxiang" alt="" class="vip_logo">
					<view class="vip_card_name">{{item.card_name}}</view>
				</view>
				<view v-if="item.huiyuan_status == 1" class="banka_btn" style="margin-top: 20rpx;" @tap="go_detail_huiyuan(item.userid)">
					<view>
						<view class="banka_ft">查看卡片</view>
					</view>
				</view>
				<view v-else class="banka_btn" style="margin-top: 20rpx;"  @tap="become_huiyuan(item.userid)">
					<view>
						<view class="banka_ft">我要领卡</view>
					</view>
				</view>
				</view>
			</view>


		<view>
			<!-- 按钮1 -->
			<view class="paidui-con" v-if="shop_product_btn_show == 1">
				<image class="icon-a" :src="user_console_setting.shop_product_icon"></image>
				<view class="paidui-a">
					<view class="icon-title">

						<text class='paidui-c'>{{user_console_setting.shop_product_title}}</text>
					</view>
					<text class='paidui-d'>{{user_console_setting.shop_product_tips}}</text>
				</view>
				<view class="yuding-a">
					<view style="font-size:25rpx;">{{user_console_setting.shop_product_ad}}</view>
					<navigator :url="'../menuList/menuList?is_waimai=0&title='+ user_console_setting.shop_product_list_title +'&xianmai_shangid='  + current_xianmai_shangid"
					 hover-class="navigator-hover">
						<view style="background:#E86452;">{{user_console_setting.shop_product_btn_ext}}</view>
					</navigator>
				</view>

			</view>
			<!-- 按钮1   end -->

			<!-- 按钮2 -->
			<view class="paidui-con" v-if="waimai_product_btn_show == 1">
				<image style="height: 85upx;" class="icon-a" :src="user_console_setting.waimai_product_icon"></image>
				<view class="paidui-a">
					<view class="icon-title">

						<text class='paidui-c'>{{user_console_setting.waimai_product_title}}</text>
					</view>
					<text class='paidui-d'>{{user_console_setting.waimai_product_tips}}</text>
				</view>
				<view class="yuding-a">
					<view style="font-size:25rpx;">{{user_console_setting.waimai_product_ad}}</view>
					<navigator style="background:#E86452;" :url="'../menuList/menuList?is_waimai=1&title='+ user_console_setting.waimai_product_list_title +'&xianmai_shangid=' + current_xianmai_shangid"
					 hover-class="navigator-hover">
						<view>{{user_console_setting.waimai_product_btn_ext}}</view>
					</navigator>
				</view>

			</view>
			<!-- 按钮2  end -->


		</view>

		<!-- 功能按钮结束-->
	<discoverList 
	:faquanList="current_faquanList"
	:videometa_width_height_list="current_videometa_width_height_list"
	@fanquaDianzan="fanquaDianzan"
	@fanquanCollect="fanquanCollect"
	@click_share_btn="click_share_btn"
	@bigImg="bigImg"
	>
	<!-- 
	@videometa="videometa"
	@change_faquan_status="change_faquan_status"
	@oneClickSave="oneClickSave" 
	@copyText="copyText"
	@img_or_video_download="img_or_video_download" -->
	</discoverList>
		<!-- 优惠 -->
		<view style="border-bottom:6px solid #eee;" v-if="current_shang_detail.youhui_title != ''">
			<view class="icon-title2">
				<image :src="user_console_setting.user_console_icon_youhui"></image>
				<view class='biaoti'>优惠活动</view>
			</view>

			<block v-if="current_shang_detail.youhui_title == ''">
				<view style="text-align: center;color:#ccc;font-size:16px;">暂无优惠</view>
				<view style="padding-bottom: 21px;color: red;width: 94%;margin-left: 13px;">
					<text style="width:20px;"></text>
				</view>
			</block>

			<block v-if="current_shang_detail.youhui_title != ''">
				<view style="text-align: left;padding-left:8px;color:#666;font-size:16px;text-align:center;padding:6rpx;font-weight:bold;">{{current_shang_detail.youhui_title}}</view>
				<view style="padding-top:5px;padding-bottom: 24rpx;color: #666;width: 94%;margin: 0 auto;font-size:14px;text-indent: 54rpx;">
					<text>{{current_shang_detail.youhui_detail}}</text>
				</view>
			</block>
		</view>
		<!--商家简介-->
		<view style="border-bottom:6px solid #eee;" v-if="current_shang_detail.brief != ''">
			<view class="icon-title2">
				<image :src="user_console_setting.user_console_icon_jianjie"></image>
				<view class='biaoti'>商家简介</view>
			</view>
			<block v-if="current_shang_detail.brief == ''">
				<view style="text-align: center;color:#ccc;font-size:16px;">暂无简介</view>
				<view style="padding-bottom: 21px;color: red;width: 94%;margin-left: 13px;">
					<text style="width:20px;"></text>
				</view>
			</block>

			<block v-if="current_shang_detail.brief != ''">
				<view style="padding-top:5px;padding-bottom: 24rpx;color: #666;width: 94%;margin: 0 auto;font-size:14px;text-indent: 54rpx;">
					<text>{{current_shang_detail.brief}}</text>
				</view>
			</block>
		</view>
		
		<view class="page_bottom">
			
			<image v-if="user_console_setting.show_shang_shop_wxa_qrcode == 1" 
				:src="shang_shop_wxa_qrcode_url" 
				style="width:250rpx; height:250rpx; margin: 0 auto;"></image>
			
		</view>
		
		<view v-if="user_console_setting.user_console_quick_button_position == 'left' || !user_console_setting.user_console_quick_button_position">
			<view @tap="isShoucang==1?Shoucang('del'):Shoucang('add')" class="home-p">
				<image v-if="isShoucang == 0" src="../../static/img/help/star_off.png"></image>
				<image v-if="isShoucang == 1" src="../../static/img/help/star_on.png"></image>
				<!-- <view>分享</view> -->
			</view>
			<view class="ps-btn">
				

				<view>
					<!-- <image src="../../static/img/addricon.png"></image> -->
					<!-- #ifdef MP-WEIXIN --> 
					<button style="padding-left: 0;padding-right: 0;" open-type="share">分享</button>
					<!-- #endif -->
					
					<!-- #ifdef MP-ALIPAY -->
					<button style="padding-left: 0;padding-right: 0;" open-type="share">分享</button>
					<!-- #endif -->
					
					<!-- #ifdef APP-PLUS -->
					<button style="padding-left: 0;padding-right: 0;"  @click="is_show()">分享</button>
					<!-- #endif -->
					
					<!-- #ifdef H5 --> 
					<button style="padding-left: 0;padding-right: 0;" @click="share_shang_detail">分享</button>
					<!-- #endif -->
				</view>
				
				<view @tap="call_seller" style="margin-bottom: 20rpx;">
					<!-- <image src="../../static/img/addricon.png"></image> -->
					<view>电话</view>
				</view>
				<view @tap="toChat">
					<!-- <image src="../../static/img/addricon.png"></image> -->
					<view>客服</view>
				</view>
			</view>
		</view>
		
		
		<view v-if="user_console_setting.user_console_quick_button_position == 'bottom'" class='footer' >
			<view @tap="isShoucang==1?Shoucang('del'):Shoucang('add')" class="shoucang_box">
				<image v-if="isShoucang == 0" src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_star.png"></image>
				<image v-if="isShoucang == 1" src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_star2.png"></image>收藏
				<!-- <view>分享</view> -->
			</view>
			<view style="width: 25%;background: #FFFFFF;text-align: center;font-size:32rpx;" class="icons">
				<!-- <image src="../../static/img/addricon.png"></image> -->
				<!-- #ifdef MP-WEIXIN --> 
				<!-- <button style="padding-left: 0;padding-right: 0;" open-type="share">分享</button> -->
				<button class="box share-btn btn_box" open-type="share">
					<image style="width:40rpx;height:40rpx;padding-right:10rpx;" src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_share.png"></image>
					<view  style="font-size:32rpx;">分享</view>
					<!-- <button class="text" open-type="share">分享</button> -->
				</button>
				
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY -->
				<!-- <button style="padding-left: 0;padding-right: 0;" open-type="share">分享</button> -->
				<button class="box share-btn btn_box" open-type="share" style="background: none;outline: none;border: none;">
					<image style="width:40rpx;height:40rpx;padding-right:10rpx;" src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_share.png"></image>
					<view  style="font-size:32rpx;">分享</view>
					<!-- <button class="text" open-type="share">分享</button> -->
				</button>
				
				<!-- #endif -->
				
				<!-- #ifdef APP-PLUS -->
				<!-- <button style="padding-left: 0;padding-right: 0;" open-type="share">分享</button> -->
				<button class="box share-btn btn_box" @click="is_show()">
					<image style="width:40rpx;height:40rpx;padding-right:10rpx;" src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_share.png"></image>
					<view  style="font-size:32rpx;">分享</view>
					<!-- <button class="text" open-type="share">分享</button> -->
				</button>
				
				<!-- #endif -->
				<!-- #ifdef H5 --> 
				<!-- <button style="padding-left: 0;padding-right: 0;" @click="share_shang_detail">分享</button> -->
				<button @click="share_shang_detail" class="box share-btn btn_box">
					<image style="width:40rpx;height:40rpx;padding-right:10rpx;" src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_share.png"></image>
					<view  style="font-size:32rpx;">分享</view>
					<!-- <button class="text" open-type="share">分享</button> -->
				</button>
				
				<!-- #endif -->
			</view>
			
			<view @tap="call_seller" class="dianhua_box">
				<image style="width:40rpx;height:40rpx;padding-right:10rpx;" src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_phone.png"></image>
				<view>电话</view>
			</view>
			<view @tap="toChat" class="kefu_box">
				<image style="width:40rpx;height:40rpx;padding-right:10rpx;" src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_dialog.png"></image>
				<view>客服</view>
			</view>
			
		</view>
		
		<!-- app 分享 -->
		<abotshare
		ref="share_api"
		@click_wxa_share="click_wxa_share"   
		@click_wxa_circle_share='click_wxa_circle_share'  
		@click_wxa_applet_share='click_wxa_applet_share'
		@click_wxa_command_copy='click_wxa_command_copy'  
		@click_wxa_system_share='click_wxa_system_share'
		></abotshare>
		
	</view>
</template>

<script>
	import discoverList from '../../components/discover-list/discover-list.vue';
	import abotshare from '../../components/abot_share_api/abot_share_api.vue';
	import abotsharejs from '../../common/abot_share_api.js';
	
	export default {
		components:{
			discoverList,
			abotshare,
		},
		data() {
			return {
				beforeHeaderzIndex: 11,//层级
				afterHeaderzIndex: 10,//层级
				beforeHeaderOpacity: 1,//不透明度
				afterHeaderOpacity: 0,//不透明度
				showBack:true,
				//是否显示返回按钮
				// #ifndef MP
				showBack:true,
				// #endif
				
				ak: "", //填写申请到的ak，从shop_option中获取 baidu_map_ak_wxa这个属性
				markers: [],
				longitude: '', //经度
				latitude: '', //纬度
				address: '', //地址
				cityInfo: {}, //城市信息
				wxMarkerData: '',
				articlelist: '',
				articlelist2: '',
				wxa_show_toutiao: '',
				wxa_shop_toutiao_flash_line: '',
				addListener: '',
				wxa_show_icon_index_count: '',
				current_cityname: '',
				current_citynameLength: '',
				current_citynameWidth: '',
				wxa_shop_toutiao_icon: '',
				current_shang_detail: {yingyeshijian:"8:00~20:00", address:""},
				shang_faquan_list: '',
				spec: '',
				isShoucang: 0,
				
				showHeader: true,
				afterHeaderOpacitys: 1, //不透明度
				headerPosition: 'fixed',
				
				headerTop: null,
				statusTop: null,
				nVueTitle: null,
				productLists: '',
				pictures: '',
				yingxiao_list: '',
				page_num: 1,
				page_size: 5,
				is_OK: false,
				cb_params: '',
				city: '北京',
				currentSwiper: 0,
				// 轮播图片

				index_icon_list: '',
				Promotion: [],
				//猜你喜欢列表

				productList: '',
				loadingText: '正在加载...',
				imgheights: [],
				current: 0,
				windowHeight: 0,

				current_xianmai_shangid: 0,

				//客服相关
				wxa_show_kefu_button: '',
				wxa_kefu_button_type: '',
				wxa_kefu_button_icon: '',
				wxa_kefu_mobile_num: '',
				wxa_kefu_form_url: '',
				wxa_kefu_bg_color: '',
				user_console_setting: '',
				
				//商家评论相关
				current_faquanList: [],
				current_videometa_width_height_list:[],
				
				shop_product_btn_show: 0,
				waimai_product_btn_show:0,
				
				shang_shop_wxa_qrcode_url:'',	//商家的小程序码
				
				// 分享
				share_href:'', 
				share_titles:'',
				share_summary:'',
				share_imageUrl:'',
				
				//客服按钮点击后的消息类型
				app_kefu_msg_type:'is_call_mobile',
				
				//会员卡列表
				vip_card_list:[],
			};
		},
		
		onLoad(options) {
			var that = this;

			console.log('options===', options)

			var that = this;

			var xianmai_shangid = 0;

			if (options.shangid) {
				xianmai_shangid = options.shangid;
			}


			if (options.scene) {
				xianmai_shangid = options.scene
			}

			// #ifdef MP
			//小程序隐藏返回按钮
			this.showBack = false;
			// #endif

			this.current_xianmai_shangid = xianmai_shangid;


			this.abotapi.set_option_list_str(this, function(that001, cb_params){
				that001.abotapi.getColor();
				
				if(cb_params.app_kefu_msg_type){
					that001.app_kefu_msg_type = cb_params.app_kefu_msg_type;
				}
			});
			
			this.get_merchant_basic_data();
			

		},
		onShow() {
			this.__getFaquanList();

		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
			this.headerTop = e.scrollTop >= 0 ? null : 0;
			this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
		
			//锚点切换
			//this.selectAnchor = e.scrollTop>=this.anchorlist[2].top?2:e.scrollTop>=this.anchorlist[1].top?1:0;
			//导航栏渐变
			let tmpY = 175;
			e.scrollTop = e.scrollTop > tmpY ? 175 : e.scrollTop;
			this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
			this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
			//切换层级
			this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
			this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
		
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			var that = this;
			
			that.abotapi.get_xianmaishang_setting_list_remove();
		
		
			this.get_merchant_basic_data();
			
			this.__getFaquanList();
		
		
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
		
		},
		//分享
		onShareAppMessage: function() {
			
			var that = this;
			
			return {
				title: that.current_shang_detail.name,
				path: 'pages/shopDetail/shopDetail?shangid='+that.current_xianmai_shangid,
				imageUrl:'',
				success: function(res) {
				// 分享成功
					uni.showToast({
						title: '转发成功',
						icon: 'success',
						duration: 2000
					})
				},
				fail: function(res) {
					// 分享失败
					uni.showToast({
						title: '转发失败',
						icon: 'success',
						duration: 2000
					})
				}
			}
			

		},

		onShareTimeline: function () {
				
		},
		onAddToFavorites: function () {
			//this.onShareTimeline();
		},
	

		methods: {
			click_share_btn:function(){
				this.onShareAppMessage();
			},
			//h5点击分享触发
			share_shang_detail:function(){
				console.log('==================>>>h5');
				uni.showModal({
					title:'请点击浏览器菜单中的分享按钮',
					showCancel:false,
				})
				
				return;
			},

			//app  分享点击
			click_wxa_share:function (){
				abotsharejs.click_wxa_share(this.share_href, this.share_titles, this.share_summary, this.share_imageUrl);
			},
			
			click_wxa_circle_share:function (){
				abotsharejs.click_wxa_circle_share(this.share_href, this.share_titles, this.share_summary, this.share_imageUrl);
			},
			
			
			click_wxa_applet_share:function (){
				
				var path = 'pages/shopDetail/shopDetail?shangid='+ this.current_xianmai_shangid;
				var account = this.abotapi.globalData.xiaochengxu_account;
				abotsharejs.click_wxa_applet_share(this.share_href, this.share_titles, path, this.share_imageUrl, account);
			},
			click_wxa_command_copy:function (){
				var userid = 0;
				var sellerid = this.abotapi.globalData.default_sellerid;
				var cmd_type = 'xianmaishang';
				
				var userInfo = this.abotapi.get_user_info();
				if(userInfo){
					userid = userInfo.userid;
				}
				
				
				console.log("shangid===",this.current_shang_detail)
				
				abotsharejs.click_wxa_command_copy(this.abotapi, cmd_type, this.current_shang_detail["xianmai_shangid"], userid, sellerid);
				
			},
			
			click_wxa_system_share:function (){
				
				abotsharejs.click_wxa_system_share(this.share_summary, this.share_href);
			},
			is_show:function(){
				this.$refs.share_api.is_show();
			},
			
			callback_func_for_xianmaishang_setting_list: function(user_console_setting) {

				console.log('user_console_setting==', user_console_setting);
				// console.log('xianmaishang_setting_list==',xianmaishang_setting_list);

				this.user_console_setting = user_console_setting;
				
				if(user_console_setting.shop_product_hidden && (user_console_setting.shop_product_hidden == 1)){
					this.shop_product_btn_show = 0;
				}				
				
				if(user_console_setting.waimai_product_hidden && (user_console_setting.waimai_product_hidden == 1)){
					this.waimai_product_btn_show = 0;
				}
								
				if(user_console_setting.show_shang_shop_wxa_qrcode){
					this.shang_shop_wxa_qrcode_url = 'https://yanyubao.tseo.cn/openapi/SupplierInfo/getwxacodeunlimit?appid=';
					this.shang_shop_wxa_qrcode_url += this.abotapi.globalData.xiaochengxu_appid;
					this.shang_shop_wxa_qrcode_url += '&path=pages%2FshopDetail%2FshopDetail&shortcode=';
					this.shang_shop_wxa_qrcode_url += this.current_xianmai_shangid;
				}
				
				
				this.get_shang_detail();
				
				
			},


			//商品跳转
			toGoods(e) {
				console.log('rrxfff===', e);
				var productid = e.productid;
				uni.navigateTo({
					url: '/pages/product/detail?productid=' + productid
				});
			},
			//返回上一页
			back_return() {
				uni.navigateBack();
			},
			//跳转到首页
			toindex:function(){
				console.log('toCart 向首页跳转')
				
				uni.switchTab({
					url:'../index/index'
				})
				
				
			},
			imageLoad: function(e) { //获取图片真实宽度  

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


			//查看商家是否被当前用户收藏
			get_user_data_option: function() {
				console.log('this.current_shang_detail.xianmai_shangid',this.current_shang_detail.xianmai_shangid);
				var that = this;
				var userInfo = that.abotapi.get_user_info();
				if(userInfo && userInfo.userid){
					var post_data = {
						userid: userInfo.userid,
						sellerid: this.abotapi.globalData.default_sellerid,
						checkstr: userInfo.checkstr,
						key: this.current_shang_detail.xianmai_shangid,
						type: 'xianmai_shang_favorite',
					}
					
					this.abotapi.abotRequest({
						url: that.abotapi.globalData.yanyubao_server_url + '/Yanyubao/ShopApp/get_user_data_option',
						data: post_data,
						success: function(res) {
							console.log('that.index_list', res);
					
							if (res.data.code == 1 && res.data.value) {
								
								that.isShoucang = res.data.value;
								
							}
						},
						fail: function(e) {
							uni.showToast({
								title: '网络异常！',
								duration: 2000
							});
						},
					});
				}
			},
			//收藏
			Shoucang: function(action) {

				var that = this;
				var userInfo = this.abotapi.get_user_info();

				if (!userInfo || !userInfo.userid) {
					uni.showModal({
						title: '只有登录才可以收藏',
						success: function(res) {
							if (res.cancel) {
								return;
							} else if (res.confirm) {

								var last_url = '/pages/shopDetail/shopDetail?shangid=' + that.current_xianmai_shangid;
								that.abotapi.goto_user_login(last_url, 'normal');
								return;
							}

						}
					})
					return;
				}

				var post_data = {
					userid: userInfo.userid,
					sellerid: this.abotapi.globalData.default_sellerid,
					action: action,
					checkstr: userInfo.checkstr,					
					xianmaishangid: this.current_shang_detail.xianmai_shangid,
				}

				this.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + 'openapi/XianmaiShangData/my_favorite',
					method: 'post',
					data: post_data,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						console.log('that.index_list', res);

						if (res.data.code == 1) {

							uni.showToast({
								title: res.data.msg,
							})
							that.get_user_data_option();
						}
					},
					fail: function(e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					},
				});
			},
			
			get_merchant_basic_data:function(){
				var that = this;
				
				
				// 获取本地商家自己设置的一些选项，包括是否显示外卖 堂吃按钮等。
				var post_data = {
					sellerid: this.abotapi.globalData.default_sellerid,
					xianmai_shangid: this.current_xianmai_shangid,
				}
				
				this.abotapi.abotRequest({
					url: this.abotapi.globalData.o2owaimai_server_url + 'openapi/PublicData/get_merchant_basic_data',
					data: post_data,
					success: function(res) {
						
						console.log('xiangqing', res);
						
						if(res.data.code == 0){
							uni.showToast({
								title:res.data.msg,
							})
							return;
						}
						
						var data = res.data.data;
						
						//根据商户的设置，觉得是否展示堂食和外卖 ！！！！！！
						if(data.show_diancan_button && (data.show_diancan_button == 1)){
							that.shop_product_btn_show = 1;
						}
						else{
							that.shop_product_btn_show = 0;
						}
						
						if(data.show_waimai_button && (data.show_waimai_button == 1)){
							that.waimai_product_btn_show = 1;
						}
						else{
							that.waimai_product_btn_show = 0;
						}
						
						
						that.abotapi.get_xianmaishang_setting_list(that.callback_func_for_xianmaishang_setting_list);
						
						
					},
					fail: function(e) {
				
					},
				})
				
				
			},
			
			//点击图片放大
			bigImg:function(e){
				console.log(e);
				var index = e.currentTarget.dataset.index;
				var index2 = e.currentTarget.dataset.index2;
				var img_or_video_list = this.current_faquanList[index].img_or_video_list; //点击的那一组图片列表
				
				var imgList = [];
				
				for(var i=0; i<img_or_video_list.length; i++){
					imgList.push(img_or_video_list[i].url);
				}
				uni.previewImage({
					current: imgList[index2],
					urls: imgList,
				})
				
				console.log(img_or_video_list); 
			},


			//获取商家详情
			get_shang_detail: function() {
				var that = this;




				// 获取商家详情，包括字号/门头照/Logo，地址，营业时间等
				var post_data = {
					sellerid: this.abotapi.globalData.default_sellerid,
					xianmai_shangid: this.current_xianmai_shangid,
				}
				
				var userInfo = that.abotapi.get_user_info();
				if(userInfo && userInfo.userid){
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				}


				this.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + 'openapi/XianmaiShangData/get_shang_detail',
					data: post_data,
					success: function(res) {
						console.log('xiangqing', res);
						
						if(res.data.code == 0){
							uni.showToast({
								title:res.data.msg,
							})
							return;
						}
						
						
						var data = res.data.data;
						
						that.vip_card_list = res.data.vip_card_list;
						
						console.log('8888888888888',that.vip_card_list);
						
						if(!data){
							return;
						}

						var spec = data.spec;
						if (spec) {
							data.spec = spec.split(" ");
						} else {
							var spec = '';
						}

						console.log("get_shang_detail===>>>>", data);
						
						if(!data.yingyeshijian){
							data.yingyeshijian = that.current_shang_detail.yingyeshijian;
						}
						
						that.current_shang_detail = data;
						
						//2020.11.17. 商家的发圈列表（暂无数据返回）
						that.shang_faquan_list = data.shang_faquan_list;
						that.spec = spec;
						
						
						// 分享
						that.share_href = data.h5_url;
						that.share_titles = data.name;
						that.share_summary = data.name;
						that.share_imageUrl = data.icon_image;
						
						
						uni.setNavigationBarTitle({
							title:data.name
						})
						

						that.get_user_data_option(); //获取这个商家是否被收藏
						// var latitude_longitude = {
						//   latitude : data.latitude,
						//   longitude : data.longitude,
						// };

						// wx.setStorageSync("longitude_" + data.current_xianmai_shangid + "_latitude", latitude_longitude);
						var shang_detail = {
							latitude: data.latitude,
							longitude: data.longitude,
							name: data.name,
						};
						
						console.log('1111shang_huancun',"shang_" + data.xianmai_shangid + "_detail", shang_detail);
						
						uni.setStorageSync("shang_" + data.xianmai_shangid + "_detail", shang_detail);

						uni.setStorage({
							key: 'shoplist',
							data: that.current_shang_detail,
							success: function(res) {
								console.log('异步保存成功')
							}
						})

					},
					fail: function(e) {

					},
				})
			},
			call_seller: function() {

				uni.makePhoneCall({
					phoneNumber: this.current_shang_detail.telephone,
				})
			},

			toChat() {
				var that = this;
				
				//如果是进入聊天对话框
				if(this.app_kefu_msg_type == 'is_call_mobile'){
					
					uni.makePhoneCall({
						phoneNumber:that.current_shang_detail.telephone
					});
				}
				else{
					var userInfo = that.abotapi.get_user_info();
					if (!userInfo || !userInfo.userid) {
						var last_url = '/pages/shopDetail/shopDetail?shangid=' + that.current_xianmai_shangid;
						this.abotapi.goto_user_login(last_url, 'normal');
						return;
					}
					
					
					uni.navigateTo({
						url: '/pages/msg/chat/chat?type=0&userid=' + that.current_shang_detail.userid + '&name=' + that.current_shang_detail.name
					})
				}
				

			},
			
			//获取发圈
			__getFaquanList:function(){
							  
			  var that = this;
						
			  var current_faquanid = this.current_faquanid;
			  
			  var post_url = this.abotapi.globalData.yanyubao_server_url + 'openapi/FaquanData/get_faquan_list';
						
			  if(this.is_my_discover){
				post_url = this.abotapi.globalData.yanyubao_server_url + 'openapi/FaquanData/get_faquan_list_by_userid';
			  }
			  else if(this.is_my_discover_collection){
				post_url = this.abotapi.globalData.yanyubao_server_url + 'openapi/FaquanData/get_faquan_collect_list';
			  }
							
						
						
			  var post_data = {
				appid: this.abotapi.globalData.xiaochengxu_appid,
				sellerid: this.abotapi.get_sellerid(),
				extend_id:this.current_xianmai_shangid,
				faquan_type:1,
			  };
							
			  
						
			  
							
			  this.abotapi.abotRequest({
				url: post_url,
				method: 'post',
				data: post_data,
				header: {
				  'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: function (res) {
				  var faquanList = res.data.data;
						
				  console.log('__getFaquanList===>>>>faquanList====>>>', faquanList)
						
				  if (res.data.code == 1) {
			 
					  that.current_faquanList = faquanList;
					  that.page = that.page + 1;
					  
					  
					  //====== 初始化视频的大小
					  console.log('准备初始化视频大小');
					  
					  for (var ii = 0; ii < that.current_faquanList.length; ii++) {
					  	if (that.current_faquanList[ii]['type'] == 1) {
					  		for (var jj = 0; jj < that.current_faquanList[ii]['img_or_video_list'].length; jj++) {
					  			var imgwidth = that.current_faquanList[ii]['img_or_video_list'][jj]['width'];
					  			var imgheight = that.current_faquanList[ii]['img_or_video_list'][jj]['height'];
					  
					  
					  			//宽高比
					  			var ratio = imgwidth / imgheight;
					  
					  			console.log(imgwidth, imgheight)
					  
					  			//var current_view_width = this.data.current_view_width;
					  
					  			// rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。
					  			// 如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。
					  			var current_view_width = 750;
					  
					  			current_view_width = current_view_width * 0.9 ;
					  
					  			//计算的高度值  
					  			var current_view_height = current_view_width / ratio;
					  
					  
					  			//读取已经设置的宽高列表
					  			var videometa_width_height_list = that.current_videometa_width_height_list;
					  			var current_index = videometa_width_height_list.length;
					  
					  			console.log('准备初始化视频大小 current_index ===>>>', current_index);
					  
					  			videometa_width_height_list[current_index] = [current_view_width, current_view_height];
					  
					  			//console.log('videometa_width_height_list====>>>>', videometa_width_height_list);
					  
					  			that.current_videometa_width_height_list = videometa_width_height_list;
					  
					  		}
					  
					  	}
					  
					  }
					  
					  //====== End ================
					
				  }
				},
				fail: function (e) {
				  uni.showToast({
					title: '网络异常！',
					duration: 2000
				  });
				},
			  })
						
						
			},
			
			//发圈点赞
			fanquaDianzan: function (e) {
			  console.log('e=======', e)
			  var that = this;
			  var faquanid = e.target.dataset.faquanid;
			  var index = e.target.dataset.index;
						
			  var userInfo = this.abotapi.get_user_info();
							
							console.log('============>>>>>', userInfo);
						
			  if (!userInfo) {
			    uni.showModal({
			      title: '提示',
								content:'请先登陆后再点赞',
			      success: function (res) {
					if(res.confirm){
						
						if (this.data.current_self_in_tabbar == 1) {
							that.abotapi.goto_user_login('switchTab /cms/discover/discover');
						}
						else{
							that.abotapi.goto_user_login('/cms/discover/discover');
						}
						
						
					}
					
					return;
									
			      },
								
								
			    })
						
			    return;
			  }
						
			  that.abotapi.abotRequest({
			    url: this.abotapi.globalData.yanyubao_server_url + 'openapi/FaquanData/faquan_like',
			    method: 'post',
			    data: {
			      sellerid: this.abotapi.get_sellerid(),
			      userid: userInfo ? userInfo.userid : '',
			      faquanid: faquanid,
			    },
			    header: {
			      'Content-Type': 'application/x-www-form-urlencoded'
			    },
			    success: function (res) {
			      if (res.data.code == 1) {
						
			        if (that.current_faquanList[index].has_like == '0') {
						
			          that.current_faquanList[index].has_like = "1";
			          ++that.current_faquanList[index].like_num;
			        
			        } else {
						
			          that.current_faquanList[index].has_like = "0";
			          --that.current_faquanList[index].like_num;
			         
			        }
						
			       
			          that.current_faquanList = that.current_faquanList;
			    
						
			      }
						
			    },
			    fail: function (e) {
			      uni.showToast({
			        title: '网络异常！',
			        duration: 2000
			      });
			    },
			  })
			},
			
			//发圈收藏
			fanquanCollect:function(e){
			  console.log('e=======',e)
			  var that = this;
			  var faquanid = e.target.dataset.faquanid;
			  var index = e.target.dataset.index;
							
							console.log('================fanquanCollect=====>>>>index====>>>>>', index);
						
			  var userInfo = this.abotapi.get_user_info();
						
			  console.log('userInfo==',userInfo);
							
							if (!userInfo) {
							  uni.showModal({
							    title: '提示',
								content:'请先登陆后再点赞',
							    success: function (res) {
									if(res.confirm){
										
										if (this.data.current_self_in_tabbar == 1) {
											that.abotapi.goto_user_login('switchTab /cms/discover/discover');
										}
										else{
											that.abotapi.goto_user_login('/cms/discover/discover');
										}
									}						
									return;						
							    },
							  })
							  
							  return;
							}
						
			  that.abotapi.abotRequest({
			    url: this.abotapi.globalData.yanyubao_server_url + 'openapi/FaquanData/faquan_collect',
			    data: {
			      sellerid: this.abotapi.get_sellerid(),
			      userid: userInfo ? userInfo.userid : '',
			      faquanid: faquanid,
			    },
			    success: function (res) {
						
			      if(res.data.code == 1){
									console.log('=====================>>>>index====>>>>>', index);
			        if (that.current_faquanList[index].has_collect == '0'){
			          that.current_faquanList[index].has_collect = "1"
									++that.current_faquanList[index].collect_num;
			          uni.showToast({
			            title: '收藏成功！',
			            duration: 2000
			          });
			        }else{
			          that.current_faquanList[index].has_collect = "0"
									--that.current_faquanList[index].collect_num;
			          uni.showToast({
			            title: '取消收藏成功！',
			            duration: 2000
			          });
			        }
			        
			  
			       that.current_faquanList = that.current_faquanList;
				
			         
			      }
			    
			    },
			    fail: function (e) {
			      uni.showToast({
			        title: '网络异常！',
			        duration: 2000
			      });
			    },
			  })
			},
			
			//成为会员
			become_huiyuan:function(kazhu_userid){
				
				var that = this;
				var userInfo = this.abotapi.get_user_info();
				
				
				if (!userInfo || !userInfo.userid) {
					uni.showModal({
						title: '请先登录',
						success: function(res) {
							if (res.cancel) {
								return;
							} else if (res.confirm) {
				
								var last_url = '/pages/shopDetail/shopDetail?shangid=' + that.current_xianmai_shangid;
								that.abotapi.goto_user_login(last_url, 'normal');
								return;
							}
				
						}
					})
					return;
				}
				
				
				that.abotapi.abotRequest({
				  url: this.abotapi.globalData.yanyubao_server_url + 'openapi/SuperVipCardData/add_user_card_huiyuan_item',
				  method: 'post',
				  data: {
				    sellerid: this.abotapi.get_sellerid(),
				    userid:userInfo ? userInfo.userid : '',
				    kazhu_userid: kazhu_userid,
					checkstr: userInfo.checkstr,
				  },  
				  header: {
				    'Content-Type': 'application/x-www-form-urlencoded'
				  },
				  success: function (res) {
					  
					  if(res.data.code == 1){
						  uni.showToast({
						    title: '领取成功！',
						    duration: 2000
						  });
						  //刷新界面，以获取最新的领卡状态。
						  that.get_shang_detail();
						  
						  
					  }
				  },
				  fail: function (e) {
					   uni.showToast({
					     title: '网络异常！',
					     duration: 2000
					   });
				   }
				 });
				
				
			},
			
			//查看会员详情
			go_detail_huiyuan:function(kazhu_userid){
				
				console.log('11111111111',kazhu_userid);
				
				
				uni.navigateTo({
					url: '/pages/myecard/myecard?kazhu_userid=' + kazhu_userid + '&ecard_data_type=' + 'super_vip_card'
				});
			}
					
			
		}
	};
</script>

<style lang="scss">
	.mystatusbar {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		margin-bottom: var(--status-bar-height);
		/*  #endif  */
	}
	
	.welcome_image{
		width: 100%;
		display: block;
		//background-color: #f06c7a;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}

	.shang_detail_box1 {
		background-color: #81ab85;
		margin: 5upx;
		border-radius: 20upx;
		overflow-y: auto;
	}

	.head_and_name {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #81ab85;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		padding: 20upx;
		font-size: 40upx;
	}

	.biaoqian {
		margin-right: 1%;
		background-color: #fed060;
		color: #fff;
		border-radius: 10rpx;
		text-align: center;
		width: 19%;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 22rpx;
		margin-top: 10rpx;
		font-weight: bold;
	}

	.shijian_dizhi {
		width: 90%;
		margin-left: 5%;
		margin-bottom: 20upx;
		background-color: #FFFFFF;
		margin-bottom: 50upx;
		margin-top: 20upx;
		border-radius: 10upx;
	}

	.fuwu {
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
		margin-top: 20upx;
	}


	/* pages/shops/shop_detail.wxss */
	.slide-image {
		width: 100%;
		/*height: 150px;*/
	}

	.label-line {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		color: #aaa;
		margin-bottom: 27rpx;

	}

	.label-line-a {
		border: 1.5px solid #fff;
		width: 60%;
	}

	.star-a {
		width: 22rpx;
		height: 22rpx;

	}

	.shop-info-image-shouye {
		vertical-align: middle;
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.shop-info-con {
		background: #E0E0E0;
		text-align: center;
		border-bottom: 17rpx solid #E0E0E0;
		border-radius: 20px;
		margin-bottom: 10rpx;
	}

	.shop-info-title {
		background: rgb(211, 211, 216);
		/*border-radius:10px;*/
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	.shop-info-a {
		margin-top: 6px;
		padding: 2% 10%;
		display: flex;

	}

	.shop-info-b {
		width: 40rpx;
		height: 40rpx;

	}

	.shop-info-b-con {
		width: 90%;
		margin-left: 5%;
		background: #fff;
		margin-bottom: 30rpx;
	}

	.shop-info-c {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 20rpx;
		font-size: 26rpx;
		color: #666;
	}

	.shop-info-c view {
		display: flex;
		align-items: center;
		width: 85%;
	}

	.shop-info-c text {
		width: 100%;
		text-align: left;
		margin-left: 20rpx;
	}

	.shop-info-d {
		border-right: 1px solid #ccc;
	}

	.paidui-con {
		border-bottom: 4rpx solid #eee;
		padding: 20rpx 0;
	}

	.paidui-a {
		display: flex;
		justify-content: space-between;
		padding: 0 3%;
		margin-bottom: 24rpx;
		width: 78%;
	}


	.paidui-a image {
		width: 30rpx;
		height: 30rpx;
	}

	.paidui-b {
		text-align: center;
		font-size: 30rpx;
		color: #666;
	}

	.paidui-c {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
	}

	.paidui-d {
		font-size: 25rpx;
		color: #999;
	}

	.yuding-a {
		display: flex;
		justify-content: space-between;
		padding: 0 3%;
	}

	.yuding-a :first-child {
		font-size: 28rpx;
	}

	.yuding-a :nth-child(2) {
		background: rgb(232, 100, 82) none repeat scroll 0% 0%;
		font-size: 30rpx;
		color: #fff;
		padding: 10rpx 30rpx;
		border-radius: 6rpx;
	}

	.b {
		font-size: 26rpx;
		color: #555;
		line-height: 30px;
		margin-left: auto;
	}

	.local-img {
		width: 172px;
		height: 108px;
		border-radius: 5px;
		box-shadow: 0px 2px 5px #333333;
		margin: 0 10rpx;
	}


	.tab-h1 {
		height: 236rpx;
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		line-height: 80rpx;
		background: #fff;
		font-size: 16px;
		white-space: nowrap;
	}

	.tab-item1 {
		display: inline-block;
		position: relative;
		/* border:1px solid #999; */
	}

	.ab {
		font-size: 22rpx;
		padding: 2% 5%;
		border: 1px solid #ddd;
		border-radius: 20px;
		color: #666;
		width: 42%;
		text-align: center;

	}

	.local-img2 {
		width: 24rpx;
		height: 24rpx;
		margin-left: 11rpx;
		padding-top: 1rpx;

	}

	.top-input-con {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 20rpx;
		background: #fff;
		z-index: 2;
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

	.fixed {
		position: sticky;
		top: 0;
	}

	.biaoti {
		font-size: 17px;
		color: #6EB8F2;
		padding-left: 8px;
	}

	.list-box {
		margin-top: 10px;
		padding: 0 5%;
		font-size: 32rpx;
		border-bottom: 20rpx solid #eee;
		padding-bottom: 20rpx;
	}

	.list-item {
		position: relative;
		padding: 10px 0;
		width: 90%;
		margin-left: 12%;
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
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
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
		width: 190rpx;
		height: 190rpx;
	}

	.list-address,
	.list-time {
		min-height: 20px;
		line-height: 20px;
		height: 20px;
		justify-content: space-around;
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
		font-size: 34rpx;
		align-items: center;
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

	.list-zan {
		width: 34rpx;
		height: 34rpx;
		margin-left: 20rpx
	}

	.list-zan-a {
		display: flex;
		align-items: center;
	}

	.list-con {
		border-bottom: 1px solid #eee;
	}

	.pb-time {
		color: #666;
		font-size: 26rpx;
		margin-top: 10rpx;
	}

	.video-play {
		position: absolute;
		z-index: 3;
		width: 50rpx;
		height: 50rpx;
		right: 10rpx;
		top: 0rpx;
		border-radius: 0 5px 0 0;
	}

	.icon-title {
		display: flex;
		align-items: center;
	}

	.icon-title2 {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
		padding: 14rpx 26rpx;
	}

	.icon-title2 image {
		width: 40rpx;
		height: 40rpx;
	}

	.icon-a {
		width: 100rpx;
		height: 100rpx;
		float: left;
		margin-left: 10rpx;
	}

	.page_bottom {
		width: 100%;
		height: 180rpx;
		padding: 120rpx 0rpx;
		text-align: center;
	}

	.ps-btn {
		position: fixed;
		right: 20upx;
		bottom: 200upx;
	}

	.ps-btn :nth-child(1) {
		text-align: center;
		font-size: 28upx;
		background: #666666;
		color: #fff;
		width: 90upx;
		height: 90upx;
		line-height: 90upx;
		border-radius: 50%;
		margin-bottom: 20upx;
	}

	.ps-btn :nth-child(2) {
		text-align: center;
		font-size: 28upx;
		background: #666666;
		color: #fff;
		width: 90upx;
		height: 90upx;
		line-height: 90upx;
		border-radius: 50%;
	}

	.ps-btn :nth-child(1) image {
		width: 80upx;
		height: 80upx;
	}

	.ps-btn :nth-child(2) image {
		width: 80upx;
		height: 80upx;
	}

	.home-p {
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-justify-content: space-around;
		justify-content: space-around;
		background: #666666;
		width: 90rpx;
		height: 90rpx;
		position: fixed;
		z-index: 100;
		right: 20rpx;
		color: #fff;
		font-size: 24rpx;
		border-radius: 50%;
		bottom: 110rpx;
		
		background-color: #fff;
		border: 1rpx solid #666;
	}

	.home-p image {
		width: 60%;
		height: 60%;

	}
	
	.share-btn::after{
		border: none;
	
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
				width: 60rpx;
				height: 60rpx;
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
	.share-btn{
		line-height: normal;
		background-color: transparent;
		padding:0,
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
		padding-bottom: 20rpx;
		.icons {
			display: flex;
			height: 80upx;
			.box {
				width: 100%;
				height: 80upx;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				align-items: center;
				position: relative;
				.icon {
					font-size: 40rpx;
					/* color: #828282; */
				}
				.text {
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 22upx;
					color: #666;
				}
				.amount {
					position: absolute;
					background: #f00;
					color: #fff;
					width: 34rpx;
					height: 34rpx;
					line-height: 34rpx;
					text-align: center;
					border-radius: 50%;
					font-size: 20rpx;
					right: 0rpx;
					top: -16rpx;
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
				height: 80rpx;
				padding: 0 36rpx;
				color: #fff;
				display: flex;
				align-items: center;
				font-size: 28rpx;
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
	.shoucang_box{
		width: 25%;
		background: #FFFFFF;
		text-align: center;
		font-size:32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-right: 1px solid #999;
	}
	.shoucang_box image{
		width:40rpx;
		height:40rpx;
		padding-right:10rpx;
	}
	.btn_box{
		width: 100%;
		background: #FFFFFF;
		text-align: center;
		font-size:32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dianhua_box{
		width: 25%;
		background: #FFFFFF;
		text-align: center;
		font-size:32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-right: 1px solid #999;
		border-left: 1px solid #999;
	}
	.kefu_box{
		width: 25%;
		background: #FFFFFF;
		text-align: center;
		font-size:32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.shang_detail_address {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 20rpx 40rpx 20rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.banka_ft{
		border: 1px solid;
		padding: 4px;
		border-radius: 5px;
		margin-right: 4px;background-color: #4b99d2;
		color: #ffffff;
	}
	.vip_card_name{
		font-size: 17px;
		line-height:100rpx;
		margin-left: 20rpx;
	}
	.vip_logo{
		width: 80rpx;
		margin-left: 10rpx;
		height: 80rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
	}
	.vip_card_list{
		display: flex;
		width: 90%;
		border: 1px solid #666;
		margin: 0 auto;
		margin-top: 5rpx;
		border-radius: 5px;
	}
</style>
