<template>
	<view>
		<!-- 资料库页面  / 视频库及评论 -->
		
		<!--cms/quanquan/quanquan_details.wxml-->
		<image v-if="video_data.video_type == 'file'" :src="video_data.img_url" style='width:100%;'></image>
		<video  v-else  :src="video_data.video_url" style='width:100%;'></video>
		
		<view class='a-1' style="display: flex;">
		  <!-- 观看人数和评论 -->
		  <view style="width: 40%;">
		    
		    <text style='font-size:12px;color:#666;margin-left:12px;'>{{video_data.number}}人观看</text>
		    
		
		    <image src="../../static/img/help/write.png"  style='width:30rpx;height:30rpx;margin-left:18rpx;' @click='showRemarkInput'></image>
		    <text style='font-size:26rpx;' @click='showRemarkInput'>评论</text>
		  </view>
		
		  <!-- 收藏下载转发功能按钮 -->
		  <view style="width: 50%; display: flex;align-items: center;align-content: flex-end; text-align: right;">
		    
		    <view style="align-items: center; justify-content: center;">
		      <image :src="video_data.has_video_collect == '0' ? '../../static/img/help/star_off.png' : '../../static/img/help/star_on.png'"  @click='collectVedio' 
					style='width:30rpx;height:30rpx;margin-left:10rpx;margin-right:10rpx;'></image>
		      <text style='font-size:26rpx;' @click="collectVedio">收藏</text>
		    </view>
			
		    <view style="align-items: center; justify-content: center;">
		      <block v-if="video_data.video_type == 'video'">
		      <image v-if="faquan_one_click_to_save == 1" src="../../static/img/download.png"  
					style='width:30rpx;height:30rpx;margin-left:10rpx;margin-right:10rpx;' 
					@click="disabled ? '' : saveVedio(video_data.video_type)"></image>
		      <text  v-if="faquan_one_click_to_save == 1" style='font-size:26rpx;' 
					@click="disabled ? '' : saveVedio(video_data.video_type)" >下载</text>
		      </block>
		      <block v-if="video_data.video_type == 'file'">
			
		      <image v-if="file_one_click_download == 1" :src="video_data.file_can_be_open_in_wxa == '1' ? '../../static/img/help/click_view.png' : '../../static/img/download.png'"  
					style='width:30rpx;height:30rpx;margin-left:10rpx;margin-right:10rpx;'  
					@click="disabled ? '' : 'saveVedio'" :data-video-type="video_data.video_type"></image>
			
		      <text  v-if="file_one_click_download == 1" style='font-size:26rpx;'  @click="disabled ? '' : saveVedio(video_data.video_type)">
		        <block v-if="video_data.file_can_be_open_in_wxa == 1">查看 </block>
		        <block v-else>下载</block>
				
		      </text>
		      </block>
		    </view>
		   
			<!-- #ifdef MP-WEIXIN -->
			
			<view style="align-items: center; position: relative;">
			        <image src="../../static/img/help/share.png"  style='width:30rpx;height:30rpx;margin-left:10rpx;margin-right:10rpx;'></image>
			        <text style='font-size:26rpx;'>转发</text>
			        <button class="share" open-type="share"></button>
			</view>
			
			<!-- #endif -->
			
			<!-- #ifdef APP-PLUS -->
			<view style="align-items: center; position: relative;" @click="is_show()">
			        <image src="../../static/img/help/share.png"  style='width:30rpx;height:30rpx;margin-left:10rpx;margin-right:10rpx;'></image>
			        <text style='font-size:26rpx;'>转发</text>
			        <button class="share"></button>
			</view>
			
			<!-- #endif -->
		
		  </view>
		
		
		   
		  
		  <!-- <image src="../../images/share.png"  style='width:23px;height:23px;margin-left:9px;'></image>
		  <text style='font-size:15px;'>转发</text> -->
		  
		</view>
		
		
		
		
		<view style='font-size:12px;color:#666;margin:6rpx 24rpx 0rpx 24rpx;'>{{video_data.ext_info}}</view>
		<view style='font-size:12px;color:#666;margin:6rpx 24rpx 0rpx 24rpx;'>{{video_data.ext_info02}}</view>
		
		
		
		
		<!-- 富媒体组件 2021.1.18. -->
		<!-- rich-text  和 v-html 都有各自的优缺点 -->
		<view style="margin:50rpx 0 50rpx 0;" v-if="video_data.describe != null">
			
			<!-- #ifdef MP-ALIPAY -->
						<rich-text :nodes="index_rich_html_content"></rich-text>
			<!-- #endif -->		
			<!-- #ifdef H5 -->
					<view v-html="index_rich_html_content" ></view>
			<!-- #endif -->
			
			<!-- #ifndef MP-ALIPAY | H5 -->
					<u-parse 
						:content="index_rich_html_content" 
						@preview="index_rich_html_preview_image" 
						@navigate="index_rich_html_click_link" />
			<!-- #endif -->
			
		</view>
		
		
		<view class="userwords" v-for="(item,index) in video_remark_list" :key="index">
		    <image class="userwords_img" :src="item.headlogo"></image>
		    <view class="userwords_rit">
		        <view class="flex-bet">
		            <view>
		                <view class="userwords_color">{{item.username}}</view>
		                <view class="userwords_color2">{{item.createtime}}</view>
		            </view>
		        </view>
		        <view class="userwords_content">
		        {{item.text}}
		        </view>
		    </view>
		</view>
		
		
		
		
		  <view class="remark-bar" :animation="animationData" v-if='showCostDetail'>
		    <input class='' placeholder='评论' v-model='remarktext'></input>
		    <view  class="sendbutton" @click='sendRemark'>发送</view>
		  </view>


			<abotshare
			ref="share_api"
			@click_wxa_share="click_wxa_share"   
			@click_wxa_circle_share='click_wxa_circle_share'  
			@click_wxa_applet_share='click_wxa_applet_share'  
			@click_wxa_system_share='click_wxa_system_share'
			></abotshare>
	</view>
