<template>
	<view class="beijing_background" :style="{background:navBarColor}">
		<view class="account-form">
			<view class="uni-form-item">
				<view class="uni-input-wrapper">
					<view style="flex-flow: row;justify-content: space-between;display: flex;">
						<view style="flex-flow: row;justify-content: start;display: flex;margin-top: 10rpx;margin-bottom: 10rpx;padding-left: 10rpx;">
							<image :src="icon_image" style="width: 80rpx;height: 80rpx;border-radius: 50%;"></image>
							<view class="text-zhengwen">
								<p>{{nick_name}}</p>
								<input class="uni-input" placeholder="直播间标题" :value="form_data.liveroomTitle"
									@input="changeInput($event,'liveroomTitle')" />
							</view>

						</view>
						<view class="text-zhengwen" style="padding-right: 10rpx;" v-if="startState == true">
							<p style="margin-top: 5rpx;">当前在线人数:{{online_count}}人 </p>
							<p style="margin-top: 5rpx;">直播间浏览量:{{online_page_count_now}}人</p>
						</view>

					</view>

				</view>
			</view>
		</view>



		<view class="">
			<!-- <cover-view class="mylivePusher"> -->
			<!-- #ifdef APP-PLUS -->
			<live-pusher id="livePusherComponent" ref="livePusher"
				:style="{height: pusherCalss.height + 'px',width: pusherCalss.width + 'px'}" class="livePusher8888"
				whiteness="2" aspect="9:16" :url="room_url" mode="SD" :muted="false" :enable-camera="true" :auto-focus="true"
				:beauty="1" @statechange="statechange" @netstatus="netstatus" @error="error">
				<!-- <cover-view class="danmu-con">
					<cover-view class="uni-label"
						style="background-color: rgba(242, 242, 242, 0.1);width: 640rpx;border-radius: 20rpx;"
						v-for="(item, index) in msgList" :key="index">
						<cover-view class="uni-label-name">{{item.name}}:</cover-view>
						<cover-view class="uni-label-content">{{item.content}}</cover-view>
					</cover-view>
				</cover-view> -->

			</live-pusher>
			<!-- #endif -->
			<!-- </cover-view> -->
		</view>













		<view class="uni-list-cell-db" v-if="startState == true">
			<input style="position:absolute;bottom:50rpx;left: 30rpx;width: 550rpx" v-model="danmuValue" class="uni-input"
				type="text" placeholder="" />

			<button @click="sendMsg" class="page-body-button"></button>

		</view>
		
		
		
		
		<view class="danmu-con">
			<view class="uni-label"
				style="background-color: rgba(242, 242, 242, 0.1);width: 640rpx;border-radius: 20rpx;"
				v-for="(item, index) in msgList" :key="index">
				<view class="uni-label-name">{{item.name}}:</view>
				<view class="uni-label-content">{{item.content}}</view>
			</view>
		</view>



		<!-- 切换摄像头按钮 -->
		<view class="icon-shexiangtou">
			<button v-if="startState == true" @click="switchCamera" class="btn icon-shuaxin"
				style="float: right;border: 32rpx solid rgba(0, 0, 0, 0);background-color: transparent;">
			</button>
		</view>




		<view class="myView_yinliu" v-if="fensi_room_show_flag == 1">
			<video id="myVideo" ref="fensi_Video" :src="fensi_room_url" style="width: 250rpx;height: 300rpx;"
				@error="videoErrorCallback" :danmu-list="danmuList" autoplay="true" 
				:show-fullscreen-btn="showFullBtn"
				/>
		</view>

		<!-- 官方给的一些按钮，具体调用在下面 -->
		<view class="button_btn">


			<view
				style="width: 675rpx;flex-flow: row;justify-content: space-between;display: flex; margin: 0 auto;right: 50rpx;bottom: 100rpx;position: absolute;">
				<button class="cu-btn bg-red margin-tb-sm lg" @tap="start_zhibo" v-if="!startState"
					style="width: 150rpx;background-color: rgba(217, 0, 27, 0.6);color: white;border-radius: 80rpx;">开播</button>

				<button class="btn" @click="stop" v-if="startState"
					style="width:150rpx;background-color: rgba(217, 0, 27, 0.4);color: #EBBFC0;border-radius: 80rpx;">停播</button>
			</view>

		</view>


	</view>
