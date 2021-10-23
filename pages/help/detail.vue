<template>
	<view>
		<view class='wz_title'>{{wz_text.title}}</view>
		
		<view class="title_box" v-if="form_page == 'publish_list'"><!--   -->
			
			 <!-- 头像和昵称 -->
			<view class="head_img">
				<image :src="wz_text.user_detail.headimgurl"></image>
			</view>
			<view>
				<b>
					<view class="nickname">
						<!-- 昵称 -->
						{{wz_text.user_detail.nickname}}
					</view>
				</b>
				<view class="cata_name">
					<!-- 分类名称 -->
					<view style="font-size: 25rpx;line-height: 40rpx;">{{wz_text.classname}}</view>
				</view>
			</view>
		</view>
		<abotshare
			ref="share_api"
			@click_wxa_share="click_wxa_share"   
			@click_wxa_circle_share='click_wxa_circle_share'  
			@click_wxa_applet_share='click_wxa_applet_share'  
			@click_wxa_system_share='click_wxa_system_share'
			@click_wxa_command_copy='click_wxa_command_copy'
			flag_hidden_btn_command_copy=1
		></abotshare>
		
		
		<view style='margin-top:10rpx;margin-bottom:250rpx;'>
		
			<view class='datetime' v-if="wxa_show_article_detail_category == 1">
				<view class='yuanchuang'>分类：{{wz_text.classname}}</view>
				<view class='guge'>{{app_name_chat_title}}</view>
				<view class='yuanchuang' style='margin-left:15px;'>{{wz_text.updatetime}}</view>
			</view>
			<view class='wenzhang_detail'>
				<!-- <import src="../../wxParse/wxParse.wxml"/> -->
				<view class="wxParse"> 
					<scroll-view  scroll-y='true'>
						<!-- <view v-html="info" ></view> -->
						
						
<!-- #ifdef MP-ALIPAY -->			
					<rich-text :nodes="article_info"></rich-text>
<!-- #endif -->				
<!-- #ifndef MP-ALIPAY -->
					<rich-text :nodes="article_info|formatRichText"></rich-text>
