<template>
	<view style="background-color: #eceeef;">
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
					:style="{width: card_bg_img_width+'rpx', height: (card_bg_img_height*0.8)+'rpx'}" ></image>
				<!-- 卡牌封面 -->
				<!-- <view :style="{textAlign: 'center', paddingTop: (card_bg_img_height*0.15)+'rpx'}">
					<image :src="current_card_detail.cover_img_url" 
						class="card_detail_image"
						:style="{width: (card_bg_img_width*0.8)+'rpx', height: (card_bg_img_height*0.8)+'rpx'}"></image>
						
				</view> -->
				
				<!-- 2021.08.11卡牌封面 ==> 模态框 -->
				<view>
					<view class="show_modal_mask" v-if="showModal_kapaifengmian" @click="showModal_kapaifengmian=false"></view>
					<!-- 模态框 -->
					<!-- <view id="try" class="show_modal_pop" v-if="showModal_kapaifengmian"  :style="{paddingTop: (card_bg_img_height*0.6)+'rpx'}"> -->
					<view id="try" class="show_modal_pop" v-if="showModal_kapaifengmian" style="position: absolute;top: 50%;transform: translateY(-50%);">
							
						<!-- box_rolling下执行正面翻转动画   -->
						<div class="rollbox" style="vertical-align:center;" :class="{'box_rolling':isRolling}" @click="isRolling = !isRolling">
							<!-- 卡牌正面 -->
							<div class="rollbox_front">
								<div class="contentbox">
									<image :src="current_card_detail.cover_img_url_2x3"
										class="card_detail_image"
										:style="{width: (card_bg_img_width*1)+'rpx', height: (card_bg_img_height*1)+'rpx'}"></image>
									<view style="display:inline-block; height:100%; vertical-align:middle;"></view>
								</div>
							</div>
							<!-- 卡牌反面 -->
							<div class="rollbox_behind">
								<div class="contentbox">
									<image :src="current_card_detail.cover_img_back_url"
										class="card_detail_image"
										:style="{width: (card_bg_img_width*1)+'rpx', height: (card_bg_img_height*1)+'rpx'}"></image>
									<view style="display:inline-block; height:100%; vertical-align:middle;"></view>
								</div>
							</div>
						</div>
							
							
					</view>
					<!-- 卡牌封面 -->
					<view @click="showModal_kapaifengmian=true" :style="{paddingTop: (card_bg_img_height*0.15)+'rpx',paddingLeft: (card_bg_img_width*0.1)+'rpx'}">
						<image :src="current_card_detail.cover_img_url_2x3" 
							class="card_detail_image" 
							:style="{width: (card_bg_img_width*0.8)+'rpx', height: (card_bg_img_height*0.8)+'rpx'}"></image>
							
					</view>
				</view>
			
				
				
				
				
				
				<!-- 2021.08.09收藏 -->
				<view class="card_detail_schang_boder"
					:style="{top:(card_bg_img_height*0.20)+'rpx', right:(card_bg_img_width*0.14)+'rpx'}"
					 v-if="current_card_detail">
					<image class="card_detail_schang" src="https://yanyubao.tseo.cn/Tpl/static/nft_card/xingxing.png" 
						v-if="current_card_detail.is_favorite == 1" @tap="set_favorite(0)"></image>
						
					<image class="card_detail_schang" src="https://yanyubao.tseo.cn/Tpl/static/nft_card/xingxing01.png"
					v-if="current_card_detail.is_favorite == 0" @tap="set_favorite(1)"></image>
				</view>
				
				
				
				
				
				<!-- 2021.08.06相机 -->
				<!-- <view style="position: absolute;right: 8%; top: 12%;background-color: #FFFFFF; border-radius: 50%;
		background: rgb(0, 0, 0,0.7);">
					<image class="card_detail_schang" src="https://yanyubao.tseo.cn/Tpl/static/nft_card/photograph.png"></image>
				</view> -->
				
			</view>
			
			
			
			
			
			<!-- 卡牌信息 -->
			<view class="card_detail_xinxi" v-if="current_card_detail">
				<!-- 有多少人收藏 -->
				<view style="float: right;">
					<view>
						<image class="card_detail_xing"
							src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_star2.png">
							{{current_card_detail.favorite_counter}}
						</image>
					</view>
				</view>
				<h4 class="card_detail_title" style="padding-bottom: 15rpx;width: 90%;" v-if="current_card_detail">{{current_card_detail.card_name}}
				</h4>
				
				
				<view style="color: #868686;font-size: 30rpx;">
					<view>
						#{{current_card_detail.publish_card_list.cplseq}}
					</view>
					<!-- <text>限购：{{current_card_detail.buy_limit}}张</text> -->
					<!-- 发行时间 -->
					<!-- <text id="card_detail_mystr" v-if="current_card_detail">{{current_card_detail.time_begin}}</text> -->
					
					<!-- <view >总共{{current_card_detail.faxing_counter}} 还剩{{current_card_detail.kucun_counter}} </view> -->
					<view style="font-size: 30rpx;">领取进度</view>
					
					
					<!-- 进度条 -->
					<view v-if="current_card_detail">
						<progress :percent="current_card_detail.sale_percent" stroke-width="4" show-info="true" activeColor="#30C478"
						 backgroundColor="red" font-size="14" active="true" active-mode="forwards"></progress>
					</view>
					
					
					
				</view>
			</view>
			
			
			
			<!-- 所属卡包信息-->
			<view class="card_detail_suoshukabao">
				<h4 class="card_detail_h4" :style="{color: wxa_shop_nav_bg_color, borderBottom: wxa_shop_nav_bg_color+' 2rpx solid'}">
					<image class="card_detail_tubiao" src="https://yanyubao.tseo.cn/Tpl/static/nft_card/suoshukabaotubiao.png"></image>所属卡包
				</h4>
				
				<view style="display: flex;" v-if="current_card_detail">
					<view>
						<image :src="current_package_detail.cover_img_url"
							@tap="go_to_card_package(current_package_detail.packageid)"
							class="card_detail_kabaotoxiang"></image>
					</view>
				
					<view class="card_detail_kabaoxinxi" @tap="go_to_card_package(current_package_detail.packageid)">
						<view class="card_packages_title">{{current_card_detail.package_title}}
						</view>
						<view style="color: #868686;font-size: 26rpx;width: 480rpx;font-weight: bold;
						overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
							{{current_package_detail.brief}}
						</view>
				
				
					</view>
				
				</view>
			</view>
			
			
			<!-- 同系列卡牌 -->
			<view class="card_detail_tong">
				<h4 class="card_detail_h5" style="margin-left: 20rpx;"
					:style="{color: wxa_shop_nav_bg_color, borderBottom: wxa_shop_nav_bg_color+' 2rpx solid'}" >
					<image class="card_detail_tubiao" src="https://yanyubao.tseo.cn/Tpl/static/nft_card/tongxilitubiao.png"></image>同系列卡牌
				
				</h4>
			
				<scroll-view scroll-x="true">
					<view style="display: flex;">
						<view v-for="(current_card_list_item,index) in current_card_list"
							@tap="go_to_card_detail(current_card_list_item.packageid, current_card_list_item.cardid)">
							
							<view class="slide_cards_pic">
								<image :src="current_card_list_item.cover_img_url_2x3" mode="aspectFill"
									class="card_detail_img_border"></image>
								<view class="card_detail_kapai_title">{{current_card_list_item.card_name}}
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
			<!-- 详情按钮切换 -->
			<!-- <view @click="layOut">
				<view @click="showModal_xiansuo=true" v-if="lay_type" class="card_detail_liebiao">
					<image class="card_detail_xiaoxi1"
						src="https://yanyubao.tseo.cn/Tpl/static/nft_card/tips.png"></image>				
				</view>
				<view v-else class="card_detail_liebiao_xiaoxi">
					<image v-if="showModal_xiansuo" @click="showModal_xiansuo=false" class="card_detail_xiaoxi2"
						src="https://yanyubao.tseo.cn/Tpl/static/nft_card/tips2.png"></image>
				</view>
				
			</view> -->
			
			
			<!-- 线索按钮 -->
			<view @click="layOut">
				<!-- 线索未亮按钮 -->
				<view @click="showModal_xiansuo=true" v-if="lay_type" 
				class="card_detail_liebiao">
					<image class="card_detail_xiaoxi1"
						src="https://yanyubao.tseo.cn/Tpl/static/nft_card/tips.png"></image>				
				</view>
				<view class="show_modal_mask" v-if="showModal_xiansuo" @click="showModal_xiansuo=false"></view>
				<!-- 线索点亮按钮 -->
				<view style="padding-bottom: 115rpx;" v-if="showModal_xiansuo" 
				@click="showModal_xiansuo=false">
					<view class="card_detail_liebiao_xiaoxi">
						<image class="card_detail_xiaoxi2"
							src="https://yanyubao.tseo.cn/Tpl/static/nft_card/tips2.png"></image>
					</view>
				</view>
				<!-- 线索模态框 -->
				<view @click="showModal_xiansuo=false">
					<view class="show_modal_pop card_detail_xiansuo" v-if="showModal_xiansuo">
						<scroll-view scroll-y="true">
							<view style="padding: 35rpx;">
								<view v-if="current_card_detail.clue" class="tree">{{current_card_detail.clue}}</view>
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
				style="background: none;outline: none;border: none;border: 0rpx; padding-left: 15rpx;">
					 <!-- class="card_detail_liebiao" -->
					<view class="card_detail_liebiao" style="padding: 0rpx; margin: 0rpx;" >
						<image class="card_detail_fenxiang" style="padding-left: 7rpx;"
							src="https://yanyubao.tseo.cn/Tpl/static/nft_card/fenxiang02.png"></image>
					</view>
				</button>
				<!-- <button style="padding-left: 0;padding-right: 0;" open-type="share">分享</button> -->
				<!-- #endif -->
				
				<!-- #ifdef APP-PLUS -->
				
				<button @click="is_show">
					
					<view class="card_detail_liebiao" >
						<image class="card_detail_fenxiang"
							src="https://yanyubao.tseo.cn/Tpl/static/nft_card/fenxiang02.png"></image>
					</view>
				</button>
				<!-- <button style="padding-left: 0;padding-right: 0;" open-type="share">分享</button> -->
				<!-- #endif -->
				
				
				<!-- #ifdef H5 -->
				<view @tap="share_shang_detail">
					<view class="card_detail_liebiao" >
						<image class="card_detail_fenxiang"
							src="https://yanyubao.tseo.cn/Tpl/static/nft_card/fenxiang02.png"></image>
					</view>
				</view>
				<!-- #endif -->
				
				
			</view>
			
			<!-- 未购买时不显示赠予和丢弃 -->
			<!-- <view v-if="current_card_detail.is_buyed == 1"> -->
				<!-- 2021.08.06赠予 -->
				<!-- <view class="card_detail_liebiao">
					<image class="card_detail_an"
						src="https://yanyubao.tseo.cn/Tpl/static/nft_card/zengsong.png"></image>
				</view> -->
					<!-- 2021.08.06丢弃 -->
				<!-- <view class="card_detail_liebiao">
					<image class="card_detail_an"
						src="https://yanyubao.tseo.cn/Tpl/static/nft_card/xiaohui.png"></image>
				</view> -->
			<!-- </view> -->
			<!-- 2021.08.06购买 -->
			<view v-if="current_card_detail.is_buy_limit != -1" class="card_detail_goumai1" 
				:style="{backgroundColor:wxa_shop_nav_bg_color}" 
				@tap="test_goto_buy">
				<image 
					class="card_detail_an" 
					src="https://yanyubao.tseo.cn/Tpl/static/nft_card/goumai.png"
				></image>
				
			</view>
			<!-- 购买达到限制颜色变灰 -->
			<view v-else class="card_detail_goumai1" style="background-color: #7f7f7f;"
				:style="{backgroundColor:wxa_shop_nav_bg_color}" 
				@tap="test_goto_buy">
				<image 
					class="card_detail_an" 
					src="https://yanyubao.tseo.cn/Tpl/static/nft_card/goumai.png"
				></image>
			</view>

			<!-- 2021.08.06卡牌持有的数量 -->
			
			<!-- <view class="card_detail_goumai2">
				<image class="card_detail_items"
				src="https://yanyubao.tseo.cn/Tpl/static/nft_card/cheng.png"></image>
				<view style="font-size: 35rpx;padding-top: 20rpx;padding-right: 5rpx;">
					{{current_card_detail.user_have_counter}}
				</view>
			</view> -->
			
			<!-- 卡牌明细 模态框 -->
			<view>
				<!-- 阴影底部*1按钮 -->
				<view @click="showModal_liuzhuanjilv=true">
					<view class="card_detail_goumai2">
						<image class="card_detail_items"
						src="https://yanyubao.tseo.cn/Tpl/static/nft_card/cheng.png"></image>
						<view style="font-size: 35rpx;padding-top: 20rpx;padding-right: 5rpx;">
							{{current_card_detail.buyed_counter}}
						</view>
					</view>
				</view>
				<!-- 顶部*1按钮 -->
				<view class="show_modal_mask" v-if="showModal_liuzhuanjilv" 
				@click="showModal_liuzhuanjilv=false"></view>
				<view v-if="showModal_liuzhuanjilv" @click="showModal_liuzhuanjilv=false">
					<view class="card_goumai2_modal">
						<image class="card_detail_items"
						src="https://yanyubao.tseo.cn/Tpl/static/nft_card/cheng.png"></image>
						<view style="font-size: 35rpx;padding-top: 20rpx;padding-right: 5rpx;">
							{{current_card_detail.buyed_counter}}
						</view>
					</view>
					
				</view>
				<view class="show_modal_pop card_detail_showmodal_fenxaingjilv" 
				v-if="showModal_liuzhuanjilv">
						<view v-if="current_card_detail.is_buyed == 1">
							
					<scroll-view scroll-y="true">
							<view v-for="(card_publish_item,index) in card_publish">
								<view class="card_detail_goumaijilv" 
								@click="showModal_liuzhuanjilv_zengsong=true">
									<view class="tree1">
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
									</view>
									
									
									
									<view style="float: right;margin-top: -215rpx;">
										<!-- 2021.08.20赠予 -->
										<view @click="showModal_zengyu=true" class="card_detail_showmodal_zengsong">
											<image class="card_detail_showmodal_tupian"
												src="https://yanyubao.tseo.cn/Tpl/static/nft_card/zengsong.png"></image>
										</view>
										
										<!-- 2 -->
										<!-- <view class="show_modal_mask" v-if="showModal_liuzhuanjilv_zengsong" 
										@click="showModal_liuzhuanjilv_zengsong=false"></view>
										<view class="show_modal_pop card_detail_showmodal_kapaimingxi" 
										v-if="showModal_liuzhuanjilv_zengsong">
											<view>
												记录记录记录记录记录
											</view>
											
										</view> -->
										<!-- <view class="show_modal_mask" v-if="showModal_zengyu"
										@click="showModal_zengyu=false"></view>
										<view class="show_modal_pop" 
										v-if="showModal_zengyu" style="background-color: #e1e1e1;">
											111111
										</view> -->
										
										<!-- 2021.08.20销毁 -->
										<view class="card_detail_showmodal_zengsong">
											<image class="card_detail_showmodal_tupian"
												src="https://yanyubao.tseo.cn/Tpl/static/nft_card/xiaohui.png"></image>
										</view>
										
										
									</view>
								</view>
								
							</view>
					</scroll-view>
					
					
						</view>
						<!-- <view v-else class="card_detail_goumaijilv">您还没有获取记录哦~</view> -->
						
					
				</view>
				<!-- <view v-else>您还没有购买记录哦~</view> -->
				
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
				
				showModal_kapaifengmian: false,//卡牌封面模态框
				
				showModal_xiansuo: false,//线索模态框
				
				showModal_fenxiang: false,//分享模态框
				
				showModal_liuzhuanjilv: false,//流转模态框
				
				showModal_liuzhuanjilv_zengsong:false,//流转里的模态框
				
				showModal_zengyu:false,//赠予模态框
				
				current_params_str: '', //网址参数

				current_card_detail: null,
				current_card_list: null,
				current_package_detail: null,
				card_publish: null,//获取单张卡牌的购买记录
				current_cardid: 0,
				current_packageid: 0,

				card_description: '',
				
				//屏幕的宽度和高度
				windowHeight: 0,
				windowWidth: 0,
				
				card_bg_img_width:'750',
				card_bg_img_height:'100',
				
				wxa_shop_nav_bg_color: '#30C478',
			};
		},
		onLoad: function(options) {
			// this.addPercent();

			console.log('当前时间：' + util.formatTime(new Date()) + ' ' + util.formatTime2(new Date()) + ':01');

			console.log('pages/tabBar/index/index====>>>>', options);

			var that = this;
			
			// 页面加载默认界面
			that.current_card_detail = {
				'title': ' '
			};
			that.current_card_detail.cover_img_url = 'https://yanyubao.tseo.cn/Tpl/static/nft_card/default_card_cover.png';
			that.current_card_detail.description = '';
			that.current_card_detail.cover_img_url_2x3 = 'https://yanyubao.tseo.cn/Tpl/static/nft_card/default_card_cover.png';
			that.current_card_detail.is_favorite = 0;
			that.current_card_detail.card_name = '';
			that.current_card_detail.createtime = '';
			that.current_card_detail.favorite_counter = 0;

			that.current_card_detail.package_title = '';
			that.current_card_detail.supplier_name = '';
			that.current_card_detail.is_buyed = 0;
			that.current_card_detail.clue = '';
			that.current_card_detail.user_have_counter= 0;//购买卡的次数
			// that.card_publish_list.cplseq=0;
			
			that.current_card_detail.sale_percent = 50;
			that.current_card_detail.sale_counter = 0;		//售出的数量
			that.current_card_detail.publish_counter = 0;		//发售的数量

			uni.showLoading({
				title:'数据加载中...',
				
			});
			
			setTimeout(function(){
				uni.hideLoading();
			}, 2000);
			

			uni.setNavigationBarTitle({
				title: that.abotapi.globalData.default_shopname
			});

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
					content: ',',
					showCancel: false
				});

				return;
			}

			
			
			


			//获取卡牌详情		
			var post_data = {
				sellerid: that.abotapi.globalData.default_sellerid,
				packageid: that.current_packageid,
				cardid: that.current_cardid,
			};

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


			//获取卡牌列表
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_card_list',

				method: 'post',
				data: {
					sellerid: that.abotapi.globalData.default_sellerid,
					packageid: that.current_packageid,
					cardid: that.current_cardid,
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
			
			if(!userInfo){
				return;
			}
			
			//以下数据需要登陆后再发请求
			
			//获取单张卡牌的购买记录列表
			post_data = {
				sellerid: that.abotapi.globalData.default_sellerid,
				packageid: that.current_packageid,
				cardid: that.current_cardid,
			};
			
			if (!userInfo) {
				return;
				
			}
			
			post_data.userid = userInfo.userid;
			post_data.checkstr = userInfo.checkstr;
			
			
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_card_publish',
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
					
					that.card_publish = res.data.data;

					console.log('card_publish ===>>> ', that.card_publish);


				},
				fail: function(e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
				},
			});

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
			uni.showToast({
				title: '数据更新中……',
				icon: 'loading',
			});
			// #endif

			// #ifdef MP-ALIPAY
			uni.showToast({
				title: '数据更新中……',
				//icon:'loading', 	//支付宝不支持icon为 loading
				//duration:2000
			});
			// #endif


		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom: function() {

			//this.get_product_list();

		},
		//微信分享给好友
		onShareAppMessage: function() {
			var that = this;

			var share_title = that.current_card_detail.card_name;
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
				
				return {
					title: share_title,
					query: share_path,
					imageUrl: share_img,
				}
				
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
			
			
			// is_xiaohui:function(){
			// 	uni.showModal({
			// 		title: '',
			// 		content: '是否确认销毁',
			// 		cancelText: '取消',
			// 		confirmText: '确认',
			// 	})
			// },
			
			// get_user_account_info:function(){
			// 	var user_account_info_str = uni.getStorageSync("user_account_info");
			// 	if(!user_account_info_str){
			// 		return null;
			// 	}
			// 	return JSON.parse(user_account_info_str);
			// },
			
			callback_function_shop_option_data: function(that, cb_params) {

				console.log('当前调试开关22：' + this.system_debug_flag);
				console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);

				if (!cb_params) {
					return;
				}

				console.log('cb_params====', cb_params);
				
				
				that.wxa_shop_nav_bg_color  = cb_params.option_list.wxa_shop_nav_bg_color;
				
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
							that.current_card_detail.favorite_counter++;
						} else {
							that.current_card_detail.favorite_counter--;
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




			// set_buyed:function(value002){
			// 	var that = this;

			// 	//请求服务器接口、
			// 	var cardid = that.current_card_detail.cardid;

			// 	//请求成功之后，修改本地的数据
			// 	that.current_card_detail.is_buyed = value002;

			// },




			test_goto_buy: function() {
				var that = this;

				console.log('tgggggggggggggggggg_buy');
				
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

				var new_url = '/pages/order/pay?productid=' + productid + '&total=' + price + '&extraData=' +
				extraData;

				uni.navigateTo({
					url: new_url
				})


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
		top: 50%;
		left: 15%;
		transform: translateY(-50%);
		border-radius: 80rpx;
		border: 5rpx #c3c3c3 solid;
		background-color: #e2d281;
		// .tree{
		// 	width: 100%;
		// 	height: 100%;
		// 	overflow-y: scroll;
		// }
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
	}
	.card_detail_showmodal_fenxaingjilv{
		position: absolute;
		top: 50%;
		left: 8%;
		transform: translateY(-50%);
		width: 590rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		// overflow: hidden;
		// .tree1{
		// 	width: 100%;
		// 	height: 100%;
		// 	overflow-y: scroll;
		// }
	}
	.card_detail_modal_kapaimingxi{
		color: #666666;
		width: 160rpx;
		display: flex;
	}
</style>
<style>
	@import "/static/css/nftcard.css";
	button:after{
		display:none;
	}
	.card_detail_xing {
		width: 30rpx;
		height: 30rpx;
	}
	.contentbox image{
		vertical-align: middle;
	}
	.main_body {
		width: 100%;
		margin-bottom: 200rpx;
		padding-bottom: 200rpx;
	}

	.card_detail_border {
		position: absolute;
		width: 100%;
		filter: blur(15rpx);
	}

	.card_detail_image {
		position: relative;
		border-radius: 20rpx;
		box-shadow: 0rpx 0rpx 20rpx #000000;
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
		padding-top: 15rpx;
	}
	.card_detail_tong{
		height: 460rpx;
		background-color: #FFFFFF;
		margin: 15rpx;
		border-radius: 15rpx;
	}
	.show_modal_mask{
		background-color: #000;
		opacity: 0.7;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	.show_modal_pop{
		
		position: fixed;
		
		/* transform: translateY(50%); */
		z-index: 2;
	}
	.card_detail_showmodal_kapaimingxi{
		background-color: #FFFFFF;
		top: 1%;
		left: 50%;
		transform: translateX(-50%);
		width: 500rpx;
		height: 1000rpx;
		padding: 20rpx;
	}
	
/* 收藏按钮 */
	.card_detail_schang_boder{
		width: 47rpx;
		height: 47rpx;
		padding-right: 10rpx;
		padding-bottom: 10rpx;
		background-color: #FFFFFF;
		border-radius: 50%;
		background: rgb(0, 0, 0,0.6);
		position: absolute;
	}
	.card_detail_schang {
		width: 39rpx;
		height: 39rpx;
		margin-top: 6rpx;
		margin-left: 10rpx;
	}
	.card_detail_xiaoxi1 {
		width: 60rpx;
		height: 60rpx;
		padding-top: 14rpx;
		padding-left: 15rpx;
	}
	.card_detail_xiaoxi2 {
		position: fixed;
		/* transform: translateY(50%); */
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
		border: #aeb8ab 3rpx solid;
		position: fixed;
		z-index: 2;
	}
	.card_detail_xiaoxi2 {
		width: 60rpx;
		height: 60rpx;
		padding-top: 14rpx;
		padding-left: 15rpx;
	}
	.card_detail_fenxiang {
		width: 50rpx;
		height: 50rpx;
		padding-top: 18rpx;
		padding-left: 20rpx;
	}
	.card_detail_liebiao {
		background-color: #F0F0F0;
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		margin: 15rpx;
		border: #aeb8ab 3rpx solid;
	}
	.card_detail_showmodal_tupian {
		width: 40rpx;
		height: 40rpx;
		padding-top: 24rpx;
		padding-left: 24rpx;
	}
	.card_detail_showmodal_zengsong {
		background-color: #F0F0F0;
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		margin: 15rpx;
		margin-right: 10rpx;
		border: #aeb8ab 3rpx solid;
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
		border: #aeb8ab 3rpx solid;
	}
	.card_detail_goumai2{
		display: flex;
		background-color: #F0F0F0;
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		margin: 15rpx;
		margin-right: 23rpx;
		border: #aeb8ab 3rpx solid;
	}
	.card_goumai2_modal{
		position: fixed;
		z-index: 3;
		bottom: 0rpx;
		right: 10rpx;
		display: flex;
		background-color: #F0F0F0;
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		margin: 15rpx;
		margin-right: 23rpx;
		border: #aeb8ab 3rpx solid;
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
		text-align: left;
		font-size: 37rpx;
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
	.slide_cards_pic {
		width: 190rpx;
		padding-left: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}
	.card_detail_img_border {
		width: 190rpx;
		height: 295rpx;
		border-radius: 20rpx;
	}

	.card_detail_kapai_title {
		width: 195rpx;
		font-size: 26rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
	}
	.card_detail_footer {
		position: fixed;
		bottom: 0rpx;
		right: 0rpx;
	}
	.card_detail_xiangqing{
		word-wrap:break-word;  
		word-break:break-all;
		background-color: #FFFFFF;
		border-radius: 15rpx;
		padding: 15rpx;
		margin: 15rpx;
	}
</style>
