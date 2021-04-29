## 使用说明
此 storyboard 文件适用于各种 iPhone 及 iPad 设备的横竖屏，支持自定义界面元素包括

- 页面背景图片或背景颜色
- 中间显示图片
- 底部显示文字及颜色

**注：每一项都是可选的（比如只显示背景图片，按照下面的方法只提供背景图片即可）**

默认效果如下：

![](https://img.cdn.aliyun.dcloud.net.cn/client/ask/pkg/splash/template.png)

自定义方法：使用 HBuilderX 打开 `LaunchScreen.storyboard` 文件，作为xml文件编辑自定义修改部分样式。


### 自定义界面背景

页面背景支持设置`背景色`或设置`背景图片`，**默认为使用背景色，值为systemBackgroundColor，会跟随系统设置的模式自动修改颜色，正常模式为白色暗黑模式为黑色**，

#### 自定义背景色

替换第`42行` color 节点为下面的代码，并将 red、green、blue 属性值修改为自己需要的颜色，取值范围为0到1
```
<color key="backgroundColor" red="0.83516160100000003" green="0.88008347600000003" blue="0.88008347600000003" alpha="1" colorSpace="calibratedRGB"/>
```

#### 自定义背景图

##### 图片要求

|设备|尺寸要求|命名规范|说明|
|:--|:--|:--|:--|
|iPhone 竖屏|以iPhoneX的尺寸设计|`dc_launchscreen_portrait_background@2x.png`、 `dc_launchscreen_portrait_background@3x.png`|以 iPhoneX 竖屏为模板设计图片，并输出@2x、@3x图片，注意命名规范|
|iPhone 横屏|以iPhoneX的尺寸设计|`dc_launchscreen_landscape_background@2x.png`、 `dc_launchscreen_landscape_background@3x.png`|以 iPhoneX 横屏为模板设计图片，并输出@2x、@3x图片，注意命名规范|
|iPad（不区分横竖屏）|以 iPad 9.7 的尺寸设计|`dc_launchscreen_pad_background@2x.png`、 `dc_launchscreen_pad_background@3x.png`|以 iPad 9.7 设备为模板设计图片，并输出@2x、@3x图片，注意命名规范|

将设计好的图片放到根目录即可；

注：如果您不需要背景图片，不存放相应的图片即可；

### 自定义中间显示的图片
请将目录中的`dc_launchscreen_icon@2x.png`、`dc_launchscreen_icon@3x.png`图片替换为您自己的图片

注：如果您不需要中间的图片，不存放相应的图片即可；

### 自定义底部文字
- 修改文字
修改第`35行` label节点的 text 属性值即可，设置为空字符串则不显示文字
```
<label opaque="NO" userInteractionEnabled="NO" contentMode="left" horizontalHuggingPriority="251" verticalHuggingPriority="251" text="xxx提供计算服务" textAlignment="natural" lineBreakMode="tailTruncation" baselineAdjustment="alignBaselines" adjustsFontSizeToFit="NO" translatesAutoresizingMaskIntoConstraints="NO" id="QBH-Ne-rcx">
```

- 修改文字颜色
替换第`38行` color节点为下面的代码，并将 red、green、blue属性值修改为自己需要的颜色，取值范围为0到1
```
<color key="textColor" red="0.83516160100000003" green="0.88008347600000003" blue="0.88008347600000003" alpha="1" colorSpace="calibratedRGB"/>
```

