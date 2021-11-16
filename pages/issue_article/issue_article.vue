<template>
	<view>
		<view>
			<view class="main-body">
				<form @submit="formSubmit">
					<!-- <view class="input_flex" style="overflow: auto;padding:35upx 40upx 20upx 40upx;background-color: #FFFFFF;border-bottom: 1upx solid #DDDDDD;">
						<view class="input-flex-label w60" style="float: left;">标题<label class="FH">*</label></view>
						<input style="float: left;width: 70%;margin-top: -4upx;" name="img_title" maxlength="40" placeholder-style="color:#c3c3c3" placeholder="请输入合作需求的标题,5-40个字" />
					</view> -->
					
					<block v-for="item in list" :key="item">

						<view class="box_1" v-if="item.inputtype == 'select'">
							<picker @change="bindPickerChange" :value="index" :range="item.options" :data-fieldname="item.fieldname">
								<view style="overflow: auto;">
									<view class="box_2">
										<text>{{item.displayname}}</text><label class="FH" v-if="item.require == 1">*</label>
									</view>
									<view class="box_3">
										<text class="box_text">{{item.options[item.index]}}</text><image v-if="!item.options[item.index]" style="width: 40upx;" mode="widthFix" src="../../static/img/x_right.png"></image>
									</view>
								</view>
							</picker>
							<input :name="item.fieldname" :value="item.options[item.index]" :hidden='true' />
						</view>
						
						<view class="box_1" v-if="item.inputtype == 'checkbox'">
							<checkbox-group @change="checkboxChange" :name="item.fieldname" :data-name="item.fieldname">
								<view style="overflow: auto;margin-bottom:40upx;">
									<view class="box_2">
										<text>{{item.displayname}}</text>
										<label class="FH" v-if="item.require == 1">*</label>
									</view>
								</view>
								<label v-for="(item02,index) in item.options" :key="item02.value">
									<view style="margin-left: 34upx;float: left;">
										<checkbox :value="item02">
											<view>{{item02}}</view>
										</checkbox>
									</view>
								</label>
							</checkbox-group>
						</view>
						
						
						<view class="uni-textarea" style="padding: 0upx 40upx;" v-if="item.inputtype == 'textarea' && item.fieldname != 'imgimg_content'">
							<view style="font-size: 32upx;border-bottom: 1upx solid #EEEEEE;background-color: #FFFFFF;padding: 20upx 0upx;">{{item.displayname}}</view>
							<textarea :name="item.fieldname" placeholder='请在此填写详细说明' /><!-- placeholder-style="color:#D3D3D3;font-size:15px;" -->
						</view>
						
						<view class="input_flex" v-if="item.fieldname == 'imgimg_title'" style="overflow: auto;padding:35upx 40upx 20upx 40upx;background-color: #FFFFFF;border-bottom: 1upx solid #DDDDDD;">
							<view class="input-flex-label w60" style="float: left;">标题<label class="FH">*</label></view>
							<input style="float: left;width: 70%;margin-top: -4upx;" name="imgimg_title" maxlength="40" placeholder-style="color:#c3c3c3" placeholder="请输入合作需求的标题,5-40个字" />
						</view>
						
						<view class="input-flex" style="overflow: auto;border-bottom: #DDDDDD 1upx solid;padding:17px 20px 10px" v-if="item.inputtype== 'date' || item.inputtype== 'text' && item.fieldname != 'imgimg_title'">
							<view class="input-flex-label w60" style="float: left;">{{item.displayname}}<label class="FH" v-if="item.require == 1">*</label></view>
							<input :type='item.inputtype'  name="item.fieldname" style="float: left;width: 70%;" placeholder="点此输入" value="" v-if="item.inputtype== 'text'"/>
							 <picker mode="date" :value="date" :start="startDate" style="margin-left: 55%;margin-top: 6upx;" :type='item.inputtype' :end="endDate" @change="bindDateChange"  :data-fieldname='item.fieldname' v-if="item.inputtype== 'date'">
								<view class="uni-input">{{date}}</view>
							</picker>
							
						</view>
				
					
					</block>
					
					
					<!-- <upimg-box></upimg-box> -->
					<button formType="submit" style="font-size: 32upx;" :style="{backgroundColor:red}" class="btn-row-submit">{{submit_text}}</button>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	// import pickergroup from "../../components/pickergroup.vue";
	// import upimgBox from "../../components/upimgbox.vue";
	// var app = require("../../common/common.js");
	// var apps = getApp();
	// var userInfo = app.get_user_info();
	
	export default {
		// components:{
		// 	pickergroup,
		// 	upimgBox
		// },
		data:function(){
			
			const currentDate = this.getDate({
			            format: true
			        })
					
			return {
				pageData:{},
				formid:'',
				hezuodiqu: [],
				tigongziyuan:[],
				xunqiuziyuan:[],
				youxiaoshijian:[],
				tigongziyuanmiaoshu:[],
				xunqiuziyuanmiaoshu:[],
				lianxifangshi:[],
				inputtype:'',
				list:[],
				red:'red',
				index:0,
				data2:'',
				submit_text:'',
				catename:'',
				date: currentDate,
				input_youxiaoshijian: '',
				bg_color:'',
				checkbox_field_value_list:[],
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
			
		onLoad: function (options) {
			var that = this;
			console.log("options",options);
			
			this.formid = options.classid; //栏目页面跳转带过来的参数  栏目id
			this.catename = options.name; //栏目页面跳转带过来的参数  栏目名称
			
			
			this.getArticleList()
			
			// app.set_option_list_str(null, function(){
			// 	that.bg_color = app.getColor();
			// 	console.log("bg_color",that.bg_color);
				
			// });
			
			// console.log("CLASSID",that.formid);
		},
		onShow: function(){
			var that = this;
			//判断登录
			var home_url = '/pages/issue_article/issue_article';
			this.abotapi.goto_user_login(home_url, 'normal');
			//end
			
		},
		onReady: function () {
			uni.setNavigationBarTitle({
				title: this.catename,
			})
		},
		methods: {
			
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
 
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},			
			
			
			formSubmit:function(e){
				var that=this;
				console.log('e=====',e);
				
				var input_value = e.detail.value;
				input_value.input_youxiaoshijian = this.date;
				
				//将checkbox的值追加到要提交的数组上
				for(var key in that.checkbox_field_value_list){
					input_value[key] = that.checkbox_field_value_list[key];
				}
				
				console.log('input_value=====>>>>>', input_value);
				
				input_value = encodeURIComponent(JSON.stringify(input_value));			
				var userInfo = that.abotapi.get_user_info(); 
				uni.request({
					url:that.abotapi.globalData.weiduke_server_url + '/openapi/ArticleImgApi/add_article_item',
					method:'POST',
					header:{'Content-Type': 'application/x-www-form-urlencoded'},
					data:{
						classid:that.formid,
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						token: that.cms_token,
						input_value:input_value
					},
					success: function(res) {
						console.log('ddddddddddddddddd',res);
						if(res.data.code == 1){
							
							
							uni.showToast({
								 title: res.data.msg,
							})
							setTimeout(function(){
								console.log(1);
								uni.navigateTo({
									url:"/pages/index/abotlist?classid="+that.formid
								})
							},1000)
						}
										
					}
				
				});
			
			},
			toCooperationArea:function(){
				console.log(123);
			},
			getArticleList:function(){
				console.log(123456789);
				
				var shop_option_data = uni.getStorageSync('shop_option_data');
				var json_shop_option_data = JSON.parse(shop_option_data);
				this.cms_token = json_shop_option_data.option_list.cms_token;
				console.log('cms_token',this.cms_token);
				var that = this;
				
				// 微读客获取文章列表   console.log(apps.globalData.weiduke_server_url);
				//http://192.168.0.88/weiduke_cms/index.php/openapi/ArticleImgApi/article_list?token=gwcuuk1411034699&cataid=22&page=0
				uni.request({
					url:that.abotapi.globalData.weiduke_server_url + '/openapi/SelfformData/get_selfform_option',
					method:'POST',
					header:{'Content-Type': 'application/x-www-form-urlencoded'},
					data:{
						token: that.cms_token,
						formid:that.formid
					},
					success(res) {
						console.log('87878787',res);
						if(res.data.code == 1){
							var list = res.data.data;							
							that.submit_text = res.data.submit_text;
								for(var i=0; i<list.length; i++){
									
									if(list[i].options){
										list[i].options = list[i].options.split('|');
										
										list[i].index = 0;
										
										if(list[i].inputtype == 'select'){
											list[i].options.unshift('');
										}
										else if(list[i].inputtype == 'checkbox'){
											
											console.log('1111111111====>>>>', list[i].options);
											/*
											for(var j = 0; j<list[i].options.length; j++){
												var shiArrKey = {
													name:j,
													namestr:list[i].options[j],
													//checkbox_value:''+ i + '_' + j
													checkbox_value:''+ i + '___' + list[i].fieldname + '___' + list[i].options[j]
												};
												//list[i].options[j].name = j;
												//list[i].options[j]['namestr'] = list[i].options[j];
												//list[i].options[j]['checkbox_value'] = ''+ i + '_' + j;
												
												list[i].options[j] = shiArrKey;
												
											}*/
										}
									}
									
																						
								}
								
								that.list = list;
								
								console.log('的点点滴滴',list)
								
								
								
							}
										
						}

				});
			},
			
			
			bindPickerChangeshengArr: function (e) {
			    console.log(e);
				// this.shengIndex = e.detail.value;
				
			    var that = this;
			    // var region_Val = e.detail.value
			    var region_Id = ++e.detail.value;
			    console.log('123?',region_Id);
			    uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=region_get',
					data: {
						region_id: ++region_Id,
					},
					method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
					header: {// 设置请求的 header
						'Content-Type':  'application/x-www-form-urlencoded'
					},
					success: function (res) {
						// success
						// var code = res.data.code;
						that.city = res.data.data;
						if(res.data.code==1){
							var hArr = [];
							var hId = [];
							hArr.push('请选择');
							hId.push('0');
							for (var i = 0; i < that.city.length; i++) {
								hArr.push(that.city[i].region_name);
								hId.push(that.city[i].region_id);
							}
							this.province = region_Id;
							this.shi = res.data.data;
							this.shengArr = hArr;
							this.shengId = hId;
							
							console.log('shengArr',this.shengArr);
							console.log('shengId',this.shengId);
						}
					},
					fail: function () {
						// fail
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					},
			
			    })
			},
			
			checkboxChange: function (e) {
				console.log("eeeeeeeeeeeeee===>>>", e);
				
				var that = this;
				var values = e.detail.value;
				
				//组合checkbox的值，关键是xml中要加 data-name，这样才能取到name
				
				var fieldname = e.currentTarget.dataset.name;
				var field_value_str = '';
				
				if(values.length > 0){
					field_value_str = values.join('|');
				}
				
				that.checkbox_field_value_list[fieldname] = field_value_str;
				
				/*
				for(var i = 0; i < values.length;i++){
					//that.cityDetail[values[i]].checked = true;
					var tempstr = values[i];
					var temp_list = tempstr.split('___');
					
					console.log("11111111111111===>>>", temp_list);
					
					if(temp_list.length < 3){
						continue;
					}
					
					fieldname = temp_list[1];
					
					field_value_str += temp_list[2]+'|';
				}
				
				that.checkbox_field_value_list[fieldname] = field_value_str;
				*/
			   
				console.log('zzzzzzzz====>>>', that.checkbox_field_value_list);
			},
			
			
			
			
			
			
			bindPickerChange:function(e){
				var that = this;
				var fieldname = e.currentTarget.dataset.fieldname;
				var list = that.list;
				var index = e.detail.value;
				
				for(var i=0; i<list.length; i++){
					
					if(list[i].fieldname == fieldname){
						list[i].index = index;
					}
																																					
				}
				
				console.log('ssss',e)
			},

			bindDateChange: function(e) {
				console.log('bindDateChange==',e)
								
				this.date = e.target.value;
			},

			
		},
	}
