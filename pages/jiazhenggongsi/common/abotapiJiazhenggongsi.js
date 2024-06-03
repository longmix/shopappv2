
import abotapi from '../../../common/abotapi.js';

var jiazhenggongsi_app_api_server = 'https://app.tseo.cn/jiazhenggongsi';
// var jiazhenggongsi_app_api_server = 'http://192.168.0.71/yanyubao_web/jiazhenggongsi/index.php';


module.exports = {
	/**
	 * 发起HTTP请求，与直接请求abotapi.abotRequest不同，这里封装了服务器的server前缀
	 */
	requestServer : function(post_end_point, post_data, callback_success, callback_fail=null, callback_complete=null){
		//var __this = this;
		
		if(!post_data || !post_data.userid || !post_data.checkstr){
			uni.showToast({
				title:'缺少userid参数！'
			});
			return;
		}
		
		
		var post_url = jiazhenggongsi_app_api_server + '' + post_end_point;
		
		var params = {};
		params.url = post_url;
		params.data = post_data;
		
		//params.success = callback_success;
		params.success = function(res){
			console.log('jiazhenggongsi request server success callback');
			
			if(res && res.data && (res.data.code == 102)){
				//家政公司没有入驻
				console.log('商家没有入驻，跳转到入驻申请界面', res);
				
				uni.showModal({
					title:'提示',
					content: res.data.msg,
					showCancel:false,
					success: (res001) => {
						
						abotapi.call_h5browser_or_other_goto_url(res.data.apply_url);
						
					}
				});
				
				return;
			}
			
			callback_success(res);
			
		};
		
		
		
		params.fail = callback_fail;
		params.complete = callback_complete;
		
		abotapi.abotRequest(params);
	},
	/**
	 * 检查 options对象是否有 adminuserid，
	 * 如果有，给 that的 current_adminuserid赋值，
	 * 如果没有，则使用当前登陆用户的userid
	 * 注意： 这两个参数都 Object，所以这里是“引用传递”，而不是“值传递”
	 * @param {Object} options
	 * @param {Object} that
	 */
	get_current_adminuserid:function(options, that){
		
		console.log('get_current_adminuserid options ===>>>', options);
		console.log('get_current_adminuserid that ===>>>', that);
		
		that.current_adminuserid = 0;
		
		//如果是强制清空缓存
		if(options.entry_type && (options.entry_type == 'new')){
			uni.removeStorageSync('jiazhenggongsi_cache_current_adminuserid');
		}
		
		if(options.adminuserid){
			that.current_adminuserid = options.adminuserid;
		}
		
		if(that.current_adminuserid){
			//写缓存，以避免在子页面没有传递 adminuserid的时候，可以被读取到
			uni.setStorageSync("jiazhenggongsi_cache_current_adminuserid", that.current_adminuserid);
			
			return;
		}
		
		
		
		//读取缓存
		that.current_adminuserid = uni.getStorageSync("jiazhenggongsi_cache_current_adminuserid");
		
		if(that.current_adminuserid){
			return;
		}
		
		var userInfo = abotapi.get_user_info();
		
		if(userInfo && userInfo.userid){
			//判断是否有实体商家对应的身份的userid
			that.current_adminuserid = userInfo.userid;
			
			//写缓存，以避免在子页面没有传递 adminuserid的时候，可以被读取到
			uni.setStorageSync("jiazhenggongsi_cache_current_adminuserid", that.current_adminuserid);
		}
		
		
	},
	/**
	 * 检查 用户是否登陆
	 * 如果没有，则跳转到登陆界面
	 */
	check_user_login:function(){
		var userInfo = abotapi.get_user_info();
		
		console.log('check_user_login ==>> userInfo ===>>> ', userInfo);
		
		if(!userInfo || !userInfo.userid || !userInfo.checkstr){
			abotapi.goto_user_login('/pages/jiazhenggongsi/index');
			return;
		}
	}
	
	
}
