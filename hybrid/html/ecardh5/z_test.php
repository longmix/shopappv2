<?php 
?>
<script type="text/javascript">
//localStorage.setItem("o_weixin_openid", 'odSjJjjznFAywxiiKoC98a-AWd9A');
localStorage.removeItem("o_weixin_openid");

var o_weixin_openid = localStorage.getItem("o_weixin_openid");
alert(o_weixin_openid);
console.log(o_weixin_openid);

set_login_info('245893', '555dfe5bb74da812a90e5f1067bf113e');

var login_info = localStorage.getItem("login_info");

alert(login_info);

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

</script>