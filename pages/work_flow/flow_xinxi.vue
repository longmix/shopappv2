<template>
	<view class="xinxi_page">
		<view class="xinxi_steps_item">
			<u-steps :current="flow_info.status_number" direction="column">
				<block v-for="(step_name, step_index) in step_list" :key="step_index">
					<u-steps-item :title="step_name"></u-steps-item>
				</block>
			</u-steps>
		</view>

		<view class="xinxi_item">
			<text class="xinxi_item_text">工单信息</text>
			<u-cell-group>
				<!--u-cell
				title="页内指引"
				:value="flow_info.model_postscript"
			></u-cell -->
				<u-cell title="所属分类" :value="flow_info.category_name"></u-cell>
				<u-cell title="所属模型" :value="flow_info.model_name"></u-cell>
				<u-cell title="工单编号" :value="current_ticket_number"></u-cell>
				<u-cell title="工单状态" :value="flow_info.status"></u-cell>
				<u-cell title="提单账号" :value="flow_info.contact_account"></u-cell>
				<u-cell title="提交时间" :value="flow_info.submit_time"></u-cell>
				<u-cell title="工单描述" :value="flow_info.title"></u-cell>

				<!-- 显示工单的自定义字段 -->
				<block class="flow_comment" v-for="(flow_item , index) in flow_form" :key="index">
					<block v-if="flow_item.type == 'img'">
						<u-cell :title="flow_item.name" value=""></u-cell>
						<u-row style="padding-left: 30rpx;">
							<image v-for="(image_url, image_index) in flow_item.value" :key="image_index"
								:showLoading="true" :src="image_url"  mode="widthFix"
								style="width: 150rpx; margin: 10rpx;"
								@click="show_image_in_overlay(image_url)"></image>
						</u-row>
					</block>
					<block v-else>
						<u-cell :title="flow_item.name" :value="flow_item.value"></u-cell>
					</block>

				</block>


				<!--
			<u-cell
				title="客户"
				value="客户"
			></u-cell>
			<u-cell
				title="用户账号"
				:value="flow_info.contact_account"
			></u-cell>
			<u-cell
				title="工单说明"
				:value="flow_info.model_explain"
			></u-cell>
			
			<u-cell
				title="车牌号"
				value="车牌号"
			></u-cell>
			<u-cell
				title="内容"
				value="内容"
			></u-cell>
			
			<u-cell
				title="合同编号"
				value="合同编号"
			></u-cell>
			-->


			</u-cell-group>
		</view>

		<view class="">
			<block v-if="is_show_reply_input_and_button == true">

				<view class="flow_comment">
					<u--text align="center" text="工单记录">
					</u--text>

					<view class="flow_reply">

						<view class="flow_reply_input">
							<u--input placeholder="请输入评论内容" border="surround" v-model="current_reply_content"
								@change="change_reply_content" clearable adjustPosition></u--input>
						</view>

						<view class="flow_reply_button">

							<u-button @click="flow_reply_submit" text="提交评论" type="success"></u-button>
						</view>

					</view>






					<view class="flow_comment" v-for="(flow_item , index) in flow_chat" :key="index">
						<!-- <text>回复内容</text> -->
						<u--text align="left" :text="flow_item.content"></u--text>
						<!-- <text>id</text>
				<u--text type="primary" :text="flow_item.id"></u--text> -->
						<!-- <text>姓名</text> -->
						<u--text align="right" :text="flow_item.name" bold="true"></u--text>
						<!-- <text>时间</text> -->
						<u--text align="right" :text="flow_item.time" color="#666666"></u--text>
					</view>

				</view>



			</block>
		</view>


		<view class="flow_fin" @click="">
			<text>结算</text>
		</view>


		<view class="xinxi_button_item">
			<u-popup :show="outerPopup" @close="outerPopup = false">

				<!-- 这里功能拟定为将status重设为某个常熟 -->
				<!-- <u-cell
		        	title="重新派单"
					@click="flow_restart"
					clickable="true"
		        > -->

				<view class="">
					<!-- <u-popup :show="innerPopup" @close="innerPopup = false">
						
					<view class="" v-for="(flow_item , index) in flow_userlist" :key="index">
						<u-cell
						    @click="flow_restart(flow_item.user_id)"
							:title="flow_item.user_name"
							>
						</u-cell>
					</view>
						
					</u-popup> -->

					<u-popup :show="innerPopup" mode="bottom" :overlay="true" @close="innerPopup = false">
						<!-- 弹出层内容 -->


						<!-- <input v-model="searchValue" placeholder="请输入要搜索的小区名称" /> -->

						<picker-view @change="bindPickerChange" data-fieldname="current_user_id"
							indicator-class="indicator" :value="flow_userlist_index" indicator-style="height: 100rpx;"
							mask-style="height:900rpx;"
							style="bottom:0rpx;text-align:center;background:white;height: 500rpx;">

							<picker-view-column class="pickViewColumn">
								<view v-for="item in flow_userlist" :key="item.user_id" style="line-height: 104rpx"
									@click="flow_restart(item.user_id,item.user_name)">{{item.user_name}}
								</view>
							</picker-view-column>
						</picker-view>

						<view style="padding: 10rpx;">

								<view class="select_input" >
																	
									<view class="select_input_column" >
										
										<u--input
											placeholder="请输入想查询的车务" 
											border="none" 
											v-model="searchText"
											inputAlign='center'
											clearable 
											adjustPosition
											>
										</u--input>	
									</view>
									
									<!-- <view class="select_input_button" :style="{display:show_}">
										<u-button @click="flow_restart" text="确定" type="success"></u-button>
									</view> -->
								</view>
				
						</view>
					</u-popup>

					<u-cell @click="innerPopup = true" align="left" title="转派单"></u-cell>
				</view>
				<!-- </u-cell> -->
				<!-- 这里功能拟定为将status设为0 -->

				<u-cell title="设为待派单" @click="flow_restart(0, '')"></u-cell>
				<!-- <u-cell
					title="编辑"
				></u-cell>
				<u-cell
					title="取消"
				></u-cell>
				<u-cell
					title="删除"
				></u-cell>
				<u-cell
					title="复制"
				></u-cell> -->

			</u-popup>
			<view class="fixed-button-container" v-if="(is_user_role != 0)">
				<view class="xinxi_button_item_button" >
					<u-button @click="outerPopup = true" v-if="(flow_info.status_number != 0)">更多</u-button>


					<!-- <u-button class="fixed-button" v-if="flow_info.status_number == 0" @click="goto_flow_form(current_ticket_number,is_user_role)">抢单</u-button> -->
					<u-button class="fixed-button"
						v-if="(option.is_user_role != 0) && (flow_info.status_number == 0) && (flow_info.close == 0)"
						@click="change_status_to(1)">抢单</u-button>
					<u-button class="fixed-button"
						v-if="(option.is_user_role != 0) && (flow_info.status_number == 1) && (flow_info.close == 0)"
						@click="change_status_to(2)">受理</u-button>
					<u-button class="fixed-button"
						v-if="(option.is_user_role != 0) && (flow_info.status_number == 2) && (flow_info.close == 0)"
						@click="change_status_to(3)">完工</u-button>
				</view>

			</view>
		</view>
		<view class="" style="height: 80rpx">

		</view>

		<!-- 图片遮罩层 -->
		<u-overlay :show="show_image_preview_overlay" @click="show_image_preview_overlay = false">
			<view style="display: flex;align-items: center;justify-content: center;height: 100%;">
				<image :src="image_url_in_overlay" mode="widthFix" style="width: 90%;" @tap.stop></image>
				<!-- <view style="width: 120px;height: 120px;background-color: #fff;" @tap.stop></view> -->
			</view>
		</u-overlay>


	</view>
