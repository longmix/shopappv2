<template>
	<view v-if="owner_flag == 1">
		<view class="flex_paddind_list">
			<button class="width_text_img button_yanshi_quxiao"   
				open-type="contact"
				session-from="scan_qrcode"
				show-message-card="false"
				send-message-title="请输入888"
				send-message-img8888="http://saas.tseo.cn/staticsvc/uploads/2023/01/17/d6af1ddc7f477ceff837f8e3453358a22585.png">
				<image mode="widthFix" style="width: 200rpx;" src="https://yanyubao.tseo.cn/Tpl/static/jianghanyinhua/1.svg"></image>
			<view class="title_font">1、关注公众号</view>
			<view class="font_tishi_typeface">请首先按照提示，在输入框输入“888”，然后按照提示操作，关注公众号：产品码店。</view>
			</button>
			<view class="width_text_img" @tap="go_to_weixin_pay">
				<image mode="widthFix" style="width: 200rpx;" src="https://yanyubao.tseo.cn/Tpl/static/jianghanyinhua/2.svg"></image>
				<view class="title_font">2、产品码店续费</view>
				<view class="font_tishi_typeface">点击这里，给当前的产品码店续费，300元/年，580元/2年，840元/3年，等等。</view>
			</view>
		</view>
		<view class="flex_paddind_list">
			<view class="width_text_img" @tap="go_to_store_management">
				<image mode="widthFix" style="width: 200rpx;" src="https://yanyubao.tseo.cn/Tpl/static/jianghanyinhua/3.svg"></image>
				<view class="title_font">3、店铺管理</view>
				<view class="font_tishi_typeface">申请开店，上架，下架产品，发货，退货管理，提现管理，等等一系列的店铺管理事宜。</view>
			</view>
			<view class="width_text_img" @tap="scan_location">
				<image mode="widthFix" style="width: 200rpx;" src="https://yanyubao.tseo.cn/Tpl/static/jianghanyinhua/4.svg"></image>
				<view class="title_font">4、预览店铺</view>
				<view class="font_tishi_typeface">点击这里，可以模仿顾客扫码进店，查看店铺，检查您的各种店铺设置是否正确。</view>
			</view>
		</view>
		<view class="flex_paddind_list">
			<view class="width_text_img" @tap="qrcode_meihua">
				<image mode="widthFix" style="width: 200rpx;" src="https://yanyubao.tseo.cn/Tpl/static/jianghanyinhua/5.svg"></image>
				<view class="title_font">5、美化店铺码</view>
				<view class="font_tishi_typeface">美化您的店铺相对应的产品码，以适合印刷在各种包装上。</view>
			</view>
			<view class="width_text_img" @tap="scan_remove_mobile">
				<image mode="widthFix" style="width: 200rpx;" src="https://yanyubao.tseo.cn/Tpl/static/jianghanyinhua/laba.png"></image>
				<view class="title_font">6、只宣传，不开店</view>
				<view class="font_tishi_typeface">商家用手机可以上传宣传视频，图片和文字，也可以随时修改，群众可以扫码反馈，商家秒收到反馈。</view>
			</view>
		</view>	
	</view>

</template>

<script>
import locationapi from '../../common/locationapi.js'; 
	
