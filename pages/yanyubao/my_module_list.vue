<template>
	<view>
		<view v-if="content_list"
			v-for="(content_item, index001) in content_list" :key="index001">
			
			<view class="mid-img">
				<view class="head1" :style="{'border-left-color':my_module_list_001_title_color}">{{content_item.title}}</view>
				<!-- 平铺广告图 -->
				<view v-for="(img_item, index002) in content_item.img_list" :key="index002" 
					@click="toAdDetails(img_item.url)">
					<view class="banner" >
						<image lazy-load="true" :src="img_item.image" style="width: 100%;vertical-align: middle;" mode="widthFix"></image>
					</view>
				</view>
			</view>
		
		</view>
		
		<view class="mid-img">
			<view class="head1" :style="{'border-left-color':my_module_list_001_title_color}">{{my_module_list_001_title_name}}</view>
			<view class="icn-con" v-for="item2 in my_module_list001" :key="item2.index" 
				:data-plugin_flag="item2.plugin_flag"
				:data-plugin_name="item2.plugin_name"
				:data-plugin_desc_basic="item2.plugin_desc_basic" 
				:data-link="item2.new_link"
				@tap="goto_my_module">
				<image v-if="item2.plugin_flag && 0" class="tips" src="https://yanyubao.tseo.cn/Tpl/static/images/bbq.png"></image>
				
				<image class="img-h" :src="item2.icon" :style="{'background-color':item2.background_color}"></image>
				
				<view class="txt-h">{{item2.name}}</view>
			</view>
		</view>
		<view class="mid-img">
			<view class="head1" :style="{'border-left-color':my_module_list_002_title_color}">{{my_module_list_002_title_name}}</view>
			<view class="icn-con" v-for="item2 in my_module_list002" :key="item2.index" 
				:data-plugin_flag="item2.plugin_flag"
				:data-plugin_name="item2.plugin_name"
				:data-plugin_desc_basic="item2.plugin_desc_basic"
				:data-link="item2.new_link"
				@tap="goto_my_module">
				<image v-if="item2.plugin_flag && 0" class="tips" src="https://yanyubao.tseo.cn/Tpl/static/images/bbq.png"></image>
				
				<image class="img-h" :src="item2.icon" :style="{'background-color': '#666666'}"></image>
				
				<view class="txt-h">{{item2.name}}</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				content_list:'',
				
				my_module_list001:'', //已经拥有的
				my_module_list002:'', //尚未拥有的
				my_module_list_001_title_color:'#3e3e3e', 
				my_module_list_002_title_color:'#3e3e3e', 
				my_module_list_001_title_name:'已激活功能模块',
				my_module_list_002_title_name:'待激活功能模块', 
			}
		},
		onLoad(option){
			uni.setNavigationBarTitle({
				title:'我的功能模块列表'
			})
			
			this.abotapi.set_option_list_str(this, this.callback_set_option_list_str);
			
			
			this.get_module_list_of_supplier();
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
					
					that.get_module_list_of_supplier();
				}
			});
			
			uni.stopPullDownRefresh();  //停止下拉刷新动画
		
			setTimeout(function () {
				uni.hideLoading();
				
			}, 1500);
		},
		
		methods:{
			callback_set_option_list_str:function(that, option_list){
				that.abotapi.getColor();
			},
			
			//调用接口
			get_module_list_of_supplier:function(){
				// console.log('jun')
				
				// if(this.abotapi.globalData.show_yanyubao_module_list != 1){
				// 	return;
				// }
				
				var that = this;
				
				var my_module_list = uni.getStorageSync('my_module_list_cache');
				
				console.log('my_module_list===',my_module_list)
				my_module_list = null;
				
				if(my_module_list){
					
					that.content_list = my_module_list.content_list;
					
					that.my_module_list001 = my_module_list.list001;
					that.my_module_list002 = my_module_list.list002;
					
					return;
				}
				
				var post_data = {};
				var userInfo = that.abotapi.get_user_info();
				
				if (userInfo && userInfo.userid) {
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				}
				
				
				this.abotapi.abotRequest({
				    url:that.abotapi.globalData.yanyubao_server_url+'/openapi/SupplierData/get_module_list_of_supplier',
				    method: 'post',
				    data: post_data,
				    success(res) {
				    	console.log("show_yanyubao_module_list_for_tseo_cn ===>>> ",res)
						
						if(res.data.code == 1){
							var my_module_list = res.data;
							
							
							
							//缓存数据
							uni.setStorage({
								key: 'my_module_list_cache',
								data: my_module_list,
								success:function(res008){
									console.log('success ===>>> ', res008);
								}
							})
							
							that.content_list = my_module_list.content_list;
							that.my_module_list001 = my_module_list.list001;
							that.my_module_list002 = my_module_list.list002;
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
			
			//跳转到功能模块
			goto_my_module:function(e){
				
				console.log('block_tanchuang=======>>>>>', e);
				
				var link = e.currentTarget.dataset.link;
				
				this.abotapi.call_h5browser_or_other_goto_url(link);
				  
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
			
			//首页导航图标、轮播图、平面广告跳转
			toAdDetails:function(url){
				
				// var home_url = '/pages/index/index';
				// this.abotapi.goto_user_login(home_url, 'switchTab');
				
				if(!url){
					console.log('url为空，不跳转！');
					return;
				}
				
				var that = this;
				var var_list = Object();
				console.log('toAdDetails- to url ====>>>>>>', url);
				
				
				
				this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
				
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
		font-size:30upx;
		margin-top: 20upx;
		margin-left: 20upx;
		padding-left: 20upx;
	}
	.icn-con{
		float: left;
		text-align: center;
		width: 24%;
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
		width:60upx;
		height:60upx;
		border-radius:20upx;
		padding: 15upx;
	}
	.txt-h{
		font-size: 26upx;
		margin-top: 10upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
