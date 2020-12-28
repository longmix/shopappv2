/**
 * Created by xiong on 2017/3/17.
 */

var http_server = "https://yanyubao.tseo.cn"; var http_weiduke_server = "https://cms.weiduke.com";

//var http_server = "http://205.test.tseo.cn/yanyubao_server"; var http_weiduke_server = "http://205.test.tseo.cn/weiduke";

//var http_server = "http://test.tseo.cn/yanyubao_server";  var http_weiduke_server = "http://test.tseo.cn/weiduke_cms";
//var http_server = ".";  var http_weiduke_server = "./_weiduke";

var version_str01 = '2.8.6';
var version_code = '920';//版本号
var version_str02 = '20200310';
var mobile_phone_number = '13122158158';

var http_image_server = http_server;

/**
 login_info是一个对象，包含wxtoken、jobnetid、checkstr、companyname
 */
function set_login_info(sellerid, checkstr){
    var obj = new Object();
    obj.sellerid = sellerid;
    obj.checkstr = checkstr;



    //json对象转字符串
    var obj_str = JSON.stringify(obj);

    console.log("保存的登录信息为："+obj_str);

    //缓存返回数据
    localStorage.setItem("yanyubao_login_info", obj_str);
}

/**
 获取本地存储的登录成功信息
 返回的是login_info对象
 */
function get_login_info(){
    //缓存返回数据
    var login_info = localStorage.getItem("yanyubao_login_info");

    console.log(login_info);


    var obj = JSON.parse(login_info);
    /*if(obj == null){
     location.href="login.html";
     }*/

    return obj;
}

/**
 清空缓存的登录信息
 */
function del_login_info(){
    //缓存返回数据
    localStorage.removeItem("yanyubao_login_info");
}

function show_welcome_page(){
    var is_first_show = localStorage.getItem('is_not_first_show'+version_code);
    
    if(is_first_show == 1){
        return false;
    }

    localStorage.setItem('is_not_first_show'+version_code, 1);
    return true;
}

/**
读取主题颜色
*/
function get_color_type(){
   //缓存返回数据
	var color_type = localStorage.getItem("yanyubao_color_type");
	if(!color_type){
		set_color_type('lanse');
		var color_type = localStorage.getItem("yanyubao_color_type");
	}
    console.log(color_type);


    var obj = JSON.parse(color_type);
    

    return obj;
}


/**
设置主题颜色
*/
function set_color_type(type){
   var color = new Object();
   color.type = type;
   
   //json对象转字符串
   var color_str = JSON.stringify(color);

   console.log("设置的颜色类型为："+color_str);

   //缓存返回数据
   localStorage.setItem("yanyubao_color_type", color_str);
}










