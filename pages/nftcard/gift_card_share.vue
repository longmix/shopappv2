<template>
	<view style="padding: 20rpx;">
		<!-- 卡牌封面 卡牌名称及简介 -->
		<view style="display: flex;">
			<view @tap="go_to_card_detail(current_packageid,current_cardid)">
				<image :src="current_card_detail.cover_img_url_2x3_stand"
					style="border-radius: 15rpx;width: 340rpx;">
				</image>
			</view>
			<view style="padding-left: 20rpx;width: 350rpx;">
				<view class="card_detail_title">
					{{current_card_detail.card_name}}
				</view>
				<view class="gift_card_brief">
					{{current_card_detail.brief}}
				</view>
			</view>
		</view>
		
		
		<block v-if="is_sender">
		
			<view>
				<view style="padding: 20rpx 0px 5px 0px">转赠的卡牌</view>
				<!-- 复选框按钮 -->
				<uni-data-checkbox
					mode="tag" 
					selectedColor="#65b847"
					v-model="checkbox_value_cplid" 
					:localdata="checkbox_range_card_publish_list" 
					@change="checkbox_change_cplid" disabled>
				</uni-data-checkbox>
				
				<!-- <uni-data-checkbox
					mode="tag" 
					selectedColor="#65b847"
					v-model="checkbox_value_cplid" 
					:localdata="checkbox_range_card_publish_list" 
					@change="checkbox_change_cplid">
				</uni-data-checkbox> -->
			</view>
				
			
			<view style="padding: 30rpx 0px 10px 0px">
				<view>赠言</view>
				<view style="font-size: 40rpx;padding: 30rpx;">
					<!-- {{current_card_item.send_wish}} -->
				</view>  
			</view>
			<view>方式</view>
			<!-- 单选框按钮 -->
			<view style="padding-left: 2.5%;">
				<uni-data-checkbox
					mode="tag" 
					v-model="checkbox_value_get_type"
					selectedColor="#65b847"
					:localdata="checkbox_range_get_type" 
					@change="checkbox_change_get_type">
				</uni-data-checkbox>
			</view>
			
			
			<view style="padding-top: 50rpx;">
					<!-- <button type="default"
						class="gift_card_button_zengsong"
						:style="{background:wxa_shop_nav_bg_color}">
						赠送
					</button> -->
				
				<!-- #ifdef MP -->
					<button open-type="share"
						class="button_fenxiang_border gift_card_button_zengsong" :style="{background:wxa_shop_nav_bg_color}">
						赠送给好友
					</button>
				<!-- #endif -->
				
				<!-- #ifdef APP-PLUS -->
					<button @click="is_show" class="gift_card_button_zengsong" :style="{background:wxa_shop_nav_bg_color}">
						赠送给好友
					</button>
				<!-- #endif -->
				
				<!-- #ifdef H5 -->
					<button @tap="share_shang_detail" class="gift_card_button_zengsong" :style="{background:wxa_shop_nav_bg_color}">
						赠送给好友
					</button>
				<!-- #endif -->
			</view>
		</block>
		<block v-else>
			<view style="display: flex;padding-top: 20rpx;">
				<view style="">
					<image style="width: 150rpx; height: 150rpx;border-radius: 50%;" :src="current_card_item.headimgurl" mode="heightFix"></image>
				</view>
				
				<view>
					<view style="padding: 30rpx;font-size: 40rpx;">{{current_card_item.nickname}}</view>
				</view>
			</view>
			<view style="font-size: 40rpx;padding: 30rpx;">{{current_card_item.send_wish}}</view>
			<view style="text-align: right;">{{current_card_item.createtime}}</view>
			<view style="padding-top: 50rpx;">
				<button class="gift_card_button_zengsong" :style="{background:wxa_shop_nav_bg_color}">
					领取卡牌
				</button>
			</view>
		</block>
		
	</view>
</template>

<script>
	
import util from '../../common/util.js';
	
import uniDataCheckbox from "./components/uni-data-checkbox/uni-data-checkbox.vue";	
	
