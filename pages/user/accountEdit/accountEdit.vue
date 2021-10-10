<template>
	<view class="container" style='padding:0;'>
	<form @submit="formSubmit" style="margin-top: 100rpx;">
	    <view class="weui-cell">
	          <view class="weui-cell__hd"><label class="weui-label">账号</label></view>
	          <view class="weui-cell__bd">
	              <input class="weui-input" placeholder="请输入新账号" v-model="account" ></input>
	          </view>
	    </view>
	    <view class="weui-cell">
	          <view class="weui-cell__hd"><label class="weui-label">新密码</label></view>
	          <view class="weui-cell__bd">
	              <input class="weui-input" v-model="new_password" password="true" placeholder="请输入新密码"></input>
	          </view>
	    </view>
	    <view class="weui-cell">
	          <view class="weui-cell__hd"><label class="weui-label">确认密码</label></view>
	          <view class="weui-cell__bd">
	              <input class="weui-input" v-model="new_password2" password="true" placeholder="请再次输入新密码"></input>
	          </view>
	    </view>
	    <button class="weui-btn weui-btn_primary" :style="{background:wxa_shop_nav_bg_color}" formType="submit">确认修改</button>
	</form>
	
	</view>
	

</template>

<script>
	export default {
		data() {
			return {
				account:'',
				new_password:'',
				new_password2: '',
				wxa_shop_nav_bg_color:'',
			};
		},
		onLoad(options) {
			
			uni.setNavigationBarTitle({
				title:'修改账号和密码'
			})

			this.abotapi.getColor()
			this.userAcountInfo = this.abotapi.get_user_account_info();
			this.account = this.userAcountInfo.account || '';
			this.abotapi.set_option_list_str(this,
				function(that001, option_list){
					console.log('option_list',option_list);
					that001.wxa_shop_nav_bg_color = option_list.wxa_shop_nav_bg_color
				}
				)
		},
		methods:{
			  
			 formSubmit: function (e) {
				 
				 var that = this;
				 var userInfo = that.abotapi.get_user_info();
				 
				 
				 console.log('that==',that.new_password);
				 
			     if (!that.account) {
			       uni.showToast({
			         title: '账号不能为空',
			         duration: 2000
			       });
			       return;
			     }
			 
			 
			     if(that.new_password.length<6){
			       uni.showToast({
			         title: '密码至少为6位',
			         duration: 2000
			       });
			       return;
			     }
			 
			     if (that.new_password != that.new_password2) {
			       uni.showToast({
			         title: '两次输入密码不一致',
			         duration: 2000
			       });
			       return;
			     }
			     
			     uni.request({
			       url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=set_user_password',
			       data: {
			         checkstr: userInfo.checkstr,
			         userid: userInfo.userid,
			         sellerid: that.abotapi.get_sellerid(),
			         new_account: that.account,
			         new_password: that.new_password,
			       },
			       method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			       header: {// 设置请求的 header
			         'Content-Type': 'application/x-www-form-urlencoded'
			       },
			       success: function (res) {
			         // success
			         var code = res.data.code;
			         if (code == 1) {
			           uni.showModal({
			             title: '修改成功',
			             content: res.data.msg,
			             showCancel:false,
			             success(res) {
			               if (res.confirm) {
			                 console.log('用户点击确定')
			               } else if (res.cancel) {
			                 console.log('用户点击取消')
			               }
						   
						   that.userAcountInfo.account = that.account;
						   that.abotapi.set_user_account_info(that.userAcountInfo);
						   that.abotapi.del_user_info();
			               uni.reLaunch({
			               	url: '/pages/login/login'
			               })
						   
			             }
			 
			           })
			 
			         } else {
			           uni.showToast({
			             title: '修改失败！',
			             duration: 2000
			           });
			           return;
			         }        
			       },
			       fail: function () {
			         // fail
			         uni.showToast({
			           title: '网络异常！',
			           duration: 2000
			         });
			       }
			     })
			   },

		}
	}
</script>

<style lang="scss">
page{
    background-color:#F0F0F0;  
}	
	

.weui-cell {
    padding: 20rpx 30rpx;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    font-size: 30rpx;
}

.weui-cells888 {
    margin-top: 1.17647059em;
    background-color: #FFFFFF;
    line-height: 1.47058824;
    font-size: 17px;
    overflow: hidden;
    position: relative;
}

.weui-label {
    display: block;
    width: 200rpx;
    word-wrap: break-word;
    word-break: break-all;
}

.weui-cell__bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
	height:48rpx;
	line-height:48px;
	background-color:#fff;
	border:1px solid #17A8E2;
	border-radius:21px;
	padding: 5rpx;
}


.weui-input {
    width: 90%;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    font-size: inherit;
    color: inherit;
	padding-left: 20rpx;

}

.weui-btn_primary {
    background-color: #1AAD19;
}

.weui-btn {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 28rpx;
    padding-right: 28rpx;
	margin-top: 50rpx;
    box-sizing: border-box;
    font-size: 36rpx;
    text-align: center;
    text-decoration: none;
    color: #FFFFFF;
    line-height: 2.55555556;
    border-radius: 10rpx;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    overflow: hidden;
}
</style>
