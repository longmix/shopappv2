<template>
	<view :style="{backgroundColor: index_page_bg_color}">
		
		
		<!-- 新的首页  Begin -->
		<view class="jicundian_main" style="background-color: rgba(240,240,240,0.7);">
			
			
			<view class="jicun_block_one" style="padding-top:50rpx; background-size:100% 500rpx;background-position: center top;background-repeat: no-repeat; ">
				<!--头部图片文字-->
				
				<view style="margin: 0 0 20rpx 80rpx;">
					<view style="font-size: 50rpx;color: #ffffff;">哈哈寄存<br/>让旅途更轻松</view>
					
					<view style="font-size: 20rpx;color: #ffffff;border-radius: 50rpx;background-color: rgba(255,255,255,0.3);width: 310rpx;height: 35rpx;text-align: center;line-height: 35rpx;font-weight: bold;">火车站/地铁站/机场/景点/商圈</view>
				</view>
					
					<!--查找寄存点-->
				<view class="one_main">
					
					
					<view style="display: flex;justify-content: space-between;width: 100%;height: 85rpx;padding-top: 10rpx;border-bottom:solid 1rpx rgb(138,138,138,0.2);">
						<view style="font-size: 45rpx; height: 85rpx;">
							<navigator
								url="/pages/main/locationList/locationList" class="addr" :style="{fontSize:current_citynameWidth+'px'}">
								<view class="icon location" style="float: left;"></view>
								<view style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:45rpx;height: 85rpx;line-height: 85rpx;">{{current_cityname}}</view>
							</navigator>
							
						</view>
						
							<view style="text-align: center;" @click="toShangList()">
								<image src="static/images/定位 2.png" style="width: 28rpx;height: 28rpx;margin-left: 35rpx;"></image>
					            <view style="font-size: 20rpx;padding-left: 30rpx;">我的附近</view>
							</view>
							
							
					</view>
					<view style="height: 180rpx;border-bottom:solid 1rpx rgb(138,138,138,0.2);">
						<view style="height:60rpx;display: flex;padding-top: 20rpx;">
							<view style="width: 100%;  border: solid 1rpx #666666; border-radius: 10rpx; height: 60rpx;">
								<input type="text" v-model="search_jicundian_text"  placeholder="火车站/地铁站/机场/景点/商圈" style="height: 60rpx; line-height: 60rpx; padding: 0 30rpx;" />
							</view>
							
							<view style="display:none; width: 35rpx;height: 35rpx;margin-left: 10rpx;" @click="toJicundianSearch()">
								<!--<image src="static/images/搜索.png" style="width: 35rpx;height: 35rpx;"></image>-->
								<view class="icon search" style="width: 35rpx;height: 35rpx;"></view>
							</view>
							
						
						</view>
						<view style="display: block; float: left; width: 100%; margin: 20rpx 0;">
							<view class="my_tag_text" @click="toJicundianHotSearch('迪士尼')">迪士尼</view>
							<view class="my_tag_text" @click="toJicundianHotSearch('上海火车站')">上海火车站</view>
							<view class="my_tag_text" @click="toJicundianHotSearch('虹桥站')">虹桥站</view>
							<view class="my_tag_text" @click="toJicundianHotSearch('人民广场')">人民广场</view>
							<view style="font-size: 22rpx; height: 50rpx; line-height: 50rpx;padding-top:10rpx;width: 60rpx;float: left;margin-left: 30rpx;" 
								@click="toShangList()">更多 </view>
						</view>
					
					</view>
					
						<button style="background-color: #ff5500;border-radius: 50rpx;color: #ffffff;width: 100%;margin-top: 30rpx;" 
							@click="toJicundianSearch()">查找寄存点</button>
					
				</view>
			
			</view>
			<view class="jicun_block_two">
				<!-- 四个导航图标 -->
				<view class="navigate_icon_item">
					<view class="navigate_icon_img_view">
						<image src="./static/images/订单1.png" class="navigate_icon_img_file" ></image>
					</view>
					<view style="font-size: 25rpx; clear: both;">我的订单</view>
				</view>
				<view class="navigate_icon_item">
					<view class="navigate_icon_img_view" style="background-color: #d64431;">
						<image src="./static/images/优惠券.png" class="navigate_icon_img_file" ></image>
					</view>
					<view style="font-size: 25rpx; clear: both;">优惠券</view>
				</view>
				<view class="navigate_icon_item">
					<view class="navigate_icon_img_view" style="background-color: #ecc167;">
						<image src="./static/images/笔记本2.png" class="navigate_icon_img_file" ></image>
					</view>
					<view style="font-size: 25rpx; clear: both;">使用指南</view>
				</view>
				<view class="navigate_icon_item">
					<view class="navigate_icon_img_view" style="background-color: #64c5f9;">
						<image src="./static/images/客服.png" class="navigate_icon_img_file" ></image>
					</view>
					<view style="font-size: 25rpx; clear: both;">在线客服</view>
				</view>
				
				
				
				
				
			</view>
			
			
			
			
			
			
			<view class="jicun_footer">
				
				<!-- 先行赔付说明 -->
				<view class="jicun_footer_one">
					
						<view><image src="static/images/实名认证.png" style="width: 25rpx;height: 25rpx;"></image></view>	
							<view style="font-size: 28rpx; color: #01c10e;margin-left: 10rpx;">小程序交易保障</view>
						
					    <view style="font-size: 28rpx;color: #8a8a8a;">先付后赔  消费者权益保障</view>
					    <view style="font-size: 28rpx;color: #1296db;">详情</view>
				</view>
				
				<!-- 邀请好友注册 -->
				<view class="jicun_footer_two" >
					<view style="width: 420rpx;font-weight: bold;color: #515151;float: left;margin-right: 70rpx;">30元立减券，邀好友注册即可领取   <br/><br/><view style="font-size: 20rpx;color: #8a8a8a;">-->立即领取</view></view>
					<view>
						<image src="static/images/love.png" style="width: 150rpx;height: 150rpx;"></image></view>
						
				</view>
				
				<view style="text-align: center; display: none;" >
					<view style="font-size: 20rpx;color: #8a8a8a;">全年安全寄存超200万件 | 让旅途更简单</view>
					<view style="display: flex; margin: 10rpx 0 0 250rpx;" >
						<image src="static/images/安全保护.png" style="width: 35rpx;height: 35rpx;"></image>
						<view style="font-size: 28rpx;font-weight: bold;">途简单 放心存</view>
					</view>
				</view>
				
			</view>
			
		</view>
		
		
		
		<!-- 新的首页  End -->
		
		
		
		
		
		
		
		
		<!-- 状态栏 -->
		<view v-if="showHeader" class="mystatusbar" 
			:style="{ position: headerPosition,top:statusTop,opacity: afterHeaderOpacity, fontColor:wxa_shop_nav_font_color}"></view>
		
		<!-- 顶部导航栏 -->
		<view v-if="wxa_show_search_input == 1" class="statusbar_header" 
			:style="{ position: headerPosition,top:headerTop,opacity: afterHeaderOpacity }">
			
			<!-- 搜索框 -->
			<view class="input-box" 
				:style="'border:2rpx solid '+ wxa_shop_nav_bg_color + ';'"
				@click="toSearch()">
				<input
					placeholder="默认关键字"
					placeholder-style="color:#c0c0c0;"
					disabled="true"
					style="background: #f5f5f5;margin-left: 10rpx;"
				/>
				<view class="icon search"></view>
			</view>
			<!-- 右侧图标按钮 -->
			<view class="icon-btn">
				<view class="icon yuyin-home" style="display: none;"></view>
				<view class="icon tongzhi" @tap="toMsg" v-if="wxa_hidden_to_msg_btn_in_usercenter != 1"></view>  <!-- 下版本换为:toMsg -->
			</view>
		</view>
		
		<!-- 占位 -->
		<view v-if="showHeader" class="statusbar_place"
			:style="(wxa_show_search_input == 1)?'height:100rpx;':'height:0rpx;' "></view>
		
		<!-- 轮播图 -->
		<view class="swiper" v-if="wxa_show_index_swiper == 1">
			<swiperBanner v-if="flash_ad_list"
				:imgUrls="flash_ad_list" 
				:border_radius="5"
				:swiper_width_percent_value="92"
				:show_bottom_shadow="1"
				@goto_url="toAdDetails"></swiperBanner>
		</view>
		
		<view class="content_block" v-if="show_weather_forecast_in_index == 1">
			<image  mode="widthFix" 
				src="https://yanyubao.tseo.cn/Tpl/static/images/weather_icon/dayu.png" 
				class="weatherinfo_icon" 
				v-if="tianqi_today.weather!='多云'&&tianqi_today.weather!='晴'&&tianqi_today.weather!='阴'"></image>
			<image  mode="widthFix" 
				src="https://yanyubao.tseo.cn/Tpl/static/images/weather_icon/yin.png" class="weatherinfo_icon"  
				v-if="tianqi_today.weather=='阴'"></image>
			<image  mode="widthFix" src="https://yanyubao.tseo.cn/Tpl/static/images/weather_icon/qing.png" class="weatherinfo_icon"  
				v-if="tianqi_today.weather=='晴'"></image>
			<image  mode="widthFix" src="https://yanyubao.tseo.cn/Tpl/static/images/weather_icon/duoyun.png" class="weatherinfo_icon"  
				v-if="tianqi_today.weather == '多云'"></image>
			<view class="weather" style="font-size: 28rpx;color: #333;">
				<view class="weatherinfo gobyndsingle">{{tianqi_today.area}} {{tianqi_today.temperature}}℃  {{tianqi_today.weather}}  {{tianqi_today.reporttime}} {{tianqi_today.w1}}</view>
			</view>
		</view>
		
		
		<!--商户头条start-->
		<view v-if="wxa_show_toutiao == 1">
		   <view class="toutiao">
				<view class="toutiao_left" @tap="touTiaoList" v-if="!wxa_shop_toutiao_icon">
					<image :src="wxa_shop_toutiao_icon" mode="widthFix"></image>
				</view>
				<view class="toutiao_left" @tap="touTiaoList" v-if="wxa_shop_toutiao_icon">
					<image :src="wxa_shop_toutiao_icon" mode="widthFix"></image>
				</view>
				<swiper class="toutiao_right" vertical="true" autoplay="true" circular="true" interval="2000" 
					v-if="!wxa_shop_toutiao_flash_line||wxa_shop_toutiao_flash_line!=2">
					<swiper-item v-for="(item,index) in articlelist" :key="index">
						<view class="toutiao_right" @tap="touTiaoList(item.id)" >
							<text>{{item.title}}</text>
						</view>
					</swiper-item>
				</swiper>
			
				<swiper class="toutiao_right2" vertical="true" autoplay="true" circular="true" interval="2000" 
					v-if="wxa_shop_toutiao_flash_line==2">
					<swiper-item v-for="(item2,index2) in articlelist2" :key="index2" @tap="touTiaoList(item2.id)">
						<view class="toutiao_right2_item">{{item2[0].title}}</view>
						<view class="toutiao_right2_item">{{item2[1].title}}</view>
					</swiper-item>
				</swiper>
		   </view>
	   </view>
	   <!--商户头条end-->
		
		<!-- 首页导航图标列表 -->
		<view class="category-list" v-if="wxa_show_index_icon == 1">
			<view class="category" :style="{width:wxa_show_icon_index_width_percent +'%'}" 
				v-for="(item, index) in index_icon_list"	
				:key="index" 
				@click="toAdDetails(item.url)"> <!--  -->
				<view >
					<view class="img"><image :src="item.src"></image></view>
					<view class="text">{{ item.name }}</view>
				</view>
			</view>
		</view>
				
		<!-- 2024.4.2. 将视频组件调整到营业地址和客服大图标的上方 -->
		<!-- 视频组件 -->
		<!-- #ifdef MP-WEIXIN -->		
				<view v-if="wxa_show_video_player == 1" style="text-align: center;">
				   <video object-fit='fill' :src="wxa_video_player_url" :poster='wxa_video_screen_url'
					controls="true" :autoplay="wxa_show_video_autoplay"
					:style="{width:videometa_width_height[0] + 'rpx', height: videometa_width_height[1] + 'rpx'}"
					@loadedmetadata="videometa_auto_set($event)"
					enable-play-gesture="true"
		
					>
					</video>
				</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->		
				<view v-if="wxa_show_video_player == 1" style="text-align: center;">
				   <video object-fit='fill' :src="wxa_video_player_url" :poster='wxa_video_screen_url'
					controls="true" :autoplay="wxa_show_video_autoplay"
					:style="{width:videometa_width_height[0] + 'rpx', height: videometa_width_height[1] + 'rpx'}"
					enable-play-gesture="true"
					>
					</video>
					<view style="display:none;">
						<image mode="widthFix" :src="wxa_video_screen_url" @load="videometa_auto_set($event)"></image>
					</view>
				</view>
		
		<!-- #endif -->
		
		
		<!-- 营业地址卡片 2021.1.18. -->
		<view class="index_address_card_main" v-if="show_address_card_in_index == 1">
			<view class="index_address_card_address">
				<view class="index_address_card_address_detail">
					<view class="index_address_card_address_text">{{address_card_in_index.address}}</view>
					<view class="index_address_card_yingyeshijian">营业时间：{{address_card_in_index.yingyeshijian}}</view>
				</view>
			</view>
			
			<view class="index_address_card_icon_telephone" @tap="index_address_card_go_map">
				<image class="index_address_card_icon_telephone_img" src="https://yanyubao.tseo.cn/Tpl/static/images/location_map_new.png" mode="widthFix"></image>
				<view style=";font-size: 20rpx;display: block;">地图</view>
			</view>
			<view class="index_address_card_icon_telephone" 
				style="border-left: #bcbcbc 1rpx solid;" @tap="index_address_card_call_seller">
				<image class="index_address_card_icon_telephone_img" src="https://yanyubao.tseo.cn/Tpl/static/images/location_mobile_new.png" mode="widthFix"></image>
				<view style="display: block;font-size: 20rpx;">电话</view>
			</view>
			<!-- <image class="mobile_img" src="../../static/img/mobile_new.png" mode="widthFix" ></image>
			<view>电话</view> -->
		</view>
		
		
		
		<!-- 客服大图标功能按钮 -->
		<view v-if="show_usercenter_contact_in_index == 1">
			<!-- #ifdef MP-WEIXIN | MP-BAIDU -->
				<view v-if="usercenter_contact_btn_type == 0">
					<button type="default" style="width: 80%;margin: 10rpx auto;"
						:style="{backgroundColor:wxa_shop_nav_bg_color,color:wxa_shop_nav_font_color=='#000000' ? '#333' : wxa_shop_nav_font_color}" 
						open-type="contact" show-message-card="usercenter_contact_wxa_extend == 1 ? 'true' : 'false'" 
						:send-message-title="usercenter_contact_wxa_title"  :send-message-path="usercenter_contact_wxa_path" 
						:send-message-img="usercenter_contact_wxa_img" >{{usercenter_contact_btn_text}}</button>
				</view>
				<view v-if="usercenter_contact_btn_type == 1">
					<button type="default" style="width: 80%;margin: 10rpx auto;padding: 0;border: 0;" 
						open-type="contact" show-message-card="usercenter_contact_wxa_extend == 1 ? 'true' : 'false'"
						:send-message-title="usercenter_contact_wxa_title"  :send-message-path="usercenter_contact_wxa_path" 
						:send-message-img="usercenter_contact_wxa_img" plain="true">
						<image style="width: 100%;" :src="usercenter_contact_btn_img" mode="widthFix"></image>
						</button>
				</view>
			<!-- #endif -->
			
			
		</view>
		
		
		<!-- 富媒体组件 2021.1.18. -->
		<!-- rich-text  和 v-html 都有各自的优缺点 -->
		<!-- u-parse虽然可以支持链接和图片的点击事件，但是对CSS的支持过于广泛，所以效率低，
		但是链接可以点击，图片可以预览
		而且在服务器端要求更专业的CSS定义，不适用于商品详情页和发帖内容页面 -->
