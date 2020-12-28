angular.module("shouye",[])
.directive('slideScroll', function($window, $timeout) {
 return {
  restrict: 'AE',
  link: function(scope, element, attr) {
   var itsWatch = scope.$watch("its", function(newvalue, oldvalue) {
     itsWatch();
     var i = 0; //element是ul
     var length = element[0].children.length;
     //alert(length);
     var widthwindow = $window.innerWidth - 20;
     var firstwidth = element[0].children[0].children[0].offsetWidth;
     setInterval(function() {
      if(i == length) {
       i = 0;//初始位置
       element[0].style.top = "0px";
      }
      var topscorll = -(i * 24);
      //var widthself = element[0].children[i].children[0].offsetWidth; //widthself：292
      feeltoTop(topscorll)
      i++;
     }, 2000)
     //向上滚动
     function feeltoTop(topscorll){ //console.log(topscorll):topscorll是top值
      var buchang = -10;
      var feelTimer = setInterval(function(){
       element[0].style.top = parseInt(element[0].style.top) + buchang + "px";
       if(parseInt(element[0].style.top) <= topscorll){
        element[0].style.top = topscorll + "px";
        window.clearInterval(feelTimer);
       }
      },100);
     }
   })
  }
 }
})
.controller("shouye",function($scope,$http,$state, $stateParams,$timeout,$ionicLoading,$ionicPopup,$ionicSlideBoxDelegate,$ionicScrollDelegate){
   
  $scope.$on("$ionicView.beforeEnter", function() {

        var login_obj = get_login_info();
		
        $scope.input={};
		
        $scope.callmobile = function () {
              var phone = mobile_phone_number;
              //alert("拨打:" + phone);
              window.location.href = "tel:" + phone;
        };
        //读缓存先写一遍数据
        //var cache_shouye = cache.get("cache_shouye");
        var cache_shouye = localStorage.getItem("cache_shouye");///读取基本信息缓存
    	  var cache_common_app_toutiao = localStorage.getItem("common_app_toutiao");///读取头条缓存
        var cash_common_app_img_list = localStorage.getItem("common_app_img_list");///读取平铺图片缓存
        var cash_common_app_img_gundong = localStorage.getItem("common_app_img_gundong");///读取滚动图片缓存




        //console.log(cache_shouye);
    	//console.log(cache_common_app_toutiao);
        if(cache_shouye){
        	var cache_data_shouye = JSON.parse(cache_shouye);
        	$scope.input.name = cache_data_shouye.name;
            $scope.input.telephone = cache_data_shouye.telephone;
            $scope.input.user_num = cache_data_shouye.user_num;
            $scope.input.score_send = cache_data_shouye.score_send;
            $scope.input.score_receive = cache_data_shouye.score_receive;
            $scope.input.youhui_num = cache_data_shouye.youhui_num;
            $scope.input.score_song_num = cache_data_shouye.score_song_num;
            $scope.input.mobile = cache_data_shouye.mobile;
            if(cache_data_shouye.head_logo==''){
                $scope.input.head_logo = "images/yanyubao_128.png";
            }else{
                $scope.input.head_logo = cache_data_shouye.head_logo;
            }
            $scope.input.balcance_log_count = cache_data_shouye.balcance_log_count;
        }
        if(cache_common_app_toutiao){
        	$scope.common_app_toutiao = JSON.parse(cache_common_app_toutiao);
        }

        if(cash_common_app_img_list){
          $scope.common_app_img_list = JSON.parse(cash_common_app_img_list);
        }


        if(cash_common_app_img_gundong){
			$scope.common_app_img_gundong = JSON.parse(cash_common_app_img_gundong);
			$ionicSlideBoxDelegate.update();
			$ionicSlideBoxDelegate.loop(true);//循环轮播
        }
        
        if(!login_obj){
        	$scope.shangla=false;
            $scope.input.name="您的商户名称";
            $scope.input.head_logo="images/yanyubao_128.png";
            $scope.input.telephone="15800000000";
            $scope.input.user_num = '888888';
            $scope.input.score_send = '0';
            $scope.input.score_receive = '0';
            $scope.input.youhui_num = '0';
            $scope.input.balcance_log_count = '￥888.88';
            $scope.input.score_song_num = '0';
            $scope.common_app_toutiao = JSON.parse('[{"msg":"您还有1000条赠送短信尚未使用，点击查看详情，了解详情请致电18101942132","url":"location::duanxin_manage"}]');
            
            login_obj = new Object();
            login_obj.sellerid = '';
            login_obj.checkstr = '';
        }
        
        if(login_obj){
        	//console.log('ccccccccccccc');

            $scope.shangla=true;
            //////////////////获取用户基本信息
            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_user_info&action=get&request_form=shouye",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'ver_code':version_code}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //cache:cache
                //timeout: 8000//请求等待时间
            })
                .success(function(data){
                	if(data.code == '-1'){
                        del_login_info();

                        $ionicLoading.show({
                            showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                        //跳转至登入页
                        $state.go("login", {}, {reload:true});
                        return;
                    }
                    else if(data.code == '1'){
                    	//var cache_shouye = localStorage.getItem("cache_shouye");///读取基本信息缓存
                    	//var cache_common_app_toutiao = localStorage.getItem("common_app_toutiao");///读取头条缓存
                    	
                    	
                    	if(data.data){
                    		var data_shouye = JSON.stringify(data.data);
                        	if(cache_shouye != data_shouye){//比较缓存
                        		//cache.put("cache_shouye",data_shouye);//更新缓存
                        		    localStorage.setItem("cache_shouye",data_shouye);//更新基本信息缓存
                        		    $scope.input.name = data.data.name;
                                $scope.input.telephone = data.data.telephone;
                                $scope.input.user_num = data.data.user_num;
                                $scope.input.score_send = data.data.score_send;
                                $scope.input.score_receive = data.data.score_receive;
                                $scope.input.youhui_num = data.data.youhui_num;
                                $scope.input.score_song_num = data.data.score_song_num;
                                $scope.input.mobile = data.data.mobile;
                                if(data.data.head_logo==''){
                                    $scope.input.head_logo = "images/yanyubao_128.png";
                                }else{
                                    $scope.input.head_logo = data.data.head_logo;
                                }
                                $scope.input.balcance_log_count = data.data.balcance_log_count;
                                
                        	}
                    	}
                    	
                    	var common_app_toutiao = JSON.stringify(data.common_app_toutiao);
                    	console.log('new:'+common_app_toutiao);
                    	console.log('old:'+cache_common_app_toutiao);
                    	
                    	if(cache_common_app_toutiao != common_app_toutiao){
                			localStorage.setItem("common_app_toutiao",common_app_toutiao);//更新头条缓存
                			$scope.common_app_toutiao = data.common_app_toutiao;
                		 }
						 
						 var common_app_img_list = JSON.stringify(data.common_app_img_list);
							
						 if(cash_common_app_img_list != common_app_img_list){
						  localStorage.setItem("common_app_img_list",common_app_img_list);//更新图片缓存
						  $scope.common_app_img_list = data.common_app_img_list;
						 }
							

						 var common_app_img_gundong = JSON.stringify(data.common_app_img_gundong);

						 if(cash_common_app_img_gundong != common_app_img_gundong){
							  localStorage.setItem("common_app_img_gundong",common_app_img_gundong);//更新图片缓存

							  if(data.common_app_img_gundong){
									  
									  $scope.common_app_img_gundong = data.common_app_img_gundong;
									  $ionicSlideBoxDelegate.update();
									  $ionicSlideBoxDelegate.loop(true);//循环轮播
								}
						 
						 }

                        

                    	//版本更新提示
                    	if(data.update_app_msg){
                    		if(data.update_app_msg.code == '1'){
                            	$ionicPopup.show({
                                    template:"<p style='text-align: center'>"+data.update_app_msg.msg+"</p>",
                                    title:"更新 提示",
                                    scope: $scope,
                                    buttons:[
                                        {text:"下次再说",
                                        	onTap:function(){
                                        		
                                        	 }
                                        },
                                        
                                        {text:"立即更新",
                                            
                                            onTap:function(){
                                            	window.location.href = data.update_app_msg.url;
                                            }
                                        }
                                    ]
                                })
                            }
                    	}
                    	/////引导用户去评论的弹出框内容
                    	else if(data.rate){
                    		//localStorage.removeItem(data.rate.version_id);
                    		var rate_to_app = localStorage.getItem(data.rate.version_id);
                        	console.log(rate_to_app);
                        	if(!rate_to_app){
                            	
                            	$ionicPopup.show({
                                    template:"<p style='text-align: center'>"+data.rate.content+"</p>",
                                    title:data.rate.title,
                                    scope: $scope,
                                    cssClass:'rate_to_app',
                                    buttons:[
                                        {text:data.rate.button1_text,
                                        	onTap:function(){
                                        		if(data.rate.button1_url){
                                        			if(data.rate.button1_url.indexOf("location::") == 0){
                                        				 var str = data.rate.button1_url;
                                        				 var url = str.replace(/location::/, "");
                                        				 $state.go(url, {}, {reload:true});
                                        			}else{
                                        				window.location.href = data.rate.button1_url;
                                            		}
                                        		}
                                        		localStorage.setItem(data.rate.version_id, '1');
                                        	 }
                                        },
                                        
                                        {text:data.rate.button2_text,
                                            
                                            onTap:function(){
                                            	if(data.rate.button2_url){
                                            		if(data.rate.button2_url.indexOf("location::") == 0){
    	                                   				 var str = data.rate.button2_url;
    	                                   				 var url = str.replace(/location::/, "");
    	                                   				 $state.go(url, {}, {reload:true});
                                            		}else{
                                            			window.location.href = data.rate.button2_url;
                                            		}
                                        		}
                                            	localStorage.setItem(data.rate.version_id, '1');
                                            }
                                        },
                                        {text:data.rate.button3_text,
                                            
                                            onTap:function(){
                                            	if(data.rate.button3_url){
                                            		if(data.rate.button3_url.indexOf("location::") == 0){
    	                                   				 var str = data.rate.button3_url;
    	                                   				 var url = str.replace(/location::/, "");
    	                                   				 $state.go(url, {}, {reload:true});
    	                                       		}else{
    	                                       			window.location.href = data.rate.button3_url;
    	                                       		}
                                            	}
                                            	localStorage.setItem(data.rate.version_id, '1');
                                            }
                                        }
                                    ]
                                })
                            }
                    	}
                    	//弹出普通消息
                    	else if(data.common_app_msg){
                    		$ionicPopup.show({
                                template:"<p style='text-align: center'>"+data.common_app_msg.msg+"</p>",
                                title:"友情提示",
                                scope: $scope,
                                buttons:[
                                    {text:"下次再说",
                                    	onTap:function(){
                                    		
                                    	 }
                                    },
                                    
                                    {text:"前往",
                                        
                                        onTap:function(){
                                        	if(data.common_app_msg.url.indexOf("location::") == 0){
                               				 	var str = data.common_app_msg.url;
                               				 	var url = str.replace(/location::/, "");
                                   				if(data.common_app_msg.key){
                                   					
                                   					var name = data.common_app_msg.key;
                                   					var options = {};
                                   					options[name] = data.common_app_msg.value;
                                   					
                                   					console.log('111111111111111111111111111111');
                                   					console.log(JSON.stringify(options));
                                   					
                                   					$state.go(url, options, {reload:true});
                                   					/*
                                   					if(data.common_app_msg.url.indexOf("yingxiao_detail") > 0){//查看文章,写死imgid
                                						$state.go(url, {'imgid':data.common_app_msg.value}, {reload:true});
                                					}else{
                                						var name = data.common_app_msg.key;
                                       					$state.go(url, {name:data.common_app_msg.value}, {reload:true});
                                					}*/
                                   				}else{
                                   					$state.go(url, {}, {reload:true});
                                   				}
                                   				
                                   			}else{
                                   				 window.location.href = data.common_app_msg.url;
                                       		}
                                        }
                                    }
                                ]
                            })
                    	}
                    	
                     }
                })
                .error(function(data,header,config,status){
                	//处理响应失败
                    // 当ajax请求出现错误时，显示一个提示信息
                    $ionicLoading.show({
                        template:"网络延迟，请重新尝试",
                        duration:3000
                    });
                });
            //////////////////////
        }else{
             
            
        }
        
       $scope.toutiao_jump = function(info){
    	   if(info.url.indexOf("location::") == 0){
			 	var str = info.url;
			 	var url = str.replace(/location::/, "");
  				if(info.key){
  					var name = info.key;
  					
  					//var options = new Object();
  					var options = {};
  					options[name] = info.value;	//用变量作为键值创建对象
  					console.log(JSON.stringify(options));
  					
  					$state.go(url, options, {reload:true});//若头条带参数
  					//$state.go(url, {'imgid':info.value}, {reload:true});//若头条带参数
  				}else{
  					$state.go(url, {}, {reload:true});
  				}
  				
  			}else if(info.url.indexOf("inappbrowser::") == 0){
				var str = info.url;
				var url = str.replace(/inappbrowser::/, "");
				$scope.jump_InAppBrowser(url);
			}
			else{
  				 window.location.href = info.url;
      		}
       }
        
        $scope.doRefresh = function() {
        	console.log('aaaaaaaaaaa:'+login_obj.sellerid);
        	if(!login_obj.sellerid){
        		return;
        	}
        	
            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_user_info&action=get",//请求地址
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
                    }
                    if(data.code == '1'){

                    	if(data.data){
                    		var data_shouye = JSON.stringify(data.data);
                        	localStorage.setItem("cache_shouye",data_shouye);//更新缓存
                    		$scope.input.name = data.data.name;
                            $scope.input.telephone = data.data.telephone;
                            $scope.input.user_num = data.data.user_num;
                            $scope.input.score_send = data.data.score_send;
                            $scope.input.score_receive = data.data.score_receive;
                            $scope.input.youhui_num = data.data.youhui_num;
                            if(data.data.head_logo==''){
                                $scope.input.head_logo = "images/yanyubao_128.png";
                            }else{
                                $scope.input.head_logo = data.data.head_logo;
                            }
                            $scope.input.balcance_log_count = data.data.balcance_log_count;
                    	}
                        
                        var common_app_toutiao = JSON.stringify(data.common_app_toutiao);
                    	//console.log(common_app_toutiao);
                    	
                    	if(cache_common_app_toutiao != common_app_toutiao){
                			localStorage.setItem("common_app_toutiao",common_app_toutiao);//更新头条缓存
                			$scope.common_app_toutiao = data.common_app_toutiao;
                		}
                    }
                })
                .finally(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                })
            
        };


        $scope.yemian_tiaozhuan=function(url){

            if (!login_obj) {
                  $state.go("login", {}, {reload:true});
                
            }else{
     
                // 
                        if (url == 'change_photo') {
                           $state.go(url, {'head_logo':$scope.input.head_logo}, {reload:true});
                        }

                        else if(url == 'set_up3'){

                           $state.go(url, {'telephone':$scope.input.telephone}, {reload:true});
                        
                        }

                        else{
                            $state.go(url, {}, {reload:true});
                        }
                }

        }

     //解决轮播是两张图片时的bug
      $scope.slideBanner = function (index) {
          //console.log(index);
          $scope.slideIndex = index;
          if (($ionicSlideBoxDelegate.count() - 1 ) == index) {
              $timeout(function () {
                  $ionicSlideBoxDelegate.slide(0);
              }, 4000);
          }
      };




      /////////////预览跳转
      $scope.yulan_tioazhuan=function(canshu,type){
     
         $http({
            method: 'post',//请求方式
            url: http_server+"/index.php?g=Yanyubao&m=Shang&a=goto_url",//请求地址
            data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'goto':canshu}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
            //timeout: 8000//请求等待时间
          })
            .success(function(data){

                if(data.code == '1'){
                
	                 var url= data.url;
	                 console.log(url);
	                 if(type == 'inappbrowser'){
	                	 $scope.jump_InAppBrowser(url);
	                 }else{
	                	 window.location.href = url;
	                 }
               }
     

            })
            .error(function(data,header,config,status){

                //处理响应失败
                // 当ajax请求出现错误时，显示一个提示信息
                $ionicLoading.show({
                    template:"网络延迟，请重新尝试",
                    duration:3000
                });
            });




         }
      
      
      $scope.jump_InAppBrowser=function(url){
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
              //options = 'location=yes,zoom=no,hardwareback=yes';
               options = 'location=no,zoom=no,hardwareback=yes';
          }
           else if(cordova.platformId == 'ios'){
               StatusBar.hide();
           }
           //StatusBar.styleBlackTranslucent();
           
          var ref = cordova.InAppBrowser.open(url, '_blank', options);
          ref.addEventListener('exit', function(){
                               //StatusBar.show();
                               if(cordova.platformId == 'ios'){
                                   StatusBar.show();
                               }
                               
                               //跳转到首页
                               console.log('InAppBrowser被关闭');
                               $state.go("shouye", {}, {reload:true});
                               return;
          });
      }
      
      //服务市场
      $scope.server = function(){
    	  if(!login_obj){
              //跳转至登入页
              $state.go("login", {}, {reload:true});
              return;
          }
    	  
    	  $http({
              method: 'post',//请求方式
              url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_shop_shang_url",//请求地址
              //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
              //timeout: 8000//请求等待时间
          })
              .success(function(data){
                  console.log(data);
                  if(data.code == '1'){
                      //alert(data.shop_shang_url);
                      /*url = data.shop_shang_url;
                      console.log(url);
                      console.log(data.shop_shang_url);*/
                      
                      var url = data.shop_shang_url;
                      window.location.href = url;
                      //console.log(url);
                      /*if (!cordova.InAppBrowser) {
                          return;
                      }*/
                      //location：设置为yes或no来打开或关闭插件的locationbar
                      //android
                      //zoom：设置为yes则显示缩放浏览器页面的按钮，设置为no则不显示缩放按钮
                      //hardwareback：设置为yes则调用Android返回键回到前一界面，设置为no则返回键为退出浏览器页面
                      
                      //ios
                      // toolbar=yes 仅iOS有效,提供关闭、返回、前进三个按钮
                      // toolbarposition=top/bottom 仅iOS有效,决定toolbar的位置
                      // closebuttoncaption=关闭 仅iOS有效
                      
                      /*var options = 'location=no,toolbarposition=top,toolbar=yes,closebuttoncaption=返回';
                      if(cordova.platformId == 'android'){
                          //options = 'location=yes,zoom=no,hardwareback=yes';
                           options = 'location=no,zoom=no,hardwareback=yes';
                      }
                       else if(cordova.platformId == 'ios'){
                           StatusBar.hide();
                       }
                       //StatusBar.styleBlackTranslucent();
                       
                      var ref = cordova.InAppBrowser.open(url, '_blank', options);
                      ref.addEventListener('exit', function(){
                                           //StatusBar.show();
                                           if(cordova.platformId == 'ios'){
                                               StatusBar.show();
                                           }
                                           
                                           //跳转到首页
                                           console.log('InAppBrowser被关闭');
                                           $state.go("shouye", {}, {reload:true});
                                           return;
                      });*/
                      //cordova.InAppBrowser.open(url, '_blank', 'location=no,hardwareback=yes,zoom=yes');
                  }
                  else if(data.code == -1){
                      del_login_info();

                      $ionicLoading.show({
                          showBackdrop: false,
                          template:data.msg,
                          duration:2000
                      });
                      //跳转至登入页
                      $state.go("login", {}, {reload:true});
                      return;
                  }

                  //$scope.myUrl=$sce.trustAsResourceUrl(url);
              })
              .error(function(data,header,config,status){
                  //处理响应失败
                  // 当ajax请求出现错误时，显示一个提示信息
                  $ionicLoading.show({
                      template:"网络延迟，请重新尝试",
                      duration:3000
                  });
              });
      }
     

    })



 });
 
