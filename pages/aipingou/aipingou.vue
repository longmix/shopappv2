<template>
	<view>
<!-- 

1、去拼团的跳转：  /pages/product/detail?productid=12345&cuxiao_huodong=aipingou
2、去开团的跳转：  /pages/order/pay?productid=12345&cuxiao_huodong=aipingou
3、去参加某个团：  /pages/order/pay?productid=12345&cuxiao_huodong=aipingou&tuansn=abcdefg123456
    tuansn为团编号

-->

		<!--cms/discover/discover.wxml-->

		<!--宣传图片start-->
		<view class="aipingou_image">
			<image class="tupian" :src="aipingou_setting.xuanchuan_tupian"></image>

		</view>
		<!--宣传图片end-->

		<!--宣传文案-->
		<view class="wenan">
			<view class="wenan_content">{{aipingou_setting.xuanchuan_wenan}}</view>
		</view>
		<!--宣传文案end-->
		
		<!---我的拼购-->
		<view class="my_aipingou">
			<button @click="toMypingou()">我的拼购</button>
		</view>

		<!--爱拼购活动-->
		
		<view class="aipingou">
			<view class="aipingou_title">
				<h1>{{aipingou_setting.huodong_title}}</h1>
			</view>
			<view class="list_con">
				
			          <view class="aipingou_list" v-for=" (item,idx) in ruleList" :key="idx">
			            <table class="list_table">
			              <tr>
			                <td class="aipingou_product_image">
								<image class="product_image"  :src="item.product_image"></image>
							</td>
			                <td>
								<view class="product_name">{{item.product_name}}</view>
								<br />
								<view style="display: flex;">

									<view style="font-size: 16rpx;margin-left:20px;"  @tap="aipingou_buy_together(item.productid)">
										<image class="tubiao" src="https://yanyubao.tseo.cn/Tpl/static/images/aipingou_pintuan.png" ></image>
										<view>去拼购</view>
									</view>	

									<view style="font-size: 16rpx;margin-left: 40px;" @tap="aipingou_open_tuan(item.productid)">
										<image class="tubiao" src="https://yanyubao.tseo.cn/Tpl/static/images/aipingou_kaituan.png"></image>
										<view>去开团</view>
									</view>
								</view>	
							</td>  
			              </tr>
			            </table>
			          </view>
			</view>
		</view>	
   
	</view>
	

</template>

