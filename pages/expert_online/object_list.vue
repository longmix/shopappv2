<template>
	
	<view class="content">
		<view class="content-zaixianjiaoyou" v-if="iconid == 10016">
			<!-- 头部样式 -->
			<view class="amount_money" style="background-color: #2D96FF;">
				
				<view style="float:right; padding-top: 30rpx;">
					<button class="yuelao"  type="default" plain="true" style="border: 2rpx solid aliceblue; color: aliceblue; font-weight: bold;">申请月老</button>
				</view>
				<view style="display: flex; padding-top: 20rpx;">
					<view style="width: 25%;">
						<view @tap="duixiang" style="font-size: 20px; color: #d9d9d9; font-weight: bold;">推荐</view>
					</view>
					<view style="width: 25%;">
						<view style="font-size: 20px; color: aliceblue;font-weight: bold;">找对象</view>
					</view>
				</view>
				
			</view>
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/zhuanjiazaixian_icon/tupian.png" style="width: 100%;" mode="widthFix"></image>
			<!-- 轮播图 -->
			<!-- <swiperBanner v-if="productLists"
				:imgUrls="productLists" 
				:border_radius="5"
				:swiper_width_percent_value="92"
				@goto_url="toAdDetails"></swiperBanner>
				 -->
				
			<block>
				<!-- -附近商家 -->
				<view class="label-line">
				  <view class='label-line-a'></view>
				  <view> ※ 主播列表 ※ </view>
				  <view class='label-line-a'></view>
				</view>
				
				<view  class="top-input-con" style="margin-top: 0rpx;" id="affix"> 
					<!-- 智能排序按钮 -->
					<view class="ab" @click="bindPickerChangeFloor($event)" data-searchType="star_level" style='width: 25%;'>
						<text>智能排序</text>
						<!-- <image class='local-img' src="../../static/img/xiala.png"></image> --> 
					</view>
				
					<!-- 全部行业按钮 -->
					<picker class="ab" style="width:25%;" @change="bindPickerChangeFloor($event)"  :range="hangye_list" data-searchType="hangyeName">
						<view  style="display: flex;justify-content: center;align-items: center;">
							<view class="picker">
								<text>行业</text>
								<!-- <view class="picker">
									<picker name="recipient_type" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_mold_Change" :value="mold_index" :range="mold_array" >
										<view>{{cata_list[cata_list_index]}} </view>
									</picker>
								</view> -->
							</view>
							<image class='local-img' src="../../static/img/xiala.png"></image> 
						</view>
					</picker>
					
					<!-- 分类按钮 {{fenlei_name}}-->
					<picker class="ab" style="width:25%;" @change="bindPickerChangeFloor($event)"  :range="cata_list" data-searchType="cataName">
						<view  style="display: flex;justify-content: center;align-items: center;">
							<view class="picker">
								<text>性别</text>
								<!-- <view class="picker">
									<picker name="recipient_type" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_mold_Change" :value="mold_index" :range="mold_array" >
										<view>{{cata_list[cata_list_index]}} </view>
									</picker>
								</view> -->
							</view>
							<image class='local-img' src="../../static/img/xiala.png"></image> 
						</view>
					</picker>
					
			
					<!-- 筛选按钮 {{shaixuan_name}}-->
					<picker class="ab" style="width:25%;" @change="bindPickerChangeFloor($event)"  :range="nainling_list" data-searchType="spec">
						<view style="display: flex;justify-content: center;align-items: center;">
							<view class="picker" style="float:left;" >
								<text>年龄</text>
							</view>
							<image class='local-img' src="../../static/img/xiala.png"></image> 
						</view>
					</picker>
				</view>
				<!-- 筛选按钮结束 -->
			</block>
			
			<view class="" style="display: flex;justify-content: space-between;
		flex-wrap: wrap;">
				<view @tap="tiaozhuan_detail" style="background-color: #C6C3CF;width: 42%;height: 301rpx;margin: 4%;text-align: center;border-radius: 10rpx;">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/jiazhenggongsi/yuangong04.jpeg" style="width: 150rpx;height: 150rpx;border-radius: 50%;margin-top: 10rpx;"></image>
					<view>叶雨轩</view>
					<view>24，辽宁</view>
				</view>
				<view @tap="tiaozhuan_detail" style="background-color: #C6C3CF;width: 42%;height: 301rpx;margin: 4%;text-align: center;border-radius: 10rpx;s">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/a20.jpeg" style="width: 150rpx;height: 150rpx;border-radius: 50%;margin-top: 10rpx;"></image>
					<view>李梓涵</view>
					<view>18，湖北</view>
				</view>
				<view @tap="tiaozhuan_detail" style="background-color: #C6C3CF;width: 42%;height: 301rpx;margin: 4%;text-align: center;border-radius: 10rpx;s">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/a05.jpeg" style="width: 150rpx;height: 150rpx;border-radius: 50%;margin-top: 10rpx;"></image>
					<view>叶芸芸</view>
					<view>26，四川</view>
				</view>
				<view @tap="tiaozhuan_detail" style="background-color: #C6C3CF;width: 42%;height: 301rpx;margin: 4%;text-align: center;border-radius: 10rpx;s">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/3.jpg" style="width: 150rpx;height: 150rpx;border-radius: 50%;margin-top: 10rpx;"></image>
					<view>李羽南</view>
					<view>22，广东</view>
				</view>
			</view>
		
		</view>
		<view class="content-zaixianyiliao" v-if="iconid == 10018">
			<!-- 头部样式 -->
			<view class="amount_money" style="background-color: #2D96FF;">
				
				<view style="float:right; padding-top: 30rpx;">
					<button class="yuelao"  type="default" plain="true" style="border: 2rpx solid aliceblue; color: aliceblue; font-weight: bold;">申请医生</button>
				</view>
				<view style="display: flex; padding-top: 20rpx;">
					<view style="width: 25%;">
						<view @tap="duixiang" style="font-size: 20px; color:#d9d9d9 ; font-weight: bold;">推荐</view>
					</view>
					<view style="width: 25%;">
						<view style="font-size: 20px; color: aliceblue;font-weight: bold;">找医生</view>
					</view>
				</view>
				
			</view>
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/zhuanjiazaixian_icon/tupian.png" style="width: 100%;" mode="widthFix"></image>
			<!-- 轮播图 -->
			<!-- <swiperBanner v-if="productLists"
				:imgUrls="productLists" 
				:border_radius="5"
				:swiper_width_percent_value="92"
				@goto_url="toAdDetails"></swiperBanner>
				 -->
				
			<block>
				<!-- -附近商家 -->
				<view class="label-line">
				  <view class='label-line-a'></view>
				  <view> ※ 医生列表 ※ </view>
				  <view class='label-line-a'></view>
				</view>
				
				<view  class="top-input-con" style="margin-top: 0rpx;" id="affix"> 
					<!-- 智能排序按钮 -->
					<view class="ab" @click="bindPickerChangeFloor($event)" data-searchType="star_level" style='width: 25%;'>
						<text>智能排序</text>
						<!-- <image class='local-img' src="../../static/img/xiala.png"></image> --> 
					</view>
				
					<!-- 全部行业按钮 -->
					<picker class="ab" style="width:25%;" @change="bindPickerChangeFloor($event)"  :range="keshi_list" data-searchType="keshiName">
						<view  style="display: flex;justify-content: center;align-items: center;">
							<view class="picker">
								<text>科室</text>
								<!-- <view class="picker">
									<picker name="recipient_type" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_mold_Change" :value="mold_index" :range="mold_array" >
										<view>{{cata_list[cata_list_index]}} </view>
									</picker>
								</view> -->
							</view>
							<image class='local-img' src="../../static/img/xiala.png"></image> 
						</view>
					</picker>
					
					<!-- 分类按钮 {{fenlei_name}}-->
					<picker class="ab" style="width:25%;" @change="bindPickerChangeFloor($event)"  :range="cata_list" data-searchType="cataName">
						<view  style="display: flex;justify-content: center;align-items: center;">
							<view class="picker">
								<text>性别</text>
								<!-- <view class="picker">
									<picker name="recipient_type" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_mold_Change" :value="mold_index" :range="mold_array" >
										<view>{{cata_list[cata_list_index]}} </view>
									</picker>
								</view> -->
							</view>
							<image class='local-img' src="../../static/img/xiala.png"></image> 
						</view>
					</picker>
					
			
					<!-- 筛选按钮 {{shaixuan_name}}-->
					<picker class="ab" style="width:25%;" @change="bindPickerChangeFloor($event)"  :range="nainling_list" data-searchType="spec">
						<view style="display: flex;justify-content: center;align-items: center;">
							<view class="picker" style="float:left;" >
								<text>年龄</text>
							</view>
							<image class='local-img' src="../../static/img/xiala.png"></image> 
						</view>
					</picker>
				</view>
				<!-- 筛选按钮结束 -->
			</block>
			
			<view class="" style="display: flex;justify-content: space-between;
		flex-wrap: wrap;">
				<view @tap="tiaozhuan_detail" style="background-color: #C6C3CF;width: 42%;height: 301rpx;margin: 4%;text-align: center;border-radius: 10rpx;">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/bigbeimei.jpg" style="width: 150rpx;height: 150rpx;border-radius: 50%;margin-top: 10rpx;"></image>
					<view>延安</view>
					<view>24，辽宁</view>
				</view>
				<view @tap="tiaozhuan_detail" style="background-color: #C6C3CF;width: 42%;height: 301rpx;margin: 4%;text-align: center;border-radius: 10rpx;s">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/ciq04.jpg" style="width: 150rpx;height: 150rpx;border-radius: 50%;margin-top: 10rpx;"></image>
					<view>李薇</view>
					<view>18，湖北</view>
				</view>
				<view @tap="tiaozhuan_detail" style="background-color: #C6C3CF;width: 42%;height: 301rpx;margin: 4%;text-align: center;border-radius: 10rpx;s">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/ciqi01.jpg" style="width: 150rpx;height: 150rpx;border-radius: 50%;margin-top: 10rpx;"></image>
					<view>益安宁</view>
					<view>26，四川</view>
				</view>
				<view @tap="tiaozhuan_detail" style="background-color: #C6C3CF;width: 42%;height: 301rpx;margin: 4%;text-align: center;border-radius: 10rpx;s">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/ciqi03.jpg" style="width: 150rpx;height: 150rpx;border-radius: 50%;margin-top: 10rpx;"></image>
					<view>天天</view>
					<view>22，广东</view>
				</view>
			</view>
		
		</view>
		<view class="content-falvzixun" v-if="iconid == 10017">
			<!-- 头部样式 -->
			<view class="amount_money" style="background-color: #2D96FF;">
				
				<view style="float:right; padding-top: 30rpx;">
					<button class="yuelao"  type="default" plain="true" style="border: 2rpx solid aliceblue; color: aliceblue; font-weight: bold;">申请律师</button>
				</view>
				<view style="display: flex; padding-top: 20rpx;">
					<view style="width: 25%;">
						<view @tap="duixiang" style="font-size: 20px; color: #d9d9d9; font-weight: bold;">推荐</view>
					</view>
					<view style="width: 25%;">
						<view style="font-size: 20px; color:aliceblue ;font-weight: bold;">找律师</view>
					</view>
				</view>
				
			</view>
			<image src="https://yanyubao.tseo.cn/Tpl/static/images/zhuanjiazaixian_icon/tupian.png" style="width: 100%;" mode="widthFix"></image>
			<!-- 轮播图 -->
			<!-- <swiperBanner v-if="productLists"
				:imgUrls="productLists" 
				:border_radius="5"
				:swiper_width_percent_value="92"
				@goto_url="toAdDetails"></swiperBanner>
				 -->
				
			<block>
				<!-- -附近商家 -->
				<view class="label-line">
				  <view class='label-line-a'></view>
				  <view> ※ 律师列表 ※ </view>
				  <view class='label-line-a'></view>
				</view>
				
				<view  class="top-input-con" style="margin-top: 0rpx;" id="affix"> 
					<!-- 智能排序按钮 -->
					<view class="ab" @click="bindPickerChangeFloor($event)" data-searchType="star_level" style='width: 25%;'>
						<text>智能排序</text>
						<!-- <image class='local-img' src="../../static/img/xiala.png"></image> --> 
					</view>
				
					<!-- 全部行业按钮 -->
					<picker class="ab" style="width:25%;" @change="bindPickerChangeFloor($event)"  :range="fuwu_list" data-searchType="fuwuName">
						<view  style="display: flex;justify-content: center;align-items: center;">
							<view class="picker">
								<text>法律服务</text>
								<!-- <view class="picker">
									<picker name="recipient_type" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_mold_Change" :value="mold_index" :range="mold_array" >
										<view>{{cata_list[cata_list_index]}} </view>
									</picker>
								</view> -->
							</view>
							<image class='local-img' src="../../static/img/xiala.png"></image> 
						</view>
					</picker>
					
					<!-- 分类按钮 {{fenlei_name}}-->
					<picker class="ab" style="width:25%;" @change="bindPickerChangeFloor($event)"  :range="cata_list" data-searchType="cataName">
						<view  style="display: flex;justify-content: center;align-items: center;">
							<view class="picker">
								<text>性别</text>
								<!-- <view class="picker">
									<picker name="recipient_type" style="border: 1rpx solid #BFBFBF; width: 150rpx;" mode="selector"  @change="bind_mold_Change" :value="mold_index" :range="mold_array" >
										<view>{{cata_list[cata_list_index]}} </view>
									</picker>
								</view> -->
							</view>
							<image class='local-img' src="../../static/img/xiala.png"></image> 
						</view>
					</picker>
					
			
					<!-- 筛选按钮 {{shaixuan_name}}-->
					<picker class="ab" style="width:25%;" @change="bindPickerChangeFloor($event)"  :range="nainling_list" data-searchType="spec">
						<view style="display: flex;justify-content: center;align-items: center;">
							<view class="picker" style="float:left;" >
								<text>年龄</text>
							</view>
							<image class='local-img' src="../../static/img/xiala.png"></image> 
						</view>
					</picker>
				</view>
				<!-- 筛选按钮结束 -->
			</block>
			
			<view class="" style="display: flex;justify-content: space-between;
		flex-wrap: wrap;">
				<view @tap="tiaozhuan_detail" style="background-color: #C6C3CF;width: 42%;height: 301rpx;margin: 4%;text-align: center;border-radius: 10rpx;">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/ciqi05.jpg" style="width: 150rpx;height: 150rpx;border-radius: 50%;margin-top: 10rpx;"></image>
					<view>李律师</view>
					<view>24，辽宁</view>
				</view>
				<view @tap="tiaozhuan_detail" style="background-color: #C6C3CF;width: 42%;height: 301rpx;margin: 4%;text-align: center;border-radius: 10rpx;s">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/ciqi06.jpg" style="width: 150rpx;height: 150rpx;border-radius: 50%;margin-top: 10rpx;"></image>
					<view>陈律师</view>
					<view>18，湖北</view>
				</view>
				<view @tap="tiaozhuan_detail" style="background-color: #C6C3CF;width: 42%;height: 301rpx;margin: 4%;text-align: center;border-radius: 10rpx;s">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/ciqi07.jpg" style="width: 150rpx;height: 150rpx;border-radius: 50%;margin-top: 10rpx;"></image>
					<view>魏律师</view>
					<view>26，四川</view>
				</view>
				<view @tap="tiaozhuan_detail" style="background-color: #C6C3CF;width: 42%;height: 301rpx;margin: 4%;text-align: center;border-radius: 10rpx;s">
					<image src="https://yanyubao.tseo.cn/Tpl/static/images/ciqi08.jpg" style="width: 150rpx;height: 150rpx;border-radius: 50%;margin-top: 10rpx;"></image>
					<view>苏律师</view>
					<view>22，广东</view>
				</view>
			</view>
		
		</view>
		
	</view>
