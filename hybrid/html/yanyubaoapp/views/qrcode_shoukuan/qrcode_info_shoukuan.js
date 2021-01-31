
angular.module("qrcode_info_shoukuan",[])

    .controller("qrcode_info_shoukuan",function($scope,$http,$state, $stateParams,$ionicLoading,$ionicActionSheet,$timeout){
        var login_obj = get_login_info();

        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return false;
        }
		
        $scope.input={};
        
        ///收款二维码类型
        var qrcode_type = $stateParams['type'];
		
        if(qrcode_type == 'weixin'){
        	$scope.qrcode_name = "微信钱包收款二维码";
        	$scope.upload_text = "更换微信收款二维码";
        	var qrcode_text = "微信";
        }
		else if(qrcode_type == 'zhifubao'){
        	$scope.qrcode_name = "支付宝收款二维码";
        	$scope.upload_text = "更换支付宝收款二维码";
        }
		
		
        $ionicLoading.show({
            showBackdrop: false,
            template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
            duration:2000
        });
        
        //加载图片
        $scope.loadImage = function(){
               
              window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
 
                console.log('打开的文件系统: ' + fs.name);
                fs.root.getFile("qrcode_shoukuan_"+qrcode_type+"_"+login_obj.sellerid+".png", { create: false, exclusive: false },
                 function (fileEntry) {
					readBinaryFile(fileEntry);
					$ionicLoading.hide();
				}, onErrorCreateFile);
 
              }, onErrorLoadFs);

				//读取图片文件
				function readBinaryFile(fileEntry) {
					fileEntry.file(function (file) {
						var reader = new FileReader();
				
				        reader.onloadend = function() {
				            //加载成功显示图片
				        	console.log("Successful file write: " + this.result);
				        	//displayFileData(fileEntry.fullPath + ": " + this.result);
				            var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });
				            //$scope.input.qrcode_img_url = blob;
				            displayImage(blob);
				            
				         };
				
				        reader.readAsArrayBuffer(file);
				
				    }, onErrorReadFile);
				}
				
				//显示图片
	            function displayImage(blob) {
	            	var elem = document.getElementById('imageFile');
	                elem.src = window.URL.createObjectURL(blob);
	                
	             }
	 
	            //文件创建失败回调
	            function  onErrorCreateFile(error){
	              console.log("文件创建失败！");
	              $scope.img = 'images/shoukuan_pic.png';
	              $ionicLoading.hide();
	             }
	 
	            //读取文件失败响应
	            function onErrorReadFile(){
	            	console.log("文件读取失败!");
	            	$scope.img = 'images/shoukuan_pic.png';
	            	$ionicLoading.hide();
	            }
	 
	            //FileSystem加载失败回调
	            function  onErrorLoadFs(error){
	            	console.log("文件系统加载失败！");
	            	$scope.img = 'images/shoukuan_pic.png';
	            	$ionicLoading.hide();
	            }
			
        }
        
        //$scope.loadImage();
		
		//加载图片
        $scope.loadImage_using_plus = function(){
			console.log('aaaaaaaaaaaaaaa');
	
			$scope.img = 'images/shoukuan_pic.png';
			$ionicLoading.hide();
	
	
			
        }
		
		$scope.loadImage_using_plus();

        
        ////选择图片
        $scope.choosePicMenu = function() {
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
                    var options = setOptions_shoukuan(srcType);
                    //var func = createNewFileEntry;
                    
                    options.targetHeight = 1200;
                    options.targetWidth = 1200;
                    
                    navigator.camera.getPicture(function cameraSuccess(imageUri) {
                    	
                         $scope.temp_image=imageUri;
                         
                         console.log(imageUri);
                         
                         //$scope.uoload_img();
                         $scope.upload_local_img();
                         
                        
                         //弹出缓冲提示
                         $scope.showLoadingToast();
                         

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
        
        $scope.upload_local_img = function(){
        	var dataurl = 'data:image/jpeg;base64,'+$scope.temp_image;
        	function dataURLtoBlob(dataurl) {
        	    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        	        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        	    while(n--){
        	        u8arr[n] = bstr.charCodeAt(n);
        	    }
        	    return new Blob([u8arr], {type: 'image/png'});
        	} 
        	
        	var blob = dataURLtoBlob(dataurl);
        	if(!blob){
        		 $ionicLoading.show({
               showBackdrop: false,
                    template:"上传失败,请稍后再试",
                    duration:2000
                });
        	}
        	$scope.downloadImage(blob);
        	

        };
        
        
        ///将图片存到本地
		$scope.downloadImage = function(blob){
			 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
				 
	                console.log('打开的文件系统: ' + fs.name);
	                saveFile(fs.root, blob, "qrcode_shoukuan_"+qrcode_type+"_"+login_obj.sellerid+".png");
	 
	              }, onErrorLoadFs);
			 
			 	//保存图片文件
	            function saveFile(dirEntry, fileData, fileName) {
	                dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
	                    writeFile(fileEntry, fileData);
	                }, onErrorCreateFile);
	            }
	 
	            //将图片数据写入到文件中
	            function writeFile(fileEntry, dataObj, isAppend) {
	              //创建一个写入对象
	              fileEntry.createWriter(function (fileWriter) {
	 
	                  //文件写入成功
	                  fileWriter.onwriteend = function() {
	                	  console.log("Successful file write...");
	                     
	                  };
	 
	                  //文件写入失败
	                  fileWriter.onerror = function(e) {
	                	  console.log("Failed file write: " + e.toString());
	                  };
	                 
	                  //写入文件
	                  fileWriter.write(dataObj);
	                  
	                  var elem = document.getElementById('imageFile');
		              elem.src = window.URL.createObjectURL(dataObj);
	                   $ionicLoading.show({
               showBackdrop: false,
	                      template:"操作成功",
	                      duration:2000
	                  });
	                  //hideSheet();
	              });
	          }
	 
	          //文件创建失败回调
	          function  onErrorCreateFile(error){
	            console.log("文件创建失败！")
	          }
	 
	          //FileSystem加载失败回调
	          function  onErrorLoadFs(error){
	            console.log("文件系统加载失败！")
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

       
});

function setOptions_shoukuan(srcType) {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      
      //destinationType: Camera.DestinationType.FILE_URI,
      //destinationType: Camera.DestinationType.NATIVE_URI,
      destinationType: Camera.DestinationType.DATA_URL,////base64
      
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
  }