</template>

<script>
	import {
		post11111
	} from '../../common/abotapi';

	import socket_io_function from '../../common/weapp.socket.io.js';

	export default {
		data() {
			return {
				//弹幕
				src: '',
				danmuList: [
					//{
					// 		text: '第 1s 出现的弹幕',
					// 		color: '#ff0000',
					// 		time: 1
					// 	},
					// 	{
					// 		text: '第 3s 出现的弹幕',
					// 		color: '#ff00ff',
					// 		time: 3
					// 	}
				],
				msgList: [
					{'name':'直播官方','content':'欢迎来到直播间，一起聊聊吧！'},
				],

				// form本人测试请求的参数，不发请求可以不加
				form_data: {
					liveroomTitle: null, // 标题
					equipmentType: 1 // 设备类型（1.手机 2.电脑）
				},

				// 控制开启，关闭直播按钮的显示
				startState: false, // 直播状态（false 关闭）


				live_pusher_context: null,
				fensi_videoContext: null,


				room_url: '',

				//当前的roomid（可能是主播的，也可能是连麦粉丝的）
				current_roomid: '',


				//定时器
				// timer:null,

				timerInterval: null,

				//是否从指定直播间过来连麦的？是的
				from_roomid: 0,

				//粉丝的直播地址，如果是粉丝因为连麦进入这个界面，那么这里显示的则是主播的URL
				fensi_room_url: null,
				fensi_room_show_flag: 0,

				//滚动条位置
				scrollAnimation: false,
				scrollTop: 0,
				scrollToView: '',



				//最后一次事件消息类型
				last_msg_type: '',

				//直播状态
				zhibo_status: 0,
				danmuValue: '',

				icon_image: '',
				nick_name: '',
				navBarColor:'#333333',

				pusherCalss: {
					width: '750',
					height: '500'
				},
				online_count:0,
				online_page_count_now:0,
				showFullBtn:false
				

			};
		},


		onLoad(options) {
			var that = this;
			// 获取可视区域高度࿰c;减去固定高度
			that.pusherCalss.width = wx.getSystemInfoSync().windowWidth;
			that.pusherCalss.height = wx.getSystemInfoSync().windowHeight - 200;


			console.log('手机固定宽度为:', that.pusherCalss.width);
			console.log('手机固定高度为:', that.pusherCalss.height);

			//uni.setNavi

			//const currentWebview = this.$mp.page.$getAppWebview();

			//console.log('12120000000000000000000==>>', options);
			this.get_setting_info();


			if (options.from_roomid) {
				this.from_roomid = options.from_roomid;
			}



			this.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);


			var post_data = {
				sellerid: this.abotapi.get_sellerid(),

			}

			//判断是否登录
			var userInfo = that.abotapi.get_user_info();

			if (!userInfo || !userInfo.userid || !userInfo.checkstr) {
				that.abotapi.goto_user_login('/pages/live_v2/live-pusher');
				return;
			}

			post_data.userid = userInfo.userid;
			post_data.checkstr = userInfo.checkstr;

			if (that.from_roomid) {
				post_data.from_roomid = that.from_roomid;
			}

			//console.log('112121212121=====>>>',userInfo);

			//进入直播界面，生成直播间URL，调用接口mediamtx_generate_live_room
			//（网址：http://yanyubao.tseo.cn/openapi/VideoLiveData/mediamtx_generate_live_room
			//参数：sellerid，userid，checkstr）

			this.$nextTick(function() {
				this.scrollTop = 9999;
				this.scrollAnimation = true;
			});


			this.abotapi.abotRequest({
				url: this.abotapi.globalData.yanyubao_server_url +
					'/openapi/LiveRoomV2Data/mediamtx_generate_live_room',
				method: 'post',
				data: post_data,
				success: (res) => {
					console.log('set_plan_video_live=====', res);

					if (res.data.code == 1) {
						that.room_url = res.data.live_url;

						that.icon_image = res.data.data.headimgurl;
						that.nick_name = res.data.data.nickname;

						//that.room_url = 'rtmp://192.168.0.81:1935/live/'+ res.data.live_roomid;
						//that.room_url = 'rtmp://9120558719290:2455658719290@test.tseo.cn:1935/live/2455658719290';
						//that.room_url = 'rtmp://test.tseo.cn:1935/live/2455658719290';
						//that.room_url = 'rtmp://test.tseo.cn:1935/live01/mystream01';						

						console.log('当前直播间的网址==========>>>>>>>>>', that.room_url);
						console.log('当前直播间的roomid==========>>>>>>>>>', res.data.live_roomid);

						console.log('icon_image的图片为:', that.icon_image);
						console.log('nick_name的昵称为:', that.nick_name);

						//修改直播间标题，暂时设置为直播间ID
						that.form_data.liveroomTitle = 'ID:' + res.data.live_roomid;


						that.current_roomid = res.data.live_roomid;

						if (that.from_roomid == 0) {
							console.log('这是主播在直播，对应的直播间ID==========>>>>>>>>>', that.current_roomid);

							that.create_socketio_connect(that.current_roomid);
						} else {
							//通知主播，当前的粉丝已经连麦了
							console.log('这是粉丝连麦主播，主播的直播间ID==>>', that.from_roomid);
							console.log('这是粉丝连麦主播，粉丝的直播间ID==>>', that.current_roomid);

							that.create_socketio_connect(that.from_roomid);


							var timer001 = setTimeout(() => {
								//自动点击  开始直播
								if (that.live_pusher_context && that.from_roomid) {

									console.log('这是粉丝连麦主播，粉丝准备开始直播==>>');

									that.startState = false;
									that.start_zhibo();


									//告知主播，粉丝已经连麦成功
									var content = {
										roomid: that.current_roomid
									};

									content.room_url = that.room_url;

									content.lianmai_userid = post_data.userid;

									content = JSON.stringify(content)

									console.log('这是粉丝连麦主播，当前content里面的内容为:', content);

									var type = 'event_yijing_kaishi_lianmai'
									that.send_text_to_service(content, type, that.from_roomid, () => {
										console.log('这是粉丝连麦主播，已经通知主播查看:' + that.room_url);
									});

									clearTimeout(timer001);

								}

								console.log('这是粉丝连麦主播，等待context初始化完成。。。。');
							}, 1000)



						}
					}


				}


			})



			// this.abotapi.current_chat_gui = this;
			// this.abotapi.current_chat_page = '/pages/live_v2/live-pusher';


		},
		onReady() {

			// 注意：需要在onReady中 或 onLoad 延时
			// #ifndef H5			
			this.live_pusher_context = uni.createLivePusherContext('livePusherComponent', this);
			this.fensi_videoContext = uni.createVideoContext('fensi_Video')

			// #endif

			// #ifdef H5
			//模拟有live_pusher的句柄，以模拟粉丝连麦时候自动开播
			this.live_pusher_context = true;
			// #endif


			if (this.from_roomid) {
				//展示粉丝对应的主播当前的视频
				this.show_zhubo_video_for_fensi();
			}

		},




		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh: function() {
			this.abotapi.set_shop_option_data(this,
				this.callback_function_shop_option_data
			);

		},
		mounted() {

			// 一进页面，先调用摄像头，保证摄像头是打开状态，不加也可以，手动开启，参考上面官方给出的那些按钮
			//this.startPreview();
		},
		methods: {
			//如国是粉丝连麦进入这里，则小窗口展示主播的直播画面
			show_zhubo_video_for_fensi: function() {
				console.log('进入 show_zhubo_video_for_fensi......');

				//如果是粉丝连麦进入，则返回
				if (this.from_roomid == 0) {
					return;
				}

				var that = this;

				//获取from_roomid的直播间URL
				var post_data = {
					sellerid: this.abotapi.get_sellerid(),
					live_roomid: this.from_roomid
				}

				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if (!userInfo || !userInfo.userid || !userInfo.checkstr) {
					that.abotapi.goto_user_login('/pages/index/index');
					return;
				}

				post_data.userid = userInfo.userid;
				post_data.checkstr = userInfo.checkstr;

				console.log('准备播放的live_roomid为:', this.from_roomid);
				console.log('当前的userid为：', userInfo.userid);

				this.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + '/openapi/LiveRoomV2Data/mediamtx_get_live_room_info',
					method: 'post',
					data: post_data,
					success: function(res) {

						console.log('连麦粉丝对应主播的直播间的信息为，准备播放：', res);
						console.log('连麦粉丝对应主播的直播间的信息为，准备播放：', res.data.code);

						if (res.data.code == 1) {
							console.log('连麦粉丝对应主播的直播间网址：：', res.data.live_room_url);

							that.fensi_room_show_flag = 1;

							that.fensi_room_url = res.data.live_room_url;

							console.log('连麦粉丝对应主播的直播间网址：：', that.fensi_room_show_flag);

							// #ifdef H5
							//如果是网页调试，确保视频播放能展示
							that.fensi_room_url = 'http://static-oss-video.tseo.cn/82ed54cfcc7e8f257e1a83ec00051580.mp4';
							// #endif

							// #ifdef APP-PLUS
							that.fensi_videoContext.start()
							// #endif
						}
					}

				}); // end of 	this.abotapi.abotRequest	


			},
			send_text_to_service: function(msg, type, roomid, callback_function) {
				var that = this;

				var userInfo = this.abotapi.get_user_info();

				var userAcountInfo = this.abotapi.get_user_account_info();

				//console.log('myuid======00', this.myuid);

				console.log('userInfo里面的内容为========》》》》》', userInfo);
				console.log('userAcountInfo里面的内容为========》》》》》', userAcountInfo);

				console.log('msg====0', msg)

				console.log('type的类型为11:', type);


				if (!roomid) {
					roomid = that.current_roomid;
				}

				console.log('跳转过来时,roomid里面的live_roomid为:', roomid);

				//var content = encodeURIComponent(JSON.stringify(msg));
				var content = msg;


				var data_params = {
					sellerid: that.abotapi.globalData.default_sellerid,
					userid: userInfo.userid,
					checkstr: userInfo.checkstr,
					username: userAcountInfo.nickname,
					roomid: roomid,
					content: content,
					type: type
				}

				uni.request({
					url: that.abotapi.globalData.yanyubao_server_url +
						'/openapi/LiveRoomV2Data/socketio_send_live_room_msg',
					data: data_params,
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method: "POST",
					success: function(res) {
						console.log('chat_history=====add', res);
						//消息发送失败
						if (res.data.code == 0) {
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
			//create_socketio_connect:(live_roomid)=>{
			create_socketio_connect: function(live_roomid) {

				var that = this;



				console.log('查询userInfo里面的内容', that.abotapi.get_user_info());

				var userInfo = this.abotapi.get_user_info();
				var socket_io = socket_io_function(that.abotapi.globalData.socket_server, {
					path: '/socketio/'
				})
				var userAcountInfo = that.abotapi.get_user_account_info();

				// socket连接后以uid登录

				var uid = live_roomid;


				socket_io.on('connect', function() {

					console.log('socket_io====6666', socket_io.connected);
					console.log('socket_io====7777', socket_io);

					socket_io.emit('login', uid);

					console.log(111);
					console.log('注册成功，uid=>' + uid);
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

				socket_io.on('new_msg', function(msg) {

					console.log('msg===main000', msg);

					//console.log("收到消息："+msg.replace(/&quot;/g,'"'));							
					msg = msg.replace(/&quot;/g, '"');

					msg = new Buffer(msg, 'base64').toString('utf-8');

					console.log('msg===main00889', msg);

					msg = JSON.parse(msg);
					//msg = JSON.parse(decodeURIComponent(msg));



					if (msg.type == 'text_msg') {
						//渲染到主播端的消息列表  msg.datetime01
						that.msgList.push({
							'name': msg.username,
							'content': msg.content
						});

					} else if (msg.type == 'event_shenqing_lianmai') {
						if (that.from_roomid > 0) {
							return;
						}

						//如果连续两次事件相同，则不处理。
						if (that.last_msg_type == msg.type) {
							return;
						}
						that.last_msg_type = msg.type;



						var shenqing_lianmai_userid = msg.content;

						uni.showModal({
							title: '连麦申请',
							content: '来自' + msg.username + '的连麦申请，是否同意？',
							showCancel: true,
							success: (res) => {
								if (!res.confirm) {

									var content = '' + shenqing_lianmai_userid;
									var type = 'event_jujue_lianmai';

									that.send_text_to_service(content, type, that.current_roomid,
										() => {

										});

									return;
								}

								var content = '' + shenqing_lianmai_userid;
								var type = 'event_tongyi_lianmai';

								that.send_text_to_service(content, type, that.current_roomid,
									() => {

									});




							}
						})
					} else if (msg.type == 'event_yijing_kaishi_lianmai') {
						if (that.from_roomid > 0) {
							return;
						}

						//如果连续两次事件相同，则不处理。
						if (that.last_msg_type == msg.type) {
							return;
						}
						that.last_msg_type = msg.type;



						//根据 fensi_room_url 开小窗口

						console.log('收到事件event_yijing_kaishi_lianmai ===>>>>', msg.content);

						//展示右下角的小窗口，显示连麦端的用户的视频画面
						var content_obj = JSON.parse(msg.content);

						//var fensi_roomid = content_obj.roomid;
						that.fensi_room_url = content_obj.room_url;





						console.log('收到事件event_yijing_kaishi_lianmai 粉丝的直播间网址 ===>>>>', that.fensi_room_url);

						if (that.fensi_room_url) {
							that.fensi_room_show_flag = 1;

							// #ifdef APP-PLUS
							that.fensi_videoContext.start();
							// #endif

							console.log('已经显示了粉丝视频的小窗', that.fensi_room_show_flag);


						}






					} else if (msg.type == 'event_jieshu_fensi_lianmai') {
						if (that.from_roomid > 0) {
							return;
						}

						//如果连续两次事件相同，则不处理。
						if (that.last_msg_type == msg.type) {
							return;
						}
						that.last_msg_type = msg.type;

						//结束粉丝连线的小窗口

						that.fensi_room_show_flag = 0;
						that.fensi_room_url = '';

						console.log('主播跟粉丝连麦结束');

					}






				});



			},


			//这是每个vue文件都必须执行的回调函数，用于渲染头部导航栏背景色和文字颜色
			callback_function_shop_option_data: function(that, cb_params) {

				console.log('callback_function_shop_option_data===>>>', cb_params);

				uni.showLoading({
					title: '正在加载中'
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 1000);

				//商城的Logo、导航栏背景颜色和文字颜色
				that.wxa_shop_operation_logo_url = cb_params.option_list.wxa_shop_operation_logo_url;
				that.wxa_shop_nav_bg_color = cb_params.option_list.wxa_shop_nav_bg_color;
				that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;


			},

			sendMsg() {


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

				this.$nextTick(function() {
					this.scrollTop = 9999;
					this.scrollAnimation = true;
				});

				this.send_text_to_service(content, type, this.current_roomid, () => {
					//that.screenMsg(msg);

				});


				// 定时器模拟对方回复,三秒
				// setTimeout(()=>{
				// 	lastid = this.msgList[this.msgList.length-1].id;
				// 	lastid++;
				// 	msg = {id:lastid,uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg",time:nowDate.getHours()+":"+nowDate.getMinutes(),type:type,msg:content};
				// 	this.screenMsg(msg);
				// },3000)
			},






			// 下面的这些方法，可以参考官网，具体查看每个方法的意义
			statechange(e) {
				console.log('statechange:' + JSON.stringify(e));
			},
			netstatus(e) {
				console.log('netstatus:' + JSON.stringify(e));

				/*
				this.pusher.addEventListener('netstatus', function(e){
					//console.log('netstatus: '+JSON.stringify(e));
				}, false);
				*/
			},
			error(e) {
				console.log('error:' + JSON.stringify(e));
			},
			//点击开始直播
			start_zhibo: function() {

				var that = this;

				console.log('开始直播----');

				console.log('当前直播间的ID:', that.current_roomid);

				// #ifdef H5
				that.startState = true;
				return;
				// #endif


				var post_data = {
					sellerid: this.abotapi.get_sellerid(),
					roomid: that.current_roomid,
				}

				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if (userInfo && userInfo.userid) {
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				}
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url +
						'/openapi/LiveRoomV2Data/mediamtx_update_live_room',
					method: 'post',
					data: post_data,
				})




				that.timerInterval = setInterval(function() {
					that.abotapi.abotRequest({
						url: that.abotapi.globalData.yanyubao_server_url +
							'/openapi/LiveRoomV2Data/mediamtx_update_live_room',
						method: 'post',
						data: post_data,
					})


					console.log('定时任务执行！')
				}, 60000);


				that.startState = true;

				that.live_pusher_context.start({
					success: a => {
						that.startState = true;
						console.log('livePusher.start:' + JSON.stringify(a));
						console.log('开始直播成功！', that.startState);
					}
				});
			},
			close: function() {
				this.live_pusher_context.close({
					success: a => {
						console.log('livePusher.close:' + JSON.stringify(a));
					}
				});
			},
			snapshot: function() {
				this.live_pusher_context.snapshot({
					success: e => {
						console.log(JSON.stringify(e));
					}
				});
			},
			resume: function() {
				this.live_pusher_context.resume({
					success: a => {
						console.log('livePusher.resume:' + JSON.stringify(a));
					}
				});
			},
			pause: function() {
				this.live_pusher_context.pause({
					success: a => {
						console.log('livePusher.pause:' + JSON.stringify(a));
					}
				});
			},
			stop: function() {

				var that = this;

				if (that.timerInterval) {
					clearInterval(that.timerInterval);

					that.timerInterval = null;

					console.log('定时器任务清除！')
				}
				that.live_pusher_context.stop({
					success: a => {
						that.startState = false;
						console.log(JSON.stringify(a));
					}
				});
				that.startState = false;

				console.log('当前的开关状态为', that.startState);


				//如果是粉丝，要通知主播连麦已经结束
				if (that.from_roomid) {
					var content = {
						roomid: that.current_roomid
					};

					content.room_url = that.room_url;

					content = JSON.stringify(content)

					console.log('这是粉丝连麦主播，当前content里面的内容为:', content);

					var type = 'event_jieshu_fensi_lianmai'
					that.send_text_to_service(content, type, that.from_roomid, () => {
						//杀死粉丝连麦的状态更新定时器
						if (that.timerInterval) {
							clearInterval(that.timerInterval);

							that.timerInterval = null;

							console.log('定时器任务清除！')
						}


						console.log('这是粉丝连麦主播，已经通知主播查看:' + that.room_url);

						//跳转到粉丝观看直播的界面
						var new_url = '/pages/live_v2/live-player?roomid=' + that.from_roomid;

						that.abotapi.call_h5browser_or_other_goto_url(new_url);
					});

				}

				that.zhibo_status = 1;


				//直播结束，再次请求mediamtx_update_live_room接口，并传出参数will_shutdown，如果status有值且为1则关闭直播间
				var post_data = {
					sellerid: this.abotapi.get_sellerid(),
					roomid: that.current_roomid,
					will_shutdown: that.zhibo_status

				}

				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if (userInfo && userInfo.userid) {
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				}
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url +
						'/openapi/LiveRoomV2Data/mediamtx_update_live_room',
					method: 'post',
					data: post_data,
				})



			},
			switchCamera: function() {
				this.live_pusher_context.switchCamera({

					success: a => {
						console.log('livePusher.switchCamera:' + JSON.stringify(a));
					}
				});
			},
			startPreview: function() {
				this.live_pusher_context.startPreview({
					success: a => {
						console.log('livePusher.startPreview:' + JSON.stringify(a));
					}
				});
			},
			stopPreview: function() {
				this.live_pusher_context.stopPreview({
					success: a => {
						console.log('livePusher.stopPreview:' + JSON.stringify(a));
					}
				});
			},
			// 输入框改变（没有接口可以忽略，这里就是发送请求时起一个直播间的名字）
			changeInput: function(e, name) {
				this.form[name] = e.detail.value;
			},
			videoErrorCallback: function(e) {
				console.log('e===', e);
				// uni.showModal({
				// 	content: '该用户没有直播',
				// 	showCancel: false
				// })
			},
			// 开始直播
			saveForm() {

				if (this.form_data.liveroomTitle == null || this.form_data.liveroomTitle == "") {
					return;
				}
				// 这里是我自己的测试请求，因为需要和vue数据同步，做一个开播关播的数据交互，大家如果用不到的话可以直接调用 this.start();
				getApp().$util.requestUrl(
					`/test/live/createLiveRecord?anchorId=2&liveroomTitle=${this.form_data.liveroomTitle}&equipmentType=${this.form_data.equipmentType}`
				).then(res => {
					console.log(res);
					if (res.status == 200) {
						this.start();

					}
				});

				this.startState = true;
				console.log('1111111111111111111');

				//请求接口mediamtx_authentication（提供用户身份验证），
				//网址：http://yanyubao.tseo.cn/openapi/VideoLiveData/mediamtx_authentication
				//参数：来自MediaMTX的请求
				this.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url +
						'/openapi/VideoLiveData/mediamtx_authentication',
					method: 'post',
					data: {
						//live_userid: userInfo.userid,
						//userid: userInfo.userid,
						//checkstr: userInfo.checkstr,
						//sellerid: this.abotapi.get_sellerid(),
					}


				})



				//更新直播间状态，看请求接口mediamtx_update_live_room
				//网址：http://yanyubao.tseo.cn/openapi/VideoLiveData/mediamtx_update_live_room
				//参数：sellerid，userid，checkstr，直播间ID
				//返回：直播间的URL

			},
			// 关闭直播
			downcast() {

				// 同样，用不到接口只简单测试，调用this.stop();
				// vue的工具类等调用是this.$util；
				// uniapp使用getApp().$util
				getApp().$util.requestUrl(`/test/live/downcast?anchorId=2`).then(res => {
					console.log(res)
					if (res.status == 200) {
						this.stop();
						this.startState = false;
					}
				});
			},



			scrollToBottom() {
				this.$nextTick(() => {
					uni.createSelectorQuery().in(this).select('#scroll-view-content').boundingClientRect((res) => {
						let top = res.height - this.scrollViewHeight;
						if (top > 0) {
							this.scrollTop = top;
						}
					}).exec()
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
						
						//that.live_player_title = res.data.data.live_player_title;
						that.live_pusher_title = res.data.data.live_pusher_title;
						that.navBarColor = res.data.data.live_room_bg_color;
						that.live_room_font_color = res.data.data.live_room_font_color;
						that.live_room_v2_disable_status = res.data.data.live_room_v2_disable_status;
						
						
						console.log('导航栏背景色:',that.navBarColor);
						console.log('直播间标题',that.live_pusher_title);
						console.log('直播间标题字体颜色',that.live_room_font_color);
						
						
						
						uni.setNavigationBarTitle({
						    title: that.live_pusher_title,
							
							
						});
						uni.setNavigationBarColor({
						     frontColor:that.live_room_font_color,   //字体颜色
						})
						
						
					}
				})
				
				
				
			},
			
			
			
			

			// 接受消息(筛选处理)
			// screenMsg(msg){
			//从长连接处转发给这个方法，进行筛选处理

			// 	switch (msg.type){
			// 		case 'text':
			// 			this.addTextMsg(msg);
			// 			break;
			// 		case 'voice':
			// 			this.addVoiceMsg(msg);
			// 			break;
			// 		case 'img':
			// 			this.addImgMsg(msg);
			// 			break;
			// 	}

			// },


			// 处理文字消息
			// addTextMsg(msg){


			// 	console
			// 	this.msgList.push(msg);

			// },
		}
	};
