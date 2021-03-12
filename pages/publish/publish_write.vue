<template>
	<view>
		
		<view>
			<view class='wenzhang_detail'>
			    <image style="width: 100%;" v-if="form_logourl"
					:src="form_logourl" mode="widthFix"></image>
			    <view v-if="form_intro" 
					style="margin: 20rpx;font-size: 28rpx;color: #555;word-break: break-word;">{{form_intro}}</view>

			    <view class="wxParse"> 
			        <scroll-view  scroll-y='true'>
			           <!-- #ifdef MP-ALIPAY -->
			           					<rich-text :nodes="form_content"></rich-text>
			           <!-- #endif -->				
			           <!-- #ifndef MP-ALIPAY -->
			           					<rich-text :nodes="form_content|formatRichText"></rich-text>
			           <!-- #endif -->	
			        </scroll-view>
			    </view>
			</view>
			
			
			<!--平铺广告图片start-->
			<view style='width:100%;background-color: #fff;margin-top: 20rpx;' 
				v-if="(ad_img_list != null)||(ad_img_list != '')">
			     <block  v-for="item in ad_img_list" :key="item.swiperid">
			      <image style='width:100%;vertical-align: middle;' 
					mode="widthFix" bindtap="go_to_ad_img_url" 
					:src='item.image' :data-url="item.url"></image>
			     </block>
			</view>
			<!--平铺广告图片end-->
			
			
			<view class="main-body">
				
				<form @submit="formSubmit">
					<block v-for="item in list" :key="item.fieldname">
						<!-- 帖子的固定字段开始 -->
						<block v-if="form_type == 3">
							<view class="input_flex" v-if="item.fieldname == 'imgimg_title'" style="overflow: auto;padding:35upx 40upx 20upx 40upx;background-color: #FFFFFF;border-bottom: 1upx solid #EEEEEE;">
								<view class="input-flex-label w60" style="float: left;">标题<label class="FH">*</label></view>
								<input style="float: left;width: 70%;margin-top: -4upx;" name="imgimg_title" maxlength="40" placeholder-style="color:#c3c3c3" placeholder="请输入标题" />
							</view>
							
							<view class="uni-textarea" style="" v-if="item.fieldname == 'imgimg_content'">
								<view style="padding: 16rpx 34rpx;font-size: 32upx;background-color: #FFFFFF;">{{item.displayname}}</view>
								<textarea style="padding: 16rpx 34rpx;" :name="item.fieldname" placeholder='请在此填写详细说明' /><!-- placeholder-style="color:#D3D3D3;font-size:15px;" -->
							</view>
							
							<view style="" v-if="item.fieldname == 'imgimg_picture_list'">
								<!-- 上传图片 -->
								<view style="display: flex;flex-wrap:wrap;">
									<!-- 放上传的图片 -->
									<view style="width: 32%;height: 250upx;position: relative;" v-for="(items,index) in imgArray" :key="items">
										<view style="width: 100%;position: absolute;z-index: 9999;">
											<image @tap="delectImg(index)"  style="width: 50upx;height: 50upx;position: absolute;right:0" src="../../static/img/delete_red.png"></image>
										</view>
										
										<image style="width: 100%;height: 100%;" mode="aspectFit" :src="items"></image>
									</view>
									
									
									<view style="margin: 2px 10px 2px 17px;width: 250upx;height: 250upx;position: relative;" @tap="uploading_img()">
										<image style="width: 100%;height: 100%;border: 1px solid #eee;" src="../../static/img/add.png"></image>
									</view>
									
								</view>
								
							</view>
						</block>
						<!-- 帖子的固定字段结束 -->
						
						<view class="box_1" v-if="item.inputtype == 'select'">
							<picker @change="bindPickerChange" :value="index" :range="item.options" :data-fieldname="item.fieldname">
								<view style="overflow: auto;">
									<view class="box_2">
										<text>{{item.displayname}}</text><label class="FH" v-if="item.require == 1">*</label>
									</view>
									<view class="box_3">
										<text class="box_text">{{item.options[item.index]}}</text>
										<image v-if="!item.options[item.index]" 
											style="width: 40upx;" mode="widthFix" src="../../static/img/x_right.png"></image>
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
						
						
						<view class="uni-textarea" style="padding: 0upx 40upx;" v-if="item.fieldname != 'imgimg_content' && item.inputtype == 'textarea'">
							<view style="font-size: 32upx;border-bottom: 1upx solid #EEEEEE;background-color: #FFFFFF;padding: 20upx 0upx;">{{item.displayname}}</view>
							<textarea :name="item.fieldname" placeholder='请在此填写详细说明' /><!-- placeholder-style="color:#D3D3D3;font-size:15px;" -->
						</view>
						
						
						
						<view class="input-flex" style="overflow: auto;border-bottom: #DDDDDD 1upx solid;padding:17px 20px 10px" v-if="item.inputtype== 'date' || item.inputtype== 'text' && item.fieldname != 'imgimg_title'">
							<view class="input-flex-label w60" style="float: left;">{{item.displayname}}<label class="FH" v-if="item.require == 1">*</label></view>
							<input :type='item.inputtype'  
								:name="item.fieldname" 
								style="float: left;width: 70%;" 
								placeholder="点此输入" 
								value="" 
								v-if="item.inputtype== 'text'"/>
							 <picker mode="date" :value="date" :start="startDate" style="margin-left: 55%;margin-top: 6upx;" :type='item.inputtype' :end="endDate" @change="bindDateChange"  :data-fieldname='item.fieldname' v-if="item.inputtype== 'date'">
								<view class="uni-input">{{date}}</view>
							</picker>
							
						</view>
						
						
					
					</block>
					
					
					<!-- <upimg-box></upimg-box> -->
					<view class="fabu_xuzhi_block"> 
					
						<checkbox-group name='fabu_xuzhi' style="zoom:70%;margin-right: 8rpx;">
								<checkbox value="1">
									
								</checkbox>
						</checkbox-group>
						<view>我已阅读并同意<text @click="knows" style="color: #007AFF;">《内容规范》</text></view>
					</view>
					<button formType="submit" class="btn-row-submit"
						:style="{backgroundColor:wxa_shop_nav_bg_color}">{{submit_text}}</button>
				</form>
				
				<!-- 发布须知的弹层 -->
				<view class="zhezhao" v-if="know==true"></view>
				<view class="kcrzxy" v-if="know==true">
				    <view class="kcrzxyhd" :style="{background:wxa_shop_nav_bg_color, fontSize:'26rpx'}">内容规范</view>
				    <scroll-view scrollY class="kcrzxybd" style="height: 600rpx;">
				        <textarea :value="publish_write_fabu_xuzhi" 
							disabled="disabled"
							style="width: 100%;" 
							auto-height='true' 
							maxlength="-1"></textarea>
				    </scroll-view>
				    <view @click="knows" class="queren" :style="{background:wxa_shop_nav_bg_color, fontSize:'26rpx'}">确定</view>
				</view>
				
			</view><!-- End of main-body -->
		</view>
	</view>
