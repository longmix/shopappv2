<template>
	<view>
		<view class="container">
		    <icon id="icon-about" type="info" size="28" color="#007aff" @click="showinput"/>
				<view v-if="isShowPopup" @tap="isShowPopup = false" class="show_modal_mask"></view>
				<view v-if="isShowPopup" class="show_modal_pop" >
					<form @submit="formSubmit">
						<view class="pop-bg">
							<view class="option">设置选项</view>
							<view class="weui-cell">
							           <view class="weui-cell__hd"><label class="weui-label">排数</label></view>
							           <view class="weui-cell__bd">
							               <input class="weui-input"  type="number" v-model="paishu" ></input>
							           </view>
							     </view>
							<view class="weui-cell">
							           <view class="weui-cell__hd"><label class="weui-label">列数</label></view>
							           <view class="weui-cell__bd">
							               <input class="weui-input"  type="number" v-model="lieshu" ></input>
							           </view>
							     </view>
							<view class="weui-cell">
							           <view class="weui-cell__hd"><label class="weui-label">雷数</label></view>
							           <view class="weui-cell__bd">
							               <input class="weui-input" type="number" v-model="leishu" ></input>
							           </view>
							     </view>
							<button :style="{backgroundColor: wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color}" class="btn-row-submit" formType="submit">保存</button>
						</view>
					</form>
				</view>
		    <view class="hint">移动端无法标记雷，将不是雷的模块全部翻出为胜</view>
		  
		    <view class="game">
				<view class="tr" v-for="(itemrow, row) in gamearr" :key="row">
		        <view class="td" v-for="(itemcolumn, column) in itemrow" :key="column" :data-row="row" :data-column="column" @click="taphandler">
		        <view class="mask" v-if="itemcolumn.switch"></view>
		        <text v-if="itemcolumn.val==''">{{itemcolumn.val}}</text>
		        <text class="color1" v-else-if="itemcolumn.val==1">{{itemcolumn.val}}</text>
		        <text class="color2" v-else-if="itemcolumn.val==2">{{itemcolumn.val}}</text>
		        <text class="color3" v-else >{{itemcolumn.val}}</text>
		      </view>
		    </view>
		    <view class="dialog warn" v-if="gamewarn">
		      <icon type="warn" size="60" color="orange"></icon>
		      <text>Game Over</text>
		      <button @click="reset">重新开始</button>
		    </view>
		    <view class="dialog success" v-if="gamesuccess">
		      <icon type="success" size="60" color="green"></icon>
		      <text>Success~</text>
		      <button @click="reset">重新开始</button>
		    </view>
		  </view>
		
		  <button class="setbtn" type="primary" :style="{backgroundColor: wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color}" @click="goset">设置游戏难度</button>
		</view>
		
	</view>
</template>

