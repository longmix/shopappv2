<template>
	<view>
	        <!-- <live-pusher id='livePusher' ref="livePusher" class="livePusher" url="rtmp://101619.livepush.myqcloud.com/live/tengyumall?txSecret=e809b255904e3bce90dcadd1bab34018&txTime=5EFAECD4"
	        mode="SD" :muted="true" :enable-camera="true" :auto-focus="true" :beauty="1" whiteness="2"
	        aspect="9:16" @statechange="statechange" @netstatus="netstatus" @error = "error"
	        ></live-pusher> -->
			<view class="fun-btn">
				<image class="btn" mode="widthFix" :src="is_push ? 'https://yanyubao.tseo.cn/Tpl/static/images/video_live/stop.png' : 'https://yanyubao.tseo.cn/Tpl/static/images/video_live/start.png'" @click="is_push ? stop() : start()"></image>
				<!-- <view>{{is_push}}</view> -->
				<!-- <button class="btn" @click="pause">暂停推流</button>
				<button class="btn" @click="resume">resume</button> -->
				<image class="btn" mode="widthFix" src="https://yanyubao.tseo.cn/Tpl/static/images/video_live/stop.png" @click="stop"></image>
				<image class="btn" mode="widthFix" src="https://yanyubao.tseo.cn/Tpl/static/images/video_live/snapshot.png" @click="snapshot"></image>
				<image class="btn" mode="widthFix" :src="is_camera_preview ? 'https://yanyubao.tseo.cn/Tpl/static/images/video_live/camera-off.png' : 'https://yanyubao.tseo.cn/Tpl/static/images/video_live/camera-on.png'" @click="is_camera_preview ? stopPreview() : startPreview()"></image>
				<!-- <image class="btn" mode="widthFix" src="https://yanyubao.tseo.cn/Tpl/static/images/video_live/camera-off.png" @click="stopPreview"></image> -->
				<image class="btn" mode="widthFix" src="https://yanyubao.tseo.cn/Tpl/static/images/video_live/camera-change.png" @click="switchCamera"></image>
			</view>
	</view>
</template>

<script>
 


