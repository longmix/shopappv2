<template>
	<view>
		<view class="container" :style="{height:canvas_height+'rpx'}">
		    <!--画布区域-->
		    <view class="canvas_area"  :style="{height:canvas_height}">
		        <!--注意：同一页面中的 canvas-id 不可重复，如果使用一个已经出现过的 canvas-id，该 canvas 标签对应的画布将被隐藏并不再正常工作-->

		        <canvas canvas-id="myCanvas" class="myCanvas"  :style="{height:canvas_height}"
		            disable-scroll="true"
		            @touchstart="touchStart"
		            @touchmove="touchMove"
		            @touchend="touchEnd">
		        </canvas>

		    </view>
		    <!--画布工具区域-->
		    <view class="canvas_tools">
		        <view class="box box1" @click="penSelect" data-param="5"></view>
		        <view class="box box2" @click="penSelect" data-param="15"></view>
		        <view class="box box3" @click="colorSelect" data-param="#cc0033"></view>
		        <view class="box box4" @click="colorSelect" data-param="#ff9900"></view>
		        <view class="box box5" @click="clearCanvas"></view>
		    </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
	
				wxa_shop_nav_bg_color: '',
				wxa_shop_nav_font_color: '',
				
				//画布的高度
				canvas_height:'750',
				
				pen : 3, //画笔粗细默认值
				color : '#cc0033' ,//画笔颜色默认值
				startX: 0, //保存X坐标轴变量
				startY: 0, //保存X坐标轴变量
				isClear : false, //是否启用橡皮擦标记
			
			}
		},
		
		
		
		onLoad(options) {
			var that = this;
			
			uni.setNavigationBarTitle({
				title: '涂鸦'
			})
			
			
			
			this.abotapi.set_option_list_str(that, function(that001, option_list) {
			
				
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
					var width = res.windowWidth;
					var height = res.windowHeight;
					
					//计算画布的高度：手机屏幕的宽度为 750rpx，这是固定值。res.windowWidth 为实际屏幕的宽度，单位可能为rpx或者rem等。
					that.canvas_height = 750 / width * height;
					
					that.canvas_height -= 100;
					
				}
			});
			
			
			
		},
		//onReady生命周期函数，监听页面初次渲染完成
		onReady: function(){
			
		},
		//页面卸载，清除画布绘制计时器
		onUnload:function(){
			
		},
		
		methods: {
			touchStart: function (e) {
				console.log('1111111111111111111');
				
			    //得到触摸点的坐标
			    this.startX = e.changedTouches[0].x;
			    this.startY = e.changedTouches[0].y;
				
				// #ifdef MP-WEIXIN
				this.context = wx.createContext()
				// #endif
				
				// #ifndef MP-WEIXIN
				this.context = uni.createCanvasContext('myCanvas', this);
				// #endif
			
			    if(this.isClear){ //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
			        this.context.setStrokeStyle('#F8F8F8') //设置线条样式 此处设置为画布的背景颜色  橡皮擦原理就是：利用擦过的地方被填充为画布的背景颜色一致 从而达到橡皮擦的效果 
			        this.context.setLineCap('round') //设置线条端点的样式
			        this.context.setLineJoin('round') //设置两线相交处的样式
			        this.context.setLineWidth(20) //设置线条宽度
			        this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
			        this.context.beginPath() //开始一个路径 
			        this.context.arc(this.startX,this.startY,5,0,2*Math.PI,true);  //添加一个弧形路径到当前路径，顺时针绘制  这里总共画了360度  也就是一个圆形 
			        this.context.fill();  //对当前路径进行填充
			        this.context.restore();  //恢复之前保存过的坐标轴的缩放、旋转、平移信息
			        }else{
			            this.context.setStrokeStyle(this.color)
						this.context.setLineWidth(this.pen)
						this.context.setLineCap('round') // 让线条圆润 
						this.context.beginPath()
			        
			        }
			},
			
			//手指触摸后移动
			touchMove: function (e) {
				
				console.log('222222222222222');
			      
			    var startX1 = e.changedTouches[0].x
			    var startY1 = e.changedTouches[0].y
			
			    if(this.isClear){ //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
			
				    this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
					this.context.moveTo(this.startX,this.startY);  //把路径移动到画布中的指定点，但不创建线条
					this.context.lineTo(startX1,startY1);  //添加一个新点，然后在画布中创建从该点到最后指定点的线条
					this.context.stroke();  //对当前路径进行描边
					this.context.restore()  //恢复之前保存过的坐标轴的缩放、旋转、平移信息
				  
					this.startX = startX1;
					this.startY = startY1;
			       
			    }else{
					this.context.moveTo(this.startX, this.startY)
					this.context.lineTo(startX1, startY1)
					this.context.stroke()
					
					this.startX = startX1;
					this.startY = startY1;
					
				}
				
			    //只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>
				// #ifdef MP-WEIXIN
				wx.drawCanvas({
				         canvasId: 'myCanvas',
				         reserve: true,
				         actions: this.context.getActions() // 获取绘图动作数组
				      })
				// #endif
				
				// #ifdef MP-WEIXIN
				//这里的参数 true 非常重要，参考 https://uniapp.dcloud.io/api/canvas/CanvasContext?id=canvascontextdraw
				this.context.draw(true);
				// #endif
					  
			},
			  //手指触摸动作结束
			touchEnd: function () {
			    console.log('3333333333333333333');
			},
			
			
			//启动橡皮擦方法
			clearCanvas: function(){
			    if(this.isClear){
			        this.isClear = false;
			    }else{
			        this.isClear = true;
			    }
			},
			penSelect: function(e){ //更改画笔大小的方法
			    console.log(e.currentTarget);
			    this.pen = parseInt(e.currentTarget.dataset.param);
			    this.isClear = false;
			},
			colorSelect: function(e){ //更改画笔颜色的方法
			    console.log(e.currentTarget);
			    this.color = e.currentTarget.dataset.param;
			    this.isClear = false;
			}
	
		},
	}