<script>
	import Thunder from './utils/mine_clearing_util.js'
	

	export default {
	
		data() {
			return {
	
				wxa_shop_nav_bg_color: '',
				wxa_shop_nav_font_color: '',
				
				userInfo: {},
				gamewarn:false,
				gamesuccess:false,
				count:null,
				gamearr:[],
				
				app_row:10,
				app_column:10,
				app_bomb:10,
				
				isShowPopup:false,
				
				paishu:'',
				lieshu:'',
				leishu:'',
				
				
			}
		},
		onLoad(options) {
			var that = this;
			
			uni.setNavigationBarTitle({
				title: '扫雷'
			})
			
			
			//读取设置项，如果没有设置项则使用默认的app_row,app_column,app_bomb,
			
			
			this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
	
			
			this.abotapi.set_option_list_str(that, function(that001, option_list) {
				//that001.abotapi.getColor();
				
				console.log('option_list=====>>>>', option_list);
	
				
				
			});
	
		},
		//onReady生命周期函数，监听页面初次渲染完成
		onReady: function(){
			var that = this
			that.setgamearr(this.app_row, this.app_column, this.app_bomb);
			that.count = this.app_row*this.app_column;
		},
		//页面卸载，清除画布绘制计时器
		onUnload:function(){
			
		},
		methods: {
			
			//根据后台动态渲染
			callback_function_shop_option_data:function(that,cb_params){
				
				if(!cb_params){
				    return;
				   }
				   
				   
				   console.log('cb_params====', cb_params);
				   
				   that.wxa_shop_nav_bg_color  = cb_params.option_list.wxa_shop_nav_bg_color;
				   that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
			},
			
			  setgamearr:function(row,column,bomb){//根据行列设置游戏二维数组（地图）
			    var that=this;
			    var arrmap=[];//二维初始数组，全为空
			    for(var i=row-1;i>=0;i--){
			      arrmap[i]=[];
			      for(var j=column-1;j>=0;j--){arrmap[i][j]={val:"",switch:true,sign:false};}
			    }
			    console.log(arrmap)
			    var arr=[];//一维自然数
			    for(var k=row*column-1;k>=0;k--){arr[k]=k}
			    //随机炸弹位置
			    for(var h=bomb-1;h>=0;h--){
			      var seat=arr.splice(Math.floor(Math.random()*arr.length),1)[0]
			      var r=Math.floor(seat/column),c=Math.floor(seat%column);

			      arrmap[r][c].val="B";
			      arrmap=that.addcount(r,c,arrmap)//给炸弹周围九宫格增加标记数
			    }
			    that.gamearr = arrmap;
			  },
			
			  //游戏渲染部分
			  addcount:function(r,c,arrmap){
			    var that=this;
			    if(r-1>=0){//九宫格上三个
			        if(c-1>=0 && arrmap[r-1][c-1].val!="B"){arrmap[r-1][c-1].val++}
			        if(arrmap[r-1][c].val!="B"){arrmap[r-1][c].val++}
			        if(c+1<this.app_column && arrmap[r-1][c+1].val!="B"){arrmap[r-1][c+1].val++}
			      }
			      if(r+1<this.app_row){//九宫格下三个
			        if(c-1>=0 && arrmap[r+1][c-1].val!="B"){arrmap[r+1][c-1].val++}
			        if(arrmap[r+1][c].val!="B"){arrmap[r+1][c].val++}
			        if(c+1<this.app_column && arrmap[r+1][c+1].val!="B"){arrmap[r+1][c+1].val++}
			      }
			      //九宫格左右两个
			      if(c-1>=0 && arrmap[r][c-1].val!="B"){arrmap[r][c-1].val++}
			      if(c+1<this.app_column && arrmap[r][c+1].val!="B"){arrmap[r][c+1].val++}
			      return arrmap;
			  },
			
			
			  //游戏控制部分
			  taphandler:function(e){
			    var that=this;
			    var r=e.currentTarget.dataset.row,c=e.currentTarget.dataset.column;
			    if(that.gamearr[r][c].val!="B"){//如果没点到炸弹
			      that.gamearr[r][c].switch=false;
			      that.count--;
			      that.count = that.count;
			
			      if(that.count==this.app_bomb){
					  that.gamesuccess = true;
					  }
			      if(that.gamearr[r][c].val==""){//如果点到的是0,将它周围的四个打开
			        that.gamearr=that.show4(r,c,that.gamearr)
			      }
			     
			    }else{
			      that.gamewarn = true;
			    }
			    that.gamearr = that.gamearr;
			  },
			
			  show4:function(r,c,arrmap){//显示周边的0
			    var that=this;
			    if(r-1>=0 && arrmap[r-1][c].val==""){//上
			        if(arrmap[r-1][c].switch){
			          arrmap[r-1][c].switch=false;
					  that.count--;
					  that.count = that.count;
			          that.show4(r-1,c,arrmap)//递归
			        }
			      }
			      if(r+1<this.app_row && arrmap[r+1][c].val==""){//下
			        if(arrmap[r+1][c].switch){
			          arrmap[r+1][c].switch=false;
					  that.count--;
					  that.count = that.count;
			          that.show4(r+1,c,arrmap)//递归
			        }
			      }
			      if(c-1>=0 && arrmap[r][c-1].val==""){//左
			        if(arrmap[r][c-1].switch){
			        arrmap[r][c-1].switch=false;
					that.count--;
					that.count = that.count;
			        that.show4(r,c-1,arrmap)//递归
			      }}
			      if(c+1<this.app_column && arrmap[r][c+1].val==""){//右
			        if(arrmap[r][c+1].switch){
			        arrmap[r][c+1].switch=false;
					that.count--;
					that.count = that.count;
			        that.show4(r,c+1,arrmap)//递归
			      }}
			      return arrmap;
			  },
			goset:function(){//游戏设置
			      uni.switchTab({url: '../set/set'});
			},
			reset:function(){//console.log("重新开始")
			  var that=this;
			  that.setgamearr(this.app_row, this.app_column, this.app_bomb)
			  that.count = this.app_row*this.app_column;
			  that.gamewarn = false;
			  that.gamesuccess = false;
			},
			showinput:function(){
				
				this.isShowPopup = !this.isShowPopup;
				
			},
			formSubmit:function(e){
				var that = this;
				
				console.log('1111111=========',that.app_row)
				
				if( (this.paishu >= 2) && (this.paishu <= 10)) {
					
					that.app_row = that.paishu;
					
				}
				else{
					uni.showModal({
						
						title:'提示',
						content:"排数必须在2~10之间",
						showCancel:false,
						
					});
					
					return;
				}
				
				if( (this.lieshu >= 2) && (this.lieshu <= 10)) {
					
					that.column = that.lieshu;
					
				}else{
					uni.showModal({
						
						title:'提示',
						content:"列数必须在2~10之间",
						showCancel:false,
						
					});
					
					return;
				}
				
				if(this.leishu > 0){
					
					that.app_bomb = that.leishu;
					
				}
				else{
					uni.showModal({
						
						title:'提示',
						content:"雷数必须大于0",
						showCancel:false,
						
					});
					
					return;
				}
				
				uni.showModal({
					
					title:'提示',
					content:"设置成功",
					showCancel:false,
					
				});
				
				that.isShowPopup = false;  //关闭窗口
				
				that.setgamearr(that.app_row, that.app_column, that.app_bomb);
				that.count = that.app_row*that.app_column;
				
			}
	
		},
	}
