  $(document).ready(function(){
                  var login_info = get_login_info();
                  var wxtoken = login_info.wxtoken;
                  var checkstr = login_info.checkstr;
                  var sellerid = get_current_sellerid();
                  var url = http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=supplier_score_require_list";
          $.ajax({
                url:url,
                type:"POST",
                dataType:"json",
                data:{"userid":login_info.userid,"checkstr":login_info.checkstr,"sellerid":sellerid},
                success:function(res){
                   // var res = JSON.parse(res);
				   console.log(res);
				   
                   if(res.code == 0){
					   layer.msg(res.msg);

                       item_str1 = '';
                          item_str1 += '<div class="boxx">';
                          item_str1 += '<div class="text_info">一条积分申请记录都没有</div>';
                          // item_str1 += '<div class="text_info1">"还不赶紧去付款~"</div>';
                          // item_str1 += '<a href="pay_consumed.html" class="button">去付款</a>';
                          item_str1 += '</div>'; 
						 
                       $("#mingxi_money_list").append(item_str1);
                       return;

                       
                   }

				   $.each(res.data,function(k,val){
					  //alert(val);
					item_str = form_article_item_str(val);
					$("#mingxi_money_list").append(item_str);
				  });									  
				  return;
                }
            }); 

  function form_article_item_str(value){
     item_str = '';
     item_str += '<div class="mingxi_money">';
     item_str += '<li class="mingxi_li">';
     item_str += '<p class="biandong">消费金额:'+value.total_fee+'<p>';
     item_str += '<p class="biandong_shijian">'+value.createtime+'<p>';
     item_str += '<div class="clr"></div>';
     item_str += '</li>';
     item_str += '<li class="mingxi_li">';
     item_str += '<p class="biandong">申请积分:'+value.score+'<p>';
     item_str += '<p class="biandong_shijian" style="color:#222;">' +value.status_text+'<p>';
     item_str += '<div class="clr"></div>';
     item_str += '</li>';
     // item_str += '<li class="mingxi_li">';
     // item_str += '<p class="biandong">处理状态:'+value.status_text+'<p>';
     // item_str += '<div class="clr"></div>';
     // item_str += '</li>';
     item_str += '</div>';
     return item_str;
}
  

})