
angular.module("set",[])

    .controller("set_user",function($scope,$http,$state, $stateParams,$ionicLoading,$ionicModal,$cacheFactory){
        var login_obj = get_login_info();
        var color = get_color_type();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
        $scope.input={};
        
        var wait = $stateParams['wait'];
        if(wait == null){
        	 $ionicLoading.show({
                                          showBackdrop: false,
                 template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
                 duration:3000
             });
        }
       
        
        if(color.type == 'lanse'){
        	$scope.input.color = "蓝色";
        }
        if(color.type == 'chengse'){
        	$scope.input.color = "橙色";
        }
        if(color.type == 'lvse'){
        	$scope.input.color = "绿色";
        }
        
        //////////////////获取用户基本信息
        $http({
            method: 'post',//请求方式
            url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_user_info&action=get&request_form=set",//请求地址
            data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
            //timeout: 8000//请求等待时间
        })
            .success(function(data){

                if(data.code == '-1'){
                    $ionicLoading.show({
                       showBackdrop: false,
                        template:data.msg,
                        duration:3000
                    });
                    //跳转至登入页
                    $state.go("login", {}, {reload:true});
                    return;
                }
                if(data.code == '1'){
                	$scope.input.renzheng = data.data.renzheng;
                    $scope.input.name = data.data.name;
                    $scope.input.telephone = data.data.telephone;
                    $scope.input.address = data.data.address;
                    $scope.input.cardname = data.data.cardname;
                    if(!data.data.head_logo){
                    	$scope.input.head_logo = 'images/yanyubao_128.png';
                    }else{
                    	$scope.input.head_logo = data.data.head_logo;
                    }
                    $scope.input.mobile = data.data.mobile;
                }
                if(wait == null){
                	$ionicLoading.hide();
               }
                
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
        //////////////////////



        

        $scope.loginout=function(){
            localStorage.setItem("yanyubao_login_info", null);
            $state.go("login", {}, {reload:true});
            return false;
        }
		
		//清除缓存
		
		$scope.removeAll = function(){
			
			var cacheData = $cacheFactory.get('$http');
			
			cacheData.removeAll();
			
			$ionicLoading.show({
			   showBackdrop: false,
				template:"网络缓存，已清空",
				duration:2000
			});
		}

});


///////////////////////////设置商户名称(set_up1)

angular.module("set_up1",[])

    .controller("set_up1",function($scope,$http,$state,$ionicLoading,$stateParams){
        var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
        $scope.input={};
        
        console.log('页面set_up1的参数：');
        console.log($stateParams);
        
        
        if($stateParams['name']=="点击设置商户名称"){
            $scope.input.name='';
        }else{
            $scope.input.name=$stateParams['name'];
        }

        $scope.set_name=function(name){
            var shanghu_name=name;
            if(!shanghu_name){
                $ionicLoading.show({
                   showBackdrop: false,
                    template:"商户名称不能为空",
                    duration:2000
                });
                return false;
            }
            //设置商户名称
            $http({
             method: 'post',//请求方式
             url: http_server+"/index.php?g=Yanyubao&m=Shang&a=set_name&action=set",//请求地址
             data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'name':shanghu_name}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                         $ionicLoading.show({
                             showBackdrop: false,
                             template:data.msg,
                             duration:2000
                         });
                         //跳转至设置页
                         $state.go("set", {}, {reload:true});
                     }
                })
             .error(function(data,header,config,status){
                 $ionicLoading.show({
                 showBackdrop: false,
                 template:"网络延迟，请重新尝试",
                 duration:2000
                 });
             });
        }

});


///////////////////////////设置手机号码(set_up3)

angular.module("set_up3",[])

    .controller("set_up3",function($scope,$http,$state,$ionicLoading,$stateParams){
        var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
        $scope.input={};
        if($stateParams['telephone']=="点击设置手机号码"){
            $scope.input.telephone='';
        }else{
            $scope.input.telephone=$stateParams['telephone'];
        }
        $scope.set_telephone=function(telephone){
            var shanghu_telephone=telephone;

               if(!shanghu_telephone){
                    $ionicLoading.show({
                        showBackdrop: false,
                        template:"联系电话不能为空",
                        duration:2000
                    });
                    return false;
                }

            //设置商户名称
            $http({
             method: 'post',//请求方式
             url: http_server+"/index.php?g=Yanyubao&m=Shang&a=set_telephone&action=set",//请求地址
             data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'telephone':shanghu_telephone}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                         $ionicLoading.show({
                              showBackdrop: false,
                             template:data.msg,
                             duration:2000
                         });
                         //跳转至设置页
                         $state.go("set", {}, {reload:true});
                         return;
                     }
                })
             .error(function(data,header,config,status){
                 $ionicLoading.show({
                 showBackdrop: false,
                 template:"网络延迟，请重新尝试",
                 duration:2000
                 });
             });
        }

});

////////////////////////设置主题颜色(set_up4)

var set_color = angular.module("set_up4",[]);

set_color.factory('myFac', function() {  
            return {  
                changeTheme : function(themeFile) {  
                    //根据ID定位加载css的元素，将其href修改为特定css文件  
                    document.getElementById('global-css').setAttribute('href',  
                            themeFile);  
                }  
            };  
            
        }); 

set_color.controller("set_up4",function($scope,$state,$ionicLoading,myFac){
        var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
        $scope.input={};
        
        //如果是蓝色主题，使用css文件ionic.css  
        $scope.lanTheme = function() {  
            myFac.changeTheme('lib/css/ionic.css');
            set_color_type('lanse');
            $ionicLoading.show({
                showBackdrop: false,
                template:"颜色主题切换完成",
                duration:2000
            });
            return;
        }  
        //如果是橙色主题，使用css文件ionic_chengse.css  
        $scope.chengTheme = function() {  
            myFac.changeTheme('lib/css/ionic_chengse.css'); 
            set_color_type('chengse');
            $ionicLoading.show({
                 showBackdrop: false,
                template:"颜色主题切换完成",
                duration:2000
            });
            return;
        }  
        
        //如果是绿色主题，使用css文件ionic_lvse.css  
        $scope.lvTheme = function() {  
            myFac.changeTheme('lib/css/ionic_lvse.css');
            set_color_type('lvse');
            $ionicLoading.show({
                showBackdrop: false,
                template:"颜色主题切换完成",
                duration:2000
            });
            return;
        } 
        
        //如果是紫色主题，使用css文件ionic_zise.css  
        $scope.ziTheme = function() {  
            myFac.changeTheme('lib/css/ionic_zise.css');
            set_color_type('zise');
            $ionicLoading.show({
                showBackdrop: false,
                template:"颜色主题切换完成",
                duration:2000
            });
            return;
        } 


    });

////////////设置会员等级(add)

