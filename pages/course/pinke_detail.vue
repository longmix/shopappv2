<template>
	<view>
		<image :src="pinke_xiangqin.product_picture" style="width: 100%;" mode="widthFix" ></image>
		<view class="background_color">
			<view class="letterpress_theme">{{pinke_xiangqin.name}}</view>
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view style="display: flex;align-items: flex-end;">
					<p style="font-size: 45rpx; color: #D9001B;font-weight: bold;">￥</p>
					<p style="font-size: 45rpx; color: #ff5500;font-weight: bold;">{{pinke_xiangqin.price}}</p>
				</view>
				<p style="color: #555555;font-size: 28rpx;">{{pinke_xiangqin.buyers}}人拼课中</p>
			</view>
		</view>
		<u-skeleton
			    rows="2"
				:loading="loading"
				:title="false"
			>
			<view>
				<view class="u-skeleton-slot__content">
					<view class=""	style="margin-top: 30rpx;margin-bottom: 30rpx;">
						<u--text
							text="团购信息:"
							type="main"
							size="16"
							bold="true"
							style="margin-top: 10rpx;margin-bottom: 10rpx;"
						></u--text>
					</view>
					
					<view style="margin-left: 100rpx;" v-for="(item,index) in pintuan_xinxi" :key="index">
						<view class="u-demo-block__content">
						    <u-row
						            justify="space-between"
						            gutter="10"
						    >
						        <u-col span="1">
						            <view class="demo-layout bg-purple"></view>
						        </u-col>
						        <u-col span="4">
						            <view class="demo-layout bg-purple-light" style="color: #333333;">{{item.min}}~{{item.max}}人</view>
						        </u-col>
						        <u-col span="6">
						            <view class="demo-layout bg-purple" style="color: #333333;">{{item.price}}元/h(1.5h/节课)</view>
						        </u-col>
						        <u-col span="1">
						            <view class="demo-layout bg-purple-light"></view>
						        </u-col>
						    </u-row>
						</view>
						<!-- <view class="price_detail">
							<view style="width:250rpx;font-size: 40rpx;">{{item.min}}~{{item.max}}人</view>
							<view	style="font-size: 40rpx;">{{item.price}}</view>
						</view> -->
					</view>
				</view>
			</view>
				
			</u-skeleton>
			<u-skeleton
				    rows="2"
					:loading="loading"
					:title="false"
				>
				<view>
					<view class="u-skeleton-slot__content">
						<view class=""	style="margin-top: 30rpx;margin-bottom: 30rpx;">
							<u--text
								text="课程地点:"
								type="main"
								size="16"
								bold="true"
								style="margin-top: 10rpx;margin-bottom: 10rpx;"
							></u--text>
						</view>
						
						<u-row
						        justify="space-between"
						        gutter="10"
										style="margin-top: 20rpx;margin-bottom: 20rpx;margin-left: -40rpx;"
						>
						    <u-col span="1">
						        <view class="demo-layout bg-purple"></view>
						    </u-col>
						    <u-col span="10">
						        <view class="demo-layout bg-purple-light" style="color: #333333;">{{pinke_xiangqin.memo}}</view>
						    </u-col>
								<u-col span="1">
								    <view class="demo-layout bg-purple"></view>
								</u-col>
						</u-row>
					</view>
				</view>
					
			</u-skeleton>
		<view>
			<u-skeleton
				    rows="2"
					:loading="loading"
					:title="false"
				>
				<view>
					<view class="u-skeleton-slot__content">
						<view class=""	style="margin-top: 30rpx;margin-bottom: 30rpx;">
							<u--text
								text="课程介绍:"
								type="main"
								size="16"
								bold="true"
							></u--text>
						</view>
						
						<u-row
						        justify="space-between"
						        gutter="3"
										style="margin-left: -40rpx;margin-right: 40rpx;"
						>
						    <u-col span="1">
						        <view class="demo-layout bg-purple"></view>
						    </u-col>
						    <u-col span="10"	>
						        <view class="demo-layout bg-purple-light" style="color: #333333;">
											<view>
												<!-- #ifdef MP-ALIPAY -->
												<rich-text :nodes="pinke_xiangqin.describe"></rich-text>
												<!-- #endif -->
												<!-- #ifndef MP-ALIPAY -->
												<rich-text :nodes="pinke_xiangqin.describe|formatRichText"></rich-text>
												<!-- #endif -->
											</view>
										</view>
						    </u-col>
								<u-col span="1">
								    <view class="demo-layout bg-purple"></view>
								</u-col>
						</u-row>
					</view>
					
				</view>
					
			</u-skeleton>
			<view class="u-skeleton-slot__content"	>
				<u--text
					text="评价列表:"
					type="main"
					size="16"
					bold="true"
				></u--text>
				<view v-for="(pinglun_item , index) in pinglun_list" :key="index">
					<view class="u-demo-block__content"	style="margin-top: 10rpx;">
									<u-skeleton
										rows="2"
										title
										:loading="switch2"
										avatar
										rowsHeight="14"
									>
										<!-- 需要在外部多嵌套一层占位view，否则在nvue下会导致样式失效 -->
										<view>
											<view class="u-skeleton-slot">
												<image
													:src="pinglun_item.headlogo"
													class="u-skeleton-slot__image"
												></image>
												<view class="u-skeleton-slot__content">
													<u--text
														:text="pinglun_item.username"
														type="primary"
														bold="true"
														size="16"
													></u--text>
													<u--text
														type="main"
														size="14"
														customStyle="margin-top: 5px"
														:text="pinglun_item.text"
													></u--text>
													<u--text
														type="tips"
														size="14"
														customStyle="margin-top: 5px"
														:text="pinglun_item.createtime"
													></u--text>
												</view>
											</view>
										</view>
									</u-skeleton>
								</view>
					
				</view>
			</view>
			
		</view>
			
		<view style="height: 60rpx;">
			
		</view>
		<view class="bottom_guding" >
			<view class="liji_pinke"	@click="goto_course_pay">立即拼课</view>
			<button class="share-button" open-type="share"	style="display: none;">分享</button>
		</view>
		
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return{
				tabbar_list: [
				{
					"text": "首页",
					"iconPath": 'http://saas.tseo.cn/staticsvc/uploads/2023/12/22/7df1c12f68b69bb935c3f79835c16f026576.png' ,
					"selectedIconPath": 'http://saas.tseo.cn/staticsvc/uploads/2023/12/22/fe34089f16b95595434b6c2716045b826442.png'
	
	
				},
				{
					"text":"我的",
					"iconPath":"http://saas.tseo.cn/staticsvc/uploads/2023/12/22/3ce6e24e61dc59a45be0e98923c39bc18734.png",
					"selectedIconPath":"http://saas.tseo.cn/staticsvc/uploads/2023/12/22/b144cae6ea0ad2355ee2f888b553ac974835.png"
					
				},
				],
				
				current_productid:0,
				pinke_xiangqin:[],
				pintuan_xinxi:[],
				//order_option_key_and_value_str:'',
				
				current_key:'',
				current_value:0,
				loading: true,
				switch1: true,
				switch2: false,
				pinglun_list:[
					{
						"headlogo":'http://saas.tseo.cn/staticsvc/uploads/2023/10/31/8bfcc93d8ae13ccdc4339ac5b588ae0b6382.jpg',
						"username":'谢',
						"createtime":"2024.01.03 12:09",
						"text":"课程不错，老师讲的很好。课程易懂，学到了很多。讲的很有趣，通俗易懂。爱上这门课了"
					},
					{
						"headlogo":'http://saas.tseo.cn/staticsvc/uploads/2023/06/02/a5be4bcaacd4b7de3995ca4d226c24286266.jpg',
						"username":'苏苏莉莉',
						"createtime":"2023.12.30 16:32",
						"text":"课程不错，老师讲的很好。课程易懂，学到了很多。讲的很有趣，通俗易懂。爱上这门课了"
					},
					{
						"headlogo":'http://saas.tseo.cn/staticsvc/uploads/2023/06/02/d93be938c8abd692fd7f88f07cfa5be37915.jpg',
						"username":'lazy',
						"createtime":"2023.12.30 15:44",
						"text":"课程不错，老师讲的很好。课程易懂，学到了很多。讲的很有趣，通俗易懂。爱上这门课了"
					},
					{
						"headlogo":'http://saas.tseo.cn/staticsvc/uploads/2023/07/25/1f631a35057df47566cf93f769ed138b4042.jpg',
						"username":'野鹤',
						"createtime":"2023.12.29 15:33",
						"text":"课程不错，老师讲的很好。课程易懂，学到了很多。讲的很有趣，通俗易懂。爱上这门课了"
					},
					{
						"headlogo":'http://saas.tseo.cn/staticsvc/uploads/2023/07/27/a1830e413b8f3282ee15a12ed97120a18648.jpg',
						"username":'八犬',
						"createtime":"2023.12.29 13:45",
						"text":"课程不错，老师讲的很好。课程易懂，学到了很多。讲的很有趣，通俗易懂。爱上这门课了"
					}
					
				]
				
			}
			
		},
		onLoad(options) {
			var that = this;
			that.current_productid = options.productid;
			console.log('当前的productid为:',that.current_productid );
			that.__pinkexiangqin();
			uni.$u.sleep(2000).then(() => {
				this.loading = false
			})
		},
		methods:{
			//这是每个vue文件都必须执行的回调函数，用于渲染头部导航栏背景色和文字颜色
			callback_function_shop_option_data: function(that, cb_params) {
				
				console.log('callback_function_shop_option_data===>>>', cb_params);
			
				uni.showLoading({
					title: '正在加载中'
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 1000);
				
				//商城的Logo、导航栏背景颜色和文字颜色
				that.wxa_shop_operation_logo_url = cb_params.option_list.wxa_shop_operation_logo_url;
				that.wxa_shop_nav_bg_color = cb_params.option_list.wxa_shop_nav_bg_color;
				that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
			
			},
			//从服务器调取拼课详情页的接口
			__pinkexiangqin:function(){
				var that = this;
				
				var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					productid:that.current_productid,
				};
				
				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if (userInfo && userInfo.userid) {
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				};
				
				that.abotapi.abotRequest({
					//url:'http://192.168.0.71/yanyubao_server/index.php/OpenApi/PinkeOnlineData/pinke_detail',
					
					url:that.abotapi.globalData.yanyubao_server_url + '/OpenApi/PinkeOnlineData/pinke_detail',
					data:post_data,
					method:'post',
					success: function(res){
						console.log("res======",res);
						
						that.pinke_xiangqin = res.data.data;
						that.pintuan_xinxi = res.data.data.ladder_detail;
						console.log('that.pinke_course_list',that.pinke_xiangqin);
						console.log('that.pinke_course_list',that.pintuan_xinxi);
						
						that.current_key = res.data.data.option_key;
						that.current_value = res.data.data.option_value;
						
						
						console.log('当前的key=====>>>>>',that.current_key);
						console.log('当前的value=====>>>>>',that.current_value);
						
						
						// that.order_option_key_and_value_str = {
						// 	key:that.pinke_xiangqin.option_key,
						// 	value:that.pinke_xiangqin.option_value

						// }
						
					}
				})
				
				
			},
			goto_course_pay:function(){
				var that = this;
				if(that.pinke_xiangqin.purchase_restrictions ==1){
					uni.showModal({
						title: '此课程已售罄'
					});
					return
				}
				// uni.navigateTo({
				// 	url:"/pages/course/user_list"
				// })
				
				console.log('当前的key=====>>>>>',that.current_key);
				console.log('当前的value=====>>>>>',that.current_value);
				
				var order_option_key_and_value = [];
				
				order_option_key_and_value.push({
					'key':'that.current_key',
					'value':that.current_value
				}
				)
				
				
				var order_option_key_and_value_str = encodeURIComponent(JSON.stringify(order_option_key_and_value));
				console.log('进行编码后的数据为:',order_option_key_and_value_str);
				
				
				
				//var my_url = '/pages/order/pay';
				var my_url = '/pages/order/pay?action=direct_buy&productid=';
				my_url += that.current_productid+'&amount=1&all_price='+that.pinke_xiangqin.price;
				//url += '&buyer_memo=购买在线课程&extraData='+tiaozhuan_extraData;
				my_url += '&product_name='+that.pinke_xiangqin.name;
				my_url += '&product_picture='+that.pinke_xiangqin.product_picture;
				my_url += '&order_option_key_and_value_str='+order_option_key_and_value_str;
				this.abotapi.call_h5browser_or_other_goto_url(my_url);
			},
			  onShareAppMessage: function () {
			    return {
			      title: '分享',
			      path: '/',
			      imageUrl: 'https://example.com/share-image.jpg'
			    }
			  },
				onShareTimeline() {
					return {
						title: '分享',
						imageUrl: '/image/share.jpg'
					}
				}
		}
	
	}	
