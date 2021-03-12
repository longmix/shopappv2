<template>

	<form>
	<!-- 	<view class="head">
			<h1>请填写直播信息</h1>
		</view> -->
		
		<view class="error-msg">
			<label>
				<span>请设置分享图片</span>
				<view>
					<image :src="shareImg" @tap="upLoadimgs(2)" mode="widthFix" style="width: 200px;text-align: center;margin: 0px auto;
    display: block;"></image>
					<view style="display: flex;float: right;margin-right: 15rpx;">
						<view style="color: red;margin-top: 4rpx;">*</view>
						<view style="color:#cbcbcb ;font-size: 20rpx;">建议像素800*640，大小不超过2M</view>
					</view>
				
				</view>
		
			</label>
		</view>
		
		<!-- <view class="head-img">
			<view style="margin-right: 450rpx;color: #666666;font-size: 15px">请设置分享图片</view>
			<view>
				<image :src="shareImg" @tap="upLoadimgs(2)" mode="widthFix"></image>
				<view style="display: flex;float: right;margin-right: 15rpx;">
					<view style="color: red;margin-top: 4rpx;">*</view>
					<view style="color:#cbcbcb ;font-size: 20rpx;">建议像素800*640，大小不超过2M</view>
				</view>

			</view>
		</view> -->
		
		<view style="margin-top: 55rpx;">
			
		</view>
		
		<view class="error-msg"  v-if="zhibotype == 'weixin'">
			<label>
				<span>请设置直播间背景图片</span>
				<view>
					<image :src="coverImg" @tap="upLoadimgs(1)" mode="widthFix" style="width: 200px;margin: 0px auto;
    display: block;"></image>
				
					<view style="display: flex;float: right;margin-right: 15rpx;">
						<view style="color: red;margin-top: 4rpx;">*</view>
						<view style="color:#cbcbcb ;font-size: 20rpx">建议像素1080*1920，大小不超过2M</view>
					</view>
				
				</view>
		
			</label>
		</view>
		
		
		<!-- <view class="head-img" v-if="zhibotype == 'weixin'">
			<view style="margin-right: 350rpx;color: #666666;font-size: 15px">请设置直播间背景图片</view>
			<view>
				<image :src="coverImg" @tap="upLoadimgs(1)" mode="widthFix"></image>

				<view style="display: flex;float: right;margin-right: 15rpx;">
					<view style="color: red;margin-top: 4rpx;">*</view>
					<view style="color:#cbcbcb ;font-size: 20rpx">建议像素1080*1920，大小不超过2M</view>
				</view>

			</view>
		</view> -->

		<view style="margin-top: 55rpx;"></view>
		<view class="error-msg">
			<label>
				<span>主播昵称 :</span>
				<input id="name" type="text" name="name" v-model="anchorName" class="error" placeholder="请输入主播昵称" style="height: 60rpx;" />

			</label>
		</view>

		<view class="error-msg" v-if="zhibotype == 'weixin'">
			<label>
				<span>主播微信 :</span>
				<input id="name" type="text" name="name" v-model="anchorWechat" class="error" placeholder="请输入主播微信号" style="height: 60rpx;" />
				<view style="display: flex; margin-top: 15rpx;">
					<view style="color:#666666 ;font-size: 20rpx;">需实名认证，如未认证请前往“小程序直播”小程序认证</view>
				</view>

			</label>
		</view>


		<view class="error-msg" v-if="zhibotype != 'weixin'">
			<label>
				<span>观看人数 :</span>
				<input id="name" type="text" name="name" v-model="liveNO" class="error" placeholder="请输入直播间人数" style="height: 60rpx;" />

			</label>
		</view>

		<view class="error-msg">
			<label>
				<span>直播间名称 :</span>
				<input id="name" type="text" name="name" v-model="name" class="error" placeholder="请输入直播间名称" style="height: 60rpx;" />

			</label>
		</view>

		<!-- <view class="error-msg">
			<label>
				<span>开始时间 :</span>
			<picker name="birthday" @change="bindDateChange" mode="date" :value="date" :start="date_start_val" :end="date_end_val">
				<view class="picker">
					{{date}}
				</view>
			</picker>
			</label>
		</view> -->
		<view class="row">
			<span class="name">开始时间：</span>
			<view class="value">
				<biaofun-datetime-picker
					placeholder="请选择活动时间"
					:defaultValue="defaultValue"
					start="2000-02-03 02:08"
					end="2100-10-28 22:58"
					fields="minute"
					@change="changeDatetimePicker"
					change_name="startTime"
				></biaofun-datetime-picker>
			</view>
		</view>
		<view class="row">
			<span class="name">结束时间：</span>
			<view class="value">
				<biaofun-datetime-picker
					placeholder="请选择活动时间"
					:defaultValue="defaultValue_end"
					start="2000-02-03 02:08"
					end="2100-10-28 22:58"
					fields="minute"
					@change="changeDatetimePicker"
					change_name="endTime"
				></biaofun-datetime-picker>
			</view>
		</view>
		

		<!-- <view class="error-msg">
			<label>
				<span>结束时间 :</span>
				<input id="endTime" type="text" value="" v-model="endTime" name="endTime" placeholder="请输入结束时间" style="height: 60rpx;" />

			</label>
		</view> -->
		
		<view>
			
			<!-- <switch  @change="aaaa" data-name="closeLike"/> -->

		</view>
		
		
		<view class="text_line" style="margin-top: 15px;" v-if="zhibotype == 'weixin'">
			<span class="text_radio_box">
				<span>是否关闭点赞:</span><switch class="text_check" @change="checkbox" data-name="closeLike"/>
				
			</span>
		</view>
		

		<view class="text_line"  v-if="zhibotype == 'weixin'">
			<view  class="text_radio_box">
				<span>是否关闭货架:</span><switch class="text_check" @change="checkbox" data-name="closeGoods"/>
			</view>
		</view>
		
		<view class="text_line" v-if="zhibotype == 'weixin'">
			<view class="text_radio_box">
				<span>直播方式:</span>
				<!-- <switch class="text_check" @change="checkbox" data-name="screenType"/> -->
				 <radio-group @change="radioChange" > 
					<label style="font-size: 26rpx;margin-right: 20rpx;" class="radio"><radio value="1" />选中</label>
					<label style="font-size: 26rpx;" class="radio"><radio value="0" />未选中</label>
				 </radio-group>
			</view>
		</view>
		
		
		<view class="text_line" v-if="zhibotype == 'weixin'">
			<view class="text_radio_box">
				<span>是否关闭评论:</span>
				<switch class="text_check" @change="checkbox" data-name="closeComment"/>
			</view>
		</view>
		



		<view class="error-msg" v-if="zhibotype != 'weixin'">
			<label>
			    <span>直播间简介 :</span>
			    <textarea id="message" name="message" v-model="livemessage" placeholder="请输入直播间简介"></textarea>
			</label>
		</view>
		
		<view class="goods_list" v-if="zhibotype == 'weixin'" v-show="this.closeGoods != 1">
			<view style="text-align: center;font-size: 15px;color: #666666;padding: 0px 5px;">请选择商品</view>
		

		<view class="goods" v-for="(item,index) in recommend_product_list" :key="index" @click="live_goods($event)"
		 :data-productid="item.goodsId">
			<label>
				<image :src="item.coverImgLocalUrl" style="width: 200rpx;" mode="widthFix"></image>
				<checkbox value="" style="text-align: center;margin-left: 40px;margin-top: 10px;" />
			</label>
		</view>
		</view>
		
		<openAlert ref="openAlert" :AlertClass="AlertClass" :AlertPosition="AlertPosition">
		    <img style="width: 200px;border: red 1px solid;" :src="wechat_qrcode_url" :style="{'background-color': btn_color}"
			 alt="" mode="widthFix">
		</openAlert>


		<view class="success-msg">
			<label>
				<span>&nbsp;</span>
				<button type="submit" :style="{'background-color': btn_color}" class="button" value="提交" @click="bt_live_data">提交</button>
			</label>
		</view>

	</form>
