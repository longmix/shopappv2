<template>
	<view style="background-color: #e2e2e2;">
		
		<view class="headcolor">
			<view class="jifeng_box">
				<view style="margin-left: 20rpx;">{{text_score_str}}</view>
				<view class="edit">{{score_data.score_total}}</view>
			</view>
			
			<view>
				<view class="balance_lists" style="padding-bottom: 10px;" v-for="(item,index) in log_list" :key="index">
					<view class="dabox_li">
						<view class="jifeng">+{{item.score}}</view>
						<view class="headboss">{{item.score_total}}</view>
						
						
						
					</view>
					
					<view class="dabox" style="margin-top: 10rpx;">
						<view class="tag">{{item.score_msg}}</view>
						<view class="type">{{item.memo}}</view>
						<view class="time">{{item.createtime}}</view>
					</view>
					
					
					
				</view>
				<view class="bottom_tip" v-if="bottom_tip==1">没有更多数据~</view>
				
			</view>
			
			
	
			
			
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
				text_score_str:'积分',
				
				bottom_tip:'0',
				page_size:1,
				balance:'',
				score_data:[],
				log_list:[],
				userid002:0
			}
			
		},
		
		onLoad(option){
			if(option.userid002){
				this.userid002 = option.userid002;
			}
			
			this.abotapi.set_option_list_str(this, function(that001, option_list){
				
				//that001.abotapi.getColor();
				
				if(option_list.text_score_str){
					that001.text_score_str = option_list.text_score_str;
					
					uni.setNavigationBarTitle({
						title:'我的' + that001.text_score_str
					})
				}
				
				
			});
			
			this.account_balance();
		},
		onPullDownRefresh: function() {
			this.account_balance();
			setTimeout(function () {
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1500);
		},
		onReachBottom: function() {
			this.page_size = this.page_size + 1;
			console.log('aaassssssssssssabbbb', this.page_size)
			this.account_balance();
		
		},
		
		methods:{
			account_balance:function(){
				var that = this;
				var balance = "balance";
				var userInfo = this.abotapi.get_user_info();
				this.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + '/openapi/UserData/user_score_list',
					method: 'post',
					data:{
						sellerid: that.abotapi.globalData.default_sellerid,
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
						balance_type_ext:balance,
						userid002:that.userid002
					},
					success(res){
						console.log('aaaabbbb',res)
						
						if(res.data.code == 1){
							var data = res.data.data;
							that.score_data = res.data.data;
							
							
							// that.log_list = that.score_data.log_list;
							// console.log('aaasssssssssabbbb',that.log_list)
							
							var log_list = data.log_list;
							var loglist = that.log_list;
							console.log('eeeeeeeeeeee==',log_list.length)
							console.log('eeeeeeeeeeee==2',loglist)
							for (var i = 0; i < log_list.length; i++) {
								loglist.push(log_list[i]);
								console.log('aaaaa===ssss>>>', i)
								console.log('aaaaa===ssss>>>', log_list.length)
								
							}
							that.log_list = loglist;
							console.log('aaaaa===>>>', that.log_list)
						}else{
							that.bottom_tip = 1;
							console.log('aaaa6666bbbb', that.bottom_tip);
								return;
							}
						
						
						
					},
					fail(error){
						console.log('ccccccccccc',error)
					}
				})
				
			}
			
		}
		
	}
</script>

<style>
	@import url("./static/css/log");
</style>

