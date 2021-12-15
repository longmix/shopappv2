<template>
	<view>
		<view class="content" @touchstart="hideEmoji">
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView">
				<view class="row" v-for="(row,index) in my_msgList" :key="index" :id="'msg'+row.id">
					<!-- 系统消息 -->
					<block v-if="row.type == 'system'">
						<view class="system">
							<!-- 文字消息 -->
							<view v-if="row.msg.type == 'text'" class="bubble">{{ row.msg.content.text }}</view>
							<!-- 领取红包消息 -->
							<view v-if="row.msg.type == 'redEnvelope'" class="red-envelope">
								<image src="/static/img/red-envelope-chat.png"></image>
								{{ row.msg.content.text }}
							</view>
							<!-- 产品信息 -->
							<view v-if="row.msg.type=='product'" class="product">
								<image src="https://img.alicdn.com/imgextra/i1/1022655798/O1CN014niH5s1shWtdza5fQ_!!1022655798.jpg_430x430q90.jpg"></image>
								<view class="info">
									安卓 产品 优化 承接各种手机app应用需求 定制化服务
								</view>
								<view class="price">
									$238.00 <text>$526.00</text>
								</view>
								<button size="mini">发送给TA</button>
							</view>
								
							<!-- 会话时间 -->
							<view v-if="row.msg.type=='time'" class="time">
								{{row.msg.content.text}}
							</view>
						</view>
					</block>
					
					<block v-if="row.type == 'user'">
						<!-- 自己发出的消息 -->
						<view class="my" v-if="row.uid==myuid">
							<view class="left">
								<view v-if="row.msg.type=='text'" class="bubble">
									<rich-text :nodes="row.msg.content.text"></rich-text>
								</view>
								<view v-if="row.msg.type=='voice'" class="bubble voice" @tap="playVoice(row)" :class="playMsgid == row.id?'play':''">
									<view class="length">{{row.msg.length}}</view>
									<view class="icon my-voice"></view>
								</view>
								<view v-if="row.msg.type=='img'" class="bubble img" @tap="showPic(row)">
									<image :src="row.msg.content.text" :style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}"></image>
								</view>
							</view>
							<view class="right">
								<image :src="row.face"></image>
							</view>
						</view>
						<!-- 别人发出的消息 -->
						<view class="other" v-if="row.uid!=myuid">
							<view class="left">
								<image :src="row.face"></image>
							</view>
							<view class="right">
								<view class="username">
									<view class="name">{{row.username}}</view> <view class="time">{{row.time}}</view>
								</view>
								<view v-if="row.msg.type=='text'" class="bubble">
									<rich-text :nodes="row.msg.content.text"></rich-text>
								</view>
								<view v-if="row.msg.type=='voice'" class="bubble voice" @tap="playVoice(row)" :class="playMsgid == row.id?'play':''">
									<view class="icon other-voice"></view>
									<view class="length">{{row.msg.length}}</view>
								</view>
								<view v-if="row.msg.type=='img'" class="bubble img" @tap="showPic(row)">
									<image :src="row.msg.content.text" :style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}"></image>
								</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<!-- 表情栏 -->
		<view class="emoji-box" :class="showEmji" @touchmove.stop.prevent="discard">
			<swiper class="swiper" indicator-dots="true" duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="'https://yanyubao.tseo.cn/Tpl/static/emoji/'+em.url"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="showEmji" @touchmove.stop.prevent="discard">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- #ifndef H5 -->
			<view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'yuyin'" @tap="switchVoice"></view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="more" @tap="chooseImage">
				<view class="icon tupian"></view>
			</view>
			<!-- #endif -->
			<view class="textbox">
				<view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']" @touchstart="voiceBegin" @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">{{voiceTis}}</view>
				<view class="text-mode"  :class="isVoice?'hidden':''">
					<view class="box">
						<textarea auto-height="true" v-model="textMsg" id="textMsg" />
					</view>
					<view class="em" @tap="chooseEmoji">
						<view class="icon biaoqing"></view>
					</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="more" @tap="chooseImage">
				<view class="icon tupian"></view>
			</view>
			<!-- #endif -->
			<label for="textMsg">
			<view class="send" :class="isVoice?'hidden':''" @tap="sendText">
				<view class="btn">
					发送
				</view>
			</view>
			</label>
		</view>
		<!-- 录音效果(上滑取消) -->
		<view class="record" :class="recording?'':'hidden'">
			<view class="ing" :class="willStop?'hidden':''"><view class="icon luyin2" ></view></view>
			<view class="cancel" :class="willStop?'':'hidden'"><view class="icon chehui" ></view></view>
			<view class="tis" :class="willStop?'change':''">{{recordTis}}</view>
		</view>
	</view>
</template>

