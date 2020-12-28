
angular.module("mobile_add",[])

    .controller("mobile_add",function($scope,$http,$state,$ionicLoading,$stateParams){
    	 var login_obj = get_login_info();

         if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
         }
        $scope.input = {};
         
		 $scope.title_name = $stateParams.title_name;
		 $scope.input.mobile = $stateParams.mobile;
		 
     ////发送手机号码到消息发送队列  服务器接口不再使用 18/11/3
         $scope.mobile_send = function(){
        	 ////获取选择的手机号码
        	 var mobile = $scope.input.mobile;
        	 
        	 if(!mobile){
                  $ionicLoading.show({
               showBackdrop: false,
                     template:"请填写手机号",
                     duration:2000
                 });
                 return false;
             }

             /*var reg_phone = /^1[34578]\d{9}$/;
             if (!reg_phone.test(mobile)) {
                  $ionicLoading.show({
               showBackdrop: false,
                     template:"请输入合法的手机号码",
                     duration:2000
                 });
                 return false;
             }*/
             
        	 $http({
                 method: 'post',//请求方式
                 url: http_server+"/index.php?g=Yanyubao&m=Shang&a=sendsms_phone",
                 data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'mobile':mobile},
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
                    
                    $scope.input.mobile = ''; 
                    
                    if(data.code == '1'){
                         $ionicLoading.show({
               showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                        
                        //$state.go("member", {}, {reload:true});
                    }
                    
                    if(data.code == '2'){
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
         
		 $http({
                 method: 'post',//请求方式
                 url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_user_info&action=get",
                 data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr},
                 //timeout: 8000//请求等待时间
             })
			 .success(function(data){
				 
				$scope.input.message = data.data.sms_tmpl_invite_new;
				

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
			 
		  
		 $scope.send_sms = function(){
			var mobile = $scope.input.mobile;
			var message = $scope.input.message;
			if(!mobile){
				  $ionicLoading.show({
					showBackdrop: false,
					 template:"请填写手机号",
					 duration:2000
				 });
				 return false;
			 }

			//CONFIGURATION
			var options = {
				replaceLineBreaks: false, // true to replace \n by a new line, false by default
				android: {
					intent: 'INTENT'  // send SMS with the native android SMS messaging
					//intent: '' // send SMS without open any other app
				}
			};

			var success = function () {
				
			};
			var error = function (e) {
				
				 
				//alert('Message Failed:' + e);
			};
			sms.send(mobile, message, options, success, error);
			 

		 }
		 
				
				
});




