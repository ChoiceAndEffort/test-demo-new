import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from './language-EN'
import usLocal from './language-CN'
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: localStorage.getItem('lang') || 'cn', // 通过this.$i18n.locale的值实现语言切换
    messages: {
        en: {
            ...enLocale
        },
        cn: {
            ...usLocal
        }
    },
});
console.log(i18n.messages,'实例化i18n');
export default i18n;