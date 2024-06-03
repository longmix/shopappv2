<template>
	<view class="content">
		
		<!-- 对象 -->
		
		<view class="content-danshen" v-if="iconid == 10016">
			<!-- 头部样式 -->
			<view class="amount_money" style="background-color: #2D96FF;">
				
				<view style="float:right; padding-top: 30rpx;">
					<button class="yuelao"  type="default" plain="true" style="border: 4rpx solid  #2D96FF; color: #2D96FF; font-weight: bold;">申请月老</button>
				</view>
				<view style="display: flex; padding-top: 20rpx;">
					<view style="width: 25%;">
						<view  style="font-size: 20px; color: aliceblue; font-weight: bold;">推荐</view>
					</view>
					<view style="width: 25%;">
						<view @tap="tuijian" style="font-size: 20px; color: #d9d9d9;font-weight: bold;">找对象</view>
					</view>
				</view>
				
			</view>
			
			<!-- 局部样式 -->
			<view  class="amount_local">
				<view style="float: right;margin: 30rpx;">
					<button @tap="xiaoxi" v-if="!changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">打招呼</button>
					<button @tap="fasong_xiaoxi"  v-if="changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">发消息</button>
				</view>
				
				<!-- 头像 -->
				<view style="display: flex;">
					<view class="dailiren_xinxi" >
						<image  src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/yuangong04.jpeg" style="" class="daili_image" ></image>	
					</view>
					<view class="amount_mingcherng" style="margin: 20rpx;">
						<view style="display: flex;">
							<view style="font-size:30rpx;">叶雨轩</view>
							<view style="background-color: coral;border-radius: 20rpx;font-size: 25rpx;margin-left: 10rpx;">已认证</view>
						</view> 
						<view style="display:flex;margin-top: 10rpx;">
							<view style="font-size: 24rpx;">20岁</view>
							<view style="font-size: 24rpx; margin-left: 10rpx;">男</view>
						</view>
						<view style="display: flex;margin-top: 10rpx;">
							<view style="font-size: 24rpx; color: #55aaff;">你好啊，交个朋友吧</view> 
						</view>
					</view>
				</view>
				
				
				
			</view>
			<view style="background-color: #d9d9d9;width: 100%;height: 2rpx;"></view>
			
			<view  class="amount_local">
				<view style="float: right;margin: 30rpx;">
					<button @tap="xiaoxi" v-if="!changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">打招呼</button>
					<button @tap="fasong_xiaoxi"    v-if="changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">发消息</button>
				</view>
				
				<!-- 头像 -->
				<view style="display: flex;">
					<view class="dailiren_xinxi" >
						<image  src="https://yanyubao.tseo.cn/Tpl/static/images/a20.jpeg" style="" class="daili_image" ></image>	
					</view>
					<view class="amount_mingcherng" style="margin: 20rpx;">
						<view style="display: flex;">
							<view style="font-size:30rpx;">李梓涵</view>
							<view style="background-color: coral;border-radius: 20rpx;font-size: 25rpx;margin-left: 10rpx;">已认证</view>
						</view> 
						<view style="display:flex;margin-top: 10rpx;">
							<view style="font-size: 24rpx;">22岁</view>
							<view style="font-size: 24rpx; margin-left: 10rpx;">女</view>
						</view>
						<view style="display: flex;margin-top: 10rpx;">
							<view style="font-size: 24rpx; color: #55aaff;">cpdd</view> 
						</view>
					</view>
				</view>
			</view>
			<view style="background-color: #d9d9d9;width: 100%;height: 2rpx;"></view>
			<view  class="amount_local">
				<view style="float: right;margin: 30rpx;">
					<button @tap="xiaoxi" v-if="!changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">打招呼</button>
					<button @tap="fasong_xiaoxi"    v-if="changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">发消息</button>
				</view>
				
				<!-- 头像 -->
				<view style="display: flex;">
					<view class="dailiren_xinxi" >
						<image  src="https://yanyubao.tseo.cn/Tpl/static/images/a05.jpeg" style="" class="daili_image" ></image>	
					</view>
					<view class="amount_mingcherng" style="margin: 20rpx;">
						<view style="display: flex;">
							<view style="font-size:30rpx;">叶芸芸</view>
							<view style="background-color: coral;border-radius: 20rpx;font-size: 25rpx;margin-left: 10rpx;">已认证</view>
						</view> 
						<view style="display:flex;margin-top: 10rpx;">
							<view style="font-size: 24rpx;">21岁</view>
							<view style="font-size: 24rpx; margin-left: 10rpx;">女</view>
						</view>
						<view style="display: flex;margin-top: 10rpx;">
							<view style="font-size: 24rpx; color: #55aaff;">一起看电影</view> 
						</view>
					</view>
				</view>
			</view>
			<view style="background-color: #d9d9d9;width: 100%;height: 2rpx;"></view>
			
			<view  class="amount_local">
				<view style="float: right;margin: 30rpx;">
					<button @tap="xiaoxi" v-if="!changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">打招呼</button>
					<button  @tap="fasong_xiaoxi"   v-if="changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">发消息</button>
				</view>
				
				<!-- 头像 -->
				<view style="display: flex;">
					<view class="dailiren_xinxi" >
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/3.jpg" style="" class="daili_image" ></image>	
					</view>
					<view class="amount_mingcherng" style="margin: 20rpx;">
						<view style="display: flex;">
							<view style="font-size:30rpx;">李羽南</view>
							<view style="background-color: coral;border-radius: 20rpx;font-size: 25rpx;margin-left: 10rpx;">已认证</view>
						</view> 
						<view style="display:flex;margin-top: 10rpx;">
							<view style="font-size: 24rpx;">21岁</view>
							<view style="font-size: 24rpx; margin-left: 10rpx;">男</view>
						</view>
						<view style="display: flex;margin-top: 10rpx;">
							<view style="font-size: 24rpx; color: #55aaff;">一起看电影</view> 
						</view>
					</view>
				</view>
			</view>
			<view style="background-color: #adadad;width: 100%;height: 2rpx;"></view>
		</view>
		
		<!-- 医疗 -->
		
		<view class="content-danshen" v-if="iconid == 10018">
			<!-- 头部样式 -->
			<view class="amount_money" style="background-color: #2D96FF;">
				
				<view style="float:right; padding-top: 30rpx;">
					<button class="yuelao"  type="default" plain="true" style="border: 4rpx solid #2D96FF; color: #2D96FF; font-weight: bold;">申请月老</button>
				</view>
				<view style="display: flex; padding-top: 20rpx;">
					<view style="width: 25%;">
						<view style="font-size: 20px; color: aliceblue; font-weight: bold;">推荐</view>
					</view>
					<view style="width: 25%;">
						<view  @tap="tuijian" style="font-size: 20px; color: #d9d9d9;font-weight: bold;">找医生</view>
					</view>
				</view>
				
			</view>
			
			<!-- 局部样式 -->
			<view  class="amount_local">
				<view style="float: right;margin: 30rpx;">
					<button @tap="xiaoxi" v-if="!changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">打招呼</button>
					<button @tap="fasong_xiaoxi"  v-if="changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">发消息</button>
				</view>
				
				<!-- 头像 -->
				<view style="display: flex;">
					<view class="dailiren_xinxi" >
						<image  src="https://yanyubao.tseo.cn/Tpl/static/images/bigbeimei.jpg" style="" class="daili_image" ></image>	
					</view>
					<view class="amount_mingcherng" style="margin: 20rpx;">
						<view style="display: flex;">
							<view style="font-size:30rpx;">延安</view>
							<view style="background-color: coral;border-radius: 20rpx;font-size: 25rpx;margin-left: 10rpx;">已认证</view>
						</view> 
						<view style="display:flex;margin-top: 10rpx;">
							<view style="font-size: 20rpx;">30岁</view>
							<view style="font-size: 20rpx; margin-left: 10rpx;">12km</view>
						</view>
						<view style="display: flex;margin-top: 10rpx;">
							<view style="font-size: 20rpx; color: #2D96FF;">骨科</view> 
						</view>
					</view>
				</view>
				
				
			</view>
			<view style="background-color: #d9d9d9;width: 100%;height: 2rpx;"></view>
			
			<view  class="amount_local">
				<view style="float: right;margin: 30rpx;">
					<button @tap="xiaoxi" v-if="!changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">打招呼</button>
					<button @tap="fasong_xiaoxi"    v-if="changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">发消息</button>
				</view>
				
				<!-- 头像 -->
				<view style="display: flex;">
					<view class="dailiren_xinxi" >
						<image  src="https://yanyubao.tseo.cn/Tpl/static/images/ciq04.jpg" style="" class="daili_image" ></image>	
					</view>
					<view class="amount_mingcherng" style="margin: 20rpx;">
						<view style="display: flex;">
							<view style="font-size:30rpx;">李薇</view>
							<view style="background-color: coral;border-radius: 20rpx;font-size: 25rpx;margin-left: 10rpx;">已认证</view>
						</view> 
						<view style="display:flex;margin-top: 10rpx;">
							<view style="font-size: 20rpx;">42岁</view>
							<view style="font-size: 20rpx; margin-left: 10rpx;">12km</view>
						</view>
						<view style="display: flex;margin-top: 10rpx;">
							<view style="font-size: 20rpx; color: #2D96FF;">妇产科</view> 
						</view>
					</view>
				</view>
			</view>
			<view style="background-color: #d9d9d9;width: 100%;height: 2rpx;"></view>
			<view  class="amount_local">
				<view style="float: right;margin: 30rpx;">
					<button @tap="xiaoxi" v-if="!changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">打招呼</button>
					<button @tap="fasong_xiaoxi"    v-if="changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">发消息</button>
				</view>
				
				<!-- 头像 -->
				<view style="display: flex;">
					<view class="dailiren_xinxi" >
						<image  src="https://yanyubao.tseo.cn/Tpl/static/images/ciqi01.jpg" style="" class="daili_image" ></image>	
					</view>
					<view class="amount_mingcherng" style="margin: 20rpx;">
						<view style="display: flex;">
							<view style="font-size:30rpx;">益安宁</view>
							<view style="background-color: coral;border-radius: 20rpx;font-size: 25rpx;margin-left: 10rpx;">已认证</view>
						</view> 
						<view style="display:flex;margin-top: 10rpx;">
							<view style="font-size: 20rpx;">32岁</view>
							<view style="font-size: 20rpx; margin-left: 10rpx;">12km</view>
						</view>
						<view style="display: flex;margin-top: 10rpx;">
							<view style="font-size: 20rpx; color: #2D96FF;">外科</view> 
						</view>
					</view>
				</view>
			</view>
			<view style="background-color: #d9d9d9;width: 100%;height: 2rpx;"></view>
			
			
			
			<view  class="amount_local">
				<view style="float: right;margin: 30rpx;">
					<button @tap="xiaoxi" v-if="!changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">打招呼</button>
					<button  @tap="fasong_xiaoxi"   v-if="changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">发消息</button>
				</view>
				
				<!-- 头像 -->
				<view style="display: flex;">
					<view class="dailiren_xinxi" >
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/ciqi03.jpg" style="" class="daili_image" ></image>	
					</view>
					<view class="amount_mingcherng" style="margin: 20rpx;">
						<view style="display: flex;">
							<view style="font-size:30rpx;">天天</view>
							<view style="background-color: coral;border-radius: 20rpx;font-size: 25rpx;margin-left: 10rpx;">已认证</view>
						</view> 
						<view style="display:flex;margin-top: 10rpx;">
							<view style="font-size: 20rpx;">26岁</view>
							<view style="font-size: 20rpx; margin-left: 10rpx;">12km</view>
						</view>
						<view style="display: flex;margin-top: 10rpx;">
							<view style="font-size: 20rpx; color: #2D96FF;">儿科</view> 
						</view>
					</view>
				</view>
			</view>
			<view style="background-color: #adadad;width: 100%;height: 2rpx;"></view>
		</view>
		
		
		
		<!-- 律师 -->
		
		
		<view class="content-lvshi" v-if="iconid == 10017">
			<!-- 头部样式 -->
			<view class="amount_money" style="background-color: #2D96FF;">
				
				<view style="float:right; padding-top: 30rpx;">
					<button class="yuelao"  type="default" plain="true" style="border: 4rpx solid #2D96FF; color: #2D96FF; font-weight: bold;">申请月老</button>
				</view>
				<view style="display: flex; padding-top: 20rpx;">
					<view style="width: 25%;">
						<view style="font-size: 20px; color: aliceblue; font-weight: bold;">推荐</view>
					</view>
					<view style="width: 25%;">
						<view  @tap="tuijian" style="font-size: 20px; color:#d9d9d9;font-weight: bold;">找律师</view>
					</view>
				</view>
				
			</view>
			
			<!-- 局部样式 -->
			<view  class="amount_local">
				<view style="float: right;margin: 30rpx;">
					<button @tap="xiaoxi" v-if="!changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">打招呼</button>
					<button @tap="fasong_xiaoxi"  v-if="changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">发消息</button>
				</view>
				
				<!-- 头像 -->
				<view style="display: flex;">
					<view class="dailiren_xinxi" >
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/ciqi05.jpg" style="" class="daili_image" ></image>	
					</view>
					<view class="amount_mingcherng" style="margin: 20rpx;">
						<view style="display: flex;">
							<view style="font-size:30rpx;">李律师</view>
							<view style="background-color: coral;border-radius: 20rpx;font-size: 25rpx;margin-left: 10rpx;">已认证</view>
						</view> 
						<view style="display:flex;margin-top: 10rpx;">
							<view style="font-size: 24rpx;">30岁</view>
							<view style="font-size: 24rpx; margin-left: 10rpx;">12km</view>
						</view>
						<view style="display: flex;margin-top: 10rpx;">
							<view style="font-size: 24rpx; color: #2D96FF;">家庭纠纷</view> 
						</view>
					</view>
				</view>
				
				
			</view>
			<view style="background-color: #d9d9d9;width: 100%;height: 2rpx;"></view>
			
			<view  class="amount_local">
				<view style="float: right;margin: 30rpx;">
					<button @tap="xiaoxi" v-if="!changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">打招呼</button>
					<button @tap="fasong_xiaoxi"    v-if="changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">发消息</button>
				</view>
				
				<!-- 头像 -->
				<view style="display: flex;">
					<view class="dailiren_xinxi" >
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/ciqi06.jpg" style="" class="daili_image" ></image>	
					</view>
					<view class="amount_mingcherng" style="margin: 20rpx;">
						<view style="display: flex;">
							<view style="font-size:30rpx;">陈律师</view>
							<view style="background-color: coral;border-radius: 20rpx;font-size: 25rpx;margin-left: 10rpx;">已认证</view>
						</view> 
						<view style="display:flex;margin-top: 10rpx;">
							<view style="font-size: 24rpx;">28岁</view>
							<view style="font-size: 24rpx; margin-left: 10rpx;">12km</view>
						</view>
						<view style="display: flex;margin-top: 10rpx;">
							<view style="font-size: 24rpx; color: #2D96FF;">刑事纠纷</view> 
						</view>
					</view>
				</view>
			</view>
			<view style="background-color: #d9d9d9;width: 100%;height: 2rpx;"></view>
			<view  class="amount_local">
				<view style="float: right;margin: 30rpx;">
					<button @tap="xiaoxi" v-if="!changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">打招呼</button>
					<button @tap="fasong_xiaoxi"    v-if="changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">发消息</button>
				</view>
				
				<!-- 头像 -->
				<view style="display: flex;">
					<view class="dailiren_xinxi" >
						<image  src="https://yanyubao.tseo.cn/Tpl/static/images/ciqi07.jpg" style="" class="daili_image" ></image>	
					</view>
					<view class="amount_mingcherng" style="margin: 20rpx;">
						<view style="display: flex;">
							<view style="font-size:30rpx;">魏律师</view>
							<view style="background-color: coral;border-radius: 20rpx;font-size: 25rpx;margin-left: 10rpx;">已认证</view>
						</view> 
						<view style="display:flex;margin-top: 10rpx;">
							<view style="font-size: 24rpx;">40岁</view>
							<view style="font-size: 24rpx; margin-left: 10rpx;">12km</view>
						</view>
						<view style="display: flex;margin-top: 10rpx;">
							<view style="font-size: 24rpx; color: #2D96FF;">房产纠纷</view> 
						</view>
					</view>
				</view>
			</view>
			<view style="background-color: #d9d9d9;width: 100%;height: 2rpx;"></view>
			
			
			
			<view  class="amount_local">
				<view style="float: right;margin: 30rpx;">
					<button @tap="xiaoxi" v-if="!changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">打招呼</button>
					<button  @tap="fasong_xiaoxi"   v-if="changge_xiaoxi" class="amount_dazhaohu" type="default" plain="true" style="color: red;">发消息</button>
				</view>
				
				<!-- 头像 -->
				<view style="display: flex;">
					<view class="dailiren_xinxi" >
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/ciqi08.jpg" style="" class="daili_image" ></image>	
					</view>
					<view class="amount_mingcherng" style="margin: 20rpx;">
						<view style="display: flex;">
							<view style="font-size:30rpx;">苏律师</view>
							<view style="background-color: coral;border-radius: 20rpx;font-size: 25rpx;margin-left: 10rpx;">已认证</view>
						</view> 
						<view style="display:flex;margin-top: 10rpx;">
							<view style="font-size: 24rpx;">26岁</view>
							<view style="font-size: 24rpx; margin-left: 10rpx;">12km</view>
						</view>
						<view style="display: flex;margin-top: 10rpx;">
							<view style="font-size: 24rpx; color: #2D96FF;">法定继承纠纷</view> 
						</view>
					</view>
				</view>
			</view>
			<view style="background-color: #adadad;width: 100%;height: 2rpx;"></view>
		</view>
	</view>
