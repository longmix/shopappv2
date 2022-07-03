# 智能建站2.0：APP/小程序/H5/PC商城 电商运营工具

  - 智能建站2.0项目源代码，支持安卓和苹果APP、微信支付宝百度等小程序平台。

  - 智能建站2.0属于定制开发类的项目，建议下载源代码自行开发，或联系我们协助开发。

  - Logo、滚动广告、平铺广告、导航图标，可以使用服务器上的设置，也可以在源代码中自行设置。

  - 小程序“模板选项”中的设置项并非全部支持，因为这些选项是为“通版商城”这个小程序模板而设置的， 但是导航栏背景和文字颜色、常用的显示模块等信息还是支持，其他没有涉及到的，直接在源代码中修改； 当然，这些支持的在线设置选项，在源代码中把读取和判断的逻辑去掉，就相当于自己设置了。

  - 会员、商品、订单等，集成延誉宝SaaS云平台，支持大数据并发，性能稳定，不建议剥离。



## 2 项目概况


### 2.1 项目主页

* 项目的设置和使用说明发布在这里：_需要注册才能查看，使用手机号码登录即可_。

   [http://yanyubao.tseo.cn/Supplier/ShopAppV2Mgr/index/setting_type/readme.html](http://yanyubao.tseo.cn/Supplier/ShopAppV2Mgr/index/setting_type/readme.html)

* 主页镜像：关于智能建站2.0的说明，以及找到此文档的链接

  [http://www.abot.cn/2307.html]

  [http://www.abot.cn/2307.html]: http://www.abot.cn/2307.html "智能建站2.0：APP/小程序/H5/PC商城 电商运营工具"


### 2.2 源代码下载

* 最新的代码发布在Github上，喜欢记得点个小星星！

  [https://github.com/longmix/shopappv2](https://github.com/longmix/shopappv2)



* 考虑到Github在国内访问速度较慢，也可以通过国内的Gitee查看（该镜像正在审核中）。

  https://gitee.com/longmix/shopappv2


### 2.3 问题与交流

  - 使用上的问题和疑问，请用微信扫码查看其他开发者的提问和回复记录，也可以在文章末尾写留言。

<img src="http://www.tseo.cn/wp-content/uploads/2020/04/9be115d08294dd9f1eb588d52d662dde.png" width="150px">



## 3 常用设置


  - 当前支持发布的平台有： app-ios，app-android， h5， mp-weixin， mp-alipay， mp-baidu。


### 3.1 选项设置

  - 基本信息：设置商城小程序基本信息，[点击这里](http://yanyubao.tseo.cn/Supplier/Index/shop_setting.html)，设置站点名称和Logo图标，这些信息与H5商城同步。

  - 滚动广告：设置小程序中的滚动广告，[点击这里](http://yanyubao.tseo.cn/Supplier/Index/shop_swiper.html)，将广告类型设置为“小程序商城首页滚动广告”。

  - 平铺广告：设置小程序中的平铺广告，[点击这里](http://yanyubao.tseo.cn/Supplier/Index/shop_swiper.html)，将广告类型设置为“小程序商城首页平铺广告”。

  - 导航图标：设置小程序中的导航图标，[点击这里](http://yanyubao.tseo.cn/Supplier/ShopIconMgr/index/type/7.html)。

  - 模板选项：设置小程序模板选项，[点击这里](http://yanyubao.tseo.cn/Supplier/Index/shop_index/setting_type/index_wxa.html)，可以设置小程序商城的主题颜色、图片以及过审版等。


### 3.2 智能建站2.0（APP/小程序/H5）内链接设置

**商城、商品相关**

  - 跳转商品详情 
    > /pages/product/detail?productid=1234

    > productid为必填项，具体数字在商品列表中获取，获取方式请参考 http://yanyubao.abot.cn/861.html

  - 跳转商品分类 
    > /pages/category/category 

    > （可能会出现在底部导航中）

  - 跳转商品列表 
    > /pages/product/goods-list/goods-list?cataid=1234&cataname=分类001

    > cataid为商品分类ID，具体数字在商品分类列表中获取，获取方式请参考 http://yanyubao.abot.cn/861.html； 如果不填，则显示所有商品。

  - 跳转商品评论 
    > /pages/product/ratings/ratings （开发中）

  - 跳转商品搜索结果 
    > /pages/listdetail/listdetail?keyword=会员卡

    > keyword为必填项，要搜索的商品关键词。

  - 跳转购物车 
    > /pages/cart/cart

  - 跳转订单支付页 
    > /pages/pay/payment/payment

  - 跳转支付成功页 
    > /pages/pay/success/success

  - 跳转充值页 
    > /pages/user/deposit/deposit

  - 跳转优惠券 
    > /pages/user/coupon/coupon

  - 跳转订单列表 
    > /pages/user/order_list/order_list


------

**个人信息相关**

  - 跳转个人中心 
    > /pages/tabbar/user 
    
    > （可能会出现在底部导航中）

  - 跳转用户设置（个人资料） 
    > /pages/user/setting/setting

  - 跳转我的收藏 
    > /pages/user/keep/keep 

    > （包括实体商家收藏）

  - 跳转收货地址 
    > /pages/user/address/address

  - 跳转收货地址编辑页 

    > /pages/user/address/edit/edit?addressid=1234 

    > addressid为必填项，具体数字在收货地址列表中获取

  - 跳转我的二维码 
    > /pages/user/myQR/myQR

  - 跳转我的现金余额和明细 
    > /pages/user/log

  - 跳转我的赠款余额和明细 
    > /pages/user/log?type=zengkuan

  - 跳转我的积分余额和明细 
    > /pages/user/logscore





-------




**消息与对话**

  - 跳转消息列表 /pages/msg/msg
  - 跳转聊天界面 /pages/msg/chat/chat


```
带参数的挂接入口为：“/pages/msg/chat/chat?type=0&userid=123456&name=用户昵称”。其中123456为用户ID。
```


--------



**文章内容（CMS）相关**

  - 跳转文章详情 

    > /pages/help/detail?id=1234


```
1、文章详情页适用于“商城头条的文章”，其中的id为文章ID，可以在延誉宝CMS控制台的 微网站 或 图文回复 中找到ID。
2、文章详情页支持评论、收藏和点赞，如果隐藏评论功能，请在“CMS控制台”的具体项目的“基础应用>>留言板>>留言板配置”中，选择“需要审核”。
3、为了确保详情页的文章可以被正常的评论、点赞和收藏，需要在“ 系统配置 > 全局配置选项 > 延誉宝CMS控制台选项 > 登录信息同步”选中“CMS控制台”。
```


  - 跳转文章列表 
    > /pages/help/list

  - 跳转文章列表 
    > /pages/help/list?cms_token=abcdefg&cms_cataid=1234 

    > （指定文章分类）

  - 跳转文章列表 
    > /pages/help/list?article_list_style=list

    > （按照列表分类显示：左侧图片，右侧为标题和简介）

  - 跳转文章列表 
    > /pages/help/list?article_list_style=icon 

    > （按照图标方式显示，上方为图片，下方为标题，建议标题不超过6个汉字）

```
1、文章列表默认显示“商城头条”中的内容，对应CMS控制台为“商户头条”这个分类，或者在“系统配置>>全局设置选项”中指定了商城头条的CMS Token和内容分类ID。
2、“商城头条”具体设置见：智能建站>>商城头条。
3、挂接其他分类的文章列表，请使用参数cms_token和cms_cataid；支持显示为列表或图标方式。示例如上。
4、另一种挂接文章内容的路径为论坛模式，请查询“ 论坛发帖相关”的模块。
```


----


**自定义页面（CMS）相关**

  - 跳转自定义页面 
    > /pages/welcome_page/welcome_page?scene=1234@4321@cms

    > 1234为CMS的文章ID，4321为推荐者的userid，可以设置为0，cms为平台标志，支持cms和pic两个值。

    > 具体参数见“功能扩展>>自定义页面”。

**万能表单（CMS）相关**

  - 跳转自定义表单（万能表单） 
    > /pages/publish/publish_write?form_type=2&token=abcdefg&formid=1234

    > 支持（1）会员的扩展属性；（2）CMS控制台的万能表单模块（3）发表带自定义属性的文章。具体的设置说明： “功能扩展>>万能表单>>智能建站2.0”。

**实体商家相关**

  - 查看路径： 行业模块>>实体/多商家入驻>>前端和商家入口>>导航图标挂接路径

**论坛发帖相关**

  - 论坛发帖的数据管理在CMS控制台的“文章列表”或者“图文消息”模块，查看挂接路径： 行业模块>>智能建站2.0>>更多功能模块，关于“发帖与评论”的说明。

**小工具和小游戏**

  - 简约时钟 /pages/tools/clock
  - 计算器 /pages/tools/calculator
  - 掷骰子 /pages/tools/dice
  - 扫雷 /pages/tools/mine_clearing
  - 拼图 /pages/tools/puzzle （内测版）
  - 涂鸦 /pages/tools/graffiti （微信小程序中正常，H5和APP中待验证）

----

**跳转到视频号相关的功能**

  - 打开视频号视频
    > wxa_api openChannelsActivity [视频号 id] [视频 feedId]

    > 举例：“wxa_api openChannelsActivity sphS4yv9ezcY4us export/UzFfAgtgekIEAQAAAAAAXCQsCSuQIAAAAAstQy6ubaLX4KHWvLEZgBPE1aM4WTRkOI79zNPgMJrZQ-qh4Sb9SjOQXokzylYT”。

  - 打开视频号活动页
    > wxa_api openChannelsEvent [视频号 id] [活动 id]

    > 举例：“wxa_api openChannelsEvent sphS4yv9ezcY4us export/UzFfAgtgekIEAQAAAAAAXCQsCSuQIAAAAAstQy6ubaLX4KHWvLEZgBPE1aM4WTRkOI79zNPgMJrZQ-qh4Sb9SjOQXokzylYT”。

  - 打开视频号直播
    > wxa_api openChannelsLive [视频号 id]

    > 举例：“wxa_api openChannelsLive sphS4yv9ezcY4us”。

  - 打开视频号主页（跳转到视频号主页）
    > wxa_api openChannelsUserProfile [视频号 id]

    > 举例：“wxa_api openChannelsUserProfile sphS4yv9ezcY4us”。


```
视频号 id，以“sph”开头的id，可在视频号助手获取。
视频号的登陆网址为“ https://channels.weixin.qq.com/ ”，在首页可以查看自己的视频号ID。
如果是在APP中，点击以上链接会自动唤起手机中 的微信，然后自动跳转到视频号相关的功能页面；如果在百度、支付、抖音等其他版本的小程序中，则提示不支持此功能。
跳转到视频号直播和视频号活动，目前的规则是要求必须为同一个认证主体。
```



--------






### 3.3 常用的外部链接说明

  - **Tab页面和非Tab页面跳转**

    - 如果页面被tabBar包含，那么跳转的时候，需要指定，具体格式为：

      > switchTab [pagepath]

      > 用空格分开，switchTab跳转的页面，不能带任何多余的参数，即不可以出现“?”及其后面的内容。

    - 如果页面没有被tabBar包含，那么跳转的时候，需要指定，具体格式为：
      > navigateTo [pagepath]

      > 用空格分开，navigateTo跳转的页面，可以带参数，参数放在“?”后面；


    - 如果在同一个容器中跳转，请使用redirectTo

      > redirectTo [pagepath]

      > 用空格分开，redirectTo跳转的页面，也可以带参数，参数放在“?”后面。


```
商城小程序默认情况下一般都会自动识别，而不需要指定switchTab或者navigateTo。
但是特殊的情况，如：
  1、购物车默认都是在底部Tab上的，但是你发布的小程序版本没有在Tab上挂接购物车，那么在首页导航图标或者会员中心图标中增加购物车链接的时候，需要设置为 “navigateTo /pages/cart/cart”，如果不这样指定，会使用默认的switchTab而跳转失败。 商品分类页面也是类似这样的处理方式：“navigateTo /pages/category/index”。
  2、有一些默认是不包含在底部Tab上的，但是你发布小程序的时候，将这个页面指定到了底部Tab上，那么跳转的时候，需要指定switchTab这个参数。例如“发圈发现随拍”的小程序挂接入口。
```


  - **跳转到H5页面链接设置**

    - 跳转到H5页面，直接填写https://开头的网址，需要说明的是，对应的域名必须是在小程序登记的业务域名中，否则无法显示页面。

    - HTTP链接中支持的变量有：%oneclicklogin%， %ensellerid%， %wxa_appid%， %wxa_openid%。

      - 1、%oneclicklogin%一键登录获取用户信息参数， %ensellerid%商户编码， %wxa_appid%小程序appid， %wxa_openid%微信公众号粉丝openid。

      - 2、调用示例如： https://yanyubao.tseo.cn/Home/Distributor/yaoqing_xiangqing/ensellerid/fimmUPUPV.html?oneclicklogin=%oneclicklogin%


    - 嵌入H5网页的时候，如果页面内设置了头部导航栏，会与小程序默认的导航栏重复，影响页面美观；在延誉宝系统的H5页面中，我们都做了自动判断，如果被小程序中引用，会自动隐藏H5的导航栏； 如果是在APP中引用延誉宝的H5，请在页面网址中增加参数“hidden_nav_header_h5=1”以达到隐藏的目的。

    - 跳转H5网页默认方式为“navigateTo”，即小程序的左上角会显示返回的箭头图标。

      - （1）在小程序中，可以指定使用“redirectTo”跳转，跳转后左上角显示的是小房子图标，用于快速回到首页。 

      - （2）在Android版本的APP中，不会出现左上角的返回图标，需要使用手机的返回功能直接返回原生的功能界面。 

      - （3）在iPhone上，由于没有硬件返回按钮，会导致无法返回原生界面，所以不要做“redirectTo”的设置。


    - 如果要控制网页被分享转发时候的文字和图片，请在挂接网址的同时，增加参数share_image和share_title，例如：

      > /pages/h5browser/h5browser?url=网址&share_title=分享时候的文字&share_image=分享时候显示的图片
    
      > 以上三个参数务必使用urlencode转换之后在赋值使用。


```
对于H5页面内需要反复跳转的网页应用，建议使用redirectTo跳转，以避免用户反复点击返回键产生疑惑。
设置方式：在H5网页的末尾添加“#redirectTo”。例如： https://app.tseo.cn/o2owaimai/Merchant/MerchantWap/index/ensellerid/pQNNmSkaq?refresh_token_value=%refresh_token%&synchronize_userid=1
支持“redirectTo”的跳转设置为： https://app.tseo.cn/o2owaimai/Merchant/MerchantWap/index/ensellerid/pQNNmSkaq?refresh_token_value=%refresh_token%&synchronize_userid=1#redirectTo
```



  - **跳转到其他小程序链接设置**

    - 跳转到其他小程序，使用填写以下格式：
      > miniprogram [url] [appid] [pagepath] [extraData]

      > 用空格分开。

      > [url]替换为网址，[appid]替换为要跳转的小程序，[pagepath]替换为小程序的路径，可以包含参数，如 /pages/detail/detail?id=1577。

      > [extraData]为模板小程序应用级别的参数（App.onLaunch，App.onShow中获取），如 {"sellerid":"abcdef","userid":"1234"}，内容中不能留空格，变量名称和变量值必须用双引号。


    - 在APP中唤起微信小程序，设置相同，会识别APP环境，唤起微信并自动打开小程序和对应的页面；**需要将appid换成小程序账号（gh_开头的）**，同时extraData参数不会被使用。

    - 百度小程序中的相互跳转，设置相同，需要将appid换成百度智能小程序的app key，而不是填几个数字的appid。

    - 小程序官方平台最新的升级，要求跳转其他小程序需要先申明要跳转的小程序ID，所以这里的appid， 需要在发布小程序新版本的时候添加，登录延誉宝CMS后的设置路径为： 项目设置 >>小程序版本控制。如果已经登录，点击这里设置。


  - **拨打电话**

    - 如果需要拨打电话，请按照以下格式填写：
      > tel:[phone_number]

      > 举例：“tel:13812345678”。



-------



## 4 二次开发文档

  > 如果你会简单的代码开发，最好了解一点微信小程序的开发工具，那么，接下来的文档完全可以简单读懂。


### 4.1 源代码：自定义开发和重新编译

  > 源代码的编译和二次开发，在uniapp环境操作，具体的步骤如下：

1. **下载项目源代码：**

  > 通过github或延誉宝官网（www.abot.cn）下载，建议通过github下载最新版本的源代码。

2. **在HBuilder X中打开项目。**

3. **修改配置：**  

  * 【必改】打开项目根目录下的 abot_data.js，如下图所示：

    - 修改 default_sellerid 为自己的延誉宝商户编号；

    - 修改xiaochengxu_appid为自己的小程序appid；

    - 修改current_platform为当前要发布的平台名称，可以设置的值有： app， h5， mp-weixin，  mp-alipay，   mp-baidu。


![源代码修改](https://www.abot.cn/wp-content/themes/abotcn/uploads/2021/04/202104140916377859.png)

  * 【可选项】在项目根目录下，打开pages.json，

     - 找到 navigationBarTitleText 将值改为自己的网站名称，还可以自定义标题文字的颜色和顶部导航的背景色。

   > _备注：微信小程序、百度智能小程序、支付宝小程序对应的appid各不相同，请不要填错了。_

4. **发布项目**

  * 通过 HBuilder X将项目导入到不同的小程序开发环境中编译并提交发布。

  * 发布为APP的操作过程类似，支持uniapp云打包，也可以本地打包为apk或者ipa文件。

  * 打包为ipa文件才可以申请上架苹果应用商店（App Store），如果本地打包，需要在Mac OS环境下运行XCode编译。




### 4.2 关于商品、订单、会员的二次开发接口

  - 接口文档

    > [http://www.abot.cn/yanyubao-api-shop](http://www.abot.cn/yanyubao-api-shop)

    > 文档中没有涉及到的API接口，可以在项目源代码中通过“网络控制台”查看。

  - 源代码主页
    > [http://www.abot.cn/source-code](http://www.abot.cn/source-code)



-------


## 5 更多关于此项目的案例请参考下图

![在线预览](https://www.abot.cn/wp-content/themes/abotcn/uploads/2020/08/202008280733442920.png)


### 5.1 项目功能示意图
![在线预览](https://www.abot.cn/wp-content/themes/abotcn/uploads/2020/10/202011250313394316.png)

## 6 常见问题（FAQ）

**是否支持App Store的苹果超级签名？**

  项目本身并不涉及到超级签，建议通过TestFlight做免签发布，比超级签稳定。

**支持上架安卓市场吗？**

  国内的安卓市场鱼龙混杂，各种上架要求各不相同，但是基本都要有与APP名称一致的软件著作权才可以申请上架，申请软件著作权请查看《[在上海也能直接申请软件著作权啦！](http://www.abot.cn/1804.html)》

