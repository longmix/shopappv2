const globalData = {
		weiduke_server_url: 'https://cms.weiduke.com/',
		yanyubao_server_url: 'https://yanyubao.tseo.cn/',
		o2owaimai_server_url: 'https://app.tseo.cn/o2owaimai/index.php/',
		socket_server: 'https://socketio.tseo.cn',
		
		// o2owaimai_server_url: 'https://yanyubao.tseo.cn/hahading/index.php/',
		
		
		// xiaochengxu_appid: 'wx60a801e5fb7f9378',
		xiaochengxu_appid: 'wx00d1e2843c3b3f77',
		
		
		// default_sellerid : 'fyJSPaVja',
		// default_sellerid : 'pQNNmSkaq',	
		
		// default_sellerid: 'fSNQPajka',
		
		//通版商城
		default_shopname: '延誉电商',
		default_sellerid: 'pQNNmSkaq',
		default_copyright_text:'延誉宝 @ 版权所有',
		
		//哈哈订
		//default_shopname: '哈哈订',
		// default_sellerid: 'fimmUPUPV',
		// default_copyright_text:'哈哈订信息科技 版权所有',
		
		//腾羽生物
		//default_shopname: '腾羽云商',
		//default_sellerid: 'fSNQPajka',
		//default_copyright_text:'腾羽生物科技 版权所有',
		
		//=======以下配置项在发布版本的时候确定，服务器端配置无效===
		
		//平台相关的配置
		//current_platform : 'app',
		current_platform : 'mp-weixin',
		//current_platform : 'mp-baidu',
		//current_platform : 'mp-alipay',
		//current_platform : 'h5',
		
		//固定导航栏的背景色，如果为0，则使用服务器端的配置
		navigationBarBackgroundColor_fixed:1,
		
		//购物车在底部导航栏（如果购物车在底部导航栏，请务必选择此项，避免向购物车跳转失败）
		is_shop_cart_in_tabbar: 0,
		is_publish_index_in_tabbar: 0, //判断发布的栏目在底部导航  1就是在底部导航
		is_publish_list_in_tabbar: 0, //判断文章列表在底部导航   1就是在底部导航
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