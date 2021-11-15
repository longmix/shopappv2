<template>
	<view>
		<view v-if="!zitidian_address ">
			<view v-if="wxa_order_queren_hide_address != 1" style="border-bottom:1px dashed #e5e5e5;">
				<view class="p_all bg_white mt10 font_14" v-if="addemt==0">
					<view @click="goAddress()">
						<view class="df">
							<view class="df_1 c6" style="padding: 5rpx 20rpx;">
								<view style='display:flex;'>
									<view class="l_h20" style="font-size:40rpx;margin-right:56rpx;">{{order_address_detail.name}}</view>
									<view class="l_h20 " style="font-size:40rpx;">{{order_address_detail.mobile}}</view>
								</view>
								<view class="l_h20 mt5" style="font-size:32rpx;margin-top:22rpx;">
									{{order_address_detail.area_province}}{{order_address_detail.area_city}}{{order_address_detail.area_district}}{{order_address_detail.address}}
								</view>
							</view>
							<view>
								<image class="x_rights" src="../../static/img/x_right.png"></image>
							</view>
							
						</view>
					</view>
				</view>
				<view class="p_all bg_white mt10 font_14" v-else>
					<view @click="goAddress()">
						<view class="df">
							<view class="df_1 c6">添加收货地址</view>
							<view>
								<image class="x_rights" src="../../static/img/x_right.png"></image>
							</view>
							
						</view>
					</view>
				</view>
			</view>

		</view>
		
		<view style="border-bottom:1px dashed #e5e5e5;" v-else >
			<view class="show_modal_mask" v-if="showShangModal" @tap="showShangModal=false"></view>
			<view class="show_modal_pop" v-if="showShangModal">
				<view v-for="(item,index) in paixu_shanglist" @tap="show_paixu_list(index)" style="border-bottom:1px dashed #e5e5e5;">
					<view class="df_1 c6 show_paixu" style="padding: 5rpx 20rpx;">
						<view style=''>
							<view class="l_h20" style="font-size:25rpx;margin-right:56rpx;">商家</view>
							<view class="l_h20 " style="font-size:25rpx;">{{item.key}}</view>
						</view>
						<view class="l_h20 mt5" style="font-size:20rpx;margin-top:22rpx;">
							{{item.value_arr.zitidian_address}}
						</view>
					</view>
				</view>
			</view>
			<view class="p_all bg_white mt10 font_14" @tap="showShangModal = true">
				<view class="df">
					<view class="df_1 c6" style="padding: 5rpx 20rpx;">
						<view style=''>
							<view class="l_h20" style="font-size:40rpx;margin-right:56rpx;">商家</view>
							<view class="l_h20 " style="font-size:25rpx;">{{paixu_shanglist[0].key}}</view>
						</view>
						<view class="l_h20 mt5" style="font-size:32rpx;margin-top:22rpx;">
							{{paixu_shanglist[0].value_arr.zitidian_address}}
						</view>
					</view>
					<view>
						<image class="x_rights" src="../../static/img/x_right.png"></image>
					</view>
					
				</view>
			</view>
		</view>
		

		<view class="p_all bg_white df item" v-for="(item,key) in productData" :key="key" v-if="order_type_001 == 'shopmall'">
			<view class="photo_name">
				<view class="cp_photo">
					<image mode='widthFix' :src="item.picture"></image>
				</view>
				<view class="df_1">
					<view class="font_14 mt5">
						{{item.name}}  <block v-if="item.option_name">{{item.option_name}}</block>
					</view>
					<view class="font_14 mt5">
						<span style="color:#E3170D;font-weight: bold;margin-right: 10rpx;">¥{{item.price}}</span>  x  {{item.amount}}
					</view>
				</view>
			</view>

			<view>
				<!-- <view class="danji_shulian">
					<text class="gm_ovh_1h pt10">单价</text>
					<text class="gm_ovh_1h pt10">¥{{item.price}}</text>
				</view>

				<view class="danji_shulian">
					<text class="gm_ovh_1h pt10">数量</text>
					<text class="gm_ovh_1h pt10">x {{item.amount}}</text>
				</view>-->

				<view class="danji_shulian" v-if="item.product_take_score">
					<text class="gm_ovh_1h pt10">积分变动</text>
					<text class="gm_ovh_1h pt10">{{item.product_take_score}}</text>
				</view>

			</view>

		</view>




		<view class="p_all bg_white df item" style="border-bottom: 1rpx solid #e5e5e5;" v-if="order_type_001 == 'xianmaishang'">
			<view class="d_name">{{current_shang_item.name}}</view>
			<view class="photo_name" v-for="(item,index) in cartlist" :key="index">
				<view class="cp_photo">
					<image :src="item.img"></image>
				</view>
				<view class="df_1">
					<view class="font_14 mt5" style="display: flex;justify-content: space-between;">
						<text style="">{{item.name}} <text style="color:#666;font-size:26rpx" v-if="item.spec_list.length">（{{item.spec_list}}）</text></text>
						<view>￥ {{item.price}}</view>
					</view>
					<view style="font-size: 26rpx;margin-top: 28rpx;">x {{item.count}}</view>
				</view>
			</view>
		</view>





		<view class="w100">
			<view class="a-dikou" :hidden="(wxa_order_hide_balance_zengsong==1) || (!coupon_list)">
				<view class="b-dikou">
					<view>优惠券</view>
				</view>
				<view class="c-dikou"  @tap="open_user_cooupon_list(8, 'bottom')">
					<span v-if="!coupon_list">无可用券</span>
					<span v-if="coupon_list">
						<span v-if="youhui_diko_price > 0" style="font-size:25rpx;">
						已抵扣<span class="c-dikou_amount">{{youhui_diko_price}}</span>元
						</span>
						<span v-else>
						可用{{coupon_list.length}}张
						</span>
					</span>
					
				</view>
			</view>

			<view class="a-dikou" :hidden="(wxa_order_hide_balance_zengsong==1) || (balance_zengsong == 0)">
				<view class="b-dikou">
					<view>赠款抵扣</view>
					<view class="c-dikou">使用￥<span class="c-dikou_amount">{{balance_zengsong_dikou}}</span> 可用￥{{balance_zengsong}}</view>
				</view>
				<switch class='d-dikou' :checked="isSwitch1" @change="switch1Change($event)" data-type="1" />
			</view>


			<view class="a-dikou" :hidden="(wxa_order_hide_balance==1) || (balance == 0)">
				<view class="b-dikou">
					<view>余额抵扣</view>
					<view class="c-dikou">使用￥<span class="c-dikou_amount">{{balance_dikou}}</span> 可用￥{{balance}}</view>
				</view>
				<switch class='d-dikou' :checked="isSwitch2" @change="switch1Change($event)" data-type="2" />
			</view>
			
			<view class="a-dikou" v-if="current_zitidian_data == 1">
				<view class="b-dikou">
					<view>商品自提</view>
				</view>
				<switch class='d-dikou' @change="switch2Change()" />
			</view>
			
			<view v-if="orderredpackge_list.code == 1" class="a-redpackets">
				<view class="b-redpackets">
					<view>订单红包</view>
				</view>
				<view class="a_redpackets_img_wrap" v-show="orderredpackge_picture_show" >
					<image :src="redpackge_cover_img_url"
										class="a_redpackets_img"
										style="position: absolute;"
										mode="widthFix"
										@click="get_redpackage_while_ordering" 
										disabled="true"></image>
					
				</view>
				 
				<view class="c-redpackets" @click="get_redpackage_picture_show">{{redpackge_text_tips}}</view>
			</view>

			<view class='p_all' style="padding-bottom:0;">
				<view class="heji_con">
					<text class="gm_ovh_1h pt10">合计</text>
					<text class="gm_ovh_1h pt10">¥ {{all_price}}</text>
				</view>
				
				
				<!-- <view class="heji_con" v-if='is_waimai == 1'> -->
				<view class="heji_con" v-if="traffic_price > 0">
					<text class="gm_ovh_1h pt10">运费</text>
					<text class="gm_ovh_1h pt10">¥ {{traffic_price}}</text>
				</view>
				
				
				<view class="heji_con">
					<text class="gm_ovh_1h red pt10">实付</text>
					<text class="gm_ovh_1h red pt10">¥ {{pay_price}}</text>
				</view>
			</view>

			
			<view class="p_all bg_white mt10 font_14">
				<b><text style="font-size:28rpx;margin-bottom: 20rpx;">备注</text></b>
				<textarea class="min_60" auto-height name="remark" placeholder="如有备注请填写" @input="remarkInput" :value="remark" rows="3" />
				</view>	
		
			<view class="p_all mt10">
				<view class="btnGreen">
					<!-- style="{width: '100%', color:frontColor, backgroundColor:btn_bg_color+' !important'}"  -->
					<button class="xx_pay_submit" type="default" id="xxPay" 
						:style="{background: btn_bg_color,color:frontColor}"
						formType="submit" @tap="createOrder">提交订单</button><!-- :disabled="btnDisabled" -->
				</view>
			</view>
		
		</view>
		
		<openAlert ref="openAlertZhongjiang"
			:AlertClass="AlertClassZhongjiang"
			:AlertPosition="AlertPositionZhongjiang">
			
			<view class="open_alert_abot_basic">
			
				<view class="youhuiquan_title"> 
					<view @tap="user_coupon_dikou_not_use()">不使用优惠券</view>
				</view>
				<view class="youhuiquan_list"> 
				
					<view class="stamp stamp04" v-for=" (item,idx) in coupon_list" :key="idx" >
						<view class="par"><p>{{item.coupon_item.name}}</p><span class="sign">￥</span><span>{{item.price}}</span><sub></sub>
						<p>订单满{{item.price2}}元</p></view>
						
						<view class="copy">{{item.youhui_memo_str}}<p>{{item.youhui_start_time}} ~ {{item.youhui_end_time}}</p>
						<a @tap="user_coupon_dikou_handle(item.dikou_amount, item.ucid)">立即使用</a></view>
						<!-- <i></i> -->
					</view>
									 
				</view>
			
			</view>
		
		</openAlert>
		
		
		
	</view>
</template>

