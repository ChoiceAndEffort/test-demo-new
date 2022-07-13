import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from './api/request/index'
import i18n from '@/language/index.js';



import 'element-ui/lib/theme-chalk/index.css';





Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
  axios,
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')