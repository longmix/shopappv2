<template>
	<view class="content">
		<view class="content-top">
			<view class="content-top-name">
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/yuangong04.jpeg" style="width: 250rpx;height: 250rpx; margin: 0 auto;border-radius:50%;"></image>
				<!-- <view class="content-top-genghuanname">更换头像</view> -->
			</view>
			<view class="content-top-ziliao">
					<view class="content-top-hangyi">
						<view style="font-size: 40rpx; font-weight:500;">{{name}}</view>
						<view style="font-size: 26rpx; color: #b40000;margin-left: 50rpx;">待岗</view>
					</view>
					<view class="content-top-hanger">
						<view  v-if="sex == 1">男</view>
						<view  v-if="sex == 2">女</view>
						<view style="font-size: 40rpx; color: #9a9a9a;">|</view>
						<view>{{age}}岁</view>
						<view style="font-size: 40rpx; color: #9a9a9a;">|</view>
						<view>{{suoshudiqu}}</view>
					</view>
					<view class="content-top-hanger">
						<view>工作时长：{{working_hours}}年</view>
					</view>
			</view>
		</view>	
		<view class="content-middle">
			
			<view
				style="display: flex; flex-direction: row; justify-content:space-around;margin-bottom: 20rpx;width: 25%;">
				<view @click="curTabID = 1" :class="{'cur':curTabID===1}" class="nav_list_title">介绍</view>
				<view @click="curTabID = 2" :class="{'cur':curTabID===2}" class="nav_list_title">资料</view>
			</view>
			
			<view class="nav_content">
				<view v-show="curTabID === 1">
			
					<view class="content-middle-ziliaoyi">
						<view class="content-middle-biaoti">所在门店：</view>
						<view class="content-middle-wenzi">{{store}}</view>
						<!-- <image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/edit01.png" style="width: 50rpx; height: 50rpx;"></image> -->
					</view>
					<view class="content-middle-ziliaoyi">
						<view class="content-middle-biaoti">门店电话：</view>
						<view class="content-middle-wenzi">15689568956</view>
						<!-- <image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/edit01.png" style="width: 50rpx; height: 50rpx;"></image> -->
					</view>
					<view class="content-middle-ziliaoyi">
						<view class="content-middle-biaoti">现住地址：</view>
						<view class="content-middle-wenzi">{{suoshudiqu}}</view>
						<!-- <image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/edit01.png" style="width: 50rpx; height: 50rpx;"></image> -->
					</view>
					<view class="content-middle-ziliaoyi">
						<view class="content-middle-biaoti">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历：</view>
						<view class="content-middle-wenzi">{{education}}</view>
						<!-- <image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/edit01.png" style="width: 50rpx; height: 50rpx;"></image> -->
					</view>
					<view class="content-middle-ziliaoyi">
						<view class="content-middle-biaoti">身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高：</view>
						<view class="content-middle-wenzi">{{height}}</view>
						<!-- <image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/edit01.png" style="width: 50rpx; height: 50rpx;"></image> -->
					</view>
					<view class="content-middle-ziliaoyi">
						<view class="content-middle-biaoti">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重：</view>
						<view class="content-middle-wenzi">{{weight}}</view>
						<!-- <image src="https://yanyubao.tseo.cn/T
						pl/static/images/jiazhenggongsi/edit01.png" style="width: 50rpx; height: 50rpx;"></image> -->
					</view>
					<view class="content-middle-ziliaoyi">
						<view class="content-middle-biaoti">掌握菜系：</view>
						<view class="content-middle-wenzi">{{cook_dishes}}</view>
						<!-- <image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/edit01.png" style="width: 50rpx; height: 50rpx;"></image> -->
					</view>
					<view class="content-middle-ziliaoyi">
						<view class="content-middle-biaoti">语言能力：</view>
						<view class="content-middle-wenzi">普通话</view>
						<!-- <image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/edit01.png" style="width: 50rpx; height: 50rpx;"></image> -->
					</view>
					<view class="content-middle-ziliaoyi">
						<view class="content-middle-biaoti">工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种：</view>
						<view class="content-middle-wenzi" style="color: #6BACE5;">{{major}}</view>
						<!-- <image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/edit01.png" style="width: 50rpx; height: 50rpx;"></image> -->
					</view>
					<view class="content-middle-ziliaoyi">
						<view class="content-middle-biaoti">证&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;书：</view>
						<view class="content-middle-wenzi" style="color: #DE8265;">{{certificate}}</view>
						<!-- <image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/edit01.png" style="width: 50rpx; height: 50rpx;"></image> -->
					</view>
					<view class="content-middle-ziliaoyi">
						<view class="content-middle-biaoti">自我介绍：</view>
						<view class="ziwojieshao">{{remark}}</view>
					</view>
					
					<view class="content-bottom">
						<view style="font-size: 34rpx; font-weight: bolder;">工作生活照</view>
						<view class="content-bottom-picture">
							<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/yuangong01.jpeg" class="images_pictire"></image>
							<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/yuangong02.jpeg" class="images_pictire"></image>
							<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/yuangong03.jpeg" class="images_pictire"></image>
						</view>
					</view>
				</view>	
				<view v-show="curTabID === 2">
					<view class="content-bottom">
						<view style="font-size: 34rpx; font-weight: bolder;">个人展示</view>
						<view style="margin-top: 20rpx;justify-content: space-between; display: flex;">
						本人安徽人，之前带过几个宝宝，
						本人安徽人，之前带过几个宝宝，
						本人安徽人，之前带过几个宝宝，
						本人安徽人，之前带过几个宝宝，
						本人安徽人，之前带过几个宝宝，
						本人安徽人，之前带过几个宝宝，
						本人安徽人，之前带过几个宝宝，
						本人安徽人，之前带过几个宝宝，
						本人安徽人，之前带过几个宝宝，
						本人安徽人，之前带过几个宝宝</view>
					</view>
				</view>
			</view>
		</view>
	</view>	
