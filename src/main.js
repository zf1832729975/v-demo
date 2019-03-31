// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueResource from 'vue-resource'
// import VueResource from '../node_modules/vue-resource/dist/vue-resource.js'
// E:\vue\vue-demo\my-blog\node_modules\vue-resource\dist\vue-resource.js
import VueRouter from 'vue-router'
import App from './App'
import Routes from './routes'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'   // 样式文件需要单独引入

/*
import axixos from 'axios'

// 全局配置--请求路径
axios.defaults.baseURL = 'https://zf-vue-demo.firebaseio.com'
// 请求头
// axios.defaults.defaults.headers.commnon['Authorization'] = 'Token'
// axios.defaults.defaults.headers.post['Conten-type'] = 'application/urlencode'
*/

// axios.defaults.baseURL = 'https://zf-vue-demo.firebaseio.com'
// 野狗账号
axios.defaults.baseURL = 'https://wd9531928798aaesus.wilddogio.com/'

Vue.prototype.$axios = axios

Vue.config.productionTip = false

// Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ElementUI)

// 自定义指令
Vue.directive('theme', {
	bind (el, binding, vnode) {
		if (binding.value === 'wide') {
			el.style.maxWidth = '1260px'
		} else if (binding.value === 'narrow') {
			el.style.maxWidth = '560px'
		} else if (binding.value === 'middle') {
			el.style.maxWidth = '800px'
		}

		if (binding.arg === 'column') {
			el.style.background = '#6677cc'
			el.style.padding = '20px'
		}
	}
})

// 创建路由
const router = new VueRouter({
	routes: Routes,
	mode: 'hash'
})


Vue.filter('snippet',  value => (value.length >= 200) ? value.slice(0, 200) + '...' : value)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
