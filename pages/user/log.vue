<template>
	<view style="background-color: #e2e2e2;">

		<view class="headcolor">
			<view class="jifeng_box">
				<view style="margin-left: 20rpx;float: left;">{{text_balance_str}}</view>
				<view class="edit">	￥{{balance_total}}</view>
				<block v-if="userid002 == 0">
					<button type="text" 
						v-if="current_balance_type == 'balance'" class="tixian" @click="tixian(40)" :style="{backgroundColor:btn_color}"
					>提现</button>
				</block>
				
			</view>

			<view class="select">
				<button :class="activeClass == index ? 'hover':'hover_li'"
				 @click="alloflist(index)">全部</button>
				<button :class="activeClass == index ? 'hover':'hover_li'" type="text" v-for="(item,index) in tag_list" :key="index"
				 @click="getItem(index,item)">{{item}}</button>
			</view>



			<view>
				<view class="balance_lists" v-for="(item,index) in log_list" :key="index">
					<view class="dabox_li">
						<view class="jifeng">{{item.balance}}</view>
						<view class="headboss">￥{{item.balance_total}}</view>
						
					</view>
					<view class="dabox" style="margin-top: 10rpx;">
						<view class="tag">{{item.tag}}</view>
						<view class="type">{{item.balance_msg}}</view>
						<view class="time">{{item.createtime}}</view>
					</view>
					
					
					<!-- <view style="width: 100%;height: 2rpx; background-color: #d3d3d3;margin-top:15rpx"></view> -->
				</view>
				<view class="bottom_tip" v-if="bottom_tip==1">没有更多数据~</view>
			</view>
			
			
			
		</view>

	</view>
</template>

