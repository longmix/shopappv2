 angular.module('ionicApp', ['ionic']).config(
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

  .controller('AppCtrl', function($scope, $timeout,$http, $ionicLoading) {

                  var sellerid = get_current_sellerid();
                  //var login_info = get_login_info();
                  $scope.page=1;          

       $scope.product_list=function(){
        
           
             $http({
                method: 'post',//请求方式
                url:http_server+"/index.php?g=Yanyubao&m=Gongzhong&a=score_get_product_list",//请求地址
                data: {
                        "sellerid":sellerid,
                        "page":$scope.page,
                        "productfrom":"3"  }//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                         $scope.xiala=true;
                       $scope.product_list=data.data;
					   if(data.shop_setting && data.shop_setting.describe){
						   $scope.shop_setting_describe = data.shop_setting.describe;
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

             $scope.product_list();

///下拉加载更多
       $scope.tishi="下拉加载更多";
       $scope.loadMore=function(){

           $scope.page += 1;

         
           $http({
               method: 'post',//请求方式
               url:http_server+"/index.php?g=Yanyubao&m=Gongzhong&a=score_get_product_list",//请求地址
               data: { 
                        "sellerid":sellerid,
                        "page":$scope.page,
                        "productfrom":"3"  }///GET请求参数
           })
               .success(function(data) {
                  if(data.code == '0'){
                   
                   if(!data.data){
                         $scope.noMorePage=true;
                         $scope.tishi="没有更多数据了";
                         return false;
                       }
                    }


                    
                 
                   var length = data.data.length;
                   for (var i=0;i<length;i++)
                   {
                     $scope.product_list.push(data.data[i]);
                   }
   
                   if (data.data.length < 10) {
                       $scope.noMorePage=true;
                       $scope.tishi="没有更多数据了";
                       return false;
                   }
   
                   $scope.$broadcast('scroll.infiniteScrollComplete');

               })

       }

             $scope.detail=function(productid){

                 localStorage.setItem("productid_cash", productid);
                 window.location.href="product_detail.html?pid="+productid;

             }
    
 
  });