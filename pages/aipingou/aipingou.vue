<template>
	<view>
<!-- 

1、去拼团的跳转：  /pages/product/detail?productid=12345&cuxiao_huodong=aipingou&rulesn=abcdefgdgdfgfd13234
2、去开团的跳转：  /pages/order/pay?productid=12345&cuxiao_huodong=aipingou
3、去参加某个团：  /pages/order/pay?productid=12345&cuxiao_huodong=aipingou&tuansn=abcdefg123456
    tuansn为团编号

-->

		<!--cms/discover/discover.wxml-->

		<!--宣传图片start-->
		<view class="aipingou_image">
			<image class="tupian" :src="aipingou_setting.xuanchuan_tupian" mode="widthFix"></image>
		</view>
		<!--宣传图片end-->

		<!--宣传文案-->
		<view class="wenan">
			<view class="wenan_content">{{aipingou_setting.xuanchuan_wenan}}</view>
		</view>
		<!--宣传文案end-->

		<!--爱拼购活动-->
		
		<view class="aipingou_list" v-if="ruleList && (ruleList.length > 0)">
			<view class="aipingou_title"
				:style="{backgroundColor:btn_bg_color}">
				<h1>{{aipingou_setting.huodong_title}}</h1>
			</view>
			<view class="list_con"  v-if="aipingou_setting.show_type == 0">
				<!-- 一行一个小图版：活动图片在左侧，活动名称和功能按钮在右侧。 -->
			          <view class="aipingou_item" v-for=" (item,idx) in ruleList" :key="idx">
			                <view class="aipingou_product_image">
								<image class="product_image"  :src="item.product_image" mode="widthFix" ></image>
							</view>
			                <view style="width: 50%;">
								<view class="product_name">{{item.product_name}}</view>
								<view style="display: flex;width: 100%;margin-top: 50rpx;">
									<view style=";width: 50%;"  @tap="aipingou_buy_together(item.productid,item.rulesn)">
										<image class="tubiao" src="https://yanyubao.tseo.cn/Tpl/static/images/aipingou_pintuan2.png" ></image>
										<view class="pingou_font">去拼购</view>
									</view>	

									<view style="width: 50%;" @tap="go_to_qukaituan(0, 'center',item.productid)">
										<image class="tubiao" src="https://yanyubao.tseo.cn/Tpl/static/images/aipingou_kaituan2.png"></image>
										<view class="pingou_font">去开团</view>

									</view>
								</view>	
							</view>  
			          </view>
			</view>
			
			<view class="list_con" v-else>
				 <!-- 一行一个大图版：活动图片在上方，活动名称和功能按钮在下方。  @tap="aipingou_open_tuan(item.productid)" -->
			    <view class="aipingou_list" v-for=" (item,idx) in ruleList" :key="idx">
					<view class="list_table">
						<view>
							<image class="image_da" :src="item.product_image" mode="widthFix"></image>
						</view>	
						<view class="product_name">{{item.product_name}}</view>
					</view>
					<view class="tubiao_anniu">
					
						<view style="width: 50%;"  @tap="aipingou_buy_together(item.productid,item.rulesn)">
							<image class="tubiao" src="https://yanyubao.tseo.cn/Tpl/static/images/aipingou_pintuan2.png" ></image>
							<view class="pingou_font">去拼购</view>
						</view>	
					
						<view style="width: 50%;" @tap="aipingou_open_tuan(item.productid)">
							<image class="tubiao" src="https://yanyubao.tseo.cn/Tpl/static/images/aipingou_kaituan2.png"></image>
							<view class="pingou_font">去开团</view>
						</view>
					</view>
				
			    </view>
			</view>
			
		</view>
			
		<!---我的拼购悬浮图标-->
		<view class="home-p" @click="toMypingou()" v-if="aipingou_setting.show_mypintuan_icon == 1">
			<image :src="aipingou_setting.anniu_tupian" style="width: 100rpx;" mode="widthFix"></image>
		</view>
		
		<!-- 2020.12.14 -->
		<openAlert ref="openAlertKaijiang"
		 :AlertClass="AlertClassKaijiang"
		 :AlertPosition="AlertPositionKaijiang">
		 <view style="background-color: #FFFFFF;padding: 60rpx;border-radius: 10rpx;width: 400rpx;border: 1rpx solid #666;">
			<view style="display: flex;text-align: center;">
				<view class="sub">
				 	<view class="icon jian" data-alpha-beta="0" @click="changeNum($event)"></view>
				 </view>
				 
					<view class="input" @tap.stop="discard">
						<input type="number" v-model="product_amount" />
					</view>
					
				<view class="add">
					<view class="icon jia" data-alpha-beta="1" @click="changeNum($event)"></view>
				</view>
			</view>
			
			<view class="input_2"><input disabled="disabled" 
				style="border-radius: 10rpx;border: 1rpx solid #000000;width: 200rpx;height: 60rpx; margin: 0 auto;text-align: center;background-color: red;color: #FFFFFF;" 
				:style="{backgroundColor:btn_bg_color}"
				class="submit_1" type="button" value="去开团" @tap="go_to_aipingou()"></view>
		 </view>
		</openAlert>	
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btn_bg_color:'red',
				
				aipingou_setting:[],
				ruleList:'',
				
				
				//2020.12.14
				AlertClassKaijiang: 0,
				AlertPositionKaijiang: '',
				product_amount:1,
				productid:''
			}
		},
		onLoad(options) {

			//请求服务器,刷新卡券信息
			console.log('网页参数如下:');
			
			this.abotapi.set_shop_option_data(this, function(that002, option_data){
				that002.btn_bg_color = that002.abotapi.getColor();
				
				uni.setNavigationBarTitle({
					title: '爱拼购',
				})
				
				that002.__get_rule_list();
				that002.__get_setting_list();
				
			
				 
				
				
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
		
			this.isShowBottomLine = 0;
			this.aipingou_setting = [];
			this.ruleList = [];
			
			
			this.__get_setting_list();
			this.__get_rule_list();
			

			
			console.log('下拉刷新==============')
			//停止当前页面的下拉刷新
			
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
			
			},
			
			
			
			
		
		methods: {
			
			searchValueInput:function(e){
				console.log('aaaaaaaaaaaaaaaaaaa',e);
				var that = this;
				that.counter_value = e.detail.value
				//var key = that.counter_value;		
			},
			go_to_qukaituan(Class, Position, productid) {
				var that = this;	
				that.productid = productid;
				//console.log('aaaaaaaaaaaaaaaaaaa',that.counter_value);
			    this.$nextTick(function() {
			
			        this.AlertClassKaijiang = Class;
			        this.AlertPositionKaijiang = Position;
			        this.$nextTick(function() {
			            this.$refs.openAlertKaijiang.Show();
			        });
			    });
			},
			
			//跳转到“我的拼购”页面
			toMypingou() {
				var userInfo = this.abotapi.get_user_info();
				console.log('88888wwww',userInfo);
				var last_url = '/pages/aipingou/mypingou'
				if (!userInfo || !userInfo.userid) {
					uni.showToast({
						title: '请先登录',
						icon: 'none',
						duration: 1000,
					});
					
					this.abotapi.goto_user_login(last_url, 'normal');
					return;
				}
				
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
						console.log('111111',res.data.code);
						//获取拼团宣传图片
						if(res.data.code == 1){
							that.aipingou_setting = res.data.aipingou_seting;
							
							
							//console.log('aaaaaaaaaa', res.data.aipingou_seting.xuanchuan_tupian);
							console.log('8888====11>>', res);
							
							uni.setNavigationBarTitle({
							 title: res.data.aipingou_seting.huodong_title
							})
							 
						}

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
			
						//console.log('aaaaaaaaaa', res.data.rule_list);
						//console.log('8888====11>>', that.ruleList);
					 
					
					},
					fail: function(e) {
					
					
						},
					});	
			},
			
			//获取页面格式
			// __get_setting_list: function() {
			// 	var that = this;
			// 	var post_url = this.abotapi.globalData.yanyubao_server_url + '/openapi/AipingouData/get_seting';
			
			
			// 	that.abotapi.abotRequest({
			// 		url: post_url,
			// 		data: {
			// 			sellerid: that.abotapi.get_sellerid(),
			// 		},
			
			// 		success: function(res) {
			
			// 			//获取拼团宣传图片
			// 			that.aipingou_setting = res.data.aipingou_seting;
						
			
			// 			//console.log('aaaaaaaaaa', res.data.aipingou_seting.xuanchuan_tupian);
			// 			//console.log('8888====11>>', that.aipingou_list);
						
			// 			uni.setNavigationBarTitle({
			// 			 title: res.data.aipingou_seting.huodong_title
			// 			})
			 
			
			// 		},
			
			// 		fail: function(e) {
			
			
			// 		},
			// 	});
			
			
			// },
			
			//去开团
			go_to_aipingou:function(){
				var that =this;
				var userInfo = this.abotapi.get_user_info();
				
				//console.log('88888aaaaaaaaa',userInfo,userInfo.userid);
				//判断是否登录
				
				var last_url = '/pages/order/pay?action=direct_buy&productid='+ that.productid +'&amount='+ that.product_amount +'&cuxiao_huodong=aipingou';
				
				if (!userInfo || !userInfo.userid) {
					uni.showToast({
						title: '请先登录',
						icon: 'none',
						duration: 1000,
					});
					
					this.abotapi.goto_user_login(last_url, 'normal');
					return;
				}
				
				//隐藏刚才的弹窗
				this.AlertClassKaijiang = 0;
				this.AlertPositionKaijiang = '';
				this.$refs.openAlertKaijiang.Close();
				    
				
				uni.navigateTo({
					url:last_url,
				});
				
			},
			//去拼购
			aipingou_buy_together:function(productid,rulesn){
				var that =this;
				var userInfo = this.abotapi.get_user_info();
				
				//console.log('88888aaaaaaaaa',userInfo,userInfo.userid);
				//判断是否登录
				var last_url = '/pages/product/detail?productid='+ productid +'&amount=1&cuxiao_huodong=aipingou&rulesn='+ rulesn;
				
				if (!userInfo || !userInfo.userid) {
					uni.showToast({
						title: '请先登录',
						icon: 'none',
						duration: 1000,
					});
					
					this.abotapi.goto_user_login(last_url, 'normal');
					return;
				}
				
				uni.navigateTo({
					url:last_url,
				});
				
			},
			
			//修改数量
			changeNum: function(e) {
				console.log("数量发生变化_e", e);
				var that = this;
				if (e.target.dataset.alphaBeta == 0) {
					if (that.product_amount <= 1) {
						that.product_amount = 1
					} else {
						that.product_amount = parseInt(that.product_amount) - 1;
					};
				} else {
					that.product_amount = parseInt(that.product_amount) + 1;
				};
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
		font-size: 15px;
		display: flex;
		justify-content: center;

	}

	.tupian {
		width: 100%;
	

	}

	.wenan {
		width: 100%;
		font-size: 30rpx;
		margin-top: 0rpx;
		display: flex;
		background-color: #fffffb;
		border-radius: 0rpx;
	}
	.wenan_content{
		width: 100%;
		font-size: 30rpx;
		margin: 30rpx 30rpx;
		font-size: 25rpx;
	}
	
	


	.aipingou_list {
		width: 100%;
		height: 310rpx;
		margin-top: 0rpx;
		font-size: 30rpx;
		text-align: center;
		justify-content: center;
		border:0rpx;
		background-color: #fffef9;
		border-radius: 20rpx;
		margin-bottom: 100rpx;
	}
	
	.aipingou_item{
		background-color: #fffffb;
		margin-top: 20rpx;
		border-radius: 20rpx;
		display: flex;
	}

	.aipingou_product_image{
		width: 50%;
	}
	.product_image{
		width: 100%;
		border-radius: 10rpx;
		padding: 10rpx;
	}
	.tubiao_anniu{
		display: flex;
		margin-top: 20rpx;
		width: 100%;
	}
	.product_name{
		text-align: left;
		margin-left: 20rpx;
		margin-top: 20rpx;
		font-size: 25rpx;
		font-weight: bold;
	}
	.image_da{
		width: 98%;
		margin-top: 5rpx;
		border-radius:20rpx;
	}

	.aipingou_title{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		color: #fffffb;
		border-radius: 5rpx;
		background-color:#145b7d;
	}
	.aipingou_title h1{
		background-color: red;
		font-size: 30rpx;
	}
	.tubiao{
		width: 80rpx;
		height: 80rpx;
	}
	.home-p{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		position: fixed;
		z-index: 100;
		right: 40upx;
		border-radius: 50%;
		bottom: 120upx;
	}
	.input input{
		font-size: 32rpx;
	}
	.pingou_font{
		font-size: 25rpx;
		color: #666;
	}	
</style>

								