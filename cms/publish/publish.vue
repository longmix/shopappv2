<template>
	<view>
		<view class="a-con-textarea">
		  <textarea @click='inputContent' class="a-textarea" v-model="ideaText"  placeholder="在此输入文字" />
		</view>
		
		<view style='padding:20rpx;display:flex;flex-wrap:wrap;'>
		  <view class='camera-a' v-for="(item,index) in imgList" :key="index">
		        <image style="width:190rpx;height:190rpx;" :src="item"></image>
		  </view>
		  <view class='camera-a' @click='chooseImg' v-if="publishtype=='image'">
		      <image src="../../static/img/add.png"></image>
		      <view>上传图片</view>
		  </view>
		
		  <view class='camera-a' v-if="video">
		        <video style="width:190rpx;height:190rpx" :src="video"></video>
		  </view>
		  <view class='camera-a' @click='chooseVideo' v-if="publishtype=='video'">
		      <image src="../../static/img/add.png"></image>
		      <view>上传视频</view>
		  </view>
		</view>
		
		<view>
		  <view class='pub-btn-con'>
		    <view class='pub-btn' @click="publishIdea">立即发布</view>
		    <checkbox-group @change="checkBox" class="" v-if="faquan_xieyi_status=='1'">
		      <label class='pub-xieyi'>
		        <checkbox :value="checked"  :checked="checked"/>完成立即发布表示同意 
				<view @click='readAgreement' style='float:right'>《发布许可协议》</view> 
		      </label>
		    </checkbox-group >
		  </view>
		</view>
		
		<view class="wx-popup" :hidden="flag">
		  <view class='popup-container'>
		    <view class="wx-popup-title">发布许可协议</view>
		    <view class="wx-popup-subtitle">{{faquan_xieyi_title}}</view>
		    <view class="wx-popup-con">
		      
		    <scroll-view scroll-y class="a-1 wx-popup-content" :scroll-left="scrollLeft" bindscrolltolower="lower"  >     
		     {{faquan_xieyi_content}}      
		    </scroll-view>  
		
		
		    </view>
		    <view class="wx-popup-btn">
		      <text class="btn-ok" bindtap='selectAgree'>同意协议</text>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data(){
			return{
				cataIndex: 0,
				cataValue:'',
				imgList: [],
				flag: 1,
				checked: true,
				disable: false,
				publishtype:'image',
				faquan_xieyi_status:'',
				faquan_xieyi_title:'',
				video:'',
				xianmai_shangid:'',
				orderid:'',
			}
		},
		
		onLoad: function (options) {
			//1、获取选项
			if (options.publishtype) {
				this.publishtype = options.publishtype;
			}
			
			if (options.xianmai_shangid){
				this.xianmai_shangid = options.xianmai_shangid
			}
			
			if (options.orderid) {
			  this.orderid = options.orderid;
			}
			
			
			//2、判断是否登录
			var userInfo = this.abotapi.get_user_info();
			
			var that = this;
					
			console.log('userInfo---------2', userInfo)
					
			if (!userInfo || !userInfo.userid) {
				uni.showToast({
					title: '请先登录',
					icon: 'none',
					duration: 1000,
				});
			
				//var last_url = '/cms/publish/publish?publishtype=' + that.publishtype;
				
				var last_url = '/cms/discover/discover';
				
				that.abotapi.goto_user_login(last_url, 'normal');
				return;
			}
			
			var last_url = '/cms/discover/discover';
			
			//3、如果需要用户授权头像和昵称
			if(this.abotapi.goto_get_userinfo(last_url)){
			  return;
			}
			
			
			
			//4、获取发圈设置
			this.abotapi.getFaquanSetting(this, this.callback_xieyi_content);
			
		},
		
		onShow: function () {
			
			
		},
		
		onHide: function () {
			// 页面隐藏
		},
		onUnload: function () {
			// 页面关闭
		},
		methods: {
			callback_xieyi_content: function (that, cms_faquan_setting) {
			
				that.abotapi.getColor();
			    
				if (!cms_faquan_setting) {
			
					return;
			    }
			
			    
			
			    if (cms_faquan_setting.faquan_xieyi_status) {
			      
					that.faquan_xieyi_status = cms_faquan_setting.faquan_xieyi_status;
			      
			    }
			
			    if (cms_faquan_setting.faquan_xieyi_title) {
			      
					that.faquan_xieyi_title = cms_faquan_setting.faquan_xieyi_title;
			    }
			
			
			    if (cms_faquan_setting.faquan_xieyi_content) {
			     
					that.faquan_xieyi_content = cms_faquan_setting.faquan_xieyi_content;
			    }
			
			
			},
			  
			// 分类改变函数  （从shopapp搬过来的  前端执行该方法的注释了没有搬）
			bindPickerChangeCata: function (e) {
				console.log('cata===', e);
				var value = e.detail.value;
				
				this.cataValue = value == 0 ? '' : this.data.cataArr[value];
				this.cataIndex = value;

			},
			  
			inputContent: function (e) {
				console.log('ee', e)
				var ideaText = e.detail.value;
				
				this.ideaText = ideaText;
				console.log('ideaText==', ideaText)
			},
			  
			chooseImg: function (e) {
				var that = this;
				uni.chooseImage({
					count: 9, // 默认9
					sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function (res) {
						console.log('chooseImage===============', res)
						
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						var imgList = res.tempFilePaths;
						
						that.imgList = imgList;
					}
				})
		  
			},
			  
			chooseVideo: function (e) {
				var that = this;
				uni.chooseVideo({
					sourceType: ['album', 'camera'],
					compressed: 'true',
					maxDuration: 60,
					camera: 'back',
					success(res) {
						console.log('chooseVideo===============', res)

						var video = res.tempFilePath;
						
						that.video = video;
					}
				})
			},
			  
			  
			  
			  
			  
			publishIdea: function (e) {
				console.log('eeeeeeeee',e);
				var that = this;
				var userInfo = that.abotapi.get_user_info();
				
				if(that.disable){
					return;
				}
				
				if (that.imgList.length == 0 && that.publishtype == "image") {
					uni.showToast({
					  title: '没有添加图片',
					  icon: 'none'
					})
					return;
				}
				
				if (!that.video && that.publishtype == "video") {
					uni.showToast({
						title: '没有添加视频',
						icon: 'none'
					})
					return;
				}
				
				if ((that.faquan_xieyi_status == 1) && !that.checked) {
					uni.showToast({
						title: '请先同意发布许可协议',
						icon: 'none'
					})
					return;
				}
				
				that.disable = true;
				
				var data_params = {
					sellerid: that.abotapi.globalData.default_sellerid,
					appid: that.abotapi.globalData.xiaochengxu_appid,
					userid: userInfo ? userInfo.userid : '',
				
					text: that.ideaText ? that.ideaText: '',
				}
				
				if(that.xianmai_shangid){
					data_params.faquan_type = 1;
					data_params.extend_id = that.xianmai_shangid;
				}
						
				that.abotapi.abotRequest({
					url: that.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/FaquanData/add_faquan_text',
					method: 'post',
					data: data_params,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function (res) {
						if (res.data.code == 1) {
							var faquanid = res.data.faquanid
								
							that.faquanid = faquanid;
													
							if (that.publishtype == "image") {
													
								that.upLoadImg(0);
													
							} else {
								uni.showLoading({
									title: '正在上传',
								})
													
								uni.uploadFile({
									
									//url: 'http://192.168.0.205:81/index/upload/uploadImg',      //此处换上你的接口地址
									url: that.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/FaquanData/add_faquan_video_or_img',
									filePath: that.video,
									header: {
										"Content-Type": "multipart/form-data",
										'elem': '#up-image',
										'accept': 'application/json',
									},
									name: "uploadvideo",
									formData: {
										sellerid:that.abotapi.globalData.default_sellerid,
										userid: userInfo ? userInfo.userid : '',
										faquanid: faquanid,
										type: 1
									},
									success: function (res) {
										uni.hideLoading();
										console.log('res===========', res)
										if (res.errMsg == "uploadFile:ok") {
											var data = res.data;
											data = JSON.parse(data);
											if (data.code == 1) {
												uni.showToast({
													title: '上传成功',
													success: function (e) {
														console.log('e=======', e)

														that.ideaText = '';
														if (that.orderid){
															that.order_finish();
														}
														uni.navigateTo({
															url: '/cms/discover/discover',
														})
													}
												})
											} else {
												uni.showToast({
													title: '上传失败',
												})

												that.disable = false;
											}
										}
									},
									fail: function (res) {
										that.disable = false;
									},

								})
													
							}
						} else {
							uni.showToast({
								title: '提交失败，请重新发布',
								icon: 'none'
							})
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
			  
			    upLoadImg: function (i) {
			      console.log('i=======', i)
				  var userInfo = this.abotapi.get_user_info();
			      var that = this;
			      uni.showLoading({
			        title: '正在上传第' + (i + 1) + '张',
			      })
			      uni.uploadFile({
			        //url: 'http://192.168.0.205:81/index/upload/uploadImg',      //此处换上你的接口地址
			        url: that.abotapi.globalData.yanyubao_server_url + 'index.php/openapi/FaquanData/add_faquan_video_or_img',
			        filePath: that.imgList[i],
			        header: {
			          "Content-Type": "multipart/form-data",
			          'elem': '#up-image',
			          'accept': 'application/json',
			          'exts': 'jpg|jpeg|png|gif'
			        },
			        name: "image",
			        formData: {
			          sellerid: that.abotapi.globalData.default_sellerid,
			          userid: userInfo ? userInfo.userid : '',
			          faquanid: that.faquanid,
			          type: 0
			        },
			        success: function (res) {
			          i++;
			          uni.hideLoading();
			          console.log('res===========', res)
			          if (i == that.imgList.length) {
			            if (res.errMsg == "uploadFile:ok") {
			              var data = res.data;
			              console.log('data===', data)
			              data = JSON.parse(data);
			              if (data.code == 1) {
			                uni.showToast({
			                  title: '上传成功',
			                  success: function (e) {
			                    console.log('e=======', e)
			                    
								that.ideaText = '';
			                    if (that.orderid){
			                      that.order_finish();
			                    }
			                    uni.switchTab({
			                      url: '/cms/discover/discover',
			                    })
			                    
			                    
			                  }
			                })
			              } else {
			                uni.showToast({
			                  title: '上传失败',
			                })
			                
							that.disable = true;
			              }
			            }
			          } else if (i < that.imgList.length) {
			            that.upLoadImg(i);
			          }
			        },
			        fail: function (res) {
			          console.log('fail');
			        },
			      })
			    },
			  
			  
			  
			    readAgreement: function (e) {
				  this.flag = 0;
			    },
			  
			    checkBox: function (e) {
			      
				  this.tchecked = e.detail.value[0] ? true : false;
			    },
			  
			    selectAgree: function (e) {
				  this.flag = 1;
				  this.checked = true;
			    },
			  
			  
			    order_finish:function(e){
			      var that = this;
			      wx.request({
			        url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_finish',
			        method: 'post',
			        data: {
			          orderid: that.orderid,
			          sellerid: that.abotapi.globalData.default_sellerid,
			          checkstr: userInfo.checkstr,
			          userid: userInfo.userid
			        },
			        header: {
			          'Content-Type': 'application/x-www-form-urlencoded'
			        },
			        success: function (res) {
			          //--init data
			          var code = res.data.code;
			          if (code == 1) {
			            uni.showToast({
			              title: '操作成功！',
			              duration: 2000
			            });
			           
			          } else {
			            uni.showToast({
			              title: res.data.msg,
			              duration: 2000
			            });
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
			  

		},
	}
</script>

<style>
	
	.a-top{
	  display:flex;
	  padding:0 5%;
	  justify-content:space-between;
	  font-size:32rpx;
	  height:70rpx;
	  line-height:70rpx;
	}
	
	.a-textarea{
	  height:110px; 
	  width:100%;
	  font-size: 28rpx;
	  padding-left:20rpx;
	  padding-right:20rpx;
	}
	
	.a-con-textarea{
	  width: 100%;
	  /*border-top:1px solid #8888;*/
	  border-bottom:1px solid #8888;
	  margin-top: 50rpx;
	}
	
	.camera-a{
	  border:1px solid #ccc;
	  border-radius:4px;
	  padding:18rpx;
	  display:flex;
	  flex-direction:column;
	  align-items:center;
	  width:190rpx;
	  height:190rpx;
	  justify-content:center;
	  font-size:30rpx;
	}
	.camera-a image{
	  width:88rpx;
	  height:88rpx;
	}
	
	
	.camera-a video{
	  width:88rpx;
	  height:88rpx;
	}
	
	.pub-btn-con{
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  display:flex;
	  flex-direction:column;
	  justify-content:center;
	  align-items:center;
	  padding:60rpx 0 30rpx 0;
	  background:#eee;
	}
	
	.pub-btn{
	  font-size: 40rpx;
	background: #6798E9;
	color: #fff;
	padding: 8rpx 50rpx;
	border-radius: 50px;
	height: 80rpx;
	width: 80%;
	text-align: center;
	line-height: 80rpx;
	}
	
	.pub-xieyi{
	  font-size:28rpx;
	  margin-top:24rpx;
	  height: 40rpx;
	  line-height: 40rpx;
	  display: block;
	}
	
	.pub-xieyi checkbox{
	  zoom:0.7
	}
	
	.remark-bar{
	  display:flex;
	  position:fixed;
	  bottom:50rpx;
	  width:90%;
	  justify-content:space-between;
	  padding:0 50rpx;
	  margin-left:5%;
	  font-size:30rpx;
	}
	
	.wx-popup {
	  position: absolute;
	  left: 0;
	  top: 0;
	  width: 100%;
	  height: 100%;
	  background: rgba(0, 0, 0, .5);
	}
	.popup-container {
	  position: absolute;
	  left: 50%;
	  top: 50%;
	 
	  width: 80%;
	  max-width: 600rpx;
	  border: 2rpx solid #ccc;
	  border-radius: 10rpx;
	  box-sizing: bordre-box;
	  transform: translate(-50%, -50%); 
	  overflow: hidden;
	  background: #fff;
	}
	.wx-popup-title {
	  padding: 20rpx;
	  text-align: center;
	  font-size: 28rpx;
	  border-bottom: 2rpx solid red;
	}
	
	.wx-popup-subtitle{
	  text-align:center;
	  font-size:28rpx;
	  color:#6798E9;
	  margin-top:26rpx;
	}
	.wx-popup-con {
	  margin: 60rpx 10rpx;
	  text-align: center;
	  font-size:28rpx;
	  margin-top:20rpx;
	}
	.wx-popup-btn {
	  display: flex;
	  justify-content: space-around;
	  margin-bottom: 40rpx;
	}
	.wx-popup-btn text {
	  display:flex;
	  align-items:center;
	  justify-content:center;
	  width:33%;
	  height:70rpx;
	  border-radius:88rpx;
	  background:#6798E9;
	  color:#fff;
	  font-size:28rpx;
	}
	
	.wx-popup-content{
	  height: 300px;
	  text-align: left;
	  white-space: pre-line;
	}
</style>
