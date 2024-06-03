<template>
	<view class="content">
		
		<view class="content-dizhidingwei" v-if="modal_message">
			<view class="content-dizhidingwei-item">
				<view>海秦时代大厦  <hr style="margin: 12rpx 0;"></view>
				<view>通河一村  <hr style="margin: 12rpx 0;"></view>
				<view>田林六村  <hr style="margin: 12rpx 0;"></view>
				<view style="color: #adadad;" @tap="addCommunity">+新增社区  <hr style="margin-top: 12rpx;"></view>
			</view>
			<view class="content-guanli"  @tap="addCommunity">管理社区</view>
		</view>
		
		<!-- <view class="content-top">
			<view class="content-top-location" @tap="modal_message = true">
				<view class="content-top-didian">海琴时代大厦</view>
				<image src="https://yanyubao.tseo.cn/Tpl/static/images/community_service/向下.png" style="width: 40rpx; height: 40rpx;"></image>
			</view> -->
			<!-- 搜索框 -->
			<!-- <view class="content-top-search">
				<input placeholder="搜索您感兴趣的" placeholder-style="color:#919191;" style="margin-top: 20rpx; margin-left: 20rpx"	/>
				<view class="content_top_button"><image src="https://yanyubao.tseo.cn/Tpl/static/images/community_service/搜索.png" style="width: 40rpx; height: 40rpx; margin: 0 auto;"></image></view>
			</view>
		</view> -->
		

		
		
		
			<checkbox-group class="block" @change="changeCheckbox">
	            <view v-for="item in checkboxData" :key="item.value">                
	                <checkbox :value="String(item.value)" 
					:checked="checkedArr.includes(String(item.value))" 
					:class="{'checked':checkedArr.includes(String(item.value))}"></checkbox>
	                <text>{{item.label}}</text>
	            </view>
	        </checkbox-group>

		
		<view class="content-fujin">
			<view style="display: flex; flex-direction: row;width: 100%;color: #adadad;">
				<view @click="curTabID = 1" :class="{'cur':curTabID===1}" class="nav_list_title">我的社区</view>
				<view @click="curTabID = 2" :class="{'cur':curTabID===2}" class="nav_list_title">附近500米</view>
				<view @click="curTabID = 3" :class="{'cur':curTabID===3}" class="nav_list_title">附近1000米</view>
			</view>
		</view>
		<view class="content-middle">
			<view class="content-middle-list">
				<view @click="cur1TabID = 1" :class="{'cur1':cur1TabID===1}" class="nav_list_fenlei1">闲置物品<view class="community-xiahuaxian" v-show="cur1TabID===1"></view></view>
				<view @click="cur1TabID = 2" :class="{'cur2':cur1TabID===2}" class="nav_list_fenlei2">限时拼单<view class="community-xiahuaxian" v-show="cur1TabID===2"></view></view>
			</view>
		</view>
		<view class="content-middle-content">
			<view v-show="cur1TabID === 1">
				<view class="content-list-item">
					<view class="content-middle-item">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/community_service/shouji.jpeg" style="width: 100%;height: 300rpx;"></image>
						<view style="padding: 10rpx;">
							<view class="middle-item-text">iphone14手机，基本全新，现出售，有谁需要，快来联系，先到先得！！！</view>
							<view class="middle-item-price">¥12000.00</view>
							<view class="middle-item-list">
								<view class="middle-item01">
									<image src="https://yanyubao.tseo.cn/Tpl/static/images/diancan.png" style="width: 40rpx; height: 40rpx;border-radius: 50%"></image>
									<view class="middle-item-name">支支吾吾</view>
								</view>
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_star2.png" style="width: 50rpx;height: 50rpx;"></image>
							</view>
							<view class="middle-item-list02">
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/weizhi.png" style="width: 40rpx; height: 40rpx;"></image>
								<view class="middle-item-location">海秦时代大厦</view>
							</view>	
						</view>
					</view>
					<view class="content-middle-item">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/community_service/shouji.jpeg" style="width: 100%;height: 300rpx;"></image>
						<view style="padding: 10rpx;">
							<view class="middle-item-text">iphone14手机，基本全新，现出售，有谁需要，快来联系，先到先得！！！</view>
							<view class="middle-item-price">¥12000.00</view>
							<view class="middle-item-list">
								<view class="middle-item01">
									<image src="https://yanyubao.tseo.cn/Tpl/static/images/diancan.png" style="width: 40rpx; height: 40rpx;border-radius: 50%"></image>
									<view class="middle-item-name">支支吾吾</view>
								</view>
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_star2.png" style="width: 50rpx;height: 50rpx;"></image>
							</view>
							<view class="middle-item-list02">
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/weizhi.png" style="width: 40rpx; height: 40rpx;"></image>
								<view class="middle-item-location">海秦时代大厦</view>
							</view>	
						</view>
					</view>
					<view class="content-middle-item">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/community_service/shouji.jpeg" style="width: 100%;height: 300rpx;"></image>
						<view style="padding: 10rpx;">
							<view class="middle-item-text">iphone14手机，基本全新，现出售，有谁需要，快来联系，先到先得！！！</view>
							<view class="middle-item-price">¥12000.00</view>
							<view class="middle-item-list">
								<view class="middle-item01">
									<image src="https://yanyubao.tseo.cn/Tpl/static/images/diancan.png" style="width: 40rpx; height: 40rpx;border-radius: 50%"></image>
									<view class="middle-item-name">支支吾吾</view>
								</view>
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_star2.png" style="width: 50rpx;height: 50rpx;"></image>
							</view>
							<view class="middle-item-list02">
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/weizhi.png" style="width: 40rpx; height: 40rpx;"></image>
								<view class="middle-item-location">海秦时代大厦</view>
							</view>	
						</view>
					</view>
					<view class="content-middle-item">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/community_service/shouji.jpeg" style="width: 100%;height: 300rpx;"></image>
						<view style="padding: 10rpx;">
							<view class="middle-item-text">iphone14手机，基本全新，现出售，有谁需要，快来联系，先到先得！！！</view>
							<view class="middle-item-price">¥12000.00</view>
							<view class="middle-item-list">
								<view class="middle-item01">
									<image src="https://yanyubao.tseo.cn/Tpl/static/images/diancan.png" style="width: 40rpx; height: 40rpx;border-radius: 50%"></image>
									<view class="middle-item-name">支支吾吾</view>
								</view>
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_star2.png" style="width: 50rpx;height: 50rpx;"></image>
							</view>
							<view class="middle-item-list02">
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/weizhi.png" style="width: 40rpx; height: 40rpx;"></image>
								<view class="middle-item-location">海秦时代大厦</view>
							</view>	
						</view>
					</view>
					
				</view>
				
			</view>
			<view v-show="cur1TabID === 2">
				<view class="content-list-item">
					<view class="content-middle-item">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/community_service/dayi.jpeg" style="width: 100%;height: 300rpx;"></image>
						<view style="padding: 10rpx;">
							<view class="middle-item-text">iphone14手机，基本全新，现出售，有谁需要，快来联系，先到先得！！！</view>
							<view class="middle-item-price">¥12000.00</view>
							<view class="middle-item-list">
								<view class="middle-item01">
									<image src="https://yanyubao.tseo.cn/Tpl/static/images/diancan.png" style="width: 40rpx; height: 40rpx;border-radius: 50%"></image>
									<view class="middle-item-name">支支吾吾</view>
								</view>
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_star2.png" style="width: 50rpx;height: 50rpx;"></image>
							</view>
							<view class="middle-item-list02">
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/weizhi.png" style="width: 40rpx; height: 40rpx;"></image>
								<view class="middle-item-location">海秦时代大厦</view>
							</view>	
						</view>
					</view>
					<view class="content-middle-item">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/community_service/dayi.jpeg" style="width: 100%;height: 300rpx;"></image>
						<view style="padding: 10rpx;">
							<view class="middle-item-text">iphone14手机，基本全新，现出售，有谁需要，快来联系，先到先得！！！</view>
							<view class="middle-item-price">¥12000.00</view>
							<view class="middle-item-list">
								<view class="middle-item01">
									<image src="https://yanyubao.tseo.cn/Tpl/static/images/diancan.png" style="width: 40rpx; height: 40rpx;border-radius: 50%"></image>
									<view class="middle-item-name">支支吾吾</view>
								</view>
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_star2.png" style="width: 50rpx;height: 50rpx;"></image>
							</view>
							<view class="middle-item-list02">
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/weizhi.png" style="width: 40rpx; height: 40rpx;"></image>
								<view class="middle-item-location">海秦时代大厦</view>
							</view>	
						</view>
					</view>
					<view class="content-middle-item">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/community_service/dayi.jpeg" style="width: 100%;height: 300rpx;"></image>
						<view style="padding: 10rpx;">
							<view class="middle-item-text">iphone14手机，基本全新，现出售，有谁需要，快来联系，先到先得！！！</view>
							<view class="middle-item-price">¥12000.00</view>
							<view class="middle-item-list">
								<view class="middle-item01">
									<image src="https://yanyubao.tseo.cn/Tpl/static/images/diancan.png" style="width: 40rpx; height: 40rpx;border-radius: 50%"></image>
									<view class="middle-item-name">支支吾吾</view>
								</view>
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_star2.png" style="width: 50rpx;height: 50rpx;"></image>
							</view>
							<view class="middle-item-list02">
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/weizhi.png" style="width: 40rpx; height: 40rpx;"></image>
								<view class="middle-item-location">海秦时代大厦</view>
							</view>	
						</view>
					</view>
					<view class="content-middle-item">
						<image src="https://yanyubao.tseo.cn/Tpl/static/images/community_service/dayi.jpeg" style="width: 100%;height: 300rpx;"></image>
						<view style="padding: 10rpx;">
							<view class="middle-item-text">iphone14手机，基本全新，现出售，有谁需要，快来联系，先到先得！！！</view>
							<view class="middle-item-price">¥12000.00</view>
							<view class="middle-item-list">
								<view class="middle-item01">
									<image src="https://yanyubao.tseo.cn/Tpl/static/images/diancan.png" style="width: 40rpx; height: 40rpx;border-radius: 50%"></image>
									<view class="middle-item-name">支支吾吾</view>
								</view>
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/xianmaishang_icon_star2.png" style="width: 50rpx;height: 50rpx;"></image>
							</view>
							<view class="middle-item-list02">
								<image src="https://yanyubao.tseo.cn/Tpl/static/images/weizhi.png" style="width: 40rpx; height: 40rpx;"></image>
								<view class="middle-item-location">海秦时代大厦</view>
							</view>	
						</view>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>

	export default{
		data() {
			return{
				curTabID: 1,
				cur1TabID: 1,
				modal_message: false,
				
				selectedValues:[],
				sports:[],
				isChecked:false,
				checkboxData:[
					{'value':0,'label':'选项一'},
					{'value':1,'label':'选项二'},
					{'value':2,'label':'选项三'},
					{'value':3,'label':'选项四'},
					{'value':4,'label':'选项五'},
					{'value':5,'label':'选项六'},
					{'value':6,'label':'选项七'},
					{'value':7,'label':'选项八'},
					{'value':8,'label':'选项九'},
					{'value':9,'label':'选项十'}
				],
				checkedArr:[], //复选框选中的值
				allChecked:false //是否全选
	
			}
		},
		methods:{
			// 多选复选框改变事件
			changeCheckbox(e){
				this.checkedArr = e.detail.value;
	
				console.log('复选框选中的值', this.checkedArr);
			},

			
			
			
			submit() {
			      console.log(this.selectedValues)
			    },
			addCommunity:function(){
				this.abotapi.call_h5browser_or_other_goto_url('/pages/community_service/my_community');
			}
		}
	}	
