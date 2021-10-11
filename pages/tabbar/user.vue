<template>
	<view>
		<view v-if="showHeader" class="mystatusbar" :style="{position:headerPosition,top:statusTop,backgroundColor:wxa_shop_nav_bg_color,fontColor:wxa_shop_nav_font_color}"></view>
		<view v-if="showHeader" class="header" :style="{position:headerPosition,top:headerTop,backgroundColor:wxa_shop_nav_bg_color,fontColor:wxa_shop_nav_font_color}">
			<view class="addr"></view>
			<view class="input-box">

			</view>
			<view class="icon-btn">
				<view class="icon tongzhi" @tap="toMsg" :style="{color: wxa_shop_nav_bg_color == '#FFFFFF' ? '#333' : ''}"></view>
				<!--下版本替换为: toMsg -->
				<view class="icon setting" @tap="toSetting" :style="{color: wxa_shop_nav_bg_color == '#FFFFFF' ? '#333' : ''}"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view v-if="showHeader" class="place"></view>
		<!-- 用户信息 -->
		<view class="user" :style="{backgroundColor:wxa_shop_nav_bg_color}">
			<!-- 头像 -->
			<view class="left">
				<label v-if="user_info">
					<image :src="user_info.headimgurl"></image>
				</label>
				<label v-else>
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/touxiang-white.png"></image>
				</label>
			</view>
			<!-- 昵称,个性签名 -->
			<view class="right">
				<view v-if="user_info" class="username" 
					:style="{color:wxa_shop_nav_font_color=='#000000' ? '#333' : wxa_shop_nav_font_color}">
					<label>{{fenxiao_info.nickname}}</label>
				</view>
				<view v-else @click="toLogin" class="username"
					:style="{color:wxa_shop_nav_font_color=='#000000' ? '#333' : wxa_shop_nav_font_color}">
					<label>请点击此处登录</label>
				</view>
				
				<view class="signature" :style="{color:wxa_shop_nav_font_color=='#000000' ? '#333' : wxa_shop_nav_font_color}">
					<label v-if="user_info && user_info.signature !=null">{{user_info.signature}}</label><label v-if="user_info.signature == null"></label>
				</view>
			</view>
			<!-- 二维码按钮 -->
			<view v-if="wxa_hidden_qrcode_scan_btn_in_usercenter != 1" class="erweima" @tap="toMyQR">
				<view class="icon scan_qr"></view>
			</view>
		</view>
		<!-- VIP banner -->
		<view class="VIP" v-if="wxa_show_levelname_in_usercenter == 1">
			<view class="img">
				<image src="/static/img/VIP.png"></image>
			</view>
			<view class="title">{{userInfo && userInfo.userid ? fenxiao_info.level_name : '开通VIP会员'}}</view>
			<view class="tis" @tap="showMemberExplain">会员特权</view>
		</view>

		<!-- 会员特权说明弹层 -->
		<view class="wx-popup" :hidden="explainFlag">
			<view class='popup-container'>
				<view class="wx-popup-title">会员特权</view>
				<view class="wx-popup-subtitle">{{fenxiao_info.level_name}}</view>
				<view class="wx-popup-con">

					<scroll-view scroll-y class="a-1 wx-popup-content" :scroll-left="scrollLeft" bindscrolltolower="lower">
						{{fenxiao_info.level_memo}}
					</scroll-view>


				</view>
				<view class="wx-popup-btn">
					<text class="btn-ok" @click='hideMemberExplain'>确定</text>
				</view>
			</view>
		</view>
		<!-- 会员特权说明弹层end -->



		<!-- 订单-余额 -->
		<view class="order">
			<!-- 订单类型 -->
			<view class="list" v-if="wxa_hidden_order_index_in_usercenter != 1">
				<view class="box" style="width: 25%;" v-for="(row,index) in order_icon_list" :key="index" @tap="toOrderList(row.otype,index)">
					<view class="img order_icon_msg">
						<view class="icon" :class="row.icon"></view>
						<div class="order_icon_alarm" v-if="row.order_num">
						  {{row.order_num}}
						</div>
					</view>
					<view class="text">{{row.text}}</view>

				</view>
			</view>
			<!-- 余额 / 赠款 / 积分 -->
			<view class="balance-info">
				<view class="left">
					<!-- 余额 -->
					<view v-if="wxa_hide_balance_in_usercenter != 1"
						class="box" 
						@tap="goto_user_function('/pages/user/log')">
						<view class="num">{{fenxiao_info && fenxiao_info.balance_yuan ? fenxiao_info.balance_yuan : '0.00'}}</view>
						<view class="text">{{text_balance_str}}</view>
					</view>
					<view v-else
						class="box">
						<image :src="wxa_hide_balance_in_usercenter_icon" mode="heightFix" style="height: 100rpx;"></image>
					</view>
					
					<!-- 赠款 -->
					<view class="box" v-if="wxa_show_zengkuan_in_usercenter == 1" @tap="goto_user_function('/pages/user/log?type=zengkuan')">
						<view class="num">{{fenxiao_info && fenxiao_info.balance_zengsong_yuan ? fenxiao_info.balance_zengsong_yuan : '0.00'}}</view>
						<view class="text">{{text_balance_zengsong_str}}</view>
					</view>
					
					<!-- 积分 -->
					<view v-if="wxa_hide_score_in_usercenter != 1"
						class="box" 
						@tap="goto_user_function('/pages/user/logscore')">
						<view class="num">{{fenxiao_info && fenxiao_info.score ? fenxiao_info.score : '0'}}</view>
						<view class="text">{{text_score_str}}</view>
					</view>
					<view v-else
						class="box">
						<image :src="wxa_hide_score_in_usercenter_icon" mode="heightFix" style="height: 100rpx;"></image>
					</view>
				</view>


				<view class="right" v-if="wxa_show_recharge_button_in_usercenter == 1">
					<view class="box" @tap="toDeposit">
						<view class="img">
							<view class="icon chongzhi"></view>
						</view>
						<view class="text">充值</view>
					</view>
				</view>
				<view class="right" v-else>
					<view class="box">
						<view class="img logo-img">
							<image :src="wxa_shop_operation_logo_url" mode="widthFix" class="logo001"></image>
							<!-- <view class="icon chongzhi"></view> -->
						</view>
						<view class="text"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 平铺图片 -->
		<view style="width: 96%;margin-left: 2%;" v-if="wxa_usercenter_ad_list">
			<image style="width: 100%;" @tap="toUrl(item.url)" v-for="(item,index) in wxa_usercenter_ad_list" :key="index" :src="item.image"
			 mode="widthFix"></image>
		</view>


		<!-- 工具栏 -->
		<view class="toolbar">
			<view class="title">我的工具栏</view>
			<view class="list" v-if="wxa_usercenter_function_list == 0">
				<!-- 九宫格 -->
				<view class="box" v-for="(row,index) in user_function_list" :key="index" @tap="goto_user_function(row.url)">
					<view class="img">
						<image :src="row.src"></image>
					</view>
					<view class="text">{{row.name}}</view>
				</view>
				<navigator class="box" :url="'/pages/main/about/about?about=' + about">
					<view class="img">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/aboutus.png"></image>
					</view>
					<view class="text">{{about}}</view>
				</navigator>
			</view>
			<view class="list" v-else>
				<!-- 列表 style="width:100%;padding:10rpx 40rpx;line-height:60rpx;margin-top: 20rpx;border-bottom:1px solid #eee;overflow: hidden;"-->
				<view class="icon_box_item" v-for="(row,index) in user_function_list" :key="index" @tap="goto_user_function(row.url)">
					<view style='float: left;'>
						<image style="width:70rpx;height:70rpx;margin-right:40rpx;" :src="row.src"></image>
					</view>
					<view style="float:left;"><text style="color:#333;font-size:35rpx;">{{row.name}}</text></view>
					<view style="clear:both;"></view>
				</view>


				<navigator class="icon_box_item" :url="'/pages/main/about/about?about=' + about">
					<view style='float: left;'>
						<image style="width:70rpx;height:70rpx;margin-right:40rpx;" src="https://yanyubao.tseo.cn/Tpl/static/images/aboutus.png"></image>
					</view>
					<view style="float:left;"><text style="color:#333;font-size:35rpx;">{{about}}</text></view>
				</navigator>
				
				

			</view>
			
			
			
			<view class="icon_box_item" @tap="goto_user_test_icon()" style="display:none;">
				<view style='float: left;'>
					<image style="width:70rpx;height:70rpx;margin-right:40rpx;" src="https://yanyubao.tseo.cn/Tpl/static/images/aboutus.png"></image>
				</view>
				<view style="float:left;"><text style="color:#333;font-size:35rpx;">测试图标</text></view>
				<view style="clear:both;"></view>
			</view>
			<navigator class="icon_box_item" :url="'/pages/login/login_get_userinfo'"  style="display:none;">
				<view style='float: left;'>
					<image style="width:70rpx;height:70rpx;margin-right:40rpx;" src="https://yanyubao.tseo.cn/Tpl/static/images/aboutus.png"></image>
				</view>
				<view style="float:left;"><text style="color:#333;font-size:35rpx;">头像和昵称</text></view>
			</navigator>
			
			
			
			
		</view>

		<!-- 		<navigator url="/pages/live/live-pusher">主播控制台</navigator> -->
		<!-- 		<navigator url="/pages/live/live-player">直播页面</navigator> -->
		<!-- 		<navigator url="/pages/live/live-list">直播列表</navigator> -->

		<!-- 占位 -->
		<view class="place-bottom"></view>

		<view class='icon-jump' @click='toPageIndex' :style="{background: icon_jump_bg_color}" v-if="wxa_show_return_to_index_in_usercenter == 1">
			<image src="../../static/img/shouye.svg"></image>
			<view :style="{color:wxa_shop_nav_font_color}">首页</view>
		</view>

		<!-- 著作信息 -->
		<view class="copyright_info">{{default_copyright_text}}</view>
	</view>
