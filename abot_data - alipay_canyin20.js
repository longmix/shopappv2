const globalData = {
		weiduke_server_url: 'https://cms.weiduke.com/',
		yanyubao_server_url: 'https://yanyubao.tseo.cn/',
		o2owaimai_server_url: 'https://app.tseo.cn/o2owaimai/index.php/',
		socket_server: 'https://socketio.tseo.cn',
		
		version_number:'Ver 2.0.1 Build 290',
		version_code:290,
		
		force_sellerid:0,
	
		xiaochengxu_appid: 'wxe6565fced2f812da',			//微信小程序的appid
		xiaochengxu_account: 'gh_a95e5a0852aa',				//微信小程序的账号
		weixin_open_platform_appid: 'wx029e1ddb38b4c630',	//微信开放平台中登记的APP对应的appid（务必与manifest中的配置一致）
		
		//通版商城
		default_shopname: '延誉宝扫码点餐2.0',
		default_sellerid: 'fJxSPaVgj',
		default_copyright_text:'延誉宝 @ 版权所有',
		
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
		navigationBar_bg_color:'#f37404',
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
