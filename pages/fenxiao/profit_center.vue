<template>
	<view>
		<view style="display: flex;padding: 30rpx;justify-content: space-between;" :style="{background:wxa_shop_nav_bg_color}">
			<view style="display: flex;">
				<view style="color: #ffffff;font-size: 32rpx;">{{array[index]}}</view>
				
			</view>
			
			<picker class="jiesuan_quanbu_weijiesuan_picker" @change="bindPickerChange" :value="index" :range="array">
				<view style="display: flex;">
					<view class="uni-input">{{array[index]}}</view>
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/right_jiantou.png" style="width: 42rpx;height: 42rpx;"></image>
				</view>
				
			</picker>
			
		</view>
		<view>
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
				
				<view class="scroll-view-item_H" v-for="(current_jiangli_mulu_item, index) in current_jiangli_mulu" :key="index">
						<view style="width: 100%;" class="scroll-view-item_H"
						 :class="currentTab==current_jiangli_mulu_item.currentTab ? 'on' : ''"
						 :data-current="current_jiangli_mulu_item.currentTab"
						 :data-action="current_jiangli_mulu_item.action"
							@tap="swichNav">{{current_jiangli_mulu_item.name}}</view>
				</view>
			
			</scroll-view>
		</view>
		
		<view v-if="current_daili_fenrun_list == '' || current_daili_fenrun_list == null" style="text-align: center;color: #999999;font-weight: bold;">
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/fenxiao_center_icon/zanwu_shuju.png" style="width: 400rpx;height: 400rpx;"></image>
			<view>暂无对应订单奖励</view>
		</view>
		
		
		<view style="background-color: #ffffff;margin: 20rpx;">
			<view v-for="(current_daili_fenrun_item, index) in current_daili_fenrun_list" :key="index">
				<view class="order_fenrun_information" >
					<view>
						<view style="display: flex;">
							<view>{{current_daili_fenrun_item.tag}}</view>
							<view>({{current_daili_fenrun_item.orderno}})</view>
						</view>
						<view style="padding-top: 10rpx;">结算时间： {{current_daili_fenrun_item.datestr}}</view>
					</view>
					<view style="line-height: 66rpx;">+{{current_daili_fenrun_item.balance}}</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
import util from '../../common/util.js';
	