<!-- #ifdef MP-ALIPAY -->			
		<rich-text  v-if="show_rich_html_in_index == 1" 
			:nodes="index_rich_html_content"></rich-text>
<!-- #endif -->		
<!-- #ifdef H5 -->
		<view  v-if="show_rich_html_in_index == 1" 
			v-html="index_rich_html_content" ></view>
<!-- #endif -->

<!-- #ifndef MP-ALIPAY | H5 -->
		<u-parse v-if="show_rich_html_in_index == 1" 
			:content="index_rich_html_content" 
			:imageProp = "u_parse_imageProp"
			:imgOptions=false
			@preview888="index_rich_html_preview_image" 
			@navigate="index_rich_html_click_link" />
			
		<!--<rich-text :nodes="index_rich_html_content|formatIndexRichText"></rich-text>-->
			
<!-- #endif -->		
		
		<!-- 功能图片列表 -->
		<view style="width:100%;" :style="{backgroundColor: function_images_list_block_bg_color}"></view>
		<view style="width:100%;float: left;" :style="{backgroundColor: function_images_list_block_bg_color}">
			<block v-for="(function_item, index) in function_images_list"
				:key="index">					
				<view :style="{width: '' + function_item.width_percent+'%', 'float':'left'}"
					@click="toAdDetails(function_item.url)">
					<image :src="function_item.image" style="width: 100%;vertical-align: middle;" mode="widthFix"></image>
				</view>
			</block>
			
		</view>
		<view style="width:100%;" :style="{backgroundColor: function_images_list_block_bg_color}"></view>
		
		
		
		
		<!-- 平铺广告图 -->
		<view v-if="wxa_show_pic_pinpu == 1"
			v-for="(tab,index) in flash_img_list" :key="index" 
			@click="toAdDetails(tab.url)">
			
			<view class="banner" >
				<image lazy-load="true" :src="tab.image" style="width: 100%;vertical-align: middle;" mode="widthFix"></image>
			</view>
		</view>
		<!-- 活动区 -->
		<!-- <view class="promotion">
			<view class="text">优惠专区</view>
			<view class="list">
				<view class="column" v-for="(row, index) in Promotion" @tap="toPromotion(row)" :key="index">
					<view class="top">
						<view class="title">{{ row.title }}</view>
						<view class="countdown" v-if="row.countdown">
							<view>{{ row.countdown.h }}</view>
							:
							<view>{{ row.countdown.m }}</view>
							:
							<view>{{ row.countdown.s }}</view>
						</view>
					</view>
					<view class="left">
						<view class="ad">{{ row.ad }}</view>
						<view class="into">点击进入</view>
					</view>
					<view class="right"><image :src="row.img"></image></view>
				</view>
			</view>
		</view> -->
		
		
		
		
		
		<!-- 实体商家列表 -->
		<shopList v-if="twoArr" 
			:xianmaishangList="twoArr" 
			@toShangDetail="toShangDetail"
			@toShangList="toShangList"
			:show_zhuanti_title = 1
			:hidden_product_list_tishi="hidden_product_list_tishi"></shopList>
		
		<!-- 实体商家结束 -->
		
		
		
	
		<!-- 爆款商品 hot_product_list_in_index  -->
		<block v-if="wxa_show_hot_products_in_index == 1">
			<view style="padding-top: 10upx;padding-bottom: 5upx;">
				<view style="background-color: #f4f4f4;padding: 1rpx 0rpx 1rpx 0rpx;"></view>
				<view class="zhuanti_title" v-if="show_hot_products_tishi == ''">   ———— ※ 爆款商品 ※ ————   </view>
				<view class="zhuanti_title" v-if="show_hot_products_tishi != ''">{{show_hot_products_tishi}}</view>
				<scroll-view scroll-x="true">
					
					<view style="display: flex;">
						<view class=""
							v-for="(item01,index) in hot_product_list_in_index"
							:key="index">
							<view class="hot_product_item" @tap="toGoods(item01)" >
								<image class="hot_product_image"
									:src="item01.picture" >
								</image>
								<view class="hot_product_name" >
									{{item01.name}}
								</view>
								<view class="" style="color:red;">
									￥{{item01.price}}
								</view>
							</view>
							
						</view>
					</view>
					
				</scroll-view>
			</view>
		</block>
		<!-- 爆款商品结束 -->
		
		
		
		<!-- 论坛发帖列表 -->
		
		<publishList v-if="index_publish_list"
						:index_list="index_publish_list"
						@goForum="goForum"
						@previewImage="previewImage"
						:show_zhuanti_title = 1
						@goToPublishList="goToPublishList">
		</publishList>
		
		
			
		<!-- 商品列表 -->
		<block v-if="current_product_list && (wxa_hidden_product_list ==0)">
			<view class="zhuanti_title" v-if="hidden_product_list_tishi == ''">   ———— ※ 最新上架 ※ ————   </view>
			<view class="zhuanti_title" v-if="hidden_product_list_tishi != ''">{{hidden_product_list_tishi}}</view>
			<productList  
				:productsList="current_product_list" 
				:loadingText="loadingText" 
				:showKucunSale="wxa_show_kucun_in_list" 
				@toGoods="toGoods"></productList>
		</block>
		

		<!-- 客服按钮 -->
		<view class="u-tap-btn" v-if="(wxa_show_kefu_button==1) && (wxa_kefu_bg_no_color_flag == 0)">
			<block v-if="wxa_kefu_button_type==1">
					<image class="u-go-home2" @tap="call_seller" :style="{backgroundColor:wxa_kefu_bg_color}" :src="wxa_kefu_button_icon" mode="widthFix"></image>
			</block>
			<block v-if="wxa_kefu_button_type==2">
					<image class="u-go-home2" 
						:style="{backgroundColor:wxa_kefu_bg_color}" 
						:src="wxa_kefu_button_icon" mode="widthFix"
						@tap="toAdDetails(wxa_kefu_form_url)" ></image>
			</block>
			<block v-if="wxa_kefu_button_type==3">
				<button class="u-go-home2" open-type="contact" :style="{backgroundColor:wxa_kefu_bg_color}">
					<image :src="wxa_kefu_button_icon" mode="widthFix"></image>
				</button>
			</block>
			
		</view>
		<view class="u-tap-btn" v-if="(wxa_show_kefu_button==1) && (wxa_kefu_bg_no_color_flag == 1)">
			<block v-if="wxa_kefu_button_type==1">
					<image class="u-go-home2" @tap="call_seller" :src="wxa_kefu_button_icon" mode="widthFix"></image>
			</block>
			<block v-if="wxa_kefu_button_type==2">
					<image class="u-go-home2" @tap="toAdDetails(wxa_kefu_form_url)" :src="wxa_kefu_button_icon" mode="widthFix"></image>
			</block>
			<block v-if="wxa_kefu_button_type==3">
				<button class="u-go-home2" open-type="contact">
					<image :src="wxa_kefu_button_icon" mode="widthFix"></image>
				</button>
			</block>
			
		</view>
		
		<view class="copyright_info">{{default_copyright_text}}</view>
		
		
		<!-- yinsi_cfg_shiyongxieyi_cms_token:'',
		yinsi_cfg_yinsizhengce_cms_token:'',
		yinsi_cfg_yinsizhengce_imgid:'',   
		yinsi_cfg_shiyongxieyi_imgid:'', -->
		<!-- 隐私协议的弹层 begin-->
		<view class="zhezhao" v-if="know==true"></view>
		<view class="kcrzxy" v-if="know==true">
		    <view class="kcrzxyhd" :style="{backgroundColor:wxa_shop_nav_bg_color}">服务协议和隐私政策</view>
		    <scroll-view scrollY class="kcrzxybd" style="height: 600rpx;">
		        <view style="width: 100%;overflow: hidden;" auto-height='true'>
					<view style="float: left;">请你务必审慎阅读、充分理解“服务协议”和“隐私政策”的各条款，包括但不限于、内容分享等服务，我们需要收集你的设备信息、操作日志等个人信息。你可以在“设置”中查看、变更、删除个人信息并系统应用管理中删除此应用。你可以阅读</view>
					<navigator style="color: #0055FF;float: left;" :url="'/pages/help/detail?id='+ yinsi_cfg_yinsizhengce_imgid +'&form_page=spec_cms_token&cms_token='+ yinsi_cfg_yinsizhengce_cms_token +'&hidden_remark=1'">《隐私政策》</navigator> 
					<view style="float: left;">和</view>
					<navigator style="color: #0055FF;float: left;" :url="'/pages/help/detail?id='+ yinsi_cfg_shiyongxieyi_imgid +'&form_page=spec_cms_token&cms_token='+ yinsi_cfg_shiyongxieyi_cms_token +'&hidden_remark=1'">《服务协议》</navigator>
					<block>了解详细信息，如果同意，请点击“同意”开始使用我们的服务。</block>
				</view>
		    </scroll-view>
			<view style="margin: 0 40rpx;display: flex;justify-content: center; font-size: 26rpx;" >
				<checkbox-group @change="checkboxChange"><checkbox value="checked" :checked="checked_user_agreement"></checkbox></checkbox-group>				
				我已阅读并同意“服务协议”和“隐私政策”
			</view>
			<view style="display: flex;justify-content: center;">
				<view @click="tongyi_yinsi_cfg" data-index='2' class="queren" style="font-size:26upx;background: #ccc;" >不同意</view>
				<view @click="tongyi_yinsi_cfg" data-index='1' class="queren" :style="{backgroundColor:wxa_shop_nav_bg_color}">同意</view>
				
			</view>
		</view>
		
		
		<!-- end -->
		
		<abot-tab-bar :list="tabbar_list" :current_index="0" style="position:fixed;bottom:0;width:100%;left:0;right:0;"
			@tabChange="tabChange"></abot-tab-bar>
		
		
	</view>
</template>

<script>
 
var ttt = 0;

import jicundian_data from './jicundian_data.js';
import abotTabBar from '@/components/abot-tabbar.vue';

import util from '../../common/util.js';

//高德SDK
import bmap from '../../common/SDK/bmap-wx.js';
//import amap from '@/common/SDK/amap-wx.js';

import socket_io_function from '../../common/weapp.socket.io.js'; 

import locationapi from '../../common/locationapi.js'; 

import shopList from '../../components/shop-list/shop-list.vue';
import publishList from '../../components/publish-list/publish-list.vue';
import productList from '../../components/product-list/product-list.vue'
import publish_list_api from '../../common/publish_list_api.js';

//import parseHtml from "../../common/html-parser.js"
//import mpHtml from "../../components/mp-html/mp-html.vue"
import uParse from '@/components/gaoyia-parse/parse.vue'

// #ifdef MP-ALIPAY
	import parseHtml from "../../common/html-parser.js"
// #endif

import swiperBanner from '../../components/swiper-banner.vue';


//2021.11.20. 这个函数在ES6中不兼容，需要使用ES5模式编译
import md5 from '../../common/md5.min.js'


const isNullOrUndefined = obj=>obj===null || obj === undefined  || obj === '';

