<template>
	<view>
		<view class="title">
			<h1 :style="{color:wxa_shop_nav_bg_color}">{{notepad_title}}</h1>
		</view>
		<view class="nodeapp" :style="{backgroundColor:wxa_shop_nav_bg_color}">
			<input style="display: inline-block;width: 600rpx; height: 50rpx; line-height: 50rpx; padding-left: 8rpx; border-radius: 6rpx;"
				v-model="newtodo" 
				placeholder="请输入记事内容" placeholder-style="font-size:24rpx">
			<button class="btn icon jia" style="display: flex;align-items: center;" @click="add_new"></button>
			
			<view style="width: 750rpx; margin: 20rpx;" :style="{color:wxa_shop_nav_font_color}">
					<view v-for="(todo, index) in todos" :key="todo.id" class="note_item">
						<p style="display: inline-block;margin-right: 20rpx;">{{index+1}}、{{todo.text}}</p>
						<p class="icon shanchu" 
							style="display: inline-block; font-size: 25rpx;"
							 :style="{color:wxa_shop_nav_font_color}"
							@click="remove(todo)"></p>
					</view>
			</view>
			
			
			<view style="width: 750rpx;margin: 20rpx 20rpx;" 
				:style="{color:wxa_shop_nav_font_color}">
				<p style="width: 150rpx; float: left; font-size: 24rpx;"
					>共{{todos.length}}个事件</p>
					
				<p class="icon shanchu" 
					style="float: right;font-size: 25rpx;"
					:style="{color:wxa_shop_nav_font_color}"
					@click="delete_all" > 删除所有</p>
			</view>
			
		</view>

	</view>
</template>

<script>
	let id = 0

	export default {
		data() {
			return {
				//商城的Logo、导航栏背景颜色和文字颜色
				wxa_shop_operation_logo_url:'',
				wxa_shop_nav_bg_color:'',
				wxa_shop_nav_font_color:'',
				
				
				notepad_title:'随手记',
				newtodo: '',
				todos: [],
			}
		},
		/*mounted() {			

		},*/
		onLoad(options){
			var that = this;
			
			uni.setNavigationBarTitle({
				title: this.notepad_title
			});
			
			that.abotapi.set_shop_option_data(that, that.callback_function_shop_option_data);
			
			
			var a = uni.getStorageSync('data', JSON.stringify(this.todos));
			
			var b = JSON.parse(a);
			for (let i = 0; i < b.length; i++) {
			
				this.todos.push({
					text: b[i].text
				})
			
			}
		},
		methods: {
			callback_function_shop_option_data: function(that, cb_params) {
				
				console.log('callback_function_shop_option_data===>>>', cb_params);
			
				uni.showLoading({
					title: '正在加载中'
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 1000);
				
				//商城的Logo、导航栏背景颜色和文字颜色
				that.wxa_shop_operation_logo_url = cb_params.option_list.wxa_shop_operation_logo_url;
				that.wxa_shop_nav_bg_color = cb_params.option_list.wxa_shop_nav_bg_color;
				that.wxa_shop_nav_font_color = cb_params.option_list.wxa_shop_nav_font_color;
			
			},
			add_new() {
				var n = this.newtodo;
				console.log(n);
				if (n != '') {
					this.todos.push({
						id: id++,
						text: this.newtodo
					})
					this.newtodo = ''
					uni.setStorageSync('data', JSON.stringify(this.todos))
				} else {
					return false
				}

			},
			remove(todo) {
				this.todos = this.todos.filter((t) => t !== todo)
				uni.setStorageSync('data', JSON.stringify(this.todos))
			},
			delete_all() {
				this.todos = []
				uni.removeStorageSync('data')
			}


		},
	}
</script>

<style>
	.nodeapp {
		width: 700rpx;
		margin: 20rpx auto;
		padding: 10rpx 0rpx;
		background-color: antiquewhite;
		border: 1rpx solid #E0E0E0;
		padding-right: 0rpx;
		padding-left: 0rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		border-radius: 10rpx;
	}

	.note_item {
		border: 0rpx solid #E0E0E0;
		margin: 20rpx auto;
	}

	h1 {
		font-family: "隶书";
		font-size: 50rpx;
		color: saddlebrown;
		text-align: center;
		margin-bottom: 0rpx;
	}

	input {
		background-color: aliceblue;
		margin: 10rpx auto;
	}

	.title {
		text-align: center;
		line-height: 2;
	}

	.container {
		width: 744rpx;
		height: 744rpx;
		background: #fff;
		overflow: hidden;
	}

	.btn {
		width: 60rpx;
		height: 50rpx;
		/* line-height:248rpx; */
		color: #666;
		font-size: 40rpx;
		padding:10rpx;
		margin-left: 10rpx;
		margin-top: 10rpx;
	}

	.active {
		color: transparent !important;
		background: transparent !important;
	}

	.row {
		width: 33.33333%;
	}

	.init {
		text-align: center;
	}

	.init button {
		width: 50%;
		display: inline-block
	}

	.time {
		color: #333;
		font-size: 42rpx;
		line-height: 2;
		width: 100%;
		display: inline-block;
	}
</style>