
angular.module("score_product",[])

    .controller("score_product",function($scope,$http,$state,$ionicLoading,$timeout,$ionicViewSwitcher){

         
     var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            $ionicViewSwitcher.nextDirection("forward");

            return;
        }
        $scope.input = {};
        $scope.tishi="上拉加载更多";
        $scope.currentPage=1;
      //获取店铺基本信息
        $scope.score_product_list = function(){
          $ionicLoading.show({///小蓝圈缓冲
                 showBackdrop: false,
                 template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
                 duration:3000
          });
          
          $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=score_product_list",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'currentPage':$scope.currentPage}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){
                    $ionicLoading.hide();
                    if(data.code == '-1'){
                         $ionicLoading.show({
                           showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                        //跳转至登入页
                        $state.go("login", {}, {reload:true});
                        return;
                    }
                    if(data.code == '1'){
                         $scope.product_lists = data.data;
                         $ionicLoading.hide();
                         $scope.xiala=true;

                          angular.forEach($scope.product_lists, function (val,i) {
                            var number=val.status;
                              if (number == '1') {
                            
                                 val.upload=true;

                              }
                              else if(number == '2'){

                                  val.upload=true;

                              }
                              else {
                             
                               
                                val.shenhe=true;

                              }
                        
                                                                     
                          })
                    }
                    if(data.code == '2'){
                         $ionicLoading.show({
                            showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });


                       $scope.xiala=false;
                        // $timeout(function(){  
                        //          $state.go('dianpu_guanli', {}, {reload:true});
                        //           $ionicViewSwitcher.nextDirection("forward");
                        //    },2000);

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
        $scope.score_product_list();
        
        ///下拉加载更多
        $scope.loadMore=function(){
             
              $scope.currentPage += 1;

              $http({
                   method: 'post',//请求方式
                   url: http_server+"/index.php?g=Yanyubao&m=Shang&a=score_product_list",//请求地址
                   data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'currentPage':$scope.currentPage}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                  //timeout: 8000//请求等待时间
              })
                  .success(function(data) {
                      if (data.code == '2'){
                          $scope.noMorePage=true;
                          $scope.tishi="没有更多数据了";
                          return false;
                      }

                      var length = data.data.length;
      
                      for (var i=0;i<length;i++)

                      {    
                          angular.forEach($scope.product_lists, function (val) {
                            var number=val.status;
                           if (number == '1') {
                            
                                 val.upload=true;
                              }
                              else if(number == '2'){

                                  val.upload=true;

                              }
                              else {
                             
                               
                                val.shenhe=true;

                              }
                                                                     
                          })
                          $scope.product_lists.push(data.data[i]);
                      }
      
                      if (data.data.length < 10) {
                          $scope.noMorePage=true;
                          $scope.tishi="没有更多数据了";
                          return false;
                      }
      
                       $scope.$broadcast('scroll.infiniteScrollComplete');

                  })
          };



          //////上下架操作
          $scope.caozuo=function(productid,status,index){
            // console.log(status);
           if (status == '1') {
            $scope.type='2';
            }
           else{
              $scope.type='1';
           }
           

                    


             $http({
                method: 'post',//请求方式
                url:http_server+"/index.php?g=Yanyubao&m=Shang&a=score_product_update",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'productid':productid,'status':$scope.type}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
              })
                .success(function(data){

                    if(data.code == '-1'){
                         $ionicLoading.show({
                             showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                        //跳转至登入页
                        $state.go("login", {}, {reload:true});
                        return;
                      }
                    if(data.code == '1'){
                      
                        if (status == '1') {

                           $scope.product_lists[index].status='2';
                          
                           $scope.product_lists[index].operate_str='上架';
                         }
                        if (status == '2') {
                           $scope.product_lists[index].status='1';
                           
                           $scope.product_lists[index].operate_str='下架';
                        }


                        $ionicLoading.show({
                             showBackdrop: false,
                            template:data.msg,
                            duration:1500
                        });
                                         
                       
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
                         showBackdrop: false,
                        template:"网络延迟，请重新尝试",
                        duration:2000
                    });
                });

          }
    })