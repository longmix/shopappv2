<template>
	<view class="global_background">
		
		<!-- 封面  模糊背景 -->
		<view class="" style="height: 550rpx;">
			
				<image class="package_background" :src="current_package_detail.cover_img_url" ></image>
			<!-- <view class="">
				<image class="package_image" :src="current_package_detail.cover_img_url" ></image>
			</view> -->
			
			
			<!-- icon喜欢图标--------- -->
			<view class="like_number" >
				<image v-if="current_package_detail.is_like == 0"  @tap="set_like(1)" src="https://yanyubao.tseo.cn/Tpl/static/nft_card/xin02.png"
					mode="widthFix" style="width: 50rpx;height: 50rpx; margin-top: 15rpx;margin-left: 12rpx;" ></image>
				<image v-if="current_package_detail.is_like == 1" @tap="set_like(0)"  src="https://yanyubao.tseo.cn/Tpl/static/nft_card/xin.png" 
					mode="widthFix" style="width: 60rpx;height:56rpx;margin-top: 11rpx;margin-left: 8rpx;"  ></image>
				<!-- <view style="font-weight: 100; font-size: 10rpx;"> {{current_package_detail.like_count}}</view> -->
			</view>
			
			
			
			<view class="">
				<!-- 截图按钮 -->
				<view class="package_ps"  @tap="showModal=true">
					<image src="https://yanyubao.tseo.cn/Tpl/static/nft_card/ps.png"
						mode="widthFix" style="width: 45rpx;margin-top: 17rpx;margin-left: 18rpx;"></image>
				</view>
				
				<view class="show_modal_mask" v-if="showModal" @tap="showModal=false"></view>
				<view class="show_modal_pop" v-if="showModal">
					<view class="" style="width: 600rpx;height: 600rpx;background-color: #FFFFFF;">
							<image src="" mode=""></image>	
							<button type="default">保存至相册</button>
					</view>
						
				</view>	
			</view>
			
		
		</view>
		
		<!-- 卡包详情 -->
		<view class="package_information">
			<view class="">
				<view style="float: right;display: flex;">
					<image src="https://yanyubao.tseo.cn/Tpl/static/nft_card/xin.png" mode="widthFix" style="width: 40rpx;margin-top: 10rpx;"></image>
					<view style="margin-top: 10rpx;margin-right: 20rpx;font-size: 35rpx;">{{current_package_detail.like_count}}</view>
				</view>
				<!-- 卡包名字---简介 -->
				<view class="package_title">{{current_package_detail.title}}</view>
				
			</view>
			
			<view class="package_brief">
				{{current_package_detail.brief}}
			</view>
			
		
			<!-- 开始时间~~~结束时间 -->
			<view class="" style="display: flex;height: 60rpx;line-height: 60rpx;">
				<view class="begin_end_time" >
					有效期：{{current_package_detail.time_begin_str}}~{{current_package_detail.time_end_str}}
				</view>	
				<!-- 卡包状态  发行===下架  -->
				<view class="package_state" v-if="is_package_time_expire ==false" style="background-color: #30c478;">
					{{current_package_detail.status_str}}
				</view>
				<view class="package_state" v-else="is_package_time_expire ==true" style="background-color:red;" >已下架</view>
				
				<!-- 分享 -->
				
				
				
				<view>
					<!-- #ifdef MP -->
					
					<button class="box share-btn" open-type="share" style="background: none;outline: none;border: none;">
						<view class="package_share">
							<image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/share.png" mode="widthFix" style="width: 45rpx;margin-top: 8rpx;margin-left: 7rpx;"></image>
						</view>
					</button>
					<!-- <button style="padding-left: 0;padding-right: 0;" open-type="share">分享</button> -->
					<!-- #endif -->
					
					<!-- #ifdef APP-PLUS -->
					
					<button class="box share-btn" @click="is_show">
						
						<view class="package_share">
							<image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/share.png" mode="widthFix" style="width: 45rpx;margin-top: 8rpx;margin-left: 7rpx;"></image>
						</view>
						
						<!-- <view class="icon fenxiang"></view>
						<view class="text">分享</view> -->
						<!-- <button class="text" open-type="share">分享</button> -->
					</button>
					<!-- <button style="padding-left: 0;padding-right: 0;" open-type="share">分享</button> -->
					<!-- #endif -->
					
					
					<!-- #ifdef H5 -->
					<view class="box" @tap="share_shang_detail">
						<view class="package_share">
							<image src="http://192.168.0.87/yanyubao_server/Tpl/static/nft_card/share.png" mode="widthFix" style="width: 45rpx;margin-top: 8rpx;margin-left: 7rpx;"></image>
						</view>
					</view>
					<!-- #endif -->
				</view>
				
				 
			</view>
			
			
		
			<!-- 进度条 -->
		 	<view class="uni-padding-wrap uni-common-mt">
			 	<view class="progress-box">收集进度：（{{current_package_detail.packageid_card_user_buy_count}}/{{current_package_detail.packageid_card_count}}）
					<progress :percent="current_package_detail.sale_percent" activeColor="#30C478" stroke-width="4" 
						show-info="" backgroundColor="red" font-size="5"></progress>
				</view>
			</view>
			
			
			
			<!-- 标签属性 -->
			<view class="package_detail_lable_attribute" >
				<view class="package_detail_lable">标签</view>
				
				<view class="package_label" style="margin-top: 10rpx;">
					<view class="package_detail_lable_list" v-for="(item,index) in current_package_detail.tag_list" style="font-size: 20rpx;"><view style="margin-left: 5rpx;margin-right: 5rpx;">{{item}}</view></view>
				</view>
			</view>
			
		</view>
		
		
		
		<view class="publish_information" style="">
			
				<!-- icon关注图标 -->
				<view class="publish_icon_follow" v-if="current_package_detail.is_fans ==0" @tap="set_fans(1)">
					<image  src="https://yanyubao.tseo.cn/Tpl/static/nft_card/follow01.png" 
						mode="widthFix" style="width: 60rpx; margin-top: 8rpx; "></image>
					<view style="color: #30c478;margin-left:10rpx; margin-top: 5rpx; font-size: 30rpx;">关注</view>
				</view>
				<view class="publish_icon_follow01" v-if="current_package_detail.is_fans ==1" @tap="set_fans(0)">
					<image src="https://yanyubao.tseo.cn/Tpl/static/nft_card/follow02.png" 
						mode="widthFix" style="width: 50rpx;height: 30rpx;margin-top:8rpx ;"></image>
					<view style="color: #FFFFFF;margin-left:0rpx; margin-top: 5rpx; font-size: 30rpx;">已关注</view>
				</view>
		
			
			<!-- 发行商图片及简介 12324-->
			<view class="" style="display: flex;" @tap="goto_supplier_detail()">
				<image class="publish_icon" :src="current_package_detail.supplier_icon" 
					mode="" ></image>
				<view class="package_card_publish">
					
					<!-- 发行商名字----详情 -->
					<view class="publish_name">{{current_package_detail.supplier_name}}</view>
					<view class="publish_brief" style="font-weight: 300; font-size: 20rpx;">{{current_package_detail.supplier_brief}}</view>
						
						
				</view>
					
			</view>
				
			
		</view>
		
	
	
		<!-- 筛选框 -->
		<view class="">
			<view class="list_box">
				<view v-for="(item, tag_item_index) in package_tag_item_list" :key="tag_item_index" @tap="package_tag_item_click(tag_item_index)" 
					:class="[item.selected?'tag_item_selected':'tag_item_unselected']">
						{{item.selected?item.title:item.title}}
						
				</view>
			</view>

		</view>




			
			<!-- <view class="scroll_items">                 
				<button size="mini" id="clicl_0">全部</button>
			</view>
			<view class="scroll_items">                 
				<button size="mini" id="click_1" >典藏卡</button>
			</view>                                     
			<view class="scroll_items">                 
				<button size="mini" id="clicl_2">珍藏卡</button>
			</view>	                                    
			<view class="scroll_items">                 
				<button size="mini" id="click_3" >已有</button>
			</view>		
			<view class="scroll_items">
				<button size="mini" id="click_4">未有</button>
			</view> -->


							
		<!-- 卡包中的卡牌 --> 
		<view class="card_list_background">
			<view class="my_package_detail_card_list">
				<view class="card_list"
						v-for="(current_card_item,index) in current_card_list"
						@tap="go_to_card_detail(current_card_item.packageid, current_card_item.cardid)">
					<view class="">
						<image class="package_card_img" :src="current_card_item.cover_img_url_2x3_stand" mode="widthFix"></image>
					
					
						<!-- icon喜欢图标和喜欢人数-----------已有卡牌/已发售卡牌 -->
						<view class="already_sold_card_icon_like">
							<view class="card_like_num" >
								<image class="card_img" src="https://yanyubao.tseo.cn/Tpl/static/nft_card/collect.png" mode="widthFix" style="width: 25rpx;"></image>
								{{current_card_item.favorite_counter}}
							</view>
							<!-- <view class="sold_card">
								（{{current_card_item.buy_counter}}/{{current_card_item.publish_counter}}）
							</view> -->
						</view>
							
									
						<!-- 卡牌名称-----卡牌简介 -->
						<view class="package_card_name_brief">
							<view class="package_card_name" >{{current_card_item.card_name}}</view>
								<!-- <view style=" font-weight: 100; font-size: 10rpx;">发行商：{{current_card_item.supplier_name}}</view> -->
							
							<view class="package_card_description" >
								{{current_card_item.description}}{{current_card_item.brief}}	
							</view>
						</view>
					</view>
				</view>	 
			</view>
					
		</view>
		
		
		<!-- 系列卡包 -->
		<view class="" style="margin: 20rpx;">
			<view style="font-weight: 100;font-size: 10rpx;float: right;color: red;margin-top: 5rpx;" 
			@tap="go_to_package_list()">>>更多卡包>></view>
			<view class="" style="font-weight: bold;">系列卡包</view>
		</view>
		<scroll-view scroll-x="true">
			<view class="" style="display: flex;margin-left: 20rpx;">
				<view class="" style="margin-bottom: 30rpx;" v-for="(current_package_item,index) in current_package_list"
						@tap="goto_package_detail(current_package_item.packageid)">
					<image :src="current_package_item.cover_img_url_3x2_stand" mode="widthFix"
						style="width: 300rpx;border-radius: 10rpx;overflow: hidden;"></image>
					<view class="series_package" style="font-weight: bold;margin-left: 5rpx;">{{current_package_item.title}}</view>
				</view>	
			</view>
					
		</scroll-view>
			
		
		
		
		
		
		<!-- 富媒体文本展示卡牌详情 -->
		<view class="" style="background-color: #FFFFFF;">
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
</template>

