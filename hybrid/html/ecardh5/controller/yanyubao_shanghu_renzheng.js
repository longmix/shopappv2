 $(document).ready(function(){

	var login_info = null;
	var sellerid = get_current_sellerid();
	
	//var login_info = localStorage.getItem("login_info");

//alert(login_info);
	
	login_info = get_login_info();

	var url = http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=yanyubao_shanghu_renzheng";
	var userid = 0;
	var checkstr = '';
	
	//login_info = get_login_info();
	userid = login_info.userid;
	checkstr = login_info.checkstr;
	
	//alert(userid);alert(checkstr);
	
	$.ajax({
        url:url,
        type:"POST",
        dataType:"json",
        data:{"userid":userid,"checkstr":checkstr,"sellerid":sellerid, 'action':'get'},
        success:function(res){
           if(res.code == 1){
        	    alert(res.msg);           
				location.href="index.html";
				return;
           }
           
           $('#user_mobile').val(res.user_mobile);
           $('#company_mobile').val(res.user_mobile);
           
        }
    }); 
    //////获取省
	var url_province= http_server+"/index.php?g=Home&m=Common&a=region_data";
      $.ajax({
        url:url_province,
        type:"POST",
        dataType:"json",
        data:{"id":'1'},
        success:function(data){
           // alert(data[0].region_name);
           		   item_str1 = '';
                   $.each(data,function(k,val){
                    
	                    item_str1 += '<option value='+val.region_id+'>';
	                    item_str1 += val.region_name;
	                    item_str1 += '</option>';             
                    
                    });
                   	$("#province").append(item_str1); 
                   
                      return;
         }
      }); 
      //////获取市
     $('#province').change(function(){
     	$("#city").empty();
     	$("#district").empty();
        var url_city= http_server+"/index.php?g=Home&m=Common&a=region_data";
        var region_id = $('#province').val();
        // alert(region_id);return;
      $.ajax({
        url:url_city,
        type:"POST",
        dataType:"json",
        data:{"id":region_id},
        success:function(data){
           // alert(data[0].region_name);
           // 
       				item_str1 = '';
                    item_str1 = '<option value="-1">请选择城市</option>';
                   $.each(data,function(k,val){
                    
                    item_str1 += '<option value='+val.region_id+'>';
                    item_str1 += val.region_name;
                    item_str1 += '</option>';             
                     
                    });
                   $("#city").append(item_str1);



                   	item_str2 = '';
                    item_str2 = '<option value="-1">请选择县市区</option>';
                   	$("#district").append(item_str2); 


                   

                   return;
         }
      }); 
     })
       //////获取区县
     $('#city').change(function(){
     	$("#district").empty();
        var url_city= http_server+"/index.php?g=Home&m=Common&a=region_data";
        var region_id1 = $('#city').val();
        // alert(region_id);return;
      $.ajax({
        url:url_city,
        type:"POST",
        dataType:"json",
        data:{"id":region_id1},
        success:function(data){
           // alert(data[0].region_name);
           			item_str1 = '';
           			item_str1 = '<option value="-1">请选择县市区</option>';
                   $.each(data,function(k,val){
                    
                    item_str1 += '<option value='+val.region_id+'>';
                    item_str1 += val.region_name;
                    item_str1 += '</option>';             
                    
                      });
                   	$("#district").append(item_str1); 
                      return;
         }
      }); 
     })
	$('#botton').click(function(){
		//微信认证需要的其他参数
		var company_name = $('#company_name').val(); //公司名称（没有公司请填商户字号）
		var province = $('#province').val();var city =$('#city').val();var district = $('#district').val();
		var address = $('#address').val();	//商户地址（请填写您的经营地址）
		var company_mobile = $('#company_mobile').val(); //联系电话（请填写联系电话或手机号码）
		var company_yingyezhizhao = $('#image_yyzz').val();//营业执照（如果没有营业执照请手持身份证拍照）
		var company_faren = $('#company_faren').val();	//法人姓名
		var company_farenid =  $('#company_farenid').val(); //法人身份证号码（请填写正确的身份证号码）
		var company_qita01 = $('#image_sfz').val(); //法人身份证照片（请扫描或拍照身份证）
		var   province = $('#province').val();
		var   city = $('#city').val();
		var   district = $('#district').val();
		  if(company_name == ''){
                alert('请填写公司名称');
                $('#company_name').focus();
               
                return false;
            }
          if(province == -1){
                alert('请选择省份');
                $('#province').focus();
               
                return false;
            }
         if(city == -1){
                alert('请选择城市');
                $('#city').focus();
               
                return false;
            }
         if(district == -1){
                alert('请选择县市区');
                $('#district').focus();
               
                return false;
            }
         if(address == ''){
                alert('请填写商户地址');
                $('#address').focus();
               
                return false;
            }
         if(company_mobile == ''){
                alert('请填写联系电话');
                $('#company_mobile').focus();
               
                return false;
            }
         if(company_yingyezhizhao == ''){
                alert('请上传营业执照');
                  
                return false;
            }
         if(company_faren == ''){
                alert('请填写法人姓名');
                $('#company_faren').focus();
               
                return false;
            }
         if(company_farenid == ''){
                alert('请填写法人身份证号');
                $('#company_farenid').focus();
               
                return false;
            }
           
         var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
			if(reg.test(company_farenid) === false) 
			{ 
			  alert("身份证号输入不合法"); 
			return false; 
			} 
	      
         if(company_qita01 == ''){
                alert('请上传法人身份证照片');
                  
                return false;
            }
		$.ajax({
	                url: url,
	                type:"POST",
	                dataType:"json",
	                data:{"userid":userid,'checkstr':checkstr,"sellerid":sellerid, 'action':'set',
	                	"company_name":company_name, 'province':province, 'city':city, 'district':district, 
	                	'address':address,'company_mobile':company_mobile, 
	                	'company_yingyezhizhao':company_yingyezhizhao, 
	                	'company_faren':company_faren, 'company_farenid':company_farenid, 'company_qita01':company_qita01},
	                success:function(res){
	                	// layer.msg(res.msg);
	                	
						if(res.code == 1){
                alert("提交成功，您提交的内容我们将尽快审核，请您耐心等待！");
                window.setTimeout("window.location='index.html'",500); 
							
						}
						else{
							
						}
						
					}
		});
	});
	
 })

 
 