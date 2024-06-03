<!-- 填写新建工单表单 -->
<template>
	<view>
		<view class="">{{title_flow_type}}</view>



		<u--form labelPosition="left" :model="model1" :rules="rules" ref="uForm" v-for="(item,index) in form_field"
			:key="item.field_display_name">
			
			
				<view class="input_box" v-if="item.field_type=='china_regions'">
					<p style="width: 300rpx;">{{item.field_display_name}}</p>
					<u--input placeholder="请输入金额" border="surround" type="number" v-model="model1.china_regions"></u--input>
				</view>
			
			
				<view class="input_box" v-if="item.field_type=='img'">
					<p style="width: 300rpx;">{{item.field_display_name}}</p>
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
						:maxCount="10"></u-upload>
				
				</view>
			


			<!-- <view class="input_box" v-if="item.field_type=='select'">
				<p style="width: 300rpx;">{{item.field_display_name}}</p>
				<u-picker v-for="(item_picker,i) in select_field_data_array" :key="item.field_display_name" :show="show_select" :columns="Array(item_picker)" @confirm="confirm_select"
					@cancel="cancel_select"></u-picker>
				<view style="display: flex;">
					<view style="width: 500rpx;">{{company_name}}</view>
					<u-icon slot="right" name="arrow-right" @click="show_select = true"></u-icon>
				</view>
			</view> -->




			<view class="input_box" v-if="item.field_type=='text'">
				<p style="width: 300rpx;">{{item.field_display_name}}</p>
				<u--input placeholder="请输入内容" border="surround" @change="change" v-model="model1.text"></u--input>
			</view>



			<view class="input_box" v-if="item.field_type=='date'">
				<p style="width: 300rpx;">{{item.field_display_name}}</p>
				<u-datetime-picker :show="show_date" v-model="model1.value_data" :mode="datetime" @confirm="confirm_date"
					@cancel="cancel_date">
				</u-datetime-picker>
				<view style="display: flex;">
					<view style="width: 500rpx;">{{time}}</view>
					<u-icon slot="right" name="arrow-right" @click="show_date = true"></u-icon>
				</view>

			</view>



			<!-- <view class="input_box" v-if="item.field_type=='checkbox'">
				<p style="width: 300rpx;">{{item.field_display_name}}</p>
				<view	style="display: flex;">
					<view style="width: 500rpx;">{{checkboxValue1}}</view>
					<u-icon slot="right" name="arrow-right" @click="show_checkbox = true"></u-icon>
				</view>
			</view> -->

		</u--form>



		<!-- 复选框 -->
		<u-popup :round="10" :show="show_checkbox" @close="close_checkbox" @open="open_checkbox" mode="center">
			<view>
				<u-checkbox-group v-model="checkboxValue1" placement="column" @change="checkboxChange">
					<u-checkbox :customStyle="{marginBottom: '16rpx'}"
						v-for="(item_checkbox, index) in select_field_data_array" 
						:key="index" 
						:label="item_checkbox"
						:name="item_checkbox" 
						:disabled="item_checkbox.disabled">
					</u-checkbox>
				</u-checkbox-group>
			</view>
		</u-popup>

		<!-- 提交按钮 -->
		<u-button type="primary" style="padding: 40rpx;margin: 40rpx;"	@click="submit">提交</u-button>
	</view>
</template>

