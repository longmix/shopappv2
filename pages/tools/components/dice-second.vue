<template>
    <view class="second face">
        <span class="pip"></span>
        <span class="pip"></span>
    </view>
</template>
<script>
</script>

<style>
	/* 骰子容器公用样式 */
	.face {
	  display: flex;
	  margin: 10rpx;
	  padding: 8rpx;
	  background-color:#ffffff;
	  width: 216rpx;
	  height: 216rpx;
	  object-fit: contain;
	  border-radius:10%;
	  box-shadow: inset 0 10rpx white,
	              inset 0 -10rpx #bbb,
	              inset 10rpx 0 #d7d7d7,
	              inset -10rpx 0 #d7d7d7;
	}
	
	
	/* 筛子中的点的样式 */
	.pip {
	  display: block;
	  width: 24px;
	  height: 24px;
	  border-radius: 50%;
	  margin:4px;
	  background-color: #333;
	  box-shadow: inset 0 3px #111,
	              inset 0 -3px #555;
	}
	/* 第二面布局方式 */
	.second {
	  justify-content: space-between;
	}
	/* 右对齐 */
	.second .pip:last-child {
	  align-self: flex-end;
	}
</style>
