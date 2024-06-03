<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="row"  @click="upLoadTouxiang()">
					<view class="title">头像</view>
					<view class="right"><view class="tis">
					<image :src="userAcountInfo.headimgurl" style="width: 100rpx;" mode="aspectFit"></image>
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
				
				<navigator :url='"/pages/user/updateMobile/updateMobile?current="+userAcountInfo.mobile' class="row">
					<view class="title">更换手机号</view>
					<view class="right"><view class="tis">{{userAcountInfo.mobile}}</view><view class="icon xiangyou"></view></view>
				</navigator>
				<navigator :url='"/pages/user/updateMobile/updateEmail?current="+userAcountInfo.email' class="row">
					<view class="title">更换Email</view>
					<view class="right"><view class="tis">{{userAcountInfo.email}}</view><view class="icon xiangyou"></view></view>
				</navigator>
				
				
			</view>
			<view class="list" v-if="wxa_hidden_shop_function_in_setting != 1">			
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
					<view class="title">关于...</view>
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
				
				title:'',  //提示框标题
				content:'', 
				
				//隐藏设置界面<br />的商城功能
				wxa_hidden_shop_function_in_setting:0,
			};
		},
		
		
		onLoad:function(options) {
			var that = this;
			this.abotapi.set_option_list_str(this, function(that,cb_params){
				console.log('aaaaaaaaaaaaa');
				
				that.abotapi.getColor();
				
				if(cb_params.wxa_hidden_shop_function_in_setting){
					that.wxa_hidden_shop_function_in_setting = cb_params.wxa_hidden_shop_function_in_setting;
				}
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
			        if(sellerid.length > 10){
						uni.clearStorageSync();
						console.log('清空完成，sellerid：'+ this.abotapi.get_sellerid());
					}
				}
			
				//uni.clearStorageSync();
				
				//避免跳转层次太多导致的page limit exceeded：“10”的问题
				//this.abotapi.call_h5browser_or_other_goto_url('/pages/index/index');
				uni.reLaunch({
					url:'/pages/index/index',
					
				})
				
				
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
					url: this.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=user_info_save',
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
						
						//count:1;
						//sizeType: ['compressed'];
						
						console.log("chooseImageRes",chooseImageRes);
						
						var headimgurl = chooseImageRes.tempFilePaths[0];
						
						uni.uploadFile({
							url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=upload_image_file',
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
									url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=set_image_headimgurl', 
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
										
										var post_data = {
										     checkstr:userInfo.checkstr,
										     userid:userInfo.userid,
										     sellerid: that.abotapi.globalData.default_sellerid
										  }
										
										// #ifdef MP-WEIXIN
											post_data.xiaochengxu_appid = that.abotapi.globalData.xiaochengxu_appid,
											post_data.xiaochengxu_openid = that.abotapi.get_current_openid('userid_openid_' + userInfo.userid);
										// #endif
										
										//更新用户信息
										that.abotapi.abotRequest({
										  url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=get_user_info',
										  data: post_data,    
										  success:function(res){
											  
										    console.log('success',res);
											
											if(res.data && res.data.data && (res.data.data.code == 1)){
												that.abotapi.set_user_account_info(data.data);
												
												that.userAcountInfo = that.abotapi.get_user_account_info();
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
				var that = this;
				var userInfo = that.abotapi.get_user_info();
				
				uni.showModal({
				    title: '注销账号',
				    content: '此操作将导致账号内的所有设置被删除，确认要注销此账号吗？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							
							//2023.5.5. 申请注销接口
							that.abotapi.abotRequest({
								
								url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=login_erase',
								header: {
									"Content-Type": "application/x-www-form-urlencoded"  
								}, 
								method: "POST",  
								data:{
									sellerid: that.abotapi.globalData.default_sellerid,
									checkstr: userInfo.checkstr,
									userid: userInfo.userid,
								},
								success:function(res){
									
									var title001 = '';
									var msg001 = '';
									
									if(res.data.code == '1'){
										title001 = '操作成功';
										msg001 = res.data.msg;
									}else{
										title001 = '操作失败';
										msg001 = res.data.msg;
									}
									
									
									uni.showModal({
									    title: title001,
									    content: msg001,
										showCancel: false,
									    success: function (res) {
											
									       if (res.confirm) {
											   
										   }
										   
										   that.logout();
										   
										   
									    }
									});
									
								},
								fail:()=>{
									uni.showToast({
										title:'网络请求失败！'
									});
									
								},
								complete:()=>{
									
								}
								
								
							})
							
							
							
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
	font-size: 30rpx;

}
.content{
	padding-bottom: 20rpx;
	.list{
		width: 96%;
		padding-left: 4%;
		background-color: #fff;
		margin-bottom: 20rpx;
		.row{
			widows: 100%;
			min-height: 90rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: solid 1rpx #eee;
			&:last-child{
				border-bottom: none;
			}
			.title{
				font-size: 32rpx;
				color: #333;
			}
			.right{
				display: flex;
				align-items: center;
				color: #999;
				.tis{
					font-size: 26rpx;
					margin-right: 5rpx;
					max-height: 120rpx;
					image{
						width: 100rpx;
						height: 100rpx;
						border-radius: 100%;
						margin: 10rpx 0;
					}
				}
				.icon{
					width: 40rpx;
					color: #cecece;
				}
			}
			
		}
	}
}



.btm-list  view{
	width: 90%;
	margin-left: 5%;
	border-radius: 10px;
	background-color: #fff;
	margin-bottom: 20rpx;
	height: 80rpx;
	line-height: 80rpx;
	background-color: #07c160;
	color:#fff;
}



.btm-list2 view{
	width: 90%;
	margin-left: 5%;
	border-radius: 10rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
	height: 80rpx;
	line-height: 80rpx;
	background-color: #fa5151;
	color:#fff;
}




</style>
