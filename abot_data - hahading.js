const globalData = {
		weiduke_server_url: 'https://cms.weiduke.com',
		yanyubao_server_url: 'https://yanyubao.tseo.cn',
		yanyubao_basic_config_url: '/openapi/ShopAppV2Data/get_shop_option',
		o2owaimai_server_url: 'https://app.tseo.cn/o2owaimai/index.php',
		socket_server: 'https://socketio.tseo.cn',
		
		version_number:'Ver 3.1.0 Build 362',
		version_code:362,
		
		force_sellerid:1,
	
		xiaochengxu_appid: 'wx4b5776869b963bd4',			//微信小程序的appid
		xiaochengxu_account: 'gh_11bc7e8aa2a5',				//微信小程序的账号
		weixin_open_platform_appid: 'wx6939a00416c5d3aa',	//微信开放平台中登记的APP对应的appid（务必与manifest中的配置一致）
		
		//通版商城
		default_shopname: '哈哈订',
		default_sellerid: 'fimmUPUPV',
		default_copyright_text:'上海哈哈订信息科技有限公司 @ 版权所有',
		
		
		//=======以下配置项在发布版本的时候确定，服务器端配置无效===
		
		//平台相关的配置
		//current_platform : 'app-android',
		current_platform : 'app-ios',
		//current_platform : 'mp-weixin',
		//current_platform : 'mp-baidu',
		//current_platform : 'mp-alipay',
		//current_platform : 'h5',
		
		//固定导航栏的背景色，如果为0，则使用服务器端的配置
		//如果固定导航栏颜色，请填写navigationBar_font_color和navigationBar_bg_color
		//并确保与 navigationBarTextStyle / navigationBarBackgroundColor   保持一致
		navigationBarBackgroundColor_fixed:1,
		navigationBar_font_color:'#ffffff',
		navigationBar_bg_color:'#073892',
		//======================End=======================
		
		//======以下选项可以在服务器端修改，这里是默认值=====
		//首页显示附近商家的数量，如果为0则不显示
		default_shang_list_count_in_front_page:0,
		default_publish_list_count_in_front_page:0,
		
		
		
		
		baidu_map_ak: 'OTsGerqQhowGSFOWG8c6p86R',
		userInfo: {},
	};

module.exports = {
	globalData,
}
