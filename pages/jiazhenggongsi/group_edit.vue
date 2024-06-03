<template>
	<form @submit="formsubmit">
		<view class="type_page">
			<view style="background-color: #ffffff;width: 100%;border-radius: 20upx;height: 300rpx;margin-bottom: 20rpx;margin-top: 20rpx;">
				<view>
					<view class="forms">
						<view class="forms_text">*角色名称</view>
						<input name="group_name" type="text" placeholder="请输入角色名称" :value="group_name"/>
					</view>
				</view>
				
				<view>
					<view class="forms">
						<view class="forms_text">角色状态</view>
						<view class="picker" style="transform: scale(0.9);">
							<radio-group name="status">
								<radio value="1" style="margin-right: 0rpx;" :checked="status==1">启用</radio>
								<radio value="2" :checked="status==2">禁用</radio>
							</radio-group>
						</view>
					</view>
				</view>
				<view>
					<view class="forms"  style="margin-bottom: 70rpx;">
						<view class="forms_text">*备注</view>
						<input name="remark" type="text" placeholder="请输入备注*" :value="remark"/>
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
				//商城的Logo、导航栏背景颜色和文字颜色
				wxa_shop_operation_logo_url:'',
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				
				current_groupid:0,
				group_name:'',
				status:'',
				remark:'',
			}
		},
		
		onLoad: function(options) {
			var that = this;
			
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
					
					// 判断是否有实体商家对应的身份的userid
					if(that._current_adminuserid > 0){
						post_data.adminuserid = that._current_adminuserid;
					}
					
					
					post_data.groupid = that.current_groupid;
					
					jiazhengApi.requestServer(post_end_point, post_data, function(res){
						console.log('/openapi/JiazhenggongsiData/power_detail===>>>', res);
						
						that.group_name = res.data.detail.group_name;
						that.remark = res.data.detail.remark;
						that.status = res.data.detail.status;
					});
				}
			},
			//提交表单
			formsubmit: function(e) {
				var that = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value;
				console.log('formdata====>>>>',formdata);
				
				if(formdata.group_name == '' || formdata.status == '' || formdata.remark ==''){
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
				
				post_data.group_name = formdata.group_name;
				post_data.remark = formdata.remark;
				post_data.status = formdata.status;
				
				jiazhengApi.requestServer(post_end_point, post_data, function(res){
					console.log('/openapi/JiazhenggongsiData/power_detail===>>>', res);
					
					
					uni.showModal({
						title:'提示',
						content:'添加成功',
						showCancel:false,
						success:function(res001){
							console.log('sifjsiofdngjdngv',res001)
							if(res.data && (res.data.code = 1)){
								console.log('ndsvjk11111111111');
								
								that.abotapi.call_h5browser_or_other_goto_url('/pages/jiazhenggongsi/group_list');
							
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
			}
		},
	}
</script>

<style>
	@import 'static/css/jiazhenggongsi_forms.css'
</style>