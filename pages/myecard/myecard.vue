<template style="padding: 0upx;margin: 0upx;">
	<view>
		<view :style="[{'background-image':'url('+ current_user_card_data.card_bg_img +')' }]" class="c">
			<view class="a">
				<image :src="current_user_card_data.card_logo" style="width: 100upx;height: 100upx;border-radius: 50%;overflow: hidden;"></image>
				<view style="margin-left:30rpx;line-height: 50rpx;">
					<view>{{current_user_card_data.card_name}}</view>
					<view>{{current_user_card_data.card_desc}}</view>
				</view>
			</view>
			<view style="text-align: right;padding-right: 57px;color: #000000;margin-top:165upx;padding-right: 170upx;">
				<b>{{current_user_card_data.card_no}}</b>
			</view>
		</view>

		<view style="text-align: center;">
			<view class="mid-tips" style="border-right: 1rpx solid #c5c5c5;">
				<view class="mid-level">会员等级</view>
				<view>{{current_user_card_data.level_name}}</view>
			</view>

			<view class="mid-tips" style="border-right: 1rpx solid #c5c5c5;">
				<view class="mid-level">卡内余额</view>
				<view>{{current_user_card_data.balance}}</view>
			</view>

			<view class="mid-tips" style="border-right: 1rpx solid #c5c5c5;">
				<view class="mid-level">可用积分</view>
				<view>{{current_user_card_data.member_score}}</view>
			</view>

			<view class="mid-tips">
				<view class="mid-level">优惠券</view>
				<view>{{current_user_card_data.youhui_count}}</view>
			</view>

		</view>



		<!--右下角  我要付款 -->
		<view class="mid-bdmw" style="display:none;">
			<image src="https://yanyubao.tseo.cn/Tpl/static/ecard_module/icon/fukuan.svg"></image>
		</view>







		<!--商户头条start-->
		<view class="toutiao" v-if="ecard_option_list.ecard_show_toutiao && (ecard_option_list.ecard_show_toutiao == 1)">

			<view class="toutiao_left" @tap="touTiaoList">
				<image :src="ecard_option_list.ecard_shop_toutiao_icon"></image>
			</view>

			<block v-if="ecard_option_list.ecard_shop_toutiao_flash_line == 1">
				<swiper class="toutiao_right" vertical="true" autoplay="true" circular="true" interval="2000" v-if="!ecard_shop_toutiao_flash_line||ecard_shop_toutiao_flash_line!=2">
					<swiper-item v-for="(item,index) in articlelist">
						<view class="toutiao_right" @tap="touTiaoList" :data-id="toutiao_item_id">
							<text>{{articlelist.title}}</text>
						</view>
					</swiper-item>
				</swiper>
			</block>

			<block v-if="ecard_option_list.ecard_shop_toutiao_flash_line==2">
				<swiper class="toutiao_right2" vertical="true" autoplay="true" circular="true" interval="2000">
					<swiper-item v-for="(item,index) in articlelist2" @tap="touTiaoList">
						<view>• {{item[0].title}}</view>
						<view>• {{item[1].title}}</view>
					</swiper-item>
				</swiper>
			</block>

		</view>
		<!--商户头条end-->

		<!-- 九宫格图标 begin -->
		<view class='icon-box'>
			<navigator url="pages/help/help" open-type="navigate" v-if="ecard_option_list.ecard_nav_show_toutiao == 1">
				<view class='icon-list'>
					<image src='https://yanyubao.tseo.cn/Tpl/static/ecard_module/icon/zixun.svg'></image>
					<view class='icon-text'><text>最新资讯</text></view>
				</view>
			</navigator>


			<navigator url="../payment/payment" open-type="navigate" v-if="ecard_option_list.ecard_nav_show_maidan == 1">
				<view class='icon-list'>
					<image src='https://yanyubao.tseo.cn/Tpl/static/ecard_module/icon/fukuan.svg'></image>
					<view class='icon-text'><text>余额付款</text></view>
				</view>
			</navigator>



			<navigator url="pages/balance_log/balance_log" open-type="navigate" v-if="ecard_option_list.ecard_nav_show_balance_log == 1">
				<view class='icon-list'>
					<image src='https://yanyubao.tseo.cn/Tpl/static/ecard_module/icon/yue.svg'></image>
					<view class='icon-text'><text>余额明细</text></view>
				</view>
			</navigator>

			<navigator url="pages/score/score" open-type="navigate" v-if="ecard_option_list.ecard_nav_show_score_log == 1">
				<view class='icon-list'>
					<image src='https://yanyubao.tseo.cn/Tpl/static/ecard_module/icon/jifen.svg'></image>
					<view class='icon-text'><text>积分记录</text></view>
				</view>
			</navigator>

			<navigator url="pages/mycoupons/mycoupons" open-type="navigate" v-if="ecard_option_list.ecard_nav_show_youhui_list == 1">
				<view class='icon-list'>
					<image src='https://yanyubao.tseo.cn/Tpl/static/ecard_module/icon/youhuiquan.svg'></image>
					<view class='icon-text'><text>优惠列表</text></view>
				</view>
			</navigator>

			<navigator url="pages/coupons/coupons" open-type="navigate" v-if="ecard_option_list.ecard_nav_show_youhui_new == 1">
				<view class='icon-list'>
					<image src='https://yanyubao.tseo.cn/Tpl/static/ecard_module/icon/youhui.svg'></image>
					<view class='icon-text'><text>最新优惠</text></view>
				</view>
			</navigator>

			<navigator url="../score_shop/score_shop" open-type="navigate" v-if="ecard_option_list.ecard_nav_show_score_shop == 1">
				<view class='icon-list'>
					<image src='https://yanyubao.tseo.cn/Tpl/static/ecard_module/icon/shangcheng.svg'></image>
					<view class='icon-text'><text>积分商城</text></view>
				</view>
			</navigator>
			<navigator url="../biz_card/biz_card" open-type="navigate" v-if="ecard_option_list.ecard_nav_show_biz_card == 1">
				<view class='icon-list'>
					<image src='https://yanyubao.tseo.cn/Tpl/static/ecard_module/icon/mingpian.svg'></image>
					<view class='icon-text'><text>电子名片</text></view>
				</view>
			</navigator>

			<navigator url="../userinfo/userinfo" open-type="navigate" v-if="ecard_option_list.ecard_nav_show_profile == 1">
				<view class='icon-list'>
					<image src='https://yanyubao.tseo.cn/Tpl/static/ecard_module/icon/shezhi.svg'></image>
					<view class='icon-text'><text>个人资料</text></view>
				</view>
			</navigator>

			<navigator url="../about/about" open-type="navigate" v-if="ecard_option_list.ecard_nav_show_aboutus == 1">
				<view class='icon-list'>
					<image src='https://yanyubao.tseo.cn/Tpl/static/ecard_module/icon/guanyuwomen.svg'></image>
					<view class='icon-text'><text>关于我们</text></view>
				</view>
			</navigator>


		</view>

		<view class='icon-box'>




			<view class='icon-list' v-if="ecard_option_list.ecard_show_kefu_button==1">
				<view v-if="ecard_option_list.ecard_kefu_button_type == 1" @tap="shangPhoneClick2">
					<image src='https://yanyubao.tseo.cn/Tpl/static/ecard_module/icon/icon-6.png'></image>
					<view class='icon-text'><text>联系客服</text></view>
				</view>
				<view v-elif="ecard_option_list.ecard_kefu_button_type == 2" @tap="goToOtherPage">
					<image src='https://yanyubao.tseo.cn/Tpl/static/ecard_module/icon/icon-6.png'></image>
					<view class='icon-text'><text>联系客服</text></view>
				</view>
				<view v-elif="ecard_option_list.ecard_kefu_button_type == 3">
					<button class="u-go-home2" openType="contact" :style="{'background-color':unia_kefu_bg_color}">
						<image src='https://yanyubao.tseo.cn/Tpl/static/ecard_module/icon/icon-6.png'></image>
						<view class='icon-text'><text>联系客服</text></view>
					</button>
				</view>
			</view>
		</view>

		<!-- 九宫格图标 end -->

		<div style="clear:both;display:block; height:30rpx;">

		</div>


		<!-- 商户风采图片 begin -->
		<view class="supplier-image-list" v-if="shanghu_img_list && ecard_option_list.ecard_show_index_icon == 1">
			<!-- <view class="supplier-border"></view> -->
			<image :src='item' class="supplier-img" mode="widthFix" v-for="(item, index) in shanghu_img_list" :key="index"></image>
		</view>
		<!-- 商户风采图片 end -->



		<!-- 新增插件 begin -->
		<view :class="plugin_list">
			<block v-for="(item,index) in plugin_data_list" key="item.id">
				<navigator :url="item.url" open-type="navigate" v-if="item.type == 'url'">
					<view class="weui_cell">
						<view class="weui_cell_bd">
							<view class="weui_cell_bd_p" :style="item.title_style">{{item.title}}</view>
						</view>

						<view class="with_arrow"></view>
					</view>
				</navigator>

				<view v-elif="item.type == 'tel'" class="weui_cell" @tap="callTel" :data-tel="item.tel">
					<view class="weui_cell_bd">
						<view class="weui_cell_bd_p" :style="item.title_style"> {{item.title}} </view>
					</view>

					<view class="with_arrow"></view>
				</view>

				<view v-elif="item.type == 'miniprog'" class="weui_cell" @tap="toOther" :data-envVersion="item.envVersion"
				 :data-appid="item.appId" :data-path="item.path">
					<view class="weui_cell_bd">
						<view class="weui_cell_bd_p" :style="item.title_style"> {{item.title}} </view>
					</view>

					<view class="with_arrow"></view>
				</view>

			</block>

		</view>
		<!-- 新增插件 end -->



		<view class="info_list">
			<!--
		  <navigator url="../payment/payment" open-type="navigate">
			<view class="weui_cell">
			  <view class="weui_cell_bd">
				<view class="weui_cell_bd_p"> 付款和申请积分</view>
			  </view>
			  <view class="badge" style="background: #FFA500;"></view>
			  <view class="with_arrow"></view>
			</view>
		  </navigator>
		  -->
			<navigator url="../balance_log/balance_log" open-type="navigate">
				<view class="weui_cell">
					<view class="weui_cell_bd">
						<view class="weui_cell_bd_p"> 余额明细 </view>
					</view>
					<view class="badge">{{score_log_count}}</view>
					<view class="with_arrow"></view>
				</view>
			</navigator>
			<!--
			<navigator url="../score_shop/score_shop" open-type="navigate">
			<view class="weui_cell">
			  <view class="weui_cell_bd">
				<view class="weui_cell_bd_p"> 积分商城 </view>
			  </view>
			  <view></view>
			  <view class="with_arrow"></view>
			</view>
		  </navigator>
		-->
			<navigator url="../score/score" open-type="navigate">
				<view class="weui_cell">
					<view class="weui_cell_bd">
						<view class="weui_cell_bd_p"> 积分记录 </view>
					</view>
					<view class="badge">{{score_log_count}}</view>
					<view class="with_arrow"></view>
				</view>
			</navigator>
			<navigator url="../mycoupons/mycoupons" open-type="navigate">
				<view class="weui_cell">
					<view class="weui_cell_bd">
						<view class="weui_cell_bd_p"> 我的优惠 </view>
					</view>
					<view class="badge">{{youhui_count}}</view>
					<view class="with_arrow"></view>
				</view>
			</navigator>
			<navigator url="../coupons/coupons" open-type="navigate">
				<view class="weui_cell">
					<view class="weui_cell_bd">
						<view class="weui_cell_bd_p"> 领优惠券 </view>
					</view>
					<view class="badge">{{youhui_new_count}}</view>
					<view class="with_arrow"></view>
				</view>
			</navigator>
			<!--<navigator url="">
					<view class="weui_cell">               
						<view class="weui_cell_bd">
							<view class="weui_cell_bd_p"> 我的红包 </view>
						</view>
						<view  class="badge">{{hongbao_count}}</view>
						<view class="with_arrow"></view>
					</view>
				</navigator>

		  <navigator url="../about/about" open-type="navigate">
			<view class="weui_cell">
			  <view class="weui_cell_bd">
				<view class="weui_cell_bd_p"> 关于我们 </view>
			  </view>
			  <view class="with_arrow"></view>
			</view>
		  </navigator>
		-->
		</view>

		<view class="info_list">
			<navigator v-if="ecard_option_list.ecard_show_index_swiper == 1" url="../mycard/mycard" open-type="navigate">
				<view class="weui_cell">
					<view class="weui_cell_bd">
						<view class="weui_cell_bd_p"> 会员卡列表 </view>
					</view>

					<view class="with_arrow"></view>
				</view>
			</navigator>

			<navigator url="../about_applet/about_applet" open-type="navigate">
				<view class="weui_cell">
					<view class="weui_cell_bd">
						<view class="weui_cell_bd_p"> 关于小程序 </view>
					</view>

					<view class="with_arrow"></view>
				</view>
			</navigator>



		</view>

		<view style='font-size:15px; margin:10px;position:relative;' @tap='shangPhoneClick' v-if="ecard_option_list.ecard_show_index_phone == 1">
			<image src="https://yanyubao.tseo.cn/Tpl/static/ecard_module/mobile.png" style="width:30px;height:30px;margin-left:-5px;"></image>
			<view style='position:absolute;top:5px;left:35px;'>{{current_user_card_data.shang_telephone}}</view>
		</view>

		<view style='font-size:15px; margin:10px;position:relative;' v-if="ecard_option_list.ecard_show_index_address == 1">
			<image src="https://yanyubao.tseo.cn/Tpl/static/ecard_module/icon/ecard_module_iconfont-shouhuodizhi.png" style="width:25px;height:25px;"></image>

			<view style='position:absolute;top:-5px;left:35px; font-size:13px;' @tap="openLocation">{{current_user_card_data.shang_address}}</view>
		</view>


		<view style='font-size:15px; margin:10px;position:relative;' v-if="ecard_option_list.ecard_show_copyright_text == 1">

			<view style='position:absolute;top:10px;text-align: center;width: 100%;color: #666;'>Copyright ©
				{{ecard_option_list.ecard_copyright_text}}</view>
		</view>


		<view :class="changefootnav" @tap="payMoney">
			<!-- :style="{'border': solid 2rpx ecard_option_list.ecard_shop_nav_bg_color;'background-color':ecard_option_list.ecard_shop_nav_bg_color;}" -->
			<!-- <image src="../../images/fk.png" style="width:100%;height:100%;"></image> -->
			<image v-if="ecard_option_list.ecard_shop_nav_font_color == '#000000'" src="https://yanyubao.tseo.cn/Tpl/static/ecard_module/icon/fukuan3.svg"
			 style="width:50px;height:50px;margin: 5px;" />
			<image src="https://yanyubao.tseo.cn/Tpl/static/ecard_module/icon/fukuan2.svg" style="width:50px;height:50px;margin: 5px;" />

		</view>


		<view style="display:block; height:50rpx;">
		</view>











	</view>
