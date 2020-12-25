  $(document).ready(function(){
                  var login_info = get_login_info();
                  var wxtoken = login_info.wxtoken;
                  var checkstr = login_info.checkstr;
                  var sellerid = get_current_sellerid();
                  var url = http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=user_balance_log";
          $.ajax({
                url:url,
                type:"POST",
                dataType:"json",
                data:{"userid":login_info.userid,"checkstr":login_info.checkstr,"sellerid":sellerid},
                success:function(res){
                   // var res = JSON.parse(res);
                   if(res.code == 1){
                      
                       $.each(res.data,function(k,val){
                          //alert(val);
                        item_str = form_article_item_str(val);
                        $("#mingxi_money_list").append(item_str);
                      });
                                          
                      return;
                   }
                   else if(res.code == 0){
                    item_str1 = '';
                    item_str1 += '<div class="boxx">';
                    item_str1 += '<div class="text_info">一条余额记录都没有</div>';
                    item_str1 += '<div class="text_info1">"还不赶紧去付款~"</div>';
                    item_str1 += '<a href="pay_consumed.html" class="button">去付款</a>';
                    item_str1 += '</div>';                  
                      
                    $("#mingxi_money_list").append(item_str1);

                    return;
                   }
                }
            }); 
  function form_article_item_str(value){
     item_str = '';
     item_str += '<div class="mingxi_money">';
     item_str += '<li class="mingxi_li">';
     item_str += '<p class="biandong">变动:'+value.balance+'<p>';
     item_str += '<p class="biandong_shijian">'+value.createtime+'<p>';
     item_str += '<div class="clr"></div>';
     item_str += '</li>';
     item_str += '<li class="mingxi_li">';
     item_str += '<p class="biandong">'+value.balance_msg+'<p>';
     item_str += '<div class="clr"></div>';
     item_str += '</li>';
     item_str += '<li class="mingxi_li">';
     item_str += '<p class="biandong">余额:'+value.balance_total+'<p>';
     item_str += '<div class="clr"></div>';
     item_str += '</li>';
     item_str += '</div>';
     return item_str;
}
  

})