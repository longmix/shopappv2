<template>
	<view>
	        <view class="uni-padding-wrap uni-common-mt">
	            <view>
	                <video id="myVideo" :src="player_url" :style="{height: windowHeight + 'px',width: windowWidth + 'px'}"
	                    @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
					<!-- <video id="myVideo" src="rtmp://live.tengyumall.com/live001/tengyumall" :style="{height: windowHeight + 'px',width: windowWidth + 'px'}"
					    @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>	 -->
	            </view>
	            <!-- #ifndef MP-ALIPAY -->
				<view class="danmu-con">
					<view class="uni-list uni-common-mt">
						<view class="uni-list-cell">
							<view>
								<view class="uni-label">弹幕内容</view>
							</view>
							<view class="uni-list-cell-db">
								<input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
							</view>
						</view>
					</view>
					<view class="uni-btn-v">
						<button @click="sendDanmu" class="page-body-button">发送弹幕</button>
					</view>
				</view>
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
				player_url: ''
				
			}
		},
		onLoad(options){
			var that = this;
			
			if(options.player_url){
				this.player_url = options.player_url;
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
		bottom: 0;
		width: 100%;
		z-index: 100;
	}
</style>