angular.module('add', [])

    .controller('add', function($scope,$http,$state, $stateParams,$ionicLoading,$ionicModal) {
       
        var login_obj = get_login_info();

        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return false;
        }
        $scope.items={};
        $scope.input={};
        
        
        $scope.set_supplier_level = function(){
            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=set_supplier_level",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'type':true}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){

                    if(data.code == '-1'){
                        $ionicLoading.show({
                            showBackdrop: false,
                            template:data.msg,
                            duration:3000
                        });
                        //跳转至登入页
                        $state.go("login", {}, {reload:true});
                        return;
                    }
                    if(data.code == '1'){
                        $scope.get_supplier_level();
                        
                    }
                    
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
          
       //获取用户积分等级
        $scope.get_supplier_level = function(){
            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=supplier_level&action=get",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){

                    if(data.code == '-1'){
                        $ionicLoading.show({
                            showBackdrop: false,
                            template:data.msg,
                            duration:3000
                        });
                        //跳转至登入页
                        $state.go("login", {}, {reload:true});
                        return;
                    }
                    if(data.code == '1'){

                        $scope.items = data.data;

                    }
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
      
        //var action = '';
        var action = $stateParams.action;
        console.log(action);
        if(!action){
            
           //先去判断该商户是否设置过积分等级
            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=supplier_level_count",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){

                    if(data.code == '-1'){
                        $ionicLoading.show({
                             showBackdrop: false,
                            template:data.msg,
                            duration:3000
                        });
                        //跳转至登入页
                        $state.go("login", {}, {reload:true});
                        return;
                    }
                    if(data.code == '1'){
                        ///若已经设置过积分等级，则获取
                        $scope.get_supplier_level();
                    }
                    if(data.code == '2'){
                        ///若未设置过积分等级，则新建四条积分等级(青铜、白银、黄金、铂金、钻石)
                        $scope.set_supplier_level();
                     }
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
          
        }else{
            $scope.get_supplier_level();
        }

        /*$scope.items = [
            { id: '黄金会员' },
            { id: '白银会员' },
            { id: '钻石会员' },
            { id: '铂金会员' }
        ];*/

        $scope.data = {
            showDelete: false
        };

        $scope.edit = function(item) {
            alert('Edit Item: ' + item.id);
        };
        $scope.share = function(item) {
            alert('Share Item: ' + item.id);
        };

        $scope.moveItem = function(item, fromIndex, toIndex) {
            $scope.items.splice(fromIndex, 1);
            $scope.items.splice(toIndex, 0, item);
        };


     //删除
        $scope.onItemDelete = function(item) {
            var levelid = item.levelid;
            //console.log(levelid);
            //删除用户积分等级
            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=supplier_level&action=del",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'levelid':levelid}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                        $ionicLoading.show({
                            showBackdrop: false,
                            template:data.msg,
                            duration:200
                        });
                        $scope.items.splice($scope.items.indexOf(item), 1);
                        //重载
                        /*$state.go("add", {'action':'all_del'}, {reload:true});
                        return;*/
                    }
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


        $scope.modalshow = function(levelid) {
            $scope.openModal();
            if(levelid){
                $scope.levelid=levelid;
              //查询用户积分等级详情
                $http({
                    method: 'post',//请求方式
                    url: http_server+"/index.php?g=Yanyubao&m=Shang&a=supplier_level&action=get_info",//请求地址
                    data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'levelid':levelid}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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

                            $scope.input.level_name = data.data.level_name;
                            $scope.input.score_from = Number(data.data.score_from);
                            $scope.input.score_to = Number(data.data.score_to);
                        }
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
        };



            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope
            }).then(function(modal) {
                //alert(model);
                $scope.modal = modal;
            });
             $scope.openModal = function() {
                    $scope.input={};
                    $scope.modal.show();
                };
            $scope.closeModal = function() {
                    $scope.modal.hide();
                 };
           //添加会员积分等级
            $scope.createContact = function(levelid) {

                var level_name = $scope.input.level_name;
                var score_from = $scope.input.score_from;
                var score_to = $scope.input.score_to;
                console.log(level_name);
                console.log(score_from);
                console.log(score_to);
                if(!level_name){
                    $ionicLoading.show({
                        showBackdrop: false,
                        template:"请输入等级名称",
                        duration:2000
                    });
                    return;
                }
                if(score_from == null || score_from < '0'){
                    $ionicLoading.show({
                        showBackdrop: false,
                        template:"请输入开始积分",
                        duration:2000
                    });
                    return;
                }
                if(!score_to){
                    $ionicLoading.show({
                        showBackdrop: false,
                        template:"请输入结束积分",
                        duration:2000
                    });
                    return;
                }
                if(score_to <= score_from){
                    $ionicLoading.show({
                        showBackdrop: false,
                        template:"结束积分必须大于开始积分",
                        duration:2000
                    });
                    return;
                }
                var score_from = Number(score_from);
                var score_to = Number(score_to);
                
                if(levelid){
                    var url = http_server+"/index.php?g=Yanyubao&m=Shang&a=supplier_level&action=edit"
                }else{
                    var url = http_server+"/index.php?g=Yanyubao&m=Shang&a=supplier_level&action=add"
                }
                //获取用户积分等级
                $http({
                    method: 'post',//请求方式
                    url: url,//请求地址
                    data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'level_name':level_name,'score_from':score_from,'score_to':score_to,'levelid':levelid}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                            $ionicLoading.show({
                                showBackdrop: false,
                                template:data.msg,
                                duration:2000
                            });
                            //重载
                            $state.go("add", {}, {reload:true});
                            return;
                            //$scope.items = data.data;

                        }
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
               
               // $scope.items.push({ level_name: u.huiyuan + ' '+ u.end});
                $scope.closeModal();
            };

    });




///////////////设置会员卡名称及背景(set_up5)

