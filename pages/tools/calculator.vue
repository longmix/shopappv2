<template>
	<view>
		
		<view class="container">
		  <view class="panel-display" style="position: relative;">
		  <view>
		    <icon id="icon-about" type="info" size="28" color="#aaa" @click="showAbout"/></view>
		    <view id="display-num">{{calc.displayNum}}</view>
		    <view id="display-op">{{calc.displayOp}}</view>
		  </view>
		  <view class="panel-btns">
		    <view class="btns-rows">
		      <view id="btn-c" class="btn" :class="tapped['c']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd" data-op="c">AC</view>
		      <view class="btn" :class="tapped['d']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd"  data-op="d">DEL</view>
		      <view class="btn" :class="tapped['/']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd"  data-op="/" style="font-size: 24px;">÷</view>
		      <view class="btn" :class="tapped['x']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd"  data-op="x">×</view>
		    </view>
		    <view class="btns-rows">
		      <view class="btn" :class="tapped['7']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd"  data-op="7">7</view>
		      <view class="btn" :class="tapped['8']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd"  data-op="8">8</view>
		      <view class="btn" :class="tapped['9']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd"  data-op="9">9</view>
		      <view class="btn" :class="tapped['-']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd"  data-op="-">-</view>
		    </view>
		    <view class="btns-rows">
		      <view class="btn" :class="tapped['4']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd"  data-op="4">4</view>
		      <view class="btn" :class="tapped['5']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd"  data-op="5">5</view>
		      <view class="btn" :class="tapped['6']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd"  data-op="6">6</view>
		      <view class="btn" :class="tapped['+']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd"  data-op="+">+</view>
		    </view>
		    <view id="btns2" class="btns-rows">
		      <view id="btns2-left">
		        <view class="btns2-left-part">
		          <view class="btn" :class="tapped['1']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd"  data-op="1">1</view>
		          <view class="btn" :class="tapped['2']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd"  data-op="2">2</view>
		          <view class="btn" :class="tapped['3']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd"  data-op="3">3</view>
		        </view>
		        <view class="btns2-left-part">
		          <view class="btn" :class="tapped['%']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd"  data-op="%">%</view>
		          <view class="btn" :class="tapped['0']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd"  data-op="0">0</view>
		          <view class="btn" :class="tapped['.']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd"  data-op=".">.</view>
		        </view>
		      </view>
		      <view id="btns2-right" class="btn" :class="tapped['=']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd" data-op="=">=</view>
		    </view>
		  </view>
		</view>
		
		
		
	</view>
</template>
<script>
	
	import calc from './utils/calc.js'

	export default {
		data() {
			return {

				wxa_shop_nav_bg_color: '',
				wxa_shop_nav_font_color: '',
				
				calc: {},
				tapped: {}
			}
		},
		onLoad(options) {
			var that = this;
			
			uni.setNavigationBarTitle({
				title: '时钟'
			})
			

			
			this.abotapi.set_option_list_str(that, function(that001, option_list) {
				//that001.abotapi.getColor();
				
				console.log('option_list=====>>>>', option_list);

				
				
			});

			

			console.log('onLoad')
			calc.reset()
			var that = this

			


		},
		//onReady生命周期函数，监听页面初次渲染完成
		onReady: function(){
			
		},
		//页面卸载，清除画布绘制计时器
		onUnload:function(){
			
		},
		methods: {
			showAbout: function(e){
			wx.showModal({
			  title: '关于',
			  content: '一个简单的计算器 @V1.0',
			  showCancel: false  
			})
			},
			btnClicked: function(e){
				var code = e.target.dataset.op
				calc.addOp(code)
				console.log(calc.getVars())
				
				//this.setData({calc: calc.getVars()})
				this.calc =  calc.getVars();
			},
			btnTouchStart: function(e){
				var code = e.target.dataset.op
				var tapped = {[code]: 'active'}
				
				this.tapped =  tapped;
			},
			btnTouchEnd: function(e){
				var code = e.target.dataset.op
				var tapped = {}
				
				this.tapped = tapped;
			},
			
		},






	}
</script>

<style>
	/**index.wxss**/
	
	.container{
	  display: flex;
	  flex-direction: column;
	  height: 100vh;
	  align-items: center;
	  justify-content: space-between;
	  background-color: #f1f3f3;
	}
	
	.panel-display{
	  width: 100%;
	  flex: 1;
	}
	
	.panel-btns{
	  width: 100%;
	  flex: 1;
	  display: flex;
	  flex-direction: column;
	}
	
	.btns-rows{
	  width: 100%;
	  flex: 1;
	  display: flex;
	  flex-direction: row;
	  background-color: #f7f8f9;
	}
	
	.btn{
	  text-align: center;
	  box-sizing: border-box;
	  flex: 1;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  border-top: 1px solid #c3c6c7;
	}
	
	.btn.active{
	  background-color: #e3e4e5;
	}
	
	.btn:not(:last-child){
	  border-right: 1px solid #c3c6c7;
	}
	
	#btns2-right{
	  border-left: 1px solid #c3c6c7;
	}
	
	#display-num{
	  display: inline-block;
	  font-size: 36px;
	  position: absolute; 
	  bottom: 5vh; 
	  right: 3vw; 
	}
	
	#display-op{
	  display: inline-block;
	  font-size: 16px;
	  position: absolute; 
	  bottom: 1vh; 
	  right: 3vw; 
	}
	
	#btns2{
	  flex: 2;display: flex;flex-direction: row;
	}
	
	#btns2-left{
	  flex: 3;display: flex;flex-direction: column;
	}
	
	.btns2-left-part{
	  display: flex; flex-direction: row;flex-grow: 1;
	}
	
	#btn-c{
	  color: #f00;
	}
	
	#icon-about{
	  position: absolute; 
	  right: 3vw;
	  top: 3vw;
	}
</style>
