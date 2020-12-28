
angular.module("my_kucun",[])

    .controller("my_kucun",function($scope,$http,$state,$ionicLoading,$timeout,$ionicViewSwitcher){
    	var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
        $scope.input = {};
        $scope.tishi="上拉加载更多";
        $scope.currentPage=1;
      //获取店铺基本信息
        $scope.get_product_list = function(){
        	$ionicLoading.show({///小蓝圈缓冲
             showBackdrop: false,
	            template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
	            duration:3000
        	});
        	
        	$http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=product_list",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'currentPage':$scope.currentPage}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                    	$scope.product_lists = data.data;
                    	$ionicLoading.hide();
                       $scope.xiala=true;
                    }
                    if(data.code == '2'){
                    	$ionicLoading.show({
                         showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });


                       $scope.xiala=false;
                        $timeout(function(){  
                                 $state.go('dianpu_guanli', {}, {reload:true});
                                  $ionicViewSwitcher.nextDirection("forward");
                           },2000);

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
        $scope.get_product_list();
        
        ///下拉加载更多
        $scope.loadMore=function(){
             
              $scope.currentPage += 1;

              $http({
                   method: 'post',//请求方式
                   url: http_server+"/index.php?g=Yanyubao&m=Shang&a=product_list",//请求地址
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
    })