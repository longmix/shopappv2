<template>
	<view class="container" style='padding:0;'>
	  
	  <view class="section1">
	    <input type="number" placeholder="请输入手机号"  v-model="mobile"  auto-focus/>
	  </view>
	  <view class="section3">
	    
	    <image @tap="click_check" :src="img_checkcode_url"></image>
	    <input type="number" placeholder="请输入图片验证码"  v-model="img"  auto-focus/>
	  
	  </view>
	  <view class="section2">
	    <input type="number"  placeholder="请输入手机验证码" v-model="tel"  auto-focus/>
	    <button type="primary" :disabled="disabled"  @tap="send_btn" class="send_btn">{{second}}</button>
	  </view>
	
	  <button type="primary" @tap="check_button" class="check_btn" :style="{background:wxa_shop_nav_bg_color}">设置手机号码</button>
	
	</view>
	

</template>

<script>
	function countdown(that) {
		var timer001 = that.timer001;
		if (timer001 == 0) {
			//倒计时结束,恢复按钮可点击状态,同时内容设置为为 发送短信
		
			that.second = '发送短信';
			that.timer001 = 60;
			that.disabled = false
			that.js_code = '';
			that.shop_icon = '';
		
			return;
		}
	
		var time = setTimeout(function () {
			that.second = '重新发送(' + timer001 + ')';
			that.timer001 =  timer001 - 1;
			countdown(that);
		} , 1000)
	}
	export default {
		data() {
			return {
				second: '发送短信',
				mobile:"",
				disabled:false,
				timer001:60,
				mobile: '', //手机号
				img:'', 	//图片验证码
				tel:'',		//手机验证码
				img_checkcode_url:'',
				wxa_shop_nav_bg_color:'',
			};
		},
		onLoad(options) {
			var that = this
			
			uni.setNavigationBarTitle({
				title:'更换手机号'
			})
			
			this.abotapi.getColor()
			
			this.userAcountInfo = this.abotapi.get_user_account_info();
			this.mobile = this.userAcountInfo.mobile || '';
			
			this.abotapi.set_option_list_str(this,
				function(that001, option_list){
					console.log('option_list',option_list);
					that001.wxa_shop_nav_bg_color = option_list.wxa_shop_nav_bg_color
				}
			)
			
			that.abotapi.getColor();
			
		
			// 页面初始化 options为页面跳转所带来的参数
			uni.request({
			  url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=Xiaochengxu&a=get_tokenstr',
			  header: {
				"Content-Type": "application/x-www-form-urlencoded"
			  },
			  method: "POST",
			  success: function (res) {
				//console.log(res.data);
				that.abotapi.globalData.tokenstr = res.data.tokenstr;
		
				that.img_checkcode_url = that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=Xiaochengxu&a=getverifycodeimg' + '&tokenstr=' + res.data.tokenstr;
		
		
			  }
			})
			
			
		},
		methods:{
			  
			 click_check: function (e) {
			    var that = this
			
			    uni.request({
			      url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=Xiaochengxu&a=get_tokenstr',
			      header: {
			        "Content-Type": "application/x-www-form-urlencoded"
			      },
			      method: "POST",
			      success: function (res) {
			        // console.log(res.data);
			
			        that.abotapi.globalData.tokenstr = res.data.tokenstr;
			
					that.img_checkcode_url = that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=Xiaochengxu&a=getverifycodeimg' + '&tokenstr=' + res.data.tokenstr
			        
			
			      }
			    });
			
			  },			
			
			
			
			  check_button: function () {
			    var that = this
				var userInfo = that.abotapi.get_user_info();
			   		   
			    uni.request({
			      url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=user_info_save',
			      header: {
			        "Content-Type": "application/x-www-form-urlencoded"
			      },
			      method: "POST",
			      data: {
			        new_mobile: this.mobile,
			        verifycode_sms: this.tel,
			        checkstr: userInfo.checkstr,
			        sellerid: that.abotapi.get_sellerid(),
			        userid: userInfo.userid
			      },
			      success: function (request_res) {
			        //console.log('更新缓存的用户信息');
			        if (request_res.data.code == 1) {
						that.userAcountInfo.mobile = that.mobile
							
						uni.showModal({
							title: '提示',
							content:request_res.data.msg,
							showCancel:false,
							success: function(res) {
							  if (res.confirm) {		  
								  that.abotapi.set_user_account_info(that.userAcountInfo)								  
								uni.redirectTo({
								  url: '/pages/user/setting/setting'		
								})
								return;
							  }
							}
						})
						  
			        }
			        else {
			          uni.redirectTo({
			            url: '/pages/user/setting/setting'
			          })
			          uni.showToast({
			            title: request_res.data.msg,
			            icon: 'fail',
			            duration: 2000
			          })
			        }
			      }
			    });
			
			  },
			
			  send_btn: function (e) {
			    var that = this
				var userInfo = that.abotapi.get_user_info();
			
			    console.log(1111);
			    //检查手机号码是否正确
			    if(!this.mobile){
			      uni.showToast({
			            title: '请输入手机号码！',
			            icon: 'fail',
			            duration: 2000
			          })
			          return;
			    }
			
			    if(!this.img){
			      uni.showToast({
			            title: '请输入图片验证码！',
			            icon: 'fail',
			            duration: 2000
			          })
			          return;
			    }
			
			    
			
			    uni.request({
			        url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=sendsms_change_mobile',
			      data: {
			        mobile: that.mobile,
			        verifycode: that.img,
			        sellerid: that.abotapi.get_sellerid(),
			        checkstr: userInfo.checkstr,
			        userid: userInfo.userid,
			        tokenstr: that.abotapi.globalData.tokenstr
			      },
			      header: {
			        "Content-Type": "application/x-www-form-urlencoded"
			      },
			      method: "POST",
			      success: function (request_data) {
			        console.log(request_data.data)
			        if (request_data.data.code == 1) {
			          //console.log(1111);
			          
			          //将按钮设置为不可点击状态,同时显示倒计时
			          //this.data.second = 60;
			          //disabled="{{disabled}}"
			          countdown(that);
			          //that = !that;
					  that.disabled = true;
			          //=====end======
			          
			
			          uni.showToast({
			            title: request_data.data.msg,
			            icon: 'success',
			            duration: 5000
			          })
			          
			        }
			        else {
			          uni.showToast({
			            title: request_data.data.msg,
			            icon: 'fail',
			            duration: 5000
			          });
			
			          that.abotapi.globalData.tokenstr = request_data.data.tokenstr;
					  that.img_checkcode_url = that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=Xiaochengxu&a=getverifycodeimg' + '&tokenstr=' + request_data.data.tokenstr
			         
			        }
			      }
			    })
			  },

		}
	}
