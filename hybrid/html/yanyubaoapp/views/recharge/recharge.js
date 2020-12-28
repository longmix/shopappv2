
var app = angular.module("recharge",[]);

app.controller("recharge",function($scope,$http,$state,$ionicLoading,$stateParams,$ionicModal){
    	var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
       
        $scope.input={};
    	var userid = $stateParams['userid'];
    	if(userid){
    		///获取头像昵称
    		$http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=recharge&action="+'get_user',//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'userid':userid}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){

                    if(data.code == '-1'){
                        alert(data.msg);
                        //跳转至登入页
                        $state.go("login", {}, {reload:true});
                        return;
                    }
                    if(data.code == '1'){
						console.log(111111111);
						console.log(data);
						console.log(111111111);
                        $scope.mobile = data.data.mobile;
                        $scope.nickname = data.data.nickname;
                        if(data.data.headimgurl == ''){
                        	$scope.headimgurl = 'images/pho.png';
                        }else{
                        	$scope.headimgurl =data.data.headimgurl;
                        }
                        $scope.chongzhi_str1 = data.data.chongzhi_str1;
                        $scope.chongzhi_str2 = data.data.chongzhi_str2;
                        $scope.chongzhi_str3 = data.data.chongzhi_str3;
                        $scope.balance_type = data.data.balance_type;

                    }
                    //响应成功
                    // $scope.attraction=data[name];
                    $ionicLoading.hide();

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
    	
    	$scope.recharge_balance = function(){
    		var balance = $scope.input.balance;
    		///充值金额或次卡
    		$http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=recharge&action="+'chongzhi',//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'userid':userid,'balance':balance}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){

                    if(data.code == '-1'){
                        alert(data.msg);
                        //跳转至登入页
                        $state.go("login", {}, {reload:true});
                        return;
                    }
                    if(data.code == '1'){
                    	 $ionicLoading.show({
                             showBackdrop: false,
                             template:data.msg,
                             //delay :2000,
                             duration:2000
                         });
                    	$state.go("member",{'wait':'1'},{reload:true});
                    	
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
    	
    	
    	$scope.reduce_balance = function(){
    		var balance = $scope.input.balance1;
    		///充值金额或次卡
    		$http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=recharge&action="+'jianzhi',//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'userid':userid,'balance':balance,'balance_type':$scope.balance_type}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){

                    if(data.code == '-1'){
                        alert(data.msg);
                        //跳转至登入页
                        $state.go("login", {}, {reload:true});
                        return;
                    }
                    if(data.code == '1'){
                    	 $scope.modal.hide();
                    	  $ionicLoading.show({
                             showBackdrop: false,
                             template:data.msg,
                             //delay :2000,
                             duration:2000
                         });
                    	 $state.go("member", {'wait':'1'}, {reload:true});
                    	 
                        // return;
                    	 
                    }
                    //响应成功
                    // $scope.attraction=data[name];
                    $ionicLoading.hide();

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
        
        
        $ionicModal.fromTemplateUrl('templates/modal.html', {
	      scope: $scope
	    }).then(function(modal) {
	      $scope.modal = modal;
	    });
})
.controller("cash_register",function($scope,$http,$state,$ionicLoading,$ionicPopup,$stateParams,$ionicModal){
    	var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
		
		console.log('aaaaaa==>>');
       
        $scope.input={};
    	var userid = $stateParams['userid'];
    	if(userid){
    		///获取头像昵称
    		$http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=recharge&action="+'get_user',//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'userid':userid}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){
					
					console.log('0000000000000000==>>');

                    if(data.code == '-1'){
                        alert(data.msg);
                        //跳转至登入页
                        $state.go("login", {}, {reload:true});
                        return;
                    }
                    if(data.code == '1'){
						console.log(111111111);
						console.log(data);
						console.log(111111111);
                        $scope.mobile = data.data.mobile;
                        $scope.nickname = data.data.nickname;
                        if(data.data.headimgurl == ''){
                        	$scope.headimgurl = 'images/pho.png';
                        }else{
                        	$scope.headimgurl =data.data.headimgurl;
                        }
                        $scope.chongzhi_str1 = data.data.chongzhi_str1;
                        $scope.chongzhi_str2 = data.data.chongzhi_str2;
                        $scope.chongzhi_str3 = data.data.chongzhi_str3;
                        $scope.balance_type = data.data.balance_type;
						
						$scope.balance_yuan = data.data.balance_yuan;
						
						console.log('111111111111111==>>'+$scope.balance_yuan);

                    }
                    //响应成功
                    // $scope.attraction=data[name];
                    $ionicLoading.hide();

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
    	
    	$scope.pay_consumed_from_shang = function(){
    		var balance = $scope.input.balance;
    		///充值金额或次卡
    		$http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=pay_consumed_from_shang&action="+'chongzhi',//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'userid':userid,'paymoney':balance}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){

                    if(data.code == '-1'){
                        alert(data.msg);
                        //跳转至登入页
                        $state.go("login", {}, {reload:true});
                        return;
                    }
                    if(data.code == '1'){
                    	 
						 /*$ionicLoading.show({
                             showBackdrop: false,
                             template:data.msg,
                             //delay :2000,
                             duration:2000
                         });
						 
                    	$state.go("member",{'wait':'1'},{reload:true});
						*/
						var alertPopup = $ionicPopup.alert({
						   title: '操作成功',
						   template: data.msg
						 });
						 alertPopup.then(function(res) {
						   //console.log('Thank you for not eating my delicious ice cream cone');
						   $state.go("member",{'wait':'1'},{reload:true});
						 });
                    	
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
    	
        
        $ionicModal.fromTemplateUrl('templates/modal.html', {
	      scope: $scope
	    }).then(function(modal) {
	      $scope.modal = modal;
	    });
})
;