export default {

	data() {
		return {
			is_push:0,
			is_camera_preview:0,
		};
	},
	onPageScroll: function (e) {
	
		
	},
	//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh: function () {
		
	},
	
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom: function () {
	
	},
	onLoad: function (options) {
		let userInfo = this.abotapi.get_user_info();



		
		if (!userInfo || !userInfo.userid) {
			let last_url = '/pages/live/live-pusher'
			this.abotapi.goto_user_login(last_url,'normal');		
			return;
		}
		
		const currentWebview = this.$mp.page.$getAppWebview()
		this.abotapi.abotRequest({
		  url: this.abotapi.globalData.yanyubao_server_url + 'openapi/VideoLiveData/get_live_player_and_product_list',
		  method: 'post',
		  data: {				
			live_userid: userInfo.userid,
			userid: userInfo.userid,
			checkstr: userInfo.checkstr,
			sellerid: this.abotapi.get_sellerid(),
		  },
		  header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		  },
		  success: (res) => {
			  console.log('set_plan_video_live=====',res)
			  let data = res.data;
			
			
			
		  },
		  error: function (e) {
			uni.showToast({
			  title: '网络异常！',
			  duration: 2000,
			});
		  },
		});
		
		
		
	},
	onShow:function(){
		
		
	},
	 onReady() {
	            // 注意：需要在onReady中 或 onLoad 延时
	            // this.context = uni.createLivePusherContext("livePusher", this);
				
				
				
				// 监听状态变化事件
				// this.pusher.addEventListener('statechange', function(e){
				// 	console.log('statechange1: '+JSON.stringify(e));
				// }, false);
				
				// this.statechange();
				
				
	},
	
	onUnload(){
		this.stop();
	},
	
	methods: {
		statechange() {
			
			// 监听状态变化事件
			this.pusher.addEventListener('statechange', function(e){
				console.log('statechange: '+JSON.stringify(e));
			}, false);
			
			// console.log("statechange:" + JSON.stringify(e));
		},
		netstatus() {
			// 监听状态变化事件
			this.pusher.addEventListener('netstatus', function(e){
				console.log('netstatus: '+JSON.stringify(e));
			}, false);
			// console.log("netstatus:" + JSON.stringify(e));
		},
		error() {
			this.pusher.addEventListener('error', function(e){
				console.log('error: '+JSON.stringify(e));
			}, false);
			console.log("error:" + JSON.stringify(e));
		},
		start: function() {
			let userInfo = this.abotapi.get_user_info();
			console.log('userInfo',userInfo.userid);
			console.log('userInfo',this.abotapi.get_sellerid());
			this.abotapi.abotRequest({
			  url: this.abotapi.globalData.yanyubao_server_url + 'openapi/VideoLiveData/set_video_live_list_and_logo_begin',
			  method: 'post',
			  data: {				
				userid: userInfo.userid,
				checkstr: userInfo.checkstr,
				sellerid: this.abotapi.get_sellerid(),
			  },
			  header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			  },
			  success: (res) => {
				  	console.log('set_video_live_list_and_logo_begin=====',res)
				  
				  let data = res.data;
				if(data.code = 1){
					
	
				}
			
				
			  },
			  error: function (e) {
				uni.showToast({
				  title: '网络异常！',
				  duration: 2000,
				});
			  },
			});
			
			
			
			this.pusher.start((a)=>{
				console.log("livePusher.start-a:" + JSON.stringify(a))
				this.is_push = 1;
			}, (b)=>{
				console.log("livePusher.start-b:" + JSON.stringify(b))
			});
			
		},
		close: function() {
			this.context.close({
				success: (a) => {
					console.log("livePusher.close:" + JSON.stringify(a));
				}
			});
		},
		snapshot: function() {
			
			this.pusher.snapshot((a)=>{
				console.log("snapshot.start-a:" + JSON.stringify(a))
			}, (b)=>{
				console.log("snapshot.start-b:" + JSON.stringify(b))
			});
			
		},
		resume: function() {
			
			this.pusher.resume((a)=>{
				console.log("resume.start-a:" + JSON.stringify(a))
			}, (b)=>{
				console.log("resume.start-b:" + JSON.stringify(b))
			});
			
		},
		pause: function() {
			this.context.pause({
				success: (a) => {
					console.log("livePusher.pause:" + JSON.stringify(a));
				}
			});
		},
		stop: function() {
			let userInfo = this.abotapi.get_user_info();
			
			this.abotapi.abotRequest({
			  url: this.abotapi.globalData.yanyubao_server_url + 'openapi/VideoLiveData/set_video_live_list_and_logo_end',
			  method: 'post',
			  data: {				
				userid: userInfo.userid,
				checkstr: userInfo.checkstr,
				sellerid: this.abotapi.get_sellerid(),
				video_live_tiem: '1'
			  },
			  header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			  },
			  success: (res) => {
				  	console.log('set_video_live_list_and_logo_end=====',res)
				  
				  let data = res.data;
				if(data.code = 1){
					
				
				}
			
				
			  },
			  error: function (e) {
				uni.showToast({
				  title: '网络异常！',
				  duration: 2000,
				});
			  },
			});
			
			
			this.pusher.stop((a)=>{
				console.log("livePusher.stop:" + JSON.stringify(a))
				
			},(b)=>{
				console.log("livePusher.start:" + JSON.stringify(b))
			});
			
			
			
			
			this.is_push = 0;
			
		},
		switchCamera: function() {
			this.pusher.switchCamera((a)=>{
				console.log("switchCamera.start-a:" + JSON.stringify(a))
			}, (b)=>{
				console.log("switchCamera.start-b:" + JSON.stringify(b))
			});
			
		},
		startPreview: function() {
			
			this.pusher.startPreview((a)=>{
				console.log("startPreview.start-a:" + JSON.stringify(a))
				
			}, (b)=>{
				console.log("startPreview.start-b:" + JSON.stringify(b))
			});
			this.is_camera_preview = 1;
		
		},
		stopPreview: function() {
			
			this.pusher.stopPreview((a)=>{
				console.log("stopPreview.start-a:" + JSON.stringify(a))
				
			}, (b)=>{
				console.log("stopPreview.start-b:" + JSON.stringify(b))
			});
			this.is_camera_preview = 0;
		},
		
		
		
	}
};
</script>
<style >
.fun-btn{
	z-index:100;
	display: flex;
	width: 80%;
	margin-left: 10%;
	justify-content: space-between;
	position: fixed;
	bottom: 70rpx;
}

.btn {
	width: 80rpx;
}
</style>
