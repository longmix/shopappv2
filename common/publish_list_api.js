import abotapi from './abotapi.js';
const isNullOrUndefined = obj=>obj===null || obj === undefined  || obj === '';

module.exports = {
	
	//获取帖子列表 （封装） (页面刷新要重置页数，必须的参数有cms_token,sellerid)
	get_publish_list: function (that, callback_function='', action='',) {
		
		var publishData = []; //返回的数组
		publishData['title'] = '';
		
		var cataid = that.cms_cataid;
		if(!that.is_get_article_list){
			
			//阻止继续向服务器请求数据
			publishData['title'] = '暂无相关文章';
			
			console.log('没有更多文章');
			typeof callback_function == "function" && callback_function(that, publishData);
			return;
		}
		
		if(!that.cms_token){
			//没有cms——token
			console.log('get_publish_list 没有 CMS Token');
			publishData['title'] = '缺少参数';
			typeof callback_function == "function" && callback_function(that, publishData);
			return;
		}
		
		var post_data = {
				token:that.cms_token,
				sellerid: that.abotapi.globalData.default_sellerid,
				action: 'newlist',
				page:that.current_page,
				page_size:that.current_page_size,
		};
			
		if(that.cms_cataid){
			post_data['cataid'] = that.cms_cataid;
		}
		
		if(action){
			
			post_data['action'] = action;
			post_data['search'] = that.search_text;
		}
		
		var openid = that.abotapi.get_current_openid();
		var userInfo = that.abotapi.get_user_info();
		
		if(!isNullOrUndefined(openid)){
			post_data['openid'] = openid;
		}
		
		if(!isNullOrUndefined(userInfo) && !isNullOrUndefined(userInfo.userid)){
			post_data['userid'] = userInfo.userid;
			post_data['checkstr'] = userInfo.checkstr;
			
		}
		
		abotapi.abotRequest({
			url: that.abotapi.globalData.weiduke_server_url + 'openapi/ArticleImgApi/article_list',
			method: 'post',
			data: post_data,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: function (res) {
				
				if(res.data.list_title){
					publishData['list_title'] = res.data.list_title;
				}
				
				if(res.data.code == 1){
					
					if(res.data.data.length < that.current_page_size){
						that.is_get_article_list = false;
					}
					
					publishData['index_list'] = res.data.data;
					//返回帖子数据
					typeof callback_function == "function" && callback_function(that, publishData);
					return;
					
					
				}else{
					that.is_get_article_list = false;
					publishData['msg'] = '暂无数据';
					typeof callback_function == "function" && callback_function(that, publishData);
					return;
				}
			},
			fail: function (e) {
				uni.showToast({
					title: '网络异常！',
					duration: 2000
				});
			},
		});
		
	},
	
	
	
}
