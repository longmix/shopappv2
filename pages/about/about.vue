<template>
	<view>


		<view class="logo_box">
			<view class="box_img">
				<view class="logo_img">
					<image :src="wxa_shop_operation_logo_url"></image>
				</view>
				<view class="code_num2" v-if="wxa_shop_new_name">{{wxa_shop_new_name}}</view>
				<view class="code_num" v-if="version_number">版本号：{{version_number}}</view>
			</view>
		</view>
		<view class="list">
			<view class="list_li" v-if="kefu_telephone">
				<view class="li_title">客服电话</view>
				<view class="li_info" bindtap="callTel">{{kefu_telephone}}</view>
			</view>
			<view class="list_li" v-if="kefu_qq">
				<view class="li_title">客服</view>
				<view class="li_info">{{kefu_qq}}</view>
			</view>
			<view class="list_li" v-if="kefu_website">
				<view class="li_title">官方网站</view>
				<view class="li_info">{{kefu_website}}</view>
			</view>
			<view class="list_li" v-if="kefu_gongzhonghao">
				<view class="li_title">微信公众号</view>
				<view class="li_info">{{kefu_gongzhonghao}}</view>
			</view>
			<!--
	  <view class="list_li" bindtap="openChat">
		<view class="li_title">意见反馈</view>
		<view class="li_info">

			<view class="jiantou"><image src="../../images/icon-arrowdown.png"></image>
			</view> 
		</view>
	  </view>
	  -->
			<!-- <view class="list_li" bindtap="useHelp">
		<view class="li_title">使用帮助</view>
		<view class="li_info">
		   <view class="jiantou"><image src="../../images/icon-arrowdown.png"></image></view> 
		</view>
	  </view>
	  <view class="list_li" bindtap="shenMing">
		<view class="li_title">隐私声明</view>
		<view class="li_info">
			<view class="jiantou"><image src="../../images/icon-arrowdown.png"></image></view>    
		</view>    
	  </view> -->
			<view class="list_li" @tap="clearStorage">
				<view class="li_title">清空缓存</view>
				<view class="li_info">
					<view class="jiantou">
						<image src="../../static/img/x_right.png"></image>
					</view>
				</view>
			</view>

		</view>

		<view class="logo_box">
			<view class="box_img">
				<view style="width: 50%;float:left;text-align:center;">
					<!-- #ifdef APP-PLUS -->
					<button class="xg_button" style="width:90%;" @tap="call_seller" type="primary">联系客服</button>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<button class="xg_button" style="width:90%;" @tap="call_seller" type="primary">联系客服</button>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<button class="xg_button" style="width:90%;" open-type="contact" type="primary">小程序客服</button>
					<!-- #endif -->
					<!-- #ifdef MP-BAIDU -->
					<button class="xg_button" style="width:90%;" @tap="call_seller" type="primary">联系客服</button>
					<!-- #endif -->
					<!-- #ifdef MP-ALIPAY -->
					<button class="xg_button" style="width:90%;" @tap="call_seller" type="primary">联系客服</button>
					<!-- #endif -->
				</view>
				<view style="width: 50%;float:left;text-align:center;">
					<button :data-url="jubao_link_url" @tap="mytiaozhuan" class="xg_button" style="width:90%;background-color: #eee;color:#222;"
					 type="primary">问题反馈</button>
				</view>
			</view>
		</view>
		
		
		<!-- 隐私协议 -->
		<view style="display: flex;justify-content: center;margin-bottom: 15rpx;align-items: center;">
			
			<navigator style="color: #0055FF;float: left;font-size: 30rpx;margin-right: 5rpx;" 
				:url="'/pages/help_detail/help_detail?id='+ yinsi_cfg_shiyongxieyi_imgid +'&form_page=spec_cms_token&cms_token='+ yinsi_cfg_shiyongxieyi_cms_token +'&hidden_remark=1'">服务协议</navigator>
			|
			<navigator style="color: #0055FF;float: left;font-size: 30rpx;margin-left: 5rpx;" 
				:url="'/pages/help_detail/help_detail?id='+ yinsi_cfg_yinsizhengce_imgid +'&form_page=spec_cms_token&cms_token='+ yinsi_cfg_yinsizhengce_cms_token +'&hidden_remark=1'">隐私政策</navigator>
		</view>
		<!-- end -->
		
	</view>
