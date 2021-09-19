<template style="padding: 0rpx;margin: 0rpx; display:block;">
	<view :style="[{'background-image':'url('+ bg_img.page_bg_img_body +')' }]" >
		
		<view v-if=" ecard_data_type == 'ecard'">
			<image class="head_c" :src="head_img"></image>
			
			<view :style="[{'background-image':'url('+ current_user_card_data.card_bg_img +')' }]" class="c">
				<view class="a">
					<image :src="current_user_card_data.card_logo" style="width: 100rpx;height: 100rpx;border-radius: 50%;overflow: hidden;"></image>
					<view style="margin-left:30rpx;line-height: 50rpx;">
						<view :style="{color:current_user_card_data.card_name_color}" >{{current_user_card_data.card_name}}</view>
						<view :style="{color:current_user_card_data.card_desc_color}">{{current_user_card_data.card_desc}}</view>
					</view>
				</view>
				<view class="card_no_text">
					<b :style="{color:current_user_card_data.card_no_color}">{{current_user_card_data.card_no}}</b>
				</view>
			</view>
		</view>
		
		<view v-else-if="ecard_data_type == 'super_vip_card'">
			<image class="head_c" :src="head_img"></image>
			
			<view :style="[{'background-image':'url('+ huiyuan_detail_info.huiyuan_detail_setting.card_bg_img +')' }]" class="c">
				<view class="a">
					<image :src="huiyuan_detail_info.huiyuan_detail_setting.card_touxiang" style="width: 100rpx;height: 100rpx;border-radius: 50%;overflow: hidden;"></image>
					<view style="margin-left:30rpx;line-height: 50rpx;">
						<view>{{huiyuan_detail_info.huiyuan_detail_setting.card_name}}</view>
						<view>{{huiyuan_detail_info.huiyuan_info.cardno}}</view>
					</view>
				</view>
				<view style="text-align: right;padding-right: 57px;color: #000000;margin-top:165rpx;padding-right: 170rpx;">
					<b>{{huiyuan_detail_info.mobile}}</b>
				</view>
			</view>
		</view>

		<view v-if="ecard_data_type == 'ecard'"
			style="text-align: center;margin-top:100rpx;background-color: #FFFFFF;margin-bottom: 10rpx;">
			<view class="mid-tips" style="border-right: 1rpx solid #c5c5c5;">
				<view class="mid-level">会员等级</view>
				<view class="mid-value">{{current_user_card_data.level_name}}</view>
			</view>

			<view class="mid-tips" style="border-right: 1rpx solid #c5c5c5;">
				<view class="mid-level">卡内余额</view>
				<view class="mid-value">{{current_user_card_data.balance}}</view>
			</view>

			<view class="mid-tips" style="border-right: 1rpx solid #c5c5c5;">
				<view class="mid-level">可用积分</view>
				<view class="mid-value">{{current_user_card_data.member_score}}</view>
			</view>

			<view class="mid-tips">
				<view class="mid-level">优惠券</view>
				<view class="mid-value">{{current_user_card_data.youhui_count}}</view>
			</view>

		</view>
		<view v-else-if="ecard_data_type == 'super_vip_card'">
			<view class="super_vip_balance">
				<view class="balacne_detail_count">
					<view class="ddddd">卡内余额：</view>
					<view style="">{{huiyuan_detail_info.huiyuan_info.balance}}</view>
				</view>
				<view class="go_balance_detail"  @tap="check_balance_log()">
						查看明细
				</view>
				
			</view>
		</view>
		
		<!-- <view v-else-if="ecard_data_type == 'super_vip_card43534535'">
			
		</view>
		<view v-else>
			
		</view> -->
		



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
					<swiper-item v-for="(item,index) in articlelist" :key="index">
						<view class="toutiao_right" @tap="touTiaoList" :data-id="toutiao_item_id">
							<text>{{articlelist.title}}</text>
						</view>
					</swiper-item>
				</swiper>
			</block>

			<block v-if="ecard_option_list.ecard_shop_toutiao_flash_line==2">
				<swiper class="toutiao_right2" vertical="true" autoplay="true" circular="true" interval="2000">
					<swiper-item v-for="(item,index) in articlelist2" :key="index" @tap="touTiaoList">
						<view>• {{item[0].title}}</view>
						<view>• {{item[1].title}}</view>
					</swiper-item>
				</swiper>
			</block>

		</view>
		<!--商户头条end-->

		<!-- 九宫格图标 begin -->
		<view class="icon-box-con">
			<view class='icon-box' v-for="(item,index) in list_first" :key="index" 
				@tap="goto_user_function(item.url)">
					<view class='icon-list'>
						<image mode="widthFix" :src='item.src'></image>
						<view class='icon-text'><text>{{item.name}}</text></view>
					</view>
				
			</view>
		</view>
		<!-- 九宫格图标 end -->

		<!-- 商户风采图片 begin -->
		<view class="supplier-image-list" v-if="shanghu_img_list && ecard_option_list.ecard_show_index_icon == 1">
			<!-- <view class="supplier-border"></view> -->
			<image :src='item' class="supplier-img" mode="widthFix" v-for="(item, index) in shanghu_img_list" :key="index"></image>
		</view>
		<!-- 商户风采图片 end -->



		<!-- 新增插件 begin -->
		<view class="mobile_msg">
		
		<view class="info_list" v-for="(item,index) in list_two" :key="index"
			@tap="goto_user_function(item.url)">		
			
				<view class="weui_cell">
					<view class="weui_cell_bd">
						<image :src="item.src"></image>
						<view class="weui_cell_bd_p">{{item.name}}</view>
					</view>
				</view>
			
			
		</view>
		

		
		
		

		
		
		
		</view>
		
		<view class="weizhi_msg">
			<view style='font-size:15px;position:relative;margin:10px;' @tap='shangPhoneClick' v-if="ecard_option_list.ecard_show_index_phone == 1">
				<image src="https://yanyubao.tseo.cn/Tpl/static/ecard_module/mobile.png" style="width:30px;height:30px;margin-left:-5px;"></image>
				<view style='position:absolute;top:5px;left:35px;'>{{current_user_card_data.shang_telephone}}</view>
			</view>
			
			<view style='font-size:15px; margin:10px;position:relative;' v-if="ecard_option_list.ecard_show_index_address == 1">
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/weizhi.png" style="width:30px;height:30px;margin-left:-5px;"></image>
			
				<view style='position:absolute;top:5px;left:35px;' @tap="openLocation">{{current_user_card_data.shang_address}}</view>
			</view>
			
			<view style='font-size:15px; margin:10px;position:relative;' v-if="ecard_option_list.ecard_show_copyright_text == 1">
			
				<view style='text-align: center;width: 100%;color: #666;'>
					{{ecard_option_list.ecard_copyright_text}}</view>
			</view>
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
			

		<!-- 新增插件 end -->
        
        

		











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
				show_hidden: true,
				nocancel: false,
				changefootnav: 'footnav',
				plugin_list: '',
				shanghu_img_list: '',
				plugin_data_list: '',
				score_log_count: '',
				youhui_count: '',
				youhui_new_count: '',
				list_two:[],
				list_first:[],
				head_img:'',
				bg_img:'',
				
				ecard_data_type:'ecard',	//2020.12.28. 会员卡的类型
				super_vip_card_data: {},
				huiyuan_detail_info:{},
				
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
			//针对微信小程序
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
			else if (options && options.scene) {
				// 最大32个可见字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~
				// https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/qr-code/wxacode.getUnlimited.html
				// 格式为： card_type.sellersn_value.kazhu_userid
				var scene_value = decodeURIComponent(options.scene);
				
				console.log('来自无限制小程序码的会员卡入口：' + scene_value);
				
				var url_data = scene_value.split('.');
				console.log(url_data);
				
				if (url_data.length >= 3) {
					this.ecard_data_type = url_data[0];
					sellerid = url_data[1];
					this.super_vip_card_data.kazhu_userid = url_data[2];
					
					console.log('数据类型：'+url_data[0]+' sellerid：'+url_data[1]+' 卡主ID：'+url_data[2]);
				}
			  	
				
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
			
			console.log('当前sellerid:' + sellerid + "，来自请求");
			
			//判断是否登录
			var last_url = 'redirectTo /pages/myecard/myecard';
			
			var userInfo = this.abotapi.get_user_info();
			if (!userInfo) {
			  this.abotapi.goto_user_login(last_url);
						
			  return;
			}
			
			
			//2020.12.28. 
			if(options.ecard_data_type){
				this.ecard_data_type = options.ecard_data_type;
				
				if(options.ecard_data_type == 'super_vip_card'){
					this.super_vip_card_data.kazhu_userid = options.kazhu_userid;
					
					
					//console.log('pwwwwwwwwwwww',this.super_vip_card_data.kazhu_userid);
				}
				else{
					//如果是其他类似超级会员卡的类型（不是 ecard）
				}
			}
			
			
			

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

				that.show_hidden = false;

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

			
			this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
			
			
			setTimeout(function() {
				uni.stopPullDownRefresh();
				uni.hideToast();
			}, 1000);
			
		},
		onShareAppMessage: function() {
			var that = this;
			
			return {
				title: that.current_user_card_data.card_name,
				desc: '',
				path: 'pages/myecard/myecard',
			}
			
		},

		onShareTimeline: function () {
			
		},
		onAddToFavorites: function () {
			//this.onShareTimeline();
		},
		
		//调用接口
		methods: {

			callback_function_shop_option_data: function(that, option_data) {
				console.log('option_data========', option_data);

				//that.abotapi.getColor();

				//=====更新商户头条=================
				that.initArticleList();
				//========End====================
				console.log('888889999===',that.ecard_data_type);
				if(that.ecard_data_type == 'ecard'){
					that.get_user_card_and_ecard_option();
				}
				else if(that.ecard_data_type == 'super_vip_card'){
					that.get_super_vip_card_data();
				}
				
				
				
				
				var userInfo = this.abotapi.get_user_info();
				
				
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
				// uni.openLocation({
				// 	longitude: Number(this.data.longitude),
				// 	latitude: Number(this.data.latitude)
				// })
				
				var data = this.current_user_card_data;
				
				var new_url = '../shopMap/shopMap?from_page=2&latitude='+data.latitude;
				new_url += '&longitude='+data.longitude;
				new_url += '&name='+data.shang_name;
				new_url += '&address='+data.shang_address;
				new_url += '&telephone='+data.shang_telephone;
				
				uni.navigateTo({
					url:new_url
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
			
			get_user_card_and_ecard_option:function(){
				var userInfo = this.abotapi.get_user_info();
				
				var that = this;
				
				
				console.log("准备获取userid[" + userInfo.userid + "]的商户[" + this.abotapi.globalData.sellerid +"]会员卡信息");
				
				//console.log('that.abotapi.get_sellerid() ===>>>> ', that.abotapi.get_sellerid());
				
				uni.showLoading({
					title: '数据加载中……',
				});
				
				
				var url = that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=Xiaochengxu&a=get_user_card';
				var data = {
					sellerid: that.abotapi.get_sellerid(),
					checkstr: userInfo.checkstr,
					//uwid: userInfo.uwid,
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
					console.log('2222222222222222222233333',res.data);
					
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
						sellerid : that.abotapi.get_sellerid()
						//sellerid: 'pQNNmSkaq'
					},
					success(res) {
						console.log("aaaaaaa==============>>>>>", res)
						 
						 that.list_first = res.data.data.ecard_shopappv2_nav_icon_list;
						 that.list_two = res.data.data.ecard_shopappv2_function_list;
						 that.head_img = res.data.data.page_bg_img_head;
						 that.bg_img = res.data.data;
							
						 
						 console.log("gggggggg==============>>>>>", res.data.data.page_bg_img_head);
						 
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
				
			},
			get_super_vip_card_data:function(){
				//2020.12.28. 获取超级会员卡的数据，并渲染会员卡信息
				var userInfo = this.abotapi.get_user_info();
				
				var that = this;
				
				var kazhu_userid = that.super_vip_card_data.kazhu_userid;
				
				console.log('pppppppppppp',kazhu_userid);
				that.abotapi.abotRequest({
				  url: this.abotapi.globalData.yanyubao_server_url + 'openapi/SuperVipCardData/get_huiyuan_detail',
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
					  
					  that.huiyuan_detail_info = res.data.huiyuan_detail;
					  console.log('超级会员卡的信息===',that.huiyuan_detail_info);
					  
				  },
				  fail: function (e) {
					   uni.showToast({
					     title: '网络异常！',
					     duration: 2000
					   });
				   }
				 });
			
			},
			
			//跳转到超级会员卡余额详情界面
			check_balance_log:function(){
				var that = this;
				
				uni.navigateTo({
					url: '../user/log?super_vip_card_kazhu_userid=' + that.super_vip_card_data.kazhu_userid+ '&type=' + 'super_vip_card_balance'
				
				})
				
			},
			
			goto_user_function:function(url){
				this.abotapi.call_h5browser_or_other_goto_url(url);
			}

		},


	}
</script>

<style>
	.a {
		display: flex;
		align-items: center;
		color: #007AFF;
		margin-left: 20rpx;
		margin-top: 50rpx;
		padding-top: 50rpx;
	}
    .head_c{
		z-index: 1;
		position: absolute;
		top: 0;
		text-align: center;
		display: inline-block;
		width: 100%;
		height: 250rpx;
	}
		
	.c {
		z-index: 2;
		position: relative;
		margin-top: 25rpx;
		margin-left: 5%;
		width: 90%;
		height: 400rpx;
		/*border-top: 1px solid #fff;*/
		background-size: 100% 100%;
		border-radius: 25rpx;
	}
	
	.card_no_text{
		text-align: right;
		color: #000000;
		margin-top:165rpx;
		padding-right: 50rpx;
		font-size: 40rpx;
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
	.mid-value {
		font-size: 30rpx;
		color: #666;
		
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
		margin-top: 20rpx;
	}
	
	.icon-box-con {
		overflow: hidden;
		background-color: #FFFFFF;
		margin-bottom: 10rpx;    
		padding: 10rpx 30rpx 10rpx 30rpx;
	}
	.icon-box navigator{
		display: inline;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}
	
	.icon-text text{
		font-size: 25rpx;
	}
	
	.supplier-img{
		width: 100%;
	}
	
	.weui_cell {
		 padding: 10rpx 30rpx;
	}
	.weui_cell_bd_p{
		font-size: 30rpx;
		margin-left: 35rpx;
		line-height: 75rpx;
		align-items: center;
		display: flex;
	}
	
	.weui_cell_bd{
		display:flex;
		margin-left: 30rpx;
	}
	.weui_cell_bd image{
		width: 80rpx;
		height:80rpx;
	}
	.supplier-image-list{
		font-size: 0;
	}
	.weizhi_msg{
		background-color: #FFFFFF;
		margin-top: 10rpx;
		padding: 30rpx;
	}
	
	.info_list{
		border-bottom:  1rpx solid #b5b5b5;
	}
	
	.mobile_msg{
		margin-top: 10rpx;
		background-color: #FFFFFF;
	}
	.super_vip_balance{
		display: flex;   
		margin-top: 15px;
		border-bottom: 1px solid #c6c6c6;
		padding-bottom: 15px;
	}
	.balacne_detail_count{
		display: flex;
		line-height: 30px;
		margin-left: 25px;
	}
	.go_balance_detail{
		display: inline-block;
		line-height: 25px;
		border: 1px solid;
		border-radius: 7px;
		padding: 2px;
		margin-left: 120px;
	}
	
</style>
