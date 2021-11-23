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
