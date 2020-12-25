 $(document).ready(function(){
		 var login_info = get_login_info();
		 var wxtoken = login_info.wxtoken;
		 var checkstr = login_info.checkstr;

    var account = $("#account").val();
 	  
    $.ajax({
                url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=get_user_profile",
                type:"POST",
                dataType:"json",
                data:{"userid":login_info.userid,"checkstr":login_info.checkstr},
                success:function(res){
                   if(res.code == 1){
                         $("#account").val(res.data.account);
                      return;
                   }
                   else{
                   
                    return;
                   }
                }
            }); 
 	      
 
       $('#button').click(function(){
        var account = $("#account").val();
        if(account == ''){
          layer.msg('请输入账号');
          $('#account').focus();
        }
        $.ajax({
                url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=update_userinfo&action=set",
                type:"POST",
                dataType:"json",
                data:{"userid":login_info.userid,"checkstr":login_info.checkstr,"fieldname":'account',"fieldvalue":account},
                 
                success:function(res){
                   if(res.code == 1){
                          location.href="info.html";
                      return;
                   }
                   else{
                   
                    return;
                   }
                }
            }); 

       });
      
 })
