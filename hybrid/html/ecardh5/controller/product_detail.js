angular.module('detail', ['ionic']).config(
      //以下方法转换http post的参数请求
      function($httpProvider) {
          $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
          $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
          // Override $http service's default transformRequest
          $httpProvider.defaults.transformRequest = [function(data) {
              /**
               * The workhorse; converts an object to x-www-form-urlencoded serialization.
               * @param {Object} obj
               * @return {String}
               */
              var param = function(obj) {
                  var query = '';
                  var name, value, fullSubName, subName, subValue, innerObj, i;

                  for (name in obj) {
                      value = obj[name];

                      if (value instanceof Array) {
                          for (i = 0; i < value.length; ++i) {
                              subValue = value[i];
                              fullSubName = name + '[' + i + ']';
                              innerObj = {};
                              innerObj[fullSubName] = subValue;
                              query += param(innerObj) + '&';
                          }
                      } else if (value instanceof Object) {
                          for (subName in value) {
                              subValue = value[subName];
                              fullSubName = name + '[' + subName + ']';
                              innerObj = {};
                              innerObj[fullSubName] = subValue;
                              query += param(innerObj) + '&';
                          }
                      } else if (value !== undefined && value !== null) {
                          query += encodeURIComponent(name) + '='
                              + encodeURIComponent(value) + '&';
                      }
                  }

                  return query.length ? query.substr(0, query.length - 1) : query;
              };

              return angular.isObject(data) && String(data) !== '[object File]'
                  ? param(data)
                  : data;
          }];
      }
      
      
  )
  .config(['$locationProvider', function($locationProvider) {  
         // $locationProvider.html5Mode(true);  
         $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
        }])

  .controller('detailCtl', function($scope,$http,$ionicSlideBoxDelegate,$timeout,$window,$ionicLoading,$location,$timeout) {


     var banner_img = angular.element(document.getElementById('banner_img'));  
     var  box_width= ($window.screen.width)+'px';
     banner_img.css("height",box_width);

     //var productid = localStorage.getItem("productid_cash");
     var productid = $location.search().pid;
     $scope.productid = productid;
     console.log("跳转获取到的pid为:"+productid);

      var sellerid = get_current_sellerid();
      var login_info = get_login_info();
      $scope.input={};  
      $scope.input.first_click=true;


       $scope.product_detail=function(){
        
           
             $http({
                method: 'post',//请求方式
                url:http_server+"/index.php?g=Yanyubao&m=Gongzhong&a=score_get_product_detail",//请求地址
                data: { "userid":login_info.userid,
                        "checkstr":login_info.checkstr,
                        "sellerid":sellerid,
                        "productid":productid
                         }//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
                })
                .success(function(data){
                
                    if(data.code == '-1'){
                        $ionicLoading.show({
                           showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                      
                     
                    }
                    if(data.code == '1'){
                       
                       $scope.product_detail=data.data;
                        $ionicSlideBoxDelegate.update();
                        $ionicSlideBoxDelegate.loop(true);//循环轮播

                        var favorite = data.data.is_favorite;

                        if( favorite == '1'){
                             $scope.icon2=false;
                            $scope.icon1=true;
                           
                            
                        }else{
                           $scope.icon2=true;
                            $scope.icon1=false;
                        }
                      
                  
                    }
                    if(data.code == '0'){
                        $ionicLoading.show({
                           showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });

                     
                        
                    }
                    
                   
                })
                .error(function(data,header,config,status){

                    //处理响应失败
                    // 当ajax请求出现错误时，显示一个提示信息
                    $ionicLoading.show({
                       showBackdrop: false,
                        template:"网络延迟，请重新尝试",
                        duration:2000
                    });
                });

          }

        $scope.product_detail();

    var first_click=true;
    ///////////////////立即兑换
    $scope.product_exchange=function(price){

         
        if (first_click == true) {
             $http({
                method: 'post',//请求方式
                url:http_server+"/index.php?g=Yanyubao&m=Gongzhong&a=score_product_exchange",//请求地址
                data: { "userid":login_info.userid,
                        "checkstr":login_info.checkstr,
                        "sellerid":sellerid,
                        "productid":productid,
                        "price":price
                         }//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
                })
                .success(function(data){

                    first_click=false;

                    if(data.code == '-1'){
                        $ionicLoading.show({
                           showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                      
                     
                    }
                    if(data.code == '1'){
                       
                        $ionicLoading.show({
                           showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                        
                          $timeout(function () {
                             
                            window.location.href="jifenjilu.html";

                          }, 2000);

                  
                    }
                    if(data.code == '0'){
                        $ionicLoading.show({
                           showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });

                 

                        
                    }
                    
                   
                })
                .error(function(data,header,config,status){

                    //处理响应失败
                    // 当ajax请求出现错误时，显示一个提示信息
                    $ionicLoading.show({
                       showBackdrop: false,
                        template:"网络延迟，请重新尝试",
                        duration:2000
                    });
                });
         }else{


            $ionicLoading.show({
                            showBackdrop: false,
                            template:"请勿重复操作",
                            duration:2000
                        });

             }

    }


  ///////////////////收藏
    $scope.favorite=function(){

        $http({
                method: 'post',//请求方式
                url:http_server+"/index.php?g=Yanyubao&m=Gongzhong&a=score_favorite_mgr",//请求地址
                data: { "userid":login_info.userid,
                        "checkstr":login_info.checkstr,
                        "sellerid":sellerid,
                        "productid":productid
                         }//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
                })
                .success(function(data){
                
                    if(data.code == '-1'){
                        $ionicLoading.show({
                           showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                      
                     
                    }
                    if(data.code == '1'){
                       
                       $ionicLoading.show({
                           showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });

                       $scope.icon1=true;
                       $scope.icon2=false;
                  
                    }
                    if(data.code == '2'){
                        $ionicLoading.show({
                           showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });

                     $scope.icon1=false;
                     $scope.icon2=true;
                        
                    }
                    
                   
                })
                .error(function(data,header,config,status){

                    //处理响应失败
                    // 当ajax请求出现错误时，显示一个提示信息
                    $ionicLoading.show({
                       showBackdrop: false,
                        template:"网络延迟，请重新尝试",
                        duration:2000
                    });
                });


    }



        $scope.back_list=function(){
          window.location.href="jifen_shop.html";
        }





          //解决轮播是两张图片时的bug
       $scope.slideBanner = function(index) { 
       //console.log(index);
         $scope.slideIndex = index;  
         if ( ($ionicSlideBoxDelegate.count() -1 ) == index ) {  
             $timeout(function(){  
                 $ionicSlideBoxDelegate.slide(0);  
             },4000);  
         }  
       }
    
      
  })
  