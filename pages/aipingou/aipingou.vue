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
			<image class="tupian" :src="aipingou_xuanchuan_image"></image>

		</view>
		<!--宣传图片end-->

		<!--宣传文案-->
		<view class="wenan">
			<view class="content">{{aipingou_xuanchuan_wenan}}</view>
		</view>
		<!--宣传文案end-->

		<!--爱拼购活动-->
		<view class="aipingou">
			<div class="list_con">
			          <div class="l_top">
			            <table class="list_table">
			              <tr>
			                <td class="tf32red">
								<image class="tf32red1"  :src="aipingou_xuanchuan_image"></image>
							</td>
			                <td class="tf32r">
								<h1>活动标题(商品名称)</h1>
								<br />
								<button class="qupingou1">去拼购</button>
								<br />
								<button class="qupingou2">去开团</button>
							</td>
			                <td>
								
							</td>
			              </tr>
			              
			            </table>
			          </div>
			</div>

		</view>
		<view class="footer">
			
		</view>
    </view>
	

</template>

<script>
	export default {
		data() {
			return {
				aipingou_xuanchuan_image:'',
				aipingou_xuanchuan_wenan:','


			}
		},
		onLoad(options) {
			this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
		   
		      //uni.setNavigationBarTitle({
		      // title: this.abotapi.globalData.shop_name
		      //})
		      
		      var that = this
		   
		      //请求服务器,刷新卡券信息
		      console.log('网页参数如下:');
		    
		   
		      //if (!sellerid && typeof (sellerid) != "undefined" && sellerid != 0){
		     
		      this.abotapi.globalData.sellerid = sellerid
		      this.abotapi.set_sellerid(sellerid);
		      
		      console.log('当前sellerid:' + sellerid + "，来自请求");
		   
		      this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
			
		},
		onPullDownRefresh: function() {
		   var that = this;
   
		   setTimeout(function() {
		    uni.stopPullDownRefresh();
			this.__get_rule_list();
		    uni.hideToast();
		   }, 1000);
		   
		  },

		onShow() {
			
			this.__get_rule_list();
			this.__get_setting_list();
			
		},
		methods: {
			__get_setting_list: function() {
				var that = this;
				var post_url = this.abotapi.globalData.yanyubao_server_url + '/openapi/AipingouData/get_seting';


				that.abotapi.abotRequest({
					url: post_url,
					data: {
						sellerid: that.abotapi.get_sellerid(),
					},

					success: function(res) {

						var settingList = res.data.data;
						that.aipingou_xuanchuan_image = res.data.aipingou_seting.xuanchuan_tupian;
						that.aipingou_xuanchuan_wenan = res.data.aipingou_seting.xuanchuan_wenan;

						console.log('aaaaaaaaaa', res.data.aipingou_seting.xuanchuan_tupian);
						console.log('8888====11>>', that.aipingou_list);
 

					},

					fail: function(e) {


					},
				});


			},
			__get_rule_list: function(){
				console.log('000000');
				
			},
			
		},
		
	}
</script>

<style>
	page {
		background: #d3d7d4;
	}

	.aipingou_image {
		width: 100%;
		background-color: #fffffb;
		font-size: 15px;
		display: flex;
		justify-content: center;

	}

	.tupian {
		width: 100%;
		border: 1rpx #fffffb solid;
		border-radius: 10rpx;

	}

	.wenan {
		width: 100%;
		margin-top: 30upx;
		display: flex;
		background-color: #fffffb;
		border: 1rpx #fffffb solid;
		border-radius: 20rpx;
	}


	.aipingou {
		width: 100%;
		height: 310rpx;
		margin-top: 20upx;
		text-align: center;
		justify-content: center;
		border: 1rpx #fffffb solid;
		background-color: #fffffb;
		border-radius: 20rpx;
	}


	.tf32red{
		width: 50%;
		height: 300rpx;
		text-align: center;
		border: 1rpx #fffffb solid;
		justify-content: center;
	}
	.tf32red1{
		width: 100%;
		height:300rpx;
		border-radius: 10rpx;
	}
	.tf32r{
		width: 50%;
		height: 300rpx;
		border: 1rpx #fffffb solid;
	
	}

	.qupingou1 {
		font-size: 18rpx;
		background-color: #145b7d;
	}

	.qupingou2 {

		font-size: 18rpx;
		background-color: #145b7d;
	}
	.footer{
		width: 100%;
		border: 1rpx #fffffb solid;
		background-color: #9d9087;
	}
</style>
