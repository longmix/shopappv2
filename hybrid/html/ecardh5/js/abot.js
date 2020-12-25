
var http_server = "https://yanyubao.tseo.cn"; var http_image_server = http_server;

//var http_server = "."; var http_image_server = http_server;

//var http_server = "http://206.test.tseo.cn/yanyubao_server";var http_image_server = http_server;
//var http_server = "http://test.tseo.cn/yanyubao_server";var http_image_server = http_server;

/**
 login_info是一个对象，包含wxtoken、jobnetid、checkstr
 */
function set_login_info(userid, checkstr) {
	var obj = new Object();
	obj.userid = userid;
	obj.checkstr = checkstr;

	//json对象转字符串
	var obj_str = JSON.stringify(obj);
	console.log("设置登录信息：" + obj_str);

	//缓存返回数据
	localStorage.setItem("login_info", obj_str);
}
/**
 获取本地存储的登录成功信息
 返回的是login_info对象
 */
function get_login_info() {

	//缓存返回数据
	var login_info = localStorage.getItem("login_info");
	console.log("获取登录信息：" + login_info);

	var obj = JSON.parse(login_info);
	
	//alert(document.location.href);
	//console.log(document.location.href);
	
	if ((obj == null) || (!obj.userid) || (!obj.checkstr)) {
		localStorage.setItem("last_url", document.location.href);
		
		location.href = "login.html";
	}

	return obj;

}

/**
 判断用户是否登录
 */
function is_user_login() {

	//缓存返回数据
	var login_info = localStorage.getItem("login_info");

	console.log("获取登录信息：" + login_info);
	//字符串中解析出json 对象
	var obj = JSON.parse(login_info);
	if ((obj == null) || (obj.userid == null) || (obj.checkstr == null)) {
		return false;
		}

	return true;
}

/**
 获取本地存储的登录成功信息
 返回的是login_info对象
 */
function del_login_info() {

	//缓存返回数据
	localStorage.removeItem("login_info");
	localStorage.removeItem("o_weixin_openid");

	location.href = "login.html";
}

/**
 * [set_sellerid description]
 * @param {[type]} sellerid [description]
 */
function set_current_sellerid(sellerid) {

	console.log("设置商家id：" + sellerid);

	//缓存返回数据
	localStorage.setItem("current_sellerid", sellerid);

}

/**

 */
function get_current_sellerid() {

	//缓存返回数据
	var sellerid = localStorage.getItem("current_sellerid");

	console.log("获取商家id：" + sellerid);

	if ((sellerid == null) || (sellerid.lenth == 0)) {
		sellerid = 'pQNNmSkaq';
	}

	console.log("获取商家id（终值）：" + sellerid);

	return sellerid;
}

///get extend
(function($) {
	$.extend({
		urlGet : function() {
			var aQuery = window.location.href.split("?"); // 取得Get参数
			var aGET = new Array();
			if (aQuery.length > 1) {
				var aBuf = aQuery[1].split("&");
				for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
					var aTmp = aBuf[i].split("="); // 分离key与Value
					aGET[aTmp[0]] = aTmp[1];
				}
			}
			return aGET;
		}
	})
})(jQuery);

$(document).ready(function()  {

	var GET = $.urlGet();
	//alert(JSON.stringify(GET));

	var sellerid = GET['sellerid'];
	console.log('get sellerid from url: '+sellerid);

	if (typeof(sellerid) != 'undefined' ) {
		//console.log('bbbbb:'+sellerid);
		set_current_sellerid(sellerid);
	}
	/*
	else{
		console.log('ccccc:'+sellerid);
		sellerid = get_current_sellerid();
		console.log('dddd:'+sellerid);
		if (!sellerid) {
			console.log('eeee:'+sellerid);
			sellerid = "pQNNmSkaq";
		}
		console.log('fffff:'+sellerid);
	}
	*/

	sellerid = get_current_sellerid();

	var oneclicklogin = GET['oneclicklogin'];

	if (typeof(oneclicklogin) != 'undefined' ) {
		 $.ajax({
                url:http_server+"/index.php?g=Yanyubao&m=Gongzhong&a=one_click_login", //请求地址,
                type:"POST",
                dataType:"json",
                data:{"oneclicklogin":oneclicklogin,"sellerid":sellerid},
                success:function(res){
                   // var res = JSON.parse(res);
				   console.log(res);
				   
                   if(res.code == 1){
					   console.log(res);
                        set_login_info(res.userid,res.checkstr);
                        set_current_sellerid(sellerid);

						var url001 = window.location.href;
						url001 = url001.split("?")[0];
						//alert(url001);

                        location.href = url001;
                       return;
                   }
                }
            }); 
	}
});

$(document).ready(function()  {
	$("a").click(function(){
		var url = $(this).attr('href');
		if(url && (url.length > 0) && (url.substr(0, 7) != 'http://')){
			//$(this).removeAttr('href');
			//url = $(this).attr('href');
			location.href = url;
		}

		return;
	});
});