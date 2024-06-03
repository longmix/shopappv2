<template>
  <view>
	<view class="report_style_title">
		<view class=""style="display: flex;justify-content:flex-end; ">
				<title style="font-size: 30rpx;">完工工单个数排行</title>
					<view class="" style="padding-left: 100rpx;">
						<u-tabs 
							:list="list"
							:scrollable="false"
							:current="current1"
							@change="change1"
							>
						</u-tabs>
					</view>
				</view>
				<canvas canvas-id="bar_charts1" id="bar_charts1" class="charts" />
				  
		</view>
		<view class="report_style_title">
			
				
				<view class=""style="display: flex;justify-content:flex-end; ">
					<title style="font-size: 30rpx;">完工工单金额排行</title>
					<view class="" style="padding-left: 100rpx;">
						<u-tabs 
							:list="list"
							:scrollable="false"
							@change="change2"
							>
						</u-tabs>
					</view>
				</view>
				<scroll-view
				
				
				>
					<canvas canvas-id="bar_charts2" id="bar_charts2" class="charts" @touchend="tap"/>
					
				</scroll-view>
				
				
		</view>
		<view class="report_style_title" >
			<view class="" style="display:flex;justify-content:flex-end;  ">
				<title style="font-size: 30rpx;">完工率排行</title>
				<view class="" style="padding-left: 190rpx;">
					<u-tabs 
						:list="list"
						:scrollable="false"
						@change="change3"
						>
					</u-tabs>
				</view>
			</view>
				
				<canvas canvas-id="bar_charts3" id="bar_charts3" class="charts" @touchend="tap"/>
				
		</view>
		<view class="report_style_title" >
			<view class="" style="display: flex; justify-content:flex-end;">
				<title style="font-size: 30rpx;">完工工单平均时长排行</title>
				  <view class="" >
				  	<u-tabs 
				  		:list="list"
				  		:scrollable="false"
				  		@change="change4"
						>
				  	</u-tabs>
				  </view>
			</view>			
			<canvas canvas-id="bar_charts4" id="bar_charts4" class="charts" @touchend="tap"/>
			
		</view>
		<view class="report_style_title" >
			<view class="" style="display: flex;justify-content:flex-end; ">
				<title style="font-size: 30rpx;">完工工单个数时间统计</title>
				<view class="" >
					<u-tabs 
						:list="list"
						:scrollable="false"
						@change="change5"
						>
					</u-tabs>
				</view>
			</view>
			
			<canvas canvas-id="line_charts1" id="line_charts1" class="charts"  :ontouch="true"/>
			 
			
		</view>
		<view class="report_style_title" >
			<view class="" style="display: flex;justify-content:flex-end;">
				<title style="font-size: 30rpx;">完工工单金额时间统计</title>
				  <view class="">
				  	<u-tabs 
				  		:list="list"
				  		:scrollable="false"
				  		@change="change6"
						
						 >
				  	</u-tabs>
				  </view>
			</view>
			
			<canvas canvas-id="line_charts2" id="line_charts2" class="charts" />
			
		</view>
		<view class="report_bottom">
			
		</view>
		<view class="">
			<abot-tab-bar :list="tabbar_list" :current_index="1" style="position:fixed;bottom:0;width:100%;left:0;right:0;"
				@tabChange="tabChange">
				</abot-tab-bar>
				
		</view>
	</view>
	
	
	
	
	
		
  </view>
</template>

<script>
	import abotTabBar from '@/components/abot-tabbar.vue'
	import work_flow_api from './common/work_flow_api.js'
	import './static/css/work_flow.css'


	import uCharts  from './common/u-charts.min.js';
	var uChartsInstance = {};

