import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入公共样式
import '@/styles/common.less'
// 导入vant-ui
import '@/utils/vant-ui.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
