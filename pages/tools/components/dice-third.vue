<template>
    <view class="third face">
        <span class="pip"></span>
        <span class="pip third-item-center"></span>
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
	  width: 48rpx;
	  height: 48rpx;
	  border-radius: 50%;
	  margin:8rpx;
	  background-color: #333;
	  box-shadow: inset 0 6rpx #111,
	              inset 0 -6rpx #555;
	}
	/* 第三面布局方式 */
	.third {
	  justify-content: space-between;
	}
	.third .pip.third-item-center {
	  align-self: center; 
	}
	.third .pip:last-child {
	  align-self: flex-end;
	}
</style>
