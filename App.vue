<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		},
	
		
		globalData:{
			/* weiduke_server_url: 'https://cms.weiduke.com/',
			yanyubao_server_url: 'https://yanyubao.tseo.cn/',
			xiaochengxu_appid: 'wx60a801e5fb7f9378',
			// default_sellerid : 'pmyxQxkkU',
			default_sellerid : 'fyJSPaVja', */
			userInfo: {},
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "/static/iconfont/font.scss";
	/*覆盖文本编辑器里面的图片的大小*/
	uni-rich-text img{ max-width: 100% !important;}
</style>
