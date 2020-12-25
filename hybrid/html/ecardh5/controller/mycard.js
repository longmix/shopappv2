  $(document).ready(function(){
                  var login_info = get_login_info();
                  if (!login_info){
                     layer.msg('亲，您还未登录哦！', {  
                      time: 0 //不自动关闭
                      ,btn: ['登录', '取消']
                      ,yes: function(index){
                        location.href = 'login.html';               
                      }
                    });
                  }
                  var wxtoken = login_info.wxtoken;
                  var checkstr = login_info.checkstr;
                  var url = http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=mycard_info";
          $.ajax({
                url:url,
                type:"POST",
                dataType:"json",
                data:{"userid":login_info.userid,"checkstr":login_info.checkstr},
                success:function(res){
                 if(res.code == 1){
                      $.each(res.data,function(k,val){
                        item_str = form_article_item_str(val);
                        $("#show_box").append(item_str);
                      
                      });

                      return;

                  }
                 else if(res.code == 0){
                    item_str1 = '';
                    item_str1 += '<div class="boxx">';
                    item_str1 += '<div class="text_info">竟然一张会员卡都没有</div>';
                    item_str1 += '<div class="text_info1">"你有没有考虑过会员卡的感受~"</div>';
                    item_str1 += '<a href="index.html" class="button">去首页</a>';
                    item_str1 += '</div>';                  
                      
                    $("#show_box").append(item_str1);
                  }
                    else{
                      layer.msg('亲，您还未登录哦！', {  
                      time: 0 //不自动关闭
                      ,btn: ['登录', '取消']
                      ,yes: function(index){
                        location.href = 'login.html';               
                      }
                    });
                   
                     return;
                    }
                }
            }); 
  function form_article_item_str(value){
      item_str = '';
      item_str = '<a href="index.html?sellerid='+value.sellerid+'">';
      item_str += '<div class="jsbox1">';
      item_str += '<div class="hycard">';
      item_str += '<div class="showdow_img">';
      item_str += '<img src="'+value.card_logo+'">';
      item_str += '</div>';
      item_str += '<h2 class="card_number">'+value.card_no+'</h2>';
      item_str += '<div class="jsbox_left1">';
      item_str += '<div class="bg_logo"><img src="'+value.card_logo+'"></div>';
      item_str += '</div>';
      item_str += '<div class="jsbox_right1">';
      item_str += '<ul>';
      item_str += '<li><p  style="font-weight:border;font-size:16px;">'+value.card_name+'</p></li>';
      item_str += '<li><p>'+value.level_name+'</p></li>';
      item_str += '</ul>';
      item_str += ' </div>';
      item_str += '</div>';
      item_str += '</div>';
      item_str += '</div>';
      item_str += '</a>';
      return item_str;
}
})