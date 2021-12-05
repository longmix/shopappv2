<template>
	<view>
		<view class="container">
		  <view class="panel-display" style="position: relative;">
		  <view>
		    <icon class="icon-about" type="info" size="28" color="#aaa" @click="showAbout"/></view>
			
			<view class="display-str">{{my_display_str}}</view>
			<view class="display-num">{{calcResult.displayNum}}</view>
			<view class="display-op">{{calcResult.displayOp}}</view>
			
		  </view>
		  <view class="panel-btns">
		    <view class="btns-rows">
		      <view class="btn btn-c" :class="tapped['c']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd" data-op="c">AC</view>
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
		    <view class="btns-rows btns2">
		      <view class="btns2-left">
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
		      <view class="btn btns2-right" :class="tapped['=']" @click="btnClicked" bindtouchstart="btnTouchStart"  bindtouchend="btnTouchEnd" data-op="=">=</view>
		    </view>
		  </view>
		</view>
	</view>
</template>
<script>
	
	import calcUtil from './utils/calc.js'

	export default {
		data() {
			return {

				wxa_shop_nav_bg_color: '',
				wxa_shop_nav_font_color: '',
				
				calcResult: {},
				tapped: {},
				
				
				my_display_str:'',
				my_display_str_last_num:'',
				my_display_str_reset_flag:0,
			}
		},
		onLoad(options) {
			var that = this;
			
			uni.setNavigationBarTitle({
				title: '计算器'
			})
			

			
			this.abotapi.set_option_list_str(that, function(that001, option_list) {
				//that001.abotapi.getColor();
				
				console.log('option_list=====>>>>', option_list);

				
				
			});

			

			console.log('onLoad')
			
			calcUtil.reset()
			
			//var that = this

			


		},
		//onReady生命周期函数，监听页面初次渲染完成
		onReady: function(){
			
		},
		//页面卸载，清除画布绘制计时器
		onUnload:function(){
			
		},
		methods: {
			showAbout: function(e){
				uni.showModal({
				  title: '关于计算器',
				  content: '延誉宝免费计算器 @V1.0',
				  showCancel: false  
				})
			},
			btnClicked: function(e){
				var code = e.target.dataset.op
				
				console.log('click 点击的op ===>>> ', code);
				
				calcUtil.addOp(code)
				
				//this.setData({calcResult: calcUtil.getVars()})
				this.calcResult =  calcUtil.getVars();
				
				console.log('计算后的结果', this.calcResult)
				
				//追加数字和符号
				var op_list = ['+', '-', '*', '/'];
				var op_eq_list = ['='];
				var num_list = ['0', '1', '2', '3', '4','5', '6', '7', '8', '9', '.', '%'];
				var fn_list = ['c', 'd'];
				
				
				if(this.my_display_str_reset_flag){
					this.my_display_str_reset_flag = 0;
					this.my_display_str = '';
				}
				
				if(op_list.indexOf(code) != -1){
					//this.my_display_str += this.calcResult.displayNum;
					this.my_display_str += this.my_display_str_last_num;
					
					this.my_display_str += this.calcResult.displayOp;
				}
				else if(num_list.indexOf(code) != -1){
					this.my_display_str_last_num = this.calcResult.displayNum;
				}
				else if(op_eq_list.indexOf(code) != -1){
					this.my_display_str += this.my_display_str_last_num;
					
					this.my_display_str += this.calcResult.displayOp;
					
					this.my_display_str += this.calcResult.displayNum;
					
					this.my_display_str_reset_flag = 1;
				}
				
				console.log('displayOp ==>> ',this.calcResult.displayOp)
				
				console.log('displayNum ==>> ',this.calcResult.displayNum)
				
				console.log('my_display_str_last_num ==>> ',this.my_display_str_last_num)
				
				console.log('my_display_str ==>> ',this.my_display_str)
				
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
	
	.btns2-right{
	  border-left: 2rpx solid #c3c6c7;
	}
	
	.display-num{
	  display: inline-block;
	  font-size: 72rpx;
	  position: absolute; 
	  bottom: 90rpx; 
	  right: 20rpx;
	}
	.display-op{
	  display: inline-block;
	  font-size: 72rpx;
	  bottom: 20rpx; 
	  position: absolute;
	  right: 20rpx;
	}
	
	
	.display-str{
	  display: inline-block;
	  font-size: 50rpx;
	  position: absolute; 
	  bottom: 190rpx; 
	  right: 20rpx;
	}
	
	.btns2{
	  flex: 2;display: flex;flex-direction: row;
	}
	
	.btns2-left{
	  flex: 3;display: flex;flex-direction: column;
	}
	
	.btns2-left-part{
	  display: flex; flex-direction: row;flex-grow: 1;
	}
	
	.btn-c{
	  color: #f00;
	}
	
	.icon-about{
	  position: absolute; 
	  right: 3vw;
	  top: 3vw;
	}
</style>
