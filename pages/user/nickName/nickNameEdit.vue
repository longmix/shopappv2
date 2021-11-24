<template>
	<view>
	
		<view class="weui-cell">
		      <view class="weui-cell__hd"><label class="weui-label">昵称</label></view>
		      <view class="weui-cell__bd">
		           <input class="weui-input" placeholder="请输入昵称" v-model="nickname" auto-focus/>
		      </view>
		</view>
		
		<button class="keep_button" :style="{background:wxa_shop_nav_bg_color}" type="primary" @tap="keep_button"> 保存 </button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				nickname:'',
				userAcountInfo: '',
				wxa_shop_nav_bg_color:'',
			};
		},
		onLoad(options) {
			
			uni.setNavigationBarTitle({
				title:'修改昵称'
			})
			
	
			this.abotapi.getColor()
			
			this.userAcountInfo = this.abotapi.get_user_account_info();
			
			this.nickname = this.userAcountInfo.fenxiao_info.nickname || '';
			this.name = this.nickname;
			
			this.abotapi.set_option_list_str(this,
				function(that001, option_list){
					console.log('option_list',option_list);
					that001.wxa_shop_nav_bg_color = option_list.wxa_shop_nav_bg_color
				}
			)
			
			
		},
		methods:{
			  
			 
			  keep_button:function(){
			    var that = this;
			    console.log('that.data.nickname', that.nickname);
			    console.log('that.data.name', that.name);
			    if(that.name==that.nickname){
			      uni.showToast({
			        title: '保存成功',
			        icon: 'success',
			        duration: 2000
			      });
			      uni.redirectTo({
			        url: '/pages/user/setting/setting'
			      })
			      return;
			    }
			    
			
			    var userInfo = that.abotapi.get_user_info();
			
			
			    that.abotapi.abotRequest({
			      url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=user_info_save',
			      data: {
			         nickname:that.nickname,
			         checkstr:userInfo.checkstr,
			         userid:userInfo.userid,
			         sellerid: that.abotapi.globalData.default_sellerid
			      },    
			      success:function(res){
			        console.log('success',res);
					
			        if(res.data.code == 1){						
						that.userAcountInfo.fenxiao_info.nickname = that.nickname;
						that.abotapi.set_user_account_info(that.userAcountInfo)	

						uni.showToast({
						  title: res.data.msg,
						  icon: 'success',
						  duration: 2000
						})
						
						//更新用户信息
						that.abotapi.abotRequest({
						  url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=get_user_info',
						  data: {
						     checkstr:userInfo.checkstr,
						     userid:userInfo.userid,
						     sellerid: that.abotapi.globalData.default_sellerid
						  },    
						  success:function(res){
							  
						    console.log('success',res);
							
							if(res.data && res.data.data && (res.data.data.code == 1)){
								that.abotapi.set_user_account_info(data.data);
							}
							
							uni.redirectTo({
								url: '/pages/user/setting/setting'
							})
							
						  }
						});
						
						return;
						
			        }
			        else{
			          uni.showToast({
			              title: res.data.msg,
			              icon: 'fail',
			              duration: 2000
			          })
			        }
			      
			      },
			      fail:function(res){
			        console.log('failfail',res)
			      }
			
			    });
			
			  },
		}
	}
</script>

<style lang="scss">
page{
    background-color:#F0F0F0;  
}
.header{
    width:100%;
    background-color:#ffa500;
}
.header_name{
    line-height:50px;
    display: inline-block;
    font-family: "微软雅黑";
    color:#fff;
    margin-left:40%;
}
.button{
    line-height:100rpx;
    display: inline-block;
    text-align: right;
    font-family: "微软雅黑";
    color:#fff;
    margin-left:40%;
    font-size:32rpx;
}
.section{
    width:100%;
  
}
.section input{
    width:100%;
    height:100rpx;
	line-height: 100rpx;
    background-color:#fff;
    padding-left:40rpx;
	margin-top: 40rpx;
	margin-bottom: 40rpx;
}

.keep_button{
    width:70%;
    height:80rpx;
    margin:160rpx auto;
    line-height:80rpx;
	color:#FFFFFF;
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
	background-color:#fff;
	border:2rpx solid #17A8E2;
	border-radius:42rpx;
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
	height: 50rpx;
	line-height: 50rpx;

}
</style>
