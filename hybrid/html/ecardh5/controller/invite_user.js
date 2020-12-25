  $(document).ready(function(){
                
          var url = http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=invite_user";
          var sellerid = get_current_sellerid();
          var mobile = GET['mobile'];
          //
          $.ajax({
                url:url,
                type:"POST",
                dataType:"json",
                data:{"sellerid":sellerid,'action':'get'},
                success:function(res){
                   // var res = JSON.parse(res);
                   if(res.code == 1){
                      if(res.head_logo !== ''){
                         $('#head_logo').attr('src',res.head_logo);
                      }
                     
                      $('#shang_name').html(res.shang_name);
                      $('#mobile').html(mobile);                   
                      return;
                   }
                   else if(res.code == 0){
                    alert(res.msg)
                    return;
                   }
                }
            }); 
 
        

          $(".btn").click(function(){
              var mobile_verifycode = $('#verify').val();
              if(!mobile_verifycode){
                 alert('请输入验证码');
              }

               $.ajax({
                url:url,
                type:"POST",
                dataType:"json",
                data:{"sellerid":sellerid,'mobile':mobile,'mobile_verifycode':mobile_verifycode,'action':'set'},
                success:function(res){
                   // var res = JSON.parse(res);
                   if(res.code == 2){
                      alert(res.msg)
                      return;
                   }

                   if(res.code == 3){
                      window.location.href = res.url;
                   }
                   
                }
            }); 
          })

})