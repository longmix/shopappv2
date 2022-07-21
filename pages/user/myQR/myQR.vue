<template>
	<view :style="{height:windowHeight+'px',backgroundColor:wxa_shop_nav_bg_color,fontColor:wxa_shop_nav_font_color}">
		<view :style="{backgroundColor:wxa_shop_nav_bg_color,fontColor:wxa_shop_nav_font_color}">
			<view class="xuanchuan_img" v-if="option_list && option_list.xuanchuan_img"
				style="background-color: #fff;">
				<image :src="option_list.xuanchuan_img" style="width: 100%;" mode="widthFix"></image>
			</view>
			
			<view class="myblock" v-if="!option_list || (option_list.hide_qrcode_img != 1)">
				
			</view>
			<view  class="QR" v-if="!option_list || (option_list.hide_qrcode_img != 1)">
				<image  :show-menu-by-longpress="true" :src="qrcode_url"  @click="previewImage"></image>
			</view>
			<view class="title" v-if="!option_list || (option_list.hide_qrcode_img != 1)"
				:style="{backgroundColor:wxa_shop_nav_bg_color,fontColor:wxa_shop_nav_font_color}">
				请用手机扫描二维码
			</view>
			<view class="btn" v-show="showBtn" @tap="printscreen"
				 v-if="!option_list || (option_list.hide_qrcode_img != 1)">
				{{tis}}
			</view>
			
			<view class="mydescribe" v-if="option_list && option_list.describe">
				{{option_list.describe}} 
			</view>
			
			<view class="xuanchuan_img" v-if="option_list && option_list.xuanchuan_02_img">
				<image :src="option_list.xuanchuan_02_img" style="width: 100%;" mode="widthFix"></image>
			</view>
			
			<view class="logo">
				<!-- <image mode="widthFix" src="../../../static/img/qrlogo.png"></image> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tis:"截屏保存到相册",
				showBtn:false,
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				qrcode_url:'',
				windowHeight:'',
				//xuanchuan_img:'',//宣传图片链接  在推广码设置里面设置的
				option_list:null
			};
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.showBtn = true;
			// #endif
			
			// #ifdef H5
			this.showBtn = true;
			// #endif
			
			var that = this;
			
			this.abotapi.set_option_list_str(this,
				function(that001, option_list){
					that.abotapi.getColor();
					
						that.wxa_shop_nav_bg_color  = option_list.wxa_shop_nav_bg_color;
						
						that.wxa_shop_nav_font_color = option_list.wxa_shop_nav_font_color
				
				}
			);
			
			//获取屏幕高度
			uni.getSystemInfo({
			    success: function (res) {
					
					that.windowHeight = res.windowHeight;
			    }
			});
			
			
			
			that.getImg();
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			
			console.log('onPullDownRefresh onPullDownRefresh onPullDownRefresh');
			
			uni.showToast({
				title: '数据更新中……',
				//icon:'loading'
			});
			
			setTimeout(function () {
			    uni.stopPullDownRefresh();
				
				uni.hideToast();
				
			}, 1000);
			
			
			this.getImg();
			
			
		},
		methods:{
			
			getImg:function(){
				//var userInfo = this.abotapi.get_user_info();
				var that = this;
				
				//判断登录
				var userInfo = this.abotapi.get_user_info();		
				if(!userInfo || !userInfo.userid){
					var last_url = '/pages/user/myQR/myQR';
					
					this.abotapi.goto_user_login(last_url, 'normal');
					
					return;				
				}
				
				var post_data = {
						sellerid: this.abotapi.get_sellerid(),
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
						appid: this.abotapi.globalData.xiaochengxu_appid,
						platform: this.abotapi.globalData.current_platform
					};
					
				// #ifdef MP-WEIXIN
					post_data.qrcode_type = 'wxa_qrcode';
				// #endif
				
				
				this.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=get_my_qrcode',
					data: post_data,
					success: function (res) {
						console.log("res",res);
						
						if(res.data.code == -1){
							that.abotapi.del_user_info();
							
							var last_url = '/pages/user/myQR/myQR';							
							that.abotapi.goto_user_login(last_url, 'normal');
							return;
						}
						else if(res.data.code == 1){
							that.qrcode_url = res.data.qrcode_url;
							//that.xuanchuan_img = res.data.option_list.xuanchuan_img;
							that.option_list = res.data.option_list
							
							if(that.option_list && that.option_list.title_text){
								uni.setNavigationBarTitle({
									title:that.option_list.title_text
								})
							}
						}
						
					},
					fail: function () {
						// fail
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					}
				});
			},
			
			
			
			previewImage:function(e) {
				console.log('123456123456123',e)
				//预览图片
				uni.previewImage({
					urls: this.qrcode_url,
					indicator:'default',
					loop:false,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
					
					
				});
			},
			
			
			
			
			
			
			// 截图，调用webview、Bitmap方法
			printscreen(){
				this.tis = "正在保存"
				let ws=this.$mp.page.$getAppWebview();
				let bitmap = new plus.nativeObj.Bitmap();
				this.showBtn = false;
				this.$nextTick(function(){
					setTimeout(()=>{
						ws.draw(bitmap,(e)=>{
							this.showBtn = true;
							console.log('bitmap绘制图片成功');
							console.log("e: " + JSON.stringify(e));
							bitmap.save("_doc/Qr.jpg", {
								overwrite: true,
								quality: 100
							}, (i)=>{
								plus.gallery.save(i.target,(e)=>{
									uni.showToast({
										title:'保存成功'
									})
									this.tis = "保存到相册"
									bitmap.clear(); //销毁
								},(e)=>{
									bitmap.clear(); //销毁
								});
							},(e)=>{
								console.log('保存图片失败：' + JSON.stringify(e));
							});
						},(e)=>{
							console.log('bitmap绘制图片失败：'+JSON.stringify(e));
						});
					},200)
				})
			}
		}
	}
</script>

<style lang="scss">

.myblock{
	width: 100%;
	height: 200rpx;
	background-color: #fff;
	display: flex;
	justify-content: center;
	
}
.QR{
	width: 60vw;
	height: 60vw;
	margin: 0 auto;
	margin-top: -180upx;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	image{
		width: 50vw;
		height: 50vw;
	}
}
.title{
	width: 100%;
	margin-top: 30upx;
	margin-bottom: 20upx;
	display: flex;
	justify-content: center;
	font-size: 36upx;
	color: #fff;
}
.btn{
	
	width: 50%;
	height: 80upx;
	border-radius: 80upx;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 20upx;
	margin: 0 auto;
	margin-top: 50upx;
	background-color: rgba(255,255,255,.8);
}
.logo{
	width: 100%;
	display: flex;
	justify-content: center;
	position: absolute;
	bottom: 25upx;
	image{
		width: 39.6%;
	}
	
}
.xuanchuan_img{
	width:100%;	
	padding-bottom: 0rpx;
}

.mydescribe{
	margin: 40rpx;
	padding: 20rpx;
	border: 1rpx solid #fff;
	border-radius: 10rpx;
	color: #fff;
}
</style>
