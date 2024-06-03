<template>
	<form @submit="formsubmit">
		<view class="type_page">
			<view style="background-color: #ffffff;width: 100%;border-radius: 20upx;height: 450rpx;margin-bottom: 20rpx;margin-top: 20rpx;">
				<view>
					<view class="forms">
						<view class="forms_text">客户手机*</view>
						<input name="citizen_mobile" type="number" placeholder="请输入客户手机号" :value="citizen_mobile"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">员工手机*</view>
						<input name="worker_mobile" type="number" placeholder="请输入员工手机号" :value="worker_mobile"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">服务开始时间*</view>
						<view class="picker">
							<picker name="start_time" style="border: 1rpx solid #BFBFBF;" mode="date" @change="bind_start_time"
								:value="service_start_time" :start="startDate" :end="endDate">
								<view>{{service_start_time}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view>
					<view class="forms" style="margin-bottom: 50rpx;">
						<view class="forms_text">服务结束时间*</view>
						<view class="picker">
							<picker name="end_time" style="border: 1rpx solid #BFBFBF;" mode="date" @change="bind_end_time"
								:value="service_end_time" :start="startDate" :end="endDate">
								<view>{{service_end_time}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
			<view>
				<button style="width: 100%; height: 100rpx; background-color: red; color: white;"
					form-type="submit">保存</button>
			</view>
		</view>
	</form>

</template>

<script>
	import jiazhengApi from './common/abotapiJiazhenggongsi.js';
	
	
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				formdata: [], 
				index: 0,
				service_end_time: currentDate, //服务开始时间
				service_start_time: currentDate, //服务结束时间

				//商城的Logo、导航栏背景颜色和文字颜色
				wxa_shop_operation_logo_url: '',
				wxa_shop_nav_bg_color: '',
				wxa_shop_nav_font_color: '',
				
				
				
				citizen_mobile:'',
				worker_mobile:'',
				
				current_worker_citizenid:0,
				current_citizen_citizenid:0,
				current_id:0,
			}
		},

		onLoad: function(options) {
			var that = this;
			
			console.log('aaaadddddd',options)
			
			jiazhengApi.check_user_login();
			jiazhengApi.get_current_adminuserid(options, that);
			
			
			
			if(options.worker_citizenid && options.citizen_citizenid && options.id){
				this.current_worker_citizenid = options.worker_citizenid;
				this.current_citizen_citizenid = options.citizen_citizenid;
				this.current_id = options.id;
				
				
				
				console.log('当前的citizenid为：',options.citizen_citizenid)
			}
			
			that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);
			
		},

		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			//这是每个vue文件都必须执行的回调函数，用于渲染头部导航栏背景色和文字颜色
			callback_function_shop_option_data: function(that, cb_params) {
				
				
				console.log('callback_function_shop_option_data===>>>', cb_params);
			
				//商城的Logo、导航栏背景颜色和文字颜色
				that.wxa_shop_operation_logo_url = cb_params.option_list.wxa_shop_operation_logo_url;
				that.wxa_shop_nav_bg_color = cb_params.option_list.wxa_shop_nav_bg_color;
				that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
				
				
				console.log('aaaaaaaaaaaa',that.current_worker_citizenid)
				console.log('aaaaaaaaaaaa',that.current_citizen_citizenid)
				console.log('aaaaaaaaaaaa',that.current_id)
				
				
				if(that.current_worker_citizenid && that.current_citizen_citizenid && that.current_id){
					
					var that = this;
					
					//判断是否登录
					var userInfo = that.abotapi.get_user_info();
					if(!userInfo || !userInfo.userid || !userInfo.checkstr){
						that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
					}
					
					var post_end_point = '/openapi/JiazhenggongsiData/relevance_detail';
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
					
					
					// 通过id号将信息渲染至编辑界面
					post_data.worker_citizenid = that.current_worker_citizenid;
					post_data.citizen_citizenid = that.current_citizen_citizenid;
					post_data.id = that.current_id;
					
					jiazhengApi.requestServer(post_end_point, post_data, function(res){
						console.log('/openapi/JiazhenggongsiData/relevance_detail===>>>', res);
						
						that.citizen_mobile = res.data.detail.citizen_mobile;
						that.worker_mobile = res.data.detail.worker_mobile;
						that.start_time = res.data.detail.start_time;
						that.end_time = res.data.detail.end_time;
						
						console.log('员工的电话为：',that.worker_mobile);
						console.log('员工的电话为：',that.citizen_mobile);
					});
				}
				
			},
			
			
			//提交表单
			formsubmit: function(e) {
				var that = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value;
				console.log('formdata====>>>>',formdata);
				console.log('citizen_mobile====>>>>',formdata.citizen_mobile);
				
				
				
				// var post_end_point = '/openapi/JiazhenggongsiData/relevance_edit';
				// var post_data = {
				// 	sellerid: that.abotapi.get_sellerid(),

				// 	citizen_mobile:formdata.citizen_mobile,
				// 	worker_mobile:formdata.worker_mobile,
				// 	start_time:formdata.start_time,
				// 	end_time:formdata.end_time,
				// };

				// jiazhengApi.requestServer(post_end_point, post_data, function(res){
					
				// });	
				
				//手机号正则表达式
				var regExp = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
				
				//判断手机号以及时间是否符合
				if(!regExp.test(formdata.citizen_mobile)){
					uni.showToast({
						title:'请检查客户手机号',
						icon:'error',
						duration:1500,
					});
					return;
				}
				if(!regExp.test(formdata.worker_mobile)){
					uni.showToast({
						title:'请检查员工手机号',
						icon:'error',
						duration:1500,
					});
					return;
				}
				if(formdata.start_time > formdata.end_time ){
					uni.showToast({
						title:'时间错误',
						icon:'error',
						duration:1500,
					});
				}
				
				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if(!userInfo || !userInfo.userid || !userInfo.checkstr){
					that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
				}
				
				
				var post_end_point = '/openapi/JiazhenggongsiData/relevance_edit';
				var post_data = {
					sellerid: that.abotapi.get_sellerid(),
					checkstr: userInfo.checkstr,
					userid: userInfo.userid,
					adminuserid: that.current_adminuserid,
				};
				
				//如果是编辑记录
				if(that.current_worker_citizenid && that.current_citizen_citizenid){
					post_data.worker_citizenid = that.current_worker_citizenid;
					post_data.citizen_citizenid = that.current_citizen_citizenid;
					post_data.id = that.current_id;
					
				}
				
				post_data.citizen_mobile = formdata.citizen_mobile;
				post_data.worker_mobile = formdata.worker_mobile;
				post_data.start_time = formdata.start_time;
				post_data.end_time = formdata.end_time;
				
				jiazhengApi.requestServer(post_end_point, post_data, function(res){
					console.log('/openapi/JiazhenggongsiData/relevance_detail===>>>', res);
					
					
					uni.showModal({
						title:'提示',
						content:'添加成功!',
						showCancel:false,
						success:function(res001){
							console.log('sifjsiofdngjdngv',res001)
							if(res.data && (res.data.code = 1)){
								console.log('ndsvjk11111111111');
								
								that.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/relevance_list');
							
							}
							else{
								return;
							}
					
						},
						fail:function(){
							uni.showToast({
								title:'提示',
								content:'添加失败,请检查网络设置！'
							})
						},
					});
						
				});
				
			},

			bind_end_time: function(e) {
				this.service_end_time = e.detail.value;
				console.log('this.service_end_time=====>>>>', e.detail.value);
			},

			bind_start_time: function(e) {
				this.service_start_time = e.detail.value;
			},

			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},

			

			//跳转链接传参
			goto_course_detail:function(courseid){
				var new_url = '/pages/jiazhenggongsi/relevance_list'
							
				this.abotapi.call_h5browser_or_other_goto_url(new_url);
			},
		},
	}
</script>

<style>
	@import 'static/css/jiazhenggongsi_forms.css'
</style>
