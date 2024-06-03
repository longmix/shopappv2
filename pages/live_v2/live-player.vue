<template>
	<view>
		<view v-if="live_room_kaibo_status == 1"
				class="uni-padding-wrap uni-common-mt"  :style="{background:navBarColor}">
				
				<view style="flex-flow: row;justify-content: space-between;display: flex;">
					<view style="flex-flow: row;justify-content: start;display: flex;margin-top: 10rpx;margin-bottom: 10rpx;padding-left: 10rpx;" >
						<image :src="icon_image" style="width: 80rpx;height: 80rpx;border-radius: 50%;"></image>
						<view class="text-zhengwen">
							<p>{{nick_name}}</p>
							<p>{{live_room_title}}</p>
						</view>
						
					</view>
					<view class="text-zhengwen" style="padding-right: 10rpx;">
						<p style="margin-top: 5rpx;">当前在线人数:{{online_count}}人 </p>
						<p style="margin-top: 5rpx;">直播间浏览量:{{online_page_count_now}}人</p>
					</view>
					
					
				</view>
			
					<view style="width:750rpx; height: 1000rpx; background-color: aquamarine;">
							<video style="width: 750rpx;height: 1000rpx;z-index:99;"
								object-fit="cover"
								ref="mainVideo"
								:src="current_room_url" 						
								@error="videoErrorCallback" 
								:danmu-list="danmuList" 
								autoplay="true"
								:show-fullscreen-btn="showFullBtn"
							 />
	            </view>
				
				
				
				<view class="myView_yinliu" v-if="fensi_room_show_flag == 1">
					<video style="width: 250rpx;height: 188rpx;"
						ref="fensiVideo" 
						:src="fensi_room_url"
						@error="videoErrorCallback" 
						:danmu-list="danmuList" 
						autoplay="true"
						:show-fullscreen-btn="showFullBtn"
						/>
				</view>
				
				
				
				<!-- 显示互动信息 -->	            
				<view  class="danmu-con">
					<view class="uni-list uni-common-mt">
						<view class="uni-list-cell">
							<view class="comment-wrap">
								<scroll-view class="scroll-view" :scroll-y="true" :scroll-with-animation="true" :show-scrollbar="false" :scroll-top="commentScrollTop">
									<view class="commentContent">
										<view  class="uni-label" v-for="(item, index) in msgList" :key="index">
											<view class="uni-label-name">{{item.name}}:</view>
											<view class="uni-label-content">{{item.content}}</view>
										</view>
									</view>
								</scroll-view>		
							</view>
							
						</view>
						
					</view>
				</view>
				
				
				
				<view class="button-lianmai">
							<button
							style="width: 88rpx;border-radius: 100%;height: 88rpx;background-color: rgba(218, 145, 218, 0.44);margin-block-end: 60rpx;"
							@click="shenqing_lianmai" class="page-lianmai-button" >
							
						</button>
							<p style="font-size: 10rpx;color: #ffffff;position:fixed;bottom: 200rpx;">
							视频连麦</p>
				</view>
				
				
				
				
				
				
				
				<view class="uni-list-cell-db">
							<view class="icon-touxiang">

							</view>
							<input v-model="danmuValue" class="uni-input" type="text" placeholder="   发个弹幕呗~" />

							<button @click="sendMsg" class="page-body-button"></button>

						</view>
				
		
				<!-- #ifndef MP-ALIPAY -->
	            <!-- #endif -->
	    </view>
			
		<view v-else :style="{background:navBarColor}" class="yijieshu">
			<!-- 界面：显示没有开播的提示 -->
			<view style="padding-top: 300rpx;width: 750rpx; text-align: center;">
				<image src="../../static/img/hua.png" mode="widthFix" style="margin: 0 auto; width: 300rpx;"></image>
			</view>
			<p	style="margin-top: 20rpx;font-size: 40rpx;color: azure;width: 100%;text-align: center;">未开播：{{live_room_kaibo_status_str}}</p>
			
			
		</view>
	</view>		
</template>