/////////////会员列表(member)

angular.module("member",[])

.controller("user_list",function($scope,$http,$state, $stateParams,$ionicActionSheet,$ionicLoading,$timeout,$ionicPopup,$ionicModal){
        
        var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
        $scope.input={};
        $scope.tishi="上拉加载更多";
        $scope.currentPage=1;
        console.log("登录信息：");console.log(login_obj);
        var wait = $stateParams['wait'];
        if(wait == null){
        	$ionicLoading.show({
                showBackdrop: false,
	            template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
	            duration:3000
        	});
        }
        
        
        $http({
            method: 'post',//请求方式
            url: http_server+"/index.php?g=Yanyubao&m=Shang&a=user_list",//请求地址
            data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'currentPage':$scope.currentPage}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                    $ionicPopup.show({
                        template:"<p style='text-align: center'>您暂无会员<br/>快去秀二维码吧</p>",
                        title:"友情提示",
                        scope: $scope,
                        buttons:[
                            {text:"取消",
                                
                                onTap:function(){
                                	//$state.go("shouye", {}, {reload:true});
                                    //return;
                               }
                            },
                            
                            {text:"前往",
                                
                                onTap:function(){
                                     $state.go("xiu", {}, {reload:true});
                                     return;
                                }
                            }
                        ]
                    })
                    
                   
                   
                }
                if(data.code == '1'){
                    $scope.userlist = data.data;
					
                    $scope.call_phone=function(phone){

                          window.location.href = "tel:" + phone; 
                    }
                    

                }
                //响应成功
                if(wait == null){
                	$ionicLoading.hide();
                }
                

            })
            .error(function(data,header,config,status){

                //处理响应失败
                // 当ajax请求出现错误时，显示一个提示信息
                $ionicLoading.show({
                    template:"网络延迟，请重新尝试",
                    duration:3000
                });
            });
      ///下拉加载更多会员
      $scope.loadMore=function(){
            
            var start = $scope.start;
            var goods = $scope.goods;
            var now_city = $scope.now_city;
            //var p = c();


            $scope.currentPage += 1;

            $http({
                method: 'post',//请求方式
                 url: http_server+"/index.php?g=Yanyubao&m=Shang&a=user_list",//请求地址
            data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'currentPage':$scope.currentPage}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data) {
                    if (data.code == '2'){
                        $scope.noMorePage=true;
                        $scope.tishi="没有更多数据了";
                        return false;
                    }

                    var length = data.data.length;
    
                    for (var i=0;i<length;i++)
                    {
                        $scope.userlist.push(data.data[i]);
                    }
    
                    if (data.data.length < 10) {
                        $scope.noMorePage=true;
                        $scope.tishi="没有更多会员了";
                        return false;
                    }
    
                     $scope.$broadcast('scroll.infiniteScrollComplete');

                })


            //$scope.havaMore=false;
        };
        
        /////根据手机号搜索会员
        $scope.find_member = function(){
            var mobile = $scope.input.mobile;
            if(!mobile){
                $ionicLoading.show({
                     showBackdrop: false,
                    template:"手机号码不能为空",
                    duration:2000
                });
                return false;
            }
            
            /*
            var reg_phone = /^1[34578]\d{9}$/;
            if (!reg_phone.test(mobile)) {
                $ionicLoading.show({
                    template:"请输入合法的手机号码",
                    duration:2000
                });
                return false;
            }*/
            
            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=user_list&action="+'search_member',//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'mobile':mobile}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                            template:"未找到绑定该手机号的会员",
                            duration:2000
                        });
                        $scope.input.mobile = null;
                        return false;
                    }
                    if(data.code == '1'){
                        $scope.userlist = data.data;
                        $scope.input.mobile = null;
                        $scope.modal.hide();

                    }
                    //响应成功
                    // $scope.attraction=data[name];
                    $ionicLoading.hide();

                })
                .error(function(data,header,config,status){

                    //处理响应失败
                    // 当ajax请求出现错误时，显示一个提示信息
                    $ionicLoading.show({
                        template:"网络延迟，请重新尝试",
                        duration:3000
                    });
                });
            
        }
        
        
        
        //向上弹出层
        $scope.show = function() {

                  var hideSheet = $ionicActionSheet.show({
                      buttons: [
                        { text: '通讯录添加' },
                        { text: '手机号添加' },
                        { text: '手动录入(修改昵称)' }
                      ],
                      titleText: '添加会员方式',
                      cancelText: '取消',
                      cancel: function() {
                           // add cancel code..
                         },
                      buttonClicked: function(index) {
                        if(index == 0){
                            $state.go("tongxunlu", {}, {reload:true});
                        }
                        else if(index == 1){
                            $state.go("mobile_add", {'title_name':'会员添加'}, {reload:true});

                        }
                        else if(index == 2){
                        	$state.go("import_manual", {}, {reload:true});///手动录入会员
                        }
                      }
                  });

                  $timeout(function() {
                      hideSheet();
                  }, 3000);

              }
        
   $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });


})

