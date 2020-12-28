angular.module("supplier_score_require",[])

    .controller("supplier_score_require",function($scope,$http,$state,$ionicLoading,$stateParams,$ionicPopup){
    	var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
        $scope.memberlist={};
        //var userid = $stateParams['userid'];
    	
        var wait = $stateParams['wait'];
        if(wait == null){
        	$ionicLoading.show({
                 showBackdrop: false,
	            template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
	            duration:3000
        	});
        }

    	$scope.currentPage=1;
    	$scope.supplier_score_require = function(){
    		///获取会员申请积分列表
    		$http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=supplier_score_require&page="+$scope.currentPage,//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){
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
                    	$scope.head_logo = data.head_logo;
                    	if($scope.head_logo == ''){
                        	$scope.head_logo = 'images/yanyubao_128.png';
                        }
                    	$scope.name = data.name;
                    	if(data.data){
                    		$scope.memberlist = data.data;
                    		console.log($scope.memberlist);
                        }else{
                    		$scope.tishi = '暂无会员积分申请需要审批';
        	            }
                       
                      
                    }
                    //响应成功
                    // $scope.attraction=data[name];
                 
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
    	
    	$scope.supplier_score_require();
    	
    	///商户审核积分申请
    	$scope.shenqing = function(shenqingid,userid,score,status){
    		
    		$http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=supplier_score_require&action=set",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'shenqingid':shenqingid,'userid':userid,'score':score,'status':status}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){
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
                    	$ionicLoading.show({
                            showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                    	//重载
                        $state.go("supplier_score_require", {'wait':'1'}, {reload:true});
                        return;
                    }
                    //响应成功
                    // $scope.attraction=data[name];
                   

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
                    
         //弹框
          $scope.showPopup = function(list) {
                       // console.log(list);return;
                       var myPopup = $ionicPopup.show({
                         template: '<p class="text-center">处理会员积分申请</p>',
                         title:'<b>积分审核</b>',
                         scope: $scope,
                         cssClass:'rate_to_app',
                         buttons: [
                        	  {
                                 text: '同意',
                                 //type: 'button-calm',
                                 onTap: function() {
                                   $scope.shenqing(list.id,list.userid,list.score,1);
                                 }
                               },
	                           { text: '拒绝' ,
	                             onTap:function(){
	                                $scope.shenqing(list.id,list.userid,list.score,2);
	                             }
	                           },
	                           { text: '取消' ,
		                             onTap:function(){
		                               
		                             }
		                        },
                           
                         ]
                       });
                      };

    	//////////////////下拉加载更多方法
        $scope.loadMore=function(){
            var start = $scope.start;
            var goods = $scope.goods;
            var now_city = $scope.now_city;
            //var p = c();


            $scope.currentPage += 1;

            ///获取会员申请积分列表
    		$http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=supplier_score_require&page="+$scope.currentPage,//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(newItems) {
                     if ( newItems.data == null){
                        $scope.noMorePage=true;
                        $scope.tishi="没有更多数据了";
                        return false;
                    }

                    var length = newItems.data.length;

                    for (var i=0;i<length;i++)
                    {
                        $scope.memberlist.push(newItems.data[i]);
                    }

                    if (newItems.data.length < 5) {
                        $scope.noMorePage=true;
                        $scope.tishi="没有更多数据了";
                        return false;
                    }

                     $scope.$broadcast('scroll.infiniteScrollComplete');

                })


            //$scope.havaMore=false;
        };
    	
    });