<script>
	export default {
		data() {
			return {
				aipingou_setting:'',
				ruleList:'',
				


			}
		},
		onLoad(options) {

			//请求服务器,刷新卡券信息
			console.log('网页参数如下:');
			
			this.abotapi.set_shop_option_data(this, function(that002, option_data){
				that002.__get_rule_list();
				that002.__get_setting_list();
				
			
				 
				uni.setNavigationBarTitle({
					title: '爱拼购',
				})
				
			});

		   

		    
		   
		      //if (!sellerid && typeof (sellerid) != "undefined" && sellerid != 0){
		     
		     // this.abotapi.globalData.sellerid = sellerid
		      //this.abotapi.set_sellerid(sellerid);
		      
		     // console.log('当前sellerid:' + sellerid + "，来自请求");
		   
		     
			
		},
		
	     function() {
		   var that = this;
   
		   setTimeout(function() {
		    uni.stopPullDownRefresh();
			that.__get_rule_list();
		    uni.hideToast();
		   }, 1000);
		   
		},

		onShow() {

			
		},
		
		
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			var that = this;
		
			this.page = 1;
			this.isShowBottomLine = 0;
			this.aipingou_setting = [];
			this.ruleList = [];
			
			
			
			
			this.__get_setting_list();
			this.__get_rule_list();
			
			console.log('下拉刷新==============')
			//停止当前页面的下拉刷新
			
			uni.stopPullDownRefresh();
			
			
			},
		
		methods: {
			//跳转到“我的拼购”页面
			toMypingou() {
			
				uni.navigateTo({
					url: '/pages/aipingou/mypingou'
				})
				this.isfirst = false;
			},
			
			//获取拼团宣传图片和标题
			__get_setting_list: function() {
				var that = this;
				var post_url = this.abotapi.globalData.yanyubao_server_url + '/openapi/AipingouData/get_seting';


				that.abotapi.abotRequest({
					url: post_url,
					data: {
						sellerid: that.abotapi.get_sellerid(),
					},

					success: function(res) {

						//获取拼团宣传图片
						that.aipingou_setting = res.data.aipingou_seting;
						

						console.log('aaaaaaaaaa', res.data.aipingou_seting.xuanchuan_tupian);
						//console.log('8888====11>>', that.aipingou_list);
						
						uni.setNavigationBarTitle({
						 title: res.data.aipingou_seting.huodong_title
						})
 

					},

					fail: function(e) {


					},
				});


			},
			//获取拼团活动列表
			__get_rule_list: function(){
				var that = this;
				var post_url = this.abotapi.globalData.yanyubao_server_url + '/openapi/AipingouData/get_rule_list';
				
				that.abotapi.abotRequest({
					url: post_url,
					data: {
						sellerid: that.abotapi.get_sellerid(),
					},
					success: function(res) {
					
						that.ruleList = res.data.rule_list;
				
			
						console.log('aaaaaaaaaa', res.data.rule_list);
						console.log('8888====11>>', that.ruleList);
					 
					
					},
					fail: function(e) {
					
					
						},
					});	
			},
				
			//去开团
			aipingou_open_tuan:function(productid){
				var that =this;
				var userInfo = this.abotapi.get_user_info();
				
				//console.log('88888aaaaaaaaa',userInfo,userInfo.userid);
				//判断是否登录
				
				var last_url = '/pages/order/pay?action=direct_buy&productid='+ productid +'&amount=1&cuxiao_huodong=aipingou';
				
				if (!userInfo || !userInfo.userid) {
					uni.showToast({
						title: '请先登录',
						icon: 'none',
						duration: 1000,
					});
					
					this.abotapi.goto_user_login(last_url, 'normal');
					return;
				}
				
				uni.redirectTo({
					url:last_url,
				});
				
			},
			//去拼购
			aipingou_buy_together:function(productid){
				var that =this;
				var userInfo = this.abotapi.get_user_info();
				
				//console.log('88888aaaaaaaaa',userInfo,userInfo.userid);
				//判断是否登录
				var last_url = '/pages/product/detail?productid='+ productid +'&amount=1&cuxiao_huodong=aipingou';
				
				if (!userInfo || !userInfo.userid) {
					uni.showToast({
						title: '请先登录',
						icon: 'none',
						duration: 1000,
					});
					
					this.abotapi.goto_user_login(last_url, 'normal');
					return;
				}
				
				uni.redirectTo({
					url:last_url,
				});
				
			}
		},
		
	}
</script>

<style>
	page {
		background: #d3d7d4;
	}

	.aipingou_image {
		width: 100%;
		font-size: 15px;
		display: flex;
		justify-content: center;

	}

	.tupian {
		width: 100%;
	

	}

	.wenan {
		width: 100%;
		margin-top: 30upx;
		display: flex;
		background-color: #fffffb;
		border-radius: 10rpx;
	}
	.wenan_content{
		width: 100%;
		margin: 30rpx 30rpx;
	}
	
	.my_aipingou{
		width: 100%;
		background-color: #fffffb;
		border-radius: 10rpx;
		margin-top: 30upx;
	}
	


	.aipingou {
		width: 100%;
		height: 310rpx;
		margin-top: 30upx;
		text-align: center;
		justify-content: center;
		border:0px;
		background-color: #fffef9;
		border-radius: 20rpx;
	}
	
	.aipingou_list{
		background-color: #fffffb;
		margin-top: 20rpx;
		border-radius: 20rpx;
	}

	.aipingou_product_image{
		width: 56%;
		height: 350rpx;

	}
	.product_image{
		width: 100%;
		height:100%;
		border-radius: 10rpx;
	}
	.product_name{
		text-align: left;
	
	}

	.aipingou_title{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		color: #fffffb;
		border-radius: 5rpx;
		background-color:#145b7d;
	}
	.tubiao{
		width: 60rpx;
		height: 60rpx;
	}
</style>
