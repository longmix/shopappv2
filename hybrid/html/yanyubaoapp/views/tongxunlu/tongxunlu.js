
angular.module("tongxunlu",[])

    .controller("tongxunlu",function($scope,$http,$state,$ionicLoading){
       
	   var login_obj = get_login_info();

       if(!login_obj){
          //跳转至登入页
          $state.go("login", {}, {reload:true});
       }
       
       $ionicLoading.show({
           showBackdrop: false,
           template:'<ion-spinner icon="ios-small" class="spinner-calm"></ion-spinner>',
           duration:3000
       });
    	
    	 ////获取手机通讯录
        $scope.get_phone_book = function(){
        	function onSuccess(contacts) {
        	    $scope.yanzheng_phone_book(contacts);
        	};

        	function onError(contactError) {
        	    //alert('onError!');
        	};

        	// find all contacts with 'Bob' in any name field
        	var options      = new ContactFindOptions();
        	//options.filter   = "farther";
        	options.multiple = true;//相同名称的也返回多个
        	//options.desiredFields = [navigator.contacts.fieldType.id];
        	options.hasPhoneNumber = true;
        	var fields = ["displayName", "name", "phoneNumbers", "nickname", "emails"];
        	navigator.contacts.find(fields, onSuccess, onError, options);
        }
        
        //进一步验证通讯录是否是自己的会员
        $scope.yanzheng_phone_book = function(phone_book){
        	 var phone_book = JSON.stringify(phone_book);
        	 phone_book = encodeURI(phone_book);
        	 // alert(typeof(phone_book));
        	 $http({
                 method: 'post',//请求方式
                 url: http_server+"/index.php?g=Yanyubao&m=Shang&a=yanzheng_phone_book",
                 data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'phone_book':phone_book},
                 //timeout: 8000//请求等待时间
             }).success(function(data){
            	 	if(data.code == 1){
            	 		//alert(data.data);
            	 		//var items = JSON.parse(data.data);
            	 		$scope.items = data.data;
            	 		$ionicLoading.hide();
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
    	
    	
        $scope.get_phone_book();
        
      
     //$scope.allow = false;
     /*$scope.items = [
        { id: 0 ,"allow":"true"},
        { id: 1 ,selected:false},
        { id: 2 ,selected:false},
        { id: 3 ,selected:false},
        { id: 4 ,selected:false},
        { id: 5 ,selected:false},
        { id: 6 ,selected:false},
        { id: 7 ,selected:false},
        { id: 8 ,selected:false},
        { id: 9 ,selected:false},
        { id: 10 ,selected:false},
        { id: 11 ,selected:false}
           
      ];*/
     /////全选
     $scope.selectAll=false;  
     $scope.all= function (m) {
    	 for(var i=0;i<$scope.items.length;i++){  
        	 //alert($scope.items[i]['selected']); 
           if(m==true && $scope.items[i]['allow'] == false){  
        	   $scope.items[i].selected=false;  
           }else if(m==false && $scope.items[i]['allow'] == false){  
               $scope.items[i].selected=true;  
           } 
         }
         $scope.selectAll=!m;  
     }; 

     
     ////发送手机号码到消息发送队列
     $scope.phone_book_send = function(){
    	 ////获取选择的手机号码
    	 var selected_phone_book = [];
    	 for(var i=0; i<$scope.items.length; i++){  
        	 //alert($scope.items[i]['selected']); 
           if($scope.items[i].selected == true){
        	   //select_phone_book.push($scope.items[i].phone[j].value);	  
       	       //alert($scope.items[i].name +"--------"+ $scope.items[i].phone[j].type+"-----"+$scope.items[i].phone[j].value  
        	   var arr = [];
        	   arr.push($scope.items[i].phone);
        	   arr.push($scope.items[i].name);
        	   selected_phone_book.push(arr);
           }
         }
    	
    	 var selected_phone_book = JSON.stringify(selected_phone_book);
    	 selected_phone_book = encodeURI(selected_phone_book);
    	 //alert(selected_phone_book);
    	 $http({
             method: 'post',//请求方式
             url: http_server+"/index.php?g=Yanyubao&m=Shang&a=sendsms_phone_book",
             data: {'sellerid':login_obj.sellerid,'checkstr':login_obj.checkstr,'selected_phone_book':selected_phone_book},
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
                    $ionicLoading.show({
                        showBackdrop: false,
                        template:data.msg,
                        duration:2000
                    });
                    //$state.go("statistics", {}, {reload:true});
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
                     template:"网络延迟，请重新尝试",
                     duration:3000
                 });
             });
    	 
    	 
     }
    	 
    	 
     


 });
