<template>
	<view>
		<!-- <view	style="display: flex;margin:20rpx" class="">
			<view	style="height:60rpx;width: 80rpx;border-bottom: 1rpx solid #02A7F0;display: flex;justify-content: center;font-size: 40rpx;">全部</view>
			<view	class="fenlei">高中</view>
			<view	class="fenlei">大学</view>
			<view	class="fenlei">文科</view>
			<view	class="fenlei">理科</view>
		</view> -->
		<view class="course_List" v-for="(item,index) in pinke_course_list" :key="index">
			<view class="course_details" @tap="goto_course_detail(item.productid)">
				<view style="width: 35%;">
					<image  style="width: 200rpx;height: 200rpx;" :src="item.product_picture"></image>
				</view>
				<view class="letterpress">
					<view class="letterpress_theme" style="height: 60rpx;">{{item.name}}</view>
					<view class="zaiyihang_style">
						<!-- <view class="letterpress_title" style="height: 80rpx;width: 100%;">课程时间：{{item.brief}}</view> -->
						<view class="letterpress_title" style="height: 100rpx;width: 100%;white-space: pre-wrap;">{{item.brief}}</view>
						
						<!-- <view class="letterpress_text">{{item.buyers}}人购买</view> -->
					</view>
					<view style="color: #555555; float: right;font-size: 30rpx;display: flex;height: 60rpx;">
						<p style="font-size: 36rpx; color: #D9001B;font-weight: bold;">￥</p>
						<p style="font-size: 36rpx; color: #000000;">{{item.price}}</p>
						<p style="color: #555555;font-size: 26rpx;margin-top: 10rpx;">元/节课</p></view>
				</view>
			</view>
			<!-- <view class="course_details" @tap="goto_course_detail">
				
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/member.jpg"></image>
				
				<view class="letterpress">
					<view class="letterpress_theme">在线拼课，共同学习</view>
					<view class="letterpress_title">那有什么岁月静好，不过是有人替你负重前行</view>
					<view class="zaiyihang_style">
						<view style="color: red; float: left;font-size: 24rpx;">￥4000元</view>
						<view class="letterpress_text">23人学习</view>
					</view>
				</view>
				
			</view> -->
		</view>
		<view class="load">
			{{ is_ok }}
		</view>
		<button class="share-button" open-type="share"	style="display: none;">分享</button>
	
	
	
	
	

	
		<abot-tab-bar :list="tabbar_list" :current_index="0" style="position:fixed;bottom:0;width:100%;left:0;right:0;" @tabChange="tabChange"></abot-tab-bar>
	</view>
</template>

