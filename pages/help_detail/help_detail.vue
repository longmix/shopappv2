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
					<view style="font-size: 25upx;line-height: 40upx;">{{wz_text.classname}}</view>
				</view>
			</view>
		</view>
		
		<view style='margin:32rpx;margin-top:30rpx;margin-bottom:150rpx;padding-bottom:80rpx;'>
		
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
						<rich-text :nodes="info"></rich-text>
					</scroll-view>
				</view>
				<view style="margin-top: 10px;" v-for="img_item in wz_text.picture_list" :key="img_item" v-if="form_page == 'publish_list'">
					<image style="width: 100%;" mode="widthFix" :src="img_item"></image>
				</view>
				
				<!-- 自定义属性 -->
				<view class="wenzhang-meihua" v-for="value_item in wz_text.value_list" :key="value_item">
					{{value_item.displayname}}：{{value_item.fieldvalue}}
				</view>
				
				<view class="article_bottom">
					<view style="color:#bfbfbf;">阅读 {{wz_text.click}}</view>
					<!-- 点赞 -->
					<view style="display: flex;">
						<view @tap='doArticleDianzan' :data-zantype="1" style='margin-right: 20upx;'>
							<image style="width:30rpx;height:30rpx;margin-right:15rpx"  :src="dianzan_status == 0 || dianzan_status == 2 ? '../../static/img/help/dianzan_grey.png':'../../static/img/help/dianzan_red.png'"></image>
							<text style="font-size:30upx">{{wz_text.dianzan_num}}</text>
						</view>
						
						<view @tap='doArticleDianzan' :data-zantype="2">
							<image style="width:30rpx;height:30rpx;margin-right:15rpx"  :src="dianzan_status == 0 || dianzan_status == 1 ? '../../static/img/help/dianzan02_grey.png':'../../static/img/help/dianzan02_red.png'"></image>
							<text style="font-size:30upx">{{wz_text.dianzan_num2}}</text>
						</view>
					</view>
					
				</view> 
			</view>
			
			
			<!-- 评论 -->
			<view class="comment_list" id="the-id">
				<view :style="{'border-left': 6 +'upx' + 'solid' + theme_color_wenku}"  style="padding-left:20rpx;margin-top:36rpx;margin-bottom:36rpx;font-size:26rpx;color:#999">热门评论</view>
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
					<view class="comment_delete" :data-id="items.id" @tap='deleteRemark'  v-if="userInfo.userid==items.yanyubao_userid">
						<image src="../../static/img/help/delete_red.png" mode="widthFix"></image>
					</view>
				  
				</view>
				<view v-if="!remarkList.length" style="text-align:center;color:#bfbfbf;font-size:30rpx;" >还没有评论,快来吐槽~</view>
			</view>
				<view class="comment_list_bottom"></view>
		</view>
		<view class='detail_bottom'>
		
			<view class="comment">
		     
				<image class="comment_img comment_write_img" src="../../static/img/help/write.png"></image>
		        <input @focus="is_login" class="comment_input" placeholder="写评论..." confirm-type="send" @confirm="sendRemark()" :data-imgid="wz_text.id" v-model="inputValue" type="text"></input> <!--  -->
		        
		        <image class="comment_img comment_right_img" src="../../static/img/help/comment.png" @tap='toReamrkList'  ></image><!--  @click="get_input_focus()" -->
		        <view class="comment_num" :hidden="!comment_num">{{comment_num}}</view>
		        <image class="comment_img comment_right_img" :style="comment_num ? 'margin-left:0':''" :src="isShoucang==true ?  '../../static/img/help/star_on.png': '../../static/img/help/star_off.png'" @tap='shoucang' ></image>
		        <button  class="share" open-type="share"></button>
				<!-- #ifdef MP-WEIXIN || APP-PLUS -->
				<image class="comment_img comment_right_img" src="../../static/img/help/share.png" open-type="share"></image>
				<!-- #endif -->
				
		        <!-- #ifdef H5 -->
		        <image class="comment_img comment_right_img" src="../../static/img/help/share.png" @tap="share_publish"></image>
		        <!-- #endif -->
				
		        <image class="comment_img comment_right_img" @tap="toHomePage" src="../../static/img/help/home_page.png"></image>
				<!-- <image class="comment_img comment_right_img" src="../../../static/img/help/friends.png"></image> -->
		     </view>
		</view>
	</view>
