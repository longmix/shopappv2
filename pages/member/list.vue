<template>
	<view>
		<view class="aui-flexView">
			
			<!-- #ifdef H5AAAA --> 
			<view class="aui-navBar aui-navBar-fixed b-line">
				<a href="javascript:;" class="aui-navBar-item">
					<i class="icon icon-return"></i>
				</a>
				<view class="aui-center">
					<text class="aui-center-title">会员列表</text>
				</view>
				<a href="javascript:;" class="aui-navBar-item">
					<i class="icon icon-sys"></i>
				</a>
			</view>
			<!-- #endif -->
			
		            <view class="aui-scrollView">
						
						<view class="top-input-con">
						
							<view  class="scroll-txt" :style="'border:2rpx solid '+ btn_bg_color + ';'">   
								<input type="text" v-model="search_text" :placeholder="list_search_tips" 
									confirm-type="search" style="background: #e6e6e6;" @confirm="search()"/>
								<icon type="search" size="15" style="margin: 0px 10rpx 0 0;position:absolute;right:30rpx;" @tap="search()"></icon>
								<!-- <text class="scroll-ads">搜索附近商家</text> -->
							</view>
						</view>
						
		                <view class="aui-extreme">
							<!-- 开始 -->
							
							<block v-for="(item,index) in citizen_list" :key="index">
								
								<view class="aui-extreme-item">
									<navigator :url="'detail?userid='+item.userid">
										<view class="aui-flex aui-flex-pic">
											<view class="aui-flex-eme">
												<image :src="item.head_icon"></image>
											</view>
											<view class="aui-flex-box">
												<h2>{{item.name}}</h2>
												<p>{{item.mobile}}</p>
											</view>
											<view class="aui-hot">
												<!-- <image src="https://www.17sucai.com/preview/1268063/2018-12-05/extreme/images/icon-hot.png"></image> -->
											</view>
										</view>
									</navigator>
								    <view class="aui-palace" v-if="item.balance">
										<!-- <navigator :url="'../user/log?userid002='+ item.userid"></navigator> -->
										
										<view href="javascript:;" class="aui-palace-grid">
											<view class="aui-palace-grid-text">
												<h2 class="red">￥{{item.balance}}</h2>
												<p>现金余额(元)</p>
											</view>
										</view>
										
								        <view href="javascript:;" class="aui-palace-grid">
								            <view class="aui-palace-grid-text">
								                <h2>￥{{item.balance_zengsong}}</h2>
								                <p>可用赠款(元)</p>
								            </view>
								        </view>
								        <view href="javascript:;" class="aui-palace-grid">
								            <view class="aui-palace-grid-text">
								                <h2>{{item.score}}</h2>
								                <p>积分账户余额</p>
								            </view>
								        </view>
								    </view>
									 
									<view class="server_btn_list">
									    <view :style="{'backgroundColor':btn_bg_color}" class="server_btn_style" v-for="(btn_item,btn_index) in item.buttons" :key="btn_index">
									       
												<view class="server_btn_font_style" @click="go_to_url" :data-url="btn_item.url">
													<p>{{btn_item.name}}</p>
												</view>
											
									    </view>
									</view>
								</view>
								
								
							</block>
							
							
							<view v-if="is_empty_msg_show == 1" style="text-align: center;margin-top: 100upx;">
								<image style="width: 150upx;" mode="widthFix" src="https://yanyubao.tseo.cn/Tpl/static/images/empty_order2.png"></image>
								<text style="display: block;color: #8a8a8a;">{{empty_list_msg}} /(ㄒoㄒ)/~~</text>
							</view>
							
							
							<!-- 结束 -->
		                </view>
		            </view><!-- aui-scrollView -->
		</view>
	</view>
</template>