////////////////////秀二维码列表///////////////////////
.controller("xiu", function($scope,$http,$state, $stateParams,$ionicActionSheet,$ionicLoading,$timeout,$ionicPopup,$ionicModal){
	
	console.log('aaaaaaaaaaaaaaaaa');
        
        var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
		
        $http({
	            method: 'post',//请求方式
	            url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_qrcode_xiaochengxu",//请求地址
	            data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
	            //timeout: 8000//请求等待时间
	        })
	            .success(function(data){
	            	
	                if(data.code == '1'){
					
	                    console.log(data.qrcode_img_url);
	                    $scope.qrcode_img_url = data.qrcode_img_url;
		                    
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

});



//////////////////////发优惠券(coupons_send)

angular.module("coupons_send",[])

    .controller("coupons_send",function($scope,$http,$state, $stateParams,$ionicLoading){

        var login_obj = get_login_info();

        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
        }

        $scope.input={};
        
        
        //$scope.input.coupon_begin="2014-01-02T11:42:13";
        $scope.clientSideList = [
            { text: "新会员券", value: "xinhuiyuan" },
            { text: "活动推送券", value: "huodongtui" },
            { text: "活动领取券", value: "huodongling" }

        ];
        /*{ text: "分享激活券", value: "fenxiang" }*/
        $scope.data = {
            clientSide: 'xinhuiyuan'
        };
        
        $scope.moban='-1';
        /////////////读取模板信息
        $http({
            method: 'post',//请求方式
            url: http_server+"/index.php?g=Yanyubao&m=Shang&a=youhui_template_list",
            data: {},
            //timeout: 8000//请求等待时间
        })
            .success(function(data){
                $scope.input.moban=data;
            })
        
       ////
       
            
       ////选择模板
       $scope.change_moban=function(x){
            if(x == '-1'){
                $scope.input.coupon='';
                $scope.data.clientSide="xinhuiyuan";
                $scope.input.score='';
                $scope.input.coupon_nums='';
                $scope.input.coupon_days='';
                $scope.input.coupon_neirong='';
                $scope.input.coupon_shiyong='';
            }
            angular.forEach($scope.input.moban, function(data){
                if(data.templateid == x){
                    var moban_info = data;
                    console.log(moban_info);
                    //去赋值
                    $scope.input.coupon=moban_info.coupon;
                    $scope.data.clientSide=moban_info.coupon_type;
                    $scope.input.score=moban_info.score;
                    $scope.input.coupon_nums=moban_info.coupon_nums;
                    $scope.input.coupon_days=moban_info.coupon_days;
                    $scope.input.coupon_neirong=moban_info.coupon_neirong.replace(/<br\/>/gi,'\r\n');
                    $scope.input.coupon_shiyong=moban_info.coupon_shiyong.replace(/<br\/>/gi,'\r\n');

                    if (moban_info.coupon_type == "huodongling") {
                        $scope.allow=false;
                    }
                }
            });
        }
        //////  

        var youhuiid = $stateParams.youhuiid;
        if(youhuiid != null){//修改时读取数据
            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=youhui_send",
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'youhuiid':youhuiid},
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
                    }
                    $scope.input.coupon=data.data.coupon_name;
                    $scope.input.coupon_neirong=data.data.coupon_content.replace(/<br\/>/gi,'\r\n');
                    $scope.data.clientSide=data.data.coupon_type;
                    $scope.input.coupon_nums=data.data.coupon_total;
                    //$scope.input.coupon_begin='2017-04-10T10:10';
                    document.getElementById("coupon_begin").value=data.data.date_begin;
                    //$scope.input.coupon_end='2017-05-10T10:10';
                    document.getElementById("coupon_end").value=data.data.date_end;
                    $scope.input.coupon_days=data.data.expire_days;
                    $scope.input.coupon_shiyong=data.data.memo.replace(/<br\/>/gi,'\r\n');
                    $scope.input.score=data.data.score;

                    //$state.go("shouye", {}, {reload:true});
                   })
                .error(function(data,header,config,status){

                    //处理响应失败
                    // 当ajax请求出现错误时，显示一个提示信息
                    $ionicLoading.show({
                         showBackdrop: false,
                        template:"网络延迟，未获取到优惠券明细",
                        duration:2000
                    });
                });
        }else{
            $scope.allow=true;
            $scope.input.score='0';
            $scope.change_allow=function(){
                if($scope.data.clientSide == 'huodongling'){
                    $scope.allow=false;
                    $scope.input.score='100';
                }else{
                    $scope.allow=true;
                    $scope.input.score='0';
                }

            }
        }

          $scope.coupon_fafang=function(){

            var coupon = $scope.input.coupon;//名称
            var coupon_neirong = $scope.input.coupon_neirong;//优惠内容
            var coupon_type = $scope.data.clientSide;//类型
            var score = $scope.input.score;//需扣除积分量
            var coupon_nums = $scope.input.coupon_nums;//数量
            var coupon_begin = document.getElementById("coupon_begin").value;//$scope.input.coupon_begin;//有效期开始时间
            var coupon_end = document.getElementById("coupon_end").value;
            var coupon_days = $scope.input.coupon_days;//有效期
            var coupon_shiyong = $scope.input.coupon_shiyong;//使用说明
            //alert(coupon);alert(coupon_neirong);alert(coupon_type);alert(coupon_nums);alert(coupon_begin);alert(coupon_end);alert(coupon_days);
            // var coupon_begin =new Date($scope.input.coupon_begin).valueOf();//有效期开始时间
            //var coupon_end = new Date($scope.input.coupon_end).valueOf();//有效期结束时间
            //alert(coupon_end);
            //alert(coupon_end);return;

            if(!coupon){
                $ionicLoading.show({
                     showBackdrop: false,
                    template:"请输入优惠券名称",
                    duration:3000
                });
                return;

            }

            if(!score){
                $ionicLoading.show({
                     showBackdrop: false,
                    template:"请输入领取优惠券需扣除的积分量",
                    duration:3000
                });
                return;
            }

            if(!coupon_nums){
                $ionicLoading.show({
                     showBackdrop: false,
                    template:"请输入优惠券数量",
                    duration:3000
                });
                return;
            }

            if(!coupon_days){
                $ionicLoading.show({
                     showBackdrop: false,
                    template:"请输入有效期天数",
                    duration:3000
                });
                return;
            }
            //alert(coupon_begin);
            if(!coupon_begin){
                $ionicLoading.show({
                     showBackdrop: false,
                    template:"请输入有效期开始时间",
                    duration:3000
                });
                return;
            }

            if(!coupon_end){
                $ionicLoading.show({
                     showBackdrop: false,
                    template:"请输入有效期结束时间",
                    duration:3000
                });
                return;
            }

            if(coupon_end < coupon_begin){
                $ionicLoading.show({
                     showBackdrop: false,
                    template:"有效期结束时间必须大于开始时间!",
                    duration:3000
                });
                return;
            }

            var action = $stateParams.action;
            console.log(coupon_shiyong);
            if(action == 'edit'){
                var url = http_server+"/index.php?g=Yanyubao&m=Shang&a=youhui_send&action=edit";//请求地址
                var data = {'youhuiid':youhuiid,'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'coupon_name':coupon,'coupon_content':coupon_neirong,'coupon_type':coupon_type,
                    'score':score,'coupon_total':coupon_nums,'date_begin':coupon_begin,'date_end':coupon_end,'expire_days':coupon_days,'memo':coupon_shiyong}

            }else{
                var url = http_server+"/index.php?g=Yanyubao&m=Shang&a=youhui_send&action=add";//请求地址
                var data = {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'coupon_name':coupon,'coupon_content':coupon_neirong,'coupon_type':coupon_type,
                    'score':score,'coupon_total':coupon_nums,'date_begin':coupon_begin,'date_end':coupon_end,'expire_days':coupon_days,'memo':coupon_shiyong}
            }

           $http({
                method: 'post',//请求方式
                url: url,
                data: data//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){
                    //alert(data.msg);
                   if(data.code == '-1'){
                       $ionicLoading.show({
                         showBackdrop: false,
                           template:data.msg,
                           duration:3000
                       });
                       $state.go("login", {}, {reload:true});
                   }
                   if(data.code == '1'){
                       $ionicLoading.show({
                         showBackdrop: false,
                           template:data.msg,
                           duration:3000
                       });
                       $state.go("statistics", {}, {reload:true});
                   }

                    //响应成功
                    // $scope.attraction=data[name];
                    //$ionicLoading.hide();




                })
                .error(function(data,header,config,status){

                    //处理响应失败
                    // 当ajax请求出现错误时，显示一个提示信息
                    $ionicLoading.show({
                        template:"网络延迟，请重新尝试",
                        duration:3000
                    });
                });

        }

    });

