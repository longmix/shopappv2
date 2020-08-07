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
		    <view class='pub-btn' @click="publishIdea" :style="{background:btn_bg_color}">立即发布</view>
		    <checkbox-group @change="checkBox" class="" v-if="faquan_xieyi_status=='1'">
			  <label class='pub-xieyi' v-if="faquan_xieyi_show_directly == 1">
				<checkbox :value="checked"  :checked="checked"/>我已阅读并同意以下协议
			  </label>
		      <label class='pub-xieyi'  v-if="faquan_xieyi_show_directly == 0">
		        <checkbox :value="checked"  :checked="checked"/>完成立即发布表示同意
		      </label>
			  <view v-if="faquan_xieyi_show_directly == 0" @click='readAgreement' style='float:right;color:red;margin-top:24rpx;height: 40rpx;line-height: 40rpx;'>《{{faquan_xieyi_title}}》</view>
			  
		    </checkbox-group >
		  </view>
		</view>
		
		<view class="wx-popup" v-if="flag == 2">
		  <view class='popup-container'>
		    <view class="wx-popup-title">发布许可协议</view>
		    <view class="wx-popup-subtitle">{{faquan_xieyi_title}}</view>
		    <view class="wx-popup-con">
		      
		    <scroll-view scroll-y class="a-1 wx-popup-content" :scroll-left="scrollLeft" bindscrolltolower="lower"  >     
		     {{faquan_xieyi_content}}      
		    </scroll-view>  
		
		
		    </view>
		    <view class="wx-popup-btn">
		      <text class="btn-ok" @click='selectAgree'>同意协议</text>
		    </view>
		  </view>
		</view>
		
		<!-- 1 显示在立即发布按钮下方  0 弹窗-->
		<view class='' v-if="faquan_xieyi_show_directly == 1 && faquan_xieyi_status == 1">
		    <view class="wx-popup-title">{{faquan_xieyi_title}}</view>
		    <view class="wx-popup-subtitle" style="display:none;"></view>
		    <view class="wx-popup-con">
		      
		    <scroll-view scroll-y class="a-1" :scroll-left="scrollLeft" bindscrolltolower="lower" style="height: 600rpx;">     
		     <text>{{faquan_xieyi_content}}</text>
		    </scroll-view>  
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
				faquan_xieyi_status:1,
				faquan_xieyi_title:'',
				faquan_xieyi_content:'',
				faquan_xieyi_show_directly:1,
				video:'',
				xianmai_shangid:'',
				orderid:'',
				ideaText:'',
				scrollLeft:'',
				btn_bg_color:'',
			}
		},
		
		onLoad: function (options) {
			//1、获取选项
			var last_url = '/cms/publish/publish'; //跳转授权头像之后再跳转的页面
			
			if (options.publishtype) {
				this.publishtype = options.publishtype;
				//授权头像的参数拼接
				if(last_url.indexOf("?") != -1){
					last_url += '&publishtype=' + options.publishtype;
				}else{
					last_url += '?publishtype=' + options.publishtype;
				}
				
			}
			
			if (options.xianmai_shangid){
				this.xianmai_shangid = options.xianmai_shangid
				//授权头像的参数拼接
				if(last_url.indexOf("?") != -1){
					last_url += '&xianmai_shangid=' + options.xianmai_shangid;
				}else{
					last_url += '?xianmai_shangid=' + options.xianmai_shangid;
				}
			}
			
			if (options.orderid) {
			  this.orderid = options.orderid;
			  //授权头像的参数拼接
			  if(last_url.indexOf("?") != -1){
			  	last_url += '&orderid=' + options.orderid;
			  }else{
			  	last_url += '?orderid=' + options.orderid;
			  }
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
				
				var last_url = '/cms/discover/discover?display_type=my';
				
				that.abotapi.goto_user_login(last_url, 'normal');
				return;
			}
			
			
			
			this.btn_bg_color = this.abotapi.getColor();
			
			
			
			//4、获取发圈设置
			this.abotapi.getFaquanSetting(this, this.callback_xieyi_content);
			
		},
		
		onShow: function () {
			var last_url = '/cms/publish/publish'; //跳转授权头像之后再跳转的页面
			
			//3、如果需要用户授权头像和昵称
			if(this.abotapi.goto_get_userinfo(last_url)){
			  return;
			}
			
		},
		
		onHide: function () {
			// 页面隐藏
		},
		onUnload: function () {
			// 页面关闭
		},
		methods: {
			callback_xieyi_content: function (that, cms_faquan_setting) {
			console.log('cms_faquan_setting',cms_faquan_setting);
				that.abotapi.getColor();
			    
				if (!cms_faquan_setting) {
			
					return;
			    }
			
			    
			
			    if (cms_faquan_setting.faquan_xieyi_status) {
					//发圈协议状态是否启用
					that.faquan_xieyi_status = cms_faquan_setting.faquan_xieyi_status;
			      
			    }
			
			    if (cms_faquan_setting.faquan_xieyi_title) {
					//《》中间的文字内容
			      console.log('cms_faquan_setting.faquan_xieyi_title',cms_faquan_setting.faquan_xieyi_title);
					that.faquan_xieyi_title = cms_faquan_setting.faquan_xieyi_title;
			    }
			
			
			    if (cms_faquan_setting.faquan_xieyi_content) {
					//协议内容
					that.faquan_xieyi_content = cms_faquan_setting.faquan_xieyi_content;
			    }
				if (cms_faquan_setting.faquan_xieyi_show_directly) {
					//显示方式
					that.faquan_xieyi_show_directly = cms_faquan_setting.faquan_xieyi_show_directly;
				  
				}
				
				uni.setNavigationBarTitle({
					title:cms_faquan_setting.faquan_page_title
			
				})
				
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
				console.log('===>>>>>.',that.abotapi.globalData.xiaochengxu_appid);
				var data_params = {
					sellerid: that.abotapi.globalData.default_sellerid,
					appid: that.abotapi.globalData.xiaochengxu_appid,
					userid: userInfo ? userInfo.userid : '',
				
					text: that.ideaText ? that.ideaText: '',
				}
				
				if(that.xianmai_shangid){
					data_params.faquan_type = 1;
					data_params.extend_id = that.xianmai_shangid;
					data_params.xianmai_shang_orderid = that.orderid;
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
												
												uni.showModal({
													title: '上传成功',
													showCancel:false,
													success: function (e) {
														if (res.confirm) {
															//确定
															console.log('e=======456', e)
															
															that.ideaText = '';
															if (that.orderid){
																that.order_finish();
															}
															console.log('e=======123')
															uni.navigateTo({
																url: '/cms/discover/discover?display_type=my',
															})
														}
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
							
							uni.showModal({
								title: '上传成功',
								showCancel:false,
								success: function (e) {
									if (res.confirm) {
										//确定
										console.log('e=======', e)
										
										that.ideaText = '';
										if (that.orderid){
										  that.order_finish();
										}
										uni.navigateTo({
										  url: '/cms/discover/discover?display_type=my',
										})
									}
								}
							})
							
			              } else {
			               uni.showModal({
			               	title: '提示',
			               	content:'上传失败',
			               	showCancel:false,
			               });
			                
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
				  this.flag = 2;
			    },
			  
			    checkBox: function (e) {
			      
				  this.tchecked = e.detail.value[0] ? true : false;
			    },
			  
			    selectAgree: function (e) {
				  this.flag = 1;
				  this.checked = !this.checked;
			    },
			  
			  
			    order_finish:function(e){
			      var that = this;
				  var userInfo = that.abotapi.get_user_info();
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
			            /*uni.showModal({
			            	title: '提示',
							content:res.data.msg,
							showCancel:false,
			            });*/
						return;
			          }
					  
					  that.abotapi.call_h5browser_or_other_goto_url('/pages/user/user');
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
	  float:left;
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
