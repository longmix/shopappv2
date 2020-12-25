  $(document).ready(function(){
                  var sellerid = get_current_sellerid();
                  //alert(sellerid);
                  var login_info = get_login_info();
                  var wxtoken = login_info.wxtoken;
                  var checkstr = login_info.checkstr;
                  var url = http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=get_user_youhui_info";
          $.ajax({
                url:url,
                type:"POST",
                dataType:"json",
                data:{"userid":login_info.userid,"checkstr":login_info.checkstr,"sellerid":sellerid,"type":"h5"},
                success:function(res){
                 if(res.code == 1){
                      $.each(res.data,function(index,val){
                          //alert(val);
                        item_str = form_article_item_str(val);
                        $("#basic-accordian").append(item_str);
                    
                      });

                      return;

                  }
                 else if(res.code == 0){
                    item_str1 = '';
                    item_str1 += '<div class="boxx">';
                    item_str1 += '<div class="text_info">竟然一张券都没有</div>';
                    item_str1 += '<div class="text_info1">"你有没有考虑过券的感受~"</div>';
                    item_str1 += '<a href="getyouhuiquan.html" class="button">去领券</a>';
                    item_str1 += '</div>';                  
                      
                    $("#basic-accordian").append(item_str1);
                  }
                    else{
                   
                     return;
                    }
                }
            }); 
  function form_article_item_str(value){
     item_str = '';
     item_str += '<div class="youhuiquan">';
     item_str += '<div class="quan_bg">';
     item_str += '<img src="images/yhqbj1.png">';
     item_str += '<p class="quan_name">'+value.coupon_name+'</p>';
     item_str += '<p class="quan_type">'+value.coupon_type+'<span  class="quan_zhuangtai">(优惠券'+value.status_name+')</span></p>';
     item_str += '</div>';
     item_str += '<div class="quan_info">';
     item_str += '<span class="time_quan">有效时间：'+value.date_from+' 至 '+value.date_to+'</span>';
     item_str += '<span class="xiangqing_quan" onclick="show('+value.youhuiid+')">详细信息&nbsp;<img src="images/arrow_yhq.png"  style="width: 10px; height:8px;" class="'+value.youhuiid+'" ></span> ';
     item_str += '</div>';
     item_str += '<div class="yohui_shuoming" id="'+value.youhuiid+'">';
     item_str += '<div class="box-shuoming">';
     item_str += '<p class="bt_shuongming">优惠内容：<br />';
     item_str += '<p>'+value.coupon_content+'</p>';
     item_str += '<p class="bt_shuongming">使用说明：<br />';
     item_str += '<p>'+value.memo+'</p>';
     item_str += '</div>';
     item_str += '</div>';
     item_str += '</div>';   
     return item_str;

}

})
 function show(youhuiid){
    $('#'+youhuiid+'').toggle();
    $('.'+youhuiid+'').toggleClass("rotate");

  }