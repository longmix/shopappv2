<template>
    <view class="fifth face">
        <!--按照列排列两个点-->
        <view class="column">
            <span class="pip"></span>
            <span class="pip"></span>
        </view>
        <!--按照列排列中间一个点-->
        <view class="column fifth-column-center">
            <span class="pip"></span> 
        </view>
        <!--按照列排列另外两个点--> 
        <view class="column">
            <span class="pip"></span>
            <span class="pip"></span>
        </view>
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
	/* 第五面布局方式 */
	.fifth {
	  justify-content: space-between; 
	}
	.fifth .column {
	  display: flex;
	  flex-direction: column;
	  justify-content: space-between; 
	}
	.fifth .column.fifth-column-center{
	  justify-content: center;
	}
</style>
