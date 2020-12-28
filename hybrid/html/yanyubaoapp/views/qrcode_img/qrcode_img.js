
angular.module("qrcode_img",[])

    .controller("qrcode_img",function($scope,$http,$state, $stateParams,$ionicLoading,$ionicModal){
        var login_obj = get_login_info();

        if(!login_obj){
            //跳转至登入页
            $state.go("login", {}, {reload:true});
            return false;
        }
        $scope.input={};
        
        ///判断二维码类型
        var qrcode_type = $stateParams['type'];
        //alert($qrcode_type);
        if(qrcode_type == 'weixin'){
        	$scope.qq_title = '微信二维码分享';
        	$scope.qq_description = '用手机微信扫描这个二维码，然后用您的手机号码登录，您就可以成为我们的会员啦！';
        	$scope.wechat_title = $scope.qq_title;
        	$scope.wechat_description = $scope.qq_description;
        	$scope.weibo_text = $scope.qq_description;
        }else if(qrcode_type == 'xiaochengxu'){
        	$scope.qq_title = '小程序二维码分享';
        	$scope.qq_description = '手机微信扫描这个小程序二维码，然后用您的手机号码登录，您就可以成为我们的会员啦！';
            $scope.wechat_title = $scope.qq_title;
            $scope.wechat_description = $scope.qq_description;
        	$scope.weibo_text = $scope.qq_description;
        }else if(qrcode_type == 'zhifubao'){
        	$scope.qq_title = '支付宝二维码分享';
        	$scope.qq_description = '用支付宝扫描这个二维码，然后用您的手机号码登录，您就可以成为我们的会员啦！';
            $scope.wechat_title = $scope.qq_title;
            $scope.wechat_description = $scope.qq_description;
        	$scope.weibo_text = $scope.qq_description;
        }else if(qrcode_type == 'uc'){
        	$scope.qq_title = '移动网站二维码分享';
        	$scope.qq_description = '扫描这个二维码用手机号码登录，您就可以成为我们的会员啦！';
            $scope.wechat_title = $scope.qq_title;
            $scope.wechat_description = $scope.qq_description;
        	$scope.weibo_text = $scope.qq_description;
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
                fs.root.getFile("qrcode_img_"+qrcode_type+"_"+login_obj.sellerid+".png", { create: false, exclusive: false },
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
				        	console.log("Successful file read: " + this.result);
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
	              console.log("文件创建失败！")
	              console.log("请求服务器接口获取图片！")
	              $scope.get_img();
	            }
	 
	            //读取文件失败响应
	            function onErrorReadFile(){
	            	console.log("文件读取失败!");
	            	console.log("请求服务器接口获取图片！")
	                $scope.get_img();
	            }
	 
	            //FileSystem加载失败回调
	            function  onErrorLoadFs(error){
	            	console.log("文件系统加载失败！");
	            	console.log("请求服务器接口获取图片！")
	            	$scope.get_img();
	            }
			
        }
		
        //读取网络图片
		$scope.get_img = function(){
			
			//////////////////获取微信二维码
			$http({
	            method: 'post',//请求方式
	            url: http_server+"/index.php?g=Yanyubao&m=Shang&a=get_qrcode_"+qrcode_type,//请求地址
	            data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr}//请求参数，如果使用JSON格式的对象则可为 data: JSON.stringify(obj),
	            //timeout: 8000//请求等待时间
	        })
	            .success(function(data){
	            	
	            	console.log('aaaaaaaaaaa http response.'+JSON.stringify(data));

	                if(data.code == '-1'){
	                     $ionicLoading.show({
	                    	 showBackdrop: false,
	                        template:data.msg,
	                        duration:3000
	                    });
	                    //跳转至登入页
	                    $state.go("login", {}, {reload:true});
	                }
	                if(data.code == '1'){
	                    //console.log(data.qrcode_img_url);
	                    $scope.input.qrcode_img_url = data.qrcode_img_url;
	                    $scope.input.qrcode_img_url_thumb = data.qrcode_img_url_thumb;	                    
	                    $scope.input.print_buy_url = data.print_buy_url;
	                    $scope.input.qrcode_img_ad = data.qrcode_img_ad;
	                    $scope.input.qrcode_img_share_text = data.qrcode_img_share_text;
	                    
	                    $scope.input.share_title = data.share_title;
	                    $scope.input.share_text = data.share_text;
	                    $scope.input.share_logo = data.share_logo;
	                    $scope.input.share_url = data.share_url;
	                    
	                    	///////字段缓存
		                    var obj = new Object();
		                    obj.qrcode_img_url = data.qrcode_img_url;
		                    obj.qrcode_img_url_thumb = data.qrcode_img_url_thumb;
		                    obj.qrcode_img_ad = data.qrcode_img_ad;
		                    obj.qrcode_img_share_text = data.qrcode_img_share_text;
		                    obj.print_buy_url = data.print_buy_url;
		                    
		                    obj.share_title = data.share_title;
		                    obj.share_text = data.share_text;
		                    obj.share_logo = data.share_logo;
		                    obj.share_url = data.share_url;
		                    
		                    obj.cache_time = data.cache_time;
		                    console.log('cache_time:'+data.cache_time);
		                    var obj_str = JSON.stringify(obj);
		                    
		                    console.log("yanyubao_qrcode_"+qrcode_type);
		                    
		                    var obj_str_old = localStorage.getItem("yanyubao_qrcode_"+qrcode_type);
		                    
		                    if(obj_str_old !=  obj_str){
		                    	//缓存返回数据
			                    localStorage.setItem("yanyubao_qrcode_"+qrcode_type, obj_str);
		                    
		                    	///////图片处理
			                    var xhr = new XMLHttpRequest();
			        		    xhr.open('GET', data.qrcode_img_url, true);
			        		    xhr.responseType = 'blob';
		
			        		    xhr.onload = function() {
			        		        if (this.status == 200) {
		
			        		            var blob = new Blob([this.response], { type: 'image/png' });
			        		            var elem = document.getElementById('imageFile');
			        	                elem.src = window.URL.createObjectURL(blob);
			        		            $scope.downloadImage(blob);
			        		        }
			        		    };
			        		    xhr.send();
		                    }
		                    
		                    
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
	        //////////////////////
		}
		//$scope.get_img();
		
		
console.log('0000000 '+qrcode_type);
        
        
//localStorage.setItem("yanyubao_qrcode_"+qrcode_type, null);
		
		var obj_str = localStorage.getItem("yanyubao_qrcode_"+qrcode_type);
		console.log('0000001 '+obj_str);
		
		//获取当前时间戳
		var timestamp = Date.parse(new Date());
		timestamp = timestamp/1000;
		console.log('timestamp:'+timestamp);
		if(obj_str){
			var obj = JSON.parse(obj_str);
			console.log('cache_time:'+obj.cache_time);
			if((obj.cache_time - timestamp) < 60*60 && (obj.cache_time - timestamp) > 0){
				
				//console.log('111111111111');
				
	            $scope.input.qrcode_img_url = obj.qrcode_img_url;
	            $scope.input.qrcode_img_url_thumb = obj.qrcode_img_url_thumb;            
	            $scope.input.qrcode_img_ad = obj.qrcode_img_ad;
	            $scope.input.qrcode_img_share_text = obj.qrcode_img_share_text;
	            $scope.input.print_buy_url = obj.print_buy_url;
	            
	            $scope.input.share_title = obj.share_title;
	            $scope.input.share_text = obj.share_text;
	            $scope.input.share_logo = obj.share_logo;
	            $scope.input.share_url = obj.share_url;
	            
	            $scope.loadImage();
			}else{
				console.log('3333');
				
				$scope.get_img();
				
			}
			
		}
		else{
			console.log('2222');
			
			$scope.get_img();
		}
		

		///将图片存到本地
		$scope.downloadImage = function(blob){
			 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
				 
	                console.log('打开的文件系统: ' + fs.name);
	                saveFile(fs.root, blob, "qrcode_img_"+qrcode_type+"_"+login_obj.sellerid+".png");
	 
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
		
		
        ///////////QQ分享二维码
        $scope.sharePhoto_to_qq = function(type){
        	
        	console.log('thumb:'+ $scope.input.qrcode_img_url);
        	console.log('input:'+ $scope.input);
        	///检测是否安装
        	var args = {};
        	args.client = QQSDK.ClientType.QQ;//QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
        	QQSDK.checkClientInstalled(function () {
        		//alert($scope.input.qrcode_img_url);
        		var args = {};
        		args.client = QQSDK.ClientType.QQ;//QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;//TIM轻聊版
        		if(type == 'qq'){
        		    args.scene = QQSDK.Scene.QQ;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite//Favorite收藏
              	}
        		if(type == 'qq_zone'){
        			args.scene = QQSDK.Scene.QQZone;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
            	}
        		  
             	 args.url = $scope.input.share_url;
                 args.title = $scope.input.share_title;
                 args.description = $scope.input.share_text;
                 args.image = $scope.input.share_logo;
             	  
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
        
        
        ///////////微信分享二维码
        $scope.sharePhoto_to_wechat = function(type){
        	///检测是否安装
        	//alert(type);
        	Wechat.isInstalled(function (installed) {
        	    //alert("Wechat installed: " + (installed ? "Yes" : "No"));
        		//alert($scope.input.qrcode_img_url);
                               
                console.log("Wechat installed: " + (installed ? "Yes" : "No"));
                               
        		if(type == 'friend'){
        			
        			console.log('thumb:'+ $scope.input.qrcode_img_url);
        			//console.log(JSON.stringify($scope.input));
        			//console.log(JSON.stringify($scope));
        			
        			//Android版本的微信分销图片的大小不能超过320
        			//$scope.input.qrcode_img_url_thumb = 'http://yanyubao.tseo.cn/Tpl/Home/default/images/erweima.png';
        			//$scope.input.qrcode_img_url = 'http://yanyubao.tseo.cn/app_qrcode.png';
        			
        			Wechat.share({
            	        message: {
            	            title: $scope.input.share_title,
		                    description: $scope.input.share_text,
		                    thumb: $scope.input.share_logo,
		                    media: {
		                        type: Wechat.Type.WEBPAGE,
		                        webpageUrl: $scope.input.share_url
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
            	            title: $scope.input.share_title,
            	        	description: $scope.input.share_text,
            	        	thumb: $scope.input.share_logo,   //"www/img/thumbnail.png",
                            media: {
                            	type: Wechat.Type.WEBPAGE,
		                        webpageUrl: $scope.input.share_url
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
        
        
        
        ///////////微博分享二维码
        $scope.sharePhoto_to_weibo = function(){
        	 ///检测是否安装
        	 window.weibo.init('2853934742','http://www.example.com/callback.html');
	    	 window.weibo.isInstalled(function(){
        		 //alert("weibo installed Yes");
        		 window.weibo.share({
        		        type: 'image',
        		        data: $scope.input.qrcode_img_url,
        		        text: $scope.input.share_title
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