</template>

<script>
	
	import biaofunDatetimePicker from '@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	import util from '@/common/util.js';
	
	export default {
		components: {
			biaofunDatetimePicker
		},
		data() {
			return {
				name: '',
				startTime: '',
				endTime: '',
				livemessage:'',
				anchorName: '',
				anchorWechat: '',
				liveNO: '',
				productid: '',
				recommend_product_list: '',
				productid_str: [],
				shareImg: '../../static/img/add.png',
				coverImg: '../../static/img/add.png',
				closeLike:'',
				closeGoods:'',
				screenType:'',
				closeComment:'',
				zhibotype: '',
				date_start_val:'',//显示开始的时间
				date_end_val:'',//显示开始的时间
				date:'2020-06-22', //显示开始的时间
				date_end:'', //显示结束的时间
				defaultValue: '2020-06-08 10:30', // 默认值
				defaultValue_end:'',//结束时间
				videocode:'',
				
				
				//open-alert
				AlertClass: 0,
				AlertPosition: '',
				//实名认证二维码
				wechat_qrcode_url:'',
				btn_color:''//提交按钮颜色
			}
		},
		onLoad(option) {
			this.abotapi.set_shop_option_data(null, function(){
				
			});
			console.log('weixxxsdsdsssssssssssssd====',option );
			if (option.zhibotype == 'weixin') {
				this.zhibotype = 'weixin';
				console.log('weixxxsdsdssssssssssssssaaaaassd====',this.zhibotype );
				
			}
				
		// 	var myDate = new Date();
		// 	myDate.setDate(myDate.getDate() - 5);
			
		// 	var myDate2 = new Date();
		// 	myDate2.setDate(myDate2.getDate() + 5);
		
			
		// 	this.date_start_val = util.formatTime(myDate),
		// 	this.date_end_val = util.formatTime(myDate2),
			

				
			this.abotapi.set_option_list_str(this, this.callback_function);

			this.live_goods_lists();
			
			var userInfo = this.abotapi.get_user_info();
			this.abotapi.abotRequest({
			  url: this.abotapi.globalData.yanyubao_server_url + 'openapi/VideoLiveData/is_video_live_status',
			  data: {
				  sellerid: this.abotapi.get_sellerid(),
				  userid:userInfo.userid,
				  checkstr: userInfo.checkstr
			  },
			  success:function(res){
				  console.log('huhuhu',res);
				  var videocode = res.data.code;				  
				  //var videocode =0;
				  console.log('huhuhu15111',videocode);

				  if(videocode == 0){
					  uni.showModal({
						title:'提示！',
					  	content:'请先完成之前直播!',
					  })
					  return;
				  }
			  }
			  
			  });
			  
			
			this.auto_information_anchor();

		},
		methods: {
			changeDatetimePicker: function(date,change_name) {
				
				if(change_name == 'endTime'){
					//选择的是结束时间
					this.endTime = date.f3;
				}
				
				if(change_name == 'startTime'){
					//选择的是开始时间
					this.startTime = date.f3;
				}
				
				console.log('选择的日期时间的change_name：', change_name);
				
				console.log('选择的日期时间数据：', date);
			},
			callback_function: function(that, cb_params) {

				if (!cb_params) {
					return;
				}

				console.log('cb_params====', cb_params.wxa_shop_nav_bg_color);
				that.btn_color = cb_params.wxa_shop_nav_bg_color;
				that.abotapi.getColor();
			},
			
			
			checkbox:function(e){
				console.log('eeeee=>>>>>',e);
				
				var name = e.target.dataset.name;
				
				console.log('789sssss',e.target.dataset.name);
				
				if(name == 'closeLike'){
					var closeLike = e.detail.value;
					
					if(closeLike==true){
						this.closeLike =1;
					console.log('closeLikeeeeeeeeeeeee',this.closeLike);	
					}
					else{
						this.closeLike =0;
						console.log('closeLikeeeeeeeeeeeee',this.closeLike);
					}
					
					
				}
				
				if(name == 'closeGoods'){
					var closeGoods = e.detail.value;
					
					if(closeGoods){
						this.closeGoods =1;
						this.productid_str = [];
					console.log('closeGoodsssssssss',this.closeGoods);	
					}
					else{
						this.closeGoods =0;
						console.log('closeGoodsssssssss',this.closeGoods);
					}
					
					
				}
				
				if(name == 'screenType'){
					var screenType = e.detail.value;
					
					if(screenType){
						this.screenType =1;
					console.log('screenTypeeeeeeeeeeee',this.screenType);	
					}
					else{
						this.screenType =0;
						console.log('screenTypeeeeeeeeeeee',this.screenType);
					}
					
					
				}
				
			if(name == 'closeComment'){
				var closeComment = e.detail.value;
				
				if(closeComment){
					this.closeComment =1;
				console.log('789sssssssssss',this.closeComment);	
				}
				else{
					this.closeComment =0;
					console.log('789sssssssddddssss',this.closeComment);
				}
				
				
			}
				
			},
			
			// bbbb:function(e){
			// 	console.log('eeeee=>>>>>',e);
				
			// 	var name = e.target.dataset.name;
			// 	console.log('789sssss',name);
				
			
			// 	var closeGoods = e.detail.value;
			// 	this.closeGoods = closeGoods;
				
			// 	// console.log('789sssddddss',closeLike);
			// 	// if(name == 'dianzan'){
			// 	// 	console.log('789');
			// 	// }
				
			// },
			
			upLoadimgs: function(a) {
				var that = this;
				var userInfo = this.abotapi.get_user_info();
				uni.chooseImage({
					// count:  允许上传的照片数量
					count: 1,
					// sizeType:  original 原图，compressed 压缩图，默认二者都有
					sizeType: "original",
					success(res) {
						console.log(res, 'aaaaa8888')

						var filepath = res.tempFilePaths[0];
						console.log('8888888888', res.tempFilePaths[0])
						console.log('8888888888===>', that.abotapi.globalData.yanyubao_server_url);
						uni.uploadFile({
							url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=upload_image_file_by_user',
							filePath: filepath,
							name: 'file',
							formData: {
								sellerid: that.abotapi.globalData.default_sellerid,
								checkstr: userInfo.checkstr,
								userid: userInfo.userid,
							},
							success: function(res) {

								console.log('res===>>', res);


								var obj = JSON.parse(res.data);
								console.log('objadsdsad', obj);

								//that.shareImg = obj.img_url;
								console.log('aaaaaa',a);
								if(a == 1){
									that.coverImg = obj.img_url
								}else if(a == 2){
									that.shareImg = obj.img_url;
								}
								console.log('aaaaaa99995555', that.img_url);
								console.log('===>shareImg', that.shareImg);
								console.log('===>coverImg', that.coverImg);

							}
						});

					}


				});


			},
			

			bt_live_data: function() {
				var value2_json_str = {
					'name': this.name,
					'startTime': this.startTime,
					'endTime': this.endTime,
					'livemessage':this.livemessage,
					'anchorName': this.anchorName,
					'anchorWechat': this.anchorWechat,
					'liveNo': this.liveNO,
					'filepath': this.shareImg,
					'closeLike':this.closeLike,
					'closeGoods':this.closeGoods,
					'screenType':this.screenType,
					'closeComment':this.closeComment,
					'productid_str': this.productid_str.join(","),
					'zhibotype':this.zhibotype
				}
					console.log('5555aaaa==',this.shareImg);
					// var that
				if (!this.anchorName) {
					uni.showToast({
						title: '请输入主播名字！',
						icon: 'fail',
						duration: 2000
					})
					return;
				}
				if(this.zhibotype=='weixin'){
					if (!this.anchorWechat) {
						uni.showToast({
							title: '请输入主播名字！',
							icon: 'fail',
							duration: 2000
						})
						return;
					
					}
				}
				
				if (!this.startTime) {
					uni.showToast({
						title: '请选择开始时间！',
						icon: 'fail',
						duration: 2000
					})
					return;
				}
				
				if (!this.endTime) {
					uni.showToast({
						title: '请选择结束时间！',
						icon: 'fail',
						duration: 2000
					})
					return;
				}
				
				if (!this.name) {
					uni.showToast({
						title: '请输入直播间名称！',
						icon: 'fail',
						duration: 2000
					})
					return;
				}
				if (!this.shareImg) {
					uni.showToast({
						title: '请上传分享图片！',
						icon: 'fail',
						duration: 2000
					})
					return;
				}
				// if (!this.startTime) {
				// 	uni.showToast({
				// 		title: '请输入开始时间！',
				// 		icon: 'fail',
				// 		duration: 2000
				// 	})
				// 	return;
				// }
				
			    

				// console.log('closeLike==>>',this.closeLike)
				// console.log('closeGoods==>>',this.closeGoods)
				// console.log('screenType==>>',this.screenType)
				// console.log('closeComment==>>',this.closeComment)
				// return;

				// var a = {
				// 	userid: userInfo.userid,
				// 	sellerid: this.abotapi.globalData.default_sellerid,
				// 	checkstr: userInfo.checkstr,
				// 	type: 0,
				// 	value2_json_str: JSON.stringify(value2_json_str),
				// };
				
				if(this.zhibotype == 'weixin'){
					// var that = this
					var userInfo = this.abotapi.get_user_info();
					var livetips={
						userid: userInfo.userid,
						sellerid: this.abotapi.globalData.default_sellerid,
						checkstr: userInfo.checkstr,
						type: this.screenType,
						// value2_json_str: JSON.stringify(value2_json_str),
						name: this.name,
						startTime: this.startTime,
						endTime: this.endTime,
						// livemessage:this.livemessage,
						anchorName: this.anchorName,
						anchorWechat: this.anchorWechat,
						// liveNo: this.liveNO,
						closeLike:this.closeLike,
						closeGoods:this.closeGoods,
						//screenType:this.screenType,
						closeComment:this.closeComment,
						zhibotype:this.zhibotype,
						shareImg:this.shareImg,
						coverImg:this.coverImg,
						wxa_appid: this.abotapi.globalData.xiaochengxu_appid,
						'productid_str': this.productid_str.join(","),
					}
					console.log('5555aaaa==',this.shareImg);
					console.log('5555aaaa==',this.coverImg);
					
				}
				else{
					var that = this
					var userInfo = this.abotapi.get_user_info();
					var livetips={
						userid: userInfo.userid,
						sellerid: this.abotapi.globalData.default_sellerid,
						checkstr: userInfo.checkstr,
						type: 0,
						value2_json_str: JSON.stringify(value2_json_str),
					}
					
					
				}
				
				console.log('99999999999====',this.zhibotype );
				var that = this
				var userInfo = this.abotapi.get_user_info();
				
				
				uni.showLoading({
				    title: '加载中'
				});
				
				
				
				this.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + 'openapi/VideoLiveData/set_plan_video_live',
					data:livetips,
					success(res) {
						
						uni.hideLoading();
						 
							
						var videocode = res.data.code;
						
						console.log('8899===',this.videocode);
						
						if(videocode == 0){
						  uni.showModal({
							title:'提示',
							content:res.data.msg,
							showCancel:false,
							success: function(res002) {
								if (res002.confirm) {}
								
								console.log('用户点击确定',res);
								
								if(res.data.data && res.data.data.qrcode_url){
									that.wechat_qrcode_url = res.data.data.qrcode_url;
									
									console.log('wwa', that.wechat_qrcode_url);
									that.open(0, 'center');
									
								}
							}
						  })
						  
						  
						  
						  return;
						}
						
						var roomid = res.data.roomid;
						
						console.log('99999999ooo',roomid );
						
						uni.showToast({
						  title: res.data.msg,
						  duration: 2000
						});
						
						console.log('99999999ssss9998888====',that.productid_str );
						
						if(that.zhibotype == 'weixin'){
							
							that.abotapi.abotRequest({
								url: that.abotapi.globalData.yanyubao_server_url + 'openapi/VideoLiveData/video_wxa_broadcast_room',
								method: 'POST',
								data:{
									userid: userInfo.userid,
									sellerid: that.abotapi.globalData.default_sellerid,
									checkstr: userInfo.checkstr,
									ids:encodeURIComponent(JSON.stringify(that.productid_str)),
									roomid:roomid,
								},
								success(res) {
									console.log("aaaaa111", res)
								},
								fail(error) {
									console.log("ccccccc====", error)
								}
							})
						}
						uni.navigateTo({
						  url:"/pages/live/live-historylog",
						})	
					
						
						
					},
					fail(error) {
						uni.hideLoading();
						
						console.log("ccccccc====", error)
					}
				})
			},

			//推荐商品接口
			live_goods_lists: function() {
				var that = this;
				var userInfo = this.abotapi.get_user_info();

				this.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + 'openapi/VideoLiveData/get_video_wxa_live_goods_list',
					method: 'post',
					data: {
						sellerid: that.abotapi.globalData.default_sellerid,
						// //is_recommend:1,
						// page_num: 6,
					},
					success(res) {
						console.log('11111111===', res)

						var recommend_product_list = res.data.data;
						that.recommend_product_list = recommend_product_list;
						console.log('11111111==666=', recommend_product_list)


					},
					fail(error) {
						console.log("fffffff====", error)
					}

				})
			},




			live_message: function() {

				console.log('ddd');


			},
			live_goods: function(e) {
				console.log('aaaaaaaa11111888', e);
				var productid = e.currentTarget.dataset.productid;
				if(productid){
					this.closeGoods = 0;
				}
				console.log('aaaaaaaa11111', productid);


				var index = this.productid_str.indexOf(productid);
				if (index != -1) {
					console.log('ssss')
					this.productid_str.splice(index, 1);
				} else {
					console.log('ssss222')
					this.productid_str.push(productid);
				}


				console.log('aaaaaaaa2222', this.productid_str);


			},
			
			//open-alert 悬浮窗效果
			open(Class, Position) {
			    this.$nextTick(function() {
			        this.AlertClass = Class;
			        this.AlertPosition = Position;
			        this.$nextTick(function() {
			            this.$refs.openAlert.Show();
			        });
			    });
			},
			
			//自动填写直播信息
			
			auto_information_anchor:function(){
				
				var userInfo = this.abotapi.get_user_account_info();
				
				/* var now_time = new Date();
				
				this.now_time =  now_time.getFullYear() + "-" + (now_time.getMonth() + 1) + "-" + now_time.getDate() 
				+" " + now_time.getHours() + ":" + now_time.getMinutes();
				
				var end_time = now_time.getFullYear() + "-" + (now_time.getMonth() + 1) + "-" + (now_time.getDate() + 1) 
				+" " + now_time.getHours() + ":" + now_time.getMinutes();
				
				console.log('wwadwad', this.now_time, end_time); */
				
				//直播开始时间
				var timestamp = (new Date()).valueOf();
				timestamp += 15*60*1000;
				
				var date_time = util.formatTime(new Date(timestamp));
				var hour_time = util.formatTime2(new Date(timestamp));
				
				this.defaultValue = date_time + ' ' + hour_time;
				
				//直播结束时间
				timestamp += 3*24*60*60*1000;
				
				date_time = util.formatTime(new Date(timestamp));
				hour_time = util.formatTime2(new Date(timestamp));
				
				this.defaultValue_end = date_time + ' ' + hour_time;
				
				
				this.startTime = this.defaultValue;
				this.endTime = this.defaultValue_end;
				
				this.anchorName = userInfo.nickname;
				this.name = userInfo.nickname + '的直播间';
				console.log('wadadwads', userInfo.nickname);			
								
				
			},
			radioChange:function(e){
				
				this.screenType = e.detail.value;
				console.log(e.detail.value);
				
			}
			


		}
	}
