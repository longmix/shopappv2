<!-- 客户列表 -->
<template>
	<view>
		<view class="" style="display: flex;">
			<button class="u_button">客户状态</button>

			<u-search placeholder="关键字" :show-action="false" style="width: 160rpx;"></u-search>

			<button class="u_button">业务员</button>
		</view>
		
		
		
		<view>
			<view class="u-skeleton-slot__content"	>
				<view v-for="(list, index) in list" :key="index">
					<view class="u-demo-block__content"	style="height: 190rpx;width: 630rpx;background-color: #ffffff;border-radius: 20rpx;margin: 0 auto;margin-top: 20rpx;padding: 20rpx 40rpx;">
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
													
													<u--text
														type="main"
														size="14"
														customStyle="margin-top: 5px"
														:text="list.lianxiren"
													></u--text>
													<u--text
														type="main"
														size="14"
														customStyle="margin-top: 5px"
														:text="list.phone"
													></u--text>
												</view>
											</view>
										</view>
										<view class=""	style="display:flex;justify-content: flex-end;">
											<u-tag text="打电话" default	style="color:#e6e6e6;"></u-tag>
											<u-tag text="更多..." default style="margin-left:10rpx;"></u-tag>
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
						name:'张三',
						lianxiren:'联系人：张三',
						phone:'座机：13112341234'
					}
				]

			}
		},
		methods: {

		}
	}
</script>

<style>
	page{
		background-color: #E6E6E6;
	}
	.u_button {
		margin-left: 10rpx;
		width: 160rpx;
		height: 64rpx;
		font-size: 24rpx;
		background-color: #f2f2f2;
	}
</style>