<template>
	<view>
		<!-- <view class="cu-bar search bg-white">
			<view class="search-form sou">
				<text class="cuIcon-search"></text> -->
				<!-- <input type="text" focus class="search_input" placeholder="请输入搜索站点" v-model="fname" value="1" @focus="search_site"/> -->
				 
				<!-- icon是叉号图标，点击叉号的时候可以清空输入框的内容 --> 
				<!-- <input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" :placeholder="bd_basic_option_str.weiduke_resou" placeholder-style="color:#AEAEAE; margin-top:2px;" confirm-type="search" v-model="fname">
				<uni-icon type="closeempty" class="search_icon clear" size="26" v-if="fname" @click="clearInput('fname')"></uni-icon>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round">搜索</button>
			</view>
		</view> -->
		<!-- <div class="sou" @click="seach"><text class="cuIcon-search">{{bd_basic_option_str.weiduke_resou}}</text></div> -->
		<div v-if="is_searchData">
			<div class="flist">
				<div @click="goForum(item.id)" class="flist-item" v-for="(item,fkey) in index_list" :key="fkey">
					<div class="flist-user">
						<label v-if="item.user_detail.headimgurl"><image :src="item.user_detail.headimgurl" class="flist-head"></image></label>
						<label v-else><image src="../../static/img/VIP.png" class="flist-head"></image></label>
						<div class="flex-1">
							<div class="flist-nick" style="color: #ccc;font-size: 28upx;">
								<label v-if="item.user_detail.nickname">{{item.user_detail.nickname}}</label>
								<label v-else></label>
								<label style="font-size: 28upx; color:#0062CC;margin-left:10upx;">
									<label v-if="item.user_detail.company">{{item.user_detail.company}}</label>
									<label v-else></label>
								</label>
								<label style="font-size: 28upx; color:#0062CC;margin-left:10upx;">
									<label v-if="item.user_detail.position">{{item.user_detail.position}}</label>
									<label v-else></label>
								</label>
							</div>
							<div class="flist-time"><label v-if="item.updatetime">{{item.updatetime}}</label><label v-else></label></div>
						</div>
					</div>
					<div class="flist-title">
						<label v-if="item.user_detail.company_jiancheng">【{{item.user_detail.company_jiancheng}}】</label>
						<label v-else></label>
						<label v-if="item.title">{{item.title}}</label>
						<label v-else></label>
					</div>
					
					<view class="small-bottom">
						<view><label v-if="item.classname">{{item.classname}}</label><label v-else></label> | 所属行业：<label v-if="item.user_detail.pinpai">{{item.user_detail.pinpai}}</label><label v-else>未知</label></view>
						<view v-if="item.value_list && item.value_list[0] && item.value_list[0].fieldvalue">合作地区：{{item.value_list[0].fieldvalue}}</view>
					</view>
					
					
					<view class="flex flist-ft">
						<view class="pingjia">评价:</view>
						<view class="ZZT">
							<view class="zhuzi">
								<view class="dianzan" v-if="item.dianzan_num < num01" :style="{width: item.dianzan_num +'px'}" ><label class="num">+{{item.dianzan_num}}</label></view>
								<view class="dianzan" v-else :style="{width: num01 +'px'}" ><label class="num">+{{item.dianzan_num}}</label></view>
								
							</view>
							<view class="zhuzi">
								<view class="diancai" v-if="item.dianzan_num2 < num01" :style="{width: item.dianzan_num2 +'px'}"><label class="num">-{{item.dianzan_num2}}</label></view>
								<view class="diancai" v-else :style="{width: num01 +'px'}"><label class="num">-{{item.dianzan_num2}}</label></view>
							</view>
						</view>
					</view>
					
					
					<view class="flex flist-ft">
						
						<div class="flist-ft-cm pinglun">
							{{item.remark_num}}
						</div>
						<div class="flist-ft-view">
							{{item.click}}
						</div>  
					</view>
				</div>
		
			</div>
			
		</div>
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				bd_basic_option_str:'',
				current: 0,
				shopList: [],
				ptype:'',
				title:'延誉',
				page:1,
				catId:0,
				brandId: 0,
				focus: false,
				hotKeyShow: true,
				historyKeyShow: true,
				searchValue: '',
				historyKeyList: [],
				hotKeyList: [],
				is_more: true,
				weiduke_resou:'',
				index_list:'',
				dianzan_num:0,
				dianzan_num2:0,
				num01:'',
				click:'',
				is_searchData:false
			}
		},
		
		
		onLoad:function(options){
			console.log('options',options);
			var that = this;
			this.doSearch();
			//从服务器端获取相关后台设置
			// app.set_option_list_str(null, app.getColor());
			// this.bd_basic_option_str = JSON.parse( uni.getStorageSync('bd_basic_option_str'));
			// console.log("bd_basic_option_str111",this.bd_basic_option_str);
			
			//获取服务器返回的热搜词
			// if (this.bd_basic_option_str.weiduke_resou) {
			    
			// 	that.weiduke_resou = this.bd_basic_option_str.weiduke_resou
			// 	console.log('weiduke_resou',that.weiduke_resou);
			// 	that.hotKeyList = that.weiduke_resou.split(' ');
			//     console.log('resou',that.hotKeyList);
			// }
			
			//获取用户搜索记录
			// var historyKeyList = uni.getStorageSync('historyKeyList_cache');	
			// that.historyKeyList = historyKeyList ? historyKeyList : []
			// console.log('56565', that.historyKeyList)
			
			uni.getSystemInfo({
				//获取手机信息
				success:res => {
					//获取手机各种参数
					console.log("手机参数",res);
					//设置父元素(overall)高度  swiper不会自适应高度 需要设置固定高度
					this.width_overall = res.windowWidth;
					console.log("width_overall ====",this.width_overall);
					that.num01 = this.width_overall*0.4;
					console.log("num01",that.num01);
				}
			});
		},
		
		methods: {
			//跳转文章详情
			goForum: function(id) {
				uni.navigateTo({
					url: "../../../pageforum/forum/show?id=" + id
				})
			},
			
			//确认开始搜索
			doSearch: function () {
				// console.log('e1',e);
				var that = this;
				
				//将搜索内容写入搜索记录缓存
			//     var historyKeyList = that.historyKeyList;
			//     this.remove(searchKey);
			//     historyKeyList.unshift(searchKey);
			//     uni.setStorageSync('historyKeyList_cache', historyKeyList)
			//     console.log('dddddd', searchKey);
			
			//     if (!searchKey) {
			// 		that.focus = true;
			//         that.hotKeyShow = true;
			//         that.historyKeyShow = true;
			// 		return;
			//     };
			
			// 	that.hotKeyShow = false;
			// 	that.historyKeyShow = false;
			// 	that.shopList.length = 0;
				that.searchProductData();
			},
			
			
			//读取搜索记录缓存
			doKeySearch: function (e) {
				var that = this;
			    var key = e.currentTarget.dataset.key;
			
			    // var historyKeyList = that.historyKeyList;
			    this.remove(key);
			    that.historyKeyList.unshift(key);
			    uni.setStorageSync('historyKeyList_cache', that.historyKeyList)
			
				that.searchValue = key;
				that.hotKeyShow = false;
				that.historyKeyShow = false;
			    that.doSearch();
			},
			
			//获取用户输入的搜索值
			searchValueInput: function (e) {
				console.log('e',e);
				var that = this;
			    var value = e.detail.value;
				that.searchValue = value,
				that.page = 1
			    if (!value && this.shopList.length == 0) {
					that.hotKeyShow = true;
			        that.historyKeyShow = true;
					that.is_searchData = false;
			    }
			},
			
			//发送文章搜索请求
			searchProductData: function () {
			
				var shop_option_data = uni.getStorageSync('shop_option_data');
				var json_shop_option_data = JSON.parse(shop_option_data);
				this.cms_token = json_shop_option_data.option_list.cms_token;
				
			    var that = this;
			    uni.request({
					url: that.abotapi.globalData.weiduke_server_url + 'openapi/ArticleImgApi/article_list',
					method: 'post',
					data: {
						token:that.cms_token,
						sellerid: this.abotapi.globalData.default_sellerid,
						action: 'newlist',
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function (res) {
						console.log("res",res);
						if(res.data.code == 1){
							that.is_searchData = true;
							that.index_list = res.data.data
						}else{
							uni.showToast({
								title: '暂无相关文章',
								duration: 2000
							});
							that.is_searchData = false;
							that.hotKeyShow = true;
							that.historyKeyShow = true;
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
			
			
			//删除指定元素
			remove: function (e) {
				var index = this.historyKeyList.indexOf(e);
			    if (index > -1) {
					this.historyKeyList.splice(index, 1);
				}
			},
			
			
		}
	}
</script>

<style>
	.searchcion{
	    width: 48upx;
	    height: 48upx;
	    text-align:center;
	}
	.search input{
	    width: 90%;
	    border-radius: 30upx;
	    background: #fff;
	    border: none;
	    font-size: 40upx;
	    padding:1% 2.5%;
		margin-top: 20upx;
		margin-left: 30upx;
		text-align: center;
         height:65upx;
	    }
	.search button{
	    line-height:60upx;
	    background: none;
	    text-align: center;
	    border: none;
	    padding: 6upx;
	    position:absolute;
	    right:20upx;
	    top:13upx;
	}
	.search button::after{
	    content: none;
	}
	
	.w1000{
	    width: 100%;
	    padding-bottom: 20upx;
	}
	.w1000 button{
	    text-align: center;
	    line-height: 40upx;
	    margin: 3% 2% 0 0;
	    display: inline-table;
	    padding:10upx 20upx;
	    font-size: 24upx;
	}
	.cont{
	     width: 94%;
	     padding: 3%;     
	}
	
	/*文章*/
	.zhuzi{
		/* width: 120rpx; */
		margin-top: 6%;
	}
	.flist-ft{
		font-size: 28rpx;
		padding: 0rpx;
	}
	.pingjia{
		font-size: 20rpx;
		margin-top: 3%;
	}
	.ZZT{
		margin-left: 2%;
		width: 40%;
	}
	.ZZT2{
		display: none;
	}
	.dianzan{
		background: #008000;
		height: 11rpx;
		/* display: inline-block; */
	}
	.diancai{
		background: red;
		height: 11rpx;
		/* display: inline-block; */
	}
	.num{
		width: 0rpx;
		font-size: 18upx;
		position: relative;
		top: -3upx;
		float: right;
	}
	.pinglun{
		margin-left: 50%;
		/* float: left; */
	}
</style>