</template>

<script>
	export default {
		data() {
			return {
				current_user_card_data: [],
				ecard_option_list: [],
				
				articlelist:'',
				articlelist2:'',
				
				toutiao_item_id: '',
				mode: 'aspectFit',
				userInfo: {},
				headlineItem: '电子会员卡',
				hidden: true,
				nocancel: false,
				changefootnav: 'footnav',
				plugin_list: '',
				shanghu_img_list: '',
				plugin_data_list: '',
				score_log_count: '',
				youhui_count: '',
				youhui_new_count: '',
			}
		},
		onLoad(options) {
			//uni.setNavigationBarTitle({
			//	title: this.abotapi.globalData.shop_name
			//})
			
			var that = this

			//console.log(encodeURIComponent('https://yanyubao.tseo.cn/unia/?sellerid=pQNNmSkaq'));
			//console.log(decodeURIComponent(encodeURIComponent('https://yanyubao.tseo.cn/unia/?sellerid=pQNNmSkaq')));return;

			//请求服务器,刷新卡券信息
			console.log('网页参数如下:');
			console.log(options); //console.log(options.sellerid);

			var q = options.q;
			var sellerid = null;

			//q = 'https%3A%2F%2Fyanyubao.tseo.cn%2Funia%2F%3Fsellerid%3DpXzizSkVa';

			//console.log(typeof(q));
			if (typeof(q) != 'undefined') {
				console.log('获取到带参二维码参数q：' + q);
				q = decodeURIComponent(q);
				console.log('decodeURI转码后的q：' + q);

				sellerid = q.replace('https://yanyubao.tseo.cn/unia/?sellerid=', '');
				if (sellerid.length > 20) {
					sellerid = sellerid.replace('https%3A%2F%2Fyanyubao.tseo.cn%2Funia%2F%3Fsellerid%3D', '');
				}

				console.log('从q参数得到的sellerid：' + sellerid);

			}

			console.log('sellerid 01：' + sellerid);
			//if (!sellerid && typeof (sellerid) != "undefined" && sellerid != 0){
			if (!sellerid) {
				sellerid = options.sellerid;
				console.log('sellerid 02：' + sellerid);

			}

			if (!sellerid) {
				sellerid = options.scene;
				console.log('sellerid 03：' + sellerid);

			}

			if (!sellerid) {
				sellerid = this.abotapi.get_sellerid();
				console.log('sellerid 04：' + sellerid);
			}

			console.log('sellerid 05：' + sellerid);

			if (!sellerid) {
				console.log('!!!!!!缺少商户ID，使用默认的' + this.abotapi.globalData.default_sellerid);
				/*uni.navigateTo({
				  url: '../index/index?q=' + encodeURIComponent('https://yanyubao.tseo.cn/unia/?sellerid=' + app.globalData.default_sellerid)
				});
				return;*/

				sellerid = this.abotapi.globalData.default_sellerid;

			}


			this.abotapi.globalData.sellerid = sellerid
			this.abotapi.set_sellerid(sellerid);
			
			console.log('当前sellerid:' + sellerid + "，来自请求" + q);





			this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);


			//调用应用实例的方法获取全局数据
			console.log("index:onLoad:this.abotapi.getUserInfo:");

			var userInfo = this.abotapi.get_user_info();

			console.log(userInfo);
			console.log(83838383)
			//更新数据

			that.userInfo = userInfo;



			//检查用户是否绑手机号码 
			if ((!userInfo) || (!userInfo.userid) || (userInfo.userid == 0)) {

				that.hidden = false;

			}

			if (!userInfo) {
				userInfo = new Object();
				userInfo.uwid = 0;
				userInfo.userid = 0;
				userInfo.checkstr = '';

			}



		},


		//下拉刷新 清空数据,重新请求一次数据
		onPullDownRefresh: function() {
			var that = this;

			var options = new Object();
			//options.q = null;
			//options.sellerid = null;

			uni.removeStorage({
				key: 'option_list_str',
				success: function(res) {},
			})

			that.onLoad(options);
			uni.stopPullDownRefresh()
		},
		onShareAppMessage: function() {
			var that = this;
			return {
				title: that.data.card_name,
				desc: '欢迎您的访问!',
				path: 'pages/index/index?usersn=' + that.data.usersn,
			}
		},


		//调用接口
		methods: {

			callback_function_shop_option_data: function(that, option_data) {
				console.log('option_data========', option_data);

				that.abotapi.getColor();

				//=====更新商户头条=================
				that.initArticleList();
				//========End====================


				console.log("准备获取uwid[" + this.abotapi.globalData.userInfo.uwid + "]的商户[" + this.abotapi.globalData.sellerid +
					"]会员卡信息");






				
				
				var last_url = 'redirectTo /pages/myecard/myecard';
				
				var userInfo = this.abotapi.get_user_info();
				if (!userInfo) {
				  this.abotapi.goto_user_login(last_url);
							
				  return;
				}
				
				
				uni.showLoading({
					title: '数据加载中……',
				});
                
				
				var url = this.abotapi.globalData.yanyubao_server_url + '/index.php?g=Yanyubao&m=Xiaochengxu&a=get_user_card';
				var data = {
					sellerid: this.abotapi.get_sellerid(),
					checkstr: userInfo.checkstr,
					uwid: userInfo.uwid,
					userid: userInfo.userid,
					//data_unia_str: encodeURI(JSON.stringify(app.globalData.userInfo))  //用于更新服务器端用户的头像和昵称
				};

				var cbSuccess = function(res) {
					uni.hideLoading();

					console.log('8888888888888888', res);

					if (res.data.code == -1) {
						uni.showModal({
							title:'失败',
							content:'请求数据失败！',
						});
						
						return;
					}
					
					
					
					console.log(22222222222222222222);
					console.log(res.data);
					
					that.current_user_card_data = res.data.data;
					
					if (that.current_user_card_data.shang_plugin_list) {
					
					
						that.plugin_list = 'plugin_list';
						that.plugin_data_list = that.current_user_card_data.shang_plugin_list;
					
					}
					
					uni.setNavigationBarTitle({
						title: that.current_user_card_data.shang_name //页面标题为服务器返回数据
					})
					
					uni.setStorage({
						key: "supplierInfo",
						data: that.current_user_card_data
					})
					
					that.abotapi.globalData.userInfo.usersn = that.current_user_card_data.usersn;
					
					console.log('获取会员卡信息成功：');
					console.log(that.abotapi.globalData.userInfo);
					
					
					

				};
				var cbError = function(res) {
					uni.hideLoading();
				};
				this.abotapi.httpPost(url, data, cbSuccess, cbError);
				//===========End============


				this.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + 'Yanyubao/Xiaochengxu/get_ecard_option_list',
					method: 'POST', //请求方式
					data: {
						//sellerid : that.abotapi.get_sellerid()
						sellerid: 'pQNNmSkaq'
					},
					success(res) {
						console.log("aaaaaaa==============>>>>>", res)
						
						if(res.data.code == 1){
							console.log("aaaaaaa==222222222222============>>>>>", res.data.code)

							that.ecard_option_list = res.data.data;
							
							
							if (!that.ecard_option_list.ecard_shop_nav_bg_color) {
								that.ecard_option_list.ecard_shop_nav_bg_color = '#2d96ff';
							}
							if (!that.ecard_option_list.ecard_shop_nav_font_color) {
								that.ecard_option_list.ecard_shop_nav_font_color = '#ffffff';
							}
							
							
						}
						
					},
					fail(error) {
						console.log("bbbbbbbbbbbb", error)
					}
				});
				
				
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + 'index.php?g=Yanyubao&m=Xiaochengxu&a=about_supplier',
					data: {
						sellerid: that.abotapi.get_sellerid(),
						checkstr: userInfo.checkstr,
						uwid: userInfo.uwid,
						userid: userInfo.userid
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method: "POST",
					success: function(res) {
						uni.hideLoading();
				
				
						console.log(res.data);
						// that.setData({
						//   supplier_info: res.data.data,
						//   currentTab: 0
						// });
				
						if (res.data.data && res.data.data.shanghu_image_list) {
				
							that.shanghu_img_list = res.data.data.shanghu_image_list;
				
						}
					}
				});


			},

			clearStorge: function() {
				uni.clearStorageSync();
				console.log('清空完成，sellerid：' + this.abotapi.get_sellerid());
			},
			openLocation: function() {

				//var value = e.detail.value
				uni.openLocation({
					longitude: Number(this.data.longitude),
					latitude: Number(this.data.latitude)
				})
			},


			
			//商户头条
			initArticleList:function(){
				var that = this;
				this.abotapi.abotRequest({
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
						console.log('res1',res);
						that.abotapi.set_current_weiduke_token(res.data.token);
						if(res.data.code == 1){
								that.articlelist = res.data.data;
							console.log('articlelist',that.articlelist);
						}
						
						
						if (that.ecard_option_list.ecard_shop_toutiao_flash_line == 2) {
							var data = res.data.data;
							var articlelist2 = [];
							for (var i = 0, length = data.length -1; i < (length / 2); i++) {
								var arr = [data[0], data[1]];
								articlelist2.push(arr);
								data.shift()
								data.shift()
							}
						
							that.articlelist2 =  articlelist2;
							console.log('that.articlelist2',that.articlelist2);
						}
					},
					fail:function(res){
						console.log('res2',res);
					},
				});
				
			},
			


			shangPhoneClick: function() {
				var that = this;
				var telephone = that.current_user_card_data.shang_telephone;
				uni.makePhoneCall({
					phoneNumber: telephone
				})
			},

			shangPhoneClick2: function() {
				var that = this;
				var telephone = that.data.ecard_option_list.ecard_kefu_mobile_num;
				uni.makePhoneCall({
					phoneNumber: telephone
				})
			},

			//跳转h5
			goToOtherPage: function() {
				var url = this.data.ecard_option_list.ecard_kefu_form_url
				uni.navigateTo({
					url: '../h5browser/h5browser?url=' + encodeURIComponent(url),
				});
				return;
			},



			callTel: function(e) {
				uni.makePhoneCall({
					phoneNumber: e.currentTarget.dataset.tel
				})
			},
			toOther: function(e) {
				var appid = e.currentTarget.dataset.appid;
				var path = e.currentTarget.dataset.path;
				var envVersion = e.currentTarget.dataset.envVersion;
				uni.navigateToMiniProgram({
					appId: appid,
					path: '',
					extraData: {
						foo: 'bar'
					},
					envVersion: envVersion,
					success(res) {
						console.log('打开成功');
					}
				})
			},


			touTiaoList: function(e) {
				console.log('点击商户头条进入列表');
				uni.navigateTo({
					url: '../help/help?sellerid=' + this.abotapi.globalData.sellerid

				})
			},


			touTiaoItem: function(e) {
				console.log('点击商户头条进入该详情' + e.currentTarget.dataset.id);

				var id = e.currentTarget.dataset.id;
				uni.navigateTo({
					url: '../help_detail/help_detail?id=' + id + '&sellerid=' + this.abotapi.globalData.sellerid

				})
			},

		},


	}
