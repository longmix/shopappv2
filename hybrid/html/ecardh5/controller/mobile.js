 $(document).ready(function(){
         get_verify();
         var login_info = get_login_info();
         var checkstr = login_info.checkstr;
         var mobile=$("#mobile").val();
        
    $.ajax({
                url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=get_user_profile",
                type:"POST",
                dataType:"json",
                data:{"userid":login_info.userid,"checkstr":login_info.checkstr},
                success:function(res){
                   if(res.code == 1){
                         $("#mobile").val(res.data.mobile);
                      return;
                   }
                   else{
                   
                    return;
                   }
                }
            }); 
		   
       
       $("#getyzm").click(function(){
           
             var mobile=$("#mobile").val();
             var verify=$("#tpyzm").val();
             var tokenstr=$("#tokenstr").val();

             if(mobile== ''){
                layer.msg("请填写手机号");
                $("#mobile").focus();
                return false;
             }

            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/; 
            if (!myreg.test(mobile)) {
                layer.msg("请输入合法的手机号码");
                $("#mobile").focus();
                return false;
            }
            ///获取手机验证码
           $.ajax({
                url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=sendsms",
                type:"POST",
                dataType:"json",
                data:{'mobile':mobile,'verifycode':verify,'tokenstr':tokenstr},
                success:function(res){
                    layer.msg(res.msg);  
                   if(res.code == 1){
                        var setTime;
                        var time=parseInt($("#getyzm").val());
                        setTime=setInterval(function(){
                            if(time<=0){
                                clearInterval(setTime);
                                $("#getyzm").attr("disabled", false);
                                $("#wenzi").html("获取验证码");
                                $(".yanzhengma").css("color","#fff");
                                $(".yanzhengma").css("background","#f60");
                                return;
                            }
                            time--;
                            $("#getyzm").attr("disabled", true); 
                            $("#wenzi").html(time+" s");
                            $("#getyzm").css("background","#666");
                            $("#getyzm").css("color","#999999");

                        },1000);  
                   }
                   else{
                      get_verify();
                   }
                   
                }
            }); 
        })
       $("#button").click(function(){
           
             var mobile=$("#mobile").val();
             var verify=$("#tpyzm").val();
             var tokenstr=$("#tokenstr").val();
             var tpyzm=$("#tpyzm").val();
             var yzm=$("#yzm").val();

             if(mobile== ''){
                layer.msg("请填写手机号");
                return false;
             }

            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/; 
            if (!myreg.test(mobile)) {
                layer.msg("请输入合法的手机号码");
                $("#mobile").focus();
                return false;
            }
            if(tpyzm== ''){
                layer.msg("请填写图片验证码");
                $("#tpyzm").focus();
                return false;
            }
            if(yzm== ''){
                layer.msg("请填写手机验证码");
                $("#yzm").focus();
                return false;
            }
  
            ///登入
           $.ajax({
                url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=update_mobile",
                type:"POST",
                dataType:"json",
                data:{'mobile':mobile,'verifycode_sms':yzm,"userid":login_info.userid,'checkstr':login_info.checkstr},
                success:function(res){
                   // layer.msg(res.msg);
                   
                   if(res.code == 1){
					   layer.msg("更换手机号码成功！");
                        location.href="info.html";
                        return;
                   }
                   else{
                    layer.msg(res.msg);

                   }
                   
                }
            }); 
            
            
        });
      
 })
 function get_verify(){
    ///获取tokenstr
        $.ajax({
                url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=get_tokenstr",
                type:"POST",
                dataType:"json",
                data:{},
                success:function(res){
                   //alert(res);return;
                   
                   if(res.code == 1){
                    $("#tokenstr").val(res.tokenstr);
                    var verify = http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=getverifycodeimg&tokenstr="+res.tokenstr;
                    $("#verify").prop("src",verify);
                   }
                   
                }
            }); 
  }