<script>
	import work_flow_api from './common/work_flow_api.js'
	
	export default {
		data() {
			return {
				show_select: false,
				select_field_data_array:[],
				company_name: '',
				show_date: false,
				show_checkbox: false,
				title_flow_type: '',
				form_field: '',
				fileList1: [],
				
				time: '',
				checkboxValue1: [],
				checkbox: [{
					name: '',
					disabled: false
				}],
				//表单
				model1:[{
					china_regions:'',
					text:'',
					value_data: Number(new Date()),
				}],
			};
		},
		onLoad(option) {
			var that = this
			
			this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
			
			console.log("option.ticket_model_number", option.ticket_model_number)
			
			var token_key = uni.getStorageSync("token_key")
			var set_key = uni.getStorageSync("set_key")

			work_flow_api.abotRequest({
				
				url: work_flow_api.work_flow_server + '/?g=API&m=Index&a=ticketForm&number=' + option
					.ticket_model_number,
				method: "POST",
				data: {
					token: token_key,
					systemInfo: set_key,
					method: 'GET'
				},
				success: function(http_res) {
					console.log('http_res', http_res)
					
					
					that.title_flow_type = http_res.data.data.ticket.title;
					
					console.log("that.title_flow_type", that.title_flow_type);
					
					
					that.form_field = http_res.data.data.field;
					
					
					console.log('form_field===', that.form_field)
					
					
					console.log("http_res.data.data.ticket.title", http_res.data.data.ticket.title)
					
					
					console.log("that.form_field[14]", that.form_field[14].field_option_key)
					
					
					//获取所有field_option_key
					for (var i=0 ; i<=that.form_field.length ; i++) {
						
						console.log("that.form_field[i].field_option_key",that.form_field[i].field_option_key)
						
						if(that.form_field[i].field_type == "select"){
							
							console.log("http_res.data.data.field.field_type输出")
							
							that.select_field_data_array.push(that.form_field[i].field_option_key);
							
							//that.select_field_data_array = that.form_field[i].field_option_key;
							console.log("that.select_field_data_array=======>>>>>",that.select_field_data_array);
						}
					}
					
					
					switch (http_res.data.status) {
						case 200:

							break;
						case -1:
						case 45011:
							// Dialog.alert({
							// 	title: '系统提示',
							// 	message: res.data.msg || '当前系统繁忙，请稍后再试',
							// 	zIndex: 999
							// })
							break;
						case 40029:
							// Dialog.alert({
							// 	title: '校验异常',
							// 	message: res.data.msg || '程序校验数据失败，请点击按钮再试',
							// 	confirmButtonText: '刷新信息',
							// 	zIndex: 999
							// }).then(() => {
							// 	gt.loginAction();
							// });
							break;
						default:
							// Dialog.alert({
							// 	title: '系统提示',
							// 	message: res.data.msg || '未知错误',
							// 	zIndex: 999
							// })
					}
				}
			});
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
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
			
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				
				console.log("afterRead_event=====>>>>",event)
				
				let lists = [].concat(event.file)
				
				console.log("lists",lists)
				
				let fileListLen = this[`fileList${event.name}`].length
				
				console.log("fileListLen",fileListLen)
				
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url,lists[i].type,event.file)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			
			
			//上传图片到服务器
			uploadFilePromise(url,type,file) {
				
				console.log("uploadFilePromise_url=====>>>>",url)
				
				var action = type == 'file' ? 'uploadfile' : 'uploadimage'
				
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: work_flow_api.work_flow_server + '/?m=Upload&a=ueditor&method=POST&action=' + action, 
						filePath: url,
						name: 'upfile',
						// formData: {
						// 	user: 'test'
						// },
						success: (res) => {
							
							console.log("res======>>>>>",res);
							
							console.log("res.data ======>>>>> ", JSON.parse(res.data) );
							
							var url_list = JSON.parse(res.data);
							
							console.log("url_list ======>>>>> ",url_list);
							
							this.model1.push({
								"key" : this.form_field.field_display_name,
								"value" : url_list.url
							})
							
							console.log("model1 =====>>>>> " , this.model1)
							
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},

			change(e) {
				console.log('change', e);
				for (let i = 0; i < this.form_field.length; i++) {
					var textdictionary = {
						"key":this.form_field[i].field_name,
						"value":this.model1.text,
					};
					
				}
				this.model1.push(textdictionary)
				console.log("model1====",this.model1);
			},

			confirm_select(e) {
				
				console.log('confirm_selecteeeeeee=====', e);
				console.log('company_name', e.value[0]);
				this.company_name = e.value[0];
				this.show_select = false;
			},
			cancel_select() {
				this.show_select = false
			},
			confirm_date(e) {
				this.show_date = false;
				console.log('shijianeeeeeee===', e);
				var dateObj = new Date(e.value);
				console.log('dateObj', dateObj);
				var year = dateObj.getFullYear();
				var month = dateObj.getMonth() + 1; // getMonth()返回值范围从0到11，所以需要加1
				var day = dateObj.getDate();
				var hours = dateObj.getHours();
				var minutes = dateObj.getMinutes();
				var seconds = dateObj.getSeconds();

				// 构造日期字符串
				var formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
				console.log(formattedDate); // 输出格式化后的日期字符串
				this.time = formattedDate;


			},
			cancel_date() {
				this.show_date = false
			},
			open_checkbox(e) {

				console.log('open_checkbox', e)
			},
			close_checkbox() {
				this.show_checkbox = false
			},

			checkboxChange(n) {
				console.log('change', n);
				this.checkboxValue1 = n;
				console.log("this.checkboxValue1",this.checkboxValue1);
				var items = this.form_field.field_option_key;
						values = n.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
			},
			
			//提交表单
			submit(){
				console.log("model1====",this.model1);
			},

		},

	};
</script>

<style>
	page {
		background-color: #E6E6E6;
	}

	.input_box {
		background-color: #ffffff;
		width: 700rpx;
		height: auto;
		margin: 0 auto;
		margin-top: 20rpx;
		border-radius: 10rpx;
		padding: 20rpx;
		display: flex;
		align-items: center;
	}
</style>