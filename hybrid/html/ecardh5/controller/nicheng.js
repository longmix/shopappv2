 $(document).ready(function(){
		  var login_info = get_login_info();
		  var wxtoken = login_info.wxtoken;
		  var checkstr = login_info.checkstr;
 	    
 	     var nickname = $("#nickname").val();
       $.ajax({
                url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=get_user_profile",
                type:"POST",
                dataType:"json",
                data:{"userid":login_info.userid,"checkstr":login_info.checkstr},
                success:function(res){
                   if(res.code == 1){
                         $("#nickname").val(res.data.nickname);
                      return;
                   }
                   else{
                   
                    return;
                   }
                }
            }); 
    
    $('#botton').click(function(){
         var nickname = $("#nickname").val();
        if(nickname == ''){
          layer.msg('请输入昵称');
          $('#nickname').focus();

        }
          $.ajax({
                url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=update_userinfo&action=set",
                type:"POST",
                dataType:"json",
                data:{"userid":login_info.userid,"checkstr":login_info.checkstr,"fieldname":'nickname',"fieldvalue":nickname},
                success:function(res){
                   if(res.code == 1){
                         // layer.msg("保存成功！");
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