angular.module("set_up5",[])
    .controller("set_up5",function($scope,$http,$state, $stateParams,$ionicLoading,$rootScope,$ionicSlideBoxDelegate){
        var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
        $scope.input={};
        $scope.input.img_slide = 0;
        
        $ionicLoading.show({
            showBackdrop: false,
            template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
            duration:3000
        });
        
        //获取会员卡信息
         $http({
             method: 'post',//请求方式
             url: http_server+"/index.php?g=Yanyubao&m=Shang&a=send_supplier_card&action=get",//请求地址
             data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
             //timeout: 8000//请求等待时间
         })
         .success(function(data){
                console.log(data);

                if(data.code == '1'){
                    $scope.input.card_name = data.data.card_name;
                    $scope.action = "edit";

                    //$ionicSlideBoxDelegate.slide(data.slide,[]);
                    
					$scope.cardid = data.data.cardid;
                    //$scope.bg_img_slide = data.slide;
                }else{
                    $scope.action = "add";
                }
                $ionicLoading.hide();
         })
         .error(function(data,header,config,status){
             $ionicLoading.show({
             showBackdrop: false,
             template:"网络延迟，请重新尝试",
             duration:2000
             });
         });
        
        
        //获取会员卡图片列表
        $scope.get_card_bg_img = function(){
             $http({
                 method: 'post',//请求方式
                 url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_card_bg_img_list&action=1",//请求地址
                 data: {}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                 //timeout: 8000//请求等待时间
                 })
                 .success(function(data){

					 alert('aaaaaaaaaaaaaaaaaaa');
                     
						
						console.log(data);

                        $scope.bg_imgs = data;
                        $ionicSlideBoxDelegate.update();
                        
                 })
                 .error(function(data,header,config,status){
                $ionicLoading.show({                        
                     template:"网络延迟，请重新尝试",
                     duration:2000
                     });
                 });
        }
       
        
        
        ///发布会员卡
        $scope.send_supplier_card = function () {  
            var card_name = $scope.input.card_name;
            var img_slide = $scope.input.img_slide;
            if(!card_name){
                 $ionicLoading.show({
                             showBackdrop: false,
                     template:"请输入会员卡名称",
                     duration:2000
                 });
                 return;
            }
            if($scope.action == 'add'){
                var url = http_server+"/index.php?g=Yanyubao&m=Shang&a=send_supplier_card&action=add";
                var data = {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'card_name':card_name,'img_slide':img_slide};
            }
            
            if($scope.action == 'edit'){
                var url = http_server+"/index.php?g=Yanyubao&m=Shang&a=send_supplier_card&action=edit";
                var data = {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'card_name':card_name,'img_slide':img_slide,"cardid":$scope.cardid};
            }
            
            console.log(img_slide);
           
            $http({
             method: 'post',//请求方式
             url: url,//请求地址
             data: data//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
             //timeout: 8000//请求等待时间
             })
             .success(function(data){
                    console.log(data);
                    if(data.code == '1'){
                        $ionicLoading.show({
                             showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                        ///跳转至个人中心页
                        $state.go("set", {}, {reload:true});
                        return;
                    }
                    
             })
             .error(function(data,header,config,status){
                 $ionicLoading.show({
                             showBackdrop: false,
                 template:"网络延迟，请重新尝试",
                 duration:2000
                 });
             });
            
            
        };  
        
        
        
        
       
        $scope.config={enter:false,nextBtn:true};  //控制"进入"按钮是否显示；

        $scope.onSlideChanged = function(index){
            
			console.log("onSlideChanged:"+index);
			//alert("onSlideChanged:"+index);

            $scope.input.img_slide = index;
            /*if($scope.action == 'add'){
                var bg_img_slide = '0';
            }else{
                var bg_img_slide = $scope.bg_img_slide;
            }*/
            
            //$ionicSlideBoxDelegate.slide(bg_img_slide,[]);
            //                         slide 切换页索引                  slide 切换页数量
            if($ionicSlideBoxDelegate.currentIndex()==$ionicSlideBoxDelegate.slidesCount()-1){
                $scope.config.enter=true;
                $scope.config.nextBtn=false;
            }else{
                $scope.config.nextBtn=true;
            }
        };

        $scope.nextSlide=function(){            
            $ionicSlideBoxDelegate.next();           
        };
        $scope.previous=function(){
            $ionicSlideBoxDelegate.previous();
           
        };




    });

///////set_up6

angular.module("set_up6",[])

    .controller("set_up6",function($scope,$http,$state,$ionicLoading,$stateParams){
        var login_obj = get_login_info();
        

        $scope.input = {};
        //设置使用说明列表
        $http({
            method: 'post',//请求方式
            url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_help&action=get_help_list",//请求地址
            data: {}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                   $scope.input.gonggao_list=data.data;

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

//////////////现金与积分(cash_integral)
angular.module('cash_integral', [])

    .controller('cash_integral', function($scope,$http,$state, $stateParams,$ionicLoading,$ionicModal) {
        var login_obj = get_login_info();

        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return false;
        }
        $scope.input={};
        
        $ionicLoading.show({
                             showBackdrop: false,
            template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
            duration:3000
        }); 
      ///获取现金显示参数
        $http({
            method: 'post',//请求方式
            url: http_server+"/index.php?g=Yanyubao&m=Shang&a=set_supplier_card_config&action="+"get",//请求地址
            data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
            //timeout: 8000//请求等待时间
        })
            .success(function(data){

                if(data.code == '-1'){
                	$ionicLoading.show({
                        template:data.msg,
                        duration:2000
                    });
                    //跳转至登入页
                    $state.go("login", {}, {reload:true});
                    return;
                }
                if(data.code == '1'){
                     $scope.input.balance_type = data.data.balance_type;
                     $scope.input.balance1 = data.data.balance1;
                     $scope.input.balance2 = data.data.balance2;
                     $scope.input.score1 = data.data.score1;
                     $scope.input.score2 = data.data.score2;
                     
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
        
        
        
        //默认选中人民币选项
        //$scope.input.balance_type="0";
        
        $scope.set_supplier_card = function(){
            var balance_type = $scope.input.balance_type;
            var balance1 = $scope.input.balance1;
            var score1 = $scope.input.score1;
            var balance2 = $scope.input.balance2;
            var score2 = $scope.input.score2;
            
            if(!balance_type || !balance1 || !score1 || !balance2 || !score2){
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"请填写完整",
                    duration:2000
                });
            }
            
            ///设置现金显示参数
            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=set_supplier_card_config&action="+"set",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'balance_type':balance_type,'balance1':balance1,'score1':score1,'balance2':balance2,'score2':score2}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){

                    if(data.code == '-1'){
                    	$ionicLoading.show({
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
                         $state.go("set", {}, {reload:true});
                         
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
    });
///////关于APP(set_up7)

angular.module("set_up7",[])

    .controller("set_up7",function($scope){
        
		$scope.version_str01 = version_str01;
        $scope.version_code = version_code;
		$scope.version_str02 = version_str02;
       
        $scope.callPhone = function () {
              var phone = mobile_phone_number;
              // alert("拨打:" + phone);
              window.location.href = "tel:" + phone;
        };
        
        $scope.server_qq = function () {
          var qq_url = 'http://wpa.qq.com/msgrd?v=3&uin=537086268&site=qq&menu=yes';
          //alert("拨打:" + phone);
          window.location.href = qq_url;
        };
        
        $scope.guanwang = function(){
            var url = "http://www.abot.cn";
            window.location.href = url;
        };

		$scope.guanwang_in_appbrowser = function(){
            var url = "http://www.abot.cn";
            if (!cordova.InAppBrowser) {
                return;
            }
            //location：设置为yes或no来打开或关闭插件的locationbar
            //android
            //zoom：设置为yes则显示缩放浏览器页面的按钮，设置为no则不显示缩放按钮
            //hardwareback：设置为yes则调用Android返回键回到前一界面，设置为no则返回键为退出浏览器页面
            
            //ios
            // toolbar=yes 仅iOS有效,提供关闭、返回、前进三个按钮
            // toolbarposition=top/bottom 仅iOS有效,决定toolbar的位置
            // closebuttoncaption=关闭 仅iOS有效
            
            var options = 'location=no,toolbarposition=top,toolbar=yes,closebuttoncaption=返回';
            if(cordova.platformId == 'android'){
                options = 'location=yes,zoom=no,hardwareback=yes';
            }
            var ref = cordova.InAppBrowser.open(url, '_blank', options);
            ref.addEventListener('exit', function(){
                                 //跳转到首页
                                 console.log('InAppBrowser被关闭');
                                 $state.go("set", {}, {reload:true});
                                 return;
            });
        }
});

/////////////////设置商户地址(set_address)

angular.module("set_address",[])

    .controller("set_address",function($scope,$http,$state,$ionicLoading,$stateParams){
        var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
        $scope.input={};
        
        ///读取gps信息
        $scope.getGeolocation = function() {  
            function onSuccess(position) {  
              console.log(
              'Latitude纬度: '    + position.coords.latitude          + '\n' +  
              'Longitude经度: '         + position.coords.longitude         + '\n' +  
              'Altitude海拔: '          + position.coords.altitude          + '\n' +  
              'Accuracy精度: '          + position.coords.accuracy          + '\n' +  
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +  
              'Heading: '           + position.coords.heading           + '\n' +  
              'Speed: '             + position.coords.speed             + '\n' +  
              'Timestamp: '         + position.timestamp                + '\n');
              
              
              $scope.latitude = position.coords.latitude;//纬度
              $scope.longitude = position.coords.longitude;//经度
            };  
         
            function onError(error) {  
              console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');  
            }  
            navigator.geolocation.getCurrentPosition(onSuccess, onError);  
          }  
        
        $scope.getGeolocation();
        
        
        
        $scope.allProvinces = [  
            {region_id: 0, region_name: '选择省份'}  
        ]; 
        
        $scope.cities = [  
            {region_id: 0, region_name: '选择城市'}  
        ];  
      
        $scope.areas = [  
            {region_id: 0, region_name: '选择区县'}  
        ]; 
        
        
        $scope.data = {  
                selectName: "",  
                currentProvinceId: 0,  
                currentCityId: 0,  
                currentAreaId: 0  
        };  
        
        
        //获取省份列表
        $http({
         method: 'post',//请求方式
         url: http_server+"/index.php?g=Home&m=Common&a=region_data",//请求地址
         data: {'id':'1'}
         })
         .success(function(data){
                console.log(data);
                for (var i in data) {  
                    $scope.allProvinces.push(data[i]);  
                }
         })
         .error(function(data,header,config,status){
             $ionicLoading.show({
                             showBackdrop: false,
             template:"网络延迟，请重新尝试",
             duration:2000
             });
         });
        
        ///切换省份
        $scope.switchProvince = function (currentProvinceId) {  
            $scope.data.currentCityId = 0;  
            $scope.data.currentAreaId = 0;  
      
            $scope.cities.splice(1);  
            $scope.areas.splice(1);  
      
            
            //获取城市列表
            $http({
             method: 'post',//请求方式
             url: http_server+"/index.php?g=Home&m=Common&a=region_data",//请求地址
             data: {'id':currentProvinceId}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
             //timeout: 8000//请求等待时间
             })
             .success(function(data){
                    console.log(data);
                    for (var i in data) {  
                        $scope.cities.push(data[i]);  
                    }
                    
             })
             .error(function(data,header,config,status){
                 $ionicLoading.show({
                             showBackdrop: false,
                 template:"网络延迟，请重新尝试",
                 duration:2000
                 });
             });
            
            
        };  
        
        
        ///////切换省份
        $scope.switchCity = function (currentCityId) {  
            $scope.data.currentAreaId = 0;  
      
            $scope.areas.splice(1);  
      
            ////获取区县列表
            $http({
             method: 'post',//请求方式
             url: http_server+"/index.php?g=Home&m=Common&a=region_data",//请求地址
             data: {'id':currentCityId}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
             //timeout: 8000//请求等待时间
             })
             .success(function(data){
                    console.log(data);
                    for (var i in data) {  
                        $scope.areas.push(data[i]);  
                    }
                    
             })
             .error(function(data,header,config,status){
                 $ionicLoading.show({
                             showBackdrop: false,
                 template:"网络延迟，请重新尝试",
                 duration:2000
                 });
             });
            
        }; 
        
        
        
        
        ////获取商户地址信息
        $http({
         method: 'post',//请求方式
         url: http_server+"/index.php?g=Yanyubao&m=Shang&a=set_address&action=get",//请求地址
         data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr}
         //timeout: 8000//请求等待时间
         })
         .success(function(data){
                console.log(data);
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
                    if(data.province > '0'){
                        $scope.data.currentProvinceId = data.province;
                        if(data.city > '0'){
                            $scope.switchProvince(data.province);
                            $scope.data.currentCityId = data.city;
                            if(data.district > '0'){
                                $scope.switchCity(data.city);
                                $scope.data.currentAreaId = data.district; 
                            }
                        }
                    }
                    $scope.input.address = data.address; 
                     
                     
                }
       
         })
         .error(function(data,header,config,status){
             $ionicLoading.show({
                             showBackdrop: false,
             template:"网络延迟，请重新尝试",
             duration:2000
             });
         });
        

       $scope.set_shanghu_address=function(){
            var province = $scope.data.currentProvinceId;
            var city = $scope.data.currentCityId;
            var district = $scope.data.currentAreaId;
            var address = $scope.input.address;
            if(!province){
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"请选择省份",
                    duration:2000
                });
                return false;
            }
            if(!city){
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"请选择城市",
                    duration:2000
                });
                return false;
            }
            if(!district){
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"请选择区县",
                    duration:2000
                });
                return false;
            }
            if(!address){
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"请选择详细地址",
                    duration:2000
                });
                return false;
            }
            //设置商户地址
            $http({
             method: 'post',//请求方式
             url: http_server+"/index.php?g=Yanyubao&m=Shang&a=set_address&action=set",//请求地址
             data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'province':province,'city':city,'district':district,'address':address,'latitude':$scope.latitude,'longitude':$scope.longitude}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                         $ionicLoading.show({
                             showBackdrop: false,
                             template:data.msg,
                             duration:2000
                         });
                         //跳转至设置页
                         $state.go("set", {}, {reload:true});
                     }
                })
             .error(function(data,header,config,status){
                 $ionicLoading.show({
                             showBackdrop: false,
                 template:"网络延迟，请重新尝试",
                 duration:2000
                 });
             });
        }

});