export default {
	data(){
		return{
			markers: [],
			current_latitude: '',
			current_longitude: '',
			current_address:'',
			rgcData: {},
			owner_flag:0,  //订单管理者标记，0 不是订单所有者 1 订单所有者 2 订单所有者要发短信
			display: '',
			showModal: false,
			selfform_mazhu_url:'',
			orderno:null,
			
			map_type:0,
			
			//current_orderno:'',
		};
	},
	onLoad:function(options) {
		var that = this;
		var q = options.q;
		var orderno = null;
		
		that.q = q,
		that.is_send_mess = false
		

		console.log(options);

		if (typeof (q) != 'undefined') {
			console.log('获取到带参二维码参数q：' + q);
			q = decodeURIComponent(q);
			console.log('decodeURI转码后的q：' + q);

			orderno = q.replace('http://jh.tseo.cn/index.php?g=Home&m=Scan&a=index&orderno=', '');
			if (orderno.length > 20) {
				orderno = orderno.replace('http%3A%2F%2Fjh.tseo.cn%2Findex.php%3Fg%3DHome%26m%3DScan%26a%3Dindex%26orderno%3D', '');
			}
			
			console.log('当前orderno的长度：' + orderno.length);
			
			if (orderno.length > 20) {
				console.log('这是体验版的链接');
				//如果是从调试版本进入
				orderno = q.replace('http://jh.tseo.cn/index.php?g=Home&m=Scan&a=index_sandbox&orderno=', '');
				if (orderno.length > 20) {
					orderno = orderno.replace('http%3A%2F%2Fjh.tseo.cn%2Findex.php%3Fg%3DHome%26m%3DScan%26a%3Dindex_sandbox%26orderno%3D', '');
				}
			}
			

			console.log('从q参数得到的 orderno：' + orderno);

			that.orderno = orderno;
			
			//2022.9.25. 增加传递扩展属性的参数
			uni.setStorage({
				key: 'faquan_extend_option_' + that.abotapi.get_sellerid(),
				data: 'jianghanyinhuaorderno:'+ that.orderno,
				success: function (res) {
					console.log('[scan_qrcode]异步保存faquan_extend_option_'+that.abotapi.get_sellerid(),+'成功==>>' + 'jianghanyinhuaorderno:'+that.orderno);
				}

			})


			this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
		
		 

		 
		}

	},
	onShow:function() {
		
	},
	methods:{
		callback_function_shop_option_data:function(that, cb_params){
			console.log('当前调试开关22：' + this.system_debug_flag);
			console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);
			
			if(!cb_params){
				return;
			}
			
			console.log('cb_params====', cb_params);
			
			//var userInfo = that.abotapi.get_user_info();
			
			
			//====1、更新界面的颜色
			//that.abotapi.getColor();
			
			
			if(!cb_params.option_list){
				return;
			}
			
			var orderno = that.orderno;

			that.__wx_login(that, orderno);
			
		},
		
		go_to_set_weixin_notify:function(){
			var that = this;
			var last_url = '/pages/publish/publish_write?form_type=2&token=mrfuhd1546833814&formid=342&submit_url=https%3A%2F%2Fyanyubao.tseo.cn%2Fopenapi%2FJianghanyinhua%2Fsubmit_data_notify_type';

			console.log('go_to_set_weixin_notify====>>>>'+last_url);
			
			var userInfo = that.abotapi.get_user_info();
			if (!userInfo) {
		  	that.abotapi.goto_user_login(last_url);
		  	return;
		  }
		
		  that.abotapi.call_h5browser_or_other_goto_url(last_url);
		},
		go_to_weixin_pay:function(){   
			var that = this;
		  var new_url = 'https://yanyubao.tseo.cn/Home/Jianghanyinhua/order_chongzhi/ensellerid/fSmyUPkjj?wxa_openid=%wxa_openid%&orderno001=' + this.orderno + '&oneclicklogin=%oneclicklogin%';
		    
		  var userInfo = that.abotapi.get_user_info();
		  if (!userInfo) {
		  	that.abotapi.goto_user_login(new_url);
		  	return;
		  }
	
		  that.abotapi.call_h5browser_or_other_goto_url(new_url);
		    
		},
		go_to_store_management:function(){
			var that = this;
			var new_url = 'https://yanyubao.tseo.cn/Home/FactoryInterface/index/sellersn/fSmyUPkjj.html?oneclicklogin=%oneclicklogin%';
			var userInfo = that.abotapi.get_user_info();
			if (!userInfo) {
				that.abotapi.goto_user_login(new_url);
				return;
			}
			console.log('asdasdad',new_url);
			
			that.abotapi.call_h5browser_or_other_goto_url(new_url);
		},
		scan_location:function(){
			var that = this;
			locationapi.get_location(that, that.send_location_sms);
			
		},
		scan_remove_mobile:function(){
		
			var that = this;
			
			
			/*
			uni.showModal({
				title: '提示',
				content: '是否解除绑定？',
				success (res) {
					if (res.confirm) {
						console.log('用户点击确定');
						
						var post_data = {
							openid: that.abotapi.get_current_openid(),
							appid: that.abotapi.globalData.xiaochengxu_appid,        
							orderno: that.orderno,
							sellerid: that.abotapi.get_sellerid(),
						};
						
						that.abotapi.abotRequest({
							url:that.abotapi.globalData.yanyubao_server_url + '/openapi/Jianghanyinhua/remove_mobile_phone',
							method: "POST",
							data: post_data,
							success: function (res) {
								console.log('res', res)
				
								uni.showModal({
									title: '提示',
									content: res.data.msg,
									showCancel: false,
									success: function (res2) {
										uni.switchTab({
											url: '/pages/index/index',
										})
									}
								})
							}
						});
					} 
				}
			});*/
			
			var new_url = '/pages/publish/publish_write?form_type=2&sellerid=' + that.abotapi.get_sellerid();
			new_url += '&token=' + that.abotapi.get_current_weiduke_token();
			new_url += '&formid=325&orderno=' + that.orderno;
			new_url += '&submit_url=https%3A%2F%2Fyanyubao.tseo.cn%2Fopenapi%2FJianghanyinhua%2Fsubmit_user_data';

			that.abotapi.call_h5browser_or_other_goto_url(new_url);
			
		},
		qrcode_meihua:function(){
			
			var that = this;
			
				
			var qrcode_data = decodeURIComponent(that.q);
			  
			console.log('decodeURI转码后的q：' + qrcode_data);
			  
			var orderno = that.orderno;		  
			  
			console.log('45645645',orderno)
			  
			var qrcode_new_url = "https://yanyubao.tseo.cn/index.php?g=Home&m=BeautyQrcode&a=index&ensellerid=pQNNmSkaq&data=";
			qrcode_new_url += encodeURIComponent(encodeURIComponent(qrcode_data)) + "&qrfont_xia=" + orderno ;
			  
			console.log('asdasdaa',qrcode_new_url)
		   
			that.abotapi.call_h5browser_or_other_goto_url(qrcode_new_url);
		},
		
		//获取订单详情
		__wx_login: function (that, orderno){
		  
		
		  var current_openid = that.abotapi.get_current_openid();
		  if(current_openid){
		    that.__get_order_detail(that, orderno, current_openid, that.getMap);
		
		    return;
		  }
		  
		  // #ifndef MP-BAIDU
		  
		  
		
		  //如果没有openid，则获取
		  uni.login({
		    success: function (wxlogin_res) {
		      console.log("btn_one_click_login 获取到的jscode是:" + wxlogin_res.code);
		      that.abotapi.abotRequest({
		        url: that.abotapi.globalData.yanyubao_server_url +  '/Yanyubao/ShopAppWxa/wxa_get_openid_using_js_code',
		        method: "POST",
		        dataType: 'json',
		        data: {
		          js_code: wxlogin_res.code,
		          xiaochengxu_appid: that.abotapi.globalData.xiaochengxu_appid,
		          sellerid: that.abotapi.get_sellerid(),
		        },
		        success: function (http_res) {
		          
		          if (http_res && http_res.data) {
		            if (http_res.data.code == 1) {
		              var openid = http_res.data.openid;
		              console.log('999999999999999999',openid)
		             that.abotapi.set_current_openid(openid);
		
		              that.__get_order_detail(that, orderno, openid, that.getMap);
		            }
		            else {
		              uni.showModal({
		                title: '提示',
		                content: http_res.data.msg,
		                showCancel: false,
		                success(res) {
		                  if (res.confirm) {
		                    console.log('用户点击确定')
		                  }
		                }
		              })
		            }
		
		          }
		          else {
		            uni.showToast({
		              title: '网络解密异常！',
		              duration: 2000
		            });
		          }
		        }
		      });
		
		    },
		    fail: function (login_res) {
		      console.log('login.js  wx.login失败。');
		
		      uni.showToast({
		        title: '打开小程序登录异常',
		        duration: 2000
		      });
			  
			  
		    }
		  });
		  
		  // #endif
		  
		},
		__get_order_detail: function (that, orderno, openid, callback_get_map){
			//var that = this;
			
			//请求延誉宝接口，根据订单编号和openid、appid得到订单的详细信息
			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url +  '/openapi/Jianghanyinhua/order_detail_get',
				method: 'post',
				data: {
					orderno: orderno,
					openid : openid,
					appid : that.abotapi.globalData.xiaochengxu_appid,
					sellerid: that.abotapi.get_sellerid(),
					
				},
				success: function (res) {
					console.log('order_detail_get', res)

					var data = res.data.data;
					if (!res.data.data) {
						return;
					}
				 
					if(data.selfform_mazhu_url){
						that.selfform_mazhu_url = data.selfform_mazhu_url,
				
						console.log('123456789',that.selfform_mazhu_url);
					}
					
					var mobile = data.mobile;

					//app.globalData.userInfo.user_openid = data.openid;

					//但是订单的手机号为空，则跳转到绑定手机号码的page
					// that.data.owner_flag =1 
					if (!mobile) {
						console.log('mobile', mobile);

						uni.navigateTo({
							url: '/pages/scan_qrcode/scan_bind_mobile?orderno=' + orderno,
						})

						return;
					}

					//请求成功，

					//当前手机号存在，如果当前openid和订单的openid一致，跳出两个选择，更换手机号码和扫码定位
					// this.data.owner_flag =1 

					//如果不是以上两种情况，this.data.owner_flag =2 

					console.log('ddddd服务器返回的订单的openid：', data.openid);
					// app.get_current_openid()
					console.log('ddddd当前登陆的小程序粉丝的openid：', that.abotapi.get_current_openid());
					
					
					if (data.openid == that.abotapi.get_current_openid()) {

						console.log('!mobile&&888888 当前粉丝是码主')

						
						that.owner_flag = 1;
						that.mobile = mobile;
						that.display = "block";
						that.map_type = data.map_type;
						that.token = data.token;
						that.formid = data.formid;
						
						console.log('map_type',that.map_type)
					} else {
				
						that.owner_flag = 2;
						
					}

					var is_expire = data.is_expire;
					//如果不存在过期时间这个字段，默认为过期
					//如果过期，弹窗提示，点击确认后去续费
					//如果有过期时间，并且小于当期时间，那么也是过期的

					console.log('订单编号====>' + orderno);
					console.log('owner_flag====>' + that.owner_flag);

					if(is_expire){
						
						console.log('订单编号已经过期====>' + orderno);

						var new_url = null;
						var title001 = '提示';

						if(that.owner_flag == 1){
							//new_url = '/pages/product/detail?productid='+data.buy_url_productid;
							new_url = 'https://yanyubao.tseo.cn/Home/Jianghanyinhua/order_chongzhi/ensellerid/fSmyUPkjj?wxa_openid=%wxa_openid%&orderno001='+orderno;

						}
						else{
							title001 = '代续费提示';

							var order_option_key_and_value = [];
							order_option_key_and_value.push({'key':'jianghan_orderno', 'value':orderno});

							var order_option_key_and_value_str = encodeURIComponent(JSON.stringify(order_option_key_and_value));

							new_url = 'https://yanyubao.tseo.cn/Home/Jianghanyinhua/order_chongzhi/ensellerid/fSmyUPkjj?wxa_openid=%wxa_openid%&orderno001='+orderno;

						}

						console.log('充值跳转地址123123=====>'+new_url);

						uni.showModal({
							title: title001,
							content: data.tips,
							cancelColor: 'cancelColor',
							success:function(res){
								if(res.confirm){
									that.abotapi.call_h5browser_or_other_goto_url(new_url);
								}
								else{
									that.abotapi.call_h5browser_or_other_goto_url('/pages/index/index');
								}
								
							},

						});

						return;
					}
					
					console.log('订单编号没有过期，准备发送定位短信====>' + orderno);
					
					//console.log('that对象====>' , that);

					//回调函数   getMap
					(typeof callback_get_map == "function") && callback_get_map(that);
				},
				fail: function (e) {
					wx.showToast({
						title: '网络异常！',
						duration: 2000
					});
				},
			});

		},
		
		
		getMap: function (that){
			//var that = this;
			
			console.log('准备发送定位通知!!!!!!!!!', that.owner_flag);
			
			if(that.owner_flag != 2){
				console.log('准备发送定位通知，但是owner_flag不等于2 ===>>> ', that.owner_flag);
				return;
			}
			
			console.log('准备发送定位通知，owner_flag等于2 ===>>> ', that.owner_flag);
			
			console.log('that.abotapi.globalData.option_list.baidu_map_ak_wxa ===>>> ', that.abotapi.globalData.option_list.baidu_map_ak_wxa);
			//console.log('that.abotapi.globalData.option_list ===>>> ', that.abotapi.globalData.option_list);
						
			/* 获取定位地理位置 */
			
			locationapi.get_location(that, that.send_location_sms);	
			
			/*
	
			that.abotapi.set_option_list_str(that, function (that, cb_params) {
			
				console.log('getShopOptionAndRefresh+++++:::', cb_params)
	
				//从本地读取
				//var option_list_str = uni.getStorageSync('shop_option_data_' + that.abotapi.get_sellerid());
				//var option_list = JSON.parse(option_list_str);
				var option_list = cb_params;
				
				console.log('获取商城选项数据用于百度地图', option_list);
				console.log("百度地图AK：" + option_list.baidu_map_ak_wxa);
	
				
						
				
				
			});*/

		},
		send_location_sms:function(that, locationData){
			//var that = this;
			
			console.log('send_location_sms ===>>> ', locationData);

			that.abotapi.abotRequest({
				url: that.abotapi.globalData.yanyubao_server_url + '/openapi/Jianghanyinhua/mapaddress',
				method: 'post',
				data: {
					orderno: that.orderno,
					latitude: locationData.latitude,
					longitude: locationData.longitude,
					address: locationData.address,
					q: that.q,
				},
				success: function (res) {
					console.log('ooooo',res);
	
					that.is_send_mess =  true;
				
	
					if(res && res.data && (res.data.code == 1)){
						var messageid = res.data.messageid;
						
						var data_url = 'https://yanyubao.tseo.cn/openapi/Jianghanyinhua/get_order_scan_report_page?orderno='+that.orderno+'&messageid='+messageid;
	
						var new_url = '/pages/scan_qrcode/welcome_page?data_url='+ encodeURIComponent(data_url);
	
						//万能表单的业务方向
						if(res.data.map_type == 2){
							new_url = '/pages/selfform/selfform?form_type=2&token=' + res.data.data.token  + '&formid=' + res.data.data.formid;
	
							new_url += '&hidden_ad_img_list=1';
	
							new_url += '&latitude=' + that.current_latitude;
							new_url += '&longitude=' + that.current_longitude;
							new_url += '&address=' + that.current_address;
	
							if(res.data.data.video_url){
								new_url += '&video_url=' + encodeURIComponent(res.data.data.video_url);
								new_url += '&video_cover_url=' + encodeURIComponent(res.data.data.video_cover_url);
								new_url += '&video_autoplay=1';
							}
	
						}
	
						console.log('888888888888888888888888888888', new_url);
	
						uni.redirectTo({
							url: new_url,
						})
	
					}
					else{
						uni.navigateTo({
							url: '/pages/welcome_page/welcome_page',
						})
					}
					
	
				},
				fail: function (e) {
					wx.showToast({
						title: '网络异常！',
						duration: 2000
					});
				},
			});
	
				
		},
	
		  
		
		
	}
}
	
</script>

<style>
.flex_paddind_list{
	display: flex;
	justify-content: center;
	padding-top: 8%;
}
.width_text_img{
	width: 40%;
	text-align: center;
	padding-left: 3%;
	padding-right: 3%;
}
.font_tishi_typeface{
	font-size: 28rpx;
	font-weight: bold;
	text-align: left;
}
.title_font{
	font-size: 32rpx;
	font-weight: bold;
	padding-top: 5%;
	padding-bottom: 5%;
}
.button_yanshi_quxiao{
	background-color: #ffffff;
	font-size: 14px;
	line-height: unset;
	overflow: auto;
	box-sizing: unset;
	cursor: unset;
	margin-left: unset;
	margin-right: unset;

} 
button::after {
 border: none;
}
</style>