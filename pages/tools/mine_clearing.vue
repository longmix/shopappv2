<template>
	<view>
		<view class="container">
		    <icon id="icon-about" type="info" size="28" color="#007aff" @click="showinput"/>
				<view v-if="isShow" >
					<input class="num" type="number" placeholder="排数" />
					<input class="num" type="number" placeholder="列数" />
					<input class="num" type="number" placeholder="雷数" />
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
		
		  <button class="setbtn" type="primary" @click="goset">设置游戏难度</button>
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
				
				isShow:false,
				
			}
		},
		onLoad(options) {
			var that = this;
			
			uni.setNavigationBarTitle({
				title: '扫雷'
			})
			
			
			//读取设置项，如果没有设置项则使用默认的app_row,app_column,app_bomb,
				
				
	
			
			this.abotapi.set_option_list_str(that, function(that001, option_list) {
				//that001.abotapi.getColor();
				
				console.log('option_list=====>>>>', option_list);
	
				
				
			});
	
		},
		//onReady生命周期函数，监听页面初次渲染完成
		onReady: function(){
			var that = this
			that.setgamearr(this.app_row, this.app_column, this.app_bomb)
			that.count = this.app_row*this.app_column;
		},
		//页面卸载，清除画布绘制计时器
		onUnload:function(){
			
		},
		methods: {
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
					
					this.isShow = !this.isShow;
					
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
		border:Solid 1px #f5f5f5;
		}
	.game .tr{ 
		display: flex; 
		flex-direction:row; 
		}
	.game .td{  
		border:Solid 2px #f5f5f5; 
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
		}
	.num{
		border: 1px solid #000000;
		margin-bottom: 20rpx;
	}
	.hint{
		margin-bottom: 40rpx;
	}
	#icon-about{
	  position: absolute; 
	  right: 3vw;
	  top: 3vw;
	}
</style>