</template>

<script>
	import abotshare from '../../components/abot_share_api/abot_share_api.vue';
	import abotsharejs from '../../common/abot_share_api.js';
	
	import uParse from '@/components/gaoyia-parse/parse.vue'
	
	// #ifdef MP-ALIPAY
		import parseHtml from "../../common/html-parser.js"
	// #endif
	
	
	export default {
		components:{
			abotshare,			
			uParse
		},
		data() {
			return {
			    faquan_one_click_to_save:0,
				videoid:'',
				video_data:[],
				video_remark_list:[],
				file_one_click_download:0,
				showCostDetail:false,
				remarktext:'',
				disabled:false,
				animationData:'',
				
				current_params_str:'',
				
				index_rich_html_content:'<div></div>'
			};
		},
		onLoad(options) {
			var that = this;
			
			//=====分析参数=====
			
			if (options && options.userid) {
			  this.abotapi.set_current_parentid(options.userid);
			}
			
			if(options){
			  var arr = Object.keys(options);
			  var options_len = arr.length;
					
			  if (options_len > 0){
				var params_str = '';
					
				for(var key in options){
				  params_str += key+'='+options[key]+'&';
				}
				params_str = params_str.substr(0, params_str.length - 1);
					
				this.current_params_str = params_str;
			  }
			}
			//===== End ======
			
			var userInfo = this.abotapi.get_user_info();
			
			    
			var videoid = options.videoid;
			
			this.abotapi.set_option_list_str(null, this.abotapi.getColor());
			
			if(options.videoid){
				this.videoid = videoid;
			}
			
			    
			this.abotapi.abotRequest({
				url:this.abotapi.globalData.yanyubao_server_url + '/openapi/VideoListRemarkData/get_video_detail',
				method: 'post',
				data: {
				  appid: this.abotapi.globalData.xiaochengxu_appid,
				  sellerid: this.abotapi.globalData.default_sellerid,
				  userid: userInfo ? userInfo.userid : '',
				  videoid: that.videoid,
				},
				success: function (res) {
				  
				  console.log(res);
				  var data = res.data.data;
							
				  if(res.data.code == 1){
				    that.video_data = data.video_data;
					that.video_remark_list = data.video_remark_list;
					
					if(data.video_data.describe){
						that.index_rich_html_content = data.video_data.describe;
						
						
						// #ifdef MP-ALIPAY
							console.log('that.index_rich_html_content====>>>>', that.index_rich_html_content);
							
							const filter = that.$options.filters["formatRichText"];
							that.index_rich_html_content = filter(that.index_rich_html_content);
							
							console.log('that.index_rich_html_content====>>>>', that.index_rich_html_content);
							
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
						
						
					}
							
				    uni.setNavigationBarTitle({
				      title: data.video_data.title
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
			
			
			this.get_video_list_option();
			
		},
		
		
		onShow(){
			
		},
		onReady(){
			
		},
		onPageScroll(e) {
			
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			
		},
		/**
	   * 用户点击右上角分享
	   */
		onShareAppMessage: function (res) {
			var userInfo = this.abotapi.get_user_info();
			
			return {
			  title: '' + this.video_data.title,
			  path: '/cms/quanquan/quanquan_details?videoid=' + this.videoid + '&userid=' + userInfo.userid,
			  success: function (res) {
				// 分享成功
			  },
			  fail: function (res) {
				// 分享失败
			  }
			}
		},
		onShareTimeline: function () {
			console.log('app.globalData.shop_name : '+app.globalData.shop_name);
			var userInfo = this.abotapi.get_user_info();
			return {
				title: this.video_data.title,
				query: 'videoid=' + this.videoid + '&userid=' + userInfo.userid, 
				imageUrl:this.video_data.img_url
			}
			
			return this.share_return();
		},
		onAddToFavorites: function () {
			 return this.onShareTimeline();
		},
	
		/**
		* 页面相关事件处理函数--监听用户下拉动作
		*/
		onPullDownRefresh: function () {
			this.getVideoList();
			console.log('下拉刷新==')
			this.onLoad();
			this.onShow();
			console.log('下拉刷新==============')
			// app.set_option_list_str(this, this.getShopOptionAndRefresh);
			//停止当前页面的下拉刷新
			uni.stopPullDownRefresh();
		},
	  
	
		
		methods: {
			check_user_login:function(){
				//判断登录
				var userInfo = this.abotapi.get_user_info();		
				if(!userInfo || !userInfo.userid){
					var last_url = '/cms/quanquan/quanquan_details?videoid=' + this.videoid;
					
					this.abotapi.goto_user_login(last_url, 'normal');
					
					return 0;				
				}
				
				return 1;
			},
			
			get_video_list_option:function(){
				
			    var that = this;
				
			    this.abotapi.abotRequest({
			      url: this.abotapi.globalData.yanyubao_server_url + '/openapi/VideoListRemarkData/get_option_list',
			      method: 'post',
			      data: {
			        sellerid: this.abotapi.globalData.default_sellerid,
			      },
			      success: function (res) {
			        if(res.data.code == 1){
						console.log('=======>res',res);
						var option_list = res.data.data;
									
						if(option_list.faquan_one_click_to_save){
							that.faquan_one_click_to_save = option_list.faquan_one_click_to_save;
							that.file_one_click_download = option_list.file_one_click_download;
						}
			        }
			      }
			    });
			  },
			  
			  
			  //下载视频
			  saveVedio:function(e){
				  console.log('saveVedio=====>>>>>', e);
				  
				  if(this.check_user_login() != 1){
					  return;
				  }
				  
				  
			    var that = this;
			
			    var last_url = '/cms/quanquan/quanquan_details?videoid=' + that.videoid;
			
			
			    var userInfo = this.abotapi.get_user_info();
			    
			    var video_type = e;
			
			    this.abotapi.abotRequest({
			      url: this.abotapi.globalData.yanyubao_server_url + '/openapi/FaquanData/download_file_token?from=video_list',
			      data: {
			        sellerid: this.abotapi.globalData.default_sellerid,
			        userid: userInfo.userid,
			        checkstr:userInfo.checkstr,
			        videoid: that.videoid,
			        text: that.remarktext,
			        video_type:video_type,
			      },
			      success: function (res) {
					  
			        if(!res || (res.data.code != 1)){
			          uni.showModal({
			            cancelColor: 'cancelColor',
			            title:'提示',
			            content:res.data.msg,
			            showCancel:false
			          })
			
			          return;
			        }
			
			        var download_token = res.data.download_token;
			
			
			        if(that.video_data.file_can_be_open_in_wxa != 1){
			
			          var video_url = that.video_data.video_url;
			          
			          uni.setClipboardData({
			            data: video_url,
			          })
			
			          uni.showModal({
			            title:'下载链接已经复制',
			            showCancel:false,
			            content: '下载链接'+video_url+'已经复制到剪切板，请用浏览器下载。',
			          })
			
			          return;
			
			        }
					
					//组织文件的下载地址
					var file_url = that.abotapi.globalData.yanyubao_server_url + '/openapi/FaquanData/download_file_02?url=';
					file_url += encodeURIComponent(that.video_data.video_url);
					file_url += '&userid='+userInfo.userid+'&download_token='+download_token;
					
					//如果是在APP中，没有安全域名的限制，直接下载文件网址
					// #ifdef APP-PLUS
						file_url = that.video_data.video_url;
					// #endif
			        
			
					that.disabled = true;
			        
			        if(video_type == 'file'){
			          uni.showLoading({
			            title: '正在下载文件',
			          })
			        }else if(video_type == 'video'){
			          uni.showLoading({
			            title: '正在下载视频',
			          })
			        }
			       
			
			        
			        const downloadTask = uni.downloadFile({
			          url: file_url, //仅为示例，并非真实的资源
			          //filePath:aaa,
			          header:{userid:userInfo.userid, sellerid:that.abotapi.globalData.default_sellerid},
			          success(res) {
			            //wx.hideLoading();
			            
			            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
			            if (res.statusCode === 200) {
			              if(video_type == 'file'){
			                //普通文件
			                uni.openDocument({
			                  filePath: res.tempFilePath,
			                  success: function (res) {
			
			                  },
			                  fail(res){
			                    uni.showToas ({
			                      title: '打开文档失败',
			                    })
			                    
			                  }
			                })
			                
			              }else if(video_type == 'video'){
			                uni.saveVideoToPhotosAlbum({
			                  filePath: res.tempFilePath,
			                  success(res) {
			                    that.disabled = false;
			                    uni.showToast({
			                      title: '下载成功',
			                    })
			                    
			                  },
			                  fail:function(res){
			                    
			                    uni.hideLoading();
			                  }
			                })
			              }
			
			            }
			          },
			          fail:function(res){
			            uni.showToast({
			              title: '下载失败',
			            })
			            
			            uni.hideLoading();
			          },
			          complete:function(res){
			            uni.hideLoading();
			          }
			        })
			
			        downloadTask.onProgressUpdate((res) => {
			          console.log('下载进度', res.progress)
			          console.log('已经下载的数据长度', res.totalBytesWritten)
			          console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
			        })
			      }
			    });
			  },
			
			//app  分享点击
			click_wxa_share:function (){
				abotsharejs.click_wxa_share(this.share_href, this.share_titles, this.share_summary, this.share_imageUrl);
			},
			
			click_wxa_circle_share:function (){
				abotsharejs.click_wxa_circle_share(this.share_href, this.share_titles, this.share_summary, this.share_imageUrl);
			},
			
			
			click_wxa_applet_share:function (){
				
				var path = 'pages/shopDetail/shopDetail?shangid='+ this.current_xianmai_shangid;
				var account = this.abotapi.globalData.xiaochengxu_account;
				abotsharejs.click_wxa_applet_share(this.share_href, this.share_titles, path, this.share_imageUrl, account);
			},
			
			
			click_wxa_system_share:function (){
				
				abotsharejs.click_wxa_system_share(this.share_summary, this.share_href);
			},
			
			is_show:function(){
				this.$refs.share_api.is_show();
			},
			
			
			inputContent:function(e){
				var remarktext = e.detail.value;
				this.remarktext = remarktext;
			},
			  
			sendRemark:function(){
				if(this.check_user_login() != 1){
					return;
				}
				
				var that = this;
			  
				var last_url = '/cms/quanquan/quanquan_details?videoid=' + that.videoid;
			  
				
				var userInfo = this.abotapi.get_user_info();
			      
				this.abotapi.abotRequest({
			        url: this.abotapi.globalData.yanyubao_server_url + '/openapi/VideoListRemarkData/add_video_remark',
			        data: {
			          sellerid: this.abotapi.globalData.default_sellerid,
			          userid: userInfo.userid,
			          checkstr:userInfo.checkstr,
			          videoid: that.videoid,
			          text: that.remarktext
			        },
			        success: function (res) {
			  
			          if(res.data.code == 1){
			            
						that.remarktext = '';
			            
			  
			            uni.showModal({
			              cancelColor: 'cancelColor',
			              title:'提示',
			              content:res.data.msg,
			              showCancel:false
			            })
			          }
			          else{
			            uni.showModal({
			              cancelColor: 'cancelColor',
			              title:'提示',
			              content:res.data.msg,
			              showCancel:false
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
			  
			  
			    collectVedio:function(e){
					if(this.check_user_login() != 1){
						return;
					}
					
			      var that = this;
			  
			      var last_url = '/cms/quanquan/quanquan_details?videoid=' + that.videoid;

			      var userInfo = this.abotapi.get_user_info();
			  
			      if ('is_get_userinfo' in userInfo){

			        var is_get_userinfo = userInfo.is_get_userinfo;
			      }
				  
				  if(!uni.getSystemInfoSync().platform == 'android' && !uni.getSystemInfoSync().platform == 'ios'){
					  if (!is_get_userinfo) {
					  
					    uni.setStorageSync('get_userinfo_last_url', '/cms/quanquan/quanquan_details?videoid=' + that.videoid)
					  			  
					    uni.navigateTo({
					      url: '/pages/login/login_get_userinfo',
					    });
					  
					    return;
					  }
				  }

			      

					this.abotapi.abotRequest({
						url: this.abotapi.globalData.yanyubao_server_url + '/openapi/VideoListRemarkData/add_video_collect',
						data: {
							sellerid: this.abotapi.globalData.default_sellerid,
							userid: userInfo.userid,
							checkstr:userInfo.checkstr,
							videoid: that.videoid,
						},
						success: function (res) {

							if (that.video_data.has_video_collect == '0'){
								that.video_data.has_video_collect = '1'
								uni.showToast({
								  title: '收藏成功',
								})
							}else{
								that.video_data.has_video_collect = '0'
								uni.showToast({
								  title: '取消收藏成功',
								})
							}
							
							that.video_data = that.video_data;
							return;
						},
						fail: function (e) {
						  uni.showToast({
							title: '网络异常！',
							duration: 2000
						  });
						},
					})
			    },
			  
			    showRemarkInput:function(e){
			      var that = this;
			  
			      var last_url = '/cms/quanquan/quanquan_details?videoid=' + that.videoid;
			  
			      
			      var userInfo = this.abotapi.get_user_info();
				  console.log('1111122222',userInfo);
			      if ('is_get_userinfo' in userInfo) {
			        var is_get_userinfo = userInfo.is_get_userinfo;
					console.log('1111122222',is_get_userinfo);
			      }
				  
				  
				  if(!uni.getSystemInfoSync().platform == 'android' && !uni.getSystemInfoSync().platform == 'ios'){
					  if (!is_get_userinfo) {
					    uni.setStorageSync('get_userinfo_last_url', '/cms/quanquan/quanquan_details?videoid=' + this.videoid)
					    uni.navigateTo({
					      url: '/pages/login/login_get_userinfo',
					    });
					  					
					    return;
					  }
				  }
				  
			      
				  
			      if (!this.showCostDetail){
					  console.log(1);
			        var animation = uni.createAnimation({
			          duration: 200,
			          timingFunction: "linear",
			          delay: 0
			        })
					
			        animation.translateY(100).step()
			        
					this.animationData = animation.export();
					this.showCostDetail = true;
					
					
			        setTimeout(function () {
			          animation.translateY(0).step()
			          this.animationData = animation.export();
			        }.bind(this), 200)
			      } else {
					  console.log(2);
			        var animation = uni.createAnimation({
			          duration: 200,
			          timingFunction: "linear",
			          delay: 0
			        })
			        animation.translateY(100).step()
			        this.animationData = animation.export();
			        
					setTimeout(function () {
						
			          animation.translateY(0).step()
			          this.showCostDetail = false;
					  
			        }.bind(this), 200)
			      }
			    },
				
				//富媒体 图片被点击
				index_rich_html_preview_image:function(img_src, e){
				},
				
				//富媒体 链接点击事件
				index_rich_html_click_link:function(new_url, e){
					
					console.log('index_rich_html_click_link====>>>>>', new_url);
					
					this.abotapi.call_h5browser_or_other_goto_url(new_url);
					
					
				},
		},
	};
</script>

<style>
	/* cms/quanquan/quanquan_details.wxss */
	.a-1{
	  width:100%;
	  border-bottom:2px solid red;
	  height:82rpx;
	  line-height:74rpx;
	
	}
	
	
	
	
	.userwords {
	    background-color: white;
	    padding: 20rpx;
	    font-size: 26rpx;
	    display: flex;
	    border-bottom: 1rpx solid #eee;
	    padding-top: 50rpx;
	}
	
	.userwords:last-child {
	    padding-bottom: 90rpx;
	}
	
	.userwords_img {
	    width: 100rpx;
	    height: 100rpx;
	    border-radius: 50%;
	}
	
	.userwords_rit {
	    width: 590rpx;
	    margin-left: 20rpx;
	}
	
	.userwords_content {
	    margin-top: 20rpx;
	    color: #666;
	}
	
	
	.kuangs {
	    position: absolute;
	    content: "";
	    border-width: 15rpx;
	    border-style: solid;
	    border-color: transparent transparent #eee #eee;
	    transform: rotate(135deg);
	    left: 50rpx;
	    top: -12rpx;
	}
	
	.userwords_box {
	    background-color: #eee;
	    padding: 10rpx 15rpx;
	    line-height: 40rpx;
	    margin-top: 20rpx;
	    position: relative;
	}
	
	.userwords_one {
	    color: #666;
	}
	
	.userwords_mar {
	    margin: 0rpx 10rpx;
	}
	
	.userwords_color {
	    color: #4395f5;
	}
	
	.userwords_color2 {
	    color: #999;
	}
	.share_box{
	/* width:220rpx; */
	height:60rpx;
	float:right;
	position:relative;
	left:37px;
	}
	.share_hide{
	  width:220rpx;
	  height:60rpx;
	  position:absolute;
	  overflow:hidden;
	  top:0;
	  right:0;
	  font-size:26rpx;
	  line-height:86rpx;
	}
	.share_hide image{
	  width: 100%;
	  height: 100%;
	}
	.share{
	  width:200rpx;
	  height:70rpx;
	  position: absolute;
	  top:-5rpx;
	  left:38rpx;
	  background:transparent;
	  opacity: 0;
	}
	
	.remark-bar{
	  display:flex;
	  position:fixed;
	  bottom:40rpx;
	  font-size:30rpx;
	  justify-content:space-between;
	  width:90%;
	  margin-left:5%;
	  background: #fff;
	  align-items:center;
	}
	
	.remark-bar input{
	  border:1px solid #999;
	  border-radius:40px;
	  padding-left:20rpx;
	  padding-right:20rpx;
	  height:60rpx;
	  padding-top:8rpx;
	}
	
	.sendbutton{
	  background:#6798E9;
	  color:#fff;
	  font-size:28rpx;
	  width:130rpx;
	  text-align:center;
	  height:60rpx;
	  line-height:60rpx;
	  padding:center;
	  border-radius:60rpx;
	}
</style>
