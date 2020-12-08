<template>
	<view>
		<view>
			<view class="mypingou" v-for=" (item,idx) in tuan_list" :key="idx">
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
						<td>中奖状态：</td>
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
	export default {
		data() {
			return {
				
				
				tuan_list:'',
				
			}
		},
		
		onLoad(options) {
		
			//请求服务器,刷新卡券信息
			console.log('网页参数如下:');
			
			this.abotapi.set_shop_option_data(this, function(that002, option_data){
				that002.get_pingou_list();
				
			
				
			});
		},
		methods: {
			
			//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
						onReachBottom() {
							
							if(this.is_xiala == 0){
								this.jiazai();
							}else{
								/*uni.showToast({
									title:'已经到底了~'
								})*/
								this.show_bottom_tips = 'block';
							}
							
						},
			
			
			

			
			
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
					},
			
					success: function(res) {
			
					that.tuan_list = res.data.my_tuan_list;
						
			
						console.log('aaaaaaaaaa', res.data);
						//console.log('8888====11>>', that.aipingou_list);
						
						

					},
			
					fail: function(e) {
			
			
					},
				});

			},
		
		
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
.mypingou{
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
