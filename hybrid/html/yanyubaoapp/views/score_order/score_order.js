angular.module("score_order",[])

    .controller("score_order",function($scope,$http,$state,$ionicLoading,$stateParams){
    	var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
        
    	$scope.input = {};
        $scope.tishi="上拉加载更多";
        $scope.currentPage=1;

    	$ionicLoading.show({
             showBackdrop: false,
            template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
            duration:3000
        });
    	
    	
    	$scope.get_order_list = function(){
    		///获取积分订单列表
    		$http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=score_order_list",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'currentPage':$scope.currentPage}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){
					console.log(1111111);
					console.log(data);
					console.log(1111111);
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
                        $scope.order_lists = data.data;
                        $scope.xiala=true;

                      
                    }
                     if(data.code == '2'){
                         $scope.xiala=false;
                         $ionicLoading.show({
                            showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                      
                    }
                })
                .finally(function() {
                	$scope.$broadcast('scroll.refreshComplete');
                })
    	}
    	
    	$scope.get_order_list();


          ///下拉加载更多
        $scope.loadMore=function(){
             
              $scope.currentPage += 1;

              $http({
                   method: 'post',//请求方式
                   url: http_server+"/index.php?g=Yanyubao&m=Shang&a=score_order_list",//请求地址
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
                         
                          $scope.order_lists.push(data.data[i]);
                      }
      
                      if (data.data.length < 10) {
                          $scope.noMorePage=true;
                          $scope.tishi="没有更多数据了";
                          return false;
                      }
      
                       $scope.$broadcast('scroll.infiniteScrollComplete');

                  })
          };

    	
    });