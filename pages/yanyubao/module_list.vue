<template>
	<view>
		<view class="mid-img" v-for="(item,index) in module_icon_list" :key="index">
			
			<view class="head1" :style="{'border-left-color':item.left_color}">{{item.name}}</view>
		 
			<view class="icn-con" v-for="item2 in item.subs" :key="item2.index" 
				:data-plugin_flag="item2.plugin_flag"
				:data-plugin_name="item2.plugin_name"
				:data-plugin_desc_basic="item2.plugin_desc_basic" 
				:data-link="item2.link"
				@tap="block_tanchuang">
				<image v-if="item2.plugin_flag" class="tips" src="https://yanyubao.tseo.cn/Tpl/static/images/bbq.png"></image>
				
				<image class="img-h" :src="item2.icon" :style="{'background-color':item2.background_color}"></image>
				
				<view class="txt-h">{{item2.name}}</view>
			</view>
			
			<!-- <view class="icn-con">
				<image class="img-h" src="../../static/wp-article-img/calendar.png"></image>
				<view class="txt-h">h5商城</view>
			</view>
			
			<view class="icn-con">
				<image class="img-h" src="../../static/wp-article-img/calendar.png"></image>
				<view class="txt-h">h5商城</view>
			</view> -->
							
		</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				module_icon_list:'',
				
				//是否跳转到功能模块，还是不响应点击事件
				goto_my_module_pc_web_flag:0,
				
				share_data_from_server:null,
			}
		},
		onLoad(option){
			uni.setNavigationBarTitle({
				title:'常用功能列表'
			})
			
			this.abotapi.set_option_list_str(this, this.callback_set_option_list_str);
			
			
			this.get_yanyubao_module_list_for_tseo_cn();
		},
		//下拉刷新
		onPullDownRefresh: function () {
			var that = this;
			
			uni.showLoading({
				title: '数据加载中...',
			})
			
			uni.removeStorage({
				key: 'module_icon_list_cache',
				success:function(res008){
					console.log('success ===>>> ', res008);
					
					that.get_yanyubao_module_list_for_tseo_cn();
				}
			});
		
			setTimeout(function () {
				uni.stopPullDownRefresh();  //停止下拉刷新动画
				
				uni.hideLoading();
				
			}, 1500);
		},
		//====== 小程序分享  开始 ==========
		onShareAppMessage: function () {
			var share_data001 = this.__get_share_data();
			
			
			var share_data = {
			  title: '' + share_data001.share_title,
			  path: share_data001.last_url,
			  imageUrl: share_data001.share_img,
			  success: function (res) {
				// 分享成功
			  },
			  fail: function (res) {
				// 分享失败
			  }
			};
			
			//#ifdef MP-BAIDU
				share_data.content = share_data.title;
			//#endif
			
			return share_data;
			
		},
		onShareTimeline: function () {
			var share_data001 = this.__get_share_data();
			
			return {
			    title: '' + share_data001.share_title,
			    query: share_data001.share_query,
			    imageUrl:share_data001.share_img,
			}
			
		},
		onAddToFavorites: function () {
			var share_data001 = this.__get_share_data();
			
			return {
			    title: '' + share_data001.share_title,
			    query: share_data001.share_query,
			    imageUrl:share_data001.share_img,
			}
		},
		//====== 小程序分享  结束 ==========
		methods:{
			//获取分享的数据
			__get_share_data:function(){
				
				if(!this.share_data_from_server){
					return;
				}
				
				
				var share_data = {};
				
				share_data.share_title = this.share_data_from_server.title;
				share_data.share_img = this.share_data_from_server.image;
				//当前页面 path ，必须是以 / 开头的完整路径
				share_data.last_url = '/pages/yanyubao/module_list';
				share_data.share_query = '';
				
				return share_data;
			},
			
			callback_set_option_list_str:function(that, option_list){
				that.abotapi.getColor();
				
				
				//是否跳转到PC版本的控制台，这个选项在 延誉电商APP后台的“系统配置>>全局设置选项>>更多控制选项”中设置
				if(option_list.yanyubao_goto_my_module_pc_web_flag){					
					that.goto_my_module_pc_web_flag = option_list.yanyubao_goto_my_module_pc_web_flag;
				}
				else{
					that.goto_my_module_pc_web_flag = 0;
				}
				
				
			},
			
			//调用接口
			get_yanyubao_module_list_for_tseo_cn:function(){
				// console.log('jun')
				
				// if(this.abotapi.globalData.show_yanyubao_module_list != 1){
				// 	return;
				// }
				
				var that = this;
				
				var module_icon_list = uni.getStorageSync('module_icon_list_cache');
				
				console.log('module_icon_list===',module_icon_list)
				
				if(module_icon_list){
					//console.log('module_icon_list===',module_icon_list)
					
					that.module_icon_list = module_icon_list;
					return;
				}
				
				
				
				this.abotapi.abotRequest({
				    url:that.abotapi.globalData.yanyubao_server_url+'/Supplier/Login/show_yanyubao_module_list_for_tseo_cn',
				    method: 'post',
				    data:{
						platform : that.abotapi.globalData.current_platform,
						version_code : that.abotapi.globalData.version_code				
				    },					
				    success(res) {
				    	console.log("show_yanyubao_module_list_for_tseo_cn ===>>> ",res)
						
						if(res.data.code == 1){
							var module_icon_list = res.data.data;
							
							
							// #ifdef MP-BAIDU
							
							//====== 过滤掉没有描述的模块 Begin ======
							for(let i=0; i<module_icon_list.length; i++){
								
								console.log('aaaa===>>>>', module_icon_list[i]['subs']);
								
								for(let j=0; j<module_icon_list[i]['subs'].length; j++){
									
									//console.log('bbbb===>>>>', module_icon_list[i]['subs'][j]);
									//console.log('cccc===>>>>', module_icon_list[i]['subs'][j]['plugin_flag']);
								
									if(module_icon_list[i]['subs'][j] && !module_icon_list[i]['subs'][j]['plugin_flag']){
										
										console.log('ddddd===>>>>', module_icon_list[i]['subs'][j]['plugin_flag']);
										
										module_icon_list[i]['subs'].splice(j, 1);	// 将使后面的元素依次前移，数组长度减1
										
										j = j-1;   //！！！！！！如果不减，将漏掉一个元素
									}
								}
								
								console.log('aaaa2222===>>>>', module_icon_list[i]['subs']);
								
							}
							//================ End ============
							
							// #endif
							
							
							
							//缓存数据
							uni.setStorage({
								key: 'module_icon_list_cache',
								data: module_icon_list,
								success:function(res008){
									console.log('success ===>>> ', res008);
								}
							})
							
							that.module_icon_list = module_icon_list


							if(res.data.share_data){
								// title image
								that.share_data_from_server = res.data.share_data
							}
							
							
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
				var that = this;
				
				console.log('block_tanchuang=======>>>>>', e);
				
				var plugin_flag = e.currentTarget.dataset.plugin_flag;
				
				var link = e.currentTarget.dataset.link;
				
				if(plugin_flag && (plugin_flag == 1) ){
					var plugin_name = e.currentTarget.dataset.plugin_name;
					var plugin_desc_basic = e.currentTarget.dataset.plugin_desc_basic;
					
					uni.showModal({
					    title: plugin_name,
					    content: plugin_desc_basic,
						showCancel: false,
					    success: function (res) {
							//如果有链接且运行跳转，则跳转
					        if(link && (that.goto_my_module_pc_web_flag == 1) ){
								that.abotapi.call_h5browser_or_other_goto_url(link);
							}
					    }
					});
					
					return;
				}
				
				//如果有链接且运行跳转，则跳转
				if(link && (that.goto_my_module_pc_web_flag == 1) ){
					that.abotapi.call_h5browser_or_other_goto_url(link);
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
