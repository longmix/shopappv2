<template>
	<view>
		<view>
			<view class="title_box">
				 <!-- 头像和昵称和发布时间 -->
				<view class="head_img">
					<image src="../../static/img/shop/3.jpg"></image>
				</view>
				<view>
					<view class="nickname">
						<!-- 昵称 -->
						来都来了
					</view>
					<view class="cata_name">
						<!-- 分类名称 -->
						<view style="font-size: 22upx;">测试分类1</view>
					</view>
				</view>
			</view>
			
			<view class="content">
				<!-- 内容 -->
				          祖传：中草药特效健骨丸 本产品在几代祖传的基础上，采用现代医学新技术提炼而成，具有见效快、
						  治愈率高、无副作用的新一代良药。给风湿、类风湿、肩颈腰痛、痛风、哮喘以及各种骨关节疾患者带来福音，
						  带来了劳动力。被广大患者称之为灵丹仙药（主治）：风湿骨痛、坐骨神经痛、骨质增生、腰间盘突出、腰酸背痛、
						  颈椎炎、肩周炎、风湿关节炎、手脚麻木、四肢无力、腰肌劳损、跌打扭伤、新旧伤积、骨头坏死、头痛、牙痛、
						  酸麻胀痛、一切老风湿类风湿、手脚伸屈不便。支气管炎、哮喘、慢性气管炎、肺气肿、痛风等。用法
						  ：成人每日两次，早晚各一粒，饭后服用。（禁忌）：鲤鱼、竹笋、莲藕、海鲜、浓茶、酸辣食物。
			</view>
			<view class="content_img_box">
				<!-- 图片，有就显示没有就不显示 -->
				<view class="content_img">
					<image src="../../static/img/shop/3.jpg"></image>
				</view>
				
				<view class="content_img">
					<image src="../../static/img/shop/3.jpg"></image>
				</view>
				<view class="content_img">
					<image src="../../static/img/shop/3.jpg"></image>
				</view>
				<view class="content_img">
					<image src="../../static/img/shop/3.jpg"></image>
				</view>
				<view class="content_img">
					<image src="../../static/img/shop/3.jpg"></image>
				</view>
			</view>
			
			<view style="margin-left:20upx;">
				<!-- 底部的点赞量和浏览量 -->
				<view style="font-size: 24upx;color: #333;">
					<!-- 发布时间 -->
					05月18日 18:12
				</view>
				<view style="position:absolute;left: 60upx;border-width: 15rpx;border-style: solid;border-color: transparent transparent #ccc #ccc;transform: rotate(135deg);"></view>
				<view style="display: flex;background-color: #ccc;align-items: center;margin-top: 14upx;">
					<view style="width: 60%;display: flex;align-items: center;padding: 5upx 10upx;">
						<!-- 点赞和浏览 -->
						<view style="display: flex;align-items: center;margin-right: 20upx;">
							<image src="../../static/img/help/comment.png" style="width: 40rpx;height:40rpx;"></image>
							<view style="color: #333;font-size: 22upx;">323人浏览</view>
						</view>
						<view style="display: flex;align-items: center;">
							<image src="../../static/img/help/comment.png" style="width: 40rpx;height:40rpx;"></image>
							<view style="color: #333;font-size: 22upx;">323人浏览</view>
						</view>
					</view>
					<view style="color:#2cb2f0;width: 40%;text-align: right;">
						<!-- 查看详情 -->
						<view style="font-size: 24rpx;">查看详情>></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				bd_basic_option_str:'',
				current: 0,
				shopList: [],
				ptype:'',
				title:'延誉',
				page:1,
				catId:0,
				brandId: 0,
				focus: false,
				hotKeyShow: true,
				historyKeyShow: true,
				searchValue: '',
				historyKeyList: [],
				hotKeyList: [],
				is_more: true,
				weiduke_resou:'',
				index_list:'',
				dianzan_num:0,
				dianzan_num2:0,
				num01:'',
				click:'',
			}
		},
		
		
		onLoad:function(options){
			console.log('options',options);
			var that = this;
			this.get_publish_list();
			//从服务器端获取相关后台设置
			// app.set_option_list_str(null, app.getColor());
			// this.bd_basic_option_str = JSON.parse( uni.getStorageSync('bd_basic_option_str'));
			// console.log("bd_basic_option_str111",this.bd_basic_option_str);
			
			//获取服务器返回的热搜词
			// if (this.bd_basic_option_str.weiduke_resou) {
			    
			// 	that.weiduke_resou = this.bd_basic_option_str.weiduke_resou
			// 	console.log('weiduke_resou',that.weiduke_resou);
			// 	that.hotKeyList = that.weiduke_resou.split(' ');
			//     console.log('resou',that.hotKeyList);
			// }
			
			//获取用户搜索记录
			// var historyKeyList = uni.getStorageSync('historyKeyList_cache');	
			// that.historyKeyList = historyKeyList ? historyKeyList : []
			// console.log('56565', that.historyKeyList)
			
			uni.getSystemInfo({
				//获取手机信息
				success:res => {
					//获取手机各种参数
					console.log("手机参数",res);
					//设置父元素(overall)高度  swiper不会自适应高度 需要设置固定高度
					this.width_overall = res.windowWidth;
					console.log("width_overall ====",this.width_overall);
					that.num01 = this.width_overall*0.4;
					console.log("num01",that.num01);
				}
			});
		},
		
		methods: {
			//跳转文章详情
			goForum: function(id) {
				uni.navigateTo({
					url: "../../../pageforum/forum/show?id=" + id
				})
			},
			
			//确认开始搜索
			get_publish_list: function () {
				// var shop_option_data = uni.getStorageSync('shop_option_data');
				// var json_shop_option_data = JSON.parse(shop_option_data);
				// this.cms_token = json_shop_option_data.option_list.cms_token;
				
				var that = this;
				this.abotapi.abotRequest({
					url: that.abotapi.globalData.weiduke_server_url + 'openapi/ArticleImgApi/article_list',
					method: 'post',
					data: {
						token:that.cms_token,
						sellerid: this.abotapi.globalData.default_sellerid,
						action: 'newlist',
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function (res) {
						console.log("res",res);
						if(res.data.code == 1){
							that.is_searchData = true;
							that.index_list = res.data.data
						}else{
							uni.showToast({
								title: '暂无相关文章',
								duration: 2000
							});
							that.is_searchData = false;
							that.hotKeyShow = true;
							that.historyKeyShow = true;
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
			
			
			//读取搜索记录缓存
			doKeySearch: function (e) {
				var that = this;
			    var key = e.currentTarget.dataset.key;
			
			    // var historyKeyList = that.historyKeyList;
			    this.remove(key);
			    that.historyKeyList.unshift(key);
			    uni.setStorageSync('historyKeyList_cache', that.historyKeyList)
			
				that.searchValue = key;
				that.hotKeyShow = false;
				that.historyKeyShow = false;
			    that.doSearch();
			},
			
			//获取用户输入的搜索值
			searchValueInput: function (e) {
				console.log('e',e);
				var that = this;
			    var value = e.detail.value;
				that.searchValue = value,
				that.page = 1
			    if (!value && this.shopList.length == 0) {
					that.hotKeyShow = true;
			        that.historyKeyShow = true;
					that.is_searchData = false;
			    }
			},
			
			
			
			
			//删除指定元素
			remove: function (e) {
				var index = this.historyKeyList.indexOf(e);
			    if (index > -1) {
					this.historyKeyList.splice(index, 1);
				}
			},
			
			
		}
	}
</script>

<style>
	.title_box{
		display: -webkit-flex;
		display: flex;
		align-items: center;
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
	}
	.cata_name{
		margin-top: 10upx;
		background-color: #18dba6;
		color: #fff;
		border-radius:6upx;
		padding: 2rpx 6rpx;
		text-align: center;
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
</style>