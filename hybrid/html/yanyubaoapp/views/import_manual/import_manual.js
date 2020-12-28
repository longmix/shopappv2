
angular.module("import_manual",[])

    .controller("import_manual",function($scope,$http,$state,$ionicLoading){
    	 var login_obj = get_login_info();

         if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
         }
        $scope.input = {};
         
     ////发送手机号码到消息发送队列
         $scope.import_shoudong = function(){
        	 ////获取选择的手机号码
        	 var mobile = $scope.input.mobile;
        	 var nickname = $scope.input.nickname;
        	 
        	 if(!nickname){
                  $ionicLoading.show({
               showBackdrop: false,
                     template:"请填写昵称",
                     duration:2000
                 });
                 return false;
             }
        	 
        	 if(!mobile){
                  $ionicLoading.show({
               showBackdrop: false,
                     template:"请填写手机号",
                     duration:2000
                 });
                 return false;
             }

             var reg_phone = /^1[34578]\d{9}$/;
             if (!reg_phone.test(mobile)) {
                  $ionicLoading.show({
               showBackdrop: false,
                     template:"请输入合法的手机号码",
                     duration:2000
                 });
                 return false;
             }
             
        	 $http({
                 method: 'post',//请求方式
                 url: http_server+"/index.php?g=Yanyubao&m=Shang&a=import_shoudong",
                 data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'mobile':mobile,'nickname':nickname},
                 //timeout: 8000//请求等待时间
             })
                 .success(function(data){
                     //alert(data.msg);
                    if(data.code == '-1'){
                         $ionicLoading.show({
               showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                        $state.go("login", {}, {reload:true});
                    }
                    if(data.code == '1'){
                         $ionicLoading.show({
               showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                        $state.go("member", {'wait':'1'}, {reload:true});
                    }
                    
                    if(data.code == '0'){
                         $ionicLoading.show({
               showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                        //$state.go("statistics", {}, {reload:true});
                    }

                     //响应成功
                     // $scope.attraction=data[name];
                     //$ionicLoading.hide();




                 })
                 .error(function(data,header,config,status){

                     //处理响应失败
                     // 当ajax请求出现错误时，显示一个提示信息
                      $ionicLoading.show({
               showBackdrop: false,
                         template:"网络延迟，请重新尝试",
                         duration:3000
                     });
                 });
        	 
        	 
         }
         
});



