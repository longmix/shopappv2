 $(document).ready(function(){
	var login_require = GET['login_require'];
	var pluginid = GET['pluginid'];
	var login_info = null;
	var sellerid = get_current_sellerid();
	if(login_require == '1'){
		login_info = get_login_info();
	}

	var url = http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=shang_plugin";
	var userid = 0;
	var checkstr = '';
	if (is_user_login()) {
		login_info = get_login_info();
		userid = login_info.userid;
		checkstr = login_info.checkstr;
	}

	$.ajax({
                url:url,
                type:"POST",
                dataType:"json",
                data:{"userid":userid,'checkstr':checkstr,"sellerid":sellerid,"pluginid":pluginid},
                success:function(res){
					if(res.code == 1){
						location.href = res.url;
					}
					else{
						history.back(-1);
					}
				}
	});

 })
