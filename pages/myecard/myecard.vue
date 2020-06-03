<template style="padding: 0upx;margin: 0upx;">
	<view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				card_data_option:[],
				get_ecard_option_list:[],
				toutiao_item_id:''
			}
		},
		onLoad(option){
			
		
		
			
			this.abotapi.set_shop_option_data(this, this.callback_function_shop_option_data);
			
			
		},
	//调用接口
	methods:{
		
		callback_function_shop_option_data:function(that, option_data){
			console.log('option_data========',option_data);
			
			that.abotapi.getColor();
			
			that.card_data_option = option_data.card_data;
			
			this.abotapi.abotRequest({
			    url:that.abotapi.globalData.yanyubao_server_url+'index.php?g=Yanyubao&m=Xiaochengxu&a=get_user_card',
			    method: 'POST', //请求方式
				data: {
					//sellerid : that.abotapi.get_sellerid()
					sellerid : 'pQNNmSkaq'
				},
			    success(res){
			        console.log("aaaaaaa",res)
					
					var data = res.data.data;
					that.card_data_option = data;
			    },
			    fail(error){
			        console.log("bbbbbbbbbbbb",error)
			    }
			})
			
			
			this.abotapi.abotRequest({
			    url:that.abotapi.globalData.yanyubao_server_url+'Yanyubao/Xiaochengxu/get_ecard_option_list',
			    method: 'POST', //请求方式
				data: {
					//sellerid : that.abotapi.get_sellerid()
					sellerid : 'pQNNmSkaq'
				},
			    success(res){
			        console.log("aaaaaaa",res)
					var data = res.data.data;
					that.get_ecard_option_list = data.data;
			    },
			    fail(error){
			        console.log("bbbbbbbbbbbb",error)
			    }
			})
		
			
		},
		
		
		 cancel: function () {
			 
		      var that=this;
		      that.hidden = true;
			  
		  },
		  confirm: function () {
			  
		   uni.navigateTo({
		      url: '../login/login',
			  
		    });
		
		  },
		
		myChat:function(){
		  var userInfo = this.abotapi.get_user_info();
		  if ((!userInfo) || (!userInfo.uwid)||(!userInfo.userid)) {
		    uni.navigateTo({
		      url: '/pages/login/login',
		    })
		    return;
		  }else{
		    uni.showLoading({
		      title: '信息读取中……',
		    });
		
		    var url = this.abotapi.globalData.http_server + '/index.php?g=Yanyubao&m=Xiaochengxu&a=one_click_login_str';
		    var data = {
		      uwid: userInfo.uwid,
		      sellerid: this.abotapi.get_sellerid(),
		      checkstr: userInfo.checkstr,
		    }
		
		    var cbSuccess1 = function (res) {
		      uni.hideLoading()
		 
		      console.log('1111111111111111111')  
		      console.log(res);
		
		      if (res.data.code == 1) {
		        console.log('0000000')
		
		        var url = 'https://yanyubao.tseo.cn/Home/OnlineChat/chat.html?ensellerid=';
		        url += this.abotapi.get_sellerid();
		        url += '&oneclicklogin='+res.data.oneclicklogin;
		
		        uni.navigateTo({
		          url: '../h5browser/h5browser?url='+encodeURIComponent(url),
		        });
		
		        return;
		
		
		
		
		
		      }
		      else if (res.data.code == -1) {
		        
		        //uwid登录超时，可能是一样的openid在其他地方被打开
		        uni.navigateTo({
		          url: '../login/login'
		        });
		      }
		    };
		    var cbError1 = function (res) {
		      uni.hideLoading()
		
		    };
		    this.abotapi.httpPost(url, data, cbSuccess1, cbError1);
		  }
		},
		
		
		  payMoney:function(){
		    uni.navigateTo({
		      url: '../payment/payment'
		    });
		  },
		
		  clearStorge:function(){
		    uni.clearStorageSync();
		    console.log('清空完成，sellerid：'+this.abotapi.get_sellerid());
		  },
		  openLocation: function () {
		    
		    //var value = e.detail.value
		    uni.openLocation({
		      longitude: Number(this.data.longitude),
		      latitude: Number(this.data.latitude)
		    })
		  },
		  onLoad: function (options) {
		    //console.log('111111111111111111:' +app.globalData.xiaochengxu_appid);
		
		    uni.setNavigationBarTitle({
		      title: this.abotapi.globalData.shop_name
		    })
		
		    // const accountInfo = uni.getAccountInfoSync()
		    // console.log(accountInfo);
		    // console.log(accountInfo.miniProgram.appId) // 小程序 appId
		    // console.log(accountInfo.plugin.appId) // 插件 appId
		    // console.log(accountInfo.plugin.version) // 插件版本号， 'a.b.c' 这样的形式
		
		    var that = this
		    
		    //console.log(encodeURIComponent('https://yanyubao.tseo.cn/unia/?sellerid=pQNNmSkaq'));
		    //console.log(decodeURIComponent(encodeURIComponent('https://yanyubao.tseo.cn/unia/?sellerid=pQNNmSkaq')));return;
		    
		    //请求服务器,刷新卡券信息
		    console.log('网页参数如下:');
		    console.log(options); //console.log(options.sellerid);
		
		    var q = options.q;
		    var sellerid = null;
		
		    //q = 'https%3A%2F%2Fyanyubao.tseo.cn%2Funia%2F%3Fsellerid%3DpXzizSkVa';
		
		    //console.log(typeof(q));
		    if (typeof(q) != 'undefined') {
		      console.log('获取到带参二维码参数q：'+q);
		      q = decodeURIComponent(q);
		      console.log('decodeURI转码后的q：'+q);
		
		      sellerid = q.replace('https://yanyubao.tseo.cn/unia/?sellerid=', '');
		      if(sellerid.length > 20){
		        sellerid = sellerid.replace('https%3A%2F%2Fyanyubao.tseo.cn%2Funia%2F%3Fsellerid%3D', '');
		      }
		      
		      console.log('从q参数得到的sellerid：'+sellerid);
		      
		    }
		    
		    console.log('sellerid 01：' + sellerid);
		    //if (!sellerid && typeof (sellerid) != "undefined" && sellerid != 0){
		    if (!sellerid) {
		      sellerid = options.sellerid;
		      console.log('sellerid 02：' + sellerid);
		      
		    }
		
		    if (!sellerid) {
		      sellerid = options.scene;
		      console.log('sellerid 03：' + sellerid);
		
		    }
		
		    if (!sellerid) {
		      sellerid = this.abotapi.get_sellerid();
		      console.log('sellerid 04：' + sellerid);
		    }
		
		    console.log('sellerid 05：' + sellerid);
		
		    if(!sellerid){
		      console.log('!!!!!!缺少商户ID，使用默认的' + this.abotapi.globalData.default_sellerid);
		      /*uni.navigateTo({
		        url: '../index/index?q=' + encodeURIComponent('https://yanyubao.tseo.cn/unia/?sellerid=' + app.globalData.default_sellerid)
		      });
		      return;*/
		
		      sellerid = this.abotapi.globalData.default_sellerid;
		      
		    }
		
		    //==============读取扩展配置==============
		    let extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {}
		    if(extConfig.force_sellerid_flag == 1){
		      sellerid = extConfig.force_sellerid_value;
		    }
		    //console.log('0000000000000000000000000000:' + extConfig.force_sellerid_value);
		
		    //=======================End============
		    this.abotapi.globalData.sellerid = sellerid
		    this.abotapi.set_sellerid(sellerid);
		    console.log('当前sellerid:'+sellerid+"，来自请求"+q);
		       
		/*
		    var sellerid = options.sellerid;
		    if (typeof(sellerid) == 'undefined') {
		      uni.navigateTo({
		        url: '../index/index?sellerid=pQNNmSkaq'
		      })      
		    }*/
		    
		    //调用应用实例的方法获取全局数据
		    console.log("index:onLoad:this.abotapi.getUserInfo:");
		
		    var userInfo = this.abotapi.get_user_info();
		
		    console.log(userInfo);
		    console.log(83838383)
		    //更新数据
		  
		      that.userInfo = userInfo;
		 
		
		
		    //检查用户是否绑手机号码 
		    if ((!userInfo) || (!userInfo.userid) || (userInfo.userid == 0)) {
				
		      that.hidden = false;
		    
		    }
		
		    if (!userInfo){
		      userInfo = new Object();
		      userInfo.uwid = 0;
		      userInfo.userid = 0;
		      userInfo.checkstr = '';
		
		    }
		
		
		
		   this.abotapi.globalData.sellerid = sellerid
		
		    console.log("准备获取uwid[" + this.abotapi.globalData.userInfo.uwid + "]的商户[" + this.abotapi.globalData.sellerid + "]会员卡信息");
		
		    uni.showLoading({
		      title: '数据加载中……',
		    });
		
		    var url = this.abotapi.globalData.http_server + '/index.php?g=Yanyubao&m=Xiaochengxu&a=get_user_card';
		    var data = {
		      sellerid: sellerid,
		      checkstr: userInfo.checkstr,
		      uwid: userInfo.uwid,
		      userid: userInfo.userid,
		      //data_unia_str: encodeURI(JSON.stringify(app.globalData.userInfo))  //用于更新服务器端用户的头像和昵称
		    };
		
		    var cbSuccess = function (res) {
		      uni.hideLoading();
		
		      console.log(res);
		
		      if (res.data.code == -1) {
		        //删除本地存储的用户数据
		        this.abotapi.del_user_info();
		
		        //console.log(app.get_user_info());
		        //console.log(app.globalData.userInfo);
		        console.log('asaaaaaaaaaaaaaaaaaaa');
		
		        uni.redirectTo({
		          url: '../help/help'
		        });
		        return;
		      }
		      else if (res.data.code == 1) {
		        console.log(22222222222222222222);
		        console.log(res.data.data.card_name);
		        var card_desc = res.data.data.card_desc
		        if (card_desc==null){
		          card_desc ='';
		        }
		        
		          that.card_no = res.data.data.card_no;
		          that.card_name = res.data.data.card_name;
		          that.card_name_color = res.data.data.card_name_color;
		          that.card_desc = card_desc;
		          that.card_desc_color = res.data.data.card_desc_color;
		          that.level_name = res.data.data.level_name;
		          that.member_score = res.data.data.member_score;
		          that.quan_count = res.data.data.youhui_count;
		          that.youhui_count =  res.data.data.youhui_count;
		          that.score_log_count =  res.data.data.score_log_count;
		          that.youhui_new_count =  res.data.data.youhui_new_count;
		          that.hongbao_count =  res.data.data.hongbao_count;
		          that.card_no_color =  res.data.data.card_no_color;
		          that.card_bg_img =  res.data.data.card_bg_img;
		          that.card_logo =  res.data.data.card_logo;
		          that.balance =  res.data.data.balance;
		          that.shang_name =  res.data.data.shang_name;
		          that.shang_address =  res.data.data.shang_address;
		          that.shang_telephone =  res.data.data.shang_telephone;
		          //copyright_info: res.data.data.copyright_info,
		          that.latitude =  res.data.data.latitude;
		          that.longitude =  res.data.data.longitude;
		      
		 
		        if (res.data.data.shang_plugin_list) {
		
		         
		            that.plugin_list =  'plugin_list';
		            that.plugin_data_list = res.data.data.shang_plugin_xiaochengxu_list;
		    
		        }
		
		        uni.request({
		          url: this.abotapi.globalData.http_server + '/index.php?g=Yanyubao&m=Xiaochengxu&a=about_supplier',
		          data: {
		            sellerid: this.abotapi.get_sellerid(),
		            checkstr: userInfo.checkstr,
		            uwid: userInfo.uwid,
		            userid: userInfo.userid
		          },
		          header: {
		            "Content-Type": "application/x-www-form-urlencoded"
		          },
		          method: "POST",
		          success: function (res) {
		            uni.hideLoading();
		
		
		            console.log(res.data);
		            // that.setData({
		            //   supplier_info: res.data.data,
		            //   currentTab: 0
		            // });
		
		            if(res.data.data && res.data.data.shanghu_image_list){
		              
		                that.shanghu_img_list =  res.data.data.shanghu_image_list;
		            
		            }
		          }
		        })
		
		        uni.setNavigationBarTitle({
		          title: that.data.shang_name //页面标题为服务器返回数据
		        })
		
		        uni.setStorage({
		          key: "supplierInfo",
		          data: res.data.data
		        })
		
		        this.abotapi.globalData.userInfo.usersn = res.data.data.usersn;
		        
		        console.log('获取会员卡信息成功：');
		        console.log(this.abotapi.globalData.userInfo);
		      }
		
		    };
		    var cbError = function (res) {
		      uni.hideLoading();
		    };
		   this.abotapi.httpPost(url, data, cbSuccess, cbError);
		    //===========End============
		
		
		
		
		    //请求服务器，并根据服务器返回，做不同的页面显示
		    this.abotapi.set_option_list_str(this, this.callback_function);
		
		    //app.set_option_list_str(null, app.getColor());
		
		  },
		
		  // callback_function callback_function callback_function
		  callback_function: function (that, cb_params) {
		    var option_list =this.abotapi.globalData.option_list;
		
		
		    this.abotapi.getColor();
		
		    
		
		    console.log('callback_function+++++:::' + cb_params)
		/*
		    if (!option_list) {
		      that.setData({
		        page_bg_img_head: 'http://app.hahading.com/Tpl/Supplier/default/common/images/page_bg_img_head.png',
		        page_bg_img_body: 'http://app.hahading.com/Tpl/Supplier/default/common/images/page_bg_img_body.png',
		        ecard_shop_toutiao_icon: 'http://yanyubao.tseo.cn/Tpl/static/images/toutiao_icon/toutiao.gif',
		        ecard_shop_toutiao_flash_line: 1,
		        ecard_show_toutiao: 1,
		        ecard_show_index_swiper: 1,
		        ecard_show_index_icon: 1,
		        ecard_show_index_phone: 1,
		        ecard_show_index_address: 1,
		        ecard_copyright_text: '技术支持：延誉宝',
		        ecard_show_copyright_text: 1,
		        ecard_show_kefu_button: 1,
		        ecard_kefu_button_type:3
		      })
		
		
		      return;
		    }
		*/
		
		    console.log('option_list====', option_list);
		
		    if(option_list){
		      if (!option_list.ecard_shop_nav_bg_color) {
		        option_list.ecard_shop_nav_bg_color = '#2d96ff';
		      }
		      if (!option_list.ecard_shop_nav_font_color) {
		        option_list.ecard_shop_nav_font_color = '#ffffff';
		      }
		      
		    
		        that.ecard_option_list = option_list
		      
		    }
		
		    console.log('==================>>>>>>' + option_list.ecard_shop_nav_bg_color);
		
		
		
		      //=====更新商户头条=================
		      that.initArticleList();
		      //========End====================
		
		      //首页滚动广告
		      uni.request({
		        url: this.abotapi.globalData.http_server + '?g=Yanyubao&m=ShopAppunia&a=get_flash_ad_list',
		        method: 'post',
		        data: {
		          sellerid: this.abotapi.get_sellerid(),
		          'type': 4
		        },
		        header: {
		          'Content-Type': 'application/x-www-form-urlencoded'
		        },
		        success: function (res) {
		          var banner = res.data.data;
		          console.log(res);
		          console.log(banner);
		
		          //that.initProductData(data);
		          
		            that.imgUrls = banner;
		        
		          //endInitData
		        },
		        fail: function (e) {
		          uni.showToast({
		            title: '网络异常！',
		            duration: 2000
		          });
		        },
		      })
		    // }
		
		  },
		
		
		
		
		  initArticleList: function () {
		    var that = this
		    //=====更新商户头条=================
		    var url = this.abotapi.globalData.http_weiduke_server + '?g=Home&m=Yanyubao&a=yingxiao';//+ app.globalData.sellerid;
		    var data = {
		      id: 'seller',
		      action: 'list',
		      sellerid: this.abotapi.get_sellerid(),
		      currentpage: 1
		    };
		
		    var cbError = function (res) {
		
		    };
		     this.abotapi.httpPost(url, data, this.articleBack, cbError);
		    //========End====================
		
		  },
		  articleBack: function (res) {
		    console.log('555555555555555==',res);
		
		    let _this = this
		
		    if (res.data.code == '1') {
		       this.abotapi.set_current_weiduke_token(res.data.token);
		
		    
		        _this.articlelist = res.data.data;
		        _this.loading = !_this.data.loading;
		      
		
		      if (_this.data.ecard_option_list && 
		        _this.data.ecard_option_list.ecard_shop_toutiao_flash_line &&
		        (_this.data.ecard_option_list.ecard_shop_toutiao_flash_line == 2)) {  
		        
		          var list = res.data.data;
		          var articlelist2 = [];
		          for (var i = 0, length = list.length - 1; i < (length / 2); i++) {
		            var arr = [list[i], list[i+1]];
		            articlelist2.push(arr);     
		          }
				  
		          _this.articlelist2 = articlelist2;
		      
		           
		        }
		    }
		    else {
		      //没有获取数据
		
		    }
		  },
		  
		
		  shangPhoneClick: function () {
		    var that = this;
		    var telephone = that.data.shang_telephone;
		    uni.makePhoneCall({
		      phoneNumber: telephone
		    })
		  },
		
		  shangPhoneClick2: function () {
		    var that = this;
		    var telephone = that.data.ecard_option_list.ecard_kefu_mobile_num;
		    uni.makePhoneCall({
		      phoneNumber: telephone
		    })
		  },
		
		  //跳转h5
		  goToOtherPage: function () {
		    var url = this.data.ecard_option_list.ecard_kefu_form_url
		    uni.navigateTo({
		      url: '../h5browser/h5browser?url=' + encodeURIComponent(url),
		    });
		    return;
		  }, 
		  //下拉刷新 清空数据,重新请求一次数据
		  onPullDownRefresh: function () {
		    var that = this;
		
		    var options = new Object();
		    //options.q = null;
		    //options.sellerid = null;
		
		    uni.removeStorage({
		      key: 'option_list_str',
		      success: function(res) {},
		    })
		
		    that.onLoad(options);
		    uni.stopPullDownRefresh()
		  },
		
		  yue_log:function(e){
		    uni.navigateTo({
		      url: '../balance_log/balance_log'
		
		    }) 
		  },
		  score_log:function(e){
		    uni.navigateTo({
		      url: '../score/score'
		
		    }) 
		  },
		
		  callTel: function (e) {
		    uni.makePhoneCall({
		      phoneNumber: e.currentTarget.dataset.tel
		    })
		  },
		  toOther:function(e){
		    var appid = e.currentTarget.dataset.appid;
		    var path = e.currentTarget.dataset.path;
		    var envVersion = e.currentTarget.dataset.envVersion;
		    uni.navigateToMiniProgram({
		      appId: appid,
		       path: '',
		       extraData: {
		        foo: 'bar'
		      },
		      envVersion: envVersion,
		      success(res) {
		       console.log('打开成功');
		      }
		    })
		  },
		
		  
		  touTiaoList:function(e){
		    console.log('点击商户头条进入列表');
		    uni.navigateTo({
		      url: '../help/help?sellerid=' + this.abotapi.globalData.sellerid
		      
		    })
		  },
		  
		
		  touTiaoItem:function(e){
		    console.log('点击商户头条进入该详情'+e.currentTarget.dataset.id);
		
		    var id = e.currentTarget.dataset.id;
		    uni.navigateTo({
		      url: '../help_detail/help_detail?id=' + id + '&sellerid=' + this.abotapi.globalData.sellerid
		      
		    })
		  },

		},
		  onShareAppMessage: function () {
		    var that = this;
		    return {
		      title: that.data.card_name,
		      desc: '欢迎您的访问!',
		      path: 'pages/index/index?usersn=' + that.data.usersn,
		    }
		  }
	}