</script>

<style>
	page{
	    height: 100%;
	}
	
	.container{
	    position: relative;
	    width: 100%;
	    height: 100%;
	}
	.canvas_area{
	    width: 100%;
	    height: 100%;
	    background-color: #F8F8F8;
	}
	.myCanvas{
	    width: 100%;
	    height: 100%;
	}
	
	.canvas_tools{
	    position: fixed;
	    left: 0;
	    bottom: 20rpx;
	    width: 100%;
	    height: 100rpx;
	    display: flex;
	    flex-direction: row;
	    justify-content: space-around;
	}
	
	.box{
	    width: 100rpx;
	    height: 100rpx;
	    border-radius: 50%;
	    background-color: rebeccapurple;
	}
	
	.box1{
	    background-color: #99cccc;
	    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAYAAAAbifjMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH3gUEFTU3owPJ+gAAArpJREFUSMeVlU9IVFEUxn/nvjdTaTQZYyaaZlEpIfhvkVSMSAmBFRZpYYugbcs2QbWpXUFKC3chLdpFUFHQpqxE2rQ0ahEp5BRm6TgqODP3tpg78nzznukHF+7lnfOd73zn8q7gw8jISGFbCzQCLvAGmANIJBKr4l3CcRqIAhVAFngRFKRCqu8ALtkCMeAyEPHFFBN40Am0Ajm7TgDNayrwMEeBi4ADGLu2ARf+24JFE9AR4kmdv40ggnPWAz/2Ad2BCjyMVbZSGHqtqSs5fgVdwIE1CFqBo6sUeKpvAc4TPplCTJ81uEhBM9Ae0KKf8DjQUGjD+7EH2G73WeAV8A54DoySHydAJXDGr6DK5/AjK/Uj8NKSP/EVi3sJOoH9dv8XGALmPQnTwCCQsudGIFEg2Ex+9gVj5m2CH0kgbfdRa3hEAW3AEU9gHDgUQFAPlHnOHUCLIn/v454PJcANOxUFiJV83Y6xgAqg3wVOBlRrB54BY4AGDpP/wfjRrYAHHnO8qLZ99oUkp4EhZd29AyyzfuSAe8B9ZSUOAgN2vx48BO4CWac1vsTS3HSurffKh9mpHzsRaRFRIqIIWko5T8t2H7w6/np4Pjk+itw4tRdgl85lmsqq6ytr2rpuupFNdcba74XOZWeS42O3k5/Hvjpu9AvwTW6dbcAY0yMij0VEKaUcUcoxBrRe3ZExWhutsyLiGGOuiciAW3WsH7RRynGiNbW1amtpKQALi4tMTkz4SRT5W4gx2lHKwS0prwOjcdyIKd9TTywWAyCVSvF7SRWpWFGjNcpxcTPpGYwxOI5L+s9PJLOQH3I6zXJ6Bp3TxWYYMMYSTL4dBmMQEabeRxClVipkMpnQORoDogQ3szAL1nH/TRLCYQAl4IoIxs5srYRABgE3p/OPj5gNpeefLA3up++/CueNwgD8A0fm3rIoh3Y0AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA5LTE3VDE1OjIwOjM4KzA4OjAwDAwhawAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNC0wNS0wNFQyMTo1Mzo1NSswODowMMTKtgsAAABNdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDcuMC4xLTYgUTE2IHg4Nl82NCAyMDE2LTA5LTE3IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3Jn3dmlTgAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABl0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQAMTA2Mx0uiBoAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANTM3XiCV0QAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxMzk5MjExNjM1VZFQ9AAAABJ0RVh0VGh1bWI6OlNpemUAMTguNEtCh1extQAAAF90RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvd3d3cm9vdC9zaXRlL3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE2MDIvMTE2MDI0NC5wbmcC2t7tAAAAAElFTkSuQmCC) ;
	    background-repeat:no-repeat;
	    background-position: center;
	}
	
	.box2{
	    background-color: #0099cc;
	    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAeCAMAAAAvtQ9FAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACf1BMVEUAAAB8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiNINiWHUyJ+TyN9TyN9TyN9TyN9TyN+TyOPVyJBMyYoKCgpKChaPyVkQyVjQyVjQyVjQyVjQyVTPCYmJygoKCgfHx8eHh4fHx4gHx4gHx4gHx4gHx4gHx4eHh4eHh4fHx8TExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExIHBwcHBwcHBwcHBwd8TiMTExITExITExITExIHBwf////3ECwAAAAAznRSTlMAAAAARX4EAAAAAFLkqwIAAAAAVOv/vQkAAAA54v//4CEAAAARvP////1qAAAAAGj9/////9o1AAAAFMb/////2WgXAE70//////7BLI///////6O+/////+fY///84f///dz///HI/////9Wl/////6hy/f///G056////+YxDr7/////sggAcv////1hAAAg3P/////JEwBMTLj//v7//pxKS+j7+//////++vvi1f///////////83V///O1f//ztX//87V///O1f//zSidjOsAAAABYktHRNQJuwuFAAAAB3RJTUUH3gUEFTU21AT5bAAAAS9JREFUGNNjYGBgZGJmYWVjZwABDk4ubh5ePn4QW0BQSFhEVExcAsSRlJKWkZWTV1BUAnKUVVTV1DU0tbR1dBkY9PQNDI2MTUzNzC0sGaysbWzPnbOzd3B0cmZwcXU7d+6cu4enl7cPg6+f/zkQCAgMCmYICQ0Dc86FR0QyREWfg4KYWIa4eBgnIZEhKRnGSUllSEvPgLAzs7IZcnLzIJz8gkKGouISCKe0rJyhorIKzK6uqa1jqG9obAJxmlta2xjaOzq7QBLdPb19DP0TJk6aPHnylKnTps9gmDlr9py58+bNX7Bw0WKGJUuXLV+xcuWq1WvWrmNYv2Hjps1btmzdtn3HToZdu89DwZ69DPv2X4CCAwfxcA4dvggFR44yHDt+CQpOnGQ4dfoyFJw5CwBZdsIQZAP16AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0wOS0xN1QxNToyMDozOCswODowMAwMIWsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTQtMDUtMDRUMjE6NTM6NTQrMDg6MDBivb2/AAAATXRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA3LjAuMS02IFExNiB4ODZfNjQgMjAxNi0wOS0xNyBodHRwOi8vd3d3LmltYWdlbWFnaWNrLm9yZ93ZpU4AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAZdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADEwNjMdLogaAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADQyNaj3r4sAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTM5OTIxMTYzNCKWYGIAAAASdEVYdFRodW1iOjpTaXplADEyLjdLQs+hF00AAABfdEVYdFRodW1iOjpVUkkAZmlsZTovLy9ob21lL3d3d3Jvb3Qvc2l0ZS93d3cuZWFzeWljb24ubmV0L2Nkbi1pbWcuZWFzeWljb24uY24vc3JjLzExNjAyLzExNjAyNDMucG5nsPoC/QAAAABJRU5ErkJggg==) ;
	    background-repeat:no-repeat;
	    background-position: center;
	}
	
	.box3{
	    background-color: #cc0033;
	}
	
	.box4{
	    background-color: #ff9900;
	}
	
	.box5{
	    background-color: #cccccc;
	    background-image: url(data:image/png;base64,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) ;
	    background-repeat:no-repeat;
	    background-position: center;
	}
</style>
