  $(document).ready(function(){

          var login_info = get_login_info();
          var wxtoken = login_info.wxtoken;
          var checkstr = login_info.checkstr;
      //设置图片上传地址
    var upload_img_url = http_image_server + "/index.php?g=Yanyubao&m=Gongzhong&a=upload_image_file";
    var upload_img_url1 = http_image_server + "/index.php?g=Yanyubao&m=Gongzhong&a=upload_image_file";
    $('#formImg_sfz').prop('action', upload_img_url);
    $("#userid").val(login_info.userid);
    $('#formImg_yyzz').prop('action', upload_img_url1);
    // $("#userid").val(login_info.userid);

     /*读取 */
       // $.ajax({
       //          url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=get_user_headimgurl",
       //          type:"POST",
       //          dataType:"json",
       //          data:{"userid":login_info.userid,'checkstr':login_info.checkstr},
       //          success:function(res){
       //             if(res.code == 1){
       //                 $("#img_head").attr("src",res.headimgurl);
       //                 $("#img_head").css("display","block");
       //                 return;
       //             }
       //             if(res.code == 2){
       //                $("#img_head").attr("src","images/a.png");
       //                $("#img_head").css("display","block");
       //                return;
       //             }
                   
       //          }
       //      }); 

    
    })
function uploadImg()
    {   
        var names=$("#company_qita01").val().split(".");
        //alert(names);
        if((names[1]!="gif")&&(names[1]!="GIF")&&(names[1]!="jpg")&&(names[1]!="JPG")&&(names[1]!="JPEG")&&(names[1]!="jpeg"))
            // &&(names[1]!="png")&&(names[1]!="PNG"))
        {
            layer.msg('图片必须为gif,jpg,png,jpeg格式');
            return;
        }
        
        $("#formImg_sfz").submit();

    }
function callback(message,success)
        { 
            if(success==false)
            {
                //$("#imgError").html(""+message);
                //$("#imgError").show();
                layer.msg(message);
            }
            else{
                   // alert(1111);
                $("#img_sfz").attr("src",message);
                
            }
        } 
function uploadImg1()
    {   
        var names=$("#company_yingyezhizhao").val().split(".");
        alert(names);
        if((names[1]!="gif")&&(names[1]!="GIF")&&(names[1]!="jpg")&&(names[1]!="JPG")&&(names[1]!="JPEG")&&(names[1]!="jpeg"))
            // &&(names[1]!="png")&&(names[1]!="PNG"))
        {
            layer.msg('图片必须为gif,jpg,png,jpeg格式');
            return;
        }
        
        $("#formImg_yyzz").submit();

    }
function callback1(message1,success1)
        { 
            if(success==false)
            {
                //$("#imgError").html(""+message);
                //$("#imgError").show();
                layer.msg(message);
            }
            else{
                    alert(1111);
                $("#img_yyzz").attr("src",message);
                
            }
        } 
// function uploadImg1()
//     {   
//         var names=$("#company_yingyezhizhao").val().split(".");
//         //alert(names);
//         if((names[1]!="gif")&&(names[1]!="GIF")&&(names[1]!="jpg")&&(names[1]!="JPG")&&(names[1]!="JPEG")&&(names[1]!="jpeg"))
//             // &&(names[1]!="png")&&(names[1]!="PNG"))
//         {
//             layer.msg('图片必须为gif,jpg,png,jpeg格式');
//             return;
//         }
//         // alert(names);
        
//         $("#formImg_yyzz").submit();

//     }
// function uploadImg1()
//     {   
//         var names=$("#company_yingyezhizhao").val().split(".");
//         //alert(names);
//         if((names[1]!="gif")&&(names[1]!="GIF")&&(names[1]!="jpg")&&(names[1]!="JPG")&&(names[1]!="JPEG")&&(names[1]!="jpeg"))
//             // &&(names[1]!="png")&&(names[1]!="PNG"))
//         {
//             layer.msg('图片必须为gif,jpg,png,jpeg格式');
//             return;
//         }
//         //alert(names);
        
//         $("#formImg_yyzz").submit();
//     }

// function callback(message,success)
//         { 
//             if(success==false)
//             {
//                 //$("#imgError").html(""+message);
//                 //$("#imgError").show();
//                 layer.msg(message);
//             }
//             else{
                
//                 $("#img_yyzz").attr("src",message);
                
//             }
//         } 