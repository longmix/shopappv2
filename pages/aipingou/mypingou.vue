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
							
						    <button style="width: 200rpx; height:60rpx; font-size: 5rpx;"
								@tap="open_kaijiang_detail(0, 'center','true', item.tongji_key)">开奖详情</button>
							<button style="width: 200rpx; height:60rpx; font-size: 5rpx;"
								@tap="open_zhongjiang_detail(0, 'center', item.tongji_key)">中奖记录</button>
						    </view>
						</td>
						
					</tr>
	
				</table>
			 
			</view>
		</view>
		<!-- 开奖详情 -->
		<openAlert ref="openAlert"
		 :AlertClass="AlertClassKaijiang"
		 :AlertPosition="AlertPositionKaijiang">
		    <view class="zhongjiang_list">
				<ul>
					<li>将军</li>
					
				</ul>
			</view>
		</openAlert>
		<!-- 中奖记录 -->
		<openAlert ref="openAlert" 
		:AlertClass="AlertClassZhongjiang" 
		:AlertPosition="AlertPositionZhongjiang"
		>
		    <view class="zhongjiang_list">
				<ul>
					<li>将军</li>
					<li>豆豆</li>
					<li>豆豆</li>
					
				</ul>
			</view>
		</openAlert>
		
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
				current_page:1,				
				tuan_list:[],
				
				AlertClassKaijiang: 0,
				AlertPositionKaijiang: '',
				
				AlertClassZhongjiang: 0,
				AlertPositionZhongjiang: '',
				
				current_kaijiang_list:[],
				current_zhongjiang_list:[],
				
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
		
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			var that = this;
			
			that.isShowBottomLine = 0;
			that.tuan_list = [];
			
			console.log('下拉刷新==============')
			//停止当前页面的下拉刷新
			that.get_pingou_list();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
			
		
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			var that = this;
			console.log('ccccccccccc')
			
			if(this.is_OK){
				/*uni.showToast({
					title: '已经到底了~',
					duration: 2000
				});*/
				
				return;
			}
			var post_url = that.abotapi.globalData.yanyubao_server_url + '/openapi/AipingouData/get_my_pintuan_list';
			var userInfo = that.abotapi.get_user_info();
			
			that.abotapi.abotRequest({
				url: post_url,
				data: {
					userid: userInfo.userid,
					checkstr: userInfo.checkstr,
					sellerid: that.abotapi.get_sellerid(),
					page: that.current_page,
				},
						
				success: function(res) {
					
				if(res.data.code == 1){
					that.is_OK = false;
					that.tuan_list = that.tuan_list.concat(res.data.my_tuan_list);
					console.log('超过一页',that.current_product_list)
					uni.stopPullDownRefresh();//得到数据后停止下拉刷新
				}else if(res.data.code == 0){
					that.is_OK = true;
					uni.showToast({
						title: '已经到底了~',
						duration: 2000
					});
					return;
				}
				
				},
					
				fail: function(e) {
						
						
				},
			});
				
		},
			
			
	
		methods: {
			open_kaijiang_detail(Class, Position, tuansn) {
				console.log('8989========',tuansn);
				
				for(var i = 0;i<this.tuan_list.length;i++){
					//console.log(this.tuan_list[i]['tongji_key']);
					if(this.tuan_list[i]['tongji_key'] == tuansn){
						this.current_kaijiang_list = this.tuan_list[i]['userid'];
					}
				}
				
				
			    this.$nextTick(function() {
					
					
			        this.AlertClassKaijiang = Class;
			        this.AlertPositionKaijiang = Position;
			        this.$nextTick(function() {
			            this.$refs.openAlert.Show();
			        });
			    });
			},
			open_zhongjiang_detail(Class, Position, tuansn) {
				for(var i = 0;i<this.tuan_list.length;i++){
					if(itemmmm.tuansn == tuansn){
						this.current_zhongjiang_list = itemmmm.kaijiangxxxxxx;
					}
				}
				
			    this.$nextTick(function() {
					
			        this.AlertClassZhongjiang = Class;
			        this.AlertPositionZhongjiang = Position;
			        this.$nextTick(function() {
			            this.$refs.openAlert.Show();
			        });
			    });
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
						page: that.current_page,
					},
			
					success: function(res) {
						
					that.tuan_list = res.data.my_tuan_list;
					console.log('这是团组===',that.tuan_list);
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
/* .zhongjiang_list{
	background-color: #07C160;
	width:250px;
	font-size: 19px;
} */

</style>
