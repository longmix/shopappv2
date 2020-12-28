
angular.module("member_detail",[])

    .controller("member_detail",function($scope,$http,$state, $stateParams,$ionicLoading){
        var login_obj = get_login_info();

        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return false;
        }
        $scope.input = {};
        $scope.wanneng_biaodan = {};
        $scope.userid = $stateParams['userid'];
        

		
        // alert(JSON.stringify($scope.detail));
        //console.log($scope.detail);
        
		//$scope.detail.balance = $scope.detail.balance.replace(/余额：/, "");
        
        //获取自定义字段信息
        $http({
         method: 'post',//请求方式
         url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_member_detail",//请求地址
         data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'userid':$scope.userid}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                	 //$scope.wanneng_biaodan = data.data;
					 
					 $scope.user_info = data.data;
					 //转成毫秒格式，用来前台格式化  
					 $scope.user_info.fenxiao_info.createtime = $scope.user_info.fenxiao_info.createtime * 1000;
					 console.log(121212121);
					 console.log(data);
					 $scope.extend_info_display = data.data.extend_info_display;
					 console.log(121212121);
                     //跳转至设置页
                     //$state.go("set", {}, {reload:true});
                 }
            })
         .error(function(data,header,config,status){
              $ionicLoading.show({
               showBackdrop: false,
             template:"网络延迟，请重新尝试",
             duration:2000
             });
         });
        
});



