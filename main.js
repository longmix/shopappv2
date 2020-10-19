import Vue from 'vue'
import App from './App'
import $abotapi from './common/abotapi.js';

//var abotapi001 = require('./common/abotapi.js');

//import abotapi001 from './common/abotapi.js';


// var weiduke_server_url ='https://cms.weiduke.com/';
// var yanyubao_server_url =  'https://yanyubao.tseo.cn/';
// var default_sellerid = 'pmyxQxkkU';
// var xiaochengxu_appid = 'wx60a801e5fb7f9378';


Vue.prototype.abotapi = $abotapi
Vue.config.productionTip = false

//引用弹窗控件，可以显示图片。调用示例见 wordpress/pages/index/detail.vue
//因为在App.vue中无法绘制xml，暂时不用。
import openAlert from './components/open-alert/open-alert.vue';
Vue.component('openAlert', openAlert);

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