export default {
	components: {
		abotTabBar
	},
	
	data() {
		
		return {
			cWidth: 750,
			cHeight: 500,
			
			tabbar_list: work_flow_api.tabbar_list,
			
			
			list: [{
					name: '每月',
				}, {
					name: '每年',
				}, {
					name: '所有'
				}],
			current1 : 0,
			current2 : 0,
			current3 : 0,
			current4 : 0,
			current5 : 0,
			current6 : 0,
			// 滑动设置
			startData: {
				clientX: 0,
				clientY: 0
			},
			curindex: 0,
			moveX: 0,
			touch: {},
		};
	},
	onLoad() {
		
	},
	onReady() {
		//这里的 750 对应 css .charts 的 width
		this.cWidth = uni.upx2px(750);
		//这里的 500 对应 css .charts 的 height
		this.cHeight = uni.upx2px(500);
		this.getServerData_type01(1, 1, 'ticket_count', "工单数量", 'bar_charts1');
		this.getServerData_type01(2, 1, 'ticket_count', "工单金额", 'bar_charts2');
		this.getServerData_type01(3, 1, 'finish_percent', "工单完工百分比", 'bar_charts3');
		this.getServerData_type01(4, 1, 'average_timespan', "工单完工平均时长", 'bar_charts4');
		this.getServerData_type02(5, 1, 'ticket_count', "工单完工工单个数", 'line_charts1');
		this.getServerData_type02(6, 1, 'ticket_count', "工单完工工单金额", 'line_charts2');
	},
	methods: {
		tabChange(index) {
			console.log('tabChange===>>>', index);
			var tabbar_item = this.tabbar_list[index];
			if(!tabbar_item){
				console.log('没有index索引');
				return;
			}
			
			var new_url = tabbar_item.new_url;
			
			console.log('准备通过tabbar跳转到==>>', new_url);
			
			this.abotapi.call_h5browser_or_other_goto_url(new_url);
		},
		change1(index)
		{
			// console.log('index==>>', index);
			this.current1 = index.index
			this.getServerData_type01(1, this.current1+1, 'ticket_count', "工单数量", 'bar_charts1');
		},
		change2(index)
		{
			this.current2 = index.index
			// todo 这里不是ticket 应该是对应金额的变量
			this.getServerData_type01(2, this.current2+1, 'ticket_count', "工单金额", 'bar_charts1');
		},
		change3(index)
		{
			this.current3 = index.index
			this.getServerData_type01(3, this.current3+1, 'finish_percent', "工单完工百分比", 'bar_charts3');
		},
		change4(index)
		{
			this.current4 = index.index
			this.getServerData_type01(4, this.current4+1, 'average_timespan', "工单完工平均时长", 'bar_charts4');
		},
		change5(index)
		{
			this.current5 = index.index
			this.getServerData_type02(5, this.current5+1, 'ticket_count', "工单完工工单个数", 'line_charts1');
		},
		change6(index)
		{
			this.current6 = index.index
			this.getServerData_type02(6, this.current6+1, 'ticket_count', "工单完工工单金额", 'line_charts2');
		},
		getServerData_type01(report_type, time_type, series_data_name, series_name, chart_cavans_name) {
			// 请求接口
			var that = this;
			
			work_flow_api.check_user_login((app_token)=>{
				if(!app_token){
					console.log('获取用户的登录token失败');
					return;
				}
				
				var user_token = app_token.token;
				
				var post_data={
					token:user_token,
					// report_time_type : this.current_list_report_time_type,
					report_type: report_type,
					// 1为月 2为年 3为所有
					report_time_type : time_type
				}
				work_flow_api.abotRequest({
					// 请求表单API
					url:  work_flow_api.work_flow_server + '/?g=API&m=Ticket&a=report_list',
					data: post_data,
					success:(res)=>{
						
						console.log('getServerData_type01 =====>>>>', res.data);
						
						// console.log("data ---->>>>>" ,data)
						
						if(!res.data){
							return;
						}
						
						if(!res.data.data){
							return;
						}
						
						var report_fin = res.data.data;
						
						console.log('getServerData_type01 report_fin =====>>>>', report_fin);
						//console.log('getServerData_type01 report_fin length =====>>>>', report_fin.length);
						
						
						var categories01 = [];
						var series_data = [];
						
						//for(var i=0; i<report_fin.length; i++){
						for(var i in report_fin){
							var item001 = report_fin[i];
							
							// console.log('getServerData_type01 item001 =====>>>>', item001);
							
							categories01.push(item001.user_name);
							series_data.push(item001[series_data_name]);  // 'ticket_count'
						}
						
						console.log('categories01 ===>>> ', categories01);
						console.log('series_data ===>>> ', series_data);
						
						
						var column_res1 = {
								categories: categories01,
								series:[
									{
										name:series_name, //"工单数量",
										data:series_data,
									}
								]
							};
						
						console.log('column_res1 ===>>> ', column_res1);
						
						
						// chart_cavans_name ==>>> 'bar_charts1'
						that.draw_Bar_Charts(chart_cavans_name, column_res1);
						
					}
				});
				
			});
			
		},
		getServerData_type02(report_type, time_type, series_data_name, series_name, chart_cavans_name){
		var that = this;
		
		work_flow_api.check_user_login((app_token)=>{
			if(!app_token){
				console.log('获取用户的登录token失败');
				return;
			}
			
			var user_token = app_token.token;
			
			var post_data={
				token:user_token,
				// report_time_type : this.current_list_report_time_type,
				report_type: report_type,
				// 1为月 2为年 3为所有
				report_time_type : time_type,
			}
			work_flow_api.abotRequest({
				// 请求表单API
				url:  work_flow_api.work_flow_server + '/?g=API&m=Ticket&a=report_list',
				data: post_data,
				success:(res)=>{
					
					console.log('getServerData_type02 =====>>>>', res.data);
					
					// console.log("data ---->>>>>" ,data)
					
					if(!res.data){
						return;
					}
					
					if(!res.data.data){
						return;
					}
					
					var report_fin = res.data.data;
					
					// console.log('getServerData_type02 report_fin =====>>>>', report_fin);
					console.log('getServerData_type02 report_fin length =====>>>>', report_fin.length);
					
					
					var categories02 = [];
					var series_data = [];
					
					//for(var i=0; i<report_fin.length; i++){
					
					
					for(var i in report_fin){
						var item002 = report_fin[i];
						
						// console.log('getServerData_type02 item002 =====>>>>', item002);
						
						categories02.push(item002.date_str);
						series_data.push(item002[series_data_name]);  // 'ticket_count'
					}
					
					
					console.log('categories02 ===>>> ', categories02);
					console.log('series_data ===>>> ', series_data);
					
					
					var line_res1 = {
							categories: categories02,
							series:[
								{
									name:series_name, //"工单数量",
									data:series_data
								}
							]
						};
					
					console.log('line_res1 ===>>> ', line_res1);
					
					
					// chart_cavans_name ==>>> 'bar_charts1'
					that.draw_Line_Charts(chart_cavans_name, line_res1);
					
				}
			});
			
		});
			
		},
		draw_Bar_Charts(id,data){
		  const ctx = uni.createCanvasContext(id, this);
		  uChartsInstance[id] = new uCharts({
			type: "bar",
			context: ctx,
			width: this.cWidth,
			height: this.cHeight,
			categories: data.categories,
			series: data.series,
			animation: true,
			background: "#FFFFFF",
			color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
			padding: [10,60,0,0],
			legend: {},
			xAxis: {
				boundaryGap: "justify",
				disableGrid: false,
				min: 0,
				axisLine: false,
				max: 40,
				itemCount: 6,
			},
			yAxis: {
				itemCount: 6,
			},
			enableScroll:true,
			extra: {
			  bar: {
			    type: "group",
			    width: 30,
			    meterBorde: 1,
			    meterFillColor: "#FFFFFF",
			    activeBgColor: "#000000",
			    activeBgOpacity: 0.08,
			    linearType: "custom",
			    barBorderCircle: true,
			    seriesGap: 2,
			    categoryGap: 2
			  }
			}
		  });
		  
		  
		  // uChartsInstance[id] = new uCharts({
		  //     type: "column",
		  //     context: ctx,
		  //     width: this.cWidth,
		  //     height: this.cHeight,
		  //     categories: data.categories,
		  //     series: data.series,
		  //     animation: true,
		  //     background: "#FFFFFF",
		  //     color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
		  //     padding: [15,15,0,5],
		  //     enableScroll: true,
		  //     legend: {},
		  //     xAxis: {
		  //       disableGrid: true,
				// itemCount:6,
				// scrollShow: true, 
		  //     },
		  //     yAxis: {
		  //       data: [
		  //         {
		  //           min: 0
		  //         }
		  //       ]
		  //     },
		  //     extra: {
		  //       column: {
		  //         type: "group",
		  //         width: 30,
		  //         activeBgColor: "#000000",
		  //         activeBgOpacity: 0.08
		  //       }
		  //     }
		  //   });
		},

		draw_Line_Charts(id,data){
		  const ctx = uni.createCanvasContext(id, this);
		  uChartsInstance[id] = new uCharts({
			type: "line",
			    context: ctx,
			    width: this.cWidth,
			    height: this.cHeight,
			    categories: data.categories,
			    series: data.series,
			    animation: true,
			    background: "#FFFFFF",
			    color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
			   padding: [10,60,0,0],
			    enableScroll: false,
			    legend: {},
				enableScroll:true,
			    xAxis: {
			      disableGrid: true,
				  itemCount: 6,
			    },
			    yAxis: {
			      gridType: "dash",
			      dashLength: 2
			    },
			    extra: {
			      line: {
			        type: "curve",
			        width: 2,
			        activeType: "hollow"
			      }
			    }
		  });
		},
		tap(e){
		  // uChartsInstance[e.target.id].touchLegend(e);
		  // uChartsInstance[e.target.id].showToolTip(e);
		},
		start(e) {
			console.log('11111111111 ===>>> ');
			this.transition = '.1s'
			this.startData.clientX = e.changedTouches[0].clientX;
			this.startData.clientY = e.changedTouches[0].clientY;
		},
		end(e) {
			this.moveX = 0;
			this.transition = '.5s'
			const subX = e.changedTouches[0].clientX - this.startData.clientX;
			const subY = e.changedTouches[0].clientY - this.startData.clientY;
			if (subY > 50 || subY < -50) {
				console.log('上下滑动')
			} else {
				if (subX > 100) {
					console.log("右滑动")
					this.changeCurindex(2)
				} else if (subX < -100) {
					console.log("左滑动")
					this.changeCurindex(1)
				} 
			}
		},
		// 根据传入参数判断是左滑还是右滑更改下标,1为左滑，2为右滑
		changeCurindex(type) {
			var that = this;
			const listLength = 200;
			const curindex = this.curindex
			if (curindex < listLength) {
				switch (type) {
					case 1:
						if (listLength - curindex == 1) {
							this.curindex = this.curindex
						} else {
							this.curindex++;
						}
						break;
					case 2:
						if (this.curindex == 0) {
							this.curindex = 0;
						} else {
							this.curindex--;
						}
				}
			}
		},
		move(e) {
			let touch = e.touches[0];
			this.touch = touch;
			let data = touch.clientX - this.startData.clientX;
			this.moveX = data;
			console.log(data, "data")
			if (touch.clientX < this.startData.clientX) { //向左移动
				if (data < -250) {
					data = -250;
				}
			}
			if (touch.clientX < this.startData.clientX) { //向右移动
				if (this.moveX == 0) {
					data = 0
				} else {
					if (data > 50) {
						data = 50;
					}
				}
			}
			this.renderCanvas();
		},
		renderCanvas() {
		      const ctx = uni.createCanvasContext('slideCanvas', this);
		      // 清除画布
		      ctx.clearRect(0, 0, 800, 500);
		      // 绘制滑动后的canvas内容
		      // ...
		      // 将之前绘制的内容平移到新位置
		      ctx.translate(-this.moveX, 0);
		      // 重新绘制需要展示的内容
		      // ...
		      ctx.draw();
		    }
	}
};
</script>

<style scoped lang="scss">
  .charts{
    width: 1800rpx;
    height: 500rpx;
	
  }
  .report_style{
	  background-color:$u-bg-color;
	  
	  &_title{
		background-color: #FFFFFF; /* 背景色 */
		border: 1rpx solid  #DDDDDD; /* 边框宽度、样式和颜色 */
		border-radius: 16rpx; /* 可选：圆角边框 */
		padding: 20rpx; /* 内边距 */
		margin: 20rpx; /* 外边距 */  

	  }
	  
  }
  .report_bottom{
	  padding: 40rpx;
  }
</style>