<template>
	<form @submit="formsubmit">
		<view class="type_page">
			<view style="background-color: #ffffff;width: 100%;border-radius: 20upx;height: 2040rpx;margin-bottom: 20rpx;margin-top: 20rpx;">
			<view>
				<view class="forms">
					<view class="forms_text">客户手机号*</view>
					<input name="citizen_mobile" type="text" placeholder="请输入客户手机号" :value="citizen_mobile"/>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text">员工手机号*</view>
					<input name="worker_mobile" type="text" placeholder="请输入员工手机号" :value="worker_mobile"/>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text">专管手机号*</view>
					<input name="zg_mobile" type="text" placeholder="请输入专管手机号" :value="zg_mobile"/>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text" >督导方式*</view>
					<view class="picker">
						<picker name="supervision_type" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_supervise_Change" :value="supervise_index" :range="supervise" >
							<view>{{supervise[supervise_index]}} </view>
						</picker>
					</view>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text">督导频次(单位/次)*</view>
					<input name="supervision_frequency" type="text" placeholder="请输入督导频次" :value="supervision_frequency"/>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text" style="width: 230rpx;">残疾人家属反馈：</view>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text" >服务态度</view>
					<view class="picker">
						<picker name="attitude" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_level_Change" :value="service_level_index" :range="service_level" >
							<view>{{service_level[service_level_index]}} </view>
						</picker>
					</view>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text" >解决问题能力</view>
					<view class="picker">
						<picker name="problem_solving" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_solve_Change" :value="service_level_index" :range="service_level" >
							<view>{{service_level[solve_ability_index]}} </view>
						</picker>
					</view>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text" >服务主动性</view>
					<view class="picker">
						<picker name="service_initiative" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_initiative_Change" :value="initiative_index" :range="service_level" >
							<view>{{service_level[initiative_index]}} </view>
						</picker>
					</view>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text" >服务内容多样</view>
					<view class="picker">
						<picker name="diverse_services" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_diverse_Change" :value="diverse_content_index" :range="service_level" >
							<view>{{service_level[diverse_content_index]}} </view>
						</picker>
					</view>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text" >服务流程标准化</view>
					<view class="picker">
						<picker name="service_plan" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_process_Change" :value="process_index" :range="service_level" >
							<view>{{service_level[process_index]}} </view>
						</picker>
					</view>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text" >服务计划多样</view>
					<view class="picker">
						<picker name="plan_strong" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_plans_Change" :value="plans_index" :range="service_level" >
							<view>{{service_level[plans_index]}} </view>
						</picker>
					</view>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text" style="width: 230rpx;">现场督导反馈：</view>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text" >厨房</view>
					<view class="picker">
						<picker name="kitchen" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_cuisine_Change" :value="cuisine_index" :range="service_level" >
							<view>{{service_level[cuisine_index]}} </view>
						</picker>
					</view>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text" >客厅</view>
					<view class="picker">
						<picker name="drawing" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_bedroom_Change" :value="bedroom_index" :range="service_level" >
							<view>{{service_level[bedroom_index]}} </view>
						</picker>
					</view>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text" >书房</view>
					<view class="picker">
						<picker name="study" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_study_Change" :value="study_index" :range="service_level" >
							<view>{{service_level[study_index]}} </view>
						</picker>
					</view>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text" >卫生间</view>
					<view class="picker">
						<picker name="toilet" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_toliet_Change" :value="toliet_index" :range="service_level" >
							<view>{{service_level[toliet_index]}} </view>
						</picker>
					</view>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text" >门窗</view>
					<view class="picker">
						<picker name="door" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_windows_Change" :value="windows_index" :range="service_level" >
							<view>{{service_level[windows_index]}} </view>
						</picker>
					</view>
				</view>
			</view>
			<view>
				<view class="forms">
					<view class="forms_text" >垃圾分类</view>
					<view class="picker">
						<picker name="garbage" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_classify_Change" :value="classify_index" :range="service_level" >
							<view>{{service_level[classify_index]}} </view>
						</picker>
					</view>
				</view>
			</view>
			<view>
				<view class="forms" style="margin-bottom: 70rpx;">
					<view class="forms_text">督导重点*</view>
					<input name="supervision_focus" type="text" placeholder="请输入督导重点" :value="supervision_focus"/>
				</view>
			</view>
			</view>
			<button style="width: 100%; height: 100rpx; background-color: red; color: white;"
			form-type="submit">保存</button>
		</view>
	</form>
	
</template>

