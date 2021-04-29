 
  $(document).ready(function(){
          
          var sellerid = get_current_sellerid();
          //alert(sellerid);
          //var 
          // var wxtoken = login_info.wxtoken;
          // var checkstr = login_info.checkstr;
          var url = http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=get_user_card";
          var userid = 0;
          var checkstr = '';
          if (is_user_login()) {
            login_info = get_login_info();
            userid = login_info.userid;
            checkstr = login_info.checkstr;
          }
		  else{
			  layer.msg('亲，您还未登录哦！', {  
										  time: 0 //不自动关闭
										  ,btn: ['登录', '取消']
										  ,yes: function(index){
											  location.href = 'login.html';						    
										  }
										});
	             //  layer.open({
             //     type: 2,
             //     title: '未登录',
             //     area: ['220px', 'auto'],
             //     fixed: false, //不固定
             //     maxmin: true,
             //     shade: 0,
             //     skin: 'layui-layer-rim',
             //     content: ['login.html','no']
             // });
		  }
     jiazai();
       function jiazai(){
        // var index=layer.msg('加载中...');
        $.ajax({
                url:url,
                type:"POST",
                dataType:"json",
                data:{"userid":userid,"checkstr":checkstr,"sellerid":sellerid},
                success:function(res){
                 // layer.close(index);
                 if(res.code == 1){
                   var data = res.data;
                   if(data.balance_log_count == 0)
                   {
                    $("#money_mingxi").css("display","none");
                   }
                   if(data.balance_log_count !== 0)
                   {
                    $("#money_mingxi").addClass("ok");
                   }

                    if(data.score_log_count == 0)
                   {
                    $("#score_cord").css("display","none");
                   }
                     if(data.score_log_count !== 0)
                   {
                     $("#score_cord").addClass("ok");
                   }

                    if(data.youhui_count == 0)
                   {
                    $("#my_youhui").css("display","none");
                   }
                    if(data.youhui_count !== 0)
                   {
                    $("#my_youhui").addClass("ok");
                   }

                    if(data.youhui_new_count == 0)
                   {
                    $("#get_youhui").css("display","none");
                   }
                    if(data.youhui_new_count !== 0)
                   {
                    $("#get_youhui").addClass("ok");
                   }
                   $(document).attr("title",data.shang_name);
                   $("#apple_icon").attr("href",data.card_logo);
                   $("#apple-title").attr("content",data.shang_name);
                   $(".cardbg").attr("src",data.card_bg_img);
                   $("#cardlogo").attr("src",data.card_logo);
                   $(".cardbg").css("display","block");
                   $("#cardlogo").css("display","block");
                   $("#card_name").html(data.card_name);
                   $("#card_name").css("color",data.card_name_color);
                   $("#miaoshu").html(data.card_desc);
                   $("#miaoshu").css("color",data.card_desc_color);
                   $("#kahao").html(data.card_no); 
                   $("#kahao").css("color",data.card_no_color); 
                   $("#kaohao_em").css("color",data.card_no_color);
                   $("#level_name").html(data.level_name);
                   $("#member_score").html(data.member_score);  
                   $("#youhui_count").html(data.youhui_count+"张");
                   $("#score_cord").html(data.score_log_count);
                   $("#my_youhui").html(data.youhui_count);
                   $("#get_youhui").html(data.youhui_new_count);
                   $("#money_mingxi").html(data.balance_log_count);
                   $("#balance").html(data.balance);


                 


                   $("#shang_telephone").html(data.shang_telephone);
                   $("#shang_address").html(data.shang_address);



                      var shang_telephone=data.shang_telephone;
                 
                      $("#shang_telephone").click(function(){



                        window.location.href="tel:"+shang_telephone;
                      })

                      $("#shang_address").click(function(){

                        window.location.href="about.html";
                      })

                   if(data.shang_plugin_list){
                	   var shang_plugin_block = '<ul class="round"  id="shang_plugin">';
                	   $.each(data.shang_plugin_list, function(key,value){                		   
                		   shang_plugin_block += '<li><a href="'+value.url+'"><span>'+value.title+'</span></a></li>';
                         });
                	   shang_plugin_block += '</ul>';
                	   
                	   $("#shang_plugin_block").html(shang_plugin_block);

                   }



                     if (data.shanghu_img_list) {
                       var img_list='';
                       $.each(data.shanghu_img_list, function(key,value){                       
                         img_list += '<img src="'+value+'" style="width:100%;display:block;margin:0 auto;"/>';
                           });
                       $("#img_list").append(img_list);
                     }
                     ////缓存商户图像，商户名称，卡内余额
 
                      var  shanghu_logo = data.card_logo;
                      var  shanghu_name = data.shang_name;
                      var  balance_num = data.balance;
                      var  balance_type = data.balance_type;
                      var  balance_type_str =data.balance_type_str;
                      var obj = new Object();
                      obj.shanghu_logo = shanghu_logo;
                      obj.shanghu_name = shanghu_name;
                      obj.balance_num = balance_num;
                      obj.balance_type = balance_type;
                      obj.balance_type_str = balance_type_str;
                      //json对象转字符串
                      var obj_str = JSON.stringify(obj);
                      //缓存返回数据
                      localStorage.setItem("paymoney", obj_str);
                 
      
					  //将所有链接都改成click事件
					  $("a").click(function(){
						var url = $(this).attr('href');
						if(url && (url.length > 0) && (url.substr(0, 7) != 'http://')){
							$(this).removeAttr('href');
							//url = $(this).attr('href');
							location.href = url;
						}

						return;
						});
                  

                  }
                 else if(res.code == '-1'){
					 //登录超时，可能是在其他地方登录，这里被挤下来了
           layer.msg(res.msg);
					 del_login_info();
					 location.href = "index.html";
                  }
				else{
			   
				 return;
				}
                }
            }); 
 }
//加载刷新。
function refresh() {
  $(window).scroll(function(){
  
    var scrollTop = $(this).scrollTop(); 
     //滚动条距离顶部的高度
    if(scrollTop <= -60 && scrollTop >= -61){

        jiazai();
        return;
    }

  });

}



//调用
refresh();


})