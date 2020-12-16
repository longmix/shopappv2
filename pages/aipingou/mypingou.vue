<template>
	<view>
		<view>
			<view class="mypingou1" v-for=" (item,idx) in tuan_list" :key="idx">
				
				<table class="mypingou_list" >
					<tr>
						<td>订单编号：{{item.orderno}}<text style="float: right;font-size: 30rpx;">复制</text></td>
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
						<td v-if="item.zhongjiang_status == 0">中奖状态：{{item.zhongjiang_status_str}}</td>
						<td v-else-if="item.zhongjiang_status == 2">中奖状态：{{item.zhongjiang_status_str}}</td>
						<td v-else>中奖状态：未中奖</td>
					</tr>
					<tr>
						<td>
							<view style="display: flex;">
							
						    <button class="mypingou_button" v-if="aipingou_setting.mypintuan_show_tuanyuan_list == 1"
								@tap="open_kaijiang_detail(0, 'center',item.tongji_key)">开奖详情</button>
							<button class="mypingou_button" @tap="open_zhongjiang_detail(0, 'center',item.tongji_key)">中奖记录</button>
						    </view>
						</td>
						
					</tr>
	
				</table>
			</view>
		</view>
		
		<!-- 中奖记录 -->
	
		<openAlert ref="openAlertKaijiang"
		 :AlertClass="AlertClassKaijiang"
		 :AlertPosition="AlertPositionKaijiang">
		<view>
		
			<view class="tanchuang_list">
				<view style="display: flex;">
						<view style="font-weight: bold;margin-left: 40rpx;font-size: 25rpx;">NO</view>
						<view class="liebiao">抽奖编码</view>
						<view style="font-weight: bold;margin-left: 120rpx;">参与时间</view>

			    </view>
			<view style="display: flex;margin-top: 10rpx; border-top: 1rpx solid #d3d7d4;" v-for="(detail,ids) in kaijiang_list" :key="ids">
					<view style="margin-left:50rpx;">{{ids + 1}}</view>
					<view style="margin-left:70rpx;">{{detail.choujiangma}}</view>
					<view style="margin-left:40rpx;">{{detail.join_time_updata}}</view>
			</view>
					
			</view>	
			
		 </view>
		</openAlert>
		
		<!-- 开奖详情 -->
		<openAlert ref="openAlertZhongjiang" 
		:AlertClass="AlertClassZhongjiang" 
		:AlertPosition="AlertPositionZhongjiang"
		>
		<view>
			<view v-if="zhongjiang_list != 0">
				<view id="zhong">
					<view class="tanchuang_list">
						<view style="display: flex;">
						    <view style="font-weight: bold;margin-left: 10rpx;">NO</view>
							<view class="liebiao">头像</view>
							<view style="font-weight: bold;margin-left: 100rpx;">昵称</view>
							<view style="font-weight: bold;margin-left: 110rpx;">抽奖编码</view>
					    </view>
						<view v-for="(items,ida) in zhongjiang_list" :key="ida" 
						style="display: flex;margin-top: 10rpx;border-top: 1rpx solid #d3d7d4;font-size: 30rpx; align-items: center; justify-content: center;text-align: center；">
							<view>{{ida + 1}}</view>
							<view style="margin-left: 68rpx;"><image :src="items.headimgurl" style="width: 70rpx; height: 70rpx; border-radius: 50%;"></image></view>
							<view style="margin-left: 40rpx;">{{items.nickname}}</view>
							<view style="margin-left: 50rpx;">{{items.choujiangma}}</view>
					    </view>
					</view>
				</view>	
			</view>
			<view v-else>
				<view class="zhongjiang_list">没有开奖</view>
			</view>
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
				zhongjiang_list:[],
				kaijiang_list:[],
			
				
				AlertClassKaijiang: 0,
				AlertPositionKaijiang: '',
				
				AlertClassZhongjiang: 0,
				AlertPositionZhongjiang: '',
	
				current_kaijiang_list:[],
				current_zhongjiang_list:[],
				aipingou_setting:[],
				
			}
		},
		
		onLoad(options) {
		
			//请求服务器,刷新卡券信息
			console.log('网页参数如下:');
			
			this.abotapi.set_shop_option_data(this, function(that002, option_data){
				that002.get_pingou_list();
				that002.__get_setting_list();
				
			
				
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
				console.log('8888s8ssss',res.data.my_tuan_list);
				if(res.data.code == 1){
					that.is_OK = false;
					that.tuan_list = that.tuan_list.concat(res.data.my_tuan_list);
					that.current_page = that.current_page + 1;
					console.log('超过一页',that.tuan_list);
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
				console.log('aaaaaaaaaaaaaaaaaaa');
				var that = this;
				
				console.log(that.tuan_list);
				
				for(var j = 0;j<that.tuan_list.length;j++){
					
					if(tuansn == that.tuan_list[j].tongji_key){
						console.log(that.tuan_list[j]);
						
						that.kaijiang_list = that.tuan_list[j].tuanyuan_list;
						
						console.log('qqqqqqqqqqqqqq',that.zhongjiang_list);
						
						break;
						
					}
					
				}
				
			    this.$nextTick(function() {
			
			        this.AlertClassKaijiang = Class;
			        this.AlertPositionKaijiang = Position;
			        this.$nextTick(function() {
			            this.$refs.openAlertKaijiang.Show();
			        });
			    });
			},
			
			open_zhongjiang_detail(Class, Position, tuansn) {
				console.log('8989========',tuansn);
				var that = this;
				
				console.log(that.tuan_list);
				
				for(var i = 0;i<that.tuan_list.length;i++){
					
					if(tuansn == that.tuan_list[i].tongji_key){
						console.log(that.tuan_list[i]);
						
						that.zhongjiang_list = that.tuan_list[i].zhongjiang_list;
						
						console.log(that.zhongjiang_list);
						
						break;
						
						console.log('898sss9=ffff=======',hash);
						
					}
					
				}
				
			
				
			    this.$nextTick(function() {
					
			        this.AlertClassZhongjiang = Class;
			        this.AlertPositionZhongjiang = Position;
			        this.$nextTick(function() {
			            this.$refs.openAlertZhongjiang.Show();
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
					},
			
					success: function(res) {
						
					that.tuan_list = res.data.my_tuan_list;
					
					},
					fail: function(e) {
			
			
					},
				});

			},
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
						
			
						//console.log('aaaaaaaaaa', res.data.aipingou_seting.xuanchuan_tupian);
						console.log('8888====11>>', res);
						
						uni.setNavigationBarTitle({
						 title: res.data.aipingou_seting.huodong_title
						})
			 
			
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

	}
.mypingou1{
	    display: flex;
	    width: 100%;
		font-size: 30rpx;
		background-color: #fffffb;
		margin-top: 20rpx;
		border-radius: 10rpx;
		}

.mypingou_list{
	     width: 100%;
		 font-size: 30rpx;
		 margin-left: 20rpx;

}
.liebiao{
	text-align: center;
	font-weight: bold;
	margin-left: 60rpx;;
}
.liebiao_content{
	text-align: center;
	margin-left: 60rpx;;
}


.mypingou_button{
	width: 180rpx;
	height:58rpx; 
	font-size: 25rpx;
	margin-bottom: 10rpx;
}
.tanchuang_list{
	width: 600rpx;
	font-size: 30rpx;
	text-align: center;
	background-color: #fffffb;
	border:1rpx solid #ccc;
	padding: 20rpx;
}
.tanchuang_list td th{
	border:1rpx solid #ccc;
	border: blue;
    border-width: 1rpx;
    border-style: dotted;
}
.zhongjiang_list{
	padding: 20rpx;
	background-color: #FFFFFF;
}

</style>
