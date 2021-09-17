<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="row"  @click="upLoadTouxiang()">
					<view class="title">头像</view>
					<view class="right"><view class="tis">
					<image :src="userAcountInfo.headimgurl" style="width: 100upx;" mode="aspectFit"></image>
					</view><view class="icon xiangyou"></view></view>
				</view>
				
				<navigator url='/pages/user/nickName/nickNameEdit' class="row">
					<view class="title">昵称</view>
					<view class="right"><view class="tis">{{userAcountInfo.fenxiao_info.nickname}}</view><view class="icon xiangyou"></view></view>
				</navigator>	
				
				
				<navigator url='/pages/user/accountEdit/accountEdit' class="row">
					<view class="title">账号密码</view>
					<view class="right"><view class="tis">{{userAcountInfo.account}}</view><view class="icon xiangyou"></view></view>
				</navigator>
				
				<navigator url='/pages/user/updateMobile/updateMobile' class="row">
					<view class="title">更换手机号</view>
					<view class="right"><view class="tis">{{userAcountInfo.mobile}}</view><view class="icon xiangyou"></view></view>
				</navigator>
				
				
			</view>
			<view class="list">			
				<navigator url='/pages/address/user-address/user-address' class="row">
					<view class="title">收货地址</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</navigator>
				
				<navigator url='/pages/user/myQR/myQR' class="row">
					<view class="title">我的二维码</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</navigator>
				
				<navigator url='/pages/user/order_list/order_list?currentTab=0&otype=0' class="row">
					<view class="title">我的订单</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</navigator>
				
				<navigator url='/pages/user/keep/keep' class="row">
					<view class="title">我的收藏</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</navigator>
				
			</view>
			<view class="list">
				<view class="row">
					<view class="title">当前版本</view>
					<view class="right"><view class="tis">{{version_number}}</view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row" @tap="clearStorage">
					<view class="title">清除缓存</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
				<navigator :url="jubao_link_url" class="row">
					<view class="title">问题反馈</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</navigator>
				<navigator url="/pages/main/about/about" class="row">
					<view class="title">关于商城</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</navigator>
			</view>
			
			<view class="list">
				<view class="row" @tap="Cancelaccount">
					<view class="title">注销账号</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
			</view>
		</view>
		<!-- <view class="btm-list">
			<view style="text-align: center;" @click="keep_button()">确认修改</view>
		</view> -->
		<view class="btm-list2">
			<view style="text-align: center;" @click="logout()">退出登录</view>
		</view>
	</view>
</template>

<script>
	var abotapi = require("../../../common/abotapi.js");

	export default {
		data() {
			return {
				user_info:'',
				nickname:'',
				userAcountInfo:'',
				jubao_link_url: '',
				version_number: '',
			};
		},
		
		
		onLoad:function(options) {
			var that = this;
			this.abotapi.set_option_list_str(this, function(that,cb_params){
				console.log('aaaaaaaaaaaaa');
				
				that.abotapi.getColor();
			});
			
			that.version_number = that.abotapi.globalData.version_number;
			var userInfo = that.abotapi.get_user_info();
			if ((!userInfo) || (!userInfo.userid)) {
				
				that.abotapi.call_h5browser_or_other_goto_url('/pages/login/login');
				
				return;
			}
			
			this.userAcountInfo = this.abotapi.get_user_account_info();
			
			that.jubao_link_url = that.abotapi.jump_to_fankui_url();

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
				
				this.abotapi.call_h5browser_or_other_goto_url('/pages/index/index');
				
				
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
							});
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
			upLoadTouxiang:function(){
				var that=this;
				var userInfo = that.abotapi.get_user_info();
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
								
								that.abotapi.abotRequest({
									url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=set_image_headimgurl', 
									data: {
										sellerid: that.abotapi.globalData.default_sellerid,
										checkstr: userInfo.checkstr,
										userid: userInfo.userid,
										img_url: obj.img_url
									},
									success: function (res) {
										uni.showToast({
											title: res.data.msg,
											icon: 'success',
											duration: 2000
										});
										
										//that.userAcountInfo.headimgurl = obj.img_url;
										//that.abotapi.set_user_account_info(that.userAcountInfo);
										
										//更新用户信息
										that.abotapi.abotRequest({
										  url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_user_info',
										  data: {
										     checkstr:userInfo.checkstr,
										     userid:userInfo.userid,
										     sellerid: that.abotapi.globalData.default_sellerid
										  },    
										  success:function(res){
											  
										    console.log('success',res);
											
											if(res.data && res.data.data && (res.data.data.code == 1)){
												that.abotapi.set_user_account_info(data.data);
											}
										  }
										});
										
										
										
									}
								});
							}
						});
					}
				});
			},
			
			clearStorage:function(){
				this.abotapi.clearStorage();
			},
			
			Cancelaccount:function(){
				var that= this;
				uni.showModal({
				    title: '注销账号',
				    content: '此操作将导致账号内的所有设置被删除，确认要注销此账号吗？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							uni.showModal({
							    title: ' 操作完成',
							    content: '账号已经在注销中，请在30天内不要使用此账号做任何操作，以避免注销流程失效。',
								showCancel: false,
							    success: function (res) {
							       if (res.confirm) {
									   that.logout();
								   }
							    }
							});
							
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
			
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
