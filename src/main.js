/*
 * @Author: gonglei 291523450@qq.com
 * @Date: 2022-05-19 15:14:24
 * @LastEditors: gonglei 291523450@qq.com
 * @LastEditTime: 2022-09-14 11:45:52
 * @FilePath: \test-demo-new\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import axios from "./api/request/index";
import i18n from "@/language/index.js";

import "element-ui/lib/theme-chalk/index.css";

// import { LgTable, LgOperate } from "lg-ui-vue";
import LgUiVue from "lg-ui-vue";
Vue.use(LgUiVue);
// Vue.use(LgTable);
// Vue.use(LgOperate);

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
new Vue({
  axios,
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