export default {	
	data() {
		return {
			currentTab:1,
			wxa_shop_nav_bg_color: '#ea5504',
			
			array: ['全部', '已结算', '未结算'],
			index: 0,
			
			current_daili_fenrun_list:null,
			current_action:'quanbu',
			current_page:1,
			current_jiangli_mulu:null
		}

	},
	onLoad: function (options){
		
		console.log('当前时间：' + util.formatTime( new Date() ) + ' ' + util.formatTime2( new Date() ) + ':01' );
		
		console.log('====>>>>', options);
		
		
		
		var that = this;
		uni.setNavigationBarTitle({
			title:'收益中心'
		})
		
			console.log('123123123123',options)
		if(options.action){
			that.current_action = options.action;
		}
		
		if(options.currentTab){
			that.currentTab = options.currentTab;
		}
		if(!options.currentTab){
			that.currentTab = 1;
		}
		if(!options.action){
			that.current_action = 'quanbu';
		}
		
		that.get_fenxiao_myteam_list(that.current_action);
		this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
	},
	onShow: function (){
		
	},
	onReady(){
		
	},
	onPageScroll(e) {
		
	},
	//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh() {
		console.log('下拉刷新==')
		 
		// #ifndef MP-ALIPAY
		uni.showToast({
			title: '数据更新中……',
			icon:'loading',
		});
		// #endif
		 
		// #ifdef MP-ALIPAY
		uni.showToast({
			title: '数据更新中……',
			//icon:'loading', 	//支付宝不支持icon为 loading
			//duration:2000
		});
		// #endif
		 
		this.onLoad();
		this.onShow();
		 
		console.log('下拉刷新==============')
		 
		//停止当前页面的下拉刷新
		setTimeout(function() {
			console.log('timeout===>>>stopPullDownRefresh===>>>hideToast');
			
			uni.stopPullDownRefresh();
			
			uni.hideToast();
			//uni.hideLoading();
			
		}, 2000);
		   
	},
		
	methods: {
		
		callback_function_shop_option_data:function(that, cb_params){
			
			console.log('当前调试开关22：' + this.system_debug_flag);
			console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);
			
			if(!cb_params){
				return;
			}
			
			
			console.log('cb_params====', cb_params);
			
			that.wxa_shop_nav_bg_color  = cb_params.option_list.wxa_shop_nav_bg_color;
			that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
			
		},
		
		get_fenxiao_myteam_list:function(action){
			
			var that = this;
			
			var userInfo = that.abotapi.get_user_info();
			
			var last_url = '/pages/fenxiao/fenxiao_center';
			
			if (!userInfo || !userInfo.userid) {
				that.abotapi.goto_user_login(last_url);
			
				return;
			}
			that.userInfo = userInfo;
						
			var post_data = {
				sellerid:that.abotapi.globalData.default_sellerid,
				userid:userInfo.userid,
				page: that.current_page,
				action: action,
			};
			
		// #ifdef MP-WEIXIN
			post_data.xiaochengxu_appid = that.abotapi.globalData.xiaochengxu_appid,
			post_data.xiaochengxu_openid = that.abotapi.get_current_openid('userid_openid_' + userInfo.userid);
		// #endif
			
			
			that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/FenxiaoData/get_fenxiao_daili_shop_list',
					method: 'post',
					data: post_data,
					success: function (res) {
					
					if(res.data.code != 1){
						uni.showToast({
							title:'你还没有订单收益',
							duration: 2000,
						});
						
						return;
					}
					that.current_daili_xinxi = res.data.data;
					that.current_jiangli_mulu = res.data.data.fenxiao_jiangli_mulu;
					
					that.current_daili_fenrun_list = res.data.data.supplier_balance_log_list;
					
					
					
					
					},
					fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
					},
			});
				
			
			},
			
		
		
		
		
		bindPickerChange: function(e) {
			
			var that = this;
			console.log('picker发送选择改变，携带值为', e)
		//	console.log('picker发送选择改变，携带值为', e.detail.value)
			that.index = e.detail.value;
			
			
			if(e.detail.value == 0){
				that.current_action = 'quanbu';
				that.currentTab = 1;
			}else if(e.detail.value == 1){
				that.current_action = 'quanbu';
				that.currentTab = 1;
			}else if(e.detail.value == 2){
				that.current_action = 'dingdanxiaoshou';
				that.currentTab = 1;
			}
			that.get_fenxiao_myteam_list(that.current_action);
		},
		swichNav: function(e) {
			
			var that = this;
			console.log('789456123',e)
			
			that.currentTab = e.currentTarget.dataset.current;
		
			that.current_action = e.currentTarget.dataset.action;
			console.log('78945612sdadasda3',that.currentTab)
			
			that.get_fenxiao_myteam_list(that.current_action);
		},
			
		},
	}
</script>

<style>
	page{
		background-color: #F0F3F6;
		padding-bottom: 20rpx;
	}
	.scroll-view_H{
		white-space: nowrap;
		width: 100%;
		background-color: #ffffff;
	}
	.scroll-view-item_H {
		display: inline-block;
		width: 25%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 24rpx;
	}
	.on{
		color: #009ea1;
	}
	.jiesuan_quanbu_weijiesuan_picker{
		color: #ffffff;
		font-size: 24rpx;
		line-height: 42rpx;
		border: 2rpx solid #ffffff;
		border-radius: 10rpx;
		overflow: hidden;
		padding-left: 20rpx;
	}
	.order_fenrun_information{
		display: flex;
		justify-content: space-between;
		border-bottom: solid 2rpx #F0F3F6;
		border-radius: 12rpx;
		overflow: hidden;
		font-size: 26rpx;
		padding: 30rpx 20rpx;
	}
</style>