/////////////////////商户简介(set_brief)

angular.module("set_brief",[])

    .controller("set_brief",function($scope,$http,$state,$ionicLoading,$stateParams){
        var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return false;
        }
        $scope.input={};

        ///获取brief
        $http({
            method: 'post',//请求方式
            url: http_server+"/index.php?g=Yanyubao&m=Shang&a=set_brief&action=get",//请求地址
            data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                    return false;
                }
                if(data.code == '1'){
                   $scope.input.brief=data.brief;
                   return false;
                }
            })
            .error(function(data,header,config,status){
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"网络延迟，请重新尝试",
                    duration:2000
                });
            });

        $scope.set_brief=function(){
           var brief=$scope.input.brief;
            //console.log(brief);return;
           if(!brief){
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"请填写简介",
                    duration:2000
                });
                return false;
            }


            //设置商户名称
            $http({
             method: 'post',//请求方式
             url: http_server+"/index.php?g=Yanyubao&m=Shang&a=set_brief&action=set",//请求地址
             data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'brief':brief}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                         return false;
                     }
                     if(data.code == '1'){
                         $ionicLoading.show({
                             showBackdrop: false,
                             template:data.msg,
                             duration:2000
                         });
                         //跳转至设置页
                         $state.go("set", {}, {reload:true});
                         return false;
                     }
                })
             .error(function(data,header,config,status){
                 $ionicLoading.show({
                             showBackdrop: false,
                 template:"网络延迟，请重新尝试",
                 duration:2000
                 });
             });
        }

});

