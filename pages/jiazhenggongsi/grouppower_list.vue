<template>
	<view class="content_grouppower">
		<view class="content_grouppower_top">
			<view>添加/编辑组权限</view>
			<view class="content_grouppower_hengxian"></view>
		</view>
		<view class="content_name">
			<text>分组名称</text>
			<text style="margin-left: 40rpx;">{{group_name}}</text>
		</view>
		<view class="content_quanxian">
			<text>权限设置</text>
			<view class="content-border"><text>人员管理</text></view>
		</view>
		<view class="content-choice">
			<radio-group  name="radio">
				<radio value="radio1">客户列表</radio>
				<radio value="radio2" style="margin-left: 20rpx;">员工列表</radio>
				<radio value="radio3" style="margin-left: 20rpx;">关联关系</radio>
			</radio-group>
		</view>
		<view class="content_quanxian">
			<view class="content-border" style="margin-left:160rpx;"><text>数据管理</text></view>
		</view>
		<view class="content-choice">
			<radio-group  name="radio">
				<radio value="radio1">客户列表</radio>
				<radio value="radio2" style="margin-left: 20rpx;">服务过程和结果督导</radio>
			</radio-group>
		</view>
		<view class="content_quanxian">
			<view class="content-border" style="margin-left:160rpx;"><text>报表管理</text></view>
		</view>
		<view class="content-choice">
			<radio-group  name="radio">
				<radio value="radio1">服务内容统计</radio>
			</radio-group>
		</view>
		
		<view class="content_quanxian">
			<view class="content-border" style="margin-left:160rpx;"><text>权限管理</text></view>
		</view>
		<view class="content-choice">
			<radio-group  name="radio">
				<radio value="radio1">后台人员列表</radio>
				<radio value="radio2" style="margin-left: 20rpx;">分组列表</radio>
			</radio-group>
		</view>
		
		<view class="content_quanxian">
			<view class="content-border" style="margin-left:160rpx;"><text>系统设置</text></view>
		</view>
		<view class="content-choice">
			<radio-group  name="radio">
				<radio value="radio1">系统设置</radio>
				<radio value="radio2" style="margin-left: 20rpx;">修改密码</radio>
			</radio-group>
		</view>
		
		<view class="modal-disi">
			<view style="color: #F0F3F6;font-size: 36rpx;">保&nbsp;&nbsp;&nbsp;&nbsp;存</view>
		</view>
		
	</view>
</template>

