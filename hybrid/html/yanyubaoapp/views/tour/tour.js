
angular.module("tour",[])
    .controller("tourCtrl",function($scope,$http,$state, $stateParams,$ionicLoading,$rootScope,$ionicSlideBoxDelegate, $ionicPopup){

   $scope.config={enter:false};  //控制"进入"按钮是否显示；
   
   $scope.onSlideChanged=function(){
        //                         slide 切换页索引                  slide 切换页数量
		console.log('slide total====>>>'+$ionicSlideBoxDelegate.slidesCount());
		console.log('slide index====>>>'+$ionicSlideBoxDelegate.currentIndex());
		
        if($ionicSlideBoxDelegate.currentIndex()==$ionicSlideBoxDelegate.slidesCount()-1){
            $scope.config.enter=true;
        }
        else if($ionicSlideBoxDelegate.currentIndex()==$ionicSlideBoxDelegate.slidesCount()-2){
            $scope.config.enter=false;
        }
        else{
            $scope.config.nextBtn=true;
        }
    };
 //    $scope.nextSlide=function(){
 //        $ionicSlideBoxDelegate.next();
 //    };
 // $rootScope.footerCtrl=true;
 
		//记录复选框是否被选中
		$scope.is_CheckboxClicked = 1;
		
		$scope.isCheckboxClicked = function (id) {
			$scope.is_CheckboxClicked = !$scope.is_CheckboxClicked;
		}


        $scope.set_is_login=function(){
			console.log('$scope.is_CheckboxClicked====>>>'+$scope.is_CheckboxClicked);
			
			if($scope.is_CheckboxClicked != 1){
				$ionicPopup.show({
					template:"<p style='text-align: center'>请先阅读并同意服务协议和隐私声明</p>",
					title:"提示",
					scope: $scope,
					buttons:[
						{text:"确认",
							
							onTap:function(){
							 
						   }
						},
						/*
						{text:"添加",
							
							onTap:function(){
								 $scope.shanghu_img_add();
							}
						}*/
					]
				})
				
				return;
			}
			
            localStorage.setItem('is_not_first_show', 1);
            $state.go("shouye", {}, {reload:true});
            return;
        }
		
		var rowWidth = screen.width ;
		//var rowHeight = screen.height ;

		$scope.comHeight= parseInt((rowWidth*16)/9)+'px';
		
		console.log('slide scope.comHeight====>>>'+$scope.comHeight);
		
		$scope.addClass = {
			"width" : "100%",
			"height" : $scope.comHeight,
		
		}

});

