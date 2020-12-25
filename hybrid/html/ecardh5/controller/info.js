 $(document).ready(function(){
		  var login_info = get_login_info();
		  var checkstr = login_info.checkstr;
        $.ajax({
                url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=get_user_profile",
                type:"POST",
                dataType:"json",
                data:{"userid":login_info.userid,'checkstr':login_info.checkstr},
                success:function(res){
                   if(res.code == 1){
                      
                      //缓存
                      $('#nickname').html(res.data.nickname);
                      $('#account').html(res.data.account);
                      $('#mobile').html(res.data.mobile);
                      $('#birthday').html(res.data.birthday);
                      $('#sex').html(res.data.sex);
                      $('#diqu').html(res.data.country+res.data.province);
                      $('#signature').html(res.data.signature);   
                      return;
                   }
                   else{
                   
                    return;
                   }
                }
            }); 
        
        $("#button").click(function(){
        	var o_weixin_openid = localStorage.getItem("o_weixin_openid");

        	if(o_weixin_openid){
        		$.ajax({
                    url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=logout",
                    type:"POST",
                    dataType:"json",
                    data:{"userid":login_info.userid, 'checkstr':login_info.checkstr, 'openid':o_weixin_openid},
                    success:function(res){

                       if(res.code == 1){
                          
                          return;
                       }
                       else{
                       
                        return;
                       }
                    }
                }); 
        	}
        	
            del_login_info();
        });
 })
