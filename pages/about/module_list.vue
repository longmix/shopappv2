<template>
	<view>
		 <view class="mid-img" v-for="(item,index) in module_icon_list" :key="index">
		 <view class="head1" :style="{'border-left-color':item.left_color}">{{item.name}}</view>
							<view class="icn-con" v-for="item2 in item.subs" :key="item2.index" 
								:data-plugin_flag="item2.plugin_flag"
								:data-plugin_name="item2.plugin_name"
								:data-plugin_desc_basic="item2.plugin_desc_basic" 
								@tap="block_tanchuang">
								<image v-if="item2.plugin_flag" class="tips" src="https://yanyubao.tseo.cn/Tpl/static/images/bbq.png"></image>
								
								<image class="img-h" :src="item2.icon" :style="{'background-color':item2.background_color}"></image>
								
								<view class="txt-h">{{item2.name}}</view>
							</view>
							
		</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				module_icon_list:'',
			}
		},
		onLoad(option){
			uni.setNavigationBarTitle({
				title:'常用功能列表'
			})
			
			this.abotapi.set_option_list_str(this, this.callback_set_option_list_str);
			
			
			this.get_yanyubao_module_list_for_tseo_cn();
		},
		
		methods:{
			callback_set_option_list_str:function(that, option_list){
				that.abotapi.getColor();
			},
			
			//调用接口
			get_yanyubao_module_list_for_tseo_cn:function(){
				// console.log('jun')
				
				// if(this.abotapi.globalData.show_yanyubao_module_list != 1){
				// 	return;
				// }
				
				var that = this;
				
				// var module_icon_list = uni.getStorageSync('module_icon_list_cache');
				
				//console.log('module_icon_list===',module_icon_list)
				
				// if(module_icon_list){
				// 	//console.log('module_icon_list===',module_icon_list)
					
				// 	that.module_icon_list = module_icon_list;
				// 	return;
				// }
				
				
				
				this.abotapi.abotRequest({
				    url:that.abotapi.globalData.yanyubao_server_url+'Supplier/Login/show_yanyubao_module_list_for_tseo_cn',
				    method: 'get',
				    data:{
				
				    },
					
				    success(res) {
				    	console.log("jiangjun",res)
						
						if(res.data.code == 1){
							var data = res.data.data;
							//缓存数据
							uni.setStorageSync('module_icon_list_cache', data);
							that.module_icon_list = data
						}
				
				    },
				    fail: function (e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
				    },
				});
			},
			
			//模态弹窗事件
			block_tanchuang:function(e){
				
				console.log('block_tanchuang=======>>>>>', e);
				
				var plugin_flag = e.currentTarget.dataset.plugin_flag;
				
				if(plugin_flag && (plugin_flag == 1) ){
					var plugin_name = e.currentTarget.dataset.plugin_name;
					var plugin_desc_basic = e.currentTarget.dataset.plugin_desc_basic;
					
					uni.showModal({
					    title: plugin_name,
					    content: plugin_desc_basic,
						showCancel: false,
					    success: function (res) {
					        
					    }
					});
				}
				
				
				
				
				  
			},
			
			
		}
	}
</script>

<style>
	.mid-img{
      width: 100%;
	  overflow: hidden;
	  background-color:white;
	  margin-bottom:20upx;
	}
	.head1{
		border-left:10upx solid;
		font-size:40upx;
		margin-top: 20upx;
		padding-left: 20upx;
	}
	.icn-con{
		float: left;
		text-align: center;
		width: 33%;
		margin-top: 40upx;
		position: relative;
		padding-bottom: 30upx;
	}
	.icn-con .tips{
		width: 40upx;
		height: 40upx;
		position: absolute;
		right: 66upx;
		top: -20upx;
		z-index: 2;
	}
	.img-h{
		width:100upx;
		height:100upx;
		border-radius:20upx;
		padding: 15upx;
	}
	.txt-h{
		font-size: 30upx;
		margin-top: 10upx;
	}
</style>
