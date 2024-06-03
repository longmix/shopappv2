<template>
	<view style="background-color: #f4f4f4;padding: 1px 0px 1px 0px;" :class="spec_list_type == 'product_list02'?'spec_list_type_product_list02':''">
		<view v-if="(show_zhuanti_title == 1) && index_list && (index_list.length > 0)" class="zhuanti_title">※ 最近更新
			<view class="zhuanti_title_more" @click="goToPublishList($event)">查看更多&gt;&gt;</view>
		</view>
		
		
		<block v-if="spec_list_type == 'product_list02'">
			<view v-for="(item,index) in index_list" :key="item.id"
					style="background: #fff;margin: 7rpx;border-radius: 8rpx;width: 48%;">
					
					
						<view class="content_img_box">
							<!-- 图片，有就显示没有就不显示 falsetu-->
							<view class="" style="width: 100%;" v-for="picture_item in item.picture_list" :key="picture_item">
								<image :src="picture_item" mode="widthFix" style="width: 360rpx;border-radius: 0rpx;" @tap="previewImage(index)"></image>
							</view>
							<view class="" style="width: 100%;" v-if ="!item.picture_list" :key="picture_item">
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/falsetu.png" mode="widthFix" style="width: 360rpx;border-radius: 0rpx;" @tap="previewImage(index)"></image>
							</view>
						</view>
						<view class="content" style="margin: 20rpx;font-size: 26rpx;" @tap="goForum(item.id)">
							<!-- 内容 -->
							{{item.text}}
						</view>
						<!-- <view></view>
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/aixin_01.png"
							mode="widthFix" style="width: 50rpx;height: 50rpx;" >
						</image> -->
						<!-- <image src="https://yanyubao.tseo.cn/Tpl/static/nft_card/xin.png" mode="widthFix" 
							style="width: 60rpx;height:60rpx;"  >
						</image> -->
						<view class="" style="width: 100%;margin: 20rpx;font-weight: bolder;" v-for="value_item in item.value_list" :key="value_item">
							<view v-if="value_item.fieldname == 'price' && value_item.fieldvalue != '' ">￥{{value_item.fieldvalue}}</view>
							<view v-if="value_item.fieldname == 'price' && value_item.fieldvalue == '' ">￥0</view>
						</view>
						
					
					
					
					
			</view>
			
			
		</block>
		<block v-else-if="spec_list_type == 'product_list01'">
			<view v-for="(item,index) in index_list" :key="item.id"
					style="background: #fff;margin: 18rpx;border-radius: 8rpx;width: 95%;"  @tap="goForum(item.id)">
					
						<view style="display: flex;padding:32rpx;">
							<view style="width: 80%;display: flex;">
								<view class="content_img_box">
									<!-- 图片，有就显示没有就不显示 -->
									<view class="" style="width: 100%;" v-for="picture_item in item.picture_list" :key="picture_item">
										<image :src="picture_item" mode="widthFix" style="width: 150rpx;height:150rpx;border-radius: 8rpx;margin: 10rpx;" @tap="previewImage(index)"></image>
									</view>
									<view class="" style="width: 100%;" v-if ="!item.picture_list" :key="picture_item">
										<image :src="item.pic" mode="widthFix"
										 style="width: 150rpx;height: 150rpx;border-radius: 8rpx;margin: 10rpx;" @tap="previewImage(index)"></image>
									</view>
								</view>
								<view style="">
									<view class="content" style="margin: 20rpx;font-size: 26rpx;">
										<!-- 内容 -->
										{{item.text}}
									</view>
									<view class="" style="width: 100%;margin: 20rpx;font-weight: bolder;" v-for="value_item in item.value_list" :key="value_item">
										<view v-if="value_item.fieldname == 'price' && value_item.fieldvalue != '' ">￥{{value_item.fieldvalue}}</view>
										<view v-if="value_item.fieldname == 'price' && value_item.fieldvalue == '' ">￥0</view>
									</view>
														
								</view>
								
							</view>
							<view
								v-if="action == 'my_publish'" 
								style="color: #2cb2f0;margin:50rpx 20px 10rpx 20rpx;font-size: 29rpx;"
								@click="article_delete(item.id,index)"
							>删除</view>
						</view>
						
					
					
					
			</view>
			
			
		</block>
		<block v-else>
		
			<view v-for="(item,index) in index_list" :key="item.id" 
					style="background: #fff;margin: 8rpx;border-radius: 8rpx;">
		
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
					{{item.text}}
				</view>
				<view class="content_img_box">
					<!-- 图片，有就显示没有就不显示 -->
					<block v-for="picture_item in item.picture_list" :key="picture_item">
						<view class="content_img" v-if="(picture_item != null) && (picture_item.length > 0)">
							<image :src="picture_item" mode="widthFix" @tap="previewImage(index)"></image>
						</view>
					</block>					
					
				</view>
				
				<view style="margin-left:20rpx; border: 10rpx solid #FFFFFF;">
					<!-- 底部的点赞量和浏览量 -->
					<view style="font-size: 24rpx;color: #333;">
						<!-- 发布时间 -->
						{{item.updatetime}}
					</view>
					<view style="position:absolute;left: 60rpx;border-width: 15rpx;border-style: solid;border-color: transparent transparent #f2f2f2 #f2f2f2;transform: rotate(135deg);"></view>
					<view style="display: flex;background-color: #f2f2f2;align-items: center;margin-top: 14rpx;margin-bottom: 15rpx;">
						<view style="width: 100%;display: flex;align-items: center;padding: 10rpx 10rpx;">
							<!-- 点赞和浏览 -->
							<view style="display: flex;align-items: center;margin-right: 20rpx;width:33%;">
								<image src="../../static/img/help/click_view.png" style="width: 40rpx;height:40rpx;"></image>
								<view style="color: #333;font-size: 22rpx;margin-left: 10rpx;">{{item.click}}浏览</view>
							</view>
							<view style="display: flex;align-items: center;margin-right: 20rpx;width:33%;">
								<image src="../../static/img/help/dianzan_grey.png" style="width: 40rpx;height:40rpx;"></image>
								<view style="color: #333;font-size: 22rpx;margin-left: 10rpx;">{{item.dianzan_num}}点赞</view>
							</view>
							
							<view style="display: flex;align-items: center;width:33%;">
								<image src="../../static/img/help/comment.png" style="width: 40rpx;height:40rpx;"></image>
								<view style="color: #333;font-size: 22rpx;margin-left: 10rpx;">{{item.remark_num}}评论</view>
							</view>
						</view>
						<view style="color:#2cb2f0;width: 40%;text-align: right;">
							<!-- 查看详情 -->
							<view style="font-size: 24rpx;margin-right: 30rpx;" @tap="goForum(item.id)">查看详情>></view>
						</view>
					</view>
				</view>
			</view>
		</block>
		
		
		
		
		
		
	</view>