</template>

<script>
	var userInfo = null;
	export default {
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
				form_page:'',//用来判断显示头像昵称
				comment_num:'',
				info:'',
				wz_id:'',
				publishtype:'',
				is_Focus:false,
				is_OK:false,
				app_name_chat_title:''
				
			}
		},
		
		// 页面初始化 options为页面跳转所带来的参数
		onLoad: function (options) {
		  
			console.log('options==>>',options);
			var that = this
			//this.abotapi.set_option_list_str(null, this.abotapi.getColor());
			this.abotapi.set_option_list_str(that, that.callback_set_option);
			var userInfo = this.abotapi.get_user_info();
			var current_openid = this.abotapi.get_current_openid();
			
		    that.wz_id = options.id;
		    that.theme_color_wenku = this.abotapi.getColor()
			console.log('colr=====', this.abotapi.getColor())
			
			//跳转过来的页面参数用来判断头像和昵称的显示
			if(options.form_page){
				that.form_page = options.form_page; //'publish_list'
			}
			
			
			// if (!current_openid){
			// 	uni.showLoading({
			// 		title: '正在加载....',
			// 	});
			
			// 	console.log('uni.login <<<==== onLoad <<<==== help_detail');
				
			// 	uni.login({
			// 		success: function (login_res) {
			// 			console.log("uni.login返回：");
			// 			console.log(login_res);
				
			// 			if (!login_res.code) {
			// 				return;
			// 			}
				
			// 			this.abotapi.abotRequest({
			// 				url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=wxa_one_click_login',
			// 				header: {
			// 					"Content-Type": "application/x-www-form-urlencoded"
			// 				},
			// 				method: "POST",
			// 				dataType: 'json',
			// 				data: {
			// 					js_code: login_res.code,
			// 					xiaochengxu_appid: that.abotapi.globalData.xiaochengxu_appid,
			// 					sellerid: that.abotapi.get_sellerid(),
			// 				},
			// 				success: function (res) {
			// 					uni.hideLoading();
			// 					if(res.data.code == 1){
			// 						current_openid = res.data.openid;
			// 						that.abotapi.set_current_openid(current_openid);
				
			// 						that.__get_img_from_weiduke(options.id, that); 
			// 						console.log('jjjjss')
			// 					}else{
			// 						uni.showModal({
			// 							title: '确认',
			// 							content: '小程序服务器异常',
			// 						});
					

			// 						//返回上一页
			// 						uni.navigateBack({
			// 							delta: 2
			// 						})
						  
			// 					}
			// 				},
			// 				fail:function(res){
			// 					uni.hideLoading();
					
			// 					uni.showModal({
			// 						title: '确认',
			// 						content: '小程序网络异常',
			// 					});
					
			// 					//返回上一页
			// 					uni.navigateBack({
			// 						delta: 2
			// 					})
					
			// 				}
			// 			});
								
			// 		},
			// 		fail: function (login_res){
			// 			uni.hideLoading();
				
			// 			console.log("uni.login  fail 返回：");
			// 			console.log(login_res);
				
			// 			uni.showModal({
			// 				title: '确认',
			// 				content: '小程序认证异常',
			// 			});
				
			// 			//返回上一页
			// 			uni.navigateBack({
			// 				delta: 2
			// 			})
			// 		}
			// 	})   // End of uni.login
			
			// }
			
			console.log(options);
			console.log("商户头条id:"+options.id);
			console.log("sellerid:" + options.sellerid);
		  
			that.id = options.id;
			that.sellerid = options.sellerid;
			if (typeof (that.sellerid) == 'undefined') {
				that.sellerid = this.abotapi.globalData.sellerid;
			}
			console.log('jjjjj', userInfo, this.abotapi.globalData.token);
			
			this.__get_img_from_weiduke(options.id, this); 
			that.get_remark_list();
			
			//this.initArticle(options.aid)
		},
		
		
		onShow: function () {
			
			this.userInfo = this.abotapi.get_user_info();
			
			uni.showLoading({
				title: '加载中',
			})
			
			setTimeout(function () {
				uni.hideLoading()
			}, 2000)
		  
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
		methods: {
			callback_set_option: function (that, cb_params) {
				console.log('getShopOptionAndRefresh+++++:::' + cb_params)
				that.abotapi.getColor();
				var that = this;
				var option_list = cb_params;
				console.log('option_list===', option_list)
				if (!option_list) {
					return;
				}
				if (option_list.wxa_show_article_detail_category) {
					that.wxa_show_article_detail_category = option_list.wxa_show_article_detail_category    
				}
			},
			__get_img_from_weiduke: function (imgid, that){
				//=====更新商户头条=================
				//var url = this.abotapi.globalData.weiduke_server_url + '?g=Home&m=Yanyubao&a=yingxiao';//+ this.abotapi.globalData.sellerid;
				// var data = {
				//   id:options.id,
				//   action:'detail'
				// };
				var url = this.abotapi.globalData.weiduke_server_url + 'openapi/ArticleImgApi/article_detail';
				var data = {
					token: this.abotapi.get_current_weiduke_token(),
					id: imgid,
					openid: this.abotapi.get_current_openid(),
					sellerid:this.abotapi.globalData.default_sellerid,
				};
				
				
				var cbSuccess = function (res) {
					if (res.data.code == 1) {
						//更新首页的商户头条
						//console.log('成功返回商户头条信息:' + res);
						//console.log(mars.html2json(res.data.data.info));
						var wz_keyword = res.data.data.keyword;
					  
						that.wz_text = res.data.data;
						that.wz_keyword2 = wz_keyword;
						that.wz_title = res.data.data.title;
						that.dianzan_status = res.data.data.dianzan_status;
					  // uni.setNavigationBarTitle({
					  //   title: res.data.data.title
					  // })
					
						var is_col = that.wz_text.is_col;
						if (is_col && is_col == 1) {
							that.isShoucang = is_col
						}
						that.info = res.data.data.info;
					}
				};
				var cbError = function (res) {
				
				};
				this.abotapi.httpPost(url, data, cbSuccess, cbError);
					//========End====================
			},
			onShareAppMessage: function () {
				console.log('==================>>>');
				var that = this;
				return {
					title: '' + that.wz_text.title,
					path: 'pages/help_detail/help_detail?id='+that.id,
					imageUrl:that.wz_text.pic,
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
				//判断是否登录
				var userInfo = this.abotapi.get_user_info();
				if(!userInfo || !userInfo.userid){
					uni.showModal({
						title:'只有登录才可以评论',
						success:function(res){
							if(res.cancel){
								//取消
								return;
							}else if(res.confirm){
								//确认
								if(that.form_page && that.form_page == 'publish_list'){
									var last_url = '/pages/home/help_detail/help_detail?id=' + that.id + '&sellerid=' + that.sellerid + '&form_page=publish_list';
								}else{
									var last_url = '/pages/home/help_detail/help_detail?id=' + that.id + '&sellerid=' + that.sellerid;
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
					url: '/pages/home/help/help?sellerid=' + that.sellerid	
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
									var last_url = '/pages/home/help_detail/help_detail?id=' + that.id + '&sellerid=' + that.sellerid + '&form_page=publish_list';
								}else{
									var last_url = '/pages/home/help_detail/help_detail?id=' + that.id + '&sellerid=' + that.sellerid;
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
				
			    that.isShoucang = isShoucang
				
				var url = this.abotapi.globalData.weiduke_server_url + 'index.php/openapi/ArticleImgApi/collect_my_update.shtml';
				var data = {
					userid:userInfo.userid,
					checkstr:userInfo.checkstr,
					token: this.abotapi.get_current_weiduke_token(),
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
						token: this.abotapi.get_current_weiduke_token(),
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
				var remark = e.detail.value;
				var imgid = e.currentTarget.dataset.imgid
				var userInfo = this.abotapi.get_user_info();
				if(!userInfo || !userInfo.userid){
					uni.navigateTo({
						url: '/pages/login/login',
					})
					return;
				}else{
					this.abotapi.abotRequest({
						url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_user_info',
						data: {
							sellerid: this.abotapi.get_sellerid(),
							checkstr: userInfo.checkstr,
							userid: userInfo.userid,
			      
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						method: "POST",
						success: function (res) {
							console.log('ddd', res);
							// console.log('ddd', res.data.code);
							if (res.data.code == "-1") {
								uni.navigateTo({
									url: '/pages/login/login',
								})
							} else {
								var data = res.data
								var headimgurl = data.data.headimgurl
								var nickname = data.data.nickname
			
								var url = that.abotapi.globalData.weiduke_server_url + '/openapi/ArticleImgApi/remark_img';
								var data = {
									token: that.abotapi.get_current_weiduke_token(),
									openid: that.abotapi.get_current_openid(),
									userid: userInfo.userid,
									checkstr: userInfo.checkstr,
									action: 'add',
									imgid: imgid,
									content: remark,
									icon: headimgurl,
									name: nickname
								};
								var cbSuccess = function (res) {
									if (res.data.code == 1) {
										that.get_remark_list();
							   
										that.inputValue == '';
										console.log('that.inputValue',that.inputValue);
										uni.showToast({
											title: res.data.msg,
											duration: 500
										})
									}
								};
								var cbError = function (res) {
									uni.showToast({
										title: '评论失败',
										duration: 500
									})
								};
								that.abotapi.httpPost(url, data, cbSuccess, cbError);
				
							}
				
						}
					}) 
				}
			},
				
			
			

			
			//发送评论内容
			sendRemark:function(){
				var that = this;
				var userInfo = this.abotapi.get_user_info();
				that.inputValue = this.inputValue;
				console.log('inputValue',that.inputValue);
				if(!userInfo || !userInfo.userid){
					
					uni.navigateTo({
						url: '/pages/login/login',
					})
					return
				};
				if(that.inputValue == ''){
					that.is_OK = false;
					console.log('TRUE')
					uni.showToast({
						title: '评论不能为空',
						duration: 500,
					});
					return;
				}else{
					that.is_OK = false;
					this.getUserProfile();
					console.log('FALSE')
					uni.showToast({
						title: '评论成功',
						duration: 500,
						
					});
					
				}
			},	
			
			
			//获取登陆者个人信息
			getUserProfile:function(){
				var that=this;
				var userInfo = this.abotapi.get_user_info();
				if(!userInfo){
					uni.navigateTo({
						url: '/pages/login/login',
					})
					return;
				}
				this.abotapi.abotRequest({
					url:this.abotapi.globalData.yanyubao_server_url +"?g=Yanyubao&m=ShopAppWxa&a=get_user_info",
					data:{
						sellerid: this.abotapi.get_sellerid(),
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
					},
					
					header: {
					  "Content-Type": "application/x-www-form-urlencoded"
					},
					method: "POST",
					success: function (res) {
						console.log('ddd', res);
											
						if (res.data.code == "-1") {
							uni.navigateTo({
								url: '/pages/login/login',
							})
							return;
						} else {
							var data = res.data;
							
							that.user_info = data.data;
							console.log("user_info",that.user_info);
							if(that.inputValue == ''){
								console.log('inputValue为空')
								return;
							}else{
								console.log("评论成功,inputValue清空")
								that.doSendRemark();
								that.inputValue = ''
								that.get_remark_list();
							}
						}
					},
				})
			},
			
			
			// 执行发送评论
			doSendRemark:function(){
				var that = this;
				var userInfo = this.abotapi.get_user_info();
				console.log('userInfo',userInfo);
				
				if(!userInfo){
					uni.showModal({
						title:'请先登录',
						content:'请先登录'
					})
					return;
				}
				
				if(!userInfo.nickname){
					userInfo.nickname = '';
				}
				
				if(!userInfo.headimgurl){
					userInfo.headimgurl = '';
				}
				
				that.abotapi.abotRequest({
					url:that.abotapi.globalData.weiduke_server_url+'openapi/ArticleImgApi/remark_img',
					method:'POST',
					header:{'Content-Type': 'application/x-www-form-urlencoded'},
					data:{
						token: that.abotapi.get_current_weiduke_token(),
						openid: that.abotapi.get_current_openid(),
						userid:userInfo.userid,
						checkstr:userInfo.checkstr,
						action: 'add',
						imgid: that.wz_id,
						content:this.inputValue,
						icon:userInfo.headimgurl,
						name:userInfo.nickname
					},
					success(res) {
						console.log("res===",res);
						if(res.data.code == 1){
							uni.showToast({
								title: '评论成功',
								duration: 500,
							});
							
						}
					}
				});
			},
			
				
			//删除评论
			deleteRemark: function (e) {
			  
				if (!userInfo) {
					uni.showToast({
						title: '请先登录',
						icon: 'none',
						duration: 1000,
						success: function () {
				
							uni.setStorageSync('last_url', '/cms/publish/publish?publishtype=' + that.publishtype);
				
							uni.navigateTo({
								url: '/pages/login/login',
							})
						}
					})
				}
				
				var that = this;
				this.abotapi.abotRequest({
					url: this.abotapi.globalData.weiduke_server_url + 'index.php/openapi/ArticleImgApi/remark_img',
					method: 'post',
					data: {
						token: this.abotapi.get_current_weiduke_token(),
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
									var last_url = '/pages/home/help_detail/help_detail?id=' + that.id + '&sellerid=' + that.sellerid + '&form_page=publish_list';
								}else{
									var last_url = '/pages/home/help_detail/help_detail?id=' + that.id + '&sellerid=' + that.sellerid;
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
						token: this.abotapi.get_current_weiduke_token(),
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
						token: this.abotapi.get_current_weiduke_token,      
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
	  font-family: "微软雅黑";
	  margin-bottom:40rpx;
	}
	.tuijian{
	  font-size: 24rpx;
	  color: #666;
	}
	.detail_bottom{
	  position: fixed;
	  bottom: 0;
	  border-top: 10rpx solid;
	  border-image: -webkit-linear-gradient(#fff,rgb(136, 136, 136)) 30 30;
	  border-image: -moz-linear-gradient(#fff,rgb(136, 136, 136))  30 30;
	  border-image: linear-gradient(#fff,rgb(136, 136, 136))  30 30;
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
	.share{
	  opacity:0;
	  width:55rpx;
	  height:55rpx;
	  position:absolute;
	  background:transparent;
	  left:582rpx;
	
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
	  width:276rpx;
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
	  margin-top:46rpx;
	
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
		margin: 20upx;
	}
	.head_img image{
		width: 100upx;
		height: 100upx;
		border-radius:5upx;
	}
	.nickname{
		color:#515151;
		font-size: 28upx;
	}
	.cata_name{
		margin-top: 10upx;
		background-color: #18dba6;
		color: #fff;
		border-radius:6upx;
		padding: 2rpx 6rpx;
		text-align: center;
	}
	.wenzhang-meihua{
		font-size: 30upx;
		margin-top: 10upx;
		margin: auto;
		padding-bottom: 10upx;
		padding-top: 10upx;
		border-top: 1upx solid #eee;
	}
</style>