<script>
	var _self,
		page = 1,
		timer = null;
	export default {
		data() {
			return {
				text_balance_str:'余额',
				text_balance_zengsong_str:'赠款',
				text_score_str:'积分',
				
				bottom_tip:'0',
				current_balance_type:'balance',
				page_size: 1,
				balance: '',
				balance_list: [],
				tag_list: '',
				log_list: [],
				tag:"",
				btn_color:'#ffff00',
				index:-1,
				balance_total:'0',
				activeClass: -1,
				loadingType: 0,
				contentText: {
					contentdown: "显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				
				// 2020.12.29. 指定读取某个用户的余额明细，如果大于0，
				//则服务器接口读取这个userid对应的余额明细，而忽略当前的userid，当前的userid和checkstr只是用于判断权限使用
				userid002:0,
				
				//2020.12.29. 超级会员卡的时候使用
				super_vip_card_kazhu_userid:0,
			}

		},

		onLoad(option) {
			uni.setNavigationBarTitle({
				title:this.text_balance_str + '明细'
			})
			
			if(option.type && (option.type == 'zengkuan')){
				this.current_balance_type = 'balance_zengsong';
				
				uni.setNavigationBarTitle({
					title:this.text_balance_zengsong_str + '明细'
				})
			}
			else if(option.type && (option.type == 'super_vip_card_balance')){
				this.current_balance_type = 'super_vip_card_balance';
				
				this.super_vip_card_kazhu_userid = option.super_vip_card_kazhu_userid;
				
				uni.setNavigationBarTitle({
					title:'会员余额明细 - 超级会员卡'
				})
			}
			
			console.log('option.userid002',option.userid002);
			
			if(option.userid002){
				this.userid002 = option.userid002;
			}
			
			this.abotapi.set_option_list_str(this, function(that001, option_list){
				
				
				that001.btn_color = that001.abotapi.getColor();
				console.log('getColor===sss==', that001.btn_color)
				
				if(option_list.text_balance_str){
					that001.text_balance_str = option_list.text_balance_str;
					
					if(that001.current_balance_type == 'balance'){
						uni.setNavigationBarTitle({
							title:that001.text_balance_str + '明细'
						})
					}
					
					
				}
				
				if(option_list.text_balance_zengsong_str){
					that001.text_balance_zengsong_str = option_list.text_balance_zengsong_str;
					
					if(that001.current_balance_type == 'balance_zengsong'){
						uni.setNavigationBarTitle({
							title:that001.text_balance_zengsong_str + '明细'
						})
					}
					
				}
				if(option_list.text_score_str){
					that001.text_score_str = option_list.text_score_str;
				}
				
				
			});
			
			this.account_balance();
			this.tag_lists();
			
			_self = this;
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
		methods: {
			account_balance: function() {
				
				console.log('this.current_balance_type====>>>>', this.current_balance_type);
				
				
				
				
				
				var that = this;
				var balance_type = this.current_balance_type;
				var userInfo = this.abotapi.get_user_info();
				
				var post_url = this.abotapi.globalData.yanyubao_server_url + '/openapi/UserData/user_balance_list';
				
				var post_data = {
						sellerid: that.abotapi.globalData.default_sellerid,
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
						page_size: that.page_size,
					};
					
				if(that.current_balance_type == 'super_vip_card_balance'){
					post_url = this.abotapi.globalData.yanyubao_server_url + '/openapi/SuperVipCardData/get_huiyuan_balacne_list';
					
					post_data.kazhu_userid = that.super_vip_card_kazhu_userid;
				}
				else {
					post_data.balance_type_ext = balance_type;
					post_data.tag = that.tag;
					post_data.userid002 = that.userid002;
				}
				
				this.abotapi.abotRequest({
					url: post_url,
					method: 'post',
					data: post_data,
					success(res) {
						console.log('aaaabbbb', res);
						
						if(res.data.code != 1){
							that.bottom_tip = 1;
							console.log('aaaa6666bbbb', that.bottom_tip);
							return;
						}
						
						
						
						var data = res.data.data;
						that.balance_total = data.balance_total;
						
						
						var log_list = data.log_list;
						
						
						if(that.current_balance_type == 'balance'){ 
							that.tixian_url = data.tixian_url;
						}
						
						// var balance_total = that.balance_total;
						console.log('aaaaaaaaasssssabbbb', that.balance_total);
						
						
						console.log('log_list', log_list);
						
						var loglist = that.log_list;
						console.log('aaaaaaass', loglist);
						
						for (var i = 0; i < log_list.length; i++) {
							loglist.push(log_list[i]);
							console.log('aaaaa===ssss>>>', log_list[i])
						}
						
						that.log_list = loglist;
						console.log('aaaaa===>>>', that.log_list)
						

					},
					fail(error) {
						console.log('ccccccccccc', error)
					}
				})



			},

			tag_lists: function() {
				var that = this;
				var balance = this.current_balance_type;
				var userInfo = this.abotapi.get_user_info();
				
				this.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + '/openapi/UserData/user_balance_tag_list',
					method: 'post',
					data: {
						sellerid: that.abotapi.globalData.default_sellerid,
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
						balance_type_ext: balance,
						page_size: that.page_size,
						userid002:that.userid002
					},
					success(res) {
						console.log('aaaabbbb', res)
						
						if(res.data.code != 1){
							that.bottom_tip = 1;
							console.log('aaaa6666bbbb', that.bottom_tip);
							return;
						}
						
						var data = res.data.data;
						that.tag_list = data;
						console.log('aaaabbsssssbb', that.tag_list)

					},
					fail(error) {

					}
				})
			},

			getItem: function(index,item) {
				this.activeClass = index; // 把当前点击元素的index，赋值给activeClass
				this.tag = item;
				console.log('aaaabbsssssbb====', this.tag)
				this.log_list = [];
				this.page_size =1;
				this.account_balance();
				
				
				
			},
			
			alloflist: function(index) {
				this.activeClass = index; // 把当前点击元素的index，赋值给activeClass
				this.log_list = [];
				this.tag = '';
				this.page_size = 1;
				this.account_balance();
				
				
				
			},
			tixian:function(index){
					this.activeClass = index; // 把当前点击元素的index，赋值给activeClass
					var url = this.tixian_url;
					
					var var_list = Object();
					
					console.log('redictToTopic to url ====>>>>>>', url);
					this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
			},
			
		

		}

	}
</script>

<style>
	@import url("./static/css/log");
</style>