<script>
	import parameter from '@/common/parameter.js';
	
	
	export default {
		data() {
			return {
				//文字消息
				
				textMsg:'',
				//消息列表
				scrollAnimation:false,
				scrollTop:0,
				scrollToView:'',
				my_msgList:[],
				msgImgList:[],
				myuid:0,
				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER:uni.getRecorderManager(),
				// #endif
				isVoice:false,
				voiceTis:'按住 说话',
				recordTis:"手指上滑 取消发送",
				recording:false,
				willStop:false,
				initPoint:{identifier:0,Y:0},
				recordTimer:null,
				recordLength:0,
				//播放语音相关参数
				AUDIO:uni.createInnerAudioContext(),
				playMsgid:null,
				VoiceTimer:null,
				//表情定义
				showEmji:'',
				friendInfo: '',
				cache_msglist: [],
				taskUserInfo: {
					userName: '',
					headImg: ''
				},
				pageOn: false,
				emojiList:parameter.emojiList,
				//表情图片图床名称
				onlineEmoji:{"100.gif":"AbNQgA.gif","101.gif":"AbN3ut.gif","102.gif":"AbNM3d.gif","103.gif":"AbN8DP.gif","104.gif":"AbNljI.gif","105.gif":"AbNtUS.gif","106.gif":"AbNGHf.gif","107.gif":"AbNYE8.gif","108.gif":"AbNaCQ.gif","109.gif":"AbNN4g.gif","110.gif":"AbN0vn.gif","111.gif":"AbNd3j.gif","112.gif":"AbNsbV.gif","113.gif":"AbNwgs.gif","114.gif":"AbNrD0.gif","115.gif":"AbNDuq.gif","116.gif":"AbNg5F.gif","117.gif":"AbN6ET.gif","118.gif":"AbNcUU.gif","119.gif":"AbNRC4.gif","120.gif":"AbNhvR.gif","121.gif":"AbNf29.gif","122.gif":"AbNW8J.gif","123.gif":"AbNob6.gif","124.gif":"AbN5K1.gif","125.gif":"AbNHUO.gif","126.gif":"AbNIDx.gif","127.gif":"AbN7VK.gif","128.gif":"AbNb5D.gif","129.gif":"AbNX2d.gif","130.gif":"AbNLPe.gif","131.gif":"AbNjxA.gif","132.gif":"AbNO8H.gif","133.gif":"AbNxKI.gif","134.gif":"AbNzrt.gif","135.gif":"AbU9Vf.gif","136.gif":"AbUSqP.gif","137.gif":"AbUCa8.gif","138.gif":"AbUkGQ.gif","139.gif":"AbUFPg.gif","140.gif":"AbUPIS.gif","141.gif":"AbUZMn.gif","142.gif":"AbUExs.gif","143.gif":"AbUA2j.gif","144.gif":"AbUMIU.gif","145.gif":"AbUerq.gif","146.gif":"AbUKaT.gif","147.gif":"AbUmq0.gif","148.gif":"AbUuZV.gif","149.gif":"AbUliF.gif","150.gif":"AbU1G4.gif","151.gif":"AbU8z9.gif","152.gif":"AbU3RJ.gif","153.gif":"AbUYs1.gif","154.gif":"AbUJMR.gif","155.gif":"AbUadK.gif","156.gif":"AbUtqx.gif","157.gif":"AbUUZ6.gif","158.gif":"AbUBJe.gif","159.gif":"AbUdIO.gif","160.gif":"AbU0iD.gif","161.gif":"AbUrzd.gif","162.gif":"AbUDRH.gif","163.gif":"AbUyQA.gif","164.gif":"AbUWo8.gif","165.gif":"AbU6sI.gif","166.gif":"AbU2eP.gif","167.gif":"AbUcLt.gif","168.gif":"AbU4Jg.gif","169.gif":"AbURdf.gif","170.gif":"AbUhFS.gif","171.gif":"AbU5WQ.gif","172.gif":"AbULwV.gif","173.gif":"AbUIzj.gif","174.gif":"AbUTQs.gif","175.gif":"AbU7yn.gif","176.gif":"AbUqe0.gif","177.gif":"AbUHLq.gif","178.gif":"AbUOoT.gif","179.gif":"AbUvYF.gif","180.gif":"AbUjFU.gif","181.gif":"AbaSSJ.gif","182.gif":"AbUxW4.gif","183.gif":"AbaCO1.gif","184.gif":"Abapl9.gif","185.gif":"Aba9yR.gif","186.gif":"AbaFw6.gif","187.gif":"Abaiex.gif","188.gif":"AbakTK.gif","189.gif":"AbaZfe.png","190.gif":"AbaEFO.gif","191.gif":"AbaVYD.gif","192.gif":"AbamSH.gif","193.gif":"AbaKOI.gif","194.gif":"Abanld.gif","195.gif":"Abau6A.gif","196.gif":"AbaQmt.gif","197.gif":"Abal0P.gif","198.gif":"AbatpQ.gif","199.gif":"Aba1Tf.gif","200.png":"Aba8k8.png","201.png":"AbaGtS.png","202.png":"AbaJfg.png","203.png":"AbaNlj.png","204.png":"Abawmq.png","205.png":"AbaU6s.png","206.png":"AbaaXn.png","207.png":"Aba000.png","208.png":"AbarkT.png","209.png":"AbastU.png","210.png":"AbaB7V.png","211.png":"Abafn1.png","212.png":"Abacp4.png","213.png":"AbayhF.png","214.png":"Abag1J.png","215.png":"Aba2c9.png","216.png":"AbaRXR.png","217.png":"Aba476.png","218.png":"Abah0x.png","219.png":"Abdg58.png"}
			};
		},
		onLoad(option) {
			var that = this;
			var userInfo = that.abotapi.get_user_info();
			console.log('options',option)
			this.abotapi.set_option_list_str(this, this.abotapi.getColor());
			// this.getMsgList();
			//语音自然播放结束
			this.AUDIO.onEnded((res)=>{
				this.playMsgid=null;
			});
			// #ifndef H5
			//录音开始事件
			this.RECORDER.onStart((e)=>{
				this.recordBegin(e);
			})
			//录音结束事件
			this.RECORDER.onStop((e)=>{
				this.recordEnd(e);
			})
			// #endif
			
			this.myuid = userInfo.userid;
			this.userid = option.userid;
			this.sellerid = option.sellerid;
			this.chat_type = option.type;
			
			uni.setNavigationBarTitle({
				title: option.name
			});
		
			
			that.abotapi.abotRequest({
				  url: that.abotapi.globalData.yanyubao_server_url + '/openapi/BuddyData/buddy_action',
				  data: {
					action: 'user_detail',
					userid01: userInfo.userid,
					userid02: that.userid,
					sellerid: that.abotapi.globalData.default_sellerid					
				  },
				  header: {
					"Content-Type": "application/x-www-form-urlencoded"
				  },
				  method: "POST",
				  success: function (res) {
					   
					var	data = res.data;
					if(data.code == 1){
						
						that.friendInfo = data.data
						 
						 that.taskUserInfo.userName = that.friendInfo.nickname;
						 that.taskUserInfo.headImg = that.friendInfo.headimgurl;
					 }
					
				  }
			})
			
			
			
			that.abotapi.current_chat_gui = this;	//赋值句柄，用于接收消息
			that.abotapi.current_chat_handle = this;
			that.abotapi.current_chat_page = '/pages/msg/chat/chat';
			
			
			
			
			
			
			
		},
		
		onShow(){
			var that = this;
			that.pageOn = true;
			var userInfo = that.abotapi.get_user_info();
			if(that.userid){
				var cache_msglist = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid);			
				console.log('cache_msglist========2',cache_msglist)
			}
			if(that.sellerid){
				var cache_msglist = uni.getStorageSync('cache_msglist_sellerid_');	
				console.log('cache_msglist========4',cache_msglist)
			}
			if(that.groupid){
				var cache_msglist = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid);
				console.log('cache_msglist========3',cache_msglist)
			}
			
			console.log('cache_msglist========0',cache_msglist)
			
			that.cache_msglist = cache_msglist ? cache_msglist : [];
			
			
			var data_params = {
				action: 'unread',
				sellerid: that.abotapi.globalData.default_sellerid,
			}
						
			if(!that.groupid){
				data_params.userid01 = that.userid;
				data_params.userid02 = userInfo.userid;
				data_params.chat_type = 0;
			} else {
				data_params.userid01 = that.groupid;
				data_params.userid02 = userInfo.userid;
				data_params.chat_type = 4;
			}
			
			that.abotapi.abotRequest({
			     url: that.abotapi.globalData.yanyubao_server_url + '/openapi/ChatData/chat_history',
			     data: data_params,
			     header: {
			       "Content-Type": "application/x-www-form-urlencoded"
			     },
			     method: "POST",
			     success: function (res) {
					  var data = res.data;
					  if(data.code == 1){
						  var lastMsgList = data.data;
						  if(lastMsgList.length>0){
							  for(var i=0; i<lastMsgList.length; i++){
																	  
								that.cache_msglist.push(JSON.parse(lastMsgList[i].chat_msg));
								
								console.log('向本地缓存的消息记录中追加（http request /openapi/ChatData/chat_history）：', lastMsgList[i].chat_msg);
											  
							   }
																						
							if(that.chat_type == 0){
								uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid, that.cache_msglist);
							}else{
								uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid, that.cache_msglist);
							}
							
							  
							setTimeout(function() {
								
					
								that.getMsgList();
								
								// that.getMsgList(option.sesstion);
							}, 100); 
							  
							  var data_params = {
								action: 'control',
								control: 'read',
								sellerid: that.abotapi.globalData.default_sellerid,
							  }
								
							  if(!that.groupid){
								data_params.userid01 = userInfo.userid;
								data_params.userid02 = that.userid;
								data_params.chat_type = 0;
							  } else {
								data_params.userid01 =  userInfo.userid;
								data_params.userid02 = that.groupid;
								data_params.chat_type = 4;
							  }
							  
							  
							  uni.request({
									 url: that.abotapi.globalData.yanyubao_server_url + '/openapi/ChatData/chat_history',
									 data: data_params,
									 header: {
									   "Content-Type": "application/x-www-form-urlencoded"
									 },
									 method: "POST",
									 success: function (res) {
									   
									}
						})
							  
					}
				  }else{
					
					  setTimeout(function() {
					
						that.getMsgList();
			
					  }, 100); 
				  }					
			     }
			   })
		},
		onHide(){
			this.pageOn = false;
		},
		methods:{
			getMsgList(){
				// 消息列表
				// let list = [
				// 	{id:0,uid:0,username:"大黑哥",face:"",time:"12:56",type:"text",msg:{content:"为什么温度会相差那么大？"}},
				// 	{id:1,uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg",time:"12:57",type:"text",msg:{content:"这个是有偏差的，两个温度相差十几二十度是很正常的，如果相差五十度，那即是质量问题了。"}},
				// 	{id:2,uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg",time:"12:59",type:"voice",msg:{url:"https://yanyubao.tseo.cn/Tpl/static/voice/3.aac",length:"00:06"}},
				// 	{id:3,uid:0,username:"大黑哥",face:"",time:"13:05",type:"voice",msg:{url:"https://yanyubao.tseo.cn/Tpl/static/voice/2.mp3",length:"00:06"}},
				// 	{id:4,uid:0,username:"大黑哥",face:"",time:"13:05",type:"img",msg:{url:"/static/img/goods/p10.jpg",w:200,h:200}},
				// 	{id:5,uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg",time:"12:59",type:"img",msg:{url:"/static/img/q.jpg",w:1920,h:1080}}
				// ]
				
				let ylist = this.cache_msglist;
				
				console.log('cache_msglist========1',ylist)
				
				var list = [];
				// 获取消息中的图片,并处理显示尺寸
				// for(let i=0;i<list.length;i++){
				// 	if(list[i].type=='img'){
				// 		list[i] = this.setPicSize(list[i]);
				// 		console.log("list[i]: " + JSON.stringify(list[i]));
				// 		this.msgImgList.push(list[i].msg.url);
				// 	}
				// }
				
				for (var i = 0; i < ylist.length; i++) {
					list.push(ylist[i]);
				}
				
				
				for (var i = 0; i < list.length; i++) {
					list[i].msg.id = i;
				}
				
				// 获取消息中的图片,并处理显示尺寸
				for(let i=0;i<list.length;i++){
					if(list[i].type=='img'){
						list[i] = this.setPicSize(list[i]);
						console.log("list[i]: " + JSON.stringify(list[i]));
						this.msgImgList.push(list[i].msg.url);
					}
				}
				
				
				
				
				
				this.my_msgList = list;
				
				
				console.log('my_msgList',this.my_msgList)
				
				// 滚动到底部
				this.$nextTick(function() {
					this.scrollTop = 9999;
					this.scrollAnimation = true;
				});
			},
			
			
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content) {
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350); //350是定义消息图片最大宽度
				let maxH = uni.upx2px(350); //350是定义消息图片最大高度
				console.log('maxW==',maxW);
				console.log('maxH==',maxH);
				if (content.w > maxW || content.h > maxH) {
					let scale = content.w / content.h;
					content.w = scale > 1 ? maxW : maxH * scale;
					content.h = scale > 1 ? maxW / scale : maxH;
				}
				return content;
			},
			
			
			// 接受消息(筛选处理)
			screenMsg(msg){
				//从长连接处转发给这个方法，进行筛选处理
				if(msg.uid!=this.myuid){
					uni.vibrateLong();
				}
				if (msg.type == 'system') {
					// 系统消息
					switch (msg.msg.type) {
						case 'text':
							this.addSystemTextMsg(msg);
							break;
						case 'redEnvelope':
							this.addSystemRedEnvelopeMsg(msg);
							break;
					}
				} else if (msg.type == 'user') {
				
					switch (msg.msg.type){
						case 'text':
							this.addTextMsg(msg);
							break;
						case 'voice':
							this.addVoiceMsg(msg);
							break;
						case 'img':
							this.addImgMsg(msg);
							break;
					}
				}
				this.$nextTick(function() {
					this.scrollToView = 'msg'+msg.id
				});
			},
			// 选择表情
			chooseEmoji(){
				this.showEmji = this.showEmji=='showEmoji'?'hideEmoji':'showEmoji';
			},
			// 隐藏表情
			hideEmoji(){
				this.showEmji = this.showEmji=='showEmoji'?'hideEmoji':'';
			},
			//添加表情
			addEmoji(em){
				this.textMsg+=em.alt;
			},
			// 发送文字消息
			sendText(){
				this.hideEmoji();
				if(!this.textMsg){
					return;
				}
				let content = this.replaceEmoji(this.textMsg);
				let msg = {text:content}
				this.sendMsg(msg,'text');
				this.textMsg = '';
			},
			//替换表情符号为图片
			replaceEmoji(str){
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g,(item, index)=>{
					console.log("item: " + item);
					for(let i=0;i<this.emojiList.length;i++){
						let row = this.emojiList[i];
						for(let j=0;j<row.length;j++){
							let EM = row[j];
							if(EM.alt==item){
								
								let onlinePath = 'https://yanyubao.tseo.cn/Tpl/static/emoji/';
								let imgstr = '<img style="width:24px;" src="' + onlinePath + EM.url + '">';
								
								return imgstr;
								//在线表情路径，图文混排必须使用网络路径
								// let onlinePath = 'https://s2.ax1x.com/2019/04/12/'
								// let imgstr = '<img src="'+onlinePath+this.onlineEmoji[EM.url]+'">';
								// console.log("imgstr: " + imgstr);
								// return imgstr;
							}
						}
					}
				});
				return '<div style="display: flex;align-items: center;">'+replacedStr+'</div>';
			},
			// 选择图片发送
			chooseImage(){
				this.hideEmoji();
				var that = this;
				uni.chooseImage({
				 // count: 1, // 默认9
				  sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				  success: function (res) {		
					console.log(res,'ddd')								
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					var tempFilePaths = res.tempFilePaths;
					for(let i=0;i<tempFilePaths.length;i++){
						uni.uploadFile({
						  url: that.abotapi.globalData.yanyubao_server_url + '/Yanyubao/ShopApp/upload_image_file_without_user', 				 
						  filePath: tempFilePaths[i],
						  method: 'post',
						  header: {
							// "Content-Type": "multipart/form-data",
							'elem': '#up-image',            
							'accept': 'application/json',
							'exts': 'jpg|jpeg|png|gif'
						  },
						  name: "file",
						  formData: {
							sellerid: that.abotapi.globalData.default_sellerid,
						  },
						  success: (res) => {
							var data = JSON.parse(res.data);
							if(data.code != 1){
							  uni.showToast({
								title: data.msg,
								duration: 2000
							  });
				
							  return;
							}
						
							//msg为图片地址
							var img_url = data.img_url;
							let msg = {
									text: img_url
								};
								console.log('ceshi---',img_url);
								uni.getImageInfo({  
									src: img_url,  
									success: (image) => {  
										console.log('image====',image)
										msg.w = image.width;
										msg.h = image.height;
										that.sendMsg(msg, 'img')
									}							  
								}); 						
								
							
							
						  },
						  fail: function (res) {
							  
							console.log('fail');
										
						  }
						})
					  }
				  }
				})
				
							
				// uni.chooseImage({
				// 	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				// 	success: (res)=>{
				// 		for(let i=0;i<res.tempFilePaths.length;i++){
				// 			uni.getImageInfo({
				// 				src: res.tempFilePaths[i],
				// 				success: (image)=>{
				// 					console.log(image.width);
				// 					console.log(image.height);
				// 					let msg = {url:res.tempFilePaths[i],w:image.width,h:image.height};
				// 					this.sendMsg(msg,'img');
				// 				}
				// 			});
				// 		}
				// 	}
				// }); 
			},
			// 发送消息
			sendMsg(content,type){
				var userInfo = this.abotapi.get_user_info();
				var userAcountInfo = this.abotapi.get_user_account_info();
				//实际应用中，此处应该提交长连接，模板仅做本地处理。
				var nowDate = new Date();
				// let lastid = this.my_msgList[this.my_msgList.length-1].id;
				let lastid = this.my_msgList.length > 0 ? this.my_msgList[this.my_msgList.length - 1].id : this.my_msgList.length;
				
				
				lastid++;
				let msg = { 
					id:lastid,
					uid:userInfo.userid,
					username:userAcountInfo.nickname,
					face:userAcountInfo.headimgurl,
					time:nowDate.getHours()+":"+nowDate.getMinutes(),
					type:'user', 
					msg:{
						content: content,
						type: type
					},
					
				 };
						 
				console.log('msg',msg)
				// this.screenMsg(msg);
				this.send_text_to_service(msg, type)
				// 定时器模拟对方回复,三秒
				// setTimeout(()=>{
				// 	lastid = this.my_msgList[this.my_msgList.length-1].id;
				// 	lastid++;
				// 	msg = {id:lastid,uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg",time:nowDate.getHours()+":"+nowDate.getMinutes(),type:type,msg:content};
				// 	this.screenMsg(msg);
				// },3000)
			},
			
			// 处理文字消息
			addTextMsg(msg){
				var userInfo = this.abotapi.get_user_info();
				console.log('1111111msg',msg)
				this.my_msgList.push(msg);
				
				if(this.chat_type==0){
					uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+this.userid, this.my_msgList);	
					console.log('test===================0',uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+this.userid))	
					
				}else{
					uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+this.groupid, this.my_msgList);	
					console.log('test===================1',uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+this.userid))
				}
			},
			// 处理语音消息
			addVoiceMsg(msg){
				this.my_msgList.push(msg);
			},
			// 处理图片消息
			addImgMsg(msg){
				var userInfo = this.abotapi.get_user_info();
				console.log('msg=====',msg)
				msg.msg.content = this.setPicSize(msg.msg.content);
				this.msgImgList.push(msg.msg.content.text);
				this.my_msgList.push(msg);
				
				if(this.chat_type==0){
					uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+this.userid, this.my_msgList);	
					console.log('test===================0',uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+this.userid))	
					
				}else{
					uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+this.groupid, this.my_msgList);	
					console.log('test===================1',uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+this.userid))
				}
			},
			// 添加系统文字消息到列表
			addSystemTextMsg(msg) {
				var that = this;
				
				var userInfo = that.abotapi.get_user_info();
				
				that.my_msgList.push(msg);
				
				
			},
			
			// 预览图片
			showPic(row){
				uni.previewImage({
					indicator:"none",
					current:row.msg.url,
					urls: this.msgImgList
				});
			},
			// 播放语音
			playVoice(msg){
				this.playMsgid=msg.id;
				this.AUDIO.src = msg.msg.url;
				console.log("msg.msg.url: " + msg.msg.url);
                this.AUDIO.play();
			},
			// 录音开始
			voiceBegin(e){
				if(e.touches.length>1){
					return ;
				}
				this.initPoint.Y = e.touches[0].clientY;
				this.initPoint.identifier = e.touches[0].identifier;
				this.RECORDER.start({format:"aac"});//录音开始,
			},
			//录音开始UI效果
			recordBegin(e){
				this.recording = true;
				this.voiceTis='松开 结束';
				this.recordLength = 0;
				this.recordTimer = setInterval(()=>{
					this.recordLength++;
				},1000)
			},
			// 录音被打断
			voiceCancel(){
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.willStop = true;//不发送录音
				this.RECORDER.stop();//录音结束
			},
			// 录音中(判断是否触发上滑取消发送)
			voiceIng(e){
				if(!this.recording){
					return;
				}
				let touche = e.touches[0];
				//上滑一个导航栏的高度触发上滑取消发送
				if(this.initPoint.Y - touche.clientY>=uni.upx2px(100)){
					this.willStop = true;
					this.recordTis = '松开手指 取消发送'
				}else{
					this.willStop = false;
					this.recordTis = '手指上滑 取消发送'
				}
			},
			// 结束录音
			voiceEnd(e){
				if(!this.recording){
					return;
				}
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.RECORDER.stop();//录音结束
			},
			
			//录音结束(回调文件)
			recordEnd(e){
				var that = this;
				clearInterval(this.recordTimer);
				if(!this.willStop){
					// plus.io.resolveLocalFileSystemURL( e.tempFilePath, function( entry ) {
					// 	// 可通过entry对象操作test.html文件 
					// 	entry.file( function(file){
					// 		console.log(file.size + '--' + file.name);
					// 	} );
					// }, function ( e ) {
					// 	alert( "Resolve file URL failed: " + e.message );
					// } );
					console.log("e: " + JSON.stringify(e));
					
					
					uni.uploadFile({
					    url: that.abotapi.globalData.yanyubao_server_url + '/Yanyubao/ShopApp/upload_image_file_without_user',
					    filePath: e.tempFilePath,
					    name: 'file',
					    header: {
					      contentType: "multipart/form-data",//按需求增加
					      'elem': '#up-image',
					      'accept': 'application/json',
					      'exts': 'jpg|jpeg|png|gif|mp3'
					    },
					    formData: {
					      //supplierid: app.globalData.current_supplierid,
					      sellerid: that.abotapi.globalData.default_sellerid,
					    },
					    success: function (res) {
					      var data = JSON.parse(res.data);
					      if (data.code != 1) {
					        uni.showToast({
					          title: data.msg,
					          duration: 2000
					        });
							return;
						}				
							 //msg为语音地址
							var img_url = data.img_url;	
							
							let msg = {
								length:0,
								url:img_url
							}
							let min = parseInt(this.recordLength/60);
							let sec = this.recordLength%60;
							min = min<10?'0'+min:min;
							sec = sec<10?'0'+sec:sec;
							msg.length = min+':'+sec;
													
							that.sendMsg(msg, 'voice');
					     }
						
					})
					
					
					// this.sendMsg(msg,'voice');
				}else{
					console.log('取消发送录音');
				}
				this.willStop = false;
			},
			// 切换语音/文字输入
			switchVoice(){
				this.hideEmoji();
				this.isVoice = this.isVoice?false:true;
			},
			discard(){
				return;
			},
			
			getNewMsg: function(msg){
				var that = this;	
				
				console.log('getNewMsg=====',msg)
				console.log('getNewMsg ===>>> that.pageOn==>>',that.pageOn)
				
			    		
				var userInfo = that.abotapi.get_user_info();
				
				if(!that.pageOn){
					console.log('getNewMsg ===>>> that.pageOn==>> 界面关闭了，不显示。');
					
					return;
				}
				
				var is_not_self_msg = true;										
				
				if(is_not_self_msg && msg.uid == that.userid){
					console.log('getNewMsg ===>>> 是自己的消息，准备显示，并清除服务器上未读消息数量。 msg.uid ==>> '+ msg.uid)
					
					that.screenMsg(msg);
					
					
					var data_params = {
						   action: 'clear_couter_unread',
						   sellerid: that.abotapi.globalData.default_sellerid,
					}
					
					if(!that.groupid){
						data_params.userid01 = that.userid;
						data_params.userid02 = userInfo.userid;
						data_params.chat_type = 0;
					} else {
						data_params.userid01 = that.groupid;
						data_params.userid02 = userInfo.userid;
						data_params.chat_type = 4;
					}
					
					uni.request({
						 url: that.abotapi.globalData.yanyubao_server_url + '/openapi/ChatData/chat_history',
						 data:data_params,
						 header: {
						   "Content-Type": "application/x-www-form-urlencoded"
						 },
						 method: "POST",
						 success: function (res) {
						   console.log('ddd', res);
				
						 }
					});
				}
						
			},
			
			send_text_to_service:function(msg, type){
				var userInfo = this.abotapi.get_user_info();
				var userAcountInfo = this.abotapi.get_user_account_info();
				console.log('myuid======00', this.myuid);
				
				console.log('msg====0',msg)
						
				var content = encodeURIComponent(JSON.stringify(msg))
				
				var that = this;
				
				var data_params = {
					   action: 'add',
				       sellerid: that.abotapi.globalData.default_sellerid,
					   chat_msg: content,
					   from: 'shopappv2'
					}
				
				if(!that.groupid){
					data_params.userid01 = userInfo.userid;
					data_params.userid02 = that.userid;
					data_params.chat_type = 0;
				} else {
					data_params.userid01 = userInfo.userid;
					data_params.userid02 = that.groupid;
					data_params.chat_type = 4;
				}
				
				// 发送消息
				that.screenMsg(msg);
				
				
				that.abotapi.abotRequest({
				     url: that.abotapi.globalData.yanyubao_server_url + '/openapi/ChatData/chat_history',
				     data:data_params,
				    
				     success: function (res) {
				       console.log('chat_history=====add', res);
				      
					  if(res.data.code == 0){
						  uni.showToast({
						  	title: res.data.msg,
							duration: 2000,
							icon: 'none'
						  })
					  }else{
						
					  }
					 
					  
				     }
				   })
			},
		}
	}
