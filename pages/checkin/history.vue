<template>
	<view>
		<view class="aui-flexView">
			<!-- #ifdef H5 --> 
			<view class="aui-navBar aui-navBar-fixed b-line">
				<a href="javascript:;" class="aui-navBar-item">
					<i class="icon icon-return"></i>
				</a>
				<view class="aui-center">
					<text class="aui-center-title">打卡</text>
				</view>
				<a href="javascript:;" class="aui-navBar-item">
					<i class="icon icon-sys"></i>
				</a>
			</view>
			<!-- #endif -->
			<view>
				<map  style="width: 100%; height: 300px;" :longitude="longitude" :latitude="latitude" :markers="covers"></map>
				
			</view>
		</view>
	</view>
</template>

<script>
	
	import locationapi from '../../common/locationapi.js'
	
	export default {
		data() {
			return {
				longitude:'',
				latitude:'',
				covers: [ {
				                latitude: '',
				                longitude: '',
				                iconPath: '../../static/img/addricon.png',
								width:'50rpx',
								height:'60rpx',
				            }]
			}
		},
		
		onLoad(options) {
			var that = this
			uni.getLocation({
			    type: 'gcj02',
			    success: function (res) {
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
					that.longitude = res.longitude;
					that.latitude = res.latitude;
					that.covers[0].longitude = res.longitude;
					that.covers[0].latitude = res.latitude;
			    }
			});
			
			
			locationapi.get_location_remove();
			
			locationapi.get_location(this,this.get_locations);
		},
		onReady(){
			
		},
		onShow(){
			
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			
		},
		
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
			this.headerTop = e.scrollTop>=0?null:0;
			this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
		},
		methods: {
			get_locations:function(that,locationData){
				console.log('locationData=====>',locationData);
				that.longitude = locationData.longitude;
				that.latitude = locationData.latitude;
				that.covers[0].longitude = locationData.longitude;
				that.covers[0].latitude = locationData.latitude;
			},
			call_back_set_option:function(that, cb_params){
				
				//状态未固定或者不固定时候的导航条样式
				console.log('====>',that.abotapi.globalData.navigationBarBackgroundColor_fixed);
				if(that.abotapi.globalData.navigationBarBackgroundColor_fixed == 1){
					uni.setNavigationBarColor({
						backgroundColor:that.abotapi.globalData.navigationBar_bg_color,
						frontColor:that.abotapi.globalData.navigationBar_font_color,
					})
					
					that.btn_bg_color = that.abotapi.globalData.navigationBar_bg_color;
					
				}else{
					uni.setNavigationBarColor({
						backgroundColor:cb_params.wxa_shop_nav_bg_color,
						frontColor:cb_params.wxa_shop_nav_font_color,
					})
					
					that.btn_bg_color = cb_params.wxa_shop_nav_bg_color;
				}
				
				
				
				console.log('cb_params',cb_params);
			},
			
			
			get_citizen_list:function(){
				
				var that = this;
				
				this.abotapi.abotRequest({
					url: this.citizen_list_url,
					data: {
						sellerid: that.abotapi.globalData.default_sellerid,
						checkstr: 123456,
						userid: 123456,
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
	html,body {
	    color: #333;
	    margin: 0;
	    height: 100%;
	    font-family: "Myriad Set Pro","Helvetica Neue",Helvetica,Arial,Verdana,sans-serif;
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
	
	a, label, button, input, select {
	    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
	
	img {
	    border: 0;
	}
	
	body {
	    background: #f0f0f0;
	    color: #666;
	}
	
	html, body, div, dl, dt, dd, ol, ul, li, h1, h2, h3, h4, h5, h6, p, blockquote, pre, button, fieldset, form, input, legend, textarea, th, td {
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
	
	img {
	    border: 0;
	}
	
	button,input,optgroup,select,textarea {
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
	
	.clearfix {
	}
	
	.divHeight {
	    width: 100%;
	    height: 10px;
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
	    border-right: 1px solid #D9D9D9;
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
	    height: 1px;
	    border-bottom: 1px solid #e2e2e2;
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
	    padding: 15px;
	    position: relative;
		border-bottom: 1px dashed #D9D9D9;
	}
	
	.aui-flex-box {
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    flex: 1;
	    min-width: 0;
	    font-size: 14px;
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
	    height: 44px;
	    position: relative;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    z-index: 1002;
	    background: #fff;
	}
	
	.aui-navBar-item {
	    height: 44px;
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
	    height: 44px;
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
	    width: 20px;
	    height: 20px;
	    display: block;
	    border: none;
	    float: left;
	    background-size: 20px;
	    background-repeat: no-repeat;
	}
	
	.icon-return {
	    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAADjElEQVRoQ+2by6tPURTHPzck75QY+AMoBiYmoqTklWIiSR4DlEdSDDxCURQDRSETRImiyFtCMmBmYGKkTAxIuFfy7Kt96tftnL337/zO3mef371reM+55+zP+a699tprr18PA8x6Bhgvg8CRFJ8KLAA+AjeBL5HeW4vC24HjwFAD+Q6YD7yNAR3bpfcBh3LAngNzug34MLC3AOoPMBz4FRo6lsLHgJ0WmM/A+NCwen4M4JPAVgfMHuBINwD7wJ4DNgF/mwwszzkLbHBACHZjDNDsHSFcWs88D6xxgJwCtsWEDTGHfWG1Du+KDVs18BDgErDSAVIbbJXAgr0GLHfA7i9IPKKJXcUcVop41QNWLix1a7VOgYcBN4AlDgoFJwWp2q0TYMHeNom/DUTLjpafJKwssPLeWw5YJRJKKJKBLRu0RgB3gLkWyQS7DriYhKwtg2hXYcE+AmY5YFcBV1KDbVfh0cB9B+xvYHWqsO0AjzXKzrSopr3sChO1UxT3/5h8XFqwT4EZDthlJmonC+sDrE35YwfsT5N0aIlK3mwKTwCeANMsFD+ApcDD5EnNAIuABavC2hQH7ELzUZrCmzuHJwLPHLDfgcVNgy2aw/dMkbxItW/m+ovGyGpJPMYBqiDaYOcBr5oIm6fwSKDXAqMjEWVRjYjIeRx5QesuoGBUZMqT1wMXmqhyHvAkk2jYIrROClTKUZWjUWZbllxrcCNSyf5q2BIPnyxLSsu9k9sGFrmdK5f22TQkudEvC6z/89kW6r4dwInUJ7RL4Wz8PlUO3ZtU/cp3WSoSybeOtQU4narSvgpn4/ctyx4FdqcI3S6wGHwL7zp2WQsokidjZYA1eN9zpMvmFDEZ6LLAWR7ucywqpXV0GuXA2+VKnQBn0EkefHeyDrs+mq77tDacATbXrXSnCrd+DFenju5VCqoTidrcu0pgAR0EDjhc4rrZaanaGd2qBhaA+rGkts0eAKpjqzYW1UIAC0B9WZrXNnsJLAI+xSQOBSwGtSwpgtve8QZQjexDLOiQwGLQ+qu12vae18Bs4GsM6NDAYlApSMmHsrMiU/RWGhrcYgALQt09anzJeqT7g/UBY2Lk3bGABajGFzXAaMeVBzwquLyex6VVjkOd7+oN0d661brOpVvh1C4h955s/qgPoK6BKL97iOnSrdAKYNPNjzzeV+lCrmfVBewaV7Drg8DBPm0iD/4HjqKPPVllQ0sAAAAASUVORK5CYII=');
	}
	
	.aui-palace {
	    border-top: 1px dashed #D9D9D9;
	    padding: 0.5rem 0 0 0;
	    position: relative;
	    overflow: hidden;
	}
	
	.aui-flex-pic:after {
	    content: '';
	    position: absolute;
	    bottom: -10px;
	    left: -8px;
	    width: 15px;
	    height: 15px;
	    background: #f0f0f0;
	    border-radius: 100%;
	    z-index: 10;
	}
	
	.aui-flex-pic:before {
	    content: '';
	    position: absolute;
	    bottom: -10px;
	    right: -8px;
	    width: 15px;
	    height: 15px;
	    background: #f0f0f0;
	    border-radius: 100%;
	    z-index: 10;
	}
	
	.aui-palace-grid {
	    position: relative;
	    float: left;
	    width: 33%;
	    box-sizing: border-box;
	    margin-bottom: 15px;
	    text-align: center;
	}
	
	.aui-palace-grid:not(:nth-child(3n)):before {
	    content: '';
	    position: absolute;
	    z-index: 0;
	    top: 0;
	    right: 0;
	    height: 100%;
	    border-right: 1px solid #D9D9D9;
	    -webkit-transform: scaleX(0.5);
	    transform: scaleX(0.5);
	    -webkit-transform-origin: 100% 0;
	    transform-origin: 100% 0;
	}
	
	.aui-palace-grid-icon {
	    width: 30px;
	    height: 30px;
	    margin: 0 auto;
	}
	
	.aui-palace-grid-icon img {
	    display: block;
	    width: 100%;
	    height: 100%;
	    border: none;
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
	    font-size: 0.95rem;
	    margin-bottom: 0.2rem;
	    color: #333333;
	}
	
	.aui-palace-grid-text .red {
	    color: #f11d1c;
	}
	
	.aui-palace-grid-text p {
	    font-size: 0.85rem;
	    color: #999;
	}
	
	.aui-extreme {
	    padding: 10px 15px 0 15px;
	}
	
	.aui-extreme-item {
	    display: block;
	    background: #fff;
	    border-radius: 5px;
	    margin-bottom: 15px;
		padding: 10rpx;
	}
	
	.aui-flex-eme {
	    width: 50px;
	    height: 50px;
	    margin-right: 0.8rem;
	}
	
	.aui-flex-eme image {
	    width: 50px;
	    height: 50px;
	    display: block;
	    border: none;
	}
	
	.aui-hot {
	    position: absolute;
	    right: 0;
	    top: 0;
	    width: 35px;
	    height: 35px;
	    border-radius: 0 5px 0 0;
	    overflow: hidden;
	}
	
	.aui-hot image {
	    width: 35px;
	    height: 35px;
	    display: block;
	    border: none;
	}
	
	.aui-flex-box h2 {
	    font-size: 1rem;
	    margin-bottom: 0.2rem;
	}
	
	.aui-flex-box p {
	    color: #999999;
	    font-size: 0.85rem;
	}
	
	.aui-extreme-item .aui-flex {
	    padding: 10px 15px;
	}
	.server_btn_list{
		color:#fff;
		text-align: center;
		overflow: hidden;
		margin-top: 30rpx;
	}
	.server_btn_style{
		
		width:23%;
		margin-right: 1%;
		border-radius: 6rpx;
		background:#EC652F;
		float: left;
		height: 60rpx;
		line-height: 60rpx;
	}
	
</style>
