<template>
	<view style="background-color: 	#DCDCDC;padding: 40rpx;">
		<view style="padding: 20rpx;background-color: #FFFFFF;border-radius: 20rpx;" v-if="is_page_show_to_user == 1">
			<!-- 卡牌封面 卡牌名称及简介 -->
			<view style="display: flex;">
				<view style="padding-left: 20rpx;width: 350rpx;margin-top: 30rpx;">
					<view class="card_detail_title">
						{{current_card_detail.card_name}}
					</view>
					<!-- <view class="gift_card_brief">
						{{current_card_detail.brief}}
					</view> -->
					<view style="display: flex;margin-top: 20rpx;">
						<image :src="current_card_detail.supplier_item.faxingshang_logo_url" style="width: 40rpx;height: 40rpx;border-radius: 50%;"></image>
						<view style="margin-left: 20rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size: 28rpx;color:#C0C0C0;">{{current_card_detail.supplier_item.name}}</view>
					</view>
					
				</view>
				<view>
					<view @tap="go_to_card_detail(current_packageid,current_cardid)">
						<image :src="current_card_detail.cover_img_url_2x3_stand"
							style="margin-left: 20rpx;border-radius: 20rpx; width: 150rpx;" mode="widthFix" >
						</image>
					</view>
				</view>
			</view>
			<view style="border: 1px solid #f0f5f7;"></view>
			
			<block v-if="is_sender">
			
				<view>
					<view style="padding: 20rpx 0px 5px 0px;color: #A9A9A9;">转赠的卡牌</view>
					<view class="" style="display: flex;">
						<view v-for="(current_card_cpl_item,index) in current_card_cpl_list" :key="index" 
							style="display: flex;">
						
							<view class="card_cpl_transfer" style="">
								{{current_card_cpl_item.text}} 
							</view>
						</view>
					</view>
					<!-- 复选框按钮 -->
					<!-- <uni-data-checkbox
						mode="tag" 
						selectedColor="#65b847"
						v-model="checkbox_value_cplid" 
						:localdata="checkbox_range_card_publish_list" 
						@change="checkbox_change_cplid" disabled>
					</uni-data-checkbox> -->
				</view>
					
				
				<view style="padding: 30rpx 0px 10px 0px">
					<view style="color: #A9A9A9;">赠言</view>
					<view style="font-size: 40rpx;padding: 30rpx;word-wrap: break-word;">
						 {{current_send_wish}}
					</view>  
				</view>
				<view style="color: #A9A9A9;">方式</view>
				<!-- 单选框按钮 -->
				<view style="padding-left: 2.5%;margin-top: 10rpx;">
					
					<view class="checkbox_receive" v-if="current_get_type == 0" >
						全部领取
					</view>
					<view class="checkbox_receive" v-if="current_get_type ==1" >
						限领一张
					</view>
					<!-- <uni-data-checkbox
						mode="tag" 
						v-model="checkbox_value_get_type"
						selectedColor="#65b847"
						:localdata="checkbox_range_get_type" 
						@change="checkbox_change_get_type" disabled>
					</uni-data-checkbox> -->
				</view>
				<view>
					<image :src="current_card_detail.supplier_item.card_share_big_image" mode="widthFix"></image>
				</view>
		</block>
		
			
		<block v-else>
			
			<view>
				<view style="line-height:60rpx ;color: #A9A9A9;">来自于</view>
		
				<view class="" style="display: flex;">
					<image :src="current_card_item.headimgurl" mode="widthFix" style="width: 80rpx; margin:20rpx 10rpx;border-radius: 50%;"></image>
					<view class="card_cpl_nickname" >{{current_card_item.nickname}}</view>
				</view>
				
				
				<view style="line-height:60rpx ;color: #A9A9A9;">转赠的卡牌</view>
		
			
				<view class="" v-for="(current_card_item_list , index) in current_card_item.cplid" 
					style="margin: 20rpx 5rpx;">
					<view class="card_cpl_transfer">
						#{{current_card_item_list.cplseq}} {{current_card_item_list.cplno}}
					</view>
				</view>
				
				<!-- 复选框按钮 -->
				<!-- <uni-data-checkbox
					mode="tag" 
					selectedColor="#65b847"
					v-model="checkbox_value_cplid" 
					:localdata="checkbox_range_card_publish_list" 
					@change="checkbox_change_cplid" disabled>
				</uni-data-checkbox> -->
				
				
				<view style="color: #A9A9A9;">赠言：</view>
				<view class="card_cpl_gift"  :style="{color:wxa_shop_nav_bg_color}">
					{{current_card_item.send_wish}}
				</view>
				
						
				<view style="font-size: 30rpx; padding: 20rpx 10rpx;">
					 {{current_card_item.createtime}}
				</view> 				
				<view>
					<image :src="current_card_detail.supplier_item.card_share_big_image" mode="widthFix"></image>
				</view>
				
				
			</view>
		</block>
		</view>
		<view style="padding-top: 60rpx;padding-bottom: 100rpx;" v-if="is_sender">
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
				<button @tap="share_cpl_from_h5" class="gift_card_button_zengsong" :style="{background:wxa_shop_nav_bg_color}">
					赠送给好友
				</button>
			<!-- #endif -->
		</view>
		
		<view style="padding-top: 60rpx;padding-bottom: 100rpx;" v-else>
			<view style="padding-top: 50rpx; color: #A9A9A9;">
				<button class="gift_card_button_zengsong" 
					:style="{background:wxa_shop_nav_bg_color}" 
					@tap="receiver_get_card_cpl(cplid)">
					领取卡牌
				</button>
			</view>
		</view>
		
		
		
		
		
	</view>