////////////////////商户头条(toutiao_list)

angular.module("toutiao_list",['ngAnimate'])

    .controller("toutiao_list",function($scope,$http,$state, $ionicPopup,$ionicLoading){
        var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
        }
        $scope.input={};
        $scope.tishi="上拉加载更多";
        $scope.currentPage=1;
        $ionicLoading.show({
            showBackdrop:false,
            template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
            duration:3000
        });
        
     $scope.toutiao_list = function(){
         
        ///获取商户头条列表
         $http({
             method: 'post',//请求方式
             url: http_weiduke_server+"/index.php?g=Home&m=Yanyubao&a=toutiao",//请求地址
             data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'action':'list','currentpage':$scope.currentPage}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
             //timeout: 8000//请求等待时间
         })
             .success(function(data){
                   $ionicLoading.hide();
                 if(data.code == '-1'){

                    $scope.xiala=false;
                     $ionicLoading.show({
                         showBackdrop: false,
                         template: data.msg,
                         duration:2000
                     });

                    $state.go("login", {}, {reload:true});
                 }
                 
                 if(data.code == '1'){
                    $scope.xiala=true;
                     $scope.items = data.data;
                    
                 }
             
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
     $scope.toutiao_list();  
     
     
     //下拉加载更多方法
     
     $scope.loadMore=function(){
        
         var start = $scope.start;
         var goods = $scope.goods;
         var now_city = $scope.now_city;
         //var p = c();


         $scope.currentPage += 1;

         $http({
             method: 'post',//请求方式
             url: http_weiduke_server+"/index.php?g=Home&m=Yanyubao&a=toutiao",//请求地址
             data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'action':'list','currentpage':$scope.currentPage}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
             //timeout: 8000//请求等待时间
         })
             .success(function(data) {
                if (data.code == '2'){
                        $scope.noMorePage=true;
                        $scope.tishi="没有更多数据了";
                        return false;
                 }

                    var length = data.data.length;
    
                    for (var i=0;i<length;i++)
                    {
                        $scope.items.push(data.data[i]);
                    }
    
                    if (data.data.length < 5) {
                        $scope.noMorePage=true;
                        $scope.tishi="没有更多数据了";
                        return false;
                    }
    
                     $scope.$broadcast('scroll.infiniteScrollComplete');

             })


         //$scope.havaMore=false;
     };
     
        
     $scope.toutiao_delete = function(id){
         //alert(id);
         $ionicPopup.show({
             template:"<p style='text-align: center'>你确定删除该头条吗?</p>",
             title:"友情提示",
             scope: $scope,
             buttons:[
                 {text:"取消",
                    onTap:function(){
                        
                    }
                 },
                 
                 {text:"确认",
                 
                     onTap:function(){
                        ///删除该条商户头条
                         $http({
                             method: 'post',//请求方式
                             url: http_weiduke_server+"/index.php?g=Home&m=Yanyubao&a=toutiao",//请求地址
                             data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'action':'del','id':id}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                             //timeout: 8000//请求等待时间
                         })
                             .success(function(data){
                                 //alert(data);
                                 if(data.code == '-1'){
                                     $ionicLoading.show({
                                         showBackdrop: false,
                                         template: data.msg,
                                         duration:2000
                                     });
                                 }
                                 
                                 if(data.code == '1'){
                                     $ionicLoading.show({
                                         showBackdrop: false,
                                         template: data.msg,
                                         duration:2000
                                     });
                                     //重载
                                     $state.go("toutiao_list", {}, {reload:true});
                                 }
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
                 }
             ]
         })
     }
     
     
        
      //分享的显示与隐藏
     $scope.toggle = function () {
         $scope.visible = !$scope.visible;
      }

     $scope.showPopup = function(id) {
         
        ///删除该条商户头条
         $http({
             method: 'post',//请求方式
             url: http_weiduke_server+"/index.php?g=Home&m=Yanyubao&a=toutiao",//请求地址
             data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'action':'qrcode','id':id}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
             //timeout: 8000//请求等待时间
         })
             .success(function(data){
                 //alert(data);
                 if(data.code == '-1'){
                     $ionicLoading.show({
                         showBackdrop: false,
                         template: data.msg,
                         duration:2000
                     });
                 }
                 
                 if(data.code == '1'){
                     $scope.title = data.title;
                     $scope.qrcode_img_url = data.qrcode_img_url;
                    
                     $scope.data = {}
                    
                     // 自定义弹窗
                     var myPopup = $ionicPopup.show({
                       template: '<div style="width:100px; height:100px;padding:0; margin:0 auto;"><img src="'+$scope.qrcode_img_url+'" width="100%" height="100%"/></div><p style="padding:0 20px; margin-top:10px; text-align:center;">手机扫码查看具体内容</p>',
                       title: '<p>'+$scope.title+'</p>',
                       // subTitle: 'Please use normal things',
                       scope: $scope,
                       buttons: [
                         {
                           text: '<b>关闭</b>',
                           type: 'button-calm',
                         },
                       ]
                       
                     });
                 }
             })
             .error(function(data,header,config,status){

                 //处理响应失败
                 // 当ajax请求出现错误时，显示一个提示信息
                 $ionicLoading.show({
                     template:"网络延迟，请重新尝试",
                     duration:2000
                 });
             });
 
            
          };
});
////////////发布商户头条(toutiao_detail)
angular.module("toutiao_detail",[])

    .controller("toutiao_detail",function($scope,$http,$state,$ionicLoading, $timeout,$stateParams,$ionicActionSheet){

        var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
        }
        $scope.detail={};
        var toutiaoid = $stateParams['id'];
        var action = $stateParams['action'];
        ///获取商户头条详情
        $scope.toutiao_detail = function(type){
            
            if(type == 'set'){
                //console.log($scope.detail.info);
                var title =  $scope.detail.title;
                var info =  $scope.detail.info;
                if(!title){
                    $ionicLoading.show({
                         showBackdrop: false,
                        template:"请输入标题",
                        duration:2000
                    });
                    return false;
                }
                if(!info){
                    $ionicLoading.show({
                         showBackdrop: false,
                        template:"请输入内容",
                        duration:2000
                    });
                    return false;
                }
            }
            
            if(toutiaoid && (action == 'get')){
                var data = {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'action':'get','id':toutiaoid};
                action = '';
            }else if(toutiaoid && (type == 'set')){
                var data = {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'action':'edit','id':toutiaoid,'title':title,'pic':$scope.detail.pic,'info':info};
            }else if(action == 'new' && (type == 'set')){
                if($scope.detail.pic == 'images/a.png'){
                    $scope.detail.pic = '';
                }
                
                var data = {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'action':'new','title':title,'pic':$scope.detail.pic,'info':info};
            }
            //console.log(data);
            if(!$scope.temp_image){
                

                $http({
                    method: 'post',//请求方式
                    url: http_weiduke_server+"/index.php?g=Home&m=Yanyubao&a=toutiao",//请求地址
                    data: data//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                    //timeout: 8000//请求等待时间
                })
                    .success(function(data){
                        //alert(data);
                        if(data.code == '-1'){
                            $ionicLoading.show({
                                 showBackdrop: false,
                                template:data.msg,
                                duration:2000
                            });
                        }
                        if(data.code == '2'){
                             $scope.detail.title = data.data.title;
                             $scope.detail.pic = data.data.pic;
                             $scope.detail.info = data.data.info;
                            /* $scope.image = data.data.pic;
                             $scope.title = data.data.title;
                             $scope.url = data.data.url;*/
                             
                        }
                        if(data.code == '1'){
                            $ionicLoading.show({
                                 showBackdrop: false,
                                template:data.msg,
                                duration:2000
                            });
                            //跳转至登入页
                            $state.go("toutiao_list", {}, {reload:true});
                       }
                    })
                    .error(function(data,header,config,status){

                        //处理响应失败
                        // 当ajax请求出现错误时，显示一个提示信息
                        $ionicLoading.show({
                            template:"网络延迟，请重新尝试",
                            duration:2000
                        });
                    });
                
            }else{
                
                var options = new FileUploadOptions();
                
                options.fileKey="ffile";
                options.fileName=$scope.temp_image.substr($scope.temp_image.lastIndexOf('/')+1);
                options.mimeType="image/jpeg";
                //用params保存其他参数，例如昵称，年龄之类
                var params = {};
                if(toutiaoid){
                    params['action'] = 'edit';
                    params['id'] = toutiaoid;
                }else{
                    params['action'] = 'new';
                }
                params['title'] = title;
                params['info'] = info;
                params['sellerid'] = login_obj.sellerid;
                params['checkstr'] = login_obj.checkstr;
                params['fileName'] = options.fileName;
                //把params添加到options的params中
                options.params = params;
                //新建FileTransfer对象
                var ft = new FileTransfer();
                var upload_url = http_weiduke_server+"/index.php?g=Home&m=Yanyubao&a=toutiao";
                //上传文件
                ft.upload(
                    $scope.temp_image,
                    encodeURI(upload_url),//把图片及其他参数发送到这个URL，相当于一个请求，在后台接收图片及其他参数然后处理
                    uploadSuccess,
                    uploadError,
                    options);
                //upload成功的话
                function uploadSuccess(r) {
                    //console.log(r);
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
                        $state.go("toutiao_list", {}, {reload:true});
                        return;
                    }
                    
                }
                //upload失败的话
                function uploadError(error) {
                    $ionicLoading.show({
                         showBackdrop: false,
                        template:"图片上传失败",
                        duration:2000
                    });
                    //跳转至登入页
                    $state.go("toutiao_list", {}, {reload:true});
                }
                
            }
            
        }
        
        
        if(toutiaoid){
             $scope.toutiao_detail();
        }else{
             $scope.detail.pic = 'images/a.png';
        }
       

        
         ////图片
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
                    
                    navigator.camera.getPicture(function cameraSuccess(imageUri) {
                         $scope.detail.pic=imageUri;
                         $scope.temp_image=imageUri;
                         //$scope.input.isshow=true;
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
        
        $scope.showLoadingToast = function () {
            // Setup the loader
            $ionicLoading.show({
              template: '请稍后...',
              content: 'Loading',
              animation: 'fade-in',
              showBackdrop: false,
              maxWidth: 200,
              showDelay: 0
            });
          }
          $scope.hideLoadingToast = function () {
            $ionicLoading.hide();
          }
     
});
////////////////数据汇总(data_summary)

angular.module("data_summary",[])

    .controller("data_summary",function($scope,$http,$state,$ionicLoading){
       
        var login_obj = get_login_info();
       if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }
        $ionicLoading.show({
             showBackdrop: false,
            template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
            duration:3000
        });
       
        $scope.get_data_summary = function(){
         
               
             $http({
                 method: 'post',//请求方式
                 url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_data_summary",//请求地址
                 data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                 //timeout: 8000//请求等待时间
             })
                 .success(function(data){
                     //alert(data);
                     if(data.code == '-1'){
                         $ionicLoading.show({
                             showBackdrop: false,
                             template: data.msg,
                             duration:2000
                         });
                     }
                     
                     if(data.code == '1'){
                        
                            //该月的新增会员统计
                         var user_days = data.data.tongji_users.days;
                         var user_days_nums = data.data.tongji_users.num;
                         var user_month = data.data.tongji_users.month;
                            //alert(days_nums);
                         //alert(typeof(a));
                            //折线图
                         $scope.chartPieConfig = {

                          chart: {
                                    plotBackgroundColor: null,
                                    plotBorderWidth: null,
                                    plotShadow: false
                                },
                                title: {
                                    text: '会员'+user_month+'每日累积量'
                                },
                                tooltip: {
                                 pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                },
                                plotOptions: {
                                    pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        dataLabels: {
                                            enabled: true,
                                            color: '#000000',
                                            connectorColor: '#EEEEEE',
                                            format: '<b>{point.name}</b>: {point.percentage:.1f} %' 
                                        }
                                    }
                                },
                                 xAxis: {
                                categories: user_days
                            },
                            yAxis: {
                                              title: {
                                                      text: '人数'
                                                },
                                       },
                                series: [{
                                    type: 'line',
                                    name: '每日累积量',
                                    data: user_days_nums
                                        
                                }]

                         };    
                         //该商户该月发积分统计
                         var score_fa_days = data.data.tongji_score_fa.days;
                         var score_fa_nums = data.data.tongji_score_fa.sum;
                         var score_fa_month = data.data.tongji_score_fa.month;
                        // alert(score_fa_days); alert(score_fa_nums); alert(score_fa_month);
                         $scope.chartPieConfig1 = {

                                  chart: {
                                            plotBackgroundColor: null,
                                            plotBorderWidth: null,
                                            plotShadow: false
                                        },
                                        title: {
                                            text: '商户'+score_fa_month+'每日发积分量'
                                        },
                                        tooltip: {
                                         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                        },
                                        plotOptions: {
                                            pie: {
                                                allowPointSelect: true,
                                                cursor: 'pointer',
                                                dataLabels: {
                                                    enabled: true,
                                                    color: '#000000',
                                                    connectorColor: '#EEEEEE',
                                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                                                }
                                            }
                                        },
                                         xAxis: {
                                        categories: score_fa_days
                                    },
                                    yAxis: {
                                                      title: {
                                                              text: '数量'
                                                        },
                                               },
                                        series: [{
                                            type: 'line',
                                            color: '#808000',
                                            name: '每日发积分量',
                                            data: score_fa_nums

                                        }]
                                         
                                 };
  
                         /////商户该月收积分统计
                         var score_shou_days = data.data.tongji_score_shou.days;
                         var score_shou_nums = data.data.tongji_score_shou.sum;
                         var score_shou_month = data.data.tongji_score_shou.month;
                         // alert(score_fa_days); alert(score_fa_nums); alert(score_fa_month);
                         $scope.chartPieConfig2 = {

                                  chart: {
                                            plotBackgroundColor: null,
                                            plotBorderWidth: null,
                                            plotShadow: false
                                        },
                                        title: {
                                            text: '商户'+score_shou_month+'每日收积分量'
                                        },
                                        tooltip: {
                                         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                        },
                                        plotOptions: {
                                            pie: {
                                                allowPointSelect: true,
                                                cursor: 'pointer',
                                                dataLabels: {
                                                    enabled: true,
                                                    color: '#000000',
                                                    connectorColor: '#EEEEEE',
                                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                                                }
                                            }
                                        },
                                         xAxis: {
                                        categories: score_shou_days
                                    },
                                    yAxis: {
                                                      title: {
                                                              text: '数量'
                                                        },
                                               },
                                        series: [{
                                            type: 'line',
                                            color: '#DA70D6',
                                            name: '每日收积分量',
                                            data: score_shou_nums

                                        }]
                                         
                                 };
                        
                         //商户该优惠券被领取统计
                         var youhui_ling_days = data.data.tongji_youhui_ling.days;
                         var youhui_ling_nums = data.data.tongji_youhui_ling.num;
                         var youhui_ling_month = data.data.tongji_youhui_ling.month;
                         // alert(score_fa_days); alert(score_fa_nums); alert(score_fa_month);
                         $scope.chartPieConfig3 = {

                                  chart: {
                                            plotBackgroundColor: null,
                                            plotBorderWidth: null,
                                            plotShadow: false
                                        },
                                        title: {
                                            text: '商户'+youhui_ling_month+'优惠券被领取量'
                                        },
                                        tooltip: {
                                         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                        },
                                        plotOptions: {
                                            pie: {
                                                allowPointSelect: true,
                                                cursor: 'pointer',
                                                dataLabels: {
                                                    enabled: true,
                                                    color: '#000000',
                                                    connectorColor: '#EEEEEE',
                                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                                                }
                                            }
                                        },
                                         xAxis: {
                                        categories: youhui_ling_days
                                    },
                                    yAxis: {
                                                      title: {
                                                              text: '数量'
                                                        },
                                               },
                                        series: [{
                                            type: 'line',
                                            color: '#FF7F50',
                                            name: '每日优惠券被领取量',
                                            data: youhui_ling_nums

                                        }]
                                         
                                 };
                         
                     }
                     $ionicLoading.hide();
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
        
        $scope.get_data_summary();
 });


/////////////////////销优惠券(gift)

angular.module("gift",[])

    .controller("gift",function($scope,$http,$state, $stateParams,$ionicLoading){
        var login_obj = get_login_info();

        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return false;
        }
        $scope.input={};
        $scope.search_q={show: false};
        $scope.search_w={show: true};

        var mobile=$stateParams.mobile;
        //alert(mobile);
        if(mobile){
            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_user_youhui",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'mobile':mobile},
                //timeout: 8000//请求等待时间
            })
                .success(function(data){

                    if(data.code == '1'){
                        //$scope.search_q.show=false;
                        $scope.input.data=data.data;
                        //$scope.search_w.show=true;
                    }



                })
                .error(function(data,header,config,status){

                    //处理响应失败
                    // 当ajax请求出现错误时，显示一个提示信息
                    $ionicLoading.show({
                        template:"网络延迟，请重新尝试",
                        duration:2000
                    });
                })
        }
        $scope.search_user=function(){
            if(!$scope.input.mobile){
                $ionicLoading.show({
                     showBackdrop: false,
                    template:"请输入手机号",
                    duration:2000
                })
                return false;
            }

            var reg_phone = /^1[34578]\d{9}$/;
            if (!reg_phone.test($scope.input.mobile)) {
                $ionicLoading.show({
                     showBackdrop: false,
                    template:"请输入合法的手机号码",
                    duration:2000
                });
                //alert("请输入合法的手机号码");
                return false;
            }

            //查询该手机号下的会员券
            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_user_youhui",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'mobile':$scope.input.mobile},
                //timeout: 8000//请求等待时间
            })
                .success(function(data){
                    //alert(data.msg);
                    if(data.code == '-1'){
                        $scope.search_w.show=false;
                        $scope.search_q.show=false;
                        $ionicLoading.show({
                             showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                        $state.go("login", {}, {reload:true});
                    }
                    if(data.code == '2'){
                        $scope.search_w.show=false;
                        $scope.search_q.show=false;
                        $ionicLoading.show({
                             showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                        return false;
                    }
                    if(data.code == '3'){
                        $scope.search_w.show=false;
                        $ionicLoading.show({
                             showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                        $scope.search_q.show=true;
                        return false;
                    }
                    if(data.code == '1'){
                        $scope.search_q.show=false;
                        $scope.input.data=data.data;
                        $scope.search_w.show=true;
                    }

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
                })
        }

    })
////////////////////////销优惠券列表(gift_list)

angular.module("gift_list",[])

    .controller("gift_list",function($scope,$http,$state, $stateParams,$ionicLoading){
        var login_obj = get_login_info();

        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
        }
        $scope.input={};
        var yuid=$stateParams.yuid;
        //请求该优惠券内容
        $http({
            method: 'post',//请求方式
            url: http_server+"/index.php?g=Yanyubao&m=Shang&a=coupon_xiao&action=get",//请求地址
            data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'yuid':yuid},
            //timeout: 8000//请求等待时间
        })
            .success(function(data){

                if(data.code == '-1'){
                    $ionicLoading.show({
                         showBackdrop: false,
                        template:data.msg,
                        duration:2000
                    });
                    $state.go("login", {}, {reload:true});
                }
                if(data.code == '2'){
                    $ionicLoading.show({
                         showBackdrop: false,
                        template:data.msg,
                        duration:2000
                    });
                    return false;
                }

                if(data.code == '1'){

                    $scope.input.account=data.data.account;
                    $scope.input.coupon_name=data.data.coupon_name;
                    $scope.input.coupon_code=data.data.coupon_code;
                    $scope.input.coupon_type=data.data.coupon_type;
                    $scope.input.coupon_content=data.data.coupon_content;
                    $scope.input.nickname=data.data.nickname;
                    if(data.data.headimgurl.length > 0){
                         $scope.input.headimgurl = data.data.headimgurl;
                    }else{
                         $scope.input.headimgurl = 'images/pho.png';
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
                    template:"网络延迟，请重新尝试",
                    duration:2000
                });
            })

        $scope.coupon_xiao=function(){


            //查询该手机号下的会员券
            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=coupon_xiao&action=set",//请求地址
                data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'money':$scope.input.xiaofei,'yuid':yuid,'score':$scope.input.score_num},
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
                       //alert(data.msg);
                        $ionicLoading.show({
                             showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                        $state.go("gift", {mobile:'13486325569'}, {reload:true});

                    }

                })
                .error(function(data,header,config,status){

                    //处理响应失败
                    // 当ajax请求出现错误时，显示一个提示信息
                    $ionicLoading.show({
                        template:"网络延迟，请重新尝试",
                        duration:2000
                    });
                })
        }

    })
