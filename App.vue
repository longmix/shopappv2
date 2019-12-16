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
		
		weiduke_server_url: 'https://cms.weiduke.com/',
		
		yanyubao_server_url: 'https://yanyubao.tseo.cn/',
		
		globalData:{
			weiduke_server_url: 'https://cms.weiduke.com/',
		
			yanyubao_server_url: 'https://yanyubao.tseo.cn/',
			
			xiaochengxu_appid: 'wx60a801e5fb7f9378',
			//xiaochengxu_appid: 'wx00d1e2843c3b3f77',
			default_sellerid : 'fSiQPakWk',
		
			//weiduke_server_url: 'http://192.168.0.205/weiduke/index.php',
			//yanyubao_server_url: 'http://192.168.0.205/yanyubao_server/index.php',		
		
			userInfo: {},
			
					
			//default_sellerid : 'pQNNmSkaq',
		
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "/static/iconfont/font.scss";
</style>