<script>
	
import util from '../../common/util.js';

// #ifdef MP-ALIPAY
import parseHtml from "../../common/html-parser.js"
// #endif
	
	
export default {
	data() {
		return {
			current_params_str:'',	//网址参数
			current_nftcard_poster:null,
			current_package_detail:null,
			current_supplier_detail:null,
			current_package_list:null,
			current_card_list:null,
			current_supplier_fans_add:null,
			current_packageid:0,
			
			current_cardid:0, 
			current_userid:0,
			current_nft_supplierid:0,
		
			showModal: false,
			
			
			card_description:'',  //卡包的富媒体描述
			
			package_tag_item_list:[
				{tag_id:1, selected:true, title:'全部卡牌'},
				{tag_id:2, selected:false, title:'典藏卡'},
				{tag_id:3, selected:false, title:'珍藏卡'},
				{tag_id:4, selected:false, title:'已有'},
				{tag_id:5, selected:false, title:'未有'},
			],
			package_tag_item_selected_seq_list:[],
			
			//卡包是否已经过期
			is_package_time_expire: false,
		
		
		
			wxa_shop_nav_bg_color: '#30C478',
		};
	},
	onLoad: function (options) {
		
		console.log('当前时间：' + util.formatTime( new Date() ) + ' ' + util.formatTime2( new Date() ) + ':01' );
		
		console.log('newDate====>>>>>>', util.get_time_stamp() );
		
		
		console.log('pages/tabBar/index/index====>>>>', options);
		
		var that = this;
		
		uni.setNavigationBarTitle({
			title : that.abotapi.globalData.default_shopname
		});
		
		uni.setNavigationBarTitle({
			title : '卡包详情',
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
		
		
		that.current_packageid = options.packageid;
		
		console.log('that.current_packageid ===》》 ', that.current_packageid);
		
		if(!that.current_packageid){
			uni.showModal({
				title:'',
				content:',',
				showCancel:false
			});
			
			return;
		}
		
		
		that.current_package_detail = {'title':''};
		that.current_package_detail.cover_img_url = 'https://yanyubao.tseo.cn/Tpl/static/nft_card/default_package_cover.png';
		that.current_package_detail.description = '';
		that.current_package_detail.title ='';
		that.current_package_detail.brief = '';
		that.current_package_detail.time_begin_str = '';
		that.current_package_detail.time_end_str = '';
		that.current_package_detail.supplier_name = '';
		that.current_package_detail.packageid_card_user_buy_count='';
		that.current_package_detail.packageid_card_count = '';
		
		
		//获取卡包详情
		var post_data = {
				sellerid:that.abotapi.globalData.default_sellerid,
				packageid:that.current_packageid,
				nft_supplierid : that.current_nft_supplierid,
				
			};
			
		var userInfo = that.abotapi.get_user_info();	
		if(userInfo){
			post_data.userid = userInfo.userid;
			post_data.checkstr = userInfo.checkstr;
		}
		
		console.log('=========>>>>>>>>>>>');
		console.log(post_data);
	
		that.abotapi.abotRequest({
			url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_package_detail',
			method: 'post',
		    data: post_data,
		    success: function (res) {
			
				if(res.data.code != 1){
					uni.showToast({
						title:'卡包详情没数据',
						duration: 2000,
					});
					
					return;
				}
		
				that.current_package_detail = res.data.data;
				
				console.log('current_package_detail ===>>> ', that.current_package_detail);
				
				
				//计算已经售出的备份比
				that.current_package_detail.sale_percent = 0;
				if(that.current_package_detail.packageid_card_count == 0){
					that.current_package_detail.sale_percent = 99.99;
				}
				else{
					console.log('fenmu===========>',that.current_package_detail.packageid_card_count);
					console.log('fenzi===========>',that.current_package_detail.packageid_card_user_buy_count);
					console.log('===========>',that.current_package_detail.sale_percent);
					
					
					
					that.current_package_detail.sale_percent =
						parseInt(that.current_package_detail.packageid_card_user_buy_count/that.current_package_detail.packageid_card_count*100);
				}
				
				
				//检查卡包是否已经过期
				if(that.current_package_detail.time_end < util.get_time_stamp()){
					that.is_package_time_expire = true;
				}
				
				
				//处理商品详情
				that.card_description = that.current_package_detail.description;
				
				
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
				
					//console.log('arr arr arr====>>>>', arr);
					//console.log('newArr newArr newArr====>>>>', newArr);
				
					that.card_description = newArr;
				
				// #endif	
				
				
		    },
		    fail: function (e) {
				uni.showToast({
					title: '网络异常！',
					duration: 2000
				});
		    },
		});
		
		
		
		
		that.abotapi.abotRequest({
		    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_nftcard_poster',
		    method: 'post',
		    data: {
				sellerid:that.abotapi.globalData.default_sellerid,
				packageid:that.current_packageid,
				data_type:'package',
				
		    },
		    success: function (res) {
				
				if(res.data.code != 1){
					uni.showToast({
						title:'没数据',
						duration: 2000,
					});
					
					return;
				}
		
				that.current_nftcard_poster = res.data.data;
				
				console.log('current_nftcard_poster ===>>> ', that.current_nftcard_poster);
				
				
				
				
				
				
				
				
						
				
		    },
		    fail: function (e) {
				uni.showToast({
					title: '网络异常！',
					duration: 2000
				});
		    },
		});
		
		
		
		
		
		//当前卡包所属的supplierid
		if(options.nft_supplierid){
			that.current_nft_supplierid = options.nft_supplierid;
		}
		else{
			//that.current_nft_supplierid = that.abotapi.globalData.default_sellerid;
		}
		
			
		that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);
			
		
		
		that.abotapi.abotRequest({
		    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_package_list',
		    method: 'post',
		    data: {
				sellerid:that.abotapi.globalData.default_sellerid,
				nft_supplierid : that.current_nft_supplierid,
				
		    },
		    success: function (res) {
				
				if(res.data.code != 1){
					uni.showToast({
						title:'卡包列表没数据',
						duration: 2000,
					});
					
					return;
				}
		
				that.current_package_list = res.data.data;
				
				console.log('current_package_list ===>>> ', that.current_package_list);
				
				
				
				
				
				
				
				
						
				
		    },
		    fail: function (e) {
				uni.showToast({
					title: '网络异常！',
					duration: 2000
				});
		    },
		});
		
		
		
		
		
		
		console.log('导航栏背景颜色：' + that.abotapi.globalData.navigationBar_bg_color);
		
		
		//获取卡牌列表
		that.__get_card_list();
		
		
	
	
		
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
		
		
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	/*  onReachBottom: function () {
		
		//this.get_product_list();
		
	}, */
	
	onShareAppMessage: function () {
		var that = this;
		
		var share_title = current_package_detail.title;
		if (share_title.length > 22) {
			share_title = share_title.substr(0, 20) + '...';
		}
		
		var share_path = '/pages/nftcard/package_detail?sellerid=' +that.abotapi.globalData.default_sellerid+'packageid='+that.current_packageid;
		
		var userInfo = this.abotapi.get_user_info();
		
		if (userInfo && userInfo.userid) {
			share_path += '&userid=' + userInfo.userid;
		}
		
		var share_img = current_package_detail.cover_img_url_stand;
		
		return {
			title: share_title,
			path: share_path,
			imageUrl: share_img,
			success: function(res) {
				// 分享成功
				uni.showToast({
					title: '转发成功',
					icon: 'success',
					duration: 2000
				})
			},
			fail: function(res) {
				// 分享失败
				uni.showToast({
					title: '转发失败',
					icon: 'success',
					duration: 2000
				})
			}
		}
	},
	// 
	onShareTimeline: function () {
		return this.share_return();
	},
	
	onAddToFavorites: function () {
		return this.share_return();
	},
	methods: {
		share_return: function() {
			var that = this;
		

			var share_title = current_package_detail.title;
			if (share_title.length > 22) {
				share_title = share_title.substr(0, 20) + '...';
			}
			
			var share_path = '/pages/nftcard/package_detail?sellerid=' +that.abotapi.globalData.default_sellerid+'packageid='+that.current_packageid;
			
			var userInfo = this.abotapi.get_user_info();
			
			if (userInfo && userInfo.userid) {
				share_path += '&userid=' + userInfo.userid;
			}
			
			var share_img = option_list.wxa_share_img;
			
			return {
				title: share_title,
				query: share_path,
				imageUrl: share_img,
			}
			
			
		},
		
	
/**
 * @param {Object} tag_item_index
 * 			package_tag_item_list:[
				{tag_id:1, selected:true, title:'全部卡牌'},
				{tag_id:2, selected:false, title:'典藏卡'},  免费
				{tag_id:3, selected:false, title:'珍藏卡'},  收费
				{tag_id:4, selected:false, title:'已有'},
				{tag_id:5, selected:false, title:'未有'},
			],
 */	
		package_tag_item_click(tag_item_index){
			
			var filter_price_type = -1;   // 1 免费  2  收费
			var filter_userid_type = -1;  // 1 已有  2  未有
			
			var click_tag_id = -1;
			click_tag_id = this.package_tag_item_list[tag_item_index].tag_id;
			
			//1，控制界面变化
			if(this.package_tag_item_list[tag_item_index].selected == true ){
				
				this.package_tag_item_list[tag_item_index].selected = false;
				
				/*
				for (var i=0; i< this.package_tag_item_selected_seq_list.length; i++){
					if(this.package_tag_item_selected_seq_list[i] == click_tag_id){
						this.package_tag_item_selected_seq_list.splice(i, 1);
					}
					
				}*/
			}
			else{
				
				this.package_tag_item_list[tag_item_index].selected = true;
				
				//this.package_tag_item_selected_seq_list.push(this.package_tag_item_list[tag_item_index].tag_id);
				
				//如果选择的  全部
				if(click_tag_id == 1){
					
					for (var i=0; i< this.package_tag_item_list.length; i++){
						if(this.package_tag_item_list[i].selected && (this.package_tag_item_list[i].tag_id != 1)){
							this.package_tag_item_list[i].selected = false;
						}
						
					}
				}
				else{
					for (var i=0; i< this.package_tag_item_list.length; i++){
						if(this.package_tag_item_list[i].selected && (this.package_tag_item_list[i].tag_id == 1)){
							this.package_tag_item_list[i].selected = false;
						}
						
					}
				}
				
			}
			
			
			//2，计算那些被选中了
			var tag_id001 = this.package_tag_item_list[0].selected;
			var tag_id002 = this.package_tag_item_list[1].selected;
			var tag_id003 = this.package_tag_item_list[2].selected;
			var tag_id004 = this.package_tag_item_list[3].selected;
			var tag_id005 = this.package_tag_item_list[4].selected;
			
			if(tag_id001){
				
			}
			else{
				if(tag_id002 && tag_id003){
					
				}
				else if(tag_id002){
					//免费的卡牌
					filter_price_type = 1;
				}
				else if(tag_id003){
					//收费的卡牌
					filter_price_type = 2;
				}
				
				if(tag_id004 && tag_id005){
					
				}
				else if(tag_id004){
					//已有的卡牌
					filter_userid_type = 1;
				}
				else if(tag_id005){
					//还没有的卡牌
					filter_userid_type = 2;
				}
				
			}
			
			//获取卡牌的列表
			this.__get_card_list(filter_price_type, filter_userid_type);
			
			
		},
		
		
		
		
		
		
		
		
		
		callback_function_shop_option_data:function(that, cb_params){
			
			console.log('当前调试开关22：' + this.system_debug_flag);
			console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);
			
			if(!cb_params){
				return;
			}
			
			
			console.log('cb_params====', cb_params);
		},
		
		
		go_to_card_detail:function(packageid, cardid){
			console.log('packageid===>>>' + packageid);
			console.log('cardid===>>>' + cardid);
			
			uni.navigateTo({
				url: '/pages/nftcard/card_detail?packageid='+packageid+'&cardid='+cardid,
			})
		},
		
		goto_package_detail:function(packageid){
			uni.navigateTo({
				url:'/pages/nftcard/package_detail?packageid='+packageid,
			})
		},
		 
		 
		 go_to_package_list:function(packageid, cardid){
			 console.log('packageid===>>>' + packageid);
			 console.log('cardid===>>>' + cardid);
			 
			 uni.navigateTo({
			 	url: '/pages/nftcard/package_list?packageid='+packageid+'&cardid='+cardid,
			 })
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
		 
		
		 
		 goto_supplier_detail:function(shangid){
		 	console.log('跳转到发行商详情:' + shangid);
		
		 	uni.navigateTo({
		 		url: '/pages/shopDetail/shopDetail?shangid='+this.current_package_detail.sellerid,
		 	})
		 },
		  
		
		
		
		set_like:function(value001){
			var that = this;
			
			//======= 判断用户是否登录 ============
			var last_url = '/pages/nftcard/package_detail?'+ that.current_params_str;
			
			var userInfo = that.abotapi.get_user_info();
			if (!userInfo) {
				that.abotapi.goto_user_login(last_url);
			
				return;
			}
			//============= End ================
		
			
			
			//请求服务器接口、喜欢或取消喜欢卡包
			var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					packageid:that.current_package_detail.packageid,					
				};
				
			var userInfo = that.abotapi.get_user_info();	
			if(userInfo){
				post_data.userid = userInfo.userid;
				post_data.checkstr = userInfo.checkstr;
			}

			
			//添加喜欢   请求喜欢接口
			that.abotapi.abotRequest({
			    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/package_like_add',
			    method: 'post',
			    data: post_data,
			    success: function (res) {
					
					if(res.data.code != 1){
						uni.showToast({
							title:'收藏失败',
							duration: 2000,
						});
						
						return;
					}
					
					that.current_userid = res.data.data;
					
					console.log('current_userid  ===>>> ', that.current_userid);
					
					
					
					
					
					//请求成功之后，修改本地的数据
					that.current_package_detail.is_like = value001;
					
					
					
					
					
					
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
			});
			
		},	
			
				
		set_fans:function(value002){
			var that = this;
			
			//======= 判断用户是否登录 ============
			var last_url = '/pages/nftcard/package_detail?'+ that.current_params_str;
			
			var userInfo = that.abotapi.get_user_info();
			if (!userInfo) {
				that.abotapi.goto_user_login(last_url);
			
				return;
			}
			//============= End ================
		
			
			
		
			
			//请求服务器接口、关注 已关注
			var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					
					nft_supplierid:that.current_nft_supplierid,
					userid:that.current_userid,			
				};
				
			var userInfo = that.abotapi.get_user_info();	
			if(userInfo){
				post_data.userid = userInfo.userid;
				post_data.checkstr = userInfo.checkstr;
			}

			
			//添加关注   请求粉丝接口 
			that.abotapi.abotRequest({
			    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/supplier_fans_add',
			    method: 'post',
			    data: post_data,
			    success: function (res) {
					
					if(res.data.code != 1){
						uni.showToast({
							title:'关注失败',
							duration: 2000,
						});
						
						return;
					}
					
					that.current_supplierid = res.data.data;
					
					console.log('current_supplierid  ===>>> ', that.current_supplierid);
					
					
					
					
					
					//请求成功之后，修改本地的数据
					that.current_package_detail.is_fans = value002;
					
					
					
					
					
					
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
			});
			
		
			
			
			
		},
		
		__get_card_list:function(filter_price_type=-1, filter_userid_type=-1){
			var that = this;
			
			var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					packageid:that.current_packageid,
			};
			
			if(filter_price_type != -1){
				//典藏卡
				post_data.filter_price_type = filter_price_type;
			}
			
			if(filter_userid_type != -1){
				//典藏卡
				post_data.filter_userid_type = filter_userid_type;
			}
			
			
			that.abotapi.abotRequest({
			    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/get_card_list',
			    method: 'post',
			    data: post_data,
			    success: function (res) {
					
					if(res.data.code != 1){
						uni.showToast({
							title:'卡包详情没有数据',
							duration: 2000,
						});
						
						return;
					}
					
					that.current_card_list = res.data.data;
					
					console.log('current_card_list ===>>> ', that.current_card_list);
					
					
			    },
			    fail: function (e) {
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
	
}
	
	
</script>

<style>
	@import "/static/css/nftcard.css";
	
	
	
	
	
	.package_background{
		position: absolute;
		width: 100%;
		height: 550rpx;
	}
	
	
/* 	.package_image{
		position: absolute;
		left: 20rpx;
		top: 10rpx;
		transform:translate(30%,10%);
		width: 450rpx;
		height: 450rpx;
		border-radius: 20rpx;
		border: #F0F0F0 solid 2rpx;
		box-shadow: 0rpx 0rpx 20rpx #F0F0F0;
		background-color: #FFFFFF; 
	}*/
	.package_information{
		background-color: #FFFFFF;
		margin:20rpx 10rpx;
		padding: 0 20rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.label_like_number{
		width: 100%;
		height: 50rpx;
		margin-top: 20rpx;
		margin-bottom: 10rpx;
	}
	.like_number{
		float: right;
		position:relative;
		margin-right: 45rpx;
		margin-top:430rpx; 
		width: 75rpx; 
		height: 75rpx;
		background: rgb(0, 0, 0,0.7);
		border-radius: 50%;
		overflow: hidden;
	}
	.package_ps{
		float: right;
		position: relative;
		margin-right:-75rpx;
		margin-top: 45rpx;
		width: 80rpx; 
		height: 80rpx; 
		background: rgb(0, 0, 0,0.7);
		border-radius: 50%;
		overflow: hidden;
	}
	.show_modal_mask{
		background-color: #000;
		opacity: 0.7;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
	}
	.show_modal_pop{
		position: fixed;
		z-index: 999;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		
	}
	.package_title{
		width: 80%; 
		margin-bottom: 20rpx;
		margin-top: 10rpx;
		font-weight: bold;
		font-size: 40rpx; 
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		
	}
	.package_state{
		width:150rpx; 
		border-radius:10rpx;
		
		text-align: center; 
		color: #FFFFFF;
		height: 45rpx;
		margin-left: 50rpx;
		line-height: 45rpx;
		margin-top: 10rpx;
	}
	.package_share{
		margin-left: 40rpx;
		width: 60rpx; 
		height: 60rpx; 
		
	}
/* 	.package_detail_lable_attribute{
		background-color: #ffffff;
		width: 730rpx;
		height: 120rpx;
		margin-left: 10rpx;
		border-radius: 20rpx;
		overflow: hidden;
		margin-bottom: 30rpx;
	} */
	.package_detail_lable{
		
		margin-top: 5rpx;
		height: 40rpx;

	}
	.package_detail_lable_list{
		
		border: #15c5ce solid 2rpx;
		color: #15c5ce;
		margin: 0rpx 20rpx 10rpx 0rpx;
		
		border-radius: 6rpx;
		overflow: hidden;
		font-size: 20rpx;
		
		
	} 

	.publish_information{	
		height: 150rpx;
		background-color: #FFFFFF;
		margin: 30rpx 10rpx 20rpx 10rpx;
		
		border-radius: 20rpx;
		overflow: hidden;
	}
	.publish_icon{
		margin: 10rpx 20rpx;
		border-radius: 50%; 
		overflow: hidden;
		width: 200rpx;
		height:130rpx ;
	
	}
	.package_card_publish{
		width: 100%;
		margin-top: 25rpx;
		margin-left:40rpx;
	
	}
	.publish_icon_follow{
		width: 150rpx;
		height: 50rpx;
		display: flex;
		float: right; 
		margin-top: 50rpx;
		margin-right: 20rpx;
		background-color:#ffffff; 
		border-radius: 10rpx;
		overflow: hidden;
		border: #30c478 2rpx solid;
	}
	.publish_icon_follow01{
		width: 150rpx;
		height: 50rpx;
		display: flex;
		float: right; 
		margin-top: 50rpx;
		margin-right: 20rpx;
		background-color:#30c478; 
		border-radius: 10rpx;
		overflow: hidden;
	}
	.publish_name{
		margin-bottom: 5rpx;
		width: 60%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
/* 	.scroll_button{
		display: flex;
		white-space: nowrap;
		justify-content: space-between;
		margin:20rpx 0;
	
	} */
	/* .scroll_items{
		padding: 8rpx;
		margin-left: 0rpx;
	} */
	
/* 	.checked_button{
		background: #30c478;
		color: #FFFFFF;
		} */
	.card_list_background{
		display: flex;
		flex-direction: column;
		align-items: center;
		
	}
	.my_package_detail_card_list{
		margin-top: -20rpx;
		width: 730rpx;
	}
	.card_list{

		float: left;
 		background-color: #FFFFFF; 
		width: 350rpx;
		margin:10rpx 7rpx 15rpx 8rpx;
		border-radius: 10rpx;
		overflow: hidden;
		box-shadow: 3rpx 6rpx 15rpx #707070;
		
	}
	.package_card_img{
		border-radius: 10rpx;
		overflow: hidden;
		width: 350rpx; 
		height: 510rpx;

	}
	.already_sold_card_icon_like{
		margin-top: -5rpx;
		width: 100%;
	}
	.card_like_num{
		font-weight:100;
		font-size: 20rpx; 
		float: right;
		margin-right: 10rpx;
		margin-top:20rpx;
	
	}
	.card_img{
		
		background-color: #FFFFFF; 
	}
/* 	.sold_card{
		font-weight: 100;
		font-size: 20rpx;
		margin-left: 10rpx;
	} */
	.package_card_name_brief{
		width: 340rpx;
		margin-left: 10rpx;
	}
	.package_card_name{
		width: 60%;
		font-weight: bold;
		font-size: 40rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		
	}
	.package_card_description{
		width: 90%;
		font-weight: 300; 
		font-size: 20rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		
	}

	
	 .list_box {  
			display: flex;
			justify-content: space-between;
			margin: 10rpx 20rpx 40rpx 20rpx;
					
	    }
	
	    /* 已选择 */
	    .tag_item_selected {
			
			margin-top: 10rpx;
			height: 57rpx;
			text-align: center;
			line-height: 57rpx;
			width: 134rpx;
			margin-left:5rpx ;
	        background: #30c478;
	        color: #FFFFFF;
	        border-radius: 10rpx;
	        font-size: 30rpx;
	    }
	
	    /* 未选择 */
	    .tag_item_unselected {
			margin-top: 10rpx;
			height: 55rpx;
			text-align: center;
			width: 130rpx;
			line-height: 57rpx;
/* 	        border: 1px solid #30c478; */
	        background: #FFFFFF;
	        margin-left:5rpx ;
	        border-radius: 10rpx;
	        font-size: 30rpx;
	    }
		.series_package{
			width:340rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
</style>
