<template>
	
	<form>
	    <view class="head"><h1>请填写直播信息</h1></view>
	  
		<view class="head-img">
			<view >
				<image src="../../static/img/noorder.png"></image>
			</view>
		</view>
	  
		<view class="error-msg">
			<label>
			    <span>直播间名称 :</span>
			    <input id="name" type="text" name="name" class="error" placeholder="请输入直播间名称" style="height: 60rpx;"/>
			    
			</label>
		</view>

		<view class="error-msg">
			<label>
			    <span>开始时间 :</span>
			    <input id="starttime" type="text" value="" name="starttime" placeholder="请输入开始时间" style="height: 60rpx;"/>
			    
			</label>
		</view>

		<view class="error-msg">
			<label>
			    <span>结束时间 :</span>
			    <input id="endtime" type="text" value="" name="endtime" placeholder="请输入结束时间" style="height: 60rpx;"/>
			    
			</label>
		</view>
	
	  
		<view class="error-msg">
			<label>
			    <span>直播间简介 :</span>
			    <textarea id="message" name="message"  placeholder="请输入直播间简介"></textarea>
			</label>
		</view>
		
	   <view class="success-msg">
			<label>
			    <span>&nbsp;</span>
			<button type="submit" class="button" value="提交" @click="bt_live_data">提交</button>
			</label>
		</view>
	   
	</form>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		onLoad(option){
		
		},
		methods:{
			
				bt_live_data:function(){
					var userInfo = this.abotapi.get_user_info();
					var that = this
					this.abotapi.abotRequest({
						url:that.abotapi.globalData.yanyubao_server_url+'index.php/openapi/VideoLiveData/set_plan_video_live',
						method:'POST',
						data:{
							sellerid:this.abotapi.globalData.default_sellerid,
							checkstr:userInfo.checkstr,
							type:0,
							value2_json_str:"",
						},
						success(res){
							console.log("aaaaa111",res)
							
						},
						fail(error){
							console.log("ccccccc====",error)
						}
						
						
					})
				},
				
				
			
				
				
				
				live_message:function(){
					
					console.log('ddd');
					
				
			}
		}
	}
	
</script>

<style>
	.head{
		background-color: #9DC45F;
		color: #FFF;
		width: 100%;
		height: 150rpx;
		border-radius: 4px;
	}
	.head h1{
		font-size: 50rpx;
		padding: 30rpx 30rpx;
		font: 50rpx"Trebuchet MS", Arial, Helvetica, sans-serif;
	}
	.error-msg{
		margin-top: 15rpx;
		margin-left: 40rpx;
		font-size: 30rpx;
	}
	.error-msg span{
		font-size: 30rpx;
		color: #666666;
	}
/* 	.error-msg input{
		border-bottom: 1px solid #E5E5E5;
		width: 90%;
	} */
	.error-msg input{
		border: 3rpx  solid #E5E5E5 ;
		line-height: 55rpx;
		width: 90%;
		border-radius: 10rpx;
	}
	.error-msg textarea{
		border: 1px solid #E5E5E5;
		padding: 0 15rpx;
		border-radius: 10rpx;
	}
	button{
		    width: 80%;
		    margin-top: 25px;
			margin-bottom: 50px;
			background-color: #06ad56;
			border-color: #06ad56;
			color: #fff;
	}
	.head-img{
		width: 100%;
		text-align: center;
		margin-top: 15rpx;
	}
	.head-img image{
		width: 80%;
		border-radius: 25rpx;
	}
</style>
