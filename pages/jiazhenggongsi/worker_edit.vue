<template>
	<form @submit="formsubmit">
		<view class="type_page">
			<view style="text-align: left; padding-top: 20rpx; color: #F5A24D;">带*为必填项</view>
			<view style="background-color: #ffffff;width: 100%;border-radius: 20upx;height: 1580rpx;margin-bottom: 20rpx;margin-top: 20rpx;">
				<view>
					<view class="forms">
						<view class="forms_text">*姓名</view>
						<input name="name" type="text" placeholder="请输入姓名" :value="name"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">*民族</view>
						<input name="nation" type="text" placeholder="请输入民族" :value="nation"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">*地址</view>
						<input name="address" type="text" placeholder="请输入地址" :value="address"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">*手机号码</view>
						<input name="mobile" type="text" placeholder="请输入手机号码" :value="mobile"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">*性别</view>
						<view class="picker">
							<radio-group  name="sex">
								<radio style="margin-right: 30rpx;" value="1" :checked="sex==1">
									<image 
									src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/男士.png"
									style="width: 40rpx; height: 40rpx;">
									</image>
								</radio>
								<radio value="2" :checked="sex==2">
									<image
									src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/女士.png"
									style="width: 40rpx; height: 40rpx;">
								</radio>
							</radio-group>
						</view>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">专业</view>
						<input name="major" type="text" placeholder="请输入专业" :value="major"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">学历</view>
						<input name="education" type="text" placeholder="请输入学历" :value="education"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">*户籍所在地</view>
						<input name="domicile" type="text" placeholder="请输入户籍所在地" :value="domicile"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">户籍健康证编码</view>
						<input name="health_number" type="text" placeholder="请输入户籍健康证编码" :value="health_number"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">*身份证</view>
						<input name="identity_card" type="idcard" placeholder="请输入身份证*" :value="identity_card"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">*工作年限</view>
						<input name="working_hours" type="text" placeholder="请输入工作年限*" :value="working_hours"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">开户银行</view>
						<input name="specification" type="text" placeholder="请输入开户银行" :value="specification"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">开户人姓名</view>
						<input name="account_name" type="text" placeholder="请输入开户人姓名" :value="account_name"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">*银行卡号</view>
						<input name="credit_card_numbers" type="text" placeholder="请输入银行卡号" :value="credit_card_numbers"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text" >政治面貌</view>
						<view class="picker">
							<picker name="political_status" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_politics_Change" :value="politics_index" :range="politics" >
								<view >{{politics[politics_index]}} </view>
							</picker>
						</view>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">婚姻状况</view>
						<input name="marital_status" type="text" placeholder="请输入婚姻状况" :value="marital_status"/>
					</view>
				</view>
				<view>
					<view class="forms" style="margin-bottom: 80rpx;">
						<view class="forms_text">备注</view>
						<input name="remark" type="text" placeholder="请输入备注" :value="remark"/>
					</view>
				</view>
			</view>
			<button style="width: 100%; height: 100rpx; background-color: red; color: white;"
			form-type="submit"
			>保存</button>
		</view>
	</form>
	
</template>

