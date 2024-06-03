<template>
	<view class="content-list">
		<view class="content-list-hangyi">
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/客户.png" class="content-list-img"></image>
			<text class="content-list-name">{{name}}</text>
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/男士.png" class="content-list-sex" v-if="sex == 1"></image>
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/女士.png" class="content-list-sex" v-if="sex == 2"></image>
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/更多.png" class="content-list-more" @tap="modal_message = !modal_message"></image>
		</view>
		<view class="content-list-hanger">
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/手机3.png" class="content-list-img"></image>
			<text class="content-list-phone">手机号:&nbsp;&nbsp;{{mobile}}</text>
		</view>
		<view class="content-list-hangsan">
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/列表页地址.png" class="content-list-img"></image>
			<text class="content-list-phone">地址:&nbsp;&nbsp;{{address}}</text>
		</view>
		<view class="content-list-hangsi">
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/身份证.png" class="content-list-shenfen"></image>
			<text class="content-list-phone">身份证号:&nbsp;&nbsp;{{identity_card}}</text>
		</view>
		<view class="content-list-bottom">
			<text class="content-list-zhengzhuang">{{recipient_type}}</text>
		</view>
		<view class="content_detail_message">
			<view class="content_middle_title">
				<view class="blue_gang"></view>
				<view class="content_title_wenzi">更多信息</view>
			</view>
			<view class="content_message01">
				<view class="hang_title">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/书.png" class="content-list-img01"></image>
					<view class="hang_content">户籍所在地：{{domicile}}</view>
				</view>
				<view class="hang_title">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/书.png" class="content-list-img01"></image>
					<view class="hang_content">人户状态：{{renhu_status}}</view>
				</view>
				<view class="hang_title">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/书.png" class="content-list-img01"></image>
					<view class="hang_content">政治面貌：{{political_status}}</view>
				</view>
				<view class="hang_title">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/书.png" class="content-list-img01"></image>
					<view class="hang_content">文化程度：{{culture_status}}</view>
				</view>
				<view class="hang_title">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/书.png" class="content-list-img01"></image>
					<view class="hang_content">在读情况：{{wasreading_status}}</view>
				</view>
				<view class="hang_title">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/书.png" class="content-list-img01"></image>
					<view class="hang_content">民族：{{nation}}</view>
				</view>
				<view class="hang_title">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/书.png" class="content-list-img01"></image>
					<view class="hang_content">残疾时间：{{injured_time}}</view>
				</view>
				<view class="hang_title">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/书.png" class="content-list-img01"></image>
					<view class="hang_content">备注信息</view>
				</view>
				<view class="content_beizhu">{{remark}}</view>
				<view class="content_middle_title">
					<view class="blue_gang"></view>
					<view class="content_title_wenzi">由以下员工服务</view>
				</view>
				<view v-for="(item , index) in fuwu_worker_list" :key="index">
					<view style="margin-top: 20rpx;">{{item.name}}</view>
					<view class="content_xuxian"></view>
				</view>
			</view>
			<view class="content_fanhui">
				<view style="color: #F0F3F6;font-size: 36rpx;" @tap="back_citizen_list">返&nbsp;&nbsp;&nbsp;&nbsp;回</view>
			</view>
			<view class="loading">
				{{ is_ok }}
			</view>
		</view>
	</view>
	
</template>

