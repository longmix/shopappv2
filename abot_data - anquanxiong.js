const globalData = {
		weiduke_server_url: 'https://cms.weiduke.com/',
		yanyubao_server_url: 'https://yanyubao.tseo.cn/',
		o2owaimai_server_url: 'https://app.tseo.cn/o2owaimai/index.php/',
		socket_server: 'https://socketio.tseo.cn',
		
		version_number:'Ver 1.7.8 Build 256',
		version_code:256,
		
		force_sellerid:1,
	
		xiaochengxu_appid: 'wx6576af86ad5d4804',			//微信小程序的appid
		xiaochengxu_account: 'gh_74c59a54559c',				//微信小程序的账号
		weixin_open_platform_appid: 'wx6939a00416c5d3aa--',	//微信开放平台中登记的APP对应的appid（务必与manifest中的配置一致）
		
		//通版商城
		default_shopname: '安全熊',
		default_sellerid: 'fSmyUPkjj',
		default_copyright_text:'上海卓位服装有限公司 @ 版权所有',
		
		
		//=======以下配置项在发布版本的时候确定，服务器端配置无效===
		
		//平台相关的配置
		current_platform : 'app-android',
		//current_platform : 'app-ios',
		//current_platform : 'mp-weixin',
		//current_platform : 'mp-baidu',
		//current_platform : 'mp-alipay',
		//current_platform : 'h5',
		
		//固定导航栏的背景色，如果为0，则使用服务器端的配置
		//如果固定导航栏颜色，请填写navigationBar_font_color和navigationBar_bg_color
		//并确保与 navigationBarTextStyle / navigationBarBackgroundColor   保持一致
		navigationBarBackgroundColor_fixed:1,
		navigationBar_font_color:'#ffffff',
		navigationBar_bg_color:'#ff8040',
		//======================End=======================
		
		//======以下选项可以在服务器端修改，这里是默认值=====
		//首页显示附近商家的数量，如果为0则不显示
		default_shang_list_count_in_front_page:0,
		default_publish_list_count_in_front_page:0,
		
		
		
		
		baidu_map_ak: 'OTsGerqQhowGSFOWG8c6p86R',
		userInfo: {},
		
		//2021.1.13. 关于订单支付的特殊设置
		order_buy_payment_to_mp_weixin:1,	//将微信支付订单跳转到小程序中
	};

module.exports = {
	globalData,
}