export default {
	components:{
		shopList,
		publishList,
		productList,
		uParse,
		swiperBanner,
		abotTabBar
	},
	data() {
		return {
			
			tabbar_list: jicundian_data.tabbar_list,
			
			ak: "",	//填写申请到的ak，从shop_option中获取 baidu_map_ak_wxa这个属性
			markers: [],
			longitude: '', 	//经度
			latitude: '',	//纬度
			address: '',		//地址
			cityInfo: {},		//城市信息
			wxMarkerData:'',
			articlelist:'',
			articlelist2:'',
			
			checked_user_agreement:false,
			
			wxa_show_index_swiper:0,
			wxa_show_search_input:0,
			wxa_show_index_icon:0,
			wxa_show_pic_pinpu:0,
			
			wxa_show_toutiao:'',
			wxa_shop_toutiao_flash_line:'',
			
			wxa_shop_nav_bg_color:'',
			wxa_shop_nav_font_color:'',
			
			
			addListener:'',
			
			//首页导航图标
			wxa_show_icon_index_count:'',
			wxa_show_icon_index_width_percent:25,
			
			current_cityname:'上海市',
			current_citynameLength:'',
			current_citynameWidth:'',
			wxa_shop_toutiao_icon:'',
			is_shangjia:1,
			
			
			wxa_video_player_url:'', //视频相关路径
			wxa_video_screen_url:'', //视频相关路径
			wxa_show_video_player:0, //视频是否启用
			wxa_show_video_autoplay:false,
			//wxa_show_video_meta_width:400,
			//wxa_show_video_meta_height:300,
			videometa_width_height:[400, 300],
			
			
			showHeader:true,
			afterHeaderOpacity: 1,//不透明度
			headerPosition: 'fixed',
			headerTop:null,
			statusTop:null,
			nVueTitle:null,
			
			
			
			// 轮播图片
			flash_ad_list:null,
			
			function_images_list:null,  	//功能图片列表（与平铺图片不同，可以定义图片显示在屏幕上的宽度百分比）
			show_function_images_list:0,
			function_images_list_block_bg_color:'#ffffff',
			
			flash_img_list:null,
			index_icon_list:null,
			
			roll_picture:0,
			pingpu_picture:0,
			navigation_icon:0,
			
			yingxiao_list:'',
			
			page_num:1,
			page_size:10,
			is_OK:false,
			
			cb_params:'',
			city: '北京',
			
			coordinate:'',
			index_publish_list:[],
			Promotion: [],
			
			
			//猜你喜欢列表
			twoArr:'',

			
			//current_product_list:[{inventory:"1", price:"0"}],
			current_product_list:'',
			loadingText: '正在加载...',
			
			
			wxa_product_list_show_type:'',
			wxa_hidden_product_list:0,
			
			
			
			
			windowHeight: 0,
			windowWidth: 0,
			sugData:'',
			
			//客服相关
			wxa_show_kefu_button:'',
			wxa_kefu_button_type:'',
			wxa_kefu_bg_no_color_flag:0,
			wxa_kefu_button_icon:'',
			wxa_kefu_mobile_num:'',
			wxa_kefu_form_url:'',
			wxa_kefu_bg_color:'',
			wxa_show_kucun_in_list: '',
			
			supplierid: '',
			is_get_article_list:true,// publish_list_api 帖子列表判断是否请求 
			cms_token:'',//cms_token
			current_page_size:'',
			
			//天气
			tianqi_today:{area:'',
				reporttime:'',
				weather:'',
				w1:'',
				temperature:'',},
			/*area:'',
			reporttime:'',
			weather:'',
			w1:'',
			temperature:'',*/
			show_weather_forecast_in_index:0,
			
			default_copyright_text:'',
			
			//分享转发
			 wxa_share_img:'',
			 wxa_share_title:'',
			 know:'',
			 
			 //隐私协议相关
			 yinsi_cfg_shiyongxieyi_cms_token:'',
			 yinsi_cfg_yinsizhengce_cms_token:'',
			 yinsi_cfg_yinsizhengce_imgid:'',   
			 yinsi_cfg_shiyongxieyi_imgid:'',
			 
			 //禁用GPS定位
			 disable_gps_location:0,
			 
			 //显示营业地址卡片
			 show_address_card_in_index:0,
			 address_card_in_index:null,
			 
			 //显示富媒体组件
			 show_rich_html_in_index:0,
			 index_rich_html_type:'static',
			 index_rich_html_content:'<div></div>',
			 index_rich_html_cache_id:'',
			 
			 //传给uParse组件的属性值
			 u_parse_imageProp:{mode:'widthFix', padding:0, lazyLoad:true, domain:''},
			
			
			
			
			//2021.12.23客服消息重复
			last_msg_chongfu:'',
			
			
			//客服大图标功能相关 2022.3.24.
			show_usercenter_contact_in_index:1,
			usercenter_contact_btn_type:0,
			usercenter_contact_btn_text:'',
			usercenter_contact_btn_img:'',
			usercenter_contact_wxa_extend:0,
			usercenter_contact_wxa_title:'',
			usercenter_contact_wxa_path:'',
			usercenter_contact_wxa_img:'',
			
			
			//2022.5.10. 增加首页的爆款商品的控件
			wxa_show_hot_products_in_index:0,
			hot_product_list_in_index:'',
			
			//2022.05.11 增加提示文字
			show_hot_products_tishi:'',
			shang_list_count_tishi:'',
			hidden_product_list_tishi:'',
			
			//2023.9.25. 首页背景颜色
			index_page_bg_color: '#ffffff',
			
			//2024.4.9.是否隐藏 右上角的  消息小图标
			wxa_hidden_to_msg_btn_in_usercenter:0,
			
			//2024.4.22. 哈哈寄存相关的变量
			search_jicundian_text:'',
			
		};
	},
	onLoad: function (options) {
		
		console.log('当前时间：' + util.formatTime( new Date() ) + ' ' + util.formatTime2( new Date() ) + ':01' );
		
		
		
		//以下代码加载了会出错，所以不使用
// #ifdef APP-PLUS-H5
		this.nVueTitle = uni.getSubNVueById('homeTitleNvue');
		this.nVueTitle.onMessage(res => {
			let type = res.data.type;
			if(type=='focus'){
				this.toSearch();
			}
		});
		this.showHeader = false;
		this.statusHeight = plus.navigator.getStatusbarHeight();
// #endif

		//this.showHeader = false;
				
		
		console.log('pages/tabBar/index/index====>>>>', options);
		
		var that = this;
		
		uni.setNavigationBarTitle({
			title:that.abotapi.globalData.default_shopname
		})
		
		
		var yinsi_cfg_if_consent = uni.getStorageSync('yinsi_cfg_if_consent'+this.abotapi.globalData.version_code);
		if(!yinsi_cfg_if_consent){
			this.know = true;
			uni.hideTabBar({
				
			})
		}
		
		
		/*
		var system_info = uni.getSystemInfoSync();
		
		console.log('getSystemInfo==>>>system_info==>>>', system_info)
		console.log('getSystemInfo==>>>system_info==>>>', system_info.windowWidth)
		that.windowWidth = system_info.windowWidth;
		that.windowHeight = system_info.windowHeight;
		*/
		
		
		console.log('当前调试开关ii：' + this.system_debug_flag);
		console.log('当前平台名称ii：' + this.abotapi.globalData.current_platform);
		
		
		//=====判断sellerid和parentid Begin=====
		var sellerid = null;
		
		console.log('sellerid 01：' + sellerid);
	
		if (options && options.parentid) {
		  this.abotapi.set_current_parentid(options.parentid);
		}
		else if (options && options.scene) {
		  var parentid_value = decodeURIComponent(options.scene);
	
		  console.log('来自options.scene的值：' + parentid_value);
		  
		  if (parentid_value && (parentid_value.indexOf('parentid_') != -1)) {
			parentid_value = parentid_value.replace('parentid_', '');
	
			this.abotapi.set_current_parentid(parentid_value);
			
			console.log('来自小程序码的推荐者ID：' + parentid_value);
			
		  }
		  else {
			console.log('推荐者ID：' + parentid_value + '不是 parentid_开头的，默认为sellerid的值');
	
			sellerid = options.scene;
	
			console.log('sellerid 0101：' + sellerid);
	
		  }
	
		}
	
		if (options || options != null) {
		  if (options.sellerid) {
			sellerid = options.sellerid;
			console.log('sellerid 02：' + sellerid);
		  }
	
		  if (!sellerid && options.scene) {
			var sellerid_scene = decodeURIComponent(options.scene);
			if (sellerid_scene && sellerid_scene.indexOf('sellerid_') != -1) {
			  sellerid = sellerid_scene.replace('sellerid_', '');
			}
	
			console.log('sellerid 03：' + sellerid);
	
		  }
		}
		
		if (!sellerid) {
		  sellerid = this.abotapi.get_sellerid();
		  console.log('sellerid 04：' + sellerid);
		}
	
		console.log('sellerid 05：' + sellerid);
	
		if (!sellerid) {
		  console.log('!!!!!!缺少商户ID，使用默认的' + this.abotapi.globalData.default_sellerid);
		  sellerid = this.abotapi.globalData.default_sellerid;
	
		}
	
		if (this.abotapi.globalData.force_sellerid == 1) {
		  sellerid = this.abotapi.globalData.default_sellerid;
		}
	
		console.log('sellerid 06：' + sellerid);
	
		this.abotapi.globalData.default_sellerid = sellerid
		this.abotapi.set_sellerid(sellerid);
		//========  End =======
		
		
		
		this.abotapi.get_shop_info_from_server(this.callback_func_for_shop_info);	
		
		this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
		
		
		
		
		
		//开启定时器
		this.Timer();
		//加载活动专区
		this.loadPromotion();
		
		//连接socket服务器
		this.linkSocket();
		
	},
	onShow:function(){
		console.log('call onShow function (/pages/index/index)');
		
		var userInfo = this.abotapi.get_user_info();
	
		if(userInfo && userInfo.userid){
			console.log('88888====')
			//this.linkSocket();
		}
		
		var city_name = uni.getStorageSync('city_name');
		if(city_name){
			this.current_cityname = city_name;
		}
		
		//console.log('wwwwaa',cb_params.option_list.index_rich_html_content);
		//this.__index_rich_html_get_content(cb_params.option_list.index_rich_html_content);
		
		var that = this;
		
		uni.getStorage({
			key : 'need_pulldown_refresh_flag',
			success:function(res){
				var need_pulldown_refresh = res.data;
				
				if(need_pulldown_refresh == 1){
					console.log('onShow ===>>> (need_pulldown_refresh_flag == 1) ===>>> 需要下拉刷新');
					
					try {
					    uni.removeStorageSync('need_pulldown_refresh_flag');
					} catch (e) {
					    // error
					}
					
					
					uni.startPullDownRefresh();
				}
			}
		})
		
		
		
	},
	onPageScroll: function (e) {
		//兼容iOS端下拉时顶部漂移
		this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
		this.headerTop = e.scrollTop>=0?null:0;
		this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
		
		
		
	},
	
	//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh: function () {
		var that = this;
		
		console.log('onPullDownRefresh=====>>>>>');
		
		// #ifndef MP-ALIPAY
		uni.showToast({
			title: '数据更新中……',
			icon:'loading',
		});
		// #endif
		
		// #ifdef MP-ALIPAY
		uni.showToast({
			title: '数据更新中……',
			//icon:'loading', 	//支付宝不支持icon为 loading
			//duration:2000
		});
		// #endif
		
		
		
		/*uni.showLoading({
			title:'数据更新中……'
		})*/
		
		
		
		uni.removeStorageSync("coordinate_array");
		uni.removeStorageSync("cata_list");
		uni.removeStorageSync("spec_list");
		
		uni.removeStorageSync('all_shang_jingwei_list');
		
		locationapi.get_location_remove();
		
		that.abotapi.get_shop_info_from_server_remove();
		
		that.abotapi.set_shop_option_data_remove();
		that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);
		
		that.abotapi.get_shop_info_from_server(that.callback_func_for_shop_info);
		
		that.abotapi.get_xianmaishang_setting_list_remove();
		
		if(that.show_rich_html_in_index == 1){
			uni.removeStorageSync('index_rich_html_cache_' + that.index_rich_html_cache_id)
		}
		
		
		uni.stopPullDownRefresh();
		
		
		setTimeout(function() {
			console.log('timeout===>>>stopPullDownRefresh===>>>hideToast');
			
			
			
			uni.hideToast();
			//uni.hideLoading();
			
		}, 2000);
	},
	
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom: function () {
		
		this.get_product_list();
		
	},
	
	onShareAppMessage: function () {
		var that = this;
		
		var option_list = this.abotapi.globalData.option_list;
		
		var share_title = option_list.wxa_share_title;
		if (share_title.length > 22) {
			share_title = share_title.substr(0, 20) + '...';
		}
		
		//当前页面 path ，必须是以 / 开头的完整路径
		var share_path = '/pages/index/index?sellerid=' + this.abotapi.get_sellerid();
		
		var userInfo = this.abotapi.get_user_info();
		
		//如果用户登录，则记录推荐者
		if (userInfo && userInfo.userid) {
			share_path += '&parentid=' + userInfo.userid;
		}
		
		var share_img = option_list.wxa_share_img;
		if(!share_img){
			share_img = option_list.wxa_shop_operation_logo_url;
		}
		
		return {
			title: share_title,
			path: share_path,
			imageUrl: share_img,
			success: function(res) {
				// 分享成功
			},
			fail: function(res) {
				// 分享失败
			}
		}
	},
	
	onShareTimeline: function () {
		return this.share_return();
	},
	onAddToFavorites: function () {
		return this.share_return();
	},
	methods: {
		
		tabChange(index) {
			
			var tabbar_item = this.tabbar_list[index];
			
			if(!tabbar_item){
				return;
			}
			
			var new_url = tabbar_item.new_url;
			
			console.log('准备通过tabbar跳转到==>>', new_url);
			
			this.abotapi.call_h5browser_or_other_goto_url(new_url);
			
		},
		
		checkboxChange: function (e) {
			this.checked_user_agreement = !this.checked_user_agreement;
		},
		share_return: function() {
			var that = this;
			
			var option_list = this.abotapi.globalData.option_list;
			
			var share_title = option_list.wxa_share_title;
			if (share_title.length > 22) {
				share_title = share_title.substr(0, 20) + '...';
			}
			
			var share_path = 'sellerid=' + this.abotapi.get_sellerid();
			
			var userInfo = this.abotapi.get_user_info();
			
			if (userInfo && userInfo.userid) {
				share_path += '&parentid=' + userInfo.userid;
			}
			
			var share_img = option_list.wxa_share_img;
			if(!share_img){
				share_img = option_list.wxa_shop_operation_logo_url;
			}			
			
			return {
				title: share_title,
				query: share_path,
				imageUrl: share_img,
			}
		},
		
		//获取天气
		get_tianqi:function(){
			var that = this;
			
			console.log('准备获取天气预报');
			
			locationapi.get_local_tianqi(that, function(tianqiData){
				console.log('获取到的天气数据 tianqiData===>', tianqiData);
				
				//console.log('t===>',t);
				that.tianqi_today.area = tianqiData.area; //地区 （浦东新区）
				that.tianqi_today.reporttime = tianqiData.reporttime; //时间
				that.tianqi_today.weather = tianqiData.weather; //天气（多云）
				that.tianqi_today.w1 = tianqiData.w1;
				that.tianqi_today.temperature = tianqiData.temperature; //温度
				
			})
			
		},
		//跳转文章详情
		goForum: function(id) {
			
			uni.navigateTo({
				url: "/pages/help/detail?id=" + id + '&form_page=publish_list' 
			})
		},
		goToPublishList:function(){
			this.abotapi.call_h5browser_or_other_goto_url('/pages/publish/publish_list');
		},
		// 预览图片
		previewImage:function(index) {
			
			var index_publish_list = this.index_publish_list;
			
			var index_item = index_publish_list[index];
			
			var img_list = index_item['picture_list'];
			
			
			//预览图片
			uni.previewImage({
				urls: img_list,
				success: function(data) {
					console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				},
				fail: function(err) {
					console.log(err.errMsg);
				}
			});
		},
		//这只是一个测试函数
		bindKeyInput: function() {
			
		        var that = this; 
		        // 新建百度地图对象 
		        var BMap = new bmap.BMapWX({ 
		            ak: 'OTsGerqQhowGSFOWG8c6p86R' 
		        }); 
				
		        var fail = function(data) { 
		            console.log(data) 
		        }; 
		        var success = function(data) { 
		            var sugData = ''; 
		            for(var i = 0; i < data.result.length; i++) { 
		                sugData = sugData + data.result[i].name + '\n'; 
		            } 
					console.log('sugData',sugData);
		           
		            this.sugData = sugData ;
		            
		        } 
				BMap.geocoding({
									 address: "北京市海淀区上地十街10号", 
									 fail: fail, 
									 success: success, 
									 iconPath: '../../static/img/addricon.png', 
									 iconTapPath: '../../static/img/addricon.png' 
				});
				
		       // 发起suggestion检索请求 
		        BMap.suggestion({ 
		            query: '内外联大厦881号', 
		            region: '上海', 
		            city_limit: true, 
		            fail: fail, 
		            success: success 
		        });
				 
				 
		},
		videometa_auto_set:function(e){
			console.log('videometa_auto_set======>>>>>', e);
			
			var imgwidth = e.detail.width;
			var imgheight = e.detail.height;
		
		
			//宽高比  
			var ratio = imgwidth / imgheight;
		
			console.log(imgwidth, imgheight)
		
			var current_view_width = 750;
		
			//current_view_width = current_view_width;
			
			console.log('current_view_width====>>>>', current_view_width);
		
			//计算的高度值  
			var current_view_height = current_view_width / ratio;
		
		
			//赋值给前端
			var videometa_width_height = [current_view_width, current_view_height];
		
			
			this.videometa_width_height = videometa_width_height;
			//this.wxa_show_video_meta_width = current_view_width;
			//this.wxa_show_video_meta_height = current_view_height;
			
			console.log('videometa_width_height====>>>>', this.videometa_width_height);
			
		},
		
		callback_function_shop_option_data:function(that, cb_params){
			
			console.log('当前调试开关22：' + this.system_debug_flag);
			console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);
			
			if(!cb_params){
				return;
			}
			
			console.log('cb_params====', cb_params);
			
			//var userInfo = that.abotapi.get_user_info();
			
			
			//====1、更新界面的颜色
			//that.abotapi.getColor();
			
			
			if(!cb_params.option_list){
				return;
			}
			
			if(cb_params.option_list.shutdown_website_status == 1){
				//跳转到网站关闭的提示页面
				console.log("跳转到网站关闭的提示页面");
				
				uni.reLaunch({
					url:'/pages/main/shutdown_website/shutdown_website'
				})
				
				return;
			}
			
			
			
			if(cb_params.option_list.wxa_shop_new_name){
				uni.setNavigationBarTitle({
					title:cb_params.option_list.wxa_shop_new_name
				});
				
				that.abotapi.globalData.default_shopname = cb_params.option_list.wxa_shop_new_name
			}
			
			that.wxa_shop_nav_bg_color  = cb_params.option_list.wxa_shop_nav_bg_color;
			
			//console.log('wxa_shop_nav_bg_color=====>>>>>', that.wxa_shop_nav_bg_color);
				
			that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
			
			that.default_copyright_text = that.abotapi.globalData.default_copyright_text;
			
			//====2、其他的设置选项：商品列表风格、头条图标等等
			if (cb_params.option_list.wxa_product_list_style) {
			    
			      that.wxa_product_list_style = cb_params.option_list.wxa_product_list_style
			    
			}
			if (cb_params.option_list.wxa_shop_toutiao_icon) {
			  
			    that.wxa_shop_toutiao_icon = cb_params.option_list.wxa_shop_toutiao_icon
			  
			}
			if (cb_params.option_list.wxa_show_kucun_in_list) {
			  
			    that.wxa_show_kucun_in_list = cb_params.option_list.wxa_show_kucun_in_list
			  
			}
			if (cb_params.option_list.wxa_show_icon_index_count){
			  
			    that.wxa_show_icon_index_count = cb_params.option_list.wxa_show_icon_index_count
			  
			}
			
			//2023.9.25. 首页背景颜色
			if(cb_params.option_list.index_page_bg_color){
				that.index_page_bg_color = cb_params.option_list.index_page_bg_color;
			}
			
			//2022.12.14. 设置首页导航图标的每个占的宽度
			if(that.wxa_show_icon_index_count == 2){
				that.wxa_show_icon_index_width_percent = 50;
			}
			else if(that.wxa_show_icon_index_count == 3){
				that.wxa_show_icon_index_width_percent = 33.33;
			}
			else if(that.wxa_show_icon_index_count == 4){
				that.wxa_show_icon_index_width_percent = 25;
			}
			else if(that.wxa_show_icon_index_count == 5){
				that.wxa_show_icon_index_width_percent = 20;
			}
			else {
				that.wxa_show_icon_index_width_percent = 20;
			}
			
			
			if (cb_params.option_list.wxa_show_index_icon) {
			  
			   that.wxa_show_index_icon = cb_params.option_list.wxa_show_index_icon
			  
			}
			if (cb_params.option_list.wxa_show_index_swiper) {
			  
			    that.wxa_show_index_swiper = cb_params.option_list.wxa_show_index_swiper
			  
			}
			if (cb_params.option_list.wxa_show_pic_pinpu) {
			  
			    that.wxa_show_pic_pinpu = cb_params.option_list.wxa_show_pic_pinpu
			  
			}
			if (cb_params.option_list.wxa_show_search_input) {
			  
			    that.wxa_show_search_input = cb_params.option_list.wxa_show_search_input
				
				console.log('that.wxa_show_search_input====>>>>', that.wxa_show_search_input);
				
				if (cb_params.option_list.wxa_show_search_input != 1) {
					//that.showHeader = false;
				}
				
			  
			}
			if (cb_params.option_list.wxa_show_toutiao) {
			  
			    that.wxa_show_toutiao = cb_params.option_list.wxa_show_toutiao
			  
			}
			
			
			if (cb_params.option_list.wxa_show_video_player) {			  
			   that.wxa_show_video_player = cb_params.option_list.wxa_show_video_player			
			}
			
			
			//20222.5.10. 显示爆款商品的组件
			if (cb_params.option_list.wxa_show_hot_products_in_index) {
			   that.wxa_show_hot_products_in_index = cb_params.option_list.wxa_show_hot_products_in_index;
					  console.log('123456789',cb_params)
				//如果需要显示爆款商品，则读取爆款商品列表
				if(that.wxa_show_hot_products_in_index == 1){
					that.__get_hot_product_list_in_index();
				}
			}
			
			//爆款商品的提示文字
			if (cb_params.option_list.show_hot_products_tishi){
				that.show_hot_products_tishi = cb_params.option_list.show_hot_products_tishi;
			console.log('that.show_hot_products_tishi',that.show_hot_products_tishi)
			}
			
			
			
			
			
			if (cb_params.option_list.wxa_show_video_autoplay == 1) {			  
			   that.wxa_show_video_autoplay = true
			}		
			
			
			if (cb_params.option_list.wxa_video_player_url) {
			  
			    that.wxa_video_player_url = cb_params.option_list.wxa_video_player_url
			  
			}
			if (cb_params.option_list.wxa_video_screen_url) {
			  
			    that.wxa_video_screen_url = cb_params.option_list.wxa_video_screen_url
				
				//that.videometa_width_height = [375, 210];
			  
			}
			if (cb_params.option_list.wxa_shop_toutiao_flash_line) {
			  
			    that.wxa_shop_toutiao_flash_line = cb_params.option_list.wxa_shop_toutiao_flash_line
			  
			}
				
					
			if (cb_params.option_list.wxa_hidden_product_list) {
			  
			    that.wxa_hidden_product_list = cb_params.option_list.wxa_hidden_product_list
				console.log('that.wxa_hidden_product_list=====>>>>', that.wxa_hidden_product_list);
			  
			}
			//提示文字
			if(cb_params.option_list.hidden_product_list_tishi) {
				that.hidden_product_list_tishi =cb_params.option_list.hidden_product_list_tishi
				console.log('that.hidden_product_list_tishi=====>>>>',that.hidden_product_list_tishi)
			}
			
			
			if(cb_params.option_list.wxa_product_list_show_type){
				that.wxa_product_list_show_type = cb_params.option_list.wxa_product_list_show_type
			}
					
			if (cb_params.option_list.wxa_kefu_button_type) {
			  
			   that.wxa_kefu_button_type = cb_params.option_list.wxa_kefu_button_type
			  
			}
					
			if (cb_params.option_list.wxa_kefu_button_icon) {
			  
			   that.wxa_kefu_button_icon = cb_params.option_list.wxa_kefu_button_icon
			  
			}
					
			if (cb_params.option_list.wxa_kefu_mobile_num) {
			  
			    that.wxa_kefu_mobile_num = cb_params.option_list.wxa_kefu_mobile_num
			  
			}
					
			if (cb_params.option_list.wxa_kefu_form_url) {
			  
			    that.wxa_kefu_form_url = cb_params.option_list.wxa_kefu_form_url
			  
			}
					
			if (cb_params.option_list.wxa_show_kefu_button) {
			  
			    that.wxa_show_kefu_button = cb_params.option_list.wxa_show_kefu_button
			  
			}
					
			if (cb_params.option_list.wxa_kefu_bg_color) {
			    that.wxa_kefu_bg_color = cb_params.option_list.wxa_kefu_bg_color
			}
			
			if(cb_params.option_list.wxa_kefu_bg_no_color_flag){
				that.wxa_kefu_bg_no_color_flag = cb_params.option_list.wxa_kefu_bg_no_color_flag;
				that.wxa_kefu_bg_color = '';
			}
		
			
			
			//更多选项（ShopAppV2）
			that.copyright_text = cb_params.option_list.copyright_text;
			that.wxa_share_title = cb_params.option_list.wxa_share_title;
			that.wxa_share_img = cb_params.option_list.wxa_share_img;
			
			that.roll_picture = cb_params.option_list.roll_picture;
			if(cb_params.option_list.roll_picture == -1){
				that.roll_picture_list = cb_params.option_list.roll_picture_list;
			}
			
			that.pingpu_picture = cb_params.option_list.pingpu_picture;
			if(cb_params.option_list.pingpu_picture == -1){
				that.pingpu_picture_list = cb_params.option_list.pingpu_picture_list;
			}
			
			that.navigation_icon = cb_params.option_list.navigation_icon;
			if(cb_params.option_list.navigation_icon == -1){
				that.navigation_icon_list = cb_params.option_list.navigation_icon_list;
			}
			
			if (cb_params.option_list.default_shang_list_count_in_front_page) {
			  
			    that.abotapi.globalData.default_shang_list_count_in_front_page = cb_params.option_list.default_shang_list_count_in_front_page
			  
			}
			else{
				that.abotapi.globalData.default_shang_list_count_in_front_page = 0;
			}
			 
			 
			 if (cb_params.option_list.shang_list_count_tishi){
				 that.shang_list_count_tishi = cb_params.option_list.shang_list_count_tishi;
				 console.log('15847shang_list_count_tishi',that.shang_list_count_tishi)
			 }
			 
			 
			if(cb_params.option_list.cms_token){
				that.cms_token = cb_params.option_list.cms_token;
			}
			
			if (cb_params.option_list.default_publish_list_count_in_front_page) {
			  
			    that.abotapi.globalData.default_publish_list_count_in_front_page = cb_params.option_list.default_publish_list_count_in_front_page;
				that.current_page_size = cb_params.option_list.default_publish_list_count_in_front_page;
			}
			if (cb_params.option_list.show_weather_forecast_in_index) {
			  
			    that.show_weather_forecast_in_index = cb_params.option_list.show_weather_forecast_in_index;
			}
			if (cb_params.option_list.wxa_share_title) {
				//分享转发标题
			  
			    that.wxa_share_title = cb_params.option_list.wxa_share_title;
			}
			
			if (cb_params.option_list.wxa_share_img) {
				//分享转发图片
			  
			    that.wxa_share_img = cb_params.option_list.wxa_share_img;
			}
			
			//隐私政策和使用协议
			if (cb_params.option_list.yinsi_cfg_shiyongxieyi_imgid) {
				//使用协议的文章id
			  
			    that.yinsi_cfg_shiyongxieyi_imgid = cb_params.option_list.yinsi_cfg_shiyongxieyi_imgid;
			}
			
			if (cb_params.option_list.yinsi_cfg_yinsizhengce_imgid) {
				//隐私政策的文章id
			  
			    that.yinsi_cfg_yinsizhengce_imgid = cb_params.option_list.yinsi_cfg_yinsizhengce_imgid;
			}
			
			if (cb_params.option_list.yinsi_cfg_yinsizhengce_cms_token) {
				//隐私政策的cms token
			  
			    that.yinsi_cfg_yinsizhengce_cms_token = cb_params.option_list.yinsi_cfg_yinsizhengce_cms_token;
			}
			
			if (cb_params.option_list.yinsi_cfg_shiyongxieyi_cms_token) {
				//使用协议的cms token
			  
			    that.yinsi_cfg_shiyongxieyi_cms_token = cb_params.option_list.yinsi_cfg_shiyongxieyi_cms_token;
			}
			
			
			//2021.1.18. 判断一组新的 选项
			//禁用GPS
			if(cb_params.option_list.disable_gps_location == 1){
				that.disable_gps_location = 1;
			}
			
			//显示营业地址卡片
			
			if(cb_params.option_list.show_address_card_in_index == 1){
				that.show_address_card_in_index = 1;
				//地址名片的内容
				that.address_card_in_index = cb_params.option_list.address_card_in_index;
			}
			
			
			cb_params.option_list.show_usercenter_contact_in_index = 1;
			
			if(cb_params.option_list.show_usercenter_contact_in_index){
				that.show_usercenter_contact_in_index = cb_params.option_list.show_usercenter_contact_in_index;
				
				if(cb_params.option_list.usercenter_contact_btn_type){
					that.usercenter_contact_btn_type = cb_params.option_list.usercenter_contact_btn_type;
				}
				if(cb_params.option_list.usercenter_contact_btn_text){
					that.usercenter_contact_btn_text = cb_params.option_list.usercenter_contact_btn_text;
				}
				if(cb_params.option_list.usercenter_contact_btn_img){
					that.usercenter_contact_btn_img = cb_params.option_list.usercenter_contact_btn_img;
				}
				if(cb_params.option_list.usercenter_contact_wxa_extend){
					that.usercenter_contact_wxa_extend = cb_params.option_list.usercenter_contact_wxa_extend;
					
					if(cb_params.option_list.usercenter_contact_wxa_title){
						that.usercenter_contact_wxa_title = cb_params.option_list.usercenter_contact_wxa_title;
					}
					if(cb_params.option_list.usercenter_contact_wxa_path){
						that.usercenter_contact_wxa_path = cb_params.option_list.usercenter_contact_wxa_path;
					}
					if(cb_params.option_list.usercenter_contact_wxa_img){
						that.usercenter_contact_wxa_img = cb_params.option_list.usercenter_contact_wxa_img;
					}
					
					
				}
				
			}
			
			//显示富媒体组件
			//cb_params.option_list.show_rich_html_in_index = 1;
			//cb_params.option_list.index_rich_html_type = 'https';
			//cb_params.option_list.index_rich_html_content = 'http://192.168.0.206/yanyubao_server/openapi/Jianghanyinhua/agent_get_order_list';
			//cb_params.option_list.index_rich_html_type = 'static';
			//cb_params.option_list.index_rich_html_content = '<div><div  style="background-color:#67c23a;width:80px;border-radius:5px;text-align:center;margin:0 auto;padding:10px;margin-top:10px;color:#fff;"><a href="http://192.168.0.87/yanyubao_server/openapi/Jianghanyinhua/agent_show_order_list?show_new_modal=1">创建订单</a></div></div>';
			
			if(cb_params.option_list.show_rich_html_in_index == 1){
				that.show_rich_html_in_index = 1;
				that.index_rich_html_type = cb_params.option_list.index_rich_html_type;
				
				
				console.log('index_rich_html_type====>>>>', that.index_rich_html_type);
				console.log('index_rich_html_content====>>>>>', that.index_rich_html_content);
				
				if(that.index_rich_html_type == 'static'){
					
					//that.index_rich_html_content = cb_params.option_list.index_rich_html_content;
					
					
					that.__index_rich_html_content_handle(cb_params.option_list.index_rich_html_content);

				}
				else if(that.index_rich_html_type == 'https'){
					
					that.__index_rich_html_get_content(cb_params.option_list.index_rich_html_content);
					
				}
				
			}
			
			//2022.10.8. 
			if(cb_params.option_list.xianmai_shang_list_switch_to_supplier_list == 1){
				that.abotapi.globalData.xianmai_shang_list_switch_to_supplier_list = 1;
			}
			
			
			//2024.4.9.
			if(cb_params.option_list.wxa_hidden_to_msg_btn_in_usercenter){
				that.wxa_hidden_to_msg_btn_in_usercenter = cb_params.option_list.wxa_hidden_to_msg_btn_in_usercenter;
			}
			
			
			
			
			//滚动图片和平铺图片
			that.get_flash_ad_list();
			
			//2023.7.2. 增加是否显示的判断
			if( (cb_params.option_list.show_function_images_list == 1) 
						&& (cb_params.option_list.function_images_list) ){
				//功能图片列表
				that.function_images_list = cb_params.option_list.function_images_list;
				
				if(cb_params.option_list.function_images_list_block_bg_color){
					that.function_images_list_block_bg_color = cb_params.option_list.function_images_list_block_bg_color;
				}
			}
			else{
				that.function_images_list = null;
			}
			
			
			that.get_flash_img_list();
			
			//新闻公告
			that.initArticleList(cb_params.option_list);
			
			//首页导航图标
			that.get_shop_icon_index();
			
			//商品列表
			that.get_product_list();
			
			//商户列表
			that.abotapi.globalData.default_shang_list_count_in_front_page = 10;
			
			that.call_back_get_shang_list();
			
			//显示最新的帖子列表
			if(that.abotapi.globalData.default_publish_list_count_in_front_page > 0){
				console.log('首页准备获取发帖列表，cms token为：' + that.cms_token);
				
				that.cms_token_001 = null;
				
				//如果后台的“通版商城V2”中没有设置“论坛和发帖相关”的CMS Token，则默认使用商户头条的。
				if(!that.cms_token){
					that.cms_token = cb_params.option_list.weiduke_token_to_toutiao;
				}
				
				console.log('首页准备获取发帖列表，cms token为（2）：' + that.cms_token);
				
				that.cataid = 0; 
				that.current_page = 0;
				that.current_page_size = cb_params.option_list.default_publish_list_count_in_front_page;
				
				//开关：是否要请求文章列表（请求到最后一页的时候不请求）
				that.is_get_article_list = true;
				
				publish_list_api.get_publish_list(that, that.get_api_publish_list);
			}
			
			//加载天气预报
			that.get_tianqi();
			
			
			
			//2020.12.22. 检查版本更新
			// #ifdef APP-PLUS	
				
			var is_check_new_version = false;
			var new_version_check_time = uni.getStorageSync("new_version_check_time");
			var currentTime = (new Date()).getTime();//获取当前时间
			if(currentTime - new_version_check_time > 4*60*60*1000){
				is_check_new_version = true;
			}
			else{
				console.log('最近4小时已经检查过版本更新了');
				
				//is_check_new_version = true;
			}
			
	
			console.log('最近4小时是否检查：', is_check_new_version);
			console.log('服务器返回版本号：', cb_params.option_list.version_code_from_server);
			
			//如果服务器端返回的版本号大于当前的版本，则提示更新
			if(is_check_new_version && cb_params.option_list.version_code_from_server 
				&& (cb_params.option_list.version_code_from_server > that.abotapi.globalData.version_code)){
					
				uni.setStorageSync("new_version_check_time", currentTime);
				
				uni.showModal({
					title: "发现新版本",
					content: "立即下载最新版本吗？",
					success: (res) => {
						if (res.confirm == true) {//当用户确定更新，执行更新
							if(that.abotapi.globalData.current_platform == 'app-android'){
								that.__doUpdataAppApk(cb_params.option_list.new_version_apk_download_url);
							}
							else if(that.abotapi.globalData.current_platform == 'app-ios'){
								//打开苹果手机的app store
								plus.runtime.openURL(cb_params.option_list.new_version_ios_app_store_url);
							}
						
						
							
						}
					}
				});
				
				/*plus.runtime.getProperty(plus.runtime.appid, function(inf) {
					if(inf.version != result.data.data.versions){
						
					}
				});*/
			}
			// #endif
			
					
			//2021.2.23. 百度分享相关			
			// #ifdef MP-BAIDU
				that.__set_mp_baidu_seo_page_info(that.abotapi.globalData.option_list);
			// #endif	
			
			
			
			
			
		},
		
		get_api_publish_list:function(that,publishData){
			//帖子列表
			console.log('publishData====>>>>',publishData);
			
			
			that.index_publish_list = [];
			
			for(var i in publishData.index_list){
				that.index_publish_list.push(publishData.index_list[i]);
			}
		},
		
		/* 获取前十条商家 */
		call_back_get_shang_list:function(){
			
			var that = this;
			
			if(!this.showHeader){
				console.log('隐藏了搜索框，所以没有顶部的城市定位，不再获取附近商家');
				
				return;
			}
			
			if(this.disable_gps_location == 1){
				console.log('禁用了GPS定位，无法排序获取附近商家，不再获取附近商家');
				
				return;
			}
			
			var arr = uni.getStorageSync('all_shang_jingwei_list');
			var arr_save_time = uni.getStorageSync('all_shang_jingwei_list_save_time');
			
			var currentTime = (new Date()).getTime();//获取当前时间
			
			console.log('call_back_get_shang_list currentTime======>>>>'+currentTime);
			
			if(arr && ( (currentTime - arr_save_time) < 2*60*60*1000 ) ){
				
				console.log('call_back_get_shang_list 存在列表且在2小时内（arr_save_time）'+arr_save_time);
				
				
				locationapi.get_location(that, that.set_paixu_shanglist);
				//that.set_paixu_shanglist();
			}
			else{
				
				console.log('call_back_get_shang_list 超过2小时（arr_save_time），自动获取最新的列表======>>>>'+arr_save_time);
				
				var post_url = this.abotapi.globalData.yanyubao_server_url + '/openapi/XianmaiShangData/get_shang_all_jingwei';
				
				//2021.8.5. 如果读取supplier的列表
				if(that.abotapi.globalData.xianmai_shang_list_switch_to_supplier_list == 1){
					post_url = this.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/supplier_all_jingwei';
				}
				
				console.log('call_back_get_shang_list 超过2小时（post_url），请求网址为======>>>>'+post_url);
				
				
				this.abotapi.abotRequest({
				    url: post_url,
				    method: 'post',
				    data: {
						sellerid:this.abotapi.globalData.default_sellerid,
				    },
				    success: function (res) {
						console.log('get_shang_all_jingwei====>>>>>', res);
						
						if (res.data.code != 1) {
						    //显示错误信息						
							return;
						}
						
						uni.setStorageSync("cata_list", res.data.all_cata_list);
						uni.setStorageSync("spec_list", res.data.all_spec_list);
						uni.setStorageSync('all_shang_jingwei_list', res.data.data);
						uni.setStorageSync('all_shang_jingwei_list_save_time', currentTime);
						
						//调用排序算法
						locationapi.get_location(that, that.set_paixu_shanglist);
						//that.set_paixu_shanglist();
				    },
				    fail: function (e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
				    },
				}); 
			}
			
		},
		//给商家排序
		set_paixu_shanglist:function(that,locationData){
			
			console.log('获取坐标locationData',locationData);
			
			if(!isNullOrUndefined(locationData.addressComponent) && locationData.addressComponent.city){
				that.current_cityname = locationData.addressComponent.city;
				
				console.log('locationData.addressComponent 获取到当前城市名称================>>>>>>', that.current_cityname);
			}
			else{
				console.log('locationData.addressComponent 没有获取到，使用默认的================>>>>>>', that.current_cityname);
			}
			
			
			
			
			var coordinate = [];
			coordinate['latitude'] = locationData.latitude;
			coordinate['longitude'] = locationData.longitude;
			
			that.coordinate = coordinate;
			
			var that = this;
			
			
			var arr = uni.getStorageSync('all_shang_jingwei_list');
			
			var shop_location_list = that.jisuan_juli(arr);
			
			function compare(obj1, obj2) {
			  var val1 = obj1.dis; 
			  var val2 = obj2.dis;
			  
			  return val1 - val2;
			}
			
			
			//开始排序
			var paixu_shanglist = shop_location_list.sort(compare);
			uni.setStorageSync("shop_location_list", paixu_shanglist);
			
			//排序完成，取最新的10条
			
			if(that.abotapi.globalData.default_shang_list_count_in_front_page == 0){
				return;
			}
			
			
			//console.log('要魂村的',);
			var shangid_str = '';//获取商家前十个的商家id
			for(var i = 0; i < that.abotapi.globalData.default_shang_list_count_in_front_page; i++){
				if(!paixu_shanglist[i]){
					console.log("没有了");
					break;
				}
				shangid_str += paixu_shanglist[i]['xianmai_shangid']+'|';
			}
			//排序 end
			
			var post_url = that.abotapi.globalData.yanyubao_server_url + '/openapi/XianmaiShangData/get_shang_list';
			
			if(that.abotapi.globalData.xianmai_shang_list_switch_to_supplier_list == 1){
				post_url = this.abotapi.globalData.yanyubao_server_url + '/openapi/NftCardData/supplier_list';
			}
			
			
			//用商家id字符串请求获取商家列表
			that.abotapi.abotRequest({
			    url: post_url,
			    method: 'post',
			    data: {
					sellerid:that.abotapi.globalData.default_sellerid,
					str: shangid_str,
					coordinate_json: JSON.stringify(that.coordinate)
			    },
			    success: function (res) {
					//console.log('get_shang_list===', res.data.xianmai_shang_list);
					
					if (res.data.code != 1) {
					  //显示错误信息
					  return;
					}
							
					var id = 0;
					
					for (var shangid in res.data['xianmai_shang_list']) {
					  //console.log('111111111111111111111111111', res.data['xianmai_shang_list'][shangid]['xianmai_shangid']);
							
					  var xianmai_shangid = res.data['xianmai_shang_list'][shangid]['xianmai_shangid'];
							
					  var disItem = null;
					  for (var iii = 0; iii < shop_location_list.length; iii++) {
						if (shop_location_list[iii]['xianmai_shangid'] == xianmai_shangid) {
						  disItem = shop_location_list[iii];
						  break;
						}
					  }
					  //console.log(disItem);
							
					  res.data['xianmai_shang_list'][shangid].dis = disItem.dis_str;
							
							
					  var imgs = [];
					  if (res.data['xianmai_shang_list'][shangid]['image_list']) {
						for (var j = 0; j < res.data['xianmai_shang_list'][shangid]['image_list'].length; j++) {
						  imgs.push(res.data['xianmai_shang_list'][shangid]['image_list'][j].url)
						}
					  }
					  res.data['xianmai_shang_list'][shangid].imgs = imgs;
					  res.data['xianmai_shang_list'][shangid].address = res.data['xianmai_shang_list'][shangid].address  //.substr(0, 10)
							
							
					}
							
					//console.log('iiiiiiiiiiiiiiiii', res.data['xianmai_shang_list']);
					
					that.twoArr = res.data['xianmai_shang_list'];
					
					
					
							
					
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
			});
			
		},
		
		//计算距离
		jisuan_juli:function(arr){
			console.log('计算距离123',arr);
			
			var dis = 0
			var shop_location_list = [];
			var that = this;
			
			
			
			for (var index in arr) {
				if (!isNaN(index)) {
					dis = that.abotapi.getDistance(that.coordinate['latitude'], that.coordinate['longitude'], arr[index]['latitude'], arr[index]['longitude']);
					
					//dis = Math.ceil(dis)
					if(!isNaN(dis)){
						arr[index]['dis'] = dis.toFixed(1);
										
						var dis_str = '';
						if (dis < 1000) {
						  dis_str = dis.toFixed(1) + '米'
						}
										
						else {
						  dis_str = (dis / 1000).toFixed(1) + '公里'
						}
										
						arr[index]['dis_str'] = dis_str;
						
						shop_location_list.push(arr[index])
					}
					
				}
			}
			console.log('=========>>>>>>>>....');
			return shop_location_list;
		},
		
		callback_func_for_shop_info:function(shop_info){
			var userInfo = this.abotapi.get_user_info();
			var shop_name = shop_info.shop_name;
			
			this.supplierid = shop_info.supplierid;
			
			/*uni.setNavigationBarTitle({
				title:shop_name
			})*/
			
			if(userInfo && userInfo.userid){
				console.log('88888====')
				//this.linkSocket();
			}
			
		},
		
		// 建立socket连接
		linkSocket: function(){
			var that = this;
			
			var userInfo = that.abotapi.get_user_info();
			
			if(!userInfo){
				return;
			}
			
			console.debug('准备连接socket服务器：' + that.abotapi.globalData.socket_server);
			
			const socket_io = socket_io_function(that.abotapi.globalData.socket_server, {path: '/socketio/'})
		   
			// socket连接后以uid登录
			
			//var uid = 'chat_app_userid_' + that.supplierid + '_' + userInfo.userid;
			
			var uid = 'chat_app_userid_' +that.abotapi.globalData.default_sellerid + '_' + userInfo.userid;		
			//console.log('chat_app_userid_',that.abotapi.globalData.default_sellerid)		
			console.log('chat_app_userid_=============',uid);
			
						
			socket_io.on('connect', function(){
				
				console.log('socket_io====6666',  socket_io.connected);
				console.log('socket_io====7777',  socket_io);
				socket_io.emit('login', uid);
				console.log(111);
				console.log('注册成功，uid=>'+uid);
				console.log(111);
			});
			
		
			
			socket_io.on('new_msg', function(msg){
				
				console.log('msg===main000',msg)
				
				//console.log("收到消息："+msg.replace(/&quot;/g,'"'));							
				msg = msg.replace(/&quot;/g,'"');
				msg = JSON.parse(msg);
				msg = JSON.parse(decodeURIComponent(msg));
				
				if((msg.msg.type == 'text') ||(msg.msg.type == 'img') 
					|| (msg.msg.type == 'voice')) {
					var msg_text = JSON.stringify(msg.msg.content);
					
					if(msg_text == that.last_msg_chongfu){
						
						console.log('重复消息处理')
						
						return;
					}
					
					that.last_msg_chongfu = msg_text;
				}
				
				var userInfo = that.abotapi.get_user_info();
				console.log('userInfo',userInfo)
				
				if(msg.uid == userInfo.userid){
					return;
				}
				
				
				
				
				//发的消息只在当前房间显示
				console.log('msg===main',msg)
				if(msg){
					
					// var current_chat_gui = app.globalData.current_chat_gui
					
					// console.log('current_chat_gui===',current_chat_gui)
					
					// if(current_chat_gui){
					// 	current_chat_gui.getNewMsg(msg);
					// }		
									
					that.abotapi.socketMsgHandle(that.abotapi.current_chat_gui, that.abotapi.current_chat_page,msg);
									
					// that.getLastMsg();
																			
					
				}
		  
				
			});
		},
		
		
		//加载商品列表，触底自动加载下一页
		get_product_list:function(){
			console.log('get_product_list=====>>>>>');
			
			if(this.wxa_hidden_product_list == 1){
				console.log('隐藏了商品列表，不加载');
				
				return;
			}
			
			var that = this;
			
			
			
			if(this.is_OK){
				/*uni.showToast({
					title: '已经到底了~',
					duration: 2000
				});*/
				
				return;
			}
			
			this.is_OK = true;
			
			var post_data = {
					sellerid:this.abotapi.globalData.default_sellerid,
					sort: 1,
					page: that.page_num,
					page_size:that.page_size,
			    };
			
			if(this.wxa_product_list_show_type == 'is_recommend'){
				post_data.is_recommend = 1;
			}
			else if(this.wxa_product_list_show_type == 'is_hot'){
				post_data.is_hot = 1;
			}
			
			
			this.abotapi.abotRequest({
			    url: this.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=product_list',
			    method: 'post',
			    data: post_data,
			    success: function (res) {
					if(!res.data){
						return;
					}
					
					if(res.data.code == 1){
						
						console.log('获取商品列表，页码：' + that.page_num);
						
						
						
						if(that.page_num == 1){
							console.log('第一页')
							that.current_product_list = res.data.product_list;
							//console.log('第一页index',that.current_product_list)
						}
						else{
							that.current_product_list = that.current_product_list.concat(res.data.product_list);
							
							console.log('超过一页',that.current_product_list)
							
							uni.stopPullDownRefresh();//得到数据后停止下拉刷新
						}
						
						that.is_OK = false;
						that.page_num ++;
					}
					else if(res.data.code == 0){
						that.is_OK = true;
						
						if(that.current_product_list && that.current_product_list.length 
							&& (that.current_product_list.length > 0)){
								uni.showToast({
									title: '已经到底了~',
									duration: 2000
								});
							}
						
						return;
					}
					
					
					
					
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
			});
		},
		
		//2022.5.10. 加载爆款商品列表
		__get_hot_product_list_in_index:function(){
			console.log('__get_hot_product_list_in_index=====>>>>>');
			
			var that = this;
			
			var post_data = {
					sellerid:this.abotapi.globalData.default_sellerid,
					sort: 1,
					page: 0,
					page_size: 10,
					is_hot : 1,
			    };

			
			this.abotapi.abotRequest({
			    url: this.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=product_list',
			    method: 'post',
			    data: post_data,
			    success: function (res) {
					if(!res.data){
						return;
					}
					
					if(res.data.code != 1){
						uni.showToast({
							title: '没有爆款商品~',
							duration: 2000
						});
						
						return;
					}
					
					console.log('第一页');
					
					that.hot_product_list_in_index = res.data.product_list;	
					
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
			});
		},
		
		
		//顶部轮播图片请求
		get_flash_ad_list:function(){
			var that = this;
			
			console.log('get_flash_ad_list=====>>>>>', that.roll_picture);
			
			if(that.roll_picture == -1){
				console.log('that.roll_picture=====>>>>>', that.roll_picture);
				
				that.flash_ad_list = that.roll_picture_list;
				return;
			}
			
			this.abotapi.abotRequest({						
			    url: this.abotapi.globalData.yanyubao_server_url +  '?g=Yanyubao&m=ShopAppWxa&a=get_flash_ad_list',
			    method: 'post',
			    data: {
					sellerid:this.abotapi.globalData.default_sellerid,
					type:4
			    },
			    header: {
					'Content-Type': 'application/x-www-form-urlencoded'
			    },
			    success: function (res) {
					console.log('uuufff===', res);
					that.flash_ad_list = res.data.data;
				  
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
			    },
			});
		},
		
		
		//平铺广告请求
		get_flash_img_list:function(){
			var that = this;
			
			console.log('get_flash_img_list=====>>>>>', that.pingpu_picture);
			
			
			
			if(that.pingpu_picture == -1){
				that.flash_img_list = that.pingpu_picture_list;
				return;
			}
			
			this.abotapi.abotRequest({									
			    url: this.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=get_flash_img_list',
			    method: 'post',
			    data: {
					sellerid:this.abotapi.globalData.default_sellerid,
					type:5
			    },
			    header: {
					'Content-Type': 'application/x-www-form-urlencoded'
			    },
			    success: function (res) {
					console.log('wbafff===', res);
					that.flash_img_list = res.data.data;
					
			    },
			    fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
				},
			});
		},
		
		
		
		initArticleList: function (option_list) {
			
			
			
			console.log('initArticleList_new initArticleList_new', option_list);
			
			if(!option_list || !option_list.weiduke_token_to_toutiao || !option_list.weiduke_classid_to_toutiao){
				console.log('缺少 weiduke_token_to_toutiao 或 weiduke_classid_to_toutiao');
				return;
			}
			
			var that = this;
			
			that.cms_token_001 = option_list.weiduke_token_to_toutiao;
			that.cataid = option_list.weiduke_classid_to_toutiao; 
			that.page = 0;
			
			that.is_get_article_list = true;
			
			if(that.cms_token && that.cataid){
				publish_list_api.get_publish_list(that, function(that003, res_data){
					
					
					if(!res_data.index_list){
						console.log('res_data=====>>>>', res_data);
						
						return;
					}
					
					
					that.articlelist = res_data.index_list;
					
					console.log('articlelist', that.articlelist);
					
					//如果显示为两个一组
					if (that.wxa_shop_toutiao_flash_line == 2) {
						
						var articlelist2_temp = [];
						
						//如果只有一条新闻
						if(that.articlelist.length <= 1){
							that.wxa_shop_toutiao_flash_line = 1;
						}
						else{
							for (var i = 0, length = that.articlelist.length -1; i < (length / 2); i++) {
								var arr = [that.articlelist[0], that.articlelist[1]];
								
								articlelist2_temp.push(arr);
								
								that.articlelist.shift()
								that.articlelist.shift()
							}
							
							that.articlelist2 =  articlelist2_temp;
							console.log('that.articlelist2',that.articlelist2);
						}
						
					}
					
					
				});
			}
			else{
				this.get_weiduke_yanyubao_yingxiao_list();
			}
			
		
		},
		  
		  
		articleBack: function (res) {
		    console.log(res);
		
		    var that = this
		    if (res.data.code == '1') {
				this.abotapi.set_current_weiduke_token(res.data.token);
		      
		      //为显示加载动画添加3秒延时
				setTimeout(function () {
		       
					that.articlelist = res.data.data
					console.log('that.articlelist',that.articlelist);
					// loading = !this.data.loading
		        
				}, 500)
		
				if (that.wxa_shop_toutiao_flash_line == 2) {
					var data = res.data.data;
					var articlelist2 = [];
					for (var i = 0, length = data.length -1; i < (length / 2); i++) {
						var arr = [data[0], data[1]];
						articlelist2.push(arr);
						data.shift()
						data.shift()
					}
		        
					that.articlelist2 =  articlelist2 
					console.log('that.articlelist2',that.articlelist2);
				}
			}
		},
		
		
		//商户头条
		get_weiduke_yanyubao_yingxiao_list:function(){
			var that = this;
			this.abotapi.abotRequest({
				url : this.abotapi.globalData.weiduke_server_url + '/?g=Home&m=Yanyubao&a=yingxiao',
				method:'POST',
				data: {
					id: 'seller',
					action: 'list',
					sellerid:this.abotapi.globalData.default_sellerid,
					currentpage: 1
				},
				header:{'Content-Type': 'application/x-www-form-urlencoded'},
				success:function(res){
					console.log('res1',res);
					
					that.abotapi.set_current_weiduke_token(res.data.token);
					
					if(res.data.code == 1){
						that.articlelist = res.data.data;
						console.log('articlelist', that.articlelist);
					}
					
					//如果显示为两个一组
					if (that.wxa_shop_toutiao_flash_line == 2) {
						
						var articlelist2_temp = [];
						
						//如果只有一条新闻
						if(that.articlelist.length <= 1){
							that.wxa_shop_toutiao_flash_line = 1;
						}
						else{
							for (var i = 0, length = that.articlelist.length -1; i < (length / 2); i++) {
								var arr = [that.articlelist[0], that.articlelist[1]];
								
								articlelist2_temp.push(arr);
								
								that.articlelist.shift()
								that.articlelist.shift()
							}
							
							that.articlelist2 =  articlelist2_temp;
							console.log('that.articlelist2',that.articlelist2);
						}
						
					}
				},
				fail:function(res){
					console.log('res2',res);
				},
			});
			
		},
		
		//首页分类图标
		get_shop_icon_index:function(){
			var that = this;
			
			if(that.navigation_icon == -1){
				that.index_icon_list = that.navigation_icon_list;
				
				return;
			}
			
			that.abotapi.abotRequest({
				url:that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=get_shop_icon_index',
				data:{
					sellerid:that.abotapi.globalData.default_sellerid,
				},
				success(res) {
					var data = res.data;
					console.log("data===",data);
					if(data.code == 1){
						that.index_icon_list = data.data;
					}
				}
			});
			
			
		},
		
		//点击商户头条进入列表
		touTiaoList: function (e) {
		    console.log('点击商户头条进入列表');
		    uni.navigateTo({
				url: '/pages/help/list?sellerid=' + this.abotapi.globalData.default_sellerid
		    })
		},
		
		//加载Promotion 并设定倒计时,,实际应用中应该是ajax加载此数据。
		loadPromotion() {
			let cutTime = new Date();
			let yy = cutTime.getFullYear(),
				mm = cutTime.getMonth() + 1,
				dd = cutTime.getDate();
			let tmpcountdown = yy + '/' + mm + '/' + dd + ' 23:59:59';
			let tmpPromotion = [
				{
					title: '整点秒杀',
					ad: '整天秒杀专区',
					img: '/static/img/s1.jpg',
					countdown: false
				},
				{
					title: '限时抢购',
					ad: '每天23点上线',
					img: '/static/img/s2.jpg',
					countdown: tmpcountdown
				} //countdown为目标时间，程序会获取当前时间倒数
			];
			//检查倒计时
			for (let i = 0; i < tmpPromotion.length; i++) {
				let row = tmpPromotion[i];
				if (row.countdown) {
					let h = '00',
						m = '00',
						s = '00';
					let currentTime = new Date();
					let cutoffTime = new Date(tmpcountdown);
					if (!(currentTime >= cutoffTime)) {
						let countTime = parseInt(
							(cutoffTime.getTime() - currentTime.getTime()) / 1000
						);
						h = parseInt(countTime / 3600);
						m = parseInt((countTime % 3600) / 60);
						s = countTime % 60;
						h = h < 10 ? '0' + h : h;
						m = m < 10 ? '0' + m : m;
						s = s < 10 ? '0' + s : s;
					}
					tmpPromotion[i].countdown = { h: h, m: m, s: s };
				}
			}
			this.Promotion = tmpPromotion;
		},
		//定时器
		Timer() {
			setInterval(() => {
				if (this.Promotion.length > 0) {
					for (let i = 0; i < this.Promotion.length; i++) {
						let row = this.Promotion[i];
						if (row.countdown) {
							if (
								!(
									row.countdown.h == 0 &&
									row.countdown.m == 0 &&
									row.countdown.s == 0
								)
							) {
								if (row.countdown.s > 0) {
									row.countdown.s--;
									row.countdown.s =
										row.countdown.s < 10
											? '0' + row.countdown.s
											: row.countdown.s;
								} else if (row.countdown.m > 0) {
									row.countdown.m--;
									row.countdown.m =
										row.countdown.m < 10
											? '0' + row.countdown.m
											: row.countdown.m;
									row.countdown.s = 59;
								} else if (row.countdown.h > 0) {
									row.countdown.h--;
									row.countdown.h =
										row.countdown.h < 10
											? '0' + row.countdown.h
											: row.countdown.h;
									row.countdown.m = 59;
									row.countdown.s = 59;
								}
								this.Promotion[i].countdown = row.countdown;
							}
						}
					}
				}
			}, 1000);
		},
		//消息列表
		toMsg(){
			uni.navigateTo({
				url:'../msg/msg'
			})
		},
		//搜索跳转
		toSearch() {
			uni.navigateTo({
				url:'/pages/main/search/search'				
			})
		},
		
		toJicundianHotSearch(search_text){
			
			this.search_jicundian_text = search_text;
			
			this.toJicundianSearch();
		},
		toJicundianSearch(){
			//1111111111111
			console.log('search_jicundian_text ===>>> ', this.search_jicundian_text);
			
			if(this.search_jicundian_text.length == 0){
				uni.showToast({
					title: '请输入搜索词',
					icon: 'error'
				});
				
				return;
			}
			
			var new_url = '/pages/shopList/shopList?search_text='+this.search_jicundian_text;
			
			this.abotapi.call_h5browser_or_other_goto_url(new_url);
			
		},
		
		
		//推荐商品跳转
		toPromotion(e) {
			console.log('toPromotion-e',e);
			
			// uni.showToast({ title: e.title, icon: 'none' });
		},
		//商品跳转
		toGoods(productItem) {
			var productid = productItem.productid;
			uni.navigateTo({
				url: '/pages/product/detail?productid='+productid
			});
		},
		//实体商家跳转
		toShangDetail(e) {
			console.log('rrxfff===',e.currentTarget.dataset.shangid);
			
			var shangid = e.currentTarget.dataset.shangid;
			
			var new_url = '/pages/shopDetail/shopDetail?shangid='+shangid;
			
			if(this.abotapi.globalData.xianmai_shang_list_switch_to_supplier_list == 1){
				new_url = '/pages/nftcard/shopDetail?shangid='+shangid
			}
			
			uni.navigateTo({
				url: new_url
			});
		},
		toShangList(){
			this.abotapi.call_h5browser_or_other_goto_url('/pages/shopList/shopList');
		},
		

		
		//首页导航图标、轮播图、平面广告跳转
		toAdDetails:function(url){
			
			if(!url){
				console.log('url为空，不跳转！');
				return;
			}
			
			// var home_url = '/pages/index/index';
			// this.abotapi.goto_user_login(home_url, 'switchTab');
			
			var that = this;
			var var_list = Object();
			console.log('toAdDetails- to url ====>>>>>>', url);
			
			this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
			
		},
		
		//客服相关
		//拨打客服电话
		call_seller: function () {
		    console.log('wxa_kefu_mobile_num', this.wxa_kefu_mobile_num)
		    uni.makePhoneCall({
				phoneNumber: this.wxa_kefu_mobile_num,
		    })
		},
		
		//隐私协议同意不同意
		tongyi_yinsi_cfg:function(e){
			var index = e.currentTarget.dataset.index;
			
			if(index == 1 && this.checked_user_agreement){
				//同意  写缓存   关闭弹层
				this.know = false;
				
				uni.setStorageSync('yinsi_cfg_if_consent'+ this.abotapi.globalData.version_code,'1');
				
				this.abotapi.set_shop_option_data(this, function(that, cb_params){
					if(cb_params.option_list && (cb_params.option_list.wxa_hidden_tabbar == 1)){
						
					}
					else{
						uni.showTabBar({							
						})
					}
					
				});
				
				
			}else if(this.checked_user_agreement == false){
				
				uni.showModal({
					title:'提示',
					content:'您必须同意服务协议才可以继续',
					showCancel:false,
				})
				
			}
			else{
				//不同意  弹tost
				uni.showModal({
					title:'提示',
					content:'您必须同意服务协议才可以继续',
					showCancel:false,
				})
			}
		},
		
		// APP自动升级
		__doUpdataAppApk:function(apk_download_url){
			uni.showLoading({
				title: '更新中……'
			});
			
			uni.downloadFile({//执行下载
				url: apk_download_url, //下载地址
				success: downloadResult => {//下载成功
				
					uni.hideLoading();
					
					if (downloadResult.statusCode == 200) {
						uni.showModal({
							title: '',
							content: '更新成功，现在重启安装吗？',
							confirmText: '立即重启',
							confirmColor: '#EE8F57',
							cancelText:'下次再说',
							success: function(res) {
								if (res.confirm == true) {
									plus.runtime.install(//安装
										downloadResult.tempFilePath, {
											force: true
										},
										function(res) {
											
											uni.showToast({
												title:'更新成功，重启中'
											});
											
											plus.runtime.restart();
										}
									);
								}
							}
						});
					}
				}
			});
		},
		
		//拨打客服电话
		index_address_card_call_seller: function() {
			var that = this;
			//console.log('88888ss', that.address_card_in_index.telephone);
			uni.makePhoneCall({
				phoneNumber: that.address_card_in_index.telephone,
			})
			
			return;
		},
		
		//跳转到地图
		index_address_card_go_map:function(){
			var that = this;
			
			var new_url = '/pages/shopMap/shopMap?latitude=';			
			new_url += that.address_card_in_index.latitude + '&longitude='+that.address_card_in_index.longitude;
			new_url += '&name='+that.abotapi.globalData.default_shopname;
			new_url += '&address='+that.address_card_in_index.address;
			
			that.abotapi.call_h5browser_or_other_goto_url(new_url);
		},
		
		//富媒体 图片被点击
		index_rich_html_preview_image:function(img_src, e){
		},
		
		//富媒体 链接点击事件
		index_rich_html_click_link:function(new_url, e){
			
			console.log('index_rich_html_click_link====>>>>>', new_url);
			
			this.abotapi.call_h5browser_or_other_goto_url(new_url);
			
			
		},
		
		__index_rich_html_content_handle(html_str){
			var that = this;
			
			that.index_rich_html_content = html_str;			
			
			if(!that.index_rich_html_content){
				that.index_rich_html_content = '<div></div>';
			}
			
			console.log('that.index_rich_html_content====>>>>', that.index_rich_html_content);
			
			// 2021.3.1. 不需要使用formatRichText过滤，具体的css由html代码控制。			
			const filter = that.$options.filters["formatRichText"];
			that.index_rich_html_content = filter(that.index_rich_html_content);
			
			console.log('that.index_rich_html_content====>>>> formatRichText之后 ===>>>', that.index_rich_html_content);
			
			
			// #ifdef H5
			//	const filter = that.$options.filters["formatRichText"];
			//	that.index_rich_html_content = filter(that.index_rich_html_content);
			// #endif
			
			
			// #ifdef MP-ALIPAY
				console.log('that.index_rich_html_content====>>>>支付宝小程序');
				
				let data001 = that.index_rich_html_content;
				let newArr = [];
				let arr = parseHtml(data001);
				arr.forEach((item, index)=>{
					newArr.push(item);
				});
				
				//console.log('arr arr arr====>>>>', arr);
				//console.log('newArr newArr newArr====>>>>', newArr);
				
				that.index_rich_html_content = newArr;
			// #endif
						
			
		},
		
		//富媒体请求后台设置的动态网址获取参数。
		__index_rich_html_get_content:function(rich_html_url){
			//判断是否是http开头的？
			
			if(!rich_html_url
				|| (rich_html_url.substr(0, 4) != 'http') ){
				
				
				return;
				
			}
			
			var that = this;
			
			//判断登录，并且拼接替换这个参数
			if(rich_html_url.indexOf("%current_userid%") != -1) {
				var userInfo = that.abotapi.get_user_info();
				
				console.log('userid===',userInfo);
				
				if(!userInfo){
					//下次进入 onShow 函数的时候，自动执行下拉刷新的操作
					
					console.log('准备跳转到登录页面，下次进入的时候执行下拉刷新');
					
					uni.setStorageSync('need_pulldown_refresh_flag', 1);
					
					that.abotapi.goto_user_login('/pages/index/index', 'normal');
					
					return;  
				}
				
				rich_html_url = rich_html_url.replace('%current_userid%', userInfo.userid);
			}
			
			console.log('888888888url=', rich_html_url);
			
			//读取缓存
			that.index_rich_html_cache_id = md5(rich_html_url);
			
			var detail_data = uni.getStorageSync('index_rich_html_cache_' + that.index_rich_html_cache_id);
			
			if(detail_data){
				that.__index_rich_html_content_handle(detail_data);
				
				return;
			}
			
			
			
			that.abotapi.abotRequest({
			    url: rich_html_url,
				method:'GET',
				dataType:'html',
			    data: {},
			    success: function (res) {
					
					console.log('aaaa111==获取富媒体内容成功（HTML代码）');
					///console.log('aaaa111==', res.data);
					
					uni.setStorage({
						key: 'index_rich_html_cache_' + that.index_rich_html_cache_id,
						data: res.data
					})
					
					that.__index_rich_html_content_handle(res.data);
					
					
					
			    },
			    fail: function (e) {
					console.log('aaaa111==', e);
					
					uni.showToast({
						title: '请求富媒体失败',
						duration: 2000
					});
			    },
			});
		},
		//设置百度小程序中的页面SEO信息
		__set_mp_baidu_seo_page_info:function(option_list){
			
			var share_title = option_list.wxa_share_title;
			if (share_title.length > 22) {
				share_title = share_title.substr(0, 20) + '...';
			}
			
			var share_img = option_list.wxa_share_img;
			if(!share_img){
				share_img = option_list.wxa_shop_operation_logo_url;
			}
			
			console.log('当前时间：' + util.formatTime( new Date() ) + ' '+util.formatTime2( new Date() ) + ':01');
			
			swan.setPageInfo({
				title: share_title,
				keywords: option_list.wxa_share_keywords,
				description: option_list.wxa_share_description,
				articleTitle: share_title,
				releaseDate: util.formatTime( new Date() ) + ' '+util.formatTime2( new Date() ) + ':01',
				image: [share_img],
				video: [],
				visit: {},
				likes: '75',
				comments: '13',
				collects: '23',
				shares: '8',
				followers: '35',
				success: res => {
					console.log('setPageInfo success');
				},
				fail: err => {
					console.log('setPageInfo fail', err);
				}
			});
		}
		
	},
	filters: {
		/**
		 * 处理富文本里的图片宽度自适应
		 * 1.去掉img标签里的style、width、height属性
		 * 2.img标签添加style属性：max-width:100%;height:auto
		 * 3.修改所有style里的width属性为max-width:100%
		 * 4.去掉<br/>标签
		 * @param html
		 * @returns {void|string|*}
		 */
		formatRichText (html) { //控制小程序中图片大小
			let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
				match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
				match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
				match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
				return match;
			});
			
			newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
				match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
				return match;
			});
			//newContent = newContent.replace(/<br[^>]*\/>/gi, '');
			
			newContent = newContent.replace(/<p[^>]*>/gi, '<p style="margin:20px;">');
			
			newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:0px auto;vertical-align: middle;"');
			///newContent = newContent.replace(/\<img/gi, '<img style="width:100%; display:inline-block;"');
			//newContent = newContent.replace(/\<img/gi, '<img width="5rem"');
			
			newContent = newContent.replace(/<h2[^>]*>/gi, '<h2 class="content-article-detail_h2">');
			
			return newContent;
		},
		formatIndexRichText(html){
			return html;
		}
	},
};
</script>
<style lang="scss">
page{position: relative;background-color: #fff;}


/* 新页面的CSS Begin 111111111111 */

.jicun_block_one {
	//jpg非透明图片， transparent-beijing-city-skyline-shanghai-1024px-3.jpg
	background-image: url('data:image/jpeg;base64,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AAIASAAAAAEAAjhCSU0EJgAAAAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAWjhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAAAAAAAAAIAAThCSU0EAgAAAAAABAAAAAA4QklNBDAAAAAAAAIBAThCSU0ELQAAAAAABgABAAAAAzhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAAOZAAAABgAAAAAAAAAAAAAETAAABEwAAAAyAHQAcgBhAG4AcwBwAGEAcgBlAG4AdAAtAGIAZQBpAGoAaQBuAGcALQBjAGkAdAB5AC0AcwBrAHkAbABpAG4AZQAtAHMAaABhAG4AZwBoAGEAaQAtADEAMAAyADQAcAB4AC0AMwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAETAAABEwAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAABEwAAAAAUmdodGxvbmcAAARMAAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGlj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L3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjQgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNC0wNC0yMFQwOToxOToyOSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNC0yMFQwOToxOTo0NCswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDQtMjBUMDk6MTk6NDQrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowZDRhNzdhNy0xM2JkLWIyNDItYTVkMy0yYjAyNzI4ZTBhMTYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3MTgxNzY3ZC00N2Y2LTVkNDEtYTVjZC0xMThiY2VmOTNkNWIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4Y2U3MjQ3MS1lNWI2LTNkNDItOTAxMS03NjU2NDVhZTMwMTMiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OGNlNzI0NzEtZTViNi0zZDQyLTkwMTEtNzY1NjQ1YWUzMDEzIiBzdEV2dDp3aGVuPSIyMDI0LTA0LTIwVDA5OjE5OjI5KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuNCAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmUwOTU3MDRkLTlmNDItZGQ0Ni1iZDIzLTI4ZWFhZGRjNGQyMSIgc3RFdnQ6d2hlbj0iMjAyNC0wNC0yMFQwOToxOTo0NCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjQgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9qcGVnIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL2pwZWciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjBkNGE3N2E3LTEzYmQtYjI0Mi1hNWQzLTJiMDI3MjhlMGExNiIgc3RFdnQ6d2hlbj0iMjAyNC0wNC0yMFQwOToxOTo0NCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjQgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplMDk1NzA0ZC05ZjQyLWRkNDYtYmQyMy0yOGVhYWRkYzRkMjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OGNlNzI0NzEtZTViNi0zZDQyLTkwMTEtNzY1NjQ1YWUzMDEzIiBzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OGNlNzI0NzEtZTViNi0zZDQyLTkwMTEtNzY1NjQ1YWUzMDEzIi8+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4ZTM0YzZlNC03ZjQyLTg2NGYtODMxMC1lOGIyNTljYzQwZTE8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/iDFhJQ0NfUFJPRklMRQABAQAADEhMaW5vAhAAAG1udHJSR0IgWFlaIAfOAAIACQAGADEAAGFjc3BNU0ZUAAAAAElFQyBzUkdCAAAAAAAAAAAAAAAAAAD21gABAAAAANMtSFAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEWNwcnQAAAFQAAAAM2Rlc2MAAAGEAAAAbHd0cHQAAAHwAAAAFGJrcHQAAAIEAAAAFHJYWVoAAAIYAAAAFGdYWVoAAAIsAAAAFGJYWVoAAAJAAAAAFGRtbmQAAAJUAAAAcGRtZGQAAALEAAAAiHZ1ZWQAAANMAAAAhnZpZXcAAAPUAAAAJGx1bWkAAAP4AAAAFG1lYXMAAAQMAAAAJHRlY2gAAAQwAAAADHJUUkMAAAQ8AAAIDGdUUkMAAAQ8AAAIDGJUUkMAAAQ8AAAIDHRleHQAAAAAQ29weXJpZ2h0IChjKSAxOTk4IEhld2xldHQtUGFja2FyZCBDb21wYW55AABkZXNjAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAA81EAAQAAAAEWzFhZWiAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAG+iAAA49QAAA5BY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')
    
}

.jicun_block_one .one_main {
	margin:0rpx 20rpx 10rpx 20rpx;
	padding: 20rpx;
	background-color: #ffffff; 
	border-radius: 25rpx; 
	height: 400rpx;
	filter: opacity(0.9);
}


.jicun_block_two {
	display: block;
	float:left;
	padding: 20rpx 0rpx;
	width: 100%;
}
.jicun_block_two .navigate_icon_item {
	width:25%; 
	float: left;
	padding: 10rpx 0rpx;
	text-align: center;
}

.jicun_block_two .navigate_icon_img_view {
	margin:0 auto; 
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	background-color: #1296db;
}

.jicun_block_two .navigate_icon_img_file {
	width: 60rpx; 
	height: 60rpx;
	margin: 20rpx;
}


.jicun_block_two9999 image{
	width: 35rpx;
	height: 35rpx;
	padding: 18rpx;
}

.one_main .my_tag_text {
	font-size:22rpx;
	background-color: #e6e6e6;
	height: 50rpx;
	border-radius: 10rpx;
	line-height: 50rpx;
	padding:0 20rpx;
	margin: 10rpx;
	float: left;
}
.jicun_footer_one{
	background-color: #ffffff; 
	border-radius: 15rpx;
	height: 60rpx;
	margin:0rpx 20rpx 10rpx 20rpx;
	display: flex;
	padding:10rpx;
	line-height: 60rpx;
	}
	
	.jicun_footer_one view{
		margin-left: 20rpx;
	}
	.jicun_footer_two{
		margin:40rpx 20rpx 10rpx 20rpx;
		padding: 20rpx;
	    background-color: #ffffff; 
		border-radius: 25rpx; 
		height: 150rpx;
	}
	
/* 新页面的CSS End */


.icon.location:before {
    content: '\E611';
}
.shang_box{
	display: flex;
	padding: 10upx;
	margin: 10upx;
	border-radius: 10upx;
	background: #fff;
	border: 1upx solid #fff;
}
.pullDown-effects{
	position: fixed;
	//top: calc(100upx - 36vw);
	top: 0;
	z-index: 9;
	width: 100%;
	height: 36vw;
	/*  #ifdef  APP-PLUS  */
	padding-top: var(--status-bar-height);
	/*  #endif  */
	image{
		width: 100%;
		height: 36vw;
	}
}
.mystatusbar {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	background-color: #fff;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height: var(--status-bar-height); //覆盖样式
	/*  #endif  */
}

.statusbar_place {
	background-color: #ffffff;
	height: 10rpx;
	/*  #ifdef  APP-PLUS  */
	margin-top: var(--status-bar-height);
	/*  #endif  */
}

.statusbar_header {
	width: 92%;
	padding: 0 4%;
	height: 100upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
	background-color: #fff;

	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */

	.addr {
		width: 160upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		
		// font-size: 28upx;
		.icon {
			height: 60upx;
			margin-right: 5upx;
			display: flex;
			align-items: center;
			font-size: 42upx;
			color: #ffc50a;
		}
	}
	.input-box {
		width: 100%;
		height: 60upx;
		background-color: #f5f5f5;
		border-radius: 10rpx;
		position: relative;
		display: flex;
		align-items: center;
		.icon {
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			right: 0;
			width: 60upx;
			height: 60upx;
			font-size: 34upx;
			color: #c0c0c0;
		}
		input {
			padding-left: 28upx;
			height: 28upx;
			font-size: 28upx;
		}
	}
	.icon-btn {
		// width: 120upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;
		.icon {
			width: 60upx;
			height: 60upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 42upx;
		}
	}
}

.category-list {
	width: 96%;
	margin-left: 2%;
	padding: 0 0 30upx 0;
	border-bottom: solid 2upx #f6f6f6;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.category {
		width: 25%;
		margin-top: 50upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		.img {
			width: 100%;
			display: flex;
			justify-content: center;
			image {
				width: 9vw;
				height: 9vw;
			}
		}
		.text {
			margin-top: 16upx;
			width: 100%;
			display: flex;
			justify-content: center;
			font-size: 24upx;
			color: #3c3c3c;
		}
	}
}
.banner_with_shadow {
	width: 92%;
	margin: 40upx 4%;
	image {
		border-radius: '';
		box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.3);
	}
}

