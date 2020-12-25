 $(document).ready(function(){
		 var login_info = get_login_info();
		 var wxtoken = login_info.wxtoken;
		 var checkstr = login_info.checkstr;
 	      var country = $("#country").val();
        var province = $("#province").val();
 	     $.ajax({
               url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=get_user_profile",
                type:"POST",
                dataType:"json",
                data:{"userid":login_info.userid,"checkstr":login_info.checkstr},
                success:function(res){
                   // layer.msg(res.msg);

                   if(res.code == 1){
                      $('#country').val(res.data.country);
                      $('#province').val(res.data.province);    
                      return;
                   }
                   else{
                   
                    return;
                   }
                }
            }); 
  
       $('#button').click(function(){
        var country = $("#country").val();
        var province = $("#province").val();
        if(country == ''){
          layer.msg('请输入国家');
          $('#country').focus();
          return false;

        }
        if(province == ''){
          layer.msg('请输入地区');
          $('#province').focus();
          return false;

        }
         $.ajax({
                url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=update_userinfo&action=set",
                type:"POST",
                dataType:"json",
                data:{"userid":login_info.userid,"checkstr":login_info.checkstr,fieldname: "country|||province", fieldvalue: country+'|||'+province},


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
