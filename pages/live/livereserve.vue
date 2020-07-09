<template>

	<form>
	<!-- 	<view class="head">
			<h1>请填写直播信息</h1>
		</view> -->

		<view class="head-img">
			<view style="margin-right: 450rpx;color: #666666;font-size: 36rpx">请设置分享图片</view>
			<view>
				<image :src="shareImg" @tap="upLoadimgs(2)" mode="widthFix"></image>
				<view style="display: flex;float: right;margin-right: 15rpx;">
					<view style="color: red;margin-top: 4rpx;">*</view>
					<view style="color:#cbcbcb ;">建议像素800*640，大小不超过2M</view>
				</view>

			</view>
		</view>
		<view style="margin-top: 55rpx;">
			
		</view>

		<view class="head-img" v-if="zhibotype == 'weixin'">
			<view style="margin-right: 350rpx;color: #666666;font-size: 36rpx">请设置直播间背景图片</view>
			<view>
				<image :src="coverImg" @tap="upLoadimgs(1)" mode="widthFix"></image>

				<view style="display: flex;float: right;margin-right: 15rpx;">
					<view style="color: red;margin-top: 4rpx;">*</view>
					<view style="color:#cbcbcb ;">建议像素1080*1920，大小不超过2M</view>
				</view>

			</view>
		</view>

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
					<view style="color: red;margin-top: 4rpx;">*</view>
					<view style="color:#666666 ;">需实名认证，如未认证请前往“小程序直播”小程序认证</view>
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
			<text class="name">开始时间：</text>
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
			<text class="name">结束时间：</text>
			<view class="value">
				<biaofun-datetime-picker
					placeholder="请选择活动时间"
					:defaultValue="defaultValue"
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
		
		<view class="text_line" style="padding: 0 30rpx; margin-top: 15px;" v-if="zhibotype == 'weixin'">
			<view style="display: flex;justify-content: space-between;">
				<span>是否关闭点赞:</span><switch class="text_check" @change="checkbox" data-name="closeLike"/>
				<!-- <radio-group style="display: flex; justify-content: space-around;margin-top: 35rpx;" @change="aaaa" data-name="closeLike">
					<label>
						<view>
							<radio value="0" :checked="closeLike==0" />关闭
						</view>
					</label>
			
					<label>
						<view>
							<radio value="1"  :checked="closeLike==1" />开启
						</view>
					</label>
				</radio-group> -->
			</view>
		</view>
		

		<view class="text_line" style="padding: 0 30rpx;" v-if="zhibotype == 'weixin'">
			<view  style="display: flex;justify-content: space-between;">
				<span>是否关闭货架:</span><switch class="text_check" @change="checkbox" data-name="closeGoods"/>
			</view>
		</view>
		
		<view class="text-line" style="padding: 0 30rpx;" v-if="zhibotype == 'weixin'">
			<view style="display: flex;justify-content: space-between;">
				<span>直播方式:</span><switch class="text_check" @change="checkbox" data-name="screenType"/>
			</view>
		</view>
		
		
		<view class="text-line" style="padding: 0 30rpx;" v-if="zhibotype == 'weixin'">
			<view style="display: flex;justify-content: space-between;">
				<span>是否关闭评论:</span><switch class="text_check" @change="checkbox" data-name="closeComment"/>
			</view>
		</view>
		




		<view class="error-msg" v-if="zhibotype != 'weixin'">
			<label>
			    <span>直播间简介 :</span>
			    <textarea id="message" name="message" v-model="livemessage" placeholder="请输入直播间简介"></textarea>
			</label>
		</view>
		
		<view class="goods_list" v-if="zhibotype == 'weixin'">
			<view style="text-align: center;">请选择商品</view>
		

		<view class="goods" v-for="(item,index) in recommend_product_list" :key="index" @click="live_goods($event)"
		 :data-productid="item.goodsId">
			<label>
				<image :src="item.coverImgUrl" style="width: 200rpx;" mode="widthFix"></image>
				<checkbox value="" style="text-align: center;margin-left: 40px;margin-top: 10px;" />
			</label>
		</view>
		</view>
		
		


		<view class="success-msg">
			<label>
				<span>&nbsp;</span>
				<button type="submit" class="button" value="提交" @click="bt_live_data">提交</button>
			</label>
		</view>

	</form>
</template>

<script>
	
	import biaofunDatetimePicker from '@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	
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
				defaultValue: '2020-06-08 10:30' // 默认值
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
			uni.request({
			  url: this.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/VideoLiveData/is_video_live_status',
			  data: {
			    userid:userInfo.userid,
			    sellerid: this.abotapi.get_sellerid(),
				checkstr: userInfo.checkstr
			  },
			  method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			  header: {// 设置请求的 header
			    'Content-Type':  'application/x-www-form-urlencoded'
			  },
			  success:function(res){
				  console.log('huhuhu',res);
				  var code = res.data.code;
				  console.log('huhuhu15111',code);
				  
				  if(code == 0){
					  uni.showToast({
					  	title:'请先完成之前直播！'
					  })
					  return;
				  }
			  }
			  
			  });
			  
			
			

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

				console.log('cb_params====', cb_params);
				
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
							url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=upload_image_file',
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
				
					var that
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
					var that = this
					var userInfo = this.abotapi.get_user_info();
					var livetips={
						userid: userInfo.userid,
						sellerid: this.abotapi.globalData.default_sellerid,
						checkstr: userInfo.checkstr,
						type: 0,
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
						screenType:this.screenType,
						closeComment:this.closeComment,
						zhibotype:this.zhibotype,
						shareImg:this.shareImg,
						coverImg:this.coverImg,
						wxa_appid: this.abotapi.globalData.xiaochengxu_appid,
					}
					
					
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
				this.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/VideoLiveData/set_plan_video_live',
					method: 'POST',
					data:livetips,
					
					success(res) {
						console.log("aaaaa111", res)
						console.log('99999999ssss999====',livetips );
						var roomid = res.data.roomid;
						console.log('99999999ooo',roomid );
						uni.showToast({
						  title: res.data.msg,
						  duration: 2000
						});
						console.log('99999999ssss9998888====',that.productid_str );
						
						if(that.zhibotype == 'weixin'){
							
							that.abotapi.abotRequest({
								url: that.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/VideoLiveData/video_wxa_broadcast_room',
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
									console.log('99999999ssss999====',livetips );
									uni.showToast({
									  title: res.data.msg,
									  duration: 2000
									});
									
								},
								fail(error) {
									console.log("ccccccc====", error)
								}
							})
						}
						
					},
					fail(error) {
						console.log("ccccccc====", error)
					}
				})
			},

			//推荐商品接口
			live_goods_lists: function() {
				var that = this;
				var userInfo = this.abotapi.get_user_info();

				this.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/VideoLiveData/get_video_wxa_live_goods_list',
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
		margin-left: 20rpx;
		flex-shrink: 0;
	}
	
	.value {
		flex: 1;
		margin-right: 20rpx;
	}
	
	.right-icon {
		color: #707070;
	}
</style>