.banner {
	width: 100%;
	margin: 0;
	image {
		border-radius: '';
	}
}

.toutiao{
  width:100%;
  height:100rpx;
  margin:20rpx auto;
  background-color: #fff;
  clear: both;
}

.toutiao_left{
  width: 100rpx;
  height: 100rpx;
  float: left;
}

.toutiao_left image{
  width: 80rpx;
  height: 80rpx;
  float: left;
  margin-top: 10rpx;
}

.toutiao_right{
  width:85%;
  height:100rpx;
  float:left;
  font-size:32rpx;
  line-height:100rpx;
  color:#666666;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.toutiao_right2{
  width:85%;
  height:100rpx;
  float:left;
  font-size:26rpx;
  line-height:50rpx;
  color:black;
  overflow: hidden;
  letter-spacing: 3rpx;
  text-overflow: ellipsis;
}

.toutiao_right2_item{
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.zhuanti_title {
	font-size:26rpx;
	text-align: center;
	color:#a2a2a2;
	padding: 30rpx auto;
	margin: 30rpx auto 0;
	display: block;
	height: 40rpx;
	width: 90%;
}



.promotion {
	width: 92%;
	margin: 50upx 4% 20upx;
	.text {
		width: 100%;
		height: 60upx;
		font-size: 34upx;
		font-weight: 600;
		margin-top: -10upx;
	}
	.list {
		width: 100%;
		display: flex;
		justify-content: space-between;
		.column {
			width: 43%;
			padding: 15upx 3%;
			background-color: #ebf9f9;
			border-radius: 10upx;
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.top {
				width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;
				margin-bottom: 5upx;
				.title {
					font-size: 30upx;
				}
				.countdown {
					margin-left: 20upx;
					display: flex;
					height: 40upx;
					display: flex;
					align-items: center;
					font-size: 20upx;
					view {
						height: 30upx;
						background-color: #f06c7a;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #fff;
						border-radius: 4upx;
						margin: 0 4upx;
						padding: 0 2upx;
					}
				}
			}
			.left {
				width: 50%;
				height: 18.86vw;
				display: flex;
				flex-wrap: wrap;
				align-content: space-between;
				.ad {
					margin-top: 5upx;
					width: 100%;
					font-size: 22upx;
					color: #acb0b0;
				}
				.into {
					width: 100%;
					font-size: 24upx;
					color: #aaa;
					margin-bottom: 5upx;
				}
			}
			.right {
				width: 18.86vw;
				height: 18.86vw;
				image {
					width: 18.86vw;
					height: 18.86vw;
				}
			}
		}
	}
}
.goods-list {
	// background-color: #f4f4f4;
	.title {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		color: #f47825;
		font-size: 30upx;
		margin-top: 10upx;
		image {
			width: 30upx;
			height: 30upx;
		}
	}
	.loading-text {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60upx;
		color: #979797;
		font-size: 24upx;
	}
	.product-list {
		width: 92%;
		padding: 0 4% 3vw 4%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.product {
			width: 48%;
			border-radius: 20upx;
			background-color: #fff;
			margin: 0 0 15upx 0;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);
			image {
				width: 100%;
				border-radius: 20upx 20upx 0 0;
			}
			.name {
				width: 92%;
				margin: 10upx 4%;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				text-align: justify;
				overflow: hidden;
				font-size: 30upx;
			}
			.info {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				width: 92%;
				padding: 10upx 4% 10upx 4%;

				.price {
					color: #e65339;
					font-size: 30upx;
					font-weight: 600;
				}
				.slogan {
					color: #807c87;
					font-size: 24upx;
				}
			}
		}
	}
}
.youhui-biaoqian {
		font-size: 24upx;
		margin-bottom: 10upx;
		border: 1rpx solid #666;
		text-align: center;
		color: #555;
		border-radius: 6upx;
		padding: 4rpx 10rpx;
		margin-right: 10upx;
	}
	.u-tap-btn {
	  position:fixed;
	  right:20upx;
	  bottom:150upx;
	  border:0upx;
	}
	
	.u-go-home2 {
	  display:flex;
	  flex-direction:row;
	  justify-content:center;
	  border-radius:55upx;
	  width:110upx;
	  height:110upx;
	  border:0rpx solid #eee;
	  font-size:20upx;
	  /*box-shadow:0rpx 4upx 8upx rgba(0,0,0,0.35);*/
	  z-index:2;
	  opacity:1;
	  /*background:#44b549;*/
	  align-items:center;
	  
	}
