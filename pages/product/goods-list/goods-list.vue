<template>
	<view>
		<view class="header" :style="{position:headerPosition,top:headerTop}">
			<view class="target" v-for="(target,index2) in orderbyList" @tap="select(index2)" :key="index2" :class="[target.selected?'on':'']">
				{{target.text}}
				<view v-if="target.orderbyicon" class="icon" :class="target.orderbyicon[target.orderby]"></view>
			</view>
		</view> 
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 商品列表 -->
		<productList :productsList="goodsList" :cataid="cataid" 
			:loadingText="loadingText" 
			:showKucunSale="wxa_show_kucun_in_list" 
			@toGoods="toGoods"></productList>
			
		<view class="loading-text">{{loadingText}}</view>
		
		<view class="copyright_info">{{default_copyright_text}}</view>
		 
	</view>
</template>

<script>
	import productList from '../../../components/product-list/product-list.vue'
	var app = getApp();
	//var cataid; 
	
	export default {
		components:{
			productList
		},
		data() {
			return {
				cataid:0,
				goodsList:'',
				sorts:1,
				current_page:1,
				
				loadingText:"暂无商品",
				headerTop:"0px",
				headerPosition:"fixed",
				
				orderbyList:[
					{text:"最新",selected:true,orderbyicon:false,orderby:0},
					{text:"销量",selected:false,orderbyicon:false,orderby:0},
					{text:"价格",selected:false,orderbyicon:false,orderby:0}
				],
				wxa_show_kucun_in_list: '',
				default_copyright_text:'',
				
				//商品的来源渠道，默认0为SaaS云平台的商品，1为淘宝客等推广联盟的商品
				product_source_channel:0,
				product_channel_name:'',	// jingdong / taobao / pinduoduo
				factoryid:'',//供货商id
			};
		},
		/**
		 * 展示商品列表，支持的option参数：
		 * @param {Object} option
		 * 
		 * cata_name
		 * cataid
		 * product_source_channel
		 * product_channel_name
		 * 
		 */
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log('option',option); //打印出上个页面传递的参数。
			
			var title = '商品列表';
			if(option.cata_name){
				title += '—' + option.cata_name;
			}
			
			if(option.factoryid){
				this.factoryid = option.factoryid;
			}
			
			uni.setNavigationBarTitle({
				title: title
			});
			
			this.abotapi.set_option_list_str(this,this.callback_set_option_list_str);
			
			if(option.cataid){
				this.cataid = option.cataid;
			}
			
			console.log('this.cataid=====>>>>', this.cataid);
			
			//渠道商品 2020.8.21.
			if(!this.abotapi.isNullOrUndefined(option.product_source_channel)){
				this.product_source_channel = option.product_source_channel;
				
				this.product_channel_name = option.product_channel_name;
			}
			
			
			
			
			//兼容H5下排序栏位置
			// #ifdef H5
				//定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
				let Timer = setInterval(()=>{
					let uniHead = document.getElementsByTagName('uni-page-head');
					if(uniHead.length>0){
						this.headerTop = uniHead[0].offsetHeight+'px';
						clearInterval(Timer);//清除定时器
					}
				},1);
			// #endif
			
			
			var that = this;
			
			that.goodsList = [];
			
			that.reload();
		
		},
		
		
		
		 
		
		
		
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(()=>{
				this.reload();
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom(){
			//uni.showToast({title: '触发上拉加载'});
			
			let len = this.goodsList.length;
			//if(len>=40){
			if(this.current_page == -1){	
				this.loadingText = "我也是有底线的~~";
				return false;
			}else{
				this.loadingText = "正在加载...";
			}
			
			this.reload();
			
			
			/*let end_goods_id = this.goodsList[len-1].goods_id;
			for(let i=1;i<=10;i++){
				let goods_id = end_goods_id+i;
				let p = { goods_id: goods_id, img: '/static/img/goods/p'+(goods_id%10==0?10:goods_id%10)+'.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' };
				this.goodsList.push(p);
			}*/
			
			
		},
		methods:{
			callback_set_option_list_str:function(that,cb_params){
				var that = this;
				
				if(!cb_params){
					return;
				}
				
				that.abotapi.getColor()
				
				that.default_copyright_text = that.abotapi.globalData.default_copyright_text;
				
				that.wxa_show_kucun_in_list = cb_params.wxa_show_kucun_in_list		
			},
			//获取商品列表
			reload(){
				var that = this;
				
				uni.showLoading({
					title: '加载中...',
				})
				
				if(that.product_source_channel == 0){
					that.abotapi.abotRequest({
					    url: this.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=product_list',
					    data: {
					      sellerid: this.abotapi.globalData.default_sellerid,
					      keyword:'', 
					      sort: that.sorts,
					      page: that.current_page,
						  cataid:that.cataid,
						  platform: that.abotapi.globalData.current_platform,
						  factoryid: this.factoryid,
					    },
					    success: function (res) {
							uni.hideLoading();
							
							if(res.data.code == 1){
								console.log('aaafff===', res);
								
								console.log("that.goodsList", res.data.product_list);
								
								if(res.data.counter == 0){
									that.current_page = -1;
								}
								
								res.data.product_list.forEach((item, index, array01)=>{
									//console.log("that.goodsList foreach", item, index, array01);
									
									that.goodsList.push(item);
								});
								
								
								//that.goodsList = res.data.product_list;
								console.log("that.goodsList", that.goodsList);
								
								
								
								that.current_page ++;
								
							}else if(res.data.code == 0){
								// uni.showToast({
								// 	title: '暂无商品',
								// 	duration: 2000
								// });
								
								that.current_page = -1;
							}
					    },
					    fail: function (e) {
							uni.hideLoading();
							
							uni.showToast({
								title: '网络异常！',
								duration: 2000
							});
						},
					});
				}
				else if(that.product_source_channel == 1){
					//读取推广联盟的商品
					
					that.abotapi.abotRequest({
					    url: this.abotapi.globalData.yanyubao_server_url + 'openapi/UnionPromotionData/get_product_list',
					    data: {
					      sellerid: that.abotapi.globalData.default_sellerid,
					      union_name: that.product_channel_name, 
					      page: that.current_page,
						  cataid:that.cataid,
						  platform: that.abotapi.globalData.current_platform,
					    },
					    success: function (res) {
							uni.hideLoading();
							
							if(res.data.code == 1){
								console.log('aaafff===', res);
								
								console.log("that.goodsList", res.data.product_list);
								
								if(res.data.counter == 0){
									that.current_page = -1;
								}
								
								res.data.product_list.forEach((item, index, array01)=>{
									//console.log("that.goodsList foreach", item, index, array01);
									
									that.goodsList.push(item);
								});
								
								
								//that.goodsList = res.data.product_list;
								console.log("that.goodsList", that.goodsList);
								
								
								
								
								that.current_page ++;
								
							}else if(res.data.code == 0){
								// uni.showToast({
								// 	title: '暂无商品',
								// 	duration: 2000
								// });
								
								that.current_page = -1;
							}
					    },
					    fail: function (e) {
							uni.hideLoading();
							
							uni.showToast({
								title: '网络异常！',
								duration: 2000
							});
						},
					});
				}
				
				
			},
			//商品跳转
			toGoods(productItem) {
				var productid = productItem.productid;
				
				if(this.product_source_channel == 0){
					uni.navigateTo({
						url: '/pages/product/detail?productid='+productid
					});
				}
				else if(this.product_source_channel == 1){
					uni.navigateTo({
						url: '/pages/product/detail?productid='+productid+'&product_source_channel=1&product_channel_name='+this.product_channel_name
					});
				}
				
				
				
			},
			//排序类型   sort值选项(5:最新、3:销量、4:价格) 
			select(index2){
				if(this.orderbyList[index2].orderbyicon){
					if(this.orderbyList[index2].selected){
						this.orderbyList[index2].orderby = this.orderbyList[index2].orderby==0?1:0;
					}
					tmpTis+=type
				}
				this.orderbyList[index2].selected = true;
				let len = this.orderbyList.length;
				for(let i=0;i<len;i++){
					if(i!=index2){
						this.orderbyList[i].selected = false;
					}
				}
				var that = this;
				console.log('index2==>>',index2);
				if(index2 == 0){
					that.index2 = 5;
				}else if(index2 == 1){
					that.index2 = 3;
				}else if(index2 == 2){
					that.index2 = 4;
				}
				
				that.sorts = that.index2;
				that.reload();
			}
		}
		
	}
</script>

<style lang="scss">
	.icon {
		font-size:26upx;
	}
	.header{
		width: 92%;
		padding: 0 4%;
		height: 79upx;
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		border-bottom: solid 1upx #eee;
		.target{
			width: 20%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			margin-bottom: -2upx;
			color: #aaa;
			&.on{
				color: #555;
				border-bottom: 4upx solid #f06c7a;
				font-weight: 600;
				font-size: 30upx;
			}
			
			
		}
	}
	
	.place{
		
		background-color: #ffffff;
		height: 100upx;

	}
	
	.loading-text{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		// height: 60upx;
		color: #979797;
		font-size: 30rpx;
		padding:30rpx 0;
	}

</style>
