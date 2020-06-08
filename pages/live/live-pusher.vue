<template>
	 <view>
	        <live-pusher id='livePusher' ref="livePusher" class="livePusher" url="rtmp://101619.livepush.myqcloud.com/live/tengyumall?txSecret=e809b255904e3bce90dcadd1bab34018&txTime=5EFAECD4"
	        mode="SD" :muted="true" :enable-camera="true" :auto-focus="true" :beauty="1" whiteness="2"
	        aspect="9:16" @statechange="statechange" @netstatus="netstatus" @error = "error"
	        ></live-pusher>
	        <button class="btn" @click="start">开始推流</button>
	        <button class="btn" @click="pause">暂停推流</button>
	        <button class="btn" @click="resume">resume</button>
	        <button class="btn" @click="stop">停止推流</button>
	        <button class="btn" @click="snapshot">快照</button>
	        <button class="btn" @click="startPreview">开启摄像头预览</button>
	        <button class="btn" @click="stopPreview">关闭摄像头预览</button>
	        <button class="btn" @click="switchCamera">切换摄像头</button>
	</view>
</template>

<script>
 


export default {

	data() {
		return {
			
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
		
		
	},
	onShow:function(){	
		
		
	},
	 onReady() {
	            // 注意：需要在onReady中 或 onLoad 延时
	            this.context = uni.createLivePusherContext("livePusher", this);
	},
	
	
	
	methods: {
		
		
		
	}
};
</script>
<style lang="scss">
page{position: relative;background-color: #fff;}
.icon.location:before {
    content: '\E611';
}
.shang_box{
	display: flex;
	padding: 10upx;
	margin: 10upx;
	border-radius: 10upx;
	background: #fff;
	border: 1upx solid #fff;
}
.pullDown-effects{
	position: fixed;
	//top: calc(100upx - 36vw);
	top: 0;
	z-index: 9;
	width: 100%;
	height: 36vw;
	/*  #ifdef  APP-PLUS  */
	padding-top: var(--status-bar-height);
	/*  #endif  */
	image{
		width: 100%;
		height: 36vw;
	}
}
.status {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	background-color: #fff;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height: var(--status-bar-height); //覆盖样式
	/*  #endif  */
}
.header {
	width: 92%;
	padding: 0 4%;
	height: 100upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
	background-color: #fff;

	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */

	.addr {
		width: 160upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		
		// font-size: 28upx;
		.icon {
			height: 60upx;
			margin-right: 5upx;
			display: flex;
			align-items: center;
			font-size: 42upx;
			color: #ffc50a;
		}
	}
	.input-box {
		width: 100%;
		height: 60upx;
		background-color: #f5f5f5;
		border-radius: 30upx;
		position: relative;
		display: flex;
		align-items: center;
		.icon {
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			right: 0;
			width: 60upx;
			height: 60upx;
			font-size: 34upx;
			color: #c0c0c0;
		}
		input {
			padding-left: 28upx;
			height: 28upx;
			font-size: 28upx;
		}
	}
	.icon-btn {
		// width: 120upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;
		.icon {
			width: 60upx;
			height: 60upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 42upx;
		}
	}
}
.place {
	background-color: #ffffff;
	height: 100upx;
	/*  #ifdef  APP-PLUS  */
	margin-top: var(--status-bar-height);
	/*  #endif  */
}
.swiper {
	width: 100%;
	margin-top: 10upx;
	display: flex;
	
	justify-content: center;
	.swiper-box {
		width: 92%;
		// height: 30.7vw;

		overflow: hidden;
		border-radius: 15upx;
		box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
		//兼容ios，微信小程序
		position: relative;
		z-index: 1;
		swiper {
			width: 100%;
			// height: 30.7vw;
			swiper-item {
				image {
					width: 100%;
				}
			}
		}
		.indicator {
			position: absolute;
			bottom: 20upx;
			left: 20upx;
			background-color: rgba(255, 255, 255, 0.4);
			width: 150upx;
			height: 5upx;
			border-radius: 3upx;
			overflow: hidden;
			display: flex;
			.dots {
				width: 0upx;
				background-color: rgba(255, 255, 255, 1);
				transition: all 0.3s ease-out;
				&.on {
					width: (100%/3);
				}
			}
		}
	}
}

.category-list {
	width: 96%;
	margin-left: 2%;
	padding: 0 0 30upx 0;
	border-bottom: solid 2upx #f6f6f6;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.category {
		width: 25%;
		margin-top: 50upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		.img {
			width: 100%;
			display: flex;
			justify-content: center;
			image {
				width: 9vw;
				height: 9vw;
			}
		}
		.text {
			margin-top: 16upx;
			width: 100%;
			display: flex;
			justify-content: center;
			font-size: 24upx;
			color: #3c3c3c;
		}
	}
}
.banner_with_shadow {
	width: 92%;
	margin: 40upx 4%;
	image {
		border-radius: '';
		box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.3);
	}
}

