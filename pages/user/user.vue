<template>
	<view>
		<view v-if="showHeader" class="status" :style="{position:headerPosition,top:statusTop,backgroundColor:wxa_shop_nav_bg_color,fontColor:wxa_shop_nav_font_color}"></view>
		<view v-if="showHeader" class="header" :style="{position:headerPosition,top:headerTop,backgroundColor:wxa_shop_nav_bg_color,fontColor:wxa_shop_nav_font_color}">
			<view class="addr"></view>
			<view class="input-box">
				
			</view>
			<view class="icon-btn">
				<view class="icon tongzhi" @tap="touTiaoList"></view>				<!--下版本替换为: toMsg -->
				<view class="icon setting" @tap="toSetting"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view v-if="showHeader" class="place"></view>
		<!-- 用户信息 -->
		<view class="user" :style="{backgroundColor:wxa_shop_nav_bg_color}">
			<!-- 头像 -->
			<view class="left">
				<label v-if="user_info"><image :src="user_info.headimgurl"></image></label>
				<label v-else><image src="../../../static/img/face.jpg"></image></label>
			</view>
			<!-- 昵称,个性签名 -->
			<view class="right">
				<view class="username"><label v-if="user_info">{{user_info.nickname}}</label><label @click="toLogin" v-else>请点击此处登录</label></view>
				<view class="signature"><label v-if="user_info">{{user_info.signature}}</label><label v-if="user_info.signature == null"></label></view>
			</view>
			<!-- 二维码按钮 -->
			<view class="erweima" @tap="toMyQR">
				<view class="icon qr"></view>
			</view>
		</view>
		<!-- VIP banner -->
		<view class="VIP">
			<view class="img">
				<image src="/static/img/VIP.png"></image>
			</view>
			<view class="title">开通VIP会员</view>
			<view class="tis">会员特权</view>
		</view>
		<!-- 订单-余额 -->
		<view class="order">
			<!-- 订单类型 -->
			<view class="list">
				<view class="box" style="width: 25%;" v-for="(row,index) in orderList" :key="index" @tap="toOrderList(row.otype,index)">
					<view class="img">
						<view class="icon" :class="row.icon"></view>
					</view>
					<view class="text">{{row.text}}</view>
				</view>
			</view>
			<!-- 余额 -->
			<view class="balance-info">
				<view class="left">
					<view class="box">
						<view class="num">{{fenxiao_info.balance_yuan}}</view>
						<view class="text">余额</view>
					</view>
					
					<view class="box">
						<view class="num">{{fenxiao_info.balance_zengsong_yuan}}</view>
						<view class="text">赠款</view>
					</view>
					<view class="box">
						<view class="num">{{fenxiao_info.score}}</view>
						<view class="text">积分</view>
					</view>
				</view>
				<view class="right">
					<view class="box" @tap="toDeposit">
						<view class="img">
							<view class="icon chongzhi"></view>
						</view>
						<view class="text">充值</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 工具栏 -->
		<view class="toolbar">
			<view class="title">我的工具栏</view>
			<view class="list">
				<view class="box" v-for="(row,index) in gooosList" :key="index" @tap="toPage(row.url)">
					<view class="img">
						<image :src="row.src"></image>
					</view>
					<view class="text">{{row.name}}</view>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place-bottom"></view>
	</view>
