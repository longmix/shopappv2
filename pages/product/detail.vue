<template>
	<view>
		<view class="status" :style="{ opacity: afterHeaderOpacity }"></view>
		<view class="header">

			<abotshare ref="share_api" @click_wxa_share="click_wxa_share" @click_wxa_circle_share='click_wxa_circle_share'
			 @click_wxa_applet_share='click_wxa_applet_share' @click_wxa_command_copy='click_wxa_command_copy'
			 @click_wxa_system_share='click_wxa_system_share'></abotshare>
			<!-- 头部-默认显示 -->
			<view class="before" :style="{ opacity: 1 - afterHeaderOpacity, zIndex: beforeHeaderzIndex }">
				<view class="back">
					<view class="icon xiangqian" @tap="back_return" v-if="showBack"></view>
				</view>
				<view class="middle"></view>
				<view class="icon-btn">
					<view class="icon tongzhi" @tap="toMsg"></view>
					<view class="icon zhuye" @tap="toindex"></view> <!-- 跳转购物车 toCart -->
				</view>
			</view>
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
				<view class="back">
					<view class="icon xiangqian" @tap="back_return" v-if="showBack"></view>
				</view>
				<view class="middle">
					<view v-for="(anchor,index) in anchorlist" :class="[selectAnchor==index ?'on':'']" :key="index" @tap="toAnchor(index)">{{anchor.name}}</view>
				</view>
				<view class="icon-btn">
					<view class="icon tongzhi" @tap="toMsg"></view> <!-- 下版本-> toMsg -->
					<view class="icon zhuye" @tap="toindex"></view>
				</view>
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="warm" v-if="goods_detail.inventory == 0">
			该商品已经售罄！！！
		</view>
		<view class="footer">
			<view class="icons">


				<!-- #ifdef MP -->

				<button class="box share-btn" open-type="share" style="background: none;outline: none;border: none;">
					<view class="icon fenxiang"></view>
					<view class="text">分享</view>
					<!-- <button class="text" open-type="share">分享</button> -->
				</button>
				<!-- <button style="padding-left: 0;padding-right: 0;" open-type="share">分享</button> -->
				<!-- #endif -->

				<!-- #ifdef APP-PLUS -->

				<button class="box share-btn" @click="is_show">
					<view class="icon fenxiang"></view>
					<view class="text">分享</view>
					<!-- <button class="text" open-type="share">分享</button> -->
				</button>
				<!-- <button style="padding-left: 0;padding-right: 0;" open-type="share">分享</button> -->
				<!-- #endif -->


				<!-- #ifdef H5 -->
				<view class="box" @tap="share_shang_detail">
					<view class="icon fenxiang"></view>
					<view class="text">分享</view>
				</view>
				<!-- #endif -->


				<view class="box" @tap="toChat">
					<view class="icon kefu"></view>
					<view class="text">客服</view>
				</view>
				<view class="box" @tap="keep_to_collect" v-if="bottom_show_favorite_icon == 1">
					<view class="icon" :class="[isKeep?'shoucangsel':'shoucang']"></view>
					<view class="text">{{isKeep?'已':''}}收藏</view>
				</view>
				<view class="box" @tap="toCart" v-if="bottom_show_goto_cart_icon == 0">
					<view class="icon cart"></view>
					<view class="text">{{icon_btn_gouwuche_text}}</view>
					<view class="amount" v-if="cart_amount > 0">{{cart_amount}}</view>
				</view>

			</view>
			<view class="btn" v-if="bottom_show_add_to_cart_and_buy_now == 1">
				<!-- 加入购物车  立即购买 -->
				<view :class="[goods_detail.inventory == 0? 'joinCart-null':'joinCart']" data-type="addcart" data-status="2" @tap="goods_detail.inventory == 0?'':setModalStatus($event)">{{btn_gouwuche_text}}</view>
				<view :class="[goods_detail.inventory == 0? 'buy-null':'buy']" data-status="1" @tap="goods_detail.inventory == 0? '':setModalStatus($event)">立即购买</view>
			</view>
		</view>
		<!-- share弹窗 -->
		<view class="share" :class="shareClass" @touchmove.stop.prevent="discard" @tap="hideShare">
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="h1">分享</view>
				<view class="list">
					<!-- <view class="box">
						<image src="../../static/img/share/uni.png"></image>
						<view class="title">
							微信好友
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/pyq.png"></image>
						<view class="title">
							朋友圈
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/wb.png"></image>
						<view class="title">
							新浪微博
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/qq.png"></image>
						<view class="title">
							QQ
						</view>
					</view> -->

				</view>
				<view class="btn" @tap="hideShare">
					取消
				</view>
			</view>

		</view>
		<!-- 服务-模态层弹窗 -->
		<view class="popup service" :class="serviceClass" @touchmove.stop.prevent="discard" @tap="hideService">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer2" @tap.stop="discard">
				<view class="content">
					<view class="row" v-for="(item,index) in attribute_list" :key="index">
						<view class="title">{{item.name}}</view>
						<view class="description">{{item.value}}</view>
					</view>
				</view>
				<view class="btn">
					<view class="button" @tap="hideService">完成</view>
				</view>
			</view>
		</view>
		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="discard" @tap="hideSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer2" @tap.stop="discard">
				<view class="content">


					<view class="text_center">
						<image class="drawer_image" :src="goods_detail.picture"></image>
						<view class="mingcheng">
							<view>{{goods_detail.name}}</view>
							<view style="font-size:29rpx;color:red">¥ {{goods_detail.price}}</view>
							<view>
								<span style="font-size:26rpx;color:#333; margin-right:10rpx;" 
									v-if="wxa_show_kucun_xiaoliang==1">库存：{{goods_detail.inventory}}</span>
								<span style="font-size:26rpx;color:color:#444;" 
									v-if="wxa_show_kucun_xiaoliang==1">已售：{{goods_detail.sale_volume}}</span>
							</view>
						</view>
					</view>

					<view class="text">数量</view>
					<view class="number">
						<view class="sub">
							<view class="icon jian" data-alpha-beta="0" @click="changeNum($event)"></view>
						</view>
						<view class="input" @tap.stop="discard">
							<input type="number" v-model="product_amount" />
						</view>
						<view class="add">
							<view class="icon jia" data-alpha-beta="1" @click="changeNum($event)"></view>
						</view>
					</view>


				</view>
				<view class="btn">
					<view class="button" :data-status="go_to_buy_url_type" @tap="addShopCart($event)">{{buys}}</view>
				</view>
			</view>


		</view>


		<!-- 商品主图轮播 -->
		<view class="swiper-box">
			<swiper @change="swiperChange">
				<swiper-item v-if="current_video_url">
					<video v-if="current_video_playing == 1"
						:style="{width:video_url_width + 'rpx',height:video_url_height + 'rpx'}"
						:src="current_video_url" 
						:poster="goods_detail.video_cover_url"
						@paly="video_start_or_stop"
						@pause="video_start_or_stop"
						@ended="video_start_or_stop"
						@error="video_start_or_stop"
						autoplay="true"
						></video>
					 
					 <view v-if="current_video_playing == 0">
						 <image
							:src="goods_detail.video_cover_url"
							@tap="video_start_or_stop" ></image>
							
						<view class="video_logo cuIcon-playfill">
							<image src="https://yanyubao.tseo.cn/Tpl/static/images/video_live/play_white.png"  mode="widthFix"></image>
						</view>	
					</view>
				</swiper-item>

				<swiper-item v-for="picture_item in picture_list" :key="picture_item.id">
					<image :src="picture_item.picture"></image>
				</swiper-item>

			</swiper>

			<view class="indicator">{{currentSwiper+1}}/{{picture_length}}</view>

		</view>
		<!-- 标题 价格 -->
		<view class="info-box goods-info">
			<view class="price">￥{{goods_detail.price}}</view>
			<view class="title">
				{{goods_detail.name}}
			</view>
		</view>

		<!-- 供货商跳转 -->
		
		<navigator v-if="goods_detail.factory_name" 
			:url="'./goods-list/goods-list?factoryid='+goods_detail.factoryid">
			<view class="gonghuoshang_shop" >
				<view style="color:#666;padding: 20rpx 4%;font-size: 28rpx;">
					本商品由{{goods_detail.factory_name}}发货并提供售后服务
				</view>
				<image style="width: 40rpx;" src="../../static/img/tabBar/home.png" mode="widthFix"></image>
			</view>
		</navigator>
		
		<!-- 2020.12.3. 爱拼团活动对应的 已经开出 且 没有成团 的 团列表  推荐商品-->
		<view class="is_aipingou_tuan_list" v-if="is_aipingou_tuan_list">
			<block v-if="aipin_tuan_list && (aipin_tuan_list.length > 0)">
				<view style="margin-left: 25rpx;">{{aipin_tuan_list.length}}个团正在进行，可直接参与</view>
				<view class="aipin_tuan" v-for="(item,index) in aipin_tuan_list" :key="index">
						<view class="tuan_info_name">
							<img :src="item.headimgurl" mode="widthFix">
							<view class="tuan_leder_name">{{item.nickname}}</view>
						</view>
						<view class="let_go_pingtuan" 
							:style="{'background-color': wxa_shop_nav_bg_color}"
							@tap="go_detail_pintuan(item.tuansn)">去拼团</view>
						<view class="tuan_time_number">
							<view class="tuan_number">{{grounp_count}}人成团还差<span style="color: red;">{{grounp_count - item.tuanyuan_counter}}人</span></view>
							<view class="tuan_time_over" style="display:none;">剩余{{item.timespan_str}}</view>
							<view class="tuan_time_over" style="">No.{{item.tongjiid}}</view>
						</view>
				</view>
			</block>
			<block v-else>
				<view style="margin-left: 25rpx; color: #666;text-align: center;">一个团都没有哦~
				</view>
				<view class="let_go_pingtuan"
					:style="{'background-color': wxa_shop_nav_bg_color}"
					@tap="go_detail_pintuan('')">去拼团</view>
				
			</block>
		</view>
		
		<!-- ==================End========================== -->
		
		<!-- 商品属性 -->
		<view class="info-box spec" v-if="attribute_list && attribute_list.length>0">
			<view class="row" @tap="showService">
				<view class="content">
					<view class="serviceitem" v-if="index < 3" v-for="(item,index) in attribute_list" :key="index">
						<view>{{item.name}}</view> {{item.value}}
					</view>
				</view>
				<view class="arrow">
					<view class="icon xiangyou"></view>
				</view>
			</view>
		</view>

		<view v-if="isExistSpec" class="guige">

			<!-- 规格开始 -->
			<view class="specs" v-if="attr_list">商品选项 </view>
			<view class="specs-a">
				<view :class="[option_list_arr[0] == item ? 'specs-e' : 'specs-d']" v-for="(item, index) in attr_key_arr" :key="index"
				 :data-spec1="item" @click='changeSpec1($event)'>
					{{item}}
				</view>
			</view>
			<view class="specs-a" 
				v-if="attr_list_arr[spec1] != null" 
				style="border-top: 1rpx solid #e5e5e5;padding-top: 20rpx;">
				<view :class="[option_list_arr[1] == item2 ? 'specs-e' : 'specs-d']" v-for="(item2, index) in attr_list_arr[spec1]"
				 :key="index" :data-spec2="item2" @click="changeSpec2($event)">
					{{item2}}
				</view>
			</view>
			<!-- 规格结束 -->
		</view>



		<!-- 服务-规格选择 -->
		<!-- <view class="info-box spec" v-if="isExistSpec">		
			<view class="row" @tap="showSpec(false)">
				<view class="text">选择规格</view>
				<view class="content">
					
					<view class="sp">
						<view>{{spec1}} {{spec2}}</view>
					</view>
				</view>
				<view class="arrow">
					<view class="icon xiangyou"></view>
				</view>
			</view>
		</view> -->

		<!-- 2020.8.23. 推广联盟的商品 -->
		<view class="coupon_ticket" v-if="(product_source_channel == 1) && goods_detail.coupon_info" @tap="goto_buy_union_product"
		 :data-buyurl="goods_detail.coupon_info.buyurl" :data-buymsg="goods_detail.coupon_info.buymsg">
			<view class="coupon_ticket_left">{{goods_detail.coupon_info.text01}}</view>
			<view class="coupon_ticket_right">{{goods_detail.coupon_info.text02}}</view>
		</view>




		<!-- 促销活动 -->
		<view class="block_ladder">
			<block v-for="(youhui_item, youhuiid) in product_youhui_list" :key="youhuiid">
				
				<view class="drpt_0">
					<view class="yhmc">{{youhui_item.youhui_name}}</view>
					<block v-if="youhui_item.youhui_type == 'jietijiage'">
						<!-- 阶梯价格 -->
						<view class="drpt_1" v-for="(item, index) in youhui_item.youhui_data" :key="index">
							<view class="yh_1">{{item.min}}件-{{item.max}}件 <text class="yh_1_1">{{item.price/100}}元</text> </view>
						</view>
					</block>
					<block v-else-if="youhui_item.youhui_type == 'huiyuanzhekou'">
						<!-- 会员折扣价 -->
						<view class="drpt_1" v-for="(item, index) in youhui_item.youhui_data" :key="index">
							<view class="yh_1">{{item.level_name}} <text class="yh_1_1">￥{{item.level_price}}</text> </view>
						</view>
					</block>
					<block v-else>
						<!-- 多人拼团  分享砍价 限时秒杀 等其他优惠活动 -->
						<view class="drpt_2">
							<view class="yh_1" v-if="youhui_item.youhui_url"
								@tap='youhui_huodong_handle'
								:data-youhuitype='youhui_item.youhui_type'
								:data-youhuiurl='youhui_item.youhui_url'>{{youhui_item.youhui_msg}}
							</view>
							<view v-else>
								{{youhui_item.youhui_msg}}
							</view>
						</view>
					</block>
					
					
				</view>
			</block>
			
			<!--
			<view class="drpt_0" :style="{display:jietijiage==1?'block':'none'}">
				<view class="yhmc">阶梯价格</view>
				<view class="drpt_1" v-for="(item, index) in jietijiage_youhui_data" :key="index">
					<view class="yh_1">{{item.min}}件-{{item.max}}件 <text class="yh_1_1">{{item.price/100}}元</text> </view>
				</view>
			</view>
			<view class="drpt_0" :style="{display:huiyuanzhekou==1?'block':'none'}">
				<view class="yhmc">会员折扣价 {{huiyuanzhekou_youhui_name}}</view>
				<view class="drpt_1" v-for="(item, index) in huiyuanzhekou_youhui_data" :key="index">
					<view class="yh_1">{{item.level_name}} <text class="yh_1_1">￥{{item.level_price}}</text> </view>
				</view>
			</view>

			<view class="drpt_0" :style="{display:duorenpintuan==1?'block':'none'}">
				<view class="yhmc">多人拼团</view>
				<view class="drpt_2">
					<view class="yh_1">{{duorenpintuan_tips}}
						<text @tap='youhui_huodong_handle' id='duorenpintuan'>查看更多>></text>
					</view>
				</view>
			</view>

			<view class="drpt_0" :style="{display:sharekanjia==1?'block':'none'}">
				<view class="yhmc">分享砍价</view>
				<view class="drpt_2">
					<view class="yh_1">商品可分享砍价
						<text @tap='youhui_huodong_handle' id='sharekanjia'>查看更多>></text>
					</view>
				</view>
			</view>
			<view class="drpt_0" :style="{display:xianshimiaosha==1?'block':'none'}">
				<view class="yhmc">限时秒杀</view>
				<view class="drpt_2">
					<view class="yh_1">商品可限时秒杀
						<text @tap='youhui_huodong_handle' id='xianshimiaosha'>查看更多>></text>
					</view>
				</view>
			</view>
			-->
		</view>
		
		<!-- 评价 -->
		<!-- <view class="info-box comments" id="comments">
			<view class="row">
				<view class="text">商品评价({{goodsData.comment.number}})</view>
				<view class="arrow" @tap="toRatings">
					<view class="show" @tap="showComments(goodsData.id)">
						查看全部
						<view class="icon xiangyou"></view>
					</view>
				</view>
			</view>
			<view class="comment" @tap="toRatings">
				<view class="user-info">
					<view class="face"><image :src="goodsData.comment.userface"></image></view>
					<view class="username">{{goodsData.comment.username}}</view>
				</view>
				<view class="content">
					{{goodsData.comment.content}}
				</view>
			</view>
		</view> -->
		<!-- 详情 -->

		<view class="re-commend" v-if="recommend_product_list.length != 0">
			<view class="re-h">推荐商品</view>
			<view class="re-goods" v-for="(item,index) in recommend_product_list" :key="index" :data-productid="item.productid"
			 @tap="block_tanchuang">
				<image :src="item.picture"></image>
				<view class="re-txt">{{item.name}}</view>
				<view class="re-price">¥{{item.price}}</view>
			</view>


		</view>

		<view class="re-commend" v-if="hot_product_list.length != 0">
			<view class="re-h">热销商品</view>
			<view class="re-goods" v-for="(item,index) in hot_product_list" :key="index" :data-productid="item.productid" @tap="block_tanchuang">
				<image :src="item.picture"></image>
				<view class="re-txt">{{item.name}}</view>
				<view class="re-price">¥{{item.price}}</view>
			</view>
		</view>


		<view class="description">
			<view class="title">———— ※ 商品详情 ※ ————</view>
			<view class="content">
				<!-- #ifdef MP-ALIPAY -->
				<rich-text :nodes="describe"></rich-text>
				<!-- #endif -->
				<!-- #ifndef MP-ALIPAY -->
				<rich-text :nodes="describe|formatRichText"></rich-text>
				<!-- #endif -->


			</view>

		</view>

		<view class="copyright_info">{{default_copyright_text}}</view>

		<!-- 2020.12.14 -->
		<!-- <openAlert ref="openAlertKaijiang"
		 :AlertClass="AlertClassKaijiang"
		 :AlertPosition="AlertPositionKaijiang">
		 <view style="background-color: #FFFFFF;padding: 10px;border-radius: 5px;">
			<view class="input_1"><input style="border: 1px solid #000000; border-radius: 5px;" type="number" name="count_aipingou" placeholder="请填写购买数量"></view>
			<view class="input_2"><input disabled="disabled" style="border-radius: 5px;margin-top: 10px;border: 1px solid #000000;width: 50px;margin: 0 auto;text-align: center;background-color: #02BF02;color: #FFFFFF;" class="submit_1" type="button" value="确定" @tap="go_to_aipingou()"></view>
		 </view>
		</openAlert> -->	
	</view>