///////////////////////设置商户电话(set_user_mobile)

angular.module("set_user_mobile",[])

    .controller("set_user_mobile",function($scope,$http,$state,$ionicLoading,$stateParams,$interval){
        var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
        $scope.input={};

        if($stateParams['mobile']=="点击设置手机号码"){
            $scope.input.mobile='';
        }else{
            $scope.input.mobile=$stateParams['mobile'];
        }


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
            var new_mobile=$scope.input.new_mobile;

            if($scope.input.mobile == undefined){
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"原手机号码不能为空",
                    duration:2000
                });
                return false;
            }

            if(!new_mobile){
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"新手机号码不能为空",
                    duration:2000
                });
                return false;
            }

            var reg_phone = /^1[34578]\d{9}$/;
            if (!reg_phone.test($scope.input.mobile)) {
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"请输入合法的手机号码",
                    duration:2000
                });
                return false;
            }

            if (!reg_phone.test(new_mobile)) {
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"请输入合法的新手机号码",
                    duration:2000
                });
                //alert("请输入合法的手机号码");
                return false;
            }

            if (new_mobile == $scope.input.mobile) {
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"新号码不能与原号码相同",
                    duration:2000
                });
                //alert("请输入合法的手机号码");
                return false;
            }

            //alert($scope.input.tokenstr);exit;

            //发送短信
            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=set_user_mobile_pre&set_mobile=1",//请求地址
                //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: {'mobile':new_mobile,'mobile_old':$scope.input.mobile, 'verifycode':$scope.input.verifycode, 'tokenstr':$scope.input.tokenstr,'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){
                    //alert(data.code);
                    $ionicLoading.show({
                             showBackdrop: false,
                        template:data.msg,
                        duration:2000
                    });

                    if(data.code == '1'){
                        //alert('aaa');
                        timerHandler=$interval(function(){
                            if(second<=0){
                                $interval.cancel(timerHandler);second=59;
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

        /////保存手机号码
        $scope.set_user_mobile=function(){
            var mobile=$scope.input.mobile;
            var new_mobile=$scope.input.new_mobile;
            var reg_phone = /^1[34578]\d{9}$/;
            var verifycode_sms=$scope.input.verifycode_sms;
            if(!mobile){
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"手机号码不能为空",
                    duration:2000

                });
                return false;
            }
            if (!reg_phone.test(mobile)) {
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"请输入合法的原手机号码",
                    duration:2000
                });
                //alert("请输入合法的手机号码");
                return false;
            }


            if(!new_mobile){
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"新手机号码不能为空",
                    duration:2000
                });
                return false;
            }

            
            if (!reg_phone.test(new_mobile)) {
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"请输入合法的新手机号码",
                    duration:2000
                });
                //alert("请输入合法的手机号码");
                return false;
            }

            if (new_mobile == mobile) {
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"新手机号码与原手机号码相同",
                    duration:2000
                });
                //alert("请输入合法的手机号码");
                return false;
            }
            if (!verifycode_sms) {
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"请输入手机验证码",
                    duration:2000
                });
                //alert("请输入合法的手机号码");
                return false;
            }


            //设置商户名称
            $http({
             method: 'post',//请求方式
             url: http_server+"/index.php?g=Yanyubao&m=Shang&a=set_user_mobile&action=set",//请求地址
             data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'new_mobile':new_mobile,'verifycode_sms':verifycode_sms}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                     
                     if(data.code == '0'){
                         $ionicLoading.show({
                             showBackdrop: false,
                             template:data.msg,
                             duration:2000
                         });
                         //跳转至设置页
                         //$state.go("set", {}, {reload:true});
                     }
                     
                     if(data.code == '1'){
                         $ionicLoading.show({
                             showBackdrop: false,
                             template:data.msg,
                             duration:2000
                         });
                         //跳转至设置页
                         $state.go("set", {}, {reload:true});
                     }
                })
             .error(function(data,header,config,status){
                 $ionicLoading.show({
                             showBackdrop: false,
                 template:"网络延迟，请重新尝试",
                 duration:2000
                 });
             });
        }

});

/////////////更换头像(change_photo)
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.camera);
}
angular.module("change_photo",[])