</template>
<script>
	// var abotapi = require("../../../common/abotapi.js");
	// var app = getApp();

	export default {
		data() {
			return {
				text_balance_str:'余额',
				text_balance_zengsong_str:'赠款',
				text_score_str:'积分',
				
				isfirst: true,
				headerPosition: "fixed",
				headerTop: null,
				statusTop: null,
				showHeader: true,
				productid: 0,
				//个人信息,
				user_info: '',
				fenxiao_info: '',
				wxa_shop_nav_bg_color: '',
				wxa_shop_nav_font_color: '',
				
				// 订单类型
				order_icon_list: [{
						text: '全部订单',
						icon: "jianpan",
						otype: 0,
						order_num:0,
					},
					{
						text: '待付款',
						icon: "fukuan",
						otype: 1,
						order_num:0,
					},
					{
						text: '待发货',
						icon: "fahuo",
						otype: 2,
						order_num:0,
					},
					{
						text: '待收货',
						icon: "shouhuo",
						otype: 6,
						order_num:0,
					},

				],
				// 工具栏列表
				user_function_list: '',
				default_copyright_text: '',
				about: '',
				userInfo: '',

				user_center_function_list_icon_type: 0,
				user_center_function_list_icon_list: [],

				wxa_show_recharge_button_in_usercenter: 0,
				wxa_show_zengkuan_in_usercenter: 0,
				wxa_hidden_order_index_in_usercenter: 0,
				wxa_show_levelname_in_usercenter: 0,

				explainFlag: 1, //会员说明显示控制
				scrollLeft: '',
				//shop_info_from_server: ''
				wxa_shop_operation_logo_url: '',
				wxa_show_return_to_index_in_usercenter: 0, //控制返回首页是否显示

				icon_jump_bg_color: '#000', //返回首页的悬浮图标的背景颜色
				wxa_usercenter_function_list: 0, //控制工具栏的样式  是九宫格还是列表
				wxa_usercenter_ad_list: [], //平铺图片
				
				//是否隐藏扫码图标
				wxa_hidden_qrcode_scan_btn_in_usercenter:0,
				
				//是否隐藏 余额和积分图标
				wxa_hide_balance_in_usercenter:0,
				wxa_hide_score_in_usercenter:0,
				wxa_hide_balance_in_usercenter_icon:'',
				wxa_hide_score_in_usercenter_icon:'',
				
			}
		},

		onLoad() {
			console.log('/pages/tabbar/user===>>>onLoad()');
			
			var that = this;

			uni.setNavigationBarTitle({
				title: '会员中心'
			})

			that.about = '关于我们';

			// #ifdef H5
			that.about = '关于我们';
			// #endif

			// #ifdef APP-PLUS
			that.about = '关于APP';
			// #endif

			// #ifdef MP-WEIXIN
			that.about = '关于小程序'
			// #endif

			// #ifdef MP-BAIDU
			that.about = '百度小程序'

			uni.setNavigationBarTitle({
				title: '会员中心'
			})
			// #endif



			that.abotapi.set_option_list_str(that,
				that.set_option_list_callback
			);


			that.abotapi.get_shop_info_from_server((shop_info) => {
				if (!shop_info) {
					return;
				}
				//this.shop_info_from_server = shop_info;
			})


			this.statusHeight = 0;
			// #ifdef APP-PLUS
			this.showHeader = true;
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif
			
			
			
			
		},
		onReady() {
			//此处，演示,每次页面初次渲染都把登录状态重置
			uni.setStorage({
				key: 'UserInfo',
				data: false,
				success: function() {},
				fail: function(e) {}
			});
		},
		onShow() {
			var that = this;

			//更新账号余额等信息
			this.get_current_userinfo();

			that.abotapi.set_option_list_str(that,
				function(that001, option_list) {

					if (option_list.wxa_show_recharge_button_in_usercenter) {
						that.wxa_show_recharge_button_in_usercenter = option_list.wxa_show_recharge_button_in_usercenter;
					}

					that.wxa_shop_operation_logo_url = option_list.wxa_shop_operation_logo_url;

					if (option_list.wxa_show_zengkuan_in_usercenter) {
						that.wxa_show_zengkuan_in_usercenter = option_list.wxa_show_zengkuan_in_usercenter;
					}
					if (option_list.wxa_hidden_order_index_in_usercenter) {
						that.wxa_hidden_order_index_in_usercenter = option_list.wxa_hidden_order_index_in_usercenter;
					}
					if (option_list.wxa_show_levelname_in_usercenter) {
						that.wxa_show_levelname_in_usercenter = option_list.wxa_show_levelname_in_usercenter;
					}


					that.default_copyright_text = that.abotapi.globalData.default_copyright_text;


				}
			);

		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {

			console.log('onPullDownRefresh onPullDownRefresh onPullDownRefresh');

			uni.showToast({
				title: '数据更新中……',
				//icon:'loading'
			});

			setTimeout(function() {
				uni.stopPullDownRefresh();

				uni.hideToast();

			}, 1000);

			this.abotapi.set_option_list_str(this,
				this.set_option_list_callback
			);


		},

		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
			this.headerTop = e.scrollTop >= 0 ? null : 0;
			this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
		},
		methods: {
			set_option_list_callback:function(that001, option_list){
				//that001.abotapi.getColor();
				console.log('option_list(/pages/tabbar/user)', option_list);
				that001.wxa_shop_nav_bg_color = option_list.wxa_shop_nav_bg_color;
				
				that001.wxa_shop_nav_font_color = option_list.wxa_shop_nav_font_color;
				
				if(option_list.text_balance_str){
					that001.text_balance_str = option_list.text_balance_str;
				}
				if(option_list.text_balance_zengsong_str){
					that001.text_balance_zengsong_str = option_list.text_balance_zengsong_str;
				}
				if(option_list.text_score_str){
					that001.text_score_str = option_list.text_score_str;
				}
				
				
				that001.user_center_function_list_icon_type = option_list.user_center_function_list_icon_type;
				if (option_list.user_center_function_list_icon_type == -1) {
					that001.user_center_function_list_icon_list = option_list.user_center_function_list_icon_list;
				}
				
				if (option_list.wxa_show_return_to_index_in_usercenter) {
					that001.wxa_show_return_to_index_in_usercenter = option_list.wxa_show_return_to_index_in_usercenter;
				}
				
				if (option_list.wxa_shop_nav_bg_color) {
					that001.icon_jump_bg_color = option_list.wxa_shop_nav_bg_color;
				}
				
				if (option_list.wxa_usercenter_function_list) {
					that001.wxa_usercenter_function_list = option_list.wxa_usercenter_function_list;
				}
				
				
				//广告图片
				if (option_list.wxa_usercenter_ad_list) {
					that001.wxa_usercenter_ad_list = option_list.wxa_usercenter_ad_list;
				}
				
				//隐藏扫码图标
				if(option_list.wxa_hidden_qrcode_scan_btn_in_usercenter){
					that001.wxa_hidden_qrcode_scan_btn_in_usercenter = option_list.wxa_hidden_qrcode_scan_btn_in_usercenter;
				}
				//隐藏余额图标
				if(option_list.wxa_hide_balance_in_usercenter){
					that001.wxa_hide_balance_in_usercenter = option_list.wxa_hide_balance_in_usercenter;
					that001.wxa_hide_balance_in_usercenter_icon = option_list.wxa_hide_balance_in_usercenter_icon;
				}
				if(option_list.wxa_hide_score_in_usercenter){
					that001.wxa_hide_score_in_usercenter = option_list.wxa_hide_score_in_usercenter;
					that001.wxa_hide_score_in_usercenter_icon = option_list.wxa_hide_score_in_usercenter_icon;
				}
				
				//that001.wxa_hide_balance_in_usercenter = 1;
				//that001.wxa_hide_score_in_usercenter = 1;
				
				that001.get_current_userinfo();
				
				that001.get_user_function_list();
			},
			//获取用户信息
			get_current_userinfo: function() {
				var that = this;
				
				var userInfo = that.abotapi.get_user_info();
				
				if (!userInfo || !userInfo.userid) {
					return;
				}
				
				// #ifdef MP-WEIXIN
				if(userInfo.is_get_userinfo != 1){
					uni.showModal({
						title:'提示',
						content:'需要获取头像和昵称以继续',
						success: (res) => {
							if(res.confirm){
								uni.navigateTo({
									url: '/pages/login/login_get_userinfo'
								})
							}
							else{
								uni.showModal({
									title:'提示',
									content:'没有您的头像和昵称，个性化信息无法展示，是否不再提示？',
									success: (res02) => {
										if(res02.confirm){
											that.abotapi.globalData.userInfo.is_get_userinfo = 1;
										}
									}
								})
							}
						}
					})
					
				}
				// #endif
				
				
				
				that.userInfo = userInfo;

				console.log('get_current_userinfo--userInfo==', userInfo);
				
				var post_data = {
						sellerid: that.abotapi.globalData.default_sellerid,
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
						//appid: that.abotapi.globalData.xiaochengxu_appid,
				};
				
				// #ifdef MP-WEIXIN
					post_data.xiaochengxu_appid = that.abotapi.globalData.xiaochengxu_appid,
					post_data.xiaochengxu_openid = that.abotapi.get_current_openid('userid_openid_' + userInfo.userid);
				// #endif
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopApp&a=get_user_info',
					data: post_data,
					success: function(res) {
						console.log('ddd', res);
						
						
						
						if (res.data.code == -1) {
							that.abotapi.del_user_info();
							
							var last_url = '/pages/tabbar/user';
							that.abotapi.goto_user_login(last_url, 'normal');
							
						} 
						else {
							var data = res.data;
							
							//渲染前端界面
							that.user_info = data.data;
							
							
							that.fenxiao_info = that.user_info.fenxiao_info;
							
							
							
							console.log('data2==>>', that.user_info.status_count2);
							console.log('fenxiao_userinfo==>>', that.fenxiao_info);
							
							
							that.order_icon_list[1].order_num = that.user_info.status_count1;
							that.order_icon_list[2].order_num = that.user_info.status_count2;
							that.order_icon_list[3].order_num = that.user_info.status_count3;
							
							console.log('fenxiao_userinfo==>>====', that.order_icon_list);
							
							
						}
					}
				})
				
				

				
			},
			get_user_function_list: function() {
				var that = this;

				console.log('user_center_function_list_icon_type=====>>>>>>>' + that.user_center_function_list_icon_type);

				if (that.user_center_function_list_icon_type == -1) {
					that.user_function_list = that.user_center_function_list_icon_list;

					return;
				}

				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_shop_icon_usercenter',
					data: {
						sellerid: that.abotapi.globalData.default_sellerid,
					},
					success: function(res) {
						console.log('kaafff===', res);
						that.user_function_list = res.data.data;
						console.log('akafff===', that.user_function_list);

					},
					fail: function(e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					},
				});

			},

			toUrl: function(url) {
				this.abotapi.call_h5browser_or_other_goto_url(url);
			},

			//消息列表
			toMsg() {
				this.goto_user_function('/pages/msg/msg');
			},
			toOrderList(row, index) {
				
				console.log("row", row);
				console.log("index", index);
				
				uni.setStorageSync('tbIndex', index);
				uni.setStorageSync('tbOtype', row);
				
				
				this.goto_user_function('/pages/user/order_list/order_list?currentTab=' + index + '&otype=' + row);
				
			},
			toSetting() {
				this.goto_user_function('/pages/user/setting/setting');
			},

			//点击商户头条进入列表
			touTiaoList: function(e) {
				console.log('点击商户头条进入列表');
				uni.navigateTo({
					url: '/pages/help/help?sellerid=' + this.abotapi.globalData.default_sellerid
				})
			},
			toMyQR() {
				// uni.navigateTo({
				// 	url:'/pages/user/myQR/myQR'
				// })
				var that = this;

				var userInfo = that.abotapi.get_user_info();
				if (!userInfo) {
					uni.showToast({
						title: '请登录再使用'
					})
					return;
				}

				uni.scanCode({
					success: function(res) {
						console.log('res===', res);
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);

						var result = res.result;
						if ((result.indexOf('http://') == 0) ||
							(result.indexOf('https://') == 0) ||
							(result.indexOf('/') == 0)) {
							var var_list = Object();

							//这个地方不能调用 decodeURIComponent， 
							//因为此时的网址中还包含 %oneclicklogin%，遇到  % 都有转为 %25 才可以。
							//result = decodeURIComponent(result);							
							//console.log('条码内容==>>decodeURIComponent==>>：' + result);

							that.abotapi.call_h5browser_or_other_goto_url(result, var_list);
						} else {
							uni.showModal({
								title: '提示',
								content: result,
								showCancel: false,
								success: function(res) {

								}
							});
						}

					}
				});


			},
			toLogin() {
				console.log('user.vue toLogin===>>>');

				uni.navigateTo({
					url: '/pages/login/login'
				})
				
				this.isfirst = false;
			},
			isLogin() {
				//实际应用中,用户登录状态应该用token等方法去维持登录状态.
				const value = uni.getStorageSync('UserInfo');
				if (value) {
					return true;
				}
				return false
			},
			toDeposit() {
				// uni.showToast({title: '该功能升级中'});
				// return;
				
				this.goto_user_function('/pages/user/deposit/deposit');
				
			},
			goto_user_function(url) {


				var last_url = '/pages/tabbar/user';

				var userInfo = this.abotapi.get_user_info();
				if (!userInfo) {
					this.abotapi.goto_user_login(last_url);

					return;
				}


				var that = this;

				var var_list = Object();
				//var url = e.currentTarget.dataset.string;

				console.log('url1111', url);
				that.abotapi.call_h5browser_or_other_goto_url(url, var_list);


			},
			showMemberExplain() {
				if (!this.fenxiao_info.level_memo) {
					return;
				}
				this.explainFlag = 0
			},
			hideMemberExplain() {
				this.explainFlag = 1;
			},
			toPageIndex: function(e) {
				
				this.abotapi.call_h5browser_or_other_goto_url('/pages/index/index');
				
			},
			goto_user_test_icon:function(e){ 
				uni.navigateTo({
					url:'/pages/h5browser/h5browser?url=/hybrid/html/ecardh5/index.html'
				})
			}
			
				
		}
	}
