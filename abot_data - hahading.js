{
    "name" : "哈哈订",
    "appid" : "__UNI__5B54B05",
    "description" : "哈哈订APP",
    "versionName" : "1.7.2",
    "versionCode" : 211,
    "transformPx" : false,
    "app-plus" : {
        "usingComponents" : true, //是否启用`自定义组件模式`，为true表示新的`自定义组件模式` ，否则为`template模板模式`   
        "softinput" : {
            "navBar" : "none" // 是否显示软键盘上的导航条  
        },
        /* 5+App特有相关 */
        "splashscreen" : {
            "alwaysShowBeforeRender" : true,
            "waiting" : false,
            "autoclose" : true,
            "delay" : 0
        },
        "modules" : {
            "Share" : {},
            "OAuth" : {},
            "LivePusher" : {},
            "Bluetooth" : {},
            "VideoPlayer" : {},
            "Maps" : {},
            "Speech" : {},
            "Payment" : {},
            "Push" : {}
        },
        /* 模块配置 */
        "distribute" : {
            "orientation" : [ "portrait-primary" ],
            /* 应用发布信息 */
            "android" : {
                /* android打包配置 */
                "permissions" : [
                    "<uses-feature android:name=\"android.hardware.camera\"/>",
                    "<uses-feature android:name=\"android.hardware.camera.autofocus\"/>",
                    "<uses-permission android:name=\"android.permission.ACCESS_COARSE_LOCATION\"/>",
                    "<uses-permission android:name=\"android.permission.ACCESS_FINE_LOCATION\"/>",
                    "<uses-permission android:name=\"android.permission.ACCESS_NETWORK_STATE\"/>",
                    "<uses-permission android:name=\"android.permission.ACCESS_WIFI_STATE\"/>",
                    "<uses-permission android:name=\"android.permission.CALL_PHONE\"/>",
                    "<uses-permission android:name=\"android.permission.CAMERA\"/>",
                    "<uses-permission android:name=\"android.permission.CHANGE_NETWORK_STATE\"/>",
                    "<uses-permission android:name=\"android.permission.CHANGE_WIFI_STATE\"/>",
                    "<uses-permission android:name=\"android.permission.FLASHLIGHT\"/>",
                    "<uses-permission android:name=\"android.permission.GET_ACCOUNTS\"/>",
                    "<uses-permission android:name=\"android.permission.INTERNET\"/>",
                    "<uses-permission android:name=\"android.permission.MODIFY_AUDIO_SETTINGS\"/>",
                    "<uses-permission android:name=\"android.permission.MOUNT_UNMOUNT_FILESYSTEMS\"/>",
                    "<uses-permission android:name=\"android.permission.READ_CONTACTS\"/>",
                    "<uses-permission android:name=\"android.permission.READ_LOGS\"/>",
                    "<uses-permission android:name=\"android.permission.READ_PHONE_STATE\"/>",
                    "<uses-permission android:name=\"android.permission.RECORD_AUDIO\"/>",
                    "<uses-permission android:name=\"android.permission.VIBRATE\"/>",
                    "<uses-permission android:name=\"android.permission.WAKE_LOCK\"/>",
                    "<uses-permission android:name=\"android.permission.WRITE_CONTACTS\"/>",
                    "<uses-permission android:name=\"android.permission.WRITE_EXTERNAL_STORAGE\"/>",
                    "<uses-permission android:name=\"android.permission.WRITE_SETTINGS\"/>"
                ]
            },
            "ios" : {
                "idfa" : false,
                "privacyDescription" : {
                    "NSPhotoLibraryUsageDescription" : "读取相册以用于设置头像",
                    "NSPhotoLibraryAddUsageDescription" : "保存视频或图片素材到相册",
                    "NSCameraUsageDescription" : "使用相机拍摄商品以及设置头像",
                    "NSLocationWhenInUseUsageDescription" : "访问位置以计算最近的服务网点",
                    "NSLocationAlwaysUsageDescription" : "访问位置以计算最近的服务网点",
                    "NSLocationAlwaysAndWhenInUseUsageDescription" : "访问位置以计算最近的服务网点"
                }
            },
            /* ios打包配置 */
            "sdkConfigs" : {
                "maps" : {
                    "amap" : {
                        "appkey_ios" : "615c807e0417fc7daf4b5d9016cbfd2b",
                        "appkey_android" : "25fd4b4244738832a1397ddbb78eb9eb"
                    }
                },
                "payment" : {
                    "weixin" : {
                        "appid" : "wx6939a00416c5d3aa",
                        "UniversalLinks" : "https://yanyubao.tseo.cn/app/ulink/hahading/"
                    },
                    "alipay" : {}
                },
                "ad" : {},
                "speech" : {
                    "ifly" : {}
                },
                "oauth" : {
                    "weixin" : {
                        "appid" : "wx6939a00416c5d3aa",
                        "appsecret" : "aaaaaaaaaaaaaaaaaaaaaaa",
                        "UniversalLinks" : "https://yanyubao.tseo.cn/app/ulink/hahading/"
                    }
                },
                "share" : {
                    "weixin" : {
                        "appid" : "wx6939a00416c5d3aa",
                        "UniversalLinks" : "https://yanyubao.tseo.cn/app/ulink/hahading/"
                    }
                },
                "push" : {}
            },
            "icons" : {
                "android" : {
                    "hdpi" : "unpackage/res/icons/72x72.png",
                    "xhdpi" : "unpackage/res/icons/96x96.png",
                    "xxhdpi" : "unpackage/res/icons/144x144.png",
                    "xxxhdpi" : "unpackage/res/icons/192x192.png"
                },
                "ios" : {
                    "appstore" : "unpackage/res/icons/1024x1024.png",
                    "ipad" : {
                        "app" : "unpackage/res/icons/76x76.png",
                        "app@2x" : "unpackage/res/icons/152x152.png",
                        "notification" : "unpackage/res/icons/20x20.png",
                        "notification@2x" : "unpackage/res/icons/40x40.png",
                        "proapp@2x" : "unpackage/res/icons/167x167.png",
                        "settings" : "unpackage/res/icons/29x29.png",
                        "settings@2x" : "unpackage/res/icons/58x58.png",
                        "spotlight" : "unpackage/res/icons/40x40.png",
                        "spotlight@2x" : "unpackage/res/icons/80x80.png"
                    },
                    "iphone" : {
                        "app@2x" : "unpackage/res/icons/120x120.png",
                        "app@3x" : "unpackage/res/icons/180x180.png",
                        "notification@2x" : "unpackage/res/icons/40x40.png",
                        "notification@3x" : "unpackage/res/icons/60x60.png",
                        "settings@2x" : "unpackage/res/icons/58x58.png",
                        "settings@3x" : "unpackage/res/icons/87x87.png",
                        "spotlight@2x" : "unpackage/res/icons/80x80.png",
                        "spotlight@3x" : "unpackage/res/icons/120x120.png"
                    }
                }
            },
            "splashscreen" : {
                "android" : {
                    "hdpi" : "unpackage/res/splashscreen_hahading/splashscreen_480x762.png",
                    "xhdpi" : "unpackage/res/splashscreen_hahading/splashscreen_720x1242.png",
                    "xxhdpi" : "unpackage/res/splashscreen_hahading/splashscreen_1080x1882.png"
                },
                "ios" : {
                    "iphone" : {
                        "portrait-896h@3x" : "unpackage/res/splashscreen/welcome_1242x2688.png",
                        "portrait-896h@2x" : "unpackage/res/splashscreen/welcome_828x1792.png",
                        "iphonex" : "unpackage/res/splashscreen/welcome_1125x2436.png",
                        "retina55" : "unpackage/res/splashscreen/welcome_1242x2208.png",
                        "retina47" : "unpackage/res/splashscreen/welcome_750x1334.png",
                        "retina40" : "unpackage/res/splashscreen/welcome_640x1136.png",
                        "retina35" : "unpackage/res/splashscreen/welcome_640x960.png"
                    },
                    "storyboard" : "E:/dev/yanyubao/vue/apple dev - hahading/CustomStoryboard.zip"
                },
                "iosStyle" : "storyboard",
                "androidStyle" : "default"
            }
        },
        "uniStatistics" : {
            "enable" : false
        }
    },
    /* SDK配置 */
    "quickapp" : {},
    /* 快应用特有相关 */
    "mp-weixin" : {
        /* 小程序特有相关 */
        "appid" : "wx00d1e2843c3b3f77",
        "setting" : {
            "urlCheck" : true,
            "minified" : true,
            "es6" : false
        },
        "permission" : {
            "scope.userLocation" : {
                "desc" : "你的位置信息将用于显示所在城市"
            }
        },
        "uniStatistics" : {
            "enable" : false
        }
    },
    /* 插件放到ext.json 中定义,
		"plugins": {
			"live-player-plugin": {
			  "version": "1.0.15",
			  "provider": "wx2b03c6e691cd7370"
			}
		 }*/
    "h5" : {
        "router" : {
            "base" : "/h5/abotds/",
            "mode" : "hash"
        },
        "devServer" : {
            "port" : ""
        },
        "uniStatistics" : {
            "enable" : false
        },
        "title" : "延誉电商",
        "template" : "h5_index_template.html"
    },
    "uniStatistics" : {
        "enable" : false
    },
    "mp-alipay" : {
        "uniStatistics" : {
            "enable" : false
        }
    },
    "mp-baidu" : {
        "uniStatistics" : {
            "enable" : false
        },
        "appid" : "19900151",
        "setting" : {
            "urlCheck" : true
        }
    },
    "mp-qq" : {
        "uniStatistics" : {
            "enable" : false
        }
    },
    "mp-toutiao" : {
        "uniStatistics" : {
            "enable" : false
        }
    }
}
