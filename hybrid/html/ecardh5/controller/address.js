    var map = new BMap.Map("container");
                     map.addControl(new BMap.NavigationControl());//创建一个特定样式的地图平移缩放控件
                     map.enableScrollWheelZoom();
                      // var lng=121.5;
                      // var lat=31.3;
                      // var point = new BMap.Point(lng,lat);
                     // 定位对象
                        var geoc = new BMap.Geocoder();
                        var geolocation = new BMap.Geolocation();
                        geolocation.getCurrentPosition(function(r){
                            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                                //var mk = new BMap.Marker(r.point);
                                //map.addOverlay(mk);
                                //map.panTo(r.point);
                                $("#point").val(r.point.lng+','+r.point.lat);
                                setLocation(r.point);
                                var ep = $("#point").val().split(",");
                                // alert(ep);
                                point = new BMap.Point(ep[0], ep[1]);
                                map.centerAndZoom(point, 15);
                                allmap(point);
                     
                            }else {
                                // $("#start").attr("placeholder","请输入您的当前位置")
                                alert('定位失败，请检查网络！');
                            }
                        },{enableHighAccuracy: true});
                       function setLocation(point){
                            geoc.getLocation(point, function(rs){
                                var addComp = rs.addressComponents;
                                var result = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                                // $("#start").val(result);
                                // $("#start_location").val(result);
                                // searchRoute();
                            });
                        }
                    
                     
                     //当点击鼠标左键的时候，获得点击事件，获得点击点经纬度，通过经纬度搜索方圆附近的餐馆。
                     map.addEventListener("click", function(){
                      
                      map.clearOverlays();//清除由于上次事件留下的痕迹。
                     var center = map.getCenter();//为得到地图的中心点位，返回GLatLng类型的值.
                     lng=center.lng;
                     lat=center.lat;
                     point = new BMap.Point(lng,lat);
                        allmap(point);
                       });
                     
                     
             function getSquareBounds(centerPoi,r){
                            var a = Math.sqrt(2) * r; //正方形边长
                         
                            mPoi = getMecator(centerPoi);
                            var x0 = mPoi.x, y0 = mPoi.y;
                        
                            var x1 = x0 + a / 2 , y1 = y0 + a / 2;//东北点
                            var x2 = x0 - a / 2 , y2 = y0 - a / 2;//西南点
                           
                            var ne = getPoi(new BMap.Pixel(x1, y1)), sw = getPoi(new BMap.Pixel(x2, y2));
                            return new BMap.Bounds(sw, ne);       
                           
                        }
                        //根据球面坐标获得平面坐标。
                        function getMecator(poi){
                            return map.getMapType().getProjection().lngLatToPoint(poi);
                        }
                        //根据平面坐标获得球面坐标。
                        function getPoi(mecator){
                            return map.getMapType().getProjection().pointToLngLat(mecator);
                        }
                     
                     
                     //根据经纬度这个点，搜索方圆附近所有的餐馆。
                        function allmap(point){
                      map.centerAndZoom(point,11);
                         var circle = new BMap.Circle(point,5000,{fillColor:"yellow", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
                         map.addOverlay(circle);
                         var local = new BMap.LocalSearch(map, {
                         renderOptions: {map: map, panel: "results"}});
                         var bounds = getSquareBounds(circle.getCenter(),circle.getRadius());
                         local.searchInBounds("中国工商银行",bounds);//以圆形为范围以餐馆为关键字进行搜索。
                      
                     }
                     
                        //获得输入框address的地址，通过地址解析，获得该地址的经纬度。记住该地址只能为上海市地区的位置。
                     function searchAddress(){ 
                     var address = document.getElementByIdx_x_x_x("address").value;         
                     var myGeo = new BMap.Geocoder();  
                      myGeo.getPoint(address, function(point){      
                     if (point) {              
                     map.addOverlay(new BMap.Marker(point));
                     map.clearOverlays();//清除由于上次事件留下的痕迹。
                        allmap(point);
                         
                           }        }, "上海市");     
                        }
                       
  