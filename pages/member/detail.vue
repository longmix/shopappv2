<template>
	<view>
		<section class="aui-flexView">
			<!-- #ifdef H5 -->
		        <header class="aui-navBar aui-navBar-fixed b-line">
		            <a href="javascript:;" class="aui-navBar-item">
		                <i class="icon icon-return"></i>
		            </a>
		            <div class="aui-center">
		                <span class="aui-center-title">贷款详情</span>
		            </div>
		            <a href="javascript:;" class="aui-navBar-item">
		                <i class="icon icon-sys"></i>
		            </a>
		        </header>
				<!-- #endif -->
		        <section class="aui-scrollView">
		            <div class="aui-flex b-line">
		                <div class="aui-flex-user">
		                    <image src="../../static/img/VIP.png"></image>
		                </div>
		                <div class="aui-flex-box">
		                    <h2>张阿三</h2>
		                    <p>13312341234</p>
		                </div>
		            </div>
		           <!-- <div class="aui-palace">
		                <a href="javascript:;" class="aui-palace-grid">
		                    <div class="aui-palace-grid-text">
		                        <h2>申请人数</h2>
		                        <p>34893493</p>
		                    </div>
		                </a>
		                <a href="javascript:;" class="aui-palace-grid">
		                    <div class="aui-palace-grid-text">
		                        <h2>最快放款时间</h2>
		                        <p>10分钟</p>
		                    </div>
		                </a>
		                <a href="javascript:;" class="aui-palace-grid">
		                    <div class="aui-palace-grid-text">
		                        <h2>贷款成功率</h2>
		                        <p>98%</p>
		                    </div>
		                </a>
		            </div> -->
		            <div class="aui-det-list">
		                <a href="javascript:;" class="aui-flex b-line">
		                    <div class="aui-flex-box">
		                        <h2>详细地址</h2>
		                    </div>
		                    <div class="aui-arrow">
		                        <p>上海市 浦东新区 xxxx</p>
		                    </div>
		                </a>
		                <a href="javascript:;" class="aui-flex b-line">
		                    <div class="aui-flex-box">
		                        <h2>类型</h2>
		                    </div>
		                    <div class="aui-arrow">
		                        <p>精神</p>
		                    </div>
		                </a>
		                <a href="javascript:;" class="aui-flex b-line">
		                    <div class="aui-flex-box">
		                        <h2>性别</h2>
		                    </div>
		                    <div class="aui-arrow">
		                        <p>男</p>
		                    </div>
		                </a>
		                
		            </div>
					
					<view style="text-align: center;">
						<view class="aui-footer aui-footer-fixed">
						    <view class="aui-tabBar-item ">
						        打卡
						    </view>
						</view>
						<view class="aui-footer aui-footer-fixed">
						    <view class="aui-tabBar-item ">
						        打卡记录
						    </view>
						</view>
					</view>
					
		
		        </section>
		        
		    </section>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				citizen_userid:'',
				citizen_detail_url:'http://192.168.0.205/yanyubao_web/yidaozhucan_server/index.php/openapi/UserApi/get_member_detail',
			}
		},
		
		onLoad(options) {
			if(options.userid){
				this.citizen_userid = options.userid;
			}
			
			
			this.get_citizen_detail();
			
		},
		onReady(){
			
		},
		onShow(){
			
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			
		},
		
		onPageScroll(e){
			
		},
		methods: {
			get_citizen_detail:function(){
				
				var that = this;
				
				this.abotapi.abotRequest({
					url: this.citizen_detail_url,
					data: {
						sellerid: that.abotapi.globalData.default_sellerid,
						checkstr: 123456,
						citizen_userid: this.citizen_userid,
					},
					success: function (res) {
						
						if(res.data.code == 1){
							that.citizen_list = res.data.data;
						}else{
							uni.showToast({
								title:'获取失败'
							})
						}
						
						//console.log('wode res',res);
					},
					fail:function(){
						uni.showToast({
							title:'网络错误'
						})
					},
				})
				
			},
		}
	} 
</script>