.u-go-home2 image {
	height: 80upx;
	width: 80upx;
	position: absolute;
	left: 16upx;
}
.img_swiper{
	height: 100%;
}
.zhezhao {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.7);
	z-index: 998;
	
	}
	.kcrzxy {
	width: 70%;
	left: 50%;
	top: 15%;
	position: fixed;
	transform: translate(-50%,0);
	background: #fff;
	border-radius: 20rpx;
	z-index: 999;
	
	}
	
	.kcrzxyhd {
	text-align: center;
	font-size: 26rpx;
	background: #f44444;
	height: 70rpx;
	line-height: 70rpx;
	color: white;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	
	}
	
	.kcrzxybd {
	font-size: 28rpx;
	padding: 20rpx 30rpx;
	box-sizing: border-box;
	
	}
	.queren {
	height: 70rpx;
	width: 30%;
	font-size: 26rpx;
	line-height: 70rpx;
	text-align: center;
	color: white;
	background: #f44444;
	border-radius: 10rpx;
	margin: 10rpx 10rpx;
	
	}
	
	.content_block{
		display: flex;
		align-items: center;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		padding-left: 20rpx;
	}
	
	.weatherinfo_icon{
		margin-right:20rpx;
		width: 50rpx;
		height:50rpx;
	}
	
	/*地址卡片相关*/
	.index_address_card_main{
		display: flex;
		padding: 20rpx;
		margin: 10rpx 0;
		box-shadow: 0rpx 4rpx 12rpx rgba(0, 0, 0, 0.2);
		/*width: 90%;
		margin: 0 auto;
		color: #666666;
		padding: 10rpx;
		border-radius: 10rpx;*/
	}
	.index_address_card_address{
		order:1;
		flex-grow:1;
		display: flex;
		margin: 10rpx 0 0 10rpx;
		
	}
	
	.index_address_card_icon_telephone{
		order:2;
		width:80rpx;
		min-width: 80rpx;
		text-align: center;
		justify-content: center;
		display: grid;
		align-items: center;//子元素垂直居中
		padding-top:15rpx ;
	}
	.index_address_card_icon_telephone_img{
		width: 40rpx;
	}
	
	.index_address_card_address_detail{
		font-size:26rpx;
	}
	
	.index_address_card_address_text {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		text-align: justify;
		overflow: hidden;
		height: 40rpx;
		line-height: 40rpx;
	}
	
	.index_address_card_yingyeshijian{
		margin-top: 15rpx;
		font-size: 22rpx;
		color: #666;
	}
	//rich-text 富媒体样式
	
	/* .born_btn{
		background-color: #67c23a;
		font-size: 80px;
	} */
	.copyright_info {
		padding: 40rpx 0 80rpx 0;
		
	}
	
	//2022.05.10
	.zhuanti_title_more {
		display:block;
		float:right;
		font-size:26rpx;
	}
	.hot_product_image{
		width:  200rpx;
		height: 200rpx;
		
	}
	.hot_product_name{
		width: 200rpx;
		
		text-overflow:ellipsis;
		white-space: nowrap;
		overflow: hidden;
		text-align: center;
	}
	.hot_product_item{
		width:200rpx;
		background-color: #ffffff;
		border-radius:10rpx;
		margin-left:20rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
		box-shadow: 0rpx 5rpx 10rpx rgba(0, 0, 0, 0.1);
	}

</style>