<!-- #endif -->						
						
						
					</scroll-view>
				</view>
				<view style="margin-top: 10px;" v-for="img_item in wz_text.picture_list" :key="img_item" v-if="form_page == 'publish_list'">
					<image style="width: 100%;" mode="widthFix" :src="img_item"></image>
				</view>
				
				<!-- 自定义属性 -->
				<block  v-for="(value_item,index) in wz_text.value_list" :key="index">
					<view class="wenzhang_meihua" 
						v-if="value_item.fieldvalue && (value_item.fieldname != 'user_detail_nickname')
						 && (value_item.fieldname != 'user_detail_headimgurl')">
					
						<view class="wenzhang_meihua_name">{{value_item.displayname}}</view>：
						
						<text v-if="value_item.fieldname == 'mobile'" @click="call_mobile(value_item.fieldvalue)">{{value_item.fieldvalue}}</text>
						<image v-if="value_item.fieldname == 'mobile'" @click="call_mobile(value_item.fieldvalue)" style="margin-left: 10rpx;width: 30rpx;height: 30rpx;" 
							src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_phone.png"></image>
						<text v-else>{{value_item.fieldvalue}}</text>
					
					
					</view>
				</block>
				
				<!-- 收藏和分享 -->
				<view class="article_bottom" v-if="1">
					<view style="color:#bfbfbf;">
						<image class="comment_img comment_right_img"
							:src="isShoucang==true ?  '../../static/img/help/star_on.png': '../../static/img/help/star_off.png'" @tap='shoucang' ></image>
					</view>
					
					<view style="display: flex;">
						
						<!-- #ifdef MP -->
						<button  class="share" open-type="share"></button>
						<image class="comment_img comment_right_img" src="../../static/img/help/share.png" open-type="share"></image>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						<image class="comment_img comment_right_img" src="../../static/img/help/share.png" @click="is_share_api_show"></image>
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<image class="comment_img comment_right_img" src="../../static/img/help/share.png" @tap="share_publish"></image>
						<!-- #endif -->
						
						
					</view>
					
				</view>
				
				
				<view class="article_bottom" v-if="1">
					<view style="color:#bfbfbf;">阅读 {{wz_text.click}}</view>
					<!-- 点赞 -->
					<view style="display: flex;">
						<view @tap='doArticleDianzan' :data-zantype="1" style='margin-right: 20rpx;'>
							<image style="width:30rpx;height:30rpx;margin-right:15rpx"  :src="dianzan_status == 0 || dianzan_status == 2 ? '../../static/img/help/dianzan_grey.png':'../../static/img/help/dianzan_red.png'"></image>
							<text style="font-size:30rpx">{{wz_text.dianzan_num}}</text>
						</view>
						
						<view @tap='doArticleDianzan' :data-zantype="2">
							<image style="width:30rpx;height:30rpx;margin-right:15rpx"  :src="dianzan_status == 0 || dianzan_status == 1 ? '../../static/img/help/dianzan02_grey.png':'../../static/img/help/dianzan02_red.png'"></image>
							<text style="font-size:30rpx">{{wz_text.dianzan_num2}}</text>
						</view>
					</view>
					
				</view> 
			</view>
			
			
			<!-- 评论 -->
			<view class="comment_list" id="the-id"  v-if="hidden_remark != 1">
				<view :style="{'border-left': 6 +'rpx' + 'solid' + theme_color_wenku}"  style="padding-left:20rpx;margin-top:36rpx;margin-bottom:36rpx;font-size:26rpx;color:#999">热门评论</view>
				<view class="comment_list_aa" v-if="remarkList.length" v-for="(items,index) in remarkList" :key="index">
					<image class="comment_list_user_icon" :src="items.headimgurl" mode="widthFix"></image>
					<view style="width:97%;">
						<view class="comment_list_right" style="">
							<text class="comment_list_username">{{items.name}}</text>
							<!-- <view @tap="doDianzan" data-tongjiid="{{item.tongjiid}}"><image class="comment_list_dianzan" src="../../../static/img/help/dianzan_grey.png" style="margin-right:20rpx;"></image><text style="font-size:26rpx;">222</text></view> -->
						</view>
						<view class="comment_text">{{items.message}}</view>
						<!-- <view class="comment_time">{{item.createtime}}</view> -->
						<view class="comment_huifu" v-if="items.reply">
							<text class="comment_huifu_author" :style="{'border-left-color':theme_color_wenku}">{{items.reply_name}}</text>
							<text class="comment_huifu_text" style="">{{items.reply}}</text>
						</view>
					</view>
					<view class="comment_delete" :data-id="items.id" @tap='deleteRemark'  
						v-if="userInfo && items && (userInfo.userid==items.yanyubao_userid)">
						<image src="../../static/img/help/delete_red.png" mode="widthFix"></image>
					</view>
				  
				</view>
				<view v-if="!remarkList.length" style="text-align:center;color:#bfbfbf;font-size:30rpx;" >还没有评论,快来吐槽~</view>
			</view>
				<view class="comment_list_bottom"></view>
		</view>
		
		
		
		
		
		
		<view class='detail_bottom' v-if="hidden_remark != 1">
		
			<view class="comment">
		     
				<image class="comment_img comment_write_img" src="../../static/img/help/write.png"></image>
		        <input @focus="is_login" class="comment_input" 
					placeholder="写评论..." confirm-type="send" 
					@confirm="submitRemark" :data-imgid="wz_text.id" v-model="inputValue" type="text"></input> <!--  -->
		        
		        <image class="comment_img comment_right_img" src="../../static/img/help/comment.png" @tap='toReamrkList'  ></image><!--  @click="get_input_focus()" -->
		        <view class="comment_num" :hidden="!comment_num">{{comment_num}}</view>
		        
				
		        <image class="comment_img comment_right_img"  :style="comment_num ? 'margin-left:0':''"
						@tap="toHomePage" src="../../static/img/help/home_page.png"></image>
				<!-- <image class="comment_img comment_right_img" src="../../../static/img/help/friends.png"></image> -->
		     </view>
		</view>
		
		<abot-tab-bar :list="tabbar_list" 
			v-if="tabbar_list_test == 1"
			style="position:fixed;bottom:0;width:100%;left:0;right:0;" 
			@tabChange="tabChange"></abot-tab-bar>
		
	</view>
	
</template>

<script>
	var userInfo = null;
	import abotshare from '../../components/abot_share_api/abot_share_api.vue';
	import abotsharejs from '../../common/abot_share_api.js';
	
// #ifdef MP-ALIPAY
	import parseHtml from "../../common/html-parser.js"
