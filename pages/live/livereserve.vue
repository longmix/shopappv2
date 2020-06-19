<template>

	<form>
		<view class="head">
			<h1>请填写直播信息</h1>
		</view>

		<view class="head-img">
			<view style="margin-right: 450rpx;color: #cbcbcb;">请设置分享图片</view>
			<view>
				<image :src="shareimg" @tap="upLoadimgs(2)" mode="widthFix"></image>
				<view style="display: flex;float: right;margin-right: 15rpx;">
					<view style="color: red;margin-top: 4rpx;">*</view>
					<view style="color:#666666 ;">建议像素800*640，大小不超过2M</view>
				</view>

			</view>
		</view>
		<view style="margin-top: 55rpx;">
			
		</view>

		<view class="head-img" v-if="zhibotype == 'weixin'">
			<view style="margin-right: 350rpx;color: #cbcbcb;">请设置直播间背景图片</view>
			<view>
				<image :src="coverimg" @tap="upLoadimgs(1)" mode="widthFix"></image>

				<view style="display: flex;float: right;margin-right: 15rpx;">
					<view style="color: red;margin-top: 4rpx;">*</view>
					<view style="color:#666666 ;">建议像素1080*1920，大小不超过2M</view>
				</view>

			</view>
		</view>

		<view style="margin-top: 55rpx;"></view>
		<view class="error-msg">
			<label>
				<span>主播昵称 :</span>
				<input id="name" type="text" name="name" v-model="liver" class="error" placeholder="请输入主播昵称" style="height: 60rpx;" />

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
				<input id="name" type="text" name="name" v-model="livename" class="error" placeholder="请输入直播间名称" style="height: 60rpx;" />

			</label>
		</view>

		<view class="error-msg">
			<label>
				<span>开始时间 :</span>
				<input id="starttime" type="text" value="" v-model="starttime" name="starttime" placeholder="请输入开始时间" style="height: 60rpx;" />

			</label>
		</view>

		<view class="error-msg">
			<label>
				<span>结束时间 :</span>
				<input id="endtime" type="text" value="" v-model="endtime" name="endtime" placeholder="请输入结束时间" style="height: 60rpx;" />

			</label>
		</view>
		
		<view>
			
			<!-- <switch  @change="aaaa" data-name="choselike"/> -->

		</view>
		
		<view class="text_line" style="padding: 0 30rpx;" v-if="zhibotype == 'weixin'">
			<view style="display: flex;justify-content: space-between;">
				是否关闭点赞<switch class="text_check" @change="checkbox" data-name="choselike"/>
				<!-- <radio-group style="display: flex; justify-content: space-around;margin-top: 35rpx;" @change="aaaa" data-name="choselike">
					<label>
						<view>
							<radio value="0" :checked="choselike==0" />关闭
						</view>
					</label>
			
					<label>
						<view>
							<radio value="1"  :checked="choselike==1" />开启
						</view>
					</label>
				</radio-group> -->
			</view>
		</view>
		

		<view class="text_line" style="padding: 0 30rpx;" v-if="zhibotype == 'weixin'">
			<view  style="display: flex;justify-content: space-between;">
				是否关闭货架<switch class="text_check" @change="checkbox" data-name="chosegoods"/>
			</view>
		</view>
		
		<view class="text-line" style="padding: 0 30rpx;" v-if="zhibotype == 'weixin'">
			<view style="display: flex;justify-content: space-between;">
				直播方式<switch class="text_check" @change="checkbox" data-name="screentype"/>
			</view>
		</view>
		
		
		<view class="text-line" style="padding: 0 30rpx;" v-if="zhibotype == 'weixin'">
			<view style="display: flex;justify-content: space-between;">
				是否关闭评论<switch class="text_check" @change="checkbox" data-name="closecomment"/>
			</view>
		</view>
		




		<view class="error-msg" v-if="zhibotype != 'weixin'">
			<label>
			    <span>直播间简介 :</span>
			    <textarea id="message" name="message" v-model="livemessage" placeholder="请输入直播间简介"></textarea>
			</label>
		</view>
		
		<view class="goods_list" v-if="zhibotype == 'weixin'">
			请选择商品
		</view>

		<view class="goods" v-for="(item,index) in recommend_product_list" :key="index" @click="live_goods($event)"
		 :data-productid="item.productid">
			<label>
				<image :src="item.picture" style="width: 200rpx;" mode="widthFix"></image>
				<checkbox value="" style="text-align: center;margin-left: 40px;margin-top: 10px;" />
			</label>
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
	export default {
		data() {
			return {
				livename: '',
				starttime: '',
				endtime: '',
				livemessage:'',
				liver: '',
				anchorWechat: '',
				liveNO: '',
				productid: '',
				recommend_product_list: '',
				productid_str: [],
				shareimg: '../../static/img/add.png',
				coverimg: '../../static/img/add.png',
				choselike:'',
				closegoods:'',
				screentype:'',
				closecomment:'',
				zhibotype: ''
			}
		},
		onLoad(option) {
			if (option.zhibotype == 'weixin') {
				this.zhibotype = 'weixin';
			}

			this.abotapi.set_option_list_str(this, this.callback_function);

			this.live_goods_lists();

		},
		methods: {
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
				
				console.log('789sssss',name);
				
				if(name == 'choselike'){
					var choselike = e.detail.value;
					
					if(choselike){
						this.choselike =1;
					console.log('choselikeeeeeeeeeeeee',this.choselike);	
					}
					else{
						this.choselike =0;
						console.log('choselikeeeeeeeeeeeee',this.choselike);
					}
					
					
				}
				
				if(name == 'chosegoods'){
					var chosegoods = e.detail.value;
					
					if(chosegoods){
						this.chosegoods =1;
					console.log('chosegoodsssssssss',this.chosegoods);	
					}
					else{
						this.chosegoods =0;
						console.log('chosegoodsssssssss',this.chosegoods);
					}
					
					
				}
				
				if(name == 'screentype'){
					var screentype = e.detail.value;
					
					if(screentype){
						this.screentype =1;
					console.log('screentypeeeeeeeeeeee',this.screentype);	
					}
					else{
						this.screentype =0;
						console.log('screentypeeeeeeeeeeee',this.screentype);
					}
					
					
				}
				
			if(name == 'closecomment'){
				var closecomment = e.detail.value;
				
				if(closecomment){
					this.closecomment =1;
				console.log('789sssssssssss',this.closecomment);	
				}
				else{
					this.closecomment =0;
					console.log('789sssssssddddssss',this.closecomment);
				}
				
				
			}
				
			},
			
			// bbbb:function(e){
			// 	console.log('eeeee=>>>>>',e);
				
			// 	var name = e.target.dataset.name;
			// 	console.log('789sssss',name);
				
			
			// 	var chosegoods = e.detail.value;
			// 	this.chosegoods = chosegoods;
				
			// 	// console.log('789sssddddss',choselike);
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

							formData: {
								sellerid: that.abotapi.globalData.default_sellerid,
								checkstr: userInfo.checkstr,
								userid: userInfo.userid,
							},
							success: function(res) {

								console.log('res===>>', res);


								var obj = JSON.parse(res.data);
								console.log('objadsdsad', obj);

								//that.shareimg = obj.img_url;
								console.log('aaaaaa',a);
								if(a == 1){
									that.coverimg = obj.img_url
								}else if(a == 2){
									that.shareimg = obj.img_url;
								}
								console.log('aaaaaa99995555', that.img_url);
								console.log('===>shareimg', that.shareimg);
								console.log('===>coverimg', that.coverimg);

							}
						});

					}


				});


			},


			bt_live_data: function() {
				var value2_json_str = {
					'livename': this.livename,
					'starttime': this.starttime,
					'endtime': this.endtime,
					'livemessage':this.livemessage,
					'liver': this.liver,
					'anchorWechat': this.anchorWechat,
					'liveNo': this.liveNO,
					'filepath': this.shareimg,
					'choselike':this.choselike,
					'chosegoods':this.chosegoods,
					'screentype':this.screentype,
					'closecomment':this.closecomment,
					'productid_str': this.productid_str.join(","),
				}
					var that
				if (!this.liver) {
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
				
				
				if (!this.livename) {
					uni.showToast({
						title: '请输入直播间名称！',
						icon: 'fail',
						duration: 2000
					})
					return;
				}
				if (!this.starttime) {
					uni.showToast({
						title: '请输入开始时间！',
						icon: 'fail',
						duration: 2000
					})
					return;
				}
			    

				console.log('choselike==>>',this.choselike)
				console.log('chosegoods==>>',this.chosegoods)
				console.log('screentype==>>',this.screentype)
				console.log('closecomment==>>',this.closecomment)
				return;


				var that = this
				var userInfo = this.abotapi.get_user_info();
				this.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/VideoLiveData/set_plan_video_live',
					method: 'POST',
					data: {
						userid: userInfo.userid,
						sellerid: this.abotapi.globalData.default_sellerid,
						checkstr: userInfo.checkstr,
						type: 0,
						value2_json_str: JSON.stringify(value2_json_str),
					},
					success(res) {
						console.log("aaaaa111", res)

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
					url: that.abotapi.globalData.yanyubao_server_url + 'Yanyubao/ShopApp/product_list',
					method: 'post',
					data: {
						sellerid: that.abotapi.globalData.default_sellerid,
						//is_recommend:1,
						page_num: 6,
					},
					success(res) {
						console.log('11111111===', res)

						var recommend_product_list = res.data.product_list;
						that.recommend_product_list = recommend_product_list;


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
		margin-top: 15rpx;
		margin-left: 40rpx;
		font-size: 30rpx;
	}

	.error-msg span {
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
</style>
