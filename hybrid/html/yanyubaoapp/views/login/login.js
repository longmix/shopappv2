
angular.module("login",[]).config(
    //以下方法转换http post的参数请求
    function($httpProvider) {
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function(obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '='
                            + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]'
                ? param(data)
                : data;
        }];
    }
)

    .controller("shanghu_login",function($scope,$http,$state, $stateParams,$ionicLoading,$interval,$ionicModal){

    // set_login_info('aasasdds', '435435435');
    //var login_obj = get_login_info();
    //alert(login_obj.sellerid);
   
    //第三方登录页面
     $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });
      
      // $scope.createContact = function(u) {        
      //   $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
      //   // $scope.modal.hide();
      // };
    
    
    $scope.input={};
    console.log(http_server);
    //初始化请求获取tokenstr

        $scope.get_verify=function() {

            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_tokenstr",//请求地址
                params: {}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){
                    if(data.code == '1'){
                        //alert('ad');
                        $scope.verify = http_server+"/index.php?g=Yanyubao&m=Shang&a=getverifycodeimg&tokenstr="+data.tokenstr;
                        $scope.input.tokenstr = data.tokenstr;
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
        };

        $scope.get_verify();


    ////发送验证码
    $scope.canClick=false;
    $scope.description="发送验证码";
    var second=59;
    var timerHandler;
    $scope.getTestCode=function(){
        //判断手机号不能为空
      // var tel = $scope.telephone;
        //alert($scope.input.mobile);
        if($scope.input.mobile == undefined){
             $ionicLoading.show({
               showBackdrop: false,
                template:"请填写手机号",
                duration:2000
            });
            return false;
        }

        var reg_phone = /^1[23456789]\d{9}$/;
        if (!reg_phone.test($scope.input.mobile)) {
             $ionicLoading.show({
               showBackdrop: false,
                template:"请输入合法的手机号码",
                duration:2000
            });
            return false;
        }

        //alert($scope.input.tokenstr);exit;

        //发送短信
        $http({
            method: 'post',//请求方式
            url: http_server+"/index.php?g=Yanyubao&m=Shang&a=sendsms",//请求地址
            //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {'mobile':$scope.input.mobile, 'verifycode':$scope.input.verifycode, 'tokenstr':$scope.input.tokenstr}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
            //timeout: 8000//请求等待时间
        })
            .success(function(data){
                //alert(data.msg);
                 $ionicLoading.show({
               showBackdrop: false,
                    template:data.msg,
                    duration:3000
                });

                if(data.code == '1'){
                    //alert('aaa');
                    timerHandler=$interval(function(){
                        if(second<=0){
                            $interval.cancel(timerHandler);
                            second=59;
                            $scope.description="发送验证码";
                            $scope.canClick=false;
                        }else{
                            $scope.description=second+"s后重发";
                            second--;
                            $scope.canClick=true;
                        }
                    },1000)

                }
                else{
                    //如果没有发送短信，则需要再次输入图形验证以发送短信
                    $scope.verify = http_server+"/index.php?g=Yanyubao&m=Shang&a=getverifycodeimg&tokenstr="+data.tokenstr;
                    $scope.input.tokenstr = data.tokenstr;
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




         };

    $scope.shangLogin=function() {

        //判断手机号不能为空
        // var tel = $scope.telephone;
        // alert(tel);
        if (!$scope.input.mobile) {
             $ionicLoading.show({
               showBackdrop: false,
                template:"请填写手机号",
                duration:2000
            });
            //alert("请填写手机号");
            return false;
        }

        var reg_phone = /^1[23456789]\d{9}$/;
        if (!reg_phone.test($scope.input.mobile)) {
             $ionicLoading.show({
               showBackdrop: false,
                template:"请输入合法的手机号码",
                duration:2000
            });
            //alert("请输入合法的手机号码");
            return false;
        }
        
        var rand_str = localStorage.getItem("yanyubao_rand_str");
        //开始登录
        $http({
            method: 'post',//请求方式
            url: http_server+"/index.php?g=Yanyubao&m=Shang&a=login",//请求地址
            //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {'mobile':$scope.input.mobile, 'verifycode_sms':$scope.input.verifycode_sms, 'tokenstr':$scope.input.tokenstr, 'rand_str':rand_str}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
            //timeout: 8000//请求等待时间
        })
            .success(function(data){
                //alert(data.msg);
                 $ionicLoading.show({
                    showBackdrop: false,
                    template:data.msg,
                    duration:1500
                });

                if(data.code == '1'){
                    set_login_info(data.sellerid, data.checkstr);
                    //alert(data.name);
                    if(data.name == ''){//注册
                        //跳转至首页
                        $state.go("set", {}, {reload:true});
                        return;
                    }else{//登入
                        //跳转至设置页
                        $state.go("shouye", {}, {reload:true});
                        return;
                    }
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
    };

 

});