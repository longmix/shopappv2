
angular.module("add_product",[])

    .controller("add_product",function($scope,$http,$state,$ionicLoading,$timeout,$ionicViewSwitcher,$stateParams,$ionicActionSheet){

           $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
                  viewData.enableBack = true;
              });
           $scope.$on('$ionicView.beforeLeave', function (event, viewData) {
                $ionicViewSwitcher.nextDirection("back");
              });

           
    	var login_obj = get_login_info();
        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return;
        }

        var caozuo=$stateParams['caozuo'];
        var productid=$stateParams['productid'];
        $scope.data={};
        $scope.data.big= '-1';
        $scope.data.small= '-1';

        
        $scope.uploadimgs = [];
        
        
       // $scope.dianyou = function(){
       //      $ionicLoading.show({///小蓝圈缓冲
       //          template:'<ion-spinner icon="ios-small" class="spinner-balanced"></ion-spinner>',
       //          duration:3000
       //      });
      



         /////大分类点击触发请求对应的小分类
          $scope.chenge_big=function(){
           $scope.data.small= '-1';

            console.log($scope.data.big);
             $http({
                method: 'post',//请求方式
                url:http_server+"/index.php?g=Yanyubao&m=Shang&a=product_cata",//请求地址
                data: {'cataid':$scope.data.big }//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                       
                        $scope.fenlei_small=data.data;
                    }
                    if(data.code == '0'){
                        $ionicLoading.show({
                           showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });

                     
                        
                    }
                    
                   
                })
                .error(function(data,header,config,status){

                    //处理响应失败
                    // 当ajax请求出现错误时，显示一个提示信息
                    $ionicLoading.show({
                       showBackdrop: false,
                        template:"网络延迟，请重新尝试",
                        duration:2000
                    });
                });

          }

     $scope.click_small=function(){
        if($scope.data.big == '-1'){
                $ionicLoading.show({
                       showBackdrop: false,
                        template:"请先选择大分类",
                        duration:1500
                    });
            return false;

        }
      
     }


    if (caozuo == 'add') {
         
            $scope.shouhuo_title="添加新商品";

            $scope.btn_style='发布';
    
         ////获取大分类
        $scope.get_big=function(){
         
            $http({
                method: 'post',//请求方式
                url:http_server+"/index.php?g=Yanyubao&m=Shang&a=product_cata",//请求地址
                data: {'cataid':'0' }//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
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
                       
                       $scope.fenlei_big=data.data;
                    }
                    if(data.code == '0'){
                        $ionicLoading.show({
                           showBackdrop: false,
                            template:data.msg,
                            duration:2000
                        });

                     
                        
                    }
                    
                   
                })
                .error(function(data,header,config,status){

                    //处理响应失败
                    // 当ajax请求出现错误时，显示一个提示信息
                    $ionicLoading.show({
                       showBackdrop: false,
                        template:"网络延迟，请重新尝试",
                        duration:2000
                    });
                });
        }
       
     $scope.get_big();




    ////////发布商品，
   $scope.upload_product=function(){

         
              if($scope.data.big == '-1'){
                  $ionicLoading.show({
                     showBackdrop: false,
                      template:"请选择商品大分类",
                      duration:1500
                  });
                  return false;
               }
              if($scope.data.small == '-1'){
                  $ionicLoading.show({
                     showBackdrop: false,
                      template:"请选择商品小分类",
                      duration:1500
                  });
                  return false;
              }
            
             if($scope.data.name == undefined){
                  $ionicLoading.show({
                     showBackdrop: false,
                      template:"请填写商品名称",
                      duration:1500
                  });
                  return false;
               }
            if($scope.data.price == undefined){
                  $ionicLoading.show({
                     showBackdrop: false,
                      template:"请填写商品销售价格",
                      duration:1500
                  });
                  return false;
               }

               if($scope.data.inventory == undefined){
                  $ionicLoading.show({
                     showBackdrop: false,
                      template:"请填写商品库存",
                      duration:1500
                  });
                  return false;
               }
             // if($scope.data.unit == undefined){
             //      $ionicLoading.show({
             //          template:"请填写价格单位",
             //          duration:1500
             //      });
             //      return false;
             //   }
             if($scope.data.describe == undefined){
                  $ionicLoading.show({
                     showBackdrop: false,
                      template:"请填写商品描述",
                      duration:1500
                  });
                  return false;
               }


            var pic_number = $scope.uploadimgs.length;
                //alert(pic_num);
                if(pic_number < 1){
                  $ionicLoading.show({
                     showBackdrop: false,
                        template:"请上传图片",
                        duration:1500
                    });
                  return false;
                }
      
           $http({
                   method: 'post',//请求方式
                   url:http_server+"/index.php?g=Yanyubao&m=Shang&a=product_add",//请求地址
                   data: { 'sellerid':login_obj.sellerid,
                           'checkstr':login_obj.checkstr,
                           'cataid':$scope.data.small,
                           'unit':$scope.data.unit,
                           'inventory':$scope.data.inventory,
                           'price':$scope.data.price,
                           'name':$scope.data.name,
                           'describe':$scope.data.describe,
                           'picture':encodeURI(JSON.stringify($scope.uploadimgs))

                         
                         }//请求参数
                   })
                   .success(function(data){

                         $ionicLoading.hide();
                          if(data.code == '1'){
                              $ionicLoading.show({
                                 showBackdrop: false,
                                template:data.msg,
                                duration:1500
                              });

                              $timeout(function(){
                                  $state.go("product", {}, {reload:true});
                                  $ionicViewSwitcher.nextDirection("forward");
                              },1500);

                            }
                          if(data.code == '2'){

                            $ionicLoading.show({
                               showBackdrop: false,
                                template:data.msg,
                                duration:1500
                            });
                          }
                          
                        })
                        .error(function(data,header,config,status){
                          $ionicLoading.show({
                             showBackdrop: false,
                                template:"网络延迟，请重新尝试",
                                duration:3000
                            });
                        })
   }



}


    $scope.hold=function(){

        $scope.touch=true;
        $scope.isActive=true;
         
       
       }

     $scope.hold_yincang=function(){

          $scope.touch=false;
          $scope.isActive=true;
           
         
     }

  /////编辑商品
  if (caozuo == 'update') {
          // $scope.caozuo='edit';
          $scope.shouhuo_title="编辑商品";
          $scope.btn_style='修改';

          $http({
                   method: 'post',//请求方式
                   url:http_server+"/index.php?g=Yanyubao&m=Shang&a=product_detail",//请求地址
                   data: { 'sellerid':login_obj.sellerid,
                           'checkstr':login_obj.checkstr,
                           'productid':productid
                      
                         }//请求参数
                   })
                   .success(function(data){

                         $ionicLoading.hide();
                          if(data.code == '1'){
                               var big_cataid=data.data.big_cataid;
                               var productid=data.data.productid;
                               // console.log(provinceid);
                               $scope.get_big();
                               $scope.get_small(big_cataid);
                              

                               $scope.data.big=data.data.big_cataid;
                               $scope.data.small=data.data.cataid;

                               console.log($scope.data.big);
                               
                              
                               $scope.data.unit=data.data.unit;
                               $scope.data.inventory=data.data.inventory;
                               $scope.data.price=data.data.price; 
                               $scope.data.name=data.data.name;  
                               $scope.data.describe=data.data.describe;     
                               $scope.uploadimgs=data.data.pictures;
                               console.log(data.data.pictures);

                         

                          
                            }
                          if(data.code == '2'){

                            $ionicLoading.show({
                               showBackdrop: false,
                                template:data.msg,
                                duration:1500
                            });

                          }
                          
                        })
                        .error(function(data,header,config,status){
                          $ionicLoading.show({
                             showBackdrop: false,
                                template:"网络延迟，请重新尝试",
                                duration:3000
                            });
                        })



                ///获取之前已设置的分类
               $scope.get_big=function(){

                        $http({
                         method: 'post',//请求方式
                         url:http_server+"/index.php?g=Yanyubao&m=Shang&a=product_cata",//请求地址
                         data: { 'cataid':'0' }//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                         })
                         .success(function(data){

                               $ionicLoading.hide();
                                if(data.code == '1'){
                                    $scope.fenlei_big=data.data;
                                    
                                
                                  }
                                if(data.code == '2'){

                                  $ionicLoading.show({
                                      showBackdrop: false,
                                      template:data.msg,
                                      duration:1500
                                  });
                                }
                                
                              })
                              .error(function(data,header,config,status){
                                $ionicLoading.show({
                                      showBackdrop: false,
                                      template:"网络延迟，请重新尝试",
                                      duration:3000
                                  });
                              })


                }
               $scope.get_small=function(big_cataid){
                  $http({
                         method: 'post',//请求方式
                         url:http_server+"/index.php?g=Yanyubao&m=Shang&a=product_cata",//请求地址
                         data: { 'cataid':big_cataid }//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
                         })
                         .success(function(data){

                               $ionicLoading.hide();
                                if(data.code == '1'){
                                    $scope.fenlei_small=data.data;
                                    
                                
                                  }
                                if(data.code == '2'){

                                  $ionicLoading.show({
                                       showBackdrop: false,
                                      template:data.msg,
                                      duration:1500
                                  });
                                }
                                
                              })
                              .error(function(data,header,config,status){
                                $ionicLoading.show({
                                       showBackdrop: false,
                                      template:"网络延迟，请重新尝试",
                                      duration:3000
                                  });
                              })
                }
             

               ////////发布商品，
   $scope.upload_product=function(){

         
              if($scope.data.big == '-1'){
                  $ionicLoading.show({
                       showBackdrop: false,
                      template:"请选择商品大分类",
                      duration:1500
                  });
                  return false;
               }
              if($scope.data.small == '-1'){
                  $ionicLoading.show({
                     showBackdrop: false,
                      template:"请选择商品小分类",
                      duration:1500
                  });
                  return false;
              }
            
             if($scope.data.name == undefined){
                  $ionicLoading.show({
                     showBackdrop: false,
                      template:"请填写商品名称",
                      duration:1500
                  });
                  return false;
               }
            if($scope.data.price == undefined){
                  $ionicLoading.show({
                     showBackdrop: false,
                      template:"请填写商品销售价格",
                      duration:1500
                  });
                  return false;
               }

               if($scope.data.inventory == undefined){
                  $ionicLoading.show({
                     showBackdrop: false,
                      template:"请填写商品库存",
                      duration:1500
                  });
                  return false;
               }
             if($scope.data.unit == undefined){
                  $ionicLoading.show({
                     showBackdrop: false,
                      template:"请填写价格单位",
                      duration:1500
                  });
                  return false;
               }
             // if($scope.data.describe == undefined){
             //      $ionicLoading.show({
             //          template:"请填写商品描述",
             //          duration:1500
             //      });
             //      return false;
             //   }


            var pic_number = $scope.uploadimgs.length;
                //alert(pic_num);
                if(pic_number < 1){
                  $ionicLoading.show({
                     showBackdrop: false,
                        template:"请上传图片",
                        duration:1500
                    });
                  return false;
                }
      
           $http({
                   method: 'post',//请求方式
                   url:http_server+"/index.php?g=Yanyubao&m=Shang&a=product_update",//请求地址
                   data: { 'sellerid':login_obj.sellerid,
                           'checkstr':login_obj.checkstr,
                           'productid':productid,
                           'cataid':$scope.data.small,
                           'unit':$scope.data.unit,
                           'inventory':$scope.data.inventory,
                           'price':$scope.data.price,
                           'name':$scope.data.name,
                           'describe':$scope.data.describe,
                           'picture':encodeURI(JSON.stringify($scope.uploadimgs))

                         
                         }//请求参数
                   })
                   .success(function(data){

                         $ionicLoading.hide();
                          if(data.code == '1'){
                              $ionicLoading.show({
                                 showBackdrop: false,
                                template:data.msg,
                                duration:1500
                              });

                              $timeout(function(){
                                  $state.go("product_list", {}, {reload:true});
                                  $ionicViewSwitcher.nextDirection("forward");
                              },1500);

                            }
                          if(data.code == '2'){

                            $ionicLoading.show({
                               showBackdrop: false,
                                template:data.msg,
                                duration:1500
                            });
                          }
                          
                        })
                        .error(function(data,header,config,status){
                          $ionicLoading.show({
                             showBackdrop: false,
                                template:"网络延迟，请重新尝试",
                                duration:3000
                            });
                        })
   }




      }
  
  $scope.del_pic=function(index){
	 $scope.uploadimgs.splice(index, 1);
  }
  
  
  	
  $scope.choosePicMenu = function() {
      var type = 'gallery';
      
      var pic_num = $scope.uploadimgs.length;
      //alert(pic_num);
      if(pic_num > 4){
    	  $ionicLoading.show({
              showBackdrop: false,
              template:"商品图片最多上传五张",
              duration:2000
          });
    	  return false;
      }
      
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
             
              options.targetHeight = 1200;
              options.targetWidth =1200;
              
              navigator.camera.getPicture(function cameraSuccess(imageUri) {
                   $scope.temp_image=imageUri;
                   
                   $scope.upload_img();
              }, function cameraError(error) {
                  console.debug("Unable to obtain picture: " + error, "app");
              }, options);
          
          }
      });
      $timeout(function() {
           hideSheet();
       }, 3000);
     
  };
  
  
  $scope.upload_img=function(){
      var options = new FileUploadOptions();
      
      options.fileKey="ffile";
      options.fileName=$scope.temp_image.substr($scope.temp_image.lastIndexOf('/')+1);
      options.mimeType="image/jpeg";
      //用params保存其他参数，例如昵称，年龄之类
      var params = {};
      
      params['fileName'] = options.fileName;
      params['sellerid'] = login_obj.sellerid;
      params['checkstr'] = login_obj.checkstr;
      //把params添加到options的params中
      options.params = params;
      //新建FileTransfer对象
      var ft = new FileTransfer();
      var upload_url = http_server+"/index.php?g=Yanyubao&m=Shang&a=uploadfiles";//请求地址
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
              console.log(resp.url);
              $scope.uploadimgs.push(resp.url);
              //弹出缓冲提示
              $scope.showLoadingToast();
              //这里使用定时器是为了缓存一下加载过程，防止加载过快
              $timeout(function () {
                //停止缓冲提示
                $scope.hideLoadingToast();
              }, 500);
          }else if(resp.code == 2){
        	  $ionicLoading.show({
               showBackdrop: false,
                  template:resp.msg,
                  duration:2000
              });
          }
          
      }
      //upload失败的话
      function uploadError(error) {
          $ionicLoading.show({
              showBackdrop: false,
              template:"商品图片上传失败",
              duration:2000
          });
      }
  }
  
  
  
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