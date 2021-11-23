<template>
    <view class="first face">
		<span class="pip"></span>
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
	/* 第一面布局方式：元素水平居中且垂直居中 */
	.first {
	  justify-content: center;
	  align-items: center;
	}
</style>