</template>

<script>
	// var app = getApp();
	// var abotapi = require("../../common/abotapi.js");
	var productid;
	import abotshare from '../../components/abot_share_api/abot_share_api.vue';
	import abotsharejs from '../../common/abot_share_api.js';
	//import abot_share_vue from '../../components/product-list/product-list.vue';

	// #ifdef MP-ALIPAY
	import parseHtml from "../../common/html-parser.js"
	// #endif	



	export default {
		components: {
			abotshare
		},
		data() {
			return {
				//控制渐变标题栏的参数
				beforeHeaderzIndex: 11, //层级
				afterHeaderzIndex: 10, //层级
				beforeHeaderOpacity: 1, //不透明度
				afterHeaderOpacity: 0, //不透明度
				//是否显示返回按钮
				// #ifndef MP
				showBack: true,
				// #endif
				//轮播主图数据
				picture_list: '',
				current_video_url: null,
				goods_detail: {
					name: '',
					price: '',
					inventory: 1
				},
				//轮播图下标
				currentSwiper: 0,
				anchorlist: [], //导航条锚点
				selectAnchor: 0, //选中锚点
				serviceClass: '', //服务弹窗css类，控制开关动画
				specClass: '', //规格弹窗css类，控制开关动画
				shareClass: '', //分享弹窗css类，控制开关动画
				// 商品信息
				goodsData: {
					id: 1,
					name: "商品标题商品标题商品标题",
					price: "127.00",
					number: 1,
					service: [{
							name: "正品保证",
							description: "此商品官方保证为正品"
						},
						{
							name: "极速退款",
							description: "此商品享受退货极速退款服务"
						},
						{
							name: "7天退换",
							description: "此商品享受7天无理由退换服务"
						}
					],
					spec: ["XS", "S", "M", "L", "XL", "XXL"],
					comment: {
						number: 102,
						userface: '',
						username: '大黑哥',
						content: '很不错，之前买了很多次了，很好看，能放很久，和图片色差不大，值得购买！'
					}
				},
				selectSpec: null, //选中规格
				isExistSpec: false, //有无规格
				isKeep: false, //收藏
				//商品描述html
				describe: '',
				descriptionStr: '<div style="text-align:center;"><img width="100%" src="https://ae01.alicdn.com/kf/HTB1t0fUl_Zmx1VjSZFGq6yx2XXa5.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB1LzkjThTpK1RjSZFKq6y2wXXaT.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB18dkiTbvpK1RjSZPiq6zmwXXa8.jpg"/></div>',
				option_list_arr: [],
				spec1: '',
				spec2: '',
				attr_list_arr: [],
				attr_key_arr: [],
				attr_list: [],
				attribute_list: [],
				picture_length: 0,
				product_amount: 1,
				
				buys: '立即购买',
				go_to_buy_url_type: 0,
				go_to_buy_new_url:'',	//如果 go_to_buy_url_type == 3，则这里有值
				
				
				action_type: '',	//控制 立即购买 还是 加入购物车
				current_spec: '',
				options_str: '',

				//get_shop_info
				shop_userid: '',
				shop_name: '',
				shop_info: '',
				shop_telephone:'',
				
				//热销与推荐
				recommend_product_list: [],
				hot_product_list: [],
				
				//各种促销活动
				product_youhui_list:[],
				/*
				jietijiage_youhui_data: '',
				jietijiage: '',
				huiyuanzhekou_youhui_data: '',
				huiyuanzhekou_youhui_name: '',
				huiyuanzhekou: '',
				
				pintuan_url: '',				
				duorenpintuan: '',
				duorenpintuan_tips:'',
				
				kanjia_url: '',
				sharekanjia: '',
				miaosha_url: '',
				xianshimiaosha: '',
				*/
			   
				//显示库存和销量
				wxa_show_kucun_xiaoliang: '',
				cart_amount: 0,
				default_copyright_text: '',
				// app分享
				share_imageUrl: '',
				share_href: '',
				share_summary: '',
				share_titles: '',
				
				//控制底部功能按钮的隐藏和显示
				bottom_show_favorite_icon:1,
				bottom_show_goto_cart_icon:1,
				bottom_show_add_to_cart_and_buy_now:1,

				//商品的来源渠道，默认0为SaaS云平台的商品，1为淘宝客等推广联盟的商品
				product_source_channel: 0,
				product_channel_name: '', // jingdong / taobao / pinduoduo

				icon_btn_gouwuche_text: '购物车',
				btn_gouwuche_text: '加入购物车',

				video_url_width: 750,
				video_url_height: 750,
				
				current_video_playing:0,
				
				//客服按钮点击后的消息类型
				app_kefu_msg_type:'is_call_mobile',
				
				//2020.12.3. 爱拼团
				is_aipingou_tuan_list:false,
				aipingou_tuan_list:null,
				aipin_tuan_list:[],//团列表
				grounp_count:'',//组团人数
				wxa_shop_nav_bg_color:'',
				
				//2020.12.14
				AlertClassKaijiang: 0,
				AlertPositionKaijiang: '',
			};
		},
		/**
		 * 参数：
		 * userid  推荐者ID
		 * productid 商品ID
		 * cuxiao_huodong 是否来自促销活动，对应的值为具体的活动名称
		 */
		onLoad(options) {
			
			this.abotapi.set_option_list_str(this, this.callback_set_option_list_str);
			this.abotapi.get_shop_info_from_server(this.callback_func_for_shop_info);

			console.log('/pages/product/detail=====', options);

			var that = this;

			var options_str = '';	//记录网址带的参数

			//如果当前访问者没有登录或者注册，那么分析转发过来的链接是否带有推荐者信息
			var userInfo = that.abotapi.get_user_info();
			if (options.userid) {

				if ((!userInfo) || (!userInfo.userid)) {
					that.abotapi.set_current_parentid(options.userid);
				}
			}


			if (options.productid) {
				that.productid = options.productid;

				options_str += 'productid=' + options.productid + '&';
			}


			//不知道这个参数有什么用处
			if (options.price_type) {
				that.price_type = options.price_type;

				options_str += 'price_type=' + options.price_type + '&';
			}
			
			//2020.12.3. 爱拼团
			if(options.cuxiao_huodong && (options.cuxiao_huodong == 'aipingou')){
				options_str += 'cuxiao_huodong=' + options.cuxiao_huodong + '&';
				
				that.is_aipingou_tuan_list = true;
				
				//隐藏底部的收藏按钮和购物车按钮
				that.bottom_show_favorite_icon = 0;
				that.bottom_show_goto_cart_icon = 0;
				that.bottom_show_add_to_cart_and_buy_now = 0;
				
				console.log('that.bottom_show_favorite_icon ===>>> ', that.bottom_show_favorite_icon);
				
				//获取正在等待开团的团列表
				that.__get_aipingou_tuan_list(options.productid, options.rulesn);
				
			}

			options_str = options_str.substr(0, options_str.length - 1);

			console.log('options_str', options_str);

			that.options_str = options_str;


			//渠道商品 2020.8.21.
			if (!this.abotapi.isNullOrUndefined(options.product_source_channel)) {
				this.product_source_channel = options.product_source_channel;

				this.product_channel_name = options.product_channel_name;

				this.icon_btn_gouwuche_text = '购买';
			}

			//请求的网址
			var detail_url = this.abotapi.globalData.yanyubao_server_url + '/Yanyubao/ShopAppWxa/product_detail';
			//请求的参数
			var detail_data = {
				sellerid: that.abotapi.globalData.default_sellerid,
				productid: this.productid,
				platform: that.abotapi.globalData.current_platform,
			};

			if (this.product_source_channel == 1) {
				detail_url = this.abotapi.globalData.yanyubao_server_url +
					'index.php/openapi/UnionPromotionData/get_product_detail';
				detail_data.union_name = this.product_channel_name;
				
				this.bottom_show_favorite_icon = 0;
				this.bottom_show_goto_cart_icon = 0;
				this.bottom_show_add_to_cart_and_buy_now = 0;
				
			}



			this.abotapi.abotRequest({
				url: detail_url,
				data: detail_data,
				success: function(res) {
					console.log('5555588558===', res);

					if (res.data.code == 1) {
						that.goods_detail = res.data.data;
						
						console.log('that.goods_detail===>>>', that.goods_detail);
						
						//处理商品供货商，如果有供货商，则联系供货商的客服
						if(that.goods_detail.factoryid && that.goods_detail.factory_telephone){
							that.shop_telephone = that.goods_detail.factory_telephone;
							that.shop_userid = that.goods_detail.factory_userid;
						}
						
						//处理商品详情
						that.describe = that.goods_detail.describe;

						// #ifdef MP-ALIPAY		

						const filter = that.$options.filters["formatRichText"];
						that.describe = filter(that.describe);

						//console.log('that.describe====>>>>', that.describe);

						let data001 = that.describe;
						let newArr = [];
						let arr = parseHtml(data001);
						arr.forEach((item, index) => {
							newArr.push(item);
						});

						//console.log('arr arr arr====>>>>', arr);
						//console.log('newArr newArr newArr====>>>>', newArr);

						that.describe = newArr;

						// #endif	


						that.picture_list = that.goods_detail.picture_list;

						that.picture_length = that.goods_detail.picture_list ? that.goods_detail.picture_list.length : 0;

						if (that.goods_detail.video_url) {
							that.current_video_url = that.goods_detail.video_url;
							that.picture_length = that.picture_length + 1;
						}
						
						if(that.picture_length == 0){
							that.currentSwiper = -1;
						}

						//console.log('88888888888999', that.current_video_url);

						that.attribute_list = that.goods_detail.attribute_list;

						// app分享
						if(that.picture_length > 0){
							that.share_imageUrl = that.goods_detail.picture_list[0]['picture'];
						}
						
						that.share_href = that.goods_detail['url'];
						that.share_summary = that.goods_detail['brief'];
						that.share_titles = that.goods_detail['name'];
						// that.share_productid = that.goods_detail['productid'];
						// that.share_userid = userInfo.userid;
						// that.share_sellerid = this.abotapi.get_sellerid();
						// that.share_abotap = require("../../common/abotapi.js");

						var attr_list = that.goods_detail.attr_list

						if (attr_list) {
							that.isExistSpec = true;
						}

						console.log('attr_list===>>>', that.goods_detail.attr_list);

						if (that.goods_detail.option_name) {
							var option_list_arr = that.goods_detail.option_name.split(' ');


							that.option_list_arr = option_list_arr;
							
							that.spec1 = option_list_arr[0];
							
							if(option_list_arr.length > 1){
								that.spec2 = option_list_arr[1];
							}
							
							console.log('option_list_arr', option_list_arr);
						}

						if (attr_list) {
							var attr_key_arr = []
							var attr_list_arr = {}
							for (var i = 0; i < attr_list.length; i++) {
								var arr001 = attr_list[i].option_name.split(' ');
								if (attr_key_arr.indexOf(arr001[0]) == -1) {
									attr_key_arr.push(arr001[0]);
								}
							}

							console.log('第一行：', attr_key_arr);

							for (var j = 0; j < attr_key_arr.length; j++) {
								var attr_arr = []
								for (var i = 0; i < attr_list.length; i++) {
									var arr001 = attr_list[i].option_name.split(' ');

									if ((attr_key_arr[j] == arr001[0]) && arr001[1]) {
										attr_arr.push(arr001[1])
									}
								}
								attr_list_arr[attr_key_arr[j]] = attr_arr
							}

							console.log('最终的商品属性列表：', attr_list_arr);


							that.attr_list_arr = attr_list_arr;
							that.attr_key_arr = attr_key_arr;
							that.attr_list = attr_list;


						}

					}
				},

				fail: function(e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
				},

			});


			this.get_yanyubao_goods_recommend('recommend');
			this.get_yanyubao_goods_recommend('hot');

			if (userInfo && userInfo.userid) {
				this.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + '/Yanyubao/ShopAppWxa/product_favorite',
					data: {
						productid: this.productid,
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						sellerid: this.abotapi.get_sellerid(),
					},
					success: (res) => {
						//--init data 
						var code = res.data.code;

						if (code == 1) {
							this.isKeep = true;
						} else {
							this.isKeep = false;
						}

					},
					error: function(e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000,
						});
					},
				});
			}


			this.loadCataXiangqing();

			// #ifdef MP
			//小程序隐藏返回按钮
			this.showBack = false;
			// #endif
			//option为object类型，会序列化上个页面传递的参数
			console.log(options.cid); //打印出上个页面传递的参数。



			//获取客服电话
			
		},
		onShow() {
			this.getCartList();
			//this.__get_tuan_list();
		},
		onHide(){
			this.current_video_playing = 0;
		},
		onReady() {
			this.calcAnchor(); //计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
		},
		onPageScroll(e) {
			if(!e){
				return;
			}
			
			//锚点切换
			this.selectAnchor = e.scrollTop >= this.anchorlist[2].top ? 2 : e.scrollTop >= this.anchorlist[1].top ? 1 : 0;
			//导航栏渐变
			let tmpY = 375;
			e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
			this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
			this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
			//切换层级
			this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
			this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		// onReachBottom() {
		// 	uni.showToast({ title: '触发上拉加载' });
		// },


		onShareAppMessage: function() {
			var that = this;

			var share_title = that.goods_detail.name;
			if (share_title.length > 22) {
				share_title = share_title.substr(0, 20) + '...';
			}

			var share_path = '/pages/product/detail?productid=' + that.productid + '&sellerid' + this.abotapi.get_sellerid();

			var userInfo = this.abotapi.get_user_info();

			if (userInfo && userInfo.userid) {
				share_path += '&userid=' + userInfo.userid;
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

		share_return: function() {
			var that = this;

			var share_title = that.goods_detail.name;
			if (share_title.length > 22) {
				share_title = share_title.substr(0, 20) + '...';
			}

			var share_path = 'productid=' + that.productid + '&sellerid' + this.abotapi.get_sellerid();

			var userInfo = this.abotapi.get_user_info();

			if (userInfo && userInfo.userid) {
				share_path += '&userid=' + userInfo.userid;
			}

			var share_img = that.goods_detail.pictures;

			return {
				title: share_title + ' ￥' + that.goods_detail.price,
				query: share_path,
				imageUrl: share_img,
			}
		},

		onShareTimeline: function() {
			this.share_return();
		},
		onAddToFavorites: function() {
			this.onShareTimeline();
		},

		methods: {
			changeSpec1: function(e) {
				var that = this
				var spec1 = e.currentTarget.dataset.spec1;
				var option_list_arr = that.option_list_arr;
				option_list_arr[0] = spec1;

				console.log('aaaaaaaaaaaaaaaaaaa', spec1, option_list_arr)
				console.log('aaaaaaaaaaaaaaaaaaa', option_list_arr[0])

				that.spec1 = spec1;
				that.option_list_arr = option_list_arr;

				//如果是一维数组的规则
				if (option_list_arr.length == 1) {
					this.current_spec = spec1;
					this.changeSpec2(null);
				}
				//如果是二维数组的风格，例如： 颜色 + 尺码
				else if (option_list_arr.length == 2) {
					//this.current_spec
					that.option_list_arr[1] = '';
				}

			},

			changeSpec2: function(e) {
				var that = this

				var spec2 = that.current_spec;
				var spec_str = spec2;

				if (e) {
					spec2 = e.currentTarget.dataset.spec2;
				}

				var attr_list = that.attr_list;
				var option_list_arr = that.option_list_arr;

				if (!spec_str) {
					spec_str = that.spec1 + ' ' + spec2

					option_list_arr[1] = spec2
				}


				this.spec2 = spec2;
				this.option_list_arr = option_list_arr;
				
				
				var productid = 0;



				for (var i = 0; i < attr_list.length; i++) {
					if (spec_str == attr_list[i].option_name) {
						var productid = attr_list[i].productid
					}
				}

				this.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + '/Yanyubao/ShopAppWxa/product_detail',
					method: 'post',
					data: {
						productid: productid,
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						var code = res.data.code;
						if (code == 1) {

							that.goods_detail = res.data.data;
							console.log('that.goods_detail', res);
							that.describe = that.goods_detail.describe;

							// #ifdef MP-ALIPAY

							const filter = that.$options.filters["formatRichText"];
							that.describe = filter(that.describe);

							//console.log('that.describe====>>>>', that.describe);

							let data001 = that.describe;
							let newArr = [];
							let arr = parseHtml(data001);
							arr.forEach((item, index) => {
								newArr.push(item);
							});

							//console.log('arr arr arr====>>>>', arr);
							//console.log('newArr newArr newArr====>>>>', newArr);

							that.describe = newArr;

							// #endif	

							that.picture_list = that.goods_detail.picture_list;

							console.log('that.picture_list===>>>', that.picture_list);

							that.picture_length = that.goods_detail.picture_list ? that.goods_detail.picture_list.length : 0;

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}

					},
					fail: function(res) {
						uni.showToast({
							title: '网络异常',
							duration: 2000
						})

					},
				})
			},

			callback_set_option_list_str: function(that, cb_params) {
				
				var that = this;
				
				that.abotapi.getColor();
				
				console.log('wxa_order_hide_daishouhuo_refund',cb_params);
				that.wxa_shop_nav_bg_color = cb_params.wxa_shop_nav_bg_color;
				
				if (!cb_params) {
					return;
				}

				that.default_copyright_text = that.abotapi.globalData.default_copyright_text;

				if (cb_params.wxa_show_kucun_xiaoliang) {

					that.wxa_show_kucun_xiaoliang = cb_params.wxa_show_kucun_xiaoliang;

				}
				
				if(cb_params.app_kefu_msg_type){
					that.app_kefu_msg_type = cb_params.app_kefu_msg_type;
				}

			},

			callback_func_for_shop_info: function(shop_info) {
				this.shop_info = shop_info;
				this.shop_userid = shop_info.userid;
				this.shop_name = shop_info.shop_name;
				this.shop_telephone = shop_info.telephone;

			},

			//点击商户头条进入列表
			touTiaoList: function(e) {
				// console.log('点击商户头条进入列表');
				uni.navigateTo({
					url: '/pages/help/help?sellerid=' + this.abotapi.globalData.default_sellerid
				})
			},

			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			},
			//消息列表
			toMsg() {
				uni.navigateTo({
					url: '../msg/msg'
				})
			},
			// 客服
			toChat() {
				//如果是进入聊天对话框
				if(this.app_kefu_msg_type == 'is_call_mobile'){
					var that = this;
					
					uni.makePhoneCall({
						phoneNumber:that.shop_telephone
					});
				}
				else{
					var userInfo = this.abotapi.get_user_info();
					if (!userInfo || !userInfo.userid) {
						var last_url = '/pages/product/detail?' + this.options_str;
						this.abotapi.goto_user_login(last_url, 'normal');
						return;
					}
					uni.navigateTo({
						url: "/pages/msg/chat/chat?type=0&userid=" + this.shop_userid + '&name=' + this.shop_name,
					})
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
			toCart: function() {
				console.log('toCart 向购物车跳转 ===>>>>', this.abotapi.globalData.is_shop_cart_in_tabbar);

				//2020.8.23. 推广联盟
				if (this.product_source_channel == 1) {
					uni.showModal({
						title: '请通过领取优惠券按钮购买',
						content: buymsg,
						showCancel: false
					})

					return;
				}

				if (this.abotapi.globalData.is_shop_cart_in_tabbar == 1) {
					console.log(this.abotapi.globalData.is_shop_cart_in_tabbar);
					uni.navigateTo({
						url: '/pages/cart/cart'
					})
				} else {
					uni.navigateTo({
						url: '/pages/cart/cart'
					})
				}


			},

			getCartList() {
				let userInfo = this.abotapi.get_user_info();

				if (!userInfo) {
					return;
				}

				var that = this;

				this.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + '/Yanyubao/ShopAppWxa/cart_list',
					data: {
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						page: 1,
						sellerid: this.abotapi.get_sellerid()
					},
					success: (res) => {
						console.log('res', res);

						let amount = 0
						if (res.data.code == 1) {
							let cart_list = res.data.data;

							console.log('cart_list cart_list cart_list ====>>>', cart_list);

							for (let i = 0; i < cart_list.length; i++) {
								amount += parseInt(cart_list[i].amount);

								console.log('cart_list cart_list cart_list ====>>>', amount);
							}
						}

						that.cart_amount = amount

					},
				});
			},

			//收藏
			keep_to_collect() {
				var that = this;

				var userInfo = that.abotapi.get_user_info();


				if ((!userInfo) || (!userInfo.userid)) {
					uni.showModal({
						title: '提示',
						content: '请先登录再收藏',
						success(res) {
							if (res.confirm) {
								var last_url = null;
								var page_type = 'normal';

								if (that.productid) {
									last_url = '/pages/product/detail?productid=' + that.productid;
								}

								that.abotapi.goto_user_login(last_url);
							}
						}
					})


					return;
				}

				this.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + '/Yanyubao/ShopAppWxa/favorite',
					data: {
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						sellerid: this.abotapi.get_sellerid(),
						productid: this.productid,
					},
					success: (res) => {
						console.log('favorite===', res)
						var info = res.data.msg;
						if (info == "收藏成功") {
							this.isKeep = true;
						} else if (info == "取消成功") {
							this.isKeep = false;
						}
						uni.showToast({
							title: info,
							icon: 'success',
							duration: 5000
						})
					},
				});


			},

			//立即购买
			// buy(){
			// 	if(this.selectSpec==null){
			// 		return this.showSpec(()=>{
			// 			this.toConfirmation();
			// 		});
			// 	}
			// 	this.toConfirmation();
			// },


			setModalStatus: function(e) {
				//显示弹出层
				this.showSpec();
				
				var that = this;
				var action_type = '';
				if (e.currentTarget.dataset.type) {
					action_type = e.currentTarget.dataset.type;
				}

				if (e.currentTarget.dataset.status == 1) {
					this.buys = '立即购买';
					this.go_to_buy_url_type = '1';
					this.action_type = action_type;

				} else {
					this.buys = '加入购物车';
					this.go_to_buy_url_type = '2';
					this.action_type = action_type;
				}

				//2020.8.23. 推广联盟
				if (this.product_source_channel == 1) {
					this.buys = '立即购买';
					this.go_to_buy_url_type = '1';
					this.action_type = action_type;
				}
			},



			addShopCart: function(e) { //添加到购物车


				var that = this;
				
				var userInfo = this.abotapi.get_user_info();
				
				if (!userInfo || !userInfo.userid) {

					var last_url = '/pages/product/detail?' + that.options_str;
					this.abotapi.goto_user_login(last_url, 'normal');
					return;
				}


				// if (e.currentTarget.dataset.status == 1) {
				// 	this.addShopCart = true;
				//      }


				if (e.currentTarget.dataset.status == 1) {

					var new_url = '/pages/order/pay?amount=' + that.product_amount + "&productid=" + that.goods_detail.productid +
						"&action=direct_buy";

					uni.navigateTo({
						url: new_url,
					})

				} 
				else if (e.currentTarget.dataset.status == 2) {
					//加入购物车
					this.abotapi.abotRequest({
						url: this.abotapi.globalData.yanyubao_server_url + '/Yanyubao/ShopApp/cart_add',
						method: 'post',
						data: {
							amount: that.product_amount,
							checkstr: userInfo.checkstr,
							productid: that.goods_detail.productid,
							sellerid: this.abotapi.get_sellerid(),
							userid: userInfo.userid,
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: function(res) {
							uni.showToast({
								title: '添加成功',
								success: () => {
									that.getCartList();
									that.hideSpec();
								}
							});

						},
						fail: function(e) {
							uni.showToast({
								title: '添加失败',
							});
						},
					});
				}
				else if(e.currentTarget.dataset.status == 3){
					//既不是立即购买，也不是加入购物车，而是跳转到指定的路径
					
					var new_url = that.go_to_buy_new_url;
					
					if(!that.product_amount){
						that.product_amount = 1;
					}
					
					new_url += '&amount=' + that.product_amount;
					
					uni.navigateTo({
						url: new_url,
					})
				}
			},




			//商品评论
			toRatings() {
				uni.navigateTo({
					url: 'ratings/ratings'
				})
			},
			//跳转确认订单页面
			toConfirmation() {
				let tmpList = [];
				let goods = {
					id: this.goodsData.id,
					img: '../../static/img/goods/p1.jpg',
					name: this.goodsData.name,
					spec: '规格:' + this.goodsData.spec[this.selectSpec],
					price: this.goodsData.price,
					number: this.goodsData.number
				};
				tmpList.push(goods);
				uni.setStorage({
					key: 'buylist',
					data: tmpList,
					success: () => {
						uni.navigateTo({
							url: '/pages/order/pay'
						})
					}
				})
			},
			//跳转评论列表
			showComments(goodsid) {

			},
			//选择规格
			setSelectSpec(index) {
				this.selectSpec = index;
			},

			//修改数量		
			changeNum: function(e) {
				console.log("数量发生变化_e", e);
				var that = this;
				if (e.target.dataset.alphaBeta == 0) {
					if (that.product_amount <= 1) {
						that.product_amount = 1
					} else {
						that.product_amount = parseInt(that.product_amount) - 1;
					};
				} else {
					that.product_amount = parseInt(that.product_amount) + 1;
				};
			},
			//跳转锚点
			toAnchor(index) {
				this.selectAnchor = index;
				uni.pageScrollTo({
					scrollTop: this.anchorlist[index].top,
					duration: 200
				});
			},
			//计算锚点高度
			calcAnchor() {
				this.anchorlist = [{
						name: '主图',
						top: 0
					},
					{
						name: '评价',
						top: 0
					},
					{
						name: '详情',
						top: 0
					}
				]
				let commentsView = uni.createSelectorQuery().select("#comments");
				commentsView.boundingClientRect((data) => {

					let statusbarHeight = 0;

					//APP内还要计算状态栏高度
					// #ifdef APP-PLUS
					statusbarHeight = plus.navigator.getStatusbarHeight()
					// #endif

					let headerHeight = uni.upx2px(100);

					if (data) {
						this.anchorlist[1].top = data.top - headerHeight - statusbarHeight;
						this.anchorlist[2].top = data.bottom - headerHeight - statusbarHeight;
					}

				}).exec();
			},
			//返回上一页
			back_return() {
				uni.navigateBack();
			},
			//服务弹窗
			showService() {
				console.log('show');
				this.serviceClass = 'show';
			},
			//关闭服务弹窗
			hideService() {
				this.serviceClass = 'hide';
				setTimeout(() => {
					this.serviceClass = 'none';
				}, 200);
			},
			//规格弹窗
			showSpec(fun) {
				console.log('show');
				this.specClass = 'show';
				this.specCallback = fun;
			},
			specCallback() {
				return;
			},
			//关闭规格弹窗
			hideSpec() {
				this.specClass = 'hide';
				//回调

				this.selectSpec && this.specCallback && this.specCallback();
				this.specCallback = false;
				setTimeout(() => {
					this.specClass = 'none';
				}, 200);
			},
			discard() {

			},

			//调用接口
			get_yanyubao_goods_recommend: function(list_type = '') {
				console.log('get_yanyubao_goods_recommend=====>>');

				var that = this;

				var post_data = {
					sellerid: that.abotapi.globalData.default_sellerid,
					//is_recommend:1,
					page_num: 6
				};

				if (list_type == 'recommend') {
					post_data.is_recommend = 1;
				} else if (list_type == 'hot') {
					post_data.is_hot = 1;
				}


				this.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + '/Yanyubao/ShopApp/product_list',
					method: 'post',
					data: post_data,
					success(res) {
						console.log('11111111===', res)

						if (res.data.code == 1) {

							if (list_type == 'recommend') {
								var recommend_product_list = res.data.product_list;

								that.recommend_product_list = recommend_product_list;

							} else if (list_type == 'hot') {
								var hot_product_list = res.data.product_list;

								that.hot_product_list = hot_product_list;

							}


						} else {
							if (list_type == 'recommend') {

								that.recommend_product_list = [];

							} else if (list_type == 'hot') {

								that.hot_product_list = [];

							}
						}
						console.log('recommend_product_list', that.recommend_product_list);
						console.log('hot_product_list', that.hot_product_list);
					},

					fail: function(e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					},



				});


			},
			//跳转到首页
			toindex: function() {
				console.log('toCart 向首页跳转');

				this.abotapi.call_h5browser_or_other_goto_url('/pages/index/index');

			},
			block_tanchuang: function(productid) {
				console.log('productid====》》》》', productid);
				var productid = productid.currentTarget.dataset.productid;
				console.log('6666666pppppp', productid);
				uni.navigateTo({

					url: 'detail?productid=' + productid //这是跳转到的页面路径，？id=1这些都是传递的数据，可以直接在test页面接受
				});
			},
			loadCataXiangqing: function() {
				var that = this;



				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/Yanyubao/ShopAppWxa/product_detail_youhui',
					method: 'post',
					data: {
						productid: that.productid,
						//'productid': '2039',
						sellerid: that.abotapi.get_sellerid(),
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						//--init data 
						var code = res.data.code;
						
						if (code >= 0) {
							that.product_youhui_list = res.data.data;
							
							console.log('优惠活动列表===>>>>', that.product_youhui_list);
							
							/*							
							var xiangqing = res.data.data;
							var cataArr = [];
							for (var i = 0; i < xiangqing.length; i++) {
								cataArr.push(xiangqing[i].youhui_type);
							}

							if (cataArr.indexOf("jietijiage") > -1) {
								var cata_key = cataArr.indexOf("jietijiage");
								that.jietijiage_youhui_data = xiangqing[cata_key].youhui_data;
								that.jietijiage = 1;
							}

							if (cataArr.indexOf("huiyuanzhekou") > -1) {
								var cata_key = cataArr.indexOf("huiyuanzhekou");
								that.huiyuanzhekou_youhui_data = xiangqing[cata_key].youhui_data;
								that.huiyuanzhekou_youhui_name = xiangqing[cata_key].youhui_name;
								that.huiyuanzhekou = 1

							}

							if (cataArr.indexOf("duorenpintuan") > -1) {
								var cata_key = cataArr.indexOf("duorenpintuan");
								console.log(cata_key);
								that.pintuan_url = xiangqing[cata_key].url;
								that.duorenpintuan = 1;
							}
							if (cataArr.indexOf("sharekanjia") > -1) {
								var cata_key = cataArr.indexOf("sharekanjia");
								console.log(cata_key);
								that.kanjia_url = xiangqing[cata_key].url;
								that.sharekanjia = 1
							}
							if (cataArr.indexOf("xianshimiaosha") > -1) {
								var cata_key = cataArr.indexOf("xianshimiaosha");
								that.miaosha_url = xiangqing[cata_key].url;
								that.xianshimiaosha = 1;
							}*/
							
							
							
							
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 2000,
							});
						}
					},
					error: function(e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000,
						});
					},
				});
			},

			youhui_huodong_handle: function(e) {
				console.log('youhui_huodong_handle===>>>', e);
				console.log(e.currentTarget.id);

				var that = this;

				var userInfo = that.abotapi.get_user_info();


				if ((!userInfo) || (!userInfo.userid)) {
					var last_url = null;
					var page_type = 'normal';

					if (that.productid) {
						last_url = '/pages/product/detail?productid=' + that.productid;
					}
					that.abotapi.goto_user_login(last_url);

					return;
				}
				
				var cuxiao_huodong_id = e.currentTarget.dataset.youhuitype;
				var youhui_url = e.currentTarget.dataset.youhuiurl;
				
				if(!youhui_url){
					uni.showToast({
						title:'无效活动链接'
					})
					
					return;
				}
				
				var join_flag = '?';
				if (youhui_url.indexOf("?") != -1) {
					join_flag = '&';
				}
				
				youhui_url = youhui_url  + join_flag + 'click_type=shopappv2';
				
				console.log('准备跳转至优惠活动详情页===>>>>'+ youhui_url);
				uni.navigateTo({
					url: '../h5browser/h5browser?url=' + encodeURIComponent(youhui_url)
				});
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

			click_wxa_circle_share: function() {
				abotsharejs.click_wxa_circle_share(this.share_href, this.share_titles, this.share_summary, this.share_imageUrl);
			},


			click_wxa_applet_share: function() {
				var path = 'pages/product/detail?' + this.options_str;
				var account = this.abotapi.globalData.xiaochengxu_account;
				abotsharejs.click_wxa_applet_share(this.share_href, this.share_titles, path, this.share_imageUrl, account);
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

				abotsharejs.click_wxa_command_copy(this.abotapi, cmd_type, this.goods_detail["productid"], userid, sellerid);

			},
			//================= End ================

			click_wxa_system_share: function() {

				abotsharejs.click_wxa_system_share(this.share_summary, this.share_href);
			},
			is_show: function() {
				this.$refs.share_api.is_show();
			},
			goto_buy_union_product: function(e) {
				//推广联盟的优惠券

				var buyurl = e.currentTarget.dataset.buyurl;
				var buymsg = e.currentTarget.dataset.buymsg;

				// #ifdef MP-WEIXIN
				uni.setClipboardData({
					data: buyurl,
					success() {
						uni.showToast({
							title: '复制成功！'
						})
					}
				})


				uni.showModal({
					title: '复制成功',
					content: buymsg,
					showCancel: false
				})
				// #endif

				// #ifdef APP-PLUS
				uni.setClipboardData({
					data: buyurl,
					success() {
						uni.showToast({
							title: '复制成功！'
						})
					}
				});


				this.abotapi.call_h5browser_or_other_goto_url(buyurl);

				// #endif


				// #ifdef H5
				///this.abotapi.call_h5browser_or_other_goto_url(buyurl);
				location.href = buyurl;
				// #endif


			},
			video_start_or_stop:function(){
				if(this.current_video_playing == 1){
					this.current_video_playing = 0
				}
				else{
					this.current_video_playing = 1;
				}
			},
			
			//2020.12.3. 爱拼团
			__get_aipingou_tuan_list:function(productid, rulesn){
				//请求团列表
				// this.aipingou_tuan_list
					var that =this;
					var userInfo = this.abotapi.get_user_info();
					
					var post_url = this.abotapi.globalData.yanyubao_server_url + '/openapi/AipingouData/get_tuan_list';
					
					that.abotapi.abotRequest({
						url: post_url,
						data: {
							sellerid: that.abotapi.get_sellerid(),
							productid:productid,
							rulesn:rulesn
						},
						success: function(res) {
							that.aipin_tuan_list = res.data.aipingou_tuan_list;
							
							console.log('that.aipin_tuan_list====>>>>', that.aipin_tuan_list);
							console.log('that.aipin_tuan_list====>>>>', that.aipin_tuan_list.length);
							
							//团员人数
							that.grounp_count = res.data.group_count;
							
							if(that.aipin_tuan_list && (that.aipin_tuan_list.length > 0)){
								
							}
							
							//开始倒计时
							for(var i=0; i<that.aipin_tuan_list.length; i++){
								
								that.aipin_tuan_list[i].timespan = parseInt(that.aipin_tuan_list[i].over_time)*1000;
								that.aipin_tuan_list[i].timespan_str = 'aaaaaaaaaaa';
								
								that.__aipingou_timer_countdown(i, that);
							}
							
						},
						fail: function(e) {
						
						
							},
						});	
				
				
			},
			go_detail_pintuan:function(tuansn){
				
				var that =this;
				
				this.showSpec();
				
				this.buys = '现在去开团';
				
				this.go_to_buy_url_type = 3;
				
				//this.go_to_buy_new_url = '/pages/order/pay?productid='+ that.productid +'&amount=1&action=direct_buy&cuxiao_huodong=aipingou';
				this.go_to_buy_new_url = '/pages/order/pay?productid='+ that.productid +'&action=direct_buy&cuxiao_huodong=aipingou';
				if(tuansn){
					this.go_to_buy_new_url += '&tuansn='+tuansn;
					
					this.buys = '参与这个团';
				}
				
				this.action_type = '';
				
				
				
				return;
				
				
				var userInfo = this.abotapi.get_user_info();
				
				console.log('88888aaaaaaaaa',productid);
				//判断是否登录/pages/order/pay?productid=12345&cuxiao_huodong=aipingou&tuansn=abcdefg123456
				var last_url = '/pages/order/pay?productid='+ that.productid +'&amount=1&action=direct_buy&cuxiao_huodong=aipingou&tuansn='+ tuansn;
				
				if (!userInfo || !userInfo.userid) {
					uni.showToast({
						title: '请先登录',
						icon: 'none',
						duration: 1000,
					});
					
					this.abotapi.goto_user_login(last_url, 'normal');
					return;
				}
				
				var that = this;
				uni.redirectTo({
					url:last_url,
				});
				
				
			},
			__aipingou_timer_countdown(i, that) {
			    //const that = this;
				
				console.log('__aipingou_timer_countdown==>>i==>>', i);
				console.log('__aipingou_timer_countdown==>>i==>>', that.aipin_tuan_list[i]);
				
				/*
			    setTimeout(() => {
					return;
					
					if(that.aipin_tuan_list[i].timespan == 0) {
					  // 计时结束，清除缓存
					  that.aipin_tuan_list[i].timespan = parseInt(that.aipin_tuan_list[i].over_time)*1000;
					  
					} 
					else{
						that.aipin_tuan_list[i].timespan --;
						that.aipin_tuan_list[i].timespan --;
						that.aipin_tuan_list[i].timespan --;
						
						var hr = parseInt(that.aipin_tuan_list[i].timespan / 60 / 60 % 24);
						var min = parseInt(that.aipin_tuan_list[i].timespan / 60 % 60);
						var sec = parseInt(that.aipin_tuan_list[i].timespan % 60);
						var msec = parseInt(that.aipin_tuan_list[i].timespan % 1000);
									
						hr = hr > 9 ? hr : '0' + hr;
						min = min > 9 ? min : '0' + min;
						sec = sec > 9 ? sec : '0' + sec;
						//that.toLiveBtn = `${day}天${hr}时${min}分${sec}秒${msec}`;
						//that.aipin_tuan_list[i].timespan_str = `${hr}:${min}:${sec}.${msec}`;
						that.aipin_tuan_list[i].timespan_str = hr+':'+min+':'+sec+':'+ msec;
						
						console.log('__aipingou_timer_countdown==>> '+i+' ==>> ', that.aipin_tuan_list[i].timespan_str);
						
					}
					
					
					
					that.__aipingou_timer_countdown(i, that);
					
			    }, 1);*/
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
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
					return match;
				});
				//newContent = newContent.replace(/<br[^>]*\/>/gi, '');

				newContent = newContent.replace(/<p[^>]*>/gi, '<p style="margin:10px;">');

				newContent = newContent.replace(/\<img/gi,
					'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;vertical-align: middle;"');

				newContent = newContent.replace(/<h1[^>]*>/gi, '<h1 class="wxParse-h1">');
				newContent = newContent.replace(/<h2[^>]*>/gi, '<h2 class="wxParse-h2">');

				return newContent;
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}

	@keyframes showPopup {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes hidePopup {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(-100%);
		}
	}

	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}

		100% {
			transform: translateY(0);
		}
	}

	.icon {
		font-size: 26upx;
	}

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		margin-top: var(--status-bar-height);
		/*  #endif  */
		background-color: #f1f1f1;
		transition: opacity 0.05s linear;
	}

	.header {
		width: 100%;

		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);

		/*  #endif  */
		.before,
		.after {
			width: 92%;
			padding: 0 4%;
			height: 100upx;
			display: flex;
			align-items: center;
			position: fixed;
			top: 0;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
			/*  #endif  */
			transition: opacity 0.05s linear;

			.back {
				width: 125upx;
				height: 60upx;
				flex-shrink: 0;

				.icon {
					margin-left: -10%;
					width: 60upx;
					height: 60upx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 42upx;
				}
			}

			.middle {
				width: 100%;
			}

			.icon-btn {
				width: 125upx;
				height: 60upx;
				flex-shrink: 0;
				display: flex;

				.icon {
					&:first-child {
						margin-right: 5upx;
					}

					width: 60upx;
					height: 60upx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 42upx;
				}
			}
		}

		.before {
			.back {
				.icon {
					color: #fff;
					background-color: rgba(0, 0, 0, 0.2);
					border-radius: 100%;
				}
			}

			.icon-btn {
				.icon {
					color: #fff;
					background-color: rgba(0, 0, 0, 0.2);
					border-radius: 100%;

				}
			}
		}

		.after {
			background-color: #f1f1f1;

			.back {
				.icon {
					color: #666;
				}
			}

			.icon-btn {
				.icon {
					color: #666;
				}
			}

			.middle {
				font-size: 32upx;
				height: 90upx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 7%;

				view {
					width: (100%/3);
					padding: 0 3%;
					margin: 0 3%;
					display: flex;
					justify-content: center;
					align-items: center;

					&.on {
						margin-bottom: -4upx;
						color: #f47952;
						border-bottom: solid 4upx #f47952;
					}
				}
			}
		}
	}

	.swiper-box {
		position: relative;
		width: 100%;
		height: 100vw;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);

		/*  #endif  */
		swiper {
			width: 100%;
			height: 100vw;

			swiper-item {
				image {
					width: 100%;
					height: 100vw;
				}
			}
		}

		.indicator {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 25upx;
			height: 40upx;
			border-radius: 40upx;
			font-size: 22upx;
			position: absolute;
			bottom: 20upx;
			right: 20upx;
			color: #fff;
			background-color: rgba(0, 0, 0, 0.2);
		}
	}

	.info-box {
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		width: 92%;
		padding: 10rpx 4%;
		background-color: #fff;
		margin-bottom: 10rpx;
	}

	.goods-info {
		.price {
			font-size: 40upx;
			font-weight: bold;
			color: #f47925;
		}

		.title {
			font-size: 30rpx;
		}
	}

	.spec {
		.row {
			width: 100%;
			display: flex;
			align-items: center;
			margin: 0 0 30upx 0;

			.text {
				font-size: 24upx;
				color: #a2a2a2;
				margin-right: 20upx;
			}

			.content {
				font-size: 24upx;
				display: flex;
				flex-wrap: wrap;
				color: #a2a2a2;

				.serviceitem {
					margin-right: 10upx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					width: 58%;
					margin-top: 10upx;

					view {
						color: #000;
						display: inline-block;
						margin-right: 20upx;
					}
				}

				.sp {
					width: 100%;
					display: flex;

					view {
						background-color: #f6f6f6;
						padding: 5upx 10upx;
						color: #999;
						margin-right: 10upx;
						font-size: 20upx;
						border-radius: 5upx;

						&.on {
							border: solid 1upx #f47952;
							padding: 4upx 8upx;
						}
					}
				}

			}

			.arrow {
				position: absolute;
				right: 4%;

				.icon {
					color: #ccc;
				}
			}
		}
	}

	.comments {
		.row {
			width: 100%;
			height: 40upx;
			display: flex;
			align-items: center;
			margin: 0 0 30upx 0;

			.text {
				font-size: 30upx;
			}

			.arrow {
				font-size: 28upx;
				position: absolute;
				right: 4%;
				color: #17e6a1;

				.show {
					display: flex;
					align-items: center;

					.icon {
						color: #17e6a1;
					}
				}
			}
		}

		.comment {
			width: 100%;

			.user-info {
				width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;

				.face {
					width: 40upx;
					height: 40upx;
					margin-right: 8upx;

					image {
						width: 40upx;
						height: 40upx;
						border-radius: 100%;
					}
				}

				.username {
					font-size: 24upx;
					color: #999;
				}
			}

			.content {
				margin-top: 10upx;
				font-size: 26upx;
			}
		}
	}

	.description {
		.title {
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #999;
			position: relative;
		}

		.content {
			padding-bottom: 50rpx;
		}
	}

	.footer {
		position: fixed;
		bottom: 0upx;
		width: 92%;
		padding: 0 4%;
		height: 99upx;
		border-top: solid 1upx #eee;
		background-color: #fff;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 20rpx;

		.icons {
			display: flex;
			height: 80upx;
			margin-left: -4%;

			.box {
				width: 80upx;
				height: 80upx;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				position: relative;

				.icon {
					font-size: 40upx;
					color: #828282;
				}

				.text {
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 22upx;
					color: #666;
				}

				.amount {
					position: absolute;
					background: #f00;
					color: #fff;
					width: 34rpx;
					height: 34rpx;
					line-height: 34rpx;
					text-align: center;
					border-radius: 50%;
					font-size: 20rpx;
					right: 0rpx;
					top: -16rpx;
				}
			}
		}

		.btn {
			height: 80upx;
			border-radius: 40upx;
			overflow: hidden;
			display: flex;
			margin-right: -2%;

			.joinCart,
			.buy {
				height: 80rpx;
				padding: 0 36rpx;
				color: #fff;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				background-color: #f06c7a;
			}

			.joinCart {
				background-color: #f0b46c;
			}

			.joinCart-null {
				background-color: #808080;
				height: 80upx;
				padding: 0 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				font-size: 28upx;
			}

			.buy-null {
				height: 80upx;
				padding: 0 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				font-size: 28upx;
				background-color: #808080;
				opacity: 0.4;
			}
		}
	}

	.popup {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		display: none;

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 21;
			background-color: rgba(0, 0, 0, 0.6);
		}

		.layer {
			position: fixed;
			z-index: 22;
			bottom: -40%;
			width: 92%;
			padding: 0 4%;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;

			.content {
				width: 100%;
				padding: 20upx 0;

			}

			.btn {
				width: 100%;
				height: 100upx;

				.button {
					width: 100%;
					height: 80upx;
					border-radius: 40upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #f47952;
					font-size: 28upx;
				}
			}
		}

		.layer2 {
			position: fixed;
			z-index: 22;
			bottom: 0;
			width: 92%;
			padding: 0 4%;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;

			.content {
				width: 100%;
				padding: 20upx 0;

				.text {
					float: left;
					font-size: 36upx;
				}

			}

			.btn {
				width: 100%;
				height: 100upx;

				.button {
					width: 100%;
					height: 80upx;
					border-radius: 40upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #f47952;
					font-size: 28upx;
				}
			}
		}

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		&.service {
			.row {
				margin: 30upx 0;

				.title {
					font-size: 30upx;
					margin: 10upx 0;
				}

				.description {
					font-size: 28upx;
					color: #999;
				}
			}
		}

		&.spec {
			.title {
				font-size: 30upx;
				margin: 30upx 0;
			}

			.sp {
				display: flex;

				view {
					font-size: 28upx;
					padding: 5upx 20upx;
					border-radius: 8upx;
					margin: 0 30upx 20upx 0;
					background-color: #f6f6f6;

					&.on {
						padding: 3upx 18upx;
						border: solid 1upx #f47925;
					}
				}
			}

			.length {
				margin-top: 30upx;
				border-top: solid 1upx #aaa;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 20upx;

				.text {
					font-size: 30upx;
				}
			}

			.number {
				float: right;
				display: flex;
				justify-content: center;
				align-items: center;

				.input {
					width: 80upx;
					height: 60upx;
					margin: 0 10upx;
					background-color: #f3f3f3;
					display: flex;
					justify-content: center;
					align-items: center;
					text-align: center;

					input {
						width: 80upx;
						height: 60upx;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;
						font-size: 26upx;
					}
				}

				.sub,
				.add {
					width: 60upx;
					height: 60upx;
					background-color: #f3f3f3;
					border-radius: 5upx;

					.icon {
						font-size: 30upx;
						width: 60upx;
						height: 60upx;
						display: flex;
						justify-content: center;
						align-items: center;

					}
				}
			}
		}
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

	.guige {
		border-bottom: 1rpx solid #bfbfbf;
		padding: 20rpx 0;
		margin-bottom: 10rpx;
		background-color: #fff;
		
		float: left;
		width: 100%;
	}

	.specs {
		padding-left: 5%;
		font-size: 28rpx;
	}

	.specs-a {
		margin: 2% 4% 2% 4%;
		display:block;
		float: left;
	}

	.specs-b {
		font-size: 28rpx;
		border-top: 2px solid rgb(204, 204, 204);
		padding-top: 14rpx;

	}

	.specs-c {
		display: flex;
		padding: 3% 5% 0 5%;
		flex-wrap: wrap;
	}

	.specs-c view {
		font-size: 28rpx;
		padding: 4rpx 10rpx;
		margin-left: 10rpx;
		border-radius: 8rpx;
	}

	.specs-d {
		border: 1px solid #e5e5e5;
		color: #444;
		margin: 10rpx;
		font-size: 28rpx;
		padding: 6rpx 14rpx;
		border-radius: 5px;
		float: left;
		display: block;
	}

	.specs-e {
		border: 1rpx solid #dd2727;
		background-color: #dd2727;
		color: #fff;
		margin: 10rpx;
		font-size: 28rpx;
		padding: 6rpx 14rpx;
		border-radius: 10rpx;
		float: left;
		display: block;
	}

	.text_center {
		width: 100%;
		margin: 20px 0px;
	}

	.mingcheng {
		width: 60%;
		display: inline-block;
		font-size: 35rpx;
		line-height: 50rpx;
		margin-left: 40rpx;
	}

	.drawer_image {
		width: 28%;
		height: 200rpx;
	}

	.re-commend {
		background-color: white;
		overflow: hidden;
		clear: both;
	}

	.re-h {
		margin: 20upx;
		font-size: 28rpx;
		color:#666;
	}

	.re-goods {
		float: left;
		width: 33%;
		margin-bottom: 30rpx;
	}

	.re-goods image {
		width: 200upx;
		height: 200upx;
		margin-left: 30upx;
		border-radius: 20upx;
	}

	.re-txt {
		font-size: 25upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 200upx;
		margin-left: 35upx;
	}

	.re-price {
		font-size: 28upx;
		text-align: left;
		color: #f47925;
		margin-left: 35upx;
	}

	.warm {
		background-color: #AAAAAA;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		z-index: 99;
		position: fixed;
		bottom: 120upx;
		width: 100%;
		font-size: 35upx;

	}

	.block_ladder {
		.yh_1 {
			margin: 0;
			outline: 0 none;
			padding: 0;
		}

		.yh_1_1 {
			color: #E3170D;
			width: 30%;
			display: block;
			float: right;

		}

		.drpt_0 {
			margin: 1%;
			width: 98%;
			border-bottom: 1rpx solid #eee;
			/*box-shadow: 0rpx 2rpx 2rpx #888888;*/
			display: block;
			outline: 0 none;
			padding: 0;
			overflow: hidden;
		}

		.yhmc {
			margin-left: 20rpx;
			margin-top: 20rpx;
			font-size: 28rpx;
			height: 40rpx;
			line-height: 40rpx;
			border: 2rpx solid #E3170D;
			border-radius: 6rpx;
			padding: 2rpx 8rpx;
			color: #E3170D;
			top: 30rpx;
			left: 30rpx;
			float: left;
			max-width: 25%;
		}

		.drpt_1 {
			width: 70%;
			height: auto;
			padding-top: 6rpx;
			padding-bottom: 6rpx;
			padding-right: 2%;
			float: right;
			text-align: right;
			font-size: 28rpx;
			color: #666;
		}

		.drpt_2 {
			width: 70%;
			height: auto;
			padding-top: 30rpx;
			padding-bottom: 30rpx;
			margin-right: 4%;
			float: right;
			text-align: right;
			font-size: 30rpx;
			color: #666;
		}

		.drpt_2 text {
			color: blue;
			font-size: 26rpx;
		}
	}

	.share-btn::after {
		border: none;

	}

	.share-btn {
		line-height: normal;
		background-color: transparent;
		padding: 0,
	}

	.copyright_info {
		margin-bottom: 140rpx;
	}

	.coupon_ticket {
		display: block;
		border: 1rpx solid #FF6103;
		width: 90%;
		margin: 20rpx auto;
		border-radius: 10rpx;
		padding: 10rpx;
		background-color: #FF6103;
		color: #ffffff;
		height: 100rpx;
	}

	.coupon_ticket_left {
		float: left;
		width: 48%;
		border-right: 2rpx solid #fff;
		text-align: center;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 36rpx;
	}

	.coupon_ticket_right {
		float: left;
		width: 48%;
		text-align: center;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 36rpx;
	}
	
	.cuIcon-playfill {
		position: relative;
	    top: -180rpx;
	    left: 10rpx;
	    width: 60rpx;
	    height: 60rpx;
	}
	.cuIcon-playfill image {
		width: 60rpx;
		height: 60rpx;
	}
	.gonghuoshang_shop {
		display: flex;
		align-items: center;
		background-color: #fff;
		margin-bottom: 5px;
	}
	.is_aipingou_tuan_list{
		
		
	}
	.is_aipingou_tuan_list .aipin_tuan{
		margin-top: 10px;
		height: 90rpx;
	}
	.tuan_info_name{
		float: left;
		line-height: 26px;
		margin-left: 15rpx;
	}
	.tuan_info_name img{
		width: 80rpx;
		border-radius:50%;
		overflow:hidden;
	}
	
	
	.tuan_time_number{
		float: right;
	}
	.let_go_pingtuan{
		float: right;
		width: 160rpx;
		font-size: 32rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		border-radius: 10rpx;
		margin-left: 30rpx;
		margin-right: 20rpx;
		color:#FFFFFF;
	}
	.tuan_leder_name{
		float: right;
		line-height: 80rpx;
		margin-left: 10rpx;
		font-size:25rpx;
		color:#666;
	}
	
	.tuan_number {
		font-size:25rpx;
		color:#666;
	}
	
	.tuan_time_over{
		font-size:25rpx;
		color: #666666;
	}
</style>