</script>

<style lang="scss">
/* pages/update_mobile/update_mobile.wxss */
page{
    background-color:#F0F0F0;  
}
.from-list{
    width:100%;
   
}

.section1{
	width:90%;
	height:96rpx;
	line-height:96rpx;
	background-color:#fff;
	margin:40rpx auto 0;
	border-bottom:2rpx solid #ECECEC;
	border:2rpx solid #17A8E2;
	border-radius:42rpx;
	overflow: hidden;

}
.section1 input{
    width:80%;
    height:80rpx;
    padding:6rpx 40rpx;
}
.section2{
    width:90%;
    height:96rpx;
    background-color:#fff;
    margin:40rpx auto 0;
    position:relative;
    border:2rpx solid #17A8E2;
    border-radius:42rpx;
	overflow: hidden;
}
.section2 input{
    width:71%;
    height:80rpx;
    padding:6rpx 40rpx;
    margin:0 0 0;
	
}
.send_btn{
    width:240rpx;
    height:80rpx;
    line-height:80rpx;
    position:absolute;
    top:8rpx;
    left:60%;
    font-size:28rpx;
}
.section3{
    width:90%;
    height:96rpx;
    background-color:#fff;
    margin:40rpx auto 0;
    position:relative;
    border:2rpx solid #17A8E2;
    border-radius:42rpx;
	overflow: hidden;
}
.section3 image{
    width:25%;
    height:68rpx;
    line-height:60rpx;
    padding-top:13rpx;
    margin-left:-73rpx;
	float: right;
	margin-top: 5rpx;
	margin-right: 20rpx;
    
}
.section3 input{
    width:60%;
    height:80rpx;
    margin:6rpx 30rpx;
    float:left;
}

.check_btn{
    margin:100rpx auto;
    width:85%;
    height:100rpx;
    background-color:orange;
    line-height:100rpx;
    color:#FFF;
}

</style>
