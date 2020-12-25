 $(document).ready(
  function(){
        //var login_info = get_login_info();
        //var wxtoken = login_info.wxtoken;
        //var checkstr = login_info.checkstr;
        var sellerid = get_current_sellerid();
        $.ajax({
                //url:"http://206.test.tseo.cn/yanyubao_server/index.php?g=Yanyubao&m=Gongzhong&a=about_supplier",
                url:http_server + "/index.php?g=Yanyubao&m=Gongzhong&a=about_supplier",
                type:"POST",
                dataType:"json",
                //data:{"userid":login_info.userid,'checkstr':login_info.checkstr,"sellerid":sellerid},
				data:{"sellerid":sellerid},
                success:function(res){
                   
             if(res.code == 1){
                   $("#company_logo").attr("src",res.data.head_logo);
                   $('#company_name').html(res.data.company_name);  
                   $('#company_mobile').html(res.data.telephone);  
                   $('#company_address').html(res.data.city_name+'市'+res.data.district_name+res.data.address); 
                   $('#brief').html(res.data.brief);
                   $("#img1").attr("src",res.data.shanghu_img0);
                   $("#img2").attr("src",res.data.shanghu_img1);
                   $("#img3").attr("src",res.data.shanghu_img3);
                   $("#img4").attr("src",res.data.shanghu_img4);
                   $("#img5").attr("src",res.data.shanghu_img5);

                   // 百度地图API功能
                  var map = new BMap.Map("map",{minZoom:4,maxZoom:18}); // 创建Map实例,设置地图允许的最小/大级别
                  map.centerAndZoom(new BMap.Point(121.5,31.3),18); 
                  map.enableScrollWheelZoom(true);
                  //添加缩略图控件
                  map.addControl(new BMap.OverviewMapControl({isOpen:false,anchor:BMAP_ANCHOR_BOTTOM_RIGHT}));
                  //添加缩放平移控件
                  map.addControl(new BMap.NavigationControl());
                  //添加比例尺控件
                  map.addControl(new BMap.ScaleControl());
                   
                  var keyword = $("#company_address").html();
                  var local = new BMap.LocalSearch(map, {
                  renderOptions: { map: map } ,
                  onInfoHtmlSet: function () {
                  //要等到气泡显示加载完成后再改变显示级别
                  map.setZoom(18);
                  }
                  });
                  local.search(keyword);
                  
                   return;
                  }
                  else
                  {
                    layer.msg(re.msg);
                    return;
                  }
            }


});
})