</template>
<script>
	import work_flow_api from './common/work_flow_api.js'
	import './static/css/work_flow.css'


	export default {
		data() {
			return {
				step_list: ['新工单', '受理中', '待回复', '已完成'],
				show: false,
				flow_info: [],
				flow_form: [],
				flow_chat: [],
				flow_userlist: [],
				flow_userlist_new: [],
				work_flow_form: [],
				is_user_role: 0,

				//是否显示回复的输入框和按钮
				is_show_reply_input_and_button: false,

				//输入的回复内容，准备提交
				current_reply_content: '',
				searchText:'',

				current_user_token: null,

				current_ticket_number: null,
				outerPopup: false, // 控制外层弹出层显示的变量
				innerPopup: false, // 控制内层弹出层显示的变量
				current_ticket_model_number: null,

				//控制遮罩层中显示图片
				show_image_preview_overlay: false,
				image_url_in_overlay: ''
			}
		},
		watch: {
			searchText:function(val, oldVal){
				console.log('新值---->>>',val);
				console.log('旧值---->>>',oldVal);
				
				//如果是空的，就把备份的数据重新赋值回去
				if(val == ''){
					
					this.flow_userlist = this.flow_userlist_new;
					
				}
				
				var index_array = [];
				
				for (let i = 0; i < this.flow_userlist_new.length; i++) {
					var index = this.flow_userlist_new[i].user_name.indexOf(val);
					
					if(index != -1){
			
						index_array.push(this.flow_userlist_new[i])
			
					}
			
					//index_array.push(index);
				}
				
				this.flow_userlist = index_array;
				
				
			}
		},
		onLoad(option) {

			console.log("option ===>>> ", option)

			var that = this;

			this.current_ticket_number = option.ticket_number;
			this.current_ticket_model_number = option.ticket_model_number;

			work_flow_api.check_user_login((app_token) => {
				if (!app_token) {
					console.log('获取用户的登录token失败');
					return;
				}

				var user_token = app_token.token;

				that.current_user_token = user_token;


				// var ticket_number = -1;
				that._load_ticket_detail(user_token, option.is_user_role, option.ticket_number);

				//请求用户user的列表
				var post_data = {
					token: user_token,
					// is_user_role: 1
				}


				work_flow_api.abotRequest({
					url: work_flow_api.work_flow_server + '/?g=API&m=Index&a=get_all_user_list',
					data: post_data,
					method: "POST",
					success: (http_res) => {
						that.flow_userlist = http_res.data.data.user_list
						that.flow_userlist_new = that.flow_userlist;
						
						console.log('that.flow_userlist--->>>', that.flow_userlist)
					}



				});


			})



			this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);



		},

		


		methods: {

			bindPickerChange: function(e) {
				var that = this;

				console.log('bindPickerChange===>>>', e);

				var index = e.detail.value;
				var fieldname = e.currentTarget.dataset.fieldname;

				console.log('bindPickerChange fieldname ===>>>', fieldname);
				console.log('bindPickerChange index ===>>>', index);

				if (fieldname == 'current_user_id') {
					console.log('current_user_id ===>>> ' + index);

					that.flow_userlist_index = index;

					that.$forceUpdate();

					return;
				}

				//var list = that.input_field_list;

				console.log('bindPickerChange that.input_field_list ===>>>', that.input_field_list);


				for (var i = 0; i < that.input_field_list.length; i++) {

					if (that.input_field_list[i].fieldname == fieldname) {
						that.input_field_list[i].index = index;

						console.log('bindPickerChange that.input_field_list i ===>>>', i);
						console.log('bindPickerChange that.input_field_list index ===>>>', index);

						that.$forceUpdate();
					}

				}




			},


			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			openOuterPopup() {
				this.outerPopup = true;
			},
			test_queren() {
				this.popupVisible = false;
			},
			/**
			 * 加载工单详情
			 * 
			 */
			_load_ticket_detail: function(user_token, is_user_role, ticket_number) {
				var that = this;

				var post_data = {
					token: user_token,
					number: ticket_number,
				};

				//如果请求的是要处理的订单列表
				if (is_user_role && (is_user_role != 0)) {
					post_data.is_user_role = is_user_role;

					that.is_user_role = is_user_role;
				}

				work_flow_api.abotRequest({
					url: work_flow_api.work_flow_server + '/?g=API&m=Ticket&a=detail',
					data: post_data,
					method: "POST",
					success: http_res => {
						console.log('http_res--->>>', http_res)
						console.log('flow_info11111111111111--->>>', http_res.data)



						that.flow_form = http_res.data.data.form;

						that.flow_chat = http_res.data.data.chat;


						//处理工单记录 ticket
						that.flow_info = http_res.data.data.ticket;

						if (!that.flow_info) {

							console.log("没有请求到数据")
							return;
						}

						console.log('flow_info11111111111111--->>>', that.flow_info)

						if (that.flow_info && (that.flow_info.status == 1)) {
							that.step_list[that.flow_info.status] = '受理中：' + that.flow_info.user_name;
						}


						if ((that.flow_info.status != 0) &&
							(that.flow_info.status != 3)) {

							that.is_show_reply_input_and_button = true;
						}

						switch (that.flow_info.status) {
							case 0:
								that.flow_info.status = "新工单";
								that.flow_info.status_number = 0;
								break;
							case 1:
								that.flow_info.status = "受理中";
								that.flow_info.status_number = 1;
								break;
							case 2:
								that.flow_info.status = "待回复";
								that.flow_info.status_number = 2;
								break;
							case 3:
								that.flow_info.status = "完成";
								that.flow_info.status_number = 3;

						}

						//渲染工单值的字段到界面




					}
				});



			},



			flow_reply_submit() {
				var that = this;


				if (this.current_reply_content.trim().length == 0) {
					uni.showToast({
						title: '请填写回复内容',
						icon: 'error'
					});

					return;
				}


				var post_data = {
					token: that.current_user_token,
					number: that.current_ticket_number,
					is_user_role: that.is_user_role,
					content: this.current_reply_content
				}

				work_flow_api.abotRequest({
					url: work_flow_api.work_flow_server + '/?g=API&m=Ticket&a=reply',
					data: post_data,
					method: "POST",
					success: (http_res) => {
						console.log('http_res--->>>', http_res)
						console.log('flow_info22222222222--->>>', http_res.data.status)

						if (!http_res || (http_res.data.status != 200)) {
							uni.showModal({
								title: '错误',
								content: http_res.data.msg,
								showCancel: false,
								success: (res) => {
									//xxxxxx
								}
							})
							return;
						}

						var that = this;
						//显示 成功的消息
						uni.showModal({
							title: '成功',
							content: http_res.data.msg,
							showCancel: false,
							success: (res) => {
								//xxxxxx
								console.log('发送的信息为：', that.current_reply_content)

								var flow_item = {
									content: that.current_reply_content,
									id: '1111',
									name: 'name',
									time: 'time',
								}

								flow_item = http_res.data.data;



								that.flow_chat.push(flow_item);
							}
						})

					},
				});



			},
			
			_redeploy_ticket(user_id){
				var that = this;
				
				var post_data = {
					token: that.current_user_token,
					number: that.current_ticket_number,
					user_id: user_id,
					is_user_role:that.is_user_role
				}
				
				// 请求接口
				work_flow_api.abotRequest({
					url: work_flow_api.work_flow_server + '/?g=API&m=Ticket&a=redeploy',
					data: post_data,
					method: "POST",
					success: (http_res) => {
						console.log('http_res--->>>', http_res)
						// console.log('http_res.data.data.userlist--->>>',http_res.data.data.user_list)
				
				
						// 失败的情况
						if (!http_res || (http_res.data.status != 200)) {
				
							console.log('失败')
							uni.showModal({
								title: '错误',
								content: http_res.data.msg,
								showCancel: false,
								success: (res) => {
									//xxxxxx
								}
							})
							return;
						}
				
				
						//显示 成功的消息
						uni.showModal({
							title: '成功',
							// todo 要改content 根据API返回值确定接口长啥样
							content: http_res.data.msg,
							showCancel: false,
							success: (res) => {
								// that.abotapi.call_h5browser_or_other_goto_url(
								// 	'/pages/work_flow/index');
								
								
								// 跳转而非覆盖到两个界面前 即index界面 flowform提交信息为同款跳转
								uni.navigateBack({
									
									delta: 2
									
								});
							}
						})
				
				
				
					},
				});
				
				
			},
			
			//转派单，如果user_id等于0，为 重新派单
			flow_restart(user_id, user_name) {
				var that = this;
				var msg = '是否将状态设为待派单？';
				
				if(user_id != 0){
					msg = '是否转派此工单给' + that.user_name + '?';
				}
				
				
				uni.showModal({
					title:'请确认',
					content:msg,
					success: (res) => {
						if(res.cancel){
							return;
						}
						
						that._redeploy_ticket(user_id);
						
						
						
						
					}
				})
				

				




			},

			change_reply_content() {

			},
			// 更改工单按钮的状态
			change_status_to(new_status) {

				var that = this;

				console.log('new_status：', new_status)

				if ((new_status == 1) || (new_status == 2)) {
					// console.log('this：', this)

					// 如果变更为1(已接单)/2(待回复)状态 发请求
					var post_url = work_flow_api.work_flow_server + '/?g=API&m=Ticket&a=change_status' + '&is_user_role=' +
						this.is_user_role;
					var post_data = {
						token: this.current_user_token,
						number: this.current_ticket_number,
						// 这地方的ticket_model_number和前面的ticket_model_number不一样 这里不是需要调用工单编号					
						new_status: new_status,
						is_user_role: this.is_user_role
					};

					work_flow_api.abotRequest({
						url: post_url,
						data: post_data,
						method: "POST",
						success: function(http_res) {
							console.log('Ticket ==>> change_status--->>>', http_res)
							console.log('Ticket ==>> change_status--->>>', http_res.data)
							// 一个判断 判断网络请求
							if (!http_res && http_res.data) {
								uni.showModal({
									title: '错误',
									content: '网络请求失败',
									showCancel: false
								});

								return;
							}

							if (http_res.data.status != 200) {
								uni.showModal({
									title: '提示',
									content: http_res.data.msg,
									showCancel: false
								});

								return;
							}

							uni.showModal({
								title: '成功',
								content: http_res.data.msg,
								showCancel: false,
								success: (res001) => {

								}
							});

							//刷新界面
							that._load_ticket_detail(that.current_user_token, that.is_user_role, that.current_ticket_number);

						}
					});


				} else if (new_status == 3) {
					var that = this;
					//  如果变更状态为3(完成),跳转到flow_form
					// 参数为number is_user_role = 1

					var new_url = "/pages/work_flow/flow_form?ticket_model_number=" + this.current_ticket_model_number
					new_url += "&ticket_number=" + that.current_ticket_number;
					new_url += "&flow_status=3" + "&is_user_role=" + that.is_user_role;

					this.abotapi.call_h5browser_or_other_goto_url(new_url);

				}



			},
			show_image_in_overlay: function(image_url) {

				console.log('在遮罩层中展示图片：', image_url);

				this.show_image_preview_overlay = true;
				this.image_url_in_overlay = image_url;
			}

		}
	}
