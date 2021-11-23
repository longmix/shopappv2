<template>
    <view class="sixth face">
        <!--按照列排列三个点-->
        <view class="column">
            <span class="pip"></span>
            <span class="pip"></span>
            <span class="pip"></span>
        </view> 
         <!--按照列排列另外三个点-->
        <view class="column">
            <span class="pip"></span>
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
	  margin: 5px;
	  padding: 4px;
	  background-color:#ffffff;
	  width: 108px;
	  height: 108px;
	  object-fit: contain;
	  border-radius:10%;
	  box-shadow: inset 0 5px white,
	              inset 0 -5px #bbb,
	              inset 5px 0 #d7d7d7,
	              inset -5px 0 #d7d7d7;
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
	/* 第六面布局方式 */
	.sixth { 
	  justify-content:space-between;
	}
	.sixth .column {
	  display: flex;
	  flex-direction:column;
	  justify-content:space-between;
	}
</style>
