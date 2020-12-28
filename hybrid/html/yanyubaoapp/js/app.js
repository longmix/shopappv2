/**
 * Created by hxsd on 2016/9/28.
 */
angular.module("myApp",["ionic","highcharts-ng","login","shouye","member","data_summary","statistics","statistics_list","coupons_send","set","CoderYuan","gift","gift_list","tour","server",
    "set_up1","set_up3","set_up6","help","qrcode_img","change_photo",'set_brief','set_user_mobile','yijianfankui','set_address',"set_up5",
    "set_up4","add","shanghu_imgs","tongxunlu","yingxiao_index","yingxiao_list","yingxiao_detail","mobile_add","duanxin_manage","weixin_manage","duanxin_mingxi","set_up7","toutiao_list","toutiao_detail","recharge","money_mingxi","cash_integral",
    "shoukuan_log","supplier_score_require","member_detail","score_mingxi","set_password","import_manual","qrcode_info_shoukuan","score_product","add_score_product","score_order","product_list","add_product",
    "my_dingdan","my_kucun","fahuo","my_zhangmu"])

    .config(function($stateProvider,$urlRouterProvider){
    $stateProvider
       /* .state("tour",{url:"/tour",templateUrl:"views/tour/tour.html",controller:"tourCtrl"})*/
        .state("login",{url:"/login",templateUrl:"views/login/login.html",controller:"shanghu_login",cache:false})
        .state("tour",{url:"/tour",templateUrl:"views/tour/tour.html",controller:"tourCtrl"})
        .state("shouye",{url:"/shouye",templateUrl:"views/shouye/shouye.html",controller:"shouye",cache:true})

        .state("coupons_send",{url:"/coupons_send",templateUrl:"views/shouye/coupons_send.html",params: {'action': null,'youhuiid':null},controller:"coupons_send",cache:false})
        .state("gift",{url:"/gift",templateUrl:"views/shouye/gift.html",params: {'mobile': null},controller:"gift"})
        .state("gift_list",{url:"/gift_list",templateUrl:"views/shouye/gift_list.html",params: {'yuid': null},controller:"gift_list"})
        .state("shoukuan_log",{url:"/shoukuan_log",templateUrl:"views/shouye/shoukuan_log.html",controller:"shoukuan_log",cache:false})
        .state("data_summary",{url:"/data_summary",templateUrl:"views/shouye/data_summary.html",controller:"data_summary",cache:false})
        .state("evaluate_maijia",{url:"/evaluate_maijia",templateUrl:"views/evaluate_maijia/evaluate_maijia.html"})
        .state("evaluate",{url:"/evaluate",templateUrl:"views/evaluate/evaluate.html"})
        .state("statistics",{url:"/statistics",templateUrl:"views/shouye/statistics.html",controller:"statistics",cache:false})
        .state("statistics_list",{url:"/statistics_list",templateUrl:"views/shouye/statistics_list.html",params: {'youhui_user_list': null,'coupon_name':null},controller:"statistics_list"})
        .state("toutiao_list",{url:"/toutiao_list",templateUrl:"views/shouye/toutiao_list.html",controller:"toutiao_list",cache:false})
        .state("toutiao_detail",{url:"/toutiao_detail",templateUrl:"views/shouye/toutiao_detail.html",params:{'id':null,'action':null},controller:"toutiao_detail",cache:false})
        .state("yingxiao_index",{url:"/yingxiao_index",templateUrl:"views/shouye/yingxiao_index.html",controller:"yingxiao_index",cache:false})
		
        .state("yingxiao_list",{url:"/yingxiao_list",templateUrl:"views/shouye/yingxiao_list.html",controller:"yingxiao_list",cache:false,params:{'type':null,'name':null}})
       
		
        .state("yingxiao_detail",{url:"/yingxiao_detail",templateUrl:"views/shouye/yingxiao_detail.html",params:{'imgid':null,'type':null},controller:"yingxiao_detail",cache:false})
        .state("member",{url:"/member",templateUrl:"views/shouye/member.html",params:{'wait':null},controller:"user_list",cache:false})
        .state("summarization",{url:"/summarization",templateUrl:"views/summarization/summarization.html"})
        .state("xiu",{url:"/xiu",templateUrl:"views/shouye/xiu.html",controller:"xiu",cache:false})
        .state("qrcode_list_shoukuan",{url:"/qrcode_list_shoukuan",templateUrl:"views/qrcode_shoukuan/qrcode_list_shoukuan.html"})
        .state("qrcode_info_shoukuan",{url:"/qrcode_info_shoukuan",templateUrl:"views/qrcode_shoukuan/qrcode_info_shoukuan.html",params:{'type':null},controller:"qrcode_info_shoukuan",cache:false})
        .state("qrcode_img",{url:"/qrcode_img",templateUrl:"views/qrcode_img/qrcode_img.html",params:{'type':null},controller:"qrcode_img",cache:false})
        .state("set",{url:"/set",templateUrl:"views/set/set.html",params:{'wait':null},controller:"set_user",cache:false})
        .state("set_up1",{url:"/set_up1",templateUrl:"views/set/set_up1.html",params:{'name':null},controller:"set_up1"})
        .state("set_up3",{url:"/set_up3",templateUrl:"views/set/set_up3.html",params:{'telephone':null},controller:"set_up3"})
        .state("set_up4",{url:"/set_up4",templateUrl:"views/set/set_up4.html",controller:"set_up4"})
        .state("set_up5",{url:"/set_up5",templateUrl:"views/set/set_up5.html",controller:"set_up5"})
        .state("set_up6",{url:"/set_up6",templateUrl:"views/set/set_up6.html",controller:"set_up6"})///使用帮助
        .state("set_up7",{url:"/set_up7",templateUrl:"views/set/set_up7.html",controller:"set_up7"})///使用帮助
         .state("cash_integral",{url:"/cash_integral",templateUrl:"views/set/cash_integral.html",controller:"cash_integral",cache:false})
         .state("add",{url:"/add",templateUrl:"views/set/add.html",params:{'action':null},controller:"add",cache:false})
        .state("duanxin_manage",{url:"/duanxin_manage",templateUrl:"views/set/duanxin_manage.html",controller:"duanxin_manage",cache:false})
        .state("duanxin_mingxi",{url:"/duanxin_mingxi",templateUrl:"views/set/duanxin_mingxi.html",controller:"duanxin_mingxi",cache:false})
        .state("weixin_manage",{url:"/weixin_manage",templateUrl:"views/set/weixin_manage.html",controller:"weixin_manage",cache:false})
        .state("set_brief",{url:"/set_brief",templateUrl:"views/set/set_brief.html",controller:"set_brief"})
        .state("set_user_mobile",{url:"/set_user_mobile",templateUrl:"views/set/set_user_mobile.html",params:{'mobile':null},controller:"set_user_mobile"})
        .state("shanghu_imgs",{url:"/shanghu_imgs",templateUrl:"views/set/shanghu_imgs.html",controller:"shanghu_imgs",cache:false})
        .state("help",{url:"/help",templateUrl:"views/set/help.html",params:{'gonggaoid':null,'action':null},controller:"help",cache:false})
        .state("yijianfankui",{url:"/yijianfankui",templateUrl:"views/set/yijianfankui.html",controller:'yijianfankui'})
        .state("change_photo",{url:"/change_photo",templateUrl:"views/set/change_photo.html",params:{'head_logo':null},controller:"change_photo"})
        .state("server",{url:"/server",templateUrl:"views/shouye/server.html",controller:"server"})
        .state("set_address",{url:"/set_address",templateUrl:"views/set/set_address.html",controller:"set_address",cache:false})
        .state("tongxunlu",{url:"/tongxunlu",templateUrl:"views/tongxunlu/tongxunlu.html",controller:"tongxunlu",cache:false})
        .state("mobile_add",{url:"/mobile_add",templateUrl:"views/mobile_add/mobile_add.html",params:{'title_name':null,'mobile':null},controller:"mobile_add",cache:false})
		
        .state("recharge",{url:"/recharge",templateUrl:"views/recharge/recharge.html",params:{'userid':null},controller:"recharge",cache:false})
		.state("cash_register",{url:"/cash_register",templateUrl:"views/recharge/cash_register.html",params:{'userid':null},controller:"cash_register",cache:false})
		
        .state("money_mingxi",{url:"/money_mingxi",templateUrl:"views/money_mingxi/money_mingxi.html",params:{'userid':null,'money_type':null},controller:"money_mingxi",cache:false})
        .state("supplier_score_require",{url:"/supplier_score_require",templateUrl:"views/supplier_score_require/supplier_score_require.html",params:{'wait':null},controller:"supplier_score_require",cache:false})
        .state("member_detail",{url:"/member_detail",templateUrl:"views/member_detail/member_detail.html",params:{'userid':null},controller:"member_detail",cache:false})
        .state("score_mingxi",{url:"/score_mingxi",templateUrl:"views/score_mingxi/score_mingxi.html",params:{'userid':null},controller:"score_mingxi",cache:false})
        .state("set_password",{url:"/set_password",templateUrl:"views/set_password/set_password.html",params:{'mobile':null},controller:"set_password",cache:false})
        .state("import_manual",{url:"/import_manual",templateUrl:"views/import_manual/import_manual.html",controller:"import_manual",cache:false})//手动录入
       

       .state('score_product', {
                url: '/score_product',
                templateUrl: "views/score_product/score_product.html",
                controller: 'score_product',
                cache:false
          })

       .state("add_score_product",{
                 url:"/add_score_product",
                 templateUrl:"views/add_score_product/add_score_product.html",
                 controller:"add_score_product",
                 params:{'caozuo':null,'productid':null},
                 cache:false
             })
      .state("score_order",{
                 url:"/score_order",
                 templateUrl:"views/score_order/score_order.html",
                 controller:"score_order",
                 cache:false
             })
        /* .state("tabs",{url:"/tabs",templateUrl:"views/tabs/tabs.html",abstract:true})*/
     .state('product_list', {
                    url: '/product_list',
                    templateUrl: "views/product_list/product_list.html",
                    controller: 'product_list'
              })
    .state("add_product",{
                   url:"/add_product",
                   templateUrl:"views/add_product/add_product.html",
                   controller:"add_product",
                   params:{'caozuo':null,'productid':null},
                   cache:false
               })
    .state('dingdan', {
                url: '/dingdan',
                templateUrl: "views/my_dingdan/my_dingdan.html",
                controller: 'my_dingdan'
              })
    .state("my_kucun",{
                url:"/my_kucun",
                templateUrl:"views/my_kucun/my_kucun.html",
                controller:"my_kucun"
                })//我的库存
  .state('fahuo', {
                url: '/fahuo',
                templateUrl: "views/fahuo/fahuo.html",
                controller: 'fahuo',
                params:{'orderid':null},
                cache:false  
      })
  .state("my_zhangmu",{
                url:"/my_zhangmu",
                templateUrl:"views/my_zhangmu/my_zhangmu.html",
                controller:"my_zhangmu",
            })
    //默认路由
        if(show_welcome_page()){
            $urlRouterProvider.otherwise("/tour")
        }
        else{
            $urlRouterProvider.otherwise("/shouye")
        }

},
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

    // .factory('myFac', function() {  
 //            return {  
 //                changeTheme : function(themeFile) {  
 //                    //根据ID定位加载css的元素，将其href修改为特定css文件  
 //                    document.getElementById('global-css').setAttribute('href',  
 //                            themeFile);  
 //                }  
 //            };  
 //        })



    .controller("modalCtrl",function($scope,$rootScope,$ionicModal,myFac){
        
        var color = get_color_type();
        console.log(color.type);
        if(color.type == 'lanse'){
            myFac.changeTheme('lib/css/ionic.css');
        }
        if(color.type == 'chengse'){
            myFac.changeTheme('lib/css/ionic_chengse.css');
        }
        if(color.type == 'lvse'){
            myFac.changeTheme('lib/css/ionic_lvse.css');
        }
        if(color.type == 'zise'){
            myFac.changeTheme('lib/css/ionic_zise.css');
        }
        
        
        
        
        
        
    //alert('sss');
                                //内联模板ID
   /* $ionicModal.fromTemplateUrl("views/modal.html",{
        scope: $scope,   // 作用域使用父作用域
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };*/
    //alert($rootScope);
    //console.log($rootScope.footerCtrl)
});