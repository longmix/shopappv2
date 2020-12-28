(function () {
    /*
     coder yuan 嘻嘻……   
     */
    'use strict';
    angular.module('CoderYuan', [])
        /*日期时间选择*/
        .directive('timePicker', [
            '$timeout',
            '$compile', '$ionicScrollDelegate', '$ionicBackdrop', '$q',
            function ($timeout, $compile, $ionicScrollDelegate, $ionicBackdrop, $q) {
                return {
                    template: '<div>{{selectDateTime.show}}</div>',
                    restrict: 'AE',
                    replace: true,
                    scope: {
                        timePickerResult: '=', //双向绑定
                        loadDateTime: '=',  // 用于从服务端加载(或其他方式加载时间,反正是延迟的就对了) 初始 时间日期数值  //要配合options 中的loadLazy 属性使用  如果默认时间是从服务端加载回来的
                        //要做如下设置  <time-picker  load-date-time="data.dateTime" loadLazy="true" time-picker-result="result"></time-picker>
                        //即 loadLazy 设置为true(默认是false)标识时间数据延迟加载  data.dateTime 是从服务端加载回来的时间数据
                    },
                    link: function (scope, elm, attrs) {
                        var tem = "<div class='pickerContainer datetimeactive'>" +
                            "<div class='main'>" +
                            "<div  class='header'>{{options.title}}</div>"
                            + "<div class='body'>"
                            + "<div class='row row-no-padding'>" +
                            "<div class='col'  ng-if='!options.hideYear' ><ion-scroll  on-scroll='scrollingEvent(\"year\")' delegate-handle='yearScroll' scrollbar-y='false' class='yearContent'>" + "<ul>" + "<li ng-style='year.selected ? { color: \"#0081b8\",fontWeight: \"bold\", fontSize: \"1.2em\"}:{}' ng-click='selectEvent(\"year\",$index)' ng-repeat='year in yearList'>{{year.text}}</li>" + "</ul>" + "</ion-scroll></div>" +
                            "<div class='col ' ng-if='!options.hideDate' ><ion-scroll on-scroll='scrollingEvent(\"date\")' delegate-handle='dateScroll' scrollbar-y='false' class='dateContent'>" + "<ul>" + "<li ng-style='date.selected ? { color: \"#0081b8\",fontWeight: \"bold\", fontSize: \"1.2em\"}:{}' ng-click='selectEvent(\"date\",$index)' ng-repeat='date in dateList'>{{date.text}}</li>" + "</ul>" + "</ion-scroll></div>" +
                            "<div class='col ' ng-if='!options.hideTime' ><ion-scroll on-scroll='scrollingEvent(\"time\")' delegate-handle='timeScroll' scrollbar-y='false' class='timeContent'>" + "<ul>" + "<li ng-style='time.selected ? { color: \"#0081b8\",fontWeight: \"bold\", fontSize: \"1.2em\"}:{}' ng-click='selectEvent(\"time\",$index)' ng-repeat='time in timeList'>{{time.text}}</li>" + "</ul>" + "</ion-scroll></div>" +
                            "</div>"
                            + "<div class='body_center_highlight'></div>" +
                            "</div>" +
                            "<div class='footer'>" +
                            "<span ng-click='ok()'>确定</span><span ng-click='cancel()'>取消</span>" +
                            "</div>" +
                            "</div>" +
                            "</div>";
                        // 配置 教程  ！！！！！！！！   time-picker-result 这个选项是必须配置的 用来接收选择结果 其他的可不用 使用默认配置
                        //options 中的参数  都可在页面配置  如
                        // <time-picker
                        // timeSpan="30"
                        // DateTime="2012-20-09 10:30"  ！！！注意这里  时间部分的设置 要 和参数中的 timespan 相对应 如 timeSpan 为 15 时 则生成的时间 列表 是 10:00 10:15 10:30 10:45.... 这时就要求 分钟数要相对 如不能设置 为 10:18
                        // dateNum="10" //可选年份数量
                        // dateNum="10" //可选如期数量
                        // title="我是程序员"
                        // time-picker-result="model.result">
                        // </time-picker>
                        var options = {
                            title: attrs.title || "时间选择",
                            height: 40,// 每个滑动 li 的高度 这里如果也配置的话 要修改css文件中的高度的定义
                            dateNum: parseInt(attrs.datenum) || 20,//可选日期数量
                            timeNum: parseInt(attrs.timenum) || 24,//可选时间数量
                            yearNum: parseInt(attrs.yearnum) || 20,// 可选年份数量
                            DateTime: attrs.datetime && new Date(attrs.datetime) || new Date(), //开始时间日期  不给默认是当天
                            timeSpan: attrs.timespan && parseInt(attrs.timespan) || 15, //时间间隔 默认 15分钟一个间隔 15/30
                            minuteSkip: attrs.minuteskip && parseInt(attrs.minuteskip),//当前时间多少分钟后 可选 15 30  ！！！注意 这个设置会覆盖 datetime中设定的时间部分的值
                            loadLazy: attrs.loadlazy || false,  //标识默认的时间数据是否从服务端加载回来的
                            hideYear: attrs.hideyear || false, //选择器中隐藏年份选择栏
                            hideDate: attrs.hidedate || false,//选择器中隐藏日期选择栏
                            hideTime: attrs.hidetime || false//选择器中隐藏时间选择栏
                        }
                        scope.options = options;
                        scope.yearScrollTimer = null; //年份滑动定时器
                        scope.dateScrollTimer = null; //日期滑动定时器
                        scope.timeScrollTimer = null; //时间滑动定时器
                        scope.dateList = [];
                        scope.timeList = [];
                        scope.yearList = [];
                        scope.selectDateTime = {
                            year: {item: null, index: 0},
                            date: {item: null, index: 0},
                            time: {item: null, index: 0},
                            show: ""
                        };
                        if (options.loadLazy) {
                            scope.$watch("loadDateTime", function () {
                                if (scope.loadDateTime) {
                                    options.DateTime = new Date(scope.loadDateTime);
                                    scope.options = options;
                                    init(options);
                                }
                            });
                        } else {
                            scope.options = options;
                            init(options);
                        }

                        elm.on("click", function () {
                            show();
                            scrollToElm(scope.timeScroll, scope.timeList[scope.selectDateTime.time.index - 3]);
                            scrollToElm(scope.dateScroll, scope.dateList[scope.selectDateTime.date.index - 3]);
                        });
                        //滑动Event
                        scope.scrollingEvent = function (type) {

                            var opEntity = getOperateEntity(type);
                            //当前存在滑动则取消
                            scope[opEntity.scrollTimer] && $timeout.cancel(scope[opEntity.scrollTimer]);

                            var posi = scope[opEntity.scrollHandler].getScrollPosition();
                            var index = Math.abs(Math.round(posi.top / scope.options.height));
                            if (posi.top == index * scope.options.height) {
                                updateSelect(index + 3, type);
                            } else {
                                scope[opEntity.scrollTimer] = $timeout(function () {
                                    posi.top = index * 40;
                                    updateSelect(index + 3, type);
                                    scrollToPosi(scope[opEntity.scrollHandler], posi);
                                }, 100);
                            }
                        }
                        //点击Event
                        scope.selectEvent = function (type, index) {
                            var opEntity = getOperateEntity(type);
                            if (index > 2 && index <= scope[opEntity.data].length - 3) {
                                scrollToElm(scope[opEntity.scrollHandler], scope[opEntity.data][index - 3]);
                            }
                        }

                        //初始化
                        function init(options) {
                            initYear(options);
                            initDate(options);
                            initTime(options);
                            tem = angular.element(tem);
                            $compile(tem)(scope);
                            angular.element(document.body).append(tem);
                            scope.yearScroll = $ionicScrollDelegate.$getByHandle("yearScroll");
                            scope.dateScroll = $ionicScrollDelegate.$getByHandle("dateScroll");
                            scope.timeScroll = $ionicScrollDelegate.$getByHandle("timeScroll");
                            getSelectDateTime();
                            setSelectDateTimeShow();
                        }

                        //年份初始化
                        function initYear(options) {
                            var sYear = options.DateTime.getFullYear();
                            var text, data, top;
                            prependLi(scope.yearList, 3, "b")
                            for (var i = 0; i < options.yearNum; i++) {
                                text = sYear + i;
                                data = sYear + i;
                                top = options.height + scope.yearList[scope.yearList.length - 1].top;
                                scope.yearList.push(createDateTimeLi(0, top, data, false, text))
                            }
                            prependLi(scope.yearList, 3, "e")
                            setDefaultSelectDateTime("year");
                        }

                        //日期初始化
                        function initDate(options) {
                            //开始时间
                            var sYear = options.DateTime.getFullYear(), sMonth = options.DateTime.getMonth(),
                                sDate = options.DateTime.getDate(),
                                dateTimeNow = new Date(),
                                dateNow = dateTimeNow.getDate(),
                                w = "日一二三四五六".charAt(dIndex);
                            prependLi(scope.dateList, 3, "b")
                            for (var i = 0; i < options.dateNum; i++) {
                                var nextDate = new Date(sYear, sMonth, sDate + i), m = nextDate.getMonth() + 1, d = nextDate.getDate(), dIndex = nextDate.getDay(), w = "日一二三四五六".charAt(dIndex);
                                m = prependZero(m, 10);
                                d = prependZero(d, 10);
                                if (parseInt(d) == getDateAfterNum(dateTimeNow, 0)) {
                                    text = "今天";
                                } else if (parseInt(d) == getDateAfterNum(dateTimeNow, 1)) {
                                    text = "明天";
                                } else if (parseInt(d) == getDateAfterNum(dateTimeNow, 2)) {
                                    text = "后天";
                                }
                                else {
                                    var text = m + "月" + d + "日";
                                }
                                var data = m + "-" + d;
                                var top = options.height + scope.dateList[scope.dateList.length - 1].top;
                                scope.dateList.push(createDateTimeLi(0, top, data, false, text))
                            }
                            prependLi(scope.dateList, 3, "e");
                            setDefaultSelectDateTime("date");
                        }

                        //时间初始化
                        function initTime(options) {
                            prependLi(scope.timeList, 3, "b");
                            var timeStart = options.DateTime.getHours();
                            for (var i = 0; i < options.timeNum; i++) {
                                var t = timeStart + i;
                                if (t >= 24) {
                                    t = t - 24;
                                    t = prependZero(t, 10);
                                } else if (t < 10) {
                                    t = prependZero(t, 10);
                                }
                                //按时间间隔来生产时间li
                                for (var j = 0; j < 60 / (options.timeSpan); j++) {
                                    var top = options.height + scope.timeList[scope.timeList.length - 1].top;
                                    var data = t + ":" + (j * options.timeSpan == 0 ? "00" : j * options.timeSpan);
                                    scope.timeList.push(createDateTimeLi(0, top, data, false, data));
                                }
                            }
                            prependLi(scope.timeList, 3, "e");
                            //获取默认选择时间
                            var defaultSelectTime = getDefaultSelectTime(options);
                            angular.forEach(scope.timeList, function (item, index) {
                                if (item.data == defaultSelectTime) {
                                    item.selected = true;
                                    scope.selectDateTime.time.item = item;
                                    scope.selectDateTime.time.index = index;
                                    return;
                                }
                            });
                        }

                        //计算默认的选择时间
                        function getDefaultSelectTime(options) {
                            var hour;
                            var minu;
                            if (options.minuteSkip || ((options.DateTime.getMinutes() / options)) != 0) {
                                options.minuteSkip = options.minuteSkip || 30;
                                var datetimeNow = new Date();
                                hour = datetimeNow.getHours();
                                minu = datetimeNow.getMinutes();
                                minu = minu + options.minuteSkip;
                                var span = minu - 60;
                                var spanNum;
                                if (span >= 0) {
                                    hour += 1;
                                    spanNum = Math.round(Math.abs(span) / options.timeSpan);
                                } else {
                                    spanNum = Math.round(minu / options.timeSpan);
                                }
                                switch (spanNum) {
                                    case 1:
                                        minu = options.timeSpan;
                                        break;
                                    case 2:
                                        minu = options.timeSpan * 2;
                                        break;
                                    case 3:
                                        minu = options.timeSpan * 3;
                                        break;
                                    case 4:
                                        hour += 1;
                                        minu = 0;
                                    default :
                                        minu = 0;
                                        break;
                                }
                            } else {
                                hour = options.DateTime.getHours();
                                minu = options.DateTime.getMinutes();
                            }
                            return prependZero(hour, 10) + ":" + prependZero(minu, 10);
                        }

                        //计算默认选择的日期
                        function getDefaultSelectDate(options) {
                            return scope.dateList[3].data;
                        }

                        //计算默认选择的年份
                        function getDefaultSelectYear(options) {
                            return scope.yearList[3].data;
                        }

                        //设置默认选择的DateTime
                        function setDefaultSelectDateTime(type) {
                            var entity = getOperateEntity(type);
                            angular.forEach(scope[entity.data], function (item, index) {
                                if (item.data == entity.defaultSelected) {
                                    item.selected = true;
                                    scope.selectDateTime[entity.selectedItem].item = item;
                                    scope.selectDateTime[entity.selectedItem].index = index;
                                    return;
                                }
                            });
                        }

                        function prependZero(data, num) {
                            return data >= num ? data : "0" + data;
                        }

                        function createDateTimeLi(left, top, data, selected, text) {
                            var li = {left: left, top: top, data: data, selected: selected, text: text};
                            return li;
                        }

                        function prependLi(arr, num, loc) {
                            loc = loc || "b";
                            switch (loc) {
                                case "b":
                                    for (var i = 0; i < num; i++) {
                                        arr.push(createDateTimeLi(0, options.height * i, "", false, ""));
                                    }
                                    break;
                                case "e":
                                    //最后那个li元素的 top
                                    var lastPosiTop = arr[arr.length - 1].top;
                                    for (var j = 0; j < num; j++) {
                                        arr.push(createDateTimeLi(0, (options.height * (i + 1) + lastPosiTop), "", false, ""));
                                    }
                                    break;
                            }
                        }

                        function setArraySelectedState(arr, state) {
                            state = state || false;
                            angular.forEach(arr, function (item, index) {
                                item.selected = state;
                            });
                        }

                        function getDateAfterNum(dateTimeNow, afterNum) {
                            //return
                            dateTimeNow.setDate(dateTimeNow.getDate() + afterNum);
                            var date = dateTimeNow.getDate();
                            dateTimeNow.setDate(dateTimeNow.getDate() - afterNum);
                            return date;
                        }

                        //滑动到指定元素
                        function scrollToElm(scorllHandler, elm) {
                            scorllHandler.scrollTo(elm.left, elm.top, true);
                        }

                        //滑动到指定位置
                        function scrollToPosi(scorllHandler, posi) {
                            scorllHandler.scrollTo(posi.left, posi.top, true);
                        }

                        function updateSelect(index, type) {
                            switch (type) {
                                case "year":
                                    //强制
                                    $timeout(function () {
                                        scope.selectDateTime.year.item.selected = false;
                                        scope.yearList[index].selected = true;
                                        scope.selectDateTime.year.item = scope.yearList[index];
                                        scope.selectDateTime.year.index = index;
                                    });
                                    break;
                                case "date":
                                    $timeout(function () {
                                        scope.selectDateTime.date.item.selected = false;
                                        scope.dateList[index].selected = true;
                                        scope.selectDateTime.date.item = scope.dateList[index];
                                        scope.selectDateTime.date.index = index;
                                    });
                                    break;
                                case "time":
                                    $timeout(function () {
                                        scope.selectDateTime.time.item.selected = false;
                                        scope.timeList[index].selected = true;
                                        scope.selectDateTime.time.item = scope.timeList[index];
                                        scope.selectDateTime.time.index = index;
                                    });
                                    break;
                            }
                        }

                        //选中时间展示
                        function setSelectDateTimeShow() {
                            var yearTxt = scope.selectDateTime.year.item.text;
                            var dateTxt = scope.selectDateTime.date.item.text;
                            var timeTxt = scope.selectDateTime.time.item.text;
                            scope.selectDateTime.show = (scope.options.hideYear?"":yearTxt+ " " )+ (scope.options.hideDate?"":dateTxt + " " )+ (scope.hideTime?"":timeTxt);
                        }

                        //获取选中的datetime
                        function getSelectDateTime() {
                            var year, date, time;
                            for (var i = 0; i < scope.yearList.length; i++) {
                                if (scope.yearList[i].selected) {
                                    date = scope.yearList[i].data;
                                    scope.selectDateTime.year.item = scope.yearList[i];
                                    scope.selectDateTime.year.index = i;
                                    break;
                                }
                            }
                            for (var i = 0; i < scope.dateList.length; i++) {
                                if (scope.dateList[i].selected) {
                                    date = scope.dateList[i].data;
                                    scope.selectDateTime.date.item = scope.dateList[i];
                                    scope.selectDateTime.date.index = i;
                                    break;
                                }
                            }
                            for (var j = 0; j < scope.timeList.length; j++) {
                                if (scope.timeList[j].selected) {
                                    time = scope.timeList[j].data;
                                    scope.selectDateTime.time.item = scope.timeList[j];
                                    scope.selectDateTime.time.index = j;
                                    break;
                                }
                            }
                            if (!year) {
                                year = scope.selectDateTime.year.item.data;
                            }
                            if (!date) {
                                date = scope.selectDateTime.date.item.data;
                            }
                            if (!time) {
                                time = scope.selectDateTime.time.item.data;
                            }
                            var result = year + "-" + date + " " + time;
                            scope.timePickerResult = result;
                            //console.log(result)
                            return result;

                        }

                        function getOperateEntity(type) {
                            var entity = new Object();
                            var scrollTimer, scrollHandler, data, defaultSelected, selectedItem;
                            switch (type) {
                                case "year":
                                    entity.scrollTimer = "yearScrollTimer";
                                    entity.scrollHandler = "yearScroll";
                                    entity.data = "yearList";
                                    entity.defaultSelected = getDefaultSelectYear(scope.options);
                                    entity.selectedItem = "year";
                                    break;
                                case "date":
                                    entity.scrollTimer = "dateScrollTimer";
                                    entity.scrollHandler = "dateScroll";
                                    entity.data = "dateList";
                                    entity.defaultSelected = getDefaultSelectDate(scope.options);
                                    entity.selectedItem = "date";
                                    break;
                                case "time":
                                    entity.scrollTimer = "timeScrollTimer";
                                    entity.scrollHandler = "timeScroll";
                                    entity.data = "timeList";
                                    entity.defaultSelected = getDefaultSelectTime(scope.options);
                                    entity.selectedItem = "time";
                                    break;
                            }
                            return entity;
                        }

                        scope.ok = function () {
                            var datetime = getSelectDateTime();
                            setSelectDateTimeShow();
                            hide();
                            //   console.log(datetime)
                        }
                        scope.cancel = function () {
                            hide();
                        }

                        function show() {
                            $ionicBackdrop.retain();
                            tem.css("display", "block");
                        }

                        function hide() {
                            tem.css("display", "none");
                            $ionicBackdrop.release();
                        }

                        function remove() {
                            tem.remove();
                        }

                        scope.$on("$destroy", function () {
                            remove();
                        })
                    }
                }
            }
        ]);
})(window, document);