.controller('change_photo', function($scope,$state,$ionicActionSheet,$stateParams,$ionicLoading,$timeout){
    var login_obj = get_login_info();
    if(!login_obj){
        //跳转至登入页
        $state.go("login", {}, {reload:true});
        return;
    }
    
     
    var img = $stateParams.head_logo;
    if(!img){
        $scope.img='images/huiyuan.jpg';
    }else{
        $scope.img=img;
    }
    
    $scope.choosePicMenu = function() {
        //alert('aaa');
        var type = 'gallery';
        
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: '拍照' },
                { text: '从相册选择' }
            ],
            titleText: '选择照片',
            cancelText: '取消',
            cancel: function() {
            },
            buttonClicked: function(index) {
                if(index == 0){
                    //type = 'camera';
                    var srcType = Camera.PictureSourceType.CAMERA;
                }else if(index == 1){
                    //type = 'gallery';
                    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
                }
                var options = setOptions(srcType);
                //var func = createNewFileEntry;
                
                options.targetHeight = 1200;
                options.targetWidth = 1200;
                
                navigator.camera.getPicture(
                	function cameraSuccess(imageUri) {
                     $scope.temp_image=imageUri;
                     $scope.img=imageUri;
                     //$scope.uoload_img();
                     
                     
                    
                     //弹出缓冲提示
                     $scope.showLoadingToast();
                     //这里使用定时器是为了缓存一下加载过程，防止加载过快
                     $timeout(function () {
                       //停止缓冲提示
                       $scope.hideLoadingToast();
                     }, 2500);
                     

                }, function cameraError(error) {
                    console.debug("Unable to obtain picture: " + error, "app");
                    
                     //显示等待
                    //弹出缓冲提示
                    $scope.showLoadingToast();
                    //这里使用定时器是为了缓存一下加载过程，防止加载过快
                    $timeout(function () {
                      //停止缓冲提示
                      $scope.hideLoadingToast();
                    }, 2500);
                }, options);
                
                
                
    　　　　　　　
            }
        });
        $timeout(function() {
             hideSheet();
         }, 3000);
       
    };
    
    
    $scope.uoload_img=function(){
        //新建文件上传选项，并设置文件key，name，type
        /*console.log($scope.temp_image);
        console.log('qqqqqqq');return;*/
        var options = new FileUploadOptions();
        
        options.fileKey="ffile";
        options.fileName=$scope.temp_image.substr($scope.temp_image.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";
        //用params保存其他参数，例如昵称，年龄之类
        var params = {};
        //params['name'] = $scope.temp_name;
        params['sellerid'] = login_obj.sellerid;
        params['checkstr'] = login_obj.checkstr;
        params['fileName'] = options.fileName;
        //把params添加到options的params中
        options.params = params;
        //新建FileTransfer对象
        var ft = new FileTransfer();
        var upload_url = http_server + "/index.php?g=Yanyubao&m=Shang&a=upload_image_file";
        //上传文件
        ft.upload(
            $scope.temp_image,
            encodeURI(upload_url),//把图片及其他参数发送到这个URL，相当于一个请求，在后台接收图片及其他参数然后处理
            uploadSuccess,
            uploadError,
            options);
        //upload成功的话
        function uploadSuccess(r) {
            console.log(r);
            var resp = JSON.parse(r.response);
            if(resp.code == 1){
                $ionicLoading.show({
                             showBackdrop: false,
                    template:resp.msg,
                    duration:2000
                });
                //跳转至登入页
                $state.go("set", {}, {reload:true});
            }
            
        }
        //upload失败的话
        function uploadError(error) {
            $ionicLoading.show({
                             showBackdrop: false,
                template:"头像上传失败",
                duration:2000
            });
            //跳转至登入页
            $state.go("set", {}, {reload:true});
        }
    }
    
     
    $scope.showLoadingToast = function () {
        // Setup the loader
        $ionicLoading.show({
                             showBackdrop: false,
          template: '请稍后...',
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
      }
      $scope.hideLoadingToast = function () {
        $ionicLoading.hide();
      }
    
    
    
})


  function setOptions(srcType) {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,  //Corrects Android orientation quirks
      saveToPhotoAlbum: true
    }
    return options;
  }


///


/*var app = angular.module('change_photo', []);

app.controller('change_photo', function($scope, fileReader) {
console.log("controller");
$scope.getFile = function() {
fileReader.readAsDataUrl($scope.file, $scope)
.then(function(result) {
$scope.imageSrc = result;
});
};

});

app.directive('fileModel', ['$parse', function($parse) {
return {
restrict: 'A',
link: function(scope, element, attrs, ngModel) {
var model = $parse(attrs.fileModel);
var modelSetter = model.assign;
element.bind('change', function(event) {
scope.$apply(function() {
modelSetter(scope, element[0].files[0]);
});
//附件预览
console.log("directive");
scope.file = (event.srcElement || event.target).files[0];
scope.getFile();
});
}
};
}]);

app.factory('fileReader', ["$q", "$log", function($q, $log) {
var onLoad = function(reader, deferred, scope) {
return function() {
scope.$apply(function() {
deferred.resolve(reader.result);
});
};
};

var onError = function(reader, deferred, scope) {
return function() {
scope.$apply(function() {
deferred.reject(reader.result);
});
};
};

var getReader = function(deferred, scope) {
var reader = new FileReader();
reader.onload = onLoad(reader, deferred, scope);
reader.onerror = onError(reader, deferred, scope);
return reader;
};
console.log("factory");
var readAsDataURL = function(file, scope) {
var deferred = $q.defer();
var reader = getReader(deferred, scope);
reader.readAsDataURL(file);
return deferred.promise;
};

return {
readAsDataUrl: readAsDataURL
};
}])*/


