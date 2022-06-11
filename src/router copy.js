import Vue from 'vue'
import Router from 'vue-router'
import HomeA from './views/homeA.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        redirect: 'module-one',
        component: HomeA,
        children: [


        ]
    }]
})