</template>
<script>
	// import app from '../../common/common.js';
	var apps = getApp();

	// var userInfo = that.abotapi.get_user_info();
	// var userAcountInfo = that.abotapi.get_user_account_info();

	export default {
		data() {
			return {
				telephone: '021-31128716',
				button_bg_color: '#179b16',
				button_font_color: 'rgba(255,255,255, 0.6)',

				shop_info_from_server: '',

				wxa_shop_nav_bg_color: '',
				wxa_shop_nav_font_color: '',
				
				wxa_shop_operation_logo_url:'',
				wxa_shop_new_name:'',


				
				kefu_telephone:'',
				kefu_qq: '',
				kefu_website: '',
				kefu_gongzhonghao: '',
				version_number: '',
				jubao_link_url: '',
				about_title: '',
				
				
				//隐私协议相关
				yinsi_cfg_shiyongxieyi_cms_token:'',
				yinsi_cfg_yinsizhengce_cms_token:'',
				yinsi_cfg_yinsizhengce_imgid:'',   
				yinsi_cfg_shiyongxieyi_imgid:'',
			}
		},
		onLoad(options) {
			var that = this;
			
			//var userInfo = that.abotapi.get_user_info();
			
			// userAcountInfo = that.abotapi.get_user_account_info();
			
			that.kefu_telephone = that.abotapi.globalData.kefu_telephone;
			that.kefu_qq = that.abotapi.globalData.kefu_qq;
			that.kefu_website = that.abotapi.globalData.kefu_website;
			that.kefu_gongzhonghao = that.abotapi.globalData.kefu_gongzhonghao;
			
			that.version_number = that.abotapi.globalData.version_number;
			
			this.abotapi.set_option_list_str(that, function(that001, option_list) {
				//that001.abotapi.getColor();
				
				console.log('option_list=====>>>>', option_list);

				that001.wxa_shop_operation_logo_url = option_list.wxa_shop_operation_logo_url;
				that001.wxa_shop_new_name = option_list.wxa_shop_new_name;
				
				console.log('option_list=====>>>>', that001.wxa_shop_operation_logo_url);
				console.log('option_list=====>>>>', that001.wxa_shop_new_name);
				
				if(!that001.abotapi.isNullOrUndefined(option_list.kefu_telephone)){
					that001.kefu_telephone = option_list.kefu_telephone;
				}
				if(!that001.abotapi.isNullOrUndefined(option_list.kefu_qq)){
					that001.kefu_qq = option_list.kefu_qq;
				}
				if(!that001.abotapi.isNullOrUndefined(option_list.kefu_website)){
					that001.kefu_website = option_list.kefu_website;
				}
				if(!that001.abotapi.isNullOrUndefined(option_list.kefu_gongzhonghao)){
					that001.kefu_gongzhonghao = option_list.kefu_gongzhonghao;
				}
				
				
				//隐私政策和使用协议
				if (option_list.yinsi_cfg_shiyongxieyi_imgid) {
					//使用协议的文章id
				  
				    that001.yinsi_cfg_shiyongxieyi_imgid = option_list.yinsi_cfg_shiyongxieyi_imgid;
				}
				
				if (option_list.yinsi_cfg_yinsizhengce_imgid) {
					//隐私政策的文章id
				  
				    that001.yinsi_cfg_yinsizhengce_imgid = option_list.yinsi_cfg_yinsizhengce_imgid;
				}
				
				if (option_list.yinsi_cfg_yinsizhengce_cms_token) {
					//隐私政策的cms token
				  
				    that001.yinsi_cfg_yinsizhengce_cms_token = option_list.yinsi_cfg_yinsizhengce_cms_token;
				}
				
				if (option_list.yinsi_cfg_shiyongxieyi_cms_token) {
					//使用协议的cms token
				  
				    that001.yinsi_cfg_shiyongxieyi_cms_token = option_list.yinsi_cfg_shiyongxieyi_cms_token;
				}
				
			});

			if (options.about) {
				uni.setNavigationBarTitle({
					title: options.about
				})
				
				that.about_title = options.about;
			}

			uni.getSystemInfo({
				success: function(res) {
					console.log('res==', res)
					console.log('res.model', res.model);
					console.log('res.pixelRatio', res.pixelRatio);
					console.log('res.windowWidth', res.windowWidth);
					console.log('res.windowHeight', res.windowHeight);
					console.log('res.language', res.language);
					console.log('res.version', res.version);
					console.log('res.platform', res.platform);
					that.windowHeight = res.windowHeight;
					that.windowTop = res.windowTop;
				}
			});

			


			that.abotapi.get_shop_info_from_server(that.callback_func_for_shop_info)

			that.jubao_link_url = that.abotapi.jump_to_fankui_url();




		},
		methods: {
			clearStorage: function() {
				this.abotapi.clearStorage();
			},



			mytiaozhuan: function(e) {
				var that = this;

				var url = e.currentTarget.dataset.url;
				console.log('user mytiaozhuan准备跳转：' + url);
				
				var var_list = Object();
				
				that.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
				
				

				//var last_url = 'switchTab /pages/chat/chat?retpage=' + encodeURIComponent(url);
				//that.abotapi.goto_user_login(last_url);


				
			},

			callback_func_for_shop_info: function(shop_info) {
				if (!shop_info) {
					return;
				}

				this.shop_info_from_server = shop_info;

				this.shop_userid = shop_info.userid;
				this.shop_name = shop_info.shop_name;
				
				if(this.shop_info_from_server.telephone){
					this.kefu_telephone = this.shop_info_from_server.telephone;
				}

			},

			//拨打客服电话
			call_seller: function() {
				// #ifdef MP-WEIXIN
				// #endif

				// #ifdef APP-PLUS
				uni.makePhoneCall({
					phoneNumber: this.kefu_telephone,
				})
				// #endif
				
				// #ifdef MP-BAIDU
				var userInfo = this.abotapi.get_user_info();
				if (!userInfo || !userInfo.userid) {
					var last_url = '/pages/about/about?about=' + this.about_title;
					this.abotapi.goto_user_login(last_url, 'normal');
					return;
				}
				uni.navigateTo({
					url: "/pages/msg/chat/chat?type=0&userid=" + this.shop_userid + '&name=' + this.shop_name,
				})
				// #endif
				
				// #ifdef MP-ALIPAY
				uni.makePhoneCall({
					phoneNumber: this.kefu_telephone,
				})
				// #endif

			},
		},






	}
