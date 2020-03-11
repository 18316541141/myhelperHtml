import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Antd from 'ant-design-vue';
import Hashes from "jshashes";
import 'ant-design-vue/dist/antd.css';
import { openLoading, closeLoading, get, post, regPool, realTimeGet, cancelPool, cancelAllPools, getUpdate, postUpdate } from './common/utils/http'
import $ from 'jquery'
import rangeLength from './common/validators/rangeLength.js'
import defaultPage from './common/components/defaultPage.vue';
import { menuReg, componentReg, directiveReg } from './componentReg.js';
window.$ = $;

Vue.config.productionTip = false;

//通用插件注册
(function () {
  Vue.use(Antd);
  Vue.use(Vuex);
}());

//通用组件注册
(function () {
  componentReg(Vue);
  // 默认分页组件
  Vue.component('default-page', defaultPage);
}());

//校验规则注册
(function () {
  Vue.prototype.$myValidators={
    rangeLength:rangeLength
  };
}());

Vue.prototype.$Hashes = Hashes;
Vue.prototype.$openLoading = openLoading;
Vue.prototype.$closeLoading = closeLoading;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$regPool = regPool;
Vue.prototype.$realTimeGet = realTimeGet;
Vue.prototype.$cancelPool = cancelPool;
Vue.prototype.$cancelAllPools = cancelAllPools;
Vue.prototype.$getUpdate = getUpdate;
Vue.prototype.$postUpdate = postUpdate;

const store = new Vuex.Store({
  state: {
    isLogin: true, //是否登录
    loadingCount: 0, //等待池中正在加载的请求数
    menus: [], //已打开的菜单列表
    PROXY: process.env.NODE_ENV === 'development' ? '/api' : '', //反向代理匹配的前缀
    username: '', //登录的用户名,
    loadingStatus: false
  }
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