</script>

<style>
	.a {
		display: flex;
		align-items: center;
		color: #007AFF;
		margin-left: 20upx;
		margin-top: 50upx;
	}

	.c {
		margin-top: 25rpx;
		margin-left: 5%;
		width: 90%;
		height: 400upx;
		border-top: 1px solid #fff;
		background-size: 100% 100%;
		border-radius: 25upx;
	}

	.mid-tips {
		margin-top: 20rpx;
		display: inline-block;
		width: 23%;
		text-align: center;
		overflow: hidden;
		line-height: 50rpx;
	}

	.mid-level {
		font-size: 24rpx;
		color: #808080;
	}

	.mid-imgs image {
		width: 200rpx;
		height: 200rpx;
	}

	.mid-imgs {
		text-align: center;
		display: inline-block;
		width: 25%;
	}

	.mid-bdmw {
		border-radius: 50%;
		position: fixed;
		/*固定位置*/
		z-index: 99;
		/*设置优先级显示，保证不会被覆盖*/
		right: 20rpx;
		bottom: 100rpx;
		width: 130rpx;
		height: 130rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.mid-bdmw image {
		width: 100rpx;
		height: 100rpx;
	} 
    .toutiao{
      width:100%;
      height:50px;
      margin:10px auto;
      background-color: #fff;
      clear: both;
    }
	.toutiao_left{
	  width:15%;
	  height:50px;
	  float:left;
	}
	
	.toutiao_left image{
	  width:80%;
	  height:100%;
	  float:left;
	}
	
	.toutiao_right{
	  width:85%;
	  height:50px;
	  float:left;
	  font-size:16px;
	  line-height:50px;
	  color:#666666;
	  overflow: hidden;
	  white-space: nowrap;
	  text-overflow: ellipsis;
	}
	
	.toutiao_right2{
	  width:85%;
	  height:50px;
	  float:left;
	  font-size:13px;
	  line-height:50rpx;
	  color:black;
	  overflow: hidden;
	  letter-spacing: 3rpx;
	  text-overflow: ellipsis;
	}
	.icon-list{
		float: left;
		width: 20%;
		line-height: 40rpx;
		text-align: center;
	}
	.icon-list image{
		width: 100rpx;
		height: 100rpx;
		
	}
	.supplier-img{
		width: 100%;
	}
</style>


<!-- <template>
	<view>
		<view class="myecard">
			<view class="card-n">
				<image src="../../static/img/alipay.png"></image>
				<view class="vip">
					延誉宝VIP
				</view>
			</view>
			
			<view class="number">
				<b>12346548465465416316</b>
			</view>
			
			
		</view>
		
		<view>
			<image src="../../static/img/alipay.png"></image>
			<view>123456</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.myecard{
		width: 90%;
		height: 400upx;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		background-image: url(../../static/img/card.png);
		background-repeat:no-repeat;
		border-radius: 30upx;
		margin:auto;
	}
      image{
		width: 100upx;
		height: 100upx;
		border-radius: inherit;
		display: inline-block;
		margin-left:10upx;
		position: relative;
	}
	.card-n{
		margin-top: 100upx;
		display: inline-block;
	}
    .vip{
		color:#FFFFFF;
		font-size: 30upx;
		display: inline-block;
		position: absolute;
	}
    .number{
		color: #000000;
		display: inline-block;
		margin-left: 200upx;
	}
</style>
 -->