<script>
	import jiazhengApi from './common/abotapiJiazhenggongsi.js';
	export default {
		data() {
			return {
				//商城的Logo、导航栏背景颜色和文字颜色
				wxa_shop_operation_logo_url:'',
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				is_ok:'已经到底了~',
				modal_message:false,
				
				
				current_citizenid:0,
				
				name:'',
				mobile:'',
				address:'',
				identity_card:'',
				recipient_type:'',
				domicile:'',
				renhu_status:'',
				political_status:'',
				culture_status:'',
				wasreading_status:'',
				nation:'',
				remark:'',
				sex:'',
				injured_time:'',
				
				// worker_list:null,
				fuwu_worker_list:[],
				
			}
			
		},
		onLoad:function(options) {
			var that = this;
			
			uni.setNavigationBarTitle({
				title: that.page_title,
			});
			console.log('12333=====>>>',options)
			
			
			jiazhengApi.check_user_login();
			jiazhengApi.get_current_adminuserid(options, that);
			
			// if(options.citizenid){
			// 	this.current_citizenid = options.citizenid;
			// }

			if(!options.citizenid){
				uni.showToast({
					title:'缺少参数！！！！！'
				});
				
				return;
			}
			
			
			// console.log('12333=====>>>',optionsoptions.citizenid)
			this.current_citizenid = options.citizenid;
			
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
				// this.current_page++;
				
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
		methods: {
			//这是每个vue文件都必须执行的回调函数，用于渲染头部导航栏背景色和文字颜色
			callback_function_shop_option_data: function(that, cb_params) {
				
				console.log('callback_function_shop_option_data===>>>', cb_params);
			
				uni.showLoading({
					title: '正在加载中'
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 1000);
				
				//商城的Logo、导航栏背景颜色和文字颜色
				that.wxa_shop_operation_logo_url = cb_params.option_list.wxa_shop_operation_logo_url;
				that.wxa_shop_nav_bg_color = cb_params.option_list.wxa_shop_nav_bg_color;
				that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
				
				
				if(that.current_citizenid){
					var that = this;
					//判断是否登录
					var userInfo = that.abotapi.get_user_info();
					if(!userInfo || !userInfo.userid || !userInfo.checkstr){
						that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
					}
					
					var post_end_point = '/openapi/JiazhenggongsiData/citizen_detail';
					var post_data = {
						sellerid: that.abotapi.get_sellerid(),
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
						adminuserid: that.current_adminuserid,
					};
					
					//判断是否有实体商家对应的身份的userid
					if(that._current_adminuserid > 0){
						post_data.adminuserid = that._current_adminuserid;
					}
					
					
					post_data.citizenid = that.current_citizenid;
					
					jiazhengApi.requestServer(post_end_point, post_data, function(res){
						console.log('/openapi/JiazhenggongsiData/citizen_detail===>>>', res);
						
						that.name = res.data.detail.name;
						that.mobile = res.data.detail.mobile;
						that.address = res.data.detail.address;
						that.identity_card = res.data.detail.identity_card;
						that.recipient_type = res.data.detail.recipient_type;
						if(res.data.detail.recipient_type == 0){
							that.recipient_type = '未选择';
						};
						if(res.data.detail.recipient_type == 1){
							that.recipient_type = '智力';
						};
						if(res.data.detail.recipient_type == 2){
							that.recipient_type = '肢体';
						};
						if(res.data.detail.recipient_type == 3){
							that.recipient_type = '精神';
						};
						if(res.data.detail.recipient_type == 4){
							that.recipient_type = '听力';
						};
						if(res.data.detail.recipient_type == 5){
							that.recipient_type = '视力';
						};
						if(res.data.detail.recipient_type == 6){
							that.recipient_type = '渐冻';
						};
						that.domicile = res.data.detail.domicile;
						that.renhu_status = res.data.detail.renhu_status;
						if(res.data.detail.renhu_status == 0){
							that.renhu_status = '未选择';
						}
						if(res.data.detail.renhu_status == 1){
							that.renhu_status = '人户一致';
						}
						if(res.data.detail.renhu_status == 2){
							that.renhu_status = '人户分离，同属区';
						}
						if(res.data.detail.renhu_status == 3){
							that.renhu_status = '人户分离，属外区';
						}
						that.political_status = res.data.detail.political_status;
						if(res.data.detail.political_status == 0){
							that.political_status = '未选择';
						}
						if(res.data.detail.political_status == 1){
							that.political_status = '群众';
						}
						if(res.data.detail.political_status == 2){
							that.political_status = '共青团员';
						}
						if(res.data.detail.political_status == 3){
							that.political_status = '共产党员';
						}
						if(res.data.detail.political_status == 4){
							that.political_status = '学生';
						}
						that.culture_status = res.data.detail.culture_status;
						if(res.data.detail.culture_status == 0){
							that.culture_status = '未选择';
						}
						if(res.data.detail.culture_status == 1){
							that.culture_status = '未上学';
						}
						if(res.data.detail.culture_status == 2){
							that.culture_status = '小学';
						}
						if(res.data.detail.culture_status == 3){
							that.culture_status = '初中';
						}
						if(res.data.detail.culture_status == 4){
							that.culture_status = '高中';
						}
						if(res.data.detail.culture_status == 5){
							that.culture_status = '大专';
						}
						if(res.data.detail.culture_status == 6){
							that.culture_status = '本科';
						}
						if(res.data.detail.culture_status == 7){
							that.culture_status = '研究生';
						}
						that.wasreading_status = res.data.detail.wasreading_status;
						if(res.data.detail.wasreading_status == '1'){
							that.wasreading_status = '是';
						}
						if(res.data.detail.wasreading_status == '2'){
							that.wasreading_status = '否';
						}
						that.nation = res.data.detail.nation;
						that.remark = res.data.detail.remark;
						that.sex = res.data.detail.sex;
						that.injured_time = res.data.detail.injured_time;
						that.fuwu_worker_list = res.data.worker_list;
						
						
						
					});
				
				}
			},
			callback_request_jiazheng_success:function(res){
			//这里还会返回界面上需要的参数，包括客户、员工的数量等
			},
						
			back_citizen_list:function(){
				this.$router.go(-1);
			}
		},
	}
</script>

<style>
	@import './static/css/jiazhenggongsi_list.css';
</style>