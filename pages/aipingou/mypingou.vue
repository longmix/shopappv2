<template>
	<view>
		<view>
			<view class="mypingou1" v-for=" (item,idx) in tuan_list" :key="idx">
				<table class="mypingou_list" >
					<tr>
						<td>订单编号：{{item.tongji_key}}</td><button class="button2">复制</button>
					</tr>
					<tr>
						<td>参与时间：{{item.join_time}}</td>
					</tr>
					<tr>
						<td>活动名称：{{item.product_name}}</td>
					</tr>
					<tr>
						<td>抽奖序号：{{item.seq}}</td>
					</tr>
					<tr>
						<td>抽奖编号：{{item.choujiangma}}</td>
					</tr>
					<tr>
						<td>中奖状态：<image src="" style="width: 40rpx;height: 40rpx;margin-bottom: -10rpx;"></image>
						             <image src="" style="width: 40rpx;height: 40rpx;margin-bottom: -10rpx;"></image>
						
						</td>
					</tr>
					<tr>
						<td>
							<view style="display: flex;">
							
						    <button style="width: 200rpx; height:60rpx; font-size: 5rpx;">开奖详情</button>
							<button style="width: 200rpx; height:60rpx; font-size: 5rpx;">中奖记录</button>
						    </view>
						</td>
						
					</tr>
	
				</table>
			 
			</view>
		</view>
		
	</view>
	
	 
			 
</template>

<script>
	import mypingou from '../../pages/aipingou/mypingou.vue';
	
	export default {
		components:{
			mypingou
		},
		data() {
			return {
				page:1,				
				tuan_list:[],
				
			}
		},
		
		onLoad(options) {
		
			//请求服务器,刷新卡券信息
			console.log('网页参数如下:');
			
			this.abotapi.set_shop_option_data(this, function(that002, option_data){
				that002.get_pingou_list();
				
				
			
				
			});
		
			
	    },
			
		
		onShow() {
		
		},
		
		
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			var that = this;
			
			console.log('ccccccccccc')
			
				that.get_pingou_list();
				
			},
			
			
	
		methods: {

			//获取拼购团列表
			get_pingou_list: function(){
				var that = this;
				
				
				
				var post_url = that.abotapi.globalData.yanyubao_server_url + '/openapi/AipingouData/get_my_pintuan_list';
				var userInfo = that.abotapi.get_user_info();

				that.abotapi.abotRequest({
					url: post_url,
					data: {
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						sellerid: that.abotapi.get_sellerid(),
						page: that.page,
					},
			
					success: function(res) {
						
					var tuan_list = res.data.my_tuan_list;
					
					that.tuan_list = res.data.my_tuan_list;
					
					
					if (res.data.code == 1) {
						
						that.tuan_list = that.tuan_list.concat(tuan_list);
						that.page = that.page + 1;
						
						
	
					} 
					
					else {
						that.isShowBottomLine = 1;

							uni.showToast({
							  /*title: '到底了!',
							  icon: 'none',
							  duration: 2000,*/
							})
						}
					},
		
					fail: function(e) {
			
			
					},
				});

			},
			
			// jiazai:function(){
			// 	var that = this;
			// 	var page = this.page;
			// 	this.page = page+1;
			// 	that.get_pingou_list();
			// },
		
		
			}
	}
</script>

<style>
	page{
		background: #d3d7d4;
	}
	td{
		font-size: 15rpx;
	}
.mypingou1{
	    display: flex;
	    width: 100%;
		background-color: #fffffb;
		margin-top: 20rpx;
		border-radius: 10rpx;
		}

.mypingou_list{
	     width: 100%;
		 margin-left: 20rpx;

		 
	
}
.button1{
	width: 60rpx;
	height: 30epx;
}
.button2{
	height: 40rpx;
	letter-spacing:-3upx;

	line-height: 37rpx;
	font-size: 1rpx;
}

</style>