</script>

<style>
	.a{
		display: flex;
		align-items: center;
		color:#007AFF;
		margin-left: 20upx;
		margin-top: 50upx;
	}
	.c{
		margin-top: 25rpx;
		margin-left: 5%;
		width: 90%;
		height: 400upx;
		border-top:1px solid #fff;
		background-size: 100% 100%;
		border-radius: 25upx;
	}
	.mid-tips{
		margin-top: 20rpx;
		display:inline-block;
		width: 23%;
		text-align: center;
		overflow: hidden;
		line-height: 50rpx;
	}
	.mid-level{
		font-size: 24rpx;
		color: #808080;
	}
	.mid-imgs image{
		width: 200rpx;
		height: 200rpx;
	}
	.mid-imgs{
		text-align: center;
		display: inline-block;
		width: 25%;
	}
	.mid-bdmw{
		border-radius: 50%;
		position: fixed;/*固定位置*/
		z-index:99;/*设置优先级显示，保证不会被覆盖*/	
	    right:20rpx; bottom:100rpx;				
	    width: 130rpx;
		height: 130rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.mid-bdmw image{
		width: 100rpx;
		height: 100rpx;	
	}

</style>


<!-- <template>
	<view>
		<view class="myecard">
			<view class="card-n">
				<image src="../../static/img/alipay.png"></image>
				<view class="vip">
					延誉宝VIP
				</view>
			</view>
			
			<view class="number">
				<b>12346548465465416316</b>
			</view>
			
			
		</view>
		
		<view>
			<image src="../../static/img/alipay.png"></image>
			<view>123456</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.myecard{
		width: 90%;
		height: 400upx;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		background-image: url(../../static/img/card.png);
		background-repeat:no-repeat;
		border-radius: 30upx;
		margin:auto;
	}
      image{
		width: 100upx;
		height: 100upx;
		border-radius: inherit;
		display: inline-block;
		margin-left:10upx;
		position: relative;
	}
	.card-n{
		margin-top: 100upx;
		display: inline-block;
	}
    .vip{
		color:#FFFFFF;
		font-size: 30upx;
		display: inline-block;
		position: absolute;
	}
    .number{
		color: #000000;
		display: inline-block;
		margin-left: 200upx;
	}
</style>
 -->