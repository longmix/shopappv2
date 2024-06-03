<template>
	<view>
	<!--pages/scan-qrcode/scan-qrcode.wxml-->
	<!-- <view class="map_container"> 
	  <map class="map" id="map" longitude="{{longitude}}" latitude="{{latitude}}" scale="14" show-location="true" markers="{{markers}}" bindmarkertap="makertap"></map> 
	</view> 
	<view class="rgc_info"> 
	  <text>{{rgcData.address}}</text> 
	  <text>{{rgcData.desc}}</text> 
	  <text>{{rgcData.business}}</text> 
	</view> -->
	
	
		<image src="https://yanyubao.tseo.cn/Tpl/static/jianghanyinhua/1.svg"></image>
		<image src="https://yanyubao.tseo.cn/Tpl/static/jianghanyinhua/2.svg"></image>
			<image src="https://yanyubao.tseo.cn/Tpl/static/jianghanyinhua/3.svg"></image>
				<image src="https://yanyubao.tseo.cn/Tpl/static/jianghanyinhua/4.svg"></image>
					<image src="https://yanyubao.tseo.cn/Tpl/static/jianghanyinhua/5.svg"></image>
						<image src="https://yanyubao.tseo.cn/Tpl/static/jianghanyinhua/6.svg"></image>
						
						
	 <view  v-if="showCon" class="modal-mask" bindtap="changeModalCancel">
	    <view class="modal-dialog" >
	      <view class="modal-title">温馨提示</view>
	      <view class="modal-content">
	        来自上海的，安全熊定位以及反光童装提醒您：这件衣服上的二维码不是骗子，如果您点击了确定，这位儿童或者老人的家人，将会知道他们的大概位置，对您没有任何影响，您的确定，对老人和儿童很重要，谢谢！！
	      </view>
	      <view class="modal-footer">
	        <!-- <view class="btn-cancel" catchtap="changeModalCancel">取消</view> -->
	        <button open-type="openSetting" class="btn-confirm button-on-view" style="padding:0rpx;" catchtap="changeModalCancel">设置</button>
	      </view>
	    </view>
	  </view>
	
	
	
	
	<view class="bg" bindtap='hideview' :style="{display: display}"></view>
	<view class="show" bindtap='hideview' :style="{display: display}">
	<view class='txt'>
	<!--
	<button class="bt-a" bindtap="change_mobile_num">
	  <view>1、如果您想更换绑定的手机号码，请点击这里</view>
	</button>
	-->
	
	<button class="bt-1" bindtap="go_to_weixin_pay">
	  <view>1，微产品码充值：点击这里，给当前的微产品码充值</view>
	</button>
	
	
	<button class="bt-a" bindtap888="go_to_set_weixin_notify" open-type="contact">
	  <view>2，必须先关注微信公众号：微产品码。点击这里，发送“888”，按照提示关注“微产品码”，就可以免费接收顾客的扫码通知。如果已经关注了，请忽略。谢谢！</view>
	</button>
	
	
	<button class="bt-b" bindtap="scan_location">
	  <view>3，模仿路人扫码：微信扫码看视频，产品介绍和购买链接，或者是意见反馈，会议签到，设备巡检上报等等。</view>
	</button>
	
	
	<button class="bt-c" bindtap="scan_remove_mobile">
	  <view>4，如果您想一键解除绑定微产品码，请点击这里</view>
	</button>
	
	
	<!-- <button class="bt-d" bindtap="scan_set_e_profile">
	  <view>5， 微产品码资料上传入口
	a：产品方向，短视频，图片文字资料和各大电商平台购买链接的上传入口，任何微信扫码者可以秒看，也可以直接购买。适合用在各行各业的产品上面，也可以用于老人小孩和宠物的防走失，因为有扫码定位功能。
	b：社区方向，短视频，图片和文字资料的电子表格上传入口，适合于访客登记，设备巡检上报，产品介绍，隐患排查上报，培训班报名，会议签到，有声图书，视频使用说明书，产品标签等等各个方面。适用于政府部门，小区物业，学校，企事业单位等等。</view>
	</button> -->
	
	<!-- ------------------------------------------------------------------------------------------ -->
	<!--index.wxml-->
	<button class="bt-d" bindtap="showDialogBtn">
	  <view class="btn-dialog">
	  <text>5，微产品码资料上传入口
	    \na：视频，图片，文字和链接的上传入口，适合印在各种产品的包装，吊牌和不干胶上 ，是产品的销售渠道和广告平台，任何人微信扫码，秒看码主上传的内容，码主可随时修改内容
	    \nb：社区方向：适合用于访客登记，设备巡检上报，培训班报名，会议签到，意见反馈等等
	  </text>
	 
	  </view>
	</button>

	<button class="bt-e"  bindtap="qrcode_meihua">
	  <view class="btn-dialog">
	  <text>6，美化二维码
	  </text>
	 
	  </view>
	</button>
	<!--弹窗-->
	<view class="modal-mask" bindtap="hideModal" catchtouchmove="preventTouchMove" v-if="showModal"></view>
	<view class="modal-dialog" v-if="showModal" style="padding: 20px;top: 35%;left: -20px;">
	  <view class="modal-title">微产品码资料上传入口</view>
	  <view class="modal-content" >
	   
	    <radio-group class="radio" bindchange="updataRadio" style="text-align: left;">
	    <view class="btn-radio-group" >
	      <radio class="btn-radio" value="1"  checked="(map_type == '1') ? 'true' : '' ">视频图片文字</radio>
	      <view type="primary" class="btn-canpinshezhi"  bindtap="scan_set_e_profile" >设置</view>
	    </view>
	    <view class="btn-radio-group" >
	      <radio class="btn-radio"  value="2" checked="(map_type == '2') ? 'true' : '' " >社区使用</radio>
	      <view type="primary" class="btn-shequshezhi"  bindtap="scan_set_community_interaction" >设置</view>
	    </view>
	    </radio-group>
	    <view class="show-btn-tishi" style="margin-top: 60rpx;">
	      <view class="tishi"> 提示1：</view><view class="tishi-xuanxiang">选择哪一个，路人微信扫码时就会看到哪一个。</view>
	    </view>
	    <view class="show-btn-tishi" style="margin-top: 10rpx;">
	      <view class="tishi"> 提示2：</view><view class="tishi-xuanxiang">包装印刷不干胶行业，请一律选择上面的一个：视频图片文字</view>
	    </view>
	    <view class="show-btn-tishi" style="margin-top: 10rpx;">
	      <view class="tishi"> 提示3：</view><view class="tishi-xuanxiang">社区使用，就是扫码的人可以用文字和图片的方式发送反馈，码主可以立刻收到这些反馈</view>
	    </view>
	  </view>
	  <!-- <view class="modal-footer">
	    <view bindtap="onCancel" data-status="cancel" style="text-align: center;padding: 16rpx;">取消</view>
	    <view class="btn-confirm" bindtap="onConfirm" data-status="confirm">确定</view>
	  </view> -->
	</view>
	
	
	
	
	
	</view>
	</view>


	</view>
