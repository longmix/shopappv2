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
			    <span>主播昵称 :</span>
			    <input id="name" type="text" name="name" v-model="liver" class="error" placeholder="请输入主播昵称" style="height: 60rpx;"/>
			    
			</label>
		</view>
		
		
		<view class="error-msg">
			<label>
			    <span>观看人数 :</span>
			    <input id="name" type="text" name="name" v-model="liveNO" class="error" placeholder="请输入直播间人数" style="height: 60rpx;"/>
			    
			</label>
		</view>
	  
		<view class="error-msg">
			<label>
			    <span>直播间名称 :</span>
			    <input id="name" type="text" name="name" v-model="livename" class="error" placeholder="请输入直播间名称" style="height: 60rpx;"/>
			    
			</label>
		</view>

		<view class="error-msg">
			<label>
			    <span>开始时间 :</span>
			    <input id="starttime" type="text" value="" v-model="starttime" name="starttime" placeholder="请输入开始时间" style="height: 60rpx;"/>
			    
			</label>
		</view>

		<view class="error-msg">
			<label>
			    <span>结束时间 :</span>
			    <input id="endtime" type="text" value="" v-model="endtime" name="endtime" placeholder="请输入结束时间" style="height: 60rpx;"/>
			    
			</label>
		</view>
	
	  
		<view class="error-msg">
			<label>
			    <span>直播间简介 :</span>
			    <textarea id="message" name="message" v-model="livemessage" placeholder="请输入直播间简介"></textarea>
			</label>
		</view>
		         <view class="goods_list">
					 请选择商品
				 </view>
				 
		<view class="goods"  style="" v-for="(item,index) in recommend_product_list" :key="index" @click="live_goods($event)" :data-productid="item.productid">
				<label>
					<image :src="item.picture" style="width: 200rpx;" mode="widthFix"></image>
					<checkbox value="" style="    text-align: center;margin-left: 40px;margin-top: 10px;"/>
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
				livename:'',
				starttime:'',
				endtime:'',
				livemessage:'',
				liver:'',
				liveNO:'',
				productid:'',
				recommend_product_list:'',
				productid_str: []
			}
		},
		onLoad(option){
				this.live_goods_lists();
		},
		methods:{
			
				bt_live_data:function(){
					var value2_json_str = {
						'livename': this.livename,
						'starttime':this.starttime,
						'endtime':this.endtime,
						'livemessage':this.livemessage,
						'liver':this.liver,
						'liveNo':this.liveNO,
						'productid_str':this.productid_str.join(","),
						}
						
						
						var that = this
						var userInfo = this.abotapi.get_user_info();
						this.abotapi.abotRequest({
							url:that.abotapi.globalData.yanyubao_server_url+'index.php/openapi/VideoLiveData/set_plan_video_live',
							method:'POST',
							data:{
								userid:userInfo.userid,
								sellerid:this.abotapi.globalData.default_sellerid,
								checkstr:userInfo.checkstr,
								type:0,
								value2_json_str: JSON.stringify(value2_json_str),
							},
							success(res){
								console.log("aaaaa111",res)
								
							},
							fail(error){
								console.log("ccccccc====",error)
							}
							
							
						})
						
					
							
							
							
						
						
			},
			
				//推荐商品接口
				live_goods_lists:function(){
					var that = this;
					var userInfo = this.abotapi.get_user_info();
					
					this.abotapi.abotRequest({
						url:that.abotapi.globalData.yanyubao_server_url+'Yanyubao/ShopApp/product_list',
						method:'post',
						data:{
							sellerid:that.abotapi.globalData.default_sellerid,
							//is_recommend:1,
							page_num:6,
						},
						success(res){
							console.log('11111111===',res)
							
							var recommend_product_list = res.data.product_list;
							that.recommend_product_list = recommend_product_list;
							
							
							},
							fail(error){
								console.log("fffffff====",error)
							}
							
						})
				},
			
				
				
				
				live_message:function(){
					
					console.log('ddd');
					
				
			},
				live_goods:function(e){
					
					var	productid = e.currentTarget.dataset.productid;
					
					 console.log('aaaaaaaa11111',productid);

						
						var index = this.productid_str.indexOf(productid);
						
						if(index != -1){	
							console.log('ssss')
							 this.productid_str.splice(index,1);
						}else{
							console.log('ssss222')
							this.productid_str.push(productid);
						}
						
					 
					  console.log('aaaaaaaa2222',this.productid_str);
				    	 
				
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
	.goods{
		margin: 20rpx 0 20rpx 0;
		align-items: center;
		display: flex; 
		width: 33%;
		float: left;
	}
	.goods image{
		border-radius: 15rpx;
	}
	.goods_list{
		text-align: center;
		margin-top: 20rpx;
		font-size: 35rpx;
	}
</style>