<script>
	import jiazhengApi from './common/abotapiJiazhenggongsi.js';
	
	export default{
		data(){
			return{
				//商城的Logo、导航栏背景颜色和文字颜色
				wxa_shop_operation_logo_url:'',
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				
				group_name:'',
				
				current_groupid:0,
				
			}
		},
		onLoad: function(options){
			var that = this;
			console.log('aaaadddddd',options)
			
			
			jiazhengApi.check_user_login();
			jiazhengApi.get_current_adminuserid(options, that);
			
			
			
			if(options.groupid){
				this.current_groupid = options.groupid;
			}
			
			that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);
		},
		
		
		
		methods:{
			
			//这是每个vue文件都必须执行的回调函数，用于渲染头部导航栏背景色和文字颜色
			callback_function_shop_option_data: function(that, cb_params) {
				
				console.log('callback_function_shop_option_data===>>>', cb_params);
			
				//商城的Logo、导航栏背景颜色和文字颜色
				that.wxa_shop_operation_logo_url = cb_params.option_list.wxa_shop_operation_logo_url;
				that.wxa_shop_nav_bg_color = cb_params.option_list.wxa_shop_nav_bg_color;
				that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
				console.log('aaaaaaaaaaaa',that.current_groupid)
		
				if(that.current_groupid){
					
					var that = this;
					
					//判断是否登录
					var userInfo = that.abotapi.get_user_info();
					if(!userInfo || !userInfo.userid || !userInfo.checkstr){
						that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
					}
					
					var post_end_point = '/openapi/JiazhenggongsiData/power_detail';
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
					post_data.groupid = that.current_groupid;
					
					jiazhengApi.requestServer(post_end_point, post_data, function(res){
						console.log('/openapi/JiazhenggongsiData/power_detail===>>>', res);
						
						that.group_name = res.data.detail.group_name;
						// that.worker_mobile = res.data.detail.worker_mobile;
						// that.zg_mobile = res.data.detail.zg_mobile;
						// that.supervision_type = res.data.detail.supervision_type;
						// that.supervision_frequency = res.data.detail.supervision_frequency;
						// that.supervision_focus = res.data.detail.supervision_focus;
					});
				}
			
			},
			
			//电话督导
			// bind_supervise_Change: function(e) {
			//     console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			//     this.supervise_index = e.detail.value
			// },
			//服务态度
			// bind_level_Change: function(e) {
			//     console.log('bind_level_Change发送选择改变，携带值为', e.detail.value)
			//     this.service_level_index = e.detail.value;
			// },
			//解决能力问题
			// bind_solve_Change: function(e) {
			//     console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			//     this.solve_ability_index = e.detail.value
			// },
			//服务主动性
			// bind_initiative_Change: function(e) {
			//     console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			//     this.initiative_index = e.detail.value
			// },
			// bind_diverse_Change: function(e) {
			//     console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			//     this.diverse_content_index = e.detail.value
			// },
			// bind_plans_Change: function(e) {
			//     console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			//     this.plans_index = e.detail.value
			// },
			// bind_process_Change: function(e) {
			//     console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			//     this.process_index = e.detail.value
			// },
			
			// bind_cuisine_Change: function(e) {
			//     console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			//     this.cuisine_index = e.detail.value
			// },
			// bind_bedroom_Change: function(e) {
			//     console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			//     this.bedroom_index = e.detail.value
			// },
			// bind_study_Change: function(e) {
			//     console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			//     this.study_index = e.detail.value
			// },
			// bind_toliet_Change: function(e) {
			//     console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			//     this.toliet_index = e.detail.value
			// },
			// bind_windows_Change: function(e) {
			//     console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			//     this.windows_index = e.detail.value
			// },
			// bind_classify_Change: function(e) {
			//     console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			//     this.classify_index = e.detail.value
			// },
			
			
			
			//跳转链接传参
			// goto_course_detail:function(courseid){
			// 	var new_url = '/pages/jiazhenggongsi/result_list'
							
			// 	this.abotapi.call_h5browser_or_other_goto_url(new_url);
			// },
			
			//提交表单
			formsubmit: function(e) {
				var that = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value;
				console.log('formdata====>>>>',formdata);
				
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
				if(formdata.zg_mobile == '' || formdata.supervision_type == '' || formdata.supervision_frequency== '' || formdata.supervision_focus== ''){
					uni.showToast({
						title:'请输入必填项！',
						icon:'error',
						duration:1500,
					});
					return;
				}
				
				
				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if(!userInfo || !userInfo.userid || !userInfo.checkstr){
					that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
				}
				
				
				
				var post_end_point = '/openapi/JiazhenggongsiData/group_edit';
				var post_data = {
					sellerid: that.abotapi.get_sellerid(),
					checkstr: userInfo.checkstr,
					userid: userInfo.userid,
					adminuserid: that.current_adminuserid,
				};
				
				//如果是编辑记录
				if(that.current_groupid){
					post_data.groupid = that.current_groupid;
				}
				
				post_data.citizen_mobile = formdata.citizen_mobile;
				post_data.worker_mobile = formdata.worker_mobile;
				post_data.zg_mobile = formdata.zg_mobile;
				post_data.supervision_type = formdata.supervision_type;
				post_data.supervision_frequency = formdata.supervision_frequency;
				post_data.attitude = formdata.attitude;
				post_data.problem_solving = formdata.problem_solving;
				post_data.service_initiative = formdata.service_initiative;
				post_data.diverse_services = formdata.diverse_services;							
				post_data.service_plan = formdata.service_plan;				
				post_data.plan_strong = formdata.plan_strong;
				post_data.process_stand = formdata.process_stand;
				post_data.supervision_importance = formdata.supervision_importance;
				post_data.kitchen = formdata.kitchen;
				post_data.drawing = formdata.drawing;
				post_data.study = formdata.study;
				post_data.toilet = formdata.toilet;
				post_data.balcony = formdata.balcony;
				post_data.door = formdata.door;
				post_data.garbage = formdata.garbage;
				
				
				
				jiazhengApi.requestServer(post_end_point, post_data, function(res){
					console.log('/openapi/JiazhenggongsiData/group_detail===>>>', res);
					
					
					uni.showModal({
						title:'提示',
						content:res.msg,
						showCancel:false,
						success:function(res001){
							console.log('sifjsiofdngjdngv',res001)
							if(res.data && (res.data.code = 1)){
								console.log('ndsvjk11111111111');
								
								that.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/group_list');
							
							}
							else{
		
							}
							
							
						}
					});
						
				});
		
			}
		}
		
	}
</script>

<style>
	@import './static/css/jiazhenggongsi_list.css';
</style>