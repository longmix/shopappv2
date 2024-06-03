<!-- 填写新建工单表单 -->
<template>
	<view>

		<view style="margin-bottom: 50rpx; padding-bottom: 50rpx;">
			<view class='wenzhang_detail'>
				<image style="width: 100%;" v-if="form_logourl" :src="form_logourl" mode="widthFix"></image>
				<view v-if="form_intro" style="margin: 20rpx;font-size: 28rpx;color: #555;word-break: break-word;">
					{{form_intro}}
				</view>

				<view class="wxParse">
					<scroll-view scroll-y='true'>

						<!-- #ifdef MP-ALIPAY -->
						<rich-text :nodes="content_array_html"></rich-text>
						<!-- #endif -->

						<!-- #ifdef H5 -->
						<view v-html="content_v_html"></view>
						<!-- #endif -->

						<!-- #ifndef MP-ALIPAY | H5 -->
						<!-- 富媒体组件 2021.1.18. -->
						<!-- rich-text  和 v-html 都有各自的优缺点 -->
						<u-parse v-if="content_html" :content="content_html" @preview="index_rich_html_preview_image"
							@navigate="index_rich_html_click_link" />
						<!-- #endif -->


					</scroll-view>
				</view>
			</view>


			<!--平铺广告图片start-->
			<view style='width:100%;background-color: #fff;margin-top: 20rpx;'
				v-if="(ad_img_list != null)||(ad_img_list != '')">
				<block v-for="item in ad_img_list" :key="item.swiperid">
					<image style='width:100%;vertical-align: middle;' mode="widthFix" @tap="go_to_ad_img_url"
						:src='item.image' :data-url="item.url"></image>
				</block>
			</view>
			<!--平铺广告图片end-->


			<view class="main-body" v-if="show_input_list == 1">

				<form @submit="formSubmit">


					<view class="box_1" v-if="current_flow_new_status == 0">
						<view class="input-flex-label w60" style="float: left;">
							{{current_ticket_model.title_description[0]}}
							<label class="FH">*</label>
						</view>
						<input name="title" maxlength="40" placeholder-style="color:#c3c3c3"
							:placeholder="current_ticket_model.title_description[1]" />
					</view>


					<block v-for="(item, index) in input_field_list" :key="item.fieldname">
						<!-- 帖子的固定字段开始 -->
						<block v-if="form_type == 33333333">

							<view class="uni-textarea002" style="" v-if="item.fieldname == 'imgimg_content'">
								<view style="padding: 16rpx 34rpx;font-size: 32rpx;background-color: #FFFFFF;">
									{{item.displayname}}
								</view>
								<textarea style="border:1rpx solid #a2a2a2;" :name="item.fieldname" maxlength="-1"
									placeholder='请在此填写详细说明' /><!-- placeholder-style="color:#D3D3D3;font-size:15px;" -->
							</view>

							<view style="" v-if="item.fieldname == 'imgimg_picture_list'">
								<!-- 上传图片 -->
								<view style="display: flex;flex-wrap:wrap;">
									<!-- 放上传的图片 -->
									<view style="width: 32%;height: 250rpx;position: relative;"
										v-for="(items,index) in imgArray" :key="items">
										<view style="width: 100%;position: absolute;z-index: 1;">
											<image @tap="delectImg(index)"
												style="width: 50rpx;height: 50rpx;position: absolute;right:0"
												src="../../static/img/delete_red.png"></image>
										</view>

										<image style="width: 100%;height: 100%;" mode="aspectFit" :src="items"></image>
									</view>


									<view
										style="margin: 2px 10px 2px 17px;width: 250rpx;height: 250rpx;position: relative;"
										@tap="uploading_img()">
										<image style="width: 100%;height: 100%;border: 1px solid #eee;"
											src="../../static/img/add.png"></image>
									</view>

								</view>

							</view>
						</block>
						<!-- 帖子的固定字段结束 -->

						<view class="box_1" v-if="item.fieldname != 'imgimg_title' && item.inputtype == 'text'">
							<view class="input-flex-label w60" style="float: left;">{{item.displayname}}
								<label class="FH" v-if="item.require == 1">*</label>
							</view>
							<view class="" v-if="item.fieldname == 'shunfengkuaididanhao'">
								
							</view>
							<view class="" v-else>
								
							</view>
							<input  :name="item.fieldname" maxlength="40" placeholder-style="color:#c3c3c3"
								:placeholder="item.errortip" />
						</view>
						

						<!-- 下拉单选 -->
						<view class="box_1" v-if="item.inputtype == 'select'">
							<picker @change="bindPickerChange" :value="item.index" :range="item.options"
								:data-fieldname="item.fieldname">
								<view style="overflow: auto;">
									<view class="box_2">
										<text>{{item.displayname}}</text><label class="FH"
											v-if="item.require == 1">*</label>
									</view>
									<view class="box_3">
										<text class="box_text">{{item.options[item.index]}}</text>
										<image v-if="!item.options[item.index]"
											style="width: 40rpx;    margin-top: 10rpx;margin-left: 100rpx;"
											mode="widthFix" src="../../static/img/x_right.png"></image>
									</view>
								</view>
							</picker>
							<input :name="item.fieldname" :value="item.options[item.index]" :hidden='true'
								style="display:none;" />
						</view>

						<!-- 单选按钮 -->
						<view class="box-checkbox" v-if="item.inputtype == 'radio'">
							<radio-group @change="radioChange" :name="item.fieldname" :data-name="item.fieldname">
								<view style="overflow: auto;margin-bottom:40rpx;">
									<view class="box_2">
										<text>{{item.displayname}}</text>
										<label class="FH" v-if="item.require == 1">*</label>
									</view>
								</view>
								<label v-for="(item02,index) in item.options" :key="index">
									<view style="margin-left: 34rpx;float: left;">
										<radio :value="item02">
											<view>{{item02}}</view>
										</radio>
									</view>
								</label>
							</radio-group>
						</view>

						<!-- 多选按钮 -->
						<view class="box-checkbox" v-if="item.inputtype == 'checkbox'">
							<checkbox-group @change="checkboxChange" :name="item.fieldname" :data-name="item.fieldname">
								<view style="overflow: auto;margin-bottom:40rpx;">
									<view class="box_2">
										<text>{{item.displayname}}</text>
										<label class="FH" v-if="item.require == 1">*</label>
									</view>
								</view>
								<label v-for="(item02,index) in item.options" :key="item02.value">
									<view style="margin-left: 34rpx;float: left;">
										<checkbox :value="item02">
											<view >{{item02}}</view>
										</checkbox>
										<view v-if="item02 == 1111111111111">
											<input type="text" placeholder="请输入内容" v-model="input_content" @change="input_content_change" style="border: 1rpx solid #DDDDDD;border-radius: 16rpx;"/>
											
										</view>
									</view>
								</label>
							</checkbox-group>
						</view>

						<!-- 文件或图片类型 -->
						<view class="box-file-upload" v-if="item.inputtype == 'file'">
							<view style="overflow: auto;margin-bottom:40rpx;">
								<view class="box_2">
									<text>{{item.displayname}}</text>
									<label class="FH" v-if="item.require == 1">*</label>
								</view>
							</view>

							<!-- <image  
								:src="image_upload_list[item.fieldname]?image_upload_list[item.fieldname]:img_upload_default_icon"
								mode="widthFix" 
								:name="item.fieldname" 
								:data-name="item.fieldname"
								@click="upLoadimgs888"
								style="width: 200rpx;margin: 0rpx auto;display: none;"></image>
								以上这个控件不再使用，在小程序中有BUG，上传的图片不能刷新，H5中没有问题。下面这个兼容 -->

							<block v-if="item.upload_image_url_list">
								<image v-for="(image_url, image_index) in item.upload_image_url_list" :key="image_index"
									:src="image_url" mode="widthFix"
									style="width: 200rpx;margin: 0rpx auto;display: block; float: left;"></image>

							</block>
							<block v-else>
								<image :src="img_upload_default_icon" mode="widthFix" :name="item.fieldname"
									:data-name="item.fieldname" :data-index="index" @click="upLoadimgs"
									style="width: 200rpx;margin: 0rpx auto;display: block; float: left;"></image>

							</block>


							<input type="hidden" :name="item.fieldname"
								:value="(item.image_upload_btn_is_del != 2)?item.upload_image_url_str:''"
								style='display:none;'>


							<view class="error_tips" v-if="item.errortip">
								<view style="color:#cbcbcb ;font-size: 20rpx">{{item.errortip}}</view>
							</view>

							<!-- 上传图片和清除图片的按钮 -->
							<view @click="upLoadimgs" :data-name="item.fieldname" :data-index="index"
								:data-seq="item.image_list_seq"
								:data-todel="item.image_upload_btn_is_del?item.image_upload_btn_is_del:0"
								class="up_images" :style="{backgroundColor:wxa_shop_nav_bg_color}">
								{{item.image_upload_btn_txt?item.image_upload_btn_txt:'上传图片'}}
							</view>


						</view>

						<!-- 日期时间类型 -->
						<view class="box_1" v-if="item.inputtype == 'date'">
							<view class="box_2">
								<text>{{item.displayname}}</text>
								<label class="FH" v-if="item.require == 1">*</label>
							</view>
							<biaofun-datetime-picker placeholder="请选择时间" :defaultValue="time_start_end[item.fieldname]"
								fields="minute" :name="item.fieldname + '_time_picker'" :data-name="item.fieldname"
								@change="changeDatetimePicker" :change_name="item.fieldname"></biaofun-datetime-picker>
							<input type="text" style="display: none;" :name="item.fieldname"
								:value="time_start_end[item.fieldname]">
						</view>

						<!-- <view class="input-flex" style="overflow: auto;border-bottom: #DDDDDD 1rpx solid;padding:17px 20px 10px" v-if="item.inputtype== 'date' || item.inputtype== 'text' && item.fieldname != 'imgimg_title'">
							<view class="input-flex-label w60" style="float: left;">{{item.displayname}}<label class="FH" v-if="item.require == 1">*</label></view>
								<input :type='item.inputtype'  
									:name="item.fieldname" 
									style="float: left;width: 70%;" 
									placeholder="点此输入" 
									value="" 
									v-if="item.inputtype== 'text'"/>
								  <picker mode="date" :value="date" :start="startDate" style="margin-left: 55%;margin-top: 6rpx;" :type='item.inputtype' :end="endDate" @change="bindDateChange"  :data-fieldname='item.fieldname' v-if="item.inputtype== 'date'">
									<view class="uni-input">{{date}}</view>
								</picker> 
							
							
							
						</view>
						-->


						<view class="uni-textarea002" style="padding: 0rpx 40rpx;"
							v-if="item.fieldname != 'imgimg_content' && item.inputtype == 'textarea'">
							<view class="box_2" style="float:left;background-color: #FFFFFF;padding: 20rpx 0rpx;">
								<text>{{item.displayname}}</text>
								<label class="FH" v-if="item.require == 1">*</label>
							</view>
							<view style="float:left;clear:both;width: 100%;padding: 5rpx;">
								<textarea :name="item.fieldname" :placeholder="item.errortip" maxlength="-1"
									style="border: 1px solid #a2a2a2;" /><!-- placeholder-style="color:#D3D3D3;font-size:15px;" -->
							</view>
						</view>





					</block>



					<view class="box_1" v-if="(show_all_user_list_picker == 1) && (current_flow_new_status == 0)">

						<view class="content">
							<!-- 触发弹出层的按钮 -->
							<view style="overflow: auto;" @click="test_button">
								<view class="box_2">
									<text>接单人</text><label class="FH">*</label>
								</view>
								<view class="box_3">
									<text
										class="box_text">{{current_all_user_list[current_user_list_index].user_name}}</text>
								</view>
							</view>

							<!-- u-popup组件作为底部弹出层 -->
							<u-popup :show="popupVisible" mode="bottom" :overlay="true" @close="test_queren">
								<!-- 弹出层内容 -->
								

									<!-- <input v-model="searchValue" placeholder="请输入要搜索的小区名称" /> -->
									<view>
										<picker-view @change="bindPickerChange" data-fieldname="current_user_id"
											indicator-class="indicator" :value="current_user_list_index"
											indicator-style="height: 100rpx;" mask-style="height:900rpx;"
											style="bottom:0rpx;text-align:center;background:white;">
										
											<picker-view-column class="pickViewColumn">
												<view v-for="item in current_all_user_list" :key="item.id"
													style="line-height: 104rpx" @click="test_queren">{{item.user_name}}
												</view>
											</picker-view-column>
										</picker-view>
										
									</view>
									
									<view style="padding: 10rpx;">
									
										<view class="select_input" >
									
											<view class="select_input_column" >
												
												<u--input
													placeholder="请输入内容" 
													border="none" 
													v-model="searchText"
													clearable 
													adjustPosition
													>
												</u--input>	
											</view>
											
											<view class="select_input_button">
												<u-button @click="test_queren" text="确定" type="success"></u-button>
											</view>
										</view>
											<!-- <view class="uni-form-item uni-column" style="border-radius: 10rpx;">
												
											</view> -->

									</view>
							</u-popup>
						</view>

						<!-- <picker @change="bindPickerChange" :value="current_user_list_index" 
							:range="current_all_user_list" 
							:range-key="'user_name'"
							data-fieldname="current_user_id">
							<view style="overflow: auto;">
								<view class="box_2">
									<text>接单人</text><label class="FH">*</label>
								</view>
								<view class="box_3">
									<text class="box_text">{{current_all_user_list[current_user_list_index].user_name}}</text>									
								</view>
							</view>
						</picker> -->
						<input name="current_user_id" :value="current_all_user_list[current_user_list_index].user_id"
							:hidden='true' style="display:none;" />
					</view>


					<!-- <upimg-box></upimg-box> -->
					<view class="fabu_xuzhi_block" v-if="publish_write_fabu_xuzhi">

						<checkbox-group name='fabu_xuzhi' style="zoom:70%;margin-right: 8rpx;">
							<checkbox value="1">

							</checkbox>
						</checkbox-group>
						<view>我已阅读并同意<text @click="show_knows" style="color: #007AFF;">《内容规范》</text></view>
					</view>
					<!-- 提交信息的按钮，触发 formSubmit -->
					<view class="fixed-button-container">
						<button class="fixed-button" v-if="current_flow_new_status == 3" formType="submit"
							style="padding: 0rpx;"
							:style="{backgroundColor:wxa_shop_nav_bg_color}">{{submit_text}}</button>
						<button class="fixed-button" v-if="current_flow_new_status == 0" formType="submit"
							style="padding: 0rpx;"
							:style="{backgroundColor:wxa_shop_nav_bg_color}">{{submit_text}}</button>

					</view>

				</form>

				<!-- 发布须知的弹层 -->
				<view class="zhezhao" v-if="is_know_showed==true"></view>
				<view class="kcrzxy" v-if="is_know_showed==true">
					<view class="kcrzxyhd" :style="{background:wxa_shop_nav_bg_color, fontSize:'26rpx'}">内容规范</view>
					<scroll-view scrollY class="kcrzxybd" style="height: 600rpx;">
						<textarea :value="publish_write_fabu_xuzhi" disabled="disabled"
							style="width: 100%;font-size:26rpx;" auto-height='true' maxlength="-1"></textarea>
					</scroll-view>
					<view @click="show_knows" class="queren"
						:style="{background:wxa_shop_nav_bg_color, fontSize:'26rpx'}">确定</view>
				</view>

			</view><!-- End of main-body -->
		</view>
		<view class="" style="height:80rpx">

		</view>

	</view>