.banner {
	width: 100%;
	margin: 0;
	image {
		border-radius: '';
	}
}

.toutiao{
  width:100%;
  height:50px;
  margin:10px auto;
  background-color: #fff;
  clear: both;
}

.toutiao_left{
  width:15%;
  height:50px;
  float:left;
}

.toutiao_left image{
  width:60%;
  height:100%;
  float:left;
}

.toutiao_right{
  width:85%;
  height:50px;
  float:left;
  font-size:16px;
  line-height:50px;
  color:#666666;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.toutiao_right2{
  width:85%;
  height:50px;
  float:left;
  font-size:13px;
  line-height:50upx;
  color:black;
  overflow: hidden;
  letter-spacing: 3upx;
  text-overflow: ellipsis;
}




.promotion {
	width: 92%;
	margin: 50upx 4% 20upx;
	.text {
		width: 100%;
		height: 60upx;
		font-size: 34upx;
		font-weight: 600;
		margin-top: -10upx;
	}
	.list {
		width: 100%;
		display: flex;
		justify-content: space-between;
		.column {
			width: 43%;
			padding: 15upx 3%;
			background-color: #ebf9f9;
			border-radius: 10upx;
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.top {
				width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;
				margin-bottom: 5upx;
				.title {
					font-size: 30upx;
				}
				.countdown {
					margin-left: 20upx;
					display: flex;
					height: 40upx;
					display: flex;
					align-items: center;
					font-size: 20upx;
					view {
						height: 30upx;
						background-color: #f06c7a;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #fff;
						border-radius: 4upx;
						margin: 0 4upx;
						padding: 0 2upx;
					}
				}
			}
			.left {
				width: 50%;
				height: 18.86vw;
				display: flex;
				flex-wrap: wrap;
				align-content: space-between;
				.ad {
					margin-top: 5upx;
					width: 100%;
					font-size: 22upx;
					color: #acb0b0;
				}
				.into {
					width: 100%;
					font-size: 24upx;
					color: #aaa;
					margin-bottom: 5upx;
				}
			}
			.right {
				width: 18.86vw;
				height: 18.86vw;
				image {
					width: 18.86vw;
					height: 18.86vw;
				}
			}
		}
	}
}
.goods-list {
	// background-color: #f4f4f4;
	.title {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		color: #f47825;
		font-size: 30upx;
		margin-top: 10upx;
		image {
			width: 30upx;
			height: 30upx;
		}
	}
	.loading-text {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60upx;
		color: #979797;
		font-size: 24upx;
	}
	.product-list {
		width: 92%;
		padding: 0 4% 3vw 4%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.product {
			width: 48%;
			border-radius: 20upx;
			background-color: #fff;
			margin: 0 0 15upx 0;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);
			image {
				width: 100%;
				border-radius: 20upx 20upx 0 0;
			}
			.name {
				width: 92%;
				margin: 10upx 4%;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				text-align: justify;
				overflow: hidden;
				font-size: 30upx;
			}
			.info {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				width: 92%;
				padding: 10upx 4% 10upx 4%;

				.price {
					color: #e65339;
					font-size: 30upx;
					font-weight: 600;
				}
				.slogan {
					color: #807c87;
					font-size: 24upx;
				}
			}
		}
	}
}
.youhui-biaoqian {
		font-size: 24upx;
		margin-bottom: 10upx;
		border: 1px solid #666;
		text-align: center;
		color: #555;
		border-radius: 6upx;
		padding: 2px 5px;
		margin-right: 10upx;
	}
	.u-tap-btn {
	  position:fixed;
	  right:20upx;
	  bottom:150upx;
	  border:0upx;
	}
	
	.u-go-home2 {
	  display:flex;
	  flex-direction:row;
	  justify-content:center;
	  border-radius:80upx;
	  width:110upx;
	  height:110upx;
	  border:0px solid #eee;
	  font-size:20upx;
	  /*box-shadow:0px 4upx 8upx rgba(0,0,0,0.35);*/
	  z-index:2;
	  opacity:1;
	  margin-bottom:20upx;
	  /*background:#44b549;*/
	  align-items:center;
	}
.u-go-home2 image {
	height: 80upx;
	width: 80upx;
	position: absolute;
	left: 16upx;
}

</style>
