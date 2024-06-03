<template>
	<form @submit="formsubmit">
		<view class="type_page">
			
				<view>
					<view style="border-bottom: 1rpx solid #D7D7D7; padding-bottom: 20rpx;">
						<view  style="margin-top: 20rpx;font-size: 40rpx;font-weight: bold;">添加管理员</view>
					</view>
				</view>
			<view style="width: 100%; height: 500rpx; background-color: #fff;border-radius: 20upx;margin-bottom: 20rpx;margin-top: 20rpx;">	
				<view>
					<view class="forms">
						<view class="forms_text">*登录账号</view>
						<input name="account" type="text" placeholder="请输入登录账号" :value="account"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">*手机号</view>
						<input name="zg_mobile" type="text" placeholder="请输入手机号" :value="zg_mobile"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text">*密码</view>
						<input name="password" type="text" placeholder="请输入密码" :value="password"/>
					</view>
				</view>
				<view>
					<view class="forms">
						<view class="forms_text" >*角色分组</view>
							<view class="picker">
								 <picker  mode="selector" @change="PickerGroup" :value="groupData.groupid" :range="group_list">
									<view class="picker">
										{{group_list[groupData.groupid]}}
									</view>
								 </picker>
						</view>
					</view>
				</view>
				<view>
					<view class="forms" style="margin-bottom: 70rpx;">
						<view class="forms_text">*状态</view>
						<view style="transform: scale(0.9); float: right;margin-top: 40rpx;">
							<radio-group name="status">
								<radio value="1" style="margin-right: 30rpx;" :checked="status==1">启用</radio>
								<radio value="2" :checked="status==2">不启用</radio>
							</radio-group>
						</view>
					</view>
				</view>
			</view>
			<view>
				<button style="width: 100%; height: 100rpx; background-color: red; color: white;"
				form-type="submit"
				>保存</button>
			</view>
		</view>
	</form>
	
</template>

<script>
	
	import jiazhengApi from './common/abotapiJiazhenggongsi.js';
	export default{
		data(){
			return{
				group_list:[],
				group_listid:[],
				groupData:{
					groupid:0,
					group_name:"",
				},
				
				// group_list: [{
				// 	groupid: 0,
				// 	group_name: "",
				// }],
				modalName: null,
				//商城的Logo、导航栏背景颜色和文字颜色
				wxa_shop_operation_logo_url:'',
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				
				
				current_adminid:0,
				
				account:'',
				zg_mobile:'',
				password:'',
				status:'',
				current_group_name:'',
				current_groupid:0,
				
				
				
			}
			
		},
		onLoad: function(options) {
			var that = this;
			
			console.log('aaaadddddd',options)
			if(options.adminid){
				this.current_adminid = options.adminid;
				// this.current_groupid = options.groupid;
				// this.current_group_name = options.group_name; 
			}
			
			this.group_list_list = [];
			
			jiazhengApi.check_user_login();
			jiazhengApi.get_current_adminuserid(options, that);
			
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
				
				console.log('aaaaaaaaaaaa',that.current_adminid)

				
				if(that.current_adminid){
					
					var that = this;
					
					//判断是否登录
					var userInfo = that.abotapi.get_user_info();
					if(!userInfo || !userInfo.userid || !userInfo.checkstr){
						that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
					}
					
					var post_end_point = '/openapi/JiazhenggongsiData/admin_detail';
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
					post_data.adminid = that.current_adminid;
					
					jiazhengApi.requestServer(post_end_point, post_data, function(res){
						console.log('/openapi/JiazhenggongsiData/admin_detail===>>>', res);
						
						that.account = res.data.detail.account;
						that.zg_mobile = res.data.detail.zg_mobile;
						that.password = res.data.detail.password;
						that.status = res.data.detail.status;
					});
					
				}
				
				//获取分组列表的分组名称
				that._group_list();
			},
			
			_group_list: function() {
					var that = this;
					
					//判断是否登录
					var userInfo = that.abotapi.get_user_info();
					if(!userInfo || !userInfo.userid || !userInfo.checkstr){
						that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
					}
					
					var post_end_point = '/openapi/JiazhenggongsiData/group_list';
					var post_data = {
						sellerid: that.abotapi.get_sellerid(),
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
						adminuserid: that.current_adminuserid,
					};
					
					jiazhengApi.requestServer(post_end_point, post_data, function(res){
						console.log('/openapi/JiazhenggongsiData/group_list===>>>', res);
						// that.group_list_list = res.data.group_list;
						that.group_name = res.data.giroup_list[i].group_name;
						that.groupid = res.data.group_listi[i].groupid;
					});
							
				
			},
				
			//提交表单
			formsubmit: function(e) {
				var that = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value;
				console.log('formdata====>>>>',formdata);
				
				//登录账号正则表达式，4到16位（字母，数字）
				var bank = /^[a-zA-Z0-9]{4,16}$/;
				
				//手机号正则表达式
				var regExp = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
				
			
				if(!bank.test(formdata.account)){
					uni.showToast({
						title:'账号有误！4到16位（字母，数字）',
						icon:'error',
						duration:1500,
					});
					return;
				}
				if(!regExp.test(formdata.zg_mobile)){
					uni.showToast({
						title:'手机号有误！',
						icon:'error',
						duration:1500,
					});
					return;
				}
				if(formdata.password ==''){
					uni.showToast({
						title:'请输入必填项！',
						icon:'error',
						duration:1500,
					});
				}
				
				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if(!userInfo || !userInfo.userid || !userInfo.checkstr){
					that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
				}
				
				
				var post_end_point = '/openapi/JiazhenggongsiData/admin_edit';
				var post_data = {
					sellerid: that.abotapi.get_sellerid(),
					checkstr: userInfo.checkstr,
					userid: userInfo.userid,
					adminuserid: that.current_adminuserid,
				};
				
				//如果是编辑记录
				if(that.current_adminid){
					post_data.adminid = that.current_adminid;   
					
				}
				
				post_data.account = formdata.account;
				post_data.zg_mobile = formdata.zg_mobile;
				post_data.password = formdata.password;
				post_data.status = formdata.status;
				
				
				jiazhengApi.requestServer(post_end_point, post_data, function(res){
					console.log('/openapi/JiazhenggongsiData/admin_detail===>>>', res);
					
					
					uni.showModal({
						title:'提示',
						content:'保存成功',
						showCancel:false,
						success:function(res001){    
							console.log('sifjsiofdngjdngv',res001)
							if(res.data && (res.data.code = 1)){
								console.log('ndsvjk11111111111');
								
								that.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/admin_list');
							
							}
							else{
				
							}
							
							
						}
					});
						
				});
			},
			
			PickerGroup: function(e) {
			    console.log('PickerGroup发送选择改变，携带值为', e.detail.value)
			    this.groupid = e.detail.value
			},
			// confirm() {
			// 	var that = this;
			//     let data = this.group_list
			 
			// },
		},
	}
</script>

<style>
	@import 'static/css/jiazhenggongsi_forms.css'
</style>