import App from './App'
import store from './store'

// #ifndef VUE3
import Vue from 'vue'
import tabBar from './components/tabBar.vue'
import auth from './components/auth.vue'
import share from '@/utils/shares.js'
import shoproSku from './components/shopro-sku.vue'


Vue.mixin(share)
Vue.component('tab-bar', tabBar)
Vue.component('auth',auth)
Vue.component('shopro-sku',shoproSku)
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$adpid = "1111111111"
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	app.config.globalProperties.$adpid = "1111111111"
	app.config.globalProperties.$backgroundAudioData = {
		playing: false,
		playTime: 0,
		formatedPlayTime: '00:00:00'
	}
	return {
		app
	}
}
// #endif
