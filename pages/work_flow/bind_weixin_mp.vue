<template>
	<view class="">
		
		<view class="bind_text">
			<u--text
			text="复制绑定编号,在公众号中输入"
			align="center"
			></u--text>
			<view class="account_style_text" 
				style="padding: 20rpx; border: 2rpx dotted red; border-radius: 10rpx; margin: 30rpx;background-color: bisque;">
				<u--text
				bold="true"
				align="center"
				:text="account_bind"
				>
				</u--text>
			</view>
			<view class="account_style_button" style="padding: 20rpx;" >
				<u-button
				type="success" 
				size="small"
				text="复制绑定编号"
				@click="user_account_copy(account_bind)"
				></u-button>
			</view>
		</view>
		
			
		
		<view class="picture_style">
			<u--text
			text="教程图片"
			>
			</u--text>
			<view class="picture_style_center" style="width:100%; margin: 0 auto;">
				<u--image :showLoading="true" :src="tutor_src_image"  @click="preview_picture(tutor_src_image)"></u--image>
			</view>
			
		</view>
	</view>
</template>
<script>
	import work_flow_api from './common/work_flow_api.js'
	import './static/css/work_flow.css'
	
	
export default {
        data() {
          return {
			current_ticket_number:null,
			current_ticket_model_number:null,
			account_bind:[
			
			],  
			tutor_src_image:'',
				  
			}
        }, 
		onLoad(option) {
			//请求一个接口
			console.log("option ===>>> ",option)
			
			var that = this;
			
			this.current_ticket_number = option.ticket_number;
			this.current_ticket_model_number = option.ticket_model_number;
			
			work_flow_api.check_user_login((app_token)=>{
				if(!app_token){
					console.log('获取用户的登录token失败');
					return;
				}
				
				var user_token = app_token.token;
				
				that.current_user_token = user_token;
				
				//请求用户user的列表
				var post_data = {
					token: user_token,
					
				}
				
				
				work_flow_api.abotRequest({
					url:  work_flow_api.work_flow_server + '/?g=API&m=Index&a=wxapp',
					 data: post_data,
					method: "POST",
					success:(res) =>{
						
						console.log('res--->>>', res)
						
						that.account_bind = res.data.data.bind_weixin_mp_code;
						
						console.log('that.account_bind.member_wxapp--->>>', that.account_bind)
						
						that.tutor_src_image = res.data.data.manual_image;
					}
					
					
				});
				
			})
			
			
		},
		methods: {
			//复制文本
		   user_account_copy(item){
			   
			   uni.setClipboardData({
				   data:item,
				   success: () => {
				   	uni.showToast({
				   		title:'已复制'
				   	})
				   }
				  
				   
			   })
			   
			   
		   },
		   //预览图片
		   preview_picture(image){
			   console.log('image--->>>', image)
			   uni.previewImage({
			            urls: [image], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
			            current: '', // 当前显示图片的http链接，默认是第一个
			            success: function(res) {},
			            fail: function(res) {},
			            complete: function(res) {},
			        })
		   }
		   
		   
	   }
  	}
</script>
<style lang="scss">
	.bind_text{
		background-color: #FFFFFF; /* 背景色 */
		border: 1rpx solid  #DDDDDD; /* 边框宽度、样式和颜色 */
		border-radius: 16rpx; /* 可选：圆角边框 */
		padding: 20rpx; /* 内边距 */
		margin: 20rpx; /* 外边距 */
	}

	.picture_style{
		background-color: #FFFFFF; /* 背景色 */
		border: 1rpx solid  #DDDDDD; /* 边框宽度、样式和颜色 */
		border-radius: 16rpx; /* 可选：圆角边框 */
		padding: 20rpx; /* 内边距 */
		margin: 20rpx; /* 外边距 */
	}
	.picture_style_center{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%; /* 使容器的高度等于视口的高度，或者根据需要设置 */
	}
</style>