</script>
<style lang="scss">
	page {
		position: relative;
		background-color: #fff;
	}

	.mystatusbar {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		//background-color: #f06c7a;
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
		justify-content: flex-end;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		//background-color: #f06c7a;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);

		/*  #endif  */
		.icon-btn {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;

			.icon {
				color: #fff;
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
		//background-color: #f06c7a;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}

	.place-bottom {
		height: 150upx;
	}

	.user {
		width: 92%;
		padding: 0 4%;
		display: flex;
		align-items: center;
		// position: relative;
		//background-color: #f06c7a;
		padding-bottom: 120upx;

		.left {
			width: 20vw;
			height: 20vw;
			flex-shrink: 0;
			margin-right: 20upx;
			border-radius: 100%;

			image {
				width: 20vw;
				height: 20vw;
				border-radius: 100%;
			}

		}

		.right {
			width: 100%;

			.username {
				font-size: 36upx;
				color: #fff;
			}

			.signature {
				color: #eee;
				font-size: 28upx;
			}
		}

		.erweima {
			flex-shrink: 0;
			width: 10vw;
			height: 10vw;
			margin-left: 5vw;
			border-radius: 100%;

			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(to left, #fbbb37 0%, #fcf0d0 105%);

			.icon {
				color: #7b6335;
				font-size: 42upx;
			}
		}
	}

	.order {
		width: 84%;
		margin: 30upx 4% 30upx 4%;
		padding: 30upx 4% 20upx 4%;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0, 0, 0, 0.1);
		border-radius: 15upx;

		.list {
			display: flex;
			border-bottom: solid 1upx #17e6a1;
			padding-bottom: 10upx;

			.box {
				width: 20%;

				.img {
					width: 100%;
					display: flex;
					justify-content: center;

					.icon {
						font-size: 50upx;
						color: #464646;
					}
				}

				.text {
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 28upx;
					color: #3d3d3d;
				}
			}
		}

		.balance-info {
			display: flex;
			padding: 10upx 0;

			.left {
				width: 75%;
				display: flex;

				.box {
					width: 50%;
					font-size: 28upx;

					.num {
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						color: #f9a453;
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						color: #3d3d3d;
						font-size: 28upx;
					}
				}
			}

			.right {
				border-left: solid 1upx #17e6a1;
				width: 25%;

				.box {

					.img {
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;

						.icon {
							font-size: 45upx;
							color: #e78901;
						}
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 28upx;
						color: #3d3d3d;
					}
				}
			}
		}
	}

	.VIP {
		width: 84%;
		margin: -65upx auto 20upx auto;
		padding: 30upx 4%;
		background: linear-gradient(to left, #dea96d 0%, #f6d59b 100%);
		box-shadow: 0upx 0upx 25upx rgba(0, 0, 0, 0.2);
		border-radius: 15upx;
		display: flex;
		align-items: center;

		.img {
			flex-shrink: 0;
			width: 60upx;
			height: 60upx;

			image {
				width: 60upx;
				height: 60upx;
			}
		}

		.title {
			width: 100%;
			color: #796335;
			font-size: 30upx;
		}

		.tis {
			width: 100%;
			display: flex;
			justify-content: flex-end;
			color: #fcf0d0;
			font-size: 26upx;
		}
	}

	.toolbar {
		width: 92%;
		margin: 0 4% 0 4%;
		padding: 0 0 20upx 0;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0, 0, 0, 0.1);
		border-radius: 15upx;

		.title {
			padding-top: 10upx;
			margin: 0 0 10upx 3%;
			font-size: 30upx;
			height: 80upx;
			display: flex;
			align-items: center;
		}

		.list {
			display: flex;
			flex-wrap: wrap;

			.box {
				width: 25%;
				margin-bottom: 30upx;

				.img {
					width: 23vw;
					height: 10.5vw;
					display: flex;
					justify-content: center;

					image {
						width: 9vw;
						height: 9vw;
					}
				}

				.text {
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 26upx;
					color: #3d3d3d;
				}
			}
		}
	}

	.logo-img {
		margin-top: 44rpx;
	}

	.logo001 {
		width: 100rpx;
		height: 100rpx;
		border-radius: 10rpx;
	}

	.wx-popup {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
	}

	.popup-container {
		position: absolute;
		left: 50%;
		top: 50%;

		width: 80%;
		max-width: 600rpx;
		border: 2rpx solid #ccc;
		border-radius: 10rpx;
		box-sizing: bordre-box;
		transform: translate(-50%, -50%);
		overflow: hidden;
		background: #fff;
	}

	.wx-popup-title {
		padding: 20rpx;
		text-align: center;
		font-size: 28rpx;
		border-bottom: 2rpx solid red;
	}

	.wx-popup-subtitle {
		text-align: center;
		font-size: 28rpx;
		color: #6798E9;
		margin-top: 26rpx;
	}

	.wx-popup-con {
		margin: 60rpx 10rpx;
		text-align: center;
		font-size: 28rpx;
		margin-top: 20rpx;
	}

	.wx-popup-btn {
		display: flex;
		justify-content: space-around;
		margin-bottom: 40rpx;
	}

	.wx-popup-btn text {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 33%;
		height: 70rpx;
		border-radius: 88rpx;
		background: #6798E9;
		color: #fff;
		font-size: 28rpx;
	}

	.wx-popup-content {
		height: 300px;
		text-align: left;
		white-space: pre-line;
	}

	.icon-jump {
		width: 120rpx;
		height: 120rpx;
		position: fixed;
		right: 40rpx;
		bottom: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100px;
		background: #00FF00;
		flex-direction: column;
		font-size: 28rpx;
	}

	.icon-jump image {
		width: 60rpx;
		height: 60rpx;
	}

	.icon-list {
		width: 33%;
		height: 220rpx;
		text-align: center;
		float: left;
	}

	.icon-list image {
		height: 120rpx;
		width: 120rpx;
		margin-top: 50rpx;
	}

	.icon_box_item {
		line-height: 80rpx;
		margin: 10rpx 20rpx 10rpx 20rpx;
		border-bottom: 1px solid #eee;
		padding: 0 0 0 30rpx;
		height: 80rpx;
		width: 90%;
		float: left;
		clear: both;
	}

	/*==== 图标右上角的数字小图标 ====*/
	.order_icon_msg {
		position: relative;
		width: 60rpx;
		height: 60rpx;
		float: left;
	}

	.order_icon_msg img {
		width: 60rpx;
		height: 60rpx;
	}

	.order_icon_alarm {
		position: absolute;
		color: white;
		font-size: 17rpx;
		background-color: red;
		/*height: 24rpx;改前*/
		min-height: 24rpx;
		/*改后新增的代码*/
		min-width: 24rpx;
		/*改后新增的代码*/
		line-height: 24rpx;
		right: 20%;
		top: -12rpx;
		text-align: center;
		-webkit-border-radius: 24rpx;
		border-radius: 24rpx;
		padding: 2rpx;
	}
	/*======== End =======*/
	
</style>
