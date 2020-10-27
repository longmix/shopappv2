<template>
	<view style="background-color: #f4f4f4;padding: 1px 0px 1px 0px;">
		<view v-if="(show_zhuanti_title == 1) && index_list && (index_list.length > 0)" class="zhuanti_title">※ 最近更新
			<view class="zhuanti_title_more" @click="goToPublishList($event)">查看更多&gt;&gt;</view>
		</view>
		
		<view v-for="(item,index) in index_list" :key="item.id" style="background: #fff;margin: 8upx;border-radius: 8upx;">
			<view class="title_box">
				 <view style="display: flex;align-items: center;">
					 <!-- 头像和昵称和发布时间 -->
					 <view class="head_img">
					 	<image :src="item.user_detail.headimgurl"></image>
					 </view>
					 <view>
					 	<b>
					 		<view class="nickname">
					 			<!-- 昵称 -->
					 			{{item.user_detail.nickname}}
					 		</view>
					 	</b>
					 	<view class="cata_name">
					 		<!-- 分类名称 -->
					 		<view style="">{{item.classname}}</view>
					 	</view>
					 </view>
				 </view>
				<view 
				v-if="action == 'my_publish'" 
				style="color: #2cb2f0;margin-right: 12px;font-size: 29rpx;"
				@click="article_delete(item.id,index)"
				>删除</view>
			</view>
			
			<view class="content" @tap="goForum(item.id)">
				<!-- 内容 -->
				{{item.info}}
			</view>
			<view class="content_img_box">
				<!-- 图片，有就显示没有就不显示 -->
				<view class="content_img" v-for="picture_item in item.picture_list" :key="picture_item">
					<image :src="picture_item" @tap="previewImage(index)"></image>
				</view>
				
			</view>
			
			<view style="margin-left:20upx; border: 10upx solid #FFFFFF;">
				<!-- 底部的点赞量和浏览量 -->
				<view style="font-size: 24upx;color: #333;">
					<!-- 发布时间 -->
					{{item.updatetime}}
				</view>
				<view style="position:absolute;left: 60upx;border-width: 15rpx;border-style: solid;border-color: transparent transparent #f2f2f2 #f2f2f2;transform: rotate(135deg);"></view>
				<view style="display: flex;background-color: #f2f2f2;align-items: center;margin-top: 14upx;margin-bottom: 15upx;">
					<view style="width: 100%;display: flex;align-items: center;padding: 10upx 10upx;">
						<!-- 点赞和浏览 -->
						<view style="display: flex;align-items: center;margin-right: 20upx;width:33%;">
							<image src="../../static/img/help/click_view.png" style="width: 40rpx;height:40rpx;"></image>
							<view style="color: #333;font-size: 22upx;margin-left: 10upx;">{{item.click}}浏览</view>
						</view>
						<view style="display: flex;align-items: center;margin-right: 20upx;width:33%;">
							<image src="../../static/img/help/dianzan_grey.png" style="width: 40rpx;height:40rpx;"></image>
							<view style="color: #333;font-size: 22upx;margin-left: 10upx;">{{item.dianzan_num}}点赞</view>
						</view>
						
						<view style="display: flex;align-items: center;width:33%;">
							<image src="../../static/img/help/comment.png" style="width: 40rpx;height:40rpx;"></image>
							<view style="color: #333;font-size: 22upx;margin-left: 10upx;">{{item.remark_num}}评论</view>
						</view>
					</view>
					<view style="color:#2cb2f0;width: 40%;text-align: right;">
						<!-- 查看详情 -->
						<view style="font-size: 24rpx;margin-right: 30upx;" @tap="goForum(item.id)">查看详情>></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'publish-list',	
		
		props: {
			index_list:'',
			action:'',
			show_zhuanti_title:0,
		},
		onLoad() {
			var that = this;
	
		},
		methods:{
			goForum:function(e){
				this.$emit('goForum',e);
			},
			goToPublishList:function(e){
				this.$emit('goToPublishList',e);
			},
			previewImage:function(index){
				this.$emit('previewImage',index);
			},
			article_delete:function(imgid,index){
				var that = this;
				uni.showModal({
					title: '是否确认删除?',
					success: function (res) {
						if (res.confirm) {
							that.$emit('article_delete',imgid,index);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
				
				
			},
		}
		
	}
</script>

<style>
	.title_box{
		display: -webkit-flex;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.head_img{
		margin: 20upx;
	}
	.head_img image{
		width: 100upx;
		height: 100upx;
		border-radius:5upx;
	}
	.nickname{
		color:#333;
		font-weight:blod;
	}
	.cata_name{
		margin-top: 10upx;
		background-color: #18dba6;
		color: #fff;
		border-radius:6upx;
		padding: 2rpx 6rpx;
		text-align: center;
		font-size:28upx;
		display: inline-block;
	}
	.content{
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		margin: 0 20upx;
	}
	.content_img_box{
		display: flex;
		flex-wrap:wrap;
	}
	.content_img{
		width: 19%;
		height: 160rpx;
		
		margin-right: 1%;
		
		margin: 10upx 20upx;
	}
	.content_img image{
		width: 100%;
		height: 160rpx;
		border-radius: 10rpx;
		
	}
	.kuang{
		position: absolute;
		content: "";
		border-width: 20rpx;
		border-style: solid;
		border-color: transparent transparent #f2f2f2 #f2f2f2;
		transform: rotate(135deg);
		left: 35px;
		top: -10px;
	
	}
	/*搜索框*/
	.sou{
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #DFDFDF;
		width: 96%;
		border-radius: 50upx;
		margin-left: 2%;
		margin-top: 20upx;
		margin-bottom: 20upx;
		height: 70upx;
		color: #AAAAAA;
		z-index: 99999;
	}
	.sou image{
	    margin-right: 20upx;
		width: 40upx;
		height:40upx;
	}
	.sou input{
	   margin-left: 20upx;
	}
	.nav-icon-con{
		margin-top: 30upx;
		margin-bottom: 30upx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		font-size: 28upx;
		background-color: #FFFFFF;
		padding:inherit;
	}
	.nav-icon-con > view{
		width: 20%;
		margin-top: 3%;
		text-align: center;
	}
	.nav-icon-list{		
		width: 70upx;
		height: 70upx;
	}
	.nav-icon-a{
		text-align: center;
	}
	.nav-icon-a view{
		/* margin-top: 20upx; */
		text-align: center;
		font-size: 28upx;
	}
	.fabu_button{
		position: absolute;
		bottom: 42px;
		right: 8px;
		background: #f44444;
		border-radius: 54%;
		padding: 5px;
		height: 30px;
		width: 30px;
		font-size: 14px;
		color: #fff;
		text-align: center;
		line-height: 30px;
	
	}
	
	.zhuanti_title {
		font-size:26rpx;
		text-align: left;
		color:#a2a2a2;
		padding: 30rpx auto;
		margin: 15px auto 0;
		display: block;
		height: 40rpx;
		width: 90%;
	}
	
	.zhuanti_title_more {
		display:block;
		float:right;
		font-size:26rpx;
	}
</style>
