<template>
	<view>
	<view class="flexlist">
		<view class="flexlist-item bg-fff" v-for="(item,key) in publish_img_cata_list" :key="key" @click="form_issue(item.classid,item.name)" >
			<view class="flexlist-imgbox">
				<img class="flexlist-img" :src="item.icon">
			</view>
			<view class="flex-1">
				<view class="flexlist-title" >{{item.name}}</view>
				
				<view class="flexlist-desc">{{item.brief}}</view>
			</view>
			<image class="flexlist-img" src="../../static/img/x_right.png"></image>
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
			}
			
		},

		onLoad: function (option) {
			this.abotapi.set_option_list_str(null, this.abotapi.getColor());
			this.get_column_group();
		},
		onReady: function () {
			uni.setNavigationBarTitle({
				title: "请选择合作类型",
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
			get_column_group:function(){
				//获取发布帖子的栏目组
				
				var shop_option_data = JSON.parse(uni.getStorageSync('shop_option_data_' + this.abotapi.globalData.default_sellerid));
				
				this.publish_img_cata_list = shop_option_data['publish_img_cata_list'];
				
				console.log('publish_img_cata_list==>获取发帖栏目',this.publish_img_cata_list);
			},
			
			form_issue:function(e,f){
				console.log(132);
				uni.navigateTo({
					url:'./publish_write?classid=' + e + '&name=' + f,
				})
			},
		},
	}
</script>

<style>
	.flexlist-img{
		width: 40upx;
		height: 40upx;
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
	
</style>