<script>
	//import { post } from '../../common/abotapi';

	import socket_io_function from '../../common/weapp.socket.io.js'; 

	export default {
		data() {
			return {
				current_roomid:'',
				src: '',
				danmuList: [
				],
				danmuValue: '',
				windowWidth:'',
				windowHeight: '',
				player_url: '',
				msgList: [
							
							{'name':'直播官方','content':'欢迎来到直播间，一起聊聊吧！'},
						],
				roomid: '',
				product_list: '',
				live_userid:'',
				
				//直播间标题
				live_room_title:'ID:{....}',
				
				
				//全局变量标记当前直播间是否开播
				live_room_kaibo_status:1,
				live_room_kaibo_status_str:'{...}',
				
				//主播的video和粉丝的video的句柄
				main_videoContext:null,
				fensi_videoContext:null,
				
				
				current_room_url:'',
				live_roomid:'',
				
				 //评论区滚动高度
				commentScrollTop: 1,
				
				zhubo_zhibo_jieshu:0,   //为1的时候是显示，为1的时候是直播已经结束了，显示v-else里面的内容
				
				//连麦粉丝的视频小窗口
				fensi_room_show_flag:0,
				fensi_room_url:'',
				
				icon_image:'',
				nick_name:'',
				navBarColor:'#333333',
				live_player_title:'直播间',
				live_room_font_color:'#ffffff',
				online_count:0,
				online_page_count_now:0,
				
				showFullBtn:false     //控制video内去掉视频放大按钮
								
			}
		},
		onLoad(options){

			var that = this;
			
			//console.log('11111111111111111',title);
			
			
			
			that.current_roomid = options.roomid;
			
			that.icon_image = options.icon_image;
			
			that.nick_name = options.nick_name;
			
			console.log('当前icon_image为:', that.icon_image);
			
			
			
			console.log('当前nick_name为:', this.nick_name);
			
			console.log('携带参数过来的roomid为:',that.current_roomid);
			//判断是否登录
			
			
			
			this.get_live_room_info();
			
			//渲染头部和文字颜色
			this.abotapi.set_shop_option_data(this, function(that, option_data){
				console.log('option_data',option_data);
				
				//读取设置选项
				
				that.get_setting_info();
				
			});
			
			
			//that.main_videoContext.start();
			
			
			
			//console.log('this函数里面的数据为：',this);
			
			
			
			if(options.userid){
				this.live_userid = options.live_userid;
			}

			
			if(options.player_url){
				this.player_url = options.player_url;
			}
			
			if(options.streamName){
				this.roomid = options.streamName;
			}
			
			
			uni.getSystemInfo({
			    success: function (res) {
					
					console.log('getSystemInfo==',res)
					that.windowHeight = res.windowHeight;
					that.windowWidth = res.windowWidth;
					
			    }
			});
			
			
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.main_videoContext = uni.createVideoContext('mainVideo')
			this.fensi_videoContext = uni.createVideoContext('fensiVideo');
			// #endif
			
			
			
		},
		onShareAppMessage: function () {
		},
		onShareTimeline: function () {
			
		},
		onAddToFavorites: function () {
			//this.onShareTimeline();
		},
		methods: {
			
			
			option_data:function(that,option_data){
				console.log('option_data----->>>',option_data);
				
			},
						
			//create_socketio_connect:(live_roomid)=>{
			create_socketio_connect:function(live_roomid){
				var that = this;
				var userAcountInfo = that.abotapi.get_user_account_info();
				var userInfo = that.abotapi.get_user_info();
				var socket_io = socket_io_function(that.abotapi.globalData.socket_server, {path: '/socketio/'})
						   
				// socket连接后以uid登录
				
				console.log('准备将live_roomid赋值给uid，当前的live_roomid为:',live_roomid);
				
				var uid = live_roomid;
				
				
				
				console.log('当前的uid是',uid);
				
							
				socket_io.on('connect', function(){
					
					console.log('socket_io====6666',  socket_io.connected);
					console.log('socket_io====7777',  socket_io);
					
					socket_io.emit('login', uid);
					
					console.log(111);
					console.log('注册成功，uid=>'+uid);
					console.log(111);
				});
				socket_io.on('update_online_count', function(online_count_obj){
					
					//console.log('update_online_count ====>>>>>', msg)
				    online_count_obj = JSON.parse(online_count_obj);
					that.online_count = online_count_obj.online_count;
					that.online_page_count_now = online_count_obj.online_page_count_now;
									
					console.log('当前在线人数以及累计观看人数',that.online_count);
					console.log('当前在线人数以及累计观看人数',that.online_page_count_now);
					
				});
				socket_io.on('new_msg', function(msg){
					//var userInfo = this.abotapi.get_user_info();
					
					
					console.log('msg===main00077', msg)
					
					//console.log("收到消息："+msg.replace(/&quot;/g,'"'));							
					msg = msg.replace(/&quot;/g,'"');
					
					msg = new Buffer(msg, 'base64').toString('utf-8');
					
					console.log('msg===main00188', msg);
					msg = JSON.parse(msg);
					//msg = JSON.parse(decodeURIComponent(msg));
					
					console.log('当前的type类型为:',msg.type);					
					
					if(msg.type == 'text_msg'){
						//渲染到主播端的消息列表  msg.datetime01
						that.msgList.push({'name':msg.username, 'content':msg.content});
					}
					else if(msg.type == 'event_tongyi_lianmai'){
						
						uni.hideLoading();
						
						
						var shenqing_lianmai_userid = msg.content;
						
						//var userInfo = this.abotapi.get_user_info();
						console.log('userInfo=====>>>>>000000', userInfo);
						
						console.log('userInfo里面的内容为1212121212121212121',userInfo);
						
						//如果是自己，则跳转到直播端，开始连麦
						if(userInfo.userid == shenqing_lianmai_userid){
							
							var new_url = '/pages/live_v2/live-pusher';
							new_url += '?from_roomid='+ that.current_roomid;
							
							uni.redirectTo({
								url: new_url
							});
							
						}
						else if(userInfo.userid != shenqing_lianmai_userid){
							//如果不是自己，则对这条消息不做反应，知道收到 event_yijing_kaishi_lianmai
							
						}
					}
					else if(msg.type == 'event_jujue_lianmai'){
						uni.hideLoading();
						
						uni.showToast({
							title:'连麦申请被拒绝'
						})
					}
					else if (msg.type == 'event_yijing_kaishi_lianmai') {
						//粉丝已经开始跟主播连麦，观众端展示小窗口
											
						//根据 fensi_room_url 开小窗口
					
						console.log('收到事件event_yijing_kaishi_lianmai ===>>>>', msg.content);
					
						//展示右下角的小窗口，显示连麦端的用户的视频画面
						var content_obj = JSON.parse(msg.content);
					
						//var fensi_roomid = content_obj.roomid;
						that.fensi_room_url = content_obj.room_url;
						
							
						if(content_obj.lianmai_userid == userInfo.userid){
							//如果是连麦粉丝自己收到的这个消息，因为此时他正在pusher界面上，所有这里没有必须展示小窗口
							return;
						}
					
						console.log('收到事件event_yijing_kaishi_lianmai 粉丝的直播间网址 ===>>>>', that.fensi_room_url);
					
						if (that.fensi_room_url) {
							that.fensi_room_show_flag = 1;
							
						
							
							// #ifdef H5
							//便于在H5端调试
							that.fensi_room_url = 'http://static-oss-video.tseo.cn/82ed54cfcc7e8f257e1a83ec00051580.mp4';
							// #endif
							
							// #ifdef APP-PLUS
							that.fensi_videoContext.start();
							// #endif
					
							
					
							console.log('已经显示了粉丝视频的小窗', that.fensi_room_show_flag);							
						}
						
					}
					else if (msg.type == 'event_jieshu_fensi_lianmai') {					
					
						//结束粉丝连线的小窗口
					
						that.fensi_room_show_flag = 0;
						that.fensi_room_url = '';
					
						console.log('主播跟粉丝连麦结束');
					
					}
					
				});
				
				
				
			},
			
			
			//进入直播间，获取该直播间详细信息
			get_live_room_info:function(){
				
				var that = this;
				var live_roomid = that.current_roomid;
				
				var post_data = {
					sellerid:this.abotapi.get_sellerid(),
					live_roomid:that.current_roomid
				} 
				
				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if(!userInfo || !userInfo.userid || !userInfo.checkstr){
					that.abotapi.goto_user_login('/pages/index/index');
					return;
				}
				
				post_data.userid = userInfo.userid;
				post_data.checkstr = userInfo.checkstr;
				
				console.log('当前的live_roomid为:', live_roomid);			
				console.log('当前的userid为：', userInfo.userid);
				
				this.abotapi.abotRequest({
				    url: this.abotapi.globalData.yanyubao_server_url + '/openapi/LiveRoomV2Data/mediamtx_get_live_room_info',
				    method: 'post',
				    data: post_data,
					success: function (res) {
						
						console.log('当前的直播间的信息为：', res);
						
						if(res.data.code == 1){
							that.live_room_kaibo_status = 1;
							
							console.log('当前live_room_kaibo_status值为:',that.live_room_kaibo_status);
							
							that.current_room_url = res.data.live_room_url;
							// that.icon_image = res.data.
							
							// #ifdef H5
							//如果是网页调试，确保视频播放能展示
							that.current_room_url = 'http://static-oss-video.tseo.cn/82ed54cfcc7e8f257e1a83ec00051580.mp4';
							// #endif
							
							
							//that.main_videoContext.start();
							
							console.log('此时的live_roomid为：', live_roomid)
							console.log('当前直播间的url为:', that.current_room_url);
							
							//设置直播间标题
							that.live_room_title = 'ID:' + that.current_roomid;
							
							
							that.create_socketio_connect(live_roomid);
							
						}
						//如果下播或者没有开播，则返回code为0
						else{
							//没有开播，展示没有开播的界面
							
							that.live_room_kaibo_status = 0;
							
							if(res.data.msg){
								that.live_room_kaibo_status_str = res.data.msg;
							}
							
						}
						
					},
					fail: function (e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					},
					
					})
				
				
				
			},
			
			
			//获取配置项，获取对直播间的配置内容
			get_setting_info:function(){
				
				var that = this;
				var post_data = {
					sellerid:this.abotapi.get_sellerid(),
					//live_roomid:that.current_roomid
				} 
				
				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if(!userInfo || !userInfo.userid || !userInfo.checkstr){
					that.abotapi.goto_user_login('/pages/index/index');
					return;
				}
				
				post_data.userid = userInfo.userid;
				post_data.checkstr = userInfo.checkstr;
				
				
				this.abotapi.abotRequest({
				    url: this.abotapi.globalData.yanyubao_server_url + '/openapi/LiveRoomV2Data/get_setting',
				    method: 'post',
				    data: post_data,
					success: function (res) {
						console.log('12112112121212===>当前res',res);
						
						that.live_player_title = res.data.data.live_player_title;
						//that.live_pusher_title = res.data.data.live_pusher_title;
						that.navBarColor = res.data.data.live_room_bg_color;
						that.live_room_font_color = res.data.data.live_room_font_color;
						that.live_room_v2_disable_status = res.data.data.live_room_v2_disable_status;
						
						
						
						
						
						console.log('导航栏背景色:', that.navBarColor);
						console.log('直播间标题', that.live_player_title);
						console.log('直播间标题字体颜色', that.live_room_font_color);
						
						
						
						uni.setNavigationBarTitle({
						    title: that.live_player_title,   //自定义直播间标题
						});
						
						
						
					}
				})
				
				
				
			},
			
			
			
			
			
			
			/**
			 * 2023.7.5.此函数暂时不用
			 * @param {Object} msg
			 */
			getNewMsg: function(msg){
				console.log('getNewMsg=====',msg)
				
			    var that = this;			
				var userInfo = that.abotapi.get_user_info();
				
				if(that.pageOn){	
					
					// console.log('that.pageOn==',that.pageOn)
					console.log('00000000')
					
					var is_not_self_msg = true;										
					
						if(is_not_self_msg && msg.uid == that.userid){
							
							that.screenMsg(msg);
							
								
						}						
					
				}
						
			},
			
			
			
			// 发送消息
			sendMsg(){
				
				
				var content = this.danmuValue;
				//var type = 'text';
				
				
				var userInfo = this.abotapi.get_user_info();
				var userAcountInfo = this.abotapi.get_user_account_info();
				
				//this.msgList.push({'name':userAcountInfo.fenxiao_info.nickname, 'content':this.danmuValue});
				this.danmuValue = '';
				
				//实际应用中，此处应该提交长连接，模板仅做本地处理。
				var nowDate = new Date();
				// let lastid = this.msgList[this.msgList.length-1].id;
				let lastid = this.msgList.length > 0 ? this.msgList[this.msgList.length - 1].id : this.msgList.length;
				
				
				lastid++;
				
				var type = 'text_msg';
				
				this.send_text_to_service(content, type, ()=>{
					
				});
				
			},
			
			// 接受消息(筛选处理)
			screenMsg(msg){
				//从长连接处转发给这个方法，进行筛选处理
				console.log('当前msg里面的内容为:',msg)
				// switch (msg.type){
				// 	case 'text':
				// 		this.addTextMsg(msg);
				// 		break;
				// 	case 'voice':
				// 		this.addVoiceMsg(msg);
				// 		break;
				// 	case 'img':
				// 		this.addImgMsg(msg);
				// 		break;
				// }
				//this.msgList.push(msg);
				
			},
			
			
			// 处理文字消息
			// addTextMsg(msg){
				
				
			// 	console.log('消息文字的内容为：',msg);
			// 	this.msgList.push(msg);
			
			// },
			
			send_text_to_service:function(msg, msg_type, callback_function){
				
				var userInfo = this.abotapi.get_user_info();
				
				var userAcountInfo = this.abotapi.get_user_account_info();
				
				//console.log('myuid======00', this.myuid);
				
				console.log('userInfo里面的内容为========>>>>', userInfo);
				console.log('userAcountInfo里面的内容为=======>>>>', userAcountInfo);
				
				console.log('msg====0', msg)
				console.log('msg_type的类型为:', msg_type);
						
				//var content = encodeURIComponent(JSON.stringify(msg));
				var content = msg;
				
				var that = this;
				
				var data_params = {
				       sellerid: that.abotapi.globalData.default_sellerid,
					   userid:userInfo.userid,
					   checkstr:userInfo.checkstr,
					   username:userAcountInfo.nickname,
					   roomid:that.current_roomid,
					   content: content,
					   type: msg_type
				}
				
				that.abotapi.abotRequest({
				     url: that.abotapi.globalData.yanyubao_server_url + '/openapi/LiveRoomV2Data/socketio_send_live_room_msg',
				     data:data_params,
				     success: function (res) {
						 
				       console.log('socketio_send_live_room_msg===>>>', res);
				      
					  //消息发送失败
					  if(res.data.code == 0){
						  uni.showToast({
						  	title: res.data.msg,
							duration: 2000,
							icon: 'none'
						  })
						  
						  return;
					  }
					  
					  typeof callback_function == "function" && callback_function();
					  
					  
				     }
				   })
			},
			
			
			//弹幕相关
			sendDanmu: function() {
				this.main_videoContext.sendDanmu({
					text: this.danmuValue,
					color: this.getRandomColor()
				});
				this.danmuValue = '';
			},
			videoErrorCallback: function(e) {
				console.log('e===',JSON.stringify(e));
				
				
				
				this.zhubo_zhibo_jieshu = 0;
				
				
				console.log('当前直播间的状态为',this.zhubo_zhibo_jieshu);
				
				// uni.showModal({
				// 	content: '该用户没有直播',
				// 	showCancel: false,
				// 	success: (res) => {
				// 	if(res.confirm){
				// 		this.abotapi.call_h5browser_or_other_goto_url('/pages/index/index');

				// 	}
				// 	}
				// });
			},
			getRandomColor: function() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			},
			shenqing_lianmai:function(){
				var that = this;
				
				var userInfo = that.abotapi.get_user_info();
				
				var flag001 = 0;
				
				
				uni.showModal({
					title:'提示',
					content: '确定申请连麦',
					success:function(res){
						if (res.confirm) {
							if(flag001 == 1){
								return;
							}
							
							flag001 = 1;
							
							var content = ''+userInfo.userid;
							var type = 'event_shenqing_lianmai';
							
							that.send_text_to_service(content, type, ()=>{
								console.log('发送申请连麦的消息成功！');
								
								uni.showLoading({
									title: '等待主播同意'
								});
							});	
							
													
							
							
						}
						
					}
					
				})
			}
		}
	}