<script>
	import jiazhengApi from './common/abotapiJiazhenggongsi.js';
	export default{
		behaviors: ['uni://form-field'],
		data(){
			return{
				//商城的Logo、导航栏背景颜色和文字颜色
				wxa_shop_operation_logo_url:'',
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				
				politics: ['请选择','群众', '共青团员', '中共党员', '学生'],//政治面貌
				
				politics_index:0,//政治面貌
				
				current_citizen_name:'',
				current_citizenid:0,
				
				detail:'',
				
				
				name:'',
				nation:'',
				address:'',
				mobile:'',
				sex:'',
				major:'',
				education:'',
				domicile:'',
				health_number:'',
				identity_card:'',
				working_hours:'',
				specification:'',
				account_name:'',
				credit_card_numbers:'',
				political_status:'',
				marital_status:'',
				remark:'',
			}
		},
		onLoad: function(options) {
			var that = this;
			
			jiazhengApi.check_user_login();
			jiazhengApi.get_current_adminuserid(options, that);
			
			
			if(options.citizenid){
				this.current_citizenid = options.citizenid;
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
				
				
				
				if(that.current_citizenid){
				
					var that = this;
					
					//判断是否登录
					var userInfo = that.abotapi.get_user_info();
					if(!userInfo || !userInfo.userid || !userInfo.checkstr){
						that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
					}
					
					var post_end_point = '/openapi/JiazhenggongsiData/worker_detail';
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
						console.log('/openapi/JiazhenggongsiData/worker_detail===>>>', res);
						
						that.name = res.data.detail.name;
						that.nation = res.data.detail.nation;
						that.address = res.data.detail.address;
						that.sex = res.data.detail.sex;
						that.mobile = res.data.detail.mobile;
						that.major = res.data.detail.major;
						that.education = res.data.detail.education; 
						that.domicile = res.data.detail.domicile;
						that.health_number = res.data.detail.health_number;
						that.identity_card = res.data.detail.identity_card;
						that.working_hours = res.data.detail.working_hours;
						that.specification = res.data.detail.specification;
						that.account_name = res.data.detail.account_name;
						that.credit_card_numbers = res.data.detail.credit_card_numbers;
						that.political_status = res.data.detail.political_status;
						that.marital_status = res.data.detail.marital_status;
						that.remark = res.data.detail.remark;
					});
				}

			},
			
			//跳转链接传参
			// goto_course_detail:function(courseid){
			// 	var new_url = '/pages/jiazhenggongsi/worker_list'
							
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
				
				//身份证正则表达式
				var identity = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				
				//判断手机号以及必选项是否符合
				if(!regExp.test(formdata.mobile)){
					uni.showToast({
						title:'请检查手机号',
						icon:'error',
						duration:1500,
					});
					return;
				}
				if(!identity.test(formdata.identity_card)){
					uni.showToast({
						title:'身份证错误！',
						icon:'error',
						duration:1500,
					});
					return;
				}
				if(formdata.name == '' || formdata.nation == '' || formdata.address== '' || formdata.mobile== ''  || formdata.sex== ''  || formdata.domicile== ''  || formdata.identity_card== '' || formdata.working_hours== '' || formdata.credit_card_numbers== ''){
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
				
				
				var post_end_point = '/openapi/JiazhenggongsiData/worker_edit';
				var post_data = {
					sellerid: that.abotapi.get_sellerid(),
					checkstr: userInfo.checkstr,
					userid: userInfo.userid,
					adminuserid: that.current_adminuserid,
				};
				
				//如果是编辑记录
				if(that.current_citizenid){
					post_data.citizenid = that.current_citizenid;
				}
				
				post_data.name = formdata.name;
				post_data.nation = formdata.nation;
				post_data.address = formdata.address;
				post_data.mobile = formdata.mobile;
				post_data.sex = formdata.sex;
				post_data.major = formdata.major;
				post_data.education = formdata.education;
				post_data.domicile = formdata.domicile;
				post_data.health_number = formdata.health_number;
	
				post_data.identity_card = formdata.identity_card;
				
				post_data.working_hours = formdata.working_hours;
				post_data.specification = formdata.specification;
				post_data.account_name = formdata.account_name;
				post_data.credit_card_numbers = formdata.credit_card_numbers;
				post_data.political_status = formdata.political_status;
				post_data.marital_status = formdata.marital_status;
				post_data.remark = formdata.remark;
				
				jiazhengApi.requestServer(post_end_point, post_data, function(res){
					console.log('/openapi/JiazhenggongsiData/worker_detail===>>>', res);
					
					
					uni.showModal({
						title:'提示',
						content:'添加成功',
						showCancel:false,
						success:function(res001){
							console.log('sifjsiofdngjdngv',res001)
							if(res.data && (res.data.code = 1)){
								console.log('ndsvjk11111111111');
								
								that.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/worker_list');
							
							}
							else{
								//提交失败，不跳转
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
			//政治面貌选择项
			bind_politics_Change: function(e) {
			    console.log('bind_politics_Change发送选择改变，携带值为', e.detail.value);
				console.log('bind_politics_Change发送选择改变，政治面貌选择项是', this.politics[e.detail.value]);
			    this.politics_index = e.detail.value;
			}
		}
	}
</script>

<style>
	@import 'static/css/jiazhenggongsi_forms.css'
</style>