</template>

<script>
export default {
	data(){
		return{
			markers: [],
			current_latitude: '',
			current_longitude: '',
			current_address:'',
			rgcData: {},
			owner_flag:0,  //订单管理者标记，0 不是订单所有者 1 订单所有者 2 订单所有者要发短信
			display: '',
			showModal: false,
			selfform_mazhu_url:'',
		};
	},
	onLoad:function() {
		
	},
	onShow:function() {
		
	},
	methods:{
		
	}
}
	
</script>

<style>
	/* pages/scan-qrcode/scan-qrcode.wxss */
	.map_container{ 
	    height: 300px; 
	    width: 100%; 
	} 
	
	.map { 
	    height: 100%; 
	    width: 100%; 
	}
	
	.modal-mask {
	      width: 100%;
	      height: 100%;
	      position: fixed;
	      top: 0;
	      left: 0;
	      background-color: rgba(0, 0, 0, 0.5);
	      overflow: hidden;
	      z-index: 9999;
	      display: flex;
	      align-items: center;
	      justify-content: center;
	    }
	    .modal-dialog {
	      width: 540rpx;
	      overflow: hidden;
	      z-index: 9999;
	      background: #f9f9f9;
	      border-radius: 5rpx;
	    }
	    .modal-title {
	      padding-top: 30rpx;
	      font-size: 32rpx;
	      color: #030303;
	      text-align: center;
	    }
	    .modal-content {
	      padding: 20rpx 32rpx;
	      font-size: 28rpx;  
	    }
	    .modal-footer {
	      display: flex;
	      flex-direction: row;
	      height: 86rpx;
	      border-top: 1px solid #dedede;
	      font-size: 34rpx;
	      line-height: 86rpx;
	    }
	    .btn-cancel {
	      width: 50%;
	      color: #abb4bd;
	      text-align: center;
	      border-right: 1px solid #dedede;
	    }
	    .btn-confirm {
	      width: 100%;
	      color: #6fb64b;
	      text-align: center;
	      font-weight: 500;
	    }
	
	  .bg {
	  display: none;
	  position: absolute;
	  top: 0%;
	  left: 0%;
	  width: 100%;
	  height: 1400px;
	  background-color: #CCFFFF;
	  z-index: 1001;
	  -moz-opacity: 0.7;
	  opacity: 0.70;
	  filter: alpha(opacity=70);
	}
	 
	.show {
	  display:none;
	  text-align:center;
	  position:absolute;
	  top:5%;
	  left:15%;
	  width:65%;
	  /*height:48%;*/
	  padding:8px;
	  border:4rpx solid #e8e9f5;
	  background-color:white;
	  z-index:1002;
	  overflow:auto;
	}
	.txt{
	  margin-top:30rpx;
	  color:royalblue;
	  display:flex;
	  flex-direction:column;
	}
	
	.bt-1{
	  background-color:#0066ff;
	  color:#fff;
	  font-size:32rpx;
	  text-align: left;
	  line-height:48rpx;
	  padding:24rpx 20rpx;
	
	}
	
	.bt-a{
	  background-color:#E64340;
	  color:#fff;
	  font-size:32rpx;
	  text-align: left;
	  line-height:48rpx;
	  padding:24rpx 20rpx;
	}
	
	.bt-b{
	  font-size:32rpx;
	  color:#fff;
	  background-color:#1AAD19;
	  text-align: left;
	  line-height:48rpx;
	  padding:24rpx 20rpx;
	}
	
	.bt-c{
	  font-size:32rpx;
	  color:#fff;
	  background-color:#C76114;
	  text-align: left;
	  line-height:48rpx;
	  padding:24rpx 20rpx;
	}
	
	.bt-d{
	  font-size:32rpx;
	  color:#fff;
	  background-color:#ff6eaf;
	  text-align: left;
	  line-height:48rpx;
	  padding:24rpx 20rpx;
	}
	.bt-e{
	  padding: 0;
	  height: 80rpx;
	  padding-left: 20rpx;
	  line-height: 80rpx;
	  font-size: 32rpx;
	  text-align: left;
	  color: #fff;
	  background-color: #1290da;
	}
	
	.txt button{
	  margin-bottom: 60rpx;
	  width: 85%;
	}
	.btn-canpinshezhi{
	  background-color: #ffffff;
	  border:#09bb07 1rpx solid;
	  border-radius: 50rpx;
	  width: 80rpx;
	  color: #09bb07;
	  padding-left: 22rpx;
	  height: 50rpx;
	  line-height: 50rpx;
	  margin-top: 10rpx;
	  margin-left: 40rpx;
	}
	.btn-radio-group{
	  display: flex;
	  border-bottom: solid 1rpx #999999;
	  padding-bottom: 20rpx;
	  padding-top: 20rpx;
	}
	.btn-radio{
	  color: #333333;
	  font-size: 40rpx;
	  margin-right: 20rpx;
	  /* padding-right: 30rpx;
	  padding-left: 20rpx; */
	}
	.btn-shequshezhi{
	  background-color: #ffffff;
	  border:#09bb07 1rpx solid;
	  border-radius: 50rpx;
	  width: 80rpx;
	  color: #09bb07;
	  padding-left: 22rpx;
	  height: 50rpx;
	  line-height: 50rpx;
	  margin-top: 10rpx;
	  margin-left: 120rpx;
	}
	.btn-dialog{
	  white-space:pre-wrap;
	}
	.show-btn-tishi{
	  display: flex;
	}
	.tishi{
	  width: 120rpx;
	}
	.tishi-xuanxiang{
	  width: 400rpx;
	  text-align: left;
	}
	/* -------------------------------------------------------------------- */
	
	/**index.wxss**/
	.show-btn {
	  margin-top: 100rpx;
	  color: #22cc22;
	}
	.modal-mask {
	  width: 100%;
	  height: 100%;
	  position: fixed;
	  top: 0;
	  left: 0;
	  background: #000;
	  opacity: 0.5;
	  overflow: hidden;
	  z-index: 9000;
	  color: #fff;
	}
	.modal-dialog {
	  width: 540rpx;
	  overflow: hidden;
	  position: fixed;
	  top: 50%;
	  left: 0;
	  z-index: 9999;
	  background: #f9f9f9;
	  margin: -180rpx 105rpx;
	  border-radius: 36rpx;
	}
	.modal-title {
	  padding-top: 50rpx;
	  font-size: 36rpx;
	  color: #030303;
	  text-align: center;
	}
	.modal-content {
	  padding: 50rpx 32rpx;
	}
	.modal-input {
	  display: flex;
	  background: #fff;
	  border: 2rpx solid #ddd;
	  border-radius: 4rpx;
	  font-size: 28rpx;
	}
	
	.input {
	  width: 100%;
	  height: 82rpx;
	  font-size: 28rpx;
	  line-height: 28rpx;
	  padding: 0 20rpx;
	  box-sizing: border-box;
	  color: #333;
	}
	input-holder {
	  color: #666;
	  font-size: 28rpx;
	}
	
	.modal-footer {
	  display: flex;
	  flex-direction: row;
	  height: 86rpx;
	  border-top: 1px solid #dedede;
	  font-size: 34rpx;
	  line-height: 86rpx;
	}
	.btn-cancel {
	  width: 50%;
	  color: #666;
	  text-align: center;
	  border-right: 1px solid #dedede;
	}
	.btn-confirm {
	  width: 50%;
	  color: #ec5300;
	  text-align: center;
	}
	
	.btn-fangxiang{
	  font-size:34rpx;
	  border:2rpx solid #222;
	  padding: 10rpx;
	  margin-top: 16rpx;
	}
</style>