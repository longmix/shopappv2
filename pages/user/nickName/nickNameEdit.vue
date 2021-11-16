<template>
	<view>
		<view class="section">
		  <input placeholder="请输入昵称" v-model="nickname" auto-focus/>
		</view>
		
		
		<button class="keep_button" type="primary" @tap="keep_button"> 保存 </button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				nickname:'',
				userAcountInfo: '',
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
