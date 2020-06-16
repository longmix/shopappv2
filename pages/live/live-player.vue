<template>
	<view>
	        <view class="uni-padding-wrap uni-common-mt">
	            <view>
	                <video id="myVideo" :src="player_url" :style="{height: 400 + 'px',width: windowWidth + 'px'}"
	                    @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
					<!-- <video id="myVideo" src="rtmp://live.tengyumall.com/live001/tengyumall" :style="{height: windowHeight + 'px',width: windowWidth + 'px'}"
					    @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>	 -->
	            </view>
	            
				<view class="danmu-con">
					<view class="uni-list uni-common-mt">
						<view class="uni-list-cell">
							<view>
								<view v-for="(item, index) in msgList" class="uni-label">{{item.name}}: {{item.content}}</view>
							</view>
							<view class="uni-list-cell-db">
								<input v-model="danmuValue" class="uni-input" type="text" placeholder="输入内容" />
								
								<button @click="sendMsg" class="page-body-button">发送</button>
								
							</view>
						</view>
					</view>			
				</view>
				
				<view  class="prdoucts" >
					
				<navigator :url="'/pages/product/detail?productid=' + item.productid" v-for="(item, index) in product_list">
					<image :src="item.picture" mode="widthFix"></image>
					{{item.brief}}
				</navigator>
				</view>
				<!-- #ifndef MP-ALIPAY -->
	            <!-- #endif -->
	        </view>
	    </view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
				danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				],
				danmuValue: '',
				windowHeight: '',
				player_url: '',
				msgList: [
							{'name':'111','content': '1111'},
							{'name':'222','content':'2222'},
							{'name':'333','content':'3333'},
							{'name':'444','content':'4444'},
							{'name':'555','content':'5555'},
						],
				roomid: '',
				product_list: '',
				live_userid:'',
				
			}
		},
		onLoad(options){
			var that = this;
			let userInfo = this.abotapi.get_user_info();
			//渲染头部和文字颜色
			this.abotapi.set_shop_option_data(this, function(that, option_data){
				console.log('option_data',option_data);
			});
			
			//请求直播信息
			let live_userid = options.live_userid;
			
			this.abotapi.abotRequest({
			    url: this.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/VideoLiveData/get_live_player_and_product_list',
			    method: 'post',
			    data: {
					sellerid:this.abotapi.get_sellerid(),
					live_userid:live_userid,
					userid:userInfo.userid,
					checkstr: userInfo.checkstr,
				},
			    success: function (res) {
					
					console.log('第一1111111页index111',res)
					if(res.data.code == 1){
						
						that.product_list = res.data.product_list;
						
					}
					
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
			});
			
			
			
			
			
			this.abotapi.current_chat_gui = this;
			this.abotapi.current_chat_page = '/pages/live/live-player';
			
			
			setInterval(()=>{
				
				var strArr = [
							'我想钻到你的身体里去，然后再像一个蘑菇那样的长出来',
							'喜欢你，是我做过最靠近爱情的事',
							'想送你个超级可爱的礼物，可是快递员不让我钻箱子里',
							'我想钻到你的身体里去，然后再像一个蘑菇那样的长出来。',
							'我蹲在这里不走等你找到我好不好，你快来呀我都要长蘑菇了。',
							'谁要你的飞吻，有本事真亲过来阿。',
							'我吃了太多盐闲的总去想你呀。',
							'你手放在外面不冷吗？等你握啊。',
							'你笑的时候真好看，像月牙里装满了星星。',
							 '你再惹我，我把你的名字写在我的裤衩上，放屁崩死你。',
							'你怎么能从人群中一眼就发现他的呢""我感觉他在发光呀。'
						  ]
						  
				var num = this.randomNum(0,10)	
				
				this.msgList.push({'name':this.randomNum(1000,20000),'content':strArr[num] });
				
			},1000)
			
			this.get_product_list();
			
			// const subNvue=uni.getSubNVueById('sendDanmu');   //获取 
			
			// console.log('subNvue====',subNvue)
			
			
			// subNvue.show()  // 显示
			//subNvue.hide() //隐藏
			
			
			// 通过 id 获取 nvue 子窗体  
			// const subNVue = uni.getSubNVueById('sendDanmu')  
			// // 打开 nvue 子窗体  
			// subNVue.show('slide-in-left', 300, function(){  
			//     // 打开后进行一些操作...  
			//     //   
			// });  
			// 关闭 nvue 子窗体  
			// subNVue.hide('fade-out', 300)
			
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
		        this.videoContext = uni.createVideoContext('myVideo')
		        // #endif
		},
		methods: {
			//猜你喜欢
			get_product_list:function(){
				console.log('get_product_list=====>>>>>');
				
				var that = this;
				
				var post_data = {
						sellerid:this.abotapi.globalData.default_sellerid,
						sort: 1,
				    };
				
				
				
				
				this.abotapi.abotRequest({
				    url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=product_list',
				    method: 'post',
				    data: post_data,
				    success: function (res) {
						
						console.log('第一1111111页index111',res)
						if(res.data.code == 1){
							
							that.product_list = res.data.product_list;
							
						}
						
				    },
				    fail: function (e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
				    },
				});
			},
			
			//生成从minNum到maxNum的随机数
			randomNum :function (minNum, maxNum) {
			  switch (arguments.length) {
			    case 1:
			      return parseInt(Math.random() * minNum + 1, 10);
			      break;
			    case 2:
			      return parseInt(Math.random() * ( maxNum - minNum + 1 ) + minNum, 10);
			      //或者 Math.floor(Math.random()*( maxNum - minNum + 1 ) + minNum );
			      break;
			    default:
			      return 0;
			      break;
			  }
			},
			
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
								
								
								console.log('4444444')
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
								   })	
							}						
						
					}
						
			},
			
			
			
			// 发送消息
			sendMsg(content,type){
				
				
				
				var userInfo = this.abotapi.get_user_info();
				var userAcountInfo = this.abotapi.get_user_account_info();
				
				this.msgList.push({'name':userAcountInfo.fenxiao_info.nickname, 'content':this.danmuValue});
				this.danmuValue = '';
				
				//实际应用中，此处应该提交长连接，模板仅做本地处理。
				var nowDate = new Date();
				// let lastid = this.msgList[this.msgList.length-1].id;
				let lastid = this.msgList.length > 0 ? this.msgList[this.msgList.length - 1].id : this.msgList.length;
				
				
				lastid++;
				let msg = {
							id:lastid,
							uid:userInfo.userid,
							username:userAcountInfo.nickname,
							face:userAcountInfo.headimgurl,
							time:nowDate.getHours()+":"+nowDate.getMinutes(),
							type:type,
							msg:{
								content: content,
								type: type
							},
							
						 };
				// this.screenMsg(msg);
				this.send_text_to_service(msg, type)
				// 定时器模拟对方回复,三秒
				// setTimeout(()=>{
				// 	lastid = this.msgList[this.msgList.length-1].id;
				// 	lastid++;
				// 	msg = {id:lastid,uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg",time:nowDate.getHours()+":"+nowDate.getMinutes(),type:type,msg:content};
				// 	this.screenMsg(msg);
				// },3000)
			},
			
			// 接受消息(筛选处理)
			screenMsg(msg){
				//从长连接处转发给这个方法，进行筛选处理
				
				switch (msg.type){
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
				
			},
			
			
			// 处理文字消息
			addTextMsg(msg){
				
				this.msgList.push(msg);
			
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
					   from: '11111'
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
				
				uni.request({
				     url: that.abotapi.globalData.yanyubao_server_url + '/openapi/ChatData/chat_history',
				     data:data_params,
				     header: {
				       "Content-Type": "application/x-www-form-urlencoded"
				     },
				     method: "POST",
				     success: function (res) {
				       console.log('chat_history=====add', res);
				      
					  if(res.data.code == 0){
						  uni.showToast({
						  	title: res.data.msg,
							duration: 2000,
							icon: 'none'
						  })
					  }else{
						  // 发送消息
						  that.screenMsg(msg);
					  }
					 
					  
				     }
				   })
			},
			
			
			enterLiveRoom:function(){
				var userInfo = this.abotapi.get_user_info();
				
				this.abotapi.abotRequest({
				  url: this.abotapi.globalData.yanyubao_server_url + 'openapi/VideoLiveData/live_room_add_s_cache',
				  method: 'post',
				  data: {
					userid: userInfo.userid,
					checkstr: userInfo.checkstr,
					sellerid: this.abotapi.get_sellerid(),
					roomid: this.roomid
				  },
				  header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				  },
				  success: (res) => {
					 

				  },
				  error: function (e) {
					uni.showToast({
					  title: '网络异常！',
					  duration: 2000,
					});
				  },
				});
			},
			
			 sendDanmu: function() {
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: this.getRandomColor()
				});
				this.danmuValue = '';
			},
			videoErrorCallback: function(e) {
				console.log('e===',e);
				uni.showModal({
					content: '该用户没有直播',
					showCancel: false
				})
			},
			getRandomColor: function() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			}
		}
	}
</script>

<style lang="scss">
	#myVideo {
		width:100%;
		position: fixed;
		top: 0px;
	}

	.danmu-con{
		position: fixed;
		bottom: 100px;
		width: 100%;
		z-index: 10000;
	}
	
	.uni-list-cell-db{
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	.page-body-button::after{
		border: none;
	
	}
	
	.page-body-button{
		line-height: normal;
		background-color: transparent;
		padding:0,
	}
	.prdoucts{
		position: fixed;
		bottom: 20px;
	}
	.prdoucts image{
		width: 20px;
	}
</style>
