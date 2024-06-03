<template>
<view class="content">
	<view class="bg_img_yulan">
		<image :src="first_image" style="width: 100%;" mode="widthFix"></image>
		<p class="bg_img_tishi">长按上图查看原图</p>
		
		<button class="btn_bg_img" @click="uploadImg" :style="{background: wxa_shop_nav_bg_color}">
			<text :style="{color:wxa_shop_nav_font_color}">选择图片并抠图</text>
		</button>
	</view>
	<view class="bg_img_save">
		<view class="btn_save">
			<button class="save_one" @click="saveFile">保存抠图</button>
			<button class="save_all">保存所有</button>
		</view>
	</view>
	
	<view class="demoBox">
		<view class="item" v-for="(item, index) of image_list" :key="index">
			<image :src="item.url" style="width: 100%;" mode="widthFix"></image>
		</view>
		
	</view>
	
</view>
</template>

<script>
	
	
	export default{
		data(){
			return{
				//商城的Logo、导航栏背景颜色和文字颜色
				wxa_shop_operation_logo_url:'',
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',

				tempFilePaths:'',
				
				first_image:'https://yanyubao.tseo.cn/Tpl/static/images/3.jpg',
				first_image_old:'',
				
				current_filemd5:'',
				
				image_list:[],

			}
		},
		onLoad(){
			var that = this;
			
			uni.setNavigationBarTitle({
				title : that.abotapi.globalData.default_shopname
			});
			
			
			this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
			
		},
		onReachBottom() {
			
		},
		onPullDownRefresh() {
			
		},
		methods:{
			//这是每个vue文件都必须执行的回调函数，用于渲染头部导航栏背景色和文字颜色
			callback_function_shop_option_data: function(that, cb_params) {
				
				console.log('callback_function_shop_option_data===>>>', cb_params);
			
				uni.showLoading({
					title: '正在加载中'
				});
				
				
				
				//商城的Logo、导航栏背景颜色和文字颜色
				that.wxa_shop_operation_logo_url = cb_params.option_list.wxa_shop_operation_logo_url;
				that.wxa_shop_nav_bg_color = cb_params.option_list.wxa_shop_nav_bg_color;
				that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
				
				
				that._generate_image_list();

			 },
			 uploadImg:function(){
				 
				 var that = this;
				 
				 uni.chooseImage({
				 	count:1,  //选择限制上传的图片的数量。
				    success:res => {
				 		console.log('res',res);
						
						//重新定义一个路径,获取res下的路径
				        var tempFilePaths = res.tempFilePaths;
						
				 		console.log('res',tempFilePaths[0]);
						
						
						
						uni.showLoading({
							title: '图像处理中...',
						});
						
						
						//定义一个i,根据tempFilePaths.length判断循环的次数
				 		for(let i = 0; i < tempFilePaths.length;i++){
				 			
							//此处为请求下载图片文件
							uni.uploadFile({
				 			    url: that.abotapi.globalData.yanyubao_server_url + '/openapi/RemoveImgBgDiyData/upload_image_by_phone', //仅为示例，非真实的接口地址
				 			    filePath: tempFilePaths[i],
				 			    name: 'file',
				 			    formData: {
				 			        'sellerid': that.abotapi.globalData.default_sellerid,
									'type': 0,

				 			    },
				 			    success: function (uploadFileRes) {
									console.log('1111111111111111111111111111111', uploadFileRes);
									
									//定义一个res,将json字符串转化为json格式
				 					var JSON_uploadFileRes = JSON.parse(uploadFileRes.data);
									
									
									console.log('1505055015151515',  JSON_uploadFileRes);
									//如果输出的res中的code不为1，即没有处理成功。
									if (JSON_uploadFileRes.code != 1) {
										
										uni.hideLoading();
										
										uni.showModal({
											title:'提示',
											content:'处理失败！',
											success:function(res){
											}
										});
										
										return;
										
									}
									
									that.first_image = JSON_uploadFileRes.url;
									that.current_filemd5 = JSON_uploadFileRes.filemd5;
									
									//调用数据列表
									that._generate_image_list();
								},
								fail: () => {
									uni.hideLoading();
								}
							
								
								
				 			});
				 		}
						
				     },
					 
				 });

					
				},
				//请求抠图列表
				_generate_image_list:function(){
					var that = this;
					
					
					if(uni.getStorageSync('current_filemd5')){
						that.current_filemd5 = uni.getStorageSync('current_filemd5');
					}
					
					
					if(!that.current_filemd5){
						
						uni.hideLoading();
						
						return;
					}
					
					var userInfo = that.abotapi.get_user_info();
					
					if(!userInfo || !userInfo.userid || !userInfo.checkstr){
						
						uni.hideLoading();
						
						
						//跳转前先记录当前的filemd5
						uni.setStorageSync('current_filemd5', that.current_filemd5);
						
						
						that.abotapi.goto_user_login('/pages/tools/remove_img_bg');
						return;
					}
					
					that.abotapi.abotRequest({
						 url: that.abotapi.globalData.yanyubao_server_url + '/openapi/RemoveImgBgDiyData/many_image_list',
						 method:'post',
						 data: {
						    sellerid: that.abotapi.globalData.default_sellerid,
						 	checkstr: userInfo.checkstr,
						 	userid: userInfo.userid,
							filemd5: that.current_filemd5
							
						},
						success: function (res){
							console.log('RemoveImgBgDiyData/many_image_list返回====>>>>',   res.data) 
							
							uni.hideLoading();
							
							
							uni.getStorage({
								key: 'current_filemd5',
								success: (res00888) => {
									
									uni.removeStorage({
										key: 'current_filemd5',
										success: (res001) => {
											console.log('清空缓存的filemd5...');
										}
									});
									
								}
							});
							
							//记录没有去背景之前的图片的URL
							that.first_image_old = that.first_image;
							//赋值去背景的图片的URL
							that.first_image = res.data.first_img;

							//一组拼图
							that.image_list = res.data.img_list; 
							
							//that.setWaterFallLayout();
						},
						fail:()=>{
							uni.hideLoading();
						},
						
					})
					
				},
				//请求下载图片（原图到相册）
				
				
				
				
			}
		}
</script>

<style ang="scss" scoped>
	.content{
		padding: 20rpx;
	}
	.btn_bg_img{
		margin-top: 20rpx;
		color: #1d1d1d;
	}
	.bg_img_tishi{
		text-align: center;
		margin-top: 10rpx;
		color: #787878;
		
	}
	.btn_save{
		flex-flow: row;
		justify-content: space-between;
		display: flex;
		margin-top: 40rpx;
	}
	.save_one{
		width: 50%;
		margin-right: 30rpx;
		border: 2rpx solid #3f7fbe;
		color: #3f7fbe;
		background-color: #d9e2ed;
		
	}
	.save_all{
		width: 50%;
		border: 2rpx solid #3f7fbe;
		color: #3f7fbe;
		background-color: #d9e2ed;
	}
	.demoBox{
		margin-top: 40rpx;
		column-gap: 10rpx;
		column-count: 2;
		
	}
	.item{
		width: 100%;
		/* height: auto; */
		box-sizing: border-box;
		margin: 0 30rpx 30rpx 0;
		border-radius: 8rpx;
		background-color: #fff;
		display: inline-block;
		overflow: hidden;
		
	}
	
	
	
	

</style>