<script>
	
	import locationapi from '../../common/locationapi.js'; 
	
	
	
	var util = require('../../common/util.js');
	var bmap = require('../../common/SDK/bmap-wx.js');
	var wxMarkerData = [];
	
	
	export default {
		data() {
			return {
				current_option :null,
				
				
				buylist:[],		//订单列表
				goodsPrice:0.0,	//商品合计价格
				sumPrice:0.0,	//用户付款价格
				freight:12.00,	//运费
				note:'',		//备注
				int:1200,		//抵扣积分
				deduction:0,	//抵扣价格
				//recinfo:'',
				address:'',
				
				
				itemData:{},
				userId:0,
				paytype:'weixin',//0线下1微信
				remark:'',
				productid:[],
				addrId:0,//收货地址//测试--
				btnDisabled:false,
				productData:[],
				orderProduct:[],
				total:0,
				vprice:0,
				vid:0,
				addemt:0,//为0 的时候显示请去添加地址   1的时候显示的是已经设置过的地址
				vou:[],
				orderid:{},
				amount:1,
				cartId:'321',
				
				balance_zengsong_dikou: 0,
				balance_dikou: 0,
				
				wxa_order_queren_hide_address:0,
				wxa_order_hide_coupon:'',
				wxa_order_hide_balance_zengsong:'',
				wxa_order_hide_balance:'',
				action:'direct_buy',

				isSwitch1:false,
				isSwitch2:false,
				
				//用户的余额和赠款余额
				balance_zengsong:0,
				balance:0,
				
				
				all_price: null,  // ！！！！！！!!!!!!!
				
				single_price:0,	//指定商品的单价
				traffic_price:0,
				pay_price:'',
				util:'',
				// recinfo:{id:1,name:"大黑哥",head:"大",tel:"18816881688",address:{region:{"label":"广东省-深圳市-福田区","value":[18,2,1],"cityCode":"440304"},detailed:'深南大道1111号无名摩登大厦6楼A2'},isDefault:true}
				order_address_detail: {
					name:'',
					mobile:'',
					province_name:'',
					city_name:'',
					district_name:'',
					address:'',
				},
				
				
				
				
				
				cartlist: [],
				
				frontColor:'#ffffff',
				btn_bg_color: '#1AAD19',
				
				order_type_001:'shopmall',
				
				order_type_001_xianmaishang_data:null,
				//外卖相关的参数，都放到 order_type_001_xianmaishang_data
				//is_waimai: 0,
				//waimai_buyer_longitude:'121.524494',	//经度
				//waimai_buyer_latitude:'31.238075',	//纬度
				//xianmaishangid: '',
				//current_shang_item:{'name':''},
				//shang_detail:[],
				
				
				current_userinfo:null,
				
				
				orderredpackge_picture_show: false,
				
				orderredpackge_list:[],
				redpackge_lingqu_score:0,
				is_ordering_redpackge_click:false,
				redpackge_text_tips:'先领红包再下单',
				redpackge_cover_img_url:'https://yanyubao.tseo.cn/Tpl/Home/plugin/yanyubao/images/asd23.png',
				
				//2020.12.3. 爱拼团的参数
				cuxiao_huodong:null,
				order_option_new_list:'',	//可能追加的订单的选项
				
				//======= 2020.12.11  优惠券相关 Begin ===========
				//优惠券相关的弹层
				AlertClassZhongjiang: 0,
				AlertPositionZhongjiang: '',
				
				//2020.12.11. 优惠券列表
				coupon_list:null,
				
				//优惠券抵扣金额
				youhui_diko_price:0,
				current_ucid:0,
				//================= End =======================
				
				
				//2021.6.19. 不登陆直接下单的情况
				no_user_login:0,
				no_user_login_ext_data_str:'',
				
				//2021.7.30. 扩展 extraData 字段
				extraData:null,
				
				
				
				//2021.11.15
				zitidian_address:false,
				current_zitidian_data:0,
				current_zitidian_list:null,
				paixu_shanglist:null,
				showShangModal:false,
				
			};
		},
		
		/**
		 * 预览订单、创建订单，准备支付
		 * @param {Object} options
		 * 
		 * 举例：
		 * 爱拼购：  /pages/order/pay?productid=12345&cuxiao_huodong=aipingou
		 * 多人拼团： /pages/order/pay?productid=12345&cuxiao_huodong=duorenpintuan
		 * 
		 * 主要参数如下：
		 * 

productid 两种情况：（1）直接一个数组，productid；（2）不是直接的数值，而是一个数组。

amount  选填，购买的数量

continue_to_pay 选填，如果有值且为1，则使用缓存的options参数。
total/all_price 选填，合计支付的金额，如果有，以这个价格为准，单位：元
single_price 选填，商品的单价。如果指定单价，务必设置参数amount

order_type_001
	shopmall （默认，可以不传）
		action 默认不传，支持action=direct_buy
		productid 商品ID
		[2021.9.14.]
		product_name （可选） 商品名称
		product_picture （可选） 商品图片
		
	xianmaishang 实体商家的订单
		xianmaishangid 商家的ID
		is_waimai 是否外卖订单，默认不传，支持 1 代表是外卖订单		
ucid 优惠券	
price_type 保留参数
waimai_list_ + xianmaishangid 读取外卖购物车缓存
cart_list_ + xianmaishangid 读取堂食购物车缓存


[2021.9.9. 附带订单选项的请求示例]

          var order_option_key_and_value = [];
          order_option_key_and_value.push({'key':'jianghan_orderno', 'value':orderno});

          var order_option_key_and_value_str = encodeURIComponent(JSON.stringify(order_option_key_and_value));

          new_url = '/pages/order/pay?action=direct_buy&amount=1&productid='+data.buy_url_productid;
          new_url += '&order_option_key_and_value_str='+order_option_key_and_value_str;
          new_url += '&buyer_memo=' + '代续费订单：'+orderno;
[2021.9.14. 附带商品名称和图片的示例]
          new_url += '&product_name=' + '这是商品名称';
		  new_url += '&product_picture=' + 'http://www.dfdsf.com/aaa.jpg';


//2020.12.3. 爱拼团的参数
cuxiao_huodong == aipingou
tuansn = 参团的编号，如果没有，则代表新开团

//2021.6.19. 不登陆直接下单
no_user_login = 1	
no_user_login_ext_data_str = '{}'

//2021.7.30. 任何附带的其他信息
extraData = 'xxxxxxxxxxxxxxx'		
		
		 * 
		 */
		onLoad(options) {
			//var aaa = 1001;
			//console.log('aaa==>>'+util.sprintf("%0.2f", aaa/100));
			//console.log('aaa==>>'+util.sprintf("%0.2f", aaa/100));
			
			var that = this;
			
			console.log('order/pay 参数：', options);
			
			
			that.current_option = options;
					
					
			
			var last_url = '/pages/order/pay';
			
			var arr = Object.keys(options);
			var options_len = arr.length;
			
			if (options_len > 0){
				var params_str = '';
			
				for(var key in options){
					params_str += key+'='+options[key]+'&';
				}
				params_str = params_str.substr(0, params_str.length - 1);
			
				last_url = last_url+'?'+params_str;
			}
			
			that.last_url = last_url;
			var userInfo = this.abotapi.get_user_info();
			
			//2021.6.19. 有例外的情况，不需要用户登录也可以下单
			var no_user_login = options.no_user_login;
			
			if( (!userInfo || !userInfo.userid) && (no_user_login != 1) ){
				
				
				that.abotapi.goto_user_login(last_url, 'normal');
				return;
			}
				
			//是否使用上一次没有支付完成的参数
			if(options.continue_to_pay && (options.continue_to_pay == 1)){
				options = JSON.parse(uni.getStorageSync('last_order_pay_option'));
			}
			else{
				uni.setStorageSync('last_order_pay_option', JSON.stringify(options));
			}
			
			that.current_userinfo = userInfo;
			
			console.log('订单确认页面：用户登录信息：',userInfo);
			
			uni.showLoading({
				title: '加载中...',
			})
			
			that.productid = options.productid;
			
			if(options.amount){
				that.amount = options.amount;
			}
			
			if(options.order_type_001){
				that.order_type_001 = options.order_type_001;
			}
			
			//根据不同的类型带的参数
			if(that.order_type_001 == 'shopmall'){
				if(options.productid){
					
					//that.productid = options.productid;
					
					// #ifdef H5
					options.productid = encodeURIComponent(options.productid);
					// #endif
					
					// #ifdef APP-PLUS
					options.productid = encodeURIComponent(options.productid);
					// #endif
				}
			}
			else if(that.order_type_001 == 'xianmaishang'){
				if(!that.order_type_001_xianmaishang_data){
					that.order_type_001_xianmaishang_data = {}
				}
				
				that.order_type_001_xianmaishang_data.xianmaishangid = options.xianmaishangid;
				if(options.is_waimai){
					that.order_type_001_xianmaishang_data.is_waimai = options.is_waimai;
				}
				if(options.desk_no){
					that.order_type_001_xianmaishang_data.desk_no = options.desk_no;
				}
				if(options.scan_qrcode_no){
					that.order_type_001_xianmaishang_data.scan_qrcode_no = options.scan_qrcode_no;
				}
				if(options.spec_business_type){
					that.order_type_001_xianmaishang_data.spec_business_type = options.spec_business_type;
				}
			}
			
			
			//必带的参数	
			console.log('options.all_price ===>>> ', options.all_price);
				
			if(!(options.total === null || options.total === undefined  || options.total === '')) {			
				that.all_price = options.total;				
			}
			
			//console.log('that.all_price ===>>> ', options.total);
			//console.log('that.all_price ===>>> ', that.all_price);
			
			
			if(options.all_price) {
				that.all_price = options.all_price;				
			}
			
			
			//如果指定了单价
			if(options.single_price) {
				that.single_price = options.single_price;
				that.all_price =that.single_price * options.amount;
			}
			
			that.pay_price = that.all_price;
			that.pay_price_origin = that.all_price;
			that.address_total = that.all_price;
			
			console.log('that.all_price', that.all_price)
					
			if (options.cart_count) {				
				that.cart_count = options.cart_count				
			}
			
			
			
			if (options.ucid) {
				that.current_ucid = options.ucid
				
				//options = JSON.parse(uni.getStorageSync("cache_options"));
				
			}else{
				//uni.setStorageSync("cache_options", JSON.stringify(options));
			}
			
			if (options.price_type){
				that.price_type = options.price_type
			}
			
			
			//2020.12.3. 爱拼团的参数
			if(options.cuxiao_huodong && (options.cuxiao_huodong == 'aipingou')){
				that.cuxiao_huodong = options.cuxiao_huodong;
				
				that.order_option_new_list = [];
				
				//增加一个选项：标志位，代表这个订单需要调用爱拼购的规则，准备在订单order_add成功之后，插入到order option中
				that.order_option_new_list.push(
					{ "key": "aipingou_tuan_flag", "value": '1' },);
				
				if(options.tuansn){
					//增加一个选项：代表要参加这个团
					that.order_option_new_list.push(
						{ "key": "aipingou_tuan_tuansn", "value": options.tuansn },);
				}
								
				console.log('爱拼购订单，准备增加标记记录', that.order_option_new_list);
				
				//2021.1.1. 指定商品价格，已经在 Line 418 “if(options.total) {”做了判断。
				///if(options.total){
				//	that.all_price = options.total;		
				//	console.log('爱拼购订单，指定价格', that.all_price);
				//}
				
									
									
				
				
				
			}
			else if(options.cuxiao_huodong && (options.cuxiao_huodong == 'duorenpintuan')){
				//多人拼团
				that.cuxiao_huodong = options.cuxiao_huodong;
			}
			//=============== End =================
			
			
			
			
			
			
			if(options.action){
				that.action = options.action;
				
				console.log('指定order_queren的action：===>>>'+that.action);
			}
			else{
				console.log('使用默认order_queren的action：===>>>'+that.action);
			}
			
			
			
			if (options.paysuccess_url && (typeof(options.paysuccess_url) == 'string') ){
				uni.setStorageSync('paysuccess_url', decodeURIComponent(options.paysuccess_url));
				
				console.log('uni.setStorageSync paysuccess_url==>>>', uni.getStorageSync('paysuccess_url'));
			}
			else{
				console.log('uni.setStorageSync paysuccess_url 失败==>>>', options.paysuccess_url);
				
				uni.removeStorageSync('paysuccess_url');
			}
			
			
			//2021.6.19. 免登陆下单
			if(options.no_user_login){
				that.no_user_login = options.no_user_login;
				that.no_user_login_ext_data_str = decodeURIComponent(options.no_user_login_ext_data_str);
				
				console.log('本次下单免登陆，参数为：'+ that.no_user_login_ext_data_str);
			}
			
			//2021.7.30. 扩展出 extraData字段
			if(options.extraData){
				that.extraData = options.extraData;
				
				console.log('本次下单有扩展字段：' + that.extraData);
			}
			
			//this.get_zitidian_list();
			locationapi.get_location(that, that.cx_paixu_shang_list);
			//必须放在最后，否则读取不到userinfo信息！！！！！
			this.abotapi.set_option_list_str(this, this.callback_function);
			
			
		},
		onShow() {
			
			
			setTimeout(function () {
				uni.hideLoading()
			}, 2000);
			
			
			// uni.getStorage({
			// 	key:'selectAddress',
			// 	success: (e) => {
			// 		this.recinfo = e.data;
			// 		console.log('this.recinfo',this.recinfo);
			// 		uni.removeStorage({
			// 			key:'selectAddress'
			// 		})
			// 	}
			// })
			
		

		},
		onHide() {
			
		},
		// onBackPress() {
		// 	//页面后退时候，清除订单信息
		// 	this.clearOrder();
		// },
		filters: {
			toFixed:function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		methods: {
			callback_function:function(that, cb_params){
				
				if(!cb_params){
					return;
				}
				
				console.log('cb_params====', cb_params);
				
				//====1、更新界面的颜色
				if(that.abotapi.globalData.navigationBarBackgroundColor_fixed == 1){
					
					console.log('that.abotapi.globalData.navigationBar_bg_color==>>', that.abotapi.globalData.navigationBar_bg_color)
					
					/*uni.setNavigationBarColor({
						backgroundColor:that.abotapi.globalData.navigationBar_bg_color,
						frontColor:that.abotapi.globalData.navigationBar_font_color,
					})*/
					
					that.frontColor = that.abotapi.globalData.navigationBar_font_color;
					that.btn_bg_color = that.abotapi.globalData.navigationBar_bg_color;
					
				}
				else{
					/*uni.setNavigationBarColor({
						backgroundColor:cb_params.wxa_shop_nav_bg_color,
						frontColor:cb_params.wxa_shop_nav_font_color,
					})*/
					
					console.log('cb_params==>',cb_params.wxa_shop_nav_font_color);
					
					that.frontColor = cb_params.wxa_shop_nav_font_color;
					that.btn_bg_color = cb_params.wxa_shop_nav_bg_color;
				}
				
				
				//====2、其他的设置选项：商品列表风格、头条图标等等
				if (cb_params.wxa_product_list_style) {this.wxa_product_list_style = cb_params.wxa_product_list_style; }
				if (cb_params.wxa_show_kucun_in_list) {this.wxa_show_kucun_in_list = cb_params.wxa_show_kucun_in_list; }
				if (cb_params.wxa_hidden_product_list) {this.wxa_hidden_product_list = cb_params.wxa_hidden_product_list; }
				if (cb_params.wxa_kefu_button_type) {   this.wxa_kefu_button_type = cb_params.wxa_kefu_button_type; }
				if (cb_params.wxa_kefu_button_icon) {   this.wxa_kefu_button_icon = cb_params.wxa_kefu_button_icon; }
				if (cb_params.wxa_kefu_mobile_num) {this.wxa_kefu_mobile_num = cb_params.wxa_kefu_mobile_num; }
				if (cb_params.wxa_kefu_form_url) {this.wxa_kefu_form_url = cb_params.wxa_kefu_form_url; }
				if (cb_params.wxa_order_hide_coupon) {this.wxa_order_hide_coupon = cb_params.wxa_order_hide_coupon; }
				if (cb_params.wxa_order_hide_balance_zengsong) {this.wxa_order_hide_balance_zengsong = cb_params.wxa_order_hide_balance_zengsong; }
				if (cb_params.wxa_order_hide_balance) {this.wxa_order_hide_balance = cb_params.wxa_order_hide_balance; }
				if (!cb_params.wxa_order_queren_hide_address){cb_params.wxa_order_queren_hide_address = 0;}
				
				that.wxa_order_queren_hide_address = cb_params.wxa_order_queren_hide_address;
				
				this.__loadOrderDetail();
			
			},
			
			//比较距离获取配送费
			
			compare_distance:function(){
			
			    var rider_option = this.rider_set_data;
			    console.log('=>>>>11222', rider_option);
			    var distance = (this.distance) / 1000;
			    
			    if (distance <= rider_option.min_km){
					
					this.waimai_rmb = rider_option.min_rmb;
					this.btnDisabled = false;
			      
			      
			    } else if (distance > rider_option.min_km && distance <= rider_option.max_km){
			      
				  this.waimai_rmb = rider_option.max_rmb;
				  this.btnDisabled = false;
			      
			    } else if (distance > rider_option.max_km){
					console.log('超出配送范围111111')
					uni.showModal({
						title:'超出配送范围!',
						showCancel:false,
						success() {
							console.log('点击确定或者取消')
						},
						fail() {
							console.log('失败')
						}
					})
			      // uni.showToast({
			      //   title: '超出配送范围！',
			      //   duration: 4000
			      // });
			      this.waimai_rmb = 0;
				  this.btnDisabled = true;  
			      
			    }
			    
			},
			
			__loadOrderDetail:function(){
				var that = this;
				
				if(that.order_type_001 == 'shopmall'){
					this.__load_order_detail_shopmall();
				}
				else if(that.order_type_001 == 'xianmaishang'){
					
					that.abotapi.abotRequest({
					  url: that.abotapi.globalData.yanyubao_server_url + 'openapi/XianmaiShangData/get_shang_detail',
					  data: {
					     sellerid:that.abotapi.get_sellerid(),
						 xianmai_shangid: that.order_type_001_xianmaishang_data.xianmaishangid,
					  },
					  success: function (res) {	
						console.log('res===----', res.data.data);
					    if (res.data.code == 1) {
					      that.order_type_001_xianmaishang_data.shang_detail = res.data.data;
						  console.log('that.shang_detail===----',that.order_type_001_xianmaishang_data.shang_detail);
					    } 	
					  }
					});
					
					
					
					that.__load_order_detail_xianmaishang();
				}
		
			},
			
			__load_order_detail_xianmaishang:function(){
				var that = this; 
				
				var userInfo = that.current_userinfo;
				
				console.log('userInfo====>?', userInfo);
				
				if(userInfo){
					console.log('请求余额和赠款信息');
					
					that.abotapi.abotRequest({
					  url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=get_user_info',
					  data: {
					    sellerid: that.abotapi.get_sellerid(),
					    checkstr: userInfo.checkstr,
					    userid: userInfo.userid
					  },
					  success: function (res) {		
						  
						console.log("this_get_user_info",res);
						
					    if (res.data.code == 1) {
					      that.balance = res.data.data.balance;
					      that.balance_zengsong = res.data.data.balance_zengsong;
					    } 	
					  }
					});
					
				}
				else{
					console.log('没有用户登录信息，不请求余额和赠款信息');
				}
				
				
				console.log('that.xianmaishangid===>>>>', that.order_type_001_xianmaishang_data.xianmaishangid)

				if(that.order_type_001_xianmaishang_data.is_waimai == 1){
				  that.cartlist = uni.getStorageSync('waimai_list_' + that.order_type_001_xianmaishang_data.xianmaishangid);
				}else{
				  that.cartlist = uni.getStorageSync('cart_list_' + that.order_type_001_xianmaishang_data.xianmaishangid);
				}
				
				console.log('that.cartlist====>>>', that.cartlist);
				
				if(that.order_type_001_xianmaishang_data.is_waimai == 1){
					that.__load_order_detail_xianmaishang_waimai();
					
					//外卖配送订单，强制显示配送地址
					that.wxa_order_queren_hide_address = 0;
				}
				else{
					//到店自提订单，强制隐藏配送地址
					that.wxa_order_queren_hide_address = 1;
				}
				
			},
			__load_order_detail_shopmall:function(){
				var that = this;
				
				var userInfo = that.current_userinfo;
				console.log('这是userid====',userInfo);
				
				if(!userInfo){
					uni.showToast({
						title:'登录信息异常'
					})
					return;
				}
				
				var data_params = {};
				
				console.log('购买方式====>>>', that.action);
				
				if (that.action == "direct_buy") {
							
					data_params = {
						productid: that.productid,
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						action: that.action,
						amount: that.amount,
						sellerid: that.abotapi.get_sellerid(),
					};
					
					if(that.current_option.product_name){
						data_params.product_name = that.current_option.product_name;
					}
					if(that.current_option.product_picture){
						data_params.product_picture = encodeURIComponent(that.current_option.product_picture);
					}
					
				} 
				else {
					data_params = {
						productid: that.productid,
						userid: userInfo.userid,
						checkstr: userInfo.checkstr,
						sellerid: that.abotapi.get_sellerid(),
					}
				}
				
				//如果指定了商品的价格
				if( (that.all_price !== null) && (that.all_price >= 0) ){
					data_params.all_price = that.all_price
				}
				
				if(that.single_price > 0){
					data_params.single_price = that.single_price
				}
				
				
				if (that.current_ucid){
					data_params.ucid = that.current_ucid
				}
				
				if(that.cuxiao_huodong){
					data_params.cuxiao_type = that.cuxiao_huodong;
				}
						
								  
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_queren',
					data: data_params,
					success: function (res) {
						console.log("ORDER_QUEREN_res",res);
						
						var code = res.data.code;
						
						if (code == 1) {
							
							var order_address_detail = res.data.address;
							
							//判断是否有优惠券列表，再把优惠券时间从时间戳形式转化为时间正常形式，把优惠价格和抵扣价格保留两位小数把分化成元。
							if(res.data.coupon_list){
								that.coupon_list = res.data.coupon_list
								
								for(var i=0; i<that.coupon_list.length; i++){
									that.coupon_list[i].youhui_start_time = util.formatTime(new Date(that.coupon_list[i].expiretime01 * 1000));
									that.coupon_list[i].youhui_end_time = util.formatTime(new Date(that.coupon_list[i].expiretime02 * 1000));
									
									//满 100.00
									that.coupon_list[i].price2 = util.sprintf("%0.2f", that.coupon_list[i].coupon_item.price2/100);	
																	
									//减 10.00
									if(that.coupon_list[i].coupon_item.coupon_dikou_type == 0){
										//金额抵减
										that.coupon_list[i].price = util.sprintf("%0.2f", that.coupon_list[i].coupon_item.price/100);
									}
									else if(that.coupon_list[i].coupon_item.coupon_dikou_type == 1){
										//折扣抵减
										that.coupon_list[i].price = '' + that.coupon_list[i].coupon_item.price + '%';
									}
									
									//实际抵扣 10.00
									that.coupon_list[i].dikou_amount = util.sprintf("%0.2f", that.coupon_list[i].coupon_item.dikou_amount/100);
									
									
									if(that.coupon_list[i].coupon_item.productid && (that.coupon_list[i].coupon_item.productid != 0)){
										that.coupon_list[i].youhui_memo_str = '限定商品可以使用';
									}
									else{
										that.coupon_list[i].youhui_memo_str = '所有商品均可使用';
									}
									
								}
								//console.log('order_address_detail==>',coupon_list);
							}
							
						
							if (!order_address_detail) {
								that.addemt = 1
								console.log('that.addemt = 1');
							}else {
								that.order_address_detail = order_address_detail;
								that.addemt = 0
								console.log('that.addemt = 0');
							}
						
					
							that.all_price = res.data.all_price;
							that.pay_price = res.data.pay_price;
							that.pay_price_origin = res.data.pay_price;
							
							
						
							that.order_address_detail = order_address_detail;
							that.productData = res.data.orderlist;
							
							console.log("that.productData==>>>",that.productData);
							
							
							that.traffic_price = res.data.traffic_price;
							that.all_product_take_score = res.data.all_product_take_score;
							that.balance = res.data.balance;
							
							console.log('wwwwwwwwwwwwwww',that.balance);
							
							that.balance_zengsong = res.data.balance_zengsong;
							
							
							//2021.8.7. 订单是否不需要填写收货地址
							if(res.data.hide_address && (res.data.hide_address == 1)){
								that.wxa_order_queren_hide_address = 1;
							}
							
												
							
							
							//if (res.data.user_coupon_item){
							//	that.user_coupon_item = res.data.user_coupon_item
							//}
						}
						else if(code == 2) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 2000,
							});
						}
						else if(code == -1){
							console.log('登录超时！！！！！！！！！！！');
							
							that.abotapi.del_user_info();
							
							that.abotapi.goto_user_login(that.last_url, 'normal');
							
							return;
						}
						else {
							uni.showModal({
								title: '提示',
								content: res.data.msg,
								showCancel: 'false'
							})            
						}
					},
					fail: function () {
						// fail
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					}
				});
				
				//2020.11.2. 检查是否启用了订单中红包的功能模块
				
				
				var post_data = {
						sellerid:that.abotapi.get_sellerid(),
					}
					
				if (userInfo) {
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				}
					
					
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/OrderingRedpackageData/get_setting',
					data: post_data,
					success: function (res) {
						
						
						if(res.data.code != 1){
							return;
						}
						
						that.orderredpackge_list = res.data;
						
						that.redpackge_text_tips = res.data.data.tips_text;
						console.log("ORDER_QUEREN_res===code",that.redpackge_text_tips);
						
						if(res.data.data.redpackge_cover_img_url){
							that.redpackge_cover_img_url = res.data.data.redpackge_cover_img_url;
						}
						
						
						
					},
					fail: function () {
						// fail
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					}
				});
				
			},
			//加载更详细的外卖订单的信息
			__load_order_detail_xianmaishang_waimai:function(){
				var that = this;
				
				//外卖订单，重新计算总价
				var userInfo = that.current_userinfo;	
				console.log("longitude=====>>>", 'longitude_' + that.order_type_001_xianmaishang_data.xianmaishangid + '_latitude');
				// var longitude_latitude = wx.getStorageInfoSync('longitude_' + options.xianmaishangid + '_latitude');
							
				var get_str = "shang_" + that.order_type_001_xianmaishang_data.xianmaishangid + "_detail";
				var shang_detail = uni.getStorageSync(get_str);
				
				console.log('get_str===', get_str)
				console.log('shang_detail===', shang_detail)
							
				that.order_type_001_xianmaishang_data.current_shang_item = shang_detail
						
							     
				that.abotapi.abotRequest({
				  url: that.abotapi.globalData.o2owaimai_server_url + 'openapi/PublicData/get_option_list',
				  data: {
				    merchantid: that.order_type_001_xianmaishang_data.xianmaishangid,
				  },
				  success: function (res) {
				    var data = res.data;
				    console.log('ffdaaeeqq===', res);
				    if (data.code == 1) {
						that.rider_set_data = data.data
				    }
				
							
				    var thats = that;
				    var util = util;
				    thats.abotapi.abotRequest({
							
				      url: thats.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=address_list',
				      data: {
				        checkstr: userInfo.checkstr,
				        userid: userInfo.userid,
				        sellerid: thats.abotapi.get_sellerid()
				      },
				      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
				      header: {// 设置请求的 header
				        'Content-Type': 'application/x-www-form-urlencoded'
				      },
							
				      success: function (res) {
				        console.log('gggggggggggggg==9999', res)
				        
							
				        uni.hideLoading();
				        // success
				        var code = res.data.code
				       
				        var address = [];
						var addressList = res.data.addressList;
				        if (code == 2) {
				          console.log('gggggggggggggg==5', !address)
				          console.log('gggggggggggggg==6', address)
				          if (!addressList) {
												
							thats.addemt = 1;
				            
				          }
				        } else {
				          thats.addemt = 0;
						  
						  thats.order_address_detail = addressList[0]; //显示地址信息

						  console.log('gggggggggggggg==8888', res)
						  console.log('addressList==77777', thats.order_address_detail)
											
				        }
							
				        if (thats.addemt == 0) {
							
							for (var i = 0; i < addressList.length; i++) {
								if (addressList[i].is_default == 1) {
								var address = addressList[i];
								break;
				            }
				          }
							
							
				          if (address.length == 0) {
												
								thats.addemt = 1;
								var price = Number(thats.all_price).toFixed(2);
								console.log('price==============', price)
													
													
								thats.caiping_all_price = price;
								thats.traffic_price = '0.00';
								thats.all_price = price;
								thats.pay_price = price;
								thats.pay_price_origin = price;
								thats.yajin = 0.00;
								return;
				
				          }else{
				            thats.addemt = 0;
											 
				          }
											
						  thats.address = address;
						  
				          //====== 给百度地图提供的函数=========
						  //===== H5版本 =============
						  var baidu_map_h5_handle = function() {
								//如果搜索的有结果
								if(local.getResults() != undefined) {
									map.clearOverlays(); //清除地图上所有覆盖物
									if(local.getResults().getPoi(0)) {
										point = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
										map.centerAndZoom(point, 18);
										marker = new BMap.Marker(point); // 创建标注
										map.addOverlay(marker); // 将标注添加到地图中
										marker.enableDragging(); // 可拖拽
										//alert("当前定位经度:"+point.lng+"纬度:"+point.lat);
										
										$('#longitude').attr('value', point.lng);
										$('#latitude').attr('value', point.lat);
										
									} else {
										alert("未匹配到地点!可拖动地图上的红色图标到精确位置");
									}
								} else {
									alert("未找到搜索结果")
								}
							}
							
						  //===== 给小程序和APP提供 ====
				          var baidu_map_fail = function (data) {
							
				            console.log('baidu map geocoding fail ===>>>>', data);
							
				          };
				          var baidu_map_success = function (data) {
							
							console.log('data==',data);
				            wxMarkerData = data.wxMarkerData;
											  
							thats.makers = wxMarkerData;
							
							//收货地址的经纬度坐标
							thats.latitude = wxMarkerData[0].latitude;
							thats.longitude = wxMarkerData[0].longitude;
							
							if(!thats.order_type_001_xianmaishang_data){
								thats.order_type_001_xianmaishang_data = {};
							}
							
							thats.order_type_001_xianmaishang_data.waimai_buyer_longitude = wxMarkerData[0].longitude;
							thats.order_type_001_xianmaishang_data.waimai_buyer_latitude = wxMarkerData[0].latitude;
							
							console.log('888999sss', wxMarkerData[0]);
							
							console.log('shang_detail====', shang_detail);
							
				            var distance = thats.abotapi.getDistance(shang_detail.latitude, shang_detail.longitude, thats.latitude, thats.longitude);
				            
				            console.log('distance====（单位：米）', distance)
				          
											  
							thats.distance = distance
						
							
				            thats.compare_distance();
							
				            //计算配送费
				            console.log('traffic_price=ffffff11111==>???', thats.waimai_rmb);
							
				            if (!thats.waimai_rmb) {
								console.log('最终配送费2222');
								var waimai_rmb = thats.rider_set_data['min_rmb'];
				            } else {
								console.log('最终配送费333');
								var waimai_rmb = Number(thats.waimai_rmb).toFixed(2);
				            }
							
							
				            var traffic_price = waimai_rmb;
							
							
							
				            var price = Number(thats.all_price).toFixed(2);
							
							
				            var all_price = Number(price) + Number(waimai_rmb);
				            var pay_price = Number(price) + Number(waimai_rmb);
							
				            console.log('price===>???', price);
				            console.log('traffic_price=11111==>???', traffic_price);
				            console.log('waimai_rmb===>???', waimai_rmb);
				            console.log('all_price===>???', all_price);
				            console.log('pay_price===>???', pay_price);
				
							thats.caiping_all_price = price;
							thats.traffic_price = Number(traffic_price).toFixed(2);
							thats.all_price = all_price.toFixed(2);
							thats.pay_price = pay_price.toFixed(2);
							thats.pay_price_origin = parseFloat(price);
							thats.yajin = 0.00;
							console.log('最终配送费', thats.traffic_price);
							console.log('最终配送费', traffic_price);
				          }
						  
						  
						  var address = thats.address.province_name + thats.address.city_name + thats.address.district_name + thats.address.address;
						  												
						  console.log('address===',address);
						  
						  
						  //#ifdef H5
						  
						  var local, point, marker = null;
						  local = new BMap.LocalSearch(map, { //智能搜索
						  	onSearchComplete: baidu_map_h5_handle
						  });
						  						 
						  local.search(value);
						   
						  //#endif
						  
						  //#ifndef H5
						  // 新建百度地图对象
						  var BMap = new bmap.BMapWX({
						    ak: thats.abotapi.globalData.baidu_map_ak
						  });
								
							// 发起geocoding检索请求 
						  BMap.geocoding({
								address: address,
								fail: baidu_map_fail,
								success: baidu_map_success,
								iconPath: '../../img/marker_red.png',
								iconTapPath: '../../img/marker_red.png'
							});
							//#endif
							
							
							    
							
							
				        } else {
							
				          var price = Number(thats.all_price).toFixed(2);
				          console.log('price==============', price)
											
											
						thats.caiping_all_price = price;
						thats.traffic_price = '0.00';
						thats.all_price = price;
						thats.pay_price = price;
						thats.pay_price_origin = price;
						thats.yajin = 0.00;
				         
				        }
							
							
				      },
				      fail: function () {
				        // fail
				        uni.showToast({
				          title: '网络异常！',
				          duration: 2000
				        });
				      }
				    })
							
							
							
							
							
							
				  }
				})
				
				
			},
			
			
			logout: function () {
			    this.abotapi.del_user_info();
			
			    var sellerid = this.abotapi.get_sellerid();
			    if (typeof (sellerid) != 'undefined') {
					if (sellerid.length > 15) {
						uni.clearStorageSync();
						console.log('清空完成，sellerid：' + this.abotapi.get_sellerid());
					}
			    }
			
				uni.clearStorageSync();
			
				this.abotapi.goto_user_login(this.last_url, 'normal');
			},
			  
			
			remarkInput:function(e){
				this.remark = e.detail.value
			},
			
			
			//获取用户地址
			get_address_list:function(){
				var that = this;
				var userInfo = this.abotapi.get_user_info();
				that.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=address_list',
					data: {
						checkstr: userInfo.checkstr,
				        userid:userInfo.userid,
				        sellerid: this.abotapi.get_sellerid()
					},
					method: 'POST', 
					header: {
						'Content-Type':  'application/x-www-form-urlencoded'
					},
				      
					success: function (res) {
						console.log('res',res);
						if(res.data.code == 1){
							that.address = res.data.addressList[0];
							// if(that.address[index].is_default == 1){
							// 	that.address = that.address[index];
							// }
						}
					}
				})
			},
			
			
			//微信支付
			createProductOrderByWX:function(e){
				this.paytype = 'weixin'
				this.createProductOrder();
			},
			
			  //线下支付
			createProductOrderByXX:function(e){
				this.paytype = 'cash'
			    uni.showToast({
					title: "线下支付开通中，敬请期待!",
					duration: 3000
				});
			    return false;
			    this.createProductOrder();
			},
			
			
			createOrder:function(){
				console.log('开始下单');
				
				if(this.btnDisabled){
					uni.showModal({
						title:'超出配送范围',
						showCancel:false,
					})
					return;
				}
				
				// this.btnDisabled = true
				
			    var that = this;
				var userInfo = that.current_userinfo;
				
				
				if (that.wxa_order_queren_hide_address != 1){
					if (!that.order_address_detail || (!that.order_address_detail.addressid)){
						uni.showModal({
							title: '提示',
							content: '请填写收货地址',
							showCancel:false,
							success(res) {
								that.btnDisabled = false
							}
						})
							
						return;
					}
				}
				
				var data_orderAdd = {}
				
				if(that.order_type_001 == 'shopmall'){
					data_orderAdd = {
								
						buyer_memo: that.remark,
						all_price: that.all_price,
						
						//userid: userInfo.userid,
						//checkstr: userInfo.checkstr,
						
						traffic_price: that.traffic_price,
						pay_price: that.pay_price,
						sellerid: that.abotapi.get_sellerid(),
						payment: 3
					};
					
					
					if (that.all_price == 'undefined'){
						uni.showModal({
							title: '提示',
							content: '参数错误，请重新下单！',
							showCancel: 'false'
						})
						return;
					}
								
					if (that.all_product_take_score){
						data_orderAdd.all_product_take_score = that.all_product_take_score
					}
								
					if(that.current_ucid){
						data_orderAdd.ucid = that.current_ucid;
						//data_orderAdd.coupon_price = that.user_coupon_item.price;
					}
					
					//2020.12.30. 增加促销活动这个参数
					if(that.cuxiao_huodong){
						data_orderAdd.cuxiao_type = that.cuxiao_huodong;
					}
					
					//2021.7.30. 扩展 extraData 字段
					if(that.extraData){
						data_orderAdd.extraData = that.extraData;
					}
					
				}
				else if(that.order_type_001 == 'xianmaishang'){
					if(that.addemt == 1){
					  uni.showToast({
					    title: '请添加收货地址',
					    duration: 2000,
					    icon: 'none'
					  })
					  return;
					}
					
					data_orderAdd = {
										
					  buyer_memo: that.remark,
					  all_price: that.all_price,
					  
					  //userid: userInfo.userid,
					  //checkstr: userInfo.checkstr,
					  
					  area_province: that.order_address_detail.area_province,
					  area_city: that.order_address_detail.area_city,
					  area_district: that.order_address_detail.area_district,
					  //traffic_price: 0,//that.data.traffic_price,
					  
					  pay_price: that.pay_price,
					  sellerid: that.abotapi.get_sellerid(),
					  // all_product_take_score: that.data.all_product_take_score,
					  payment: 3,
					  direct_add_new:1,
					  traffic_price: this.waimai_rmb,
					};
										
										
					if(that.current_ucid){
					  data_orderAdd.ucid = that.data.current_ucid;
					  //data_orderAdd.coupon_price = that.data.user_coupon_item.price;
					}
										
					
				}
				
				//如果用户登录且不是强制要求不登陆
				if(userInfo && (that.no_user_login != 1)){
					data_orderAdd.userid = userInfo.userid;
					data_orderAdd.checkstr = userInfo.checkstr;
				}
				
				if(that.no_user_login == 1){
					data_orderAdd.no_user_login = 1;
					data_orderAdd.no_user_login_ext_data_str = that.no_user_login_ext_data_str;
				}
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_add',
					data: data_orderAdd,
					success: function (res) {
						console.log("res======",res);
						//--init data        
						var data = res.data;
						if (data.code == 1) {
							//创建订单成功
							that.paytype = 'weixin';
							that.orderid = res.data.orderid;
							that.orderno = res.data.orderno;
							
							if(that.order_type_001 == 'shopmall'){
								//普通订单的支付请求
								var url_to_payment = '/pages/pay/payment/payment?orderid=' + that.orderid;
								url_to_payment += '&balance_zengsong_dikou=' + that.balance_zengsong_dikou;
								url_to_payment += '&balance_dikou=' + that.balance_dikou;
								url_to_payment += '&traffic_price=' + that.traffic_price;
								url_to_payment += '&user_coupon_dikou=' + that.youhui_diko_price;
								
								console.log('准备跳转到支付页面：' + url_to_payment);
								
								if(that.cuxiao_huodong && (that.cuxiao_huodong == 'aipingou')){
									//写爱拼购活动的选项
									that.__cuxiao_aipingou_add_order_option(url_to_payment);
									
									return;
								}								
								
								uni.redirectTo({
									url: url_to_payment,
								})
							}
							else if(that.order_type_001 == 'xianmaishang'){
								that.order_add_new_option_by_key_value();
							}
				
							
						}
						else if (data.code == 2) {
							
							uni.showModal({
								title: '提示',
								content: res.data.msg,
								success(res) {
									if (res.confirm) {
										console.log('用户点击确定')
									} else if (res.cancel) {
										console.log('用户点击取消')
									}
								}
							})
							
							that.btnDisabled = false
							
						} else {
							uni.showToast({
								title: "下单失败!",
								duration: 2500
							});
							that.btnDisabled = false
						}
					},
					fail: function (e) {
						uni.showToast({
							title: '网络异常！err:createProductOrder',
							duration: 2000
						});
						that.btnDisabled = false
					}
				});
				
			},
			
			

			//首次点餐
			order_add_new_option_by_key_value: function (e) {
			    var that = this;
			    
			    var is_waimai = that.order_type_001_xianmaishang_data.is_waimai;
				
				var cartlist = null;
			
			    if (is_waimai == 1){
			      var cartlist = wx.getStorageSync('waimai_list_' + that.order_type_001_xianmaishang_data.xianmaishangid);
			    }else{
			      var cartlist = wx.getStorageSync('cart_list_' + that.order_type_001_xianmaishang_data.xianmaishangid);
			    }
			    
			    
				
			    var order_add_new_option_by_key_value = [];
			
			    if(is_waimai == 1){
					if(!that.order_type_001_xianmaishang_data.waimai_rmb && (that.order_type_001_xianmaishang_data.waimai_rmb != 0)){
						that.order_type_001_xianmaishang_data.waimai_rmb = 12;
					}
					
					order_add_new_option_by_key_value.push(
						{ "key": "hahading_order_product_list", "value": cartlist }, 
						{ "key": "hahading_order_xianmai_shangid", "value": that.order_type_001_xianmaishang_data.xianmaishangid },  
						{ "key": "xianmai_order_type", "value": that.order_type_001_xianmaishang_data.is_waimai }, 
						{ "key": "waimai_buyer_latitude", "value": that.order_type_001_xianmaishang_data.waimai_buyer_latitude }, 
						{ "key": "waimai_buyer_longitude", "value": that.order_type_001_xianmaishang_data.waimai_buyer_longitude }, 
						{ "key": "xianmai_waimai_peisong_price", "value": that.order_type_001_xianmaishang_data.waimai_rmb }),
						{ "key": "zitidian_list", "value": that.paixu_shanglist[0] };
			    }
				else {
			      order_add_new_option_by_key_value.push(
					{ "key": "hahading_order_product_list", "value": cartlist }, 
					{ "key": "hahading_order_xianmai_shangid", "value": that.order_type_001_xianmaishang_data.xianmaishangid }, 
					//{ "key": "hahading_xianmai_yajin_orderid", "value": that.order_type_001_xianmaishang_data.current_shang_item.yajin_orderid }, 
					{ "key": "xianmai_order_type", "value": that.order_type_001_xianmaishang_data.is_waimai });
					
					if(that.order_type_001_xianmaishang_data.current_shang_item 
						&& that.order_type_001_xianmaishang_data.current_shang_item.yajin_orderid){
							order_add_new_option_by_key_value.push({ "key": "hahading_xianmai_yajin_orderid", "value": that.order_type_001_xianmaishang_data.current_shang_item.yajin_orderid });
						}
			    }
			
				//餐桌编号
			    if(that.order_type_001_xianmaishang_data.desk_no){
			      order_add_new_option_by_key_value.push({"key":"hahading_current_desk_no", "value":that.order_type_001_xianmaishang_data.desk_no});
			    }
				
				//扫码的编号
				if(that.order_type_001_xianmaishang_data.scan_qrcode_no){
				  order_add_new_option_by_key_value.push({"key":"xianmai_scan_qrcode_no", "value":that.order_type_001_xianmaishang_data.scan_qrcode_no});
				}
			
				//特殊业务类型
				if(that.order_type_001_xianmaishang_data.spec_business_type){
				  order_add_new_option_by_key_value.push({"key":"spec_business_type", "value":that.order_type_001_xianmaishang_data.spec_business_type});
				}
			
			    var order_add_new_option_by_key_value_str = encodeURIComponent(JSON.stringify(order_add_new_option_by_key_value));
			
			    that.abotapi.abotRequest({
			
			      url: that.abotapi.globalData.yanyubao_server_url + '/openapi/XianmaiShangData/order_add_new_option_by_key_value',
			
			      data: {
			        sellerid: that.abotapi.get_sellerid(),
			        orderid: that.orderid,
			        order_option_key_and_value_str: order_add_new_option_by_key_value_str
			      },
			      success: function (res) {
					  
					  var new_payment_url = '/pages/pay/payment/payment?orderid=' + that.orderid;
					  new_payment_url += '&balance_zengsong_dikou=' + that.balance_zengsong_dikou;
					  new_payment_url += '&balance_dikou=' + that.balance_dikou;
					  new_payment_url += '&traffic_price=' + that.traffic_price;
					  
					  // #ifdef MP-ALIPAY
					  //new_payment_url += '&is_mp_alipay_xianmai=1';
					  // #endif
					  
					  var storage_key = '';
					  
					 if(that.order_type_001_xianmaishang_data.is_waimai == 1){
					   storage_key = 'waimai_list_' + that.order_type_001_xianmaishang_data.xianmaishangid;
					 }
					 else{
						 storage_key = 'cart_list_' + that.order_type_001_xianmaishang_data.xianmaishangid;
					 }
					 
					 uni.removeStorage({
						key: storage_key,
						success(res) {							 
							uni.redirectTo({
								url: new_payment_url,
							})							
						}
					 })
					  
			      },
			      fail: function (res) {
			        that.setData({
			          btnDisabled: false,
			        });
			      }
			    })
			
			},
			//钱包抵扣
			switch1Change: function (e, type = null, value = null, that = null) {
			    console.log('准备使用赠款或现金抵扣：', e, type, value);
				
				if(!that){
					that = this;
				}
				
				if(!that.balance_zengsong || !that.balance){
					console.log('准备使用赠款或现金抵扣，但是赠款或余额没有值：', that.balance_zengsong, that.balance);
					
					return;
				}
			
			    if (type == null && value == null) {
			       type = e.currentTarget.dataset.type
			       value = e.detail.value
			       
				   
				   console.log('准备使用赠款或现金抵扣002：', e, type, value)
			    }
			
			    var pay_price = that.pay_price;
			    var pay_price_origin = that.pay_price_origin;   
			    var balance_zengsong = that.balance_zengsong;
			    var balance = that.balance;
			    var balance_zengsong_dikou = that.balance_zengsong_dikou;
			    var balance_dikou = that.balance_dikou;
			
			
			
			    if (type == 1) {
					that.isSwitch1 = value;
					
			      if (value) {
					//如果使用赠款金额
					if (parseFloat(balance_zengsong) < parseFloat(pay_price_origin)) {
			
			          if (that.balance_dikou) {
						
			            that.switch1Change(null, 2, false, that)
			            pay_price = that.pay_price;
			            balance_zengsong = that.balance_zengsong;
			            balance = that.balance;
						
						
			            balance_zengsong_dikou = that.balance_zengsong_dikou;
			            balance_dikou = that.balance_dikou;
			
			
			            
			              that.balance_zengsong = util.sprintf("%0.2f", 0);
			              that.pay_price = util.sprintf("%0.2f", parseFloat(pay_price) - parseFloat(balance_zengsong));
			              that.balance_zengsong_dikou = util.sprintf("%0.2f", parseFloat(balance_zengsong));
			              that.isSwitch2 = false;
			            
			          } else {
			            
			              that.balance_zengsong = util.sprintf("%0.2f", 0);
			              that.pay_price = util.sprintf("%0.2f", parseFloat(pay_price) - parseFloat(balance_zengsong));
			              that.balance_zengsong_dikou = util.sprintf("%0.2f", parseFloat(balance_zengsong));
			            
			          }
			
			
			
			        } else {
			
			          if (that.balance_dikou) {
			
			            that.switch1Change(null, 2, false, that)
			            pay_price = that.pay_price;
			            balance_zengsong = that.balance_zengsong;
			            balance = that.balance;
			            balance_zengsong_dikou = that.balance_zengsong_dikou;
			            balance_dikou = that.balance_dikou;
			          }
			
			          
			            that.balance_zengsong = util.sprintf("%0.2f", parseFloat(balance_zengsong) - parseFloat(pay_price));
						that.pay_price = util.sprintf("%0.2f", 0);
			            that.balance_zengsong_dikou = util.sprintf("%0.2f", parseFloat(pay_price));
			            that.isSwitch2 = false;
			          
			
			        }
			      } 
				  else {
					//如果不使用赠款金额
					//console.log('11111111111111111111');
					//console.log('11111111111111111111', pay_price);
					//console.log('11111111111111111111', balance_zengsong_dikou);
					//console.log('11111111111111111111', balance_zengsong);
					//console.log('11111111111111111111', that.youhui_diko_price);
			
			        
			          that.balance_zengsong = util.sprintf("%0.2f", parseFloat(balance_zengsong) + parseFloat(balance_zengsong_dikou));
			          that.pay_price = util.sprintf("%0.2f", parseFloat(pay_price) + parseFloat(balance_zengsong_dikou));
			          that.balance_dikou = util.sprintf("%0.2f", 0);
			          that.balance_zengsong_dikou = util.sprintf("%0.2f", 0);
			       
			      }
			
			    } 
				else if (type == 2) {
					that.isSwitch2 = value;
					
					if (value) {
						//如果使用现金，开关打开
					  
					  
					  
						if (parseFloat(balance) < parseFloat(pay_price_origin)) {
					 
						  if (that.balance_zengsong_dikou) {
				
							that.switch1Change(null, 1, false, that)
							pay_price = that.pay_price;
							balance_zengsong = that.balance_zengsong;
							balance = that.balance;
							balance_zengsong_dikou = that.balance_zengsong_dikou;
							balance_dikou = that.balance_dikou;
				
				
							that.balance = util.sprintf("%0.2f", 0);
							that.pay_price = util.sprintf("%0.2f", parseFloat(pay_price) - parseFloat(balance));
							that.balance_dikou = util.sprintf("%0.2f", parseFloat(balance));
							that.isSwitch1 = false;
							
						  } else {
						   
							  that.balance = util.sprintf("%0.2f", 0);
							  that.pay_price = util.sprintf("%0.2f", parseFloat(pay_price) - parseFloat(balance));
							  that.balance_dikou = util.sprintf("%0.2f", parseFloat(balance));
							
						  }
				
				
				
						} else {
				
						  if (that.balance_zengsong_dikou) {
				
							that.switch1Change(null, 1, false, that)
							pay_price = that.pay_price;
							balance_zengsong = that.balance_zengsong;
							balance = that.balance;
							balance_zengsong_dikou = that.balance_zengsong_dikou;
							balance_dikou = that.balance_dikou;
						  }
						  
							that.balance = util.sprintf("%0.2f", parseFloat(balance) - parseFloat(pay_price));
							that.pay_price = util.sprintf("%0.2f", 0);
							that.balance_dikou = util.sprintf("%0.2f", parseFloat(pay_price));
							that.isSwitch1 = false;
				
						}
					} 
					else {
						//如果不使用现金余额，开关关闭
									
						  that.balance = util.sprintf("%0.2f", parseFloat(balance) + parseFloat(balance_dikou));
						  that.pay_price = util.sprintf("%0.2f", parseFloat(pay_price) + parseFloat(balance_dikou));
						  that.balance_zengsong_dikou = util.sprintf("%0.2f", 0);
						  that.balance_dikou = util.sprintf("%0.2f", 0);			        
					}
			
			    }
				
			
			  },
			
			
			
			switch2Change:function(){
			
				var that = this;
				
				that.zitidian_address = !that.zitidian_address;
				
			},
			get_zitidian_list:function(){
				var that = this;
				var dis = 0;
			
				var post_data = {
					sellerid:that.abotapi.globalData.default_sellerid,
										
				};
				
				
				
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + '/openapi/ZitiData/get_zitidian_list',
					method: 'post',
					data: post_data,
					success: function (res) {
						
						that.current_zitidian_data = res.data.data;
						that.current_zitidian_list = res.data.zitidian_list;
						console.log('00000000000000000000000000======>>>>>',that.current_zitidian_list)
						
						that.jisuan_juli(that.current_zitidian_list);
						
						
					},
					fail: function (e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
					},
				});
				
				
				
				
				
				
	
					
			},
			
			cx_paixu_shang_list:function(that, locationData){
				
				console.log('重新排序开始============>>>>>>',locationData);
				var that = this;
				
				var coordinate = [];
				coordinate['latitude'] = locationData.latitude;
				coordinate['longitude'] = locationData.longitude;
				//经纬度  点方法获取
				that.coordinate = coordinate; //经纬度
				
				console.log('重新排序============>>>>>>',that.coordinate);
				that.get_zitidian_list();
				
			},
			
			set_paixu_shanglist:function(shop_location_list){
				
				var that = this;
				
				console.log('shop_location_list111100000=========',shop_location_list)
				//that.shop_location_list
				
				//开始排序
				that.paixu_shanglist = shop_location_list.sort(compare);
				
				function compare(obj1, obj2) {
				  var val1 = obj1.dis; 
				  var val2 = obj2.dis;
				  
				  return val1 - val2;
				  /*
				  if (val1 < val2) {
					return -1;
				  } else if (val1 > val2) {
					return 1;
				  } else {
					return 0;
				  }*/
				}
				
				console.log('进入搜索缓存排序计算完毕', that.paixu_shanglist);
				
				
				
			},
			jisuan_juli:function(current_zitidian_list){
				console.log('计算距离开始');
				
				var dis = 0
				var shop_location_list = [];
				var that = this;
				
				for (var index in current_zitidian_list) {
					if (!isNaN(index)) {
					  
						dis = that.abotapi.getDistance(that.coordinate['latitude'], that.coordinate['longitude'], that.current_zitidian_list[index].value_arr['latitude'], that.current_zitidian_list[index].value_arr['longitude']);
						
						//dis = Math.ceil(dis)
						if(!isNaN(dis)){
							current_zitidian_list[index]['dis'] = dis.toFixed(2);
							var dis_str = '';
							if (dis < 1000) {
							  dis_str = dis.toFixed(1) + '米'
							}
												
							else {
							  dis_str = (dis / 1000).toFixed(1) + '公里'
							}
							
							current_zitidian_list[index]['dis_str'] = dis_str;
							
							shop_location_list.push(current_zitidian_list[index])
						}
						
					}
				}
				console.log('shop_location_list==========>>>>>',shop_location_list)
				that.set_paixu_shanglist(shop_location_list);
			},
			show_paixu_list:function(index){
				var that = this;
				console.log('777777======>>>>>',index)
				console.log('77777777====>>>>>',that.paixu_shanglist)
				
				var item = that.paixu_shanglist[0];
				that.paixu_shanglist[0] = that.paixu_shanglist[index];
				that.paixu_shanglist[index] = item;
				
				that.showShangModal=false;
			},
			
			
			//跳转收货地址
			goAddress:function(){
				var that= this;
				uni.navigateTo({
					url:'/pages/address/user-address/user-address?cartId=321&amount='+that.amount+'&productid='+that.productid+'&action_pay='+that.action
				})
			},
			// clearOrder(){
			// 	uni.removeStorage({
			// 		key: 'buylist',
			// 		success: (res)=>{
			// 			this.buylist = [];
			// 			console.log('remove buylist success');
			// 		}
			// 	});
			// },
			// toPay(){
			// 	//商品列表
			// 	let paymentOrder = [];
			// 	let goodsid=[];
			// 	let len = this.buylist.length;
			// 	for(let i=0;i<len;i++){
			// 		paymentOrder.push(this.buylist[i]);
			// 		goodsid.push(this.buylist[i].productid);
			// 	}
			// 	if(paymentOrder.length==0){
			// 		uni.showToast({title:'订单信息有误，请重新购买',icon:'none'});
			// 		return ;
			// 	}
			// 	//本地模拟订单提交UI效果
			// 	uni.showLoading({
			// 		title:'正在提交订单...'
			// 	})
			// 	setTimeout(()=>{
			// 		uni.setStorage({
			// 			key:'paymentOrder',
			// 			data:paymentOrder,
			// 			success: () => {
			// 				uni.hideLoading();
			// 				uni.redirectTo({
			// 					url:"/pages/pay/payment/payment?amount="+this.sumPrice
			// 				})
			// 			}
			// 		})
			// 	},1000)
				
			// },
			// //选择收货地址
			// selectAddress(){
			// 	uni.navigateTo({
			// 		url:'/pages/user/address/address?type=select'
			// 	})
			// },
			
			//图片弹出
			get_redpackage_picture_show:function(e){
				this.orderredpackge_picture_show = true;
				
				
				if(this.redpackge_lingqu_score > 0){
					uni.showToast({
						title: '已领取过红包',
						duration: 2000
					});
					
					this.orderredpackge_picture_show = false;
					
				}
			},  
			
			//从服务器请求，获得红包随机数。
			get_redpackage_while_ordering:function(){
				
				console.log('this.is_ordering_redpackge_click====>>>>', this.is_ordering_redpackge_click);
				
				if(this.is_ordering_redpackge_click){
					return;
				}
				
				this.is_ordering_redpackge_click = true;
				
				console.log('this.is_ordering_redpackge_click===222222=>>>>', this.is_ordering_redpackge_click);
				
				
				
				
				var userInfo = this.abotapi.get_user_info();
				var that = this;
				
				var post_data = {
					sellerid:that.abotapi.get_sellerid(),
				}
					
				if (userInfo) {
					post_data.userid = userInfo.userid;
					post_data.checkstr = userInfo.checkstr;
				}
				
				that.abotapi.abotRequest({
					url: this.abotapi.globalData.yanyubao_server_url + 'openapi/OrderingRedpackageData/get_my_ordering_redpackge_num',
					data: post_data,
					success: function (res) {
						console.log('sssss', res)
						
						that.is_ordering_redpackge_click = false;
						
						
						if(!res || !res.data || !res.data.code || (res.data.code != 1) ){
							uni.showToast({
								title: res.data.msg,
								duration: 2000
							});
							
							setTimeout(function(){
								that.orderredpackge_picture_show = false;
							}, 1000)
							
							// if(res && res.data && res.msg){
							// 	uni.showModal({
							// 		title:'',
							// 		content:''
							// 	})
							// }
							
							return;
						}
						
						if(res.data.code == 1){
							that.redpackge_lingqu_score = that.redpackge_lingqu_score + 1;
						}
						
						
						var my_lucky_redpackge_first = res.data.data;
						console.log('幸运红包金额==>>>', my_lucky_redpackge_first);	
						
						
						
						var my_lucky_redpackge_first002 = my_lucky_redpackge_first/100; // 分 ===>>> 元
						
						console.log('幸运红包金额==>>>'+my_lucky_redpackge_first002+'元');
						
						
						setTimeout(function(){
							uni.showModal({
							    title: '提示',
							    content: '恭喜获得' + my_lucky_redpackge_first002 + '元！',
							    confirmText: "现在用",
								cancelText: "下次用",
							    success: function (res) {
									
									console.log('33333333333333333333' );
									
									
									
									
									var balance_zengsong_num = parseInt(that.balance_zengsong*100);
									
									console.log('赠款金额==>>>' + String(balance_zengsong_num) + '元');
									
									balance_zengsong_num = balance_zengsong_num + my_lucky_redpackge_first;
									balance_zengsong_num = parseFloat(balance_zengsong_num/100).toFixed(2);
									
									that.balance_zengsong = String(balance_zengsong_num);
									
							        if (res.confirm) {
										//立即用
							            console.log('用户点击确定');
										that.orderredpackge_picture_show = false;
										that.switch1Change(null, true, String(my_lucky_redpackge_first002), that);
										
							        } 
									else if (res.cancel) {
										//稍后用
							            console.log('用户点击取消');
										
										that.orderredpackge_picture_show = false;
										console.log('用户领取红包后赠款==',that.balance_zengsong);
							        }
							    }
							});
							
						}, 1500)
						
						
						
					},
					fail: function (e) {
						uni.showToast({
							title: '网络异常！',
							duration: 2000
						});
						
						console.log('4444444444444444' );
						that.is_ordering_redpackge_click = false;
					},
					complete:function(e){
						
					}
				});
				
				//======================================================
									
				//改变赠款的金额
				
				
				//======================================================
				
				
			},
			//2020.12.3. 爱拼团
			__cuxiao_aipingou_add_order_option:function(url_to_payment){
				var that = this;
				
				var order_add_new_option_by_key_value_str = encodeURIComponent(JSON.stringify(this.order_option_new_list));
							
				var userInfo = that.abotapi.get_user_info();
							
							
				that.abotapi.abotRequest({
				  url: that.abotapi.globalData.yanyubao_server_url + '/Yanyubao/ShopApp/order_add_new_option_by_key_value',
				  data: {
					  userid: userInfo.userid,
					  checkstr: userInfo.checkstr,
				    sellerid: that.abotapi.get_sellerid(),
				    orderid: that.orderid,
				    order_option_key_and_value_str: order_add_new_option_by_key_value_str
				  },
				  success: function (res) {
					
					uni.redirectTo({
						url:url_to_payment,
					})  
					 
					  
				  },
				  fail: function (res) {
				    that.setData({
				      btnDisabled: false,
				    });
				  }
				});
				
				
			},
			//2020.12.11 优惠券板块，显示用户的可用优惠券列表
			open_user_cooupon_list(Class, Position) {
				if(!this.coupon_list){
					return;
				}
				
			    this.$nextTick(function() {
					
			        this.AlertClassZhongjiang = Class;
			        this.AlertPositionZhongjiang = Position;
			        this.$nextTick(function() {
			            this.$refs.openAlertZhongjiang.Show();
			        });
			    });
			},
			//点击优惠券立即使用
			user_coupon_dikou_handle(price, ucid){
				var that = this;
				
				if(isNaN(price)){
					uni.showModal({
						title:'错误',
						content:'优惠券金额异常',
						showCancel:false
					})
					
					return;
				}
				
				console.log('准备使用优惠券，价格：', price);
				console.log('准备使用优惠券，ID：', ucid);
				
				//如果之前选过优惠券，先恢复之前的价格
				if(that.youhui_diko_price > 0){
					that.pay_price = that.pay_price + that.youhui_diko_price;
				}
				
				
				that.current_ucid = ucid;
				
				//that.youhui_diko_price = util.sprintf("%0.2f", price/100);
				
				that.youhui_diko_price = price;
				
				
				
				//将优惠券抵扣的金额从要支付的金额中减去，为后面的赠款和余额抵扣做准备
				that.pay_price = that.pay_price - that.youhui_diko_price;
				
				//如果抵扣的金额比要支付的金额还要大，则最多抵扣要支付的金额
				/*if(that.youhui_diko_price > that.pay_price){
					that.youhui_diko_price = that.pay_price;
				}*/
				if(parseFloat(that.pay_price) < 0){
					that.pay_price = 0;
				}
				
				//关闭弹层
				this.$refs.openAlertZhongjiang.Close();
				
				
			},
			//选择不使用优惠券
			user_coupon_dikou_not_use:function(e){
				console.log('用户选择不使用优惠券');
				
				var that = this;
				
				//this.switch1Change(null, 1, false, this);
				//this.switch1Change(null, 2, false, this);
				
				console.log('parseFloat(that.pay_price) ====>>>> ', parseFloat(that.pay_price))
				console.log('that.youhui_diko_price ====>>>> ', that.youhui_diko_price)
				
				that.pay_price = parseFloat(that.pay_price) + parseFloat(that.youhui_diko_price);
				
				that.youhui_diko_price = 0;
				that.current_ucid = 0;
				
				//关闭弹层
				this.$refs.openAlertZhongjiang.Close();
			}
			
		}
	}