</template>

<script>
	export default {
		name: 'publish-list',	
		
		props: {
			index_list:'',
			spec_list_type:{
				type: String,
				default: 'default'
			},
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
				console.log('asdasdasdsda')
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
		margin: 20rpx;
	}
	.head_img image{
		width: 100rpx;
		height: 100rpx;
		border-radius:5rpx;
	}
	.nickname{
		color:#333;
		font-weight:blod;
	}
	.cata_name{
		margin-top: 10rpx;
		background-color: #18dba6;
		color: #fff;
		border-radius:6rpx;
		padding: 2rpx 6rpx;
		text-align: center;
		font-size:28rpx;
		display: inline-block;
	}
	.content{
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		margin: 0 20rpx;
	}
	.content_img_box{
		display: flex;
		flex-wrap:wrap;
	}
	.content_img{
		margin-right: 1%;		
		margin: 10rpx 20rpx;
	}
	.content_img image{
		width: 200rpx;
		border-radius: 0rpx;		
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
		border-radius: 50rpx;
		margin-left: 2%;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		height: 70rpx;
		color: #AAAAAA;
		z-index: 99999;
	}
	.sou image{
	    margin-right: 20rpx;
		width: 40rpx;
		height:40rpx;
	}
	.sou input{
	   margin-left: 20rpx;
	}
	.nav-icon-con{
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		font-size: 28rpx;
		background-color: #FFFFFF;
		padding:inherit;
	}
	.nav-icon-con > view{
		width: 20%;
		margin-top: 3%;
		text-align: center;
	}
	.nav-icon-list{		
		width: 70rpx;
		height: 70rpx;
	}
	.nav-icon-a{
		text-align: center;
	}
	.nav-icon-a view{
		/* margin-top: 20rpx; */
		text-align: center;
		font-size: 28rpx;
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
	
	.spec_list_type_product_list02{
		display:flex;
		flex-wrap: wrap;
	}
</style>