</template>

<script>
	//import { current_chat_gui } from '../../common/abotapi.js';
	import jiazhengApi from './common/abotapiJiazhenggongsi.js';
	
	export default{
		data(){
			return{
				//商城的Logo、导航栏背景颜色和文字颜色
				wxa_shop_operation_logo_url:'',
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				
				curTabID: 1,
				
				
				page_title:'保姆员工详情',
				
				
				name:'',
				suoshudiqu:'',
				sex:'',
				nation:'',
				education:'',
				major:'',
				remark:'',
				lift_photo:'',
				cook_dishes:'',
				weight:'',
				height:'',
				head_portrait:'',
				age:'',
				certificate:'',
				store:'',
				working_hours:'',
				
				current_citizenid:0,
				// detail_list:[],
				current_adminuserid:0,
				
			}
		},
		
		onLoad:function(options){
			console.log('aaaaaa',options)
			var that = this;
			that.current_xianmai_shangid = options.xianmai_shangid;
			uni.setNavigationBarTitle({
				title: that.page_title,
			});
			
			
			//jiazhengApi.check_user_login();
			// jiazhengApi.get_current_adminuserid(options, that);
			
			
			if(!options.citizenid){
				uni.showToast({
					title:'缺少参数！！！！！'
				});
				
				return;
			}
			
			
			if(options.adminuserid){
				that.current_adminuserid = options.adminuserid;	
			}
			this.current_citizenid = options.citizenid;
			
			
			console.log('2222222222222222222222',options.adminuserid);
			
			
			
			console.log('12333=====>>>',options.citizenid);
			
			
			

			that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);
			
			
			
			
		},
		
		//上拉加载 触底操作
		onReachBottom() {
			
			
			if(this.current_page != 2){
				uni.showLoading({
					title:'正在加载中~',
				});
				
				setTimeout(function () {
					uni.hideLoading();
				}, 1500);
				
				//分页page加1
			
				//分页
				// this.__load_course_list_from_server(this.current_cata_name);
			};
		},
		
		
		
		
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		
			console.log('onPullDownRefresh onPullDownRefresh onPullDownRefresh');
		
			uni.showToast({
				title: '数据更新中……',
				//icon:'loading'
			});
			
			
			setTimeout(function() {
				uni.stopPullDownRefresh();
			
				uni.hideToast();
			
			}, 1000);
			this.abotapi.set_shop_option_data(this,
					this.callback_function_shop_option_data
				);
		},
		
		
		
		
		methods:{
			callback_function_shop_option_data: function(that, cb_params) {
				console.log('callback_function_shop_option_data===>>>', cb_params);
			
				uni.showLoading({
					title: '正在加载中'
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 2000);
				
				
				
				//商城的Logo、导航栏背景颜色和文字颜色
				that.wxa_shop_operation_logo_url = cb_params.option_list.wxa_shop_operation_logo_url;
				that.wxa_shop_nav_bg_color = cb_params.option_list.wxa_shop_nav_bg_color;
				that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
			
				console.log('1212121212121212121211',that.current_citizenid);
				if(that.current_citizenid){
					
					
					var that = this;
					//判断是否登录
					var userInfo = that.abotapi.get_user_info();
					if(!userInfo || !userInfo.userid || !userInfo.checkstr){
						that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
					}
					
					
					var post_end_point = '/openapi/JiazhengPublicData/wxa_api_worker_detail';
					var post_data = {
						sellerid: that.abotapi.get_sellerid(),
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
						// adminuserid:that.current_adminuserid,
						
					};
					
					
					
					//判断是否有实体商家对应的身份的userid
					if(that.current_adminuserid > 0){
						post_data.adminuserid = that.current_adminuserid;
					}
					post_data.citizenid = that.current_citizenid;
					post_data.adminuserid = that.current_adminuserid;
					jiazhengApi.requestServer(post_end_point, post_data, function(res){
						console.log('/openapi/JiazhengPublicData/wxa_api_worker_detail===>>>', res);
						
						that.name = res.data.worker_list.name;
						if(res.data.worker_list.name == null){
							that.name = '--';
						}
						that.suoshudiqu = res.data.worker_list.suoshudiqu;
						if(res.data.worker_list.suoshudiqu == null){
							that.suoshudiqu = '--';
						}
						that.sex = res.data.worker_list.sex;
						if(res.data.worker_list.sex == null){
							that.sex = '--';
						}
						
						that.nation = res.data.worker_list.nation;
						if(res.data.worker_list.nation == null){
							that.nation = '--';
						}
						that.education = res.data.worker_list.education;
						if(res.data.worker_list.education == null){
							that.education = '--';
						}
						that.major = res.data.worker_list.major;
						if(res.data.worker_list.major == null){
							that.major = '--';
						}
						that.remark = res.data.worker_list.remark;
						if(res.data.worker_list.remark == null){
							that.remark = '--';
						}
						that.lift_photo = res.data.worker_list.lift_photo;
						if(res.data.worker_list.lift_photo == null){
							that.lift_photo = '--';
						}
						that.cook_dishes = res.data.worker_list.cook_dishes;
						if(res.data.worker_list.cook_dishes == null){
							that.cook_dishes = '--';
						}
						that.weight = res.data.worker_list.weight;
						if(res.data.worker_list.weight == null){
							that.weight = '--';
						}
						that.head_portrait = res.data.worker_list.head_portrait;
						if(res.data.worker_list.head_portrait == null){
							that.head_portrait = '--';
						}
						that.age = res.data.worker_list.age;
						if(res.data.worker_list.age == null){
							that.age = '--';
						}
						that.certificate = res.data.worker_list.certificate;
						if(res.data.worker_list.certificate == null){
							that.certificate = '--';
						}
						that.store = res.data.worker_list.store;
						if(res.data.worker_list.store == null){
							that.store = '--';
						}
						that.working_hours = res.data.worker_list.working_hours;
						if(res.data.worker_list.working_hours == null){
							that.working_hours = '--';
						}
						that.height = res.data.worker_list.height;
						if(res.data.worker_list.height == null){
							that.height = '--';
						}

					
						
						
					});
				}
			
			},
			
			
			
			
			
		}
		
		
		
	}
