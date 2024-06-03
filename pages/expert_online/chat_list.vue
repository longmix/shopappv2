<template>
	<view>
		<view class="content" @touchstart="hideDrawer">
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop"
			 :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="10">
				<!-- 加载历史数据waitingUI -->
				<view v-if="isHistoryLoading" class="loading">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view>
				<view class="row" v-for="(row, index) in msgList" :key="index" :id="'msg' + row.msg.id">
					<!-- 系统消息 -->
					<block v-if="row.type == 'system'">
						<view class="system">
							<!-- 文字消息 -->
							<view v-if="row.msg.type == 'text'" class="text">{{ row.msg.content.text }}</view>
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
					<!-- 用户消息 -->
					<block v-if="row.type == 'user'">
						<!-- 长按撤销和删除 -->
						<view class="chexiao_shanchu_msg_myuid" v-if="row.msg.userinfo.uid == myuid 
							&& msglist_del_revoke_myuid &&
							row.msg.id == row_msg_content_id">
							<view class="msg_bianji_revoke_chexiao">
								<view class="chexiao" @tap="msg_fuzhi_text(row.msg.content.text)">复制</view>
								<!-- <view class="chexiao" @tap="msg_revoke()">撤销</view>
								<view class="chexiao" style="margin-left: 50rpx;" @tap="msg_del()">删除</view> -->
							</view>
						</view>
						 
						<!-- 自己发出的消息 -->
						<view class="my" v-if="row.msg.userinfo.uid == myuid">
							
							<!-- 左-消息 -->
							<view class="left" @longpress="left_my_msg_longpress(row.msg.id , row.msg.userinfo.uid)">
								<!-- 文字消息 -->
								<view v-if="row.msg.type == 'text'" class="bubble">
									<rich-text :nodes="row.msg.content.text"></rich-text> 
								</view>
								<!-- 语言消息 -->
								<view v-if="row.msg.type == 'voice'" class="bubble voice" @tap="playVoice(row.msg)" :class="playMsgid == row.msg.id ? 'play' : ''">
									<view class="length">{{ row.msg.content.length }}</view>
									<view class="icon my-voice"></view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.msg.type == 'img'" class="bubble img" @tap="showPic(row.msg)">
									<image :src="row.msg.content.text" :style="{ width: row.msg.content.w + 'px', height: row.msg.content.h + 'px' }"></image>
								</view>
								<!-- 红包 -->					
								<block v-if="redpackage_template_id != 'weixin'">
									
									<view v-if="row.msg.type == 'redEnvelope'"  class="bubble red-envelope" @tap="openRedEnvelope(row.msg, index)">
										<image src="/static/img/red-envelope.png"></image>
										<view class="tis">
											<!-- 点击开红包 -->
										</view>
										<view class="blessing">{{ row.msg.content.blessing }}</view>
									</view>
								</block>
								
								<block v-else>								
									<view v-if="row.msg.type == 'redEnvelope'" style="background: transparent;" class="bubble red-envelope" @tap="openRedEnvelopeWeixin(row.msg, index)">
										<image src="/static/img/red-envelope-weixin-right.png" mode="widthFix" style="width: 400upx;"></image>
										<view class="tis">
											<!-- 点击开红包 -->
										</view>
										<view class="blessing" style="text-align:left;bottom: 65%;color:#fff;left:28%">{{ row.msg.content.blessing }}</view>
									</view>								
								</block>
								
								<view v-if="row.msg.type=='card'" class="bubble card">
									<image :src="row.msg.content.img"></image>
									<view class="title">
										{{ row.msg.content.text }}
									</view>
									<view class="info">
										{{ row.msg.content.info }}
									</view>
									<view class="bottom">
										{{ row.msg.content.source }}
									</view>
								</view>
								
								<view v-if="row.msg.type=='product'" class="bubble product">
									<image :src="row.msg.content.img" mode="widthFix"></image>
									<view class="price">
										${{ row.msg.content.discount_price }}
										<text class="x">&nbsp;&nbsp;${{ row.msg.content.price }}</text>
									</view>
									<view class="info">
										{{ row.msg.content.text }}
									</view>
									<view v-if="row.msg.content.tags && row.msg.content.tags.length" class="tags">
										<view class="tag" v-for="tag in row.msg.content.tags"  :key="tag">{{tag}}</view>
									</view>
								</view>
								
								<view v-if="row.msg.type=='web'" class="bubble web">
									<image :src="row.msg.content.img"></image>
									<view class="title">
										{{ row.msg.content.text }}
									</view>
									<view class="info">
										{{ row.msg.content.info }}
									</view>
									<view class="bottom">
										{{ row.msg.content.source }}
									</view>
								</view>
							</view>
							<!-- 右-头像 -->
							<view class="right">
								<image @click="toUserInfo" :src="row.msg.userinfo.face"></image>
							</view>
						</view>
						<!-- 别人发出的消息 -->
						
						<view class="chexiao_shanchu_msg" v-if="msglist_del_revoke_uid && row.msg.userinfo.uid != myuid &&
							row.msg.id == row_msg_content_id">
							<view class="msg_bianji_revoke_chexiao ">
								<view class="chexiao" @tap="msg_fuzhi_text(row.msg.content.text)">复制</view>
								<!-- <view class="chexiao" @tap="msg_revoke()">撤销</view>
								<view class="chexiao" style="margin-left: 50rpx;" @tap="msg_del()">删除</view> -->
							</view>
						</view>
						
						<view class="other" v-if="row.msg.userinfo.uid != myuid"> 
							<!-- 左-头像 -->
							<view class="left"><!-- {{row.msg.userinfo.uid}} === {{myuid}} 22 --> 
								<image v-if="isGroup && (check_is_admin != 0)  " @click="toFriendInfo(row.msg.userinfo)"
								 :src="row.msg.userinfo.face" @longpress="handle_touch_start(row.msg.userinfo)"></image>
								
								<image v-else-if="privilege != -1" @click="toFriendInfo(row.msg.userinfo)"
								 :src="row.msg.userinfo.face"  @longpress="handle_touch_start(row.msg.userinfo)"></image>
								
								<!-- <image v-else @click="toFriendInfo(row.msg.userinfo)" :src="taskUserInfo.headImg"></image> -->
								<image v-else @click="addFirendTips()" :src="row.msg.userinfo.face"  @longpress="handle_touch_start(row.msg.userinfo)"></image>
							</view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right"  @longpress="right_my_msg_longpress(row.msg.id , row.msg.userinfo.uid)">
								<!-- <view v-if="isGroup" class="username"> -->
								<view  class="username">
									
									<view class="name">{{ row.msg.userinfo.username }}</view><!-- 聊天里面的名称 -->
									<view class="time">{{ row.msg.time }}</view>
								</view>
								<!-- 文字消息 -->
								<view v-if="row.msg.type == 'text'" class="bubble">
									<rich-text :nodes="row.msg.content.text"></rich-text>
								</view>
								<!-- 语音消息 -->
								<view v-if="row.msg.type == 'voice'" class="bubble voice" @tap="playVoice(row.msg)" :class="playMsgid == row.msg.id ? 'play' : ''">
									<view class="icon other-voice"></view>
									<view class="length">{{ row.msg.content.length }}</view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.msg.type == 'img'" class="bubble img" @tap="showPic(row.msg)">
									<image :src="row.msg.content.text"  :style="{ width: row.msg.content.w + 'px', height: row.msg.content.h + 'px' }"></image>
								</view>
								<!-- 红包 -->
								<block v-if="redpackage_template_id != 'weixin'">
									<view v-if="row.msg.type == 'redEnvelope'" class="bubble red-envelope" @tap="openRedEnvelope(row.msg, index)">
										<image src="/static/img/red-envelope.png"></image>
										<view class="tis">
											<!-- 点击开红包 -->
										</view>
										<view class="blessing">{{ row.msg.content.blessing }}</view>
									</view>
								</block>
								
								<block v-else>
									<view v-if="row.msg.type == 'redEnvelope'" class="bubble red-envelope" @tap="openRedEnvelopeWeixin(row.msg, index)">
										<image src="/static/img/red-envelope-weixin-left.png" mode="widthFix" style="width: 400upx;"></image>
										<view class="tis">
											<!-- 点击开红包 -->
										</view>
										<view class="blessing" style="text-align:left;bottom: 65%;color:#fff;left:8%;">{{ row.msg.content.blessing }}</view>
									</view>
								</block>

								<view v-if="row.msg.type=='card'" class="bubble card">
									<image :src="row.msg.content.img"></image>
									<view class="title">
										{{ row.msg.content.text }}
									</view>
									<view class="info">
										{{ row.msg.content.info }}
									</view>
									<view class="bottom">
										{{ row.msg.content.source }}
									</view>
								</view>

								<view v-if="row.msg.type=='product'" class="bubble product">
									<image :src="row.msg.content.img" mode="widthFix"></image>
									<view class="price">
										${{ row.msg.content.discount_price }}
										<text class="x">&nbsp;&nbsp;${{ row.msg.content.price }}</text>
									</view>
									<view class="info">
										{{ row.msg.content.text }}
									</view>
									<view v-if="row.msg.content.tags && row.msg.content.tags.length" class="tags">
										<view class="tag" v-for="tag in row.msg.content.tags"  :key="tag">{{tag}}</view>
									</view>
								</view>

								<view v-if="row.msg.type=='web'" class="bubble web">
									<image :src="row.msg.content.img"></image>
									<view class="title">
										{{ row.msg.content.text }}
									</view>
									<view class="info">
										{{ row.msg.content.info }}
									</view>
									<view class="bottom">
										{{ row.msg.content.source }}
									</view>
								</view>
							</view>
						</view>
					</block>

				</view>
			</scroll-view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情 -->
			<swiper class="emoji-swiper" :class="{ hidden: hideEmoji }" indicator-dots="true" duration="150">
				<swiper-item v-for="(page, pid) in emojiList" :key="pid">
					<view v-for="(em, eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="'/static/img/emoji/' + em.url"></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- 更多功能 相册-拍照-红包 -->
			<view class="more-layer" style="padding: 10rpx 0;" :class="{ hidden: hideMore }">
				<view class="list">
					<view class="box box2" @tap="chooseImage">
						<view class="icon tupian2"></view>
						<view>相册</view>
					</view>
					<view class="box box2" @tap="camera">
						<view class="icon paizhao"></view>
						<view>拍照</view>
					</view>
					<view v-if="redpackage_status == 1" >
						<view v-if="check_is_admin != 1 && show_redenvelopes_button != 1"></view>
						<view v-else>
							<view class="box box2" @tap="handRedEnvelopes">
								<view class="icon hongbao"></view>
								<view>红包</view>
							</view>
						</view>
					</view>
					
				
					 <!-- <view class="box box2" data-url="jubao_link_url" @tap="mytiaozhuan">
						<image class="icon-layer-img" mode="widthFix" src="../../static/img/jubao.png"></image>
						<view>举报</view>
					</view> -->
				</view>
			</view>
		</view>
		
		<!-- 录音UI效果 -->
		<view class="record" :class="recording ? '' : 'hidden'">
			<view class="ing" :class="willStop ? 'hidden' : ''"><view class="icon luyin2"></view></view>
			<view class="cancel" :class="willStop ? '' : 'hidden'"><view class="icon chehui"></view></view>
			<view class="tis" :class="willStop ? 'change' : ''">{{ recordTis }}</view>
		</view>
		<!-- 红包弹窗 -->
		<view v-if="receive_redpackage" class="show_modal_mask"></view>
		<view v-if="receive_redpackage" class="show_modal_pop">
			<view class="" style="background-color: #FFFFFF;width: 600rpx;height: 360rpx;">
				<view style="text-align: center;padding:20rpx;font-size: 20px;">输入口令</view>
				<view class="icon close" style="float: right;background-color: red;margin-top: -92rpx;" @tap="close_popup_red_package"></view>
				<input class="red_backage_kouling_input"  type="text" value="" @input="redpackage_kouling"/>
				<button type="primary" class="btn_red_kouling"  @tap="btn_red_package_kouling" >确认</button>
			</view>
			
		</view>
		<view v-if="redpackage_template_id != 'weixin'" class="windows" :class="windowsState">
			<!-- 遮罩层 -->
			<view class="mask" @touchmove.stop.prevent="discard" @tap="closeRedEnvelope"></view>
			<view class="layer" @touchmove.stop.prevent="discard">
				<view class="open-redenvelope">
					<view class="top">
						<view class="close-btn"><view class="icon close" @tap="closeRedEnvelope"></view></view>
						<image :src="redenvelopeData.face"></image>
					</view>
					<view class="from">来自{{ redenvelopeData.from }}</view>
					<view class="blessing">{{ redenvelopeData.blessing }}</view>
					<view class="money">{{ redenvelopeData.money }}</view>
					<view class="showDetails" @tap="toDetails(redenvelopeData.rid)">
						查看领取详情
						<view class="icon to"></view>
					</view>
				</view>
			</view>
		</view>
		
		
		
		<view v-else class="windows" :class="windowsState">
			<!-- 遮罩层 -->
			<view class="mask" @touchmove.stop.prevent="discard" @tap="closeRedEnvelope"></view>
			<view class="layer" @touchmove.stop.prevent="discard">
				<view class="open-redenvelope">
					<view class="top">
						<view class="close-btn"><view class="icon close" @tap="closeRedEnvelope"></view></view>
						<image :src="redenvelopeData.face"></image>
					</view>
					<view class="from" style="font-size: 30upx;color:#f2a992">来自{{ redenvelopeData.from }}</view>
					<view class="blessing" style="font-size: 60upx;color: #fbe8b4;">{{ redenvelopeData.blessing }}</view>
					<!-- <view class="money">{{ redenvelopeData.money }}</view> -->
					<view class="showDetails showDetails-diff" @tap="toDetailsWeixin()">
						开红包
						
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部输入栏 -->
		<view class="input-box" style="padding: 0;width: 100%;" :class="popupLayerClass"  @touchmove.stop.prevent="discard" 
			>
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- #ifndef H5 -->
			
			<view v-if="userid && (show_private_button == 1) 
			&& (privilege == -1) &&(privilege_userid_show == -1)">
				<view class="voice">
					<view class="icon" :class="isVoice ? 'jianpan' : 'yuyin'" ></view>
				</view>
			</view>
		
			<view v-else-if="userid && (show_private_button == 1) && (privilege != -1)">
				<view class="voice">
					<view class="icon" :class="isVoice ? 'jianpan' : 'yuyin'" @tap="switchVoice"></view>
				</view>
			</view>
			<view v-else-if="userid && (show_private_button == 1) 
					 && (privilege_userid_show != -1)">
				<view class="voice">
					<view class="icon" :class="isVoice ? 'jianpan' : 'yuyin'"  @tap="switchVoice"></view>
				</view>
			</view>
			<view v-else>
				<view class="voice">
					<view class="icon" :class="isVoice ? 'jianpan' : 'yuyin'" @tap="switchVoice"></view>
				</view>
			</view>
			
			<!-- #endif -->
			<!-- #ifdef H5 -->
			
			<view v-if="userid && (show_private_button == 1) 
			&& (privilege == -1) && (privilege_userid_show == -1)">
				<view class="more">
					<view class="icon add"></view>
				</view>
			</view>
			<view v-else-if="(userid && (show_private_button == 1) 
			&& (privilege != -1))">
				<view class="more" @tap="showMore">
					<view class="icon add"></view>
				</view>
			</view>
			<view v-else-if="userid && (show_private_button == 1) 
					 && (privilege_userid_show != -1)">
				<view class="more" @tap="showMore">
					<view class="icon add"></view>
				</view>
			</view>
			<view v-else>
				<view class="more" @tap="showMore">
					<view class="icon add"></view>
				</view>
			</view>
			<!-- #endif -->
			
			
			<view class="textbox">
				<view class="voice-mode" :class="[isVoice ? '' : 'hidden', recording ? 'recording' : '']" @touchstart="voiceBegin"
				 @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">
					{{ voiceTis }}
				</view>
				<view class="text-mode" :class="isVoice ? 'hidden' : ''">
					<view class="box" v-if="userid && (show_private_button == 1) && (privilege == -1) 
					&&(privilege_userid_show == -1)">
						<input <!-- #ifndef H5 --> cursor-spacing="10" <!-- #endif --> 
						class="uni-input" style="height:46rpx;line-height:46rpx;width:100%;" auto-height="true" :focus="focus" v-model="textMsg"
						@focus="textareaFocus($event)" @input="textareaInput($event)" disabled="disabled" @confirm ="input_queren"/>
					</view>
					
					<view class="box" v-else-if="userid && (show_private_button == 1) && (privilege != -1) 
					">
						<input <!-- #ifndef H5 --> cursor-spacing="10" <!-- #endif --> 
						class="uni-input" style="height:46rpx;line-height:46rpx;width:100%;" auto-height="true" :focus="focus" v-model="textMsg"
						@focus="textareaFocus($event)" @input="textareaInput($event)" @confirm ="input_queren"
						maxlength="-1"/>
					</view>
					<view class="box" v-else-if="userid && (show_private_button == 1) 
					 && (privilege_userid_show != -1)">
						<input <!-- #ifndef H5 --> cursor-spacing="10" <!-- #endif --> 
						class="uni-input" style="height:46rpx;line-height:46rpx;width:100%;" auto-height="true" :focus="focus" v-model="textMsg"
						@focus="textareaFocus($event)" @input="textareaInput($event)"
						 @confirm ="input_queren" maxlength="-1"/>
					</view>
					
					<view class="box" v-else>
						<input <!-- #ifndef H5 --> cursor-spacing="10" <!-- #endif --> 
						class="uni-input" style="height:46rpx;line-height:46rpx;width:100%;" auto-height="true" :focus="focus" v-model="textMsg"
						@focus="textareaFocus($event)" @input="textareaInput($event)"
						@confirm ="input_queren" maxlength="-1"/>
					</view>
					
					<view v-if="userid && (show_private_button == 1) 
					&& (privilege == -1) && (privilege_userid_show == -1)">
						<view class="em">
							<view class="icon biaoqing"></view>
						</view>
					</view>
					<view v-else-if="userid && (show_private_button == 1) && (privilege != -1) ">
						<view class="em" @tap="chooseEmoji" >
							<view class="icon biaoqing"></view>
						</view>
					</view>
					<view v-else-if="userid && (show_private_button == 1) 
					 && (privilege_userid_show != -1)">
						<view class="em" @tap="chooseEmoji">
							<view class="icon biaoqing"></view>
						</view>
					</view>
				
					<view v-else>
						<view class="em" @tap="chooseEmoji" >
							<view class="icon biaoqing"></view>
						</view>
					</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			
			<view v-if="userid && (show_private_button == 1)
			&& (privilege == -1) && (privilege_userid_show == -1)">
				<view class="more" >
					<view class="icon add"></view>
				</view>
			</view>
			<view v-else-if="userid && (show_private_button == 1)
			&& (privilege != -1) ">
				<view class="more" @tap="showMore">
					<view class="icon add"></view>
				</view>
			</view>
			<view v-else-if="userid && (show_private_button == 1)
			 && (privilege_userid_show != -1)">
				<view class="more" @tap="showMore">
					<view class="icon add"></view>
				</view>
			</view>
			<view v-else>
				<view class="more" @tap="showMore">
					<view class="icon add"></view>
				</view>
			</view>
			
			
			<!-- #endif -->
			<view class="send" :class="isVoice ? 'hidden' : ''" @tap="sendText"><view class="btn">发送</view></view>
		</view>
		
		<view class="wx-popup" v-if="chat_xieyi_status == 1 && hidden_anquan_tishi_chuangkou != 1" >
		  <view class='popup-container'>
			<view class="wx-popup-title">提示</view>
			<!-- <view class="wx-popup-subtitle">{{faquan_xieyi_title}}</view> -->
			<view class="wx-popup-con">
			  
			<scroll-view scroll-y class="a-1 wx-popup-content">     
			 净化网络环境，请礼貌用语，如果您在对话过程中发现不文明行为，请点击此窗口的“加号”举报聊天行为，或者点击右上角“三个点”投诉此用户。      
			</scroll-view>  
		
		
			</view>
			<view class="wx-popup-cb">
				<checkbox-group @change="selectNoTip">
					
						<checkbox value="1"  />将来30天内不再提示
					
				</checkbox-group>	
			</view>
			<view class="wx-popup-btn">
			  <text class="btn-ok" @tap='selectAgree(0)'>不同意</text>
			  <text class="btn-ok" @tap='selectAgree(1)'>同意</text>
			</view>
		  </view>
		</view>
	</view>
