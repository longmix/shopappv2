<!-- 工单列表 -->
<template>
	<view class="" >
		<!-- 固定顶部 -->
		
		<u-tabs :list="list_tabber" :is-scroll="false" :current="current_tab_index" @change="change_tab_index"></u-tabs>
		
		<view class="search_tab" padding=10rpx>
			<view class="search_tab_bar">
				<u-search
					v-model="search_keywords"
					:show-action="false"
					shape="round"
					clearable>
				</u-search>
			</view>
			<view class="search_tab_button">
				<u-button
					type="success" @click="search_ticket_list">	
					搜索
				</u-button>
			</view>
			
						
		</view>
		
		
		<view class="button_tab"	v-if="current_tab_index != null" 	style="display: flex;">
			
			
			
			<button	class="u_button">预约日期</button>
			
			<button	class="u_button">报单日期</button>
			
			<button	class="u_button">客户</button>
			
			<button	class="u_button">接单人</button>
			
		</view>
		
		
		<!-- 全部分类 -->
		<view class=""	v-if="current_tab_index == 0">
			<view>
				<view class="u-skeleton-slot__content">
					<view v-for="(flow_item , index) in flow_tab" :key="index" 	
					@click="gotoflow_xinxi(flow_item.ticket_number,flow_item.ticket_model_number)">
						<view class="u-demo-block__content"	style="height: 160rpx;width: 630rpx;background-color: #ffffff;border-radius: 20rpx;margin: 0 auto;margin-top: 20rpx;padding: 20rpx 40rpx;">
										<u-skeleton
											rows="2"
											title
											:loading="switch_tab"
											avatar
											rowsHeight="14"
										>
											<!-- 需要在外部多嵌套一层占位view，否则在nvue下会导致样式失效 -->
											<view>
												<view class="u-skeleton-slot">
													<view class="u-skeleton-slot__content" >
														<view class=""	style="display: flex;">
															<u--text
															:text="flow_item.ticket_title"
																type="main"
																:bold="true"
																size="16"
																lines="1"
															></u--text>
															<u-tag :text="flow_item.ticketStatus" plain plainFill bgColor="#ffffff" color="#609dff" borderColor="#ffffff"
															@click="gotoflow_xinxi(flow_item.ticket_number,flow_item.ticket_model_number)"></u-tag>
														</view>
														
														<u--text
															type="main"
															size="14"
															customStyle="margin-top: 5px"
															:text="flow_item.user_name"
														></u--text>
														<u--text
															type="main"
															size="14"
															customStyle="margin-top: 5px"
															:text="flow_item.ticket_submit_time"
														></u--text>
													</view>
												</view>
											</view>
										</u-skeleton>
									</view>
						
					</view>
				</view>
			</view>
		</view>
		<!-- 全部分类===end -->
		
		
		<!-- 新工单分类 -->
		<view class=""	v-if="current_tab_index == 1 ">
			<view>
				<view class="u-skeleton-slot__content">
					<view v-for="(flow_item , index) in flow_tab" :key="index" 
					@click="gotoflow_xinxi(flow_item.ticket_number,flow_item.ticket_model_number)">
						<view class="u-demo-block__content"	v-if="flow_item.ticket_status == 0" style="height: 160rpx;width: 630rpx;background-color: #ffffff;border-radius: 20rpx;margin: 0 auto;margin-top: 20rpx;padding: 20rpx 40rpx;">
										<u-skeleton
											rows="2"
											title
											:loading="switch_tab"
											avatar
											rowsHeight="14"
										>
											<!-- 需要在外部多嵌套一层占位view，否则在nvue下会导致样式失效 -->
											<view>
												<view class="u-skeleton-slot">
													<view class="u-skeleton-slot__content">
														<view class=""	style="display: flex;">
															<u--text
																:text="flow_item.ticket_title"
																type="main"
																:bold="true"
																size="16"
																lines="1"
															></u--text>
															<u-tag :text="flow_item.ticketStatus" plain plainFill bgColor="#ffffff" color="#609dff" borderColor="#ffffff"
															@click="gotoflow_xinxi(flow_item.ticket_number,flow_item.ticket_model_number)"></u-tag>
														</view>
														
														<u--text
															type="main"
															size="14"
															customStyle="margin-top: 5px"
															:text="flow_item.user_name"
														></u--text>
														<u--text
															type="main"
															size="14"
															customStyle="margin-top: 5px"
															:text="flow_item.ticket_submit_time"
														></u--text>
													</view>
												</view>
											</view>
										</u-skeleton>
									</view>
						
					</view>
				</view>
			</view>
		</view>
		<!-- 新工单分类===end -->
		
		
		<!-- 受理中分类 -->
		<view class=""	v-if="current_tab_index == 2">
			<view>
				<view class="u-skeleton-slot__content">
					<view v-for="(flow_item , index) in flow_tab" :key="index" 
					@click="gotoflow_xinxi(flow_item.ticket_number,flow_item.ticket_model_number)">
						<view class="u-demo-block__content"	v-if="flow_item.ticket_status == 1" style="height: 160rpx;width: 630rpx;background-color: #ffffff;border-radius: 20rpx;margin: 0 auto;margin-top: 20rpx;padding: 20rpx 40rpx;">
										<u-skeleton
											rows="2"
											title
											:loading="switch_tab"
											avatar
											rowsHeight="14"
										>
											<!-- 需要在外部多嵌套一层占位view，否则在nvue下会导致样式失效 -->
											<view>
												<view class="u-skeleton-slot">
													<view class="u-skeleton-slot__content">
														<view class=""	style="display: flex;">
															<u--text
																:text="flow_item.ticket_title"
																type="main"
																:bold="true"
																size="16"
																lines="1"
															></u--text>
															
															<u-tag :text="flow_item.ticketStatus" plain plainFill bgColor="#ffffff" color="#609dff" borderColor="#ffffff"
															@click="gotoflow_xinxi(flow_item.ticket_number,flow_item.ticket_model_number)"></u-tag>
														</view>
														
														<u--text
															type="main"
															size="14"
															customStyle="margin-top: 5px"
															:text="flow_item.user_name"
														></u--text>
														<u--text
															type="main"
															size="14"
															customStyle="margin-top: 5px"
															:text="flow_item.ticket_submit_time"
														></u--text>
													</view>
												</view>
											</view>
										</u-skeleton>
									</view>
						
					</view>
				</view>
			</view>
		</view>
		<!-- 受理中分类 ===end -->
		
		
		<!-- 待回复分类 -->
		<view class=""	v-if="current_tab_index == 3">
			<view>
				<view class="u-skeleton-slot__content">
					<view v-for="(flow_item , index) in flow_tab" :key="index"  
					@click="gotoflow_xinxi(flow_item.ticket_number,flow_item.ticket_model_number)">
						<view class="u-demo-block__content"	v-if="flow_item.ticket_status == 2" style="height: 160rpx;width: 630rpx;background-color: #ffffff;border-radius: 20rpx;margin: 0 auto;margin-top: 20rpx;padding: 20rpx 40rpx;">
										<u-skeleton
											rows="2"
											title
											:loading="switch_tab"
											avatar
											rowsHeight="14"
										>
											<!-- 需要在外部多嵌套一层占位view，否则在nvue下会导致样式失效 -->
											<view>
												<view class="u-skeleton-slot">
													<view class="u-skeleton-slot__content">
														<view class=""	style="display: flex;">
															<u--text
																:text="flow_item.ticket_title"
																type="main"
																:bold="true"
																size="16"
																lines="1"
															></u--text>
															<u-tag :text="flow_item.ticketStatus" plain plainFill bgColor="#ffffff" color="#609dff" borderColor="#ffffff"
															@click="gotoflow_xinxi(flow_item.ticket_number,flow_item.ticket_model_number)"></u-tag>
														</view>
														
														<u--text
															type="main"
															size="14"
															customStyle="margin-top: 5px"
															:text="flow_item.user_name"
														></u--text>
														<u--text
															type="main"
															size="14"
															customStyle="margin-top: 5px"
															:text="flow_item.ticket_submit_time"
														></u--text>
													</view>
												</view>
											</view>
										</u-skeleton>
									</view>
						
					</view>
				</view>
			</view>
		</view>
		<!-- 待回复分类===end -->
		
		
		<!-- 已完成分类 -->
		<view class=""	v-if="current_tab_index == 4">
			<view>
				<view class="u-skeleton-slot__content">
					<view v-for="(flow_item , index) in flow_tab" :key="index"  
					@click="gotoflow_xinxi(flow_item.ticket_number,flow_item.ticket_model_number)">
						<view class="u-demo-block__content"	v-if="(flow_item.ticket_status == 3) || (flow_item.ticket_close == 1)" style="height: 160rpx;width: 630rpx;background-color: #ffffff;border-radius: 20rpx;margin: 0 auto;margin-top: 20rpx;padding: 20rpx 40rpx;">
										<u-skeleton
											rows="2"
											title
											:loading="switch_tab"
											avatar
											rowsHeight="14"
										>
											<!-- 需要在外部多嵌套一层占位view，否则在nvue下会导致样式失效 -->
											<view>
												<view class="u-skeleton-slot">
													<view class="u-skeleton-slot__content">
														<view class=""	style="display: flex;">
															<u--text
																:text="flow_item.ticket_title"
																type="main"
																:bold="true"
																size="16"
																lines="1"
															></u--text>
															<u-tag :text="flow_item.ticketStatus"bgColor="#ffffff" color="#609dff" borderColor="#ffffff" 
															@click="gotoflow_xinxi(flow_item.ticket_number,flow_item.ticket_model_number)"
																	></u-tag>
														</view>
														
														<u--text
															type="main"
															size="14"
															customStyle="margin-top: 5px"									
															:text="flow_item.user_name"
														></u--text>
														<u--text
															type="main"
															size="14"
															customStyle="margin-top: 5px"
															:text="flow_item.ticket_submit_time"
														></u--text>
													</view>
												</view>
											</view>
										</u-skeleton>
									</view>
						
					</view>
				</view>
			</view>
		</view><!-- 已完成分类 ===end -->
		
		
		<!-- 超期未完成分类?????? -->
		<!-- <view class=""	v-if="current_tab_index == 5">
			<view>
				<view class="u-skeleton-slot__content"	>
					<view v-for="(flow_item , index) in flow_tab" :key="index">
						<view  class="u-demo-block__content"	style="height: 160rpx;width: 630rpx;background-color: #ffffff;border-radius: 20rpx;margin: 0 auto;margin-top: 20rpx;padding: 20rpx 40rpx;">
										<u-skeleton
											rows="2"
											title
											:loading="switch_tab"
											avatar
											rowsHeight="14"
										>
											<!-- 需要在外部多嵌套一层占位view，否则在nvue下会导致样式失效 -->
											<!-- <view>
												<view class="u-skeleton-slot">
													<view class="u-skeleton-slot__content">
														<view class=""	style="display: flex;">
															<u--text
																:text="flow_item.flow_path"
																type="main"
																:bold="true"
																size="16"
															></u--text>
															<u-tag :text="flow_item.ticketStatus" plain plainFill></u-tag>
														</view>
														
														<u--text
															type="main"
															size="14"
															customStyle="margin-top: 5px"
															:text="flow_item.flow_name"
														></u--text>
														<u--text
															type="main"
															size="14"
															customStyle="margin-top: 5px"
															:text="flow_item.createtime"
														></u--text>
													</view>
												</view>
											</view>
										</u-skeleton>
									</view>
						
					</view>
				</view>
			</view>
		</view> --> 
		<!-- 超期未完成分类===end -->
		
		
		<!-- 添加新工单（考虑删除这部分，因为与首页功能重复） -->
		<!-- <view>
			<u-picker :show="show" :columns="columns" @confirm="confirm"></u-picker>
			<u-icon 
			name="plus-circle-fill" 
			color="#ff741f"
			style="float: right;top:700rpx;margin-right: 10rpx;"
			@click="show = true"></u-icon>
		</view> -->
		
		
		
		
	</view>
	