</script>

<style>
	
	.FH{
		color: red;
	}
	
	.btn-row-submit{
		width: 80%;
		margin-left: 10%;
		background-color: #FF4500;
		border: none;
		color: white;
		text-align: center;
		display: inline-block;
		border-radius: 40upx;
		font-size: 40upx;
	}
	.input-flex-label{
	    width: 30%;
	    line-height: 43rpx;
	    font-size: 32rpx;
	}
	.bk{
		color: #333;
		margin-left: 77%;
		line-height: 43rpx;
	}
	
	.textarea_flex{
		padding: 40upx;
		border-bottom: 1px solid #FFFFFF;
	}
	.box_1{
		overflow: auto;
		font-size: 32upx;
		padding: 20upx 40upx;
		border-bottom: 1px solid #EEEEEE;
		background: #FFFFFF;
	}
	.box_2{
		float: left;
	}
	.box_3{
		float: right;
	}
	
	.box_text{
		/* position: relative; */
		/* top: -8rpx; */
		color: #007AFF;
	}
	.uni-textarea{
		background: #FFFFFF;
		border-bottom: 1px solid #DDDDDD;
	}
	
	.uni-textarea textarea{
		padding: 8upx 8upx 0upx 0upx;
		font-size: 35upx;
		color: #AAAAAA;
	}
	.input-flex{
		/* background: #FFFFFF; */
	}
	/* .input-flex input {
	    display: block;
	    font-size: 32upx;
	    line-height: 24upx;
	    height: 34upx;
	    min-height: 48upx;
	    overflow: hidden;
		position: relative;
		
		left: 24%;
		text-align: right;
	} */
	
</style>