</template>
<script>
	/* import { mapState } from 'vuex';
	import { mapMutations } from 'vuex';
	import parameter from '@/common/js/chat/parameter.js';
	import helper from '@/common/js/chat/helper.js';
	import Global from '@/common/js/chat/config.js';


	import io from '../../common/weapp.socket.io.js'; 


 */



	export default {
		data() {
			return {
				key: '0',
				//文字消息
				textMsg: '',
				//消息列表
				isHistoryLoading: false,
				scrollAnimation: false,
				scrollTop: 0,
				scrollToView: '',
				msgList: [],
				msgImgList: [],
				myuid: 0,

				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER: uni.getRecorderManager(),
				// #endif
				isVoice: false,
				voiceTis: '按住 说话',
				recordTis: '手指上滑 取消发送',
				recording: false,
				willStop: false,
				initPoint: {
					identifier: 0,
					Y: 0
				},
				recordTimer: null,
				recordLength: 0,
				userid:false,

				//播放语音相关参数
				AUDIO: uni.createInnerAudioContext(),
				playMsgid: null,
				VoiceTimer: null,
				// 抽屉参数
				popupLayerClass: '',
				// more参数
				hideMore: true,
				//表情定义
				hideEmoji: true,
				
				//红包相关参数
				windowsState: '',
				redenvelopeData: {
					rid: null, //红包ID
					from: null,
					face: null,
					blessing: null,
					money: null,
					kouling: null,
				},

				taskUserInfo: {
					userName: '',
					headImg: ''
				},

				isGroup: false,
				cache_msglist: Array,
				
				pageOn: false,
				set_userid: 0,
				is_check_act: true, 
				focus: false,
				inputHeight: -1,
				redEnvelopeWeixinMsg: '',
				redEnvelopeWeixinIndex: '',
				redpackage_template_id: '',
				redpackage_status: 0,
				jubao_link_url: '',
				chat_xieyi_status: 1,
				noTip: 0,
				recordCount: 0,
				record_flag:false,
				check_is_admin:0,
				
				//隐藏显示
				show_private_button:'',
				show_redenvelopes_button:'',
				kouling_str:'',
				receive_redpackage:false,
				hidden_anquan_tishi_chuangkou:1,
				
				
				//2021.12.1 撤销删除显示 
				msglist_del_revoke_myuid:false,
				msglist_del_revoke_uid:false,
				row_msg_content_id:'',
				
				privilege_userid_list:'',
				privilege_userid:[],
				privilege:'',
				privilege_userid_show:'',
				
				
				cache_msg_page_num:1,
				cache_msg_page_size:10,
				
				cache_msg_page_size_isHistoryLoading : true, 
				cache_msg_page_roll_bottom:true,
				
				groupInfo_list:null,
				friendInfo:null,
				weiliao_storage_groupid_show:true,
			};
		},

		/* computed: {
			...mapState(['newmsg'])
		}, */
		watch: {
			
			
			
			
			newmsg(item, oldVal) {
				console.log('11111111111111');
				console.log('收到新消息：' + JSON.stringify(item));
				
				this.cache_msg_page_size_isHistoryLoading = true;
				this.cache_msg_page_roll_bottom = false;
				
				if (item.msg.userinfo.uid == this.myuid) {
					return console.log('收到自己发送的消息，忽略它。。。');
				}

				let lastNextId = this.msgList.length > 0 ? this.msgList[this.msgList.length - 1].msg.id + 1 : this.msgList.length + 1;
				item.msg.id = lastNextId;
				
				console.log('item.msg.id',item.msg.id)
				
				if (item.msg.type == 'img') {
					this.msgImgList.push(item.msg.content.text);
				}
				
				// 发送消息
				this.screenMsg(item);
			}
		},

		onLoad(option) {
			var that = this;
			var userInfo = that.abotapi.get_user_info();
			
		
	
			
		},
		onShow() {
			
			
			uni.getStorageInfo({
			    success: function (res) {
					//console.log('resssssssss',res)
			       // console.log(res.keys);
			        console.log(res.currentSize);
			        console.log(res.limitSize);
			    }
			});
			var userInfo = this.abotapi.get_user_info();
			var that = this;
			
			//console.log('test===================1',uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid))
			that.pageOn = true;
			this.scrollTop = 9999999;
			
			//console.log('userInfo.userid',userInfo)
			var userAcountInfo = that.abotapi.get_user_account_info();
			
			
			var setUserInfo = uni.getStorageSync('setUserInfo');
			
			
			//console.log('setUserInfo==1',setUserInfo);
			if(setUserInfo){
				uni.removeStorageSync('setUserInfo');
				that.set_userid = setUserInfo.set_userid;
				if(setUserInfo.nickname){
					that.textMsg =  that.textMsg + setUserInfo.nickname;
				}
					
				if(setUserInfo.nickname == ''){
					that.textMsg =  that.textMsg + setUserInfo.mobile;
				}
				this.focus = true;
				
			}
		
			// setTimeout(function(){
				
				var new_msglist = [];
				var cache_msglist = [];
				if(that.userid){
					
					var cache_msglist01 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid);			
					
					//console.log('cache_msglist>>>>>>>>>>>>>',uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid))
					
					for(var i=0; i<cache_msglist01.length; i++){
						cache_msglist.push(cache_msglist01[i]);
					
					}
					for (var i = 0; i < cache_msglist.length; i++) {
						cache_msglist[i].msg.id = i;
					}
		
					uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid,cache_msglist);	
					
					var i_begin = 0;
					
					if(cache_msglist.length > 15){
						i_begin = cache_msglist.length - 15;
					}
					
					
					//i_begin = 0;
					
					for(var ii=i_begin; ii<cache_msglist.length; ii++){
						var msgItem = cache_msglist[ii];
						
						msgItem.msg.userinfo.username = '';
						
						new_msglist.push(msgItem);
					}
					
					
				}
				
				
				
				if(that.groupid){
					var cache_msglist01 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid);
					
					that.getFriendsList();
					//读取通讯录中的好友列表
					//console.log('cache_msg',cache_msglist)
					
					
					
					for(var i=0; i<cache_msglist01.length; i++){
						cache_msglist.push(cache_msglist01[i]);
					
					}
					for (var i = 0; i < cache_msglist.length; i++) {
						cache_msglist[i].msg.id = i;
					}
					uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid,cache_msglist);
					
					var i_begin = 0;
					if(cache_msglist.length > 15){
						i_begin = cache_msglist.length - 15;
					}
					
					var contact_list = uni.getStorageSync('friendList_cache');
					
					//console.log('contact_list8888888888888888=======>>>>',contact_list)
					var contact_list002 = [];
					for(var key in contact_list){
						var contact_list001 = contact_list[key];
						
						for(var i=0;i<contact_list001.length;i++){
							contact_list002.push(contact_list001[i]);
						}
					}
					//console.log('contact_list8888888888888888=======>>>>',contact_list002)
				
					
					//循环读取聊天记录
				
			
					for(var ii=i_begin; ii<cache_msglist.length; ii++){
						var msgItem = cache_msglist[ii];
						//console.log('asdqwerrter',msgItem)
						var userInfo = msgItem.msg.userinfo;
						
						for(var j=0; j<contact_list002.length; j++){
							if(cache_msglist[ii].msg.userinfo.uid == contact_list002[j].userid){
								if(contact_list002[j].buddy_remarks){
									cache_msglist[ii].msg.userinfo.username = contact_list002[j].buddy_remarks;
									
								}
							}
							
							
						}
						
						new_msglist.push(msgItem);
						
						
						
					}
					
					
				}
				//console.log('111111111111======', new_msglist)
				//console.log('this.msgList========2',uni.getStorageSync('cache_msglist_userid_'+userinfo.uid+'_and_groupid_'+this.groupid));
				
				that.cache_msglist = new_msglist ? new_msglist : [];
				
			
		
			
			if(!that.groupid){
				 uni.request({
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
							
							//console.log('132134445432',data)

							
							that.friendInfo = data.data;
							//console.log('friendInfo',that.friendInfo)
							if(data.data.buddy_remarks && data.data.buddy_remarks.trim().length > 0){
								uni.setNavigationBarTitle({
									title: data.data.buddy_remarks,//备注好了的昵称
								});
							}
							else{
								uni.setNavigationBarTitle({
									title: data.data.nickname,//原始昵称
								});
							}
							
							 that.taskUserInfo.userName = that.friendInfo.nickname;
							 that.taskUserInfo.headImg = that.friendInfo.headimgurl;
						 }
						
					  }
				})
			}else{
				uni.request({
					 url: that.abotapi.globalData.yanyubao_server_url + '/openapi/GroupData/get_group_information',
					 data: {
						groupid: that.groupid,
						sellerid: that.abotapi.globalData.default_sellerid,
					 },
					 header: {
					   "Content-Type": "application/x-www-form-urlencoded"
					 },
					 method: "POST",
					 success: function (res) {
						   
						var	data = res.data;
						if(data.code == 1){				
							that.groupInfo_list = data.data
							uni.setNavigationBarTitle({
								title: data.data.name
							});
						 }
					 }
				   }),
					uni.request({
						 url: that.abotapi.globalData.yanyubao_server_url + '/openapi/GroupData/get_user_list',
						 data: {
							groupid:that.groupid,
							sellerid: that.abotapi.globalData.default_sellerid,
						 },
						 header: {
						   "Content-Type": "application/x-www-form-urlencoded"
						 },
						 method: "POST",
						 success: function (res) {
						   //console.log('ddd------', userInfo.userid);
							var user_message_is_admin = res.data.data;
						
							//console.log('ddd------', user_message_is_admin);	
						
							var check_userid = user_message_is_admin.filter(item => item.userid == userInfo.userid);
							
							if(check_userid && check_userid[0]){
								that.check_is_admin = check_userid[0].is_admin;
								
								//console.log('ddd------', check_userid[0].is_admin);
								//console.log('ssssswwwwww', check_userid[0].is_admin);
								
									
							}
								
						 }
					   })
				   
			}
				var userInfo = that.abotapi.get_user_info();
				
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
				
			 
			//console.log('获取群聊最新消息',userInfo);
			console.log('获取群聊最新消息');
			 
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/ChatData/chat_history',
				data: data_params,

				  success: function (res) {
						var data = res.data;
						if(data.code == 1){
							var lastMsgList = data.data;
							if(lastMsgList.length>0){
								//console.log('lastMsgList',lastMsgList)
								var cache_msglist002 = [];
								
								that.weiliao_storage_groupid_show = false; 
								
								if(that.chat_type == 0){
									var cache_msglist003 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid);
									
								}
								else{
									var cache_msglist003 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid);
									
								}
								
								for(var i=0; i<cache_msglist003.length; i++){
									cache_msglist002.push(cache_msglist003[i]);
								
								}
								//console.log('cache_msglist002',cache_msglist002)
								for(var i=0; i<lastMsgList.length; i++){
									
									cache_msglist002.push(JSON.parse(lastMsgList[i].chat_msg));
								}
								
								
								
								var i_begin = 0;
								var cache_msglist = [];	
								if(lastMsgList.length > 15){
									i_begin = lastMsgList.length - 15;
									
									
									for(var ii=i_begin; ii<lastMsgList.length; ii++){
										
										cache_msglist.push(JSON.parse(lastMsgList[ii].chat_msg));
										
										
										that.cache_msglist = cache_msglist;
									}
								}else{
									
									for(var i=0; i<lastMsgList.length; i++){
										that.cache_msglist.push(JSON.parse(lastMsgList[i].chat_msg));
									
									}
								}
								
								/* 
									
								//console.log('cache_msglist002',cache_msglist002)
								for(var i=0; i<lastMsgList.length; i++){
									that.cache_msglist.push(JSON.parse(lastMsgList[i].chat_msg));
									
									cache_msglist002.push(JSON.parse(lastMsgList[i].chat_msg));
								}
							   
								 */															
								if(that.chat_type == 0){
																	
									
									uni.setStorage({
										key:'cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid, 
										data: cache_msglist002,
									});
									
								}else{
									uni.setStorage({
										key:'cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid,
										data: cache_msglist002
									});
									//console.log('getStorageSync',uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid))
									
									
								}
								
								  
								setTimeout(function() {
									
									/* that.setSesstion(that.sesstion); */
									that.getMsgList(that.sesstion);
									
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
								/* that.setSesstion(that.sesstion); */
								that.getMsgList(that.sesstion);

								// that.getMsgList(option.sesstion);
							}, 100); 
						}
						  
						  
					
					}
				})
				
			// }, 800)		
				
		},
		
		onHide:function(){
			var that = this;
			that.pageOn = false;

		},
		
		onUnload:function(){
			var that = this;
			

			that.pageOn = false;

		},
		
		onNavigationBarButtonTap:function(e){
			console.log(JSON.stringify(e))
			if(this.chat_type == 0){
				uni.navigateTo({
					url: '/pages/friendInfo/friendInfo?userid='+ this.userid
				});
			}else{
				uni.navigateTo({
					url: '/pages/groupInfo/groupInfo?groupid=' + this.groupid
				});
			}
			
		},
		methods: {
			/* ...mapMutations(['chatPushMsg', 'setSesstion']),
			 */
			
			callback_function:function(that, cb_params){
				 var userInfo = that.abotapi.get_user_info();
				//console.log('cb_params===', cb_params)
				//console.log('cb_params===', cb_params.redpackage_template_id)
				
				if(!cb_params){				
					return;
				}
				
				that.redpackage_template_id = cb_params.redpackage_template_id;
				that.redpackage_status = cb_params.redpackage_status;
				that.jubao_link_url = cb_params.jubao_link_url;
				that.show_private_button = cb_params.show_private_button;
				that.show_redenvelopes_button = cb_params.show_redenvelopes_button;
				that.hidden_anquan_tishi_chuangkou = cb_params.hidden_anquan_tishi_chuangkou;
				
				that.privilege_userid_list = cb_params.privilege_userid_list;
				
				//that.privilege_userid = that.privilege_userid_list.split(',');
				
				//that.privilege = that.privilege_userid.indexOf(userInfo.userid);
				
				//that.privilege_userid_show = that.privilege_userid.indexOf(that.userid);
				
				//console.log('qiowjqoiwejqiowe',that.privilege_userid)
				//console.log('qiowjqoiwejqiowe',userInfo.userid)
				//console.log('privilege_userid_show',that.privilege)
				//console.log('privilege_userid_show',that.privilege_userid_show)
				//console.log('qiowjqoiwejqiowe',that.show_private_button)
				
			},
			
			//长按事件
			left_my_msg_longpress:function(msgid,uid){
				var that = this;
				console.log('长按获取id',msgid)
				that.row_msg_content_id = msgid;
				
				that.msglist_del_revoke_myuid = true;
				
			},
			
			handle_touch_start:function(userinfo){
				var that = this;
				console.log('123456789asasd',userinfo)
				
				that.textMsg = that.textMsg + '@' + userinfo.username;
			},
			right_my_msg_longpress:function(msgid,uid){
				var that = this;
				console.log('长按获取id',msgid)
				that.row_msg_content_id = msgid;
			
				that.msglist_del_revoke_uid = true;
				
				
			},
			//复制
			msg_fuzhi_text:function(text){
				var that = this;
				var regex = /(<([^>]+)>)/ig;
				var body = text;
				var result = body.replace(regex, "");
				console.log('555555',result)
				uni.setClipboardData({
					data: result,
					success: function () {
						uni.showToast({
							title:'复制成功',
						});
						that.msglist_del_revoke_myuid = false;
						that.msglist_del_revoke_uid = false;
					},
					fail:function(){
						uni.showToast({
							title:'复制失败',
						})
					}
				});
			
			},
			//撤销
			msg_revoke:function(){
				
			},
			
			//删除
			msg_del:function(){
				
			},
			mytiaozhuan: function (e) {
					var that = this;
					
					console.log('user mytiaozhuan准备跳转：',e);
					var url = e.currentTarget.dataset.url;
					console.log('user mytiaozhuan准备跳转：' + url);
					
					if(!url){					
						return;
					}
				
					var last_url = 'switchTab /pages/chat/chat?retpage=' + encodeURIComponent(url);
					that.abotapi.goto_user_login(last_url);
					
				
					
				
				
					var var_list = Object();
					if (that.productid) {
					  var_list.productid = that.productid;
					}
				
				
					if (url.indexOf("%oneclicklogin%") != -1) {
					  var userInfo = that.abotapi.get_user_info();
				
			
				
					  console.log('userInfo====', userInfo)
				
					  if (!userInfo) {
						// var last_url = 'switchTab /pages/index/index';
						that.abotapi.goto_user_login();
				
						return;	
					  }
			
				
					  uni.request({
						url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=one_click_login_str',
						method: 'post',
						data: {
						  sellerid: that.abotapi.globalData.default_sellerid,
						  checkstr: userInfo.checkstr,
						  userid: userInfo.userid
						},
						header: {
						  'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: function (res) {
						  //--init data        
						  var code = res.data.code;
						  if (code == 1) {
							var oneclicklogin = res.data.oneclicklogin;
				
							console.log('ddddd+++++', oneclicklogin);
				
							
							that.oneclicklogin = oneclicklogin
							
							url = url.replace('%oneclicklogin%', that.oneclicklogin);
				
							if (url.indexOf("%ensellerid%") != -1) {
							  url = url.replace('%ensellerid%', abotapi.get_sellerid());
							}
				
							if (url.indexOf("%wxa_openid%") != -1) {
							  url = url.replace('%wxa_openid%', abotapi.get_current_openid());
							}
				
							that.abotapi.call_h5browser_or_other_goto_url(url, var_list);
				
							return;
				
						  } else {
							uni.showToast({
							  title: '非法操作.',
							  duration: 2000
							});
						  }
						},
						error: function (e) {
						  uni.showToast({
							title: '网络异常！',
							duration: 2000
						  });
						}
					  });
				
					  return;
				
					};
				
					that.abotapi.call_h5browser_or_other_goto_url(url, var_list, 'user_index');		
				
			},
			
			
			
			getNewMsg: function(msg){
				
				console.log('getNewMsg=====',msg)
				
				var that = this;	
				
				that.cache_msg_page_size_isHistoryLoading = true;
				that.cache_msg_page_roll_bottom = false;
				var userInfo = that.abotapi.get_user_info();
					console.log('that.pageOn==',that.pageOn)	
					if(that.pageOn){	
						
						//console.log('that.pageOn==',that.pageOn)
						//console.log('00000000')
						
						that.weiliao_storage_groupid_show = false;
						
						if(msg.msg.fabaouserinfo && msg.msg.fabaouserinfo.uid == msg.msg.userinfo.uid){
							console.log('1111111')
							if(msg.msg.userinfo.uid == that.myuid){
								msg.msg.content = { text: '你领取了自己的红包' };
							} 
							
							
						}else{
							console.log('2222222')
							if(msg.msg.fabaouserinfo && msg.msg.fabaouserinfo.uid == that.myuid){
								msg.msg.content = { text: msg.msg.userinfo.username + '领取了你的红包' }
							} else if(msg.msg.fabaouserinfo && msg.msg.fabaouserinfo.uid != that.myuid){
								msg.msg.content = { text: '你领取了' +  msg.msg.fabaouserinfo.username + '的红包' }
							}
							
						}
						
						console.log('3333333')
						
						var is_not_self_msg = true;
						
						// if(!msg.msg.fabaouserinfo){
						// 	is_not_self_msg = msg.msg.userinfo.uid != userInfo.userid;
						// }
						
						console.log('is_not_self_msg====', is_not_self_msg)
						if(msg.chat_type == 0){
							console.log('666666')
							if(is_not_self_msg && msg.msg.userinfo.uid == that.userid
							 || msg.msg.userinfo.uid == userInfo.userid){
								that.screenMsg(msg);
								console.log('清空消息')
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
						else {
							
							//console.log('msg.msg.userinfo.uid',msg.msg.userinfo.uid)
					
							
							if(is_not_self_msg && msg.msg.groupinfo.groupid == that.groupid){
								console.log('清空未读消息')
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
								 })
							}
						}
					}
						
			},
			
			
			
			
			
			send_text_to_service:function(msg, type){
				//console.log('myuid======00', this.myuid);
				
				var that = this;
				
				console.log('msg====0',msg)
						
				var content = encodeURIComponent(JSON.stringify(msg))
				
				
				var userInfo = that.abotapi.get_user_info();
				
				if (!userInfo) {
					
					var last_url = '/pages/main/main';
					
					this.abotapi.goto_user_login(last_url);
					
					return;
				}
				console.log('userinfo',userInfo)
				
				var data_params = {
					   action: 'add',
					   sellerid: that.abotapi.globalData.default_sellerid,
					   chat_msg: content,
					   from: 'chatapp',
					   userid:userInfo.userid,
					   checkstr: userInfo.checkstr,
					   
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
				
				
				
				if(type == 'redEnvelope'){
					data_params.is_redpackage = 1;
				}
						
				
				
				//设置黑名单
				if(that.textMsg.indexOf('黑名单@') != -1){
					uni.request({
						 url: that.abotapi.globalData.yanyubao_server_url + '/openapi/GroupData/set_blacklist',
						 data: {
							groupid: that.groupid,
							sellerid: that.abotapi.globalData.default_sellerid,
							userid: userInfo.userid,
							set_userid: that.set_userid,
							type: 'add'
						 },
						 header: {
						   "Content-Type": "application/x-www-form-urlencoded"
						 },
						 method: "POST",
						 success: function (res) {
						   console.log('set_blacklist=', res);
							   
							var	data = res.data;
							if(data.code == 0){
								uni.showToast({
									title: data.msg,
									duration: 2000,
									icon: 'none'
								})
							}
							
						 }
					})
				} 
				else if(that.textMsg == '查'){
					console.log('查111')
					uni.request({
						 url: that.abotapi.globalData.yanyubao_server_url + '/openapi/RedPackageData/user_cha_red_redpackage_data',
						 data: {
							userid: userInfo.userid,
							sellerid: that.abotapi.globalData.default_sellerid,		
							groupid: that.groupid,
						 },
						 header: {
						   "Content-Type": "application/x-www-form-urlencoded"
						 },
						 method: "POST",
						 success: function (res) {
						   console.log('set_blacklist=', res);
							   
							var	data = res.data;
							if(data.code == 0){
								uni.showToast({
									title: data.msg,
									duration: 2000,
									icon: 'none'
								})
							}
							
						 }
					})
				} 
				else if(that.textMsg.indexOf('查@') != -1){
					console.log('查222')
					uni.request({
						 url: that.abotapi.globalData.yanyubao_server_url + '/openapi/RedPackageData/user_cha_red_redpackage_data',
						 data: {
							userid: that.set_userid,
							sellerid: that.abotapi.globalData.default_sellerid,		
							groupid: that.groupid,
							admin_userid: userInfo.userid,
						 },
						 header: {
						   "Content-Type": "application/x-www-form-urlencoded"
						 },
						 method: "POST",
						 success: function (res) {
						   console.log('set_blacklist=', res);
							   
							var	data = res.data;
							if(data.code == 0){
								uni.showToast({
									title: data.msg,
									duration: 2000,
									icon: 'none'
								})
							}
							
						 }
					})
				}
				
				
				
				//在界面上显示发送的消息
				that.screenMsg(msg);
				
				var textMsg001 = that.textMsg;
				
				that.textMsg = ''; //清空输入框
				
				
				// 正式发送发送消息
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
							//发送失败
							uni.showToast({
								title: res.data.msg,
								duration: 2000,
								icon: 'none'
							});
						  
							that.textMsg = textMsg001;

						} 
						else if(res.data.code == -1){
				
							uni.showModal({
								title: '提示',
								content:'登录超时，请重新登录',
								showCancel: false,
								success: function (res) {
									
									that.abotapi.del_user_info();
									
									var last_url = '/pages/main/main';
									
									that.abotapi.goto_user_login(last_url);
									
									
					
									return;
								},
							});
						  
						}else{
						  //发送成功，界面上已经变化了，所以这里不需要处理
						}
					 
					  
					}
				})
			},
			
			

			toUserInfo:function(){
				uni.navigateTo({
					url: '../userInfo/userInfo'
				});
			},
			toFriendInfo:function(item){
				uni.navigateTo({
					url: '../friendInfo/friendInfo?userid=' + item.uid,
				});
			},
			
			linkWebSocket:function(){
				
			},

			// 接受消息(筛选处理)
			screenMsg(msg) {
				console.log('dddddd',this.myuid);
				//从长连接处转发给这个方法，进行筛选处理
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
					// 用户消息
					switch (msg.msg.type) {
						case 'text':
							this.addTextMsg(msg);
							break;
						case 'voice':
							this.addVoiceMsg(msg);
							break;
						case 'img':
							console.log('000000000',msg);
							this.addImgMsg(msg);
							break;
						case 'redEnvelope':
							this.addRedEnvelopeMsg(msg);
							break;
						default:
							this.addTextMsg(msg);
							break;
					}
				}
				if(this.cache_msg_page_roll_bottom == true){
					this.$nextTick(function() {
						// 滚动到底
						this.scrollToView = 'msg' + msg.msg.id;
						
						console.log('123456789123456',this.scrollToView)
					});
					
				}
				
				
			},
			

			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e) {
				var that = this;
				
				that.cache_msg_page_size_isHistoryLoading = false;
				
				console.log('cache_msg_page_size_isHistoryLoading',that.cache_msg_page_size_isHistoryLoading)
				var userInfo = that.abotapi.get_user_info();
				var new_msglist = [];
				if(that.userid){
					var cache_msglist = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid);			
					
					var a = cache_msglist.length;
					var from_msg_list = (that.cache_msg_page_num + 1) * that.cache_msg_page_size
					var from = a - from_msg_list;
					var to = from + 10 ;
					
					if(to<= 0){
						return
					}
					if(from <= 0){
						from = 0
					}
					
					that.cache_msg_page_num ++ ;
					
					var i_begin = 0;
					if(cache_msglist.length > from_msg_list){
						i_begin = from;
					}
					
					
					
					
					
					for(var ii=i_begin; ii<cache_msglist.length; ii++){
						var msgItem = cache_msglist[ii];
						
						cache_msglist[ii].msg.userinfo.username = '';
						
						new_msglist.push(msgItem);
					}
					
					
				}
				
				
				
				if(that.groupid){
					var cache_msglist = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid);
					
					console.log('cache_msglist',cache_msglist)
					var a = cache_msglist.length;
					var from_msg_list = (that.cache_msg_page_num + 1) * that.cache_msg_page_size
					var from = a - from_msg_list;
					var to = from + 10 ;
					
					if(to<= 0){
						return
					}
					if(from <= 0){
						from = 0
					}
					
					that.cache_msg_page_num ++ ;
					console.log('计数',that.cache_msg_page_num)
					var i_begin = 0;
					if(cache_msglist.length > from_msg_list){
						i_begin = from;
					}
					
					
					//读取通讯录中的好友列表
					
					var contact_list = uni.getStorageSync('friendList_cache');
					
					var contact_list002 = [];
					for(var key in contact_list){
						var contact_list001 = contact_list[key];
						
						for(var i=0;i<contact_list001.length;i++){
							contact_list002.push(contact_list001[i]);
						}
					}
					
					//循环读取聊天记录
					
					for(var ii=i_begin; ii<cache_msglist.length; ii++){
						var msgItem = cache_msglist[ii];
						//console.log('asdqwerrter',msgItem)
						var userInfo = msgItem.msg.userinfo;
						
						for(var j=0; j<contact_list002.length; j++){
							if(cache_msglist[ii].msg.userinfo.uid == contact_list002[j].userid){
								if(contact_list002[j].buddy_remarks){
									cache_msglist[ii].msg.userinfo.username = contact_list002[j].buddy_remarks;
									
								}
							}
						
						}
						new_msglist.push(msgItem);
						
					}
					
					
				}
				//console.log('111111111111======', cache_msglist)
				//console.log('this.msgList========2',uni.getStorageSync('cache_msglist_userid_'+userinfo.uid+'_and_groupid_'+this.groupid));
				
				//that.cache_msglist = new_msglist ? new_msglist : [];
				that.cache_msglist = new_msglist ? new_msglist : [];
				
				setTimeout(function() {
					
				/* 	that.setSesstion(that.sesstion); */
					that.getMsgList(that.sesstion);
					
					// that.getMsgList(option.sesstion);
				}, 100); 			
				
				that.isHistoryLoading = false; //参数作为进入请求标识，防止重复请求
			
			},
			// 加载初始页面消息
			getMsgList(sesstion) {
				// 消息列表
				// let ylist = helper.GetChatMsg(sesstion);
				var that = this;
				that.weiliao_storage_groupid_show = false;	
				let ylist = that.cache_msglist;
				
				var list = [
					// {type:"user",msg:{id:11,type:"card",time:"12:56",userinfo:{uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg"},content:{blessing:"恭喜发财",rid:1,isReceived:false}}},
					// {type:"user",msg:{id:11,type:"product",time:"12:56",userinfo:{uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg"},content:{blessing:"恭喜发财",rid:1,isReceived:false}}},
					// {type:"system",msg:{id:0,type:"time",content:{text:"晚上 22:33"}}},
					// {type:"user",msg:{id:11,type:"web",time:"12:56",userinfo:{uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg"},content:{blessing:"恭喜发财",rid:1,isReceived:false}}},
					// {type:"system",msg:{id:0,type:"product",content:{text:"欢迎进入HM-chat聊天室"}}}
					];
					
				for (var i = 0; i < ylist.length; i++) {
					list.push(ylist[i]);
				}
				console.log('==================>>>>>>>>>>>>>>>>>++++++++++++>>>>>>>>>>>>',list)
		
			/* 	for (var i = 0; i < list.length; i++) {
					list[i].msg.id = i;
				} */

				// 获取消息中的图片,并处理显示尺寸
				for (let i = 0; i < list.length; i++) {
					if (list[i].type == 'user' && list[i].msg.type == 'img') {
						list[i].msg.content = this.setPicSize(list[i].msg.content);
				
						this.msgImgList.push(list[i].msg.content.text);
					}
				}
				
				
				
				this.msgList = list;
				//console.log('msglist000000000000000002',this.msgList)
				//console.log('88889sss99===',list);
				
				// 滚动到底部
				
				if(that.cache_msg_page_size_isHistoryLoading == true){
					this.$nextTick(function() {
						//进入页面滚动到底部
						
						console.log('滑动到底部')
						
						this.scrollTop = 9999;
						
						this.$nextTick(function() {
							this.scrollAnimation = true;
						});
					});
					
				}
				
				
				
				var productInfo = uni.getStorageSync('productInfo');
				
				if(productInfo){
					uni.removeStorageSync('productInfo');
					
					// let productInfo = {
					// 	'product_img': that.goods_detail.picture,
					// 	'product_name': that.goods_detail.name,
					// 	'title': '快去探索这个宝贝吧'
					// }
					
					//msg为图片地址
					var img_url = productInfo.product_img;
					let msg = {
							text: img_url
						};			
						uni.getImageInfo({  
							src: img_url,  
							success: function (image) {  
								console.log('image====',image)
								msg.w = image.width;
								msg.h = image.height;
							}							  
						}); 									
					that.sendMsg(msg, 'img');
					msg = { text: productInfo.product_name};
					this.sendMsg(msg, 'text');
					msg = { text: productInfo.title};
					this.sendMsg(msg, 'text');			
				}
				
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content) {
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350); //350是定义消息图片最大宽度
				let maxH = uni.upx2px(350); //350是定义消息图片最大高度
				
				let scale = content.w / content.h;
				console.log('图片比例==', scale);
				/*
				if (content.w > maxW || content.h > maxH) {
					content.w = scale > 1 ? maxW : maxH * scale;
					content.h = scale > 1 ? maxW / scale : maxH;
				}*/
				
				if(content.w > maxW){
					content.w = maxW;				
					content.h = content.w / scale;
					
					console.log('wwwwww',content.h,content.w)
				}
				else if(content.h > maxH){
					content.h = maxH;
					content.w = content.h * scale;
					console.log('hhhhhhhhhh',content.h,content.w)
				}
			
				console.log('转换后的图片尺寸：', content);
				
				return content;
			},

			//更多功能(点击+弹出)
			showMore() {
				this.isVoice = false;
				this.hideEmoji = true;
				if (this.hideMore) {
					this.hideMore = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer() {
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer() {
				this.popupLayerClass = '';
				setTimeout(() => {
					this.hideMore = true;
					this.hideEmoji = true;
				}, 150);
			},
			// 选择图片发送
			chooseImage() {
				this.getImage('album');
			},
			//拍照发送
			camera() {
				this.getImage('camera');
			},
			//发红包
			handRedEnvelopes() {
				let url = 'hand/hand?chat_type=' + this.chat_type
				if(this.chat_type == 0){
					url += '&userid=' + this.userid;
				} else {
					url += '&groupid=' + this.groupid;
				}
				
				uni.navigateTo({
					url: url
				});
				this.hideDrawer();
			},
			//选照片 or 拍照
			getImage(type) {
				var that = this;
				this.hideDrawer();
				// uni.chooseImage({
				// 	sourceType: [type],
				// 	sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				// 	success: res => {
				// 		helper.SendImgs(this, res.tempFilePaths);
				// 	}
				// });
				
				
				uni.chooseImage({
					 // count: 1, // 默认9
					  sourceType: [type],
					  sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					  success: function (res) {
				
						console.log(res,'ddd')
						
				
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						var tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
						  //url: 'http://192.168.0.205:81/index/upload/uploadImg',      //此处换上你的接口地址
						  url: that.abotapi.globalData.yanyubao_server_url + '/Yanyubao/ShopApp/upload_image_file_without_user', 
						  // url: 'https://yanyubao.tseo.cn/Yanyubao/ShopApp/upload_image_file_without_user', 
						  filePath: tempFilePaths[0],
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
						  success: function (res) {
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

								uni.getImageInfo({  
									src: img_url,  
									success: function (image) {  
										console.log('image====',image)
										msg.w = image.width;
										msg.h = image.height;
									}							  
								}); 						
								
							that.sendMsg(msg, 'img')
							
						  },
						  fail: function (res) {
							  
							console.log('fail');
										
						  }
						})
						
						//that.getMsgList();
					  }
					})
				
				

				
			},
			// 选择表情
			chooseEmoji() {
				this.hideMore = true;
				if (this.hideEmoji) {
					this.hideEmoji = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			//添加表情
			addEmoji(em) {
				this.textMsg += em.alt;
			},

			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus(e) {

				var height = e.detail.height;
				 
				if (this.popupLayerClass == 'showLayer' && this.hideMore == false) {
					this.hideDrawer();
				} 
				
				
			},
			textareaInput(e) {
				var textMsg = e.detail.value;
				console.log('e===', e);
				
				console.log('this.textMsg===',this.textMsg);
				
				// console.log('11111111111',textMsg.indexOf("@") )
				console.log('@1111111====',this.is_check_act)
				if(this.is_check_act){	
					var textMsg_sub  = textMsg.substr(textMsg.length-1,1);
					console.log('textMsg_sub',textMsg_sub)
					if(textMsg_sub == '@'){
						
						uni.navigateTo({
							url: '/pages/groupInfo/groupMemberList?groupid=' + this.groupid
						})
					}
					/* if(textMsg.indexOf("@") != -1){
						this.is_check_act = false;
						uni.navigateTo({
							url: '/pages/groupInfo/groupMemberList?groupid=' + this.groupid
						})
					} */				
				} else {
				
					this.is_check_act = true;
				}
				
				
			},
			input_queren:function(){
				this.sendText();
			},
			// 发送文字消息
			sendText() {
				this.hideDrawer(); //隐藏抽屉
				if (!this.textMsg) {
					return;
				}
				this.cache_msg_page_size_isHistoryLoading = true;
				
				this.cache_msg_page_roll_bottom = true;
				this.weiliao_storage_groupid_show = true;
				this.textMsg = this.textMsg.replace(/'/g,"");
				this.textMsg = this.textMsg.replace(/</g,"&lt;");
			
				console.log('88888888888999999999',this.textMsg)	
				let msg = { text: this.textMsg };
				console.log('88888888888',msg)
				this.sendMsg(msg, 'text');
				
				//this.textMsg = ''; //清空输入框
			},
			//替换表情符号为图片
			replaceEmoji(str) {
				console.log('str==',str)
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
					for (let i = 0; i < this.emojiList.length; i++) {
						let row = this.emojiList[i];
						for (let j = 0; j < row.length; j++) {
							let EM = row[j];
							if (EM.alt == item) {
								//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径
								//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
								//let onlinePath = 'https://s2.ax1x.com/2019/04/12/';							
								//let imgstr = '<img src="' + onlinePath + this.onlineEmoji[EM.url] + '">';
								
								let onlinePath = 'http://yanyubao.tseo.cn/Tpl/static/emoji/';						
								let imgstr = '<img style="width:24px;" src="' + onlinePath + EM.url + '">';
								
								return imgstr;
							}
						}
					}
				});
				
				console.log('replacedStr==',replacedStr)
				
				
				return '<div style="display: flex;align-items: center;word-wrap:break-word;flex-wrap: wrap;">' + replacedStr + '</div>';
			},

			// 发送消息
			sendMsg(content, type) {
				
				var that = this;
				
				var userAcountInfo = that.abotapi.get_user_account_info();
				var userInfo = that.abotapi.get_user_info();
			
				if (!userInfo) {
					
					var last_url = '/pages/main/main';
					
					that.abotapi.goto_user_login(last_url);
					
					return;
				}
			
			
				var msgList002 = [];
				if(that.chat_type==0){
					var msg003 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid);	
					//console.log('test===================0',uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'))	
					
				}else{
					var msg003 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid);	
					//console.log('test===================1',uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'))
					
				}
				
				for (var i = 0; i < msg003.length; i++) {
					msgList002.push(msg003[i]);
				}
				
				
				
				
				
				if (that.key == 'test') {
					return console.error('[System] 系统账户无法接收您发送的消息');
				}
				 
				console.log('组织内容');
				console.log('msglist000000000000000001',that.msgList)
				//实际应用中，此处应该提交长连接，模板仅做本地处理。
				var nowDate = new Date();
				let lastid = msgList002.length > 0 ? msgList002[msgList002.length - 1].msg.id : msgList002.length;
				// var userInfo = Global.UserInfo();
				lastid++;
				let msg = {
					type: 'user',
					msg: {
						id: lastid,
						time: nowDate.getHours() + ':' + nowDate.getMinutes(),
						type: type,
						userinfo: { uid: userInfo.userid, username: userAcountInfo.nickname, face: userAcountInfo.headimgurl },
						content: content
					},
					chat_type: 0,
				};
				
				console.log('判断群发');
				
				if(that.chat_type == 4){
					msg.chat_type = 4;
					msg.msg.groupinfo = {groupid: that.groupid};
				}
				
				
				

				msg.taskUserInfo = that.taskUserInfo;
				
				var msgTemplate = JSON.parse(JSON.stringify(msg));
				
				console.log('转换msg', msgTemplate);
				
				//that.chatPushMsg(msgTemplate);
				
				console.log('调用chatPushMsg函数');

				if (type == 'text') {
					msg.msg.content.text = that.replaceEmoji(msg.msg.content.text);
				}
				
				console.log('发请求');
			
				
				that.send_text_to_service(msg ,type);
				
				
				console.log('清空输入框');
				
				that.textMsg = '';
				
				// // 发送消息
				// this.screenMsg(msg);
			},

			// 添加文字消息到列表
			addTextMsg(msg) {
				console.log('msg000000',msg)
				
				var that = this;
				var userInfo = that.abotapi.get_user_info();
				var msgList002 = [];
			
				if(that.chat_type==0){
					var msg003 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid);	
					//console.log('test===================0',uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'))	
					
				}else{
					var msg003 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid);	
				//	console.log('test===================1',msg003)
					
				
				}
				if(msg003){
					for (var i = 0; i < msg003.length; i++) {
						msgList002.push(msg003[i]);
					}
				}
				
				
				//console.log('msglist000000000000000000',msgList002)
				//console.log('msgList002',msg)
				
				that.msgList.push(msg);//聊天列表显示
			
				msgList002.push(msg);	//聊天中的缓存
				
				
				if(that.chat_type==0){
					uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid,msgList002);	
					//console.log('test===================0',uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid))	
					
					//发送、接受消息，我的消息缓存列表改变
					var latestMsgList = uni.getStorageSync('latestMsgList_cache_' + userInfo.userid);
					//console.log('12456789',latestMsgList)
					var user_list  = [];
					var from_person_detail = {};
					for(i=0;i<latestMsgList.length;i++){
						
						user_list.push(latestMsgList[i].userid01);
						
						if(latestMsgList[i].userid01 = that.userid){
							latestMsgList[i].chat_type = 0;
							from_person_detail.headimgurl = that.friendInfo.headimgurl;
							from_person_detail.nickname =  that.friendInfo.nickname;
							from_person_detail.userid = that.userid;
							if(that.friendInfo.buddy_remarks){
								from_person_detail.nickname = that.friendInfo.buddy_remarks;
							}
							latestMsgList[i].from_person_detail = from_person_detail;
							
							latestMsgList[i].latest_msg = msg.msg.content.text;
							latestMsgList[i].msg_type = msg.type;
							
							latestMsgList[i].latest_time = msg.msg.time;
							
						}
					}
					
					
					//如果列表没有则追加
					var latestMsgList001 = {};
					
					if(user_list.indexOf(that.userid) == -1){
						latestMsgList001.chat_type = 0;
						
						if(that.friendInfo.buddy_remarks){
							from_person_detail.nickname = that.friendInfo.buddy_remarks;
						}
						
						from_person_detail.nickname = that.friendInfo.nickname;
						from_person_detail.headimgurl = that.friendInfo.headimgurl;
						from_person_detail.userid = that.userid;
						
						latestMsgList001.from_person_detail = from_person_detail;
						latestMsgList001.latest_msg = msg.msg.content.text;
						latestMsgList001.msg_type = msg.type;
						latestMsgList001.latest_time = msg.msg.time;
						
						
						latestMsgList.push(latestMsgList001);
						
						
					}
				
					uni.setStorage({
						key: 'latestMsgList_cache_' + userInfo.userid,
						data: latestMsgList
					})
					
				}else{
					uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid, msgList002);	
				
					
					//发送、接受消息，我的消息缓存列表改变
					var latestMsgList = uni.getStorageSync('latestMsgList_cache_' + userInfo.userid);
					//console.log('12456789',latestMsgList)
					var user_list  = [];
					var groupinfo ={};
				
					//如果列表没有则追加
					var latestMsgList001 = {};
					
				
					
					uni.setStorage({
						key: 'latestMsgList_cache_' + userInfo.userid,
						data: latestMsgList
					})
					
				}
				
				
								
			},
			// 添加语音消息到列表
			addVoiceMsg(msg) {
				var that = this;
				
				var userInfo = that.abotapi.get_user_info();
				var msgList002 = [];
				if(that.chat_type==0){
					var msg003 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid);	
					
				}else{
					var msg003 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid);	
					
				}
				
				for (var i = 0; i < msg003.length; i++) {
					msgList002.push(msg003[i]);
				}
				console.log('msglist000000000000000000',msgList002)
				console.log('msgList002',msg)
				
				that.msgList.push(msg);
							
				msgList002.push(msg);	
				
				
				var userInfo = that.abotapi.get_user_info();
				if(that.chat_type==0){
					uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid, msgList002);
					
					
				}else{
					uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid, msgList002);
					
				}
				
			},
			// 添加图片消息到列表
			addImgMsg(msg) {
				
				var that = this;
				
				var userInfo = that.abotapi.get_user_info();
				var msgList002 = [];
				if(that.chat_type==0){
					var msg003 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid);	
					
				}else{
					var msg003 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid);	
					
				}
				
				for (var i = 0; i < msg003.length; i++) {
					msgList002.push(msg003[i]);
				}
				
				
				console.log('ssssss==', msg);
				console.log('ssssss==', msg.msg.content);
				msg.msg.content = that.setPicSize(msg.msg.content);
				
				var userInfo = that.abotapi.get_user_info();
				that.msgImgList.push(msg.msg.content.text);
				that.msgList.push(msg);
				msgList002.push(msg);	
				
				console.log('添加图片',msg);
				
				if(that.chat_type==0){
					uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid, msgList002);	
					
				}else{
					uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid, msgList002);	
					
				}
			},
			addRedEnvelopeMsg(msg) {
				var that = this;
				
				var userInfo = that.abotapi.get_user_info();
				var msgList002 = [];
				if(that.chat_type==0){
					var msg003 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid);	
					
				}else{
					var msg003 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid);	
					
				}
				
				for (var i = 0; i < msg003.length; i++) {
					msgList002.push(msg003[i]);
				}
				console.log('msglist000000000000000000',msgList002)
				console.log('msgList002',msg)
				
				that.msgList.push(msg);
							
				msgList002.push(msg);	
				
				
				var userInfo = that.abotapi.get_user_info();
				
				console.log('addRedEnvelopeMsg',msg)
				if(that.chat_type==0){
					uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid, msgList002);	
					
				}else{
					uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid, msgList002);	
					
				}
					

			},
			// 添加系统文字消息到列表
			addSystemTextMsg(msg) {
				var that = this;
				
				var userInfo = that.abotapi.get_user_info();
				var msgList002 = [];
				if(that.chat_type==0){
					var msg003 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid);	
					
				}else{
					var msg003 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid);	
					
				}
				
				for (var i = 0; i < msg003.length; i++) {
					msgList002.push(msg003[i]);
				}
				console.log('msglist000000000000000000',msgList002)
				console.log('msgList002',msg)
				
				that.msgList.push(msg);
							
				msgList002.push(msg);	
				
			},
			// 添加系统红包消息到列表
			addSystemRedEnvelopeMsg(msg) {
				var that = this;
				
				
				var userInfo = that.abotapi.get_user_info();
				var msgList002 = [];
				if(that.chat_type==0){
					var msg003 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid);	
					
				}else{
					var msg003 = uni.getStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid);	
					
				}
				
				for (var i = 0; i < msg003.length; i++) {
					msgList002.push(msg003[i]);
				}
				console.log('msglist000000000000000000',msgList002)
				console.log('msgList002',msg)
				
				that.msgList.push(msg);
							
				msgList002.push(msg);	
				
				var userInfo = that.abotapi.get_user_info();
				
				if(that.chat_type==0){
					uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_friendid_'+that.userid, that.msgList);	
					
				}else{
					uni.setStorageSync('cache_msglist_userid_'+userInfo.userid+'_and_groupid_'+that.groupid, that.msgList);	
					
				}
			},
			// 打开红包
			openRedEnvelope(msg, index) {
				let that = this;
				
				uni.showLoading({
					title: '加载中...'
				});
	
				that.redEnvelopeWeixinMsg = msg;
				that.redEnvelopeWeixinIndex = index;
				
				let rid = msg.content.rid;
				uni.showLoading({
					title: '加载中...'
				});
				console.log('index: ' + index);
				console.log('123456789',msg)
				
				this.redenvelopeData = {
					rid: rid, //红包ID
					from: msg.userinfo.username,
					face: msg.userinfo.face,
					blessing: msg.content.blessing,
					money: msg.content.money,
					kouling: msg.content.kouling,
				};
				console.log('444444444===44444444444444======',msg.content.kouling)
				console.log('444444444===44444444444444======',this.redenvelopeData)
				if (!msg.content.isReceived) {
								
					var nowDate = new Date();
					let lastid = that.msgList.length > 0 ? that.msgList[that.msgList.length - 1].msg.id : that.msgList.length;
						lastid++;
						
						
					var userInfo = that.abotapi.get_user_info();
					var userAcountInfo = that.abotapi.get_user_account_info();
					
					console.log('444444444=========',userAcountInfo)
					//领取红包消息
					let msg2 = {
							type: 'system',
							msg: {
								id: lastid,
								time: nowDate.getHours() + ':' + nowDate.getMinutes(),
								type: 'redEnvelope',
								userinfo: { uid: userInfo.userid, username: userAcountInfo.nickname, face: userAcountInfo.headimgurl },
								fabaouserinfo: {uid: msg.userinfo.uid, username: msg.userinfo.username, face: msg.userinfo.face},
								content: '',
								kouling:msg.content.kouling,
							},
							chat_type: 0,
						};
							
						if(that.chat_type == 4){
							msg2.chat_type = 4;
							msg2.msg.groupinfo = {groupid: that.groupid};
						}
							
					
					var content = encodeURIComponent(JSON.stringify(msg2))
					
					that.__receive_red_Package(that, that.callback_open_red_package);
					
					
				}
					
				uni.hideLoading();
				that.windowsState = 'show';
				
			},
			callback_open_red_package:function(that, res_data ){
				console.log('111111111111111111111222222211111=======', res_data)
				
				let msg = that.redEnvelopeWeixinMsg;
				
				let index = that.redEnvelopeWeixinIndex;
				console.log('11111111111111111111111111=======', msg)
				console.log('11111111111111111111111111=======', msg)
				if(res_data.code == 1){
					
					that.redenvelopeData.money = res_data.data;
					that.msgList[index].msg.content.money = res_data.data;
					
					// {type:"system",msg:{id:8,type:"redEnvelope",content:{text:"你领取了售后客服008的红包"}}},
					//that.sendSystemMsg({ text: '你领取了' + (msg.userinfo.uid == that.myuid ? '自己' : msg.userinfo.username) + '的红包' }, 'redEnvelope');
					console.log('that.msgList[index]: ' + JSON.stringify(that.msgList[index]));
					that.msgList[index].msg.content.isReceived = true;
					that.receive_redpackage = false;
					uni.navigateTo({
						url: '/pages/chat/details/details?rid=' + msg.content.rid
					});
							
							
					
				} 
				else if(res_data.code == 2){
					
					that.receive_redpackage = true;
					console.log('111111111115555555',that.receive_redpackage)
					
				}
				else if(res_data.code == 3){
					that.receive_redpackage = false;
					uni.showModal({
						title: '提示',
						content: '口令错误！',
						showCancel: false,
						
					});
					
					that.receive_redpackage = true;
					
				}
				else {
					
					that.redenvelopeData.money = res_data.msg;
					that.msgList[index].msg.content.money = res_data.msg;			
					console.log('that.msgList[index]: ' + JSON.stringify(that.msgList[index]));
					
					uni.navigateTo({
						url: '/pages/chat/details/details?rid=' + msg.content.rid
					});
				}
				
				
				
				
				
				
			},
			__receive_red_Package:function(that, callback_open_red_package){
			
				let msg = that.redEnvelopeWeixinMsg;
				let index = that.redEnvelopeWeixinIndex;
				
				console.log('1111111111122223333332',msg)
				console.log('1111111111122223333332',msg)
				
				
				let rid = msg.content.rid;
				
				uni.showLoading({
					title: '加载中...'
				});
				
				setInterval(() => {
					uni.hideLoading();
				}, 1000);
				
				console.log('index: ' + index);
				
				that.redenvelopeData = {
					rid: rid, //红包ID
					from: msg.userinfo.username,
					face: msg.userinfo.face,
					blessing: msg.content.blessing,
					money: msg.content.money,
					kouling:msg.content.kouling,
				};
				if (!msg.content.isReceived) {
								
					var nowDate = new Date();
					let lastid = that.msgList.length > 0 ? that.msgList[that.msgList.length - 1].msg.id : that.msgList.length;
						lastid++;
					
					
					var userAcountInfo = that.abotapi.get_user_account_info();
					var userInfo = that.abotapi.get_user_info();
					//领取红包消息
					let msg2 = {
						type: 'system',
						msg: {
							id: lastid,
							time: nowDate.getHours() + ':' + nowDate.getMinutes(),
							type: 'redEnvelope',
							userinfo: { uid: userInfo.userid, username: userAcountInfo.nickname, face: userAcountInfo.headimgurl },
							fabaouserinfo: {uid: msg.userinfo.uid, username: msg.userinfo.username, face: msg.userinfo.face},
							content: '',
								
						},
						chat_type: 0,
					};
							
					if(that.chat_type == 4){
						msg2.chat_type = 4;
						msg2.msg.groupinfo = {groupid: that.groupid};
					}
							
					
					var content = encodeURIComponent(JSON.stringify(msg2));
					
					
					var post_data = {
							userid: userInfo.userid,						
							sellerid: that.abotapi.globalData.default_sellerid,
							redpackageid: rid,
							chat_msg: content,
					};
					
					if(that.kouling_str){
						post_data.kouling = that.kouling_str;
					}
					
								
					uni.request({
						 url: that.abotapi.globalData.yanyubao_server_url + '/openapi/RedPackageData/receive_red_Package',
						 data: post_data,
						 header: {
						   "Content-Type": "application/x-www-form-urlencoded"
						 },
						 method: "POST",
						 success: function (res) {
							 
							console.log('receive_red_Package====', res);
							let res_data = res.data;
							
							typeof callback_open_red_package == "function" && callback_open_red_package(that, res_data);
						   
						   
							
							
							
							
						 }
					})
				}
			},
			openRedEnvelopeWeixin:function(msg, index){
				uni.showLoading({
					title: '加载中...'
				});
				let rid = msg.content.rid;
				this.redEnvelopeWeixinMsg = msg;
				this.redEnvelopeWeixinIndex = index;
				
				this.redenvelopeData = {
					rid: rid, //红包ID
					from: msg.userinfo.username,
					face: msg.userinfo.face,
					blessing: msg.content.blessing,
					money: msg.content.money
				};
				
				
				uni.hideLoading();
				this.windowsState = 'show';
			},
			
			
			// 关闭红包弹窗
			closeRedEnvelope() {
				this.windowsState = 'hide';
				setTimeout(() => {
					this.windowsState = '';
				}, 200);
			},
			close_popup_red_package(){
				var that = this;
				that.receive_redpackage = false;
				that.closeRedEnvelope();
			},
			redpackage_kouling(e){
				console.log('8888888888888',e)
				this.kouling_str = e.detail.value;
			},
			btn_red_package_kouling(){
				
				var that = this;
				
				that.__receive_red_Package(that, that.callback_open_red_package);
			},
			sendSystemMsg(content, type) {
				let lastid = this.msgList[this.msgList.length - 1].msg.id;
				lastid++;
				let row = { type: 'system', msg: { id: lastid, type: type, content: content } };
				this.screenMsg(row);
			},
			//领取详情
			toDetails(rid) {
				
				uni.navigateTo({
					url: '/pages/chat/details/details?rid=' + rid
				});
				
			},
			
			//领取详情微信版
			toDetailsWeixin(){
				
				let that = this;
				
				that.__receive_red_Package(that, that.callback_open_red_package);
				
					
				uni.hideLoading();
				that.windowsState = 'show';
				
			},
			
			// 预览图片
			showPic(msg) {
				
				console.log('88899', msg);
				uni.previewImage({
					indicator: 'none',
					current: msg.content.text,
					urls: this.msgImgList
				});
			},
			// 播放语音
			playVoice(msg) {
				this.playMsgid = msg.id;
				this.AUDIO.src = msg.content.text;

				this.$nextTick(function() {
					this.AUDIO.play();
				});
			},
			
			doRecordIng:function(e){
				var that = this;
				
				// #ifndef H5
				//录音开始事件
				// this.RECORDER.onStart(e => {
				// 	that.record_flag = true;
					
						// console.log('录音开始回调');
						// this.recordBegin(e);				
				// 		console.log('录音开始回调2', this.recordCount);
					
					
				// });
				//录音结束事件
				this.RECORDER.onStop(e => {
					if(that.record_flag){
						that.record_flag = false;
						
						console.log('录音结束回调');
						this.recordEnd(e);
					}
			
					
				});
				// #endif
			},
			
			// 录音开始
			voiceBegin(e) {
				this.recordBegin(e);
				this.record_flag = true;
				this.doRecordIng();
				
				console.log('录音开始000');
				if (e.touches.length > 1) {
					return;
				}
				this.initPoint.Y = e.touches[0].clientY;
				this.initPoint.identifier = e.touches[0].identifier;
				this.RECORDER.start({ format: 'mp3' }); //录音开始,
			},
			//录音开始UI效果
			recordBegin(e) {
				console.log('ssss',this.recordCount);
				
				
					this.recording = true;
					this.voiceTis = '松开 结束';
					this.recordLength = 0;
					this.recordTimer = setInterval(() => {
						this.recordLength++;
					}, 1000);
				
				
			},
			// 录音被打断
			voiceCancel() {
				this.recording = false;
				this.voiceTis = '按住 说话';
				this.recordTis = '手指上滑 取消发送';
				this.willStop = true; //不发送录音
				this.RECORDER.stop(); //录音结束
			},
			// 录音中(判断是否触发上滑取消发送)
			voiceIng(e) {
				if (!this.recording) {
					return;
				}
				let touche = e.touches[0];
				//上滑一个导航栏的高度触发上滑取消发送
				if (this.initPoint.Y - touche.clientY >= uni.upx2px(100)) {
					this.willStop = true;
					this.recordTis = '松开手指 取消发送';
				} else {
					this.willStop = false;
					this.recordTis = '手指上滑 取消发送';
				}
			},
			// 结束录音
			voiceEnd(e) {
				if (!this.recording) {
					return;
				}
				this.recording = false;
				this.voiceTis = '按住 说话';
				this.recordTis = '手指上滑 取消发送';
				this.RECORDER.stop(); //录音结束
			},
			//录音结束(回调文件)
			recordEnd(e) {
				var that = this;
				clearInterval(this.recordTimer);
				if (!this.willStop) {
					var msg = {
						length: 0,
						url: e.tempFilePath
					};
					let min = parseInt(this.recordLength / 60);
					let sec = this.recordLength % 60;
					min = min < 10 ? '0' + min : min;
					sec = sec < 10 ? '0' + sec : sec;
					msg.length = min + ':' + sec;

					var msg_length = msg.length

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
				  //supplierid: abotapi.globalData.current_supplierid,
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
							text: img_url,
							length: msg_length
						};
					
					that.sendMsg(msg, 'voice');
				 }
				
			})

					// helper.SendVoice(this, msg.length, e.tempFilePath);
				} else {
					console.log('取消发送录音');
				}
				this.willStop = false;
			},
			// 切换语音/文字输入
			switchVoice() {
				this.hideDrawer();
				this.isVoice = this.isVoice ? false : true;
			},
			discard() {
				return;
			},
			selectNoTip:function(e){
				this.noTip = e.detail.value[0];			
			},
			selectAgree:function(type){
				if(type == 0){
					uni.navigateBack({
						delta:1
					})
				}else{
					if(this.noTip == 1){
						let currentTime = Date.parse(new Date());
						let noTipTime = currentTime  + 30*24*60*60*1000;
									
						uni.setStorageSync('noTipTime',noTipTime);		
							
					}				
					this.chat_xieyi_status = 0;
				}
			},
			addFirendTips:function(){
				uni.showToast({
					title: '禁止查看！',
				})
			},
			
			
			//获取通讯录好友列表
			getFriendsList:function(){
				var that = this;
				var userInfo = that.abotapi.get_user_info();
				uni.request({
				  url: that.abotapi.globalData.yanyubao_server_url + '/openapi/BuddyData/buddy_action',
				  data:{
					  action: 'list',
					  userid01: userInfo.userid,
					  sellerid: that.abotapi.globalData.default_sellerid,
				  },
				  header: {
				    "Content-Type": "application/x-www-form-urlencoded"
				  },
				  method: "POST",
				  success: function (res) {
					  console.log('ddddd',res);
					  var data = res.data;
						if(data.code == 1){
						
							uni.setStorageSync('friendList_cache', data.data);
							
							
						}else{
							uni.removeStorageSync('friendList_cache');							
							that.friendList = [];
						}
				  }
				});
			},
		}
	};
