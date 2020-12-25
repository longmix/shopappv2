  $(document).ready(function(){
    
                  var login_info = get_login_info();
                  var sellerid = get_current_sellerid();

                  var checkstr = login_info.checkstr;
                  var url = http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=get_merchant_youhui";
          $.ajax({
                url:url,
                type:"POST",
                dataType:"json",
                data:{"userid":login_info.userid,"checkstr":login_info.checkstr,"sellerid":sellerid,"type":"h5"},
                success:function(res){
                  
                 if(res.code == 1){
                      $.each(res.data,function(k,val){
                          //alert(val);
                        item_str = form_article_item_str(val);
                        $("#basic-accordian").append(item_str);
                      });
                                          
                      return;

                  }
                 else if(res.code == 0){
                    item_str1 = '';
                    item_str1 += '<div class="boxx">';
                    item_str1 += '<div class="text_info">这个商户太懒了</div>';
                    item_str1 += '<div class="text_info1">"竟然一张优惠券都没发~"</div>';
                    item_str1 += '<a href="index.html" class="button">去首页</a>';
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
     item_str += '<img src="images/yhqbj.png">';
     item_str += '<p class="quan_name1">'+value.coupon_name+'</p>';
     item_str += '<p class="quan_type_ling">'+value.coupon_type+'</p>';
     item_str += '<p class="quan_jifen">需要积分：'+value.score+'</p>';
     item_str += '<p class="quan_youxiao">有效期限：领券后'+value.expire_days+'天</p>';
     item_str += '<span class="quan_url" onclick="lingqu('+value.youhuiid+',\''+value.sellerid+'\')">领取此优惠券</span>';
     item_str += '</div>';
     item_str += '<div class="quan_info">';
     item_str += '<span class="time_quan">有效时间：'+value.date_begin+' 至 '+value.date_end+'</span>';
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

  function lingqu(youhuiid,sellerid){
      var yetao= get_login_info();
      var get_url = http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=get_user_youhui";

      $.ajax({
                url:get_url,
                type:"POST",
                dataType:"json",
                data:{"userid":yetao.userid,"checkstr":yetao.checkstr,"youhuiid":youhuiid,"sellerid":sellerid},
                success:function(res){
                	if(res.code == 1)
               		{
               			layer.msg(res.msg);
               			return;
               		}
               		else if(res.code == 0)
               		{
               			layer.msg(res.msg);
               			return;
               		}
                }

            })

  }
  function show(youhuiid){
    $('#'+youhuiid+'').toggle();
     $('.'+youhuiid+'').toggleClass("rotate");

  }