/////////////////卡券统计(statistics)
  
angular.module("statistics",[])

    .controller("statistics",function($scope,$http,$state,$timeout,$stateParams,$ionicLoading,$ionicPopup){

        var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return false;
        }
        $scope.tishi="上拉加载更多";
        $scope.currentPage=1;
        
  $scope.get_youhui_list=function(){
      $scope.xiala=false;
      $scope.youhui_list=null;

        $ionicLoading.show({
             showBackdrop: false,
            template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
            duration:3000
        });
        $http({
            method: 'post',//请求方式
            url: http_server+"/index.php?g=Yanyubao&m=Shang&a=youhui_list&page=1",//请求地址
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
                }
                if(data.code == '0'){
                    $ionicPopup.show({
                        template:"<p style='text-align: center'>您暂发布优惠券<br/>快去添加吧</p>",
                        title:"友情提示",
                        scope: $scope,
                        buttons:[
                            {text:"取消",
                                
                                onTap:function(){
                                 $state.go("shouye", {}, {reload:true});
                                    return;
                               }
                            },
                            
                            {text:"前往",
                                
                                onTap:function(){
                                     $state.go("coupons_send", {}, {reload:true});
                                     return;
                                }
                            }
                        ]
                    })

                }
                if(data.code == '1'){
                   // var a = JSON.parse(data.data);
                  //  alert(a);
                     $scope.xiala=true;
                     $scope.youhui_list = data.data;
                     
                     // console.log("cccccccccccccccccccccccccc");
                     // console.log(JSON.stringify($scope.youhui_list));
                    
                }
                //响应成功
                // $scope.attraction=data[name];
                $ionicLoading.hide();

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

  $scope.get_youhui_list();


        $scope.get_user_list=function(youhuiid){
            //alert(youhuiid);
            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_user_list",//请求地址
                data: {'sellerid':login_obj.sellerid,'youhuiid':youhuiid,'checkstr':login_obj.checkstr}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                //timeout: 8000//请求等待时间
            })
                .success(function(data){
                	// console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
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

                    else if(data.code == '0'){
                        $ionicLoading.show({
                             showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });
                    }
                    
                    else if(data.code == '1'){
                    	// console.log(JSON.stringify(data.data));

                        $state.go("statistics_list", {"youhui_user_list":JSON.stringify(data.data),"coupon_name":data.coupon_name}, {reload:true});
                        return false;
                    }
                    //响应成功
                    // $scope.attraction=data[name];
                    $ionicLoading.hide();

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

        $scope.youhui_del=function(youhuiid){
            //alert(youhuiid);
             $ionicPopup.show({
                        template:"<p style='text-align: center'>确定删除此张优惠券？</p>",
                        title:"友情提示",
                        scope: $scope,
                        buttons:[
                            {text:"取消",
                                
                                onTap:function(){
                               
                               }
                            },
                            
                            {text:"确定",
                                
                              onTap:function(){
                                    
                                $http({
                                        method: 'post',//请求方式
                                        url: http_server+"/index.php?g=Yanyubao&m=Shang&a=youhui_send&action=del",//请求地址
                                        data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'youhuiid':youhuiid,}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                                        //timeout: 8000//请求等待时间
                                    })
                                        .success(function(data){


                                            if(data.code == '0'){
                                                $ionicLoading.show({
                                                     showBackdrop: false,
                                                    template:data.msg,
                                                    duration:2000
                                                });
                                                return;
                                            }
                                            if(data.code == '1'){
                                                $ionicLoading.show({
                                                     showBackdrop: false,
                                                    template:data.msg,
                                                    duration:2000
                                                });
                                                 $scope.get_youhui_list();
                                            }
                                            //响应成功
                                            // $scope.attraction=data[name];
                                            $ionicLoading.hide();

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
                            }
                        ]
                    })
            
        }

        //////////////////下拉加载更多方法


        $scope.loadMore=function(){
            var start = $scope.start;
            var goods = $scope.goods;
            var now_city = $scope.now_city;
            //var p = c();


            $scope.currentPage += 1;

            $http({
                method: 'post',//请求方式
                url: http_server+"/index.php?g=Yanyubao&m=Shang&a=youhui_list&page="+$scope.currentPage,//请求地址
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
                        $scope.youhui_list.push(newItems.data[i]);
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


////////////////////卡券统计列表(statistics_list)
angular.module("statistics_list",[])

    .controller("statistics_list",function($scope,$http,$state, $stateParams){

            var login_obj = get_login_info();
            if(!login_obj){
                //跳转至登入页
                $state.go("login", {}, {reload:true});
                return;
            }
            
            // console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbb');
            // console.log($stateParams.youhui_user_list);
            
            var youhui_user_list =JSON.parse($stateParams["youhui_user_list"]);

            $scope.youhui_user_list = youhui_user_list;
            
            // console.log(JSON.stringify($scope.youhui_user_list));
            
            $scope.coupon_name = $stateParams.coupon_name;



});


////////////////营销学院 首页(yingxiao_index)

angular.module("yingxiao_index",[])

    .controller("yingxiao_index",function($scope,$http,$state,$ionicLoading,$stateParams,$ionicSlideBoxDelegate,$timeout){
     
		// var login_obj = get_login_info();
        // if(!login_obj){
           // 跳转至登入页
            // $state.go("login", {}, {reload:true});
            // return false;
        // }
        $scope.input={};
      
        $ionicLoading.show({
             showBackdrop: false,
            template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
            duration:3000
        });
        ///获取滚动图片
        $http({
            method: 'post',//请求方式
            url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_yingxiao_xueyuan_gundong",//请求地址
            data: {}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
            //timeout: 8000//请求等待时间
        })
            .success(function(data){
                 $ionicLoading.hide();
                if(data.code == '1'){
                     $scope.banner_list = data.data;
					 $ionicSlideBoxDelegate.update();
					 $ionicSlideBoxDelegate.loop(true);//循环轮播
                }
               
            })
            .error(function(data,header,config,status){

                //处理响应失败
                // 当ajax请求出现错误时，显示一个提示信息
                $ionicLoading.show({
                    template:"网络延迟，请重新尝试",
                    duration:2000
                });
            });
        /////////获取最新文章列表，不需要上拉加载/////////////
		$scope.get_latest_news = function(){
			 $http({
				method: 'get',//请求方式
				url:'https://www.abot.cn/wp-json/wp/v2/posts?per_page=10&orderby=date&order=desc&page=1',//请求地址
			   // data: {}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
				//timeout: 8000//请求等待时间
				cache:true
			})
            .success(function(data){
                 $ionicLoading.hide();
				$scope.latestList = data;
            
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
		
       $scope.get_latest_news();
	   
	    //解决轮播是两张图片时的bug
        $scope.slideBanner = function (index) {
            //console.log(index);
            $scope.slideIndex = index;
            if (($ionicSlideBoxDelegate.count() - 1 ) == index) {
                $timeout(function () {
                    $ionicSlideBoxDelegate.slide(0);
                }, 4000);
            }
        };
		
});

////////////////营销学院文章列表(yingxiao_list)

angular.module("yingxiao_list",[])

    .controller("yingxiao_list",["$scope","$http","$state","$ionicLoading","$stateParams","$cacheFactory",function($scope,$http,$state,$ionicLoading,$stateParams,$cacheFactory){
        /*var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
        }*/

		
		
		$scope.isList = false;

		var type = $stateParams['type'];
		$scope.yinxiao_two_name = $stateParams['name'];
		
		$scope.tishi="上拉加载更多";
		$scope.currentPage=1;
		$ionicLoading.show({
			 showBackdrop: false,
			template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
			duration:3000
		});
		
		
		
		$scope.get_wp_list = function(categories){
			var categories = categories;
			var url = 'https://www.abot.cn/wp-json/wp/v2/posts?per_page=10&orderby=date&order=desc&page=1&categories='+categories;
			
			///获取初始化 wp API文章列表
			$http({
				method: 'get',//请求方式
				url:url,//请求地址
				//data: {'action':'list','id':'xueyuan','currentpage':$scope.currentPage}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
				//timeout: 8000//请求等待时间
				cache:true
			})
				.success(function(data){
					 $ionicLoading.hide();
					 $scope.latestList = data;
			
		
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
		
		//下拉加载更多
		$scope.xiala_wp = function(categories){
		
		
			var categories = categories;
			$scope.currentPage += 1;

				$http({
					method: 'get',//请求方式
					url:'https://www.abot.cn/wp-json/wp/v2/posts?per_page=10&orderby=date&order=desc&+page='+$scope.currentPage+'&categories='+categories,//请求地址
					//data: {'action':'list','id':'xueyuan','currentpage':$scope.currentPage}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
					//timeout: 8000//请求等待时间
					cache:true
				})
					.success(function(data) {
						if (data.code == '2'){
							$scope.noMorePage=true;
							$scope.tishi="没有更多数据了";
							return false;
						}

						var length = data.length;
		
						for (var i=0;i<length;i++)
						{
							$scope.latestList.push(data[i]);
						}
		
						if (data.length < 10) {
							$scope.noMorePage=true;
							$scope.tishi="没有更多数据了";
							return false;
						}
		
						 $scope.$broadcast('scroll.infiniteScrollComplete');

					})

		}
			// 解决方案  3

		if(type == 'fangan'){
			var categories = 3;
			
			$scope.get_wp_list (categories);
			$scope.loadMore=function(){
				$scope.xiala_wp(categories);

			};
			//////////////////////
			// 客户案例  4
			
		}else if(type == 'anli'){
			var categories = 4;
			$scope.get_wp_list (categories);
			$scope.loadMore=function(){
				$scope.xiala_wp(categories);
			};
			// 产品	5

		}else if(type == 'canpin'){
			var categories = 5;
			$scope.get_wp_list (categories);
			$scope.loadMore=function(){
				$scope.xiala_wp(categories);
			};
			// 新闻  1,2

		}else if(type == 'news'){
			var categories = '1,2';
			$scope.get_wp_list (categories);
			$scope.loadMore=function(){
				$scope.xiala_wp(categories);
			};
			// 帮助	73

		}else if(type == 'help'){
			var categories = 73;
			$scope.get_wp_list (categories);
			$scope.loadMore=function(){
				$scope.xiala_wp(categories);
			};
			// 延誉宝	95
		}else if(type == 'yanyubao'){
			var categories = 95;
			$scope.get_wp_list (categories);
			$scope.loadMore=function(){
				$scope.xiala_wp(categories);
			};
		}else if(type == 'yunyingtuiguang'){
			$scope.isList = true;
			$scope.input={};
			
			
			///获取营销学院列表
			$http({
				method: 'post',//请求方式
				url: http_weiduke_server+"/index.php?g=Home&m=Yanyubao&a=yingxiao",//请求地址
				data: {'action':'list','id':'xueyuan','currentpage':$scope.currentPage},//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
				//timeout: 8000//请求等待时间
				cache:true
			})
				.success(function(data){
					 $ionicLoading.hide();
					if(data.code == '1'){
						 $scope.items = data.data;
						
					}
				   
				})
				.error(function(data,header,config,status){

					//处理响应失败
					// 当ajax请求出现错误时，显示一个提示信息
					$ionicLoading.show({
						template:"网络延迟，请重新尝试",
						duration:2000
					});
				});
			//////////////////////
			
			///下拉加载更多方法
			
			$scope.loadMore=function(){
				
				var start = $scope.start;
				var goods = $scope.goods;
				var now_city = $scope.now_city;
				//var p = c();


				$scope.currentPage += 1;

				$http({
					method: 'post',//请求方式
					url: http_weiduke_server+"/index.php?g=Home&m=Yanyubao&a=yingxiao",//请求地址
					data: {'action':'list','id':'xueyuan','currentpage':$scope.currentPage},//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
					//timeout: 8000//请求等待时间
					cache:true
				})
					.success(function(data) {
						if (data.code == '2'){
							$scope.noMorePage=true;
							$scope.tishi="没有更多数据了";
							return false;
						}

						var length = data.data.length;
		
						for (var i=0;i<length;i++)
						{
							$scope.items.push(data.data[i]);
						}
		
						if (data.data.length < 10) {
							$scope.noMorePage=true;
							$scope.tishi="没有更多数据了";
							return false;
						}
		
						 $scope.$broadcast('scroll.infiniteScrollComplete');

					})


				//$scope.havaMore=false;
			};
		}
		
        
       
}]);


///////////营销学院文章详情(yingxiao_detail)
angular.module("yingxiao_detail",[])

    .controller("yingxiao_detail",function($scope,$http,$state,$ionicLoading,$stateParams,$sanitize,$cacheFactory){
        /*var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
        }*/
		$scope.isList = false;

		var type = $stateParams['type'];
		
        $scope.input={};
        var imgid = $stateParams['imgid'];

		
        $ionicLoading.show({
             showBackdrop: false,
            template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
            duration:3000
        });
		if(type == 'wpAPI'){
			//获取营销学院详情
			
			$http({
				method: 'get',//请求方式
				url: 'https://www.abot.cn/wp-json/wp/v2/posts/'+imgid,//请求地址
				//data: {'action':'detail','id':imgid}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
				//timeout: 8000//请求等待时间
				cache:true
			})
				.success(function(data){
				   $ionicLoading.hide();
			
					$scope.detail = data.content.rendered; //包含 data.info为文章详情
					 $scope.image = data.post_thumbnail_image;
					 $scope.title = data.title.rendered;
					 
					 $scope.url = data.link;
					 $scope.text = data.excerpt.rendered;  //文章简介
					 
					 $scope.showpic = 0;  //图片
					 if($scope.image){
						 //$scope.showpic = 1;
					 }
					 
					 console.log('1111111111111111111111======>>>>'+$scope.showpic);
					
				})
				.error(function(data,header,config,status){

					//处理响应失败
					// 当ajax请求出现错误时，显示一个提示信息
					$ionicLoading.show({
						template:"网络延迟，请重新尝试",
						duration:2000
					});
				});
		
		}else{
			$scope.isList = true;
			//获取营销学院详情
			
			$http({
				method: 'post',//请求方式
				url: http_weiduke_server+"/index.php?g=Home&m=Yanyubao&a=yingxiao",//请求地址
				data: {'action':'detail','id':imgid},//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
				//timeout: 8000//请求等待时间
				cache:true
			})
				.success(function(data){
				
				   $ionicLoading.hide();
				   if(data.code == '0'){
						$ionicLoading.show({
							 showBackdrop: false,
							template:data.msg,
							duration:2000
						});
					}
					if(data.code == '1'){
						
						$scope.detail = data.data; //包含 data.info为文章详情
						 $scope.image = data.data.pic;
						 $scope.title = data.data.title;
						 $scope.url = data.data.url;
						 $scope.text = data.data.text;  //文章简介
						 $scope.showpic = data.data.showpic;  //文章简介
						 
					}
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
        
        
        
        
        ///////////微信分享二维码
        $scope.sharePhoto_to_wechat = function(type){
            //检测是否安装
            //alert(type);
            //alert($scope.title);
            Wechat.isInstalled(function (installed) {
                //alert("Wechat installed: " + (installed ? "Yes" : "No"));
                
                if(type == 'friend'){
                    Wechat.share({
                        message: {
                            title: $scope.title,
                            description: $scope.text,
                            thumb: $scope.image,
                            media: {
                                type: Wechat.Type.WEBPAGE,
                                webpageUrl: $scope.url
                            }
                        },
                        scene: Wechat.Scene.SESSION   // share to SESSION
                    }, function () {
                        $ionicLoading.show({
                            showBackdrop: false,
                            template:"分享成功",
                            duration:2000
                        });
                       
                    }, function (reason) {
                        //alert("Failed: " + reason);
                    });
                }
                if(type == 'timeline'){
                    Wechat.share({
                        message: {
                            title: $scope.title,
                            description: $scope.text,
                            thumb: $scope.image,   //"www/img/thumbnail.png",
                            media: {
                                type: Wechat.Type.WEBPAGE,
                                webpageUrl: $scope.url
                            }
                        },
                        scene: Wechat.Scene.TIMELINE   // share to Timeline
                    }, function () {
                        $ionicLoading.show({
                            showBackdrop: false,
                            template:"分享成功",
                            duration:2000
                        });
                    }, function (reason) {
                        //alert("Failed: " + reason);
                    });
                }
                
            }, function (reason) {
                $ionicLoading.show({
                    showBackdrop: false,
                    template:"检测到该设备未安装微信",
                    duration:2000
                });
                
            });
            
        }
        
        
        ///////////QQ分享二维码
        $scope.sharePhoto_to_qq = function(type){
            //检测是否安装
            //alert(type);
            var args = {};
            args.client = QQSDK.ClientType.QQ;//QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
            QQSDK.checkClientInstalled(function () {
                //alert('ok');
                var args = {};
                args.client = QQSDK.ClientType.QQ;//QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;//TIM轻聊版
                if(type == 'qq'){
                    args.scene = QQSDK.Scene.QQ;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite//Favorite收藏
                }
                if(type == 'qq_zone'){
                    args.scene = QQSDK.Scene.QQZone;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
                }
                  args.url = $scope.url;
                  args.title = $scope.title;
                  args.description = $scope.text;
                  args.image = $scope.image;
                  QQSDK.shareNews(function () {
                     $ionicLoading.show({
                        showBackdrop: false,
                         template:"分享成功",
                         duration:2000
                     });
                  }, function (failReason) {
                   // alert(failReason);
                  }, args);
                
                
                      
            }, function () {
              // if installed QQ Client version is not supported sso,also will get this error
              
              $ionicLoading.show({
                showBackdrop: false,
                  template:"请先安装QQ",
                  duration:2000
              });
            }, args);
        }
        
        
        ///////////微博分享二维码
        $scope.sharePhoto_to_weibo = function(){
             //检测是否安装
             window.weibo.init('2853934742','http://www.example.com/callback.html');
             window.weibo.isInstalled(function(){
                 //alert("weibo installed Yes");
                 window.weibo.share({
                        type: 'image',
                        data: $scope.image,
                        text: $scope.title+' '+$scope.url+' @上海延誉 #延誉宝#'
                    },function(res){
                        $ionicLoading.show({
                            showBackdrop: false,
                            template:"分享成功",
                            duration:2000
                        });
                    });
             },function(){
                 $ionicLoading.show({
                    showBackdrop: false,
                     template:"检测到该设备未安装微博",
                     duration:2000
                 });
                
             })
        }
       
});




/////////////////服务市场(server)

angular.module("server",[]).config(
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

    .controller("server",function($scope,$http, $stateParams,$ionicLoading,$sce,$state){
        var login_obj = get_login_info();
        //alert(login_obj);

        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }

        $scope.input={};
        //var url = "http://m.abot.cn";

        //获取商城一键登录网址
        $http({
            method: 'post',//请求方式
            url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_shop_shang_url",//请求地址
            //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
            //timeout: 8000//请求等待时间
        })
            .success(function(data){
                console.log(data);
                if(data.code == '1'){
                    //alert(data.shop_shang_url);
                    /*url = data.shop_shang_url;
                    console.log(url);
                    console.log(data.shop_shang_url);*/
                    
                    var url = data.shop_shang_url;
                    window.location.href = url;
                    //console.log(url);
                    /*if (!cordova.InAppBrowser) {
                        return;
                    }*/
                    //location：设置为yes或no来打开或关闭插件的locationbar
                    //android
                    //zoom：设置为yes则显示缩放浏览器页面的按钮，设置为no则不显示缩放按钮
                    //hardwareback：设置为yes则调用Android返回键回到前一界面，设置为no则返回键为退出浏览器页面
                    
                    //ios
                    // toolbar=yes 仅iOS有效,提供关闭、返回、前进三个按钮
                    // toolbarposition=top/bottom 仅iOS有效,决定toolbar的位置
                    // closebuttoncaption=关闭 仅iOS有效
                    
                    /*var options = 'location=no,toolbarposition=top,toolbar=yes,closebuttoncaption=返回';
                    if(cordova.platformId == 'android'){
                        //options = 'location=yes,zoom=no,hardwareback=yes';
                         options = 'location=no,zoom=no,hardwareback=yes';
                    }
                     else if(cordova.platformId == 'ios'){
                         StatusBar.hide();
                     }
                     //StatusBar.styleBlackTranslucent();
                     
                    var ref = cordova.InAppBrowser.open(url, '_blank', options);
                    ref.addEventListener('exit', function(){
                                         //StatusBar.show();
                                         if(cordova.platformId == 'ios'){
                                             StatusBar.show();
                                         }
                                         
                                         //跳转到首页
                                         console.log('InAppBrowser被关闭');
                                         $state.go("shouye", {}, {reload:true});
                                         return;
                    });*/
                    //cordova.InAppBrowser.open(url, '_blank', 'location=no,hardwareback=yes,zoom=yes');
                }
                else if(data.code == -1){
                    del_login_info();

                    $ionicLoading.show({
                        showBackdrop: false,
                        template:data.msg,
                        duration:2000
                    });
                    //跳转至登入页
                    $state.go("login", {}, {reload:true});
                    return;
                }

                //$scope.myUrl=$sce.trustAsResourceUrl(url);
            })
            .error(function(data,header,config,status){
                //处理响应失败
                // 当ajax请求出现错误时，显示一个提示信息
                $ionicLoading.show({
                    template:"网络延迟，请重新尝试",
                    duration:3000
                });
            });


});

//////////////////收款记录(shoukuan_log)

angular.module("shoukuan_log",[])

.controller("shoukuan_log",function($scope,$http,$state,$ionicLoading,$stateParams){
	var login_obj = get_login_info();
    if(!login_obj){
        //跳转至登入页
        $state.go("login", {}, {reload:true});
        return;
    }
    $scope.userinfo={};
    $scope.shoukuan={};
	
	$ionicLoading.show({
        showBackdrop: false,
        template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
        duration:3000
    });
	
	$scope.get_shoukuan = function(){
		///获取商户收款明细
		$http({
	        method: 'post',//请求方式
	        url: http_server+"/index.php?g=Yanyubao&m=Shang&a=shoukuan_list",//请求地址
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
	                $scope.userinfo = data.data;
	                if($scope.userinfo.headimgurl == ''){
	                	$scope.userinfo.headimgurl = 'images/huiyuan.jpg';
	                }
	                $scope.shoukuan = data.shoukuan;
	                $scope.tishi = '';
	                if(!$scope.shoukuan.log_list){
	                	$scope.tishi = '暂无收款记录';
	                }
	                //$scope.log = data.xiaofei.
	                /*$scope.chongzhi_str1 = data.data.chongzhi_str1;
	                $scope.chongzhi_str2 = data.data.chongzhi_str2;
	                $scope.chongzhi_str3 = data.data.chongzhi_str3;
	                $scope.balance_type = data.data.balance_type;*/

	            }
	            //响应成功
	            // $scope.attraction=data[name];
	     

	        })
	        .finally(function() {
                  $scope.$broadcast('scroll.refreshComplete');
             })
	}
	
	$scope.get_shoukuan();
	
	
});

function setOptions(srcType) {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      
      destinationType: Camera.DestinationType.FILE_URI,
      //destinationType: Camera.DestinationType.NATIVE_URI,
      //destinationType: Camera.DestinationType.DATA_URL,////base64
      
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
  }
