<template>
	<view>
		<view class="abb" :style="{backgroundColor:wxa_shop_nav_bg_color}">
			<view class="tctb" :style="{fontColor:wxa_shop_nav_font_color}">充值送优惠</view>
		</view>
		
		<scroll-view  style="height:100%;">
		  
		    <!-- <view class="score-list" :class="dqhuiyuan < item.level_id  ? ' ':'score-list-display',currentid == item.id?'score-list-a-hover':''" @tap="dqhuiyuan < item.level_id  ?'radioCheckedChange':' '" :data-sum_price="item.sum_price" :data-all_price="item.all_price" :data-currentid="item.id" v-for="(item,index) in huiyuan_list" :key="index" v-if="item.not_show == 0">
		    <view class="score-list" :class="currentid == item.id?'score-list-a-hover':''" @tap="radioCheckedChange" :data-sum_price="item.sum_price" :data-all_price="item.all_price" :data-currentid="item.id"  >
		      <view class="score-list-a"  >
		        <view>{{item.name}}冲1</view>
		      </view>
		      <view class="score-list-b">{{item.sum_price}}1000</view> 
		      <view hidden="true">{{item.all_price}}50</view>
		    </view> -->
		
			<block v-for="(item2,idx) in taocan" :key="idx" >
			<view class="score-list score-list-a-hover" v-if="currentid == idx"
				:style="{background: wxa_shop_nav_bg_color, border:'1rpx solid '+wxa_shop_nav_bg_color}"
				@tap="radioCheckedChange" 
				
				:data-all_price="item2.chong" 
				:data-currentid="idx">
				  <view class="score-list-a">
					<view>{{item2.chong_str}}</view>
				  </view>
				  <view class="score-list-b">{{item2.rule_str}}</view>
			</view>
			<view class="score-list" v-else				
				:style="{border:'1rpx solid '+wxa_shop_nav_bg_color, color:wxa_shop_nav_bg_color}"
				@tap="radioCheckedChange" 
				:data-all_price="item2.chong" 
				:data-currentid="idx">
				  <view class="score-list-a">
					<view>{{item2.chong_str}}</view>
				  </view>
				  <view class="score-list-b">{{item2.rule_str}}</view>
			</view>
			</block>
			
		</scroll-view>
		
		<button class='btn' @tap="toRecharge" type="" :style="{background: wxa_shop_nav_bg_color}"> 立即充值 </button>
		
		<view class="rule-explain" v-if="order_rule_explain">{{order_rule_explain}}</view>
		
	</view>
</template>


