 $(document).ready(function(){
		 var login_info = get_login_info();
		 var wxtoken = login_info.wxtoken;
		 var checkstr = login_info.checkstr;
     var sex= $("#uc_02").val();
      $.ajax({
               url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=get_user_profile",
                type:"POST",
                dataType:"json",
                data:{"userid":login_info.userid,"checkstr":login_info.checkstr},
                success:function(res){
                   // layer.msg(res.msg);

                   if(res.code == 1){
                    var data=res.data;
                     $("#uc_02").val(data.sex);
                      return;
                   }
                   else{
                   
                    return;
                   }
                }
            }); 
       $('#button').click(function(){
        var sex= $("#uc_02").val();
         
          $.ajax({
                url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=update_userinfo&action=set",
                type:"POST",
                dataType:"json",
                data:{"userid":login_info.userid,"checkstr":login_info.checkstr,"fieldname":'sex',"fieldvalue":sex},
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