// #endif	

	import abotTabBar from '@/components/abot-tabbar.vue'
	
	
	export default {
		components:{
			abotshare,
			abotTabBar
		},
		data() {
			return {
				headlineItem_img:'',
				content:'',
				title:'',
				dianzan_status:'', //点赞状态  1为点赞 2位踩 0都没有
				id:0,
				listid:0,
				sellerid:'',//如何获取listid和sellerid？？？
				mode:'widthFix',
				isShoucang:'',
				userInfo:'',
				wz_keyword2:'',
				wz_title:'',
				wz_text:{
					title:'',
					classname:'',
					click:'',
					updatetime: '',
					user_detail:{
						nickname:''
					}
				},
				wxa_show_article_detail_category:'',
				isDianzan:'',
				dianzanNum:'',
				remarkList:'',
				openid:'',
				inputValue:'',
				
				comment_num:'',
				article_info:'',
				
				publishtype:'',
				is_Focus:false,
				is_OK:false,
				app_name_chat_title:'',
				
				form_page:'',//用来判断显示头像昵称
				
				wz_id:'',
				current_cms_token:'',
				
				hidden_remark:0,
				
				//app分享
				share_imageUrl:'',
				share_href:'',
				share_summary:'',
				share_titles:'',
				
				tabbar_list_test:0,
				tabbar_list: [{
				     "text": "未录入",
				     "iconPath": 'https://yanyubao.tseo.cn/uploads/bottom_icon/style_003_icon6.png' ,
				     "selectedIconPath": 'https://yanyubao.tseo.cn/uploads/bottom_icon/i_2.png'
				   },
				   {
				     "text": "作业互评",
				     "iconPath": 'http://yanyubao.tseo.cn/uploads/bottom_icon/cort.png',
				     "selectedIconPath":'https://yanyubao.tseo.cn/uploads/bottom_icon/i_5.png'
				     },
				     {
				       "text": "成绩分析",
				       "iconPath": '../../static/analyse.png',
				       "selectedIconPath": '../../static/analyse-select.png'
				}],
			}
		},
		
		// 页面初始化 options为页面跳转所带来的参数
		/**
		 * @param {Object} options
		 *  form_page  如果为 publish_list 代表从论坛的文章列表点击过来，默认为从商户头条点击过来
		 * 
		 * /page/help/list_detail?id=1234							//读取商户头条
		 * /page/help/list_detail?id=1234&form_page=publish_list	//读取论坛文章
		 * /page/help/list_detail?id=1234&form_page=spec_cms_token&cms_token=abcdefg		//读取指定文章，例如隐私政策等，具体的内容由id来标志
		 * 
		 */
		onLoad: function (options) {
		  
			console.log('options==>>',options);
			var that = this
			
		    var options_str = '';
			
			that.wz_id = options.id;		    
			
			options_str += '?id=' +  options.id;
			
			//跳转过来的页面参数用来判断头像和昵称的显示
			if(options.form_page){
				that.form_page = options.form_page; //'publish_list'
				options_str += '&form_page=' + options.form_page;
			}
			
			if(options.hidden_remark && (options.hidden_remark == 1)){
				that.hidden_remark = 1;
				options_str += '&hidden_remark=' + options.hidden_remark;
			}
			
			
			
			
			console.log(options);
			console.log("商户头条id:"+options.id);
			console.log("sellerid:" + options.sellerid);
			
			
			that.theme_color_wenku = '#ffffff';
			
			
			this.options_str = options_str;
			
			this.abotapi.set_option_list_str(that, that.callback_set_option);
			
			if(that.form_page == 'spec_cms_token'){
				
				that.current_cms_token = options.cms_token;
				options_str += '&cms_token=' + options.cms_token;
				
			}
			else{
				that.current_cms_token = this.abotapi.get_current_weiduke_token();
			}
			
			
			var userInfo = this.abotapi.get_user_info();
			var current_openid = this.abotapi.get_current_openid();
			
		  
			that.id = options.id;
			that.sellerid = options.sellerid;
			if (typeof (that.sellerid) == 'undefined') {
				that.sellerid = this.abotapi.globalData.sellerid;
			}
			console.log('jjjjj', userInfo, this.abotapi.globalData.token);
			
			this.__get_img_from_weiduke(options.id, this); 
			
			
			//this.initArticle(options.aid)
		},
		
		
		onShow: function () {
			/*
			this.userInfo = this.abotapi.get_user_info();
			
			*/
		  
		},
		onReady: function () {
			// 页面渲染完成
		},
		onHide: function () {
			// 页面隐藏
		},
		onUnload: function () {
			// 页面关闭
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh: function () {
			var that = this;
			
			console.log('onPullDownRefresh=====>>>>>');
			
			uni.showLoading({
				title: '加载中...',
			})
			
			setTimeout(function () {
				uni.stopPullDownRefresh();
				
				uni.hideLoading()
			}, 1000);
			
			that.get_remark_list();
		},
		
		onShareAppMessage: function () {
			console.log('==================>>>');
			var that = this;
			return {
				title: '' + that.wz_text.title,
				path: 'pages/help/detail?id='+that.id,
				imageUrl:that.wz_text.pic,
				success: function(res) {
				// 分享成功
					uni.showToast({
						title: '分享完成',
						icon: 'success',
						duration: 2000
					})
				},
				fail: function(res) {
					// 分享失败
					uni.showToast({
						title: '分享失败',
						icon: 'success',
						duration: 2000
					})
				}
			}
		},
		onShareTimeline: function () {
			
		},
		onAddToFavorites: function () {
			this.onShareTimeline();
		},
		methods: {
			callback_set_option: function (that, cb_params) {
				console.log('getShopOptionAndRefresh+++++:::' + cb_params)
				
				that.theme_color_wenku = that.abotapi.getColor();

				console.log('colr=====', that.theme_color_wenku)
				
				var that = this;
				var option_list = cb_params;
				
				console.log('option_list===', option_list)
				
				if (!option_list) {
					return;
				}
				
				if (option_list.wxa_show_article_detail_category) {
					that.wxa_show_article_detail_category = option_list.wxa_show_article_detail_category    
				}
				
				
				if(that.form_page == 'publish_list'){
					that.current_cms_token = option_list.cms_token;
				}
				
				if(option_list.publish_hiddend_btn_for_write){
					that.hidden_remark = option_list.publish_hiddend_btn_for_write; //是否显示发帖按钮
				}
				
				//临时测试，打开评论开关
				//that.hidden_remark = 0;
				
			},
			__get_img_from_weiduke: function (imgid, that){
				//=====更新商户头条=================
				//var url = this.abotapi.globalData.weiduke_server_url + '?g=Home&m=Yanyubao&a=yingxiao';//+ this.abotapi.globalData.sellerid;
				// var data = {
				//   id:options.id,
				//   action:'detail'
				// };
				var url = this.abotapi.globalData.weiduke_server_url + 'openapi/ArticleImgApi/article_detail';
				var post_data = {
					token: this.current_cms_token,
					id: imgid,					
					sellerid:this.abotapi.globalData.default_sellerid,
				};
				
				if(this.abotapi.get_current_openid()){
					post_data.openid = this.abotapi.get_current_openid();
				}
				
				var userInfo = this.abotapi.get_user_info();
				if(userInfo){
					post_data.userid = userInfo.userid;
				}
				
				var cbSuccess = function (res) {
					
					//文章内容请求完成，马上请求评论列表
					that.get_remark_list();
					
					
					
					if (res.data.code == 1) {
						//更新首页的商户头条
						//console.log('成功返回商户头条信息:' + res);
						//console.log(mars.html2json(res.data.data.info));
						var wz_keyword = res.data.data.keyword;
						
					  console.log('dddddd',res);
						
						that.wz_text = res.data.data;
						that.wz_keyword2 = wz_keyword;
						that.wz_title = res.data.data.title;
						that.dianzan_status = res.data.data.dianzan_status;
						
						that.share_href = res.data.data.h5_url;
						that.share_titles = res.data.data.title;
						that.share_summary = res.data.data.text;
						that.share_imageUrl = res.data.data.pic;
						
						//更改标题的内容
						if(res.data.data.title){
							if(res.data.data.title.length > 15){
								uni.setNavigationBarTitle({
									title: res.data.data.title.substring(0, 12)+'...'
								})
							}
							else{
								uni.setNavigationBarTitle({
									title: res.data.data.title
								})
							}	
						}
					
						var is_col = that.wz_text.is_col;
						if (is_col && is_col == 1) {
							that.isShoucang = is_col
						}
						that.article_info = res.data.data.info;
						
						
// #ifdef MP-ALIPAY		
						console.log('that.article_info====>>>>', that.article_info);
						
						const filter = that.$options.filters["formatRichText"];
						that.article_info = filter(that.article_info);
						
						console.log('that.article_info====>>>>', that.article_info);
						
						let data001 = that.article_info;
						let newArr = [];
						let arr = parseHtml(data001);
						arr.forEach((item, index)=>{
							newArr.push(item);
						});
						
						//console.log('arr arr arr====>>>>', arr);
						//console.log('newArr newArr newArr====>>>>', newArr);
						
						that.article_info = newArr;

// #endif						


						
						
						
					}
				};
				var cbError = function (res) {
				
				};
				
				this.abotapi.httpPost(url, post_data, cbSuccess, cbError);
					//========End====================
			},
			
			call_mobile:function(mobile){
				console.log(mobile);
				uni.makePhoneCall({
				    phoneNumber: mobile 
				});
			},
			
			//h5点击分享触发
			share_publish:function(){
				console.log('==================>>>h5');
				uni.showModal({
					title:'请点击浏览器菜单中的分享按钮',
					showCancel:false,
				})
				return;
			},
			
			//评论输入框获取焦点判断是否登录
			is_login:function(){
				console.log('获取焦点！！！！');
				
				var that = this;
				
				//判断是否登录
				var userInfo = this.abotapi.get_user_info();
				if(!userInfo || !userInfo.userid){
					
					console.log('当前用户没有登录');
					
					uni.showModal({
						title:'只有登录才可以评论',
						success:function(res){
							if(res.cancel){
								//取消
								return;
							}else if(res.confirm){
								//确认
								if(that.form_page && that.form_page == 'publish_list'){
									var last_url = '/pages/help/detail?id=' + that.id + '&sellerid=' + that.sellerid + '&form_page=publish_list';
								}else{
									var last_surl = '/pages/help/detail?id=' + that.id + '&sellerid=' + that.sellerid;
								}
								
								that.abotapi.goto_user_login(last_url, 'normal');
								return;
							}
							
						}
					})
					
				}
			},
			
			show_share_btn: function () {
				console.log('aaaaa');
				//显示分享页面
				uni.showShareMenu({
					withShareTicket: true,
					success:function(){
						console.log('bbbbbb');
					}
				})
			},
			returnto_toutiao:function(){
				var that = this;
				uni.redirectTo({
					url: '/pages/help/list?sellerid=' + that.sellerid	
				})
			},
			returnto_index: function () {
				var that = this;
				
				this.abotapi.set_option_list_str(this, function(that002, option_list){
					var wxa_hidden_shop = option_list.wxa_hidden_shop;
					
					if (wxa_hidden_shop==1){
						uni.switchTab({
							url: '/pages/index/index',
						})
					}
					else{
						uni.switchTab({
							url: '/pages/index/index?sellerid=' + that.sellerid
						})
					}
					
				});
				
				//var wxa_hidden_shop = JSON.parse(uni.getStorageSync("option_list_str")).wxa_hidden_shop;
				
				
				
			},
				
			//收藏
			shoucang: function () {
				var that = this;
				var userInfo = that.abotapi.get_user_info();
				if(!userInfo || !userInfo.userid){
					uni.showModal({
						title:'只有登录才可以收藏',
						success:function(res){
							if(res.cancel){
								return;
							}else if(res.confirm){
								if(that.form_page && that.form_page == 'publish_list'){
									var last_url = '/pages/help/detail?id=' + that.id + '&sellerid=' + that.sellerid + '&form_page=publish_list';
								}else{
									var last_url = '/pages/help/detail?id=' + that.id + '&sellerid=' + that.sellerid;
								}
								
								that.abotapi.goto_user_login(last_url, 'normal');
								return;
							}
							
						}
					})
					return;
				}
					
				var wz_id = that.wz_text.id;
				
				console.log(wz_id);
				
				var isShoucang = !this.isShoucang;
				
			    that.isShoucang = isShoucang;
				
				var url = this.abotapi.globalData.weiduke_server_url + 'index.php/openapi/ArticleImgApi/collect_my_update';
				var data = {
					userid:userInfo.userid,
					checkstr:userInfo.checkstr,
					token: that.current_cms_token,
					openid: this.abotapi.get_current_openid(),
					id: wz_id
				};
				var cbSuccess = function (res) {
					if (res.data.code == 1) {
						that.__get_img_from_weiduke(that.wz_id,that);
					}
				};
				var cbError = function (res) {
				
				};
				this.abotapi.httpPost(url, data, cbSuccess, cbError);
			},
				
			//回到首页
			toHomePage: function () {
				console.log('jjjjj444')
				uni.switchTab({
					url:'/pages/index/index'
				})
				
			},
				
				
			//获取评论列表
			get_remark_list: function () {
				
				var that = this;
				//var userInfo = this.abotapi.get_user_info();
				this.abotapi.abotRequest({
					url: this.abotapi.globalData.weiduke_server_url + '/openapi/ArticleImgApi/remark_img',
					method: 'post',
					data: {
						// userid:userInfo.userid,
						// checkstr:userInfo.checkstr,
						sellerid : that.abotapi.get_sellerid(),
						token: this.current_cms_token,
						openid: this.abotapi.get_current_openid(),
						action: 'list',
						imgid: that.wz_id,
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function (res) {
						
						var data = res.data;
						if (data.code == 1) {
							that.comment_num_id = 'comment_num_' + that.wz_id;
							var last_comment_num = uni.getStorageSync(that.comment_num_id);
				
							console.log('comment_num_id==', that.comment_num_id)
				
							var new_comment_num = 0;
				
							if (last_comment_num && (data.count >= last_comment_num)){
								that.new_comment_num = data.count - last_comment_num;
							} else {
				
								that.new_comment_num = data.count
							}
				
			        
							that.remarkList = data.msg;
							that.comment_num = that.new_comment_num ? that.new_comment_num : 0;
							that.comment_num_all = data.count;
							that.openid = that.abotapi.get_current_openid()
			        
						} else {
			        
							that.remarkList = [];
							that.comment_num = 0;
							that.openid = that.abotapi.get_current_openid()
			        
						}
					}
				})
			},
				
				

			//提交评论
			submitRemark: function (e) {
				var that = this;
				
				var remark = that.inputValue;
				var imgid = e.currentTarget.dataset.imgid
				
				if(remark == ''){
					that.is_OK = false;
					console.log('TRUE')
					uni.showToast({
						title: '评论不能为空',
						duration: 500,
					});
					return;
				}
				
				var userInfo = this.abotapi.get_user_info();
				
				if(!userInfo || !userInfo.userid){
					uni.navigateTo({
						url: '/pages/login/login',
					})
					return;
				}
				
				var url = that.abotapi.globalData.weiduke_server_url + '/openapi/ArticleImgApi/remark_img';
				
				var data = {
					sellerid : that.abotapi.get_sellerid(),
					token: that.current_cms_token,
					openid: that.abotapi.get_current_openid(),
					userid: userInfo.userid,
					checkstr: userInfo.checkstr,
					action: 'add',
					imgid: imgid,
					content: remark,
					//icon: headimgurl,
					//name: nickname
				};
				
				var cbSuccess = function (res) {
					uni.showModal({
						title:'提示',
						content:res.data.msg,
						showCancel:false,
						success:function(res002){
							if (res.data.code == 1) {
								that.get_remark_list();
												   
								that.inputValue = '';
							}
						}
					});
				};
				var cbError = function (res) {
					uni.showToast({
						title: '网络连接失败',
						duration: 500
					})
				};
				
				that.abotapi.httpPost(url, data, cbSuccess, cbError);
				
				
			},
				
			
			
			
			//删除评论
			deleteRemark: function (e) {
				var userInfo = this.abotapi.get_user_info();
				
				if(!userInfo || !userInfo.userid){
					uni.showToast({
						title: '请先登录',
						icon: 'none',
						duration: 1000,
						success: function () {
							uni.navigateTo({
								url: '/pages/login/login',
							});
						},
					});
					return;
				}
			  
				
				var that = this;
				this.abotapi.abotRequest({
					url: this.abotapi.globalData.weiduke_server_url + 'index.php/openapi/ArticleImgApi/remark_img',
					method: 'post',
					data: {
						sellerid : that.abotapi.get_sellerid(),
						token: this.current_cms_token,
						openid: this.abotapi.get_current_openid(),
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						action: 'del',
						imgid: that.wz_id,
						id: e.currentTarget.dataset.id
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function (res) {
						var data = res.data;
						
						if (data.code == 1) {
							uni.setStorageSync('comment_num_' + that.wz_id, that.comment_num_all-1)
							that.get_remark_list();
							uni.showToast({
								title: res.data.msg,
								duration: 2000
							})
						}
					},
					fail: function (res) {
						uni.showToast({
							title: '删除失败',
							duration: 2000
						})
				
					}
				})
				
			},
				
				
				
			//执行文章点赞或取消:
			doArticleDianzan:function(e){
				var that = this;
				
				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if(!userInfo || !userInfo.userid){
					uni.showModal({
						title:'只有登录才可以点赞',
						success:function(res){
							if(res.cancel){
								return;
							}else if(res.confirm){
								if(that.form_page && that.form_page == 'publish_list'){
									var last_url = '/pages/help/detail?id=' + that.id + '&sellerid=' + that.sellerid + '&form_page=publish_list';
								}else{
									var last_url = '/pages/help/detail?id=' + that.id + '&sellerid=' + that.sellerid;
								}
								
								that.abotapi.goto_user_login(last_url, 'normal');
								return;
							}
							
						}
					})
					return;
				}
				
				
				var tongjiid = e.currentTarget.dataset.tongjiid;
				var dianzan_type = e.currentTarget.dataset.zantype;
				console.log('eeeeeeee',e);
				
				if(that.dianzan_status && that.dianzan_status != 0){
					if(that.dianzan_status == 1 && dianzan_type == 2){
						var action = 'add';
					}else if (that.dianzan_status == 2 && dianzan_type == 1){
						var action = 'add';
					}else{
						var action = 'del';
					}
					
					
				}else{
					var action = 'add';
				}
				this.abotapi.abotRequest({
					url: this.abotapi.globalData.weiduke_server_url + 'openapi/ArticleImgApi/dianzan_img',
					method: 'post',
					data: {
						userid:userInfo.userid,
						checkstr:userInfo.checkstr,
						token: this.current_cms_token,
						openid: this.abotapi.get_current_openid(),
						action: action,
						imgid: that.wz_id,
						dianzan_type:dianzan_type,
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function (res) {
						console.log('opopop',res);
						var data = res.data;
						if (data.code == 1) {
							that.dianzan_status = dianzan_type;
							that.__get_img_from_weiduke(that.wz_id,that);
						}
					}
				})
			},
				
				
				
			//获取文章点赞
			getArticleDianzan:function(){
				var that = this;
				this.abotapi.abotRequest({
					url: this.abotapi.globalData.weiduke_server_url + 'index.php/openapi/ArticleImgApi/dianzan_img',
					method: 'post',
					data: {
						token: this.current_cms_token,      
						openid: this.abotapi.get_current_openid(),
						action: 'list',
						imgid: that.wz_id,
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function (res) {
						var data = res.data;
						if(data.code == 1){
							that.dianzanNum = data.msg.num
						}
			     
						if (data.status==1){
			       
							that.isDianzan = true
			       
						}else{
			        
							that.isDianzan = false
			        
						}
			     
						console.log('4545454', res);
			      
					}
				})
				
			},
			
			
			
			//页面滑动
			toReamrkList: function () {
				var that = this;
				uni.setStorageSync('comment_num_' + this.wz_id, this.comment_num_all)
				
				that.comment_num = 0
				
				const query = uni.createSelectorQuery()
				query.select('#the-id').boundingClientRect()
				query.selectViewport().scrollOffset()
				query.exec(function (res) {
					res[0].top // #the-id节点的上边界坐标
					res[1].scrollTop // 显示区域的竖直滚动位置
					uni.pageScrollTo({
						scrollTop: res[0].top,
						duration: 300
					})
				})
			},
			
			
			//app  分享点击
			click_wxa_share:function (){
				
				abotsharejs.click_wxa_share(this.share_href, this.share_titles, this.share_summary, this.share_imageUrl);
			},
			
			click_wxa_circle_share:function (){
				abotsharejs.click_wxa_circle_share(this.share_href, this.share_titles, this.share_summary, this.share_imageUrl);
			},
			
			
			click_wxa_applet_share:function (){
				var path = 'pages/help/detail'+ this.options_str;
				var account = this.abotapi.globalData.xiaochengxu_account;
				abotsharejs.click_wxa_applet_share(this.share_href, this.share_titles, path, this.share_imageUrl, account);
			},
			
			
			click_wxa_system_share:function (){
				
				abotsharejs.click_wxa_system_share(this.share_summary, this.share_href);
			},
			click_wxa_command_copy:function(){
				/*var userid = 0;
				var sellerid = this.abotapi.get_sellerid();
				var cmd_type = 'product';

				var userInfo = this.abotapi.get_user_info();
				if (userInfo) {
					userid = userInfo.userid;
				}


				abotsharejs.click_wxa_command_copy(this.abotapi, cmd_type, this.goods_detail["productid"], userid, sellerid);*/
			},
			is_share_api_show:function(){
				this.$refs.share_api.is_show();
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
			formatRichText (html) { //控制小程序中图片大小
				let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
					return match;
				});
				//newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				
				newContent = newContent.replace(/<p[^>]*>/gi, '<p style="margin:10px;">');
				
				newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;vertical-align: middle;"');
				
				newContent = newContent.replace(/<h1[^>]*>/gi, '<h1 class="wxParse-h1">');
				newContent = newContent.replace(/<h2[^>]*>/gi, '<h2 class="wxParse-h2">');
				
				return newContent;
			}
			
		}
	}
	
</script>

<style>
	
	.weui-article__title .summary {
	  color: #1b82d1;
	
	}
	
	.xg_button {
	  width:80%;
	}
	
	.returnto button{
	  width:45%;
	  float:left;
	  margin:2%;
	  font-size:15px;
	  background-color: #a58904;
	}
	.wxParse-inline{
	    display: inline;
	    margin: 0;
	    padding: 0;
	    font-size:0.8em;
	}
	.wxParse-p{
	    text-align: left;
	    margin: 10rpx;
	    font-size:0.8em;
	}
	.weui-article__section p{
	  margin-top: 30px;
	  text-indent: 2em;
	}
	.weui-article {
	  padding: 20px 15px;
	  font-size: 40rpx;
	}
	.weui-article__section {
	  margin-bottom: 1.5em;
	}
	.weui-article__h1 {
	  font-size: 18px;
	  font-weight: 400;
	  margin-bottom: .9em;
	}
	.weui-article__h2 {
	  font-size: 16px;
	  font-weight: 400;
	  margin-bottom: .34em;
	}
	.weui-article__h3 {
	  font-weight: 400;
	  font-size: 15px;
	  margin-bottom: .34em;
	}
	.weui-article__p {
	  margin: 0 0 .8em;
	}
	
	
	.detail_top{
	  background-color: #fff;
	  border-image: -webkit-linear-gradient(rgb(136, 136, 136),#fff) 30 30;
	  border-image: -moz-linear-gradient(rgb(136, 136, 136),#fff) 30 30;
	  border-image: linear-gradient(rgb(136, 136, 136),#fff) 30 30;
	  display:inline-block;
	  width: 100%;
	  position:fixed; 
	  top:0;
	  text-align: left;
	  z-index: 1;
	  height: 80rpx;
	}
	.detail_top_view{
	  margin-top: 10rpx;
	  display:inline-block;
	}
	.biaoqian{
	  background-color:#f9b831;
	  border-radius: 20rpx;
	  margin-left: 20rpx;
	  margin-top: 10rpx;
	  margin-bottom: 10rpx;
	  font-size: 24rpx;
	  float: left;
	  vertical-align: middle;
	}
	.biaoqian text{
	  margin-top: 10rpx;
	  margin-bottom: 10rpx;
	  margin-left: 10rpx;
	  margin-right: 10rpx;
	  color: #fff;
	  vertical-align: middle;
	}
	.biaoqian image{
	  width: 24rpx;
	  height: 24rpx;
	  float: left;
	  margin-left: 10rpx;
	  margin-top: 10rpx;
	  margin-bottom: 10rpx;
	}
	.wz_title{
	  font-size: 34rpx;
	  padding:32rpx;
	  /*box-shadow:#EDEDED 2rpx 2rpx 15rpx 6rpx;
	  margin-top: 70rpx;*/
	  font-weight: bold;
	}
	.datetime{
	  margin-left:10rpx;
	  height:20px;
	  margin-top:26rpx;
	  margin-bottom:22rpx;
	}
	.yuanchuang{
	  font-size: 24rpx;
	  color: #666;
	  float: left;
	}
	.guge{
	  font-size: 26rpx;
	  color: #4885ed;
	  font-weight:bolder;
	  float: left;
	  margin-left: 30rpx;
	}
	.wenzhang_detail{
	  font-size: 30rpx;
	  margin:20rpx 20rpx 40rpx 20rpx;
	}
	.tuijian{
	  font-size: 24rpx;
	  color: #666;
	}
	.detail_bottom{
	  position: fixed;
	  bottom: 0;
	  /*border-top: 10rpx solid;
	  border-image: -webkit-linear-gradient(#fff,rgb(136, 136, 136)) 30 30;
	  border-image: -moz-linear-gradient(#fff,rgb(136, 136, 136))  30 30;
	  border-image: linear-gradient(#fff,rgb(136, 136, 136))  30 30;*/
	  display:inline-block;
	  background-color: #fff;
	  width: 100%;
	  height: 120rpx;
	}
	.shoucang{
	 text-align: center;
	 width: 50%;
	 float: left;
	}
	.shoucang image{
	  width: 40rpx;
	  height: 40rpx;
	  margin-top: 15rpx;
	}
	.shoucang view{
	 margin-top: -5rpx;
	 font-size: 20rpx;
	 color: #3aa756;
	 font-weight:bolder;
	}
	.share_hide{
	  position: absolute;
	  overflow: hidden;
	  top: 0;
	  right: 0;
	  text-align: center;
	  width: 50%;
	  float: left;
	}
	.share_hide image{
	  width: 40rpx;
	  height: 40rpx;
	  margin-top: 15rpx;
	}
	.share_hide view{
	 margin-top: -5rpx;
	 font-size: 20rpx;
	 color: #3aa756;
	 font-weight:bolder;
	}
	.share {
	  opacity:0;
	  width:100rpx;
	  height:55rpx;
	  position:absolute;
	  background:transparent;
	  right:10rpx;
	
	}
	
	.wxParse-p{
	  font-size:36rpx;
	  margin-bottom:0rpx;
	  font-style: normal;
	}
	
	.wxParse-strong{
	  font-weight: bold;
	}
	
	.wxParse-h1{
	  font-size:36rpx;
	  color: #3369e8;
	  border-left:10rpx solid #3369e8;
	  padding:10rpx;
	}
	
	.wxParse-h2{
	  font-size:36rpx;
	  color: #d50f25;
	  border-left:10rpx solid #d50f25;
	  padding:10rpx;
	}
	
	.wxParse-h3{
	  font-size:36rpx;
	  color: #eeb211; 
	  border-left:10rpx solid #eeb211;
	  padding:10rpx;
	}
	
	.wxParse-h4{
	  font-size:36rpx;
	  color: #009925;
	  border-left:10rpx solid #009925;
	  padding:10rpx;
	}
	
	.wxParse-img{
	  min-width: 100%;
	}
	
	.wxParse-blockquote{
	  font-style:italic;
	}
	
	.wxParse-ul{
	  overflow:visible;
	}
	
	.wxParse-li-circle{
	  margin-left:0rpx;
	  margin-right:0rpx;
	  border-radius:10rpx;
	  overflow:visible;
	}
	
	.wxParse-li{
	  overflow:visible;
	}
	
	.wxParse-li-inner{
	  overflow:visible;
	}
	
	.wxParse-li-text{
	  margin-left:20rpx;
	  overflow:visible;
	  margin-right:0rpx;
	}
	
	.wxParse-blockquote{
	  font-family: none;
	}
	
	.logo_pic image{
	    min-height:100%;
	}
	
	
	.comment{
	  display:flex;
	  margin-top:14rpx;
	
	}
	.comment_img{
	  width:55rpx;
	  height:55rpx;
	}
	
	.comment_input{
	  background-color: #F4F5F7;
	  /* background-color: #F00; */
	  height:60rpx;
	  border-radius:50rpx;
	  padding-left:78rpx;
	  margin-left:32rpx;
	  width:416rpx;
	}
	
	.comment_write_img{
	  left:45rpx;
	  position:absolute;
	}
	
	
	.comment_right_img{
	  margin-left: 30rpx;
	}
	
	.comment_list{
	  border-top:1px solid #EDEDED;
	}
	.comment_list_bottom{
	  height:150rpx;
	}
	.comment_list_user_icon{
	  width:60rpx;
	  height:60rpx;
	  margin-right:24rpx;
	  border-radius: 50rpx;
	}
	
	.comment_list_dianzan{
	  width:30rpx;
	  height:30rpx;
	}
	
	.comment_list_aa{
	  display:flex;
	  margin:46rpx 20rpx;
	
	}
	
	.comment_list_right{
	  display:flex;
	  justify-content:space-between;
	
	}
	
	.comment_list_username{
	  color:#486495;
	  font-size:26rpx;
	}
	
	.comment_text{
	  margin-top:10rpx;
	  font-size: 30rpx;
	}
	
	.comment_time{
	  margin-top:26rpx;
	  font-size: 20rpx;
	}
	
	.comment_huifu{
	  display:flex;
	  flex-direction:column;
	  margin-top:20rpx;
	}
	
	.comment_huifu_author{
	  font-size:28rpx;
	  color:#666;
	  padding-left:10rpx;
	  border-left:6rpx solid #f00;
	
	}
	.comment_huifu_text{
	  font-size:30rpx;
	  margin-top:10rpx;
	}
	
	.comment_delete{
	  align-items:center;
	  display:flex;
	}
	
	.comment_delete image{
	  width:40rpx;
	  height:40rpx;
	}
	
	.comment_num{
	  font-size:20rpx;
	  background-color:#f00;
	  height:30rpx;
	  color:#fff;
	  border-radius:50rpx;
	  padding:0 10rpx;
	  left:-18rpx;
	  position:relative;
	
	}
	.article_bottom{
	  display:flex;
	  justify-content:space-between;
	  font-size:30rpx;
	  margin-top:40rpx;
	
	}
.title_box{
		display: -webkit-flex;
		display: flex;
		align-items: center;
	}
	.head_img{
		margin: 20rpx;
	}
	.head_img image{
		width: 100rpx;
		height: 100rpx;
		border-radius:5rpx;
	}
	.nickname{
		color:#515151;
		font-size: 28rpx;
	}
	.cata_name{
		margin-top: 10rpx;
		background-color: #18dba6;
		color: #fff;
		border-radius:6rpx;
		padding: 2rpx 6rpx;
		text-align: center;
	}
	.wenzhang_meihua{
		font-size: 30rpx;
		margin-top: 10rpx;
		margin: auto;
		padding-bottom: 10rpx;
		padding-top: 10rpx;
		border-top: 1rpx solid #eee;
		height: 100rpx;
		line-height: 100rpx;
	}
	.wenzhang_meihua_name{
		font-weight: bold;
		float: left;
	}
</style>
