/**
 * 24年3月11日：从 pages/jiazhenggongsi/common 中复制
 * 
 */
import abotapi from '../../../common/abotapi.js';

//var work_flow_server = 'http://pescms';  //苏江的ip 192.168.0.73; var out_server_id = 'out_server_02';
// var work_flow_server = 'https://test.tseo.cn:8843/work_flow'; var out_server_id = 'out_server_03';//沙箱环境：https
// var work_flow_server = 'http://test.tseo.cn:888/work_flow'; var out_server_id = 'out_server_01';//沙箱环境
// var work_flow_server = 'http://71.test.tseo.cn:888/work_flow'; var out_server_id = 'out_server_01';//开发环境
var work_flow_server = 'https://app.tseo.cn/work_flow'; var out_server_id = 'out_server_01';//生产环境

module.exports = {
	//定义服务器的网址
	work_flow_server,
	
	/**
	 * 发起HTTP请求，与直接请求abotapi.abotRequest不同，这里封装了服务器的server前缀
	 */
	abotRequest :function (params) {
		
		var __this = this;
			
		console.log('准备请求：' + params.url);
		
		if(params.method == 'GET'){
			params.url += '&ensellerid=' + abotapi.globalData.default_sellerid;
		}
		else{
			params.data.ensellerid = abotapi.globalData.default_sellerid;
		}
		
		params.header = params.header || {'Accept':'application/json',
					// XMLHttpRequest的请求机制跟默认的不一样，不要随便使用
					// 'X-Requested-With': 'XMLHttpRequest',
					'Content-Type': 'application/x-www-form-urlencoded'};
					
		var success_callback = params.success;
		//再做一层封装，对于返回的code是406的情况，提示账号被禁用
		params.success = (http_res)=>{
			
			if(http_res.data && (http_res.data.status == 406) ){
				
				uni.showModal({
					title:'提示',
					content: http_res.data.msg,
					showCancel:false
				});
				
				return;				
			}			
			
			success_callback(http_res);
		};
		
		abotapi.abotRequest(params);
	},
	
	tabbar_list1: [{
			"text": "首页",
			"iconPath": '/static/img/tabBar/home.png',
			"selectedIconPath": '/static/img/tabBar/home-01.png',
			"new_url": "/pages/work_flow/index"
		},
		{
			"text": "报表",
			"iconPath": '/static/img/tabBar/imglist.png',
			"selectedIconPath": '/static/img/tabBar/imglist-on.png',
			"new_url": "/pages/work_flow/baobiao"
		},
		{
			"text": "我的",
			"iconPath": '/static/img/tabBar/user.png',
			"selectedIconPath": '/static/img/tabBar/user-01.png',
			//"new_url": "/pages/work_flow/flow_set"
			"new_url": "/pages/tabbar/user"
		}
	],
	tabbar_list2: [{
			"text": "首页",
			"iconPath": '/static/img/tabBar/home.png',
			"selectedIconPath": '/static/img/tabBar/home-01.png',
			"new_url": "/pages/work_flow/index"
		},
		{
			"text": "我的",
			"iconPath": '/static/img/tabBar/user.png',
			"selectedIconPath": '/static/img/tabBar/user-01.png',
			//"new_url": "/pages/work_flow/flow_set"
			"new_url": "/pages/tabbar/user"
		}
	],
	/**
	 * 检查 options对象是否有 work_flow_id，
	 * 如果有，给 that的 current_work_flow_id赋值，
	 * 如果没有，则使用当前登陆用户的userid
	 * 注意： 这两个参数都 Object，所以这里是“引用传递”，而不是“值传递”
	 * @param {Object} options
	 * @param {Object} that
	 */
	get_current_work_flow_id:function(options, that){
		
		console.log('get_current_work_flow_id options ===>>>', options);
		console.log('get_current_work_flow_id that ===>>>', that);
		
		that.current_work_flow_id = 0;
		
		//如果是强制清空缓存
		if(options.entry_type && (options.entry_type == 'new')){
			uni.removeStorageSync('workflowpackage_cache_current_work_flow_id');
			uni.removeStorageSync('workflowpackage_cache_current_work_flow_type');
		}
		
		if(options.work_flow_id){
			that.current_work_flow_id = options.work_flow_id;
			that.current_work_flow_type = options.work_flow_type;
		}
		
		if(that.current_work_flow_id){
			//写缓存，以避免在子页面没有传递 work_flow_id的时候，可以被读取到
			uni.setStorageSync("workflowpackage_cache_current_work_flow_id", that.current_work_flow_id);
			uni.setStorageSync("workflowpackage_cache_current_work_flow_id", that.current_work_flow_type);
			
			return;
		}
		
		
		
		//读取缓存
		that.current_work_flow_id = uni.getStorageSync("workflowpackage_cache_current_work_flow_id");
		
		if(that.current_work_flow_id){
			return;
		}
		
		that.current_work_flow_type = uni.getStorageSync("workflowpackage_cache_current_work_flow_type");
		
		var userInfo = abotapi.get_user_info();
		
		if(userInfo && userInfo.userid){
			//判断是否有实体商家对应的身份的userid
			that.current_work_flow_id = userInfo.userid;
			
			//写缓存，以避免在子页面没有传递 work_flow_id的时候，可以被读取到
			uni.setStorageSync("workflowpackage_cache_current_work_flow_id", that.current_work_flow_id);
		}
		
		
	},
	/**
	 * 检查 延誉宝的用户账号是否登陆
	 * 如果没有，则跳转到登陆界面
	 */
	is_yanyubao_user_login:function(){
		var userInfo = abotapi.get_user_info();
		
		console.log('is_yanyubao_user_login ==>> userInfo ===>>> ', userInfo);
		
		if(!userInfo || !userInfo.userid || !userInfo.checkstr){
			// switchTab /pages/work_flow/index
			abotapi.goto_user_login(abotapi.globalData.goto_new_index);
			return false;
		}
		
		return true;
	},
	set_user_token:function(user_token){
		console.log('设置user token ===>>>>' + user_token);
		
		uni.setStorageSync('work_flow_user_token', user_token);
		
		//同步设置token的保存位置，以便于用户退出登陆的时候被调用
		uni.setStorageSync('user_login_sychronize_outer__setting', 'work_flow_user_token');
	},
	get_user_token:function(){		
		return uni.getStorageSync('work_flow_user_token');
	},
	set_app_token:function(app_token){
		console.log('设置user token ===>>>>' + JSON.stringify(app_token));
		
		uni.setStorageSync('work_flow_app_token', JSON.stringify(app_token));
		
		//同步设置token的保存位置，以便于用户退出登陆的时候被调用
		uni.setStorageSync('user_login_sychronize_outer__setting', 'work_flow_app_token');
	},
	get_app_token:function(){
		var tttt = uni.getStorageSync('work_flow_app_token');
		
		if(!tttt){
			return null;
		}
		
		return JSON.parse(tttt);
	},
	
	/**
	 * 检查用户是否登陆，如果登陆，则执行回调函数，没有登陆，则登陆后执行
	 * @param {Object} callback_function
	 */
	check_user_login:function(callback_function){
		
		if(typeof callback_function != "function"){
			return;
		}
		
		if(this.get_app_token()){
			
			callback_function(this.get_app_token());
			
			return;
		}
		
		var userInfo = abotapi.get_user_info();
		
		if(!userInfo){
			callback_function(null);
			
			return;
		}
		
		var that = this;
		
		that.abotRequest({
			url: that.work_flow_server + '/?g=API&m=Index&a=get_app_token',
			data: {
				sellerid: abotapi.globalData.default_sellerid,
				userid: userInfo.userid,
				checkstr: userInfo.checkstr,
				systemInfo: 'systemInfosystemInfosystemInfosystemInfo'
			},
			method: "POST",
			success: function(http_res) {
				
				console.log('get_app_token--->>>', http_res);
				console.log('get_app_token--->>>', http_res.data)
				
				if(http_res && http_res.data && (http_res.data.status == 200)){
					
					// .token，member_id, is_user_role
					that.set_app_token(http_res.data.data);
					
					callback_function(that.get_app_token());
				}
				else{
					uni.showModal({
						title:'数据错误',
						content:'获取工单系统身份失败，是否重新登录？',
						showCancel:true,
						cancelText:'过会再试',
						confirmText:'重新登录',
						success: (res) => {
							if(res.confirm){
								//执行退出并跳转到登录界面，以重新登录
								abotapi.del_user_info();
								abotapi.call_h5browser_or_other_goto_url('/pages/login/login');
							}
							else {
								//不做任何处理
							}
						}
						
					})
					
					//callback_function(null);
				}
				
			}
		});
		
		
		
	},
	/**
	 * @param {Object} post_data  请求参数
	 * token   user_token的值
	 * status 工单的状态，-1代表请求所有工单
	 * is_user_role 如果等于1，则请求接单者的工单列表
	 * 
	 * @param {Object} callback_function
	 */
	get_ticket_list:function(post_data, callback_function){
		
		if(typeof callback_function != "function"){
			return;
		}
		
		var that = this;
		
		var new_url = that.work_flow_server + '/?g=API&m=Ticket&a=index&status=' + post_data.status;
		
		
		that.abotRequest({
			url: new_url,
			data: post_data,
			method: "POST",
			success: function(http_res) {
				
				console.log('get_app_token--->>>', http_res);
				console.log('get_app_token--->>>', http_res.data)
				
				if(http_res && http_res.data && (http_res.data.status == 200)){					
					
					callback_function(http_res.data);
				}
				else{
					callback_function(null);
				}
				
			}
		});
		
	}
	
	
}