</script>

<style>
	.logo_box {
		width: 98%;
		height: 400rpx;
		margin: 0 auto;

	}

	.box_img {
		height: 320rpx;
		margin: 0 auto;
		padding-top: 60rpx;

	}

	.logo_img {
		width: 160rpx;
		height: 160rpx;
		margin: 0 auto;
		border-radius: 20rpx;
	}

	.logo_img image {
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}

	.code_num {
		width: 100%;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		font-size: 25rpx;
		color: #888;
	}

	.code_num2 {
		width: 100%;
		height: 60rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 40rpx;
		color: #666;
	}

	.list {
		width: 98%;
		margin: 0 auto;
	}

	.list_li {
		width: 100%;
		height: 90rpx;
		border-bottom: 1rpx solid #ddd;
	}

	.li_title {
		width: 50%;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 32rpx;
		text-indent: 16rpx;
		float: left;
		color: #2a2a2a;
	}

	.li_info {
		width: 50%;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 32rpx;
		float: right;
		color: #2a2a2a;
		box-sizing: border-box;
		text-align: right;
		padding-right: 16rpx;
	}

	.jiantou {
		width: 40rpx;
		height: 40rpx;
		margin-top: 12rpx;
		float: right;
	}

	.jiantou image {
		width: 100%;
		height: 100%;
	}
</style>
