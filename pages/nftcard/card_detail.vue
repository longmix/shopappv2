<template>
	<view class="global_background">
		<!--

购买卡片的跳转路径：  
/pages/order/pay?productid=12345&total=12.34&extraData=abcdefg

参数说明：
productid 对应的商品名称，由服务器返回，在卡牌详情中
total 总价格，由服务器返回，在卡牌详情中
extraData 扩展数据，由服务器返回，在卡牌详情中

		
-->
		<view class="main_body">
			<view :style="{width: card_bg_img_width+'rpx', height: card_bg_img_height+'rpx'}">
				<!-- 背景模糊图片 -->
				<image :src="current_card_detail.cover_img_url_2x3"  @load="imageLoad"
					class="card_detail_border"
					:style="{width: card_bg_img_width+'rpx', height: (card_bg_img_height*0.8)+'rpx'}" >
				</image>
				<!-- 2021.08.11卡牌封面 ==> 模态框 -->
				<view>
					<view class="show_modal_mask" 
						v-if="showModal_kapaifengmian" 
						@click="showModal_kapaifengmian=false">
					</view>
					<!-- 模态框 -->
					<view id="try" class="show_modal_pop" v-if="showModal_kapaifengmian">
						<!-- box_rolling下执行正面翻转动画   -->
						<div class="rollbox" :class="{'box_rolling':isRolling}" 
							@click="isRolling = !isRolling">
							<!-- 卡牌正面 -->
							<div class="rollbox_front">
								<div class="contentbox">
									<image :src="current_card_detail.cover_img_url_2x3"
										class="card_detail_image"
										:style="{width: (card_bg_img_width*1)+'rpx', height: (card_bg_img_height*1)+'rpx'}">
									</image>
								</div>
							</div>
							<!-- 卡牌反面 -->
							<div class="rollbox_behind">
								<div class="contentbox">
									<image :src="current_card_detail.cover_img_back_url"
										class="card_detail_image"
										:style="{width: (card_bg_img_width*1)+'rpx', height: (card_bg_img_height*1)+'rpx'}">
									</image>
								</div>
							</div>
							
						</div>
					</view>
					
					
					<!-- 卡牌封面 -->
					<view @click="showModal_kapaifengmian=true" 
						:style="{paddingTop: (card_bg_img_height*0.15)+'rpx',paddingLeft: (card_bg_img_width*0.1)+'rpx'}">
						<image :src="current_card_detail.cover_img_url_2x3" 
							class="card_detail_image" 
							:style="{width: (card_bg_img_width*0.8)+'rpx', height: (card_bg_img_height*0.8)+'rpx'}">
						</image>
						<!-- 2021.09.1价格 -->
						<view v-if= "nft_card_hidden_buy_button != 1">
							<view :style="{top:(card_bg_img_height*0.80)+'rpx', right:(card_bg_img_width*0.11)+'rpx'}" 
								class="package_list_mark_num">
								<view style="color: #FFFFFF;">
									<text v-if="current_card_detail.price">
										￥{{current_card_detail.price}}
									</text>
									<text v-else>免费</text>
								</view>
							</view>
						</view>
					</view>
					
					
				</view>
			
				<!-- 2021.08.09收藏切换按钮 -->
				<view class="card_detail_schang_boder"
					:style="{top:(card_bg_img_height*0.20)+'rpx', right:(card_bg_img_width*0.14)+'rpx'}"
					 v-if="current_card_detail">
					<image class="card_detail_schang" 
						src="https://yanyubao.tseo.cn/Tpl/static/nft_card/xingxing.png" 
						v-if="current_card_detail.is_favorite == 1" 
						@tap="set_favorite(0)">
					</image>
						
					<image class="card_detail_schang" 
						src="https://yanyubao.tseo.cn/Tpl/static/nft_card/xingxing01.png"
						v-if="current_card_detail.is_favorite == 0" 
						@tap="set_favorite(1)">
					</image>
					
					<view style="padding-top: 20rpx;">
						<!-- 2021.08.30相机 -->
						<view class="card_detail_schang_boder" 
							@tap="package_showPosterModal()">
							<image src="https://yanyubao.tseo.cn/Tpl/static/nft_card/ps.png"
								mode="widthFix" class="card_detail_ps">
							</image>
						</view>
						<view class="show_modal_mask" 
							v-if="showPosterModal" 
							@tap="showPosterModal=false"
							@touchmove.stop.prevent = "doNothing">
						</view>
						
						<!-- 海报模态框 -->
						<view class="show_modal_pop" v-if="showPosterModal">
							<image :src="current_nftcard_poster.img_url" 
								mode="widthFix" style="width:600rpx" >
							</image>
							<!--#ifndef MP-WEIXIN  -->
								<button class="purple_btn btn_box" 
									@click="saveImgToLocal" 
									style="color: #FFFFFF;"
									:style="{background:wxa_shop_nav_bg_color}">
									保存到相册
								</button>
							<!-- #endif -->
							
							<!-- #ifdef MP-WEIXIN -->
								<button v-if="openSettingBtnHidden" 
									class="purple_btn btn_box" 
									@click="saveEwm" 
									style="color: #FFFFFF;"
									:style="{background:wxa_shop_nav_bg_color}">
									保存到相册
								</button>
								
								<button v-else class="purple_btn btn_box" 
									hover-class="none" open-type="openSetting"
									style="color: #FFFFFF;"
									@opensetting='handleSetting'>
									保存到相册
								</button>
							<!-- #endif -->
						</view>
						
						
					</view>
					
				</view>
				
			</view>
			
			
			<!-- 卡牌信息 -->
			<view class="card_detail_xinxi" v-if="current_card_detail">
				<!-- 有多少人收藏 -->
				<view style="float: right;">
					<image class="card_detail_xing"
						src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_star2.png">
						<text style="color: #666666;padding-left: 6rpx;">
							{{current_card_detail.favorite_count}}
						</text>
					</image>
				</view>
				
				<!-- 卡牌名称 -->
				<h4 class="card_detail_title"
					v-if="current_card_detail">
					{{current_card_detail.card_name}}
				</h4>
				
				<view style="font-size: 30rpx;">
					<!-- 卡牌介绍 -->
					<view>{{current_card_detail.brief}}</view>
					<!-- 获得的卡牌序号 -->
					<view v-if="current_card_detail && current_card_detail.user_have_list">
						已获得：
						<block v-for="(cpl_item , index001) in current_card_detail.user_have_list"
							:key="index001">
							#{{cpl_item.cplseq}}
							<!-- 最后一个字符不加’，‘ -->
							<!-- {{index001 == current_card_detail.user_have_list.length-1 ? " ":" ,"}} -->
						</block>
					</view>
				</view>
				
				
				<view style="color: #868686;">
					<view v-if="current_card_detail.buy_limit != 0">
						<text style="color: #ff0000;">每人限购{{current_card_detail.buy_limit}}张</text>
					</view>
					<view>
						分发进度（{{current_card_detail.sale_counter}}/{{current_card_detail.publish_counter}}）
					</view>
					
					<!-- 进度条 -->
					<view v-if="current_card_detail ">
						<progress :percent="current_card_detail.sale_percent" 
							stroke-width="4" show-info="true" activeColor="#30C478"
							backgroundColor="red" font-size="14" active="true" 
							active-mode="forwards">
						</progress>
					</view>
					
				</view>
			</view>
			
			
			
			<!-- 所属卡包信息-->
			<view class="card_detail_suoshukabao">
				<h4 class="card_detail_h4"
					:style="{color: wxa_shop_nav_bg_color, borderBottom: wxa_shop_nav_bg_color+' 2rpx solid'}">
					<image class="card_detail_tubiao"
						src="https://yanyubao.tseo.cn/Tpl/static/nft_card/suoshukabaotubiao.png">
					</image>
					<text>所属卡包</text>
				</h4>
				
				<view style="display: flex;" v-if="current_card_detail">
					<view>
						<image :src="current_package_detail.cover_img_url_stand"
							@tap="go_to_card_package(current_package_detail.packageid)"
							class="card_detail_kabaotoxiang">
						</image>
					</view>
					<view class="card_detail_kabaoxinxi" 
						@tap="go_to_card_package(current_package_detail.packageid)">
						<view class="card_packages_title">
							{{current_card_detail.package_title}}
						</view>
						<view class="card_detail_suoshukabao_jieshao">
							{{current_package_detail.brief}}
						</view>
					</view>
				</view>
			</view>
			
			
			<!-- 同系列卡牌 -->
			<view class="card_detail_tong">
				<h4 class="card_detail_h5"
					:style="{color: wxa_shop_nav_bg_color, borderBottom: wxa_shop_nav_bg_color+' 2rpx solid'}" >
					<image class="card_detail_tubiao" 
						src="https://yanyubao.tseo.cn/Tpl/static/nft_card/tongxilitubiao.png">
					</image>
					<text>同系列卡牌</text>
				</h4>
				<scroll-view scroll-x="true">
					
					<view style="display: flex;position: relative;">
						<view class="card_list"
							v-for="(current_card_list_item, index) in current_card_list"
							:key="index"
							@tap="go_to_card_detail(current_card_list_item.packageid, current_card_list_item.cardid)">
								
							<view>
								 
								<!--是否购买  加灰透明 加水印 -->
								<view class="card_detail_is_buyed">
									<image v-if="current_card_list_item.is_buyed == 0" 
										class="package_card_watermark" 
										src="https://yanyubao.tseo.cn/Tpl/static/nft_card/watermark01.png" 
										mode="widthFix" >
									</image>
									<image v-if="current_card_list_item.is_buyed == 0" 
										class="package_card_img" :src="current_card_list_item.cover_img_url_2x3_stand" 
										style="opacity:0.7 ;">
									</image>
									<image v-if="current_card_list_item.is_buyed == 1" 
										class="package_card_img" :src="current_card_list_item.cover_img_url_2x3_stand">
									</image>
								</view>
								
								<!-- 卡牌名称 -->
								<view class="card_detail_kapai_title">
									{{current_card_list_item.card_name}}
								</view>
								
							</view>
							
						</view>
					</view>
					
				</scroll-view>
			</view>
			
			
			<!-- 富媒体文本展示卡牌详情 -->
			<view class="card_detail_xiangqing">
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
			
		</view>
		

		<!-- 悬浮 -->
		<view class="card_detail_footer">
			<!-- 线索按钮 -->
			<view @click="layOut">
				<!-- 线索未亮按钮 -->
				<view @click="showModal_xiansuo=true" v-if="lay_type" 
				class="card_detail_liebiao">
					<image class="card_detail_xiaoxi1" 
						src="https://yanyubao.tseo.cn/Tpl/static/nft_card/tips2.png">
					</image>				
				</view>
				<view class="show_modal_mask" 
					v-if="showModal_xiansuo" 
					@click="showModal_xiansuo=false">
				</view>
				<!-- 线索点亮按钮 -->
				<view style="padding-bottom: 115rpx;"
					v-if="showModal_xiansuo" 
					@click="showModal_xiansuo=false">
					<view class="card_detail_liebiao_xiaoxi">
						<image class="card_detail_xiaoxi2"
							src="https://yanyubao.tseo.cn/Tpl/static/nft_card/tips2.png">
						</image>
					</view>
				</view>
				<!-- 线索模态框 -->
				<view @click="showModal_xiansuo=false">
					<view class="show_modal_pop card_detail_xiansuo" 
						v-if="showModal_xiansuo">
						<scroll-view scroll-y="true" class="scroll-Y">
							<view>
								<view v-if="current_package_detail.clue" 
									style="word-break: break-word;">
									{{current_package_detail.clue}}
								</view>
								<view v-else>还没有线索~</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			
			<!-- 分享 -->
			<view>
				<!-- #ifdef MP -->
					<button open-type="share" 
						class="button_fenxiang_border">
						<view class="card_detail_liebiao" 
							style="padding: 0rpx; margin: 0rpx;">
							<image class="card_detail_fenxiang" 
								style="padding-left: 7rpx;"
								src="https://yanyubao.tseo.cn/Tpl/static/nft_card/share.png">
							</image>
						</view>
					</button>
				<!-- #endif -->
				
				<!-- #ifdef APP-PLUS -->
				<button @click="is_show">
					<view class="card_detail_liebiao" >
						<image class="card_detail_fenxiang"
							src="https://yanyubao.tseo.cn/Tpl/static/nft_card/share.png">
						</image>
					</view>
				</button>
				<!-- #endif -->
				
				<!-- #ifdef H5 -->
				<view @tap="share_shang_detail">
					<view class="card_detail_liebiao" >
						<image class="card_detail_fenxiang"
							src="https://yanyubao.tseo.cn/Tpl/static/nft_card/share.png">
						</image>
					</view>
				</view>
				<!-- #endif -->
			</view>
			
			<!-- 2021.08.20赠予 -->
			<view>
				<view @tap="go_to_gift_card(current_cardid)"
					class="card_detail_showmodal_zengsong"
					:style="{backgroundColor:wxa_shop_nav_bg_color}">
					<image class="card_detail_showmodal_tupian"
						src="https://yanyubao.tseo.cn/Tpl/static/nft_card/zengsong2.png">
					</image>
				</view>
			</view>
			
			<!-- 2021.08.06购买 -->
			<block v-if= "nft_card_hidden_buy_button != 1">
				<view v-if="current_card_detail.is_buy_limit != -1"
					class="card_detail_goumai1" 
					:style="{backgroundColor:wxa_shop_nav_bg_color}" 
					@tap="test_goto_buy">
					<image class="card_detail_an" 
						src="https://yanyubao.tseo.cn/Tpl/static/nft_card/goumai.png">
					</image>
				</view>
				
				<!-- 购买达到限制颜色变灰 -->
				<view v-else 
					class="card_detail_goumai_xianzi" 
					@tap="test_goto_buy">
					<image class="card_detail_an" 
						src="https://yanyubao.tseo.cn/Tpl/static/nft_card/goumai.png">
					</image>
				</view>
			</block>
			
			<!-- 卡牌明细 -->
			<view>
				<!-- 卡牌持有的数量 底部按钮 -->
				<view @click="showModal_liuzhuanjilv=true">
					<view class="card_detail_goumai2">
						<image class="card_detail_items"
							src="https://yanyubao.tseo.cn/Tpl/static/nft_card/cheng.png">
						</image>
						<view style="font-size: 35rpx;padding-top: 20rpx;padding-right: 5rpx;">
							{{current_card_detail.buyed_counter}}
						</view>
					</view>
				</view>
				<!-- 卡牌持有的数量 顶部按钮 -->
				<view class="show_modal_mask" 
					v-if="current_card_detail && showModal_liuzhuanjilv"
					@click="showModal_liuzhuanjilv=false">
				</view>
				<view v-if="showModal_liuzhuanjilv" 
					@click="showModal_liuzhuanjilv=false">
					<view class="card_goumai2_modal">
						<image class="card_detail_items"
							src="https://yanyubao.tseo.cn/Tpl/static/nft_card/cheng.png">
						</image>
						<view class="card_detail_buyed_counter">
							{{current_card_detail.buyed_counter}}
						</view>
					</view>
				</view>
				
				<!-- 卡牌明细记录模态框 -->
				<view class="show_modal_pop card_detail_showmodal_fenxaingjilv" 
					v-if="showModal_liuzhuanjilv">
					<view v-if="current_card_detail.is_buyed == 1">
					<!-- <view> -->
						<scroll-view scroll-y="true" class="scroll-Y">
							<view v-for="(card_publish_item, index) in current_card_publish_list"
								:key="index">
								<view class="card_detail_goumaijilv" 
									@click="showModal_liuzhuanjilv_zengsong=true">
									
									<view style="display: flex;">
										<view class="card_detail_modal_kapaimingxi">卡牌id：</view>
										<b style="font-size: 34rpx;">{{card_publish_item.cplno}}</b>
									</view>
									<view style="display: flex;">
										<view class="card_detail_modal_kapaimingxi">序号：</view>
										<b style="font-size: 34rpx;">#{{card_publish_item.cplseq}}</b>
									</view>
									<view style="display: flex;">
										<view class="card_detail_modal_kapaimingxi">获得时间：</view>
										<b style="font-size: 34rpx;">{{card_publish_item.updatetime}}</b>
									</view>
									<view style="display: flex;">
										<view class="card_detail_modal_kapaimingxi">获得方式：</view>
										<b style="font-size: 34rpx;">{{card_publish_item.is_private_str}}</b>
									</view>
									
									<view style="float: right;margin-top: -215rpx;">
										<!-- 2021.08.20销毁  丢弃 -->
										<view class="card_detail_showmodal_zengsong">
											<image class="card_detail_showmodal_tupian"
												src="https://yanyubao.tseo.cn/Tpl/static/nft_card/xiaohui.png"
												@tap="nftcard_discard(card_publish_item.cplid)"></image>
										</view>
											
									</view>
								</view>
								
							</view>
						</scroll-view>
					
					</view>
					<view class="card_detail_xiansuo" v-else>您还没有获取记录哦~</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import util from '../../common/util.js';

	// #ifdef MP-ALIPAY
	import parseHtml from "../../common/html-parser.js"
	// #endif

	export default {
		name:'try',
		data() {
			return {				
				isRolling:false,//模态框图片翻转
				
				lay_type:1,//详情隐藏控件
				
				showPosterModal: false,
				
				showModal_kapaifengmian: false,//卡牌封面模态框
				
				showModal_xiansuo: false,//线索模态框
				
				showModal_liuzhuanjilv: false,//流转模态框
				
				showModal_liuzhuanjilv_zengsong:false,//流转里的模态框
				
				showModal_zengyu:false,//赠予模态框
				
				current_params_str: '', //网址参数

				current_card_detail: null,
				current_card_list: null,
				current_package_detail: null,
				current_nftcard_poster:null,
				current_card_publish_list: null,//获取单张卡牌的购买记录
				
				current_nftcard_gift_or_discard: null,//赠送和购买
				
				current_cardid: 0,
				current_packageid: 0,

				card_description: '',
				
				//屏幕的宽度和高度
				windowHeight: 0,
				windowWidth: 0,
				
				card_bg_img_width:'750',
				card_bg_img_height:'',
				
				wxa_shop_nav_bg_color: '#30C478',
				
				//控制是否显示购买按钮
				nft_card_hidden_buy_button:0,
				
				
				
				current_data_type: '',
				current_new_user_modile: null,
				current_sender_name: null,
				current_sender_wish: null,
				
				openSettingBtnHidden:true,
			};
		},
		onLoad: function(options) {
			// this.addPercent();

			console.log('当前时间：' + util.formatTime(new Date()) + ' ' + util.formatTime2(new Date()) + ':01');

			console.log('pages/nftcard/card_detail ====>>>>', options);

			var that = this;
			
			// 页面加载默认界面
			that.current_card_detail = {
				'title': ' '
			};
			
			that.current_card_detail.cover_img_url = 'https://yanyubao.tseo.cn/Tpl/static/nft_card/default_card_cover.png';
			that.current_card_detail.description = '';
			that.current_card_detail.cover_img_url_2x3 = 'https://yanyubao.tseo.cn/Tpl/static/nft_card/default_card_cover.png';
			that.current_card_detail.cover_img_back_url = 'https://yanyubao.tseo.cn/Tpl/static/nft_card/default_card_cover.png';
			that.current_card_detail.is_favorite = 0;//是否收藏
			that.current_card_detail.card_name = '';
			that.current_card_detail.createtime = '';
			that.current_card_detail.favorite_count = 0;//有多少人收藏

			that.current_card_detail.package_title = '';
			// that.current_card_detail.supplier_name = '';
			that.current_card_detail.is_buyed = 0;//是否购买
			that.current_card_detail.clue = '';
			
			that.current_card_detail.buyed_counter= 0 ;//购买卡的次数
			
			
			that.current_card_detail.sale_counter = 0;//领取了多少   售出的数量
			that.current_card_detail.publish_counter = 0; //发售的数量
			
			that.current_card_detail.sale_percent = 50;
			
			that.current_nftcard_poster = {};
			
			
			that.current_package_detail = {
				'title': ' '
			};
			
			that.current_package_detail.brief = ''; //卡包介绍
			
			
			// that.current_package_detail = {
			// 	'title': ' '
			// };
			
			// that.current_package_detail.brief = ''; //卡包介绍
			
			
			// that.current_card_publish_list.cplseq=0;//卡牌序号

			
			/*
			uni.showLoading({
				title:'数据加载中...',
				
			});
			
			setTimeout(function(){
				uni.hideLoading();
			}, 2000);
			

			uni.setNavigationBarTitle({
				title: that.abotapi.globalData.default_shopname
			});
			*/
		   
			uni.setNavigationBarTitle({
				title: '卡牌详情',
			});
			
			//========== 获取屏幕的宽度和高度 =====
			/*var system_info = uni.getSystemInfoSync();
			
			console.log('getSystemInfo==>>>system_info==>>>', system_info)
			console.log('getSystemInfo==>>>system_info==>>>', system_info.windowWidth)
			that.windowWidth = system_info.windowWidth;
			that.windowHeight = system_info.windowHeight;*/
			//========== End =============
			
			
			
			//========== 如果是通过带参二维码进来的 =========
			if(options.scene && (options.scene.indexOf('nft_cd_') != -1) ){
				options.cardid = options.scene.replace('nft_cd_', '');
				
				console.log('通过小程序码扫描进入，卡牌ID====>>>>>'+options.cardid);
			}
			//================== End =====================
			
			
			that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);


			//=== 参数拼接 ====
			this.current_params_str = '';

			for (var key in options) {
				this.current_params_str += key + '=' + options[key] + '&';
			}
			if (this.current_params_str != '') {
				this.current_params_str = this.current_params_str.substr(0, this.current_params_str.length - 1);
			}
			//======== End ============



			that.current_cardid = options.cardid;
			that.current_packageid = options.packageid;
			// that.data.current_card_detail.createTime = that.data.current_card_detail.createtime.substring(0,10);

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


			//以下数据需要登陆后再发请求
			
			

		},

		onShow: function() {
			console.log('call onShow function (/pages/index/index)');
			
			
			
		},
		onPageScroll: function(e) {
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
			this.headerTop = e.scrollTop >= 0 ? null : 0;
			this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
			

		},

		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh: function() {
			var that = this;

			console.log('onPullDownRefresh=====>>>>>');

			// #ifndef MP-ALIPAY
			uni.showLoading({
				title: '数据更新中……',
				icon: 'loading',
			});
			// #endif

			// #ifdef MP-ALIPAY
			uni.showLoading({
				title: '数据更新中……',
				//icon:'loading', 	//支付宝不支持icon为 loading
				//duration:2000
			});
			// #endif
			
			
			that.__get_card_detail();
			
			setTimeout(function(){
				uni.hideLoading();
			}, 2000);
			


		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom: function() {

			//this.get_product_list();

		},
		//微信分享给好友
		onShareAppMessage: function() {
			var that = this;

			var share_title = that.current_card_detail.card_name;
			
			if(that.abotapi.get_user_info()){
				if(that.abotapi.get_user_account_info()){
					var account_info = that.abotapi.get_user_account_info();
					console.log('昵称==========>',account_info);
					
					share_title = account_info.nickname + '向您分享了卡牌' + share_title;
				}
			}
			
			if (share_title.length > 22) {
				share_title = share_title.substr(0, 20) + '...';
			}

			var share_path = 'pages/nftcard/card_detail?sellerid=' + that.abotapi.globalData.default_sellerid;
			share_path += '&packageid='+that.current_packageid;
			share_path += '&cardid='+that.current_cardid;

			//如果登录了，则带上分享者的userid
			var userInfo = this.abotapi.get_user_info();
			if (userInfo && userInfo.userid) {
				share_path += '&userid=' + userInfo.userid;
			}

			var share_img = that.current_card_detail.cover_img_url_stand;
			if(!share_img){
				share_img = that.current_card_detail.cover_img_url_2x3;
			}
			
			console.log('111111111111111111111111111111'+that.current_card_detail.cover_img_url_stand);
			
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
		//微信分享到朋友圈
		onShareTimeline: function() {
			return this.share_return();
		},
		//截图
		onAddToFavorites: function() {
			return this.share_return();
		},
		methods: {
			share_return: function() {
				var that = this;
				
				var share_title = that.current_card_detail.card_name;
				if (share_title.length > 22) {
					share_title = share_title.substr(0, 20) + '...';
				}
				
				var share_path = 'sellerid=' + that.abotapi.globalData.default_sellerid;
				share_path += '&packageid='+that.current_packageid;
				share_path += '&cardid='+that.current_cardid;
				
				//如果登录了，则带上分享者的userid
				var userInfo = this.abotapi.get_user_info();
				if (userInfo && userInfo.userid) {
					share_path += '&userid=' + userInfo.userid;
				}
				
				var share_img = that.current_card_detail.cover_img_url_stand;		
				if(!share_img){
					share_img = that.current_card_detail.cover_img_url_2x3;
				}
				
				console.log('111111111111111111111111111111'+that.current_card_detail.cover_img_url_stand);
				
				return {
					title: share_title,
					query: share_path,
					imageUrl: share_img,
				}
				
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
			
			
			
			
			//详情按钮显示隐藏
			layOut(){
			      if(this.lay_type == 0){
			        this.lay_type = 1
			      }else{
			         this.lay_type = 0
			      }
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
				abotsharejs.click_wxa_share(this.share_href, this.share_titles, this.share_summary, this.share_imageUrl);
			},
			
			
			callback_function_shop_option_data: function(that, cb_params) {

				console.log('当前调试开关22：' + this.system_debug_flag);
				console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);

				if (!cb_params) {
					return;
				}

				console.log('cb_params====', cb_params);
				
				
				that.wxa_shop_nav_bg_color  = cb_params.option_list.wxa_shop_nav_bg_color;
				
				if(cb_params.option_list.nft_card_hidden_buy_button == 1){
					console.log('nft_card_hidden_buy_button=========>>>>', 1);
					
					that.nft_card_hidden_buy_button = 1;
				}
				
			},

			set_favorite: function(value001) {
				var that = this;
				
				
				//======= 判断用户是否登录 ============
				var last_url = '/pages/nftcard/card_detail?' + that.current_params_str;

				var userInfo = that.abotapi.get_user_info();
				if (!userInfo) {
					that.abotapi.goto_user_login(last_url);

					return;
				}
				//============= End ================



				//请求服务器接口、收藏卡牌
				var post_data = {
					sellerid: that.abotapi.globalData.default_sellerid,
					packageid: that.current_packageid,
					cardid: that.current_card_detail.cardid,

				};

				var userInfo = that.abotapi.get_user_info();
				if (userInfo) {
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				}


				//添加收藏
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url +
						'/openapi/NftCardData/card_favorite_add',
					method: 'post',
					data: post_data,
					success: function(res) {

						if (res.data.code != 1) {
							uni.showToast({
								title: '操作失败',
								duration: 2000,
							});
							
							return;
						}

						uni.showToast({
							title: res.data.msg,
							duration: 2000,
						});

						
						//请求成功之后，修改本地的数据
						that.current_card_detail.is_favorite = value001;
						
						if (value001 == 1) {
							that.current_card_detail.favorite_count++;
						} else {
							that.current_card_detail.favorite_count--;
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


			test_goto_buy: function() {
				var that = this;

				console.log('tgggggggggggggggggg_buy');
				
				if( (that.current_card_detail.publish_counter > 0)
					&& (that.current_card_detail.publish_counter <= that.current_card_detail.sale_counter) ){
					uni.showModal({
						title:'提示',
						content:'卡牌已售罄',
						showCancel:false
					})
					
					return;
				}
				
				
				if(that.current_card_detail.is_buy_limit == -1){
					uni.showModal({
						title:'提示',
						content:'超过购买数量限制',
						showCancel:false
					})
					
					return;
				}
				

				var productid = that.current_card_detail.productid;
				var price = that.current_card_detail.price;
				var extraData = that.current_card_detail.extraData;

				var new_url = '/pages/order/pay?productid=' + productid + '&total=' + price + '&extraData=' + extraData;
				
				console.log('准备跳转到购买页面：' + new_url);

				uni.navigateTo({
					url: new_url
				})
				
				//that.current_card_detail.buyed_counter ++;

			},

			go_to_card_package: function(packageid) {
				console.log('packageid===>>>' + packageid);

				uni.navigateTo({
					url: '/pages/nftcard/package_detail?packageid=' + packageid,
				})
			},

			go_to_card_detail: function(packageid, cardid) {
				console.log('packageid===>>>' + packageid);
				console.log('cardid===>>>' + cardid);

				uni.navigateTo({
					url: '/pages/nftcard/card_detail?packageid=' + packageid + '&cardid=' + cardid,
				})
			},
			
			go_to_gift_card:function(cardid){
				var that = this;
				
				//======= 判断用户是否登录 ============
				var last_url = '/pages/nftcard/card_detail?' + that.current_params_str;
				
				var userInfo = that.abotapi.get_user_info();
				if (!userInfo) {
					that.abotapi.goto_user_login(last_url);
				
					return;
				}
				//============= End ================
				
				if(that.current_card_detail.buyed_counter == 0){
					uni.showModal({
						title:'提示',
						content:'您还未获得卡牌，不能赠送给好友',
						showCancel:false
					})
					
					return;
				}
				
				console.log('cardid===>>>' + cardid);
				
				uni.navigateTo({
					// url: '/pages/nftcard/gift_card?cardid='+cardid,
					url: '/pages/nftcard/gift_card?cardid=' + cardid,
				})
			},
			
			// 2021.08.09获取卡牌封面的真实宽度
			imageLoad: function (e) {
				var that = this;
				
				//图片的宽度和高度
			    var imgwidth = e.detail.width;
			    var imgheight = e.detail.height;
				
			    //宽高比  
			    var ratio = imgwidth / imgheight;
				
				console.log('imageLoad id===>>> '+e.target.dataset.id +'图片实际大小：');
			    console.log(imgwidth, imgheight)
				
				that.windowWidth = 750;
				
				console.log('窗体的宽度：' + that.windowWidth);
				
			    //计算的高度值  
				that.card_bg_img_width = that.windowWidth;
				that.card_bg_img_height = that.card_bg_img_width / ratio;
				
				
			   
			},
			
			__get_card_list:function(){
				var that = this;
				
				//获取卡牌列表
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_card_list',
				
					method: 'post',
					data: {
						sellerid: that.abotapi.globalData.default_sellerid,
						packageid: that.current_packageid,
						// cardid: that.current_cardid,
						except_cardid: that.current_cardid,
					},
					success: function(res) {
				
						if (res.data.code != 1) {
							uni.showToast({
								title: '卡包详情没有数据',
								duration: 2000,
							});
				
							return;
						}
				
						that.current_card_list = res.data.data;
				
						console.log('current_card_list ===>>> ', that.current_card_list);
				
				
					},
					fail: function(e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					},
				});
				
				
				
			},
			__get_package_detail:function(){
				var that = this;
				
				//获取卡包详情
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_package_detail',
				
					method: 'post',
					data: {
						sellerid: that.abotapi.globalData.default_sellerid,
						packageid: that.current_packageid,
					},
					success: function(res) {
				
						if (res.data.code != 1) {
							uni.showToast({
								title: '卡包详情没有数据',
								duration: 2000,
							});
				
							return;
						}
				
						that.current_package_detail = res.data.data;
				
						console.log('current_package_detail ===>>> ', that.current_package_detail);
				
				
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
			//丢弃
			nftcard_discard:function(cplid){				var that = this;								uni.showModal({					title: '',					content: '是否确认丢弃',					cancelText: '取消',					confirmText: '确认',					success: function (res){						if(res.confirm){							console.log('用户点击了确认');							that.__nftcard_gift_or_discard(cplid, 'discard');						} else if (res.cancel) {							console.log('用户点击取消');						}					}				})											},

			
			__nftcard_gift_or_discard:function(cplid, data_type, wish='', mobile=''){
				var that = this;
				
				var post_data = {
					sellerid: that.abotapi.globalData.default_sellerid,
					cplid: cplid,
					data_type: data_type,
					//new_user_modile: that.current_new_user_modile,
					//sender_name: that.current_sender_name,
					//sender_wish: that.current_sender_wish,
				};
				
				
				if(data_type == 'gift'){
					post_data.sender_wish = wish;
					post_data.new_user_modile = mobile;
				}
				
				//赠送和丢弃
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/nftcard_gift_or_discard',
				
					method: 'post',

					data: post_data,

					success: function(res) {
						if(data_type == 'gift'){
							//赠予
							console.log("赠予11111111111111111111111")
						}
						if(data_type == 'discard'){
							//丢弃
							console.log("丢弃22222222222222222222222")
						}
						
						if (res.data.code != 1) {
							uni.showModal({
								title:'处理失败',
								content:res.data.msg,
								showCancel:false
							})
							
							return;
						}
				
						that.current_nftcard_gift_or_discard = res.data.data;
				
						console.log('current_nftcard_gift_or_discard ===>>> ', that.current_nftcard_gift_or_discard);
						
						that.__get_card_publish_list();
						that.__get_card_detail();
						
						//减少卡牌的数量
						that.current_card_detail.buyed_counter --;
				
				
					},
					fail: function(e) {
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
				
				var last_url = '/pages/nftcard/gift_friends_card?'+ that.current_params_str;
				
				var userInfo = that.abotapi.get_user_info();
				if (!userInfo) {
					that.abotapi.goto_user_login(last_url);
				
					return;
				}
				//============= End ================
				
					
				var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					packageid:that.current_packageid,
					cardid:that.current_cardid,
					data_type:'card',		
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
			
			__get_card_detail:function(){
				
				var that = this;
				
				
				//获取卡牌详情
				var post_data = {
					sellerid: that.abotapi.globalData.default_sellerid,
					cardid: that.current_cardid,
				};
				
				if(that.current_packageid){
					post_data.packageid = that.current_packageid;
				}
				
				var userInfo = that.abotapi.get_user_info();
				if (userInfo) {
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				}
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_card_detail',
					method: 'post',
					data: post_data,
					success: function(res) {
						
						uni.hideLoading();
				
						if (res.data.code != 1) {
							uni.showToast({
								title: '卡牌列表没有数据',
								duration: 2000,
							});
				
							return;
						}
						//断开连接
						// return;
				
						that.current_card_detail = res.data.data;
						
				
						console.log('current_card_detail ===>>> ', that.current_card_detail);
						
						that.current_packageid = that.current_card_detail.packageid;
						
						//卡包详情
						that.__get_package_detail();
						
						//卡牌列表
						that.__get_card_list();
						
						//购买的卡牌
						that.__get_card_publish_list();
						
						// if(that.action_data_type == 'my_favorite_list'){
						// 	uni.setNavigationBarTitle({
						// 		title : '我收藏的卡牌'
						// 	});
						// }
						// else if(that.action_data_type == 'my_card_buy_list'){
						// 	uni.setNavigationBarTitle({
						// 		title : '我购买的卡牌'
						// 	});
							
						// }
						
						
						
						that.current_card_detail.user_have_counter= 0;//购买卡的次数
						
						//计算已经售出的备份比
						that.current_card_detail.sale_percent = 50;
						
						if(that.current_card_detail.publish_counter == 0){
							that.current_card_detail.sale_percent = 100;
						}
						else{
							that.current_card_detail.sale_percent = parseInt((that.current_card_detail.sale_counter)/that.current_card_detail.publish_counter*100);
						}
						
						
						
				
				
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
		}



	}
</script>
<style lang="scss">
	#try{
		.rollbox{
			position: relative;
			perspective: 1000px;
			text-align: center;
			vertical-align:center;
	    &_front,
		&_behind{
			transform-style: preserve-3d; //表示所有子元素在3D空间中呈现
			backface-visibility: hidden;  //元素背面向屏幕时是否可见
	        transition-duration:0.5s;
			transition-timing-function:'ease-in';
			.contentbox{
				display: flex;
				justify-content: center;
				align-items: center;
			}
	    }
	    &_behind{
	      transform: rotateY(180deg);
	      visibility:hidden;  //元素不可见，但占据空间
	      position: absolute;
	      top:0;
	      bottom:0;
	      right: 0;
	      left: 0;
	    }
	 }
	 .box_rolling{
	    .rollbox_front{
	      transform: rotateY(180deg);
	      visibility:hidden;
	    }
	    .rollbox_behind{
	      transform: rotateY(360deg);
	      visibility:visible;
	    }
	  }
	}
	
	.card_detail_xiansuo{
		background-color: #FFFFFF;
		position: absolute;
		width: 450rpx;
		border-radius: 30rpx;
		padding: 20rpx;
		border: 5rpx #c3c3c3 solid;
		background-color: #e2d281;
	}
	.card_detail_goumaijilv{
		line-height: 50rpx;
		padding: 15rpx;
		margin-bottom:25rpx;
		top: 40%;
		left: 50%;
		width: 550rpx;
		border-radius: 30rpx;
		border: 5rpx #c3c3c3 solid;
		background-color: #e2d281;
		z-index: 5;
	}
	.card_detail_showmodal_fenxaingjilv{
		width: 590rpx;
		padding: 20rpx;
	}
	.card_detail_modal_kapaimingxi{
		color: #666666;
		width: 180rpx;
		display: flex;
	}
</style>
<style>
	@import "./static/css/nftcard.css";
	
	.card_detail_xing {
		width: 30rpx;
		height: 30rpx;
	}
	.contentbox image{
		vertical-align: middle;
	}
	.main_body {
		width: 100%;
	}

	.card_detail_border {
		position: absolute;
		width: 100%;
		filter: blur(15rpx);
	}
	.card_detail_image {
		position: relative;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx #000000;
	}
	.package_list_mark_num{
		display: flex;
		position:absolute;
		z-index: 2;
		background: rgb(0,0,0,0.7);
		padding: 10rpx;
		margin-right: 10rpx;
		border-radius: 4rpx;
	}
	
	.card_detail_h4 {
		font-size: 30rpx;
		line-height: 60rpx;
		color: #30C478;
		border-bottom: #30c478 2rpx solid;
		width: 180rpx;
		text-align: center;
		margin-bottom: 20rpx;
	}
	.card_detail_tubiao{
		width: 35rpx;
		height: 35rpx;
		padding-right: 18rpx;
		margin-bottom: -5rpx;
		padding-left: 3rpx;
	}
	.card_detail_h5 {
		font-size: 30rpx;
		line-height: 60rpx;
		color: #30C478;
		border-bottom: #30c478 2rpx solid;
		width: 220rpx;
		text-align: center;
		margin-top: 25rpx;
		margin-left: 20rpx;
		padding-top: 15rpx;
	}
	.card_detail_tong{
		height: 500rpx;
		background-color: #FFFFFF;
		margin: 15rpx;
		border-radius: 15rpx;
	}
	
/* 收藏按钮 */
	.card_detail_schang_boder{
		width: 50rpx;
		height: 50rpx;
		padding-right: 10rpx;
		padding-bottom: 10rpx;
		border-radius: 50%;
		background: rgb(0, 0, 0,0.7);
		position: absolute;
	}
	.card_detail_schang {
		width: 40rpx;
		height: 40rpx;
		margin-top: 8rpx;
		margin-left: 11rpx;
	}
	.card_detail_ps {
		width: 36rpx;
		height: 36rpx;
		margin-top: 10rpx;
		margin-left: 12rpx;
	}
	/* 线索未亮按钮 */
	.card_detail_xiaoxi1 {
		width: 60rpx;
		height: 60rpx;
		padding-top: 14rpx;
		padding-left: 15rpx;
	}
	/* 线索点亮模态框按钮 */
	.card_detail_xiaoxi2 {
		position: fixed;
		z-index: 2;
		width: 60rpx;
		height: 60rpx;
		padding-top: 14rpx;
		padding-left: 15rpx;
	}
	.card_detail_liebiao_xiaoxi{
		background-color: #f4ea2a;
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		margin: 15rpx;
		margin-right: 23rpx;
		position: fixed;
		z-index: 999;
	}
	.card_detail_fenxiang {
		width: 50rpx;
		height: 50rpx;
		padding-top: 18rpx;
		padding-left: 20rpx;
	}
	.card_detail_showmodal_tupian {
		width: 40rpx;
		height: 40rpx;
		padding-top: 24rpx;
		padding-left: 24rpx;
	}
	.card_detail_showmodal_zengsong {
		background-color: #dff3e7;
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		margin: 15rpx;
		margin-right: 10rpx;
	}
	.card_detail_an {
		width: 45rpx;
		height: 45rpx;
		padding-top: 22rpx;
		padding-left: 24rpx;
	}
	.card_detail_lvjing{
		width: 90rpx;
		height: 90rpx;
		font-size: 27rpx;
		background-color: #8a9487;
		border-radius: 100%;
		margin: 15rpx;
		margin-right: 23rpx;
		border: #aeb8ab 3rpx solid;
	}
	.card_detail_items {
		width: 40rpx;
		height: 40rpx;
		padding-top: 20rpx;
		padding-left: 6rpx;
	}
	.card_detail_goumai1{
		width: 90rpx;
		height: 90rpx;
		font-size: 27rpx;
		background-color: #30C478;
		border-radius: 100%;
		margin: 15rpx;
		margin-right: 23rpx;
		z-index: 2;
	}
	.card_detail_goumai_xianzi{
		width: 90rpx;
		height: 90rpx;
		font-size: 27rpx;
		background-color: #8a8a8a;
		border-radius: 100%;
		margin: 15rpx;
		margin-right: 23rpx;
	}
	.card_detail_goumai2{
		display: flex;
		background-color: #ddf2e9;
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		margin: 15rpx;
		margin-right: 23rpx;
	}
	.card_goumai2_modal{
		position: fixed;
		z-index: 999;
		bottom: 0rpx;
		right: 10rpx;
		display: flex;
		background-color: #ddf2e9;
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		margin: 15rpx;
		margin-right: 23rpx;
	}
	.card_detail_kabaotoxiang {
		display: flex;
		width: 150rpx;
		height: 150rpx;
		border-radius: 20rpx;
		margin-right: 15rpx;
	}

	.card_detail_kabaoxinxi {
		line-height: 47rpx;
		padding-left: 15rpx;
	}
	.card_detail_xinxi {
		padding: 15rpx 20rpx;
		line-height: 55rpx;
		background-color: #FFFFFF;
		margin: 15rpx;
		border-radius: 15rpx;
		margin-bottom: 20rpx;
	}
	.card_detail_suoshukabao{
		padding: 15rpx;
		padding-bottom: 25rpx;
		background-color: #FFFFFF;
		margin: 15rpx;
		border-radius: 15rpx;
	}
	.card_detail_title {
		width: 85%;
		padding-bottom: 15rpx;
		text-align: left;
		font-size: 38rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.card_packages_title {
		font-size: 32rpx;
		color: #464646;
		width: 480rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.card_detail_footer {
		position: fixed;
		bottom: 0rpx;
		right: 0rpx;
		z-index: 3;
	}
	.card_detail_xiangqing{
		word-wrap:break-word;  
		word-break:break-all;
		background-color: #FFFFFF;
		border-radius: 15rpx;
		padding: 15rpx;
		margin: 15rpx;
	}
	.scroll-Y {
		max-height: 760rpx;
	}
	.card_detail_buyed_counter{
		font-size: 35rpx;
		padding-top: 20rpx;
		padding-right: 5rpx;
	}
	.card_list{
		margin:20rpx 10rpx 20rpx 20rpx;
		border-radius: 20rpx;
	}
	.package_card_img{
		width: 240rpx; 
		height: 360rpx;
		border-radius: 20rpx;
	}
	.package_card_watermark{
		width: 80rpx;
		position: absolute;
		margin-top: 140rpx;
		margin-left: 80rpx; 
		z-index: 1;
	}
	.card_detail_is_buyed{
		background-color: #000000;
		height: 360rpx;
		border-radius: 20rpx;
	}
</style>