<script>
	import abotTabBar from '@/components/abot-tabbar.vue'
	export default {
		components:{
			abotTabBar,
		},
		data() {
			return{
				
				tabbar_list: [
				{
					"text": "首页",
					"iconPath": 'http://saas.tseo.cn/staticsvc/uploads/2023/12/22/7df1c12f68b69bb935c3f79835c16f026576.png' ,
					"selectedIconPath": 'http://saas.tseo.cn/staticsvc/uploads/2023/12/22/fe34089f16b95595434b6c2716045b826442.png'
					
					
				},
				{
					"text":"我的",
					"iconPath":"http://saas.tseo.cn/staticsvc/uploads/2023/12/22/3ce6e24e61dc59a45be0e98923c39bc18734.png",
					"selectedIconPath":"http://saas.tseo.cn/staticsvc/uploads/2023/12/22/b144cae6ea0ad2355ee2f888b553ac974835.png"
					
				},
				],
				current_page:1,
				pinke_course_list:[],
				current_courseid:0, 
				is_ok:'已经到底了~',
				
				
			}
			
		},
		onLoad() {
			var that = this;
			that.__pingkeliebiao();
		},
		
		
		//上拉加载 触底操作
		onReachBottom() {
			
			
			//if(this.current_page != 100){
				uni.showLoading({
					title:'正在加载中~',
				});
				
				setTimeout(function () {
					uni.hideLoading();
				}, 1500);
				
				//分页page加1
				this.current_page++;
				
				//分页
				this.__pingkeliebiao();
			//};
		},
		
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		
			console.log('onPullDownRefresh onPullDownRefresh onPullDownRefresh');
		
			uni.showToast({
				title: '数据更新中……',
				//icon:'loading'
			});
			
			
			setTimeout(function() {
				uni.stopPullDownRefresh();
			
				uni.hideToast();
			
			}, 1000);
			
			this.abotapi.set_shop_option_data(this,
				this.callback_function_shop_option_data
			);
			
		},
		
		
		
		methods:{
			//这是每个vue文件都必须执行的回调函数，用于渲染头部导航栏背景色和文字颜色
			callback_function_shop_option_data: function(that, cb_params) {
				
				console.log('callback_function_shop_option_data===>>>', cb_params);
			
				uni.showLoading({
					title: '正在加载中'
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 1000);
				
				//商城的Logo、导航栏背景颜色和文字颜色
				that.wxa_shop_operation_logo_url = cb_params.option_list.wxa_shop_operation_logo_url;
				that.wxa_shop_nav_bg_color = cb_params.option_list.wxa_shop_nav_bg_color;
				that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
			
			},
			//从服务器调取拼课列表的接口
			__pingkeliebiao:function(){
				var that = this;
				
				var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					page:that.current_page
				};
				
				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if (userInfo && userInfo.userid) {
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				};
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/OpenApi/PinkeOnlineData/pinke_list',
					data: post_data,
					method: 'post',
					success: function(res){
						console.log("res======",res);
						
						
						//var JSON_res = JSON.parse(res.data.data);
						var data01 = res.data;
						if(data01.code == 1){
							for(var i=0; i<data01.data.length; i++){
								
									that.pinke_course_list.push(data01.data[i]);
								
							}
						}
						
						
						
						//console.log('JSON_res之后的res',JSON_res);
						
						//that.pinke_course_list = res.data.data;
						//that.current_courseid = res.data.data.courseid;
						
						
						console.log('that.pinke_course_list',that.pinke_course_list);
						
					}
				})
				
				
				
			},
			
			
			goto_course_detail:function(productid){
				
				var that = this;
				var my_url = '/pages/course/pinke_detail?productid='+productid;
				this.abotapi.call_h5browser_or_other_goto_url(my_url);
			},
			onShareAppMessage: function () {
			  return {
			    title: '分享',
			    path: '/',
			    imageUrl: 'https://example.com/share-image.jpg'
			  }
			},
			onShareTimeline() {
				return {
					title: '分享',
					imageUrl: '/image/share.jpg'
				}
			}
		}

	}	
</script>

<style>
	image{
		width: 380rpx;
		height: 170rpx;
	}
	.course_List{
		background-color: #ffffff;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		border-bottom: 1rpx solid #eaeaea;
	}
	.course_details{
		margin: 20rpx;
		display: flex;
		justify-content: space-between;
	}
	.letterpress{
		width: 65%;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #7f7f7f;
	}
	.letterpress_theme{
		color: #333333;
		font-weight: bolder; 
		font-size: 40rpx; 
		overflow: hidden; 
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 10rpx;
	}
	.letterpress_title{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		color: #333333;
		overflow: hidden; 
		-webkit-line-clamp: 2;
		margin-bottom: 10rpx;
		font-size: 26rpx;
		
	}
	.letterpress_text{
		color: #958f8a;
		float: right;
		font-size: 24rpx;
	}
	.load{
		color:#958f8a;
		font-size: 26rpx;
		text-align: center;
		margin-top: 50rpx;
		padding-bottom: 50rpx;
	}
	.fenlei{
		height:60rpx;
		width: 80rpx;
		border-bottom: 1rpx solid #eaeaea;
		display: flex;
		justify-content: center;
		font-size: 40rpx;
		margin-left: 30rpx;
	}
</style>