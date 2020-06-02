<template>
	
	<!--pages/login/login.wxml-->
	<view class="page" style='width:100%;overflow-x:hidden;height:{{windowHeight}}px;background:#fff;'>
	<view class='box'>
	 <image src='{{shop_list.icon}}' mode="widthFix"></image>
	</view>
	
	
	
	 <view class='shouquan-con'>
	  <view class='open-con'>
	    <open-data type="userAvatarUrl" class="userinfo-avatar" ></open-data>
	    <open-data type="userNickName" class="userinfo-userNickName" ></open-data>
	  </view>
	   
	  <image class="shouquan-a" mode="widthFix" src="../../images/double_arrow_right.png"></image>
	  <image class="shouquan-b" src="../../images/wxa.png"></image>
	 </view>
	
	
	<button open-type="getUserInfo" plain="true" @getuserinfo="btn_one_click_get_userinfo" class="check_btn2" style="background-color:#07C160; color:#ffffff;border:1px solid #fff;">授权获取头像和昵称</button>
	</view>
	
</template>

<script>
	// pages/check_login/check_login.js
	var app = getApp();
	
	
	
	Page({
	  data: {
	    second: '发送短信',
	    mobile: "",
	    disabled: false,
	    timer001: 60,
	    js_code: '',
	    tokenstr :'',
	    show_mobile_login:0
	  },
	
	
	  onShow: function () {
	
	  },
	  onLoad: function (options) {
	    app.set_option_list_str(null, app.getColor());
	    
	    var that = this;
	
	    app.get_shop_info_from_server(function (shop_info_list) {
	      that.setData({
	        shop_list: shop_info_list,
	      });
	    });
	
	    
	
	    wx.getSystemInfo({
	      success(res) {
	        that.setData({
	          windowHeight: res.windowHeight
	        })
	
	      }
	    })
	
	    console.log('options', options)
	
	    if(options.retpage){
	      //var url = 'http://192.168.0.87:8080/chouheji/pages/chouheji/chouheji_index?sellerid=%ensellerid%&openid=%wxa_openid%';
	      that.setData({
	        retpage: '/pages/h5browser/h5browser?url=' + options.retpage
	      })
	    }
	
	  },
	
	
	
	
	  btn_one_click_get_userinfo: function (e) {
	    var that = this;
	    console.log(e.detail.errMsg)
	    console.log(e.detail.iv)
	    console.log(e.detail.encryptedData)
	    
	    console.log('one_click_get_userinfo', e);
	    console.log('wx.login <<<==== btn_one_click_login');
	
	    wx.login({
	      success: function (res) {
	        console.log("btn_one_click_login 获取到的jscode是:" + res.code);
	
	
	        wx.request({
	          url: app.globalData.http_server + '?g=Yanyubao&m=ShopAppWxa&a=wxa_get_userinfo',
	          header: {
	            "Content-Type": "application/x-www-form-urlencoded"
	          },
	          method: "POST",
	          dataType: 'json',
	          data: {
	            js_code: res.code,
	            xiaochengxu_appid: app.globalData.xiaochengxu_appid,
	            iv: e.detail.iv,
	            encryptedData: e.detail.encryptedData,
	            sellerid: app.get_sellerid(),
	            parentid: app.get_current_parentid(),
	          },
	          success: function (res) {
	            console.log('一键获取头像和昵称成功' + res);
	
	            if (res.data && (res.data.code == 1)) {
	
	              app.globalData.userInfo = app.get_user_info();
	
	              console.log('已经保存的用户信息：', app.globalData.userInfo);
	
	              app.globalData.userInfo.is_get_userinfo = 1;
	              app.set_user_info(app.globalData.userInfo); 
	
	
	              wx.showToast({
	                title: '授权成功',
	                icon: 'success',
	                duration: 2000
	              })
	
	              var last_url = wx.getStorageSync('get_userinfo_last_url');
	
	              console.log('last_url-----', last_url)
	              var page_type = wx.getStorageSync('get_userinfo_page_type');
	
	
	              wx.removeStorageSync('get_userinfo_last_url');
	              wx.removeStorageSync('get_userinfo_page_type');
	
	              //如果打开这个页面时候指定了返回的URL
	              if(that.data.retpage){
	                last_url = that.data.retpage
	                console.log('last_url===================1111', last_url)
	                app.call_h5browser_or_other_goto_url(last_url);
	                return;
	
	              }
	
	
	              if (app.globalData.is_ziliaoku_app == 1) {
	                wx.reLaunch({
	                  url: "/cms/index/index"
	                });
	
	                return;
	              }
	
	
	              if (that.data.fromPage == 'share-detail') {
	                wx.navigateBack({
	                  delta: 1
	                })
	              }
	
	              if (last_url){
	                console.log('last_url===================2222', last_url);
	                console.log('last_url===================3333', page_type);
	
	                if (page_type == 'switchTab'){
	                  console.log('last_url===================aaaaa');
	
	                  wx.switchTab({
	                    url: last_url
	                  })
	                }
	                else{
	                  console.log('last_url===================bbbbb');
	
	                  app.call_h5browser_or_other_goto_url(last_url);
	                }
	                
	                
	                return;
	
	              }
	
	              console.log('last_url===================ccccc');
	              
	
	              wx.switchTab({
	                url: '/pages/user/user'
	              })
	
	              
	            }
	            else {
	              //一键登录返回错误代码
	              wx.showModal({
	                title: '提示',
	                content: res.data.msg,
	                showCancel:false,
	                success(res) {
	                  if (res.confirm) {
	                    console.log('用户点击确定')
	                  }
	                }
	              })
	
	            }
	          }
	        });
	
	      },
	      fail: function (login_res) {
	        console.log('一键获取用户头像和昵称失败。');
	      }
	
	    });
	  },
	
	
	
	
	})
	
	
	