</script>

<style lang="scss">
	.item .cp_photo{ 
	    width: 60px; 
	    height: 60px;
	    overflow: hidden; 
	    border-radius: 6rpx; 
	    margin-right: 20rpx;
	}
	.item .cp_photo image{ 
	    width: 60px; 
	    height: 60px;
	}
	
	.item {
	  display: flex;
	  flex-direction: column;
	}
	.gm_ovh_2h{
	    line-height:50rpx; 
	    height: 50px; 
	    margin:0; 
	    overflow:hidden;  
	    text-overflow:ellipsis; 
	    display:-webkit-box; 
	    -webkit-line-clamp:2;  
	    -webkit-box-orient:vertical; 
	    font-size: 32rpx;
	}
	.gm_ovh_1h{
	    line-height:50rpx; 
	    height: 50rpx; 
	    margin:0; 
	    overflow:hidden;  
	    text-overflow:ellipsis; 
	    display:-webkit-box; 
	    -webkit-line-clamp:2;  
	    -webkit-box-orient:vertical; 
	    font-size: 28rpx;
	} 
	.h10_hui{
	    height: 20rpx;
	    width: 100%;
	    background: #eee;
	}
	
	.min_60{
	    min-height: 120rpx;
	    border: 1rpx solid #e5e5e5;
		padding:20rpx;
	}
	
	.w100{ width: 100%}
	
	.iconWarn{
	   vertical-align:top;padding-right:4rpx;
	}
	
	.iconClear{
	  float:right;
	  padding-top: 10rpx;
	  padding-left: 20rpx;
	  padding-right:20rpx;
	  margin-top:-36px;
	  height: 216rpx;
	}
	
	.inputStyle{
	  height: 36px;
	  line-height: 36px;
	  padding-left: 4rpx;
	  width:80%;
	}
	
	.tips{
	  margin-bottom:20rpx;
	}
	.x_right{
	    width:32rpx;
	    height: 116rpx;
	    display:inline-block; 
	    vertical-align: middle;
	    float: right; 
	}
	.zhifu{
	    background: #fff;
	    margin-bottom: 1px;
	    padding: 4%;
	    width: 92%;
	    font-size: 28rpx;
	    color: #666;
	}
	.font_20{
	    font-size: 20px;
	    font-weight: bold;
	}
	.xx_pay_submit{
	  margin-top: 20rpx;
	  color: #fff;
	  background-color: #1AAD19;
	
	}
	.gms_view{  
	    width: 100%;
	    display: inline-block;
	    text-align: right;
	}
	.gms_view navigator{
	    border: 1px solid #ddd;
	    width: 24rpx;
	    height: 24rpx;
	    border-radius: 50%;
	    color: #666;
	    font-size: 24rpx;
	    text-align: center;
	    line-height: 24rpx;
	    float: right;
	    font-weight: bold;
	    
	}
	.gms_view input{
	    background: #fff;
	    border: 1px solid #ddd;
	    border-radius: 4rpx;
	    font-size: 24rpx;
	    width: 60rpx;
	    margin: 0 10rpx;
	    text-align: center;
	    color: #999;
	    float: right;
	}
	.che{
	    border-radius:50% ;
	    width: 20px;
	    height: 20px;
	}
	.hui{
	    margin-left: 28rpx;
	    font-size: 30rpx;
	    
	}
	.xuan{
	    padding: 10rpx 0;
	    font-size: 30rpx;
	}
	
	.photo_name{
	    display: flex;
	}
	
	.danji_shulian{
	  display:flex;
	  justify-content:space-between;
	  border-bottom: 1rpx solid #e5e5e5;
	  padding:0 20rpx;
	  height:70rpx;
	  margin-top: 10rpx;
	}
	
	.heji_con{
	  display:flex;
	  justify-content:space-between;
	}
	
	.a-dikou{
	  display:flex;
	  padding:0 0 3%;
	  font-size:28rpx;
	  justify-content:space-between;
	  border-bottom:1rpx solid #e5e5e5;
	  margin-bottom:20rpx;
	  width:94%;
	  margin-left:3%;
	  margin-top: 30rpx;
	}
	.a-redpackets{
		display:flex;
		padding:0 0 3%;
		font-size:28rpx;
		justify-content:space-between;
		border-bottom:1rpx solid #e5e5e5;
		margin-bottom:20rpx;
		width:94%;
		margin-left:3%;
		margin-top: 30rpx;
	}
	
	.a_redpackets_img_wrap {
		width:400rpx;
		
			position: absolute;			
			top: 300rpx;
			/*bottom: 0;*/
			left: 0;
			right: 0;
			
			z-index: 4;
			margin: auto;
	}
	.a_redpackets_img{
		width:400rpx;
		background: rgba(0,0,0,0.3);
		    
	}
	@-moz-keyframes tada{
	    0%{-moz-transform:scale(1);}
	    10%,20%{-moz-transform:scale(0.9) rotate(-3deg);}
	    30%,50%,70%,90%{-moz-transform:scale(1.2) rotate(3deg);}
	    40%,60%,80%{-moz-transform:scale(1.2) rotate(-3deg);}
	    100%{-moz-transform:scale(1) rotate(0);}
	   }
	  @-webkit-keyframes tada{
	    0%{-webkit-transform:scale(1);}
	    10%,20%{-webkit-transform:scale(0.9) rotate(-3deg);}
	    30%,50%,70%,90%{-webkit-transform:scale(1.2) rotate(3deg);}
	    40%,60%,80%{-webkit-transform:scale(1.2) rotate(-3deg);}
	    100%{-webkit-transform:scale(1) rotate(0);}}
	.a_redpackets_img:hover{
	  -webkit-animation: tada 1s .2s ease both;
	  -moz-animation: tada 1s .2s ease both;
	}
	.b-redpackets{
		display: flex;
	}
	.b-dikou{
	  display: flex;
	}
	.c-redpackets{
		margin-left:40rpx;
		color: #0497cc;
	}
	.c-dikou{
	  margin-left:40rpx;
	  font-size:25rpx;
	  color:#666;
	}
	.c-dikou_amount{
		color:#E3170D;
		font-weight: bold;
		font-size: 30rpx;
		margin-right: 10rpx;
	}
	.d-dikou{
	  zoom: .7
	}
	
	.c2-dikou{
	  display:flex;
	  align-items:flex-end;
	}
	
	.d-coupon{
	  display:flex;
	  align-items:flex-end;
	}
	.p_all {
		padding: 5%;
	}
	.photo_name {
		display: flex;
		margin: 2% 0;
	}
	.mt5{
		margin-top: 10rpx;
	}
	.font_14{
		font-size: 28rpx;
	}
	.df_1 {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		-webkit-tap-highlight-color: transparent;	
	}
	.x_rights {
		width:32rpx;
		height: 32rpx;
		margin-top: 40rpx;
	}
	
	
	//======= 2020.12.11 优惠券css Begin ========
	.open_alert_abot_basic{
		margin: 20rpx;
		padding: 20rpx;
		border:1px dotted #666;
		border-radius: 10rpx;
		
	}
	.youhuiquan_title {
		height: 60rpx;
		line-height: 60rpx;
		padding-right: 40rpx;
		background-color: #50ADD3;
		color: #fff;
		text-align: right;
		border-radius: 5rpx;
	}

	.demo {
		width:420rpx;
		margin:0 auto;
	}
	.stamp * {
		padding: 0;
		margin: 0;
		list-style:none;
		font-family:"Microsoft YaHei", 'Source Code Pro', Menlo, Consolas, Monaco, monospace;
	}
	.stamp {
		height: 240rpx;
		padding: 0 20rpx;
		position: relative;
		overflow: hidden;
		margin-top: 10rpx;
	}
	.stamp:before {
		content: '';
		position: absolute;
		top:0;
		bottom:0;
		left:20rpx;
		right:20rpx;
		z-index: -1;
	}
	.stamp i {
		position: absolute;
		left: 20%;
		top: 90rpx;
		height: 380rpx;
		width: 800rpx;
		background-color: rgba(255, 255, 255, .15);
		transform: rotate(-30deg);
	}
	.stamp .par {
		float: left;
		padding: 10rpx 30rpx;
		width: 280rpx;
		border-right:4rpx dashed rgba(255, 255, 255, .3);
		text-align: left;
	}
	.stamp .par p {
		color:#fff;
		font-size: 24rpx;
		//line-height: 42rpx;
	}
	.stamp .par span {
		font-size: 40rpx;
		color:#fff;
		margin-right: 10rpx;
		line-height: 95rpx;
	}
	.stamp .par .sign {
		font-size: 40rpx;
	}
	.stamp .par sub {
		position: relative;
		top:-10rpx;
		color:rgba(255, 255, 255, .8);
	}
	.stamp .copy {
		display: inline-block;
		padding:42rpx 28rpx;
		width:200rpx;
		vertical-align: text-bottom;
		font-size: 60rpx;
		color:rgb(255,255,255);
		text-align: center;
		line-height: initial;
	}
	.stamp .copy p {
		font-size: 32rpx;
		margin-top: 30rpx;
	}
	.stamp04 {
		width: 680rpx;
		background: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 8rpx, #50ADD3 8rpx);
		background-size: 24rpx 16rpx;
		background-position: -10rpx 20rpx;
	}
	.stamp04:before {
		background-color:#50ADD3;
		left: 10rpx;
		right: 10rpx;
	}
	.stamp04 .copy {
		padding: 22rpx 16rpx 8rpx 50rpx;
		font-size: 25rpx;
	}
	.stamp04 .copy p {
		font-size: 24rpx;
		margin-top: 10rpx;
		margin-bottom: 16rpx;
	}
	.stamp04 .copy a {
		background-color:#fff;
		color:#333;
		font-size: 28rpx;
		text-decoration:none;
		padding:10rpx 20rpx;
		border-radius:6rpx;
		display: block;
	}
	//============== End ==============
	
	
	//2021.11.15   =========   弹窗
	.show_modal_mask{
		background-color: #000;
		opacity: 0.7;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
	}
	.show_modal_pop{
		position: fixed;
		z-index: 999;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.show_paixu{
		background-color: #FFFFFF;
	}
</style>
