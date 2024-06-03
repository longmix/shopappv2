<!-- 工单设置列表（四个工单类型）(这个功能在pc端后台，小程序界面可能用不到了) -->
<template>
	<view>
		<view>
			<view class="u-skeleton-slot__content"	>
				<view v-for="(list, index) in list" :key="index">
					<view class="u-demo-block__content"	style="height: 130rpx;width: 630rpx;background-color: #ffffff;border-radius: 20rpx;margin: 0 auto;margin-top: 20rpx;padding: 20rpx 40rpx;">
									<u-skeleton
										rows="2"
										title
										:loading="switch01"
										avatar
										rowsHeight="14"
									>
										<!-- 需要在外部多嵌套一层占位view，否则在nvue下会导致样式失效 -->
										<view>
											<view class="u-skeleton-slot">
												<view class="u-skeleton-slot__content">
													<view class=""	style="display: flex;">
														<u--text
															:text="list.name"
															type="main"
															:bold="true"
															size="16"
														></u--text>
													</view>
												</view>
											</view>
										</view>
										<view class=""	style="display:flex;justify-content: flex-end;margin-top: 50rpx;margin-left: 130rpx;">
											<u-button	class="button_style"  text="编辑" 	size="mini" :hairline="false"></u-button>
											<u-button	class="button_style" text="分享" 	size="mini" :hairline="false"></u-button>
											<u-button	class="button_style" text="二维码" 	size="mini" :hairline="false"></u-button>
											<u-button	class="button_style" text="更多..." 	size="mini" :hairline="false"></u-button>
										</view>
									</u-skeleton>
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
				switch01:false,
				list:[
					{
						name:'抵押'
					},
					{
						name:'过户'
					},
					{
						name:'解押'
					},
					{
						name:'新车上牌+抵押'
					}
				]
				
			}
		},
		onLoad (options) {
			
			this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
			
		},
		methods: {
			callback_function_shop_option_data: (that, option_list_data) => {
				console.log('option_list_data ===>>> ', option_list_data);
			},
		}
	}
</script>

<style>
	page{
		background-color: #E6E6E6;
	}
	
	.button_style{
		margin-left: 10rpx;
		background-color: #E6E6E6;
		color: #000000;
	}

</style>
