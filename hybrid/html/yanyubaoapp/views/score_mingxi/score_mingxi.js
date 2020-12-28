angular.module("score_mingxi",[])

    .controller("score_mingxi",function($scope,$http,$state,$ionicLoading,$stateParams){
    	var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
        $scope.userinfo={};
        $scope.xiaofei={};
        $scope.scorelist={};
    	var userid = $stateParams['userid'];
    	
    	  $ionicLoading.show({
            showBackdrop: false,
            template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
            duration:3000
        });
    	
    	
    	$scope.user_scorelist = function(){
    		///获取会员积分明细
    		$http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=user_scorelist",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'userid':userid}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                        $scope.userinfo = data.data;
                        if($scope.userinfo.headimgurl == ''){
                        	$scope.userinfo.headimgurl = 'images/huiyuan.jpg';
                        }
                        $scope.xiaofei = data.xiaofei;
                        $scope.scorelist = data.scorelist;
                        $scope.tishi = '';
    	                if(!$scope.scorelist){
    	                	$scope.tishi = '暂无消费记录';
    	                }
                        //$scope.log = data.xiaofei.
                        /*$scope.chongzhi_str1 = data.data.chongzhi_str1;
                        $scope.chongzhi_str2 = data.data.chongzhi_str2;
                        $scope.chongzhi_str3 = data.data.chongzhi_str3;
                        $scope.balance_type = data.data.balance_type;*/

                    }
                    //响应成功
                    // $scope.attraction=data[name];
                    $ionicLoading.hide();

                })
                .finally(function() {
                	$scope.$broadcast('scroll.refreshComplete');
                })
    	}
    	
    	$scope.user_scorelist();
    	
    });