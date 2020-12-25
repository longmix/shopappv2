  $(document).ready(function(){
          var login_info = get_login_info();
          var wxtoken = login_info.wxtoken;
          var checkstr = login_info.checkstr;
          var headimgurl = $('#imgupload').val();
      //设置图片上传地址
    var upload_img_url = http_image_server + "/index.php?g=Yanyubao&m=Gongzhong&a=upload_image_file";
    $('#formImg').prop('action', upload_img_url);
    $("#userid").val(login_info.userid);
     /*读取用户头像 */
       $.ajax({
                url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=get_user_headimgurl",
                type:"POST",
                dataType:"json",
                data:{"userid":login_info.userid,'checkstr':login_info.checkstr},
                success:function(res){
                   if(res.code == 1){
                       $("#img_head").attr("src",res.headimgurl);
                       $("#img_head").css("display","block");
                       return;
                   }
                   if(res.code == 2){
                      $("#img_head").attr("src","images/pho.png");
                      $("#img_head").css("display","block");
                      return;
                   }
                   
                }
            }); 

    
    })

 var  b='load';
 index=b;
    
function uploadImg()
    {   
       
        var names=$("#imgupload").val().split(".");
        //alert(names);
        if((names[1]!="gif")&&(names[1]!="GIF")&&(names[1]!="jpg")&&(names[1]!="JPG")&&(names[1]!="JPEG")&&(names[1]!="jpeg"))
            // &&(names[1]!="png")&&(names[1]!="PNG"))
        {
            layer.alert('图片必须为gif,jpg,png,jpeg格式!' , {
                                   closeBtn: 1
                                  });
            return;
        }
         index=layer.load(2,{shade: false});
        $("#formImg").submit();
    }

function callback(message,success)
        { 
            layer.close(index);
            if(success==false)
            {
                //$("#imgError").html(""+message);
                //$("#imgError").show();
                //layer.msg(message);
                layer.alert( '图像更换失败！', {
                                  closeBtn: 1
                                  });
            }
            else{
                 
                  layer.alert('图像更换成功！' , {
                                 closeBtn: 1
                                  });
                  $("#img_head").attr("src",message);
                
            }
        } 
