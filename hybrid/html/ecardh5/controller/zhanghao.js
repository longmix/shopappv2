 $(document).ready(function(){
		 // var login_info = get_login_info();
		 // var wxtoken = login_info.wxtoken;
		 // var checkstr = login_info.checkstr;
 	    
 	      var account = $("#account").val();
   //      $.ajax({
   //              url:,
   //              type:"POST",
   //              dataType:"json",
   //              data:{"wxtoken":wxtoken,"checkstr":checkstr,"userid":userid},
   //              success:function(res){
   //                 layer.msg(res.msg);

   //                 if(res.code == 1){
   //                    $('#nickname').val(res.data.nickname);  
   //                    return;
   //                 }
   //                 else{
                   
   //                  return;
   //                 }
   //              }
   //          }); 
       $('#button').click(function(){
        if(account == ''){
          layer.msg('请输入账号');
          $('#account').focus();

        }

       });
      
 })