export default {
	components: { uniDataCheckbox },
	data() {
		return {
			//复选
			checkbox_value_cplid: 0,
			checkbox_range_card_publish_list: [{"value": 0,"text":"卡牌id"},{"value": 1,"text":"#2 卡牌id"}],
			// 单选
			checkbox_value_get_type: 0,
			checkbox_range_get_type: [{"value": 0,"text":"全部领取"},{"value": 1,"text":"限领一张"}],
			
			send_wish:'',
			
			
			tkinfotest: "",//文本输入
			
			//radioVal:1,//单选
			
			
			nftcard_gift: null,
			current_card_detail: null,
			current_card_publish_list: "",
			
			current_card_item: null,
			
			current_packageid: 0,
			current_cardid: 0,
			
			wxa_shop_nav_bg_color: '#30C478',
			
			//是否是发送者的界面
			is_sender:true
			
		};
	},
	onLoad: function (options) {
		
		console.log('当前时间：' + util.formatTime( new Date() ) + ' ' + util.formatTime2( new Date() ) + ':01' );
		
		console.log('pages/tabBar/index/index====>>>>', options);
		
		var that = this;
		
		uni.setNavigationBarTitle({
			title : that.abotapi.globalData.default_shopname
		});
		
		this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
		
		
		that.current_cardid = options.cardid;
		//that.current_packageid = options.packageid;
		
		console.log('that.current_cardid ===》》 ', that.current_cardid);
		
		if (!that.current_cardid) {
			
			uni.hideLoading();
			
			uni.showModal({
				title: '没有cardid',
				content: ' ',
				showCancel: false
			});
		
			return;
		}
		
		
		// 页面加载默认界面
		that.current_card_detail = {
			'title': ' '
		};
		
		that.current_card_detail.cover_img_url_2x3 = 'https://yanyubao.tseo.cn/Tpl/static/nft_card/default_card_cover.png';
		that.current_card_detail.cover_img_url_2x3_stand= 'https://yanyubao.tseo.cn/Tpl/static/nft_card/default_card_cover.png';
		that.current_card_detail.card_name = '';
		that.current_card_detail.brief = '';
			
		
		uni.setNavigationBarTitle({
			title : '赠送'
		});
		
		that.__get_card_detail();
		
		if(!options.from){
			that.__get_card_publish_list();
			
			return;
		}
		
		//分享后接收的人点击进来后的界面
		that.is_sender = false;
		
		var cplid =  options.cplid;
		
		that.__receiver_get_card_cpl_info(cplid);
		
		
		
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
		
		that.__get_card_detail();
		that.__get_card_publish_list();
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom: function () {
		
		//this.get_product_list();
		
	},
	
	//微信分享给好友
	onShareAppMessage: function() {
		var that = this;
		
		return;

		// if(that.data.cplid == "",that.data.action == "",that.data.send_wish == ""){
		// 	uniShowModal({
		// 		title: "提示",
		// 	});
		
		// 	return;
		// }
		// console.log("checkbox_change_cplid----------" + );
		// if(!that.checkbox_value_cplid){
		// 	uni.showModal({
		// 		title: '请选择想要赠送的卡牌',
		// 		showCancel: false,
		// 	});
			
		// 	return;
		// }
		
		
		if(that.__nft_card_gift('app_mesage') == 0){
			return;
		}
		
		
		
		
		var share_title = that.current_card_detail.card_name;
		
		if(that.abotapi.get_user_info()){
			if(that.abotapi.get_user_account_info()){
				var account_info = that.abotapi.get_user_account_info();
				console.log('昵称==========>',account_info);
				
				share_title = account_info.nickname + '向您赠送了卡牌' + share_title;
			}
		}
		
		if (share_title.length > 22) {
			share_title = share_title.substr(0, 20) + '...';
		}
	
		var share_path = 'pages/nftcard/card_detail?sellerid=' + that.abotapi.globalData.default_sellerid;
		share_path += '&packageid='+that.current_packageid;
		share_path += '&cardid='+that.current_cardid;
		share_path += 'from=app_message&cplid=' + that.checkbox_value_cplid;
	
		//如果登录了，则带上分享者的userid
		var userInfo = this.abotapi.get_user_info();
		if (userInfo && userInfo.userid) {
			share_path += '&userid=' + userInfo.userid;
		}
	
		var share_img = that.current_card_detail.cover_img_url_stand;
		if(!share_img){
			share_img = that.current_card_detail.cover_img_url;
		}
		
		console.log('111111111111111111111111111111'+that.current_card_detail.cover_img_url_stand);
		
		return {
			title: share_title,
			path: share_path,
			imageUrl: share_img,
			success: function(res) {
				// 赠送成功
			},
			fail: function(res) {
				// 赠送失败
			}
		}
	},
	//微信分享到朋友圈
	onShareTimeline: function() {
		return this.share_return();
	},
	onAddToFavorites: function () {
		return this.share_return();
	},
	methods: {
		share_return: function() {
			var that = this;
			
			if(that.__nft_card_gift('timeline') == 0){
				return;
			}
			
			
			var share_title = that.current_card_detail.card_name;
			if (share_title.length > 22) {
				share_title = share_title.substr(0, 20) + '...';
			}
			
			var share_path = 'sellerid=' + that.abotapi.globalData.default_sellerid;
			share_path += '&packageid='+that.current_packageid;
			share_path += '&cardid='+that.current_cardid;
			share_path += 'from=timeline&cplid=' + that.checkbox_value_cplid;
			
			//如果登录了，则带上分享者的userid
			var userInfo = this.abotapi.get_user_info();
			if (userInfo && userInfo.userid) {
				share_path += '&userid=' + userInfo.userid;
			}
			
			var share_img = that.current_card_detail.cover_img_url_stand;		
			if(!share_img){
				share_img = that.current_card_detail.cover_img_url;
			
				console.log('111111111111111111111111111111'+that.current_card_detail.cover_img_url_stand);
				
				return {
					title: share_title,
					query: share_path,
					imageUrl: share_img,
				}
			
			}
		},
		
		callback_function_shop_option_data:function(that, cb_params){
			
			console.log('当前调试开关22：' + this.system_debug_flag);
			console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);
			
			if(!cb_params){
				return;
			}
			
			console.log('cb_params====', cb_params);
		},
		
		//获取卡牌详情
		__get_card_detail:function(){
			var that = this;
			
			//获取卡牌详情
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_card_detail',
				method: 'post',
				data: {
					sellerid: that.abotapi.globalData.default_sellerid,
					cardid: that.current_cardid,
				},
				success: function(res) {
					uni.hideLoading();
					if (res.data.code != 1) {
						uni.showToast({
							title: '卡牌详情没有数据',
							duration: 2000,
						});			
						return;
					}
					
					that.current_card_detail = res.data.data;
					console.log('current_card_detail ===>>> ', that.current_card_detail);
					
					that.current_packageid = that.current_card_detail.packageid;
					
					//处理商品详情
					that.card_description = that.current_card_detail.description;
			
			
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
			
					that.card_description = newArr;
			
					// #endif	
					
				},
				fail: function(e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
				},
			});
				
		},
		
		
		__get_card_publish_list:function(){
			var that = this;
			
			var userInfo = that.abotapi.get_user_info();
			
			if (!userInfo) {
				return;
				
			}
			
			
			//获取单张卡牌的购买记录列表
			var post_data = {
				sellerid: that.abotapi.globalData.default_sellerid,
				packageid: that.current_packageid,
				cardid: that.current_cardid,
			};
			
			
			post_data.userid = userInfo.userid;
			post_data.checkstr = userInfo.checkstr;
			
			
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_card_publish_list',
				method: 'post',
				data: post_data,
				success: function(res) {
			
					if (res.data.code != 1) {
						uni.showToast({
							title: '数据加载完成',
							duration: 2000,
						});
			
						return;
					}
					
					that.current_card_publish_list = res.data.data;
					
					console.log('current_card_publish_list ===>>> ', that.current_card_publish_list);
					
					
					that.checkbox_range_card_publish_list = [];
					
					for(var ii=0; ii<that.current_card_publish_list.length; ii++){
						var temp001 = that.current_card_publish_list[ii];
						
						that.checkbox_range_card_publish_list.push({"value": temp001.cplid, "text": "#"+temp001.cplseq +'  '+ temp001.cplno});
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
		//赠予
		__nft_card_gift:function(from=''){
			var that = this;
			
			// if(!that.checkbox_value_cplid){
			// 	uni.showModal({
			// 		title: '请选择想要赠送的卡牌',
			// 		showCancel: false,
			// 	});
				
			// 	return 0;
			// }
			
			/*
			if(that.checkbox_value_get_type == -1){
				uni.showModal({
					title: '请选择卡牌的赠送方式',
					showCancel: false,
				});
				
				return;
			}
			*/
			
			// if(that.send_wish.length == 0){
			// 	uni.showModal({
			// 		title: '请填写转赠留言',
			// 		showCancel: false,
			// 	});
				
			// 	return 0;
			// }
			
			
			
			var userInfo = that.abotapi.get_user_info();
			
			if (!userInfo) {
				return 0;
				
			}
			
			
			//赠送
			var post_data = {
				sellerid: that.abotapi.get_sellerid(),
				userid: userInfo.userid,
				checkstr: userInfo.checkstr,
				cardid: that.current_card_detail.cardid,
				cplid: that.checkbox_value_cplid,
				action: 'send',
				get_type: that.checkbox_value_get_type,
				from: from,
				send_wish: that.send_wish,
			};
			
			// var userInfo = that.abotapi.get_user_info();
			// if (userInfo) {
			// 	post_data.userid = userInfo.userid;
			// 	post_data.checkstr = userInfo.checkstr;
			// }
			
			
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/nftcard_gift',
				method: 'post',
				data: post_data,
				success: function(res) {
			
					if (res.data.code == 1) {
						console.log("赠送成功");
					}
					
					console.log('nftcard_gift ===>>> ', res.data);
					
					uni.showModal({
						title: "提示",
						content: "赠送完成",
						showCancel: false,
						success: () => {
							uni.navigateTo({
								url: '/pages/nftcard/card_detail?cardid='+that.current_cardid,
							})
						}
					})
					
					
					
			
			
				},
				fail: function(e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
				},
			});
			
			
			
			
			
		},
		
		
		
		
		// checkboxChange: function (e) {
		// 	var items = this.items,
		// 		values = e.detail.value;
		// 	for (var i = 0, lenI = items.length; i < lenI; ++i) {
		// 		const item = items[i]
		// 		if(values.includes(item.value)){
		// 			this.$set(item,'checked',true)
		// 		}else{
		// 			this.$set(item,'checked',false)
		// 		}
		// 	}
		// },
		
		//选框
		// checkbox_change_cplid(e){
		// 	console.log('e:', e);
			
		// 	console.log('checkbox_value_cplid:' + this.checkbox_value_cplid);
			
		// },
		
		// checkbox_change_get_type(e){
		// 	console.log('e:', e);
			
		// 	console.log('checkbox_value_get_type:' + this.checkbox_value_get_type);
			
		// },
		
		
		// bindTextAreaBlur: function (e) {
		// 	console.log(e.detail.value);
			
		// 	this.send_wish = e.detail.value;
			
		// },
		
		//h5点击分享触发
		share_shang_detail: function() {
			var that = this;
			
			console.log('==================>>>h5 模拟赠卡');
			
			
			if(that.__nft_card_gift('h5') == 0){
				return;
			}
			
			
			
			
		},
		
		//app  分享点击
		click_wxa_share: function() {
			abotsharejs.click_wxa_share(this.share_href, this.share_titles, this.share_summary, this.share_imageUrl);
		},
		
		//赠言
		__receiver_get_card_cpl_info:function(cplid){
			var that = this;
			
			var userInfo = that.abotapi.get_user_info();
			
			if (!userInfo) {
				return 0;
				
			}
			
			var post_data = {
				sellerid: that.abotapi.get_sellerid(),
				userid: userInfo.userid,
				checkstr: userInfo.checkstr,
				cardid: that.current_cardid,
				cplid: cplid,
				action: 'info', 
			};
			
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/nftcard_gift',
				method: 'post',
				data: post_data,
				success: function(res) {
			
					if (res.data.code == 1) {
						console.log("赠送成功");
					}
					
					
					that.current_card_item = res.data.data;
					
					console.log('nftcard_gift ===>>> ', res.data);
					
					
					
					
					
			
			
				},
				fail: function(e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
				},
			});
			
			
			
			
		},
		//接收
		receiver_get_card_cpl:function(cplid){
			
			var post_data = {
				sellerid: that.abotapi.get_sellerid(),
				userid: userInfo.userid,
				cardid: that.current_card_detail.cardid,
				checkstr: userInfo.checkstr,
				cplid: cplid,
				action: 'get',
			};
			
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/nftcard_gift',
				method: 'post',
				data: post_data,
				success: function(res) {
			
					if (res.data.code == 1) {
						console.log("赠送成功");
					}
					
					console.log('nftcard_gift ===>>> ', res.data);
					
					uni.showModal({
						title: "提示",
						content: "赠送完成",
						showCancel: false,
						success: () => {
							uni.navigateTo({
								url: '/pages/nftcard/card_detail?cardid='+that.current_cardid,
							})
						}
					})
					
					
					
			
			
				},
				fail: function(e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
				},
			});
			
			
			
			
		},
		
		go_to_card_detail: function(packageid, cardid) {
			console.log('packageid===>>>' + packageid);
			console.log('cardid===>>>' + cardid);
		
			uni.navigateTo({
				url: '/pages/nftcard/card_detail?packageid=' + packageid + '&cardid=' + cardid,
			})
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
	}
	
}
	
	
</script>

<style lang="scss">
	@import "./static/css/nftcard.css";
	
	.card_detail_title {
		padding-bottom: 15rpx;
		font-size: 36rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.selfCheckBox{
		cursor: pointer;
		.selfCkeckImgBox img{
			padding-top: 10rpx;
			width:20px;
			height:20px;
		}
	}
	
	.selfRadio{
		cursor: pointer;
		.selfRadioImgBox img{
			width:18px;
			height:18px;
		}
		.selfRadioText{
			margin-left:10px;
		}
	}
	.gift_card_button_zengsong{
		width: 350rpx;
		// padding: 10rpx;
		text-align: center;
		background: #30c478;
		color: #FFFFFF;
	}
	.uni-list{
		padding: 15rpx;
		border-bottom: 2rpx #666666 solid;
	}
	.gift_card_brief{
		color: #666666;
		overflow: hidden;
		text-overflow: ellipsis;
		display:-webkit-box;
		-webkit-line-clamp:10;
		-webkit-box-orient:vertical;
	}
	//实现隔行换色
	// table tr:nth-child(odd){
	// 	background: #c8c6cc;
	// }
	// table tr:nth-child(even){
	// 	background: #ffffff;
	// }
</style>