</script>

<style>
	.head {
		background-color: #9DC45F;
		color: #FFF;
		width: 100%;
		height: 150rpx;
		border-radius: 4px;
	}

	.head h1 {
		font-size: 50rpx;
		padding: 30rpx 30rpx;
		font: 50rpx"Trebuchet MS", Arial, Helvetica, sans-serif;
	}

	.error-msg {
		margin-top: 35rpx;
		margin-left: 40rpx;
		font-size: 30rpx;
	}

	span {
		font-size: 30rpx;
		color: #666666;
	}

	/* 	.error-msg input{
		border-bottom: 1px solid #E5E5E5;
		width: 90%;
	} */
	.error-msg input {
		border: 3rpx solid #E5E5E5;
		line-height: 55rpx;
		width: 90%;
		border-radius: 10rpx;
		margin-top: 10rpx;
	}

	.error-msg textarea {
		border: 1px solid #E5E5E5;
		padding: 0 15rpx;
		border-radius: 10rpx;
	}

	button {
		width: 80%;
		margin-top: 25px;
		margin-bottom: 50px;
		background-color: #06ad56;
		border-color: #06ad56;
		color: #fff;
	}

	.head-img {
		width: 100%;
		text-align: center;
		margin-top: 15rpx;
	}

	.head-img image {
		width: 55%;
		border-radius: 25rpx;

	}

	.goods {
		margin: 20rpx 0 20rpx 0;
		align-items: center;
		display: flex;
		width: 33%;
		float: left;
	}

	.goods image {
		border-radius: 15rpx;
	}

	.goods_list {
		display: inline-block;
		margin-top: 20rpx;
		font-size: 35rpx;
		margin-left: 30rpx;
	}
	.huakuai{
		float: right;
		display: flow-root;
	}
	.page {
		padding: 0 30upx;
	}
	
	.row {
		display: flex;
		height: 100upx;
		align-items: center;
		color: #040506;
		border-bottom: 1upx solid rgba($color: #707070, $alpha: 0.3);
	}
	
	.row:active {
		opacity: 0.8;
	}
	
	.name {
		margin-left: 44rpx;
		flex-shrink: 0;
	}
	
	.value {
		flex: 1;
		margin-right: 44rpx;
	}
	
	.right-icon {
		color: #707070;
	}
	span{
		font-size: 28rpx;
		color: #666666;
	}
	input{
		padding-left:5px;
	}
	.name{
		font-size: 28rpx;
	}
	.text_line{
		padding: 0px 21px;
	}
	.text_radio_box{
		display: flex;
		justify-content: space-between;
		margin-top: 10rpx;
	}
</style>
