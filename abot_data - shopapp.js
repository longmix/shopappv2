const globalData = {
		weiduke_server_url: 'https://cms.weiduke.com/',
		yanyubao_server_url: 'https://yanyubao.tseo.cn/',
		o2owaimai_server_url: 'https://app.tseo.cn/o2owaimai/index.php/',
		socket_server: 'https://socketio.tseo.cn',
		
		version_number:'Ver 2.1.1 Build 309',
		version_code:309,
		
		force_sellerid:0,
		
		xiaochengxu_appid: 'wx00d1e2843c3b3f77',			//微信小程序的appid
		xiaochengxu_account: 'gh_a95e5a0852aa',				//微信小程序的账号
		weixin_open_platform_appid: 'wx029e1ddb38b4c630',	//微信开放平台中登记的APP对应的appid（务必与manifest中的配置一致）
		
		//通版商城，目前主要是用于小程序模板的发布
		default_shopname: '通版商城V2默认模板',
		default_sellerid: 'pQNNmSkaq',
		default_copyright_text:'技术支持：延誉宝',
		
		//=======以下配置项在发布版本的时候确定，服务器端配置无效===
		
		//平台相关的配置
		//current_platform : 'app-android',
		//current_platform : 'app-ios',
		current_platform : 'mp-weixin',
		//current_platform : 'mp-baidu',
		//current_platform : 'mp-alipay',
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
		
		//2021.1.13. 关于订单支付的特殊设置
		order_buy_payment_to_mp_weixin:0, //将微信支付订单跳转到小程序中
		  
		//2021.8.5. 重新定义商家列表为supplier列表 /pages/shopList/shopList
		xianmai_shang_list_switch_to_supplier_list:0,
	};

module.exports = {
	globalData,
}