</script>
<style lang="scss">
	page {
		background-color: #333333 !important;
	}

	.button_btn {
		width: 750rpx;
		position: fixed;
		bottom: 20rpx;
		border: 0rpx;
		margin-top: 10rpx;
		z-index: 999;
		
	}

	.danmu-con {
		width: 750rpx;
		height: 200rpx;
		position: absolute;
		top: 1180rpx;
		overflow:scroll;
		//margin-block-end: 20rpx;
		//z-index: 9999999;

	}

	.uni-label {
		word-wrap: break-word;
		margin-left: 30rpx;
		margin-bottom: 10rpx;
		//position: absolute;
	}

	.uni-label-name {
		float: left;
		color: #027DB4;
		//position: absolute;


	}
	
	.beijing_background{
		position:absolute;
		left:0;
		right:0;
		top:0;
		bottom:0;
		background-size: 100% 100%;
	}

	.uni-label-content {
		//margin-bottom: 10rpx;
		//position: absolute;
		color: #ffffff;
	}

	.text-zhengwen {
		margin-left: 10rpx;
		color: #ffffff;

	}

	.mylivePusher {
		position: absolute;
		z-index: 100;
	}


	.livePusher8888 {
		// position: absolute;
		// width: 750rpx;
		// height:1334rpx;
		// z-index: 102;
	}

	.myView_yinliu {
		position: absolute;
		right: 20rpx;
		bottom: 180rpx;
		z-index: 101;
	}

	video::-webkit-media-controls {

		display: none !important;

	}

	.icon-shuaxin {
		background-image: url('https://yanyubao.tseo.cn/Tpl/static/live_v2/shuaxin.png');
		background-size: 70rpx 62rpx;
		background-position: 0rpx;
		background-repeat: no-repeat;
	}

	.icon-touxiang {
		height: 80rpx;
		background-image: url('https://yanyubao.tseo.cn/Tpl/static/live_v2/yonghutouxiang.png');
		background-size: 80rpx 80rpx;
		background-repeat: no-repeat;
	}

	.page-body-button {
		position: absolute;
		width: 85rpx;
		height: 70rpx;
		right: 50rpx;
		line-height: normal;
		background-color: #80FFFF;
		padding: 0;
		color: #EEEEEE;
		line-height: 50rpx;
		bottom: 50rpx;
		background-image: url('https://yanyubao.tseo.cn/Tpl/static/live_v2/fasong.png');
		background-size: 80rpx 80rpx;
		background-position: 4rpx;
		background-repeat: no-repeat;
		z-index: 99;
	}

	.page-body-button::after {
		border: none;

	}

	.uni-list-cell-db input {
		border: 1rpx solid #d0d0d0;
		height: 64rpx;
		margin: 0 auto;
		border-radius: 30rpx;
		line-height: 64rpx;
		padding-left: 30rpx;
		background-color: #e1e1e1;
		margin-top: 10rpx;
		position: fixed;
		z-index: 999;
	}

	.icon-shexiangtou {
		position: absolute;
		right: 30rpx;
		bottom: 150rpx;
		z-index: 1000;
	}
	yourelelment video::-webkit-media-controls-fullscreen-button {
	            display: none;
	        }
	
	
	
</style>