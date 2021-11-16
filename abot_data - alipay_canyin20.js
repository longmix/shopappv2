const globalData = {
		weiduke_server_url: 'https://cms.weiduke.com',
		yanyubao_server_url: 'https://yanyubao.tseo.cn',
		o2owaimai_server_url: 'https://app.tseo.cn/o2owaimai/index.php',
		socket_server: 'https://socketio.tseo.cn',
		
		version_number:'Ver 2.0.3 Build 295',
		version_code:295,
		
		force_sellerid:0,
	
		xiaochengxu_appid: 'wxe6565fced2f812da',			//微信小程序的appid
		xiaochengxu_account: 'gh_a95e5a0852aa',				//微信小程序的账号
		weixin_open_platform_appid: 'wx029e1ddb38b4c630',	//微信开放平台中登记的APP对应的appid（务必与manifest中的配置一致）
		
		alipay_third_appid:'2018111162078907',		//支付宝第三方平台应用信息，默认是延誉公司下面的名字叫延誉宝的应用，但是也可能是哈哈订或者芈隽的应用		
		alipay_mini_prog_appid:'2021002147673504',			//支付宝小程序appid：延誉宝扫码点餐
		alipay_user_pid:'2088201901872325',			//上海延誉信息技术有限公司的支付宝ID，2088开头的（小程序所有者）
		
		//设置特定的模板标志（目前仅有点餐小程序）
		current_template_name : 'canyin20_qrcode_diancan',
		
		
		//通版商城
		default_shopname: '来嗨吧',
		default_sellerid: 'fzmQPaPqa',				//  测试和开发账号 13112341238 ，也是所有配置的默认账号
		default_copyright_text:'来嗨吧',
		
		//=======以下配置项在发布版本的时候确定，服务器端配置无效===
		
		//平台相关的配置
		//current_platform : 'app-android',
		//current_platform : 'app-ios',
		//current_platform : 'mp-weixin',
		//current_platform : 'mp-baidu',
		current_platform : 'mp-alipay',
		//current_platform : 'h5',
		
		//固定导航栏的背景色，如果为0，则使用服务器端的配置
		//如果固定导航栏颜色，请填写navigationBar_font_color和navigationBar_bg_color
		//并确保与 navigationBarTextStyle / navigationBarBackgroundColor   保持一致
		navigationBarBackgroundColor_fixed:1,
		navigationBar_font_color:'#ffffff',
		navigationBar_bg_color:'#e7141a',	//需要同步修改 pages.json的 globalStyle 中的 navigationBarBackgroundColor
		//======================End=======================
		
		//======以下选项可以在服务器端修改，这里是默认值=====
		//首页显示附近商家的数量，如果为0则不显示
		default_shang_list_count_in_front_page:0,
		default_publish_list_count_in_front_page:0,
		
		//底部导航的设置，如果没有设置，或者设置为 -1 ，则默认使用服务器端的设置。
		//这里的设置需要与pages.json的tabbar同步。
		//！！！！如果不清楚，发布版本的时候务必不要设置
		is_index_index_in_tabbar : -1,
		is_user_user_in_tabbar : -1,
		
		baidu_map_ak: 'OTsGerqQhowGSFOWG8c6p86R',
		userInfo: {},
	};

module.exports = {
	globalData,
}
