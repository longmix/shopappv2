<template>
	<view>
		<view class="form-group">
			<view class="form-title">用户信息填写</view>
			<view class="form-item">
				<input type="text" placeholder="请输入用户名" v-model="USERNAME" />
			</view>
			<view class="form-item">
				<input type="text" placeholder="请输入学号" v-model="USERNUM" />
			</view>
		</view>
		<view class="bottom_guding" >
			<view class="liji_pinke"	@click="goto_course_pay">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current_productid:0,
				pinke_xiangqin:[],
				pintuan_xinxi:[],
				//order_option_key_and_value_str:'',
				
				current_key:'',
				current_value:0,
				USERNAME:'',
				USERNUM:'',
				
			}
		},
		methods: {
			goto_course_pay:function(){
				var that = this;
				if(this.USERNAME == '' || this.USERNUM == ''){
					uni.showModal({
						title: '请完整填写信息'
					});
					return
				}
				console.log('当前的key=====>>>>>',that.current_key);
				console.log('当前的value=====>>>>>',that.current_value);
				
				var order_option_key_and_value = [];
				
				order_option_key_and_value.push({
					'key':'that.current_key',
					'value':that.current_value
				}
				)
				
				
				var order_option_key_and_value_str = encodeURIComponent(JSON.stringify(order_option_key_and_value));
				console.log('进行编码后的数据为:',order_option_key_and_value_str);
				
				
				
				//var my_url = '/pages/order/pay';
				var my_url = '/pages/order/pay?action=direct_buy&productid=';
				my_url += that.current_productid+'&amount=1&all_price='+that.pinke_xiangqin.price;
				//url += '&buyer_memo=购买在线课程&extraData='+tiaozhuan_extraData;
				my_url += '&product_name='+that.pinke_xiangqin.name;
				my_url += '&product_picture='+that.pinke_xiangqin.product_picture;
				my_url += '&order_option_key_and_value_str='+order_option_key_and_value_str;
				this.abotapi.call_h5browser_or_other_goto_url(my_url);
			},
		}
	}
</script>

<style>
.form-title{
			font-size: 36rpx;
			line-height: 40rpx;
			display: flex;
			justify-content: center;
			margin-bottom: 40rpx;
		}
.form-item{
			width: 90%;
			height: 80rpx;
			border: 1rpx solid #000;
			padding-left: 20rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
		}
.form-item input{
	width: 100%;
	height: 100%;
}
.form-group{
		width: 100%;
		padding: 24rpx;
		height: auto;
		}
.bottom_guding{
		position: fixed;
		bottom: var(--window-bottom);
		width: 100%;
		/* height: 200rpx; */
		margin-top: 20rpx;
		background-color: #30c478;
		padding-bottom: 20rpx;
		border-top: 1px solid #a6a6a6;
		box-shadow: -6px 0px 6px 0px #ccc;
	}
.liji_pinke{
		height: 72rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 36rpx;
		color: #FFFFFF;
	}
</style>