<script>
	
	import jiazhengApi from './common/abotapiJiazhenggongsi.js';
	export default{
		data(){
			return{
				supervise:['请选择','电话督导','现场督导'],
				supervise_index:0,
				service_level:['☆','☆☆','☆☆☆','☆☆☆☆','☆☆☆☆☆'],
				service_level_index:0,
				solve_ability_index:0,
				initiative_index:0,
				diverse_content_index:0,
				plans_index:0,
				process_index:0,
				cuisine_index:0,
				bedroom_index:0,
				study_index:0,
				toliet_index:0,
				windows_index:0,
				classify_index:0,
				
				
				citizen_mobile:'',
				worker_mobile:'',
				zg_mobile:'',
				supervision_type:'',
				supervision_frequency:'',
				supervision_focus:'',
				
				current_worker_citizenid:0,
				current_citizen_name:'',
				current_zg_adminid:0,
				current_citizen_citizenid:0,
				
				
				// citizen_citizenid:0,
				
				
				//商城的Logo、导航栏背景颜色和文字颜色
				wxa_shop_operation_logo_url:'',
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
			}
		},
		
		onLoad: function(options){
			var that = this;
			console.log('aaaadddddd',options)
			
			jiazhengApi.check_user_login();
			jiazhengApi.get_current_adminuserid(options, that);
			
			
			if(options.worker_citizenid && options.citizen_citizenid && options.zg_adminid && options.groupid){
				this.current_worker_citizenid = options.worker_citizenid;
				this.current_citizen_citizenid = options.citizen_citizenid;
				this.current_zg_adminid = options.zg_adminid;
				this.current_groupid = options.groupid;
				
				
			}
			console.log('options下都有：',options);
			
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
				console.log('aaaaaaaaaaaa',that.current_worker_citizenid)
				console.log('aaaaaaaaaaaa',that.current_citizen_citizenid)
				console.log('aaaaaaaaaaaa',that.current_zg_adminid)
				if(that.current_worker_citizenid && that.current_citizen_citizenid && that.current_zg_adminid){
					
					var that = this;
					
					//判断是否登录
					var userInfo = that.abotapi.get_user_info();
					if(!userInfo || !userInfo.userid || !userInfo.checkstr){
						that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
					}
					
					var post_end_point = '/openapi/JiazhenggongsiData/result_detail';
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
					post_data.zg_adminid = that.current_zg_adminid;
					
					jiazhengApi.requestServer(post_end_point, post_data, function(res){
						console.log('/openapi/JiazhenggongsiData/result_detail===>>>', res);
						
						that.citizen_mobile = res.data.detail.citizen_mobile;
						that.worker_mobile = res.data.detail.worker_mobile;
						that.zg_mobile = res.data.detail.zg_mobile;
						that.supervision_type = res.data.detail.supervision_type;
						that.supervision_frequency = res.data.detail.supervision_frequency;
						that.supervision_focus = res.data.detail.supervision_focus;
					});
				}
			
			},
			
			//电话督导
			bind_supervise_Change: function(e) {
			    console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			    this.supervise_index = e.detail.value
			},
			//服务态度
			bind_level_Change: function(e) {
			    console.log('bind_level_Change发送选择改变，携带值为', e.detail.value)
			    this.service_level_index = e.detail.value;
			},
			//解决能力问题
			bind_solve_Change: function(e) {
			    console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			    this.solve_ability_index = e.detail.value
			},
			//服务主动性
			bind_initiative_Change: function(e) {
			    console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			    this.initiative_index = e.detail.value
			},
			bind_diverse_Change: function(e) {
			    console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			    this.diverse_content_index = e.detail.value
			},
			bind_plans_Change: function(e) {
			    console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			    this.plans_index = e.detail.value
			},
			bind_process_Change: function(e) {
			    console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			    this.process_index = e.detail.value
			},
			
			bind_cuisine_Change: function(e) {
			    console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			    this.cuisine_index = e.detail.value
			},
			bind_bedroom_Change: function(e) {
			    console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			    this.bedroom_index = e.detail.value
			},
			bind_study_Change: function(e) {
			    console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			    this.study_index = e.detail.value
			},
			bind_toliet_Change: function(e) {
			    console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			    this.toliet_index = e.detail.value
			},
			bind_windows_Change: function(e) {
			    console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			    this.windows_index = e.detail.value
			},
			bind_classify_Change: function(e) {
			    console.log('bind_supervise_Change发送选择改变，携带值为', e.detail.value)
			    this.classify_index = e.detail.value
			},
			
			
			
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
				
				var post_end_point = '/openapi/JiazhenggongsiData/result_edit';
				var post_data = {
					sellerid: that.abotapi.get_sellerid(),
					checkstr: userInfo.checkstr,
					userid: userInfo.userid,
					adminuserid: that.current_adminuserid,
				};
				
				//如果是编辑记录
				if(that.current_worker_citizenid && that.current_citizen_citizenid && that.current_zg_adminid){
					post_data.worker_citizenid = that.current_worker_citizenid;
					post_data.citizen_citizenid = that.current_citizen_citizenid;
					post_data.zg_adminid = that.current_zg_adminid;
				}
				console.log(that.current_worker_citizenid);
				console.log(that.current_citizen_citizenid);
				console.log(that.current_zg_adminid);
				
				
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
					console.log('/openapi/JiazhenggongsiData/result_detail===>>>', res);
					

					uni.showModal({
						title:'提示',
						content:'444',
						showCancel:false,
						success:function(res001){
							console.log('sifjsiofdngjdngv',res001)
							if(res.data && (res.data.code = 1)){
								console.log('ndsvjk11111111111');
								
								that.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/result_list');
							
							}
							else{

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

			}
		}
	}
</script>

<style>
	@import 'static/css/jiazhenggongsi_forms.css'
</style>