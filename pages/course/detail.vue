<template>
	<view class="content">
		<view class="content_top">
			<abotshare ref="share_api" @click_wxa_share="click_wxa_share"
				@click_wxa_circle_share='click_wxa_circle_share' @click_wxa_applet_share='click_wxa_applet_share'
				@click_wxa_command_copy='click_wxa_command_copy' @click_wxa_system_share='click_wxa_system_share'>
			</abotshare>
			<image style="width: 100%;height: 400rpx;position:relative;border-radius: 10rpx;" :src="detail_list.icon">
			</image>
		</view>
		<view class="content_title">
			<view class="letterpress_theme">{{detail_list.name}}</view>
			<view class="letterpress_title">{{detail_list.brief}}</view>
			<view style="width: 100%;display: flex;flex-direction: row;justify-content: space-between;
						align-items: center;">
				<view class="content_jiage">
					<view style="color: red; float: left;font-size: 24rpx;">￥{{detail_list.price01}}元
					</view>
					<view style="color:#737373;float: left;font-size: 24rpx;text-decoration: line-through;margin-left: 50rpx">￥{{detail_list.price02}}元
					</view>
				</view>
				<view class="letterpress_text">{{detail_list.buyer_counter}}人在读</view>
			</view>
		</view>
		<view class="nav_list">
			<view
				style="display: flex; flex-direction: row; justify-content:space-around;margin-bottom: 20rpx;width: 100%;">
				<view @click="curTabID = 1" :class="{'cur':curTabID===1}" class="nav_list_title">课程简介</view>
				<view @click="curTabID = 2" :class="{'cur':curTabID===2}" class="nav_list_title">课程章节</view>
				<view @click="curTabID = 3" :class="{'cur':curTabID===3}" class="nav_list_title">课程评价</view>
			</view>
			<view class="nav_content">
				<view v-show="curTabID === 1">
					<!-- 右侧下方的两个导航图标  Begin-->
					<view class="home_page" style="bottom: 15%;" @click="toPagemy" :style="{background: wxa_shop_nav_bg_color}">
					    <image src="https://yanyubao.tseo.cn/Tpl/static/images/touxiang-white.png"></image>
						<view class="nav_right_icon" :style="{color:wxa_shop_nav_font_color}">我的</view>
					</view>
					<view class="home_page" style="bottom: 30%;" @click="toPageIndex" :style="{background: wxa_shop_nav_bg_color}">
					    <image src="https://yanyubao.tseo.cn/Tpl/static/images/shouye01.png"></image>
						<view class="nav_right_icon" :style="{color:wxa_shop_nav_font_color}">首页</view>
					</view>
					<!-- 右侧下方的两个导航图标  End -->

					<!-- 富媒体文本展示卡牌详情 -->
					<view class="card_detail_xiangqing">
						<view class="description001">
							<view class="content">
								<!-- #ifdef MP-ALIPAY -->
								<rich-text :nodes="zhangjie_describe"></rich-text>
								<!-- #endif -->
								<!-- #ifndef MP-ALIPAY -->
								<rich-text style="font-size: 20rpx;" :nodes="zhangjie_describe|formatRichText"></rich-text>
								<!-- #endif -->
							</view>
						</view>
					</view>
					<view style="background-color: #ffffff;height: 200rpx;"></view>
					<!-- <view class="footer" style="height: 200rpx;" v-if="detail_list.is_user_can_buy != 1"> -->
					<view class="footer">
						<view v-if="detail_list.is_user_can_buy == 1"
							style="font-size: 30rpx;padding-right: 20rpx;text-align: right;background-color: #ffffff;margin-top: 20rpx;">
							您需要支付：&nbsp;&nbsp;<text style="color: #ea0000;">￥{{detail_list.price01}}</text></view>
							<!-- <view style="height: 68rpx;" v-if="detail_list.is_user_can_buy == 1" ></view> -->
						<view @click="gotolink" v-if="detail_list.is_user_can_buy == 1" class="content_bottom_icon">
							<image src="https://yanyubao.tseo.cn/Tpl/static/images/piliang.png"
								style="width: 50rpx;height: 50rpx;"></image>
							<view style="font-size: 20rpx;">更多课程</view>
						</view>
						<view class="content_bottom_goumai">
							<view class="content_bottom_zhifu" @tap="toPay" v-if="detail_list.is_user_can_buy == 1">立即支付</view>
							<view class="content_bottom_zhifu" @tap="tiaozhuan_moreClass" v-if="detail_list.is_user_can_buy != 1">更多课程</view>
							<!-- #ifdef MP -->
							
							<button class="box share-btn" open-type="share"
							 style="width: 200rpx;height: 80rpx;line-height: 80rpx;background: #FFC13C;float: right;text-align: center;
							 color: #ffffff;border-top-left-radius:50upx;border-bottom-left-radius:50upx;
							 border-bottom-right-radius: 0;border-top-right-radius: 0;border:none">
								<!-- <view class="icon fenxiang"></view> -->
								<view style="font-size: 26rpx;!important">分享</view>
								<!-- <button class="text" open-type="share">分享</button> -->
							</button>
							<!-- <button style="padding-left: 0;padding-right: 0;" open-type="share">分享</button> -->
							<!-- #endif -->
							
							<!-- #ifdef APP-PLUS -->
							<button class="box share-btn" @click="is_show" 
							style="width: 200rpx;height: 80rpx;line-height: 80rpx;background: #FFC13C;float: right;
							text-align: center;color: #ffffff;border-top-left-radius:50upx;
							border-bottom-left-radius:50upx;border-bottom-right-radius: 0;
							border-top-right-radius: 0;border:none">
								<!-- <view class="icon fenxiang"></view> -->
								<view  style="font-size: 26rpx;!important">分享</view>
								<!-- <button class="text" open-type="share">分享</button> -->
							</button>
							<!-- <button style="padding-left: 0;padding-right: 0;" open-type="share">分享</button> -->
							<!-- #endif -->
							
							
							<!-- #ifdef H5 -->
							<view class="box" @tap="share_shang_detail">
								<!-- <view class="icon fenxiang"></view> -->
								<view style="font-size: 26rpx;!important">分享</view>
							</view>
							<!-- #endif -->
							
						<view class="share" :class="shareClass" @touchmove.stop.prevent="discard" @tap="hideShare">
							<view class="mask"></view>
							<view class="layer" @tap.stop="discard">
								<view class="h1">分享</view>
								<view class="list"></view>
								<view class="btn" @tap="hideShare">取消</view>
							</view>
						</view>
					</view>
					<!-- </view> -->
				</view>
			</view>
			<view v-show="curTabID === 2">
					<view class="content_zhangjie">
						<view class="content_zhangjie_vedio">
							<view v-for="(zhangjie_item , index) in zhangjie_list" :key="index">
								<view class="content_zhangjie_vedio_one" @tap="quanquan_detail_tiaozhuan(zhangjie_item.videoid)" style="display: inline-block;">
									<view style="width: 20%;float: left;margin-top: 20rpx;">
										<image :src="zhangjie_item.img_url" class="content_vedio"></image>
									</view>
									<view class="content_text" style="width: 55%;float: right;margin-top: 20rpx;">
										<view style="color: #313131;font-weight: bold; font-size: 30rpx; ">{{zhangjie_item.title}}</view>
										<view style="color: #7f7f7f; margin-top: 10rpx;font-size: 26rpx;">{{zhangjie_item.describe}}</view>
									</view>
								</view>
								
							</view>
							<view style="background-color: #ffffff;height: 200rpx;"></view>
							<view class="footer">
								<view v-if="detail_list.is_user_can_buy == 1"
									style="" class="zhifu_jiage">
									您需要支付：&nbsp;&nbsp;<text style="color: #ea0000;">￥{{detail_list.price01}}</text></view>
									<!-- <view style="height: 68rpx;" v-if="detail_list.is_user_can_buy == 1" ></view> -->
								<view @click="gotolink" class="content_bottom_icon" v-if="detail_list.is_user_can_buy == 1">
									<!-- <view v-if="detail_list.is_user_can_buy != 1" @click="Tobuy"></view> -->
									<image src="https://yanyubao.tseo.cn/Tpl/static/images/piliang.png"
										style="width: 50rpx;height: 50rpx;"></image>
									<view style="font-size: 20rpx;">更多课程</view>
								</view>
								<view class="content_bottom_goumai">
									<view class="content_bottom_zhifu" @tap="toPay" v-if="detail_list.is_user_can_buy == 1">立即支付</view>
									<view class="content_bottom_zhifu" @tap="tiaozhuan_moreClass" v-if="detail_list.is_user_can_buy != 1">更多课程</view>
									<!-- <view class="content_bottom_fenxiang">分享</view> -->
									<!-- #ifdef MP -->
									
									<button class="box share-btn" open-type="share" 
									style="width: 200rpx;height: 80rpx;line-height: 80rpx;background: #FFC13C;
									float: right;text-align: center;color: #ffffff;
									border-top-left-radius:50upx;border-bottom-left-radius:50upx;
									border-bottom-right-radius: 0;border-top-right-radius: 0;border:none">
										<!-- <view class="icon fenxiang"></view> -->
										<view style="font-size: 26rpx;!important">分享</view>
										<!-- <button class="text" open-type="share">分享</button> -->
									</button>
									<!-- <button style="padding-left: 0;padding-right: 0;" open-type="share">分享</button> -->
									<!-- #endif -->
									
									<!-- #ifdef APP-PLUS -->
									
									<button class="box share-btn" @click="is_show" 
									style="width: 200rpx;height: 80rpx;line-height: 80rpx;
									background: #FFC13C;float: right;text-align: center;
									color: #ffffff;border-top-left-radius:50upx;
									border-bottom-left-radius:50upx;border-bottom-right-radius: 0;
									border-top-right-radius: 0;border:none">
										<!-- <view class="icon fenxiang"></view> -->
										<view style="font-size: 26rpx;!important">分享</view>
										<!-- <button class="text" open-type="share">分享</button> -->
									</button>
									<!-- <button style="padding-left: 0;padding-right: 0;" open-type="share">分享</button> -->
									<!-- #endif -->
									
									
									<!-- #ifdef H5 -->
									<view class="content_bottom_fenxiang" @tap="share_shang_detail">
										<!-- <view class="icon fenxiang"></view> -->
										<view style="font-size: 26rpx;!important">分享</view>
									</view>
									<!-- #endif -->
									
								<view class="share" :class="shareClass" @touchmove.stop.prevent="discard" @tap="hideShare">
									<view class="mask"></view>
									<view class="layer" @tap.stop="discard">
										<view class="h1">分享</view>
										<view class="list">
										</view>
										<view class="btn" @tap="hideShare">
											取消
										</view>
									</view>
								</view>
							</view>
						</view></view>
					</view>
			</view>

			<view v-show="curTabID === 3">
				<view   v-if="pinglun_detail == 1" class="content_pingjia"
					style="background-color: #eaeaea;padding-bottom: 30rpx;">
					<view class="content_pinglun_remen">热门评论</view>
					
					<view>
						<view v-for="(pinglun_item , index) in pinglun_list" :key="index">
							<view class="content_pinglun_head">
								<image :src="pinglun_item.headlogo"></image>
								<text style="margin-left: 20rpx; margin-top: 20rpx; position: absolute;font-weight: bold;">
									{{pinglun_item.username}}
								</text>
								<view class="content_pinglun_time">{{pinglun_item.createtime}}</view>
								<view class="content_pinglun_date">{{pinglun_item.text}}</view>
							</view>
							
						</view>
						<view style="background-color: #EAEAEA;height: 100rpx;"></view>
						<view class="bottom_guding">
							<button @click="pinglun" class="content_pinglun_but">发表评价</button>
						</view>
					</view>
					
					

				</view>
				<view v-else style="text-align : center;" >
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/empty_favorite.png" 
						mode="widthFix" 
						style="width: 300rpx;"></image>
					<view class="loading_tips" style="font-size: 30rpx;">
						当前章节暂无热评
					</view>
				</view>
			</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import abotshare from '../../components/abot_share_api/abot_share_api.vue';
	import abotsharejs from '../../common/abot_share_api.js';
	//import abot_share_vue from '../../components/product-list/product-list.vue';


	export default {
		components: {
			abotshare
		},
		data() {
			return {
				//商城的Logo、导航栏背景颜色和文字颜色
				wxa_shop_operation_logo_url:'',
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				
				curTabID: 1,
				zhangjie_list: [],
				pinglun_list: [],
				detail_list: {
					price01:0,
					price02:0,
					buyer_counter:0,
				},
				
				current_courseid: 0,
				zhangjie_describe: '',
				// app分享
				share_imageUrl: '',
				share_href: '',
				share_summary: '',
				share_titles: '',
				// isActive: false,  //设置按钮的初始显示，当布尔值为true时，对应的属性active生效，即隐藏
				// isActive1: true ,//同上
				moreClass: true,
				allPayment:true,
				payment_at_once:true,
				shareClass: '', //分享弹窗css类，控制开关动
				pinglun_detail:1
			}
			
		},
		onLoad: function(options) {
			var that = this;
			
			uni.setNavigationBarTitle({
				title: '课程详情',
			});

			this.current_courseid = options.courseid;
			if (!this.current_courseid) {
				this.current_courseid = 2;
			}

			that.detail_list = {};
			that.detail_list.price01 = 0;
			that.detail_list.price02 = 0;
			that.detail_list.buyer_counter = 0;
			console.log('dasdasasd',that.detail_list)
			
			that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);
			
			that._online_course_get_detail();
			
		},
		methods: {
			callback_function_shop_option_data: function(that, cb_params) {

				uni.showLoading({
					title: '正在加载中'
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 2000);
				
				
				//商城的Logo、导航栏背景颜色和文字颜色
				that.wxa_shop_operation_logo_url = cb_params.option_list.wxa_shop_operation_logo_url;
				that.wxa_shop_nav_bg_color = cb_params.option_list.wxa_shop_nav_bg_color;
				that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;

				

			},
			toPageIndex:function(){
				var shouye_url = '/pages/course/index';
				this.abotapi.call_h5browser_or_other_goto_url(shouye_url);
			},
			//跳转到我的
			toPagemy:function(){
				var my_url = '/pages/course/my';
				this.abotapi.call_h5browser_or_other_goto_url(my_url);
			},
			// callback_function:function(that, shop_option_data){
			// 	if(shop_option_data.option_list.wxa_shop_nav_bg_color){
			// 		that.wxa_shop_nav_bg_color = shop_option_data.option_list.wxa_shop_nav_bg_color; //头部导航的颜色
			// 	}
			// },

			gotolink() {
				//指定跳转地址
				this.abotapi.call_h5browser_or_other_goto_url('/pages/course/index');
			},
			_online_course_get_detail: function() {
				var that = this;
				var post_data = {
					sellerid: that.abotapi.globalData.default_sellerid,
					appid: that.abotapi.globalData.xiaochengxu_appid,
					courseid: this.current_courseid
				};
				var userInfo = that.abotapi.get_user_info();
				if (userInfo && userInfo.userid) {
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				}
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url +
						'/openapi/VideoListRemarkData/online_course_get_detail',
					method: 'post',
					data: post_data,
					success: function(res) {
						console.log('123456', res);
						if (res.data.code == 1) {

							that.zhangjie_list = res.data.data.step_list;
							that.pinglun_list = res.data.data.remark_list;
							that.detail_list = res.data.data;
			
							console.log('asdasdssssssssssssssssss', res.data)
							that.zhangjie_describe = res.data.data.describe;
							console.log('章节列表为==========>>>>:' ,that.pinglun_list)
							if(that.pinglun_list  == null){
								that.pinglun_detail = 0;
								console.log('1212111111111111',that.pinglun_detail);
							}

						
						
							// #ifdef MP-ALIPAY		

							const filter = that.$options.filters["formatRichText"];
							that.zhangjie_describe = filter(that.zhangjie_describe);

							//console.log('that.zhangjie_describe====>>>>', that.zhangjie_describe);

							let data001 = that.zhangjie_describe;
							let newArr = [];
							let arr = parseHtml(data001);
							arr.forEach((item, index) => {
								newArr.push(item);
							});

							that.zhangjie_describe = newArr;

							// #endif
							//APP分享
							if (that.icon_length > 0) {
								that.share_imageUrl = that.detail_list['icon'];
							}

							that.share_href = that.detail_list['url'];
							that.share_summary = that.detail_list['brief'];
							that.share_titles = that.detail_list['name'];
							// that.share_productid = that.detail_list['productid'];
							// that.share_userid = userInfo.userid;
							// that.share_sellerid = this.abotapi.get_sellerid();
							// that.share_abotap = require("../../common/abotapi.js");

						}

					}
				});
			},
			share_return: function() {
				var that = this;

				var share_title = that.goods_detail.name;

				console.log('8888999aaa', share_title);
				if (share_title.length > 22) {
					share_title = share_title.substr(0, 20) + '...';
				}

				var share_path = 'productid=' + that.productid + '&sellerid' + this.abotapi.get_sellerid();

				var userInfo = this.abotapi.get_user_info();

				if (userInfo && userInfo.userid) {
					share_path += '&parentid=' + userInfo.userid;
				}

				var share_img = that.goods_detail.pictures;

				console.log('8888999aaa', share_img);

				return {
					title: share_title + ' ￥' + that.goods_detail.price,
					query: share_path,
					imageUrl: share_img[0].picture,
				}
			},
			// 分享
			share() {
				uni.showToast({
					title: '请点击右上角分享'
				});
				return;
				this.shareClass = 'show';
			},
			hideShare() {
				this.shareClass = 'hide';
				setTimeout(() => {
					this.shareClass = 'none';
				}, 150);
			},

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
				abotsharejs.click_wxa_share(this.share_href, this.share_titles, this.share_summary, this
					.share_imageUrl);
			},

			click_wxa_circle_share: function() {
				abotsharejs.click_wxa_circle_share(this.share_href, this.share_titles, this.share_summary, this
					.share_imageUrl);
			},


			click_wxa_applet_share: function() {
				var path = 'pages/product/detail?' + this.options_str;
				var account = this.abotapi.globalData.xiaochengxu_account;
				abotsharejs.click_wxa_applet_share(this.share_href, this.share_titles, path, this.share_imageUrl,
					account);
			},

			//== 2020.10.13. 胡雨：将指定字符串复制到剪切板 ===
			click_wxa_command_copy: function() {
				var userid = 0;
				var sellerid = this.abotapi.globalData.default_sellerid;
				var cmd_type = 'product';

				var userInfo = this.abotapi.get_user_info();
				if (userInfo) {
					userid = userInfo.userid;
				}

				abotsharejs.click_wxa_command_copy(this.abotapi, cmd_type, this.goods_detail["productid"], userid,
					sellerid);

			},

			//================= End ================

			click_wxa_system_share: function() {

				abotsharejs.click_wxa_system_share(this.share_summary, this.share_href);
			},
			is_show: function() {
				this.$refs.share_api.is_show();
			},

			//设置百度小程序中的页面SEO信息
			__set_mp_baidu_seo_page_info: function() {

				var that = this;

				var share_title = that.goods_detail.name;

				console.log('__set_mp_baidu_seo_page_info title ===>>> ', share_title);

				if (share_title.length > 22) {
					share_title = share_title.substr(0, 20) + '...';
				}

				var share_path = 'productid=' + that.productid + '&sellerid' + this.abotapi.get_sellerid();

				var userInfo = this.abotapi.get_user_info();

				if (userInfo && userInfo.userid) {
					share_path += '&userid=' + userInfo.userid;
				}

				var share_img = that.goods_detail.pictures;

				console.log('__set_mp_baidu_seo_page_info share_img ===>>> ', share_img);

				console.log('当前时间：' + util.formatTime(new Date()) + ' ' + util.formatTime2(new Date()) + ':01');

				swan.setPageInfo({
					title: share_title + ' ￥' + that.goods_detail.price,
					keywords: share_title,
					description: that.goods_detail.brief,
					articleTitle: share_title,
					releaseDate: util.formatTime(new Date()) + ' ' + util.formatTime2(new Date()) + ':01',
					image: [share_img],
					video: [],
					visit: {},
					likes: '75',
					comments: '13',
					collects: '23',
					shares: '8',
					followers: '35',
					success: res => {
						console.log('setPageInfo success');
					},
					fail: err => {
						console.log('setPageInfo fail', err);
					}
				});
			},

			//立即支付
			toPay: function() {
				var that = this;
				// console.log(encodeURIComponent (that.detail_list.extraData));
				// console.log(encodeURIComponent (that.detail_list.name));
				// console.log(encodeURIComponent (that.detail_list.icon));
				
				var tiaozhuan_extraData = encodeURIComponent (that.detail_list.extraData);
				//var tiaozhuan_name = encodeURIComponent (that.detail_list.name);
				//var tiaozhuan_icon = encodeURIComponent (that.detail_list.icon);
				
				//var tiaozhuan_extraData = that.detail_list.extraData;
				var tiaozhuan_name = that.detail_list.name;
				var tiaozhuan_icon = that.detail_list.icon;
				
				
				var url = '/pages/order/pay?action=direct_buy&productid=';
				url += that.detail_list.productid+'&amount=1&all_price='+that.detail_list.price01;
				url += '&buyer_memo=购买在线课程&extraData='+tiaozhuan_extraData;
				url += '&product_name='+tiaozhuan_name;
				url += '&product_picture='+tiaozhuan_icon;
				
				this.abotapi.call_h5browser_or_other_goto_url(url);
				// console.log('122131321532564489785454154541545454',that.detail_list.extraData);	
			},
			//右方显示更多课程时跳转到课程列表/pages/course/index页面
			tiaozhuan_moreClass: function(){
				var that = this;
				this.abotapi.call_h5browser_or_other_goto_url('/pages/course/index');
				
			},
			


			//发表评论，弹窗提示
			pinglun: function() {
				uni.showModal({
					title: '友情提示',
					content: '请在具体的课程章节中发表评价。',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
	
			onShareAppMessage: function() {
				var that = this;

				var share_title = that.goods_detail.name;
				if (share_title.length > 22) {
					share_title = share_title.substr(0, 20) + '...';
				}

				var share_path = '/pages/product/detail?productid=' + that.productid + '&sellerid' + this.abotapi
					.get_sellerid();

				var userInfo = this.abotapi.get_user_info();

				if (userInfo && userInfo.userid) {
					share_path += '&parentid=' + userInfo.userid;
				}

				var share_img = that.share_imageUrl;

				return {
					title: share_title + ' ￥' + that.goods_detail.price,
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

			onShareTimeline: function() {
				return this.share_return();
			},
			onAddToFavorites: function() {
				return this.share_return();
			},

			quanquan_detail_tiaozhuan: function(videoid) {
				var that = this;
				var url = "/cms/quanquan/quanquan_details?videoid="+videoid;
				
				if(that.detail_list.is_user_can_buy != 1){
					
					//2023.12.8  增加用户观看记录

					var that = this;
					var post_data = {
						sellerid: that.abotapi.globalData.default_sellerid,
						videoid: videoid
					};
					var userInfo = that.abotapi.get_user_info();
					if (userInfo && userInfo.userid) {
						post_data.userid = userInfo.userid;
						post_data.checkstr = userInfo.checkstr;
					}

					that.abotapi.abotRequest({
						url: that.abotapi.globalData.yanyubao_server_url +
							'/openapi/VideoListRemarkData/view_course_log',
						method: 'post',
						data: post_data,
						success: function(res) {
							console.log(res)
						}
					})
					
					this.abotapi.call_h5browser_or_other_goto_url(url);
				}else{
					uni.showModal({
						title: '友情提示',
						content: '请先购买该章节',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							}else if (res.cancel) {
							console.log('用户点击取消');
							}
						}
					});
					
				}
				//else(detail_list.is_user_can_buy != 1){
					
				// },
				

			},
			myself_page_tiaozhuan:function(){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/course/my');
			},
			home_page_tiaozhuan:function(){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/course/index');
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
			formatRichText(html) { //控制小程序中图片大小

				let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi,
						'max-width:100%;');
					return match;
				});
				//newContent = newContent.replace(/<br[^>]*\/>/gi, '');

				newContent = newContent.replace(/<p[^>]*>/gi, '<p style="margin:10px;">');

				newContent = newContent.replace(/\<img/gi,
					'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;vertical-align: middle;"'
				);

				newContent = newContent.replace(/<h1[^>]*>/gi, '<h1 class="wxParse-h1">');
				newContent = newContent.replace(/<h2[^>]*>/gi, '<h2 class="wxParse-h2">');

				return newContent;
			}
		},


	}
