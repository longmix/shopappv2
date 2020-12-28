
var app = angular.module("set_password",[])
    app.controller("set_password",function($scope,$http,$state,$ionicLoading,$stateParams){
    	var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
        $scope.input = {};
        $scope.mobile = $stateParams['mobile'];
        $scope.password = '';
        ////修改密码
        $scope.change_password = function(){
        	//console.log($scope.input.password);
        	if(!$scope.input.password){
        		$ionicLoading.show({
                    showBackdrop: false,
                    template:"请输入密码",
                    duration:2000
                });
                return;
        	}
        	
        	if($scope.input.password == $scope.password){
        		$ionicLoading.show({
                    showBackdrop: false,
                    template:"请勿重复提交该密码",
                    duration:2000
                });
                return;
        	}
        	
        	$http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=change_password",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'password':$scope.input.password}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                    $scope.password = $scope.input.password;
                	$ionicLoading.show({
                        showBackdrop: false,
                        template:data.msg,
                        duration:2000
                    });
                    	
                    
                    //响应成功
                    // $scope.attraction=data[name];
                    //$ionicLoading.hide();

                })
                .error(function(data,header,config,status){

                    //处理响应失败
                    // 当ajax请求出现错误时，显示一个提示信息
                    $ionicLoading.show({
                        template:"网络延迟，请重新尝试",
                        duration:2000
                    });
                });
        }
       
});