<style>
	
	html,
	body {
	    color: #333;
	    margin: 0;
	    height: 100%;
	    font-family: "Myriad Set Pro", "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;
	    -webkit-font-smoothing: antialiased;
	    -moz-osx-font-smoothing: grayscale;
	    font-weight: normal;
	}
	
	* {
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	}
	
	a {
	    text-decoration: none;
	    color: #000;
	}
	
	a,
	label,
	button,
	input,
	select {
	    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
	
	image {
	    border: 0;
	}
	
	body {
	    background: #fff;
	    color: #666;
	}
	
	html,
	body,
	div,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	button,
	fieldset,
	form,
	input,
	legend,
	textarea,
	th,
	td {
	    margin: 0;
	    padding: 0;
	}
	
	a {
	    text-decoration: none;
	    color: #08acee;
	}
	
	button {
	    outline: 0;
	}
	
	image {
	    border: 0;
	}
	
	button,
	input,
	optgroup,
	select,
	textarea {
	    margin: 0;
	    font: inherit;
	    color: inherit;
	    outline: none;
	}
	
	li {
	    list-style: none;
	}
	
	a {
	    color: #666;
	}
	
	.clearfix::after {
	    clear: both;
	    content: ".";
	    display: block;
	    height: 0;
	    visibility: hidden;
	}
	
	.clearfix {}
	
	.divHeight {
	    width: 100%;
	    height: 20rpx;
	    background: #f5f5f5;
	    position: relative;
	    overflow: hidden;
	}
	
	.r-line {
	    position: relative;
	}
	
	.r-line:after {
	    content: '';
	    position: absolute;
	    z-index: 0;
	    top: 0;
	    right: 0;
	    height: 100%;
	    border-right: 1rpx solid #D9D9D9;
	    -webkit-transform: scaleX(0.5);
	    transform: scaleX(0.5);
	    -webkit-transform-origin: 100% 0;
	    transform-origin: 100% 0;
	}
	
	.b-line {
	    position: relative;
	}
	
	.b-line:after {
	    content: '';
	    position: absolute;
	    z-index: 2;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    height: 2rpx;
	    border-bottom: 1rpx solid #e2e2e2;
	    -webkit-transform: scaleY(0.5);
	    transform: scaleY(0.5);
	    -webkit-transform-origin: 0 100%;
	    transform-origin: 0 100%;
	}
	
	.aui-flex {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	    padding: 30rpx 50rpx;
	    position: relative;
	}
	
	.aui-flex-box {
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    flex: 1;
	    min-width: 0;
	    font-size: 28rpx;
	    color: #333;
	}
	
	.aui-flexView {
	    width: 100%;
	    height: 100%;
	    margin: 0 auto;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-orient: vertical;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: column;
	    -ms-flex-direction: column;
	    flex-direction: column;
	}
	
	.aui-scrollView {
	    width: 100%;
	    height: 100%;
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    overflow-y: auto;
	    overflow-x: hidden;
	    -webkit-overflow-scrolling: touch;
	    position: relative;
	}
	
	.aui-navBar {
	    height: 88rpx;
	    position: relative;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    z-index: 1002;
	    background: #fff;
	}
	
	.aui-navBar-item {
	    height: 88rpx;
	    min-width: 25%;
	    -webkit-box-flex: 0;
	    -webkit-flex: 0 0 25%;
	    -ms-flex: 0 0 25%;
	    flex: 0 0 25%;
	    padding: 0 0.9rem;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    font-size: 0.7rem;
	    white-space: nowrap;
	    overflow: hidden;
	    color: #808080;
	    position: relative;
	}
	
	.aui-navBar-item:first-child {
	    -webkit-box-ordinal-group: 2;
	    -webkit-order: 1;
	    -ms-flex-order: 1;
	    order: 1;
	    margin-right: -25%;
	    font-size: 0.9rem;
	    font-weight: bold;
	}
	
	.aui-navBar-item:last-child {
	    -webkit-box-ordinal-group: 4;
	    -webkit-order: 3;
	    -ms-flex-order: 3;
	    order: 3;
	    -webkit-box-pack: end;
	    -webkit-justify-content: flex-end;
	    -ms-flex-pack: end;
	    justify-content: flex-end;
	}
	
	.aui-center {
	    -webkit-box-ordinal-group: 3;
	    -webkit-order: 2;
	    -ms-flex-order: 2;
	    order: 2;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-pack: center;
	    -webkit-justify-content: center;
	    -ms-flex-pack: center;
	    justify-content: center;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    height: 88rpx;
	    width: 50%;
	    margin-left: 25%;
	}
	
	.aui-center-title {
	    text-align: center;
	    width: 100%;
	    white-space: nowrap;
	    overflow: hidden;
	    display: block;
	    text-overflow: ellipsis;
	    font-size: 0.95rem;
	    color: #000000;
	    font-weight: bold;
	}
	
	.icon {
	    width: 40rpx;
	    height: 40rpx;
	    display: block;
	    border: none;
	    float: left;
	    background-size: 40rpx;
	    background-repeat: no-repeat;
	}
	
	.icon-return {
	    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAABpklEQVRoQ+Xb4U0CQRAF4EcF0oGWoBWAnUgH2oF2AB1ABdqBdiAlaCdmEi65EOGWndmZN8v93+S+e5v78WZ3hit7ZlfmRRbwAsAvgB9tQOzgewDvAO4O0DWAFw2aGSzYTwDzI+AWwKoWzQo+hR2cjwC+atCM4CmsON8AvPYALsGK8wHAPju4FFudrnwgli1dit0BeKpJdljDAHbDMiTsio0Gu2MjwSHYKHAYNgIcivUGh2M9wRRYLzAN1gNMhW0NpsO2BFNiW4FpsS3A1FhrMD3WEpwCawVOg7UAp8JqwdIXf49K8lPNi7qW0VQ6x2s1Fc/yUJSfex8qrDbhErBqSmCZrEWJJ1tauuHbiRejQmu2tDjlpyUjj5ssaC04HdoCnAptBU6DtgSnQFuD6dEtwNToVmBadEswJbo1mA7tAaZCe4Fp0J5gCrQ3OBwdAQ5FR4HD0JHgEHQ02B3NAHZFs4AvQXdx9HCoxEo7si4Ol16Crk6ZaUuPi8+ppLs6ID6VtGqawZrwGP0xKvs3AJ41Ewl28GCTsY5c4en+Go8mzH/XZknYDP4HEKRwPQQQE1MAAAAASUVORK5CYII=');
	}
	
	.aui-flex-user {
	    width: 180rpx;
	    height: 180rpx;
	    margin-right: 0.8rem;
	    margin-top: -30rpx;
	}
	
	.aui-flex-user image {
	    width: 180rpx;
	    height: 180rpx;
	    display: block;
	    border: none;
	}
	
	.aui-flex-box h2 {
	    font-size: 1.35rem;
	    color: #000000;
	}
	
	.aui-flex-box p {
	    color: #757575;
	    margin-bottom: 0.2rem;
	}
	
	.aui-flex-box span {
	    display: block;
	    position: relative;
	    overflow: hidden;
	}
	
	.aui-flex-box span em {
	    color: #767676;
	    font-size: 0.7rem;
	    font-style: normal;
	    border-radius: 4rpx;
	    border: 1px solid #8f8f8f;
	    padding: 0 0.2rem;
	    float: left;
	    margin-bottom: 0.2rem;
	    margin-right: 0.3rem;
	}
	
	.aui-palace {
	    padding: 1rem 0 0 0;
	    position: relative;
	    overflow: hidden;
	}
	
	.aui-palace-grid {
	    position: relative;
	    float: left;
	    padding: 2rpx;
	    width: 33%;
	    box-sizing: border-box;
	    margin-bottom: 30rpx;
	    text-align: center;
	}
	
	.aui-palace-grid:not(:nth-child(3n)):before {
	    content: '';
	    position: absolute;
	    z-index: 0;
	    top: 0;
	    right: 0;
	    height: 100%;
	    border-right: 1rpx solid #D9D9D9;
	    -webkit-transform: scaleX(0.5);
	    transform: scaleX(0.5);
	    -webkit-transform-origin: 100% 0;
	    transform-origin: 100% 0;
	}
	
	.aui-palace-grid-text {
	    display: block;
	    text-align: center;
	    color: #333;
	    font-size: 0.85rem;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	    padding-top: 0.2rem;
	}
	
	.aui-palace-grid-text h2 {
	    font-size: 0.8rem;
	    font-weight: normal;
	    color: #7d7d7d;
	}
	
	.aui-palace-grid-text p {
	    font-size: 0.95rem;
	    font-weight: bold;
	    color: #f11d1c;
	}
	
	.aui-flex-box h2 {
	    font-size: 0.9rem;
	    color: #333333;
	    font-weight: normal;
	}
	
	.aui-flex-box h2 em {
	    font-style: normal;
	    font-size: 0.85rem;
	    color: #666;
	}
	
	.aui-arrow {
	    text-align: right;
	    color: #808080;
	    padding-right: 26rpx;
	    position: relative;
	}
	
	.aui-arrow:after {
	    content: " ";
	    display: inline-block;
	    height: 16rpx;
	    width: 16rpx;
	    border-width: 4rpx 4rpx 0 0;
	    border-color: #c3c3c3;
	    border-style: solid;
	    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
	    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
	    position: relative;
	    top: -4rpx;
	    position: absolute;
	    top: 50%;
	    margin-top: -8rpx;
	    right: 4rpx;
	    border-radius: 2rpx;
	}
	
	.tab-nav {
	    height: 80rpx;
	    line-height: 80rpx;
	    display: block;
	    position: relative;
	    background: #fff;
	    z-index: 1;
	    width: 100%;
	    margin: 0 auto;
	}
	
	.tab-nav-item {
	    height: 80rpx;
	    line-height: 80rpx;
	    position: relative;
	    text-align: center;
	    color: #585858;
	    font-size: 0.9rem;
	    display: block;
	    float: left;
	    width: 50%;
	}
	
	.tab-nav-item.tab-active a {
	    color: #f11d1c;
	    font-size: 0.8rem;
	}
	
	.tab-nav-item a {
	    display: inherit;
	    font-size: 0.8rem;
	    color: #666;
	}
	
	.tab-panel {
	    position: relative;
	    overflow: hidden;
	    background: #f0f0f0;
	    padding-bottom: 4rem;
	}
	
	.tab-panel .tab-panel-item {
	    width: 100%;
	    position: absolute;
	    top: 0;
	    -webkit-transform: translateX(-100%);
	    transform: translateX(-100%);
	}
	
	.tab-panel .tab-panel-item.tab-active~.tab-panel-item {
	    -webkit-transform: translateX(100%);
	    transform: translateX(100%);
	}
	
	.tab-panel .tab-panel-item.tab-active {
	    position: relative;
	    -webkit-transition: -webkit-transform .15s;
	    transition: -webkit-transform .15s;
	    transition: transform .15s;
	    transition: transform .15s, -webkit-transform .15s;
	    -webkit-transform: translateX(0);
	    transform: translateX(0);
	}
	
	.tab-nav-item.tab-active:before {
	    content: '';
	    width: 100%;
	    height: 6rpx;
	    position: absolute;
	    left: 50%;
	    bottom: 0;
	    margin-left: -50%;
	    z-index: 4;
	    background-color: #f11d1c;
	}
	
	.tab-panel-item p {
	    text-align: center;
	    padding: 2rem;
	}
	
	.tab-panel-item .aui-flex {
	    background: #fff;
	    border-radius: 10rpx;
	    margin: 30rpx 30rpx 0 30rpx;
	}
	
	.tab-panel-item .aui-flex h3 {
	    font-size: 0.99rem;
	    color: #333;
	    font-weight: normal;
	    position: relative;
	    margin-bottom: 0.3rem;
	    padding-left: 0.5rem;
	}
	
	.tab-panel-item .aui-flex h3::after {
	    content: '';
	    position: absolute;
	    z-index: 0;
	    bottom: 6rpx;
	    left: 0;
	    width: 6rpx;
	    height: 30rpx;
	    border-radius: 10rpx;
	    background: #f11d1c;
	}
	
	.tab-panel-item .aui-flex h4 {
	    font-size: 0.85rem;
	    color: #666666;
	    font-weight: normal;
	    position: relative;
	}
	
	.aui-footer {
	    width: 90%;
	    margin: 30rpx auto;
		
	    background: #ffffff;
		margin-top: 30rpx;
		
	}
	
	.aui-footer-fixed {
	    
	}
	
	.aui-tabBar-item {
	    color: #fff;
	    background: #f11d1c;
	    height: 3rem;
	    line-height: 3rem;
		border-radius: 10rpx;
	}
</style>
