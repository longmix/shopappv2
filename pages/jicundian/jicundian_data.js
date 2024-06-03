/**
 * 24年5月27日：从 pages/work_flow/common 中复制
 * xxxxxx
 * 
 * xxxx
 * 
 */
// import abotapi from '../../../common/abotapi.js';

module.exports = {
	
	
	tabbar_list: [{
			"text": "首页",
			"iconPath": '/static/img/tabBar/home.png',
			"selectedIconPath": '/static/img/tabBar/home-01.png',
			"new_url": "/pages/jicundian/index"
		},
		{
			"text": "订单",
			"iconPath": '/static/img/tabBar/imglist.png',
			"selectedIconPath": '/static/img/tabBar/imglist-on.png',
			"new_url": "/pages/jicundian/order_list"
		},
		{
			"text": "我的",
			"iconPath": '/static/img/tabBar/user.png',
			"selectedIconPath": '/static/img/tabBar/user-01.png',
			//"new_url": "/pages/work_flow/flow_set"
			"new_url": "/pages/tabbar/user"
		}
	],
	
	
	
	
}
