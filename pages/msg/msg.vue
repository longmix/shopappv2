<template>
	<view class="chat_main">
        <view class="chat_empty" v-if="latestMsgList_count == 0">
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/empty_remark.png"
				mode="widthFix"
				style="max-width: 80%; width:300rpx; margin: 50rpx auto;display: block;"></image>
			<view style="display: block;width: 100%;text-align: center;font-size: 20px;color: #5a5a5a;">暂无消息</view>
		</view>
		<view class="chat-list" v-else>
			<view class="chat" v-for="(chat,index) in latestMsgList" :key="index" v-if="chat.chat_type == 1">
				<view class="row" @tap="toChat(chat)">
					<view class="left">
						<image v-if="!chat.from_person_detail" src="http://yanyubao.tseo.cn/Tpl/static/images/VIP.png"></image>
						<image v-if="chat.from_person_detail" :src="chat.from_person_detail.headimgurl"></image>
					</view>
					<view class="right">
						<view class="top">
							<view class="username">系统消息</view>
							<view class="time">{{chat.latest_time}}</view>
						</view>
						<view class="bottom" style="width: 500rpx;overflow: hidden;">
							<view class="msg" v-if="chat.msg_type == 'text'" v-html="chat.latest_msg" style="height: 30rpx;margin-top: 10rpx;width: 400rpx;overflow:hidden;"></view>
							<view class="msg" v-else-if="chat.msg_type == 'img'">[图片]</view>
							<view class="msg" v-else-if="chat.msg_type == 'redEnvelope'">[红包]</view>
							<view class="msg" v-else-if="chat.msg_type == 'voice'">[语音]</view>
							<!-- <view class="msg">{{chat.latest_msg}}</view> -->
							<view class="tis" v-if="chat.couter_unread>0">{{chat.couter_unread}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="chat" :key="index" v-else-if="chat.chat_type == 0">
				<view class="row" @tap="toChat(chat)">
					<view class="left">
						<image v-if="chat.from_person_detail" :src="chat.from_person_detail.headimgurl"></image>
					</view>
					<view class="right">  
						<view class="top">
							<view v-if="chat.from_person_detail" class="username">{{chat.from_person_detail.nickname}}</view>
							<view class="time">{{chat.latest_time}}</view>
						</view>
						<view class="bottom">
							<view class="msg" v-if="chat.msg_type == 'text'" v-html="chat.latest_msg" style="width: 400rpx;overflow:hidden;"></view>
							<view class="msg" v-else-if="chat.msg_type == 'img'">[图片]</view>
							<view class="msg" v-else-if="chat.msg_type == 'redEnvelope'">[红包]</view>
							<view class="msg" v-else-if="chat.msg_type == 'voice'">[语音]</view>
							<!-- <view class="msg">{{chat.latest_msg}}</view> -->
							<view class="tis" v-if="chat.couter_unread>0">{{chat.couter_unread}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chatList:[
					{
						uid:1,
						username:"鲜果蔬专营店",
						face:"/static/img/im/face/face_1.jpg",
						time:"13:08",
						msg:"亲，20点前下单都是当天送达的",
						tisNum:1
					},
					{
						uid:2,
						username:"官店大欺客旗舰店",
						face:"/static/img/im/face/face_2.jpg",
						time:"13:05",
						msg:"问那么多干什么？不想买就滚~",
						tisNum:0
					},
					{
						uid:3,
						username:"妙不可言",
						face:"/static/img/im/face/face_3.jpg",
						time:"12:15",
						msg:"推荐一个商品呗？",
						tisNum:0
					},
					{
						uid:4,
						username:"茶叶专卖",
						face:"/static/img/im/face/face_4.jpg",
						time:"12:11",
						msg:"现在卖的都是未过青的茶哦",
						tisNum:0
					},
					{
						uid:5,
						username:"likeKiss客服",
						face:"/static/img/im/face/face_5.jpg",
						time:"12:10",
						msg:"你好，发福建快递多久送到的？",
						tisNum:0
					},
					{
						uid:6,
						username:"白开水",
						face:"/static/img/im/face/face_6.jpg",
						time:"12:10",
						msg:"在吗？",
						tisNum:0
					},
					{
						uid:7,
						username:"衣帽间的叹息",
						face:"/static/img/im/face/face_7.jpg",
						time:"11:56",
						msg:"新品上市，欢迎选购",
						tisNum:0
					},
					{
						uid:8,
						username:"景萧疏",
						face:"/static/img/im/face/face_8.jpg",
						time:"11:56",
						msg:"商品七天无理由退换的",
						tisNum:0
					},
					{
						uid:9,
						username:"文宁先生",
						face:"/static/img/im/face/face_9.jpg",
						time:"12:15",
						msg:"星期天再发货的",
						tisNum:0
					},
					{
						uid:10,
						username:"高端Chieh",
						face:"/static/img/im/face/face_10.jpg",
						time:"12:36",
						msg:"建议你直接先测量好尺码在选购的。",
						tisNum:0
					},
					{
						uid:11,
						username:"mode旗舰店",
						face:"/static/img/im/face/face_11.jpg",
						time:"12:40",
						msg:"新品5折，还有大量优惠券。",
						tisNum:0
					},
					{
						uid:12,
						username:"敏萘客服",
						face:"/static/img/im/face/face_12.jpg",
						time:"12:36",
						msg:"还没有用，等我明天早上试一下",
						tisNum:0
					},
					{
						uid:13,
						username:"春天里的花",
						face:"/static/img/im/face/face_13.jpg",
						time:"12:36",
						msg:"适用于成年人的，小孩不适用的",
						tisNum:0
					},
					{
						uid:14,
						username:"电脑外设专业户",
						face:"/static/img/im/face/face_13.jpg",
						time:"12:36",
						msg:"把上面的螺丝拆下来，把铁片撬开就能看见了",
						tisNum:0
					},
					{
						uid:15,
						username:"至善汽车用品",
						face:"/static/img/im/face/face_15.jpg",
						time:"12:36",
						msg:"这个产品是原车配件，完美装上的",
						tisNum:0
					}

				],
				latestMsgList: [],
				latestMsgList_count: 0
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		onShow: function() {
			var that = this;
			
			var userInfo =that.abotapi.get_user_info();
			console.log('acadawuserinfo',userInfo);
			if(userInfo == null){
				uni.redirectTo({
				url: '/pages/login/login'
				 });
			}
			
			that.getLastMsg();
		
		},
		onLoad() {
			var that = this;
			
			that.abotapi.set_option_list_str(that, that.abotapi.getColor());
			
			var userInfo =  that.abotapi.get_user_info();
			
			if(!userInfo || !userInfo.userid){
				var last_url = '/pages/msg/msg';
				that.abotapi.goto_user_login(last_url, 'normal');
				return;
			}
			
			that.getLastMsg();
			
			that.abotapi.current_chat_gui = this;
			that.abotapi.current_chat_handle = this;
			that.abotapi.current_chat_page = '/pages/msg/msg';
		},
		methods: {
			
			getLastMsg:function(){
				var that = this;
				
				var userInfo = that.abotapi.get_user_info();
				var userAcountInfo = this.abotapi.get_user_account_info();
				that.abotapi.abotRequest({
				     url: that.abotapi.globalData.yanyubao_server_url + '/openapi/ChatData/chat_history',
				     data: {
						action: 'latest_list',
						userid02: userInfo.userid,
						checkstr: userInfo.checkstr,
						sellerid: that.abotapi.globalData.default_sellerid, //'fmXJPaVea',
						chat_type: '0,4,1', //0普通，4群聊，1系统
				     },
				    
				     success: function (res) {
				       console.log('ddd', res);
					       
						var	data = res.data;
						if(data.code == 1){
							
							that.latestMsgList = data.data
							
							that.latestMsgList_count = that.latestMsgList.length;
							
						}else {
							that.latestMsgList = [];
							 
							that.latestMsgList_count = 0;
						}
					
						uni.setStorageSync('latestMsgList_cache',that.latestMsgList);
						 
				     }
				   })
			},
			
			toChat(chat){
				
				var url = 'chat/chat?type=' + chat.chat_type;
				if(chat.chat_type == 0){
					url = url + '&userid=' + chat.from_person_detail.userid + '&name=' + chat.from_person_detail.nickname;					
					
				}else if(chat.chat_type == 1){
					url = url + '&key=test';
				}
				 else {
					url = url + '&groupid=' + chat.groupid;
				}
						
				uni.navigateTo({
					url: url ,
				})
				
			}
		}
	}
</script>

<style  lang="scss">
	.chat_main{
		background-color: rgba(255, 255, 255, 0);
	}
	.chat-list{
		width: 94%;
		padding: 0 3%;
		.chat{
			width: 100%;
			height: 100upx;
			padding: 20upx 0;
			border-bottom: solid 1upx #eaeaea;
			.row{
				display: flex;
				justify-content: flex-start;
				.left{
					flex-shrink:0;
					width: 100upx;
					height: 100upx;
					image{
						width: 100upx;
						height: 100upx;
						border-radius: 20upx;
					}
				}
				.right{
					flex-shrink:1;
					width: 98%;
					padding-left: 2%;
					.top{
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						.usernam{
							font-size: 26upx;
						}
						.time{
							font-size: 22upx;
							color: #bebebe;
						}
					}
					.bottom{
						width: 100%;
						height: 40upx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.msg{
							font-size: 25upx;
							color: #777;
						}
						.tis{
							width: 35upx;
							height: 35upx;
							font-size: 22upx;
							display: flex;
							justify-content: center;
							align-items: center;
							background-color: #eb4d3d;
							color: #fff;
							border-radius: 100%;
						}
					}
				}
			}
		}
	}
</style>
