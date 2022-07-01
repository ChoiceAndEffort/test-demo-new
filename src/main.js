import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from 'axios';


axios.interceptors.request.use(function (config) {
  // 添加token
  config.headers.Token ="eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoiMjIwNjAxQVlDQTAxRlhLUCIsImxvZ2luVHlwZSI6MiwibW9iaWxlIjoiMTU1Mjc1ODM5NjAiLCJpc0hhdmVSb2xlIjoxLCJlbnRlcnByaXNlVHlwZSI6NCwibG9naW5OYW1lIjoi6ZmI6L-q56eAIiwiZW50ZXJwcmlzZUlkIjoiMjEwODA2RFlaNTFYV1lDSCIsImVudGVycHJpc2VOYW1lIjoi5rW35rOi6YeN5Z6L5bel56iL56eR5oqA6IKh5Lu95pyJ6ZmQ5YWs5Y-4Iiwic3RhZmZJZCI6IjIyMDYwMUFZQ0EzMlQ3MlciLCJpYXQiOjE2NTYzNzY3NDcsImV4cCI6MTY1NjQ2MzE0N30.wNnVcmFfPftCwM5oqvauz9mE82sK0cCOVRiHtxxGXbM";
  return config;
}, function (error) {
  return Promise.reject(error);
});

import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
  axios,
  router,
  store,
  render: h => h(App),
}).$mount('#app')