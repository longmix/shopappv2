<!-- 添加新客户，填写新客户的信息列表 -->
<template>
	<view class="">
		<view	style="height: auto;width: 630rpx;background-color: #ffffff;border-radius: 20rpx;margin: 0 auto;margin-top: 20rpx;padding: 20rpx 40rpx;">
			<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
			<u--form
					labelPosition="left"
					:model="model1"
					:rules="rules"
					ref="uForm"
			>
				<u-form-item
						label="名称"
						labelWidth='150rpx'
						prop="userInfo.name"
						borderBottom
						ref="item1"
				>
					<u--input
							v-model="model1.userInfo.name"
							border="none"
					></u--input>
				</u-form-item>
				<u-form-item
						label="状态"
						labelWidth='150rpx'
						prop="userInfo.zhuangtai"
						borderBottom
						ref="item1"
				>
				<u-icon
						slot="right"
						name="arrow-right"
				></u-icon>
				</u-form-item>
				<u-form-item
						label="标签"
						labelWidth='150rpx'
						prop="userInfo.biaoqian"
						borderBottom
						ref="item1"
				>
				<u-icon
						slot="right"
						name="arrow-right"
				></u-icon>
				</u-form-item>
				<u-form-item
						label="业务员"
						labelWidth='150rpx'
						prop="userInfo.yewuyuan"
						borderBottom
						ref="item1"
				>
				<u-icon
						slot="right"
						name="arrow-right"
				></u-icon>
				</u-form-item>
			</u--form>
		</view>
		<view	style="height: auto;width: 630rpx;background-color: #ffffff;border-radius: 20rpx;margin: 0 auto;margin-top: 20rpx;padding: 20rpx 40rpx;">
			<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
			<u--form
					labelPosition="left"
					:model="model1"
					:rules="rules"
					ref="uForm"
			>
				<u-form-item
						label="联系人"
						labelWidth='150rpx'
						prop="userInfo.lianxiren"
						borderBottom
						ref="item1"
				>
					<u--input
							v-model="model1.userInfo.lianxiren"
							border="none"
					></u--input>
				</u-form-item>
				<u-form-item
						label="手机"
						labelWidth='150rpx'
						prop="userInfo.phone"
						borderBottom
						ref="item1"
				>
					<u--input
							v-model="model1.userInfo.phone"
							border="none"
					></u--input>
				</u-form-item>
				<u-form-item
						label="座机"
						labelWidth='150rpx'
						prop="userInfo.zuoji"
						borderBottom
						ref="item1"
				>
					<u--input
							v-model="model1.userInfo.zuoji"
							border="none"
					></u--input>
				</u-form-item>
				<u-form-item
						label="性别"
						labelWidth='150rpx'
						prop="userInfo.sex"
						borderBottom
						@click="showSex = true; hideKeyboard()"
						ref="item1"
				>
					<u--input
							v-model="model1.userInfo.sex"
							disabled
							disabledColor="#ffffff"
							placeholder="请选择性别"
							border="none"
					></u--input>
					<u-icon
							slot="right"
							name="arrow-right"
					></u-icon>
				</u-form-item>
				<u-form-item
						label="身份证号"
						labelWidth='150rpx'
						prop="userInfo.ID"
						borderBottom
						ref="item1"
				>
					<u--input
							v-model="model1.userInfo.ID"
							border="none"
					></u--input>
				</u-form-item>
			</u--form>
			<u-action-sheet
					:show="showSex"
					:actions="actions"
					title="请选择性别"
					@close="showSex = false"
					@select="sexSelect"
			>
			</u-action-sheet>
		</view>
		<view	style="height: auto;width: 630rpx;background-color: #ffffff;border-radius: 20rpx;margin: 0 auto;margin-top: 20rpx;padding: 20rpx 40rpx;">
			<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
			<u--form
					labelPosition="left"
					:model="model1"
					:rules="rules"
					ref="uForm"
			>
				<u-form-item
						label="地区"
						labelWidth='150rpx'
						prop="userInfo.lianxiren"
						borderBottom
						ref="item1"
				>
					<u--input
							v-model="model1.userInfo.lianxiren"
							border="none"
					></u--input>
				</u-form-item>
				<u-form-item
						label="地址"
						labelWidth='150rpx'
						prop="userInfo.phone"
						borderBottom
						ref="item1"
				>
					<u--input
							v-model="model1.userInfo.phone"
							border="none"
					></u--input>
				</u-form-item>
				<u-form-item
						label="备注"
						labelWidth='150rpx'
						prop="userInfo.zuoji"
						borderBottom
						ref="item1"
				>
					<u--input
							v-model="model1.userInfo.zuoji"
							border="none"
					></u--input>
				</u-form-item>
			</u--form>
		</view>
	</view>
	
</template>

<script>
export default {
	data() {
		return {
			showSex: false,
			model1: {
				userInfo: {
					name: 'uView UI',					
					zhuangtai:'',
					biaoqian:'',
					yewuyuan:'吴',
					lianxiren:'',
					phone:'',
					zuoji:'',
					sex: '',
					ID:'',
				},
			},
			actions: [{
				name: '男',
				},
				{
					name: '女',
				}
			],
			rules: {
				'userInfo.name': {
					type: 'string',
					required: true,
					message: '请填写姓名',
					trigger: ['blur', 'change']
				},
				'userInfo.sex': {
					type: 'string',
					max: 1,
					required: true,
					message: '请选择男或女',
					trigger: ['blur', 'change']
				},
			},
			radio: '',
			switchVal: false
		};
	},
	methods: {
		sexSelect(e) {
			this.model1.userInfo.sex = e.name
			this.$refs.uForm.validateField('userInfo.sex')
		},
	},
	onReady() {
		//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    	this.$refs.uForm.setRules(this.rules)
    },
};
</script>


<style>
	page{
		background-color: #E6E6E6;
	}

</style>
