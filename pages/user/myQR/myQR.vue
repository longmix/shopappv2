<template>
	<view :style="{height:windowHeight+'px',backgroundColor:wxa_shop_nav_bg_color,fontColor:wxa_shop_nav_font_color}">
		<view :style="{backgroundColor:wxa_shop_nav_bg_color,fontColor:wxa_shop_nav_font_color}">
			<view class="block">
				
			</view>
			<view class="QR">
				<image :src="qrcode_url"></image>
			</view>
			<view class="title" :style="{backgroundColor:wxa_shop_nav_bg_color,fontColor:wxa_shop_nav_font_color}">
				请用手机扫描二维码
			</view>
			<view class="btn" v-show="showBtn" @tap="printscreen">
				{{tis}} 
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
				tis:"保存到相册",
				showBtn:false,
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				qrcode_url:'',
				windowHeight:''
			};
		},
		onLoad() {
			// #ifdef APP-PLUS
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
					};
					
				// #ifdef MP-ALIPAY
				post_data.qrcode_type = 'normal_qrcode';
				// #endif
				
				
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_my_qrcode',
					method:'post',
					data: post_data,
					header: {
						'Content-Type':  'application/x-www-form-urlencoded'
					},
					success: function (res) {
						console.log("res",res);
						if(res.data.code == 1){
							that.qrcode_url = res.data.qrcode_url;
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

.block{
	width: 100%;
	height: 30vh;
	background-color: #fff;
	display: flex;
	justify-content: center;
	
}
.QR{
	width: 60vw;
	height: 60vw;
	margin: -40vw auto 0 auto;
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
	margin-top: 50upx;
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
</style>