</template>

<script>
	
	export default {
		
		data:function(){
			
			const currentDate = this.getDate({
				format: true
			})
					
			return {
				pageData:{},
				
				formid:'',
				
				know:false,
				
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
				imgArray:[],//存放上传图片的数组
				submit_text:'提交信息',
				catename:'',
				date: currentDate,
				input_youxiaoshijian: '',
				bg_color:'',
				checkbox_field_value_list:[],
				
				form_type:3,
				submit_url:'', //即将提交表单的url 如果没有就用默认
				
				wxa_shop_nav_bg_color:'',
				publish_write_fabu_xuzhi:'',//发帖须知
				
				current_params_str:'',
				
				//微读客CMS平台的万能表单中定义的表单的logo、简介和内容
				form_logourl:'',
				form_intro:'',
				form_content:'',
				
				//首页 > 功能扩展 > 万能表单 中定义的平铺广告图片
				ad_img_list:'',
				
				cms_token:'',
				
				current_options: null,
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
			console.log('sssssss ===>>>',  options)
			
			this.current_options = options;
			
			
			var that = this;
			
			//=====分析参数=====
			if(options){
			  var arr = Object.keys(options);
			  var options_len = arr.length;
		
			  if (options_len > 0){
				var params_str = '';
		
				for(var key in options){
				  params_str += key+'='+options[key]+'&';
				}
				params_str = params_str.substr(0, params_str.length - 1);
		
				that.current_params_str = params_str;
			  }
			}
			//===== End ======
			
			this.form_typ = 3;
			//console.log('options',options);
			
			if(options.form_type){
				this.form_type = options.form_type;
			}
			
			if(options.submit_url){
				this.submit_url = options.submit_url;
			}
			
			if(options.form_type && options.form_type == 2){
				this.formid = options.formid; //栏目页面跳转带过来的参数  栏目id
			}
			else{
				this.formid = options.cataid; //栏目页面跳转带过来的参数  栏目id
			}
			
			//2021.2.4.  如果参数设置了CMS token，则不适用系统设置的
			if(options.token){
				this.cms_token = options.token;
			}
			
			this.catename = options.name; //栏目页面跳转带过来的参数  栏目名称
			
			this.abotapi.set_option_list_str(that, function(that002, shop_option_data){
				console.log('shop_option_data',shop_option_data);
				
				
				that002.publish_write_fabu_xuzhi = shop_option_data.publish_write_fabu_xuzhi;
				that002.wxa_shop_nav_bg_color = shop_option_data.wxa_shop_nav_bg_color;
				
				console.log('======>>>>>that002.wxa_shop_nav_bg_color ====>>>'+that002.wxa_shop_nav_bg_color);
				
				
				that.getWriteFormInputList();
				
			});
			
			
			
			//判断登录（如果不是 2 万能表单，其他情况都要求用户登录后才能进入填写表单）
			var userInfo = that.abotapi.get_user_info();		
			if(( (this.form_type != 2) || ((this.form_type == 2) && options.mustlogin && (options.mustlogin == 1) ) ) 
				&& (!userInfo || !userInfo.userid)){
				
				
				//var last_url = '/pages/publish/publish_write?classid='+this.formid+'&name='+this.catename+'&submit_url='+this.submit_url+'&form_type='+this.form_type;
				var last_url = '/pages/publish/publish_write';
				if(that.current_params_str.length > 5){
					last_url = '/pages/publish/publish_write?'+that.current_params_str;
				}
				
				this.abotapi.goto_user_login(last_url, 'normal');
								
			}
			
			
			//2020.5.7. 加载图片平铺广告
			this.abotapi.abotRequest({
			  url: that.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/SelfformData/get_ad_list',
			  data: {
				sellerid: that.abotapi.get_sellerid(),
			  },
			  success: function (res) {
				if(res.data && (res.data.code == 1)){
				  var ad_img_list = res.data.ad_img_list;
		
				  that.ad_img_list = ad_img_list;
				}
		
		
			  },
			});
			
			
		},
		onShow: function(){
			console.log('sssssss',2)
			var that = this;
			
			
			
			//end
			 
		},
		onReady: function () {
			
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
			
			//提交表单数据
			formSubmit:function(e){
				
				if(e.detail.value.fabu_xuzhi[0] != 1){
					uni.showToast({
						title:'请阅读发布须知',
					})
					return;
				}
				
				
				var that=this;
				
				var input_value = e.detail.value;
				//input_value.input_youxiaoshijian = this.date;
				var picture_list = encodeURIComponent(JSON.stringify(this.imgArray));
				//将checkbox的值追加到要提交的数组上
				for(var key in that.checkbox_field_value_list){
					input_value[key] = that.checkbox_field_value_list[key];
				}
				
				for(var key in e.detail.value){
					
					for(var keys in that.list){
						console.log('456',key);
						console.log('123',that.list);
						if(key == that.list[keys]['fieldname']){
							if(that.list[keys]['require'] == 1){
								//判断是否为必填（是）
								if(!e.detail.value[key]){
									uni.showToast({
										title:'请填写'+that.list[keys]['displayname']
									})
									return;
								}
							}
						}
						
					}
					
				}
				
				
				input_value = encodeURIComponent(JSON.stringify(input_value));			
				var userInfo = that.abotapi.get_user_info();
				
				var submit_url =  '';
				var post_data = {}
				
				if(that.form_type == 1){//延誉宝会员扩展属性
					submit_url = that.abotapi.globalData.yanyubao_server_url+'index.php/Yanyubao/ShopAppWxa/user_set_ext_info_list';
					
					post_data = {
						sellerid:that.abotapi.get_sellerid(),
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
					}
					console.log('e.detail.value',e.detail.value);
					for(var key in e.detail.value){
						
						post_data[key] = e.detail.value[key];
					}
					console.log(post_data);
				}else if(that.form_type == 2){//微读客的万能表单
					submit_url = that.abotapi.globalData.weiduke_server_url+'index.php/openapi/SelfformData/submit_data_url_selfform';
					
					post_data = {
						token:that.cms_token,
						formid:that.formid,
						openid:this.abotapi.get_current_openid(),
					}
					
					var userInfo = that.abotapi.get_user_info();
					if(userInfo){
						post_data.userid = userInfo.userid;
					}
					
					for(var key in e.detail.value){
						
						post_data[key] = e.detail.value[key];
					}
					
				}else if(that.form_type == 3){//微读客的帖子
					submit_url = that.abotapi.globalData.weiduke_server_url+'index.php/openapi/ArticleImgApi/add_article_item';
					
					post_data = {
						classid:that.formid,
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						token: that.cms_token,
						input_value:input_value,
						picture_list:picture_list,
					}
					
				}
				
				//如果设置了提交地址，则以这个数据保存地址为准
				if(that.submit_url){
					submit_url = that.submit_url;
					
					//因为数据要外送第三方，所以将checkstr设置成假的
					post_data.checkstr = 'mock_checkstr';
				}
				
				
				//检查是否有隐藏域 （其他参数）
				//var hidden_list = [];
				for(var key in that.current_options){
					if((key == 'form_type')||(key == 'submit_url')||(key == 'formid')
						|| (key == 'cataid') || (key == 'sellerid') || (key == 'token')){
						continue;
					}
		  
					//hidden_list[key] = options[key];
					post_data[key] = that.current_options[key];
				}
				
				
				console.log('11111111111111111111====>>完整的提交数据01：', post_data);
				
				
				that.abotapi.abotRequest({
					url:submit_url,
					data:post_data,
					success: function(res) {
						if(res.data.code == 1){
							
							uni.showModal({
								title:'提交成功',
								content: res.data.msg,
								showCancel:false,
								success: function (res01) {
									
									that.abotapi.call_h5browser_or_other_goto_url('/pages/index/index')
									
								}
							});
							
							/*
							uni.showToast({
								 title: res.data.msg,
							});
							
							setTimeout(function(){
								
								//uni.reLaunch({
								//	url:"../publish/publish_list"
								//});
								
								that.abotapi.call_h5browser_or_other_goto_url('/pages/index/index')
								
							},1000);*/
						}
						else if(res.data.code == -1){
							
							uni.showModal({
								title:'登录超时',
								content: '请重新登录',
								success: function (res) {
									
									that.abotapi.del_user_info();
									
									
									if(res.confirm){
										var last_url = '/pages/index/index';
										that.abotapi.goto_user_login(last_url, 'switchTab');
									}
									
								}
							})
							
							console.log('登录超时');
							return;
						}else{
							uni.showModal({
								title:'提交失败',
								content: res.data.msg,
								showCancel:false,
								success: function (res01) {
									
								}
							})
						}
										
					}
				
				});
			
			},
			toCooperationArea:function(){
				
			},
			//关闭发布须知的遮罩层
			knows: function(e) {
					var know = this.know;
					
					this.know = !know;
					
			},
			getWriteFormInputList:function(){
				
				var shop_option_data = uni.getStorageSync('shop_option_data_' + this.abotapi.globalData.default_sellerid);
				var json_shop_option_data = JSON.parse(shop_option_data);
				
				if(!this.cms_token){
					this.cms_token = json_shop_option_data.option_list.cms_token;
				}
				
				
				var that = this;
				
				//form_type 判断那个url
				var url = '';
				if(that.form_type == 1){
					//会员扩展属性 延誉宝
					url = that.abotapi.globalData.yanyubao_server_url+'openapi/SupplierData/supplier_input_list';
					
					var post_data = {
						sellerid: that.abotapi.globalData.default_sellerid,
					};
					
				}else if(that.form_type == 2){
					//CMS万能表单  微读客
					url = that.abotapi.globalData.weiduke_server_url+'openapi/SelfformData/get_selfform_option';
					
					var post_data = {
						selfform_type: 'selfform',
						token: that.cms_token,
						formid:that.formid
					};
					
				}else if(that.form_type == 3){
					//帖子属性   微读客
					url = that.abotapi.globalData.weiduke_server_url+'openapi/SelfformData/get_selfform_option';
					
					var post_data = {
						selfform_type: 'img_classify',
						token: that.cms_token,
						formid:that.formid
					};
				}
				
				
				// 微读客获取文章列表  				
				that.abotapi.abotRequest({
					url:url,
					data:post_data,
					success(res) {
						
						if(res.data.code == 1){
							
							
							if(res.data.submit_text){
								that.submit_text = res.data.submit_text;
							}
							if(res.data.title){
								uni.setNavigationBarTitle({
									title: res.data.title,
								})
							}
							
							if(res.data.logourl){
							    that.form_logourl = res.data.logourl;
							}
							
							if (res.data.intro) {
								that.form_intro = res.data.intro;
							}
							
							if(res.data.content){
								that.form_content = res.data.content;
								
								// #ifdef MP-ALIPAY
									console.log('that.form_content====>>>>', that.form_content);
									
									const filter = that.$options.filters["formatRichText"];
									that.form_content = filter(that.form_content);
									
									console.log('that.form_content====>>>>', that.form_content);
									
									let data001 = that.form_content;
									let newArr = [];
									let arr = parseHtml(data001);
									arr.forEach((item, index)=>{
										newArr.push(item);
									});
									
									//console.log('arr arr arr====>>>>', arr);
									//console.log('newArr newArr newArr====>>>>', newArr);
									
									that.form_content = newArr;
								
								// #endif	
							}
							
							var list = res.data.data;
							
							for(var i=0; i<list.length; i++){
								
								if(list[i].options){
									if(that.form_type != 1){
										list[i].options = list[i].options.split('|');
									}
									
									
									list[i].index = 0;
									
									if(list[i].inputtype == 'select'){
										list[i].options.unshift('');
									}
									else if(list[i].inputtype == 'checkbox'){
										
									}
								}
								
																					
							}
								
							that.list = list;
							
								
							}
										
						}

				});
			},
			    
			uploading_img:function(){
				//上传图片，调用延誉宝接口返回图片存在   that.imgArray
				var that = this;
				var userInfo = that.abotapi.get_user_info();
				
				//判断已经上传几张，超过9张提示不可以上传
				var imgArray = that.imgArray;
				
				if(imgArray.length >= 9){
					uni.showToast({
						 title: '最多上传9张',
						 duration: 2000
					});
					return;
				}
				
				uni.chooseImage({
					
				    success: function (chooseImageRes) {
						console.log('chooseImageRes',chooseImageRes);
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log('chooseImageRes',tempFilePaths[2]);
						for(let i = 0; i < tempFilePaths.length;i++){
							uni.uploadFile({
							    url: that.abotapi.globalData.yanyubao_server_url + 'openapi/ShopAppV2Data/upload_video_or_img', //仅为示例，非真实的接口地址
							    filePath: tempFilePaths[i],
							    name: 'file',
							    formData: {
							        'sellerid': that.abotapi.globalData.default_sellerid,
									'type': 0,
									'checkstr': userInfo.checkstr,
									'userid': userInfo.userid,
							    },
							    success: function (uploadFileRes) {
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
			
			delectImg:function(index){
				//删除上传图片数组里面的某一张图片
				
				var imgArray = this.imgArray;
				imgArray.splice(index,1);
				
				this.imgArray = imgArray;
				
			},
			
			bindPickerChangeshengArr: function (e) {
			    
			    var that = this;
			   
			    var region_Id = ++e.detail.value;
			    
			    that.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=region_get',
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
				
				var that = this;
				var values = e.detail.value;
				
				//组合checkbox的值，关键是xml中要加 data-name，这样才能取到name
				
				var fieldname = e.currentTarget.dataset.name;
				var field_value_str = '';
				
				if(values.length > 0){
					field_value_str = values.join('|');
				}
				that.checkbox_field_value_list[fieldname] = field_value_str;
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
				
				
			},

			bindDateChange: function(e) {
								
				this.date = e.target.value;
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
			formatRichText (html) { //控制小程序中图片大小
				let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
					return match;
				});
				//newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				
				newContent = newContent.replace(/<p[^>]*>/gi, '<p style="margin:10px;">');
				
				newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;vertical-align: middle;"');
				
				newContent = newContent.replace(/<h1[^>]*>/gi, '<h1 class="wxParse-h1">');
				newContent = newContent.replace(/<h2[^>]*>/gi, '<h2 class="wxParse-h2">');
				
				return newContent;
			}
			
		},
		
	}
</script>

<style>
	
	.FH{
		color: red;
	}
	
	.fabu_xuzhi_block{
		display: flex;
		font-size: 24rpx;
		color: #666;
		align-items: center;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
		padding-left: 34rpx;
	}
	
	.btn-row-submit{
		width: 90%;
		margin-left: 5%;
		border-radius: 5px;
		background-color: #fff;
		margin-bottom: 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #07c160;
		color: #fff;
		font-size: 32rpx

	}
	.input-flex-label{
	    width: 26%;
	    line-height: 43rpx;
	    font-size: 32rpx;
	}
	.bk888888{
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
		border-bottom: 1px solid #EEEEEE;
	}
	
	.uni-textarea textarea{
		padding: 8upx 8upx 0upx 0upx;
		font-size: 35upx;
		
	}
	.input-flex{
		/* background: #FFFFFF; */
	}
	
	.zhezhao {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.7);
	z-index: 998;
	
	}
	.kcrzxy {
	width: 70%;
	left: 50%;
	top: 15%;
	position: fixed;
	transform: translate(-50%,0);
	background: #fff;
	border-radius: 10px;
	z-index: 999;
	
	}
	
	.kcrzxyhd {
	text-align: center;
	font-size: 30rpx;
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
	height: 70rpx;
	width: 30%;
	left: 35%;
	font-size: 30rpx;
	line-height: 70rpx;
	text-align: center;
	color: white;
	background: #f44444;
	border-radius: 10rpx;
	margin: 5px 0;
	
	}






</style>