</template>

<script>
	import work_flow_api from './common/work_flow_api.js'
	import './static/css/work_flow.css'

	/**
	 * 万能表单的界面
	 */
	import util from '@/common/util.js';
	import biaofunDatetimePicker from '@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue';

	import uParse from '@/components/gaoyia-parse/parse.vue'

	import md5 from '../../common/md5.min.js'

	// #ifdef MP-ALIPAY
	import parseHtml from "../../common/html-parser.js"
	// #endif

	export default {
		components: {
			uParse,
			biaofunDatetimePicker
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})

			return {

				
				popupVisible: false,
				searchText: '',

				pageData: {},

				formid: '',

				is_know_showed: false,

				hezuodiqu: [],
				tigongziyuan: [],
				xunqiuziyuan: [],
				youxiaoshijian: [],
				tigongziyuanmiaoshu: [],
				xunqiuziyuanmiaoshu: [],
				lianxifangshi: [],

				inputtype: '',

				show_input_list: 0,
				input_field_list: [],
				current_ticket_model: {},

				red: 'red',
				index: 0,
				data2: '',
				imgArray: [], //存放上传图片的数组
				submit_text: '提交信息',
				catename: '',
				date: currentDate,
				input_youxiaoshijian: '',
				bg_color: '',

				radio_field_value_list: [],
				checkbox_field_value_list: [],

				form_type: 3,
				submit_url: '', //即将提交表单的url 如果没有就用默认

				wxa_shop_nav_bg_color: '',
				publish_write_fabu_xuzhi: '', //发帖须知

				current_params_str: '',

				//微读客CMS平台的万能表单中定义的表单的logo、简介和内容
				form_title: '', //页面的标题
				form_logourl: '',
				form_intro: '',


				content_html: '<div></div>', //文章的html内容

				content_v_html: '', //文章的html内容（经过Filter过滤的，在H5中使用
				content_array_html: '', //文章的html内容（经过分析，转成array的。



				//首页 > 功能扩展 > 万能表单 中定义的平铺广告图片
				ad_img_list: '',

				cms_token: '',

				current_options: null,

				//图片和文件上传相关
				img_upload_default_icon: '../../static/img/add.png',
				image_upload_list: [],
				//image_list_seq:0,

				time_start_end: [],

				//2024.3.14.新增自定义表单字段数据的接口  form_type == 4 的时候有效
				form_field_list_data_url: '',

				//工单模型的编号
				ticket_model_number: '',

				//工单编号（如果状态不为0的时候）
				current_ticket_number: '',
				
				// 工单手机号
				current_phone_number: '',
				
				//工单系统中所有user（客服）的列表
				current_all_user_list: null,
				current_all_user_list_new: null,
				show_all_user_list_picker: 0,
				current_user_list_index: 0,

				// 请求工单模型字段的类型
				current_flow_new_status: "",
				// 请求当前登录用户token
				current_user_token: "",
				// 其他按钮需要输入的内容
				input_content:"",
			}
		},

		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		watch:{
			searchText:function(val, oldVal){
				console.log('新值---->>>',val);
				console.log('旧值---->>>',oldVal);
				
				//如果是空的，就把备份的数据重新赋值回去
				if(val == ''){
					
					this.current_all_user_list = this.current_all_user_list_new;
					
				}
				
				var index_array = [];
				
				for (let i = 0; i < this.current_all_user_list_new.length; i++) {
					var index = this.current_all_user_list_new[i].user_name.indexOf(val);
					
					if(index != -1){

						index_array.push(this.current_all_user_list_new[i])

					}

					//index_array.push(index);
				}
				
				this.current_all_user_list = index_array;
				
				
			}
		},
		
		onLoad(option) {
			var that = this

			that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);


			that.ticket_model_number = option.ticket_model_number;

			if (option.ticket_number) {
				that.current_ticket_number = option.ticket_number;
			}

			that.current_flow_new_status = option.flow_status;

			console.log("option.=====11111111", that.current_flow_new_status)

			uni.showLoading({
				title: '加载中...'
			});

			work_flow_api.check_user_login((app_token) => {

				var token_key = app_token.token;

				that.current_user_token = app_token.token;

				if (!token_key) {
					console.log('获取用户的登录token失败');
					//return;

					user_token =
						'$6$7d227ac9f3$CgkBLTvN67B8S3SLbVRnj5NW2Mqr6RnoZny4yKXC86OeM9Mfol7pjaw5Y3MVHrNKjPYG2qpfhgSSLdzfMd5eZ1';
				}
				
				

				//请求工单的输入字段（工单模型）
				work_flow_api.abotRequest({
					url: work_flow_api.work_flow_server + '/?g=API&m=Index&a=ticketForm&number=' + option
						.ticket_model_number,
					method: "POST",
					data: {
						token: token_key,
						flow_status: that.current_flow_new_status,
					},
					success: function(http_res) {

						uni.hideLoading();

						console.log('http_res', http_res.data)



						http_res = http_res.data;
						if (http_res.status == 0) {
							uni.showModal({
								title: '错误',
								content: http_res.msg,
								showCancel: false
							})
							return;
						}

						// 判断action的状态
						// 提交则显示提交人需要提交的按钮
						// 车务则显示接单人需要完工的按钮
						// 吧按钮固定在低端


						that.input_field_list = http_res.data.field;

						//当前的表单模型
						that.current_ticket_model = http_res.data.ticket;

						for (var i = 0; i < that.input_field_list.length; i++) {

							if (that.input_field_list[i].options) {
								that.input_field_list[i].options = that.input_field_list[i].options
									.split('|');
								that.input_field_list[i].index = 0;
							}
						}

						console.log('that.input_field_list===>>>', that.input_field_list);

						uni.setNavigationBarTitle({
							title: that.current_ticket_model.title
						})

						//显示表单内容
						that.show_input_list = 1;

						//===== 渲染表单说明 Begin ====
						if (that.current_ticket_model.postscript &&
							(that.current_ticket_model.postscript.length > 0)) {

							that.content_html = that.current_ticket_model.postscript;

							//v-html使用
							that.content_v_html = that.content_html;

							//console.log('that.content_v_html====>>>>111', that.content_v_html);

							const filter = that.$options.filters["formatRichText"];
							that.content_v_html = filter(that.content_v_html);

							//设置百度小程序中的页面SEO信息
							// #ifdef MP-BAIDU				
							//2021.7.22. 删除所有的超链接和对应的超链文本
							that.content_html = that.content_html.replace(/(<\/?a.*?>)[^>]*<\/a>/g,
								'');

							// #endif	


							// #ifdef MP-ALIPAY						
							let data001 = that.content_html;
							let newArr = [];
							let arr = parseHtml(data001);
							arr.forEach((item, index) => {
								newArr.push(item);
							});

							//console.log('arr arr arr====>>>>', arr);
							//console.log('newArr newArr newArr====>>>>', newArr);

							//rich-text使用
							that.content_array_html = newArr;
							// #endif

						}
						//===== 渲染表单说明 End ====




					}

				});

				//请求用户/客服列表
				//请求user列表
				if (that.current_flow_new_status == 0) {

					work_flow_api.abotRequest({
						url: work_flow_api.work_flow_server + '/?g=API&m=Index&a=get_all_user_list',
						method: "GET",
						success: function(http_res_user) {
							console.log('user列表--->>>', http_res_user)

							if (http_res_user.data.status == 200) {
								that.current_all_user_list = http_res_user.data.data.user_list;

								that.current_all_user_list.unshift({
									'user_id': 0,
									'user_name': '--不指定--'
								});
								
								//做一个备份
								that.current_all_user_list_new = that.current_all_user_list;
									
								that.show_all_user_list_picker = 1;
								that.current_user_list_index = 0;
							}

						}
					});
				}





			});


			//接收事件：update_image_upload_list，相应上传图片之后的界面变化
			that.$on('update_image_upload_list', (res001) => {
				console.log('收到刷新界面数组的请求==>>', res001);

				var ttt = that.input_field_list[res001.key];
				console.log('11111==>>', res001.key);
				console.log('22222==>>', ttt);

				//判断增加多张图片
				if (!ttt.upload_image_url_str) {
					ttt.upload_image_url_str = '';
				}

				ttt.upload_image_url_str += res001.val + ',';


				if (!ttt.upload_image_url_list) {
					ttt.upload_image_url_list = new Array();
				}
				ttt.upload_image_url_list.push(res001.val);


				ttt.image_upload_btn_txt = '清除图片';
				ttt.image_upload_btn_is_del = 1;

				console.log('33333==>>', ttt);

				that.$set(that.input_field_list, res001.key, ttt);

				console.log('4444==>>', that.input_field_list);

				that.$forceUpdate();
			});

			//相应删除图片之后的界面变化
			that.$on('delete_item_of_image_upload_list', (res001) => {
				console.log('收到删除上传的图片的请求==>>', res001);

				var ttt = that.input_field_list[res001.key];
				console.log('11111==>>', res001.key);
				console.log('22222==>>', ttt);

				//清空上传的图片
				ttt.upload_image_url_str = '';
				ttt.upload_image_url_list = null;

				ttt.image_upload_btn_txt = '上传图片';
				ttt.image_upload_btn_is_del = 2;

				console.log('33333==>>', ttt);

				that.$set(that.input_field_list, res001.key, ttt);

				console.log('4444==>>', that.input_field_list);

				that.$forceUpdate();


			})

		
		
		

		},

		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			//this.$refs.uForm.setRules(this.rules)
		},
		methods: {

			test_button() {
				this.popupVisible = true

			},
			test_queren() {
				this.popupVisible = false;
			},

			callback_function_shop_option_data: function(that, cb_params) {

				console.log('当前调试开关22：' + this.system_debug_flag);
				console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);

				if (!cb_params) {
					return;
				}

				console.log('cb_params====', cb_params);

				that.wxa_shop_nav_bg_color = cb_params.option_list.wxa_shop_nav_bg_color;

			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hours = date.getHours();
				let minutes = date.getMinutes();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;


				return `${year}-${month}-${day} ${hours}:${minutes}`;



			},
			//提交表单数据
			formSubmit: function(e) {


				console.log('formSubmit ===>>> ', e);

				var that = this;
				
				console.log('that ===>>> ', that);
				
				var input_value_list = e.detail.value;
				

				console.log('formSubmit input_value_list ===>>> ', input_value_list);
				//input_value_list.input_youxiaoshijian = this.date;

				if ((that.current_flow_new_status == 0) &&
					(input_value_list['title'].length == 0)) {
					uni.showModal({
						title: '错误',
						content: '请填写' + that.current_ticket_model.title_description[0],
						showCancel: false,
					});

					return;
				}

				//论坛发帖的时候，脱离万能表单之外，上传的多张图片
				var picture_list = null;

				if (this.imgArray && (this.imgArray.length > 0)) {
					picture_list = encodeURIComponent(JSON.stringify(this.imgArray));
				}

				//将radio的值追加到要提交的数组上
				for (var key in that.radio_field_value_list) {

					input_value_list[key] = that.radio_field_value_list[key];

				}

				//将checkbox的值追加到要提交的数组上				
				for (var key in that.checkbox_field_value_list) {

					input_value_list[key] = that.checkbox_field_value_list[key];

				}

				//检查必填字段
				for (var form_key in e.detail.value) {

					for (var keys in that.input_field_list) {

						//console.log('456 form_key ===>>>',form_key);
						//console.log('123', that.input_field_list);


						if (form_key == that.input_field_list[keys]['fieldname']) {
							if (that.input_field_list[keys]['require'] == 1) {
								//判断是否为必填（是）
								console.log('888889===>>', e.detail.value[form_key]);

								if (!e.detail.value[form_key]) {

									var error_tips = that.input_field_list[keys]['errortip'];
									if (!error_tips) {
										error_tips = '请填写';
									}

									uni.showModal({
										title: '错误',
										content: error_tips + that.input_field_list[keys]['displayname'],
										showCancel: false,

									});

									return;
								}
							}
						}

					}

				}

				//按照work_flow的苏江的接口规范，组织post data
				// input_value_list
				input_value_list['contact'] = 2;
				
				var user_account_info = that.abotapi.get_user_account_info();
				
				console.log('user_account_info ===>>>', user_account_info);
				
				input_value_list['contact_account'] = '';
				if(user_account_info && user_account_info.mobile){
					input_value_list['contact_account'] = user_account_info.mobile;
				}
				

				//input_value_list['title'] = '工单问题描述00000';


				input_value_list['number'] = that.ticket_model_number;

				input_value_list['token'] = that.current_user_token;

				input_value_list['user_id'] = 0;
				
				

				// current_user_list_index == 0 代表不指定接单人
				if (that.current_user_list_index) {
					input_value_list['user_id'] = that.current_all_user_list[that.current_user_list_index].user_id;
				}

				//根据工单状态做不同的处理
				input_value_list['new_status'] = that.current_flow_new_status;

				if (that.current_flow_new_status != 0) {
					input_value_list['ticket_number'] = that.current_ticket_number;
				}
				console.log('input_value_list ===>>>', input_value_list['huijianyaoqiu']);
				console.log('that.input_content ===>>>', that.input_content);
				if(input_value_list['huijianyaoqiu'] == '其他'){
					
					console.log('11111111111111111111');
					input_value_list['huijianyaoqiu'] = that.input_content;
				}

				console.log('input_value_list 最终结果，准备提交到服务器 ===>>>> ', input_value_list);

				work_flow_api.abotRequest({
					url: work_flow_api.work_flow_server + '/?g=API&m=Ticket&a=submit',
					method: 'POST',
					data: input_value_list,
					success: function(res) {

						console.log("submit res ====>>>> ", res);

						var ret_data = res.data;

						if (ret_data.status != 200) {
							uni.showModal({
								title: '错误',
								content: ret_data.msg,
							});

							return;
						}
						console.log('status ===>>> ', that.current_flow_new_status);
							if(that.current_flow_new_status == 0){
								uni.showModal({
									title: '成功',
									content: ret_data.msg,
									showCancel: false,
									
									
									//根据情况跳转而非覆盖到一个或三个界面前 即index界面 flow_xinxi提交信息为同款跳转
									success: (res) => {
										// that.abotapi.call_h5browser_or_other_goto_url(that.abotapi
										// 	.globalData.goto_new_index);
										uni.navigateBack({
											
											delta: 1
											
										});
									}
								});
							}
							else{
								uni.showModal({
									title: '成功',
									content: ret_data.msg,
									showCancel: false,
									success: (res) => {
										// that.abotapi.call_h5browser_or_other_goto_url(that.abotapi
										// 	.globalData.goto_new_index);
										uni.navigateBack({
											
											delta: 3
											
										});
									}
								});
							}
						
					}


				});



			},
			radioChange: function(e) {

				var that = this;
				var values = e.detail.value;

				//组合checkbox的值，关键是xml中要加 data-name，这样才能取到name

				var fieldname = e.currentTarget.dataset.name;

				that.radio_field_value_list[fieldname] = values;

				console.log('radioChange ===>>> ', values);
				console.log('radioChange ===>>> ', fieldname);
				console.log('radioChange ===>>> ', e);

				console.log('radio_field_value_list ==>>> ', that.radio_field_value_list);
			},
			checkboxChange: function(e) {

				var that = this;
				var values = e.detail.value;

				//组合checkbox的值，关键是xml中要加 data-name，这样才能取到name

				var fieldname = e.currentTarget.dataset.name;
				var field_value_str = '';

				if (values.length > 0) {
					field_value_str = values.join('|');
				}
				that.checkbox_field_value_list[fieldname] = field_value_str;
			},
			bindPickerChange: function(e) {
				var that = this;

				console.log('bindPickerChange===>>>', e);

				var index = e.detail.value;
				var fieldname = e.currentTarget.dataset.fieldname;

				console.log('bindPickerChange fieldname ===>>>', fieldname);
				console.log('bindPickerChange index ===>>>', index);

				if (fieldname == 'current_user_id') {
					console.log('current_user_id ===>>> ' + index);

					that.current_user_list_index = index;

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

			bindDateChange: function(e) {

				this.date = e.target.value;
				console.log('wadawda', e);
			},
			changeDatetimePicker: function(date, change_name) {


				//选择的时间
				this.time_start_end[change_name] = date.f3;

				this.$forceUpdate(); // 强制刷新数组元素

				console.log('选择的日期时间的change_name：', change_name);

				console.log('选择的日期时间数据：', date);
			},

			uploading_img: function() {
				//上传图片，调用延誉宝接口返回图片存在   that.imgArray
				var that = this;
				var userInfo = that.abotapi.get_user_info();

				//判断已经上传几张，超过9张提示不可以上传
				var imgArray = that.imgArray;

				if (imgArray.length >= 9) {
					uni.showToast({
						title: '最多上传9张',
						duration: 2000
					});
					return;
				}

				uni.chooseImage({

					success: function(chooseImageRes) {
						console.log('chooseImageRes', chooseImageRes);
						const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log('chooseImageRes', tempFilePaths[2]);
						for (let i = 0; i < tempFilePaths.length; i++) {
							uni.uploadFile({
								url: that.abotapi.globalData.yanyubao_server_url +
									'/openapi/ShopAppV2Data/upload_video_or_img', //仅为示例，非真实的接口地址
								filePath: tempFilePaths[i],
								name: 'file',
								formData: {
									'sellerid': that.abotapi.globalData.default_sellerid,
									'type': 0,
									'checkstr': userInfo.checkstr,
									'userid': userInfo.userid,
								},
								success: function(uploadFileRes) {
									var JSON_uploadFileRes = JSON.parse(uploadFileRes.data);
									var imgArray = that.imgArray;

									imgArray.push(JSON_uploadFileRes.url);

									that.imgArray = imgArray;

								}
							});
						}

					}
				});
			},

			delectImg: function(index) {
				//删除上传图片数组里面的某一张图片

				var imgArray = this.imgArray;
				imgArray.splice(index, 1);

				this.imgArray = imgArray;

			},

			upLoadimgs: function(a) {
				console.log('wadad', a);

				var current_fieldname = a.currentTarget.dataset.name;
				var current_seq = a.currentTarget.dataset.seq;

				var current_index = a.currentTarget.dataset.index;
				console.log('current_index====>>>>' + current_index);

				console.log('current_fieldname====>>>>' + current_fieldname);
				console.log('current_fieldname====>>>>' + typeof(current_fieldname));

				var current_todel = a.currentTarget.dataset.todel;
				console.log('current_todel====>>>>' + current_todel);


				//return;

				var that = this;

				//如果是删除上传的图片
				if (current_todel && (current_todel == 1)) {
					that.$emit('delete_item_of_image_upload_list', {
						'key': current_index,
						'val': ''
					});

					return;
				}


				//=======测试上传图片 Begin ===========
				//var current_fieldname = 'paizhao';
				//var new_img_url = 'http://saas.tseo.cn/staticsvc/uploads/2022/06/25/e54092fd8425305274e08022e7c652436646.png';

				//测试emit 和 on
				//that.$emit('update_image_upload_list', {'key':current_index, 'val':new_img_url});
				//return;

				//直接刷新视图
				//that.$set(that.image_upload_list, current_fieldname, new_img_url);
				//that.$forceUpdate();
				//return;
				//=======测试上传图片 End ===========

				var userInfo = this.abotapi.get_user_info();

				var formData = {};
				formData.sellerid = that.abotapi.globalData.default_sellerid;

				if (userInfo && userInfo.userid) {
					formData.checkstr = userInfo.checkstr;
					formData.userid = userInfo.userid;
				}

				//  

				uni.chooseImage({
					// count:  允许上传的照片数量
					count: 9,
					// sizeType:  original 原图，compressed 压缩图，默认二者都有
					//sizeType: "original",
					sizeType: "compressed",
					success(res) {
						console.log(res, 'aaaaa8888')

						for (var i = 0; i < res.tempFilePaths.length; i++) {
							var filepath = res.tempFilePaths[i];

							//var filepath = res.tempFilePaths[0];

							console.log('uni.uploadFile ===>>>> ', filepath)
							console.log('8888888888===>', that.abotapi.globalData.yanyubao_server_url);

							uni.uploadFile({
								url: that.abotapi.globalData.yanyubao_server_url +
									'/?g=Yanyubao&m=ShopAppWxa&a=upload_image_file_by_user',
								filePath: filepath,
								name: 'file',
								formData: formData,
								success: function(res) {

									console.log('res===>>', res.data);

									var obj = JSON.parse(res.data);

									//发送事件：update_image_upload_list
									that.$emit('update_image_upload_list', {
										'key': current_index,
										'val': obj.img_url
									});

									console.log('image_upload_list 强制刷新界面 ==>>' +
										current_fieldname + ' ==>> ' + obj.img_url);



								}
							});

						} // end of for(filepath in res.tempFilePaths)



					}


				});


			},


			// 删除图片
			deletePic8888(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式

				console.log("afterRead_event=====>>>>", event)

				let lists = [].concat(event.file)

				console.log("lists", lists)

				let fileListLen = this[`fileList${event.name}`].length

				console.log("fileListLen", fileListLen)

				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url, lists[i].type, event.file)
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
			uploadFilePromise(url, type, file) {

				console.log("uploadFilePromise_url=====>>>>", url)

				var action = type == 'file' ? 'uploadfile' : 'uploadimage'

				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: work_flow_api.work_flow_server + '/?m=Upload&a=ueditor&method=POST&action=' +
							action,
						filePath: url,
						name: 'upfile',
						// formData: {
						// 	user: 'test'
						// },
						success: (res) => {

							console.log("res======>>>>>", res);

							console.log("res.data ======>>>>> ", JSON.parse(res.data));

							var url_list = JSON.parse(res.data);

							console.log("url_list ======>>>>> ", url_list);

							// this.model1.push({
							// 	"key": this.form_field.field_display_name,
							// 	"value": url_list.url
							// })

							// console.log("model1 =====>>>>> ", this.model1)

							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},

			change(e) {
				console.log('change', e);
				// for (let i = 0; i < this.form_field.length; i++) {
				// 	var textdictionary = {
				// 		"key": this.form_field[i].field_name,
				// 		"value": this.model1.text,
				// 	};

				// }
				// this.model1.push(textdictionary)
				// console.log("model1====", this.model1);
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

			checkboxChange2222(n) {
				console.log('checkboxChange===>>>', n);

				//this.checkboxValue1 = n;

				//console.log("this.checkboxValue1", this.checkboxValue1);

				var items = this.form_field.field_option_key;

				values = n.detail.value;

				for (var i = 0, lenI = items.length; i < lenI; ++i) {

					const item = items[i];

					if (values.includes(item.value)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
			},


			//提交表单
			submit() {
				console.log("model1====", this.model1);




			},
			input_content_change(){
				var that = this;
				console.log("that.input_content====", that.input_content);
				
			},
			

		},
		filters: {
			/**
			 * 处理富文本里的图片宽度自适应
			 * 1.去掉img标签里的style、width、height属性
			 * 2.img标签添加style属性：max-width:100%;height:auto
			 * 3.修改所有style里的width属性为max-width:100%
			 * 4.去掉<br/>标签
			 * @param html
			 * @returns {void|string|*}
			 */
			formatRichText(html) { //控制小程序中图片大小
				let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi,
						'max-width:100%;');
					return match;
				});
				//newContent = newContent.replace(/<br[^>]*\/>/gi, '');

				newContent = newContent.replace(/<p[^>]*>/gi, '<p style="margin:10px;">');

				newContent = newContent.replace(/\<img/gi,
					'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;vertical-align: middle;"'
				);

				newContent = newContent.replace(/<h1[^>]*>/gi, '<h1 class="wxParse-h1">');
				newContent = newContent.replace(/<h2[^>]*>/gi, '<h2 class="wxParse-h2">');

				return newContent;
			}

		},

	};
</script>
<style lang="scss">
	@import url("@/components/gaoyia-parse/parse.css");

	.wxParse {
		width: 95%;
		margin: 0 auto;
	}

	.FH {
		color: red;
	}

	.fabu_xuzhi_block {
		display: flex;
		font-size: 24rpx;
		color: #666;
		align-items: center;
		margin: 20rpx 34rpx 20rpx 50rpx;
		clear: both;

	}

	.btn-row-submit {
		width: 90%;
		margin-left: 5%;
		border-radius: 5px;
		background-color: #fff;
		margin: 20rpx auto;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #07c160;
		color: #fff;
		font-size: 32rpx
	}

	.input-flex-label {
		width: 26%;
		line-height: 60rpx;
		font-size: 28rpx;
	}

	.bk888888 {
		color: #333;
		margin-left: 77%;
		line-height: 43rpx;
	}

	.textarea_flex {
		padding: 40rpx;
		border-bottom: 1px solid #FFFFFF;
	}

	.box_1 {
		overflow: auto;
		font-size: 30rpx;
		padding: 20rpx 40rpx;
		border-bottom: 1px solid #EEEEEE;
		background: #FFFFFF;
		height: 80rpx;
		line-height: 80rpx;
	}

	.box-file-upload {
		overflow: auto;
		font-size: 30rpx;
		padding: 20rpx 40rpx;
		border-bottom: 1px solid #EEEEEE;
		background: #FFFFFF;
	}

	.box-checkbox {
		overflow: auto;
		font-size: 30rpx;
		padding: 20rpx 40rpx;
		border-bottom: 1px solid #EEEEEE;
		background: #FFFFFF;
	}


	.box_1 input {
		float: left;
		width: 70%;
		margin-top: -4rpx;
		border: 1rpx solid #a2a2a2;
		height: 60rpx;
	}

	.box_2 {
		float: left;
		font-size: 28rpx;
	}

	.box_3 {
		float: left;
		margin-left: 40rpx;
	}

	.box_text {
		/* position: relative; */
		/* top: -8rpx; */
		color: #666666;
	}

	.uni-textarea002 {
		background: #FFFFFF;
		height: 430rpx;
	}

	.uni-textarea002 textarea {
		padding: 8rpx;
		margin: 0 auto;
		font-size: 30rpx;
		width: 90%;

	}


	.input-flex {
		/* background: #FFFFFF; */
	}

	.zhezhao {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.7);
		z-index: 998;

	}

	.kcrzxy {
		width: 70%;
		left: 50%;
		top: 15%;
		position: fixed;
		transform: translate(-50%, 0);
		background: #fff;
		border-radius: 10px;
		z-index: 999;

	}

	.kcrzxyhd {
		text-align: center;
		font-size: 28rpx;
		background: #f44444;
		height: 70rpx;
		line-height: 70rpx;
		color: white;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;

	}

	.kcrzxybd {
		font-size: 28rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;

	}

	scroll-view {
		display: block;
		width: 100%;

	}

	.queren {
		position: relative;
		width: 30%;
		left: 35%;
		font-size: 30rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: white;
		background: #f44444;
		border-radius: 10rpx;
		margin: 5px 0;

	}

	.up_images {
		float: right;
		background-color: #67C23A;
		padding: 10rpx;
		border-radius: 5px;
		color: #fff;
	}

	.error_tips {
		display: flex;
		float: left;
		margin-right: 15rpx;
		line-height: 60rpx;
	}


	/* 在这 */


	.date-gray-background {

		top: 183rpx;
		background: rgba(0, 0, 0, .5);
		height: calc(100% - 500rpx);
	}

	.chaxunjieguo {

		overflow: scroll;

		color: black;
	}

	.chaxunjieguo text {

		display: block;
		text-align: center;
		padding-bottom: 10rpx;
	}

	.date-container {
		position: absolute;

		overflow: hidden;
		background: #fff;
		bottom: 0;
		z-index: 1000;
	}

	.date-confirm {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		font-size: 34rpx;
		line-height: 70rpx;
		color: var(--ThemeColor)
	}

	.pickViewColumn {
		height: 600rpx;
		/* margin-top: -300rpx; */
	}

	.indicator {
		height: 80rpx;
		/* border: 1rpx solid #E5E8E8; */
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