</template>
<!--  -->
<style>
	
	/* 头部样式 */
	.amount_money{
		width: 100%;
		height:100rpx;
		background-color: #ffffff;
		text-align: center;
		align-items: center;
	}
	/* 申请月老 */
	.yuelao{
		/* width: 150rpx; */
		height: 50rpx; 
		line-height: 50rpx;
		border-radius:1.5rem; 
		font-size: 23rpx; 
	}
	
	
	.top-input-con {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 20rpx;
		background: #fff;
		z-index: 2;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.label-line {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		color: #aaa;
		margin-bottom: 17rpx;
		margin-top: 27rpx;
	
	}
	.label-line-a {
		border: 1px solid #eee;
		width: 30%;
	
	}
	.ab {
		text-align: center;
		font-size: 32rpx;
		padding: 15rpx 0;
		border: 1px solid #ddd;
		border-radius: 20px;
		color: #666;
	
	}
	.local-img {
		width: 24rpx;
		height: 24rpx;
		margin-left: 11rpx;
		padding-top: 1rpx;
	
	}
</style>

<script>
		import swiperBanner from '../../components/swiper-banner.vue';
export default {	
	components:{
		
		swiperBanner
	},
	data() {
		return {
			user_info:'',
			fenxiao_info:'',
			my_xia_grade_level:'',
			wxa_shop_nav_bg_color: '#ea5504',
			wxa_kefu_mobile_num:'',
			wxa_kefu_button_type:'',
			wxa_kefu_form_url:'',
			current_page:1,
			current_daili_fenrun_list:null,
			
			cata_list:['男','女' ],
			hangye_list:['公务员','互联网','自媒体','教师','服务','护士'],
			nainling_list:['18-23','23-28','28-33','33-38','38-43','43-48','48-53','53-58','58-63','63-68'],
			keshi_list:['内科','外科','妇产科','男科','外科','儿科','五官科','肿瘤科','皮肤性病科','中医科','传染科','精神心理科','整形美容科','营养科','麻醉医学科','医学影像科','其他科室'],
			fuwu_list:['刑事纠纷','离婚纠纷','房产纠纷','人格权纠纷','法定继承纠纷','所有权纠纷','财产损害赔偿纠纷','承包地征收补偿费用分配纠纷','土地承包经营权确认纠纷','建设用地使用权纠纷','买卖合同纠纷','房地产开发经营合同纠纷','房屋买卖合同纠纷','金融借款合同纠纷',
						'民间借贷纠纷','保证合同纠纷','租赁合同纠纷','侵害商标权纠纷','劳动合同纠纷','股权转让纠纷','责任保险合同纠纷','人身保险合同纠纷','机动车交通事故责任纠纷','医疗损害责任纠纷','婚约财产纠纷','其他纠纷'],
			
			
			changge_xiaoxi:false,
			productLists:[],
			current_iconid:0,
			iconid:0,
			
			
		}
	},
	onLoad:function(options) {
		var that = this;
		
		
		if(options.iconid){
			this.current_iconid = options.iconid;
		}
		
		console.log('12333=====>>>',options)
		
		
		if(options == 10016){
			iconid == 10016;
			uni.setNavigationBarTitle({
				title:'主播列表' 
			})
		}
		if(options == 10017){
			iconid == 10017;
			uni.setNavigationBarTitle({
				title:'律师列表' 
			})
		}
		if(options == 10018){
			iconid == 10018;
			uni.setNavigationBarTitle({
				title:'医生列表' 
			})
		}
	
		that.user_info = {};
		that.current_daili_fenrun_list = {};
		that.user_info.supplier_balance_log_yeji_jine_num = 0;
		that.user_info.user_dengji_xiaoshou_renwu = 0;
		that.user_info.userItem_balance_leiji_yongjin = 0.00;
		that.current_daili_fenrun_list.userItem_balance_leiji_yongjin = 0.00;
	
	
		that.get_current_userinfo();
		
		that.get_fenxiao_total_amount();
		that.get_shop_icon_index();
		this.iconid = options.iconid;
		
		this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
		
	},
	onShow() {
		this.get_gundong_img();
	},
	onReady(){
		
	},
	onPageScroll(e) {
		
	},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		   console.log('下拉刷新==')
		   
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
			 this.current_page = 1;
		   this.get_current_userinfo();
		   
		   console.log('下拉刷新==============')
		   
		   //停止当前页面的下拉刷新
		   setTimeout(function() {
		   	console.log('timeout===>>>stopPullDownRefresh===>>>hideToast');
		   	
		   	uni.stopPullDownRefresh();
		   	
		   	uni.hideToast();
		   	//uni.hideLoading();
		   	
		   }, 2000);
		   
		},
		
		methods: {
			//获取滚动图片接口
			get_gundong_img:function(){
				var that = this;
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=get_flash_ad_list',
					method: 'post',
					data: {
						sellerid:that.abotapi.globalData.default_sellerid,
						'type': 4
					},
					success: function (res) {
						console.log('ppppppp===>>',res);
						that.productLists = res.data.data;
						
						// #ifdef MP-BAIDU
						that.productLists = null;
						// #endif
						
					}
				})
			},
			tiaozhuan_detail:function(){
				console.log('222222222222222222222222222222')
				var new_url = '/pages/expert_online/anchor_detail';
				if(this.current_iconid){
					new_url += '?iconid='+this.current_iconid;
				}
				this.abotapi.call_h5browser_or_other_goto_url(new_url);
			},
			//首页导航图标、轮播图、平面广告跳转
			// toAdDetails:function(url){
			// 	// var var_list = Object();
				
			// 	// this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
				
				
			// 	var that = this;
			// 	var var_list = Object();
			// 	console.log('toAdDetails- to url ====>>>>>>', url);
				
			// 	this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
			// },
			xiaoxi:function(){
				this.changge_xiaoxi = !this.changge_xiaoxi;
			},
			// tuijian:function(){
			// 	console.log('123456123')
			// 	var new_url = '/pages/expert_online/object_list';
			// 	if(this.current_iconid){
			// 		new_url += '?iconid='+this.current_iconid;
			// 	}
			// 	this.abotapi.call_h5browser_or_other_goto_url(new_url);
			// },
			duixiang:function(){
				console.log('123456123')
				var new_url = '/pages/expert_online/hotlist';
				if(this.current_iconid){
					new_url += '?iconid='+this.current_iconid;
				}
				this.abotapi.call_h5browser_or_other_goto_url(new_url);
				
				
				// var new_url = '/pages/jiazhenggongsi/citizen_edit';
				// if(this.current_citizenid){
				// 					 new_url += '?citizenid='+this.current_citizenid;
				// }
				// this.abotapi.call_h5browser_or_other_goto_url(new_url);
			},
			callback_function_shop_option_data:function(that, cb_params){
				
				console.log('当前调试开关22：' + this.system_debug_flag);
				console.log('当前平台名称22：' + this.abotapi.globalData.current_platform);
				
				if(!cb_params){ 
					return;
				}
				
				
				console.log('cb_params====', cb_params);
				
				that.wxa_shop_nav_bg_color  = cb_params.option_list.wxa_shop_nav_bg_color;
				that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
				
				
				
				if (cb_params.option_list.wxa_kefu_mobile_num) {
				  
				    that.wxa_kefu_mobile_num = cb_params.option_list.wxa_kefu_mobile_num
				  
				}
				if (cb_params.option_list.wxa_kefu_button_type) {
				  
				   that.wxa_kefu_button_type = cb_params.option_list.wxa_kefu_button_type
				  
				}
				if (cb_params.option_list.wxa_kefu_form_url) {
				  
				    that.wxa_kefu_form_url = cb_params.option_list.wxa_kefu_form_url
				  
				}
				
				
				// if(that.current_iconid){
				// 	var that = this;
					
				// 	post_data.iconid = that.current_iconid;
				// 	if(that.current_iconid == 10016){
				// 		zaixianjiaoyou == !zaixianjiaoyou;
				// 	}
				// 	if(that.current_iconid == 10017){
				// 		falvzixun == !falvzixun;
				// 	}
				// 	if(that.current_iconid == 10016){
				// 		zaixianyiliao == !zaixianyiliao;
				// 	}
				// }
				
				
			},
			
			
			get_shop_icon_index:function(){
				var that = this;
				
				//判断是否登录
				var userInfo = that.abotapi.get_user_info();
				if(!userInfo || !userInfo.userid || !userInfo.checkstr){
					that.abotapi.goto_user_login('/pages/jiazhenggongsi/index')
				}
				
				var post_end_point = '/?g=Yanyubao&m=ShopAppWxa&a=get_shop_icon_index';
				var post_data = {
					sellerid: that.abotapi.globalData.default_sellerid,
				};
				
				that.abotapi.abotRequest(post_end_point, post_data, function(res){
					console.log('/?g=Yanyubao&m=ShopAppWxa&a=get_shop_icon_index===>>>', res);
					
					
					
				})
				
				
				
			// 	that.abotapi.abotRequest({
			// 		url: that.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=get_shop_icon_index',
			// 		method: 'post',
			// 		data: {
			// 			sellerid:that.abotapi.globalData.default_sellerid,
			// 			iconid:that.iconid,
			// 		},
			// 		success: function (res) {
			// 			console.log('ppppppp===>>',res);
			// 			that.productLists = res.data.data;
						
			// 			// #ifdef MP-BAIDU
			// 			that.productLists = null;
			// 			// #endif
						
			// 		}
					
					
			// 	})
			
			
			
			},
			
			get_current_userinfo: function() {
				var that = this;
				
				var userInfo = that.abotapi.get_user_info();
				
				var last_url = '/pages/fenxiao/fenxiao_center';
				
				if (!userInfo || !userInfo.userid) {
					that.abotapi.goto_user_login(last_url);
				
					return;
				}
				that.userInfo = userInfo;
			
				console.log('get_current_userinfo--userInfo==', userInfo);
				
				var post_data = {
						sellerid: that.abotapi.globalData.default_sellerid,
						checkstr: userInfo.checkstr,
						userid: userInfo.userid,
						page: that.current_page,
						page_size: 10,
				};
				
				// #ifdef MP-WEIXIN
					post_data.xiaochengxu_appid = that.abotapi.globalData.xiaochengxu_appid,
					post_data.xiaochengxu_openid = that.abotapi.get_current_openid('userid_openid_' + userInfo.userid);
				// #endif
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/FenxiaoData/get_fenxiao_center_myteam_list',
					data: post_data,
					success: function(res) {
					
						if (res.data.code == -1) {
							//登录超时
							that.abotapi.del_user_info();
							
							var last_url = '/pages/tabbar/user';
							that.abotapi.goto_user_login(last_url, 'normal');
							
						} 
						else {
							/* 
							
							if(res.data.data.fenxiao_info.supplier_sequence == '-1'){
								uni.showModal({
									title:'错误',
									content:'请购买代理身份',
									showCancel:false
								});
								
								uni.navigateTo({
									url: '/pages/tabbar/user',
								})
								
							}
							
							 */
							
							var data = res.data;
							
							//渲染前端界面
							that.user_info = data.data;
							
							that.my_xia_grade_level = that.user_info.my_xia_grade_level;
							
							that.fenxiao_info = that.user_info.fenxiao_info;
							
							
							console.log('fenxiao_userinfo==>>', that.fenxiao_info);
						
							
						}
					},
					fail: function (e) {
					uni.showToast({
						title: '网络异常！',
						duration: 2000
					});
					},
				})
				
				
			},
			
			get_fenxiao_total_amount:function(){
				
				var that = this;
				
				var userInfo = that.abotapi.get_user_info();
				
						
				var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
					userid:userInfo.userid,
					checkstr: userInfo.checkstr,
				};
				
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/FenxiaoData/get_fenxiao_profit_summay_list',
					method: 'post',
					data: post_data,
					success: function (res) {
					
					that.current_daili_fenrun_list = res.data.data;
					
					},
						fail: function (e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
						},
				});
					
				
			},

			
			//邀请代理
			go_to_invitation_agent:function() {
				
				uni.navigateTo({
					url: '/pages/user/myQR/myQR',
				})
				
			},
			go_to_shop_detail:function(){
				uni.navigateTo({
					url: '/pages/product/goods-list/goods-list?cataid=11006&cataname=最新代理',
				})
			},
			//我的订单
			toOrderList:function() {
				uni.navigateTo({
					url: '/pages/user/order_list/order_list?currentTab=0&otype=0',
				})
			
			},
			//我的团队
			go_to_myteam:function(){
				uni.navigateTo({
					url: '/pages/fenxiao/myteam',
				})
				
			},
			//收益汇总
			go_to_profit_summary:function(){
				uni.navigateTo({
					url: '/pages/fenxiao/profit_summary',
				})
				
			},
			//收益中心
			go_to_profit_center:function(){
				uni.navigateTo({
					url: '/pages/fenxiao/profit_center',
				})
				
			},
			//联盟订单
			to_union_order_list:function() {
				uni.navigateTo({
					url: '/pages/fenxiao/fenxiao_order_list',
				})
				
				
			},
			
			//公司资质
			go_to_gongsi_zizhi:function() {
				
				var last_url = '/pages/fenxiao/fenxiao_center';
							
				var userInfo = this.abotapi.get_user_info();
				if (!userInfo) {
					this.abotapi.goto_user_login(last_url);
			
					return;
				}

				var that = this;
							
				var var_list = Object();
				var url = 'https://yanyubao.tseo.cn/Home/XianmaiShang/zizhi_list/ensellerid/' + this.abotapi.globalData.default_sellerid + '.html'
				that.abotapi.call_h5browser_or_other_goto_url(url, var_list);
			},
			
			//提现账户
			go_to_tixian:function(){
				
				var url = 'https://sls.ddkshop.com/Home/User/income_typelist.html?ensellerid=%ensellerid%&oneclicklogin=%oneclicklogin%';
				
				var var_list = Object();
				
				this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
				
				
				
			},
			//消息列表
			toMsg:function() {
				
				uni.navigateTo({
					url: '/pages/msg/msg',
				})
				
			},
			
		
			//我的顾客
			go_to_customer:function(){
				
				uni.navigateTo({
					url: '/pages/fenxiao/mybuyer',
				})
				
			},
			
			//客服
			go_to_phone(){
				uni.makePhoneCall({
					phoneNumber: this.wxa_kefu_mobile_num,
				})
			},
			toAdDetails:function(url){
				
				if(!url){
					console.log('url为空，不跳转！');
					return;
				}
				
				// var home_url = '/pages/index/index';
				// this.abotapi.goto_user_login(home_url, 'switchTab');
				
				var that = this;
				var var_list = Object();
				
				this.abotapi.call_h5browser_or_other_goto_url(url, var_list, '');
				
			},
			go_to_my_integral:function () {
				uni.navigateTo({
					url: '/pages/user/logscore',
				})
				
			},
			// formsubmit: function(e) {
			// 	var that = this;
			// 	console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			// 	var formdata = e.detail.value;
			// 	console.log('formdata====>>>>',formdata);
				
			// 	bindPickerChangeFloor:function(e){
			// 		console.log('bindPickerChange发送选择改变，携带值为', e.detail.value)
			// 		this.mold_index = e.detail.value
			// 	}
			// }
		},
	}
</script>

