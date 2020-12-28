/**
 * Created by hxsd on 2016/9/28.
 */
angular.module("myApp").controller("homeCtrl",function($scope,$http,$ionicSlideBoxDelegate){
    $http.get("homeData.json").success(function(data){
       $scope.data=data
    });
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.$getByHandle("slideHandler").loop(true);

});