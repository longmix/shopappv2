<template>
	<view>
		<view class="title">
		  <text>智力拼图</text>
		</view>
		<view class="container">
		  <view class="row" v-for="(item, index) in num" :key="index" >
		    <button :class="[item == 9?'btn active':'btn']" @click='onMoveTap' :data-item="item" :data-index="index">{{item}}</button>
		  </view>
		</view>
		
		<view class="init">
		  <text class="time">{{time}}秒</text>
		  <button @click='timeBegin' type="primary">开始</button>
		  <button @click='timeStop' type="warn">暂停</button>
		</view>
	</view>
</template>

<script>
	
	import puzz from './utils/puzz_util.js'

	export default {
		data() {
			return {

				wxa_shop_nav_bg_color: '',
				wxa_shop_nav_font_color: '',
				
				num: ['★', '★', '★', '★', '★', '★', '★', '★', '★'],
				    hidden: true,
				    time:0,
				    t:'',              //定时器
			}
		},
		
		onLoad(options) {
			var that = this;
			
			uni.setNavigationBarTitle({
				title: '拼图'
			})
			

			
			this.abotapi.set_option_list_str(that, function(that001, option_list) {

				
				console.log('option_list=====>>>>', option_list);

				
				
			});

		},
		//onReady生命周期函数，监听页面初次渲染完成
		onReady: function(){
			
		},
		//页面卸载，清除画布绘制计时器
		onUnload:function(){
			
		},
		methods: {
			//随机打乱数组
			  sortArr: function (arr) {
			    return arr.sort(function () {
			      return Math.random() - 0.5
			    })
			  },
			  onMoveTap: function (e) {
			    var index = e.currentTarget.dataset.index;
			    var item = e.currentTarget.dataset.item;
			    if (this.num[index + 3] == 9) {
			      this.down(e);
			    }
			    if (this.num[index - 3] == 9) {
			      this.up(e);
			    }
			    if (this.num[index + 1] == 9 && index != 2 && index != 5) {
			      this.right(e);
			    }
			    if (this.num[index - 1] == 9 && index != 3 & index != 6) {
			      this.left(e);
			    }
			  },
			  up: function (e) {
			    var index = e.currentTarget.dataset.index; //当前数字下标
			    var temp = this.num[index];
			    this.num[index] = this.data.num[index - 3]
			    this.num[index - 3] = temp;
			    this.num = this.num;
				
			    if (this.num.toString() == [1, 2, 3, 4, 5, 6, 7, 8, 9].toString()) {
			      this.success();
			    }
			  },
			  down: function (e) {
			    var index = e.currentTarget.dataset.index; //当前数字下标
			    var temp = this.num[index];
			    this.num[index] = this.num[index + 3]
			    this.num[index + 3] = temp;
			    this.num = this.num;
				
			    if (this.num.toString() == [1, 2, 3, 4, 5, 6, 7, 8, 9].toString()) {
			      this.success();
			    }
			  },
			  left: function (e) {
			    var index = e.currentTarget.dataset.index; //当前数字下标
			    var temp = this.num[index];
			    this.num[index] = this.num[index - 1]
			    this.num[index - 1] = temp;
			    this.num = this.num
			    if (this.num.toString() == [1, 2, 3, 4, 5, 6, 7, 8, 9].toString()) {
			      this.success();
			    }
			  },
			  right: function (e) {
			    var index = e.currentTarget.dataset.index; //当前数字下标
			    var temp = this.num[index];
			    this.num[index] = this.num[index + 1]
			    this.num[index + 1] = temp;
			    this.num = this.num;
				
			    if (this.num.toString() == [1, 2, 3, 4, 5, 6, 7, 8, 9].toString()) {
			      this.success();
			    }
			  },
			  success: function () {
			    var that = this;
			    that.success = 'you win !';
				
			    uni.showToast({
			      title: '闯关成功',
			      icon: 'success',
			      success: function () {
			        that.init();
			      }
			    })
			  }
			  ,
			  
			  fail: function () {
			    var that = this;
			    that.success = 'you lost !';
				
			    uni.showToast({
			      title: '闯关失败',
			      icon: 'loading',
			      success: function () {
			        that.init();
			      }
			    })
			  },
			  
			  //初始化拼图
			  init:function(){
			    this.num = this.sortArr([1,2,3,4,5,6,7,8]).concat([9])
			    
			  },
			  
			  timeCount:function(){
			    var that = this;
			    var timer = that.time;
			    that.t = setInterval(function(){
			        timer++;
			        that.time = timer;
			      },1000)
			  },
			  
			  timeBegin:function(){
			    clearInterval(this.t);
			    this.time = 0;
			    this.timeCount();
			    this.init();
			  },
			  
			  timeStop:function(){
			    clearInterval(this.t);
			    if (this.num.toString() != [1, 2, 3, 4, 5, 6, 7, 8, 9].toString()) {
			      this.fail();
			    }
			  }
	
			},
	}
</script>

<style>
	.title{
	  text-align:center;
	  font-size:28rpx;
	  line-height:3;
	}
	.container{
	  width:744rpx;
	  height:744rpx;
	  background:#fff;
	  overflow: hidden;
	}
	.btn{
	  width:248rpx;
	  height:248rpx;
	  line-height:248rpx;
	  color:#666;
	  font-size:124rpx;
	}  
	
	.active{
	  color:transparent!important;
	  background:transparent!important;
	}
	
	.row{
	  width:33.33333%;
	}
	
	.init{
	  text-align:center;
	}
	
	.init button{
	  width:50%;
	  display:inline-block
	}
	
	.time{
	  color:#333;
	  font-size:42rpx;
	  line-height:2;
	  width:100%;
	  display:inline-block;
	}
</style>