</script>

<style>
	.content-top{
		width: 100%;
		height: auto;
		background-color: #F5F5F5;
		padding: 20rpx;
		position: sticky;
		top:0;
		z-index:9000;
	}
	.content-top-location{
		flex-flow: row;
		justify-content: flex-start;
		display: flex;
	}	
	.content-top-didian{
		width: 25%;	
	}
	.content-top-search{
		width: 94%;
		height: 80rpx;
		border: 2rpx solid #cecece;
		margin-top: 30rpx;
		border-radius: 40upx;
		background-color: #fff;
		flex-flow: row;
		justify-content: flex-start;
		display: flex;
		justify-content: space-between;
		
		
	}
	.content_top_button{
		width: 60rpx;
		height: 60rpx;
		background-color: #90D269;
		float: right;
		border-radius: 50upx;
		margin-top: 10rpx;
		margin-right: 10rpx;
		display: flex;
		align-items: center;
		text-align:center; 
	}
	.content-fujin{
		background-color: #F5F5F5;
		padding-top: 20rpx;
	}
	.cur{
		border: 1px solid #FFD603;
		background-color: #FFD603;
		border-radius: 30upx;
		text-align: center;
		color: #414141;
	}
	.nav_list_title{
		height: 60rpx;
		line-height: 60rpx;
		margin: 0 10rpx;
		padding: 0 20rpx;
		border: 1px solid #F5F5F5;
	}
	.content-middle{
		background-color: #F5F5F5;
		padding-top: 40rpx;
	}
	.content-middle-list{
		display: flex; 
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
		color: #adadad;
	}
	.nav_list_fenlei1{
		width: 50%;
		height: 80rpx;
		line-height: 80rpx;
		color: #949494;
		font-size: 36rpx;
		font-weight: bolder;
		text-align: center;
		border-bottom: 2rpx solid #9d9d9d;
		/* border-right: 2rpx solid #414141; */
		border-bottom-right-radius: 30upx;
		/* box-shadow: 10px 10px 10px rgba(.5,0,0,0);
		-moz-box-shadow: 10px 10px 10px rgba(.5,0,0,0);
		-webkit-box-shadow:  10px 10px 10px rgba(.5,0,0,0); */

	}
	.nav_list_fenlei2{
		width: 50%;
		height: 80rpx;
		line-height: 80rpx;
		color: #949494;
		font-size: 36rpx;
		font-weight: bolder;
		text-align: center;
		border-bottom: 2rpx solid #9d9d9d;
		border-bottom-left-radius: 30upx;
		
		
	}
	.cur1{
		color: #262626;
		border-top: 2rpx solid #9d9d9d;
		/* border-left: 2rpx solid #414141; */
		border-top-right-radius: 30upx;
		border-bottom: 0ch;
	}
	
	
	.cur2{
		color: #262626;
		border-top: 2rpx solid #9d9d9d;
		/* border-left: 2rpx solid #414141; */
		border-top-left-radius: 30upx;
		border-bottom: 0ch;
	}

	.community-xiahuaxian{
		width: 80px;
		border-bottom: 10rpx solid #90D269;
		background-color: #90D269;
		border-radius: 10upx;
		margin-left: 105rpx;
		margin-top: -30rpx;
	}
	.content-list-item{
		width: 100%;
		background-color:#F5F5F5;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		
	}
	.content-middle-item{
		margin: 18rpx;
		width: 45%;
		background-color: #fff;
	}
	.middle-item-text{
		color:#2b2b2b;
		font-size: 22rpx;
		font-weight: bold;
		text-align: justify;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2; 
		overflow: hidden;
	}
	.middle-item-price{
		font-size: 36rpx;
		margin-top: 10rpx;
		font-weight: bold;
		color: #F0649D;
	}
	.middle-item-name{
		color: #666666;
		font-weight: bold;
		margin-left: 10rpx;
		font-size: 26rpx;
	}
	.middle-item01{
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
	}
	.middle-item-list{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* display:table-cell; */ 
		align-items: center;
	}
	.middle-item-list02{
		display: flex;
		flex-direction: row;
		margin-top: 10rpx;
	}
	.middle-item-location{
		color: #666666;
		font-size: 20rpx;
	}
	.content-dizhidingwei{
		width: 35%;
		border: 2rpx solid #b9b9b9;
		position: fixed;
		text-align: center;
		background-color: #F5F5F5;
		z-index: 9999;
		
	}
	.content-dizhidingwei-item{
		padding: 20rpx;
		
	}
	.content-guanli{
		width: 200rpx;
		height: 40rpx;
		color: #F5F5F5;
		font-weight: bold;
		background-color: #5E9FDF;
		border-radius: 20upx;
		margin:0 20rpx;
		margin-bottom: 10rpx;
	}
	
	
	
</style>