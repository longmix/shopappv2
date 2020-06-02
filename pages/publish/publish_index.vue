<template>
	<view>	
	<view class="header">
		<view class="header_text">{{publish_write_mianze_shengming}}</view>
	</view>
	<view style="width: 96%;margin-left: 2%;" v-if="publish_write_ad_list">
		<image style="width: 100%;" @tap="toUrl(item.url)" v-for="(item,index) in publish_write_ad_list" :key="index" :src="item.image" mode="widthFix"></image>
	</view>
	<view class="select flex1">
	    <view class="xian"></view>
	    <view class="select_text">请选择您要发布的栏目</view>
	    <view class="xian"></view>
	</view>
	
	<view class="flexlist">
		<view class="flexlist-item bg-fff" v-for="(item,key) in publish_img_cata_list" :key="key" @click="form_issue(item.classid,item.name)" >
			<view class="flexlist-imgbox">
				<img class="flexlist-img" :src="item.icon">
			</view>
			<view class="flex-1">
				<view class="flexlist-title" >{{item.name}}</view>
				
				<view class="flexlist-desc">{{item.brief}}</view>
			</view>
			<image class="flexlist-img" src="../../static/img/x_right.png" style="width: 50upx;height: 50upx;margin: 10upx;"></image>
		</view>
		<!-- {{bd_basic_option_str.weiduke_token}}
		{{weiduke_classify.data.name}} -->
	</view>
	
	</view>
</template>
 

<script>
	export default {
		
		data:function(){
			
			return {
				weiduke_classify:'',
				pageLoad:false, 
				pageHide:false,
				pageData:{},
				a:1,
				category_list: '',
				bd_basic_option_str:"",
				publish_img_cata_list:'',
				show_type:'',
				publish_write_mianze_shengming:'', //免责说明
				publish_write_ad_list:[], //广告图片
			}
			
		},

		onLoad: function (option) {
			if(option.show_type){
				this.show_type = option.show_type; //判断点击进入发布页面或者帖子列表
			}
			
			
			this.abotapi.set_shop_option_data(this, this.callback_function);
			
			if(option.show_type){
				this.show_type = option.show_type; //判断点击进入发布页面或者帖子列表
			}
			if(option.form_type){
				this.form_type = option.form_type;
			}
		},
		onReady: function () {
			uni.setNavigationBarTitle({
				title: "分类列表",
			});
		},
		onShow: function () {
			if (this.pageHide) {
				this.pageHide = false;
			}
		},
		onHide: function () {
			this.pageHide = true;
		},
		onPullDownRefresh:function(){
			this.refresh();
		} ,
		 
		methods: {
			
			refresh:function(){
				// this.getPage();
				setTimeout(function(){
					uni.stopPullDownRefresh();
				},1000)
			},
			goList: function (id) {
				uni.navigateTo({
					url: "../forum/list?gid=" + id
				})
			},	
			goForum: function (id) {
				uni.navigateTo({
					url: "../forum/show?id=" + id
				})
			},
			callback_function:function(that, shop_option_data){
				console.log('shop_option_data',shop_option_data);
				that.abotapi.getColor();
				//免责说明
				if(shop_option_data.option_list.publish_write_mianze_shengming){
					that.publish_write_mianze_shengming = shop_option_data.option_list.publish_write_mianze_shengming;
				}
				
				//广告图片
				if(shop_option_data.option_list.publish_write_ad_list){
					that.publish_write_ad_list = shop_option_data.option_list.publish_write_ad_list;
				}
				//获取发布帖子的栏目组
				if(that.show_type && that.show_type == 'list'){
					that.publish_img_cata_list = shop_option_data.option_list.publish_img_cata_list;
					return;
				}
				
				that.publish_img_cata_list = [];
				
				var list001 = [];
				if(that.publish_img_cata_list){
					list001 = that.publish_img_cata_list;
				}
				
				for(var i=0; i<list001.length; i++){
					var item001 = list001[i];
					
					if(item001 && item001.publish_type && (item001.publish_type == 'private')){
						continue;
					}
					
					that.publish_img_cata_list.push(item001);
				}
			},
			toUrl:function(url){
				this.abotapi.call_h5browser_or_other_goto_url(url);
			},
			form_issue:function(e,f){
				
				if(this.show_type && this.show_type == 'list'){
					//跳转到帖子列表页面 （publish_list）
					uni.navigateTo({
						url:'./publish_list?cataid=' + e + '&name=' + f,
					})
				}else{
					
					uni.navigateTo({
						url:'./publish_write?cataid=' + e + '&name=' + f ,
					})
				}
				
			},
		},
	}
</script>

<style>
	.flexlist-img{
		width: 100upx;
		height: 100upx;
		/* border-radius: 100upx; */
	}
	.flexlist-imgbox{
		justify-content: center;
		/* background: #AAAAAA; */
		/* border: 1rpx solid #000000; */
		/* border-radius: 50%; */
		margin-right: 20upx;
	}
	.flex-1{
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;

	}
	.flexlist-title{
		line-height: 60upx;
		font-size: 32upx;
	}
	.flexlist-desc {
		font-size: 26upx;
	}
	.flexlist-item{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 0upx;
		margin-bottom: 12rpx;
		padding-bottom: 12rpx;
		border-bottom: 1rpx solid #eee;
		padding-left: 12rpx;
		padding-right: 12rpx;
		padding-top: 12rpx;

	}
	.header {
	    background-color: white;
	    padding: 30rpx;
	}
	.header_text {
	    background-color: #e6f5ff;
	    padding: 20rpx 30rpx;
	    font-size: 26rpx;
	    color: #999;
	}
	.select {
	    height: 75rpx;
	    border-bottom: 1rpx solid #eee;
	    background: #fff;
	}
	.xian {
	    width: 60rpx;
	    height: 1rpx;
	    background-color: #999;
	}
	.select_text {
	    margin: 0rpx 25rpx;
	    font-size: 26rpx;
	    color: #666;
	}
	.flex1 {
	display: flex;
	justify-content: center;
	align-items: center;
	
	}

</style>