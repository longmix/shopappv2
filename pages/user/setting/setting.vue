<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="row"  @click="upLoad()">
					<view class="title">头像</view>
					<view class="right"><view class="tis">
					<image :src="user_info.headimgurl" style="width: 100upx;" mode="aspectFit"></image>
					</view><view class="icon xiangyou"></view></view>
				</view>
				<navigator url='/pages/user/nickName/nickNameEdit' class="row">
					<view class="row">昵称</view>
					<view class="right"><view class="tis">{{userAcountInfo.fenxiao_info.nickname}}</view></view>
				</navigator>
				<view class="row">
					<view class="title">个性签名</view>
					<view class="right"><view class="tis">{{user_info.signature}}</view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">收货地址</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">账户安全</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
			</view>
			<view class="list">
				<view class="row">
					<view class="title">通知提醒</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">支付设置</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">通用</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
			</view>
			<view class="list">
				<view class="row">
					<view class="title">版本升级</view>
					<view class="right"><view class="tis">v1.0.0</view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">清除缓存</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">问题反馈</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">关于商城</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
			</view>
		</view>
		<view class="btm-list">
			<view style="text-align: center;" @click="keep_button()">确认修改</view>
		</view>
		<view class="btm-list2">
			<view style="text-align: center;" @click="logout()">退出登录</view>
		</view>
	</view>
</template>

<script>
	var abotapi = require("../../../common/abotapi.js");
	// var app = getApp();
	var userInfo = abotapi.get_user_info();
	export default {
		data() {
			return {
				user_info:'',
				nickname:'',
				userAcountInfo:''
			};
		},
		
		
		onLoad:function(options) {
			var that = this;
			this.userAcountInfo = this.abotapi.get_user_account_info();
			this.abotapi.set_option_list_str(null, this.abotapi.getColor());
			var userInfo = that.abotapi.get_user_info();
			if ((!userInfo) || (!userInfo.userid)) {
				uni.redirectTo({
					url: '../../login/login',
				})
				return;
			  }
			that.getPage();
		},
		methods: {
			//退出登录
			logout: function () {
				this.abotapi.del_user_info();
			    
				var sellerid = this.abotapi.globalData.default_sellerid;
				if(typeof(sellerid) != 'undefined'){
			        if(sellerid.length > 15){
						uni.clearStorageSync();
						console.log('清空完成，sellerid：'+ this.abotapi.get_sellerid());
					}
				}
			
				uni.clearStorageSync();
				
				uni.switchTab({
					url: '../../index/index'
				})
				
			},
			
			//获取用户信息
			getPage: function () {
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
								console.log('data2==>>',that.user_info);
							}
					    }
					})	
				}
			},
			
			
			showType(tbIndex){
				this.tabbarIndex = tbIndex;
				this.list = this.orderList[tbIndex];
			},
			//获取输入的nickname
			nameInput: function(e) {
				console.log("e",e);
				// console.log('that.data' + that.data);
				var that = this;
			    if (e.detail.value == that.user_info.nickname){
					this.nickname = e.detail.value;
				}else{
					that.user_info.nickname = e.detail.value;
				}
			},	
			//修改用户名字
			keep_button:function(){
				var that = this;
			    console.log('that.data.nickname', that.user_info.nickname);
			    console.log('this.nickname', this.nickname);
			    if(this.nickname==that.user_info.nickname){
				uni.showToast({
					title: '保存成功',
					icon: 'success',
					duration: 2000
				});
					return;
			    }
				console.log(1111555555);
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=user_info_save',
					header: {  
						"Content-Type": "application/x-www-form-urlencoded"  
					}, 
					method: "POST",  
					data: {
						nickname:that.user_info.nickname,
						checkstr:userInfo.checkstr,
						userid:userInfo.userid,
						sellerid: that.abotapi.globalData.default_sellerid,
					},    
					success:function(res){
						console.log('success',res);
						if(res.data.code == 1){
							uni.showToast({
								title: res.data.msg,
								icon: 'success',
								duration: 2000
							})
							// uni.redirectTo({
							// 	url: '../../tabBar/user/user'
			          
							// })
							return;
						}
						else if(res.data.code == 0){
							uni.showToast({
								title: '修改成功',
								icon: 'success',
								duration: 2000
							})
						}
					},
					fail:function(res){
						console.log('failfail',res)
					}
			    });
			
			},
			
			//修改头像
			upLoad:function(){
				var that=this;
				uni.chooseImage({
					success: function(chooseImageRes) {
						count:1;
						sizeType: ['compressed'];
						console.log("chooseImageRes",chooseImageRes);
						var headimgurl = chooseImageRes.tempFilePaths[0];
						uni.uploadFile({
							url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=upload_image_file',
							filePath: headimgurl,
							name: 'file',
							formData: {
								sellerid: that.abotapi.globalData.default_sellerid,
								checkstr: userInfo.checkstr,
								userid: userInfo.userid,
							},
							success: function (res) {
								// var obj = res.data;
								var obj = JSON.parse(res.data);
								console.log('obj',obj);
								
								uni.request({
									url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=set_image_headimgurl', 
									data: {
										sellerid: that.abotapi.globalData.default_sellerid,
										checkstr: userInfo.checkstr,
										userid: userInfo.userid,
										img_url: obj.img_url
									},
									header: {
										"Content-Type": "application/x-www-form-urlencoded"
									},
									method: "POST",
									success: function (res) {
										uni.showToast({
											title: res.data.msg,
											icon: 'success',
											duration: 2000
										});
										that.user_info.headimgurl = obj.img_url;
									}
								});
							}
						});
					}
				});
			},
			
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f3f3f3;	
}

.icon {
	font-size: 30upx;

}
.content{
	padding-bottom: 20upx;
	.list{
		width: 96%;
		padding-left: 4%;
		background-color: #fff;
		margin-bottom: 20upx;
		.row{
			widows: 100%;
			min-height: 90upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: solid 1upx #eee;
			&:last-child{
				border-bottom: none;
			}
			.title{
				font-size: 32upx;
				color: #333;
			}
			.right{
				display: flex;
				align-items: center;
				color: #999;
				.tis{
					font-size: 26upx;
					margin-right: 5upx;
					max-height: 120upx;
					image{
						width: 100upx;
						height: 100upx;
						border-radius: 100%;
						margin: 10upx 0;
					}
				}
				.icon{
					width: 40upx;
					color: #cecece;
				}
			}
			
		}
	}
}



.btm-list  view{
	width: 90%;
	margin-left: 5%;
	border-radius: 5px;
	background-color: #fff;
	margin-bottom: 20upx;
	height: 80upx;
	line-height: 80upx;
	background-color: #07c160;
	color:#fff;
}



.btm-list2 view{
	width: 90%;
	margin-left: 5%;
	border-radius: 5px;
	background-color: #fff;
	margin-bottom: 20upx;
	height: 80upx;
	line-height: 80upx;
	background-color: #fa5151;
	color:#fff;
}



</style>