</script>

<style>
	
	/* pages/update_mobile/update_mobile.wxss */
	page{
	    background-color:#F0F0F0;
	    font-size:28rpx;
	}
	
	.box {
	  width:100%;
	  text-align: center;
	  margin: 20rpx;
	}
	.box image{
	  width:180rpx;
	  height:180rpx;
	}
	
	.from-list{
	    width:100%;
	   
	}
	
	.section1{
	width:90%;
	height:96rpx;
	line-height:48px;
	background-color:#fff;
	margin:40rpx auto 0;
	border-bottom:1px solid #ECECEC;
	border:1px solid #17A8E2;
	border-radius:21px;
	
	}
	.section1 input{
	    width:80%;
	    height:80rpx;
	    padding:3px 20px;
	}
	.section2{
	    width:90%;
	    height:96rpx;
	    background-color:#fff;
	    margin:40rpx auto 0;
	    position:relative;
	    border:1px solid #17A8E2;
	    border-radius:21px;
	}
	.section2 input{
	    width:50%;
	    height:80rpx;
	    padding:3px 20px;
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
	    border:1px solid #17A8E2;
	    border-radius:21px;
	}
	.section3 image{
	    width:30%;
	    height:68rpx;
	    line-height:60rpx;
	    padding-top:13rpx;
	    margin-left:-9rpx;
	
	    
	}
	.section3 input{
	    width:55%;
	    height:80rpx;
	    margin:3px 20px;
	    float:left;
	}
	
	.check_btn2{
	    margin:50px auto;
	    width:80%;
	    height:40px;
	    background-color:#07C160;
	    line-height:40px;
	    color:#FFF;
	    border:1px solid #fff;
	}
	
	.userinfo-avatar {
	  display:block;
	width:126rpx;
	height:126rpx;
	border-radius:50%;
	border:1px solid #fff;
	box-shadow:3px 3px 10px rgba(0,0,0,0.2);
	overflow:hidden;
	
	}
	.userinfo-userNickName{
	  color: #666;
	  text-align:center;
	}
	
	.shouquan-con{
	  display:flex;
	  justify-content:space-between;
	  align-items:center;
	  padding:0 17%;
	  margin-top: 100rpx;
	}
	
	.open-con{
	  display:flex;
	  flex-direction:column;
	  align-content:center;
	}
	.shouquan-a{
	  width: 60rpx;
	}
	
	.shouquan-b{
	  width:126rpx;
	height:126rpx;
	
	}
	
</style>
