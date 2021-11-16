<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="row" v-for="(item,index) in address" :key="index" @tap="select(item.addressid)">
					<!-- <view class="left">
						<view class="head">
							{{row.head}}
						</view>
					</view> -->
					<view class="center">
						<view class="name-tel">
							<view class="name">{{item.name}}</view>
							<view class="tel">{{item.mobile}}</view>
							<view class="default" v-if="item.is_default == 1">
								{{item.default}}
							</view>
						</view>
						<view class="address">
							{{item.province_name}} {{item.district_name}} {{item.address}}
						</view>
					</view>
					<view class="right">
						<view class="icon bianji" @tap.stop="edit(item.addressid)">
							
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="add">
			<view class="btn" @tap="add">
				<view class="icon tianjia"></view>新增地址
			</view>
		</view>
		
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isSelect:false,
				address:[],
				row:''
			};
		},
		onShow() {
			var that = this;
			that.get_address_list();
			// uni.getStorage({
			// 	key:'saveAddress',
			// 	success: (e) => {
			// 		let len = this.addressList.length;
			// 		if(e.data.hasOwnProperty('id')){
			// 			for(let i=0;i<len;i++){
			// 				if(this.addressList[i].id==e.data.id){
			// 					this.addressList.splice(i,1,e.data);
			// 					break;
			// 				}
			// 			}
			// 		}else{
			// 			let lastid = this.addressList[len-1];
			// 			lastid++;
			// 			e.data.id = lastid;
			// 			this.addressList.push(e.data);
			// 		}
			// 		uni.removeStorage({
			// 			key:'saveAddress'
			// 		})
			// 	}
			// })
		},
		onLoad(e) {
			this.abotapi.set_option_list_str(null, this.abotapi.getColor());
			this.get_address_list();
			
			if(e.type == 'select'){
				this.isSelect = true;
			}
		},
		methods:{
			
			get_address_list:function(){
				var that = this;
				var userInfo = this.abotapi.get_user_info();
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=address_list',
					data: {
						checkstr: userInfo.checkstr,
				        userid:userInfo.userid,
				        sellerid: this.abotapi.get_sellerid()
					},
					method: 'POST', 
					header: {
						'Content-Type':  'application/x-www-form-urlencoded'
					},
				      
					success: function (res) {
						console.log('res',res);
						if(res.data.code == 1){
							that.address = res.data.addressList;
							uni.getStorage({
								key:'delAddress',
								success: (e) => {
									let len = that.address.length;
									if(e.data.hasOwnProperty('id')){
										for(let i=0;i<len;i++){
											if(that.address[i].id==e.data.id){
												that.address.splice(i,1);
												break;
											}
										}
									}
									uni.removeStorage({
										key:'delAddress'
									})
								}
							})
						}
					}
				})
			},
			
			edit(row){
				uni.setStorage({
					key:'address',
					data:row,
					success() {
						uni.navigateTo({
							url:"/pages/user/address/edit/edit?action=edit&addressid=" + row
						})
					}
				});
				
			},
			add(){
				uni.navigateTo({
					url:"edit/edit?type=add"
				})
			},
			select(row){
				//是否需要返回地址(从订单确认页跳过来选收货地址)
				console.log('row',row);
				if(!this.isSelect){
					return ;
				}
				var that = this;
				var userInfo = this.abotapi.get_user_info();
				uni.request({
					url: this.abotapi.globalData.yanyubao_server_url + '/?g=Yanyubao&m=ShopAppWxa&a=address_save',
					data: {
						action:'get',
						checkstr: userInfo.checkstr,
				        userid:userInfo.userid,
				        sellerid: this.abotapi.get_sellerid(),
						addressid:row
					},
					method: 'POST', 
					header: {
						'Content-Type':  'application/x-www-form-urlencoded'
					},
				      
					success: function (res) {
						console.log('res',res);
						if(res.data.code == 1){
							// that.address = res.data.addressList;
							console.log('res',res);
						}
					}
				})
				// uni.setStorage({
				// 	key:'selectAddress',
				// 	data:row,
				// 	success() {
				// 		uni.navigateBack();
				// 	}
				// })
			}
		}
	}
</script>

<style lang="scss">
view{
	display: flex;
}
	.icon {
		// &.bianji {
		// 	&:before{content:"\e61b";}
		// }
		// &.tianjia {
		// 	&:before{content:"\e81a";}
		// }
	}
	.add{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		justify-content: center;
		align-items: center;
		.btn{
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.4);
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			background-color: #f06c7a;
			color: #fff;
			justify-content: center;
			align-items: center;
			.icon{
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}
			font-size: 30upx;
		}
	}
	.list{
		flex-wrap: wrap;
		.row{
			width: 96%;
			padding: 20upx 2%;
			.left{
				width: 90upx;
				flex-shrink: 0;
				align-items: center;
				.head{
					width: 70upx;
					height: 70upx;
					background:linear-gradient(to right,#ccc,#aaa);
					color: #fff;
					justify-content: center;
					align-items: center;
					border-radius: 60upx;
					font-size: 35upx;
				}
			}
			.center{
				width: 100%;
				flex-wrap: wrap;
				.name-tel{
					width: 100%;
					align-items: baseline;
					.name{
						font-size: 34upx;
					}
					.tel{
						margin-left: 30upx;
						font-size: 24upx;
						color: #777;
					}
					.default{

						font-size: 22upx;
						
						background-color: #f06c7a;
						color: #fff;
						padding: 0 18upx;
						border-radius: 24upx;
						margin-left: 20upx;
					}
				}
				.address{
					width: 100%;
					font-size: 24upx;
					align-items: baseline;
					color: #777;
				}
			}
			.right{
				flex-shrink: 0;
				align-items: center;
				margin-left: 20upx;
				.icon{
					justify-content: center;
					align-items: center;
					width: 80upx;
					height: 60upx;
					border-left: solid 1upx #aaa;
					font-size: 40upx;
					color: #777;
				}
			}
		}
	}
</style>