</template>
<script>
	// var abotapi = require("../../../common/abotapi.js");
	// var app = getApp();
	
	export default {
		data() {
			return {
				isfirst:true,
				headerPosition:"fixed",
				headerTop:null,
				statusTop:null,
				showHeader:true,
				//个人信息,
				user_info:'',
				fenxiao_info:'',
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				// 订单类型
				orderList:[
					{text:'全部',icon:"pingjia",otype:0},
					{text:'待付款',icon:"fukuan",otype:1},
					{text:'待发货',icon:"fahuo",otype:2},
					{text:'待收货',icon:"shouhuo",otype:6},
					
				],
				// 工具栏列表
				gooosList:'',
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
			this.headerTop = e.scrollTop>=0?null:0;
			this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
		},
		onLoad() {
			var that = this;
			
			this.abotapi.set_option_list_str(this, 
				function(that001, option_list){
					that.abotapi.getColor();
					
						that.wxa_shop_nav_bg_color  = option_list.wxa_shop_nav_bg_color;
						
						that.wxa_shop_nav_font_color = option_list.wxa_shop_nav_font_color
				
				}
			);
			
			uni.request({
			    url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_shop_icon_usercenter',
			    method: 'post',
			    data: {
					sellerid: this.abotapi.globalData.default_sellerid,
				},
			    header: {
					'Content-Type': 'application/x-www-form-urlencoded'
			    },
			    success: function (res) {
					console.log('kaafff===', res);
					var productlist = res.data.data;
					console.log('akafff===', productlist);
					that.gooosList = productlist
				  
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
			});
			that.getPage();
			this.statusHeight = 0;
			// #ifdef APP-PLUS
			this.showHeader = false;
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif
		},
		onReady(){
			//此处，演示,每次页面初次渲染都把登录状态重置
			uni.setStorage({
				key: 'UserInfo',
				data: false,
				success: function () {
				},
				fail:function(e){
				}
			});
		},
		onShow(){
			var that = this;
			that.getPage();
			uni.getStorage({
				key: 'UserInfo',
				success: (res)=>{
					if(!res.data){
						if(this.isfirst){
							//this.toLogin();
						}
						return ;
					}
					this.user = res.data;
				},
				fail:(e)=>{
					//this.toLogin(); 
				}
			});
		},
		methods: {
			//获取用户信息
			getPage: function () {
				var userInfo = this.abotapi.get_user_info();
				var that = this;
				if(userInfo && userInfo.userid){
					uni.request({
						url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_user_info',
						data: {
							sellerid: this.abotapi.globalData.default_sellerid,
							checkstr: userInfo.checkstr,
							userid: userInfo.userid,
							appid: this.abotapi.globalData.xiaochengxu_appid,
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						method: "POST",
						success: function (res) {
							console.log('ddd', res);
				
							if (res.data.code == "-1") {
								var last_url = '/pages/user/index';
								this.abotapi.goto_user_login(last_url, 'normal');
							} else {
								var data = res.data;
								that.user_info = data.data;
								that.fenxiao_info = that.user_info.fenxiao_info;
								console.log('data2==>>',that.user_info);
								console.log('fenxiao_userinfo==>>',that.fenxiao_info);
							}
					    }
					})	
				}
			},
			
			
			
			//消息列表
			toMsg(){
				uni.navigateTo({
					url:'/pages/msg/msg'
				})
			},
			toOrderList(row,index){
				console.log("row",row);
				console.log("index",index);
				uni.setStorageSync('tbIndex',index);
				uni.setStorageSync('tbOtype',row);
				uni.navigateTo({
					url:'/pages/user/order_list/order_list?tbindex='+index+'&otype='+row
				}) 
			},
			toSetting(){
				uni.navigateTo({
					url:'/pages/user/setting/setting'
				})
			},
			
			//点击商户头条进入列表
			touTiaoList: function (e) {
			    console.log('点击商户头条进入列表');
			    uni.navigateTo({
					url: '/pages/tabBar/home/help/help?sellerid=' + this.abotapi.globalData.default_sellerid
			    })
			},
			toMyQR(){
				uni.navigateTo({
					url:'/pages/user/myQR/myQR'
				})
			},
			toLogin(){
				
				uni.navigateTo({
					url:'/pages/login/login'
				})
				this.isfirst = false;
			},
			isLogin(){
				//实际应用中,用户登录状态应该用token等方法去维持登录状态.
				const value = uni.getStorageSync('UserInfo');
				if (value) {
					return true;
				}
				return false
			},
			toDeposit(){
				// uni.showToast({title: '该功能升级中'});
				// return;
				uni.navigateTo({
					url:'/pages/user/deposit/deposit'
				})
			},
			toPage(url){
				var var_list = Object();
				console.log('toAdDetails- to url ====>>>>>>', url);
				this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
			}
		}
	} 
</script>
<style lang="scss">
	page{position: relative;background-color: #fff;}
	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #f06c7a;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);//覆盖样式
		/*  #endif  */
		
	}
	
	.header{
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #f06c7a;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		.icon-btn{
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			.icon{
				color: #fff;
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42upx;
			}
		}
	}
	.place{
		background-color: #f06c7a;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.place-bottom{
		height: 300upx;
	}
	.user{
		width: 92%;
		padding: 0 4%;
		display: flex;
		align-items: center;
		// position: relative;
		background-color: #f06c7a;
		padding-bottom: 120upx;
		.left{
			width: 20vw;
			height: 20vw;
			flex-shrink: 0;
			margin-right: 20upx;
			border: solid 1upx #fff;
			border-radius: 100%;
			image{
				width: 20vw;
				height: 20vw;
				border-radius: 100%;
			}
			
		}
		.right{
			width: 100%;
			.username{
				font-size: 36upx;
				color: #fff;
			}
			.signature{
				color: #eee;
				font-size: 28upx;
			}
		}
		.erweima{
			flex-shrink: 0;
			width: 10vw;
			height: 10vw;
			margin-left: 5vw;
			border-radius: 100%;
		
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(to left, #fbbb37 0%,#fcf0d0 105%);
			.icon{
				color: #7b6335;
				font-size: 42upx;
			}
		}
	}
	.order{
		width: 84%;
		margin: 30upx 4% 30upx 4%;
		padding: 30upx 4% 20upx 4%;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.1);
		border-radius: 15upx;
		.list{
			display: flex;
			border-bottom: solid 1upx #17e6a1;
			padding-bottom: 10upx;
			.box{
				width: 20%;
				.img{
					width: 100%;
					display: flex;
					justify-content: center;
					.icon{
						font-size: 50upx;
						color: #464646;
					}
				}
				.text{
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 28upx;
					color: #3d3d3d;
				}
			}
		}
		.balance-info{
			display: flex;
			padding: 10upx 0;
			.left{
				width: 75%;
				display: flex;
				.box{
					width: 50%;
					font-size: 28upx;
					
					.num{
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						color: #f9a453;
					}
					.text{
						width: 100%;
						display: flex;
						justify-content: center;
						color: #3d3d3d;
						font-size: 28upx;
					}
				}
			}
			.right{
				border-left: solid 1upx #17e6a1;
				width: 25%;
				.box{
					
					.img{
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						.icon{
							font-size: 45upx;
							color: #e78901;
						}
					}
					.text{
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 28upx;
						color: #3d3d3d;
					}
				}
			}
		}
	}
	.VIP{
		width: 84%;
		margin: -65upx auto 20upx auto;
		padding: 30upx 4%;
		background: linear-gradient(to left, #dea96d 0%,#f6d59b 100%);
		box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.2);
		border-radius: 15upx;
		display: flex;
		align-items: center;
		.img{
			flex-shrink: 0;
			width: 60upx;
			height: 60upx;
			image{
				width: 60upx;
				height: 60upx;
			}
		}
		.title{
			width: 100%;
			color: #796335;
			font-size: 30upx;
		}
		.tis{
			width: 100%;
			display: flex;
			justify-content: flex-end;
			color: #fcf0d0;
			font-size: 26upx;
		}
	}
	.toolbar{
		width: 92%;
		margin: 0 4% 0 4%;
		padding: 0 0 20upx 0;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.1);
		border-radius: 15upx;
		.title{
			padding-top: 10upx;
			margin: 0 0 10upx 3%;
			font-size: 30upx;
			height: 80upx;
			display: flex;
			align-items: center;
		}
		.list{
			display: flex;
			flex-wrap: wrap;
			.box{
				width: 25%;
				margin-bottom: 30upx;
				.img{
					width: 23vw;
					height: 10.5vw;
					display: flex;
					justify-content: center;
					
					image{
						width: 9vw;
						height: 9vw;
					}
				}
				.text{
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 26upx;
					color: #3d3d3d;
				}
			}
		}
	}
</style>
