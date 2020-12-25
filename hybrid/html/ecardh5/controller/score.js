  $(document).ready(function(){
                  var login_info = get_login_info();
                  var wxtoken = login_info.wxtoken;
                  var checkstr = login_info.checkstr;
                  var sellerid = get_current_sellerid();
                  var url = http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=user_score_log";
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
                    item_str1 += '<div class="text_info">一条积分记录都没有</div>';
                    item_str1 += '<div class="text_info1">"还是去首页看看吧~"</div>';
                    item_str1 += '<a href="index.html" class="button">去首页</a>';
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
     item_str += '<p class="biandong">积分变动：'+value.score+'<p>';
     item_str += '<p class="biandong_shijian">'+value.createtime+'<p>';
     item_str += '<div class="clr"></div>';
     item_str += '</li>';
     item_str += '<li class="mingxi_li">';
     item_str += '<p class="score_yu_e">'+value.score_msg+'<p>';
     item_str += '<div class="clr"></div>';
     item_str += '</li>';
     // item_str += '<li class="mingxi_li">';
     // item_str += '<p class="score_yu_e">'+value.memo+'<p>';
     // item_str += '<div class="clr"></div>';
     // item_str += '</li>';
     item_str += '<li class="mingxi_li">';
     item_str += '<p class="score_yu_e">积分余额：'+value.score_total+'<p>';
     item_str += '<div class="clr"></div>';
     item_str += '</li>';
     item_str += '</div>';
     return item_str;
}
  

})