</script>
<style lang="scss">
	.xinxi_page {
		background-color: $u-bg-color
	}

	.xinxi_steps_item {
		background-color: #FFFFFF;
		/* 背景色 */
		border: 1rpx solid #DDDDDD;
		/* 边框宽度、样式和颜色 */
		border-radius: 16rpx;
		/* 可选：圆角边框 */
		padding: 20rpx;
		/* 内边距 */
		margin: 20rpx;
		/* 外边距 */
	}

	.xinxi_item {
		background-color: #FFFFFF;
		/* 背景色 */
		border: 1rpx solid #DDDDDD;
		/* 边框宽度、样式和颜色 */
		border-radius: 16rpx;
		/* 可选：圆角边框 */
		padding: 20rpx;
		/* 内边距 */
		margin: 20rpx;
		/* 外边距 */
	}

	.xinxi_item_text {
		margin: 20rpx;
		/* 外边距 */
	}

	.xinxi_button_item_button {
		display: flex;

	}

	.flow_fin {
		background-color: #FFFFFF;
		/* 背景色 */
		border: 1rpx solid #DDDDDD;
		/* 边框宽度、样式和颜色 */
		border-radius: 16rpx;
		/* 可选：圆角边框 */
		padding: 20rpx;
		/* 内边距 */
		margin: 20rpx;
		/* 外边距 */
	}

	.flow_comment {
		background-color: #FFFFFF;
		/* 背景色 */
		border: 1rpx solid #DDDDDD;
		/* 边框宽度、样式和颜色 */
		border-radius: 16rpx;
		/* 可选：圆角边框 */
		padding: 20rpx;
		/* 内边距 */
		margin: 20rpx;
		/* 外边距 */
	}

	.flow_reply {
		display: flex;

		&_input {
			flex: 1;
			/* 让两个view平分空间 */
			padding: 20rpx;
			order: -1;
		}

		&_button {
			padding: 20rpx;
		}
	}

	.flow_input {
		flex: 1;
		padding: 20px;
		margin-right: 200px;

	}

	.submit_button {
		flex: 1;
		padding: 20px;
		margin-left: 200px;
	}
	.select_input {
		display: flex;
	
		&_column {
			flex: 1;
			/* 让两个view平分空间 */
			padding: 20rpx;
			order: -1;
		}
	
		&_button {
			
		}
	}
</style>