///////////////添加商户风采图片(shanghu_imgs)
angular.module('shanghu_imgs', [])

    .controller('shanghu_imgs', function($scope,$http,$state, $stateParams,$ionicLoading,$timeout,$ionicPopup) {
        var login_obj = get_login_info();

        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return false;
        }
        $scope.items={};
        $scope.input={};
        $ionicLoading.show({
                             showBackdrop: false,
            template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
            duration:3000
        });
        
        $scope.get_shanghu_imgs=function(){
            //请求商户图片
            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=shanghu_imgs&action=get",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){

                    if(data.code == '-1'){
                        $ionicLoading.show({
                             showBackdrop: false,
                            template:data.msg,
                            duration:3000
                        });
                        //跳转至登入页
                        $state.go("login", {}, {reload:true});
                        return;
                    }
                    
                    if(data.code == '1'){
                        //alert(data.data);
                        $scope.items = data.data;
                    }
                    if(data.code == '2'){
                        $ionicPopup.show({
                            template:"<p style='text-align: center'>您暂无商户图片</p>",
                            title:"友情提示",
                            scope: $scope,
                            buttons:[
                                {text:"取消",
                                    
                                    onTap:function(){
                                     
                                   }
                                },
                                
                                {text:"添加",
                                    
                                    onTap:function(){
                                         $scope.shanghu_img_add();
                                    }
                                }
                            ]
                        })
                        
                    }
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
        
        $scope.get_shanghu_imgs();
        
        $scope.shanghu_img_add=function() {
            //alert('aaa');
            var type = 'gallery';
            var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
            var options = setOptions(srcType);
           
            options.targetHeight = 1200;
            options.targetWidth = 1200;
            
            navigator.camera.getPicture(function cameraSuccess(imageUri) {
                 $scope.temp_image=imageUri;
                 
                 $scope.uoload_img();
                 
                 //弹出缓冲提示
                 $scope.showLoadingToast();
                 //这里使用定时器是为了缓存一下加载过程，防止加载过快
                 $timeout(function () {
                   //停止缓冲提示
                   $scope.hideLoadingToast();
                 }, 2500);
                 

            }, function cameraError(error) {
                console.debug("Unable to obtain picture: " + error, "app");
                
                 //显示等待
                //弹出缓冲提示
                $scope.showLoadingToast();
                //这里使用定时器是为了缓存一下加载过程，防止加载过快
                $timeout(function () {
                  //停止缓冲提示
                  $scope.hideLoadingToast();
                }, 2500);
            }, options);
                    
           
           
        };
        
        
        $scope.uoload_img=function(){
            //新建文件上传选项，并设置文件key，name，type
            /*console.log($scope.temp_image);
            console.log('qqqqqqq');return;*/
            var options = new FileUploadOptions();
            
            options.fileKey="ffile";
            options.fileName=$scope.temp_image.substr($scope.temp_image.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            //用params保存其他参数，例如昵称，年龄之类
            var params = {};
            //params['name'] = $scope.temp_name;
            params['sellerid'] = login_obj.sellerid;
            params['checkstr'] = login_obj.checkstr;
            params['fileName'] = options.fileName;
            //把params添加到options的params中
            options.params = params;
            //新建FileTransfer对象
            var ft = new FileTransfer();
            var upload_url = http_server + "/index.php?g=Yanyubao&m=Shang&a=upload_image_file&action="+'upload_shanghu_img';
            //上传文件
            ft.upload(
                $scope.temp_image,
                encodeURI(upload_url),//把图片及其他参数发送到这个URL，相当于一个请求，在后台接收图片及其他参数然后处理
                uploadSuccess,
                uploadError,
                options);
            //upload成功的话
            function uploadSuccess(r) {
                console.log(r);
                var resp = JSON.parse(r.response);
                if(resp.code == 1){
                    //alert(resp.img_url);
                    $ionicLoading.show({
                             showBackdrop: false,
                        template:"图片添加成功",
                        duration:2000
                    });
                    $scope.get_shanghu_imgs();
                    //$scope.img=resp.img_url;
                    //跳转至登入页
                    //$state.go("set", {}, {reload:true});
                }
                
            }
            //upload失败的话
            function uploadError(error) {
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"头像上传失败",
                    duration:2000
                });
                //跳转至登入页
                $state.go("set", {}, {reload:true});
            }
        }
        
        
         
        $scope.showLoadingToast = function () {
            // Setup the loader
            $ionicLoading.show({
                             showBackdrop: false,
              template: '请稍后...',
              content: 'Loading',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });
          }
          $scope.hideLoadingToast = function () {
            $ionicLoading.hide();
          }
        
        
        
        
        
      

        ///////////删除图片
        $scope.onItemDelete = function(item) {
            console.log(item);
            
            var imgid = item.imgid;
            console.log(imgid);
            //////////////////删除用户积分等级
            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=shanghu_imgs&action=del",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'imgid':imgid}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                        $ionicLoading.show({
                             showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                        
                        $scope.items.splice($scope.items.indexOf(item), 1);
                        //重载
                       // $state.go("shanghu_imgs", {}, {reload:true});
                       // return;
                    }
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


        
        ////图片排序
        $scope.moveItem = function(item, fromIndex, toIndex) {
            console.log(fromIndex);
            console.log(toIndex);
            var imgid = item.imgid;
          
            //////////////////改变商户图片排序
            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=shanghu_imgs_seq",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'imgid':imgid,'fromindex':fromIndex,'toindex':toIndex}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                        $ionicLoading.show({
                             showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                        
                        $scope.items.splice(fromIndex, 1);
                        $scope.items.splice(toIndex, 0, item);
                        //重载
                       // $state.go("shanghu_imgs", {}, {reload:true});
                       // return;
                    }
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



function setOptions(srcType) {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
  }
///////////////意见反馈
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.camera);
}

angular.module("yijianfankui",[])


