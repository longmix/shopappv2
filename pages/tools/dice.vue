<template>
	<view>
		<!-- 展示视图 -->
		<view class="flex-container"> 
		    <view class="result">
		        <text  :style="{display:isShow}">恭喜，您摇到的数字是：{{total}}</text>
		    </view>
		    <view class="dice-box">
		        <view class="dice-item">
		            <!-- <template is="{{dice[num1]}}"></template> -->
					
					<dice-first v-if="dice[num1] == 'first'"></dice-first>
					<dice-second v-if="dice[num1] == 'second'"></dice-second>
					<dice-third v-if="dice[num1] == 'third'"></dice-third>
					<dice-fourth v-if="dice[num1] == 'fourth'"></dice-fourth>
					<dice-fifth v-if="dice[num1] == 'fifth'"></dice-fifth>
					<dice-sixth v-if="dice[num1] == 'sixth'"></dice-sixth>
		        </view>
		    </view>
			
		    <view class="second-row">
		        <view class="dice-box">
					<view class="dice-item">
						<!-- <template is="{{dice[num2]}}"></template> -->
						<dice-first v-if="dice[num2] == 'first'"></dice-first>
						<dice-second v-if="dice[num2] == 'second'"></dice-second>
						<dice-third v-if="dice[num2] == 'third'"></dice-third>
						<dice-fourth v-if="dice[num2] == 'fourth'"></dice-fourth>
						<dice-fifth v-if="dice[num2] == 'fifth'"></dice-fifth>
						<dice-sixth v-if="dice[num2] == 'sixth'"></dice-sixth>
					</view>
		        </view>
				<view class="dice-box">
					<view class="dice-item">
						<!-- <template is="{{dice[num3]}}"></template> -->
						<dice-first v-if="dice[num3] == 'first'"></dice-first>
						<dice-second v-if="dice[num3] == 'second'"></dice-second>
						<dice-third v-if="dice[num3] == 'third'"></dice-third>
						<dice-fourth v-if="dice[num3] == 'fourth'"></dice-fourth>
						<dice-fifth v-if="dice[num3] == 'fifth'"></dice-fifth>
						<dice-sixth v-if="dice[num3] == 'sixth'"></dice-sixth>
					</view>
				</view>
		    </view>
			
		    <view class="button-box">
		        <button :type="buttonType"  @click="shakeClick" >{{buttonValue}}</button>
		    </view>
		</view>
	</view>
</template>
<script>
	import diceFirst from './components/dice-first.vue';
	import diceSecond from './components/dice-second.vue';
	import diceThird from './components/dice-third.vue';
	import diceFourth from './components/dice-fourth.vue';
	import diceFifth from './components/dice-fifth.vue';
	import diceSixth from './components/dice-sixth.vue';
	
	export default {
		components:{
			diceFirst,
			diceSecond,
			diceThird,
			diceFourth,
			diceFifth,
			diceSixth,
		},
		data() {
			return {

				wxa_shop_nav_bg_color: '',
				wxa_shop_nav_font_color: '',
				
				dice : ['first','second','third','fourth','fifth','sixth'],
				buttonType : 'primary',
				buttonValue : '摇一摇',
				isShow:'none',
				num1 : 0,
				num2 : 0,
				num3 : 0,
				total: 0,
				
				
				timer : null ,
				isRand : false,
			}
		},
		onLoad(options) {
			var that = this;
			
			uni.setNavigationBarTitle({
				title: '骰子'
			})
			

			
			this.abotapi.set_option_list_str(that, function(that001, option_list) {
				//that001.abotapi.getColor();
				
				console.log('option_list=====>>>>', option_list);

				
				
			});

			

			uni.getSystemInfo({
				success: function(res) {
					console.log('res==', res)
					console.log('res.model', res.model);
					console.log('res.pixelRatio', res.pixelRatio);
					console.log('res.windowWidth', res.windowWidth);
					console.log('res.windowHeight', res.windowHeight);
					console.log('res.language', res.language);
					console.log('res.version', res.version);
					console.log('res.platform', res.platform);
					
					//获取系统信息成功，将系统窗口的宽高赋给页面的宽高
					that.width = res.windowWidth;
					that.height = res.windowHeight;
					
					
				}
			});

		},
		//onReady生命周期函数，监听页面初次渲染完成
		onReady: function(){
			
		},

		methods: {
			 // shakeClick: function () { 
			 //    let me = this;
			 //    this.global.isRand = !this.global.isRand;
			 //    if ( this.global.isRand ) {
			 //      this.global.timer = setInterval(function (){
			 //        let num1 = Math.floor(Math.random()*6);
			 //        let num2 = Math.floor(Math.random()*6);
			 //        let num3 = Math.floor(Math.random()*6);
			 //        me.setData({num1 : num1});
			 //        me.setData({num2 : num2});
			 //        me.setData({num3 : num3});
			 //        me.setData({total : num1+num2+num3+3});
			 //      },50);
			 //    } else {
			 //      clearInterval(this.global.timer);
			 //    }
			shakeClick: function () { 
			    var that = this;
			    that.isRand = !that.isRand;
			    if ( that.isRand ) {
			      that.timer = setInterval(function (){
			        var num1 = Math.floor(Math.random()*6);
			        var num2 = Math.floor(Math.random()*6);
			        var num3 = Math.floor(Math.random()*6);
					
					
					
					
					
			        that.num1 = num1;
			        that.num2 = num2;
			        that.num3 = num3;
					
			        that.total = num1+num2+num3+3;
			      },50);
			    } else {
			      clearInterval(that.timer);
			    }
						
				  that.dice = that.dice;
				  that.buttonType = (that.isRand) ? 'default' : 'primary';
				  that.buttonValue = (that.isRand) ? '停止' : '摇一摇';
				  that.isShow = (that.isRand) ? 'none':'block';
			  },
		},
	}
</script>

<style>
	/*外部公共容器样式*/
	.flex-container{
	  display:flex;
	  height: 100vh;
	  background-color:#666666;
	  flex-direction : column;
	  justify-content: center;
	  align-items: center;
	  color: #fff;
	}
	
	.dice-box{
	  padding: 20rpx;
	  height: 216rpx;
	} 
	
	.second-row{
	  display:flex;
	  flex-direction : row;
	  justify-content: space-around;
	  height: 216rpx;
	}
	.button-box{
	  padding-top: 200rpx;
	  width:80%;
	}
	.dice-item{
		height: 216rpx;
	}
	.result{
		height: 40rpx;
		margin-bottom: 40rpx;
	} 

</style>
