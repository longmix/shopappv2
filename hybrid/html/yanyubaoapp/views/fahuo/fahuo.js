
angular.module("fahuo",[])

   .controller('fahuo', function($scope,$stateParams,$ionicLoading,$ionicModal,$ionicPopup,$http,$state,$ionicViewSwitcher, $timeout, $ionicScrollDelegate) {

      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
          viewData.enableBack = true;
      });
      $scope.$on('$ionicView.beforeLeave', function (event, viewData) {
          $ionicViewSwitcher.nextDirection("back");
      });
      var login_obj = get_login_info();///获取登入缓存信息
       if(!login_obj){
             $state.go("login", {}, {reload:true});
             return false;        
         }  


   var orderid = $stateParams['orderid'];
   
    
   $scope.input={};
 
    $scope.fahuo = function(){
      
      var delivery_time=document.getElementById("delivery_time").value;

       if (!$scope.input.delivery_no) { 
           $ionicLoading.show({
             animation: 'fade-in',
             showBackdrop: false,
             template:'请填写快递单号',
             duration:2000
          });

          return false;
       }

      if (!$scope.input.delivery_company) { 
           $ionicLoading.show({
             animation: 'fade-in',
             showBackdrop: false,
             template:'请填写物流公司',
             duration:2000
          });
           return false;
       }
      
       if (!$scope.input.delivery_time) { 
           $ionicLoading.show({
             animation: 'fade-in',
             showBackdrop: false,
             template:'请填写发货时间',
             duration:2000
          });
           return false;
       }

        if (!$scope.input.saler_memo) { 
           $ionicLoading.show({
             animation: 'fade-in',
             showBackdrop: false,
             template:'请填写发货备注',
             duration:2000
          });
           return false;
       }

       $ionicLoading.show({
           animation: 'fade-in',
           showBackdrop: false,
           template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
           duration:3000
        });
    
        $http({
                method: 'post',//请求方式
                url:http_server+"/index.php?g=Yanyubao&m=Shang&a=order_fahuo",//请求地址
                data:{'sellerid':login_obj.sellerid,
                      'userid':login_obj.userid,
                      'checkstr':login_obj.checkstr,
                      'orderid':orderid,
                      'delivery_no':$scope.input.delivery_no,
                      'delivery_company':$scope.input.delivery_company,
                      'delivery_time':delivery_time,
                      'saler_memo':$scope.input.saler_memo
                      }///GET请求参数
                //timeout: 8000//请求等待时间
            })
        .success(function(data){
          $ionicLoading.hide();
          if(data.code == '-1'){
            $ionicLoading.show({
               animation: 'fade-in',
              showBackdrop: false,
              template:data.msg,
              duration:2000
            });
            //跳转至登入页
               $state.go("login", {}, {reload:true});
               return false;
          }
          if(data.code == '1'){
              
            $ionicLoading.show({
               animation: 'fade-in',
              showBackdrop: false,
              template:data.msg,
              duration:2000
            });


            $timeout(function(){
                 $state.go("my_dingdan", {}, {reload:true});
            })
          
            }
        
        })
        .error(function(data,header,config,status){
    
          //处理响应失败
          // 当ajax请求出现错误时，显示一个提示信息
          $ionicLoading.show({
             animation: 'fade-in',
              showBackdrop: false,
            template:"网络延迟，请重新尝试",
            duration:2000
          });
        });

}
  
 })
    	