</template>

<style>
	/* 头部样式 */
	.amount_money{
		width: 100%;
		height:100rpx;
		background-color: #ffffff;
		text-align: center;
		align-items: center;
	}
	.yuelao{
		/* width: 150rpx; */
		height: 50rpx; 
		line-height: 50rpx;
		border-radius:1.5rem; 
		font-size: 23rpx; 
	}
	
	.daili_image{
		border-radius: 50%;
		width: 120rpx;
		height: 120rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
	.amount_local{
		width: 100%;
		background-color: #ffffff;
	}
	.amount_dazhaohu{
		padding-left: 20rpx;    
		width: 150rpx;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 21rpx;
		background: linear-gradient(to bottom, 20%,70%);
		border-radius: 1.5rem;
		/* line-height:center; */
	}
	/* 认证 */
	.amount_renzheng {
		padding-left: 10rpx;
		color: #000000;
		height: 53rpx;
		font-size: 22rpx;
		background: orange;
		border-radius: 1.5rem;
	}
	
	.important_matters{
		border-bottom: 1rpx solid #f2f2f2;
		padding: 20rpx;
	}
	.liji_qianwang{
		border: 0.5px solid #EA5504;
		border-radius: 5px;
		background: #ea5504;
		font-size: 26rpx;
		color: #ffffff;
		padding-left: 10rpx;
		padding-right: 10rpx;
		
	}
	.important_liji_qianwang{
		float: right;
		margin-top: -4rpx;
	}
	.daohang_pic_text{
		width: 33%;
		margin-bottom: 30rpx;
	}
	.daohang_image{
		display: flex;
		justify-content: center;
		margin-bottom: 10rpx;
	}
	.daohang_text{
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 26rpx;
		color: #3d3d3d;
	}
	.daili_shenfen{
		color: #FBB03B;
		background-color: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;
		width: fit-content;
		font-size: 20rpx;
		padding: 4rpx 20rpx;
	}
	.image_daixia{
		width: 40rpx;
		height: 40rpx;
	}
	.tui_jian :active{
		background-color: #000000;
	}
</style>

<script>
export default {	
	data() {
		return {
			user_info:'',
			fenxiao_info:'',
			current_page:1,
			current_daili_fenrun_list:null,
			
			
			changge_xiaoxi:false,
			
			current_iconid:0,
			iconid:0,
		}
	},
	onLoad:function(options)  {
		var that = this;
		uni.setNavigationBarTitle({
			title:'推荐对象'
		})
		
		if(options.iconid){
			this.current_iconid = options.iconid;
		}
		
		
		console.log('55555=====>>>',options)
		
		
		if(options == 10016){
			iconid == 10016;
			// uni.setNavigationBarTitle({
			// 	title:'主播列表' 
			// })
		}
		if(options == 10017){
			iconid == 10017;
			// uni.setNavigationBarTitle({
			// 	title:'律师列表' 
			// })
		}
		if(options == 10018){
			iconid == 10018;
			// uni.setNavigationBarTitle({
			// 	title:'医生列表' 
			// })
		}
		
		
	
		that.user_info = {};
		that.current_daili_fenrun_list = {};
		that.user_info.supplier_balance_log_yeji_jine_num = 0;
		that.user_info.user_dengji_xiaoshou_renwu = 0;
		that.user_info.userItem_balance_leiji_yongjin = 0.00;
		that.current_daili_fenrun_list.userItem_balance_leiji_yongjin = 0.00;
	
	
		that.get_current_userinfo();
		
		that.get_fenxiao_total_amount();
		
		that.get_shop_icon_index();
		this.iconid = options.iconid;
		
		this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
		
	},
	onShow() {
		
	},
	onReady(){
		
	},
	onPageScroll(e) {
		
	},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		   console.log('下拉刷新==')
		   
		   // #ifndef MP-ALIPAY
		   uni.showToast({
		   	title: '数据更新中……',
		   	icon:'loading',
		   });
		   // #endif
		   
		   // #ifdef MP-ALIPAY
		   uni.showToast({
		   	title: '数据更新中……',
		   	//icon:'loading', 	//支付宝不支持icon为 loading
		   	//duration:2000
		   });
		   // #endif
			 this.current_page = 1;
		   this.get_current_userinfo();
		   
		   console.log('下拉刷新==============')
		   
		   //停止当前页面的下拉刷新
		   setTimeout(function() {
		   	console.log('timeout===>>>stopPullDownRefresh===>>>hideToast');
		   	
		   	uni.stopPullDownRefresh();
		   	
		   	uni.hideToast();
		   	//uni.hideLoading();
		   	
		   }, 2000);
		   
		},
		
		methods: {
			
			xiaoxi:function(){
				this.changge_xiaoxi = !this.changge_xiaoxi;
			},
			fasong_xiaoxi:function(){
				uni.navigateTo({
					url: '/pages/expert_online/chat_list'
				});
			},
			tuijian:function(){
				console.log('123456123')
				var new_url = '/pages/expert_online/object_list';
				if(this.current_iconid){
					new_url += '?iconid='+this.current_iconid;
				}
				this.abotapi.call_h5browser_or_other_goto_url(new_url);
			},
			duixiang:function(){
				console.log('123456123')
				uni.navigateTo({
					url: '/pages/expert_online/hotlist'
				});
			},	
				
				
			
			
			callback_function_shop_option_data:function(that, cb_params){
				
				console.log('当前调试开关22：' + this.system_debug_flag);
				console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);
				
				if(!cb_params){
					return;
				}
				
				
				console.log('cb_params====', cb_params);
				
				that.wxa_shop_nav_bg_color  = cb_params.option_list.wxa_shop_nav_bg_color;
				that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
				
				
				
				if (cb_params.option_list.wxa_kefu_mobile_num) {
				  
				    that.wxa_kefu_mobile_num = cb_params.option_list.wxa_kefu_mobile_num
				  
				}
				if (cb_params.option_list.wxa_kefu_button_type) {
				  
				   that.wxa_kefu_button_type = cb_params.option_list.wxa_kefu_button_type
				  
				}
				if (cb_params.option_list.wxa_kefu_form_url) {
				  
				    that.wxa_kefu_form_url = cb_params.option_list.wxa_kefu_form_url
				  
				}
				
				
				
				
			},
			get_shop_icon_index:function(){
				var that = this;
				
				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if(!userInfo || !userInfo.userid || !userInfo.checkstr){
					that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
				}
				
				var post_end_point = '/?g=Yanyubao&m=ShopAppWxa&a=get_shop_icon_index';
				var post_data = {
					sellerid: that.abotapi.globalData.default_sellerid,
				};
				
				that.abotapi.abotRequest(post_end_point, post_data, function(res){
					console.log('/?g=Yanyubao&m=ShopAppWxa&a=get_shop_icon_index===>>>', res);
					
					
					
				})
			},
			
			get_current_userinfo: function() {
				var that = this;
				
				var userInfo = that.abotapi.get_user_info();
				
				var last_url = '/pages/fenxiao/fenxiao_center';
				
				if (!userInfo || !userInfo.userid) {
					that.abotapi.goto_user_login(last_url);
				
					return;
				}
				that.userInfo = userInfo;
			
				console.log('get_current_userinfo--userInfo==', userInfo);
				
				var post_data = {
						sellerid: that.abotapi.globalData.default_sellerid,
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
						page: that.current_page,
						page_size: 10,
				};
				
				// #ifdef MP-WEIXIN
					post_data.xiaochengxu_appid = that.abotapi.globalData.xiaochengxu_appid,
					post_data.xiaochengxu_openid = that.abotapi.get_current_openid('userid_openid_' + userInfo.userid);
				// #endif
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/FenxiaoData/get_fenxiao_center_myteam_list',
					data: post_data,
					success: function(res) {
					
						if (res.data.code == -1) {
							//登录超时
							that.abotapi.del_user_info();
							
							var last_url = '/pages/tabbar/user';
							that.abotapi.goto_user_login(last_url, 'normal');
							
						} 
						else {
							/* 
							
							if(res.data.data.fenxiao_info.supplier_sequence == '-1'){
								uni.showModal({
									title:'错误',
									content:'请购买代理身份',
									showCancel:false
								});
								
								uni.navigateTo({
									url: '/pages/tabbar/user',
								})
								
							}
							
							 */
							
							var data = res.data;
							
							//渲染前端界面
							that.user_info = data.data;
							
							that.my_xia_grade_level = that.user_info.my_xia_grade_level;
							
							that.fenxiao_info = that.user_info.fenxiao_info;
							
							
							console.log('fenxiao_userinfo==>>', that.fenxiao_info);
						
							
						}
					},
					fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
					},
				})
				
				
			},
			
			get_fenxiao_total_amount:function(){
				
				var that = this;
				
				var userInfo = that.abotapi.get_user_info();
				
						
				var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					userid:userInfo.userid,
					checkstr: userInfo.checkstr,
				};
				
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/FenxiaoData/get_fenxiao_profit_summay_list',
					method: 'post',
					data: post_data,
					success: function (res) {
					
					that.current_daili_fenrun_list = res.data.data;
					
					},
						fail: function (e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
						},
				});
					
				
			},

			
			//邀请代理
			go_to_invitation_agent:function() {
				
				uni.navigateTo({
					url: '/pages/user/myQR/myQR',
				})
				
			},
			go_to_shop_detail:function(){
				uni.navigateTo({
					url: '/pages/product/goods-list/goods-list?cataid=11006&cataname=最新代理',
				})
			},
			//我的订单
			toOrderList:function() {
				uni.navigateTo({
					url: '/pages/user/order_list/order_list?currentTab=0&otype=0',
				})
			
			},
			//我的团队
			go_to_myteam:function(){
				uni.navigateTo({
					url: '/pages/fenxiao/myteam',
				})
				
			},
			//收益汇总
			go_to_profit_summary:function(){
				uni.navigateTo({
					url: '/pages/fenxiao/profit_summary',
				})
				
			},
			//收益中心
			go_to_profit_center:function(){
				uni.navigateTo({
					url: '/pages/fenxiao/profit_center',
				})
				
			},
			//联盟订单
			to_union_order_list:function() {
				uni.navigateTo({
					url: '/pages/fenxiao/fenxiao_order_list',
				})
				
				
			},
			
			//公司资质
			go_to_gongsi_zizhi:function() {
				
				var last_url = '/pages/fenxiao/fenxiao_center';
							
				var userInfo = this.abotapi.get_user_info();
				if (!userInfo) {
					this.abotapi.goto_user_login(last_url);
			
					return;
				}

				var that = this;
							
				var var_list = Object();
				var url = 'https://yanyubao.tseo.cn/Home/XianmaiShang/zizhi_list/ensellerid/' + this.abotapi.globalData.default_sellerid + '.html'
				that.abotapi.call_h5browser_or_other_goto_url(url, var_list);
			},
			
			//提现账户
			go_to_tixian:function(){
				
				var url = 'https://sls.ddkshop.com/Home/User/income_typelist.html?ensellerid=%ensellerid%&oneclicklogin=%oneclicklogin%';
				
				var var_list = Object();
				
				this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
				
				
				
			},
			//消息列表
			toMsg:function() {
				
				uni.navigateTo({
					url: '/pages/msg/msg',
				})
				
			},
			
		
			//我的顾客
			go_to_customer:function(){
				
				uni.navigateTo({
					url: '/pages/fenxiao/mybuyer',
				})
				
			},
			
			//客服
			go_to_phone(){
				uni.makePhoneCall({
					phoneNumber: this.wxa_kefu_mobile_num,
				})
			},
			toAdDetails:function(url){
				
				if(!url){
					console.log('url为空，不跳转！');
					return;
				}
				
				// var home_url = '/pages/index/index';
				// this.abotapi.goto_user_login(home_url, 'switchTab');
				
				var that = this;
				var var_list = Object();
				
				this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
				
			},
			go_to_my_integral:function () {
				uni.navigateTo({
					url: '/pages/user/logscore',
				})
				
			}
			
		},
	}
</script>