<script>
	
	
	
	export default {
		data() {
			return {
				data_url:'https://yanyubao.tseo.cn/index.php/openapi/UserData/my_user_list?list_type=distri_list',
				//data_url:'http://192.168.0.205/yanyubao_web/yidaozhucan_server/index.php/openapi/UserApi/get_member_list', //获取数据的api
				
				data_url_flag:0,//判断options 中 有没有data_url
				
				
				citizen_list :[], //数据
				btn_bg_color:'', //按钮颜色
				
				
				is_empty_msg_show:0,
				is_get_user_list:0,
				page:1,
				
				
				current_params_str:'',
				empty_list_msg:'到底了~',
				 
				search_text:'',
				list_search_tips:'搜索会员手机号',
				
				option_title: null
				
			}
		},
		
		onLoad(options) {
			console.log('options===>',options);
			
			if(options.title){
				//如果带有title参数，则使用
				this.option_title = options.title;
				
				uni.setNavigationBarTitle({
					title: options.title
				})
			}
			else{
				uni.setNavigationBarTitle({
					title:'会员列表'
				})
			}
			
			

			//=== 参数拼接 ====
			this.current_params_str = '';
			
			for(var key in options){
			  this.current_params_str += key+'='+options[key]+'&';
			}			
			if(this.current_params_str != ''){
				this.current_params_str = this.current_params_str.substr(0, this.current_params_str.length-1);
			}
			//======== End ============
			

			//检查用户是否登录
			var userInfo = this.abotapi.get_user_info();
			if (!userInfo) {
				//登录之后跳转的页面
				var last_url = '/pages/member/list';
				
				//如果在TabBar
				if(this.abotapi.globalData.is_member_list_in_tabbar == 1){
					last_url = 'switchTab /pages/member/list';
				}
				
				if(options.length > 0){
					last_url += '?' + this.current_params_str;
				}
				
				
				this.abotapi.goto_user_login(last_url);
						
			  return;
			}		
			
			
			
			
			//如果带了data_url 参数就会覆盖data 的data_url
			if(options.data_url){
				this.data_url = decodeURIComponent( options.data_url);
				
				this.data_url_flag = 1;
			}
			
			
			
			//获取配置项
			this.abotapi.set_option_list_str(this, this.call_back_set_option);
			
			
		},
		onReady(){
			
		},
		onShow(){
			
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			
			this.page = 1;
			this.is_get_user_list = 0;
			this.is_empty_msg_show = 0;
			this.citizen_list = [];
			
			this.get_citizen_list();
			setTimeout(function() {
				console.log('timeout===>>>stopPullDownRefresh===>>>hideToast');
				
				uni.stopPullDownRefresh();
				
				
			}, 2000);
		},
		onReachBottom: function () {
			
			this.page++;
			this.get_citizen_list();
			
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
			this.headerTop = e.scrollTop>=0?null:0;
			this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
		},
		methods: {
			
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
				
				//配置项中的数据源网址
				if(cb_params.member_list_data_url && (that.data_url_flag == 0)){
					that.data_url = cb_params.member_list_data_url;
				}
				
				console.log('cb_params',cb_params);
				
				this.get_citizen_list();
			},
			
			go_to_url:function(e){
				var url = e.currentTarget.dataset.url;
				
				this.abotapi.call_h5browser_or_other_goto_url(url, '', '');
				
			},
			
			get_citizen_list:function(){
				
				if(this.is_get_user_list == 1){
					return;
				}
				
				uni.showLoading({
					title:'数据更新中……'
				})
				
				var that = this;
				
				var userInfo = this.abotapi.get_user_info();
				
				if(!userInfo){
					uni.showToast({
						title:'登录验证失败'
					})
					return;
				}
				
				console.log('======>',this.data_url);
				console.log('======>', that.abotapi.globalData.default_sellerid);
				this.abotapi.abotRequest({
					url: this.data_url,
					data: {
						sellerid: that.abotapi.globalData.default_sellerid,
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
						
						page:that.page,
					},
					success: function (res) {
						
						uni.hideLoading();
										
						//如果没有设定标题，且服务器返回了新标题
						if(!that.option_title && res.data.list_title){
							uni.setNavigationBarTitle({
								title: res.data.list_title
							})
						}
						
						if(res.data.list_search_tips){
							that.list_search_tips = res.data.list_search_tips;
						}
						
						if(res.data.code == 1){
							
							for(var i=0; i<res.data.data.length; i++){
							     that.citizen_list.push(res.data.data[i]);
							}
							
							that.is_get_user_list = 0;
							
						}
						else{
							
							uni.showToast({
								title:'到底了~'
							})
							
							if(that.citizen_list.length == 0){
								that.is_empty_msg_show = 1;
							}
							
							that.is_get_user_list = 1;
							
							that.empty_list_msg = res.data.msg;
						}
						
						//console.log('wode res',res);
					},
					fail:function(){
						uni.hideLoading();
						
						uni.showToast({
							title:'网络错误'
						})
					},
				})
				
			},
			
			//搜索
			search: function (view) {
				
				var that = this;
				var userInfo = this.abotapi.get_user_info();
				
				that.abotapi.abotRequest({
					url: this.data_url,
					method: 'post',
					data: {
						sellerid: that.abotapi.globalData.default_sellerid,
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
						
						keywords: this.search_text,
					},
					success: function (res) {
						
						if(res.data.list_search_tips){
							that.list_search_tips = res.data.list_search_tips;
						}
						
						if(res.data.code == 1){
							
							that.citizen_list = [];
							
							for(var i=0; i<res.data.data.length; i++){
								
							     that.citizen_list.push(res.data.data[i]);
							}
							
						}else{
							
							that.citizen_list = [];
							uni.showToast({
								title:res.data.msg,
							})
							
						}
						
					}
				})
				    
				console.log('search_text',this.search_text);
				
				// var welfareId = view.currentTarget.dataset.value;
				// var url = "/pages/listdetail/listdetail?name=" + welfareId;
				// uni.navigateTo({
				// 	url: url
				// });
			}
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
	    border-right: 2rpx solid #D9D9D9;
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
	    border-bottom: 2rpx solid #e2e2e2;
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
	    padding: 30rpx;
	    position: relative;
		border-bottom: 2rpx dashed #D9D9D9;
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
	    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAADjElEQVRoQ+2by6tPURTHPzck75QY+AMoBiYmoqTklWIiSR4DlEdSDDxCURQDRSETRImiyFtCMmBmYGKkTAxIuFfy7Kt96tftnL337/zO3mef371reM+55+zP+a699tprr18PA8x6Bhgvg8CRFJ8KLAA+AjeBL5HeW4vC24HjwFAD+Q6YD7yNAR3bpfcBh3LAngNzug34MLC3AOoPMBz4FRo6lsLHgJ0WmM/A+NCwen4M4JPAVgfMHuBINwD7wJ4DNgF/mwwszzkLbHBACHZjDNDsHSFcWs88D6xxgJwCtsWEDTGHfWG1Du+KDVs18BDgErDSAVIbbJXAgr0GLHfA7i9IPKKJXcUcVop41QNWLix1a7VOgYcBN4AlDgoFJwWp2q0TYMHeNom/DUTLjpafJKwssPLeWw5YJRJKKJKBLRu0RgB3gLkWyQS7DriYhKwtg2hXYcE+AmY5YFcBV1KDbVfh0cB9B+xvYHWqsO0AjzXKzrSopr3sChO1UxT3/5h8XFqwT4EZDthlJmonC+sDrE35YwfsT5N0aIlK3mwKTwCeANMsFD+ApcDD5EnNAIuABavC2hQH7ELzUZrCmzuHJwLPHLDfgcVNgy2aw/dMkbxItW/m+ovGyGpJPMYBqiDaYOcBr5oIm6fwSKDXAqMjEWVRjYjIeRx5QesuoGBUZMqT1wMXmqhyHvAkk2jYIrROClTKUZWjUWZbllxrcCNSyf5q2BIPnyxLSsu9k9sGFrmdK5f22TQkudEvC6z/89kW6r4dwInUJ7RL4Wz8PlUO3ZtU/cp3WSoSybeOtQU4narSvgpn4/ctyx4FdqcI3S6wGHwL7zp2WQsokidjZYA1eN9zpMvmFDEZ6LLAWR7ucywqpXV0GuXA2+VKnQBn0EkefHeyDrs+mq77tDacATbXrXSnCrd+DFenju5VCqoTidrcu0pgAR0EDjhc4rrZaanaGd2qBhaA+rGkts0eAKpjqzYW1UIAC0B9WZrXNnsJLAI+xSQOBSwGtSwpgtve8QZQjexDLOiQwGLQ+qu12vae18Bs4GsM6NDAYlApSMmHsrMiU/RWGhrcYgALQt09anzJeqT7g/UBY2Lk3bGABajGFzXAaMeVBzwquLyex6VVjkOd7+oN0d661brOpVvh1C4h955s/qgPoK6BKL97iOnSrdAKYNPNjzzeV+lCrmfVBewaV7Drg8DBPm0iD/4HjqKPPVllQ0sAAAAASUVORK5CYII=');
	}
	
	.aui-palace {
	    border-top: 2rpx dashed #D9D9D9;
	    padding: 20rpx 0 0 0;
	    position: relative;
	    overflow: hidden;
	}
	
	.aui-flex-pic:after {
	    content: '';
	    position: absolute;
	    bottom: -20rpx;
	    left: -16rpx;
	    width: 30rpx;
	    height: 30rpx;
	    background: #f0f0f0;
	    border-radius: 100%;
	    z-index: 10;
	}
	
	.aui-flex-pic:before {
	    content: '';
	    position: absolute;
	    bottom: -20rpx;
	    right: -16rpx;
	    width: 30rpx;
	    height: 30rpx;
	    background: #f0f0f0;
	    border-radius: 100%;
	    z-index: 10;
	}
	
	.aui-palace-grid {
	    position: relative;
	    float: left;
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
	    border-right: 2rpx solid #D9D9D9;
	    -webkit-transform: scaleX(0.5);
	    transform: scaleX(0.5);
	    -webkit-transform-origin: 100% 0;
	    transform-origin: 100% 0;
	}
	
	.aui-palace-grid-icon {
	    width: 60rpx;
	    height: 60rpx;
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
	    font-size: 35rpx;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	    padding-top: 20rpx;
	}
	
	.aui-palace-grid-text h2 {
	    font-size: 40rpx;
	    margin-bottom: 20rpx;
	    color: #333333;
	}
	
	.aui-palace-grid-text .red {
	    color: #f11d1c;
	}
	
	.aui-palace-grid-text p {
	    font-size: 30rpx;
	    color: #999;
	}
	
	.aui-extreme {
	    padding: 20rpx 30rpx 0 30rpx;
	}
	
	.aui-extreme-item {
	    display: block;
	    background: #fff;
	    border-radius: 10rpx;
	    margin-bottom: 30rpx;
		padding: 10rpx;
	}
	
	.aui-flex-eme {
	    width: 100rpx;
	    height: 100rpx;
	    margin-right: 40rpx;
	}
	
	.aui-flex-eme image {
	    width: 100rpx;
	    height: 100rpx;
	    display: block;
	    border: none;
	}
	
	.aui-hot {
	    position: absolute;
	    right: 0;
	    top: 0;
	    width: 70rpx;
	    height: 70rpx;
	    border-radius: 0 10rpx 0 0;
	    overflow: hidden;
	}
	
	.aui-hot image {
	    width: 70rpx;
	    height: 70rpx;
	    display: block;
	    border: none;
	}
	
	.aui-flex-box h2 {
	    font-size: 40rpx;
	    margin-bottom: 8rpx;
	}
	
	.aui-flex-box p {
	    color: #999999;
	    font-size: 35rpx;
	}
	
	.aui-extreme-item .aui-flex {
	    padding: 20rpx 30rpx;
	}
	.server_btn_list{
		color:#fff;
		text-align: center;
		overflow: hidden;
		margin: 0rpx 30rpx 20rpx 30rpx;
	}
	.server_btn_style{
		
		margin-right: 1%;
		border-radius: 6rpx;
		background:#EC652F;
		float: left;
		height: 70rpx;
		line-height: 60rpx;
		padding: 5rpx 20rpx;
	}
	//搜索样式
	.top-input-con {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 20rpx;
		background: #fff;
		z-index: 2;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.scroll-txt {
		text-align: center;
		margin: 10rpx 0rpx;
		border: 20rpx red;
		padding: 12rpx 0 12rpx 0;
		color: #333;
		background: #e6e6e6;
		justify-content: center;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		height: 80rpx;
		width: 100%;
	
	}
	
</style>