</template>

<script>
	import work_flow_api from './common/work_flow_api.js'
	
	export default {
		data() {
			return {
				list_tabber: [{
					name: '全部'
				}, {
					name: '新工单'
				}, {
					name: '受理中'
				}, {
					name: '待回复'
				}, {
					name: '完成'
				}],
				list_sub: [{
					name: '预约日期'
				}, {
					name: '报单日期'
				}, {
					name: '客户'
				}, {
					name: '接单人'
				}],
				current_tab_index: 0,
				current_sub: 0,
				// loading_tab: true,
				// switch1: true,
				switch_tab: false,
				flow_tab:[
					// {
					// 	"flow_path":"",
					// 	"flow_name":"",
					// 	"createtime":"提交：永达陆燕 2024-01-24 09:31",
					// 	"ticketStatus":""
					// }
					
				],
				// 设置工单流程
				show: false,
				
				is_user_role:0,
				
				search_keywords:'',
				ticket_status:-1,
				
			}
		},
		onLoad(option) {
			
			console.log("option ===>>> ",option)
			 
			var that = this;
			
			if(option.ticket_status){
				this.ticket_status = option.ticket_status;
				this.current_tab_index = Number(option.ticket_status) + 1;
				
				console.log('this.ticket_status ======>>>>>> ',this.ticket_status)
				
				console.log('this.current_tab_index ======>>>>>> ',this.current_tab_index)
			}
			
			
			this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
			
			
			if(option.is_user_role && (option.is_user_role != 0)){			
				
				that.is_user_role = option.is_user_role;
			}
			
			
			
			
		},
		onShow() {
			this._get_ticket_list();
		},
		onPullDownRefresh() {
			
			// setTimeout(function () {
			// 	console.log('start pulldown');
			// }, 1000);
			
			console.log('开始下拉onPullDownRefresh刷新');
			
			
			this._get_ticket_list();
		
			console.log('refresh');
			setTimeout(()=>{
				uni.showToast({
					icon:'success',
					title: '刷新完成',
					
				});
				uni.stopPullDownRefresh();
			}, 2000);
		},
		methods: {
			callback_function_shop_option_data:function(that, cb_params){
				
				console.log('当前调试开关22：' + this.system_debug_flag);
				console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);
				
				if(!cb_params){
					return;
				}
				
				console.log('cb_params====', cb_params);
				
			},
			/**
			 * 搜索工单列表
			 */
			search_ticket_list(){
				//var key_word = this.search_keywords;
				
				this._get_ticket_list();
				
			},
			
			
			/**
			 * 获取工单列表
			 */
			_get_ticket_list(){
				
				var that = this;
				
				work_flow_api.check_user_login((app_token)=>{
					if(!app_token){
						console.log('获取用户的登录token失败');
						return;
					}
					
					var user_token = app_token.token;
										
					var post_data = {
						token: user_token,
						status: that.ticket_status,
					};
									
					//如果请求的是要处理的订单列表
					post_data.is_user_role = that.is_user_role;
					
					//如果要根据关键词过滤
					if(that.search_keywords.length > 0 ){
						post_data.keywords = that.search_keywords;
						
					}
					
					work_flow_api.get_ticket_list(post_data, (http_data)=>{
						console.log('http_data>>>', http_data)
						
						//判断搜索结果是否为空
						if((post_data.keywords)&&(http_data.data.list == false)){
							console.log('http_data.data.list>>>',http_data.data.list)
							uni.showToast({
								icon:'error',
								title:"未能搜索到结果"
							});
							
							//清空已有的工单列表
							that.flow_tab = null;
							
							return;
						}
						
						//循环读取工单列表
						for (var i = 0; i < http_data.data.list.length; i++) {
							console.log('http_data.data.list[i].ticket_model_name--->>>', http_data.data.list[i].ticket_model_name,i)
							
							console.log('http_data.data.list[i].ticket_status ===>>> ',http_data.data.list[i].ticket_status)
							
							that.flow_tab = http_data.data.list;
							
							// that.flow[0].flow_name = http_data.data.list[0].ticket_submit_time;
							console.log('that.flow_tab[i] ===>>> ',that.flow_tab[i])
							
							// console.log('that.flow_tab ===>>> ',that.flow_tab)
							// console.log('that.flow.ticket_model_name ===>>> ',that.flow[i].ticket_model_name)
							
							
							
							
							switch(http_data.data.list[i].ticket_status)
							{
								case 0:that.flow_tab[i].ticketStatus = "新工单";break;
								case 1:that.flow_tab[i].ticketStatus = "受理中";break;
								case 2:that.flow_tab[i].ticketStatus = "待回复";break;
								case 3:that.flow_tab[i].ticketStatus = "完成";
								
							}
						}
						// console.log('http_data.data.ticket.ticket_model_name--->>>', http_data.data.list[0].ticket_model_name)
						// console.log('http_data.data.ticket.ticket_status--->>>', http_data.data.list.length)
						// console.log('http_data.data.list[0].ticket_submit_time--->>>',http_data.data.list[0].ticket_submit_time)
					});
					
					
				})
				
			},
			
			change_tab_index(index) {
				this.current_tab_index = index.index;
				// console.log("index.index=========",index.index);
				console.log("this.current=========",  this.current_tab_index);
				this.ticket_status = this.current_tab_index -1;
				console.log("this.ticket_status=========",  this.ticket_status);
				//请求工单列表
				work_flow_api.check_user_login((app_token)=>{
					if(!app_token){
						console.log('获取用户的登录token失败');
						return;
					}
					
					var user_token = app_token.token;
					
					
					
					var post_data = {
						token: user_token,
						status: this.ticket_status,
						is_user_role:this.is_user_role,
					};
									
					//如果请求的是要处理的订单列表
					
					work_flow_api.get_ticket_list(post_data, (http_data)=>{
						console.log('http_data>>>', http_data)
						for (var i = 0; i < http_data.data.list.length; i++) {
							console.log('http_data.data.list[i].ticket_model_name--->>>', http_data.data.list[i].ticket_model_name,i)
							
							console.log('http_data.data.list[i].ticket_status ===>>> ',http_data.data.list[i].ticket_status)
							
							this.flow_tab = http_data.data.list;
							
							// this.flow[0].flow_name = http_data.data.list[0].ticket_submit_time;
							console.log('this.flow_tab[i] ===>>> ',this.flow_tab[i])
							
							// console.log('this.flow_tab ===>>> ',this.flow_tab)
							// console.log('this.flow.ticket_model_name ===>>> ',this.flow[i].ticket_model_name)
							
							
							
							
							switch(http_data.data.list[i].ticket_status)
							{
								case 0:this.flow_tab[i].ticketStatus = "新工单";break;
								case 1:this.flow_tab[i].ticketStatus = "受理中";break;
								case 2:this.flow_tab[i].ticketStatus = "待回复";break;
								case 3:this.flow_tab[i].ticketStatus = "完成";
								
							}
						}
						// console.log('http_data.data.ticket.ticket_model_name--->>>', http_data.data.list[0].ticket_model_name)
						// console.log('http_data.data.ticket.ticket_status--->>>', http_data.data.list.length)
						// console.log('http_data.data.list[0].ticket_submit_time--->>>',http_data.data.list[0].ticket_submit_time)
					});
					
					
				})
				
				
			},
			confirm(e) {
				console.log('confirm', e.value)
				this.flow_tab.flow_path = '过户'
				console.log('this.flow.flow_path', this.flow_tab.flow_path)
				this.show = false
			},
						
						
			gotoflow_xinxi(model_number,ticket_model_number){
				console.log("success number === >>>>> ",model_number);
				
				var new_url = "/pages/work_flow/flow_xinxi?ticket_number=" + model_number + "&ticket_model_number=" + ticket_model_number;
				
				if(this.is_user_role == 1){
					new_url += '&is_user_role=1';
				}
				if(this.is_user_role == 2){
					new_url += '&is_user_role=2';
				}
				
				console.log('new_url---------->>>>>', new_url)
				
				//uni.navigateTo({
				//	url: new_url
				//})
				
				this.abotapi.call_h5browser_or_other_goto_url(new_url);
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #E6E6E6;
	}
	.u_button{
		margin-left: 10rpx;
		width: 270rpx;
		height: 64rpx;
		font-size: 24rpx;
		background-color: #f2f2f2;
	}
	.span{
		font-size: 110rpx;
	}
	.button_tab{
		margin: 10rpx;
	}
	.search_tab{
		display: flex;
		&_bar{
			flex: 1; /* 让两个view平分空间 */
			padding: 20rpx;
			order: -1;
		}
		
		&_button{
			padding: 20rpx;
		}
	}
</style>