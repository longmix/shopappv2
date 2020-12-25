  $(document).ready(function(){
    
    var login_info = get_login_info();
    var wxtoken = login_info.wxtoken;
    var checkstr = login_info.checkstr;
    var sellerid = get_current_sellerid();

    //得到缓存数据
     var paymoney = localStorage.getItem("paymoney");
     var obj = JSON.parse(paymoney);
     //alert(paymoney);
     $(".pay_name").html(obj.shanghu_name);
     $("#shanghu_logo").attr("src",obj.shanghu_logo);
     $("#balance").html(obj.balance_num);
     var balance_type =obj.balance_type;
      if(balance_type == 1){
       $('.je_bz').css("display","none");
       $('.je_str').html(obj.balance_type_str);
      }
    $("#paymoney")[0].focus();
    $("#paymoney").keyup(function(){
     var aa=$("#paymoney").val().length+1;
    if(aa >= 0){
     $('.pay_btn').css("opacity","1");
    }
    if(aa <= 1){
       $('.pay_btn').css("opacity",".6");
    }
   });
  $('#button').click(function(){
     var paymoney =$('#paymoney').val();
     if(!paymoney){
       layer.alert('亲，您还没输入消费金额呢！', {
                                closeBtn: 1
                                    });
        return;
     }
     var index = layer.load(2,{shade: false});
     var url = http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=pay_consumed";              
     $.ajax({
                url:url,
                type:"POST",
                dataType:"json",
                data:{"userid":login_info.userid,"checkstr":login_info.checkstr,"sellerid":sellerid,"paymoney":paymoney},
                success:function(res){
                    layer.close(index);
                   // var res = JSON.parse(res);
                   if(res.code == 1){
                        $("#button").attr("disabled",true);
                        layer.alert(res.msg , {
                                  closeBtn: 0
                                  },function(){
                                    location.href='index.html';

                                });               
                        return;
                   }
                   else if(res.code == 0){
                     $("#button").attr("disabled",false);
                     layer.alert( res.msg , {
                                  closeBtn: 1
                                  });
                     return;
                   }
                }
            }); 


   })


  
   })