</script>

<style>
	
	.game { 
		display: flex;
		justify-content:center;
		flex-direction:column;
		position: relative;
		border:Solid 2rpx #f5f5f5;
		align-items: center;
		margin-bottom: 40rpx;
		}
	.game .tr{ 
		display: flex; 
		flex-direction:row; 
		}
	.game .td{  
		border:Solid 4rpx #f5f5f5; 
		width:50rpx; 
		height:50rpx;
		line-height:50rpx;
		text-align: center; 
		position:relative; 
		background: none;
		}
	.game .td .mask{
		position: absolute; 
		top:0; left: 0; 
		display: block; 
		width: 40rpx; 
		height:40rpx; 
		background: #bbb; 
		border-width: 5rpx; 
		border-style: solid; 
		border-color: #ddd #999 #999 #ddd;  
		}
	.game .td .color1{ 
		color: blue;
		}
	.game .td .color2{ 
		color: orange;
		}
	.game .td .color3{ 
		color: red;
		}
	
	.game .dialog{ 
		position: absolute; 
		width: 100%; 
		height:100%; 
		background: rgba(0,0,0,0.8); 
		display: flex;
		justify-content: center; 
		align-items: center; 
		flex-direction:column; 
		}
	.game .warn{
		color:orange;
	}
	.game .success{
		color:green;
		}
	
	.setbtn{ 
		display: block; 
		margin: 50rpx 0;
		width: 80%;
		margin: 0 auto;
		}
	.num{
		border: 1px solid #000000;
		width: 100rpx;
		margin: 20rpx 70rpx;
	}
	.hint{
		margin-bottom: 40rpx;
	}
	#icon-about{
	  position: absolute; 
	  right: 3vw;
	  top: 3vw;
	  top: -120rpx;
	}
	.show_modal_mask{
		background-color: #000;
		opacity: 0.7;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
	}
	.show_modal_pop{
		position: fixed;
		z-index: 999;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.pop-bg{
		background-color: #FFFFFF;
		width: 500rpx;
		height: 540rpx;
	}
	.pop-up{
		display: flex;
		height: 100rpx;
		line-height: 100rpx;
		transform: translateX(25%);
	}
	.option{
		text-align: center;
		font-weight: bold;
		padding-top: 20rpx;
		margin-bottom: 40rpx;
	}
	.btn-row-submit {
		width: 80%;
	    margin-top: 22rpx;
		background-color: #2e85d8;
	}
	.weui-cell {
	    padding: 20rpx 30rpx;
	    position: relative;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	    font-size: 30rpx;
	}
	
	.weui-label {
	    display: block;
	    width: 100rpx;
	    word-wrap: break-word;
	    word-break: break-all;
		
	}
	.weui-cell__bd {
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    flex: 1;
		background-color:#fff;
		border:2rpx solid #17A8E2;
		border-radius:42rpx;
		padding: 5rpx;
	}
	.weui-input {
	    width: 90%;
	    border: 0;
	    outline: 0;
	    -webkit-appearance: none;
	    background-color: transparent;
	    font-size: inherit;
	    color: inherit;
		padding-left: 20rpx;
		height: 50rpx;
		line-height: 50rpx;
	}
	.container{
		margin: 200rpx 20rpx 0 20rpx;
		text-align: center;
	}
</style>