</script>


<style lang="scss">
	@import './static/css/course_common.css';
	.content_top_text {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		background-color: rgba(25, 25, 25, 0.4);
		margin-top: -88rpx;
		position: absolute;
	}

	.content_top_lianxi {
		width: 140rpx;
		height: 60rpx;
		line-height: 60rpx;
		border: 1rpx solid rgba(213, 213, 213, 1);
		float: right;
		margin-right: 15rpx;
		margin-top: 8rpx;
		text-align: center;
		border-radius: 5rpx;
	}

	.content_title {
		width: 100%;
		background-color: rgba(234, 234, 234, 1.0);
		margin-top: -20rpx;
		padding-bottom: 50rpx;
	}

	.letterpress_theme {
		margin-left: 20rpx;
		margin-top: 40rpx;
		display: inline-block;
		font-size: 30rpx;
	}

	.letterpress_title {
		font-size: 26rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
		font-weight: 500;
	}

	.content_jiage {
		width: 40%;
		padding-left: 20rpx;
		padding-right: 30rpx;
		margin-top: 20rpx;
		float: left;
		
	}

	.letterpress_text {
		width: 20%;
		font-size: 20rpx;
		margin-top: 20rpx;
	}

	.nav_list {
		margin-top: 20rpx;
	}

	.nav_list_title {
		font-size: 30rpx;
	}

	.nav_content01 {
		background-color: #eaeaea;
		padding-bottom: 100rpx;
	}

	.cur {
		color: #4993dc;
		border-bottom: 1px solid #4993dc;
		height: 50rpx;
	}

	.content_bottom_icon {
		width: 20%;
		text-align: center;
		float: left;
	}

	.content_bottom_fenxiang {
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #FFC13C;
		float: right;
		text-align: center;
		font-size: 30rpx;
		color: #ffffff;
		border-top-left-radius:50upx;
		border-bottom-left-radius:50upx;
		

	}

	.content_bottom_zhifu {
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		background:#EF3920;
		float: right;
		text-align: center;
		font-size: 26rpx;
		color: #ffffff;
		border-top-right-radius:50upx;
		border-bottom-right-radius:50upx;
	}

	.content_zhangjie_vedio_one {
		background-color: #ffffff;
		padding-top: 30rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 60rpx;
		border-radius: 10rpx;
		margin-bottom: 10rpx;

	}
	.content_zhangjie_vedio{
		background-color: #eeeeee;
	}

	.content_vedio {
		width: 280rpx;
		height: 150rpx;
		margin-right: 20rpx;
		border: radius 10rpx;

	}

	.content_zhangjie_vedio_bottom {
		background-color: #eaeaea;
		border-radius: 10rpx;
		padding: 30rpx 20rpx 140rpx 20rpx;
	}

	.content_pinglun_remen {
		width: 100%;
		height: 80rpx;
		color: rgb(115, 115, 115);
		margin-left: 40rpx;
		padding-top: 40rpx;
	}
	.content_pinglun_head{
		background-color: #ffffff;
		padding: 20rpx 0;
		margin: 20rpx 20rpx;
		border-radius: 20upx;
	}

	.content_pinglun_head image {
		width: 80rpx;
		height: 80rpx;
		position: relative;
		margin-left: 10rpx;
	}

	.content_pinglun_date {
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 110rpx;
		padding-right: 20rpx;
	}

	.content_pinglun_but {
		background-color: #4b97e3;
		width: 70%;
		color: #fff;
		font-weight: bolder;
		font-size: 36rpx;
		
		
	}

	.card_detail_xiangqing {
		word-wrap: break-word;
		word-break: break-all;
		background-color: #FFFFFF;
		border-radius: 15rpx;
		padding: 15rpx;
		margin: 15rpx;
	}

	.footer {
		position: fixed;
		bottom: var(--window-bottom);

		width: 100%;
		
		// height: 200rpx;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		padding-bottom: 20rpx;
		border-top: 1px solid #a6a6a6;
		box-shadow: -6px 0px 6px 0px #ccc;
		
		.box{
			width: 200rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #FFC13C;
			float: right;
			text-align: center;
			font-size: 26rpx;
			color: #ffffff;
			// font-weight: bold;
			border-top-left-radius:50upx;
			border-bottom-left-radius:50upx;
		}
	}
	.content_bottom_goumai {
		// white-space: nowrap;
		// float: right;
		// display: inline-block;
		margin-top: 20rpx;
		margin-right: 20rpx;
		}

	.share {
		display: none;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.15s linear both;
			}

			.layer {
				animation: showLayer 0.15s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.15s linear both;
			}

			.layer {
				animation: hideLayer 0.15s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			background-color: rgba(0, 0, 0, .5);
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			z-index: 11;
		}

		.layer {
			width: 92%;
			position: fixed;
			z-index: 12;
			padding: 0 4%;
			top: 100%;
			background-color: rgba(255, 255, 255, 0.9);

			.list {
				width: 100%;
				display: flex;
				padding: 10upx 0 30upx 0;

				.box {
					width: 25%;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;

					image {
						width: 13.8vw;
						height: 13.8vw;
					}

					.title {
						margin-top: 10upx;
						display: flex;
						justify-content: center;
						width: 100%;
						font-size: 26upx;
					}
				}
			}

			.btn {
				width: 100%;
				height: 100upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28upx;
				border-top: solid 1upx #666666;
			}

			.h1 {
				width: 100%;
				height: 80upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 34upx;
			}

			.rich-text .img {
				max-width: 100%;
			}

		}
	}
	
	.active {
		display: none;  // 隐藏
	}
	.active1 {
		display: none;   //隐藏
	}
	
	.bottom_guding{
		position: fixed;
		bottom: var(--window-bottom);
		width: 100%;
		height: 100rpx;

		//margin-top: 20rpx;
	}
	.zhifu_jiage{
		font-size: 30rpx;
		padding-right: 20rpx;
		text-align: right;
		background-color: #ffffff;
		margin-top: 20rpx;
	}
	
	.content_pinglun_time{
		font-size: 20rpx;
		color: #a6a6a6;
		padding: 10rpx 110rpx;
		margin-top: -35rpx;
		
	}
</style>
