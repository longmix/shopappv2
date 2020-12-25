  $(document).ready(function(){
        //alert(http_server);return;
         get_verify();
       
    $("#getyzm").click(function(){
           
             var mobile=$("#mobile").val();
             var verify=$("#tpyzm").val();
             var tokenstr=$("#tokenstr").val();
             if(mobile== ''){
                layer.msg("请填写手机号");
                $("#mobile").focus();
                return false;
             }

            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
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
                        set_login_info(res.userid, res.
                            checkstr);
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
                            $("#getyzm").css("background","#cecece");
                            $("#getyzm").css("color","#666666");

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
             var yzm=$("#yzm").val();
             var tpyzm=$("#tpyzm").val();
             var sellerid = get_current_sellerid();
             if(mobile== ''){
                layer.msg("请填写手机号");
                $("#mobile").focus();
                return false;
             }

            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
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
            
            var o_weixin_openid = localStorage.getItem("o_weixin_openid");
            
            ///登入
           $.ajax({
                url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=weixin_bind",
                type:"POST",
                dataType:"json",
                data:{'mobile':mobile,'verifycode_sms':yzm,'tokenstr':tokenstr,"sellerid":sellerid,"openid":o_weixin_openid},
                success:function(res){
                   // layer.msg(res.msg);
                   
                   if(res.code == 1){
                        set_login_info(res.userid, res.checkstr);
                        location.href="index.html";
                        return;
                   }
                   else{
                    layer.msg(res.msg);
                   }
                   
                }
            }); 
            
            
        });
    })
  //获取tokenstr，返回图片验证码图片
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