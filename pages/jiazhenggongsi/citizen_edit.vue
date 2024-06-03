<template>
	<form @submit="formsubmit">
		<view class="type_page">
			<view style="text-align: left; padding-top: 20rpx; color: #F5A24D;">带*为必填项</view>
				<view style="background-color: #ffffff;width: 100%;border-radius: 20upx;height: 1650rpx;margin-bottom: 20rpx;margin-top: 20rpx;">
					<view>
						<view class="forms">
							<view class="forms_text">*姓名</view>
							<input name="name" type="nickname" placeholder="请输入姓名" :value="name"/>
						</view>
					</view>
					<view>
						<view class="forms">
							<view class="forms_text">*所属地区</view>
							<input name="suoshudiqu" type="text" placeholder="请输入所属地区" :value="suoshudiqu"/>
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
										男
									</radio>
									<radio value="2" :checked="sex==2">
										女
									</radio>
								</radio-group>
							</view>
						</view>
					</view>
					<view>
						<view class="forms">
							<view class="forms_text" >*出生日期</view>
							<view class="picker">
								<picker name="birthday" style="border: 1rpx solid #BFBFBF;" mode="date"  @change="bind_start_time" :value="service_start_time"> <!--:start="startDate" :end="endDate"-->
									<view>{{service_start_time}}</view>
								</picker>
							</view>
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
							<view class="forms_text" >*类型</view>
							<view class="picker">
								<picker name="recipient_type" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_mold_Change" :value="mold_index" :range="mold_array" >
									<view>{{mold_array[mold_index]}} </view>
								</picker>
							</view>
						</view>
					</view>
					<view>
						<view class="forms">
							<view class="forms_text">*身份证</view>
							<input name="identity_card" type="idcard" placeholder="请输入身份证" :value="identity_card"/>
						</view>
					</view>
					<view>
						<view class="forms">
							<view class="forms_text" >人户一致</view>
							<view class="picker">
								<picker name="renhu_status" style="border: 1rpx solid #BFBFBF; width: 250rpx;" mode="selector"  @change="bind_registered_Change" :value="registered_index" :range="registered" >
									<view>{{registered[registered_index]}} </view>
								</picker>
							</view>
						</view>
					</view>
					<view>
						<view class="forms">
							<view class="forms_text" >政治面貌</view>
							<view class="picker">
								<picker name="political_status" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_politics_Change" :value="politics_index" :range="politics" >
									<view>{{politics[politics_index]}} </view>
								</picker>
							</view>
						</view>
					</view>
					<view>
						<view class="forms">
							<view class="forms_text" >文化程度</view>
							<view class="picker">
								<picker name="culture_status" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_culture_Change" :value="culture_index" :range="culture" >
									<view>{{culture[culture_index]}} </view>
								</picker>
							</view>
						</view>
					</view>
					<view>
						<view class="forms">
							<view class="forms_text">在读情况</view>
							<view class="picker" style="transform: scale(0.9);">
								<radio-group name="wasreading_status">
									<radio style="margin-right: 30rpx;" value="1"  :checked="wasreading_status==1">是</radio>
									<radio value="2"  :checked="wasreading_status==2">否</radio>
								</radio-group>
							</view>
						</view>
					</view>
					<view>
						<view class="forms">
							<view class="forms_text" >本人特长</view>
							<view class="picker">
								<picker name="special_line" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_specialty_Change" :value="specialty_index" :range="specialty" >
									<view>{{specialty[specialty_index]}} </view>
								</picker>
							</view>
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
							<view class="forms_text" >致残时间</view>
							<view class="picker">
								<picker name="injured_time" style="border: 1rpx solid #BFBFBF;" mode="date"  @change="bind_end_time" :value="service_end_time">  <!-- :start="startDate" :end="endDate" -->
									<view>{{service_end_time}}</view>
								</picker>
							</view>
						</view>
					</view>
					<view>
						<view class="forms">
							<view class="forms_text" >专管人员</view>
							<view class="picker">
								<picker name="zg_adminid" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bindPickerChange" :value="index" :range="array" >
									<view>{{array[index]}} </view>
								</picker>
							</view>
						</view>
					</view>
					<view>
						<view class="forms" style="display: flex;">
							<view style="width: 250rpx; text-align: left;margin-top: 40rpx;margin-left: 20rpx;">监管人情况</view>
							<view >
								<textarea name="guardian_status" auto-height style="border: 1rpx solid #DFDFDF;
								width: 400rpx; height: 100rpx; margin-top: 40rpx;
								" placeholder="请输入监管人情况"/>
							</view>
						</view>
					</view>
					<view>
						<view class="forms" style="display: flex; margin-bottom: 40rpx;">
							<view style="width: 250rpx; text-align: left; margin-top: 40rpx;margin-left: 20rpx;">备注</view>
							<view >
								<textarea name="remark" auto-height style="border: 1rpx solid #DFDFDF;
								width: 400rpx; height: 200rpx; margin-top: 40rpx;
								" placeholder="请输入备注"/>
							</view>
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
			
			const currentDate = this.getDate({
			    format: true
			});
			
			return{
				formdata:[],
				array:['请选择'],
				index:0,
				registered:['请选择','人户一致','人户分离，同属区','人户分离，属外区'],
				mold_array: ['请选择','智力', '肢体', '精神', '听力', '视力', '渐冻'],
				politics: ['请选择','群众', '共青团员', '中共党员', '学生'],//政治面貌
				culture:['请选择','未上学','小学','初中','高中','大专','本科','研究生'],
				specialty:['请选择','音乐','乐器','英语','体育'],
				politics_index:0,//政治面貌
				culture_index:0,
				specialty_index:0,
				mold_index:0,
				registered_index:0,
				service_end_time: currentDate, //服务开始时间
				service_start_time:currentDate,  //服务结束时间
				action: 'add',
				
				//商城的Logo、导航栏背景颜色和文字颜色
				wxa_shop_operation_logo_url:'',
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				
				current_citizenid:0,
				
				detail:'',
				
				name:'',
				mobile:'',
				suoshudiqu:'',
				address:'',
				sex:'',
				birthday:'',
				domicile:'',     //户籍地 
				recipient_type:''  ,//致残类型
				nation:'',   //民族
				identity_card:'',  //身份证号
				injured_time:'',
				wasreading_status:'',//在读情况
				
				
				
				
			}
		},
		onLoad: function(options) {
			var that = this;
			
			
			//检查用户是否登录
			jiazhengApi.check_user_login();
			jiazhengApi.get_current_adminuserid(options, that);
			
			if(options.citizenid){
				this.current_citizenid = options.citizenid;
			}

			that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);
			
			
			console.log('options下都有：',options);
			
			
			
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
					
					
					
					// 通过id号将信息渲染至编辑界面
					post_data.citizenid = that.current_citizenid;
					jiazhengApi.requestServer(post_end_point, post_data, function(res){
						console.log('/openapi/JiazhenggongsiData/citizen_detail===>>>', res);
						
						that.name = res.data.detail.name;
						that.suoshudiqu = res.data.detail.suoshudiqu;
						that.address = res.data.detail.address;
						that.sex = res.data.detail.sex;
						that.birthday = res.data.detail.birthday;
						that.domicile = res.data.detail.domicile;
						that.wasreading_status = res.data.detail.wasreading_status;
						that.recipient_type = res.data.detail.recipient_type;  //受助人类型
						if(res.data.detail.recipient_type == '未选择'){
							that.recipient_type = 0;
						};
						if(res.data.detail.recipient_type == '智力'){
							that.recipient_type = 1;
						};
						if(res.data.detail.recipient_type == '肢体'){
							that.recipient_type == 2;
						};
						if(res.data.detail.recipient_type == '精神'){
							that.recipient_type = 3;
						};
						if(res.data.detail.recipient_type == '听力'){
							that.recipient_type = 4;
						};
						if(res.data.detail.recipient_type == '视力'){
							that.recipient_type = 5;
						};
						if(res.data.detail.recipient_type == '渐冻'){
							that.recipient_type = 6;
						};
						that.mobile = res.data.detail.mobile;
						that.nation = res.data.detail.nation;
						that.identity_card = res.data.detail.identity_card;
						that.education = res.data.detail.education;
						that.injured_time = res.data.detail.injured_time;
					});
				}
				
				
			
			},
			
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
				
				//判断必填项是否符合
				if(!regExp.test(formdata.mobile)){
					uni.showToast({
						title:'手机号码有误！',
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
				
				if(formdata.name == '' || formdata.birthday == '' || formdata.sex== ''){
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

				var post_end_point = '/openapi/JiazhenggongsiData/citizen_edit';
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
				post_data.suoshudiqu = formdata.suoshudiqu;
				post_data.address = formdata.address;
				post_data.mobile = formdata.mobile;
				post_data.domicile = formdata.domicile;
				post_data.identity_card = formdata.identity_card;
				post_data.nation = formdata.nation;
				post_data.birthday = formdata.birthday;
				post_data.recipient_type = formdata.recipient_type;
				if(formdata.recipient_type == 0){
					post_data.recipient_type = '未选择';
				};
				if(formdata.recipient_type == 1){
					post_data.recipient_type = '智力';
				};
				if(formdata.recipient_type == 2){
					post_data.recipient_type = '肢体';
				};
				if(formdata.recipient_type == 3){
					post_data.recipient_type = '精神';
				};
				if(formdata.recipient_type == 4){
					post_data.recipient_type = '听力';
				};
				if(formdata.recipient_type == 5){
					post_data.recipient_type = '视力';
				};
				if(formdata.recipient_type == 6){
					post_data.recipient_type = '渐冻';
				};
				post_data.renhu_status = formdata.renhu_status;
				
				post_data.culture_status = formdata.culture_status;
				post_data.injured_time = formdata.injured_time;
				post_data.sex = formdata.sex;
				post_data.wasreading_status = formdata.wasreading_status;
				post_data.guardian_status = formdata.guardian_status;
				post_data.remark = formdata.remark;
				post_data.political_status = formdata.political_status;
				post_data.special_line = formdata.special_line;
				post_data.mobile = formdata.mobile;
				post_data.zg_adminid = formdata.zg_adminid;
				
				
				
				jiazhengApi.requestServer(post_end_point, post_data, function(res){
					console.log('/openapi/JiazhenggongsiData/citizen_detail===>>>', res.data);
					
					
					uni.showModal({
						title:'提示',
						content:'添加成功',
						showCancel:false,
						success:function(res001){
							console.log('sifjsiofdngjdngv',res001)
							if(res.data && (res.data.code = 1)){
								console.log('ndsvjk11111111111',res001);
								
								that.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/citizen_list');

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
			bind_registered_Change: function(e) {
			    console.log('bind_culture_Change发送选择改变，携带值为', e.detail.value)
			    this.registered_index = e.detail.value
			},
			
			bindPickerChange: function(e) {
			    console.log('bind_culture_Change发送选择改变，携带值为', e.detail.value)
			    this.index = e.detail.value
			},
			
			bind_specialty_Change: function(e) {
			    console.log('bind_culture_Change发送选择改变，携带值为', e.detail.value)
			    this.specialty_index = e.detail.value
			},
			
			bind_culture_Change: function(e) {
			    console.log('bind_culture_Change发送选择改变，携带值为', e.detail.value)
			    this.culture_index = e.detail.value
			},
			
			bind_politics_Change: function(e) {
			    console.log('bind_politics_Change发送选择改变，携带值为', e.detail.value)
			    this.politics_index = e.detail.value
			},
			
			bind_mold_Change: function(e) {
			    console.log('bindPickerChange发送选择改变，携带值为', e.detail.value)
			    this.mold_index = e.detail.value
			},
			
			bind_end_time: function(e) {
			    this.service_end_time = e.detail.value
			},
			
			bind_start_time: function(e) {
			    this.service_start_time = e.detail.value
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
			
		},
	}
</script>

<style>
	@import 'static/css/jiazhenggongsi_forms.css'
</style>