</template>

<script>
	
import util from '../../common/util.js';
	
import uniDataCheckbox from "./components/uni-data-checkbox/uni-data-checkbox.vue";	
	
export default {
	components: { uniDataCheckbox },
	data() {
		return {
			is_page_show_to_user:0,
			current_params_str: '',
			current_option_str:null,
			last_url : '',
			
			//复选
			current_card_cpl_list: [{"value": 0,"text":"卡牌id"},{"value": 1,"text":"#2 卡牌id"}],
			// 单选
			current_get_type: 0,
			
			current_send_wish:'',
			
			
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
		
		
		
		var last_url = '/pages/nftcard/gift_card_share';
		
		var arr = Object.keys(options);
		var options_len = arr.length;
		
		if (options_len > 0){
			var params_str = '';
		
			for(var key in options){
				params_str += key+'='+options[key]+'&';
			}
			params_str = params_str.substr(0, params_str.length - 1);
			
			that.current_option_str = params_str;
		
			last_url = last_url+'?'+params_str;
		}
		
		
		that.last_url = last_url;
		
		
		uni.setNavigationBarTitle({
			title : that.abotapi.globalData.default_shopname
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
		
		
		
		
		
		
		
		//赠送卡牌的页面
		if(!options.from){
			
			var userInfo = this.abotapi.get_user_info();
			
			//2021.6.19. 有例外的情况，不需要用户登录也可以下单
			var no_user_login = options.no_user_login;
			
			if( (!userInfo || !userInfo.userid) && (no_user_login != 1) ){
				
				
				that.abotapi.goto_user_login(last_url, 'normal');
				return;
			}
			
			
			
			
			that.is_page_show_to_user = 1;
			
			uni.setNavigationBarTitle({
				title : '赠送卡牌给好友'
			});
			
			
			//that.__get_card_publish_list();
			
			var data001 = uni.getStorageSync('zhuanzeng_data');
			
			console.log('data001111111111=====>>>', data001)
			
			that.current_card_detail = data001.card_detail;
			that.current_card_cpl_list = data001.cpl_list;
			that.current_cplid_list_str = data001.cplid_list_str;
			that.current_get_type = data001.get_type;
			
			that.current_send_wish = data001.send_wish;
			
			console.log('that.current_card_cpl_list =====>>>',that.current_card_cpl_list )
		//	console.log('111111111111current_card_detail=====>>>',that.current_card_detail)
			
			
			
			return;
		}
		
		
		//领取卡牌的页面
		uni.setNavigationBarTitle({
			title : '领取卡牌'
		});
		
		that.is_page_show_to_user = 1;
		
		
		that.__get_card_detail();
		
		//分享后接收的人点击进来后的界面
		that.is_sender = false;
		
		var cplid =  options.cplid;
		
		that.current_cplid_list_str = cplid;
		
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
		
		var share_title = that.current_send_wish;
		
		if (share_title.length > 22) {
			share_title = share_title.substr(0, 20) + '...';
		}
	
		var share_path = 'pages/nftcard/gift_card_share?sellerid=' + that.abotapi.globalData.default_sellerid;
		share_path += '&packageid='+that.current_packageid;
		share_path += '&cardid='+that.current_cardid;
		share_path += '&from=app_message&cplid=' + that.current_cplid_list_str;
		
		console.log('share_path====>>>>>' + share_path);
	
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
			
			var share_title = that.current_send_wish;
			
			if (share_title.length > 22) {
				share_title = share_title.substr(0, 20) + '...';
			}
				
			var share_path = 'sellerid=' + that.abotapi.globalData.default_sellerid;
			share_path += '&packageid='+that.current_packageid;
			share_path += '&cardid='+that.current_cardid;
			share_path += '&from=timeline&cplid=' + that.current_cplid_list_str;
			
			console.log('share_path====>>>>>' + share_path);
				
			var share_img = that.current_card_detail.cover_img_url_stand;
			if(!share_img){
				share_img = that.current_card_detail.cover_img_url;
			}
			
			console.log('111111111111111111111111111111'+that.current_card_detail.cover_img_url_stand);
			
			return {
				title: share_title,
				query: share_path,
				imageUrl: share_img,
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
	
		
		
		//h5点击分享触发
		share_cpl_from_h5: function() {
			var that = this;
			
			console.log('==================>>>h5 模拟赠卡');
			
			
			uni.showModal({
				title:'提示',
				content:'请在微信小程序中赠送给好友',
				showCancel:false
			})
			
		},
		
		//app  分享点击
		click_wxa_share: function() {
			abotsharejs.click_wxa_share(this.share_href, this.share_titles, this.share_summary, this.share_imageUrl);
		},
		
		//赠言
		__receiver_get_card_cpl_info:function(cplid){
			var that = this;
			
			
			var post_data = {
				sellerid: that.abotapi.get_sellerid(),
				//userid: userInfo.userid,
				//checkstr: userInfo.checkstr,
				cardid: that.current_cardid,
				get_type: that.current_get_type,
				cplid: cplid,
				action: 'info', 
			};
			
			console.log('that.abotapi.globalData.xiaochengxu_appid ===>>> ', that.abotapi.globalData.xiaochengxu_appid);
			
			// #ifdef MP-WEIXIN
				if(that.abotapi.globalData.xiaochengxu_appid){
					post_data.xiaochengxu_appid = that.abotapi.globalData.xiaochengxu_appid;
				}
			// #endif
			
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
			
			var that = this;
			
			var last_url = '/pages/nftcard/gift_card_share?' + that.current_params_str;
			var userInfo = this.abotapi.get_user_info();
	
			if( (!userInfo || !userInfo.userid) ){				
				that.abotapi.goto_user_login(last_url, 'normal');
				return;
			}
			
			var post_data = {
				sellerid: that.abotapi.get_sellerid(),
				userid: userInfo.userid,
				checkstr: userInfo.checkstr,
				cardid: that.current_card_detail.cardid,
				
				cplid: that.current_cplid_list_str,
				action: 'get',
			};
			
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/nftcard_gift',
				method: 'post',
				data: post_data,
				success: function(res) {
			
					console.log('nftcard_gift ===>>> ', res.data);
					
					uni.showModal({
						title: "提示",
						content: res.data.msg,
						showCancel: false,
						success: () => {
							if (res.data.code == 1) {
								uni.navigateTo({
									url: '/pages/nftcard/card_detail?cardid='+that.current_cardid,
								})
							}
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
	
	.card_cpl_transfer{
		border: 1rpx #999 solid;
		width: 260rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		margin-bottom: 10rpx;
		background-color: #F5F5F5;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}
	.card_cpl_gift{
		padding: 20rpx 10rpx; 
		font-size:40rpx;

	}
	.checkbox_receive{
		background: #30c478;
		width: 150rpx;
		text-align: center;
		color: #FFFFFF;
		margin: 5rpx;
		border-radius: 10rpx;
		height: 50rpx;
		line-height: 50rpx;
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

	.card_cpl_nickname{
		font-weight: bold;
		font-size: 40rpx;
		margin: 40rpx 20rpx 20rpx 20rpx
	}
	//实现隔行换色
	// table tr:nth-child(odd){
	// 	background: #c8c6cc;
	// }
	// table tr:nth-child(even){
	// 	background: #ffffff;
	// }
</style>