</script>

<style lang="scss">
page{
	background-color: #e5e5e5;
}

	.icon {
		font-size:56upx;
		color: #333;
	}
.hidden{
	display: none !important;
}
@keyframes showEM {
	0% {transform: translateY(0);}
	100% {transform: translateY(-42vw);}
}
@keyframes hideEM {
	0% {transform: translateY(-42vw);}
	100% {transform: translateY(0);}
}
.emoji-box{
	&.hideEmoji{animation: hideEM .15s linear both;}
	&.showEmoji{animation: showEM .15s linear both;}
	width: 96%;
	height: 42vw;
	padding: 20upx 2%;
	background-color: #f3f3f3;
	border-top: solid 1upx #ddd;
	position: fixed;
	z-index: 20;
	top: 100%;
	.swiper{
		swiper-item{
			display: flex;
			flex-wrap: wrap;
			view{
				width: 12vw;
				height: 12vw;
				display: flex;
				justify-content: center;
				image{
					width: 60%;
				}
			}
		}
	}
}
.input-box{
	&.hideEmoji{animation: hideEM .15s linear both;}
	&.showEmoji{animation: showEM .15s linear both;}
	width: 98%;
	min-height: 100upx;
	padding: 0 1%;
	background-color: #f2f2f2;
	display: flex;
	position: fixed;
	z-index: 20;
	bottom: 0;
	.voice,.more{
		flex-shrink: 0;
		width: 90upx;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.send{
		//H5发送按钮左边距
		/* #ifdef H5 */
		margin-left: 20upx;
		/* #endif */
		flex-shrink: 0;
		width: 100upx;
		height: 100upx;
		display: flex;
		align-items: center;
		.btn{
			width: 90upx;
			height: 56upx;
			display: flex;
			justify-content: center;
			align-items: center;
			background:linear-gradient(to right,#f09b37,#eb632c);
			color: #fff;
			border-radius: 6upx;
			font-size: 24upx;
		}
	}
	.textbox{
		width: 100%;
		min-height: 70upx;
		margin-top: 15upx;
		.voice-mode{
			width: calc(100% - 2upx);
			height: 68upx;
			border-radius: 70upx;
			border:solid 1upx #cdcdcd;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			background-color: #fff;
			color: #555;
			&.recording{
				background-color: #e5e5e5;
			}
		}
		.text-mode{
			width: 100%;
			min-height: 70upx;
			display: flex;
			background-color: #fff;
			border-radius: 40upx;
			.box{
				width: 100%;
				padding-left: 30upx;
				min-height: 70upx;
				display: flex;
				align-items: center;
				textarea{
					width: 100%;
				}
			}
			.em{
				flex-shrink: 0;
				width: 80upx;
				height: 70upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
}
.record{
	width: 40vw;
	height: 40vw;
	position: fixed;
	top: 55%;
	left: 30%;
	background-color: rgba(0,0,0,.6);
	border-radius: 20upx;
	.ing{
		width: 100%;
		height: 30vw;
		display: flex;
		justify-content: center;
		align-items: center;
		@keyframes volatility {
			0% {background-position: 0% 130%;}
			20% {background-position: 0% 150%;}
			30% {background-position: 0% 155%;}
			40% {background-position: 0% 150%;}
			50% {background-position: 0% 145%;}
			70% {background-position: 0% 150%;}
			80% {background-position: 0% 155%;}
			90% {background-position: 0% 140%;}
			100% {background-position: 0% 135%;}
		}
		.icon{
			background-image:linear-gradient(to bottom,#f09b37,#fff 50%); 
			background-size:100% 200%;
			animation: volatility 1.5s ease-in-out -1.5s infinite alternate;
			-webkit-background-clip:text; 
			-webkit-text-fill-color:transparent; 
			font-size: 150upx;
			color: #f09b37;
		}
	}
	.cancel{
		width: 100%;
		height: 30vw;
		display: flex;
		justify-content: center;
		align-items: center;
		.icon{
			color: #fff;
			font-size: 150upx;
		}
	}
	.tis{
		width: 100%;
		height: 10vw;
		display: flex;
		justify-content: center;
		font-size: 28upx;
		color: #fff;
		&.change{
			color: #f09b37;
		}
	}
}
.content{
	width: 100%;
	.msg-list{
		width: 96%;
		padding: 0 2%;
		position: absolute;
		top: 0;
		bottom: 100upx;
		.row{
			&:first-child{
				margin-top: 20upx;
			}
			padding: 20upx 0;
			.my .left,.other .right{
				width: 100%;
				display: flex;
				.bubble{
					max-width: 70%;
					min-height: 50upx;
					border-radius: 10upx;
					padding: 15upx 20upx;
					display: flex;
					align-items: center;
					font-size: 32upx;
					word-break: break-word;
					&.img{
						background-color: transparent;
						padding:0;
						overflow: hidden;
						image{
							max-width: 350upx;
							max-height: 350upx;
						}
					}
					&.voice{
						.icon{
							font-size: 40upx;
							display: flex;
							align-items: center;
						}
						.icon:after
						{
							content:" ";
							width: 53upx;
							height: 53upx;
							border-radius: 100%;
							position: absolute;
							box-sizing: border-box;
						}
						.length{
							font-size: 28upx;
						}
					}
				}
			}
			.my .right,.other .left{
				flex-shrink: 0;
				width: 80upx;
				height: 80upx;
				image{
					width: 80upx;
					height: 80upx;
					border-radius: 10upx;
				}
			}
			.my{
				width: 100%;
				display: flex;
				justify-content: flex-end;
				.left{
					min-height: 80upx;
					
					align-items: center;
					justify-content: flex-end;
					.bubble{
						background-color: #f06c7a;
						color: #fff;
						&.voice{
							.icon{
								color: #fff;
							}
							.length{
								margin-right: 20upx;
							}
						}
						&.play{
							@keyframes my-play {
								0% {
									transform: translateX(80%);
								}
								100% {
									transform: translateX(0%);
								}
							}
							.icon:after
							{
								border-left: solid 10upx rgba(240,108,122,.5);
								animation: my-play 1s linear infinite;
							}
						}
					}
				}
				.right{
					margin-left: 15upx;
				}
			}
			.other{
				width: 100%;
				display: flex;
				.left{
					margin-right: 15upx;
				}
				.right{
					flex-wrap: wrap;
					.username{
						width: 100%;
						height: 45upx;
						font-size: 24upx;
						color: #999;
						display: flex;
						.name{
							margin-right: 50upx;
						}
					}
					.bubble{
						background-color: #fff;
						color: #333;
						&.voice{
							.icon{
								color: #333;
								
							}
							.length{
								margin-left: 20upx;
							}
						}
						&.play{
							@keyframes other-play {
								0% {
									transform: translateX(-80%);
								}
								100% {
									transform: translateX(0%);
								}
							}
							.icon:after
							{
								border-right: solid 10upx rgba(255,255,255,.8);
								
								animation: other-play 1s linear infinite;
							}
						}
					}
				}
			}
		}
	}
}
</style>