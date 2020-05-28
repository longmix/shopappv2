<template>
	<view>
		<view class="section">
		  <input placeholder="请输入昵称" v-model="nickname" auto-focus/>
		</view>
		
		
		<button class="keep_button" type="primary" bindtap="keep_button"> 保存 </button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				nickname:'',
				
			};
		},
		onLoad(options) {
			
			this.abotapi.get_shop_info_from_server(this.callback_get_shop_info_from_server);
			
		},
		methods:{
			 nameInput: function(e) {
			      //console.log('昵称是='+e.detail.value);
			      var that = this;
			    if (e.detail.value == that.nickname){
			      that.name = e.detail.value;
			      }else{
			      that.nickname = e.detail.value;
			      }
			  },
			  
			  callback_get_shop_info_from_server:function(cb_params){
				  if(!cb_params){
					  return;
				  }
				  
				  console.log('cb_params=====',cb_params)
				  
			  },
			  keep_button:function(){
			    var that = this;
			    console.log('that.data.nickname', that.data.nickname);
			    console.log('that.data.name', that.data.name);
			    if(that.data.name==that.data.nickname){
			      uni.showToast({
			        title: '保存成功',
			        icon: 'success',
			        duration: 2000
			      });
			      // uni.redirectTo({
			      //   url: '../userinfo/userinfo'
			      // })
			      return;
			    }
			    
			
			    var userInfo = that.abotapi.get_user_info();
			
			
			    that.abotapi.abotRequest({
			      url: that.abotapi.globalData.http_server + '?g=Yanyubao&m=ShopAppWxa&a=user_info_save',
			      header: {  
			                "Content-Type": "application/x-www-form-urlencoded"  
			              }, 
			      method: "POST",  
			      data: {
			         nickname:that.nickname,
			         checkstr:userInfo.checkstr,
			         userid:userInfo.userid,
			         sellerid: that.abotapi.globalData.default_sellerid
			      },    
			      success:function(res){
			        console.log('success',res);
			        if(res.data.code == 1){
			          uni.showToast({
			              title: res.data.msg,
			              icon: 'success',
			              duration: 2000
			          })
			          uni.redirectTo({
			            url: '../userinfo/userinfo'
			          
			          })
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
    line-height:50px;
    display: inline-block;
    text-align: right;
    font-family: "微软雅黑";
    color:#fff;
    margin-left:40%;
    font-size:16px;
}
.section{
    width:100%;
    height:50px;
    background-color:#fff;
    margin:10px auto;
}
.section input{
    width:100%;
    height:50px;
    background-color:#fff;
    margin:10px auto;
    padding-left:20px;
}

.keep_button{
    width:70%;
    height:40px;
    margin:20px auto;
    line-height:40px;
}
</style>