<script>
	
	export default {
		data() {
			return {
				inputAmount:'',//金额
				amountList:[10,50,100],//预设3个可选快捷金额
				paytype:'alipay',//支付类型
				taocan:'',
				order_rule_explain:'',
				orderid:'',
				orderno:'',
				all_price:0,
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				currentid:0,
				huiyuan_list:''
				
			}
		},
		onLoad: function (options) {
			console.log('deposit---options===',options);
			var that = this;
			
			var userInfo = this.abotapi.get_user_info();
			
			
			that.currentid = 0;
			
			
			this.abotapi.set_option_list_str(this, 
				function(that001, option_list){
					that001.abotapi.getColor();
					
					that001.wxa_shop_nav_bg_color  = option_list.wxa_shop_nav_bg_color;
						
					that001.wxa_shop_nav_font_color = option_list.wxa_shop_nav_font_color;
					
					console.log('userinfo===',userInfo);
					
					if(!userInfo || !userInfo.userid){
						var last_url = '/pages/user/deposit/deposit';
						that001.abotapi.goto_user_login(last_url,'normal');
						return;
					}
					
					
					that001.abotapi.abotRequest({
						url: that001.abotapi.globalData.yanyubao_server_url + 'openapi/OrderChongZhiData/get_chongzhi_rule_list',
						method: 'post',
						data: {
							sellerid: that001.abotapi.get_sellerid(),
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: function (res) {
							//--init data        
							var data = res.data;
							if(data.code == 1){
								that001.taocan = data.data;
								that001.order_rule_explain = data.order_rule_explain;
								that001.all_price = data.data[0].chong ? data.data[0].chong : '';
							}
					   
						},
						fail: function (e) {
							uni.showToast({
								title: '网络异常',
								duration: 2000
							});
					
						}
					});
					
				}
			);
		    
		},
		onShow() {
			var userInfo = this.abotapi.get_user_info();
			
			console.log('userinfo===',userInfo);
			
			if(!userInfo || !userInfo.userid){
				retrun;
			}
		},
		
		
		methods:{
			// 点击选中变色
			radioCheckedChange: function (e) {
			    var currentid = e.currentTarget.dataset.currentid
			    var sum_price = e.currentTarget.dataset.sum_price
			    var all_price = e.currentTarget.dataset.all_price
			    console.log('e=====', e)
				this.currentid = currentid;
			
			    this.all_price = all_price;
			},
			
			
			
			toRecharge: function (e) {
			    var that = this;
				var userInfo = this.abotapi.get_user_info();
			    if (!that.all_price) {
					uni.showToast({
						title: '请选择充值套餐',
						icon: 'none',
						duration: 2000
					})
					return;
			    }
			
			
			    var data_orderAdd = {
			
					all_price: that.all_price,
					userid: userInfo.userid,
					checkstr: userInfo.checkstr,
					pay_price: that.all_price,
					sellerid: this.abotapi.get_sellerid(),
					payment: 3,
					order_type: 1,
			    };
			
			    uni.request({
					url: that.abotapi.globalData.yanyubao_server_url + '?g=Yanyubao&m=ShopAppWxa&a=order_add',
					method: 'post',
					data: data_orderAdd,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function (res) {
						//--init data        
						var data = res.data;
						if (data.code == 1) {
							//创建订单成功
							that.orderid = res.data.orderid;
							that.orderno = res.data.orderno;
							uni.navigateTo({
								url: '/pages/pay/payment/payment?orderId=' + that.orderid + '&recharge=1',
							})
			
						} else if (data.code == 2) {
			
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
							that.btnDisabled = false;
			
			
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
			
			comment: function () {
			    this.comment = !0
			},
			
			formid_one: function (t) {
			      this.comment = !1
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			select(amount){
				this.inputAmount = amount;
			},
			doDeposit(){
				if (parseFloat(this.inputAmount).toString() == "NaN") {
					uni.showToast({title:'请输入正确金额',icon:'none'});
					return ;
				}
				if(this.inputAmount<=0){
					uni.showToast({title:'请输入大于0的金额',icon:'none'});
					return ;
				}
				if(parseFloat(this.inputAmount).toFixed(2)!=parseFloat(this.inputAmount)){
					uni.showToast({title:'最多只能输入两位小数哦~',icon:'none'});
					return ;
				}
				//模板模拟支付，实际应用请调起微信/支付宝
				uni.showLoading({
					title:'支付中...'
				});
				setTimeout(()=>{
					uni.hideLoading();
					uni.showToast({
						title:'支付成功'
					});
					setTimeout(()=>{
						uni.redirectTo({
							url:'../../pay/success/success?amount='+this.inputAmount
						});
					},300);
				},700)
			}
		},
		
	}
</script>

<style lang="scss">
	.block{
		width: 94%;
		padding: 20upx 3%;
		.title{
			width: 100%;
			font-size: 34upx;
		}
		.content{
			.my{
				width: 100%;
				height: 120upx;
				display: flex;
				align-items: center;
				font-size: 30upx;
				border-bottom: solid 1upx #eee;
			}
			.amount{
				width: 100%;
				
				.list{
					display: flex;
					justify-content: space-between;
					padding: 20upx 0;
					.box{
						width: 30%;
						height: 120upx;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 10upx;
						box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.05);
						font-size: 36upx;
						background-color: #f1f1f1;
						color: 333;
						&.on{
							background-color: #f06c7a;
							color: #fff;
						}
					}
				}
				.num{
					margin-top: 10upx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					.text{
						padding-right: 10upx;
						font-size: 30upx;
					}
					.input{
						width: 28.2vw;
						border-bottom: solid 2upx #999;
						
						justify-content: flex-end;
						align-items: center;
						input{
							margin: 0 20upx;
							height: 60upx;
							font-size: 30upx;
							color: #f06c7a;
							justify-content: flex-end;
							align-items: center;
						}
					}
				}
			}
			.pay-list{
				width: 100%;
				border-bottom: solid 1upx #eee;
				.row{
					width: 100%;
					height: 120upx;
					display: flex;
					align-items: center;
					.left{
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						align-items: center;
						image{
							width: 80upx;
							height: 80upx;
						}
					}
					.center{
						width: 100%;
						font-size: 30upx;
					}
					.right{
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						justify-content: flex-end;
					}
				}
			}
		}
	}
	.pay{
		margin-top: 20upx;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		.btn{
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			background-color: #f06c7a;
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.2);
		}
		.tis{
			margin-top: 10upx;
			width: 100%;
			font-size: 24upx;
			display: flex;
			justify-content: center;
			align-items: baseline;
			color: #999;
			.terms{
				color: #5a9ef7;
			}
		}
	}
	
	
	/* pages/order_chongzhi/chongzhi.wxss */
	.score-list{
	  padding: 18rpx 8%;
	  font-size: 32rpx;
	  color: #17A8E2;
	  border-bottom: 2px solid #efefef;
	  height: 128rpx;
	  display: flex;
	  flex-direction: column;
	  border: 1px solid #17A8E2;
	  width: 28%;
	  float: left;
	  border-radius: 8rpx;
	  text-align: center;
	  margin-left: 3%;
	  margin-top: 20rpx;
	}
	
	.score-list-a-hover {
	color:#fff;
	// background-color:#17A8E2;
	
	}
	
	.score-list-display {
	color:#fff;
	background-color:#b8b8b8;
	border:1px solid #b8b8b8;
	}
	
	
	.score-list-a{
	  font-size:16px;
	  justify-content: space-between;
	}
	.score-list-a-hover .score-list-a view{
	  color:#fff;
	}
	
	.score-list-a view{
	  font-size: 40rpx;
	}
	
	.score-list-b{
	 font-size:26rpx;
	 margin-left:-9px;
	 margin-top: 24rpx;
	
	}
	
	.to-home-icon{
	  border:1px solid #bfbfbf;
	  width:74rpx;
	  height:74rpx;
	  border-radius:50rpx; 
	  text-align:center;
	  position: fixed;
	  right:30rpx;
	  bottom:182rpx;
	}
	
	.to-home-icon image{
	  width:64rpx;
	  height:64rpx;
	}
	
	/* .a-top{
	  display:flex;
	  align-items:center;
	  padding:0 5% 0 5%;
	  height:132rpx;
	  margin-bottom:30rpx;
	  border-bottom:8px solid #EFEFEF;
	  border-top:4rpx solid #EFEFEF;
	
	}
	
	.a-top image{
	  width:90rpx;
	  height:90rpx;
	  border-radius:30px;
	} */
	
	.feihuoyeu{
	  background-color:#eee;
	}
	
	/* 新加的wxss */
	.abb{
	    display: flex;
	    flex-direction: row;
	    align-items: center;
	    background-color: #fff;
	    overflow: hidden;
	    height: 120px;
	    border-bottom: 3px solid #EFEFEF;
	}
	.tctb {
	margin-left:30rpx;
	font-weight:bolder;
	font-size:34rpx;
	color:#fff;
	border-radius:62rpx;
	width:216rpx;
	text-align:center;
	height:57rpx;
	
	}
	.btn{
	  width:80%;
	  height:50px;
	  line-height:50px;
	  margin:33px auto;
	  background-color:#17A8E2;
	  color:#fff;
	}
	.button-hover {
	color:rgba(0, 0, 0, 0.6);
	background-color:green;
	
	}
	
	
	/* tanchuan */
	.flex1 {
	display:flex;
	justify-content:center;
	align-items:center;
	
	}
	
	
	.reply {
	    background-color: rgba(0,0,0,0.5);
	    position: fixed;
	    z-index: 2;
	    top: 0rpx;
	    left: 0rpx;
	    right: 0rpx;
	    bottom: 0rpx;
	}
	
	.reply_box {
	    background-color: #f2f2f2;
	    position: absolute;
	    width: 80%;
	    left: 10%;
	    top: 20%;
	    height: 280rpx;
	    font-size: 26rpx;
	}
	
	.reply_title {
	    height: 80rpx;
	}
	
	.reply_area {
	    padding: 20rpx;
	}
	
	.reply_area>textarea {
	    width: 97%;
	    height: 77rpx;
	    background-color: white;
	    padding: 10rpx;
	    font-size: 24rpx;
	    color: #666;
	}
	
	.reply_bot {
	    width: 100%;
	    height: 50rpx;
	    text-align: center;
	    line-height: 50rpx;
	    border-top: 1rpx solid #ddd;
	    display: flex;
	}
	
	.reply_liu {
	    width: 50%;
	    height: 50rpx;
	    position: relative;
	}
	
	.reply_hui {
	    color: #ed414a;
	    border-left: 1rpx solid #ddd;
	    position: relative;
	}
	
	.plate_form {
	}
	
	.plate_form button {
	    width: 100%;
	    height: 100%;
	    position: absolute;
	    top: 0;
	    left: 0;
	    background: none;
	    color: #333;
	    font-size: 26rpx;
	}
	
	.rule-explain{
	  width: 90%;
	  margin-left: 5%;
	  color: #666;
	  white-space: pre-line;
	  font-size: 30rpx;
	  margin-bottom: 40rpx;
	}
</style>