</script>

<style lang="scss">
	// page{
	// 	background-color: #333333;
	// }
	
	
	

	.danmu-con{
		position: absolute;
		height: 200rpx;
		width: 100%;
		
	}
	
	.uni-padding-wrap{
		position:absolute;
		left:0;
		right:0;
		top:0;
		bottom:0;
		background-size: 100% 100%;
	}
	
	
	
	.uni-list-cell-db{
		position: fixed;
		display: flex;
		//justify-content: space-between;
		width: 100%;
		border-top:1rpx solid #d0d0d0 ;
		bottom: 50rpx;
	}
	.page-body-button::after{
		border: none;
	
	}
	

	.page-body-button {
		width: 104rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		line-height: normal;
		background-color: #80FFFF;
		padding: 0;
		color: #EEEEEE;
		//padding: 1rpx;
		line-height: 50rpx;
		margin-top: 10rpx;
		background-image: url('https://yanyubao.tseo.cn/Tpl/static/live_v2/fasong.png');
		background-size: 80rpx 80rpx;
		background-position: 4rpx;
		background-repeat: no-repeat;
	}
	
	.yijieshu{
		position:absolute;
		left:0;
		right:0;
		top:0;
		bottom:0;
		background-size: 100% 100%;
	}

	.prdoucts{
		position: fixed;
		bottom: 40rpx;
	}
	.prdoucts image{
		width: 40rpx;
	}
	.uni-list-cell-db input{
		border: 1rpx solid #d0d0d0;
		height: 64rpx;
		width: 80%;
		margin: 0 auto;
		border-radius: 30rpx;
		line-height: 64rpx;
		padding-left:30rpx ;
		background-color: #e1e1e1;
		margin-top: 10rpx;
	}
	.uni-label{
		margin-left: 15rpx;
		margin-bottom: 10rpx;
		background-color: rgba(242, 242, 242, 0.1);
		width: 85%;
		margin-left: 20rpx;
		border-radius: 20rpx;
	
	
	}
	.uni-label-name{
		float: left;
		color: #027DB4;
	
	}
	.uni-label-content{
		margin-bottom: 10rpx;
		color: #ffffff;
	}
	.scroll-view{
		position: fixed;
		top: 1120rpx;
		height: 200rpx;
		
	}
	// 隐藏滚动条
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	.myView_yinliu {
		position: absolute;
		right: 20rpx;
		bottom: 180rpx;
	}
	.icon-touxiang {
		width: 15%;
		height: 80rpx;
		background-image: url('https://yanyubao.tseo.cn/Tpl/static/live_v2/yonghutouxiang.png');
		background-size: 80rpx 80rpx;
		background-repeat: no-repeat;
	}
	.page-lianmai-button {
		width: 100rpx;
		background-color: #da91da;
		color: #EEEEEE;
		line-height: 50rpx;
		margin-top: 10rpx;
		background-image: url('https://yanyubao.tseo.cn/Tpl/static/live_v2/maikefeng.png');
		background-size: 80rpx 80rpx;
		background-position: 5rpx;
		background-repeat: no-repeat;
	}
	.text-biaoti{
		font-size: 40rpx;
		margin-left: 20rpx;
		color: #ffffff;
	}
	// .text-zhengwen{
	// 	color: #ffffff;
		// height: 80rpx;
		// line-height: 80rpx;
	// 	margin-left: 10rpx;
	// }
	
	.text-zhengwen{
		margin-left: 10rpx;
		color: #ffffff;
		
	}
	
	
	.button-lianmai{
		width: 150rpx;
		display:flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		margin-top: 60rpx;
		margin-right:-20rpx;
		float: right;
		z-index: 999;
	}

</style>
