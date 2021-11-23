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
