<template>
	<view v-show="AlertShow">
		<view class="Alert-Bg" catchtouchmove="ture" :class="BgClass" :style="{ background: BgColor }" v-show="IsBgShow" @tap="shadeCloseTap"></view>
		<view class="Alert-Content" catchtouchmove="ture" :class="AlertObj[AlertClass][AlertClassUp]" @tap="shadeCloseTap">
			<view :class="AlertPosition" :style="CustomPosition" @click.stop>
				<image v-show="closeBtn" class="CloseImage" @tap="Close" src="/static/open-alert/CloseImage.png" mode=""></image>
				<slot />
			</view>
		</view>
	</view>
</template>

<script>
/*
	使用说明见：  https://ext.dcloud.net.cn/plugin?id=1208
	
	使用方式
	在 main.js 中引用组件
	
	import openAlert from '@/components/open-alert/open-alert';
	Vue.component('openAlert', openAlert);
	
	在 template 中使用组件
	
	<view class="open-view" @tap="open(0, 'center')">淡入</view>
	<openAlert ref="openAlert" :AlertClass="AlertClass" :AlertPosition="AlertPosition">
	    <view>自定义内容</view>
	</openAlert>
	
	export default {
	    data() {
	        return {
	            AlertClass: 0,
	            AlertPosition: '',
	        };
	    },
	    methods: {
	        open(Class, Position) {
	            this.$nextTick(function() {
	                this.AlertClass = Class;
	                this.AlertPosition = Position;
	                this.$nextTick(function() {
	                    this.$refs.openAlert.Show();
	                });
	            });
	        }
	    }
	};
	
	
	
	属性说明
	属性名 	类型 	默认值 	说明
	AlertPosition 	String 	center 	自定义内容显示位置(top, center, bottom)
	AlertClass 	Number 	0 	动画类型 (17种动画类型 任意选择)
	IsBgShow 	Boolean 	true 	是否显示背景
	BgColor 	String 	rgba(0, 0, 0, 0.2) 	自定义背景颜色(rgba格式)
	closeBtn 	Boolean 	false 	关闭按钮
	shadeClose 	Boolean 	true 	是否点击遮罩关闭
	time 	Number 	0 	自动关闭所需毫秒 (不能小于1000毫秒)
	isOutAnim 	Boolean 	true 	是否显示关闭动画
	CustomPosition 	Object 	{} 	自定义位置 (上,下,左,右 距离)
	
	方法说明
	通过 ref 获取组件调用方法
	方法称名 	说明
	Show 	打开弹出层
	Close 	关闭弹出层
	
*/	
/*
	0 淡入
	1  淡入-从上
	2  淡入-从右
	3  淡入-从下
	4  淡入-从左
	5  弹入
	6  弹入-从上
	7  弹入-从右
	8  弹入-从下
	9  弹入-从左
	10  转入
	11  转入-从左上
	12  转入-从右下
	13  转入-从右上
	14  转入-从左下
	15  翻入-X轴
	16  翻入-Y轴
	
*/
export default {
	props: {
		// 内容显示位置 top  center  bottom left right
		AlertPosition: {
			type: String,
			default: 'center'
		},
		// 动画类型
		AlertClass: {
			type: Number,
			default: 0
		},
		// 是否显示背景
		IsBgShow: {
			type: Boolean,
			default: false
		},
		// 自定义背景颜色
		BgColor: {
			type: String,
			default: 'rgba(0, 0, 0, 0.2)'
		},
		// 关闭按钮
		closeBtn: {
			type: Boolean,
			default: true
		},
		// 是否点击遮罩关闭
		shadeClose: {
			type: Boolean,
			default: true
		},
		// 自动关闭所需毫秒 (不能小于1000毫秒)
		time: {
			type: Number,
			default: 0
		},
		// 关闭动画
		isOutAnim: {
			type: Boolean,
			default: true
		},
		// 自定义位置
		CustomPosition: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		return {
			SetTime: '',
			Repeat: true,
			BgClass: '',
			AlertClassUp: 0,
			// 谈出层显示判断
			AlertShow: false,
			// 对应显示隐藏效果
			AlertObj: [
				['a-fadein', 'a-fadeout'],
				['a-fadeinT', 'a-fadeoutT'],
				['a-fadeinR', 'a-fadeoutR'],
				['a-fadeinB', 'a-fadeoutB'],
				['a-fadeinL', 'a-fadeoutL'],
				['a-bouncein', 'a-bounceout'],
				['a-bounceinT', 'a-bounceoutT'],
				['a-bounceinR', 'a-bounceoutR'],
				['a-bounceinB', 'a-bounceoutB'],
				['a-bounceinL', 'a-bounceoutL'],
				['a-rotatein', 'a-rotateout'],
				['a-rotateinLT', 'a-rotateoutLT'],
				['a-rotateinLB', 'a-rotateoutLB'],
				['a-rotateinRT', 'a-rotateoutRT'],
				['a-rotateinRB', 'a-rotateoutRB'],
				['a-flipinX', 'a-flipoutX'],
				['a-flipinY', 'a-flipoutY']
			]
		};
	},
	methods: {
		Show() {
			if (!this.Repeat) {
				return false;
			}
			this.Repeat = false;
			this.AlertClassUp = 0;
			this.BgClass = 'a-fadein';
			this.AlertShow = true;
			setTimeout(() => {
				this.Repeat = true;
			}, 300);

			if (this.time >= 1000) {
				this.SetTime = setTimeout(() => {
					this.Close();
				}, this.time);
			}
		},
		shadeCloseTap() {
			if (this.shadeClose) {
				this.Close();
			}
		},
		Close() {
			if (!this.Repeat) {
				return false;
			}
			clearTimeout(this.SetTime);
			if (this.isOutAnim) {
				this.Repeat = false;
				this.AlertClassUp = 1;
				this.BgClass = 'a-fadeout';
				setTimeout(() => {
					this.AlertShow = false;
					this.Repeat = true;
				}, 300);
			} else {
				this.AlertShow = false;
				this.Repeat = true;
			}
		}
	}
};
</script>

<style>
@import url('/static/open-alert/animation.css');
.CloseImage {
	width: 40rpx;
	height: 40rpx;
	padding: 5rpx;
	background: #ffffff;
	position: absolute;
	top: -22.5rpx;
	right: -22.5rpx;
	border-radius: 50%;
	z-index: 102;
}
.Alert-Bg {
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 100;
}
.Alert-Content {
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	margin: auto;
	z-index: 101;
	display: flex;
	justify-content: center;
	align-items: center;
}
.top {
	position: absolute;
	top: 0;
}
.center {
	position: absolute;
}
.bottom {
	position: absolute;
	bottom: 0;
}
.left {
	position: absolute;
	left: 0;
}
.right {
	position: absolute;
	right: 0;
}
</style>