</script>
<style lang="scss">
@import '@/static/css/style.scss';

</style>
<style>
	.showLayer {
		-webkit-transform: translate3d(0, -310rpx, 0);
		transform: translate3d(0, -310rpx, 0);
	}
	.showDetails-diff{
			bottom: 170upx !important;
			font-size: 24px !important;
			border: 4upx solid !important;
			width: 100px !important;
			height: 100px !important;
			border-radius: 50% !important;
			padding: 0 !important;
			margin-left: 33%;
	}
	.box2{
		flex-direction: column;
	}
	.box2 :nth-child(2){
		font-size: 20upx;
	}
	.icon-layer-img{
		width: 70upx;
		height: 70upx;
	}
	.wx-popup {
	  position: absolute;
	  left: 0;
	  top: 0;
	  width: 100%;
	  height: 100%;
	  background: rgba(0, 0, 0, .5);
	}
	.popup-container {
	  position: absolute;
	  left: 50%;
	  top: 50%;
	 
	  width: 80%;
	  max-width: 600rpx;
	  border: 2rpx solid #ccc;
	  border-radius: 10rpx;
	  box-sizing: bordre-box;
	  transform: translate(-50%, -50%); 
	  overflow: hidden;
	  background: #fff;
	}
	.wx-popup-title {
	  padding: 20rpx;
	  text-align: center;
	  font-size: 28rpx;
	  border-bottom: 2rpx solid red;
	}
	
	.wx-popup-subtitle{
	  text-align:center;
	  font-size:28rpx;
	  color:#6798E9;
	  margin-top:26rpx;
	}
	.wx-popup-con {
	  margin: 60rpx 10rpx;
	  text-align: center;
	  font-size:28rpx;
	  margin-top:20rpx;
	  padding: 0 5%;
	}
	.wx-popup-btn {
	  display: flex;
	  justify-content: space-around;
	  margin-bottom: 40rpx;
	}
	.wx-popup-cb{
		padding: 0 5%;
		margin-bottom: 40upx;
	}
	.wx-popup-cb checkbox-group{
		display: flex;
		align-items: center;
	}
	
	.wx-popup-cb checkbox{
		zoom: 0.7;
		margin-right: 20rpx;
	}
	
	.wx-popup-btn text {
	  display:flex;
	  align-items:center;
	  justify-content:center;
	  width:33%;
	  height:70rpx;
	  border-radius:88rpx;
	  background:#6798E9;
	  color:#fff;
	  font-size:28rpx;
	}
	
	.wx-popup-content{
	  max-height: 300px;
	  text-align: left;
	  white-space: pre-line;
	}
	
	/* 弹窗 */
	.show_modal_mask{
		background-color: #000;
		opacity: 0.7;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1002;
	}
	.show_modal_pop{
		position: fixed;
		z-index: 1002;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	
	/* 红包口令 */
	.btn_red_kouling{
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		margin-top: 40rpx;
	}
	.red_backage_kouling_input{
		border: #999 solid 1rpx;
		width: 80%;
		margin-left: 70rpx;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 50rpx;
		text-align: center;
		margin-top: 20rpx;
	}
	
	/* 长按复制撤销删除 */
	.chexiao_shanchu_msg_myuid{
		float: right;
		margin-right: 100rpx;
	}
	.chexiao_shanchu_msg{
		float: left;
		margin-left: 100rpx;
	}
	.chexiao{
		font-size: 30rpx;
		padding: 5rpx;
	
	}
	.msg_bianji_revoke_chexiao{
		display: flex;
		background-color: #333333;
		color: #FFFFFF;
		width: 100rpx;
		padding-left: 30rpx;
		text-align: center;
		margin-bottom: 10rpx;
		border-radius: 10rpx;
	}
	
</style>