</script>

<style>
	page{
		background-color: #F0F3F6;
	}
	.content{
		margin: 30rpx;
		padding-bottom: 30rpx;
	}
	.content-top{
		width: 100%;
		height: 250rpx;
		background-color: #fff;
		border-radius: 20upx;
		padding: 20rpx 0;
	}
	.content-top-name{
		width: 30%;
		position: relative;
		float: left;
	}
	.content-top-genghuanname{
		width: 150rpx;
		border: 2rpx solid #e16751;
		background-color: #e16751;
		border-radius: 20upx;
		color: #fff;
		text-align: center;
		margin-left: 50rpx;
		margin-top: -50rpx;
		z-index: 100;
		position: absolute;
	}
	.content-top-ziliao{
		width: 55%;
		position: relative;
		float: right;
	}
	.content-top-hangyi{
		padding-top: 40rpx;
		display: flex;
		flex-direction: row;
	}
	.content-top-hanger{
		padding-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-right:30rpx;
	}
	.content-bottom , .content-middle{
		padding: 20rpx;
		border-radius: 20upx;
		background-color: #fff;
		margin-top: 40rpx;
	}
	.content-middle-biaoti{
		width: 35%;
		color: #737576;
	}
	.content-middle-ziliaoyi{
		display: flex;
		flex-direction: row;
		margin-top: 40rpx;
	}
	.content-middle-wenzi{
		width: 70%;
	}
	.images_pictire{
		width: 200rpx;
		height: 150rpx;
	}
	.content-bottom-picture{
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
		justify-content: space-between;
	}
	.cur{
		font-weight: bolder;
	}
	.ziwojieshao{
		width: 80%;
	
		border: 2rpx solid #a2a5a6;
		padding: 10rpx;
	}
</style>