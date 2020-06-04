<script>
	
	import abot_data from 'abot_data.js';
	export default {
		
		
		onLaunch: function () {
			console.log('App Launch')

			console.log('aa===>>>', abot_data);
			
			this.abotapi.globalData = abot_data.globalData;
			
			uni.setNavigationBarTitle({
				title:this.abotapi.globalData.default_shopname
			})
			
			
// #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
			
			
			let extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {};
			
			
			console.log('获取对象extConfig===>>>>', extConfig);
			
			if(extConfig.xiaochengxu_appid){
				this.abotapi.globalData.xiaochengxu_appid = extConfig.xiaochengxu_appid;
			}
		
			//强制设置当前的appid
			
			// const accountInfo = uni.getAccountInfoSync();
			
			// if (accountInfo && accountInfo.miniProgram && accountInfo.miniProgram.appId) {
			//   this.abotapi.globalData.xiaochengxu_appid = accountInfo.miniProgram.appId;
			// }
			
			console.log('当前小程序为：' + this.abotapi.globalData.xiaochengxu_appid);
		
		
			this.abotapi.globalData.force_sellerid = 0;
		
			if (extConfig.force_sellerid_flag == 1) {
			  this.abotapi.globalData.force_sellerid = 1;
			  this.abotapi.globalData.default_sellerid = extConfig.force_sellerid_value;
			}
		
			if (extConfig.shop_name){
			  console.log("444444", extConfig.shop_name)
			  this.abotapi.globalData.shop_name = extConfig.shop_name;
		
			  uni.setNavigationBarTitle({
				title: this.abotapi.globalData.shop_name
			  })
		
			}
			if (extConfig.version_number) {
			  this.abotapi.globalData.version_number = extConfig.version_number;
			}
		
		
			if (extConfig.navigationBarBackgroundColor_fixed != 'undefined') {
			  this.abotapi.globalData.navigationBarBackgroundColor_fixed = extConfig.navigationBarBackgroundColor_fixed;
			}
		
		
			
		
			if (extConfig.kefu_telephone) {
			  this.abotapi.globalData.kefu_telephone = extConfig.kefu_telephone;
			}
			if (extConfig.kefu_qq) {
			  this.abotapi.globalData.kefu_qq = extConfig.kefu_qq;
			}
			if (extConfig.kefu_qq) {
			  this.abotapi.globalData.kefu_qq = extConfig.kefu_qq;
			}
			if (extConfig.kefu_website) {
			  this.abotapi.globalData.kefu_website = extConfig.kefu_website;
			}
			if (extConfig.kefu_gongzhonghao) {
			  this.abotapi.globalData.kefu_gongzhonghao = extConfig.kefu_gongzhonghao;
			}
			
			
			if (extConfig.default_copyright_text) {
			  this.abotapi.globalData.default_copyright_text = extConfig.default_copyright_text;
			}
			
			if (extConfig.is_shop_cart_in_tabbar) {
			  this.abotapi.globalData.is_shop_cart_in_tabbar = extConfig.is_shop_cart_in_tabbar;
			}
			if (extConfig.is_publish_index_in_tabbar) {
			  this.abotapi.globalData.is_publish_index_in_tabbar = extConfig.is_publish_index_in_tabbar;
			}
			if (extConfig.is_publish_list_in_tabbar) {
			  this.abotapi.globalData.is_publish_list_in_tabbar = extConfig.is_publish_list_in_tabbar;
			}
			
			
		
			//以下是更多扩展使用
			if (extConfig.is_ziliaoku_app) {
			  this.abotapi.globalData.is_ziliaoku_app = extConfig.is_ziliaoku_app;
			}
			if (extConfig.is_o2o_app) {
			  this.abotapi.globalData.is_o2o_app = extConfig.is_o2o_app;
			}
			
// #endif
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		},
	
		
		globalData:{
			/* weiduke_server_url: 'https://cms.weiduke.com/',
			yanyubao_server_url: 'https://yanyubao.tseo.cn/',
			xiaochengxu_appid: 'wx60a801e5fb7f9378',
			// default_sellerid : 'pmyxQxkkU',
			default_sellerid : 'fyJSPaVja', */
			userInfo: {},
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "/static/iconfont/font.scss";
	/*覆盖文本编辑器里面的图片的大小*/
	uni-rich-text img{ max-width: 100% !important;}
</style>
<style>
	/*  #ifndef APP-PLUS-NVUE  */
	
	*{
		font-size: 30upx;
	}
	
	page{
		background: #FFFFFF;
		font-family: '微软雅黑';
	}
	
	.container {
	  height: 100%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: space-between;
	  padding: 200upx 0;
	  box-sizing: border-box;
	  font-family: '微软雅黑'
	}
	.df{
	  display: -webkit-box;
	  display: -webkit-flex;
	  display: -ms-flexbox;
	  display: flex;
	}
	.df_1{
	  -webkit-box-flex: 1;
	  -webkit-flex: 1;
	  -ms-flex: 1;
	  flex: 1;
	  -webkit-tap-highlight-color: transparent;
	}
	.df_2{
	  -webkit-box-flex: 2;
	  -webkit-flex: 2;
	  -ms-flex: 2;
	  flex: 2;
	  -webkit-tap-highlight-color: transparent;
	}
	.bg{ background: #fff;}
	.bg_white{ background: #fff;}
	.bg_hui{ background: #eee;}
	.bg_red{ background: #dd2727;}
	.bg_green{ background: #02bf02;}
	.bg_cheng{ background: #f85;}
	
	.clear{  clear: both;}
	.ovh1{
	  width:100%;
	  overflow:hidden;
	  text-overflow:ellipsis;
	  display:-webkit-box;
	  -webkit-line-clamp:1;
	  -webkit-box-orient:vertical;
	  }
	.red{ color: #dd2727;}
	.c3{  color: #333;}
	.c6{  color: #666;}
	.c9{  color: #999;}
	.white{  color: #fff;}
	.font_16{  font-size: 32upx;}
	.font_14{  font-size: 28upx;}
	.font_12{  font-size: 24upx;}
	.font_10{  font-size: 20upx;}
	.l_h20{
	  line-height: 20px;
	}
	
	/*定位*/
	.pr{position: relative;}
	.pa{position: absolute;}
	
	/*文字超出省略*/
	.ellipsis {
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    overflow: hidden;
	    display: block;
	}
	
	/*对齐*/
	.tl{text-align: left;}
	.tc{text-align: center;}
	.tr{text-align: right;}
	
	/*间距*/
	.mt1{margin-top: 1px;}
	.mt5{margin-top: 5px;}
	.mt8{margin-top: 8px;}
	/*.mt10{margin-top: 10px;}*/
	.mt15{margin-top: 15px;}
	.mt20{margin-top: 20px;}
	.mt25{margin-top: 25px;}
	.mt30{margin-top: 30px;}
	.mt35{margin-top: 35px;}
	.mt40{margin-top: 40px;}
	.mt60{margin-top: 60px;}
	.p_all{ padding: 3%;}
	
	/*边框*/
	.bte{border-top:solid 1px #eee;}
	.bbe{border-bottom: solid 1px #eee;}
	.bre{ border-right: 1px solid #eee}
	
	/*浮动*/
	.fl_l{ float: left;}
	.fl_r{ float: right;}
	
	.w10{ width: 10%;}
	.w20{ width: 20%;}
	.w30{ width: 30%;}
	.w40{ width: 40%;}
	.w50{ width: 50%;}
	.w60{ width: 60%;}
	.w70{ width: 70%;}
	.w80{ width: 80%;}
	.w90{ width: 90%;}
	.w100{ width: 100%;}
	/*边框*/
	.bte{ border-top: 1px solid #eee;}
	.bbe{ border-bottom: solid 1px #eee;}
	.bre{ border-right: 1px solid #eee;}
	.ble{ border-left: 1px solid #eee;}
	
	.footfixed { display: block; position: fixed; bottom: 0; left: 0;
	  background: #fff; z-index: 100; width:100%; font-size: 14px;
	  border-top: 1px solid #eee; line-height: 50px;
	}
	.cl_h{
	  clear: both;
	  height: 1px;
	  margin-top: 60px;
	}
	.shop{ position: relative;}
	.video{
	  width: 45px;
	  height: 45px;
	  display: inline-block;
	  position: absolute;
	  right: 0;
	  top: 0;
	  z-index: 2;
	}
	.video image{
	  width: 45px;
	  height: 45px;
	  background-size:45px; 
	}
	.search_no{
	    width: 100%; 
	    display: block;
	    color: #666;
	    text-align: center;
	    font-size: 14px;
	}
	.scimg{
	    width: 100px;
	    height: 100px;
	    display: inline-block;
	    background-size:100px; 
	}
	.x_right{
	    width: 16px;
	    height: 18px;
	    margin-left: 10px;  
	}
	button[type="warn"] {
	color:#FFFFFF;
	background-color:#d9002f;
	}
	
/*  #endif  */
	
</style>