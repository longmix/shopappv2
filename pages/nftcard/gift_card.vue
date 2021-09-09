<template>
	<view style="padding: 20rpx;">
		<!-- 卡牌封面 卡牌名称及简介 -->
		<view style="display: flex;">
			<view>
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
		
		<!-- <view>
			
			<checkbox-group @change="checkboxChange" 
				
				:key="index001">
				<label class="uni-list"
					style="display: flex;"
					v-for="item in items"
					:key="item.value">
					<view style="">
						<checkbox :value="item.value" :checked="item.checked" />
					</view>
					<view>No.{{item.name}}</view>
					<view style="padding-left: 180rpx;padding-right: 180rpx;">编号</view>
					<view style="">获得时间</view>
				</label>
			</checkbox-group>
		</view> -->
		<view>
			<view style="padding: 20rpx 0px 5px 0px">想要转赠的卡牌</view>
			
			<table width="100%" border="0" cellspacing="0" cellpadding="0" style="text-align: center;line-height: 60rpx;">
				<tr style="background: #c8c6cc;">
					<td></td>
					<td>序号</td>
					<td>卡牌id</td>
					<td>获得时间</td>
					<!-- <td>是否兑换</td> -->
				</tr>
				<tr v-for="(current_card_publish_item,index) in current_card_publish_list" :key="index">
					<td>
						<!-- 多选框 -->
						<!-- <view class="selfCheckBox" @click="clickCheckBox(index)" v-for="(item,index) in checkBoxArr" :key="index">
							<view class="selfCkeckImgBox">
								<img v-if="item.selectStatus==1" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/checkbox1.png" alt="选中图标">
								<img v-if="item.selectStatus==0" src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/checkbox2.png" alt="未选中图标">
							</view>
						</view> -->
						<view>
							<uni-data-checkbox multiple v-model="value" :localdata="range" @change="change"></uni-data-checkbox>
						</view>
					</td>
					<td>
						#{{current_card_publish_item.cplseq}}
					</td>
					<td>
						{{current_card_publish_item.cplno}}
					</td>
					<td>
						{{current_card_publish_item.updatetime_str}}
					</td>
					<!-- <td style="text-align: center;">
						未兑换
					</td> -->
				</tr>
				
			</table>
		</view>
		
		<view style="padding: 30rpx 0px 10px 0px">
			<view>赠言</view>
			<view class="gift_card_textarea">
				<textarea style="width: 100%;" 
				placeholder-style="color: #30c478"
				maxlength="70"
				placeholder="请输入赠言" 
				@blur="bindTextAreaBlur"
				v-model="tkinfotest"/>
			</view>
		</view>
		
		
		<!-- 单选框 -->
		<view style="padding-top: 20rpx; display: flex;">
			<view class="selfRadio" @click="clickRadio(1)">
				<view class="selfRadioImgBox" style="display: flex;">
					<img v-show="radioVal==1"
						src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/quan-circle.png"
						alt="选中图标">
					<img v-show="radioVal!=1"
						src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/quan-lv.png"
						alt="未选中图标" >
					<view style="padding-left: 10rpx;">全部领取</view>
				</view>
			</view>
			<view class="selfRadio" 
				style="padding-left: 100rpx;"
				@click="clickRadio(2)">
				<view class="selfRadioImgBox" style="display: flex;">
					<img v-show="radioVal==2" 
						src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/quan-circle.png"
						alt="选中图标">
					<img v-show="radioVal!=2"
						src="http://192.168.0.111/yanyubao_server/Tpl/static/nft_card/quan-lv.png"
						alt="未选中图标">
					<view style="padding-left: 10rpx;">限领一张</view>
				</view>
			</view>
		</view>
		
		
		<view style="padding-top: 50rpx;">
			<button type="default"
				class="gift_card_button_zengsong"
				:style="{background:wxa_shop_nav_bg_color}">
				赠送
			</button>
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
			
			// value: [0,2],
			range: [{"value": 0,"text": "篮球"}],
			
			// title: 'checkbox 复选框',
			// items: [{
			// 		value: '1',
			// 		name: '1',
			// 		checked: 'true'
			// 	},
			// 	{
			// 		value: '2',
			// 		name: '2',
			// 	},
			// 	{
			// 		value: '3',
			// 		name: '3'
			// 	},
			// ],
			
			tkinfotest: "",//文本输入
			
			radioVal:1,//单选
			
			nftcard_gift: null,
			current_card_detail: null,
			current_card_publish_list: null,
			
			// checkBoxArr:[
			// 	{
			// 		selectStatus:0
			// 	},
			// ],
			
			current_packageid: 0,
			current_cardid: 0,
			
			wxa_shop_nav_bg_color: '#30C478',
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
			title : '赠送'
		});
		
		this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
		
		that.current_cardid = options.cardid;
		that.current_packageid = options.packageid;
		
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
		
		that.__get_card_detail();
		that.__get_card_publish_list();
		
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
		
		this.get_product_list();
		
	},
	
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
		nft_card_gift:function(cplid){
			this.nftcard_gift(cplid, 'send', get_type, from, send_wish);
		},
		
		nftcard_gift:function(cplid, action, get_type='', from = '', send_wish = ''){
			var that = this;
			
			var userInfo = that.abotapi.get_user_info();
			
			if (!userInfo) {
				return;
				
			}
			
			
			//赠送
			var post_data = {
				sellerid: that.abotapi.globalData.default_sellerid,
				cplid: cplid,
				action: action,
				// get_type: get_type,
				// from: from,
				// send_wish: send_wish,
			};
			
			
			post_data.userid = userInfo.userid;
			
			
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/nftcard_gift',
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
					
					that.nftcard_gift = res.data.data;
			
					console.log('nftcard_gift ===>>> ', that.nftcard_gift);
			
			
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
		
		//多选框
		change(e){
			console.log('e:',e);
		},
		
		//多选框
		// clickCheckBox(index){
		// 	if(this.checkBoxArr[index].selectStatus==1){
		// 		this.checkBoxArr[index].selectStatus=0;
		// 	}else{
		// 		this.checkBoxArr[index].selectStatus=1
		// 	}
		// },
		//单选按钮
		clickRadio(val){
			if(this.radioVal==val){
				this.radioVal=0;
			}else{
				this.radioVal=val;
			}
		},
		
		bindTextAreaBlur: function (e) {
			console.log(e.detail.value)
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
	.gift_card_textarea{
		border: 2rpx #9f9f9f solid;
		padding: 10rpx;
		margin-top: 10rpx;
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
		width: 400rpx;
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