.controller('yijianfankui', function($scope,$state,$http,$ionicActionSheet,$ionicLoading,$timeout){
    var login_obj = get_login_info();
    if(!login_obj){
        //跳转至登入页
        $state.go("login", {}, {reload:true});
        return;
    }
    $scope.input={};
    $scope.input.isshow=false;
    
    
    $scope.choosePicMenu = function() {
        //alert('aaa');
        var type = 'gallery';
        
        var hideSheet = $ionicActionSheet.show({
            buttons: [
               // { text: '拍照' },
                { text: '从相册选择' }
            ],
            titleText: '选择照片',
            cancelText: '取消',
            cancel: function() {
            },
            buttonClicked: function(index) {
                if(index == 10){
                    //type = 'camera';
                    var srcType = Camera.PictureSourceType.CAMERA;
                }else if(index == 0){
                    //type = 'gallery';
                    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
                }
                var options = setOptions(srcType);
                //var func = createNewFileEntry;
                
                options.targetHeight = 1200;
                options.targetWidth =1200;
                
                navigator.camera.getPicture(function cameraSuccess(imageUri) {
                     $scope.temp_image=imageUri;
                     $scope.input.pic01=imageUri;
                     $scope.input.isshow=true;
                     //$scope.uoload_img();
                     
                     
                    
                     //弹出缓冲提示
                     $scope.showLoadingToast();
                     //这里使用定时器是为了缓存一下加载过程，防止加载过快
                     $timeout(function () {
                       //停止缓冲提示
                       $scope.hideLoadingToast();
                     }, 500);
                     

                }, function cameraError(error) {
                    console.debug("Unable to obtain picture: " + error, "app");
                    
                     /*//显示等待
                    //弹出缓冲提示
                    $scope.showLoadingToast();
                    //这里使用定时器是为了缓存一下加载过程，防止加载过快
                    $timeout(function () {
                      //停止缓冲提示
                      $scope.hideLoadingToast();
                    }, 2500);*/
                }, options);
                
                
                
    　　　　　　　
            }
        });
        $timeout(function() {
             hideSheet();
         }, 3000);
       
    };
    
    
    $scope.submit_yijian=function(){
        
        var yijian = $scope.input.yijian;
        if(!yijian){
            $ionicLoading.show({
                             showBackdrop: false,
                template:"请填写意见反馈",
                duration:2000
            });
            return;
        }
        if(!$scope.temp_image){
            
           //存储意见反馈,不带图
            $http({
                method: 'post',//请求方式
                url: http_server + "/index.php?g=Yanyubao&m=Shang&a=submit_yijian",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'content':yijian}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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

                        $ionicLoading.show({
                             showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                        //跳转至登入页
                        $state.go("set", {'wait':'1'}, {reload:true});
                        return;
                    }
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
       
            
            
        }else{
            var options = new FileUploadOptions();
            
            options.fileKey="ffile";
            options.fileName=$scope.temp_image.substr($scope.temp_image.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            //用params保存其他参数，例如昵称，年龄之类
            var params = {};
            params['content'] = yijian;
            params['sellerid'] = login_obj.sellerid;
            params['checkstr'] = login_obj.checkstr;
            params['fileName'] = options.fileName;
            //把params添加到options的params中
            options.params = params;
            //新建FileTransfer对象
            var ft = new FileTransfer();
            var upload_url = http_server + "/index.php?g=Yanyubao&m=Shang&a=submit_yijian";
            //上传文件
            ft.upload(
                $scope.temp_image,
                encodeURI(upload_url),//把图片及其他参数发送到这个URL，相当于一个请求，在后台接收图片及其他参数然后处理
                uploadSuccess,
                uploadError,
                options);
            //upload成功的话
            function uploadSuccess(r) {
                console.log(r);
                var resp = JSON.parse(r.response);
                
                if(resp.code == '-1'){
                    $ionicLoading.show({
                             showBackdrop: false,
                        template:resp.msg,
                        duration:2000
                    });
                    //跳转至登入页
                    $state.go("login", {}, {reload:true});
                    return;
                }
                
                if(resp.code == 1){
                    $ionicLoading.show({
                             showBackdrop: false,
                        template:resp.msg,
                        duration:2000
                    });
                    //跳转至登入页
                    $state.go("set", {}, {reload:true});
                    return;
                }
                
            }
            //upload失败的话
            function uploadError(error) {
                $ionicLoading.show({
                             showBackdrop: false,
                    template:"头像上传失败",
                    duration:2000
                });
                //跳转至登入页
                $state.go("set", {}, {reload:true});
            }
        }
        
    }
    
     
    $scope.showLoadingToast = function () {
        // Setup the loader
        $ionicLoading.show({
                             showBackdrop: false,
          template: '请稍后...',
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
      }
      $scope.hideLoadingToast = function () {
        $ionicLoading.hide();
      }
    
    
    
})


  function setOptions(srcType) {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
  }



////////help

angular.module("help",['ngSanitize'])

    .controller("help",function($scope,$http,$state,$ionicLoading,$stateParams,$sce){
        var login_obj = get_login_info();
        
        $scope.input={};
        $ionicLoading.show({
                             showBackdrop: false,
            template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
            duration:3000
        });
        var action=$stateParams['action'];
        if(!action){
            var gonggaoid=$stateParams['gonggaoid'];
            console.log(gonggaoid);

               //设置使用说明列表
               $http({
                    method: 'post',//请求方式
                    url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_help&action=get_help_info",//请求地址
                    data: {'gonggaoid':gonggaoid}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                           $scope.input.title=data.data.title;
                           $scope.input.content=data.data.content;
                        }
                        $ionicLoading.hide();
                    })
                    .error(function(data,header,config,status){
                        $ionicLoading.show({
                             showBackdrop: false,
                            template:"网络延迟，请重新尝试",
                            duration:2000
                        });
                    });
        }else{
            //请求隐私声明文章
            
            $http({
                 method: 'post',//请求方式
                 url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_help_yinsi&action="+action,//请求地址
                 data: {}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                        $scope.input.title=data.data.title;
                        $scope.input.content=$sce.trustAsHtml(data.data.content);
                     }
                 })
                 .error(function(data,header,config,status){
                     $ionicLoading.show({
                             showBackdrop: false,
                         template:"网络延迟，请重新尝试",
                         duration:2000
                     });
                 });
        }
        


});

/////////短信包管理
angular.module("duanxin_manage",[])

    .controller("duanxin_manage",function($scope,$http,$state,$ionicLoading,$stateParams){
        var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
        $scope.input={};
      
        ///获取短信管理界面数据
        $scope.get_sms = function (){
             $http({
                 method: 'post',//请求方式
                 url: http_server+"/index.php?g=Yanyubao&m=Shang&a=sms_log&action="+'get',
                 data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr},
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
                        return;
                    }
                    if(data.code == '1'){
                        $scope.input.sms_balance = data.sms_balance;
                        $scope.input.send_yesterday = data.send_yesterday;
                        $scope.input.send_today = data.send_today;
                    }
                
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
        
        $scope.get_sms();

});


///////短信明细列表
angular.module("duanxin_mingxi",[])

    .controller("duanxin_mingxi",function($scope,$http,$state,$ionicLoading,$ionicPopup){
         var login_obj = get_login_info();
         if(!login_obj){
             //跳转至登入页
             $state.go("login", {}, {reload:true});
             return;
         }
         $scope.input={};
         $scope.tishi="上拉加载更多";
         $scope.currentPage=1;
         $ionicLoading.show({
                             showBackdrop: false,
             template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
             duration:3000
         });
         ///获取短信管理界面数据
         $scope.get_sms_list = function (){
             $http({
                  method: 'post',//请求方式
                  url: http_server+"/index.php?g=Yanyubao&m=Shang&a=sms_log&page=1&action="+'get_list',
                  data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr},
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
                         return;
                     }
                     if(data.code == '1'){
                         $scope.items = data.data;
                     }
                     if(data.code == '2'){
                         $ionicPopup.show({
                             template:"<p style='text-align: center'>您暂未使用短信邀请过会员<br/>快去邀请吧</p>",
                             title:"友情提示",
                             scope: $scope,
                             buttons:[
                                 {text:"取消",
                                    
                                    onTap:function(){
                                         $state.go("duanxin_manage", {}, {reload:true});
                                         return;
                                    }
                                 },
                                 
                                 {text:"前往",
                                     
                                     onTap:function(){
                                         $state.go("tongxunlu", {}, {reload:true});
                                          return;
                                     }
                                 }
                             ]
                         })
                     }
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
         
         $scope.get_sms_list();
         
         //下拉加载更多方法


         $scope.loadMore=function(){
             var start = $scope.start;
             var goods = $scope.goods;
             var now_city = $scope.now_city;
             //var p = c();


             $scope.currentPage += 1;

             $http({
                 method: 'post',//请求方式
                 url: http_server+"/index.php?g=Yanyubao&m=Shang&a=sms_log&page="+$scope.currentPage+'&action='+'get_list',//请求地址
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
                         $scope.items.push(newItems.data[i]);
                     }

                     if (newItems.data.length < 10) {
                         $scope.noMorePage=true;
                         $scope.tishi="没有更多数据了";
                         return false;
                     }

                      $scope.$broadcast('scroll.infiniteScrollComplete');

                 })


             //$scope.havaMore=false;
         };
});


/////////微信包管理

angular.module("weixin_manage",[])

    .controller("weixin_manage",function($scope,$http,$state,$ionicLoading,$stateParams){
        var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
        $scope.input={};
      
        ///获取微信管理界面数据
        $scope.get_sms = function (){
             $http({
                 method: 'post',//请求方式
                 url: http_server+"/index.php?g=Yanyubao&m=Shang&a=weixin_log&action="+'get',
                 data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr},
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
                        return;
                    }
                    if(data.code == '1'){
                        $scope.input.weixin_balance = data.weixin_balance;
                        $scope.input.send_yesterday = data.send_yesterday;
                        $scope.input.send_today = data.send_today;
                    }
                    
                  
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
        
        $scope.get_sms();

});