</script>

<style>
	.letterpress_theme{
		color: #333333;
		font-weight: bolder; 
		font-size: 45rpx; 
		overflow: hidden; 
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 10rpx;
	}
	.background_color{
		/* background-color: #FFF2E2; */
		padding: 20rpx;
		margin-top: -10rpx;
	}
	.price_detail{
		display: flex;
		justify-content: center;
		color: #666666;
	}
	.bottom_guding{
		position: fixed;
		bottom: var(--window-bottom);
		width: 100%;
		/* height: 200rpx; */
		margin-top: 20rpx;
		background-color: #30c478;
		padding-bottom: 20rpx;
		border-top: 1px solid #a6a6a6;
		box-shadow: -6px 0px 6px 0px #ccc;
	}
	.liji_pinke{
		height: 72rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 36rpx;
		color: #FFFFFF;
	}
	.content_pinglun_head{
		background-color: #ffffff;
		padding: 20rpx 0;
		margin: 20rpx 20rpx;
		border-radius: 20rpx;
	}
	
	.content_pinglun_head image {
		width: 80rpx;
		height: 80rpx;
		position: relative;
		margin-left: 10rpx;
	}
	
	.content_pinglun_date {
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 30rpx;
		padding-right: 20rpx;
		background-color:#edebeb;
		border-radius: 13px;
	}
	
</style>

<style lang="scss">
	.u-skeleton-slot {
		@include flex;
		align-items: flex-start;

		&__image {
			width: 40px;
			height: 40px;
			border-radius: 100px;
		}

		&__content {
			margin-left: 10px;
			flex: 1;
		}
	}
</style>